import PageParams from "../common/directive/page/page-params";

// 查询历史对象
export class QueryItem {
    id: number;
    value: string;
    key?: string;
    status?: boolean;
    fetureTaskParam?: any;
    featureSearchExt?: any;
}

export class VehicleQueryItem extends QueryItem{
    imagePath: string;
}

export class Size {
    width: number;
    height: number
}

declare let $: any;

// 定义单一车辆数据
export class car {
    id: string;
    private orgId: string;
    private monitorId: string;
    private channelId: string;
    private deviceId: string;
    private originalVehicleInfo: string;
    private speed: number;
    private direction: string;
    private accessType: string;
    private plateNumber: string;
    private plateType: string;
    private plateColor: string;
    private vehicleType: string;
    private vehicleColor: string;
    private vehicleBrand: string;
    private vehicleSubBrand: string;
    private vehicleModelYear: string;
    private sunVisorNumber: string;
    private napkinBox: number;
    private pendantNum: number;
    private checkMarkNum: number;
    private safetyBeltNum: number;
    private faceNumber: string;
    private vehicleContour: string;
    private panoramaImage: string;
    private featureImage: string;
    private imageType: string;
    private storageTime: string;
    private xszt: string;
    private yzsj: string;
    private wzlx: string;
    private sjcz: number;
    private hostCode: string;
    private extNumber: number;
    private extDate: string;
    private extString1: string;
    private extString2: string;
    private extString3: string;
    private org: string;
    private monitor: string;
    private channel: string;
    private x: number;
    private y: number;
    private monitorName: string;
    private sjly: string;
    private isCallPhone: number;
    private qjtp2: string;
    private qjtp3: string;
    private qjtp4: string;
    private tztp2: string;
    private judgeDecision: string;
    private judgeInfo: string;
    private xxPlateId: string;
    private score: number;
    private passTimeStr: string;
    private passTime: string;
    collectStatus?: boolean;
    surveillanceStatus?: boolean;

    [propName: string]: any;
}

// 定义单一人脸数据
export interface face {
    AccessLog: {
        Age: number;
        AreaID: string;
        Attractive: number;
        BottomColor: number;
        CameraID: string;
        FaceConfidence: number;
        FacePath: string;
        FaceRect: string;
        Gender: string;
        Glass: number;
        HasextractAttribute: boolean,
        HasextractFeature: boolean,
        HasfaceFeature: boolean,
        ID: string;
        IsPants: number;
        IsSleeve: number;
        LogTime: string;
        Mask: number;
        Orientation: number;
        PersonConfidence: string;
        PersonPath?: string;
        PersonRect?: string;
        Race: number;
        ScenePath: string;
        Smile: number;
        SunGlasses?: number;
        TaskID: string;
        Texture: number;
        UpperColor: number;
    };
    Score?: number;
    DeviceType?: string;
    collectStatus?: boolean;
    surveillanceStatus?: boolean;

    [propName: string]: any;
}

// 定义单一wifi数据
export interface wifi {
    DeviceType: string;
    wifiLog: {
        AcqTime: string;
        AreaId: string;
        Brand: string;
        ID: string;
        IdentityContent: string;
        IdentityType: string;
        Mac: string;
        MacDeviceId: string;
        PointX: string;
        PointY: string;
        Rssi: string;
        SsidList: string;
        taskId: string;
    };
    collectStatus?: boolean;
    surveillanceStatus?: boolean;

    [propName: string]: any;
}

// 定义单一电围数据
export interface electronic {
    DeviceType: string;
    eFenceLog: {
        AcqTime: string;
        AreaId: string;
        ID: string;
        IMEI: string;
        IMSI: string;
        IMSI2: string;
        Mac: string;
        MobileDeviceId: string;
        taskId: string;
    };
    collectStatus?: boolean;
    surveillanceStatus?: boolean;
    [propName: string]: any;
}

