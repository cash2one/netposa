/// <amd-dependency path="text!../../../selectPopup/personSelect/person.select.html" name="personSelectHtml" />
/// <amd-dependency path="text!../../runPlan/runPlan.popup.other.html" name="runplanTpl" />
import "../../../selectPopup/personSelect/person.select.controller";
import "../../runPlan/runPlan.popup.controller";
import "css!../../style/baseconfig-face-struct.css";
import {app} from "../../../common/app/main.app";
import "angular";
import {Enum} from "../../../../core/enum/Enum";
import {AuthStatus} from "../../../../core/server/enum/AuthStatus";
import {TaskModel, CameraParam} from "../../../../core/server/TaskModel";

import "../../../common/services/connectTree.service";
import {IConnectTreeService} from "../../../common/services/connectTree.service";
import {BackResponseBody, ResponseResult} from "../../../../core/params/result/ResponseResult";


import "../../../common/services/videoStructuredTasks.service";
import {IVideoStructuredTasksService} from "../../../common/services/videoStructuredTasks.service";
import {AreaEx} from "../../../../core/entity/ex/AreaEx";
import {CameraEx} from "../../../../core/entity/ex/CameraEx";
import {TreeDataParams} from "../../../common/directive/tree/tree-params";
import {TreeType} from "../../../../core/enum/TreeType";

import {ITreeDirectiveService} from "../../../common/directive/tree/tree.directive.service";
import "../../../common/directive/tree/tree.directive.service";
import {StructTask} from "../../../../core/server/enum/TaskType";
import {PersonTreeEx} from "../../../../core/entity/ex/PersonTreeEx";
import {IUserInfoCacheFactory} from "../../../common/factory/userinfo.cache.factory";
import {User} from "../../../../core/entity/User";
import {IUserService} from "../../../common/services/user.service";
import "../../../common/services/user.service";
import {TimeTemplate} from "../../../../core/entity/TimeTemplate";
import {ITimeTemplateService} from "../../../common/services/timeTemplate.service";
import "../../../common/services/timeTemplate.service";
import {ThresholdType} from "../../../../core/server/enum/ThresholdType";
import {ILayerDec} from "../../../common/factory/layerMsg.factory";
import "../../../common/factory/layerMsg.factory";
import {AuditStatus} from "../../../../core/server/enum/AuditStatus";
import {TaskStatus} from "../../../../core/server/enum/TaskStatus";

declare let angular: any;
declare let personSelectHtml: any, runplanTpl: any;

class ViewNewTaskController {
    taskConfigAuditKey: string = "toolOption.myCheck";
    authStatusList: Array<Enum>;
    layerIndex: number;
    taskModel: TaskModel = new TaskModel();
    selectCameraList: Array<CameraEx> = [];
    tempSelectedPerson: Array<string> = [];
    cameraTreeParams: TreeDataParams<AreaEx | CameraEx> = new TreeDataParams<AreaEx | CameraEx>();
    cameraTreeData: Array<AreaEx | CameraEx> = [];
    personTreeData: Array<AreaEx | PersonTreeEx> = [];
    searchCameraStr: string;
    selectPersonID: Array<string>;
    hasTaskAudit: boolean;
    userAuditList: Array<User> = [];
    // timeTemplateList: Array<TimeTemplate> = [];
    treeModelTpl: string = '/module/baseconfig/videoStructuredTasks/newFaceTask/camera.select.html?time=' + Date.now().toString();
    static $inject = [
        '$scope',
        '$state',
        '$stateParams',
        '$timeout',
        'layer',
        'treeDirectiveService',
        'videoStructuredTasksService',
        'connectTreeService',
        'userInfoCacheFactory',
        'userService',
        'timeTemplateService',
        'layerDec'
    ];

