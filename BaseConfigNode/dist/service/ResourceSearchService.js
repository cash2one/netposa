"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCode_1 = require("../common/res/ErrorCode");
const ResourceSearchParams_1 = require("../core/params/ResourceSearchParams");
const ResponseResult_1 = require("../core/params/result/ResponseResult");
const ResourceType_1 = require("../core/server/enum/ResourceType");
const CameraTypeEnum_1 = require("../core/server/enum/CameraTypeEnum");
const DateType_1 = require("../core/enum/DateType");
const ResourceSearchResultModel_1 = require("../core/server/ResourceSearchResultModel");
const util = require("util");
const CollectService_1 = require("./CollectService");
const BeanHelper_1 = require("../common/help/BeanHelper");
const DaoType_1 = require("../dao/enum/DaoType");
const ObjectType_1 = require("../core/enum/ObjectType");
const Camera_1 = require("../extend/Camera");
const _ = require("lodash");
const Device_1 = require("../extend/Device");
const Wifi_1 = require("../extend/Wifi");
const Rmpgate_1 = require("../extend/Rmpgate");
const ElectronicFence_1 = require("../extend/ElectronicFence");
class ResourceSearchService {
    static addCollectState(quickSearchParams) {
        let userID = quickSearchParams.userId;
        return ResourceSearchService.CollectService.findListAll({ userID: userID });
    }
    searchDevice(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.type || !params.ids || !Array.isArray(params.ids) || params.ids.length === 0) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let res = new ResponseResult_1.BackResponseBody();
            res.code = ErrorCode_1.default.OK;
            res.data = [];
            if (params.type === ObjectType_1.ObjectType.Camera.value) {
                let result = yield Promise.all([
                    Device_1.default.findSystemPointForMap(),
                    Camera_1.default.getCameraForMap()
                ]);
                params.ids.forEach((id) => {
                    if (result[1][id]) {
                        let camera = _.cloneDeep(result[1][id]);
                        camera.JsonUserData = {};
                        camera.JsonUserData.Point = result[0][id] ? result[0][id] : {};
                        res.data.push(camera);
                    }
                    else {
                        res.data.push({});
                    }
                });
                return res;
            }
            if (params.type === ObjectType_1.ObjectType.Wifi.value) {
                let result = yield Promise.all([
                    Device_1.default.findSystemPointForMap(),
                    Wifi_1.default.getWifiListForMap()
                ]);
                params.ids.forEach((id) => {
                    if (result[1][id]) {
                        let wifi = _.cloneDeep(result[1][id]);
                        wifi.JsonUserData = {};
                        wifi.JsonUserData.Point = result[0][id] ? result[0][id] : {};
                        res.data.push(wifi);
                    }
                    else {
                        res.data.push({});
                    }
                });
                return res;
            }
            if (params.type === ObjectType_1.ObjectType.ElectronicFence.value) {
                let result = yield Promise.all([
                    Device_1.default.findSystemPointForMap(),
                    ElectronicFence_1.default.getEfenceListForMap()
                ]);
                params.ids.forEach((id) => {
                    if (result[1][id]) {
                        let efence = _.cloneDeep(result[1][id]);
                        efence.JsonUserData = {};
                        efence.JsonUserData.Point = result[0][id] ? result[0][id] : {};
                        res.data.push(efence);
                    }
                    else {
                        res.data.push({});
                    }
                });
                return res;
            }
            if (params.type === ObjectType_1.ObjectType.RmpGate.value) {
                let result = yield Promise.all([
                    Device_1.default.findSystemPointForMap(),
                    Rmpgate_1.default.getRmpGateForMap()
                ]);
                params.ids.forEach((id) => {
                    if (result[1][id]) {
                        let rmpGate = _.cloneDeep(result[1][id]);
                        rmpGate.JsonUserData = {};
                        rmpGate.JsonUserData.Point = result[0][id] ? result[0][id] : {};
                        res.data.push(rmpGate);
                    }
                    else {
                        res.data.push({});
                    }
                });
                return res;
            }
        });
    }
    resourceSearchTips(keyWords) {
        return Promise.resolve(null)
            .then(validateParams)
            .then(() => {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceSearchDao).resourceSearchTips(keyWords);
        });
        function validateParams() {
            if (!keyWords) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return null;
        }
    }
    static quickSearchCar(quickSearchParams) {
        return Promise.resolve(null).then(() => {
            if (quickSearchParams) {
                quickSearchParams.objectType = ResourceType_1.ResourceTypeEnum[2].value;
                return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceSearchDao).quickSearchByKeyWords(quickSearchParams);
            }
            else {
                return null;
            }
        });
    }
    static quickSearchFace(quickSearchParams) {
        return Promise.resolve(null).then(() => {
            if (quickSearchParams) {
                quickSearchParams.objectType = ResourceType_1.ResourceTypeEnum[1].value;
                return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceSearchDao).quickSearchByKeyWords(quickSearchParams);
            }
            else {
                return null;
            }
        });
    }
    static quickSearchWifi(quickSearchParams) {
        return Promise.resolve(null).then(() => {
            if (quickSearchParams) {
                quickSearchParams.objectType = ResourceType_1.ResourceTypeEnum[5].value;
                return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceSearchDao).quickSearchByKeyWords(quickSearchParams);
            }
            else {
                return null;
            }
        });
    }
    static quickSearchEfence(quickSearchParams) {
        return Promise.resolve(null).then(() => {
            if (quickSearchParams) {
                quickSearchParams.objectType = ResourceType_1.ResourceTypeEnum[7].value;
                return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceSearchDao).quickSearchByKeyWords(quickSearchParams);
            }
            else {
                return null;
            }
        });
    }
    static quickSearchDeviceCamera(quickSearchParams) {
        return Promise.resolve(null).then(() => {
            let procedureParams = {};
            procedureParams.ProcName = ResourceSearchParams_1.ResourceDeviceProcNames.CameraDeviceSearchProcName.value;
            procedureParams.JsonProcParams = [quickSearchParams.keyWord];
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.OtherDao).callProcedureWithPage(procedureParams, quickSearchParams.currentPage, quickSearchParams.pageSize);
        });
    }
    static quickSearchDeviceWifi(quickSearchParams) {
        return Promise.resolve(null).then(() => {
            let procedureParams = {};
            procedureParams.ProcName = ResourceSearchParams_1.ResourceDeviceProcNames.WiFiDeviceSearchProcName.value;
            procedureParams.JsonProcParams = [quickSearchParams.keyWord];
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.OtherDao).callProcedureWithPage(procedureParams, quickSearchParams.currentPage, quickSearchParams.pageSize);
        });
    }
    static quickSearchDeviceEfence(quickSearchParams) {
        return Promise.resolve(null).then(() => {
            let procedureParams = {};
            procedureParams.ProcName = ResourceSearchParams_1.ResourceDeviceProcNames.EFenceDeviceSearchProcName.value;
            procedureParams.JsonProcParams = [quickSearchParams.keyWord];
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.OtherDao).callProcedureWithPage(procedureParams, quickSearchParams.currentPage, quickSearchParams.pageSize);
        });
    }
    static quickSearchDeviceRmpgate(quickSearchParams) {
        return Promise.resolve(null).then(() => {
            let procedureParams = {};
            procedureParams.ProcName = ResourceSearchParams_1.ResourceDeviceProcNames.RmpGateDeviceSearchProcName.value;
            procedureParams.JsonProcParams = [quickSearchParams.keyWord];
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.OtherDao).callProcedureWithPage(procedureParams, quickSearchParams.currentPage, quickSearchParams.pageSize);
        });
    }
    static formatAllResource(arr) {
        if (!arr) {
            return;
        }
        let Collect = {};
        if (arr['Collect'] && arr['Collect'].data && arr['Collect'].data.length > 0) {
            arr['Collect'].data.map((item) => {
                Collect[item.ObjectID] = 1;
            });
        }
        let rep = new ResponseResult_1.BackResponseBody(), code = 200, status = "", deviceResData = {}, resultData = {}, count = 0;
        if (arr['Vehicle'] && arr['Vehicle'].data) {
            let vehicleResultData = {};
            if (arr['Vehicle'].code === 200) {
                vehicleResultData.TotalCount = arr['Vehicle'].data.Vehicle.TotalCount;
                count += vehicleResultData.TotalCount;
                vehicleResultData.TaskId = arr['Vehicle'].data.Vehicle.TaskId;
                if (Collect) {
                    arr['Vehicle'].data.Vehicle.Result ? "" : arr['Vehicle'].data.Vehicle.Result = [];
                    for (let i = 0; i < arr['Vehicle'].data.Vehicle.Result.length; i++) {
                        if (Collect[arr['Vehicle'].data.Vehicle.Result[i].id]) {
                            arr['Vehicle'].data.Vehicle.Result[i]['collectStatus'] = true;
                        }
                        else {
                            arr['Vehicle'].data.Vehicle.Result[i]['collectStatus'] = false;
                        }
                    }
                }
                vehicleResultData.Result = arr['Vehicle'].data.Vehicle.Result || [];
            }
            else {
                vehicleResultData.TotalCount = 0;
                vehicleResultData.TaskId = "";
                vehicleResultData.Result = [];
            }
            vehicleResultData.code = arr['Vehicle'].code;
            vehicleResultData.status = arr['Vehicle'].status;
            resultData[ResourceType_1.ResourceTypeEnum[2].value] = vehicleResultData;
        }
        if (arr['Face'] && arr['Face'].data) {
            let faceResultData = {};
            if (arr['Face'].code === 200) {
                faceResultData.TotalCount = arr['Face'].data.Face.TotalCount;
                count += faceResultData.TotalCount;
                faceResultData.TaskId = arr['Face'].data.Face.TaskId;
                if (Collect) {
                    for (let i = 0; i < arr['Face'].data.Face.Result.length; i++) {
                        if (Collect[arr['Face'].data.Face.Result[i].AccessLog.ID]) {
                            arr['Face'].data.Face.Result[i]['collectStatus'] = true;
                        }
                        else {
                            arr['Face'].data.Face.Result[i]['collectStatus'] = false;
                        }
                    }
                }
                faceResultData.Result = arr['Face'].data.Face.Result || [];
            }
            else {
                faceResultData.TotalCount = 0;
                faceResultData.TaskId = "";
                faceResultData.Result = [];
            }
            faceResultData.code = arr['Face'].code;
            faceResultData.status = arr['Face'].status;
            resultData[ResourceType_1.ResourceTypeEnum[1].value] = faceResultData;
        }
        if (arr['WiFi'] && arr['WiFi'].data) {
            let wifiResultData = {};
            if (arr['WiFi'].code === 200) {
                wifiResultData.TotalCount = arr['WiFi'].data.WiFi.TotalCount;
                count += wifiResultData.TotalCount;
                wifiResultData.TaskId = arr['WiFi'].data.WiFi.TaskId;
                if (Collect) {
                    for (let i = 0; i < arr['WiFi'].data.WiFi.Result.length; i++) {
                        if (Collect[arr['WiFi'].data.WiFi.Result[i].wifiLog.ID]) {
                            arr['WiFi'].data.WiFi.Result[i]['collectStatus'] = true;
                        }
                        else {
                            arr['WiFi'].data.WiFi.Result[i]['collectStatus'] = false;
                        }
                    }
                }
                wifiResultData.Result = arr['WiFi'].data.WiFi.Result || [];
            }
            else {
                wifiResultData.TotalCount = 0;
                wifiResultData.TaskId = "";
                wifiResultData.Result = [];
            }
            wifiResultData.code = arr['WiFi'].code;
            wifiResultData.status = arr['WiFi'].status;
            resultData[ResourceType_1.ResourceTypeEnum[5].value] = wifiResultData;
        }
        if (arr['EFENCE'] && arr['EFENCE'].data) {
            let efenceResultData = {};
            if (arr['EFENCE'].code === 200) {
                efenceResultData.TotalCount = arr['EFENCE'].data.EFENCE.TotalCount;
                count += efenceResultData.TotalCount;
                efenceResultData.TaskId = arr['EFENCE'].data.EFENCE.TaskId;
                if (Collect) {
                    for (let i = 0; i < arr['EFENCE'].data.EFENCE.Result.length; i++) {
                        if (Collect[arr['EFENCE'].data.EFENCE.Result[i].eFenceLog.ID]) {
                            arr['EFENCE'].data.EFENCE.Result[i]['collectStatus'] = true;
                        }
                        else {
                            arr['EFENCE'].data.EFENCE.Result[i]['collectStatus'] = false;
                        }
                    }
                }
                efenceResultData.Result = arr['EFENCE'].data.EFENCE.Result || [];
            }
            else {
                efenceResultData.TotalCount = 0;
                efenceResultData.TaskId = "";
                efenceResultData.Result = [];
            }
            efenceResultData.code = arr['EFENCE'].code;
            efenceResultData.status = arr['EFENCE'].status;
            resultData[ResourceType_1.ResourceTypeEnum[7].value] = efenceResultData;
        }
        if (arr['DeviceCamera'] && arr['DeviceCamera'].data.Result.length > 0) {
            let deviceResultObj = {};
            if (arr['DeviceCamera'].code === 200) {
                let cameraResultlList = ResourceSearchService.convertDeviceResultList(arr['DeviceCamera'].data.Result[0].RowList, ResourceType_1.ResourceTypeEnum[10].value);
                deviceResultObj.TotalCount = arr['DeviceCamera'].data.TotalCount;
                count += deviceResultObj.TotalCount;
                if (Collect && cameraResultlList) {
                    for (let i = 0; i < cameraResultlList.length; i++) {
                        if (Collect[cameraResultlList[i].Id]) {
                            cameraResultlList[i]['collectStatus'] = true;
                        }
                        else {
                            cameraResultlList[i]['collectStatus'] = false;
                        }
                    }
                }
                deviceResultObj.Result = cameraResultlList || [];
            }
            else {
                deviceResultObj.TotalCount = 0;
                deviceResultObj.Result = [];
            }
            deviceResultObj.code = arr['DeviceCamera'].code;
            deviceResultObj.status = arr['DeviceCamera'].status;
            deviceResData[ResourceType_1.ResourceTypeEnum[3].value] = deviceResultObj;
        }
        if (arr['DeviceWiFi'] && arr['DeviceWiFi'].data.Result.length > 0) {
            let deviceResultObj = {};
            if (arr['DeviceWiFi'].code === 200) {
                let wifiResultList = ResourceSearchService.convertDeviceResultList(arr['DeviceWiFi'].data.Result[0].RowList, ResourceType_1.ResourceTypeEnum[5].value);
                deviceResultObj.TotalCount = arr['DeviceWiFi'].data.TotalCount;
                count += deviceResultObj.TotalCount;
                if (Collect && wifiResultList) {
                    for (let i = 0; i < wifiResultList.length; i++) {
                        if (Collect[wifiResultList[i].Id]) {
                            wifiResultList[i]['collectStatus'] = true;
                        }
                        else {
                            wifiResultList[i]['collectStatus'] = false;
                        }
                    }
                }
                deviceResultObj.Result = wifiResultList || [];
            }
            else {
                deviceResultObj.TotalCount = 0;
                deviceResultObj.Result = [];
            }
            deviceResultObj.code = arr['DeviceWiFi'].code;
            deviceResultObj.status = arr['DeviceWiFi'].status;
            deviceResData[ResourceType_1.ResourceTypeEnum[5].value] = deviceResultObj;
        }
        if (arr['DeviceEFENCE'] && arr['DeviceEFENCE'].data.Result.length > 0) {
            let deviceResultObj = {};
            if (arr['DeviceEFENCE'].code === 200) {
                let electronicFenceResultList = ResourceSearchService.convertDeviceResultList(arr['DeviceEFENCE'].data.Result[0].RowList, ResourceType_1.ResourceTypeEnum[7].value);
                deviceResultObj.TotalCount = arr['DeviceEFENCE'].data.TotalCount;
                count += deviceResultObj.TotalCount;
                if (Collect && electronicFenceResultList) {
                    for (let i = 0; i < electronicFenceResultList.length; i++) {
                        if (Collect[electronicFenceResultList[i].Id]) {
                            electronicFenceResultList[i]['collectStatus'] = true;
                        }
                        else {
                            electronicFenceResultList[i]['collectStatus'] = false;
                        }
                    }
                }
                deviceResultObj.Result = electronicFenceResultList || [];
            }
            else {
                deviceResultObj.TotalCount = 0;
                deviceResultObj.Result = [];
            }
            deviceResultObj.code = arr['DeviceEFENCE'].code;
            deviceResultObj.status = arr['DeviceEFENCE'].status;
            deviceResData[ResourceType_1.ResourceTypeEnum[7].value] = deviceResultObj;
        }
        if (arr['DeviceRmpGate'] && arr['DeviceRmpGate'].data.Result.length > 0) {
            let deviceResultObj = {};
            if (arr['DeviceRmpGate'].code === 200) {
                let rmpGateResultList = ResourceSearchService.convertDeviceResultList(arr['DeviceRmpGate'].data.Result[0].RowList, ResourceType_1.ResourceTypeEnum[8].value);
                deviceResultObj.TotalCount = arr['DeviceRmpGate'].data.TotalCount;
                count += deviceResultObj.TotalCount;
                if (Collect && rmpGateResultList) {
                    for (let i = 0; i < rmpGateResultList.length; i++) {
                        if (Collect[rmpGateResultList[i].Id]) {
                            rmpGateResultList[i]['collectStatus'] = true;
                        }
                        else {
                            rmpGateResultList[i]['collectStatus'] = false;
                        }
                    }
                }
                deviceResultObj.Result = rmpGateResultList || [];
            }
            else {
                deviceResultObj.TotalCount = 0;
                deviceResultObj.Result = [];
            }
            deviceResultObj.code = arr['DeviceRmpGate'].code;
            deviceResultObj.status = arr['DeviceRmpGate'].status;
            deviceResData[ResourceType_1.ResourceTypeEnum[8].value] = deviceResultObj;
        }
        if (deviceResData) {
            resultData['device'] = deviceResData;
        }
        rep.code = code;
        rep.status = status;
        rep.data = resultData;
        rep.count = count;
        return rep;
    }
    quickSearchByKeyWords(quickSearchParams) {
        return __awaiter(this, void 0, void 0, function* () {
            if (quickSearchParams.objectType == 'All') {
                let arr = [
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
                let promiseResultArray = yield Promise.all(arr);
                let allResource = {
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
                return ResourceSearchService.formatAllResource(allResource);
            }
            if (quickSearchParams.objectType == ResourceType_1.ResourceTypeEnum[1].value) {
                let Arr = [ResourceSearchService.quickSearchFace(quickSearchParams), ResourceSearchService.addCollectState(quickSearchParams)
                ];
                let arr = yield Promise.all(Arr);
                let resource = {
                    Face: arr[0],
                    Collect: arr[1]
                };
                return ResourceSearchService.formatAllResource(resource);
            }
            if (quickSearchParams.objectType == ResourceType_1.ResourceTypeEnum[2].value) {
                let Arr = [ResourceSearchService.quickSearchCar(quickSearchParams), ResourceSearchService.addCollectState(quickSearchParams)
                ];
                let arr = yield Promise.all(Arr);
                let resource = {
                    Vehicle: arr[0],
                    Collect: arr[1]
                };
                return ResourceSearchService.formatAllResource(resource);
            }
            if (quickSearchParams.objectType == ResourceType_1.ResourceTypeEnum[5].value) {
                let Arr = [ResourceSearchService.quickSearchWifi(quickSearchParams), ResourceSearchService.addCollectState(quickSearchParams)
                ];
                let arr = yield Promise.all(Arr);
                let resource = {
                    WiFi: arr[0],
                    Collect: arr[1]
                };
                return ResourceSearchService.formatAllResource(resource);
            }
            if (quickSearchParams.objectType == ResourceType_1.ResourceTypeEnum[7].value) {
                let Arr = [ResourceSearchService.quickSearchEfence(quickSearchParams), ResourceSearchService.addCollectState(quickSearchParams)
                ];
                let arr = yield Promise.all(Arr);
                let resource = {
                    EFENCE: arr[0],
                    Collect: arr[1]
                };
                return ResourceSearchService.formatAllResource(resource);
            }
            if (quickSearchParams.objectType == ResourceType_1.ResourceTypeEnum[10].value) {
                let Arr = [ResourceSearchService.quickSearchDeviceCamera(quickSearchParams), ResourceSearchService.addCollectState(quickSearchParams)
                ];
                let arr = yield Promise.all(Arr);
                let resource = {
                    DeviceCamera: arr[0],
                    Collect: arr[1]
                };
                return ResourceSearchService.formatAllResource(resource);
            }
            if (quickSearchParams.objectType == ResourceType_1.ResourceTypeEnum[11].value) {
                let Arr = [ResourceSearchService.quickSearchDeviceWifi(quickSearchParams), ResourceSearchService.addCollectState(quickSearchParams)
                ];
                let arr = yield Promise.all(Arr);
                let resource = {
                    DeviceWiFi: arr[0],
                    Collect: arr[1]
                };
                return ResourceSearchService.formatAllResource(resource);
            }
            if (quickSearchParams.objectType == ResourceType_1.ResourceTypeEnum[12].value) {
                let Arr = [ResourceSearchService.quickSearchDeviceRmpgate(quickSearchParams), ResourceSearchService.addCollectState(quickSearchParams)
                ];
                let arr = yield Promise.all(Arr);
                let resource = {
                    DeviceRmpGate: arr[0],
                    Collect: arr[1]
                };
                return ResourceSearchService.formatAllResource(resource);
            }
            if (quickSearchParams.objectType == ResourceType_1.ResourceTypeEnum[13].value) {
                let Arr = [ResourceSearchService.quickSearchDeviceEfence(quickSearchParams), ResourceSearchService.addCollectState(quickSearchParams)
                ];
                let arr = yield Promise.all(Arr);
                let resource = {
                    DeviceEFENCE: arr[0],
                    Collect: arr[1]
                };
                return ResourceSearchService.formatAllResource(resource);
            }
        });
    }
    checkFace(image, commandType, detectType) {
        let resp = new ResponseResult_1.BackResponseBody(), imageData = "";
        return Promise.resolve(null)
            .then(validateParams)
            .then(() => {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceSearchDao).checkFack(image, commandType, detectType);
        });
        function validateParams() {
            if (util.isNullOrUndefined(image) || !image) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_Image_Upload);
            }
            if (util.isNullOrUndefined(commandType) || !commandType) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_COMMAND_TYPE);
            }
            return null;
        }
    }
    checkCar(image) {
        let resp = new ResponseResult_1.BackResponseBody(), imageData = "";
        return Promise.resolve(null)
            .then(validateParams)
            .then(() => {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceSearchDao).checkCar(image);
        });
        function validateParams() {
            if (util.isNullOrUndefined(image) || !image) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_Image_Upload);
            }
            return null;
        }
    }
    detectFace(detectFaceModel) {
        return Promise.resolve(null)
            .then(validateParams)
            .then(() => {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceSearchDao).detectFace(detectFaceModel);
        });
        function validateParams() {
            if (!detectFaceModel.imageurl && !detectFaceModel.imagedata) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_Image_Upload);
            }
            if (!detectFaceModel.cutInfo && !detectFaceModel.markInfo) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_MARK_INFO);
            }
            return null;
        }
    }
    searchFace(searchFaceParams) {
        return Promise.resolve(null)
            .then(validateParams)
            .then(() => {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceSearchDao).searchFace(searchFaceParams);
        });
        function validateParams() {
            if (searchFaceParams.currentPage > 1 && !searchFaceParams.taskId) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_TASK_ID);
            }
            return null;
        }
    }
    searchCar(searchCarParams) {
        return Promise.resolve(null)
            .then(validateParams)
            .then(() => {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceSearchDao).searchCar(searchCarParams);
        });
        function validateParams() {
            return null;
        }
    }
    advancedSearchCar(params) {
        return Promise.resolve(null)
            .then(validateParams)
            .then(() => {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceSearchDao).advancedSearchCar(params);
        });
        function validateParams() {
            return null;
        }
    }
    searchWiFiByParams(searchWiFiParams) {
        return Promise.resolve(null)
            .then(validateParams)
            .then(() => {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceSearchDao).searchWiFiByParams(searchWiFiParams);
        });
        function validateParams() {
            return ResourceSearchService.validateParams(searchWiFiParams);
        }
    }
    searchEFenceByParams(searchEFenceParams) {
        return Promise.resolve(null)
            .then(validateParams)
            .then(() => {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceSearchDao).searchEFenceByParams(searchEFenceParams);
        });
        function validateParams() {
            return ResourceSearchService.validateParams(searchEFenceParams);
        }
    }
    static validateParams(searchParams) {
        if (searchParams.currentPage > 1 && searchParams.isFirstSearch) {
            return Promise.reject(ErrorCode_1.default.ERROR_WRONG_ISFIRSTSEARCH);
        }
        if (!searchParams.isFirstSearch && !searchParams.taskID && !searchParams.taskId) {
            return Promise.reject(ErrorCode_1.default.ERROR_NO_TASK_ID);
        }
        return null;
    }
    static convertDeviceResultList(mapObjList, deviceType) {
        if (mapObjList && util.isArray(mapObjList) && mapObjList.length > 0) {
            let deviceResultList = new Array(), getResourceType = ResourceType_1.GetResourceType, getCameraType = CameraTypeEnum_1.GetCameraType;
            mapObjList.forEach((mapObjs) => {
                let deviceResult = new ResourceSearchResultModel_1.DeviceResult(), lonLat = new Array(2), columnList = mapObjs.ColumnList;
                columnList.forEach(function (columnObj) {
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
        }
        else {
            return null;
        }
    }
    static parseDateByDateType(dateType, date) {
        if (util.isNullOrUndefined(date) || util.isNullOrUndefined(dateType)) {
            return null;
        }
        let currentDate = {}, minDate = {}, maxDate = {}, dateArr = new Array(2), fullYear = {}, month = {}, day = {};
        if (util.isString(date)) {
            currentDate = new Date(date);
        }
        else if (util.isDate(date)) {
            currentDate = date;
        }
        fullYear = currentDate.getFullYear() + "";
        if (currentDate.getMonth() + 1 < 10) {
            month = "0" + (currentDate.getMonth() + 1);
        }
        else {
            month = "" + (currentDate.getMonth() + 1);
        }
        if (currentDate.getDate() < 10) {
            day = "0" + currentDate.getDate();
        }
        else {
            day = "" + currentDate.getDate();
        }
        maxDate = fullYear + "-" + month + "-" + day;
        if (dateType == DateType_1.DateType.Last_Day.value) {
            currentDate.setDate(currentDate.getDate() - 1);
        }
        else if (dateType == DateType_1.DateType.Last_Three_Day.value) {
            currentDate.setDate(currentDate.getDate() - 3);
        }
        else if (dateType == DateType_1.DateType.Last_Week_Day.value) {
            currentDate.setDate(currentDate.getDate() - 7);
        }
        fullYear = currentDate.getFullYear() + "";
        if (currentDate.getMonth() + 1 < 10) {
            month = "0" + (currentDate.getMonth() + 1);
        }
        else {
            month = "" + (currentDate.getMonth() + 1);
        }
        if (currentDate.getDate() < 10) {
            day = "0" + currentDate.getDate();
        }
        else {
            day = "" + currentDate.getDate();
        }
        minDate = fullYear + "-" + month + "-" + day;
        dateArr[0] = maxDate;
        dateArr[1] = minDate;
        return dateArr;
    }
    static genUuid(len) {
        let s = new Array(), hexDigits = "0123456789abcdef";
        if (util.isNullOrUndefined(len)) {
            len = 32;
        }
        for (var i = 0; i < len; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((parseInt(s[19]) & 0x3) | 0x8, 1);
        var uuid = s.join("");
        return uuid;
    }
    static isEmptyObject(jsonObj) {
        var t;
        for (t in jsonObj)
            return !1;
        return !0;
    }
}
ResourceSearchService.CollectService = new CollectService_1.CollectService();
exports.ResourceSearchService = ResourceSearchService;
