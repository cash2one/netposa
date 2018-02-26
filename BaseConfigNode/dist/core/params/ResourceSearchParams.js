"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TableParams_1 = require("./table/TableParams");
class OrderBy {
    constructor() {
        this.isAsc = false;
    }
}
exports.default = OrderBy;
class BaseSearchModel extends TableParams_1.TableParams {
}
exports.BaseSearchModel = BaseSearchModel;
class QuickSearchParams extends BaseSearchModel {
}
exports.QuickSearchParams = QuickSearchParams;
class SearchFaceParams extends BaseSearchModel {
}
exports.SearchFaceParams = SearchFaceParams;
class SearchMacParams extends BaseSearchModel {
}
exports.SearchMacParams = SearchMacParams;
exports.ResourceDeviceProcNames = {
    CameraDeviceSearchProcName: { "text": "获取摄像机设备存储过程名称", "value": "PROC_GET_CAMERA(?,?,?,?)" },
    RmpGateDeviceSearchProcName: { "text": "获取卡口设备存储过程名称", "value": "PROC_GET_RMPGATE(?,?,?,?)" },
    WiFiDeviceSearchProcName: { "text": "获取WiFi设备存储过程名称", "value": "PROC_GET_WIFIDEVICE(?,?,?,?)" },
    EFenceDeviceSearchProcName: { "text": "获取电子围栏设备存储过程名称", "value": "PROC_GET_EFENCEDEVICE(?,?,?,?)" }
};
