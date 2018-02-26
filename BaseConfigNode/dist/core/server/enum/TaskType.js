"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskType = {
    FaceMonitor: { value: "FaceMonitor", text: "人像布控" },
    FaceStruct: { value: "FaceStruct", text: "人像结构化" },
    CarMonitor: { value: "VehicleMonitor", text: "车辆布控" },
    MacMonitor: { value: "MAC", text: "MAC布控" },
    IMEIMonitor: { value: "IMEI", text: "IMEI布控" },
    IMSIMonitor: { value: "IMSI", text: "IMSI布控" },
    VehicleStruct: { value: "VehicleStruct", text: "车辆结构化" },
    VedioStruct: { value: "VedioStruct", text: "人像抓拍" },
};
exports.TaskTypeBase = {
    FaceMonitor: exports.TaskType.FaceMonitor,
    CarMonitor: exports.TaskType.CarMonitor,
    VehicleStruct: exports.TaskType.VehicleStruct,
    MacMonitor: exports.TaskType.MacMonitor
};
exports.TaskMonitor = {
    FaceMonitor: exports.TaskType.FaceMonitor,
    CarMonitor: exports.TaskType.CarMonitor,
    MacMonitor: { value: 'Mac', text: '感知数据布控' }
};
exports.StructTask = {
    FaceStruct: exports.TaskType.FaceStruct,
};
