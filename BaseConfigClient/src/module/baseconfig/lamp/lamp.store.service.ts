/** create by zxq
 *  缓存当前 任务添加、修改
 * @time: 2017-06-12 14:50:15
 * @params:
 * @return:
 */
import {app} from "../../common/app/main.app";
import {Area} from "../../../core/entity/Area";
import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {CameraEx} from "../../../core/entity/ex/CameraEx";
import {LampEx} from "../../../core/entity/ex/LampEx";
import {WifiEx} from "../../../core/entity/ex/WifiEx";
import {RmpGateEx} from "../../../core/entity/ex/RmpGateEx";
import {ElectronicFenceEx} from "../../../core/entity/ex/ElectronicFenceEx";
declare let angular: any;
declare let window: any;

export interface ITaskStoreService {
    //清空 缓存数据
    clearCache: () => boolean
    // 摄像机
    getTreeWithArea: Array<CameraEx & AreaEx>;
    SelectCameraList:Array<string>;
    updateSelectCameraList:(list:Array<string>) => boolean
    updateCameraTreeWithArea: (params: Array<CameraEx & AreaEx>) => boolean
    // WIFI
    getTreeWithWifi: Array<WifiEx & AreaEx> 
    SelectWifiList:Array<string>;
    updateSelectWifiList:(list:Array<string>) => boolean
    updateWifiTreeWithArea:(params: Array<WifiEx & AreaEx>)=>boolean;
    // 卡口
    getTreeWithRmpGate: Array<RmpGateEx & AreaEx>
    SelectRmpGateList:Array<string>;
    updateSelectRmpGateList:(list:Array<string>) => boolean
    updateRmpGateTreeWithArea:(params: Array<RmpGateEx & AreaEx>)=>boolean;
    // 电围
    getTreeWithElectronicFence: Array<ElectronicFenceEx & AreaEx>
    SelectElectronicFenceList:Array<string>;
    updateSelectElectronicFenceList:(list:Array<string>) => boolean
    updateElectronicFenceTreeWithArea:(params: Array<ElectronicFenceEx & AreaEx>)=>boolean;
}
class IActionCameraList {
    CameraList:Array<string>;
    WifiList:Array<string>;
    RmpGateList:Array<string>;
    ElectronicFenceList:Array<string>;
}

class TaskStoreService implements ITaskStoreService {

    private ActionDeviceList = {} as IActionCameraList;
    private TreeWithArea :Array<CameraEx & AreaEx>;
    private TreeWithWifi :Array<WifiEx & AreaEx>;
    private TreeWithRmpGate :Array<RmpGateEx & AreaEx>;
    private TreeWithElectronicFence :Array<ElectronicFenceEx & AreaEx>;
    clearCache(): boolean {
        this.TreeWithArea = null;
        this.ActionDeviceList.CameraList = null;
        this.ActionDeviceList.WifiList = null;
        this.ActionDeviceList.RmpGateList = null;
        this.ActionDeviceList.ElectronicFenceList = null;
        return true;
    }
    //摄像机
    get getTreeWithArea(): Array<CameraEx & AreaEx> {
        if(this.TreeWithArea){
            return angular.copy(this.TreeWithArea);
        }else{
            return null;
        }

    }
    get SelectCameraList():Array<string>{
        if(this.ActionDeviceList.CameraList){
            return this.ActionDeviceList.CameraList;
        }else{
            return null
        }
    }
    updateSelectCameraList(list:Array<string>):boolean{
        this.ActionDeviceList.CameraList = list;
        return true;
    }
    updateCameraTreeWithArea (params: Array<CameraEx & AreaEx>):boolean{
        this.TreeWithArea = params;
        return true;
    }
    //wifi
    get getTreeWithWifi(): Array<WifiEx & AreaEx> {
        if(this.TreeWithWifi){
            return angular.copy(this.TreeWithWifi);
        }else{
            return null;
        }

    }
    get SelectWifiList():Array<string>{
        if(this.ActionDeviceList.WifiList){
            return this.ActionDeviceList.WifiList;
        }else{
            return null
        }
    }
    updateSelectWifiList(list:Array<string>):boolean{
        this.ActionDeviceList.WifiList = list;
        return true;
    }
    updateWifiTreeWithArea (params: Array<WifiEx & AreaEx>):boolean{
        this.TreeWithWifi = params;
        return true;
    }
    //卡口
    get getTreeWithRmpGate(): Array<RmpGateEx & AreaEx> {
        if(this.TreeWithRmpGate){
            return angular.copy(this.TreeWithRmpGate);
        }else{
            return null;
        }

    }
    get SelectRmpGateList():Array<string>{
        if(this.ActionDeviceList.RmpGateList){
            return this.ActionDeviceList.RmpGateList;
        }else{
            return null
        }
    }
    updateSelectRmpGateList(list:Array<string>):boolean{
        this.ActionDeviceList.RmpGateList = list;
        return true;
    }
    updateRmpGateTreeWithArea (params: Array<RmpGateEx & AreaEx>):boolean{
        this.TreeWithRmpGate = params;
        return true;
    }
    //电围
    get getTreeWithElectronicFence(): Array<ElectronicFenceEx & AreaEx> {
        if(this.TreeWithElectronicFence){
            return angular.copy(this.TreeWithElectronicFence);
        }else{
            return null;
        }
    }
    get SelectElectronicFenceList():Array<string>{
        if(this.ActionDeviceList.ElectronicFenceList){
            return this.ActionDeviceList.ElectronicFenceList;
        }else{
            return null
        }
    }
    updateSelectElectronicFenceList(list:Array<string>):boolean{
        this.ActionDeviceList.ElectronicFenceList = list;
        return true;
    }
    updateElectronicFenceTreeWithArea (params: Array<ElectronicFenceEx & AreaEx>):boolean{
        this.TreeWithElectronicFence = params;
        return true;
    }
}

app.service('taskStoreService', TaskStoreService);
