/**
 * 存放数据库中存在的地图基本配置参数类型
 * @type {{value: string; text: string}[]}
 */
export const MapParameterObj = {
    MapBaseInfo: {value: "MapBaseInfo", text: "地图基础参数"},
    MapInitDefaultLevel: {value: "MapInitDefaultLevel", text: "地图初始化级别"},
    PointClusterDistance: {value: "PointClusterDistance", text: "点位聚合距离"},
    AppRefreshTime: {value: "AppRefreshTime", text: "APP 刷新时间"}
};

export const MapParameterType = [
    {value: MapParameterObj.MapBaseInfo, text: "地图基础参数"},
    {value: MapParameterObj.MapInitDefaultLevel, text: "地图初始化级别"},
    {value: MapParameterObj.PointClusterDistance, text: "点位聚合距离"},
    {value: MapParameterObj.AppRefreshTime, text: "APP 刷新时间"}
];

