

import "css!../../style/task-config.css";
import { app } from "../../../common/app/main.app";
import "css!../style/policy-linkage.css";
import "../../../common/filter/app.filter";
import { ITreeDataParams, TreeDataParams } from "../../../common/directive/tree/tree-params";
import "../../../common/directive/tree/tree.directive.service";
import { ITreeDirectiveService } from "../../../common/directive/tree/tree.directive.service";

import "../../../common/services/task.service";
import { ITaskService } from "../../../common/services/task.service";

import { AreaEx } from "../../../../core/entity/ex/AreaEx";
import { ITableHeader } from "../../../common/directive/unit-table/table-params";
import "../../../common/services/area.service";
import { IAreaService } from "../../../common/services/area.service";
import { TreeParams } from "../../../../core/params/tree/TreeParams";
import PageParams from "../../../common/directive/page/page-params";
import { ResponseResult } from "../../../../core/params/result/ResponseResult";
import { Enum } from "../../../../core/enum/Enum";
import { TaskMonitor } from "../../../../core/server/enum/TaskType";
import { TaskModel, CarMonitor, MacMonitor, TaskSearchParams } from "../../../../core/server/TaskModel";
import { TaskStatus } from "../../../../core/server/enum/TaskStatus";
import { AuditStatus } from "../../../../core/server/enum/AuditStatus";
import "./taskList.cache.factory";
import { ITaskListCacheFactory, FindCacheByPageParams, TaskTypes } from "./taskList.cache.factory";
import { ITaskOption, MacOptions, CarOptions } from './taskCTypeOptions';
import { tFaceHeadList, tCarHeadList, tMacHeadList } from "./taskCTypeOptions";
import { IUserInfoCacheFactory } from './../../../common/factory/userinfo.cache.factory';
import './../../../common/factory/userinfo.cache.factory';
declare let window: any;
declare let angular: any;

class CurrentInterface {
    LibType: string;
    Type: string;
    Status: string;
    AuditStatus: string
}

class TaskController {
    //当前是否拥有 审核权限
    /*TODO 权限相关key 枚举未定*/
    taskTypeOptions: Array<ITaskOption>;
    currentUserId: string;
    taskTypeBtnList: Array<Enum>;


    MonitorStatusLib: Array<Enum>;

    AuditStatusLib: Array<Enum>;

    moduleName: string;
    // 选择行政区域树
    areaTreeDatas: ITreeDataParams<AreaEx>;
    areaTreeSearchInputStr: string = "";
    /*TODO 接口暂无 提供分页功能*/
    //------directive pages params
    pageParamsFace: PageParams = new PageParams();
    pageParamsMac: PageParams = new PageParams();
    pageParamsCar: PageParams = new PageParams();
    //获取布控列表请求参数
    findListFaceParams: TaskSearchParams;
    findListMacParams: TaskSearchParams;
    findListCarParams: TaskSearchParams;
    //获取缓存内分页
    findFaceByPageParams: FindCacheByPageParams;
    findMacByPageParams: FindCacheByPageParams;
    findCarByPageParams: FindCacheByPageParams;
    // table 列表数据
    FaceAreaName: string = null;
    FaceType: string = TaskMonitor.FaceMonitor.value;
    CarType: string = TaskMonitor.CarMonitor.value;
    MacType: string = TaskMonitor.MacMonitor.value;
    CurrentInfo: CurrentInterface = {
        LibType: this.FaceType,
        Type: null,
        Status: null,
        AuditStatus: null
    };

    tFaceHeadList: Array<ITableHeader>;
    tCarHeadList: Array<ITableHeader>;
    tMacHeadList: Array<ITableHeader>;
    isNewCar: boolean = false;
    isNewMac: boolean = false;
    TaskTypes: TaskTypes = new TaskTypes;

