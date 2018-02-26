/// <reference path="../../../../../@types/map/index.d.ts" />

import { LayerIconEnum, MapLayerIcon } from './../../../../../core/enum/MapLayerIcon';
import OverlayLayerOpts = NPMapLib.Layers.OverlayLayerOpts;
import PortraitTool from "../../../portrait-tool";
import { LayerType } from "../../../../../core/enum/LayerType";
/**
 * 图层工厂
 * 配置聚合图层的展示效果
 */
export class OverlayFactory {

    static getClusterOverlayOpt(opts: OverlayLayerOpts) {
        if (opts) {
            return PortraitTool.extend(true, {}, OverlayFactory.getDefaultClusterOverlayOpt(), opts);
        }
        return OverlayFactory.getDefaultClusterOverlayOpt();
    }

    private static getDefaultClusterOverlayOpt(): OverlayLayerOpts {
        return {
            getUrl: function (count: number, marker: NPMapLib.Symbols.ClusterMarker | any): string { // 获取用户的设备信息 修改by lb
                let url: string;
                if (count) {
                    //url = "/images/map-icon/blue-locate-icon.png";
                } else {
                    switch (marker.LayerType) {
                        case LayerType.Camera.value:
                        case LayerType.NormalCamera.value:
                            if (marker.ObjectState == "offline" || '') {
                                url = MapLayerIcon.NormalCamera.LayerIconURL[0]
                            } else if (marker.TaskStatus == 1) {
                                url = MapLayerIcon.NormalCamera.LayerIconURL[1]
                            } else {
                                url = MapLayerIcon.NormalCamera.LayerIconURL[2]
                            }
                            break;
                        case LayerType.HighCamera.value:
                            if (marker.ObjectState == "offline" || '') {
                                url = MapLayerIcon.HighCamera.LayerIconURL[0]
                            } else if (marker.TaskStatus == 1) {
                                url = MapLayerIcon.HighCamera.LayerIconURL[1]
                            } else {
                                url = MapLayerIcon.HighCamera.LayerIconURL[2]
                            }
                            break;
                        case LayerType.FaceCamera.value:
                            if (marker.ObjectState == "offline" || '') {
                                url = MapLayerIcon.FaceCamera.LayerIconURL[0]
                            } else if (marker.TaskStatus == 1) {
                                url = MapLayerIcon.FaceCamera.LayerIconURL[1]
                            } else {
                                url = MapLayerIcon.FaceCamera.LayerIconURL[2]
                            }
                            break;
                        case LayerType.PortraitCamera.value:
                            if (marker.ObjectState == "offline" || '') {
                                url = MapLayerIcon.PortraitCamera.LayerIconURL[0]
                            } else if (marker.TaskStatus == 1) {
                                url = MapLayerIcon.PortraitCamera.LayerIconURL[1]
                            } else {
                                url = MapLayerIcon.PortraitCamera.LayerIconURL[2]
                            }
                            break;
                        case LayerType.WiFi.value:
                            if (marker.ObjectState == "offline" || '') {
                                url = MapLayerIcon.WiFi.LayerIconURL[0]
                            } else if (marker.TaskStatus == 1) {
                                url = MapLayerIcon.WiFi.LayerIconURL[1]
                            } else {
                                url = MapLayerIcon.WiFi.LayerIconURL[2]
                            }
                            break;
                        case LayerType.ElectronicFence.value:
                            if (marker.ObjectState == "offline" || '') {
                                url = MapLayerIcon.ElectronicFence.LayerIconURL[0]
                            } else if (marker.TaskStatus == 1) {
                                url = MapLayerIcon.ElectronicFence.LayerIconURL[1]
                            } else {
                                url = MapLayerIcon.ElectronicFence.LayerIconURL[2]
                            }
                            break;
                        case LayerType.LampPost.value:
                            url = MapLayerIcon.LampPost.LayerIconURL[2]
                            break;
                        case LayerType.RmpGate.value:
                            if (marker.ObjectState == "offline" || '') {
                                url =  MapLayerIcon.RmpGate.LayerIconURL[0]
                            } else if (marker.TaskStatus == 1) {
                                url = MapLayerIcon.RmpGate.LayerIconURL[1]
                            } else {
                                url = MapLayerIcon.RmpGate.LayerIconURL[2]
                            }
                            break;
                    }
                }
                return url;
            },
            getImageSize: function (count: number, marker: NPMapLib.Symbols.ClusterMarker): { width: number, height: number } {
                if (count) {
                    return {
                        width: 35,
                        height: 28
                    }
                } else {
                    return {
                        width: 30,
                        height: 30
                    }
                }
            },
            clusterClickModel: 'zoom', //示例为slice  ,zoom是放大
            //点击摄像机点位
            click: function (f: NPMapLib.Symbols.ClusterMarker) {
                console.log("click.clusterMarker", f);
            },
            getContent: function (f: any) {
                if (f.attributes.count > 5) {
                    return f.attributes.count;
                }

            },
            getClusterBGColor: function (marker: NPMapLib.Symbols.ClusterMarker): string {
                return '#2C85F6';
            },
            getClusterBGStroke: function (marker: NPMapLib.Symbols.ClusterMarker) {
                return "#FFFFFF";
            },
            getBackGroundColor: function (marker: NPMapLib.Symbols.ClusterMarker) {
                return "#2C85F6";
            },
            getBackGroundStroke: function (marker: NPMapLib.Symbols.ClusterMarker) {
                return "#FFFFFF";
            },
            getCustomLabelOffset: function () {
                return {
                    width: 0,
                    height: 0
                }
            },
            mouseover: function (marker: any) {
                marker.changeStyle({
                    label: marker.ObjectName,
                    labelYOffset: 30,
                    labelBackgroundColor: '#FFFFFF',
                    labelBackGroundRXY: 2,
                    labelBackGroundMargin: 15,
                    showArrow: true,
                    fontColor: '#333333',
                    fontWeight: 'bold',
                    fontSize: 14,
                    labelBackGroundStroke: "#E4E4E4"
                }, true);
            },
            mouseout: function (marker: NPMapLib.Symbols.ClusterMarker) {
                marker.changeStyle({
                    label: ""
                }, true);
            },
            clusteronmouseover: function (m: any) {//大点 的鼠标移入事件
                //console.log("clusteronmouseover", m);
            },
            clusterclick: function (m: any) {
                //console.log("clusterclick", m);
            },
            getRotation: function (count: number, marker: NPMapLib.Symbols.ClusterMarker) {
                return 0;
            },
            showOrHideArrow: function (count: number, f: any) {
                if (count) {
                    return true;
                } else {
                    return false;
                }
            },
            isAsynchronous: false,
            labelYOffset: 0,
            labelBackGroundRXY: 5,
            labelBackGroundMargin: 10,
            fontColor: '#FFFFFF',
            fontSize:14,
            distance: 100,	//示例为200
            maxZoom: 18
        }
    }
}