define(["require", "exports", "../../common/app/main.app", "../../common/directive/ocx/video.ocx.directive", "../dynamicControl.cache.factory"], function (require, exports, main_app_1, video_ocx_directive_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AlarmVideoController = (function () {
        function AlarmVideoController($scope, layer, dynamicControlCacheFactory, $timeout) {
            var _this = this;
            this.dynamicControlCacheFactory = dynamicControlCacheFactory;
            this.switchIsOff = true;
            this.initComplete = function (ocxControlFunc) {
                console.log("ocx初始化完成", ocxControlFunc);
                _this.videoOcx = ocxControlFunc;
                _this.playRtsp();
            };
            this.playRtsp = function () {
                if (_this.videoOcx) {
                    var opts_1 = new video_ocx_directive_1.VideoOcxRtspOpt();
                    opts_1.url = "rtsp://10.0.10.200:8557/H264";
                    setTimeout(function () {
                        _this.videoOcx.playRtsp(opts_1, 0);
                    }, 20);
                }
            };
            this.stopAll = function () {
                if (_this.videoOcx) {
                    _this.videoOcx.stopAll();
                }
            };
            var vm = this;
            vm.closeWindow = function () {
                vm.stopAll();
                vm.videoOcx = null;
                layer.closeAll();
            };
            vm.stateToVideoLayout = function () {
                vm.closeWindow();
                vm.dynamicControlCacheFactory.updateBtnParams(false);
            };
            $scope.$on('$destory', function () {
                vm.videoOcx = null;
            });
            vm.targetSwitch = function () {
                vm.switchIsOff = !vm.switchIsOff;
            };
            console.log($scope.data);
        }
        ;
        AlarmVideoController.$inject = ['$scope', 'layer', 'dynamicControlCacheFactory', '$timeout'];
        return AlarmVideoController;
    }());
    main_app_1.app.controller('alarmVideoController', AlarmVideoController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvZHluYW1pY0NvbnRyb2wvbWFpblJpZ2h0L2FsYXJtVmlkZW8uY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFVQTtRQXVDSSw4QkFBWSxNQUFZLEVBQUUsS0FBVyxFQUFVLDBCQUFzRCxFQUFDLFFBQVk7WUFBbEgsaUJBZ0NDO1lBaEM4QywrQkFBMEIsR0FBMUIsMEJBQTBCLENBQTRCO1lBL0JyRyxnQkFBVyxHQUFhLElBQUksQ0FBQztZQUs3QixpQkFBWSxHQUFjLFVBQUMsY0FBb0M7Z0JBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUN4QyxLQUFJLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQztnQkFFL0IsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BCLENBQUMsQ0FBQztZQUVGLGFBQVEsR0FBYztnQkFDbEIsRUFBRSxDQUFBLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUM7b0JBQ2QsSUFBSSxNQUFJLEdBQUcsSUFBSSxxQ0FBZSxFQUFFLENBQUM7b0JBQ2pDLE1BQUksQ0FBQyxHQUFHLEdBQUcsOEJBQThCLENBQUM7b0JBQzFDLFVBQVUsQ0FBQzt3QkFDUCxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3BDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQztnQkFDVixDQUFDO1lBQ0wsQ0FBQyxDQUFDO1lBRUYsWUFBTyxHQUFjO2dCQUNqQixFQUFFLENBQUEsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUEsQ0FBQztvQkFDZCxLQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUM1QixDQUFDO1lBQ0wsQ0FBQyxDQUFBO1lBTUcsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBR2QsRUFBRSxDQUFDLFdBQVcsR0FBRztnQkFFYixFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBRWIsRUFBRSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBRW5CLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNyQixDQUFDLENBQUM7WUFHRixFQUFFLENBQUMsa0JBQWtCLEdBQUc7Z0JBRXBCLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFFbEIsRUFBRSxDQUFDLDBCQUEwQixDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4RCxDQUFDLENBQUM7WUFHRixNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtnQkFDbkIsRUFBRSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7WUFHSCxFQUFFLENBQUMsWUFBWSxHQUFHO2dCQUNkLEVBQUUsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ3JDLENBQUMsQ0FBQztZQUVGLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLENBQUM7UUFBQSxDQUFDO1FBbENLLDRCQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFDLDRCQUE0QixFQUFDLFVBQVUsQ0FBQyxDQUFDO1FBcUNqRiwyQkFBQztLQTFFRCxBQTBFQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRyxvQkFBb0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9keW5hbWljQ29udHJvbC9tYWluUmlnaHQvYWxhcm1WaWRlby5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE3LzYvMjMuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCB7SVZpZGVvT2N4Q29udHJvbEZ1bmN9IGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL29jeC92aWRlby5vY3guZGlyZWN0aXZlXCI7XHJcbmltcG9ydCB7VmlkZW9PY3hSdHNwT3B0fSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS9vY3gvdmlkZW8ub2N4LmRpcmVjdGl2ZVwiO1xyXG5pbXBvcnQgIFwiLi4vZHluYW1pY0NvbnRyb2wuY2FjaGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQge0lEeW5hbWljQ29udHJvbENhY2hlRmFjdG9yeX0gZnJvbSBcIi4uL2R5bmFtaWNDb250cm9sLmNhY2hlLmZhY3RvcnlcIjtcclxuXHJcbmNsYXNzIEFsYXJtVmlkZW9Db250cm9sbGVyIHtcclxuXHJcbiAgICAvL+WFs+mXreW8ueeql1xyXG4gICAgY2xvc2VXaW5kb3cgOiBGdW5jdGlvbjtcclxuICAgIC8v6Lez6L2s5Yiw6KeG5bGP56qX5Y+j5rWP6KeIXHJcbiAgICBzdGF0ZVRvVmlkZW9MYXlvdXQgOiBGdW5jdGlvbjtcclxuICAgIC8v55uu5qCH6Lef6ZqP5byA5YWzIOW8gOWFs+eKtuaAgVxyXG4gICAgdGFyZ2V0U3dpdGNoIDogRnVuY3Rpb247XHJcbiAgICBzd2l0Y2hJc09mZiA6IEJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIC8vT0NYXHJcbiAgICB2aWRlb09jeDogSVZpZGVvT2N4Q29udHJvbEZ1bmM7XHJcbiAgICAvL09DWOWIneWni+WMllxyXG4gICAgaW5pdENvbXBsZXRlIDogRnVuY3Rpb24gPSAob2N4Q29udHJvbEZ1bmM6IElWaWRlb09jeENvbnRyb2xGdW5jKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJvY3jliJ3lp4vljJblrozmiJBcIiwgb2N4Q29udHJvbEZ1bmMpO1xyXG4gICAgICAgIHRoaXMudmlkZW9PY3ggPSBvY3hDb250cm9sRnVuYztcclxuXHJcbiAgICAgICAgdGhpcy5wbGF5UnRzcCgpO1xyXG4gICAgfTtcclxuICAgIC8v5pKt5pS+XHJcbiAgICBwbGF5UnRzcCA6IEZ1bmN0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKHRoaXMudmlkZW9PY3gpe1xyXG4gICAgICAgICAgICBsZXQgb3B0cyA9IG5ldyBWaWRlb09jeFJ0c3BPcHQoKTtcclxuICAgICAgICAgICAgb3B0cy51cmwgPSBcInJ0c3A6Ly8xMC4wLjEwLjIwMDo4NTU3L0gyNjRcIjtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb09jeC5wbGF5UnRzcChvcHRzLCAwKTtcclxuICAgICAgICAgICAgfSwyMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8v5YWz6Zet5omA5pyJXHJcbiAgICBzdG9wQWxsIDogRnVuY3Rpb24gPSAoKT0+e1xyXG4gICAgICAgIGlmKHRoaXMudmlkZW9PY3gpe1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvT2N4LnN0b3BBbGwoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnICwnbGF5ZXInLCdkeW5hbWljQ29udHJvbENhY2hlRmFjdG9yeScsJyR0aW1lb3V0J107XHJcblxyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlIDogYW55ICxsYXllciA6IGFueSAscHJpdmF0ZSBkeW5hbWljQ29udHJvbENhY2hlRmFjdG9yeTpJRHluYW1pY0NvbnRyb2xDYWNoZUZhY3RvcnksJHRpbWVvdXQ6YW55KXtcclxuICAgICAgICBsZXQgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICAvL+WFs+eql+W8ueeql1xyXG4gICAgICAgIHZtLmNsb3NlV2luZG93ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAvL+WFs+mXreinhumikVxyXG4gICAgICAgICAgICB2bS5zdG9wQWxsKCk7XHJcbiAgICAgICAgICAgIC8v6ZSA5q+BT0NYXHJcbiAgICAgICAgICAgIHZtLnZpZGVvT2N4ID0gbnVsbDtcclxuICAgICAgICAgICAgLy/lhbPpl63lvLnnqpdcclxuICAgICAgICAgICAgbGF5ZXIuY2xvc2VBbGwoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL+i3s+i9rOWIsOinhuWxj+eql+WPo+a1j+iniFxyXG4gICAgICAgIHZtLnN0YXRlVG9WaWRlb0xheW91dCA9ICgpID0+IHtcclxuICAgICAgICAgICAgLy/lhbPpl63op4bpopEg5YWz56qX5Y+jXHJcbiAgICAgICAgICAgIHZtLmNsb3NlV2luZG93KCk7XHJcbiAgICAgICAgICAgIC8v5YiH5o2i5YiX6KGo5qih5byP56qX5qC86KeG6aKRXHJcbiAgICAgICAgICAgdm0uZHluYW1pY0NvbnRyb2xDYWNoZUZhY3RvcnkudXBkYXRlQnRuUGFyYW1zKGZhbHNlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL09DWCDplIDmr4FcclxuICAgICAgICAkc2NvcGUuJG9uKCckZGVzdG9yeScgLCgpID0+IHtcclxuICAgICAgICAgICAgdm0udmlkZW9PY3ggPSBudWxsO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL+W8gOWFs+aMiemSrlxyXG4gICAgICAgIHZtLnRhcmdldFN3aXRjaCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdm0uc3dpdGNoSXNPZmYgPSAhdm0uc3dpdGNoSXNPZmY7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmRhdGEpO1xyXG4gICAgfTtcclxuXHJcblxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignYWxhcm1WaWRlb0NvbnRyb2xsZXInICwgQWxhcm1WaWRlb0NvbnRyb2xsZXIpOyJdfQ==
