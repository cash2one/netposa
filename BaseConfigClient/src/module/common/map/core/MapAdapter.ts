/// <reference path="../../../../@types/map/index.d.ts" />
/// <reference path="../../../../@types/map-adapter/index.d.ts" />
/**
 * 存放所有与地图操作相关的方法,
 * 最终操作地图一定是经过这个方法的
 */
export class MapAdapter implements IMapAdapter {
    closeInfoWindow(win: NPMapLib.Symbols.InfoWindow): void {
        if (win != null) {
            win.close();
        }
    }

    addControl(control: NPMapLib.Controls): void {
        if (this.map != null) {
            this.map.addControl(control);
        }
    }

    createClusterMarker(location: { lon: number; lat: number }, opt: { markType: string }): NPMapLib.Symbols.ClusterMarker {
        return new NPMapLib.Symbols.ClusterMarker(location, opt);
    }

    /**
     * @param lon 经度 -> x
     * @param lat 纬度 -> y
     * @returns {NPMapLib.Geometry.Point}
     */
    getPoint(lon: number, lat: number): NPMapLib.Geometry.Point {
        return new NPMapLib.Geometry.Point(lon, lat);
    }

    /**
     * 添加一个图层
     * @param layer
     */
    addLayer(layer: NPMapLib.Layer): void {
        if (this.map != null) {
            this.map.addLayer(layer);
        }
    }

    /**
     * 添加图层组
     * @param layers
     */
    addLayers(layers: Array<NPMapLib.Layer>): void {
    }

    /**
     * 将覆盖物添加到地图中，一个覆盖物实例只能向地图中添加一次
     * @param overlay
     */
    addOverlay(overlay: NPMapLib.Overlay): void {
        if (this.map != null) {
            this.map.addOverlay(overlay);
        }
    }

    /**
     * 将多个覆盖物添加到地图中
     * @param overlays
     */
    addOverlays(overlays: Array<NPMapLib.Overlay>): void {
    }

    /**
     * 地图根据指定的点和级别进行对中
     * @param center
     * @param zoom
     */
    centerAndZoom(center: NPMapLib.Geometry.Point, zoom: number): void {
        if (this.map != null) {
            this.map.centerAndZoom(center, zoom);
        }
    }

    /**
     * 注册一个click事件，当鼠标在地图上点击时，地图会以鼠标点击位置为中心点重绘。
     */
    centerAtMouse(): void {
    }

    /**
     * 清除地图上所有覆盖物
     */
    clearOverlays(): void {
    }

    /**
     * 清除所有的信息窗口
     */
    closeAllInfoWindows(): void {
    }

    /**
     * 获取选中区域的要素
     */
    containFeatures(): Array<NPMapLib.Overlay> {
        return null;
    }

    /**
     * 销毁鼠标提示控件
     */
    deactivateMouseContext(): void {
    }

    /**
     * 销毁Map
     */
    destroyMap(): void {
        if (this.map && this.map != null) {
            this.map.destroyMap();
        }
    }

    /**
     * 禁用地图框选
     */
    disableBoxSelect(): void {
    }

    /**
     * 禁用双击放大
     */
    disableDoubleClickZoom(): void {
    }

    /**
     * 禁用修改
     */
    disableEditing(): void {
    }

    /**
     * 禁用地图惯性拖拽
     */
    disableInertialDragging(): void {
    }

    /**
     * 禁用键盘操作
     */
    disableKeyboard(): void {
    }

    /**
     * 禁用图层切换
     */
    disableLayerSwitcher(): void {
    }

    /**
     * 禁用
     */
    disableMapOperation(): void {
    }

    /**
     * 禁用滚轮放大缩小
     */
    disableScrollWheelZoom(): void {
    }

    /**
     * 启用地图框选
     */
    enableBoxSelect(): void {
    }

    /**
     * 启用双击放大，默认启用
     */
    enableDoubleClickZoom(): void {
    }

    /**
     * 启用修改
     */
    enableEditing(): void {
    }

    /**
     * 启用地图惯性拖拽，默认禁用
     */
    enableInertialDragging(): void {
    }

    /**
     * 启用键盘操作，默认启用
     */
    enableKeyboard(): void {
    }

    /**
     * 启用图层切换
     */
    enableLayerSwitcher(): void {
    }

    /**
     * 启用
     */
    enableMapOperation(): void {
    }

    /**
     * 启用滚轮放大缩小，默认启用
     */
    enableScrollWheelZoom(): void {
    }

    /**
     * 全图
     */
    fullExtent(): void {
    }

    /**
     * 获取所有图层
     * @returns {undefined}
     */
    getAllLayers(): Array<NPMapLib.Layer> {
        return this.map.getAllLayers();
    }

