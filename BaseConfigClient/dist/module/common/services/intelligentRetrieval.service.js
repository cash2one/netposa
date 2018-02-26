define(["require", "exports", "../app/main.app", "angular"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var intellRetService = (function () {
        function intellRetService($http) {
            var _this = this;
            this.$http = $http;
            this.trailAnalysisSearch = function (param) {
                return _this.$http({
                    method: 'post',
                    headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                    data: param,
                    url: '/fds/search/searchaccesslog'
                });
            };
            this.faceRetrievalSearch = function (param) {
                return _this.$http({
                    method: 'post',
                    headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                    data: param,
                    url: '/fds/businesslib/person/list '
                });
            };
            this.searchFace = function (param) {
                return _this.$http({
                    method: 'post',
                    headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                    data: param,
                    url: '/fds/search/searchface'
                });
            };
            this.searchAlarm = function (param) {
                return _this.$http({
                    method: 'post',
                    headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                    data: param,
                    url: '/fds/search/alarmlog '
                });
            };
            this.operationrecord = function (param) {
                return _this.$http({
                    method: 'post',
                    headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                    data: param,
                    url: '/fds/search/alarmlog/operationrecord'
                });
            };
            this.recordSearch = function (param) {
                return _this.$http({
                    method: 'post',
                    headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                    data: param,
                    url: '/fds/search/searchretrievallog'
                });
            };
            this.log = function (param) {
                return _this.$http({
                    method: 'post',
                    headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                    data: param,
                    url: '/fds/search/log '
                });
            };
            this.findUserPersonInfoInCreateTaskUser = function (param) {
                return _this.$http({
                    method: 'get',
                    headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                    data: param,
                    url: '/db/user/findUserPersonInfoInCreateTaskUser'
                });
            };
            this.findPersonArea = function (param) {
                return _this.$http({
                    method: 'post',
                    headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                    data: param,
                    url: '/fds/baseconfig/findPersonArea'
                });
            };
            this.exportAccessLogData = function (param) {
                return _this.$http({
                    method: 'post',
                    headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                    data: param,
                    url: '/db/export/exportAccessLog'
                });
            };
            this.exportAlarmlog = function (param) {
                return _this.$http({
                    method: 'post',
                    headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                    data: param,
                    url: '/db/export/exportAlarm'
                });
            };
            this.exportSearchface = function (param) {
                return _this.$http({
                    method: 'post',
                    headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                    data: param,
                    url: '/db/export/exportFace'
                });
            };
            this.exportRetrievalLog = function (param) {
                return _this.$http({
                    method: 'post',
                    headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                    data: param,
                    url: '/db/export/exportRetrievalLog'
                });
            };
            this.$http = $http;
        }
        intellRetService.$inject = ['$http'];
        return intellRetService;
    }());
    main_app_1.app.service('intellRetService', intellRetService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL2ludGVsbGlnZW50UmV0cmlldmFsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBb0JBO1FBSUksMEJBQW9CLEtBQVU7WUFBOUIsaUJBRUM7WUFGbUIsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUk5Qix3QkFBbUIsR0FBWSxVQUFDLEtBQXdCO2dCQUNwRCxNQUFNLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQztvQkFDZCxNQUFNLEVBQUUsTUFBTTtvQkFDZCxPQUFPLEVBQUMsRUFBQyxjQUFjLEVBQUUsaUNBQWlDLEVBQUM7b0JBQzNELElBQUksRUFBRSxLQUFLO29CQUNYLEdBQUcsRUFBRSw2QkFBNkI7aUJBQ3JDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQztZQUVGLHdCQUFtQixHQUFZLFVBQUMsS0FBd0I7Z0JBQ3BELE1BQU0sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDO29CQUNkLE1BQU0sRUFBRSxNQUFNO29CQUNkLE9BQU8sRUFBQyxFQUFDLGNBQWMsRUFBRSxpQ0FBaUMsRUFBQztvQkFDM0QsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsR0FBRyxFQUFFLCtCQUErQjtpQkFDdkMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDO1lBRUYsZUFBVSxHQUFZLFVBQUMsS0FBd0I7Z0JBQzNDLE1BQU0sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDO29CQUNkLE1BQU0sRUFBRSxNQUFNO29CQUNkLE9BQU8sRUFBQyxFQUFDLGNBQWMsRUFBRSxpQ0FBaUMsRUFBQztvQkFDM0QsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsR0FBRyxFQUFFLHdCQUF3QjtpQkFDaEMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDO1lBRUYsZ0JBQVcsR0FBWSxVQUFDLEtBQXdCO2dCQUM1QyxNQUFNLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQztvQkFDZCxNQUFNLEVBQUUsTUFBTTtvQkFDZCxPQUFPLEVBQUMsRUFBQyxjQUFj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QztvQkFDZCxNQUFNLEVBQUUsTUFBTTtvQkFDZCxPQUFPLEVBQUMsRUFBQyxjQUFjLEVBQUUsaUNBQWlDLEVBQUM7b0JBQzNELElBQUksRUFBRSxLQUFLO29CQUNYLEdBQUcsRUFBRSwrQkFBK0I7aUJBQ3ZDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQztZQXRIRSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDO1FBSk0sd0JBQU8sR0FBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQTBIN0MsdUJBQUM7S0E1SEQsQUE0SEMsSUFBQTtJQUVELGNBQUcsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3NlcnZpY2VzL2ludGVsbGlnZW50UmV0cmlldmFsLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcH0gZnJvbSBcIi4uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgJ2FuZ3VsYXInO1xyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElpbnRlbGxSZXRTZXJ2aWNle1xyXG4gICAgdHJhaWxBbmFseXNpc1NlYXJjaDogRnVuY3Rpb247XHJcbiAgICBmYWNlUmV0cmlldmFsU2VhcmNoOkZ1bmN0aW9uO1xyXG4gICAgc2VhcmNoRmFjZTpGdW5jdGlvbjtcclxuICAgIHNlYXJjaEFsYXJtOkZ1bmN0aW9uO1xyXG4gICAgb3BlcmF0aW9ucmVjb3JkOkZ1bmN0aW9uO1xyXG4gICAgcmVjb3JkU2VhcmNoOkZ1bmN0aW9uO1xyXG4gICAgbG9nOkZ1bmN0aW9uO1xyXG4gICAgZmluZFVzZXJQZXJzb25JbmZvSW5DcmVhdGVUYXNrVXNlcjpGdW5jdGlvbjtcclxuICAgIGV4cG9ydEFjY2Vzc0xvZ0RhdGE6RnVuY3Rpb247XHJcbiAgICBmaW5kUGVyc29uQXJlYTpGdW5jdGlvbjtcclxuICAgIGV4cG9ydEFsYXJtbG9nOkZ1bmN0aW9uO1xyXG4gICAgZXhwb3J0U2VhcmNoZmFjZTpGdW5jdGlvbjtcclxuICAgIGV4cG9ydFJldHJpZXZhbExvZzpGdW5jdGlvbjtcclxufVxyXG5cclxuY2xhc3MgaW50ZWxsUmV0U2VydmljZSBpbXBsZW1lbnRzIElpbnRlbGxSZXRTZXJ2aWNlIHtcclxuXHJcbiAgICBzdGF0aWMgJGluamVjdDpBcnJheTxzdHJpbmc+ID0gWyckaHR0cCddO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IGFueSkge1xyXG4gICAgICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcclxuICAgIH1cclxuXHJcbiAgICB0cmFpbEFuYWx5c2lzU2VhcmNoOkZ1bmN0aW9uID0gKHBhcmFtOntba2V5OnN0cmluZ106YW55fSk9PntcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOnsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24gO2NoYXJzZXQ9dXRmLTgnfSxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW0sXHJcbiAgICAgICAgICAgIHVybDogJy9mZHMvc2VhcmNoL3NlYXJjaGFjY2Vzc2xvZydcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgZmFjZVJldHJpZXZhbFNlYXJjaDpGdW5jdGlvbiA9IChwYXJhbTp7W2tleTpzdHJpbmddOmFueX0pID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOnsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24gO2NoYXJzZXQ9dXRmLTgnfSxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW0sXHJcbiAgICAgICAgICAgIHVybDogJy9mZHMvYnVzaW5lc3NsaWIvcGVyc29uL2xpc3QgJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBzZWFyY2hGYWNlOkZ1bmN0aW9uID0gKHBhcmFtOntba2V5OnN0cmluZ106YW55fSk9PntcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOnsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24gO2NoYXJzZXQ9dXRmLTgnfSxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW0sXHJcbiAgICAgICAgICAgIHVybDogJy9mZHMvc2VhcmNoL3NlYXJjaGZhY2UnXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNlYXJjaEFsYXJtOkZ1bmN0aW9uID0gKHBhcmFtOntba2V5OnN0cmluZ106YW55fSk9PntcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOnsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24gO2NoYXJzZXQ9dXRmLTgnfSxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW0sXHJcbiAgICAgICAgICAgIHVybDogJy9mZHMvc2VhcmNoL2FsYXJtbG9nICdcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgb3BlcmF0aW9ucmVjb3JkOkZ1bmN0aW9uID0gKHBhcmFtOntba2V5OnN0cmluZ106YW55fSk9PntcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOnsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24gO2NoYXJzZXQ9dXRmLTgnfSxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW0sXHJcbiAgICAgICAgICAgIHVybDogJy9mZHMvc2VhcmNoL2FsYXJtbG9nL29wZXJhdGlvbnJlY29yZCdcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmVjb3JkU2VhcmNoOkZ1bmN0aW9uID0gKHBhcmFtOntba2V5OnN0cmluZ106YW55fSk9PntcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOnsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24gO2NoYXJzZXQ9dXRmLTgnfSxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW0sXHJcbiAgICAgICAgICAgIHVybDogJy9mZHMvc2VhcmNoL3NlYXJjaHJldHJpZXZhbGxvZydcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgbG9nOkZ1bmN0aW9uID0gKHBhcmFtIDoge1trZXk6c3RyaW5nXTphbnl9KT0+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6eydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbiA7Y2hhcnNldD11dGYtOCd9LFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbSxcclxuICAgICAgICAgICAgdXJsOiAnL2Zkcy9zZWFyY2gvbG9nICdcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgZmluZFVzZXJQZXJzb25JbmZvSW5DcmVhdGVUYXNrVXNlcjpGdW5jdGlvbiA9IChwYXJhbTp7W2tleTpzdHJpbmddOmFueX0pPT57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOnsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24gO2NoYXJzZXQ9dXRmLTgnfSxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW0sXHJcbiAgICAgICAgICAgIHVybDogJy9kYi91c2VyL2ZpbmRVc2VyUGVyc29uSW5mb0luQ3JlYXRlVGFza1VzZXInXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZpbmRQZXJzb25BcmVhOkZ1bmN0aW9uID0gKHBhcmFtOntba2V5OnN0cmluZ106YW55fSk9PntcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOnsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24gO2NoYXJzZXQ9dXRmLTgnfSxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW0sXHJcbiAgICAgICAgICAgIHVybDogJy9mZHMvYmFzZWNvbmZpZy9maW5kUGVyc29uQXJlYSdcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgZXhwb3J0QWNjZXNzTG9nRGF0YTpGdW5jdGlvbiA9IChwYXJhbTp7W2tleTpzdHJpbmddOmFueX0pPT57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgaGVhZGVyczp7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uIDtjaGFyc2V0PXV0Zi04J30sXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtLFxyXG4gICAgICAgICAgICB1cmw6ICcvZGIvZXhwb3J0L2V4cG9ydEFjY2Vzc0xvZydcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgZXhwb3J0QWxhcm1sb2c6RnVuY3Rpb24gPSAocGFyYW06e1trZXk6c3RyaW5nXTphbnl9KT0+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6eydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbiA7Y2hhcnNldD11dGYtOCd9LFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbSxcclxuICAgICAgICAgICAgdXJsOiAnL2RiL2V4cG9ydC9leHBvcnRBbGFybSdcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgZXhwb3J0U2VhcmNoZmFjZTpGdW5jdGlvbiA9IChwYXJhbTp7W2tleTpzdHJpbmddOmFueX0pPT57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgaGVhZGVyczp7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uIDtjaGFyc2V0PXV0Zi04J30sXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtLFxyXG4gICAgICAgICAgICB1cmw6ICcvZGIvZXhwb3J0L2V4cG9ydEZhY2UnXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGV4cG9ydFJldHJpZXZhbExvZzpGdW5jdGlvbiA9IChwYXJhbTp7W2tleTpzdHJpbmddOmFueX0pPT57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgaGVhZGVyczp7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uIDtjaGFyc2V0PXV0Zi04J30sXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtLFxyXG4gICAgICAgICAgICB1cmw6ICcvZGIvZXhwb3J0L2V4cG9ydFJldHJpZXZhbExvZydcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbn1cclxuXHJcbmFwcC5zZXJ2aWNlKCdpbnRlbGxSZXRTZXJ2aWNlJywgaW50ZWxsUmV0U2VydmljZSk7Il19
