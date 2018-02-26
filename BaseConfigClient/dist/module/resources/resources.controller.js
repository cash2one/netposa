define(["require", "exports", "../common/app/main.app", "../common/router/enum/RouteKeyEnum", "../../core/entity/Resource", "../../core/server/enum/SocketResultTypeEnum", "./map/map.controller", "./chart/enlarge.controller", "./chart/statistics/statistic.controller", "css!./css/resource.css", "./chart/echartFactory", "jquery", "../../../libs/drag/drag", "moment", "../common/factory/dataSelect.factory"], function (require, exports, main_app_1, RouteKeyEnum_1, Resource_1, SocketResultTypeEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.playObj = {
        resourceType: "0",
        timeType: "ALL",
        playIndex: 0,
        startIndex: 0,
        lenIndex: 0
    };
    var ResourceController = (function () {
        function ResourceController($scope, $timeout, $interval, layer, i18nFactory, $q, $window, resourceService, $state, dataSelectServer, echartFactory) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$interval = $interval;
            this.layer = layer;
            this.i18nFactory = i18nFactory;
            this.$q = $q;
            this.$window = $window;
            this.resourceService = resourceService;
            this.$state = $state;
            this.dataSelectServer = dataSelectServer;
            this.echartFactory = echartFactory;
            this.t_c_tlScaleData = [];
            this.tl_zyTypeTxt = Resource_1.ResourcePageType.ALL.value;
            this.tl_zyType = 0;
            this.tl_type = Resource_1.ResourcePageType.ALL.value;
            this.tl_now = [];
            this.tl_day = [];
            this.tl_week = [];
            this.tl_month = [];
            this.tl_year = [];
            this.switchButton = Resource_1.switchButton;
            this.datatype = Resource_1.ResourcePageType.ALL.value;
            this.datatitle = 'DP_RESOURCE_TIME_16';
            this.timeTileData = [];
            this.playObj = exports.playObj;
            this.renderNum = 0;
            this.selectResourceType = 'DP_RESOURCE_TIME_10';
            this.selectResourceTime = 'DP_RESOURCE_TIME_17';
            this.shtleInowTifo = false;
            this.ResourcePageType = Resource_1.ResourcePageType;
            this.typeButtonNameSwitch = Object.keys(Resource_1.ResourcePageType);
            this.timer = null;
            this.datatimer = null;
            this.chartTimestamp = null;
            this.isplay = false;
            this.isDestory = false;
            this.switchStateButton = true;
            this.getChartDataType();
            this.$scope.$on("$destroy", function () {
                _this.isDestory = true;
                _this.$interval.cancel(_this.timer);
                window.clearTimeout(_this.datatimer);
                window.clearTimeout(_this.chartTimestamp);
                _this.isCancelSocket();
            });
            this.timeTileData = [0, 10, 0, 0, 0, 10, 0, 0, 0, 10, 0, 0, 0, 10, 0, 0, 0];
            this.initTimeLineData();
            this.initLayout();
            this.initDrag();
            this.format();
            this.getTotalData();
            this.getChartData();
            var that = this;
            window.onresize = function () {
                $scope.$apply(function () {
                    that.initLayout(document.body.clientWidth);
                });
            };
        }
        ResourceController.prototype.getChartData = function () {
            var that = this;
            var dataSelectResultParams = {};
            dataSelectResultParams.module = that.tl_type;
            var time = that.dataSelectServer.getParamsTime(dataSelectResultParams);
            var params = {
                type: that.datatype,
                timeStamp: that.playObj.timeType,
                start: time.startTime,
                end: time.endTime
            };
            return that.resourceService.getChartData(params).then(function (res) {
                if (res) {
                    var data = angular.copy(res);
                    that.cacheChartdata = data;
                    that.chartData = data;
                    that.bordcastChild(data);
                }
                that.getNewData();
            }).catch(function () {
                that.getNewData();
            });
        };
        ResourceController.prototype.bordcastChild = function (data) {
            var _this = this;
            this.$timeout(function () {
                _this.$scope.$broadcast(_this.datatype, data ? data : _this.chartData);
            });
            this.$scope.$broadcast('drawMap', data && data.IMapResource ? data.IMapResource : this.chartData.IMapResource);
        };
        ResourceController.prototype.getTotalData = function () {
            var _this = this;
            var that = this;
            var params = Resource_1.ResourcePageType.ALL.value;
            function complete(res) {
                if (res && res.code === 200) {
                    this.staticTotal();
                    that.setTotalData(res.data);
                }
                else {
                    this.staticTotal();
                }
            }
            this.resourceService.getResourceNumByTime(params).then(complete.bind(this)).catch(function (e) {
                _this.staticTotal();
            });
        };
        ResourceController.prototype.setTotalData = function (res) {
            if (!!res) {
                console.log(res);
                if (this.tl_zyTypeTxt == Resource_1.ResourcePageType.ALL.value) {
                    var num_1 = 0;
                    Object.keys(res).forEach(function (type, index) {
                        num_1 += parseInt(res[type].totalFlow);
                    });
                    this.totalNum = num_1;
                    this.renderNum = num_1;
                }
                else if (this.tl_zyTypeTxt == Resource_1.ResourcePageType.Face.value) {
                    this.renderNum = parseInt(res.Face.totalFlow);
                }
                else if (this.tl_zyTypeTxt == Resource_1.ResourcePageType.Vehicle.value) {
                    this.renderNum = parseInt(res.Car.totalFlow);
                }
                else if (this.tl_zyTypeTxt == Resource_1.ResourcePageType.WiFi.value) {
                    this.renderNum = parseInt(res.WIFI.totalFlow);
                }
                else if (this.tl_zyTypeTxt == Resource_1.ResourcePageType.EFENCE.value) {
                    this.renderNum = parseInt(res.EFENCE.totalFlow);
                }
                this.format();
                var formatNum = function (num) {
                    return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
        };
        ResourceController.prototype.computed = function (numarr) {
            var a = angular.copy(this.timeTileData);
            var arr = angular.copy(a.reverse());
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] !== 10 && numarr[i] && numarr[i] != 10) {
                    arr[i] = numarr[i];
                }
                else {
                    if (arr[i] !== 10) {
                        arr[i] = 0;
                    }
                }
            }
            this.timeTileData = arr.reverse();
            var tempArr = [];
            this.timeTileData.forEach(function (item) {
                tempArr.push({ key: Math.random(), value: item });
            });
            this.timeTitleData = angular.copy(tempArr);
        };
        ResourceController.prototype.format = function () {
            var num = this.renderNum;
            var str = num.toString();
            var numarr = [];
            for (var i = 0; i < str.length; i++) {
                numarr[i] = parseInt(str[i]);
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
        };
        ResourceController.prototype.initTimeLineData = function () {
            this.tl_now = ResourceController.createNowTimeLine();
            this.tl_month = ResourceController.createMonthTimeLine();
            this.tl_day = ResourceController.createDayTimeLine();
            this.tl_year = ResourceController.createYearTimeLine();
            this.tl_week = ResourceController.createWeekTimeLine();
        };
        ResourceController.prototype.initLayout = function (width) {
            var tlItemNum = 0;
            var main_w = width ? width : document.body.clientWidth;
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
            this.ui_t_c_tlScaleItem = { width: ((main_w - 350) / tlItemNum) + 'px' };
            this.playObj.lenIndex = tlItemNum - 1;
            this.ui_t_c_tlDrop = { width: (main_w - 350) + 'px' };
            this.ui_t_c_tlDrop_start = { left: '0px' };
            this.ui_t_c_tlDrop_end = { left: (main_w - 350 - 10) + "px" };
            this.ui_drop_playBg = { left: "0px", width: (main_w - 350) + "px" };
            this.ui_drop_playBg_curPlay = { width: '0%' };
        };
        ResourceController.prototype.initDrag = function () {
            var self = this;
            $("#drop_start").dragging({
                move: 'x',
                randomPosition: false
            }, function () {
                self.ui_t_c_tlDrop_start.left = this.css("left");
                var width = parseInt((self.ui_t_c_tlDrop_end.left).replace("px", "")) - parseInt(this.css("left").replace("px", "")) + 5;
                self.ui_drop_playBg = { left: this.css("left"), width: width + "px" };
                self.chkTimeLine(width, parseInt(this.css("left").replace("px", "")), parseInt((self.ui_t_c_tlDrop_end.left).replace("px", "")), "start");
            }, function () {
                self.chkMouseUp(self.ui_t_c_tlDrop_start.left, self.ui_t_c_tlDrop_end.left);
            });
            $("#drop_end").dragging({
                move: 'x',
                randomPosition: false
            }, function () {
                self.ui_t_c_tlDrop_end.left = this.css("left");
                var width = parseInt(this.css("left").replace("px", "")) - parseInt((self.ui_t_c_tlDrop_start.left).replace("px", "")) + 5;
                self.ui_drop_playBg = { left: self.ui_t_c_tlDrop_start.left, width: width + "px" };
                self.chkTimeLine(width, parseInt((self.ui_t_c_tlDrop_start.left).replace("px", "")), parseInt(this.css("left").replace("px", "")), "end");
            }, function () {
                self.chkMouseUp(self.ui_t_c_tlDrop_start.left, self.ui_t_c_tlDrop_end.left);
            });
        };
        ResourceController.prototype.chkTimeLine = function (timeWidth, start, end, type) {
            var self = this;
            var scaleItemWidth = parseInt(self.ui_t_c_tlScaleItem.width.replace("px", ""));
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
        };
        ResourceController.prototype.chkMouseUp = function (start_left, end_left) {
            var self = this;
            setTimeout(function () {
                var scaleItemWidth = parseInt(self.ui_t_c_tlScaleItem.width.replace("px", ""));
                var dropWidth = parseInt(self.ui_t_c_tlDrop.width.replace("px", ""));
                var start_left_num = parseInt(start_left.replace('px', ''));
                var end_left_num = parseInt(end_left.replace('px', ''));
                start_left_num = (start_left_num / scaleItemWidth) * scaleItemWidth;
                end_left_num = Math.ceil(end_left_num / scaleItemWidth) * scaleItemWidth;
                if (end_left_num >= dropWidth) {
                    end_left_num = dropWidth;
                }
                self.ui_t_c_tlDrop_start.left = start_left_num + 'px';
                self.ui_t_c_tlDrop_end.left = end_left_num + 'px';
                self.ui_drop_playBg.left = self.ui_t_c_tlDrop_start.left;
                self.ui_drop_playBg.width = (end_left_num - start_left_num) + 'px';
            }, 100);
        };
        ResourceController.prototype.playData = function () {
            this.chartData = this.cacheChartdata;
            if (!this.isplay) {
                return;
            }
            window.clearTimeout(this.chartTimestamp);
            this.chartTimestamp = null;
            var self = this;
            if (this.timer != null) {
                this.$interval.cancel(this.timer);
                self.timer = null;
            }
            var start = parseInt((self.ui_t_c_tlDrop_start.left).replace("px", ""));
            var width = parseInt((self.ui_drop_playBg.width).replace("px", ""));
            var scaleItemWidth = parseInt(self.ui_t_c_tlScaleItem.width.replace("px", ""));
            var num = width / scaleItemWidth;
            var startNum = start / scaleItemWidth;
            var timeSpArr = [];
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
            self.playObj.startIndex = startNum;
            self.playObj.lenIndex = timeSpArr.length - 1;
            console.log("开始点下标：" + startNum + "_____总计个数：" + num + "________" + self.playObj.lenIndex);
            for (var i in self.chartData) {
                if (self.chartData[i] && self.chartData[i].playData) {
                    self.chartData[i].series = self.chartData[i].playData[0];
                }
            }
            self.bordcastChild();
            var tempNum = 0;
            var tempIndex = 0;
            this.timer = this.$interval(function () {
                if (tempNum == 1000) {
                    self.$interval.cancel(self.timer);
                    self.timer = null;
                    self.getChartData();
                }
                else {
                    if (startNum == 0 && tempNum == 0) {
                        self.playObj.playIndex = 0;
                    }
                    else {
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
        };
        ResourceController.prototype.changeDateData = function (chartData, i, index) {
            var dataListData = angular.copy(chartData[i].dateList);
            var endFive = dataListData.slice(index - 4, index + 1);
            if (index < 5) {
                chartData[i].xData = dataListData.slice(0, 5);
            }
            else if (endFive.length >= 5) {
                chartData[i].xData = endFive;
            }
            else {
                chartData[i].xData = dataListData;
            }
            return chartData;
        };
        ResourceController.prototype.timeAnimate = function () {
            var _this = this;
            var _loop_1 = function (i) {
                if (i == 'IMapResource') {
                    this_1.chartData[i].series = this_1.chartData[i].playData[this_1.playObj.playIndex];
                }
                else if (i == 'AlarmStatistics' || i == 'ResourcebRetrievalTrend') {
                    var obj = {
                        camera: [],
                        electronicfence: [],
                        rmpgate: [],
                        wifi: []
                    };
                    for (var j = 0; j <= this_1.playObj.playIndex; j++) {
                        var palyData = this_1.chartData[i].playData[j];
                        if (palyData && palyData.camera && palyData.electronicfence && palyData.rmpgate && palyData.wifi) {
                            obj.camera.push(palyData.camera[0]);
                            obj.electronicfence.push(palyData.electronicfence[0]);
                            obj.rmpgate.push(palyData.rmpgate[0]);
                            obj.wifi.push(palyData.wifi[0]);
                        }
                    }
                    this_1.chartData[i].series = obj;
                    this_1.chartData = this_1.changeDateData(this_1.chartData, i, this_1.playObj.playIndex);
                }
                else if (i === 'AreaPersonAlarmStatistics' || i == 'AreaWifiAlarmStatistics' || i == 'AreaEFAlarmStatistics') {
                    var arr_1 = [];
                    this_1.chartData[i].legendData.forEach(function (item) {
                        arr_1.push([]);
                    });
                    var _loop_2 = function (j) {
                        arr_1.forEach(function (item, index) {
                            item.push(_this.chartData[i].playData[j][index][0]);
                        });
                    };
                    for (var j = 0; j <= this_1.playObj.playIndex; j++) {
                        _loop_2(j);
                    }
                    this_1.chartData[i].series = arr_1;
                    this_1.chartData = this_1.changeDateData(this_1.chartData, i, this_1.playObj.playIndex);
                }
                else if (i === 'PersonTypeStatistics' || i == 'WifiTypeStatistics' || i == 'EFTypeStatistics') {
                    var arr = [];
                    for (var j = 0; j <= this_1.playObj.playIndex; j++) {
                        if (this_1.chartData[i] && this_1.chartData[i].playData) {
                            arr.push(this_1.chartData[i].playData[j][0]);
                        }
                    }
                    this_1.chartData[i].series = arr;
                    this_1.chartData = this_1.changeDateData(this_1.chartData, i, this_1.playObj.playIndex);
                    console.log(this_1.chartData);
                }
                else if (i == 'WifiStatistics' || i == 'EFStatistics' || i == 'PersonStatistics') {
                    var obj = {
                        alarm: [],
                        flow: []
                    };
                    for (var j = 0; j <= this_1.playObj.playIndex; j++) {
                        if (this_1.chartData[i] && this_1.chartData[i].playData) {
                            obj.flow.push(this_1.chartData[i].playData[j].flow[0]);
                            obj.alarm.push(this_1.chartData[i].playData[j].alarm[0]);
                        }
                    }
                    this_1.chartData[i].series = obj;
                    this_1.chartData = this_1.changeDateData(this_1.chartData, i, this_1.playObj.playIndex);
                }
                else {
                    if (this_1.chartData[i] && this_1.chartData[i].playData) {
                        this_1.chartData[i].series = this_1.chartData[i].playData[this_1.playObj.playIndex];
                    }
                }
            };
            var this_1 = this;
            for (var i in this.chartData) {
                _loop_1(i);
            }
            this.bordcastChild();
        };
        ResourceController.prototype.changTime = function (type, title) {
            this.echartFactory.currentDataType = type;
            if (title === 'DP_RESOURCE_TIME_17') {
                this.isplay = false;
            }
            else {
                this.isplay = true;
            }
            window.clearTimeout(this.chartTimestamp);
            this.chartTimestamp = null;
            this.selectResourceTime = title;
            this.tl_type = type;
            this.playObj.timeType = type;
            this.initTimeLineData();
            this.initLayout();
            this.getChartData();
        };
        ResourceController.prototype.changType = function (index, typeTxt, title) {
            var ResourceType = this.ResourcePageType[typeTxt];
            this.datatype = ResourceType.value;
            this.getChartData();
            this.changData(index, typeTxt);
            this.switchRouter(typeTxt);
            this.selectResourceType = title;
            this.tl_zyTypeTxt = angular.copy(typeTxt);
            this.tl_zyType = parseInt(index);
            this.playObj.resourceType = index;
            this.changChart(index);
            this.shtleInowTifo = false;
        };
        ResourceController.prototype.changData = function (type, typeTxt) {
            if (typeTxt == Resource_1.ResourcePageType.ALL.value) {
                this.datatitle = 'DP_RESOURCE_TIME_16';
                this.renderNum = this.totalNum;
            }
            else if (typeTxt == Resource_1.ResourcePageType.Vehicle.value) {
                this.datatitle = 'DP_RESOURCE_TIME_02';
                this.renderNum = this.ResourcePageType.Vehicle.number.totalCountNum;
            }
            else if (typeTxt == Resource_1.ResourcePageType.Face.value) {
                this.datatitle = 'DP_RESOURCE_TIME_03';
                this.renderNum = this.ResourcePageType.Face.number.totalCountNum;
            }
            else if (typeTxt == Resource_1.ResourcePageType.WiFi.value) {
                this.datatitle = 'DP_RESOURCE_TIME_06';
                this.renderNum = this.ResourcePageType.WiFi.number.totalCountNum;
            }
            else if (typeTxt == Resource_1.ResourcePageType.EFENCE.value) {
                this.datatitle = 'DP_RESOURCE_TIME_05';
                this.renderNum = this.ResourcePageType.EFENCE.number.totalCountNum;
            }
            this.format();
        };
        ResourceController.prototype.changChart = function (type) {
            var that = this;
            this.switchButton.switch = false;
            that.$scope.$broadcast("socketStatistics_" + that.datatype, { isCancel: true });
            var switchChart = this.switchButton.switchChart;
            for (var i = 0; i < switchChart.length; i++) {
                var echartName = switchChart[i] + "Statistics";
                var echartRight = switchChart[i] + "Right";
                if (i == Number(type)) {
                    var ResourceType = this.ResourcePageType[switchChart[i]];
                    that.datatype = ResourceType.value;
                    that.switchButton[echartName] = true;
                    that.switchButton[echartRight] = true;
                }
                else {
                    that.switchButton[echartName] = false;
                    that.switchButton[echartRight] = false;
                }
            }
        };
        ResourceController.prototype.hiddenChart = function () {
            this.switchButton.switch = !this.switchButton.switch;
            this.broadcaseSocketData(this.datatype, this.switchButton.switch);
        };
        ResourceController.prototype.broadcaseSocketData = function (datatype, ifSend) {
            var that = this;
            switch (datatype) {
                case Resource_1.ResourcePageType.ALL.value: {
                    that.$scope.$broadcast(SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeAllFaceLog, { isCancel: !ifSend });
                    that.$scope.$broadcast(SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeAllVehicleLog, { isCancel: !ifSend });
                    break;
                }
                case Resource_1.ResourcePageType.Face.value: {
                    that.$scope.$broadcast(SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeAllFaceLog, { isCancel: !ifSend });
                    break;
                }
                case Resource_1.ResourcePageType.Vehicle.value: {
                    that.$scope.$broadcast(SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeAllVehicleLog, { isCancel: !ifSend });
                    break;
                }
                default: {
                    break;
                }
            }
        };
        ResourceController.prototype.getDays = function (day1, day2) {
            var st = day1.getDate();
            var et = day2.getDate();
            var retArr = [];
            var yyyy = st.getFullYear(), mm = st.getMonth(), dd = st.getDate();
            while (st.getTime() != et.getTime()) {
                retArr.push(st.getYMD());
                st = new Date(yyyy, mm, dd++);
            }
            retArr.push(et.getYMD());
            return retArr;
        };
        ResourceController.prototype.isCancelSocket = function () {
            if (this.echartFactory.FaceSocketID && this.echartFactory.CarSocketID) {
                this.broadcaseSocketData(Resource_1.ResourcePageType.ALL.value, false);
            }
            else if (this.echartFactory.FaceSocketID) {
                this.broadcaseSocketData(Resource_1.ResourcePageType.Face.value, false);
            }
            else if (this.echartFactory.CarSocketID) {
                this.broadcaseSocketData(Resource_1.ResourcePageType.Vehicle.value, false);
            }
        };
        ResourceController.prototype.switchRouter = function (type) {
            this.echartFactory.currentDeviceType = type;
            this.isCancelSocket();
            switch (type) {
                case Resource_1.ResourcePageType.ALL.value: {
                    this.$state.go(RouteKeyEnum_1.RouteKeyEnum.ResourceAll);
                    this.switchStateButton = true;
                    break;
                }
                case Resource_1.ResourcePageType.Vehicle.value: {
                    this.$state.go(RouteKeyEnum_1.RouteKeyEnum.ResourceCar);
                    this.switchStateButton = true;
                    break;
                }
                case Resource_1.ResourcePageType.Face.value: {
                    this.$state.go(RouteKeyEnum_1.RouteKeyEnum.ResourcePerson);
                    this.switchStateButton = true;
                    break;
                }
                case Resource_1.ResourcePageType.WiFi.value: {
                    this.$state.go(RouteKeyEnum_1.RouteKeyEnum.ResourceWifi);
                    this.switchStateButton = false;
                    break;
                }
                case Resource_1.ResourcePageType.EFENCE.value: {
                    this.$state.go(RouteKeyEnum_1.RouteKeyEnum.ResourceEle);
                    this.switchStateButton = false;
                    break;
                }
            }
        };
        ResourceController.prototype.getNewData = function () {
            var _this = this;
            window.clearTimeout(this.chartTimestamp);
            if (!this.isDestory) {
                this.chartTimestamp = window.setTimeout(function () {
                    _this.getChartData();
                }, 1000 * 10);
            }
        };
        ResourceController.prototype.staticTotal = function () {
            var that = this;
            window.clearTimeout(this.datatimer);
            if (!this.isDestory) {
                this.datatimer = window.setTimeout(function () {
                    that.getTotalData();
                }, 1000 * 10);
            }
        };
        ;
        ResourceController.prototype.getChartDataType = function () {
            switch (this.$state.current.name) {
                case RouteKeyEnum_1.RouteKeyEnum.ResourceCar:
                    this.datatype = Resource_1.ResourcePageType.Vehicle.value;
                    this.selectResourceType = Resource_1.ResourcePageType.Vehicle.name;
                    break;
                case RouteKeyEnum_1.RouteKeyEnum.ResourcePerson:
                    this.datatype = Resource_1.ResourcePageType.Face.value;
                    this.selectResourceType = Resource_1.ResourcePageType.Face.name;
                    break;
                case RouteKeyEnum_1.RouteKeyEnum.ResourceWifi:
                    this.datatype = Resource_1.ResourcePageType.WiFi.value;
                    this.selectResourceType = Resource_1.ResourcePageType.WiFi.name;
                    break;
                case RouteKeyEnum_1.RouteKeyEnum.ResourceEle:
                    this.datatype = Resource_1.ResourcePageType.EFENCE.value;
                    this.selectResourceType = Resource_1.ResourcePageType.EFENCE.name;
                    break;
                case RouteKeyEnum_1.RouteKeyEnum.ResourceAll:
                    this.datatype = Resource_1.ResourcePageType.ALL.value;
                    this.selectResourceType = Resource_1.ResourcePageType.ALL.name;
                    break;
                default:
                    this.datatype = Resource_1.ResourcePageType.ALL.value;
            }
        };
        ResourceController.createNowTimeLine = function () {
            var result = [];
            for (var i = 0; i < 30; i++) {
                var month = moment().subtract(i, 'days').format('DD');
                result.push(month + "\u65E5");
            }
            return result.reverse();
        };
        ResourceController.createDayTimeLine = function () {
            var result = [];
            for (var i = 1; i < 25; i++) {
                result.push(i + ":00");
            }
            return result;
        };
        ResourceController.createWeekTimeLine = function () {
            var result = [];
            for (var i = 1; i < 8; i++) {
                var week = moment().subtract(i, 'days').format('DD');
                result.push(week + "\u65E5");
            }
            return result.reverse();
        };
        ResourceController.createMonthTimeLine = function () {
            var result = [];
            for (var i = 1; i < 31; i++) {
                var month = moment().subtract(i, 'days').format('DD');
                result.push(month + "\u65E5");
            }
            return result.reverse();
        };
        ResourceController.createYearTimeLine = function () {
            var result = [];
            for (var i = 1; i < 13; i++) {
                var month = moment().subtract(i, 'month').format('MM');
                result.push(month + "\u6708");
            }
            return result.reverse();
        };
        ResourceController.$inject = ['$scope', '$timeout', '$interval', 'layer', 'i18nFactory', '$q', '$window', 'resourceService', '$state', 'dataSelectServer', 'echartFactory'];
        return ResourceController;
    }());
    main_app_1.app.controller('resourceController', ResourceController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VzL3Jlc291cmNlcy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQXNDYSxRQUFBLE9BQU8sR0FBZ0I7UUFDaEMsWUFBWSxFQUFFLEdBQUc7UUFDakIsUUFBUSxFQUFFLEtBQUs7UUFDZixTQUFTLEVBQUUsQ0FBQztRQUNaLFVBQVUsRUFBRSxDQUFDO1FBQ2IsUUFBUSxFQUFFLENBQUM7S0FDZCxDQUFDO0lBR0Y7UUFpREksNEJBQW9CLE1BQVcsRUFDbkIsUUFBa0IsRUFDbEIsU0FBYyxFQUNkLEtBQVUsRUFDVixXQUFnQixFQUNoQixFQUFPLEVBQ1AsT0FBWSxFQUNaLGVBQWdDLEVBQ2hDLE1BQVcsRUFDWCxnQkFBa0MsRUFDbEMsYUFBNkI7WUFWekMsaUJBMENDO1lBMUNtQixXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQ25CLGFBQVEsR0FBUixRQUFRLENBQVU7WUFDbEIsY0FBUyxHQUFULFNBQVMsQ0FBSztZQUNkLFVBQUssR0FBTCxLQUFLLENBQUs7WUFDVixnQkFBVyxHQUFYLFdBQVcsQ0FBSztZQUNoQixPQUFFLEdBQUYsRUFBRSxDQUFLO1lBQ1AsWUFBTyxHQUFQLE9BQU8sQ0FBSztZQUNaLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtZQUNoQyxXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQ1gscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtZQUNsQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7WUE5Q3pDLG9CQUFlLEdBQWtCLEVBQUUsQ0FBQztZQUVwQyxpQkFBWSxHQUFXLDJCQUFnQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDbEQsY0FBUyxHQUFXLENBQUMsQ0FBQztZQUN0QixZQUFPLEdBQVcsMkJBQWdCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUM3QyxXQUFNLEdBQWtCLEVBQUUsQ0FBQztZQUMzQixXQUFNLEdBQWtCLEVBQUUsQ0FBQztZQUMzQixZQUFPLEdBQWtCLEVBQUUs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LENBQUMsQ0FBQTtvQkFDRixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUcsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFHLENBQUM7Z0JBQ3pCLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksMkJBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQzFELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2xELENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksMkJBQWdCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQzdELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7Z0JBQ2hELENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksMkJBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQzFELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2xELENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksMkJBQWdCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQzVELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3BELENBQUM7Z0JBQ0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNkLElBQUksU0FBUyxHQUFhLFVBQUMsR0FBVztvQkFDbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxDQUFDLENBQUE7Z0JBQzVELENBQUMsQ0FBQztnQkFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRztvQkFDaEMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDeEMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDeEMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztpQkFDOUMsQ0FBQztnQkFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRztvQkFDbkMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztvQkFDdkMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztvQkFDdkMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztpQkFDN0MsQ0FBQztnQkFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRztvQkFDaEMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDeEMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDeEMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztpQkFDOUMsQ0FBQztnQkFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRztvQkFDbEMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztvQkFDMUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFB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QTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvcmVzb3VyY2VzL3Jlc291cmNlcy5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL21hcC9tYXAuY29udHJvbGxlcidcclxuaW1wb3J0ICcuL2NoYXJ0L2VubGFyZ2UuY29udHJvbGxlcidcclxuaW1wb3J0ICcuL2NoYXJ0L3N0YXRpc3RpY3Mvc3RhdGlzdGljLmNvbnRyb2xsZXInXHJcbmltcG9ydCAnY3NzIS4vY3NzL3Jlc291cmNlLmNzcydcclxuaW1wb3J0IFwiLi9jaGFydC9lY2hhcnRGYWN0b3J5XCJcclxuaW1wb3J0IHsgSUVjaGFydEZhY3RvcnkgfSBmcm9tIFwiLi9jaGFydC9lY2hhcnRGYWN0b3J5XCI7XHJcbmltcG9ydCB7IGFwcCB9IGZyb20gXCIuLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCB7IHNlYXJjaENoYXJ0UGFyYW1zIH0gZnJvbSAnLi4vY29tbW9uL3NlcnZpY2VzL3Jlc291cmNlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyByZXNvdXJjZVNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vc2VydmljZXMvcmVzb3VyY2Uuc2VydmljZSc7XHJcbmltcG9ydCAnanF1ZXJ5JztcclxuaW1wb3J0IFwiLi4vLi4vLi4vbGlicy9kcmFnL2RyYWdcIjtcclxuaW1wb3J0ICdtb21lbnQnXHJcbmltcG9ydCB7IFJvdXRlS2V5RW51bSB9IGZyb20gXCIuLi9jb21tb24vcm91dGVyL2VudW0vUm91dGVLZXlFbnVtXCI7XHJcbmltcG9ydCB7XHJcbiAgICBSZXNvdXJjZVBhZ2VUeXBlLFxyXG4gICAgSVN3aXRjaEJ1dHRvbixcclxuICAgIHN3aXRjaEJ1dHRvblxyXG59IGZyb20gXCIuLi8uLi9jb3JlL2VudGl0eS9SZXNvdXJjZVwiO1xyXG5pbXBvcnQgXCIuLi9jb21tb24vZmFjdG9yeS9kYXRhU2VsZWN0LmZhY3RvcnlcIjtcclxuaW1wb3J0IHsgZGF0YVNlbGVjdFNlcnZlciwgZGF0YVNlbGVjdFJlc3VsdCB9IGZyb20gXCIuLi9jb21tb24vZmFjdG9yeS9kYXRhU2VsZWN0LmZhY3RvcnlcIjtcclxuaW1wb3J0IHtTb2NrZXRSZXN1bHRUeXBlRW51bX0gZnJvbSBcIi4uLy4uL2NvcmUvc2VydmVyL2VudW0vU29ja2V0UmVzdWx0VHlwZUVudW1cIjtcclxuXHJcbmRlY2xhcmUgbGV0IG1vbWVudDogYW55LCBhbmd1bGFyOiBhbnksICQ6IGFueTtcclxuXHJcbmludGVyZmFjZSBzdHlsZSB7XHJcbiAgICBsZWZ0Pzogc3RyaW5nLFxyXG4gICAgd2lkdGg/OiBzdHJpbmcsXHJcbiAgICBtYXJnaW5MZWZ0Pzogc3RyaW5nXHJcbn1cclxuXHJcbmludGVyZmFjZSBwbGF5T2JqRW51bSB7XHJcbiAgICByZXNvdXJjZVR5cGU6IHN0cmluZywvL+i1hOa6kOexu+Wei1xyXG4gICAgdGltZVR5cGU6IHN0cmluZywvL+aXtumXtOexu+Wei1xyXG4gICAgcGxheUluZGV4OiBudW1iZXIsLy/lvZPliY3mkq3mlL7kuIvooahcclxuICAgIHN0YXJ0SW5kZXg6IG51bWJlciwvL+W8gOWni+aSreaUvueahOS4i+agh1xyXG4gICAgbGVuSW5kZXg6IG51bWJlci8v5oC76ZW/5bqm5pyA5ZCO5LiA5Liq5LiL5qCHXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBwbGF5T2JqOiBwbGF5T2JqRW51bSA9IHtcclxuICAgIHJlc291cmNlVHlwZTogXCIwXCIsLy/otYTmupDnsbvlnotcclxuICAgIHRpbWVUeXBlOiBcIkFMTFwiLC8v5pe26Ze057G75Z6LXHJcbiAgICBwbGF5SW5kZXg6IDAsLy/lvZPliY3mkq3mlL7kuIvooahcclxuICAgIHN0YXJ0SW5kZXg6IDAsLy/lvIDlp4vmkq3mlL7nmoTkuIvmoIdcclxuICAgIGxlbkluZGV4OiAwLy/mgLvplb/luqbmnIDlkI7kuIDkuKrkuIvmoIdcclxufTtcclxuXHJcblxyXG5jbGFzcyBSZXNvdXJjZUNvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsICckdGltZW91dCcsICckaW50ZXJ2YWwnLCAnbGF5ZXInLCAnaTE4bkZhY3RvcnknLCAnJHEnLCAnJHdpbmRvdycsICdyZXNvdXJjZVNlcnZpY2UnLCAnJHN0YXRlJywgJ2RhdGFTZWxlY3RTZXJ2ZXInLCAnZWNoYXJ0RmFjdG9yeSddO1xyXG5cclxuICAgIG1hcDogYW55O1xyXG5cclxuICAgIHVpX2Ryb3BfcGxheUJnOiBzdHlsZTtcclxuICAgIHVpX2Ryb3BfcGxheUJnX2N1clBsYXk6IHN0eWxlO1xyXG4gICAgdWlfdF9jX3RsRHJvcDogc3R5bGU7XHJcbiAgICB1aV90X2NfdGxEcm9wX3N0YXJ0OiBzdHlsZTtcclxuICAgIHVpX3RfY190bERyb3BfZW5kOiBzdHlsZTtcclxuXHJcbiAgICB1aV90X2NfdGw6IHN0eWxlOyAvL+aXtumXtOi9tOmVv+W6plxyXG4gICAgdWlfdF9jX3RsU2NhbGVJdGVtOiBzdHlsZTsgLy/ml7bpl7TovbTliLvluqbljZXkuKrplb/luqZcclxuICAgIHRfY190bFNjYWxlRGF0YTogQXJyYXk8c3RyaW5nPiA9IFtdOyAvL+aXtumXtOi9tOaVsOaNrlxyXG5cclxuICAgIHRsX3p5VHlwZVR4dDogc3RyaW5nID0gUmVzb3VyY2VQYWdlVHlwZS5BTEwudmFsdWU7XHJcbiAgICB0bF96eVR5cGU6IG51bWJlciA9IDA7XHJcbiAgICB0bF90eXBlOiBzdHJpbmcgPSBSZXNvdXJjZVBhZ2VUeXBlLkFMTC52YWx1ZTtcclxuICAgIHRsX25vdzogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgdGxfZGF5OiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICB0bF93ZWVrOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICB0bF9tb250aDogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgdGxfeWVhcjogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICAgIHN3aXRjaEJ1dHRvbjogSVN3aXRjaEJ1dHRvbiA9IHN3aXRjaEJ1dHRvbjtcclxuICAgIGRhdGF0eXBlOiBzdHJpbmcgPSBSZXNvdXJjZVBhZ2VUeXBlLkFMTC52YWx1ZTsgLy8g5pWw5o2u5oC76YeP57G75Z6LXHJcbiAgICBkYXRhdGl0bGU6IHN0cmluZyA9ICdEUF9SRVNPVVJDRV9USU1FXzE2JztcclxuICAgIHRpbWVUaWxlRGF0YTogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgdGltZVRpdGxlRGF0YTogQXJyYXk8eyBrZXk6IG51bWJlciwgdmFsdWU6IG51bWJlciB9PjtcclxuICAgIHBsYXlPYmo6IHBsYXlPYmpFbnVtID0gcGxheU9iajtcclxuICAgIHJlbmRlck51bTogbnVtYmVyID0gMDsgIC8vIOaVsOaNruaAu+mHj1xyXG4gICAgc2VsZWN0UmVzb3VyY2VUeXBlOiBzdHJpbmcgPSAnRFBfUkVTT1VSQ0VfVElNRV8xMCc7XHJcbiAgICBzZWxlY3RSZXNvdXJjZVRpbWU6IHN0cmluZyA9ICdEUF9SRVNPVVJDRV9USU1FXzE3JztcclxuICAgIHRvdGFsTnVtOiBudW1iZXI7IC8v5L+d5a2Y5pWw5o2u5oC76YePXHJcbiAgICBzaHRsZUlub3dUaWZvOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBSZXNvdXJjZVBhZ2VUeXBlOiBhbnkgPSBSZXNvdXJjZVBhZ2VUeXBlO1xyXG4gICAgdHlwZUJ1dHRvbk5hbWVTd2l0Y2g6IEFycmF5PHN0cmluZz4gPSBPYmplY3Qua2V5cyhSZXNvdXJjZVBhZ2VUeXBlKTtcclxuICAgIHRpbWVyOiBhbnkgPSBudWxsO1xyXG4gICAgZGF0YXRpbWVyOiBhbnkgPSBudWxsO1xyXG4gICAgY2hhcnRUaW1lc3RhbXA6IGFueSA9IG51bGw7XHJcblxyXG4gICAgY2hhcnREYXRhOiBhbnk7XHJcbiAgICBpc3BsYXk6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGNhY2hlQ2hhcnRkYXRhOiBhbnk7XHJcblxyXG4gICAgaXNEZXN0b3J5OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBzd2l0Y2hTdGF0ZUJ1dHRvbjogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgc29ja2V0QXJyOkFycmF5PHN0cmluZz47XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LFxyXG4gICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IEZ1bmN0aW9uLFxyXG4gICAgICAgIHByaXZhdGUgJGludGVydmFsOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBsYXllcjogYW55LFxyXG4gICAgICAgIHByaXZhdGUgaTE4bkZhY3Rvcnk6IGFueSxcclxuICAgICAgICBwcml2YXRlICRxOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSAkd2luZG93OiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSByZXNvdXJjZVNlcnZpY2U6IHJlc291cmNlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlICRzdGF0ZTogYW55LFxyXG4gICAgICAgIHByaXZhdGUgZGF0YVNlbGVjdFNlcnZlcjogZGF0YVNlbGVjdFNlcnZlcixcclxuICAgICAgICBwcml2YXRlIGVjaGFydEZhY3Rvcnk6IElFY2hhcnRGYWN0b3J5XHJcbiAgICApIHtcclxuICAgICAgICAvLyDojrflj5blvZPliY3pobXpnaLnsbvlnotcclxuICAgICAgICB0aGlzLmdldENoYXJ0RGF0YVR5cGUoKTtcclxuXHJcbiAgICAgICAgLy/pobXpnaLplIDmr4FcclxuICAgICAgICB0aGlzLiRzY29wZS4kb24oXCIkZGVzdHJveVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNEZXN0b3J5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy4kaW50ZXJ2YWwuY2FuY2VsKHRoaXMudGltZXIpO1xyXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuZGF0YXRpbWVyKTtcclxuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLmNoYXJ0VGltZXN0YW1wKTtcclxuXHJcbiAgICAgICAgICAgIC8vIOWtmOWcqHNvY2tldOiuoumYheaXtizlj5bmtojorqLpmIVcclxuICAgICAgICAgICAgdGhpcy5pc0NhbmNlbFNvY2tldCgpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudGltZVRpbGVEYXRhID0gWzAsIDEwLCAwLCAwLCAwLCAxMCwgMCwgMCwgMCwgMTAsIDAsIDAsIDAsIDEwLCAwLCAwLCAwXTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0VGltZUxpbmVEYXRhKCk7IC8v5qCH5a6a5pe26Ze05Yi75bqmXHJcbiAgICAgICAgdGhpcy5pbml0TGF5b3V0KCk7ICAgICAgIC8v5Yid5aeL5YyW55WM6Z2iXHJcbiAgICAgICAgdGhpcy5pbml0RHJhZygpOyAgICAgICAgIC8v57uY5Yi255WM6Z2iXHJcbiAgICAgICAgLy8gY2hhcnRcclxuICAgICAgICB0aGlzLmZvcm1hdCgpOyAgICAgICAvLyDmoLzlvI/ljJbmgLvph4/lsZXnpLpcclxuICAgICAgICB0aGlzLmdldFRvdGFsRGF0YSgpOyAvLyDlvpfliLDotYTmupDnu5/orqHmgLvph49cclxuICAgICAgICB0aGlzLmdldENoYXJ0RGF0YSgpOyAvLyDlvpfliLDlm77ooajmlbDmja5cclxuXHJcbiAgICAgICAgbGV0IHRoYXQ6IGFueSA9IHRoaXM7XHJcbiAgICAgICAgd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuaW5pdExheW91dChkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGdldENoYXJ0RGF0YSgpIHtcclxuICAgICAgICBsZXQgdGhhdDogUmVzb3VyY2VDb250cm9sbGVyID0gdGhpcztcclxuICAgICAgICBsZXQgZGF0YVNlbGVjdFJlc3VsdFBhcmFtcyA9IHt9IGFzIGRhdGFTZWxlY3RSZXN1bHQ7XHJcbiAgICAgICAgZGF0YVNlbGVjdFJlc3VsdFBhcmFtcy5tb2R1bGUgPSB0aGF0LnRsX3R5cGU7XHJcbiAgICAgICAgbGV0IHRpbWU6IGRhdGFTZWxlY3RSZXN1bHQgPSB0aGF0LmRhdGFTZWxlY3RTZXJ2ZXIuZ2V0UGFyYW1zVGltZShkYXRhU2VsZWN0UmVzdWx0UGFyYW1zKTtcclxuXHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IHtcclxuICAgICAgICAgICAgdHlwZTogdGhhdC5kYXRhdHlwZSxcclxuICAgICAgICAgICAgdGltZVN0YW1wOiB0aGF0LnBsYXlPYmoudGltZVR5cGUsXHJcbiAgICAgICAgICAgIHN0YXJ0OiB0aW1lLnN0YXJ0VGltZSxcclxuICAgICAgICAgICAgZW5kOiB0aW1lLmVuZFRpbWVcclxuICAgICAgICB9IGFzIHNlYXJjaENoYXJ0UGFyYW1zO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhhdC5yZXNvdXJjZVNlcnZpY2UuZ2V0Q2hhcnREYXRhKHBhcmFtcykudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBhbmd1bGFyLmNvcHkocmVzKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuY2FjaGVDaGFydGRhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5jaGFydERhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5ib3JkY2FzdENoaWxkKGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQuZ2V0TmV3RGF0YSgpXHJcblxyXG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgdGhhdC5nZXROZXdEYXRhKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOe7meWQhOS4quaooeWdl+eahGVjaGFydOihqOWPkemAgea2iOaBr1xyXG4gICAgYm9yZGNhc3RDaGlsZChkYXRhPzogYW55KSB7XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRicm9hZGNhc3QodGhpcy5kYXRhdHlwZSwgZGF0YSA/IGRhdGEgOiB0aGlzLmNoYXJ0RGF0YSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8v57uY5Yi254Ot5Yqb5Zu+XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGJyb2FkY2FzdCgnZHJhd01hcCcsIGRhdGEgJiYgZGF0YS5JTWFwUmVzb3VyY2UgPyBkYXRhLklNYXBSZXNvdXJjZSA6IHRoaXMuY2hhcnREYXRhLklNYXBSZXNvdXJjZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nu5/orqHmgLvmlbBcclxuICAgIGdldFRvdGFsRGF0YSgpIHtcclxuICAgICAgICBsZXQgdGhhdDogYW55ID0gdGhpcztcclxuICAgICAgICBsZXQgcGFyYW1zOiBzdHJpbmcgPSBSZXNvdXJjZVBhZ2VUeXBlLkFMTC52YWx1ZTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVzOiBhbnkpIHtcclxuICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRpY1RvdGFsKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldFRvdGFsRGF0YShyZXMuZGF0YSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGljVG90YWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZXNvdXJjZVNlcnZpY2UuZ2V0UmVzb3VyY2VOdW1CeVRpbWUocGFyYW1zKS50aGVuKGNvbXBsZXRlLmJpbmQodGhpcykpLmNhdGNoKChlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0aWNUb3RhbCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy/orr7nva7mgLvmlbDmlbDmja5cclxuICAgIHNldFRvdGFsRGF0YShyZXM6IGFueSkge1xyXG4gICAgICAgIGlmICghIXJlcykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50bF96eVR5cGVUeHQgPT0gUmVzb3VyY2VQYWdlVHlwZS5BTEwudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBudW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMocmVzKS5mb3JFYWNoKCh0eXBlOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBudW0gKz0gcGFyc2VJbnQocmVzW3R5cGVdLnRvdGFsRmxvdylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsTnVtID0gbnVtO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJOdW0gPSBudW07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy50bF96eVR5cGVUeHQgPT0gUmVzb3VyY2VQYWdlVHlwZS5GYWNlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlck51bSA9IHBhcnNlSW50KHJlcy5GYWNlLnRvdGFsRmxvdyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy50bF96eVR5cGVUeHQgPT0gUmVzb3VyY2VQYWdlVHlwZS5WZWhpY2xlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlck51bSA9IHBhcnNlSW50KHJlcy5DYXIudG90YWxGbG93KVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGxfenlUeXBlVHh0ID09IFJlc291cmNlUGFnZVR5cGUuV2lGaS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJOdW0gPSBwYXJzZUludChyZXMuV0lGSS50b3RhbEZsb3cpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGxfenlUeXBlVHh0ID09IFJlc291cmNlUGFnZVR5cGUuRUZFTkNFLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlck51bSA9IHBhcnNlSW50KHJlcy5FRkVOQ0UudG90YWxGbG93KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmZvcm1hdCgpO1xyXG4gICAgICAgICAgICBsZXQgZm9ybWF0TnVtOiBGdW5jdGlvbiA9IChudW06IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhudW0pLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csICcsJylcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5SZXNvdXJjZVBhZ2VUeXBlLkZhY2UubnVtYmVyID0ge1xyXG4gICAgICAgICAgICAgICAgdG9kYXlGbG93OiBmb3JtYXROdW0ocmVzLkZhY2UudG9kYXlGbG93KSxcclxuICAgICAgICAgICAgICAgIHRvdGFsRmxvdzogZm9ybWF0TnVtKHJlcy5GYWNlLnRvdGFsRmxvdyksXHJcbiAgICAgICAgICAgICAgICB0b3RhbENvdW50TnVtOiBwYXJzZUludChyZXMuRmFjZS50b3RhbEZsb3cpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuUmVzb3VyY2VQYWdlVHlwZS5WZWhpY2xlLm51bWJlciA9IHtcclxuICAgICAgICAgICAgICAgIHRvZGF5RmxvdzogZm9ybWF0TnVtKHJlcy5DYXIudG9kYXlGbG93KSxcclxuICAgICAgICAgICAgICAgIHRvdGFsRmxvdzogZm9ybWF0TnVtKHJlcy5DYXIudG90YWxGbG93KSxcclxuICAgICAgICAgICAgICAgIHRvdGFsQ291bnROdW06IHBhcnNlSW50KHJlcy5DYXIudG90YWxGbG93KVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLlJlc291cmNlUGFnZVR5cGUuV2lGaS5udW1iZXIgPSB7XHJcbiAgICAgICAgICAgICAgICB0b2RheUZsb3c6IGZvcm1hdE51bShyZXMuV0lGSS50b2RheUZsb3cpLFxyXG4gICAgICAgICAgICAgICAgdG90YWxGbG93OiBmb3JtYXROdW0ocmVzLldJRkkudG90YWxGbG93KSxcclxuICAgICAgICAgICAgICAgIHRvdGFsQ291bnROdW06IHBhcnNlSW50KHJlcy5XSUZJLnRvdGFsRmxvdylcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5SZXNvdXJjZVBhZ2VUeXBlLkVGRU5DRS5udW1iZXIgPSB7XHJcbiAgICAgICAgICAgICAgICB0b2RheUZsb3c6IGZvcm1hdE51bShyZXMuRUZFTkNFLnRvZGF5RmxvdyksXHJcbiAgICAgICAgICAgICAgICB0b3RhbEZsb3c6IGZvcm1hdE51bShyZXMuRUZFTkNFLnRvdGFsRmxvdyksXHJcbiAgICAgICAgICAgICAgICB0b3RhbENvdW50TnVtOiBwYXJzZUludChyZXMuRUZFTkNFLnRvdGFsRmxvdylcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQobnVtYXJyOiBBcnJheTxudW1iZXI+KSB7XHJcbiAgICAgICAgbGV0IGEgPSBhbmd1bGFyLmNvcHkodGhpcy50aW1lVGlsZURhdGEpO1xyXG4gICAgICAgIGxldCBhcnIgPSBhbmd1bGFyLmNvcHkoYS5yZXZlcnNlKCkpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChhcnJbaV0gIT09IDEwICYmIG51bWFycltpXSAmJiBudW1hcnJbaV0gIT0gMTApIHtcclxuICAgICAgICAgICAgICAgIGFycltpXSA9IG51bWFycltpXVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFycltpXSAhPT0gMTApIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnJbaV0gPSAwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50aW1lVGlsZURhdGEgPSBhcnIucmV2ZXJzZSgpO1xyXG4gICAgICAgIGxldCB0ZW1wQXJyID0gW10gYXMgQXJyYXk8eyBrZXk6IG51bWJlciwgdmFsdWU6IG51bWJlciB9PjtcclxuICAgICAgICB0aGlzLnRpbWVUaWxlRGF0YS5mb3JFYWNoKChpdGVtOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgdGVtcEFyci5wdXNoKHsga2V5OiBNYXRoLnJhbmRvbSgpLCB2YWx1ZTogaXRlbSB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnRpbWVUaXRsZURhdGEgPSBhbmd1bGFyLmNvcHkodGVtcEFycik7XHJcbiAgICB9XHJcblxyXG4gICAgZm9ybWF0KCkge1xyXG4gICAgICAgIGxldCBudW06IG51bWJlciA9IHRoaXMucmVuZGVyTnVtO1xyXG4gICAgICAgIGxldCBzdHI6IHN0cmluZyA9IG51bS50b1N0cmluZygpO1xyXG4gICAgICAgIGxldCBudW1hcnIgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbnVtYXJyW2ldID0gcGFyc2VJbnQoc3RyW2ldKVxyXG4gICAgICAgIH1cclxuICAgICAgICBudW1hcnIgPSBudW1hcnIucmV2ZXJzZSgpO1xyXG4gICAgICAgIGlmIChudW1hcnIubGVuZ3RoID49IDMpIHtcclxuICAgICAgICAgICAgbnVtYXJyLnNwbGljZSgzLCAwLCAxMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobnVtYXJyLmxlbmd0aCA+PSA3KSB7XHJcbiAgICAgICAgICAgIG51bWFyci5zcGxpY2UoNywgMCwgMTApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG51bWFyci5sZW5ndGggPj0gMTEpIHtcclxuICAgICAgICAgICAgbnVtYXJyLnNwbGljZSgxMSwgMCwgMTApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb21wdXRlZChudW1hcnIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5pe26Ze06L20XHJcbiAgICBpbml0VGltZUxpbmVEYXRhKCkge1xyXG4gICAgICAgIHRoaXMudGxfbm93ID0gUmVzb3VyY2VDb250cm9sbGVyLmNyZWF0ZU5vd1RpbWVMaW5lKCk7XHJcblxyXG4gICAgICAgIHRoaXMudGxfbW9udGggPSBSZXNvdXJjZUNvbnRyb2xsZXIuY3JlYXRlTW9udGhUaW1lTGluZSgpO1xyXG5cclxuICAgICAgICB0aGlzLnRsX2RheSA9IFJlc291cmNlQ29udHJvbGxlci5jcmVhdGVEYXlUaW1lTGluZSgpO1xyXG5cclxuICAgICAgICB0aGlzLnRsX3llYXIgPSBSZXNvdXJjZUNvbnRyb2xsZXIuY3JlYXRlWWVhclRpbWVMaW5lKCk7XHJcblxyXG4gICAgICAgIHRoaXMudGxfd2VlayA9IFJlc291cmNlQ29udHJvbGxlci5jcmVhdGVXZWVrVGltZUxpbmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0TGF5b3V0KHdpZHRoPzogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHRsSXRlbU51bSA9IDA7XHJcbiAgICAgICAgbGV0IG1haW5fdyA9IHdpZHRoID8gd2lkdGggOiBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xyXG4gICAgICAgIHRoaXMudWlfdF9jX3RsID0geyB3aWR0aDogKG1haW5fdyAtIDM1MCkgKyAncHgnLCBtYXJnaW5MZWZ0OiAnNXB4JyB9O1xyXG5cclxuICAgICAgICB0aGlzLnRfY190bFNjYWxlRGF0YSA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLnRsX3R5cGUgPT0gXCJBTExcIikge1xyXG4gICAgICAgICAgICB0bEl0ZW1OdW0gPSB0aGlzLnRsX25vdy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXMudF9jX3RsU2NhbGVEYXRhID0gdGhpcy50bF9ub3c7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnRsX3R5cGUgPT0gXCJEYXlcIikge1xyXG4gICAgICAgICAgICB0bEl0ZW1OdW0gPSB0aGlzLnRsX2RheS5sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXMudF9jX3RsU2NhbGVEYXRhID0gdGhpcy50bF9kYXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnRsX3R5cGUgPT0gXCJXZWVrXCIpIHtcclxuICAgICAgICAgICAgdGxJdGVtTnVtID0gdGhpcy50bF93ZWVrLmxlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy50X2NfdGxTY2FsZURhdGEgPSB0aGlzLnRsX3dlZWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnRsX3R5cGUgPT0gXCJNb250aFwiKSB7XHJcbiAgICAgICAgICAgIHRsSXRlbU51bSA9IHRoaXMudGxfbW9udGgubGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLnRfY190bFNjYWxlRGF0YSA9IHRoaXMudGxfbW9udGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnRsX3R5cGUgPT0gXCJZZWFyXCIpIHtcclxuICAgICAgICAgICAgdGxJdGVtTnVtID0gdGhpcy50bF95ZWFyLmxlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy50X2NfdGxTY2FsZURhdGEgPSB0aGlzLnRsX3llYXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudWlfdF9jX3RsU2NhbGVJdGVtID0geyB3aWR0aDogKChtYWluX3cgLSAzNTApIC8gdGxJdGVtTnVtKSArICdweCcgfTsvL+iuvue9ruaXtumXtOi9tFxyXG4gICAgICAgIHRoaXMucGxheU9iai5sZW5JbmRleCA9IHRsSXRlbU51bSAtIDE7Ly/orr7nva7mgLvplb/luqbmnIDlkI7kuIDkuKrlgLznmoTkuIvmoIdcclxuXHJcbiAgICAgICAgLy/liKTmlq3lvZPliY3ml7bpl7TngrlcclxuICAgICAgICB0aGlzLnVpX3RfY190bERyb3AgPSB7IHdpZHRoOiAobWFpbl93IC0gMzUwKSArICdweCcgfTtcclxuICAgICAgICB0aGlzLnVpX3RfY190bERyb3Bfc3RhcnQgPSB7IGxlZnQ6ICcwcHgnIH07Ly/ov5jljp/liJ3lp4vlgLxcclxuICAgICAgICB0aGlzLnVpX3RfY190bERyb3BfZW5kID0geyBsZWZ0OiAobWFpbl93IC0gMzUwIC0gMTApICsgXCJweFwiIH07Ly/ov5jljp/liJ3lp4vlgLxcclxuICAgICAgICB0aGlzLnVpX2Ryb3BfcGxheUJnID0geyBsZWZ0OiBcIjBweFwiLCB3aWR0aDogKG1haW5fdyAtIDM1MCkgKyBcInB4XCIgfTtcclxuICAgICAgICB0aGlzLnVpX2Ryb3BfcGxheUJnX2N1clBsYXkgPSB7IHdpZHRoOiAnMCUnIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy/ml7bpl7TovbTliLvluqbnur/mi5bliqhcclxuICAgIGluaXREcmFnKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAkKFwiI2Ryb3Bfc3RhcnRcIikuZHJhZ2dpbmcoe1xyXG4gICAgICAgICAgICBtb3ZlOiAneCcsXHJcbiAgICAgICAgICAgIHJhbmRvbVBvc2l0aW9uOiBmYWxzZVxyXG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2VsZi51aV90X2NfdGxEcm9wX3N0YXJ0LmxlZnQgPSB0aGlzLmNzcyhcImxlZnRcIik7XHJcblxyXG4gICAgICAgICAgICBsZXQgd2lkdGg6IG51bWJlciA9IHBhcnNlSW50KChzZWxmLnVpX3RfY190bERyb3BfZW5kLmxlZnQpLnJlcGxhY2UoXCJweFwiLCBcIlwiKSkgLSBwYXJzZUludCh0aGlzLmNzcyhcImxlZnRcIikucmVwbGFjZShcInB4XCIsIFwiXCIpKSArIDU7XHJcbiAgICAgICAgICAgIHNlbGYudWlfZHJvcF9wbGF5QmcgPSB7IGxlZnQ6IHRoaXMuY3NzKFwibGVmdFwiKSwgd2lkdGg6IHdpZHRoICsgXCJweFwiIH07XHJcbiAgICAgICAgICAgIC8v6LCD55So5qCh6aqMXHJcbiAgICAgICAgICAgIHNlbGYuY2hrVGltZUxpbmUod2lkdGgsIHBhcnNlSW50KHRoaXMuY3NzKFwibGVmdFwiKS5yZXBsYWNlKFwicHhcIiwgXCJcIikpLCBwYXJzZUludCgoc2VsZi51aV90X2NfdGxEcm9wX2VuZC5sZWZ0KS5yZXBsYWNlKFwicHhcIiwgXCJcIikpLCBcInN0YXJ0XCIpO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy/pvKDmoIfmiqzotbflkI7moKHpqoxcclxuICAgICAgICAgICAgc2VsZi5jaGtNb3VzZVVwKHNlbGYudWlfdF9jX3RsRHJvcF9zdGFydC5sZWZ0LCBzZWxmLnVpX3RfY190bERyb3BfZW5kLmxlZnQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiI2Ryb3BfZW5kXCIpLmRyYWdnaW5nKHtcclxuICAgICAgICAgICAgbW92ZTogJ3gnLFxyXG4gICAgICAgICAgICByYW5kb21Qb3NpdGlvbjogZmFsc2VcclxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGYudWlfdF9jX3RsRHJvcF9lbmQubGVmdCA9IHRoaXMuY3NzKFwibGVmdFwiKTtcclxuICAgICAgICAgICAgbGV0IHdpZHRoOiBudW1iZXIgPSBwYXJzZUludCh0aGlzLmNzcyhcImxlZnRcIikucmVwbGFjZShcInB4XCIsIFwiXCIpKSAtIHBhcnNlSW50KChzZWxmLnVpX3RfY190bERyb3Bfc3RhcnQubGVmdCkucmVwbGFjZShcInB4XCIsIFwiXCIpKSArIDU7XHJcbiAgICAgICAgICAgIHNlbGYudWlfZHJvcF9wbGF5QmcgPSB7IGxlZnQ6IHNlbGYudWlfdF9jX3RsRHJvcF9zdGFydC5sZWZ0LCB3aWR0aDogd2lkdGggKyBcInB4XCIgfTtcclxuICAgICAgICAgICAgLy/osIPnlKjmoKHpqoxcclxuICAgICAgICAgICAgc2VsZi5jaGtUaW1lTGluZSh3aWR0aCwgcGFyc2VJbnQoKHNlbGYudWlfdF9jX3RsRHJvcF9zdGFydC5sZWZ0KS5yZXBsYWNlKFwicHhcIiwgXCJcIikpLCBwYXJzZUludCh0aGlzLmNzcyhcImxlZnRcIikucmVwbGFjZShcInB4XCIsIFwiXCIpKSwgXCJlbmRcIik7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL+m8oOagh+aKrOi1t+WQjuagoemqjFxyXG4gICAgICAgICAgICBzZWxmLmNoa01vdXNlVXAoc2VsZi51aV90X2NfdGxEcm9wX3N0YXJ0LmxlZnQsIHNlbGYudWlfdF9jX3RsRHJvcF9lbmQubGVmdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hrVGltZUxpbmUodGltZVdpZHRoOiBudW1iZXIsIHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCB0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNjYWxlSXRlbVdpZHRoOiBudW1iZXIgPSBwYXJzZUludChzZWxmLnVpX3RfY190bFNjYWxlSXRlbS53aWR0aC5yZXBsYWNlKFwicHhcIiwgXCJcIikpO1xyXG4gICAgICAgIC8v5b2T6Ze06Led5bCP5LqO5pyA5bCP5Yi75bqm5pe2XHJcbiAgICAgICAgaWYgKHRpbWVXaWR0aCA8IHNjYWxlSXRlbVdpZHRoKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gXCJzdGFydFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi51aV90X2NfdGxEcm9wX3N0YXJ0LmxlZnQgPSAoZW5kIC0gc2NhbGVJdGVtV2lkdGggKyA1KSArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09IFwiZW5kXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnVpX3RfY190bERyb3BfZW5kLmxlZnQgPSAoc3RhcnQgKyBzY2FsZUl0ZW1XaWR0aCAtIDUpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VsZi51aV9kcm9wX3BsYXlCZy5sZWZ0ID0gc2VsZi51aV90X2NfdGxEcm9wX3N0YXJ0LmxlZnQ7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnVpX2Ryb3BfcGxheUJnLndpZHRoID0gc2NhbGVJdGVtV2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoa01vdXNlVXAoc3RhcnRfbGVmdDogc3RyaW5nLCBlbmRfbGVmdDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgc2NhbGVJdGVtV2lkdGg6IG51bWJlciA9IHBhcnNlSW50KHNlbGYudWlfdF9jX3RsU2NhbGVJdGVtLndpZHRoLnJlcGxhY2UoXCJweFwiLCBcIlwiKSk7XHJcbiAgICAgICAgICAgIGxldCBkcm9wV2lkdGg6IG51bWJlciA9IHBhcnNlSW50KHNlbGYudWlfdF9jX3RsRHJvcC53aWR0aC5yZXBsYWNlKFwicHhcIiwgXCJcIikpO1xyXG4gICAgICAgICAgICBsZXQgc3RhcnRfbGVmdF9udW06IG51bWJlciA9IHBhcnNlSW50KHN0YXJ0X2xlZnQucmVwbGFjZSgncHgnLCAnJykpO1xyXG4gICAgICAgICAgICBsZXQgZW5kX2xlZnRfbnVtOiBudW1iZXIgPSBwYXJzZUludChlbmRfbGVmdC5yZXBsYWNlKCdweCcsICcnKSk7XHJcbiAgICAgICAgICAgIHN0YXJ0X2xlZnRfbnVtID0gKHN0YXJ0X2xlZnRfbnVtIC8gc2NhbGVJdGVtV2lkdGgpICogc2NhbGVJdGVtV2lkdGg7XHJcbiAgICAgICAgICAgIGVuZF9sZWZ0X251bSA9IE1hdGguY2VpbChlbmRfbGVmdF9udW0gLyBzY2FsZUl0ZW1XaWR0aCkgKiBzY2FsZUl0ZW1XaWR0aDtcclxuICAgICAgICAgICAgaWYgKGVuZF9sZWZ0X251bSA+PSBkcm9wV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIGVuZF9sZWZ0X251bSA9IGRyb3BXaWR0aFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYudWlfdF9jX3RsRHJvcF9zdGFydC5sZWZ0ID0gc3RhcnRfbGVmdF9udW0gKyAncHgnO1xyXG4gICAgICAgICAgICBzZWxmLnVpX3RfY190bERyb3BfZW5kLmxlZnQgPSBlbmRfbGVmdF9udW0gKyAncHgnO1xyXG4gICAgICAgICAgICBzZWxmLnVpX2Ryb3BfcGxheUJnLmxlZnQgPSBzZWxmLnVpX3RfY190bERyb3Bfc3RhcnQubGVmdDtcclxuICAgICAgICAgICAgc2VsZi51aV9kcm9wX3BsYXlCZy53aWR0aCA9IChlbmRfbGVmdF9udW0gLSBzdGFydF9sZWZ0X251bSkgKyAncHgnO1xyXG4gICAgICAgIH0sIDEwMClcclxuICAgIH1cclxuXHJcbiAgICBwbGF5RGF0YSgpIHtcclxuICAgICAgICB0aGlzLmNoYXJ0RGF0YSA9IHRoaXMuY2FjaGVDaGFydGRhdGE7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5pc3BsYXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+aSreaUvuW8gOWni+aXtua4hemZpOW+queOr+ivt+axguaOpeWPo1xyXG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5jaGFydFRpbWVzdGFtcCk7XHJcbiAgICAgICAgdGhpcy5jaGFydFRpbWVzdGFtcCA9IG51bGw7XHJcblxyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAodGhpcy50aW1lciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGludGVydmFsLmNhbmNlbCh0aGlzLnRpbWVyKTtcclxuICAgICAgICAgICAgc2VsZi50aW1lciA9IG51bGxcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHN0YXJ0OiBudW1iZXIgPSBwYXJzZUludCgoc2VsZi51aV90X2NfdGxEcm9wX3N0YXJ0LmxlZnQpLnJlcGxhY2UoXCJweFwiLCBcIlwiKSk7XHJcbiAgICAgICAgbGV0IHdpZHRoOiBudW1iZXIgPSBwYXJzZUludCgoc2VsZi51aV9kcm9wX3BsYXlCZy53aWR0aCkucmVwbGFjZShcInB4XCIsIFwiXCIpKTtcclxuICAgICAgICBsZXQgc2NhbGVJdGVtV2lkdGg6IG51bWJlciA9IHBhcnNlSW50KHNlbGYudWlfdF9jX3RsU2NhbGVJdGVtLndpZHRoLnJlcGxhY2UoXCJweFwiLCBcIlwiKSk7XHJcbiAgICAgICAgbGV0IG51bSA9IHdpZHRoIC8gc2NhbGVJdGVtV2lkdGg7XHJcbiAgICAgICAgbGV0IHN0YXJ0TnVtID0gc3RhcnQgLyBzY2FsZUl0ZW1XaWR0aDtcclxuICAgICAgICBsZXQgdGltZVNwQXJyOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICAgICAgaWYgKHNlbGYudGxfdHlwZSA9PSBcIkRheVwiKSB7XHJcbiAgICAgICAgICAgIHRpbWVTcEFyciA9IHNlbGYudGxfZGF5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2VsZi50bF90eXBlID09IFwiV2Vla1wiKSB7XHJcbiAgICAgICAgICAgIHRpbWVTcEFyciA9IHNlbGYudGxfd2VlaztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNlbGYudGxfdHlwZSA9PSBcIk1vbnRoXCIpIHtcclxuICAgICAgICAgICAgdGltZVNwQXJyID0gc2VsZi50bF9tb250aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNlbGYudGxfdHlwZSA9PSBcIlllYXJcIikge1xyXG4gICAgICAgICAgICB0aW1lU3BBcnIgPSBzZWxmLnRsX3llYXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYucGxheU9iai5zdGFydEluZGV4ID0gc3RhcnROdW07Ly/orr7nva7lvIDlp4vmkq3mlL7ml7bkuIvmoIflgLxcclxuICAgICAgICBzZWxmLnBsYXlPYmoubGVuSW5kZXggPSB0aW1lU3BBcnIubGVuZ3RoIC0gMTsvL+iuvue9ruaAu+mVv+W6puacgOWQjuS4gOS4quWAvOeahOS4i+agh1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5byA5aeL54K55LiL5qCH77yaXCIgKyBzdGFydE51bSArIFwiX19fX1/mgLvorqHkuKrmlbDvvJpcIiArIG51bSArIFwiX19fX19fX19cIiArIHNlbGYucGxheU9iai5sZW5JbmRleCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gc2VsZi5jaGFydERhdGEpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuY2hhcnREYXRhW2ldICYmIHNlbGYuY2hhcnREYXRhW2ldLnBsYXlEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNoYXJ0RGF0YVtpXS5zZXJpZXMgPSBzZWxmLmNoYXJ0RGF0YVtpXS5wbGF5RGF0YVswXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi5ib3JkY2FzdENoaWxkKCk7XHJcbiAgICAgICAgbGV0IHRlbXBOdW0gPSAwO1xyXG4gICAgICAgIGxldCB0ZW1wSW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMudGltZXIgPSB0aGlzLiRpbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0ZW1wTnVtID09IDEwMDApIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuJGludGVydmFsLmNhbmNlbChzZWxmLnRpbWVyKTtcclxuICAgICAgICAgICAgICAgIHNlbGYudGltZXIgPSBudWxsXHJcbiAgICAgICAgICAgICAgICAvL+aSreaUvuWujOaIkOWQjumHjeaWsOivt+axguaVsOaNrlxyXG4gICAgICAgICAgICAgICAgc2VsZi5nZXRDaGFydERhdGEoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGFydE51bSA9PSAwICYmIHRlbXBOdW0gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucGxheU9iai5wbGF5SW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnVpX2Ryb3BfcGxheUJnX2N1clBsYXkgPSB7IHdpZHRoOiAodGVtcE51bSAvIDEwKSArIFwiJVwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXBJbmRleCAhPSBNYXRoLmZsb29yKCQoXCIjZHJvcF9wbGF5QmdfY3VyUGxheVwiKS53aWR0aCgpIC8gc2NhbGVJdGVtV2lkdGggKyBzdGFydE51bSkgJiYgKCQoXCIjZHJvcF9wbGF5QmdfY3VyUGxheVwiKS53aWR0aCgpIC8gc2NhbGVJdGVtV2lkdGgpIDwgbnVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBJbmRleCA9IE1hdGguZmxvb3IoJChcIiNkcm9wX3BsYXlCZ19jdXJQbGF5XCIpLndpZHRoKCkgLyBzY2FsZUl0ZW1XaWR0aCArIHN0YXJ0TnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5wbGF5T2JqLnBsYXlJbmRleCA9IHRlbXBJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50aW1lQW5pbWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRlbXBOdW0rKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDIwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoYW5nZURhdGVEYXRhKGNoYXJ0RGF0YTogYW55LCBpOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgZGF0YUxpc3REYXRhOiBBcnJheTxzdHJpbmc+ID0gYW5ndWxhci5jb3B5KGNoYXJ0RGF0YVtpXS5kYXRlTGlzdCk7XHJcbiAgICAgICAgbGV0IGVuZEZpdmU6IEFycmF5PHN0cmluZz4gPSBkYXRhTGlzdERhdGEuc2xpY2UoaW5kZXggLSA0LCBpbmRleCArIDEpO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPCA1KSB7XHJcbiAgICAgICAgICAgIGNoYXJ0RGF0YVtpXS54RGF0YSA9IGRhdGFMaXN0RGF0YS5zbGljZSgwLCA1KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGVuZEZpdmUubGVuZ3RoID49IDUpIHtcclxuICAgICAgICAgICAgY2hhcnREYXRhW2ldLnhEYXRhID0gZW5kRml2ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjaGFydERhdGFbaV0ueERhdGEgPSBkYXRhTGlzdERhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjaGFydERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgdGltZUFuaW1hdGUoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLmkq3mlL7liLvluqbntKLlvJVfX19fX19cIiArIHRoaXMucGxheU9iai5wbGF5SW5kZXgpXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmNoYXJ0RGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoaSA9PSAnSU1hcFJlc291cmNlJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFydERhdGFbaV0uc2VyaWVzID0gdGhpcy5jaGFydERhdGFbaV0ucGxheURhdGFbdGhpcy5wbGF5T2JqLnBsYXlJbmRleF07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PSAnQWxhcm1TdGF0aXN0aWNzJyB8fCBpID09ICdSZXNvdXJjZWJSZXRyaWV2YWxUcmVuZCcpIHtcclxuICAgICAgICAgICAgICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FtZXJhOiBbXSBhcyBBcnJheTxudW1iZXI+LFxyXG4gICAgICAgICAgICAgICAgICAgIGVsZWN0cm9uaWNmZW5jZTogW10gYXMgQXJyYXk8bnVtYmVyPixcclxuICAgICAgICAgICAgICAgICAgICBybXBnYXRlOiBbXSBhcyBBcnJheTxudW1iZXI+LFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZmk6IFtdIGFzIEFycmF5PG51bWJlcj5cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPD0gdGhpcy5wbGF5T2JqLnBsYXlJbmRleDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhbHlEYXRhOiBhbnkgPSB0aGlzLmNoYXJ0RGF0YVtpXS5wbGF5RGF0YVtqXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhbHlEYXRhICYmIHBhbHlEYXRhLmNhbWVyYSAmJiBwYWx5RGF0YS5lbGVjdHJvbmljZmVuY2UgJiYgcGFseURhdGEucm1wZ2F0ZSAmJiBwYWx5RGF0YS53aWZpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5jYW1lcmEucHVzaChwYWx5RGF0YS5jYW1lcmFbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouZWxlY3Ryb25pY2ZlbmNlLnB1c2gocGFseURhdGEuZWxlY3Ryb25pY2ZlbmNlWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnJtcGdhdGUucHVzaChwYWx5RGF0YS5ybXBnYXRlWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLndpZmkucHVzaChwYWx5RGF0YS53aWZpWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXJ0RGF0YVtpXS5zZXJpZXMgPSBvYmo7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFydERhdGEgPSB0aGlzLmNoYW5nZURhdGVEYXRhKHRoaXMuY2hhcnREYXRhLCBpLCB0aGlzLnBsYXlPYmoucGxheUluZGV4KVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpID09PSAnQXJlYVBlcnNvbkFsYXJtU3RhdGlzdGljcycgfHwgaSA9PSAnQXJlYVdpZmlBbGFybVN0YXRpc3RpY3MnIHx8IGkgPT0gJ0FyZWFFRkFsYXJtU3RhdGlzdGljcycpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxBcnJheTxudW1iZXI+PjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhcnREYXRhW2ldLmxlZ2VuZERhdGEuZm9yRWFjaCgoaXRlbTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goW10pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDw9IHRoaXMucGxheU9iai5wbGF5SW5kZXg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyci5mb3JFYWNoKChpdGVtOiBBcnJheTxudW1iZXI+LCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucHVzaCh0aGlzLmNoYXJ0RGF0YVtpXS5wbGF5RGF0YVtqXVtpbmRleF1bMF0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhcnREYXRhW2ldLnNlcmllcyA9IGFycjtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXJ0RGF0YSA9IHRoaXMuY2hhbmdlRGF0ZURhdGEodGhpcy5jaGFydERhdGEsIGksIHRoaXMucGxheU9iai5wbGF5SW5kZXgpXHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT09ICdQZXJzb25UeXBlU3RhdGlzdGljcycgfHwgaSA9PSAnV2lmaVR5cGVTdGF0aXN0aWNzJyB8fCBpID09ICdFRlR5cGVTdGF0aXN0aWNzJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFyciA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPD0gdGhpcy5wbGF5T2JqLnBsYXlJbmRleDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhcnREYXRhW2ldICYmIHRoaXMuY2hhcnREYXRhW2ldLnBsYXlEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKHRoaXMuY2hhcnREYXRhW2ldLnBsYXlEYXRhW2pdWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXJ0RGF0YVtpXS5zZXJpZXMgPSBhcnI7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFydERhdGEgPSB0aGlzLmNoYW5nZURhdGVEYXRhKHRoaXMuY2hhcnREYXRhLCBpLCB0aGlzLnBsYXlPYmoucGxheUluZGV4KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2hhcnREYXRhKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PSAnV2lmaVN0YXRpc3RpY3MnIHx8IGkgPT0gJ0VGU3RhdGlzdGljcycgfHwgaSA9PSAnUGVyc29uU3RhdGlzdGljcycpIHtcclxuICAgICAgICAgICAgICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxhcm06IFtdIGFzIEFycmF5PG51bWJlcj4sXHJcbiAgICAgICAgICAgICAgICAgICAgZmxvdzogW10gYXMgQXJyYXk8bnVtYmVyPlxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDw9IHRoaXMucGxheU9iai5wbGF5SW5kZXg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoYXJ0RGF0YVtpXSAmJiB0aGlzLmNoYXJ0RGF0YVtpXS5wbGF5RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouZmxvdy5wdXNoKHRoaXMuY2hhcnREYXRhW2ldLnBsYXlEYXRhW2pdLmZsb3dbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouYWxhcm0ucHVzaCh0aGlzLmNoYXJ0RGF0YVtpXS5wbGF5RGF0YVtqXS5hbGFybVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFydERhdGFbaV0uc2VyaWVzID0gb2JqO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhcnREYXRhID0gdGhpcy5jaGFuZ2VEYXRlRGF0YSh0aGlzLmNoYXJ0RGF0YSwgaSwgdGhpcy5wbGF5T2JqLnBsYXlJbmRleClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoYXJ0RGF0YVtpXSAmJiB0aGlzLmNoYXJ0RGF0YVtpXS5wbGF5RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhcnREYXRhW2ldLnNlcmllcyA9IHRoaXMuY2hhcnREYXRhW2ldLnBsYXlEYXRhW3RoaXMucGxheU9iai5wbGF5SW5kZXhdXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYm9yZGNhc3RDaGlsZCgpXHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdUaW1lKHR5cGU6IHN0cmluZywgdGl0bGU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuZWNoYXJ0RmFjdG9yeS5jdXJyZW50RGF0YVR5cGUgPSB0eXBlO1xyXG4gICAgICAgIGlmICh0aXRsZSA9PT0gJ0RQX1JFU09VUkNFX1RJTUVfMTcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNwbGF5ID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pc3BsYXkgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuY2hhcnRUaW1lc3RhbXApO1xyXG4gICAgICAgIHRoaXMuY2hhcnRUaW1lc3RhbXAgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdFJlc291cmNlVGltZSA9IHRpdGxlO1xyXG4gICAgICAgIHRoaXMudGxfdHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5wbGF5T2JqLnRpbWVUeXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLmluaXRUaW1lTGluZURhdGEoKTtcclxuICAgICAgICB0aGlzLmluaXRMYXlvdXQoKTtcclxuICAgICAgICB0aGlzLmdldENoYXJ0RGF0YSgpXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5pWw5o2u57G75Z6L5YiH5o2iXHJcbiAgICBjaGFuZ1R5cGUoaW5kZXg6IHN0cmluZywgdHlwZVR4dDogc3RyaW5nLCB0aXRsZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IFJlc291cmNlVHlwZTogYW55ID0gdGhpcy5SZXNvdXJjZVBhZ2VUeXBlW3R5cGVUeHRdO1xyXG4gICAgICAgIHRoaXMuZGF0YXR5cGUgPSBSZXNvdXJjZVR5cGUudmFsdWU7XHJcbiAgICAgICAgdGhpcy5nZXRDaGFydERhdGEoKTtcclxuICAgICAgICAvLyDliIfmjaLmgLvph49cclxuICAgICAgICB0aGlzLmNoYW5nRGF0YShpbmRleCwgdHlwZVR4dCk7XHJcbiAgICAgICAgLy8g5YiH5o+b6Lev55SxXHJcbiAgICAgICAgdGhpcy5zd2l0Y2hSb3V0ZXIodHlwZVR4dCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RSZXNvdXJjZVR5cGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLnRsX3p5VHlwZVR4dCA9IGFuZ3VsYXIuY29weSh0eXBlVHh0KTtcclxuICAgICAgICB0aGlzLnRsX3p5VHlwZSA9IHBhcnNlSW50KGluZGV4KTtcclxuICAgICAgICB0aGlzLnBsYXlPYmoucmVzb3VyY2VUeXBlID0gaW5kZXg7XHJcbiAgICAgICAgLy8g5YiH5o+b5ZyW6KGoXHJcbiAgICAgICAgdGhpcy5jaGFuZ0NoYXJ0KGluZGV4KTtcclxuICAgICAgICB0aGlzLnNodGxlSW5vd1RpZm8gPSBmYWxzZTtcclxuICAgICAgICAvLyDliIfmjaLlrozmiJDor7fmsYLmlbDmja5cclxuICAgIH1cclxuXHJcbiAgICAvLyDmlbDmja7mgLvph4/liIfmjaJcclxuICAgIGNoYW5nRGF0YSh0eXBlOiBzdHJpbmcsIHR5cGVUeHQ6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0eXBlVHh0ID09IFJlc291cmNlUGFnZVR5cGUuQUxMLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YXRpdGxlID0gJ0RQX1JFU09VUkNFX1RJTUVfMTYnO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlck51bSA9IHRoaXMudG90YWxOdW1cclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVUeHQgPT0gUmVzb3VyY2VQYWdlVHlwZS5WZWhpY2xlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YXRpdGxlID0gJ0RQX1JFU09VUkNFX1RJTUVfMDInO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlck51bSA9IHRoaXMuUmVzb3VyY2VQYWdlVHlwZS5WZWhpY2xlLm51bWJlci50b3RhbENvdW50TnVtO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZVR4dCA9PSBSZXNvdXJjZVBhZ2VUeXBlLkZhY2UudmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhdGl0bGUgPSAnRFBfUkVTT1VSQ0VfVElNRV8wMyc7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTnVtID0gdGhpcy5SZXNvdXJjZVBhZ2VUeXBlLkZhY2UubnVtYmVyLnRvdGFsQ291bnROdW07XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlVHh0ID09IFJlc291cmNlUGFnZVR5cGUuV2lGaS52YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGF0aXRsZSA9ICdEUF9SRVNPVVJDRV9USU1FXzA2JztcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJOdW0gPSB0aGlzLlJlc291cmNlUGFnZVR5cGUuV2lGaS5udW1iZXIudG90YWxDb3VudE51bTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVUeHQgPT0gUmVzb3VyY2VQYWdlVHlwZS5FRkVOQ0UudmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhdGl0bGUgPSAnRFBfUkVTT1VSQ0VfVElNRV8wNSc7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTnVtID0gdGhpcy5SZXNvdXJjZVBhZ2VUeXBlLkVGRU5DRS5udW1iZXIudG90YWxDb3VudE51bTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mb3JtYXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDlrp7ml7bliIfmjaJcclxuICAgIGNoYW5nQ2hhcnQodHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzIGFzIGFueTtcclxuICAgICAgICB0aGlzLnN3aXRjaEJ1dHRvbi5zd2l0Y2ggPSBmYWxzZTtcclxuICAgICAgICAvLyDlj5bmtojmiqXorabkv6Hmga9cclxuICAgICAgICB0aGF0LiRzY29wZS4kYnJvYWRjYXN0KGBzb2NrZXRTdGF0aXN0aWNzXyR7dGhhdC5kYXRhdHlwZX1gLCB7IGlzQ2FuY2VsOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICBsZXQgc3dpdGNoQ2hhcnQgPSB0aGlzLnN3aXRjaEJ1dHRvbi5zd2l0Y2hDaGFydDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3aXRjaENoYXJ0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlY2hhcnROYW1lOiBzdHJpbmcgPSBzd2l0Y2hDaGFydFtpXSArIFwiU3RhdGlzdGljc1wiO1xyXG4gICAgICAgICAgICBsZXQgZWNoYXJ0UmlnaHQ6IHN0cmluZyA9IHN3aXRjaENoYXJ0W2ldICsgXCJSaWdodFwiO1xyXG4gICAgICAgICAgICBpZiAoaSA9PSBOdW1iZXIodHlwZSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBSZXNvdXJjZVR5cGU6IGFueSA9IHRoaXMuUmVzb3VyY2VQYWdlVHlwZVtzd2l0Y2hDaGFydFtpXV07XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRhdGF0eXBlID0gUmVzb3VyY2VUeXBlLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zd2l0Y2hCdXR0b25bZWNoYXJ0TmFtZV0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zd2l0Y2hCdXR0b25bZWNoYXJ0UmlnaHRdID0gdHJ1ZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zd2l0Y2hCdXR0b25bZWNoYXJ0TmFtZV0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoYXQuc3dpdGNoQnV0dG9uW2VjaGFydFJpZ2h0XSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdHJ1ZeS4uue7n+iuoeOAgWZhbHNl5Li65a6e5pe2XHJcbiAgICBoaWRkZW5DaGFydCgpIHtcclxuICAgICAgICB0aGlzLnN3aXRjaEJ1dHRvbi5zd2l0Y2ggPSAhdGhpcy5zd2l0Y2hCdXR0b24uc3dpdGNoO1xyXG5cclxuICAgICAgICB0aGlzLmJyb2FkY2FzZVNvY2tldERhdGEodGhpcy5kYXRhdHlwZSwgdGhpcy5zd2l0Y2hCdXR0b24uc3dpdGNoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzb2NrZXTlrp7ml7blj5HpgIHmtojmga9cclxuICAgIGJyb2FkY2FzZVNvY2tldERhdGEoZGF0YXR5cGU6IHN0cmluZywgaWZTZW5kOiBib29sZWFuKSB7XHJcbiAgICAgICAgbGV0IHRoYXQ6IGFueSA9IHRoaXM7XHJcbiAgICAgICAgc3dpdGNoIChkYXRhdHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFJlc291cmNlUGFnZVR5cGUuQUxMLnZhbHVlOiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LiRzY29wZS4kYnJvYWRjYXN0KFNvY2tldFJlc3VsdFR5cGVFbnVtLlN1YnNjcmliZUFsbEZhY2VMb2csIHsgaXNDYW5jZWw6ICFpZlNlbmQgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LiRzY29wZS4kYnJvYWRjYXN0KFNvY2tldFJlc3VsdFR5cGVFbnVtLlN1YnNjcmliZUFsbFZlaGljbGVMb2csIHsgaXNDYW5jZWw6ICFpZlNlbmQgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgUmVzb3VyY2VQYWdlVHlwZS5GYWNlLnZhbHVlOiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LiRzY29wZS4kYnJvYWRjYXN0KFNvY2tldFJlc3VsdFR5cGVFbnVtLlN1YnNjcmliZUFsbEZhY2VMb2csIHsgaXNDYW5jZWw6ICFpZlNlbmQgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgUmVzb3VyY2VQYWdlVHlwZS5WZWhpY2xlLnZhbHVlOiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LiRzY29wZS4kYnJvYWRjYXN0KFNvY2tldFJlc3VsdFR5cGVFbnVtLlN1YnNjcmliZUFsbFZlaGljbGVMb2csIHsgaXNDYW5jZWw6ICFpZlNlbmQgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGF5cyhkYXkxOiBhbnksIGRheTI6IGFueSkge1xyXG4gICAgICAgIC8vIOiOt+WPluWFpeWPguWtl+espuS4suW9ouW8j+aXpeacn+eahERhdGXlnovml6XmnJ9cclxuICAgICAgICBsZXQgc3QgPSBkYXkxLmdldERhdGUoKTtcclxuICAgICAgICBsZXQgZXQgPSBkYXkyLmdldERhdGUoKTtcclxuICAgICAgICBsZXQgcmV0QXJyID0gW107XHJcbiAgICAgICAgLy8g6I635Y+W5byA5aeL5pel5pyf55qE5bm077yM5pyI77yM5pelXHJcbiAgICAgICAgbGV0IHl5eXkgPSBzdC5nZXRGdWxsWWVhcigpLFxyXG4gICAgICAgICAgICBtbSA9IHN0LmdldE1vbnRoKCksXHJcbiAgICAgICAgICAgIGRkID0gc3QuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIC8vIOW+queOr1xyXG4gICAgICAgIHdoaWxlIChzdC5nZXRUaW1lKCkgIT0gZXQuZ2V0VGltZSgpKSB7XHJcbiAgICAgICAgICAgIHJldEFyci5wdXNoKHN0LmdldFlNRCgpKTtcclxuICAgICAgICAgICAgLy8g5L2/55SoZGQrK+i/m+ihjOWkqeaVsOeahOiHquWinlxyXG4gICAgICAgICAgICBzdCA9IG5ldyBEYXRlKHl5eXksIG1tLCBkZCsrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOWwhue7k+adn+aXpeacn+eahOWkqeaUvui/m+aVsOe7hFxyXG4gICAgICAgIHJldEFyci5wdXNoKGV0LmdldFlNRCgpKTtcclxuICAgICAgICByZXR1cm4gcmV0QXJyO1xyXG4gICAgfVxyXG5cclxuICAgIC8vc29ja2XlrZjlnKjnmoTmg4XlhrXkuIvlj5bmtojorqLpmIVcclxuICAgIHByaXZhdGUgaXNDYW5jZWxTb2NrZXQoKXtcclxuICAgICAgICBpZih0aGlzLmVjaGFydEZhY3RvcnkuRmFjZVNvY2tldElEICYmIHRoaXMuZWNoYXJ0RmFjdG9yeS5DYXJTb2NrZXRJRCkge1xyXG4gICAgICAgICAgICB0aGlzLmJyb2FkY2FzZVNvY2tldERhdGEoUmVzb3VyY2VQYWdlVHlwZS5BTEwudmFsdWUsIGZhbHNlKTtcclxuICAgICAgICB9ZWxzZSBpZih0aGlzLmVjaGFydEZhY3RvcnkuRmFjZVNvY2tldElEKXtcclxuICAgICAgICAgICAgdGhpcy5icm9hZGNhc2VTb2NrZXREYXRhKFJlc291cmNlUGFnZVR5cGUuRmFjZS52YWx1ZSwgZmFsc2UpO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuZWNoYXJ0RmFjdG9yeS5DYXJTb2NrZXRJRCl7XHJcbiAgICAgICAgICAgIHRoaXMuYnJvYWRjYXNlU29ja2V0RGF0YShSZXNvdXJjZVBhZ2VUeXBlLlZlaGljbGUudmFsdWUsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyDliIfmjaLot6/nlLFcclxuICAgIHByaXZhdGUgc3dpdGNoUm91dGVyKHR5cGU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuZWNoYXJ0RmFjdG9yeS5jdXJyZW50RGV2aWNlVHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5pc0NhbmNlbFNvY2tldCgpO1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFJlc291cmNlUGFnZVR5cGUuQUxMLnZhbHVlOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzdGF0ZS5nbyhSb3V0ZUtleUVudW0uUmVzb3VyY2VBbGwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zd2l0Y2hTdGF0ZUJ1dHRvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgUmVzb3VyY2VQYWdlVHlwZS5WZWhpY2xlLnZhbHVlOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzdGF0ZS5nbyhSb3V0ZUtleUVudW0uUmVzb3VyY2VDYXIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zd2l0Y2hTdGF0ZUJ1dHRvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgUmVzb3VyY2VQYWdlVHlwZS5GYWNlLnZhbHVlOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzdGF0ZS5nbyhSb3V0ZUtleUVudW0uUmVzb3VyY2VQZXJzb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zd2l0Y2hTdGF0ZUJ1dHRvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgUmVzb3VyY2VQYWdlVHlwZS5XaUZpLnZhbHVlOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzdGF0ZS5nbyhSb3V0ZUtleUVudW0uUmVzb3VyY2VXaWZpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3dpdGNoU3RhdGVCdXR0b24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBSZXNvdXJjZVBhZ2VUeXBlLkVGRU5DRS52YWx1ZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc3RhdGUuZ28oUm91dGVLZXlFbnVtLlJlc291cmNlRWxlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3dpdGNoU3RhdGVCdXR0b24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5a6a5pe25Zmo5Yi35paw5pWw5o2uXHJcbiAgICBwcml2YXRlIGdldE5ld0RhdGEoKSB7XHJcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLmNoYXJ0VGltZXN0YW1wKTtcclxuICAgICAgICBpZiAoIXRoaXMuaXNEZXN0b3J5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRUaW1lc3RhbXAgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldENoYXJ0RGF0YSgpXHJcbiAgICAgICAgICAgIH0sIDEwMDAgKiAxMClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5a6a5pe25Zmo57uf6K6h5oC75pWwXHJcbiAgICBwcml2YXRlIHN0YXRpY1RvdGFsKCkge1xyXG4gICAgICAgIGxldCB0aGF0OiBhbnkgPSB0aGlzO1xyXG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5kYXRhdGltZXIpO1xyXG4gICAgICAgIGlmICghdGhpcy5pc0Rlc3RvcnkpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmdldFRvdGFsRGF0YSgpO1xyXG4gICAgICAgICAgICB9LCAxMDAwICogMTApXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyDor7vlj5bpnIDopoHor7fmsYLnmoTnsbvlnotcclxuICAgIHByaXZhdGUgZ2V0Q2hhcnREYXRhVHlwZSgpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuJHN0YXRlLmN1cnJlbnQubmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFJvdXRlS2V5RW51bS5SZXNvdXJjZUNhcjpcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YXR5cGUgPSBSZXNvdXJjZVBhZ2VUeXBlLlZlaGljbGUudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFJlc291cmNlVHlwZSA9IFJlc291cmNlUGFnZVR5cGUuVmVoaWNsZS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUm91dGVLZXlFbnVtLlJlc291cmNlUGVyc29uOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhdHlwZSA9IFJlc291cmNlUGFnZVR5cGUuRmFjZS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0UmVzb3VyY2VUeXBlID0gUmVzb3VyY2VQYWdlVHlwZS5GYWNlLm5hbWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBSb3V0ZUtleUVudW0uUmVzb3VyY2VXaWZpOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhdHlwZSA9IFJlc291cmNlUGFnZVR5cGUuV2lGaS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0UmVzb3VyY2VUeXBlID0gUmVzb3VyY2VQYWdlVHlwZS5XaUZpLm5hbWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBSb3V0ZUtleUVudW0uUmVzb3VyY2VFbGU6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGF0eXBlID0gUmVzb3VyY2VQYWdlVHlwZS5FRkVOQ0UudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFJlc291cmNlVHlwZSA9IFJlc291cmNlUGFnZVR5cGUuRUZFTkNFLm5hbWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBSb3V0ZUtleUVudW0uUmVzb3VyY2VBbGw6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGF0eXBlID0gUmVzb3VyY2VQYWdlVHlwZS5BTEwudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFJlc291cmNlVHlwZSA9IFJlc291cmNlUGFnZVR5cGUuQUxMLm5hbWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YXR5cGUgPSBSZXNvdXJjZVBhZ2VUeXBlLkFMTC52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNyZWF0ZU5vd1RpbWVMaW5lKCk6IEFycmF5PHN0cmluZz4ge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzA7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbW9udGggPSBtb21lbnQoKS5zdWJ0cmFjdChpLCAnZGF5cycpLmZvcm1hdCgnREQnKTtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goYCR7bW9udGh95pelYClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5yZXZlcnNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNyZWF0ZURheVRpbWVMaW5lKCk6IEFycmF5PHN0cmluZz4ge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMjU7IGkrKykge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChgJHtpfTowMGApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNyZWF0ZVdlZWtUaW1lTGluZSgpOiBBcnJheTxzdHJpbmc+IHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW10gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgd2VlayA9IG1vbWVudCgpLnN1YnRyYWN0KGksICdkYXlzJykuZm9ybWF0KCdERCcpO1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChgJHt3ZWVrfeaXpWApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQucmV2ZXJzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjcmVhdGVNb250aFRpbWVMaW5lKCk6IEFycmF5PHN0cmluZz4ge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMzE7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbW9udGggPSBtb21lbnQoKS5zdWJ0cmFjdChpLCAnZGF5cycpLmZvcm1hdCgnREQnKTtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goYCR7bW9udGh95pelYClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5yZXZlcnNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNyZWF0ZVllYXJUaW1lTGluZSgpOiBBcnJheTxzdHJpbmc+IHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW10gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDEzOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1vbnRoID0gbW9tZW50KCkuc3VidHJhY3QoaSwgJ21vbnRoJykuZm9ybWF0KCdNTScpO1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChgJHttb250aH3mnIhgKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0LnJldmVyc2UoKTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ3Jlc291cmNlQ29udHJvbGxlcicsIFJlc291cmNlQ29udHJvbGxlcik7Il19
