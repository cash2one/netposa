import {SystemPoint} from "../../../../../core/entity/SystemPoint";
import {ClusterMarkerEx} from "../../map.interface";

/**
 * Created by dell on 2017/4/27.
 */
export class ClusterMarkerFactory {

    // 临时在这里缓存points数组
    private points: Array<SystemPoint> = [];
    private markers:Array<NPMapLib.Symbols.Marker> = [];
    private mapAdapter: IMapAdapter;

    constructor(mapAdapter: IMapAdapter) {
        this.mapAdapter = mapAdapter;
    }

    /**
     * 根据传入的参数找到对应的点位
     * 默认只取最先匹配到的数据
     * @returns {null}
     */
    public getSystemPointByID(objectId: string): SystemPoint {
        if (!this.points && this.points.length <= 0) return null;

        let points = this.points;
        let i, len, result;
        for (i = 0, len = points.length; i < len; i++) {
            if (points[i].ObjectID === objectId) {
                result = points[i];
                break;
            }
        }
        return result;
    }

    /**
     * 初始化新增点位信息
     * 坐标为空的点位信息不增加到缓存中
     * @param points
     */
    public setPoints(points: Array<SystemPoint>): void {
        let i, len, _points = this.points, temp;
        for (i = 0, len = points.length; i < len; i++) {
            temp = points[i];
            if (temp.ObjectID && (temp.Lon != 0 || temp.Lat != 0)) {
                _points.push(temp);
            }
        }
    }

    public getPoints(): Array<SystemPoint> {
        return this.points || [];
    }

    public removePointByParams(paramName: string, paramValue: string): void {
        if (!this.points && this.points.length <= 0) return;
        let i, len, temp: any;
        for (i = 0, len = this.points.length; i < len; i++) {
            temp = this.points[i];
            if (!temp) {
                console.log(i, "不存在", this.points);
            }
            if (temp[paramName] != null && temp[paramName] === paramValue) {
                this.points.splice(i, 1);
                i--;
                len--;
            }
        }
    }

    public removePointByPoints(points: Array<SystemPoint>): void {

        if (!this.points && this.points.length <= 0) return;
        let arr = [] as Array<SystemPoint>;
        this.points.forEach((tempPoint: SystemPoint) => {
            let s = false;
            points.forEach((delPoint: SystemPoint) => {
                if (tempPoint.ID === delPoint.ID) {
                    s = true;
                }
            });
            if(!s){
                arr.push(tempPoint);
            }
        });
        this.points = arr;
        console.log(this.points);
    }

    public addPoint(point: SystemPoint): void {
        let index = this.getPointIndexInPoints(point);
        if (index === -1) {
            this.points.push(point); // 新增

        } else {
            this.points[index] = point; // 直接替换
        }


    }

    /**
     * 创建聚合点位
     * @param lon
     * @param lat
     * @param markType
     * @param model
     * @returns {any}
     */
    public createClusterMarker(lon: number, lat: number, markType: string, model: SystemPoint): ClusterMarkerEx {
        let result: ClusterMarkerEx = this.mapAdapter.createClusterMarker({
            lon: lon,
            lat: lat
        }, {markType: markType}) as ClusterMarkerEx;
        result.ID = model.ID;
        result.ObjectName = model.ObjectName || '此设备无名称';
        result.ObjectID = model.ObjectID;
        result.Descrption = model.Descrption;
        result.ObjectType = model.ObjectType;
        result.TaskStatus = model.TaskStatus;
        result.ObjectState = model.ObjectState;
        result.LayerType = model.LayerType;
        return result;
    };

    private getPointIndexInPoints(point: SystemPoint) {
        if (!this.points && this.points.length <= 0 && point) return;
        let i, len, points = this.points, result = -1;
        for (i = 0, len = points.length; i < len; i++) {
            if (point.ObjectID === points[i].ObjectID) {
                result = i;
            }
        }
        return result;
    }

    private createClusterMarkers(points: Array<SystemPoint>): Array<NPMapLib.Symbols.ClusterMarker> {
        let i, len, temp, result = [] as Array<NPMapLib.Symbols.ClusterMarker>;
        for (i = 0, len = points.length; i < len; i++) {
            temp = points[i];
            if (temp && temp.Lat && temp.Lon) {
                result.push(this.createClusterMarker(temp.Lon, temp.Lat, temp.LayerType, temp));
            }else{
                console.log(temp)
            }
        }
        return result;
    }

    private createClusterPoints(points: Array<NPMapLib.Symbols.ClusterMarker>) {
        return new NPMapLib.Symbols.ClusterPoints(points, {threshold: 0});
    }

    /**
     * 获取聚合点位数据
     * @param points
     * @returns {NPMapLib.Symbols.ClusterPoints}
     */
    public getClusterPoints(points: Array<SystemPoint>) {
        if (points && points.length > 0) {
            return this.createClusterPoints(this.createClusterMarkers(points));
        } else {
            return null;
        }
    }
}