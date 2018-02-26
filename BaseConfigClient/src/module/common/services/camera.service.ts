import {IResponseNotifyFactory} from "../factory/response.notify.factory";
import "../factory/response.notify.factory";
declare let require: any;
import {app} from "../app/main.app";
import 'angular';
import {CameraChangeAreaIDModel, CameraChangeCameraType} from "../../../core/params/CameraParams";
import {Camera} from "../../../core/entity/Camera";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {CameraEx} from "../../../core/entity/ex/CameraEx";
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


export interface ICameraService {
    findAll(): Promise<Array<Camera>>;
    findListByName(name:string): Promise<Array<Camera>>;
    delete(models: Camera):Promise<any>;
    edit(models: Camera):Promise<ResponseResult<boolean>>;
    updateCameraAreaID(models: Array<CameraChangeAreaIDModel>):Promise<ResponseResult<boolean>>;
    updateCameraLampID(models: Array<CameraChangeAreaIDModel>):Promise<ResponseResult<boolean>>;
    updateCameraType(models: Array<CameraChangeCameraType>):Promise<ResponseResult<boolean>>;
    findLampTree():Promise<any>;
    findPlayerForID(id:string):Promise<any>;
}

class CameraService implements ICameraService {


    static $inject: Array<string> = ['$http','notifyFactory', 'systemLogFactory'];
    private notifyFunc:(res: ResponseResult<any>)=>ResponseResult<any>;

    constructor(private $http: Function, private notifyFactory: IResponseNotifyFactory, private systemLogFactory: ISystemLogFactory) {
        this.notifyFunc = this.notifyFactory.msg({onlySuccess: true});
    }

    updateCameraAreaID(models: Array<CameraChangeAreaIDModel>): Promise<ResponseResult<boolean>> {
        return this.$http({
            method: 'post',
            url: '/db/camera/changeAreaId',
            data: models
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Device.code,
            OperThirdModule: OperThirdModule.BaseConfig_Device_Camera.code,
            ActionType: OperActionType.Modify.code
        }));
    }

    updateCameraLampID(models: Array<CameraChangeAreaIDModel>):Promise<ResponseResult<boolean>>{
        return this.$http({
            method: 'post',
            url: '/db/camera/changeLampId',
            data: models
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Device.code,
            OperThirdModule: OperThirdModule.BaseConfig_Device_Camera.code,
            ActionType: OperActionType.Modify.code
        }));
    }

    updateCameraType(models: Array<CameraChangeCameraType>){
        return this.$http({
            method: 'post',
            url: '/db/camera/changeCameraType',
            data: models
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Device.code,
            OperThirdModule: OperThirdModule.BaseConfig_Device_Camera.code,
            ActionType: OperActionType.Modify.code
        }));
    }

    findAll(): Promise<Array<Camera>> {

        return this.$http({
            method: 'get',
            url: '/db/camera/findAllList'
        }).then(complete);

        function complete(res: ResponseResult<Array<CameraEx>>) {
            let arr = [] as Array<CameraEx>;
            if (res && res.code === 200 && res.data) {
                arr = res.data;
            }
            return arr;
        }
    }

    findListByName(name:string): Promise<Array<Camera>> {
        return this.$http({
            method: 'get',
            url: '/db/camera/findListByName',
            params:{name:name}
        }).then(complete);

        function complete(res: ResponseResult<Array<CameraEx>>) {
            let arr = [] as Array<CameraEx>;
            if (res && res.code === 200 && res.data) {
                arr = res.data;
            }
            return arr;
        }
    }

    delete(models:Camera):Promise<any>{ 
        return this.$http({
            method: 'post',
            url: '/db/camera/delete',
            data:{id:models.ID}
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Device.code,
            OperThirdModule: OperThirdModule.BaseConfig_Device_Camera.code,
            ActionType: OperActionType.Del.code
        })).then(complete);
        function complete(res: ResponseResult<Array<CameraEx>>) {
            let arr = [] as Array<CameraEx>;
            if (res && res.code === 200 && res.data) {
                arr = res.data;
            }
            return arr;
        }
    }



    edit(models: Camera){
        return this.$http({
            method: 'post',
            url: '/db/camera/edit',
            data:models
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Device.code,
            OperThirdModule: OperThirdModule.BaseConfig_Device_Camera.code,
            ActionType: OperActionType.Modify.code
        }));
    }

    findLampTree(){
        return this.$http({
            method: 'get',
            url: '/db/area/findLampTreeWithCamera',
        }).then(complete);

        function complete(res: ResponseResult<Array<LampEx | AreaEx>>) {
            let arr = [] as Array<LampEx | AreaEx>;
            if (res && res.code === 200 && res.data) {
                arr = res.data;
            }
            return arr;
        }
    }
    findPlayerForID(id:string){
        return this.$http({
            method: 'post',
            url: '/db/camera/getPlayerInfoByID',
            data:{id:id}
        }).then(this.notifyFunc);
    }
}

app
    .service('cameraService', CameraService);