/** create by zxq
 * 智能分析任务
 * @time: 2017-06-05 14:03:13
 * @params:
 * @return:
 */
export class IvsTaskModel{
    // 编号
    ID:string;
    // 布控任务名称
    Name:string;
    // 抓拍相机ID
    CameraID:string;
    // 分配的pcc
    IvsServerID:string;
    // 任务状态 (0:false 1:true)
    Status:boolean;
    // 最小人像大小
    DetectMinSize:number;
    // 最大人像大小
    DetectMaxSize:number;
    // 布控区域（左边距）
    VideoLeft:number;
    // 布控区域（上边距）
    VideoTop:number;
    // 布控区域（下边距）
    VideoBottom:number;
    // 布控区域（右边距）
    VideoRight:number;
    // 任务分组id
    IvsTaskGroupID:string;
    // 扩展JSON数据
    Ext:string;
}