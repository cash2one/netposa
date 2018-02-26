/**
 * socket返回的类型枚举
 * @type {{DeployContolr: string; Retrieval: string; Track: string; FaceRetrieval: string}}
 */
export const SocketResultTypeEnum = {
    // 动态布控
    DeployControl: "1",
    // 轨迹分析
    Track: "SearchAccessLog",
    // 人脸检索
    FaceRetrieval: "SearchFace",
    //报警检索
    alarm: 'SearchAlarmLog',
    // 检索记录
    Retrieval: "SearchRetrievalLog",
    //人脸1:1
    VerifyFace: "VerifyFace",
    //用户在线状态
    UserOnLine: "UserOnLine",
    //设备在线状态
    CameraOnLine: "CameraOnLine",
    //服务器在线状态
    ServerOnLine: "ServerOnLine",
    // 通行日志,动态布控点击摄像机订阅信息用
    SubcribeAccessLog: "SubcribeAccessLog",
    // 动态布控, 报警推送 和 右下角报警弹窗用
    SubcribeAlarmLog: "SubcribeAlarmLog",
    // 任务审核推送用
    TaskVerify: "TaskVerify",
    // 用户强制下线用
    UserOffLine: "UserOffLine",
    //导出
    Export: "Export",
    // 资源检索--高级检索
    FaceSearch: "SearchAccessLogByImage",
    // 搜索人脸
    SearchFace: "SearchFace",
    // 资源检索--车辆检索
    CarSearch: "SearchVehicleByImageFromPVD",
    // 车辆报警
    allVehicleMonitorlog: "allVehicleMonitorlog",
    //人像报警
    allAccessMonitorlog: "allAccessMonitorlog",

    SubcribeAllAccessLog: 'SubcribeAllAccessLog',


    /*新的订阅类型*/

    //订阅报警（根据类型区分）
    SubscribeAlarmLog: 'SubscribeAlarmLog',

    //订阅人脸抓拍
    SubscribeFaceLog: 'SubscribeFaceLog',

    //订阅过车记录
    SubscribeVehicleLog: 'SubscribeVehicleLog',

    //订阅电围记录
    SubscribeEFenceLog: 'SubscribeEFenceLog',

    //订阅WIfi记录
    SubscribeWiFiLog: 'SubscribeWiFiLog',

    //全局订阅所有类型
    SubscribeAllAlarmData: 'SubscribeAllAlarmData',

    //全部车辆通行记录
    SubscribeAllVehicleLog: "SubscribeAllVehicleLog",

    //全部人像通行记录（资源态势界面，随机）
    SubscribeAllFaceLog: "SubscribeAllFaceLog"

};

export const AlarmType = {
    Face: 'Face',
    Vehicle: 'Vehicle',
    Efence: 'Efence',
    Wifi: 'Wifi'
}
