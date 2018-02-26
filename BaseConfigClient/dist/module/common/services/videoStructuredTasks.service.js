define(["require", "exports", "../app/main.app", "../../../core/entity/OperFirstModule", "../../../core/entity/OperSecondModule", "../../../core/entity/OperThirdModule", "../../../core/entity/OperActionType", "angular", "../factory/SystemLog.factory"], function (require, exports, main_app_1, OperFirstModule_1, OperSecondModule_1, OperThirdModule_1, OperActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var VideoStructuredTasksService = (function () {
        function VideoStructuredTasksService($http, $q, notifyFactory, systemLogFactory) {
            var _this = this;
            this.$http = $http;
            this.$q = $q;
            this.notifyFactory = notifyFactory;
            this.systemLogFactory = systemLogFactory;
            this.findFaceListByParams = function (params) {
                return _this.$http({
                    method: "get",
                    params: params,
                    url: "/db/videoStruct/findFaceList",
                });
            };
            this.updateFaceRunStatus = function (ids, isStart) {
                var params = {
                    taskGroupIds: ids,
                    isStart: isStart
                };
                return _this.$http({
                    method: "post",
                    params: params,
                    url: "/pdp/videoTask/updateTaskStatus",
                }).then(_this.notifyFunc).then(_this.systemLogFactory.preSaveLogEx({
                    OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                    OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Business.code,
                    OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Business_VideoStructTask.code,
                    ActionType: OperActionType_1.OperActionType.Modify.code
                }));
            };
            this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
        }
        VideoStructuredTasksService.prototype.getFaceDetail = function (ID) {
            return this.$http({
                method: "get",
                params: { id: ID },
                url: "/db/videoStruct/findFaceById",
            });
        };
        ;
        VideoStructuredTasksService.prototype.deleteFaceTaskForIDS = function (ids) {
            return this.$http({
                method: "post",
                params: { taskGroupIds: ids },
                url: "/pdp/videoTask/delete",
            }).then(this.notifyFunc).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Business.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Business_VideoStructTask.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        VideoStructuredTasksService.prototype.addOrUpdateFaceTask = function (params) {
            return this.$http({
                method: "post",
                data: params,
                url: "/pdp/videoTask/operateTask",
            }).then(this.notifyFunc).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Business.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Business_VideoStructTask.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        VideoStructuredTasksService.$inject = ['$http', '$q', 'notifyFactory', 'systemLogFactory'];
        return VideoStructuredTasksService;
    }());
    main_app_1.app
        .service('videoStructuredTasksService', VideoStructuredTasksService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL3ZpZGVvU3RydWN0dXJlZFRhc2tzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBcUNBO1FBSUkscUNBQW9CLEtBQVUsRUFBUyxFQUFPLEVBQVMsYUFBcUMsRUFBUyxnQkFBa0M7WUFBdkksaUJBRUM7WUFGbUIsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUFTLE9BQUUsR0FBRixFQUFFLENBQUs7WUFBUyxrQkFBYSxHQUFiLGFBQWEsQ0FBd0I7WUFBUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1lBSXZJLHlCQUFvQixHQUFHLFVBQUMsTUFBdUI7Z0JBQzNDLE1BQU0sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDO29CQUNkLE1BQU0sRUFBQyxLQUFLO29CQUNaLE1BQU0sRUFBRSxNQUFNO29CQUNkLEdBQUcsRUFBQyw4QkFBOEI7aUJBQ3JDLENBQUMsQ0FBQTtZQUNOLENBQUMsQ0FBQztZQXVDRix3QkFBbUIsR0FBRyxVQUFDLEdBQVUsRUFBQyxPQUFlO2dCQUM5QyxJQUFJLE1BQU0sR0FBRztvQkFDVCxZQUFZLEVBQUMsR0FBRztvQkFDaEIsT0FBTyxFQUFDLE9BQU87aUJBQ2xCLENBQUM7Z0JBRUQsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUM7b0JBQ2QsTUFBTSxFQUFDLE1BQU07b0JBQ2IsTUFBTSxFQUFFLE1BQU07b0JBQ2QsR0FBRyxFQUFDLGlDQUFpQztpQkFDeEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7b0JBQzdELGVBQWUsRUFBRSxpQ0FBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJO29CQUNoRCxnQkFBZ0IsRUFBRSxtQ0FBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJO29CQUMzRCxlQUFlLEVBQUUsaUNBQWUsQ0FBQyxtQ0FBbUMsQ0FBQyxJQUFJO29CQUN6RSxVQUFVLEVBQUUsK0JBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSTtpQkFDekMsQ0FBQyxDQUFDLENBQUE7WUFDUCxDQUFDLENBQUM7WUFoRUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7UUFVRCxtREFBYSxHQUFiLFVBQWMsRUFBUztZQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUMsS0FBSztnQkFDWixNQUFNLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDO2dCQUNmLEdBQUcsRUFBQyw4QkFBOEI7YUFDckMsQ0FBQyxDQUFBO1FBRU4sQ0FBQztRQUFBLENBQUM7UUFHRiwwREFBb0IsR0FBcEIsVUFBcUIsR0FBaUI7WUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFDLE1BQU07Z0JBQ2IsTUFBTSxFQUFFLEVBQUMsWUFBWSxFQUFDLEdBQUcsRUFBQztnQkFDMUIsR0FBRyxFQUFDLHVCQUF1QjthQUM5QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztnQkFDN0QsZUFBZSxFQUFFLGlDQUFlLENBQUMsVUFBVSxDQUFDLElBQUk7Z0JBQ2hELGdCQUFnQixFQUFFLG1DQUFnQixDQUFDLG1CQUFtQixDQUFDLElBQUk7Z0JBQzNELGVBQWUsRUFBRSxpQ0FBZSxDQUFDLG1DQUFtQyxDQUFDLElBQUk7Z0JBQ3pFLFVBQVUsRUFBRSwrQkFBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJO2FBQ3RDLENBQUMsQ0FBQyxDQUFBO1FBQ1AsQ0FBQztRQUdELHlEQUFtQixHQUFuQixVQUFvQixNQUFVO1lBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBQyxNQUFNO2dCQUNiLElBQUksRUFBRSxNQUFNO2dCQUNaLEdBQUcsRUFBQyw0QkFBNEI7YUFDbkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7Z0JBQzdELGVBQWUsRUFBRSxpQ0FBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJO2dCQUNoRCxnQkFBZ0IsRUFBRSxtQ0FBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJO2dCQUMzRCxlQUFlLEVBQUUsaUNBQWUsQ0FBQyxtQ0FBbUMsQ0FBQyxJQUFJO2dCQUN6RSxVQUFVLEVBQUUsK0JBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSTthQUN6QyxDQUFDLENBQUMsQ0FBQTtRQUNQLENBQUM7UUFqRE0sbUNBQU8sR0FBaUIsQ0FBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLGVBQWUsRUFBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBb0VyRixrQ0FBQztLQXRFRCxBQXNFQyxJQUFBO0lBRUQsY0FBRztTQUNFLE9BQU8sQ0FBQyw2QkFBNkIsRUFBRSwyQkFBMkIsQ0FBQyxDQUN2RSIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3NlcnZpY2VzL3ZpZGVvU3RydWN0dXJlZFRhc2tzLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0ICdhbmd1bGFyJztcclxuaW1wb3J0IHtUYXNrTW9kZWwsQ2FyTW9uaXRvcixUYXNrU2VhcmNoUGFyYW1zfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2ZXIvVGFza01vZGVsXCI7XHJcbmltcG9ydCB7RGF0YU9wZXJUeXBlfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9EYXRhT3BlclR5cGVcIjtcclxuaW1wb3J0IHtPYmplY3RUeXBlfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnVtL09iamVjdFR5cGVcIjtcclxuaW1wb3J0IHtSZXNwb25zZVJlc3VsdCwgQmFja1Jlc3BvbnNlQm9keX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5pbXBvcnQge0V2ZW50UnVsZU1vZGVsRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9FdmVudFJ1bGVNb2RlbFwiO1xyXG5pbXBvcnQge0lSZXNwb25zZU5vdGlmeUZhY3Rvcnl9IGZyb20gXCIuLi9mYWN0b3J5L3Jlc3BvbnNlLm5vdGlmeS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7IFZpZGVvVGFza01vZGVsIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L1ZpZGVvU3RydWN0VGFza1wiO1xyXG5pbXBvcnQge09wZXJGaXRzdE1vZHVsZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlckZpcnN0TW9kdWxlJztcclxuaW1wb3J0IHtPcGVyU2Vjb25kTW9kdWxlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyU2Vjb25kTW9kdWxlJztcclxuaW1wb3J0IHtPcGVyVGhpcmRNb2R1bGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJUaGlyZE1vZHVsZSc7XHJcbmltcG9ydCB7T3BlckFjdGlvblR5cGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJBY3Rpb25UeXBlJztcclxuaW1wb3J0IHtJU3lzdGVtTG9nRmFjdG9yeX0gZnJvbSBcIi4uL2ZhY3RvcnkvU3lzdGVtTG9nLmZhY3RvcnlcIjtcclxuaW1wb3J0IFwiLi4vZmFjdG9yeS9TeXN0ZW1Mb2cuZmFjdG9yeVwiO1xyXG5cclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVmlkZW9TdHJ1Y3R1cmVkVGFza3NTZXJ2aWNlIHtcclxuICAgIGdldEZhY2VEZXRhaWwoaWQ6c3RyaW5nKTpQcm9taXNlPEJhY2tSZXNwb25zZUJvZHk8VGFza01vZGVsPj47XHJcblxyXG4gICAgYWRkT3JVcGRhdGVGYWNlVGFzayhwYXJhbXM6YW55KTpQcm9taXNlPEJhY2tSZXNwb25zZUJvZHk8c3RyaW5nPj5cclxuXHJcbiAgICBmaW5kRmFjZUxpc3RCeVBhcmFtcyhwYXJhbXM6VGFza1NlYXJjaFBhcmFtcyk6YW55O1xyXG5cclxuICAgIGRlbGV0ZUZhY2VUYXNrRm9ySURTKHBhcmFtczpBcnJheTxzdHJpbmc+KTphbnk7XHJcblxyXG4gICAgdXBkYXRlRmFjZVJ1blN0YXR1cyhpZHM6c3RyaW5nLGlzU3RhcnQ6Ym9vbGVhbik6YW55O1xyXG5cclxufVxyXG4vKiogY3JlYXRlIGJ5IHp4cVxyXG4gKiAg5Lu75Yqh566h55CGIOWinuWIoOaUueafpSDor7fmsYJcclxuICogQHRpbWU6IDIwMTctMDYtMTQgMTE6MjQ6MDFcclxuICogQHBhcmFtczpcclxuICogQHJldHVybjpcclxuICovXHJcbmNsYXNzIFZpZGVvU3RydWN0dXJlZFRhc2tzU2VydmljZSBpbXBsZW1lbnRzIElWaWRlb1N0cnVjdHVyZWRUYXNrc1NlcnZpY2V7XHJcblxyXG4gICAgc3RhdGljICRpbmplY3Q6QXJyYXk8c3RyaW5nPiA9IFsnJGh0dHAnLCckcScsJ25vdGlmeUZhY3RvcnknLCdzeXN0ZW1Mb2dGYWN0b3J5J107XHJcbiAgICBwcml2YXRlIG5vdGlmeUZ1bmM6KHJlczogUmVzcG9uc2VSZXN1bHQ8YW55Pik9PlJlc3BvbnNlUmVzdWx0PGFueT47XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBhbnkscHJpdmF0ZSAkcTogYW55LHByaXZhdGUgbm90aWZ5RmFjdG9yeTogSVJlc3BvbnNlTm90aWZ5RmFjdG9yeSxwcml2YXRlIHN5c3RlbUxvZ0ZhY3Rvcnk6SVN5c3RlbUxvZ0ZhY3RvcnkpIHtcclxuICAgICAgICB0aGlzLm5vdGlmeUZ1bmMgPSB0aGlzLm5vdGlmeUZhY3RvcnkubXNnKHtvbmx5U3VjY2VzczogdHJ1ZX0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmRGYWNlTGlzdEJ5UGFyYW1zID0gKHBhcmFtczpUYXNrU2VhcmNoUGFyYW1zKT0+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOlwiZ2V0XCIsXHJcbiAgICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6XCIvZGIvdmlkZW9TdHJ1Y3QvZmluZEZhY2VMaXN0XCIsXHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcbiAgICBcclxuICAgIGdldEZhY2VEZXRhaWwoSUQ6c3RyaW5nKXtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDpcImdldFwiLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHtpZDpJRH0sXHJcbiAgICAgICAgICAgIHVybDpcIi9kYi92aWRlb1N0cnVjdC9maW5kRmFjZUJ5SWRcIixcclxuICAgICAgICB9KVxyXG5cclxuICAgIH07XHJcblxyXG5cclxuICAgIGRlbGV0ZUZhY2VUYXNrRm9ySURTKGlkczpBcnJheTxzdHJpbmc+KXtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDpcInBvc3RcIixcclxuICAgICAgICAgICAgcGFyYW1zOiB7dGFza0dyb3VwSWRzOmlkc30sXHJcbiAgICAgICAgICAgIHVybDpcIi9wZHAvdmlkZW9UYXNrL2RlbGV0ZVwiLFxyXG4gICAgICAgIH0pLnRoZW4odGhpcy5ub3RpZnlGdW5jKS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19CdXNpbmVzcy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX0J1c2luZXNzX1ZpZGVvU3RydWN0VGFzay5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5EZWwuY29kZVxyXG4gICAgICAgIH0pKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBhZGRPclVwZGF0ZUZhY2VUYXNrKHBhcmFtczphbnkpOlByb21pc2U8QmFja1Jlc3BvbnNlQm9keTxzdHJpbmc+PntcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDpcInBvc3RcIixcclxuICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6XCIvcGRwL3ZpZGVvVGFzay9vcGVyYXRlVGFza1wiLFxyXG4gICAgICAgIH0pLnRoZW4odGhpcy5ub3RpZnlGdW5jKS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19CdXNpbmVzcy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX0J1c2luZXNzX1ZpZGVvU3RydWN0VGFzay5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5Nb2RpZnkuY29kZVxyXG4gICAgICAgIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUZhY2VSdW5TdGF0dXMgPSAoaWRzOnN0cmluZyxpc1N0YXJ0OmJvb2xlYW4pPT57XHJcbiAgICAgICBsZXQgcGFyYW1zID0ge1xyXG4gICAgICAgICAgIHRhc2tHcm91cElkczppZHMsXHJcbiAgICAgICAgICAgaXNTdGFydDppc1N0YXJ0XHJcbiAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDpcInBvc3RcIixcclxuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXHJcbiAgICAgICAgICAgIHVybDpcIi9wZHAvdmlkZW9UYXNrL3VwZGF0ZVRhc2tTdGF0dXNcIixcclxuICAgICAgICB9KS50aGVuKHRoaXMubm90aWZ5RnVuYykudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfQnVzaW5lc3MuY29kZSxcclxuICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuQmFzZUNvbmZpZ19CdXNpbmVzc19WaWRlb1N0cnVjdFRhc2suY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuTW9kaWZ5LmNvZGVcclxuICAgICAgICB9KSlcclxuICAgIH07XHJcbn1cclxuXHJcbmFwcFxyXG4gICAgLnNlcnZpY2UoJ3ZpZGVvU3RydWN0dXJlZFRhc2tzU2VydmljZScsIFZpZGVvU3RydWN0dXJlZFRhc2tzU2VydmljZSlcclxuOyJdfQ==
