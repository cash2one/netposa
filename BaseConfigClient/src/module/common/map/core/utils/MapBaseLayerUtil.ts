import {MapConfigModel} from "../model/map.config.model";
/**
 * Created by dell on 2017/4/26.
 */
export class MapBaseLayerUtil {
    constructor() {
    }

    public static initMaplayer(map: NPMapLib.Map, mapConfig: MapConfigModel) {
        if (map == null) return;
        let i, len, baseLayer = [], vectorLayerItem, baseLayerItem, vectorBaseLayer = [], layerTypes;
        for (i = 0, len = mapConfig.vectorLayer.length; i < len; i++) {
            vectorLayerItem = mapConfig.vectorLayer[i];
            layerTypes = vectorLayerItem.layerType.split('.');

            //xc: baseLayerItem = new NPMapLib.Layers.NPLayer("mapConfig.json的url","xianTiandi",mapConfig.json的vectorLayer.layerOpt)  三个参数
            let layers:any = NPMapLib.Layers;
            baseLayerItem = new layers[layerTypes[layerTypes.length - 1]](vectorLayerItem.layerOpt.url, vectorLayerItem.layerName, vectorLayerItem.layerOpt);

            vectorBaseLayer.push(baseLayerItem);
            baseLayer.push(baseLayerItem);
        }
        map.addLayers(baseLayer);
    }

}