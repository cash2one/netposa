
interface Enum {
    value: string;
    text: string
}

interface ILayerType {
    Camera: Enum,
    NormalCamera: Enum,
    CarCamera: Enum,

    HighCamera: Enum,
    PortraitCamera: Enum,
    FaceCamera: Enum,
    WiFi: Enum,
    ElectronicFence: Enum,
    RmpGate: Enum,
    LampPost: Enum,
    Others: Enum
}
export const LayerType: { [key: string]: Enum } & ILayerType = {
    Camera: { value: 'Camera', text: '普通摄像机' },
    NormalCamera: { value: 'NormalCamera', text: '普通摄像机' },
    CarCamera: { value: 'CarCamera', text: '车辆摄像机' },

    HighCamera: { value: "HighCamera", text: "高清摄像机" },
    PortraitCamera: { value: 'PortraitCamera', text: '人像摄像机' },
    FaceCamera: { value: "FaceCamera", text: "人脸摄像机" },
    WiFi: { value: "WiFi", text: "wifi" },
    ElectronicFence: { value: "ElectronicFence", text: "电子围栏" },
    RmpGate: { value: "RmpGate", text: "卡口" },
    LampPost: { value: 'LampPost', text: "立杆" },
    Others: { value: 'Others', text: '其他' }
};