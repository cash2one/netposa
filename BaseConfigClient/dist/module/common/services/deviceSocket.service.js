define(["require", "exports", "../app/main.app", "../../common/factory/userinfo.cache.factory"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var deviceSocketService = (function () {
        function deviceSocketService($http, notifyFactory, userInfoCacheFactory) {
            this.$http = $http;
            this.notifyFactory = notifyFactory;
            this.userInfoCacheFactory = userInfoCacheFactory;
        }
        deviceSocketService.prototype.getCameraInfo = function (data) {
            return this.$http({
                method: 'POST',
                url: '/pdp/commonCtrl/log/subcribeOper',
                data: data
            }).then(function (res) {
                if (res) {
                    return res;
                }
            });
        };
        deviceSocketService.prototype.getWifiInfo = function (data) {
            return this.$http({
                method: 'POST',
                url: '/pdp/commonCtrl/log/subcribeOper',
                data: data
            }).then(function (res) {
                if (res) {
                    return res;
                }
            });
        };
        deviceSocketService.prototype.subscribeInfo = function (data) {
            return this.$http({
                method: 'POST',
                url: '/pdp/commonCtrl/log/subcribeOper',
                data: data
            }).then(function (res) {
                if (res) {
                    return res;
                }
            });
        };
        deviceSocketService.$inject = ['$http', 'notifyFactory', 'userInfoCacheFactory'];
        return deviceSocketService;
    }());
    main_app_1.app.service('deviceSocketServer', deviceSocketService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL2RldmljZVNvY2tldC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVlBO1FBR0ksNkJBQW9CLEtBQVUsRUFBVSxhQUFrQixFQUFVLG9CQUF3QjtZQUF4RSxVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQVUsa0JBQWEsR0FBYixhQUFhLENBQUs7WUFBVSx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQUk7UUFDNUYsQ0FBQztRQUVELDJDQUFhLEdBQWIsVUFBZSxJQUFRO1lBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBQyxNQUFNO2dCQUNiLEdBQUcsRUFBQyxrQ0FBa0M7Z0JBQ3RDLElBQUksRUFBRSxJQUFJO2FBQ2IsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQXVCO2dCQUM1QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNOLE1BQU0sQ0FBQyxHQUFHLENBQUM7Z0JBQ2YsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUVELHlDQUFXLEdBQVgsVUFBYSxJQUFRO1lBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBQyxNQUFNO2dCQUNiLEdBQUcsRUFBQyxrQ0FBa0M7Z0JBQ3RDLElBQUksRUFBQyxJQUFJO2FBQ1osQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQXVCO2dCQUM1QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNOLE1BQU0sQ0FBQyxHQUFHLENBQUM7Z0JBQ2YsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUVELDJDQUFhLEdBQWIsVUFBZSxJQUFRO1lBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBQyxNQUFNO2dCQUNiLEdBQUcsRUFBQyxrQ0FBa0M7Z0JBQ3RDLElBQUksRUFBQyxJQUFJO2FBQ1osQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQXVCO2dCQUM1QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNOLE1BQU0sQ0FBQyxHQUFHLENBQUM7Z0JBQ2YsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQXZDTSwyQkFBTyxHQUFrQixDQUFDLE9BQU8sRUFBQyxlQUFlLEVBQUMsc0JBQXNCLENBQUMsQ0FBQztRQXdDckYsMEJBQUM7S0F6Q0QsQUF5Q0MsSUFBQTtJQUNELGNBQUcsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUMsbUJBQW1CLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3NlcnZpY2VzL2RldmljZVNvY2tldC5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbGIgb24gMjAxNy8xMS8xIDAwMDEuXHJcbiAqL1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0fSBmcm9tICAnLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0JztcclxuaW1wb3J0ICAnLi4vLi4vY29tbW9uL2ZhY3RvcnkvdXNlcmluZm8uY2FjaGUuZmFjdG9yeSdcclxuZXhwb3J0ICBpbnRlcmZhY2UgSWRldmljZVNvY2tldCB7XHJcbiAgICBnZXRDYW1lcmFJbmZvOiAoZGF0YTphbnkpID0+IFByb21pc2U8YW55PjtcclxuICAgIGdldFdpZmlJbmZvOihkYXRhOmFueSkgPT4gUHJvbWlzZTxhbnk+O1xyXG4gICAgc3Vic2NyaWJlSW5mbzooZGF0YTphbnkpID0+IFByb21pc2U8YW55PjtcclxufVxyXG5cclxuY2xhc3MgZGV2aWNlU29ja2V0U2VydmljZSBpbXBsZW1lbnRzIElkZXZpY2VTb2NrZXQge1xyXG4gICAgc3RhdGljICRpbmplY3Q6IEFycmF5PHN0cmluZz4gPSBbJyRodHRwJywnbm90aWZ5RmFjdG9yeScsJ3VzZXJJbmZvQ2FjaGVGYWN0b3J5J107XHJcbiAgICBwcml2YXRlIG5vdGlmeUZ1bmM6KHJlczogUmVzcG9uc2VSZXN1bHQ8YW55Pik9PlJlc3BvbnNlUmVzdWx0PGFueT47XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBhbnksIHByaXZhdGUgbm90aWZ5RmFjdG9yeTogYW55LHByaXZhdGUgIHVzZXJJbmZvQ2FjaGVGYWN0b3J5OmFueSkge1xyXG4gICAgfVxyXG5cclxuICAgIGdldENhbWVyYUluZm8gKGRhdGE6YW55KXtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgIHVybDonL3BkcC9jb21tb25DdHJsL2xvZy9zdWJjcmliZU9wZXInLFxyXG4gICAgICAgICAgICBkYXRhOiBkYXRhXHJcbiAgICAgICAgfSkudGhlbigocmVzOlJlc3BvbnNlUmVzdWx0PGFueT4pPT57XHJcbiAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldFdpZmlJbmZvIChkYXRhOmFueSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICB1cmw6Jy9wZHAvY29tbW9uQ3RybC9sb2cvc3ViY3JpYmVPcGVyJyxcclxuICAgICAgICAgICAgZGF0YTpkYXRhXHJcbiAgICAgICAgfSkudGhlbigocmVzOlJlc3BvbnNlUmVzdWx0PGFueT4pPT57XHJcbiAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHN1YnNjcmliZUluZm8gKGRhdGE6YW55KXtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgIHVybDonL3BkcC9jb21tb25DdHJsL2xvZy9zdWJjcmliZU9wZXInLFxyXG4gICAgICAgICAgICBkYXRhOmRhdGFcclxuICAgICAgICB9KS50aGVuKChyZXM6UmVzcG9uc2VSZXN1bHQ8YW55Pik9PntcclxuICAgICAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuYXBwLnNlcnZpY2UoJ2RldmljZVNvY2tldFNlcnZlcicsZGV2aWNlU29ja2V0U2VydmljZSk7Il19
