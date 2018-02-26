import {app} from "../app/main.app";
import {SystemPoint} from "../../../core/entity/SystemPoint";
import {HttpResponseResult, ResponseResult} from "../../../core/params/result/ResponseResult";
//import {MapOpts} from "../map/core/model/map.config.model";
import {MapConfigModel} from "../map/core/model/map.config.model";
import "../factory/response.notify.factory";
import {IResponseNotifyFactory} from "../factory/response.notify.factory";
import {MapBaseInfoModel} from "../../../core/server/MapBaseInfoModel";
//地图服务数据参数
import {MapConfigParameterExt} from "../../../core/entity/MapConfigParameter"
//图层管理参数
import {Layer} from "../../../core/entity/Layer"
import {OperFitstModule} from '../../../core/entity/OperFirstModule';
import {OperSecondModule} from '../../../core/entity/OperSecondModule';
import {OperThirdModule} from '../../../core/entity/OperThirdModule';
import {OperActionType} from '../../../core/entity/OperActionType';
import {ISystemLogFactory} from "../factory/SystemLog.factory";
import "../factory/SystemLog.factory";
import {IUserInfoCacheFactory} from "../factory/userinfo.cache.factory";
import  "../factory/userinfo.cache.factory";
export interface IMapService {
    // 设置热力图数据
    saveBaseInfo(model: MapBaseInfoModel): Promise<ResponseResult<null>>;

    // 获取图层类型信息列表(图层配置用)
    getBaseInfo(): Promise<ResponseResult<MapBaseInfoModel>>;

    // 根据图层类型获取点位信息(暂未使用)
    getSystemPointsByLayerType(layerType: string): any;

    // 根据对象类型获取点位信息(暂未使用)
    getSystemPointsByObjectType(objectType: string): any;

    // 根据systempoint id获取点位信息(暂未使用)
    getSystemPointById(id: string): any;

    // 根据systempoint 中objectid获取点位信息(暂未使用)
    getSystemPointByObjectId(objectId: string): any;

    // 保存点位信息 布点后调用
    saveOrUpdateSystemPoint(systemPoint: SystemPoint): any;

    // 获取所有点位信息
    getSystemPoints(): any;


    //获取地图服务信息
    getMapServerData(): any;

    //编辑地图服务信息
    editMapConfig(model: MapConfigParameterExt): Promise<ResponseResult<boolean>>;

    //获取图层管理列表
    getLayerInfo(): any

    //初始化地图
    getMapConfig(configName: string): any;

    //增加图层
    addLayerInfo(model: Layer): Promise<ResponseResult<boolean>>;

    //修改图层
    editLayerInfo(model: Layer): Promise<ResponseResult<boolean>>;

    //删除图层
    deleteLayerInfo(ID: string): Promise<ResponseResult<boolean>>;
}

