/// <reference path="../../../../@types/map-adapter/index.d.ts" />

import {CircleStyle, PolygonStyle, PolylineStyle} from "../map.interface";
declare let angular: any;
export class MapToolBar{

    private mapTools: MapPlatForm.Base.MapTools;
    private mapAdapter: IMapAdapter;
    private cacheSelectGeometry: Array<NPMapLib.Overlay>;
    private cacheSelectGeometryForMap:{[key:string]:NPMapLib.Overlay};

    constructor(mapTools: MapPlatForm.Base.MapTools, mapAdapter: IMapAdapter){
        this.mapTools = mapTools;
        this.mapAdapter = mapAdapter;
    }
    addCircleSearchControl(center:NPMapLib.Geometry.Point,callBack:Function,minDistance:number,maxDistance:number): void{
        this.mapTools.addCircleSearchControl(center,callBack,minDistance,maxDistance)
    }
    removeCircleSearchControl(): void{
        this.mapTools.removeCircleSearchControl();
    }
    /**
     * 缓存图形
     * @param overlay
     */
    addSelectGeometry(overlay: NPMapLib.Overlay){
        if(!this.cacheSelectGeometry){
            this.cacheSelectGeometry = new Array<NPMapLib.Overlay>();
        }
        this.cacheSelectGeometry.push(overlay);
        this.setCacheSelectGeometryForMap();
    }
    removeOverlay(overlay: NPMapLib.Overlay){
        let id= overlay.getId();
        for(let i=0;i<this.cacheSelectGeometry.length;i++){
            if(id === this.cacheSelectGeometry[i].getId()){
                this.cacheSelectGeometry.splice(i,1);
                break;
            }
        }
        delete this.cacheSelectGeometryForMap[id]
    }
    setCacheSelectGeometryForMap(){
        if(!this.cacheSelectGeometryForMap){
            this.cacheSelectGeometryForMap = {};
        }
        this.cacheSelectGeometry.forEach((overlay:NPMapLib.Overlay)=>{
            let id:number = overlay.getId();
            this.cacheSelectGeometryForMap[id] = overlay;
        })
    }

    getSelectGeometrys(): Array<NPMapLib.Overlay>{
        return this.cacheSelectGeometry;
    }

    resetSelectGeometrys(){
        this.cacheSelectGeometry = null;
    }

    measureDistance(): void {
        this.mapTools.measureDistance();
    }

    measureArea(): void {
        this.mapTools.measureArea();
    }

    cancelMeasure(): void {
        this.mapTools.cancelMeasure();
    }

    drawLine(callBackMethod?: (extent: NPMapLib.Geometry.Extent, geometry: NPMapLib.Geometry.Polyline)=>void, style?: PolylineStyle): void {
        this.mapTools.drawLine((extent: NPMapLib.Geometry.Extent, geometry: NPMapLib.Geometry.Polyline)=>{
            if(style){
                geometry = new NPMapLib.Geometry.Polyline(geometry.getPath(), style);
            }
            this.mapAdapter.addOverlay(geometry);
            this.addSelectGeometry(geometry);
            if(callBackMethod){
                callBackMethod(extent, geometry);
            }
        });
    }

    drawPolygon(callBackMethod?: (extent: NPMapLib.Geometry.Extent, geometry: NPMapLib.Geometry.Polygon)=>void, style?: PolygonStyle): void {
        this.mapTools.drawPolygon((extent: NPMapLib.Geometry.Extent, geometry: NPMapLib.Geometry.Polygon)=>{
            if(style){
                geometry = new NPMapLib.Geometry.Polygon(geometry.getPath(), style);
            }
            this.mapAdapter.addOverlay(geometry);
            this.addSelectGeometry(geometry);

            if(callBackMethod){
                callBackMethod(extent, geometry);
            }
        });
    }

    drawRectangle(callBackMethod?: (extent: NPMapLib.Geometry.Extent, geometry: NPMapLib.Geometry.Polygon)=>void, style?: PolygonStyle): void {
        this.mapTools.drawRectangle((extent: NPMapLib.Geometry.Extent, geometry: NPMapLib.Geometry.Polygon)=>{

            if(style){
                geometry = new NPMapLib.Geometry.Polygon(geometry.getPath(), style);
            }
            console.log(geometry);
            this.mapAdapter.addOverlay(geometry);
            this.addSelectGeometry(geometry);
            if(callBackMethod){
                callBackMethod(extent, geometry);
            }
        });
    }

    drawCircle(callBackMethod?: (extent: NPMapLib.Geometry.Extent, geometry: NPMapLib.Geometry.Circle)=>void, style?: CircleStyle): void {
        this.mapTools.drawCircle((extent: NPMapLib.Geometry.Extent, geometry: NPMapLib.Geometry.Circle)=>{
            if(style){
                geometry = new NPMapLib.Geometry.Circle(geometry.getCenter(), geometry.getRadius(), style);
            }
            this.mapAdapter.addOverlay(geometry);
            this.addSelectGeometry(geometry);
            if(callBackMethod){
                callBackMethod(extent, geometry);
            }
        });
    }

    drawCircleByDiameter(callBackMethod?: Function): void {
    }
    clearOverlayByID(ID:string){

    }
    cancelDraw(): void {
        this.mapTools.cancelDraw();
    }

}