    tBodyListFace: Array<TaskModel>;
    tBodyListMac: Array<MacMonitor>;
    tBodyListCar: Array<CarMonitor>;
    //多选 相关
    selectedFaceList: Array<boolean>;
    selectedCarList: Array<boolean>;
    selectedMacList: Array<boolean>;
    isSelectFaceAll: boolean = false;
    isSelectCarAll: boolean = false;
    isSelectMacAll: boolean = false;
    // alter wyr: 用于判断当前界面上的列表是否被选中
    isSelectFaceItems: boolean = false;
    isSelectCarItems: boolean = false;
    isSelectMacItems: boolean = false;

    currentLayerIndex: number;
    static $inject = [
        '$scope',
        '$timeout',
        '$state',
        'layer',
        'i18nFactory',
        'areaService',
        'taskService',
        'taskListCacheFactory',
        'treeDirectiveService',
        'userInfoCacheFactory'
    ];

    constructor(private $scope: any,
        private $timeout: any,
        private $state: any,
        private layer: any,
        private i18nFactory: Function,
        private areaService: IAreaService,
        private taskService: ITaskService,
        private taskListCacheFactory: ITaskListCacheFactory,
        private treeService: ITreeDirectiveService,
        private userInfoCacheFactory: IUserInfoCacheFactory) {

        this.taskTypeOptions = CarOptions;
        this.initTableParamsData();
        this.initTypeOptions();
        this.initStatusLib();
        this.findListFaceParams = this.initFindTaskFaceListParams();
        this.findListMacParams = this.initFindTaskMacListParams();
        this.findListCarParams = this.initFindTaskCarListParams();
        this.initAreaTreeParams();
        this.getAreaTreeList();

        this.$scope.$on("taskconfig.mac.closePopup", (event: any, isRefresh?: boolean) => {
            event.preventDefault();
            this.layer.close(this.currentLayerIndex);
            if (isRefresh) {
                this.$timeout(() => {
                    this.getMacListByParams(this.findListMacParams);
                }, 1000);
            }
        });
        this.$scope.$on("taskconfig.car.closePopup", (event: any, isRefresh?: boolean) => {
            event.preventDefault();
            this.layer.close(this.currentLayerIndex);
            if (isRefresh) {
                this.$timeout(() => {
                    this.getCarListByParams(this.findListCarParams);
                }, 1000);
            }
        });

    };

    // 枚举获取类型列表
    private initStatusLib() {
        let monitorStatus = [] as Array<Enum>;
        let auditStatus = [] as Array<Enum>;
        monitorStatus.push({ value: '', text: '全部' });
        auditStatus.push({ value: '', text: '全部' });
        for (let k in TaskStatus) {
            monitorStatus.push({ value: TaskStatus[k].value, text: TaskStatus[k].text })
        }
        for (let k in AuditStatus) {
            auditStatus.push({ value: AuditStatus[k].value, text: AuditStatus[k].text })
        }
        this.MonitorStatusLib = monitorStatus;
        this.AuditStatusLib = auditStatus;

    }

    private initTypeOptions() {
        let resultList = [] as Array<Enum>;
        for (let k in TaskMonitor) {
            resultList.push(TaskMonitor[k]);
        }
        this.taskTypeBtnList = resultList;
    };

    targetNewCar(event: Event) {
        event.preventDefault();
        this.isNewMac = false;
        this.isNewCar = !this.isNewCar;
    }

    targetNewMac(event: Event) {
        event.preventDefault();
        this.isNewCar = false;
        this.isNewMac = !this.isNewMac;
    }

