define(["require", "exports", "../app/main.app", "angular"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TotalService = (function () {
        function TotalService($http, $q) {
            var _this = this;
            this.$http = $http;
            this.$q = $q;
            this.getTaskDataList = function (_params) {
                return _this.$http({
                    method: 'post',
                    data: _params,
                    url: '/fds/stats/task'
                });
            };
            this.getUserDataList = function (_params) {
                return _this.$http({
                    method: 'post',
                    data: _params,
                    url: '/fds/stats/user'
                });
            };
            this.getFlowDataList = function (_params) {
                return _this.$http({
                    method: 'post',
                    data: _params,
                    url: '/fds/stats/flow'
                });
            };
            this.getCameraDataList = function (_params) {
                return _this.$http({
                    method: 'post',
                    data: _params,
                    url: '/fds/stats/camera'
                });
            };
            this.getSearchDataList = function (_params) {
                return _this.$http({
                    method: 'post',
                    data: _params,
                    url: '/fds/stats/retrieval'
                });
            };
            this.getAlarmDataList = function (_params) {
                return _this.$http({
                    method: 'post',
                    data: _params,
                    url: '/fds/stats/alarm'
                });
            };
            this.$http = $http;
            this.$q = $q;
        }
        TotalService.$inject = ['$http', '$q'];
        return TotalService;
    }());
    main_app_1.app.service('totalService', TotalService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL3RvdGFsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBaUJBO1FBSUksc0JBQW9CLEtBQVUsRUFBVSxFQUFPO1lBQS9DLGlCQUdDO1lBSG1CLFVBQUssR0FBTCxLQUFLLENBQUs7WUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFLO1lBTS9DLG9CQUFlLEdBQWEsVUFBQyxPQUFxQjtnQkFDOUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUM7b0JBQ2QsTUFBTSxFQUFDLE1BQU07b0JBQ2IsSUFBSSxFQUFFLE9BQU87b0JBQ2IsR0FBRyxFQUFDLGlCQUFpQjtpQkFDeEIsQ0FBQyxDQUFBO1lBQ04sQ0FBQyxDQUFDO1lBR0Ysb0JBQWUsR0FBYSxVQUFDLE9BQXFCO2dCQUM5QyxNQUFNLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQztvQkFDZCxNQUFNLEVBQUMsTUFBTTtvQkFDYixJQUFJLEVBQUUsT0FBTztvQkFDYixHQUFHLEVBQUMsaUJBQWlCO2lCQUN4QixDQUFDLENBQUE7WUFDTixDQUFDLENBQUM7WUFHRixvQkFBZSxHQUFhLFVBQUMsT0FBcUI7Z0JBQzlDLE1BQU0sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDO29CQUNkLE1BQU0sRUFBQyxNQUFNO29CQUNiLElBQUksRUFBRSxPQUFPO29CQUNiLEdBQUcsRUFBQyxpQkFBaUI7aUJBQ3hCLENBQUMsQ0FBQTtZQUNOLENBQUMsQ0FBQztZQUdGLHNCQUFpQixHQUFhLFVBQUMsT0FBcUI7Z0JBQ2hELE1BQU0sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDO29CQUNkLE1BQU0sRUFBQyxNQUFNO29CQUNiLElBQUksRUFBRSxPQUFPO29CQUNiLEdBQUcsRUFBQyxtQkFBbUI7aUJBQzFCLENBQUMsQ0FBQTtZQUNOLENBQUMsQ0FBQztZQUdGLHNCQUFpQixHQUFhLFVBQUMsT0FBcUI7Z0JBQ2hELE1BQU0sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDO29CQUNkLE1BQU0sRUFBQyxNQUFNO29CQUNiLElBQUksRUFBRSxPQUFPO29CQUNiLEdBQUcsRUFBQyxzQkFBc0I7aUJBQzdCLENBQUMsQ0FBQTtZQUNOLENBQUMsQ0FBQztZQUdGLHFCQUFnQixHQUFhLFVBQUMsT0FBcUI7Z0JBQy9DLE1BQU0sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDO29CQUNkLE1BQU0sRUFBQyxNQUFNO29CQUNiLElBQUksRUFBRSxPQUFPO29CQUNiLEdBQUcsRUFBQyxrQkFBa0I7aUJBQ3pCLENBQUMsQ0FBQTtZQUNOLENBQUMsQ0FBQztZQXhERSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNqQixDQUFDO1FBTE0sb0JBQU8sR0FBa0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUE2RHBELG1CQUFDO0tBL0RELEFBK0RDLElBQUE7SUFFRCxjQUFHLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBQyxZQUFZLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3NlcnZpY2VzL3RvdGFsLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSB0aiBvbiAyMDE3LzYvOS5cclxuICovXHJcbmRlY2xhcmUgdmFyIHJlcXVpcmU6YW55O1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgJ2FuZ3VsYXInO1xyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElUb3RhbFNlcnZpY2Uge1xyXG4gICAgZ2V0VGFza0RhdGFMaXN0OkZ1bmN0aW9uO1xyXG4gICAgZ2V0VXNlckRhdGFMaXN0OkZ1bmN0aW9uO1xyXG4gICAgZ2V0Rmxvd0RhdGFMaXN0OkZ1bmN0aW9uO1xyXG4gICAgZ2V0U2VhcmNoRGF0YUxpc3Q6RnVuY3Rpb247XHJcbiAgICBnZXRBbGFybURhdGFMaXN0OkZ1bmN0aW9uO1xyXG4gICAgZ2V0Q2FtZXJhRGF0YUxpc3Q6RnVuY3Rpb247XHJcbn1cclxuXHJcbmNsYXNzIFRvdGFsU2VydmljZSBpbXBsZW1lbnRzIElUb3RhbFNlcnZpY2Uge1xyXG5cclxuICAgIHN0YXRpYyAkaW5qZWN0OiBBcnJheTxzdHJpbmc+ID0gWyckaHR0cCcsICckcSddO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IGFueSwgcHJpdmF0ZSAkcTogYW55KSB7XHJcbiAgICAgICAgdGhpcy4kaHR0cCA9ICRodHRwO1xyXG4gICAgICAgIHRoaXMuJHEgPSAkcTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluS7u+WKoee7n+iuoeWQjuWPsOaVsOaNrlxyXG4gICAgZ2V0VGFza0RhdGFMaXN0OiBGdW5jdGlvbiA9IChfcGFyYW1zOkFycmF5PG9iamVjdD4pID0+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOidwb3N0JyxcclxuICAgICAgICAgICAgZGF0YTogX3BhcmFtcyxcclxuICAgICAgICAgICAgdXJsOicvZmRzL3N0YXRzL3Rhc2snXHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcblxyXG4gICAgLy/ojrflj5bnlKjmiLfnu5/orqHlkI7lj7DmlbDmja5cclxuICAgIGdldFVzZXJEYXRhTGlzdDogRnVuY3Rpb24gPSAoX3BhcmFtczpBcnJheTxvYmplY3Q+KSA9PntcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXHJcbiAgICAgICAgICAgIGRhdGE6IF9wYXJhbXMsXHJcbiAgICAgICAgICAgIHVybDonL2Zkcy9zdGF0cy91c2VyJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG5cclxuICAgIC8v6I635Y+W5Lq65rWB6YeP57uf6K6h5ZCO5Y+w5pWw5o2uXHJcbiAgICBnZXRGbG93RGF0YUxpc3Q6IEZ1bmN0aW9uID0gKF9wYXJhbXM6QXJyYXk8b2JqZWN0PikgPT57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6J3Bvc3QnLFxyXG4gICAgICAgICAgICBkYXRhOiBfcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6Jy9mZHMvc3RhdHMvZmxvdydcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuXHJcbiAgICAvL+iOt+WPluWDj+acuuiuvuWkh+e7n+iuoeWQjuWPsOaVsOaNrlxyXG4gICAgZ2V0Q2FtZXJhRGF0YUxpc3Q6IEZ1bmN0aW9uID0gKF9wYXJhbXM6QXJyYXk8b2JqZWN0PikgPT57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6J3Bvc3QnLFxyXG4gICAgICAgICAgICBkYXRhOiBfcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6Jy9mZHMvc3RhdHMvY2FtZXJhJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG5cclxuICAgIC8v6I635Y+W5Yy65Z+f5qOA57Si57uf6K6h5ZCO5Y+w5pWw5o2uXHJcbiAgICBnZXRTZWFyY2hEYXRhTGlzdDogRnVuY3Rpb24gPSAoX3BhcmFtczpBcnJheTxvYmplY3Q+KSA9PntcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXHJcbiAgICAgICAgICAgIGRhdGE6IF9wYXJhbXMsXHJcbiAgICAgICAgICAgIHVybDonL2Zkcy9zdGF0cy9yZXRyaWV2YWwnXHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcblxyXG4gICAgLy/ojrflj5bmiqXorabnu5/orqHlkI7lj7DmlbDmja5cclxuICAgIGdldEFsYXJtRGF0YUxpc3Q6IEZ1bmN0aW9uID0gKF9wYXJhbXM6QXJyYXk8b2JqZWN0PikgPT57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6J3Bvc3QnLFxyXG4gICAgICAgICAgICBkYXRhOiBfcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6Jy9mZHMvc3RhdHMvYWxhcm0nXHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcblxyXG59XHJcblxyXG5hcHAuc2VydmljZSgndG90YWxTZXJ2aWNlJyxUb3RhbFNlcnZpY2UpOyJdfQ==
