define(["require", "exports", "../app/main.app", "../../../core/entity/OperFirstModule", "../../../core/entity/OperSecondModule", "../../../core/entity/OperThirdModule", "../../../core/entity/OperActionType", "../factory/response.notify.factory", "angular", "../factory/SystemLog.factory"], function (require, exports, main_app_1, OperFirstModule_1, OperSecondModule_1, OperThirdModule_1, OperActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ElectronicFenceService = (function () {
        function ElectronicFenceService($http, notifyFactory, systemLogFactory) {
            this.$http = $http;
            this.notifyFactory = notifyFactory;
            this.systemLogFactory = systemLogFactory;
            this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
        }
        ElectronicFenceService.prototype.findElectronicfenceList = function (search) {
            return this.$http({
                method: "POST",
                url: "/db/area/findElectronicfenceList",
                params: { keyword: search }
            })
                .then(complete);
            function complete(res) {
                var arr = [];
                if (res && res.code === 200 && res.data) {
                    arr = res.data;
                }
                return arr;
            }
        };
        ElectronicFenceService.prototype.updateElectronicAreaID = function (models) {
            return this.$http({
                method: 'POST',
                url: '/db/ElectronicFence/changeAreaId',
                data: models
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Device.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Device_EFence.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        ElectronicFenceService.prototype.updateElectronicLampID = function (models) {
            return this.$http({
                method: 'POST',
                url: '/db/ElectronicFence/changeLampId',
                data: models
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Device.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Device_EFence.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        ElectronicFenceService.prototype.findAll = function () {
            return this.$http({
                method: 'get',
                url: '/db/ElectronicFence/findAllList'
            }).then(complete);
            function complete(res) {
                var arr = [];
                if (res && res.code === 200 && res.data) {
                    arr = res.data;
                }
                return arr;
            }
        };
        ElectronicFenceService.prototype.edit = function (models) {
            console.log("数据", models);
            return this.$http({
                method: 'post',
                url: '/db/ElectronicFence/edit',
                data: models
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Device.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Device_EFence.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        ElectronicFenceService.prototype.findLampTree = function () {
            return this.$http({
                method: 'get',
                url: '/db/area/findLampTreeWithElectronicfence',
            }).then(complete);
            function complete(res) {
                console.log(res);
                var arr = [];
                if (res && res.code === 200 && res.data) {
                    arr = res.data;
                }
                return arr;
            }
        };
        ElectronicFenceService.$inject = ['$http', 'notifyFactory', 'systemLogFactory'];
        return ElectronicFenceService;
    }());
    main_app_1.app
        .service('electronicfenceService', ElectronicFenceService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL2VsZWN0cm9uaWNmZW5jZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQStCQTtRQU1JLGdDQUFvQixLQUFlLEVBQVUsYUFBcUMsRUFBVSxnQkFBbUM7WUFBM0csVUFBSyxHQUFMLEtBQUssQ0FBVTtZQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUF3QjtZQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBbUI7WUFDM0gsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7UUFFRCx3REFBdUIsR0FBdkIsVUFBd0IsTUFBZTtZQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxHQUFHLEVBQUUsa0NBQWtDO2dCQUN2QyxNQUFNLEVBQUUsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDO2FBQzNCLENBQUM7aUJBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ2Ysa0JBQWtCLEdBQTZDO2dCQUMzRCxJQUFJLEdBQUcsR0FBRyxFQUE4QixDQUFDO2dCQUN6QyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3RDLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNuQixDQUFDO2dCQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDZixDQUFDO1FBQ0wsQ0FBQztRQUVELHVEQUFzQixHQUF0QixVQUF1QixNQUErQztZQUNsRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxHQUFHLEVBQUUsa0NBQWtDO2dCQUN2QyxJQUFJLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztnQkFDdkMsZUFBZSxFQUFFLGlDQUFlLENBQUMsVUFBVSxDQUFDLElBQUk7Z0JBQ2hELGdCQUFnQixFQUFFLG1DQUFnQixDQUFDLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3pELGVBQWUsRUFBRSxpQ0FBZSxDQUFDLHdCQUF3QixDQUFDLElBQUk7Z0JBQzlELFVBQVUsRUFBRSwrQkFBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJO2FBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQztRQUVELHVEQUFzQixHQUF0QixVQUF1QixNQUErQztZQUNsRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxHQUFHLEVBQUUsa0NBQWtDO2dCQUN2QyxJQUFJLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztnQkFDdkMsZUFBZSxFQUFFLGlDQUFlLENBQUMsVUFBVSxDQUFDLElBQUk7Z0JBQ2hELGdCQUFnQixFQUFFLG1DQUFnQixDQUFDLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3pELGVBQWUsRUFBRSxpQ0FBZSxDQUFDLHdCQUF3QixDQUFDLElBQUk7Z0JBQzlELFVBQVUsRUFBRSwrQkFBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJO2FBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQztRQUVBLHdDQUFPLEdBQVA7WUFFRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsS0FBSztnQkFDYixHQUFHLEVBQUUsaUNBQWlDO2FBQ3pDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFbEIsa0JBQWtCLEdBQTZDO2dCQUMzRCxJQUFJLEdBQUcsR0FBRyxFQUE4QixDQUFDO2dCQUN6QyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3RDLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNuQixDQUFDO2dCQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDZixDQUFDO1FBQ0wsQ0FBQztRQUdELHFDQUFJLEdBQUosVUFBSyxNQUF1QjtZQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBQyxNQUFNLENBQUMsQ0FBQTtZQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxHQUFHLEVBQUUsMEJBQTBCO2dCQUMvQixJQUFJLEVBQUMsTUFBTTthQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztnQkFDdkMsZUFBZSxFQUFFLGlDQUFlLENBQUMsVUFBVSxDQUFDLElBQUk7Z0JBQ2hELGdCQUFnQixFQUFFLG1DQUFnQixDQUFDLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3pELGVBQWUsRUFBRSxpQ0FBZSxDQUFDLHdCQUF3QixDQUFDLElBQUk7Z0JBQzlELFVBQVUsRUFBRSwrQkFBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJO2FBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQztRQUVELDZDQUFZLEdBQVo7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsS0FBSztnQkFDYixHQUFHLEVBQUUsMENBQTBDO2FBQ2xELENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFbEIsa0JBQWtCLEdBQTJDO2dCQUN6RCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUNoQixJQUFJLEdBQUcsR0FBRyxFQUE0QixDQUFDO2dCQUN2QyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3RDLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNuQixDQUFDO2dCQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDZixDQUFDO1FBQ0wsQ0FBQztRQTlGTSw4QkFBTyxHQUFrQixDQUFDLE9BQU8sRUFBQyxlQUFlLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQWdHbEYsNkJBQUM7S0FuR0QsQUFtR0MsSUFBQTtJQUVELGNBQUc7U0FDRSxPQUFPLENBQUMsd0JBQXdCLEVBQUUsc0JBQXNCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3NlcnZpY2VzL2VsZWN0cm9uaWNmZW5jZS5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJUmVzcG9uc2VOb3RpZnlGYWN0b3J5fSBmcm9tIFwiLi4vZmFjdG9yeS9yZXNwb25zZS5ub3RpZnkuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi9mYWN0b3J5L3Jlc3BvbnNlLm5vdGlmeS5mYWN0b3J5XCI7XHJcbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTtcclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0ICdhbmd1bGFyJztcclxuaW1wb3J0IHtFbGVjdHJvbmljRmVuY2VDaGFuZ2VBcmVhSURNb2RlbCwgRWxlY3Ryb25pY0ZlbmNlQ2hhbmdlRWxlY3Ryb25pY0ZlbmNlVHlwZX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL0VsZWN0cm9uaWNGZW5jZVBhcmFtc1wiO1xyXG5pbXBvcnQge0VsZWN0cm9uaWNGZW5jZX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L0VsZWN0cm9uaWNGZW5jZVwiO1xyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7RWxlY3Ryb25pY0ZlbmNlRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9FbGVjdHJvbmljRmVuY2VFeFwiO1xyXG5pbXBvcnQgeyBMYW1wRXggfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9MYW1wRXgnO1xyXG5pbXBvcnQge0FyZWFFeH0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQXJlYUV4JztcclxuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gJy4uLy4uLy4uL0B0eXBlcy9lczYtcHJvbWlzZS9pbmRleCc7XHJcblxyXG5pbXBvcnQge09wZXJGaXRzdE1vZHVsZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlckZpcnN0TW9kdWxlJztcclxuaW1wb3J0IHtPcGVyU2Vjb25kTW9kdWxlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyU2Vjb25kTW9kdWxlJztcclxuaW1wb3J0IHtPcGVyVGhpcmRNb2R1bGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJUaGlyZE1vZHVsZSc7XHJcbmltcG9ydCB7T3BlckFjdGlvblR5cGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJBY3Rpb25UeXBlJztcclxuaW1wb3J0IHtJU3lzdGVtTG9nRmFjdG9yeX0gZnJvbSBcIi4uL2ZhY3RvcnkvU3lzdGVtTG9nLmZhY3RvcnlcIjtcclxuaW1wb3J0IFwiLi4vZmFjdG9yeS9TeXN0ZW1Mb2cuZmFjdG9yeVwiO1xyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRWxlY3Ryb25pY0ZlbmNlU2VydmljZSB7XHJcbiAgICBmaW5kRWxlY3Ryb25pY2ZlbmNlTGlzdDooc2VhcmNoPzogc3RyaW5nKT0+IFByb21pc2U8QXJyYXk8RWxlY3Ryb25pY0ZlbmNlRXg+PjtcclxuICAgIGZpbmRBbGwoKTogUHJvbWlzZTxBcnJheTxFbGVjdHJvbmljRmVuY2U+PjtcclxuICAgIGVkaXQobW9kZWxzOiBFbGVjdHJvbmljRmVuY2UpOlByb21pc2U8UmVzcG9uc2VSZXN1bHQ8Ym9vbGVhbj4+O1xyXG4gICAgdXBkYXRlRWxlY3Ryb25pY0FyZWFJRChtb2RlbHM6IEFycmF5PEVsZWN0cm9uaWNGZW5jZUNoYW5nZUFyZWFJRE1vZGVsPik6UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxib29sZWFuPj47ICAgICBcclxuICAgIHVwZGF0ZUVsZWN0cm9uaWNMYW1wSUQobW9kZWxzOiBBcnJheTxFbGVjdHJvbmljRmVuY2VDaGFuZ2VBcmVhSURNb2RlbD4pOlByb21pc2U8UmVzcG9uc2VSZXN1bHQ8Ym9vbGVhbj4+OyBcclxuICAgIGZpbmRMYW1wVHJlZSgpOlByb21pc2U8YW55PjtcclxufVxyXG5cclxuY2xhc3MgRWxlY3Ryb25pY0ZlbmNlU2VydmljZSBpbXBsZW1lbnRzIElFbGVjdHJvbmljRmVuY2VTZXJ2aWNlIHtcclxuXHJcblxyXG4gICAgc3RhdGljICRpbmplY3Q6IEFycmF5PHN0cmluZz4gPSBbJyRodHRwJywnbm90aWZ5RmFjdG9yeScsICdzeXN0ZW1Mb2dGYWN0b3J5J107XHJcbiAgICBwcml2YXRlIG5vdGlmeUZ1bmM6KHJlczogUmVzcG9uc2VSZXN1bHQ8YW55Pik9PlJlc3BvbnNlUmVzdWx0PGFueT47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogRnVuY3Rpb24sIHByaXZhdGUgbm90aWZ5RmFjdG9yeTogSVJlc3BvbnNlTm90aWZ5RmFjdG9yeSwgcHJpdmF0ZSBzeXN0ZW1Mb2dGYWN0b3J5OiBJU3lzdGVtTG9nRmFjdG9yeSkge1xyXG4gICAgICAgIHRoaXMubm90aWZ5RnVuYyA9IHRoaXMubm90aWZ5RmFjdG9yeS5tc2coe29ubHlTdWNjZXNzOiB0cnVlfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZmluZEVsZWN0cm9uaWNmZW5jZUxpc3Qoc2VhcmNoPzogc3RyaW5nKXtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvYXJlYS9maW5kRWxlY3Ryb25pY2ZlbmNlTGlzdFwiLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHtrZXl3b3JkOnNlYXJjaH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKGNvbXBsZXRlKVxyXG4gICAgICAgIGZ1bmN0aW9uIGNvbXBsZXRlKHJlczogUmVzcG9uc2VSZXN1bHQ8QXJyYXk8RWxlY3Ryb25pY0ZlbmNlRXg+Pikge1xyXG4gICAgICAgICAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8RWxlY3Ryb25pY0ZlbmNlRXg+O1xyXG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy5jb2RlID09PSAyMDAgJiYgcmVzLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGFyciA9IHJlcy5kYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhcnI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/mm7TmlrDnlLXlm7TljLrln59JRFxyXG4gICAgdXBkYXRlRWxlY3Ryb25pY0FyZWFJRChtb2RlbHM6IEFycmF5PEVsZWN0cm9uaWNGZW5jZUNoYW5nZUFyZWFJRE1vZGVsPik6IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8Ym9vbGVhbj4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICB1cmw6ICcvZGIvRWxlY3Ryb25pY0ZlbmNlL2NoYW5nZUFyZWFJZCcsXHJcbiAgICAgICAgICAgIGRhdGE6IG1vZGVsc1xyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX0RldmljZS5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX0RldmljZV9FRmVuY2UuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuTW9kaWZ5LmNvZGVcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRWxlY3Ryb25pY0xhbXBJRChtb2RlbHM6IEFycmF5PEVsZWN0cm9uaWNGZW5jZUNoYW5nZUFyZWFJRE1vZGVsPik6IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8Ym9vbGVhbj4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICB1cmw6ICcvZGIvRWxlY3Ryb25pY0ZlbmNlL2NoYW5nZUxhbXBJZCcsXHJcbiAgICAgICAgICAgIGRhdGE6IG1vZGVsc1xyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX0RldmljZS5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX0RldmljZV9FRmVuY2UuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuTW9kaWZ5LmNvZGVcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgIGZpbmRBbGwoKTogUHJvbWlzZTxBcnJheTxFbGVjdHJvbmljRmVuY2U+PiB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICAgICAgdXJsOiAnL2RiL0VsZWN0cm9uaWNGZW5jZS9maW5kQWxsTGlzdCdcclxuICAgICAgICB9KS50aGVuKGNvbXBsZXRlKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVzOiBSZXNwb25zZVJlc3VsdDxBcnJheTxFbGVjdHJvbmljRmVuY2VFeD4+KSB7XHJcbiAgICAgICAgICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxFbGVjdHJvbmljRmVuY2VFeD47XHJcbiAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmNvZGUgPT09IDIwMCAmJiByZXMuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgYXJyID0gcmVzLmRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFycjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGVkaXQobW9kZWxzOiBFbGVjdHJvbmljRmVuY2Upe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5pWw5o2uXCIsbW9kZWxzKVxyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIHVybDogJy9kYi9FbGVjdHJvbmljRmVuY2UvZWRpdCcsXHJcbiAgICAgICAgICAgIGRhdGE6bW9kZWxzXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfRGV2aWNlLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfRGV2aWNlX0VGZW5jZS5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5Nb2RpZnkuY29kZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBmaW5kTGFtcFRyZWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgICAgIHVybDogJy9kYi9hcmVhL2ZpbmRMYW1wVHJlZVdpdGhFbGVjdHJvbmljZmVuY2UnLFxyXG4gICAgICAgIH0pLnRoZW4oY29tcGxldGUpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjb21wbGV0ZShyZXM6IFJlc3BvbnNlUmVzdWx0PEFycmF5PExhbXBFeCB8IEFyZWFFeD4+KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PExhbXBFeCB8IEFyZWFFeD47XHJcbiAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmNvZGUgPT09IDIwMCAmJiByZXMuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgYXJyID0gcmVzLmRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFycjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5cclxuYXBwXHJcbiAgICAuc2VydmljZSgnZWxlY3Ryb25pY2ZlbmNlU2VydmljZScsIEVsZWN0cm9uaWNGZW5jZVNlcnZpY2UpOyJdfQ==
