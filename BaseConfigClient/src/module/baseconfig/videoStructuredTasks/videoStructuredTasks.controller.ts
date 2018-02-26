import "css!../css/baseconfig-task.css";
import {app} from "../../common/app/main.app";
import {ITreeDataParams, TreeDataParams} from "../../common/directive/tree/tree-params";
import "../../common/directive/tree/tree.directive.service";
import {ITreeDirectiveService} from "../../common/directive/tree/tree.directive.service";

import "../../common/services/videoStructuredTasks.service";
import {IVideoStructuredTasksService} from "../../common/services/videoStructuredTasks.service";

import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {ITableHeader} from "../../common/directive/unit-table/table-params";


import "../../common/services/area.service";
import {IAreaService} from "../../common/services/area.service";


import {TreeParams} from "../../../core/params/tree/TreeParams";

import {IPagination, PageParamsAndResult, Pagination} from '../../common/Pagination';

import {ResponseResult} from "../../../core/params/result/ResponseResult";

import {Enum} from "../../../core/enum/Enum";
import {StructTask} from "../../../core/server/enum/TaskType";

import {TaskModel, CarMonitor, TaskSearchParams} from "../../../core/server/TaskModel";
import {TaskStatus} from "../../../core/server/enum/TaskStatus";
import {AuditStatus} from "../../../core/server/enum/AuditStatus";
import {ILayerDec} from "../../common/factory/layerMsg.factory";
import "../../common/factory/layerMsg.factory";
import {IUserInfoCacheFactory} from "../../common/factory/userinfo.cache.factory";
import "../../common/factory/userinfo.cache.factory";
declare let window: any;
declare let angular: any;


class VideoStructuredTasksController {
    currentUserId: string;
    currentType: string = StructTask.FaceStruct.value;
    taskTypeBtnList: Array<Enum>;
    MonitorStatusLib: Array<Enum>;
    VideoAuditStatusLib: Array<Enum>;
    // 选择行政区域树
    areaTreeDatas: ITreeDataParams<AreaEx>;
    areaTreeSearchInputStr: string = null;
    /*TODO 接口暂无 提供分页功能*/
    //------directive pages params
    pageResultFace: PageParamsAndResult = new PageParamsAndResult();
    //获取布控列表请求参数
    searchParams: TaskSearchParams = new TaskSearchParams();
    facePagination: IPagination = new Pagination();
    // table 列表数据
    FaceAreaName: string = null;
    tFaceHeadList: Array<ITableHeader>;
    selectedFaceList: Array<boolean>;
    isSelectFaceAll: boolean = false;
    // alter wyr: 用于判断当前界面上的列表是否被选中
    isSelectFaceItems: boolean = false;
    currentLayerIndex: number;
    static $inject = [
        '$scope',
        '$timeout',
        '$state',
        'layer',
        'i18nFactory',
        'areaService',
        'videoStructuredTasksService',
        'treeDirectiveService',
        'layerDec',
        'userInfoCacheFactory'
    ];

    constructor(private $scope: any,
                private $timeout: any,
                private $state: any,
                private layer: any,
                private i18nFactory: Function,
                private areaService: IAreaService,
                private videoStructuredTasksService: IVideoStructuredTasksService,
                private treeService: ITreeDirectiveService,
                private layerDec:ILayerDec,
                private userInfoCacheFactory:IUserInfoCacheFactory) {

        this.initTableParamsData();
        this.initTypeOptions();
        this.initStatusLib();
        this.initAreaTreeParams();
        this.getAreaTreeList();

    };

    // 枚举获取类型列表
    private initStatusLib() {
        let monitorStatus = [] as Array<Enum>;
        let auditStatus = [] as Array<Enum>;
        for (let k in TaskStatus) {
            monitorStatus.push({value: TaskStatus[k].value, text: TaskStatus[k].text} as Enum)
        }
        for (let k in AuditStatus) {
            auditStatus.push({value: AuditStatus[k].value, text: AuditStatus[k].text} as Enum)
        }
        this.MonitorStatusLib = monitorStatus;
        this.VideoAuditStatusLib = auditStatus;

    }

    private initTypeOptions() {
        let resultList = [] as Array<Enum>;
        for (let k in StructTask) {
            resultList.push(StructTask[k]);
        }
        this.taskTypeBtnList = resultList;
    };


    onClickTaskTypeBtn(btnItem: Enum) {

    };


    initTableParamsData() {
        this.tFaceHeadList = [
            {field: "Name", title: "DP_VIDEOSTRUCTURE_07"},
            {field: "AreaName", title: "DP_VIDEOSTRUCTURE_08"},
            {field: "CreateUserName", title: "DP_VIDEOSTRUCTURE_09"},
            {field: "EffiTime", title: "DP_VIDEOSTRUCTURE_10"},
            {field: "VideoAuditStatus", title: "DP_VIDEOSTRUCTURE_03"},
            {field: "status", title: "DP_VIDEOSTRUCTURE_04"},
            {field: "Auth", title: "DP_VIDEOSTRUCTURE_11"},
            {field: "", title: "DP_CONFIG_COMMON_15"}
        ];
    }


    //条件搜索任务列表
    onClickSearch() {


    };

