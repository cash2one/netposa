/// <amd-dependency path="text!./faceLibPersonUpdate.imageThumb.html" name="faceLibPersonUpdateImageThumbHtml" />

/// <amd-dependency path="text!../faceHandlePopup/selectFace.popup.html" name="selectFacePopupHtml"/>

import "../services/businessLib.service";
import { IBusinessLibService } from "../services/businessLib.service";

declare let faceLibPersonUpdateImageThumbHtml: any;
import "css!./baseconfig-faceLib-person.css";
import "css!./../../baseconfig/css/baseconfig.css";
import { app } from "../app/main.app";
import '../services/area.service';

import "../services/businessLibPerson.service";

import 'angular';
import "webUploader";

import { ResponseResult } from "../../../core/params/result/ResponseResult";
import { BusinessPerson } from "../../../core/entity/BusinessPerson";

import { IBusinessLibPersonService } from "../services/businessLibPerson.service";
import { GenderType } from "../../../core/server/enum/GenderType";
import { Enum } from "../../../core/enum/Enum";
import { NationType } from "../../../core/server/enum/NationType";
import { BusinessPersonEx } from "../../../core/server/BusinessPersonModel";
import { CommandType } from "../../../core/server/enum/CommandType";

import "../factory/webUploader.factory";
import { IWebUploaderFactory } from "../factory/webUploader.factory";

import { CheckFace } from "../../../core/entity/CheckFace";
import { PersonAssist } from "../../../core/server/PersonAssistModel";
import { CredentialsType } from "../../../core/server/enum/CredentialsType";
import { UpdateModalParams } from "../types/serverUpdateModal.params";

import "../faceHandlePopup/selectFace.popup.controller";
import { TreeDataParams } from "../directive/tree/tree-params";
import { AreaEx } from "../../../core/entity/ex/AreaEx";
import { BusinessLibEx } from "../../../core/entity/ex/BusinessLibEx";
import { AreaAndBusinessListResult } from "../../../core/params/BusinessLibParams";
import { TreeType } from "../../../core/enum/TreeType";
import '../filter/app.filter';
import { ITreeDirectiveService } from "../directive/tree/tree.directive.service";
import "../directive/tree/tree.directive.service";
import { PersonTreeEx } from "../../../core/entity/ex/PersonTreeEx";
import { ValueTextEnumType } from "../../../core/enum/Enum";
import { FaceUpdateParams } from "../faceLibUpdateModal/faceLibUpdateModal.factory";
import { IFaceLibUpdateModalFactory } from "../faceLibUpdateModal/faceLibUpdateModal.factory";
import "../faceLibUpdateModal/faceLibUpdateModal.factory";
import "../factory/userinfo.cache.factory";
import { IUserInfoCacheFactory } from "../factory/userinfo.cache.factory";
import { ClassifyDiffChildParams, default as PortraitTool } from "../portrait-tool";
import { BusinessLib } from "../../../core/entity/BusinessLib";

declare let angular: any;
declare let require: any;
let webUploader = require("webUploader");
declare let selectFacePopupHtml: string;
type AreaBusinessLibEx = AreaEx & BusinessLibEx;

export class UpdateFaceLibPersonModalParams {
    imgInfo: CheckFace;
    libId: string;
    isUpdate: boolean;
    hasTree: boolean;
    updateModal: BusinessPerson;
    libTreeData: AreaAndBusinessListResult;
    emitName: string;
    $on: Function;
    $emit: Function;
    $destroy: Function;
    $new: Function;
    constructor() {
        this.isUpdate = false;
        this.hasTree = false;
        this.updateModal = null;
        this.emitName = "fromUpdateFaceLibPersonModal.closed"
    }
}

class FaceLibPersonUpdateModalController {
    isUpdate: boolean = false;
    currentModel: BusinessPersonEx;
    personAssist: PersonAssist;
    closeModelEmitName: string;
    toLibIdList: Array<string> = [];