    onClickTaskTypeBtn = (btnItem: Enum): boolean => {
        if (btnItem.value === this.CurrentInfo.LibType) {
            return false
        }
        this.CurrentInfo.Type = '';
        this.CurrentInfo.Status = '';
        this.CurrentInfo.AuditStatus = '';
        if (btnItem.value === this.FaceType) {
            this.CurrentInfo.LibType = this.FaceType;
            this.findListFaceParams.name = null;
            this.findListFaceParams.runStatus = null;
            this.findListFaceParams.auditStatus = null;
            this.findListFaceParams.startTime = null;
            this.findListFaceParams.endTime = null;
            this.getFaceListByParams(this.findListFaceParams);
        } else {
            this.CurrentInfo.LibType = btnItem.value;
            if (btnItem.value === this.CarType) {
                this.taskTypeOptions = CarOptions;
                this.findListCarParams.plateNumber = null;
                this.findListCarParams.runStatus = null;
                this.findListCarParams.auditStatus = null;
                this.findListCarParams.listType = null;
                this.findListCarParams.startTime = null;
                this.findListCarParams.endTime = null;
                this.getCarListByParams(this.findListCarParams);
            } else {
                this.taskTypeOptions = MacOptions;
                this.findListMacParams.perceiveData = null;
                this.findListMacParams.runStatus = null;
                this.findListMacParams.auditStatus = null;
                this.findListMacParams.listType = null;
                this.findListMacParams.startTime = null;
                this.findListMacParams.endTime = null;
                this.getMacListByParams(this.findListMacParams);
            }
        }
        return true;
    };


    initTableParamsData() {
        this.tBodyListFace = [];
        this.tFaceHeadList = tFaceHeadList;
        this.tCarHeadList = tCarHeadList;
        this.tMacHeadList = tMacHeadList;
        this.CurrentInfo = {
            LibType: this.FaceType,
            Type: '',
            Status: '',
            AuditStatus: ''
        };
    }

    initFindTaskFaceListParams(): TaskSearchParams {
        let newParams = new TaskSearchParams();
        newParams.areaId = '';
        newParams.runStatus = '';
        newParams.startTime = null;
        newParams.endTime = null;
        newParams.name = '';
        newParams.pageSize = this.pageParamsFace.pageSize;
        newParams.currentPage = 1;
        newParams.userId = this.userInfoCacheFactory.getCurrentUserId();
        return newParams;
    }

    initFindTaskMacListParams(): TaskSearchParams {
        let newParams = new TaskSearchParams();
        newParams.runStatus = null;
        newParams.startTime = null;
        newParams.endTime = null;
        newParams.pageSize = this.pageParamsMac.pageSize;
        newParams.currentPage = 1;
        newParams.perceiveData = null;
        newParams.listType = null;
        newParams.userId = this.userInfoCacheFactory.getCurrentUserId();
        return newParams;
    }

    initFindTaskCarListParams(): TaskSearchParams {
        let newParams = new TaskSearchParams();
        newParams.areaId = null;
        newParams.runStatus = null;
        newParams.startTime = null;
        newParams.endTime = null;
        newParams.pageSize = this.pageParamsCar.pageSize;
        newParams.currentPage = 1;
        newParams.plateNumber = null;
        newParams.listType = null;
        newParams.userId = this.userInfoCacheFactory.getCurrentUserId();
        return newParams;
    }


