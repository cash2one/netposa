import {ValueTextEnumType} from "../../enum/Enum";

/**
 * 命令类型.
 * create by zmp.
 * @time: 2017-09-01
 */
export const CommandType: ValueTextEnumType = {
    /**
     * 未知.
     */
    Unknow: {value: "Unknow", text: "未知"},  
    /**
     * 获取pcc节点信息.
     */
    ListNodesInfo: {value: "ListNodesInfo", text: "获取pcc节点信息"},  
    /**
     * 检测人脸.
     */
    CheckFace: {value: "checkFace", text: "检测人脸"},  
    /**
     * 人脸特征提取.
     */
    DetectFace: {value: "detectFace", text: "人脸特征提取"},  
    /**
     * 添加结构化任务.
     */
    CreateStructTask: {value: "createStructTask", text: "添加结构化任务"},  
    /**
     * 查询任务状态.
     */
    QueryJobs: {value: "queryJobs", text: "查询任务状态"},  
    /**
     * 删除任务.
     */
    CancelTask: {value: "cancelTask", text: "删除任务"},  
}