    //下拉选择列表s
    genderTypeList: Array<Enum> = [];
    nationList: Array<Enum> = [];
    credentialsTypeList: Array<Enum> = [];

    // 上传图片相关
    uploader: any;
    totalNum: number = 0;

    imageUploadId: string = "faceLibPersonImageUploader";

    imageThumbList: Array<CheckFace>;
    // 缓存上传成功的图片返回的url路径
    imageUploadSuccessPathList: Array<string>;
    // 修改操作中, 移除掉的图片路径集合
    imageDeletePathList: Array<string>;

    // 可选择 最大图片
    maxImageNum: number = 5;

    imageCover: string = "";
    updateModalParams: UpdateModalParams<BusinessPersonEx>;

    // 人脸 选择layer 窗口下标
    facesSelectLayerIndex: number;
    // 人脸 选择layer 窗口layer 关闭 回调
    facesSelectLayerEmit: string = "fromSelectFaceCtrl";

    // 已选图片预览
    facesWatchLayerIndex: number;
    // 已选图片预览 layer 关闭 回调
    facesWatchLayerEmit: string = "layerClose.fromFaceWatch";

    // 人脸库 树列表
    public faceLibTreeParams: TreeDataParams<AreaBusinessLibEx>;
    private faceLibTreeId: string = "libPersonUpdateFaceLibTree";
    //-------end

    //判断是否展示树
    hasTree: boolean = false;

    //已选择的节点
    treeSelectedNodeList: Array<PersonTreeEx> = [] as Array<PersonTreeEx>;

    //搜索关键字
    searchStr: string = "";

    //编辑窗口 广播、接收名称
    watchUpdateModalName: string = "watchUpdateModalName";
    updateLayerIndex: number;

    static $inject = ['$scope',
        'webUploaderFactory',
        'userInfoCacheFactory',
        '$timeout',
        'businessLibService',
        'businessLibPersonService',
        'layer',
        'i18nFactory',
        '$filter',
        'treeDirectiveService',
        'faceLibUpdateModalFactory'
    ];

    constructor(private $scope: UpdateFaceLibPersonModalParams,
        private webUploaderFactory: IWebUploaderFactory,
        private userInfoCacheFactory: IUserInfoCacheFactory,
        private $timeout: any,
        private businessLibService: IBusinessLibService,
        private businessLibPersonService: IBusinessLibPersonService,
        private layer: any,
        private i18nFactory: any,
        private $filter: any,
        private treeService: ITreeDirectiveService,
        private faceLibUpdateModalFactory: IFaceLibUpdateModalFactory
    ) {
        $scope.$on("$destroy", () => {
            console.debug("销毁FaceLibPersonUpadteModelController");
            this.uploader.destroy();
            this.uploader = null;
            this.imageDeletePathList = null;
            this.imageThumbList = null;
        });
        this.imageThumbList = [] as Array<CheckFace>;
        this.imageUploadSuccessPathList = [] as Array<string>;
        this.imageDeletePathList = [] as Array<string>;

        this.initUpdateData();
        this.hasTree = $scope.hasTree;
        if (this.hasTree) {
            this.faceLibTreeParams = this.initLibTreeParams(this.faceLibTreeId, this.toLibIdList);
            this.getLibTreeData()
        }

        $scope.$on(this.facesWatchLayerEmit, (event: Event, file: CheckFace) => {

            if (!file) {
                this.layer.close(this.facesWatchLayerIndex);
                return true;
            }
            let i, len, temp; // 两种情况, fileId可能在webuploader中 或者在currentModel.FacePicPath中
            if (file.efficacyTime > 0) {
                this.removeThumb(file);
            } else if (file.efficacyTime === -1
                && this.currentModel && this.currentModel.FacePicPath && this.currentModel.FacePicPath.length > 0) {
                for (i = 0, len = this.currentModel.FacePicPath.length; i < len; i++) {
                    temp = this.currentModel.FacePicPath[i];
                    if (file.imageurl === temp) {
                        this.currentModel.FacePicPath.splice(i, 1);
                        i--; len--;
                        this.imageDeletePathList.push(temp);
                        break;
                    }
                }
                this.refreshTotalNum();
                this.initCover();
            }
        });

        this.initSelectSrc();

        this.initWebUploader();
        this.initCover();
        this.refreshTotalNum();
    }

