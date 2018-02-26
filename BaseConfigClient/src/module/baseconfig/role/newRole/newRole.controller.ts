import "css!../../style/baseconfig.newRole.css";
import {app} from "../../../common/app/main.app";
import "./facelib-select-directive"
import {OperateForFaceLibEnum, UserRoleDataEx} from "../../../../core/entity/ex/UserRoleDataEx";
import {RoleDetailResult} from "../../../../core/params/RoleParams";
import Role from "../../../../core/entity/Role";
import {ModuleItemEx} from "../../../../core/entity/ex/ModuleItemEx";
import {ResponseResult} from "../../../../core/params/result/ResponseResult";
import "../../../common/services/role.service";
import {IRoleService} from "../../../common/services/role.service";
import PortraitTool from "../../../common/portrait-tool";
import {ModuleItem} from "../../../../core/server/ModulItemModel";
import {Enum} from "../../../../core/enum/Enum";
import {ObjectType} from "../../../../core/enum/ObjectType";
import {IConnectTreeService} from "../../../common/services/connectTree.service";
import "../../../common/services/connectTree.service";
import {ITreeDirectiveService} from "../../../common/directive/tree/tree.directive.service";
import "../../../common/directive/tree/tree.directive.service";

import {TreeDataParams} from "../../../common/directive/tree/tree-params";
import {AreaEx} from "../../../../core/entity/ex/AreaEx";
import {TreeType} from "../../../../core/enum/TreeType";
import {CameraEx} from "../../../../core/entity/ex/CameraEx";
import {WifiEx} from "../../../../core/entity/ex/WifiEx";
import {RmpGateEx} from "../../../../core/entity/ex/RmpGateEx";
import {ElectronicFenceEx} from "../../../../core/entity/ex/ElectronicFenceEx";
import {CameraOperateType} from "../../../../core/server/enum/CameraOperateType";
import {IBusinessLibService} from "../../../common/services/businessLib.service";
import "../../../common/services/businessLib.service";
import {BusinessLibEx} from "../../../../core/entity/ex/BusinessLibEx";
import {ILayerDec} from "../../../common/factory/layerMsg.factory";
import "../../../common/factory/layerMsg.factory";
import {IUserInfoCacheFactory} from "../../../common/factory/userinfo.cache.factory";
import  "../../../common/factory/userinfo.cache.factory";
let Promise = require('es6-promise');

declare let require: any, angular: any;

export class FaceLibChected {
    checkboxStatus: number;
    IsEnabled: boolean
}

class NewRoleController {
    static $inject: Array<string> = ['$scope', '$q',
        'roleService', '$state', '$stateParams', '$timeout', 'connectTreeService', 'treeDirectiveService',
        'businessLibService', 'layerDec','userInfoCacheFactory'];
    roleData: RoleDetailResult = new RoleDetailResult();
    roleList:Array<Role>;
    roleTplID:string;
    /**
     * @desc 模版路径
     */
    selectTabIndex: number = 0;
    moduleTpl: string = '/module/baseconfig/role/newRole/module.template.html';
    deviceTpl: string = '/module/baseconfig/role/newRole/device.template.html';
    facelibTpl: string = '/module/baseconfig/role/newRole/facelib.template.html';

    /**
     * @desc 路由权限相关
     */
    funcModuleList: Array<ModuleItemEx> = [];
    funcModuleListMap: { [key: string]: ModuleItemEx } = {};
    currentUserRoleData: Array<UserRoleDataEx> = [];
    selectModuleIndex: number = 0;


    /**
     * @desc 设备权限相关
     */
    selectDeviceType: string = ObjectType.Camera.value;
    deviceTypelist: Array<Enum> = [
        ObjectType.Camera,
        ObjectType.Wifi,
        ObjectType.RmpGate,
        ObjectType.ElectronicFence
    ];
    deviceTypeMap: { [key: string]: Enum } = ObjectType;
    treeParams: TreeDataParams<any> = new TreeDataParams();
    cameraTreeData: Array<AreaEx | CameraEx>;
    wifiTreeData: Array<AreaEx | WifiEx>;
    rmpgateTreeData: Array<AreaEx | RmpGateEx>;
    efenceTreeData: Array<AreaEx | ElectronicFenceEx>;
    selectCameraList: Array<CameraEx> = [];
    selectWifiList: Array<WifiEx> = [];
    selectRmpgateList: Array<RmpGateEx> = [];
    selectEfenceList: Array<ElectronicFenceEx> = [];


    /**
     * @desc 人像库权限相关
     */
    faceLibList: Array<AreaEx & UserRoleDataEx & BusinessLibEx & FaceLibChected> = [];
    faceLibListMap: { [key: string]: AreaEx & UserRoleDataEx & BusinessLibEx & FaceLibChected } = {};
    selectAreaLibIndex: number = 0;
    currentAreaLibData: Array<UserRoleDataEx> = [];

