/**
 * 大数据引擎返回WiFi采集记录.
 * create by zmp.
 * @time: 2017-09-14
 */
export class WiFiLog {

    ID: string;

    // 区域ID
    AreaId: string;

    // 任务ID
    TaskId: string;

    // Mac采集设备ID
    MacDeviceId: string;

    // 采集时间
    AcqTime: string;

    // 被采终端品牌
    Brand: string;

    // 被采终端场强
    Rssi: string;

    // 被采终端SSID列表
    SsidList: string;

    // 身份类型
    IdentityType: string;

    // 身份内容
    IdentityContent: string;

    // 接入热点的MAC
    ApMac: string;

    // 接入热点的SSID
    ApSsid: string;

    // 频段
    Frequency: string;

    // 信道
    Channel: string;

    // 天线
    Antenna: string;
    
    // 信噪比
    Snr: string;

    // 加密类型
    EncryptionType: string;

    // X坐标
    PointX: string;

    // y坐标
    PointY: string;

    // 数据来源
    Source: string;

    // MAC值
    Mac: string;

    // 设备类型
    DeviceType: string;
 }