class MapService implements IMapService {
    saveBaseInfo(model: MapBaseInfoModel): Promise<ResponseResult<any>> {
        return this.$http({
            method: "POST",
            url: "/db/systempoint/saveOrUpdateBaseInfo",
            data: model
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Resource.code,
            OperThirdModule: OperThirdModule.BaseConfig_Resource_MapResource.code,
            ActionType: OperActionType.Add.code
        }));
    }

    getBaseInfo(): Promise<ResponseResult<MapBaseInfoModel>> {
        return this.$http({
            method: "GET",
            url: "/db/systempoint/getBaseInfo"
        });
    }

    getSystemPointsByLayerType(layerType: string): any {
        return this.$http({
            method: "GET",
            url: "/db/systempoint/list/layertype",
            params: {layerType: layerType}
        });
    }

    getSystemPointsByObjectType(objectType: string): any {
        return this.$http({
            method: "GET",
            url: "/db/systempoint/list/objecttype",
            params: {objectType: objectType}
        });
    }

    getSystemPointById(id: string): any {
        return this.$http({
            method: "GET",
            url: "/db/systempoint/get",
            params: {id: id}
        });
    }

    getSystemPointByObjectId(objectId: string): any {
        return this.$http({
            method: "GET",
            url: "/db/systempoint/get/objectid",
            params: {objectId: objectId}
        });
    }

    saveOrUpdateSystemPoint(model: SystemPoint): any {
        return this.$http({
            method: "POST",
            url: "/db/systempoint/saveorupdate",
            data: model
        }).then(this.notifyFunc).then(
            this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule.BaseConfig_Resource.code,
                OperThirdModule: OperThirdModule.BaseConfig_Resource_MapResource.code,
                ActionType: OperActionType.Modify.code
            })
        );
    }

    getSystemPoints(): any {
        let roleId = this.userInfoCacheFactory.getRoleIds();
        console.log(11111,roleId)
        return this.$http({
            method: "GET",
            url: "/db/systempoint/list",
            params:{roleId:roleId}
        });
    }


    getMapServerData() {
        return this.$http({
            method: "GET",
            url: "/db/param/findMapConfig"
        })

    }

    editMapConfig(model: MapConfigParameterExt) {
        return this.$http({
            method: "POST",
            url: "/db/param/editMapConfig",
            data: model
        }).then(this.notifyFunc).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Resource.code,
            OperThirdModule: OperThirdModule.BaseConfig_Resource_MapResource.code,
            ActionType: OperActionType.Modify.code
        }));
    }

    getLayerInfo() {
        return this.$http({
            method: "GET",
            url: "/db/layer/findAllList",
        }).then(complete);

        function complete(res: any) {
            console.log("getMapConfig", res);
            let arr = [] as Array<Layer>;
            if (res && res.code === 200 && res.data) {

                arr = res.data;
            }
            return arr;
        }
    }

    addLayerInfo(model: Layer) {
        return this.$http({
            method: "POST",
            url: "/db/layer/add",
            data: model
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Resource.code,
            OperThirdModule: OperThirdModule.BaseConfig_Resource_MapResource.code,
            ActionType: OperActionType.Add.code
        })).then(complete);

        function complete(res: ResponseResult<null>) {
            console.log("addMapConfig", res);
            let arr = [] as Array<null>;
            if (res && res.code === 200 && res.data) {

                arr = res.data;
            }
            return arr;
        }
    }

    editLayerInfo(model: Layer) {
        return this.$http({
            method: "POST",
            url: "/db/layer/edit",
            data: model
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Resource.code,
            OperThirdModule: OperThirdModule.BaseConfig_Resource_MapResource.code,
            ActionType: OperActionType.Modify.code
        })).then(complete);

        function complete(res: ResponseResult<null>) {
            console.log("editMapConfig", res);
            let arr = [] as Array<null>;
            if (res && res.code === 200 && res.data) {

                arr = res.data;
            }
            return arr;
        }
    }

    deleteLayerInfo(ID: any) {
        return this.$http({
            method: "POST",
            url: "/db/layer/delete",
            data: ID
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Resource.code,
            OperThirdModule: OperThirdModule.BaseConfig_Resource_MapResource.code,
            ActionType: OperActionType.Del.code
        })).then(complete);

        function complete(res: ResponseResult<null>) {
            console.log("deleteMapConfig", res);
            let arr = [] as Array<null>;
            if (res && res.code === 200 && res.data) {

                arr = res.data;
            }
            return arr;
        }
    }

    getMapConfig(configName: string): any {
        return this.$http({
            method: "GET",
            url: "/mock/" + configName + "?v=" + new Date().getTime(),
            cache: true
        }).then(complete);

        function complete(res: HttpResponseResult<MapConfigModel>) {
            console.log("getMapConfig", res);
            return res.data;
        }
    }


    static $inject = ["$http", 'notifyFactory','systemLogFactory','userInfoCacheFactory'];

    private $http: any;
    private notifyFunc: (res: ResponseResult<any>) => ResponseResult<any>;

    constructor($http: any, notifyFactory: IResponseNotifyFactory,
                private systemLogFactory: ISystemLogFactory,
                private userInfoCacheFactory:IUserInfoCacheFactory) {
        this.$http = $http;
        this.notifyFunc = notifyFactory.msg({onlySuccess: true});
    }

}

app.service("mapService", MapService);