    //条件搜索任务列表
    onClickSearch() {
        if (this.CurrentInfo.LibType === this.FaceType) {
            if (this.findListFaceParams.startTime && this.findListFaceParams.endTime) {
                if (this.findListFaceParams.startTime > this.findListFaceParams.endTime) {
                    this.layer.msg(this.i18nFactory("FDS_01_12_67"));
                    return;
                }
            }
            this.findListFaceParams.currentPage = 1;
            this.findListFaceParams.runStatus = this.CurrentInfo.Status;
            this.findListFaceParams.auditStatus = this.CurrentInfo.AuditStatus;
            if (!this.CurrentInfo.AuditStatus) this.findListFaceParams.auditStatus = null;


            this.getFaceListByParams(this.findListFaceParams);
        } else if (this.CurrentInfo.LibType === this.MacType) {
            this.findListMacParams.currentPage = 1;
            if (this.findListMacParams.startTime && this.findListMacParams.endTime) {
                if (this.findListMacParams.startTime > this.findListMacParams.endTime) {
                    this.layer.msg(this.i18nFactory("FDS_01_12_67"));
                    return;
                }
            }
            if (this.CurrentInfo.Type === 'Black') this.findListMacParams.listType = 'BlackList';
            if (this.CurrentInfo.Type === 'White') this.findListMacParams.listType = 'WhiteList';

            this.findListMacParams.runStatus = this.CurrentInfo.Status;
            this.findListMacParams.auditStatus = this.CurrentInfo.AuditStatus;

            if (!this.CurrentInfo.AuditStatus) this.findListMacParams.auditStatus = null;

            this.getMacListByParams(this.findListMacParams);
        } else if (this.CurrentInfo.LibType === this.CarType) {
            this.findListCarParams.currentPage = 1;
            if (this.findListCarParams.startTime && this.findListCarParams.endTime) {
                if (this.findListCarParams.startTime > this.findListCarParams.endTime) {
                    this.layer.msg(this.i18nFactory("FDS_01_12_67"));
                    return;
                }
            }
            if (!this.CurrentInfo.Type) this.findListCarParams.listType = null;
            else this.findListCarParams.listType = this.CurrentInfo.Type;
            this.findListCarParams.runStatus = this.CurrentInfo.Status;
            this.findListCarParams.auditStatus = this.CurrentInfo.AuditStatus;
            if (!this.CurrentInfo.AuditStatus) this.findListCarParams.auditStatus = null;
            this.getCarListByParams(this.findListCarParams);
        }

    };

    //----------- 树列 操作函数
    initAreaTreeParams() {
        // 树列表数据
        //初始化 area 树数据
        this.areaTreeDatas = new TreeDataParams<AreaEx>();
        this.areaTreeDatas.treeId = 'areaTreeByTaskConfig';
        // 节点选择
        this.areaTreeDatas.onClick = (event: MouseEvent, treeId: string, treeNode: AreaEx) => {
            this.findListFaceParams.areaId = treeNode.ID;
            this.getFaceListByParams(this.findListFaceParams);
            this.$timeout(() => {
                let nowArea = this.treeService.getNodeByParam(this.areaTreeDatas.treeId, 'ID', treeNode.ID);
                this.FaceAreaName = nowArea.Name;
            })


        };
        this.areaTreeDatas.treeInitComplete = (treeId: string) => {
            console.log("初始化布控任务列表 地区树", treeId);
        };
    };

    // 数据获取
    getAreaTreeList(keyword?: string) {
        let params: TreeParams = this.areaTreeDatas.reqParams;
        params.keyword = keyword;
        this.areaService.findListTree(params).then((resp: Array<AreaEx>) => {
            this.areaTreeDatas.finishedNoData = !resp;
            this.$timeout(() => {
                this.areaTreeDatas.treeDatas = resp
            });
        })
    };

    // 树搜索
    areaTreeSearchInputKeyUp(e: any) {
        if (e.keyCode === 13) {
            this.getAreaTreeList(this.areaTreeSearchInputStr);
        }
    };

    // 树搜索
    areaTreeSearchInput() {
        this.getAreaTreeList(this.areaTreeSearchInputStr);
    };


    getFaceListByParams(params: TaskSearchParams) {
        this.taskService.findFaceListByParams(params).then((res: ResponseResult<Array<TaskModel>>) => {
            let resp = res as ResponseResult<Array<TaskModel & MacMonitor & CarMonitor>>;
            if (resp && resp.code == 200) {
                this.setTaskListToCache(resp.data, this.TaskTypes.Face.value);
            } else {
                this.setTaskListToCache([], this.TaskTypes.Face.value);
            }
        });
    };


