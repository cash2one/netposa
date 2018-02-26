define(["require", "exports", "../../common/app/main.app", "../../../core/entity/OperFirstModule", "../../../core/entity/OperSecondModule", "../../../core/entity/OperThirdModule", "../../../core/entity/OperActionType", "../factory/SystemLog.factory"], function (require, exports, main_app_1, OperFirstModule_1, OperSecondModule_1, OperThirdModule_1, OperActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LampService = (function () {
        function LampService($http, notifyFactory, systemLogFactory) {
            this.systemLogFactory = systemLogFactory;
            this.$http = $http;
            this.notifyFunc = notifyFactory.msg({ onlySuccess: true });
        }
        LampService.prototype.save = function (params) {
            return this.$http({
                method: "POST",
                url: "/db/lamp/add",
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Device.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Device_Lamp.code,
                ActionType: OperActionType_1.OperActionType.Add.code
            }));
        };
        ;
        LampService.prototype.edit = function (params) {
            return this.$http({
                method: "POST",
                url: "/db/lamp/update",
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Device.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Device_Lamp.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        ;
        LampService.prototype.deleteById = function (lamp) {
            return this.$http({
                method: "POST",
                url: "/db/lamp/deleteById",
                data: { id: lamp.ID }
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Device.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Device_Lamp.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        LampService.prototype.deleteByIds = function (ids) {
            var params = {
                ids: ids
            };
            return this.$http({
                method: "POST",
                url: "/db/lamp/deleteByIds",
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Device.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Device_Lamp.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        LampService.prototype.get = function (id) {
            return this.$http({
                method: "GET",
                url: "/db/lamp/get",
                params: { id: id }
            });
        };
        ;
        LampService.prototype.findDeviceListByID = function (params) {
            return this.$http({
                method: "GET",
                url: "/db/lamp/findDeviceListByID",
                params: params
            });
        };
        ;
        LampService.prototype.saveTheRalation = function (params) {
            return this.$http({
                method: "POST",
                url: "/db/lamp/saveTheRalation",
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Device.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Device_Lamp.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        ;
        LampService.prototype.findLampDeviceRelationById = function (id) {
            return this.$http({
                method: "GET",
                url: "/db/lamp/findLampDeviceRelationById",
                params: { id: id }
            });
        };
        ;
        LampService.prototype.findLampDeviceRelation = function () {
            return this.$http({
                method: "GET",
                url: "/db/lamp/findLampDeviceRelation"
            });
        };
        ;
        LampService.prototype.deleteLampAndDeviceRelation = function (ralation) {
            return this.$http({
                method: "POST",
                url: "/db/lamp/deleteLampAndDeviceRelation",
                params: ralation
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Device.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Device_Lamp.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        ;
        LampService.prototype.findSystemPoint = function () {
            return this.$http({
                method: "GET",
                url: "/db/lamp/findSystemPoint"
            });
        };
        ;
        LampService.prototype.findSystemPointById = function (id) {
            return this.$http({
                method: "GET",
                url: "/db/lamp/findSystemPointById",
                params: { id: id }
            });
        };
        ;
        LampService.prototype.updataLampSystemPoint = function (params) {
            return this.$http({
                method: "POST",
                url: "/db/lamp/updataLampSystemPoint",
                params: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Device.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Device_Lamp.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        ;
        LampService.$inject = ['$http', 'notifyFactory', 'systemLogFactory'];
        return LampService;
    }());
    main_app_1.app
        .service('lampService', LampService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL2xhbXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUF5Q0E7UUFxSUkscUJBQVksS0FBVSxFQUFFLGFBQXFDLEVBQVMsZ0JBQWtDO1lBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7WUFDcEcsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQXJJRCwwQkFBSSxHQUFKLFVBQUssTUFBWTtZQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEdBQUcsRUFBRSxjQUFjO2dCQUNuQixJQUFJLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztnQkFDdkMsZUFBZSxFQUFFLGlDQUFlLENBQUMsVUFBVSxDQUFDLElBQUk7Z0JBQ2hELGdCQUFnQixFQUFFLG1DQUFnQixDQUFDLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3pELGVBQWUsRUFBRSxpQ0FBZSxDQUFDLHNCQUFzQixDQUFDLElBQUk7Z0JBQzVELFVBQVUsRUFBRSwrQkFBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJO2FBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQztRQUFBLENBQUM7UUFDRiwwQkFBSSxHQUFKLFVBQUssTUFBWTtZQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEdBQUcsRUFBRSxpQkFBaUI7Z0JBQ3RCLElBQUksRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO2dCQUN2QyxlQUFl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O1FBQ04sQ0FBQztRQUFBLENBQUM7UUFDRix5Q0FBbUIsR0FBbkIsVUFBb0IsRUFBUztZQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsS0FBSztnQkFDYixHQUFHLEVBQUUsOEJBQThCO2dCQUNuQyxNQUFNLEVBQUUsRUFBQyxFQUFFLEVBQUUsRUFBRSxFQUFDO2FBQ25CLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFBQSxDQUFDO1FBQ0YsMkNBQXFCLEdBQXJCLFVBQXNCLE1BQWtCO1lBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEdBQUcsRUFBRSxnQ0FBZ0M7Z0JBQ3JDLE1BQU0sRUFBRSxNQUFNO2FBQ2pCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztnQkFDdkMsZUFBZSxFQUFFLGlDQUFlLENBQUMsVUFBVSxDQUFDLElBQUk7Z0JBQ2hELGdCQUFnQixFQUFFLG1DQUFnQixDQUFDLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3pELGVBQWUsRUFBRSxpQ0FBZSxDQUFDLHNCQUFzQixDQUFDLElBQUk7Z0JBQzVELFVBQVUsRUFBRSwrQkFBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJO2FBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQztRQUFBLENBQUM7UUFDSyxtQkFBTyxHQUFrQixDQUFDLE9BQU8sRUFBQyxlQUFlLEVBQUMsa0JBQWtCLENBQUMsQ0FBQztRQU9qRixrQkFBQztLQXpJRCxBQXlJQyxJQUFBO0lBRUQsY0FBRztTQUNFLE9BQU8sQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9zZXJ2aWNlcy9sYW1wLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBkZWxsIG9uIDIwMTcvMy8yOS5cclxuICovXHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQge0xhbXBFeH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0xhbXBFeFwiO1xyXG5pbXBvcnQge0xhbXB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9MYW1wXCI7XHJcbmltcG9ydCB7Q2FtZXJhRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9DYW1lcmFFeFwiO1xyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7VHJlZVBhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3RyZWUvVHJlZVBhcmFtc1wiO1xyXG5pbXBvcnQge0lEZWxldGVCeUlkc30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3JlcXVlc3QvUmVxdWVzdFBhcmFtc1wiO1xyXG5pbXBvcnQge0lSZXNwb25zZU5vdGlmeUZhY3Rvcnl9IGZyb20gXCIuLi9mYWN0b3J5L3Jlc3BvbnNlLm5vdGlmeS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7UmVsYXRpb25Db2wsIFJlbGF0aW9ufSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvRGV2aWNlUmVsYXRpb25cIjtcclxuaW1wb3J0IHtTZWFyY2hDYXNjYWRlTW9kZWx9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9TZWFyY2hDYXNjYWRlTW9kZWxcIjtcclxuaW1wb3J0IHtDYXNDYWRlU2VhcmNoUGFyYW1zfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2ZXIvQ2FzQ2FkZVNlYXJjaFBhcmFtc1wiO1xyXG5pbXBvcnQge1N5c3RlbVBvaW50fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvU3lzdGVtUG9pbnRcIjtcclxuXHJcbmltcG9ydCB7T3BlckZpdHN0TW9kdWxlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyRmlyc3RNb2R1bGUnO1xyXG5pbXBvcnQge09wZXJTZWNvbmRNb2R1bGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJTZWNvbmRNb2R1bGUnO1xyXG5pbXBvcnQge09wZXJUaGlyZE1vZHVsZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlclRoaXJkTW9kdWxlJztcclxuaW1wb3J0IHtPcGVyQWN0aW9uVHlwZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlckFjdGlvblR5cGUnO1xyXG5pbXBvcnQge0lTeXN0ZW1Mb2dGYWN0b3J5fSBmcm9tIFwiLi4vZmFjdG9yeS9TeXN0ZW1Mb2cuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi9mYWN0b3J5L1N5c3RlbUxvZy5mYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElMYW1wU2VydmljZSB7XHJcbiAgICBzYXZlOiAocGFyYW1zPzogTGFtcCk9PlByb21pc2U8YW55PjtcclxuICAgIGVkaXQ6IChwYXJhbXM/OiBMYW1wKT0+UHJvbWlzZTxhbnk+O1xyXG4gICAgZGVsZXRlQnlJZDogKGxhbXA6IExhbXApPT5Qcm9taXNlPGFueT47XHJcbiAgICBkZWxldGVCeUlkczogKGlkczpBcnJheTxzdHJpbmc+KT0+UHJvbWlzZTxhbnk+O1xyXG4gICAgZ2V0OiAoaWQ6IHN0cmluZyk9PlByb21pc2U8YW55PjtcclxuICAgIC8vIHVwZGF0ZUxhbXBXaXRoRGV2aWNlOiAobW9kZWw6YW55KT0+UHJvbWlzZTxhbnk+XHJcbiAgICBmaW5kRGV2aWNlTGlzdEJ5SUQ6KHBhcmFtczpBcnJheTxzdHJpbmc+KT0+UHJvbWlzZTxhbnk+O1xyXG4gICAgLy8gZ2V0TGFtcERldmljZVJlbGF0aW9uOihwYXJhbTogYW55KT0+YW55O1xyXG4gICAgc2F2ZVRoZVJhbGF0aW9uOihwYXJhbTogQXJyYXk8UmVsYXRpb24+KT0+UHJvbWlzZTxhbnk+XHJcbiAgICBmaW5kTGFtcERldmljZVJlbGF0aW9uQnlJZDogKGlkOiBzdHJpbmcpPT5Qcm9taXNlPGFueT47XHJcbiAgICBmaW5kTGFtcERldmljZVJlbGF0aW9uOiAoKT0+UHJvbWlzZTxhbnk+O1xyXG4gICAgZGVsZXRlTGFtcEFuZERldmljZVJlbGF0aW9uOiAocmFsYXRpb246UmVsYXRpb24pPT5Qcm9taXNlPGFueT47XHJcbiAgICBmaW5kU3lzdGVtUG9pbnQ6KCk9PlByb21pc2U8YW55PjtcclxuICAgIGZpbmRTeXN0ZW1Qb2ludEJ5SWQ6KGlkOnN0cmluZyk9PlByb21pc2U8YW55PjtcclxuICAgIHVwZGF0YUxhbXBTeXN0ZW1Qb2ludDoocGFyYW1zOlN5c3RlbVBvaW50KT0+UHJvbWlzZTxhbnk+O1xyXG59XHJcblxyXG5jbGFzcyBMYW1wU2VydmljZSBpbXBsZW1lbnRzIElMYW1wU2VydmljZSB7XHJcbiAgICBwcml2YXRlICRodHRwOiBhbnk7XHJcblxyXG4gICAgc2F2ZShwYXJhbXM6IExhbXApOlByb21pc2U8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL2xhbXAvYWRkXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtc1xyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX0RldmljZS5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX0RldmljZV9MYW1wLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLkFkZC5jb2RlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuICAgIGVkaXQocGFyYW1zOiBMYW1wKTpQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9sYW1wL3VwZGF0ZVwiLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXNcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19EZXZpY2UuY29kZSxcclxuICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuQmFzZUNvbmZpZ19EZXZpY2VfTGFtcC5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5Nb2RpZnkuY29kZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH07XHJcbiAgICBkZWxldGVCeUlkKGxhbXA6IExhbXApOlByb21pc2U8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL2xhbXAvZGVsZXRlQnlJZFwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7aWQ6IGxhbXAuSUR9XHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfRGV2aWNlLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfRGV2aWNlX0xhbXAuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuRGVsLmNvZGVcclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG4gICAgZGVsZXRlQnlJZHMoaWRzOkFycmF5PHN0cmluZz4pOlByb21pc2U8YW55PiB7XHJcbiAgICAgICAgbGV0IHBhcmFtczpJRGVsZXRlQnlJZHMgPSB7XHJcbiAgICAgICAgICAgIGlkczogaWRzXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvbGFtcC9kZWxldGVCeUlkc1wiLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXNcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19EZXZpY2UuY29kZSxcclxuICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuQmFzZUNvbmZpZ19EZXZpY2VfTGFtcC5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5EZWwuY29kZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH07XHJcbiAgICBnZXQoaWQ6IHN0cmluZyk6UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9sYW1wL2dldFwiLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHtpZDogaWR9XHJcbiAgICAgICAgfSlcclxuICAgIH07ICAgICAgICAgIFxyXG4gICAgZmluZERldmljZUxpc3RCeUlEKHBhcmFtczpBcnJheTxzdHJpbmc+KTpQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL2xhbXAvZmluZERldmljZUxpc3RCeUlEXCIsXHJcbiAgICAgICAgICAgIHBhcmFtczogcGFyYW1zXHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcbiAgICBzYXZlVGhlUmFsYXRpb24ocGFyYW1zOkFycmF5PFJlbGF0aW9uPik6UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvbGFtcC9zYXZlVGhlUmFsYXRpb25cIixcclxuICAgICAgICAgICAgZGF0YTogcGFyYW1zXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfRGV2aWNlLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfRGV2aWNlX0xhbXAuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuTW9kaWZ5LmNvZGVcclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG4gICAgZmluZExhbXBEZXZpY2VSZWxhdGlvbkJ5SWQoaWQ6c3RyaW5nKTpQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL2xhbXAvZmluZExhbXBEZXZpY2VSZWxhdGlvbkJ5SWRcIixcclxuICAgICAgICAgICAgcGFyYW1zOiB7aWQ6IGlkfVxyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG4gICAgZmluZExhbXBEZXZpY2VSZWxhdGlvbigpOlByb21pc2U8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvbGFtcC9maW5kTGFtcERldmljZVJlbGF0aW9uXCJcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuICAgIGRlbGV0ZUxhbXBBbmREZXZpY2VSZWxhdGlvbihyYWxhdGlvbjpSZWxhdGlvbik6UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvbGFtcC9kZWxldGVMYW1wQW5kRGV2aWNlUmVsYXRpb25cIixcclxuICAgICAgICAgICAgcGFyYW1zOiByYWxhdGlvblxyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX0RldmljZS5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX0RldmljZV9MYW1wLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLk1vZGlmeS5jb2RlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuICAgIGZpbmRTeXN0ZW1Qb2ludCgpOlByb21pc2U8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvbGFtcC9maW5kU3lzdGVtUG9pbnRcIlxyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG4gICAgZmluZFN5c3RlbVBvaW50QnlJZChpZDpzdHJpbmcpOlByb21pc2U8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvbGFtcC9maW5kU3lzdGVtUG9pbnRCeUlkXCIsXHJcbiAgICAgICAgICAgIHBhcmFtczoge2lkOiBpZH1cclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuICAgIHVwZGF0YUxhbXBTeXN0ZW1Qb2ludChwYXJhbXM6U3lzdGVtUG9pbnQpOlByb21pc2U8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL2xhbXAvdXBkYXRhTGFtcFN5c3RlbVBvaW50XCIsXHJcbiAgICAgICAgICAgIHBhcmFtczogcGFyYW1zXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfRGV2aWNlLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfRGV2aWNlX0xhbXAuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuTW9kaWZ5LmNvZGVcclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG4gICAgc3RhdGljICRpbmplY3Q6IEFycmF5PHN0cmluZz4gPSBbJyRodHRwJywnbm90aWZ5RmFjdG9yeScsJ3N5c3RlbUxvZ0ZhY3RvcnknXTtcclxuICAgIHByaXZhdGUgbm90aWZ5RnVuYzoocmVzOiBSZXNwb25zZVJlc3VsdDxhbnk+KT0+UmVzcG9uc2VSZXN1bHQ8YW55PjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigkaHR0cDogYW55LCBub3RpZnlGYWN0b3J5OiBJUmVzcG9uc2VOb3RpZnlGYWN0b3J5LHByaXZhdGUgc3lzdGVtTG9nRmFjdG9yeTpJU3lzdGVtTG9nRmFjdG9yeSkge1xyXG4gICAgICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcclxuICAgICAgICB0aGlzLm5vdGlmeUZ1bmMgPSBub3RpZnlGYWN0b3J5Lm1zZyh7b25seVN1Y2Nlc3M6IHRydWV9KTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwXHJcbiAgICAuc2VydmljZSgnbGFtcFNlcnZpY2UnLCBMYW1wU2VydmljZSk7Il19
