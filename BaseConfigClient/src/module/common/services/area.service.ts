/**
 * Created by dell on 2017/3/29.
 */
import {app} from "../app/main.app";
import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {Area} from "../../../core/entity/Area";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {TreeParams} from "../../../core/params/tree/TreeParams";
import {IDeleteByIds} from "../../../core/params/request/RequestParams";
import {IResponseNotifyFactory} from "../factory/response.notify.factory";

import '../factory/response.notify.factory';
import '../factory/SystemLog.factory';
import "../factory/userinfo.cache.factory";
import {ISystemLogFactory} from "../factory/SystemLog.factory";

import {OperFitstModule} from '../../../core/entity/OperFirstModule';
import {OperSecondModule} from '../../../core/entity/OperSecondModule';
import {OperThirdModule} from '../../../core/entity/OperThirdModule';
import {OperActionType} from '../../../core/entity/OperActionType';

export interface IAreaService {
    save(params?: Area): Promise<any>;

    edit(params?: AreaEx): Promise<any>;

    deleteById(area: Area): Promise<any>;

    deleteByIds(ids: Array<string>): Promise<any>;

    get(id: string): Promise<any>;

    findListTree (params?: TreeParams): Promise<any>;
}

class AreaService implements IAreaService {

    private $http: any;

    save(params: Area): Promise<any> {

        return this.$http({
            method: "POST",
            url: "/db/area/add",
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Base.code,
            OperThirdModule: OperThirdModule.BaseConfig_Base_Area.code,
            ActionType: OperActionType.Add.code
        }));
    };

    edit(params: AreaEx): Promise<any> {
        return this.$http({
            method: "POST",
            url: "/db/area/update",
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Base.code,
            OperThirdModule: OperThirdModule.BaseConfig_Base_Area.code,
            ActionType: OperActionType.Modify.code
        }));
    };

    deleteById(area: Area): Promise<any> {
        return this.$http({
            method: "POST",
            url: "/db/area/deleteById",
            data: {id: area.ID}
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Base.code,
            OperThirdModule: OperThirdModule.BaseConfig_Base_Area.code,
            ActionType: OperActionType.Del.code
        }));
    };

    deleteByIds(ids: Array<string>): Promise<any> {
        let params: IDeleteByIds = {
            ids: ids
        };
        return this.$http({
            method: "POST",
            url: "/db/area/deleteByIds",
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Base.code,
            OperThirdModule: OperThirdModule.BaseConfig_Base_Area.code,
            ActionType: OperActionType.Del.code
        }));
    };

    get(id: string): Promise<any> {
        return this.$http({
            method: "GET",
            url: "/db/area/get",
            params: {id: id}
        })
    };


    /**
     *
     * @param params
     * @return Array<IAreaEx>;
     * @exception [];
     */
    findListTree(params?: TreeParams): Promise<any> {
        return this.$http({
            method: "GET",
            url: "/db/area/findAreaListTree",
            params: params,
        }).then(complete);
    
        function complete(res: ResponseResult<Array<AreaEx>>) {
            // 这里进行数据转化, 赋值iconSkin属性
            let datas: Array<AreaEx> = []; // 默认为空
            if (res && res.code === 200) {
                datas = res.data;
            }
            return datas;
        }
    };

    static $inject: Array<string> = ['$http', 'notifyFactory', 'systemLogFactory', 'notifyFactory', 'userInfoCacheFactory', 'systemLogFactory'];
    private notifyFunc: (res: ResponseResult<any>) => ResponseResult<any>;

    constructor($http: any, notifyFactory: IResponseNotifyFactory, private systemLogFactory: ISystemLogFactory) {
        this.$http = $http;
        this.notifyFunc = notifyFactory.msg({onlySuccess: true});
    }
}

app
    .service('areaService', AreaService);