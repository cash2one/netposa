/// <amd-dependency path="text!../../../selectPopup/personSelect/person.select.html" name="personSelectHtml" />
/// <amd-dependency path="text!../../runPlan/runPlan.popup.other.html" name="runplanTpl" />
/// <amd-dependency path="text!../../eventRule/eventRule.popup.newMacMonitor.html" name="eventRuleTpl" />
import "../../../selectPopup/personSelect/person.select.controller";
import "../../runPlan/runPlan.popup.controller";
import "../../eventRule/eventRule.popup.controller";
import "css!../../style/baseconfig-face-monitor.css";
import { app } from "../../../common/app/main.app";
import "angular";
import { Enum } from "../../../../core/enum/Enum";
import { AuthStatus } from "../../../../core/server/enum/AuthStatus";
import { TaskModel, CameraParam } from "../../../../core/server/TaskModel";

import "../../../common/services/connectTree.service";
import { IConnectTreeService } from "../../../common/services/connectTree.service";
import { BackResponseBody, ResponseResult } from "../../../../core/params/result/ResponseResult";


import "../../../common/services/task.service";
import { ITaskService } from "../../../common/services/task.service";
import { AreaEx } from "../../../../core/entity/ex/AreaEx";
import { CameraEx } from "../../../../core/entity/ex/CameraEx";
import { TreeDataParams } from "../../../common/directive/tree/tree-params";
import { TreeType } from "../../../../core/enum/TreeType";

import { ITreeDirectiveService } from "../../../common/directive/tree/tree.directive.service";
import "../../../common/directive/tree/tree.directive.service";
import { TaskType } from "../../../../core/server/enum/TaskType";
import { PersonTreeEx } from "../../../../core/entity/ex/PersonTreeEx";
import { IUserInfoCacheFactory } from "../../../common/factory/userinfo.cache.factory";
import { User } from "../../../../core/entity/User";
import { IUserService } from "../../../common/services/user.service";
import "../../../common/services/user.service";
import { TimeTemplate } from "../../../../core/entity/TimeTemplate";
import { ThresholdType } from "../../../../core/server/enum/ThresholdType";
import { ILayerDec } from "../../../common/factory/layerMsg.factory";
import "../../../common/factory/layerMsg.factory";
import { AuditStatus } from "../../../../core/server/enum/AuditStatus";
import { TaskStatus } from "../../../../core/server/enum/TaskStatus";
import { BusinessLibEx } from "../../../../core/entity/ex/BusinessLibEx";
import { AreaAndBusinessListResult } from "../../../../core/params/BusinessLibParams";
import { IBusinessLibService } from "../../../common/services/businessLib.service";
import "../../../common/services/businessLib.service";
import { DrawSpace, IDrawSpace, IDrawSpacePositionTop, IScale } from "./DrawSpace";
import { ObjectType } from "../../../../core/enum/ObjectType";
import { IVideoOcxControlFunc, VideoOcxRealTimeOpt } from "../../../common/directive/ocx/video.ocx.directive";
import { VideoOcxAttr } from "../../../common/directive/ocx/video.ocx.model";
import { IResourceService } from "../../../common/services/resource.service";
import "../../../common/services/resource.service";
import { EventRuleEx } from "../../../../core/entity/ex/EventRuleEx";


declare let angular: any;
declare let personSelectHtml: any, runplanTpl: any, eventRuleTpl: any;
type AreaBusinessLibEx = AreaEx & BusinessLibEx;

