var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IResourceStatisticalTotal = /** @class */ (function () {
        function IResourceStatisticalTotal() {
            this.dateList = [];
            this.series = {};
            this.playData = [];
        }
        return IResourceStatisticalTotal;
    }());
    exports.IResourceStatisticalTotal = IResourceStatisticalTotal;
    var IAreaTotalCollection = /** @class */ (function () {
        function IAreaTotalCollection() {
            this.dateList = [];
            this.playData = [];
            this.legendData = [];
            this.series = new IAreaTotalCollectionSeries();
        }
        return IAreaTotalCollection;
    }());
    exports.IAreaTotalCollection = IAreaTotalCollection;
    var IAreaTotalCollectionSeries = /** @class */ (function () {
        function IAreaTotalCollectionSeries() {
            this.rmpgate = [];
            this.camera = [];
            this.wifi = [];
            this.electronicfence = [];
        }
        return IAreaTotalCollectionSeries;
    }());
    exports.IAreaTotalCollectionSeries = IAreaTotalCollectionSeries;
    var IAlarmStatistics = /** @class */ (function () {
        function IAlarmStatistics() {
            this.dateList = [];
            this.series = new IAreaTotalCollectionSeries();
            this.legendData = [];
            this.playData = [];
        }
        return IAlarmStatistics;
    }());
    exports.IAlarmStatistics = IAlarmStatistics;
    var IDataServiceStatisticsSeries = /** @class */ (function () {
        function IDataServiceStatisticsSeries() {
            this.Search = 0;
            this.PersonAnalyse = 0;
            this.VehicleAnalyse = 0;
            this.MacCollison = 0;
            this.ViewCude = 0;
        }
        IDataServiceStatisticsSeries.instance = function () {
            return {
                Search: 0,
                PersonAnalyse: 0,
                VehicleAnalyse: 0,
                MacCollison: 0,
                ViewCube: 0
            };
        };
        return IDataServiceStatisticsSeries;
    }());
    exports.IDataServiceStatisticsSeries = IDataServiceStatisticsSeries;
    var IDataServiceStatistics = /** @class */ (function () {
        function IDataServiceStatistics() {
            this.dateList = [];
            this.playData = [];
            this.legendData = [];
            this.series = new IDataServiceStatisticsSeries();
        }
        return IDataServiceStatistics;
    }());
    exports.IDataServiceStatistics = IDataServiceStatistics;
    var IResourcebRetrievalTrend = /** @class */ (function () {
        function IResourcebRetrievalTrend() {
            this.series = new IAreaTotalCollectionSeries();
            this.dateList = [];
            this.legendData = [];
            this.playData = [];
        }
        return IResourcebRetrievalTrend;
    }());
    exports.IResourcebRetrievalTrend = IResourcebRetrievalTrend;
    var IAllRankList = /** @class */ (function () {
        function IAllRankList() {
            this.series = [];
            this.playData = [];
            this.dateList = [];
        }
        return IAllRankList;
    }());
    exports.IAllRankList = IAllRankList;
    exports.ResourceType = {
        wifi: { key: 'WiFi', value: 'Wi-Fi' },
        electronicfence: { key: 'EFENCE', value: '电子围栏' },
        rmpgate: { key: 'Vehicle', value: '卡口' },
        camera: { key: 'Face', value: '人脸' }
    };
    exports.ResourceType2 = {
        wifi: { key: 'WiFiSearch', value: 'Wi-Fi' },
        electronicfence: { key: 'EFenceSearch', value: '电子围栏' },
        rmpgate: { key: 'VehicleSearch', value: '卡口' },
        camera: { key: 'FaceSearch', value: '人脸' }
    };
    exports.AnalyseType = {
        Search: { key: 'Search', value: '检索' },
        PersonAnalyse: { key: 'PersonAnalyse', value: '人像分析' },
        VehicleAnalyse: { key: 'VehicleAnalyse', value: '车辆分析' },
        MacCollison: { key: 'MacCollison', value: 'Mac碰撞' },
        ViewCube: { key: 'ViewCube', value: '视图立方' }
    };
    exports.ResourceFaceType = {
        PersonTrack: { key: 'PersonTrack', value: '人员轨迹' },
        FaceAnalyse: { key: 'FaceAnalyse', value: '人脸分析' },
        SimilarityAnalyse: { key: 'SimilarityAnalyse', value: '相似度分析' },
        AccompanyAnalyse: { key: 'AccompanyAnalyse', value: '伴随分析' },
        FaceCollision: { key: 'FaceCollision', value: '人脸碰撞' },
        FrequentInfestation: { key: 'FrequentInfestation', value: '频繁出没' },
        FaceFrequencyAnalyse: { key: 'FaceFrequencyAnalyse', value: '频次分析' },
        PersonAlarm: { key: 'PersonAlarm', value: '人员报警' }
    };
    var IResourceChart = /** @class */ (function () {
        function IResourceChart() {
            this.ResourceStatisticalTotal = new IResourceStatisticalTotal();
            this.AreaTotalCollection = new IAreaTotalCollection();
            this.AlarmStatistics = new IAlarmStatistics();
            this.DataServiceStatistics = new IDataServiceStatistics();
            this.ResourcebRetrievalTrend = new IResourcebRetrievalTrend();
            this.AllRankList = new IAllRankList();
            this.IMapResource = new IMapResource();
        }
        return IResourceChart;
    }());
    exports.IResourceChart = IResourceChart;
    var IMapResource = /** @class */ (function () {
        function IMapResource() {
            this.deviceList = [];
            this.series = [];
            this.dateList = [];
            this.playData = [];
        }
        return IMapResource;
    }());
    exports.IMapResource = IMapResource;
    var CountEnum = /** @class */ (function () {
        function CountEnum() {
            this.todayFlow = 0;
            this.totalFlow = 0;
        }
        return CountEnum;
    }());
    exports.CountEnum = CountEnum;
    var IResourceCount = /** @class */ (function () {
        function IResourceCount() {
            this.WIFI = new CountEnum();
            this.EFENCE = new CountEnum();
            this.Car = new CountEnum();
            this.Face = new CountEnum();
        }
        return IResourceCount;
    }());
    exports.IResourceCount = IResourceCount;
    var IStatistics = /** @class */ (function () {
        function IStatistics() {
            this.dateList = [];
            this.playData = [];
            this.legendData = [];
            this.series = { alarm: [], flow: [] };
        }
        return IStatistics;
    }());
    exports.IStatistics = IStatistics;
    var IAreaOtherAlarmStatistics = /** @class */ (function () {
        function IAreaOtherAlarmStatistics() {
            this.legendData = [];
            this.xData = [];
            this.series = [];
            this.dateList = [];
            this.playData = [];
        }
        return IAreaOtherAlarmStatistics;
    }());
    exports.IAreaOtherAlarmStatistics = IAreaOtherAlarmStatistics;
    var ITypeStatistics = /** @class */ (function () {
        function ITypeStatistics() {
            this.legendData = [];
            this.series = [];
            this.dateList = [];
            this.playData = [];
        }
        return ITypeStatistics;
    }());
    exports.ITypeStatistics = ITypeStatistics;
    var IPersonStatistics = /** @class */ (function (_super) {
        __extends(IPersonStatistics, _super);
        function IPersonStatistics() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return IPersonStatistics;
    }(IStatistics));
    exports.IPersonStatistics = IPersonStatistics;
    var IAreaPersonAlarmStatistics = /** @class */ (function (_super) {
        __extends(IAreaPersonAlarmStatistics, _super);
        function IAreaPersonAlarmStatistics() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return IAreaPersonAlarmStatistics;
    }(IAreaOtherAlarmStatistics));
    exports.IAreaPersonAlarmStatistics = IAreaPersonAlarmStatistics;
    var IPersonTypeStatistics = /** @class */ (function (_super) {
        __extends(IPersonTypeStatistics, _super);
        function IPersonTypeStatistics() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return IPersonTypeStatistics;
    }(ITypeStatistics));
    exports.IPersonTypeStatistics = IPersonTypeStatistics;
    var IWifiStatistics = /** @class */ (function (_super) {
        __extends(IWifiStatistics, _super);
        function IWifiStatistics() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return IWifiStatistics;
    }(IStatistics));
    exports.IWifiStatistics = IWifiStatistics;
    var IAreaWifiAlarmStatistics = /** @class */ (function (_super) {
        __extends(IAreaWifiAlarmStatistics, _super);
        function IAreaWifiAlarmStatistics() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return IAreaWifiAlarmStatistics;
    }(IAreaOtherAlarmStatistics));
    exports.IAreaWifiAlarmStatistics = IAreaWifiAlarmStatistics;
    var IWifiTypeStatistics = /** @class */ (function (_super) {
        __extends(IWifiTypeStatistics, _super);
        function IWifiTypeStatistics() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return IWifiTypeStatistics;
    }(ITypeStatistics));
    exports.IWifiTypeStatistics = IWifiTypeStatistics;
    var IElectronicfenceStatistics = /** @class */ (function (_super) {
        __extends(IElectronicfenceStatistics, _super);
        function IElectronicfenceStatistics() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return IElectronicfenceStatistics;
    }(IStatistics));
    exports.IElectronicfenceStatistics = IElectronicfenceStatistics;
    var IAreaElectronicfenceAlarmStatistics = /** @class */ (function (_super) {
        __extends(IAreaElectronicfenceAlarmStatistics, _super);
        function IAreaElectronicfenceAlarmStatistics() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return IAreaElectronicfenceAlarmStatistics;
    }(IAreaOtherAlarmStatistics));
    exports.IAreaElectronicfenceAlarmStatistics = IAreaElectronicfenceAlarmStatistics;
    var IElectronicfenceTypeStatistics = /** @class */ (function (_super) {
        __extends(IElectronicfenceTypeStatistics, _super);
        function IElectronicfenceTypeStatistics() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return IElectronicfenceTypeStatistics;
    }(ITypeStatistics));
    exports.IElectronicfenceTypeStatistics = IElectronicfenceTypeStatistics;
    var IPersonResourceChart = /** @class */ (function () {
        function IPersonResourceChart() {
            this.PersonStatistics = new IPersonStatistics();
            this.AreaPersonStatistics = new IPersonStatistics();
            this.AreaPersonAlarmStatistics = new IAreaPersonAlarmStatistics();
            this.PersonTypeStatistics = new IPersonTypeStatistics();
            this.PersonColorStatistics = new IPersonTypeStatistics();
            this.PersonAllRankList = new IAllRankList();
            this.IMapResource = new IMapResource();
        }
        return IPersonResourceChart;
    }());
    exports.IPersonResourceChart = IPersonResourceChart;
    var IWifiResourceChart = /** @class */ (function () {
        function IWifiResourceChart() {
            this.WifiStatistics = new IWifiStatistics();
            this.AreaWifiStatistics = new IWifiStatistics();
            this.AreaWifiAlarmStatistics = new IAreaWifiAlarmStatistics();
            this.WifiTypeStatistics = new IWifiTypeStatistics();
            this.WifiColorStatistics = new IWifiTypeStatistics();
            this.WifiAllRankList = new IAllRankList();
            this.IMapResource = new IMapResource();
        }
        return IWifiResourceChart;
    }());
    exports.IWifiResourceChart = IWifiResourceChart;
    var IElectronicfenceResourceChart = /** @class */ (function () {
        function IElectronicfenceResourceChart() {
            this.EFStatistics = new IElectronicfenceStatistics();
            this.AreaEFStatistics = new IElectronicfenceStatistics();
            this.AreaEFAlarmStatistics = new IAreaElectronicfenceAlarmStatistics();
            this.EFTypeStatistics = new IElectronicfenceTypeStatistics();
            this.EFColorStatistics = new IElectronicfenceTypeStatistics();
            this.EFAllRankList = new IAllRankList();
            this.IMapResource = new IMapResource();
        }
        return IElectronicfenceResourceChart;
    }());
    exports.IElectronicfenceResourceChart = IElectronicfenceResourceChart;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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Q25ELENBQUM7UUFBRCxvQ0FBQztJQUFELENBUkEsQUFRQyxJQUFBO0lBUlksc0VBQTZCIiwiZmlsZSI6IlJlc291cmNlQ2hhcnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIElSZXNvdXJjZVN0YXRpc3RpY2FsVG90YWwge1xyXG4gICAgZGF0ZUxpc3Q6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgIHNlcmllczogeyBhbGFybTogbnVtYmVyLCBmbG93OiBudW1iZXIgfSA9IHt9IGFzIHsgYWxhcm06IG51bWJlciwgZmxvdzogbnVtYmVyIH07XHJcbiAgICBwbGF5RGF0YTogQXJyYXk8eyBhbGFybTogbnVtYmVyLCBmbG93OiBudW1iZXIgfT4gPSBbXTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIElBcmVhVG90YWxDb2xsZWN0aW9uIHtcclxuICAgIGRhdGVMaXN0OiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICBwbGF5RGF0YTogQXJyYXk8SUFyZWFUb3RhbENvbGxlY3Rpb25TZXJpZXM+ID0gW107XHJcbiAgICBsZWdlbmREYXRhOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICBzZXJpZXM6IElBcmVhVG90YWxDb2xsZWN0aW9uU2VyaWVzID0gbmV3IElBcmVhVG90YWxDb2xsZWN0aW9uU2VyaWVzKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJQXJlYVRvdGFsQ29sbGVjdGlvblNlcmllcyB7XHJcbiAgICBybXBnYXRlOiBBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICBjYW1lcmE6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgIHdpZmk6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgIGVsZWN0cm9uaWNmZW5jZTogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSUFsYXJtU3RhdGlzdGljcyB7XHJcbiAgICBkYXRlTGlzdDogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgc2VyaWVzOiBJQXJlYVRvdGFsQ29sbGVjdGlvblNlcmllcyA9IG5ldyBJQXJlYVRvdGFsQ29sbGVjdGlvblNlcmllcygpO1xyXG4gICAgbGVnZW5kRGF0YTogQXJyYXk8c3RyaW5nPiA9IFtdXHJcbiAgICBwbGF5RGF0YTogQXJyYXk8SUFyZWFUb3RhbENvbGxlY3Rpb25TZXJpZXM+ID0gW107XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJRGF0YVNlcnZpY2VTdGF0aXN0aWNzU2VyaWVzIHtcclxuICAgIHN0YXRpYyBpbnN0YW5jZSgpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFNlYXJjaDogMCxcclxuICAgICAgICAgICAgUGVyc29uQW5hbHlzZTogMCxcclxuICAgICAgICAgICAgVmVoaWNsZUFuYWx5c2U6IDAsXHJcbiAgICAgICAgICAgIE1hY0NvbGxpc29uOiAwLFxyXG4gICAgICAgICAgICBWaWV3Q3ViZTogMFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFNlYXJjaDogbnVtYmVyID0gMDtcclxuICAgIFBlcnNvbkFuYWx5c2U6IG51bWJlciA9IDA7XHJcbiAgICBWZWhpY2xlQW5hbHlzZTogbnVtYmVyID0gMDtcclxuICAgIE1hY0NvbGxpc29uOiBudW1iZXIgPSAwO1xyXG4gICAgVmlld0N1ZGU6IG51bWJlciA9IDA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJRGF0YVNlcnZpY2VTdGF0aXN0aWNzIHtcclxuICAgIGRhdGVMaXN0OiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICBwbGF5RGF0YTogQXJyYXk8SURhdGFTZXJ2aWNlU3RhdGlzdGljc1Nlcmllcz4gPSBbXTtcclxuICAgIGxlZ2VuZERhdGE6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgIHNlcmllczogSURhdGFTZXJ2aWNlU3RhdGlzdGljc1NlcmllcyA9IG5ldyBJRGF0YVNlcnZpY2VTdGF0aXN0aWNzU2VyaWVzKClcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIElSZXNvdXJjZWJSZXRyaWV2YWxUcmVuZCB7XHJcbiAgICBzZXJpZXM6IElBcmVhVG90YWxDb2xsZWN0aW9uU2VyaWVzID0gbmV3IElBcmVhVG90YWxDb2xsZWN0aW9uU2VyaWVzKCk7XHJcbiAgICBkYXRlTGlzdDogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgbGVnZW5kRGF0YTogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgcGxheURhdGE6IEFycmF5PElBcmVhVG90YWxDb2xsZWN0aW9uU2VyaWVzPiA9IFtdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSUFsbFJhbmtMaXN0IHtcclxuICAgIHNlcmllczpBcnJheTx7bmFtZTogc3RyaW5nLHZhbHVlOiBudW1iZXJ9Pj0gW11cclxuICAgIHBsYXlEYXRhOiBBcnJheTxBcnJheTx7bmFtZTogc3RyaW5nLHZhbHVlOiBudW1iZXJ9Pj4gPSBbXTtcclxuICAgIGRhdGVMaXN0OiBBcnJheTxzdHJpbmc+ID0gW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRW51bSB7XHJcbiAgICBrZXk6IHN0cmluZztcclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbn1cclxuZXhwb3J0IGNvbnN0IFJlc291cmNlVHlwZTp7W2tleTpzdHJpbmddOkVudW19ID0ge1xyXG4gICAgd2lmaTogIHsga2V5OiAnV2lGaScsIHZhbHVlOiAnV2ktRmknIH0sXHJcbiAgICBlbGVjdHJvbmljZmVuY2U6eyBrZXk6ICdFRkVOQ0UnLCB2YWx1ZTogJ+eUteWtkOWbtOagjycgfSxcclxuICAgIHJtcGdhdGU6eyBrZXk6ICdWZWhpY2xlJywgdmFsdWU6ICfljaHlj6MnIH0sXHJcbiAgICBjYW1lcmE6IHsga2V5OiAnRmFjZScsIHZhbHVlOiAn5Lq66IS4JyB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgUmVzb3VyY2VUeXBlMjp7W2tleTpzdHJpbmddOkVudW19ID0ge1xyXG4gICAgd2lmaTogIHsga2V5OiAnV2lGaVNlYXJjaCcsIHZhbHVlOiAnV2ktRmknIH0sXHJcbiAgICBlbGVjdHJvbmljZmVuY2U6eyBrZXk6ICdFRmVuY2VTZWFyY2gnLCB2YWx1ZTogJ+eUteWtkOWbtOagjycgfSxcclxuICAgIHJtcGdhdGU6eyBrZXk6ICdWZWhpY2xlU2VhcmNoJywgdmFsdWU6ICfljaHlj6MnIH0sXHJcbiAgICBjYW1lcmE6IHsga2V5OiAnRmFjZVNlYXJjaCcsIHZhbHVlOiAn5Lq66IS4JyB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBBbmFseXNlVHlwZTp7W2tleTpzdHJpbmddOkVudW19ID0ge1xyXG4gICAgU2VhcmNoOiAgeyBrZXk6ICdTZWFyY2gnLCB2YWx1ZTogJ+ajgOe0oicgfSxcclxuICAgIFBlcnNvbkFuYWx5c2U6IHsga2V5OiAnUGVyc29uQW5hbHlzZScsIHZhbHVlOiAn5Lq65YOP5YiG5p6QJyB9LFxyXG4gICAgVmVoaWNsZUFuYWx5c2U6ICB7IGtleTogJ1ZlaGljbGVBbmFseXNlJywgdmFsdWU6ICfovabovobliIbmnpAnIH0sXHJcbiAgICBNYWNDb2xsaXNvbjp7IGtleTogJ01hY0NvbGxpc29uJywgdmFsdWU6ICdNYWPnorDmkp4nIH0sXHJcbiAgICBWaWV3Q3ViZTogeyBrZXk6ICdWaWV3Q3ViZScsIHZhbHVlOiAn6KeG5Zu+56uL5pa5JyB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBSZXNvdXJjZUZhY2VUeXBlOntba2V5OnN0cmluZ106RW51bX0gPSB7XHJcbiAgICBQZXJzb25UcmFjazogIHsga2V5OiAnUGVyc29uVHJhY2snLCB2YWx1ZTogJ+S6uuWRmOi9qOi/uScgfSxcclxuICAgIEZhY2VBbmFseXNlOiB7IGtleTogJ0ZhY2VBbmFseXNlJywgdmFsdWU6ICfkurrohLjliIbmnpAnIH0sXHJcbiAgICBTaW1pbGFyaXR5QW5hbHlzZTogIHsga2V5OiAnU2ltaWxhcml0eUFuYWx5c2UnLCB2YWx1ZTogJ+ebuOS8vOW6puWIhuaekCcgfSxcclxuICAgIEFjY29tcGFueUFuYWx5c2U6eyBrZXk6ICdBY2NvbXBhbnlBbmFseXNlJywgdmFsdWU6ICfkvLTpmo/liIbmnpAnIH0sXHJcbiAgICBGYWNlQ29sbGlzaW9uOiB7IGtleTogJ0ZhY2VDb2xsaXNpb24nLCB2YWx1ZTogJ+S6uuiEuOeisOaSnicgfSxcclxuICAgIEZyZXF1ZW50SW5mZXN0YXRpb246IHsga2V5OiAnRnJlcXVlbnRJbmZlc3RhdGlvbicsIHZhbHVlOiAn6aKR57mB5Ye65rKhJyB9LFxyXG4gICAgRmFjZUZyZXF1ZW5jeUFuYWx5c2U6IHsga2V5OiAnRmFjZUZyZXF1ZW5jeUFuYWx5c2UnLCB2YWx1ZTogJ+mikeasoeWIhuaekCcgfSxcclxuICAgIFBlcnNvbkFsYXJtOiB7IGtleTogJ1BlcnNvbkFsYXJtJywgdmFsdWU6ICfkurrlkZjmiqXoraYnIH1cclxufTtcclxuXHJcbmV4cG9ydCBjbGFzcyBJUmVzb3VyY2VDaGFydCB7XHJcbiAgICBSZXNvdXJjZVN0YXRpc3RpY2FsVG90YWw6IElSZXNvdXJjZVN0YXRpc3RpY2FsVG90YWwgPSBuZXcgSVJlc291cmNlU3RhdGlzdGljYWxUb3RhbCgpO1xyXG4gICAgQXJlYVRvdGFsQ29sbGVjdGlvbjogSUFyZWFUb3RhbENvbGxlY3Rpb24gPSBuZXcgSUFyZWFUb3RhbENvbGxlY3Rpb24oKTtcclxuICAgIEFsYXJtU3RhdGlzdGljczogSUFsYXJtU3RhdGlzdGljcyA9IG5ldyBJQWxhcm1TdGF0aXN0aWNzKCk7XHJcbiAgICBEYXRhU2VydmljZVN0YXRpc3RpY3M6IElEYXRhU2VydmljZVN0YXRpc3RpY3MgPSBuZXcgSURhdGFTZXJ2aWNlU3RhdGlzdGljcygpOyBcclxuICAgIFJlc291cmNlYlJldHJpZXZhbFRyZW5kOiBJUmVzb3VyY2ViUmV0cmlldmFsVHJlbmQgPSBuZXcgSVJlc291cmNlYlJldHJpZXZhbFRyZW5kKCk7XHJcbiAgICBBbGxSYW5rTGlzdDpJQWxsUmFua0xpc3QgPSBuZXcgSUFsbFJhbmtMaXN0KCk7XHJcbiAgICBJTWFwUmVzb3VyY2U6SU1hcFJlc291cmNlID0gbmV3IElNYXBSZXNvdXJjZSgpO1xyXG59XHJcbmV4cG9ydCBjbGFzcyBJTWFwUmVzb3VyY2Uge1xyXG4gICAgZGV2aWNlTGlzdDogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgc2VyaWVzOiAgQXJyYXk8e2xvbmdpdHVkZTpzdHJpbmcsbGF0aXR1ZGU6c3RyaW5nLGZsb3c6c3RyaW5nfT49IFtdO1xyXG4gICAgZGF0ZUxpc3Q6QXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgcGxheURhdGE6QXJyYXk8QXJyYXk8YW55Pj4gPSBbXTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvdW50RW51bSB7XHJcbiAgICB0b2RheUZsb3c6IG51bWJlciA9IDA7XHJcbiAgICB0b3RhbEZsb3c6IG51bWJlciA9IDA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJUmVzb3VyY2VDb3VudCB7XHJcbiAgICBXSUZJOiBDb3VudEVudW0gPSBuZXcgQ291bnRFbnVtKCk7XHJcbiAgICBFRkVOQ0U6IENvdW50RW51bSA9IG5ldyBDb3VudEVudW0oKTtcclxuICAgIENhcjogQ291bnRFbnVtID0gbmV3IENvdW50RW51bSgpO1xyXG4gICAgRmFjZTogQ291bnRFbnVtID0gbmV3IENvdW50RW51bSgpO1xyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBJU3RhdGlzdGljcyB7XHJcbiAgICBkYXRlTGlzdDpBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICBwbGF5RGF0YTpBcnJheTx7YWxhcm06IEFycmF5PG51bWJlcj4gLGZsb3c6IEFycmF5PG51bWJlcj59PiA9IFtdO1xyXG4gICAgbGVnZW5kRGF0YTogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgc2VyaWVzOnthbGFybTogQXJyYXk8bnVtYmVyPiAsZmxvdzogQXJyYXk8bnVtYmVyPn0gPSB7YWxhcm06W10sZmxvdzpbXX1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIElBcmVhT3RoZXJBbGFybVN0YXRpc3RpY3Mge1xyXG4gICAgbGVnZW5kRGF0YTogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgeERhdGE6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgIHNlcmllczogQXJyYXk8QXJyYXk8bnVtYmVyPj4gPSBbXTtcclxuICAgIGRhdGVMaXN0OkFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgIHBsYXlEYXRhOkFycmF5PEFycmF5PEFycmF5PG51bWJlcj4+PiA9IFtdO1xyXG59XHJcbmV4cG9ydCBjbGFzcyBJVHlwZVN0YXRpc3RpY3Mge1xyXG4gICAgbGVnZW5kRGF0YTogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgc2VyaWVzOiBBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICBkYXRlTGlzdDpBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICBwbGF5RGF0YTpBcnJheTxBcnJheTxudW1iZXI+PiA9IFtdO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIElQZXJzb25TdGF0aXN0aWNzIGV4dGVuZHMgSVN0YXRpc3RpY3MgeyB9XHJcbmV4cG9ydCBjbGFzcyBJQXJlYVBlcnNvbkFsYXJtU3RhdGlzdGljcyBleHRlbmRzIElBcmVhT3RoZXJBbGFybVN0YXRpc3RpY3MgeyB9XHJcbmV4cG9ydCBjbGFzcyBJUGVyc29uVHlwZVN0YXRpc3RpY3MgZXh0ZW5kcyBJVHlwZVN0YXRpc3RpY3MgeyB9XHJcblxyXG5leHBvcnQgY2xhc3MgSVdpZmlTdGF0aXN0aWNzIGV4dGVuZHMgSVN0YXRpc3RpY3MgeyB9XHJcbmV4cG9ydCBjbGFzcyBJQXJlYVdpZmlBbGFybVN0YXRpc3RpY3MgZXh0ZW5kcyBJQXJlYU90aGVyQWxhcm1TdGF0aXN0aWNzIHsgfVxyXG5leHBvcnQgY2xhc3MgSVdpZmlUeXBlU3RhdGlzdGljcyBleHRlbmRzIElUeXBlU3RhdGlzdGljcyB7IH1cclxuXHJcbmV4cG9ydCBjbGFzcyBJRWxlY3Ryb25pY2ZlbmNlU3RhdGlzdGljcyBleHRlbmRzIElTdGF0aXN0aWNzIHsgfVxyXG5leHBvcnQgY2xhc3MgSUFyZWFFbGVjdHJvbmljZmVuY2VBbGFybVN0YXRpc3RpY3MgZXh0ZW5kcyBJQXJlYU90aGVyQWxhcm1TdGF0aXN0aWNzIHsgfVxyXG5leHBvcnQgY2xhc3MgSUVsZWN0cm9uaWNmZW5jZVR5cGVTdGF0aXN0aWNzIGV4dGVuZHMgSVR5cGVTdGF0aXN0aWNzIHsgfVxyXG5cclxuZXhwb3J0IGNsYXNzIElQZXJzb25SZXNvdXJjZUNoYXJ0IHtcclxuICAgIFBlcnNvblN0YXRpc3RpY3M6IElQZXJzb25TdGF0aXN0aWNzID0gbmV3IElQZXJzb25TdGF0aXN0aWNzKCk7XHJcbiAgICBBcmVhUGVyc29uU3RhdGlzdGljczogSVBlcnNvblN0YXRpc3RpY3MgPSBuZXcgSVBlcnNvblN0YXRpc3RpY3MoKTtcclxuICAgIEFyZWFQZXJzb25BbGFybVN0YXRpc3RpY3M6IElBcmVhUGVyc29uQWxhcm1TdGF0aXN0aWNzID0gbmV3IElBcmVhUGVyc29uQWxhcm1TdGF0aXN0aWNzKCk7XHJcbiAgICBQZXJzb25UeXBlU3RhdGlzdGljczogSVBlcnNvblR5cGVTdGF0aXN0aWNzID0gbmV3IElQZXJzb25UeXBlU3RhdGlzdGljcygpO1xyXG4gICAgUGVyc29uQ29sb3JTdGF0aXN0aWNzOiBJUGVyc29uVHlwZVN0YXRpc3RpY3MgPSBuZXcgSVBlcnNvblR5cGVTdGF0aXN0aWNzKCk7XHJcbiAgICBQZXJzb25BbGxSYW5rTGlzdDpJQWxsUmFua0xpc3QgPSBuZXcgSUFsbFJhbmtMaXN0KCk7XHJcbiAgICBJTWFwUmVzb3VyY2U6SU1hcFJlc291cmNlID0gbmV3IElNYXBSZXNvdXJjZSgpO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSVdpZmlSZXNvdXJjZUNoYXJ0IHtcclxuICAgIFdpZmlTdGF0aXN0aWNzOiBJV2lmaVN0YXRpc3RpY3MgPSBuZXcgSVdpZmlTdGF0aXN0aWNzKCk7XHJcbiAgICBBcmVhV2lmaVN0YXRpc3RpY3M6IElXaWZpU3RhdGlzdGljcyA9IG5ldyBJV2lmaVN0YXRpc3RpY3MoKTtcclxuICAgIEFyZWFXaWZpQWxhcm1TdGF0aXN0aWNzOiBJQXJlYVdpZmlBbGFybVN0YXRpc3RpY3MgPSBuZXcgSUFyZWFXaWZpQWxhcm1TdGF0aXN0aWNzKCk7XHJcbiAgICBXaWZpVHlwZVN0YXRpc3RpY3M6IElXaWZpVHlwZVN0YXRpc3RpY3MgPSBuZXcgSVdpZmlUeXBlU3RhdGlzdGljcygpO1xyXG4gICAgV2lmaUNvbG9yU3RhdGlzdGljczogSVdpZmlUeXBlU3RhdGlzdGljcyA9IG5ldyBJV2lmaVR5cGVTdGF0aXN0aWNzKCk7XHJcbiAgICBXaWZpQWxsUmFua0xpc3Q6SUFsbFJhbmtMaXN0ID0gbmV3IElBbGxSYW5rTGlzdCgpO1xyXG4gICAgSU1hcFJlc291cmNlOklNYXBSZXNvdXJjZSA9IG5ldyBJTWFwUmVzb3VyY2UoKTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIElFbGVjdHJvbmljZmVuY2VSZXNvdXJjZUNoYXJ0IHtcclxuICAgIEVGU3RhdGlzdGljczogSUVsZWN0cm9uaWNmZW5jZVN0YXRpc3RpY3MgPSBuZXcgSUVsZWN0cm9uaWNmZW5jZVN0YXRpc3RpY3MoKTtcclxuICAgIEFyZWFFRlN0YXRpc3RpY3M6IElFbGVjdHJvbmljZmVuY2VTdGF0aXN0aWNzID0gbmV3IElFbGVjdHJvbmljZmVuY2VTdGF0aXN0aWNzKCk7XHJcbiAgICBBcmVhRUZBbGFybVN0YXRpc3RpY3M6IElBcmVhRWxlY3Ryb25pY2ZlbmNlQWxhcm1TdGF0aXN0aWNzID0gbmV3IElBcmVhRWxlY3Ryb25pY2ZlbmNlQWxhcm1TdGF0aXN0aWNzKCk7XHJcbiAgICBFRlR5cGVTdGF0aXN0aWNzOiBJRWxlY3Ryb25pY2ZlbmNlVHlwZVN0YXRpc3RpY3MgPSBuZXcgSUVsZWN0cm9uaWNmZW5jZVR5cGVTdGF0aXN0aWNzKCk7XHJcbiAgICBFRkNvbG9yU3RhdGlzdGljczogSUVsZWN0cm9uaWNmZW5jZVR5cGVTdGF0aXN0aWNzID0gbmV3IElFbGVjdHJvbmljZmVuY2VUeXBlU3RhdGlzdGljcygpO1xyXG4gICAgRUZBbGxSYW5rTGlzdDpJQWxsUmFua0xpc3QgPSBuZXcgSUFsbFJhbmtMaXN0KCk7XHJcbiAgICBJTWFwUmVzb3VyY2U6SU1hcFJlc291cmNlID0gbmV3IElNYXBSZXNvdXJjZSgpO1xyXG59Il19
