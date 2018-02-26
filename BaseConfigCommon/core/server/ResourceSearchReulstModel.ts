/**
 * 资源检索返回结果实体类.
 * create by zmp.
 * @time: 2017-08-31
 */
export class DeviceResultModel {

    id: string;
    
    /**
     * 设备编码.
     */
    code: string;

    /**
     * 设备名称.
     */
    name: string;

    /**
     * 设备类型.
     */
    type: string;

    /**
     * 设备经纬度.
     */
    latLon: string;
}



// 人脸检索结果
export class SearchFaceResultModel {
    
    id: string;

    sex: string;

    collectTime: string;

    deviceId: string;

    latLon: string;

    fectures: Array<string>;

    Similarty: number;
}