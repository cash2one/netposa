
// 添加收藏参数
export interface CollectAddParams{
    json: string;
    objectID: string;
    objectType: string;
    userId: string;
    // 收藏的类型 对应这个枚举CollectDataType
    dataType: string;
}

// 删除收藏参数
export interface CollectDeleteParams{
    ids: Array<string>
}

export class SearchCollectParams{
    userID: string;
    // 输入单个对象类型进行查询, 
    objectType: string;
    // 开始时间
    startTime: string;
    // 结束时间
    endTime: string;
}