// 定义单一设备数据
export interface device {
    Id: string;
    AreaId: string;
    Code: string;
    IpAddress: string;
    ObjectType: string;
    Direct: string;
    Lat: string;
    Lon: string;
    Name: string;
    BuildLocation?: string;
    collectStatus?: boolean;

    [propName: string]: any;
}

// 定义单一位置数据
export interface position {
    id: string;
    name: string;
    time: string;
    address?: string;
    latLon?: string;
    collectStatus?: boolean;

    [propName: string]: any;
}

// 定义快速检索查询参数
export interface QuickSearchParams {
    keyWord: string;
    keyWords: Array<string>;
    objectType: string;
    currentPage: number;
    pageSize: number;
    orderBy: any;
    taskId?: string;
    isFirstSearch?: boolean;
    arrObjectID?: Array<string>;
    areaId?: Array<string>;
    timeBegin?: string;
    timeEnd?: string;
    userId: string;
    [propName: string]: any;
}

// 定义车辆数据包括分页信息与车辆列表数据
export class carItem {
    pageParams: PageParams;
    taskId?: string;
    data: Array<car>;
}

export class faceItem {
    pageParams: PageParams;
    taskId?: string;
    data: Array<face>;
}

export class wifiItem {
    pageParams: PageParams;
    taskId?: string;
    data: Array<wifi>;
}

export class rfidItem {
    pageParams: PageParams;
    taskId?: string;
    data: Array<any>;
}

export class electronicItem {
    pageParams: PageParams;
    taskId?: string;
    data: Array<electronic>;
}

export class deviceItem {
    pageParams: PageParams;
    taskId?: string;
    data: Array<device>;
}

export class positionItem {
    pageParams: PageParams;
    data: Array<position>;
}

// 初始化快速检索数据
export function initCarResult(num: number): carItem {
    let queryResult = {} as carItem;
    queryResult.data = [];

    let pageParams = new PageParams();
    pageParams.pageSize = 6;
    pageParams.currentPage = 1;
    pageParams.totalCount = 0;
    pageParams.pageCount = 0;
    queryResult.pageParams = pageParams;
    queryResult.data = [];
    return queryResult;

}

