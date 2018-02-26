define(["require", "exports", "../app/main.app", "../../../core/entity/OperFirstModule", "../../../core/entity/OperSecondModule", "../../../core/entity/OperThirdModule", "../../../core/entity/OperActionType", "../factory/response.notify.factory", "angular", "./casecade.service", "../factory/SystemLog.factory"], function (require, exports, main_app_1, OperFirstModule_1, OperSecondModule_1, OperThirdModule_1, OperActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RmpgateService = (function () {
        function RmpgateService($http, notifyFactory, systemLogFactory) {
            this.$http = $http;
            this.notifyFactory = notifyFactory;
            this.systemLogFactory = systemLogFactory;
            this.$http = $http;
            this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
        }
        RmpgateService.prototype.updateRmpGateAreaID = function (models) {
            return this.$http({
                method: 'post',
                url: '/db/rmpgate/changeAreaId',
                data: models
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Device.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Device_RmpGate.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        RmpgateService.prototype.updateRmpGateLampID = function (models) {
            console.log("参数");
            console.log(models);
            return this.$http({
                method: 'post',
                url: '/db/rmpgate/changeLampId',
                data: models
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Device.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Device_RmpGate.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        RmpgateService.prototype.findAll = function () {
            return this.$http({
                method: 'get',
                url: '/db/rmpgate/findAllList'
            }).then(complete);
            function complete(res) {
                var arr = [];
                if (res && res.code === 200 && res.data) {
                    arr = res.data;
                }
                return arr;
            }
        };
        RmpgateService.prototype.edit = function (models) {
            return this.$http({
                method: 'post',
                url: '/db/rmpgate/edit',
                data: models
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Device.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Device_RmpGate.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        RmpgateService.prototype.findLampTree = function () {
            return this.$http({
                method: 'get',
                url: '/db/area/findLampTreeWithRmpGate',
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
        RmpgateService.$inject = ['$http', 'notifyFactory', 'systemLogFactory'];
        return RmpgateService;
    }());
    main_app_1.app
        .service('rmpgateService', RmpgateService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL3JtcGdhdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUErQkk7UUFJSSx3QkFBb0IsS0FBZSxFQUFVLGFBQXFDLEVBQVUsZ0JBQW1DO1lBQTNHLFVBQUssR0FBTCxLQUFLLENBQVU7WUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBd0I7WUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW1CO1lBQzNILElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1lBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUNsRSxDQUFDO1FBRUwsNENBQW1CLEdBQW5CLFVBQW9CLE1BQXVDO1lBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEdBQUcsRUFBRSwwQkFBMEI7Z0JBQy9CLElBQUksRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO2dCQUN2QyxlQUFlLEVBQUUsaUNBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSTtnQkFDaEQsZ0JBQWdCLEVBQUUsbUNBQWdCLENBQUMsaUJBQWlCLENBQUMsSUFBSTtnQkFDekQsZUFBZSxFQUFFLGlDQUFlLENBQUMseUJBQXlCLENBQUMsSUFBSTtnQkFDL0QsVUFBVSxFQUFFLCtCQUFjLENBQUMsTUFBTSxDQUFDLElBQUk7YUFDekMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDO1FBRUQsNENBQW1CLEdBQW5CLFVBQW9CLE1BQXVDO1lBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxHQUFHLEVBQUUsMEJBQTBCO2dCQUMvQixJQUFJLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztnQkFDdkMsZUFBZSxFQUFFLGlDQUFlLENBQUMsVUFBVSxDQUFDLElBQUk7Z0JBQ2hELGdCQUFnQixFQUFFLG1DQUFnQixDQUFDLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3pELGVBQWUsRUFBRSxpQ0FBZSxDQUFDLHlCQUF5QixDQUFDLElBQUk7Z0JBQy9ELFVBQVUsRUFBRSwrQkFBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJO2FBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQztRQUVELGdDQUFPLEdBQVA7WUFFSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsS0FBSztnQkFDYixHQUFHLEVBQUUseUJBQXlCO2FBQ2pDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFbEIsa0JBQWtCLEdBQXFDO2dCQUNuRCxJQUFJLEdBQUcsR0FBRyxFQUFzQixDQUFDO2dCQUNqQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3RDLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNuQixDQUFDO2dCQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDZixDQUFDO1FBQ0wsQ0FBQztRQUdELDZCQUFJLEdBQUosVUFBSyxNQUFlO1lBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEdBQUcsRUFBRSxrQkFBa0I7Z0JBQ3ZCLElBQUksRUFBQyxNQUFNO2FBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO2dCQUN2QyxlQUFlLEVBQUUsaUNBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSTtnQkFDaEQsZ0JBQWdCLEVBQUUsbUNBQWdCLENBQUMsaUJBQWlCLENBQUMsSUFBSTtnQkFDekQsZUFBZSxFQUFFLGlDQUFlLENBQUMseUJBQXlCLENBQUMsSUFBSTtnQkFDL0QsVUFBVSxFQUFFLCtCQUFjLENBQUMsTUFBTSxDQUFDLElBQUk7YUFDekMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDO1FBRUQscUNBQVksR0FBWjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxLQUFLO2dCQUNiLEdBQUcsRUFBRSxrQ0FBa0M7YUFDMUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVsQixrQkFBa0IsR0FBMkM7Z0JBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ2hCLElBQUksR0FBRyxHQUFHLEVBQTRCLENBQUM7Z0JBQ3ZDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDdEMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ25CLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNmLENBQUM7UUFDTCxDQUFDO1FBaEZVLHNCQUFPLEdBQWtCLENBQUMsT0FBTyxFQUFDLGVBQWUsRUFBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBa0ZyRixxQkFBQztLQW5GRyxBQW1GSCxJQUFBO0lBRUQsY0FBRztTQUNFLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3NlcnZpY2VzL3JtcGdhdGUuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVJlc3BvbnNlTm90aWZ5RmFjdG9yeX0gZnJvbSBcIi4uL2ZhY3RvcnkvcmVzcG9uc2Uubm90aWZ5LmZhY3RvcnlcIjtcclxuaW1wb3J0IFwiLi4vZmFjdG9yeS9yZXNwb25zZS5ub3RpZnkuZmFjdG9yeVwiO1xyXG5kZWNsYXJlIHZhciByZXF1aXJlOiBhbnk7XHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnYW5ndWxhcic7XHJcbmltcG9ydCB7Um1wR2F0ZUNoYW5nZUFyZWFJRE1vZGVsfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvUm1wZ2F0ZVBhcmFtc1wiO1xyXG5pbXBvcnQge1JtcEdhdGV9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9SbXBnYXRlXCI7XHJcbmltcG9ydCB7UmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHtSbXBHYXRlRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9SbXBHYXRlRXhcIjtcclxuaW1wb3J0IHsgTGFtcEV4IH0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvTGFtcEV4JztcclxuaW1wb3J0IHtBcmVhRXh9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0FyZWFFeCc7XHJcbmltcG9ydCAnLi9jYXNlY2FkZS5zZXJ2aWNlJztcclxuXHJcblxyXG5pbXBvcnQge09wZXJGaXRzdE1vZHVsZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlckZpcnN0TW9kdWxlJztcclxuaW1wb3J0IHtPcGVyU2Vjb25kTW9kdWxlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyU2Vjb25kTW9kdWxlJztcclxuaW1wb3J0IHtPcGVyVGhpcmRNb2R1bGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJUaGlyZE1vZHVsZSc7XHJcbmltcG9ydCB7T3BlckFjdGlvblR5cGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJBY3Rpb25UeXBlJztcclxuaW1wb3J0IHtJU3lzdGVtTG9nRmFjdG9yeX0gZnJvbSBcIi4uL2ZhY3RvcnkvU3lzdGVtTG9nLmZhY3RvcnlcIjtcclxuaW1wb3J0IFwiLi4vZmFjdG9yeS9TeXN0ZW1Mb2cuZmFjdG9yeVwiO1xyXG5cclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55O1xyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJtcEdhdGVTZXJ2aWNlIHtcclxuICAgIGZpbmRBbGwoKTogUHJvbWlzZTxBcnJheTxSbXBHYXRlPj47XHJcbiAgICB1cGRhdGVSbXBHYXRlQXJlYUlEKG1vZGVsczogQXJyYXk8Um1wR2F0ZUNoYW5nZUFyZWFJRE1vZGVsPik6UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxib29sZWFuPj47XHJcbiAgICB1cGRhdGVSbXBHYXRlTGFtcElEKG1vZGVsczogQXJyYXk8Um1wR2F0ZUNoYW5nZUFyZWFJRE1vZGVsPik6UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxib29sZWFuPj47XHJcbiAgICBlZGl0KG1vZGVsczogUm1wR2F0ZSk6UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxib29sZWFuPj47XHJcbiAgICBmaW5kTGFtcFRyZWUoKTpQcm9taXNlPGFueT47XHJcbn1cclxuICAgIGNsYXNzIFJtcGdhdGVTZXJ2aWNlIGltcGxlbWVudHMgSVJtcEdhdGVTZXJ2aWNlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnJGh0dHAnLCdub3RpZnlGYWN0b3J5Jywnc3lzdGVtTG9nRmFjdG9yeSddO1xyXG4gICAgICAgIHByaXZhdGUgbm90aWZ5RnVuYzoocmVzOiBSZXNwb25zZVJlc3VsdDxhbnk+KT0+UmVzcG9uc2VSZXN1bHQ8YW55PjtcclxuICAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IEZ1bmN0aW9uLCBwcml2YXRlIG5vdGlmeUZhY3Rvcnk6IElSZXNwb25zZU5vdGlmeUZhY3RvcnksIHByaXZhdGUgc3lzdGVtTG9nRmFjdG9yeTogSVN5c3RlbUxvZ0ZhY3RvcnkpIHtcclxuICAgICAgICAgICAgdGhpcy4kaHR0cCA9ICRodHRwXHJcbiAgICAgICAgICAgIHRoaXMubm90aWZ5RnVuYyA9IHRoaXMubm90aWZ5RmFjdG9yeS5tc2coe29ubHlTdWNjZXNzOiB0cnVlfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgdXBkYXRlUm1wR2F0ZUFyZWFJRChtb2RlbHM6IEFycmF5PFJtcEdhdGVDaGFuZ2VBcmVhSURNb2RlbD4pOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGJvb2xlYW4+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgdXJsOiAnL2RiL3JtcGdhdGUvY2hhbmdlQXJlYUlkJyxcclxuICAgICAgICAgICAgZGF0YTogbW9kZWxzXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfRGV2aWNlLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfRGV2aWNlX1JtcEdhdGUuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuTW9kaWZ5LmNvZGVcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwZGF0ZVJtcEdhdGVMYW1wSUQobW9kZWxzOiBBcnJheTxSbXBHYXRlQ2hhbmdlQXJlYUlETW9kZWw+KTogUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxib29sZWFuPj4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5Y+C5pWwXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG1vZGVscylcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICB1cmw6ICcvZGIvcm1wZ2F0ZS9jaGFuZ2VMYW1wSWQnLFxyXG4gICAgICAgICAgICBkYXRhOiBtb2RlbHNcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19EZXZpY2UuY29kZSxcclxuICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuQmFzZUNvbmZpZ19EZXZpY2VfUm1wR2F0ZS5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5Nb2RpZnkuY29kZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBmaW5kQWxsKCk6IFByb21pc2U8QXJyYXk8Um1wR2F0ZT4+IHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgICAgICAgICB1cmw6ICcvZGIvcm1wZ2F0ZS9maW5kQWxsTGlzdCdcclxuICAgICAgICB9KS50aGVuKGNvbXBsZXRlKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVzOiBSZXNwb25zZVJlc3VsdDxBcnJheTxSbXBHYXRlRXg+Pikge1xyXG4gICAgICAgICAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8Um1wR2F0ZUV4PjtcclxuICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuY29kZSA9PT0gMjAwICYmIHJlcy5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgZWRpdChtb2RlbHM6IFJtcEdhdGUpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIHVybDogJy9kYi9ybXBnYXRlL2VkaXQnLFxyXG4gICAgICAgICAgICBkYXRhOm1vZGVsc1xyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX0RldmljZS5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX0RldmljZV9SbXBHYXRlLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLk1vZGlmeS5jb2RlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmRMYW1wVHJlZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICAgICAgdXJsOiAnL2RiL2FyZWEvZmluZExhbXBUcmVlV2l0aFJtcEdhdGUnLFxyXG4gICAgICAgIH0pLnRoZW4oY29tcGxldGUpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjb21wbGV0ZShyZXM6IFJlc3BvbnNlUmVzdWx0PEFycmF5PExhbXBFeCB8IEFyZWFFeD4+KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PExhbXBFeCB8IEFyZWFFeD47XHJcbiAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmNvZGUgPT09IDIwMCAmJiByZXMuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgYXJyID0gcmVzLmRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFycjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5hcHBcclxuICAgIC5zZXJ2aWNlKCdybXBnYXRlU2VydmljZScsIFJtcGdhdGVTZXJ2aWNlKTsiXX0=
