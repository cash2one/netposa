define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MapBaseLayerUtil = (function () {
        function MapBaseLayerUtil() {
        }
        MapBaseLayerUtil.initMaplayer = function (map, mapConfig) {
            if (map == null)
                return;
            var i, len, baseLayer = [], vectorLayerItem, baseLayerItem, vectorBaseLayer = [], layerTypes;
            for (i = 0, len = mapConfig.vectorLayer.length; i < len; i++) {
                vectorLayerItem = mapConfig.vectorLayer[i];
                layerTypes = vectorLayerItem.layerType.split('.');
                var layers = NPMapLib.Layers;
                baseLayerItem = new layers[layerTypes[layerTypes.length - 1]](vectorLayerItem.layerOpt.url, vectorLayerItem.layerName, vectorLayerItem.layerOpt);
                vectorBaseLayer.push(baseLayerItem);
                baseLayer.push(baseLayerItem);
            }
            map.addLayers(baseLayer);
        };
        return MapBaseLayerUtil;
    }());
    exports.MapBaseLayerUtil = MapBaseLayerUtil;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL21hcC9jb3JlL3V0aWxzL01hcEJhc2VMYXllclV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBSUE7UUFDSTtRQUNBLENBQUM7UUFFYSw2QkFBWSxHQUExQixVQUEyQixHQUFpQixFQUFFLFNBQXlCO1lBQ25FLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUM7Z0JBQUMsTUFBTSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxTQUFTLEdBQUcsRUFBRSxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsZUFBZSxHQUFHLEVBQUUsRUFBRSxVQUFVLENBQUM7WUFDN0YsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUMzRCxlQUFlLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsVUFBVSxHQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUdsRCxJQUFJLE1BQU0sR0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUNqQyxhQUFhLEdBQUcsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFakosZUFBZSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDcEMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNsQyxDQUFDO1lBQ0QsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBRUwsdUJBQUM7SUFBRCxDQXJCQSxBQXFCQyxJQUFBO0lBckJZLDRDQUFnQiIsImZpbGUiOiJtb2R1bGUvY29tbW9uL21hcC9jb3JlL3V0aWxzL01hcEJhc2VMYXllclV0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01hcENvbmZpZ01vZGVsfSBmcm9tIFwiLi4vbW9kZWwvbWFwLmNvbmZpZy5tb2RlbFwiO1xyXG4vKipcclxuICogQ3JlYXRlZCBieSBkZWxsIG9uIDIwMTcvNC8yNi5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBNYXBCYXNlTGF5ZXJVdGlsIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5pdE1hcGxheWVyKG1hcDogTlBNYXBMaWIuTWFwLCBtYXBDb25maWc6IE1hcENvbmZpZ01vZGVsKSB7XHJcbiAgICAgICAgaWYgKG1hcCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgbGV0IGksIGxlbiwgYmFzZUxheWVyID0gW10sIHZlY3RvckxheWVySXRlbSwgYmFzZUxheWVySXRlbSwgdmVjdG9yQmFzZUxheWVyID0gW10sIGxheWVyVHlwZXM7XHJcbiAgICAgICAgZm9yIChpID0gMCwgbGVuID0gbWFwQ29uZmlnLnZlY3RvckxheWVyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZlY3RvckxheWVySXRlbSA9IG1hcENvbmZpZy52ZWN0b3JMYXllcltpXTtcclxuICAgICAgICAgICAgbGF5ZXJUeXBlcyA9IHZlY3RvckxheWVySXRlbS5sYXllclR5cGUuc3BsaXQoJy4nKTtcclxuXHJcbiAgICAgICAgICAgIC8veGM6IGJhc2VMYXllckl0ZW0gPSBuZXcgTlBNYXBMaWIuTGF5ZXJzLk5QTGF5ZXIoXCJtYXBDb25maWcuanNvbueahHVybFwiLFwieGlhblRpYW5kaVwiLG1hcENvbmZpZy5qc29u55qEdmVjdG9yTGF5ZXIubGF5ZXJPcHQpICDkuInkuKrlj4LmlbBcclxuICAgICAgICAgICAgbGV0IGxheWVyczphbnkgPSBOUE1hcExpYi5MYXllcnM7XHJcbiAgICAgICAgICAgIGJhc2VMYXllckl0ZW0gPSBuZXcgbGF5ZXJzW2xheWVyVHlwZXNbbGF5ZXJUeXBlcy5sZW5ndGggLSAxXV0odmVjdG9yTGF5ZXJJdGVtLmxheWVyT3B0LnVybCwgdmVjdG9yTGF5ZXJJdGVtLmxheWVyTmFtZSwgdmVjdG9yTGF5ZXJJdGVtLmxheWVyT3B0KTtcclxuXHJcbiAgICAgICAgICAgIHZlY3RvckJhc2VMYXllci5wdXNoKGJhc2VMYXllckl0ZW0pO1xyXG4gICAgICAgICAgICBiYXNlTGF5ZXIucHVzaChiYXNlTGF5ZXJJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWFwLmFkZExheWVycyhiYXNlTGF5ZXIpO1xyXG4gICAgfVxyXG5cclxufSJdfQ==
