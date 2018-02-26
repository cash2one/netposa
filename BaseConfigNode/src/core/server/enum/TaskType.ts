/** create by zxq
 * 任务类型
 * @time: 2017-06-05 11:57:32
 * @params:
 * @return:
 */


interface ITaskType {
    FaceMonitor: { value: string, text: string };
    FaceStruct: { value: string, text: string },
    CarMonitor: { value: string, text: string };
    MacMonitor: { value: string, text: string };
    VehicleStruct: { value: string, text: string };
    VedioStruct: { value: string, text: string };
    IMEIMonitor: { value: string, text: string };
    IMSIMonitor: { value: string, text: string };
}

interface ITaskTypeBase {
    FaceMonitor: { value: string, text: string };
    CarMonitor: { value: string, text: string };
    MacMonitor: { value: string, text: string };
    VehicleStruct: { value: string, text: string };
}

interface ITaskMonitor {
    FaceMonitor: { value: string, text: string };
    CarMonitor: { value: string, text: string };
    MacMonitor: { value: string, text: string };
}

interface IStructTask {
    FaceStruct: { value: string, text: string };
    //VehicleStruct: {value: string, text: string};

}

export const TaskType: { [key: string]: { value: string, text: string } } & ITaskType = {
    FaceMonitor: {value: "FaceMonitor", text: "人像布控"},
    FaceStruct: {value: "FaceStruct", text: "人像结构化"},
    CarMonitor: {value: "VehicleMonitor", text: "车辆布控"},
    MacMonitor: {value: "MAC", text: "MAC布控"},
    IMEIMonitor: {value: "IMEI", text: "IMEI布控"},
    IMSIMonitor: {value: "IMSI", text: "IMSI布控"},
    VehicleStruct: {value: "VehicleStruct", text: "车辆结构化"},
    VedioStruct: {value: "VedioStruct", text: "人像抓拍"},
};

export const TaskTypeBase: { [key: string]: { value: string, text: string } } & ITaskTypeBase = {
    FaceMonitor: TaskType.FaceMonitor,
    CarMonitor: TaskType.CarMonitor,
    VehicleStruct: TaskType.VehicleStruct,
    MacMonitor: TaskType.MacMonitor
};

export const TaskMonitor: { [key: string]: { value: string, text: string } } & ITaskMonitor = {
    FaceMonitor: TaskType.FaceMonitor,
    CarMonitor: TaskType.CarMonitor,
    MacMonitor: {value: 'Mac', text: '感知数据布控'}
};

export const StructTask: { [key: string]: { value: string, text: string } } & IStructTask = {
    FaceStruct: TaskType.FaceStruct,
    //VehicleStruct: TaskType.VehicleStruct
};