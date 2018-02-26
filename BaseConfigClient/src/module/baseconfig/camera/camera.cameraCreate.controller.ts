import {app} from "../../common/app/main.app";
import {TreeDataParams} from "../../common/directive/tree/tree-params";
import {Camera} from '../../../core/entity/Camera';
import {CameraEx} from "../../../core/entity/ex/CameraEx";
import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {ICameraService} from "../../common/services/camera.service";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {CameraTypeEnum} from '../../../core/server/enum/CameraTypeEnum';
import {LampEx} from '../../../core/entity/ex/LampEx';
import {IConnectTreeService} from "../../common/services/connectTree.service";
import "../../common/services/connectTree.service";

declare let angular: any;

class DeviceCameraCreateController {
    static $inject = ['$scope', 'connectTreeService', '$timeout', 'cameraService'];
    treeParams: TreeDataParams<AreaEx | LampEx | CameraEx>;
    Camera: Camera;
    cameraTypeList: { value: string, text: string }[] = CameraTypeEnum;
    isShowAreaTree: boolean;

    constructor(private $scope: any,
                private connectTreeService: IConnectTreeService,
                private $timeout: any,
                private cameraService: ICameraService) {

        this.Camera = angular.copy(this.$scope.Camera);

        if (!this.Camera.JsonUserData.lampPost) {
            this.Camera.JsonUserData.lampPost = {} as LampEx;
        }
        this.initTreeParams();
        this.$scope.$on('$destory',()=>{
            console.log(`$destory action`)
        })
    }
    private initTreeParams() {
        this.treeParams = new TreeDataParams<AreaEx | LampEx | CameraEx>();
        this.treeParams.treeId = "LampTreeWithCamera";
        this.treeParams.isDefaultSelected = true;
        this.treeParams.onClick = (event: MouseEvent, treeId: string, treeNode: AreaEx) => {
            this.$timeout(() => {
                if (treeNode.treeType === "lamp") {
                    this.Camera.JsonUserData.lampPost.ID = treeNode.ID;
                    this.Camera.JsonUserData.lampPost.Name = treeNode.Name;
                    this.isShowAreaTree = false;
                }
            })
        };

        this.connectTreeService.findLampTreeWithCamera().then((res: Array<AreaEx | LampEx | CameraEx>) => {
            this.$timeout(() => {
                this.treeParams.treeDatas = res;
                this.treeParams.defaultSelectTreeId = this.Camera.JsonUserData.lampPost.ID ? this.Camera.JsonUserData.lampPost.ID : '';
            });
        });
    }
    cancel(flag?: boolean) {
        this.$scope.$emit('device.closePopup', flag);
    }
    submit() {
        this.cameraService.edit(this.Camera).then((res: ResponseResult<boolean>) => {
            if (res.code == 200 && res.data) {
                this.cancel(true);
            }
        })

    }

}

app.controller("DeviceCameraCreateController", DeviceCameraCreateController);