class NewFaceMonitorController {
    taskConfigAuditKey: string = "toolOption.myCheck";//审核人员权限标记
    authStatusList: Array<Enum>;//权限枚举
    layerIndex: number;//
    areaList: Array<AreaEx> = [];//区域数据用于合成选中摄像机树结构
    taskModel: TaskModel = new TaskModel();//当前任务model
    selectCameraList: Array<CameraEx> = [];//选中摄像机列表
    cameraParamSelectedList: Array<CameraParam> = [];//摄像机配置的列表
    tempSelectedPerson: Array<string> = [];//选择部分人可见的人员id集合
    cameraListForMap: { [key: string]: CameraEx } = {};//摄像机的map对象
    cameraTreeParams: TreeDataParams<AreaEx | CameraEx> = new TreeDataParams<AreaEx | CameraEx>();//摄像机树
    selectCameraTreeParams: TreeDataParams<AreaEx | CameraEx> = new TreeDataParams<AreaEx | CameraEx>();//已选摄像机树
    faceLibTreeParams: TreeDataParams<AreaBusinessLibEx> = new TreeDataParams<AreaBusinessLibEx>();//人像库树
    searchCameraStr: string;
    searchSelectCameraStr: string;
    searchFaceLibStr: string;
    selectPersonID: Array<string>;
    hasTaskAudit: boolean;
    userAuditList: Array<User> = [];
    timeTemplateList: Array<TimeTemplate> = [];
    eventRuleList: Array<EventRuleEx> = [];
    thresholdType: string = ThresholdType.Hight.value;
    faceLibSelectedIdList: Array<string> = [];
    tempSelectPositonCameraList: Array<CameraEx> = [];
    DrawSpace: IDrawSpace;
    videoOcx: IVideoOcxControlFunc;
    nowVideoOcxAttr: VideoOcxAttr;
    nowVideoScale: IScale;
    ocxCapturePicStr: string;
    showCameraConfig: boolean = false;
    showOcx: boolean = false;
    playSuccess: boolean = false;
    static $inject = [
        '$scope',
        '$state',
        '$stateParams',
        '$timeout',
        'layer',
        'treeDirectiveService',
        'taskService',
        'connectTreeService',
        'userInfoCacheFactory',
        'userService',
        'layerDec',
        'businessLibService',
        'resourceService',
    ];

    constructor(private $scope: any,
        private $state: any,
        private $stateParams: any,
        private $timeout: any,
        private layer: any,
        private treeDirectiveService: ITreeDirectiveService,
        private taskService: ITaskService,
        private connectTreeService: IConnectTreeService,
        private userInfoCacheFactory: IUserInfoCacheFactory,
        private userService: IUserService,
        private layerDec: ILayerDec,
        private businessLibService: IBusinessLibService,
        private resourceService: IResourceService) {
        this.DrawSpace = new DrawSpace();
        this.hasTaskAudit = this.userInfoCacheFactory.hasFuncAuth(this.taskConfigAuditKey);
        this.getTaskDetail(this.$stateParams.taskId);
        this.initAuthStatusList();
        this.getEnumList();
        this.initSelectCameraTreeParams();
        this.$scope.$on('person.select.popup', (event: any, data?: Array<string>) => {
            if (Array.isArray(data)) {
                this.selectPersonID = data;
            }
            this.layer.close(this.layerIndex)
        });

        this.$scope.$on('add.runplan.popup', (event: any, isFresh?: boolean, data?: TimeTemplate) => {
            if (isFresh) {
                this.taskModel.TimeTemplateID = data.ID;
                this.taskModel.TimeTemplate = data;
            }
            this.layer.close(this.layerIndex)
        });

        this.$scope.$on('close.eventRule.popup', (event: any, isFresh?: boolean, eventRule?: EventRuleEx) => {
            this.layer.close(this.layerIndex);
            if (isFresh) {
                this.taskModel.EventRule = eventRule
            }
        })
    }

    /**
     * @desc 初始化ocx
     * @param {IVideoOcxControlFunc} ocxControlFunc
     */
    initComplete(ocxControlFunc: IVideoOcxControlFunc) {
        this.videoOcx = ocxControlFunc;
    }

    /**
     * @desc 初始化摄像机树
     */
    initCameraTreeParams() {
        this.cameraTreeParams.treeId = 'CameraTreeID_FaceMonitor';
        this.cameraTreeParams.isShowIcon = true;
        this.cameraTreeParams.isShowLine = false;
        this.cameraTreeParams.checkEnable = true;
        this.cameraTreeParams.isSingleSelect = false;
        this.cameraTreeParams.isSimpleData = true;
        this.cameraTreeParams.onCheck = (event: Event, treeId: string, treeNode: any): void => {
            this.$timeout(() => {
                this.selectCameraList = this.getCheckedList(TreeType.camera.value, this.cameraTreeParams.treeId);
                this.cameraParamSelectedList = this.selectCameraToCameraParams(this.selectCameraList);
            });
        };
        this.cameraTreeParams.treeInitComplete = (treeId: string): void => {
            if (this.$stateParams.taskId) {
                this.cameraParamSelectedList = this.taskModel.CameraParams
            }
            if (Array.isArray(this.taskModel.CameraParams) && this.taskModel.CameraParams.length > 0) {
                let ids: Array<string> = this.taskModel.CameraParams.map((item: CameraParam) => {
                    return item.CameraID;
                });
                this.defaultCheckTreeByIds(TreeType.camera.value, this.cameraTreeParams.treeId, ids);
                this.selectCameraList = this.getCheckedList(TreeType.camera.value, this.cameraTreeParams.treeId);
            }
        };
        this.connectTreeService.findAreaCamera().then((res: Array<AreaEx | CameraEx>) => {
            this.cameraTreeParams.treeDatas = res;
            this.$timeout(() => {
                res.forEach((item: CameraEx) => {
                    this.cameraListForMap[item.ID] = item;
                });
            })
        })
    }