    /**
     * 返回地图当前中心点
     * @returns {undefined}
     */
    getCenter(): NPMapLib.Geometry.Point {
        return undefined;
    }

    /**
     * 返回地图的容器元素
     * @returns {undefined}
     */
    getContainer(): HTMLDocument {
        return undefined;
    }

    /**
     * 返回地图鼠标指针样式
     * @returns {any}
     */
    getCursor(): string {
        if (this.map != null) {
            return this.map.getCursor();
        }
        return null;
    }

    /**
     * 获取默认图层
     * @returns {undefined}
     */
    getDefaultLayer(): NPMapLib.Layer {
        return undefined;
    }

    /**
     * 返回两点之间的距离，单位是米
     * @param start
     * @param end
     * @returns {undefined}
     */
    getDistance(start: NPMapLib.Geometry.Point, end: NPMapLib.Geometry.Point): number {
        return undefined;
    }

    /**
     * 返回地图可视区域，以地理坐标表示
     * @returns {undefined}
     */
    getExtent(): NPMapLib.Geometry.Extent {
        return undefined;
    }

    /**
     * 获取所有的信息窗口
     * @returns {undefined}
     */
    getInfoWindows(): Array<NPMapLib.Symbols.InfoWindow> {
        return undefined;
    }

    /**
     * 获取图层，根据图层id
     * @param id
     * @returns {undefined}
     */
    getLayer(id: number): NPMapLib.Layer {
        return undefined;
    }

    /**
     * 获取图层，根据图层
     * @param name
     * @returns {undefined}
     */
    getLayerByName(name: string): NPMapLib.Layer {
        if (this.map != null) {
            return this.map.getLayerByName(name);
        }
    }

    /**
     * 获取地图ID
     * @returns {undefined}
     */
    getMapId(): number {
        if (this.map != null) {
            return this.map.getMapId();
        }
        return undefined;
    }

    /**
     * 获取点位的图片资源路径
     * @param point
     * @returns {undefined}
     */
    getMapTileUrl(point: NPMapLib.Geometry.Point): string {
        return undefined;
    }

    /**
     * 获取Map 的单位
     * @returns {undefined}
     */
    getMapUnits(): number {
        return undefined;
    }

    /**
     * 返回地图允许的最大缩放级别
     * @returns {undefined}
     */
    getMaxZoom(): number {
        if (this.map != null) {
            return this.map.getMaxZoom();
        }
        return null;

    }

    /**
     * 返回地图允许的最小缩放级别
     * @returns {undefined}
     */
    getMinZoom(): number {
        return undefined;
    }

    /**
     * 返回地图上的所有覆盖物
     * @returns {undefined}
     */
    getOverlays(): Array<NPMapLib.Overlay> {
        return undefined;
    }

    /**
     * 返回地图的投影方式。
     * @returns {undefined}
     */
    getProjection(): number {
        return undefined;
    }

    /**
     * 获取地图限制区域
     * @returns {undefined}
     */
    getRestrictedExtent(): NPMapLib.Geometry.Extent {
        return undefined;
    }

    /**
     * 返回地图视图的大小，以像素表示
     * @returns {undefined}
     */
    getSize(): NPMapLib.Geometry.Pixel {
        return undefined;
    }

    /**
     * 获取地图切片大小
     * @returns {undefined}
     */
    getTitleSize(): NPMapLib.Geometry.Size {
        return undefined;
    }

    /**
     * 获取地图版本
     * @returns {undefined}
     */
    getVersion(): string {
        return undefined;
    }

    /**
     * 获取可见图层
     * @returns {undefined}
     */
    getVisibleLayers(): Array<NPMapLib.Layer> {
        return undefined;
    }

    /**
     * 返回地图当前缩放级别
     * @returns {undefined}
     */
    getZoom(): number {
        if (this.map != null) {
            return this.map.getZoom();
        }
        return null;
    }

    /**
     * 平移
     */
    pan(): void {
    }

    /**
     * 将地图在水平位置上移动x像素，垂直位置上移动y像素
     * @param x
     * @param y
     */
    panByPixel(x: number, y: number): void {
    }

    /**
     * 将地图的中心点更改为给定的点
     * @param center
     */
    panTo(center: NPMapLib.Geometry.Point): void {
    }

    /**
     * 像素坐标转换为经纬度坐标
     * @param pixel
     * @returns {any}
     */
    pixelToPoint(pixel: NPMapLib.Geometry.Pixel): NPMapLib.Geometry.Point {
        console.log(pixel)
        if (this.map != null) {
            return this.map.pixelToPoint(pixel);
        }
        return null;
    }

    /**
     * 经纬度坐标转换为像素坐标
     * @param point
     * @returns {any}
     */
    pointToPixel(point: NPMapLib.Geometry.Point): NPMapLib.Geometry.Pixel {
        if (this.map != null) {
            return this.map.pointToPixel(point);
        }
        return null;
    }

