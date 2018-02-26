/**
 * 大数据引擎返回电子围栏采集记录.
 * create by zmp.
 * @time: 2017-09-14
 */
export class EFenceLog {

    ID: string;

    // 区域ID
    AreaId: string;

    // 检索任务ID
    TaskId: string;

    // Mobile采集设备ID
    MobileDeviceId: string;

    // 采集时间
    AcqTime: string;

    // 移动用户识别码1,存储在SIM卡中
    IMSI: string;

    // 移动用户识别码2,存储在SIM卡中
    IMSI2: string;

    // 源LAC号码
    LAC: string;

    // 短信发送状态
    SmsSendStatus: string;

    // MAC地址
    Mac: string;

    // 设备身份码IMEI
    IMEI: string;

    // 场强指示
    Nrssi: string;

    // 基站编号
    Jzbh: string;

    // 临时移动用户识别码
    TMSI: string;

    // 设备类型
    DeviceType: string;
}