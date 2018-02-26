import {RoleParams, RoleDetailResult} from "../../../core/params/RoleParams";

declare var require: any;
import {app} from "../app/main.app";
import 'angular';
import {IDeleteById} from "../../../core/params/request/RequestParams";
import {ObjectType} from "../../../core/enum/ObjectType";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {UserRoleDataEx} from "../../../core/entity/ex/UserRoleDataEx";
import {IResponseNotifyFactory} from "../factory/response.notify.factory";
import "../factory/response.notify.factory";

import {OperFitstModule} from '../../../core/entity/OperFirstModule';
import {OperSecondModule} from '../../../core/entity/OperSecondModule';
import {OperThirdModule} from '../../../core/entity/OperThirdModule';
import {OperActionType} from '../../../core/entity/OperActionType';
import {ISystemLogFactory} from "../factory/SystemLog.factory";
import "../factory/SystemLog.factory";

declare let angular: any;


export interface IRoleService {
    getAllFunModule(): Promise<ResponseResult<any>>;

    /** create by zxq
     * @time: 2017-06-09 10:59:10
     * @params: roleId:string
     * @return: Array<UserRoleDataList>
     */
    getValidRoleDataListList(id: string): Promise<ResponseResult<any>>;

    getValidModuleList(id: string): Promise<ResponseResult<any>>;

    getCameraRoleDataList(id: string): Promise<ResponseResult<any>>;

    getBusinessLibRoleDataList(id: string): Promise<ResponseResult<any>>;

    findListByParams(params: RoleParams): Promise<ResponseResult<any>>;

    findDetail(roleID: string): Promise<ResponseResult<RoleDetailResult>>;

    addRole(params: RoleDetailResult): Promise<ResponseResult<any>>;

    updateRole(params: RoleDetailResult): Promise<ResponseResult<any>>;

    getDetail(id: string): Promise<ResponseResult<any>>;

    deleteById(id: string): Promise<ResponseResult<any>>;
}


class RoleService implements IRoleService {

    static $inject: Array<string> = ['$http', '$q', 'notifyFactory', 'systemLogFactory'];
    notifyFunc: (res: ResponseResult<any>) => ResponseResult<any>;

    constructor(private $http: any, private $q: any, private notifyFactory: IResponseNotifyFactory, private systemLogFactory: ISystemLogFactory) {
        this.notifyFunc = this.notifyFactory.msg({onlySuccess: true});
    }
    findDetail(roleID:string){
        return this.$http({
            method: 'get',
            params: {roleId:roleID},
            url: '/db/role/detail',
        })
    }
    //获取全部功能权限
    //moduleKey
    getAllFunModule ()  {
        return this.$http({
            method: 'post',
            //   params: _params,
            url: '/pdp/userrole/find/modules',
        })
    };

    getValidRoleDataListList (id: string)  {
        let _params = {
            roleId: id,
        };
        let deferred = this.$q.defer();

        this.$http({
            method: 'post',
            params: _params,
            url: "/pdp/userrole/find/userroledata",
        })
        //数据格式化
            .then((resp: ResponseResult<Array<UserRoleDataEx>>) => {
                if (resp && resp.code == 200 && resp.data && resp.data.length > 0) {
                    resp.data.forEach((val: UserRoleDataEx) => {
                        let _operateList;
                        try {
                            _operateList = JSON.parse(val.ObjectData);
                        } catch (e) {
                            _operateList = {}
                        }
                        if (_operateList && _operateList.RoleCommandList && _operateList.RoleCommandList.length > 0) {
                            val.operateList = _operateList.RoleCommandList;
                        } else {
                            val.operateList = [] as Array<string>;
                        }
                    })
                }
                deferred.resolve(resp);
            });
        return deferred.promise;
    };

    getValidModuleList (id: string)  {
        let _params = {
            roleId: id,
            objectType: ObjectType.Module.value
        };
        let deferred = this.$q.defer();

        this.$http({
            method: 'post',
            params: _params,
            url: "/pdp/userrole/find/userroledata",
        }).then((resp: ResponseResult<Array<UserRoleDataEx>>) => {
            if (resp && resp.code == 200 && resp.data && resp.data.length > 0) {
                resp.data.forEach((val: UserRoleDataEx) => {
                    let _operateList = JSON.parse(val.ObjectData);
                    if (_operateList && _operateList.RoleCommandList && _operateList.RoleCommandList.length > 0) {
                        val.operateList = _operateList.RoleCommandList;
                    } else {
                        val.operateList = new Array<string>();
                    }
                })
            }
            deferred.resolve(resp);
        });
        return deferred.promise;
    };
    getCameraRoleDataList (id: string)  {
        let _params = {
            roleId: id,
            objectType: ObjectType.Camera.value
        };
        return this.$http({
            method: 'post',
            params: _params,
            url: "/pdp/userrole/find/userroledata",
        });
    };
    getBusinessLibRoleDataList (id: string)  {
        let _params = {
            roleId: id,
            objectType: ObjectType.BusinessLib.value
        };
        let deferred = this.$q.defer();
        this.$http({
            method: 'post',
            params: _params,
            url: "/pdp/userrole/find/userroledata",
        }).then((resp: ResponseResult<Array<UserRoleDataEx>>) => {
            if (resp && resp.code == 200 && resp.data && resp.data.length > 0) {
                resp.data.forEach((val: UserRoleDataEx) => {
                    let _operateList = JSON.parse(val.ObjectData);
                    if (_operateList && _operateList.RoleCommandList && _operateList.RoleCommandList.length > 0) {
                        val.operateList = _operateList.RoleCommandList;
                    } else {
                        val.operateList = new Array<string>();
                    }
                })
            }
            deferred.resolve(resp);
        });
        return deferred.promise;
    };

    getDetail (id: string)  {
        let _params = {
            roleId: id,
            objectType: ObjectType.Module.value
        };
        return this.$http({
            method: 'post',
            params: _params,
            url: "/pdp/userrole/find/userroledata",
        })
    };

    findListByParams (params: RoleParams)  {
        return this.$http({
            method: "get",
            params: params,
            url: "/db/role/list",
        })
    };

    addRole (params: RoleDetailResult) {

        return this.$http({
            method: "post",
            data: params,
            showLoad:true,
            url: "/db/role/save",
        }).then(this.notifyFunc).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Base.code,
            OperThirdModule: OperThirdModule.BaseConfig_Base_Role.code,
            ActionType: OperActionType.Add.code
        }));
    };

    updateRole (params: RoleDetailResult)  {
        return this.$http({
            method: "post",
            data: params,
            showLoad:true,
            url: "/db/role/update",
        }).then(this.notifyFunc).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Base.code,
            OperThirdModule: OperThirdModule.BaseConfig_Base_Role.code,
            ActionType: OperActionType.Modify.code
        }));
    };

    deleteById (id: string) {
        let params: IDeleteById = {
            id: id
        };
        return this.$http({
            method: "post",
            data: params,
            url: "/db/role/delete",
        }).then(this.notifyFunc).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Base.code,
            OperThirdModule: OperThirdModule.BaseConfig_Base_Role.code,
            ActionType: OperActionType.Del.code
        }));
    };

}

app
    .service('roleService', RoleService);