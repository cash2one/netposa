define(["require", "exports", "text!./faceLibPersonUpdate.imageThumb.html", "text!../faceHandlePopup/selectFace.popup.html", "../app/main.app", "../../../core/server/enum/GenderType", "../../../core/server/enum/NationType", "../../../core/server/BusinessPersonModel", "../../../core/server/enum/CommandType", "../../../core/server/PersonAssistModel", "../../../core/server/enum/CredentialsType", "../directive/tree/tree-params", "../../../core/enum/TreeType", "../faceLibUpdateModal/faceLibUpdateModal.factory", "../portrait-tool", "../services/businessLib.service", "css!./baseconfig-faceLib-person.css", "css!./../../baseconfig/css/baseconfig.css", "../services/area.service", "../services/businessLibPerson.service", "angular", "webUploader", "../factory/webUploader.factory", "../faceHandlePopup/selectFace.popup.controller", "../filter/app.filter", "../directive/tree/tree.directive.service", "../faceLibUpdateModal/faceLibUpdateModal.factory", "../factory/userinfo.cache.factory"], function (require, exports, faceLibPersonUpdateImageThumbHtml, selectFacePopupHtml, main_app_1, GenderType_1, NationType_1, BusinessPersonModel_1, CommandType_1, PersonAssistModel_1, CredentialsType_1, tree_params_1, TreeType_1, faceLibUpdateModal_factory_1, portrait_tool_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var webUploader = require("webUploader");
    var UpdateFaceLibPersonModalParams = (function () {
        function UpdateFaceLibPersonModalParams() {
            this.isUpdate = false;
            this.hasTree = false;
            this.updateModal = null;
            this.emitName = "fromUpdateFaceLibPersonModal.closed";
        }
        return UpdateFaceLibPersonModalParams;
    }());
    exports.UpdateFaceLibPersonModalParams = UpdateFaceLibPersonModalParams;
    var FaceLibPersonUpdateModalController = (function () {
        function FaceLibPersonUpdateModalController($scope, webUploaderFactory, userInfoCacheFactory, $timeout, businessLibService, businessLibPersonService, layer, i18nFactory, $filter, treeService, faceLibUpdateModalFactory) {
            var _this = this;
            this.$scope = $scope;
            this.webUploaderFactory = webUploaderFactory;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.$timeout = $timeout;
            this.businessLibService = businessLibService;
            this.businessLibPersonService = businessLibPersonService;
            this.layer = layer;
            this.i18nFactory = i18nFactory;
            this.$filter = $filter;
            this.treeService = treeService;
            this.faceLibUpdateModalFactory = faceLibUpdateModalFactory;
            this.isUpdate = false;
            this.toLibIdList = [];
            this.genderTypeList = [];
            this.nationList = [];
            this.credentialsTypeList = [];
            this.totalNum = 0;
            this.imageUploadId = "faceLibPersonImageUploader";
            this.maxImageNum = 5;
            this.imageCover = "";
            this.facesSelectLayerEmit = "fromSelectFaceCtrl";
            this.facesWatchLayerEmit = "layerClose.fromFaceWatch";
            this.faceLibTreeId = "libPersonUpdateFaceLibTree";
            this.hasTree = false;
            this.treeSelectedNodeList = [];
            this.searchStr = "";
            this.watchUpdateModalName = "watchUpdateModalName";
            $scope.$on("$destroy", function () {
                console.debug("销毁FaceLibPersonUpadteModelController");
                _this.uploader.destroy();
                _this.uploader = null;
                _this.imageDeletePathList = null;
                _this.imageThumbList = null;
            });
            this.imageThumbList = [];
            this.imageUploadSuccessPathList = [];
            this.imageDeletePathList = [];
            this.initUpdateData();
            this.hasTree = $scope.hasTree;
            if (this.hasTree) {
                this.faceLibTreeParams = this.initLibTreeParams(this.faceLibTreeId, this.toLibIdList);
                this.getLibTreeData();
            }
            $scope.$on(this.facesWatchLayerEmit, function (event, file) {
                if (!file) {
                    _this.layer.close(_this.facesWatchLayerIndex);
                    return true;
                }
                var i, len, temp;
                if (file.efficacyTime > 0) {
                    _this.removeThumb(file);
                }
                else if (file.efficacyTime === -1
                    && _this.currentModel && _this.currentModel.FacePicPath && _this.currentModel.FacePicPath.length > 0) {
                    for (i = 0, len = _this.currentModel.FacePicPath.length; i < len; i++) {
                        temp = _this.currentModel.FacePicPath[i];
                        if (file.imageurl === temp) {
                            _this.currentModel.FacePicPath.splice(i, 1);
                            i--;
                            len--;
                            _this.imageDeletePathList.push(temp);
                            break;
                        }
                    }
                    _this.refreshTotalNum();
                    _this.initCover();
                }
            });
            this.initSelectSrc();
            this.initWebUploader();
            this.initCover();
            this.refreshTotalNum();
        }
        FaceLibPersonUpdateModalController.prototype.initSelectSrc = function () {
            var t = this.$scope.updateModal;
            this.currentModel = t;
            this.genderTypeList.push(GenderType_1.GenderType.Men);
            this.genderTypeList.push(GenderType_1.GenderType.Women);
            var _NationType = NationType_1.NationType;
            for (var k in _NationType) {
                this.nationList.push(_NationType[k]);
            }
            this.credentialsTypeList = [];
            this.credentialsTypeList.push(CredentialsType_1.CredentialsType.IdCard);
        };
        ;
        FaceLibPersonUpdateModalController.prototype.initUpdateData = function () {
            var params = this.$scope;
            this.closeModelEmitName = params.emitName;
            this.isUpdate = params.isUpdate ? true : false;
            if (params.isUpdate && params.updateModal) {
                this.currentModel = params.updateModal;
                this.currentModel.Nation = "未知";
                this.getPersonAssist(params.updateModal.ID);
            }
            else {
                this.currentModel = new BusinessPersonModel_1.BusinessPersonEx();
                this.currentModel.FacePicPath = [];
                this.currentModel.Gender = GenderType_1.GenderType.Men.value;
                this.personAssist = new PersonAssistModel_1.PersonAssist();
                this.personAssist.CredentialsType = CredentialsType_1.CredentialsType.IdCard.text;
                if (params.libId) {
                    this.toLibIdList = [params.libId];
                }
                if (params.imgInfo) {
                    this.imageThumbList.push(params.imgInfo);
                }
            }
        };
        ;
        FaceLibPersonUpdateModalController.prototype.getLibTreeData = function () {
            var _this = this;
            this.businessLibService.findHasSelfTreeWithArea(null).then(function (resp) {
                if (resp.code == 200) {
                    _this.faceLibTreeParams.treeDatas = [];
                    var params = new portrait_tool_1.ClassifyDiffChildParams();
                    params.newChildName = _this.i18nFactory("FDS_00_12_35");
                    var nodeData = portrait_tool_1.default.classifyDiffChild(params, [resp.data.areaExList, resp.data.businessLibExList]);
                    _this.faceLibTreeParams.treeDatas = nodeData;
                }
            });
        };
        ;
        FaceLibPersonUpdateModalController.prototype.initLibTreeParams = function (faceLibTreeId, toLibIdList) {
            var _this = this;
            var obj;
            obj = new tree_params_1.TreeDataParams(true);
            obj.treeId = faceLibTreeId;
            obj.onCheck = function (event, treeId, treeNode) {
                toLibIdList = [];
                _this.updateTreeSelectedList(faceLibTreeId);
            };
            return obj;
        };
        ;
        FaceLibPersonUpdateModalController.prototype.getPersonAssist = function (personId) {
            var _this = this;
            this.businessLibPersonService.findPersonAssistById(personId).then(function (resp) {
                if (resp.code == 200 && resp.data) {
                    _this.personAssist = resp.data;
                }
            });
        };
        FaceLibPersonUpdateModalController.prototype.updateTreeSelectedList = function (treeId) {
            var treeType = TreeType_1.TreeType.businessLib.value;
            if (this.$filter("dummyNodeFilter")) {
                this.treeSelectedNodeList = this.$filter("dummyNodeFilter")(this.getCheckedList(treeId, treeType));
            }
            else {
                this.treeSelectedNodeList = this.getCheckedList(treeId, treeType);
            }
            ;
            for (var i = 0, l = this.treeSelectedNodeList.length; i < l; i++) {
                if (this.treeSelectedNodeList[i].treeType == TreeType_1.TreeType.businessLib.value) {
                    this.toLibIdList.push(this.treeSelectedNodeList[i].ID);
                }
            }
        };
        ;
        FaceLibPersonUpdateModalController.prototype.getCheckedList = function (treeId, treeType) {
            var treeCheckedNodes = this.treeService.getCheckedNodes(treeId, true);
            var result = [];
            if (treeCheckedNodes) {
                if (treeType) {
                    angular.forEach(treeCheckedNodes, function (val) {
                        if (val.treeType === treeType) {
                            result.push(val);
                        }
                    });
                }
                else {
                    result = treeCheckedNodes.concat();
                }
            }
            return result;
        };
        FaceLibPersonUpdateModalController.prototype.onChangeSearch = function () {
            var _this = this;
            if (!this.faceLibTreeParams || this.faceLibTreeParams.treeDatas.length == 0) {
                return false;
            }
            else {
                this.$timeout(function () {
                    _this.treeService.filterShowNodes(_this.faceLibTreeId, "Name", _this.searchStr);
                });
                return true;
            }
        };
        ;
        FaceLibPersonUpdateModalController.prototype.addStorage = function () {
            this.openUpdateModel(false, null, null);
        };
        FaceLibPersonUpdateModalController.prototype.openUpdateModel = function (isUpdate, data, parentId) {
            var _this = this;
            var scope = this.$scope.$new();
            var updateParams = new faceLibUpdateModal_factory_1.FaceUpdateParams();
            updateParams.isUpdate = isUpdate;
            updateParams.updateModalData = data;
            updateParams.parentID = parentId;
            var titleStr = isUpdate ? this.i18nFactory('FDS_01_06_20') : this.i18nFactory('FDS_01_06_19');
            this.faceLibUpdateModalFactory.setUpdateParams(updateParams);
            var htmlStr = this.faceLibUpdateModalFactory.getModalHtml();
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
            }).then(function (index) {
                _this.watchUpdateModalName = _this.faceLibUpdateModalFactory.getModalClosedWatchName();
                _this.openCloseLayerWatch();
                _this.setUpdateLayerIndex(index);
            });
        };
        ;
        FaceLibPersonUpdateModalController.prototype.openCloseLayerWatch = function () {
            var _this = this;
            if (!this.updateLayerIndex) {
                var self_this = this;
                this.$scope.$on(this.watchUpdateModalName, function (even, data) {
                    console.log("watchUpdateModalName 广播接收", data);
                    if (data.isCommit) {
                        if (data.isAdd) {
                            _this.getLibTreeData();
                            var paramsList_1 = [];
                            for (var i = 0, l = _this.treeSelectedNodeList.length; i < l; i++) {
                                paramsList_1.push({ key: 'ID', value: _this.treeSelectedNodeList[i].ID });
                            }
                            _this.$timeout(function () {
                                _this.treeService.checkNodesByParamsList(_this.faceLibTreeId, paramsList_1, true);
                            }, 200);
                        }
                    }
                    _this.layer.close(_this.updateLayerIndex);
                });
            }
        };
        FaceLibPersonUpdateModalController.prototype.setUpdateLayerIndex = function (index) {
            this.updateLayerIndex = index;
        };
        FaceLibPersonUpdateModalController.prototype.prevCommitSaveOrUpdate = function () {
            console.log("%c 调试打印========================", "color:red");
            console.debug("检查图片 特征值 是否过期");
            if (!this.isUpdate && (!this.toLibIdList || this.toLibIdList.length == 0)) {
                this.layer.msg("请选择保存的 人脸库");
                return;
            }
            if (this.totalNum == 0) {
                this.layer.msg("请选择添加人员图片");
                return;
            }
            var checkStr = this.validateParams(this.currentModel);
            if (checkStr) {
                return;
            }
            this.mergeImageList2FormData();
        };
        FaceLibPersonUpdateModalController.prototype.mergeImageList2FormData = function () {
            var personInfo = angular.copy(this.currentModel);
            var req_params = angular.extend({}, personInfo, this.personAssist);
            req_params.AddPicTaskIds = [];
            req_params.AddFacePicPath = [];
            angular.forEach(this.imageThumbList, function (val) {
                req_params.AddPicTaskIds.push(val.key);
                req_params.AddFacePicPath.push(val.imageurl);
            });
            req_params.DeletePicPath = this.imageDeletePathList;
            var req_paramsList = [];
            if (this.isUpdate) {
                req_paramsList.push(req_params);
            }
            else {
                angular.forEach(this.toLibIdList, function (val) {
                    var paramsItem = angular.copy(req_params);
                    paramsItem.LibID = val;
                    req_paramsList.push(paramsItem);
                });
            }
            this.commitSaveOrUpdate(req_paramsList);
        };
        FaceLibPersonUpdateModalController.prototype.commitSaveOrUpdate = function (params) {
            var _this = this;
            console.debug("commitSaveOrUpdate", params);
            if (this.isUpdate) {
                this.businessLibPersonService.updatePerson(params).then(function (resp) {
                    if (resp.code == 200) {
                        _this.closeUpdateModel(true);
                    }
                });
            }
            else {
                this.businessLibPersonService.addPerson(params).then(function (resp) {
                    console.log(params);
                    if (resp.code == 200) {
                        _this.closeUpdateModel(true);
                    }
                });
            }
        };
        ;
        FaceLibPersonUpdateModalController.prototype.validateParams = function (model) {
            return '';
        };
        FaceLibPersonUpdateModalController.prototype.initCover = function () {
            var _this = this;
            var imageCover = "../images/baseconfig/person-default.png";
            if (this.imageThumbList && this.imageThumbList.length > 0) {
                imageCover = this.imageThumbList[this.imageThumbList.length - 1].imageurl;
            }
            else if (this.currentModel && this.currentModel.FacePicPath && this.currentModel.FacePicPath.length > 0) {
                imageCover = this.currentModel.FacePicPath[this.currentModel.FacePicPath.length - 1];
            }
            if (this.imageCover !== imageCover) {
                this.$timeout(function () {
                    console.log(imageCover);
                    _this.imageCover = imageCover;
                });
            }
        };
        FaceLibPersonUpdateModalController.prototype.initWebUploader = function () {
            var _this = this;
            var headerData = this.userInfoCacheFactory.getCurrentUserKey();
            var fileInfo = {};
            this.$timeout(function () {
                _this.uploader = webUploader.Base.create({
                    auto: true,
                    swf: "/libs/webuploader-0.1.5/Uploader.swf",
                    server: _this.businessLibPersonService.getCheckFaceUrl(),
                    resize: false,
                    accept: {
                        title: 'Images',
                        extensions: 'gif,jpg,jpeg,bmp,png',
                        mimeTypes: 'image/jpg,image/jpeg,image/png'
                    },
                    formData: {
                        storeType: 'LOC',
                        imageCategory: "CaptureImage",
                        commandType: "UpdateBizPerson",
                        detectType: "Face"
                    },
                    thumb: {
                        width: 330,
                        height: 330,
                        quality: 70,
                        allowMagnify: true,
                        crop: false,
                        type: '',
                        compressSize: 0,
                    },
                    fileVal: 'image',
                    duplicate: true,
                    disableGlobalDnd: true,
                    method: 'POST',
                    headers: headerData,
                    compress: false
                });
                _this.uploader.addButton({
                    id: "#" + _this.imageUploadId,
                    innerHTML: _this.i18nFactory('FDS_01_06_32'),
                    multiple: false
                });
                _this.uploader.on('beforeFileQueued', function (file) {
                    if (_this.totalNum === _this.maxImageNum) {
                        _this.layer.msg(_this.i18nFactory('FDS_01_06_64'));
                        return false;
                    }
                    if (file.size > 10 * 1024 * 1024) {
                        _this.layer.msg(_this.i18nFactory('FDS_01_06_65'));
                        return false;
                    }
                    return true;
                });
                _this.uploader.on("filesQueued", function (files) {
                });
                _this.uploader.on("fileDequeued", function (file) {
                    console.log("fileDequeued");
                });
                _this.uploader.on("uploadProgress", function (file, percentage) {
                });
                _this.uploader.on("uploadSuccess", function (file, response, ee) {
                    console.log("success_================");
                    console.log(file);
                    _this.uploader.makeThumb(file, function (err, src) {
                        _this.afterSuccessUpload(file, response);
                    });
                });
                _this.uploader.on("uploadError", function (file, reason, reason1, reason2) {
                    console.debug("uploadError", file, reason, reason1, reason2);
                    _this.afterErrorUpload();
                });
                _this.uploader.on("uploadAccept", function (object, ret) {
                    console.log(object, ret);
                });
                _this.uploader.on("uploadFinished", function (file, resp) {
                    console.log("uploadFinished");
                });
                _this.uploader.on("error", function (type) {
                    if (type == "Q_TYPE_DENIED") {
                        this.afterErrorUpload();
                    }
                    else if (type == "F_EXCEED_SIZE") {
                        this.layer.msg(this.i18nFactory('FDS_01_06_65'));
                    }
                });
            });
        };
        FaceLibPersonUpdateModalController.prototype.cacheThumb = function (file) {
            this.imageThumbList.push(file);
            this.refreshTotalNum();
            this.initCover();
        };
        FaceLibPersonUpdateModalController.prototype.removeThumb = function (file) {
            var fileKey = file.key, imageThumbList = this.imageThumbList, i, len, temp;
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
        };
        FaceLibPersonUpdateModalController.prototype.refreshTotalNum = function () {
            var _this = this;
            var result = 0;
            result += this.imageThumbList.length;
            if (this.currentModel && this.currentModel.FacePicPath) {
                result += this.currentModel.FacePicPath.length;
            }
            this.$timeout(function () {
                _this.totalNum = result;
            });
        };
        FaceLibPersonUpdateModalController.prototype.afterErrorUpload = function () {
            this.layer.msg(this.i18nFactory('FDS_01_16_29'));
        };
        ;
        FaceLibPersonUpdateModalController.prototype.afterSuccessUpload = function (file, response) {
            if (response.code === 200 && !!response.data) {
                this.cacheThumb(response.data);
            }
            else if (response.code === 4023 && !!response.data) {
                this.openFacesSelect(response.data, file);
            }
            else {
                this.layer.msg(this.i18nFactory('FDS_01_06_56'));
            }
        };
        ;
        FaceLibPersonUpdateModalController.prototype.openFacesSelect = function (resp, file) {
            var _this = this;
            var scope = this.$scope.$new();
            scope.file = file;
            scope.data = resp;
            scope.commandType = CommandType_1.CommandType.UpdateBizPerson;
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
                success: function (layero, index) {
                    if (!_this.facesSelectLayerIndex) {
                        _this.watchFacesSelectLayerClosed();
                    }
                    _this.facesSelectLayerIndex = index;
                },
            });
        };
        ;
        FaceLibPersonUpdateModalController.prototype.watchFacesSelectLayerClosed = function () {
            var _this = this;
            this.$scope.$on(this.facesSelectLayerEmit, function (even, data) {
                if (data && data.code === 200) {
                    _this.cacheThumb(data.data);
                }
                _this.layer.close(_this.facesSelectLayerIndex);
            });
        };
        FaceLibPersonUpdateModalController.prototype.showImageThumbs = function () {
            var scope = this.$scope.$new();
            var tempFacePicPath = [];
            var facePicPathList = (this.currentModel || {}).FacePicPath;
            if (facePicPathList && facePicPathList.length > 0) {
                angular.forEach(facePicPathList, function (path) {
                    var oldCheckFace = {};
                    oldCheckFace.imageurl = path;
                    oldCheckFace.efficacyTime = -1;
                    tempFacePicPath.push(oldCheckFace);
                });
            }
            scope.imageThumbList = this.imageThumbList.concat(tempFacePicPath);
            scope.facesWatchLayerEmit = this.facesWatchLayerEmit;
            var titleStr = this.i18nFactory('FDS_01_06_63');
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
        };
        FaceLibPersonUpdateModalController.prototype.closeUpdateModel = function (isCommit) {
            this.$scope.$emit("fromUpdateFaceLibPersonModal.closed", { isCommit: isCommit });
        };
        FaceLibPersonUpdateModalController.$inject = ['$scope',
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
        return FaceLibPersonUpdateModalController;
    }());
    var ImageUploadThumbController = (function () {
        function ImageUploadThumbController($scope) {
            this.$scope = $scope;
            this.imageThumbList = $scope.imageThumbList;
            this.facesWatchLayerEmit = $scope.facesWatchLayerEmit;
        }
        ImageUploadThumbController.prototype.removeImage = function (file) {
            this.$scope.$emit(this.facesWatchLayerEmit, file);
            var i, len, temp;
            for (i = 0, len = this.imageThumbList.length; i < len; i++) {
                temp = this.imageThumbList[i];
                if (file.imageurl === temp.imageurl) {
                    this.imageThumbList.splice(i, 1);
                    i--;
                    len--;
                    return true;
                }
            }
        };
        ImageUploadThumbController.prototype.closeModal = function () {
            this.$scope.$emit(this.facesWatchLayerEmit, null);
        };
        ImageUploadThumbController.$inject = ["$scope"];
        return ImageUploadThumbController;
    }());
    main_app_1.app.controller('faceLibPersonUpdateModalController', FaceLibPersonUpdateModalController);
    main_app_1.app.controller("imageUploadThumbController", ImageUploadThumbController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2ZhY2VMaWJQZXJzb25VcGRhdGVNb2RhbC9mYWNlTGliUGVyc29uVXBkYXRlLm1vZGFsLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBeURBLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUl6QztRQVlJO1lBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxxQ0FBcUMsQ0FBQTtRQUN6RCxDQUFDO1FBQ0wscUNBQUM7SUFBRCxDQWxCQSxBQWtCQyxJQUFBO0lBbEJZLHdFQUE4QjtJQW9CM0M7UUF1RUksNENBQW9CLE1BQXNDLEVBQzlDLGtCQUF1QyxFQUN2QyxvQkFBMkMsRUFDM0MsUUFBYSxFQUNiLGtCQUF1QyxFQUN2Qyx3QkFBbUQsRUFDbkQsS0FBVSxFQUNWLFdBQWdCLEVBQ2hCLE9BQVksRUFDWixXQUFrQyxFQUNsQyx5QkFBcUQ7WUFWakUsaUJBNERDO1lBNURtQixXQUFNLEdBQU4sTUFBTSxDQUFnQztZQUM5Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXFCO1lBQ3ZDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBdUI7WUFDM0MsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUNiLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBcUI7WUFDdkMsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEyQjtZQUNuRCxVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQ1YsZ0JBQVcsR0FBWCxXQUFXLENBQUs7WUFDaEIsWUFBTyxHQUFQLE9BQU8sQ0FBSztZQUNaLGdCQUFXLEdBQVgsV0FBVyxDQUF1QjtZQUNsQyw4QkFBeUIsR0FBekIseUJBQXlCLENBQTRCO1lBaEZqRSxhQUFRLEdBQVksS0FBSyxDQUFDO1lB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Q0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL2ZhY2VMaWJQZXJzb25VcGRhdGVNb2RhbC9mYWNlTGliUGVyc29uVXBkYXRlLm1vZGFsLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4vZmFjZUxpYlBlcnNvblVwZGF0ZS5pbWFnZVRodW1iLmh0bWxcIiBuYW1lPVwiZmFjZUxpYlBlcnNvblVwZGF0ZUltYWdlVGh1bWJIdG1sXCIgLz5cclxuXHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vZmFjZUhhbmRsZVBvcHVwL3NlbGVjdEZhY2UucG9wdXAuaHRtbFwiIG5hbWU9XCJzZWxlY3RGYWNlUG9wdXBIdG1sXCIvPlxyXG5cclxuaW1wb3J0IFwiLi4vc2VydmljZXMvYnVzaW5lc3NMaWIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBJQnVzaW5lc3NMaWJTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2J1c2luZXNzTGliLnNlcnZpY2VcIjtcclxuXHJcbmRlY2xhcmUgbGV0IGZhY2VMaWJQZXJzb25VcGRhdGVJbWFnZVRodW1iSHRtbDogYW55O1xyXG5pbXBvcnQgXCJjc3MhLi9iYXNlY29uZmlnLWZhY2VMaWItcGVyc29uLmNzc1wiO1xyXG5pbXBvcnQgXCJjc3MhLi8uLi8uLi9iYXNlY29uZmlnL2Nzcy9iYXNlY29uZmlnLmNzc1wiO1xyXG5pbXBvcnQgeyBhcHAgfSBmcm9tIFwiLi4vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnLi4vc2VydmljZXMvYXJlYS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCBcIi4uL3NlcnZpY2VzL2J1c2luZXNzTGliUGVyc29uLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCAnYW5ndWxhcic7XHJcbmltcG9ydCBcIndlYlVwbG9hZGVyXCI7XHJcblxyXG5pbXBvcnQgeyBSZXNwb25zZVJlc3VsdCB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHsgQnVzaW5lc3NQZXJzb24gfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvQnVzaW5lc3NQZXJzb25cIjtcclxuXHJcbmltcG9ydCB7IElCdXNpbmVzc0xpYlBlcnNvblNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvYnVzaW5lc3NMaWJQZXJzb24uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBHZW5kZXJUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vR2VuZGVyVHlwZVwiO1xyXG5pbXBvcnQgeyBFbnVtIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW51bS9FbnVtXCI7XHJcbmltcG9ydCB7IE5hdGlvblR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9OYXRpb25UeXBlXCI7XHJcbmltcG9ydCB7IEJ1c2luZXNzUGVyc29uRXggfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2ZXIvQnVzaW5lc3NQZXJzb25Nb2RlbFwiO1xyXG5pbXBvcnQgeyBDb21tYW5kVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL0NvbW1hbmRUeXBlXCI7XHJcblxyXG5pbXBvcnQgXCIuLi9mYWN0b3J5L3dlYlVwbG9hZGVyLmZhY3RvcnlcIjtcclxuaW1wb3J0IHsgSVdlYlVwbG9hZGVyRmFjdG9yeSB9IGZyb20gXCIuLi9mYWN0b3J5L3dlYlVwbG9hZGVyLmZhY3RvcnlcIjtcclxuXHJcbmltcG9ydCB7IENoZWNrRmFjZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9DaGVja0ZhY2VcIjtcclxuaW1wb3J0IHsgUGVyc29uQXNzaXN0IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmVyL1BlcnNvbkFzc2lzdE1vZGVsXCI7XHJcbmltcG9ydCB7IENyZWRlbnRpYWxzVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL0NyZWRlbnRpYWxzVHlwZVwiO1xyXG5pbXBvcnQgeyBVcGRhdGVNb2RhbFBhcmFtcyB9IGZyb20gXCIuLi90eXBlcy9zZXJ2ZXJVcGRhdGVNb2RhbC5wYXJhbXNcIjtcclxuXHJcbmltcG9ydCBcIi4uL2ZhY2VIYW5kbGVQb3B1cC9zZWxlY3RGYWNlLnBvcHVwLmNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHsgVHJlZURhdGFQYXJhbXMgfSBmcm9tIFwiLi4vZGlyZWN0aXZlL3RyZWUvdHJlZS1wYXJhbXNcIjtcclxuaW1wb3J0IHsgQXJlYUV4IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0FyZWFFeFwiO1xyXG5pbXBvcnQgeyBCdXNpbmVzc0xpYkV4IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0J1c2luZXNzTGliRXhcIjtcclxuaW1wb3J0IHsgQXJlYUFuZEJ1c2luZXNzTGlzdFJlc3VsdCB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9CdXNpbmVzc0xpYlBhcmFtc1wiO1xyXG5pbXBvcnQgeyBUcmVlVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudW0vVHJlZVR5cGVcIjtcclxuaW1wb3J0ICcuLi9maWx0ZXIvYXBwLmZpbHRlcic7XHJcbmltcG9ydCB7IElUcmVlRGlyZWN0aXZlU2VydmljZSB9IGZyb20gXCIuLi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uL2RpcmVjdGl2ZS90cmVlL3RyZWUuZGlyZWN0aXZlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUGVyc29uVHJlZUV4IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L1BlcnNvblRyZWVFeFwiO1xyXG5pbXBvcnQgeyBWYWx1ZVRleHRFbnVtVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudW0vRW51bVwiO1xyXG5pbXBvcnQgeyBGYWNlVXBkYXRlUGFyYW1zIH0gZnJvbSBcIi4uL2ZhY2VMaWJVcGRhdGVNb2RhbC9mYWNlTGliVXBkYXRlTW9kYWwuZmFjdG9yeVwiO1xyXG5pbXBvcnQgeyBJRmFjZUxpYlVwZGF0ZU1vZGFsRmFjdG9yeSB9IGZyb20gXCIuLi9mYWNlTGliVXBkYXRlTW9kYWwvZmFjZUxpYlVwZGF0ZU1vZGFsLmZhY3RvcnlcIjtcclxuaW1wb3J0IFwiLi4vZmFjZUxpYlVwZGF0ZU1vZGFsL2ZhY2VMaWJVcGRhdGVNb2RhbC5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uL2ZhY3RvcnkvdXNlcmluZm8uY2FjaGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQgeyBJVXNlckluZm9DYWNoZUZhY3RvcnkgfSBmcm9tIFwiLi4vZmFjdG9yeS91c2VyaW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7IENsYXNzaWZ5RGlmZkNoaWxkUGFyYW1zLCBkZWZhdWx0IGFzIFBvcnRyYWl0VG9vbCB9IGZyb20gXCIuLi9wb3J0cmFpdC10b29sXCI7XHJcbmltcG9ydCB7IEJ1c2luZXNzTGliIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L0J1c2luZXNzTGliXCI7XHJcblxyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTtcclxubGV0IHdlYlVwbG9hZGVyID0gcmVxdWlyZShcIndlYlVwbG9hZGVyXCIpO1xyXG5kZWNsYXJlIGxldCBzZWxlY3RGYWNlUG9wdXBIdG1sOiBzdHJpbmc7XHJcbnR5cGUgQXJlYUJ1c2luZXNzTGliRXggPSBBcmVhRXggJiBCdXNpbmVzc0xpYkV4O1xyXG5cclxuZXhwb3J0IGNsYXNzIFVwZGF0ZUZhY2VMaWJQZXJzb25Nb2RhbFBhcmFtcyB7XHJcbiAgICBpbWdJbmZvOiBDaGVja0ZhY2U7XHJcbiAgICBsaWJJZDogc3RyaW5nO1xyXG4gICAgaXNVcGRhdGU6IGJvb2xlYW47XHJcbiAgICBoYXNUcmVlOiBib29sZWFuO1xyXG4gICAgdXBkYXRlTW9kYWw6IEJ1c2luZXNzUGVyc29uO1xyXG4gICAgbGliVHJlZURhdGE6IEFyZWFBbmRCdXNpbmVzc0xpc3RSZXN1bHQ7XHJcbiAgICBlbWl0TmFtZTogc3RyaW5nO1xyXG4gICAgJG9uOiBGdW5jdGlvbjtcclxuICAgICRlbWl0OiBGdW5jdGlvbjtcclxuICAgICRkZXN0cm95OiBGdW5jdGlvbjtcclxuICAgICRuZXc6IEZ1bmN0aW9uO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5pc1VwZGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaGFzVHJlZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTW9kYWwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZW1pdE5hbWUgPSBcImZyb21VcGRhdGVGYWNlTGliUGVyc29uTW9kYWwuY2xvc2VkXCJcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRmFjZUxpYlBlcnNvblVwZGF0ZU1vZGFsQ29udHJvbGxlciB7XHJcbiAgICBpc1VwZGF0ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgY3VycmVudE1vZGVsOiBCdXNpbmVzc1BlcnNvbkV4O1xyXG4gICAgcGVyc29uQXNzaXN0OiBQZXJzb25Bc3Npc3Q7XHJcbiAgICBjbG9zZU1vZGVsRW1pdE5hbWU6IHN0cmluZztcclxuICAgIHRvTGliSWRMaXN0OiBBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG4gICAgLy/kuIvmi4npgInmi6nliJfooahzXHJcbiAgICBnZW5kZXJUeXBlTGlzdDogQXJyYXk8RW51bT4gPSBbXTtcclxuICAgIG5hdGlvbkxpc3Q6IEFycmF5PEVudW0+ID0gW107XHJcbiAgICBjcmVkZW50aWFsc1R5cGVMaXN0OiBBcnJheTxFbnVtPiA9IFtdO1xyXG5cclxuICAgIC8vIOS4iuS8oOWbvueJh+ebuOWFs1xyXG4gICAgdXBsb2FkZXI6IGFueTtcclxuICAgIHRvdGFsTnVtOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGltYWdlVXBsb2FkSWQ6IHN0cmluZyA9IFwiZmFjZUxpYlBlcnNvbkltYWdlVXBsb2FkZXJcIjtcclxuXHJcbiAgICBpbWFnZVRodW1iTGlzdDogQXJyYXk8Q2hlY2tGYWNlPjtcclxuICAgIC8vIOe8k+WtmOS4iuS8oOaIkOWKn+eahOWbvueJh+i/lOWbnueahHVybOi3r+W+hFxyXG4gICAgaW1hZ2VVcGxvYWRTdWNjZXNzUGF0aExpc3Q6IEFycmF5PHN0cmluZz47XHJcbiAgICAvLyDkv67mlLnmk43kvZzkuK0sIOenu+mZpOaOieeahOWbvueJh+i3r+W+hOmbhuWQiFxyXG4gICAgaW1hZ2VEZWxldGVQYXRoTGlzdDogQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICAvLyDlj6/pgInmi6kg5pyA5aSn5Zu+54mHXHJcbiAgICBtYXhJbWFnZU51bTogbnVtYmVyID0gNTtcclxuXHJcbiAgICBpbWFnZUNvdmVyOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgdXBkYXRlTW9kYWxQYXJhbXM6IFVwZGF0ZU1vZGFsUGFyYW1zPEJ1c2luZXNzUGVyc29uRXg+O1xyXG5cclxuICAgIC8vIOS6uuiEuCDpgInmi6lsYXllciDnqpflj6PkuIvmoIdcclxuICAgIGZhY2VzU2VsZWN0TGF5ZXJJbmRleDogbnVtYmVyO1xyXG4gICAgLy8g5Lq66IS4IOmAieaLqWxheWVyIOeql+WPo2xheWVyIOWFs+mXrSDlm57osINcclxuICAgIGZhY2VzU2VsZWN0TGF5ZXJFbWl0OiBzdHJpbmcgPSBcImZyb21TZWxlY3RGYWNlQ3RybFwiO1xyXG5cclxuICAgIC8vIOW3sumAieWbvueJh+mihOiniFxyXG4gICAgZmFjZXNXYXRjaExheWVySW5kZXg6IG51bWJlcjtcclxuICAgIC8vIOW3sumAieWbvueJh+mihOiniCBsYXllciDlhbPpl60g5Zue6LCDXHJcbiAgICBmYWNlc1dhdGNoTGF5ZXJFbWl0OiBzdHJpbmcgPSBcImxheWVyQ2xvc2UuZnJvbUZhY2VXYXRjaFwiO1xyXG5cclxuICAgIC8vIOS6uuiEuOW6kyDmoJHliJfooahcclxuICAgIHB1YmxpYyBmYWNlTGliVHJlZVBhcmFtczogVHJlZURhdGFQYXJhbXM8QXJlYUJ1c2luZXNzTGliRXg+O1xyXG4gICAgcHJpdmF0ZSBmYWNlTGliVHJlZUlkOiBzdHJpbmcgPSBcImxpYlBlcnNvblVwZGF0ZUZhY2VMaWJUcmVlXCI7XHJcbiAgICAvLy0tLS0tLS1lbmRcclxuXHJcbiAgICAvL+WIpOaWreaYr+WQpuWxleekuuagkVxyXG4gICAgaGFzVHJlZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8v5bey6YCJ5oup55qE6IqC54K5XHJcbiAgICB0cmVlU2VsZWN0ZWROb2RlTGlzdDogQXJyYXk8UGVyc29uVHJlZUV4PiA9IFtdIGFzIEFycmF5PFBlcnNvblRyZWVFeD47XHJcblxyXG4gICAgLy/mkJzntKLlhbPplK7lrZdcclxuICAgIHNlYXJjaFN0cjogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAvL+e8lui+keeql+WPoyDlub/mkq3jgIHmjqXmlLblkI3np7BcclxuICAgIHdhdGNoVXBkYXRlTW9kYWxOYW1lOiBzdHJpbmcgPSBcIndhdGNoVXBkYXRlTW9kYWxOYW1lXCI7XHJcbiAgICB1cGRhdGVMYXllckluZGV4OiBudW1iZXI7XHJcblxyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsXHJcbiAgICAgICAgJ3dlYlVwbG9hZGVyRmFjdG9yeScsXHJcbiAgICAgICAgJ3VzZXJJbmZvQ2FjaGVGYWN0b3J5JyxcclxuICAgICAgICAnJHRpbWVvdXQnLFxyXG4gICAgICAgICdidXNpbmVzc0xpYlNlcnZpY2UnLFxyXG4gICAgICAgICdidXNpbmVzc0xpYlBlcnNvblNlcnZpY2UnLFxyXG4gICAgICAgICdsYXllcicsXHJcbiAgICAgICAgJ2kxOG5GYWN0b3J5JyxcclxuICAgICAgICAnJGZpbHRlcicsXHJcbiAgICAgICAgJ3RyZWVEaXJlY3RpdmVTZXJ2aWNlJyxcclxuICAgICAgICAnZmFjZUxpYlVwZGF0ZU1vZGFsRmFjdG9yeSdcclxuICAgIF07XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IFVwZGF0ZUZhY2VMaWJQZXJzb25Nb2RhbFBhcmFtcyxcclxuICAgICAgICBwcml2YXRlIHdlYlVwbG9hZGVyRmFjdG9yeTogSVdlYlVwbG9hZGVyRmFjdG9yeSxcclxuICAgICAgICBwcml2YXRlIHVzZXJJbmZvQ2FjaGVGYWN0b3J5OiBJVXNlckluZm9DYWNoZUZhY3RvcnksXHJcbiAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW55LFxyXG4gICAgICAgIHByaXZhdGUgYnVzaW5lc3NMaWJTZXJ2aWNlOiBJQnVzaW5lc3NMaWJTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgYnVzaW5lc3NMaWJQZXJzb25TZXJ2aWNlOiBJQnVzaW5lc3NMaWJQZXJzb25TZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgbGF5ZXI6IGFueSxcclxuICAgICAgICBwcml2YXRlIGkxOG5GYWN0b3J5OiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSAkZmlsdGVyOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSB0cmVlU2VydmljZTogSVRyZWVEaXJlY3RpdmVTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgZmFjZUxpYlVwZGF0ZU1vZGFsRmFjdG9yeTogSUZhY2VMaWJVcGRhdGVNb2RhbEZhY3RvcnlcclxuICAgICkge1xyXG4gICAgICAgICRzY29wZS4kb24oXCIkZGVzdHJveVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCLplIDmr4FGYWNlTGliUGVyc29uVXBhZHRlTW9kZWxDb250cm9sbGVyXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnVwbG9hZGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy51cGxvYWRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VEZWxldGVQYXRoTGlzdCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VUaHVtYkxpc3QgPSBudWxsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuaW1hZ2VUaHVtYkxpc3QgPSBbXSBhcyBBcnJheTxDaGVja0ZhY2U+O1xyXG4gICAgICAgIHRoaXMuaW1hZ2VVcGxvYWRTdWNjZXNzUGF0aExpc3QgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIHRoaXMuaW1hZ2VEZWxldGVQYXRoTGlzdCA9IFtdIGFzIEFycmF5PHN0cmluZz47XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdFVwZGF0ZURhdGEoKTtcclxuICAgICAgICB0aGlzLmhhc1RyZWUgPSAkc2NvcGUuaGFzVHJlZTtcclxuICAgICAgICBpZiAodGhpcy5oYXNUcmVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjZUxpYlRyZWVQYXJhbXMgPSB0aGlzLmluaXRMaWJUcmVlUGFyYW1zKHRoaXMuZmFjZUxpYlRyZWVJZCwgdGhpcy50b0xpYklkTGlzdCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0TGliVHJlZURhdGEoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLiRvbih0aGlzLmZhY2VzV2F0Y2hMYXllckVtaXQsIChldmVudDogRXZlbnQsIGZpbGU6IENoZWNrRmFjZSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFmaWxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKHRoaXMuZmFjZXNXYXRjaExheWVySW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGksIGxlbiwgdGVtcDsgLy8g5Lik56eN5oOF5Ya1LCBmaWxlSWTlj6/og73lnKh3ZWJ1cGxvYWRlcuS4rSDmiJbogIXlnKhjdXJyZW50TW9kZWwuRmFjZVBpY1BhdGjkuK1cclxuICAgICAgICAgICAgaWYgKGZpbGUuZWZmaWNhY3lUaW1lID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVUaHVtYihmaWxlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChmaWxlLmVmZmljYWN5VGltZSA9PT0gLTFcclxuICAgICAgICAgICAgICAgICYmIHRoaXMuY3VycmVudE1vZGVsICYmIHRoaXMuY3VycmVudE1vZGVsLkZhY2VQaWNQYXRoICYmIHRoaXMuY3VycmVudE1vZGVsLkZhY2VQaWNQYXRoLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHRoaXMuY3VycmVudE1vZGVsLkZhY2VQaWNQYXRoLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcCA9IHRoaXMuY3VycmVudE1vZGVsLkZhY2VQaWNQYXRoW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWxlLmltYWdldXJsID09PSB0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1vZGVsLkZhY2VQaWNQYXRoLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaS0tOyBsZW4tLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZURlbGV0ZVBhdGhMaXN0LnB1c2godGVtcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFRvdGFsTnVtKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRDb3ZlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdFNlbGVjdFNyYygpO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRXZWJVcGxvYWRlcigpO1xyXG4gICAgICAgIHRoaXMuaW5pdENvdmVyKCk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVG90YWxOdW0oKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0U2VsZWN0U3JjKCkge1xyXG4gICAgICAgIGxldCB0OiBhbnkgPSB0aGlzLiRzY29wZS51cGRhdGVNb2RhbDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRNb2RlbCA9IHQ7XHJcblxyXG4gICAgICAgIHRoaXMuZ2VuZGVyVHlwZUxpc3QucHVzaChHZW5kZXJUeXBlLk1lbik7XHJcbiAgICAgICAgdGhpcy5nZW5kZXJUeXBlTGlzdC5wdXNoKEdlbmRlclR5cGUuV29tZW4pO1xyXG4gICAgICAgIGxldCBfTmF0aW9uVHlwZSA9IE5hdGlvblR5cGUgYXMgQXJyYXk8eyB0ZXh0OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIHBhcmVudENvZGU6IHN0cmluZyB9PjtcclxuICAgICAgICBmb3IgKGxldCBrIGluIF9OYXRpb25UeXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aW9uTGlzdC5wdXNoKF9OYXRpb25UeXBlW2tdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jcmVkZW50aWFsc1R5cGVMaXN0ID0gW10gYXMgQXJyYXk8RW51bT47XHJcbiAgICAgICAgdGhpcy5jcmVkZW50aWFsc1R5cGVMaXN0LnB1c2goQ3JlZGVudGlhbHNUeXBlLklkQ2FyZCk7XHJcblxyXG4gICAgfTtcclxuICAgIC8vIOagueaNriAkc2NvcGUg5Yid5aeL5YyW57yW6L6R44CB5re75YqgIOS/oeaBr1xyXG4gICAgaW5pdFVwZGF0ZURhdGEoKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtczogVXBkYXRlRmFjZUxpYlBlcnNvbk1vZGFsUGFyYW1zID0gdGhpcy4kc2NvcGU7XHJcbiAgICAgICAgdGhpcy5jbG9zZU1vZGVsRW1pdE5hbWUgPSBwYXJhbXMuZW1pdE5hbWU7XHJcbiAgICAgICAgdGhpcy5pc1VwZGF0ZSA9IHBhcmFtcy5pc1VwZGF0ZSA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICBpZiAocGFyYW1zLmlzVXBkYXRlICYmIHBhcmFtcy51cGRhdGVNb2RhbCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNb2RlbCA9IHBhcmFtcy51cGRhdGVNb2RhbCBhcyBCdXNpbmVzc1BlcnNvbkV4O1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNb2RlbC5OYXRpb24gPSBcIuacquefpVwiXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0UGVyc29uQXNzaXN0KHBhcmFtcy51cGRhdGVNb2RhbC5JRCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5re75YqgIOS6uuWRmCDliJ3lp4vljJZcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50TW9kZWwgPSBuZXcgQnVzaW5lc3NQZXJzb25FeCgpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNb2RlbC5GYWNlUGljUGF0aCA9IFtdIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1vZGVsLkdlbmRlciA9IEdlbmRlclR5cGUuTWVuLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnBlcnNvbkFzc2lzdCA9IG5ldyBQZXJzb25Bc3Npc3QoKTtcclxuICAgICAgICAgICAgdGhpcy5wZXJzb25Bc3Npc3QuQ3JlZGVudGlhbHNUeXBlID0gQ3JlZGVudGlhbHNUeXBlLklkQ2FyZC50ZXh0O1xyXG5cclxuICAgICAgICAgICAgaWYgKHBhcmFtcy5saWJJZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b0xpYklkTGlzdCA9IFtwYXJhbXMubGliSWRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMuaW1nSW5mbykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZVRodW1iTGlzdC5wdXNoKHBhcmFtcy5pbWdJbmZvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8g6I635Y+W5Lq65YOP5bqT57u85ZCI5pWw5o2uXHJcbiAgICBnZXRMaWJUcmVlRGF0YSgpIHtcclxuICAgICAgICB0aGlzLmJ1c2luZXNzTGliU2VydmljZS5maW5kSGFzU2VsZlRyZWVXaXRoQXJlYShudWxsKS50aGVuKChyZXNwOiBSZXNwb25zZVJlc3VsdDxBcmVhQW5kQnVzaW5lc3NMaXN0UmVzdWx0PikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzcC5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mYWNlTGliVHJlZVBhcmFtcy50cmVlRGF0YXMgPSBbXTtcclxuICAgICAgICAgICAgICAgIC8qbGV0IGFyZWFBcnIgPSBhbmd1bGFyLmNvcHkocmVzcC5kYXRhLmFyZWFFeExpc3QpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpYkFyciA9IGFuZ3VsYXIuY29weShyZXNwLmRhdGEuYnVzaW5lc3NMaWJFeExpc3QpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mYWNlTGliVHJlZVBhcmFtcy50cmVlRGF0YXMgPSBhcmVhQXJyLmNvbmNhdChsaWJBcnIpOyovXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtcyA9IG5ldyBDbGFzc2lmeURpZmZDaGlsZFBhcmFtcygpO1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zLm5ld0NoaWxkTmFtZSA9IHRoaXMuaTE4bkZhY3RvcnkoXCJGRFNfMDBfMTJfMzVcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZURhdGEgPSBQb3J0cmFpdFRvb2wuY2xhc3NpZnlEaWZmQ2hpbGQocGFyYW1zLCBbcmVzcC5kYXRhLmFyZWFFeExpc3QsIHJlc3AuZGF0YS5idXNpbmVzc0xpYkV4TGlzdF0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mYWNlTGliVHJlZVBhcmFtcy50cmVlRGF0YXMgPSBub2RlRGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL+S6uuWDj+W6k+agkeWIneWni+WMllxyXG4gICAgaW5pdExpYlRyZWVQYXJhbXMoZmFjZUxpYlRyZWVJZDogc3RyaW5nLCB0b0xpYklkTGlzdDogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgICAgIGxldCBvYmo6IFRyZWVEYXRhUGFyYW1zPEFyZWFCdXNpbmVzc0xpYkV4PjtcclxuICAgICAgICBvYmogPSBuZXcgVHJlZURhdGFQYXJhbXM8QXJlYUJ1c2luZXNzTGliRXg+KHRydWUpO1xyXG4gICAgICAgIG9iai50cmVlSWQgPSBmYWNlTGliVHJlZUlkO1xyXG4gICAgICAgIG9iai5vbkNoZWNrID0gKGV2ZW50OiBFdmVudCwgdHJlZUlkOiBzdHJpbmcsIHRyZWVOb2RlOiBhbnkpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgdG9MaWJJZExpc3QgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVUcmVlU2VsZWN0ZWRMaXN0KGZhY2VMaWJUcmVlSWQpXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gb2JqXHJcbiAgICB9O1xyXG4gICAgLy8g6I635Y+WIHBlcnNvbiDovoXliqnkv6Hmga9cclxuICAgIGdldFBlcnNvbkFzc2lzdChwZXJzb25JZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5idXNpbmVzc0xpYlBlcnNvblNlcnZpY2UuZmluZFBlcnNvbkFzc2lzdEJ5SWQocGVyc29uSWQpLnRoZW4oKHJlc3A6IFJlc3BvbnNlUmVzdWx0PFBlcnNvbkFzc2lzdD4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3AuY29kZSA9PSAyMDAgJiYgcmVzcC5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlcnNvbkFzc2lzdCA9IHJlc3AuZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy/mm7TmlrAg5b2T5YmN6YCJ5Lit5YiX6KGo5pWw5o2uXHJcbiAgICBwcml2YXRlIHVwZGF0ZVRyZWVTZWxlY3RlZExpc3QodHJlZUlkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgdHJlZVR5cGUgPSBUcmVlVHlwZS5idXNpbmVzc0xpYi52YWx1ZTtcclxuICAgICAgICBpZiAodGhpcy4kZmlsdGVyKFwiZHVtbXlOb2RlRmlsdGVyXCIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJlZVNlbGVjdGVkTm9kZUxpc3QgPSB0aGlzLiRmaWx0ZXIoXCJkdW1teU5vZGVGaWx0ZXJcIikodGhpcy5nZXRDaGVja2VkTGlzdCh0cmVlSWQsIHRyZWVUeXBlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50cmVlU2VsZWN0ZWROb2RlTGlzdCA9IHRoaXMuZ2V0Q2hlY2tlZExpc3QodHJlZUlkLCB0cmVlVHlwZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMudHJlZVNlbGVjdGVkTm9kZUxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyZWVTZWxlY3RlZE5vZGVMaXN0W2ldLnRyZWVUeXBlID09IFRyZWVUeXBlLmJ1c2luZXNzTGliLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvTGliSWRMaXN0LnB1c2godGhpcy50cmVlU2VsZWN0ZWROb2RlTGlzdFtpXS5JRClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy/ojrflj5blt7LpgInmi6nnmoQg5qCR6IqC54K56ZuG5ZCIXHJcbiAgICBwcml2YXRlIGdldENoZWNrZWRMaXN0KHRyZWVJZDogc3RyaW5nLCB0cmVlVHlwZTogc3RyaW5nKTogQXJyYXk8YW55PiB7XHJcbiAgICAgICAgbGV0IHRyZWVDaGVja2VkTm9kZXMgPSB0aGlzLnRyZWVTZXJ2aWNlLmdldENoZWNrZWROb2Rlcyh0cmVlSWQsIHRydWUpO1xyXG4gICAgICAgIGxldCByZXN1bHQ6IEFycmF5PGFueT4gPSBbXSBhcyBBcnJheTxhbnk+O1xyXG4gICAgICAgIGlmICh0cmVlQ2hlY2tlZE5vZGVzKSB7XHJcbiAgICAgICAgICAgIGlmICh0cmVlVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHRyZWVDaGVja2VkTm9kZXMsICh2YWw6IFBlcnNvblRyZWVFeCAmIEFyZWFFeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwudHJlZVR5cGUgPT09IHRyZWVUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0cmVlQ2hlY2tlZE5vZGVzLmNvbmNhdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mkJzntKLmoYbmlLnlj5hcclxuICAgIG9uQ2hhbmdlU2VhcmNoKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdGhpcy5mYWNlTGliVHJlZVBhcmFtcyB8fCB0aGlzLmZhY2VMaWJUcmVlUGFyYW1zLnRyZWVEYXRhcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWVTZXJ2aWNlLmZpbHRlclNob3dOb2Rlcyh0aGlzLmZhY2VMaWJUcmVlSWQsIFwiTmFtZVwiLCB0aGlzLnNlYXJjaFN0cik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGFkZFN0b3JhZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5vcGVuVXBkYXRlTW9kZWwoZmFsc2UsIG51bGwsIG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5omT5byAIOaWsOWinuOAgeS/ruaUueeql+WPo1xyXG4gICAgb3BlblVwZGF0ZU1vZGVsKGlzVXBkYXRlOiBib29sZWFuLCBkYXRhOiBCdXNpbmVzc0xpYkV4LCBwYXJlbnRJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiBhbnkgPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgbGV0IHVwZGF0ZVBhcmFtcyA9IG5ldyBGYWNlVXBkYXRlUGFyYW1zKCk7XHJcbiAgICAgICAgdXBkYXRlUGFyYW1zLmlzVXBkYXRlID0gaXNVcGRhdGU7XHJcblxyXG4gICAgICAgIHVwZGF0ZVBhcmFtcy51cGRhdGVNb2RhbERhdGEgPSBkYXRhO1xyXG5cclxuICAgICAgICB1cGRhdGVQYXJhbXMucGFyZW50SUQgPSBwYXJlbnRJZDtcclxuXHJcbiAgICAgICAgbGV0IHRpdGxlU3RyID0gaXNVcGRhdGUgPyB0aGlzLmkxOG5GYWN0b3J5KCdGRFNfMDFfMDZfMjAnKSA6IHRoaXMuaTE4bkZhY3RvcnkoJ0ZEU18wMV8wNl8xOScpO1xyXG5cclxuICAgICAgICB0aGlzLmZhY2VMaWJVcGRhdGVNb2RhbEZhY3Rvcnkuc2V0VXBkYXRlUGFyYW1zKHVwZGF0ZVBhcmFtcyk7XHJcbiAgICAgICAgbGV0IGh0bWxTdHIgPSB0aGlzLmZhY2VMaWJVcGRhdGVNb2RhbEZhY3RvcnkuZ2V0TW9kYWxIdG1sKCk7XHJcblxyXG4gICAgICAgIHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZVN0cixcclxuICAgICAgICAgICAgY29udGVudDogaHRtbFN0cixcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICBhcmVhOiBbXCI1MDBweFwiXSxcclxuICAgICAgICAgICAgc2tpbjogXCJvdmVyZmxvdy12aXNpYmxlXCIsXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oKGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy53YXRjaFVwZGF0ZU1vZGFsTmFtZSA9IHRoaXMuZmFjZUxpYlVwZGF0ZU1vZGFsRmFjdG9yeS5nZXRNb2RhbENsb3NlZFdhdGNoTmFtZSgpO1xyXG4gICAgICAgICAgICB0aGlzLm9wZW5DbG9zZUxheWVyV2F0Y2goKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRVcGRhdGVMYXllckluZGV4KGluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy8g5re75YqgIOS/ruaUuU1vZGVsIOWFs+mXreebkeWQrFxyXG4gICAgb3BlbkNsb3NlTGF5ZXJXYXRjaCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMudXBkYXRlTGF5ZXJJbmRleCkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZl90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJG9uKHRoaXMud2F0Y2hVcGRhdGVNb2RhbE5hbWUsIChldmVuOiBhbnksIGRhdGE6IHsgaXNDb21taXQ6IGJvb2xlYW4sIGlzQWRkOiBib29sZWFuLCBtb2RlbERhdGE6IEJ1c2luZXNzTGliRXggfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3YXRjaFVwZGF0ZU1vZGFsTmFtZSDlub/mkq3mjqXmlLZcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5pc0NvbW1pdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmlzQWRkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0TGliVHJlZURhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhcmFtc0xpc3Q6IEFycmF5PHsga2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIsIHBhcmVudE5vZGU/OiBzdHJpbmcgfT4gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLnRyZWVTZWxlY3RlZE5vZGVMaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zTGlzdC5wdXNoKHsga2V5OiAnSUQnLCB2YWx1ZTogdGhpcy50cmVlU2VsZWN0ZWROb2RlTGlzdFtpXS5JRCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlU2VydmljZS5jaGVja05vZGVzQnlQYXJhbXNMaXN0KHRoaXMuZmFjZUxpYlRyZWVJZCwgcGFyYW1zTGlzdCwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMjAwKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubGF5ZXIuY2xvc2UodGhpcy51cGRhdGVMYXllckluZGV4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v6K6w5b2V5b2T5YmN57yW6L6R56qX5Y+j5LiL5qCHXHJcbiAgICBzZXRVcGRhdGVMYXllckluZGV4KGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxheWVySW5kZXggPSBpbmRleDtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmj5DkuqQg5pu05paw5YmNIOiOt+WPluWbvueJh1xyXG4gICAgcHJldkNvbW1pdFNhdmVPclVwZGF0ZSgpIHtcclxuICAgICAgICAvLyDlhYjkuIrkvKDlm77niYcsIOS4iuS8oOWbvueJh+aIkOWKn+WQjuWGjeinpuWPkeWujOaVtOaPkOS6pFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiJWMg6LCD6K+V5omT5Y2wPT09PT09PT09PT09PT09PT09PT09PT09XCIsIFwiY29sb3I6cmVkXCIpO1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCLmo4Dmn6Xlm77niYcg54m55b6B5YC8IOaYr+WQpui/h+acn1wiKTtcclxuICAgICAgICBpZiAoIXRoaXMuaXNVcGRhdGUgJiYgKCF0aGlzLnRvTGliSWRMaXN0IHx8IHRoaXMudG9MaWJJZExpc3QubGVuZ3RoID09IDApKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIubXNnKFwi6K+36YCJ5oup5L+d5a2Y55qEIOS6uuiEuOW6k1wiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy50b3RhbE51bSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIubXNnKFwi6K+36YCJ5oup5re75Yqg5Lq65ZGY5Zu+54mHXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY2hlY2tTdHIgPSB0aGlzLnZhbGlkYXRlUGFyYW1zKHRoaXMuY3VycmVudE1vZGVsKTtcclxuICAgICAgICBpZiAoY2hlY2tTdHIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1lcmdlSW1hZ2VMaXN0MkZvcm1EYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5o+Q5LqkIOaVsOaNruagvOW8j+i9rOWMllxyXG4gICAgbWVyZ2VJbWFnZUxpc3QyRm9ybURhdGEoKSB7XHJcbiAgICAgICAgbGV0IHBlcnNvbkluZm86IEJ1c2luZXNzUGVyc29uID0gYW5ndWxhci5jb3B5KHRoaXMuY3VycmVudE1vZGVsKTtcclxuICAgICAgICAvKlRPRE8g6L6F5Yqp5L+h5oGvIOacquaJqeWxlSovXHJcbiAgICAgICAgbGV0IHJlcV9wYXJhbXM6IEJ1c2luZXNzUGVyc29uRXggPSBhbmd1bGFyLmV4dGVuZCh7fSwgcGVyc29uSW5mbywgdGhpcy5wZXJzb25Bc3Npc3QpO1xyXG5cclxuICAgICAgICByZXFfcGFyYW1zLkFkZFBpY1Rhc2tJZHMgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIHJlcV9wYXJhbXMuQWRkRmFjZVBpY1BhdGggPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgICAgICBhbmd1bGFyLmZvckVhY2godGhpcy5pbWFnZVRodW1iTGlzdCwgKHZhbDogQ2hlY2tGYWNlKSA9PiB7XHJcbiAgICAgICAgICAgIHJlcV9wYXJhbXMuQWRkUGljVGFza0lkcy5wdXNoKHZhbC5rZXkpO1xyXG4gICAgICAgICAgICByZXFfcGFyYW1zLkFkZEZhY2VQaWNQYXRoLnB1c2godmFsLmltYWdldXJsKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmVxX3BhcmFtcy5EZWxldGVQaWNQYXRoID0gdGhpcy5pbWFnZURlbGV0ZVBhdGhMaXN0O1xyXG5cclxuICAgICAgICBsZXQgcmVxX3BhcmFtc0xpc3QgPSBbXSBhcyBBcnJheTxCdXNpbmVzc1BlcnNvbkV4PjtcclxuICAgICAgICBpZiAodGhpcy5pc1VwZGF0ZSkge1xyXG4gICAgICAgICAgICByZXFfcGFyYW1zTGlzdC5wdXNoKHJlcV9wYXJhbXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh0aGlzLnRvTGliSWRMaXN0LCAodmFsOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBwYXJhbXNJdGVtID0gYW5ndWxhci5jb3B5KHJlcV9wYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zSXRlbS5MaWJJRCA9IHZhbDtcclxuICAgICAgICAgICAgICAgIHJlcV9wYXJhbXNMaXN0LnB1c2gocGFyYW1zSXRlbSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbW1pdFNhdmVPclVwZGF0ZShyZXFfcGFyYW1zTGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tbWl0U2F2ZU9yVXBkYXRlKHBhcmFtczogQXJyYXk8QnVzaW5lc3NQZXJzb25FeD4pIHtcclxuICAgICAgICBjb25zb2xlLmRlYnVnKFwiY29tbWl0U2F2ZU9yVXBkYXRlXCIsIHBhcmFtcyk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNVcGRhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5idXNpbmVzc0xpYlBlcnNvblNlcnZpY2UudXBkYXRlUGVyc29uKHBhcmFtcykudGhlbigocmVzcDogUmVzcG9uc2VSZXN1bHQ8c3RyaW5nPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3AuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlVXBkYXRlTW9kZWwodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVzaW5lc3NMaWJQZXJzb25TZXJ2aWNlLmFkZFBlcnNvbihwYXJhbXMpLnRoZW4oKHJlc3A6IFJlc3BvbnNlUmVzdWx0PHN0cmluZz4pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhcmFtcylcclxuICAgICAgICAgICAgICAgIGlmIChyZXNwLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVVwZGF0ZU1vZGVsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy/pqozor4HlrZfmrrXpmZDliLbvvIzov5Tlm57mj5DnpLror61cclxuICAgIHZhbGlkYXRlUGFyYW1zKG1vZGVsOiBCdXNpbmVzc1BlcnNvbik6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgLy8g6YCJ5oup5Zu+IOabtOaNolxyXG4gICAgaW5pdENvdmVyKCkge1xyXG4gICAgICAgIGxldCBpbWFnZUNvdmVyOiBzdHJpbmcgPSBcIi4uL2ltYWdlcy9iYXNlY29uZmlnL3BlcnNvbi1kZWZhdWx0LnBuZ1wiO1xyXG4gICAgICAgIGlmICh0aGlzLmltYWdlVGh1bWJMaXN0ICYmIHRoaXMuaW1hZ2VUaHVtYkxpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBpbWFnZUNvdmVyID0gdGhpcy5pbWFnZVRodW1iTGlzdFt0aGlzLmltYWdlVGh1bWJMaXN0Lmxlbmd0aCAtIDFdLmltYWdldXJsO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50TW9kZWwgJiYgdGhpcy5jdXJyZW50TW9kZWwuRmFjZVBpY1BhdGggJiYgdGhpcy5jdXJyZW50TW9kZWwuRmFjZVBpY1BhdGgubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBpbWFnZUNvdmVyID0gdGhpcy5jdXJyZW50TW9kZWwuRmFjZVBpY1BhdGhbdGhpcy5jdXJyZW50TW9kZWwuRmFjZVBpY1BhdGgubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmltYWdlQ292ZXIgIT09IGltYWdlQ292ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbWFnZUNvdmVyKTtcclxuICAgICAgICAgICAgICAgIC8vICAgIGNvbnNvbGUuZGVidWcoXCLkvZzkuLrlsIHpnaLnmoTlm77niYd1cmzkuLpcIiwgaW1hZ2VDb3Zlcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlQ292ZXIgPSBpbWFnZUNvdmVyO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKioqKioqKirkuIrkvKDlm77niYfnm7jlhbMqKioqKioqKioqL1xyXG4gICAgaW5pdFdlYlVwbG9hZGVyKCkge1xyXG4gICAgICAgIGxldCBoZWFkZXJEYXRhID0gdGhpcy51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcktleSgpO1xyXG4gICAgICAgIGxldCBmaWxlSW5mbzogYW55ID0ge307XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXBsb2FkZXIgPSB3ZWJVcGxvYWRlci5CYXNlLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAvLyDpgInlrozmlofku7blkI7vvIzmmK/lkKboh6rliqjkuIrkvKDjgIJcclxuICAgICAgICAgICAgICAgIGF1dG86IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzd2Y6IFwiL2xpYnMvd2VidXBsb2FkZXItMC4xLjUvVXBsb2FkZXIuc3dmXCIsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXI6IHRoaXMuYnVzaW5lc3NMaWJQZXJzb25TZXJ2aWNlLmdldENoZWNrRmFjZVVybCgpLFxyXG4gICAgICAgICAgICAgICAgcmVzaXplOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIC8vIOWPquWFgeiuuOmAieaLqeWbvueJh+aWh+S7tuOAglxyXG4gICAgICAgICAgICAgICAgYWNjZXB0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdJbWFnZXMnLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4dGVuc2lvbnM6ICdnaWYsanBnLGpwZWcsYm1wLHBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgbWltZVR5cGVzOiAnaW1hZ2UvanBnLGltYWdlL2pwZWcsaW1hZ2UvcG5nJyAgIC8v5L+u5pS56L+Z6KGMXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgbWltZVR5cGVzOiAnaW1hZ2UvKidcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmb3JtRGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVzdDogXCJMT0NcIiAvLyDkuIrkvKDlm77niYfmnI3liqHlmajluKbnmoTlj4LmlbBcclxuICAgICAgICAgICAgICAgICAgICAvKlRPRE/kuIrkvKDmo4Dmn6XkurrohLjpnIDopoHlj4LmlbAqL1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbW1hbmRUeXBlOkNvbW1hbmRUeXBlLlVwZGF0ZUJpelBlcnNvbi52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvKlRPRE/kuIrkvKDmo4Dmn6XkurrohLjpnIDopoHlj4LmlbAg77yI5Zu65a6a77yJKi9cclxuICAgICAgICAgICAgICAgICAgICBzdG9yZVR5cGU6ICdMT0MnLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlQ2F0ZWdvcnk6IFwiQ2FwdHVyZUltYWdlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZFR5cGU6IFwiVXBkYXRlQml6UGVyc29uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGV0ZWN0VHlwZTogXCJGYWNlXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0aHVtYjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAzMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5Zu+54mH6LSo6YeP77yM5Y+q5pyJdHlwZeS4umBpbWFnZS9qcGVnYOeahOaXtuWAmeaJjeacieaViOOAglxyXG4gICAgICAgICAgICAgICAgICAgIHF1YWxpdHk6IDcwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOaYr+WQpuWFgeiuuOaUvuWkp++8jOWmguaenOaDs+imgeeUn+aIkOWwj+WbvueahOaXtuWAmeS4jeWkseecn++8jOatpOmAiemhueW6lOivpeiuvue9ruS4umZhbHNlLlxyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93TWFnbmlmeTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyDmmK/lkKblhYHorrjoo4HliarjgIJcclxuICAgICAgICAgICAgICAgICAgICBjcm9wOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyDkuLrnqbrnmoTor53liJnkv53nlZnljp/mnInlm77niYfmoLzlvI/jgIJcclxuICAgICAgICAgICAgICAgICAgICAvLyDlkKbliJnlvLrliLbovazmjaLmiJDmjIflrprnmoTnsbvlnovjgIJcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICBjb21wcmVzc1NpemU6IDAsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8g6KGo5Y2VIG5hbeS4gOiHtFxyXG4gICAgICAgICAgICAgICAgZmlsZVZhbDogJ2ltYWdlJyxcclxuICAgICAgICAgICAgICAgIGR1cGxpY2F0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVHbG9iYWxEbmQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlckRhdGEsXHJcbiAgICAgICAgICAgICAgICBjb21wcmVzczogZmFsc2VcclxuICAgICAgICAgICAgICAgIC8vc2VuZEFzQmluYXJ5OiB0cnVlIC8vIOaYr+WQpuWwhuWbvueJh+aMieeFp2JvZHnmnaXlj5HpgIFcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vICBsZXQgZG9tID0gYW5ndWxhci5lbGVtZW50KFwiI1wiICsgdGhpcy5pbWFnZVVwbG9hZElkKTtcclxuICAgICAgICAgICAgLy8g5Yqg5YWlZG9t57uT54K5XHJcbiAgICAgICAgICAgIHRoaXMudXBsb2FkZXIuYWRkQnV0dG9uKHtcclxuICAgICAgICAgICAgICAgIGlkOiBcIiNcIiArIHRoaXMuaW1hZ2VVcGxvYWRJZCxcclxuICAgICAgICAgICAgICAgIGlubmVySFRNTDogdGhpcy5pMThuRmFjdG9yeSgnRkRTXzAxXzA2XzMyJyksXHJcbiAgICAgICAgICAgICAgICAvLyDpmZDliLblpJrpgIlcclxuICAgICAgICAgICAgICAgIG11bHRpcGxlOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy51cGxvYWRlci5vbignYmVmb3JlRmlsZVF1ZXVlZCcsIChmaWxlOiBhbnkpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50b3RhbE51bSA9PT0gdGhpcy5tYXhJbWFnZU51bSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGF5ZXIubXNnKHRoaXMuaTE4bkZhY3RvcnkoJ0ZEU18wMV8wNl82NCcpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZmlsZS5zaXplID4gMTAgKiAxMDI0ICogMTAyNCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGF5ZXIubXNnKHRoaXMuaTE4bkZhY3RvcnkoJ0ZEU18wMV8wNl82NScpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwbG9hZGVyLm9uKFwiZmlsZXNRdWV1ZWRcIiwgKGZpbGVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwbG9hZGVyLm9uKFwiZmlsZURlcXVldWVkXCIsIChmaWxlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmlsZURlcXVldWVkXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudXBsb2FkZXIub24oXCJ1cGxvYWRQcm9ncmVzc1wiLCAoZmlsZTogYW55LCBwZXJjZW50YWdlOiBudW1iZXIpID0+IHtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cGxvYWRlci5vbihcInVwbG9hZFN1Y2Nlc3NcIiwgKGZpbGU6IGFueSwgcmVzcG9uc2U6IFJlc3BvbnNlUmVzdWx0PENoZWNrRmFjZT4sIGVlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3VjY2Vzc189PT09PT09PT09PT09PT09XCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZmlsZSk7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnVwbG9hZGVyLm9wdGlvbi5mb3JtRGF0YS5pbWFnZSA9IGZpbGU7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy51cGxvYWRlci5tYWtlVGh1bWIoZmlsZSwgKGVycjogYW55LCBzcmM6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWZ0ZXJTdWNjZXNzVXBsb2FkKGZpbGUsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudXBsb2FkZXIub24oXCJ1cGxvYWRFcnJvclwiLCAoZmlsZTogYW55LCByZWFzb246IGFueSwgcmVhc29uMTogYW55LCByZWFzb24yOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCJ1cGxvYWRFcnJvclwiLCBmaWxlLCByZWFzb24sIHJlYXNvbjEsIHJlYXNvbjIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZnRlckVycm9yVXBsb2FkKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cGxvYWRlci5vbihcInVwbG9hZEFjY2VwdFwiLCAob2JqZWN0OiBPYmplY3QsIHJldDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhvYmplY3QsIHJldCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cGxvYWRlci5vbihcInVwbG9hZEZpbmlzaGVkXCIsIChmaWxlOiBhbnksIHJlc3A6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1cGxvYWRGaW5pc2hlZFwiKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnVwbG9hZGVyLm9uKFwiZXJyb3JcIiwgZnVuY3Rpb24gKHR5cGU6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gXCJRX1RZUEVfREVOSUVEXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFmdGVyRXJyb3JVcGxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSBcIkZfRVhDRUVEX1NJWkVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGF5ZXIubXNnKHRoaXMuaTE4bkZhY3RvcnkoJ0ZEU18wMV8wNl82NScpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjYWNoZVRodW1iKGZpbGU6IENoZWNrRmFjZSkge1xyXG4gICAgICAgIHRoaXMuaW1hZ2VUaHVtYkxpc3QucHVzaChmaWxlKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVG90YWxOdW0oKTtcclxuICAgICAgICB0aGlzLmluaXRDb3ZlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVRodW1iKGZpbGU6IENoZWNrRmFjZSkge1xyXG4gICAgICAgIGxldCBmaWxlS2V5ID0gZmlsZS5rZXksXHJcbiAgICAgICAgICAgIGltYWdlVGh1bWJMaXN0ID0gdGhpcy5pbWFnZVRodW1iTGlzdCxcclxuICAgICAgICAgICAgaSwgbGVuLCB0ZW1wO1xyXG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGltYWdlVGh1bWJMaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRlbXAgPSBpbWFnZVRodW1iTGlzdFtpXTtcclxuICAgICAgICAgICAgaWYgKHRlbXAua2V5ID09PSBmaWxlS2V5KSB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZVRodW1iTGlzdC5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgICBsZW4tLTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVmcmVzaFRvdGFsTnVtKCk7XHJcbiAgICAgICAgdGhpcy5pbml0Q292ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoVG90YWxOdW0oKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IDA7XHJcbiAgICAgICAgcmVzdWx0ICs9IHRoaXMuaW1hZ2VUaHVtYkxpc3QubGVuZ3RoO1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRNb2RlbCAmJiB0aGlzLmN1cnJlbnRNb2RlbC5GYWNlUGljUGF0aCkge1xyXG4gICAgICAgICAgICByZXN1bHQgKz0gdGhpcy5jdXJyZW50TW9kZWwuRmFjZVBpY1BhdGgubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy50b3RhbE51bSA9IHJlc3VsdDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhZnRlckVycm9yVXBsb2FkKCkge1xyXG4gICAgICAgIHRoaXMubGF5ZXIubXNnKHRoaXMuaTE4bkZhY3RvcnkoJ0ZEU18wMV8xNl8yOScpKTtcclxuICAgIH07XHJcbiAgICAvL+S4iuS8oOWbvueJh+aIkOWKn+WQjiDlm77niYfnu5Pmnpwg5aSE55CGXHJcbiAgICBhZnRlclN1Y2Nlc3NVcGxvYWQoZmlsZTogYW55LCByZXNwb25zZTogUmVzcG9uc2VSZXN1bHQ8Q2hlY2tGYWNlPikge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5jb2RlID09PSAyMDAgJiYgISFyZXNwb25zZS5kYXRhKSB7XHJcbiAgICAgICAgICAgIC8v5LiA5Liq5Lq66IS45pWw5o2uXHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVUaHVtYihyZXNwb25zZS5kYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLmNvZGUgPT09IDQwMjMgJiYgISFyZXNwb25zZS5kYXRhKSB7XHJcbiAgICAgICAgICAgIC8v5aSaXHJcbiAgICAgICAgICAgIHRoaXMub3BlbkZhY2VzU2VsZWN0KHJlc3BvbnNlLmRhdGEsIGZpbGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8v5pegXHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIubXNnKHRoaXMuaTE4bkZhY3RvcnkoJ0ZEU18wMV8wNl81NicpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy8g5omT5byAIOWkmuS6uuiEuCDkurrohLjpgInmi6lcclxuICAgIG9wZW5GYWNlc1NlbGVjdChyZXNwOiBDaGVja0ZhY2UsIGZpbGU6IGFueSkge1xyXG4gICAgICAgIC8v5aSa5Liq5Lq66IS45aSE55CGXHJcbiAgICAgICAgLy8g6L+Z6YeM5a+5c2NvcGXov5vooYzkuIDmrKHmlrDlu7pcclxuICAgICAgICBsZXQgc2NvcGUgPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUuZmlsZSA9IGZpbGU7XHJcbiAgICAgICAgc2NvcGUuZGF0YSA9IHJlc3A7XHJcbiAgICAgICAgc2NvcGUuY29tbWFuZFR5cGUgPSBDb21tYW5kVHlwZS5VcGRhdGVCaXpQZXJzb247XHJcbiAgICAgICAgc2NvcGUuZGV0ZWN0VHlwZSA9ICdGYWNlJztcclxuICAgICAgICBzY29wZS5mcm9tU2VsZWN0RmFjZUN0cmwgPSB0aGlzLmZhY2VzU2VsZWN0TGF5ZXJFbWl0O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHNjb3BlKTtcclxuICAgICAgICB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBjb250ZW50OiBzZWxlY3RGYWNlUG9wdXBIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIHNraW46IFwibm8tc2Nyb2xsXCIsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLmkxOG5GYWN0b3J5KCfkurrohLjpgInlj5YnKSxcclxuICAgICAgICAgICAgYXJlYTogW1wiYXV0b1wiLCBcImF1dG9cIl0sXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogKGxheWVybzogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZmFjZXNTZWxlY3RMYXllckluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXRjaEZhY2VzU2VsZWN0TGF5ZXJDbG9zZWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhY2VzU2VsZWN0TGF5ZXJJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8vIOaJk+W8gOWFs+mXreebkeaOp1xyXG4gICAgd2F0Y2hGYWNlc1NlbGVjdExheWVyQ2xvc2VkKCkge1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbih0aGlzLmZhY2VzU2VsZWN0TGF5ZXJFbWl0LCAoZXZlbjogRXZlbnQsIGRhdGE6IFJlc3BvbnNlUmVzdWx0PENoZWNrRmFjZT4pID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVUaHVtYihkYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKHRoaXMuZmFjZXNTZWxlY3RMYXllckluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5by55qGG5bGV56S657yp55Wl5Zu+XHJcbiAgICAgKi9cclxuICAgIHNob3dJbWFnZVRodW1icygpIHtcclxuICAgICAgICBsZXQgc2NvcGUgPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgLy8g5bCGaW1hZ2VUaHVtYkNhY2hlTGlzdOWSjGZhY2VQYXRoTGlzdOaVtOWQiOaIkOS4gOS4qkFycmF5XHJcbiAgICAgICAgbGV0IHRlbXBGYWNlUGljUGF0aCA9IFtdIGFzIEFycmF5PENoZWNrRmFjZT47XHJcblxyXG4gICAgICAgIGxldCBmYWNlUGljUGF0aExpc3QgPSAodGhpcy5jdXJyZW50TW9kZWwgfHwge30gYXMgQnVzaW5lc3NQZXJzb25FeCkuRmFjZVBpY1BhdGg7XHJcblxyXG4gICAgICAgIGlmIChmYWNlUGljUGF0aExpc3QgJiYgZmFjZVBpY1BhdGhMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGZhY2VQaWNQYXRoTGlzdCwgKHBhdGg6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9sZENoZWNrRmFjZTogQ2hlY2tGYWNlID0ge30gYXMgQ2hlY2tGYWNlO1xyXG4gICAgICAgICAgICAgICAgb2xkQ2hlY2tGYWNlLmltYWdldXJsID0gcGF0aDtcclxuICAgICAgICAgICAgICAgIG9sZENoZWNrRmFjZS5lZmZpY2FjeVRpbWUgPSAtMTtcclxuICAgICAgICAgICAgICAgIHRlbXBGYWNlUGljUGF0aC5wdXNoKG9sZENoZWNrRmFjZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2NvcGUuaW1hZ2VUaHVtYkxpc3QgPSB0aGlzLmltYWdlVGh1bWJMaXN0LmNvbmNhdCh0ZW1wRmFjZVBpY1BhdGgpO1xyXG4gICAgICAgIHNjb3BlLmZhY2VzV2F0Y2hMYXllckVtaXQgPSB0aGlzLmZhY2VzV2F0Y2hMYXllckVtaXQ7XHJcblxyXG4gICAgICAgIGxldCB0aXRsZVN0ciA9IHRoaXMuaTE4bkZhY3RvcnkoJ0ZEU18wMV8wNl82MycpO1xyXG4gICAgICAgIHRoaXMuZmFjZXNXYXRjaExheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBjb250ZW50OiBmYWNlTGliUGVyc29uVXBkYXRlSW1hZ2VUaHVtYkh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlU3RyLFxyXG4gICAgICAgICAgICBhcmVhOiBbXCI2OTBweFwiLCBcIjYwMHB4XCJdLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKioqKioqKioq5LiK5Lyg5Zu+54mH55u45YWzIOe7k+adnyoqKioqKioqKiovXHJcbiAgICBjbG9zZVVwZGF0ZU1vZGVsKGlzQ29tbWl0OiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoXCJmcm9tVXBkYXRlRmFjZUxpYlBlcnNvbk1vZGFsLmNsb3NlZFwiLCB7IGlzQ29tbWl0OiBpc0NvbW1pdCB9KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgSW1hZ2VVcGxvYWRUaHVtYkNvbnRyb2xsZXIge1xyXG5cclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wiJHNjb3BlXCJdO1xyXG4gICAgaW1hZ2VUaHVtYkxpc3Q6IEFycmF5PENoZWNrRmFjZT47XHJcbiAgICBmYWNlc1dhdGNoTGF5ZXJFbWl0OiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55KSB7XHJcbiAgICAgICAgLy8ge2ltYWdlVGh1bWJMaXN0OkFycmF5PENoZWNrRmFjZT4sZmFjZXNXYXRjaExheWVyRW1pdDpzdHJpbmd9XHJcbiAgICAgICAgdGhpcy5pbWFnZVRodW1iTGlzdCA9ICRzY29wZS5pbWFnZVRodW1iTGlzdDtcclxuICAgICAgICB0aGlzLmZhY2VzV2F0Y2hMYXllckVtaXQgPSAkc2NvcGUuZmFjZXNXYXRjaExheWVyRW1pdDtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVJbWFnZShmaWxlOiBDaGVja0ZhY2UpIHtcclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCh0aGlzLmZhY2VzV2F0Y2hMYXllckVtaXQsIGZpbGUpO1xyXG4gICAgICAgIC8vIOenu+mZpOiHqui6q1xyXG4gICAgICAgIGxldCBpLCBsZW4sIHRlbXA7XHJcbiAgICAgICAgZm9yIChpID0gMCwgbGVuID0gdGhpcy5pbWFnZVRodW1iTGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICB0ZW1wID0gdGhpcy5pbWFnZVRodW1iTGlzdFtpXTtcclxuICAgICAgICAgICAgaWYgKGZpbGUuaW1hZ2V1cmwgPT09IHRlbXAuaW1hZ2V1cmwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VUaHVtYkxpc3Quc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgICAgbGVuLS07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xvc2VNb2RhbCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQodGhpcy5mYWNlc1dhdGNoTGF5ZXJFbWl0LCBudWxsKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qY2xhc3MgRmFjZUxpYlBlcnNvblNyY0ZpbHRlcntcclxuICAgIHN0YXRpYyBpbnN0YW5jZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGZpbGU6IENoZWNrRmFjZSl7XHJcbiAgICAgICAgICAgIGlmKGZpbGUuaW1hZ2V1cmwpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiL2JpbWdfY29udGVudC9cIitmaWxlLmltYWdldXJsO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIi9iaW1nX2NvbnRlbnQvXCIgKyBmaWxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmFwcC5maWx0ZXIoXCJmYWNlTGliUGVyc29uU3JjRmlsdGVyXCIsIEZhY2VMaWJQZXJzb25TcmNGaWx0ZXIuaW5zdGFuY2UpOyovXHJcbmFwcC5jb250cm9sbGVyKCdmYWNlTGliUGVyc29uVXBkYXRlTW9kYWxDb250cm9sbGVyJywgRmFjZUxpYlBlcnNvblVwZGF0ZU1vZGFsQ29udHJvbGxlcik7XHJcbmFwcC5jb250cm9sbGVyKFwiaW1hZ2VVcGxvYWRUaHVtYkNvbnRyb2xsZXJcIiwgSW1hZ2VVcGxvYWRUaHVtYkNvbnRyb2xsZXIpOyJdfQ==
