define(["require", "exports", "../common/app/main.app", "../common/directive/ocx/video.ocx.directive", "../common/services/camera.service", "../common/factory/systemInfo.cache.factory"], function (require, exports, main_app_1, video_ocx_directive_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fullPlayPopupController = (function () {
        function fullPlayPopupController($scope, $timeout, $http, notifyFactory, cameraService, systemInfoCacheFactory) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$http = $http;
            this.notifyFactory = notifyFactory;
            this.cameraService = cameraService;
            this.systemInfoCacheFactory = systemInfoCacheFactory;
            this.isShowOcxPlayer = false;
            this.playerInfo = this.$scope.PointDeTail;
            if (!this.playerInfo.data && !this.playerInfo.status) {
                console.log("没有播放地址");
                return;
            }
            if (this.playerInfo.type == 2 && this.$scope.PointDeTail.time) {
                this.playerInfo.data.time = this.$scope.PointDeTail.time;
            }
            this.$scope.$on("$destroy", function () {
                _this.videoOcx = null;
            });
            this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
        }
        fullPlayPopupController.prototype.initComplete = function (ocxControlFunc) {
            this.videoOcx = ocxControlFunc;
            this.initPlayer();
        };
        fullPlayPopupController.prototype.initPlayer = function () {
            var _this = this;
            if (this.playerInfo.type) {
                if (this.playerInfo.type == 1 && this.playerInfo.status) {
                    window.setTimeout(function () { _this.playRealTime(_this.playerInfo); }, 0);
                }
                if (this.playerInfo.type == 2 && this.playerInfo.status) {
                    window.setTimeout(function () { _this.playPvgBack(_this.playerInfo); }, 0);
                }
            }
            else {
                console.log("未检测到播放指令参数");
            }
        };
        fullPlayPopupController.prototype.formatTime = function (time, timeSlot) {
            if (!time) {
                return '';
            }
            var data = new Date(time);
            if (timeSlot) {
                data = new Date(data.getTime() + timeSlot * 1000);
            }
            var year = data.getFullYear(), month = data.getMonth() >= 9 ? (data.getMonth() + 1).toString() : '0' + (data.getMonth() + 1), day = data.getDate() > 9 ? data.getDate().toString() : '0' + data.getDate(), hours = data.getHours() > 9 ? data.getHours().toString() : '0' + data.getHours(), minutes = data.getMinutes() > 9 ? data.getMinutes().toString() : '0' + data.getMinutes(), ss = data.getSeconds() > 9 ? data.getSeconds().toString() : '0' + data.getSeconds();
            return year + month + day + hours + minutes + ss + '000';
        };
        fullPlayPopupController.prototype.playPvgBack = function (data) {
            this.isShowOcxPlayer = true;
            if (!data.time) {
                return;
            }
            if (this.videoOcx) {
                var timeSlotBegin = -30;
                var timeSlotAfter = 30;
                var systemData = this.systemInfoCacheFactory.getSystemInfo();
                timeSlotBegin = 0 - systemData.videoBeforeTime;
                timeSlotAfter = systemData.videoAfterTime * 1;
                var opts = new video_ocx_directive_1.VideoOcxPvgBackOpt();
                opts.ip = data.data.IpAddress;
                opts.port = data.data.Port;
                opts.path = data.data.PlayName;
                opts.user = data.data.Uid;
                opts.passwd = data.data.Pwd;
                opts.displayModel = this.playerInfo.displayModel || 0;
                opts.hwdecoder = this.playerInfo.hwdecoder || 0;
                opts.beginTime = this.formatTime(data.time, timeSlotBegin);
                opts.endTime = this.formatTime(data.time, timeSlotAfter);
                console.log(opts, 'history video play init');
                this.videoOcx.playPvgBack(opts, this.videoOcx.getFocusWindowIndex());
            }
        };
        fullPlayPopupController.prototype.playRealTime = function (data) {
            this.isShowOcxPlayer = true;
            if (this.videoOcx) {
                console.log(this.videoOcx.getFocusWindowIndex(), this.videoOcx);
                var opts = new video_ocx_directive_1.VideoOcxRealTimeOpt();
                opts.ip = data.data.IpAddress;
                opts.port = data.data.Port;
                opts.path = data.data.PlayName;
                opts.user = data.data.Uid;
                opts.passwd = data.data.Pwd;
                console.log(opts, 'real video play init');
                this.videoOcx.playRealTime(opts, this.videoOcx.getFocusWindowIndex());
            }
        };
        fullPlayPopupController.prototype.stop = function () {
            if (this.videoOcx) {
                this.videoOcx.stop(this.videoOcx.getFocusWindowIndex());
            }
        };
        fullPlayPopupController.$inject = ["$scope", "$timeout", '$http', 'notifyFactory', 'cameraService', 'systemInfoCacheFactory'];
        return fullPlayPopupController;
    }());
    main_app_1.app.controller("fullPlayPopupController", fullPlayPopupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvZnVsbFBsYXlQb3B1cC9mdWxsUGxheVBvcHVwLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBdUNBO1FBU0ksaUNBQW9CLE1BQVcsRUFBVSxRQUFhLEVBQVUsS0FBZSxFQUFVLGFBQXFDLEVBQVUsYUFBNkIsRUFBVSxzQkFBZ0Q7WUFBL04saUJBYUM7WUFibUIsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUFVLGFBQVEsR0FBUixRQUFRLENBQUs7WUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFVO1lBQVUsa0JBQWEsR0FBYixhQUFhLENBQXdCO1lBQVUsa0JBQWEsR0FBYixhQUFhLENBQWdCO1lBQVUsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUEwQjtZQUovTixvQkFBZSxHQUFZLEtBQUssQ0FBQztZQUs3QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQzFDLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUM7Z0JBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7Z0JBQ3JCLE1BQU0sQ0FBQTtZQUNWLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUM3RCxDQUFDO1lBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFO2dCQUN4QixLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZ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SUFBSSxDQUFDO2dCQUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7WUFDMUUsQ0FBQztRQUNMLENBQUM7UUFHRCxzQ0FBSSxHQUFKO1lBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1lBQzVELENBQUM7UUFDTCxDQUFDO1FBakhNLCtCQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUMsZUFBZSxFQUFFLHdCQUF3QixDQUFDLENBQUM7UUFtSGhILDhCQUFDO0tBcEhELEFBb0hDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLHlCQUF5QixFQUFFLHVCQUF1QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2Z1bGxQbGF5UG9wdXAvZnVsbFBsYXlQb3B1cC5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthcHB9IGZyb20gXCIuLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCB7QWxhcm1SZXN1bHRJbmZvfSBmcm9tIFwiLi4vLi4vY29yZS9lbnRpdHkvUGVyc29uQWxhcm1FbnVtXCI7XHJcbmltcG9ydCB7IElWaWRlb09jeENvbnRyb2xGdW5jLCBWaWRlb09jeFJlYWxUaW1lT3B0LCBWaWRlb09jeFB2Z0JhY2tPcHR9IGZyb20gXCIuLi9jb21tb24vZGlyZWN0aXZlL29jeC92aWRlby5vY3guZGlyZWN0aXZlXCI7XHJcbmltcG9ydCB7IElSZXNwb25zZU5vdGlmeUZhY3RvcnkgfSBmcm9tIFwiLi4vY29tbW9uL2ZhY3RvcnkvcmVzcG9uc2Uubm90aWZ5LmZhY3RvcnlcIjtcclxuaW1wb3J0IHsgUmVzcG9uc2VSZXN1bHQgfSBmcm9tIFwiLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7IEJhY2tSZXNwb25zZUJvZHkgfSBmcm9tIFwiLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCBcIi4uL2NvbW1vbi9zZXJ2aWNlcy9jYW1lcmEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBJQ2FtZXJhU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vc2VydmljZXMvY2FtZXJhLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCBcIi4uL2NvbW1vbi9mYWN0b3J5L3N5c3RlbUluZm8uY2FjaGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQge0lTeXN0ZW1JbmZvQ2FjaGVQcm92aWRlcn0gZnJvbSBcIi4uL2NvbW1vbi9mYWN0b3J5L3N5c3RlbUluZm8uY2FjaGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQge1N5c3RlbUNvbmZpZ1BhcmFtc30gZnJvbSBcIi4uLy4uL2NvcmUvZW50aXR5L1N5c3RlbUNvbmZpZ1BhcmFtc1wiO1xyXG5cclxuaW50ZXJmYWNlIFBsYXllckluZm8ge1xyXG4gICAgaWQ6c3RyaW5nOyAgICAgICAgICAgICAgICAgICAgLy/nm7jmnLppZCDlv4XkvKBcclxuICAgIHR5cGU6bnVtYmVyICAgICAgICAgICAgICAgICAgIC8v5pKt5pS+6KeG5bGP55qE57G75Z6LICBAW3Bhcm1zXSAxOuWunuaXtjsgMjrljoblj7I7XHJcbiAgICBhbGFybVRpbWU/OiBzdHJpbmcgfCBudW1iZXI7ICAvL+aKpeitpuaXtumXtCBAW3Bhcm1zXSA9PT7moLzlvI/npLrkvosgMTooIDIwMTcvMTEvMjMgMTI6MDA6MDAgKSBvciAoIDE1MTE0MDgxMjc3NjIgKSBcclxuICAgIFtwcm9wTmFtZTogc3RyaW5nXTogYW55O1xyXG59XHJcblxyXG4vLyB7XHJcbi8vICAgICAgICAgICAgIE5hbWU66K6+5aSH5ZCN56ewXHJcbi8vICAgICAgICAgICAgIElE77ya6K6+5aSHSURcclxuLy8gICAgICAgICAgICAgcG9zaXRpb27vvJrkvY3nva5cclxuLy8gICAgICAgICAgICAgZGF0YTp7XHJcbi8vICAgICAgICAgICAgICAgICBDb2RlOiAsXHJcbi8vICAgICAgICAgICAgICAgICBJcEFkZHJlc3M6ICxcclxuLy8gICAgICAgICAgICAgICAgIFBvcnQ6ICxcclxuLy8gICAgICAgICAgICAgICAgIFB3ZDogLFxyXG4vLyAgICAgICAgICAgICAgICAgVWlkOiAsXHJcbi8vICAgICAgICAgICAgICAgICBWaWRlb1NlcnZlclR5cGU6ICxcclxuLy8gICAgICAgICAgICAgICAgIFByb3h5U2VydmVySUQ6ICxcclxuLy8gICAgICAgICAgICAgICAgIFBsYXlOYW1lOiAsXHJcbi8vICAgICAgICAgICAgICAgICBQWUNvZGU6IFxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHRpbWXvvJpcclxuLy8gICAgICAgICAgICAgdHlwZe+8mlxyXG4vLyAgICAgICAgIH1cclxuXHJcbmNsYXNzIGZ1bGxQbGF5UG9wdXBDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wiJHNjb3BlXCIsIFwiJHRpbWVvdXRcIiwgJyRodHRwJywgJ25vdGlmeUZhY3RvcnknLCdjYW1lcmFTZXJ2aWNlJywgJ3N5c3RlbUluZm9DYWNoZUZhY3RvcnknXTtcclxuICAgIHBsYXllckluZm86IFBsYXllckluZm87XHJcbiAgICBhbGFybUluZm86IEFsYXJtUmVzdWx0SW5mbztcclxuICAgIHZpZGVvT2N4OiBJVmlkZW9PY3hDb250cm9sRnVuYztcclxuICAgIGlzU2hvd09jeFBsYXllcjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgbm90aWZ5RnVuYzogKHJlczogUmVzcG9uc2VSZXN1bHQ8YW55PikgPT4gUmVzcG9uc2VSZXN1bHQ8YW55PjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LCBwcml2YXRlICR0aW1lb3V0OiBhbnksIHByaXZhdGUgJGh0dHA6IEZ1bmN0aW9uLCBwcml2YXRlIG5vdGlmeUZhY3Rvcnk6IElSZXNwb25zZU5vdGlmeUZhY3RvcnksIHByaXZhdGUgY2FtZXJhU2VydmljZTogSUNhbWVyYVNlcnZpY2UsIHByaXZhdGUgc3lzdGVtSW5mb0NhY2hlRmFjdG9yeTogSVN5c3RlbUluZm9DYWNoZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gdGhpcy4kc2NvcGUuUG9pbnREZVRhaWw7XHJcbiAgICAgICAgaWYoIXRoaXMucGxheWVySW5mby5kYXRhJiYhdGhpcy5wbGF5ZXJJbmZvLnN0YXR1cyl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5rKh5pyJ5pKt5pS+5Zyw5Z2AXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucGxheWVySW5mby50eXBlID09IDIgJiYgdGhpcy4kc2NvcGUuUG9pbnREZVRhaWwudGltZSl7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVySW5mby5kYXRhLnRpbWUgPSB0aGlzLiRzY29wZS5Qb2ludERlVGFpbC50aW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLiRzY29wZS4kb24oXCIkZGVzdHJveVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudmlkZW9PY3ggPSBudWxsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubm90aWZ5RnVuYyA9IHRoaXMubm90aWZ5RmFjdG9yeS5tc2coeyBvbmx5U3VjY2VzczogdHJ1ZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0Q29tcGxldGUob2N4Q29udHJvbEZ1bmM6IElWaWRlb09jeENvbnRyb2xGdW5jKSB7XHJcbiAgICAgICAgdGhpcy52aWRlb09jeCA9IG9jeENvbnRyb2xGdW5jO1xyXG4gICAgICAgIHRoaXMuaW5pdFBsYXllcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWIneWni+WMluaSreaUvuWPguaVsFxyXG4gICAgcHJpdmF0ZSBpbml0UGxheWVyKCl7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheWVySW5mby50eXBlKXtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVySW5mby50eXBlID09IDEgJiYgdGhpcy5wbGF5ZXJJbmZvLnN0YXR1cyl7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7IHRoaXMucGxheVJlYWxUaW1lKHRoaXMucGxheWVySW5mbykgfSwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVySW5mby50eXBlID09IDIgJiYgdGhpcy5wbGF5ZXJJbmZvLnN0YXR1cyl7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7IHRoaXMucGxheVB2Z0JhY2sodGhpcy5wbGF5ZXJJbmZvKSB9LCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuacquajgOa1i+WIsOaSreaUvuaMh+S7pOWPguaVsFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5qC85byP5YyWT0NY5Y+v55So55qE5pKt5pS+5pe26Ze0XHJcbiAgICBwcml2YXRlIGZvcm1hdFRpbWUodGltZTpzdHJpbmcgLHRpbWVTbG90PzpudW1iZXIpIDpzdHJpbmcge1xyXG4gICAgICAgIGlmKCF0aW1lKXtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGF0YSA9IG5ldyBEYXRlKHRpbWUpO1xyXG4gICAgICAgIGlmICh0aW1lU2xvdCl7XHJcbiAgICAgICAgICAgIGRhdGEgPSBuZXcgRGF0ZShkYXRhLmdldFRpbWUoKSArIHRpbWVTbG90KjEwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgeWVhcj1kYXRhLmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgICAgIG1vbnRoID0gZGF0YS5nZXRNb250aCgpID49IDkgPyAoZGF0YS5nZXRNb250aCgpICsgMSkudG9TdHJpbmcoKSA6ICcwJyArIChkYXRhLmdldE1vbnRoKCkgKyAxKSxcclxuICAgICAgICAgICAgZGF5ID0gZGF0YS5nZXREYXRlKCkgPiA5ID8gZGF0YS5nZXREYXRlKCkudG9TdHJpbmcoKSA6ICcwJyArIGRhdGEuZ2V0RGF0ZSgpLFxyXG4gICAgICAgICAgICBob3VycyA9IGRhdGEuZ2V0SG91cnMoKSA+IDkgPyBkYXRhLmdldEhvdXJzKCkudG9TdHJpbmcoKSA6ICcwJyArIGRhdGEuZ2V0SG91cnMoKSxcclxuICAgICAgICAgICAgbWludXRlcyA9IGRhdGEuZ2V0TWludXRlcygpID4gOSA/IGRhdGEuZ2V0TWludXRlcygpLnRvU3RyaW5nKCkgOiAnMCcgKyBkYXRhLmdldE1pbnV0ZXMoKSxcclxuICAgICAgICAgICAgc3MgPSBkYXRhLmdldFNlY29uZHMoKSA+IDkgPyBkYXRhLmdldFNlY29uZHMoKS50b1N0cmluZygpIDogJzAnICsgZGF0YS5nZXRTZWNvbmRzKCk7XHJcbiAgICAgICAgcmV0dXJuIHllYXIgKyAgbW9udGggKyAgZGF5ICsgIGhvdXJzICsgIG1pbnV0ZXMgKyAgc3MgKyAnMDAwJztcclxuICAgIH1cclxuXHJcbiAgICAvL+aSreaUvuWOhuWPsuinhuWxjyBcclxuICAgIHByaXZhdGUgcGxheVB2Z0JhY2soZGF0YTphbnkpIHtcclxuICAgICAgICB0aGlzLmlzU2hvd09jeFBsYXllciA9IHRydWU7XHJcbiAgICAgICAgLy8g6L+H5rukXHJcbiAgICAgICAgaWYoIWRhdGEudGltZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudmlkZW9PY3gpIHtcclxuICAgICAgICAgICAgLy8g6I635Y+W5Y6G5Y+y5pKt5pS+6LW35aeL5pe26Ze0IFxyXG4gICAgICAgICAgICBsZXQgdGltZVNsb3RCZWdpbjogbnVtYmVyID0gLTMwO1xyXG4gICAgICAgICAgICBsZXQgdGltZVNsb3RBZnRlcjogbnVtYmVyID0gMzA7XHJcbiAgICAgICAgICAgIC8vIOWIneWni+WMluezu+e7n+mFjee9rlxyXG4gICAgICAgICAgICBsZXQgc3lzdGVtRGF0YTogU3lzdGVtQ29uZmlnUGFyYW1zID0gdGhpcy5zeXN0ZW1JbmZvQ2FjaGVGYWN0b3J5LmdldFN5c3RlbUluZm8oKTtcclxuICAgICAgICAgICAgdGltZVNsb3RCZWdpbiA9IDAgLSBzeXN0ZW1EYXRhLnZpZGVvQmVmb3JlVGltZTtcclxuICAgICAgICAgICAgdGltZVNsb3RBZnRlciA9IHN5c3RlbURhdGEudmlkZW9BZnRlclRpbWUqMTtcclxuICAgICAgICAgICAgLy8g5qC85byP5YyWT0NY5pKt5pS+5Y+C5pWwXHJcbiAgICAgICAgICAgIGxldCBvcHRzID0gbmV3IFZpZGVvT2N4UHZnQmFja09wdCgpO1xyXG4gICAgICAgICAgICBvcHRzLmlwID0gZGF0YS5kYXRhLklwQWRkcmVzcztcclxuICAgICAgICAgICAgb3B0cy5wb3J0ID0gZGF0YS5kYXRhLlBvcnQ7XHJcbiAgICAgICAgICAgIG9wdHMucGF0aCA9IGRhdGEuZGF0YS5QbGF5TmFtZTtcclxuICAgICAgICAgICAgb3B0cy51c2VyID0gZGF0YS5kYXRhLlVpZDtcclxuICAgICAgICAgICAgb3B0cy5wYXNzd2QgPSBkYXRhLmRhdGEuUHdkO1xyXG4gICAgICAgICAgICBvcHRzLmRpc3BsYXlNb2RlbCA9IHRoaXMucGxheWVySW5mby5kaXNwbGF5TW9kZWwgfHwgMDtcclxuICAgICAgICAgICAgb3B0cy5od2RlY29kZXIgPSB0aGlzLnBsYXllckluZm8uaHdkZWNvZGVyIHx8IDA7XHJcbiAgICAgICAgICAgIG9wdHMuYmVnaW5UaW1lID0gdGhpcy5mb3JtYXRUaW1lKGRhdGEudGltZSwgdGltZVNsb3RCZWdpbik7XHJcbiAgICAgICAgICAgIG9wdHMuZW5kVGltZSA9IHRoaXMuZm9ybWF0VGltZShkYXRhLnRpbWUsIHRpbWVTbG90QWZ0ZXIpO1xyXG4gICAgICAgICAgICAvLyDkvKDlhaVPQ1jlj4LmlbDvvIzlvIDlp4vmkq3mlL5cclxuICAgICAgICAgICAgY29uc29sZS5sb2cob3B0cywnaGlzdG9yeSB2aWRlbyBwbGF5IGluaXQnKTtcclxuICAgICAgICAgICAgdGhpcy52aWRlb09jeC5wbGF5UHZnQmFjayhvcHRzLCB0aGlzLnZpZGVvT2N4LmdldEZvY3VzV2luZG93SW5kZXgoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOaSreaUvuWunuaXtlxyXG4gICAgcHJpdmF0ZSBwbGF5UmVhbFRpbWUoZGF0YTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dPY3hQbGF5ZXIgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLnZpZGVvT2N4KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMudmlkZW9PY3guZ2V0Rm9jdXNXaW5kb3dJbmRleCgpLCB0aGlzLnZpZGVvT2N4KTtcclxuICAgICAgICAgICAgbGV0IG9wdHMgPSBuZXcgVmlkZW9PY3hSZWFsVGltZU9wdCgpO1xyXG4gICAgICAgICAgICBvcHRzLmlwID0gZGF0YS5kYXRhLklwQWRkcmVzcztcclxuICAgICAgICAgICAgb3B0cy5wb3J0ID0gZGF0YS5kYXRhLlBvcnQ7XHJcbiAgICAgICAgICAgIG9wdHMucGF0aCA9IGRhdGEuZGF0YS5QbGF5TmFtZTtcclxuICAgICAgICAgICAgb3B0cy51c2VyID0gZGF0YS5kYXRhLlVpZDtcclxuICAgICAgICAgICAgb3B0cy5wYXNzd2QgPSBkYXRhLmRhdGEuUHdkO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhvcHRzLCAncmVhbCB2aWRlbyBwbGF5IGluaXQnKTtcclxuICAgICAgICAgICAgdGhpcy52aWRlb09jeC5wbGF5UmVhbFRpbWUob3B0cywgdGhpcy52aWRlb09jeC5nZXRGb2N1c1dpbmRvd0luZGV4KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDnu4jmraLmkq3mlL4g6ZSA5q+B5pKt5pS+56qX5L2TXHJcbiAgICBzdG9wKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnZpZGVvT2N4KSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlkZW9PY3guc3RvcCh0aGlzLnZpZGVvT2N4LmdldEZvY3VzV2luZG93SW5kZXgoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoXCJmdWxsUGxheVBvcHVwQ29udHJvbGxlclwiLCBmdWxsUGxheVBvcHVwQ29udHJvbGxlcik7Il19