    getMacListByParams(params: TaskSearchParams) {
        this.taskService.findMacListByParams(params).then((res: ResponseResult<Array<MacMonitor>>) => {
            let resp = res as ResponseResult<Array<TaskModel & MacMonitor & CarMonitor>>;
            if (resp && resp.code == 200) {
                this.setTaskListToCache(resp.data, this.TaskTypes.Mac.value);
            } else {
                this.setTaskListToCache([], this.TaskTypes.Mac.value);
            }
        });
    }

    getCarListByParams(params: TaskSearchParams) {
        this.taskService.findCarListByParams(params).then((res: ResponseResult<Array<CarMonitor>>) => {
            let resp = res as ResponseResult<Array<TaskModel & MacMonitor & CarMonitor>>;
            if (resp && resp.code == 200) {
                this.setTaskListToCache(resp.data, this.TaskTypes.Car.value);
            } else {
                this.setTaskListToCache([], this.TaskTypes.Car.value);
            }
        });
    }

    //前往 更新
    goToUpdateTask(taskItem: TaskModel & MacMonitor & CarMonitor) {
        if (this.CurrentInfo.LibType === this.FaceType) {
            this.$state.go('baseconfig.task.newFaceMonitor', {
                taskId: taskItem.ID,
                areaId: this.findListFaceParams.areaId
            });
        } else if (this.CurrentInfo.LibType === this.MacType) {
            this.$state.go('baseconfig.task.newMacMonitor', {
                taskId: taskItem.ID,
                areaId: this.findListFaceParams.areaId
            });
        } else if (this.CurrentInfo.LibType === this.CarType) {
            this.$state.go('baseconfig.task.newCarMonitor', {
                taskId: taskItem.ID,
                areaId: this.findListFaceParams.areaId
            });
        }

    };

    goNewMonitor() {
        console.log(this.CurrentInfo);
        if (this.CurrentInfo.LibType === this.FaceType) {
            this.$state.go('baseconfig.task.newFaceMonitor', { areaId: this.findListFaceParams.areaId });
        } else if (this.CurrentInfo.LibType === this.MacType) {
            this.$state.go('baseconfig.task.newMacMonitor', { areaId: this.findListFaceParams.areaId });
        } else if (this.CurrentInfo.LibType === this.CarType) {
            this.$state.go('baseconfig.task.newCarMonitor', { areaId: this.findListFaceParams.areaId });
        }

    };

    setTaskListToCache(dataList: Array<TaskModel & MacMonitor & CarMonitor>, type: string) {
        if (!dataList) {
            dataList = [];
        }
        if (type === this.TaskTypes.Face.value) {
            this.findFaceByPageParams = new FindCacheByPageParams();
            this.findFaceByPageParams.pageSize = this.pageParamsFace.pageSize;
            this.findFaceByPageParams.currentPage = this.pageParamsFace.currentPage;
            this.taskListCacheFactory.setTaskList(dataList, type);
            this.getListByPage(this.findFaceByPageParams, type);
        } else if (type === this.TaskTypes.Mac.value) {
            this.findMacByPageParams = new FindCacheByPageParams();
            this.findMacByPageParams.pageSize = this.pageParamsMac.pageSize;
            this.findMacByPageParams.currentPage = this.pageParamsMac.currentPage;
            this.taskListCacheFactory.setTaskList(dataList, type);
            this.getListByPage(this.findMacByPageParams, type);
        } else if (type === this.TaskTypes.Car.value) {
            this.findCarByPageParams = new FindCacheByPageParams();
            this.findCarByPageParams.pageSize = this.pageParamsCar.pageSize;
            this.findCarByPageParams.currentPage = this.pageParamsCar.currentPage;
            this.taskListCacheFactory.setTaskList(dataList, type);
            this.getListByPage(this.findCarByPageParams, type);
        }
    };

