/// <amd-dependency path="text!./details.html" name="editHtml" />
/// <amd-dependency path="text!./FaceStructDetails.html" name="FaceStructDetails" />
/// <amd-dependency path="text!./vehicleDetails.html" name="vehicleDetailsPopul" />
/// <amd-dependency path="text!./macDetails.html" name="macDetailsPopul" />
import { app } from "../../common/app/main.app";
import "css!./style/check.css";
import "css!./style/popup.css";
import "./details.controller";
import "./vehicleDetails.controller";
import "./macDetails.controller";
import "./FaceStructDetails.controller"
import { Enum } from "../../../core/enum/Enum";
import { TaskStatus } from '../../../core/server/enum/TaskStatus';
import { ITableHeader } from "../../common/directive/unit-table/table-params";
import PageParams from "../../common/directive/page/page-params";

import 'moment'
import '../../common/services/myCheck.service'
import '../../common/services/connectTree.service'
import { IConnectTreeService } from '../../common/services/connectTree.service';
import { MyCheckService } from '../../common/services/myCheck.service';
import { IUserInfoCacheFactory } from '../../common/factory/userinfo.cache.factory';
import { CheckGetListParams } from "../../../core/params/CheckParams";
import { MyCheckModel } from '../../../core/server/MyCheckModel';
import { TaskType } from '../../../core/server/enum/TaskType';
import { MyCheckDetailsParams, CheckTaskModel } from "./details.controller";
import { IBusinessLibService } from '../../common/services/businessLib.service';
import '../../common/services/businessLib.service';
import { IAreaService } from '../../common/services/area.service';
import '../../common/services/area.service';
import { CameraEx } from "../../../core/entity/ex/CameraEx";
import { BusinessLibEx } from '../../../core/entity/ex/BusinessLibEx';
import { PersonEx } from "../../../core/entity/ex/PersonEx";
import { AreaEx } from '../../../core/entity/ex/AreaEx';
import { ResponseResult, PageResult } from '../../../core/params/result/ResponseResult';
import { PersonTreeEx } from "../../../core/entity/ex/PersonTreeEx";
import { ITaskService } from '../../common/services/task.service';
import '../../common/services/task.service';
import { IVideoStructuredTasksService } from '../../common/services/videoStructuredTasks.service';
import '../../common/services/videoStructuredTasks.service';
import { TaskModel, MacMonitor, CarMonitor } from "../../../core/server/TaskModel";
import { VideoTaskModel } from "../../../core/entity/VideoStructTask";
import { AuditStatus } from "../../../core/server/enum/AuditStatus";
import { AngularScope } from "../../common/types/baseAngularScope";

declare let moment: any, vehicleDetailsPopul: any, angular: any, editHtml: any, macDetailsPopul: any,FaceStructDetails:any;

class CurrentInterface {
    taskType?: string;
    AuditStatus?: string
}


class MyCheckController {
    taskStatusMap: { [key: string]: string; };
    auditStatusMap: { [key: string]: string; };
    taskTypeMap: { [key: string]: string; };
    taskTypeArr: Array<Enum>;
    AuditStatusLib: Array<Enum>;

    //---table
    // table 列表数据

    tHeadList: Array<ITableHeader>;
    pageParams: PageParams;
    findListParams: CheckGetListParams;
    tableNoData: boolean;
    tBodyList: Array<MyCheckModel>;
    //多选相关
    selectedList: Array<boolean>;
    isSelectAll: boolean;

    currentLayerIndex: number;

    CurrentInfo: CurrentInterface = {};
    startTime: Date;
    endTime: Date = moment().format('YYYY-MM-DD');

    // 用于弹出框的缓存, 当$scope作用域结束时销毁
    areaCameraCaches: Array<CameraEx | AreaEx>;
    businessLibCaches: Array<BusinessLibEx>;
    userCaches: Array<PersonTreeEx | AreaEx>;

    static $inject = ['$scope', '$timeout', 'layer', 'i18nFactory', 'myCheckService',
        'userInfoCacheFactory', 'businessLibService', '$q', 'taskService',
        'videoStructuredTasksService', 'connectTreeService'];

