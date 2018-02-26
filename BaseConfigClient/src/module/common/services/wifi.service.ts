

import {IResponseNotifyFactory} from "../factory/response.notify.factory";
import "../factory/response.notify.factory";
declare let require: any;
import {app} from "../app/main.app";
import 'angular';
import {WifiChangeAreaIDModel} from "../../../core/params/WifiParams";
import {Wifi} from "../../../core/entity/Wifi";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {WifiEx} from "../../../core/entity/ex/WifiEx";
import { LampEx } from '../../../core/entity/ex/LampEx';
import {AreaEx} from '../../../core/entity/ex/AreaEx';
import './casecade.service';
import { CasCadeService } from './casecade.service';
import { Promise } from '../../../@types/es6-promise/index';

import {OperFitstModule} from '../../../core/entity/OperFirstModule';
import {OperSecondModule} from '../../../core/entity/OperSecondModule';
import {OperThirdModule} from '../../../core/entity/OperThirdModule';
import {OperActionType} from '../../../core/entity/OperActionType';
import {ISystemLogFactory} from "../factory/SystemLog.factory";
import "../factory/SystemLog.factory";

declare let angular: any;

export interface IWifiService {
    findAll(): Promise<Array<Wifi>>;
    findListByName(name:string): Promise<Array<Wifi>>;
    edit(models: Wifi):Promise<ResponseResult<boolean>>;
    updateWifiAreaID(models: Array<WifiChangeAreaIDModel>):Promise<ResponseResult<boolean>>;
    updateWifiLampID(models: Array<WifiChangeAreaIDModel>):Promise<ResponseResult<boolean>>;
    findLampTree():Promise<any>;
    findWifiList:(search?: string)=> Promise<Array<WifiEx>>;
}

class WifiService implements IWifiService {


    static $inject: Array<string> = ['$http','notifyFactory', 'systemLogFactory'];
    private notifyFunc:(res: ResponseResult<any>)=>ResponseResult<any>;

    constructor(private $http: Function, private notifyFactory: IResponseNotifyFactory, private systemLogFactory: ISystemLogFactory) {
        this.notifyFunc = this.notifyFactory.msg({onlySuccess: true});
    }

    updateWifiAreaID(models: Array<WifiChangeAreaIDModel>): Promise<ResponseResult<boolean>> {
        return this.$http({
            method: 'post',
            url: '/db/wifi/changeAreaId',
            data: models
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Device.code,
            OperThirdModule: OperThirdModule.BaseConfig_Device_WiFi.code,
            ActionType: OperActionType.Modify.code
        }));
    }

    updateWifiLampID(models: Array<WifiChangeAreaIDModel>): Promise<ResponseResult<boolean>> {
        return this.$http({
            method: 'post',
            url: '/db/wifi/changeLampId',
            data: models
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Device.code,
            OperThirdModule: OperThirdModule.BaseConfig_Device_WiFi.code,
            ActionType: OperActionType.Modify.code
        }));
    }

    findAll(): Promise<Array<Wifi>> {

        return this.$http({
            method: 'get',
            url: '/db/wifi/findAllList'
        }).then(complete);

        function complete(res: ResponseResult<Array<WifiEx>>) {
            console.log(res.data);
            let arr = [] as Array<WifiEx>;
            if (res && res.code === 200 && res.data) {
                arr = res.data;
            }
            return arr;
        }
    }

    findListByName(name:string): Promise<Array<Wifi>> {
        return this.$http({
            method: 'get',
            url: '/db/wifi/findListByName',
            params:{name:name}
        }).then(complete);

        function complete(res: ResponseResult<Array<WifiEx>>) {
            let arr = [] as Array<WifiEx>;
            if (res && res.code === 200 && res.data) {
                arr = res.data;
            }
            return arr;
        }
    }

    edit(models: Wifi){
        return this.$http({
            method: 'post',
            url: '/db/wifi/edit',
            data:models
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Device.code,
            OperThirdModule: OperThirdModule.BaseConfig_Device_WiFi.code,
            ActionType: OperActionType.Modify.code
        }));
    }

    findLampTree(){
        return this.$http({
            method: 'get',
            url: '/db/area/findLampTreeWithWifi',
        }).then(complete);

        function complete(res: ResponseResult<Array<LampEx | AreaEx | WifiEx>>) {
            let arr = [] as Array<LampEx | AreaEx | WifiEx>;
            if (res && res.code === 200 && res.data) {
                arr = res.data;
            }
            return arr;
        }
    }
    findWifiList(search?: string){
        return this.$http({
            method: "POST",
            url: "/db/area/findWifiList",
            params: {keyword:search}
        })
        .then(complete)
        function complete(res: ResponseResult<Array<WifiEx>>) {
            let arr = [] as Array<WifiEx>;
            if (res && res.code === 200 && res.data) {
                arr = res.data;
            }
            return arr;
        }
    }
    

}

app
    .service('wifiService', WifiService);