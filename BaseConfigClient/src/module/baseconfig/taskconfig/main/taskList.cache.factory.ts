/** create by zxq
 *  任务列表 缓存本地操作
 * @time: 2017-06-16 17:47:58
 */
import {app} from "../../../common/app/main.app";
import {TaskModel} from "../../../../core/server/TaskModel";
import {TaskStatus} from "../../../../core/server/enum/TaskStatus";
import {AuditStatus} from "../../../../core/server/enum/AuditStatus";
import {Enum} from '../../../../core/enum/Enum';
import {MacMonitor, CarMonitor} from "../../../../core/server/TaskModel";

declare let angular: any;
declare let window: any;

export class FindCacheByPageParams {
    currentPage: number = 1; // 页码数
    pageSize: number = 10; // 单页大小
    totalCount: number = 0; // 总数据条数(需要除以pageSize转换为页数)
    pageCount: number = 1; // 总页数
}

export class TaskTypes {
    Face: Enum = {value: 'Car', text: '车辆'};
    Car: Enum = {value: 'Face', text: '人脸'};
    Mac: Enum = {value: 'Mac', text: 'Mac'};
}

export interface ITaskListCacheFactory {
    //
    setTaskList: (srcList: Array<TaskModel & MacMonitor & CarMonitor>, type: string) => void;
    // 更改任务审核状态
    updateFaceAuditStatus: (ids: Array<string>, auditStatusValue: string) => boolean;

    deleteByFaceIds: (ids: Array<string>) => boolean;
    /** create by zxq
     *  分页获取 缓存本地数据
     * @time: 2017-06-17 18:11:44
     * @params: FindCacheByPageParams
     * @return: Array<TaskModel>
     */
    getListByPage: (params: FindCacheByPageParams, type: string) => Array<TaskModel & MacMonitor & CarMonitor>;
    /// 获取本地数据条目总数
    getTaskTotal: (type: string) => number;
    /** create by zxq
     *  更新本地 任务列表 运行状态
     * @time: 2017-06-17 18:09:54
     * @params: ids : ID 结合 ；
     * @params: isStart :  是否开启 true 开启，false 暂停
     * @return: boolean 操作结果
     */
    updateFaceRunStatus: (ids: Array<string>, isStart: boolean) => boolean;
}

class TaskListCacheFactory implements ITaskListCacheFactory {
    private TaskTypes: TaskTypes = new TaskTypes();
    private taskFaceList: Array<TaskModel>;
    private taskMacList: Array<MacMonitor>;
    private taskCarList: Array<CarMonitor>;


    private taskListFaceMap: { [key: string]: TaskModel };
    private taskListMacMap: { [key: string]: MacMonitor };
    private taskListCarMap: { [key: string]: CarMonitor };

    setTaskList(srcList: Array<TaskModel & MacMonitor & CarMonitor>, type: string) {

        switch (type) {
            case this.TaskTypes.Face.value :
                this.taskFaceList = [] as Array<TaskModel>;

                this.taskListFaceMap = {} as { [key: string]: TaskModel };
                this.taskFaceList = srcList;
                angular.forEach(this.taskFaceList, (val: TaskModel) => {
                    this.taskListFaceMap[val.ID] = val;
                });
                break;
            case this.TaskTypes.Mac.value :
                this.taskMacList = [] as Array<MacMonitor>;
                this.taskListMacMap = {} as { [key: string]: MacMonitor };
                this.taskMacList = srcList as Array<MacMonitor>;
                angular.forEach(this.taskMacList, (val: MacMonitor) => {
                    this.taskListMacMap[val.ID] = val;
                })
                break;
            case this.TaskTypes.Car.value :
                this.taskCarList = [] as Array<CarMonitor>;
                this.taskListCarMap = {} as { [key: string]: CarMonitor };
                this.taskCarList = srcList as Array<CarMonitor>;
                angular.forEach(this.taskCarList, (val: CarMonitor) => {
                    this.taskListCarMap[val.ID] = val;
                });
                break;
            default:
                return;
        }


    };

    // 更改任务审核状态 =>
    updateFaceAuditStatus(ids: Array<string>, auditStatusValue: string): boolean {
        if (ids && ids.length > 0) {
            let taskItem = null;
            angular.forEach(ids, (val: string) => {
                if (this.taskListFaceMap[val]) {
                    taskItem = this.taskListFaceMap[val];
                    taskItem.AuditStatus = auditStatusValue;
                    //审核通过后默认开启状态
                    if (auditStatusValue === AuditStatus.Verified.value) {
                        taskItem.Status = TaskStatus.Run.value;
                    }
                }
            });
            return true;
        }
        return false;
    };

    updateFaceRunStatus(ids: Array<string>, isStart: boolean): boolean {
        if (ids && ids.length > 0) {
            let taskItem = null;
            angular.forEach(ids, (val: string) => {
                taskItem = this.taskListFaceMap[val];
                if (isStart) {
                    taskItem.Status = TaskStatus.Run.value;
                } else {
                    taskItem.Status = TaskStatus.Stop.value;
                }
            });
            return true;
        } else {
            return false;
        }
    };

    deleteByFaceIds(ids: Array<string>): boolean {
        if (ids && ids.length > 0) {
            let i: number, len: number;
            angular.forEach(ids, (val: string) => {
                i = 0;
                len = this.taskFaceList.length;
                for (; i < len; i++) {
                    if (this.taskFaceList[i].ID === val) {
                        this.taskFaceList.splice(i, 1);
                        break;
                    }
                }
            });

            angular.forEach(this.taskFaceList, (val: TaskModel) => {
                this.taskListFaceMap[val.ID] = val;
            });

            return true;
        }
        return false;
    };

    getListByPage(params: FindCacheByPageParams, type: string): Array<TaskModel & MacMonitor & CarMonitor> {
        if (params.pageSize < this.getTaskTotal(type)) {
            let startIndex: number = params.pageSize * (params.currentPage - 1);
            let endIndex: number = params.pageSize * params.currentPage;
            if (type === this.TaskTypes.Face.value) {
                return angular.copy(this.taskFaceList.slice(startIndex, endIndex));
            } else if (type === this.TaskTypes.Mac.value) {
                return angular.copy(this.taskMacList.slice(startIndex, endIndex));
            } else if (type === this.TaskTypes.Car.value) {
                return angular.copy(this.taskCarList.slice(startIndex, endIndex));
            }

        } else {
            if (type === this.TaskTypes.Face.value) {
                return angular.copy(this.taskFaceList);
            } else if (type === this.TaskTypes.Mac.value) {
                return angular.copy(this.taskMacList);
            } else if (type === this.TaskTypes.Car.value) {
                return angular.copy(this.taskCarList);
            }

        }


    };

    getTaskTotal = (type: string): number => {
        if (type === this.TaskTypes.Face.value) {
            return this.taskFaceList.length;
        } else if (type === this.TaskTypes.Mac.value) {
            return this.taskMacList.length;
        } else if (type === this.TaskTypes.Car.value) {
            return this.taskCarList.length;
        }

    };

}

app
    .service('taskListCacheFactory', TaskListCacheFactory);
