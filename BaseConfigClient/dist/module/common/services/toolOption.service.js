define(["require", "exports", "../app/main.app", "angular"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ToolOptionService = (function () {
        function ToolOptionService($http, $q) {
            var _this = this;
            this.$http = $http;
            this.$q = $q;
            this.findFaceDataList = function (_params) {
                return _this.$http({
                    method: 'post',
                    params: _params,
                    url: '/fds/search/checkFace'
                });
            };
            this.faceDemarcateDataList = function (_params) {
                return _this.$http({
                    method: 'post',
                    data: _params,
                    url: '/db/resourceSearch/detectFace'
                });
            };
            this.faceMatchDataList = function (_params) {
                return _this.$http({
                    method: 'post',
                    params: _params,
                    url: '/fds/search/faceverify'
                });
            };
            this.searchIdCardNumber = function (_params) {
                return _this.$http({
                    method: 'post',
                    params: _params,
                    url: '/fds/search/searchidnumber'
                });
            };
            this.getOffLineDataList = function (_params) {
                return _this.$http({
                    method: 'post',
                    params: _params,
                    url: '/fds/baseconfig/findOffLineList'
                });
            };
            this.removeOffLineList = function (_params) {
                return _this.$http({
                    method: 'post',
                    data: _params,
                    url: '/fds/baseconfig/removeOffLineList'
                });
            };
            this.$http = $http;
            this.$q = $q;
        }
        ToolOptionService.$inject = ['$http', '$q'];
        return ToolOptionService;
    }());
    main_app_1.app.service('toolOptionService', ToolOptionService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL3Rvb2xPcHRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFrQkE7UUFJSSwyQkFBb0IsS0FBVSxFQUFVLEVBQU87WUFBL0MsaUJBR0M7WUFIbUIsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUFVLE9BQUUsR0FBRixFQUFFLENBQUs7WUFNL0MscUJBQWdCLEdBQWEsVUFBQyxPQUF3QjtnQkFDbEQsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUM7b0JBQ2QsTUFBTSxFQUFFLE1BQU07b0JBQ2QsTUFBTSxFQUFFLE9BQU87b0JBQ2YsR0FBRyxFQUFFLHVCQUF1QjtpQkFDL0IsQ0FBQyxDQUFBO1lBQ04sQ0FBQyxDQUFDO1lBR0YsMEJBQXFCLEdBQWEsVUFBQyxPQUF5QjtnQkFDeEQsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUM7b0JBQ2QsTUFBTSxFQUFFLE1BQU07b0JBQ2QsSUFBSSxFQUFFLE9BQU87b0JBQ2IsR0FBRyxFQUFFLCtCQUErQjtpQkFDdkMsQ0FBQyxDQUFBO1lBQ04sQ0FBQyxDQUFDO1lBR0Ysc0JBQWlCLEdBQWEsVUFBQyxPQUF5QjtnQkFDcEQsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUM7b0JBQ2QsTUFBTSxFQUFFLE1BQU07b0JBQ2QsTUFBTSxFQUFFLE9BQU87b0JBQ2YsR0FBRyxFQUFFLHdCQUF3QjtpQkFDaEMsQ0FBQyxDQUFBO1lBQ04sQ0FBQyxDQUFDO1lBR0YsdUJBQWtCLEdBQWEsVUFBQyxPQUFrQztnQkFDOUQsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUM7b0JBQ2QsTUFBTSxFQUFFLE1BQU07b0JBQ2QsTUFBTSxFQUFFLE9BQU87b0JBQ2YsR0FBRyxFQUFFLDRCQUE0QjtpQkFDcEMsQ0FBQyxDQUFBO1lBQ04sQ0FBQyxDQUFDO1lBR0YsdUJBQWtCLEdBQWEsVUFBQyxPQUFxQztnQkFDakUsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUM7b0JBQ2QsTUFBTSxFQUFFLE1BQU07b0JBQ2QsTUFBTSxFQUFFLE9BQU87b0JBQ2YsR0FBRyxFQUFFLGlDQUFpQztpQkFDekMsQ0FBQyxDQUFBO1lBQ04sQ0FBQyxDQUFDO1lBR0Ysc0JBQWlCLEdBQWEsVUFBQyxPQUFzQjtnQkFDakQsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUM7b0JBQ2QsTUFBTSxFQUFFLE1BQU07b0JBQ2QsSUFBSSxFQUFFLE9BQU87b0JBQ2IsR0FBRyxFQUFFLG1DQUFtQztpQkFDM0MsQ0FBQyxDQUFBO1lBQ04sQ0FBQyxDQUFBO1lBeERHLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLENBQUM7UUFMTSx5QkFBTyxHQUFrQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQThEcEQsd0JBQUM7S0FoRUQsQUFnRUMsSUFBQTtJQUVELGNBQUcsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3NlcnZpY2VzL3Rvb2xPcHRpb24uc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHRqIG9uIDIwMTcvNy82LlxyXG4gKi9cclxuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55O1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQge0NoZWNrRmFjZVBhcmFtcywgRGV0ZWN0RmFjZVBhcmFtcywgRmFjZXZlcmlmeVBhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL1Rvb2xPcHRpb25QYXJhbXNcIlxyXG5pbXBvcnQgJ2FuZ3VsYXInO1xyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElUb29sT3B0aW9uU2VydmljZSB7XHJcbiAgICBmaW5kRmFjZURhdGFMaXN0OiBGdW5jdGlvbjtcclxuICAgIGZhY2VEZW1hcmNhdGVEYXRhTGlzdDogRnVuY3Rpb247XHJcbiAgICBmYWNlTWF0Y2hEYXRhTGlzdDogRnVuY3Rpb247XHJcbiAgICBnZXRPZmZMaW5lRGF0YUxpc3Q6IEZ1bmN0aW9uO1xyXG4gICAgc2VhcmNoSWRDYXJkTnVtYmVyOiBGdW5jdGlvbjtcclxuICAgIHJlbW92ZU9mZkxpbmVMaXN0OiBGdW5jdGlvbjtcclxufVxyXG5cclxuY2xhc3MgVG9vbE9wdGlvblNlcnZpY2UgaW1wbGVtZW50cyBJVG9vbE9wdGlvblNlcnZpY2Uge1xyXG5cclxuICAgIHN0YXRpYyAkaW5qZWN0OiBBcnJheTxzdHJpbmc+ID0gWyckaHR0cCcsICckcSddO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IGFueSwgcHJpdmF0ZSAkcTogYW55KSB7XHJcbiAgICAgICAgdGhpcy4kaHR0cCA9ICRodHRwO1xyXG4gICAgICAgIHRoaXMuJHEgPSAkcTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDkurrohLjmo4DntKJcclxuICAgIGZpbmRGYWNlRGF0YUxpc3Q6IEZ1bmN0aW9uID0gKF9wYXJhbXM6IENoZWNrRmFjZVBhcmFtcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIHBhcmFtczogX3BhcmFtcyxcclxuICAgICAgICAgICAgdXJsOiAnL2Zkcy9zZWFyY2gvY2hlY2tGYWNlJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG5cclxuICAgIC8v5Lq66IS45qCH5a6a5oiq5Y+WXHJcbiAgICBmYWNlRGVtYXJjYXRlRGF0YUxpc3Q6IEZ1bmN0aW9uID0gKF9wYXJhbXM6IERldGVjdEZhY2VQYXJhbXMpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBkYXRhOiBfcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6ICcvZGIvcmVzb3VyY2VTZWFyY2gvZGV0ZWN0RmFjZSdcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyDkurrohLjmr5Tlr7lcclxuICAgIGZhY2VNYXRjaERhdGFMaXN0OiBGdW5jdGlvbiA9IChfcGFyYW1zOiBGYWNldmVyaWZ5UGFyYW1zKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgcGFyYW1zOiBfcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6ICcvZmRzL3NlYXJjaC9mYWNldmVyaWZ5J1xyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG5cclxuICAgIC8v6Lqr5Lu96K+B5Y+35qOA57SiXHJcbiAgICBzZWFyY2hJZENhcmROdW1iZXI6IEZ1bmN0aW9uID0gKF9wYXJhbXM6IHsgW2lkczogc3RyaW5nXTogbnVtYmVyIH0pID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBwYXJhbXM6IF9wYXJhbXMsXHJcbiAgICAgICAgICAgIHVybDogJy9mZHMvc2VhcmNoL3NlYXJjaGlkbnVtYmVyJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG5cclxuICAgIC8v5LiL6L295Lit5b+D5pWw5o2u6I635Y+WXHJcbiAgICBnZXRPZmZMaW5lRGF0YUxpc3Q6IEZ1bmN0aW9uID0gKF9wYXJhbXM6IHsgW3VzZXJJRDogc3RyaW5nXTogc3RyaW5nIH0pID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBwYXJhbXM6IF9wYXJhbXMsXHJcbiAgICAgICAgICAgIHVybDogJy9mZHMvYmFzZWNvbmZpZy9maW5kT2ZmTGluZUxpc3QnXHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcblxyXG4gICAgLy/kuIvovb3kuK3lv4PkuIvovb3orrDlvZXliKDpmaRcclxuICAgIHJlbW92ZU9mZkxpbmVMaXN0OiBGdW5jdGlvbiA9IChfcGFyYW1zOiBBcnJheTxzdHJpbmc+KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgZGF0YTogX3BhcmFtcyxcclxuICAgICAgICAgICAgdXJsOiAnL2Zkcy9iYXNlY29uZmlnL3JlbW92ZU9mZkxpbmVMaXN0J1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuYXBwLnNlcnZpY2UoJ3Rvb2xPcHRpb25TZXJ2aWNlJywgVG9vbE9wdGlvblNlcnZpY2UpOyJdfQ==
