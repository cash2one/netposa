define(["require", "exports", "./../../../../../core/enum/MapLayerIcon", "../../../portrait-tool", "../../../../../core/enum/LayerType"], function (require, exports, MapLayerIcon_1, portrait_tool_1, LayerType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OverlayFactory = (function () {
        function OverlayFactory() {
        }
        OverlayFactory.getClusterOverlayOpt = function (opts) {
            if (opts) {
                return portrait_tool_1.default.extend(true, {}, OverlayFactory.getDefaultClusterOverlayOpt(), opts);
            }
            return OverlayFactory.getDefaultClusterOverlayOpt();
        };
        OverlayFactory.getDefaultClusterOverlayOpt = function () {
            return {
                getUrl: function (count, marker) {
                    var url;
                    if (count) {
                    }
                    else {
                        switch (marker.LayerType) {
                            case LayerType_1.LayerType.Camera.value:
                            case LayerType_1.LayerType.NormalCamera.value:
                                if (marker.ObjectState == "offline" || '') {
                                    url = MapLayerIcon_1.MapLayerIcon.NormalCamera.LayerIconURL[0];
                                }
                                else if (marker.TaskStatus == 1) {
                                    url = MapLayerIcon_1.MapLayerIcon.NormalCamera.LayerIconURL[1];
                                }
                                else {
                                    url = MapLayerIcon_1.MapLayerIcon.NormalCamera.LayerIconURL[2];
                                }
                                break;
                            case LayerType_1.LayerType.HighCamera.value:
                                if (marker.ObjectState == "offline" || '') {
                                    url = MapLayerIcon_1.MapLayerIcon.HighCamera.LayerIconURL[0];
                                }
                                else if (marker.TaskStatus == 1) {
                                    url = MapLayerIcon_1.MapLayerIcon.HighCamera.LayerIconURL[1];
                                }
                                else {
                                    url = MapLayerIcon_1.MapLayerIcon.HighCamera.LayerIconURL[2];
                                }
                                break;
                            case LayerType_1.LayerType.FaceCamera.value:
                                if (marker.ObjectState == "offline" || '') {
                                    url = MapLayerIcon_1.MapLayerIcon.FaceCamera.LayerIconURL[0];
                                }
                                else if (marker.TaskStatus == 1) {
                                    url = MapLayerIcon_1.MapLayerIcon.FaceCamera.LayerIconURL[1];
                                }
                                else {
                                    url = MapLayerIcon_1.MapLayerIcon.FaceCamera.LayerIconURL[2];
                                }
                                break;
                            case LayerType_1.LayerType.PortraitCamera.value:
                                if (marker.ObjectState == "offline" || '') {
                                    url = MapLayerIcon_1.MapLayerIcon.PortraitCamera.LayerIconURL[0];
                                }
                                else if (marker.TaskStatus == 1) {
                                    url = MapLayerIcon_1.MapLayerIcon.PortraitCamera.LayerIconURL[1];
                                }
                                else {
                                    url = MapLayerIcon_1.MapLayerIcon.PortraitCamera.LayerIconURL[2];
                                }
                                break;
                            case LayerType_1.LayerType.WiFi.value:
                                if (marker.ObjectState == "offline" || '') {
                                    url = MapLayerIcon_1.MapLayerIcon.WiFi.LayerIconURL[0];
                                }
                                else if (marker.TaskStatus == 1) {
                                    url = MapLayerIcon_1.MapLayerIcon.WiFi.LayerIconURL[1];
                                }
                                else {
                                    url = MapLayerIcon_1.MapLayerIcon.WiFi.LayerIconURL[2];
                                }
                                break;
                            case LayerType_1.LayerType.ElectronicFence.value:
                                if (marker.ObjectState == "offline" || '') {
                                    url = MapLayerIcon_1.MapLayerIcon.ElectronicFence.LayerIconURL[0];
                                }
                                else if (marker.TaskStatus == 1) {
                                    url = MapLayerIcon_1.MapLayerIcon.ElectronicFence.LayerIconURL[1];
                                }
                                else {
                                    url = MapLayerIcon_1.MapLayerIcon.ElectronicFence.LayerIconURL[2];
                                }
                                break;
                            case LayerType_1.LayerType.LampPost.value:
                                url = MapLayerIcon_1.MapLayerIcon.LampPost.LayerIconURL[2];
                                break;
                            case LayerType_1.LayerType.RmpGate.value:
                                if (marker.ObjectState == "offline" || '') {
                                    url = MapLayerIcon_1.MapLayerIcon.RmpGate.LayerIconURL[0];
                                }
                                else if (marker.TaskStatus == 1) {
                                    url = MapLayerIcon_1.MapLayerIcon.RmpGate.LayerIconURL[1];
                                }
                                else {
                                    url = MapLayerIcon_1.MapLayerIcon.RmpGate.LayerIconURL[2];
                                }
                                break;
                        }
                    }
                    return url;
                },
                getImageSize: function (count, marker) {
                    if (count) {
                        return {
                            width: 35,
                            height: 28
                        };
                    }
                    else {
                        return {
                            width: 30,
                            height: 30
                        };
                    }
                },
                clusterClickModel: 'zoom',
                click: function (f) {
                    console.log("click.clusterMarker", f);
                },
                getContent: function (f) {
                    if (f.attributes.count > 5) {
                        return f.attributes.count;
                    }
                },
                getClusterBGColor: function (marker) {
                    return '#2C85F6';
                },
                getClusterBGStroke: function (marker) {
                    return "#FFFFFF";
                },
                getBackGroundColor: function (marker) {
                    return "#2C85F6";
                },
                getBackGroundStroke: function (marker) {
                    return "#FFFFFF";
                },
                getCustomLabelOffset: function () {
                    return {
                        width: 0,
                        height: 0
                    };
                },
                mouseover: function (marker) {
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
                mouseout: function (marker) {
                    marker.changeStyle({
                        label: ""
                    }, true);
                },
                clusteronmouseover: function (m) {
                },
                clusterclick: function (m) {
                },
                getRotation: function (count, marker) {
                    return 0;
                },
                showOrHideArrow: function (count, f) {
                    if (count) {
                        return true;
                    }
                    else {
                        return false;
                    }
                },
                isAsynchronous: false,
                labelYOffset: 0,
                labelBackGroundRXY: 5,
                labelBackGroundMargin: 10,
                fontColor: '#FFFFFF',
                fontSize: 14,
                distance: 100,
                maxZoom: 18
            };
        };
        return OverlayFactory;
    }());
    exports.OverlayFactory = OverlayFactory;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL21hcC9jb3JlL21vZGVsL292ZXJsYXkuZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFVQTtRQUFBO1FBK0tBLENBQUM7UUE3S1UsbUNBQW9CLEdBQTNCLFVBQTRCLElBQXNCO1lBQzlDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsTUFBTSxDQUFDLHVCQUFZLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsY0FBYyxDQUFDLDJCQUEyQixFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDN0YsQ0FBQztZQUNELE1BQU0sQ0FBQyxjQUFjLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUN4RCxDQUFDO1FBRWMsMENBQTJCLEdBQTFDO1lBQ0ksTUFBTSxDQUFDO2dCQUNILE1BQU0sRUFBRSxVQUFVLEtBQWEsRUFBRSxNQUE0QztvQkFDekUsSUFBSSxHQUFXLENBQUM7b0JBQ2hCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBRVosQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDdkIsS0FBSyxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7NEJBQzVCLEtBQUsscUJBQVMsQ0FBQyxZQUFZLENBQUMsS0FBSztnQ0FDN0IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxTQUFTLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQ0FDeEMsR0FBRyxHQUFHLDJCQUFZLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQ0FDbkQsQ0FBQztnQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUNoQyxHQUFHLEdBQUcsMkJBQVksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFBO2dDQUNuRCxDQUFDO2dDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNKLEdBQUcsR0FBRywyQkFBWSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0NBQ25ELENBQUM7Z0NBQ0QsS0FBSyxDQUFDOzRCQUNWLEtBQUsscUJBQVMsQ0FBQyxVQUFVLENBQUMsS0FBSztnQ0FDM0IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxTQUFTLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQ0FDeEMsR0FBRyxHQUFHLDJCQUFZLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQ0FDakQsQ0FBQztnQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUNoQyxHQUFHLEdBQUcsMkJBQVksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFBO2dDQUNqRCxDQUFDO2dDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNKLEdBQUcsR0FBRywyQkFBWSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0NBQ2pELENBQUM7Z0NBQ0QsS0FBSyxDQUFDOzRCQUNWLEtBQUsscUJBQVMsQ0FBQyxVQUFVLENBQUMsS0FBSztnQ0FDM0IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxTQUFTLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQ0FDeEMsR0FBRyxHQUFHLDJCQUFZLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQ0FDakQsQ0FBQztnQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUNoQyxHQUFHLEdBQUcsMkJBQVksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFBO2dDQUNqRCxDQUFDO2dDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNKLEdBQUcsR0FBRywyQkFBWSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0NBQ2pELENBQUM7Z0NBQ0QsS0FBSyxDQUFDOzRCQUNWLEtBQUsscUJBQVMsQ0FBQyxjQUFjLENBQUMsS0FBSztnQ0FDL0IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxTQUFTLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQ0FDeEMsR0FBRyxHQUFHLDJCQUFZLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQ0FDckQsQ0FBQztnQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUNoQyxHQUFHLEdBQUcsMkJBQVksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFBO2dDQUNyRCxDQUFDO2dDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNKLEdBQUcsR0FBRywyQkFBWSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0NBQ3JELENBQUM7Z0NBQ0QsS0FBSyxDQUFDOzRCQUNWLEtBQUsscUJBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSztnQ0FDckIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxTQUFTLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQ0FDeEMsR0FBRyxHQUFHLDJCQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQ0FDM0MsQ0FBQztnQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUNoQyxHQUFHLEdBQUcsMkJBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFBO2dDQUMzQyxDQUFDO2dDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNKLEdBQUcsR0FBRywyQkFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0NBQzNDLENBQUM7Z0NBQ0QsS0FBSyxDQUFDOzRCQUNWLEtBQUsscUJBQVMsQ0FBQyxlQUFlLENBQUMsS0FBSztnQ0FDaEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxTQUFTLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQ0FDeEMsR0FBRyxHQUFHLDJCQUFZLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQ0FDdEQsQ0FBQztnQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUNoQyxHQUFHLEdBQUcsMkJBQVksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFBO2dDQUN0RCxDQUFDO2dDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNKLEdBQUcsR0FBRywyQkFBWSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0NBQ3RELENBQUM7Z0NBQ0QsS0FBSyxDQUFDOzRCQUNWLEtBQUsscUJBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSztnQ0FDekIsR0FBRyxHQUFHLDJCQUFZLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQ0FDM0MsS0FBSyxDQUFDOzRCQUNWLEtBQUsscUJBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSztnQ0FDeEIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxTQUFTLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQ0FDeEMsR0FBRyxHQUFJLDJCQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQ0FDL0MsQ0FBQztnQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUNoQyxHQUFHLEdBQUcsMkJBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFBO2dDQUM5QyxDQUFDO2dDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNKLEdBQUcsR0FBRywyQkFBWSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0NBQzlDLENBQUM7Z0NBQ0QsS0FBSyxDQUFDO3dCQUNkLENBQUM7b0JBQ0wsQ0FBQztvQkFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO2dCQUNmLENBQUM7Z0JBQ0QsWUFBWSxFQUFFLFVBQVUsS0FBYSxFQUFFLE1BQXNDO29CQUN6RSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUNSLE1BQU0sQ0FBQzs0QkFDSCxLQUFLLEVBQUUsRUFBRTs0QkFDVCxNQUFNLEVBQUUsRUFBRTt5QkFDYixDQUFBO29CQUNMLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osTUFBTSxDQUFDOzRCQUNILEtBQUssRUFBRSxFQUFFOzRCQUNULE1BQU0sRUFBRSxFQUFFO3lCQUNiLENBQUE7b0JBQ0wsQ0FBQztnQkFDTCxDQUFDO2dCQUNELGlCQUFpQixFQUFFLE1BQU07Z0JBRXpCLEtBQUssRUFBRSxVQUFVLENBQWlDO29CQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxDQUFDO2dCQUNELFVBQVUsRUFBRSxVQUFVLENBQU07b0JBQ3hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3pCLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztvQkFDOUIsQ0FBQztnQkFFTCxDQUFDO2dCQUNELGlCQUFpQixFQUFFLFVBQVUsTUFBc0M7b0JBQy9ELE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0JBQ3JCLENBQUM7Z0JBQ0Qsa0JBQWtCLEVBQUUsVUFBVSxNQUFzQztvQkFDaEUsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQkFDckIsQ0FBQztnQkFDRCxrQkFBa0IsRUFBRSxVQUFVLE1BQXNDO29CQUNoRSxNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUNyQixDQUFDO2dCQUNELG1CQUFtQixFQUFFLFVBQVUsTUFBc0M7b0JBQ2pFLE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0JBQ3JCLENBQUM7Z0JBQ0Qsb0JBQW9CLEVBQUU7b0JBQ2xCLE1BQU0sQ0FBQzt3QkFDSCxLQUFLLEVBQUUsQ0FBQzt3QkFDUixNQUFNLEVBQUUsQ0FBQztxQkFDWixDQUFBO2dCQUNMLENBQUM7Z0JBQ0QsU0FBUyxFQUFFLFVBQVUsTUFBVztvQkFDNUIsTUFBTSxDQUFDLFdBQVcsQ0FBQzt3QkFDZixLQUFLLEVBQUUsTUFBTSxDQUFDLFVBQVU7d0JBQ3hCLFlBQVksRUFBRSxFQUFFO3dCQUNoQixvQkFBb0IsRUFBRSxTQUFTO3dCQUMvQixrQkFBa0IsRUFBRSxDQUFDO3dCQUNyQixxQkFBcUIsRUFBRSxFQUFFO3dCQUN6QixTQUFTLEVBQUUsSUFBSTt3QkFDZixTQUFTLEVBQUUsU0FBUzt3QkFDcEIsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLFFBQVEsRUFBRSxFQUFFO3dCQUNaLHFCQUFxQixFQUFFLFNBQVM7cUJBQ25DLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2IsQ0FBQztnQkFDRCxRQUFRLEVBQUUsVUFBVSxNQUFzQztvQkFDdEQsTUFBTSxDQUFDLFdBQVcsQ0FBQzt3QkFDZixLQUFLLEVBQUUsRUFBRTtxQkFDWixFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNiLENBQUM7Z0JBQ0Qsa0JBQWtCLEVBQUUsVUFBVSxDQUFNO2dCQUVwQyxDQUFDO2dCQUNELFlBQVksRUFBRSxVQUFVLENBQU07Z0JBRTlCLENBQUM7Z0JBQ0QsV0FBVyxFQUFFLFVBQVUsS0FBYSxFQUFFLE1BQXNDO29CQUN4RSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNiLENBQUM7Z0JBQ0QsZUFBZSxFQUFFLFVBQVUsS0FBYSxFQUFFLENBQU07b0JBQzVDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDaEIsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixNQUFNLENBQUMsS0FBSyxDQUFDO29CQUNqQixDQUFDO2dCQUNMLENBQUM7Z0JBQ0QsY0FBYyxFQUFFLEtBQUs7Z0JBQ3JCLFlBQVksRUFBRSxDQUFDO2dCQUNmLGtCQUFrQixFQUFFLENBQUM7Z0JBQ3JCLHFCQUFxQixFQUFFLEVBQUU7Z0JBQ3pCLFNBQVMsRUFBRSxTQUFTO2dCQUNwQixRQUFRLEVBQUMsRUFBRTtnQkFDWCxRQUFRLEVBQUUsR0FBRztnQkFDYixPQUFPLEVBQUUsRUFBRTthQUNkLENBQUE7UUFDTCxDQUFDO1FBQ0wscUJBQUM7SUFBRCxDQS9LQSxBQStLQyxJQUFBO0lBL0tZLHdDQUFjIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vbWFwL2NvcmUvbW9kZWwvb3ZlcmxheS5mYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uLy4uLy4uL0B0eXBlcy9tYXAvaW5kZXguZC50c1wiIC8+XHJcblxyXG5pbXBvcnQgeyBMYXllckljb25FbnVtLCBNYXBMYXllckljb24gfSBmcm9tICcuLy4uLy4uLy4uLy4uLy4uL2NvcmUvZW51bS9NYXBMYXllckljb24nO1xyXG5pbXBvcnQgT3ZlcmxheUxheWVyT3B0cyA9IE5QTWFwTGliLkxheWVycy5PdmVybGF5TGF5ZXJPcHRzO1xyXG5pbXBvcnQgUG9ydHJhaXRUb29sIGZyb20gXCIuLi8uLi8uLi9wb3J0cmFpdC10b29sXCI7XHJcbmltcG9ydCB7IExheWVyVHlwZSB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9jb3JlL2VudW0vTGF5ZXJUeXBlXCI7XHJcbi8qKlxyXG4gKiDlm77lsYLlt6XljoJcclxuICog6YWN572u6IGa5ZCI5Zu+5bGC55qE5bGV56S65pWI5p6cXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgT3ZlcmxheUZhY3Rvcnkge1xyXG5cclxuICAgIHN0YXRpYyBnZXRDbHVzdGVyT3ZlcmxheU9wdChvcHRzOiBPdmVybGF5TGF5ZXJPcHRzKSB7XHJcbiAgICAgICAgaWYgKG9wdHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFBvcnRyYWl0VG9vbC5leHRlbmQodHJ1ZSwge30sIE92ZXJsYXlGYWN0b3J5LmdldERlZmF1bHRDbHVzdGVyT3ZlcmxheU9wdCgpLCBvcHRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE92ZXJsYXlGYWN0b3J5LmdldERlZmF1bHRDbHVzdGVyT3ZlcmxheU9wdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGdldERlZmF1bHRDbHVzdGVyT3ZlcmxheU9wdCgpOiBPdmVybGF5TGF5ZXJPcHRzIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBnZXRVcmw6IGZ1bmN0aW9uIChjb3VudDogbnVtYmVyLCBtYXJrZXI6IE5QTWFwTGliLlN5bWJvbHMuQ2x1c3Rlck1hcmtlciB8IGFueSk6IHN0cmluZyB7IC8vIOiOt+WPlueUqOaIt+eahOiuvuWkh+S/oeaBryDkv67mlLlieSBsYlxyXG4gICAgICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy91cmwgPSBcIi9pbWFnZXMvbWFwLWljb24vYmx1ZS1sb2NhdGUtaWNvbi5wbmdcIjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChtYXJrZXIuTGF5ZXJUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgTGF5ZXJUeXBlLkNhbWVyYS52YWx1ZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBMYXllclR5cGUuTm9ybWFsQ2FtZXJhLnZhbHVlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hcmtlci5PYmplY3RTdGF0ZSA9PSBcIm9mZmxpbmVcIiB8fCAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IE1hcExheWVySWNvbi5Ob3JtYWxDYW1lcmEuTGF5ZXJJY29uVVJMWzBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1hcmtlci5UYXNrU3RhdHVzID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSBNYXBMYXllckljb24uTm9ybWFsQ2FtZXJhLkxheWVySWNvblVSTFsxXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSBNYXBMYXllckljb24uTm9ybWFsQ2FtZXJhLkxheWVySWNvblVSTFsyXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgTGF5ZXJUeXBlLkhpZ2hDYW1lcmEudmFsdWU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWFya2VyLk9iamVjdFN0YXRlID09IFwib2ZmbGluZVwiIHx8ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gTWFwTGF5ZXJJY29uLkhpZ2hDYW1lcmEuTGF5ZXJJY29uVVJMWzBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1hcmtlci5UYXNrU3RhdHVzID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSBNYXBMYXllckljb24uSGlnaENhbWVyYS5MYXllckljb25VUkxbMV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gTWFwTGF5ZXJJY29uLkhpZ2hDYW1lcmEuTGF5ZXJJY29uVVJMWzJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBMYXllclR5cGUuRmFjZUNhbWVyYS52YWx1ZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXJrZXIuT2JqZWN0U3RhdGUgPT0gXCJvZmZsaW5lXCIgfHwgJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSBNYXBMYXllckljb24uRmFjZUNhbWVyYS5MYXllckljb25VUkxbMF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWFya2VyLlRhc2tTdGF0dXMgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IE1hcExheWVySWNvbi5GYWNlQ2FtZXJhLkxheWVySWNvblVSTFsxXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSBNYXBMYXllckljb24uRmFjZUNhbWVyYS5MYXllckljb25VUkxbMl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIExheWVyVHlwZS5Qb3J0cmFpdENhbWVyYS52YWx1ZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXJrZXIuT2JqZWN0U3RhdGUgPT0gXCJvZmZsaW5lXCIgfHwgJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSBNYXBMYXllckljb24uUG9ydHJhaXRDYW1lcmEuTGF5ZXJJY29uVVJMWzBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1hcmtlci5UYXNrU3RhdHVzID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSBNYXBMYXllckljb24uUG9ydHJhaXRDYW1lcmEuTGF5ZXJJY29uVVJMWzFdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IE1hcExheWVySWNvbi5Qb3J0cmFpdENhbWVyYS5MYXllckljb25VUkxbMl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIExheWVyVHlwZS5XaUZpLnZhbHVlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hcmtlci5PYmplY3RTdGF0ZSA9PSBcIm9mZmxpbmVcIiB8fCAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IE1hcExheWVySWNvbi5XaUZpLkxheWVySWNvblVSTFswXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXJrZXIuVGFza1N0YXR1cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gTWFwTGF5ZXJJY29uLldpRmkuTGF5ZXJJY29uVVJMWzFdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IE1hcExheWVySWNvbi5XaUZpLkxheWVySWNvblVSTFsyXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgTGF5ZXJUeXBlLkVsZWN0cm9uaWNGZW5jZS52YWx1ZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXJrZXIuT2JqZWN0U3RhdGUgPT0gXCJvZmZsaW5lXCIgfHwgJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSBNYXBMYXllckljb24uRWxlY3Ryb25pY0ZlbmNlLkxheWVySWNvblVSTFswXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXJrZXIuVGFza1N0YXR1cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gTWFwTGF5ZXJJY29uLkVsZWN0cm9uaWNGZW5jZS5MYXllckljb25VUkxbMV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gTWFwTGF5ZXJJY29uLkVsZWN0cm9uaWNGZW5jZS5MYXllckljb25VUkxbMl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIExheWVyVHlwZS5MYW1wUG9zdC52YWx1ZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IE1hcExheWVySWNvbi5MYW1wUG9zdC5MYXllckljb25VUkxbMl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIExheWVyVHlwZS5SbXBHYXRlLnZhbHVlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hcmtlci5PYmplY3RTdGF0ZSA9PSBcIm9mZmxpbmVcIiB8fCAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICBNYXBMYXllckljb24uUm1wR2F0ZS5MYXllckljb25VUkxbMF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWFya2VyLlRhc2tTdGF0dXMgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IE1hcExheWVySWNvbi5SbXBHYXRlLkxheWVySWNvblVSTFsxXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSBNYXBMYXllckljb24uUm1wR2F0ZS5MYXllckljb25VUkxbMl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB1cmw7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldEltYWdlU2l6ZTogZnVuY3Rpb24gKGNvdW50OiBudW1iZXIsIG1hcmtlcjogTlBNYXBMaWIuU3ltYm9scy5DbHVzdGVyTWFya2VyKTogeyB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9IHtcclxuICAgICAgICAgICAgICAgIGlmIChjb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAyOFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDMwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjbHVzdGVyQ2xpY2tNb2RlbDogJ3pvb20nLCAvL+ekuuS+i+S4unNsaWNlICAsem9vbeaYr+aUvuWkp1xyXG4gICAgICAgICAgICAvL+eCueWHu+aRhOWDj+acuueCueS9jVxyXG4gICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKGY6IE5QTWFwTGliLlN5bWJvbHMuQ2x1c3Rlck1hcmtlcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjbGljay5jbHVzdGVyTWFya2VyXCIsIGYpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRDb250ZW50OiBmdW5jdGlvbiAoZjogYW55KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZi5hdHRyaWJ1dGVzLmNvdW50ID4gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmLmF0dHJpYnV0ZXMuY291bnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRDbHVzdGVyQkdDb2xvcjogZnVuY3Rpb24gKG1hcmtlcjogTlBNYXBMaWIuU3ltYm9scy5DbHVzdGVyTWFya2VyKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnIzJDODVGNic7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldENsdXN0ZXJCR1N0cm9rZTogZnVuY3Rpb24gKG1hcmtlcjogTlBNYXBMaWIuU3ltYm9scy5DbHVzdGVyTWFya2VyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCIjRkZGRkZGXCI7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldEJhY2tHcm91bmRDb2xvcjogZnVuY3Rpb24gKG1hcmtlcjogTlBNYXBMaWIuU3ltYm9scy5DbHVzdGVyTWFya2VyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCIjMkM4NUY2XCI7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldEJhY2tHcm91bmRTdHJva2U6IGZ1bmN0aW9uIChtYXJrZXI6IE5QTWFwTGliLlN5bWJvbHMuQ2x1c3Rlck1hcmtlcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiI0ZGRkZGRlwiO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRDdXN0b21MYWJlbE9mZnNldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMCxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbW91c2VvdmVyOiBmdW5jdGlvbiAobWFya2VyOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgIG1hcmtlci5jaGFuZ2VTdHlsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IG1hcmtlci5PYmplY3ROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsWU9mZnNldDogMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxCYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJyxcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbEJhY2tHcm91bmRSWFk6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxCYWNrR3JvdW5kTWFyZ2luOiAxNSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93QXJyb3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9udENvbG9yOiAnIzMzMzMzMycsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAxNCxcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbEJhY2tHcm91bmRTdHJva2U6IFwiI0U0RTRFNFwiXHJcbiAgICAgICAgICAgICAgICB9LCB0cnVlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbW91c2VvdXQ6IGZ1bmN0aW9uIChtYXJrZXI6IE5QTWFwTGliLlN5bWJvbHMuQ2x1c3Rlck1hcmtlcikge1xyXG4gICAgICAgICAgICAgICAgbWFya2VyLmNoYW5nZVN0eWxlKHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNsdXN0ZXJvbm1vdXNlb3ZlcjogZnVuY3Rpb24gKG06IGFueSkgey8v5aSn54K5IOeahOm8oOagh+enu+WFpeS6i+S7tlxyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImNsdXN0ZXJvbm1vdXNlb3ZlclwiLCBtKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2x1c3RlcmNsaWNrOiBmdW5jdGlvbiAobTogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY2x1c3RlcmNsaWNrXCIsIG0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRSb3RhdGlvbjogZnVuY3Rpb24gKGNvdW50OiBudW1iZXIsIG1hcmtlcjogTlBNYXBMaWIuU3ltYm9scy5DbHVzdGVyTWFya2VyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2hvd09ySGlkZUFycm93OiBmdW5jdGlvbiAoY291bnQ6IG51bWJlciwgZjogYW55KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpc0FzeW5jaHJvbm91czogZmFsc2UsXHJcbiAgICAgICAgICAgIGxhYmVsWU9mZnNldDogMCxcclxuICAgICAgICAgICAgbGFiZWxCYWNrR3JvdW5kUlhZOiA1LFxyXG4gICAgICAgICAgICBsYWJlbEJhY2tHcm91bmRNYXJnaW46IDEwLFxyXG4gICAgICAgICAgICBmb250Q29sb3I6ICcjRkZGRkZGJyxcclxuICAgICAgICAgICAgZm9udFNpemU6MTQsXHJcbiAgICAgICAgICAgIGRpc3RhbmNlOiAxMDAsXHQvL+ekuuS+i+S4ujIwMFxyXG4gICAgICAgICAgICBtYXhab29tOiAxOFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
