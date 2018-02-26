/// <amd-dependency path="text!./map.popup.html" name="PopupHtml" />



import "./map.popup.controller"
import { app } from "../../common/app/main.app";
import { NPGisMapMain } from "../../common/map/map.main";
import { MapConfigModel } from "../../common/map/core/model/map.config.model";
import { IMapService } from "../../common/services/map.service";
import "../../common/services/map.service";
import { MapConfigJsonEnum } from "../../common/enum/MapConfigJsonEnum";
import { SystemPoint } from "../../../core/entity/SystemPoint";
import { BackResponseBody, ResponseResult } from "../../../core/params/result/ResponseResult";
import { ObjectType } from "../../../core/enum/ObjectType";
import { CameraEx } from "../../../core/entity/ex/CameraEx";
import { AreaEx } from "../../../core/entity/ex/AreaEx";
import { RmpGateEx } from "../../../core/entity/ex/RmpGateEx";
import { Enum } from "../../../core/enum/Enum";
import { TreeDataParams } from "../../common/directive/tree/tree-params";
import { ElectronicFenceEx } from "../../../core/entity/ex/ElectronicFenceEx";
import { WifiEx } from "../../../core/entity/ex/WifiEx";
import { TreeType } from "../../../core/enum/TreeType";
import { IConnectTreeService } from "../../common/services/connectTree.service";
import "../../common/services/connectTree.service";
import { LayerType } from "../../../core/enum/LayerType";
import { ITreeDirectiveService } from './../../common/directive/tree/tree.directive.service';
import './../../common/directive/tree/tree.directive.service';
import { IMapEventFactory } from './../../common/factory/map.event.factory';
import './../../common/factory/map.event.factory';

let Promise = require('es6-promise');
declare let require: any, $: any, PopupHtml: any;

class MapResourcePointController {
    static $inject = ['$scope', '$timeout', '$compile', 'mapService', 'connectTreeService', 'treeDirectiveService', 'mapEventFactory'];
    map: NPGisMapMain;
    mapId: string = "MapResourcePointMap";
    mapConfigName: string = MapConfigJsonEnum.MAPCONFIG;
    systemList: Array<SystemPoint> = [];
    systemListMap: { [key: string]: SystemPoint } = {};
    winInfoMap: { [key: string]: string } = {};
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
    mouseWinInfo: string;

    constructor(private $scope: any, private $timeout: any, private $compile: any,
        private mapService: IMapService,
        private connectTreeService: IConnectTreeService, private treeDirectiveService: ITreeDirectiveService,
        private mapEventFactory: IMapEventFactory
    ) {
        this.$scope.$on('close.map.point.popup', (event: any, model: SystemPoint, ID: string, flag?: boolean) => {
            delete this.winInfoMap[model.ObjectID];
            this.map.getInfoWindowByID(ID).close();
            this.map.removeMarker(model);
            if (flag) {
                this.map.renderMarker(model);
                this.savePoint(model);
            } else {
                if (this.systemListMap[model.ObjectID]) {
                    this.map.renderMarker(this.systemListMap[model.ObjectID]);
                }
            }
        });
        this.$scope.$on("$destroy", () => {
            this.mapEventFactory.destroy();
            this.map.destroy();
        });
        this.initMap();
        this.initTreeData();
    }

    /**
     * @title 初始地图
     */
    initMap() {
        console.log(1111)
        let _self = this as MapResourcePointController;
        Promise.all([
            _self.mapService.getMapConfig(_self.mapConfigName),
            _self.mapService.getSystemPoints()
        ]).then((res: [MapConfigModel, ResponseResult<Array<SystemPoint>>]) => {
            _self.map = new NPGisMapMain();
            _self.map.init(this.mapId, res[0]);
            if (res[1].code === 200) {
                _self.systemList = res[1].data;
                _self.systemList.forEach((item: SystemPoint, index: number) => {
                    _self.systemListMap[item.ObjectID] = item;
                    if (item.LayerType === LayerType.LampPost.value) {
                        _self.systemList.splice(index, 1);
                    }
                })
            }
            _self.mapEventFactory.init(_self.map);
            _self.map.renderMarkers(_self.systemList, {
                click: _self.clickMarkersCallback.bind(_self)
            })
        })

    }

    clickMarkersCallback(marker: NPMapLib.Symbols.ClusterMarker & SystemPoint) {
        let point = marker.getPosition();
        let model = new SystemPoint();
        model.ID = marker.ID;
        model.LayerType = marker.LayerType;
        model.ObjectID = marker.ObjectID;
        model.ObjectName = marker.ObjectName;
        model.ObjectState = marker.ObjectState;
        model.ObjectType = marker.ObjectType;
        model.TaskStatus = marker.TaskStatus;
        model.Lon = point.lon;
        model.Lat = point.lat
        this.createPopup(point, model)
    }


