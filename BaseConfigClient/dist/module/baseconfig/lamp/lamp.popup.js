define(["require", "exports", "../../common/app/main.app", "../../../core/entity/ex/LampEx", "../../common/directive/tree/tree-params", "../../../core/enum/TreeType", "../../common/app/main.app", "../../common/services/lamp.service", "../../common/services/camera.service", "../../common/services/rmpgate.service", "../../common/directive/tree/tree.directive.service", "./lamp.store.service", "../../common/services/connectTree.service", "webUploader", "css!../../../libs/webuploader-0.1.5/webuploader.css", "es6-promise"], function (require, exports, main_app_1, LampEx_1, tree_params_1, TreeType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WebUploader = require("webUploader");
    var Promise = require("es6-promise");
    var DeviceType = {
        Camera: "Camera",
        Wifi: "Wifi",
        ElectronicFence: "ElectronicFence",
        RmpGate: "RmpGate"
    };
    var AlarmTypesData = {
        CameraTreeId: { key: 'CameraTreeId', text: '摄像机' },
        WifiTreeId: { key: 'WifiTreeId', text: 'WIFI' },
        ElectronicFenceTreeId: { key: 'ElectronicFenceTreeId', text: 'WIFI' },
        RmpGateTreeId: { key: 'RmpGateTreeId', text: 'WIFI' }
    };
    var LampPopupController = (function () {
        function LampPopupController($scope, $rootScope, areaService, lampService, $q, $timeout, cameraService, treeService, taskStoreService, connectTreeService) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.areaService = areaService;
            this.lampService = lampService;
            this.$q = $q;
            this.$timeout = $timeout;
            this.cameraService = cameraService;
            this.treeService = treeService;
            this.taskStoreService = taskStoreService;
            this.connectTreeService = connectTreeService;
            this.CameraTreeIdForLamp = "CameraTreeIdForLamp";
            this.WifiTreeIdForLamp = "WifiTreeIdForLamp";
            this.ElectronicFenceTreeIdForLamp = "ElectronicFenceTreeIdForLamp";
            this.RmpGateTreeIdForLamp = "RmpGateTreeIdForLamp";
            this.CameraSelectedListForLamp = [];
            this.WifiSelectedListForLamp = [];
            this.RmpGateSelectedListForLamp = [];
            this.ElectronicFenceSelectedListForLamp = [];
            this.AlarmTypes = AlarmTypesData;
            this.DeviceType = DeviceType;
            this.CurrentDevice = "Camera";
            this.DeviceRelation = [];
            this.deleteDeviceIds = [];
            this.defaultCheckTreeByIds = function (treeType, treeId, ids, key) {
                var paramName = "ID";
                if (ids.length > 0) {
                    var checkParamsList_1 = [];
                    angular.forEach(ids, function (val) {
                        checkParamsList_1.push({ key: paramName, value: val });
                    });
                    if (_this.treeService.checkNodesByParamsList(treeId, checkParamsList_1, true)) {
                        switch (key) {
                            case _this.AlarmTypes.CameraTreeId.key:
                                _this.CameraSelectedListForLamp = _this.getCheckedList(treeType, treeId);
                                break;
                            case _this.AlarmTypes.WifiTreeId.key:
                                _this.WifiSelectedListForLamp = _this.getCheckedList(treeType, treeId);
                                break;
                            case _this.AlarmTypes.RmpGateTreeId.key:
                                _this.RmpGateSelectedListForLamp = _this.getCheckedList(treeType, treeId);
                                break;
                            case _this.AlarmTypes.ElectronicFenceTreeId.key:
                                _this.ElectronicFenceSelectedListForLamp = _this.getCheckedList(treeType, treeId);
                                break;
                            default:
                                return;
                        }
                    }
                }
                else {
                    switch (key) {
                        case _this.AlarmTypes.CameraTreeId.key:
                            _this.CameraSelectedListForLamp = [];
                            break;
                        case _this.AlarmTypes.WifiTreeId.key:
                            _this.WifiSelectedListForLamp = [];
                            break;
                        case _this.AlarmTypes.RmpGateTreeId.key:
                            _this.RmpGateSelectedListForLamp = [];
                            break;
                        case _this.AlarmTypes.ElectronicFenceTreeId.key:
                            _this.ElectronicFenceSelectedListForLamp = [];
                            break;
                        default:
                            return;
                    }
                }
            };
            this.isShowCameraTree = false;
            this.isNgShowStepBase = true;
            this.isNgShowStepDevice = false;
            this.Area = {};
            var vm = this;
            $scope.$on("$destroy", function () {
                vm.taskStoreService.clearCache();
                console.error("销毁了弹出框");
            });
            vm.tabList = [
                { value: 'Camera', text: '摄像机' },
                { value: 'Wifi', text: 'WIFI' },
                { value: 'RmpGate', text: '卡口' },
                { value: 'ElectronicFence', text: '电围' }
            ];
            vm.curdType = $scope.curdType;
            vm.Lamp = new LampEx_1.LampEx();
            console.log('立杆树++++++++++++++++');
            console.log(vm.Lamp);
            vm.treeParams = new tree_params_1.TreeDataParams();
            vm.treeParams.treeId = "lampPopupAreaTree";
            vm.treeParams.isDefaultSelected = true;
            vm.treeParams.onClick = treeSelectNode;
            vm.toggleStep = this.toggleStep;
            if (vm.curdType === 'add' && $scope.currentArea) {
                this.taskStoreService.clearCache();
                vm.Lamp.ParentArea = {};
                vm.Lamp.ParentArea.ID = $scope.currentArea.ID;
                vm.Lamp.ParentArea.Name = $scope.currentArea.Name;
                vm.ImgUrl = '../../../images/common/default-image.png';
                vm.submit = this.saveLamp;
                $timeout(function () {
                    vm.treeParams.treeDatas = $scope.treeDatas;
                    vm.treeParams.defaultSelectTreeId = $scope.currentArea.ID;
                });
            }
            else if (vm.curdType === 'edit' && $scope.currentLamp) {
                vm.submit = this.editLamp;
                vm.Lamp = $scope.currentLamp;
                vm.selectedNode = $scope.cacheCameraData;
                vm.ImgUrl = vm.Lamp.ImgUrl ? vm.Lamp.ImgUrl : '../../../images/common/default-image.png';
                console.log('图片数据++++++++++++++++++');
                console.log(vm.ImgUrl);
                this.getAllLampAboutDevice = $scope.getAllLampAboutDevice;
                this.getAllLampRalation($scope.getAllLampAboutDevice);
                $timeout(function () {
                    vm.treeParams.treeDatas = $scope.treeDatas;
                    if ($scope.currentArea.ID) {
                        vm.treeParams.defaultSelectTreeId = $scope.currentArea.ID;
                    }
                    else {
                        vm.isRootLamp = true;
                        vm.isShowCameraTree = true;
                    }
                });
            }
            vm.$timeout(function () {
                vm.upLoadAction = WebUploader.Base.create({
                    auto: true,
                    server: '../db/upload/image',
                    resize: false,
                    pick: { id: '#filePicker' },
                    accept: {
                        title: 'Images',
                        extensions: 'gif,jpg,jpeg,bmp,png',
                        mimeTypes: 'image/jpg,image/jpeg,image/png'
                    },
                    formData: {
                        storeType: 'LOC',
                        imageCategory: 'CaptureImage'
                    },
                    fileVal: 'image',
                    method: 'POST',
                    compress: {
                        width: 500,
                        height: 500
                    },
                    fileNumLimit: 300,
                    fileSizeLimit: 2 * 1024 * 1024,
                    fileSingleSizeLimit: 1 * 1024 * 1024
                });
                console.log(vm.upLoadAction);
                vm.upLoadAction.onUploadBeforeSend = function (file) {
                    _this.upLoadAction.options.formData = { image: file };
                };
                vm.upLoadAction.onUploadProgress = function (percentage) {
                };
                vm.upLoadAction.onUploadSuccess = function (file, res) {
                    if (res.code == 200 && res.data) {
                        console.log(res.data);
                        _this.Lamp.ImgUrl = res.data;
                        $('#preview').attr('src', _this.Lamp.ImgUrl);
                    }
                };
                _this.upLoadAction.onUploadError = function (file) {
                    console.error('上传失败');
                };
            });
            this.initLampTreeParamsForCamera();
            this.initLampTreeParamsForWifi();
            this.initLampTreeParamsForRmpGate();
            this.initLampTreeParamsForElectronicFence();
            this.initModalData();
            function treeSelectNode(event, treeId, treeNode) {
                $timeout(function () {
                    if (vm.Lamp.AreaID && vm.Lamp.StrJsonUserData && vm.curdType === 'edit') {
                        if (event && event.type === 'click') {
                            vm.Lamp.ParentArea = treeNode;
                        }
                        else {
                            var parentNode = JSON.parse(vm.Lamp.StrJsonUserData);
                            vm.Lamp.ParentArea = parentNode.Area;
                        }
                    }
                    else {
                        vm.Lamp.ParentArea = treeNode;
                    }
                    vm.isShowAreaTree = false;
                });
            }
        }
        LampPopupController.prototype.getAllLampRalation = function (relation) {
            var allRel = relation;
            var ext = {
                Camera: [],
                RmpGate: [],
                WIFI: [],
                ElectronicFence: []
            };
            if (allRel && allRel.length) {
                console.log(allRel, '=======================allRel');
                allRel.forEach(function (rel) {
                    if (rel.Type == "Camera") {
                        ext.Camera.push(rel.RelatedObjectId);
                    }
                    else if (rel.Type == "Wifi") {
                        ext.WIFI.push(rel.RelatedObjectId);
                    }
                    else if (rel.Type == "RmpGate") {
                        ext.RmpGate.push(rel.RelatedObjectId);
                    }
                    else if (rel.Type == "ElectronicFence") {
                        ext.ElectronicFence.push(rel.RelatedObjectId);
                    }
                });
                this.deleteDeviceIds = [].concat(ext.Camera, ext.WIFI, ext.RmpGate, ext.ElectronicFence);
                this.lampExt = ext;
                console.log(ext, '======================ext');
                this.taskStoreService.updateSelectCameraList(ext.Camera);
                this.taskStoreService.updateSelectWifiList(ext.WIFI);
                this.taskStoreService.updateSelectRmpGateList(ext.RmpGate);
                this.taskStoreService.updateSelectElectronicFenceList(ext.ElectronicFence);
            }
        };
        LampPopupController.prototype.getSelectIds = function (treeId) {
            var treeNodes = this.treeService.getCheckedNodes(treeId, true);
            var ids = [];
            treeNodes.forEach(function (item) {
                ids.push(item.ID);
            });
            return ids;
        };
        LampPopupController.prototype.allSelectList = function () {
            var ext = {
                Camera: this.getSelectIds(this.CameraTreeIdForLamp),
                Wifi: this.getSelectIds(this.WifiTreeIdForLamp),
                RmpGate: this.getSelectIds(this.RmpGateTreeIdForLamp),
                ElectronicFence: this.getSelectIds(this.ElectronicFenceTreeIdForLamp)
            };
            return ext;
        };
        LampPopupController.prototype.lampConstructor = function () {
            var newLamp = {
                'Code': this.Lamp.Code,
                'Name': this.Lamp.Name,
                'AreaID': this.Lamp.ParentArea.ID,
                'OrgunitID': this.Lamp.OrgunitID,
                'Address': this.Lamp.Address,
                'Description': this.Lamp.Description,
                'Ext': JSON.stringify(this.allSelectList()),
                'ImgUrl': this.Lamp.ImgUrl,
                'DeviceName': this.Lamp.DeviceName
            };
            if (this.curdType === 'edit') {
                newLamp.ID = this.Lamp.ID;
            }
            return newLamp;
        };
        LampPopupController.prototype.saveLamp = function () {
            var that = this;
            var newLamp = that.lampConstructor();
            console.log(newLamp);
            that.lampService.save(newLamp).then(complete);
            function complete(res) {
                console.log(res);
                if (res.data || res.code === 200) {
                    that.cancel(true);
                    return null;
                }
                else {
                    return that.$q.reject(res.code);
                }
            }
        };
        LampPopupController.prototype.editLamp = function () {
            var that = this;
            if (!that.validate())
                return;
            var newLamp = this.lampConstructor();
            that.lampService.edit(newLamp).then(complete);
            function complete(res) {
                if (res.code === 200) {
                    that.cancel(true);
                    return null;
                }
                else {
                    return that.$q.reject(res.code);
                }
            }
        };
        LampPopupController.prototype.toggleStep = function (text) {
            if (text == "isNgShowStepBase") {
                this.isNgShowStepBase = true;
                this.isNgShowStepDevice = false;
            }
            else {
                this.isNgShowStepBase = false;
                this.isNgShowStepDevice = true;
            }
        };
        LampPopupController.prototype.validate = function () {
            var result = true;
            if (!this.Lamp.Code) {
                result = false;
            }
            else if (!this.Lamp.Name) {
                result = false;
            }
            return result;
        };
        LampPopupController.prototype.cancel = function (flag) {
            this.deleteDeviceIds = [];
            this.$rootScope.$broadcast('lamp.closePopup', flag);
            this.taskStoreService.clearCache();
        };
        LampPopupController.prototype.onChangeSearch = function (treeId, searchStr, paramsName) {
            var _this = this;
            if (!treeId) {
                return;
            }
            if (!paramsName) {
                paramsName = "Name";
            }
            this.$timeout(function () {
                _this.treeService.filterShowNodes(treeId, paramsName, searchStr);
            });
        };
        LampPopupController.prototype.initModalData = function () {
            var _this = this;
            this.getAreaAndCamera().then(function (res) {
                _this.CameraOnTheLamp.treeDatas = res;
                if (res) {
                    _this.taskStoreService.updateCameraTreeWithArea(res);
                }
            });
            this.getAreaAndWifi().then(function (res) {
                _this.WifiOnTheLamp.treeDatas = res;
                if (res) {
                    _this.taskStoreService.updateWifiTreeWithArea(res);
                }
            });
            this.getAreaAndRmpGate().then(function (res) {
                _this.RmpGateOnTheLamp.treeDatas = res;
                if (res) {
                    _this.taskStoreService.updateRmpGateTreeWithArea(res);
                }
            });
            this.getAreaAndElectronicFence().then(function (res) {
                _this.ElectronicFenceOnTheLamp.treeDatas = res;
                if (res) {
                    _this.taskStoreService.updateElectronicFenceTreeWithArea(res);
                }
            });
            var cameraTreeDatas = this.taskStoreService.getTreeWithArea;
            var wifiTreeDatas = this.taskStoreService.getTreeWithWifi;
            var rmpgateTreeDatas = this.taskStoreService.getTreeWithRmpGate;
            var electronicfenceTreeDatas = this.taskStoreService.getTreeWithElectronicFence;
            if (cameraTreeDatas || wifiTreeDatas || rmpgateTreeDatas || electronicfenceTreeDatas) {
                this.CameraOnTheLamp.treeDatas = cameraTreeDatas;
                this.WifiOnTheLamp.treeDatas = wifiTreeDatas;
                this.RmpGateOnTheLamp.treeDatas = rmpgateTreeDatas;
                this.ElectronicFenceOnTheLamp.treeDatas = electronicfenceTreeDatas;
            }
        };
        ;
        LampPopupController.prototype.initLampTreeParamsForElectronicFence = function () {
            var _this = this;
            this.ElectronicFenceOnTheLamp = new tree_params_1.TreeDataParams(true);
            this.ElectronicFenceOnTheLamp.treeId = this.ElectronicFenceTreeIdForLamp;
            this.ElectronicFenceOnTheLamp.isShowIcon = true;
            this.ElectronicFenceOnTheLamp.isShowLine = false;
            this.ElectronicFenceOnTheLamp.checkEnable = true;
            this.ElectronicFenceOnTheLamp.isSingleSelect = false;
            this.ElectronicFenceOnTheLamp.isSimpleData = true;
            this.ElectronicFenceOnTheLamp.onCheck = function (event, treeId, treeNode) {
                _this.$timeout(function () {
                    _this.ElectronicFenceSelectedListForLamp = _this.getCheckedList(TreeType_1.TreeType.ElectronicFence.value, treeId);
                    var resultIdList = [];
                    angular.forEach(_this.ElectronicFenceSelectedListForLamp, function (val) {
                        resultIdList.push(val.ID);
                    });
                    _this.taskStoreService.updateSelectElectronicFenceList(resultIdList);
                });
            };
            this.ElectronicFenceOnTheLamp.addDiyDom = function (treeId, treeNode) {
                _this.treeService.addDiyDomIsConfiStatus(treeId, treeNode);
            };
            this.ElectronicFenceOnTheLamp.treeInitComplete = function (treeId) {
                var checkedIdList = _this.getSelectedIdList(_this.AlarmTypes.ElectronicFenceTreeId.key);
                if (checkedIdList.length > 0) {
                    console.log("初始化电围树----------------");
                    console.log(TreeType_1.TreeType.ElectronicFence.value);
                    console.log(_this.ElectronicFenceTreeIdForLamp);
                    console.log(checkedIdList);
                    console.log(_this.AlarmTypes.ElectronicFenceTreeId.key);
                    _this.defaultCheckTreeByIds(TreeType_1.TreeType.ElectronicFence.value, _this.ElectronicFenceTreeIdForLamp, checkedIdList, _this.AlarmTypes.ElectronicFenceTreeId.key);
                }
            };
        };
        LampPopupController.prototype.initLampTreeParamsForRmpGate = function () {
            var _this = this;
            this.RmpGateOnTheLamp = new tree_params_1.TreeDataParams(true);
            this.RmpGateOnTheLamp.treeId = this.RmpGateTreeIdForLamp;
            this.RmpGateOnTheLamp.isShowIcon = true;
            this.RmpGateOnTheLamp.isShowLine = false;
            this.RmpGateOnTheLamp.checkEnable = true;
            this.RmpGateOnTheLamp.isSingleSelect = false;
            this.RmpGateOnTheLamp.isSimpleData = true;
            this.RmpGateOnTheLamp.onCheck = function (event, treeId, treeNode) {
                _this.$timeout(function () {
                    _this.RmpGateSelectedListForLamp = _this.getCheckedList(TreeType_1.TreeType.rmpGate.value, treeId);
                    var resultIdList = [];
                    angular.forEach(_this.RmpGateSelectedListForLamp, function (val) {
                        resultIdList.push(val.ID);
                    });
                    _this.taskStoreService.updateSelectRmpGateList(resultIdList);
                });
            };
            this.RmpGateOnTheLamp.addDiyDom = function (treeId, treeNode) {
                _this.treeService.addDiyDomIsConfiStatus(treeId, treeNode);
            };
            this.RmpGateOnTheLamp.treeInitComplete = function (treeId) {
                var checkedIdList = _this.getSelectedIdList(_this.AlarmTypes.RmpGateTreeId.key);
                if (checkedIdList.length > 0) {
                    _this.defaultCheckTreeByIds(TreeType_1.TreeType.rmpGate.value, _this.RmpGateTreeIdForLamp, checkedIdList, _this.AlarmTypes.RmpGateTreeId.key);
                }
            };
        };
        LampPopupController.prototype.initLampTreeParamsForWifi = function () {
            var _this = this;
            this.WifiOnTheLamp = new tree_params_1.TreeDataParams(true);
            this.WifiOnTheLamp.treeId = this.WifiTreeIdForLamp;
            this.WifiOnTheLamp.isShowIcon = true;
            this.WifiOnTheLamp.isShowLine = false;
            this.WifiOnTheLamp.checkEnable = true;
            this.WifiOnTheLamp.isSingleSelect = false;
            this.WifiOnTheLamp.isSimpleData = true;
            this.WifiOnTheLamp.onCheck = function (event, treeId, treeNode) {
                _this.$timeout(function () {
                    _this.WifiSelectedListForLamp = _this.getCheckedList(TreeType_1.TreeType.wifi.value, treeId);
                    var resultIdList = [];
                    angular.forEach(_this.WifiSelectedListForLamp, function (val) {
                        resultIdList.push(val.ID);
                    });
                    _this.taskStoreService.updateSelectWifiList(resultIdList);
                });
            };
            this.WifiOnTheLamp.addDiyDom = function (treeId, treeNode) {
                _this.treeService.addDiyDomIsConfiStatus(treeId, treeNode);
            };
            this.WifiOnTheLamp.treeInitComplete = function (treeId) {
                var checkedIdList = _this.getSelectedIdList(_this.AlarmTypes.WifiTreeId.key);
                if (checkedIdList.length > 0) {
                    _this.defaultCheckTreeByIds(TreeType_1.TreeType.wifi.value, _this.WifiTreeIdForLamp, checkedIdList, _this.AlarmTypes.WifiTreeId.key);
                }
            };
        };
        LampPopupController.prototype.initLampTreeParamsForCamera = function () {
            var _this = this;
            this.CameraOnTheLamp = new tree_params_1.TreeDataParams(true);
            this.CameraOnTheLamp.treeId = this.CameraTreeIdForLamp;
            this.CameraOnTheLamp.isShowIcon = true;
            this.CameraOnTheLamp.isShowLine = false;
            this.CameraOnTheLamp.checkEnable = true;
            this.CameraOnTheLamp.isSingleSelect = false;
            this.CameraOnTheLamp.isSimpleData = true;
            this.CameraOnTheLamp.onCheck = function (event, treeId, treeNode) {
                _this.$timeout(function () {
                    _this.CameraSelectedListForLamp = _this.getCheckedList(TreeType_1.TreeType.camera.value, treeId);
                    console.log(_this.CameraSelectedListForLamp);
                    var resultIdList = [];
                    angular.forEach(_this.CameraSelectedListForLamp, function (val) {
                        resultIdList.push(val.ID);
                    });
                    _this.taskStoreService.updateSelectCameraList(resultIdList);
                });
            };
            this.CameraOnTheLamp.addDiyDom = function (treeId, treeNode) {
                _this.treeService.addDiyDomIsConfiStatus(treeId, treeNode);
            };
            this.CameraOnTheLamp.treeInitComplete = function (treeId) {
                var checkedIdList = _this.getSelectedIdList(_this.AlarmTypes.CameraTreeId.key);
                if (checkedIdList.length > 0) {
                    _this.defaultCheckTreeByIds(TreeType_1.TreeType.camera.value, _this.CameraTreeIdForLamp, checkedIdList, _this.AlarmTypes.CameraTreeId.key);
                }
            };
        };
        ;
        LampPopupController.prototype.getAreaAndCamera = function () {
            return this.connectTreeService.findAreaCamera().then(function (res) {
                return res;
            });
        };
        LampPopupController.prototype.getAreaAndWifi = function () {
            return this.connectTreeService.findAreaWithWifi().then(function (res) {
                return res;
            });
        };
        LampPopupController.prototype.getAreaAndRmpGate = function () {
            return this.connectTreeService.findAreaWithRmpgate().then(function (res) {
                return res;
            });
        };
        LampPopupController.prototype.getAreaAndElectronicFence = function () {
            return this.connectTreeService.findAreaWithElectronicfence().then(function (res) {
                return res;
            });
        };
        LampPopupController.prototype.toggleCamera = function (arg) {
            switch (arg) {
                case "Camera":
                    this.CurrentDevice = this.DeviceType.Camera;
                    break;
                case "Wifi":
                    this.CurrentDevice = this.DeviceType.Wifi;
                    break;
                case "RmpGate":
                    this.CurrentDevice = this.DeviceType.RmpGate;
                    break;
                case "ElectronicFence":
                    this.CurrentDevice = this.DeviceType.ElectronicFence;
                    break;
            }
        };
        LampPopupController.prototype.getCheckedList = function (treeType, treeId) {
            var treeCheckedNodes = this.treeService.getCheckedNodes(treeId, true);
            var result = [];
            if (treeCheckedNodes) {
                angular.forEach(treeCheckedNodes, function (val) {
                    if (val.treeType === treeType) {
                        result.push(val);
                    }
                });
            }
            return result;
        };
        LampPopupController.prototype.getSelectedIdList = function (key) {
            var result = [];
            switch (key) {
                case this.AlarmTypes.CameraTreeId.key:
                    if (this.taskStoreService.SelectCameraList) {
                        result = this.taskStoreService.SelectCameraList;
                        console.log('camera', result);
                    }
                    break;
                case this.AlarmTypes.WifiTreeId.key:
                    if (this.taskStoreService.SelectWifiList) {
                        result = this.taskStoreService.SelectWifiList;
                        console.log('wifi', result);
                    }
                    break;
                case this.AlarmTypes.RmpGateTreeId.key:
                    if (this.taskStoreService.SelectRmpGateList) {
                        result = this.taskStoreService.SelectRmpGateList;
                        console.log('rmpgate', result);
                    }
                    break;
                case this.AlarmTypes.ElectronicFenceTreeId.key:
                    if (this.taskStoreService.SelectElectronicFenceList) {
                        result = this.taskStoreService.SelectElectronicFenceList;
                        console.log('electronicfence', result);
                    }
                    break;
                default:
                    return;
            }
            return result;
        };
        LampPopupController.prototype.removeSelected = function (pItem, key) {
            if (pItem.tId) {
                switch (key) {
                    case this.AlarmTypes.CameraTreeId.key:
                        this.treeService.updateNodeChecked(this.CameraTreeIdForLamp, pItem.tId, false);
                        this.CameraSelectedListForLamp = this.getCheckedList(TreeType_1.TreeType.camera.value, this.CameraTreeIdForLamp);
                        break;
                    case this.AlarmTypes.WifiTreeId.key:
                        this.treeService.updateNodeChecked(this.WifiTreeIdForLamp, pItem.tId, false);
                        this.WifiSelectedListForLamp = this.getCheckedList(TreeType_1.TreeType.wifi.value, this.WifiTreeIdForLamp);
                        break;
                    case this.AlarmTypes.RmpGateTreeId.key:
                        this.treeService.updateNodeChecked(this.RmpGateTreeIdForLamp, pItem.tId, false);
                        this.RmpGateSelectedListForLamp = this.getCheckedList(TreeType_1.TreeType.rmpGate.value, this.RmpGateTreeIdForLamp);
                        break;
                    case this.AlarmTypes.ElectronicFenceTreeId.key:
                        this.treeService.updateNodeChecked(this.ElectronicFenceTreeIdForLamp, pItem.tId, false);
                        this.ElectronicFenceSelectedListForLamp = this.getCheckedList(TreeType_1.TreeType.camera.value, this.ElectronicFenceTreeIdForLamp);
                        break;
                    default:
                        return;
                }
            }
            else {
                return false;
            }
        };
        LampPopupController.prototype.removeAllSelected = function (key) {
            switch (key) {
                case this.AlarmTypes.CameraTreeId.key:
                    if (this.CameraSelectedListForLamp && this.CameraSelectedListForLamp.length > 0) {
                        if (this.treeService.checkAllNodes(this.CameraTreeIdForLamp, false)) {
                            this.CameraSelectedListForLamp = [];
                        }
                    }
                    break;
                case this.AlarmTypes.WifiTreeId.key:
                    if (this.WifiSelectedListForLamp && this.WifiSelectedListForLamp.length > 0) {
                        if (this.treeService.checkAllNodes(this.WifiTreeIdForLamp, false)) {
                            this.WifiSelectedListForLamp = [];
                        }
                    }
                    break;
                case this.AlarmTypes.RmpGateTreeId.key:
                    if (this.RmpGateSelectedListForLamp && this.RmpGateSelectedListForLamp.length > 0) {
                        if (this.treeService.checkAllNodes(this.RmpGateTreeIdForLamp, false)) {
                            this.RmpGateSelectedListForLamp = [];
                        }
                    }
                    break;
                case this.AlarmTypes.ElectronicFenceTreeId.key:
                    if (this.ElectronicFenceSelectedListForLamp && this.ElectronicFenceSelectedListForLamp.length > 0) {
                        if (this.treeService.checkAllNodes(this.ElectronicFenceTreeIdForLamp, false)) {
                            this.ElectronicFenceSelectedListForLamp = [];
                        }
                    }
                    break;
                default:
                    return;
            }
        };
        LampPopupController.$inject = ['$scope',
            '$rootScope',
            'areaService',
            'lampService',
            '$q',
            '$timeout',
            'cameraService',
            'treeDirectiveService',
            'taskStoreService',
            'connectTreeService'
        ];
        return LampPopupController;
    }());
    main_app_1.app.controller('lampPopupController', LampPopupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9sYW1wL2xhbXAucG9wdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBb0NBLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUV6QyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUE7SUFnQnBDLElBQU0sVUFBVSxHQUFnQjtRQUM1QixNQUFNLEVBQUUsUUFBUTtRQUNoQixJQUFJLEVBQUUsTUFBTTtRQUNaLGVBQWUsRUFBRSxpQkFBaUI7UUFDbEMsT0FBTyxFQUFFLFNBQVM7S0FDckIsQ0FBQTtJQUVELElBQU0sY0FBYyxHQUFlO1FBQy9CLFlBQVksRUFBRSxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRTtRQUNsRCxVQUFVLEVBQUUsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7UUFDL0MscUJBQXFCLEVBQUUsRUFBRSxHQUFHLEVBQUUsdUJBQXVCLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtRQUNyRSxhQUFhLEVBQUUsRUFBRSxHQUFHLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7S0FDeEQsQ0FBQztJQVNGO1FBc0RJLDZCQUNZLE1BQVcsRUFDWCxVQUFlLEVBQ2YsV0FBeUIsRUFDekIsV0FBeUIsRUFDekIsRUFBTyxFQUNQLFFBQWEsRUFDYixhQUE2QixFQUM3QixXQUFrQyxFQUNsQyxnQkFBbUMsRUFDbkMsa0JBQXVDO1lBVm5ELGlCQWdKQztZQS9JVyxXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQ1gsZUFBVSxHQUFWLFVBQVUsQ0FBSztZQUNmLGdCQUFXLEdBQVgsV0FBVyxDQUFjO1lBQ3pCLGdCQUFXLEdBQVgsV0FBVyxDQUFjO1lBQ3pCLE9BQUUsR0FBRixFQUFFLENBQUs7WUFDUCxhQUFRLEdBQVIsUUFBUSxDQUFLO1lBQ2Isa0JBQWEsR0FBYixhQUFhLENB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c291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE3LzMvMjkuXHJcbiAqL1xyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHAnXHJcbmltcG9ydCB7IGFwcCB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL2xhbXAuc2VydmljZSc7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL2NhbWVyYS5zZXJ2aWNlJztcclxuaW1wb3J0ICcuLi8uLi9jb21tb24vc2VydmljZXMvcm1wZ2F0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUxhbXBTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9sYW1wLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgSUNhbWVyYVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2NhbWVyYS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IElSbXBHYXRlU2VydmljZSB9IGZyb20gJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9ybXBnYXRlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBcmVhIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L0FyZWFcIjtcclxuaW1wb3J0IHsgQXJlYUV4IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0FyZWFFeFwiO1xyXG5pbXBvcnQgeyBJQXJlYVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FyZWEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBMYW1wIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L0xhbXBcIjtcclxuaW1wb3J0IHsgTGFtcEV4IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0xhbXBFeFwiO1xyXG5pbXBvcnQgeyBXaWZpRXggfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvV2lmaUV4XCI7XHJcbmltcG9ydCB7IFJtcEdhdGVFeCB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9SbXBHYXRlRXhcIjtcclxuaW1wb3J0IHsgRWxlY3Ryb25pY0ZlbmNlRXggfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvRWxlY3Ryb25pY0ZlbmNlRXhcIjtcclxuaW1wb3J0IHsgQmFja1Jlc3BvbnNlQm9keSwgUmVzcG9uc2VSZXN1bHQgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7IFRyZWVEYXRhUGFyYW1zIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLXBhcmFtc1wiO1xyXG5pbXBvcnQgeyBUcmVlVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudW0vVHJlZVR5cGVcIjtcclxuaW1wb3J0IHsgQ2FtZXJhRXggfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQ2FtZXJhRXhcIjtcclxuaW1wb3J0IHsgUmVsYXRpb25Db2wsIFJlbGF0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L0RldmljZVJlbGF0aW9uXCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IElUcmVlRGlyZWN0aXZlU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3RyZWUvdHJlZS5kaXJlY3RpdmUuc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuL2xhbXAuc3RvcmUuc2VydmljZVwiXHJcbmltcG9ydCB7IElUYXNrU3RvcmVTZXJ2aWNlIH0gZnJvbSBcIi4vbGFtcC5zdG9yZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IElDb25uZWN0VHJlZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2Nvbm5lY3RUcmVlLnNlcnZpY2VcIlxyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vc2VydmljZXMvY29ubmVjdFRyZWUuc2VydmljZVwiO1xyXG5pbXBvcnQgXCJ3ZWJVcGxvYWRlclwiO1xyXG5pbXBvcnQgXCJjc3MhLi4vLi4vLi4vbGlicy93ZWJ1cGxvYWRlci0wLjEuNS93ZWJ1cGxvYWRlci5jc3NcIjtcclxuXHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55O1xyXG5kZWNsYXJlIHZhciByZXF1aXJlOiBhbnk7XHJcbmxldCBXZWJVcGxvYWRlciA9IHJlcXVpcmUoXCJ3ZWJVcGxvYWRlclwiKTtcclxuaW1wb3J0IFwiZXM2LXByb21pc2VcIlxyXG5sZXQgUHJvbWlzZSA9IHJlcXVpcmUoXCJlczYtcHJvbWlzZVwiKVxyXG5cclxuaW50ZXJmYWNlIElBbGFybVR5cGUge1xyXG4gICAgQ2FtZXJhVHJlZUlkOiB7IGtleTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcgfSxcclxuICAgIFdpZmlUcmVlSWQ6IHsga2V5OiBzdHJpbmcsIHRleHQ6IHN0cmluZyB9XHJcbiAgICBFbGVjdHJvbmljRmVuY2VUcmVlSWQ6IHsga2V5OiBzdHJpbmcsIHRleHQ6IHN0cmluZyB9XHJcbiAgICBSbXBHYXRlVHJlZUlkOiB7IGtleTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSURldmljZVR5cGUge1xyXG4gICAgQ2FtZXJhOiBzdHJpbmcsXHJcbiAgICBXaWZpOiBzdHJpbmcsXHJcbiAgICBFbGVjdHJvbmljRmVuY2U6IHN0cmluZyxcclxuICAgIFJtcEdhdGU6IHN0cmluZ1xyXG59XHJcblxyXG5jb25zdCBEZXZpY2VUeXBlOiBJRGV2aWNlVHlwZSA9IHtcclxuICAgIENhbWVyYTogXCJDYW1lcmFcIixcclxuICAgIFdpZmk6IFwiV2lmaVwiLFxyXG4gICAgRWxlY3Ryb25pY0ZlbmNlOiBcIkVsZWN0cm9uaWNGZW5jZVwiLFxyXG4gICAgUm1wR2F0ZTogXCJSbXBHYXRlXCJcclxufVxyXG5cclxuY29uc3QgQWxhcm1UeXBlc0RhdGE6IElBbGFybVR5cGUgPSB7XHJcbiAgICBDYW1lcmFUcmVlSWQ6IHsga2V5OiAnQ2FtZXJhVHJlZUlkJywgdGV4dDogJ+aRhOWDj+acuicgfSxcclxuICAgIFdpZmlUcmVlSWQ6IHsga2V5OiAnV2lmaVRyZWVJZCcsIHRleHQ6ICdXSUZJJyB9LFxyXG4gICAgRWxlY3Ryb25pY0ZlbmNlVHJlZUlkOiB7IGtleTogJ0VsZWN0cm9uaWNGZW5jZVRyZWVJZCcsIHRleHQ6ICdXSUZJJyB9LFxyXG4gICAgUm1wR2F0ZVRyZWVJZDogeyBrZXk6ICdSbXBHYXRlVHJlZUlkJywgdGV4dDogJ1dJRkknIH1cclxufTtcclxuXHJcbmludGVyZmFjZSBJTGFtcEV4dCB7XHJcbiAgICBDYW1lcmE6IEFycmF5PHN0cmluZz47XHJcbiAgICBSbXBHYXRlOiBBcnJheTxzdHJpbmc+O1xyXG4gICAgV0lGSTogQXJyYXk8c3RyaW5nPjtcclxuICAgIEVsZWN0cm9uaWNGZW5jZTogQXJyYXk8c3RyaW5nPjtcclxufVxyXG5cclxuY2xhc3MgTGFtcFBvcHVwQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJyxcclxuICAgICAgICAnJHJvb3RTY29wZScsXHJcbiAgICAgICAgJ2FyZWFTZXJ2aWNlJyxcclxuICAgICAgICAnbGFtcFNlcnZpY2UnLFxyXG4gICAgICAgICckcScsXHJcbiAgICAgICAgJyR0aW1lb3V0JyxcclxuICAgICAgICAnY2FtZXJhU2VydmljZScsXHJcbiAgICAgICAgJ3RyZWVEaXJlY3RpdmVTZXJ2aWNlJyxcclxuICAgICAgICAndGFza1N0b3JlU2VydmljZScsXHJcbiAgICAgICAgJ2Nvbm5lY3RUcmVlU2VydmljZSdcclxuICAgIF07XHJcbiAgICBjdXJkVHlwZTogc3RyaW5nO1xyXG4gICAgTGFtcDogTGFtcEV4O1xyXG4gICAgQXJlYTogQXJlYUV4O1xyXG4gICAgc3VibWl0OiBGdW5jdGlvbjtcclxuICAgIHRyZWVQYXJhbXM6IFRyZWVEYXRhUGFyYW1zPEFyZWFFeD47XHJcbiAgICBpc1Nob3dBcmVhVHJlZTogYm9vbGVhbjtcclxuICAgIGlzU2hvd0NhbWVyYVRyZWU6IGJvb2xlYW47XHJcbiAgICBpc05nU2hvd1N0ZXBCYXNlOiBib29sZWFuO1xyXG4gICAgaXNOZ1Nob3dTdGVwRGV2aWNlOiBib29sZWFuO1xyXG4gICAgLy8g5piv5ZCm5piv5qC55Yy65Z+fLCDlj6rmnInlnKjkv67mlLnmk43kvZzml7bnlJ/mlYhcclxuICAgIC8vIOW9k+WJjeWMuuWfn+aYr+agueWMuuWfn+aXtiwg5LiN5YWB6K646YCJ5oup5qC557uT54K5XHJcbiAgICBpc1Jvb3RMYW1wOiBib29sZWFuO1xyXG5cclxuICAgIENhbWVyYU9uVGhlTGFtcDogVHJlZURhdGFQYXJhbXM8Q2FtZXJhRXggJiBBcmVhRXg+O1xyXG4gICAgV2lmaU9uVGhlTGFtcDogVHJlZURhdGFQYXJhbXM8V2lmaUV4ICYgQXJlYUV4PjtcclxuICAgIFJtcEdhdGVPblRoZUxhbXA6IFRyZWVEYXRhUGFyYW1zPFJtcEdhdGVFeCAmIEFyZWFFeD47XHJcbiAgICBFbGVjdHJvbmljRmVuY2VPblRoZUxhbXA6IFRyZWVEYXRhUGFyYW1zPEVsZWN0cm9uaWNGZW5jZUV4ICYgQXJlYUV4PjtcclxuICAgIC8vIHRyZWXpu5jorqRJRFxyXG4gICAgQ2FtZXJhVHJlZUlkRm9yTGFtcDogc3RyaW5nID0gXCJDYW1lcmFUcmVlSWRGb3JMYW1wXCI7XHJcbiAgICBXaWZpVHJlZUlkRm9yTGFtcDogc3RyaW5nID0gXCJXaWZpVHJlZUlkRm9yTGFtcFwiO1xyXG4gICAgRWxlY3Ryb25pY0ZlbmNlVHJlZUlkRm9yTGFtcDogc3RyaW5nID0gXCJFbGVjdHJvbmljRmVuY2VUcmVlSWRGb3JMYW1wXCI7XHJcbiAgICBSbXBHYXRlVHJlZUlkRm9yTGFtcDogc3RyaW5nID0gXCJSbXBHYXRlVHJlZUlkRm9yTGFtcFwiO1xyXG4gICAgLy8g5omA5pyJ6YCJ5Lit55qE6K6+5aSH5riF5Y2VXHJcbiAgICBDYW1lcmFTZWxlY3RlZExpc3RGb3JMYW1wOiBBcnJheTxDYW1lcmFFeD4gPSBbXSBhcyBBcnJheTxDYW1lcmFFeD47XHJcbiAgICBXaWZpU2VsZWN0ZWRMaXN0Rm9yTGFtcDogQXJyYXk8V2lmaUV4PiA9IFtdIGFzIEFycmF5PFdpZmlFeD47XHJcbiAgICBSbXBHYXRlU2VsZWN0ZWRMaXN0Rm9yTGFtcDogQXJyYXk8Um1wR2F0ZUV4PiA9IFtdIGFzIEFycmF5PFJtcEdhdGVFeD47XHJcbiAgICBFbGVjdHJvbmljRmVuY2VTZWxlY3RlZExpc3RGb3JMYW1wOiBBcnJheTxFbGVjdHJvbmljRmVuY2VFeD4gPSBbXSBhcyBBcnJheTxFbGVjdHJvbmljRmVuY2VFeD47XHJcblxyXG4gICAgQWxhcm1UeXBlczogSUFsYXJtVHlwZSA9IEFsYXJtVHlwZXNEYXRhO1xyXG4gICAgLy8g6K6+5aSHXHJcbiAgICBsYW1wRXh0OiBJTGFtcEV4dDtcclxuICAgIERldmljZVR5cGU6IElEZXZpY2VUeXBlID0gRGV2aWNlVHlwZTtcclxuICAgIEN1cnJlbnREZXZpY2U6IHN0cmluZyA9IFwiQ2FtZXJhXCI7XHJcbiAgICBzZWFyY2hTdHI6IGFueTtcclxuICAgIHNlbGVjdGVkTm9kZTogYW55O1xyXG4gICAgdXBMb2FkQWN0aW9uOiBhbnk7XHJcbiAgICBJbWdVcmw6IHN0cmluZztcclxuICAgIGNob29zZUljb246IHN0cmluZztcclxuICAgIHRhYkxpc3Q6IEFycmF5PHsgdmFsdWU6IHN0cmluZywgdGV4dDogc3RyaW5nIH0+O1xyXG4gICAgRGV2aWNlUmVsYXRpb246IEFycmF5PFJlbGF0aW9uPiA9IFtdO1xyXG4gICAgZ2V0QWxsTGFtcEFib3V0RGV2aWNlOiBBcnJheTxSZWxhdGlvbj47XHJcbiAgICBkZWxldGVEZXZpY2VJZHM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSAkcm9vdFNjb3BlOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBhcmVhU2VydmljZTogSUFyZWFTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgbGFtcFNlcnZpY2U6IElMYW1wU2VydmljZSxcclxuICAgICAgICBwcml2YXRlICRxOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW55LFxyXG4gICAgICAgIHByaXZhdGUgY2FtZXJhU2VydmljZTogSUNhbWVyYVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSB0cmVlU2VydmljZTogSVRyZWVEaXJlY3RpdmVTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgdGFza1N0b3JlU2VydmljZTogSVRhc2tTdG9yZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBjb25uZWN0VHJlZVNlcnZpY2U6IElDb25uZWN0VHJlZVNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuaXNTaG93Q2FtZXJhVHJlZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNOZ1Nob3dTdGVwQmFzZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pc05nU2hvd1N0ZXBEZXZpY2UgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkFyZWEgPSB7fSBhcyBBcmVhRXg7XHJcblxyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICAgICAgJHNjb3BlLiRvbihcIiRkZXN0cm95XCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdm0udGFza1N0b3JlU2VydmljZS5jbGVhckNhY2hlKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLplIDmr4HkuoblvLnlh7rmoYZcIik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZtLnRhYkxpc3QgPSBbXHJcbiAgICAgICAgICAgIHsgdmFsdWU6ICdDYW1lcmEnLCB0ZXh0OiAn5pGE5YOP5py6JyB9LFxyXG4gICAgICAgICAgICB7IHZhbHVlOiAnV2lmaScsIHRleHQ6ICdXSUZJJyB9LFxyXG4gICAgICAgICAgICB7IHZhbHVlOiAnUm1wR2F0ZScsIHRleHQ6ICfljaHlj6MnIH0sXHJcbiAgICAgICAgICAgIHsgdmFsdWU6ICdFbGVjdHJvbmljRmVuY2UnLCB0ZXh0OiAn55S15Zu0JyB9XHJcbiAgICAgICAgXVxyXG4gICAgICAgIHZtLmN1cmRUeXBlID0gJHNjb3BlLmN1cmRUeXBlO1xyXG4gICAgICAgIHZtLkxhbXAgPSBuZXcgTGFtcEV4KCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+eri+adhuagkSsrKysrKysrKysrKysrKysnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh2bS5MYW1wKTtcclxuICAgICAgICAvLyDliJ3lp4vljJZ0cmVlXHJcbiAgICAgICAgdm0udHJlZVBhcmFtcyA9IG5ldyBUcmVlRGF0YVBhcmFtczxBcmVhRXg+KCk7XHJcbiAgICAgICAgdm0udHJlZVBhcmFtcy50cmVlSWQgPSBcImxhbXBQb3B1cEFyZWFUcmVlXCI7XHJcbiAgICAgICAgdm0udHJlZVBhcmFtcy5pc0RlZmF1bHRTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgdm0udHJlZVBhcmFtcy5vbkNsaWNrID0gdHJlZVNlbGVjdE5vZGU7XHJcbiAgICAgICAgdm0udG9nZ2xlU3RlcCA9IHRoaXMudG9nZ2xlU3RlcDtcclxuXHJcbiAgICAgICAgaWYgKHZtLmN1cmRUeXBlID09PSAnYWRkJyAmJiAkc2NvcGUuY3VycmVudEFyZWEpIHtcclxuICAgICAgICAgICAgLy8g5riF6Zmk57yT5a2YXHJcbiAgICAgICAgICAgIHRoaXMudGFza1N0b3JlU2VydmljZS5jbGVhckNhY2hlKCk7XHJcbiAgICAgICAgICAgIHZtLkxhbXAuUGFyZW50QXJlYSA9IHt9IGFzIEFyZWE7XHJcbiAgICAgICAgICAgIHZtLkxhbXAuUGFyZW50QXJlYS5JRCA9ICRzY29wZS5jdXJyZW50QXJlYS5JRDtcclxuICAgICAgICAgICAgdm0uTGFtcC5QYXJlbnRBcmVhLk5hbWUgPSAkc2NvcGUuY3VycmVudEFyZWEuTmFtZTtcclxuICAgICAgICAgICAgdm0uSW1nVXJsID0gJy4uLy4uLy4uL2ltYWdlcy9jb21tb24vZGVmYXVsdC1pbWFnZS5wbmcnO1xyXG4gICAgICAgICAgICB2bS5zdWJtaXQgPSB0aGlzLnNhdmVMYW1wO1xyXG4gICAgICAgICAgICAkdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2bS50cmVlUGFyYW1zLnRyZWVEYXRhcyA9ICRzY29wZS50cmVlRGF0YXM7XHJcbiAgICAgICAgICAgICAgICB2bS50cmVlUGFyYW1zLmRlZmF1bHRTZWxlY3RUcmVlSWQgPSAkc2NvcGUuY3VycmVudEFyZWEuSUQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKHZtLmN1cmRUeXBlID09PSAnZWRpdCcgJiYgJHNjb3BlLmN1cnJlbnRMYW1wKSB7XHJcbiAgICAgICAgICAgIHZtLnN1Ym1pdCA9IHRoaXMuZWRpdExhbXA7XHJcbiAgICAgICAgICAgIHZtLkxhbXAgPSAkc2NvcGUuY3VycmVudExhbXA7XHJcbiAgICAgICAgICAgIHZtLnNlbGVjdGVkTm9kZSA9ICRzY29wZS5jYWNoZUNhbWVyYURhdGE7XHJcblxyXG4gICAgICAgICAgICB2bS5JbWdVcmwgPSB2bS5MYW1wLkltZ1VybCA/IHZtLkxhbXAuSW1nVXJsIDogJy4uLy4uLy4uL2ltYWdlcy9jb21tb24vZGVmYXVsdC1pbWFnZS5wbmcnO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Zu+54mH5pWw5o2uKysrKysrKysrKysrKysrKysrJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHZtLkltZ1VybCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmdldEFsbExhbXBBYm91dERldmljZSA9ICRzY29wZS5nZXRBbGxMYW1wQWJvdXREZXZpY2U7IC8vIOWSjOi/meS4queBr+adhuebuOWFs+eahOaJgOacieiuvuWkh+WFs+ezu+ihqFxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0QWxsTGFtcFJhbGF0aW9uKCRzY29wZS5nZXRBbGxMYW1wQWJvdXREZXZpY2UpOyAvLyDliJ3lp4vljJbmoJHliJfooahcclxuICAgICAgICAgICAgJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdm0udHJlZVBhcmFtcy50cmVlRGF0YXMgPSAkc2NvcGUudHJlZURhdGFzO1xyXG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS5jdXJyZW50QXJlYS5JRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnRyZWVQYXJhbXMuZGVmYXVsdFNlbGVjdFRyZWVJZCA9ICRzY29wZS5jdXJyZW50QXJlYS5JRFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2bS5pc1Jvb3RMYW1wID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB2bS5pc1Nob3dDYW1lcmFUcmVlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vZG9t57uT5p6E5Yqg6L295a6M5YaN5Yid5aeL5YyWd2VidXBsb2FkZXIs5ZCm5YiZ5Yid5aeL5YyW5LiN5oiQ5Yqf44CCXHJcbiAgICAgICAgdm0uJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB2bS51cExvYWRBY3Rpb24gPSBXZWJVcGxvYWRlci5CYXNlLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBhdXRvOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyOiAnLi4vZGIvdXBsb2FkL2ltYWdlJyxcclxuICAgICAgICAgICAgICAgIHJlc2l6ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBwaWNrOiB7IGlkOiAnI2ZpbGVQaWNrZXInIH0sXHJcbiAgICAgICAgICAgICAgICBhY2NlcHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0ltYWdlcycsXHJcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uczogJ2dpZixqcGcsanBlZyxibXAscG5nJyxcclxuICAgICAgICAgICAgICAgICAgICBtaW1lVHlwZXM6ICdpbWFnZS9qcGcsaW1hZ2UvanBlZyxpbWFnZS9wbmcnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZm9ybURhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBzdG9yZVR5cGU6ICdMT0MnLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlQ2F0ZWdvcnk6ICdDYXB0dXJlSW1hZ2UnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmlsZVZhbDogJ2ltYWdlJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgY29tcHJlc3M6IHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTAwXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmlsZU51bUxpbWl0OiAzMDAsXHJcbiAgICAgICAgICAgICAgICBmaWxlU2l6ZUxpbWl0OiAyICogMTAyNCAqIDEwMjQsXHJcbiAgICAgICAgICAgICAgICBmaWxlU2luZ2xlU2l6ZUxpbWl0OiAxICogMTAyNCAqIDEwMjRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHZtLnVwTG9hZEFjdGlvbik7XHJcbiAgICAgICAgICAgIHZtLnVwTG9hZEFjdGlvbi5vblVwbG9hZEJlZm9yZVNlbmQgPSAoZmlsZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwTG9hZEFjdGlvbi5vcHRpb25zLmZvcm1EYXRhID0geyBpbWFnZTogZmlsZSB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZtLnVwTG9hZEFjdGlvbi5vblVwbG9hZFByb2dyZXNzID0gKHBlcmNlbnRhZ2U6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdm0udXBMb2FkQWN0aW9uLm9uVXBsb2FkU3VjY2VzcyA9IChmaWxlOiBhbnksIHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT0gMjAwICYmIHJlcy5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTGFtcC5JbWdVcmwgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjcHJldmlldycpLmF0dHIoJ3NyYycsIHRoaXMuTGFtcC5JbWdVcmwpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwTG9hZEFjdGlvbi5vblVwbG9hZEVycm9yID0gKGZpbGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign5LiK5Lyg5aSx6LSlJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRMYW1wVHJlZVBhcmFtc0ZvckNhbWVyYSgpO1xyXG4gICAgICAgIHRoaXMuaW5pdExhbXBUcmVlUGFyYW1zRm9yV2lmaSgpO1xyXG4gICAgICAgIHRoaXMuaW5pdExhbXBUcmVlUGFyYW1zRm9yUm1wR2F0ZSgpO1xyXG4gICAgICAgIHRoaXMuaW5pdExhbXBUcmVlUGFyYW1zRm9yRWxlY3Ryb25pY0ZlbmNlKCk7XHJcbiAgICAgICAgdGhpcy5pbml0TW9kYWxEYXRhKCk7XHJcbiAgICAgICAgLy8g6buY6K6k6YCJ5Lit5LiK57qn5Yy65Z+fXHJcbiAgICAgICAgZnVuY3Rpb24gdHJlZVNlbGVjdE5vZGUoZXZlbnQ6IE1vdXNlRXZlbnQsIHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZTogQXJlYUV4KSB7XHJcbiAgICAgICAgICAgICR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2bS5MYW1wLkFyZWFJRCAmJiB2bS5MYW1wLlN0ckpzb25Vc2VyRGF0YSAmJiB2bS5jdXJkVHlwZSA9PT0gJ2VkaXQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnR5cGUgPT09ICdjbGljaycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uTGFtcC5QYXJlbnRBcmVhID0gdHJlZU5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhcmVudE5vZGUgPSBKU09OLnBhcnNlKHZtLkxhbXAuU3RySnNvblVzZXJEYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5MYW1wLlBhcmVudEFyZWEgPSBwYXJlbnROb2RlLkFyZWE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2bS5MYW1wLlBhcmVudEFyZWEgPSB0cmVlTm9kZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZtLmlzU2hvd0FyZWFUcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+WPlueBr+adhuebuOWFs+eahOaJgOacieiuvuWkh+W5tue8k+WtmFxyXG4gICAgcHJpdmF0ZSBnZXRBbGxMYW1wUmFsYXRpb24ocmVsYXRpb246IEFycmF5PFJlbGF0aW9uPikge1xyXG4gICAgICAgIGxldCBhbGxSZWw6IEFycmF5PFJlbGF0aW9uPiA9IHJlbGF0aW9uO1xyXG5cclxuICAgICAgICBsZXQgZXh0ID0ge1xyXG4gICAgICAgICAgICBDYW1lcmE6IFtdIGFzIEFycmF5PHN0cmluZz4sXHJcbiAgICAgICAgICAgIFJtcEdhdGU6IFtdIGFzIEFycmF5PHN0cmluZz4sXHJcbiAgICAgICAgICAgIFdJRkk6IFtdIGFzIEFycmF5PHN0cmluZz4sXHJcbiAgICAgICAgICAgIEVsZWN0cm9uaWNGZW5jZTogW10gYXMgQXJyYXk8c3RyaW5nPlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKGFsbFJlbCAmJiBhbGxSZWwubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFsbFJlbCwgJz09PT09PT09PT09PT09PT09PT09PT09YWxsUmVsJylcclxuICAgICAgICAgICAgYWxsUmVsLmZvckVhY2goKHJlbDogUmVsYXRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZWwuVHlwZSA9PSBcIkNhbWVyYVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXh0LkNhbWVyYS5wdXNoKHJlbC5SZWxhdGVkT2JqZWN0SWQpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlbC5UeXBlID09IFwiV2lmaVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXh0LldJRkkucHVzaChyZWwuUmVsYXRlZE9iamVjdElkKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZWwuVHlwZSA9PSBcIlJtcEdhdGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGV4dC5SbXBHYXRlLnB1c2gocmVsLlJlbGF0ZWRPYmplY3RJZClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVsLlR5cGUgPT0gXCJFbGVjdHJvbmljRmVuY2VcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGV4dC5FbGVjdHJvbmljRmVuY2UucHVzaChyZWwuUmVsYXRlZE9iamVjdElkKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIOe8lui+keS5i+WJjeaJgOacieiuvuWkh+eahElEKOWcqOS/neWtmOaXtui9rOaNouS4uuWFs+ezu+ihqElE5YWo6YOo5Yig6ZmkKVxyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZURldmljZUlkcyA9IFtdLmNvbmNhdChleHQuQ2FtZXJhLCBleHQuV0lGSSwgZXh0LlJtcEdhdGUsIGV4dC5FbGVjdHJvbmljRmVuY2UpO1xyXG5cclxuICAgICAgICAgICAgLy8g6K6+5aSHaWTnvJPlrZhcclxuICAgICAgICAgICAgdGhpcy5sYW1wRXh0ID0gZXh0O1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhleHQsICc9PT09PT09PT09PT09PT09PT09PT09ZXh0JylcclxuICAgICAgICAgICAgdGhpcy50YXNrU3RvcmVTZXJ2aWNlLnVwZGF0ZVNlbGVjdENhbWVyYUxpc3QoZXh0LkNhbWVyYSk7XHJcbiAgICAgICAgICAgIHRoaXMudGFza1N0b3JlU2VydmljZS51cGRhdGVTZWxlY3RXaWZpTGlzdChleHQuV0lGSSk7XHJcbiAgICAgICAgICAgIHRoaXMudGFza1N0b3JlU2VydmljZS51cGRhdGVTZWxlY3RSbXBHYXRlTGlzdChleHQuUm1wR2F0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMudGFza1N0b3JlU2VydmljZS51cGRhdGVTZWxlY3RFbGVjdHJvbmljRmVuY2VMaXN0KGV4dC5FbGVjdHJvbmljRmVuY2UpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTZWxlY3RJZHModHJlZUlkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgdHJlZU5vZGVzID0gdGhpcy50cmVlU2VydmljZS5nZXRDaGVja2VkTm9kZXModHJlZUlkLCB0cnVlKSBhcyBBcnJheTxhbnk+O1xyXG4gICAgICAgIGxldCBpZHMgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIHRyZWVOb2Rlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGlkcy5wdXNoKGl0ZW0uSUQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBpZHNcclxuICAgIH1cclxuXHJcbiAgICAvLyDmoJHpgInkuK3nmoTorr7lpIflr7nosaFcclxuICAgIHByaXZhdGUgYWxsU2VsZWN0TGlzdCgpIHtcclxuICAgICAgICAvLyBsZXQgZXh0ID0ge1xyXG4gICAgICAgIC8vICAgICBDYW1lcmEgOiB0aGlzLnRyZWVTZXJ2aWNlLmdldENoZWNrZWROb2Rlcyh0aGlzLkNhbWVyYVRyZWVJZEZvckxhbXAsIHRydWUpLFxyXG4gICAgICAgIC8vICAgICBXaWZpIDogdGhpcy50cmVlU2VydmljZS5nZXRDaGVja2VkTm9kZXModGhpcy5XaWZpVHJlZUlkRm9yTGFtcCwgdHJ1ZSksXHJcbiAgICAgICAgLy8gICAgIFJtcEdhdGUgOiB0aGlzLnRyZWVTZXJ2aWNlLmdldENoZWNrZWROb2Rlcyh0aGlzLlJtcEdhdGVUcmVlSWRGb3JMYW1wLCB0cnVlKSxcclxuICAgICAgICAvLyAgICAgRWxlY3Ryb25pY0ZlbmNlIDogdGhpcy50cmVlU2VydmljZS5nZXRDaGVja2VkTm9kZXModGhpcy5FbGVjdHJvbmljRmVuY2VUcmVlSWRGb3JMYW1wLCB0cnVlKVxyXG4gICAgICAgIC8vIH07XHJcbiAgICAgICAgbGV0IGV4dCA9IHtcclxuICAgICAgICAgICAgQ2FtZXJhOiB0aGlzLmdldFNlbGVjdElkcyh0aGlzLkNhbWVyYVRyZWVJZEZvckxhbXApLFxyXG4gICAgICAgICAgICBXaWZpOiB0aGlzLmdldFNlbGVjdElkcyh0aGlzLldpZmlUcmVlSWRGb3JMYW1wKSxcclxuICAgICAgICAgICAgUm1wR2F0ZTogdGhpcy5nZXRTZWxlY3RJZHModGhpcy5SbXBHYXRlVHJlZUlkRm9yTGFtcCksXHJcbiAgICAgICAgICAgIEVsZWN0cm9uaWNGZW5jZTogdGhpcy5nZXRTZWxlY3RJZHModGhpcy5FbGVjdHJvbmljRmVuY2VUcmVlSWRGb3JMYW1wKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGV4dFxyXG4gICAgfVxyXG5cclxuICAgIC8vIOW9k+WJjeeri+adhui/nuaOpeiuvuWkh1xyXG4gICAgcHJpdmF0ZSBsYW1wQ29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgbGV0IG5ld0xhbXAgPSB7XHJcbiAgICAgICAgICAgICdDb2RlJzogdGhpcy5MYW1wLkNvZGUsXHJcbiAgICAgICAgICAgICdOYW1lJzogdGhpcy5MYW1wLk5hbWUsXHJcbiAgICAgICAgICAgICdBcmVhSUQnOiB0aGlzLkxhbXAuUGFyZW50QXJlYS5JRCxcclxuICAgICAgICAgICAgJ09yZ3VuaXRJRCc6IHRoaXMuTGFtcC5Pcmd1bml0SUQsXHJcbiAgICAgICAgICAgICdBZGRyZXNzJzogdGhpcy5MYW1wLkFkZHJlc3MsXHJcbiAgICAgICAgICAgICdEZXNjcmlwdGlvbic6IHRoaXMuTGFtcC5EZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgJ0V4dCc6IEpTT04uc3RyaW5naWZ5KHRoaXMuYWxsU2VsZWN0TGlzdCgpKSxcclxuICAgICAgICAgICAgJ0ltZ1VybCc6IHRoaXMuTGFtcC5JbWdVcmwsXHJcbiAgICAgICAgICAgICdEZXZpY2VOYW1lJzogdGhpcy5MYW1wLkRldmljZU5hbWVcclxuICAgICAgICB9IGFzIExhbXA7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyZFR5cGUgPT09ICdlZGl0Jykge1xyXG4gICAgICAgICAgICBuZXdMYW1wLklEID0gdGhpcy5MYW1wLklEXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdMYW1wXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNhdmVMYW1wKCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICBsZXQgbmV3TGFtcCA9IHRoYXQubGFtcENvbnN0cnVjdG9yKCkgYXMgTGFtcDtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2cobmV3TGFtcCk7XHJcblxyXG4gICAgICAgIHRoYXQubGFtcFNlcnZpY2Uuc2F2ZShuZXdMYW1wKS50aGVuKGNvbXBsZXRlKTtcclxuXHJcbiAgICAgICAgLy8g5L+d5a2Y54Gv5p2G6L+U5Zue5paw54Gv5p2G55qESURcclxuICAgICAgICBmdW5jdGlvbiBjb21wbGV0ZShyZXM6IFJlc3BvbnNlUmVzdWx0PHN0cmluZz4pIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YSB8fCByZXMuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGF0LmNoYW5nZVRoZURldmljZUxhbXBJZChyZXMuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNhbmNlbCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuJHEucmVqZWN0KHJlcy5jb2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDnu4Tlu7rpnIDopoHkv53lrZjnmoTlhbPns7vooajmlbDmja5cclxuICAgIC8vIHByaXZhdGUgc2F2ZVJhbGF0aW9uID0gKG5ld0xhbXBJRDpzdHJpbmcsIERldmljZU5hbWU6c3RyaW5nLCBkZXZpY2VEYXRhOmFueSk9PntcclxuICAgIC8vICAgICBkZXZpY2VEYXRhLmZvckVhY2goKGRhdGE6YW55KT0+e1xyXG4gICAgLy8gICAgICAgICBsZXQgUmVsYXRpb24gPSB7fSBhcyBSZWxhdGlvbjtcclxuICAgIC8vICAgICAgICAgUmVsYXRpb24uT2JqZWN0SWQgPSBuZXdMYW1wSUQ7XHJcbiAgICAvLyAgICAgICAgIFJlbGF0aW9uLk9iamVjdFR5cGUgPSBcIkxhbXBQb3N0XCI7XHJcbiAgICAvLyAgICAgICAgIFJlbGF0aW9uLlJlbGF0ZWRPYmplY3RJZCA9IGRhdGEuSUQ7XHJcbiAgICAvLyAgICAgICAgIFJlbGF0aW9uLlJlbGF0ZWRPYmplY3RUeXBlID0gRGV2aWNlTmFtZTtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCIxMTExXCIsUmVsYXRpb24pO1xyXG4gICAgLy8gICAgICAgICB0aGlzLkRldmljZVJlbGF0aW9uLnB1c2goUmVsYXRpb24pXHJcbiAgICAvLyAgICAgfSlcclxuICAgIC8vIH07XHJcblxyXG4gICAgLy8g5L+d5a2Y5omA5pyJ6YCJ5Lit55qE6K6+5aSH5YWz57O76KGoXHJcbiAgICAvLyBwcml2YXRlIGNoYW5nZVRoZURldmljZUxhbXBJZChOZXdMYW1wSUQ6c3RyaW5nKXtcclxuICAgIC8vICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAvLyAgICAgbGV0IGRldmljZXM6YW55ID0gdGhhdC5hbGxTZWxlY3RMaXN0KCk7XHJcbiAgICAvLyAgICAgaWYoZGV2aWNlcy5DYW1lcmEubGVuZ3RoKXtcclxuICAgIC8vICAgICAgICAgdGhhdC5zYXZlUmFsYXRpb24oTmV3TGFtcElELCBcIkNhbWVyYVwiLCBkZXZpY2VzLkNhbWVyYSlcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgaWYoZGV2aWNlcy5FbGVjdHJvbmljRmVuY2UubGVuZ3RoKXtcclxuICAgIC8vICAgICAgICAgdGhhdC5zYXZlUmFsYXRpb24oTmV3TGFtcElELCBcIkVsZWN0cm9uaWNGZW5jZVwiLCBkZXZpY2VzLkVsZWN0cm9uaWNGZW5jZSlcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgaWYoZGV2aWNlcy5SbXBHYXRlLmxlbmd0aCl7XHJcbiAgICAvLyAgICAgICAgIHRoYXQuc2F2ZVJhbGF0aW9uKE5ld0xhbXBJRCwgXCJSbXBHYXRlXCIsIGRldmljZXMuUm1wR2F0ZSlcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgaWYoZGV2aWNlcy5XaWZpLmxlbmd0aCl7XHJcbiAgICAvLyAgICAgICAgIHRoYXQuc2F2ZVJhbGF0aW9uKE5ld0xhbXBJRCwgXCJXaWZpXCIsIGRldmljZXMuV2lmaSlcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgaWYodGhhdC5EZXZpY2VSZWxhdGlvbiYmdGhhdC5EZXZpY2VSZWxhdGlvbi5sZW5ndGgpe1xyXG4gICAgLy8gICAgICAgICAvLyDkv53lrZjnvJbovpHkuYvlkI7nmoTorr7lpIdJRFxyXG4gICAgLy8gICAgICAgICB0aGlzLmxhbXBTZXJ2aWNlLnNhdmVUaGVSYWxhdGlvbih0aGF0LkRldmljZVJlbGF0aW9uKS50aGVuKChyZXMpPT57XHJcbiAgICAvLyAgICAgICAgICAgICBpZihyZXMuZGF0YSAmJiByZXMuY29kZSA9PSAyMDApe1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHRoYXQuY2FuY2VsKHRydWUpXHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIHRoYXQuY2FuY2VsKHRydWUpXHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIOiuvuWkh2lk5YiX6KGo6L2s5o2i5Li65YWz57O76KGoaWTliJfooahcclxuICAgIC8vIHByaXZhdGUgZ2V0UmVsYXRlZE9iamVjdElkcyhpZHM6QXJyYXk8c3RyaW5nPil7XHJcbiAgICAvLyAgICAgbGV0IFJlbGF0ZWRPYmplY3RJZHMgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgLy8gICAgIGxldCBnZXRBbGxMYW1wQWJvdXREZXZpY2UgPSB0aGlzLmdldEFsbExhbXBBYm91dERldmljZTtcclxuICAgIC8vICAgICBmb3IobGV0IGk9MDtpPGlkcy5sZW5ndGg7aSsrKXtcclxuICAgIC8vICAgICAgICAgbGV0IERldmljZUlkID0gaWRzW2ldIGFzIHN0cmluZztcclxuICAgIC8vICAgICAgICAgZm9yKGxldCBmPTA7ZjxnZXRBbGxMYW1wQWJvdXREZXZpY2UubGVuZ3RoO2YrKyl7XHJcbiAgICAvLyAgICAgICAgICAgICBpZihEZXZpY2VJZD09Z2V0QWxsTGFtcEFib3V0RGV2aWNlW2ZdLlJlbGF0ZWRPYmplY3RJZCl7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgUmVsYXRlZE9iamVjdElkcy5wdXNoKHRoaXMuZ2V0QWxsTGFtcEFib3V0RGV2aWNlW2ZdLklEKVxyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIHJldHVybiBSZWxhdGVkT2JqZWN0SWRzXHJcbiAgICAvLyB9XHJcblxyXG4gICAgcHVibGljIGVkaXRMYW1wKCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICBpZiAoIXRoYXQudmFsaWRhdGUoKSkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBuZXdMYW1wID0gdGhpcy5sYW1wQ29uc3RydWN0b3IoKTtcclxuXHJcbiAgICAgICAgdGhhdC5sYW1wU2VydmljZS5lZGl0KG5ld0xhbXApLnRoZW4oY29tcGxldGUpO1xyXG5cclxuICAgICAgICAvLyDliKDpmaTnga/mnYbkuIvnmoTorr7lpIfmm7TmlrDorr7lpIfnmoRsYW1wSURcclxuICAgICAgICAvLyBpZih0aGlzLmRlbGV0ZURldmljZUlkcy5sZW5ndGgpe1xyXG4gICAgICAgIC8vICAgICBsZXQgUmVsYXRlZE9iamVjdElkcyA9IHRoaXMuZ2V0UmVsYXRlZE9iamVjdElkcyh0aGlzLmRlbGV0ZURldmljZUlkcyk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubGFtcFNlcnZpY2UuZGVsZXRlTGFtcERldmljZVJlbGF0aW9uKFJlbGF0ZWRPYmplY3RJZHMpLnRoZW4oKHJlcyk9PntcclxuICAgICAgICAvLyAgICAgICAgIHRoYXQuZGVsZXRlRGV2aWNlSWRzID0gW107XHJcbiAgICAgICAgLy8gICAgICAgICBpZihyZXMuZGF0YSAmJiByZXMuY29kZSA9PSAyMDApe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoYXQuY2hhbmdlVGhlRGV2aWNlTGFtcElkKHRoYXQuTGFtcC5JRClcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgfSlcclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgdGhhdC5jaGFuZ2VUaGVEZXZpY2VMYW1wSWQodGhhdC5MYW1wLklEKVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyB0aGlzLnRhc2tTdG9yZVNlcnZpY2UuY2xlYXJDYWNoZSgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjb21wbGV0ZShyZXM6IFJlc3BvbnNlUmVzdWx0PHN0cmluZz4pIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuY2FuY2VsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC4kcS5yZWplY3QocmVzLmNvZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdG9nZ2xlU3RlcCh0ZXh0Pzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRleHQgPT0gXCJpc05nU2hvd1N0ZXBCYXNlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5pc05nU2hvd1N0ZXBCYXNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5pc05nU2hvd1N0ZXBEZXZpY2UgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmlzTmdTaG93U3RlcEJhc2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pc05nU2hvd1N0ZXBEZXZpY2UgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlKCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgIGlmICghdGhpcy5MYW1wLkNvZGUpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5MYW1wLk5hbWUpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbmNlbChmbGFnPzogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuZGVsZXRlRGV2aWNlSWRzID0gW107XHJcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2xhbXAuY2xvc2VQb3B1cCcsIGZsYWcpO1xyXG4gICAgICAgIHRoaXMudGFza1N0b3JlU2VydmljZS5jbGVhckNhY2hlKClcclxuICAgIH1cclxuXHJcbiAgICAvLyDmkJzntKJcclxuICAgIHB1YmxpYyBvbkNoYW5nZVNlYXJjaCh0cmVlSWQ6IHN0cmluZywgc2VhcmNoU3RyOiBzdHJpbmcsIHBhcmFtc05hbWU/OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRyZWVJZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghcGFyYW1zTmFtZSkge1xyXG4gICAgICAgICAgICBwYXJhbXNOYW1lID0gXCJOYW1lXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRyZWVTZXJ2aWNlLmZpbHRlclNob3dOb2Rlcyh0cmVlSWQsIHBhcmFtc05hbWUsIHNlYXJjaFN0cik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKiDliJ3lp4vljJbmoJHnmoTmlbDmja4gKi9cclxuICAgIHByaXZhdGUgaW5pdE1vZGFsRGF0YSgpOiB2b2lkIHtcclxuICAgICAgICAvLyDor7fmsYLmoJHmlbDmja7lubbmm7TmlrDliLDlhoXlrZhcclxuICAgICAgICB0aGlzLmdldEFyZWFBbmRDYW1lcmEoKS50aGVuKChyZXM6IEFycmF5PENhbWVyYUV4ICYgQXJlYUV4PikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkNhbWVyYU9uVGhlTGFtcC50cmVlRGF0YXMgPSByZXM7XHJcbiAgICAgICAgICAgIGlmIChyZXMpIHsgdGhpcy50YXNrU3RvcmVTZXJ2aWNlLnVwZGF0ZUNhbWVyYVRyZWVXaXRoQXJlYShyZXMpIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmdldEFyZWFBbmRXaWZpKCkudGhlbigocmVzOiBBcnJheTxXaWZpRXggJiBBcmVhRXg+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuV2lmaU9uVGhlTGFtcC50cmVlRGF0YXMgPSByZXM7XHJcbiAgICAgICAgICAgIGlmIChyZXMpIHsgdGhpcy50YXNrU3RvcmVTZXJ2aWNlLnVwZGF0ZVdpZmlUcmVlV2l0aEFyZWEocmVzKSB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5nZXRBcmVhQW5kUm1wR2F0ZSgpLnRoZW4oKHJlczogQXJyYXk8Um1wR2F0ZUV4ICYgQXJlYUV4PikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLlJtcEdhdGVPblRoZUxhbXAudHJlZURhdGFzID0gcmVzO1xyXG4gICAgICAgICAgICBpZiAocmVzKSB7IHRoaXMudGFza1N0b3JlU2VydmljZS51cGRhdGVSbXBHYXRlVHJlZVdpdGhBcmVhKHJlcykgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZ2V0QXJlYUFuZEVsZWN0cm9uaWNGZW5jZSgpLnRoZW4oKHJlczogQXJyYXk8RWxlY3Ryb25pY0ZlbmNlRXggJiBBcmVhRXg+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuRWxlY3Ryb25pY0ZlbmNlT25UaGVMYW1wLnRyZWVEYXRhcyA9IHJlcztcclxuICAgICAgICAgICAgaWYgKHJlcykgeyB0aGlzLnRhc2tTdG9yZVNlcnZpY2UudXBkYXRlRWxlY3Ryb25pY0ZlbmNlVHJlZVdpdGhBcmVhKHJlcykgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIOiOt+WPlue8k+WtmOeahOagkee7k+aehOW5tuaYvuekulxyXG4gICAgICAgIGxldCBjYW1lcmFUcmVlRGF0YXM6IEFycmF5PENhbWVyYUV4ICYgQXJlYUV4PiA9IHRoaXMudGFza1N0b3JlU2VydmljZS5nZXRUcmVlV2l0aEFyZWE7XHJcbiAgICAgICAgbGV0IHdpZmlUcmVlRGF0YXM6IEFycmF5PFdpZmlFeCAmIEFyZWFFeD4gPSB0aGlzLnRhc2tTdG9yZVNlcnZpY2UuZ2V0VHJlZVdpdGhXaWZpO1xyXG4gICAgICAgIGxldCBybXBnYXRlVHJlZURhdGFzOiBBcnJheTxSbXBHYXRlRXggJiBBcmVhRXg+ID0gdGhpcy50YXNrU3RvcmVTZXJ2aWNlLmdldFRyZWVXaXRoUm1wR2F0ZTtcclxuICAgICAgICBsZXQgZWxlY3Ryb25pY2ZlbmNlVHJlZURhdGFzOiBBcnJheTxFbGVjdHJvbmljRmVuY2VFeCAmIEFyZWFFeD4gPSB0aGlzLnRhc2tTdG9yZVNlcnZpY2UuZ2V0VHJlZVdpdGhFbGVjdHJvbmljRmVuY2U7XHJcblxyXG4gICAgICAgIGlmIChjYW1lcmFUcmVlRGF0YXMgfHwgd2lmaVRyZWVEYXRhcyB8fCBybXBnYXRlVHJlZURhdGFzIHx8IGVsZWN0cm9uaWNmZW5jZVRyZWVEYXRhcykge1xyXG4gICAgICAgICAgICB0aGlzLkNhbWVyYU9uVGhlTGFtcC50cmVlRGF0YXMgPSBjYW1lcmFUcmVlRGF0YXM7XHJcbiAgICAgICAgICAgIHRoaXMuV2lmaU9uVGhlTGFtcC50cmVlRGF0YXMgPSB3aWZpVHJlZURhdGFzO1xyXG4gICAgICAgICAgICB0aGlzLlJtcEdhdGVPblRoZUxhbXAudHJlZURhdGFzID0gcm1wZ2F0ZVRyZWVEYXRhcztcclxuICAgICAgICAgICAgdGhpcy5FbGVjdHJvbmljRmVuY2VPblRoZUxhbXAudHJlZURhdGFzID0gZWxlY3Ryb25pY2ZlbmNlVHJlZURhdGFzO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvLyDliJ3lp4vljJbojrflj5bnlLXlm7RcclxuICAgIHByaXZhdGUgaW5pdExhbXBUcmVlUGFyYW1zRm9yRWxlY3Ryb25pY0ZlbmNlKCkge1xyXG4gICAgICAgIHRoaXMuRWxlY3Ryb25pY0ZlbmNlT25UaGVMYW1wID0gbmV3IFRyZWVEYXRhUGFyYW1zPEVsZWN0cm9uaWNGZW5jZUV4ICYgQXJlYUV4Pih0cnVlKTtcclxuICAgICAgICB0aGlzLkVsZWN0cm9uaWNGZW5jZU9uVGhlTGFtcC50cmVlSWQgPSB0aGlzLkVsZWN0cm9uaWNGZW5jZVRyZWVJZEZvckxhbXA7XHJcbiAgICAgICAgdGhpcy5FbGVjdHJvbmljRmVuY2VPblRoZUxhbXAuaXNTaG93SWNvbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5FbGVjdHJvbmljRmVuY2VPblRoZUxhbXAuaXNTaG93TGluZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuRWxlY3Ryb25pY0ZlbmNlT25UaGVMYW1wLmNoZWNrRW5hYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLkVsZWN0cm9uaWNGZW5jZU9uVGhlTGFtcC5pc1NpbmdsZVNlbGVjdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuRWxlY3Ryb25pY0ZlbmNlT25UaGVMYW1wLmlzU2ltcGxlRGF0YSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5FbGVjdHJvbmljRmVuY2VPblRoZUxhbXAub25DaGVjayA9IChldmVudDogRXZlbnQsIHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZTogYW55KTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5FbGVjdHJvbmljRmVuY2VTZWxlY3RlZExpc3RGb3JMYW1wID0gdGhpcy5nZXRDaGVja2VkTGlzdChUcmVlVHlwZS5FbGVjdHJvbmljRmVuY2UudmFsdWUsIHRyZWVJZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0SWRMaXN0ID0gW10gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh0aGlzLkVsZWN0cm9uaWNGZW5jZVNlbGVjdGVkTGlzdEZvckxhbXAsICh2YWw6IEFyZWFFeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdElkTGlzdC5wdXNoKHZhbC5JRCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFza1N0b3JlU2VydmljZS51cGRhdGVTZWxlY3RFbGVjdHJvbmljRmVuY2VMaXN0KHJlc3VsdElkTGlzdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5FbGVjdHJvbmljRmVuY2VPblRoZUxhbXAuYWRkRGl5RG9tID0gKHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudHJlZVNlcnZpY2UuYWRkRGl5RG9tSXNDb25maVN0YXR1cyh0cmVlSWQsIHRyZWVOb2RlKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkVsZWN0cm9uaWNGZW5jZU9uVGhlTGFtcC50cmVlSW5pdENvbXBsZXRlID0gKHRyZWVJZDogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjaGVja2VkSWRMaXN0OiBBcnJheTxzdHJpbmc+ID0gdGhpcy5nZXRTZWxlY3RlZElkTGlzdCh0aGlzLkFsYXJtVHlwZXMuRWxlY3Ryb25pY0ZlbmNlVHJlZUlkLmtleSk7XHJcbiAgICAgICAgICAgIGlmIChjaGVja2VkSWRMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Yid5aeL5YyW55S15Zu05qCRLS0tLS0tLS0tLS0tLS0tLVwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFRyZWVUeXBlLkVsZWN0cm9uaWNGZW5jZS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkVsZWN0cm9uaWNGZW5jZVRyZWVJZEZvckxhbXApO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY2hlY2tlZElkTGlzdCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkFsYXJtVHlwZXMuRWxlY3Ryb25pY0ZlbmNlVHJlZUlkLmtleSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRDaGVja1RyZWVCeUlkcyhUcmVlVHlwZS5FbGVjdHJvbmljRmVuY2UudmFsdWUsIHRoaXMuRWxlY3Ryb25pY0ZlbmNlVHJlZUlkRm9yTGFtcCwgY2hlY2tlZElkTGlzdCwgdGhpcy5BbGFybVR5cGVzLkVsZWN0cm9uaWNGZW5jZVRyZWVJZC5rZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIC8vIOWIneWni+WMluiOt+WPluWNoeWPo1xyXG4gICAgcHJpdmF0ZSBpbml0TGFtcFRyZWVQYXJhbXNGb3JSbXBHYXRlKCkge1xyXG4gICAgICAgIHRoaXMuUm1wR2F0ZU9uVGhlTGFtcCA9IG5ldyBUcmVlRGF0YVBhcmFtczxSbXBHYXRlRXggJiBBcmVhRXg+KHRydWUpO1xyXG4gICAgICAgIHRoaXMuUm1wR2F0ZU9uVGhlTGFtcC50cmVlSWQgPSB0aGlzLlJtcEdhdGVUcmVlSWRGb3JMYW1wO1xyXG4gICAgICAgIHRoaXMuUm1wR2F0ZU9uVGhlTGFtcC5pc1Nob3dJY29uID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlJtcEdhdGVPblRoZUxhbXAuaXNTaG93TGluZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuUm1wR2F0ZU9uVGhlTGFtcC5jaGVja0VuYWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5SbXBHYXRlT25UaGVMYW1wLmlzU2luZ2xlU2VsZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5SbXBHYXRlT25UaGVMYW1wLmlzU2ltcGxlRGF0YSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5SbXBHYXRlT25UaGVMYW1wLm9uQ2hlY2sgPSAoZXZlbnQ6IEV2ZW50LCB0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGU6IGFueSk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUm1wR2F0ZVNlbGVjdGVkTGlzdEZvckxhbXAgPSB0aGlzLmdldENoZWNrZWRMaXN0KFRyZWVUeXBlLnJtcEdhdGUudmFsdWUsIHRyZWVJZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0SWRMaXN0ID0gW10gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh0aGlzLlJtcEdhdGVTZWxlY3RlZExpc3RGb3JMYW1wLCAodmFsOiBBcmVhRXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRJZExpc3QucHVzaCh2YWwuSUQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tTdG9yZVNlcnZpY2UudXBkYXRlU2VsZWN0Um1wR2F0ZUxpc3QocmVzdWx0SWRMaXN0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLlJtcEdhdGVPblRoZUxhbXAuYWRkRGl5RG9tID0gKHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudHJlZVNlcnZpY2UuYWRkRGl5RG9tSXNDb25maVN0YXR1cyh0cmVlSWQsIHRyZWVOb2RlKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlJtcEdhdGVPblRoZUxhbXAudHJlZUluaXRDb21wbGV0ZSA9ICh0cmVlSWQ6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY2hlY2tlZElkTGlzdDogQXJyYXk8c3RyaW5nPiA9IHRoaXMuZ2V0U2VsZWN0ZWRJZExpc3QodGhpcy5BbGFybVR5cGVzLlJtcEdhdGVUcmVlSWQua2V5KTtcclxuICAgICAgICAgICAgaWYgKGNoZWNrZWRJZExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Q2hlY2tUcmVlQnlJZHMoVHJlZVR5cGUucm1wR2F0ZS52YWx1ZSwgdGhpcy5SbXBHYXRlVHJlZUlkRm9yTGFtcCwgY2hlY2tlZElkTGlzdCwgdGhpcy5BbGFybVR5cGVzLlJtcEdhdGVUcmVlSWQua2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvLyDliJ3lp4vljJbojrflj5Z3aWZpXHJcbiAgICBwcml2YXRlIGluaXRMYW1wVHJlZVBhcmFtc0ZvcldpZmkoKSB7XHJcbiAgICAgICAgdGhpcy5XaWZpT25UaGVMYW1wID0gbmV3IFRyZWVEYXRhUGFyYW1zPFdpZmlFeCAmIEFyZWFFeD4odHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5XaWZpT25UaGVMYW1wLnRyZWVJZCA9IHRoaXMuV2lmaVRyZWVJZEZvckxhbXA7XHJcbiAgICAgICAgdGhpcy5XaWZpT25UaGVMYW1wLmlzU2hvd0ljb24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuV2lmaU9uVGhlTGFtcC5pc1Nob3dMaW5lID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5XaWZpT25UaGVMYW1wLmNoZWNrRW5hYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLldpZmlPblRoZUxhbXAuaXNTaW5nbGVTZWxlY3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLldpZmlPblRoZUxhbXAuaXNTaW1wbGVEYXRhID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLldpZmlPblRoZUxhbXAub25DaGVjayA9IChldmVudDogRXZlbnQsIHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZTogYW55KTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5XaWZpU2VsZWN0ZWRMaXN0Rm9yTGFtcCA9IHRoaXMuZ2V0Q2hlY2tlZExpc3QoVHJlZVR5cGUud2lmaS52YWx1ZSwgdHJlZUlkKTtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHRJZExpc3QgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHRoaXMuV2lmaVNlbGVjdGVkTGlzdEZvckxhbXAsICh2YWw6IEFyZWFFeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdElkTGlzdC5wdXNoKHZhbC5JRCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFza1N0b3JlU2VydmljZS51cGRhdGVTZWxlY3RXaWZpTGlzdChyZXN1bHRJZExpc3QpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuV2lmaU9uVGhlTGFtcC5hZGREaXlEb20gPSAodHJlZUlkOiBzdHJpbmcsIHRyZWVOb2RlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy50cmVlU2VydmljZS5hZGREaXlEb21Jc0NvbmZpU3RhdHVzKHRyZWVJZCwgdHJlZU5vZGUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuV2lmaU9uVGhlTGFtcC50cmVlSW5pdENvbXBsZXRlID0gKHRyZWVJZDogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjaGVja2VkSWRMaXN0OiBBcnJheTxzdHJpbmc+ID0gdGhpcy5nZXRTZWxlY3RlZElkTGlzdCh0aGlzLkFsYXJtVHlwZXMuV2lmaVRyZWVJZC5rZXkpO1xyXG4gICAgICAgICAgICBpZiAoY2hlY2tlZElkTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL3dpZmkgV2lmaVRyZWVJZEZvckxhbXAgW1wiMDAzOTZiMDJmYzhmNDRmZmE0ZjhmYTgyNTJiOGY2NjdcIl0gIFdpZmlUcmVlSWRcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdENoZWNrVHJlZUJ5SWRzKFRyZWVUeXBlLndpZmkudmFsdWUsIHRoaXMuV2lmaVRyZWVJZEZvckxhbXAsIGNoZWNrZWRJZExpc3QsIHRoaXMuQWxhcm1UeXBlcy5XaWZpVHJlZUlkLmtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgLy8g5Yid5aeL5YyW6I635Y+W5pGE5YOP5aS05qCRXHJcbiAgICBwcml2YXRlIGluaXRMYW1wVHJlZVBhcmFtc0ZvckNhbWVyYSgpIHtcclxuICAgICAgICB0aGlzLkNhbWVyYU9uVGhlTGFtcCA9IG5ldyBUcmVlRGF0YVBhcmFtczxDYW1lcmFFeCAmIEFyZWFFeD4odHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5DYW1lcmFPblRoZUxhbXAudHJlZUlkID0gdGhpcy5DYW1lcmFUcmVlSWRGb3JMYW1wO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhT25UaGVMYW1wLmlzU2hvd0ljb24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhT25UaGVMYW1wLmlzU2hvd0xpbmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkNhbWVyYU9uVGhlTGFtcC5jaGVja0VuYWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5DYW1lcmFPblRoZUxhbXAuaXNTaW5nbGVTZWxlY3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkNhbWVyYU9uVGhlTGFtcC5pc1NpbXBsZURhdGEgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhT25UaGVMYW1wLm9uQ2hlY2sgPSAoZXZlbnQ6IEV2ZW50LCB0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGU6IGFueSk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FtZXJhU2VsZWN0ZWRMaXN0Rm9yTGFtcCA9IHRoaXMuZ2V0Q2hlY2tlZExpc3QoVHJlZVR5cGUuY2FtZXJhLnZhbHVlLCB0cmVlSWQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5DYW1lcmFTZWxlY3RlZExpc3RGb3JMYW1wKTtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHRJZExpc3QgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHRoaXMuQ2FtZXJhU2VsZWN0ZWRMaXN0Rm9yTGFtcCwgKHZhbDogQXJlYUV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0SWRMaXN0LnB1c2godmFsLklEKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXNrU3RvcmVTZXJ2aWNlLnVwZGF0ZVNlbGVjdENhbWVyYUxpc3QocmVzdWx0SWRMaXN0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLkNhbWVyYU9uVGhlTGFtcC5hZGREaXlEb20gPSAodHJlZUlkOiBzdHJpbmcsIHRyZWVOb2RlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy50cmVlU2VydmljZS5hZGREaXlEb21Jc0NvbmZpU3RhdHVzKHRyZWVJZCwgdHJlZU5vZGUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkNhbWVyYU9uVGhlTGFtcC50cmVlSW5pdENvbXBsZXRlID0gKHRyZWVJZDogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjaGVja2VkSWRMaXN0OiBBcnJheTxzdHJpbmc+ID0gdGhpcy5nZXRTZWxlY3RlZElkTGlzdCh0aGlzLkFsYXJtVHlwZXMuQ2FtZXJhVHJlZUlkLmtleSk7XHJcbiAgICAgICAgICAgIGlmIChjaGVja2VkSWRMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdENoZWNrVHJlZUJ5SWRzKFRyZWVUeXBlLmNhbWVyYS52YWx1ZSwgdGhpcy5DYW1lcmFUcmVlSWRGb3JMYW1wLCBjaGVja2VkSWRMaXN0LCB0aGlzLkFsYXJtVHlwZXMuQ2FtZXJhVHJlZUlkLmtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIC8vIOiOt+WPluaJgOacieaRhOWDj+WktOagkeaVsOe7hFxyXG4gICAgcHJpdmF0ZSBnZXRBcmVhQW5kQ2FtZXJhKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RUcmVlU2VydmljZS5maW5kQXJlYUNhbWVyYSgpLnRoZW4oKHJlczogQXJyYXk8QXJlYUV4IHwgQ2FtZXJhRXg+KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy8g6I635Y+W5omA5pyJV0lGSeagkeaVsOe7hFxyXG4gICAgcHJpdmF0ZSBnZXRBcmVhQW5kV2lmaSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0VHJlZVNlcnZpY2UuZmluZEFyZWFXaXRoV2lmaSgpLnRoZW4oKHJlczogQXJyYXk8QXJlYUV4IHwgV2lmaUV4PikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8vIOiOt+WPluaJgOacieWNoeWPo+agkeaVsOe7hFxyXG4gICAgcHJpdmF0ZSBnZXRBcmVhQW5kUm1wR2F0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0VHJlZVNlcnZpY2UuZmluZEFyZWFXaXRoUm1wZ2F0ZSgpLnRoZW4oKHJlczogQXJyYXk8QXJlYUV4IHwgUm1wR2F0ZUV4PikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8vIOiOt+WPluaJgOacieeUteWbtOagkeaVsOe7hFxyXG4gICAgcHJpdmF0ZSBnZXRBcmVhQW5kRWxlY3Ryb25pY0ZlbmNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RUcmVlU2VydmljZS5maW5kQXJlYVdpdGhFbGVjdHJvbmljZmVuY2UoKS50aGVuKChyZXM6IEFycmF5PEFyZWFFeCB8IEVsZWN0cm9uaWNGZW5jZUV4PikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8vIOagh+etvumhteWIh+aNolxyXG4gICAgcHVibGljIHRvZ2dsZUNhbWVyYShhcmc6IHN0cmluZykge1xyXG4gICAgICAgIHN3aXRjaCAoYXJnKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDYW1lcmFcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuQ3VycmVudERldmljZSA9IHRoaXMuRGV2aWNlVHlwZS5DYW1lcmE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIldpZmlcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuQ3VycmVudERldmljZSA9IHRoaXMuRGV2aWNlVHlwZS5XaWZpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJSbXBHYXRlXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLkN1cnJlbnREZXZpY2UgPSB0aGlzLkRldmljZVR5cGUuUm1wR2F0ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRWxlY3Ryb25pY0ZlbmNlXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLkN1cnJlbnREZXZpY2UgPSB0aGlzLkRldmljZVR5cGUuRWxlY3Ryb25pY0ZlbmNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8g6I635Y+W5omA5pyJ6YCJ5Lit6KGM5pS/5Yy65Z+f5pGE5YOP5aS05pWw5o2uXHJcbiAgICBwcml2YXRlIGdldENoZWNrZWRMaXN0KHRyZWVUeXBlOiBzdHJpbmcsIHRyZWVJZDogc3RyaW5nKTogYW55IHtcclxuXHJcbiAgICAgICAgbGV0IHRyZWVDaGVja2VkTm9kZXMgPSB0aGlzLnRyZWVTZXJ2aWNlLmdldENoZWNrZWROb2Rlcyh0cmVlSWQsIHRydWUpO1xyXG5cclxuICAgICAgICBsZXQgcmVzdWx0OiBhbnkgPSBbXSBhcyBhbnk7XHJcbiAgICAgICAgaWYgKHRyZWVDaGVja2VkTm9kZXMpIHtcclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHRyZWVDaGVja2VkTm9kZXMsICh2YWw6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbC50cmVlVHlwZSA9PT0gdHJlZVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh2YWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIC8vIOiOt+WPluaJgOaciemAieS4rUlEXHJcbiAgICBwcml2YXRlIGdldFNlbGVjdGVkSWRMaXN0KGtleTogc3RyaW5nKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcclxuICAgICAgICAgICAgY2FzZSB0aGlzLkFsYXJtVHlwZXMuQ2FtZXJhVHJlZUlkLmtleTpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhc2tTdG9yZVNlcnZpY2UuU2VsZWN0Q2FtZXJhTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMudGFza1N0b3JlU2VydmljZS5TZWxlY3RDYW1lcmFMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbWVyYScsIHJlc3VsdClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIHRoaXMuQWxhcm1UeXBlcy5XaWZpVHJlZUlkLmtleTpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhc2tTdG9yZVNlcnZpY2UuU2VsZWN0V2lmaUxpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLnRhc2tTdG9yZVNlcnZpY2UuU2VsZWN0V2lmaUxpc3RcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnd2lmaScsIHJlc3VsdClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIHRoaXMuQWxhcm1UeXBlcy5SbXBHYXRlVHJlZUlkLmtleTpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhc2tTdG9yZVNlcnZpY2UuU2VsZWN0Um1wR2F0ZUxpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLnRhc2tTdG9yZVNlcnZpY2UuU2VsZWN0Um1wR2F0ZUxpc3RcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncm1wZ2F0ZScsIHJlc3VsdClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIHRoaXMuQWxhcm1UeXBlcy5FbGVjdHJvbmljRmVuY2VUcmVlSWQua2V5OlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGFza1N0b3JlU2VydmljZS5TZWxlY3RFbGVjdHJvbmljRmVuY2VMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy50YXNrU3RvcmVTZXJ2aWNlLlNlbGVjdEVsZWN0cm9uaWNGZW5jZUxpc3RcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZWxlY3Ryb25pY2ZlbmNlJywgcmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyDnp7vpmaQg5bey6YCJIOebrueahOmhuVxyXG4gICAgcHVibGljIHJlbW92ZVNlbGVjdGVkKHBJdGVtOiBhbnksIGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHBJdGVtLnRJZCkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLkFsYXJtVHlwZXMuQ2FtZXJhVHJlZUlkLmtleTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWVTZXJ2aWNlLnVwZGF0ZU5vZGVDaGVja2VkKHRoaXMuQ2FtZXJhVHJlZUlkRm9yTGFtcCwgcEl0ZW0udElkLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DYW1lcmFTZWxlY3RlZExpc3RGb3JMYW1wID0gdGhpcy5nZXRDaGVja2VkTGlzdChUcmVlVHlwZS5jYW1lcmEudmFsdWUsIHRoaXMuQ2FtZXJhVHJlZUlkRm9yTGFtcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMuQWxhcm1UeXBlcy5XaWZpVHJlZUlkLmtleTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWVTZXJ2aWNlLnVwZGF0ZU5vZGVDaGVja2VkKHRoaXMuV2lmaVRyZWVJZEZvckxhbXAsIHBJdGVtLnRJZCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuV2lmaVNlbGVjdGVkTGlzdEZvckxhbXAgPSB0aGlzLmdldENoZWNrZWRMaXN0KFRyZWVUeXBlLndpZmkudmFsdWUsIHRoaXMuV2lmaVRyZWVJZEZvckxhbXApO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLkFsYXJtVHlwZXMuUm1wR2F0ZVRyZWVJZC5rZXk6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlU2VydmljZS51cGRhdGVOb2RlQ2hlY2tlZCh0aGlzLlJtcEdhdGVUcmVlSWRGb3JMYW1wLCBwSXRlbS50SWQsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlJtcEdhdGVTZWxlY3RlZExpc3RGb3JMYW1wID0gdGhpcy5nZXRDaGVja2VkTGlzdChUcmVlVHlwZS5ybXBHYXRlLnZhbHVlLCB0aGlzLlJtcEdhdGVUcmVlSWRGb3JMYW1wKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5BbGFybVR5cGVzLkVsZWN0cm9uaWNGZW5jZVRyZWVJZC5rZXk6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlU2VydmljZS51cGRhdGVOb2RlQ2hlY2tlZCh0aGlzLkVsZWN0cm9uaWNGZW5jZVRyZWVJZEZvckxhbXAsIHBJdGVtLnRJZCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuRWxlY3Ryb25pY0ZlbmNlU2VsZWN0ZWRMaXN0Rm9yTGFtcCA9IHRoaXMuZ2V0Q2hlY2tlZExpc3QoVHJlZVR5cGUuY2FtZXJhLnZhbHVlLCB0aGlzLkVsZWN0cm9uaWNGZW5jZVRyZWVJZEZvckxhbXApO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8g5riF56m65omA5pyJ5bey6YCJ6aG5XHJcbiAgICBwdWJsaWMgcmVtb3ZlQWxsU2VsZWN0ZWQoa2V5OiBzdHJpbmcpIHtcclxuICAgICAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgICAgICBjYXNlIHRoaXMuQWxhcm1UeXBlcy5DYW1lcmFUcmVlSWQua2V5OlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuQ2FtZXJhU2VsZWN0ZWRMaXN0Rm9yTGFtcCAmJiB0aGlzLkNhbWVyYVNlbGVjdGVkTGlzdEZvckxhbXAubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyZWVTZXJ2aWNlLmNoZWNrQWxsTm9kZXModGhpcy5DYW1lcmFUcmVlSWRGb3JMYW1wLCBmYWxzZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DYW1lcmFTZWxlY3RlZExpc3RGb3JMYW1wID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgdGhpcy5BbGFybVR5cGVzLldpZmlUcmVlSWQua2V5OlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuV2lmaVNlbGVjdGVkTGlzdEZvckxhbXAgJiYgdGhpcy5XaWZpU2VsZWN0ZWRMaXN0Rm9yTGFtcC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudHJlZVNlcnZpY2UuY2hlY2tBbGxOb2Rlcyh0aGlzLldpZmlUcmVlSWRGb3JMYW1wLCBmYWxzZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5XaWZpU2VsZWN0ZWRMaXN0Rm9yTGFtcCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIHRoaXMuQWxhcm1UeXBlcy5SbXBHYXRlVHJlZUlkLmtleTpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlJtcEdhdGVTZWxlY3RlZExpc3RGb3JMYW1wICYmIHRoaXMuUm1wR2F0ZVNlbGVjdGVkTGlzdEZvckxhbXAubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyZWVTZXJ2aWNlLmNoZWNrQWxsTm9kZXModGhpcy5SbXBHYXRlVHJlZUlkRm9yTGFtcCwgZmFsc2UpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUm1wR2F0ZVNlbGVjdGVkTGlzdEZvckxhbXAgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSB0aGlzLkFsYXJtVHlwZXMuRWxlY3Ryb25pY0ZlbmNlVHJlZUlkLmtleTpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLkVsZWN0cm9uaWNGZW5jZVNlbGVjdGVkTGlzdEZvckxhbXAgJiYgdGhpcy5FbGVjdHJvbmljRmVuY2VTZWxlY3RlZExpc3RGb3JMYW1wLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50cmVlU2VydmljZS5jaGVja0FsbE5vZGVzKHRoaXMuRWxlY3Ryb25pY0ZlbmNlVHJlZUlkRm9yTGFtcCwgZmFsc2UpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRWxlY3Ryb25pY0ZlbmNlU2VsZWN0ZWRMaXN0Rm9yTGFtcCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICAvLyDpu5jorqTpgInmi6nmjIflrppJRFxyXG4gICAgLy93aWZpIFdpZmlUcmVlSWRGb3JMYW1wIFtcIjAwMzk2YjAyZmM4ZjQ0ZmZhNGY4ZmE4MjUyYjhmNjY3XCJdICBXaWZpVHJlZUlkXHJcbiAgICBwcml2YXRlIGRlZmF1bHRDaGVja1RyZWVCeUlkcyA9ICh0cmVlVHlwZTogc3RyaW5nLCB0cmVlSWQ6IHN0cmluZywgaWRzOiBBcnJheTxzdHJpbmc+LCBrZXk6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGxldCBwYXJhbU5hbWUgPSBcIklEXCI7XHJcblxyXG4gICAgICAgIGlmIChpZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgY2hlY2tQYXJhbXNMaXN0ID0gW10gYXMgQXJyYXk8eyBrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyB9PjtcclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGlkcywgKHZhbDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjaGVja1BhcmFtc0xpc3QucHVzaCh7IGtleTogcGFyYW1OYW1lLCB2YWx1ZTogdmFsIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJlZVNlcnZpY2UuY2hlY2tOb2Rlc0J5UGFyYW1zTGlzdCh0cmVlSWQsIGNoZWNrUGFyYW1zTGlzdCwgdHJ1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLkFsYXJtVHlwZXMuQ2FtZXJhVHJlZUlkLmtleTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DYW1lcmFTZWxlY3RlZExpc3RGb3JMYW1wID0gdGhpcy5nZXRDaGVja2VkTGlzdCh0cmVlVHlwZSwgdHJlZUlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLkFsYXJtVHlwZXMuV2lmaVRyZWVJZC5rZXk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuV2lmaVNlbGVjdGVkTGlzdEZvckxhbXAgPSB0aGlzLmdldENoZWNrZWRMaXN0KHRyZWVUeXBlLCB0cmVlSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMuQWxhcm1UeXBlcy5SbXBHYXRlVHJlZUlkLmtleTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5SbXBHYXRlU2VsZWN0ZWRMaXN0Rm9yTGFtcCA9IHRoaXMuZ2V0Q2hlY2tlZExpc3QodHJlZVR5cGUsIHRyZWVJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5BbGFybVR5cGVzLkVsZWN0cm9uaWNGZW5jZVRyZWVJZC5rZXk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRWxlY3Ryb25pY0ZlbmNlU2VsZWN0ZWRMaXN0Rm9yTGFtcCA9IHRoaXMuZ2V0Q2hlY2tlZExpc3QodHJlZVR5cGUsIHRyZWVJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMuQWxhcm1UeXBlcy5DYW1lcmFUcmVlSWQua2V5OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ2FtZXJhU2VsZWN0ZWRMaXN0Rm9yTGFtcCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLkFsYXJtVHlwZXMuV2lmaVRyZWVJZC5rZXk6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5XaWZpU2VsZWN0ZWRMaXN0Rm9yTGFtcCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLkFsYXJtVHlwZXMuUm1wR2F0ZVRyZWVJZC5rZXk6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5SbXBHYXRlU2VsZWN0ZWRMaXN0Rm9yTGFtcCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLkFsYXJtVHlwZXMuRWxlY3Ryb25pY0ZlbmNlVHJlZUlkLmtleTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkVsZWN0cm9uaWNGZW5jZVNlbGVjdGVkTGlzdEZvckxhbXAgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdsYW1wUG9wdXBDb250cm9sbGVyJywgTGFtcFBvcHVwQ29udHJvbGxlcik7Il19