    constructor(private $scope: any,
                private $state: any,
                private $stateParams: any,
                private $timeout: any,
                private layer: any,
                private treeDirectiveService: ITreeDirectiveService,
                private videoStructuredTasksService: IVideoStructuredTasksService,
                private connectTreeService: IConnectTreeService,
                private userInfoCacheFactory: IUserInfoCacheFactory,
                private userService: IUserService,
                private timeTemplateService: ITimeTemplateService,
                private layerDec: ILayerDec) {
        this.hasTaskAudit = this.userInfoCacheFactory.hasFuncAuth(this.taskConfigAuditKey);
        this.initCameraTreeParams();
        this.getTaskDetail(this.$stateParams.taskId);
        this.initAuthStatusList();
        this.getAuditUserList();
        // this.getTimeTemplateList();

        this.$scope.$on('person.select.popup', (event: any, data?: Array<string>) => {
            if (Array.isArray(data)) {
                this.selectPersonID = data;
            }
            this.layer.close(this.layerIndex)
        });
        // this.$scope.$on('add.runplan.popup.other', (event: any, data?: TimeTemplate) => {
        //     if (data) {
        //         // this.timeTemplateList.push(data);
        //         this.taskModel.TimeTemplateID = data.ID;
        //     }
        //     this.layer.close(this.layerIndex)
        // })
        this.$scope.$on('add.runplan.popup', (event: any, isFresh?: boolean, data?: TimeTemplate) => {
            if (isFresh) {
                this.taskModel.TimeTemplateID = data.ID;
                this.taskModel.TimeTemplate = data;
            }
            this.layer.close(this.layerIndex)
        });
    }

    initCameraTreeParams() {
        this.cameraTreeParams.treeId = 'CameraTreeID_FaceStruct';
        this.cameraTreeParams.isShowIcon = true;
        this.cameraTreeParams.isShowLine = false;
        this.cameraTreeParams.checkEnable = true;
        this.cameraTreeParams.isSingleSelect = false;
        this.cameraTreeParams.isSimpleData = true;
        this.cameraTreeParams.treeDatas = this.cameraTreeData;
        this.cameraTreeParams.onCheck = (event: Event, treeId: string, treeNode: any): void => {
            this.$timeout(() => {
                this.selectCameraList = this.getCheckedList(TreeType.camera.value, treeId);
            });
        };
        this.cameraTreeParams.treeInitComplete = (treeId: string): void => {
            if (Array.isArray(this.taskModel.CameraParams) && this.taskModel.CameraParams.length > 0) {
                let ids: Array<string> = this.taskModel.CameraParams.map((item: CameraParam) => {
                    return item.CameraID;
                });
                console.log(ids);
                this.defaultCheckTreeByIds(TreeType.camera.value, this.cameraTreeParams.treeId, ids)
            }
        };
        this.connectTreeService.findAreaCamera().then((res: Array<AreaEx | CameraEx>) => {
            this.cameraTreeParams.treeDatas = res;
        })

    }


    getAuditUserList() {
        this.userService.getListByFuncAuthCode(this.taskConfigAuditKey).then((resp: ResponseResult<Array<User>>) => {
            if (resp.data && resp.code == 200) {
                this.userAuditList = resp.data;
                let userId = this.userInfoCacheFactory.getCurrentUserId();
                angular.forEach(this.userAuditList,(userAudit:User)=>{
                    if (userAudit.ID==userId) {
                        this.taskModel.AuditUser = userId;
                    }
                });
            } else {
                this.userAuditList = [];
            }
        });
    }

    changeThresholdType(type: string) {
        switch (type) {
            case ThresholdType.Hight.value:
                this.taskModel.LowThreshold = null;
                break;
            case ThresholdType.Low.value:
                this.taskModel.HighThreshold = null;
                break;
        }
    }


    // private getTimeTemplateList() {
    //     this.timeTemplateService.findAll().then((resp: ResponseResult<Array<TimeTemplate>>) => {
    //         if (resp.code === 200 && resp.data) {
    //             this.timeTemplateList = resp.data;
    //         } else {
    //             this.userAuditList = [];
    //         }
    //     });
    // };

