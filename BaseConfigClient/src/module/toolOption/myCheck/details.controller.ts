import {app} from "../../common/app/main.app";
import {AngularScope} from "../../common/types/baseAngularScope";
import {MyCheckModel} from "../../../core/server/MyCheckModel";
import {AuditStatus} from '../../../core/server/enum/AuditStatus';
import {PersonEx} from '../../../core/entity/ex/PersonEx';
import {BusinessLibEx} from '../../../core/entity/ex/BusinessLibEx';
import {CameraEx} from '../../../core/entity/ex/CameraEx';
import {TreeDataParams} from '../../common/directive/tree/tree-params';
import {BusinessLib} from '../../../core/server/RetrievalRecordModule';
import PortraitTool from '../../common/portrait-tool';
import {AreaEx} from '../../../core/entity/ex/AreaEx';
import {PersonTreeEx} from "../../../core/entity/ex/PersonTreeEx";
import {TaskModel, CameraParam} from '../../../core/server/TaskModel';
import {VideoTaskModel} from "../../../core/entity/VideoStructTask";
import {ITreeDirectiveService} from "../../common/directive/tree/tree.directive.service";
import {ITaskService} from "../../common/services/task.service";
import "../../common/services/task.service";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {AuthStatus} from "../../../core/server/enum/AuthStatus";

declare let angular: any;
export type CheckTaskModel = TaskModel;

export interface MyCheckDetailsParams extends AngularScope {
    MyCheck: MyCheckModel;
    MyTaskModel: CheckTaskModel;
    AuditStatusMap: { [key: string]: string };
    TaskTypeMap: { [key: string]: string };
    TaskStatusMap: { [key: string]: string };
    UserDatas: Array<PersonTreeEx | AreaEx>;
    BusinessLibDatas: Array<BusinessLibEx>;
    CameraDatas: Array<CameraEx | AreaEx>;
}

class DetailsController {
    static $inject = ['$scope', 'treeDirectiveService', 'taskService'];
    submit: Function;
    MyCheck: MyCheckModel;
    MyTaskModel: CheckTaskModel;
    userTreeParams: TreeDataParams<PersonTreeEx | AreaEx>;
    businessLibExParams: TreeDataParams<BusinessLibEx>;
    cameraExParams: TreeDataParams<CameraEx | AreaEx>;
    AuditStatusMap: { [key: string]: string };
    TaskTypeMap: { [key: string]: string };
    TaskStatusMap: { [key: string]: string };

    constructor(private $scope: MyCheckDetailsParams, private treeDirectiveService: ITreeDirectiveService, private taskService: ITaskService) {
        $scope.$on("$destroy", () => {
            this.userTreeParams.treeDatas = null;
            this.userTreeParams = null;

            this.businessLibExParams.treeDatas = null;
            this.businessLibExParams = null;

            this.cameraExParams.treeDatas = null;
            this.cameraExParams = null;
        });
        this.MyCheck = $scope.MyCheck;
        this.MyTaskModel = $scope.MyTaskModel;
        this.userTreeParams = new TreeDataParams<PersonTreeEx | AreaEx>();
        this.userTreeParams.treeDatas = $scope.UserDatas;
        this.userTreeParams.treeId = PortraitTool.getUUID();

        this.businessLibExParams = new TreeDataParams<BusinessLibEx>();
        this.businessLibExParams.treeDatas = $scope.BusinessLibDatas;
        this.businessLibExParams.treeId = PortraitTool.getUUID();
        this.businessLibExParams.treeIdKey = "treeID";
        this.businessLibExParams.treePidKey = "treeParentId";

        this.cameraExParams = new TreeDataParams<CameraEx>();
        this.cameraExParams.treeDatas = $scope.CameraDatas;
        this.cameraExParams.treeId = PortraitTool.getUUID();

        this.AuditStatusMap = $scope.AuditStatusMap;
        this.TaskTypeMap = $scope.TaskTypeMap;
        this.TaskStatusMap = $scope.TaskStatusMap;
    }

    save() {

    }

    // 不允许选中
    beforeCheck() {
        return false;
    }

    cancel(flag?: boolean) {
        this.$scope.$emit('details.closePopup', flag);
    }

    treeInitComplete(treeId: string) {
        // 树数据加载完成方法, 触发此方法后, 根据树展示的类型来将结点check选中
        switch (treeId) {
            case this.businessLibExParams.treeId:
                this.defaultCheckBusinessLibNode();
                break;
            case this.userTreeParams.treeId:
                this.defaultCheckUserNode();
                break;
            case this.cameraExParams.treeId:
                this.defaultCheckCameraNode();
                break;
        }
    }

    private defaultCheckBusinessLibNode() {
        // 筛选出摄像机id
        let businessIds = [] as Array<string>;
        angular.forEach(this.MyTaskModel.ArrLibIds, (id: string) => {
            businessIds.push(id);
        });
        this.treeDirectiveService.checkNodesByIds(this.businessLibExParams.treeId, businessIds, this.businessLibExParams.treeIdKey, true);
    }

    private defaultCheckUserNode() {
        this.taskService.findFaceById(this.$scope.MyCheck.tId).then((res: ResponseResult<TaskModel>) => {
            if (res.data && res.code === 200) {
                let task = res.data;
                if (task.AuthStatus === AuthStatus.EveryBody.value) {
                    this.treeDirectiveService.checkAllNodes(this.userTreeParams.treeId, true)
                }
                if (task.AuthStatus === AuthStatus.Self.value) {
                    let selectTreeNodes = this.treeDirectiveService.getNodeByParam(this.userTreeParams.treeId, 'ID', task.CreateUserID);
                    this.treeDirectiveService.updateNode(this.userTreeParams.treeId, selectTreeNodes);
                }
                if (task.AuthStatus === AuthStatus.Part.value) {
                    let paramsList = [] as Array<{ key: string, value: string }>;
                    paramsList.push({key: 'ID', value: task.CreateUserID});
                    let arrIds = task.AuthUser.split(',');
                    if (arrIds.length > 0) {
                        arrIds.map(function (userId: string) {
                            paramsList.push({key: 'ID', value: userId});
                        });
                    }

                    let selectTreeNodes = this.treeDirectiveService.getNodesByParam(this.userTreeParams.treeId, paramsList);
                    this.treeDirectiveService.updateNode(this.userTreeParams.treeId, selectTreeNodes);
                }
            }
        })

    }

    private defaultCheckCameraNode() {
        // 筛选出摄像机id
        let cameraIds = [] as Array<string>;
        angular.forEach(this.MyTaskModel.CameraParams, (model: CameraParam) => {
            cameraIds.push(model.CameraID);
        });
        this.treeDirectiveService.checkNodesByIds(this.cameraExParams.treeId, cameraIds, this.cameraExParams.treeIdKey, true);
    }
}


app.controller("MyCheckDetailsController", DetailsController);