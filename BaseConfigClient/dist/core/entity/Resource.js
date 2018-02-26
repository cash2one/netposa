define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ResourcePageEnum = (function () {
        function ResourcePageEnum() {
        }
        return ResourcePageEnum;
    }());
    exports.ResourcePageEnum = ResourcePageEnum;
    var num = (function () {
        function num() {
            this.totalCountNum = 0;
        }
        return num;
    }());
    exports.num = num;
    exports.numTypeEnum = {
        todayFlow: 0,
        totalFlow: 0,
        totalCountNum: 0
    };
    var ALLChartName = (function () {
        function ALLChartName() {
        }
        return ALLChartName;
    }());
    exports.ALLChartName = ALLChartName;
    var VehicleChartName = (function () {
        function VehicleChartName() {
        }
        return VehicleChartName;
    }());
    exports.VehicleChartName = VehicleChartName;
    var FaceChartName = (function () {
        function FaceChartName() {
        }
        return FaceChartName;
    }());
    exports.FaceChartName = FaceChartName;
    var WiFiChartName = (function () {
        function WiFiChartName() {
        }
        return WiFiChartName;
    }());
    exports.WiFiChartName = WiFiChartName;
    var EFENCEChartName = (function () {
        function EFENCEChartName() {
        }
        return EFENCEChartName;
    }());
    exports.EFENCEChartName = EFENCEChartName;
    var ResourcePageTypeEnum = (function () {
        function ResourcePageTypeEnum() {
        }
        return ResourcePageTypeEnum;
    }());
    exports.ResourcePageTypeEnum = ResourcePageTypeEnum;
    exports.ResourcePageType = {
        ALL: { value: "ALL", name: "全部", number: exports.numTypeEnum },
        Vehicle: { value: "Vehicle", name: "卡口车辆", number: exports.numTypeEnum },
        Face: { value: "Face", name: "人像抓拍", number: exports.numTypeEnum },
        WiFi: { value: "WiFi", name: "Wi-Fi热点", number: exports.numTypeEnum },
        EFENCE: { value: "EFENCE", name: "电子围栏", number: exports.numTypeEnum }
    };
    exports.ResourcePageTypeEx = {
        Device: { value: "Device", name: "设备", number: exports.numTypeEnum },
        Position: { value: "Position", name: "位置", number: exports.numTypeEnum }
    };
    var deviceNameEnum = (function () {
        function deviceNameEnum() {
        }
        return deviceNameEnum;
    }());
    exports.deviceNameEnum = deviceNameEnum;
    exports.deviceName = {
        person: "人像",
        EFENCE: "电围",
        Vehicle: "车辆",
        WiFi: "Wi-Fi"
    };
    var ISwitchButton = (function () {
        function ISwitchButton() {
        }
        return ISwitchButton;
    }());
    exports.ISwitchButton = ISwitchButton;
    exports.switchButton = {
        ALLStatistics: true,
        VehicleStatistics: false,
        FaceStatistics: false,
        ALLRight: true,
        VehicleRight: false,
        FaceRight: false,
        switch: false,
        switchChart: Object.keys(exports.ResourcePageType),
        defaultChart: ''
    };
    exports.ResourceNameArr = {
        ResourceStatisticalTotal: "资源统计总量",
        AreaTotalCollection: "区域分类采集总量(TOP5)",
        AlarmStatistics: "资源类型报警统计趋势",
        DataServiceStatistics: "数据服务统计",
        ResourcebRetrievalTrend: "资源检索趋势统计",
        AllRankList: "高频检索关键字(TOP5)",
        carStatistics: "车辆统计总量",
        areaCarStatistics: "区域车辆统计总量(TOP5)",
        areaCarAlarmStatistics: "区域车辆报警统计趋势",
        carTypeStatistics: "车牌颜色统计",
        carColorStatistics: "车辆类型统计",
        CarRankList: "高频检索车辆关键字(TOP5)",
        PersonStatistics: "人员统计总量",
        AreaPersonStatistics: "区域人员统计总量(TOP5)",
        AreaPersonAlarmStatistics: "区域人员报警统计趋势",
        PersonTypeStatistics: "人员检索服务统计",
        PersonColorStatistics: "人员分析服务统计",
        PersonRankList: "高频检索人像关键字(TOP5)",
        WifiStatistics: "Wi-Fi统计总量",
        AreaWifiStatistics: "区域Wi-Fi统计总量(TOP5)",
        AreaWifiAlarmStatistics: "区域Wi-Fi报警统计趋势",
        WifiTypeStatistics: "Wi-Fi检索服务统计",
        WifiColorStatistics: "Wi-Fi设备报警统计",
        WifiRankList: "高频检索Wi-Fi关键字(TOP5)",
        EFStatistics: "电围统计总量",
        AreaEFStatistics: "区域电围统计总量(TOP5)",
        AreaEFAlarmStatistics: "区域电围报警统计趋势",
        EFTypeStatistics: "电围检索服务统计",
        EFColorStatistics: "电围设备报警统计",
        EFRankList: "高频检索电围关键字(TOP5)",
        NOData: "暂无数据"
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL2VudGl0eS9SZXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQTtRQUFBO1FBSUEsQ0FBQztRQUFELHVCQUFDO0lBQUQsQ0FKQSxBQUlDLElBQUE7SUFKWSw0Q0FBZ0I7SUFNN0I7UUFBQTtZQUdJLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFBRCxVQUFDO0lBQUQsQ0FKQSxBQUlDLElBQUE7SUFKWSxrQkFBRztJQU1ILFFBQUEsV0FBVyxHQUFHO1FBQ3ZCLFNBQVMsRUFBRSxDQUFDO1FBQ1osU0FBUyxFQUFFLENBQUM7UUFDWixhQUFhLEVBQUUsQ0FBQztLQUNuQixDQUFDO0lBR0Y7UUFBQTtRQU9BLENBQUM7UUFBRCxtQkFBQztJQUFELENBUEEsQUFPQyxJQUFBO0lBUFksb0NBQVk7SUFVekI7UUFBQTtRQU9BLENBQUM7UUFBRCx1QkFBQztJQUFELENBUEEsQUFPQyxJQUFBO0lBUFksNENBQWdCO0lBVTdCO1FBQUE7UUFRQSxDQUFDO1FBQUQsb0JBQUM7SUFBRCxDQVJBLEFBUUMsSUFBQTtJQVJZLHNDQUFhO0lBVzFCO1FBQUE7UUFPQSxDQUFDO1FBQUQsb0JBQUM7SUFBRCxDQVBBLEFBT0MsSUFBQTtJQVBZLHNDQUFhO0lBVTFCO1FBQUE7UUFPQSxDQUFDO1FBQUQsc0JBQUM7SUFBRCxDQVBBLEFBT0MsSUFBQTtJQVBZLDBDQUFlO0lBUzVCO1FBQUE7UUFNQSxDQUFDO1FBQUQsMkJBQUM7SUFBRCxDQU5BLEFBTUMsSUFBQTtJQU5ZLG9EQUFvQjtJQVNwQixRQUFBLGdCQUFnQixHQUF5QjtRQUNsRCxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLG1CQUFXLEVBQUU7UUFDdEQsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxtQkFBVyxFQUFFO1FBQ2hFLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsbUJBQVcsRUFBRTtRQUMxRCxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLG1CQUFXLEVBQUU7UUFDN0QsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxtQkFBVyxFQUFFO0tBQ2pFLENBQUM7SUFFVyxRQUFBLGtCQUFrQixHQUFHO1FBQzlCLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsbUJBQVcsRUFBRTtRQUM1RCxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLG1CQUFXLEVBQUU7S0FDbkUsQ0FBQTtJQUVEO1FBQUE7UUFLQSxDQUFDO1FBQUQscUJBQUM7SUFBRCxDQUxBLEFBS0MsSUFBQTtJQUxZLHdDQUFjO0lBT2QsUUFBQSxVQUFVLEdBQW1CO1FBQ3RDLE1BQU0sRUFBRSxJQUFJO1FBQ1osTUFBTSxFQUFFLElBQUk7UUFDWixPQUFPLEVBQUUsSUFBSTtRQUNiLElBQUksRUFBRSxPQUFPO0tBQ2hCLENBQUE7SUFFRDtRQUFBO1FBYUEsQ0FBQztRQUFELG9CQUFDO0lBQUQsQ0FiQSxBQWFDLElBQUE7SUFiWSxzQ0FBYTtJQWViLFFBQUEsWUFBWSxHQUFrQjtRQUN2QyxhQUFhLEVBQUUsSUFBSTtRQUNuQixpQkFBaUIsRUFBRSxLQUFLO1FBQ3hCLGNBQWMsRUFBRSxLQUFLO1FBRXJCLFFBQVEsRUFBRSxJQUFJO1FBQ2QsWUFBWSxFQUFFLEtBQUs7UUFDbkIsU0FBUyxFQUFFLEtBQUs7UUFFaEIsTUFBTSxFQUFFLEtBQUs7UUFDYixXQUFXLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBZ0IsQ0FBQztRQUMxQyxZQUFZLEVBQUUsRUFBRTtLQUNuQixDQUFDO0lBRVcsUUFBQSxlQUFlLEdBQThCO1FBQ3RELHdCQUF3QixFQUFFLFFBQVE7UUFDbEMsbUJBQW1CLEVBQUUsZ0JBQWdCO1FBQ3JDLGVBQWUsRUFBRSxZQUFZO1FBQzdCLHFCQUFxQixFQUFFLFFBQVE7UUFDL0IsdUJBQXVCLEVBQUUsVUFBVTtRQUNuQyxXQUFXLEVBQUUsZUFBZTtRQUU1QixhQUFhLEVBQUUsUUFBUTtRQUN2QixpQkFBaUIsRUFBRSxnQkFBZ0I7UUFDbkMsc0JBQXNCLEVBQUUsWUFBWTtRQUNwQyxpQkFBaUIsRUFBRSxRQUFRO1FBQzNCLGtCQUFrQixFQUFFLFFBQVE7UUFDNUIsV0FBVyxFQUFFLGlCQUFpQjtRQUU5QixnQkFBZ0IsRUFBRSxRQUFRO1FBQzFCLG9CQUFvQixFQUFFLGdCQUFnQjtRQUN0Qyx5QkFBeUIsRUFBRSxZQUFZO1FBQ3ZDLG9CQUFvQixFQUFFLFVBQVU7UUFDaEMscUJBQXFCLEVBQUUsVUFBVTtRQUNqQyxjQUFjLEVBQUUsaUJBQWlCO1FBRWpDLGNBQWMsRUFBRSxXQUFXO1FBQzNCLGtCQUFrQixFQUFFLG1CQUFtQjtRQUN2Qyx1QkFBdUIsRUFBRSxlQUFlO1FBQ3hDLGtCQUFrQixFQUFFLGFBQWE7UUFDakMsbUJBQW1CLEVBQUUsYUFBYTtRQUNsQyxZQUFZLEVBQUUsb0JBQW9CO1FBRWxDLFlBQVksRUFBRSxRQUFRO1FBQ3RCLGdCQUFnQixFQUFFLGdCQUFnQjtRQUNsQyxxQkFBcUIsRUFBRSxZQUFZO1FBQ25DLGdCQUFnQixFQUFFLFVBQVU7UUFDNUIsaUJBQWlCLEVBQUUsVUFBVTtRQUM3QixVQUFVLEVBQUUsaUJBQWlCO1FBRTdCLE1BQU0sRUFBRSxNQUFNO0tBQ2pCLENBQUEiLCJmaWxlIjoiY29yZS9lbnRpdHkvUmVzb3VyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgUmVzb3VyY2VQYWdlRW51bSB7XHJcbiAgICB2YWx1ZTogc3RyaW5nO1xyXG4gICAgbnVtYmVyOiBudW07XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBudW0ge1xyXG4gICAgdG9kYXlGbG93OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICB0b3RhbEZsb3c6IHN0cmluZyB8IG51bWJlcjtcclxuICAgIHRvdGFsQ291bnROdW06IG51bWJlciA9IDA7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBudW1UeXBlRW51bSA9IHtcclxuICAgIHRvZGF5RmxvdzogMCxcclxuICAgIHRvdGFsRmxvdzogMCxcclxuICAgIHRvdGFsQ291bnROdW06IDBcclxufTtcclxuXHJcbi8v5YWo6YOoXHJcbmV4cG9ydCBjbGFzcyBBTExDaGFydE5hbWUge1xyXG4gICAgUmVzb3VyY2VTdGF0aXN0aWNhbFRvdGFsOiBcIlJlc291cmNlU3RhdGlzdGljYWxUb3RhbFwiO1xyXG4gICAgQXJlYVRvdGFsQ29sbGVjdGlvbjogXCJBcmVhVG90YWxDb2xsZWN0aW9uXCI7XHJcbiAgICBBbGFybVN0YXRpc3RpY3M6IFwiQWxhcm1TdGF0aXN0aWNzXCI7XHJcbiAgICBEYXRhU2VydmljZVN0YXRpc3RpY3M6IFwiRGF0YVNlcnZpY2VTdGF0aXN0aWNzXCI7XHJcbiAgICBSZXNvdXJjZWJSZXRyaWV2YWxUcmVuZDogXCJSZXNvdXJjZWJSZXRyaWV2YWxUcmVuZFwiO1xyXG4gICAgQWxsUmFua0xpc3Q6IFwiQWxsUmFua0xpc3RcIjtcclxufVxyXG5cclxuLy8g6L2m6L6GXHJcbmV4cG9ydCBjbGFzcyBWZWhpY2xlQ2hhcnROYW1lIHtcclxuICAgIGNhclN0YXRpc3RpY3M6IFwiY2FyU3RhdGlzdGljc1wiO1xyXG4gICAgYXJlYUNhclN0YXRpc3RpY3M6IFwiYXJlYUNhclN0YXRpc3RpY3NcIjtcclxuICAgIGFyZWFDYXJBbGFybVN0YXRpc3RpY3M6IFwiYXJlYUNhckFsYXJtU3RhdGlzdGljc1wiO1xyXG4gICAgY2FyVHlwZVN0YXRpc3RpY3M6IFwiY2FyVHlwZVN0YXRpc3RpY3NcIjtcclxuICAgIGNhckNvbG9yU3RhdGlzdGljczogXCJjYXJDb2xvclN0YXRpc3RpY3NcIjtcclxuICAgIEFsbFJhbmtMaXN0OiBcIkFsbFJhbmtMaXN0XCI7XHJcbn1cclxuXHJcbi8vIOS6uuWDj1xyXG5leHBvcnQgY2xhc3MgRmFjZUNoYXJ0TmFtZSB7XHJcbiAgICBQZXJzb25TdGF0aXN0aWNzOiBcIlBlcnNvblN0YXRpc3RpY3NcIjtcclxuICAgIEFyZWFQZXJzb25TdGF0aXN0aWNzOiBcIkFyZWFQZXJzb25TdGF0aXN0aWNzXCI7XHJcbiAgICBBcmVhUGVyc29uQWxhcm1TdGF0aXN0aWNzOiBcIkFyZWFQZXJzb25BbGFybVN0YXRpc3RpY3NcIjtcclxuICAgIFBlcnNvblR5cGVTdGF0aXN0aWNzOiBcIlBlcnNvblR5cGVTdGF0aXN0aWNzXCI7XHJcbiAgICBQZXJzb25Db2xvclN0YXRpc3RpY3M6IFwiUGVyc29uQ29sb3JTdGF0aXN0aWNzXCI7XHJcbiAgICBBbGxSYW5rTGlzdDogXCJBbGxSYW5rTGlzdFwiO1xyXG4gICAgcmVzb3VyY2VQYXJzZTogXCJyZXNvdXJjZVBhcnNlXCI7XHJcbn1cclxuXHJcbi8vIHdpZmlcclxuZXhwb3J0IGNsYXNzIFdpRmlDaGFydE5hbWUge1xyXG4gICAgV2lmaVN0YXRpc3RpY3M6IFwiV2lmaVN0YXRpc3RpY3NcIjtcclxuICAgIEFyZWFXaWZpU3RhdGlzdGljczogXCJBcmVhV2lmaVN0YXRpc3RpY3NcIjtcclxuICAgIEFyZWFXaWZpQWxhcm1TdGF0aXN0aWNzOiBcIkFyZWFXaWZpQWxhcm1TdGF0aXN0aWNzXCI7XHJcbiAgICBXaWZpVHlwZVN0YXRpc3RpY3M6IFwiV2lmaVR5cGVTdGF0aXN0aWNzXCI7XHJcbiAgICBXaWZpQ29sb3JTdGF0aXN0aWNzOiBcIldpZmlDb2xvclN0YXRpc3RpY3NcIjtcclxuICAgIFdpZmlBbGxSYW5rTGlzdDogXCJXaWZpQWxsUmFua0xpc3RcIjtcclxufVxyXG5cclxuLy8g55S15Zu0XHJcbmV4cG9ydCBjbGFzcyBFRkVOQ0VDaGFydE5hbWUge1xyXG4gICAgRUZTdGF0aXN0aWNzOiBcIkVGU3RhdGlzdGljc1wiO1xyXG4gICAgQXJlYUVGU3RhdGlzdGljczogXCJBcmVhRUZTdGF0aXN0aWNzXCI7XHJcbiAgICBBcmVhRUZBbGFybVN0YXRpc3RpY3M6IFwiQXJlYUVGQWxhcm1TdGF0aXN0aWNzXCI7XHJcbiAgICBFRlR5cGVTdGF0aXN0aWNzOiBcIkVGVHlwZVN0YXRpc3RpY3NcIjtcclxuICAgIEVGQ29sb3JTdGF0aXN0aWNzOiBcIkVGQ29sb3JTdGF0aXN0aWNzXCI7XHJcbiAgICBFRkFsbFJhbmtMaXN0OiBcIkVGQWxsUmFua0xpc3RcIjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlc291cmNlUGFnZVR5cGVFbnVtIHtcclxuICAgIEFMTDogUmVzb3VyY2VQYWdlRW51bTtcclxuICAgIFZlaGljbGU6IFJlc291cmNlUGFnZUVudW07XHJcbiAgICBGYWNlOiBSZXNvdXJjZVBhZ2VFbnVtO1xyXG4gICAgV2lGaTogUmVzb3VyY2VQYWdlRW51bTtcclxuICAgIEVGRU5DRTogUmVzb3VyY2VQYWdlRW51bTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBSZXNvdXJjZVBhZ2VUeXBlOiBSZXNvdXJjZVBhZ2VUeXBlRW51bSA9IHtcclxuICAgIEFMTDogeyB2YWx1ZTogXCJBTExcIiwgbmFtZTogXCLlhajpg6hcIiwgbnVtYmVyOiBudW1UeXBlRW51bSB9LFxyXG4gICAgVmVoaWNsZTogeyB2YWx1ZTogXCJWZWhpY2xlXCIsIG5hbWU6IFwi5Y2h5Y+j6L2m6L6GXCIsIG51bWJlcjogbnVtVHlwZUVudW0gfSxcclxuICAgIEZhY2U6IHsgdmFsdWU6IFwiRmFjZVwiLCBuYW1lOiBcIuS6uuWDj+aKk+aLjVwiLCBudW1iZXI6IG51bVR5cGVFbnVtIH0sXHJcbiAgICBXaUZpOiB7IHZhbHVlOiBcIldpRmlcIiwgbmFtZTogXCJXaS1GaeeDreeCuVwiLCBudW1iZXI6IG51bVR5cGVFbnVtIH0sXHJcbiAgICBFRkVOQ0U6IHsgdmFsdWU6IFwiRUZFTkNFXCIsIG5hbWU6IFwi55S15a2Q5Zu05qCPXCIsIG51bWJlcjogbnVtVHlwZUVudW0gfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IFJlc291cmNlUGFnZVR5cGVFeCA9IHtcclxuICAgIERldmljZTogeyB2YWx1ZTogXCJEZXZpY2VcIiwgbmFtZTogXCLorr7lpIdcIiwgbnVtYmVyOiBudW1UeXBlRW51bSB9LFxyXG4gICAgUG9zaXRpb246IHsgdmFsdWU6IFwiUG9zaXRpb25cIiwgbmFtZTogXCLkvY3nva5cIiwgbnVtYmVyOiBudW1UeXBlRW51bSB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBkZXZpY2VOYW1lRW51bSB7XHJcbiAgICBwZXJzb246IHN0cmluZztcclxuICAgIEVGRU5DRTogc3RyaW5nO1xyXG4gICAgVmVoaWNsZTogc3RyaW5nO1xyXG4gICAgV2lGaTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZGV2aWNlTmFtZTogZGV2aWNlTmFtZUVudW0gPSB7XHJcbiAgICBwZXJzb246IFwi5Lq65YOPXCIsXHJcbiAgICBFRkVOQ0U6IFwi55S15Zu0XCIsXHJcbiAgICBWZWhpY2xlOiBcIui9pui+hlwiLFxyXG4gICAgV2lGaTogXCJXaS1GaVwiXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJU3dpdGNoQnV0dG9uIHtcclxuICAgIC8v5o6n5Yi25YWo6YOo44CB5Y2h5Y+j44CB5Lq65YOP44CB54Ot54K544CB55S15Zu055qE5YiH5o2iXHJcbiAgICBWZWhpY2xlU3RhdGlzdGljczogYm9vbGVhbjtcclxuICAgIEZhY2VTdGF0aXN0aWNzOiBib29sZWFuO1xyXG4gICAgQUxMU3RhdGlzdGljczogYm9vbGVhbjtcclxuICAgIC8vIOaOp+WItuWFqOmDqOOAgeWNoeWPo+etieeahOWPs+i+ueWIh+aNouS4uue7n+iuoVxyXG4gICAgVmVoaWNsZVJpZ2h0OiBib29sZWFuO1xyXG4gICAgRmFjZVJpZ2h0OiBib29sZWFuO1xyXG4gICAgQUxMUmlnaHQ6IGJvb2xlYW47XHJcbiAgICAvLyDmjqfliLbliIfmjaLlm77ooajnm7jlhbNcclxuICAgIHN3aXRjaDogYm9vbGVhbjtcclxuICAgIHN3aXRjaENoYXJ0OiBzdHJpbmdbXTtcclxuICAgIGRlZmF1bHRDaGFydDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc3dpdGNoQnV0dG9uOiBJU3dpdGNoQnV0dG9uID0ge1xyXG4gICAgQUxMU3RhdGlzdGljczogdHJ1ZSxcclxuICAgIFZlaGljbGVTdGF0aXN0aWNzOiBmYWxzZSxcclxuICAgIEZhY2VTdGF0aXN0aWNzOiBmYWxzZSxcclxuXHJcbiAgICBBTExSaWdodDogdHJ1ZSxcclxuICAgIFZlaGljbGVSaWdodDogZmFsc2UsXHJcbiAgICBGYWNlUmlnaHQ6IGZhbHNlLFxyXG5cclxuICAgIHN3aXRjaDogZmFsc2UsXHJcbiAgICBzd2l0Y2hDaGFydDogT2JqZWN0LmtleXMoUmVzb3VyY2VQYWdlVHlwZSksXHJcbiAgICBkZWZhdWx0Q2hhcnQ6ICcnXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgUmVzb3VyY2VOYW1lQXJyOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge1xyXG4gICAgUmVzb3VyY2VTdGF0aXN0aWNhbFRvdGFsOiBcIui1hOa6kOe7n+iuoeaAu+mHj1wiLFxyXG4gICAgQXJlYVRvdGFsQ29sbGVjdGlvbjogXCLljLrln5/liIbnsbvph4fpm4bmgLvph48oVE9QNSlcIixcclxuICAgIEFsYXJtU3RhdGlzdGljczogXCLotYTmupDnsbvlnovmiqXorabnu5/orqHotovlir9cIixcclxuICAgIERhdGFTZXJ2aWNlU3RhdGlzdGljczogXCLmlbDmja7mnI3liqHnu5/orqFcIixcclxuICAgIFJlc291cmNlYlJldHJpZXZhbFRyZW5kOiBcIui1hOa6kOajgOe0oui2i+WKv+e7n+iuoVwiLFxyXG4gICAgQWxsUmFua0xpc3Q6IFwi6auY6aKR5qOA57Si5YWz6ZSu5a2XKFRPUDUpXCIsXHJcblxyXG4gICAgY2FyU3RhdGlzdGljczogXCLovabovobnu5/orqHmgLvph49cIixcclxuICAgIGFyZWFDYXJTdGF0aXN0aWNzOiBcIuWMuuWfn+i9pui+hue7n+iuoeaAu+mHjyhUT1A1KVwiLFxyXG4gICAgYXJlYUNhckFsYXJtU3RhdGlzdGljczogXCLljLrln5/ovabovobmiqXorabnu5/orqHotovlir9cIixcclxuICAgIGNhclR5cGVTdGF0aXN0aWNzOiBcIui9pueJjOminOiJsue7n+iuoVwiLFxyXG4gICAgY2FyQ29sb3JTdGF0aXN0aWNzOiBcIui9pui+huexu+Wei+e7n+iuoVwiLFxyXG4gICAgQ2FyUmFua0xpc3Q6IFwi6auY6aKR5qOA57Si6L2m6L6G5YWz6ZSu5a2XKFRPUDUpXCIsXHJcblxyXG4gICAgUGVyc29uU3RhdGlzdGljczogXCLkurrlkZjnu5/orqHmgLvph49cIixcclxuICAgIEFyZWFQZXJzb25TdGF0aXN0aWNzOiBcIuWMuuWfn+S6uuWRmOe7n+iuoeaAu+mHjyhUT1A1KVwiLFxyXG4gICAgQXJlYVBlcnNvbkFsYXJtU3RhdGlzdGljczogXCLljLrln5/kurrlkZjmiqXorabnu5/orqHotovlir9cIixcclxuICAgIFBlcnNvblR5cGVTdGF0aXN0aWNzOiBcIuS6uuWRmOajgOe0ouacjeWKoee7n+iuoVwiLFxyXG4gICAgUGVyc29uQ29sb3JTdGF0aXN0aWNzOiBcIuS6uuWRmOWIhuaekOacjeWKoee7n+iuoVwiLFxyXG4gICAgUGVyc29uUmFua0xpc3Q6IFwi6auY6aKR5qOA57Si5Lq65YOP5YWz6ZSu5a2XKFRPUDUpXCIsXHJcblxyXG4gICAgV2lmaVN0YXRpc3RpY3M6IFwiV2ktRmnnu5/orqHmgLvph49cIixcclxuICAgIEFyZWFXaWZpU3RhdGlzdGljczogXCLljLrln59XaS1Gaee7n+iuoeaAu+mHjyhUT1A1KVwiLFxyXG4gICAgQXJlYVdpZmlBbGFybVN0YXRpc3RpY3M6IFwi5Yy65Z+fV2ktRmnmiqXorabnu5/orqHotovlir9cIixcclxuICAgIFdpZmlUeXBlU3RhdGlzdGljczogXCJXaS1GaeajgOe0ouacjeWKoee7n+iuoVwiLFxyXG4gICAgV2lmaUNvbG9yU3RhdGlzdGljczogXCJXaS1GaeiuvuWkh+aKpeitpue7n+iuoVwiLFxyXG4gICAgV2lmaVJhbmtMaXN0OiBcIumrmOmikeajgOe0oldpLUZp5YWz6ZSu5a2XKFRPUDUpXCIsXHJcblxyXG4gICAgRUZTdGF0aXN0aWNzOiBcIueUteWbtOe7n+iuoeaAu+mHj1wiLFxyXG4gICAgQXJlYUVGU3RhdGlzdGljczogXCLljLrln5/nlLXlm7Tnu5/orqHmgLvph48oVE9QNSlcIixcclxuICAgIEFyZWFFRkFsYXJtU3RhdGlzdGljczogXCLljLrln5/nlLXlm7TmiqXorabnu5/orqHotovlir9cIixcclxuICAgIEVGVHlwZVN0YXRpc3RpY3M6IFwi55S15Zu05qOA57Si5pyN5Yqh57uf6K6hXCIsXHJcbiAgICBFRkNvbG9yU3RhdGlzdGljczogXCLnlLXlm7Torr7lpIfmiqXorabnu5/orqFcIixcclxuICAgIEVGUmFua0xpc3Q6IFwi6auY6aKR5qOA57Si55S15Zu05YWz6ZSu5a2XKFRPUDUpXCIsXHJcblxyXG4gICAgTk9EYXRhOiBcIuaaguaXoOaVsOaNrlwiXHJcbn0iXX0=