    constructor(private $scope: any,
                private $q: any,
                private roleService: IRoleService,
                private $state: any,
                private $stateParams: any,
                private $timeout: any,
                private connectTreeService: IConnectTreeService,
                private treeService: ITreeDirectiveService,
                private businessLibService: IBusinessLibService,
                private layerDec: ILayerDec,
                private userInfoCacheFactory:IUserInfoCacheFactory) {
        let roleId = this.$stateParams.roleId;
        this.getUserRoleData(roleId);

        if(!roleId){
            this.roleService.findListByParams(null).then((res:ResponseResult<Array<Role>>)=>{
                if(res.code === 200){
                    this.roleList = res.data;
                }
            })
        }
    }

    /**
     * @desc 获取角色所有 拥有的功能权限 并初始化数据
     * @param {string} roleId
     */
    getUserRoleData(roleId: string) {
        if (roleId) {
            this.roleService.findDetail(roleId).then((resp: ResponseResult<RoleDetailResult>) => {
                if (resp && resp.code == 200) {
                    this.roleData = resp.data;
                }
            }).then(() => {
                this.initRoleData(true);
                this.getDeviceTreeData();
                this.getBusinessLibData(true);
            })
        } else {
            this.initRoleData(false);
            this.getDeviceTreeData();
            this.getBusinessLibData(false);
        }

    }
    changeRoleTpl(){
        if(!this.$stateParams.roleId && this.roleTplID){
            this.roleService.findDetail(this.roleTplID).then((resp: ResponseResult<RoleDetailResult>) => {
                if (resp && resp.code == 200) {
                    this.roleData.funcModuleList = resp.data.funcModuleList;
                    this.roleData.cameraPowerList = resp.data.cameraPowerList;
                    this.roleData.wifiPowerList = resp.data.wifiPowerList;
                    this.roleData.rmpgatePowerList = resp.data.rmpgatePowerList;
                    this.roleData.efencePowerList = resp.data.efencePowerList;
                    this.roleData.facelibPowerList = resp.data.facelibPowerList;
                }
            }).then(() => {
                this.initRoleCheckedMapData();
                this.initTreeData();
                this.initBusinessLib(true);
            })
        }
    }

    /**
     * @desc 初始化角色信息
     * @param {boolean} isHasRole
     */
    initRoleData(isHasRole: boolean) {
        if (!isHasRole) {
            this.roleData.role = new Role();
            this.roleData.funcModuleList = [];
            this.roleData.cameraPowerList = [];
            this.roleData.wifiPowerList = [];
            this.roleData.rmpgatePowerList = [];
            this.roleData.efencePowerList = [];
        }

        this.getAllFunModule().then((result: boolean) => {
            if (result) {
                this.initRoleCheckedMapData();
            }
        });
    };

