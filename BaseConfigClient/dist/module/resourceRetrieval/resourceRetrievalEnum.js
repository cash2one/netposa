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
define(["require", "exports", "../common/directive/page/page-params"], function (require, exports, page_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var QueryItem = (function () {
        function QueryItem() {
        }
        return QueryItem;
    }());
    exports.QueryItem = QueryItem;
    var VehicleQueryItem = (function (_super) {
        __extends(VehicleQueryItem, _super);
        function VehicleQueryItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return VehicleQueryItem;
    }(QueryItem));
    exports.VehicleQueryItem = VehicleQueryItem;
    var Size = (function () {
        function Size() {
        }
        return Size;
    }());
    exports.Size = Size;
    var car = (function () {
        function car() {
        }
        return car;
    }());
    exports.car = car;
    var carItem = (function () {
        function carItem() {
        }
        return carItem;
    }());
    exports.carItem = carItem;
    var faceItem = (function () {
        function faceItem() {
        }
        return faceItem;
    }());
    exports.faceItem = faceItem;
    var wifiItem = (function () {
        function wifiItem() {
        }
        return wifiItem;
    }());
    exports.wifiItem = wifiItem;
    var rfidItem = (function () {
        function rfidItem() {
        }
        return rfidItem;
    }());
    exports.rfidItem = rfidItem;
    var electronicItem = (function () {
        function electronicItem() {
        }
        return electronicItem;
    }());
    exports.electronicItem = electronicItem;
    var deviceItem = (function () {
        function deviceItem() {
        }
        return deviceItem;
    }());
    exports.deviceItem = deviceItem;
    var positionItem = (function () {
        function positionItem() {
        }
        return positionItem;
    }());
    exports.positionItem = positionItem;
    function initCarResult(num) {
        var queryResult = {};
        queryResult.data = [];
        var pageParams = new page_params_1.default();
        pageParams.pageSize = 6;
        pageParams.currentPage = 1;
        pageParams.totalCount = 0;
        pageParams.pageCount = 0;
        queryResult.pageParams = pageParams;
        queryResult.data = [];
        return queryResult;
    }
    exports.initCarResult = initCarResult;
    function initFaceResult(num) {
        var queryResult = {};
        queryResult.data = [];
        var pageParams = new page_params_1.default();
        pageParams.pageSize = 6;
        pageParams.currentPage = 1;
        pageParams.totalCount = 0;
        pageParams.pageCount = 0;
        queryResult.pageParams = pageParams;
        var mock = [
            {
                "Age": 27,
                "AreaID": "areaId37",
                "Attractive": -1,
                "BottomColor": 0,
                "CameraID": "关山大道保利国际",
                "FaceConfidence": 0,
                "FacePath": "/images/recording/0000-30.PNG",
                "FaceRect": "[{'X':27,'Y':27},{'X':81,'Y':27},{'X':81,'Y':81},{'X':27,'Y':110}]",
                "Gender": "2",
                "Glass": -1,
                "HasextractAttribute": false,
                "HasextractFeature": false,
                "HasfaceFeature": false,
                "ID": "6.82109E+17",
                "IsPants": 0,
                "IsSleeve": 0,
                "LogTime": "2017-09-30 14:31:21",
                "Mask": 0,
                "Orientation": 0,
                "PersonConfidence": "0",
                "Smile": 0,
                "SunGlasses": 0,
                "TaskID": "a0474dd855424eaa8f820e1da16ad32ab",
                "Texture": 0,
                "UpperColor": 0,
                "Race": 0,
                "ScenePath": "LOC:402201323/data/20170818/00/3e1f96c665d22048ea4f514b76119ed0_79183"
            },
            {
                "Age": 26,
                "AreaID": "areaId36",
                "Attractive": -1,
                "BottomColor": 0,
                "CameraID": "关山大道保利国际",
                "FaceConfidence": 0,
                "FacePath": "/images/recording/0000-29.PNG",
                "FaceRect": "[{'X':27,'Y':27},{'X':81,'Y':27},{'X':81,'Y':81},{'X':27,'Y':109}]",
                "Gender": "2",
                "Glass": -1,
                "HasextractAttribute": false,
                "HasextractFeature": false,
                "HasfaceFeature": false,
                "ID": "6.82109E+17",
                "IsPants": 0,
                "IsSleeve": 0,
                "LogTime": "2017-09-29 14:27:21",
                "Mask": 0,
                "Orientation": 0,
                "PersonConfidence": "0",
                "Smile": 0,
                "SunGlasses": 0,
                "TaskID": "a0474dd855424eaa8f820e1da16ad31ab",
                "Texture": 0,
                "UpperColor": 0,
                "Race": 0,
                "ScenePath": "LOC:402201323/data/20170818/00/3e1f96c665d22048ea4f514b76119ed0_79183"
            },
            {
                "Age": 28,
                "AreaID": "areaId35",
                "Attractive": -1,
                "BottomColor": 0,
                "CameraID": "关山大道保利国际",
                "FaceConfidence": 0,
                "FacePath": "/images/recording/0000-28.PNG",
                "FaceRect": "[{'X':27,'Y':27},{'X':81,'Y':27},{'X':81,'Y':81},{'X':27,'Y':108}]",
                "Gender": "2",
                "Glass": -1,
                "HasextractAttribute": false,
                "HasextractFeature": false,
                "HasfaceFeature": false,
                "ID": "6.82109E+17",
                "IsPants": 0,
                "IsSleeve": 0,
                "LogTime": "2017-09-28 14:23:21",
                "Mask": 0,
                "Orientation": 0,
                "PersonConfidence": "0",
                "Smile": 1,
                "SunGlasses": 0,
                "TaskID": "a0474dd855424eaa8f820e1da16ad30ab",
                "Texture": 0,
                "UpperColor": 0,
                "Race": 0,
                "ScenePath": "LOC:402201323/data/20170818/00/3e1f96c665d22048ea4f514b76119ed0_79183"
            },
            {
                "Age": 55,
                "AreaID": "areaId34",
                "Attractive": -1,
                "BottomColor": 0,
                "CameraID": "关山大道保利国际",
                "FaceConfidence": 0,
                "FacePath": "/images/recording/0000-27.PNG",
                "FaceRect": "[{'X':27,'Y':27},{'X':81,'Y':27},{'X':81,'Y':81},{'X':27,'Y':107}]",
                "Gender": "1",
                "Glass": -1,
                "HasextractAttribute": false,
                "HasextractFeature": false,
                "HasfaceFeature": false,
                "ID": "6.82109E+17",
                "IsPants": 0,
                "IsSleeve": 0,
                "LogTime": "2017-09-27 14:19:21",
                "Mask": 0,
                "Orientation": 0,
                "PersonConfidence": "0",
                "Smile": -1,
                "SunGlasses": 0,
                "TaskID": "a0474dd855424eaa8f820e1da16ad29ab",
                "Texture": 0,
                "UpperColor": 0,
                "Race": 0,
                "ScenePath": "LOC:402201323/data/20170818/00/3e1f96c665d22048ea4f514b76119ed0_79183"
            },
            {
                "Age": 28,
                "AreaID": "areaId33",
                "Attractive": -1,
                "BottomColor": 0,
                "CameraID": "关山大道保利国际",
                "FaceConfidence": 0,
                "FacePath": "/images/recording/0000-26.PNG",
                "FaceRect": "[{'X':27,'Y':27},{'X':81,'Y':27},{'X':81,'Y':81},{'X':27,'Y':106}]",
                "Gender": "2",
                "Glass": -1,
                "HasextractAttribute": false,
                "HasextractFeature": false,
                "HasfaceFeature": false,
                "ID": "6.82109E+17",
                "IsPants": 0,
                "IsSleeve": 0,
                "LogTime": "2017-09-26 14:15:21",
                "Mask": 0,
                "Orientation": 0,
                "PersonConfidence": "0",
                "Smile": -1,
                "SunGlasses": 0,
                "TaskID": "a0474dd855424eaa8f820e1da16ad28ab",
                "Texture": 0,
                "UpperColor": 0,
                "Race": 0,
                "ScenePath": "LOC:402201323/data/20170818/00/3e1f96c665d22048ea4f514b76119ed0_79183"
            },
            {
                "Age": 59,
                "AreaID": "areaId32",
                "Attractive": -1,
                "BottomColor": 0,
                "CameraID": "关山大道保利国际",
                "FaceConfidence": 0,
                "FacePath": "/images/recording/0000-25.PNG",
                "FaceRect": "[{'X':27,'Y':27},{'X':81,'Y':27},{'X':81,'Y':81},{'X':27,'Y':105}]",
                "Gender": "1",
                "Glass": -1,
                "HasextractAttribute": false,
                "HasextractFeature": false,
                "HasfaceFeature": false,
                "ID": "6.82109E+17",
                "IsPants": 0,
                "IsSleeve": 0,
                "LogTime": "2017-09-25 14:11:21",
                "Mask": 0,
                "Orientation": 0,
                "PersonConfidence": "0",
                "Smile": 0,
                "SunGlasses": 0,
                "TaskID": "a0474dd855424eaa8f820e1da16ad27ab",
                "Texture": 0,
                "UpperColor": 0,
                "Race": 0,
                "ScenePath": "LOC:402201323/data/20170818/00/3e1f96c665d22048ea4f514b76119ed0_79183"
            },
            {
                "Age": 25,
                "AreaID": "areaId31",
                "Attractive": -1,
                "BottomColor": 0,
                "CameraID": "关山大道保利国际",
                "FaceConfidence": 0,
                "FacePath": "/images/recording/0000-24.PNG",
                "FaceRect": "[{'X':27,'Y':27},{'X':81,'Y':27},{'X':81,'Y':81},{'X':27,'Y':104}]",
                "Gender": "2",
                "Glass": 1,
                "HasextractAttribute": false,
                "HasextractFeature": false,
                "HasfaceFeature": false,
                "ID": "6.82109E+17",
                "IsPants": 0,
                "IsSleeve": 0,
                "LogTime": "2017-09-24 14:07:21",
                "Mask": 0,
                "Orientation": 0,
                "PersonConfidence": "0",
                "Smile": -1,
                "SunGlasses": 0,
                "TaskID": "a0474dd855424eaa8f820e1da16ad26ab",
                "Texture": 0,
                "UpperColor": 0,
                "Race": 0,
                "ScenePath": "LOC:402201323/data/20170818/00/3e1f96c665d22048ea4f514b76119ed0_79183"
            },
            {
                "Age": 14,
                "AreaID": "areaId30",
                "Attractive": -1,
                "BottomColor": 0,
                "CameraID": "关山大道保利国际",
                "FaceConfidence": 0,
                "FacePath": "/images/recording/0000-23.PNG",
                "FaceRect": "[{'X':27,'Y':27},{'X':81,'Y':27},{'X':81,'Y':81},{'X':27,'Y':103}]",
                "Gender": "2",
                "Glass": -1,
                "HasextractAttribute": false,
                "HasextractFeature": false,
                "HasfaceFeature": false,
                "ID": "6.82109E+17",
                "IsPants": 0,
                "IsSleeve": 0,
                "LogTime": "2017-09-23 14:03:21",
                "Mask": 0,
                "Orientation": 0,
                "PersonConfidence": "0",
                "Smile": -1,
                "SunGlasses": 0,
                "TaskID": "a0474dd855424eaa8f820e1da16ad25ab",
                "Texture": 0,
                "UpperColor": 0,
                "Race": 0,
                "ScenePath": "LOC:402201323/data/20170818/00/3e1f96c665d22048ea4f514b76119ed0_79183"
            }
        ];
        var mockList = [];
        for (var i = 0; i < 30 && i < num; i++) {
            mockList.push({
                "AccessLog": mock[i],
                "DeviceType": "Camera",
                "collectStatus": false,
                "surveillanceStatus": false
            });
        }
        queryResult.data = mockList;
        return queryResult;
    }
    exports.initFaceResult = initFaceResult;
    function initWifiResult(num) {
        var queryResult = {};
        queryResult.data = [];
        var pageParams = new page_params_1.default();
        pageParams.pageSize = 6;
        pageParams.currentPage = 1;
        pageParams.totalCount = 30;
        pageParams.pageCount = 5;
        queryResult.pageParams = pageParams;
        queryResult.data = [];
        return queryResult;
    }
    exports.initWifiResult = initWifiResult;
    function initElectronicResult() {
        var queryResult = {};
        queryResult.data = [];
        var pageParams = new page_params_1.default();
        pageParams.pageSize = 5;
        pageParams.currentPage = 1;
        pageParams.totalCount = 0;
        pageParams.pageCount = 0;
        queryResult.pageParams = pageParams;
        return queryResult;
    }
    exports.initElectronicResult = initElectronicResult;
    function initDeviceResult(type) {
        var queryResult = {};
        queryResult.data = [];
        var pageParams = new page_params_1.default();
        pageParams.pageSize = 5;
        pageParams.currentPage = 1;
        pageParams.totalCount = 0;
        pageParams.pageCount = 0;
        queryResult.pageParams = pageParams;
        return queryResult;
    }
    exports.initDeviceResult = initDeviceResult;
    function initPositionResult() {
        var queryResult = {};
        queryResult.data = [];
        var pageParams = new page_params_1.default();
        pageParams.pageSize = 10;
        pageParams.currentPage = 1;
        pageParams.totalCount = 0;
        pageParams.pageCount = 0;
        queryResult.pageParams = pageParams;
        queryResult.data = [];
        return queryResult;
    }
    exports.initPositionResult = initPositionResult;
    function getWidowSize() {
        var size = new Size();
        size.width = $(window).width();
        size.height = $(window).height();
        return size;
    }
    exports.getWidowSize = getWidowSize;
    function SetQueryRecord(str) {
        var value = localStorage.getItem('resourceRetrievalQueryRecord');
        var queryRecord = [];
        var arr = [];
        if (str && str != 'undefined' && str != 'null' && str != '') {
            arr.push({ id: 0, value: str });
        }
        if (value && value != 'undefined' && value != 'null') {
            queryRecord = JSON.parse(value);
        }
        for (var i = 0; i < queryRecord.length; i++) {
            if (arr.length < 20) {
                if (arr[0].value !== queryRecord[i].value) {
                    arr.push({ id: i + 1, value: queryRecord[i].value.toString() });
                }
            }
            else {
                break;
            }
        }
        localStorage.setItem('resourceRetrievalQueryRecord', JSON.stringify(arr));
        return null;
    }
    exports.SetQueryRecord = SetQueryRecord;
    function SetSearchRecord(str) {
        var value = localStorage.getItem('SetSearchRecord');
        var queryRecord = [];
        var arr = [];
        if (str && str != 'undefined' && str != 'null' && str != '') {
            arr.push({ id: 0, value: str });
        }
        if (value && value != 'undefined' && value != 'null') {
            queryRecord = JSON.parse(value);
        }
        for (var i = 0; i < queryRecord.length; i++) {
            if (arr.length < 20) {
                if (arr[0].value !== queryRecord[i].value) {
                    arr.push({ id: i + 1, value: queryRecord[i].value.toString() });
                }
            }
            else {
                break;
            }
        }
        localStorage.setItem('resourceRetrievalQueryRecord', JSON.stringify(arr));
        return null;
    }
    exports.SetSearchRecord = SetSearchRecord;
    function GetQueryRecord() {
        var value = localStorage.getItem('resourceRetrievalQueryRecord');
        var queryRecord = [];
        var arr = [];
        if (value && value != 'undefined' && value != 'null') {
            queryRecord = JSON.parse(value);
        }
        for (var i = 0; i < queryRecord.length; i++) {
            arr.push(queryRecord[i]);
        }
        return arr;
    }
    exports.GetQueryRecord = GetQueryRecord;
    function ClearQueryRecord() {
        localStorage.removeItem('resourceRetrievalQueryRecord');
    }
    exports.ClearQueryRecord = ClearQueryRecord;
    function SetHistoryQueryRecord(queryParam) {
        var value = localStorage.getItem('HistoryQueryRecord');
        var queryRecord = [];
        var str = JSON.stringify(queryParam);
        var arr = [];
        if (str && str != 'undefined' && str != 'null' && str != '') {
            arr.push({ id: 0, value: str });
        }
        if (value && value != 'undefined' && value != 'null') {
            queryRecord = JSON.parse(value);
        }
        for (var i = 0; i < queryRecord.length; i++) {
            if (arr.length < 6) {
                if (arr[0].value !== queryRecord[i].value) {
                    arr.push({ id: i + 1, value: queryRecord[i].value });
                }
            }
            else {
                break;
            }
        }
        localStorage.setItem('HistoryQueryRecord', JSON.stringify(arr));
        return arr;
    }
    exports.SetHistoryQueryRecord = SetHistoryQueryRecord;
    function GetLastQueryRecord() {
        var value = localStorage.getItem('HistoryQueryRecord');
        var queryRecord = [];
        var arr = [];
        var queryData;
        if (value && value != 'undefined' && value != 'null') {
            queryRecord = JSON.parse(value);
            queryData = queryRecord[1];
        }
        else {
            return null;
        }
        for (var i = 2; i < queryRecord.length; i++) {
            arr.push(queryRecord[i]);
        }
        localStorage.setItem('HistoryQueryRecord', JSON.stringify(arr));
        return queryData;
    }
    exports.GetLastQueryRecord = GetLastQueryRecord;
    exports.AmbitusInfo = [
        {
            id: 0,
            value: "车辆 ",
            key: "Car",
            status: false
        }, {
            id: 1,
            value: "人像",
            key: "Face",
            status: false
        }, {
            id: 2,
            value: "WIFI",
            key: "WiFi",
            status: false
        }, {
            id: 3,
            value: "电围",
            key: "EFENCE",
            status: false
        }
    ];
    var PersionLibraryEnum = (function () {
        function PersionLibraryEnum() {
        }
        return PersionLibraryEnum;
    }());
    exports.PersionLibraryEnum = PersionLibraryEnum;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvcmVzb3VyY2VSZXRyaWV2YWxFbnVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFHQTtRQUFBO1FBT0EsQ0FBQztRQUFELGdCQUFDO0lBQUQsQ0FQQSxBQU9DLElBQUE7SUFQWSw4QkFBUztJQVN0QjtRQUFzQyxvQ0FBUztRQUEvQzs7UUFFQSxDQUFDO1FBQUQsdUJBQUM7SUFBRCxDQUZBLEFBRUMsQ0FGcUMsU0FBUyxHQUU5QztJQUZZLDRDQUFnQjtJQUk3QjtRQUFBO1FBR0EsQ0FBQztRQUFELFdBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUhZLG9CQUFJO0lBUWpCO1FBQUE7UUEyREEsQ0FBQztRQUFELFVBQUM7SUFBRCxDQTNEQSxBQTJEQyxJQUFBO0lBM0RZLGtCQUFHO0lBaU1oQjtRQUFBO1FBSUEsQ0FBQztRQUFELGNBQUM7SUFBRCxDQUpBLEFBSUMsSUFBQTtJQUpZLDBCQUFPO0lBTXBCO1FBQUE7UUFJQSxDQUFDO1FBQUQsZUFBQztJQUFELENBSkEsQUFJQyxJQUFBO0lBSlksNEJBQVE7SUFNckI7UUFBQTtRQUlBLENBQUM7UUFBRCxlQUFDO0lBQUQsQ0FKQSxBQUlDLElBQUE7SUFKWSw0QkFBUTtJQU1yQjtRQUFBO1FBSUEsQ0FBQztRQUFELGVBQUM7SUFBRCxDQUpBLEFBSUMsSUFBQTtJQUpZLDRCQUFRO0lBTXJCO1FBQUE7UUFJQSxDQUFDO1FBQUQscUJBQUM7SUFBRCxDQUpBLEFBSUMsSUFBQTtJQUpZLHdDQUFjO0lBTTNCO1FBQUE7UUFJQSxDQUFDO1FBQUQsaUJBQUM7SUFBRCxDQUpBLEFBSUMsSUFBQTtJQUpZLGdDQUFVO0lBTXZCO1FBQUE7UUFHQSxDQUFDO1FBQUQsbUJBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUhZLG9DQUFZO0lBTXpCLHVCQUE4QixHQUFXO1FBQ3JDLElBQUksV0FBVyxHQUFHLEVBQWEsQ0FBQztRQUNoQyxXQUFXLENBQUMs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SVA7UUFBQTtRQU1BLENBQUM7UUFBRCx5QkFBQztJQUFELENBTkEsQUFNQyxJQUFBO0lBTlksZ0RBQWtCIiwiZmlsZSI6Im1vZHVsZS9yZXNvdXJjZVJldHJpZXZhbC9yZXNvdXJjZVJldHJpZXZhbEVudW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFnZVBhcmFtcyBmcm9tIFwiLi4vY29tbW9uL2RpcmVjdGl2ZS9wYWdlL3BhZ2UtcGFyYW1zXCI7XHJcblxyXG4vLyDmn6Xor6Lljoblj7Llr7nosaFcclxuZXhwb3J0IGNsYXNzIFF1ZXJ5SXRlbSB7XHJcbiAgICBpZDogbnVtYmVyO1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIGtleT86IHN0cmluZztcclxuICAgIHN0YXR1cz86IGJvb2xlYW47XHJcbiAgICBmZXR1cmVUYXNrUGFyYW0/OiBhbnk7XHJcbiAgICBmZWF0dXJlU2VhcmNoRXh0PzogYW55O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVmVoaWNsZVF1ZXJ5SXRlbSBleHRlbmRzIFF1ZXJ5SXRlbXtcclxuICAgIGltYWdlUGF0aDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2l6ZSB7XHJcbiAgICB3aWR0aDogbnVtYmVyO1xyXG4gICAgaGVpZ2h0OiBudW1iZXJcclxufVxyXG5cclxuZGVjbGFyZSBsZXQgJDogYW55O1xyXG5cclxuLy8g5a6a5LmJ5Y2V5LiA6L2m6L6G5pWw5o2uXHJcbmV4cG9ydCBjbGFzcyBjYXIge1xyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgb3JnSWQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgbW9uaXRvcklkOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGNoYW5uZWxJZDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBkZXZpY2VJZDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBvcmlnaW5hbFZlaGljbGVJbmZvOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHNwZWVkOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGRpcmVjdGlvbjogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBhY2Nlc3NUeXBlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHBsYXRlTnVtYmVyOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHBsYXRlVHlwZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBwbGF0ZUNvbG9yOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHZlaGljbGVUeXBlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHZlaGljbGVDb2xvcjogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSB2ZWhpY2xlQnJhbmQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgdmVoaWNsZVN1YkJyYW5kOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHZlaGljbGVNb2RlbFllYXI6IHN0cmluZztcclxuICAgIHByaXZhdGUgc3VuVmlzb3JOdW1iZXI6IHN0cmluZztcclxuICAgIHByaXZhdGUgbmFwa2luQm94OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHBlbmRhbnROdW06IG51bWJlcjtcclxuICAgIHByaXZhdGUgY2hlY2tNYXJrTnVtOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHNhZmV0eUJlbHROdW06IG51bWJlcjtcclxuICAgIHByaXZhdGUgZmFjZU51bWJlcjogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSB2ZWhpY2xlQ29udG91cjogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBwYW5vcmFtYUltYWdlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGZlYXR1cmVJbWFnZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBpbWFnZVR5cGU6IHN0cmluZztcclxuICAgIHByaXZhdGUgc3RvcmFnZVRpbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgeHN6dDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSB5enNqOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHd6bHg6IHN0cmluZztcclxuICAgIHByaXZhdGUgc2pjejogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBob3N0Q29kZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBleHROdW1iZXI6IG51bWJlcjtcclxuICAgIHByaXZhdGUgZXh0RGF0ZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBleHRTdHJpbmcxOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGV4dFN0cmluZzI6IHN0cmluZztcclxuICAgIHByaXZhdGUgZXh0U3RyaW5nMzogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBvcmc6IHN0cmluZztcclxuICAgIHByaXZhdGUgbW9uaXRvcjogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBjaGFubmVsOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgeTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtb25pdG9yTmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBzamx5OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGlzQ2FsbFBob25lOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHFqdHAyOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHFqdHAzOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHFqdHA0OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHR6dHAyOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGp1ZGdlRGVjaXNpb246IHN0cmluZztcclxuICAgIHByaXZhdGUganVkZ2VJbmZvOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHh4UGxhdGVJZDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBzY29yZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBwYXNzVGltZVN0cjogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBwYXNzVGltZTogc3RyaW5nO1xyXG4gICAgY29sbGVjdFN0YXR1cz86IGJvb2xlYW47XHJcbiAgICBzdXJ2ZWlsbGFuY2VTdGF0dXM/OiBib29sZWFuO1xyXG59XHJcblxyXG4vLyDlrprkuYnljZXkuIDkurrohLjmlbDmja5cclxuZXhwb3J0IGludGVyZmFjZSBmYWNlIHtcclxuICAgIEFjY2Vzc0xvZzoge1xyXG4gICAgICAgIEFnZTogbnVtYmVyO1xyXG4gICAgICAgIEFyZWFJRDogc3RyaW5nO1xyXG4gICAgICAgIEF0dHJhY3RpdmU6IG51bWJlcjtcclxuICAgICAgICBCb3R0b21Db2xvcjogbnVtYmVyO1xyXG4gICAgICAgIENhbWVyYUlEOiBzdHJpbmc7XHJcbiAgICAgICAgRmFjZUNvbmZpZGVuY2U6IG51bWJlcjtcclxuICAgICAgICBGYWNlUGF0aDogc3RyaW5nO1xyXG4gICAgICAgIEZhY2VSZWN0OiBzdHJpbmc7XHJcbiAgICAgICAgR2VuZGVyOiBzdHJpbmc7XHJcbiAgICAgICAgR2xhc3M6IG51bWJlcjtcclxuICAgICAgICBIYXNleHRyYWN0QXR0cmlidXRlOiBib29sZWFuLFxyXG4gICAgICAgIEhhc2V4dHJhY3RGZWF0dXJlOiBib29sZWFuLFxyXG4gICAgICAgIEhhc2ZhY2VGZWF0dXJlOiBib29sZWFuLFxyXG4gICAgICAgIElEOiBzdHJpbmc7XHJcbiAgICAgICAgSXNQYW50czogbnVtYmVyO1xyXG4gICAgICAgIElzU2xlZXZlOiBudW1iZXI7XHJcbiAgICAgICAgTG9nVGltZTogc3RyaW5nO1xyXG4gICAgICAgIE1hc2s6IG51bWJlcjtcclxuICAgICAgICBPcmllbnRhdGlvbjogbnVtYmVyO1xyXG4gICAgICAgIFBlcnNvbkNvbmZpZGVuY2U6IHN0cmluZztcclxuICAgICAgICBQZXJzb25QYXRoPzogc3RyaW5nO1xyXG4gICAgICAgIFBlcnNvblJlY3Q/OiBzdHJpbmc7XHJcbiAgICAgICAgUmFjZTogbnVtYmVyO1xyXG4gICAgICAgIFNjZW5lUGF0aDogc3RyaW5nO1xyXG4gICAgICAgIFNtaWxlOiBudW1iZXI7XHJcbiAgICAgICAgU3VuR2xhc3Nlcz86IG51bWJlcjtcclxuICAgICAgICBUYXNrSUQ6IHN0cmluZztcclxuICAgICAgICBUZXh0dXJlOiBudW1iZXI7XHJcbiAgICAgICAgVXBwZXJDb2xvcjogbnVtYmVyO1xyXG4gICAgfTtcclxuICAgIFNjb3JlOiBudW1iZXI7XHJcbiAgICBEZXZpY2VUeXBlOiBzdHJpbmc7XHJcbiAgICBjb2xsZWN0U3RhdHVzPzogYm9vbGVhbjtcclxuICAgIHN1cnZlaWxsYW5jZVN0YXR1cz86IGJvb2xlYW47XHJcblxyXG4gICAgW3Byb3BOYW1lOiBzdHJpbmddOiBhbnk7XHJcbn1cclxuXHJcbi8vIOWumuS5ieWNleS4gHdpZmnmlbDmja5cclxuZXhwb3J0IGludGVyZmFjZSB3aWZpIHtcclxuICAgIERldmljZVR5cGU6IHN0cmluZztcclxuICAgIHdpZmlMb2c6IHtcclxuICAgICAgICBBY3FUaW1lOiBzdHJpbmc7XHJcbiAgICAgICAgQXJlYUlkOiBzdHJpbmc7XHJcbiAgICAgICAgQnJhbmQ6IHN0cmluZztcclxuICAgICAgICBJRDogc3RyaW5nO1xyXG4gICAgICAgIElkZW50aXR5Q29udGVudDogc3RyaW5nO1xyXG4gICAgICAgIElkZW50aXR5VHlwZTogc3RyaW5nO1xyXG4gICAgICAgIE1hYzogc3RyaW5nO1xyXG4gICAgICAgIE1hY0RldmljZUlkOiBzdHJpbmc7XHJcbiAgICAgICAgUG9pbnRYOiBzdHJpbmc7XHJcbiAgICAgICAgUG9pbnRZOiBzdHJpbmc7XHJcbiAgICAgICAgUnNzaTogc3RyaW5nO1xyXG4gICAgICAgIFNzaWRMaXN0OiBzdHJpbmc7XHJcbiAgICAgICAgdGFza0lkOiBzdHJpbmc7XHJcbiAgICB9O1xyXG4gICAgY29sbGVjdFN0YXR1cz86IGJvb2xlYW47XHJcbiAgICBzdXJ2ZWlsbGFuY2VTdGF0dXM/OiBib29sZWFuO1xyXG5cclxuICAgIFtwcm9wTmFtZTogc3RyaW5nXTogYW55O1xyXG59XHJcblxyXG4vLyDlrprkuYnljZXkuIDnlLXlm7TmlbDmja5cclxuZXhwb3J0IGludGVyZmFjZSBlbGVjdHJvbmljIHtcclxuICAgIERldmljZVR5cGU6IHN0cmluZztcclxuICAgIGVGZW5jZUxvZzoge1xyXG4gICAgICAgIEFjcVRpbWU6IHN0cmluZztcclxuICAgICAgICBBcmVhSWQ6IHN0cmluZztcclxuICAgICAgICBJRDogc3RyaW5nO1xyXG4gICAgICAgIElNRUk6IHN0cmluZztcclxuICAgICAgICBJTVNJOiBzdHJpbmc7XHJcbiAgICAgICAgSU1TSTI6IHN0cmluZztcclxuICAgICAgICBNYWM6IHN0cmluZztcclxuICAgICAgICBNb2JpbGVEZXZpY2VJZDogc3RyaW5nO1xyXG4gICAgICAgIHRhc2tJZDogc3RyaW5nO1xyXG4gICAgfTtcclxuICAgIGNvbGxlY3RTdGF0dXM/OiBib29sZWFuO1xyXG4gICAgc3VydmVpbGxhbmNlU3RhdHVzPzogYm9vbGVhbjtcclxuICAgIFtwcm9wTmFtZTogc3RyaW5nXTogYW55O1xyXG59XHJcblxyXG4vLyDlrprkuYnljZXkuIDorr7lpIfmlbDmja5cclxuZXhwb3J0IGludGVyZmFjZSBkZXZpY2Uge1xyXG4gICAgSWQ6IHN0cmluZztcclxuICAgIEFyZWFJZDogc3RyaW5nO1xyXG4gICAgQ29kZTogc3RyaW5nO1xyXG4gICAgSXBBZGRyZXNzOiBzdHJpbmc7XHJcbiAgICBPYmplY3RUeXBlOiBzdHJpbmc7XHJcbiAgICBEaXJlY3Q6IHN0cmluZztcclxuICAgIExhdDogc3RyaW5nO1xyXG4gICAgTG9uOiBzdHJpbmc7XHJcbiAgICBOYW1lOiBzdHJpbmc7XHJcbiAgICBCdWlsZExvY2F0aW9uPzogc3RyaW5nO1xyXG4gICAgY29sbGVjdFN0YXR1cz86IGJvb2xlYW47XHJcblxyXG4gICAgW3Byb3BOYW1lOiBzdHJpbmddOiBhbnk7XHJcbn1cclxuXHJcbi8vIOWumuS5ieWNleS4gOS9jee9ruaVsOaNrlxyXG5leHBvcnQgaW50ZXJmYWNlIHBvc2l0aW9uIHtcclxuICAgIGlkOiBzdHJpbmc7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICB0aW1lOiBzdHJpbmc7XHJcbiAgICBhZGRyZXNzPzogc3RyaW5nO1xyXG4gICAgbGF0TG9uPzogc3RyaW5nO1xyXG4gICAgY29sbGVjdFN0YXR1cz86IGJvb2xlYW47XHJcblxyXG4gICAgW3Byb3BOYW1lOiBzdHJpbmddOiBhbnk7XHJcbn1cclxuXHJcbi8vIOWumuS5ieW/q+mAn+ajgOe0ouafpeivouWPguaVsFxyXG5leHBvcnQgaW50ZXJmYWNlIFF1aWNrU2VhcmNoUGFyYW1zIHtcclxuICAgIGtleVdvcmQ6IHN0cmluZztcclxuICAgIGtleVdvcmRzOiBBcnJheTxzdHJpbmc+O1xyXG4gICAgb2JqZWN0VHlwZTogc3RyaW5nO1xyXG4gICAgY3VycmVudFBhZ2U6IG51bWJlcjtcclxuICAgIHBhZ2VTaXplOiBudW1iZXI7XHJcbiAgICBvcmRlckJ5OiBhbnk7XHJcbiAgICB0YXNrSWQ/OiBzdHJpbmc7XHJcbiAgICBpc0ZpcnN0U2VhcmNoPzogYm9vbGVhbjtcclxuICAgIGFyck9iamVjdElEPzogQXJyYXk8c3RyaW5nPjtcclxuICAgIGFyZWFJZD86IEFycmF5PHN0cmluZz47XHJcbiAgICB0aW1lQmVnaW4/OiBzdHJpbmc7XHJcbiAgICB0aW1lRW5kPzogc3RyaW5nO1xyXG4gICAgdXNlcklkOiBzdHJpbmc7XHJcbiAgICBbcHJvcE5hbWU6IHN0cmluZ106IGFueTtcclxufVxyXG5cclxuLy8g5a6a5LmJ6L2m6L6G5pWw5o2u5YyF5ous5YiG6aG15L+h5oGv5LiO6L2m6L6G5YiX6KGo5pWw5o2uXHJcbmV4cG9ydCBjbGFzcyBjYXJJdGVtIHtcclxuICAgIHBhZ2VQYXJhbXM6IFBhZ2VQYXJhbXM7XHJcbiAgICB0YXNrSWQ/OiBzdHJpbmc7XHJcbiAgICBkYXRhOiBBcnJheTxjYXI+O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgZmFjZUl0ZW0ge1xyXG4gICAgcGFnZVBhcmFtczogUGFnZVBhcmFtcztcclxuICAgIHRhc2tJZD86IHN0cmluZztcclxuICAgIGRhdGE6IEFycmF5PGZhY2U+O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3Mgd2lmaUl0ZW0ge1xyXG4gICAgcGFnZVBhcmFtczogUGFnZVBhcmFtcztcclxuICAgIHRhc2tJZD86IHN0cmluZztcclxuICAgIGRhdGE6IEFycmF5PHdpZmk+O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgcmZpZEl0ZW0ge1xyXG4gICAgcGFnZVBhcmFtczogUGFnZVBhcmFtcztcclxuICAgIHRhc2tJZD86IHN0cmluZztcclxuICAgIGRhdGE6IEFycmF5PGFueT47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBlbGVjdHJvbmljSXRlbSB7XHJcbiAgICBwYWdlUGFyYW1zOiBQYWdlUGFyYW1zO1xyXG4gICAgdGFza0lkPzogc3RyaW5nO1xyXG4gICAgZGF0YTogQXJyYXk8ZWxlY3Ryb25pYz47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBkZXZpY2VJdGVtIHtcclxuICAgIHBhZ2VQYXJhbXM6IFBhZ2VQYXJhbXM7XHJcbiAgICB0YXNrSWQ/OiBzdHJpbmc7XHJcbiAgICBkYXRhOiBBcnJheTxkZXZpY2U+O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgcG9zaXRpb25JdGVtIHtcclxuICAgIHBhZ2VQYXJhbXM6IFBhZ2VQYXJhbXM7XHJcbiAgICBkYXRhOiBBcnJheTxwb3NpdGlvbj47XHJcbn1cclxuXHJcbi8vIOWIneWni+WMluW/q+mAn+ajgOe0ouaVsOaNrlxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdENhclJlc3VsdChudW06IG51bWJlcik6IGNhckl0ZW0ge1xyXG4gICAgbGV0IHF1ZXJ5UmVzdWx0ID0ge30gYXMgY2FySXRlbTtcclxuICAgIHF1ZXJ5UmVzdWx0LmRhdGEgPSBbXTtcclxuXHJcbiAgICBsZXQgcGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKCk7XHJcbiAgICBwYWdlUGFyYW1zLnBhZ2VTaXplID0gNjtcclxuICAgIHBhZ2VQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgcGFnZVBhcmFtcy50b3RhbENvdW50ID0gMDtcclxuICAgIHBhZ2VQYXJhbXMucGFnZUNvdW50ID0gMDtcclxuICAgIHF1ZXJ5UmVzdWx0LnBhZ2VQYXJhbXMgPSBwYWdlUGFyYW1zO1xyXG4gICAgcXVlcnlSZXN1bHQuZGF0YSA9IFtdO1xyXG4gICAgcmV0dXJuIHF1ZXJ5UmVzdWx0O1xyXG5cclxufVxyXG5cclxuLy8g5Yid5aeL5YyW5Lq66IS45pWw5o2uXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0RmFjZVJlc3VsdChudW06IG51bWJlcik6IGZhY2VJdGVtIHtcclxuICAgIGxldCBxdWVyeVJlc3VsdCA9IHt9IGFzIGZhY2VJdGVtO1xyXG4gICAgcXVlcnlSZXN1bHQuZGF0YSA9IFtdO1xyXG5cclxuICAgIGxldCBwYWdlUGFyYW1zID0gbmV3IFBhZ2VQYXJhbXMoKTtcclxuICAgIHBhZ2VQYXJhbXMucGFnZVNpemUgPSA2O1xyXG4gICAgcGFnZVBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICBwYWdlUGFyYW1zLnRvdGFsQ291bnQgPSAwO1xyXG4gICAgcGFnZVBhcmFtcy5wYWdlQ291bnQgPSAwO1xyXG4gICAgcXVlcnlSZXN1bHQucGFnZVBhcmFtcyA9IHBhZ2VQYXJhbXM7XHJcblxyXG4gICAgLy8g5qih5ouf5pWw5o2uXHJcbiAgICBsZXQgbW9jayA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiQWdlXCI6IDI3LFxyXG4gICAgICAgICAgICBcIkFyZWFJRFwiOiBcImFyZWFJZDM3XCIsXHJcbiAgICAgICAgICAgIFwiQXR0cmFjdGl2ZVwiOiAtMSxcclxuICAgICAgICAgICAgXCJCb3R0b21Db2xvclwiOiAwLFxyXG4gICAgICAgICAgICBcIkNhbWVyYUlEXCI6IFwi5YWz5bGx5aSn6YGT5L+d5Yip5Zu96ZmFXCIsXHJcbiAgICAgICAgICAgIFwiRmFjZUNvbmZpZGVuY2VcIjogMCxcclxuICAgICAgICAgICAgXCJGYWNlUGF0aFwiOiBcIi9pbWFnZXMvcmVjb3JkaW5nLzAwMDAtMzAuUE5HXCIsXHJcbiAgICAgICAgICAgIFwiRmFjZVJlY3RcIjogXCJbeydYJzoyNywnWSc6Mjd9LHsnWCc6ODEsJ1knOjI3fSx7J1gnOjgxLCdZJzo4MX0seydYJzoyNywnWSc6MTEwfV1cIixcclxuICAgICAgICAgICAgXCJHZW5kZXJcIjogXCIyXCIsXHJcbiAgICAgICAgICAgIFwiR2xhc3NcIjogLTEsXHJcbiAgICAgICAgICAgIFwiSGFzZXh0cmFjdEF0dHJpYnV0ZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJIYXNleHRyYWN0RmVhdHVyZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJIYXNmYWNlRmVhdHVyZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJJRFwiOiBcIjYuODIxMDlFKzE3XCIsXHJcbiAgICAgICAgICAgIFwiSXNQYW50c1wiOiAwLFxyXG4gICAgICAgICAgICBcIklzU2xlZXZlXCI6IDAsXHJcbiAgICAgICAgICAgIFwiTG9nVGltZVwiOiBcIjIwMTctMDktMzAgMTQ6MzE6MjFcIixcclxuICAgICAgICAgICAgXCJNYXNrXCI6IDAsXHJcbiAgICAgICAgICAgIFwiT3JpZW50YXRpb25cIjogMCxcclxuICAgICAgICAgICAgXCJQZXJzb25Db25maWRlbmNlXCI6IFwiMFwiLFxyXG4gICAgICAgICAgICBcIlNtaWxlXCI6IDAsXHJcbiAgICAgICAgICAgIFwiU3VuR2xhc3Nlc1wiOiAwLFxyXG4gICAgICAgICAgICBcIlRhc2tJRFwiOiBcImEwNDc0ZGQ4NTU0MjRlYWE4ZjgyMGUxZGExNmFkMzJhYlwiLFxyXG4gICAgICAgICAgICBcIlRleHR1cmVcIjogMCxcclxuICAgICAgICAgICAgXCJVcHBlckNvbG9yXCI6IDAsXHJcbiAgICAgICAgICAgIFwiUmFjZVwiOiAwLFxyXG4gICAgICAgICAgICBcIlNjZW5lUGF0aFwiOiBcIkxPQzo0MDIyMDEzMjMvZGF0YS8yMDE3MDgxOC8wMC8zZTFmOTZjNjY1ZDIyMDQ4ZWE0ZjUxNGI3NjExOWVkMF83OTE4M1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiQWdlXCI6IDI2LFxyXG4gICAgICAgICAgICBcIkFyZWFJRFwiOiBcImFyZWFJZDM2XCIsXHJcbiAgICAgICAgICAgIFwiQXR0cmFjdGl2ZVwiOiAtMSxcclxuICAgICAgICAgICAgXCJCb3R0b21Db2xvclwiOiAwLFxyXG4gICAgICAgICAgICBcIkNhbWVyYUlEXCI6IFwi5YWz5bGx5aSn6YGT5L+d5Yip5Zu96ZmFXCIsXHJcbiAgICAgICAgICAgIFwiRmFjZUNvbmZpZGVuY2VcIjogMCxcclxuICAgICAgICAgICAgXCJGYWNlUGF0aFwiOiBcIi9pbWFnZXMvcmVjb3JkaW5nLzAwMDAtMjkuUE5HXCIsXHJcbiAgICAgICAgICAgIFwiRmFjZVJlY3RcIjogXCJbeydYJzoyNywnWSc6Mjd9LHsnWCc6ODEsJ1knOjI3fSx7J1gnOjgxLCdZJzo4MX0seydYJzoyNywnWSc6MTA5fV1cIixcclxuICAgICAgICAgICAgXCJHZW5kZXJcIjogXCIyXCIsXHJcbiAgICAgICAgICAgIFwiR2xhc3NcIjogLTEsXHJcbiAgICAgICAgICAgIFwiSGFzZXh0cmFjdEF0dHJpYnV0ZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJIYXNleHRyYWN0RmVhdHVyZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJIYXNmYWNlRmVhdHVyZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJJRFwiOiBcIjYuODIxMDlFKzE3XCIsXHJcbiAgICAgICAgICAgIFwiSXNQYW50c1wiOiAwLFxyXG4gICAgICAgICAgICBcIklzU2xlZXZlXCI6IDAsXHJcbiAgICAgICAgICAgIFwiTG9nVGltZVwiOiBcIjIwMTctMDktMjkgMTQ6Mjc6MjFcIixcclxuICAgICAgICAgICAgXCJNYXNrXCI6IDAsXHJcbiAgICAgICAgICAgIFwiT3JpZW50YXRpb25cIjogMCxcclxuICAgICAgICAgICAgXCJQZXJzb25Db25maWRlbmNlXCI6IFwiMFwiLFxyXG4gICAgICAgICAgICBcIlNtaWxlXCI6IDAsXHJcbiAgICAgICAgICAgIFwiU3VuR2xhc3Nlc1wiOiAwLFxyXG4gICAgICAgICAgICBcIlRhc2tJRFwiOiBcImEwNDc0ZGQ4NTU0MjRlYWE4ZjgyMGUxZGExNmFkMzFhYlwiLFxyXG4gICAgICAgICAgICBcIlRleHR1cmVcIjogMCxcclxuICAgICAgICAgICAgXCJVcHBlckNvbG9yXCI6IDAsXHJcbiAgICAgICAgICAgIFwiUmFjZVwiOiAwLFxyXG4gICAgICAgICAgICBcIlNjZW5lUGF0aFwiOiBcIkxPQzo0MDIyMDEzMjMvZGF0YS8yMDE3MDgxOC8wMC8zZTFmOTZjNjY1ZDIyMDQ4ZWE0ZjUxNGI3NjExOWVkMF83OTE4M1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiQWdlXCI6IDI4LFxyXG4gICAgICAgICAgICBcIkFyZWFJRFwiOiBcImFyZWFJZDM1XCIsXHJcbiAgICAgICAgICAgIFwiQXR0cmFjdGl2ZVwiOiAtMSxcclxuICAgICAgICAgICAgXCJCb3R0b21Db2xvclwiOiAwLFxyXG4gICAgICAgICAgICBcIkNhbWVyYUlEXCI6IFwi5YWz5bGx5aSn6YGT5L+d5Yip5Zu96ZmFXCIsXHJcbiAgICAgICAgICAgIFwiRmFjZUNvbmZpZGVuY2VcIjogMCxcclxuICAgICAgICAgICAgXCJGYWNlUGF0aFwiOiBcIi9pbWFnZXMvcmVjb3JkaW5nLzAwMDAtMjguUE5HXCIsXHJcbiAgICAgICAgICAgIFwiRmFjZVJlY3RcIjogXCJbeydYJzoyNywnWSc6Mjd9LHsnWCc6ODEsJ1knOjI3fSx7J1gnOjgxLCdZJzo4MX0seydYJzoyNywnWSc6MTA4fV1cIixcclxuICAgICAgICAgICAgXCJHZW5kZXJcIjogXCIyXCIsXHJcbiAgICAgICAgICAgIFwiR2xhc3NcIjogLTEsXHJcbiAgICAgICAgICAgIFwiSGFzZXh0cmFjdEF0dHJpYnV0ZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJIYXNleHRyYWN0RmVhdHVyZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJIYXNmYWNlRmVhdHVyZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJJRFwiOiBcIjYuODIxMDlFKzE3XCIsXHJcbiAgICAgICAgICAgIFwiSXNQYW50c1wiOiAwLFxyXG4gICAgICAgICAgICBcIklzU2xlZXZlXCI6IDAsXHJcbiAgICAgICAgICAgIFwiTG9nVGltZVwiOiBcIjIwMTctMDktMjggMTQ6MjM6MjFcIixcclxuICAgICAgICAgICAgXCJNYXNrXCI6IDAsXHJcbiAgICAgICAgICAgIFwiT3JpZW50YXRpb25cIjogMCxcclxuICAgICAgICAgICAgXCJQZXJzb25Db25maWRlbmNlXCI6IFwiMFwiLFxyXG4gICAgICAgICAgICBcIlNtaWxlXCI6IDEsXHJcbiAgICAgICAgICAgIFwiU3VuR2xhc3Nlc1wiOiAwLFxyXG4gICAgICAgICAgICBcIlRhc2tJRFwiOiBcImEwNDc0ZGQ4NTU0MjRlYWE4ZjgyMGUxZGExNmFkMzBhYlwiLFxyXG4gICAgICAgICAgICBcIlRleHR1cmVcIjogMCxcclxuICAgICAgICAgICAgXCJVcHBlckNvbG9yXCI6IDAsXHJcbiAgICAgICAgICAgIFwiUmFjZVwiOiAwLFxyXG4gICAgICAgICAgICBcIlNjZW5lUGF0aFwiOiBcIkxPQzo0MDIyMDEzMjMvZGF0YS8yMDE3MDgxOC8wMC8zZTFmOTZjNjY1ZDIyMDQ4ZWE0ZjUxNGI3NjExOWVkMF83OTE4M1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiQWdlXCI6IDU1LFxyXG4gICAgICAgICAgICBcIkFyZWFJRFwiOiBcImFyZWFJZDM0XCIsXHJcbiAgICAgICAgICAgIFwiQXR0cmFjdGl2ZVwiOiAtMSxcclxuICAgICAgICAgICAgXCJCb3R0b21Db2xvclwiOiAwLFxyXG4gICAgICAgICAgICBcIkNhbWVyYUlEXCI6IFwi5YWz5bGx5aSn6YGT5L+d5Yip5Zu96ZmFXCIsXHJcbiAgICAgICAgICAgIFwiRmFjZUNvbmZpZGVuY2VcIjogMCxcclxuICAgICAgICAgICAgXCJGYWNlUGF0aFwiOiBcIi9pbWFnZXMvcmVjb3JkaW5nLzAwMDAtMjcuUE5HXCIsXHJcbiAgICAgICAgICAgIFwiRmFjZVJlY3RcIjogXCJbeydYJzoyNywnWSc6Mjd9LHsnWCc6ODEsJ1knOjI3fSx7J1gnOjgxLCdZJzo4MX0seydYJzoyNywnWSc6MTA3fV1cIixcclxuICAgICAgICAgICAgXCJHZW5kZXJcIjogXCIxXCIsXHJcbiAgICAgICAgICAgIFwiR2xhc3NcIjogLTEsXHJcbiAgICAgICAgICAgIFwiSGFzZXh0cmFjdEF0dHJpYnV0ZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJIYXNleHRyYWN0RmVhdHVyZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJIYXNmYWNlRmVhdHVyZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJJRFwiOiBcIjYuODIxMDlFKzE3XCIsXHJcbiAgICAgICAgICAgIFwiSXNQYW50c1wiOiAwLFxyXG4gICAgICAgICAgICBcIklzU2xlZXZlXCI6IDAsXHJcbiAgICAgICAgICAgIFwiTG9nVGltZVwiOiBcIjIwMTctMDktMjcgMTQ6MTk6MjFcIixcclxuICAgICAgICAgICAgXCJNYXNrXCI6IDAsXHJcbiAgICAgICAgICAgIFwiT3JpZW50YXRpb25cIjogMCxcclxuICAgICAgICAgICAgXCJQZXJzb25Db25maWRlbmNlXCI6IFwiMFwiLFxyXG4gICAgICAgICAgICBcIlNtaWxlXCI6IC0xLFxyXG4gICAgICAgICAgICBcIlN1bkdsYXNzZXNcIjogMCxcclxuICAgICAgICAgICAgXCJUYXNrSURcIjogXCJhMDQ3NGRkODU1NDI0ZWFhOGY4MjBlMWRhMTZhZDI5YWJcIixcclxuICAgICAgICAgICAgXCJUZXh0dXJlXCI6IDAsXHJcbiAgICAgICAgICAgIFwiVXBwZXJDb2xvclwiOiAwLFxyXG4gICAgICAgICAgICBcIlJhY2VcIjogMCxcclxuICAgICAgICAgICAgXCJTY2VuZVBhdGhcIjogXCJMT0M6NDAyMjAxMzIzL2RhdGEvMjAxNzA4MTgvMDAvM2UxZjk2YzY2NWQyMjA0OGVhNGY1MTRiNzYxMTllZDBfNzkxODNcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcIkFnZVwiOiAyOCxcclxuICAgICAgICAgICAgXCJBcmVhSURcIjogXCJhcmVhSWQzM1wiLFxyXG4gICAgICAgICAgICBcIkF0dHJhY3RpdmVcIjogLTEsXHJcbiAgICAgICAgICAgIFwiQm90dG9tQ29sb3JcIjogMCxcclxuICAgICAgICAgICAgXCJDYW1lcmFJRFwiOiBcIuWFs+WxseWkp+mBk+S/neWIqeWbvemZhVwiLFxyXG4gICAgICAgICAgICBcIkZhY2VDb25maWRlbmNlXCI6IDAsXHJcbiAgICAgICAgICAgIFwiRmFjZVBhdGhcIjogXCIvaW1hZ2VzL3JlY29yZGluZy8wMDAwLTI2LlBOR1wiLFxyXG4gICAgICAgICAgICBcIkZhY2VSZWN0XCI6IFwiW3snWCc6MjcsJ1knOjI3fSx7J1gnOjgxLCdZJzoyN30seydYJzo4MSwnWSc6ODF9LHsnWCc6MjcsJ1knOjEwNn1dXCIsXHJcbiAgICAgICAgICAgIFwiR2VuZGVyXCI6IFwiMlwiLFxyXG4gICAgICAgICAgICBcIkdsYXNzXCI6IC0xLFxyXG4gICAgICAgICAgICBcIkhhc2V4dHJhY3RBdHRyaWJ1dGVcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiSGFzZXh0cmFjdEZlYXR1cmVcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiSGFzZmFjZUZlYXR1cmVcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiSURcIjogXCI2LjgyMTA5RSsxN1wiLFxyXG4gICAgICAgICAgICBcIklzUGFudHNcIjogMCxcclxuICAgICAgICAgICAgXCJJc1NsZWV2ZVwiOiAwLFxyXG4gICAgICAgICAgICBcIkxvZ1RpbWVcIjogXCIyMDE3LTA5LTI2IDE0OjE1OjIxXCIsXHJcbiAgICAgICAgICAgIFwiTWFza1wiOiAwLFxyXG4gICAgICAgICAgICBcIk9yaWVudGF0aW9uXCI6IDAsXHJcbiAgICAgICAgICAgIFwiUGVyc29uQ29uZmlkZW5jZVwiOiBcIjBcIixcclxuICAgICAgICAgICAgXCJTbWlsZVwiOiAtMSxcclxuICAgICAgICAgICAgXCJTdW5HbGFzc2VzXCI6IDAsXHJcbiAgICAgICAgICAgIFwiVGFza0lEXCI6IFwiYTA0NzRkZDg1NTQyNGVhYThmODIwZTFkYTE2YWQyOGFiXCIsXHJcbiAgICAgICAgICAgIFwiVGV4dHVyZVwiOiAwLFxyXG4gICAgICAgICAgICBcIlVwcGVyQ29sb3JcIjogMCxcclxuICAgICAgICAgICAgXCJSYWNlXCI6IDAsXHJcbiAgICAgICAgICAgIFwiU2NlbmVQYXRoXCI6IFwiTE9DOjQwMjIwMTMyMy9kYXRhLzIwMTcwODE4LzAwLzNlMWY5NmM2NjVkMjIwNDhlYTRmNTE0Yjc2MTE5ZWQwXzc5MTgzXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJBZ2VcIjogNTksXHJcbiAgICAgICAgICAgIFwiQXJlYUlEXCI6IFwiYXJlYUlkMzJcIixcclxuICAgICAgICAgICAgXCJBdHRyYWN0aXZlXCI6IC0xLFxyXG4gICAgICAgICAgICBcIkJvdHRvbUNvbG9yXCI6IDAsXHJcbiAgICAgICAgICAgIFwiQ2FtZXJhSURcIjogXCLlhbPlsbHlpKfpgZPkv53liKnlm73pmYVcIixcclxuICAgICAgICAgICAgXCJGYWNlQ29uZmlkZW5jZVwiOiAwLFxyXG4gICAgICAgICAgICBcIkZhY2VQYXRoXCI6IFwiL2ltYWdlcy9yZWNvcmRpbmcvMDAwMC0yNS5QTkdcIixcclxuICAgICAgICAgICAgXCJGYWNlUmVjdFwiOiBcIlt7J1gnOjI3LCdZJzoyN30seydYJzo4MSwnWSc6Mjd9LHsnWCc6ODEsJ1knOjgxfSx7J1gnOjI3LCdZJzoxMDV9XVwiLFxyXG4gICAgICAgICAgICBcIkdlbmRlclwiOiBcIjFcIixcclxuICAgICAgICAgICAgXCJHbGFzc1wiOiAtMSxcclxuICAgICAgICAgICAgXCJIYXNleHRyYWN0QXR0cmlidXRlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcIkhhc2V4dHJhY3RGZWF0dXJlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcIkhhc2ZhY2VGZWF0dXJlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcIklEXCI6IFwiNi44MjEwOUUrMTdcIixcclxuICAgICAgICAgICAgXCJJc1BhbnRzXCI6IDAsXHJcbiAgICAgICAgICAgIFwiSXNTbGVldmVcIjogMCxcclxuICAgICAgICAgICAgXCJMb2dUaW1lXCI6IFwiMjAxNy0wOS0yNSAxNDoxMToyMVwiLFxyXG4gICAgICAgICAgICBcIk1hc2tcIjogMCxcclxuICAgICAgICAgICAgXCJPcmllbnRhdGlvblwiOiAwLFxyXG4gICAgICAgICAgICBcIlBlcnNvbkNvbmZpZGVuY2VcIjogXCIwXCIsXHJcbiAgICAgICAgICAgIFwiU21pbGVcIjogMCxcclxuICAgICAgICAgICAgXCJTdW5HbGFzc2VzXCI6IDAsXHJcbiAgICAgICAgICAgIFwiVGFza0lEXCI6IFwiYTA0NzRkZDg1NTQyNGVhYThmODIwZTFkYTE2YWQyN2FiXCIsXHJcbiAgICAgICAgICAgIFwiVGV4dHVyZVwiOiAwLFxyXG4gICAgICAgICAgICBcIlVwcGVyQ29sb3JcIjogMCxcclxuICAgICAgICAgICAgXCJSYWNlXCI6IDAsXHJcbiAgICAgICAgICAgIFwiU2NlbmVQYXRoXCI6IFwiTE9DOjQwMjIwMTMyMy9kYXRhLzIwMTcwODE4LzAwLzNlMWY5NmM2NjVkMjIwNDhlYTRmNTE0Yjc2MTE5ZWQwXzc5MTgzXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJBZ2VcIjogMjUsXHJcbiAgICAgICAgICAgIFwiQXJlYUlEXCI6IFwiYXJlYUlkMzFcIixcclxuICAgICAgICAgICAgXCJBdHRyYWN0aXZlXCI6IC0xLFxyXG4gICAgICAgICAgICBcIkJvdHRvbUNvbG9yXCI6IDAsXHJcbiAgICAgICAgICAgIFwiQ2FtZXJhSURcIjogXCLlhbPlsbHlpKfpgZPkv53liKnlm73pmYVcIixcclxuICAgICAgICAgICAgXCJGYWNlQ29uZmlkZW5jZVwiOiAwLFxyXG4gICAgICAgICAgICBcIkZhY2VQYXRoXCI6IFwiL2ltYWdlcy9yZWNvcmRpbmcvMDAwMC0yNC5QTkdcIixcclxuICAgICAgICAgICAgXCJGYWNlUmVjdFwiOiBcIlt7J1gnOjI3LCdZJzoyN30seydYJzo4MSwnWSc6Mjd9LHsnWCc6ODEsJ1knOjgxfSx7J1gnOjI3LCdZJzoxMDR9XVwiLFxyXG4gICAgICAgICAgICBcIkdlbmRlclwiOiBcIjJcIixcclxuICAgICAgICAgICAgXCJHbGFzc1wiOiAxLFxyXG4gICAgICAgICAgICBcIkhhc2V4dHJhY3RBdHRyaWJ1dGVcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiSGFzZXh0cmFjdEZlYXR1cmVcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiSGFzZmFjZUZlYXR1cmVcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiSURcIjogXCI2LjgyMTA5RSsxN1wiLFxyXG4gICAgICAgICAgICBcIklzUGFudHNcIjogMCxcclxuICAgICAgICAgICAgXCJJc1NsZWV2ZVwiOiAwLFxyXG4gICAgICAgICAgICBcIkxvZ1RpbWVcIjogXCIyMDE3LTA5LTI0IDE0OjA3OjIxXCIsXHJcbiAgICAgICAgICAgIFwiTWFza1wiOiAwLFxyXG4gICAgICAgICAgICBcIk9yaWVudGF0aW9uXCI6IDAsXHJcbiAgICAgICAgICAgIFwiUGVyc29uQ29uZmlkZW5jZVwiOiBcIjBcIixcclxuICAgICAgICAgICAgXCJTbWlsZVwiOiAtMSxcclxuICAgICAgICAgICAgXCJTdW5HbGFzc2VzXCI6IDAsXHJcbiAgICAgICAgICAgIFwiVGFza0lEXCI6IFwiYTA0NzRkZDg1NTQyNGVhYThmODIwZTFkYTE2YWQyNmFiXCIsXHJcbiAgICAgICAgICAgIFwiVGV4dHVyZVwiOiAwLFxyXG4gICAgICAgICAgICBcIlVwcGVyQ29sb3JcIjogMCxcclxuICAgICAgICAgICAgXCJSYWNlXCI6IDAsXHJcbiAgICAgICAgICAgIFwiU2NlbmVQYXRoXCI6IFwiTE9DOjQwMjIwMTMyMy9kYXRhLzIwMTcwODE4LzAwLzNlMWY5NmM2NjVkMjIwNDhlYTRmNTE0Yjc2MTE5ZWQwXzc5MTgzXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJBZ2VcIjogMTQsXHJcbiAgICAgICAgICAgIFwiQXJlYUlEXCI6IFwiYXJlYUlkMzBcIixcclxuICAgICAgICAgICAgXCJBdHRyYWN0aXZlXCI6IC0xLFxyXG4gICAgICAgICAgICBcIkJvdHRvbUNvbG9yXCI6IDAsXHJcbiAgICAgICAgICAgIFwiQ2FtZXJhSURcIjogXCLlhbPlsbHlpKfpgZPkv53liKnlm73pmYVcIixcclxuICAgICAgICAgICAgXCJGYWNlQ29uZmlkZW5jZVwiOiAwLFxyXG4gICAgICAgICAgICBcIkZhY2VQYXRoXCI6IFwiL2ltYWdlcy9yZWNvcmRpbmcvMDAwMC0yMy5QTkdcIixcclxuICAgICAgICAgICAgXCJGYWNlUmVjdFwiOiBcIlt7J1gnOjI3LCdZJzoyN30seydYJzo4MSwnWSc6Mjd9LHsnWCc6ODEsJ1knOjgxfSx7J1gnOjI3LCdZJzoxMDN9XVwiLFxyXG4gICAgICAgICAgICBcIkdlbmRlclwiOiBcIjJcIixcclxuICAgICAgICAgICAgXCJHbGFzc1wiOiAtMSxcclxuICAgICAgICAgICAgXCJIYXNleHRyYWN0QXR0cmlidXRlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcIkhhc2V4dHJhY3RGZWF0dXJlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcIkhhc2ZhY2VGZWF0dXJlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcIklEXCI6IFwiNi44MjEwOUUrMTdcIixcclxuICAgICAgICAgICAgXCJJc1BhbnRzXCI6IDAsXHJcbiAgICAgICAgICAgIFwiSXNTbGVldmVcIjogMCxcclxuICAgICAgICAgICAgXCJMb2dUaW1lXCI6IFwiMjAxNy0wOS0yMyAxNDowMzoyMVwiLFxyXG4gICAgICAgICAgICBcIk1hc2tcIjogMCxcclxuICAgICAgICAgICAgXCJPcmllbnRhdGlvblwiOiAwLFxyXG4gICAgICAgICAgICBcIlBlcnNvbkNvbmZpZGVuY2VcIjogXCIwXCIsXHJcbiAgICAgICAgICAgIFwiU21pbGVcIjogLTEsXHJcbiAgICAgICAgICAgIFwiU3VuR2xhc3Nlc1wiOiAwLFxyXG4gICAgICAgICAgICBcIlRhc2tJRFwiOiBcImEwNDc0ZGQ4NTU0MjRlYWE4ZjgyMGUxZGExNmFkMjVhYlwiLFxyXG4gICAgICAgICAgICBcIlRleHR1cmVcIjogMCxcclxuICAgICAgICAgICAgXCJVcHBlckNvbG9yXCI6IDAsXHJcbiAgICAgICAgICAgIFwiUmFjZVwiOiAwLFxyXG4gICAgICAgICAgICBcIlNjZW5lUGF0aFwiOiBcIkxPQzo0MDIyMDEzMjMvZGF0YS8yMDE3MDgxOC8wMC8zZTFmOTZjNjY1ZDIyMDQ4ZWE0ZjUxNGI3NjExOWVkMF83OTE4M1wiXHJcbiAgICAgICAgfVxyXG4gICAgXTtcclxuICAgIGxldCBtb2NrTGlzdCA9IFtdIGFzIEFycmF5PGZhY2U+O1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzMCAmJiBpIDwgbnVtOyBpKyspIHtcclxuICAgICAgICBtb2NrTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgXCJBY2Nlc3NMb2dcIjogbW9ja1tpXSxcclxuICAgICAgICAgICAgXCJEZXZpY2VUeXBlXCI6IFwiQ2FtZXJhXCIsXHJcbiAgICAgICAgICAgIFwiY29sbGVjdFN0YXR1c1wiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJzdXJ2ZWlsbGFuY2VTdGF0dXNcIjogZmFsc2VcclxuICAgICAgICB9IGFzIGZhY2UpO1xyXG4gICAgfVxyXG4gICAgcXVlcnlSZXN1bHQuZGF0YSA9IG1vY2tMaXN0O1xyXG4gICAgcmV0dXJuIHF1ZXJ5UmVzdWx0O1xyXG59XHJcblxyXG4vLyDliJ3lp4vljJZ3aWZp5pWw5o2uXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0V2lmaVJlc3VsdChudW06IG51bWJlcik6IHdpZmlJdGVtIHtcclxuICAgIGxldCBxdWVyeVJlc3VsdCA9IHt9IGFzIHdpZmlJdGVtO1xyXG4gICAgcXVlcnlSZXN1bHQuZGF0YSA9IFtdO1xyXG4gICAgbGV0IHBhZ2VQYXJhbXMgPSBuZXcgUGFnZVBhcmFtcygpO1xyXG4gICAgcGFnZVBhcmFtcy5wYWdlU2l6ZSA9IDY7XHJcbiAgICBwYWdlUGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgIHBhZ2VQYXJhbXMudG90YWxDb3VudCA9IDMwO1xyXG4gICAgcGFnZVBhcmFtcy5wYWdlQ291bnQgPSA1O1xyXG4gICAgcXVlcnlSZXN1bHQucGFnZVBhcmFtcyA9IHBhZ2VQYXJhbXM7XHJcbiAgICBxdWVyeVJlc3VsdC5kYXRhID0gW107XHJcbiAgICByZXR1cm4gcXVlcnlSZXN1bHQ7XHJcbn1cclxuXHJcbi8vIOWIneWni+WMlueUteWbtOaVsOaNrlxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdEVsZWN0cm9uaWNSZXN1bHQoKTogZWxlY3Ryb25pY0l0ZW0ge1xyXG4gICAgbGV0IHF1ZXJ5UmVzdWx0ID0ge30gYXMgZWxlY3Ryb25pY0l0ZW07XHJcbiAgICBxdWVyeVJlc3VsdC5kYXRhID0gW107XHJcbiAgICBsZXQgcGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKCk7XHJcbiAgICBwYWdlUGFyYW1zLnBhZ2VTaXplID0gNTtcclxuICAgIHBhZ2VQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgcGFnZVBhcmFtcy50b3RhbENvdW50ID0gMDtcclxuICAgIHBhZ2VQYXJhbXMucGFnZUNvdW50ID0gMDtcclxuICAgIHF1ZXJ5UmVzdWx0LnBhZ2VQYXJhbXMgPSBwYWdlUGFyYW1zO1xyXG5cclxuICAgIHJldHVybiBxdWVyeVJlc3VsdDtcclxufVxyXG5cclxuLy8g5Yid5aeL5YyW6K6+5aSH5pWw5o2uXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0RGV2aWNlUmVzdWx0KHR5cGU6IHN0cmluZyk6IGRldmljZUl0ZW0ge1xyXG4gICAgbGV0IHF1ZXJ5UmVzdWx0ID0ge30gYXMgZGV2aWNlSXRlbTtcclxuICAgIHF1ZXJ5UmVzdWx0LmRhdGEgPSBbXTtcclxuICAgIGxldCBwYWdlUGFyYW1zID0gbmV3IFBhZ2VQYXJhbXMoKTtcclxuICAgIHBhZ2VQYXJhbXMucGFnZVNpemUgPSA1O1xyXG4gICAgcGFnZVBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICBwYWdlUGFyYW1zLnRvdGFsQ291bnQgPSAwO1xyXG4gICAgcGFnZVBhcmFtcy5wYWdlQ291bnQgPSAwO1xyXG4gICAgcXVlcnlSZXN1bHQucGFnZVBhcmFtcyA9IHBhZ2VQYXJhbXM7XHJcblxyXG4gICAgLy8gLy8g5qih5ouf5pWw5o2uXHJcbiAgICAvLyBsZXQgbW9jayA9IHtcIklkXCI6IFwiZGYwMDAxXCIsIFwiQXJlYUlkXCI6IFwiMVwiLCBcIkNvZGVcIjogXCJTU0ZEVzQyNVwiLCBcIklwQWRkcmVzc1wiOiBcIuWFs+WxseWkp+mBk+S/neWIqeWbvemZhVwiLCBcIk9iamVjdFR5cGVcIjogXCJXSUZJXCIsIFwiRGlyZWN0XCI6IFwiMVwiLCBcIkxhdFwiOiBcIjExNC40MTczNjZcIiwgXCJMb25cIjogXCIzMC40OTczMzNcIiwgXCJOYW1lXCI6IFwi5YWz5bGx5aSn6YGT5L+d5Yip5Zu96ZmFLVNTRkRXNDI1XCIsIFwiQnVpbGRMb2NhdGlvblwiOiBcIjFcIiwgXCJjb2xsZWN0U3RhdHVzXCI6IGZhbHNlfTtcclxuICAgIC8vIGxldCBtb2NrTGlzdCA9IFtdO1xyXG4gICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgIC8vICAgICBtb2NrLkNvZGUgPSB0eXBlICsgJy0nICsgbW9jay5Db2RlO1xyXG4gICAgLy8gICAgIG1vY2suT2JqZWN0VHlwZSA9IHR5cGU7XHJcbiAgICAvLyAgICAgbW9ja0xpc3QucHVzaChtb2NrKTtcclxuICAgIC8vIH1cclxuICAgIC8vIHF1ZXJ5UmVzdWx0LmRhdGEgPSBtb2NrTGlzdDtcclxuXHJcbiAgICByZXR1cm4gcXVlcnlSZXN1bHQ7XHJcbn1cclxuXHJcbi8vIOWIneWni+WMluS9jee9ruaVsOaNrlxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFBvc2l0aW9uUmVzdWx0KCk6IHBvc2l0aW9uSXRlbSB7XHJcbiAgICBsZXQgcXVlcnlSZXN1bHQgPSB7fSBhcyBwb3NpdGlvbkl0ZW07XHJcbiAgICBxdWVyeVJlc3VsdC5kYXRhID0gW107XHJcbiAgICBsZXQgcGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKCk7XHJcbiAgICBwYWdlUGFyYW1zLnBhZ2VTaXplID0gMTA7XHJcbiAgICBwYWdlUGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgIHBhZ2VQYXJhbXMudG90YWxDb3VudCA9IDA7XHJcbiAgICBwYWdlUGFyYW1zLnBhZ2VDb3VudCA9IDA7XHJcbiAgICBxdWVyeVJlc3VsdC5wYWdlUGFyYW1zID0gcGFnZVBhcmFtcztcclxuXHJcbiAgICBxdWVyeVJlc3VsdC5kYXRhID0gW107XHJcblxyXG4gICAgcmV0dXJuIHF1ZXJ5UmVzdWx0O1xyXG59XHJcblxyXG4vLyDmt7vliqDmlLbol4/lj4LmlbBcclxuZXhwb3J0IGludGVyZmFjZSBDb2xsZWN0QWRkUGFyYW1zIHtcclxuICAgIGpzb246IHN0cmluZyxcclxuICAgIG9iamVjdElEOiBzdHJpbmcsXHJcbiAgICBvYmplY3RUeXBlOiBzdHJpbmdcclxufVxyXG5cclxuLy8g5Yig6Zmk5pS26JeP5Y+C5pWwXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29sbGVjdERlbGV0ZVBhcmFtcyB7XHJcbiAgICBpZHM6IHN0cmluZ1xyXG59XHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uIOiuoeeul+WuveW6plxyXG4gKiBAcmV0dXJucyB7U2l6ZX1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRXaWRvd1NpemUoKTogU2l6ZSB7XHJcbiAgICBsZXQgc2l6ZSA9IG5ldyBTaXplKCk7XHJcbiAgICBzaXplLndpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XHJcbiAgICBzaXplLmhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcclxuICAgIHJldHVybiBzaXplO1xyXG59XHJcblxyXG4vKipcclxuICpcclxuICogQGRlc2NyaXB0aW9uIOiuvue9ruafpeivouWOhuWPsuaVsOaNrlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcbiAqIEByZXR1cm5zIHtBcnJheTxRdWVyeUl0ZW0+fVxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBTZXRRdWVyeVJlY29yZChzdHI6IHN0cmluZyk6IEFycmF5PFF1ZXJ5SXRlbT4ge1xyXG4gICAgbGV0IHZhbHVlOiBzdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmVzb3VyY2VSZXRyaWV2YWxRdWVyeVJlY29yZCcpO1xyXG4gICAgbGV0IHF1ZXJ5UmVjb3JkID0gW10gYXMgQXJyYXk8UXVlcnlJdGVtPjtcclxuICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxRdWVyeUl0ZW0+O1xyXG5cclxuICAgIGlmIChzdHIgJiYgc3RyICE9ICd1bmRlZmluZWQnICYmIHN0ciAhPSAnbnVsbCcgJiYgc3RyICE9ICcnKSB7XHJcbiAgICAgICAgYXJyLnB1c2goe2lkOiAwLCB2YWx1ZTogc3RyfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHZhbHVlICYmIHZhbHVlICE9ICd1bmRlZmluZWQnICYmIHZhbHVlICE9ICdudWxsJykge1xyXG4gICAgICAgIHF1ZXJ5UmVjb3JkID0gSlNPTi5wYXJzZSh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWVyeVJlY29yZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChhcnIubGVuZ3RoIDwgMjApIHtcclxuICAgICAgICAgICAgLy8g5Y676Zmk6YeN5aSN5pCc57SiXHJcbiAgICAgICAgICAgIGlmIChhcnJbMF0udmFsdWUgIT09IHF1ZXJ5UmVjb3JkW2ldLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaCh7aWQ6IGkgKyAxLCB2YWx1ZTogcXVlcnlSZWNvcmRbaV0udmFsdWUudG9TdHJpbmcoKX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZXNvdXJjZVJldHJpZXZhbFF1ZXJ5UmVjb3JkJywgSlNPTi5zdHJpbmdpZnkoYXJyKSk7XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBkZXNjcmlwdGlvbiDorr7nva7mn6Xor6Lljoblj7LmlbDmja5cclxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG4gKiBAcmV0dXJucyB7QXJyYXk8UXVlcnlJdGVtPn1cclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gU2V0U2VhcmNoUmVjb3JkKHN0cjogc3RyaW5nKTogQXJyYXk8UXVlcnlJdGVtPiB7XHJcbiAgICBsZXQgdmFsdWU6IHN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdTZXRTZWFyY2hSZWNvcmQnKTtcclxuICAgIGxldCBxdWVyeVJlY29yZCA9IFtdIGFzIEFycmF5PFF1ZXJ5SXRlbT47XHJcbiAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8UXVlcnlJdGVtPjtcclxuXHJcbiAgICBpZiAoc3RyICYmIHN0ciAhPSAndW5kZWZpbmVkJyAmJiBzdHIgIT0gJ251bGwnICYmIHN0ciAhPSAnJykge1xyXG4gICAgICAgIGFyci5wdXNoKHtpZDogMCwgdmFsdWU6IHN0cn0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPSAndW5kZWZpbmVkJyAmJiB2YWx1ZSAhPSAnbnVsbCcpIHtcclxuICAgICAgICBxdWVyeVJlY29yZCA9IEpTT04ucGFyc2UodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlcnlSZWNvcmQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoYXJyLmxlbmd0aCA8IDIwKSB7XHJcbiAgICAgICAgICAgIC8vIOWOu+mZpOmHjeWkjeaQnOe0olxyXG4gICAgICAgICAgICBpZiAoYXJyWzBdLnZhbHVlICE9PSBxdWVyeVJlY29yZFtpXS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2goe2lkOiBpICsgMSwgdmFsdWU6IHF1ZXJ5UmVjb3JkW2ldLnZhbHVlLnRvU3RyaW5nKCl9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVzb3VyY2VSZXRyaWV2YWxRdWVyeVJlY29yZCcsIEpTT04uc3RyaW5naWZ5KGFycikpO1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAZGVzY3JpcHRpb24g6I635Y+W5p+l6K+i5Y6G5Y+yXHJcbiAqIEByZXR1cm5zIHtBcnJheTxRdWVyeUl0ZW0+fVxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBHZXRRdWVyeVJlY29yZCgpOiBBcnJheTxRdWVyeUl0ZW0+IHtcclxuICAgIGxldCB2YWx1ZTogc3RyaW5nID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Jlc291cmNlUmV0cmlldmFsUXVlcnlSZWNvcmQnKTtcclxuICAgIGxldCBxdWVyeVJlY29yZCA9IFtdIGFzIEFycmF5PFF1ZXJ5SXRlbT47XHJcbiAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8UXVlcnlJdGVtPjtcclxuICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPSAndW5kZWZpbmVkJyAmJiB2YWx1ZSAhPSAnbnVsbCcpIHtcclxuICAgICAgICBxdWVyeVJlY29yZCA9IEpTT04ucGFyc2UodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlcnlSZWNvcmQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBhcnIucHVzaChxdWVyeVJlY29yZFtpXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyXHJcbn1cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAZGVzY3JpcHRpb24g5riF6Zmk5pCc57Si6K6w5b2V57yT5a2YXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIENsZWFyUXVlcnlSZWNvcmQoKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgncmVzb3VyY2VSZXRyaWV2YWxRdWVyeVJlY29yZCcpO1xyXG59XHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9u6K6+572u5Y6G5Y+y5pCc57Si6K6w5b2VXHJcbiAqIEBwYXJhbSBxdWVyeVBhcmFtXHJcbiAqIEByZXR1cm5zIHtBcnJheTxhbnk+fVxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBTZXRIaXN0b3J5UXVlcnlSZWNvcmQocXVlcnlQYXJhbTogYW55KTogQXJyYXk8YW55PiB7XHJcbiAgICBsZXQgdmFsdWU6IHN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdIaXN0b3J5UXVlcnlSZWNvcmQnKTtcclxuICAgIGxldCBxdWVyeVJlY29yZCA9IFtdIGFzIEFycmF5PGFueT47XHJcbiAgICBsZXQgc3RyOiBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeShxdWVyeVBhcmFtKTtcclxuICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxhbnk+O1xyXG5cclxuICAgIGlmIChzdHIgJiYgc3RyICE9ICd1bmRlZmluZWQnICYmIHN0ciAhPSAnbnVsbCcgJiYgc3RyICE9ICcnKSB7XHJcbiAgICAgICAgYXJyLnB1c2goe2lkOiAwLCB2YWx1ZTogc3RyfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHZhbHVlICYmIHZhbHVlICE9ICd1bmRlZmluZWQnICYmIHZhbHVlICE9ICdudWxsJykge1xyXG4gICAgICAgIHF1ZXJ5UmVjb3JkID0gSlNPTi5wYXJzZSh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWVyeVJlY29yZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChhcnIubGVuZ3RoIDwgNikge1xyXG4gICAgICAgICAgICAvLyDljrvpmaTph43lpI3mkJzntKJcclxuICAgICAgICAgICAgaWYgKGFyclswXS52YWx1ZSAhPT0gcXVlcnlSZWNvcmRbaV0udmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKHtpZDogaSArIDEsIHZhbHVlOiBxdWVyeVJlY29yZFtpXS52YWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdIaXN0b3J5UXVlcnlSZWNvcmQnLCBKU09OLnN0cmluZ2lmeShhcnIpKTtcclxuICAgIHJldHVybiBhcnI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAZGVzY3JpcHRpb24g6I635Y+W5LiK5qyh5qOA57Si5p2h5Lu2XHJcbiAqIEBwYXJhbSBxdWVyeVBhcmFtXHJcbiAqIEByZXR1cm5zIHthbnl9XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIEdldExhc3RRdWVyeVJlY29yZCgpOiBhbnkge1xyXG4gICAgbGV0IHZhbHVlOiBzdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnSGlzdG9yeVF1ZXJ5UmVjb3JkJyk7XHJcbiAgICBsZXQgcXVlcnlSZWNvcmQgPSBbXSBhcyBBcnJheTxhbnk+O1xyXG4gICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PGFueT47XHJcbiAgICBsZXQgcXVlcnlEYXRhOmFueTtcclxuXHJcblxyXG4gICAgaWYgKHZhbHVlICYmIHZhbHVlICE9ICd1bmRlZmluZWQnICYmIHZhbHVlICE9ICdudWxsJykge1xyXG4gICAgICAgIHF1ZXJ5UmVjb3JkID0gSlNPTi5wYXJzZSh2YWx1ZSk7XHJcbiAgICAgICAgcXVlcnlEYXRhID0gcXVlcnlSZWNvcmRbMV07XHJcbiAgICB9ZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDI7IGkgPCBxdWVyeVJlY29yZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGFyci5wdXNoKHF1ZXJ5UmVjb3JkW2ldKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnSGlzdG9yeVF1ZXJ5UmVjb3JkJywgSlNPTi5zdHJpbmdpZnkoYXJyKSk7XHJcbiAgICByZXR1cm4gcXVlcnlEYXRhO1xyXG59XHJcblxyXG4vLyDmgKfliKvliJfooahcclxuZXhwb3J0IGNvbnN0IEFtYml0dXNJbmZvOiBBcnJheTxRdWVyeUl0ZW0+ID0gW1xyXG4gICAge1xyXG4gICAgICAgIGlkOiAwLFxyXG4gICAgICAgIHZhbHVlOiBcIui9pui+hiBcIixcclxuICAgICAgICBrZXk6IFwiQ2FyXCIsXHJcbiAgICAgICAgc3RhdHVzOiBmYWxzZVxyXG4gICAgfSx7XHJcbiAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgdmFsdWU6IFwi5Lq65YOPXCIsXHJcbiAgICAgICAga2V5OiBcIkZhY2VcIixcclxuICAgICAgICBzdGF0dXM6IGZhbHNlXHJcbiAgICB9LHtcclxuICAgICAgICBpZDogMixcclxuICAgICAgICB2YWx1ZTogXCJXSUZJXCIsXHJcbiAgICAgICAga2V5OiBcIldpRmlcIixcclxuICAgICAgICBzdGF0dXM6IGZhbHNlXHJcbiAgICB9LHtcclxuICAgICAgICBpZDogMyxcclxuICAgICAgICB2YWx1ZTogXCLnlLXlm7RcIixcclxuICAgICAgICBrZXk6IFwiRUZFTkNFXCIsXHJcbiAgICAgICAgc3RhdHVzOiBmYWxzZVxyXG4gICAgfV07XHJcblxyXG5cclxuLy8g5Lq65ZGY5qGj5qGI5Y+C5pWwXHJcbmV4cG9ydCBjbGFzcyBQZXJzaW9uTGlicmFyeUVudW17XHJcbiAgICBMaWJJZDogc3RyaW5nO1xyXG4gICAgTGliTmFtZTogc3RyaW5nO1xyXG4gICAgUGVyc29uSW5mbzogYW55O1xyXG4gICAgUGVyc29uTWVtbzogc3RyaW5nO1xyXG4gICAgU2NvcmU6IG51bWJlcjtcclxufSJdfQ==