    constructor(private $scope: AngularScope,
        private $timeout: any,
        private layer: any,
        private i18nFactory: any,
        private myCheckService: MyCheckService,
        private userInfoCacheFactory: IUserInfoCacheFactory,
        private businessLibService: IBusinessLibService,
        private $q: any,
        private taskService: ITaskService,
        private videoStructuredTasksService: IVideoStructuredTasksService,
        private connectTreeService: IConnectTreeService) {

        this.findListParams = new CheckGetListParams();
        this.findListParams.currentPage = 1;
        this.findListParams.pageSize = 10;

        this.initStatusLib();
        this.setTableHead();
        this.search();
        // 弹出框相关
        $scope.$on("details.closePopup", (event: any, isRefresh?: boolean) => {
            this.closeMyCheckDetails(isRefresh);
        });
        $scope.$on("$destroy", () => {
            this.areaCameraCaches = null;
            this.businessLibCaches = null;
            this.userCaches = null;
        });
    }

    // 枚举获取类型列表
    private initStatusLib() {


        let taskStatusMap = {} as { [key: string]: string };

        let auditStatus = [] as Array<Enum>;
        let auditStatusMap = {} as { [key: string]: string };

        let taskType = [] as Array<Enum>;
        let taskTypeMap = {} as { [key: string]: string };

        taskType.push({ value: 'all', text: '全部' });
        auditStatus.push({ value: 'all', text: '全部' });
        for (let k in TaskStatus) {
            taskStatusMap[TaskStatus[k].value] = TaskStatus[k].text;
        }
        for (let k in AuditStatus) {
            auditStatus.push({ value: AuditStatus[k].value, text: AuditStatus[k].text });
            auditStatusMap[AuditStatus[k].value] = AuditStatus[k].text;
        }
        this.taskTypeArr = taskType;
        this.AuditStatusLib = auditStatus;
        this.CurrentInfo.taskType = taskType[0].value;
        this.CurrentInfo.AuditStatus = auditStatus[0].value;

        for (let k in TaskType) {
            taskType.push({ value: TaskType[k].value, text: TaskType[k].text });
            taskTypeMap[TaskType[k].value] = TaskType[k].text;
        }

        this.taskTypeMap = taskTypeMap;
        this.auditStatusMap = auditStatusMap;
        this.taskStatusMap = taskStatusMap;

        console.debug("this.CurrentInfo.taskType", this.CurrentInfo.taskType, this.CurrentInfo.AuditStatus);
    }

    private getParams() {
        let params = new CheckGetListParams();
        params.currentPage = this.findListParams.currentPage;
        params.pageSize = this.findListParams.pageSize;
        params.userId = this.userInfoCacheFactory.getCurrentUserId();
        params.taskType = this.CurrentInfo.taskType == 'all' ? null : this.CurrentInfo.taskType;
        params.auditStatus = this.CurrentInfo.AuditStatus == 'all' ? null : this.CurrentInfo.AuditStatus;
        if (this.startTime) {
            params.timeStart = moment(this.startTime).format('YYYY-MM-DD');
            params.timeEnd = moment(this.endTime).format('YYYY-MM-DD');
        } else {
            params.timeStart = null;
            params.timeEnd = null;
        }
        return params;
    }

    private setTableHead = () => {
        this.tHeadList = [
            { field: '', title: '任务类型' },
            { field: '', title: '任务名称' },
            { field: '', title: '所属区域' },
            { field: '', title: '创建人' },
            { field: '', title: '布控类型' },
            { field: '', title: '有效时间' },
            { field: '', title: '任务状态' },
            { field: '', title: '描述' },
            { field: '', title: '审核状态' },
            { field: '', title: '操作' },
        ];
    };