// 初始化人脸数据
export function initFaceResult(num: number): faceItem {
    let queryResult = {} as faceItem;
    queryResult.data = [];

    let pageParams = new PageParams();
    pageParams.pageSize = 6;
    pageParams.currentPage = 1;
    pageParams.totalCount = 0;
    pageParams.pageCount = 0;
    queryResult.pageParams = pageParams;

    // 模拟数据
    let mock = [
        {
            "Age": 27,
            "AreaID": "areaId37",
            "Attractive": -1,
            "BottomColor": 0,
            "CameraID": "关山大道保利国际",
            "FaceConfidence": 0,
            "FacePath": "/images/recording/0000-30.PNG",
            "FaceRect": "[{'X':27,'Y':27},{'X':81,'Y':27},{'X':81,'Y':81},{'X':27,'Y':110}]",
            "Gender": "2",
            "Glass": -1,
            "HasextractAttribute": false,
            "HasextractFeature": false,
            "HasfaceFeature": false,
            "ID": "6.82109E+17",
            "IsPants": 0,
            "IsSleeve": 0,
            "LogTime": "2017-09-30 14:31:21",
            "Mask": 0,
            "Orientation": 0,
            "PersonConfidence": "0",
            "Smile": 0,
            "SunGlasses": 0,
            "TaskID": "a0474dd855424eaa8f820e1da16ad32ab",
            "Texture": 0,
            "UpperColor": 0,
            "Race": 0,
            "ScenePath": "LOC:402201323/data/20170818/00/3e1f96c665d22048ea4f514b76119ed0_79183"
        },
        {
            "Age": 26,
            "AreaID": "areaId36",
            "Attractive": -1,
            "BottomColor": 0,
            "CameraID": "关山大道保利国际",
            "FaceConfidence": 0,
            "FacePath": "/images/recording/0000-29.PNG",
            "FaceRect": "[{'X':27,'Y':27},{'X':81,'Y':27},{'X':81,'Y':81},{'X':27,'Y':109}]",
            "Gender": "2",
            "Glass": -1,
            "HasextractAttribute": false,
            "HasextractFeature": false,
            "HasfaceFeature": false,
            "ID": "6.82109E+17",
            "IsPants": 0,
            "IsSleeve": 0,
            "LogTime": "2017-09-29 14:27:21",
            "Mask": 0,
            "Orientation": 0,
            "PersonConfidence": "0",
            "Smile": 0,
            "SunGlasses": 0,
            "TaskID": "a0474dd855424eaa8f820e1da16ad31ab",
            "Texture": 0,
            "UpperColor": 0,
            "Race": 0,
            "ScenePath": "LOC:402201323/data/20170818/00/3e1f96c665d22048ea4f514b76119ed0_79183"
        },
        {
            "Age": 28,
            "AreaID": "areaId35",
            "Attractive": -1,
            "BottomColor": 0,
            "CameraID": "关山大道保利国际",
            "FaceConfidence": 0,
            "FacePath": "/images/recording/0000-28.PNG",
            "FaceRect": "[{'X':27,'Y':27},{'X':81,'Y':27},{'X':81,'Y':81},{'X':27,'Y':108}]",
            "Gender": "2",
            "Glass": -1,
            "HasextractAttribute": false,
            "HasextractFeature": false,
            "HasfaceFeature": false,
            "ID": "6.82109E+17",
            "IsPants": 0,
            "IsSleeve": 0,
            "LogTime": "2017-09-28 14:23:21",
            "Mask": 0,
            "Orientation": 0,
            "PersonConfidence": "0",
            "Smile": 1,
            "SunGlasses": 0,
            "TaskID": "a0474dd855424eaa8f820e1da16ad30ab",
            "Texture": 0,
            "UpperColor": 0,
            "Race": 0,
            "ScenePath": "LOC:402201323/data/20170818/00/3e1f96c665d22048ea4f514b76119ed0_79183"
        },
        {
            "Age": 55,
            "AreaID": "areaId34",
            "Attractive": -1,
            "BottomColor": 0,
            "CameraID": "关山大道保利国际",
            "FaceConfidence": 0,
            "FacePath": "/images/recording/0000-27.PNG",
            "FaceRect": "[{'X':27,'Y':27},{'X':81,'Y':27},{'X':81,'Y':81},{'X':27,'Y':107}]",
            "Gender": "1",
            "Glass": -1,
            "HasextractAttribute": false,
            "HasextractFeature": false,
            "HasfaceFeature": false,
            "ID": "6.82109E+17",
            "IsPants": 0,
            "IsSleeve": 0,
            "LogTime": "2017-09-27 14:19:21",
            "Mask": 0,
            "Orientation": 0,
            "PersonConfidence": "0",
            "Smile": -1,
            "SunGlasses": 0,
            "TaskID": "a0474dd855424eaa8f820e1da16ad29ab",
            "Texture": 0,
            "UpperColor": 0,
            "Race": 0,
            "ScenePath": "LOC:402201323/data/20170818/00/3e1f96c665d22048ea4f514b76119ed0_79183"
        },
        {
            "Age": 28,
            "AreaID": "areaId33",
            "Attractive": -1,
            "BottomColor": 0,
            "CameraID": "关山大道保利国际",
            "FaceConfidence": 0,
            "FacePath": "/images/recording/0000-26.PNG",
            "FaceRect": "[{'X':27,'Y':27},{'X':81,'Y':27},{'X':81,'Y':81},{'X':27,'Y':106}]",
            "Gender": "2",
            "Glass": -1,
            "HasextractAttribute": false,
            "HasextractFeature": false,
            "HasfaceFeature": false,
            "ID": "6.82109E+17",
            "IsPants": 0,
            "IsSleeve": 0,
            "LogTime": "2017-09-26 14:15:21",
            "Mask": 0,
            "Orientation": 0,
            "PersonConfidence": "0",
            "Smile": -1,
            "SunGlasses": 0,
            "TaskID": "a0474dd855424eaa8f820e1da16ad28ab",
            "Texture": 0,
            "UpperColor": 0,
            "Race": 0,
            "ScenePath": "LOC:402201323/data/20170818/00/3e1f96c665d22048ea4f514b76119ed0_79183"
        },
        {
            "Age": 59,
            "AreaID": "areaId32",
            "Attractive": -1,
            "BottomColor": 0,
            "CameraID": "关山大道保利国际",
            "FaceConfidence": 0,
            "FacePath": "/images/recording/0000-25.PNG",
            "FaceRect": "[{'X':27,'Y':27},{'X':81,'Y':27},{'X':81,'Y':81},{'X':27,'Y':105}]",
            "Gender": "1",
            "Glass": -1,
            "HasextractAttribute": false,
            "HasextractFeature": false,
            "HasfaceFeature": false,
            "ID": "6.82109E+17",
            "IsPants": 0,
            "IsSleeve": 0,
            "LogTime": "2017-09-25 14:11:21",
            "Mask": 0,
            "Orientation": 0,
            "PersonConfidence": "0",
            "Smile": 0,
            "SunGlasses": 0,
            "TaskID": "a0474dd855424eaa8f820e1da16ad27ab",
            "Texture": 0,
            "UpperColor": 0,
            "Race": 0,
            "ScenePath": "LOC:402201323/data/20170818/00/3e1f96c665d22048ea4f514b76119ed0_79183"
        },
        {
            "Age": 25,
            "AreaID": "areaId31",
            "Attractive": -1,
            "BottomColor": 0,
            "CameraID": "关山大道保利国际",
            "FaceConfidence": 0,
            "FacePath": "/images/recording/0000-24.PNG",
            "FaceRect": "[{'X':27,'Y':27},{'X':81,'Y':27},{'X':81,'Y':81},{'X':27,'Y':104}]",
            "Gender": "2",
            "Glass": 1,
            "HasextractAttribute": false,
            "HasextractFeature": false,
            "HasfaceFeature": false,
            "ID": "6.82109E+17",
            "IsPants": 0,
            "IsSleeve": 0,
            "LogTime": "2017-09-24 14:07:21",
            "Mask": 0,
            "Orientation": 0,
            "PersonConfidence": "0",
            "Smile": -1,
            "SunGlasses": 0,
            "TaskID": "a0474dd855424eaa8f820e1da16ad26ab",
            "Texture": 0,
            "UpperColor": 0,
            "Race": 0,
            "ScenePath": "LOC:402201323/data/20170818/00/3e1f96c665d22048ea4f514b76119ed0_79183"
        },
        {
            "Age": 14,
            "AreaID": "areaId30",
            "Attractive": -1,
            "BottomColor": 0,
            "CameraID": "关山大道保利国际",
            "FaceConfidence": 0,
            "FacePath": "/images/recording/0000-23.PNG",
            "FaceRect": "[{'X':27,'Y':27},{'X':81,'Y':27},{'X':81,'Y':81},{'X':27,'Y':103}]",
            "Gender": "2",
            "Glass": -1,
            "HasextractAttribute": false,
            "HasextractFeature": false,
            "HasfaceFeature": false,
            "ID": "6.82109E+17",
            "IsPants": 0,
            "IsSleeve": 0,
            "LogTime": "2017-09-23 14:03:21",
            "Mask": 0,
            "Orientation": 0,
            "PersonConfidence": "0",
            "Smile": -1,
            "SunGlasses": 0,
            "TaskID": "a0474dd855424eaa8f820e1da16ad25ab",
            "Texture": 0,
            "UpperColor": 0,
            "Race": 0,
            "ScenePath": "LOC:402201323/data/20170818/00/3e1f96c665d22048ea4f514b76119ed0_79183"
        }
    ];
    let mockList = [] as Array<face>;
    for (let i = 0; i < 30 && i < num; i++) {
        mockList.push({
            "AccessLog": mock[i],
            "DeviceType": "Camera",
            "collectStatus": false,
            "surveillanceStatus": false
        } as face);
    }
    queryResult.data = mockList;
    return queryResult;
}

