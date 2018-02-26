import {app} from "../../common/app/main.app";
import {IAnalysisMmapServer} from "./analysisMmap.server";
import "./analysisMmap.server";
import {MarkersIcon, OverlayName} from "../AnalysisEnum";
import {SystemPoint} from "../../../core/entity/SystemPoint";
type MapResult = { [key: string]: any }
export interface IMacAnalysisMapService {
    resultToMap(id: string, type?: string):void;
    unResultToMap(id: string, resultForMap: MapResult, type?: string):void;
    getSystemPointForParams(points: Array<any>): Array<SystemPoint>;
}

class MacAnalysisMapService implements IMacAnalysisMapService {
    static $inject = ['analysisMmapServer'];

    constructor(private analysisMmapServer: IAnalysisMmapServer) {

    }

    resultToMap(id: string, type?: string) {
        if (type === "Face") {
            this.analysisMmapServer.getMap().setMarkerIcon(OverlayName.MapForResultLayer, OverlayName.MapForResultGroup, id, MarkersIcon.HoverRedIcon, 999)
        } else if (type === "Mac") {
            this.analysisMmapServer.getMap().setMarkerIcon(OverlayName.MapForResultLayer, OverlayName.MapForAccpGroup, id, MarkersIcon.HoverRedIcon, 999)
        }
    }

    //TODO 取消结果显示地图对应的点位
    unResultToMap(id: string, resultForMap: MapResult, type?: string) {
        let res = resultForMap[id];
        if (type === "Face") {
            this.analysisMmapServer.getMap().setMarkerIcon(OverlayName.MapForResultLayer, OverlayName.MapForResultGroup, id, MarkersIcon.NormalGreenIcon, res.resultIndex + 1);
        } else if (type === "Mac") {
            this.analysisMmapServer.getMap().setMarkerIcon(OverlayName.MapForResultLayer, OverlayName.MapForAccpGroup, id, MarkersIcon.NormalGreenIcon, res.resultIndex + 1);
        }
    }

    //TODO 根据点位集合获取对应的设备集合
    getSystemPointForParams(points: Array<any>): Array<SystemPoint> {
        let arr = [] as Array<SystemPoint>;
        points.forEach((item: any) => {
            let ID = item.WiFiLog.MacDeviceId || item.EFenceLog.MacDeviceId;
            let s = false;
            for (let index = 0; index < this.analysisMmapServer.getSystemPoint().length; index++) {
                let point = this.analysisMmapServer.getSystemPoint()[index];
                if (ID === point.ObjectID) {
                    s = true;
                    arr.push({
                        Lat: point.Lat,
                        Lon: point.Lon,
                        ID: point.ID,
                        ObjectID: point.ObjectID,
                        resultID: item.PerceiveInfos.ID,
                        Descrption: point.Descrption,
                        LayerType: point.LayerType,
                        ObjectType: point.ObjectType,
                        TaskStatus: point.TaskStatus,
                        ObjectState: point.ObjectState,
                        ObjectName: point.ObjectName
                    }as SystemPoint);
                }
            }
            if (!s) {
                arr.push(null)
            }
        });
        return arr;
    }
}

app.service('macAnalysisMapService', MacAnalysisMapService);