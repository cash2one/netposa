import {WiFiLog} from "./WiFiLog";
import {AccessLog} from "./AccessLog";
import {EFenceLog} from "./EFenceLog";

/**
 * 资源检索返回结果实体类.
 * create by zmp.
 * @time: 2017-08-31
 */
export class DeviceResult {

    Id: string;

    AreaId: string;
    
    /**
     * 摄像机类型
     */
    CameraType: string;
	
	CameraTypeString: string;

    /**
     * 设备编码.
     */
    Code: string;

    /**
     * ip地址
     */
    IpAddress: string;
    /**
     * 设备名称.
     */
    Name: string;

    /**
     * 设备端口号.
     */
    Port: string;

    ObjectType: string;

    Direct: string;

    Lat: string;

    Lon: string;

    BuildLocation: string;

    Type: string;

    InternalId: string;

    Count: string;
	
	videoServer: string;

    playName: string;

    pyCode: string;

}

// 人脸检索结果
export class SearchFaceResult {

    Score: number;

    AccessLog: AccessLog;
    // id: string;
    // // 年龄
    // age: number;
    // // 性别
    // sex: string;
    // // 通行时间
    // collectTime: Date;
    // // 设备ID
    // deviceId: string;
    // // 设备名称
    // deviceName: string;
    // // 人脸特征
    // faceFeature: string;
    // // 采集地点
    // coordinate: string;
    // // 人脸相似度
    // faceConfidence: number;
    // // 是否带眼镜
    // Glass: number;
}

// WiFi采集记录结果实体
export class SearchWiFiResult {

    wifiLog: WiFiLog;
}

export class SearchEFenceResult {

    eFenceLog: EFenceLog
}