    initSelectSrc() {
        let t: any = this.$scope.updateModal;
        this.currentModel = t;

        this.genderTypeList.push(GenderType.Men);
        this.genderTypeList.push(GenderType.Women);
        let _NationType = NationType as Array<{ text: string, value: string, parentCode: string }>;
        for (let k in _NationType) {
            this.nationList.push(_NationType[k]);
        }
        this.credentialsTypeList = [] as Array<Enum>;
        this.credentialsTypeList.push(CredentialsType.IdCard);

    };
    // 根据 $scope 初始化编辑、添加 信息
    initUpdateData() {
        let params: UpdateFaceLibPersonModalParams = this.$scope;
        this.closeModelEmitName = params.emitName;
        this.isUpdate = params.isUpdate ? true : false;
        if (params.isUpdate && params.updateModal) {
            this.currentModel = params.updateModal as BusinessPersonEx;
            this.currentModel.Nation = "未知"
            this.getPersonAssist(params.updateModal.ID);
        } else {
            // 添加 人员 初始化
            this.currentModel = new BusinessPersonEx();
            this.currentModel.FacePicPath = [] as Array<string>;
            this.currentModel.Gender = GenderType.Men.value;
            this.personAssist = new PersonAssist();
            this.personAssist.CredentialsType = CredentialsType.IdCard.text;

            if (params.libId) {
                this.toLibIdList = [params.libId];
            }
            if (params.imgInfo) {
                this.imageThumbList.push(params.imgInfo);
            }
        }
    };

    // 获取人像库综合数据
    getLibTreeData() {
        this.businessLibService.findHasSelfTreeWithArea(null).then((resp: ResponseResult<AreaAndBusinessListResult>) => {
            if (resp.code == 200) {
                this.faceLibTreeParams.treeDatas = [];
                /*let areaArr = angular.copy(resp.data.areaExList);
                let libArr = angular.copy(resp.data.businessLibExList);
                this.faceLibTreeParams.treeDatas = areaArr.concat(libArr);*/

                let params = new ClassifyDiffChildParams();
                params.newChildName = this.i18nFactory("FDS_00_12_35");
                let nodeData = PortraitTool.classifyDiffChild(params, [resp.data.areaExList, resp.data.businessLibExList]);
                this.faceLibTreeParams.treeDatas = nodeData;
            }
        });
    };

    //人像库树初始化
    initLibTreeParams(faceLibTreeId: string, toLibIdList: Array<string>) {
        let obj: TreeDataParams<AreaBusinessLibEx>;
        obj = new TreeDataParams<AreaBusinessLibEx>(true);
        obj.treeId = faceLibTreeId;
        obj.onCheck = (event: Event, treeId: string, treeNode: any): void => {
            toLibIdList = [];
            this.updateTreeSelectedList(faceLibTreeId)
        };
        return obj
    };
    // 获取 person 辅助信息
    getPersonAssist(personId: string) {
        this.businessLibPersonService.findPersonAssistById(personId).then((resp: ResponseResult<PersonAssist>) => {
            if (resp.code == 200 && resp.data) {
                this.personAssist = resp.data;
            }
        })
    }

    //更新 当前选中列表数据
    private updateTreeSelectedList(treeId: string) {
        let treeType = TreeType.businessLib.value;
        if (this.$filter("dummyNodeFilter")) {
            this.treeSelectedNodeList = this.$filter("dummyNodeFilter")(this.getCheckedList(treeId, treeType));
        } else {
            this.treeSelectedNodeList = this.getCheckedList(treeId, treeType);
        };
        for (var i = 0, l = this.treeSelectedNodeList.length; i < l; i++) {
            if (this.treeSelectedNodeList[i].treeType == TreeType.businessLib.value) {
                this.toLibIdList.push(this.treeSelectedNodeList[i].ID)
            }
        }
    };

