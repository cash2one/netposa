define(["require", "exports", "../app/main.app", "../../../core/entity/OperFirstModule", "../../../core/entity/OperSecondModule", "../../../core/entity/OperThirdModule", "../../../core/entity/OperActionType", "../factory/SystemLog.factory"], function (require, exports, main_app_1, OperFirstModule_1, OperSecondModule_1, OperThirdModule_1, OperActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UnitService = (function () {
        function UnitService($http, notifyFactory, systemLogFactory) {
            this.systemLogFactory = systemLogFactory;
            this.$http = $http;
            this.notifyFunc = notifyFactory.msg({ onlySuccess: true });
        }
        UnitService.prototype.save = function (params) {
            return this.$http({
                method: 'POST',
                url: "/db/unit/add",
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Base.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Base_Unit.code,
                ActionType: OperActionType_1.OperActionType.Add.code
            }));
        };
        ;
        UnitService.prototype.edit = function (params) {
            return this.$http({
                method: 'POST',
                url: "/db/unit/update",
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Base.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Base_Unit.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        ;
        UnitService.prototype.deleteById = function (params) {
            return this.$http({
                method: 'POST',
                url: "/db/unit/delete",
                data: { id: params.ID }
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Base.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Base_Unit.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        UnitService.prototype.deleteByIds = function (ids) {
            var params = {
                ids: ids
            };
            return this.$http({
                method: 'POST',
                url: "/db/unit/deleteByIds",
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Base.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Base_Unit.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        UnitService.prototype.get = function (id) {
            return this.$http({
                method: "GET",
                url: "/db/unit/get",
                params: { id: id }
            });
        };
        ;
        UnitService.prototype.findTableList = function (params) {
            return this.$http({
                method: "GET",
                url: "/db/unit/findListByParams",
                params: params
            });
        };
        ;
        UnitService.prototype.findUnitTreeList = function (areaId) {
            return this.$http({
                method: "GET",
                url: "/db/unit/findUnitTreeList",
                params: { "areaId": areaId }
            }).then(complete);
            function complete(res) {
                var datas;
                if (res && res.code === 200) {
                    datas = res.data;
                }
                return datas || [];
            }
        };
        ;
        ;
        UnitService.$inject = ['$http', 'notifyFactory', 'systemLogFactory'];
        return UnitService;
    }());
    main_app_1.app.service('unitService', UnitService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL3VuaXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUF5QkE7UUEwRkkscUJBQVksS0FBVSxFQUFFLGFBQXFDLEVBQVMsZ0JBQWtDO1lBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7WUFDcEcsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQXhGRCwwQkFBSSxHQUFKLFVBQUssTUFBYztZQUVmLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEdBQUcsRUFBRSxjQUFjO2dCQUNuQixJQUFJLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztnQkFDdkMsZUFBZSxFQUFFLGlDQUFlLENBQUMsVUFBVSxDQUFDLElBQUk7Z0JBQ2hELGdCQUFnQixFQUFFLG1DQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJO2dCQUN2RCxlQUFlLEVBQUUsaUNBQWUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJO2dCQUMxRCxVQUFVLEVBQUUsK0JBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSTthQUN0QyxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUM7UUFBQSxDQUFDO1FBQ0YsMEJBQUksR0FBSixVQUFNLE1BQWM7WUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsR0FBRyxFQUFFLGlCQUFpQjtnQkFDdEIsSUFBSSxFQUFFLE1BQU07YUFDZixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZDLGVBQWUs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TUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDdkIsQ0FBQztRQUNMLENBQUM7UUFBQSxDQUFDO1FBT0QsQ0FBQztRQUxLLG1CQUFPLEdBQWtCLENBQUMsT0FBTyxFQUFDLGVBQWUsRUFBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBTWpGLGtCQUFDO0tBOUZELEFBOEZDLElBQUE7SUFFRCxjQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3NlcnZpY2VzL3VuaXQuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwfSBmcm9tIFwiLi4vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCB7VW5pdEV4fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvVW5pdEV4XCI7XHJcbmltcG9ydCB7VW5pdExpc3RQYXJhbXN9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9Vbml0UGFyYW1zXCI7XHJcbmltcG9ydCB7UmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHtJUmVzcG9uc2VOb3RpZnlGYWN0b3J5fSBmcm9tIFwiLi4vZmFjdG9yeS9yZXNwb25zZS5ub3RpZnkuZmFjdG9yeVwiO1xyXG5pbXBvcnQge09wZXJGaXRzdE1vZHVsZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlckZpcnN0TW9kdWxlJztcclxuaW1wb3J0IHtPcGVyU2Vjb25kTW9kdWxlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyU2Vjb25kTW9kdWxlJztcclxuaW1wb3J0IHtPcGVyVGhpcmRNb2R1bGV9IGZyb20gICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyVGhpcmRNb2R1bGUnO1xyXG5pbXBvcnQge09wZXJBY3Rpb25UeXBlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyQWN0aW9uVHlwZSc7XHJcbmltcG9ydCB7SVN5c3RlbUxvZ0ZhY3Rvcnl9IGZyb20gXCIuLi9mYWN0b3J5L1N5c3RlbUxvZy5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uL2ZhY3RvcnkvU3lzdGVtTG9nLmZhY3RvcnlcIjtcclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE3LzQvMTMuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVW5pdFNlcnZpY2V7XHJcbiAgICBzYXZlOiAocGFyYW1zOiBVbml0RXgpPT5hbnk7XHJcbiAgICBlZGl0OiAocGFyYW1zOiBVbml0RXgpPT5hbnk7XHJcbiAgICBnZXQ6IChpZDogc3RyaW5nKT0+YW55O1xyXG4gICAgZmluZFRhYmxlTGlzdDogKHBhcmFtczogVW5pdExpc3RQYXJhbXMpPT5hbnk7XHJcbiAgICBmaW5kVW5pdFRyZWVMaXN0OiAoYXJlYUlkOiBzdHJpbmcpID0+IGFueTtcclxuICAgIGRlbGV0ZUJ5SWRzOiAoaWRzOiBBcnJheTxzdHJpbmc+KSA9PiBhbnk7XHJcbiAgICBkZWxldGVCeUlkOiAocGFyYW1zOiBVbml0RXgpPT4gYW55O1xyXG59XHJcblxyXG5jbGFzcyBVbml0U2VydmljZSBpbXBsZW1lbnRzIElVbml0U2VydmljZSB7XHJcblxyXG4gICAgcHJpdmF0ZSAkaHR0cDogYW55O1xyXG4gICAgcHJpdmF0ZSBub3RpZnlGdW5jOihyZXM6IFJlc3BvbnNlUmVzdWx0PGFueT4pPT5SZXNwb25zZVJlc3VsdDxhbnk+O1xyXG5cclxuICAgIHNhdmUocGFyYW1zOiBVbml0RXgpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi91bml0L2FkZFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXNcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19CYXNlLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfQmFzZV9Vbml0LmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLkFkZC5jb2RlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuICAgIGVkaXQgKHBhcmFtczogVW5pdEV4KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi91bml0L3VwZGF0ZVwiLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXNcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19CYXNlLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfQmFzZV9Vbml0LmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLk1vZGlmeS5jb2RlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuICAgIGRlbGV0ZUJ5SWQgKHBhcmFtczogVW5pdEV4KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi91bml0L2RlbGV0ZVwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7aWQ6IHBhcmFtcy5JRH1cclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19CYXNlLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfQmFzZV9Vbml0LmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLkRlbC5jb2RlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuICAgIGRlbGV0ZUJ5SWRzIChpZHM6IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICBsZXQgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICBpZHM6aWRzXHJcbiAgICAgICAgfSA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi91bml0L2RlbGV0ZUJ5SWRzXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtc1xyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX0Jhc2UuY29kZSxcclxuICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuQmFzZUNvbmZpZ19CYXNlX1VuaXQuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuRGVsLmNvZGVcclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGdldCAoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL3VuaXQvZ2V0XCIsXHJcbiAgICAgICAgICAgIHBhcmFtczoge2lkOiBpZH1cclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuICAgIGZpbmRUYWJsZUxpc3QgKHBhcmFtczogVW5pdExpc3RQYXJhbXMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi91bml0L2ZpbmRMaXN0QnlQYXJhbXNcIixcclxuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXNcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuICAgIGZpbmRVbml0VHJlZUxpc3QoYXJlYUlkOiBzdHJpbmcpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvdW5pdC9maW5kVW5pdFRyZWVMaXN0XCIsXHJcbiAgICAgICAgICAgIHBhcmFtczoge1wiYXJlYUlkXCI6IGFyZWFJZH1cclxuICAgICAgICB9KS50aGVuKGNvbXBsZXRlKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVzOiBSZXNwb25zZVJlc3VsdDxBcnJheTxVbml0RXg+Pikge1xyXG4gICAgICAgICAgICBsZXQgZGF0YXM7XHJcbiAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YXMgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YXMgfHwgW107XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0aWMgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnJGh0dHAnLCdub3RpZnlGYWN0b3J5Jywnc3lzdGVtTG9nRmFjdG9yeSddO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCRodHRwOiBhbnksIG5vdGlmeUZhY3Rvcnk6IElSZXNwb25zZU5vdGlmeUZhY3RvcnkscHJpdmF0ZSBzeXN0ZW1Mb2dGYWN0b3J5OklTeXN0ZW1Mb2dGYWN0b3J5KSB7XHJcbiAgICAgICAgdGhpcy4kaHR0cCA9ICRodHRwO1xyXG4gICAgICAgIHRoaXMubm90aWZ5RnVuYyA9IG5vdGlmeUZhY3RvcnkubXNnKHtvbmx5U3VjY2VzczogdHJ1ZX0pO1xyXG4gICAgfTtcclxufVxyXG5cclxuYXBwLnNlcnZpY2UoJ3VuaXRTZXJ2aWNlJywgVW5pdFNlcnZpY2UpOyJdfQ==
