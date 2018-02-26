import {TableParams} from "./table/TableParams";

/**
 * 任务运行状态.
 * create by zmp.
 * @time: 2017-08-11
 */
export class FindTaskListParams extends TableParams {
    // 区域ID
    areaId: string;

    // 任务名称
    name: string;

    // 任务运行状态
    taskStaus: string;

    // 任务审核状态
    // taskAuditStatus: string;

    // 任务创建开始日期
    startTime: Date;

    // 任务创建结束日期
    endTime: Date;

    userID?: string;
}

export const VideoTaskProceNames = {
    // 人脸结构化查询存储过程名称
    FaceStructTaskProceName: {value: "PROC_GET_FACE_TASK(?,?,?,?,?,?)"},

    // 车辆结构化查询过程名称
    VehicleStructTaskProceName: {value: "PROC_GET_VEHICLE_STRUCT_TASK(?,?,?,?,?)"}
} 

export const ClassNames = {
    // 视频结构化任务列表查询类名
    SearchTaskResultClass: {value: "com.np.posadp.services.model.response.SearchTaskResult"}
}

export const FieldNames = {
    IvsTaskGroupID: {value: "IvsTaskGroupID"}
}