    private selectCameraToCameraParams(list: Array<CameraEx>) {
        let arr = [] as Array<CameraParam>;
        list.forEach((item: CameraEx, index: number) => {
            let isHava = false;
            let l: number;
            for (let i = 0; i < this.cameraParamSelectedList.length; i++) {
                if (this.cameraParamSelectedList[i].CameraID === item.ID) {
                    isHava = true;
                    l = i;
                    break;
                }
            }
            if (!isHava) {
                let CameraPositon = new CameraParam();
                CameraPositon.CameraID = item.ID;
                arr.push(CameraPositon);
            } else {
                arr.push(this.cameraParamSelectedList[l])
            }

        });
        return arr;
    }


    /**
     * @desc 已选摄像机树配置
     */
    private initSelectCameraTreeParams() {
        this.selectCameraTreeParams = new TreeDataParams<AreaEx | CameraEx>(true);
        this.selectCameraTreeParams.treeId = 'Select_CameraTreeID_FaceMonitor';

        this.selectCameraTreeParams.isShowIcon = true;
        this.selectCameraTreeParams.isShowLine = false;

        this.selectCameraTreeParams.checkEnable = true;

        this.selectCameraTreeParams.isSingleSelect = false;
        this.selectCameraTreeParams.isSimpleData = true;

        this.selectCameraTreeParams.onCheck = (event: Event, treeId: string, treeNode: any): void => {
            this.$timeout(() => {
                this.tempSelectPositonCameraList = this.getCheckedList(TreeType.camera.value, this.selectCameraTreeParams.treeId);
            });
        };
        this.selectCameraTreeParams.onDblClick = (event: Event, treeId: string, treeNode: CameraEx): void => {
            if (treeNode.treeType === TreeType.camera.value) {
                this.playSuccess = false;
                this.DrawSpace.isShowAreaSpace(false);
                this.showOcx = true;
                this.playRealTime(treeNode);
                this.$timeout(() => {
                    if (this.treeDirectiveService.updateNodeChecked(treeId, treeNode.tId, true)) {
                        this.tempSelectPositonCameraList = this.getCheckedList(TreeType.camera.value, this.selectCameraTreeParams.treeId);
                    }
                })
            }

        };
        this.selectCameraTreeParams.treeInitComplete = (treeId: string): void => {
            this.treeDirectiveService.expandAll(this.selectCameraTreeParams.treeId, true);
            this.treeDirectiveService.checkAllNodes(this.selectCameraTreeParams.treeId, false);
        };

        this.selectCameraTreeParams.addDiyDom = (treeId: string, treeNode: any) => {
            if (treeNode && treeNode.isSetCameraParams) {
                // 显示已布点标志
                let locateStr = "<span class='js-locate-diy-dom'>√</span>";
                let aObj = angular.element(document.getElementById(treeNode.tId + "_a"), "#" + treeNode.tId + "_a");
                // 若已存在布点标志则跳过
                if (aObj.children(".js-locate-diy-dom").size() <= 0) {
                    aObj.append(locateStr);
                }
            } else if (treeNode) {
                // 移除布点标志
                let aObj = angular.element(document.getElementById(treeNode.tId + "_a"), "#" + treeNode.tId + "_a");
                if (aObj.children(".js-locate-diy-dom").size() >= 0) {
                    aObj.children(".js-locate-diy-dom").remove();
                }
            }
        }
    };


