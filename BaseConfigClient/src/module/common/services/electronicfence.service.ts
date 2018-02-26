import {IResponseNotifyFactory} from "../factory/response.notify.factory";
import "../factory/response.notify.factory";
declare let require: any;
import {app} from "../app/main.app";
import 'angular';
import {ElectronicFenceChangeAreaIDModel, ElectronicFenceChangeElectronicFenceType} from "../../../core/params/ElectronicFenceParams";
import {ElectronicFence} from "../../../core/entity/ElectronicFence";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {ElectronicFenceEx} from "../../../core/entity/ex/ElectronicFenceEx";
import { LampEx } from '../../../core/entity/ex/LampEx';
import {AreaEx} from '../../../core/entity/ex/AreaEx';
import { Promise } from '../../../@types/es6-promise/index';

import {OperFitstModule} from '../../../core/entity/OperFirstModule';
import {OperSecondModule} from '../../../core/entity/OperSecondModule';
import {OperThirdModule} from '../../../core/entity/OperThirdModule';
import {OperActionType} from '../../../core/entity/OperActionType';
import {ISystemLogFactory} from "../factory/SystemLog.factory";
import "../factory/SystemLog.factory";
declare let angular: any;


export interface IElectronicFenceService {
    findElectronicfenceList:(search?: string)=> Promise<Array<ElectronicFenceEx>>;
    findAll(): Promise<Array<ElectronicFence>>;
    findListByName(name:string): Promise<Array<ElectronicFence>>;
    edit(models: ElectronicFence):Promise<ResponseResult<boolean>>;
    updateElectronicAreaID(models: Array<ElectronicFenceChangeAreaIDModel>):Promise<ResponseResult<boolean>>;     
    updateElectronicLampID(models: Array<ElectronicFenceChangeAreaIDModel>):Promise<ResponseResult<boolean>>; 
    findLampTree():Promise<any>;
}

class ElectronicFenceService implements IElectronicFenceService {


    static $inject: Array<string> = ['$http','notifyFactory', 'systemLogFactory'];
    private notifyFunc:(res: ResponseResult<any>)=>ResponseResult<any>;

    constructor(private $http: Function, private notifyFactory: IResponseNotifyFactory, private systemLogFactory: ISystemLogFactory) {
        this.notifyFunc = this.notifyFactory.msg({onlySuccess: true});
    }

    findElectronicfenceList(search?: string){
        return this.$http({
            method: "POST",
            url: "/db/area/findElectronicfenceList",
            params: {keyword:search}
        })
        .then(complete)
        function complete(res: ResponseResult<Array<ElectronicFenceEx>>) {
            let arr = [] as Array<ElectronicFenceEx>;
            if (res && res.code === 200 && res.data) {
                arr = res.data;
            }
            return arr;
        }
    }
    //更新电围区域ID
    updateElectronicAreaID(models: Array<ElectronicFenceChangeAreaIDModel>): Promise<ResponseResult<boolean>> {
        return this.$http({
            method: 'POST',
            url: '/db/ElectronicFence/changeAreaId',
            data: models
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Device.code,
            OperThirdModule: OperThirdModule.BaseConfig_Device_EFence.code,
            ActionType: OperActionType.Modify.code
        }));
    }

    updateElectronicLampID(models: Array<ElectronicFenceChangeAreaIDModel>): Promise<ResponseResult<boolean>> {
        return this.$http({
            method: 'POST',
            url: '/db/ElectronicFence/changeLampId',
            data: models
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Device.code,
            OperThirdModule: OperThirdModule.BaseConfig_Device_EFence.code,
            ActionType: OperActionType.Modify.code
        }));
    }

     findAll(): Promise<Array<ElectronicFence>> {

        return this.$http({
            method: 'get',
            url: '/db/ElectronicFence/findAllList'
        }).then(complete);

        function complete(res: ResponseResult<Array<ElectronicFenceEx>>) {
            let arr = [] as Array<ElectronicFenceEx>;
            if (res && res.code === 200 && res.data) {
                arr = res.data;
            }
            return arr;
        }
    }

    findListByName(name:string): Promise<Array<ElectronicFence>> {
        return this.$http({
            method: 'get',
            url: '/db/ElectronicFence/findListByName',
            params:{name:name}
        }).then(complete);

        function complete(res: ResponseResult<Array<ElectronicFenceEx>>) {
            let arr = [] as Array<ElectronicFenceEx>;
            if (res && res.code === 200 && res.data) {
                arr = res.data;
            }
            return arr;
        }
    }


    edit(models: ElectronicFence){
        console.log("数据",models)
        return this.$http({
            method: 'post',
            url: '/db/ElectronicFence/edit',
            data:models
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Device.code,
            OperThirdModule: OperThirdModule.BaseConfig_Device_EFence.code,
            ActionType: OperActionType.Modify.code
        }));
    }

    findLampTree(){
        return this.$http({
            method: 'get',
            url: '/db/area/findLampTreeWithElectronicfence',
        }).then(complete);

        function complete(res: ResponseResult<Array<LampEx | AreaEx>>) {
            console.log(res)
            let arr = [] as Array<LampEx | AreaEx>;
            if (res && res.code === 200 && res.data) {
                arr = res.data;
            }
            return arr;
        }
    }
    
}

app
    .service('electronicfenceService', ElectronicFenceService);