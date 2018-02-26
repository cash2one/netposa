// 多选参数
export interface multipleChoice {
    id: number;
    value: any;
    key: string;
    status?: boolean;
}

// 添加收藏参数
export class CollectAddParams {
    json: string;
    objectID: string;
    objectType: string;
}

// 删除收藏参数
export class CollectDeleteParams {
    ids: string;
}

// 性别列表
export function AmbitusList(): Array<multipleChoice> {
    let data: Array<multipleChoice> = [
        {
            id: 0,
            value: "车辆 ",
            key: "Vehicle",
            status: false
        }, {
            id: 1,
            value: "人像",
            key: "Face",
            status: false
        }, {
            id: 2,
            value: "WIFI",
            key: "WiFi",
            status: false
        }, {
            id: 3,
            value: "电围",
            key: "EFENCE",
            status: false
        }];
    return data
}

// 人员档案参数
export class QueryPersionLibraryParams {
    imagePath: string; // 上传图片识别人脸
    arrLibId: Array<string>; // 选中人像库
    threshold: number; // 相似度
    retrievalReason: string; // 检索事由
    taskId: string;
    featureSearchExt: {
        accessLogId: string;
        featureType: string;
        imgUrl: string;
        libId: string;
    }
}