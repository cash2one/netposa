import './map/map.controller'
import './chart/enlarge.controller'
import './chart/statistics/statistic.controller'
import 'css!./css/resource.css'
import "./chart/echartFactory"
import { IEchartFactory } from "./chart/echartFactory";
import { app } from "../common/app/main.app";
import { searchChartParams } from '../common/services/resource.service';
import { resourceService } from '../common/services/resource.service';
import 'jquery';
import "../../../libs/drag/drag";
import 'moment'
import { RouteKeyEnum } from "../common/router/enum/RouteKeyEnum";
import {
    ResourcePageType,
    ISwitchButton,
    switchButton
} from "../../core/entity/Resource";
import "../common/factory/dataSelect.factory";
import { dataSelectServer, dataSelectResult, moduleString } from "../common/factory/dataSelect.factory";
import { SocketResultTypeEnum } from "../../core/server/enum/SocketResultTypeEnum";
import { AlarmObjectType } from '../../core/entity/maintainEnum';

declare let moment: any, angular: any, $: any;

interface style {
    left?: string,
    width?: string,
    marginLeft?: string
}

interface playObjEnum {
    resourceType: string,//资源类型
    timeType: string,//时间类型
    playIndex: number,//当前播放下表
    startIndex: number,//开始播放的下标
    lenIndex: number//总长度最后一个下标
}

export const playObj: playObjEnum = {
    resourceType: "0",//资源类型
    timeType: "ALL",//时间类型
    playIndex: 0,//当前播放下表
    startIndex: 0,//开始播放的下标
    lenIndex: 0//总长度最后一个下标
};


class ResourceController {
    static $inject = ['$scope', '$timeout', '$interval', 'layer', 'i18nFactory', '$q', '$window', 'resourceService', '$state', 'dataSelectServer', 'echartFactory'];

    map: any;

    ui_drop_playBg: style;
    ui_drop_playBg_curPlay: style;
    ui_t_c_tlDrop: style;
    ui_t_c_tlDrop_start: style;
    ui_t_c_tlDrop_end: style;

    ui_t_c_tl: style; //时间轴长度
    ui_t_c_tlScaleItem: style; //时间轴刻度单个长度
    t_c_tlScaleData: Array<string> = []; //时间轴数据

    tl_zyTypeTxt: string = ResourcePageType.ALL.value;
    tl_zyType: number = 0;
    tl_type: string = ResourcePageType.ALL.value;
    tl_now: Array<string> = [];
    tl_day: Array<string> = [];
    tl_week: Array<string> = [];
    tl_month: Array<string> = [];
    tl_year: Array<string> = [];

    switchButton: ISwitchButton = switchButton;
    datatype: string = ResourcePageType.ALL.value; // 数据总量类型
    datatitle: string = 'DP_RESOURCE_TIME_16';
    timeTileData: Array<number> = [];
    timeTitleData: Array<{ key: number, value: number }>;
    playObj: playObjEnum = playObj;
    renderNum: number = 0;  // 数据总量
    selectResourceType: string = 'DP_RESOURCE_TIME_10';
    selectResourceTime: string = 'DP_RESOURCE_TIME_17';
    totalNum: number; //保存数据总量
    shtleInowTifo: boolean = false;
    ResourcePageType: any = ResourcePageType;
    typeButtonNameSwitch: Array<string> = Object.keys(ResourcePageType);
    timer: any = null;
    datatimer: any = null;
    chartTimestamp: any = null;

    chartData: any;
    isplay: boolean = false;
    cacheChartdata: any;

    isDestory: boolean = false;
    switchStateButton: boolean = true;

    socketArr: Array<string>;
    constructor(private $scope: any,
        private $timeout: Function,
        private $interval: any,
        private layer: any,
        private i18nFactory: any,
        private $q: any,
        private $window: any,
        private resourceService: resourceService,
        private $state: any,
        private dataSelectServer: dataSelectServer,
        private echartFactory: IEchartFactory
    ) {
        // 获取当前页面类型
        this.getChartDataType();

        //页面销毁
        this.$scope.$on("$destroy", () => {
            this.isDestory = true;
            this.$interval.cancel(this.timer);
            window.clearTimeout(this.datatimer);
            window.clearTimeout(this.chartTimestamp);

            // 存在socket订阅时,取消订阅
            this.isCancelSocket()
        });

        this.timeTileData = [0, 10, 0, 0, 0, 10, 0, 0, 0, 10, 0, 0, 0, 10, 0, 0, 0];

        this.initTimeLineData(); //标定时间刻度
        this.initLayout();       //初始化界面
        this.initDrag();         //绘制界面
        // chart
        this.format();       // 格式化总量展示
        this.getTotalData(); // 得到资源统计总量
        this.getChartData(); // 得到图表数据

        let that: any = this;
        window.onresize = function () {
            $scope.$apply(function () {
                that.initLayout(document.body.clientWidth);
            })
        };
    }