    //获取已选择的 树节点集合
    private getCheckedList(treeId: string, treeType: string): Array<any> {
        let treeCheckedNodes = this.treeService.getCheckedNodes(treeId, true);
        let result: Array<any> = [] as Array<any>;
        if (treeCheckedNodes) {
            if (treeType) {
                angular.forEach(treeCheckedNodes, (val: PersonTreeEx & AreaEx) => {
                    if (val.treeType === treeType) {
                        result.push(val);
                    }
                });
            } else {
                result = treeCheckedNodes.concat();
            }
        }
        return result;
    }

    //搜索框改变
    onChangeSearch(): boolean {
        if (!this.faceLibTreeParams || this.faceLibTreeParams.treeDatas.length == 0) {
            return false;
        } else {
            this.$timeout(() => {
                this.treeService.filterShowNodes(this.faceLibTreeId, "Name", this.searchStr);
            });
            return true;
        }
    };

    addStorage() {
        this.openUpdateModel(false, null, null);
    }

    //打开 新增、修改窗口
    openUpdateModel(isUpdate: boolean, data: BusinessLibEx, parentId: string) {
        let scope: any = this.$scope.$new();
        let updateParams = new FaceUpdateParams();
        updateParams.isUpdate = isUpdate;

        updateParams.updateModalData = data;

        updateParams.parentID = parentId;

        let titleStr = isUpdate ? this.i18nFactory('FDS_01_06_20') : this.i18nFactory('FDS_01_06_19');

        this.faceLibUpdateModalFactory.setUpdateParams(updateParams);
        let htmlStr = this.faceLibUpdateModalFactory.getModalHtml();

        this.layer.open({
            type: 1,
            title: titleStr,
            content: htmlStr,
            scope: scope,
            area: ["500px"],
            skin: "overflow-visible",
            end: function () {
                scope.$destroy();
            }
        }).then((index: number) => {
            this.watchUpdateModalName = this.faceLibUpdateModalFactory.getModalClosedWatchName();
            this.openCloseLayerWatch();
            this.setUpdateLayerIndex(index);
        });
    };

    // 添加 修改Model 关闭监听
    openCloseLayerWatch() {
        if (!this.updateLayerIndex) {
            let self_this = this;
            this.$scope.$on(this.watchUpdateModalName, (even: any, data: { isCommit: boolean, isAdd: boolean, modelData: BusinessLibEx }) => {
                console.log("watchUpdateModalName 广播接收", data);
                if (data.isCommit) {
                    if (data.isAdd) {
                        this.getLibTreeData();
                        let paramsList: Array<{ key: string, value: string | number, parentNode?: string }> = [];
                        for (var i = 0, l = this.treeSelectedNodeList.length; i < l; i++) {
                            paramsList.push({ key: 'ID', value: this.treeSelectedNodeList[i].ID })
                        }
                        this.$timeout(() => {
                            this.treeService.checkNodesByParamsList(this.faceLibTreeId, paramsList, true)
                        }, 200)
                    }
                }
                this.layer.close(this.updateLayerIndex);
            });
        }
    }

    //记录当前编辑窗口下标
    setUpdateLayerIndex(index: number) {
        this.updateLayerIndex = index;
    }

    // 提交 更新前 获取图片
    prevCommitSaveOrUpdate() {
        // 先上传图片, 上传图片成功后再触发完整提交
        console.log("%c 调试打印========================", "color:red");
        console.debug("检查图片 特征值 是否过期");
        console.log(this.isUpdate);
        console.log(this.toLibIdList)
        if (!this.isUpdate && (!this.toLibIdList || this.toLibIdList.length == 0)) {
            this.layer.msg("请选择保存的人脸库");
            return;
        }
        if (this.totalNum == 0) {
            this.layer.msg("请选择添加人员图片");
            return;
        }
        console.log(this.currentModel);
        let checkStr = this.validateParams(this.currentModel);
        if (checkStr) {
            return;
        }
        this.mergeImageList2FormData();
    }

