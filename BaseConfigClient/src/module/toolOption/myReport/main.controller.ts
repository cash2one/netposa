import { app } from "../../common/app/main.app";
import "css!./style/report.css";
import { Enum } from "../../../core/enum/Enum";
import { MockCar, MockCarList, MockPerson, MockPersonList, MockMac, MockMacList } from "./reportTestEnum";
import { ITaskService } from "../../common/services/task.service";
import "../../common/services/task.service";
import { ResponseResult, PageResult } from "../../../core/params/result/ResponseResult";
import { MyAlarmService } from "../../common/services/myAlarm.service";
import "../../common/services/myAlarm.service";
import { SearchAlarmParams } from "../../../core/params/SearchAlarmParams";
import PageParams from "../../common/directive/page/page-params";
import { MyReportMock } from './myReportMock';
import { MyReportFactory, MyReportViewModel } from './myReport.cache.factory';
import "./myReport.cache.factory";
import { SearchAlarmLogResult } from "../../../core/server/AlarmModule";
import { IsMacType, ObjectType } from "../../../core/enum/ObjectType";
import PortraitTool from '../../common/portrait-tool';
import { Camera } from '../../../core/entity/Camera';
import { Wifi } from '../../../core/entity/Wifi';
import { IResourceRetrievalService } from "../../common/services/resourceRetrieval.service";
import "../../common/services/resourceRetrieval.service";
import { ILayerDec } from "../../common/factory/layerMsg.factory";
import "../../common/factory/layerMsg.factory";
import { CollectAddParams } from "../../../core/params/CollectParams";
import { CollectDataType } from '../../../core/server/enum/CollectDataType';
import { MacMonitor } from '../../../core/server/TaskModel';
import { AngularScope } from '../../common/types/baseAngularScope';
import { CommonAlarmFacePopupFactory } from '../../common/popup/alarmFacePopup/alarm.face.popup.factory';
import '../../common/popup/alarmFacePopup/alarm.face.popup.factory';
import { CommonFullImagePopupFactory } from '../../common/fullImagePopup/fullImagePopup.factory';
import '../../common/fullImagePopup/fullImagePopup.factory';
import { IUserInfoCacheFactory } from '../../common/factory/userinfo.cache.factory';
import "moment"
declare let angular: any, moment: any;

const MyReportEnum = [
    {
        index: 0,
        value: null,
        text: "全部"
    },
    {
        index: 1,
        value: ObjectType.Camera.value,
        text: "人员报警"
    },
    {
        index: 3,
        text: "车辆报警",
        value: ObjectType.Vehicle.value,
    },
    {
        index: 4,
        value: "MAC",
        text: "MAC报警"
    }];

class MyReportController {
    searchAlarmParams: SearchAlarmParams;
    static $inject = ['$scope', 'taskService', 'myAlarmService', '$q', "myReportFactory",
        "$timeout", "resourceRetrievalService", "layerDec", "commonAlarmFacePopup",
        "commonFullImagePopup", "userInfoCacheFactory"];
    ButtonList: Array<Enum>;
    selectedIndex: number;
    allReportPage: string;
    personReportPage: string;
    carReportPage: string;
    macReportPage: string;
    alarmDatas: Array<MyReportViewModel>;
    private pageParams: PageParams;
    moreBtn: boolean;

    //数据
    constructor(private $scope: AngularScope,
        private taskService: ITaskService,
        private myAlarmService: MyAlarmService,
        private $q: any,
        private myReportFactory: MyReportFactory,
        private $timeout: any,
        private resourceRetrievalService: IResourceRetrievalService,
        private layerDec: ILayerDec,
        private commonAlarmFacePopup: CommonAlarmFacePopupFactory,
        private commonFullImagePopup: CommonFullImagePopupFactory,
        private userInfoCacheFactory: IUserInfoCacheFactory,
    ) {
        this.ButtonList = MyReportEnum;
        this.selectedIndex = MyReportEnum[0].index;
        this.allReportPage = '../module/toolOption/myReport/myReportPage/allReportPage.html?v=' + new Date().getTime();

        this.searchAlarmParams = {} as SearchAlarmParams;
        this.pageParams = new PageParams(1, 100);
        this.searchAlarmParams.pageSize = this.pageParams.pageSize;
        this.searchAlarmParams.currentPage = this.pageParams.currentPage;

        this.search();

        this.$scope.$on("$destroy", () => {
            this.myReportFactory.clearDatas();
        });
    }

    changeIndex(data: { value: string, index: number }) {
        if (data.index === this.selectedIndex) {
            return;
        }
        this.selectedIndex = data.index;
        // 查找页面
        this.searchByObjectType(data.value);
    }

    expanderMore(data: MyReportViewModel) {
        data.isExpand = true;
    }

    isMacType(val: string) {
        return IsMacType(val);
    }

