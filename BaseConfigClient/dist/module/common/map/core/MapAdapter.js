define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MapAdapter = (function () {
        function MapAdapter(map) {
            this.map = null;
            this.map = map;
        }
        MapAdapter.prototype.closeInfoWindow = function (win) {
            if (win != null) {
                win.close();
            }
        };
        MapAdapter.prototype.addControl = function (control) {
            if (this.map != null) {
                this.map.addControl(control);
            }
        };
        MapAdapter.prototype.createClusterMarker = function (location, opt) {
            return new NPMapLib.Symbols.ClusterMarker(location, opt);
        };
        MapAdapter.prototype.getPoint = function (lon, lat) {
            return new NPMapLib.Geometry.Point(lon, lat);
        };
        MapAdapter.prototype.addLayer = function (layer) {
            if (this.map != null) {
                this.map.addLayer(layer);
            }
        };
        MapAdapter.prototype.addLayers = function (layers) {
        };
        MapAdapter.prototype.addOverlay = function (overlay) {
            if (this.map != null) {
                this.map.addOverlay(overlay);
            }
        };
        MapAdapter.prototype.addOverlays = function (overlays) {
        };
        MapAdapter.prototype.centerAndZoom = function (center, zoom) {
            if (this.map != null) {
                this.map.centerAndZoom(center, zoom);
            }
        };
        MapAdapter.prototype.centerAtMouse = function () {
        };
        MapAdapter.prototype.clearOverlays = function () {
        };
        MapAdapter.prototype.closeAllInfoWindows = function () {
        };
        MapAdapter.prototype.containFeatures = function () {
            return null;
        };
        MapAdapter.prototype.deactivateMouseContext = function () {
        };
        MapAdapter.prototype.destroyMap = function () {
            if (this.map && this.map != null) {
                this.map.destroyMap();
            }
        };
        MapAdapter.prototype.disableBoxSelect = function () {
        };
        MapAdapter.prototype.disableDoubleClickZoom = function () {
        };
        MapAdapter.prototype.disableEditing = function () {
        };
        MapAdapter.prototype.disableInertialDragging = function () {
        };
        MapAdapter.prototype.disableKeyboard = function () {
        };
        MapAdapter.prototype.disableLayerSwitcher = function () {
        };
        MapAdapter.prototype.disableMapOperation = function () {
        };
        MapAdapter.prototype.disableScrollWheelZoom = function () {
        };
        MapAdapter.prototype.enableBoxSelect = function () {
        };
        MapAdapter.prototype.enableDoubleClickZoom = function () {
        };
        MapAdapter.prototype.enableEditing = function () {
        };
        MapAdapter.prototype.enableInertialDragging = function () {
        };
        MapAdapter.prototype.enableKeyboard = function () {
        };
        MapAdapter.prototype.enableLayerSwitcher = function () {
        };
        MapAdapter.prototype.enableMapOperation = function () {
        };
        MapAdapter.prototype.enableScrollWheelZoom = function () {
        };
        MapAdapter.prototype.fullExtent = function () {
        };
        MapAdapter.prototype.getAllLayers = function () {
            return this.map.getAllLayers();
        };
        MapAdapter.prototype.getCenter = function () {
            return undefined;
        };
        MapAdapter.prototype.getContainer = function () {
            return undefined;
        };
        MapAdapter.prototype.getCursor = function () {
            if (this.map != null) {
                return this.map.getCursor();
            }
            return null;
        };
        MapAdapter.prototype.getDefaultLayer = function () {
            return undefined;
        };
        MapAdapter.prototype.getDistance = function (start, end) {
            return undefined;
        };
        MapAdapter.prototype.getExtent = function () {
            return undefined;
        };
        MapAdapter.prototype.getInfoWindows = function () {
            return undefined;
        };
        MapAdapter.prototype.getLayer = function (id) {
            return undefined;
        };
        MapAdapter.prototype.getLayerByName = function (name) {
            if (this.map != null) {
                return this.map.getLayerByName(name);
            }
        };
        MapAdapter.prototype.getMapId = function () {
            if (this.map != null) {
                return this.map.getMapId();
            }
            return undefined;
        };
        MapAdapter.prototype.getMapTileUrl = function (point) {
            return undefined;
        };
        MapAdapter.prototype.getMapUnits = function () {
            return undefined;
        };
        MapAdapter.prototype.getMaxZoom = function () {
            if (this.map != null) {
                return this.map.getMaxZoom();
            }
            return null;
        };
        MapAdapter.prototype.getMinZoom = function () {
            return undefined;
        };
        MapAdapter.prototype.getOverlays = function () {
            return undefined;
        };
        MapAdapter.prototype.getProjection = function () {
            return undefined;
        };
        MapAdapter.prototype.getRestrictedExtent = function () {
            return undefined;
        };
        MapAdapter.prototype.getSize = function () {
            return undefined;
        };
        MapAdapter.prototype.getTitleSize = function () {
            return undefined;
        };
        MapAdapter.prototype.getVersion = function () {
            return undefined;
        };
        MapAdapter.prototype.getVisibleLayers = function () {
            return undefined;
        };
        MapAdapter.prototype.getZoom = function () {
            if (this.map != null) {
                return this.map.getZoom();
            }
            return null;
        };
        MapAdapter.prototype.pan = function () {
        };
        MapAdapter.prototype.panByPixel = function (x, y) {
        };
        MapAdapter.prototype.panTo = function (center) {
        };
        MapAdapter.prototype.pixelToPoint = function (pixel) {
            console.log(pixel);
            if (this.map != null) {
                return this.map.pixelToPoint(pixel);
            }
            return null;
        };
        MapAdapter.prototype.pointToPixel = function (point) {
            if (this.map != null) {
                return this.map.pointToPixel(point);
            }
            return null;
        };
        MapAdapter.prototype.removeControl = function (control) {
        };
        MapAdapter.prototype.removeHandStyle = function () {
            if (this.map != null) {
                this.map.removeHandStyle();
            }
        };
        MapAdapter.prototype.removeLayer = function (id) {
        };
        MapAdapter.prototype.removeLayerByName = function (name) {
        };
        MapAdapter.prototype.removeOverlay = function (overlay) {
            if (this.map != null) {
                this.map.removeOverlay(overlay);
            }
        };
        MapAdapter.prototype.removeOverlays = function (overlays) {
        };
        MapAdapter.prototype.reset = function () {
        };
        MapAdapter.prototype.setBaseLayer = function (layer) {
        };
        MapAdapter.prototype.setCenter = function (center, zoom) {
        };
        MapAdapter.prototype.setCursor = function (cursor) {
            if (this.map != null) {
                this.map.setCursor(cursor);
            }
        };
        MapAdapter.prototype.setDefaultMapCursor = function (cursor) {
        };
        MapAdapter.prototype.setFallThrough = function (fallThrough) {
        };
        MapAdapter.prototype.setMapStyle = function (mapStyle) {
        };
        MapAdapter.prototype.setMaxZoom = function (zoom) {
        };
        MapAdapter.prototype.setMinZoom = function (zoom) {
        };
        MapAdapter.prototype.setVisibilityDefalutLayer = function (visibility) {
        };
        MapAdapter.prototype.setZoom = function (zoom) {
        };
        MapAdapter.prototype.switchLayer = function (index) {
        };
        MapAdapter.prototype.switchLayerByName = function (layerName) {
        };
        MapAdapter.prototype.updateSize = function () {
        };
        MapAdapter.prototype.zoomIn = function () {
        };
        MapAdapter.prototype.zoomInFixed = function () {
        };
        MapAdapter.prototype.zoomInOutStop = function () {
        };
        MapAdapter.prototype.zoomOut = function () {
        };
        MapAdapter.prototype.zoomOutFixed = function () {
        };
        MapAdapter.prototype.zoomTo = function (position, zoom) {
        };
        MapAdapter.prototype.zoomToExtent = function (extent) {
        };
        MapAdapter.prototype.addEventListener = function (event, handler) {
            if (this.map != null) {
                this.map.addEventListener(event, handler);
            }
        };
        MapAdapter.prototype.removeEventListener = function (event) {
            if (this.map != null) {
                this.map.removeEventListener(event);
            }
        };
        MapAdapter.prototype.addHandStyle = function () {
            if (this.map != null) {
                this.map.addHandStyle();
            }
        };
        return MapAdapter;
    }());
    exports.MapAdapter = MapAdapter;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL21hcC9jb3JlL01hcEFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBTUE7UUE0cUJJLG9CQUFZLEdBQWlCO1lBRjdCLFFBQUcsR0FBaUIsSUFBSSxDQUFDO1lBR3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ25CLENBQUM7UUE3cUJELG9DQUFlLEdBQWYsVUFBZ0IsR0FBZ0M7WUFDNUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2hCLENBQUM7UUFDTCxDQUFDO1FBRUQsK0JBQVUsR0FBVixVQUFXLE9BQTBCO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakMsQ0FBQztRQUNMLENBQUM7UUFFRCx3Q0FBbUIsR0FBbkIsVUFBb0IsUUFBc0MsRUFBRSxHQUF5QjtZQUNqRixNQUFNLENBQUMsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQU9ELDZCQUFRLEdBQVIsVUFBUyxHQUFXLEVBQUUsR0FBVztZQUM3QixNQUFNLENBQUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDakQsQ0FBQztRQU1ELDZCQUFRLEdBQVIsVUFBUyxLQUFxQjtZQUMxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdCLENBQUM7UUFDTCxDQUFDO1FB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RSxDQUFDO1lBQzVCLENBQUM7UUFDTCxDQUFDO1FBT0wsaUJBQUM7SUFBRCxDQS9xQkEsQUErcUJDLElBQUE7SUEvcUJZLGdDQUFVIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vbWFwL2NvcmUvTWFwQWRhcHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi8uLi9AdHlwZXMvbWFwL2luZGV4LmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vLi4vQHR5cGVzL21hcC1hZGFwdGVyL2luZGV4LmQudHNcIiAvPlxyXG4vKipcclxuICog5a2Y5pS+5omA5pyJ5LiO5Zyw5Zu+5pON5L2c55u45YWz55qE5pa55rOVLFxyXG4gKiDmnIDnu4jmk43kvZzlnLDlm77kuIDlrprmmK/nu4/ov4fov5nkuKrmlrnms5XnmoRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNYXBBZGFwdGVyIGltcGxlbWVudHMgSU1hcEFkYXB0ZXIge1xyXG4gICAgY2xvc2VJbmZvV2luZG93KHdpbjogTlBNYXBMaWIuU3ltYm9scy5JbmZvV2luZG93KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHdpbiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHdpbi5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGRDb250cm9sKGNvbnRyb2w6IE5QTWFwTGliLkNvbnRyb2xzKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMubWFwICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5tYXAuYWRkQ29udHJvbChjb250cm9sKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQ2x1c3Rlck1hcmtlcihsb2NhdGlvbjogeyBsb246IG51bWJlcjsgbGF0OiBudW1iZXIgfSwgb3B0OiB7IG1hcmtUeXBlOiBzdHJpbmcgfSk6IE5QTWFwTGliLlN5bWJvbHMuQ2x1c3Rlck1hcmtlciB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOUE1hcExpYi5TeW1ib2xzLkNsdXN0ZXJNYXJrZXIobG9jYXRpb24sIG9wdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gbG9uIOe7j+W6piAtPiB4XHJcbiAgICAgKiBAcGFyYW0gbGF0IOe6rOW6piAtPiB5XHJcbiAgICAgKiBAcmV0dXJucyB7TlBNYXBMaWIuR2VvbWV0cnkuUG9pbnR9XHJcbiAgICAgKi9cclxuICAgIGdldFBvaW50KGxvbjogbnVtYmVyLCBsYXQ6IG51bWJlcik6IE5QTWFwTGliLkdlb21ldHJ5LlBvaW50IHtcclxuICAgICAgICByZXR1cm4gbmV3IE5QTWFwTGliLkdlb21ldHJ5LlBvaW50KGxvbiwgbGF0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOS4gOS4quWbvuWxglxyXG4gICAgICogQHBhcmFtIGxheWVyXHJcbiAgICAgKi9cclxuICAgIGFkZExheWVyKGxheWVyOiBOUE1hcExpYi5MYXllcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLm1hcCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLmFkZExheWVyKGxheWVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDlm77lsYLnu4RcclxuICAgICAqIEBwYXJhbSBsYXllcnNcclxuICAgICAqL1xyXG4gICAgYWRkTGF5ZXJzKGxheWVyczogQXJyYXk8TlBNYXBMaWIuTGF5ZXI+KTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsIbopobnm5bnianmt7vliqDliLDlnLDlm77kuK3vvIzkuIDkuKropobnm5bnianlrp7kvovlj6rog73lkJHlnLDlm77kuK3mt7vliqDkuIDmrKFcclxuICAgICAqIEBwYXJhbSBvdmVybGF5XHJcbiAgICAgKi9cclxuICAgIGFkZE92ZXJsYXkob3ZlcmxheTogTlBNYXBMaWIuT3ZlcmxheSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLm1hcCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLmFkZE92ZXJsYXkob3ZlcmxheSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bCG5aSa5Liq6KaG55uW54mp5re75Yqg5Yiw5Zyw5Zu+5LitXHJcbiAgICAgKiBAcGFyYW0gb3ZlcmxheXNcclxuICAgICAqL1xyXG4gICAgYWRkT3ZlcmxheXMob3ZlcmxheXM6IEFycmF5PE5QTWFwTGliLk92ZXJsYXk+KTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnLDlm77moLnmja7mjIflrprnmoTngrnlkoznuqfliKvov5vooYzlr7nkuK1cclxuICAgICAqIEBwYXJhbSBjZW50ZXJcclxuICAgICAqIEBwYXJhbSB6b29tXHJcbiAgICAgKi9cclxuICAgIGNlbnRlckFuZFpvb20oY2VudGVyOiBOUE1hcExpYi5HZW9tZXRyeS5Qb2ludCwgem9vbTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMubWFwICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5tYXAuY2VudGVyQW5kWm9vbShjZW50ZXIsIHpvb20pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOazqOWGjOS4gOS4qmNsaWNr5LqL5Lu277yM5b2T6byg5qCH5Zyo5Zyw5Zu+5LiK54K55Ye75pe277yM5Zyw5Zu+5Lya5Lul6byg5qCH54K55Ye75L2N572u5Li65Lit5b+D54K56YeN57uY44CCXHJcbiAgICAgKi9cclxuICAgIGNlbnRlckF0TW91c2UoKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuIXpmaTlnLDlm77kuIrmiYDmnInopobnm5bnialcclxuICAgICAqL1xyXG4gICAgY2xlYXJPdmVybGF5cygpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4hemZpOaJgOacieeahOS/oeaBr+eql+WPo1xyXG4gICAgICovXHJcbiAgICBjbG9zZUFsbEluZm9XaW5kb3dzKCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W6YCJ5Lit5Yy65Z+f55qE6KaB57SgXHJcbiAgICAgKi9cclxuICAgIGNvbnRhaW5GZWF0dXJlcygpOiBBcnJheTxOUE1hcExpYi5PdmVybGF5PiB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDplIDmr4HpvKDmoIfmj5DnpLrmjqfku7ZcclxuICAgICAqL1xyXG4gICAgZGVhY3RpdmF0ZU1vdXNlQ29udGV4dCgpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmUgOavgU1hcFxyXG4gICAgICovXHJcbiAgICBkZXN0cm95TWFwKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLm1hcCAmJiB0aGlzLm1hcCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLmRlc3Ryb3lNYXAoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnpoHnlKjlnLDlm77moYbpgIlcclxuICAgICAqL1xyXG4gICAgZGlzYWJsZUJveFNlbGVjdCgpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOemgeeUqOWPjOWHu+aUvuWkp1xyXG4gICAgICovXHJcbiAgICBkaXNhYmxlRG91YmxlQ2xpY2tab29tKCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56aB55So5L+u5pS5XHJcbiAgICAgKi9cclxuICAgIGRpc2FibGVFZGl0aW5nKCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56aB55So5Zyw5Zu+5oOv5oCn5ouW5ou9XHJcbiAgICAgKi9cclxuICAgIGRpc2FibGVJbmVydGlhbERyYWdnaW5nKCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56aB55So6ZSu55uY5pON5L2cXHJcbiAgICAgKi9cclxuICAgIGRpc2FibGVLZXlib2FyZCgpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOemgeeUqOWbvuWxguWIh+aNolxyXG4gICAgICovXHJcbiAgICBkaXNhYmxlTGF5ZXJTd2l0Y2hlcigpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOemgeeUqFxyXG4gICAgICovXHJcbiAgICBkaXNhYmxlTWFwT3BlcmF0aW9uKCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56aB55So5rua6L2u5pS+5aSn57yp5bCPXHJcbiAgICAgKi9cclxuICAgIGRpc2FibGVTY3JvbGxXaGVlbFpvb20oKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlkK/nlKjlnLDlm77moYbpgIlcclxuICAgICAqL1xyXG4gICAgZW5hYmxlQm94U2VsZWN0KCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ZCv55So5Y+M5Ye75pS+5aSn77yM6buY6K6k5ZCv55SoXHJcbiAgICAgKi9cclxuICAgIGVuYWJsZURvdWJsZUNsaWNrWm9vbSgpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWQr+eUqOS/ruaUuVxyXG4gICAgICovXHJcbiAgICBlbmFibGVFZGl0aW5nKCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ZCv55So5Zyw5Zu+5oOv5oCn5ouW5ou977yM6buY6K6k56aB55SoXHJcbiAgICAgKi9cclxuICAgIGVuYWJsZUluZXJ0aWFsRHJhZ2dpbmcoKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlkK/nlKjplK7nm5jmk43kvZzvvIzpu5jorqTlkK/nlKhcclxuICAgICAqL1xyXG4gICAgZW5hYmxlS2V5Ym9hcmQoKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlkK/nlKjlm77lsYLliIfmjaJcclxuICAgICAqL1xyXG4gICAgZW5hYmxlTGF5ZXJTd2l0Y2hlcigpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWQr+eUqFxyXG4gICAgICovXHJcbiAgICBlbmFibGVNYXBPcGVyYXRpb24oKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlkK/nlKjmu5rova7mlL7lpKfnvKnlsI/vvIzpu5jorqTlkK/nlKhcclxuICAgICAqL1xyXG4gICAgZW5hYmxlU2Nyb2xsV2hlZWxab29tKCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWo5Zu+XHJcbiAgICAgKi9cclxuICAgIGZ1bGxFeHRlbnQoKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmiYDmnInlm77lsYJcclxuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAgICAgKi9cclxuICAgIGdldEFsbExheWVycygpOiBBcnJheTxOUE1hcExpYi5MYXllcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5nZXRBbGxMYXllcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuWcsOWbvuW9k+WJjeS4reW/g+eCuVxyXG4gICAgICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICAgICAqL1xyXG4gICAgZ2V0Q2VudGVyKCk6IE5QTWFwTGliLkdlb21ldHJ5LlBvaW50IHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5Zyw5Zu+55qE5a655Zmo5YWD57SgXHJcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gICAgICovXHJcbiAgICBnZXRDb250YWluZXIoKTogSFRNTERvY3VtZW50IHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5Zyw5Zu+6byg5qCH5oyH6ZKI5qC35byPXHJcbiAgICAgKiBAcmV0dXJucyB7YW55fVxyXG4gICAgICovXHJcbiAgICBnZXRDdXJzb3IoKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGhpcy5tYXAgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXAuZ2V0Q3Vyc29yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W6buY6K6k5Zu+5bGCXHJcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gICAgICovXHJcbiAgICBnZXREZWZhdWx0TGF5ZXIoKTogTlBNYXBMaWIuTGF5ZXIge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57kuKTngrnkuYvpl7TnmoTot53nprvvvIzljZXkvY3mmK/nsbNcclxuICAgICAqIEBwYXJhbSBzdGFydFxyXG4gICAgICogQHBhcmFtIGVuZFxyXG4gICAgICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICAgICAqL1xyXG4gICAgZ2V0RGlzdGFuY2Uoc3RhcnQ6IE5QTWFwTGliLkdlb21ldHJ5LlBvaW50LCBlbmQ6IE5QTWFwTGliLkdlb21ldHJ5LlBvaW50KTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5Zyw5Zu+5Y+v6KeG5Yy65Z+f77yM5Lul5Zyw55CG5Z2Q5qCH6KGo56S6XHJcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gICAgICovXHJcbiAgICBnZXRFeHRlbnQoKTogTlBNYXBMaWIuR2VvbWV0cnkuRXh0ZW50IHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5omA5pyJ55qE5L+h5oGv56qX5Y+jXHJcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gICAgICovXHJcbiAgICBnZXRJbmZvV2luZG93cygpOiBBcnJheTxOUE1hcExpYi5TeW1ib2xzLkluZm9XaW5kb3c+IHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Zu+5bGC77yM5qC55o2u5Zu+5bGCaWRcclxuICAgICAqIEBwYXJhbSBpZFxyXG4gICAgICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICAgICAqL1xyXG4gICAgZ2V0TGF5ZXIoaWQ6IG51bWJlcik6IE5QTWFwTGliLkxheWVyIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Zu+5bGC77yM5qC55o2u5Zu+5bGCXHJcbiAgICAgKiBAcGFyYW0gbmFtZVxyXG4gICAgICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICAgICAqL1xyXG4gICAgZ2V0TGF5ZXJCeU5hbWUobmFtZTogc3RyaW5nKTogTlBNYXBMaWIuTGF5ZXIge1xyXG4gICAgICAgIGlmICh0aGlzLm1hcCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcC5nZXRMYXllckJ5TmFtZShuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blnLDlm75JRFxyXG4gICAgICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICAgICAqL1xyXG4gICAgZ2V0TWFwSWQoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodGhpcy5tYXAgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXAuZ2V0TWFwSWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlueCueS9jeeahOWbvueJh+i1hOa6kOi3r+W+hFxyXG4gICAgICogQHBhcmFtIHBvaW50XHJcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gICAgICovXHJcbiAgICBnZXRNYXBUaWxlVXJsKHBvaW50OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2ludCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlk1hcCDnmoTljZXkvY1cclxuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAgICAgKi9cclxuICAgIGdldE1hcFVuaXRzKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuWcsOWbvuWFgeiuuOeahOacgOWkp+e8qeaUvue6p+WIq1xyXG4gICAgICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICAgICAqL1xyXG4gICAgZ2V0TWF4Wm9vbSgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0aGlzLm1hcCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcC5nZXRNYXhab29tKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuWcsOWbvuWFgeiuuOeahOacgOWwj+e8qeaUvue6p+WIq1xyXG4gICAgICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICAgICAqL1xyXG4gICAgZ2V0TWluWm9vbSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57lnLDlm77kuIrnmoTmiYDmnInopobnm5bnialcclxuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAgICAgKi9cclxuICAgIGdldE92ZXJsYXlzKCk6IEFycmF5PE5QTWFwTGliLk92ZXJsYXk+IHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5Zyw5Zu+55qE5oqV5b2x5pa55byP44CCXHJcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gICAgICovXHJcbiAgICBnZXRQcm9qZWN0aW9uKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluWcsOWbvumZkOWItuWMuuWfn1xyXG4gICAgICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICAgICAqL1xyXG4gICAgZ2V0UmVzdHJpY3RlZEV4dGVudCgpOiBOUE1hcExpYi5HZW9tZXRyeS5FeHRlbnQge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57lnLDlm77op4blm77nmoTlpKflsI/vvIzku6Xlg4/ntKDooajnpLpcclxuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAgICAgKi9cclxuICAgIGdldFNpemUoKTogTlBNYXBMaWIuR2VvbWV0cnkuUGl4ZWwge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blnLDlm77liIfniYflpKflsI9cclxuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAgICAgKi9cclxuICAgIGdldFRpdGxlU2l6ZSgpOiBOUE1hcExpYi5HZW9tZXRyeS5TaXplIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Zyw5Zu+54mI5pysXHJcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gICAgICovXHJcbiAgICBnZXRWZXJzaW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluWPr+ingeWbvuWxglxyXG4gICAgICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICAgICAqL1xyXG4gICAgZ2V0VmlzaWJsZUxheWVycygpOiBBcnJheTxOUE1hcExpYi5MYXllcj4ge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57lnLDlm77lvZPliY3nvKnmlL7nuqfliKtcclxuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAgICAgKi9cclxuICAgIGdldFpvb20oKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodGhpcy5tYXAgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXAuZ2V0Wm9vbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW5s+enu1xyXG4gICAgICovXHJcbiAgICBwYW4oKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsIblnLDlm77lnKjmsLTlubPkvY3nva7kuIrnp7vliqh45YOP57Sg77yM5Z6C55u05L2N572u5LiK56e75YqoeeWDj+e0oFxyXG4gICAgICogQHBhcmFtIHhcclxuICAgICAqIEBwYXJhbSB5XHJcbiAgICAgKi9cclxuICAgIHBhbkJ5UGl4ZWwoeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWwhuWcsOWbvueahOS4reW/g+eCueabtOaUueS4uue7meWumueahOeCuVxyXG4gICAgICogQHBhcmFtIGNlbnRlclxyXG4gICAgICovXHJcbiAgICBwYW5UbyhjZW50ZXI6IE5QTWFwTGliLkdlb21ldHJ5LlBvaW50KTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlg4/ntKDlnZDmoIfovazmjaLkuLrnu4/nuqzluqblnZDmoIdcclxuICAgICAqIEBwYXJhbSBwaXhlbFxyXG4gICAgICogQHJldHVybnMge2FueX1cclxuICAgICAqL1xyXG4gICAgcGl4ZWxUb1BvaW50KHBpeGVsOiBOUE1hcExpYi5HZW9tZXRyeS5QaXhlbCk6IE5QTWFwTGliLkdlb21ldHJ5LlBvaW50IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhwaXhlbClcclxuICAgICAgICBpZiAodGhpcy5tYXAgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXAucGl4ZWxUb1BvaW50KHBpeGVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnu4/nuqzluqblnZDmoIfovazmjaLkuLrlg4/ntKDlnZDmoIdcclxuICAgICAqIEBwYXJhbSBwb2ludFxyXG4gICAgICogQHJldHVybnMge2FueX1cclxuICAgICAqL1xyXG4gICAgcG9pbnRUb1BpeGVsKHBvaW50OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2ludCk6IE5QTWFwTGliLkdlb21ldHJ5LlBpeGVsIHtcclxuICAgICAgICBpZiAodGhpcy5tYXAgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXAucG9pbnRUb1BpeGVsKHBvaW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDku47lnLDlm77kuK3np7vpmaTmjqfku7bjgILlpoLmnpzmjqfku7bku47mnKrooqvmt7vliqDliLDlnLDlm77kuK3vvIzliJnor6Xnp7vpmaTkuI3otbfku7vkvZXkvZznlKhcclxuICAgICAqIEBwYXJhbSBjb250cm9sXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUNvbnRyb2woY29udHJvbDogTlBNYXBMaWIuQ29udHJvbCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56e76Zmk55m+5bqm5Zyw5Zu+5omL55qE5qC35byPXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUhhbmRTdHlsZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5tYXAgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5yZW1vdmVIYW5kU3R5bGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vpmaTkuIDkuKrlm77lsYLvvIzmoLnmja7lm77lsYJpZFxyXG4gICAgICogQHBhcmFtIGlkXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUxheWVyKGlkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOenu+mZpOS4gOS4quWbvuWxgu+8jOagueaNruWbvuWxgm5hbWVcclxuICAgICAqIEBwYXJhbSBuYW1lXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUxheWVyQnlOYW1lKG5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LuO5Zyw5Zu+5Lit56e76Zmk6KaG55uW54mp44CC5aaC5p6c6KaG55uW54mp5LuO5pyq6KKr5re75Yqg5Yiw5Zyw5Zu+5Lit77yM5YiZ6K+l56e76Zmk5LiN6LW35Lu75L2V5L2c55SoXHJcbiAgICAgKiBAcGFyYW0gb3ZlcmxheVxyXG4gICAgICovXHJcbiAgICByZW1vdmVPdmVybGF5KG92ZXJsYXk6IE5QTWFwTGliLk92ZXJsYXkpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5tYXAgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5yZW1vdmVPdmVybGF5KG92ZXJsYXkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LuO5Zyw5Zu+5Lit56e76Zmk6KaG55uW54mp44CC5aaC5p6c6KaG55uW54mp5LuO5pyq6KKr5re75Yqg5Yiw5Zyw5Zu+5Lit77yM5YiZ6K+l56e76Zmk5LiN6LW35Lu75L2V5L2c55SoXHJcbiAgICAgKiBAcGFyYW0gb3ZlcmxheXNcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlT3ZlcmxheXMob3ZlcmxheXM6IEFycmF5PE5QTWFwTGliLk92ZXJsYXk+KTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43mlrDorr7nva7lnLDlm77vvIzmgaLlpI3lnLDlm77liJ3lp4vljJbml7bnmoTkuK3lv4PngrnlkoznuqfliKtcclxuICAgICAqL1xyXG4gICAgcmVzZXQoKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7ln7rnoYDlm77lsYJcclxuICAgICAqIEBwYXJhbSBsYXllclxyXG4gICAgICovXHJcbiAgICBzZXRCYXNlTGF5ZXIobGF5ZXI6IE5QTWFwTGliLkxheWVyKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7lnLDlm77kuK3lv4PngrlcclxuICAgICAqIEBwYXJhbSBjZW50ZXJcclxuICAgICAqIEBwYXJhbSB6b29tXHJcbiAgICAgKi9cclxuICAgIHNldENlbnRlcihjZW50ZXI6IE5QTWFwTGliLkdlb21ldHJ5LlBvaW50LCB6b29tOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruWcsOWbvum8oOagh+aMh+mSiOagt+W8j1xyXG4gICAgICogQHBhcmFtIGN1cnNvclxyXG4gICAgICovXHJcbiAgICBzZXRDdXJzb3IoY3Vyc29yOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5tYXAgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5zZXRDdXJzb3IoY3Vyc29yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7pvKDmoIfmqKHlvI/moLflvI9cclxuICAgICAqIEBwYXJhbSBjdXJzb3JcclxuICAgICAqL1xyXG4gICAgc2V0RGVmYXVsdE1hcEN1cnNvcihjdXJzb3I6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5piv5ZCm56aB55So5rWP6KeI5Zmo5LqL5Lu277yM6buY6K6k5Li6dHJ1ZSjnpoHmraIpXHJcbiAgICAgKiBAcGFyYW0gZmFsbFRocm91Z2hcclxuICAgICAqL1xyXG4gICAgc2V0RmFsbFRocm91Z2goZmFsbFRocm91Z2g6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruWcsOWbvumjjuagvOagt+W8j++8jOW9k+WJjeWPquiDveiuvue9rueahOWPguaVsOaYr++8mueBsOiJsu+8jOa1hee7v++8jOWkqeiTne+8jOeyieiJsu+8jOe7j+WFuOm7kSDms6jmhI/kvY7niYjmnKxJRSDkuI3mlK/mjIFcclxuICAgICAqIEBwYXJhbSBtYXBTdHlsZVxyXG4gICAgICovXHJcbiAgICBzZXRNYXBTdHlsZShtYXBTdHlsZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7lnLDlm77lhYHorrjnmoTmnIDlpKfnuqfliKvjgILlj5blgLzkuI3lvpflpKfkuo7lnLDlm77nsbvlnovmiYDlhYHorrjnmoTmnIDlpKfnuqfliKtcclxuICAgICAqIEBwYXJhbSB6b29tXHJcbiAgICAgKi9cclxuICAgIHNldE1heFpvb20oem9vbTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7lnLDlm77lhYHorrjnmoTmnIDlsI/nuqfliKvjgILlj5blgLzkuI3lvpflsI/kuo7lnLDlm77nsbvlnovmiYDlhYHorrjnmoTmnIDlsI/nuqfliKtcclxuICAgICAqIEBwYXJhbSB6b29tXHJcbiAgICAgKi9cclxuICAgIHNldE1pblpvb20oem9vbTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7pu5jorqTlm77lsYLlj6/op4HmgKdcclxuICAgICAqIEBwYXJhbSB2aXNpYmlsaXR5XHJcbiAgICAgKi9cclxuICAgIHNldFZpc2liaWxpdHlEZWZhbHV0TGF5ZXIodmlzaWJpbGl0eTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bCG6KeG5Zu+5YiH5o2i5Yiw5oyH5a6a55qE57yp5pS+562J57qn77yM5Lit5b+D54K55Z2Q5qCH5LiN5Y+YXHJcbiAgICAgKiBAcGFyYW0gem9vbVxyXG4gICAgICovXHJcbiAgICBzZXRab29tKHpvb206IG51bWJlcik6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YiH5o2i5Zu+5bGC44CCaW5kZXjkuLrmt7vliqDliLDlnLDlm77ml7bnmoTpobrluo/jgIJcclxuICAgICAqIEBwYXJhbSBpbmRleFxyXG4gICAgICovXHJcbiAgICBzd2l0Y2hMYXllcihpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliIfmjaLlm77lsYLjgIJsYXllck5hbWXkuLrmt7vliqDliLDlnLDlm77ml7bnmoTpobrluo/jgIJcclxuICAgICAqIEBwYXJhbSBsYXllck5hbWVcclxuICAgICAqL1xyXG4gICAgc3dpdGNoTGF5ZXJCeU5hbWUobGF5ZXJOYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiwg+aVtOeUu+W4g+Wkp+Wwj1xyXG4gICAgICovXHJcbiAgICB1cGRhdGVTaXplKCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ouJ5qGG5pS+5aSnXHJcbiAgICAgKi9cclxuICAgIHpvb21JbigpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWbuuWumuaUvuWkp+S4gOS4que6p+WIq1xyXG4gICAgICovXHJcbiAgICB6b29tSW5GaXhlZCgpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPlua2iOaLieahhue8qeaUvlxyXG4gICAgICovXHJcbiAgICB6b29tSW5PdXRTdG9wKCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ouJ5qGG57yp5bCPXHJcbiAgICAgKi9cclxuICAgIHpvb21PdXQoKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlm7rlrprnvKnlsI/kuIDkuKrnuqfliKtcclxuICAgICAqL1xyXG4gICAgem9vbU91dEZpeGVkKCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57yp5pS+5Yiw5oyH5a6a6IyD5Zu0XHJcbiAgICAgKiBAcGFyYW0gcG9zaXRpb25cclxuICAgICAqIEBwYXJhbSB6b29tXHJcbiAgICAgKi9cclxuICAgIHpvb21Ubyhwb3NpdGlvbjogTlBNYXBMaWIuR2VvbWV0cnkuUG9pbnQsIHpvb206IG51bWJlcik6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57yp5pS+5Yiw5oyH5a6a6IyD5Zu0XHJcbiAgICAgKiBAcGFyYW0gZXh0ZW50XHJcbiAgICAgKi9cclxuICAgIHpvb21Ub0V4dGVudChleHRlbnQ6IE5QTWFwTGliLkdlb21ldHJ5LkV4dGVudCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg5LqL5Lu255uR5ZCs5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRcclxuICAgICAqIEBwYXJhbSBoYW5kbGVyXHJcbiAgICAgKi9cclxuICAgIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnQ6IGFueSwgaGFuZGxlcjogKHBhcmFtczogYW55KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMubWFwICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5tYXAuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56e76Zmk5LqL5Lu255uR5ZCs5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMubWFwICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5tYXAucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFkZEhhbmRTdHlsZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5tYXAgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5hZGRIYW5kU3R5bGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbWFwOiBOUE1hcExpYi5NYXAgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG1hcDogTlBNYXBMaWIuTWFwKSB7XHJcbiAgICAgICAgdGhpcy5tYXAgPSBtYXA7XHJcbiAgICB9XHJcbn0iXX0=
