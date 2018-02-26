define(["require", "exports", "../app/main.app", "angular", "../services/camera.service", "../services/wifi.service", "../services/electronicfence.service", "../services/rmpgate.service", "./HandleStorage.factory", "../services/map.service"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var diviceCacheService = (function () {
        function diviceCacheService($http, cameraservice, wifiService, electronicfenceService, rmpgateService, handleStorage, mapService) {
            this.$http = $http;
            this.cameraservice = cameraservice;
            this.wifiService = wifiService;
            this.electronicfenceService = electronicfenceService;
            this.rmpgateService = rmpgateService;
            this.handleStorage = handleStorage;
            this.mapService = mapService;
        }
        diviceCacheService.prototype.isCache = function (deviceType) {
            return sessionStorage.getItem(deviceType);
        };
        diviceCacheService.prototype.getAllCameraList = function (isCache) {
            var _this = this;
            if (!this.isCache('cameraCache')) {
                this.cameraservice.findAll().then(function (res) {
                    if (res && isCache) {
                        _this.handleStorage.setSessionStorageData('cameraCache', res);
                    }
                    else {
                        return res;
                    }
                });
            }
            else if (!isCache) {
                return this.getDeviceCache('cameraCache');
            }
        };
        diviceCacheService.prototype.getAllRmpgateList = function (isCache) {
            var _this = this;
            if (!this.isCache('rmpgateCache')) {
                this.rmpgateService.findAll().then(function (res) {
                    if (res && isCache) {
                        _this.handleStorage.setSessionStorageData('rmpgateCache', res);
                    }
                    else {
                        return res;
                    }
                });
            }
            else if (!isCache) {
                return this.getDeviceCache('rmpgateCache');
            }
        };
        diviceCacheService.prototype.getAllWifiList = function (isCache) {
            var _this = this;
            if (!this.isCache('wifiCache')) {
                this.wifiService.findAll().then(function (res) {
                    if (res && isCache) {
                        _this.handleStorage.setSessionStorageData('wifiCache', res);
                    }
                    else {
                        return res;
                    }
                });
            }
            else if (!isCache) {
                return this.getDeviceCache('wifiCache');
            }
        };
        diviceCacheService.prototype.getAllEleList = function (isCache) {
            var _this = this;
            if (!this.isCache('eleCache')) {
                this.electronicfenceService.findAll().then(function (res) {
                    if (res && isCache) {
                        _this.handleStorage.setSessionStorageData('eleCache', res);
                    }
                    else {
                        return res;
                    }
                });
            }
            else if (!isCache) {
                return this.getDeviceCache('eleCache');
            }
        };
        diviceCacheService.prototype.getAllDevice = function () {
            var isCache = true;
            this.getAllCameraList(isCache);
            this.getAllRmpgateList(isCache);
            this.getAllWifiList(isCache);
            this.getAllEleList(isCache);
        };
        ;
        diviceCacheService.prototype.getDeviceCache = function (deviceName) {
            if (sessionStorage.getItem(deviceName)) {
                return this.handleStorage.getSessionStorageData(deviceName);
            }
            else {
                var result = void 0;
                switch (deviceName) {
                    case 'cameraCache':
                        result = this.getAllCameraList(false);
                        break;
                    case 'rmpgateCache':
                        result = this.getAllRmpgateList(false);
                        break;
                    case 'wifiCache':
                        result = this.getAllWifiList(false);
                        break;
                    case 'eleCache':
                        result = this.getAllEleList(false);
                        break;
                }
                return result;
            }
        };
        diviceCacheService.$inject = ['$http', 'cameraService', 'wifiService', 'electronicfenceService', 'rmpgateService', 'handleStorage', 'mapService'];
        return diviceCacheService;
    }());
    main_app_1.app.service('deviceCacheServer', diviceCacheService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2ZhY3RvcnkvZGV2aWNlQ2FjaGUuZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUE2QkE7UUFFSSw0QkFBcUIsS0FBUyxFQUFVLGFBQTRCLEVBQVMsV0FBeUIsRUFBUyxzQkFBK0MsRUFBVSxjQUErQixFQUFVLGFBQWlCLEVBQVUsVUFBdUI7WUFBOU8sVUFBSyxHQUFMLEtBQUssQ0FBSTtZQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1lBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQWM7WUFBUywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXlCO1lBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWlCO1lBQVUsa0JBQWEsR0FBYixhQUFhLENBQUk7WUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFhO1FBRW5RLENBQUM7UUFDRCxvQ0FBTyxHQUFQLFVBQVMsVUFBaUI7WUFDdEIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUNELDZDQUFnQixHQUFoQixVQUFrQixPQUFnQjtZQUFsQyxpQkFZQztZQVhHLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRztvQkFDbEMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ2pCLEtBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsYUFBYSxFQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoRSxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLE1BQU0sQ0FBQyxHQUFHLENBQUM7b0JBQ2YsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQTtZQUNOLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMs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QkFBbUIsRUFBQyxrQkFBa0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vZmFjdG9yeS9kZXZpY2VDYWNoZS5mYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbGIgb24gMjAxNy8xMS8xIDAwMDEuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0ICdhbmd1bGFyJztcclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55O1xyXG5pbXBvcnQge0lDYW1lcmFTZXJ2aWNlfSBmcm9tICAnLi4vc2VydmljZXMvY2FtZXJhLnNlcnZpY2UnO1xyXG5pbXBvcnQgJy4uL3NlcnZpY2VzL2NhbWVyYS5zZXJ2aWNlJztcclxuaW1wb3J0ICAnLi4vc2VydmljZXMvd2lmaS5zZXJ2aWNlJztcclxuaW1wb3J0ICcuLi9zZXJ2aWNlcy9lbGVjdHJvbmljZmVuY2Uuc2VydmljZSc7XHJcbmltcG9ydCAgJy4uL3NlcnZpY2VzL3JtcGdhdGUuc2VydmljZSc7XHJcbmltcG9ydCAgJy4vSGFuZGxlU3RvcmFnZS5mYWN0b3J5JztcclxuaW1wb3J0ICcuLi9zZXJ2aWNlcy9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IElSbXBHYXRlU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9ybXBnYXRlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUm1wR2F0ZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9SbXBnYXRlXCI7XHJcbmltcG9ydCB7IElXaWZpU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy93aWZpLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgSUVsZWN0cm9uaWNGZW5jZVNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvZWxlY3Ryb25pY2ZlbmNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgSU1hcFNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvbWFwLnNlcnZpY2VcIjtcclxuZXhwb3J0IGludGVyZmFjZSBJZGV2aWNlQ2FhY2hlU2VydmljZSB7XHJcbiAgICBnZXRBbGxDYW1lcmFMaXN0OiAoaXNDYWNoZT86Ym9vbGVhbikgPT4gYW55O1xyXG4gICAgZ2V0QWxsUm1wZ2F0ZUxpc3Q6IChpc0NhY2hlPzpib29sZWFuKSA9PiBhbnk7XHJcbiAgICBnZXRBbGxXaWZpTGlzdDogKGlzQ2FjaGU/OmJvb2xlYW4pID0+IGFueTtcclxuICAgIGdldEFsbEVsZUxpc3Q6KGlzQ2FjaGU/OmJvb2xlYW4pPT5hbnk7XHJcbiAgICBnZXRBbGxEZXZpY2U6KCk9PmFueTtcclxuICAgIGdldERldmljZUNhY2hlOiAoZGV2aWNlTmFtZTpzdHJpbmcpID0+IGFueTtcclxuICAgIGlzQ2FjaGUgOiAoZGV2aWNlVHlwZTpzdHJpbmcpID0+IGFueTtcclxufVxyXG5cclxuY2xhc3MgZGl2aWNlQ2FjaGVTZXJ2aWNlIGltcGxlbWVudHMgSWRldmljZUNhYWNoZVNlcnZpY2Uge1xyXG4gICAgc3RhdGljICAkaW5qZWN0OkFycmF5PHN0cmluZz4gPSBbJyRodHRwJywnY2FtZXJhU2VydmljZScsJ3dpZmlTZXJ2aWNlJywnZWxlY3Ryb25pY2ZlbmNlU2VydmljZScsJ3JtcGdhdGVTZXJ2aWNlJywnaGFuZGxlU3RvcmFnZScsJ21hcFNlcnZpY2UnXTtcclxuICAgIGNvbnN0cnVjdG9yIChwcml2YXRlICRodHRwOmFueSwgcHJpdmF0ZSBjYW1lcmFzZXJ2aWNlOklDYW1lcmFTZXJ2aWNlLHByaXZhdGUgd2lmaVNlcnZpY2U6IElXaWZpU2VydmljZSxwcml2YXRlIGVsZWN0cm9uaWNmZW5jZVNlcnZpY2U6IElFbGVjdHJvbmljRmVuY2VTZXJ2aWNlLCBwcml2YXRlIHJtcGdhdGVTZXJ2aWNlOiBJUm1wR2F0ZVNlcnZpY2UsIHByaXZhdGUgaGFuZGxlU3RvcmFnZTphbnksIHByaXZhdGUgbWFwU2VydmljZTogSU1hcFNlcnZpY2UpIHtcclxuXHJcbiAgICB9XHJcbiAgICBpc0NhY2hlIChkZXZpY2VUeXBlOnN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGRldmljZVR5cGUpO1xyXG4gICAgfVxyXG4gICAgZ2V0QWxsQ2FtZXJhTGlzdCAoaXNDYWNoZT86Ym9vbGVhbikge1xyXG4gICAgICAgIGlmKCF0aGlzLmlzQ2FjaGUoJ2NhbWVyYUNhY2hlJykpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW1lcmFzZXJ2aWNlLmZpbmRBbGwoKS50aGVuKChyZXMpPT57XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzICYmIGlzQ2FjaGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVN0b3JhZ2Uuc2V0U2Vzc2lvblN0b3JhZ2VEYXRhKCdjYW1lcmFDYWNoZScscmVzKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2UgaWYgKCFpc0NhY2hlKXtcclxuICAgICAgICAgICAgcmV0dXJuICB0aGlzLmdldERldmljZUNhY2hlKCdjYW1lcmFDYWNoZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldEFsbFJtcGdhdGVMaXN0IChpc0NhY2hlPzpib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzQ2FjaGUoJ3JtcGdhdGVDYWNoZScpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm1wZ2F0ZVNlcnZpY2UuZmluZEFsbCgpLnRoZW4oKHJlczogQXJyYXk8Um1wR2F0ZT4pPT57XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzICYmIGlzQ2FjaGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVN0b3JhZ2Uuc2V0U2Vzc2lvblN0b3JhZ2VEYXRhKCdybXBnYXRlQ2FjaGUnLHJlcyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2UgaWYgKCFpc0NhY2hlKXtcclxuICAgICAgICAgICAgcmV0dXJuICB0aGlzLmdldERldmljZUNhY2hlKCdybXBnYXRlQ2FjaGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRBbGxXaWZpTGlzdCAoaXNDYWNoZT86Ym9vbGVhbikge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0NhY2hlKCd3aWZpQ2FjaGUnKSkge1xyXG4gICAgICAgICAgICB0aGlzLndpZmlTZXJ2aWNlLmZpbmRBbGwoKS50aGVuKChyZXMpPT57XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzICYmIGlzQ2FjaGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVN0b3JhZ2Uuc2V0U2Vzc2lvblN0b3JhZ2VEYXRhKCd3aWZpQ2FjaGUnLHJlcyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9ZWxzZSBpZiAoIWlzQ2FjaGUpe1xyXG4gICAgICAgICAgICByZXR1cm4gIHRoaXMuZ2V0RGV2aWNlQ2FjaGUoJ3dpZmlDYWNoZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldEFsbEVsZUxpc3QgKGlzQ2FjaGU/OmJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNDYWNoZSgnZWxlQ2FjaGUnKSkge1xyXG4gICAgICAgICAgICB0aGlzLmVsZWN0cm9uaWNmZW5jZVNlcnZpY2UuZmluZEFsbCgpLnRoZW4oKHJlcyk9PntcclxuICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgaXNDYWNoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU3RvcmFnZS5zZXRTZXNzaW9uU3RvcmFnZURhdGEoJ2VsZUNhY2hlJyxyZXMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIGlmICghaXNDYWNoZSl7XHJcbiAgICAgICAgICAgIHJldHVybiAgdGhpcy5nZXREZXZpY2VDYWNoZSgnZWxlQ2FjaGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWxsRGV2aWNlKCkge1xyXG4gICAgICAgIGxldCBpc0NhY2hlOmJvb2xlYW4gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZ2V0QWxsQ2FtZXJhTGlzdChpc0NhY2hlKTtcclxuICAgICAgICB0aGlzLmdldEFsbFJtcGdhdGVMaXN0KGlzQ2FjaGUpO1xyXG4gICAgICAgIHRoaXMuZ2V0QWxsV2lmaUxpc3QoaXNDYWNoZSk7XHJcbiAgICAgICAgdGhpcy5nZXRBbGxFbGVMaXN0KGlzQ2FjaGUpO1xyXG4gICAgfTtcclxuXHJcbiAgICBcclxuICAgIGdldERldmljZUNhY2hlKGRldmljZU5hbWU6c3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oZGV2aWNlTmFtZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlU3RvcmFnZS5nZXRTZXNzaW9uU3RvcmFnZURhdGEoZGV2aWNlTmFtZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDphbnk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZGV2aWNlTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnY2FtZXJhQ2FjaGUnOlxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuZ2V0QWxsQ2FtZXJhTGlzdChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdybXBnYXRlQ2FjaGUnOlxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuZ2V0QWxsUm1wZ2F0ZUxpc3QoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAgJ3dpZmlDYWNoZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5nZXRBbGxXaWZpTGlzdChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICAnZWxlQ2FjaGUnOlxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuZ2V0QWxsRWxlTGlzdChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuYXBwLnNlcnZpY2UoJ2RldmljZUNhY2hlU2VydmVyJyxkaXZpY2VDYWNoZVNlcnZpY2UpOyJdfQ==
