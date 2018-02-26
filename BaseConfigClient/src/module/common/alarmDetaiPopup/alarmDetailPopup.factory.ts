/// <amd-dependency path="text!./alarmDetailPopup.html" name="alarmDetailPopupHtml" />
import "css!./alarmDetailPopup.css";
import "./alarmDetailPopup.controller";
import {app} from "../../common/app/main.app";
import {VehicleAlarmLog} from "../../../core/server/AlarmModule";
declare const alarmDetailPopupHtml:string;
export interface AngularScope{
    $on: Function;
    $scope: Function;
    $destroy: Function;
    $emit: Function;
    $new: Function;
}

export interface CommonAlarmDetailPopupParams extends AngularScope{
    popupDatas:VehicleAlarmLog;

    /**TODO 根据需要追加
     *  关闭操作
     * @time: 2017-11-30 16:35:10
     */
    beforeClose?:(parmas:any)=>boolean;
    /**
     *  关闭操作
     * @time: 2017-11-30 16:35:10
     */
    afterClose?:(parmas:any)=>boolean;

    /**
     *  关闭操作
     * @time: 2017-11-30 16:35:10
     */
    closePopup?:(parmas:any)=>void;
}
export interface IAlarmDetailPopupFactory{
    showPopup(parentScope:any,popupDatas:VehicleAlarmLog):void;
}

class AlarmDetailPopupFactory implements IAlarmDetailPopupFactory{
    static $inject = ['layer'];
    constructor(private layer:any ){}
    layerIndex:number;
    parentParams:CommonAlarmDetailPopupParams;

    showPopup(parentScope:CommonAlarmDetailPopupParams,popupDatas:VehicleAlarmLog){
        this.parentParams = parentScope;
        let scope:CommonAlarmDetailPopupParams = parentScope.$new();
        scope.popupDatas = popupDatas;
        scope.closePopup = this.closePopup;
        this.layer.open({
            type:1,
            btn:null,
            title:"报警详情",
            content:alarmDetailPopupHtml,
            scope:scope,
            area:["650px"],
            skin: "m-alarm-detail-visible",
            end:()=>{
                scope.$destroy();
                scope = null;
            }
        }).then((index:number)=>{
            this.layerIndex = index;
        });
        parentScope = null;
    }

    closePopup = (parmas:any)=>{
        if(this.parentParams && this.parentParams.beforeClose){
            console.log("未实现调用异步操作");
            console.log("执行 beforeClose");
            this.parentParams.beforeClose(parmas);
        }
        /*todo 关闭前操作*/
        this.layer.close(this.layerIndex);
        /*todo 关闭后操作*/
        if(this.parentParams && this.parentParams.beforeClose){
            console.log("未实现调用异步操作");
            console.log("执行 afterClose");
            this.parentParams.afterClose(parmas);
        }
        return true;
    };

}

app.service('alarmDetailPopupFactory', AlarmDetailPopupFactory);
