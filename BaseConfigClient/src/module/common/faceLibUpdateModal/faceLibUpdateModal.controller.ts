
import { app } from "../../common/app/main.app";
import 'angular';
import '../../common/services/area.service';
import "../../common/services/businessLib.service";

import { ITreeDataParams, TreeDataParams } from "../../common/directive/tree/tree-params";

import { IBusinessLibService } from "../../common/services/businessLib.service";

import { AreaEx } from "../../../core/entity/ex/AreaEx";
import { BusinessLib } from "../../../core/entity/BusinessLib";
import { Area } from "../../../core/entity/Area";
import { ResponseResult } from "../../../core/params/result/ResponseResult";
import { IAreaService } from "../../common/services/area.service";

import "../../../core/entity/ex/BusinessLibEx";
import { BusinessLibEx } from "../../../core/entity/ex/BusinessLibEx";

import "./faceLibUpdateModal.factory";
import { IFaceLibUpdateModalFactory } from "./faceLibUpdateModal.factory";
import "../factory/userinfo.cache.factory";
import { IUserInfoCacheFactory } from "../factory/userinfo.cache.factory";
import { ClassifyDiffChildParams, default as PortraitTool } from "../portrait-tool";

import "../factory/layerMsg.factory";
import { ILayerDec } from "../factory/layerMsg.factory";
import { SystemConfig } from "../system-config";

declare let angular: any;

type AreaBusinessLibEx = AreaEx & BusinessLibEx;

class FaceLibUpdateModalController {
    isUpdate: boolean = false;
    currentServe: BusinessLibEx;

    //-------start----树 结构 控件 参数
    areaTreeDatas: ITreeDataParams<AreaEx>;
    closeModelEmitName: string;
    //-------end
    static $inject = ['$scope', '$timeout',
        'layerDec', 'i18nFactory',
        'userInfoCacheFactory', 'faceLibUpdateModalFactory', 'areaService', 'businessLibService'];

    constructor(private $scope: any, private $timeout: any,
        private layerDec: ILayerDec, private i18nFactory: any,
        private userInfoCacheFactory: IUserInfoCacheFactory,
        private faceLibUpdateModalFactory: IFaceLibUpdateModalFactory,
        private areaService: IAreaService, private businessLibService: IBusinessLibService) {
        this.initUpdateModelParams();
        $scope.$on("$destroy", () => {
            this.faceLibUpdateModalFactory.setUpdateParams(null);
        });
        this.getAreaTree();
    }

    initUpdateModelParams(): void {
        this.initTreeParams();
        let modelParams = this.faceLibUpdateModalFactory.getUpdateParams();
        this.currentServe = new BusinessLibEx();
        this.currentServe.AreaModel = new Area();
        (!!modelParams.updateModalData) && (this.currentServe = modelParams.updateModalData);
        this.currentServe.ParentName = modelParams.parentName;
        this.currentServe.ParentID = modelParams.parentID;

        this.isUpdate = modelParams.isUpdate;

        this.closeModelEmitName = modelParams.modalClosedWatchName;

        (!!modelParams.parentID) && (this.areaTreeDatas.defaultSelectTreeId = modelParams.parentID);

        this.areaTreeDatas.isDefaultSelected = true;
    };
    //树结构参数初始化
    initTreeParams() {
        this.areaTreeDatas = new TreeDataParams<AreaBusinessLibEx>(true);
        this.areaTreeDatas.treeId = 'updateFaceLibModalTree';
        this.areaTreeDatas.treeInitComplete = (treeId: string) => {
        };
        this.areaTreeDatas.onClick = (event: MouseEvent, treeId: string, treeNode: any) => {
            this.$timeout(() => {
                this.setTreeSelectData(treeNode);
                this.currentServe.ParentName = treeNode.Name;
            });
        };
    };

    setTreeSelectData(treeData: BusinessLib) {
        if (treeData.AreaID) {
            this.currentServe.AreaID = treeData.AreaID;
            this.currentServe.ParentID = treeData.ID;

            this.currentServe.ParentModel = new BusinessLib();
            this.currentServe.ParentModel = treeData;
        } else {
            this.currentServe.AreaID = treeData.ID;
            this.currentServe.ParentID = null;

            this.currentServe.ParentModel = new Area();
            this.currentServe.ParentModel.Name = treeData.Name;
        }
    };

    commitSaveOrUpdate() {
        if (!this.validateParams(this.currentServe)) {
            return;
        }
        let reqParams = angular.copy(this.currentServe);
        reqParams.ParentModel = null;
        if (reqParams.ID) {
            console.log("=========更新===============");
            this.businessLibService.update(reqParams).then((resp: ResponseResult<string>) => {
                if (resp.code == 200) {
                    this.closeUpdateModel(true, false, this.currentServe);
                }
            });
        } else {
            console.log("===========新加=============");
            reqParams.Creator = this.userInfoCacheFactory.getCurrentUserId();
            this.businessLibService.save(reqParams).then((resp: ResponseResult<string>) => {
                if (resp.code == 200) {
                    this.currentServe.ID = resp.data;
                    this.closeUpdateModel(true, true, this.currentServe);
                }
            });
        }
    };
    closeUpdateModel(isCommit: boolean, isAdd: boolean, modelData: BusinessLibEx) {
        if (isCommit) {
            /*TODO 成功请求 后延迟 500 保证列表数据同步*/
            this.$timeout(() => {
                this.$scope.$emit(this.closeModelEmitName, { isCommit: isCommit, isAdd: isAdd, modelData: modelData });
            }, 500);
        } else {
            this.$scope.$emit(this.closeModelEmitName, { isCommit: isCommit, isAdd: isAdd, modelData: modelData });
        }
    }
    //------------ areaTree data
    getAreaTree(keyword?: string) {
        let reqParams = {
            keyword: ''
        };
        if (keyword) {
            reqParams.keyword = keyword;
        }
        let self_this = this;

        this.businessLibService.findTreeWithArea().then((resp: ResponseResult<Array<AreaBusinessLibEx>>) => {
            if (resp && resp.code && resp.data) {
                //self_this.setModalAreaTree(resp.data);
                let params = new ClassifyDiffChildParams();
                params.newChildName = this.i18nFactory("FDS_00_12_35");
                let nodeData = PortraitTool.classifyDiffChild(params, [resp.data]);
                self_this.setModalAreaTree(nodeData);
            }
            console.error(resp.data);
        });
    }

    // 改变显示 areaTree
    changeIsShowAreaTree() {
        this.areaTreeDatas.isShow = !this.areaTreeDatas.isShow;
    };
    //------------ areaTree data
    setModalAreaTree(data: Array<AreaBusinessLibEx>) {
        this.areaTreeDatas.treeDatas = data;
    }

    //验证字段限制，返回提示语
    validateParams(model: BusinessLibEx): boolean {
        if (!model.AreaID) {
            this.layerDec.warnInfo(this.i18nFactory("FDS_01_06_23"));
            return false;
        }

        if (model.ID && this.currentServe.ParentModel) {
            if (this.currentServe.ParentModel.ID === model.ID || this.currentServe.ParentModel.ParentID === model.ID) {
                this.layerDec.warnInfo(this.i18nFactory("FDS_00_04_04"));
                return false;
            }
            if (this.currentServe.ParentModel.ID === SystemConfig.CONST_LIB) {
                this.layerDec.warnInfo(this.i18nFactory("FDS_01_06_26", { value: this.currentServe.ParentModel.Name }));
                return false;
            }
        }
        return true;
    }
}
app
    .controller('faceLibUpdateModalController', FaceLibUpdateModalController);