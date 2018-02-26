// import * as Promise from "promise";
import ResourceSearchDao from '../dao/ResourceSearchDao';
import ErrorCode from "../common/res/ErrorCode";
import {
    QuickSearchParams,
    SearchFaceParams,
    SearchMacParams,
    ResourceDeviceProcNames
} from "../core/params/ResourceSearchParams";
import {DetectFaceParams} from "../core/params/SearchFaceParams";
import {BackResponseBody} from "../core/params/result/ResponseResult";
import {ResourceTypeEnum, GetResourceType} from "../core/server/enum/ResourceType";
import {GetCameraType, CameraTypeEnum} from "../core/server/enum/CameraTypeEnum";
import {DateType} from "../core/enum/DateType";
import {DeviceResult, SearchFaceResult} from "../core/server/ResourceSearchResultModel";
import * as util from "util";
import {CollectService, ICollectService} from './CollectService'
import {BeanHelper} from '../common/help/BeanHelper';
import {DaoType} from '../dao/enum/DaoType';
import OtherDao from '../dao/OtherDao';
import {ProcedureParamStatement} from '../core/server/ProcedureParamStatement';
import {SearchVehicleModel} from '../core/params/SearchVehicleParams';
import {ObjectType} from "../core/enum/ObjectType";
import CameraExt from "../extend/Camera";
import * as _ from "lodash";
import DeviceExt from "../extend/Device";
import WiFiExt from "../extend/Wifi";
import RmpGateExt from "../extend/Rmpgate";
import ElectronicFenceExt from "../extend/ElectronicFence";

/**
 * 资源检索service.
 * create by zmp.
 * @time: 2017-08-23
 * modify by lv
 * @time: 2017-10-24
 */
export interface IResourceSearchService {

    // 检索关键字联想提示
    resourceSearchTips(keyWords: string): Promise<BackResponseBody<Array<string>>>;

    // 快速检索所有资源类型(车辆、人像、WiFi、电围、设备、位置)
    quickSearchByKeyWords(searchQuickParams: QuickSearchParams): Promise<BackResponseBody<any>>;

    // 人脸检测
    checkFace(files: object, commandType: string, detectType: string): Promise<BackResponseBody<any>>;

    // 车辆上传
    checkCar(files: object): Promise<BackResponseBody<any>>;

    // 人脸特征提取
    detectFace(detectFaceParams: DetectFaceParams): Promise<BackResponseBody<any>>;

    // 快速检索(人像)以图搜图
    searchFace(searchFaceParams: SearchFaceParams): Promise<BackResponseBody<Array<any>>>;

    // 快速检索(车辆)以图搜图
    searchCar(searchCarParams: any): Promise<BackResponseBody<Array<any>>>;

    // 高级检索
    advancedSearchCar(params: SearchVehicleModel): Promise<BackResponseBody<Array<any>>>;

    // 高级检索(WiFi)
    searchWiFiByParams(searchWiFiParams: SearchMacParams): Promise<BackResponseBody<any>>;

    // 高级检索(电子围栏)
    searchEFenceByParams(searchEFenceParams: SearchMacParams): Promise<BackResponseBody<any>>;

    //添加收藏状态
    //addCollectState(data: any): any
    searchDevice(params: { ids: Array<string>, type: string }): Promise<BackResponseBody<any>>;

}

export class ResourceSearchService implements IResourceSearchService {
    private static CollectService: ICollectService = new CollectService();

    public static addCollectState(quickSearchParams: QuickSearchParams) {
        let userID = quickSearchParams.userId;
        return ResourceSearchService.CollectService.findListAll({userID: userID})
    }