    /** create by zxq
     * 获取已选择的 树节点集合
     * @time: 2017-06-12 12:02:32
     * @params: treeType 勾选节点 树类型标识
     * @params: treeId 勾选节点 树ID
     * @return: Array<CameraEx>&Array<BusinessLibEx> 节点集合 类型与 treeType 相对应
     */
    private getCheckedList(treeType: string, treeId: string): Array<CameraEx> {
        let treeCheckedNodes = this.treeDirectiveService.getCheckedNodes(treeId, true);
        let result: Array<CameraEx> = [] as Array<CameraEx>;
        if (treeCheckedNodes) {
            angular.forEach(treeCheckedNodes, (val: CameraEx) => {
                if (val.treeType === treeType) {
                    result.push(val);
                }
            });
        }
        return result;
    }

    removeCameraSelected(item: CameraEx, isRemoveAll?: boolean) {
        if (item) {
            this.treeDirectiveService.updateNodeChecked(this.cameraTreeParams.treeId, item.tId, false);
            this.selectCameraList = this.getCheckedList(TreeType.camera.value, this.cameraTreeParams.treeId);
        }
        if (isRemoveAll) {
            if (this.treeDirectiveService.checkAllNodes(this.cameraTreeParams.treeId, false)) {
                this.selectCameraList = [];
            }
        }
    }

    onChangeSearchTree(paramsName?: string): void {
        this.$timeout(() => {
            this.treeDirectiveService.filterShowNodes(this.cameraTreeParams.treeId, paramsName, 'Name');
        });
    };

    //获取任务详情
    getTaskDetail(taskId: string) {
        if (taskId) {
            this.videoStructuredTasksService.getFaceDetail(taskId).then((resp: ResponseResult<TaskModel>) => {
                if (resp && resp.code == 200) {
                    this.initNewTackBaseParams(resp.data);
                } else {
                    this.initNewTackBaseParams(null);
                }
            });
        } else {
            this.initNewTackBaseParams(null);
        }
    };


    // 初始化 权限 类型选择
    initAuthStatusList() {
        this.authStatusList = [] as Array<Enum>;
        for (let key in AuthStatus) {
            this.authStatusList.push(AuthStatus[key]);
        }
    };

    // 初始化 增改 任务基本属性
    initNewTackBaseParams(tackDetail: TaskModel) {
        // 若无权限，默认 选中 仅自己可见
        if (!tackDetail) {
            this.taskModel.AuthStatus = AuthStatus.Self.value;
            this.taskModel.AreaID = this.$stateParams.areaId;
            this.taskModel.Type = StructTask.FaceStruct.value;
            this.taskModel.TaskType = StructTask.FaceStruct.value;
            this.taskModel.OperateType = 'Add';
        } else {
            this.taskModel = tackDetail;
            this.taskModel.Type = StructTask.FaceStruct.value;
            this.taskModel.OperateType = 'Update';
            this.taskModel.HighThreshold == 0 ? this.taskModel.HighThreshold = null : null;
            this.taskModel.LowThreshold == 0 ? this.taskModel.LowThreshold = null : null;
            if(this.taskModel.AuthStatus === AuthStatus.Part.value){
                this.selectPersonID = eval(this.taskModel.AuthUser);
            }
        }

    };

    addTimeTemplate() {
        let scope: { tplList: Array<TimeTemplate>, $destroy: Function } = this.$scope.$new();
        // scope.tplList = this.timeTemplateList;
        this.layerIndex = this.layer.open({
            type: 1,
            content: runplanTpl,
            scope: scope,
            skin: "no-scroll",
            title: "新建运行计划",
            area: ["780px", "auto"],
            end: function () {
                scope.$destroy();
            }
        })
    }

