import {IResponseNotifyFactory} from "../factory/response.notify.factory";
import "../factory/response.notify.factory";
declare let require: any;
import {app} from "../app/main.app";
import 'angular';
import {ElectronicChangeAreaIDModel, ElectronicChangeCameraType} from "../../../core/params/ElectronicParams";
import {Electronic} from "../../../core/entity/Electronic";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {ElectronicFenceEx} from "../../../core/entity/ex/ElectronicFenceEx";
import { LampEx } from '../../../core/entity/ex/LampEx';
import {AreaEx} from '../../../core/entity/ex/AreaEx';
import './casecade.service';
import { CasCadeService } from './casecade.service';
import { Promise } from '../../../@types/es6-promise/index';
declare let angular: any;


export interface IElectronicService {
    // TODO 没有使用到的接口
    //findListByPage(params: CameraListParams): Promise<ResponseResult<any>>;
    findElectronicfenceList:(search?: string)=> Promise<Array<ElectronicFenceEx>>;
    findAll(): Promise<Array<Electronic>>;
    deleteById(models: Electronic):Promise<any>;
    create(models: Array<ElectronicChangeAreaIDModel>):Promise<ResponseResult<boolean>>;
    edit(models: Electronic):Promise<ResponseResult<boolean>>;
    updateElectronicAreaID(models: Array<ElectronicChangeAreaIDModel>):Promise<ResponseResult<boolean>>;
    updateCameraType(models: Array<ElectronicChangeCameraType>):Promise<ResponseResult<boolean>>;
    findLampTree():Promise<any>;
}

class ElectronicService implements IElectronicService {


    static $inject: Array<string> = ['$http','notifyFactory', 'casCadeService'];
    private notifyFunc:(res: ResponseResult<any>)=>ResponseResult<any>;

    constructor(private $http: Function, private notifyFactory: IResponseNotifyFactory, private casCadeService: CasCadeService) {
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
    updateElectronicAreaID(models: Array<ElectronicChangeAreaIDModel>): Promise<ResponseResult<boolean>> {
        return this.$http({
            method: 'POST',
            url: '/db/electronic/updateAreaForElectronicfence',
            data: models
        }).then(this.notifyFunc);
    }

     findAll(): Promise<Array<Electronic>> {

        return this.$http({
            method: 'get',
            url: '/db/camera/findAllList'
        }).then(complete);

        function complete(res: ResponseResult<Array<ElectronicFenceEx>>) {
            let arr = [] as Array<ElectronicFenceEx>;
            if (res && res.code === 200 && res.data) {
                arr = res.data;
            }
            return arr;
        }
    }

    

    updateCameraType(models: Array<ElectronicChangeCameraType>){
        return this.$http({
            method: 'post',
            url: '/db/camera/changeCameraType',
            data: models
        }).then(this.notifyFunc);
    }

   
    deleteById(models:Electronic):Promise<any>{ 
        return this.$http({
            method: 'post',
            url: '/db/electronic/delete',
            data:{id:models.ID}
        }).then(complete);

        function complete(res: ResponseResult<Array<ElectronicFenceEx>>) {
            let arr = [] as Array<ElectronicFenceEx>;
            if (res && res.code === 200 && res.data) {
                arr = res.data;
            }
            return arr;
        }
    }

    create(models: Array<ElectronicChangeAreaIDModel>){
        return this.$http({
            method: 'post',
            url: '/db/camera/create',
            data:models
        }).then(complete);

        function complete(res: ResponseResult<Array<ElectronicFenceEx>>) {
            let arr = [] as Array<ElectronicFenceEx>;
            if (res && res.code === 200 && res.data) {
                arr = res.data;
            }
            return arr;
        }
    }

    edit(models: Electronic){
        return this.$http({
            method: 'post',
            url: '/db/electronicfence/edit',
            data:models
        }).then(complete);

        function complete(res: ResponseResult<Array<ElectronicFenceEx>>) {
            let arr = [] as Array<ElectronicFenceEx>;
            if (res && res.code === 200 && res.data) {
                
                arr = res.data;
            }
            return arr;
        }
    }

    findLampTree(){
        return this.$http({
            method: 'get',
            url: '/db/area/findLampTree',
        }).then(complete);

        function complete(res: ResponseResult<Array<LampEx | AreaEx>>) {
            console.log(res)
            let arr = [] as Array<LampEx | AreaEx>;
            if (res && res.code === 200 && res.data) {
                arr = res.data;
                console.log("=========================>")
                console.log(arr)
            }
            return arr;
        }
    }
    

    // TODO 没有使用到的接口
    // findListByPage(params: CameraListParams) {
    //     let _params = params;
    //     return this.$http({
    //         method: 'get',
    //         params: _params,
    //         url: '/db/camera/findListByPage'
    //     })
    // };

}

app
    .service('electronicService', ElectronicService);