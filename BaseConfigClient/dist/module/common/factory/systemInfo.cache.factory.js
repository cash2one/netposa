define(["require", "exports", "../../common/app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SystemInfoCacheProvider = (function () {
        function SystemInfoCacheProvider() {
        }
        SystemInfoCacheProvider.prototype.getSystemInfo = function () {
            var string = localStorage.getItem("systemData");
            var systemInfo;
            var unSystemInfo = {
                "AlarmPhotoNum": 3,
                "PhotoFind": 3,
                "Identity": 3,
                "IdentityValue": 80,
                "StoreTime": "6个月",
                "videoBeforeTime": 10,
                "videoAfterTime": 10,
                "desc": ""
            };
            if (string) {
                try {
                    systemInfo = angular.fromJson(string);
                }
                catch (e) {
                    console.log(e, "systemData ud doesn't jsonString");
                    systemInfo = {
                        "AlarmPhotoNum": 3,
                        "PhotoFind": 3,
                        "Identity": 3,
                        "IdentityValue": 80,
                        "StoreTime": "6个月",
                        "videoBeforeTime": 10,
                        "videoAfterTime": 10,
                        "desc": ""
                    };
                }
                unSystemInfo = {
                    "AlarmPhotoNum": systemInfo.AlarmPhotoNum || 3,
                    "PhotoFind": systemInfo.PhotoFind || 3,
                    "Identity": systemInfo.Identity || 3,
                    "IdentityValue": systemInfo.IdentityValue || 80,
                    "StoreTime": systemInfo.StoreTime || "6个月",
                    "videoBeforeTime": systemInfo.videoBeforeTime || 10,
                    "videoAfterTime": systemInfo.videoAfterTime || 10,
                    "desc": systemInfo.desc || ""
                };
            }
            return unSystemInfo;
        };
        SystemInfoCacheProvider.prototype.setSystemInfo = function (data) {
            var systemInfo = {
                "AlarmPhotoNum": data.AlarmPhotoNum || 3,
                "PhotoFind": data.PhotoFind || 3,
                "Identity": data.Identity || 3,
                "IdentityValue": data.IdentityValue || 80,
                "StoreTime": data.StoreTime || "6个月",
                "videoBeforeTime": data.videoBeforeTime || 10,
                "videoAfterTime": data.videoAfterTime || 10,
                "desc": data.desc || ""
            };
            localStorage.setItem("systemData", angular.toJson(systemInfo));
            return 1;
        };
        return SystemInfoCacheProvider;
    }());
    exports.SystemInfoCacheProvider = SystemInfoCacheProvider;
    main_app_1.app.service('systemInfoCacheFactory', SystemInfoCacheProvider);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2ZhY3Rvcnkvc3lzdGVtSW5mby5jYWNoZS5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWlCQTtRQUNJO1FBRUEsQ0FBQztRQUVELCtDQUFhLEdBQWI7WUFDSSxJQUFJLE1BQU0sR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2hELElBQUksVUFBOEIsQ0FBQztZQUNuQyxJQUFJLFlBQVksR0FBdUI7Z0JBQ25DLGVBQWUsRUFBRSxDQUFDO2dCQUNsQixXQUFXLEVBQUUsQ0FBQztnQkFDZCxVQUFVLEVBQUUsQ0FBQztnQkFDYixlQUFlLEVBQUUsRUFBRTtnQkFDbkIsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLGlCQUFpQixFQUFFLEVBQUU7Z0JBQ3JCLGdCQUFnQixFQUFFLEVBQUU7Z0JBQ3BCLE1BQU0sRUFBRSxFQUFFO2FBQ2IsQ0FBQztZQUNGLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsSUFBSSxDQUFDO29CQUNELFVBQVUsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMxQyxDQUFDO2dCQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsa0NBQWtDLENBQUMsQ0FBQztvQkFDbkQsVUFBVSxHQUFHO3dCQUNULGVBQWUsRUFBRSxDQUFDO3dCQUNsQixXQUFXLEVBQUUsQ0FBQzt3QkFDZCxVQUFVLEVBQUUsQ0FBQzt3QkFDYixlQUFlLEVBQUUsRUFBRTt3QkFDbkIsV0FBVyxFQUFFLEtBQUs7d0JBQ2xCLGlCQUFpQixFQUFFLEVBQUU7d0JBQ3JCLGdCQUFnQixFQUFFLEVBQUU7d0JBQ3BCLE1BQU0sRUFBRSxFQUFFO3FCQUNiLENBQUM7Z0JBQ04sQ0FBQztnQkFFRCxZQUFZLEdBQUc7b0JBQ1gsZUFBZSxFQUFFLFVBQVUsQ0FBQyxhQUFhLElBQUksQ0FBQztvQkFDOUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxTQUFTLElBQUksQ0FBQztvQkFDdEMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLElBQUksQ0FBQztvQkFDcEMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxhQUFhLElBQUksRUFBRTtvQkFDL0MsV0FBVyxFQUFFLFVBQVUsQ0FBQyxTQUFTLElBQUksS0FBSztvQkFDMUMsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLGVBQWUsSUFBSSxFQUFFO29CQUNuRCxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsY0FBYyxJQUFJLEVBQUU7b0JBQ2pELE1BQU0sRUFBRSxVQUFVLENBQUMsSUFBSSxJQUFJLEVBQUU7aUJBQ2hDLENBQUM7WUFDTixDQUFDO1lBQ0QsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUV4QixDQUFDO1FBRUQsK0NBQWEsR0FBYixVQUFjLElBQXdCO1lBQ2xDLElBQUksVUFBVSxHQUF1QjtnQkFDakMsZUFBZSxFQUFFLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQztnQkFDeEMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQztnQkFDaEMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQztnQkFDOUIsZUFBZSxFQUFFLElBQUksQ0FBQyxhQUFhLElBQUksRUFBRTtnQkFDekMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLElBQUksS0FBSztnQkFDcEMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGVBQWUsSUFBSSxFQUFFO2dCQUM3QyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsY0FBYyxJQUFJLEVBQUU7Z0JBQzNDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7YUFDMUIsQ0FBQztZQUNGLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUMvRCxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2IsQ0FBQztRQUNMLDhCQUFDO0lBQUQsQ0FoRUEsQUFnRUMsSUFBQTtJQWhFWSwwREFBdUI7SUFrRXBDLGNBQUcsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLEVBQUUsdUJBQXVCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL2ZhY3Rvcnkvc3lzdGVtSW5mby5jYWNoZS5mYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIGNyZWF0ZSBieSBjaGVuZG1cclxuICpcclxuICogQHRpbWU6IDIwMTctMTEtMjhcclxuICogQHBhcmFtczpcclxuICogQHJldHVybjpcclxuICovXHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQge1N5c3RlbUNvbmZpZ1BhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L1N5c3RlbUNvbmZpZ1BhcmFtc1wiO1xyXG5cclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU3lzdGVtSW5mb0NhY2hlUHJvdmlkZXIge1xyXG4gICAgZ2V0U3lzdGVtSW5mbygpOiBTeXN0ZW1Db25maWdQYXJhbXM7XHJcblxyXG4gICAgc2V0U3lzdGVtSW5mbyhkYXRhOiBTeXN0ZW1Db25maWdQYXJhbXMpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3lzdGVtSW5mb0NhY2hlUHJvdmlkZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldFN5c3RlbUluZm8oKTogU3lzdGVtQ29uZmlnUGFyYW1zIHtcclxuICAgICAgICBsZXQgc3RyaW5nID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzeXN0ZW1EYXRhXCIpO1xyXG4gICAgICAgIGxldCBzeXN0ZW1JbmZvOiBTeXN0ZW1Db25maWdQYXJhbXM7XHJcbiAgICAgICAgbGV0IHVuU3lzdGVtSW5mbzogU3lzdGVtQ29uZmlnUGFyYW1zID0ge1xyXG4gICAgICAgICAgICBcIkFsYXJtUGhvdG9OdW1cIjogMyxcclxuICAgICAgICAgICAgXCJQaG90b0ZpbmRcIjogMyxcclxuICAgICAgICAgICAgXCJJZGVudGl0eVwiOiAzLFxyXG4gICAgICAgICAgICBcIklkZW50aXR5VmFsdWVcIjogODAsXHJcbiAgICAgICAgICAgIFwiU3RvcmVUaW1lXCI6IFwiNuS4quaciFwiLFxyXG4gICAgICAgICAgICBcInZpZGVvQmVmb3JlVGltZVwiOiAxMCxcclxuICAgICAgICAgICAgXCJ2aWRlb0FmdGVyVGltZVwiOiAxMCxcclxuICAgICAgICAgICAgXCJkZXNjXCI6IFwiXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChzdHJpbmcpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHN5c3RlbUluZm8gPSBhbmd1bGFyLmZyb21Kc29uKHN0cmluZyk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUsIFwic3lzdGVtRGF0YSB1ZCBkb2Vzbid0IGpzb25TdHJpbmdcIik7XHJcbiAgICAgICAgICAgICAgICBzeXN0ZW1JbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiQWxhcm1QaG90b051bVwiOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiUGhvdG9GaW5kXCI6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJJZGVudGl0eVwiOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiSWRlbnRpdHlWYWx1ZVwiOiA4MCxcclxuICAgICAgICAgICAgICAgICAgICBcIlN0b3JlVGltZVwiOiBcIjbkuKrmnIhcIixcclxuICAgICAgICAgICAgICAgICAgICBcInZpZGVvQmVmb3JlVGltZVwiOiAxMCxcclxuICAgICAgICAgICAgICAgICAgICBcInZpZGVvQWZ0ZXJUaW1lXCI6IDEwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB1blN5c3RlbUluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICBcIkFsYXJtUGhvdG9OdW1cIjogc3lzdGVtSW5mby5BbGFybVBob3RvTnVtIHx8IDMsXHJcbiAgICAgICAgICAgICAgICBcIlBob3RvRmluZFwiOiBzeXN0ZW1JbmZvLlBob3RvRmluZCB8fCAzLFxyXG4gICAgICAgICAgICAgICAgXCJJZGVudGl0eVwiOiBzeXN0ZW1JbmZvLklkZW50aXR5IHx8IDMsXHJcbiAgICAgICAgICAgICAgICBcIklkZW50aXR5VmFsdWVcIjogc3lzdGVtSW5mby5JZGVudGl0eVZhbHVlIHx8IDgwLFxyXG4gICAgICAgICAgICAgICAgXCJTdG9yZVRpbWVcIjogc3lzdGVtSW5mby5TdG9yZVRpbWUgfHwgXCI25Liq5pyIXCIsXHJcbiAgICAgICAgICAgICAgICBcInZpZGVvQmVmb3JlVGltZVwiOiBzeXN0ZW1JbmZvLnZpZGVvQmVmb3JlVGltZSB8fCAxMCxcclxuICAgICAgICAgICAgICAgIFwidmlkZW9BZnRlclRpbWVcIjogc3lzdGVtSW5mby52aWRlb0FmdGVyVGltZSB8fCAxMCxcclxuICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBzeXN0ZW1JbmZvLmRlc2MgfHwgXCJcIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5TeXN0ZW1JbmZvO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZXRTeXN0ZW1JbmZvKGRhdGE6IFN5c3RlbUNvbmZpZ1BhcmFtcykge1xyXG4gICAgICAgIGxldCBzeXN0ZW1JbmZvOiBTeXN0ZW1Db25maWdQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIFwiQWxhcm1QaG90b051bVwiOiBkYXRhLkFsYXJtUGhvdG9OdW0gfHwgMyxcclxuICAgICAgICAgICAgXCJQaG90b0ZpbmRcIjogZGF0YS5QaG90b0ZpbmQgfHwgMyxcclxuICAgICAgICAgICAgXCJJZGVudGl0eVwiOiBkYXRhLklkZW50aXR5IHx8IDMsXHJcbiAgICAgICAgICAgIFwiSWRlbnRpdHlWYWx1ZVwiOiBkYXRhLklkZW50aXR5VmFsdWUgfHwgODAsXHJcbiAgICAgICAgICAgIFwiU3RvcmVUaW1lXCI6IGRhdGEuU3RvcmVUaW1lIHx8IFwiNuS4quaciFwiLFxyXG4gICAgICAgICAgICBcInZpZGVvQmVmb3JlVGltZVwiOiBkYXRhLnZpZGVvQmVmb3JlVGltZSB8fCAxMCxcclxuICAgICAgICAgICAgXCJ2aWRlb0FmdGVyVGltZVwiOiBkYXRhLnZpZGVvQWZ0ZXJUaW1lIHx8IDEwLFxyXG4gICAgICAgICAgICBcImRlc2NcIjogZGF0YS5kZXNjIHx8IFwiXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic3lzdGVtRGF0YVwiLCBhbmd1bGFyLnRvSnNvbihzeXN0ZW1JbmZvKSk7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5zZXJ2aWNlKCdzeXN0ZW1JbmZvQ2FjaGVGYWN0b3J5JywgU3lzdGVtSW5mb0NhY2hlUHJvdmlkZXIpO1xyXG5cclxuIl19