    //分页获取本地缓存数据
    getListByPage(params: FindCacheByPageParams, type: string) {

        let cacheList = this.taskListCacheFactory.getListByPage(params, type);
        let pageParams = new PageParams();
        pageParams.currentPage = params.currentPage;
        pageParams.pageSize = params.pageSize;
        pageParams.totalCount = this.taskListCacheFactory.getTaskTotal(type);
        if (type === this.TaskTypes.Face.value) {
            this.tBodyListFace = cacheList as Array<TaskModel>;
            this.pageParamsFace = pageParams;
        } else if (type === this.TaskTypes.Mac.value) {
            this.tBodyListMac = cacheList as Array<MacMonitor>;
            this.pageParamsMac = pageParams;
        } else if (type === this.TaskTypes.Car.value) {
            this.tBodyListCar = cacheList as Array<CarMonitor>;
            this.pageParamsCar = pageParams;

        }


    };


    // 改变运行，过期不做操作  停止/运行 切换
    changeTaskRunStatus(taskItem: TaskModel & MacMonitor & CarMonitor) {
        if (taskItem.AuditStatus === 'Verified' && taskItem.Status === 'Stop') {
            let textStr: string;
            if (this.CurrentInfo.LibType === this.FaceType) {
                textStr = `您确定启动 ${taskItem.Name}?`;
            } else if (this.CurrentInfo.LibType === this.CarType) {
                textStr = `您确定启动 ${taskItem.PlateNumber}?`;
            } else if (this.CurrentInfo.LibType === this.MacType) {
                textStr = `您确定启动 ${taskItem.PerceiveData}?`;
            }
            this.layer.confirm(textStr, {
                icon: 0,
                title: this.i18nFactory('DP_CONFIG_COMMON_47'),
                area: ["500px", "200px"]
            }, (index: number) => {
                this.layer.close(index);
                this.submitChangeRunStatus([taskItem.ID], true);
            });

        } else if (taskItem.Status === 'Run' && taskItem.AuditStatus === 'Verified') {
            let textStr: string;
            if (this.CurrentInfo.LibType === this.FaceType) {
                textStr = `您确定停止 ${taskItem.Name}?`;
            } else if (this.CurrentInfo.LibType === this.CarType) {
                textStr = `您确定停止 ${taskItem.PlateNumber}?`;
            } else if (this.CurrentInfo.LibType === this.MacType) {
                textStr = `您确定停止 ${taskItem.PerceiveData}?`;
            }
            this.layer.confirm(textStr, {
                icon: 0,
                title: this.i18nFactory('DP_CONFIG_COMMON_47'),
                area: ["500px", "200px"]
            }, (index: number) => {
                this.layer.close(index);
                this.submitChangeRunStatus([taskItem.ID], false);
            });
        } else {
            return;
        }
    };


    onClickTaskRunStatusBy(isStart: boolean) {
        let textStr = isStart ? "确定开启:" : "确定暂停：";
        let delIds = [] as Array<string>;
        let taskItemModels = this.getSelectedList();
        if (this.CurrentInfo.LibType === this.FaceType) {
            angular.forEach(taskItemModels, (val: TaskModel) => {
                textStr += "<br/>" + val.Name;
                delIds.push(val.ID)
            });
        } else if (this.CurrentInfo.LibType === this.CarType) {
            angular.forEach(taskItemModels, (val: CarMonitor) => {
                textStr += "<br/>" + val.PlateNumber;
                delIds.push(val.ID)
            });
        } else if (this.CurrentInfo.LibType === this.MacType) {
            angular.forEach(taskItemModels, (val: MacMonitor) => {
                textStr += "<br/>" + val.PerceiveData;
                delIds.push(val.ID)
            });
        }
        this.layer.confirm(textStr, {
            icon: 0,
            title: this.i18nFactory('DP_CONFIG_COMMON_42'),
            area: ["500px", "200px"]
        }, (index: number) => {
            this.layer.close(index);
            this.submitChangeRunStatus(delIds, isStart);
        });
    };

