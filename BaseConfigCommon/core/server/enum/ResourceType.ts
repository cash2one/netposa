/**
 * 资源检索搜索类型.
 * create by zmp.
 * @time: 2017-08-29
 */
export const ResourceTypeEnum = [
    // 全部
    { value: "All", text: "全部" },
    // 人像
    { value: "Face", text: "人像" },
    // 车辆
    { value: "Vehicle", text: "车辆" },
    // 摄像机
    { value: "Camera", text: "摄像机" },
    // RFID
    { value: "RfiD", text: "RFID" },
    // WIFI
    { value: "WiFi", text: "WiFi" },
    // LOCATION
    { value: "LOCATION", text: "位置" },
    // ElectronicFence
    { value: "EFENCE", text: "电子围栏" },
    // RmpGate
    { value: "RmpGate", text: "卡口" },
    // 设备
    { value: "Device", text: "设备" },
    // 摄像机设备
    { value: "DeviceCamera", text: "设备：像机" },
    // WiFi设备
    { value: "DeviceWiFi", text: "设备：WiFi" },
    // 卡口设备
    { value: "DeviceRmpGate", text: "设备：卡口" },
    // 电子围栏设备
    { value: "DeviceEFENCE", text: "设备：电围" }
] as { value: string, text: string }[];

/**
 * 返回摄像机设备类型名称.
 */
let func: Function = (function () {
    let resouceType = {} as { [key: string]: string },
        All = ResourceTypeEnum[0],
        Face = ResourceTypeEnum[1],
        Vehicle = ResourceTypeEnum[2],
        Camera = ResourceTypeEnum[3],
        Rfid = ResourceTypeEnum[4],
        Wifi = ResourceTypeEnum[5],
        Location = ResourceTypeEnum[6],
        ElecttonicFence = ResourceTypeEnum[7],
        RmpGate = ResourceTypeEnum[8];


    if (Face) {
        resouceType[Face.value] = Face.text;
    }
    if (Vehicle) {
        resouceType[Vehicle.value] = Vehicle.text;
    }
    if (Camera) {
        resouceType[Camera.value] = Camera.text;
    }
    if (Rfid) {
        resouceType[Rfid.value] = Rfid.text;
    }
    if (Wifi) {
        resouceType[Wifi.value] = Wifi.text;
    }
    if (Location) {
        resouceType[Location.value] = Location.text;
    }
    if (ElecttonicFence) {
        resouceType[ElecttonicFence.value] = ElecttonicFence.text;
    }
    if (RmpGate) {
        resouceType[RmpGate.value] = RmpGate.text;
    }
    // 闭包,最终作为函数返回
    return function (type: string): string {
        return (resouceType[type]);
    }
})();

export let GetResourceType = func as (type: string) => string;