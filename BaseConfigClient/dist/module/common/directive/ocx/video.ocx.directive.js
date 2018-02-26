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
define(["require", "exports", "../../app/main.app", "./video.ocx.model", "./video.ocx.model"], function (require, exports, main_app_1, Ocx) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var VideoOcxRealTimeOpt = (function (_super) {
        __extends(VideoOcxRealTimeOpt, _super);
        function VideoOcxRealTimeOpt() {
            return _super.call(this) || this;
        }
        return VideoOcxRealTimeOpt;
    }(Ocx.RealTimeOpt));
    exports.VideoOcxRealTimeOpt = VideoOcxRealTimeOpt;
    var VideoOcxRtspOpt = (function (_super) {
        __extends(VideoOcxRtspOpt, _super);
        function VideoOcxRtspOpt() {
            return _super.call(this) || this;
        }
        return VideoOcxRtspOpt;
    }(Ocx.RtspOpt));
    exports.VideoOcxRtspOpt = VideoOcxRtspOpt;
    var VideoOcxRtspMultipleOpt = (function (_super) {
        __extends(VideoOcxRtspMultipleOpt, _super);
        function VideoOcxRtspMultipleOpt() {
            return _super.call(this) || this;
        }
        return VideoOcxRtspMultipleOpt;
    }(Ocx.RtspMultipleOpt));
    exports.VideoOcxRtspMultipleOpt = VideoOcxRtspMultipleOpt;
    var VideoOcxPvgBackOpt = (function (_super) {
        __extends(VideoOcxPvgBackOpt, _super);
        function VideoOcxPvgBackOpt() {
            return _super.call(this) || this;
        }
        return VideoOcxPvgBackOpt;
    }(Ocx.PlayBackOpt));
    exports.VideoOcxPvgBackOpt = VideoOcxPvgBackOpt;
    var VideoOcxDirective = (function () {
        function VideoOcxDirective() {
            this.scope = {
                initComplete: "&",
                dbclickCallback: '&'
            };
            this.restrict = "A";
            this.controllerAs = 'videoOcxDirect';
            this.controller = function ($scope, videoOcxFactory, videoOcxTool) {
                var videoOcx;
                var vm = this;
                vm.init = function (dom) {
                    videoOcx = videoOcxFactory.getVideoOcx(dom);
                    videoOcx.bindOcxEvent("WndDClik", function (index) {
                        $scope.dbclickCallback({ index: index });
                    });
                };
                vm.checkOcx = function () {
                    videoOcxTool.checkOcx();
                };
                vm.playRealTime = function (options, index) {
                    return (videoOcx.playRealTime(options, index) === 0) ? true : false;
                };
                vm.playRtsp = function (options, index) {
                    return (videoOcx.playRtsp(options, index) === 0) ? true : false;
                };
                vm.playRtspMultiple = function (options) {
                    return (videoOcx.playRtspMultiple(options) === 0) ? true : false;
                };
                vm.setLayout = function (layoutType) {
                    videoOcx.setLayout(layoutType);
                };
                vm.stopAll = function () {
                    videoOcx.stopAll();
                };
                vm.stop = function (index) {
                    videoOcx.stop(index);
                };
                vm.destroy = function () {
                    videoOcx.destroy();
                };
                vm.getFocusWindowIndex = function () {
                    return videoOcx.getFocusWindowIndex();
                };
                vm.catchPicture = function () {
                    return videoOcx.catchPicture();
                };
                vm.playPvgBack = function (options, index) {
                    return (videoOcx.playPvgBack(options, index) === 0) ? true : false;
                };
                vm.getWindowBusyByIndex = function (index) {
                    return videoOcx.GetWindowBusyByIndex(index || 0);
                };
                vm.clean = function () {
                    videoOcx = null;
                    $scope = null;
                };
                vm.catchPictrue = function (index) {
                    return videoOcx.CatchPictrue(index);
                };
                vm.getVideoAttribute = function (index) {
                    return videoOcx.GetVideoAttribute(index);
                };
            };
            this.link = function (scope, iElement, iAttrs, controller) {
                var vm = controller;
                vm.init(iElement[0]);
                vm.checkOcx();
                scope.$on("$destroy", function () {
                    console.error("自动销毁");
                    vm.ocxControlFunc = null;
                    vm.playRealTime = null;
                    vm.playRtsp = null;
                    vm.playRtspMultiple = null;
                    vm.playPvgBack = null;
                    vm.destroy();
                    vm.clean();
                });
                vm.ocxControlFunc = {
                    playRealTime: vm.playRealTime,
                    playRtsp: vm.playRtsp,
                    playRtspMultiple: vm.playRtspMultiple,
                    playPvgBack: vm.playPvgBack,
                    setLayout: vm.setLayout,
                    stop: vm.stop,
                    stopAll: vm.stopAll,
                    getFocusWindowIndex: vm.getFocusWindowIndex,
                    catchPicture: vm.catchPicture,
                    getWindowBusyByIndex: vm.getWindowBusyByIndex,
                    catchPictrue: vm.catchPictrue,
                    getVideoAttribute: vm.getVideoAttribute
                };
                scope.initComplete({ ocxControlFunc: vm.ocxControlFunc });
            };
        }
        VideoOcxDirective.$inject = ['$scope', 'videoOcxFactory', 'videoOcxTool'];
        VideoOcxDirective.instance = function () {
            return new VideoOcxDirective();
        };
        return VideoOcxDirective;
    }());
    main_app_1.app.directive("videoOcx", VideoOcxDirective.instance);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS9vY3gvdmlkZW8ub2N4LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBcURBO1FBQXlDLHVDQUFlO1FBQ3BEO21CQUNJLGlCQUFPO1FBQ1gsQ0FBQztRQUNMLDBCQUFDO0lBQUQsQ0FKQSxBQUlDLENBSndDLEdBQUcsQ0FBQyxXQUFXLEdBSXZEO0lBSlksa0RBQW1CO0lBTWhDO1FBQXFDLG1DQUFXO1FBQzVDO21CQUNJLGlCQUFPO1FBQ1gsQ0FBQztRQUNMLHNCQUFDO0lBQUQsQ0FKQSxBQUlDLENBSm9DLEdBQUcsQ0FBQyxPQUFPLEdBSS9DO0lBSlksMENBQWU7SUFNNUI7UUFBNkMsMkNBQW1CO1FBQzVEO21CQUNJLGlCQUFPO1FBQ1gsQ0FBQztRQUNMLDhCQUFDO0lBQUQsQ0FKQSxBQUlDLENBSjRDLEdBQUcsQ0FBQyxlQUFlLEdBSS9EO0lBSlksMERBQXVCO0lBTXBDO1FBQXdDLHNDQUFlO1FBQ25EO21CQUNJLGlCQUFPO1FBQ1gsQ0FBQztRQUNMLHlCQUFDO0lBQUQsQ0FKQSxBQUlDLENBSnVDLEdBQUcsQ0FBQyxXQUFXLEdBSXREO0lBSlksZ0RBQWtCO0lBOEMvQjtRQUlJO1lBT0EsVUFBSyxHQUFHO2dCQUNKLFlBQVksRUFBRSxHQUFHO2dCQUNqQixlQUFlLEVBQUUsR0FBRzthQUN2QixDQUFDO1lBT0YsYUFBUSxHQUFHLEdBQUcsQ0FBQztZQUNmLGlCQUFZLEdBQUcsZ0JBQWdCLENBQUM7WUFDaEMsZUFBVSxHQUFHLFVBQVUsTUFBeUIsRUFBRSxlQUFpQyxFQUFFLFlBQTJCO2dCQUU1RyxJQUFJLFFBQW1CLENBQUM7Z0JBQ3hCLElBQUksRUFBRSxHQUF1QixJQUFJLENBQUM7Z0JBQ2xDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsVUFBVSxHQUFhO29CQUM3QixRQUFRLEdBQUcsZUFBZSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFFNUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsVUFBQyxLQUFhO3dCQUM1QyxNQUFNLENBQUMsZUFBZSxDQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7b0JBQzNDLENBQUMsQ0FBQyxDQUFBO2dCQUNOLENBQUMsQ0FBQztnQkFFRixFQUFFLENBQUMsUUFBUSxHQUFHO29CQUNWLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDNUIsQ0FBQyxDQUFDO2dCQUVGLEVBQUUsQ0FBQyxZQUFZLEdBQUcsVUFBVSxPQUE0QixFQUFFLEtBQWM7b0JBQ3BFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDeEUsQ0FBQyxDQUFDO2dCQUVGLEVBQUUsQ0FBQyxRQUFRLEdBQUcsVUFBVSxPQUF3QixFQUFFLEtBQWE7b0JBQzNELE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDcEUsQ0FBQyxDQUFDO2dCQUVGLEVBQUUsQ0FBQyxnQkFBZ0IsR0FBRyxVQUFVLE9BQWdDO29CQUM1RCxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUNyRSxDQUFDLENBQUM7Z0JBRUYsRUFBRSxDQUFDLFNBQVMsR0FBRyxVQUFVLFVBQWtCO29CQUN2QyxRQUFRLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDLENBQUM7Z0JBRUYsRUFBRSxDQUFDLE9BQU8sR0FBRztvQkFDVCxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3ZCLENBQUMsQ0FBQztnQkFFRixFQUFFLENBQUMsSUFBSSxHQUFHLFVBQVUsS0FBYTtvQkFDN0IsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekIsQ0FBQyxDQUFDO2dCQUVGLEVBQUUsQ0FBQyxPQUFPLEdBQUc7b0JBQ1QsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN2QixDQUFDLENBQUM7Z0JBRUYsRUFBRSxDQUFDLG1CQUFtQixHQUFHO29CQUNyQixNQUFNLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBQzFDLENBQUMsQ0FBQztnQkFFRixFQUFFLENBQUMsWUFBWSxHQUFHO29CQUNkLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ25DLENBQUMsQ0FBQztnQkFFRixFQUFFLENBQUMsV0FBVyxHQUFHLFVBQVUsT0FBMkIsRUFBRSxLQUFhO29CQUNqRSxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ3ZFLENBQUMsQ0FBQztnQkFFRixFQUFFLENBQUMsb0JBQW9CLEdBQUcsVUFBVSxLQUFhO29CQUM3QyxNQUFNLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDckQsQ0FBQyxDQUFDO2dCQUVGLEVBQUUsQ0FBQyxLQUFLLEdBQUc7b0JBQ1AsUUFBUSxHQUFHLElBQVcsQ0FBQztvQkFDdkIsTUFBTSxHQUFHLElBQVcsQ0FBQztnQkFDekIsQ0FBQyxDQUFBO2dCQUVELEVBQUUsQ0FBQyxZQUFZLEdBQUcsVUFBVSxLQUFhO29CQUNyQyxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDeEMsQ0FBQyxDQUFBO2dCQUNELEVBQUUsQ0FBQyxpQkFBaUIsR0FBRyxVQUFVLEtBQWE7b0JBQzFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzdDLENBQUMsQ0FBQTtZQUVMLENBQUMsQ0FBQztZQUNGLFNBQUksR0FBRyxVQUFVLEtBQXdCLEVBQUUsUUFBYSxFQUFFLE1BQVcsRUFBRSxVQUE4QjtnQkFFakcsSUFBSSxFQUFFLEdBQUcsVUFBVSxDQUFDO2dCQUlwQixFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7b0JBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBRXRCLEVBQUUsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO29CQUN6QixFQUFFLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztvQkFDdkIsRUFBRSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7b0JBQ25CLEVBQUUsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7b0JBQzNCLEVBQUUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO29CQUN0QixFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ2IsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNmLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyxjQUFjLEdBQUc7b0JBQ2hCLFlBQVksRUFBRSxFQUFFLENBQUMsWUFBWTtvQkFDN0IsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRO29CQUNyQixnQkFBZ0IsRUFBRSxFQUFFLENBQUMsZ0JBQWdCO29CQUNyQyxXQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVc7b0JBQzNCLFNBQVMsRUFBRSxFQUFFLENBQUMsU0FBUztvQkFDdkIsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJO29CQUNiLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTztvQkFDbkIsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLG1CQUFtQjtvQkFDM0MsWUFBWSxFQUFFLEVBQUUsQ0FBQyxZQUFZO29CQUM3QixvQkFBb0IsRUFBRSxFQUFFLENBQUMsb0JBQW9CO29CQUM3QyxZQUFZLEVBQUUsRUFBRSxDQUFDLFlBQVk7b0JBQzdCLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxpQkFBaUI7aUJBQzFDLENBQUM7Z0JBR0YsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsY0FBYyxFQUFDLENBQUMsQ0FBQztZQUU1RCxDQUFDLENBQUE7UUFqSUQsQ0FBQztRQUhNLHlCQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFLeEQsMEJBQVEsR0FBRztZQUNkLE1BQU0sQ0FBQyxJQUFJLGlCQUFpQixFQUFFLENBQUM7UUFDbkMsQ0FBQyxDQUFDO1FBK0hOLHdCQUFDO0tBeElELEFBd0lDLElBQUE7SUFFRCxjQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS9vY3gvdmlkZW8ub2N4LmRpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJ2aWRlby5vY3gubW9kZWwudHNcIiAvPlxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgXCIuL3ZpZGVvLm9jeC5tb2RlbFwiO1xyXG5pbXBvcnQgKiBhcyBPY3ggZnJvbSBcIi4vdmlkZW8ub2N4Lm1vZGVsXCI7XHJcbmltcG9ydCBJVmlkZW9PY3ggPSBPY3guSVZpZGVvT2N4O1xyXG5pbXBvcnQge0lDYXRjaFBpY3R1cmVSZXN1bHR9IGZyb20gXCIuL3ZpZGVvLm9jeC5tb2RlbFwiO1xyXG5pbXBvcnQge0lWaWRlb09jeEZhY3Rvcnl9IGZyb20gXCIuL3ZpZGVvLm9jeC5tb2RlbFwiO1xyXG5pbXBvcnQge0lWaWRlb09jeFRvb2x9IGZyb20gXCIuL3ZpZGVvLm9jeC5tb2RlbFwiO1xyXG5pbXBvcnQge1ZpZGVvT2N4QXR0cn0gZnJvbSBcIi4vdmlkZW8ub2N4Lm1vZGVsXCI7XHJcblxyXG4vLyDov5nph4zkvb/nlKhfVmlkZW9PY3hEaXJlY3RpdmXmmK/nlLHkuo7mraTmjIfku6TkuK3lo7DmmI7nmoTkuIDkupvmlrnms5XkvJrlkoxJVmlkZW9PY3jnm7jlkIwsIOaJgOS7peWwseeUqOi/meenjeaWueW8j+adpeS/neaMgeS4gOiHtFxyXG4vLyDmraTmjIfku6TpgJrov4dpbml0LWNvbXBsZXRl5qCH562+5Zue6LCD5Li75Yqo5pON5L2cb2N455qE5pa55rOVSVZpZGVvT2N4Q29udHJvbEZ1bmNcclxuXHJcbmludGVyZmFjZSBfVmlkZW9PY3hEaXJlY3RpdmUge1xyXG4gICAgaW5pdDogKGRvbTogRG9jdW1lbnQpID0+IHZvaWQ7XHJcblxyXG4gICAgZGVzdHJveSgpOiB2b2lkO1xyXG5cclxuICAgIGNoZWNrT2N4KCk6IHZvaWQ7XHJcblxyXG4gICAgcGxheVJlYWxUaW1lKG9wdGlvbnM6IFZpZGVvT2N4UmVhbFRpbWVPcHQsIGluZGV4PzogbnVtYmVyKTogYm9vbGVhbjtcclxuXHJcbiAgICBwbGF5UnRzcChvcHRpb25zOiBWaWRlb09jeFJ0c3BPcHQsIGluZGV4OiBudW1iZXIpOiBib29sZWFuO1xyXG5cclxuICAgIHBsYXlSdHNwTXVsdGlwbGUob3B0aW9uczogVmlkZW9PY3hSdHNwTXVsdGlwbGVPcHQpOiBib29sZWFuO1xyXG5cclxuICAgIHBsYXlQdmdCYWNrKG9wdGlvbnM6IFZpZGVvT2N4UHZnQmFja09wdCwgaW5kZXg6IG51bWJlcik6IGJvb2xlYW47XHJcblxyXG4gICAgc3RvcChpbmRleDogbnVtYmVyKTogdm9pZDtcclxuXHJcbiAgICBzdG9wQWxsKCk6IHZvaWQ7XHJcblxyXG4gICAgc2V0TGF5b3V0KGxheW91dFR5cGU6IG51bWJlcik6IHZvaWQ7XHJcblxyXG4gICAgLy8g6ZSA5q+B5o6n5Lu2XHJcbiAgICBkZXN0cm95KCk6IHZvaWQ7XHJcblxyXG4gICAgZ2V0Rm9jdXNXaW5kb3dJbmRleCgpOiBudW1iZXI7XHJcblxyXG4gICAgY2F0Y2hQaWN0dXJlKCk6IElDYXRjaFBpY3R1cmVSZXN1bHQ7XHJcblxyXG4gICAgZ2V0V2luZG93QnVzeUJ5SW5kZXgoaW5kZXg6IG51bWJlcik6IGJvb2xlYW47XHJcblxyXG4gICAgb2N4Q29udHJvbEZ1bmM6IElWaWRlb09jeENvbnRyb2xGdW5jO1xyXG5cclxuICAgIC8vIOeUqOS6jua4heepuuaMh+S7pOS4reeahOS4gOS6m+i1hOa6kOeUqFxyXG4gICAgY2xlYW4oKTogdm9pZDtcclxuXHJcbiAgICBjYXRjaFBpY3RydWUoaW5kZXg6IG51bWJlcik6IHN0cmluZztcclxuXHJcbiAgICBnZXRWaWRlb0F0dHJpYnV0ZShpbmRleDogbnVtYmVyKTogVmlkZW9PY3hBdHRyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVmlkZW9PY3hSZWFsVGltZU9wdCBleHRlbmRzIE9jeC5SZWFsVGltZU9wdCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVmlkZW9PY3hSdHNwT3B0IGV4dGVuZHMgT2N4LlJ0c3BPcHQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFZpZGVvT2N4UnRzcE11bHRpcGxlT3B0IGV4dGVuZHMgT2N4LlJ0c3BNdWx0aXBsZU9wdCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVmlkZW9PY3hQdmdCYWNrT3B0IGV4dGVuZHMgT2N4LlBsYXlCYWNrT3B0IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBjb250cm9sbGVy5Y+v5Lul5Li75Yqo5pON5L2c5oyH5Luk55qE5pa55rOVXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElWaWRlb09jeENvbnRyb2xGdW5jIHtcclxuICAgIC8vIOaSreaUvuWunuaXtuinhumikVxyXG4gICAgcGxheVJlYWxUaW1lKG9wdGlvbnM6IFZpZGVvT2N4UmVhbFRpbWVPcHQsIGluZGV4PzogbnVtYmVyKTogYm9vbGVhbjtcclxuXHJcbiAgICAvLyDmkq3mlL5ydHNwXHJcbiAgICBwbGF5UnRzcChvcHRpb25zOiBWaWRlb09jeFJ0c3BPcHQsIGluZGV4OiBudW1iZXIpOiBib29sZWFuO1xyXG5cclxuICAgIC8vIOaSreaUvnJ0c3DlpJrot6/op4bpopFcclxuICAgIHBsYXlSdHNwTXVsdGlwbGUob3B0aW9uczogVmlkZW9PY3hSdHNwTXVsdGlwbGVPcHQpOiBib29sZWFuO1xyXG5cclxuICAgIC8vIOaSreaUvnB2Z+WOhuWPsuinhumikVxyXG4gICAgcGxheVB2Z0JhY2sob3B0aW9uczogVmlkZW9PY3hQdmdCYWNrT3B0LCBpbmRleDogbnVtYmVyKTogYm9vbGVhbjtcclxuXHJcbiAgICAvLyDorr7nva7nqpfmoLwgMSw0LDksMTYsNDEgKDE6MXgxIDQ6MngyIDk6M3gzIDE2OjR4NCA0MTo0eDEp5Y+v55So5Y+C5pWwXHJcbiAgICBzZXRMYXlvdXQobGF5ZXJUeXBlOiBudW1iZXIpOiB2b2lkO1xyXG5cclxuICAgIC8vIOWBnOatouaJgOacieinhumikVxyXG4gICAgc3RvcEFsbCgpOiB2b2lkO1xyXG5cclxuICAgIC8vIOWBnOatouWNleS4quinhumikSBzdG9wXHJcbiAgICBzdG9wKGluZGV4OiBudW1iZXIpOiB2b2lkO1xyXG5cclxuICAgIC8vIOiOt+W+l+eEpueCueeahGluZGV4XHJcbiAgICBnZXRGb2N1c1dpbmRvd0luZGV4KCk6IG51bWJlcjtcclxuXHJcbiAgICBjYXRjaFBpY3R1cmUoKTogSUNhdGNoUGljdHVyZVJlc3VsdDtcclxuXHJcbiAgICBnZXRXaW5kb3dCdXN5QnlJbmRleChpbmRleDogbnVtYmVyKTogYm9vbGVhbjtcclxuXHJcbiAgICBjYXRjaFBpY3RydWUoaW5kZXg6IG51bWJlcik6IHN0cmluZztcclxuXHJcbiAgICBnZXRWaWRlb0F0dHJpYnV0ZShpbmRleDogbnVtYmVyKTogVmlkZW9PY3hBdHRyXHJcblxyXG4gICAgLy8g5ZCO57ut6L+Y5pyJ5Li75Yqo5Y+M5Ye75YWo5bGPLCDliJvlu7rlt6XlhbfmnaEsIOaKk+Wbviwg6I635Y+W5b2T5YmN5pys5py65YWB6K645omT5byA55qE6KeG6aKR6Lev5pWw5pyA5aSn5YC8LS0tPixcclxuICAgIC8vIC0tLT7ojrflj5blvZPliY3mnKzmnLrlt7Lnu4/miZPlvIDnmoTop4bpopHot6/mlbAsIOiOt+WPlm9jeOaOp+S7tuS4reinhumikeeql+agvOaVsOmHjywg5pKt5pS+5b2V5YOP562J5b6F5re75YqgLCDlpoLmnInpnIDopoHogZTns7t3eXJcclxufVxyXG5cclxuY2xhc3MgVmlkZW9PY3hEaXJlY3RpdmUge1xyXG5cclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAndmlkZW9PY3hGYWN0b3J5JywgJ3ZpZGVvT2N4VG9vbCddO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpbnN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZpZGVvT2N4RGlyZWN0aXZlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNjb3BlID0ge1xyXG4gICAgICAgIGluaXRDb21wbGV0ZTogXCImXCIsXHJcbiAgICAgICAgZGJjbGlja0NhbGxiYWNrOiAnJicgLy8ge2luZGV4OiBpbmRleH1cclxuICAgIH07XHJcblxyXG4gICAgaW5pdENvbXBsZXRlOiBGdW5jdGlvbjtcclxuICAgIGRiY2xpY2tDYWxsYmFjazogRnVuY3Rpb247XHJcbiAgICAkb246IEZ1bmN0aW9uO1xyXG4gICAgY2xlYW46IEZ1bmN0aW9uO1xyXG5cclxuICAgIHJlc3RyaWN0ID0gXCJBXCI7XHJcbiAgICBjb250cm9sbGVyQXMgPSAndmlkZW9PY3hEaXJlY3QnO1xyXG4gICAgY29udHJvbGxlciA9IGZ1bmN0aW9uICgkc2NvcGU6IFZpZGVvT2N4RGlyZWN0aXZlLCB2aWRlb09jeEZhY3Rvcnk6IElWaWRlb09jeEZhY3RvcnksIHZpZGVvT2N4VG9vbDogSVZpZGVvT2N4VG9vbCkge1xyXG5cclxuICAgICAgICBsZXQgdmlkZW9PY3g6IElWaWRlb09jeDtcclxuICAgICAgICBsZXQgdm06IF9WaWRlb09jeERpcmVjdGl2ZSA9IHRoaXM7XHJcbiAgICAgICAgdm0uaW5pdCA9IGZ1bmN0aW9uIChkb206IERvY3VtZW50KSB7XHJcbiAgICAgICAgICAgIHZpZGVvT2N4ID0gdmlkZW9PY3hGYWN0b3J5LmdldFZpZGVvT2N4KGRvbSk7XHJcbiAgICAgICAgICAgIC8vIOe7keWumm9jeOeCueWHu+S6i+S7tlxyXG4gICAgICAgICAgICB2aWRlb09jeC5iaW5kT2N4RXZlbnQoXCJXbmREQ2xpa1wiLCAoaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmRiY2xpY2tDYWxsYmFjayh7aW5kZXg6IGluZGV4fSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdm0uY2hlY2tPY3ggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZpZGVvT2N4VG9vbC5jaGVja09jeCgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZtLnBsYXlSZWFsVGltZSA9IGZ1bmN0aW9uIChvcHRpb25zOiBWaWRlb09jeFJlYWxUaW1lT3B0LCBpbmRleD86IG51bWJlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gKHZpZGVvT2N4LnBsYXlSZWFsVGltZShvcHRpb25zLCBpbmRleCkgPT09IDApID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZtLnBsYXlSdHNwID0gZnVuY3Rpb24gKG9wdGlvbnM6IFZpZGVvT2N4UnRzcE9wdCwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gKHZpZGVvT2N4LnBsYXlSdHNwKG9wdGlvbnMsIGluZGV4KSA9PT0gMCkgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdm0ucGxheVJ0c3BNdWx0aXBsZSA9IGZ1bmN0aW9uIChvcHRpb25zOiBWaWRlb09jeFJ0c3BNdWx0aXBsZU9wdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKHZpZGVvT2N4LnBsYXlSdHNwTXVsdGlwbGUob3B0aW9ucykgPT09IDApID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZtLnNldExheW91dCA9IGZ1bmN0aW9uIChsYXlvdXRUeXBlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdmlkZW9PY3guc2V0TGF5b3V0KGxheW91dFR5cGUpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZtLnN0b3BBbGwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZpZGVvT2N4LnN0b3BBbGwoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2bS5zdG9wID0gZnVuY3Rpb24gKGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdmlkZW9PY3guc3RvcChpbmRleCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdm0uZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmlkZW9PY3guZGVzdHJveSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZtLmdldEZvY3VzV2luZG93SW5kZXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2aWRlb09jeC5nZXRGb2N1c1dpbmRvd0luZGV4KCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdm0uY2F0Y2hQaWN0dXJlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmlkZW9PY3guY2F0Y2hQaWN0dXJlKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdm0ucGxheVB2Z0JhY2sgPSBmdW5jdGlvbiAob3B0aW9uczogVmlkZW9PY3hQdmdCYWNrT3B0LCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAodmlkZW9PY3gucGxheVB2Z0JhY2sob3B0aW9ucywgaW5kZXgpID09PSAwKSA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2bS5nZXRXaW5kb3dCdXN5QnlJbmRleCA9IGZ1bmN0aW9uIChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiB2aWRlb09jeC5HZXRXaW5kb3dCdXN5QnlJbmRleChpbmRleCB8fCAwKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2bS5jbGVhbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmlkZW9PY3ggPSBudWxsIGFzIGFueTtcclxuICAgICAgICAgICAgJHNjb3BlID0gbnVsbCBhcyBhbnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2bS5jYXRjaFBpY3RydWUgPSBmdW5jdGlvbiAoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdmlkZW9PY3guQ2F0Y2hQaWN0cnVlKGluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdm0uZ2V0VmlkZW9BdHRyaWJ1dGUgPSBmdW5jdGlvbiAoaW5kZXg6IG51bWJlcik6IFZpZGVvT2N4QXR0ciB7XHJcbiAgICAgICAgICAgIHJldHVybiB2aWRlb09jeC5HZXRWaWRlb0F0dHJpYnV0ZShpbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcbiAgICBsaW5rID0gZnVuY3Rpb24gKHNjb3BlOiBWaWRlb09jeERpcmVjdGl2ZSwgaUVsZW1lbnQ6IGFueSwgaUF0dHJzOiBhbnksIGNvbnRyb2xsZXI6IF9WaWRlb09jeERpcmVjdGl2ZSkge1xyXG5cclxuICAgICAgICBsZXQgdm0gPSBjb250cm9sbGVyO1xyXG4gICAgICAgIC8vIOaMh+S7pOWIneWni+WMluWQjuWFiOajgOafpW9jeOaOp+S7tuaYr+WQpuWPr+eUqFxyXG5cclxuICAgICAgICAvLyDliJ3lp4vljJZPY3jmjIfku6RcclxuICAgICAgICB2bS5pbml0KGlFbGVtZW50WzBdKTtcclxuICAgICAgICB2bS5jaGVja09jeCgpO1xyXG4gICAgICAgIHNjb3BlLiRvbihcIiRkZXN0cm95XCIsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuiHquWKqOmUgOavgVwiKTtcclxuICAgICAgICAgICAgLy8g6ZSA5q+B5LiA5Lqb6LWE5rqQXHJcbiAgICAgICAgICAgIHZtLm9jeENvbnRyb2xGdW5jID0gbnVsbDtcclxuICAgICAgICAgICAgdm0ucGxheVJlYWxUaW1lID0gbnVsbDtcclxuICAgICAgICAgICAgdm0ucGxheVJ0c3AgPSBudWxsO1xyXG4gICAgICAgICAgICB2bS5wbGF5UnRzcE11bHRpcGxlID0gbnVsbDtcclxuICAgICAgICAgICAgdm0ucGxheVB2Z0JhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB2bS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHZtLmNsZWFuKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZtLm9jeENvbnRyb2xGdW5jID0ge1xyXG4gICAgICAgICAgICBwbGF5UmVhbFRpbWU6IHZtLnBsYXlSZWFsVGltZSwgLy8g5pKt5pS+5a6e5pe2XHJcbiAgICAgICAgICAgIHBsYXlSdHNwOiB2bS5wbGF5UnRzcCwgLy8g5pKt5pS+UnRzcOinhumikVxyXG4gICAgICAgICAgICBwbGF5UnRzcE11bHRpcGxlOiB2bS5wbGF5UnRzcE11bHRpcGxlLCAvLyDmkq3mlL5ydHNw5aSa6Lev6KeG6aKRXHJcbiAgICAgICAgICAgIHBsYXlQdmdCYWNrOiB2bS5wbGF5UHZnQmFjaywgLy8g5pKt5pS+cHZn5Y6G5Y+y6KeG6aKRXHJcbiAgICAgICAgICAgIHNldExheW91dDogdm0uc2V0TGF5b3V0LFxyXG4gICAgICAgICAgICBzdG9wOiB2bS5zdG9wLFxyXG4gICAgICAgICAgICBzdG9wQWxsOiB2bS5zdG9wQWxsLFxyXG4gICAgICAgICAgICBnZXRGb2N1c1dpbmRvd0luZGV4OiB2bS5nZXRGb2N1c1dpbmRvd0luZGV4LFxyXG4gICAgICAgICAgICBjYXRjaFBpY3R1cmU6IHZtLmNhdGNoUGljdHVyZSxcclxuICAgICAgICAgICAgZ2V0V2luZG93QnVzeUJ5SW5kZXg6IHZtLmdldFdpbmRvd0J1c3lCeUluZGV4LFxyXG4gICAgICAgICAgICBjYXRjaFBpY3RydWU6IHZtLmNhdGNoUGljdHJ1ZSxcclxuICAgICAgICAgICAgZ2V0VmlkZW9BdHRyaWJ1dGU6IHZtLmdldFZpZGVvQXR0cmlidXRlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8g5bCGZG9t5omA5pyJ5Li75Yqo5o6n5Yi2b2N45o6n5Lu255qE5pa55rOV6YO95L2c5Li65Zue6LCD5Ye95pWw5LiA5qyh5oCn6L+U5Zue57uZ6LCD55So5pa5XHJcbiAgICAgICAgc2NvcGUuaW5pdENvbXBsZXRlKHtvY3hDb250cm9sRnVuYzogdm0ub2N4Q29udHJvbEZ1bmN9KTtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5hcHAuZGlyZWN0aXZlKFwidmlkZW9PY3hcIiwgVmlkZW9PY3hEaXJlY3RpdmUuaW5zdGFuY2UpOyJdfQ==
