/**
 * Created by dell on 2017/3/29.
 */
import '../../common/app/main.app'
import { app } from "../../common/app/main.app";
import '../../common/services/lamp.service';
import '../../common/services/camera.service';
import '../../common/services/rmpgate.service';
import { ILampService } from "../../common/services/lamp.service";
import { ICameraService } from "../../common/services/camera.service";
import { IRmpGateService } from '../../common/services/rmpgate.service';
import { Area } from "../../../core/entity/Area";
import { AreaEx } from "../../../core/entity/ex/AreaEx";
import { IAreaService } from "../../common/services/area.service";
import { Lamp } from "../../../core/entity/Lamp";
import { LampEx } from "../../../core/entity/ex/LampEx";
import { WifiEx } from "../../../core/entity/ex/WifiEx";
import { RmpGateEx } from "../../../core/entity/ex/RmpGateEx";
import { ElectronicFenceEx } from "../../../core/entity/ex/ElectronicFenceEx";
import { BackResponseBody, ResponseResult } from "../../../core/params/result/ResponseResult";
import { TreeDataParams } from "../../common/directive/tree/tree-params";
import { TreeType } from "../../../core/enum/TreeType";
import { CameraEx } from "../../../core/entity/ex/CameraEx";
import { RelationCol, Relation } from "../../../core/entity/DeviceRelation";
import "../../common/directive/tree/tree.directive.service";
import { ITreeDirectiveService } from "../../common/directive/tree/tree.directive.service";
import "./lamp.store.service"
import { ITaskStoreService } from "./lamp.store.service";
import { IConnectTreeService } from "../../common/services/connectTree.service"
import "../../common/services/connectTree.service";
import "webUploader";
import "css!../../../libs/webuploader-0.1.5/webuploader.css";

declare var $: any;
declare let angular: any;
declare var require: any;
let WebUploader = require("webUploader");
import "es6-promise"
let Promise = require("es6-promise")

interface IAlarmType {
    CameraTreeId: { key: string, text: string },
    WifiTreeId: { key: string, text: string }
    ElectronicFenceTreeId: { key: string, text: string }
    RmpGateTreeId: { key: string, text: string }
}

interface IDeviceType {
    Camera: string,
    Wifi: string,
    ElectronicFence: string,
    RmpGate: string
}

const DeviceType: IDeviceType = {
    Camera: "Camera",
    Wifi: "Wifi",
    ElectronicFence: "ElectronicFence",
    RmpGate: "RmpGate"
}

const AlarmTypesData: IAlarmType = {
    CameraTreeId: { key: 'CameraTreeId', text: '摄像机' },
    WifiTreeId: { key: 'WifiTreeId', text: 'WIFI' },
    ElectronicFenceTreeId: { key: 'ElectronicFenceTreeId', text: 'WIFI' },
    RmpGateTreeId: { key: 'RmpGateTreeId', text: 'WIFI' }
};

interface ILampExt {
    Camera: Array<string>;
    RmpGate: Array<string>;
    WIFI: Array<string>;
    ElectronicFence: Array<string>;
}

