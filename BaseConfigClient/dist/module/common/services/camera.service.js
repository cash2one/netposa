define(["require", "exports", "../app/main.app", "../../../core/entity/OperFirstModule", "../../../core/entity/OperSecondModule", "../../../core/entity/OperThirdModule", "../../../core/entity/OperActionType", "../factory/response.notify.factory", "angular", "./casecade.service", "../factory/SystemLog.factory"], function (require, exports, main_app_1, OperFirstModule_1, OperSecondModule_1, OperThirdModule_1, OperActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CameraService = (function () {
        function CameraService($http, notifyFactory, systemLogFactory) {
            this.$http = $http;
            this.notifyFactory = notifyFactory;
            this.systemLogFactory = systemLogFactory;
            this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
        }
        CameraService.prototype.updateCameraAreaID = function (models) {
            return this.$http({
                method: 'post',
                url: '/db/camera/changeAreaId',
                data: models
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Device.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Device_Camera.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        CameraService.prototype.updateCameraLampID = function (models) {
            return this.$http({
                method: 'post',
                url: '/db/camera/changeLampId',
                data: models
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Device.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Device_Camera.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        CameraService.prototype.updateCameraType = function (models) {
            return this.$http({
                method: 'post',
                url: '/db/camera/changeCameraType',
                data: models
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Device.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Device_Camera.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        CameraService.prototype.findAll = function () {
            return this.$http({
                method: 'get',
                url: '/db/camera/findAllList'
            }).then(complete);
            function complete(res) {
                var arr = [];
                if (res && res.code === 200 && res.data) {
                    arr = res.data;
                }
                return arr;
            }
        };
        CameraService.prototype.delete = function (models) {
            return this.$http({
                method: 'post',
                url: '/db/camera/delete',
                data: { id: models.ID }
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Device.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Device_Camera.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            })).then(complete);
            function complete(res) {
                var arr = [];
                if (res && res.code === 200 && res.data) {
                    arr = res.data;
                }
                return arr;
            }
        };
        CameraService.prototype.edit = function (models) {
            return this.$http({
                method: 'post',
                url: '/db/camera/edit',
                data: models
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Device.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Device_Camera.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        CameraService.prototype.findLampTree = function () {
            return this.$http({
                method: 'get',
                url: '/db/area/findLampTreeWithCamera',
            }).then(complete);
            function complete(res) {
                var arr = [];
                if (res && res.code === 200 && res.data) {
                    arr = res.data;
                }
                return arr;
            }
        };
        CameraService.prototype.findPlayerForID = function (id) {
            return this.$http({
                method: 'post',
                url: '/db/camera/getPlayerInfoByID',
                data: { id: id }
            }).then(this.notifyFunc);
        };
        CameraService.$inject = ['$http', 'notifyFactory', 'systemLogFactory'];
        return CameraService;
    }());
    main_app_1.app
        .service('cameraService', CameraService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL2NhbWVyYS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQXFDQTtRQU1JLHVCQUFvQixLQUFlLEVBQVUsYUFBcUMsRUFBVSxnQkFBbUM7WUFBM0csVUFBSyxHQUFMLEtBQUssQ0FBVTtZQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUF3QjtZQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBbUI7WUFDM0gsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7UUFFRCwwQ0FBa0IsR0FBbEIsVUFBbUIsTUFBc0M7WUFDckQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsR0FBRyxFQUFFLHlCQUF5QjtnQkFDOUIsSUFBSSxFQUFFLE1BQU07YUFDZixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZDLGVBQWUsRUFBRSxpQ0FBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJO2dCQUNoRCxnQkFBZ0IsRUFBRSxtQ0FBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJO2dCQUN6RCxlQUFlLEVBQUUsaUNBQWUsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJO2dCQUM5RCxVQUFVLEVBQUUsK0JBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSTthQUN6QyxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUM7UUFFRCwwQ0FBa0IsR0FBbEIsVUFBbUIsTUFBc0M7WUFDckQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsR0FBRyxFQUFFLHlCQUF5QjtnQkFDOUIsSUFBSSxFQUFFLE1BQU07YUFDZixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFB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QUFFLGtCQUFrQixDQUFDLENBQUM7UUFxSGxGLG9CQUFDO0tBeEhELEFBd0hDLElBQUE7SUFFRCxjQUFHO1NBQ0UsT0FBTyxDQUFDLGVBQWUsRUFBRSxhQUFhLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3NlcnZpY2VzL2NhbWVyYS5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJUmVzcG9uc2VOb3RpZnlGYWN0b3J5fSBmcm9tIFwiLi4vZmFjdG9yeS9yZXNwb25zZS5ub3RpZnkuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi9mYWN0b3J5L3Jlc3BvbnNlLm5vdGlmeS5mYWN0b3J5XCI7XHJcbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTtcclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0ICdhbmd1bGFyJztcclxuaW1wb3J0IHtDYW1lcmFDaGFuZ2VBcmVhSURNb2RlbCwgQ2FtZXJhQ2hhbmdlQ2FtZXJhVHlwZX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL0NhbWVyYVBhcmFtc1wiO1xyXG5pbXBvcnQge0NhbWVyYX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L0NhbWVyYVwiO1xyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7Q2FtZXJhRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9DYW1lcmFFeFwiO1xyXG5pbXBvcnQgeyBMYW1wRXggfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9MYW1wRXgnO1xyXG5pbXBvcnQge0FyZWFFeH0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQXJlYUV4JztcclxuaW1wb3J0ICcuL2Nhc2VjYWRlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDYXNDYWRlU2VydmljZSB9IGZyb20gJy4vY2FzZWNhZGUuc2VydmljZSc7XHJcbmltcG9ydCB7IFByb21pc2UgfSBmcm9tICcuLi8uLi8uLi9AdHlwZXMvZXM2LXByb21pc2UvaW5kZXgnO1xyXG5cclxuXHJcbmltcG9ydCB7T3BlckZpdHN0TW9kdWxlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyRmlyc3RNb2R1bGUnO1xyXG5pbXBvcnQge09wZXJTZWNvbmRNb2R1bGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJTZWNvbmRNb2R1bGUnO1xyXG5pbXBvcnQge09wZXJUaGlyZE1vZHVsZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlclRoaXJkTW9kdWxlJztcclxuaW1wb3J0IHtPcGVyQWN0aW9uVHlwZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlckFjdGlvblR5cGUnO1xyXG5pbXBvcnQge0lTeXN0ZW1Mb2dGYWN0b3J5fSBmcm9tIFwiLi4vZmFjdG9yeS9TeXN0ZW1Mb2cuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi9mYWN0b3J5L1N5c3RlbUxvZy5mYWN0b3J5XCI7XHJcblxyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ2FtZXJhU2VydmljZSB7XHJcbiAgICBmaW5kQWxsKCk6IFByb21pc2U8QXJyYXk8Q2FtZXJhPj47XHJcbiAgICBkZWxldGUobW9kZWxzOiBDYW1lcmEpOlByb21pc2U8YW55PjtcclxuICAgIGVkaXQobW9kZWxzOiBDYW1lcmEpOlByb21pc2U8UmVzcG9uc2VSZXN1bHQ8Ym9vbGVhbj4+O1xyXG4gICAgdXBkYXRlQ2FtZXJhQXJlYUlEKG1vZGVsczogQXJyYXk8Q2FtZXJhQ2hhbmdlQXJlYUlETW9kZWw+KTpQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGJvb2xlYW4+PjtcclxuICAgIHVwZGF0ZUNhbWVyYUxhbXBJRChtb2RlbHM6IEFycmF5PENhbWVyYUNoYW5nZUFyZWFJRE1vZGVsPik6UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxib29sZWFuPj47XHJcbiAgICB1cGRhdGVDYW1lcmFUeXBlKG1vZGVsczogQXJyYXk8Q2FtZXJhQ2hhbmdlQ2FtZXJhVHlwZT4pOlByb21pc2U8UmVzcG9uc2VSZXN1bHQ8Ym9vbGVhbj4+O1xyXG4gICAgZmluZExhbXBUcmVlKCk6UHJvbWlzZTxhbnk+O1xyXG4gICAgZmluZFBsYXllckZvcklEKGlkOnN0cmluZyk6UHJvbWlzZTxhbnk+O1xyXG59XHJcblxyXG5jbGFzcyBDYW1lcmFTZXJ2aWNlIGltcGxlbWVudHMgSUNhbWVyYVNlcnZpY2Uge1xyXG5cclxuXHJcbiAgICBzdGF0aWMgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnJGh0dHAnLCdub3RpZnlGYWN0b3J5JywgJ3N5c3RlbUxvZ0ZhY3RvcnknXTtcclxuICAgIHByaXZhdGUgbm90aWZ5RnVuYzoocmVzOiBSZXNwb25zZVJlc3VsdDxhbnk+KT0+UmVzcG9uc2VSZXN1bHQ8YW55PjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBGdW5jdGlvbiwgcHJpdmF0ZSBub3RpZnlGYWN0b3J5OiBJUmVzcG9uc2VOb3RpZnlGYWN0b3J5LCBwcml2YXRlIHN5c3RlbUxvZ0ZhY3Rvcnk6IElTeXN0ZW1Mb2dGYWN0b3J5KSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZnlGdW5jID0gdGhpcy5ub3RpZnlGYWN0b3J5Lm1zZyh7b25seVN1Y2Nlc3M6IHRydWV9KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDYW1lcmFBcmVhSUQobW9kZWxzOiBBcnJheTxDYW1lcmFDaGFuZ2VBcmVhSURNb2RlbD4pOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGJvb2xlYW4+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgdXJsOiAnL2RiL2NhbWVyYS9jaGFuZ2VBcmVhSWQnLFxyXG4gICAgICAgICAgICBkYXRhOiBtb2RlbHNcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19EZXZpY2UuY29kZSxcclxuICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuQmFzZUNvbmZpZ19EZXZpY2VfQ2FtZXJhLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLk1vZGlmeS5jb2RlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNhbWVyYUxhbXBJRChtb2RlbHM6IEFycmF5PENhbWVyYUNoYW5nZUFyZWFJRE1vZGVsPik6UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxib29sZWFuPj57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgdXJsOiAnL2RiL2NhbWVyYS9jaGFuZ2VMYW1wSWQnLFxyXG4gICAgICAgICAgICBkYXRhOiBtb2RlbHNcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19EZXZpY2UuY29kZSxcclxuICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuQmFzZUNvbmZpZ19EZXZpY2VfQ2FtZXJhLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLk1vZGlmeS5jb2RlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNhbWVyYVR5cGUobW9kZWxzOiBBcnJheTxDYW1lcmFDaGFuZ2VDYW1lcmFUeXBlPil7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgdXJsOiAnL2RiL2NhbWVyYS9jaGFuZ2VDYW1lcmFUeXBlJyxcclxuICAgICAgICAgICAgZGF0YTogbW9kZWxzXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfRGV2aWNlLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfRGV2aWNlX0NhbWVyYS5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5Nb2RpZnkuY29kZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBmaW5kQWxsKCk6IFByb21pc2U8QXJyYXk8Q2FtZXJhPj4ge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgICAgIHVybDogJy9kYi9jYW1lcmEvZmluZEFsbExpc3QnXHJcbiAgICAgICAgfSkudGhlbihjb21wbGV0ZSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNvbXBsZXRlKHJlczogUmVzcG9uc2VSZXN1bHQ8QXJyYXk8Q2FtZXJhRXg+Pikge1xyXG4gICAgICAgICAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8Q2FtZXJhRXg+O1xyXG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy5jb2RlID09PSAyMDAgJiYgcmVzLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGFyciA9IHJlcy5kYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhcnI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGVsZXRlKG1vZGVsczpDYW1lcmEpOlByb21pc2U8YW55PnsgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgdXJsOiAnL2RiL2NhbWVyYS9kZWxldGUnLFxyXG4gICAgICAgICAgICBkYXRhOntpZDptb2RlbHMuSUR9XHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfRGV2aWNlLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfRGV2aWNlX0NhbWVyYS5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5EZWwuY29kZVxyXG4gICAgICAgIH0pKS50aGVuKGNvbXBsZXRlKTtcclxuICAgICAgICBmdW5jdGlvbiBjb21wbGV0ZShyZXM6IFJlc3BvbnNlUmVzdWx0PEFycmF5PENhbWVyYUV4Pj4pIHtcclxuICAgICAgICAgICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PENhbWVyYUV4PjtcclxuICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuY29kZSA9PT0gMjAwICYmIHJlcy5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGVkaXQobW9kZWxzOiBDYW1lcmEpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIHVybDogJy9kYi9jYW1lcmEvZWRpdCcsXHJcbiAgICAgICAgICAgIGRhdGE6bW9kZWxzXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfRGV2aWNlLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfRGV2aWNlX0NhbWVyYS5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5Nb2RpZnkuY29kZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBmaW5kTGFtcFRyZWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgICAgIHVybDogJy9kYi9hcmVhL2ZpbmRMYW1wVHJlZVdpdGhDYW1lcmEnLFxyXG4gICAgICAgIH0pLnRoZW4oY29tcGxldGUpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjb21wbGV0ZShyZXM6IFJlc3BvbnNlUmVzdWx0PEFycmF5PExhbXBFeCB8IEFyZWFFeD4+KSB7XHJcbiAgICAgICAgICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxMYW1wRXggfCBBcmVhRXg+O1xyXG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy5jb2RlID09PSAyMDAgJiYgcmVzLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGFyciA9IHJlcy5kYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhcnI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZmluZFBsYXllckZvcklEKGlkOnN0cmluZyl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgdXJsOiAnL2RiL2NhbWVyYS9nZXRQbGF5ZXJJbmZvQnlJRCcsXHJcbiAgICAgICAgICAgIGRhdGE6e2lkOmlkfVxyXG4gICAgICAgIH0pLnRoZW4odGhpcy5ub3RpZnlGdW5jKTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwXHJcbiAgICAuc2VydmljZSgnY2FtZXJhU2VydmljZScsIENhbWVyYVNlcnZpY2UpOyJdfQ==
