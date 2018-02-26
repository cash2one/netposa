import InfoWindowOpts = NPMapLib.Symbols.InfoWindowOpts;
import PortraitTool from "../../../portrait-tool";
import {InfoWindowEvent} from "../../map.interface";

type InfoWindow = NPMapLib.Symbols.InfoWindow
/**
 * creator: wyr
 * time: 2017.6.3
 * description: 地图弹框工厂, 用于新建弹出，缓存弹窗信息
 */
export class InfoWindowFactory{

    private cacheInfoWindows: {[key: string]: InfoWindow};

    /**
     * 从缓存中移除infoWindow
     * @param winId
     * @returns 返回移除的infoWindow实例
     */
    public removeInfoWindow(winId: string): InfoWindow{
        let result;
        if(this.cacheInfoWindows && this.cacheInfoWindows[winId]){
            result = this.cacheInfoWindows[winId];
            this.cacheInfoWindows[winId] = null;
            delete this.cacheInfoWindows[winId];
        }
        return result;
    }

    public getById(winId: string): InfoWindow{
        if(this.cacheInfoWindows && this.cacheInfoWindows[winId]){
            return this.cacheInfoWindows[winId];
        }else{
            return;
        }
    }

    public addInfoWindow(win: InfoWindow): string{
        if(!this.cacheInfoWindows){
            this.cacheInfoWindows = {} as {[key: string]: InfoWindow};
        }
        let uuid = PortraitTool.getUUID();
        this.cacheInfoWindows[uuid] = win;
        return uuid;
    }

    public addEventListener(win: InfoWindow, uuid: string, callbacks?: InfoWindowEvent){
        if(win == null) return;
        if(callbacks == null) return;

        win.addEventListener(NPMapLib.INFOWINDOW_EVENT_OPEN, ()=>{
            if(typeof callbacks["open"] === "function"){
                callbacks["open"].call(win, uuid);
            }
        });
        win.addEventListener(NPMapLib.INFOWINDOW_EVENT_CLOSE, ()=>{
            if(typeof callbacks["close"] === "function"){
                callbacks["close"].call(win, uuid);
            }
        });
        win.addEventListener(NPMapLib.INFOWINDOW_EVENT_HIDE, ()=>{
            if(typeof callbacks["hide"] === "function"){
                callbacks["hide"].call(win, uuid);
            }
        });
    }

    constructor(){

    }
    /**
     * 获取infowindow弹出框实例
     * @param point
     * @param title
     * @param dom
     * @param opts
     * time: 2017.6.3
     * @returns {NPMapLib.Symbols.InfoWindow}
     */
    public static getInfoWindow(point: NPMapLib.Geometry.Point, title: string, dom: HTMLDocument, opts: InfoWindowOpts){
        return new NPMapLib.Symbols.InfoWindow(point, title, dom, opts);
    }

    /**
     * 获得弹出框的配置信息
     * @param opts
     * time: 2017.6.3
     * @returns {any}
     */
    public static getInfoWindowOpts(opts?: InfoWindowOpts){
        return PortraitTool.extend(true, {}, this.getDefaultInfoWindowOpts(), opts);
    }

    /**
     * 默认弹出框信息
     * time: 2017.6.3
     * @returns {infoWindowOpts}
     */
    private static getDefaultInfoWindowOpts(){
        return {
            width: 404,
            height: 404,
            offset: new NPMapLib.Geometry.Size(0,15),
            iscommon: false,
            enableCloseOnClick: false,
            isAnimationOpen: true,
            isAdaptation: true,
            positionBlock: {
                imageSrc: "/libs/npgis/localImg/iw_tail.png",
                imageSize: new NPMapLib.Geometry.Size(17, 12)
            }

        } as InfoWindowOpts;
    }
}