import { app } from "../app/main.app";

// 服务
import '../factory/response.notify.factory';
import { IResponseNotifyFactory } from "../factory/response.notify.factory";
import "../factory/userinfo.cache.factory";
import { IUserInfoCacheFactory } from "../factory/userinfo.cache.factory";
import '../factory/SystemLog.factory';
import { ISystemLogFactory, AfterResponseCallBack, IPreSaveLogEx } from "../factory/SystemLog.factory";

// 参数
import { ResponseResult, PageResult } from '../../../core/params/result/ResponseResult';
import { OperFitstModule } from '../../../core/entity/OperFirstModule';
import { OperSecondModule } from '../../../core/entity/OperSecondModule';
import { OperThirdModule } from '../../../core/entity/OperThirdModule';
import { SearchVehicleModel } from '../../../core/params/SearchVehicleParams';
import { VehicleSubBrandModel } from '../../../core/server/VehicleSubBrandModel';
import { ResourceTypeEnum } from "../../../core/server/enum/ResourceType";

import { IAngularHttp, PreSystemLog } from "../interceptors/http";
import { OperActionType } from '../../../core/entity/OperActionType';
import { PVDictType } from '../../../core/server/enum/PVDictType';
import { PVDVehicleListModel } from '../../../core/server/PVDVehicleListModel';

let Promise = require('es6-promise');
declare let require: any, angular: any;

// 快速检索参数
interface QuickSearchParams {
    keyWord: string;
    objectType: string;
    currentPage: number;
    pageSize: number;
    orderBy: any;
    isFirstSearch?: boolean;
    [propName: string]: any;
}

// 高级检索Face参数
interface advancedParamsFace {
    [propName: string]: any;
}

// 高级检索wifi参数
interface advancedParamsWifi {
    [propName: string]: any;
}
// 高级检索电围参数
interface advancedParamsEFence {
    [propName: string]: any;
}

// 添加收藏参数
// TODO 此属性应该废弃, 换成CollectParams文件里的同名属性
export interface CollectAddParams {
    json: string;
    objectID: string;
    objectType: string;
    userId?: string;
}

// 删除收藏参数
// TODO 此属性应该废弃, 换成CollectParams文件里的同名属性
export interface CollectDeleteParams {
    ids: Array<string>
}


export interface IResourceRetrievalService {
    associateSearchByKeyWords(keyword: string): Promise<any>;
    quickSearchByKeyWords(params: QuickSearchParams): Promise<any>;
    advancedSearchByFace(params: advancedParamsFace): Promise<any>;
    advancedSearchByCar(params: any): Promise<any>;
    advancedSearchByCarEx(params: any): Promise<any>;
    advancedSearchByWifi(params: advancedParamsWifi): Promise<any>;
    advancedSearchByEFence(params: advancedParamsEFence): Promise<any>;
    getDeviceById(id: string, type: string): Promise<any>;
    uploadImage: (params: FormData) => any;
    uploadCarImage: (params: FormData) => any;
    collectAddInfo(params: CollectAddParams): Promise<string>;
    collectDeleteInfo(params: any): Promise<boolean>;
    findSystemPointById: (id: string) => Promise<any>;
    getPVDType(searchType: string): Promise<{ [key: string]: string; }>;
    getSubGrand(searchType: string): Promise<Array<VehicleSubBrandModel>>;
    findLampDeviceChildrenById: (params: any) => Promise<any>;
    searchLogById(params: advancedParamsFace): Promise<any>;
    searchQuickByPromise(params: QuickSearchParams): Promise<any>;
    getDeviceInfoPromise(params: advancedParamsFace): Promise<any>;
}

class ResourceRetrievalService implements IResourceRetrievalService {
    static $inject: Array<string> = ['$http', 'systemLogFactory', 'notifyFactory', 'userInfoCacheFactory'];
    private notifyFunc: (res: ResponseResult<any>) => ResponseResult<any>;
    private logFunc: IPreSaveLogEx;
    constructor(private $http: Function, private systemLogFactory: ISystemLogFactory, private notifyFactory: IResponseNotifyFactory, private userInfoCacheFactory: IUserInfoCacheFactory) {
        this.notifyFunc = notifyFactory.msg({ onlySuccess: true });
        this.logFunc = systemLogFactory.preSaveLogEx;
    }

    /**
     * @description 资源检索联想查询
     * @param {string} keyword
     */
    associateSearchByKeyWords(keyword: string) {
        return this.$http({
            method: 'get',
            dataType: 'json',
            url: '/db/resourceSearch/tips',
            params: {
                keyWords: keyword
            }
        });
    }

