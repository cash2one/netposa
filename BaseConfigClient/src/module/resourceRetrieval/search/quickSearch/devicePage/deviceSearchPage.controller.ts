import {app} from '../../../../common/app/main.app';

// 高级检索参数
import { device , CollectAddParams , CollectDeleteParams } from '../../../resourceRetrievalEnum';
import {LayerType} from '../../../../../core/enum/LayerType';
import {ObjectType} from '../../../../../core/enum/ObjectType';

// 服务
import '../../../../common/services/resourceRetrieval.service';
import {IResourceRetrievalService} from '../../../../common/services/resourceRetrieval.service';

import {BackResponseBody, ResponseResult} from "../../../../../core/params/result/ResponseResult";
import {CollectDataType} from "../../../../../core/server/enum/CollectDataType";

declare let angular:any;

interface IDeviceButton {
    title: string;
    name: string;
    active: boolean;
}

class DeviceSearchPageController{
    static $inject = ['$scope' , '$timeout' , 'mylayer' , 'resourceRetrievalService'];
    deviceButton:Array<IDeviceButton>;
    activeType:string = 'camera';

    constructor(
        private $scope:any,
        private $timeout:any,
        private mylayer:any,
        private resourceRetrievalService: IResourceRetrievalService
    ){

        this.deviceButton = [
            {title:"摄像机", name:"camera", active:true},
            {title:"卡口", name:"rmpgate", active:false},
            {title:"wifi", name:"wifi", active:false},
            {title:"电围", name:"electronicfence", active:false}
        ];
        // controller 销毁清除弹框
        this.$scope.$on('$destroy',()=>{
            this.mylayer.destroy()
        })
    }

    // 设备按钮切换
    public deviceSwitch(name: string){
        this.activeType = name;

        let switchDev:Array<IDeviceButton> = angular.copy(this.deviceButton);
        switchDev.forEach((Title)=>{
            if(Title.name === name){
                Title.active = true;
            }else{
                Title.active = false;
            }
        });
        this.deviceButton = switchDev;
    };

    /**
     *
     * @description 显示详情弹框
     * @param item
     */
    public devicePopup(item:device, type: string){
        if (type === "Camera") {
            switch(item.DeviceType) {
                case "NormalCamera":
                case "HighCamera": item.LayerType=LayerType.HighCamera.value,item.ObjectType=ObjectType.Camera.value; break;
                case "PortraitCamera": item.LayerType=LayerType.PortraitCamera.value,item.ObjectType=ObjectType.Camera.value; break;
                case "FaceCamera": item.LayerType=LayerType.FaceCamera.value,item.ObjectType=ObjectType.Camera.value; break;
                default: break;
            }
        }
        if (type === "RmpGate") {
            item.LayerType=LayerType.RmpGate.value;
            item.ObjectType=ObjectType.RmpGate.value;
        }
        if (type === "WiFi") {
            item.LayerType=LayerType.WiFi.value;
            item.ObjectType=ObjectType.Wifi.value;
        }
        if (type === "EFENCE") {
            item.LayerType=LayerType.ElectronicFence.value;
            item.ObjectType=ObjectType.ElectronicFence.value;
        }
        this.$scope.$emit('device_popup_layer',item, type);
    }

    //获取设备坐标
    public findSystemPointById(id: string){
        this.resourceRetrievalService.findSystemPointById(id).then((res:ResponseResult<any>)=>{
                if(res.code == 200 && res.data){
                }
        })
    }
}
app.controller('deviceSearchPageController', DeviceSearchPageController);