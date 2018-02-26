define(["require", "exports", "../app/main.app", "../../../core/entity/OperFirstModule", "../../../core/entity/OperSecondModule", "../../../core/entity/OperThirdModule", "../../../core/entity/OperActionType", "angular", "../factory/response.notify.factory", "../factory/SystemLog.factory"], function (require, exports, main_app_1, OperFirstModule_1, OperSecondModule_1, OperThirdModule_1, OperActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TimeTemplateService = (function () {
        function TimeTemplateService($q, $http, notifyFactory, systemLogFactory) {
            this.$q = $q;
            this.$http = $http;
            this.notifyFactory = notifyFactory;
            this.systemLogFactory = systemLogFactory;
            this.$http = $http;
            this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
        }
        TimeTemplateService.prototype.findAll = function () {
            return this.$http({
                method: 'get',
                url: '/db/timeTemplate/findAll',
            });
        };
        ;
        TimeTemplateService.prototype.findByListParams = function (params) {
            return this.$http({
                method: "GET",
                params: params,
                url: "/db/timeTemplate/findListByParams",
            });
        };
        ;
        TimeTemplateService.prototype.save = function (params) {
            return this.$http({
                method: 'post',
                data: params,
                url: '/db/timetemplate/save',
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Business.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Business_TimeTemplate.code,
                ActionType: OperActionType_1.OperActionType.Add.code
            }));
        };
        ;
        TimeTemplateService.prototype.update = function (params) {
            return this.$http({
                method: 'post',
                data: params,
                url: '/db/timeTemplate/update',
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Business.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Business_TimeTemplate.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        ;
        TimeTemplateService.prototype.deleteById = function (params) {
            var _params = [params];
            return this.$http({
                method: 'post',
                data: _params,
                url: '/db/timeTemplate/delete',
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Business.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Business_TimeTemplate.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        TimeTemplateService.prototype.deleteByIds = function (params) {
            return this.$http({
                method: 'post',
                data: params,
                url: '/db/timeTemplate/delete',
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Business.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Business_TimeTemplate.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        TimeTemplateService.$inject = ['$q', '$http', 'notifyFactory', 'systemLogFactory'];
        return TimeTemplateService;
    }());
    main_app_1.app
        .service('timeTemplateService', TimeTemplateService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL3RpbWVUZW1wbGF0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQXVDQTtRQUtJLDZCQUFvQixFQUFPLEVBQVUsS0FBVSxFQUFVLGFBQXFDLEVBQVUsZ0JBQW1DO1lBQXZILE9BQUUsR0FBRixFQUFFLENBQUs7WUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQVUsa0JBQWEsR0FBYixhQUFhLENBQXdCO1lBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFtQjtZQUN2SSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDcEUsQ0FBQztRQUVELHFDQUFPLEdBQVA7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsS0FBSztnQkFDYixHQUFHLEVBQUUsMEJBQTBCO2FBQ2xDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFBQSxDQUFDO1FBRUYsOENBQWdCLEdBQWhCLFVBQWlCLE1BQThCO1lBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxLQUFLO2dCQUNiLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEdBQUcsRUFBRSxtQ0FBbUM7YUFDM0MsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUFBLENBQUM7UUFFRixrQ0FBSSxHQUFKLFVBQU0sTUFBb0I7WUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsSUFBSSxFQUFFLE1BQU07Z0JBQ1osR0FBRyxFQUFFLHVCQUF1QjthQUMvQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZDLGVBQWUsRUFBRSxpQ0FBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJO2dCQUNoRCxnQkFBZ0IsRUFBRSxtQ0FBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJO2dCQUMzRCxlQUFlLEVBQUUsaUNBQWUsQ0FBQyxnQ0FBZ0MsQ0FBQyxJQUFJO2dCQUN0RSxVQUFVLEVBQUUsK0JBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSTthQUN0QyxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUM7UUFBQSxDQUFDO1FBRUYsb0NBQU0sR0FBTixVQUFRLE1BQW9CO1lBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLElBQUksRUFBRSxNQUFNO2dCQUNaLEdBQUcsRUFBRSx5QkFBeUI7YUFDakMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO2dCQUN2QyxlQUFlLEVBQUUsaUNBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSTtnQkFDaEQsZ0JBQWdCLEVBQUUsbUNBQWdCLENBQUMsbUJBQW1CLENBQUMsSUFBSTtnQkFDM0QsZUFBZSxFQUFFLGlDQUFlLENBQUMsZ0NBQWdDLENBQUMsSUFBSTtnQkFDdEUsVUFBVSxFQUFFLCtCQUFjLENBQUMsTUFBTSxDQUFDLElBQUk7YUFDekMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDO1FBQUEsQ0FBQztRQUVGLHdDQUFVLEdBQVYsVUFBWSxNQUFjO1lBQ3RCLElBQUksT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsR0FBRyxFQUFFLHlCQUF5QjthQUNqQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZDLGVBQWUsRUFBRSxpQ0FBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJO2dCQUNoRCxnQkFBZ0IsRUFBRSxtQ0FBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJO2dCQUMzRCxlQUFlLEVBQUUsaUNBQWUsQ0FBQyxnQ0FBZ0MsQ0FBQyxJQUFJO2dCQUN0RSxVQUFVLEVBQUUsK0JBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSTthQUN0QyxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUM7UUFBQSxDQUFDO1FBRUYseUNBQVcsR0FBWCxVQUFhLE1BQXFCO1lBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLElBQUksRUFBRSxNQUFNO2dCQUNaLEdBQUcsRUFBRSx5QkFBeUI7YUFDakMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO2dCQUN2QyxlQUFlLEVBQUUsaUNBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSTtnQkFDaEQsZ0JBQWdCLEVBQUUsbUNBQWdCLENBQUMsbUJBQW1CLENBQUMsSUFBSTtnQkFDM0QsZUFBZSxFQUFFLGlDQUFlLENBQUMsZ0NBQWdDLENBQUMsSUFBSTtnQkFDdEUsVUFBVSxFQUFFLCtCQUFjLENBQUMsR0FBRyxDQUFDLElBQUk7YUFDdEMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDO1FBQUEsQ0FBQztRQTFFSywyQkFBTyxHQUFrQixDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUEyRXpGLDBCQUFDO0tBN0VELEFBNkVDLElBQUE7SUFDRCxjQUFHO1NBQ0UsT0FBTyxDQUFDLHFCQUFxQixFQUFFLG1CQUFtQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9zZXJ2aWNlcy90aW1lVGVtcGxhdGUuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBjcmVhdGUgYnkgenhxXHJcbiAqICDml7bpl7TmqKHmnb/mk43kvZxcclxuICogQHRpbWU6IDIwMTctMDYtMjIgMTE6Mjc6MjhcclxuICovXHJcbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTtcclxuaW1wb3J0IHsgYXBwIH0gZnJvbSBcIi4uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgJ2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBSZXNwb25zZVJlc3VsdCwgUGFnZVJlc3VsdCB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHsgSVJlc3BvbnNlTm90aWZ5RmFjdG9yeSB9IGZyb20gXCIuLi9mYWN0b3J5L3Jlc3BvbnNlLm5vdGlmeS5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uL2ZhY3RvcnkvcmVzcG9uc2Uubm90aWZ5LmZhY3RvcnlcIjtcclxuaW1wb3J0IHsgVGltZVRlbXBsYXRlTGlzdFBhcmFtcyB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9UaW1lVGVtcGxhdGVQYXJhbXNcIjtcclxuaW1wb3J0IHsgVGltZVRlbXBsYXRlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L1RpbWVUZW1wbGF0ZVwiO1xyXG5pbXBvcnQgeyBUaW1lVGVtcGxhdGVFeCB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9UaW1lVGVtcGxhdGVFeFwiO1xyXG5cclxuaW1wb3J0IHsgT3BlckZpdHN0TW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlckZpcnN0TW9kdWxlJztcclxuaW1wb3J0IHsgT3BlclNlY29uZE1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJTZWNvbmRNb2R1bGUnO1xyXG5pbXBvcnQgeyBPcGVyVGhpcmRNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyVGhpcmRNb2R1bGUnO1xyXG5pbXBvcnQgeyBPcGVyQWN0aW9uVHlwZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJBY3Rpb25UeXBlJztcclxuaW1wb3J0IHsgSVN5c3RlbUxvZ0ZhY3RvcnkgfSBmcm9tIFwiLi4vZmFjdG9yeS9TeXN0ZW1Mb2cuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi9mYWN0b3J5L1N5c3RlbUxvZy5mYWN0b3J5XCI7XHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVRpbWVUZW1wbGF0ZVNlcnZpY2Uge1xyXG4gICAgLy/ojrflj5bmiYDmnInml7bpl7TmqKHmnb/liJfooahcclxuICAgIGZpbmRBbGwoKTogUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxBcnJheTxUaW1lVGVtcGxhdGVFeD4+PjtcclxuXHJcbiAgICAvLyDmoLnmja7mnaHku7bojrflj5bliJfooahcclxuICAgIGZpbmRCeUxpc3RQYXJhbXMocGFyYW1zOiBUaW1lVGVtcGxhdGVMaXN0UGFyYW1zKTogUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxUaW1lVGVtcGxhdGVFeD4+O1xyXG5cclxuICAgIC8vXHJcbiAgICBzYXZlKHBhcmFtczogVGltZVRlbXBsYXRlKTogUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxzdHJpbmc+PjtcclxuICAgIC8vXHJcbiAgICB1cGRhdGUocGFyYW1zOiBUaW1lVGVtcGxhdGUpOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PHN0cmluZz4+O1xyXG5cclxuICAgIGRlbGV0ZUJ5SWQocGFyYW1zOiBzdHJpbmcpOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGJvb2xlYW4+PjtcclxuXHJcbiAgICBkZWxldGVCeUlkcyhwYXJhbXM6IEFycmF5PHN0cmluZz4pOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGJvb2xlYW4+PjtcclxufVxyXG5cclxuY2xhc3MgVGltZVRlbXBsYXRlU2VydmljZSBpbXBsZW1lbnRzIElUaW1lVGVtcGxhdGVTZXJ2aWNlIHtcclxuXHJcbiAgICBzdGF0aWMgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnJHEnLCAnJGh0dHAnLCAnbm90aWZ5RmFjdG9yeScsICdzeXN0ZW1Mb2dGYWN0b3J5J107XHJcbiAgICBwcml2YXRlIG5vdGlmeUZ1bmM6IChyZXM6IFJlc3BvbnNlUmVzdWx0PGFueT4pID0+IFJlc3BvbnNlUmVzdWx0PGFueT47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkcTogYW55LCBwcml2YXRlICRodHRwOiBhbnksIHByaXZhdGUgbm90aWZ5RmFjdG9yeTogSVJlc3BvbnNlTm90aWZ5RmFjdG9yeSwgcHJpdmF0ZSBzeXN0ZW1Mb2dGYWN0b3J5OiBJU3lzdGVtTG9nRmFjdG9yeSkge1xyXG4gICAgICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcclxuICAgICAgICB0aGlzLm5vdGlmeUZ1bmMgPSB0aGlzLm5vdGlmeUZhY3RvcnkubXNnKHsgb25seVN1Y2Nlc3M6IHRydWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZmluZEFsbCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICAgICAgdXJsOiAnL2RiL3RpbWVUZW1wbGF0ZS9maW5kQWxsJyxcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuXHJcbiAgICBmaW5kQnlMaXN0UGFyYW1zKHBhcmFtczogVGltZVRlbXBsYXRlTGlzdFBhcmFtcyl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL3RpbWVUZW1wbGF0ZS9maW5kTGlzdEJ5UGFyYW1zXCIsXHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcblxyXG4gICAgc2F2ZSAocGFyYW1zOiBUaW1lVGVtcGxhdGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXMsXHJcbiAgICAgICAgICAgIHVybDogJy9kYi90aW1ldGVtcGxhdGUvc2F2ZScsXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfQnVzaW5lc3MuY29kZSxcclxuICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuQmFzZUNvbmZpZ19CdXNpbmVzc19UaW1lVGVtcGxhdGUuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuQWRkLmNvZGVcclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHVwZGF0ZSAocGFyYW1zOiBUaW1lVGVtcGxhdGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXMsXHJcbiAgICAgICAgICAgIHVybDogJy9kYi90aW1lVGVtcGxhdGUvdXBkYXRlJyxcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19CdXNpbmVzcy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX0J1c2luZXNzX1RpbWVUZW1wbGF0ZS5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5Nb2RpZnkuY29kZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH07XHJcblxyXG4gICAgZGVsZXRlQnlJZCAocGFyYW1zOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgX3BhcmFtcyA9IFtwYXJhbXNdO1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGRhdGE6IF9wYXJhbXMsXHJcbiAgICAgICAgICAgIHVybDogJy9kYi90aW1lVGVtcGxhdGUvZGVsZXRlJyxcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19CdXNpbmVzcy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX0J1c2luZXNzX1RpbWVUZW1wbGF0ZS5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5EZWwuY29kZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH07XHJcblxyXG4gICAgZGVsZXRlQnlJZHMgKHBhcmFtczogQXJyYXk8c3RyaW5nPikgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXMsXHJcbiAgICAgICAgICAgIHVybDogJy9kYi90aW1lVGVtcGxhdGUvZGVsZXRlJyxcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19CdXNpbmVzcy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX0J1c2luZXNzX1RpbWVUZW1wbGF0ZS5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5EZWwuY29kZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH07XHJcbn1cclxuYXBwXHJcbiAgICAuc2VydmljZSgndGltZVRlbXBsYXRlU2VydmljZScsIFRpbWVUZW1wbGF0ZVNlcnZpY2UpOyJdfQ==
