// import InfoWindow = NPMapLib.Symbols.InfoWindow;
/**
 * Created by dell on 2017/4/26.
 */
declare interface IMapAdapter{

    getPoint(lon: number, lat: number): NPMapLib.Geometry.Point;
    addLayer(layer: NPMapLib.Layer): void;
    addLayers(layers: Array<NPMapLib.Layer>): void;
    addOverlay(overlay: NPMapLib.Overlay): void;
    addOverlays(overlays: Array<NPMapLib.Overlay>): void;
    centerAndZoom(center: NPMapLib.Geometry.Point, zoom: number): void;
    centerAtMouse(): void;
    clearOverlays(): void;
    closeAllInfoWindows(): void;
    //edit
    closeInfoWindow(win: NPMapLib.Symbols.InfoWindow): void;
    containFeatures(): Array<NPMapLib.Overlay>;
    deactivateMouseContext(): void;
    destroyMap(): void;
    disableBoxSelect(): void;
    disableDoubleClickZoom(): void;
    disableEditing(): void;
    disableInertialDragging(): void;
    disableKeyboard(): void;
    disableLayerSwitcher(): void;
    disableMapOperation(): void;
    disableScrollWheelZoom(): void;
    enableBoxSelect(): void;
    enableDoubleClickZoom(): void;
    enableEditing(): void;
    enableInertialDragging(): void;
    enableKeyboard(): void;
    enableLayerSwitcher(): void;
    enableMapOperation(): void;
    enableScrollWheelZoom(): void;
    fullExtent(): void;
    getAllLayers(): Array<NPMapLib.Layer>;
    getCenter(): NPMapLib.Geometry.Point;
    getContainer(): HTMLDocument;
    getCursor(): string;
    getDefaultLayer(): NPMapLib.Layer;
    getDistance(start: NPMapLib.Geometry.Point, end: NPMapLib.Geometry.Point): number;
    getExtent(): NPMapLib.Geometry.Extent;
    getInfoWindows(): Array<NPMapLib.Symbols.InfoWindow>
    getLayer(id: number): NPMapLib.Layer;
    getLayerByName(name: string): NPMapLib.Layer;
    getMapId(): number;
    getMapTileUrl(point: NPMapLib.Geometry.Point): string;
    getMapUnits(): number;
    getMaxZoom(): number;
    getMinZoom(): number;
    getOverlays(): Array<NPMapLib.Overlay>;
    getProjection(): number;
    getRestrictedExtent(): NPMapLib.Geometry.Extent;
    getSize(): NPMapLib.Geometry.Pixel;
    getTitleSize(): NPMapLib.Geometry.Size;
    getVersion(): string;
    getVisibleLayers(): Array<NPMapLib.Layer>;
    getZoom(): number;
    pan(): void;
    panByPixel(x: number, y: number): void;
    panTo(center: NPMapLib.Geometry.Point): void;
    pixelToPoint(pixel: NPMapLib.Geometry.Pixel): NPMapLib.Geometry.Point;
    pointToPixel(point: NPMapLib.Geometry.Point): NPMapLib.Geometry.Pixel;
    removeControl(control: NPMapLib.Control): void;

    removeLayer(id: number): void;
    removeLayerByName(name: string): void;
    removeOverlay(overlay: NPMapLib.Overlay): void;
    removeOverlays(overlays: Array<NPMapLib.Overlay>): void;
    reset(): void;
    setBaseLayer(layer: NPMapLib.Layer): void;
    setCenter(center: NPMapLib.Geometry.Point, zoom: number): void;
    setCursor(cursor: string): void;
    setDefaultMapCursor(cursor: string): void;
    setFallThrough(fallThrough: boolean): void;
    setMapStyle(mapStyle: string): void;
    setMaxZoom(zoom: number): void;
    setMinZoom(zoom: number): void;
    setVisibilityDefalutLayer(visibility: boolean): void
    setZoom(zoom: number): void;
    switchLayer(index: number): void;
    switchLayerByName(layerName: string): void;
    updateSize(): void;
    zoomIn(): void;
    zoomInFixed(): void;
    zoomInOutStop(): void;
    zoomOut(): void;
    zoomOutFixed(): void;
    zoomTo(position: NPMapLib.Geometry.Point, zoom: number): void;
    zoomToExtent(extent: NPMapLib.Geometry.Extent): void;
    addControl(control: NPMapLib.Controls): void;

    // Events
    addEventListener(event: any, handler: Function): void;
    removeEventListener(event: string): void;

    addHandStyle():void;
    removeHandStyle(): void;
    // 自定义的业务相关的
    createClusterMarker(location: {lon: number, lat: number}, opt: {markType: string}): NPMapLib.Symbols.ClusterMarker;
}