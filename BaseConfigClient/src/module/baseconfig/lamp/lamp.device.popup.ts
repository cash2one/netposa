/**
 * Created by dell on 2017/3/29.
 */
import '../../common/app/main.app'
import {app} from "../../common/app/main.app";
import {RelationCol, Relation} from "../../../core/entity/DeviceRelation";
import {ITableHeader} from "../../common/directive/unit-table/table-params";
import {LampEx} from "../../../core/entity/ex/LampEx";
import {ILampService} from "../../common/services/lamp.service";
import {SystemPoint} from "../../../core/entity/SystemPoint";
import {BackResponseBody, ResponseResult} from "../../../core/params/result/ResponseResult";
import {ILayerDec} from "../../common/factory/layerMsg.factory";
import  "../../common/factory/layerMsg.factory";
import {LayerType} from '../../../core/enum/LayerType';
import {ObjectType} from '../../../core/enum/ObjectType';

declare let angular: any;

interface LampExt{
    Camera: Array<string>,
    RmpGate: Array<string>,
    WIFI: Array<string>,
    ElectronicFence: Array<string>
}

class DevicePopupController {
    static $inject = ['$scope',
                      '$rootScope',
                      'lampService',
                      'layerDec'];
    tHeadDevice:Array<ITableHeader>;
    tBodyDevice:Array<any>;
    currentLamp: LampEx;
    lampPoint: string;
    currentEx:any = {};
    constructor(
        private $scope: any,
        private $rootScope: any,
        private lampService:ILampService,
        private layerDec: ILayerDec
    ) {
        $scope.$on("$destroy", function () {
            console.error("销毁了弹出框");
        });

        // 设备表头
        this.tHeadDevice = [
            { field: "DeviceName", title: "DP_CONFIG_COMMON_03"},
            { field: "DeviceType", title: "DP_CONFIG_COMMON_88"},
            { field: "DeviceArea", title: "DP_CONFIG_COMMON_09"},
            { field: "bottoms", title: "DP_CONFIG_COMMON_15"}
        ];
        this.currentLamp = $scope.currentLamp;
        this.tBodyDevice = $scope.currentLamp.JsonUserData.Divices;
        console.log(this.tBodyDevice);
        if($scope.currentLamp.JsonUserData.Point){
           try{
               this.currentEx = JSON.parse($scope.currentLamp.JsonUserData.Point.Ext);
           }catch (e){
               console.log('Ext is not found')
           }
        }
    }

    //匹配坐标和设备
    public lampPositon(data:any){
        console.log(data)
        let that:any = this;
        that.lampService.findSystemPointById(data.ID).then((res:ResponseResult<SystemPoint>)=>{
            if(res&&res.data){
                let systemPoint = {} as SystemPoint;
                systemPoint.ObjectID = this.currentLamp.ID;
                systemPoint.LayerType = LayerType.LampPost.value;
                systemPoint.ObjectType = ObjectType.LampPost.value;
                systemPoint.Ext = JSON.stringify({deviceName:data.Name,deviceID:data.ID});
                systemPoint.Lat = res.data.Lat;
                systemPoint.Lon = res.data.Lon;

                that.lampService.updataLampSystemPoint(systemPoint).then((res:ResponseResult<any>)=>{
                    if(res&&res.data){
                        that.layerDec.successInfo(`更新${this.currentLamp.Name}坐标成功`);
                    }else{
                        that.layerDec.failInfo(`更新${this.currentLamp.Name}坐标失败`);
                    }
                })
            }else{
                that.layerDec.warnInfo(`未找到${data.Name}的设备坐标`);
            }
        })
    }

    public submit(){
        this.$rootScope.$broadcast('lampDevice.closePopup', true);
    }

    public deleteLampAndDeviceRalation(data:any){
        let that:any = this;
        let relation = {} as Relation;
        relation.ObjectId = this.currentLamp.ID;
        relation.RelatedObjectId = data.ID;
        this.lampService.deleteLampAndDeviceRelation(relation).then((res:ResponseResult<any>)=>{
            if(res&&res.data){
                console.log(this.tBodyDevice);
                console.log(data);
                that.layerDec.successInfo(`删除关联设备${data.Name}成功`);
            }else{
                that.layerDec.failInfo(`删除关联设备${data.Name}失败`);
            }
        })
    }
}

app.controller('DevicePopupController', DevicePopupController);