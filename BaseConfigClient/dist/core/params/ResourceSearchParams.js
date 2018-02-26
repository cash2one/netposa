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
define(["require", "exports", "./table/TableParams"], function (require, exports, TableParams_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OrderBy = (function () {
        function OrderBy() {
            this.isAsc = false;
        }
        return OrderBy;
    }());
    exports.default = OrderBy;
    var BaseSearchModel = (function (_super) {
        __extends(BaseSearchModel, _super);
        function BaseSearchModel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BaseSearchModel;
    }(TableParams_1.TableParams));
    exports.BaseSearchModel = BaseSearchModel;
    var QuickSearchParams = (function (_super) {
        __extends(QuickSearchParams, _super);
        function QuickSearchParams() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return QuickSearchParams;
    }(BaseSearchModel));
    exports.QuickSearchParams = QuickSearchParams;
    var SearchFaceParams = (function (_super) {
        __extends(SearchFaceParams, _super);
        function SearchFaceParams() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SearchFaceParams;
    }(BaseSearchModel));
    exports.SearchFaceParams = SearchFaceParams;
    var SearchMacParams = (function (_super) {
        __extends(SearchMacParams, _super);
        function SearchMacParams() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SearchMacParams;
    }(BaseSearchModel));
    exports.SearchMacParams = SearchMacParams;
    exports.ResourceDeviceProcNames = {
        CameraDeviceSearchProcName: { "text": "获取摄像机设备存储过程名称", "value": "PROC_GET_CAMERA(?,?,?,?)" },
        RmpGateDeviceSearchProcName: { "text": "获取卡口设备存储过程名称", "value": "PROC_GET_RMPGATE(?,?,?,?)" },
        WiFiDeviceSearchProcName: { "text": "获取WiFi设备存储过程名称", "value": "PROC_GET_WIFIDEVICE(?,?,?,?)" },
        EFenceDeviceSearchProcName: { "text": "获取电子围栏设备存储过程名称", "value": "PROC_GET_EFENCEDEVICE(?,?,?,?)" }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL3BhcmFtcy9SZXNvdXJjZVNlYXJjaFBhcmFtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBS0E7UUFBQTtZQUlJLFVBQUssR0FBWSxLQUFLLENBQUM7UUFDM0IsQ0FBQztRQUFELGNBQUM7SUFBRCxDQUxBLEFBS0MsSUFBQTs7SUFJRDtRQUFxQyxtQ0FBVztRQUFoRDs7UUEwQkEsQ0FBQztRQUFELHNCQUFDO0lBQUQsQ0ExQkEsQUEwQkMsQ0ExQm9DLHlCQUFXLEdBMEIvQztJQTFCWSwwQ0FBZTtJQW1DNUI7UUFBdUMscUNBQWU7UUFBdEQ7O1FBeUNBLENBQUM7UUFBRCx3QkFBQztJQUFELENBekNBLEFBeUNDLENBekNzQyxlQUFlLEdBeUNyRDtJQXpDWSw4Q0FBaUI7SUE2QzlCO1FBQXNDLG9DQUFlO1FBQXJEOztRQTBEQSxDQUFDO1FBQUQsdUJBQUM7SUFBRCxDQTFEQSxBQTBEQyxDQTFEcUMsZUFBZSxHQTBEcEQ7SUExRFksNENBQWdCO0lBNkQ3QjtRQUFxQyxtQ0FBZTtRQUFwRDs7UUE0QkEsQ0FBQztRQUFELHNCQUFDO0lBQUQsQ0E1QkEsQUE0QkMsQ0E1Qm9DLGVBQWUsR0E0Qm5EO0lBNUJZLDBDQUFlO0lBaUNmLFFBQUEsdUJBQXVCLEdBQUc7UUFFbkMsMEJBQTBCLEVBQUUsRUFBQyxNQUFNLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSwwQkFBMEIsRUFBQztRQUUxRiwyQkFBMkIsRUFBRSxFQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLDJCQUEyQixFQUFDO1FBRTNGLHdCQUF3QixFQUFFLEVBQUMsTUFBTSxFQUFFLGdCQUFnQixFQUFFLE9BQU8sRUFBRSw4QkFBOEIsRUFBQztRQUU3RiwwQkFBMEIsRUFBRSxFQUFDLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUM7S0FDcEcsQ0FBQSIsImZpbGUiOiJjb3JlL3BhcmFtcy9SZXNvdXJjZVNlYXJjaFBhcmFtcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VGFibGVQYXJhbXN9IGZyb20gXCIuL3RhYmxlL1RhYmxlUGFyYW1zXCI7XHJcblxyXG4vKipcclxuICog5o6S5bqP5a+56LGhLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJCeSB7XHJcbiAgICAvL+aOkuW6j+Wtl+auteWQjVxyXG4gICAgZmllbGROYW1lOiBzdHJpbmc7XHJcbiAgICAvL+aYr+WQpuS4uuWNh+W6j1xyXG4gICAgaXNBc2M6IGJvb2xlYW4gPSBmYWxzZTtcclxufVxyXG5cclxuXHJcbi8vIOS7peWbvuaQnOWbvuafpeivouWfuuehgOexu1xyXG5leHBvcnQgY2xhc3MgQmFzZVNlYXJjaE1vZGVsIGV4dGVuZHMgVGFibGVQYXJhbXMge1xyXG4gICAgICAgICAgXHJcbiAgICAvKipcclxuICAgICAqIOaQnOe0ouaWh+acrOahhi5cclxuICAgICAqL1xyXG4gICAga2V5V29yZDogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Lu75YqhSUQuXHJcbiAgICAgKi9cclxuICAgIHRhc2tJZDogc3RyaW5nO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuesrOS4gOasoeafpeivoi5cclxuICAgICAqL1xyXG4gICAgaXNGaXJzdFNlYXJjaDogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOafpeivouaXpeacn+exu+Weiy5cclxuICAgICAqL1xyXG4gICAgZGF0ZVR5cGU6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWMheWQq0ZpZWxkTmFtZe+8iOaOkuW6j+Wtl+aute+8ieOAgUlzQXNj77yI5piv5ZCm5Y2H5bqP77yJ77yM6buY6K6k5Li66ZmN5bqPREVTXHJcbiAgICAgKi8gXHJcbiAgICBPcmRlckJ5OiBPcmRlckJ5O1xyXG59XHJcblxyXG4vKipcclxuICog5b+r6YCf5qOA57Si5p+l6K+i5Y+C5pWwLlxyXG4gKiBjcmVhdGUgYnkgem1wLlxyXG4gKiBAdGltZTogMjAxNy0wOC0yOVxyXG4gKi9cclxuXHJcbiAvLyDlv6vpgJ/mo4DntKLlhbPplK7lrZfmo4DntKLlj4LmlbBcclxuZXhwb3J0IGNsYXNzIFF1aWNrU2VhcmNoUGFyYW1zIGV4dGVuZHMgQmFzZVNlYXJjaE1vZGVsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOi1hOa6kOexu+Wei1xyXG4gICAgICovXHJcbiAgICBvYmplY3RUeXBlOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5YWz6ZSu5a2X5pWw5o2u57G75Z6L5aaC77yaTUFD44CB6L2m54mM562J5paH5pysLlxyXG4gICAgICovXHJcbiAgICBkYXRhVHlwZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Lu75YqhSUTliIbpobXnmoTml7blgJnkvb/nlKguXHJcbiAgICAgKi9cclxuICAgIHRhc2tJRDogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5p+l6K+i5pel5pyf5byA5aeL5pe26Ze0LlxyXG4gICAgICovXHJcbiAgICBiZWdpblRpbWU6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIOafpeivouaXpeacn+e7k+adn+aXtumXtC5cclxuICAgICAqL1xyXG4gICAgZW5kVGltZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yy65Z+fSUQuXHJcbiAgICAgKi9cclxuICAgIGFyZWFJZDogQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvuWkh+WvueixoUlE5pWw57uEXHJcbiAgICAgKi9cclxuICAgIGFyck9iamVjdElEOiBBcnJheTxzdHJpbmc+O1xyXG4gICAgLyoqXHJcbiAgICAgKiDnlKjmiLdpZFxyXG4gICAgICovXHJcbiAgICB1c2VySWQ6c3RyaW5nO1xyXG5cclxufVxyXG5cclxuXHJcbi8vIOW/q+mAn+ajgOe0ouOAgemrmOe6p+ajgOe0oi3kurrohLjmo4DntKLlj4LmlbDlrp7kvZNcclxuZXhwb3J0IGNsYXNzIFNlYXJjaEZhY2VQYXJhbXMgZXh0ZW5kcyBCYXNlU2VhcmNoTW9kZWwge1xyXG5cclxuICAgIC8vIOS4iuS8oOeahOWbvueJh1VSTOWcsOWdgFxyXG4gICAgaW1hZ2VQYXRoOiBzdHJpbmc7XHJcblxyXG4gICAgLy8g6LW35aeL5pe26Ze0XHJcbiAgICBzdGFydFRpbWU6IHN0cmluZztcclxuXHJcbiAgICAvLyDnu5PmnZ/ml7bpl7RcclxuICAgIGVuZFRpbWU6IHN0cmluZztcclxuXHJcbiAgICAvLyDnm7jkvLzluqbpmIDlgLxcclxuICAgIHRocmVzaG9sZDogbnVtYmVyO1xyXG5cclxuICAgIC8vIOaAp+WIqyBHZW5kZXJUeXBl5p6a5Li+XHJcbiAgICBhcnJHZW5kZXI6IEFycmF5PHN0cmluZz47XHJcblxyXG4gICAgLy8g5pyA5bCP5bm06b6EXHJcbiAgICBtaW5BZ2U6IG51bWJlcjtcclxuXHJcbiAgICAvLyDmnIDlpKflubTpvoRcclxuICAgIG1heEFnZTogbnVtYmVyO1xyXG5cclxuICAgIC8vIOaYr+WQpuaItOecvOmVnCDnqbo65YWo6YOoLCAw77ya5rKh5oi077yMMe+8muaItO+8jC0xOuacquefpVxyXG4gICAgYXJyRXllR2xhc3NlczogQXJyYXk8bnVtYmVyPjtcclxuXHJcbiAgICAvLyDmmK/lkKblvq7nrJHvvIww77ya5ZCm77yMMe+8muaYr++8jC0xOuacquefpVxyXG4gICAgYXJyU21pbGU6IEFycmF5PG51bWJlcj47XHJcblxyXG4gICAgLy8g5piv5ZCm5bim5Y+j572pICDnqbo65YWo6YOoLCAw77ya5rKh5oi077yMMe+8muaItO+8jC0xOuacquefpVxyXG4gICAgYXJyTWFzazogQXJyYXk8bnVtYmVyPjtcclxuXHJcbiAgICAvLyDmmK/lkKbnqb/nn63oo6QgIDDvvJrlkKbvvIwx77ya5pivXHJcbiAgICBhcnJJc1BhbnRzOiBBcnJheTxudW1iZXI+O1xyXG5cclxuICAgIC8vIOaYr+WQpuepv+efreiiliAw77ya5ZCm77yMMe+8muaYr1xyXG4gICAgYXJySXNTbGVldmU6IEFycmF5PG51bWJlcj47XHJcblxyXG4gICAgLy8g5qih5byP77ya5YWo6YOo44CB5Lq66IS444CB5Lq65L2T44CB5Lq65YOP5qOA57SiXHJcbiAgICBhcnJUeXBlOiBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgIC8vIOWPkeWei++8mumVv+WPkeOAgeS4remVv+WPkeOAgeefreWPkeOAgeeng+WktOOAgeadn+WPkeOAgeacquefpVxyXG4gICAgYXJySGFpclR5cGU6IEFycmF5PHN0cmluZz47XHJcblxyXG4gICAgLy8g5Y+R5Z6L77ya6ZW/5Y+R44CB5Lit6ZW/5Y+R44CB55+t5Y+R44CB56eD5aS044CB5p2f5Y+R44CB5pyq55+lXHJcbiAgICBhcnJDYXJyeVRoaW5nczogQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICAvLyDmmK/lkKbmiLTluL3lrZAg56m6OuWFqOmDqCwgMO+8muayoeaItO+8jDHvvJrmiLTvvIwtMTrmnKrnn6VcclxuICAgIGFyckhhdDogQXJyYXk8bnVtYmVyPjtcclxuXHJcbiAgICAvLyDpnovlrZDvvJrlhajpg6jjgIHov5DliqjpnovjgIHnmq7pnovjgIHmi5bpnovjgIHlh4npnovjgIHmnKrnn6VcclxuICAgIGFyclNob2VzOiBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgIC8vIOWMuuWfn0lE5pWw57uE77yMU3RyaW5nW13nsbvlnovvvIznsbvmupDkuo7kuJrliqHns7vnu59cclxuICAgIGFyckFyZWFJRDogQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICAvLyDmipPmi43nm7jmnLpJROmbhuWQiFxyXG4gICAgYXJyQ2FtZXJhSWQ6IEFycmF5PHN0cmluZz47XHJcbn1cclxuXHJcbi8vIOW/q+mAn+ajgOe0ouOAgemrmOe6p+ajgOe0oi1XaUZp44CB55S15a2Q5Zu05qCP5qOA57Si5Y+C5pWw5a6e5L2TXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hNYWNQYXJhbXMgZXh0ZW5kcyBCYXNlU2VhcmNoTW9kZWwge1xyXG5cclxuICAgIC8vIE1BQ0FkZHJlc3M6IHN0cmluZztcclxuXHJcbiAgICAvLyBob3RzcG90U1NJRDogc3RyaW5nO1xyXG5cclxuICAgIC8vIGhvdHNwb3RNQUNBZGRyZXNzOiBzdHJpbmc7XHJcblxyXG4gICAgLy8gaG90c3BvdE51bWJlcjogc3RyaW5nO1xyXG5cclxuICAgIC8vIOajgOe0ouaXtumXtOexu+WeiyjmnprkuL7vvJrov5HkuIDlpKnjgIHov5HkuInlpKnjgIHov5HkuIDlkajjgIHoh6rlrprkuYkpXHJcbiAgICBkYXRlVHlwZTogc3RyaW5nO1xyXG5cclxuICAgIC8vIOW8gOWni+aXtumXtO+8iOaXtumXtOiMg+WbtO+8iVxyXG4gICAgc3RhcnRUaW1lOiBzdHJpbmc7XHJcblxyXG4gICAgLy8g57uT5p2f5pe26Ze0XHJcbiAgICBlbmRUaW1lOiBzdHJpbmc7XHJcblxyXG4gICAgLy8g5Yy65Z+faWTmlbDnu4RcclxuICAgIGFyZWE6IEFycmF5PHN0cmluZz47XHJcblxyXG4gICAgLy8g6YeH6ZuG6K6+5aSHSUTmlbDnu4RcclxuICAgIGFyT2JqZWN0SUQ6IEFycmF5PHN0cmluZz47XHJcbi8qIFxyXG4gICAgSU1TSTogc3RyaW5nO1xyXG5cclxuICAgIElNRUk6IHN0cmluZzsgKi9cclxufVxyXG5cclxuLyoqXHJcbiAqIOi1hOa6kOajgOe0oi3orr7lpIfmo4DntKLlrZjlgqjov4fnqIvlkI3np7BcclxuICovXHJcbmV4cG9ydCBjb25zdCBSZXNvdXJjZURldmljZVByb2NOYW1lcyA9IHtcclxuXHJcbiAgICBDYW1lcmFEZXZpY2VTZWFyY2hQcm9jTmFtZToge1widGV4dFwiOiBcIuiOt+WPluaRhOWDj+acuuiuvuWkh+WtmOWCqOi/h+eoi+WQjeensFwiLCBcInZhbHVlXCI6IFwiUFJPQ19HRVRfQ0FNRVJBKD8sPyw/LD8pXCJ9LFxyXG5cclxuICAgIFJtcEdhdGVEZXZpY2VTZWFyY2hQcm9jTmFtZToge1widGV4dFwiOiBcIuiOt+WPluWNoeWPo+iuvuWkh+WtmOWCqOi/h+eoi+WQjeensFwiLCBcInZhbHVlXCI6IFwiUFJPQ19HRVRfUk1QR0FURSg/LD8sPyw/KVwifSxcclxuXHJcbiAgICBXaUZpRGV2aWNlU2VhcmNoUHJvY05hbWU6IHtcInRleHRcIjogXCLojrflj5ZXaUZp6K6+5aSH5a2Y5YKo6L+H56iL5ZCN56ewXCIsIFwidmFsdWVcIjogXCJQUk9DX0dFVF9XSUZJREVWSUNFKD8sPyw/LD8pXCJ9LFxyXG5cclxuICAgIEVGZW5jZURldmljZVNlYXJjaFByb2NOYW1lOiB7XCJ0ZXh0XCI6IFwi6I635Y+W55S15a2Q5Zu05qCP6K6+5aSH5a2Y5YKo6L+H56iL5ZCN56ewXCIsIFwidmFsdWVcIjogXCJQUk9DX0dFVF9FRkVOQ0VERVZJQ0UoPyw/LD8sPylcIn1cclxufSJdfQ==