    editCheck(data: MyCheckModel) {
        // 先拿到用于popup展示的缓存信息
        let arr = [this.getPopupCache(), this.getTaskDetail(data.tId, data.taskType)];
        this.$q.all(arr).then((res: [null, CheckTaskModel]) => {
            let scope: MyCheckDetailsParams = this.$scope.$new();
            scope.MyCheck = data;
            scope.MyTaskModel = res[1];
            scope.BusinessLibDatas = this.businessLibCaches;
            scope.CameraDatas = this.areaCameraCaches;
            scope.UserDatas = this.userCaches;
            scope.AuditStatusMap = this.auditStatusMap;
            scope.TaskStatusMap = this.taskStatusMap;
            scope.TaskTypeMap = this.taskTypeMap;
            scope.$on("$destroy", () => {
            });

            let content: any;
            let area: Array<string>;
            switch (data.taskType) {
                case "VehicleMonitor": {
                    content = angular.copy(vehicleDetailsPopul);
                    area = ["640px", "387px"];
                    break
                }
                case "FaceMonitor": {
                    content = angular.copy(editHtml);
                    area = ["640px", "665px"];
                    break
                }
                case "FaceStruct": {
                    content = angular.copy(FaceStructDetails);
                    area = ["640px", "665px"];
                    break
                }
                case "MAC": {
                    content = angular.copy(macDetailsPopul);
                    area = ["640px", "237px"];
                    break
                }
                case "IMSI": {
                    content = angular.copy(macDetailsPopul);
                    area = ["640px", "237px"];
                    break
                }
                case "IMEI": {
                    content = angular.copy(macDetailsPopul);
                    area = ["640px", "237px"];
                    break
                }
            }

            // 这里对scope进行一次新建
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: content,
                scope: scope,
                closeBtn: false,
                skin: "no-scroll",
                title: false,
                area: area,
                end: function () {
                    scope.$destroy();
                }
            });
        });
    }

    /**
     * TODO 待确定类型来显示
     */
    private getTaskDetail(tId: string, tastType: string) {
        let type = -1;
        switch (tastType) {
            case TaskType.FaceMonitor.value:
            case TaskType.FaceStruct.value:
                type = 1;
                break;
            case TaskType.IMEIMonitor.value:
            case TaskType.IMSIMonitor.value:
            case TaskType.MacMonitor.value:
                type = 2;
                break;
            case TaskType.CarMonitor.value:
            case TaskType.VehicleStruct.value:
                type = 3;
                break;
            case TaskType.VedioStruct.value:
                type = 0;
                break;
        }
        if (type == 1) {
            return this.taskService.findFaceById(tId).then((res: ResponseResult<TaskModel>) => {
                return res && res.data || ({} as CheckTaskModel);
            });
        } else if (type == 0) {
            return this.videoStructuredTasksService.getFaceDetail(tId).then((res: ResponseResult<TaskModel>) => {
                return res && res.data || ({} as CheckTaskModel);
            });
        } else if (type == 2) {
            return this.taskService.findRfidById(tId).then((res: ResponseResult<MacMonitor>) => {
                return res && res.data || ({} as CheckTaskModel);
            });
        } else if (type == 3) {
            return this.taskService.findCarById(tId).then((res: ResponseResult<CarMonitor>) => {
                return res && res.data || ({} as CheckTaskModel);
            });
        } else {
            return this.$q.defer().resolve({} as CheckTaskModel);
        }
    }

    private closeMyCheckDetails(flag?: boolean) {
        this.layer.close(this.currentLayerIndex);
        this.currentLayerIndex = -1;
        if (!flag) {
            // 刷新界面
            this.findListParams.currentPage = 1;

        }
    }

    search() {
        this.findListParams = this.getParams();
        console.log(this.findListParams);
        // this.findListParams.userId = "d9240c3c98b541d5a5859d2a04ecf1f0";
        this.myCheckService.findListByPage(this.findListParams).then((pageResultObj: PageResult<MyCheckModel>) => {
            console.log(pageResultObj);

            let pageParams = new PageParams();
            pageParams.currentPage = this.findListParams.currentPage;
            pageParams.pageSize = this.findListParams.pageSize;
            pageParams.totalCount = pageResultObj.TotalCount || 0;
            this.pageParams = pageParams;
            this.tBodyList = pageResultObj.Result;
            if (this.tBodyList && this.tBodyList.length > 0) {
                this.tableNoData = false;
            } else {
                this.tableNoData = true;
            }
        });
    }

    audit(data: MyCheckModel) {
        if (!data || data.auditStatus != AuditStatus.Verifing.value) {
            return;
        }
        let taskType = data.taskType;
        let taskId = data.tId;

        let result = null;
        this.layer.confirm("任务<span style='color: #faa037'>" + data.tName + "</span>是否通过?", {
            icon: 3,
            skin: 'layer-ext-moon',
            btn: ['通过', '拒绝']
        }, (index: string) => {
            result = AuditStatus.Verified.value;
            this.updateAuditStatus(taskId, taskType, result);
            this.layer.close(index);
        }, () => {
            result = AuditStatus.Refuse.value;
            this.updateAuditStatus(taskId, taskType, result);
        });
    }

    changePage(num: number) {
        this.findListParams.currentPage = num;
        this.search();
    }

    changePageSize(count: number) {
        this.findListParams.currentPage = 1;
        this.findListParams.pageSize = count;
        this.search();
    }

    changeStatus() {
        this.findListParams.currentPage = 1;
    }

    isInCheck(status: string) {
        return status === AuditStatus.Verifing.value;
    }

    private afterUpdateAudit() {
        this.search();
    }

    private updateAuditStatus(tId: string, taskType: string, auditStatus: string) {
        console.debug("updateAuditStatus", tId, taskType, auditStatus);
        let type = -1;
        switch (taskType) {
            case TaskType.FaceMonitor.value:
            case TaskType.FaceStruct.value:
                type = 1;
                break;
            case TaskType.IMEIMonitor.value:
            case TaskType.IMSIMonitor.value:
            case TaskType.MacMonitor.value:
                type = 2;
                break;
            case TaskType.CarMonitor.value:
            case TaskType.VehicleStruct.value:
                type = 3;
                break;
            case TaskType.VedioStruct.value:
                type = 0;
                break;
        }
        if (type === 1) {
            // 走人像接口
            this.taskService.updateAuditStatus(tId, auditStatus).then(this.afterUpdateAudit.bind(this));
        } else if (type === 2) {
            // 走感知接口
            this.taskService.auditMacStatus(tId, auditStatus).then(this.afterUpdateAudit.bind(this));
        } else if (type === 3) {
            // 走车辆接口
            this.taskService.auditVehicleStatus(tId, auditStatus).then(this.afterUpdateAudit.bind(this));
        } else {
            console.debug("该任务没有正确的任务类型");
        }
    }

    private getPopupCache() {
        let arr: [Promise<Array<CameraEx | AreaEx>>, Promise<Array<BusinessLibEx>>, Promise<Array<PersonEx>>] = [this.getAreaCamera(), this.getBusinessLib(), this.getUser()] as any;
        return this.$q.all(arr).then((resArr: [Array<CameraEx | AreaEx>, Array<BusinessLibEx>, Array<PersonEx>]) => {
            return null;
        });
    }

    private getAreaCamera() {
        if (this.areaCameraCaches) {
            return this.$q.defer().resolve(this.areaCameraCaches);
        } else {
            return this.connectTreeService.findAreaCamera().then((datas: Array<CameraEx | AreaEx>) => {
                this.areaCameraCaches = datas as Array<CameraEx | AreaEx>;
                return this.areaCameraCaches;
            });
        }
    }

    private getBusinessLib() {
        if (this.businessLibCaches) {
            return this.$q.defer().resolve(this.businessLibCaches);
        } else {
            return this.businessLibService.findHasSelfTree().then((res: ResponseResult<Array<BusinessLibEx>>) => {
                this.businessLibCaches = (res && res.data) || [] as Array<BusinessLibEx>;
            });
        }
    }

    private getUser() {
        if (this.userCaches) {
            return this.$q.defer().resolve(this.userCaches);
        } else {
            return this.connectTreeService.findAreaWithPerson().then((res: Array<AreaEx | PersonTreeEx>) => {
                this.userCaches = res;
            });
        }
    }

}

app
    .controller('MyCheckController', MyCheckController);