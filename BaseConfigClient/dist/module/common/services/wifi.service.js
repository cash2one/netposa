define(["require", "exports", "../app/main.app", "../../../core/entity/OperFirstModule", "../../../core/entity/OperSecondModule", "../../../core/entity/OperThirdModule", "../../../core/entity/OperActionType", "../factory/response.notify.factory", "angular", "./casecade.service", "../factory/SystemLog.factory"], function (require, exports, main_app_1, OperFirstModule_1, OperSecondModule_1, OperThirdModule_1, OperActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WifiService = (function () {
        function WifiService($http, notifyFactory, systemLogFactory) {
            this.$http = $http;
            this.notifyFactory = notifyFactory;
            this.systemLogFactory = systemLogFactory;
            this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
        }
        WifiService.prototype.updateWifiAreaID = function (models) {
            return this.$http({
                method: 'post',
                url: '/db/wifi/changeAreaId',
                data: models
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Device.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Device_WiFi.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        WifiService.prototype.updateWifiLampID = function (models) {
            return this.$http({
                method: 'post',
                url: '/db/wifi/changeLampId',
                data: models
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Device.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Device_WiFi.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        WifiService.prototype.findAll = function () {
            return this.$http({
                method: 'get',
                url: '/db/wifi/findAllList'
            }).then(complete);
            function complete(res) {
                console.log(res.data);
                var arr = [];
                if (res && res.code === 200 && res.data) {
                    arr = res.data;
                }
                return arr;
            }
        };
        WifiService.prototype.edit = function (models) {
            return this.$http({
                method: 'post',
                url: '/db/wifi/edit',
                data: models
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Device.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Device_WiFi.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        WifiService.prototype.findLampTree = function () {
            return this.$http({
                method: 'get',
                url: '/db/area/findLampTreeWithWifi',
            }).then(complete);
            function complete(res) {
                var arr = [];
                if (res && res.code === 200 && res.data) {
                    arr = res.data;
                }
                return arr;
            }
        };
        WifiService.prototype.findWifiList = function (search) {
            return this.$http({
                method: "POST",
                url: "/db/area/findWifiList",
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
        WifiService.$inject = ['$http', 'notifyFactory', 'systemLogFactory'];
        return WifiService;
    }());
    main_app_1.app
        .service('wifiService', WifiService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL3dpZmkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFtQ0E7UUFNSSxxQkFBb0IsS0FBZSxFQUFVLGFBQXFDLEVBQVUsZ0JBQW1DO1lBQTNHLFVBQUssR0FBTCxLQUFLLENBQVU7WUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBd0I7WUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW1CO1lBQzNILElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUNsRSxDQUFDO1FBRUQsc0NBQWdCLEdBQWhCLFVBQWlCLE1BQW9DO1lBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEdBQUcsRUFBRSx1QkFBdUI7Z0JBQzVCLElBQUksRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO2dCQUN2QyxlQUFlLEVBQUUsaUNBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSTtnQkFDaEQsZ0JBQWdCLEVBQUUsbUNBQWdCLENBQUMsaUJBQWlCLENBQUMsSUFBSTtnQkFDekQsZUFBZSxFQUFFLGlDQUFlLENBQUMsc0JBQXNCLENBQUMsSUFBSTtnQkFDNUQsVUFBVSxFQUFFLCtCQUFjLENBQUMsTUFBTSxDQUFDLElBQUk7YUFDekMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDO1FBRUQsc0NBQWdCLEdBQWhCLFVBQWlCLE1BQW9DO1lBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEdBQUcsRUFBRSx1QkFBdUI7Z0JBQzVCLElBQUksRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdC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QztnQkFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ2YsQ0FBQztRQUNMLENBQUM7UUE1Rk0sbUJBQU8sR0FBa0IsQ0FBQyxPQUFPLEVBQUMsZUFBZSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUErRmxGLGtCQUFDO0tBbEdELEFBa0dDLElBQUE7SUFFRCxjQUFHO1NBQ0UsT0FBTyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3NlcnZpY2VzL3dpZmkuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuaW1wb3J0IHtJUmVzcG9uc2VOb3RpZnlGYWN0b3J5fSBmcm9tIFwiLi4vZmFjdG9yeS9yZXNwb25zZS5ub3RpZnkuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi9mYWN0b3J5L3Jlc3BvbnNlLm5vdGlmeS5mYWN0b3J5XCI7XHJcbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTtcclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0ICdhbmd1bGFyJztcclxuaW1wb3J0IHtXaWZpQ2hhbmdlQXJlYUlETW9kZWx9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9XaWZpUGFyYW1zXCI7XHJcbmltcG9ydCB7V2lmaX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L1dpZmlcIjtcclxuaW1wb3J0IHtSZXNwb25zZVJlc3VsdH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5pbXBvcnQge1dpZmlFeH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L1dpZmlFeFwiO1xyXG5pbXBvcnQgeyBMYW1wRXggfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9MYW1wRXgnO1xyXG5pbXBvcnQge0FyZWFFeH0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQXJlYUV4JztcclxuaW1wb3J0ICcuL2Nhc2VjYWRlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDYXNDYWRlU2VydmljZSB9IGZyb20gJy4vY2FzZWNhZGUuc2VydmljZSc7XHJcbmltcG9ydCB7IFByb21pc2UgfSBmcm9tICcuLi8uLi8uLi9AdHlwZXMvZXM2LXByb21pc2UvaW5kZXgnO1xyXG5cclxuaW1wb3J0IHtPcGVyRml0c3RNb2R1bGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJGaXJzdE1vZHVsZSc7XHJcbmltcG9ydCB7T3BlclNlY29uZE1vZHVsZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlclNlY29uZE1vZHVsZSc7XHJcbmltcG9ydCB7T3BlclRoaXJkTW9kdWxlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyVGhpcmRNb2R1bGUnO1xyXG5pbXBvcnQge09wZXJBY3Rpb25UeXBlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyQWN0aW9uVHlwZSc7XHJcbmltcG9ydCB7SVN5c3RlbUxvZ0ZhY3Rvcnl9IGZyb20gXCIuLi9mYWN0b3J5L1N5c3RlbUxvZy5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uL2ZhY3RvcnkvU3lzdGVtTG9nLmZhY3RvcnlcIjtcclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVdpZmlTZXJ2aWNlIHtcclxuICAgIGZpbmRBbGwoKTogUHJvbWlzZTxBcnJheTxXaWZpPj47XHJcbiAgICBlZGl0KG1vZGVsczogV2lmaSk6UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxib29sZWFuPj47XHJcbiAgICB1cGRhdGVXaWZpQXJlYUlEKG1vZGVsczogQXJyYXk8V2lmaUNoYW5nZUFyZWFJRE1vZGVsPik6UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxib29sZWFuPj47XHJcbiAgICB1cGRhdGVXaWZpTGFtcElEKG1vZGVsczogQXJyYXk8V2lmaUNoYW5nZUFyZWFJRE1vZGVsPik6UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxib29sZWFuPj47XHJcbiAgICBmaW5kTGFtcFRyZWUoKTpQcm9taXNlPGFueT47XHJcbiAgICBmaW5kV2lmaUxpc3Q6KHNlYXJjaD86IHN0cmluZyk9PiBQcm9taXNlPEFycmF5PFdpZmlFeD4+O1xyXG59XHJcblxyXG5jbGFzcyBXaWZpU2VydmljZSBpbXBsZW1lbnRzIElXaWZpU2VydmljZSB7XHJcblxyXG5cclxuICAgIHN0YXRpYyAkaW5qZWN0OiBBcnJheTxzdHJpbmc+ID0gWyckaHR0cCcsJ25vdGlmeUZhY3RvcnknLCAnc3lzdGVtTG9nRmFjdG9yeSddO1xyXG4gICAgcHJpdmF0ZSBub3RpZnlGdW5jOihyZXM6IFJlc3BvbnNlUmVzdWx0PGFueT4pPT5SZXNwb25zZVJlc3VsdDxhbnk+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IEZ1bmN0aW9uLCBwcml2YXRlIG5vdGlmeUZhY3Rvcnk6IElSZXNwb25zZU5vdGlmeUZhY3RvcnksIHByaXZhdGUgc3lzdGVtTG9nRmFjdG9yeTogSVN5c3RlbUxvZ0ZhY3RvcnkpIHtcclxuICAgICAgICB0aGlzLm5vdGlmeUZ1bmMgPSB0aGlzLm5vdGlmeUZhY3RvcnkubXNnKHtvbmx5U3VjY2VzczogdHJ1ZX0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVdpZmlBcmVhSUQobW9kZWxzOiBBcnJheTxXaWZpQ2hhbmdlQXJlYUlETW9kZWw+KTogUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxib29sZWFuPj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIHVybDogJy9kYi93aWZpL2NoYW5nZUFyZWFJZCcsXHJcbiAgICAgICAgICAgIGRhdGE6IG1vZGVsc1xyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX0RldmljZS5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX0RldmljZV9XaUZpLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLk1vZGlmeS5jb2RlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVdpZmlMYW1wSUQobW9kZWxzOiBBcnJheTxXaWZpQ2hhbmdlQXJlYUlETW9kZWw+KTogUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxib29sZWFuPj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIHVybDogJy9kYi93aWZpL2NoYW5nZUxhbXBJZCcsXHJcbiAgICAgICAgICAgIGRhdGE6IG1vZGVsc1xyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX0RldmljZS5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX0RldmljZV9XaUZpLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLk1vZGlmeS5jb2RlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmRBbGwoKTogUHJvbWlzZTxBcnJheTxXaWZpPj4ge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgICAgIHVybDogJy9kYi93aWZpL2ZpbmRBbGxMaXN0J1xyXG4gICAgICAgIH0pLnRoZW4oY29tcGxldGUpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjb21wbGV0ZShyZXM6IFJlc3BvbnNlUmVzdWx0PEFycmF5PFdpZmlFeD4+KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PFdpZmlFeD47XHJcbiAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmNvZGUgPT09IDIwMCAmJiByZXMuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgYXJyID0gcmVzLmRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFycjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGVkaXQobW9kZWxzOiBXaWZpKXtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICB1cmw6ICcvZGIvd2lmaS9lZGl0JyxcclxuICAgICAgICAgICAgZGF0YTptb2RlbHNcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19EZXZpY2UuY29kZSxcclxuICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuQmFzZUNvbmZpZ19EZXZpY2VfV2lGaS5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5Nb2RpZnkuY29kZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBmaW5kTGFtcFRyZWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgICAgIHVybDogJy9kYi9hcmVhL2ZpbmRMYW1wVHJlZVdpdGhXaWZpJyxcclxuICAgICAgICB9KS50aGVuKGNvbXBsZXRlKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVzOiBSZXNwb25zZVJlc3VsdDxBcnJheTxMYW1wRXggfCBBcmVhRXggfCBXaWZpRXg+Pikge1xyXG4gICAgICAgICAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8TGFtcEV4IHwgQXJlYUV4IHwgV2lmaUV4PjtcclxuICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuY29kZSA9PT0gMjAwICYmIHJlcy5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZpbmRXaWZpTGlzdChzZWFyY2g/OiBzdHJpbmcpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9hcmVhL2ZpbmRXaWZpTGlzdFwiLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHtrZXl3b3JkOnNlYXJjaH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKGNvbXBsZXRlKVxyXG4gICAgICAgIGZ1bmN0aW9uIGNvbXBsZXRlKHJlczogUmVzcG9uc2VSZXN1bHQ8QXJyYXk8V2lmaUV4Pj4pIHtcclxuICAgICAgICAgICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PFdpZmlFeD47XHJcbiAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmNvZGUgPT09IDIwMCAmJiByZXMuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgYXJyID0gcmVzLmRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFycjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbn1cclxuXHJcbmFwcFxyXG4gICAgLnNlcnZpY2UoJ3dpZmlTZXJ2aWNlJywgV2lmaVNlcnZpY2UpOyJdfQ==