    getChartData() {
        let that: ResourceController = this;
        let dataSelectResultParams = {} as dataSelectResult;
        dataSelectResultParams.module = that.tl_type;
        let time: dataSelectResult = that.dataSelectServer.getParamsTime(dataSelectResultParams);

        let params = {
            type: that.datatype,
            timeStamp: that.playObj.timeType,
            start: time.startTime,
            end: time.endTime
        } as searchChartParams;

        return that.resourceService.getChartData(params).then((res: any) => {
            if (res) {
                let data = angular.copy(res);
                that.cacheChartdata = data;
                that.chartData = data;
                that.bordcastChild(data);
            }
            if (that.tl_type == moduleString.ALL) {
                that.getNewData()
            }
        }).catch(() => {
            if (that.tl_type == moduleString.ALL) {
                that.getNewData()
            }
        })
    }

    // 给各个模块的echart表发送消息
    bordcastChild(data?: any) {
        this.$timeout(() => {
            this.$scope.$broadcast(this.datatype, data ? data : this.chartData);
        });

        //绘制热力图
        this.$scope.$broadcast('drawMap', data && data.IMapResource ? data.IMapResource : this.chartData.IMapResource);
    }

    //统计总数
    getTotalData() {
        let that: any = this;
        let params: string = ResourcePageType.ALL.value;

        function complete(res: any) {
            if (res && res.code === 200) {
                this.staticTotal();
                that.setTotalData(res.data)
            } else {
                this.staticTotal();
            }
        }

        this.resourceService.getResourceNumByTime(params).then(complete.bind(this)).catch((e: any) => {
            this.staticTotal();
        })
    }

    //设置总数数据
    setTotalData(res: any) {
        if (!!res) {
            if (this.tl_zyTypeTxt == ResourcePageType.ALL.value) {
                let num = 0;
                Object.keys(res).forEach((type: string, index: number) => {
                    num += parseInt(res[type].totalFlow)
                })
                this.totalNum = num;
                this.renderNum = num;
            } else if (this.tl_zyTypeTxt == ResourcePageType.Face.value) {
                this.renderNum = parseInt(res.Face.totalFlow);
            } else if (this.tl_zyTypeTxt == ResourcePageType.Vehicle.value) {
                this.renderNum = parseInt(res.Car.totalFlow)
            } else if (this.tl_zyTypeTxt == ResourcePageType.WiFi.value) {
                this.renderNum = parseInt(res.WIFI.totalFlow);
            } else if (this.tl_zyTypeTxt == ResourcePageType.EFENCE.value) {
                this.renderNum = parseInt(res.EFENCE.totalFlow);
            }
            this.format();
            let formatNum: Function = (num: number) => {
                return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            };
            this.ResourcePageType.Face.number = {
                todayFlow: formatNum(res.Face.todayFlow),
                totalFlow: formatNum(res.Face.totalFlow),
                totalCountNum: parseInt(res.Face.totalFlow)
            };
            this.ResourcePageType.Vehicle.number = {
                todayFlow: formatNum(res.Car.todayFlow),
                totalFlow: formatNum(res.Car.totalFlow),
                totalCountNum: parseInt(res.Car.totalFlow)
            };
            this.ResourcePageType.WiFi.number = {
                todayFlow: formatNum(res.WIFI.todayFlow),
                totalFlow: formatNum(res.WIFI.totalFlow),
                totalCountNum: parseInt(res.WIFI.totalFlow)
            };
            this.ResourcePageType.EFENCE.number = {
                todayFlow: formatNum(res.EFENCE.todayFlow),
                totalFlow: formatNum(res.EFENCE.totalFlow),
                totalCountNum: parseInt(res.EFENCE.totalFlow)
            };
        }
    }

