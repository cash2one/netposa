define(["require", "exports", "es6-promise"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Promise = require("es6-promise");
    var LocateMouseEventUtil = (function () {
        function LocateMouseEventUtil(mapAdapter, mapId) {
            var _this = this;
            this.isDrag = false;
            this.onMouseMove = function (event) {
                var clientX = event.clientX;
                var clientY = event.clientY;
                var _body = angular.element("body");
                var scrollX = _body.scrollLeft();
                var scrollY = _body.scrollTop();
                _this.setMouseMoveDomPosition(event.clientX + scrollX, event.clientY + scrollY);
            };
            this.onMouseUp = function (event) {
                console.log("鼠标抬起", event);
                var point = _this.getCurrentMouseMapPoint(event.clientX, event.clientY);
                _this.endDrag(point);
                return false;
            };
            this.mapAdapter = mapAdapter;
            this.mapId = mapId;
        }
        LocateMouseEventUtil.prototype.startDrag = function (message) {
            var _this = this;
            if (this.isDrag) {
                console.log("上次拖拽还未取消,故先取消");
                this.endDrag();
            }
            return new Promise(function (resolve, reject) {
                _this.isDrag = true;
                _this.resolve = resolve;
                _this.reject = reject;
                var _body = angular.element("body");
                _body.on("mousemove.locate", _this.onMouseMove);
                _body.on("mouseup.locate", _this.onMouseUp);
                _body.css("cursor", "pointer");
                _this.mapAdapter.setCursor("pointer");
                _this.initMouseMoveDom(message);
            });
        };
        LocateMouseEventUtil.prototype.endDrag = function (point) {
            var _this = this;
            this.mapAdapter.removeEventListener(NPMapLib.MAP_EVENT_MOUSE_MOVE);
            this.mapAdapter.setCursor("auto");
            console.log("成功解绑地图事件");
            var _body = angular.element("body");
            _body.off("mousemove.locate");
            _body.off("mouseup.locate");
            _body.css("cursor", "auto");
            this.removeMouseMovDom();
            this.isDrag = false;
            setTimeout(function () {
                if (_this.resolve) {
                    _this.resolve(point);
                }
                _this.resolve = null;
                _this.reject = null;
            });
        };
        LocateMouseEventUtil.prototype.initMouseMoveDom = function (msg) {
            this.removeMouseMovDom();
            var dom = angular.element("<div style='position: absolute; height: 28px; line-height: 28px; background-color: #66ccff;color:#fff; z-index: 10000;padding:0 6px'>" + msg + "</div>");
            dom.css({ "left": "-1000px", "top": "-1000px" });
            var _body = angular.element("body");
            _body.append(dom);
            this.mouseMoveDom = dom;
        };
        LocateMouseEventUtil.prototype.setMouseMoveDomPosition = function (left, top) {
            if (this.mouseMoveDom) {
                this.mouseMoveDom.css({ top: top + "px", left: left + "px" });
            }
        };
        LocateMouseEventUtil.prototype.removeMouseMovDom = function () {
            if (this.mouseMoveDom) {
                this.mouseMoveDom.remove();
            }
        };
        LocateMouseEventUtil.prototype.getCurrentMouseMapPoint = function (clientX, clientY) {
            console.log("当前鼠标的位置为", clientX, clientY);
            var _container = angular.element("#" + this.mapId);
            var _offset = _container.offset();
            var _body = angular.element("body");
            var _scrollTop = _body.scrollTop();
            var _scrollLeft = _body.scrollLeft();
            var _targetClientX = _scrollLeft + clientX - _offset.left;
            var _targetClientY = _scrollTop + clientY - _offset.top;
            var result = null;
            var _pixel = null;
            console.log("获取到的地图控件内位置为", _targetClientX, _targetClientY);
            if (_targetClientX >= 0 && _targetClientY >= 0) {
                var _pixel_1 = new NPMapLib.Geometry.Pixel(_targetClientX, _targetClientY);
                result = this.mapAdapter.pixelToPoint(_pixel_1);
            }
            else {
                console.log("获取点位不在地图控件内");
            }
            console.log("最终转换为的point为", result);
            return result;
        };
        return LocateMouseEventUtil;
    }());
    exports.LocateMouseEventUtil = LocateMouseEventUtil;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL21hcC9jb3JlL3V0aWxzL0xvY2F0ZU1vdXNlRXZlbnRVdGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVVBLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNyQztRQVNJLDhCQUFZLFVBQXVCLEVBQUUsS0FBYTtZQUFsRCxpQkFHQztZQVZPLFdBQU0sR0FBRyxLQUFLLENBQUM7WUEwRGYsZ0JBQVcsR0FBRyxVQUFDLEtBQWlCO2dCQUVwQyxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO2dCQUM1QixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO2dCQUM1QixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ2pDLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDaEMsS0FBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUM7WUFDbkYsQ0FBQyxDQUFDO1lBRU0sY0FBUyxHQUFHLFVBQUMsS0FBaUI7Z0JBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUMzQixJQUFJLEtBQUssR0FBRyxLQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3ZFLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRXBCLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDakIsQ0FBQyxDQUFDO1lBbEVFLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBQzdCLElBQUksQ0FB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QU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUM1RCxFQUFFLENBQUMsQ0FBQyxjQUFjLElBQUksQ0FBQyxJQUFJLGNBQWMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU3QyxJQUFJLFFBQU0sR0FBRyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFDekUsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQU0sQ0FBQyxDQUFDO1lBQ2xELENBQUM7WUFBQSxJQUFJLENBQUEsQ0FBQztnQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQy9CLENBQUM7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFDTCwyQkFBQztJQUFELENBM0hBLEFBMkhDLElBQUE7SUEzSFksb0RBQW9CIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vbWFwL2NvcmUvdXRpbHMvTG9jYXRlTW91c2VFdmVudFV0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBkZWxsIG9uIDIwMTcvNS8zLlxyXG4gKi9cclxuZGVjbGFyZSB2YXIgYW5ndWxhcjogYW55O1xyXG4vKipcclxuICog5ouW5ou96byg5qCH56e75Yqo5LqL5Lu25qih57uEKOW3peWFtylcclxuICog55Sx5LqO5ZCM5LiA5pe26Ze06IKv5a6a5Y+q5pyJ5LiA5Liq6byg5qCH5ouW5Yqo5LqL5Lu2LCDmlYXmraRjbGFzc+S4reeahOaWueazlemDveaYr+mdmeaAgeeahFxyXG4gKi9cclxuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55O1xyXG5pbXBvcnQgXCJlczYtcHJvbWlzZVwiO1xyXG52YXIgUHJvbWlzZSA9IHJlcXVpcmUoXCJlczYtcHJvbWlzZVwiKTtcclxuZXhwb3J0IGNsYXNzIExvY2F0ZU1vdXNlRXZlbnRVdGlsIHtcclxuXHJcbiAgICBwcml2YXRlIGlzRHJhZyA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSByZXNvbHZlOiBhbnk7XHJcbiAgICBwcml2YXRlIHJlamVjdDogYW55O1xyXG4gICAgcHJpdmF0ZSBtYXBBZGFwdGVyOiBJTWFwQWRhcHRlcjtcclxuICAgIHByaXZhdGUgbWFwSWQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgbW91c2VNb3ZlRG9tOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IobWFwQWRhcHRlcjogSU1hcEFkYXB0ZXIsIG1hcElkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm1hcEFkYXB0ZXIgPSBtYXBBZGFwdGVyO1xyXG4gICAgICAgIHRoaXMubWFwSWQgPSBtYXBJZDsgLy8g6I635Y+W5Zyw5Zu+Y29udGFpbmVy5pe255SoXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnqIvluo/lhaXlj6Plj4rlh7rlj6NcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGFydERyYWcobWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8g5YWI5Y+W5raI5LiK5LiA5qyhXHJcbiAgICAgICAgaWYgKHRoaXMuaXNEcmFnKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5LiK5qyh5ouW5ou96L+Y5pyq5Y+W5raILOaVheWFiOWPlua2iFwiKTtcclxuICAgICAgICAgICAgdGhpcy5lbmREcmFnKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZTogYW55LCByZWplY3Q6IGFueSk9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNEcmFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5yZXNvbHZlID0gcmVzb2x2ZTtcclxuICAgICAgICAgICAgdGhpcy5yZWplY3QgPSByZWplY3Q7XHJcbiAgICAgICAgICAgIC8vIOe7keWumum8oOagh1xyXG4gICAgICAgICAgICB2YXIgX2JvZHkgPSBhbmd1bGFyLmVsZW1lbnQoXCJib2R5XCIpO1xyXG4gICAgICAgICAgICBfYm9keS5vbihcIm1vdXNlbW92ZS5sb2NhdGVcIiwgdGhpcy5vbk1vdXNlTW92ZSk7XHJcbiAgICAgICAgICAgIF9ib2R5Lm9uKFwibW91c2V1cC5sb2NhdGVcIiwgdGhpcy5vbk1vdXNlVXApO1xyXG4gICAgICAgICAgICBfYm9keS5jc3MoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpO1xyXG4gICAgICAgICAgICB0aGlzLm1hcEFkYXB0ZXIuc2V0Q3Vyc29yKFwicG9pbnRlclwiKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0TW91c2VNb3ZlRG9tKG1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZW5kRHJhZyhwb2ludD86IE5QTWFwTGliLkdlb21ldHJ5LlBvaW50KSB7XHJcbiAgICAgICAgdGhpcy5tYXBBZGFwdGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoTlBNYXBMaWIuTUFQX0VWRU5UX01PVVNFX01PVkUpO1xyXG4gICAgICAgIHRoaXMubWFwQWRhcHRlci5zZXRDdXJzb3IoXCJhdXRvXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5oiQ5Yqf6Kej57uR5Zyw5Zu+5LqL5Lu2XCIpO1xyXG4gICAgICAgIC8vIOe7keWumum8oOagh1xyXG4gICAgICAgIHZhciBfYm9keSA9IGFuZ3VsYXIuZWxlbWVudChcImJvZHlcIik7XHJcbiAgICAgICAgLy8g6Kej57uR6byg5qCHXHJcbiAgICAgICAgX2JvZHkub2ZmKFwibW91c2Vtb3ZlLmxvY2F0ZVwiKTtcclxuICAgICAgICBfYm9keS5vZmYoXCJtb3VzZXVwLmxvY2F0ZVwiKTtcclxuICAgICAgICBfYm9keS5jc3MoXCJjdXJzb3JcIiwgXCJhdXRvXCIpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlTW91c2VNb3ZEb20oKTtcclxuICAgICAgICB0aGlzLmlzRHJhZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yZXNvbHZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc29sdmUocG9pbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMucmVqZWN0ID0gbnVsbDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTW91c2VNb3ZlID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgLy8g6I635Y+W55u45a+55rWP6KeI5Zmo56qX5Y+j55qE5L2N572uXHJcbiAgICAgICAgbGV0IGNsaWVudFggPSBldmVudC5jbGllbnRYO1xyXG4gICAgICAgIGxldCBjbGllbnRZID0gZXZlbnQuY2xpZW50WTtcclxuICAgICAgICBsZXQgX2JvZHkgPSBhbmd1bGFyLmVsZW1lbnQoXCJib2R5XCIpO1xyXG4gICAgICAgIGxldCBzY3JvbGxYID0gX2JvZHkuc2Nyb2xsTGVmdCgpO1xyXG4gICAgICAgIGxldCBzY3JvbGxZID0gX2JvZHkuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgdGhpcy5zZXRNb3VzZU1vdmVEb21Qb3NpdGlvbihldmVudC5jbGllbnRYICsgc2Nyb2xsWCwgZXZlbnQuY2xpZW50WSArIHNjcm9sbFkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIG9uTW91c2VVcCA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6byg5qCH5oqs6LW3XCIsIGV2ZW50KTtcclxuICAgICAgICB2YXIgcG9pbnQgPSB0aGlzLmdldEN1cnJlbnRNb3VzZU1hcFBvaW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xyXG4gICAgICAgIHRoaXMuZW5kRHJhZyhwb2ludCk7XHJcbiAgICAgICAgLy8g5Y+W5raI5YaS5rOhXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBpbml0TW91c2VNb3ZlRG9tKG1zZzogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVNb3VzZU1vdkRvbSgpO1xyXG4gICAgICAgIHZhciBkb20gPSBhbmd1bGFyLmVsZW1lbnQoXCI8ZGl2IHN0eWxlPSdwb3NpdGlvbjogYWJzb2x1dGU7IGhlaWdodDogMjhweDsgbGluZS1oZWlnaHQ6IDI4cHg7IGJhY2tncm91bmQtY29sb3I6ICM2NmNjZmY7Y29sb3I6I2ZmZjsgei1pbmRleDogMTAwMDA7cGFkZGluZzowIDZweCc+XCIgKyBtc2cgKyBcIjwvZGl2PlwiKTtcclxuICAgICAgICBkb20uY3NzKHtcImxlZnRcIjogXCItMTAwMHB4XCIsIFwidG9wXCI6IFwiLTEwMDBweFwifSk7XHJcbiAgICAgICAgdmFyIF9ib2R5ID0gYW5ndWxhci5lbGVtZW50KFwiYm9keVwiKTtcclxuICAgICAgICBfYm9keS5hcHBlbmQoZG9tKTtcclxuICAgICAgICB0aGlzLm1vdXNlTW92ZURvbSA9IGRvbTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldE1vdXNlTW92ZURvbVBvc2l0aW9uKGxlZnQ6IG51bWJlciwgdG9wOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5tb3VzZU1vdmVEb20pIHtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZU1vdmVEb20uY3NzKHt0b3A6IHRvcCArIFwicHhcIiwgbGVmdDogbGVmdCArIFwicHhcIn0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZU1vdXNlTW92RG9tKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1vdXNlTW92ZURvbSkge1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlTW92ZURvbS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRDdXJyZW50TW91c2VNYXBQb2ludChjbGllbnRYOiBudW1iZXIsIGNsaWVudFk6IG51bWJlcik6IE5QTWFwTGliLkdlb21ldHJ5LlBvaW50IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuW9k+WJjem8oOagh+eahOS9jee9ruS4ulwiLCBjbGllbnRYLCBjbGllbnRZKTtcclxuICAgICAgICAvLyDlh4/ljrvlnLDlm77mjqfku7bnmoTnm7jlr7nkvY3nva4g6I635b6X55yf5a6e55qE6byg5qCH5pa55L2NXHJcbiAgICAgICAgbGV0IF9jb250YWluZXIgPSBhbmd1bGFyLmVsZW1lbnQoXCIjXCIgKyB0aGlzLm1hcElkKTtcclxuICAgICAgICBsZXQgX29mZnNldCA9IF9jb250YWluZXIub2Zmc2V0KCk7XHJcbiAgICAgICAgbGV0IF9ib2R5ID0gYW5ndWxhci5lbGVtZW50KFwiYm9keVwiKTtcclxuICAgICAgICBsZXQgX3Njcm9sbFRvcCA9IF9ib2R5LnNjcm9sbFRvcCgpO1xyXG4gICAgICAgIGxldCBfc2Nyb2xsTGVmdCA9IF9ib2R5LnNjcm9sbExlZnQoKTtcclxuICAgICAgICBsZXQgX3RhcmdldENsaWVudFggPSBfc2Nyb2xsTGVmdCArIGNsaWVudFggLSBfb2Zmc2V0LmxlZnQ7XHJcbiAgICAgICAgbGV0IF90YXJnZXRDbGllbnRZID0gX3Njcm9sbFRvcCArIGNsaWVudFkgLSBfb2Zmc2V0LnRvcDtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcclxuICAgICAgICBsZXQgX3BpeGVsID0gbnVsbDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuiOt+WPluWIsOeahOWcsOWbvuaOp+S7tuWGheS9jee9ruS4ulwiLCBfdGFyZ2V0Q2xpZW50WCwgX3RhcmdldENsaWVudFkpO1xyXG4gICAgICAgIGlmIChfdGFyZ2V0Q2xpZW50WCA+PSAwICYmIF90YXJnZXRDbGllbnRZID49IDApIHtcclxuICAgICAgICAgICAgLy8g5Y+q5pyJ5aSn5LqOMOaJjeihqOekuum8oOagh+WcqOWcsOWbvuaOp+S7tuWGhSwg6L+Z6YeM5Y+q5Yik5pat5LqG5ZCR5bem77yMIOacquWIpOaWreWQkeWPs1xyXG4gICAgICAgICAgICBsZXQgX3BpeGVsID0gbmV3IE5QTWFwTGliLkdlb21ldHJ5LlBpeGVsKF90YXJnZXRDbGllbnRYLCBfdGFyZ2V0Q2xpZW50WSk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMubWFwQWRhcHRlci5waXhlbFRvUG9pbnQoX3BpeGVsKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLojrflj5bngrnkvY3kuI3lnKjlnLDlm77mjqfku7blhoVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5pyA57uI6L2s5o2i5Li655qEcG9pbnTkuLpcIiwgcmVzdWx0KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG59Il19