    async searchDevice(params: { ids: Array<string>, type: string }) {
        if (!params.type || !params.ids || !Array.isArray(params.ids) || params.ids.length === 0) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM)
        }
        let res = new BackResponseBody<Array<any>>();
        res.code = ErrorCode.OK;
        res.data = [];
        if (params.type === ObjectType.Camera.value) {
            let result = await Promise.all([
                DeviceExt.findSystemPointForMap(),
                CameraExt.getCameraForMap()
            ]);
            params.ids.forEach((id: string) => {
                if (result[1][id]) {
                    let camera = _.cloneDeep(result[1][id]);
                    camera.JsonUserData = {};
                    camera.JsonUserData.Point = result[0][id] ? result[0][id] : {};
                    res.data.push(camera)
                }else{
                    res.data.push({})
                }
            });
            return res;
        }

        if (params.type === ObjectType.Wifi.value) {
            let result = await Promise.all([
                DeviceExt.findSystemPointForMap(),
                WiFiExt.getWifiListForMap()
            ]);
            params.ids.forEach((id: string) => {
                if (result[1][id]) {
                    let wifi = _.cloneDeep(result[1][id]);
                    wifi.JsonUserData = {};
                    wifi.JsonUserData.Point = result[0][id] ? result[0][id] : {};
                    res.data.push(wifi)
                }else{
                    res.data.push({})
                }
            });
            return res;
        }
        if (params.type === ObjectType.ElectronicFence.value) {
            let result = await Promise.all([
                DeviceExt.findSystemPointForMap(),
                ElectronicFenceExt.getEfenceListForMap()
            ]);
            params.ids.forEach((id: string) => {
                if (result[1][id]) {
                    let efence = _.cloneDeep(result[1][id]);
                    efence.JsonUserData = {};
                    efence.JsonUserData.Point = result[0][id] ? result[0][id] : {};
                    res.data.push(efence)
                }else{
                    res.data.push({})
                }
            });
            return res;
        }
        if (params.type === ObjectType.RmpGate.value) {
            let result = await Promise.all([
                DeviceExt.findSystemPointForMap(),
                RmpGateExt.getRmpGateForMap()
            ]);
            params.ids.forEach((id: string) => {
                if (result[1][id]) {
                    let rmpGate = _.cloneDeep(result[1][id]);
                    rmpGate.JsonUserData = {};
                    rmpGate.JsonUserData.Point = result[0][id] ? result[0][id] : {};
                    res.data.push(rmpGate)
                }else{
                    res.data.push({})
                }
            });
            return res;
        }

    }

    resourceSearchTips(keyWords: string): Promise<BackResponseBody<Array<string>>> {
        return Promise.resolve(null)
            .then<number | null>(validateParams)
            .then(() => {
                return BeanHelper.getDao<ResourceSearchDao>(DaoType.ResourceSearchDao).resourceSearchTips(keyWords);
            });

        function validateParams() {
            // 检验搜索文本是否为空
            if (!keyWords) {
                return Promise.reject(ErrorCode.ERROR_NO_PARAM);
            }
            return null;
        }
    }

    //快速检索车辆
    public static quickSearchCar(quickSearchParams: QuickSearchParams): Promise<BackResponseBody<any>> {
        return Promise.resolve(null).then(() => {
            if (quickSearchParams) {
                quickSearchParams.objectType = ResourceTypeEnum[2].value;
                return BeanHelper.getDao<ResourceSearchDao>(DaoType.ResourceSearchDao).quickSearchByKeyWords(quickSearchParams);
            } else {
                return null
            }
        })
    }

    //快速检索人像
    public static quickSearchFace(quickSearchParams: QuickSearchParams): Promise<BackResponseBody<any>> {
        return Promise.resolve(null).then(() => {
            if (quickSearchParams) {
                quickSearchParams.objectType = ResourceTypeEnum[1].value;
                return BeanHelper.getDao<ResourceSearchDao>(DaoType.ResourceSearchDao).quickSearchByKeyWords(quickSearchParams);
            } else {
                return null
            }
        })
    }

    //快速检索wifi
    public static quickSearchWifi(quickSearchParams: QuickSearchParams): Promise<BackResponseBody<any>> {
        return Promise.resolve(null).then(() => {
            if (quickSearchParams) {
                quickSearchParams.objectType = ResourceTypeEnum[5].value;
                return BeanHelper.getDao<ResourceSearchDao>(DaoType.ResourceSearchDao).quickSearchByKeyWords(quickSearchParams);
            } else {
                return null
            }
        })
    }

    //快速检索电围
    public static quickSearchEfence(quickSearchParams: QuickSearchParams): Promise<BackResponseBody<any>> {
        return Promise.resolve(null).then(() => {
            if (quickSearchParams) {
                quickSearchParams.objectType = ResourceTypeEnum[7].value;
                return BeanHelper.getDao<ResourceSearchDao>(DaoType.ResourceSearchDao).quickSearchByKeyWords(quickSearchParams);
            } else {
                return null;
            }
        })
    }

    //快速检索设备信息 - camera
    public static quickSearchDeviceCamera(quickSearchParams: QuickSearchParams): Promise<BackResponseBody<any>> {
        return Promise.resolve(null).then(() => {
            let procedureParams = {} as ProcedureParamStatement;
            procedureParams.ProcName = ResourceDeviceProcNames.CameraDeviceSearchProcName.value;
            procedureParams.JsonProcParams = [quickSearchParams.keyWord];
            return BeanHelper.getDao<OtherDao>(DaoType.OtherDao).callProcedureWithPage(procedureParams, quickSearchParams.currentPage, quickSearchParams.pageSize);
        })
    }

    //快速检索设备信息 - wifi
    public static quickSearchDeviceWifi(quickSearchParams: QuickSearchParams): Promise<BackResponseBody<any>> {
        return Promise.resolve(null).then(() => {
            let procedureParams = {} as ProcedureParamStatement;
            procedureParams.ProcName = ResourceDeviceProcNames.WiFiDeviceSearchProcName.value;
            procedureParams.JsonProcParams = [quickSearchParams.keyWord];
            return BeanHelper.getDao<OtherDao>(DaoType.OtherDao).callProcedureWithPage(procedureParams, quickSearchParams.currentPage, quickSearchParams.pageSize);
        })
    }

    //快速检索设备信息 - 电围
    public static quickSearchDeviceEfence(quickSearchParams: QuickSearchParams): Promise<BackResponseBody<any>> {
        return Promise.resolve(null).then(() => {
            let procedureParams = {} as ProcedureParamStatement;
            procedureParams.ProcName = ResourceDeviceProcNames.EFenceDeviceSearchProcName.value;
            procedureParams.JsonProcParams = [quickSearchParams.keyWord];
            return BeanHelper.getDao<OtherDao>(DaoType.OtherDao).callProcedureWithPage(procedureParams, quickSearchParams.currentPage, quickSearchParams.pageSize);
        })
    }

    //快速检索设备信息 - 卡口
    public static quickSearchDeviceRmpgate(quickSearchParams: QuickSearchParams): Promise<BackResponseBody<any>> {
        return Promise.resolve(null).then(() => {
            let procedureParams = {} as ProcedureParamStatement;
            procedureParams.ProcName = ResourceDeviceProcNames.RmpGateDeviceSearchProcName.value;
            procedureParams.JsonProcParams = [quickSearchParams.keyWord];
            return BeanHelper.getDao<OtherDao>(DaoType.OtherDao).callProcedureWithPage(procedureParams, quickSearchParams.currentPage, quickSearchParams.pageSize);
        })
    }

    public static formatAllResource(arr: any) {
        if (!arr) {
            return
        }
        let Collect: { [key: string]: number } = {};
        if (arr['Collect'] && arr['Collect'].data && arr['Collect'].data.length > 0) {
            arr['Collect'].data.map((item: any) => {
                Collect[item.ObjectID] = 1
            })
        }
        let rep = new BackResponseBody<any>(),
            code = 200 as number,
            status = "" as string,
            deviceResData = {} as { [ket: string]: any },
            resultData = {} as { [key: string]: any },
            count = 0 as number;
        if (arr['Vehicle'] && arr['Vehicle'].data) {
            let vehicleResultData = {} as { [key: string]: any };
            if (arr['Vehicle'].code === 200) {
                vehicleResultData.TotalCount = arr['Vehicle'].data.Vehicle.TotalCount;
                count += vehicleResultData.TotalCount;
                vehicleResultData.TaskId = arr['Vehicle'].data.Vehicle.TaskId;
                if (Collect) {
                    arr['Vehicle'].data.Vehicle.Result ? "" : arr['Vehicle'].data.Vehicle.Result = [];
                    for (let i = 0; i < arr['Vehicle'].data.Vehicle.Result.length; i++) {
                        if (Collect[arr['Vehicle'].data.Vehicle.Result[i].id]) {
                            arr['Vehicle'].data.Vehicle.Result[i]['collectStatus'] = true;
                        } else {
                            arr['Vehicle'].data.Vehicle.Result[i]['collectStatus'] = false;
                        }
                    }
                }
                vehicleResultData.Result = arr['Vehicle'].data.Vehicle.Result || [];
            } else {
                vehicleResultData.TotalCount = 0;
                vehicleResultData.TaskId = "";
                vehicleResultData.Result = [];
            }
            vehicleResultData.code = arr['Vehicle'].code;
            vehicleResultData.status = arr['Vehicle'].status;
            resultData[ResourceTypeEnum[2].value] = vehicleResultData;
        }
        if (arr['Face'] && arr['Face'].data) {
            let faceResultData = {} as { [key: string]: any };
            if (arr['Face'].code === 200) {
                faceResultData.TotalCount = arr['Face'].data.Face.TotalCount;
                count += faceResultData.TotalCount;
                faceResultData.TaskId = arr['Face'].data.Face.TaskId;
                if (Collect) {
                    for (let i = 0; i < arr['Face'].data.Face.Result.length; i++) {
                        if (Collect[arr['Face'].data.Face.Result[i].AccessLog.ID]) {
                            arr['Face'].data.Face.Result[i]['collectStatus'] = true;
                        } else {
                            arr['Face'].data.Face.Result[i]['collectStatus'] = false;
                        }
                    }
                }
                faceResultData.Result = arr['Face'].data.Face.Result || [];
            } else {
                faceResultData.TotalCount = 0;
                faceResultData.TaskId = "";
                faceResultData.Result = [];
            }
            faceResultData.code = arr['Face'].code;
            faceResultData.status = arr['Face'].status;
            resultData[ResourceTypeEnum[1].value] = faceResultData;
        }
        if (arr['WiFi'] && arr['WiFi'].data) {
            let wifiResultData = {} as { [key: string]: any };
            if (arr['WiFi'].code === 200) {
                wifiResultData.TotalCount = arr['WiFi'].data.WiFi.TotalCount;
                count += wifiResultData.TotalCount;
                wifiResultData.TaskId = arr['WiFi'].data.WiFi.TaskId;
                if (Collect) {
                    for (let i = 0; i < arr['WiFi'].data.WiFi.Result.length; i++) {
                        if (Collect[arr['WiFi'].data.WiFi.Result[i].wifiLog.ID]) {
                            arr['WiFi'].data.WiFi.Result[i]['collectStatus'] = true;
                        } else {
                            arr['WiFi'].data.WiFi.Result[i]['collectStatus'] = false;
                        }
                    }
                }
                wifiResultData.Result = arr['WiFi'].data.WiFi.Result || [];
            } else {
                wifiResultData.TotalCount = 0;
                wifiResultData.TaskId = "";
                wifiResultData.Result = [];
            }
            wifiResultData.code = arr['WiFi'].code;
            wifiResultData.status = arr['WiFi'].status;
            resultData[ResourceTypeEnum[5].value] = wifiResultData;
        }
        if (arr['EFENCE'] && arr['EFENCE'].data) {
            let efenceResultData = {} as { [key: string]: any };
            if (arr['EFENCE'].code === 200) {
                efenceResultData.TotalCount = arr['EFENCE'].data.EFENCE.TotalCount;
                count += efenceResultData.TotalCount;
                efenceResultData.TaskId = arr['EFENCE'].data.EFENCE.TaskId;
                if (Collect) {
                    for (let i = 0; i < arr['EFENCE'].data.EFENCE.Result.length; i++) {
                        if (Collect[arr['EFENCE'].data.EFENCE.Result[i].eFenceLog.ID]) {
                            arr['EFENCE'].data.EFENCE.Result[i]['collectStatus'] = true;
                        } else {
                            arr['EFENCE'].data.EFENCE.Result[i]['collectStatus'] = false;
                        }
                    }
                }
                efenceResultData.Result = arr['EFENCE'].data.EFENCE.Result || [];
            } else {
                efenceResultData.TotalCount = 0;
                efenceResultData.TaskId = "";
                efenceResultData.Result = [];
            }
            efenceResultData.code = arr['EFENCE'].code;
            efenceResultData.status = arr['EFENCE'].status;
            resultData[ResourceTypeEnum[7].value] = efenceResultData;
        }
        if (arr['DeviceCamera'] && arr['DeviceCamera'].data.Result.length > 0) {
            let deviceResultObj = {} as { [key: string]: any };
            if (arr['DeviceCamera'].code === 200) {
                let cameraResultlList: any = ResourceSearchService.convertDeviceResultList(arr['DeviceCamera'].data.Result[0].RowList, ResourceTypeEnum[10].value);
                deviceResultObj.TotalCount = arr['DeviceCamera'].data.TotalCount;
                count += deviceResultObj.TotalCount;
                if (Collect && cameraResultlList) {
                    for (let i = 0; i < cameraResultlList.length; i++) {
                        if (Collect[cameraResultlList[i].Id]) {
                            cameraResultlList[i]['collectStatus'] = true;
                        } else {
                            cameraResultlList[i]['collectStatus'] = false;
                        }
                    }
                }
                deviceResultObj.Result = cameraResultlList || [];
            } else {
                deviceResultObj.TotalCount = 0;
                deviceResultObj.Result = [];
            }
            deviceResultObj.code = arr['DeviceCamera'].code;
            deviceResultObj.status = arr['DeviceCamera'].status;
            deviceResData[ResourceTypeEnum[3].value] = deviceResultObj;
        }
        if (arr['DeviceWiFi'] && arr['DeviceWiFi'].data.Result.length > 0) {
            let deviceResultObj = {} as { [key: string]: any };
            if (arr['DeviceWiFi'].code === 200) {
                let wifiResultList: any = ResourceSearchService.convertDeviceResultList(arr['DeviceWiFi'].data.Result[0].RowList, ResourceTypeEnum[5].value);
                deviceResultObj.TotalCount = arr['DeviceWiFi'].data.TotalCount;
                count += deviceResultObj.TotalCount;
                if (Collect && wifiResultList) {
                    for (let i = 0; i < wifiResultList.length; i++) {
                        if (Collect[wifiResultList[i].Id]) {
                            wifiResultList[i]['collectStatus'] = true;
                        } else {
                            wifiResultList[i]['collectStatus'] = false;
                        }
                    }
                }
                deviceResultObj.Result = wifiResultList || [];
            } else {
                deviceResultObj.TotalCount = 0;
                deviceResultObj.Result = [];
            }
            deviceResultObj.code = arr['DeviceWiFi'].code;
            deviceResultObj.status = arr['DeviceWiFi'].status;
            deviceResData[ResourceTypeEnum[5].value] = deviceResultObj;
        }
        if (arr['DeviceEFENCE'] && arr['DeviceEFENCE'].data.Result.length > 0) {
            let deviceResultObj = {} as { [key: string]: any };
            if (arr['DeviceEFENCE'].code === 200) {
                let electronicFenceResultList: any = ResourceSearchService.convertDeviceResultList(arr['DeviceEFENCE'].data.Result[0].RowList, ResourceTypeEnum[7].value);
                deviceResultObj.TotalCount = arr['DeviceEFENCE'].data.TotalCount;
                count += deviceResultObj.TotalCount;
                if (Collect && electronicFenceResultList) {
                    for (let i = 0; i < electronicFenceResultList.length; i++) {
                        if (Collect[electronicFenceResultList[i].Id]) {
                            electronicFenceResultList[i]['collectStatus'] = true;
                        } else {
                            electronicFenceResultList[i]['collectStatus'] = false;
                        }
                    }
                }
                deviceResultObj.Result = electronicFenceResultList || [];
            } else {
                deviceResultObj.TotalCount = 0;
                deviceResultObj.Result = [];
            }
            deviceResultObj.code = arr['DeviceEFENCE'].code;
            deviceResultObj.status = arr['DeviceEFENCE'].status;
            deviceResData[ResourceTypeEnum[7].value] = deviceResultObj;
        }
        if (arr['DeviceRmpGate'] && arr['DeviceRmpGate'].data.Result.length > 0) {
            let deviceResultObj = {} as { [key: string]: any };
            if (arr['DeviceRmpGate'].code === 200) {
                let rmpGateResultList: any = ResourceSearchService.convertDeviceResultList(arr['DeviceRmpGate'].data.Result[0].RowList, ResourceTypeEnum[8].value);
                deviceResultObj.TotalCount = arr['DeviceRmpGate'].data.TotalCount;
                count += deviceResultObj.TotalCount;
                if (Collect && rmpGateResultList) {
                    for (let i = 0; i < rmpGateResultList.length; i++) {
                        if (Collect[rmpGateResultList[i].Id]) {
                            rmpGateResultList[i]['collectStatus'] = true;
                        } else {
                            rmpGateResultList[i]['collectStatus'] = false;
                        }
                    }
                }
                deviceResultObj.Result = rmpGateResultList || [];
            } else {
                deviceResultObj.TotalCount = 0;
                deviceResultObj.Result = [];
            }
            deviceResultObj.code = arr['DeviceRmpGate'].code;
            deviceResultObj.status = arr['DeviceRmpGate'].status;
            deviceResData[ResourceTypeEnum[8].value] = deviceResultObj;
        }
        if (deviceResData) {
            resultData['device'] = deviceResData
        }
        rep.code = code;
        rep.status = status;
        rep.data = resultData;
        rep.count = count;
        return rep;
    }

    /**
     * @title 快速检索
     * @param quickSearchParams
     * @returns {Promise<>}
     * @update lb
     * @time  2017-10-24
     */
    async quickSearchByKeyWords(quickSearchParams: QuickSearchParams): Promise<any> {
        if (quickSearchParams.objectType == 'All') {
            let arr: any = [
                ResourceSearchService.quickSearchFace(quickSearchParams),
                ResourceSearchService.quickSearchWifi(quickSearchParams),
                ResourceSearchService.quickSearchEfence(quickSearchParams),
                ResourceSearchService.quickSearchDeviceCamera(quickSearchParams),
                ResourceSearchService.quickSearchDeviceWifi(quickSearchParams),
                ResourceSearchService.quickSearchDeviceEfence(quickSearchParams),
                ResourceSearchService.quickSearchDeviceRmpgate(quickSearchParams),
                ResourceSearchService.addCollectState(quickSearchParams),
                ResourceSearchService.quickSearchCar(quickSearchParams),
            ];
            // return Promise.all(arr).then((res:Array<BackResponseBody<any>>) => {
            //     return ResourceSearchService.formatResource(res);
            // })
            let promiseResultArray: any = await Promise.all(arr);
            let allResource: any = {
                Face: promiseResultArray[0],
                WiFi: promiseResultArray[1],
                EFENCE: promiseResultArray[2],
                DeviceCamera: promiseResultArray[3],
                DeviceWiFi: promiseResultArray[4],
                DeviceEFENCE: promiseResultArray[5],
                DeviceRmpGate: promiseResultArray[6],
                Collect: promiseResultArray[7],
                Vehicle: promiseResultArray[8],
            };
            return ResourceSearchService.formatAllResource(allResource)
        }
        if (quickSearchParams.objectType == ResourceTypeEnum[1].value) {
            let Arr: any = [ResourceSearchService.quickSearchFace(quickSearchParams), ResourceSearchService.addCollectState(quickSearchParams)
            ];
            let arr: any = await Promise.all(Arr);
            let resource: any = {
                Face: arr[0],
                Collect: arr[1]
            };
            return ResourceSearchService.formatAllResource(resource)
        }

        if (quickSearchParams.objectType == ResourceTypeEnum[2].value) {
            let Arr: any = [ResourceSearchService.quickSearchCar(quickSearchParams), ResourceSearchService.addCollectState(quickSearchParams)
            ];
            let arr: any = await Promise.all(Arr);
            let resource: any = {
                Vehicle: arr[0],
                Collect: arr[1]
            };
            return ResourceSearchService.formatAllResource(resource)
        }

        if (quickSearchParams.objectType == ResourceTypeEnum[5].value) {
            let Arr: any = [ResourceSearchService.quickSearchWifi(quickSearchParams), ResourceSearchService.addCollectState(quickSearchParams)
            ]
            let arr: any = await Promise.all(Arr);
            let resource: any = {
                WiFi: arr[0],
                Collect: arr[1]
            };
            return ResourceSearchService.formatAllResource(resource)
        }

        if (quickSearchParams.objectType == ResourceTypeEnum[7].value) {
            let Arr: any = [ResourceSearchService.quickSearchEfence(quickSearchParams), ResourceSearchService.addCollectState(quickSearchParams)
            ]
            let arr: any = await Promise.all(Arr);
            let resource: any = {
                EFENCE: arr[0],
                Collect: arr[1]
            };
            return ResourceSearchService.formatAllResource(resource)
        }
        if (quickSearchParams.objectType == ResourceTypeEnum[10].value) {
            let Arr: any = [ResourceSearchService.quickSearchDeviceCamera(quickSearchParams), ResourceSearchService.addCollectState(quickSearchParams)
            ]
            let arr: any = await Promise.all(Arr);
            let resource: any = {
                DeviceCamera: arr[0],
                Collect: arr[1]
            };

            return ResourceSearchService.formatAllResource(resource)
        }
        if (quickSearchParams.objectType == ResourceTypeEnum[11].value) {
            let Arr: any = [ResourceSearchService.quickSearchDeviceWifi(quickSearchParams), ResourceSearchService.addCollectState(quickSearchParams)
            ]
            let arr: any = await Promise.all(Arr);
            let resource: any = {
                DeviceWiFi: arr[0],
                Collect: arr[1]
            };
            return ResourceSearchService.formatAllResource(resource)
        }
        if (quickSearchParams.objectType == ResourceTypeEnum[12].value) {
            let Arr: any = [ResourceSearchService.quickSearchDeviceRmpgate(quickSearchParams), ResourceSearchService.addCollectState(quickSearchParams)
            ]
            let arr: any = await Promise.all(Arr);
            let resource: any = {
                DeviceRmpGate: arr[0],
                Collect: arr[1]
            };
            return ResourceSearchService.formatAllResource(resource)
        }

        if (quickSearchParams.objectType == ResourceTypeEnum[13].value) {
            let Arr: any = [ResourceSearchService.quickSearchDeviceEfence(quickSearchParams), ResourceSearchService.addCollectState(quickSearchParams)
            ]
            let arr: any = await Promise.all(Arr);
            let resource: any = {
                DeviceEFENCE: arr[0],
                Collect: arr[1]
            };
            return ResourceSearchService.formatAllResource(resource)
        }
    }

    checkFace(image: object, commandType: string, detectType: string): Promise<BackResponseBody<any>> {
        let resp = new BackResponseBody<Array<any>>(),
            imageData = "";
        return Promise.resolve(null)
            .then<number | null>(validateParams)
            .then(() => {
                // 检测照片中是否有人脸
                return BeanHelper.getDao<ResourceSearchDao>(DaoType.ResourceSearchDao).checkFack(image, commandType, detectType);
            })
            /* .then((res: BackResponseBody<any>) => {
                // 解析人脸检测返回的结果信息
                if (res.code == CheckFaceResultCode.ParamNull) {
                    res.code = ErrorCode.ERROR_NO_PARAM;
                }
                if (res.code = CheckFaceResultCode.WrongCommand) {
                    res.code = ErrorCode.ERROR_WRONG_COMMAND;
                }
                if (res.code = CheckFaceResultCode.RequestPcc) {
                    res.code = ErrorCode.ERROR_REQUEST_PCC_FAIL;
                }
                if (res.code = CheckFaceResultCode.SavePicTure) {
                    res.code = ErrorCode.ERROR_SAVE_PICTURE;
                }
                if (res.code = CheckFaceResultCode.NoFace) {
                    res.code = ErrorCode.ERROR_NO_FACE;
                }
                if (res.code = CheckFaceResultCode.ManyFace) {
                    res.code = ErrorCode.ERROR_MANY_FACE;
                }
                return res;
            }) */
            ;

        function validateParams() {
            // 对照片内容、命令类型、提取类别
            if (util.isNullOrUndefined(image) || !image) {
                return Promise.reject<number>(ErrorCode.ERROR_NO_Image_Upload);
            }
            if (util.isNullOrUndefined(commandType) || !commandType) {
                return Promise.reject<number>(ErrorCode.ERROR_NO_COMMAND_TYPE);
            }
            return null;
        }
    }

    checkCar(image: object): Promise<BackResponseBody<any>> {
        let resp = new BackResponseBody<Array<any>>(),
            imageData = "";
        return Promise.resolve(null)
            .then<number | null>(validateParams)
            .then(() => {
                // 检测照片中是否有人脸
                return BeanHelper.getDao<ResourceSearchDao>(DaoType.ResourceSearchDao).checkCar(image);
            });

        function validateParams() {
            // 对照片内容、命令类型、提取类别
            if (util.isNullOrUndefined(image) || !image) {
                return Promise.reject<number>(ErrorCode.ERROR_NO_Image_Upload);
            }
            return null;
        }
    }

    detectFace(detectFaceModel: DetectFaceParams): Promise<BackResponseBody<any>> {

        return Promise.resolve(null)
            .then<number | null>(validateParams)
            .then(() => {
                return BeanHelper.getDao<ResourceSearchDao>(DaoType.ResourceSearchDao).detectFace(detectFaceModel);
            })
            /* .then((res: BackResponseBody<any>) => {
                // 解析人脸检测返回的结果信息
                if (res.code == CheckFaceResultCode.ParamNull) {
                    res.code = ErrorCode.ERROR_NO_PARAM;
                }
                if (res.code = CheckFaceResultCode.WrongCommand) {
                    res.code = ErrorCode.ERROR_WRONG_COMMAND;
                }
                if (res.code = CheckFaceResultCode.RequestPcc) {
                    res.code = ErrorCode.ERROR_REQUEST_PCC_FAIL;
                }
                if (res.code = CheckFaceResultCode.SavePicTure) {
                    res.code = ErrorCode.ERROR_SAVE_PICTURE;
                }
                if (res.code = CheckFaceResultCode.NoFace) {
                    res.code = ErrorCode.ERROR_NO_FACE;
                }
                if (res.code = CheckFaceResultCode.ManyFace) {
                    res.code = ErrorCode.ERROR_MANY_FACE;
                }
                return res;
            }) */
            ;

        function validateParams() {
            // 对照片内容、命令类型、提取类别
            if (!detectFaceModel.imageurl && !detectFaceModel.imagedata) {
                return Promise.reject<number>(ErrorCode.ERROR_NO_Image_Upload);
            }
            if (!detectFaceModel.cutInfo && !detectFaceModel.markInfo) {
                return Promise.reject<number>(ErrorCode.ERROR_NO_MARK_INFO);
            }
            return null;
        }
    }

    searchFace(searchFaceParams: SearchFaceParams): Promise<BackResponseBody<Array<any>>> {
        return Promise.resolve(null)
            .then<number | null>(validateParams)
            .then(() => {
                return BeanHelper.getDao<ResourceSearchDao>(DaoType.ResourceSearchDao).searchFace(searchFaceParams);
            });

        function validateParams() {
            // 对照片内容、命令类型、提取类别
            // if (!searchFaceParams.keyWord) {
            //     return Promise.reject<number>(ErrorCode.ERROR_NO_KEY_WORD);
            // }

            // 检查isFirstSearch是否正确
            if (searchFaceParams.currentPage > 1 && !searchFaceParams.taskId) {
                return Promise.reject(ErrorCode.ERROR_NO_TASK_ID);
            }
            return null;
        }
    }

    searchCar(searchCarParams: any): Promise<BackResponseBody<Array<any>>> {
        return Promise.resolve(null)
            .then<number | null>(validateParams)
            .then(() => {
                return BeanHelper.getDao<ResourceSearchDao>(DaoType.ResourceSearchDao).searchCar(searchCarParams);
            });

        function validateParams() {
            return null;
        }
    }

    // 高级检索
    advancedSearchCar(params: SearchVehicleModel): Promise<BackResponseBody<Array<any>>> {
        return Promise.resolve(null)
            .then<number | null>(validateParams)
            .then(() => {
                return BeanHelper.getDao<ResourceSearchDao>(DaoType.ResourceSearchDao).advancedSearchCar(params);
            });

        function validateParams() {
            // 检查isFirstSearch是否正确
            // if (!params.redisId) {
            //     return Promise.reject(ErrorCode.ERROR_NO_TASK_ID);
            // }
            return null;
        }
    }

    searchWiFiByParams(searchWiFiParams: SearchMacParams): Promise<BackResponseBody<any>> {
        return Promise.resolve(null)
            .then<number | null>(validateParams)
            .then(() => {
                return BeanHelper.getDao<ResourceSearchDao>(DaoType.ResourceSearchDao).searchWiFiByParams(searchWiFiParams);
            });

        function validateParams() {
            return ResourceSearchService.validateParams(searchWiFiParams);
        }
    }

    searchEFenceByParams(searchEFenceParams: SearchMacParams): Promise<BackResponseBody<any>> {
        return Promise.resolve(null)
            .then<number | null>(validateParams)
            .then(() => {
                return BeanHelper.getDao<ResourceSearchDao>(DaoType.ResourceSearchDao).searchEFenceByParams(searchEFenceParams);
            });

        function validateParams() {
            return ResourceSearchService.validateParams(searchEFenceParams);
        }
    }

    /**
     * 参数合法性检验
     * @param searchParams
     */
    private static validateParams(searchParams: any) {
        // 检验搜索文本是否为空
        // if (!searchParams.keyWord) {
        //     return Promise.reject(ErrorCode.ERROR_NO_KEY_WORD);
        // }

        // 检查isFirstSearch是否正确
        if (searchParams.currentPage > 1 && searchParams.isFirstSearch) {
            return Promise.reject(ErrorCode.ERROR_WRONG_ISFIRSTSEARCH);
        }

        // 检查taskId是否为空
        if (!searchParams.isFirstSearch && !searchParams.taskID && !searchParams.taskId) {
            return Promise.reject(ErrorCode.ERROR_NO_TASK_ID);
        }
        return null;
    }

    /**
     * 将设备对象转换成deviceResult对象返回
     * @param mapObjList
     * @param deviceType
     */
    private static convertDeviceResultList(mapObjList: Array<any>, deviceType: string) {
        if (mapObjList && util.isArray(mapObjList) && mapObjList.length > 0) {
            let deviceResultList = new Array<DeviceResult>(),
                getResourceType = GetResourceType,
                getCameraType = GetCameraType;
            mapObjList.forEach((mapObjs: any) => {
                let deviceResult = new DeviceResult(),
                    lonLat = new Array<string>(2),
                    columnList = mapObjs.ColumnList;
                columnList.forEach(function (columnObj: any) {
                    if (columnObj.Name == "Id") {
                        deviceResult.Id = columnObj.Value;
                    }
                    if (columnObj.Name == "AreaId") {
                        deviceResult.AreaId = columnObj.Value;
                    }
                    if (columnObj.Name == "CameraType") {
                        deviceResult.CameraType = getCameraType(columnObj.Value);
                    }
                    if (columnObj.Name == "CameraType") {
                        deviceResult.CameraTypeString = columnObj.Value;
                    }
                    if (columnObj.Name == "Code") {
                        deviceResult.Code = columnObj.Value;
                    }
                    if (columnObj.Name == "IpAddress") {
                        deviceResult.IpAddress = columnObj.Value;
                    }
                    if (columnObj.Name == "Name") {
                        deviceResult.Name = columnObj.Value;
                    }
                    if (columnObj.Name == "Port") {
                        deviceResult.Port = columnObj.Value;
                    }
                    if (columnObj.Name == "ObjectType") {
                        deviceResult.ObjectType = columnObj.Value;
                    }
                    if (columnObj.Name == "Direct") {
                        deviceResult.Direct = columnObj.Value;
                    }
                    if (columnObj.Name == "Lat") {
                        deviceResult.Lat = columnObj.Value;
                    }
                    if (columnObj.Name == "Lon") {
                        deviceResult.Lon = columnObj.Value;
                    }
                    if (columnObj.Name == "BuildLocation") {
                        deviceResult.BuildLocation = columnObj.Value;
                    }
                    if (columnObj.Name == "Type") {
                        deviceResult.Type = columnObj.Value;
                    }
                    if (columnObj.Name == "InternalId") {
                        deviceResult.InternalId = columnObj.Value;
                    }
                    if (columnObj.Name == "videoServer") {
                        deviceResult.videoServer = columnObj.Value;
                    }
                    if (columnObj.Name == "playName") {
                        deviceResult.playName = columnObj.Value;
                    }
                    if (columnObj.Name == "pyCode") {
                        deviceResult.pyCode = columnObj.Value;
                    }
                });
                deviceResultList.push(deviceResult);
            });
            return deviceResultList;
        } else {
            return null;
        }
    }

    /**
     * 根据日期类型解析日期段
     * @param dateType
     * @param date
     */
    private static parseDateByDateType(dateType: string, date: Date) {
        if (util.isNullOrUndefined(date) || util.isNullOrUndefined(dateType)) {
            return null;
        }
        let currentDate = {} as Date,
            minDate = {} as string,
            maxDate = {} as string,
            dateArr = new Array<string>(2),
            fullYear = {} as string,
            month = {} as string,
            day = {} as string;
        if (util.isString(date)) {
            currentDate = new Date(date);
        } else if (util.isDate(date)) {
            currentDate = date;
        }
        fullYear = currentDate.getFullYear() + "";
        if (currentDate.getMonth() + 1 < 10) {
            month = "0" + (currentDate.getMonth() + 1);
        } else {
            month = "" + (currentDate.getMonth() + 1);
        }
        if (currentDate.getDate() < 10) {
            day = "0" + currentDate.getDate();
        } else {
            day = "" + currentDate.getDate();
        }
        maxDate = fullYear + "-" + month + "-" + day;
        // 取最近一天
        if (dateType == DateType.Last_Day.value) {
            currentDate.setDate(currentDate.getDate() - 1);
        } else if (dateType == DateType.Last_Three_Day.value) {
            currentDate.setDate(currentDate.getDate() - 3);
        } else if (dateType == DateType.Last_Week_Day.value) {
            currentDate.setDate(currentDate.getDate() - 7);
        }
        fullYear = currentDate.getFullYear() + "";
        if (currentDate.getMonth() + 1 < 10) {
            month = "0" + (currentDate.getMonth() + 1);
        } else {
            month = "" + (currentDate.getMonth() + 1);
        }
        if (currentDate.getDate() < 10) {
            day = "0" + currentDate.getDate();
        } else {
            day = "" + currentDate.getDate();
        }
        minDate = fullYear + "-" + month + "-" + day;
        dateArr[0] = maxDate;
        dateArr[1] = minDate;
        return dateArr;
    }

    /**
     * 生成随机uuid.
     * @param len uuid长度
     */
    private static genUuid(len: number) {
        let s = new Array<string>(), hexDigits = "0123456789abcdef";
        // 默认32位长度
        if (util.isNullOrUndefined(len)) {
            len = 32;
        }
        for (var i = 0; i < len; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";                                                        // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((parseInt(s[19]) & 0x3) | 0x8, 1);         // bits 6-7 of the clock_seq_hi_and_reserved to 01

        var uuid = s.join("");
        return uuid;
    }

    private static isEmptyObject(jsonObj: object) {
        var t;
        for (t in jsonObj)
            return !1;
        return !0
    }
}