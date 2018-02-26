/**
 * 地图服务配置参数.
 * create by zmp.
 * @time: 2017-08-10
 */
export class MapConfigParameterExt {
    // 地图名称
    layerName: string;

    // 地图服务地址
    url: string;

    // 默认图层层级
    defaultZoom: number;

    // 最大缩放图层层级
    maxZoom: number;

    // 最小缩放图层层级
    minZoom: number;

    // 地图编码
    displayProjection: string;

    // 投影（类似编码   默认 4326）
    projection: number = 4326;

    // 中心点经纬度
    centerPoint: CenterPoint;

    // 地图类型(默认 NPMapLib.Layers.NPLayer)
    layerType: string = "NPMapLib.Layers.NPLayer";

    // 地图显示的限制范围([0, 0, 0, 0])
    restrictedExtent: RestrictedExtent;

    //描述字段
    desc: string;
}


// 中心点经纬度
export class CenterPoint {
    // 纬度
    Lat: string;

    //经度
    Lon: string;
}

// 可见区域经纬度
export class RestrictedExtent {
    // 最大纬度
    maxLat: string;

    // 最大经度
    maxLon: string;

    // 最小纬度
    minLat: string;

    // 最小经度
    minLon: string;
}

// 地图配置常量参数类别
export const MapConfigParamConst = {
    FieldName: {value: "ParamClass"},
    FieldValue: {value: "MapConfigParameter"}
};