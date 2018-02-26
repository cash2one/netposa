define(["require", "exports", "echarts"], function (require, exports, echarts) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var graphic = echarts.graphic;
    var linearGradient = graphic.LinearGradient;
    var axisPointerlineStyle = (function () {
        function axisPointerlineStyle() {
            this.type = "dashed";
        }
        return axisPointerlineStyle;
    }());
    exports.axisPointerlineStyle = axisPointerlineStyle;
    var axisPointer = (function () {
        function axisPointer() {
            this.type = "line";
            this.lineStyle = new axisPointerlineStyle();
        }
        return axisPointer;
    }());
    exports.axisPointer = axisPointer;
    var tipStyle = (function () {
        function tipStyle() {
            this.fontSize = 12;
        }
        return tipStyle;
    }());
    exports.tipStyle = tipStyle;
    var tooltip = (function () {
        function tooltip() {
            this.trigger = "axis";
            this.axisPointer = new axisPointer();
            this.textStyle = new tipStyle();
            this.confine = true;
        }
        return tooltip;
    }());
    exports.tooltip = tooltip;
    var legend = (function () {
        function legend() {
            this.top = 0;
            this.left = 5;
            this.itemHeight = 10;
            this.itemWidth = 15;
            this.icon = "stack";
        }
        return legend;
    }());
    exports.legend = legend;
    var grid = (function () {
        function grid() {
            this.left = 10;
            this.right = 15;
            this.top = 40;
            this.bottom = 10;
            this.containLabel = true;
        }
        return grid;
    }());
    exports.grid = grid;
    var lineStyle = (function () {
        function lineStyle() {
            this.color = "#C9C9C9";
            this.interval = false;
        }
        return lineStyle;
    }());
    exports.lineStyle = lineStyle;
    var axisLine = (function () {
        function axisLine() {
            this.show = true;
            this.lineStyle = new lineStyle();
        }
        return axisLine;
    }());
    exports.axisLine = axisLine;
    var textStyle = (function () {
        function textStyle() {
            this.color = "#6F6E6E";
            this.fontSize = 12;
        }
        return textStyle;
    }());
    exports.textStyle = textStyle;
    var axisLabel = (function () {
        function axisLabel() {
            this.textStyle = new textStyle();
            this.color = "#333333";
            this.fontFamily = 'Arial' || 'Microsoft Yahei';
        }
        return axisLabel;
    }());
    exports.axisLabel = axisLabel;
    var splitLine = (function () {
        function splitLine() {
            this.lineStyle = new lineStyle();
        }
        return splitLine;
    }());
    exports.splitLine = splitLine;
    var axisTick = (function () {
        function axisTick() {
            this.alignWithLabel = true;
        }
        return axisTick;
    }());
    exports.axisTick = axisTick;
    var dataStyleText = (function () {
        function dataStyleText() {
            this.fontSize = 12;
        }
        return dataStyleText;
    }());
    exports.dataStyleText = dataStyleText;
    var dataText = (function () {
        function dataText() {
            this.textStyle = new dataStyleText();
        }
        return dataText;
    }());
    exports.dataText = dataText;
    var xAxis = (function () {
        function xAxis() {
        }
        return xAxis;
    }());
    exports.xAxis = xAxis;
    var nameTextStyle = (function () {
        function nameTextStyle() {
            this.color = '#444444';
            this.fontSize = 12;
            this.padding = [0, 40, 0, 0];
        }
        return nameTextStyle;
    }());
    exports.nameTextStyle = nameTextStyle;
    var yAxis = (function () {
        function yAxis() {
            this.axisLine = new axisLine();
            this.axisLabel = new axisLabel();
            this.splitLine = new splitLine();
            this.splitNumber = 5;
        }
        return yAxis;
    }());
    exports.yAxis = yAxis;
    var emphasis = (function () {
        function emphasis() {
            this.shadowBlur = 10;
            this.shadowOffsetX = 0;
            this.shadowColor = "rgba(0, 0, 0, 0.5)";
        }
        return emphasis;
    }());
    exports.emphasis = emphasis;
    var seriesDataA = (function () {
        function seriesDataA() {
        }
        return seriesDataA;
    }());
    exports.seriesDataA = seriesDataA;
    var normal = (function () {
        function normal() {
        }
        return normal;
    }());
    exports.normal = normal;
    var itemStyle = (function () {
        function itemStyle() {
        }
        return itemStyle;
    }());
    exports.itemStyle = itemStyle;
    var label = (function () {
        function label() {
        }
        return label;
    }());
    exports.label = label;
    var labelLine = (function () {
        function labelLine() {
        }
        return labelLine;
    }());
    exports.labelLine = labelLine;
    var series = (function () {
        function series() {
        }
        return series;
    }());
    exports.series = series;
    var ObjectNormal = (function () {
        function ObjectNormal() {
            this.opacity = 0.3;
        }
        return ObjectNormal;
    }());
    exports.ObjectNormal = ObjectNormal;
    var areaStyle = (function () {
        function areaStyle() {
        }
        return areaStyle;
    }());
    exports.areaStyle = areaStyle;
    var areaStyleColor = (function () {
        function areaStyleColor(color) {
            this.color = color;
        }
        areaStyleColor.prototype.getColor = function () {
            var that = this;
            var gradientColor = {
                color: new linearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "rgba(" + that.color + ",0.25)" },
                    { offset: 0.5, color: "rgba(" + that.color + ",0.13)" },
                    { offset: 1, color: "rgba(" + that.color + ",0.00)" }
                ])
            };
            return gradientColor;
        };
        areaStyleColor.prototype.colorDiff = function () {
            var that = this;
            var result = {
                color: function (params) {
                    var colorList = that.color;
                    return colorList[params.dataIndex];
                }
            };
            return result;
        };
        return areaStyleColor;
    }());
    exports.areaStyleColor = areaStyleColor;
    var dataZoom = (function () {
        function dataZoom() {
            this.show = false;
            this.start = 0;
            this.end = 100;
        }
        return dataZoom;
    }());
    exports.dataZoom = dataZoom;
    var EChartOption = (function () {
        function EChartOption() {
            this.legend = new legend();
            this.tooltip = new tooltip();
        }
        return EChartOption;
    }());
    exports.EChartOption = EChartOption;
    var setEnlargeData = (function () {
        function setEnlargeData() {
        }
        return setEnlargeData;
    }());
    exports.setEnlargeData = setEnlargeData;
    var title = (function () {
        function title() {
        }
        return title;
    }());
    exports.title = title;
    var ResourceStatisticalName = (function () {
        function ResourceStatisticalName() {
        }
        ResourceStatisticalName.ResourceStatisticalTotal = "ResourceStatisticalTotal";
        ResourceStatisticalName.AreaTotalCollection = "AreaTotalCollection";
        ResourceStatisticalName.AlarmStatistics = "AlarmStatistics";
        ResourceStatisticalName.DataServiceStatistics = "DataServiceStatistics";
        ResourceStatisticalName.ResourcebRetrievalTrend = "ResourcebRetrievalTrend";
        return ResourceStatisticalName;
    }());
    exports.ResourceStatisticalName = ResourceStatisticalName;
    var carStatisticsName = (function () {
        function carStatisticsName() {
        }
        carStatisticsName.carStatistics = "carStatistics";
        carStatisticsName.areaCarStatistics = "areaCarStatistics";
        carStatisticsName.areaCarAlarmStatistics = "areaCarAlarmStatistics";
        carStatisticsName.carTypeStatistics = "carTypeStatistics";
        carStatisticsName.carColorStatistics = "carColorStatistics";
        return carStatisticsName;
    }());
    exports.carStatisticsName = carStatisticsName;
    var personStatisticsName = (function () {
        function personStatisticsName() {
        }
        personStatisticsName.PersonStatistics = "PersonStatistics";
        personStatisticsName.AreaPersonStatistics = "AreaPersonStatistics";
        personStatisticsName.AreaPersonAlarmStatistics = "AreaPersonAlarmStatistics";
        personStatisticsName.PersonTypeStatistics = "PersonTypeStatistics";
        personStatisticsName.PersonColorStatistics = "PersonColorStatistics";
        return personStatisticsName;
    }());
    exports.personStatisticsName = personStatisticsName;
    var WiFiStatisticsName = (function () {
        function WiFiStatisticsName() {
        }
        WiFiStatisticsName.WifiStatistics = "WifiStatistics";
        WiFiStatisticsName.AreaWifiStatistics = "AreaWifiStatistics";
        WiFiStatisticsName.AreaWifiAlarmStatistics = "AreaWifiAlarmStatistics";
        WiFiStatisticsName.WifiTypeStatistics = "WifiTypeStatistics";
        WiFiStatisticsName.WifiColorStatistics = "WifiColorStatistics";
        return WiFiStatisticsName;
    }());
    exports.WiFiStatisticsName = WiFiStatisticsName;
    var EFENCEStatisticsName = (function () {
        function EFENCEStatisticsName() {
        }
        EFENCEStatisticsName.EFStatistics = "EFStatistics";
        EFENCEStatisticsName.AreaEFStatistics = "AreaEFStatistics";
        EFENCEStatisticsName.AreaEFAlarmStatistics = "AreaEFAlarmStatistics";
        EFENCEStatisticsName.EFTypeStatistics = "EFTypeStatistics";
        EFENCEStatisticsName.EFColorStatistics = "EFColorStatistics";
        return EFENCEStatisticsName;
    }());
    exports.EFENCEStatisticsName = EFENCEStatisticsName;
    var otherStatisticsName = (function () {
        function otherStatisticsName() {
        }
        otherStatisticsName.WifiAllRankList = "WifiAllRankList";
        otherStatisticsName.EFColorStatistics = "EFColorStatistics";
        return otherStatisticsName;
    }());
    exports.otherStatisticsName = otherStatisticsName;
    exports.colorEnumArr = [
        { name: "黑色", value: "#333333" },
        { name: "白色", value: "#F0F0F0" },
        { name: "蓝色", value: "#5A9EFF" },
        { name: "黄色", value: "#FFB401" },
        { name: "绿色", value: "#2FCB76" }
    ];
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2VudW0vRWNoYXJ0Q29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUlBLElBQUksT0FBTyxHQUFRLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFDbkMsSUFBSSxjQUFjLEdBQVEsT0FBTyxDQUFDLGNBQWMsQ0FBQztJQUVqRDtRQUFBO1lBQ0ksU0FBSSxHQUFXLFFBQVEsQ0FBQTtRQUMzQixDQUFDO1FBQUQsMkJBQUM7SUFBRCxDQUZBLEFBRUMsSUFBQTtJQUZZLG9EQUFvQjtJQUlqQztRQUFBO1lBQ0ksU0FBSSxHQUFXLE1BQU0sQ0FBQztZQUN0QixjQUFTLEdBQXlCLElBQUksb0JBQW9CLEVBQUUsQ0FBQztRQUNqRSxDQUFDO1FBQUQsa0JBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUhZLGtDQUFXO0lBS3hCO1FBQUE7WUFDSSxhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQzFCLENBQUM7UUFBRCxlQUFDO0lBQUQsQ0FGQSxBQUVDLElBQUE7SUFGWSw0QkFBUTtJQUlyQjtRQUFBO1lBQ0ksWUFBTyxHQUFXLE1BQU0sQ0FBQztZQUV6QixnQkFBVyxHQUFnQixJQUFJLFdBQVcsRUFBRSxDQUFDO1lBQzdDLGNBQVMsR0FBYSxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ3JDLFlBQU8sR0FBWSxJQUFJLENBQUM7UUFFNUIsQ0FBQztRQUFELGNBQUM7SUFBRCxDQVBBLEFBT0MsSUFBQTtJQVBZLDBCQUFPO0lBU3BCO1FBQUE7WUFHSSxRQUFHLEdBQW9CLENBQUMsQ0FBQztZQUN6QixTQUFJLEdBQW9CLENBQUMsQ0FBQztZQUcxQixlQUFVLEdBQVcsRUFBRSxDQUFDO1lBQ3hCLGNBQVMsR0FBVyxFQUFFLENBQUM7WUFLdkIsU0FBSSxHQUFXLE9BQU8sQ0FBQztRQUczQixDQUFDO1FBQUQsYUFBQztJQUFELENBaEJBLEFBZ0JDLElBQUE7SUFoQlksd0JBQU07SUFrQm5CO1FBQUE7WUFDSSxTQUFJLEdBQVcsRUFBRSxDQUFD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SW5CLFFBQUEsWUFBWSxHQUFlO1FBQ3BDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO1FBQ2hDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO1FBQ2hDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO1FBQ2hDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO1FBQ2hDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO0tBQ25DLENBQUEiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9lbnVtL0VjaGFydENvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGVjaGFydHMgZnJvbSAnZWNoYXJ0cyc7XHJcblxyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcblxyXG5sZXQgZ3JhcGhpYzogYW55ID0gZWNoYXJ0cy5ncmFwaGljO1xyXG5sZXQgbGluZWFyR3JhZGllbnQ6IGFueSA9IGdyYXBoaWMuTGluZWFyR3JhZGllbnQ7XHJcblxyXG5leHBvcnQgY2xhc3MgYXhpc1BvaW50ZXJsaW5lU3R5bGUge1xyXG4gICAgdHlwZTogc3RyaW5nID0gXCJkYXNoZWRcIlxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgYXhpc1BvaW50ZXIge1xyXG4gICAgdHlwZTogc3RyaW5nID0gXCJsaW5lXCI7XHJcbiAgICBsaW5lU3R5bGU6IGF4aXNQb2ludGVybGluZVN0eWxlID0gbmV3IGF4aXNQb2ludGVybGluZVN0eWxlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyB0aXBTdHlsZSB7XHJcbiAgICBmb250U2l6ZTogbnVtYmVyID0gMTI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyB0b29sdGlwIHtcclxuICAgIHRyaWdnZXI6IHN0cmluZyA9IFwiYXhpc1wiO1xyXG4gICAgZm9ybWF0dGVyOiBzdHJpbmc7XHJcbiAgICBheGlzUG9pbnRlcjogYXhpc1BvaW50ZXIgPSBuZXcgYXhpc1BvaW50ZXIoKTtcclxuICAgIHRleHRTdHlsZTogdGlwU3R5bGUgPSBuZXcgdGlwU3R5bGUoKTtcclxuICAgIGNvbmZpbmU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcG9zaXRpb24/OiBBcnJheTxzdHJpbmc+IHwgRnVuY3Rpb247XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBsZWdlbmQge1xyXG4gICAgaXRlbUdhcD86IG51bWJlcjtcclxuICAgIGFsaWduPzogc3RyaW5nO1xyXG4gICAgdG9wOiBzdHJpbmcgfCBudW1iZXIgPSAwO1xyXG4gICAgbGVmdDogc3RyaW5nIHwgbnVtYmVyID0gNTtcclxuICAgIHJpZ2h0OiBzdHJpbmc7XHJcbiAgICBib3R0b206IHN0cmluZztcclxuICAgIGl0ZW1IZWlnaHQ6IG51bWJlciA9IDEwO1xyXG4gICAgaXRlbVdpZHRoOiBudW1iZXIgPSAxNTtcclxuICAgIGRhdGE6IEFycmF5PGFueT47XHJcbiAgICBvcmllbnQ6IHN0cmluZztcclxuICAgIHg6IHN0cmluZztcclxuICAgIHk6IHN0cmluZztcclxuICAgIGljb246IHN0cmluZyA9IFwic3RhY2tcIjtcclxuICAgIHdpZHRoOiBzdHJpbmc7XHJcbiAgICBoZWlnaHQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIGdyaWQge1xyXG4gICAgbGVmdDogbnVtYmVyID0gMTA7XHJcbiAgICByaWdodDogbnVtYmVyID0gMTU7XHJcbiAgICB0b3A6IG51bWJlciA9IDQwO1xyXG4gICAgYm90dG9tOiBudW1iZXIgPSAxMDtcclxuICAgIGNvbnRhaW5MYWJlbDogYm9vbGVhbiA9IHRydWU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBsaW5lU3R5bGUge1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgY29sb3I6IGFueSA9IFwiI0M5QzlDOVwiO1xyXG4gICAgaW50ZXJ2YWw6IGJvb2xlYW4gPSBmYWxzZTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIGF4aXNMaW5lIHtcclxuICAgIHNob3c6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgbGluZVN0eWxlOiBsaW5lU3R5bGUgPSBuZXcgbGluZVN0eWxlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyB0ZXh0U3R5bGUge1xyXG4gICAgY29sb3I6IHN0cmluZyA9IFwiIzZGNkU2RVwiO1xyXG4gICAgZm9udFNpemU6IG51bWJlciA9IDEyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgYXhpc0xhYmVsIHtcclxuICAgIHRleHRTdHlsZTogdGV4dFN0eWxlID0gbmV3IHRleHRTdHlsZSgpO1xyXG4gICAgY29sb3I6IHN0cmluZyA9IFwiIzMzMzMzM1wiO1xyXG4gICAgaW50ZXJ2YWw/OiBudW1iZXI7XHJcbiAgICByb3RhdGU/OiBudW1iZXI7XHJcbiAgICBtYXJnaW4/OiBudW1iZXI7XHJcbiAgICBmb250RmFtaWx5OiBzdHJpbmcgPSAnQXJpYWwnIHx8ICdNaWNyb3NvZnQgWWFoZWknO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3Mgc3BsaXRMaW5lIHtcclxuICAgIHNob3c6IGJvb2xlYW47XHJcbiAgICBsaW5lU3R5bGU6IGxpbmVTdHlsZSA9IG5ldyBsaW5lU3R5bGUoKTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIGF4aXNUaWNrIHtcclxuICAgIGFsaWduV2l0aExhYmVsOiBib29sZWFuID0gdHJ1ZTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIGRhdGFTdHlsZVRleHQge1xyXG4gICAgZm9udFNpemU6IG51bWJlciA9IDEyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgZGF0YVRleHQge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgdGV4dFN0eWxlOiBkYXRhU3R5bGVUZXh0ID0gbmV3IGRhdGFTdHlsZVRleHQoKTtcclxuICAgIGljb246IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIHhBeGlzIHtcclxuICAgIHNjYWxlPzogYm9vbGVhbjtcclxuICAgIHNob3c/OiBib29sZWFuO1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgYXhpc1RpY2s/OiBheGlzVGljaztcclxuICAgIGF4aXNMaW5lPzogYXhpc0xpbmU7XHJcbiAgICBheGlzTGFiZWw/OiBheGlzTGFiZWw7XHJcbiAgICBib3VuZGFyeUdhcD86IGJvb2xlYW4gfCBBcnJheTxudW1iZXI+O1xyXG4gICAgZGF0YTogQXJyYXk8YW55PjtcclxuICAgIHNwbGl0TGluZT86IHNwbGl0TGluZTtcclxuICAgIGxhYmVsPzogbGFiZWw7XHJcbiAgICBtaW4/OiBudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIG5hbWVUZXh0U3R5bGUge1xyXG4gICAgY29sb3I6IHN0cmluZyA9ICcjNDQ0NDQ0JztcclxuICAgIGZvbnRTaXplOiBudW1iZXIgPSAxMjtcclxuICAgIHBhZGRpbmc6IEFycmF5PG51bWJlcj4gPSBbMCwgNDAsIDAsIDBdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgeUF4aXMge1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgbWF4PzogbnVtYmVyO1xyXG4gICAgbWluPzogbnVtYmVyO1xyXG4gICAgYm91bmRhcnlHYXA/OiBib29sZWFuIHwgQXJyYXk8bnVtYmVyPjtcclxuICAgIGF4aXNMaW5lOiBheGlzTGluZSA9IG5ldyBheGlzTGluZSgpO1xyXG4gICAgYXhpc0xhYmVsOiBheGlzTGFiZWwgPSBuZXcgYXhpc0xhYmVsKCk7XHJcbiAgICBzcGxpdExpbmU6IHNwbGl0TGluZSA9IG5ldyBzcGxpdExpbmUoKTtcclxuICAgIHNwbGl0TnVtYmVyOiBudW1iZXIgPSA1O1xyXG4gICAgZGF0YTogQXJyYXk8YW55PjtcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBuYW1lTG9jYXRpb24/OiBzdHJpbmc7XHJcbiAgICBuYW1lVGV4dFN0eWxlOiBuYW1lVGV4dFN0eWxlXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBlbXBoYXNpcyB7XHJcbiAgICBzaGFkb3dCbHVyOiBudW1iZXIgPSAxMDtcclxuICAgIHNoYWRvd09mZnNldFg6IG51bWJlciA9IDA7XHJcbiAgICBzaGFkb3dDb2xvcjogc3RyaW5nID0gXCJyZ2JhKDAsIDAsIDAsIDAuNSlcIlxyXG59XHJcblxyXG5leHBvcnQgY2xhc3Mgc2VyaWVzRGF0YUEge1xyXG4gICAgdmFsdWU/OiBudW1iZXI7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgbGFiZWw/OiBsYWJlbDtcclxuICAgIGJhcldpZHRoPzogbnVtYmVyO1xyXG4gICAgdHlwZT86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIG5vcm1hbCB7XHJcbiAgICBwb3NpdGlvbj86IHN0cmluZztcclxuICAgIHNob3c/OiBib29sZWFuO1xyXG4gICAgZm9ybWF0dGVyPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgYmFyQm9yZGVyUmFkaXVzPzogQXJyYXk8bnVtYmVyPjtcclxuICAgIHNoYWRvd0NvbG9yPzogc3RyaW5nO1xyXG4gICAgc2hhZG93T2Zmc2V0WT86IG51bWJlcjtcclxuICAgIHNoYWRvd0JsdXI/OiBudW1iZXI7XHJcbiAgICBjb2xvcj86IGFueTtcclxuICAgIGxlbmd0aD86IG51bWJlcjtcclxuICAgIGxlbmd0aDI/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBpdGVtU3R5bGUge1xyXG4gICAgZW1waGFzaXM/OiBlbXBoYXNpcztcclxuICAgIG5vcm1hbD86IG5vcm1hbDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIGxhYmVsIHtcclxuICAgIG5vcm1hbDogbm9ybWFsO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgbGFiZWxMaW5lIHtcclxuICAgIG5vcm1hbD86IG5vcm1hbDtcclxuICAgIGxlbmd0aDogbnVtYmVyO1xyXG4gICAgbGVuZ3RoMjogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3Mgc2VyaWVzIHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIGNlbnRlcj86IEFycmF5PHN0cmluZz47XHJcbiAgICBkYXRhOiBBcnJheTxhbnk+O1xyXG4gICAgaXRlbVN0eWxlPzogaXRlbVN0eWxlO1xyXG4gICAgc3RhY2s/OiBzdHJpbmc7XHJcbiAgICBsYWJlbD86IGxhYmVsO1xyXG4gICAgYmFyV2lkdGg/OiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICB4QXhpc0luZGV4OiBudW1iZXI7XHJcbiAgICB5QXhpc0luZGV4OiBudW1iZXI7XHJcbiAgICBzZWxlY3RlZE1vZGU/OiBzdHJpbmc7XHJcbiAgICBsYWJlbExpbmU/OiBsYWJlbExpbmU7XHJcbiAgICByYWRpdXM/OiBzdHJpbmcgfCBBcnJheTxzdHJpbmcgfCBudW1iZXI+O1xyXG4gICAgYXJlYVN0eWxlPzogYXJlYVN0eWxlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgT2JqZWN0Tm9ybWFsIHtcclxuICAgIG9wYWNpdHk6IG51bWJlciA9IDAuMztcclxuICAgIGNvbG9yOiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBhcmVhU3R5bGUge1xyXG4gICAgbm9ybWFsPzogT2JqZWN0Tm9ybWFsO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgYXJlYVN0eWxlQ29sb3Ige1xyXG4gICAgY29sb3I6IHN0cmluZyB8IEFycmF5PHN0cmluZz47XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29sb3I6IHN0cmluZyB8IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgLy/muJDlj5hcclxuICAgIHB1YmxpYyBnZXRDb2xvcigpIHtcclxuICAgICAgICBsZXQgdGhhdDogYW55ID0gdGhpcztcclxuICAgICAgICBsZXQgZ3JhZGllbnRDb2xvcjogYW55ID0ge1xyXG4gICAgICAgICAgICBjb2xvcjogbmV3IGxpbmVhckdyYWRpZW50KDAsIDAsIDAsIDEsXHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBvZmZzZXQ6IDAsIGNvbG9yOiBgcmdiYSgke3RoYXQuY29sb3J9LDAuMjUpYCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgb2Zmc2V0OiAwLjUsIGNvbG9yOiBgcmdiYSgke3RoYXQuY29sb3J9LDAuMTMpYCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgb2Zmc2V0OiAxLCBjb2xvcjogYHJnYmEoJHt0aGF0LmNvbG9yfSwwLjAwKWAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gZ3JhZGllbnRDb2xvclxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb2xvckRpZmYoKSB7XHJcbiAgICAgICAgbGV0IHRoYXQ6IGFueSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogYW55ID0ge1xyXG4gICAgICAgICAgICAvL+avj+S4quafseWtkOeahOminOiJsuWNs+S4umNvbG9yTGlzdOaVsOe7hOmHjOeahOavj+S4gOmhue+8jOWmguaenOafseWtkOaVsOebruWkmuS6jmNvbG9yTGlzdOeahOmVv+W6pu+8jOWImeafseWtkOminOiJsuW+queOr+S9v+eUqOivpeaVsOe7hFxyXG4gICAgICAgICAgICBjb2xvcjogZnVuY3Rpb24gKHBhcmFtczogYW55KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29sb3JMaXN0ID0gdGhhdC5jb2xvcjtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb2xvckxpc3RbcGFyYW1zLmRhdGFJbmRleF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiByZXN1bHRcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBkYXRhWm9vbSB7XHJcbiAgICBzaG93OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBzdGFydDogbnVtYmVyID0gMDtcclxuICAgIGVuZDogbnVtYmVyID0gMTAwO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRUNoYXJ0T3B0aW9uIHtcclxuICAgIHRpdGxlPzogdGl0bGU7XHJcbiAgICBsZWdlbmQ6IGxlZ2VuZCA9IG5ldyBsZWdlbmQoKTtcclxuICAgIGdyaWQ/OiBncmlkO1xyXG4gICAgeEF4aXM/OiB4QXhpcyB8IEFycmF5PHhBeGlzPjtcclxuICAgIHlBeGlzPzogeUF4aXMgfCBBcnJheTx5QXhpcz47XHJcbiAgICBwb2xhcj86IE9iamVjdDtcclxuICAgIHJhZGl1c0F4aXM/OiBPYmplY3Q7XHJcbiAgICBhbmdsZUF4aXM/OiBPYmplY3Q7XHJcbiAgICByYWRhcj86IE9iamVjdDtcclxuICAgIGRhdGFab29tPzogQXJyYXk8T2JqZWN0PjtcclxuICAgIHZpc3VhbE1hcD86IEFycmF5PE9iamVjdD47XHJcbiAgICB0b29sdGlwPzogdG9vbHRpcCA9IG5ldyB0b29sdGlwKCk7XHJcbiAgICB0b29sYm94PzogT2JqZWN0O1xyXG4gICAgZ2VvPzogT2JqZWN0O1xyXG4gICAgcGFyYWxsZWw/OiBPYmplY3Q7XHJcbiAgICBwYXJhbGxlbEF4aXM/OiBPYmplY3Q7XHJcbiAgICB0aW1lbGluZT86IE9iamVjdDtcclxuICAgIHNlcmllcz86IEFycmF5PE9iamVjdD47XHJcbiAgICBjb2xvcj86IEFycmF5PE9iamVjdD4gfCBBcnJheTxzdHJpbmc+O1xyXG4gICAgYmFja2dyb3VuZENvbG9yPzogc3RyaW5nO1xyXG4gICAgdGV4dFN0eWxlPzogT2JqZWN0O1xyXG4gICAgYW5pbWF0aW9uPzogYm9vbGVhbjtcclxuICAgIGFuaW1hdGlvbkR1cmF0aW9uPzogbnVtYmVyO1xyXG4gICAgYW5pbWF0aW9uRWFzaW5nPzogc3RyaW5nO1xyXG4gICAgYW5pbWF0aW9uRHVyYXRpb25VcGRhdGU/OiBudW1iZXI7XHJcbiAgICBhbmltYXRpb25FYXNpbmdVcGRhdGU/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBzZXRFbmxhcmdlRGF0YSB7XHJcbiAgICB0aXRsZT86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBwYXRoPzogc3RyaW5nO1xyXG4gICAgY29uZmlnOiBFQ2hhcnRPcHRpb247XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyB0aXRsZSB7XHJcbiAgICB0ZXh0Pzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgc3VidGV4dD86IHN0cmluZztcclxuICAgIHRvcD86IHN0cmluZztcclxuICAgIGxlZnQ/OiBzdHJpbmc7XHJcbiAgICByaWdodD86IHN0cmluZztcclxuICAgIGJvdHRvbT86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlc291cmNlU3RhdGlzdGljYWxOYW1lIHtcclxuICAgIHN0YXRpYyBSZXNvdXJjZVN0YXRpc3RpY2FsVG90YWwgPSBcIlJlc291cmNlU3RhdGlzdGljYWxUb3RhbFwiO1xyXG4gICAgc3RhdGljIEFyZWFUb3RhbENvbGxlY3Rpb24gPSBcIkFyZWFUb3RhbENvbGxlY3Rpb25cIjtcclxuICAgIHN0YXRpYyBBbGFybVN0YXRpc3RpY3MgPSBcIkFsYXJtU3RhdGlzdGljc1wiO1xyXG4gICAgc3RhdGljIERhdGFTZXJ2aWNlU3RhdGlzdGljcyA9IFwiRGF0YVNlcnZpY2VTdGF0aXN0aWNzXCI7XHJcbiAgICBzdGF0aWMgUmVzb3VyY2ViUmV0cmlldmFsVHJlbmQgPSBcIlJlc291cmNlYlJldHJpZXZhbFRyZW5kXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBjYXJTdGF0aXN0aWNzTmFtZSB7XHJcbiAgICBzdGF0aWMgY2FyU3RhdGlzdGljcyA9IFwiY2FyU3RhdGlzdGljc1wiO1xyXG4gICAgc3RhdGljIGFyZWFDYXJTdGF0aXN0aWNzID0gXCJhcmVhQ2FyU3RhdGlzdGljc1wiO1xyXG4gICAgc3RhdGljIGFyZWFDYXJBbGFybVN0YXRpc3RpY3MgPSBcImFyZWFDYXJBbGFybVN0YXRpc3RpY3NcIjtcclxuICAgIHN0YXRpYyBjYXJUeXBlU3RhdGlzdGljcyA9IFwiY2FyVHlwZVN0YXRpc3RpY3NcIjtcclxuICAgIHN0YXRpYyBjYXJDb2xvclN0YXRpc3RpY3MgPSBcImNhckNvbG9yU3RhdGlzdGljc1wiO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgcGVyc29uU3RhdGlzdGljc05hbWUge1xyXG4gICAgc3RhdGljIFBlcnNvblN0YXRpc3RpY3MgPSBcIlBlcnNvblN0YXRpc3RpY3NcIjtcclxuICAgIHN0YXRpYyBBcmVhUGVyc29uU3RhdGlzdGljcyA9IFwiQXJlYVBlcnNvblN0YXRpc3RpY3NcIjtcclxuICAgIHN0YXRpYyBBcmVhUGVyc29uQWxhcm1TdGF0aXN0aWNzID0gXCJBcmVhUGVyc29uQWxhcm1TdGF0aXN0aWNzXCI7XHJcbiAgICBzdGF0aWMgUGVyc29uVHlwZVN0YXRpc3RpY3MgPSBcIlBlcnNvblR5cGVTdGF0aXN0aWNzXCI7XHJcbiAgICBzdGF0aWMgUGVyc29uQ29sb3JTdGF0aXN0aWNzID0gXCJQZXJzb25Db2xvclN0YXRpc3RpY3NcIjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdpRmlTdGF0aXN0aWNzTmFtZSB7XHJcbiAgICBzdGF0aWMgV2lmaVN0YXRpc3RpY3MgPSBcIldpZmlTdGF0aXN0aWNzXCI7XHJcbiAgICBzdGF0aWMgQXJlYVdpZmlTdGF0aXN0aWNzID0gXCJBcmVhV2lmaVN0YXRpc3RpY3NcIjtcclxuICAgIHN0YXRpYyBBcmVhV2lmaUFsYXJtU3RhdGlzdGljcyA9IFwiQXJlYVdpZmlBbGFybVN0YXRpc3RpY3NcIjtcclxuICAgIHN0YXRpYyBXaWZpVHlwZVN0YXRpc3RpY3MgPSBcIldpZmlUeXBlU3RhdGlzdGljc1wiO1xyXG4gICAgc3RhdGljIFdpZmlDb2xvclN0YXRpc3RpY3MgPSBcIldpZmlDb2xvclN0YXRpc3RpY3NcIjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEVGRU5DRVN0YXRpc3RpY3NOYW1lIHtcclxuICAgIHN0YXRpYyBFRlN0YXRpc3RpY3MgPSBcIkVGU3RhdGlzdGljc1wiO1xyXG4gICAgc3RhdGljIEFyZWFFRlN0YXRpc3RpY3MgPSBcIkFyZWFFRlN0YXRpc3RpY3NcIjtcclxuICAgIHN0YXRpYyBBcmVhRUZBbGFybVN0YXRpc3RpY3MgPSBcIkFyZWFFRkFsYXJtU3RhdGlzdGljc1wiO1xyXG4gICAgc3RhdGljIEVGVHlwZVN0YXRpc3RpY3MgPSBcIkVGVHlwZVN0YXRpc3RpY3NcIjtcclxuICAgIHN0YXRpYyBFRkNvbG9yU3RhdGlzdGljcyA9IFwiRUZDb2xvclN0YXRpc3RpY3NcIjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIG90aGVyU3RhdGlzdGljc05hbWUge1xyXG4gICAgc3RhdGljIFdpZmlBbGxSYW5rTGlzdCA9IFwiV2lmaUFsbFJhbmtMaXN0XCI7XHJcbiAgICBzdGF0aWMgRUZDb2xvclN0YXRpc3RpY3MgPSBcIkVGQ29sb3JTdGF0aXN0aWNzXCI7XHJcbn1cclxuZXhwb3J0IGNvbnN0IGNvbG9yRW51bUFycjogQXJyYXk8YW55PiA9IFtcclxuICAgIHsgbmFtZTogXCLpu5HoibJcIiwgdmFsdWU6IFwiIzMzMzMzM1wiIH0sXHJcbiAgICB7IG5hbWU6IFwi55m96ImyXCIsIHZhbHVlOiBcIiNGMEYwRjBcIiB9LFxyXG4gICAgeyBuYW1lOiBcIuiTneiJslwiLCB2YWx1ZTogXCIjNUE5RUZGXCIgfSxcclxuICAgIHsgbmFtZTogXCLpu4ToibJcIiwgdmFsdWU6IFwiI0ZGQjQwMVwiIH0sXHJcbiAgICB7IG5hbWU6IFwi57u/6ImyXCIsIHZhbHVlOiBcIiMyRkNCNzZcIiB9XHJcbl1cclxuXHJcbiJdfQ==
