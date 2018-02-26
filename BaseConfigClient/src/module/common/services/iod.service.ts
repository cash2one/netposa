/**
 * Created by dell on 2017/3/29.
 */
import {app} from "../app/main.app";
import {IodEx} from "../../../core/entity/ex/IodEx";
import {Iod} from "../../../core/entity/Iod";

import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {TreeParams} from "../../../core/params/tree/TreeParams";

import {IDeleteByIds} from "../../../core/params/request/RequestParams";
import {IResponseNotifyFactory} from "../factory/response.notify.factory";

import {OperFitstModule} from '../../../core/entity/OperFirstModule';
import {OperSecondModule} from '../../../core/entity/OperSecondModule';
import {OperThirdModule} from '../../../core/entity/OperThirdModule';
import {OperActionType} from '../../../core/entity/OperActionType';
import {ISystemLogFactory} from "../factory/SystemLog.factory";
import "../factory/SystemLog.factory";

export interface IIodService {
    save: (params?: Iod) => Promise<any>;
    edit: (params?: Iod) => Promise<any>;
    deleteById: (iod: Iod) => Promise<any>;
    deleteByIds: (ids: Array<string>) => Promise<any>;
    get: (id: string) => Promise<any>;
    findListTree: (params?: TreeParams) => Promise<any>;
    synchronize: (id: string) => Promise<any>;
    // findTableList: Function; // TODO 已不再使用
    //findIodCameraTree: (searchInput?: string)=> Promise<Array<IodEx | CameraEx>>;
}

class IodService implements IIodService {


    private $http: any;

    save(params: Iod): Promise<any> {

        return this.$http({
            method: "POST",
            url: "/db/iod/add",
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_IodServer.code,
            ActionType: OperActionType.Add.code
        }));
    };

    edit(params: Iod): Promise<any> {
        return this.$http({
            method: "POST",
            url: "/db/iod/update",
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_IodServer.code,
            ActionType: OperActionType.Modify.code
        }));
    };

    deleteById(iod: Iod): Promise<any> {
        return this.$http({
            method: "POST",
            url: "/db/iod/deleteById",
            data: {id: iod.ID}
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_IodServer.code,
            ActionType: OperActionType.Del.code
        }));
    };

    deleteByIds(ids: Array<string>): Promise<any> {
        let params: IDeleteByIds = {
            ids: ids
        };
        return this.$http({
            method: "POST",
            url: "/db/iod/deleteByIds",
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_IodServer.code,
            ActionType: OperActionType.Del.code
        }));
    };

    get(id: string): Promise<any> {
        return this.$http({
            method: "GET",
            url: "/db/iod/get",
            params: {id: id}
        })
    };

    /**
     *
     * @param params
     * @return Array<IIodEx>;
     * @exception [];
     */
    findListTree(params?: TreeParams): Promise<any> {
        return this.$http({
            method: "GET",
            url: "/db/iod/findAreaListTree",
            params: params,
        }).then(complete);

        function complete(res: ResponseResult<Array<IodEx>>) {
            // 这里进行数据转化, 赋值iconSkin属性
            let datas: Array<IodEx> = []; // 默认为空
            if (res && res.code === 200) {
                datas = res.data;
            }
            return datas;
        }
    };

    // TODO 没有任何页面使用
    // findTableList: Function = function (params: IodTableParams) {
    //     console.log("findTableList params", params);
    //     return this.$http({
    //         method: "GET",
    //         url: "/db/iod/findIodListByParams",
    //         params: params
    //     })
    // };
    synchronize(id: string): Promise<any> {
        return this.$http({
            method: "post",
            url: "/pdp/config/iod/syncIOD",
            params: {iodServerID: id},
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_IodServer.code,
            ActionType: OperActionType.Sync.code
        }));
    }

    static $inject: Array<string> = ['$http', 'notifyFactory', 'systemLogFactory'];
    private notifyFunc: (res: ResponseResult<any>) => ResponseResult<any>;

    constructor($http: any, notifyFactory: IResponseNotifyFactory, private systemLogFactory: ISystemLogFactory) {
        this.$http = $http;
        this.notifyFunc = notifyFactory.msg({onlySuccess: true});
    }
}

app
    .service('iodService', IodService);