    //----------- 树列 操作函数
    initAreaTreeParams() {
        // 树列表数据
        //初始化 area 树数据
        this.areaTreeDatas = new TreeDataParams<AreaEx>();
        this.areaTreeDatas.treeId = 'areaTreeByTaskConfig';
        this.searchParams.userId =this.userInfoCacheFactory.getCurrentUserId();
        // 节点选择
        this.areaTreeDatas.onClick = (event: MouseEvent, treeId: string, treeNode: AreaEx) => {
            this.searchParams.areaId = treeNode.ID;
            this.getFaceListByParams();
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


    getFaceListByParams() {
        console.log(this.pageResultFace)
        this.videoStructuredTasksService.findFaceListByParams(this.searchParams).then((res: ResponseResult<Array<TaskModel>>) => {
            this.facePagination.set(res.data);
            this.pageResultFace = this.facePagination.getByPage(this.pageResultFace);
        });
    };


    //前往 更新
    goToUpdateTask(taskItem: TaskModel & CarMonitor) {
        this.$state.go('baseconfig.videoStructuredTasks.videoNewFaceTask', {
            taskId: taskItem.ID,
            areaId: taskItem.AreaID,
            type: 'FaceStruct'
        });

    };

    goNewMonitor(type: string) {
        this.$state.go('baseconfig.videoStructuredTasks.videoNewFaceTask', {
            areaId: this.searchParams.areaId,
            type: 'FaceStruct'
        });
    };

    // 改变运行，过期不做操作  停止/运行 切换
    changeTaskRunStatus(taskItem: TaskModel) {
        console.log(taskItem)
        if (taskItem.AuditStatus === AuditStatus.Verified.value && taskItem.Status === TaskStatus.Stop.value) {
            let textStr: string;
            textStr = `您确定启动 ${taskItem.Name}?`;
            this.layer.confirm(textStr, {
                icon: 0,
                title: this.i18nFactory('DP_CONFIG_COMMON_47'),
                area: ["500px", "200px"]
            }, (index: number) => {
                this.layer.close(index);
                this.submitChangeRunStatus([taskItem.ID], true);
            });

        } else if (taskItem.Status === TaskStatus.Run.value && taskItem.AuditStatus === AuditStatus.Verified.value) {
            let textStr: string;
            textStr = `您确定停止 ${taskItem.Name}?`;
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
        console.log(taskItemModels);
        angular.forEach(taskItemModels, (val: TaskModel) => {
            textStr += "<br/>" + val.Name;
            delIds.push(val.ID)
        });
        if (delIds.length > 0) {
            this.layer.confirm(textStr, {
                icon: 0,
                title: this.i18nFactory('DP_CONFIG_COMMON_42'),
                area: ["500px", "200px"]
            }, (index: number) => {
                this.layer.close(index);
                this.submitChangeRunStatus(delIds, isStart);
            });
        } else {
            this.layerDec.warnInfo(isStart ? "当前没有可开启的任务！" : "当前没有可暂停的任务！")
        }

    };

    // 确定提交 改变状态
    private submitChangeRunStatus(ids: Array<string>, isStart: boolean) {

        if (ids && ids.length > 0) {
            let idL = ids.join(',');
            this.videoStructuredTasksService.updateFaceRunStatus(idL, isStart).then((resp: ResponseResult<any>) => {
                console.log(resp)
                if (resp && resp.data.code == 200) {
                    console.log("5");
                    this.getFaceListByParams();
                } else {
                    console.error(resp);
                }
            });

        }
    };

    /*
    * 删除单个
    * */
    onClickDeleteById(taskItemModel: TaskModel) {
        let textStr: string;
        textStr = `确定要删除 ${taskItemModel.Name}?`;
        this.layer.confirm(textStr, {
            icon: 0,
            title: this.i18nFactory('DP_CONFIG_COMMON_42'),
            area: ["500px", "200px"]
        }, (index: number) => {
            this.layer.close(index);
            this.submitDeleteByIds([taskItemModel.ID]);
        });
    };

    /*
    * 删除多个
    * */
    onClickDeleteByIds() {
        let textStr = "确定删除：";
        let delIds = [] as Array<string>;
        let taskItemModels = this.getSelectedList();
        angular.forEach(taskItemModels, (val: TaskModel) => {
            textStr += "<br/>" + val.Name;
            delIds.push(val.ID)
        });
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
            this.videoStructuredTasksService.deleteFaceTaskForIDS(ids).then((resp: any) => {
                let res = resp.data as ResponseResult<string>;
                if (res) {
                    this.getFaceListByParams();
                }
            });
        }
    };


    // 打钩 选择 回调
    afterChangeCheck(resultList: Array<boolean>, isCheckAll: boolean): void {
        console.log(resultList)
        this.setIsSelectItems(resultList);
        this.selectedFaceList = resultList;
        this.isSelectFaceAll = isCheckAll;

    }

    //获取当前已被选中列表
    getSelectedList(): Array<TaskModel> {
        let selectedDataList: Array<TaskModel> = [];
        if (this.selectedFaceList) {
            angular.forEach(this.pageResultFace.data, (val: TaskModel, index: number) => {
                if (this.selectedFaceList[index]) {
                    selectedDataList.push(val);
                }
            });
        }
        return selectedDataList;
    }


    //about page click
    changePage(num: number, type: string): void {
        this.pageResultFace.currentPage = num;
        this.$timeout(() => {
            this.pageResultFace = this.facePagination.getByPage(this.pageResultFace);
        })
    }

    changePageSize(num: number, type: string): void {
        this.pageResultFace.pageSize = num;
        this.pageResultFace.currentPage = 1;
        this.$timeout(() => {
            this.pageResultFace = this.facePagination.getByPage(this.pageResultFace);
        })
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
        if (this.isSelectFaceItems !== result) {
            this.isSelectFaceItems = result;
        }
    }

}

app.controller("VideoStructuredTasksController", VideoStructuredTasksController);