    // 打开用户选择窗口
    openPersonSelectModel(): void {
        let scope: { treeData: Array<AreaEx | PersonTreeEx>, selectPersonID: Array<string>, $destroy: Function } = this.$scope.$new();
        scope.treeData = this.personTreeData;
        scope.selectPersonID = this.selectPersonID;
        this.layerIndex = this.layer.open({
            type: 1,
            scrollbar: false,
            title: ['选择用户', 'text-align: left;'],
            content: personSelectHtml,
            skin: 'update-person-layer',
            scope: scope,
            area: ["auto"],
            end: function () {
                scope.$destroy();
            }
        })
    }

    /** create by zxq
     * 根据 数据集合 勾选 对应的树节点
     * @time: 2017-06-12 12:02:32
     * @params: treeType 勾选节点 树类型标识
     * @params: treeId 勾选节点 树ID
     * @params: ids 结合
     * @params: paramName 匹配参数名称 默认 "ID"
     * @return:
     */
    private defaultCheckTreeByIds = (treeType: string, treeId: string, ids: Array<string>, paramName?: string): void => {
        if (!paramName) {
            paramName = "ID";
        }
        if (ids.length > 0) {
            let checkParamsList = [] as Array<{ key: string, value: string }>;
            angular.forEach(ids, (val: string) => {
                checkParamsList.push({key: paramName, value: val});
            });

            if (this.treeDirectiveService.checkNodesByParamsList(treeId, checkParamsList, true)) {
                this.selectCameraList = this.getCheckedList(treeType, treeId);
            }
        } else {
            this.selectCameraList = [];
        }
    };

    private validAndRestParams(): boolean {
        let result: boolean = false;
        if (!this.taskModel) {
            this.layerDec.warnInfo('请填写任务名称');
            return result
        }
        if (!this.taskModel.AuditUser) {
            this.layerDec.warnInfo('请选择审核用户');
            return result
        }
        if (!this.taskModel.TimeTemplateID) {
            this.layerDec.warnInfo('请选择运行计划');
            return result
        }
        if ((this.taskModel.ValidTimeStart && !this.taskModel.ValidTimeEnd) || (!this.taskModel.ValidTimeStart && this.taskModel.ValidTimeEnd) || (this.taskModel.ValidTimeStart > this.taskModel.ValidTimeEnd)) {
            this.layerDec.warnInfo('请填写正确的有效期');
            return result
        }
        if (!this.taskModel.ValidTimeStart && !this.taskModel.ValidTimeEnd) {
            this.taskModel.IsLongEffective = true
        } else {
            this.taskModel.IsLongEffective = false
        }

        if (this.selectCameraList.length === 0) {
            this.layerDec.warnInfo('请选择摄像机');
            return result
        } else {
            this.taskModel.CameraParams = this.selectCameraList.map((item: CameraEx) => {
                let cameraParam = new CameraParam();
                cameraParam.CameraID = item.ID;
                return cameraParam;
            })
        }
        if (this.taskModel.AuthStatus === AuthStatus.Part.value && this.selectPersonID.length === 0) {
            this.layerDec.warnInfo('请选择可见的用户');
            return result
        } else {
            this.taskModel.AuthUsers = this.selectPersonID
        }
        return !result;
    };

    submitStruct() {
        if (!this.validAndRestParams()) {
            return;
        }
        this.taskModel.CreateTime = new Date().toLocaleString();
        this.taskModel.CreateUserID = this.userInfoCacheFactory.getCurrentUserId();

        if (this.taskModel.AuditUser === this.taskModel.CreateUserID) {
            this.taskModel.AuditStatus = AuditStatus.Verified.value;
            this.taskModel.Status = TaskStatus.Run.value
        } else {
            this.taskModel.AuditStatus = AuditStatus.Verifing.value;
            this.taskModel.Status = TaskStatus.Waiting.value
        }
        this.videoStructuredTasksService.addOrUpdateFaceTask(this.taskModel).then((res: BackResponseBody<string>) => {
            if (res.code === 200) {
                this.cancelAddStruct()
            }
        })

    }
    cancelAddStruct(){
        this.$state.go('baseconfig.videoStructuredTasks')
    }
}

app.controller('viewNewTaskController', ViewNewTaskController);

