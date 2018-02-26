define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MapOpts = (function () {
        function MapOpts() {
        }
        return MapOpts;
    }());
    var LayerInfo = (function () {
        function LayerInfo() {
            this.projection = 4326;
            this.type = "png";
        }
        return LayerInfo;
    }());
    var LayerOpt = (function () {
        function LayerOpt() {
        }
        return LayerOpt;
    }());
    var VectorLayer = (function () {
        function VectorLayer() {
            this.layerType = "NPMapLib.Layers.NPLayer";
        }
        return VectorLayer;
    }());
    var MapConfigModel = (function () {
        function MapConfigModel() {
        }
        return MapConfigModel;
    }());
    exports.MapConfigModel = MapConfigModel;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL21hcC9jb3JlL21vZGVsL21hcC5jb25maWcubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBR0E7UUFBQTtRQU1BLENBQUM7UUFBRCxjQUFDO0lBQUQsQ0FOQSxBQU1DLElBQUE7SUFFRDtRQUFBO1lBUUksZUFBVSxHQUFXLElBQUksQ0FBQztZQUUxQixTQUFJLEdBQVUsS0FBSyxDQUFDO1FBRXhCLENBQUM7UUFBRCxnQkFBQztJQUFELENBWkEsQUFZQyxJQUFBO0lBRUQ7UUFBQTtRQUdBLENBQUM7UUFBRCxlQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFFRDtRQUFBO1lBRUksY0FBUyxHQUFXLHlCQUF5QixDQUFDO1FBRWxELENBQUM7UUFBRCxrQkFBQztJQUFELENBSkEsQUFJQyxJQUFBO0lBRUQ7UUFPSTtRQUlBLENBQUM7UUFDTCxxQkFBQztJQUFELENBWkEsQUFZQyxJQUFBO0lBWlksd0NBQWMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9tYXAvY29yZS9tb2RlbC9tYXAuY29uZmlnLm1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE3LzQvMjYuXHJcbiAqL1xyXG5jbGFzcyBNYXBPcHRze1xyXG4gICAgbWluWm9vbTogbnVtYmVyO1xyXG4gICAgbWF4Wm9vbTogbnVtYmVyO1xyXG4gICAgY2VudGVyUG9pbnQ6IFtudW1iZXIsIG51bWJlcl07XHJcbiAgICByZXN0cmljdGVkRXh0ZW50OiBbbnVtYmVyLCBudW1iZXJdO1xyXG4gICAgcHJvamVjdGlvbjogc3RyaW5nO1xyXG59XHJcblxyXG5jbGFzcyBMYXllckluZm97XHJcbiAgICBjZW50ZXJQb2ludDogW251bWJlciwgbnVtYmVyXTtcclxuICAgIGZ1bGxFeHRlbnQ6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xyXG4gICAgZGVmYXVsdFpvb206IG51bWJlcjtcclxuICAgIGxheWVyVHlwZTogc3RyaW5nO1xyXG5cclxuICAgIG1heFpvb206IG51bWJlcjtcclxuICAgIG1pblpvb206IG51bWJlcjtcclxuICAgIHByb2plY3Rpb246IG51bWJlciA9IDQzMjY7XHJcbiAgICByZXN0cmljdGVkRXh0ZW50OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcclxuICAgIHR5cGU6c3RyaW5nID0gXCJwbmdcIjtcclxuICAgIHpvb21MZXZlbFNlcXVlbmNlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmNsYXNzIExheWVyT3B0e1xyXG4gICAgdXJsOiBzdHJpbmc7XHJcbiAgICBsYXllckluZm86IExheWVySW5mbztcclxufVxyXG5cclxuY2xhc3MgVmVjdG9yTGF5ZXJ7XHJcbiAgICBsYXllck5hbWU6IHN0cmluZztcclxuICAgIGxheWVyVHlwZTogc3RyaW5nID0gXCJOUE1hcExpYi5MYXllcnMuTlBMYXllclwiO1xyXG4gICAgbGF5ZXJPcHQ6IExheWVyT3B0O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWFwQ29uZmlnTW9kZWwge1xyXG5cclxuICAgIG1hcE9wdHM6IE1hcE9wdHM7IC8vIOepuueZveWcsOWbvumFjee9rlxyXG5cclxuICAgIHZlY3RvckxheWVyOiBBcnJheTxWZWN0b3JMYXllcj47IC8vIOWbvuWxguacrOi6q+eahOmFjee9rlxyXG4gICAgc2F0dGlsYXRlTGF5ZXI6QXJyYXk8VmVjdG9yTGF5ZXI+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgICAvLyDlnKjov5nph4zop6PmnpBqc29u5a2X56ym5LiyXHJcblxyXG4gICAgfVxyXG59Il19