class LampPopupController {
    static $inject = ['$scope',
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
    curdType: string;
    Lamp: LampEx;
    Area: AreaEx;
    submit: Function;
    treeParams: TreeDataParams<AreaEx>;
    isShowAreaTree: boolean;
    isShowCameraTree: boolean;
    isNgShowStepBase: boolean;
    isNgShowStepDevice: boolean;
    // 是否是根区域, 只有在修改操作时生效
    // 当前区域是根区域时, 不允许选择根结点
    isRootLamp: boolean;

    CameraOnTheLamp: TreeDataParams<CameraEx & AreaEx>;
    WifiOnTheLamp: TreeDataParams<WifiEx & AreaEx>;
    RmpGateOnTheLamp: TreeDataParams<RmpGateEx & AreaEx>;
    ElectronicFenceOnTheLamp: TreeDataParams<ElectronicFenceEx & AreaEx>;
    // tree默认ID
    CameraTreeIdForLamp: string = "CameraTreeIdForLamp";
    WifiTreeIdForLamp: string = "WifiTreeIdForLamp";
    ElectronicFenceTreeIdForLamp: string = "ElectronicFenceTreeIdForLamp";
    RmpGateTreeIdForLamp: string = "RmpGateTreeIdForLamp";
    // 所有选中的设备清单
    CameraSelectedListForLamp: Array<CameraEx> = [] as Array<CameraEx>;
    WifiSelectedListForLamp: Array<WifiEx> = [] as Array<WifiEx>;
    RmpGateSelectedListForLamp: Array<RmpGateEx> = [] as Array<RmpGateEx>;
    ElectronicFenceSelectedListForLamp: Array<ElectronicFenceEx> = [] as Array<ElectronicFenceEx>;

    AlarmTypes: IAlarmType = AlarmTypesData;
    // 设备
    lampExt: ILampExt;
    DeviceType: IDeviceType = DeviceType;
    CurrentDevice: string = "Camera";
    searchStr: any;
    selectedNode: any;
    upLoadAction: any;
    ImgUrl: string;
    chooseIcon: string;
    tabList: Array<{ value: string, text: string }>;
    DeviceRelation: Array<Relation> = [];
    getAllLampAboutDevice: Array<Relation>;
    deleteDeviceIds: Array<string> = [];
    constructor(
        private $scope: any,
        private $rootScope: any,
        private areaService: IAreaService,
        private lampService: ILampService,
        private $q: any,
        private $timeout: any,
        private cameraService: ICameraService,
        private treeService: ITreeDirectiveService,
        private taskStoreService: ITaskStoreService,
        private connectTreeService: IConnectTreeService
    ) {
        this.isShowCameraTree = false;
        this.isNgShowStepBase = true;
        this.isNgShowStepDevice = false;
        this.Area = {} as AreaEx;

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
        ]
        vm.curdType = $scope.curdType;
        vm.Lamp = new LampEx();
        console.log('立杆树++++++++++++++++');
        console.log(vm.Lamp);
        // 初始化tree
        vm.treeParams = new TreeDataParams<AreaEx>();
        vm.treeParams.treeId = "lampPopupAreaTree";
        vm.treeParams.isDefaultSelected = true;
        vm.treeParams.onClick = treeSelectNode;
        vm.toggleStep = this.toggleStep;

        if (vm.curdType === 'add' && $scope.currentArea) {
            // 清除缓存
            this.taskStoreService.clearCache();
            vm.Lamp.ParentArea = {} as Area;
            vm.Lamp.ParentArea.ID = $scope.currentArea.ID;
            vm.Lamp.ParentArea.Name = $scope.currentArea.Name;
            vm.ImgUrl = '../../../images/common/default-image.png';
            vm.submit = this.saveLamp;
            $timeout(() => {
                vm.treeParams.treeDatas = $scope.treeDatas;
                vm.treeParams.defaultSelectTreeId = $scope.currentArea.ID;
            });

        } else if (vm.curdType === 'edit' && $scope.currentLamp) {
            vm.submit = this.editLamp;
            vm.Lamp = $scope.currentLamp;
            vm.selectedNode = $scope.cacheCameraData;

            vm.ImgUrl = vm.Lamp.ImgUrl ? vm.Lamp.ImgUrl : '../../../images/common/default-image.png';
            console.log('图片数据++++++++++++++++++');
            console.log(vm.ImgUrl);
            this.getAllLampAboutDevice = $scope.getAllLampAboutDevice; // 和这个灯杆相关的所有设备关系表


            this.getAllLampRalation($scope.getAllLampAboutDevice); // 初始化树列表
            $timeout(() => {
                vm.treeParams.treeDatas = $scope.treeDatas;
                if ($scope.currentArea.ID) {
                    vm.treeParams.defaultSelectTreeId = $scope.currentArea.ID
                } else {
                    vm.isRootLamp = true;
                    vm.isShowCameraTree = true
                }
            });
        }

        //dom结构加载完再初始化webuploader,否则初始化不成功。
        vm.$timeout(() => {
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
            vm.upLoadAction.onUploadBeforeSend = (file: any) => {
                this.upLoadAction.options.formData = { image: file }
            };
            vm.upLoadAction.onUploadProgress = (percentage: number) => {
            };

            vm.upLoadAction.onUploadSuccess = (file: any, res: any) => {
                if (res.code == 200 && res.data) {
                    console.log(res.data);
                    this.Lamp.ImgUrl = res.data;
                    $('#preview').attr('src', this.Lamp.ImgUrl)
                }
            };

            this.upLoadAction.onUploadError = (file: any) => {
                console.error('上传失败')
            }
        });

        this.initLampTreeParamsForCamera();
        this.initLampTreeParamsForWifi();
        this.initLampTreeParamsForRmpGate();
        this.initLampTreeParamsForElectronicFence();
        this.initModalData();
        // 默认选中上级区域
        function treeSelectNode(event: MouseEvent, treeId: string, treeNode: AreaEx) {
            $timeout(() => {
                if (vm.Lamp.AreaID && vm.Lamp.StrJsonUserData && vm.curdType === 'edit') {
                    if (event && event.type === 'click') {
                        vm.Lamp.ParentArea = treeNode;
                    } else {
                        let parentNode = JSON.parse(vm.Lamp.StrJsonUserData)
                        vm.Lamp.ParentArea = parentNode.Area;
                    }
                } else {
                    vm.Lamp.ParentArea = treeNode;
                }
                vm.isShowAreaTree = false;
            })
        }
    }

