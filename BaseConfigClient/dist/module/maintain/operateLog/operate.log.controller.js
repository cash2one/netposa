define(["require", "exports", "../../common/app/main.app", "./actionLog/actionLog.controller", "./runLog/runLog.controller", "css!module/maintain/css/maintain-operateLog.css", "../../common/services/maintain.service"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deviceArray = [
        { type: "actionLog", name: "操作日志", path: "/module/maintain/operateLog/actionLog/actionLog.html?v=" + new Date().getTime(), status: true },
        { type: "runLog", name: "运行日志", path: "/module/maintain/operateLog/runLog/runLog.html?v=" + new Date().getTime(), status: false }
    ];
    var OperateLogController = (function () {
        function OperateLogController($scope) {
            this.$scope = $scope;
            this.deviceArray = exports.deviceArray;
            this.htmlUrl = "/module/maintain/operateLog/actionLog/actionLog.html";
        }
        OperateLogController.prototype.switchDevicePage = function (deviceName) {
            if (deviceName) {
                for (var i = 0; i < this.deviceArray.length; i++) {
                    if (this.deviceArray[i].type == deviceName) {
                        this.deviceArray[i].status = true;
                        this.htmlUrl = this.deviceArray[i].path;
                    }
                    else {
                        this.deviceArray[i].status = false;
                    }
                }
            }
        };
        OperateLogController.$inject = ['$scope'];
        return OperateLogController;
    }());
    main_app_1.app.controller("operateLogController", OperateLogController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFpbnRhaW4vb3BlcmF0ZUxvZy9vcGVyYXRlLmxvZy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWlCYSxRQUFBLFdBQVcsR0FBRztRQUN2QixFQUFDLElBQUksRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMseURBQXlELEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUMsSUFBSSxFQUFDO1FBQ25JLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxtREFBbUQsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBQyxLQUFLLEVBQUM7S0FDdkcsQ0FBQztJQUV6QjtRQU9JLDhCQUNZLE1BQVU7WUFBVixXQUFNLEdBQU4sTUFBTSxDQUFJO1lBSnRCLGdCQUFXLEdBQXdCLG1CQUFXLENBQUM7WUFDL0MsWUFBTyxHQUFVLHNEQUFzRCxDQUFDO1FBS3hFLENBQUM7UUFFTSwrQ0FBZ0IsR0FBdkIsVUFBd0IsVUFBaUI7WUFDckMsRUFBRSxDQUFBLENBQUMsVUFBVSxDQUFDLENBQUEsQ0FBQztnQkFDWCxHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUM7b0JBQ3ZDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLFVBQVUsQ0FBQyxDQUFBLENBQUM7d0JBQ3ZDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzt3QkFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDNUMsQ0FBQztvQkFBQSxJQUFJLENBQUEsQ0FBQzt3QkFDRixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7b0JBQ3RDLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBckJNLDRCQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQXVCaEMsMkJBQUM7S0F6QkQsQUF5QkMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvbWFpbnRhaW4vb3BlcmF0ZUxvZy9vcGVyYXRlLmxvZy5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE3LzQvMjQuXHJcbiAqL1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuXHJcbmltcG9ydCBcIi4vYWN0aW9uTG9nL2FjdGlvbkxvZy5jb250cm9sbGVyXCI7XHJcbmltcG9ydCBcIi4vcnVuTG9nL3J1bkxvZy5jb250cm9sbGVyXCI7XHJcbmltcG9ydCBcImNzcyFtb2R1bGUvbWFpbnRhaW4vY3NzL21haW50YWluLW9wZXJhdGVMb2cuY3NzXCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9tYWludGFpbi5zZXJ2aWNlXCJcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgZGV2aWNlT2JqZWN0e1xyXG4gICAgdHlwZTpzdHJpbmc7XHJcbiAgICBwYXRoOnN0cmluZztcclxuICAgIG5hbWU6c3RyaW5nO1xyXG4gICAgc3RhdHVzOmJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBkZXZpY2VBcnJheSA9IFtcclxuICAgIHt0eXBlOlwiYWN0aW9uTG9nXCIsIG5hbWU6XCLmk43kvZzml6Xlv5dcIiwgcGF0aDpcIi9tb2R1bGUvbWFpbnRhaW4vb3BlcmF0ZUxvZy9hY3Rpb25Mb2cvYWN0aW9uTG9nLmh0bWw/dj1cIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpLCBzdGF0dXM6dHJ1ZX0sXHJcbiAgICB7dHlwZTpcInJ1bkxvZ1wiLCBuYW1lOlwi6L+Q6KGM5pel5b+XXCIsIHBhdGg6XCIvbW9kdWxlL21haW50YWluL29wZXJhdGVMb2cvcnVuTG9nL3J1bkxvZy5odG1sP3Y9XCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKSwgc3RhdHVzOmZhbHNlfVxyXG5dIGFzIEFycmF5PGRldmljZU9iamVjdD47XHJcblxyXG5jbGFzcyBPcGVyYXRlTG9nQ29udHJvbGxlcntcclxuXHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJ107XHJcblxyXG4gICAgZGV2aWNlQXJyYXk6IEFycmF5PGRldmljZU9iamVjdD4gPSBkZXZpY2VBcnJheTtcclxuICAgIGh0bWxVcmw6c3RyaW5nID0gXCIvbW9kdWxlL21haW50YWluL29wZXJhdGVMb2cvYWN0aW9uTG9nL2FjdGlvbkxvZy5odG1sXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSAkc2NvcGU6YW55XHJcbiAgICApe1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzd2l0Y2hEZXZpY2VQYWdlKGRldmljZU5hbWU6c3RyaW5nKXtcclxuICAgICAgICBpZihkZXZpY2VOYW1lKXtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmRldmljZUFycmF5Lmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5kZXZpY2VBcnJheVtpXS50eXBlID09IGRldmljZU5hbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGV2aWNlQXJyYXlbaV0uc3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmh0bWxVcmwgPSB0aGlzLmRldmljZUFycmF5W2ldLnBhdGg7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldmljZUFycmF5W2ldLnN0YXR1cyA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcihcIm9wZXJhdGVMb2dDb250cm9sbGVyXCIsIE9wZXJhdGVMb2dDb250cm9sbGVyKTsiXX0=
