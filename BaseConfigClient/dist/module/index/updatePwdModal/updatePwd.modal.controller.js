define(["require", "exports", "../../common/app/main.app", "../../common/portrait-tool", "../../common/system-config", "css!../../baseconfig/css/baseconfig-face.css"], function (require, exports, main_app_1, portrait_tool_1, system_config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UpdatePwdModalController = (function () {
        function UpdatePwdModalController($scope, $timeout, layer, $base64, mainService, userInfoCacheFactory, i18nFactory) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.layer = layer;
            this.$base64 = $base64;
            this.mainService = mainService;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.i18nFactory = i18nFactory;
            this.viewPwds = {};
            var loginData = portrait_tool_1.default.getLocalStorageData(system_config_1.SystemConfig.USER_DATA_KEY);
            if (loginData) {
                this.oldPwd = this.$base64.decode(loginData.password);
            }
            this.closeEmitName = this.$scope.closeEmitName;
            this.provingTexts = [
                "FDS_00_14_01",
                "FDS_00_14_02"
            ];
        }
        UpdatePwdModalController.prototype.closeUpdateModel = function (isLoginOut) {
            this.$scope.$emit(this.closeEmitName, isLoginOut);
        };
        UpdatePwdModalController.prototype.commitUpdate = function () {
            var _this = this;
            if (this.isRePwdError || this.isOldPwdError) {
                return;
            }
            var params = {
                oldPwd: portrait_tool_1.default.md5(this.oldPwd),
                newPwd: portrait_tool_1.default.md5(this.viewPwds.newPwd),
                username: this.userInfoCacheFactory.getCurrentUid()
            };
            this.mainService.updatePwdToFcs(params).then(function (resp) {
                if (resp.code === 200) {
                    _this.updatePwdToBcs(params);
                }
            });
        };
        UpdatePwdModalController.prototype.updatePwdToBcs = function (params) {
            var _this = this;
            this.mainService.updatePwdToBcs(params).then(function (resp) {
                if (resp.code === 200) {
                    _this.layer.msg(_this.i18nFactory('FDS_00_13_07'));
                    _this.$timeout(function () {
                        _this.closeUpdateModel(true);
                    }, 2000);
                }
                else {
                    _this.rollBackUpdateToFcs(params);
                }
            }, function () {
                _this.rollBackUpdateToFcs(params);
            });
        };
        ;
        UpdatePwdModalController.prototype.rollBackUpdateToFcs = function (params) {
            var _params = {};
            _params.newPwd = params.oldPwd;
            _params.oldPwd = params.newPwd;
            _params.username = params.username;
            this.mainService.updatePwdToFcs(params).then(function (resp) {
            });
        };
        UpdatePwdModalController.prototype.compareOldPwd = function (valid) {
            if (valid && this.viewPwds.oldPwd) {
                if (this.oldPwd !== this.viewPwds.oldPwd) {
                    this.isOldPwdError = true;
                }
            }
            else {
                this.isOldPwdError = false;
            }
        };
        ;
        UpdatePwdModalController.prototype.compareNewPwd = function (valid) {
            this.isRePwdError = valid && this.viewPwds.newPwd !== this.viewPwds.rePwd;
        };
        ;
        UpdatePwdModalController.$inject = [
            '$scope',
            '$timeout',
            'layer',
            '$base64',
            'mainService',
            'userInfoCacheFactory',
            'i18nFactory'
        ];
        return UpdatePwdModalController;
    }());
    main_app_1.app.controller("updatePwdModalController", UpdatePwdModalController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvaW5kZXgvdXBkYXRlUHdkTW9kYWwvdXBkYXRlUHdkLm1vZGFsLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBV0E7UUEwQkksa0NBQ1ksTUFBVyxFQUNYLFFBQVksRUFDWixLQUFTLEVBQ1QsT0FBVyxFQUNYLFdBQXdCLEVBQ3hCLG9CQUEwQyxFQUMxQyxXQUFlO1lBTmYsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGFBQVEsR0FBUixRQUFRLENBQUk7WUFDWixVQUFLLEdBQUwsS0FBSyxDQUFJO1lBQ1QsWUFBTyxHQUFQLE9BQU8sQ0FBSTtZQUNYLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1lBQ3hCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7WUFDMUMsZ0JBQVcsR0FBWCxXQUFXLENBQUk7WUFFdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUlmLENBQUM7WUFDRixJQUFJLFNBQVMsR0FBcUIsdUJBQVksQ0FBQyxtQkFBbUIsQ0FBQyw0QkFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQy9GLEVBQUUsQ0FBQSxDQUFDLFNBQVMsQ0FBQyxDQUFBLENBQUM7Z0JBQ1YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUU7WUFDM0QsQ0FBQztZQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7WUFDL0MsSUFBSSxDQUFDLFlBQVksR0FBRztnQkFDaEIsY0FBYztnQkFDZCxjQUFjO2FBQ2pCLENBQUM7UUFDTixDQUFDO1FBRUQsbURBQWdCLEdBQWhCLFVBQWlCLFVBQWtCO1lBRS9CLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDdEQsQ0FBQztRQUdELCtDQUFZLEdBQVo7WUFBQSxpQkFjQztZQWJHLEVBQUUs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QzdFLENBQUM7UUFBQSxDQUFDO1FBcEdLLGdDQUFPLEdBQUc7WUFDYixRQUFRO1lBQ1IsVUFBVTtZQUNWLE9BQU87WUFDUCxTQUFTO1lBQ1QsYUFBYTtZQUNiLHNCQUFzQjtZQUN0QixhQUFhO1NBQ2hCLENBQUM7UUE2Rk4sK0JBQUM7S0F0SEQsQUFzSEMsSUFBQTtJQUNELGNBQUcsQ0FBQyxVQUFVLENBQUMsMEJBQTBCLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvaW5kZXgvdXBkYXRlUHdkTW9kYWwvdXBkYXRlUHdkLm1vZGFsLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJjc3MhLi4vLi4vYmFzZWNvbmZpZy9jc3MvYmFzZWNvbmZpZy1mYWNlLmNzc1wiO1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHtJTWFpblNlcnZpY2V9IGZyb20gXCIuLi9tYWluLnNlcnZpY2VcIjtcclxuaW1wb3J0IFBvcnRyYWl0VG9vbCBmcm9tIFwiLi4vLi4vY29tbW9uL3BvcnRyYWl0LXRvb2xcIjtcclxuaW1wb3J0IHtJVXNlckluZm9DYWNoZUZhY3Rvcnl9IGZyb20gXCIuLi8uLi9jb21tb24vZmFjdG9yeS91c2VyaW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7U3lzdGVtQ29uZmlnfSBmcm9tIFwiLi4vLi4vY29tbW9uL3N5c3RlbS1jb25maWdcIjtcclxuaW1wb3J0IHtSZXNwb25zZVJlc3VsdH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5pbXBvcnQge0lVcGRhdGVQd2RQYXJhbXN9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9Vc2VyUGFyYW1zXCI7XHJcblxyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcblxyXG5jbGFzcyBVcGRhdGVQd2RNb2RhbENvbnRyb2xsZXIge1xyXG5cclxuICAgIGNsb3NlRW1pdE5hbWU6c3RyaW5nO1xyXG5cclxuICAgIHZpZXdQd2RzOntcclxuICAgICAgICBvbGRQd2Q6c3RyaW5nO1xyXG4gICAgICAgIG5ld1B3ZDpzdHJpbmc7XHJcbiAgICAgICAgcmVQd2Q6c3RyaW5nO1xyXG4gICAgfTtcclxuICAgIG9sZFB3ZDpzdHJpbmc7XHJcbiAgICAvLyDml6flr4bnoIHplJnor69cclxuICAgIGlzT2xkUHdkRXJyb3I6Ym9vbGVhbjtcclxuICAgIC8vIOmHjeWkjeWvhueggeWHuumUmVxyXG4gICAgaXNSZVB3ZEVycm9yOmJvb2xlYW47XHJcblxyXG4gICAgLy8g5o+Q56S65L+h5oGv6ZuG5ZCIXHJcbiAgICBwcm92aW5nVGV4dHM6QXJyYXk8c3RyaW5nPjtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG4gICAgICAgICckc2NvcGUnLFxyXG4gICAgICAgICckdGltZW91dCcsXHJcbiAgICAgICAgJ2xheWVyJyxcclxuICAgICAgICAnJGJhc2U2NCcsXHJcbiAgICAgICAgJ21haW5TZXJ2aWNlJyxcclxuICAgICAgICAndXNlckluZm9DYWNoZUZhY3RvcnknLFxyXG4gICAgICAgICdpMThuRmFjdG9yeSdcclxuICAgIF07XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlICRzY29wZTogYW55LFxyXG4gICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6YW55LFxyXG4gICAgICAgIHByaXZhdGUgbGF5ZXI6YW55LFxyXG4gICAgICAgIHByaXZhdGUgJGJhc2U2NDphbnksXHJcbiAgICAgICAgcHJpdmF0ZSBtYWluU2VydmljZTpJTWFpblNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSB1c2VySW5mb0NhY2hlRmFjdG9yeTpJVXNlckluZm9DYWNoZUZhY3RvcnksXHJcbiAgICAgICAgcHJpdmF0ZSBpMThuRmFjdG9yeTphbnlcclxuICAgICl7XHJcbiAgICAgICAgdGhpcy52aWV3UHdkcyA9IHt9IGFzIHtcclxuICAgICAgICAgICAgb2xkUHdkOnN0cmluZztcclxuICAgICAgICAgICAgbmV3UHdkOnN0cmluZztcclxuICAgICAgICAgICAgcmVQd2Q6c3RyaW5nO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGxvZ2luRGF0YTp7cGFzc3dvcmQ6c3RyaW5nfSA9IFBvcnRyYWl0VG9vbC5nZXRMb2NhbFN0b3JhZ2VEYXRhKFN5c3RlbUNvbmZpZy5VU0VSX0RBVEFfS0VZKTtcclxuICAgICAgICBpZihsb2dpbkRhdGEpe1xyXG4gICAgICAgICAgICB0aGlzLm9sZFB3ZCA9IHRoaXMuJGJhc2U2NC5kZWNvZGUobG9naW5EYXRhLnBhc3N3b3JkKSA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2xvc2VFbWl0TmFtZSA9IHRoaXMuJHNjb3BlLmNsb3NlRW1pdE5hbWU7XHJcbiAgICAgICAgdGhpcy5wcm92aW5nVGV4dHMgPSBbXHJcbiAgICAgICAgICAgIFwiRkRTXzAwXzE0XzAxXCIsXHJcbiAgICAgICAgICAgIFwiRkRTXzAwXzE0XzAyXCJcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlVXBkYXRlTW9kZWwoaXNMb2dpbk91dDpib29sZWFuKXtcclxuXHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQodGhpcy5jbG9zZUVtaXROYW1lLCBpc0xvZ2luT3V0KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY29tbWl0VXBkYXRlKCl7XHJcbiAgICAgICAgaWYodGhpcy5pc1JlUHdkRXJyb3IgfHwgdGhpcy5pc09sZFB3ZEVycm9yKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcGFyYW1zOklVcGRhdGVQd2RQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIG9sZFB3ZDpQb3J0cmFpdFRvb2wubWQ1KHRoaXMub2xkUHdkKSxcclxuICAgICAgICAgICAgbmV3UHdkOlBvcnRyYWl0VG9vbC5tZDUodGhpcy52aWV3UHdkcy5uZXdQd2QpLFxyXG4gICAgICAgICAgICB1c2VybmFtZTp0aGlzLnVzZXJJbmZvQ2FjaGVGYWN0b3J5LmdldEN1cnJlbnRVaWQoKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5tYWluU2VydmljZS51cGRhdGVQd2RUb0ZjcyhwYXJhbXMpLnRoZW4oKHJlc3A6UmVzcG9uc2VSZXN1bHQ8YW55Pik9PntcclxuICAgICAgICAgICAgaWYocmVzcC5jb2RlID09PSAyMDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQd2RUb0JjcyhwYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAg5ZCM5q2l5a+G56CB5YiwIGJhc2VEQlxyXG4gICAgICogQHRpbWU6IDIwMTctMDgtMTggMDk6NDM6MzVcclxuICAgICAqL1xyXG4gICAgdXBkYXRlUHdkVG9CY3MocGFyYW1zOklVcGRhdGVQd2RQYXJhbXMpe1xyXG4gICAgICAgIHRoaXMubWFpblNlcnZpY2UudXBkYXRlUHdkVG9CY3MocGFyYW1zKS50aGVuKChyZXNwOlJlc3BvbnNlUmVzdWx0PGFueT4pPT57XHJcbiAgICAgICAgICAgIGlmKHJlc3AuY29kZSA9PT0gMjAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5ZXIubXNnKHRoaXMuaTE4bkZhY3RvcnkoJ0ZEU18wMF8xM18wNycpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlVXBkYXRlTW9kZWwodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9LDIwMDApO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMucm9sbEJhY2tVcGRhdGVUb0ZjcyhwYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnJvbGxCYWNrVXBkYXRlVG9GY3MocGFyYW1zKTtcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogIOWQjOatpeWvhueggSDlpLHotKXvvIzlm57mu5ogZmNzXHJcbiAgICAgKiBAdGltZTogMjAxNy0wOC0xOCAwOTo0MzozNVxyXG4gICAgICovXHJcbiAgICByb2xsQmFja1VwZGF0ZVRvRmNzKHBhcmFtczpJVXBkYXRlUHdkUGFyYW1zKXtcclxuICAgICAgICBsZXQgX3BhcmFtcz0ge30gYXMgSVVwZGF0ZVB3ZFBhcmFtcztcclxuICAgICAgICBfcGFyYW1zLm5ld1B3ZCA9IHBhcmFtcy5vbGRQd2Q7XHJcbiAgICAgICAgX3BhcmFtcy5vbGRQd2QgPSBwYXJhbXMubmV3UHdkO1xyXG4gICAgICAgIF9wYXJhbXMudXNlcm5hbWUgPSBwYXJhbXMudXNlcm5hbWU7XHJcbiAgICAgICAgdGhpcy5tYWluU2VydmljZS51cGRhdGVQd2RUb0ZjcyhwYXJhbXMpLnRoZW4oKHJlc3A6UmVzcG9uc2VSZXN1bHQ8YW55Pik9PntcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcGFyZU9sZFB3ZCh2YWxpZDpib29sZWFuKTp2b2lke1xyXG4gICAgICAgIGlmKHZhbGlkICYmIHRoaXMudmlld1B3ZHMub2xkUHdkKXtcclxuICAgICAgICAgICAgaWYodGhpcy5vbGRQd2QgIT09IHRoaXMudmlld1B3ZHMub2xkUHdkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNPbGRQd2RFcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5pc09sZFB3ZEVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb21wYXJlTmV3UHdkKHZhbGlkOmJvb2xlYW4pOnZvaWR7XHJcbiAgICAgICAgdGhpcy5pc1JlUHdkRXJyb3IgPSB2YWxpZCAmJiB0aGlzLnZpZXdQd2RzLm5ld1B3ZCAhPT0gdGhpcy52aWV3UHdkcy5yZVB3ZFxyXG4gICAgfTtcclxufVxyXG5hcHAuY29udHJvbGxlcihcInVwZGF0ZVB3ZE1vZGFsQ29udHJvbGxlclwiLCBVcGRhdGVQd2RNb2RhbENvbnRyb2xsZXIpOyJdfQ==