    // 获取灯杆相关的所有设备并缓存
    private getAllLampRalation(relation: Array<Relation>) {
        let allRel: Array<Relation> = relation;

        let ext = {
            Camera: [] as Array<string>,
            RmpGate: [] as Array<string>,
            WIFI: [] as Array<string>,
            ElectronicFence: [] as Array<string>
        };
        if (allRel && allRel.length) {
            console.log(allRel, '=======================allRel')
            allRel.forEach((rel: Relation) => {
                var type = rel.CameraType||rel.Type||'RmpGate';
                if (type == "Camera") {
                    ext.Camera.push(rel.RelatedObjectId)
                } else if (type == "WiFi") {
                    ext.WIFI.push(rel.RelatedObjectId)
                } else if (type == "RmpGate") {
                    ext.RmpGate.push(rel.RelatedObjectId)
                } else if (type == "EFENCE"||type == "ElectronicFence") {
                    ext.ElectronicFence.push(rel.RelatedObjectId)
                }
            });

            // 编辑之前所有设备的ID(在保存时转换为关系表ID全部删除)
            this.deleteDeviceIds = [].concat(ext.Camera, ext.WIFI, ext.RmpGate, ext.ElectronicFence);

            // 设备id缓存
            this.lampExt = ext;
            console.log(ext, '======================ext')
            this.taskStoreService.updateSelectCameraList(ext.Camera);
            this.taskStoreService.updateSelectWifiList(ext.WIFI);
            this.taskStoreService.updateSelectRmpGateList(ext.RmpGate);
            this.taskStoreService.updateSelectElectronicFenceList(ext.ElectronicFence);

        }
    }

    private getSelectIds(treeId: string) {
        let treeNodes = this.treeService.getCheckedNodes(treeId, true) as Array<any>;
        let ids = [] as Array<string>;
        treeNodes.forEach((item) => {
            ids.push(item.ID);
        });
        return ids
    }

    // 树选中的设备对象
    private allSelectList() {
        // let ext = {
        //     Camera : this.treeService.getCheckedNodes(this.CameraTreeIdForLamp, true),
        //     Wifi : this.treeService.getCheckedNodes(this.WifiTreeIdForLamp, true),
        //     RmpGate : this.treeService.getCheckedNodes(this.RmpGateTreeIdForLamp, true),
        //     ElectronicFence : this.treeService.getCheckedNodes(this.ElectronicFenceTreeIdForLamp, true)
        // };
        let ext = {
            Camera: this.getSelectIds(this.CameraTreeIdForLamp),
            Wifi: this.getSelectIds(this.WifiTreeIdForLamp),
            RmpGate: this.getSelectIds(this.RmpGateTreeIdForLamp),
            ElectronicFence: this.getSelectIds(this.ElectronicFenceTreeIdForLamp)
        };
        return ext
    }

