/** create by zxq
 *  @time: 2017-06-22
 */
import {app} from "../common/app/main.app";

declare let angular : any;
declare let window : any;


export interface IDynamicControlCacheFactory{
    //地图工具条
    updateBtnParams : (result : boolean) => void;
    getBtnParams : () => any;

    /*报警消息*/
    getAlarmDatas : () => any;
    updateAlarmDatas : (dataArray : Array<any>) => void;

    //地图摄像机定位
    setCameraLocate : (data : Function) => void;
    getCameraLocate : (data : any) => any;

};

class DynamicControlCacheFactory implements IDynamicControlCacheFactory{

    /*地图工具条*/
    // 双向绑定为  obj
    private btnParams : {
        isOpen : boolean
    };

    //摄像机定位
    private locateOnMap : Function;

    //用于初始化动态更新值
    updateBtnParams = (result : boolean) => {
        if(result){
            this.btnParams = {isOpen : true};
        }else {
            this.btnParams.isOpen = !this.btnParams.isOpen;
        }
    };
    //对外提供值
    getBtnParams = ():any => {
        return this.btnParams;
    }
    /*地图工具条*/


    /** 报警消息 **/
    private alarmDatas : any;

    //存储报警数据
    updateAlarmDatas = (dataArray : Array<any>) => {
        this.alarmDatas = dataArray
    };

    //获取报警数据
    getAlarmDatas = () => {
        return this.alarmDatas;
    };

    /** 报警消息 **/


    /***** 地图操作 ****/

    //初始设置摄像机定位地图点位方法
    setCameraLocate = (data : Function) => {
        this.locateOnMap = data;
    };

    //通过tree回传数据调用摄像机定位地图方法
    getCameraLocate = (data : any) => {
         this.locateOnMap(data);
    };


    /***** 地图操作 ****/

}

app.service('dynamicControlCacheFactory', DynamicControlCacheFactory);