// 初始化wifi数据
export function initWifiResult(num: number): wifiItem {
    let queryResult = {} as wifiItem;
    queryResult.data = [];
    let pageParams = new PageParams();
    pageParams.pageSize = 6;
    pageParams.currentPage = 1;
    pageParams.totalCount = 30;
    pageParams.pageCount = 5;
    queryResult.pageParams = pageParams;
    queryResult.data = [];
    return queryResult;
}

// 初始化电围数据
export function initElectronicResult(): electronicItem {
    let queryResult = {} as electronicItem;
    queryResult.data = [];
    let pageParams = new PageParams();
    pageParams.pageSize = 5;
    pageParams.currentPage = 1;
    pageParams.totalCount = 0;
    pageParams.pageCount = 0;
    queryResult.pageParams = pageParams;

    return queryResult;
}

// 初始化设备数据
export function initDeviceResult(type: string): deviceItem {
    let queryResult = {} as deviceItem;
    queryResult.data = [];
    let pageParams = new PageParams();
    pageParams.pageSize = 5;
    pageParams.currentPage = 1;
    pageParams.totalCount = 0;
    pageParams.pageCount = 0;
    queryResult.pageParams = pageParams;

    // // 模拟数据
    // let mock = {"Id": "df0001", "AreaId": "1", "Code": "SSFDW425", "IpAddress": "关山大道保利国际", "ObjectType": "WIFI", "Direct": "1", "Lat": "114.417366", "Lon": "30.497333", "Name": "关山大道保利国际-SSFDW425", "BuildLocation": "1", "collectStatus": false};
    // let mockList = [];
    // for (let i = 0; i < 5; i++) {
    //     mock.Code = type + '-' + mock.Code;
    //     mock.ObjectType = type;
    //     mockList.push(mock);
    // }
    // queryResult.data = mockList;

    return queryResult;
}

