"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketResultTypeEnum = {
    DeployControl: "1",
    Track: "SearchAccessLog",
    FaceRetrieval: "SearchFace",
    alarm: 'SearchAlarmLog',
    Retrieval: "SearchRetrievalLog",
    VerifyFace: "VerifyFace",
    UserOnLine: "UserOnLine",
    CameraOnLine: "CameraOnLine",
    ServerOnLine: "ServerOnLine",
    SubcribeAccessLog: "SubcribeAccessLog",
    SubcribeAlarmLog: "SubcribeAlarmLog",
    TaskVerify: "TaskVerify",
    UserOffLine: "UserOffLine",
    Export: "Export",
    FaceSearch: "SearchAccessLogByImage",
    SearchFace: "SearchFace",
    CarSearch: "SearchVehicleByImageFromPVD",
    allVehicleMonitorlog: "allVehicleMonitorlog",
    allAccessMonitorlog: "allAccessMonitorlog",
    SubcribeAllAccessLog: 'SubcribeAllAccessLog',
    SubscribeAlarmLog: 'SubscribeAlarmLog',
    SubscribeFaceLog: 'SubscribeFaceLog',
    SubscribeVehicleLog: 'SubscribeVehicleLog',
    SubscribeEFenceLog: 'SubscribeEFenceLog',
    SubscribeWiFiLog: 'SubscribeWiFiLog',
    SubscribeAllAlarmData: 'SubscribeAllAlarmData',
    SubscribeAllVehicleLog: "SubscribeAllVehicleLog",
    SubscribeAllFaceLog: "SubscribeAllFaceLog"
};
exports.AlarmType = {
    Face: 'Face',
    Vehicle: 'Vehicle',
    Efence: 'Efence',
    Wifi: 'Wifi'
};
