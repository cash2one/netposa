/**
 * Created by lb on 2017/11/1 0001.
 */

import {app} from "../app/main.app";
import 'angular';
declare let angular: any;
import {ICameraService} from  '../services/camera.service';
import '../services/camera.service';
import  '../services/wifi.service';
import '../services/electronicfence.service';
import  '../services/rmpgate.service';
import  './HandleStorage.factory';
import '../services/map.service';
import { IRmpGateService } from "../services/rmpgate.service";
import { RmpGate } from "../../../core/entity/Rmpgate";
import { IWifiService } from "../services/wifi.service";
import { IElectronicFenceService } from "../services/electronicfence.service";
import { IMapService } from "../services/map.service";
export interface IdeviceCaacheService {
    getAllCameraList: (isCache?:boolean) => any;
    getAllRmpgateList: (isCache?:boolean) => any;
    getAllWifiList: (isCache?:boolean) => any;
    getAllEleList:(isCache?:boolean)=>any;
    getAllDevice:()=>any;
    getDeviceCache: (deviceName:string) => any;
    isCache : (deviceType:string) => any;
}

class diviceCacheService implements IdeviceCaacheService {
    static  $inject:Array<string> = ['$http','cameraService','wifiService','electronicfenceService','rmpgateService','handleStorage','mapService'];
    constructor (private $http:any, private cameraservice:ICameraService,private wifiService: IWifiService,private electronicfenceService: IElectronicFenceService, private rmpgateService: IRmpGateService, private handleStorage:any, private mapService: IMapService) {

    }
    isCache (deviceType:string) {
        return sessionStorage.getItem(deviceType);
    }
    getAllCameraList (isCache?:boolean) {
        if(!this.isCache('cameraCache')) {
            this.cameraservice.findAll().then((res)=>{
                if (res && isCache) {
                    this.handleStorage.setSessionStorageData('cameraCache',res);
                } else {
                    return res;
                }
            })
        } else if (!isCache){
            return  this.getDeviceCache('cameraCache');
        }
    }
    getAllRmpgateList (isCache?:boolean) {
        if (!this.isCache('rmpgateCache')) {
            this.rmpgateService.findAll().then((res: Array<RmpGate>)=>{
                if (res && isCache) {
                    this.handleStorage.setSessionStorageData('rmpgateCache',res);
                } else {
                    return res
                }
            })
        } else if (!isCache){
            return  this.getDeviceCache('rmpgateCache');
        }
    }
    getAllWifiList (isCache?:boolean) {
        if (!this.isCache('wifiCache')) {
            this.wifiService.findAll().then((res)=>{
                if (res && isCache) {
                    this.handleStorage.setSessionStorageData('wifiCache',res);
                } else {
                    return res
                }
            })
        }else if (!isCache){
            return  this.getDeviceCache('wifiCache');
        }
    }
    getAllEleList (isCache?:boolean) {
        if (!this.isCache('eleCache')) {
            this.electronicfenceService.findAll().then((res)=>{
                if (res && isCache) {
                    this.handleStorage.setSessionStorageData('eleCache',res);
                } else {
                    return res
                }
            })
        } else if (!isCache){
            return  this.getDeviceCache('eleCache');
        }
    }

    getAllDevice() {
        let isCache:boolean = true;
        this.getAllCameraList(isCache);
        this.getAllRmpgateList(isCache);
        this.getAllWifiList(isCache);
        this.getAllEleList(isCache);
    };

    
    getDeviceCache(deviceName:string) {
        if (sessionStorage.getItem(deviceName)) {
            return this.handleStorage.getSessionStorageData(deviceName);
        } else {
            let result:any;
            switch (deviceName) {
                case 'cameraCache':
                    result = this.getAllCameraList(false);
                    break;
                case 'rmpgateCache':
                    result = this.getAllRmpgateList(false);
                    break;
                case  'wifiCache':
                    result = this.getAllWifiList(false);
                    break;
                case  'eleCache':
                    result = this.getAllEleList(false);
                    break;
            }
            return result;
        }
    }
}
app.service('deviceCacheServer',diviceCacheService);