// 初始化位置数据
export function initPositionResult(): positionItem {
    let queryResult = {} as positionItem;
    queryResult.data = [];
    let pageParams = new PageParams();
    pageParams.pageSize = 10;
    pageParams.currentPage = 1;
    pageParams.totalCount = 0;
    pageParams.pageCount = 0;
    queryResult.pageParams = pageParams;

    queryResult.data = [];

    return queryResult;
}

// 添加收藏参数
export interface CollectAddParams {
    json: string,
    objectID: string,
    objectType: string
}

// 删除收藏参数
export interface CollectDeleteParams {
    ids: string
}

/**
 * @description 计算宽度
 * @returns {Size}
 */
export function getWidowSize(): Size {
    let size = new Size();
    size.width = $(window).width();
    size.height = $(window).height();
    return size;
}

/**
 *
 * @description 设置查询历史数据
 * @param {string} str
 * @returns {Array<QueryItem>}
 * @constructor
 */
export function SetQueryRecord(str: string): Array<QueryItem> {
    let value: string = localStorage.getItem('resourceRetrievalQueryRecord');
    let queryRecord = [] as Array<QueryItem>;
    let arr = [] as Array<QueryItem>;

    if (str && str != 'undefined' && str != 'null' && str != '') {
        arr.push({id: 0, value: str});
    }

    if (value && value != 'undefined' && value != 'null') {
        queryRecord = JSON.parse(value);
    }

    for (let i = 0; i < queryRecord.length; i++) {
        if (arr.length < 20) {
            // 去除重复搜索
            if (arr[0].value !== queryRecord[i].value) {
                arr.push({id: i + 1, value: queryRecord[i].value.toString()});
            }
        } else {
            break;
        }
    }

    localStorage.setItem('resourceRetrievalQueryRecord', JSON.stringify(arr));
    return null;
}

/**
 *
 * @description 设置查询历史数据
 * @param {string} str
 * @returns {Array<QueryItem>}
 * @constructor
 */