    initTreeData() {
        this.treeParams.treeId = 'MapDeviceSelectTree';
        this.treeParams.treeDatas = [];
        this.treeParams.isShowIcon = true;
        this.treeParams.isShowLine = false;
        this.treeParams.checkEnable = false;
        this.treeParams.isSingleSelect = false;
        this.treeParams.isSimpleData = true;
        this.treeParams.treeInitComplete = (treeId: string): void => {
        };
        this.treeParams.addDiyDom = (treeId: string, treeNode: any) => {
            this.treeDirectiveService.addDiyDomIsConfiStatus(treeId, treeNode, 'isConfigPoint')
        }
        this.treeParams.onDblClick = (event: Event, treeId: string, treeNode: any) => {
            if (!treeNode.isConfigPoint) {
                return false
            }
            let point = this.systemListMap[treeNode.ID];
            let p = new NPMapLib.Geometry.Point(point.Lon, point.Lat);
            this.map.setCenter(p, this.map.getZoom());
            this.createPopup(p, point)
        }
        this.treeParams.beforeMouseDown = (treeId: string, treeNode: any) => {
            if (!treeNode ||
                !(
                    treeNode.treeType === TreeType.camera.value ||
                    treeNode.treeType === TreeType.wifi.value ||
                    treeNode.treeType === TreeType.ElectronicFence.value ||
                    treeNode.treeType === TreeType.rmpGate.value
                )
            ) {
                return false
            }
            this.map.startLocate(treeNode.Name).then((point: NPMapLib.Geometry.Point) => {
                let newMaker = {} as SystemPoint;
                newMaker.Lat = point.lat;
                newMaker.Lon = point.lon;
                newMaker.ObjectName = treeNode.Name;
                newMaker.ObjectID = treeNode.ID;
                switch (treeNode.treeType) {
                    case TreeType.camera.value:
                        newMaker.LayerType = treeNode.CameraType || LayerType.Camera.value;
                        newMaker.ObjectType = ObjectType.Camera.value;
                        break;
                    case TreeType.ElectronicFence.value:
                        newMaker.LayerType = LayerType.ElectronicFence.value;
                        newMaker.ObjectType = ObjectType.ElectronicFence.value;
                        break;
                    case TreeType.wifi.value:
                        newMaker.LayerType = LayerType.WiFi.value;
                        newMaker.ObjectType = ObjectType.Wifi.value;
                        break;
                    case TreeType.rmpGate.value:
                        newMaker.LayerType = LayerType.RmpGate.value;
                        newMaker.ObjectType = ObjectType.RmpGate.value;
                        break;
                }
                if (this.systemListMap[treeNode.ID]) {
                    this.map.removeMarker(this.systemListMap[treeNode.ID])
                }
                if (this.winInfoMap[treeNode.ID]) {
                    this.map.getInfoWindowByID(this.winInfoMap[treeNode.ID]).close();
                }
                console.log(treeNode, newMaker);
                this.map.renderMarker(newMaker);
                this.createPopup(point, newMaker)
            });

            return false;
        };
        this.getDeviceTreeData();
    }

    changeSelectDevice(item: Enum) {
        this.selectDeviceType = item.value;
        this.setTreeDataForType();
    }

    private createPopup(point: NPMapLib.Geometry.Point, data: SystemPoint) {
        let scope: { model: SystemPoint, ID: string, $destroy: Function } = this.$scope.$new();
        scope.model = data;
        let winInfo = this.mapEventFactory.createPopup(point, scope, PopupHtml)
        scope.ID = winInfo;
        this.winInfoMap[data.ObjectID] = winInfo;
    }

    compileDomSize(ele: any): { width: number, height: number } {
        let domEle = $(ele);
        $('body').append(domEle);
        let size = {
            width: domEle.outerWidth(),
            height: domEle.outerHeight()
        }
        domEle.remove();
        return size;
    }

    getDeviceTreeData() {
        let _self = this as MapResourcePointController;
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

    private savePoint(model: SystemPoint) {
        this.mapService.saveOrUpdateSystemPoint(model).then((res: BackResponseBody<string | boolean>) => {
            if (res.code === 200) {
                console.info(model.ObjectName, model.Lon, model.Lat, '保存成功！');
                if (!model.ID) {
                    let treeNode: any = this.treeDirectiveService.getNodeByParam(this.treeParams.treeId, 'ID', model.ObjectID)
                    if (treeNode) treeNode.isConfigPoint = true;
                    this.treeDirectiveService.addDiyDomIsConfiStatus(this.treeParams.treeId, treeNode, 'isConfigPoint')
                }
            }
        })
    }

}

app.controller("mapResourcePointController", MapResourcePointController);