    isVehicleType(val: string) {
        return val == "Car";
    }

    isFaceType(val: string) {
        return val === ObjectType.Camera.value;
    }

    search() {
        this.myReportFactory.clearDatas();
        this.searchAlarmParams.currentPage = 1;
        this._search();
    }

    showAlarmFacePopup(item: SearchAlarmLogResult) {
        this.commonAlarmFacePopup.showPopup(this.$scope, item);
    }

    /**
     * 查询并展示在界面上
     */
    private _search() {
        this.taskService.getAlarmTaskIds().then((res: ResponseResult<Array<string>>) => {
            let arr = (res && res.data) || [] as Array<string>;
            this.searchAlarmParams.arrStructureTaskId = arr;
            this.searchAlarmParams.startTime = moment().subtract(10, 'days').format("YYYY-MM-DD 00:00:00");
            this.searchAlarmParams.endTime = moment().format("YYYY-MM-DD 23:59:59");
            if (!this.searchAlarmParams.objectType) {
                this.searchAlarmParams.objectType = ['Car', 'Camera', 'WiFi', 'EFENCE'];
            }
            return this.myAlarmService.getMyAlarmList(this.searchAlarmParams);
        }).then((res: ResponseResult<PageResult<SearchAlarmLogResult>>) => {
            console.log(res, "==============================")
            if (res && res.data && res.code === 200) {
                this.pageParams.currentPage = this.searchAlarmParams.currentPage;
                this.pageParams.setTotalCount(res.data.TotalCount || 0);
                this.myReportFactory.cacheDatas(res.data.Result || ([] as Array<SearchAlarmLogResult>));
            } else if (res && res.code == 200) {
                this.pageParams.currentPage = this.searchAlarmParams.currentPage;
                this.pageParams.setTotalCount(0);
                this.myReportFactory.cacheDatas([] as Array<SearchAlarmLogResult>);
            } else {
                // 不进行后续操作
                return this.$q.reject(null);
            }
        }).then(() => {
            let result = this.myReportFactory.getDatas();
            this.isShowMoreBtn();
            console.debug("拿到的数据为", result);
            this.$timeout(() => {
                this.alarmDatas = result;
            });

        })
    }

    /**
     * 获得更多的收藏数据
     * 逻辑: 在现有的分页基础上, 向后加一页, 查询
     */
    getMoreAlarm() {
        // 此if用于判断当前页请求是否成功。 若不想等，说明上次请求不是正常结束了。
        this.searchAlarmParams.currentPage = this.pageParams.currentPage + 1;
        this._search();
    }

    attention(data: SearchAlarmLogResult) {
        if (data.Collected) {
            this.layerDec.failInfo("此报警已收藏");
            return;
        }

        let params: CollectAddParams = {
            json: angular.toJson(data),
            objectID: data.AlarmLog.ID,
            objectType: data.AlarmLog.ObjectType,
            userId: this.userInfoCacheFactory.getCurrentUserId(),
            dataType: CollectDataType.Collection.value
        };

        console.log(data);

        this.resourceRetrievalService.collectAddInfo(params).then((str: string) => {
            if (str) {
                // 在这里手动设置, 让界面收藏样式发生变化
                data.Collected = true;
            }
        });
    }

    /**
     * 展示大图
     */
    fullScreen(imgUrl: string, event: Event) {
        event.stopPropagation();
        console.log(imgUrl)
        this.commonFullImagePopup.showPopup(this.$scope, imgUrl);
        // 阻止冒泡
    }

    getValueByTimeKey(timeKey: string, paramName: string) {
        let arr = timeKey.split("-");
        let result = "";
        switch (paramName) {
            case "yyyy":
                result = arr[0];
                break;
            case "MM":
                result = arr[1];
                break;
            case "dd":
                result = arr[2];
                break;
        }
        return result;
    }


    private isShowMoreBtn() {
        console.debug("isShowMoreBtn");
        let currentIndex = this.pageParams.currentPage;
        let pageCount = this.pageParams.pageCount;
        if (currentIndex >= pageCount) {
            this.moreBtn = false;
        } else {
            this.moreBtn = true;
        }
    }

    private searchByObjectType(objectType: string) {
        let _objectType = [] as Array<string>;
        if (objectType === "MAC") {
            _objectType.push(ObjectType.Wifi.value);
            _objectType.push(ObjectType.ElectronicFence.value);
        } else if (objectType === "Vehicle") {
            _objectType.push("Car");
        } else if (objectType != null) {
            _objectType.push(objectType);
        } else {
            _objectType = null;
        }
        this.searchAlarmParams.objectType = _objectType;
        // 清空缓存
        this.myReportFactory.clearDatas();
        this.pageParams.setCurrentPage(1);
        this.searchAlarmParams.currentPage = 1;
        // 进行查询和展示
        this._search();
    }
}

app
    .controller('MyReportController', MyReportController);