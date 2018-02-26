define(["require", "exports", "../../../common/app/main.app", "../../../../core/params/RoleParams", "../../../../core/entity/Role", "../../../common/portrait-tool", "../../../../core/enum/ObjectType", "../../../common/directive/tree/tree-params", "../../../../core/enum/TreeType", "../../../../core/server/enum/CameraOperateType", "css!../../style/baseconfig.newRole.css", "./facelib-select-directive", "../../../common/services/role.service", "../../../common/services/connectTree.service", "../../../common/directive/tree/tree.directive.service", "../../../common/services/businessLib.service", "../../../common/factory/layerMsg.factory", "../../../common/factory/userinfo.cache.factory"], function (require, exports, main_app_1, RoleParams_1, Role_1, portrait_tool_1, ObjectType_1, tree_params_1, TreeType_1, CameraOperateType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Promise = require('es6-promise');
    var FaceLibChected = (function () {
        function FaceLibChected() {
        }
        return FaceLibChected;
    }());
    exports.FaceLibChected = FaceLibChected;
    var NewRoleController = (function () {
        function NewRoleController($scope, $q, roleService, $state, $stateParams, $timeout, connectTreeService, treeService, businessLibService, layerDec, userInfoCacheFactory) {
            var _this = this;
            this.$scope = $scope;
            this.$q = $q;
            this.roleService = roleService;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.$timeout = $timeout;
            this.connectTreeService = connectTreeService;
            this.treeService = treeService;
            this.businessLibService = businessLibService;
            this.layerDec = layerDec;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.roleData = new RoleParams_1.RoleDetailResult();
            this.selectTabIndex = 0;
            this.moduleTpl = '/module/baseconfig/role/newRole/module.template.html';
            this.deviceTpl = '/module/baseconfig/role/newRole/device.template.html';
            this.facelibTpl = '/module/baseconfig/role/newRole/facelib.template.html';
            this.funcModuleList = [];
            this.funcModuleListMap = {};
            this.currentUserRoleData = [];
            this.selectModuleIndex = 0;
            this.selectDeviceType = ObjectType_1.ObjectType.Camera.value;
            this.deviceTypelist = [
                ObjectType_1.ObjectType.Camera,
                ObjectType_1.ObjectType.Wifi,
                ObjectType_1.ObjectType.RmpGate,
                ObjectType_1.ObjectType.ElectronicFence
            ];
            this.deviceTypeMap = ObjectType_1.ObjectType;
            this.treeParams = new tree_params_1.TreeDataParams();
            this.selectCameraList = [];
            this.selectWifiList = [];
            this.selectRmpgateList = [];
            this.selectEfenceList = [];
            this.faceLibList = [];
            this.faceLibListMap = {};
            this.selectAreaLibIndex = 0;
            this.currentAreaLibData = [];
            this.defaultCheckTreeByIds = function (treeType, treeId, ids, paramName) {
                var arr = [];
                if (!paramName) {
                    paramName = "ID";
                }
                if (ids.length > 0) {
                    var checkParamsList_1 = [];
                    angular.forEach(ids, function (val) {
                        checkParamsList_1.push({ key: paramName, value: val });
                    });
                    if (_this.treeService.checkNodesByParamsList(treeId, checkParamsList_1, true)) {
                        arr = _this.getCheckedList(treeType, treeId);
                    }
                }
                return arr;
            };
            var roleId = this.$stateParams.roleId;
            this.getUserRoleData(roleId);
            if (!roleId) {
                this.roleService.findListByParams(null).then(function (res) {
                    if (res.code === 200) {
                        _this.roleList = res.data;
                    }
                });
            }
        }
        NewRoleController.prototype.getUserRoleData = function (roleId) {
            var _this = this;
            if (roleId) {
                this.roleService.findDetail(roleId).then(function (resp) {
                    if (resp && resp.code == 200) {
                        _this.roleData = resp.data;
                    }
                }).then(function () {
                    _this.initRoleData(true);
                    _this.getDeviceTreeData();
                    _this.getBusinessLibData(true);
                });
            }
            else {
                this.initRoleData(false);
                this.getDeviceTreeData();
                this.getBusinessLibData(false);
            }
        };
        NewRoleController.prototype.changeRoleTpl = function () {
            var _this = this;
            if (!this.$stateParams.roleId && this.roleTplID) {
                this.roleService.findDetail(this.roleTplID).then(function (resp) {
                    if (resp && resp.code == 200) {
                        _this.roleData.funcModuleList = resp.data.funcModuleList;
                        _this.roleData.cameraPowerList = resp.data.cameraPowerList;
                        _this.roleData.wifiPowerList = resp.data.wifiPowerList;
                        _this.roleData.rmpgatePowerList = resp.data.rmpgatePowerList;
                        _this.roleData.efencePowerList = resp.data.efencePowerList;
                        _this.roleData.facelibPowerList = resp.data.facelibPowerList;
                    }
                }).then(function () {
                    _this.initRoleCheckedMapData();
                    _this.initTreeData();
                    _this.initBusinessLib(true);
                });
            }
        };
        NewRoleController.prototype.initRoleData = function (isHasRole) {
            var _this = this;
            if (!isHasRole) {
                this.roleData.role = new Role_1.default();
                this.roleData.funcModuleList = [];
                this.roleData.cameraPowerList = [];
                this.roleData.wifiPowerList = [];
                this.roleData.rmpgatePowerList = [];
                this.roleData.efencePowerList = [];
            }
            this.getAllFunModule().then(function (result) {
                if (result) {
                    _this.initRoleCheckedMapData();
                }
            });
        };
        ;
        NewRoleController.prototype.initTreeData = function () {
            var _this = this;
            this.treeParams.treeId = 'DeviceSelectTree';
            this.treeParams.treeDatas = [];
            this.treeParams.isShowIcon = true;
            this.treeParams.isShowLine = false;
            this.treeParams.checkEnable = true;
            this.treeParams.isSingleSelect = false;
            this.treeParams.isSimpleData = true;
            this.treeParams.onCheck = function (event, treeId, treeNode) {
                if (_this.selectDeviceType === ObjectType_1.ObjectType.Camera.value) {
                    _this.$timeout(function () {
                        _this.selectCameraList = _this.getCheckedList(TreeType_1.TreeType.camera.value, treeId);
                        _this.roleData.cameraPowerList = _this.selectCameraList.map(function (item) {
                            var j = {};
                            j.ObjectID = item.ID;
                            j.ObjectType = ObjectType_1.ObjectType.Camera.value;
                            j.RoleID = _this.roleData.role.ID;
                            j.operateList = [CameraOperateType_1.CameraOperateType.Preview.value];
                            return j;
                        });
                    });
                }
                if (_this.selectDeviceType === ObjectType_1.ObjectType.Wifi.value) {
                    _this.$timeout(function () {
                        _this.selectWifiList = _this.getCheckedList(TreeType_1.TreeType.wifi.value, treeId);
                        _this.roleData.wifiPowerList = _this.selectWifiList.map(function (item) {
                            var j = {};
                            j.ObjectID = item.ID;
                            j.ObjectType = ObjectType_1.ObjectType.Wifi.value;
                            j.RoleID = _this.roleData.role.ID;
                            j.operateList = [CameraOperateType_1.CameraOperateType.Preview.value];
                            return j;
                        });
                    });
                }
                if (_this.selectDeviceType === ObjectType_1.ObjectType.RmpGate.value) {
                    _this.$timeout(function () {
                        _this.selectRmpgateList = _this.getCheckedList(TreeType_1.TreeType.rmpGate.value, treeId);
                        _this.roleData.rmpgatePowerList = _this.selectRmpgateList.map(function (item) {
                            var j = {};
                            j.ObjectID = item.ID;
                            j.ObjectType = ObjectType_1.ObjectType.RmpGate.value;
                            j.RoleID = _this.roleData.role.ID;
                            j.operateList = [CameraOperateType_1.CameraOperateType.Preview.value];
                            return j;
                        });
                    });
                }
                if (_this.selectDeviceType === ObjectType_1.ObjectType.ElectronicFence.value) {
                    _this.$timeout(function () {
                        _this.selectEfenceList = _this.getCheckedList(TreeType_1.TreeType.ElectronicFence.value, treeId);
                        _this.roleData.efencePowerList = _this.selectEfenceList.map(function (item) {
                            var j = {};
                            j.ObjectID = item.ID;
                            j.ObjectType = ObjectType_1.ObjectType.ElectronicFence.value;
                            j.RoleID = _this.roleData.role.ID;
                            j.operateList = [CameraOperateType_1.CameraOperateType.Preview.value];
                            return j;
                        });
                    });
                }
            };
            this.treeParams.treeInitComplete = function (treeId) {
                if (_this.selectDeviceType === ObjectType_1.ObjectType.Camera.value) {
                    _this.$timeout(function () {
                        var ids = _this.roleData.cameraPowerList.map(function (item) { return item.ObjectID; });
                        _this.selectCameraList = _this.defaultCheckTreeByIds(TreeType_1.TreeType.camera.value, treeId, ids);
                    });
                }
                if (_this.selectDeviceType === ObjectType_1.ObjectType.Wifi.value) {
                    _this.$timeout(function () {
                        var ids = _this.roleData.wifiPowerList.map(function (item) { return item.ObjectID; });
                        _this.selectWifiList = _this.defaultCheckTreeByIds(TreeType_1.TreeType.wifi.value, treeId, ids);
                    });
                }
                if (_this.selectDeviceType === ObjectType_1.ObjectType.RmpGate.value) {
                    _this.$timeout(function () {
                        var ids = _this.roleData.rmpgatePowerList.map(function (item) { return item.ObjectID; });
                        _this.selectRmpgateList = _this.defaultCheckTreeByIds(TreeType_1.TreeType.rmpGate.value, treeId, ids);
                    });
                }
                if (_this.selectDeviceType === ObjectType_1.ObjectType.ElectronicFence.value) {
                    _this.$timeout(function () {
                        var ids = _this.roleData.efencePowerList.map(function (item) { return item.ObjectID; });
                        _this.selectEfenceList = _this.defaultCheckTreeByIds(TreeType_1.TreeType.ElectronicFence.value, treeId, ids);
                    });
                }
            };
        };
        NewRoleController.prototype.getCheckedList = function (treeType, treeId) {
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
        NewRoleController.prototype.getDeviceTreeData = function () {
            var _this = this;
            var _self = this;
            Promise.all([
                _self.connectTreeService.findAreaCamera(),
                _self.connectTreeService.findAreaWithWifi(),
                _self.connectTreeService.findAreaWithRmpgate(),
                _self.connectTreeService.findAreaWithElectronicfence()
            ]).then(function (res) {
                _self.cameraTreeData = res[0];
                _self.wifiTreeData = res[1];
                _self.rmpgateTreeData = res[2];
                _self.efenceTreeData = res[3];
            }).then(function () {
                _this.setTreeDataForType();
            });
        };
        NewRoleController.prototype.getBusinessLibData = function (isUpdate) {
            var _this = this;
            this.businessLibService.findTreeAreaWithRole().then(function (res) {
                _this.faceLibList = _this.formatFaceLibList(res.data);
                _this.faceLibListMap = _this.formatFaceLibListForMap(res.data);
            }).then(function () {
                _this.initBusinessLib(isUpdate);
            });
        };
        NewRoleController.prototype.initBusinessLib = function (isUpdate) {
            var _this = this;
            for (var k in this.faceLibListMap) {
                this.faceLibListMap[k].IsEnabled = false;
                this.faceLibListMap[k].checkboxStatus = -1;
            }
            if (isUpdate) {
                var _loop_1 = function (k) {
                    this_1.roleData.facelibPowerList.forEach(function (ModuleItemEx) {
                        if (_this.faceLibListMap[k].ID === ModuleItemEx.ObjectID) {
                            _this.faceLibListMap[k].IsEnabled = true;
                            ModuleItemEx.operateList.forEach(function (operate) {
                                _this.faceLibListMap[k].operateForFaceLib.forEach(function (item) {
                                    if (item.IsSlide) {
                                        item.SlideList.forEach(function (item2, index) {
                                            if (item2.value === operate) {
                                                item.SlideIndex = index;
                                                item.IsEnabled = true;
                                            }
                                        });
                                    }
                                    else {
                                        if (operate === item.value) {
                                            item.IsEnabled = true;
                                        }
                                    }
                                });
                            });
                        }
                    });
                };
                var this_1 = this;
                for (var k in this.faceLibListMap) {
                    _loop_1(k);
                }
                this.updateCheckedWithFaceLib();
            }
        };
        NewRoleController.prototype.updateCheckedWithFaceLib = function () {
            var _this = this;
            this.$timeout(function () {
                var _loop_2 = function (k) {
                    var faceLib = _this.faceLibListMap[k];
                    var arr = [];
                    if (Array.isArray(faceLib.operateForFaceLib) && faceLib.operateForFaceLib.length > 0) {
                        faceLib.operateForFaceLib.forEach(function (item) {
                            arr.push(item.IsEnabled);
                        });
                    }
                    else {
                        var _loop_3 = function (k_1) {
                            if (faceLib.ID === _this.faceLibListMap[k_1].ParentID) {
                                var childModule = _this.faceLibListMap[k_1];
                                var tempFn_1 = function (lib) {
                                    arr.push(lib.IsEnabled);
                                    if (Array.isArray(lib.operateForFaceLib) && lib.operateForFaceLib.length > 0) {
                                        lib.operateForFaceLib.forEach(function (item) {
                                            arr.push(item.IsEnabled);
                                        });
                                    }
                                    else {
                                        for (var key in _this.faceLibListMap) {
                                            if (lib.ID === _this.faceLibListMap[key].ParentID) {
                                                arr.push(_this.faceLibListMap[key].IsEnabled);
                                                tempFn_1(_this.faceLibListMap[key]);
                                            }
                                        }
                                    }
                                };
                                tempFn_1(childModule);
                            }
                        };
                        for (var k_1 in _this.faceLibListMap) {
                            _loop_3(k_1);
                        }
                    }
                    if (arr.indexOf(false) > -1 && arr.indexOf(true) > -1) {
                        faceLib.checkboxStatus = 1;
                    }
                    if (arr.indexOf(false) === -1 && arr.indexOf(true) > -1) {
                        faceLib.checkboxStatus = 0;
                    }
                    if (arr.indexOf(false) > -1 && arr.indexOf(true) === -1) {
                        faceLib.checkboxStatus = -1;
                    }
                };
                for (var k in _this.faceLibListMap) {
                    _loop_2(k);
                }
            });
        };
        NewRoleController.prototype.changeSelectAreaLib = function (item, index) {
            if (this.selectAreaLibIndex != index) {
                this.selectAreaLibIndex = index;
            }
        };
        NewRoleController.prototype.changeFaceLibActionStatus = function (item) {
            item.IsEnabled = !item.IsEnabled;
            this.updateFaceLibIsEnadbledParent(item, item.IsEnabled);
            this.updateCheckedWithFaceLib();
        };
        NewRoleController.prototype.changeFaceLibActionStatus2 = function (item, index, action) {
            action.SlideIndex = index;
            index === -1 ? action.IsEnabled = false : action.IsEnabled = true;
            this.updateFaceLibIsEnadbledParent(action, action.IsEnabled);
            this.updateCheckedWithFaceLib();
        };
        NewRoleController.prototype.changeCheckedLibStatus = function (item, status) {
            var IsEnabled = false;
            if (status == 1 || status == -1) {
                IsEnabled = true;
            }
            item.IsEnabled = IsEnabled;
            this.updateFaceLibIsEnadbledChild(item, IsEnabled);
            this.updateFaceLibIsEnadbledParent(item, IsEnabled);
            this.updateCheckedWithFaceLib();
        };
        NewRoleController.prototype.updateFaceLibIsEnadbledParent = function (item, IsEnabled) {
            var _this = this;
            if (IsEnabled === true) {
                if (this.faceLibListMap[item.ParentID]) {
                    this.faceLibListMap[item.ParentID].IsEnabled = true;
                    if (this.faceLibListMap[item.ParentID].ParentID) {
                        this.faceLibListMap[this.faceLibListMap[item.ParentID].ParentID].IsEnabled = true;
                    }
                }
            }
            else {
                if (this.faceLibListMap[item.ParentID]) {
                    var tempFn_2 = function (item2) {
                        var isHave = false;
                        for (var k in _this.faceLibListMap) {
                            if (item2.ParentID === _this.faceLibListMap[k].ParentID) {
                                isHave = _this.faceLibListMap[k].IsEnabled;
                                if (_this.faceLibListMap[_this.faceLibListMap[k].ParentID]) {
                                    tempFn_2(_this.faceLibListMap[_this.faceLibListMap[k].ParentID]);
                                }
                            }
                        }
                        item2.IsEnabled = isHave;
                    };
                }
            }
        };
        NewRoleController.prototype.updateFaceLibIsEnadbledChild = function (item, IsEnabled) {
            var _this = this;
            var tempFn = function (item2) {
                if (item2.operateForFaceLib) {
                    item2.operateForFaceLib.forEach(function (action) {
                        action.IsEnabled = IsEnabled;
                        if (action.IsSlide) {
                            IsEnabled ? action.SlideIndex = 0 : action.SlideIndex = -1;
                        }
                    });
                }
                else {
                    for (var k in _this.faceLibListMap) {
                        if (item2.ID === _this.faceLibListMap[k].ParentID) {
                            _this.faceLibListMap[k].IsEnabled = IsEnabled;
                            tempFn(_this.faceLibListMap[_this.faceLibListMap[k].ID]);
                        }
                    }
                }
            };
            tempFn(item);
        };
        NewRoleController.prototype.initRoleCheckedMapData = function () {
            var _this = this;
            var _loop_4 = function (k) {
                this_2.funcModuleListMap[k].IsEnabled = false;
                if (Array.isArray(this_2.funcModuleListMap[k].operateItemList) && this_2.funcModuleListMap[k].operateItemList.length > 0) {
                    this_2.funcModuleListMap[k].operateItemList.forEach(function (item) {
                        item.IsEnabled = false;
                    });
                }
                this_2.roleData.funcModuleList.forEach(function (item) {
                    if (_this.funcModuleListMap[k].FullNameSpacePath === item.ObjectID) {
                        _this.funcModuleListMap[k].IsEnabled = true;
                        if (item.operateList.length > 0 && Array.isArray(_this.funcModuleListMap[k].operateItemList) && _this.funcModuleListMap[k].operateItemList.length > 0) {
                            var list_1 = angular.copy(item.operateList);
                            _this.funcModuleListMap[k].operateItemList.forEach(function (item2, index) {
                                var isChecked = false;
                                for (var i = 0; i < list_1.length; i++) {
                                    if (item2.FullNameSpacePath === list_1[i]) {
                                        isChecked = true;
                                        _this.funcModuleListMap[k].operateItemList[index].IsEnabled = true;
                                        list_1.splice(i, 1);
                                    }
                                }
                                if (!isChecked) {
                                    _this.funcModuleListMap[k].operateItemList[index].IsEnabled = false;
                                }
                            });
                        }
                    }
                });
            };
            var this_2 = this;
            for (var k in this.funcModuleListMap) {
                _loop_4(k);
            }
            this.updateStatusForIsEnabled();
        };
        NewRoleController.prototype.updateStatusForIsEnabled = function () {
            var _this = this;
            this.$timeout(function () {
                var _loop_5 = function (k) {
                    var module = _this.funcModuleListMap[k];
                    var arr = [];
                    if (Array.isArray(module.operateItemList) && module.operateItemList.length > 0) {
                        module.operateItemList.forEach(function (item) {
                            arr.push(item.IsEnabled);
                        });
                    }
                    else {
                        var _loop_6 = function (k_2) {
                            if (module.Key === _this.funcModuleListMap[k_2].ParentKey) {
                                var childModule = _this.funcModuleListMap[k_2];
                                var tempFn_3 = function (model) {
                                    arr.push(model.IsEnabled);
                                    if (Array.isArray(model.operateItemList) && model.operateItemList.length > 0) {
                                        model.operateItemList.forEach(function (item) {
                                            arr.push(item.IsEnabled);
                                        });
                                    }
                                    else {
                                        for (var key in _this.funcModuleListMap) {
                                            if (model.Key === _this.funcModuleListMap[key].ParentKey) {
                                                arr.push(_this.funcModuleListMap[key].IsEnabled);
                                                tempFn_3(_this.funcModuleListMap[key]);
                                            }
                                        }
                                    }
                                };
                                tempFn_3(childModule);
                            }
                        };
                        for (var k_2 in _this.funcModuleListMap) {
                            _loop_6(k_2);
                        }
                    }
                    if (arr.indexOf(false) > -1 && arr.indexOf(true) > -1) {
                        module.checkboxStatus = 1;
                    }
                    if (arr.indexOf(false) === -1 && arr.indexOf(true) > -1) {
                        module.checkboxStatus = 0;
                    }
                    if (arr.indexOf(false) > -1 && arr.indexOf(true) === -1) {
                        module.checkboxStatus = -1;
                    }
                };
                for (var k in _this.funcModuleListMap) {
                    _loop_5(k);
                }
            });
        };
        NewRoleController.prototype.changeCheckedStatus = function (module, status) {
            var isEnabled = false;
            if (status == 1 || status == -1) {
                isEnabled = true;
            }
            module.IsEnabled = isEnabled;
            this.checkedIsEnableForChildren(module, isEnabled);
            this.checkedIsEnableForParent(module, isEnabled);
            this.updateStatusForIsEnabled();
        };
        NewRoleController.prototype.changeSelectDevice = function (item) {
            this.selectDeviceType = item.value;
            this.setTreeDataForType();
        };
        NewRoleController.prototype.removeDeviceSelected = function (item, isRemoveAll) {
            var _this = this;
            if (this.selectDeviceType === ObjectType_1.ObjectType.Camera.value) {
                this.$timeout(function () {
                    if (item) {
                        _this.roleData.cameraPowerList = _this.roleData.cameraPowerList.filter(function (item2) { return item2.ObjectID === item.ID; });
                        _this.treeService.updateNodeChecked(_this.treeParams.treeId, item.tId, false);
                        _this.selectCameraList = _this.getCheckedList(TreeType_1.TreeType.camera.value, _this.treeParams.treeId);
                    }
                    if (isRemoveAll) {
                        _this.roleData.cameraPowerList = [];
                        if (_this.treeService.checkAllNodes(_this.treeParams.treeId, false)) {
                            _this.selectCameraList = [];
                        }
                    }
                });
            }
            if (this.selectDeviceType === ObjectType_1.ObjectType.Wifi.value) {
                this.$timeout(function () {
                    if (item) {
                        _this.roleData.wifiPowerList = _this.roleData.wifiPowerList.filter(function (item2) { return item2.ObjectID === item.ID; });
                        _this.treeService.updateNodeChecked(_this.treeParams.treeId, item.tId, false);
                        _this.selectWifiList = _this.getCheckedList(TreeType_1.TreeType.wifi.value, _this.treeParams.treeId);
                    }
                    if (isRemoveAll) {
                        _this.roleData.wifiPowerList = [];
                        if (_this.treeService.checkAllNodes(_this.treeParams.treeId, false)) {
                            _this.selectWifiList = [];
                        }
                    }
                });
            }
            if (this.selectDeviceType === ObjectType_1.ObjectType.RmpGate.value) {
                this.$timeout(function () {
                    if (item) {
                        _this.roleData.rmpgatePowerList = _this.roleData.rmpgatePowerList.filter(function (item2) { return item2.ObjectID === item.ID; });
                        _this.treeService.updateNodeChecked(_this.treeParams.treeId, item.tId, false);
                        _this.selectRmpgateList = _this.getCheckedList(TreeType_1.TreeType.rmpGate.value, _this.treeParams.treeId);
                    }
                    if (isRemoveAll) {
                        _this.roleData.rmpgatePowerList = [];
                        if (_this.treeService.checkAllNodes(_this.treeParams.treeId, false)) {
                            _this.selectRmpgateList = [];
                        }
                    }
                });
            }
            if (this.selectDeviceType === ObjectType_1.ObjectType.ElectronicFence.value) {
                this.$timeout(function () {
                    if (item) {
                        _this.roleData.efencePowerList = _this.roleData.efencePowerList.filter(function (item2) { return item2.ObjectID === item.ID; });
                        _this.treeService.updateNodeChecked(_this.treeParams.treeId, item.tId, false);
                        _this.selectEfenceList = _this.getCheckedList(TreeType_1.TreeType.ElectronicFence.value, _this.treeParams.treeId);
                    }
                    if (isRemoveAll) {
                        _this.roleData.efencePowerList = [];
                        if (_this.treeService.checkAllNodes(_this.treeParams.treeId, false)) {
                            _this.selectEfenceList = [];
                        }
                    }
                });
            }
        };
        NewRoleController.prototype.setTreeDataForType = function () {
            var _this = this;
            if (this.selectDeviceType === ObjectType_1.ObjectType.Camera.value) {
                this.$timeout(function () {
                    _this.treeParams.treeDatas = _this.cameraTreeData;
                });
            }
            if (this.selectDeviceType === ObjectType_1.ObjectType.Wifi.value) {
                this.$timeout(function () {
                    _this.treeParams.treeDatas = _this.wifiTreeData;
                });
            }
            if (this.selectDeviceType === ObjectType_1.ObjectType.RmpGate.value) {
                this.$timeout(function () {
                    _this.treeParams.treeDatas = _this.rmpgateTreeData;
                });
            }
            if (this.selectDeviceType === ObjectType_1.ObjectType.ElectronicFence.value) {
                this.$timeout(function () {
                    _this.treeParams.treeDatas = _this.efenceTreeData;
                });
            }
        };
        NewRoleController.prototype.checkedIsEnableForParent = function (module, isEnabled) {
            if (this.funcModuleListMap[module.ParentKey]) {
                if (isEnabled) {
                    this.funcModuleListMap[module.ParentKey].IsEnabled = isEnabled;
                }
                else {
                    var isHave = false;
                    for (var k in this.funcModuleListMap) {
                        if (module.ParentKey === this.funcModuleListMap[k].ParentKey) {
                            isHave = this.funcModuleListMap[k].IsEnabled;
                        }
                    }
                    this.funcModuleListMap[module.ParentKey].IsEnabled = isHave;
                }
                this.checkedIsEnableForParent(this.funcModuleListMap[module.ParentKey], isEnabled);
            }
        };
        NewRoleController.prototype.checkedIsEnableForChildren = function (module, isEnabled) {
            if (module.operateItemList) {
                if (Array.isArray(module.operateItemList) && module.operateItemList.length > 0) {
                    module.operateItemList.forEach(function (item) {
                        item.IsEnabled = isEnabled;
                    });
                }
            }
            else {
                for (var k in this.funcModuleListMap) {
                    if (module.Key === this.funcModuleListMap[k].ParentKey) {
                        this.funcModuleListMap[k].IsEnabled = isEnabled;
                        this.checkedIsEnableForChildren(this.funcModuleListMap[k], isEnabled);
                    }
                }
            }
        };
        NewRoleController.prototype.changeActionStatus = function (oprate) {
            oprate.IsEnabled = !oprate.IsEnabled;
            this.checkedIsEnableForParent(oprate, oprate.IsEnabled);
            this.updateStatusForIsEnabled();
        };
        NewRoleController.prototype.changeSelectModule = function (item, index) {
            if (this.selectModuleIndex != index) {
                this.selectModuleIndex = index;
            }
        };
        NewRoleController.prototype.changeSelectTab = function (index) {
            if (this.selectTabIndex != index) {
                this.selectTabIndex = index;
                if (index === 1) {
                    this.initTreeData();
                    if (this.treeParams.treeId) {
                        this.setTreeDataForType();
                    }
                }
            }
        };
        NewRoleController.prototype.getAllFunModule = function () {
            var _this = this;
            return this.roleService.getAllFunModule().then(function (resp) {
                if (resp && resp.code == 200 && resp.data) {
                    _this.funcModuleList = _this.formatFuncModuleList(resp.data);
                    _this.funcModuleListMap = _this.formatFuncModuleListForMap(resp.data);
                    return true;
                }
                else {
                    return false;
                }
            });
        };
        ;
        NewRoleController.prototype.formatFuncModuleList = function (mList) {
            var treeResult = [];
            if (mList) {
                treeResult = portrait_tool_1.default.convert2Ztree(mList, "Key", "ParentKey", "children");
            }
            return treeResult;
        };
        ;
        NewRoleController.prototype.formatFaceLibList = function (mList) {
            var treeResult = [];
            if (mList) {
                treeResult = portrait_tool_1.default.convert2Ztree(mList, "ID", "ParentID", "children");
            }
            return treeResult;
        };
        ;
        NewRoleController.prototype.formatFuncModuleListForMap = function (mList) {
            var result = {};
            mList.forEach(function (item) {
                result[item.Key] = item;
            });
            return result;
        };
        ;
        NewRoleController.prototype.formatFaceLibListForMap = function (mList) {
            var result = {};
            mList.forEach(function (item) {
                result[item.ID] = item;
            });
            return result;
        };
        ;
        NewRoleController.prototype.computedModule = function () {
            function computedOperate(list) {
                var strArr = [];
                list.forEach(function (action) {
                    if (action.IsEnabled) {
                        strArr.push(action.FullNameSpacePath);
                    }
                });
                return strArr;
            }
            var arr = [];
            for (var k in this.funcModuleListMap) {
                var j = {};
                if (this.funcModuleListMap[k].IsEnabled) {
                    j.RoleID = this.roleData.role.ID;
                    j.ObjectType = ObjectType_1.ObjectType.Module.value;
                    j.ObjectID = this.funcModuleListMap[k].FullNameSpacePath;
                    if (Array.isArray(this.funcModuleListMap[k].operateItemList) && this.funcModuleListMap[k].operateItemList.length > 0) {
                        j.operateList = computedOperate(this.funcModuleListMap[k].operateItemList);
                    }
                    arr.push(j);
                }
            }
            return arr;
        };
        NewRoleController.prototype.computedFaceLib = function () {
            console.log(this.faceLibListMap);
            function computedOperate(list) {
                var strArr = [];
                list.forEach(function (action) {
                    if (action.IsEnabled) {
                        if (!action.IsSlide) {
                            strArr.push(action.value);
                        }
                        else {
                            strArr.push(action.SlideList[action.SlideIndex].value);
                        }
                    }
                });
                return strArr;
            }
            var arr = [];
            for (var k in this.faceLibListMap) {
                console.log(this.faceLibListMap[k].IsEnabled && this.faceLibListMap[k].ObjectType === ObjectType_1.ObjectType.BusinessLib.value);
                if (this.faceLibListMap[k].IsEnabled && this.faceLibListMap[k].ObjectType === ObjectType_1.ObjectType.BusinessLib.value) {
                    var j = {};
                    console.log(this.faceLibListMap[k].Name);
                    j.RoleID = this.roleData.role.ID;
                    j.ObjectType = ObjectType_1.ObjectType.BusinessLib.value;
                    j.ObjectID = this.faceLibListMap[k].ObjectID;
                    console.log(this.faceLibListMap[k]);
                    j.operateList = computedOperate(this.faceLibListMap[k].operateForFaceLib);
                    arr.push(j);
                }
            }
            return arr;
        };
        NewRoleController.prototype.submitNewRole = function () {
            var _this = this;
            var params = {};
            params.role = this.roleData.role;
            if (!params.role.Name) {
                return this.layerDec.warnInfo('请填写角色名称！');
            }
            var funcModuleList = this.computedModule();
            if (funcModuleList.length === 0) {
                return this.layerDec.warnInfo('请选择功能权限！');
            }
            var facelibPowerList = this.computedFaceLib();
            params.roleDataList = [].concat(funcModuleList, facelibPowerList, this.roleData.cameraPowerList, this.roleData.wifiPowerList, this.roleData.rmpgatePowerList, this.roleData.efencePowerList);
            if (params.role.ID) {
                this.roleService.updateRole(params).then(function (res) {
                    if (res.code === 200) {
                        _this.cancelSubmit();
                    }
                });
            }
            else {
                params.role.CreateDate = Date.now().toString();
                params.role.CreaterID = this.userInfoCacheFactory.getCurrentUserId();
                this.roleService.addRole(params).then(function (res) {
                    if (res.code === 200) {
                        _this.cancelSubmit();
                    }
                });
            }
        };
        NewRoleController.prototype.cancelSubmit = function () {
            this.$state.go('baseconfig.role');
        };
        NewRoleController.$inject = ['$scope', '$q',
            'roleService', '$state', '$stateParams', '$timeout', 'connectTreeService', 'treeDirectiveService',
            'businessLibService', 'layerDec', 'userInfoCacheFactory'];
        return NewRoleController;
    }());
    main_app_1.app.controller('newRoleController', NewRoleController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9yb2xlL25ld1JvbGUvbmV3Um9sZS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWtDQSxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7SUFJckM7UUFBQTtRQUdBLENBQUM7UUFBRCxxQkFBQztJQUFELENBSEEsQUFHQyxJQUFBO0lBSFksd0NBQWM7SUFLM0I7UUFzREksMkJBQW9CLE1BQVcsRUFDWCxFQUFPLEVBQ1AsV0FBeUIsRUFDekIsTUFBVyxFQUNYLFlBQWlCLEVBQ2pCLFFBQWEsRUFDYixrQkFBdUMsRUFDdkMsV0FBa0MsRUFDbEMsa0JBQXVDLEVBQ3ZDLFFBQW1CLEVBQ25CLG9CQUEwQztZQVY5RCxpQkFxQkM7WUFyQm1CLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCxPQUFFLEdBQUYsRUFBRSxDQUFLO1lBQ1AsZ0JBQVcsR0FBWCxXQUFXLENBQWM7WUFDekIsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGlCQUFZLEdBQVosWUFBWSxDQUFLO1lBQ2pCLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXFCO1lBQ3ZDLGdCQUFXLEdBQVgsV0FBVyxDQUF1QjtZQUNsQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXFCO1lBQ3ZDLGFBQVEsR0FBUixRQUFRLENBQVc7WUFDbkIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtZQTVEOUQsYUFBUSxHQUFxQixJQUFJLDZCQUFnQixFQUFFLENBQUM7WUFNcEQsbUJBQWMsR0FBVyxDQUFDLENBQUM7WUFDM0IsY0FBUyxHQUFXLHNEQUFzRCxDQUFDO1lBQzNFLGNBQVMsR0FBVyxzREFBc0QsQ0FBQztZQUMzRSxlQUFVLEdBQVcsdURBQXVELENBQUM7WUFLN0UsbUJBQWMsR0FBd0IsRUFBRSxDQUFDO1lBQ3pDLHNCQUFpQixHQUFvQyxFQUFFLENBQUM7WUFDeEQsd0JBQW1CLEdB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QTtZQUNOLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUNyRSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUF3QjtvQkFDM0QsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNuQixLQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7b0JBQ3ZCLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUE7WUFDTixDQUFDO1FBQ0wsQ0FBQztRQUVELHdDQUFZLEdBQVo7WUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1FBQ3JDLENBQUM7UUFqNEJNLHlCQUFPLEdBQWtCLENBQUMsUUFBUSxFQUFFLElBQUk7WUFDM0MsYUFBYSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLG9CQUFvQixFQUFFLHNCQUFzQjtZQUNqRyxvQkFBb0IsRUFBRSxVQUFVLEVBQUMsc0JBQXNCLENBQUMsQ0FBQztRQWc0QmpFLHdCQUFDO0tBbjRCRCxBQW00QkMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvYmFzZWNvbmZpZy9yb2xlL25ld1JvbGUvbmV3Um9sZS5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiY3NzIS4uLy4uL3N0eWxlL2Jhc2Vjb25maWcubmV3Um9sZS5jc3NcIjtcclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCBcIi4vZmFjZWxpYi1zZWxlY3QtZGlyZWN0aXZlXCJcclxuaW1wb3J0IHtPcGVyYXRlRm9yRmFjZUxpYkVudW0sIFVzZXJSb2xlRGF0YUV4fSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvVXNlclJvbGVEYXRhRXhcIjtcclxuaW1wb3J0IHtSb2xlRGV0YWlsUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9wYXJhbXMvUm9sZVBhcmFtc1wiO1xyXG5pbXBvcnQgUm9sZSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9lbnRpdHkvUm9sZVwiO1xyXG5pbXBvcnQge01vZHVsZUl0ZW1FeH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L01vZHVsZUl0ZW1FeFwiO1xyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9yb2xlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJUm9sZVNlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvcm9sZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCBQb3J0cmFpdFRvb2wgZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wb3J0cmFpdC10b29sXCI7XHJcbmltcG9ydCB7TW9kdWxlSXRlbX0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvc2VydmVyL01vZHVsSXRlbU1vZGVsXCI7XHJcbmltcG9ydCB7RW51bX0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW51bS9FbnVtXCI7XHJcbmltcG9ydCB7T2JqZWN0VHlwZX0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW51bS9PYmplY3RUeXBlXCI7XHJcbmltcG9ydCB7SUNvbm5lY3RUcmVlU2VydmljZX0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9jb25uZWN0VHJlZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9jb25uZWN0VHJlZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SVRyZWVEaXJlY3RpdmVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUuZGlyZWN0aXZlLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwiLi4vLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUuZGlyZWN0aXZlLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7VHJlZURhdGFQYXJhbXN9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGlyZWN0aXZlL3RyZWUvdHJlZS1wYXJhbXNcIjtcclxuaW1wb3J0IHtBcmVhRXh9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudGl0eS9leC9BcmVhRXhcIjtcclxuaW1wb3J0IHtUcmVlVHlwZX0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW51bS9UcmVlVHlwZVwiO1xyXG5pbXBvcnQge0NhbWVyYUV4fSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQ2FtZXJhRXhcIjtcclxuaW1wb3J0IHtXaWZpRXh9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudGl0eS9leC9XaWZpRXhcIjtcclxuaW1wb3J0IHtSbXBHYXRlRXh9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudGl0eS9leC9SbXBHYXRlRXhcIjtcclxuaW1wb3J0IHtFbGVjdHJvbmljRmVuY2VFeH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0VsZWN0cm9uaWNGZW5jZUV4XCI7XHJcbmltcG9ydCB7Q2FtZXJhT3BlcmF0ZVR5cGV9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL0NhbWVyYU9wZXJhdGVUeXBlXCI7XHJcbmltcG9ydCB7SUJ1c2luZXNzTGliU2VydmljZX0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9idXNpbmVzc0xpYi5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9idXNpbmVzc0xpYi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7QnVzaW5lc3NMaWJFeH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0J1c2luZXNzTGliRXhcIjtcclxuaW1wb3J0IHtJTGF5ZXJEZWN9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L2xheWVyTXNnLmZhY3RvcnlcIjtcclxuaW1wb3J0IHtJVXNlckluZm9DYWNoZUZhY3Rvcnl9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZmFjdG9yeS91c2VyaW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCAgXCIuLi8uLi8uLi9jb21tb24vZmFjdG9yeS91c2VyaW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcbmxldCBQcm9taXNlID0gcmVxdWlyZSgnZXM2LXByb21pc2UnKTtcclxuXHJcbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueSwgYW5ndWxhcjogYW55O1xyXG5cclxuZXhwb3J0IGNsYXNzIEZhY2VMaWJDaGVjdGVkIHtcclxuICAgIGNoZWNrYm94U3RhdHVzOiBudW1iZXI7XHJcbiAgICBJc0VuYWJsZWQ6IGJvb2xlYW5cclxufVxyXG5cclxuY2xhc3MgTmV3Um9sZUNvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3Q6IEFycmF5PHN0cmluZz4gPSBbJyRzY29wZScsICckcScsXHJcbiAgICAgICAgJ3JvbGVTZXJ2aWNlJywgJyRzdGF0ZScsICckc3RhdGVQYXJhbXMnLCAnJHRpbWVvdXQnLCAnY29ubmVjdFRyZWVTZXJ2aWNlJywgJ3RyZWVEaXJlY3RpdmVTZXJ2aWNlJyxcclxuICAgICAgICAnYnVzaW5lc3NMaWJTZXJ2aWNlJywgJ2xheWVyRGVjJywndXNlckluZm9DYWNoZUZhY3RvcnknXTtcclxuICAgIHJvbGVEYXRhOiBSb2xlRGV0YWlsUmVzdWx0ID0gbmV3IFJvbGVEZXRhaWxSZXN1bHQoKTtcclxuICAgIHJvbGVMaXN0OkFycmF5PFJvbGU+O1xyXG4gICAgcm9sZVRwbElEOnN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2Mg5qih54mI6Lev5b6EXHJcbiAgICAgKi9cclxuICAgIHNlbGVjdFRhYkluZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgbW9kdWxlVHBsOiBzdHJpbmcgPSAnL21vZHVsZS9iYXNlY29uZmlnL3JvbGUvbmV3Um9sZS9tb2R1bGUudGVtcGxhdGUuaHRtbCc7XHJcbiAgICBkZXZpY2VUcGw6IHN0cmluZyA9ICcvbW9kdWxlL2Jhc2Vjb25maWcvcm9sZS9uZXdSb2xlL2RldmljZS50ZW1wbGF0ZS5odG1sJztcclxuICAgIGZhY2VsaWJUcGw6IHN0cmluZyA9ICcvbW9kdWxlL2Jhc2Vjb25maWcvcm9sZS9uZXdSb2xlL2ZhY2VsaWIudGVtcGxhdGUuaHRtbCc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyDot6/nlLHmnYPpmZDnm7jlhbNcclxuICAgICAqL1xyXG4gICAgZnVuY01vZHVsZUxpc3Q6IEFycmF5PE1vZHVsZUl0ZW1FeD4gPSBbXTtcclxuICAgIGZ1bmNNb2R1bGVMaXN0TWFwOiB7IFtrZXk6IHN0cmluZ106IE1vZHVsZUl0ZW1FeCB9ID0ge307XHJcbiAgICBjdXJyZW50VXNlclJvbGVEYXRhOiBBcnJheTxVc2VyUm9sZURhdGFFeD4gPSBbXTtcclxuICAgIHNlbGVjdE1vZHVsZUluZGV4OiBudW1iZXIgPSAwO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIOiuvuWkh+adg+mZkOebuOWFs1xyXG4gICAgICovXHJcbiAgICBzZWxlY3REZXZpY2VUeXBlOiBzdHJpbmcgPSBPYmplY3RUeXBlLkNhbWVyYS52YWx1ZTtcclxuICAgIGRldmljZVR5cGVsaXN0OiBBcnJheTxFbnVtPiA9IFtcclxuICAgICAgICBPYmplY3RUeXBlLkNhbWVyYSxcclxuICAgICAgICBPYmplY3RUeXBlLldpZmksXHJcbiAgICAgICAgT2JqZWN0VHlwZS5SbXBHYXRlLFxyXG4gICAgICAgIE9iamVjdFR5cGUuRWxlY3Ryb25pY0ZlbmNlXHJcbiAgICBdO1xyXG4gICAgZGV2aWNlVHlwZU1hcDogeyBba2V5OiBzdHJpbmddOiBFbnVtIH0gPSBPYmplY3RUeXBlO1xyXG4gICAgdHJlZVBhcmFtczogVHJlZURhdGFQYXJhbXM8YW55PiA9IG5ldyBUcmVlRGF0YVBhcmFtcygpO1xyXG4gICAgY2FtZXJhVHJlZURhdGE6IEFycmF5PEFyZWFFeCB8IENhbWVyYUV4PjtcclxuICAgIHdpZmlUcmVlRGF0YTogQXJyYXk8QXJlYUV4IHwgV2lmaUV4PjtcclxuICAgIHJtcGdhdGVUcmVlRGF0YTogQXJyYXk8QXJlYUV4IHwgUm1wR2F0ZUV4PjtcclxuICAgIGVmZW5jZVRyZWVEYXRhOiBBcnJheTxBcmVhRXggfCBFbGVjdHJvbmljRmVuY2VFeD47XHJcbiAgICBzZWxlY3RDYW1lcmFMaXN0OiBBcnJheTxDYW1lcmFFeD4gPSBbXTtcclxuICAgIHNlbGVjdFdpZmlMaXN0OiBBcnJheTxXaWZpRXg+ID0gW107XHJcbiAgICBzZWxlY3RSbXBnYXRlTGlzdDogQXJyYXk8Um1wR2F0ZUV4PiA9IFtdO1xyXG4gICAgc2VsZWN0RWZlbmNlTGlzdDogQXJyYXk8RWxlY3Ryb25pY0ZlbmNlRXg+ID0gW107XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2Mg5Lq65YOP5bqT5p2D6ZmQ55u45YWzXHJcbiAgICAgKi9cclxuICAgIGZhY2VMaWJMaXN0OiBBcnJheTxBcmVhRXggJiBVc2VyUm9sZURhdGFFeCAmIEJ1c2luZXNzTGliRXggJiBGYWNlTGliQ2hlY3RlZD4gPSBbXTtcclxuICAgIGZhY2VMaWJMaXN0TWFwOiB7IFtrZXk6IHN0cmluZ106IEFyZWFFeCAmIFVzZXJSb2xlRGF0YUV4ICYgQnVzaW5lc3NMaWJFeCAmIEZhY2VMaWJDaGVjdGVkIH0gPSB7fTtcclxuICAgIHNlbGVjdEFyZWFMaWJJbmRleDogbnVtYmVyID0gMDtcclxuICAgIGN1cnJlbnRBcmVhTGliRGF0YTogQXJyYXk8VXNlclJvbGVEYXRhRXg+ID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHE6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm9sZVNlcnZpY2U6IElSb2xlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHN0YXRlOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICRzdGF0ZVBhcmFtczogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjb25uZWN0VHJlZVNlcnZpY2U6IElDb25uZWN0VHJlZVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHRyZWVTZXJ2aWNlOiBJVHJlZURpcmVjdGl2ZVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGJ1c2luZXNzTGliU2VydmljZTogSUJ1c2luZXNzTGliU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXJEZWM6IElMYXllckRlYyxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgdXNlckluZm9DYWNoZUZhY3Rvcnk6SVVzZXJJbmZvQ2FjaGVGYWN0b3J5KSB7XHJcbiAgICAgICAgbGV0IHJvbGVJZCA9IHRoaXMuJHN0YXRlUGFyYW1zLnJvbGVJZDtcclxuICAgICAgICB0aGlzLmdldFVzZXJSb2xlRGF0YShyb2xlSWQpO1xyXG5cclxuICAgICAgICBpZighcm9sZUlkKXtcclxuICAgICAgICAgICAgdGhpcy5yb2xlU2VydmljZS5maW5kTGlzdEJ5UGFyYW1zKG51bGwpLnRoZW4oKHJlczpSZXNwb25zZVJlc3VsdDxBcnJheTxSb2xlPj4pPT57XHJcbiAgICAgICAgICAgICAgICBpZihyZXMuY29kZSA9PT0gMjAwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGVMaXN0ID0gcmVzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2Mg6I635Y+W6KeS6Imy5omA5pyJIOaLpeacieeahOWKn+iDveadg+mZkCDlubbliJ3lp4vljJbmlbDmja5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByb2xlSWRcclxuICAgICAqL1xyXG4gICAgZ2V0VXNlclJvbGVEYXRhKHJvbGVJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHJvbGVJZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJvbGVTZXJ2aWNlLmZpbmREZXRhaWwocm9sZUlkKS50aGVuKChyZXNwOiBSZXNwb25zZVJlc3VsdDxSb2xlRGV0YWlsUmVzdWx0PikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3AgJiYgcmVzcC5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZURhdGEgPSByZXNwLmRhdGE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0Um9sZURhdGEodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldERldmljZVRyZWVEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldEJ1c2luZXNzTGliRGF0YSh0cnVlKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRSb2xlRGF0YShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RGV2aWNlVHJlZURhdGEoKTtcclxuICAgICAgICAgICAgdGhpcy5nZXRCdXNpbmVzc0xpYkRhdGEoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBjaGFuZ2VSb2xlVHBsKCl7XHJcbiAgICAgICAgaWYoIXRoaXMuJHN0YXRlUGFyYW1zLnJvbGVJZCAmJiB0aGlzLnJvbGVUcGxJRCl7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZVNlcnZpY2UuZmluZERldGFpbCh0aGlzLnJvbGVUcGxJRCkudGhlbigocmVzcDogUmVzcG9uc2VSZXN1bHQ8Um9sZURldGFpbFJlc3VsdD4pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNwICYmIHJlc3AuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGVEYXRhLmZ1bmNNb2R1bGVMaXN0ID0gcmVzcC5kYXRhLmZ1bmNNb2R1bGVMaXN0O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZURhdGEuY2FtZXJhUG93ZXJMaXN0ID0gcmVzcC5kYXRhLmNhbWVyYVBvd2VyTGlzdDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGVEYXRhLndpZmlQb3dlckxpc3QgPSByZXNwLmRhdGEud2lmaVBvd2VyTGlzdDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGVEYXRhLnJtcGdhdGVQb3dlckxpc3QgPSByZXNwLmRhdGEucm1wZ2F0ZVBvd2VyTGlzdDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGVEYXRhLmVmZW5jZVBvd2VyTGlzdCA9IHJlc3AuZGF0YS5lZmVuY2VQb3dlckxpc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlRGF0YS5mYWNlbGliUG93ZXJMaXN0ID0gcmVzcC5kYXRhLmZhY2VsaWJQb3dlckxpc3Q7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0Um9sZUNoZWNrZWRNYXBEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRUcmVlRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0QnVzaW5lc3NMaWIodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2Mg5Yid5aeL5YyW6KeS6Imy5L+h5oGvXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzSGFzUm9sZVxyXG4gICAgICovXHJcbiAgICBpbml0Um9sZURhdGEoaXNIYXNSb2xlOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKCFpc0hhc1JvbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5yb2xlRGF0YS5yb2xlID0gbmV3IFJvbGUoKTtcclxuICAgICAgICAgICAgdGhpcy5yb2xlRGF0YS5mdW5jTW9kdWxlTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLnJvbGVEYXRhLmNhbWVyYVBvd2VyTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLnJvbGVEYXRhLndpZmlQb3dlckxpc3QgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5yb2xlRGF0YS5ybXBnYXRlUG93ZXJMaXN0ID0gW107XHJcbiAgICAgICAgICAgIHRoaXMucm9sZURhdGEuZWZlbmNlUG93ZXJMaXN0ID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdldEFsbEZ1bk1vZHVsZSgpLnRoZW4oKHJlc3VsdDogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRSb2xlQ2hlY2tlZE1hcERhdGEoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBpbml0VHJlZURhdGEoKSB7XHJcbiAgICAgICAgdGhpcy50cmVlUGFyYW1zLnRyZWVJZCA9ICdEZXZpY2VTZWxlY3RUcmVlJztcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMudHJlZURhdGFzID0gW107XHJcbiAgICAgICAgdGhpcy50cmVlUGFyYW1zLmlzU2hvd0ljb24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudHJlZVBhcmFtcy5pc1Nob3dMaW5lID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50cmVlUGFyYW1zLmNoZWNrRW5hYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMuaXNTaW5nbGVTZWxlY3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMuaXNTaW1wbGVEYXRhID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMub25DaGVjayA9IChldmVudDogRXZlbnQsIHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZTogYW55KTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdERldmljZVR5cGUgPT09IE9iamVjdFR5cGUuQ2FtZXJhLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdENhbWVyYUxpc3QgPSB0aGlzLmdldENoZWNrZWRMaXN0KFRyZWVUeXBlLmNhbWVyYS52YWx1ZSwgdHJlZUlkKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGVEYXRhLmNhbWVyYVBvd2VyTGlzdCA9IHRoaXMuc2VsZWN0Q2FtZXJhTGlzdC5tYXAoKGl0ZW06IENhbWVyYUV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBqID0ge30gYXMgVXNlclJvbGVEYXRhRXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGouT2JqZWN0SUQgPSBpdGVtLklEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqLk9iamVjdFR5cGUgPSBPYmplY3RUeXBlLkNhbWVyYS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgai5Sb2xlSUQgPSB0aGlzLnJvbGVEYXRhLnJvbGUuSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGoub3BlcmF0ZUxpc3QgPSBbQ2FtZXJhT3BlcmF0ZVR5cGUuUHJldmlldy52YWx1ZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBqO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3REZXZpY2VUeXBlID09PSBPYmplY3RUeXBlLldpZmkudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0V2lmaUxpc3QgPSB0aGlzLmdldENoZWNrZWRMaXN0KFRyZWVUeXBlLndpZmkudmFsdWUsIHRyZWVJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlRGF0YS53aWZpUG93ZXJMaXN0ID0gdGhpcy5zZWxlY3RXaWZpTGlzdC5tYXAoKGl0ZW06IFdpZmlFeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaiA9IHt9IGFzIFVzZXJSb2xlRGF0YUV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqLk9iamVjdElEID0gaXRlbS5JRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgai5PYmplY3RUeXBlID0gT2JqZWN0VHlwZS5XaWZpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqLlJvbGVJRCA9IHRoaXMucm9sZURhdGEucm9sZS5JRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgai5vcGVyYXRlTGlzdCA9IFtDYW1lcmFPcGVyYXRlVHlwZS5QcmV2aWV3LnZhbHVlXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGo7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdERldmljZVR5cGUgPT09IE9iamVjdFR5cGUuUm1wR2F0ZS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RSbXBnYXRlTGlzdCA9IHRoaXMuZ2V0Q2hlY2tlZExpc3QoVHJlZVR5cGUucm1wR2F0ZS52YWx1ZSwgdHJlZUlkKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGVEYXRhLnJtcGdhdGVQb3dlckxpc3QgPSB0aGlzLnNlbGVjdFJtcGdhdGVMaXN0Lm1hcCgoaXRlbTogUm1wR2F0ZUV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBqID0ge30gYXMgVXNlclJvbGVEYXRhRXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGouT2JqZWN0SUQgPSBpdGVtLklEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqLk9iamVjdFR5cGUgPSBPYmplY3RUeXBlLlJtcEdhdGUudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGouUm9sZUlEID0gdGhpcy5yb2xlRGF0YS5yb2xlLklEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqLm9wZXJhdGVMaXN0ID0gW0NhbWVyYU9wZXJhdGVUeXBlLlByZXZpZXcudmFsdWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gajtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdERldmljZVR5cGUgPT09IE9iamVjdFR5cGUuRWxlY3Ryb25pY0ZlbmNlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEVmZW5jZUxpc3QgPSB0aGlzLmdldENoZWNrZWRMaXN0KFRyZWVUeXBlLkVsZWN0cm9uaWNGZW5jZS52YWx1ZSwgdHJlZUlkKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGVEYXRhLmVmZW5jZVBvd2VyTGlzdCA9IHRoaXMuc2VsZWN0RWZlbmNlTGlzdC5tYXAoKGl0ZW06IEVsZWN0cm9uaWNGZW5jZUV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBqID0ge30gYXMgVXNlclJvbGVEYXRhRXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGouT2JqZWN0SUQgPSBpdGVtLklEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqLk9iamVjdFR5cGUgPSBPYmplY3RUeXBlLkVsZWN0cm9uaWNGZW5jZS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgai5Sb2xlSUQgPSB0aGlzLnJvbGVEYXRhLnJvbGUuSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGoub3BlcmF0ZUxpc3QgPSBbQ2FtZXJhT3BlcmF0ZVR5cGUuUHJldmlldy52YWx1ZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBqO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMudHJlZVBhcmFtcy50cmVlSW5pdENvbXBsZXRlID0gKHRyZWVJZDogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdERldmljZVR5cGUgPT09IE9iamVjdFR5cGUuQ2FtZXJhLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaWRzID0gdGhpcy5yb2xlRGF0YS5jYW1lcmFQb3dlckxpc3QubWFwKChpdGVtOiBVc2VyUm9sZURhdGFFeCkgPT4gaXRlbS5PYmplY3RJRCkgYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdENhbWVyYUxpc3QgPSB0aGlzLmRlZmF1bHRDaGVja1RyZWVCeUlkcyhUcmVlVHlwZS5jYW1lcmEudmFsdWUsIHRyZWVJZCwgaWRzKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdERldmljZVR5cGUgPT09IE9iamVjdFR5cGUuV2lmaS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkcyA9IHRoaXMucm9sZURhdGEud2lmaVBvd2VyTGlzdC5tYXAoKGl0ZW06IFVzZXJSb2xlRGF0YUV4KSA9PiBpdGVtLk9iamVjdElEKSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0V2lmaUxpc3QgPSB0aGlzLmRlZmF1bHRDaGVja1RyZWVCeUlkcyhUcmVlVHlwZS53aWZpLnZhbHVlLCB0cmVlSWQsIGlkcyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3REZXZpY2VUeXBlID09PSBPYmplY3RUeXBlLlJtcEdhdGUudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpZHMgPSB0aGlzLnJvbGVEYXRhLnJtcGdhdGVQb3dlckxpc3QubWFwKChpdGVtOiBVc2VyUm9sZURhdGFFeCkgPT4gaXRlbS5PYmplY3RJRCkgYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFJtcGdhdGVMaXN0ID0gdGhpcy5kZWZhdWx0Q2hlY2tUcmVlQnlJZHMoVHJlZVR5cGUucm1wR2F0ZS52YWx1ZSwgdHJlZUlkLCBpZHMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdERldmljZVR5cGUgPT09IE9iamVjdFR5cGUuRWxlY3Ryb25pY0ZlbmNlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaWRzID0gdGhpcy5yb2xlRGF0YS5lZmVuY2VQb3dlckxpc3QubWFwKChpdGVtOiBVc2VyUm9sZURhdGFFeCkgPT4gaXRlbS5PYmplY3RJRCkgYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEVmZW5jZUxpc3QgPSB0aGlzLmRlZmF1bHRDaGVja1RyZWVCeUlkcyhUcmVlVHlwZS5FbGVjdHJvbmljRmVuY2UudmFsdWUsIHRyZWVJZCwgaWRzKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNyZWF0ZSBieSB6eHFcclxuICAgICAqIOagueaNriDmlbDmja7pm4blkIgg5Yu+6YCJIOWvueW6lOeahOagkeiKgueCuVxyXG4gICAgICogQHRpbWU6IDIwMTctMDYtMTIgMTI6MDI6MzJcclxuICAgICAqIEBwYXJhbXM6IHRyZWVUeXBlIOWLvumAieiKgueCuSDmoJHnsbvlnovmoIfor4ZcclxuICAgICAqIEBwYXJhbXM6IHRyZWVJZCDli77pgInoioLngrkg5qCRSURcclxuICAgICAqIEBwYXJhbXM6IGlkcyDnu5PlkIhcclxuICAgICAqIEBwYXJhbXM6IHBhcmFtTmFtZSDljLnphY3lj4LmlbDlkI3np7Ag6buY6K6kIFwiSURcIlxyXG4gICAgICogQHJldHVybjpcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZWZhdWx0Q2hlY2tUcmVlQnlJZHMgPSAodHJlZVR5cGU6IHN0cmluZywgdHJlZUlkOiBzdHJpbmcsIGlkczogQXJyYXk8c3RyaW5nPiwgcGFyYW1OYW1lPzogc3RyaW5nKTogQXJyYXk8YW55PiA9PiB7XHJcbiAgICAgICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PGFueT47XHJcbiAgICAgICAgaWYgKCFwYXJhbU5hbWUpIHtcclxuICAgICAgICAgICAgcGFyYW1OYW1lID0gXCJJRFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaWRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IGNoZWNrUGFyYW1zTGlzdCA9IFtdIGFzIEFycmF5PHsga2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfT47XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChpZHMsICh2YWw6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2hlY2tQYXJhbXNMaXN0LnB1c2goe2tleTogcGFyYW1OYW1lLCB2YWx1ZTogdmFsfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmVlU2VydmljZS5jaGVja05vZGVzQnlQYXJhbXNMaXN0KHRyZWVJZCwgY2hlY2tQYXJhbXNMaXN0LCB0cnVlKSkge1xyXG4gICAgICAgICAgICAgICAgYXJyID0gdGhpcy5nZXRDaGVja2VkTGlzdCh0cmVlVHlwZSwgdHJlZUlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKiogY3JlYXRlIGJ5IHp4cVxyXG4gICAgICog6I635Y+W5bey6YCJ5oup55qEIOagkeiKgueCuembhuWQiFxyXG4gICAgICogQHRpbWU6IDIwMTctMDYtMTIgMTI6MDI6MzJcclxuICAgICAqIEBwYXJhbXM6IHRyZWVUeXBlIOWLvumAieiKgueCuSDmoJHnsbvlnovmoIfor4ZcclxuICAgICAqIEBwYXJhbXM6IHRyZWVJZCDli77pgInoioLngrkg5qCRSURcclxuICAgICAqIEByZXR1cm46IEFycmF5PENhbWVyYUV4PiZBcnJheTxCdXNpbmVzc0xpYkV4PiDoioLngrnpm4blkIgg57G75Z6L5LiOIHRyZWVUeXBlIOebuOWvueW6lFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldENoZWNrZWRMaXN0KHRyZWVUeXBlOiBzdHJpbmcsIHRyZWVJZDogc3RyaW5nKTogQXJyYXk8YW55PiB7XHJcbiAgICAgICAgbGV0IHRyZWVDaGVja2VkTm9kZXMgPSB0aGlzLnRyZWVTZXJ2aWNlLmdldENoZWNrZWROb2Rlcyh0cmVlSWQsIHRydWUpO1xyXG4gICAgICAgIGxldCByZXN1bHQ6IEFycmF5PGFueSAmIEFyZWFFeD4gPSBbXSBhcyBBcnJheTxhbnkgJiBBcmVhRXg+O1xyXG4gICAgICAgIGlmICh0cmVlQ2hlY2tlZE5vZGVzKSB7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh0cmVlQ2hlY2tlZE5vZGVzLCAodmFsOiBhbnkgJiBBcmVhRXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWwudHJlZVR5cGUgPT09IHRyZWVUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godmFsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGV2aWNlVHJlZURhdGEoKSB7XHJcbiAgICAgICAgbGV0IF9zZWxmID0gdGhpcyBhcyBOZXdSb2xlQ29udHJvbGxlcjtcclxuICAgICAgICBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgIF9zZWxmLmNvbm5lY3RUcmVlU2VydmljZS5maW5kQXJlYUNhbWVyYSgpLFxyXG4gICAgICAgICAgICBfc2VsZi5jb25uZWN0VHJlZVNlcnZpY2UuZmluZEFyZWFXaXRoV2lmaSgpLFxyXG4gICAgICAgICAgICBfc2VsZi5jb25uZWN0VHJlZVNlcnZpY2UuZmluZEFyZWFXaXRoUm1wZ2F0ZSgpLFxyXG4gICAgICAgICAgICBfc2VsZi5jb25uZWN0VHJlZVNlcnZpY2UuZmluZEFyZWFXaXRoRWxlY3Ryb25pY2ZlbmNlKClcclxuICAgICAgICBdKS50aGVuKChyZXM6IEFycmF5PGFueT4pID0+IHtcclxuICAgICAgICAgICAgX3NlbGYuY2FtZXJhVHJlZURhdGEgPSByZXNbMF07XHJcbiAgICAgICAgICAgIF9zZWxmLndpZmlUcmVlRGF0YSA9IHJlc1sxXTtcclxuICAgICAgICAgICAgX3NlbGYucm1wZ2F0ZVRyZWVEYXRhID0gcmVzWzJdO1xyXG4gICAgICAgICAgICBfc2VsZi5lZmVuY2VUcmVlRGF0YSA9IHJlc1szXTtcclxuICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRUcmVlRGF0YUZvclR5cGUoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldEJ1c2luZXNzTGliRGF0YShpc1VwZGF0ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuYnVzaW5lc3NMaWJTZXJ2aWNlLmZpbmRUcmVlQXJlYVdpdGhSb2xlKCkudGhlbigocmVzOiBSZXNwb25zZVJlc3VsdDxBcnJheTxhbnk+PikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZhY2VMaWJMaXN0ID0gdGhpcy5mb3JtYXRGYWNlTGliTGlzdChyZXMuZGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjZUxpYkxpc3RNYXAgPSB0aGlzLmZvcm1hdEZhY2VMaWJMaXN0Rm9yTWFwKHJlcy5kYXRhKTtcclxuICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pbml0QnVzaW5lc3NMaWIoaXNVcGRhdGUpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBpbml0QnVzaW5lc3NMaWIoaXNVcGRhdGU6IGJvb2xlYW4pIHtcclxuICAgICAgICBmb3IgKGxldCBrIGluIHRoaXMuZmFjZUxpYkxpc3RNYXApIHtcclxuICAgICAgICAgICAgdGhpcy5mYWNlTGliTGlzdE1hcFtrXS5Jc0VuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5mYWNlTGliTGlzdE1hcFtrXS5jaGVja2JveFN0YXR1cyA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNVcGRhdGUpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgayBpbiB0aGlzLmZhY2VMaWJMaXN0TWFwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGVEYXRhLmZhY2VsaWJQb3dlckxpc3QuZm9yRWFjaCgoTW9kdWxlSXRlbUV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZmFjZUxpYkxpc3RNYXBba10uSUQgPT09IE1vZHVsZUl0ZW1FeC5PYmplY3RJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZhY2VMaWJMaXN0TWFwW2tdLklzRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1vZHVsZUl0ZW1FeC5vcGVyYXRlTGlzdC5mb3JFYWNoKChvcGVyYXRlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmFjZUxpYkxpc3RNYXBba10ub3BlcmF0ZUZvckZhY2VMaWIuZm9yRWFjaCgoaXRlbTogT3BlcmF0ZUZvckZhY2VMaWJFbnVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uSXNTbGlkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLlNsaWRlTGlzdC5mb3JFYWNoKChpdGVtMjogT3BlcmF0ZUZvckZhY2VMaWJFbnVtLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbTIudmFsdWUgPT09IG9wZXJhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLlNsaWRlSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLklzRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGUgPT09IGl0ZW0udmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uSXNFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoZWNrZWRXaXRoRmFjZUxpYigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDaGVja2VkV2l0aEZhY2VMaWIoKSB7XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGsgaW4gdGhpcy5mYWNlTGliTGlzdE1hcCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZhY2VMaWIgPSB0aGlzLmZhY2VMaWJMaXN0TWFwW2tdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PGJvb2xlYW4+O1xyXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZmFjZUxpYi5vcGVyYXRlRm9yRmFjZUxpYikgJiYgZmFjZUxpYi5vcGVyYXRlRm9yRmFjZUxpYi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPIOi/m+WFpeatpOWkhOadoeS7tiDku6PooajmmK/mnIDkuIvnuqfoj5zljZXvvIzlj6rmnInmk43kvZzmnYPpmZAg5Yik5pat5omA5pyJ5pON5L2c5p2D6ZmQIOi/lOWbnmNoZWNrYm94U3RhdHVz5YC8XHJcbiAgICAgICAgICAgICAgICAgICAgZmFjZUxpYi5vcGVyYXRlRm9yRmFjZUxpYi5mb3JFYWNoKChpdGVtOiBPcGVyYXRlRm9yRmFjZUxpYkVudW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goaXRlbS5Jc0VuYWJsZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETyDov5vlhaXmraTlpITmnaHku7Yg5YiZ5pyJ5a2Q57qn77yM5Yik5pat5a2Q57qn5omA5LulSXNFbmFibGVk54q25oCBIOi/lOWbnmNoZWNrYm94U3RhdHVz5YC8XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayBpbiB0aGlzLmZhY2VMaWJMaXN0TWFwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmYWNlTGliLklEID09PSB0aGlzLmZhY2VMaWJMaXN0TWFwW2tdLlBhcmVudElEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGRNb2R1bGUgPSB0aGlzLmZhY2VMaWJMaXN0TWFwW2tdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETyDpgJLlvZLorrDlvZXmiYDmnInnmoTlrZDnuqfnirbmgIFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRm4gPSAobGliOiBBcmVhRXggJiBVc2VyUm9sZURhdGFFeCAmIEJ1c2luZXNzTGliRXggJiBGYWNlTGliQ2hlY3RlZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKGxpYi5Jc0VuYWJsZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGxpYi5vcGVyYXRlRm9yRmFjZUxpYikgJiYgbGliLm9wZXJhdGVGb3JGYWNlTGliLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGliLm9wZXJhdGVGb3JGYWNlTGliLmZvckVhY2goKGl0ZW06IE9wZXJhdGVGb3JGYWNlTGliRW51bSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goaXRlbS5Jc0VuYWJsZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLmZhY2VMaWJMaXN0TWFwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGliLklEID09PSB0aGlzLmZhY2VMaWJMaXN0TWFwW2tleV0uUGFyZW50SUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnIucHVzaCh0aGlzLmZhY2VMaWJMaXN0TWFwW2tleV0uSXNFbmFibGVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRm4odGhpcy5mYWNlTGliTGlzdE1hcFtrZXldKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRm4oY2hpbGRNb2R1bGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyLmluZGV4T2YoZmFsc2UpID4gLTEgJiYgYXJyLmluZGV4T2YodHJ1ZSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZhY2VMaWIuY2hlY2tib3hTdGF0dXMgPSAxXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyLmluZGV4T2YoZmFsc2UpID09PSAtMSAmJiBhcnIuaW5kZXhPZih0cnVlKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmFjZUxpYi5jaGVja2JveFN0YXR1cyA9IDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhcnIuaW5kZXhPZihmYWxzZSkgPiAtMSAmJiBhcnIuaW5kZXhPZih0cnVlKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBmYWNlTGliLmNoZWNrYm94U3RhdHVzID0gLTFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlU2VsZWN0QXJlYUxpYihpdGVtOiBhbnksIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RBcmVhTGliSW5kZXggIT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RBcmVhTGliSW5kZXggPSBpbmRleFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VGYWNlTGliQWN0aW9uU3RhdHVzKGl0ZW06IE9wZXJhdGVGb3JGYWNlTGliRW51bSkge1xyXG4gICAgICAgIGl0ZW0uSXNFbmFibGVkID0gIWl0ZW0uSXNFbmFibGVkO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRmFjZUxpYklzRW5hZGJsZWRQYXJlbnQoaXRlbSwgaXRlbS5Jc0VuYWJsZWQpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ2hlY2tlZFdpdGhGYWNlTGliKClcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VGYWNlTGliQWN0aW9uU3RhdHVzMihpdGVtOiBPcGVyYXRlRm9yRmFjZUxpYkVudW0sIGluZGV4OiBudW1iZXIsIGFjdGlvbjogT3BlcmF0ZUZvckZhY2VMaWJFbnVtKSB7XHJcbiAgICAgICAgYWN0aW9uLlNsaWRlSW5kZXggPSBpbmRleDtcclxuICAgICAgICBpbmRleCA9PT0gLTEgPyBhY3Rpb24uSXNFbmFibGVkID0gZmFsc2UgOiBhY3Rpb24uSXNFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUZhY2VMaWJJc0VuYWRibGVkUGFyZW50KGFjdGlvbiwgYWN0aW9uLklzRW5hYmxlZCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDaGVja2VkV2l0aEZhY2VMaWIoKVxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZUNoZWNrZWRMaWJTdGF0dXMoaXRlbTogQXJlYUV4ICYgVXNlclJvbGVEYXRhRXggJiBCdXNpbmVzc0xpYkV4ICYgRmFjZUxpYkNoZWN0ZWQsIHN0YXR1czogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IElzRW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChzdGF0dXMgPT0gMSB8fCBzdGF0dXMgPT0gLTEpIHtcclxuICAgICAgICAgICAgSXNFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXRlbS5Jc0VuYWJsZWQgPSBJc0VuYWJsZWQ7XHJcbiAgICAgICAgdGhpcy51cGRhdGVGYWNlTGliSXNFbmFkYmxlZENoaWxkKGl0ZW0sIElzRW5hYmxlZCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVGYWNlTGliSXNFbmFkYmxlZFBhcmVudChpdGVtLCBJc0VuYWJsZWQpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ2hlY2tlZFdpdGhGYWNlTGliKClcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVGYWNlTGliSXNFbmFkYmxlZFBhcmVudChpdGVtOiBhbnksIElzRW5hYmxlZDogYm9vbGVhbikge1xyXG4gICAgICAgIGlmIChJc0VuYWJsZWQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZmFjZUxpYkxpc3RNYXBbaXRlbS5QYXJlbnRJRF0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmFjZUxpYkxpc3RNYXBbaXRlbS5QYXJlbnRJRF0uSXNFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZhY2VMaWJMaXN0TWFwW2l0ZW0uUGFyZW50SURdLlBhcmVudElEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWNlTGliTGlzdE1hcFt0aGlzLmZhY2VMaWJMaXN0TWFwW2l0ZW0uUGFyZW50SURdLlBhcmVudElEXS5Jc0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZmFjZUxpYkxpc3RNYXBbaXRlbS5QYXJlbnRJRF0pIHtcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wRm4gPSAoaXRlbTI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpc0hhdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrIGluIHRoaXMuZmFjZUxpYkxpc3RNYXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0yLlBhcmVudElEID09PSB0aGlzLmZhY2VMaWJMaXN0TWFwW2tdLlBhcmVudElEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0hhdmUgPSB0aGlzLmZhY2VMaWJMaXN0TWFwW2tdLklzRW5hYmxlZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZhY2VMaWJMaXN0TWFwW3RoaXMuZmFjZUxpYkxpc3RNYXBba10uUGFyZW50SURdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEZuKHRoaXMuZmFjZUxpYkxpc3RNYXBbdGhpcy5mYWNlTGliTGlzdE1hcFtrXS5QYXJlbnRJRF0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbTIuSXNFbmFibGVkID0gaXNIYXZlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVGYWNlTGliSXNFbmFkYmxlZENoaWxkKGl0ZW06IGFueSwgSXNFbmFibGVkOiBib29sZWFuKSB7XHJcbiAgICAgICAgbGV0IHRlbXBGbiA9IChpdGVtMjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtMi5vcGVyYXRlRm9yRmFjZUxpYikge1xyXG4gICAgICAgICAgICAgICAgaXRlbTIub3BlcmF0ZUZvckZhY2VMaWIuZm9yRWFjaCgoYWN0aW9uOiBPcGVyYXRlRm9yRmFjZUxpYkVudW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24uSXNFbmFibGVkID0gSXNFbmFibGVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24uSXNTbGlkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJc0VuYWJsZWQgPyBhY3Rpb24uU2xpZGVJbmRleCA9IDAgOiBhY3Rpb24uU2xpZGVJbmRleCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrIGluIHRoaXMuZmFjZUxpYkxpc3RNYXApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbTIuSUQgPT09IHRoaXMuZmFjZUxpYkxpc3RNYXBba10uUGFyZW50SUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWNlTGliTGlzdE1hcFtrXS5Jc0VuYWJsZWQgPSBJc0VuYWJsZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBGbih0aGlzLmZhY2VMaWJMaXN0TWFwW3RoaXMuZmFjZUxpYkxpc3RNYXBba10uSURdKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGVtcEZuKGl0ZW0pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2Mg5Yid5aeL5YyW6Lev55Sx6YCJ5Lit54q25oCBXHJcbiAgICAgKi9cclxuICAgIGluaXRSb2xlQ2hlY2tlZE1hcERhdGEoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgayBpbiB0aGlzLmZ1bmNNb2R1bGVMaXN0TWFwKSB7XHJcbiAgICAgICAgICAgIC8vVE9ETyDliJ3lp4vljJbmiYDmnInmqKHlnZdJc0VuYWJsZWTnirbmgIFcclxuICAgICAgICAgICAgdGhpcy5mdW5jTW9kdWxlTGlzdE1hcFtrXS5Jc0VuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5mdW5jTW9kdWxlTGlzdE1hcFtrXS5vcGVyYXRlSXRlbUxpc3QpICYmIHRoaXMuZnVuY01vZHVsZUxpc3RNYXBba10ub3BlcmF0ZUl0ZW1MaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnVuY01vZHVsZUxpc3RNYXBba10ub3BlcmF0ZUl0ZW1MaXN0LmZvckVhY2goKGl0ZW06IE1vZHVsZUl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLklzRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9UT0RPIOabtOaWsOeOsOacieeahOaooeWdl0lzRW5hYmxlZOeKtuaAgVxyXG4gICAgICAgICAgICB0aGlzLnJvbGVEYXRhLmZ1bmNNb2R1bGVMaXN0LmZvckVhY2goKGl0ZW06IFVzZXJSb2xlRGF0YUV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mdW5jTW9kdWxlTGlzdE1hcFtrXS5GdWxsTmFtZVNwYWNlUGF0aCA9PT0gaXRlbS5PYmplY3RJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnVuY01vZHVsZUxpc3RNYXBba10uSXNFbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPIOabtOaWsOeOsOacieeahOaooeWdl+aMiemSruadg+mZkOeKtuaAgVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLm9wZXJhdGVMaXN0Lmxlbmd0aCA+IDAgJiYgQXJyYXkuaXNBcnJheSh0aGlzLmZ1bmNNb2R1bGVMaXN0TWFwW2tdLm9wZXJhdGVJdGVtTGlzdCkgJiYgdGhpcy5mdW5jTW9kdWxlTGlzdE1hcFtrXS5vcGVyYXRlSXRlbUxpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGlzdCA9IGFuZ3VsYXIuY29weShpdGVtLm9wZXJhdGVMaXN0KSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZ1bmNNb2R1bGVMaXN0TWFwW2tdLm9wZXJhdGVJdGVtTGlzdC5mb3JFYWNoKChpdGVtMjogTW9kdWxlSXRlbUV4LCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXNDaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbTIuRnVsbE5hbWVTcGFjZVBhdGggPT09IGxpc3RbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mdW5jTW9kdWxlTGlzdE1hcFtrXS5vcGVyYXRlSXRlbUxpc3RbaW5kZXhdLklzRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3Quc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNDaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mdW5jTW9kdWxlTGlzdE1hcFtrXS5vcGVyYXRlSXRlbUxpc3RbaW5kZXhdLklzRW5hYmxlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXR1c0ZvcklzRW5hYmxlZCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIOabtOaWsOaJgOaciWNoZWNrYm9454q25oCBXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlU3RhdHVzRm9ySXNFbmFibGVkKCkge1xyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBrIGluIHRoaXMuZnVuY01vZHVsZUxpc3RNYXApIHtcclxuICAgICAgICAgICAgICAgIGxldCBtb2R1bGUgPSB0aGlzLmZ1bmNNb2R1bGVMaXN0TWFwW2tdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PGJvb2xlYW4+O1xyXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobW9kdWxlLm9wZXJhdGVJdGVtTGlzdCkgJiYgbW9kdWxlLm9wZXJhdGVJdGVtTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPIOi/m+WFpeatpOWkhOadoeS7tiDku6PooajmmK/mnIDkuIvnuqfoj5zljZXvvIzlj6rmnInmk43kvZzmnYPpmZAg5Yik5pat5omA5pyJ5pON5L2c5p2D6ZmQIOi/lOWbnmNoZWNrYm94U3RhdHVz5YC8XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlLm9wZXJhdGVJdGVtTGlzdC5mb3JFYWNoKChpdGVtOiBNb2R1bGVJdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKGl0ZW0uSXNFbmFibGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1RPRE8g6L+b5YWl5q2k5aSE5p2h5Lu2IOWImeacieWtkOe6p++8jOWIpOaWreWtkOe6p+aJgOS7pUlzRW5hYmxlZOeKtuaAgSDov5Tlm55jaGVja2JveFN0YXR1c+WAvFxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgaW4gdGhpcy5mdW5jTW9kdWxlTGlzdE1hcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9kdWxlLktleSA9PT0gdGhpcy5mdW5jTW9kdWxlTGlzdE1hcFtrXS5QYXJlbnRLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZE1vZHVsZSA9IHRoaXMuZnVuY01vZHVsZUxpc3RNYXBba107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9UT0RPIOmAkuW9kuiusOW9leaJgOacieeahOWtkOe6p+eKtuaAgVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBGbiA9IChtb2RlbDogTW9kdWxlSXRlbUV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2gobW9kZWwuSXNFbmFibGVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtb2RlbC5vcGVyYXRlSXRlbUxpc3QpICYmIG1vZGVsLm9wZXJhdGVJdGVtTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLm9wZXJhdGVJdGVtTGlzdC5mb3JFYWNoKChpdGVtOiBNb2R1bGVJdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChpdGVtLklzRW5hYmxlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuZnVuY01vZHVsZUxpc3RNYXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2RlbC5LZXkgPT09IHRoaXMuZnVuY01vZHVsZUxpc3RNYXBba2V5XS5QYXJlbnRLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnIucHVzaCh0aGlzLmZ1bmNNb2R1bGVMaXN0TWFwW2tleV0uSXNFbmFibGVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRm4odGhpcy5mdW5jTW9kdWxlTGlzdE1hcFtrZXldKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRm4oY2hpbGRNb2R1bGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyLmluZGV4T2YoZmFsc2UpID4gLTEgJiYgYXJyLmluZGV4T2YodHJ1ZSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZS5jaGVja2JveFN0YXR1cyA9IDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhcnIuaW5kZXhPZihmYWxzZSkgPT09IC0xICYmIGFyci5pbmRleE9mKHRydWUpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb2R1bGUuY2hlY2tib3hTdGF0dXMgPSAwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyLmluZGV4T2YoZmFsc2UpID4gLTEgJiYgYXJyLmluZGV4T2YodHJ1ZSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlLmNoZWNrYm94U3RhdHVzID0gLTFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL1RPRE8g5pu05paw5b2T5p2D54q25oCB6LCD55So5pu05paw54i26IqC54K55ZKM5a2Q6IqC54K555qE5pa55rOVXHJcbiAgICBjaGFuZ2VDaGVja2VkU3RhdHVzKG1vZHVsZTogTW9kdWxlSXRlbUV4LCBzdGF0dXM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBpc0VuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBpZiAoc3RhdHVzID09IDEgfHwgc3RhdHVzID09IC0xKSB7XHJcbiAgICAgICAgICAgIGlzRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1vZHVsZS5Jc0VuYWJsZWQgPSBpc0VuYWJsZWQ7XHJcbiAgICAgICAgdGhpcy5jaGVja2VkSXNFbmFibGVGb3JDaGlsZHJlbihtb2R1bGUsIGlzRW5hYmxlZCk7XHJcbiAgICAgICAgdGhpcy5jaGVja2VkSXNFbmFibGVGb3JQYXJlbnQobW9kdWxlLCBpc0VuYWJsZWQpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdHVzRm9ySXNFbmFibGVkKClcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VTZWxlY3REZXZpY2UoaXRlbTogRW51bSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0RGV2aWNlVHlwZSA9IGl0ZW0udmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZXRUcmVlRGF0YUZvclR5cGUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVEZXZpY2VTZWxlY3RlZChpdGVtOiBhbnksIGlzUmVtb3ZlQWxsOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0RGV2aWNlVHlwZSA9PT0gT2JqZWN0VHlwZS5DYW1lcmEudmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZURhdGEuY2FtZXJhUG93ZXJMaXN0ID0gdGhpcy5yb2xlRGF0YS5jYW1lcmFQb3dlckxpc3QuZmlsdGVyKChpdGVtMjogVXNlclJvbGVEYXRhRXgpID0+IGl0ZW0yLk9iamVjdElEID09PSBpdGVtLklEKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWVTZXJ2aWNlLnVwZGF0ZU5vZGVDaGVja2VkKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsIGl0ZW0udElkLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RDYW1lcmFMaXN0ID0gdGhpcy5nZXRDaGVja2VkTGlzdChUcmVlVHlwZS5jYW1lcmEudmFsdWUsIHRoaXMudHJlZVBhcmFtcy50cmVlSWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzUmVtb3ZlQWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlRGF0YS5jYW1lcmFQb3dlckxpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50cmVlU2VydmljZS5jaGVja0FsbE5vZGVzKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsIGZhbHNlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdENhbWVyYUxpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0RGV2aWNlVHlwZSA9PT0gT2JqZWN0VHlwZS5XaWZpLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGVEYXRhLndpZmlQb3dlckxpc3QgPSB0aGlzLnJvbGVEYXRhLndpZmlQb3dlckxpc3QuZmlsdGVyKChpdGVtMjogVXNlclJvbGVEYXRhRXgpID0+IGl0ZW0yLk9iamVjdElEID09PSBpdGVtLklEKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWVTZXJ2aWNlLnVwZGF0ZU5vZGVDaGVja2VkKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsIGl0ZW0udElkLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RXaWZpTGlzdCA9IHRoaXMuZ2V0Q2hlY2tlZExpc3QoVHJlZVR5cGUud2lmaS52YWx1ZSwgdGhpcy50cmVlUGFyYW1zLnRyZWVJZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNSZW1vdmVBbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGVEYXRhLndpZmlQb3dlckxpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50cmVlU2VydmljZS5jaGVja0FsbE5vZGVzKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsIGZhbHNlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFdpZmlMaXN0ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0RGV2aWNlVHlwZSA9PT0gT2JqZWN0VHlwZS5SbXBHYXRlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGVEYXRhLnJtcGdhdGVQb3dlckxpc3QgPSB0aGlzLnJvbGVEYXRhLnJtcGdhdGVQb3dlckxpc3QuZmlsdGVyKChpdGVtMjogVXNlclJvbGVEYXRhRXgpID0+IGl0ZW0yLk9iamVjdElEID09PSBpdGVtLklEKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWVTZXJ2aWNlLnVwZGF0ZU5vZGVDaGVja2VkKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsIGl0ZW0udElkLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RSbXBnYXRlTGlzdCA9IHRoaXMuZ2V0Q2hlY2tlZExpc3QoVHJlZVR5cGUucm1wR2F0ZS52YWx1ZSwgdGhpcy50cmVlUGFyYW1zLnRyZWVJZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNSZW1vdmVBbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGVEYXRhLnJtcGdhdGVQb3dlckxpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50cmVlU2VydmljZS5jaGVja0FsbE5vZGVzKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsIGZhbHNlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFJtcGdhdGVMaXN0ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0RGV2aWNlVHlwZSA9PT0gT2JqZWN0VHlwZS5FbGVjdHJvbmljRmVuY2UudmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZURhdGEuZWZlbmNlUG93ZXJMaXN0ID0gdGhpcy5yb2xlRGF0YS5lZmVuY2VQb3dlckxpc3QuZmlsdGVyKChpdGVtMjogVXNlclJvbGVEYXRhRXgpID0+IGl0ZW0yLk9iamVjdElEID09PSBpdGVtLklEKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWVTZXJ2aWNlLnVwZGF0ZU5vZGVDaGVja2VkKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsIGl0ZW0udElkLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RFZmVuY2VMaXN0ID0gdGhpcy5nZXRDaGVja2VkTGlzdChUcmVlVHlwZS5FbGVjdHJvbmljRmVuY2UudmFsdWUsIHRoaXMudHJlZVBhcmFtcy50cmVlSWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzUmVtb3ZlQWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlRGF0YS5lZmVuY2VQb3dlckxpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50cmVlU2VydmljZS5jaGVja0FsbE5vZGVzKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsIGZhbHNlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEVmZW5jZUxpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0VHJlZURhdGFGb3JUeXBlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdERldmljZVR5cGUgPT09IE9iamVjdFR5cGUuQ2FtZXJhLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmVlUGFyYW1zLnRyZWVEYXRhcyA9IHRoaXMuY2FtZXJhVHJlZURhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zZWxlY3REZXZpY2VUeXBlID09PSBPYmplY3RUeXBlLldpZmkudmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWVQYXJhbXMudHJlZURhdGFzID0gdGhpcy53aWZpVHJlZURhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zZWxlY3REZXZpY2VUeXBlID09PSBPYmplY3RUeXBlLlJtcEdhdGUudmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWVQYXJhbXMudHJlZURhdGFzID0gdGhpcy5ybXBnYXRlVHJlZURhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zZWxlY3REZXZpY2VUeXBlID09PSBPYmplY3RUeXBlLkVsZWN0cm9uaWNGZW5jZS52YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJlZVBhcmFtcy50cmVlRGF0YXMgPSB0aGlzLmVmZW5jZVRyZWVEYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAvL1RPRE8g5pu05paw6IqC54K55LiL5omA5pyJ54i26IqC54K555qESXNFbmFibGVk54q25oCBXHJcbiAgICAgKiBAZGVzYyDmoLnmja7oioLngrnmnaXmm7TmlrDmiYDmnInnmoTniLboioLngrnnmoRJc0Rpc2FibGVk54q25oCBXHJcbiAgICAgKiBAcGFyYW0ge01vZHVsZUl0ZW1FeH0gbW9kdWxlXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzRW5hYmxlZFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNoZWNrZWRJc0VuYWJsZUZvclBhcmVudChtb2R1bGU6IE1vZHVsZUl0ZW1FeCwgaXNFbmFibGVkOiBib29sZWFuKSB7XHJcbiAgICAgICAgLy9UT0RPIOaYr+WQpuacieeItuiKgueCuVxyXG4gICAgICAgIGlmICh0aGlzLmZ1bmNNb2R1bGVMaXN0TWFwW21vZHVsZS5QYXJlbnRLZXldKSB7XHJcbiAgICAgICAgICAgIGlmIChpc0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnVuY01vZHVsZUxpc3RNYXBbbW9kdWxlLlBhcmVudEtleV0uSXNFbmFibGVkID0gaXNFbmFibGVkO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IGlzSGF2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy9UT0RPIOWIpOaWreatpOeItuiKgueCueS4i+aYr+WQpui/mOacieWFtuS7luWtkOiKgueCueiiq+WLvumAiVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayBpbiB0aGlzLmZ1bmNNb2R1bGVMaXN0TWFwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZHVsZS5QYXJlbnRLZXkgPT09IHRoaXMuZnVuY01vZHVsZUxpc3RNYXBba10uUGFyZW50S2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzSGF2ZSA9IHRoaXMuZnVuY01vZHVsZUxpc3RNYXBba10uSXNFbmFibGVkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZnVuY01vZHVsZUxpc3RNYXBbbW9kdWxlLlBhcmVudEtleV0uSXNFbmFibGVkID0gaXNIYXZlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vVE9ETyDpgJLlvZLlr7nlhbbniLboioLngrnmiafooYxcclxuICAgICAgICAgICAgdGhpcy5jaGVja2VkSXNFbmFibGVGb3JQYXJlbnQodGhpcy5mdW5jTW9kdWxlTGlzdE1hcFttb2R1bGUuUGFyZW50S2V5XSwgaXNFbmFibGVkKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8g5pu05paw6IqC54K55LiL5omA5pyJ5a2Q6IqC54K555qESXNFbmFibGVk54q25oCBXHJcbiAgICBwcml2YXRlIGNoZWNrZWRJc0VuYWJsZUZvckNoaWxkcmVuKG1vZHVsZTogTW9kdWxlSXRlbUV4LCBpc0VuYWJsZWQ6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAobW9kdWxlLm9wZXJhdGVJdGVtTGlzdCkge1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtb2R1bGUub3BlcmF0ZUl0ZW1MaXN0KSAmJiBtb2R1bGUub3BlcmF0ZUl0ZW1MaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIG1vZHVsZS5vcGVyYXRlSXRlbUxpc3QuZm9yRWFjaCgoaXRlbTogTW9kdWxlSXRlbUV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5Jc0VuYWJsZWQgPSBpc0VuYWJsZWRcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBrIGluIHRoaXMuZnVuY01vZHVsZUxpc3RNYXApIHtcclxuICAgICAgICAgICAgICAgIGlmIChtb2R1bGUuS2V5ID09PSB0aGlzLmZ1bmNNb2R1bGVMaXN0TWFwW2tdLlBhcmVudEtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnVuY01vZHVsZUxpc3RNYXBba10uSXNFbmFibGVkID0gaXNFbmFibGVkO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tlZElzRW5hYmxlRm9yQ2hpbGRyZW4odGhpcy5mdW5jTW9kdWxlTGlzdE1hcFtrXSwgaXNFbmFibGVkKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgY2hhbmdlQWN0aW9uU3RhdHVzKG9wcmF0ZTogTW9kdWxlSXRlbUV4KSB7XHJcbiAgICAgICAgb3ByYXRlLklzRW5hYmxlZCA9ICFvcHJhdGUuSXNFbmFibGVkO1xyXG4gICAgICAgIHRoaXMuY2hlY2tlZElzRW5hYmxlRm9yUGFyZW50KG9wcmF0ZSwgb3ByYXRlLklzRW5hYmxlZCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0dXNGb3JJc0VuYWJsZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VTZWxlY3RNb2R1bGUoaXRlbTogTW9kdWxlSXRlbUV4LCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0TW9kdWxlSW5kZXggIT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNb2R1bGVJbmRleCA9IGluZGV4XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVNlbGVjdFRhYihpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0VGFiSW5kZXggIT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWJJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdFRyZWVEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmVlUGFyYW1zLnRyZWVJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJlZURhdGFGb3JUeXBlKClcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvL+iOt+WPluaJgOacieWKn+iDveadg+mZkOmFjee9rumhuVxyXG4gICAgZ2V0QWxsRnVuTW9kdWxlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvbGVTZXJ2aWNlLmdldEFsbEZ1bk1vZHVsZSgpLnRoZW4oKHJlc3A6IFJlc3BvbnNlUmVzdWx0PEFycmF5PE1vZHVsZUl0ZW1FeD4+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwICYmIHJlc3AuY29kZSA9PSAyMDAgJiYgcmVzcC5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZ1bmNNb2R1bGVMaXN0ID0gdGhpcy5mb3JtYXRGdW5jTW9kdWxlTGlzdChyZXNwLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mdW5jTW9kdWxlTGlzdE1hcCA9IHRoaXMuZm9ybWF0RnVuY01vZHVsZUxpc3RGb3JNYXAocmVzcC5kYXRhKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8v5Yqf6IO95qih5Z2X5pWw5o2uIOagkeW9oue7k+aehOagvOW8j+WMliAxLui9rOagkVxyXG4gICAgcHJpdmF0ZSBmb3JtYXRGdW5jTW9kdWxlTGlzdChtTGlzdDogQXJyYXk8TW9kdWxlSXRlbUV4Pik6IEFycmF5PE1vZHVsZUl0ZW1FeD4ge1xyXG4gICAgICAgIGxldCB0cmVlUmVzdWx0OiBBcnJheTxNb2R1bGVJdGVtRXg+ID0gW107XHJcbiAgICAgICAgaWYgKG1MaXN0KSB7XHJcbiAgICAgICAgICAgIHRyZWVSZXN1bHQgPSBQb3J0cmFpdFRvb2wuY29udmVydDJadHJlZShtTGlzdCwgXCJLZXlcIiwgXCJQYXJlbnRLZXlcIiwgXCJjaGlsZHJlblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRyZWVSZXN1bHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgZm9ybWF0RmFjZUxpYkxpc3QobUxpc3Q6IEFycmF5PEFyZWFFeCAmIFVzZXJSb2xlRGF0YUV4ICYgQnVzaW5lc3NMaWJFeCAmIEZhY2VMaWJDaGVjdGVkPik6IEFycmF5PEFyZWFFeCAmIFVzZXJSb2xlRGF0YUV4ICYgQnVzaW5lc3NMaWJFeCAmIEZhY2VMaWJDaGVjdGVkPiB7XHJcbiAgICAgICAgbGV0IHRyZWVSZXN1bHQ6IEFycmF5PEFyZWFFeCAmIFVzZXJSb2xlRGF0YUV4ICYgQnVzaW5lc3NMaWJFeCAmIEZhY2VMaWJDaGVjdGVkPiA9IFtdO1xyXG4gICAgICAgIGlmIChtTGlzdCkge1xyXG4gICAgICAgICAgICB0cmVlUmVzdWx0ID0gUG9ydHJhaXRUb29sLmNvbnZlcnQyWnRyZWUobUxpc3QsIFwiSURcIiwgXCJQYXJlbnRJRFwiLCBcImNoaWxkcmVuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJlZVJlc3VsdDtcclxuICAgIH07XHJcblxyXG4gICAgLy/lip/og73mqKHlnZfmlbDmja4g5qCR5b2i57uT5p6E5qC85byP5YyWIDEu6L2s5qCRXHJcbiAgICBwcml2YXRlIGZvcm1hdEZ1bmNNb2R1bGVMaXN0Rm9yTWFwKG1MaXN0OiBBcnJheTxNb2R1bGVJdGVtRXg+KTogeyBba2V5OiBzdHJpbmddOiBNb2R1bGVJdGVtRXggfSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHt9IGFzIHsgW2tleTogc3RyaW5nXTogTW9kdWxlSXRlbUV4IH07XHJcbiAgICAgICAgbUxpc3QuZm9yRWFjaCgoaXRlbTogTW9kdWxlSXRlbUV4KSA9PiB7XHJcbiAgICAgICAgICAgIHJlc3VsdFtpdGVtLktleV0gPSBpdGVtO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIC8v5Yqf6IO95qih5Z2X5pWw5o2uIOagkeW9oue7k+aehOagvOW8j+WMliAxLui9rOagkVxyXG4gICAgcHJpdmF0ZSBmb3JtYXRGYWNlTGliTGlzdEZvck1hcChtTGlzdDogQXJyYXk8QXJlYUV4ICYgVXNlclJvbGVEYXRhRXggJiBCdXNpbmVzc0xpYkV4ICYgRmFjZUxpYkNoZWN0ZWQ+KTogeyBba2V5OiBzdHJpbmddOiBBcmVhRXggJiBVc2VyUm9sZURhdGFFeCAmIEJ1c2luZXNzTGliRXggJiBGYWNlTGliQ2hlY3RlZCB9IHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0ge30gYXMgeyBba2V5OiBzdHJpbmddOiBBcmVhRXggJiBVc2VyUm9sZURhdGFFeCAmIEJ1c2luZXNzTGliRXggJiBGYWNlTGliQ2hlY3RlZCB9O1xyXG4gICAgICAgIG1MaXN0LmZvckVhY2goKGl0ZW06IEFyZWFFeCAmIFVzZXJSb2xlRGF0YUV4ICYgQnVzaW5lc3NMaWJFeCAmIEZhY2VMaWJDaGVjdGVkKSA9PiB7XHJcbiAgICAgICAgICAgIHJlc3VsdFtpdGVtLklEXSA9IGl0ZW07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBjb21wdXRlZE1vZHVsZSgpIHtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY29tcHV0ZWRPcGVyYXRlKGxpc3Q6IEFycmF5PE1vZHVsZUl0ZW0+KSB7XHJcbiAgICAgICAgICAgIGxldCBzdHJBcnIgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgICAgICBsaXN0LmZvckVhY2goKGFjdGlvbjogTW9kdWxlSXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5Jc0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHJBcnIucHVzaChhY3Rpb24uRnVsbE5hbWVTcGFjZVBhdGgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyQXJyO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxVc2VyUm9sZURhdGFFeD47XHJcblxyXG4gICAgICAgIGZvciAobGV0IGsgaW4gdGhpcy5mdW5jTW9kdWxlTGlzdE1hcCkge1xyXG4gICAgICAgICAgICBsZXQgaiA9IHt9IGFzIFVzZXJSb2xlRGF0YUV4O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mdW5jTW9kdWxlTGlzdE1hcFtrXS5Jc0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIGouUm9sZUlEID0gdGhpcy5yb2xlRGF0YS5yb2xlLklEO1xyXG4gICAgICAgICAgICAgICAgai5PYmplY3RUeXBlID0gT2JqZWN0VHlwZS5Nb2R1bGUudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBqLk9iamVjdElEID0gdGhpcy5mdW5jTW9kdWxlTGlzdE1hcFtrXS5GdWxsTmFtZVNwYWNlUGF0aDtcclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuZnVuY01vZHVsZUxpc3RNYXBba10ub3BlcmF0ZUl0ZW1MaXN0KSAmJiB0aGlzLmZ1bmNNb2R1bGVMaXN0TWFwW2tdLm9wZXJhdGVJdGVtTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgai5vcGVyYXRlTGlzdCA9IGNvbXB1dGVkT3BlcmF0ZSh0aGlzLmZ1bmNNb2R1bGVMaXN0TWFwW2tdLm9wZXJhdGVJdGVtTGlzdClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKGopXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29tcHV0ZWRGYWNlTGliKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZmFjZUxpYkxpc3RNYXApO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjb21wdXRlZE9wZXJhdGUobGlzdDogQXJyYXk8T3BlcmF0ZUZvckZhY2VMaWJFbnVtPikge1xyXG4gICAgICAgICAgICBsZXQgc3RyQXJyID0gW10gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICAgICAgbGlzdC5mb3JFYWNoKChhY3Rpb246IE9wZXJhdGVGb3JGYWNlTGliRW51bSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5Jc0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFjdGlvbi5Jc1NsaWRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ckFyci5wdXNoKGFjdGlvbi52YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJBcnIucHVzaChhY3Rpb24uU2xpZGVMaXN0W2FjdGlvbi5TbGlkZUluZGV4XS52YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyQXJyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PFVzZXJSb2xlRGF0YUV4PjtcclxuICAgICAgICBmb3IgKGxldCBrIGluIHRoaXMuZmFjZUxpYkxpc3RNYXApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5mYWNlTGliTGlzdE1hcFtrXS5Jc0VuYWJsZWQgJiYgdGhpcy5mYWNlTGliTGlzdE1hcFtrXS5PYmplY3RUeXBlID09PSBPYmplY3RUeXBlLkJ1c2luZXNzTGliLnZhbHVlKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5mYWNlTGliTGlzdE1hcFtrXS5Jc0VuYWJsZWQgJiYgdGhpcy5mYWNlTGliTGlzdE1hcFtrXS5PYmplY3RUeXBlID09PSBPYmplY3RUeXBlLkJ1c2luZXNzTGliLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaiA9IHt9IGFzIFVzZXJSb2xlRGF0YUV4O1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5mYWNlTGliTGlzdE1hcFtrXS5OYW1lKVxyXG4gICAgICAgICAgICAgICAgai5Sb2xlSUQgPSB0aGlzLnJvbGVEYXRhLnJvbGUuSUQ7XHJcbiAgICAgICAgICAgICAgICBqLk9iamVjdFR5cGUgPSBPYmplY3RUeXBlLkJ1c2luZXNzTGliLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgai5PYmplY3RJRCA9IHRoaXMuZmFjZUxpYkxpc3RNYXBba10uT2JqZWN0SUQ7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZhY2VMaWJMaXN0TWFwW2tdKTtcclxuICAgICAgICAgICAgICAgIGoub3BlcmF0ZUxpc3QgPSBjb21wdXRlZE9wZXJhdGUodGhpcy5mYWNlTGliTGlzdE1hcFtrXS5vcGVyYXRlRm9yRmFjZUxpYik7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaChqKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcblxyXG4gICAgc3VibWl0TmV3Um9sZSgpIHtcclxuICAgICAgICBsZXQgcGFyYW1zID0ge30gYXMgUm9sZURldGFpbFJlc3VsdDtcclxuICAgICAgICBwYXJhbXMucm9sZSA9IHRoaXMucm9sZURhdGEucm9sZTtcclxuICAgICAgICBpZiAoIXBhcmFtcy5yb2xlLk5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXJEZWMud2FybkluZm8oJ+ivt+Whq+WGmeinkuiJsuWQjeensO+8gScpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBmdW5jTW9kdWxlTGlzdCA9IHRoaXMuY29tcHV0ZWRNb2R1bGUoKTtcclxuXHJcbiAgICAgICAgaWYgKGZ1bmNNb2R1bGVMaXN0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXllckRlYy53YXJuSW5mbygn6K+36YCJ5oup5Yqf6IO95p2D6ZmQ77yBJylcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGZhY2VsaWJQb3dlckxpc3QgPSB0aGlzLmNvbXB1dGVkRmFjZUxpYigpO1xyXG5cclxuICAgICAgICBwYXJhbXMucm9sZURhdGFMaXN0ID0gW10uY29uY2F0KFxyXG4gICAgICAgICAgICBmdW5jTW9kdWxlTGlzdCwgZmFjZWxpYlBvd2VyTGlzdCxcclxuICAgICAgICAgICAgdGhpcy5yb2xlRGF0YS5jYW1lcmFQb3dlckxpc3QsXHJcbiAgICAgICAgICAgIHRoaXMucm9sZURhdGEud2lmaVBvd2VyTGlzdCxcclxuICAgICAgICAgICAgdGhpcy5yb2xlRGF0YS5ybXBnYXRlUG93ZXJMaXN0LFxyXG4gICAgICAgICAgICB0aGlzLnJvbGVEYXRhLmVmZW5jZVBvd2VyTGlzdFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5yb2xlLklEKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZVNlcnZpY2UudXBkYXRlUm9sZShwYXJhbXMpLnRoZW4oKHJlczogUmVzcG9uc2VSZXN1bHQ8YW55PikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbFN1Ym1pdCgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGFyYW1zLnJvbGUuQ3JlYXRlRGF0ZSA9IERhdGUubm93KCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgcGFyYW1zLnJvbGUuQ3JlYXRlcklEID0gdGhpcy51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcklkKCk7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZVNlcnZpY2UuYWRkUm9sZShwYXJhbXMpLnRoZW4oKHJlczogUmVzcG9uc2VSZXN1bHQ8YW55PikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbFN1Ym1pdCgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNhbmNlbFN1Ym1pdCgpIHtcclxuICAgICAgICB0aGlzLiRzdGF0ZS5nbygnYmFzZWNvbmZpZy5yb2xlJylcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ25ld1JvbGVDb250cm9sbGVyJywgTmV3Um9sZUNvbnRyb2xsZXIpOyJdfQ==
