import {TableParams} from "./table/TableParams";

/**
 * 排序对象.
 */
export default class OrderBy {
    //排序字段名
    fieldName: string;
    //是否为升序
    isAsc: boolean = false;
}


// 以图搜图查询基础类
export class BaseSearchModel extends TableParams {
          
    /**
     * 搜索文本框.
     */
    keyWord: string;

    /**
     * 任务ID.
     */
    taskId: string;
    
    /**
     * 是否第一次查询.
     */
    isFirstSearch: boolean;

    /**
     * 查询日期类型.
     */
    dateType: string;

    /**
     * 包含FieldName（排序字段）、IsAsc（是否升序），默认为降序DES
     */ 
    OrderBy: OrderBy;
}

/**
 * 快速检索查询参数.
 * create by zmp.
 * @time: 2017-08-29
 */

 // 快速检索关键字检索参数
export class QuickSearchParams extends BaseSearchModel {

    /**
     * 资源类型
     */
    objectType: string;
    
    /**
     * 关键字数据类型如：MAC、车牌等文本.
     */
    dataType: string;

    /**
     * 任务ID分页的时候使用.
     */
    taskID: string;

    /**
     * 查询日期开始时间.
     */
    beginTime: string;

    /**
     * 查询日期结束时间.
     */
    endTime: string;

    /**
     * 区域ID.
     */
    areaId: Array<string>;

    /**
     * 设备对象ID数组
     */
    arrObjectID: Array<string>;
    /**
     * 用户id
     */
    userId:string;

}


// 快速检索、高级检索-人脸检索参数实体
export class SearchFaceParams extends BaseSearchModel {

    // 上传的图片URL地址
    imagePath: string;

    // 起始时间
    startTime: string;

    // 结束时间
    endTime: string;

    // 相似度阀值
    threshold: number;

    // 性别 GenderType枚举
    arrGender: Array<string>;

    // 最小年龄
    minAge: number;

    // 最大年龄
    maxAge: number;

    // 是否戴眼镜 空:全部, 0：没戴，1：戴，-1:未知
    arrEyeGlasses: Array<number>;

    // 是否微笑，0：否，1：是，-1:未知
    arrSmile: Array<number>;

    // 是否带口罩  空:全部, 0：没戴，1：戴，-1:未知
    arrMask: Array<number>;

    // 是否穿短裤  0：否，1：是
    arrIsPants: Array<number>;

    // 是否穿短袖 0：否，1：是
    arrIsSleeve: Array<number>;

    // 模式：全部、人脸、人体、人像检索
    arrType: Array<string>;

    // 发型：长发、中长发、短发、秃头、束发、未知
    arrHairType: Array<string>;

    // 发型：长发、中长发、短发、秃头、束发、未知
    arrCarryThings: Array<string>;

    // 是否戴帽子 空:全部, 0：没戴，1：戴，-1:未知
    arrHat: Array<number>;

    // 鞋子：全部、运动鞋、皮鞋、拖鞋、凉鞋、未知
    arrShoes: Array<string>;

    // 区域ID数组，String[]类型，类源于业务系统
    arrAreaID: Array<string>;

    // 抓拍相机ID集合
    arrCameraId: Array<string>;
}

// 快速检索、高级检索-WiFi、电子围栏检索参数实体
export class SearchMacParams extends BaseSearchModel {

    // MACAddress: string;

    // hotspotSSID: string;

    // hotspotMACAddress: string;

    // hotspotNumber: string;

    // 检索时间类型(枚举：近一天、近三天、近一周、自定义)
    dateType: string;

    // 开始时间（时间范围）
    startTime: string;

    // 结束时间
    endTime: string;

    // 区域id数组
    area: Array<string>;

    // 采集设备ID数组
    arObjectID: Array<string>;
/* 
    IMSI: string;

    IMEI: string; */
}

/**
 * 资源检索-设备检索存储过程名称
 */
export const ResourceDeviceProcNames = {

    CameraDeviceSearchProcName: {"text": "获取摄像机设备存储过程名称", "value": "PROC_GET_CAMERA(?,?,?,?)"},

    RmpGateDeviceSearchProcName: {"text": "获取卡口设备存储过程名称", "value": "PROC_GET_RMPGATE(?,?,?,?)"},

    WiFiDeviceSearchProcName: {"text": "获取WiFi设备存储过程名称", "value": "PROC_GET_WIFIDEVICE(?,?,?,?)"},

    EFenceDeviceSearchProcName: {"text": "获取电子围栏设备存储过程名称", "value": "PROC_GET_EFENCEDEVICE(?,?,?,?)"}
}