define(["require", "exports", "../../common/app/main.app", "../../common/directive/ocx/video.ocx.directive", "../../common/services/camera.service", "../../common/factory/systemInfo.cache.factory"], function (require, exports, main_app_1, video_ocx_directive_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var VideoMapPointController = (function () {
        function VideoMapPointController($scope, $timeout, $http, notifyFactory, cameraService, systemInfoCacheFactory) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$http = $http;
            this.notifyFactory = notifyFactory;
            this.cameraService = cameraService;
            this.systemInfoCacheFactory = systemInfoCacheFactory;
            this.isShowOcxPlayer = false;
            this.playerInfo = this.$scope.PointDeTail;
            if (!this.playerInfo.data && !this.$scope.PointDeTail.time) {
                return;
            }
            this.playerInfo.data.time = this.$scope.PointDeTail.time;
            this.alarmInfo = this.$scope.alarmInfo;
            this.$scope.$on("$destroy", function () {
                _this.videoOcx = null;
            });
            this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
        }
        VideoMapPointController.prototype.initComplete = function (ocxControlFunc) {
            this.videoOcx = ocxControlFunc;
            this.initPlayer();
        };
        VideoMapPointController.prototype.initPlayer = function () {
            var _this = this;
            if (this.playerInfo.status && this.playerInfo.type) {
                if (this.playerInfo.type == 1) {
                    window.setTimeout(function () { _this.playRealTime(_this.playerInfo); }, 0);
                }
                if (this.playerInfo.type == 2) {
                    window.setTimeout(function () { _this.playPvgBack(_this.playerInfo); }, 0);
                }
            }
            else {
                console.log("未检测到播放指令参数");
            }
        };
        VideoMapPointController.prototype.formatTime = function (time, timeSlot) {
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
        VideoMapPointController.prototype.playPvgBack = function (data) {
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
                opts.ip = data.IpAddress;
                opts.port = data.Port;
                opts.path = data.PlayName;
                opts.user = data.Uid;
                opts.passwd = data.Pwd;
                opts.displayModel = this.playerInfo.displayModel || 0;
                opts.hwdecoder = this.playerInfo.hwdecoder || 0;
                opts.beginTime = this.formatTime(data.time, timeSlotBegin);
                opts.endTime = this.formatTime(data.time, timeSlotAfter);
                console.log(opts, 'history video play init');
                this.videoOcx.playPvgBack(opts, this.videoOcx.getFocusWindowIndex());
            }
        };
        VideoMapPointController.prototype.playRealTime = function (data) {
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
        VideoMapPointController.prototype.stop = function () {
            if (this.videoOcx) {
                this.videoOcx.stop(this.videoOcx.getFocusWindowIndex());
            }
        };
        VideoMapPointController.$inject = ["$scope", "$timeout", '$http', 'notifyFactory', 'cameraService', 'systemInfoCacheFactory'];
        return VideoMapPointController;
    }());
    main_app_1.app.controller("videoMapPointController", VideoMapPointController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFwUG9pbnQvdmlkZW9NYXBQb2ludC92aWRlb01hcFBvaW50LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBbUJBO1FBU0ksaUNBQW9CLE1BQVcsRUFBVSxRQUFhLEVBQVUsS0FBZSxFQUFVLGFBQXFDLEVBQVUsYUFBNkIsRUFBVSxzQkFBZ0Q7WUFBL04saUJBWUM7WUFabUIsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUFVLGFBQVEsR0FBUixRQUFRLENBQUs7WUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFVO1lBQVUsa0JBQWEsR0FBYixhQUFhLENBQXdCO1lBQVUsa0JBQWEsR0FBYixhQUFhLENBQWdCO1lBQVUsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUEwQjtZQUovTixvQkFBZSxHQUFZLEtBQUssQ0FBQztZQU03QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQzFDLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDO2dCQUNyRCxNQUFNLENBQUE7WUFDVixDQUFDO1lBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUN6RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtnQkFDeEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDcEUsQ0FBQztRQUVELDhDQUFZLEdBQVosVUFBYSxjQUFvQztZQUM3QyxJQUFJLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQztZQUMvQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdEIsQ0FBQztRQUdPLDRDQUFVLEdBQWxCO1lBQUEsaUJBV0M7WUFWRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7Z0JBQ2hELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFFLENBQUMsQ0FBQyxDQUFBLENBQUM7b0JBQ3pCLE1BQU0sQ0FBQyxVQUFVLENBQUMsY0FBUSxLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdkUsQ0FBQztnQkFDRCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksSUFBRSxDQUFDLENBQUMsQ0FBQSxDQUFDO29CQUN4QixNQUFNLENBQUMsVUFBVSxDQUFDLGNBQVEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RFLENBQUM7WUFDTCxDQUFDO1lBQUEsSUFBSSxDQUFBLENBQUM7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM5QixDQUFDO1FBQ0wsQ0FBQztRQUdPLDRDQUFVLEdBQWxCLFVBQW1CLElBQVcsRUFBQyxRQUFnQjtZQUMzQyxFQUFFLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7Z0JBQ04sTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNkLENBQUM7WUFDRCxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFDO2dCQUNWLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BELENBQUM7WUFDRCxJQUFJLElBQUksR0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQ3ZCLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUM3RixHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUMzRSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUNoRixPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUN4RixFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFB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QyxHQUFHLENBQUM7Z0JBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLHNCQUFzQixDQUFDLENBQUM7Z0JBQzFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQztZQUMxRSxDQUFDO1FBQ0wsQ0FBQztRQUdELHNDQUFJLEdBQUo7WUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7WUFDNUQsQ0FBQztRQUNMLENBQUM7UUFoSE0sK0JBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBQyxlQUFlLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztRQWtIaEgsOEJBQUM7S0FuSEQsQUFtSEMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMseUJBQXlCLEVBQUUsdUJBQXVCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvbWFwUG9pbnQvdmlkZW9NYXBQb2ludC92aWRlb01hcFBvaW50LmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHtBbGFybVJlc3VsdEluZm99IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9QZXJzb25BbGFybUVudW1cIjtcclxuaW1wb3J0IHsgSVZpZGVvT2N4Q29udHJvbEZ1bmMsIFZpZGVvT2N4UmVhbFRpbWVPcHQsIFZpZGVvT2N4UHZnQmFja09wdH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvb2N4L3ZpZGVvLm9jeC5kaXJlY3RpdmVcIjtcclxuaW1wb3J0IHsgSVJlc3BvbnNlTm90aWZ5RmFjdG9yeSB9IGZyb20gXCIuLi8uLi9jb21tb24vZmFjdG9yeS9yZXNwb25zZS5ub3RpZnkuZmFjdG9yeVwiO1xyXG5pbXBvcnQgeyBSZXNwb25zZVJlc3VsdCB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHsgQmFja1Jlc3BvbnNlQm9keSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2NhbWVyYS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IElDYW1lcmFTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9jYW1lcmEuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL2ZhY3Rvcnkvc3lzdGVtSW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7SVN5c3RlbUluZm9DYWNoZVByb3ZpZGVyfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZhY3Rvcnkvc3lzdGVtSW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7U3lzdGVtQ29uZmlnUGFyYW1zfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvU3lzdGVtQ29uZmlnUGFyYW1zXCI7XHJcblxyXG5pbnRlcmZhY2UgUGxheWVySW5mbyB7XHJcbiAgICBpZDpzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAvL+ebuOacumlkIOW/heS8oFxyXG4gICAgdHlwZTpudW1iZXIgICAgICAgICAgICAgICAgICAgLy/mkq3mlL7op4blsY/nmoTnsbvlnosgIEBbcGFybXNdIDE65a6e5pe2OyAyOuWOhuWPsjtcclxuICAgIGFsYXJtVGltZT86IHN0cmluZyB8IG51bWJlcjsgIC8v5oql6K2m5pe26Ze0IEBbcGFybXNdID09PuagvOW8j+ekuuS+iyAxOiggMjAxNy8xMS8yMyAxMjowMDowMCApIG9yICggMTUxMTQwODEyNzc2MiApXHJcbiAgICBbcHJvcE5hbWU6IHN0cmluZ106IGFueTtcclxufVxyXG5jbGFzcyBWaWRlb01hcFBvaW50Q29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFtcIiRzY29wZVwiLCBcIiR0aW1lb3V0XCIsICckaHR0cCcsICdub3RpZnlGYWN0b3J5JywnY2FtZXJhU2VydmljZScsICdzeXN0ZW1JbmZvQ2FjaGVGYWN0b3J5J107XHJcbiAgICBwbGF5ZXJJbmZvOiBQbGF5ZXJJbmZvO1xyXG4gICAgYWxhcm1JbmZvOiBBbGFybVJlc3VsdEluZm87XHJcbiAgICB2aWRlb09jeDogSVZpZGVvT2N4Q29udHJvbEZ1bmM7XHJcbiAgICBpc1Nob3dPY3hQbGF5ZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIG5vdGlmeUZ1bmM6IChyZXM6IFJlc3BvbnNlUmVzdWx0PGFueT4pID0+IFJlc3BvbnNlUmVzdWx0PGFueT47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSwgcHJpdmF0ZSAkdGltZW91dDogYW55LCBwcml2YXRlICRodHRwOiBGdW5jdGlvbiwgcHJpdmF0ZSBub3RpZnlGYWN0b3J5OiBJUmVzcG9uc2VOb3RpZnlGYWN0b3J5LCBwcml2YXRlIGNhbWVyYVNlcnZpY2U6IElDYW1lcmFTZXJ2aWNlLCBwcml2YXRlIHN5c3RlbUluZm9DYWNoZUZhY3Rvcnk6IElTeXN0ZW1JbmZvQ2FjaGVQcm92aWRlcikge1xyXG5cclxuICAgICAgICB0aGlzLnBsYXllckluZm8gPSB0aGlzLiRzY29wZS5Qb2ludERlVGFpbDtcclxuICAgICAgICBpZighdGhpcy5wbGF5ZXJJbmZvLmRhdGEmJiF0aGlzLiRzY29wZS5Qb2ludERlVGFpbC50aW1lKXtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGxheWVySW5mby5kYXRhLnRpbWUgPSB0aGlzLiRzY29wZS5Qb2ludERlVGFpbC50aW1lO1xyXG4gICAgICAgIHRoaXMuYWxhcm1JbmZvID0gdGhpcy4kc2NvcGUuYWxhcm1JbmZvO1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbihcIiRkZXN0cm95XCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy52aWRlb09jeCA9IG51bGw7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5ub3RpZnlGdW5jID0gdGhpcy5ub3RpZnlGYWN0b3J5Lm1zZyh7IG9ubHlTdWNjZXNzOiB0cnVlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRDb21wbGV0ZShvY3hDb250cm9sRnVuYzogSVZpZGVvT2N4Q29udHJvbEZ1bmMpIHtcclxuICAgICAgICB0aGlzLnZpZGVvT2N4ID0gb2N4Q29udHJvbEZ1bmM7XHJcbiAgICAgICAgdGhpcy5pbml0UGxheWVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Yid5aeL5YyW5pKt5pS+5Y+C5pWwXHJcbiAgICBwcml2YXRlIGluaXRQbGF5ZXIoKXtcclxuICAgICAgICBpZiAodGhpcy5wbGF5ZXJJbmZvLnN0YXR1cyAmJiB0aGlzLnBsYXllckluZm8udHlwZSl7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllckluZm8udHlwZT09MSl7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7IHRoaXMucGxheVJlYWxUaW1lKHRoaXMucGxheWVySW5mbykgfSwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5wbGF5ZXJJbmZvLnR5cGU9PTIpe1xyXG4gICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4geyB0aGlzLnBsYXlQdmdCYWNrKHRoaXMucGxheWVySW5mbykgfSwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmnKrmo4DmtYvliLDmkq3mlL7mjIfku6Tlj4LmlbBcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOagvOW8j+WMlk9DWOWPr+eUqOeahOaSreaUvuaXtumXtFxyXG4gICAgcHJpdmF0ZSBmb3JtYXRUaW1lKHRpbWU6c3RyaW5nLHRpbWVTbG90PzpudW1iZXIpIDpzdHJpbmcge1xyXG4gICAgICAgIGlmKCF0aW1lKXtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGF0YSA9IG5ldyBEYXRlKHRpbWUpO1xyXG4gICAgICAgIGlmICh0aW1lU2xvdCl7XHJcbiAgICAgICAgICAgIGRhdGEgPSBuZXcgRGF0ZShkYXRhLmdldFRpbWUoKSArIHRpbWVTbG90KjEwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgeWVhcj1kYXRhLmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgICAgIG1vbnRoID0gZGF0YS5nZXRNb250aCgpID49IDkgPyAoZGF0YS5nZXRNb250aCgpICsgMSkudG9TdHJpbmcoKSA6ICcwJyArIChkYXRhLmdldE1vbnRoKCkgKyAxKSxcclxuICAgICAgICAgICAgZGF5ID0gZGF0YS5nZXREYXRlKCkgPiA5ID8gZGF0YS5nZXREYXRlKCkudG9TdHJpbmcoKSA6ICcwJyArIGRhdGEuZ2V0RGF0ZSgpLFxyXG4gICAgICAgICAgICBob3VycyA9IGRhdGEuZ2V0SG91cnMoKSA+IDkgPyBkYXRhLmdldEhvdXJzKCkudG9TdHJpbmcoKSA6ICcwJyArIGRhdGEuZ2V0SG91cnMoKSxcclxuICAgICAgICAgICAgbWludXRlcyA9IGRhdGEuZ2V0TWludXRlcygpID4gOSA/IGRhdGEuZ2V0TWludXRlcygpLnRvU3RyaW5nKCkgOiAnMCcgKyBkYXRhLmdldE1pbnV0ZXMoKSxcclxuICAgICAgICAgICAgc3MgPSBkYXRhLmdldFNlY29uZHMoKSA+IDkgPyBkYXRhLmdldFNlY29uZHMoKS50b1N0cmluZygpIDogJzAnICsgZGF0YS5nZXRTZWNvbmRzKCk7XHJcbiAgICAgICAgcmV0dXJuIHllYXIgKyAgbW9udGggKyAgZGF5ICsgIGhvdXJzICsgIG1pbnV0ZXMgKyAgc3MgKyAnMDAwJztcclxuICAgIH1cclxuXHJcbiAgICAvL+aSreaUvuWOhuWPsuinhuWxj1xyXG4gICAgcHJpdmF0ZSBwbGF5UHZnQmFjayhkYXRhOmFueSkge1xyXG4gICAgICAgIHRoaXMuaXNTaG93T2N4UGxheWVyID0gdHJ1ZTtcclxuICAgICAgICAvLyDov4fmu6RcclxuICAgICAgICBpZighZGF0YS50aW1lKXtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnZpZGVvT2N4KSB7XHJcbiAgICAgICAgICAgIC8vIOiOt+WPluWOhuWPsuaSreaUvui1t+Wni+aXtumXtFxyXG4gICAgICAgICAgICBsZXQgdGltZVNsb3RCZWdpbjogbnVtYmVyID0gLTMwO1xyXG4gICAgICAgICAgICBsZXQgdGltZVNsb3RBZnRlcjogbnVtYmVyID0gMzA7XHJcbiAgICAgICAgICAgIC8vIOWIneWni+WMluezu+e7n+mFjee9rlxyXG4gICAgICAgICAgICBsZXQgc3lzdGVtRGF0YTogU3lzdGVtQ29uZmlnUGFyYW1zID0gdGhpcy5zeXN0ZW1JbmZvQ2FjaGVGYWN0b3J5LmdldFN5c3RlbUluZm8oKTtcclxuICAgICAgICAgICAgdGltZVNsb3RCZWdpbiA9IDAgLSBzeXN0ZW1EYXRhLnZpZGVvQmVmb3JlVGltZTtcclxuICAgICAgICAgICAgdGltZVNsb3RBZnRlciA9IHN5c3RlbURhdGEudmlkZW9BZnRlclRpbWUqMTtcclxuICAgICAgICAgICAgLy8g5qC85byP5YyWT0NY5pKt5pS+5Y+C5pWwXHJcbiAgICAgICAgICAgIGxldCBvcHRzID0gbmV3IFZpZGVvT2N4UHZnQmFja09wdCgpO1xyXG4gICAgICAgICAgICBvcHRzLmlwID0gZGF0YS5JcEFkZHJlc3M7XHJcbiAgICAgICAgICAgIG9wdHMucG9ydCA9IGRhdGEuUG9ydDtcclxuICAgICAgICAgICAgb3B0cy5wYXRoID0gZGF0YS5QbGF5TmFtZTtcclxuICAgICAgICAgICAgb3B0cy51c2VyID0gZGF0YS5VaWQ7XHJcbiAgICAgICAgICAgIG9wdHMucGFzc3dkID0gZGF0YS5Qd2Q7XHJcbiAgICAgICAgICAgIG9wdHMuZGlzcGxheU1vZGVsID0gdGhpcy5wbGF5ZXJJbmZvLmRpc3BsYXlNb2RlbCB8fCAwO1xyXG4gICAgICAgICAgICBvcHRzLmh3ZGVjb2RlciA9IHRoaXMucGxheWVySW5mby5od2RlY29kZXIgfHwgMDtcclxuICAgICAgICAgICAgb3B0cy5iZWdpblRpbWUgPSB0aGlzLmZvcm1hdFRpbWUoZGF0YS50aW1lLCB0aW1lU2xvdEJlZ2luKTtcclxuICAgICAgICAgICAgb3B0cy5lbmRUaW1lID0gdGhpcy5mb3JtYXRUaW1lKGRhdGEudGltZSwgdGltZVNsb3RBZnRlcik7XHJcbiAgICAgICAgICAgIC8vIOS8oOWFpU9DWOWPguaVsO+8jOW8gOWni+aSreaUvlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhvcHRzLCdoaXN0b3J5IHZpZGVvIHBsYXkgaW5pdCcpO1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvT2N4LnBsYXlQdmdCYWNrKG9wdHMsIHRoaXMudmlkZW9PY3guZ2V0Rm9jdXNXaW5kb3dJbmRleCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5pKt5pS+5a6e5pe2XHJcbiAgICBwcml2YXRlIHBsYXlSZWFsVGltZShkYXRhOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmlzU2hvd09jeFBsYXllciA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMudmlkZW9PY3gpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy52aWRlb09jeC5nZXRGb2N1c1dpbmRvd0luZGV4KCksIHRoaXMudmlkZW9PY3gpO1xyXG4gICAgICAgICAgICBsZXQgb3B0cyA9IG5ldyBWaWRlb09jeFJlYWxUaW1lT3B0KCk7XHJcbiAgICAgICAgICAgIG9wdHMuaXAgPSBkYXRhLmRhdGEuSXBBZGRyZXNzO1xyXG4gICAgICAgICAgICBvcHRzLnBvcnQgPSBkYXRhLmRhdGEuUG9ydDtcclxuICAgICAgICAgICAgb3B0cy5wYXRoID0gZGF0YS5kYXRhLlBsYXlOYW1lO1xyXG4gICAgICAgICAgICBvcHRzLnVzZXIgPSBkYXRhLmRhdGEuVWlkO1xyXG4gICAgICAgICAgICBvcHRzLnBhc3N3ZCA9IGRhdGEuZGF0YS5Qd2Q7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG9wdHMsICdyZWFsIHZpZGVvIHBsYXkgaW5pdCcpO1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvT2N4LnBsYXlSZWFsVGltZShvcHRzLCB0aGlzLnZpZGVvT2N4LmdldEZvY3VzV2luZG93SW5kZXgoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOe7iOatouaSreaUviDplIDmr4Hmkq3mlL7nqpfkvZNcclxuICAgIHN0b3AoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmlkZW9PY3gpIHtcclxuICAgICAgICAgICAgdGhpcy52aWRlb09jeC5zdG9wKHRoaXMudmlkZW9PY3guZ2V0Rm9jdXNXaW5kb3dJbmRleCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcihcInZpZGVvTWFwUG9pbnRDb250cm9sbGVyXCIsIFZpZGVvTWFwUG9pbnRDb250cm9sbGVyKTsiXX0=
