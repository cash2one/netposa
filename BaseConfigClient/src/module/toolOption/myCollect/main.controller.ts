/// <amd-dependency path="text!../../detailPopup/carPopup/carPopup.html" name="carPopup" />
/// <amd-dependency path="text!../../detailPopup/personPopup/personPopup.html" name="personPopup" />
/// <amd-dependency path="text!../../detailPopup/wifiPopup/wifiPopup.html" name="wifiPopup" />
/// <amd-dependency path="text!../../detailPopup/efPopup/efPopup.html" name="efPopup" />
import {app} from "../../common/app/main.app";
import "css!./style/collect.css";
import "../../common/services/collect.service";
import {ResponseResult, PageResult} from "../../../core/params/result/ResponseResult";
import {Enum} from "../../../core/enum/Enum";
import {ICollectService} from "../../common/services/collect.service";
import {SearchCollectParams} from "../../../core/params/CollectParams";
import {ObjectType} from "../../../core/enum/ObjectType";
import {MyCollectFactory, MyCollectViewModel} from './myCollect.cache.factory';
import './../myCollect/myCollect.cache.factory';
import {CollectEx} from "../../../core/entity/ex/CollectEx";

import {AngularScope} from "../../common/types/baseAngularScope";
import {ILayerDec, LayerConfirmParams} from "../../common/factory/layerMsg.factory";
import "../../common/factory/layerMsg.factory";
import {IResourceRetrievalService} from "../../common/services/resourceRetrieval.service";
import "../../common/services/resourceRetrieval.service";

import {SearchAlarmLogResult} from '../../../core/server/AlarmModule';


import "../../detailPopup/carPopup/carPopup.controller";
import "../../detailPopup/personPopup/personPopup.controller";
import "../../detailPopup/wifiPopup/wifiPopup.controller";
import "../../detailPopup/efPopup/efPopup.controller";


import * as moment from 'moment';

declare let carPopup: string,personPopup:any,wifiPopup,any,efPopup:any, require: any;

const MyCollectEnum = [
    {
        index: 0,
        value: null,
        text: "全部"
    },
    {
        index: 1,
        value: 'Face',
        text: "人像"
    },
    {
        index: 2,
        value: 'Car',
        text: ObjectType.Vehicle.text
    },
    {
        index: 3,
        value: ObjectType.Wifi.value,
        text: ObjectType.Wifi.text
    },
    {
        index: 4,
        value: ObjectType.ElectronicFence.value,
        text: ObjectType.ElectronicFence.text
    }/* ,
{
    index: 6,
    value: ObjectType.ElectronicFence.value,
    text: "设备"
},
{
    index: 7,
    text: "位置"
} */];

class MyCollectController {
    static $inject = ['$scope', 'collectService', '$q', 'myCollectFactory', '$timeout', 'layerDec',
        'resourceRetrievalService', 'layer'];
    ButtonList: Array<Enum>;
    selectedIndex: number;
    //筛选条件
    searchParams: SearchCollectParams;
    startTime: string;
    endTime: string;
    collectDatas: Array<MyCollectViewModel>;
    moreBtn: boolean;
    // 所有收藏
    allCollectPage: string = '../module/toolOption/myCollect/myCollectPage/allCollectPage.html?v=' + new Date().getTime();
    layerIndex:number;
    //数据
    constructor(private $scope: AngularScope,
                private collectService: ICollectService,
                private $q: any,
                private myCollectFactory: MyCollectFactory,
                private $timeout: any,
                private layerDec: ILayerDec,
                private resourceRetrievalService: IResourceRetrievalService,
                private layer: any) {
        this.ButtonList = MyCollectEnum;
        this.selectedIndex = MyCollectEnum[0].index;
        this.searchParams = {} as SearchCollectParams;
        this.searchParams.startTime = moment().subtract(7, 'day').format('YYYY-MM-DD') + ' 00:00:00';
        this.searchParams.endTime = moment().format('YYYY-MM-DD') + ' 23:59:59';
        this.getCollectList(true);
        this.$scope.$on("$destroy", () => {
            this.myCollectFactory.clearDatas();
        });
    }

    changeIndex(data: { index: number, value: string }) {
        if (data.index === this.selectedIndex) {
            return;
        }
        this.selectedIndex = data.index;
        // 查找页面
        this.searchByObjectType(data.value);
    }