    /**
     * 从地图中移除控件。如果控件从未被添加到地图中，则该移除不起任何作用
     * @param control
     */
    removeControl(control: NPMapLib.Control): void {
    }

    /**
     * 移除百度地图手的样式
     */
    removeHandStyle(): void {
        if (this.map != null) {
            this.map.removeHandStyle();
        }
    }

    /**
     * 移除一个图层，根据图层id
     * @param id
     */
    removeLayer(id: number): void {
    }

    /**
     * 移除一个图层，根据图层name
     * @param name
     */
    removeLayerByName(name: string): void {
    }

    /**
     * 从地图中移除覆盖物。如果覆盖物从未被添加到地图中，则该移除不起任何作用
     * @param overlay
     */
    removeOverlay(overlay: NPMapLib.Overlay): void {
        if (this.map != null) {
            this.map.removeOverlay(overlay)
        }
    }

    /**
     * 从地图中移除覆盖物。如果覆盖物从未被添加到地图中，则该移除不起任何作用
     * @param overlays
     */
    removeOverlays(overlays: Array<NPMapLib.Overlay>): void {
    }

    /**
     * 重新设置地图，恢复地图初始化时的中心点和级别
     */
    reset(): void {
    }

    /**
     * 设置基础图层
     * @param layer
     */
    setBaseLayer(layer: NPMapLib.Layer): void {
    }

    /**
     * 设置地图中心点
     * @param center
     * @param zoom
     */
    setCenter(center: NPMapLib.Geometry.Point, zoom: number): void {
    }

    /**
     * 设置地图鼠标指针样式
     * @param cursor
     */
    setCursor(cursor: string): void {
        if (this.map != null) {
            this.map.setCursor(cursor);
        }
    }

    /**
     * 设置鼠标模式样式
     * @param cursor
     */
    setDefaultMapCursor(cursor: string): void {
    }

    /**
     * 设置是否禁用浏览器事件，默认为true(禁止)
     * @param fallThrough
     */
    setFallThrough(fallThrough: boolean): void {
    }

    /**
     * 设置地图风格样式，当前只能设置的参数是：灰色，浅绿，天蓝，粉色，经典黑 注意低版本IE 不支持
     * @param mapStyle
     */
    setMapStyle(mapStyle: string): void {
    }

    /**
     * 设置地图允许的最大级别。取值不得大于地图类型所允许的最大级别
     * @param zoom
     */
    setMaxZoom(zoom: number): void {
    }

    /**
     * 设置地图允许的最小级别。取值不得小于地图类型所允许的最小级别
     * @param zoom
     */
    setMinZoom(zoom: number): void {
    }

    /**
     * 设置默认图层可见性
     * @param visibility
     */
    setVisibilityDefalutLayer(visibility: boolean): void {
    }

    /**
     * 将视图切换到指定的缩放等级，中心点坐标不变
     * @param zoom
     */
    setZoom(zoom: number): void {
    }

    /**
     * 切换图层。index为添加到地图时的顺序。
     * @param index
     */
    switchLayer(index: number): void {
    }

    /**
     * 切换图层。layerName为添加到地图时的顺序。
     * @param layerName
     */
    switchLayerByName(layerName: string): void {
    }

    /**
     * 调整画布大小
     */
    updateSize(): void {
    }

    /**
     * 拉框放大
     */
    zoomIn(): void {
    }

    /**
     * 固定放大一个级别
     */
    zoomInFixed(): void {
    }

    /**
     * 取消拉框缩放
     */
    zoomInOutStop(): void {
    }

    /**
     * 拉框缩小
     */
    zoomOut(): void {
    }

    /**
     * 固定缩小一个级别
     */
    zoomOutFixed(): void {
    }

    /**
     * 缩放到指定范围
     * @param position
     * @param zoom
     */
    zoomTo(position: NPMapLib.Geometry.Point, zoom: number): void {
    }

    /**
     * 缩放到指定范围
     * @param extent
     */
    zoomToExtent(extent: NPMapLib.Geometry.Extent): void {
    }

    /**
     * 添加事件监听函数
     * @param event
     * @param handler
     */
    addEventListener(event: any, handler: (params: any) => void): void {
        if (this.map != null) {
            this.map.addEventListener(event, handler);
        }
    }

    /**
     * 移除事件监听函数
     * @param event
     */
    removeEventListener(event: string): void {
        if (this.map != null) {
            this.map.removeEventListener(event);
        }
    }

    addHandStyle(): void {
        if (this.map != null) {
            this.map.addHandStyle();
        }
    }

    map: NPMapLib.Map = null;

    constructor(map: NPMapLib.Map) {
        this.map = map;
    }
}