    // 当前立杆连接设备
    private lampConstructor() {
        let newLamp = {
            'Code': this.Lamp.Code,
            'Name': this.Lamp.Name,
            'AreaID': this.Lamp.ParentArea.ID,
            'OrgunitID': this.Lamp.OrgunitID,
            'Address': this.Lamp.Address,
            'Description': this.Lamp.Description,
            'Ext': JSON.stringify(this.allSelectList()),
            'ImgUrl': this.Lamp.ImgUrl,
            'DeviceName': this.Lamp.DeviceName
        } as Lamp;
        if (this.curdType === 'edit') {
            newLamp.ID = this.Lamp.ID
        }
        return newLamp
    }

    public saveLamp() {
        let that = this;
        let newLamp = that.lampConstructor() as Lamp;

        console.log(newLamp);

        that.lampService.save(newLamp).then(complete);

        // 保存灯杆返回新灯杆的ID
        function complete(res: ResponseResult<string>) {
            console.log(res);

            if (res.data || res.code === 200) {
                // that.changeTheDeviceLampId(res.data);
                that.cancel(true);
                return null;
            } else {
                return that.$q.reject(res.code);
            }
        }
    }

    // 组建需要保存的关系表数据
    // private saveRalation = (newLampID:string, DeviceName:string, deviceData:any)=>{
    //     deviceData.forEach((data:any)=>{
    //         let Relation = {} as Relation;
    //         Relation.ObjectId = newLampID;
    //         Relation.ObjectType = "LampPost";
    //         Relation.RelatedObjectId = data.ID;
    //         Relation.RelatedObjectType = DeviceName;
    //         console.log("1111",Relation);
    //         this.DeviceRelation.push(Relation)
    //     })
    // };

    // 保存所有选中的设备关系表
    // private changeTheDeviceLampId(NewLampID:string){
    //     let that = this;
    //     let devices:any = that.allSelectList();
    //     if(devices.Camera.length){
    //         that.saveRalation(NewLampID, "Camera", devices.Camera)
    //     }
    //     if(devices.ElectronicFence.length){
    //         that.saveRalation(NewLampID, "ElectronicFence", devices.ElectronicFence)
    //     }
    //     if(devices.RmpGate.length){
    //         that.saveRalation(NewLampID, "RmpGate", devices.RmpGate)
    //     }
    //     if(devices.Wifi.length){
    //         that.saveRalation(NewLampID, "Wifi", devices.Wifi)
    //     }
    //     if(that.DeviceRelation&&that.DeviceRelation.length){
    //         // 保存编辑之后的设备ID
    //         this.lampService.saveTheRalation(that.DeviceRelation).then((res)=>{
    //             if(res.data && res.code == 200){
    //                 that.cancel(true)
    //             }
    //         })
    //     }else{
    //         that.cancel(true)
    //     }
    // }

    // 设备id列表转换为关系表id列表
    // private getRelatedObjectIds(ids:Array<string>){
    //     let RelatedObjectIds = [] as Array<string>;
    //     let getAllLampAboutDevice = this.getAllLampAboutDevice;
    //     for(let i=0;i<ids.length;i++){
    //         let DeviceId = ids[i] as string;
    //         for(let f=0;f<getAllLampAboutDevice.length;f++){
    //             if(DeviceId==getAllLampAboutDevice[f].RelatedObjectId){
    //                 RelatedObjectIds.push(this.getAllLampAboutDevice[f].ID)
    //             }
    //         }
    //     }
    //     return RelatedObjectIds
    // }

    public editLamp() {
        let that = this;
        if (!that.validate()) return;
        let newLamp = this.lampConstructor();

        that.lampService.edit(newLamp).then(complete);

        // 删除灯杆下的设备更新设备的lampID
        // if(this.deleteDeviceIds.length){
        //     let RelatedObjectIds = this.getRelatedObjectIds(this.deleteDeviceIds);
        //     this.lampService.deleteLampDeviceRelation(RelatedObjectIds).then((res)=>{
        //         that.deleteDeviceIds = [];
        //         if(res.data && res.code == 200){
        //             that.changeTheDeviceLampId(that.Lamp.ID)
        //         }
        //     })
        // }else{
        //     that.changeTheDeviceLampId(that.Lamp.ID)
        // }
        // this.taskStoreService.clearCache();

        function complete(res: ResponseResult<string>) {
            if (res.code === 200) {
                that.cancel(true);
                return null;
            } else {
                return that.$q.reject(res.code);
            }
        }
    }