    /**
     * @description 快速检索
     * @param {QuickSearchParams} params
     */
    quickSearchByKeyWords(params: QuickSearchParams) {
        return this.$http({
            method: 'post',
            url: '/db/resourceSearch/quickSearchByKeyWords',
            data: params,
            timeout: 40 * 1000 // 耗时长 故设置40s
        }).then(
            this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFitstModule.ResourceRetrieval.code,
                OperSecondModule: OperSecondModule.ResourceRetrieval_FullSearch.code,
                OperThirdModule: '',
                ActionType: OperActionType.Add.code
            })
            );
    }

    /**
     * @description Face高级检索
     * @param {advancedParamsFace} params
     */
    advancedSearchByFace(params: advancedParamsFace) {
        return this.$http({
            method: 'post',
            url: '/pdp/search/advance/searchaccesslog',
            data: params
        }).then(
            this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFitstModule.ResourceRetrieval.code,
                OperSecondModule: OperSecondModule.ResourceRetrieval_AdvanceSearch.code,
                OperThirdModule: OperThirdModule.ResourceRetrieval_AdvanceSearch_Face.code,
                ActionType: OperActionType.View.code
            })
            )
    }

    /**
     * @description car快速检索以图搜索
     * @param {advancedParamsFace} params
     */
    advancedSearchByCar(params: SearchVehicleModel) {
        return this.$http({
            method: 'post',
            url: '/db/resourceSearch/searchCar',
            data: params
        }).then(
            this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFitstModule.ResourceRetrieval.code,
                OperSecondModule: OperSecondModule.ResourceRetrieval_AdvanceSearch.code,
                OperThirdModule: OperThirdModule.ResourceRetrieval_AdvanceSearch_Vehicle.code,
                ActionType: OperActionType.View.code
            })
            )
    }

    /**
     * @description 车辆高级检索
     * @param {SearchVehicleModel} params
     */
    advancedSearchByCarEx(params: SearchVehicleModel) {
        return this.$http({
            method: 'post',
            url: '/db/resourceSearch/advancedSearchCar',
            data: params
            // timeout: 30 * 1000,
            // showLoad: true
        }).then(
            this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFitstModule.ResourceRetrieval.code,
                OperSecondModule: OperSecondModule.ResourceRetrieval_AdvanceSearch.code,
                OperThirdModule: OperThirdModule.ResourceRetrieval_AdvanceSearch_Vehicle.code,
                ActionType: OperActionType.View.code
            })
            ).then((res: any) => {
                return res;
            });
    }

    /**
     * @description WIFI高级检索
     * @param {advancedParamsWifi} params
     */
    advancedSearchByWifi(params: advancedParamsWifi) {
        return this.$http({
            method: 'post',
            url: '/db/resourceSearch/searchWiFiByParams',
            data: params
        }).then(
            this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFitstModule.ResourceRetrieval.code,
                OperSecondModule: OperSecondModule.ResourceRetrieval_AdvanceSearch.code,
                OperThirdModule: OperThirdModule.ResourceRetrieval_AdvanceSearch_WiFi.code,
                ActionType: OperActionType.View.code
            })
            )
    }

    /**
     * @description EFence高级检索
     * @param {advancedParamsEFence} params
     */
    advancedSearchByEFence(params: advancedParamsEFence) {
        return this.$http({
            method: 'post',
            url: '/db/resourceSearch/searchEFenceByParams',
            data: params
        }).then(
            this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFitstModule.ResourceRetrieval.code,
                OperSecondModule: OperSecondModule.ResourceRetrieval_AdvanceSearch.code,
                OperThirdModule: OperThirdModule.ResourceRetrieval_AdvanceSearch_EFence.code,
                ActionType: OperActionType.View.code
            })
            )
    }

    /**
     * @description 获取车辆信息详情
     * @param {string} id
     */
    getCarDetailInfo(id: string) {
        return this.$http({
            method: 'get',
            dataType: 'json',
            url: '/db/resourceSearch/tips',
            params: {
                keyWords: id
            }
        });
    }

    /**
     * @description 获取地图设备信息
     * @param {string} id
     * @param {string} type
     */
    getDeviceById(id: string, type: string) {
        return this.$http({
            method: "post",
            url: "/db/resource/getDeviceById",
            data: { id: id, type: type }
        });
    }

    /**
     * @description 图片上传
     * @param {FormData} params
     */
    uploadImage(params: FormData) {
        return new Promise((resolve: any, reject: any) => {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', '/db/resourceSearch/checkFace', true);
            xhr.onreadystatechange = (ev) => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    resolve(JSON.parse(xhr.responseText))
                }
            };
            xhr.onerror = (err: any) => {
                reject(err)
            };
            xhr.send(params)
        })
    }

    /**
     * @description 图片上传
     * @param {FormData} params
     */
    uploadCarImage(params: FormData) {
        return new Promise((resolve: any, reject: any) => {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', '/db/resourceSearch/checkCar', true);
            xhr.onreadystatechange = (ev) => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    resolve(JSON.parse(xhr.responseText))
                }
            };
            xhr.onerror = (err: any) => {
                reject(err)
            };
            xhr.send(params)
        })
    }

    /**
     * @description添加收藏
     * @param {CollectAddParams} params
     */
    collectAddInfo(params: CollectAddParams) {
        let _params: CollectAddParams = angular.copy(params);
        _params.userId = this.userInfoCacheFactory.getCurrentUserId();
        return this.$http({
            method: 'post',
            url: '/db/collect/add',
            data: _params
        }).then(this.notifyFunc);
    }

    /**
     * @description删除收藏
     * @param {CollectDeleteParams} params
     */
    collectDeleteInfo(params: any) {
        return this.$http({
            method: 'post',
            url: '/db/collect/deleteByObjectId',
            data: params
        }).then(this.notifyFunc);
    }

    /**
     * @description 获取设备坐标
     * @param {string} id
     */
    findSystemPointById(id: string): Promise<any> {
        return this.$http({
            method: "GET",
            url: "/db/lamp/findSystemPointById",
            params: { id: id }
        })
    };

    /**
     * 获取pvd相关的数据类型, 如: 车辆颜色, 车牌类型等
     *
     */
    getPVDType(searchType: string): Promise<{ [key: string]: string; }> {
        return this.$http({
            url: "/pdp/commonCtrl/dictList/ByTypeFromPVD",
            method: "post",
            params: { dictType: searchType }
        }).then((res: ResponseResult<{ [key: string]: string; }>) => {
            return res;
        });
    }
    /**
     * 获取当前车牌的子车牌
     */
    getSubGrand(searchType: string) {
        return this.$http({
            url: "/pdp/vehicleCtrl/vehicle/getSubGrand",
            method: "get",
            params: { vehicleBrand: searchType }
        }).then((res: ResponseResult<Array<VehicleSubBrandModel>>) => {
            return res;
        });
    }

    /**
     * @description 获取地图设备信息
     * @param {string} id
     * @param {string} type
     */
    findLampDeviceChildrenById(params: any): Promise<any> {
        return this.$http({
            method: "get",
            url: "/db/lamp/findLampDeviceChildrenById",
            params: {
                id: params.id
            }
        });
    }

    /**
     * @description 获取人脸记录通用日志
     * @param {advancedParamsFace} params
     */
    searchLogById(params: advancedParamsFace) {
        return this.$http({
            method: 'post',
            url: '/pdp/search/log',
            data: params
        }).then(
            this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFitstModule.ResourceRetrieval.code,
                OperSecondModule: OperSecondModule.ResourceRetrieval_AdvanceSearch.code,
                OperThirdModule: OperThirdModule.ResourceRetrieval_AdvanceSearch_Face.code,
                ActionType: OperActionType.View.code
            })
            )
    }

    searchQuickByPromise(params: QuickSearchParams) {
        let self = this;
        let arr = [];
        let arrQyery = [];

        if (params.objectType === "All") {
            arr = [angular.copy(params), angular.copy(params), angular.copy(params), angular.copy(params), angular.copy(params), angular.copy(params), angular.copy(params), angular.copy(params)];
            arr[0].objectType = ResourceTypeEnum[2].value;
            arr[1].objectType = ResourceTypeEnum[1].value;
            arr[2].objectType = ResourceTypeEnum[5].value;
            arr[3].objectType = ResourceTypeEnum[7].value;
            arr[4].objectType = ResourceTypeEnum[10].value;
            arrQyery = [
                self.quickSearchByCommon(arr[0]),
                self.quickSearchByCommon(arr[1]),
                self.quickSearchByCommon(arr[2]),
                self.quickSearchByCommon(arr[3]),
                self.quickSearchByCommon(arr[4])
            ];
        } else {
            arr = [params];
            switch (params.objectType) {
                case ResourceTypeEnum[2].value:
                case ResourceTypeEnum[1].value:
                case ResourceTypeEnum[5].value:
                case ResourceTypeEnum[7].value:
                    arrQyery = [
                        self.quickSearchByCommon(arr[0])
                    ];
                    break;
            }
        }

        return Promise.all(arrQyery).then(function (res) {
            let resData: any;
            let newResult = new ResponseResult();
            newResult.code = 200;
            if (params.objectType === "All") {
                resData = {
                    Vehicle: res[0].Vehicle,
                    Face: res[1].Face,
                    WiFi: res[2].WiFi,
                    EFENCE: res[3].EFENCE
                };
                if (res[4].RmpGate) {
                    resData["DeviceRmpGate"] = {
                        Result: res[4].RmpGate,
                        TaskId: "",
                        TotalCount: res[4].RmpGate.length
                    };
                } else {
                    resData["DeviceRmpGate"] = {
                        Result: [],
                        TaskId: "",
                        TotalCount: 0
                    };
                }
                if (res[4].Camera) {
                    resData["DeviceCamera"] = {
                        Result: res[4].Camera,
                        TaskId: "",
                        TotalCount: res[4].Camera.length
                    };
                } else {
                    resData["DeviceCamera"] = {
                        Result: [],
                        TaskId: "",
                        TotalCount: 0
                    };
                }
                if (res[4].WiFi) {
                    resData["DeviceWiFi"] = {
                        Result: res[4].WiFi,
                        TaskId: "",
                        TotalCount: res[4].WiFi.length
                    };
                } else {
                    resData["DeviceWiFi"] = {
                        Result: [],
                        TaskId: "",
                        TotalCount: 0
                    };
                }
                if (res[4].EFENCE) {
                    resData["DeviceEFENCE"] = {
                        Result: res[4].EFENCE,
                        TaskId: "",
                        TotalCount: res[4].EFENCE.length
                    };
                } else {
                    resData["DeviceEFENCE"] = {
                        Result: [],
                        TaskId: "",
                        TotalCount: 0
                    };
                }
                newResult.count = resData.Vehicle.TotalCount + resData.Face.TotalCount + resData.WiFi.TotalCount + resData.EFENCE.TotalCount + resData.DeviceRmpGate.TotalCount + resData.DeviceCamera.TotalCount + resData.DeviceWiFi.TotalCount + resData.DeviceEFENCE.TotalCount;
            } else {
                resData = res[0];
                newResult.count = res[0][params.objectType].TotalCount
            }
            newResult.data = resData;

            return newResult;
        }, function (error) {
            console.log(error);
        }).then(
            this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFitstModule.ResourceRetrieval.code,
                OperSecondModule: OperSecondModule.ResourceRetrieval_FullSearch.code,
                OperThirdModule: '',
                ActionType: OperActionType.Add.code
            })
            ).then(
            this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFitstModule.ResourceRetrieval.code,
                OperSecondModule: OperSecondModule.ResourceRetrieval_FullSearch.code,
                OperThirdModule: 'Device',
                ActionType: OperActionType.Add.code
            })
            );
    }

    private quickSearchByCommon(params: QuickSearchParams) {
        return this.$http({
            method: 'post',
            url: '/pdp/search/quick/common',
            data: params,
        }).then(function (res) {
            if (res.code === 200) {
                return res.data;
            } else {
                let newRes: any = {};
                newRes[params.objectType] = {
                    Result: [],
                    TaskId: "",
                    TotalCount: 0
                };
                return newRes;
            }
        }, function (error) {
            let newRes: any = {};
            newRes[params.objectType] = {
                Result: [],
                TaskId: "",
                TotalCount: 0
            };
            return newRes;
        });
    }

    getDeviceInfoPromise(params: any) {
        let self = this;
        let arr = [];
        let param1: any = {
            ids: params.deviceIds,
            type: params.deviceType
        };
        let param2: any = {
            ids: params.ids,
            userId: params.userId
        };
        let arrQyery = [];

        arrQyery = [
            self.searchDeviceList(param1),
            self.findCollectStatus(param2)
        ];

        return Promise.all(arrQyery).then(function (res) {
            let resData: any;
            let newResult = new ResponseResult();
            newResult.code = 200;
            newResult.data = {
                deviceInfo: res[0].data || [],
                collectStatus: res[1].data || []
            };
            return newResult;
        }, function (error) {
            let resData: any;
            let newResult = new ResponseResult();
            newResult.code = 200;
            newResult.data = {
                deviceInfo: [],
                collectStatus: []
            };
            return newResult;
        });
    }

    private searchDeviceList(params: any) {
        return this.$http({
            method: 'post',
            url: '/db/resourceSearch/searchDevice',
            data: params
        });
    }

    private findCollectStatus(params: any) {
        return this.$http({
            method: 'post',
            url: '/db/collect/findCollectStatus',
            data: params
        });
    }
}
app
    .service('resourceRetrievalService', ResourceRetrievalService);