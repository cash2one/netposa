import {app} from "../app/main.app";
import {UnitEx} from "../../../core/entity/ex/UnitEx";
import {UnitListParams} from "../../../core/params/UnitParams";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {IResponseNotifyFactory} from "../factory/response.notify.factory";
import {OperFitstModule} from '../../../core/entity/OperFirstModule';
import {OperSecondModule} from '../../../core/entity/OperSecondModule';
import {OperThirdModule} from  '../../../core/entity/OperThirdModule';
import {OperActionType} from '../../../core/entity/OperActionType';
import {ISystemLogFactory} from "../factory/SystemLog.factory";
import "../factory/SystemLog.factory";
/**
 * Created by dell on 2017/4/13.
 */

export interface IUnitService{
    save: (params: UnitEx)=>any;
    edit: (params: UnitEx)=>any;
    get: (id: string)=>any;
    findTableList: (params: UnitListParams)=>any;
    findUnitTreeList: (areaId: string) => any;
    deleteByIds: (ids: Array<string>) => any;
    deleteById: (params: UnitEx)=> any;
}

class UnitService implements IUnitService {

    private $http: any;
    private notifyFunc:(res: ResponseResult<any>)=>ResponseResult<any>;

    save(params: UnitEx) {

        return this.$http({
            method: 'POST',
            url: "/db/unit/add",
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Base.code,
            OperThirdModule: OperThirdModule.BaseConfig_Base_Unit.code,
            ActionType: OperActionType.Add.code
        }));
    };
    edit (params: UnitEx) {
        return this.$http({
            method: 'POST',
            url: "/db/unit/update",
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Base.code,
            OperThirdModule: OperThirdModule.BaseConfig_Base_Unit.code,
            ActionType: OperActionType.Modify.code
        }));
    };
    deleteById (params: UnitEx) {
        return this.$http({
            method: 'POST',
            url: "/db/unit/delete",
            data: {id: params.ID}
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Base.code,
            OperThirdModule: OperThirdModule.BaseConfig_Base_Unit.code,
            ActionType: OperActionType.Del.code
        }));
    };
    deleteByIds (ids: Array<string>) {
        let params = {
            ids:ids
        } ;
        return this.$http({
            method: 'POST',
            url: "/db/unit/deleteByIds",
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Base.code,
            OperThirdModule: OperThirdModule.BaseConfig_Base_Unit.code,
            ActionType: OperActionType.Del.code
        }));
    };

    get (id: string) {
        return this.$http({
            method: "GET",
            url: "/db/unit/get",
            params: {id: id}
        })
    };
    findTableList (params: UnitListParams) {
        return this.$http({
            method: "GET",
            url: "/db/unit/findListByParams",
            params: params
        })
    };
    findUnitTreeList(areaId: string){
        return this.$http({
           method: "GET",
            url: "/db/unit/findUnitTreeList",
            params: {"areaId": areaId}
        }).then(complete);

        function complete(res: ResponseResult<Array<UnitEx>>) {
            let datas;
            if (res && res.code === 200) {
                datas = res.data;
            }
            return datas || [];
        }
    };

    static $inject: Array<string> = ['$http','notifyFactory','systemLogFactory'];

    constructor($http: any, notifyFactory: IResponseNotifyFactory,private systemLogFactory:ISystemLogFactory) {
        this.$http = $http;
        this.notifyFunc = notifyFactory.msg({onlySuccess: true});
    };
}

app.service('unitService', UnitService);