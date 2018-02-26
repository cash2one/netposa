define(["require", "exports", "../../common/app/main.app", "../../common/directive/ocx/video.ocx.directive", "css!./ocx.css"], function (require, exports, main_app_1, video_ocx_directive_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OcxController = (function () {
        function OcxController($scope) {
            var _this = this;
            this.$scope = $scope;
            this.initComplete = function (ocxControlFunc) {
                console.log("ocx初始化完成", ocxControlFunc);
                _this.videoOcx = ocxControlFunc;
            };
            this.playRealTime = function () {
                if (_this.videoOcx) {
                    var opts = new video_ocx_directive_1.VideoOcxRealTimeOpt();
                    opts.ip = "192.168.160.151";
                    opts.port = 2100;
                    opts.path = "av/1/1";
                    opts.user = "admin";
                    opts.passwd = "admin";
                    _this.videoOcx.playRealTime(opts, _this.videoOcx.getFocusWindowIndex());
                }
            };
            this.playRtsp = function () {
                if (_this.videoOcx) {
                    var opts = new video_ocx_directive_1.VideoOcxRtspOpt();
                    opts.url = "rtsp://10.0.10.200:8557/H264";
                    _this.videoOcx.playRtsp(opts, 0);
                }
            };
            this.playRtspMultiple = function () {
                if (_this.videoOcx) {
                    var opts = new video_ocx_directive_1.VideoOcxRtspMultipleOpt();
                    opts.url = "SSN://172.17.3.78:5555/?id=PVG://172.17.3.39:2100/?user=admin&pwd=admin&avpath=av/25";
                    _this.videoOcx.playRtspMultiple(opts);
                }
            };
            this.pause = function () {
                layer.msg("暂未实现");
            };
            this.stop = function () {
                if (_this.videoOcx) {
                    _this.videoOcx.stop(_this.videoOcx.getFocusWindowIndex());
                }
            };
            this.stopAll = function () {
                if (_this.videoOcx) {
                    _this.videoOcx.stopAll();
                }
            };
            this.changeLayoutType = function (layoutType) {
                if (_this.videoOcx) {
                    _this.videoOcx.setLayout(layoutType);
                }
            };
            var vm = this;
            $scope.$on("$destroy", function () {
                _this.videoOcx = null;
            });
        }
        OcxController.prototype.getPhoto = function () {
            if (this.videoOcx) {
                console.log(this.videoOcx.catchPictrue(0));
            }
        };
        OcxController.$inject = ["$scope"];
        return OcxController;
    }());
    main_app_1.app.controller("technologyStackOcxController", OcxController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdGVjaG5vbG9neS1zdGFjay9vY3gvb2N4LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBT0E7UUFLSSx1QkFBb0IsTUFBVztZQUEvQixpQkFNQztZQU5tQixXQUFNLEdBQU4sTUFBTSxDQUFLO1lBUS9CLGlCQUFZLEdBQUcsVUFBQyxjQUFvQztnQkFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQ3hDLEtBQUksQ0FBQyxRQUFRLEdBQUcsY0FBYyxDQUFDO1lBQ25DLENBQUMsQ0FBQTtZQUVELGlCQUFZLEdBQUc7Z0JBRVgsRUFBRSxDQUFBLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUM7b0JBQ2QsSUFBSSxJQUFJLEdBQUcsSUFBSSx5Q0FBbUIsRUFBRSxDQUFDO29CQUNyQyxJQUFJLENBQUMsRUFBRSxHQUFHLGlCQUFpQixDQUFDO29CQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO29CQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztvQkFDdEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRSxDQUFDO1lBQ0wsQ0FBQyxDQUFBO1lBRUQsYUFBUSxHQUFHO2dCQUNQLEVBQUUsQ0FBQSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFDO29CQUNkLElBQUksSUFBSSxHQUFHLElBQUkscUNBQWUsRUFBRSxDQUFDO29CQUNqQyxJQUFJLENBQUMsR0FBRyxHQUFHLDhCQUE4QixDQUFDO29CQUMxQyxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLENBQUM7WUFDTCxDQUFDLENBQUE7WUFPRCxxQkFBZ0IsR0FBRztnQkFDZixFQUFFLENBQUEsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUEsQ0FBQztvQkFDZCxJQUFJLElBQUksR0FBRyxJQUFJLDZDQUF1QixFQUFFLENBQUM7b0JBQ3pDLElBQUksQ0FBQyxHQUFHLEdBQUcsc0ZBQXNGLENBQUM7b0JBQ2xHLEtBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pDLENBQUM7WUFDTCxDQUFDLENBQUE7WUFFRCxVQUFLLEdBQUc7Z0JBQ0osS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0QixDQUFDLENBQUM7WUFFRixTQUFJLEdBQUc7Z0JBQ0gsRUFBRSxDQUFBLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUM7b0JBQ2QsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7Z0JBQzVELENBQUM7WUFFTCxDQUFDLENBQUE7WUFFRCxZQUFPLEdBQUc7Z0JBQ04sRUFBRSxDQUFBLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUM7b0JBQ2QsS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDNUIsQ0FBQztZQUNMLENBQUMsQ0FBQTtZQUVELHFCQUFnQixHQUFHLFVBQUMsVUFBa0I7Z0JBQ2xDLEVBQUUsQ0FBQSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFDO29CQUNkLEtBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN4QyxDQUFDO1lBQ0wsQ0FBQyxDQUFBO1lBbkVHLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztZQUVkLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFO2dCQUNuQixLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUEyQkQsZ0NBQVEsR0FBUjtZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDOUMsQ0FBQztRQUNMLENBQUM7UUF6Q00scUJBQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBMEVoQyxvQkFBQztLQTNFRCxBQTJFQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsRUFBRSxhQUFhLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvdGVjaG5vbG9neS1zdGFjay9vY3gvb2N4LmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IFwiY3NzIS4vb2N4LmNzc1wiO1xyXG5pbXBvcnQge1xyXG4gICAgSVZpZGVvT2N4Q29udHJvbEZ1bmMsIFZpZGVvT2N4UmVhbFRpbWVPcHQsXHJcbiAgICBWaWRlb09jeFJ0c3BPcHQsIFZpZGVvT2N4UnRzcE11bHRpcGxlT3B0XHJcbn0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvb2N4L3ZpZGVvLm9jeC5kaXJlY3RpdmVcIjtcclxuZGVjbGFyZSBsZXQgbGF5ZXI6YW55O1xyXG5jbGFzcyBPY3hDb250cm9sbGVye1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbXCIkc2NvcGVcIl07XHJcblxyXG4gICAgdmlkZW9PY3g6IElWaWRlb09jeENvbnRyb2xGdW5jO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnkpe1xyXG4gICAgICAgIGxldCB2bSA9IHRoaXM7XHJcblxyXG4gICAgICAgICRzY29wZS4kb24oXCIkZGVzdHJveVwiLCAoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvT2N4ID0gbnVsbDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0Q29tcGxldGUgPSAob2N4Q29udHJvbEZ1bmM6IElWaWRlb09jeENvbnRyb2xGdW5jKT0+e1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib2N45Yid5aeL5YyW5a6M5oiQXCIsIG9jeENvbnRyb2xGdW5jKTtcclxuICAgICAgICB0aGlzLnZpZGVvT2N4ID0gb2N4Q29udHJvbEZ1bmM7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheVJlYWxUaW1lID0gKCk9PntcclxuICAgICAgICAvLyDkvb/nlKjliY3liKTnqbpcclxuICAgICAgICBpZih0aGlzLnZpZGVvT2N4KXtcclxuICAgICAgICAgICAgbGV0IG9wdHMgPSBuZXcgVmlkZW9PY3hSZWFsVGltZU9wdCgpO1xyXG4gICAgICAgICAgICBvcHRzLmlwID0gXCIxOTIuMTY4LjE2MC4xNTFcIjtcclxuICAgICAgICAgICAgb3B0cy5wb3J0ID0gMjEwMDtcclxuICAgICAgICAgICAgb3B0cy5wYXRoID0gXCJhdi8xLzFcIjtcclxuICAgICAgICAgICAgb3B0cy51c2VyID0gXCJhZG1pblwiO1xyXG4gICAgICAgICAgICBvcHRzLnBhc3N3ZCA9IFwiYWRtaW5cIjtcclxuICAgICAgICAgICAgdGhpcy52aWRlb09jeC5wbGF5UmVhbFRpbWUob3B0cywgdGhpcy52aWRlb09jeC5nZXRGb2N1c1dpbmRvd0luZGV4KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGF5UnRzcCA9ICgpPT57XHJcbiAgICAgICAgaWYodGhpcy52aWRlb09jeCl7XHJcbiAgICAgICAgICAgIGxldCBvcHRzID0gbmV3IFZpZGVvT2N4UnRzcE9wdCgpO1xyXG4gICAgICAgICAgICBvcHRzLnVybCA9IFwicnRzcDovLzEwLjAuMTAuMjAwOjg1NTcvSDI2NFwiO1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvT2N4LnBsYXlSdHNwKG9wdHMsIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFBob3RvICgpIHtcclxuICAgICAgICBpZiAodGhpcy52aWRlb09jeCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnZpZGVvT2N4LmNhdGNoUGljdHJ1ZSgwKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcGxheVJ0c3BNdWx0aXBsZSA9ICgpPT57XHJcbiAgICAgICAgaWYodGhpcy52aWRlb09jeCl7XHJcbiAgICAgICAgICAgIGxldCBvcHRzID0gbmV3IFZpZGVvT2N4UnRzcE11bHRpcGxlT3B0KCk7XHJcbiAgICAgICAgICAgIG9wdHMudXJsID0gXCJTU046Ly8xNzIuMTcuMy43ODo1NTU1Lz9pZD1QVkc6Ly8xNzIuMTcuMy4zOToyMTAwLz91c2VyPWFkbWluJnB3ZD1hZG1pbiZhdnBhdGg9YXYvMjVcIjtcclxuICAgICAgICAgICAgdGhpcy52aWRlb09jeC5wbGF5UnRzcE11bHRpcGxlKG9wdHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwYXVzZSA9ICgpPT57XHJcbiAgICAgICAgbGF5ZXIubXNnKFwi5pqC5pyq5a6e546wXCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzdG9wID0gKCk9PntcclxuICAgICAgICBpZih0aGlzLnZpZGVvT2N4KXtcclxuICAgICAgICAgICAgdGhpcy52aWRlb09jeC5zdG9wKHRoaXMudmlkZW9PY3guZ2V0Rm9jdXNXaW5kb3dJbmRleCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0b3BBbGwgPSAoKT0+e1xyXG4gICAgICAgIGlmKHRoaXMudmlkZW9PY3gpe1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvT2N4LnN0b3BBbGwoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlTGF5b3V0VHlwZSA9IChsYXlvdXRUeXBlOiBudW1iZXIpPT57XHJcbiAgICAgICAgaWYodGhpcy52aWRlb09jeCl7XHJcbiAgICAgICAgICAgIHRoaXMudmlkZW9PY3guc2V0TGF5b3V0KGxheW91dFR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKFwidGVjaG5vbG9neVN0YWNrT2N4Q29udHJvbGxlclwiLCBPY3hDb250cm9sbGVyKTsiXX0=