    /**
     * @desc 初始化人像库树
     */
    private initFaceLibTreeParams() {
        this.faceLibTreeParams = new TreeDataParams<AreaBusinessLibEx>(true);
        this.faceLibTreeParams.treeId = 'FaceLibTreeID_FaceMonitor';

        this.faceLibTreeParams.isShowIcon = true;
        this.faceLibTreeParams.isShowLine = false;

        this.faceLibTreeParams.checkEnable = true;

        this.faceLibTreeParams.isSingleSelect = false;
        this.faceLibTreeParams.isSimpleData = true;

        this.faceLibTreeParams.onCheck = (event: Event, treeId: string, treeNode: any): void => {
            //更新已选 人脸库 ids 集合
            this.$timeout(() => {
                this.updateFaceLibCheckIdList();
            });
        };

        this.faceLibTreeParams.treeInitComplete = (treeId: string): void => {
            if (this.$stateParams.taskId) {
                this.faceLibSelectedIdList = this.taskModel.ArrLibIds;
            }
            this.defaultCheckTreeByIds(TreeType.businessLib.value, treeId, this.faceLibSelectedIdList);
        };
        this.businessLibService.findHasSelfTreeWithArea().then((resp: ResponseResult<AreaAndBusinessListResult>) => {
            if (resp && resp.code == 200 && resp.data) {
                this.areaList = resp.data.areaExList;
                let treeData = [].concat(resp.data.businessLibExList, this.areaList);
                this.$timeout(() => {
                    this.faceLibTreeParams.treeDatas = treeData;
                })
            }
        })
    };

    /**
     * @desc 更新人像库树，以选中节点ID集合
     */
    private updateFaceLibCheckIdList(): void {
        let treeType: string = TreeType.businessLib.value;
        let treeId: string = this.faceLibTreeParams.treeId;
        let allCheckBusinessLib = this.getCheckedList(treeType, treeId);
        let faceLibIdList = [] as Array<string>;
        if (allCheckBusinessLib && allCheckBusinessLib.length > 0) {
            angular.forEach(allCheckBusinessLib, (val: any) => {
                if (val.treeType === TreeType.businessLib.value) {
                    faceLibIdList.push(val.ID);
                }
            });
        }
        this.faceLibSelectedIdList = faceLibIdList;
    }

    /**
     * @desc 显示配置摄像机
     */
    showCameraConfigFn() {
        if (this.selectCameraList.length > 0) {
            this.selectCameraList.forEach((item: CameraEx) => {
                item.ParentID = item.AreaID;
            });
            let treeDate = [].concat(angular.copy(this.selectCameraList), this.areaList);
            this.$timeout(() => {
                this.selectCameraTreeParams.treeDatas = treeDate;
            });
            this.showCameraConfig = true;
            this.showOcx = true;
            this.DrawSpace.isShowAreaSpace(false);
            this.treeDirectiveService.setChkDisabledAll(this.cameraTreeParams.treeId, true);
        } else {
            this.layerDec.warnInfo('当前未选择任何摄像机！')
        }
    }

    /**
     * @desc 取消配置摄像机和ocx
     */
    cencalConfig() {
        this.showCameraConfig = false;
        this.showOcx = false;
        this.treeDirectiveService.setChkDisabledAll(this.cameraTreeParams.treeId, false);
    }

    /**
     * @desc 播放ocx
     * @param {CameraEx} item
     */
    playRealTime(item: CameraEx) {
        if (item && this.videoOcx) {
            this.resourceService.getDeviceById(item.ID, ObjectType.Camera.value).then((res: CameraEx & Object) => {
                if (res && res.JsonUserData.hasOwnProperty('VideoServer')) {
                    let opts = new VideoOcxRealTimeOpt();
                    opts.ip = res.JsonUserData.VideoServer.IpAddress;
                    opts.port = res.JsonUserData.VideoServer.Port;
                    opts.path = res.PlayName;
                    opts.user = res.JsonUserData.VideoServer.Uid;
                    opts.passwd = res.JsonUserData.VideoServer.Pwd;
                    let playRes = this.videoOcx.playRealTime(opts, this.videoOcx.getFocusWindowIndex());
                    if (playRes === true) {
                        this.$timeout(() => {
                            //TODO 重置画布大小
                            this.DrawSpace.resetPositionArea();
                            this.DrawSpace.resetPositionSize();

                            this.playSuccess = true;
                            this.nowVideoOcxAttr = this.videoOcx.getVideoAttribute(this.videoOcx.getFocusWindowIndex());
                            let scale = new IScale();
                            scale.XScale = this.nowVideoOcxAttr.width / this.DrawSpace.getPosition().area.width;
                            scale.YScale = this.nowVideoOcxAttr.height / this.DrawSpace.getPosition().area.height;
                            this.nowVideoScale = scale;
                            console.log(this.DrawSpace.getPosition().area, scale);
                            this.DrawSpace.setScale(scale);
                        }, 2000)
                    }
                } else {
                    this.layerDec.warnInfo('无法播放摄像机！')
                }
            })
        }
    }