    // 确定提交 改变状态
    private submitChangeRunStatus(ids: Array<string>, isStart: boolean) {

        if (ids && ids.length > 0) {
            let idL = ids.join(',');
            if (this.CurrentInfo.LibType === this.FaceType) {
                this.taskService.updateFaceRunStatus(idL, isStart).then((resp: ResponseResult<any>) => {
                    if (resp && resp.code == 200) {
                        this.getFaceListByParams(this.findListFaceParams);
                    } else {
                        console.error(resp);
                    }
                });
            } else if (this.CurrentInfo.LibType === this.CarType) {
                this.taskService.updateCarRunStatus(idL, isStart).then((resp: ResponseResult<any>) => {
                    if (resp && resp.code == 200) {
                        this.getCarListByParams(this.findListCarParams);
                    } else {
                        console.error(resp);
                    }
                });
            } else if (this.CurrentInfo.LibType === this.MacType) {
                this.taskService.updateMacRunStatus(idL, isStart).then((resp: ResponseResult<any>) => {
                    if (resp && resp.code == 200) {
                        this.getMacListByParams(this.findListMacParams);
                    } else {
                        console.error(resp);
                    }
                });
            }

        }
    };

    /*
    * 删除单个
    * */
    onClickDeleteById(TaskModel: any) {
        let textStr: string;
        if (this.CurrentInfo.LibType === this.FaceType) {
            textStr = `确定要删除 ${TaskModel.Name}?`;
        } else if (this.CurrentInfo.LibType === this.CarType) {
            textStr = `确定要删除 ${TaskModel.PlateNumber}?`;
        } else if (this.CurrentInfo.LibType === this.MacType) {
            textStr = `确定要删除 ${TaskModel.MacAddress}?`;
        }
        this.layer.confirm(textStr, {
            icon: 0,
            title: this.i18nFactory('DP_CONFIG_COMMON_42'),
            area: ["500px", "200px"]
        }, (index: number) => {
            this.layer.close(index);
            this.submitDeleteByIds([TaskModel.ID]);
        });
    };

    /*
    * 删除多个
    * */
    onClickDeleteByIds() {
        let textStr = "确定删除：";
        let delIds = [] as Array<string>;
        let taskItemModels = this.getSelectedList();
        if (this.CurrentInfo.LibType === this.FaceType) {
            angular.forEach(taskItemModels, (val: TaskModel) => {
                textStr += "<br/>" + val.Name;
                delIds.push(val.ID)
            });
        } else if (this.CurrentInfo.LibType === this.CarType) {
            angular.forEach(taskItemModels, (val: CarMonitor) => {
                textStr += "<br/>" + val.PlateNumber;
                delIds.push(val.ID)
            });
        } else if (this.CurrentInfo.LibType === this.MacType) {
            angular.forEach(taskItemModels, (val: MacMonitor) => {
                textStr += "<br/>" + val.PerceiveData;
                delIds.push(val.ID)
            });
        }
        this.layer.confirm(textStr, {
            icon: 0,
            title: this.i18nFactory('DP_CONFIG_COMMON_42'),
            area: ["500px", "200px"]
        }, (index: number) => {
            this.layer.close(index);
            this.submitDeleteByIds(delIds);
        });
    }

    submitDeleteByIds(ids: Array<string>) {
        if (ids && ids.length > 0) {
            if (this.CurrentInfo.LibType === this.FaceType) {
                this.taskService.deleteFaceTaskForIDS(ids).then((res: ResponseResult<string>) => {
                    if (res.code === 200) {
                        this.getFaceListByParams(this.findListFaceParams);
                    }
                });
            } else if (this.CurrentInfo.LibType === this.CarType) {
                this.taskService.deleteCarTaskForIDS(ids).then((res: ResponseResult<string>) => {
                    if (res.code === 200) {
                        this.getCarListByParams(this.findListCarParams);
                    }
                });
            } else if (this.CurrentInfo.LibType === this.MacType) {
                this.taskService.deleteMacTaskForIDS(ids).then((res: ResponseResult<string>) => {
                    if (res.code === 200) {
                        this.getMacListByParams(this.findListMacParams);
                    }
                });
            }
        }
    };