    private toggleStep(text?: string) {
        if (text == "isNgShowStepBase") {
            this.isNgShowStepBase = true;
            this.isNgShowStepDevice = false;
        } else {
            this.isNgShowStepBase = false;
            this.isNgShowStepDevice = true;
        }
    }

    private validate() {
        let result = true;
        if (!this.Lamp.Code) {
            result = false;
        } else if (!this.Lamp.Name) {
            result = false;
        }
        return result;
    }

    public cancel(flag?: boolean) {
        this.deleteDeviceIds = [];
        this.$rootScope.$broadcast('lamp.closePopup', flag);
        this.taskStoreService.clearCache()
    }

    // 搜索
    public onChangeSearch(treeId: string, searchStr: string, paramsName?: string): void {
        if (!treeId) {
            return;
        }
        if (!paramsName) {
            paramsName = "Name";
        }
        this.$timeout(() => {
            this.treeService.filterShowNodes(treeId, paramsName, searchStr);
        });
    }
    /* 初始化树的数据 */
    private initModalData(): void {
        // 请求树数据并更新到内存
        this.getAreaAndCamera().then((res: Array<CameraEx & AreaEx>) => {
            this.CameraOnTheLamp.treeDatas = res;
            if (res) { this.taskStoreService.updateCameraTreeWithArea(res) }
        });
        this.getAreaAndWifi().then((res: Array<WifiEx & AreaEx>) => {
            this.WifiOnTheLamp.treeDatas = res;
            if (res) { this.taskStoreService.updateWifiTreeWithArea(res) }
        });
        this.getAreaAndRmpGate().then((res: Array<RmpGateEx & AreaEx>) => {
            this.RmpGateOnTheLamp.treeDatas = res;
            if (res) { this.taskStoreService.updateRmpGateTreeWithArea(res) }
        });
        this.getAreaAndElectronicFence().then((res: Array<ElectronicFenceEx & AreaEx>) => {
            this.ElectronicFenceOnTheLamp.treeDatas = res;
            if (res) { this.taskStoreService.updateElectronicFenceTreeWithArea(res) }
        });
        // 获取缓存的树结构并显示
        let cameraTreeDatas: Array<CameraEx & AreaEx> = this.taskStoreService.getTreeWithArea;
        let wifiTreeDatas: Array<WifiEx & AreaEx> = this.taskStoreService.getTreeWithWifi;
        let rmpgateTreeDatas: Array<RmpGateEx & AreaEx> = this.taskStoreService.getTreeWithRmpGate;
        let electronicfenceTreeDatas: Array<ElectronicFenceEx & AreaEx> = this.taskStoreService.getTreeWithElectronicFence;

        if (cameraTreeDatas || wifiTreeDatas || rmpgateTreeDatas || electronicfenceTreeDatas) {
            this.CameraOnTheLamp.treeDatas = cameraTreeDatas;
            this.WifiOnTheLamp.treeDatas = wifiTreeDatas;
            this.RmpGateOnTheLamp.treeDatas = rmpgateTreeDatas;
            this.ElectronicFenceOnTheLamp.treeDatas = electronicfenceTreeDatas;
        }
    };
    // 初始化获取电围
    private initLampTreeParamsForElectronicFence() {
        this.ElectronicFenceOnTheLamp = new TreeDataParams<ElectronicFenceEx & AreaEx>(true);
        this.ElectronicFenceOnTheLamp.treeId = this.ElectronicFenceTreeIdForLamp;
        this.ElectronicFenceOnTheLamp.isShowIcon = true;
        this.ElectronicFenceOnTheLamp.isShowLine = false;
        this.ElectronicFenceOnTheLamp.checkEnable = true;
        this.ElectronicFenceOnTheLamp.isSingleSelect = false;
        this.ElectronicFenceOnTheLamp.isSimpleData = true;
        this.ElectronicFenceOnTheLamp.onCheck = (event: Event, treeId: string, treeNode: any): void => {
            this.$timeout(() => {
                this.ElectronicFenceSelectedListForLamp = this.getCheckedList(TreeType.ElectronicFence.value, treeId);
                let resultIdList = [] as Array<string>;
                angular.forEach(this.ElectronicFenceSelectedListForLamp, (val: AreaEx) => {
                    resultIdList.push(val.ID);
                });
                this.taskStoreService.updateSelectElectronicFenceList(resultIdList);
            });
        };
        this.ElectronicFenceOnTheLamp.addDiyDom = (treeId: string, treeNode: any) => {
            this.treeService.addDiyDomIsConfiStatus(treeId, treeNode)
        }
        this.ElectronicFenceOnTheLamp.treeInitComplete = (treeId: string): void => {
            let checkedIdList: Array<string> = this.getSelectedIdList(this.AlarmTypes.ElectronicFenceTreeId.key);
            if (checkedIdList.length > 0) {
                console.log("初始化电围树----------------");
                console.log(TreeType.ElectronicFence.value);
                console.log(this.ElectronicFenceTreeIdForLamp);
                console.log(checkedIdList);
                console.log(this.AlarmTypes.ElectronicFenceTreeId.key);
                this.defaultCheckTreeByIds(TreeType.ElectronicFence.value, this.ElectronicFenceTreeIdForLamp, checkedIdList, this.AlarmTypes.ElectronicFenceTreeId.key);
            }
        };
    }
    // 初始化获取卡口
    private initLampTreeParamsForRmpGate() {
        this.RmpGateOnTheLamp = new TreeDataParams<RmpGateEx & AreaEx>(true);
        this.RmpGateOnTheLamp.treeId = this.RmpGateTreeIdForLamp;
        this.RmpGateOnTheLamp.isShowIcon = true;
        this.RmpGateOnTheLamp.isShowLine = false;
        this.RmpGateOnTheLamp.checkEnable = true;
        this.RmpGateOnTheLamp.isSingleSelect = false;
        this.RmpGateOnTheLamp.isSimpleData = true;
        this.RmpGateOnTheLamp.onCheck = (event: Event, treeId: string, treeNode: any): void => {
            this.$timeout(() => {
                this.RmpGateSelectedListForLamp = this.getCheckedList(TreeType.rmpGate.value, treeId);
                let resultIdList = [] as Array<string>;
                angular.forEach(this.RmpGateSelectedListForLamp, (val: AreaEx) => {
                    resultIdList.push(val.ID);
                });
                this.taskStoreService.updateSelectRmpGateList(resultIdList);
            });
        };
        this.RmpGateOnTheLamp.addDiyDom = (treeId: string, treeNode: any) => {
            this.treeService.addDiyDomIsConfiStatus(treeId, treeNode)
        }
        this.RmpGateOnTheLamp.treeInitComplete = (treeId: string): void => {
            let checkedIdList: Array<string> = this.getSelectedIdList(this.AlarmTypes.RmpGateTreeId.key);
            if (checkedIdList.length > 0) {
                this.defaultCheckTreeByIds(TreeType.rmpGate.value, this.RmpGateTreeIdForLamp, checkedIdList, this.AlarmTypes.RmpGateTreeId.key);
            }
        };
    }
    // 初始化获取wifi
    private initLampTreeParamsForWifi() {
        this.WifiOnTheLamp = new TreeDataParams<WifiEx & AreaEx>(true);
        this.WifiOnTheLamp.treeId = this.WifiTreeIdForLamp;
        this.WifiOnTheLamp.isShowIcon = true;
        this.WifiOnTheLamp.isShowLine = false;
        this.WifiOnTheLamp.checkEnable = true;
        this.WifiOnTheLamp.isSingleSelect = false;
        this.WifiOnTheLamp.isSimpleData = true;
        this.WifiOnTheLamp.onCheck = (event: Event, treeId: string, treeNode: any): void => {
            this.$timeout(() => {
                this.WifiSelectedListForLamp = this.getCheckedList(TreeType.wifi.value, treeId);
                let resultIdList = [] as Array<string>;
                angular.forEach(this.WifiSelectedListForLamp, (val: AreaEx) => {
                    resultIdList.push(val.ID);
                });
                this.taskStoreService.updateSelectWifiList(resultIdList);
            });
        };
        this.WifiOnTheLamp.addDiyDom = (treeId: string, treeNode: any) => {
            this.treeService.addDiyDomIsConfiStatus(treeId, treeNode)
        }
        this.WifiOnTheLamp.treeInitComplete = (treeId: string): void => {
            let checkedIdList: Array<string> = this.getSelectedIdList(this.AlarmTypes.WifiTreeId.key);
            if (checkedIdList.length > 0) {
                //wifi WifiTreeIdForLamp ["00396b02fc8f44ffa4f8fa8252b8f667"]  WifiTreeId
                this.defaultCheckTreeByIds(TreeType.wifi.value, this.WifiTreeIdForLamp, checkedIdList, this.AlarmTypes.WifiTreeId.key);
            }
        };
    }
    // 初始化获取摄像头树
    private initLampTreeParamsForCamera() {
        this.CameraOnTheLamp = new TreeDataParams<CameraEx & AreaEx>(true);
        this.CameraOnTheLamp.treeId = this.CameraTreeIdForLamp;
        this.CameraOnTheLamp.isShowIcon = true;
        this.CameraOnTheLamp.isShowLine = false;
        this.CameraOnTheLamp.checkEnable = true;
        this.CameraOnTheLamp.isSingleSelect = false;
        this.CameraOnTheLamp.isSimpleData = true;
        this.CameraOnTheLamp.onCheck = (event: Event, treeId: string, treeNode: any): void => {
            this.$timeout(() => {
                this.CameraSelectedListForLamp = this.getCheckedList(TreeType.camera.value, treeId);
                console.log(this.CameraSelectedListForLamp);
                let resultIdList = [] as Array<string>;
                angular.forEach(this.CameraSelectedListForLamp, (val: AreaEx) => {
                    resultIdList.push(val.ID);
                });
                this.taskStoreService.updateSelectCameraList(resultIdList);
            });
        };
        this.CameraOnTheLamp.addDiyDom = (treeId: string, treeNode: any) => {
            this.treeService.addDiyDomIsConfiStatus(treeId, treeNode)
        }

        this.CameraOnTheLamp.treeInitComplete = (treeId: string): void => {
            let checkedIdList: Array<string> = this.getSelectedIdList(this.AlarmTypes.CameraTreeId.key);
            if (checkedIdList.length > 0) {
                this.defaultCheckTreeByIds(TreeType.camera.value, this.CameraTreeIdForLamp, checkedIdList, this.AlarmTypes.CameraTreeId.key);
            }
        };
    };
    // 获取所有摄像头树数组
    private getAreaAndCamera() {
        return this.connectTreeService.findAreaCamera().then((res: Array<AreaEx | CameraEx>) => {
            return res
        })
    }
    // 获取所有WIFI树数组
    private getAreaAndWifi() {
        return this.connectTreeService.findAreaWithWifi().then((res: Array<AreaEx | WifiEx>) => {
            return res
        })
    }
    // 获取所有卡口树数组
    private getAreaAndRmpGate() {
        return this.connectTreeService.findAreaWithRmpgate().then((res: Array<AreaEx | RmpGateEx>) => {
            return res
        })
    }
    // 获取所有电围树数组
    private getAreaAndElectronicFence() {
        return this.connectTreeService.findAreaWithElectronicfence().then((res: Array<AreaEx | ElectronicFenceEx>) => {
            return res
        })
    }
    // 标签页切换
    public toggleCamera(arg: string) {
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
    }
    // 获取所有选中行政区域摄像头数据
    private getCheckedList(treeType: string, treeId: string): any {

        let treeCheckedNodes = this.treeService.getCheckedNodes(treeId, true);

        let result: any = [] as any;
        if (treeCheckedNodes) {
            angular.forEach(treeCheckedNodes, (val: any) => {
                if (val.treeType === treeType) {
                    result.push(val);
                }
            });
        }
        return result;
    }
    // 获取所有选中ID
    private getSelectedIdList(key: string): Array<string> {
        let result = [] as Array<string>;
        switch (key) {
            case this.AlarmTypes.CameraTreeId.key:
                if (this.taskStoreService.SelectCameraList) {
                    result = this.taskStoreService.SelectCameraList
                    console.log('camera', result)
                }
                break;
            case this.AlarmTypes.WifiTreeId.key:
                if (this.taskStoreService.SelectWifiList) {
                    result = this.taskStoreService.SelectWifiList
                    console.log('wifi', result)
                }
                break;
            case this.AlarmTypes.RmpGateTreeId.key:
                if (this.taskStoreService.SelectRmpGateList) {
                    result = this.taskStoreService.SelectRmpGateList
                    console.log('rmpgate', result)
                }
                break;
            case this.AlarmTypes.ElectronicFenceTreeId.key:
                if (this.taskStoreService.SelectElectronicFenceList) {
                    result = this.taskStoreService.SelectElectronicFenceList
                    console.log('electronicfence', result)
                }
                break;
            default:
                return;
        }

        return result;

    }