    showFacePopup(item: SearchAlarmLogResult) {
        let scope:{rank:number,showFooter:boolean,allList:Array<any>,closePopup:Function,$destroy:Function} = this.$scope.$new();
        scope.rank = 0;
        scope.allList = [item];
        scope.showFooter = true;
        scope.closePopup = () => {
            this.layer.close(this.layerIndex);
        };
        this.layerIndex = this.layer.open({
            type: 1,
            skin: 'detail-popup-box',
            title: false,
            area: ['600px', '420px'],
            content: personPopup,
            scope: scope,
            end: function () {
                scope.$destroy();
            }
        });

    }
    showCarPopup(item: SearchAlarmLogResult) {
        let scope:{rank:number,showFooter:boolean,allList:Array<any>,closePopup:Function,$destroy:Function} = this.$scope.$new();
        scope.rank = 0;
        scope.allList = [item];
        scope.showFooter = true;
        scope.closePopup = () => {
            this.layer.close(this.layerIndex);
        };
        this.layerIndex = this.layer.open({
            type: 1,
            skin: 'detail-popup-box',
            title: false,
            area: ['670px', '400px'],
            content: carPopup,
            scope: scope,
            end: function () {
                scope.$destroy();
            }
        });
    }
    showWifiPopup(item: SearchAlarmLogResult) {
        let scope:{rank:number,showFooter:boolean,allList:Array<any>,closePopup:Function,$destroy:Function} = this.$scope.$new();
        scope.rank = 0;
        scope.allList = [item];
        scope.showFooter = true;
        scope.closePopup = () => {
            this.layer.close(this.layerIndex);
        };
        this.layerIndex = this.layer.open({
            type: 1,
            skin: 'detail-popup-box',
            title: false,
            area: ['575px', '200px'],
            content: wifiPopup,
            scope: scope,
            end: function () {
                scope.$destroy();
            }
        });
    }
    showEfencePopup(item: SearchAlarmLogResult) {
        let scope:{rank:number,showFooter:boolean,allList:Array<any>,closePopup:Function,$destroy:Function} = this.$scope.$new();
        scope.rank = 0;
        scope.allList = [item];
        scope.showFooter = true;
        scope.closePopup = () => {
            this.layer.close(this.layerIndex);
        };


        this.layerIndex = this.layer.open({
            type: 1,
            skin: 'detail-popup-box',
            title: false,
            area: ['575px', '200px'],
            content: efPopup,
            scope: scope,
            end: function () {
                scope.$destroy();
            }
        });
    }

    private searchByObjectType(objectType: string) {
        this.searchParams.objectType = objectType;
        this.searchParams.startTime = moment().subtract(7, 'day').format('YYYY-MM-DD') + ' 00:00:00';
        this.searchParams.endTime = moment().format('YYYY-MM-DD') + ' 23:59:59';
        this.getCollectList(true);
    }

    search() {
        if (this.startTime && this.endTime) {
            this.searchParams.startTime = this.startTime + ' 00:00:00';
            this.searchParams.endTime = this.endTime + ' 23:59:59';
            this.getCollectList(true);
        } else {
            this.layerDec.warnInfo('请输入有效时间!')
        }
    }

    getCollectList(isClear?: boolean) {
        this.collectService.findListByPage(this.searchParams)
            .then((res: ResponseResult<Array<CollectEx>>) => {
                if (res && res.data && res.code === 200) {
                    if (isClear) {
                        this.myCollectFactory.clearDatas();
                    }
                    this.myCollectFactory.cacheDatas(res.data || ([] as Array<CollectEx>));
                    let result = this.myCollectFactory.getDatas();
                    console.log("获取收藏信息===============", result);
                    this.$timeout(() => {
                        this.collectDatas = result;
                    });
                }
            })
    }


    /**
     * 获得更多的收藏数据
     * 逻辑: 在现有的分页基础上, 向后加一页, 查询
     */
    getMoreAlarm() {
        this.searchParams.endTime = moment(this.searchParams.startTime).subtract(1, 'day').format('YYYY-MM-DD') + ' 23:59:59';
        this.searchParams.startTime = moment(this.searchParams.startTime).subtract(8, 'day').format('YYYY-MM-DD') + ' 00:00:00';

        this.getCollectList()
    }

    expanderMore(data: MyCollectViewModel) {
        data.isExpand = !data.isExpand;
    }

    isEfenceType(val: string) {
        return ObjectType.ElectronicFence.value === val
    }

    isWifiType(val: string) {
        return ObjectType.Wifi.value === val
    }

    isVehicleType(val: string) {
        // 车牌字段格式还没定
        return val === 'Car';
    }

    isFaceType(val: string) {
        return val === "Face"
    }

    /**
     * 取消收藏
     */
    unAttention($event:MouseEvent,model: CollectEx, cacheDatas: MyCollectViewModel) {
        $event.stopPropagation();
        console.debug("unAttention", model);
        // this.myCollectFactory.removeData(model);
        let opts: LayerConfirmParams = {
            content: "确认要移除此条收藏吗?",
            title: "确认",
            btnStrList: ["确定", "取消"],
            okBtnFun: (index: number) => {
                this._unAttention(model, cacheDatas).then(() => {
                    this.layer.close(index);
                });
            }
        };
        this.layerDec.confirm(opts);
    }

    /**
     * 截取key, 用于界面展示时间
     * @param timeKey 时间key
     * @param paramName 可选项 yyyy MM dd
     */
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

    private _unAttention(model: CollectEx, cacheDatas: MyCollectViewModel) {
        return this.collectService.delete([model.ID]).then((res: ResponseResult<boolean>) => {
            if (res && res.data) {
                this.myCollectFactory.removeData(model, cacheDatas);
            }
            console.debug("collectDeleteInfo", res);
            return null;
        });

    }

}

app
    .controller('MyCollectController', MyCollectController);