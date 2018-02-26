

import { app } from "../../common/app/main.app";
import '../../common/services/videoServer.service';
import '../../common/services/area.service';
import 'angular';

import { IAreaService } from "../../common/services/area.service";
import { ITreeDataParams, TreeDataParams } from "../../common/directive/tree/tree-params";
import { VideoServerEx } from "../../../core/entity/ex/VideoServerEx";
import { Area } from "../../../core/entity/Area";
import { AreaEx } from "../../../core/entity/ex/AreaEx";
import { Enum } from "../../../core/enum/Enum";
import { VideoServerType } from "../../../core/enum/VideoServerType";
import { ResponseResult } from "../../../core/params/result/ResponseResult";
import { ProxyServer } from "../../../core/entity/ProxyServer";
import { IProxyServerTypeEnum } from "../../../core/enum/ProxyServerType";


declare let angular: any;

class VideoServerUpdatePopupController {
    static $inject = ['$scope', 'videoServerService', '$timeout', 'areaService'];
    isUpdate: boolean = false;

    currentServe: VideoServerEx;

    //-------start----树 结构 控件 参数
    areaTreeDatas: ITreeDataParams<AreaEx>;
    //-------end

    videoServerTypeList: Array<Enum> = [];
    proxyListForVideo: Array<ProxyServer> = [];
    constructor(private $scope: any, private serverService: any, private $timeout: any, private areaService: IAreaService) {

        // 初始化 类型选择
        for (let key in VideoServerType) {
            this.videoServerTypeList.push(VideoServerType[key]);
        }
        //树结构参数初始化
        //初始化 area 树数据
        this.areaTreeDatas = new TreeDataParams<AreaEx>(true);
        this.areaTreeDatas.treeId = 'modalArea';
        this.areaTreeDatas.onClick = treeSelectNode;
        this.areaTreeDatas.treeInitComplete = treeInitComplete;

        // 初始化 ctrl 传过来的参数

        if (this.$scope.updateModalParams.isUpdate) {
            this.currentServe = this.$scope.updateModalParams.updateModel;
            this.areaTreeDatas.defaultSelectTreeId = this.currentServe.AreaID;
            this.areaTreeDatas.isDefaultSelected = true;
        } else {
            this.currentServe = new VideoServerEx();
            this.currentServe.AreaModel = new Area();
            if (this.$scope.updateModalParams.defaultDatas) {
                this.areaTreeDatas.defaultSelectTreeId = this.$scope.updateModalParams.defaultDatas.areaId;
                this.areaTreeDatas.isDefaultSelected = true;
            }
        }

        let self_this = this;
        $scope.$on("$destroy", function () {
            console.log("销毁了弹出框");
        });

        this.getAreaTree();
        this.proxyListForVideo = this.$scope.proxyListForVideo
        function treeInitComplete(treeId: string) {

        }

        function treeSelectNode(event: MouseEvent, treeId: string, treeNode: Area) {
            self_this.areaTreeDatas.isShow = false;
            self_this.$timeout(() => {
                self_this.setVideoServerArea(treeNode);
            });
        }
    }

    changeTypeSelect() {
        angular.forEach(VideoServerType, (val: IProxyServerTypeEnum) => {//IProxyServerTypeEnum
            if(!this.currentServe.VideoServerType){
                this.currentServe.Port = null;
            }
            if (val.value === this.currentServe.VideoServerType) {
                this.currentServe.Port = val.index;
            }
        });
    }

    commitSaveOrUpdate() {
        let checkStr = this.validateParams(this.currentServe);
        if (checkStr) {
            return;
        }

        this.currentServe.AreaID = this.currentServe.AreaModel.ID;

        if (this.currentServe.ID) {
            this.serverService.update(this.currentServe).then((resp: ResponseResult<string>) => {
                if (resp.code == 200) {
                    this.closeUpdateModel(true);
                }
            });
        } else {
            this.serverService.save(this.currentServe).then((resp: ResponseResult<string>) => {
                if (resp.code == 200) {
                    this.closeUpdateModel(true);
                }
            });
        }
    };

    closeUpdateModel(isCommit: boolean) {
        this.$scope.$emit('closeServerUpdateModel', isCommit);
    }

    // area tree
    getAreaTree(keyword?: string) {
        let reqParams = {
            keyword: ''
        };
        if (keyword) {
            reqParams.keyword = keyword;
        }
        let self_this = this;
        this.areaService.findListTree(reqParams).then((resp: Array<AreaEx>) => {
            self_this.setModalAreaTree(resp);
        });
    }

    // 改变显示 areaTree
    changeIsShowAreaTree() {
        this.areaTreeDatas.isShow = !this.areaTreeDatas.isShow;
    };

    // area 选择改变
    setVideoServerArea(area: Area) {
        this.currentServe.AreaModel = new Area();
        this.currentServe.AreaModel.ID = area.ID;
        this.currentServe.AreaModel.Name = area.Name;

        this.currentServe.AreaID = area.ID;
    };

    //area 数据赋值
    setModalAreaTree(data: any) {
        this.areaTreeDatas.treeDatas = data;
    }

    //验证字段限制，返回提示语
    validateParams(model: VideoServerEx): string {

        if (!model.AreaModel) {
            return 'AreaModel';
        }
        if (!model.Code) {
            return 'Code';
        }
        if (!model.IpAddress) {
            return 'IpAddress';
        }
        if (!model.Name) {
            return 'Name';
        }
        if (!model.Port) {
            return 'Port';
        }
        if (!model.Pwd) {
            return 'Pwd';
        }
        if (!model.Uid) {
            return 'Uid';
        }
        if (!model.VideoServerType) {
            return 'VideoServerType';
        }

        return '';
    }


}
app
    .controller('videoServerUpdatePopupController', VideoServerUpdatePopupController);