export function SetSearchRecord(str: string): Array<QueryItem> {
    let value: string = localStorage.getItem('SetSearchRecord');
    let queryRecord = [] as Array<QueryItem>;
    let arr = [] as Array<QueryItem>;

    if (str && str != 'undefined' && str != 'null' && str != '') {
        arr.push({id: 0, value: str});
    }

    if (value && value != 'undefined' && value != 'null') {
        queryRecord = JSON.parse(value);
    }

    for (let i = 0; i < queryRecord.length; i++) {
        if (arr.length < 20) {
            // 去除重复搜索
            if (arr[0].value !== queryRecord[i].value) {
                arr.push({id: i + 1, value: queryRecord[i].value.toString()});
            }
        } else {
            break;
        }
    }

    localStorage.setItem('resourceRetrievalQueryRecord', JSON.stringify(arr));
    return null;
}

/**
 *
 * @description 获取查询历史
 * @returns {Array<QueryItem>}
 * @constructor
 */
export function GetQueryRecord(): Array<QueryItem> {
    let value: string = localStorage.getItem('resourceRetrievalQueryRecord');
    let queryRecord = [] as Array<QueryItem>;
    let arr = [] as Array<QueryItem>;
    if (value && value != 'undefined' && value != 'null') {
        queryRecord = JSON.parse(value);
    }

    for (let i = 0; i < queryRecord.length; i++) {
        arr.push(queryRecord[i]);
    }
    return arr
}

/**
 *
 * @description 清除搜索记录缓存
 * @constructor
 */
export function ClearQueryRecord() {
    localStorage.removeItem('resourceRetrievalQueryRecord');
}

/**
 * @description设置历史搜索记录
 * @param queryParam
 * @returns {Array<any>}
 * @constructor
 */
export function SetHistoryQueryRecord(queryParam: any): Array<any> {
    let value: string = localStorage.getItem('HistoryQueryRecord');
    let queryRecord = [] as Array<any>;
    let str: string = JSON.stringify(queryParam);
    let arr = [] as Array<any>;

    if (str && str != 'undefined' && str != 'null' && str != '') {
        arr.push({id: 0, value: str});
    }

    if (value && value != 'undefined' && value != 'null') {
        queryRecord = JSON.parse(value);
    }

    for (let i = 0; i < queryRecord.length; i++) {
        if (arr.length < 6) {
            // 去除重复搜索
            if (arr[0].value !== queryRecord[i].value) {
                arr.push({id: i + 1, value: queryRecord[i].value});
            }
        } else {
            break;
        }
    }

    localStorage.setItem('HistoryQueryRecord', JSON.stringify(arr));
    return arr;
}

/**
 * @description 获取上次检索条件
 * @param queryParam
 * @returns {any}
 * @constructor
 */
export function GetLastQueryRecord(): any {
    let value: string = localStorage.getItem('HistoryQueryRecord');
    let queryRecord = [] as Array<any>;
    let arr = [] as Array<any>;
    let queryData:any;


    if (value && value != 'undefined' && value != 'null') {
        queryRecord = JSON.parse(value);
        queryData = queryRecord[1];
    }else {
        return null;
    }

    for (let i = 2; i < queryRecord.length; i++) {
        arr.push(queryRecord[i]);
    }

    localStorage.setItem('HistoryQueryRecord', JSON.stringify(arr));
    return queryData;
}

// 性别列表
export const AmbitusInfo: Array<QueryItem> = [
    {
        id: 0,
        value: "车辆 ",
        key: "Car",
        status: false
    },{
        id: 1,
        value: "人像",
        key: "Face",
        status: false
    },{
        id: 2,
        value: "WIFI",
        key: "WiFi",
        status: false
    },{
        id: 3,
        value: "电围",
        key: "EFENCE",
        status: false
    }];


// 人员档案参数
export class PersionLibraryEnum{
    LibId: string;
    LibName: string;
    PersonInfo: any;
    PersonMemo: string;
    Score: number;
}