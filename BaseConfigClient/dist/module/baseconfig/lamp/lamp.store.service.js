define(["require", "exports", "../../common/app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IActionCameraList = (function () {
        function IActionCameraList() {
        }
        return IActionCameraList;
    }());
    var TaskStoreService = (function () {
        function TaskStoreService() {
            this.ActionDeviceList = {};
        }
        TaskStoreService.prototype.clearCache = function () {
            this.TreeWithArea = null;
            this.ActionDeviceList.CameraList = null;
            this.ActionDeviceList.WifiList = null;
            this.ActionDeviceList.RmpGateList = null;
            this.ActionDeviceList.ElectronicFenceList = null;
            return true;
        };
        Object.defineProperty(TaskStoreService.prototype, "getTreeWithArea", {
            get: function () {
                if (this.TreeWithArea) {
                    return angular.copy(this.TreeWithArea);
                }
                else {
                    return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TaskStoreService.prototype, "SelectCameraList", {
            get: function () {
                if (this.ActionDeviceList.CameraList) {
                    return this.ActionDeviceList.CameraList;
                }
                else {
                    return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        TaskStoreService.prototype.updateSelectCameraList = function (list) {
            this.ActionDeviceList.CameraList = list;
            return true;
        };
        TaskStoreService.prototype.updateCameraTreeWithArea = function (params) {
            this.TreeWithArea = params;
            return true;
        };
        Object.defineProperty(TaskStoreService.prototype, "getTreeWithWifi", {
            get: function () {
                if (this.TreeWithWifi) {
                    return angular.copy(this.TreeWithWifi);
                }
                else {
                    return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TaskStoreService.prototype, "SelectWifiList", {
            get: function () {
                if (this.ActionDeviceList.WifiList) {
                    return this.ActionDeviceList.WifiList;
                }
                else {
                    return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        TaskStoreService.prototype.updateSelectWifiList = function (list) {
            this.ActionDeviceList.WifiList = list;
            return true;
        };
        TaskStoreService.prototype.updateWifiTreeWithArea = function (params) {
            this.TreeWithWifi = params;
            return true;
        };
        Object.defineProperty(TaskStoreService.prototype, "getTreeWithRmpGate", {
            get: function () {
                if (this.TreeWithRmpGate) {
                    return angular.copy(this.TreeWithRmpGate);
                }
                else {
                    return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TaskStoreService.prototype, "SelectRmpGateList", {
            get: function () {
                if (this.ActionDeviceList.RmpGateList) {
                    return this.ActionDeviceList.RmpGateList;
                }
                else {
                    return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        TaskStoreService.prototype.updateSelectRmpGateList = function (list) {
            this.ActionDeviceList.RmpGateList = list;
            return true;
        };
        TaskStoreService.prototype.updateRmpGateTreeWithArea = function (params) {
            this.TreeWithRmpGate = params;
            return true;
        };
        Object.defineProperty(TaskStoreService.prototype, "getTreeWithElectronicFence", {
            get: function () {
                if (this.TreeWithElectronicFence) {
                    return angular.copy(this.TreeWithElectronicFence);
                }
                else {
                    return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TaskStoreService.prototype, "SelectElectronicFenceList", {
            get: function () {
                if (this.ActionDeviceList.ElectronicFenceList) {
                    return this.ActionDeviceList.ElectronicFenceList;
                }
                else {
                    return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        TaskStoreService.prototype.updateSelectElectronicFenceList = function (list) {
            this.ActionDeviceList.ElectronicFenceList = list;
            return true;
        };
        TaskStoreService.prototype.updateElectronicFenceTreeWithArea = function (params) {
            this.TreeWithElectronicFence = params;
            return true;
        };
        return TaskStoreService;
    }());
    main_app_1.app.service('taskStoreService', TaskStoreService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9sYW1wL2xhbXAuc3RvcmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUF5Q0E7UUFBQTtRQUtBLENBQUM7UUFBRCx3QkFBQztJQUFELENBTEEsQUFLQyxJQUFBO0lBRUQ7UUFBQTtZQUVZLHFCQUFnQixHQUFHLEVBQXVCLENBQUM7UUE0R3ZELENBQUM7UUF2R0cscUNBQVUsR0FBVjtZQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7WUFDakQsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQsc0JBQUksNkNBQWU7aUJBQW5CO2dCQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQSxDQUFDO29CQUNsQixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzNDLENBQUM7Z0JBQUEsSUFBSSxDQUFBLENBQUM7b0JBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDaEIsQ0FBQztZQUVMLENBQUM7OztXQUFBO1FBQ0Qsc0JBQUksOENBQWdCO2lCQUFwQjtnQkFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUEsQ0FBQztvQkFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUM7Z0JBQzVDLENBQUM7Z0JBQUEsSUFBSSxDQUFBLENBQUM7b0JBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQTtnQkFDZixDQUFDO1lBQ0wsQ0FBQzs7O1dBQUE7UUFDRCxpREFBc0IsR0FBdEIsVUFBdUIsSUFBa0I7WUFDckMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsbURBQXdCLEdBQXhCLFVBQTBCLE1BQWdDO1lBQ3RELElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVELHNCQUFJLDZDQUFlO2lCQUFuQjtnQkFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUEsQ0FBQztvQkFDbEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUMzQyxDQUFDO2dCQUFBLElBQUksQ0FBQSxDQUFDO29CQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7WUFFTCxDQUFDOzs7V0FBQTtRQUNELHNCQUFJLDRDQUFjO2lCQUFsQjtnQkFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUEsQ0FBQztvQkFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUM7Z0JBQzFDLENBQUM7Z0JBQUEsSUFBSSxDQUFBLENBQUM7b0JBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQTtnQkFDZixDQUFDO1lBQ0wsQ0FBQzs7O1dBQUE7UUFDRCwrQ0FBb0IsR0FBcEIsVUFBcUIsSUFBa0I7WUFDbkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsaURBQXNCLEdBQXRCLFVBQXdCLE1BQThCO1lBQ2xELElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVELHNCQUFJLGdEQUFrQjtpQkFBdEI7Z0JBQ0ksRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFBLENBQUM7b0JBQ3JCLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDOUMsQ0FBQztnQkFBQSxJQUFJLENBQUEsQ0FBQztvQkFDRixNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDO1lBRUwsQ0FBQzs7O1dBQUE7UUFDRCxzQkFBSSwrQ0FBaUI7aUJBQXJCO2dCQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQSxDQUFDO29CQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztnQkFDN0MsQ0FBQztnQkFBQSxJQUFJLENBQUEsQ0FBQztvQkFDRixNQUFNLENBQUMsSUFBSSxDQUFBO2dCQUNmLENBQUM7WUFDTCxDQUFDOzs7V0FBQTtRQUNELGtEQUF1QixHQUF2QixVQUF3QixJQUFrQjtZQUN0QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxvREFBeUIsR0FBekIsVUFBMkIsTUFBaUM7WUFDeEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUM7WUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQsc0JBQUksd0RBQTBCO2lCQUE5QjtnQkFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQSxDQUFDO29CQUM3QixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztnQkFDdEQsQ0FBQztnQkFBQSxJQUFJLENBQUEsQ0FBQztvQkFDRixNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDO1lBQ0wsQ0FBQzs7O1dBQUE7UUFDRCxzQkFBSSx1REFBeUI7aUJBQTdCO2dCQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBLENBQUM7b0JBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUM7Z0JBQ3JELENBQUM7Z0JBQUEsSUFBSSxDQUFBLENBQUM7b0JBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQTtnQkFDZixDQUFDO1lBQ0wsQ0FBQzs7O1dBQUE7UUFDRCwwREFBK0IsR0FBL0IsVUFBZ0MsSUFBa0I7WUFDOUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztZQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCw0REFBaUMsR0FBakMsVUFBbUMsTUFBeUM7WUFDeEUsSUFBSSxDQUFDLHVCQUF1QixHQUFHLE1BQU0sQ0FBQztZQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDTCx1QkFBQztJQUFELENBOUdBLEFBOEdDLElBQUE7SUFFRCxjQUFHLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLGdCQUFnQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2Jhc2Vjb25maWcvbGFtcC9sYW1wLnN0b3JlLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogY3JlYXRlIGJ5IHp4cVxyXG4gKiAg57yT5a2Y5b2T5YmNIOS7u+WKoea3u+WKoOOAgeS/ruaUuVxyXG4gKiBAdGltZTogMjAxNy0wNi0xMiAxNDo1MDoxNVxyXG4gKiBAcGFyYW1zOlxyXG4gKiBAcmV0dXJuOlxyXG4gKi9cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCB7QXJlYX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L0FyZWFcIjtcclxuaW1wb3J0IHtBcmVhRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9BcmVhRXhcIjtcclxuaW1wb3J0IHtDYW1lcmFFeH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0NhbWVyYUV4XCI7XHJcbmltcG9ydCB7TGFtcEV4fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvTGFtcEV4XCI7XHJcbmltcG9ydCB7V2lmaUV4fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvV2lmaUV4XCI7XHJcbmltcG9ydCB7Um1wR2F0ZUV4fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvUm1wR2F0ZUV4XCI7XHJcbmltcG9ydCB7RWxlY3Ryb25pY0ZlbmNlRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9FbGVjdHJvbmljRmVuY2VFeFwiO1xyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcbmRlY2xhcmUgbGV0IHdpbmRvdzogYW55O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVGFza1N0b3JlU2VydmljZSB7XHJcbiAgICAvL+a4heepuiDnvJPlrZjmlbDmja5cclxuICAgIGNsZWFyQ2FjaGU6ICgpID0+IGJvb2xlYW5cclxuICAgIC8vIOaRhOWDj+aculxyXG4gICAgZ2V0VHJlZVdpdGhBcmVhOiBBcnJheTxDYW1lcmFFeCAmIEFyZWFFeD47XHJcbiAgICBTZWxlY3RDYW1lcmFMaXN0OkFycmF5PHN0cmluZz47XHJcbiAgICB1cGRhdGVTZWxlY3RDYW1lcmFMaXN0OihsaXN0OkFycmF5PHN0cmluZz4pID0+IGJvb2xlYW5cclxuICAgIHVwZGF0ZUNhbWVyYVRyZWVXaXRoQXJlYTogKHBhcmFtczogQXJyYXk8Q2FtZXJhRXggJiBBcmVhRXg+KSA9PiBib29sZWFuXHJcbiAgICAvLyBXSUZJXHJcbiAgICBnZXRUcmVlV2l0aFdpZmk6IEFycmF5PFdpZmlFeCAmIEFyZWFFeD4gXHJcbiAgICBTZWxlY3RXaWZpTGlzdDpBcnJheTxzdHJpbmc+O1xyXG4gICAgdXBkYXRlU2VsZWN0V2lmaUxpc3Q6KGxpc3Q6QXJyYXk8c3RyaW5nPikgPT4gYm9vbGVhblxyXG4gICAgdXBkYXRlV2lmaVRyZWVXaXRoQXJlYToocGFyYW1zOiBBcnJheTxXaWZpRXggJiBBcmVhRXg+KT0+Ym9vbGVhbjtcclxuICAgIC8vIOWNoeWPo1xyXG4gICAgZ2V0VHJlZVdpdGhSbXBHYXRlOiBBcnJheTxSbXBHYXRlRXggJiBBcmVhRXg+XHJcbiAgICBTZWxlY3RSbXBHYXRlTGlzdDpBcnJheTxzdHJpbmc+O1xyXG4gICAgdXBkYXRlU2VsZWN0Um1wR2F0ZUxpc3Q6KGxpc3Q6QXJyYXk8c3RyaW5nPikgPT4gYm9vbGVhblxyXG4gICAgdXBkYXRlUm1wR2F0ZVRyZWVXaXRoQXJlYToocGFyYW1zOiBBcnJheTxSbXBHYXRlRXggJiBBcmVhRXg+KT0+Ym9vbGVhbjtcclxuICAgIC8vIOeUteWbtFxyXG4gICAgZ2V0VHJlZVdpdGhFbGVjdHJvbmljRmVuY2U6IEFycmF5PEVsZWN0cm9uaWNGZW5jZUV4ICYgQXJlYUV4PlxyXG4gICAgU2VsZWN0RWxlY3Ryb25pY0ZlbmNlTGlzdDpBcnJheTxzdHJpbmc+O1xyXG4gICAgdXBkYXRlU2VsZWN0RWxlY3Ryb25pY0ZlbmNlTGlzdDoobGlzdDpBcnJheTxzdHJpbmc+KSA9PiBib29sZWFuXHJcbiAgICB1cGRhdGVFbGVjdHJvbmljRmVuY2VUcmVlV2l0aEFyZWE6KHBhcmFtczogQXJyYXk8RWxlY3Ryb25pY0ZlbmNlRXggJiBBcmVhRXg+KT0+Ym9vbGVhbjtcclxufVxyXG5jbGFzcyBJQWN0aW9uQ2FtZXJhTGlzdCB7XHJcbiAgICBDYW1lcmFMaXN0OkFycmF5PHN0cmluZz47XHJcbiAgICBXaWZpTGlzdDpBcnJheTxzdHJpbmc+O1xyXG4gICAgUm1wR2F0ZUxpc3Q6QXJyYXk8c3RyaW5nPjtcclxuICAgIEVsZWN0cm9uaWNGZW5jZUxpc3Q6QXJyYXk8c3RyaW5nPjtcclxufVxyXG5cclxuY2xhc3MgVGFza1N0b3JlU2VydmljZSBpbXBsZW1lbnRzIElUYXNrU3RvcmVTZXJ2aWNlIHtcclxuXHJcbiAgICBwcml2YXRlIEFjdGlvbkRldmljZUxpc3QgPSB7fSBhcyBJQWN0aW9uQ2FtZXJhTGlzdDtcclxuICAgIHByaXZhdGUgVHJlZVdpdGhBcmVhIDpBcnJheTxDYW1lcmFFeCAmIEFyZWFFeD47XHJcbiAgICBwcml2YXRlIFRyZWVXaXRoV2lmaSA6QXJyYXk8V2lmaUV4ICYgQXJlYUV4PjtcclxuICAgIHByaXZhdGUgVHJlZVdpdGhSbXBHYXRlIDpBcnJheTxSbXBHYXRlRXggJiBBcmVhRXg+O1xyXG4gICAgcHJpdmF0ZSBUcmVlV2l0aEVsZWN0cm9uaWNGZW5jZSA6QXJyYXk8RWxlY3Ryb25pY0ZlbmNlRXggJiBBcmVhRXg+O1xyXG4gICAgY2xlYXJDYWNoZSgpOiBib29sZWFuIHtcclxuICAgICAgICB0aGlzLlRyZWVXaXRoQXJlYSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5BY3Rpb25EZXZpY2VMaXN0LkNhbWVyYUxpc3QgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuQWN0aW9uRGV2aWNlTGlzdC5XaWZpTGlzdCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5BY3Rpb25EZXZpY2VMaXN0LlJtcEdhdGVMaXN0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLkFjdGlvbkRldmljZUxpc3QuRWxlY3Ryb25pY0ZlbmNlTGlzdCA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICAvL+aRhOWDj+aculxyXG4gICAgZ2V0IGdldFRyZWVXaXRoQXJlYSgpOiBBcnJheTxDYW1lcmFFeCAmIEFyZWFFeD4ge1xyXG4gICAgICAgIGlmKHRoaXMuVHJlZVdpdGhBcmVhKXtcclxuICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuY29weSh0aGlzLlRyZWVXaXRoQXJlYSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBnZXQgU2VsZWN0Q2FtZXJhTGlzdCgpOkFycmF5PHN0cmluZz57XHJcbiAgICAgICAgaWYodGhpcy5BY3Rpb25EZXZpY2VMaXN0LkNhbWVyYUxpc3Qpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5BY3Rpb25EZXZpY2VMaXN0LkNhbWVyYUxpc3Q7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdXBkYXRlU2VsZWN0Q2FtZXJhTGlzdChsaXN0OkFycmF5PHN0cmluZz4pOmJvb2xlYW57XHJcbiAgICAgICAgdGhpcy5BY3Rpb25EZXZpY2VMaXN0LkNhbWVyYUxpc3QgPSBsaXN0O1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlQ2FtZXJhVHJlZVdpdGhBcmVhIChwYXJhbXM6IEFycmF5PENhbWVyYUV4ICYgQXJlYUV4Pik6Ym9vbGVhbntcclxuICAgICAgICB0aGlzLlRyZWVXaXRoQXJlYSA9IHBhcmFtcztcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8vd2lmaVxyXG4gICAgZ2V0IGdldFRyZWVXaXRoV2lmaSgpOiBBcnJheTxXaWZpRXggJiBBcmVhRXg+IHtcclxuICAgICAgICBpZih0aGlzLlRyZWVXaXRoV2lmaSl7XHJcbiAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmNvcHkodGhpcy5UcmVlV2l0aFdpZmkpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgZ2V0IFNlbGVjdFdpZmlMaXN0KCk6QXJyYXk8c3RyaW5nPntcclxuICAgICAgICBpZih0aGlzLkFjdGlvbkRldmljZUxpc3QuV2lmaUxpc3Qpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5BY3Rpb25EZXZpY2VMaXN0LldpZmlMaXN0O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHVwZGF0ZVNlbGVjdFdpZmlMaXN0KGxpc3Q6QXJyYXk8c3RyaW5nPik6Ym9vbGVhbntcclxuICAgICAgICB0aGlzLkFjdGlvbkRldmljZUxpc3QuV2lmaUxpc3QgPSBsaXN0O1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlV2lmaVRyZWVXaXRoQXJlYSAocGFyYW1zOiBBcnJheTxXaWZpRXggJiBBcmVhRXg+KTpib29sZWFue1xyXG4gICAgICAgIHRoaXMuVHJlZVdpdGhXaWZpID0gcGFyYW1zO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgLy/ljaHlj6NcclxuICAgIGdldCBnZXRUcmVlV2l0aFJtcEdhdGUoKTogQXJyYXk8Um1wR2F0ZUV4ICYgQXJlYUV4PiB7XHJcbiAgICAgICAgaWYodGhpcy5UcmVlV2l0aFJtcEdhdGUpe1xyXG4gICAgICAgICAgICByZXR1cm4gYW5ndWxhci5jb3B5KHRoaXMuVHJlZVdpdGhSbXBHYXRlKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIGdldCBTZWxlY3RSbXBHYXRlTGlzdCgpOkFycmF5PHN0cmluZz57XHJcbiAgICAgICAgaWYodGhpcy5BY3Rpb25EZXZpY2VMaXN0LlJtcEdhdGVMaXN0KXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuQWN0aW9uRGV2aWNlTGlzdC5SbXBHYXRlTGlzdDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB1cGRhdGVTZWxlY3RSbXBHYXRlTGlzdChsaXN0OkFycmF5PHN0cmluZz4pOmJvb2xlYW57XHJcbiAgICAgICAgdGhpcy5BY3Rpb25EZXZpY2VMaXN0LlJtcEdhdGVMaXN0ID0gbGlzdDtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHVwZGF0ZVJtcEdhdGVUcmVlV2l0aEFyZWEgKHBhcmFtczogQXJyYXk8Um1wR2F0ZUV4ICYgQXJlYUV4Pik6Ym9vbGVhbntcclxuICAgICAgICB0aGlzLlRyZWVXaXRoUm1wR2F0ZSA9IHBhcmFtcztcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8v55S15Zu0XHJcbiAgICBnZXQgZ2V0VHJlZVdpdGhFbGVjdHJvbmljRmVuY2UoKTogQXJyYXk8RWxlY3Ryb25pY0ZlbmNlRXggJiBBcmVhRXg+IHtcclxuICAgICAgICBpZih0aGlzLlRyZWVXaXRoRWxlY3Ryb25pY0ZlbmNlKXtcclxuICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuY29weSh0aGlzLlRyZWVXaXRoRWxlY3Ryb25pY0ZlbmNlKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0IFNlbGVjdEVsZWN0cm9uaWNGZW5jZUxpc3QoKTpBcnJheTxzdHJpbmc+e1xyXG4gICAgICAgIGlmKHRoaXMuQWN0aW9uRGV2aWNlTGlzdC5FbGVjdHJvbmljRmVuY2VMaXN0KXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuQWN0aW9uRGV2aWNlTGlzdC5FbGVjdHJvbmljRmVuY2VMaXN0O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHVwZGF0ZVNlbGVjdEVsZWN0cm9uaWNGZW5jZUxpc3QobGlzdDpBcnJheTxzdHJpbmc+KTpib29sZWFue1xyXG4gICAgICAgIHRoaXMuQWN0aW9uRGV2aWNlTGlzdC5FbGVjdHJvbmljRmVuY2VMaXN0ID0gbGlzdDtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHVwZGF0ZUVsZWN0cm9uaWNGZW5jZVRyZWVXaXRoQXJlYSAocGFyYW1zOiBBcnJheTxFbGVjdHJvbmljRmVuY2VFeCAmIEFyZWFFeD4pOmJvb2xlYW57XHJcbiAgICAgICAgdGhpcy5UcmVlV2l0aEVsZWN0cm9uaWNGZW5jZSA9IHBhcmFtcztcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwLnNlcnZpY2UoJ3Rhc2tTdG9yZVNlcnZpY2UnLCBUYXNrU3RvcmVTZXJ2aWNlKTtcclxuIl19
