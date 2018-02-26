define(["require", "exports", "../app/main.app", "angular"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Promise = require('es6-promise');
    var macCarCrashMockService = (function () {
        function macCarCrashMockService($http, $q, notifyFactory) {
            this.$http = $http;
            this.$q = $q;
            this.notifyFactory = notifyFactory;
            this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
        }
        macCarCrashMockService.prototype.searchFaceTrack = function (params) {
            return this.$http({
                method: "POST",
                url: "/db/maccarcrash/facetrack",
                data: params
            });
        };
        macCarCrashMockService.prototype.searchFace = function (params) {
            return this.$http({
                method: 'post',
                url: '/db/maccarcrash/searchface',
                data: params
            });
        };
        macCarCrashMockService.prototype.searchPersonAlarm = function (params) {
            return this.$http({
                method: 'post',
                url: '/db/maccarcrash/personalarm',
                data: params
            });
        };
        macCarCrashMockService.prototype.searchAccompanying = function (params) {
            return this.$http({
                method: 'post',
                url: '/db/maccarcrash/accompanying',
                data: params
            });
        };
        macCarCrashMockService.prototype.uploadImage = function (params) {
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
        macCarCrashMockService.$inject = ['$http', '$q', 'notifyFactory'];
        return macCarCrashMockService;
    }());
    main_app_1.app.service('macCarCrashMockService', macCarCrashMockService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL21hY0NhckNyYXNoTW9jay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUtBLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQWlCckM7UUFLSSxnQ0FBb0IsS0FBVSxFQUFVLEVBQU8sRUFBVSxhQUFxQztZQUExRSxVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBSztZQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUF3QjtZQUMxRixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDbEUsQ0FBQztRQUVELGdEQUFlLEdBQWYsVUFBZ0IsTUFBVztZQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxHQUFHLEVBQUUsMkJBQTJCO2dCQUNoQyxJQUFJLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFDRCwyQ0FBVSxHQUFWLFVBQVcsTUFBVTtZQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUMsTUFBTTtnQkFDYixHQUFHLEVBQUMsNEJBQTRCO2dCQUNoQyxJQUFJLEVBQUMsTUFBTTthQUNkLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFDRCxrREFBaUIsR0FBakIsVUFBa0IsTUFBVTtZQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUMsTUFBTTtnQkFDYixHQUFHLEVBQUMsNkJBQTZCO2dCQUNqQyxJQUFJLEVBQUMsTUFBTTthQUNkLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFDRCxtREFBa0IsR0FBbEIsVUFBbUIsTUFBVTtZQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUMsTUFBTTtnQkFDYixHQUFHLEVBQUMsOEJBQThCO2dCQUNsQyxJQUFJLEVBQUMsTUFBTTthQUNkLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFDRCw0Q0FBVyxHQUFYLFVBQVksTUFBZ0I7WUFDeEIsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBWSxFQUFFLE1BQVc7Z0JBQ3pDLElBQUksR0FBRyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7Z0JBQy9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUMzQyxHQUFHLENBQUMsa0JBQWtCLEdBQUcsVUFBQyxFQUFFO29CQUN4QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUF3QixDQUFDLENBQUM7d0JBQ2pFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBO29CQUN6QyxDQUFDO2dCQUNMLENBQUMsQ0FBQztnQkFDRixHQUFHLENBQUMsT0FBTyxHQUFHLFVBQUMsR0FBUTtvQkFDbkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUNmLENBQUMsQ0FBQztnQkFDRixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3BCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQWxETSw4QkFBTyxHQUFrQixDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFtRHJFLDZCQUFDO0tBckRELEFBcURDLElBQUE7SUFFRCxjQUFHLENBQUMsT0FBTyxDQUFDLHdCQUF3QixFQUFFLHNCQUFzQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9zZXJ2aWNlcy9tYWNDYXJDcmFzaE1vY2suc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwfSBmcm9tIFwiLi4vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnYW5ndWxhcic7XHJcbmltcG9ydCB7UmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHtJUmVzcG9uc2VOb3RpZnlGYWN0b3J5fSBmcm9tIFwiLi4vZmFjdG9yeS9yZXNwb25zZS5ub3RpZnkuZmFjdG9yeVwiO1xyXG5cclxubGV0IFByb21pc2UgPSByZXF1aXJlKCdlczYtcHJvbWlzZScpO1xyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnksICQ6IGFueSwgcmVxdWlyZTogYW55O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTWFjQ2FyQ3Jhc2hNb2NrU2VydmljZSB7XHJcbiAgICB1cGxvYWRJbWFnZTogKHBhcmFtczogRm9ybURhdGEpID0+IGFueTtcclxuICAgIHNlYXJjaEZhY2VUcmFjazogKHBhcmFtczogYW55KSA9PiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+O1xyXG4gICAgc2VhcmNoRmFjZToocGFyYW1zOmFueSkgPT5Qcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+O1xyXG4gICAgc2VhcmNoUGVyc29uQWxhcm06KHBhcmFtczphbnkpID0+UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuICAgIHNlYXJjaEFjY29tcGFueWluZzoocGFyYW1zOmFueSkgPT5Qcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+O1xyXG59XHJcblxyXG4vKiogY3JlYXRlIGJ5IHp4cVxyXG4gKiAg5Lu75Yqh566h55CGIOWinuWIoOaUueafpSDor7fmsYJcclxuICogQHRpbWU6IDIwMTctMDYtMTQgMTE6MjQ6MDFcclxuICogQHBhcmFtczpcclxuICogQHJldHVybjpcclxuICovXHJcbmNsYXNzIG1hY0NhckNyYXNoTW9ja1NlcnZpY2UgaW1wbGVtZW50cyBJTWFjQ2FyQ3Jhc2hNb2NrU2VydmljZSB7XHJcblxyXG4gICAgc3RhdGljICRpbmplY3Q6IEFycmF5PHN0cmluZz4gPSBbJyRodHRwJywgJyRxJywgJ25vdGlmeUZhY3RvcnknXTtcclxuICAgIHByaXZhdGUgbm90aWZ5RnVuYzogKHJlczogUmVzcG9uc2VSZXN1bHQ8YW55PikgPT4gUmVzcG9uc2VSZXN1bHQ8YW55PjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBhbnksIHByaXZhdGUgJHE6IGFueSwgcHJpdmF0ZSBub3RpZnlGYWN0b3J5OiBJUmVzcG9uc2VOb3RpZnlGYWN0b3J5KSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZnlGdW5jID0gdGhpcy5ub3RpZnlGYWN0b3J5Lm1zZyh7b25seVN1Y2Nlc3M6IHRydWV9KTtcclxuICAgIH1cclxuXHJcbiAgICBzZWFyY2hGYWNlVHJhY2socGFyYW1zOiBhbnkpOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvbWFjY2FyY3Jhc2gvZmFjZXRyYWNrXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtc1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBzZWFyY2hGYWNlKHBhcmFtczphbnkpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOidwb3N0JyxcclxuICAgICAgICAgICAgdXJsOicvZGIvbWFjY2FyY3Jhc2gvc2VhcmNoZmFjZScsXHJcbiAgICAgICAgICAgIGRhdGE6cGFyYW1zXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHNlYXJjaFBlcnNvbkFsYXJtKHBhcmFtczphbnkpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOidwb3N0JyxcclxuICAgICAgICAgICAgdXJsOicvZGIvbWFjY2FyY3Jhc2gvcGVyc29uYWxhcm0nLFxyXG4gICAgICAgICAgICBkYXRhOnBhcmFtc1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBzZWFyY2hBY2NvbXBhbnlpbmcocGFyYW1zOmFueSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6J3Bvc3QnLFxyXG4gICAgICAgICAgICB1cmw6Jy9kYi9tYWNjYXJjcmFzaC9hY2NvbXBhbnlpbmcnLFxyXG4gICAgICAgICAgICBkYXRhOnBhcmFtc1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICB1cGxvYWRJbWFnZShwYXJhbXM6IEZvcm1EYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlOiBhbnksIHJlamVjdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgeGhyLm9wZW4oJ1BPU1QnLCAnL2RiL3VwbG9hZC9pbWFnZScsIHRydWUpO1xyXG4gICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKGV2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiB4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCkgYXMgUmVzcG9uc2VSZXN1bHQ8YW55Pik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB4aHIub25lcnJvciA9IChlcnI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycilcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgeGhyLnNlbmQocGFyYW1zKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5zZXJ2aWNlKCdtYWNDYXJDcmFzaE1vY2tTZXJ2aWNlJywgbWFjQ2FyQ3Jhc2hNb2NrU2VydmljZSk7Il19
