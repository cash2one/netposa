/**
 * Created by dell on 2017/4/26.
 */
class MapOpts{
    minZoom: number;
    maxZoom: number;
    centerPoint: [number, number];
    restrictedExtent: [number, number];
    projection: string;
}

class LayerInfo{
    centerPoint: [number, number];
    fullExtent: [number, number, number, number];
    defaultZoom: number;
    layerType: string;

    maxZoom: number;
    minZoom: number;
    projection: number = 4326;
    restrictedExtent: [number, number, number, number];
    type:string = "png";
    zoomLevelSequence: string;
}

class LayerOpt{
    url: string;
    layerInfo: LayerInfo;
}

class VectorLayer{
    layerName: string;
    layerType: string = "NPMapLib.Layers.NPLayer";
    layerOpt: LayerOpt;
}

export class MapConfigModel {

    mapOpts: MapOpts; // 空白地图配置

    vectorLayer: Array<VectorLayer>; // 图层本身的配置
    sattilateLayer:Array<VectorLayer>;

    constructor() {

        // 在这里解析json字符串

    }
}