    computed(numarr: Array<number>) {
        let a = angular.copy(this.timeTileData);
        let arr = angular.copy(a.reverse());
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== 10 && numarr[i] && numarr[i] != 10) {
                arr[i] = numarr[i]
            } else {
                if (arr[i] !== 10) {
                    arr[i] = 0
                }
            }
        }
        this.timeTileData = arr.reverse();
        let tempArr = [] as Array<{ key: number, value: number }>;
        this.timeTileData.forEach((item: number) => {
            tempArr.push({ key: Math.random(), value: item })
        });

        this.timeTitleData = angular.copy(tempArr);
    }

    format() {
        let num: number = this.renderNum;
        let str: string = num.toString();
        let numarr = [];

        for (let i = 0; i < str.length; i++) {
            numarr[i] = parseInt(str[i])
        }
        numarr = numarr.reverse();
        if (numarr.length >= 3) {
            numarr.splice(3, 0, 10);
        }

        if (numarr.length >= 7) {
            numarr.splice(7, 0, 10);
        }

        if (numarr.length >= 11) {
            numarr.splice(11, 0, 10);
        }

        this.computed(numarr);
    }

    //初始化时间轴
    initTimeLineData() {
        this.tl_now = ResourceController.createNowTimeLine();

        this.tl_month = ResourceController.createMonthTimeLine();

        this.tl_day = ResourceController.createDayTimeLine();

        this.tl_year = ResourceController.createYearTimeLine();

        this.tl_week = ResourceController.createWeekTimeLine();
    }

    initLayout(width?: number) {
        let tlItemNum = 0;
        let main_w = width ? width : document.body.clientWidth;
        this.ui_t_c_tl = { width: (main_w - 350) + 'px', marginLeft: '5px' };

        this.t_c_tlScaleData = [];
        if (this.tl_type == "ALL") {
            tlItemNum = this.tl_now.length;
            this.t_c_tlScaleData = this.tl_now;
        }
        if (this.tl_type == "Day") {
            tlItemNum = this.tl_day.length;
            this.t_c_tlScaleData = this.tl_day;
        }
        if (this.tl_type == "Week") {
            tlItemNum = this.tl_week.length;
            this.t_c_tlScaleData = this.tl_week;
        }
        if (this.tl_type == "Month") {
            tlItemNum = this.tl_month.length;
            this.t_c_tlScaleData = this.tl_month;
        }
        if (this.tl_type == "Year") {
            tlItemNum = this.tl_year.length;
            this.t_c_tlScaleData = this.tl_year;
        }
        this.ui_t_c_tlScaleItem = { width: ((main_w - 350) / tlItemNum) + 'px' };//设置时间轴
        this.playObj.lenIndex = tlItemNum - 1;//设置总长度最后一个值的下标

        //判断当前时间点
        this.ui_t_c_tlDrop = { width: (main_w - 350) + 'px' };
        this.ui_t_c_tlDrop_start = { left: '0px' };//还原初始值
        this.ui_t_c_tlDrop_end = { left: (main_w - 350 - 10) + "px" };//还原初始值
        this.ui_drop_playBg = { left: "0px", width: (main_w - 350) + "px" };
        this.ui_drop_playBg_curPlay = { width: '0%' };
    }

    //时间轴刻度线拖动
    initDrag() {
        let self = this;
        $("#drop_start").dragging({
            move: 'x',
            randomPosition: false
        }, function () {
            self.ui_t_c_tlDrop_start.left = this.css("left");

            let width: number = parseInt((self.ui_t_c_tlDrop_end.left).replace("px", "")) - parseInt(this.css("left").replace("px", "")) + 5;
            self.ui_drop_playBg = { left: this.css("left"), width: width + "px" };
            //调用校验
            self.chkTimeLine(width, parseInt(this.css("left").replace("px", "")), parseInt((self.ui_t_c_tlDrop_end.left).replace("px", "")), "start");
        }, function () {
            //鼠标抬起后校验
            self.chkMouseUp(self.ui_t_c_tlDrop_start.left, self.ui_t_c_tlDrop_end.left);
        });

        $("#drop_end").dragging({
            move: 'x',
            randomPosition: false
        }, function () {
            self.ui_t_c_tlDrop_end.left = this.css("left");
            let width: number = parseInt(this.css("left").replace("px", "")) - parseInt((self.ui_t_c_tlDrop_start.left).replace("px", "")) + 5;
            self.ui_drop_playBg = { left: self.ui_t_c_tlDrop_start.left, width: width + "px" };
            //调用校验
            self.chkTimeLine(width, parseInt((self.ui_t_c_tlDrop_start.left).replace("px", "")), parseInt(this.css("left").replace("px", "")), "end");
        }, function () {
            //鼠标抬起后校验
            self.chkMouseUp(self.ui_t_c_tlDrop_start.left, self.ui_t_c_tlDrop_end.left);
        });
    }

    chkTimeLine(timeWidth: number, start: number, end: number, type: string) {
        let self = this;
        let scaleItemWidth: number = parseInt(self.ui_t_c_tlScaleItem.width.replace("px", ""));
        //当间距小于最小刻度时
        if (timeWidth < scaleItemWidth) {
            setTimeout(function () {
                if (type == "start") {
                    self.ui_t_c_tlDrop_start.left = (end - scaleItemWidth + 5) + "px";
                }
                if (type == "end") {
                    self.ui_t_c_tlDrop_end.left = (start + scaleItemWidth - 5) + "px";
                }
                self.ui_drop_playBg.left = self.ui_t_c_tlDrop_start.left;
                self.ui_drop_playBg.width = scaleItemWidth + "px";
            }, 500);
        }
    }

    chkMouseUp(start_left: string, end_left: string) {
        let self = this;
        setTimeout(function () {
            let scaleItemWidth: number = parseInt(self.ui_t_c_tlScaleItem.width.replace("px", ""));
            let dropWidth: number = parseInt(self.ui_t_c_tlDrop.width.replace("px", ""));
            let start_left_num: number = parseInt(start_left.replace('px', ''));
            let end_left_num: number = parseInt(end_left.replace('px', ''));
            start_left_num = (start_left_num / scaleItemWidth) * scaleItemWidth;
            end_left_num = Math.ceil(end_left_num / scaleItemWidth) * scaleItemWidth;
            if (end_left_num >= dropWidth) {
                end_left_num = dropWidth
            }
            self.ui_t_c_tlDrop_start.left = start_left_num + 'px';
            self.ui_t_c_tlDrop_end.left = end_left_num + 'px';
            self.ui_drop_playBg.left = self.ui_t_c_tlDrop_start.left;
            self.ui_drop_playBg.width = (end_left_num - start_left_num) + 'px';
        }, 100)
    }

    playData() {
        this.chartData = this.cacheChartdata;

        if (!this.isplay) {
            return
        }

        //播放开始时清除循环请求接口
        window.clearTimeout(this.chartTimestamp);
        this.chartTimestamp = null;

        let self = this;
        if (this.timer != null) {
            this.$interval.cancel(this.timer);
            self.timer = null
        }
        let start: number = parseInt((self.ui_t_c_tlDrop_start.left).replace("px", ""));
        let width: number = parseInt((self.ui_drop_playBg.width).replace("px", ""));
        let scaleItemWidth: number = parseInt(self.ui_t_c_tlScaleItem.width.replace("px", ""));
        let num = width / scaleItemWidth;
        let startNum = start / scaleItemWidth;
        let timeSpArr: Array<string> = [];
        if (self.tl_type == "Day") {
            timeSpArr = self.tl_day;
        }
        if (self.tl_type == "Week") {
            timeSpArr = self.tl_week;
        }
        if (self.tl_type == "Month") {
            timeSpArr = self.tl_month;
        }
        if (self.tl_type == "Year") {
            timeSpArr = self.tl_year;
        }
        self.playObj.startIndex = startNum;//设置开始播放时下标值
        self.playObj.lenIndex = timeSpArr.length - 1;//设置总长度最后一个值的下标
        console.log("开始点下标：" + startNum + "_____总计个数：" + num + "________" + self.playObj.lenIndex);

        for (let i in self.chartData) {
            if (self.chartData[i] && self.chartData[i].playData) {
                self.chartData[i].series = self.chartData[i].playData[0];
            }
        }

        self.bordcastChild();
        let tempNum = 0;
        let tempIndex = 0;
        this.timer = this.$interval(function () {
            if (tempNum == 1000) {
                self.$interval.cancel(self.timer);
                self.timer = null
                //播放完成后重新请求数据
                self.getChartData();
            } else {
                if (startNum == 0 && tempNum == 0) {
                    self.playObj.playIndex = 0;
                } else {
                    self.ui_drop_playBg_curPlay = { width: (tempNum / 10) + "%" };
                    if (tempIndex != Math.floor($("#drop_playBg_curPlay").width() / scaleItemWidth + startNum) && ($("#drop_playBg_curPlay").width() / scaleItemWidth) < num) {
                        tempIndex = Math.floor($("#drop_playBg_curPlay").width() / scaleItemWidth + startNum);
                        self.playObj.playIndex = tempIndex;
                        self.timeAnimate();
                    }
                }
                tempNum++;
            }
        }, 20);
    }

    private changeDateData(chartData: any, i: string, index: number) {
        let dataListData: Array<string> = angular.copy(chartData[i].dateList);
        let endFive: Array<string> = dataListData.slice(index - 4, index + 1);

        if (index < 5) {
            chartData[i].xData = dataListData.slice(0, 5);
        } else if (endFive.length >= 5) {
            chartData[i].xData = endFive;
        } else {
            chartData[i].xData = dataListData;
        }
        return chartData;
    }

    timeAnimate() {
        // console.log("播放刻度索引______" + this.playObj.playIndex)
        for (let i in this.chartData) {
            if (i == 'IMapResource') {
                this.chartData[i].series = this.chartData[i].playData[this.playObj.playIndex];
            } else if (i == 'AlarmStatistics' || i == 'ResourcebRetrievalTrend') {
                let obj = {
                    camera: [] as Array<number>,
                    electronicfence: [] as Array<number>,
                    rmpgate: [] as Array<number>,
                    wifi: [] as Array<number>
                };

                for (let j = 0; j <= this.playObj.playIndex; j++) {
                    let palyData: any = this.chartData[i].playData[j];

                    if (palyData && palyData.camera && palyData.electronicfence && palyData.rmpgate && palyData.wifi) {
                        obj.camera.push(palyData.camera[0]);
                        obj.electronicfence.push(palyData.electronicfence[0]);
                        obj.rmpgate.push(palyData.rmpgate[0]);
                        obj.wifi.push(palyData.wifi[0]);
                    }
                }
                this.chartData[i].series = obj;

                this.chartData = this.changeDateData(this.chartData, i, this.playObj.playIndex)

            } else if (i === 'AreaPersonAlarmStatistics' || i == 'AreaWifiAlarmStatistics' || i == 'AreaEFAlarmStatistics') {
                let arr = [] as Array<Array<number>>;
                this.chartData[i].legendData.forEach((item: string) => {
                    arr.push([])
                });
                for (let j = 0; j <= this.playObj.playIndex; j++) {
                    arr.forEach((item: Array<number>, index: number) => {
                        item.push(this.chartData[i].playData[j][index][0])
                    })
                }
                this.chartData[i].series = arr;

                this.chartData = this.changeDateData(this.chartData, i, this.playObj.playIndex)

            } else if (i === 'PersonTypeStatistics' || i == 'WifiTypeStatistics' || i == 'EFTypeStatistics') {
                let arr = [];
                for (let j = 0; j <= this.playObj.playIndex; j++) {
                    if (this.chartData[i] && this.chartData[i].playData) {
                        arr.push(this.chartData[i].playData[j][0]);
                    }
                }
                this.chartData[i].series = arr;

                this.chartData = this.changeDateData(this.chartData, i, this.playObj.playIndex);
                console.log(this.chartData);

            } else if (i == 'WifiStatistics' || i == 'EFStatistics' || i == 'PersonStatistics') {
                let obj = {
                    alarm: [] as Array<number>,
                    flow: [] as Array<number>
                };
                for (let j = 0; j <= this.playObj.playIndex; j++) {
                    if (this.chartData[i] && this.chartData[i].playData) {
                        obj.flow.push(this.chartData[i].playData[j].flow[0]);
                        obj.alarm.push(this.chartData[i].playData[j].alarm[0]);
                    }
                }
                this.chartData[i].series = obj;

                this.chartData = this.changeDateData(this.chartData, i, this.playObj.playIndex)
            } else {
                if (this.chartData[i] && this.chartData[i].playData) {
                    this.chartData[i].series = this.chartData[i].playData[this.playObj.playIndex]
                }

            }
        }
        this.bordcastChild()
    }

    changTime(type: string, title: string) {
        this.echartFactory.currentDataType = type;
        if (title === 'DP_RESOURCE_TIME_17') {
            this.isplay = false;
        } else {
            this.isplay = true;
        }
        window.clearTimeout(this.chartTimestamp);
        this.chartTimestamp = null;

        this.selectResourceTime = title;
        this.tl_type = type;
        this.playObj.timeType = type;
        this.initTimeLineData();
        this.initLayout();
        this.getChartData()
    }

    // 数据类型切换
    changType(index: string, typeTxt: string, title: string) {
        let ResourceType: any = this.ResourcePageType[typeTxt];
        this.datatype = ResourceType.value;
        this.getChartData();
        // 切换总量
        this.changData(index, typeTxt);
        // 切換路由
        this.switchRouter(typeTxt);
        this.selectResourceType = title;
        this.tl_zyTypeTxt = angular.copy(typeTxt);
        this.tl_zyType = parseInt(index);
        this.playObj.resourceType = index;
        // 切換圖表
        this.changChart(index);
        this.shtleInowTifo = false;
        // 切换完成请求数据
    }

    // 数据总量切换
    changData(type: string, typeTxt: string) {
        if (typeTxt == ResourcePageType.ALL.value) {
            this.datatitle = 'DP_RESOURCE_TIME_16';
            this.renderNum = this.totalNum
        } else if (typeTxt == ResourcePageType.Vehicle.value) {
            this.datatitle = 'DP_RESOURCE_TIME_02';
            this.renderNum = this.ResourcePageType.Vehicle.number.totalCountNum;
        } else if (typeTxt == ResourcePageType.Face.value) {
            this.datatitle = 'DP_RESOURCE_TIME_03';
            this.renderNum = this.ResourcePageType.Face.number.totalCountNum;
        } else if (typeTxt == ResourcePageType.WiFi.value) {
            this.datatitle = 'DP_RESOURCE_TIME_06';
            this.renderNum = this.ResourcePageType.WiFi.number.totalCountNum;
        } else if (typeTxt == ResourcePageType.EFENCE.value) {
            this.datatitle = 'DP_RESOURCE_TIME_05';
            this.renderNum = this.ResourcePageType.EFENCE.number.totalCountNum;
        }
        this.format();
    }

    // 实时切换
    changChart(type: string) {
        let that = this as any;
        this.switchButton.switch = false;
        // 取消报警信息
        that.$scope.$broadcast(`socketStatistics_${that.datatype}`, { isCancel: true });

        let switchChart = this.switchButton.switchChart;
        for (let i = 0; i < switchChart.length; i++) {
            let echartName: string = switchChart[i] + "Statistics";
            let echartRight: string = switchChart[i] + "Right";
            if (i == Number(type)) {
                let ResourceType: any = this.ResourcePageType[switchChart[i]];
                that.datatype = ResourceType.value;
                that.switchButton[echartName] = true;
                that.switchButton[echartRight] = true
            } else {
                that.switchButton[echartName] = false;
                that.switchButton[echartRight] = false
            }
        }
    }

    // true为统计、false为实时
    hiddenChart() {
        this.switchButton.switch = !this.switchButton.switch;

        this.broadcaseSocketData(this.datatype, this.switchButton.switch);
    }

    // socket实时发送消息
    broadcaseSocketData(datatype: string, ifSend: boolean) {
        let that: any = this;
        switch (datatype) {
            case ResourcePageType.ALL.value: {
                that.$scope.$broadcast(SocketResultTypeEnum.SubscribeAllFaceLog, { isCancel: !ifSend });
                that.$scope.$broadcast(SocketResultTypeEnum.SubscribeAllVehicleLog, { isCancel: !ifSend });
                break
            }
            case ResourcePageType.Face.value: {
                that.$scope.$broadcast(SocketResultTypeEnum.SubscribeAllFaceLog, { isCancel: !ifSend });
                break
            }
            case ResourcePageType.Vehicle.value: {
                that.$scope.$broadcast(SocketResultTypeEnum.SubscribeAllVehicleLog, { isCancel: !ifSend });
                break
            }
            default: {
                break
            }
        }
    }

    getDays(day1: any, day2: any) {
        // 获取入参字符串形式日期的Date型日期
        let st = day1.getDate();
        let et = day2.getDate();
        let retArr = [];
        // 获取开始日期的年，月，日
        let yyyy = st.getFullYear(),
            mm = st.getMonth(),
            dd = st.getDate();
        // 循环
        while (st.getTime() != et.getTime()) {
            retArr.push(st.getYMD());
            // 使用dd++进行天数的自增
            st = new Date(yyyy, mm, dd++);
        }

        // 将结束日期的天放进数组
        retArr.push(et.getYMD());
        return retArr;
    }

    //socke存在的情况下取消订阅
    private isCancelSocket() {
        if (this.echartFactory.FaceSocketID && this.echartFactory.CarSocketID) {
            this.broadcaseSocketData(ResourcePageType.ALL.value, false);
        } else if (this.echartFactory.FaceSocketID) {
            this.broadcaseSocketData(ResourcePageType.Face.value, false);
        } else if (this.echartFactory.CarSocketID) {
            this.broadcaseSocketData(ResourcePageType.Vehicle.value, false);
        }
    }
    // 切换路由
    private switchRouter(type: string) {
        this.echartFactory.currentDeviceType = type;
        this.isCancelSocket();
        switch (type) {
            case ResourcePageType.ALL.value: {
                this.$state.go(RouteKeyEnum.ResourceAll);
                this.switchStateButton = true;
                break
            }
            case ResourcePageType.Vehicle.value: {
                this.$state.go(RouteKeyEnum.ResourceCar);
                this.switchStateButton = true;
                break
            }
            case ResourcePageType.Face.value: {
                this.$state.go(RouteKeyEnum.ResourcePerson);
                this.switchStateButton = true;
                break
            }
            case ResourcePageType.WiFi.value: {
                this.$state.go(RouteKeyEnum.ResourceWifi);
                this.switchStateButton = false;
                break
            }
            case ResourcePageType.EFENCE.value: {
                this.$state.go(RouteKeyEnum.ResourceEle);
                this.switchStateButton = false;
                break
            }
        }
    }

    // 定时器刷新数据
    private getNewData() {
        window.clearTimeout(this.chartTimestamp);
        if (!this.isDestory) {
            this.chartTimestamp = window.setTimeout(() => {
                this.getChartData()
            }, 1000 * 10)
        }
    }

    // 定时器统计总数
    private staticTotal() {
        let that: any = this;
        window.clearTimeout(this.datatimer);
        if (!this.isDestory) {
            this.datatimer = window.setTimeout(() => {
                that.getTotalData();
            }, 1000 * 10)
        }
    };

    // 读取需要请求的类型
    private getChartDataType() {
        switch (this.$state.current.name) {
            case RouteKeyEnum.ResourceCar:
                this.datatype = ResourcePageType.Vehicle.value;
                this.selectResourceType = ResourcePageType.Vehicle.name;
                break;
            case RouteKeyEnum.ResourcePerson:
                this.datatype = ResourcePageType.Face.value;
                this.selectResourceType = ResourcePageType.Face.name;
                break;
            case RouteKeyEnum.ResourceWifi:
                this.datatype = ResourcePageType.WiFi.value;
                this.selectResourceType = ResourcePageType.WiFi.name;
                break;
            case RouteKeyEnum.ResourceEle:
                this.datatype = ResourcePageType.EFENCE.value;
                this.selectResourceType = ResourcePageType.EFENCE.name;
                break;
            case RouteKeyEnum.ResourceAll:
                this.datatype = ResourcePageType.ALL.value;
                this.selectResourceType = ResourcePageType.ALL.name;
                break;
            default:
                this.datatype = ResourcePageType.ALL.value;
        }
    }

    static createNowTimeLine(): Array<string> {
        let result = [] as Array<string>;
        for (let i = 0; i < 30; i++) {
            let month = moment().subtract(i, 'days').format('DD');
            result.push(`${month}日`)
        }
        return result.reverse();
    }

    static createDayTimeLine(): Array<string> {
        let result = [] as Array<string>;
        for (let i = 0; i < 24; i++) {
            result.push(`${i < 10 ? ('0' + i) : i}:00`)
        }
        return result;
    }

    static createWeekTimeLine(): Array<string> {
        let result = [] as Array<string>;
        for (let i = 1; i < 8; i++) {
            let week = moment().subtract(i, 'days').format('DD');
            result.push(`${week}日`)
        }
        return result.reverse();
    }

    static createMonthTimeLine(): Array<string> {
        let result = [] as Array<string>;
        for (let i = 1; i < 31; i++) {
            let month = moment().subtract(i, 'days').format('DD');
            result.push(`${month}日`)
        }
        return result.reverse();
    }

    static createYearTimeLine(): Array<string> {
        let result = [] as Array<string>;
        for (let i = 1; i < 13; i++) {
            let month = moment().subtract(i, 'month').format('MM');
            result.push(`${month}月`)
        }
        return result.reverse();
    }
}

app.controller('resourceController', ResourceController);