    /**
     * @desc ocx截图
     */
    capturePic() {
        let PicStr: string = this.videoOcx.catchPictrue(this.videoOcx.getFocusWindowIndex());
        this.ocxCapturePicStr = "data:image/jpg;base64," + PicStr;
        this.stop();
        this.showOcx = false;
        this.DrawSpace.isShowAreaSpace(true);
        this.DrawSpace.setImage(this.ocxCapturePicStr)
    }

    /**
     * @desc 停止播放ocx
     */
    stop() {
        if (this.videoOcx) {
            this.videoOcx.stop(this.videoOcx.getFocusWindowIndex());
        }

    }

    /**
     * @desc 设置布控摄像机参数
     */
    setCaneraPositon() {
        this.tempSelectPositonCameraList = this.getCheckedList(TreeType.camera.value, this.selectCameraTreeParams.treeId);
        let positions: IDrawSpacePositionTop = this.DrawSpace.getPosition();
        let defaultOptions = this.DrawSpace.getDefaultOptions();
        this.tempSelectPositonCameraList.forEach((item: any) => {
            item.isSetCameraParams = true;
            this.cameraParamSelectedList.forEach((itemCamera: CameraParam) => {
                if (item.ID === itemCamera.CameraID) {
                    itemCamera.DetectMaxSize = positions.max.width;
                    itemCamera.DetectMinSize = positions.min.width;
                    itemCamera.VideoLeft = positions.area.left * this.nowVideoScale.XScale;
                    itemCamera.VideoTop = positions.area.top * this.nowVideoScale.YScale;
                    itemCamera.VideoBottom = (defaultOptions.parent.height - positions.area.height - positions.area.top) * this.nowVideoScale.YScale;
                    itemCamera.VideoRight = (defaultOptions.parent.width - positions.area.width - positions.area.left) * this.nowVideoScale.XScale;
                }
            });
        });
        this.treeDirectiveService.updateNodes(this.selectCameraTreeParams.treeId, this.tempSelectPositonCameraList);
        this.updateTreeDiyDom(this.selectCameraTreeParams.treeId, this.tempSelectPositonCameraList);
        this.treeDirectiveService.checkAllNodes(this.selectCameraTreeParams.treeId, false);
        this.tempSelectPositonCameraList = [];
        this.layerDec.successInfo('设置成功！')
    }

    /**
     * @desc 批量去更新diyDom状态
     * @param {string} treeId
     * @param {Array<any>} treeNodes
     */
    updateTreeDiyDom(treeId: string, treeNodes: Array<any>) {
        this.$timeout(() => {
            treeNodes.forEach((item: any) => {
                this.selectCameraTreeParams.addDiyDom(treeId, item);
            })
        })
    }

    /**
     * @desc 修改报警阈值类型
     * @param {string} type
     */
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


    /**
     * @desc 获取时间模版列表，审核权限人员列表，联动策略列表
     */
    private getEnumList() {
        this.userService.getListByFuncAuthCode(this.taskConfigAuditKey).then((resp: ResponseResult<Array<User>>) => {
            if (resp.data && resp.code == 200) {
                this.userAuditList = resp.data;
            } else {
                this.userAuditList = [];
            }
        });
    };

    /**
     * @desc 获取已选择的 树节点集合
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


    onChangeSearchTree(treeId: string, name?: string): void {
        this.$timeout(() => {
            this.treeDirectiveService.filterShowNodes(treeId, 'Name', name);
        });
    };

    /**
     * @desc 获取任务详情，（编辑时候）
     * @param {string} taskId
     */
    getTaskDetail(taskId: string) {
        if (taskId) {
            this.taskService.findFaceById(taskId).then((resp: ResponseResult<TaskModel>) => {
                if (resp && resp.code == 200) {
                    this.initNewTackBaseParams(resp.data);
                } else {
                    this.initNewTackBaseParams(null);
                }
                this.initCameraTreeParams();
                this.initFaceLibTreeParams();
            });
        } else {
            this.initCameraTreeParams();
            this.initFaceLibTreeParams();
            this.initNewTackBaseParams(null);
        }
    };