    // 打钩 选择 回调
    afterChangeCheck(resultList: Array<boolean>, isCheckAll: boolean): void {
        this.setIsSelectItems(resultList);
        if (this.CurrentInfo.LibType === this.FaceType) {
            this.selectedFaceList = resultList;
            this.isSelectFaceAll = isCheckAll;
        } else if (this.CurrentInfo.LibType === this.CarType) {
            this.selectedCarList = resultList;
            this.isSelectCarAll = isCheckAll;
        } else if (this.CurrentInfo.LibType === this.MacType) {
            this.selectedMacList = resultList;
            this.isSelectMacAll = isCheckAll;
        }

    }

    //获取当前已被选中列表
    getSelectedList(): Array<TaskModel | MacMonitor | CarMonitor> {
        let selectedDataList: Array<TaskModel | MacMonitor | CarMonitor> = [];
        if (this.CurrentInfo.LibType === this.FaceType) {
            if (this.selectedFaceList) {
                angular.forEach(this.tBodyListFace, (val: TaskModel, index: number) => {
                    if (this.selectedFaceList[index]) {
                        selectedDataList.push(val);
                    }
                });
            }
        } else if (this.CurrentInfo.LibType === this.CarType) {
            if (this.selectedCarList) {
                angular.forEach(this.tBodyListCar, (val: CarMonitor, index: number) => {
                    if (this.selectedCarList[index]) {
                        selectedDataList.push(val);
                    }
                });
            }
        } else if (this.CurrentInfo.LibType === this.MacType) {
            if (this.selectedMacList) {
                angular.forEach(this.tBodyListMac, (val: MacMonitor, index: number) => {
                    if (this.selectedMacList[index]) {
                        selectedDataList.push(val);
                    }
                });
            }
        }
        return selectedDataList;
    }


    //about page click
    changePage(num: number, type: string): void {
        if (type === this.TaskTypes.Face.value) {
            this.findFaceByPageParams.currentPage = num;
            this.getListByPage(this.findFaceByPageParams, type);
        } else if (type === this.TaskTypes.Mac.value) {
            this.findMacByPageParams.currentPage = num;
            this.getListByPage(this.findMacByPageParams, type);
        } else if (type === this.TaskTypes.Car.value) {
            this.findCarByPageParams.currentPage = num;
            this.getListByPage(this.findCarByPageParams, type);
        }
    }

    changePageSize(num: number, type: string): void {
        if (type === this.TaskTypes.Face.value) {
            this.findFaceByPageParams.pageSize = num;
            this.getListByPage(this.findFaceByPageParams, type);
        } else if (type === this.TaskTypes.Mac.value) {
            this.findMacByPageParams.pageSize = num;
            this.getListByPage(this.findMacByPageParams, type);
        }
    }

    /**
     * creator wyr: 判断和设置当前列表是否有选中的元素
     * @param items
     */
    setIsSelectItems(items: Array<boolean>): void {
        let result = false;
        if (items && items.length > 0) {
            let i, len;
            for (i = 0, len = items.length; i < len; i++) {
                if (items[i]) {
                    result = true;
                    break;
                }
            }
        }
        if (this.CurrentInfo.LibType === this.FaceType) {
            if (this.isSelectFaceItems !== result) {
                this.isSelectFaceItems = result;
            }
        } else if (this.CurrentInfo.LibType === this.CarType) {
            if (this.isSelectCarItems !== result) {
                this.isSelectCarItems = result;
            }
        } else if (this.CurrentInfo.LibType === this.MacType) {
            if (this.isSelectMacItems !== result) {
                this.isSelectMacItems = result;
            }
        }
    }

}

app.controller("taskConfigController", TaskController);