    // 提交 数据格式转化
    mergeImageList2FormData() {
        let personInfo: BusinessPerson = angular.copy(this.currentModel);
        /*TODO 辅助信息 未扩展*/
        let req_params: BusinessPersonEx = angular.extend({}, personInfo, this.personAssist);

        req_params.AddPicTaskIds = [] as Array<string>;
        req_params.AddFacePicPath = [] as Array<string>;

        angular.forEach(this.imageThumbList, (val: CheckFace) => {
            req_params.AddPicTaskIds.push(val.key);
            req_params.AddFacePicPath.push(val.imageurl);
        });

        req_params.DeletePicPath = this.imageDeletePathList;

        let req_paramsList = [] as Array<BusinessPersonEx>;
        if (this.isUpdate) {
            req_paramsList.push(req_params);
        } else {
            angular.forEach(this.toLibIdList, (val: string) => {
                let paramsItem = angular.copy(req_params);
                paramsItem.LibID = val;
                req_paramsList.push(paramsItem);
            });
        }
        this.commitSaveOrUpdate(req_paramsList);
    }

    commitSaveOrUpdate(params: Array<BusinessPersonEx>) {
        console.debug("commitSaveOrUpdate", params);
        if (this.isUpdate) {
            this.businessLibPersonService.updatePerson(params).then((resp: ResponseResult<string>) => {
                if (resp.code == 200) {
                    this.closeUpdateModel(true);
                }
            });
        } else {
            this.businessLibPersonService.addPerson(params).then((resp: ResponseResult<string>) => {
                console.log(params)
                if (resp.code == 200) {
                    this.closeUpdateModel(true);
                }
            });
        }
    };
    //验证字段限制，返回提示语
    validateParams(model: BusinessPerson): string {
        return '';
    }
    // 选择图 更换
    initCover() {
        let imageCover: string = "../images/baseconfig/person-default.png";
        if (this.imageThumbList && this.imageThumbList.length > 0) {
            imageCover = this.imageThumbList[this.imageThumbList.length - 1].imageurl;
        } else if (this.currentModel && this.currentModel.FacePicPath && this.currentModel.FacePicPath.length > 0) {
            imageCover = this.currentModel.FacePicPath[this.currentModel.FacePicPath.length - 1];
        }
        if (this.imageCover !== imageCover) {
            this.$timeout(() => {
                console.log(imageCover);
                //    console.debug("作为封面的图片url为", imageCover);
                this.imageCover = imageCover;
            });
        }
    }