    /**
     * @desc 初始化权限类型枚举
     */
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
            this.taskModel.Type = TaskType.FaceMonitor.value;
            this.taskModel.TaskType = TaskType.FaceMonitor.value;
            this.taskModel.OperateType = 'Add';
        } else {
            this.taskModel = tackDetail;
            this.taskModel.Type = TaskType.FaceMonitor.value;
            this.taskModel.OperateType = 'Update';
            this.taskModel.HighThreshold == 0 ? this.taskModel.HighThreshold = null : null;
            this.taskModel.LowThreshold == 0 ? this.taskModel.LowThreshold = null : null;
            if (this.taskModel.AuthStatus === AuthStatus.Part.value) {
                this.selectPersonID = eval(this.taskModel.AuthUser);
            }
        }

    };

    /**
     * @desc 新增时间模版(弹框)
     */
    addTimeTemplate() {
        let scope: { isTask: boolean, timeTplModel: TimeTemplate, $destroy: Function } = this.$scope.$new();
        scope.timeTplModel = this.taskModel.TimeTemplate;
        scope.isTask = true;
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

    addEventRule() {
        let scope: { isTask: boolean, eventRule: EventRuleEx, $destroy: Function } = this.$scope.$new();
        scope.isTask = true;
        scope.eventRule = this.taskModel.EventRule;
        this.layerIndex = this.layer.open({
            type: 1,
            content: eventRuleTpl,
            scope: scope,
            skin: "no-scroll",
            title: "选择联动策略",
            area: ["780px", "auto"],
            end: function () {
                scope.$destroy();
            }
        })
    }

    /**
     *@desc 当权限选择部分用户时，用户选择
     */
    openPersonSelectModel(): void {
        let scope: { treeData: Array<AreaEx | PersonTreeEx>, selectPersonID: Array<string>, $destroy: Function } = this.$scope.$new();
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

    /**
     * @desc 根据 数据集合 勾选 对应的树节点
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
        if (Array.isArray(ids) && ids.length > 0) {
            let checkParamsList = [] as Array<{ key: string, value: string }>;
            angular.forEach(ids, (val: string) => {
                checkParamsList.push({ key: paramName, value: val });
            });
            this.treeDirectiveService.checkNodesByParamsList(treeId, checkParamsList, true)
        }
    };

    /**
     * @desc 用于验证用户输入
     * @return {boolean}
     */
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
        if (!this.taskModel.EventRule) {
            this.layerDec.warnInfo('请选择联动策略');
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

        if (this.faceLibSelectedIdList.length === 0) {
            this.layerDec.warnInfo('请选择人像库');
            return result
        } else {
            this.taskModel.ArrLibIds = this.faceLibSelectedIdList
        }
        if (this.selectCameraList.length === 0) {
            this.layerDec.warnInfo('请选择摄像机');
            return result
        } else {
            this.taskModel.CameraParams = this.cameraParamSelectedList;
        }
        if (this.taskModel.AuthStatus === AuthStatus.Part.value && this.selectPersonID.length === 0) {
            this.layerDec.warnInfo('请选择可见的用户');
            return result
        } else {
            this.taskModel.AuthUsers = this.selectPersonID
        }
        if (this.taskModel.HighThreshold) this.taskModel.HighThreshold = Number(this.taskModel.HighThreshold);
        if (this.taskModel.LowThreshold) this.taskModel.LowThreshold = Number(this.taskModel.LowThreshold);
        if (this.thresholdType === ThresholdType.Hight.value && !this.taskModel.HighThreshold) {
            this.layerDec.warnInfo('请填写报警规则');
            return result
        }

        if (this.thresholdType === ThresholdType.Low.value && !this.taskModel.LowThreshold) {
            this.layerDec.warnInfo('请填写报警规则');
            return result
        }

        return !result;
    };


    /**
     * @desc 用户提交布控任务
     */
    submitTask() {
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
        let params = {} as { taskModel: TaskModel, eventRule: EventRuleEx };
        params.taskModel = this.taskModel;
        params.eventRule = this.taskModel.EventRule;
        this.taskService.addOrUpdateFaceTask(params).then((res: BackResponseBody<string>) => {
            if (res.code === 200) {
                this.cancelTask()
            }
        })

    }

    /**
     * @desc 取消新增或修改任务
     */
    cancelTask() {
        this.$state.go('baseconfig.task')
    }
}

app.controller('newFaceMonitorController', NewFaceMonitorController)