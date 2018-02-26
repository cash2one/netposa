import { BusinessLibListParams, AreaAndBusinessListResult } from "../../../core/params/BusinessLibParams";

declare var require: any;
import { app } from "../app/main.app";
import 'angular';
import { BusinessLib } from "../../../core/entity/BusinessLib";
import {
    IFindByIdParams, IDeleteById,
    IDeleteByIds
} from "../../../core/params/request/RequestParams";

declare let angular: any;
import { ResponseResult } from "../../../core/params/result/ResponseResult";
import "../factory/response.notify.factory";
import { IResponseNotifyFactory } from "../factory/response.notify.factory";
import { BusinessLibEx } from "../../../core/entity/ex/BusinessLibEx";
import { OperFitstModule } from '../../../core/entity/OperFirstModule';
import { OperSecondModule } from '../../../core/entity/OperSecondModule';
import { OperThirdModule } from '../../../core/entity/OperThirdModule';
import { OperActionType } from '../../../core/entity/OperActionType';
import { ISystemLogFactory } from "../factory/SystemLog.factory";
import "../factory/SystemLog.factory";
import { AreaEx } from "../../../core/entity/ex/AreaEx";
import { UserRoleDataEx } from "../../../core/entity/ex/UserRoleDataEx";
import { IUserInfoCacheFactory } from '../factory/userinfo.cache.factory';
export interface IBusinessLibService {
    findById: (id: string) => Promise<ResponseResult<any>>;
    update: (params: BusinessLib) => Promise<ResponseResult<any>>;
    deleteById: (id: string) => Promise<ResponseResult<any>>;
    deleteByIds: (ids: Array<string>) => Promise<ResponseResult<any>>;
    save: (params: BusinessLib) => Promise<ResponseResult<any>>;
    /** create by zxq
     * 获取 人脸库 （无虚拟节点）
     * @time: 2017-07-12 20:52:48
     */
    findTreeWithArea: () => Promise<ResponseResult<any>>;
    /** create by zxq
     *  获取 人脸库 + 区域列表 （若有子库，包含本身)（有虚拟节点）
     * @time: 2017-06-06 20:56:13
     */
    findHasSelfTreeWithArea: (areaId?: string) => Promise<ResponseResult<AreaAndBusinessListResult>>;
    /** create by zxq
     * 获取 人脸库 （若有子库，包含本身) （有虚拟节点）
     * @time: 2017-06-06 20:56:13
     */
    findHasSelfTree: (areaId?: string) => Promise<ResponseResult<Array<BusinessLibEx>>>;
    /**
     *  获取人像库 人像数据
     * @time: 2017-08-15 19:08:37
     * @params: ids 人像库ids
     * @return:
     */
    findPersonCount: (ids: Array<string>) => Promise<ResponseResult<any>>;

    /**
     * 获取权限配置相关的人像库区域的树结构
     * @param {Array<string>} ids
     * @return {Promise<ResponseResult<Array<BusinessLibEx | AreaEx>>>}
     */
    findTreeAreaWithRole: () => Promise<ResponseResult<Array<UserRoleDataEx & BusinessLibEx & AreaEx>>>;
}

class BusinessLibService implements IBusinessLibService {

    static $inject: Array<string> = ['$http', 'notifyFactory', 'systemLogFactory', 'userInfoCacheFactory'];
    private notifyFunc: (res: ResponseResult<any>) => ResponseResult<any>;

    constructor(private $http: any, private notifyFactory: IResponseNotifyFactory, private systemLogFactory: ISystemLogFactory,
        private userInfoCacheFactory: IUserInfoCacheFactory) {
        this.$http = $http;
        this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
    }

    //查找 区域 人脸库综合树
    findTreeWithArea() {
        return this.$http({
            method: 'get',
            url: '/db/businessLib/findTreeWithArea'
        })
    };

    /** create by zxq
     *  查找包含 自身为子节点的 人脸库+区域综合树
     * @time: 2017-06-06 20:56:13
     * @params:
     * @return:
     */
    findHasSelfTreeWithArea(areaId?: string) {
        let params = {
            areaId: areaId
        };
        return this.$http({
            method: 'get',
            params: params,
            url: '/db/businessLib/findHasSelfTreeWithArea'
        })
    };

    /** create by zxq
     *  查找包含 自身为子节点的 人脸库 树
     * @time: 2017-06-06 20:56:13
     */
    findHasSelfTree(areaId?: string) {
        let params = {
            areaId: areaId
        };
        return this.$http({
            method: 'get',
            params: params,
            url: '/db/businessLib/findBusinessLibHasSelfTree'
        })
    };


    findById(id: string) {
        let _params: IFindByIdParams = {
            id: id
        };
        return this.$http({
            method: 'get',
            params: _params,
            url: '/db/businessLib/findById'
        })
    };

    update(params: BusinessLib) {
        let _params = params;
        return this.$http({
            method: 'post',
            headers: { 'Content-Type': 'application/json ;charset=utf-8' },
            url: '/db/businessLib/person/update',
            showLoad: true,
            data: JSON.stringify(_params)
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Resource.code,
            OperThirdModule: OperThirdModule.BaseConfig_Resource_FaceLib.code,
            ActionType: OperActionType.Modify.code
        }));
    };

    save(params: BusinessLib) {
        let _params = params;
        return this.$http({
            method: 'post',
            headers: { 'Content-Type': 'application/json ;charset=utf-8' },
            url: '/db/businessLib/person/save',
            showLoad: true,
            data: JSON.stringify({ ..._params, RoleID: this.userInfoCacheFactory.getRoleIds() })
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Resource.code,
            OperThirdModule: OperThirdModule.BaseConfig_Resource_FaceLib.code,
            ActionType: OperActionType.Add.code
        }));

    };

    deleteById(id: string) {
        let _params: any = {
            libIds: [id]
        };
        return this.$http({
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            url: '/pdp/businesslib/delete',
            showLoad: true,
            data: JSON.stringify(_params)
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Resource.code,
            OperThirdModule: OperThirdModule.BaseConfig_Resource_FaceLib.code,
            ActionType: OperActionType.Del.code
        }));
    };

    deleteByIds(ids: Array<string>) {
        let _params: any = {
            libIds: ids.join(",")
        };
        return this.$http({
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            // url: '/db/businessLib/deleteByIds',
            url: '/pdp/businesslib/delete',
            showLoad: true,
            params: _params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Resource.code,
            OperThirdModule: OperThirdModule.BaseConfig_Resource_FaceLib.code,
            ActionType: OperActionType.Del.code
        }));
    };

    findPersonCount(ids: Array<string>) {
        return this.$http({
            method: 'post',
            url: '/pdp/businesslib/statisticsperson',
            params: { libIds: ids.join(',') }
        })
    }
    findTreeAreaWithRole() {
        return this.$http({
            method: 'post',
            url: '/db/businessLib/findTreeAreaWithRole',
        })
    }
}

app
    .service('businessLibService', BusinessLibService);