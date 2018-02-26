"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandType = {
    Unknow: { value: "Unknow", text: "未知" },
    ListNodesInfo: { value: "ListNodesInfo", text: "获取pcc节点信息" },
    CheckFace: { value: "checkFace", text: "检测人脸" },
    DetectFace: { value: "detectFace", text: "人脸特征提取" },
    CreateStructTask: { value: "createStructTask", text: "添加结构化任务" },
    QueryJobs: { value: "queryJobs", text: "查询任务状态" },
    CancelTask: { value: "cancelTask", text: "删除任务" },
};
