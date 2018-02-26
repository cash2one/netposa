define(["require", "exports", "../app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UploadImageService = (function () {
        function UploadImageService($http, notifyFactory) {
            this.$http = $http;
            this.notifyFactory = notifyFactory;
            this.notifyFunc = this.notifyFactory.msg();
        }
        UploadImageService.prototype.uploadImageForFace = function (formData, params) {
            return this.$http({
                url: '/pdp/upload/faceImageForJava',
                method: 'POST',
                headers: {
                    'Content-Type': undefined
                },
                params: params,
                transformRequest: function () {
                    return formData;
                }
            }).then(this.notifyFunc);
        };
        UploadImageService.prototype.uploadImageForCar = function (formData) {
            return this.$http({
                url: '/pdp/search/quick/uploadImgToPVD',
                method: 'POST',
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: function () {
                    return formData;
                }
            }).then(this.notifyFunc);
        };
        UploadImageService.prototype.uploadImageForId = function (ids) {
            return this.$http({
                url: '/pdp/search/searchidnumber',
                method: 'POST',
                params: { ids: ids }
            }).then(this.notifyFunc);
        };
        UploadImageService.$inject = ['$http', 'notifyFactory'];
        return UploadImageService;
    }());
    main_app_1.app.service('uploadImageService', UploadImageService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL3VwbG9hZEltYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBVUE7UUFNSSw0QkFBb0IsS0FBVSxFQUNWLGFBQXFDO1lBRHJDLFVBQUssR0FBTCxLQUFLLENBQUs7WUFDVixrQkFBYSxHQUFiLGFBQWEsQ0FBd0I7WUFDckQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQy9DLENBQUM7UUFFRCwrQ0FBa0IsR0FBbEIsVUFBbUIsUUFBa0IsRUFBRSxNQUFZO1lBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLEdBQUcsRUFBRSw4QkFBOEI7Z0JBQ25DLE1BQU0sRUFBRSxNQUFNO2dCQUNkLE9BQU8sRUFBRTtvQkFDTCxjQUFjLEVBQUUsU0FBUztpQkFDNUI7Z0JBQ0QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsZ0JBQWdCLEVBQUU7b0JBQ2QsTUFBTSxDQUFDLFFBQVEsQ0FBQztnQkFDcEIsQ0FBQzthQUNKLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQzVCLENBQUM7UUFFRCw4Q0FBaUIsR0FBakIsVUFBa0IsUUFBa0I7WUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsR0FBRyxFQUFFLGtDQUFrQztnQkFDdkMsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsT0FBTyxFQUFFO29CQUNMLGNBQWMsRUFBRSxTQUFTO2lCQUM1QjtnQkFDRCxnQkFBZ0IsRUFBRTtvQkFDZCxNQUFNLENBQUMsUUFBUSxDQUFDO2dCQUNwQixDQUFDO2FBQ0osQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDNUIsQ0FBQztRQUVELDZDQUFnQixHQUFoQixVQUFpQixHQUF3QjtZQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxHQUFHLEVBQUUsNEJBQTRCO2dCQUNqQyxNQUFNLEVBQUUsTUFBTTtnQkFDZCxNQUFNLEVBQUUsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDO2FBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQzVCLENBQUM7UUExQ00sMEJBQU8sR0FBa0IsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7UUEyQy9ELHlCQUFDO0tBN0NELEFBNkNDLElBQUE7SUFFRCxjQUFHLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLGtCQUFrQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9zZXJ2aWNlcy91cGxvYWRJbWFnZS5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthcHB9IGZyb20gXCIuLi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHtSZXNwb25zZVJlc3VsdH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5pbXBvcnQge0lSZXNwb25zZU5vdGlmeUZhY3Rvcnl9IGZyb20gXCIuLi9mYWN0b3J5L3Jlc3BvbnNlLm5vdGlmeS5mYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElVcGxvYWRJbWFnZVNlcnZpY2Uge1xyXG4gICAgdXBsb2FkSW1hZ2VGb3JGYWNlKGZvcm1EYXRhOiBGb3JtRGF0YSwgcGFyYW1zOiBhbnkpOiBQcm9taXNlPGFueT47XHJcbiAgICB1cGxvYWRJbWFnZUZvckNhcihmb3JtRGF0YTogRm9ybURhdGEpOiBQcm9taXNlPGFueT47XHJcbiAgICB1cGxvYWRJbWFnZUZvcklkKGlkczpBcnJheTxzdHJpbmd8bnVtYmVyPik6UHJvbWlzZTxhbnk+O1xyXG59XHJcblxyXG5jbGFzcyBVcGxvYWRJbWFnZVNlcnZpY2UgaW1wbGVtZW50cyBJVXBsb2FkSW1hZ2VTZXJ2aWNlIHtcclxuXHJcbiAgICBzdGF0aWMgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnJGh0dHAnLCAnbm90aWZ5RmFjdG9yeSddO1xyXG5cclxuICAgIHByaXZhdGUgbm90aWZ5RnVuYzogKHJlczogUmVzcG9uc2VSZXN1bHQ8YW55PikgPT4gUmVzcG9uc2VSZXN1bHQ8YW55PjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIG5vdGlmeUZhY3Rvcnk6IElSZXNwb25zZU5vdGlmeUZhY3RvcnkpIHtcclxuICAgICAgICB0aGlzLm5vdGlmeUZ1bmMgPSB0aGlzLm5vdGlmeUZhY3RvcnkubXNnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBsb2FkSW1hZ2VGb3JGYWNlKGZvcm1EYXRhOiBGb3JtRGF0YSwgcGFyYW1zPzogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICB1cmw6ICcvcGRwL3VwbG9hZC9mYWNlSW1hZ2VGb3JKYXZhJyxcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybVJlcXVlc3Q6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtRGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4odGhpcy5ub3RpZnlGdW5jKVxyXG4gICAgfVxyXG5cclxuICAgIHVwbG9hZEltYWdlRm9yQ2FyKGZvcm1EYXRhOiBGb3JtRGF0YSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgdXJsOiAnL3BkcC9zZWFyY2gvcXVpY2svdXBsb2FkSW1nVG9QVkQnLFxyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm1SZXF1ZXN0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybURhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKHRoaXMubm90aWZ5RnVuYylcclxuICAgIH1cclxuXHJcbiAgICB1cGxvYWRJbWFnZUZvcklkKGlkczpBcnJheTxzdHJpbmd8bnVtYmVyPikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgdXJsOiAnL3BkcC9zZWFyY2gvc2VhcmNoaWRudW1iZXInLFxyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgcGFyYW1zOiB7aWRzOmlkc31cclxuICAgICAgICB9KS50aGVuKHRoaXMubm90aWZ5RnVuYylcclxuICAgIH1cclxufVxyXG5cclxuYXBwLnNlcnZpY2UoJ3VwbG9hZEltYWdlU2VydmljZScsIFVwbG9hZEltYWdlU2VydmljZSk7Il19