    /**********上传图片相关**********/
    initWebUploader() {
        let headerData = this.userInfoCacheFactory.getCurrentUserKey();
        let fileInfo: any = {};
        this.$timeout(() => {
            this.uploader = webUploader.Base.create({
                // 选完文件后，是否自动上传。
                auto: true,
                swf: "/libs/webuploader-0.1.5/Uploader.swf",
                server: this.businessLibPersonService.getCheckFaceUrl(),
                resize: false,
                // 只允许选择图片文件。
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/jpg,image/jpeg,image/png'   //修改这行
                    //    mimeTypes: 'image/*'
                },
                formData: {
                    //dest: "LOC" // 上传图片服务器带的参数
                    /*TODO上传检查人脸需要参数*/
                    // commandType:CommandType.UpdateBizPerson.value,
                    /*TODO上传检查人脸需要参数 （固定）*/
                    storeType: 'LOC',
                    imageCategory: "CaptureImage",
                    commandType: "UpdateBizPerson",
                    detectType: "Face"
                },
                thumb: {
                    width: 330,
                    height: 330,
                    // 图片质量，只有type为`image/jpeg`的时候才有效。
                    quality: 70,
                    // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
                    allowMagnify: true,
                    // 是否允许裁剪。
                    crop: false,
                    // 为空的话则保留原有图片格式。
                    // 否则强制转换成指定的类型。
                    type: '',
                    compressSize: 0,
                },
                // 表单 nam一致
                fileVal: 'image',
                duplicate: true,
                disableGlobalDnd: true,
                method: 'POST',
                headers: headerData,
                compress: false
                //sendAsBinary: true // 是否将图片按照body来发送
            });
            //  let dom = angular.element("#" + this.imageUploadId);
            // 加入dom结点
            this.uploader.addButton({
                id: "#" + this.imageUploadId,
                innerHTML: this.i18nFactory('FDS_01_06_32'),
                // 限制多选
                multiple: false
            });
            this.uploader.on('beforeFileQueued', (file: any) => {

                if (this.totalNum === this.maxImageNum) {
                    this.layer.msg(this.i18nFactory('FDS_01_06_64'));
                    return false;
                }
                if (file.size > 10 * 1024 * 1024) {
                    this.layer.msg(this.i18nFactory('FDS_01_06_65'));
                    return false;
                }
                return true;
            });

            this.uploader.on("filesQueued", (files: any) => {
            });

            this.uploader.on("fileDequeued", (file: any) => {
                console.log("fileDequeued");
            });

            this.uploader.on("uploadProgress", (file: any, percentage: number) => {

            });

            this.uploader.on("uploadSuccess", (file: any, response: ResponseResult<CheckFace>, ee: any) => {
                console.log("success_================");
                console.log(file);
                // this.uploader.option.formData.image = file;

                this.uploader.makeThumb(file, (err: any, src: string) => {
                    this.afterSuccessUpload(file, response);
                })

            });

            this.uploader.on("uploadError", (file: any, reason: any, reason1: any, reason2: any) => {
                console.debug("uploadError", file, reason, reason1, reason2);
                this.afterErrorUpload();
            });

            this.uploader.on("uploadAccept", (object: Object, ret: any) => {
                console.log(object, ret);
            });

            this.uploader.on("uploadFinished", (file: any, resp: any) => {
                console.log("uploadFinished");

            });
            this.uploader.on("error", function (type: string) {
                if (type == "Q_TYPE_DENIED") {
                    this.afterErrorUpload();
                } else if (type == "F_EXCEED_SIZE") {
                    this.layer.msg(this.i18nFactory('FDS_01_06_65'));
                }
            });
        })
    }

    cacheThumb(file: CheckFace) {
        this.imageThumbList.push(file);

        this.refreshTotalNum();
        this.initCover();
    }

    removeThumb(file: CheckFace) {
        let fileKey = file.key,
            imageThumbList = this.imageThumbList,
            i, len, temp;
        for (i = 0, len = imageThumbList.length; i < len; i++) {
            temp = imageThumbList[i];
            if (temp.key === fileKey) {
                imageThumbList.splice(i, 1);
                i--;
                len--;
                break;
            }
        }
        this.refreshTotalNum();
        this.initCover();
    }

    refreshTotalNum() {
        let result = 0;
        result += this.imageThumbList.length;
        if (this.currentModel && this.currentModel.FacePicPath) {
            result += this.currentModel.FacePicPath.length;
        }
        this.$timeout(() => {
            this.totalNum = result;
        });
    }

    afterErrorUpload() {
        this.layer.msg(this.i18nFactory('FDS_01_16_29'));
    };
    //上传图片成功后 图片结果 处理
    afterSuccessUpload(file: any, response: ResponseResult<CheckFace>) {
        if (response.code === 200 && !!response.data) {
            //一个人脸数据
            this.cacheThumb(response.data);
        } else if (response.code === 4023 && !!response.data) {
            //多
            this.openFacesSelect(response.data, file);
        } else {
            //无
            this.layer.msg(this.i18nFactory('FDS_01_06_56'));
        }
    };
    // 打开 多人脸 人脸选择
    openFacesSelect(resp: CheckFace, file: any) {
        //多个人脸处理
        // 这里对scope进行一次新建
        let scope = this.$scope.$new();
        scope.file = file;
        scope.data = resp;
        scope.commandType = CommandType.UpdateBizPerson;
        scope.detectType = 'Face';
        scope.fromSelectFaceCtrl = this.facesSelectLayerEmit;
        console.log(scope);
        this.layer.open({
            type: 1,
            content: selectFacePopupHtml,
            scope: scope,
            skin: "no-scroll",
            title: this.i18nFactory('人脸选取'),
            area: ["auto", "auto"],
            end: function () {
                scope.$destroy();
            },
            success: (layero: string, index: number) => {
                if (!this.facesSelectLayerIndex) {
                    this.watchFacesSelectLayerClosed();
                }

                this.facesSelectLayerIndex = index;
            },
        });
    };
    // 打开关闭监控
    watchFacesSelectLayerClosed() {
        this.$scope.$on(this.facesSelectLayerEmit, (even: Event, data: ResponseResult<CheckFace>) => {
            if (data && data.code === 200) {
                this.cacheThumb(data.data);
            }

            this.layer.close(this.facesSelectLayerIndex);
        });
    }
    /**
     * 弹框展示缩略图
     */
    showImageThumbs() {
        let scope = this.$scope.$new();
        // 将imageThumbCacheList和facePathList整合成一个Array
        let tempFacePicPath = [] as Array<CheckFace>;

        let facePicPathList = (this.currentModel || {} as BusinessPersonEx).FacePicPath;

        if (facePicPathList && facePicPathList.length > 0) {
            angular.forEach(facePicPathList, (path: string) => {
                let oldCheckFace: CheckFace = {} as CheckFace;
                oldCheckFace.imageurl = path;
                oldCheckFace.efficacyTime = -1;
                tempFacePicPath.push(oldCheckFace);
            });
        }

        scope.imageThumbList = this.imageThumbList.concat(tempFacePicPath);
        scope.facesWatchLayerEmit = this.facesWatchLayerEmit;

        let titleStr = this.i18nFactory('FDS_01_06_63');
        this.facesWatchLayerIndex = this.layer.open({
            type: 1,
            content: faceLibPersonUpdateImageThumbHtml,
            scope: scope,
            title: titleStr,
            area: ["690px", "600px"],
            end: function () {
                scope.$destroy();
            }
        });
    }
    /**********上传图片相关 结束**********/
    closeUpdateModel(isCommit: boolean) {
        this.$scope.$emit("fromUpdateFaceLibPersonModal.closed", { isCommit: isCommit });
    }
}

