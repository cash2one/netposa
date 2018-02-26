/**
 * Created by dell on 2017/3/29.
 */
import {app} from "../../common/app/main.app";
import {LampEx} from "../../../core/entity/ex/LampEx";
import {Lamp} from "../../../core/entity/Lamp";
import {CameraEx} from "../../../core/entity/ex/CameraEx";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {TreeParams} from "../../../core/params/tree/TreeParams";
import {IDeleteByIds} from "../../../core/params/request/RequestParams";
import {IResponseNotifyFactory} from "../factory/response.notify.factory";
import {RelationCol, Relation} from "../../../core/entity/DeviceRelation";
import {SearchCascadeModel} from "../../../core/server/SearchCascadeModel";
import {CasCadeSearchParams} from "../../../core/server/CasCadeSearchParams";
import {SystemPoint} from "../../../core/entity/SystemPoint";

import {OperFitstModule} from '../../../core/entity/OperFirstModule';
import {OperSecondModule} from '../../../core/entity/OperSecondModule';
import {OperThirdModule} from '../../../core/entity/OperThirdModule';
import {OperActionType} from '../../../core/entity/OperActionType';
import {ISystemLogFactory} from "../factory/SystemLog.factory";
import "../factory/SystemLog.factory";

export interface ILampService {
    save: (params?: Lamp)=>Promise<any>;
    edit: (params?: Lamp)=>Promise<any>;
    deleteById: (lamp: Lamp)=>Promise<any>;
    deleteByIds: (ids:Array<string>)=>Promise<any>;
    get: (id: string)=>Promise<any>;
    // updateLampWithDevice: (model:any)=>Promise<any>
    findDeviceListByID:(params:Array<string>)=>Promise<any>;
    // getLampDeviceRelation:(param: any)=>any;
    saveTheRalation:(param: Array<Relation>)=>Promise<any>
    findLampDeviceRelationById: (id: string)=>Promise<any>;
    findLampDeviceRelation: ()=>Promise<any>;
    deleteLampAndDeviceRelation: (ralation:Relation)=>Promise<any>;
    findSystemPoint:()=>Promise<any>;
    findSystemPointById:(id:string)=>Promise<any>;
    updataLampSystemPoint:(params:SystemPoint)=>Promise<any>;
}

class LampService implements ILampService {
    private $http: any;

    save(params: Lamp):Promise<any> {
        return this.$http({
            method: "POST",
            url: "/db/lamp/add",
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Device.code,
            OperThirdModule: OperThirdModule.BaseConfig_Device_Lamp.code,
            ActionType: OperActionType.Add.code
        }));
    };
    edit(params: Lamp):Promise<any> {
        return this.$http({
            method: "POST",
            url: "/db/lamp/update",
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Device.code,
            OperThirdModule: OperThirdModule.BaseConfig_Device_Lamp.code,
            ActionType: OperActionType.Modify.code
        }));
    };
    deleteById(lamp: Lamp):Promise<any> {
        return this.$http({
            method: "POST",
            url: "/db/lamp/deleteById",
            data: {id: lamp.ID}
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Device.code,
            OperThirdModule: OperThirdModule.BaseConfig_Device_Lamp.code,
            ActionType: OperActionType.Del.code
        }));
    };
    deleteByIds(ids:Array<string>):Promise<any> {
        let params:IDeleteByIds = {
            ids: ids
        };
        return this.$http({
            method: "POST",
            url: "/db/lamp/deleteByIds",
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Device.code,
            OperThirdModule: OperThirdModule.BaseConfig_Device_Lamp.code,
            ActionType: OperActionType.Del.code
        }));
    };
    get(id: string):Promise<any> {
        return this.$http({
            method: "GET",
            url: "/db/lamp/get",
            params: {id: id}
        })
    };          
    findDeviceListByID(params:Array<string>):Promise<any> {
        return this.$http({
            method: "GET",
            url: "/db/lamp/findDeviceListByID",
            params: params
        })
    };
    saveTheRalation(params:Array<Relation>):Promise<any> {
        return this.$http({
            method: "POST",
            url: "/db/lamp/saveTheRalation",
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Device.code,
            OperThirdModule: OperThirdModule.BaseConfig_Device_Lamp.code,
            ActionType: OperActionType.Modify.code
        }));
    };
    findLampDeviceRelationById(id:string):Promise<any> {
        return this.$http({
            method: "GET",
            url: "/db/lamp/findLampDeviceRelationById",
            params: {id: id}
        })
    };
    findLampDeviceRelation():Promise<any> {
        return this.$http({
            method: "GET",
            url: "/db/lamp/findLampDeviceRelation"
        })
    };
    deleteLampAndDeviceRelation(ralation:Relation):Promise<any> {
        return this.$http({
            method: "POST",
            url: "/db/lamp/deleteLampAndDeviceRelation",
            params: ralation
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Device.code,
            OperThirdModule: OperThirdModule.BaseConfig_Device_Lamp.code,
            ActionType: OperActionType.Modify.code
        }));
    };
    findSystemPoint():Promise<any> {
        return this.$http({
            method: "GET",
            url: "/db/lamp/findSystemPoint"
        })
    };
    findSystemPointById(id:string):Promise<any> {
        return this.$http({
            method: "GET",
            url: "/db/lamp/findSystemPointById",
            params: {id: id}
        })
    };
    updataLampSystemPoint(params:SystemPoint):Promise<any> {
        return this.$http({
            method: "POST",
            url: "/db/lamp/updataLampSystemPoint",
            params: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Device.code,
            OperThirdModule: OperThirdModule.BaseConfig_Device_Lamp.code,
            ActionType: OperActionType.Modify.code
        }));
    };
    static $inject: Array<string> = ['$http','notifyFactory','systemLogFactory'];
    private notifyFunc:(res: ResponseResult<any>)=>ResponseResult<any>;

    constructor($http: any, notifyFactory: IResponseNotifyFactory,private systemLogFactory:ISystemLogFactory) {
        this.$http = $http;
        this.notifyFunc = notifyFactory.msg({onlySuccess: true});
    }
}

app
    .service('lampService', LampService);