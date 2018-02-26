define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MapConfigParameterExt = (function () {
        function MapConfigParameterExt() {
            this.projection = 4326;
            this.layerType = "NPMapLib.Layers.NPLayer";
        }
        return MapConfigParameterExt;
    }());
    exports.MapConfigParameterExt = MapConfigParameterExt;
    var CenterPoint = (function () {
        function CenterPoint() {
        }
        return CenterPoint;
    }());
    exports.CenterPoint = CenterPoint;
    var RestrictedExtent = (function () {
        function RestrictedExtent() {
        }
        return RestrictedExtent;
    }());
    exports.RestrictedExtent = RestrictedExtent;
    exports.MapConfigParamConst = {
        FieldName: { value: "ParamClass" },
        FieldValue: { value: "MapConfigParameter" }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL2VudGl0eS9NYXBDb25maWdQYXJhbWV0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBS0E7UUFBQTtZQW9CSSxlQUFVLEdBQVcsSUFBSSxDQUFDO1lBTTFCLGNBQVMsR0FBVyx5QkFBeUIsQ0FBQztRQU9sRCxDQUFDO1FBQUQsNEJBQUM7SUFBRCxDQWpDQSxBQWlDQyxJQUFBO0lBakNZLHNEQUFxQjtJQXFDbEM7UUFBQTtRQU1BLENBQUM7UUFBRCxrQkFBQztJQUFELENBTkEsQUFNQyxJQUFBO0lBTlksa0NBQVc7SUFTeEI7UUFBQTtRQVlBLENBQUM7UUFBRCx1QkFBQztJQUFELENBWkEsQUFZQyxJQUFBO0lBWlksNENBQWdCO0lBZWhCLFFBQUEsbUJBQW1CLEdBQUc7UUFDL0IsU0FBUyxFQUFFLEVBQUMsS0FBSyxFQUFFLFlBQVksRUFBQztRQUNoQyxVQUFVLEVBQUUsRUFBQyxLQUFLLEVBQUUsb0JBQW9CLEVBQUM7S0FDNUMsQ0FBQyIsImZpbGUiOiJjb3JlL2VudGl0eS9NYXBDb25maWdQYXJhbWV0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog5Zyw5Zu+5pyN5Yqh6YWN572u5Y+C5pWwLlxyXG4gKiBjcmVhdGUgYnkgem1wLlxyXG4gKiBAdGltZTogMjAxNy0wOC0xMFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1hcENvbmZpZ1BhcmFtZXRlckV4dCB7XHJcbiAgICAvLyDlnLDlm77lkI3np7BcclxuICAgIGxheWVyTmFtZTogc3RyaW5nO1xyXG5cclxuICAgIC8vIOWcsOWbvuacjeWKoeWcsOWdgFxyXG4gICAgdXJsOiBzdHJpbmc7XHJcblxyXG4gICAgLy8g6buY6K6k5Zu+5bGC5bGC57qnXHJcbiAgICBkZWZhdWx0Wm9vbTogbnVtYmVyO1xyXG5cclxuICAgIC8vIOacgOWkp+e8qeaUvuWbvuWxguWxgue6p1xyXG4gICAgbWF4Wm9vbTogbnVtYmVyO1xyXG5cclxuICAgIC8vIOacgOWwj+e8qeaUvuWbvuWxguWxgue6p1xyXG4gICAgbWluWm9vbTogbnVtYmVyO1xyXG5cclxuICAgIC8vIOWcsOWbvue8lueggVxyXG4gICAgZGlzcGxheVByb2plY3Rpb246IHN0cmluZztcclxuXHJcbiAgICAvLyDmipXlvbHvvIjnsbvkvLznvJbnoIEgwqDCoOm7mOiupCA0MzI277yJXHJcbiAgICBwcm9qZWN0aW9uOiBudW1iZXIgPSA0MzI2O1xyXG5cclxuICAgIC8vIOS4reW/g+eCuee7j+e6rOW6plxyXG4gICAgY2VudGVyUG9pbnQ6IENlbnRlclBvaW50O1xyXG5cclxuICAgIC8vIOWcsOWbvuexu+Weiyjpu5jorqQgTlBNYXBMaWIuTGF5ZXJzLk5QTGF5ZXIpXHJcbiAgICBsYXllclR5cGU6IHN0cmluZyA9IFwiTlBNYXBMaWIuTGF5ZXJzLk5QTGF5ZXJcIjtcclxuXHJcbiAgICAvLyDlnLDlm77mmL7npLrnmoTpmZDliLbojIPlm7QoWzAsIDAsIDAsIDBdKVxyXG4gICAgcmVzdHJpY3RlZEV4dGVudDogUmVzdHJpY3RlZEV4dGVudDtcclxuXHJcbiAgICAvL+aPj+i/sOWtl+autVxyXG4gICAgZGVzYzogc3RyaW5nO1xyXG59XHJcblxyXG5cclxuLy8g5Lit5b+D54K557uP57qs5bqmXHJcbmV4cG9ydCBjbGFzcyBDZW50ZXJQb2ludCB7XHJcbiAgICAvLyDnuqzluqZcclxuICAgIExhdDogc3RyaW5nO1xyXG5cclxuICAgIC8v57uP5bqmXHJcbiAgICBMb246IHN0cmluZztcclxufVxyXG5cclxuLy8g5Y+v6KeB5Yy65Z+f57uP57qs5bqmXHJcbmV4cG9ydCBjbGFzcyBSZXN0cmljdGVkRXh0ZW50IHtcclxuICAgIC8vIOacgOWkp+e6rOW6plxyXG4gICAgbWF4TGF0OiBzdHJpbmc7XHJcblxyXG4gICAgLy8g5pyA5aSn57uP5bqmXHJcbiAgICBtYXhMb246IHN0cmluZztcclxuXHJcbiAgICAvLyDmnIDlsI/nuqzluqZcclxuICAgIG1pbkxhdDogc3RyaW5nO1xyXG5cclxuICAgIC8vIOacgOWwj+e7j+W6plxyXG4gICAgbWluTG9uOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8vIOWcsOWbvumFjee9ruW4uOmHj+WPguaVsOexu+WIq1xyXG5leHBvcnQgY29uc3QgTWFwQ29uZmlnUGFyYW1Db25zdCA9IHtcclxuICAgIEZpZWxkTmFtZToge3ZhbHVlOiBcIlBhcmFtQ2xhc3NcIn0sXHJcbiAgICBGaWVsZFZhbHVlOiB7dmFsdWU6IFwiTWFwQ29uZmlnUGFyYW1ldGVyXCJ9XHJcbn07Il19
