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
    deviceInfo?: any;
}

// 定义车辆档案
export class carLience {
    [propName: string]: any;
}

// 定义单一人脸数据
export class face {
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
    Score: number;
    DeviceType: string;
    collectStatus?: boolean;
    surveillanceStatus?: boolean;
    deviceInfo?: any;
}

// 定义人员档案
export class persionLience {
    LibId: string;
    LibName: string;
    PersonInfo: any;
    PersonMemo: string;
    Score: number;
}

// 定义单一wifi数据
export class wifi {
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
    deviceInfo?: any;
}

// 定义单一电围数据
export class electronic {
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
    deviceInfo?: any;
}

// 定义单一设备数据
export class device {
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
}

// 定义单一位置数据
export class position {
    id: string;
    name: string;
    time: string;
    address?: string;
    latLon?: string;
    collectStatus?: boolean;
}

export class ResultData<T> {
    pageParams?: any;
    data: Array<T>;
    taskId?: string;
    code?: number;
    message?: string;
    status?: string;
}