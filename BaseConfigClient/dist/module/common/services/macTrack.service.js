define(["require", "exports", "../app/main.app", "angular"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Promise = require('es6-promise');
    var macTrackService = (function () {
        function macTrackService($http, $q, notifyFactory) {
            this.$http = $http;
            this.$q = $q;
            this.notifyFactory = notifyFactory;
            this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
        }
        macTrackService.prototype.searchTrack = function (params) {
            return this.$http({
                method: "POST",
                url: "/db/maccarcrash/facetrack",
                data: params
            });
        };
        macTrackService.prototype.searchFace = function (params) {
            return this.$http({
                method: 'post',
                url: '/db/maccarcrash/searchface',
                data: params
            });
        };
        macTrackService.prototype.searchAlarm = function (params) {
            return this.$http({
                method: 'post',
                url: '/db/maccarcrash/personalarm',
                data: params
            });
        };
        macTrackService.prototype.searchAllInfo = function (params) {
            return this.$http({
                method: 'post',
                url: '/db/maccarcrash/accompanying',
                data: params
            });
        };
        macTrackService.prototype.uploadImage = function (params) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', '/db/upload/image', true);
                xhr.onreadystatechange = function (ev) {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        console.log(JSON.parse(xhr.responseText));
                        resolve(JSON.parse(xhr.responseText));
                    }
                };
                xhr.onerror = function (err) {
                    reject(err);
                };
                xhr.send(params);
            });
        };
        macTrackService.$inject = ['$http', '$q', 'notifyFactory'];
        return macTrackService;
    }());
    main_app_1.app.service('macTrackService', macTrackService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL21hY1RyYWNrLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBS0EsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBaUJyQztRQUtJLHlCQUFvQixLQUFVLEVBQVUsRUFBTyxFQUFVLGFBQXFDO1lBQTFFLFVBQUssR0FBTCxLQUFLLENBQUs7WUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFLO1lBQVUsa0JBQWEsR0FBYixhQUFhLENBQXdCO1lBQzFGLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUNsRSxDQUFDO1FBRUQscUNBQVcsR0FBWCxVQUFZLE1BQVc7WUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsR0FBRyxFQUFFLDJCQUEyQjtnQkFDaEMsSUFBSSxFQUFFLE1BQU07YUFDZixDQUFDLENBQUE7UUFDTixDQUFDO1FBQ0Qsb0NBQVUsR0FBVixVQUFXLE1BQVU7WUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFDLE1BQU07Z0JBQ2IsR0FBRyxFQUFDLDRCQUE0QjtnQkFDaEMsSUFBSSxFQUFDLE1BQU07YUFDZCxDQUFDLENBQUE7UUFDTixDQUFDO1FBQ0QscUNBQVcsR0FBWCxVQUFZLE1BQVU7WUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFDLE1BQU07Z0JBQ2IsR0FBRyxFQUFDLDZCQUE2QjtnQkFDakMsSUFBSSxFQUFDLE1BQU07YUFDZCxDQUFDLENBQUE7UUFDTixDQUFDO1FBQ0QsdUNBQWEsR0FBYixVQUFjLE1BQVU7WUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFDLE1BQU07Z0JBQ2IsR0FBRyxFQUFDLDhCQUE4QjtnQkFDbEMsSUFBSSxFQUFDLE1BQU07YUFDZCxDQUFDLENBQUE7UUFDTixDQUFDO1FBQ0QscUNBQVcsR0FBWCxVQUFZLE1BQWdCO1lBQ3hCLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQVksRUFBRSxNQUFXO2dCQUN6QyxJQUFJLEdBQUcsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO2dCQUMvQixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDM0MsR0FBRyxDQUFDLGtCQUFrQixHQUFHLFVBQUMsRUFBRTtvQkFDeEIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBd0IsQ0FBQyxDQUFDO3dCQUNqRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtvQkFDekMsQ0FBQztnQkFDTCxDQUFDLENBQUM7Z0JBQ0YsR0FBRyxDQUFDLE9BQU8sR0FBRyxVQUFDLEdBQVE7b0JBQ25CLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDZixDQUFDLENBQUM7Z0JBQ0YsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNwQixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFsRE0sdUJBQU8sR0FBa0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBbURyRSxzQkFBQztLQXJERCxBQXFEQyxJQUFBO0lBRUQsY0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxlQUFlLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3NlcnZpY2VzL21hY1RyYWNrLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcH0gZnJvbSBcIi4uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgJ2FuZ3VsYXInO1xyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7SVJlc3BvbnNlTm90aWZ5RmFjdG9yeX0gZnJvbSBcIi4uL2ZhY3RvcnkvcmVzcG9uc2Uubm90aWZ5LmZhY3RvcnlcIjtcclxuXHJcbmxldCBQcm9taXNlID0gcmVxdWlyZSgnZXM2LXByb21pc2UnKTtcclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55LCAkOiBhbnksIHJlcXVpcmU6IGFueTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1hY1RyYWNrU2VydmljZSB7XHJcbiAgICB1cGxvYWRJbWFnZTogKHBhcmFtczogRm9ybURhdGEpID0+IGFueTtcclxuICAgIHNlYXJjaFRyYWNrOiAocGFyYW1zOiBhbnkpID0+IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcbiAgICBzZWFyY2hGYWNlOihwYXJhbXM6YW55KSA9PlByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcbiAgICBzZWFyY2hBbGFybToocGFyYW1zOmFueSkgPT5Qcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+O1xyXG4gICAgc2VhcmNoQWxsSW5mbzoocGFyYW1zOmFueSkgPT5Qcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+O1xyXG59XHJcblxyXG4vKiogY3JlYXRlIGJ5IHp4cVxyXG4gKiAg5Lu75Yqh566h55CGIOWinuWIoOaUueafpSDor7fmsYJcclxuICogQHRpbWU6IDIwMTctMDYtMTQgMTE6MjQ6MDFcclxuICogQHBhcmFtczpcclxuICogQHJldHVybjpcclxuICovXHJcbmNsYXNzIG1hY1RyYWNrU2VydmljZSBpbXBsZW1lbnRzIElNYWNUcmFja1NlcnZpY2Uge1xyXG5cclxuICAgIHN0YXRpYyAkaW5qZWN0OiBBcnJheTxzdHJpbmc+ID0gWyckaHR0cCcsICckcScsICdub3RpZnlGYWN0b3J5J107XHJcbiAgICBwcml2YXRlIG5vdGlmeUZ1bmM6IChyZXM6IFJlc3BvbnNlUmVzdWx0PGFueT4pID0+IFJlc3BvbnNlUmVzdWx0PGFueT47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogYW55LCBwcml2YXRlICRxOiBhbnksIHByaXZhdGUgbm90aWZ5RmFjdG9yeTogSVJlc3BvbnNlTm90aWZ5RmFjdG9yeSkge1xyXG4gICAgICAgIHRoaXMubm90aWZ5RnVuYyA9IHRoaXMubm90aWZ5RmFjdG9yeS5tc2coe29ubHlTdWNjZXNzOiB0cnVlfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VhcmNoVHJhY2socGFyYW1zOiBhbnkpOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvbWFjY2FyY3Jhc2gvZmFjZXRyYWNrXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtc1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBzZWFyY2hGYWNlKHBhcmFtczphbnkpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOidwb3N0JyxcclxuICAgICAgICAgICAgdXJsOicvZGIvbWFjY2FyY3Jhc2gvc2VhcmNoZmFjZScsXHJcbiAgICAgICAgICAgIGRhdGE6cGFyYW1zXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHNlYXJjaEFsYXJtKHBhcmFtczphbnkpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOidwb3N0JyxcclxuICAgICAgICAgICAgdXJsOicvZGIvbWFjY2FyY3Jhc2gvcGVyc29uYWxhcm0nLFxyXG4gICAgICAgICAgICBkYXRhOnBhcmFtc1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBzZWFyY2hBbGxJbmZvKHBhcmFtczphbnkpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOidwb3N0JyxcclxuICAgICAgICAgICAgdXJsOicvZGIvbWFjY2FyY3Jhc2gvYWNjb21wYW55aW5nJyxcclxuICAgICAgICAgICAgZGF0YTpwYXJhbXNcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgdXBsb2FkSW1hZ2UocGFyYW1zOiBGb3JtRGF0YSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZTogYW55LCByZWplY3Q6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIHhoci5vcGVuKCdQT1NUJywgJy9kYi91cGxvYWQvaW1hZ2UnLCB0cnVlKTtcclxuICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IChldikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQgJiYgeGhyLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpIGFzIFJlc3BvbnNlUmVzdWx0PGFueT4pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgeGhyLm9uZXJyb3IgPSAoZXJyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHhoci5zZW5kKHBhcmFtcylcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuc2VydmljZSgnbWFjVHJhY2tTZXJ2aWNlJywgbWFjVHJhY2tTZXJ2aWNlKTsiXX0=