    initTreeData() {
        this.treeParams.treeId = 'DeviceSelectTree';
        this.treeParams.treeDatas = [];
        this.treeParams.isShowIcon = true;
        this.treeParams.isShowLine = false;
        this.treeParams.checkEnable = true;
        this.treeParams.isSingleSelect = false;
        this.treeParams.isSimpleData = true;
        this.treeParams.onCheck = (event: Event, treeId: string, treeNode: any): void => {
            if (this.selectDeviceType === ObjectType.Camera.value) {
                this.$timeout(() => {
                    this.selectCameraList = this.getCheckedList(TreeType.camera.value, treeId);
                    this.roleData.cameraPowerList = this.selectCameraList.map((item: CameraEx) => {
                        let j = {} as UserRoleDataEx;
                        j.ObjectID = item.ID;
                        j.ObjectType = ObjectType.Camera.value;
                        j.RoleID = this.roleData.role.ID;
                        j.operateList = [CameraOperateType.Preview.value];
                        return j;
                    })
                });
            }
            if (this.selectDeviceType === ObjectType.Wifi.value) {
                this.$timeout(() => {
                    this.selectWifiList = this.getCheckedList(TreeType.wifi.value, treeId);
                    this.roleData.wifiPowerList = this.selectWifiList.map((item: WifiEx) => {
                        let j = {} as UserRoleDataEx;
                        j.ObjectID = item.ID;
                        j.ObjectType = ObjectType.Wifi.value;
                        j.RoleID = this.roleData.role.ID;
                        j.operateList = [CameraOperateType.Preview.value];
                        return j;
                    })
                });
            }
            if (this.selectDeviceType === ObjectType.RmpGate.value) {
                this.$timeout(() => {
                    this.selectRmpgateList = this.getCheckedList(TreeType.rmpGate.value, treeId);
                    this.roleData.rmpgatePowerList = this.selectRmpgateList.map((item: RmpGateEx) => {
                        let j = {} as UserRoleDataEx;
                        j.ObjectID = item.ID;
                        j.ObjectType = ObjectType.RmpGate.value;
                        j.RoleID = this.roleData.role.ID;
                        j.operateList = [CameraOperateType.Preview.value];
                        return j;
                    })
                });
            }

            if (this.selectDeviceType === ObjectType.ElectronicFence.value) {
                this.$timeout(() => {
                    this.selectEfenceList = this.getCheckedList(TreeType.ElectronicFence.value, treeId);
                    this.roleData.efencePowerList = this.selectEfenceList.map((item: ElectronicFenceEx) => {
                        let j = {} as UserRoleDataEx;
                        j.ObjectID = item.ID;
                        j.ObjectType = ObjectType.ElectronicFence.value;
                        j.RoleID = this.roleData.role.ID;
                        j.operateList = [CameraOperateType.Preview.value];
                        return j;
                    })
                });
            }

        };
        this.treeParams.treeInitComplete = (treeId: string): void => {
            if (this.selectDeviceType === ObjectType.Camera.value) {
                this.$timeout(() => {
                    let ids = this.roleData.cameraPowerList.map((item: UserRoleDataEx) => item.ObjectID) as Array<string>;
                    this.selectCameraList = this.defaultCheckTreeByIds(TreeType.camera.value, treeId, ids);
                });
            }
            if (this.selectDeviceType === ObjectType.Wifi.value) {
                this.$timeout(() => {
                    let ids = this.roleData.wifiPowerList.map((item: UserRoleDataEx) => item.ObjectID) as Array<string>;
                    this.selectWifiList = this.defaultCheckTreeByIds(TreeType.wifi.value, treeId, ids);
                });
            }
            if (this.selectDeviceType === ObjectType.RmpGate.value) {
                this.$timeout(() => {
                    let ids = this.roleData.rmpgatePowerList.map((item: UserRoleDataEx) => item.ObjectID) as Array<string>;
                    this.selectRmpgateList = this.defaultCheckTreeByIds(TreeType.rmpGate.value, treeId, ids);
                });
            }

            if (this.selectDeviceType === ObjectType.ElectronicFence.value) {
                this.$timeout(() => {
                    let ids = this.roleData.efencePowerList.map((item: UserRoleDataEx) => item.ObjectID) as Array<string>;
                    this.selectEfenceList = this.defaultCheckTreeByIds(TreeType.ElectronicFence.value, treeId, ids);
                });
            }

        };
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
    private defaultCheckTreeByIds = (treeType: string, treeId: string, ids: Array<string>, paramName?: string): Array<any> => {
        let arr = [] as Array<any>;
        if (!paramName) {
            paramName = "ID";
        }
        if (ids.length > 0) {
            let checkParamsList = [] as Array<{ key: string, value: string }>;
            angular.forEach(ids, (val: string) => {
                checkParamsList.push({key: paramName, value: val});
            });
            if (this.treeService.checkNodesByParamsList(treeId, checkParamsList, true)) {
                arr = this.getCheckedList(treeType, treeId);
            }
        }
        return arr;
    };

    /** create by zxq
     * 获取已选择的 树节点集合
     * @time: 2017-06-12 12:02:32
     * @params: treeType 勾选节点 树类型标识
     * @params: treeId 勾选节点 树ID
     * @return: Array<CameraEx>&Array<BusinessLibEx> 节点集合 类型与 treeType 相对应
     */
    private getCheckedList(treeType: string, treeId: string): Array<any> {
        let treeCheckedNodes = this.treeService.getCheckedNodes(treeId, true);
        let result: Array<any & AreaEx> = [] as Array<any & AreaEx>;
        if (treeCheckedNodes) {
            angular.forEach(treeCheckedNodes, (val: any & AreaEx) => {
                if (val.treeType === treeType) {
                    result.push(val);
                }
            });
        }
        return result;
    }

    getDeviceTreeData() {
        let _self = this as NewRoleController;
        Promise.all([
            _self.connectTreeService.findAreaCamera(),
            _self.connectTreeService.findAreaWithWifi(),
            _self.connectTreeService.findAreaWithRmpgate(),
            _self.connectTreeService.findAreaWithElectronicfence()
        ]).then((res: Array<any>) => {
            _self.cameraTreeData = res[0];
            _self.wifiTreeData = res[1];
            _self.rmpgateTreeData = res[2];
            _self.efenceTreeData = res[3];
        }).then(() => {
            this.setTreeDataForType();
        })
    }

    getBusinessLibData(isUpdate: boolean) {
        this.businessLibService.findTreeAreaWithRole().then((res: ResponseResult<Array<any>>) => {
            this.faceLibList = this.formatFaceLibList(res.data);
            this.faceLibListMap = this.formatFaceLibListForMap(res.data);
        }).then(() => {
            this.initBusinessLib(isUpdate)
        })
    }

    initBusinessLib(isUpdate: boolean) {
        for (let k in this.faceLibListMap) {
            this.faceLibListMap[k].IsEnabled = false;
            this.faceLibListMap[k].checkboxStatus = -1;
        }
        if (isUpdate) {
            for (let k in this.faceLibListMap) {
                this.roleData.facelibPowerList.forEach((ModuleItemEx) => {
                    if (this.faceLibListMap[k].ID === ModuleItemEx.ObjectID) {
                        this.faceLibListMap[k].IsEnabled = true;
                        ModuleItemEx.operateList.forEach((operate: string) => {
                            this.faceLibListMap[k].operateForFaceLib.forEach((item: OperateForFaceLibEnum) => {
                                if (item.IsSlide) {
                                    item.SlideList.forEach((item2: OperateForFaceLibEnum, index: number) => {
                                        if (item2.value === operate) {
                                            item.SlideIndex = index;
                                            item.IsEnabled = true;
                                        }
                                    })
                                } else {
                                    if (operate === item.value) {
                                        item.IsEnabled = true;
                                    }
                                }
                            })
                        })
                    }
                })
            }
            this.updateCheckedWithFaceLib();
        }
    }

    updateCheckedWithFaceLib() {
        this.$timeout(() => {
            for (let k in this.faceLibListMap) {
                let faceLib = this.faceLibListMap[k];
                let arr = [] as Array<boolean>;
                if (Array.isArray(faceLib.operateForFaceLib) && faceLib.operateForFaceLib.length > 0) {
                    //TODO 进入此处条件 代表是最下级菜单，只有操作权限 判断所有操作权限 返回checkboxStatus值
                    faceLib.operateForFaceLib.forEach((item: OperateForFaceLibEnum) => {
                        arr.push(item.IsEnabled)
                    });
                } else {
                    //TODO 进入此处条件 则有子级，判断子级所以IsEnabled状态 返回checkboxStatus值
                    for (let k in this.faceLibListMap) {
                        if (faceLib.ID === this.faceLibListMap[k].ParentID) {
                            let childModule = this.faceLibListMap[k];

                            //TODO 递归记录所有的子级状态
                            let tempFn = (lib: AreaEx & UserRoleDataEx & BusinessLibEx & FaceLibChected) => {
                                arr.push(lib.IsEnabled);
                                if (Array.isArray(lib.operateForFaceLib) && lib.operateForFaceLib.length > 0) {
                                    lib.operateForFaceLib.forEach((item: OperateForFaceLibEnum) => {
                                        arr.push(item.IsEnabled)
                                    });
                                } else {
                                    for (let key in this.faceLibListMap) {
                                        if (lib.ID === this.faceLibListMap[key].ParentID) {
                                            arr.push(this.faceLibListMap[key].IsEnabled);
                                            tempFn(this.faceLibListMap[key])
                                        }
                                    }
                                }

                            };
                            tempFn(childModule)
                        }
                    }
                }
                if (arr.indexOf(false) > -1 && arr.indexOf(true) > -1) {
                    faceLib.checkboxStatus = 1
                }
                if (arr.indexOf(false) === -1 && arr.indexOf(true) > -1) {
                    faceLib.checkboxStatus = 0
                }
                if (arr.indexOf(false) > -1 && arr.indexOf(true) === -1) {
                    faceLib.checkboxStatus = -1
                }
            }
        })
    }

    changeSelectAreaLib(item: any, index: number) {
        if (this.selectAreaLibIndex != index) {
            this.selectAreaLibIndex = index
        }
    }

    changeFaceLibActionStatus(item: OperateForFaceLibEnum) {
        item.IsEnabled = !item.IsEnabled;
        this.updateFaceLibIsEnadbledParent(item, item.IsEnabled);
        this.updateCheckedWithFaceLib()
    }

    changeFaceLibActionStatus2(item: OperateForFaceLibEnum, index: number, action: OperateForFaceLibEnum) {
        action.SlideIndex = index;
        index === -1 ? action.IsEnabled = false : action.IsEnabled = true;
        this.updateFaceLibIsEnadbledParent(action, action.IsEnabled);
        this.updateCheckedWithFaceLib()
    }

    changeCheckedLibStatus(item: AreaEx & UserRoleDataEx & BusinessLibEx & FaceLibChected, status: number) {
        let IsEnabled: boolean = false;
        if (status == 1 || status == -1) {
            IsEnabled = true;
        }
        item.IsEnabled = IsEnabled;
        this.updateFaceLibIsEnadbledChild(item, IsEnabled);
        this.updateFaceLibIsEnadbledParent(item, IsEnabled);
        this.updateCheckedWithFaceLib()
    }

    updateFaceLibIsEnadbledParent(item: any, IsEnabled: boolean) {
        if (IsEnabled === true) {
            if (this.faceLibListMap[item.ParentID]) {
                this.faceLibListMap[item.ParentID].IsEnabled = true;
                if (this.faceLibListMap[item.ParentID].ParentID) {
                    this.faceLibListMap[this.faceLibListMap[item.ParentID].ParentID].IsEnabled = true;
                }
            }
        } else {
            if (this.faceLibListMap[item.ParentID]) {
                let tempFn = (item2: any) => {
                    let isHave = false;
                    for (let k in this.faceLibListMap) {
                        if (item2.ParentID === this.faceLibListMap[k].ParentID) {
                            isHave = this.faceLibListMap[k].IsEnabled;
                            if (this.faceLibListMap[this.faceLibListMap[k].ParentID]) {
                                tempFn(this.faceLibListMap[this.faceLibListMap[k].ParentID])
                            }
                        }
                    }
                    item2.IsEnabled = isHave;
                }
            }

        }
    }

    updateFaceLibIsEnadbledChild(item: any, IsEnabled: boolean) {
        let tempFn = (item2: any) => {
            if (item2.operateForFaceLib) {
                item2.operateForFaceLib.forEach((action: OperateForFaceLibEnum) => {
                    action.IsEnabled = IsEnabled;
                    if (action.IsSlide) {
                        IsEnabled ? action.SlideIndex = 0 : action.SlideIndex = -1;
                    }
                })
            } else {
                for (let k in this.faceLibListMap) {
                    if (item2.ID === this.faceLibListMap[k].ParentID) {
                        this.faceLibListMap[k].IsEnabled = IsEnabled;
                        tempFn(this.faceLibListMap[this.faceLibListMap[k].ID])
                    }
                }
            }
        };
        tempFn(item)

    }

    /**
     * @desc 初始化路由选中状态
     */
    initRoleCheckedMapData() {
        for (let k in this.funcModuleListMap) {
            //TODO 初始化所有模块IsEnabled状态
            this.funcModuleListMap[k].IsEnabled = false;
            if (Array.isArray(this.funcModuleListMap[k].operateItemList) && this.funcModuleListMap[k].operateItemList.length > 0) {
                this.funcModuleListMap[k].operateItemList.forEach((item: ModuleItem) => {
                    item.IsEnabled = false;
                })
            }

            //TODO 更新现有的模块IsEnabled状态
            this.roleData.funcModuleList.forEach((item: UserRoleDataEx) => {
                if (this.funcModuleListMap[k].FullNameSpacePath === item.ObjectID) {
                    this.funcModuleListMap[k].IsEnabled = true;

                    //TODO 更新现有的模块按钮权限状态
                    if (item.operateList.length > 0 && Array.isArray(this.funcModuleListMap[k].operateItemList) && this.funcModuleListMap[k].operateItemList.length > 0) {
                        let list = angular.copy(item.operateList) as Array<string>;
                        this.funcModuleListMap[k].operateItemList.forEach((item2: ModuleItemEx, index: number) => {
                            let isChecked = false;
                            for (let i = 0; i < list.length; i++) {
                                if (item2.FullNameSpacePath === list[i]) {
                                    isChecked = true;
                                    this.funcModuleListMap[k].operateItemList[index].IsEnabled = true;
                                    list.splice(i, 1);
                                }
                            }
                            if (!isChecked) {
                                this.funcModuleListMap[k].operateItemList[index].IsEnabled = false
                            }
                        })
                    }
                }

            });
        }

        this.updateStatusForIsEnabled();

    }

    /**
     * @desc 更新所有checkbox状态
     */
    private updateStatusForIsEnabled() {
        this.$timeout(() => {
            for (let k in this.funcModuleListMap) {
                let module = this.funcModuleListMap[k];
                let arr = [] as Array<boolean>;
                if (Array.isArray(module.operateItemList) && module.operateItemList.length > 0) {
                    //TODO 进入此处条件 代表是最下级菜单，只有操作权限 判断所有操作权限 返回checkboxStatus值
                    module.operateItemList.forEach((item: ModuleItem) => {
                        arr.push(item.IsEnabled)
                    });
                } else {
                    //TODO 进入此处条件 则有子级，判断子级所以IsEnabled状态 返回checkboxStatus值
                    for (let k in this.funcModuleListMap) {
                        if (module.Key === this.funcModuleListMap[k].ParentKey) {
                            let childModule = this.funcModuleListMap[k];

                            //TODO 递归记录所有的子级状态
                            let tempFn = (model: ModuleItemEx) => {
                                arr.push(model.IsEnabled);
                                if (Array.isArray(model.operateItemList) && model.operateItemList.length > 0) {
                                    model.operateItemList.forEach((item: ModuleItem) => {
                                        arr.push(item.IsEnabled)
                                    });
                                } else {
                                    for (let key in this.funcModuleListMap) {
                                        if (model.Key === this.funcModuleListMap[key].ParentKey) {
                                            arr.push(this.funcModuleListMap[key].IsEnabled);
                                            tempFn(this.funcModuleListMap[key])
                                        }
                                    }
                                }

                            };
                            tempFn(childModule)
                        }
                    }
                }
                if (arr.indexOf(false) > -1 && arr.indexOf(true) > -1) {
                    module.checkboxStatus = 1
                }
                if (arr.indexOf(false) === -1 && arr.indexOf(true) > -1) {
                    module.checkboxStatus = 0
                }
                if (arr.indexOf(false) > -1 && arr.indexOf(true) === -1) {
                    module.checkboxStatus = -1
                }
            }
        })

    }


    //TODO 更新当权状态调用更新父节点和子节点的方法
    changeCheckedStatus(module: ModuleItemEx, status: number) {
        let isEnabled: boolean = false;
        if (status == 1 || status == -1) {
            isEnabled = true;
        }
        module.IsEnabled = isEnabled;
        this.checkedIsEnableForChildren(module, isEnabled);
        this.checkedIsEnableForParent(module, isEnabled);
        this.updateStatusForIsEnabled()
    }

    changeSelectDevice(item: Enum) {
        this.selectDeviceType = item.value;
        this.setTreeDataForType();
    }

    removeDeviceSelected(item: any, isRemoveAll: boolean) {
        if (this.selectDeviceType === ObjectType.Camera.value) {
            this.$timeout(() => {
                if (item) {
                    this.roleData.cameraPowerList = this.roleData.cameraPowerList.filter((item2: UserRoleDataEx) => item2.ObjectID === item.ID);
                    this.treeService.updateNodeChecked(this.treeParams.treeId, item.tId, false);
                    this.selectCameraList = this.getCheckedList(TreeType.camera.value, this.treeParams.treeId);
                }
                if (isRemoveAll) {
                    this.roleData.cameraPowerList = [];
                    if (this.treeService.checkAllNodes(this.treeParams.treeId, false)) {
                        this.selectCameraList = [];
                    }
                }

            });
        }
        if (this.selectDeviceType === ObjectType.Wifi.value) {
            this.$timeout(() => {
                if (item) {
                    this.roleData.wifiPowerList = this.roleData.wifiPowerList.filter((item2: UserRoleDataEx) => item2.ObjectID === item.ID);
                    this.treeService.updateNodeChecked(this.treeParams.treeId, item.tId, false);
                    this.selectWifiList = this.getCheckedList(TreeType.wifi.value, this.treeParams.treeId);
                }
                if (isRemoveAll) {
                    this.roleData.wifiPowerList = [];
                    if (this.treeService.checkAllNodes(this.treeParams.treeId, false)) {
                        this.selectWifiList = [];
                    }
                }
            });
        }
        if (this.selectDeviceType === ObjectType.RmpGate.value) {
            this.$timeout(() => {
                if (item) {
                    this.roleData.rmpgatePowerList = this.roleData.rmpgatePowerList.filter((item2: UserRoleDataEx) => item2.ObjectID === item.ID);
                    this.treeService.updateNodeChecked(this.treeParams.treeId, item.tId, false);
                    this.selectRmpgateList = this.getCheckedList(TreeType.rmpGate.value, this.treeParams.treeId);
                }
                if (isRemoveAll) {
                    this.roleData.rmpgatePowerList = [];
                    if (this.treeService.checkAllNodes(this.treeParams.treeId, false)) {
                        this.selectRmpgateList = [];
                    }
                }
            });
        }
        if (this.selectDeviceType === ObjectType.ElectronicFence.value) {
            this.$timeout(() => {
                if (item) {
                    this.roleData.efencePowerList = this.roleData.efencePowerList.filter((item2: UserRoleDataEx) => item2.ObjectID === item.ID);
                    this.treeService.updateNodeChecked(this.treeParams.treeId, item.tId, false);
                    this.selectEfenceList = this.getCheckedList(TreeType.ElectronicFence.value, this.treeParams.treeId);
                }
                if (isRemoveAll) {
                    this.roleData.efencePowerList = [];
                    if (this.treeService.checkAllNodes(this.treeParams.treeId, false)) {
                        this.selectEfenceList = [];
                    }
                }
            });
        }


    }

    private setTreeDataForType() {
        if (this.selectDeviceType === ObjectType.Camera.value) {
            this.$timeout(() => {
                this.treeParams.treeDatas = this.cameraTreeData;
            });
        }
        if (this.selectDeviceType === ObjectType.Wifi.value) {
            this.$timeout(() => {
                this.treeParams.treeDatas = this.wifiTreeData;
            });
        }
        if (this.selectDeviceType === ObjectType.RmpGate.value) {
            this.$timeout(() => {
                this.treeParams.treeDatas = this.rmpgateTreeData;
            });
        }
        if (this.selectDeviceType === ObjectType.ElectronicFence.value) {
            this.$timeout(() => {
                this.treeParams.treeDatas = this.efenceTreeData;
            });
        }
    }

    /**
     * //TODO 更新节点下所有父节点的IsEnabled状态
     * @desc 根据节点来更新所有的父节点的IsDisabled状态
     * @param {ModuleItemEx} module
     * @param {boolean} isEnabled
     */
    private checkedIsEnableForParent(module: ModuleItemEx, isEnabled: boolean) {
        //TODO 是否有父节点
        if (this.funcModuleListMap[module.ParentKey]) {
            if (isEnabled) {
                this.funcModuleListMap[module.ParentKey].IsEnabled = isEnabled;
            } else {
                let isHave = false;
                //TODO 判断此父节点下是否还有其他子节点被勾选
                for (let k in this.funcModuleListMap) {
                    if (module.ParentKey === this.funcModuleListMap[k].ParentKey) {
                        isHave = this.funcModuleListMap[k].IsEnabled;
                    }
                }
                this.funcModuleListMap[module.ParentKey].IsEnabled = isHave;
            }
            //TODO 递归对其父节点执行
            this.checkedIsEnableForParent(this.funcModuleListMap[module.ParentKey], isEnabled)
        }
    }

    //TODO 更新节点下所有子节点的IsEnabled状态
    private checkedIsEnableForChildren(module: ModuleItemEx, isEnabled: boolean) {
        if (module.operateItemList) {
            if (Array.isArray(module.operateItemList) && module.operateItemList.length > 0) {
                module.operateItemList.forEach((item: ModuleItemEx) => {
                    item.IsEnabled = isEnabled
                })
            }
        } else {
            for (let k in this.funcModuleListMap) {
                if (module.Key === this.funcModuleListMap[k].ParentKey) {
                    this.funcModuleListMap[k].IsEnabled = isEnabled;
                    this.checkedIsEnableForChildren(this.funcModuleListMap[k], isEnabled)
                }
            }
        }

    }


    changeActionStatus(oprate: ModuleItemEx) {
        oprate.IsEnabled = !oprate.IsEnabled;
        this.checkedIsEnableForParent(oprate, oprate.IsEnabled);
        this.updateStatusForIsEnabled();
    }

    changeSelectModule(item: ModuleItemEx, index: number) {
        if (this.selectModuleIndex != index) {
            this.selectModuleIndex = index
        }
    }

    changeSelectTab(index: number) {
        if (this.selectTabIndex != index) {
            this.selectTabIndex = index;
            if (index === 1) {
                this.initTreeData();
                if (this.treeParams.treeId) {
                    this.setTreeDataForType()
                }

            }
        }
    }



    //获取所有功能权限配置项
    getAllFunModule() {
        return this.roleService.getAllFunModule().then((resp: ResponseResult<Array<ModuleItemEx>>) => {
            if (resp && resp.code == 200 && resp.data) {
                this.funcModuleList = this.formatFuncModuleList(resp.data);
                this.funcModuleListMap = this.formatFuncModuleListForMap(resp.data);
                return true;
            } else {
                return false;
            }
        });
    };

    //功能模块数据 树形结构格式化 1.转树
    private formatFuncModuleList(mList: Array<ModuleItemEx>): Array<ModuleItemEx> {
        let treeResult: Array<ModuleItemEx> = [];
        if (mList) {
            treeResult = PortraitTool.convert2Ztree(mList, "Key", "ParentKey", "children");
        }
        return treeResult;
    };

    private formatFaceLibList(mList: Array<AreaEx & UserRoleDataEx & BusinessLibEx & FaceLibChected>): Array<AreaEx & UserRoleDataEx & BusinessLibEx & FaceLibChected> {
        let treeResult: Array<AreaEx & UserRoleDataEx & BusinessLibEx & FaceLibChected> = [];
        if (mList) {
            treeResult = PortraitTool.convert2Ztree(mList, "ID", "ParentID", "children");
        }
        return treeResult;
    };

    //功能模块数据 树形结构格式化 1.转树
    private formatFuncModuleListForMap(mList: Array<ModuleItemEx>): { [key: string]: ModuleItemEx } {
        let result = {} as { [key: string]: ModuleItemEx };
        mList.forEach((item: ModuleItemEx) => {
            result[item.Key] = item;
        });
        return result;
    };

    //功能模块数据 树形结构格式化 1.转树
    private formatFaceLibListForMap(mList: Array<AreaEx & UserRoleDataEx & BusinessLibEx & FaceLibChected>): { [key: string]: AreaEx & UserRoleDataEx & BusinessLibEx & FaceLibChected } {
        let result = {} as { [key: string]: AreaEx & UserRoleDataEx & BusinessLibEx & FaceLibChected };
        mList.forEach((item: AreaEx & UserRoleDataEx & BusinessLibEx & FaceLibChected) => {
            result[item.ID] = item;
        });
        return result;
    };

    private computedModule() {

        function computedOperate(list: Array<ModuleItem>) {
            let strArr = [] as Array<string>;
            list.forEach((action: ModuleItem) => {
                if (action.IsEnabled) {
                    strArr.push(action.FullNameSpacePath)
                }
            });
            return strArr;
        }


        let arr = [] as Array<UserRoleDataEx>;

        for (let k in this.funcModuleListMap) {
            let j = {} as UserRoleDataEx;
            if (this.funcModuleListMap[k].IsEnabled) {
                j.RoleID = this.roleData.role.ID;
                j.ObjectType = ObjectType.Module.value;
                j.ObjectID = this.funcModuleListMap[k].FullNameSpacePath;
                if (Array.isArray(this.funcModuleListMap[k].operateItemList) && this.funcModuleListMap[k].operateItemList.length > 0) {
                    j.operateList = computedOperate(this.funcModuleListMap[k].operateItemList)
                }
                arr.push(j)
            }
        }
        return arr;


    }

    private computedFaceLib() {
        console.log(this.faceLibListMap);

        function computedOperate(list: Array<OperateForFaceLibEnum>) {
            let strArr = [] as Array<string>;
            list.forEach((action: OperateForFaceLibEnum) => {
                if (action.IsEnabled) {
                    if (!action.IsSlide) {
                        strArr.push(action.value)
                    } else {
                        strArr.push(action.SlideList[action.SlideIndex].value)
                    }
                }
            });
            return strArr;
        }

        let arr = [] as Array<UserRoleDataEx>;
        for (let k in this.faceLibListMap) {
            console.log(this.faceLibListMap[k].IsEnabled && this.faceLibListMap[k].ObjectType === ObjectType.BusinessLib.value)
            if (this.faceLibListMap[k].IsEnabled && this.faceLibListMap[k].ObjectType === ObjectType.BusinessLib.value) {
                let j = {} as UserRoleDataEx;
                console.log(this.faceLibListMap[k].Name)
                j.RoleID = this.roleData.role.ID;
                j.ObjectType = ObjectType.BusinessLib.value;
                j.ObjectID = this.faceLibListMap[k].ObjectID;
                console.log(this.faceLibListMap[k]);
                j.operateList = computedOperate(this.faceLibListMap[k].operateForFaceLib);
                arr.push(j)
            }
        }
        return arr;
    }

    submitNewRole() {
        let params = {} as RoleDetailResult;
        params.role = this.roleData.role;
        if (!params.role.Name) {
            return this.layerDec.warnInfo('请填写角色名称！')
        }
        let funcModuleList = this.computedModule();

        if (funcModuleList.length === 0) {
            return this.layerDec.warnInfo('请选择功能权限！')
        }
        let facelibPowerList = this.computedFaceLib();

        params.roleDataList = [].concat(
            funcModuleList, facelibPowerList,
            this.roleData.cameraPowerList,
            this.roleData.wifiPowerList,
            this.roleData.rmpgatePowerList,
            this.roleData.efencePowerList
        );
        if (params.role.ID) {
            this.roleService.updateRole(params).then((res: ResponseResult<any>) => {
                if (res.code === 200) {
                    this.cancelSubmit()
                }
            })
        } else {
            params.role.CreateDate = Date.now().toString();
            params.role.CreaterID = this.userInfoCacheFactory.getCurrentUserId();
            this.roleService.addRole(params).then((res: ResponseResult<any>) => {
                if (res.code === 200) {
                    this.cancelSubmit()
                }
            })
        }
    }

    cancelSubmit() {
        this.$state.go('baseconfig.role')
    }
}

app.controller('newRoleController', NewRoleController);