    // 移除 已选 目的项
    public removeSelected(pItem: any, key: string) {
        if (pItem.tId) {
            switch (key) {
                case this.AlarmTypes.CameraTreeId.key:
                    this.treeService.updateNodeChecked(this.CameraTreeIdForLamp, pItem.tId, false);
                    this.CameraSelectedListForLamp = this.getCheckedList(TreeType.camera.value, this.CameraTreeIdForLamp);
                    break;
                case this.AlarmTypes.WifiTreeId.key:
                    this.treeService.updateNodeChecked(this.WifiTreeIdForLamp, pItem.tId, false);
                    this.WifiSelectedListForLamp = this.getCheckedList(TreeType.wifi.value, this.WifiTreeIdForLamp);
                    break;
                case this.AlarmTypes.RmpGateTreeId.key:
                    this.treeService.updateNodeChecked(this.RmpGateTreeIdForLamp, pItem.tId, false);
                    this.RmpGateSelectedListForLamp = this.getCheckedList(TreeType.rmpGate.value, this.RmpGateTreeIdForLamp);
                    break;
                case this.AlarmTypes.ElectronicFenceTreeId.key:
                    this.treeService.updateNodeChecked(this.ElectronicFenceTreeIdForLamp, pItem.tId, false);
                    this.ElectronicFenceSelectedListForLamp = this.getCheckedList(TreeType.camera.value, this.ElectronicFenceTreeIdForLamp);
                    break;
                default:
                    return;
            }
        } else {
            return false;
        }
    }
    // 清空所有已选项
    public removeAllSelected(key: string) {
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

    }
    // 默认选择指定ID
    //wifi WifiTreeIdForLamp ["00396b02fc8f44ffa4f8fa8252b8f667"]  WifiTreeId
    private defaultCheckTreeByIds = (treeType: string, treeId: string, ids: Array<string>, key: string): void => {
        let paramName = "ID";

        if (ids.length > 0) {
            let checkParamsList = [] as Array<{ key: string, value: string }>;
            angular.forEach(ids, (val: string) => {
                checkParamsList.push({ key: paramName, value: val });
            });
            if (this.treeService.checkNodesByParamsList(treeId, checkParamsList, true)) {
                switch (key) {
                    case this.AlarmTypes.CameraTreeId.key:
                        this.CameraSelectedListForLamp = this.getCheckedList(treeType, treeId);
                        break;
                    case this.AlarmTypes.WifiTreeId.key:
                        this.WifiSelectedListForLamp = this.getCheckedList(treeType, treeId);
                        break;
                    case this.AlarmTypes.RmpGateTreeId.key:
                        this.RmpGateSelectedListForLamp = this.getCheckedList(treeType, treeId);
                        break;
                    case this.AlarmTypes.ElectronicFenceTreeId.key:
                        this.ElectronicFenceSelectedListForLamp = this.getCheckedList(treeType, treeId);
                        break;
                    default:
                        return;
                }
            }
        } else {
            switch (key) {
                case this.AlarmTypes.CameraTreeId.key:
                    this.CameraSelectedListForLamp = [];
                    break;
                case this.AlarmTypes.WifiTreeId.key:
                    this.WifiSelectedListForLamp = [];
                    break;
                case this.AlarmTypes.RmpGateTreeId.key:
                    this.RmpGateSelectedListForLamp = [];
                    break;
                case this.AlarmTypes.ElectronicFenceTreeId.key:
                    this.ElectronicFenceSelectedListForLamp = [];
                    break;
                default:
                    return;
            }
        }
    };

}

app.controller('lampPopupController', LampPopupController);