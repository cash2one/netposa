import {IResponseNotifyFactory} from "../factory/response.notify.factory";
import "../factory/response.notify.factory";
declare var require: any;
import {app} from "../app/main.app";
import 'angular';
import {RmpGateChangeAreaIDModel} from "../../../core/params/RmpgateParams";
import {RmpGate} from "../../../core/entity/Rmpgate";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {RmpGateEx} from "../../../core/entity/ex/RmpGateEx";
import { LampEx } from '../../../core/entity/ex/LampEx';
import {AreaEx} from '../../../core/entity/ex/AreaEx';
import './casecade.service';


import {OperFitstModule} from '../../../core/entity/OperFirstModule';
import {OperSecondModule} from '../../../core/entity/OperSecondModule';
import {OperThirdModule} from '../../../core/entity/OperThirdModule';
import {OperActionType} from '../../../core/entity/OperActionType';
import {ISystemLogFactory} from "../factory/SystemLog.factory";
import "../factory/SystemLog.factory";

declare let angular: any;


export interface IRmpGateService {
    findAll(): Promise<Array<RmpGate>>;
    findListByName(name:string): Promise<Array<RmpGate>>;
    updateRmpGateAreaID(models: Array<RmpGateChangeAreaIDModel>):Promise<ResponseResult<boolean>>;
    updateRmpGateLampID(models: Array<RmpGateChangeAreaIDModel>):Promise<ResponseResult<boolean>>;
    edit(models: RmpGate):Promise<ResponseResult<boolean>>;
    findLampTree():Promise<any>;
}
    class RmpgateService implements IRmpGateService {
        static $inject: Array<string> = ['$http','notifyFactory','systemLogFactory'];
        private notifyFunc:(res: ResponseResult<any>)=>ResponseResult<any>;
    
        constructor(private $http: Function, private notifyFactory: IResponseNotifyFactory, private systemLogFactory: ISystemLogFactory) {
            this.$http = $http
            this.notifyFunc = this.notifyFactory.msg({onlySuccess: true});
        }
        
    updateRmpGateAreaID(models: Array<RmpGateChangeAreaIDModel>): Promise<ResponseResult<boolean>> {
        return this.$http({
            method: 'post',
            url: '/db/rmpgate/changeAreaId',
            data: models
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Device.code,
            OperThirdModule: OperThirdModule.BaseConfig_Device_RmpGate.code,
            ActionType: OperActionType.Modify.code
        }));
    }
    
    updateRmpGateLampID(models: Array<RmpGateChangeAreaIDModel>): Promise<ResponseResult<boolean>> {
        console.log("参数");
        console.log(models)
        return this.$http({
            method: 'post',
            url: '/db/rmpgate/changeLampId',
            data: models
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Device.code,
            OperThirdModule: OperThirdModule.BaseConfig_Device_RmpGate.code,
            ActionType: OperActionType.Modify.code
        }));
    }

    findAll(): Promise<Array<RmpGate>> {

        return this.$http({
            method: 'get',
            url: '/db/rmpgate/findAllList'
        }).then(complete);

        function complete(res: ResponseResult<Array<RmpGateEx>>) {
            let arr = [] as Array<RmpGateEx>;
            if (res && res.code === 200 && res.data) {
                arr = res.data;
            }
            return arr;
        }
    }

    findListByName(name:string): Promise<Array<RmpGate>> {
        return this.$http({
            method: 'get',
            url: '/db/rmpgate/findListByName',
            params:{name:name}
        }).then(complete);

        function complete(res: ResponseResult<Array<RmpGateEx>>) {
            let arr = [] as Array<RmpGateEx>;
            if (res && res.code === 200 && res.data) {
                arr = res.data;
            }
            return arr;
        }
    }


    edit(models: RmpGate){
        return this.$http({
            method: 'post',
            url: '/db/rmpgate/edit',
            data:models
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Device.code,
            OperThirdModule: OperThirdModule.BaseConfig_Device_RmpGate.code,
            ActionType: OperActionType.Modify.code
        }));
    }

    findLampTree(){
        return this.$http({
            method: 'get',
            url: '/db/area/findLampTreeWithRmpGate',
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
    .service('rmpgateService', RmpgateService);