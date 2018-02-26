/**
 * 可用的存储过程名
 * @desc 此处应该用于存放系统所有的存储过程名
 */
export const PROCEDURE_TYPE = {
    // 获得审核的任务(tuser, taskType, auditStatus, timeStart, timeEnd, pageIndex, pageSize, )
    PROC_GET_AUDIT_TASK: "PROC_GET_AUDIT_TASK(?,?,?,?,?,?,?,?)",
    // 获取当前用户所有的报警任务id
    PROC_GET_ALARM_ALLTASK_BYUSER: "PROC_GET_ALARM_ALLTASK_BYUSER(?)",

    PROC_GET_FACE_TASK:"PROC_GET_FACE_TASK(?,?,?,?,?,?)",

    PROC_GET_VEHICLE_STRUCT_TASK:"PROC_GET_VEHICLE_STRUCT_TASK(?,?,?,?,?)",

    PROC_GET_DEVICE_STATE:'PROC_GET_DEVICE_STATE(?)'
};