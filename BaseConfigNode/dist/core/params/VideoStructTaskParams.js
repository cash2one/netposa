"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TableParams_1 = require("./table/TableParams");
class FindTaskListParams extends TableParams_1.TableParams {
}
exports.FindTaskListParams = FindTaskListParams;
exports.VideoTaskProceNames = {
    FaceStructTaskProceName: { value: "PROC_GET_FACE_TASK(?,?,?,?,?,?)" },
    VehicleStructTaskProceName: { value: "PROC_GET_VEHICLE_STRUCT_TASK(?,?,?,?,?)" }
};
exports.ClassNames = {
    SearchTaskResultClass: { value: "com.np.posadp.services.model.response.SearchTaskResult" }
};
exports.FieldNames = {
    IvsTaskGroupID: { value: "IvsTaskGroupID" }
};