class ImageUploadThumbController {

    static $inject = ["$scope"];
    imageThumbList: Array<CheckFace>;
    facesWatchLayerEmit: string;
    constructor(private $scope: any) {
        // {imageThumbList:Array<CheckFace>,facesWatchLayerEmit:string}
        this.imageThumbList = $scope.imageThumbList;
        this.facesWatchLayerEmit = $scope.facesWatchLayerEmit;
    }

    removeImage(file: CheckFace) {
        this.$scope.$emit(this.facesWatchLayerEmit, file);
        // 移除自身
        let i, len, temp;
        for (i = 0, len = this.imageThumbList.length; i < len; i++) {
            temp = this.imageThumbList[i];
            if (file.imageurl === temp.imageurl) {
                this.imageThumbList.splice(i, 1);
                i--;
                len--;
                return true
            }
        }
    }
    closeModal() {

        this.$scope.$emit(this.facesWatchLayerEmit, null);
    }

}

/*class FaceLibPersonSrcFilter{
    static instance = function(){
        return function(file: CheckFace){
            if(file.imageurl){
                return "/bimg_content/"+file.imageurl;
            }else{
                return "/bimg_content/" + file;
            }
        }
    }
}
app.filter("faceLibPersonSrcFilter", FaceLibPersonSrcFilter.instance);*/
app.controller('faceLibPersonUpdateModalController', FaceLibPersonUpdateModalController);
app.controller("imageUploadThumbController", ImageUploadThumbController);