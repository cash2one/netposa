define(["require", "exports", "../../common/app/main.app", "../../common/services/system.service", "../../common/factory/systemInfo.cache.factory", "../../common/factory/layerMsg.factory"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SystemPropertiesConfigController = (function () {
        function SystemPropertiesConfigController($scope, systemService, layer, systemInfoCacheFactory, layerDec) {
            this.$scope = $scope;
            this.systemService = systemService;
            this.layer = layer;
            this.systemInfoCacheFactory = systemInfoCacheFactory;
            this.layerDec = layerDec;
            this.similarityMax = 100;
            $scope.enabled = true;
            $scope.onOff = true;
            $scope.yesNo = true;
            $scope.disabled = true;
            this.moduleName = "系统参数配置界面";
            this.getSystemData();
        }
        SystemPropertiesConfigController.prototype.getSystemData = function () {
            var _this = this;
            this.systemService.getSystemData().then(function (res) {
                if ((res.code === 200) && (res.data)) {
                    _this.systemData = angular.copy(res.data);
                    _this.systemInfoCacheFactory.setSystemInfo(res.data);
                }
                else {
                    _this.systemData = {
                        AlarmPhotoNum: "",
                        PhotoFind: "",
                        Identity: "",
                        IdentityValue: "",
                        StoreTime: "",
                        videoBeforeTime: "",
                        videoAfterTime: "",
                        desc: ""
                    };
                }
            });
        };
        SystemPropertiesConfigController.prototype.submitList = function () {
            var self = this;
            self.systemService.editSystemData(self.systemData).then(function (res) {
                if (res.data && res.code === 200) {
                    self.layerDec.info('编辑成功');
                    self.getSystemData();
                    self.systemInfoCacheFactory.setSystemInfo(self.systemData);
                }
                else {
                    self.layerDec.info('编辑失败');
                }
            });
        };
        SystemPropertiesConfigController.$inject = ['$scope', 'systemService', 'layer', 'systemInfoCacheFactory', 'layerDec'];
        return SystemPropertiesConfigController;
    }());
    main_app_1.app.controller("systemPropertiesController", SystemPropertiesConfigController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9zeXN0ZW0tcHJvcGVydGllcy9zeXN0ZW0scHJvcGVydGllcy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVlBO1FBaUJJLDBDQUFvQixNQUFXLEVBQ1gsYUFBNkIsRUFDN0IsS0FBVSxFQUNWLHNCQUFnRCxFQUNoRCxRQUFtQjtZQUpuQixXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQ1gsa0JBQWEsR0FBYixhQUFhLENBQWdCO1lBQzdCLFVBQUssR0FBTCxLQUFLLENBQUs7WUFDViwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQTBCO1lBQ2hELGFBQVEsR0FBUixRQUFRLENBQVc7WUFOdkMsa0JBQWEsR0FBVyxHQUFHLENBQUM7WUFReEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDdEIsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDcEIsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDcEIsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFFN0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLENBQUM7UUFFTyx3REFBYSxHQUFyQjtZQUFBLGlCQWtCQztZQWpCRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQXVDO2dCQUM1RSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNuQyxLQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN6QyxLQUFJLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDeEQsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixLQUFJLENBQUMsVUFBVSxHQUFHO3dCQUNkLGFBQWEsRUFBRSxFQUFFO3dCQUNqQixTQUFTLEVBQUUsRUFBRTt3QkFDYixRQUFRLEVBQUUsRUFBRTt3QkFDWixhQUFhLEVBQUUsRUFBRTt3QkFDakIsU0FBUyxFQUFFLEVBQUU7d0JBQ2IsZUFBZSxFQUFFLEVBQUU7d0JBQ25CLGNBQWMsRUFBRSxFQUFFO3dCQUNsQixJQUFJLEVBQUUsRUFBRTtxQkFDWCxDQUFBO2dCQUNMLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFFTSxxREFBVSxHQUFqQjtZQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoQixJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBeUI7Z0JBQzlFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDL0QsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0IsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQTlETSx3Q0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsVUFBVSxDQUFDLENBQUM7UUErRGhHLHVDQUFDO0tBaEVELEFBZ0VDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLDRCQUE0QixFQUFFLGdDQUFnQyxDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2Jhc2Vjb25maWcvc3lzdGVtLXByb3BlcnRpZXMvc3lzdGVtLHByb3BlcnRpZXMuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQge1N5c3RlbUNvbmZpZ1BhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L1N5c3RlbUNvbmZpZ1BhcmFtc1wiO1xyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9zeXN0ZW0uc2VydmljZSc7XHJcbmltcG9ydCB7SVN5c3RlbVNlcnZpY2V9IGZyb20gJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9zeXN0ZW0uc2VydmljZSc7XHJcbmltcG9ydCB7UmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL2ZhY3Rvcnkvc3lzdGVtSW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7SVN5c3RlbUluZm9DYWNoZVByb3ZpZGVyfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZhY3Rvcnkvc3lzdGVtSW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7SUxheWVyRGVjfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZhY3RvcnkvbGF5ZXJNc2cuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcblxyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcblxyXG5jbGFzcyBTeXN0ZW1Qcm9wZXJ0aWVzQ29uZmlnQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJywgJ3N5c3RlbVNlcnZpY2UnLCAnbGF5ZXInLCAnc3lzdGVtSW5mb0NhY2hlRmFjdG9yeScsICdsYXllckRlYyddO1xyXG5cclxuICAgIG1vZHVsZU5hbWU6IHN0cmluZztcclxuXHJcbiAgICAvLyBsaXN0XHJcbiAgICBzeXN0ZW1EYXRhOiBhbnk7XHJcbiAgICBzeXNMYW5ndWFnZTogc3RyaW5nO1xyXG4gICAgQWxhcm1QaG90b051bTogc3RyaW5nO1xyXG4gICAgUGhvdG9GaW5kOiBzdHJpbmc7XHJcbiAgICBJZGVudGl0eTogc3RyaW5nO1xyXG4gICAgSWRlbnRpdHlWYWx1ZTogbnVtYmVyO1xyXG4gICAgU3RvcmVUaW1lOiBzdHJpbmc7XHJcbiAgICB2aWRlb0JlZm9yZVRpbWU6IG51bWJlcjtcclxuICAgIHZpZGVvQWZ0ZXJUaW1lOiBudW1iZXI7XHJcbiAgICBzaW1pbGFyaXR5TWF4OiBudW1iZXIgPSAxMDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgc3lzdGVtU2VydmljZTogSVN5c3RlbVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHN5c3RlbUluZm9DYWNoZUZhY3Rvcnk6IElTeXN0ZW1JbmZvQ2FjaGVQcm92aWRlcixcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXJEZWM6IElMYXllckRlYykge1xyXG4gICAgICAgIC8vIOWIh+aNouaMiemSrlxyXG4gICAgICAgICRzY29wZS5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAkc2NvcGUub25PZmYgPSB0cnVlO1xyXG4gICAgICAgICRzY29wZS55ZXNObyA9IHRydWU7XHJcbiAgICAgICAgJHNjb3BlLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1vZHVsZU5hbWUgPSBcIuezu+e7n+WPguaVsOmFjee9rueVjOmdolwiO1xyXG4gICAgICAgIC8v6I635Y+W5Zyw5Zu+5pyN5Yqh5pWw5o2uXHJcbiAgICAgICAgdGhpcy5nZXRTeXN0ZW1EYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTeXN0ZW1EYXRhKCkge1xyXG4gICAgICAgIHRoaXMuc3lzdGVtU2VydmljZS5nZXRTeXN0ZW1EYXRhKCkudGhlbigocmVzOiBSZXNwb25zZVJlc3VsdDxTeXN0ZW1Db25maWdQYXJhbXM+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICgocmVzLmNvZGUgPT09IDIwMCkgJiYgKHJlcy5kYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zeXN0ZW1EYXRhID0gYW5ndWxhci5jb3B5KHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3lzdGVtSW5mb0NhY2hlRmFjdG9yeS5zZXRTeXN0ZW1JbmZvKHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3lzdGVtRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBBbGFybVBob3RvTnVtOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFBob3RvRmluZDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBJZGVudGl0eTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBJZGVudGl0eVZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFN0b3JlVGltZTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICB2aWRlb0JlZm9yZVRpbWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlkZW9BZnRlclRpbWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzYzogXCJcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3VibWl0TGlzdCgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5zeXN0ZW1TZXJ2aWNlLmVkaXRTeXN0ZW1EYXRhKHNlbGYuc3lzdGVtRGF0YSkudGhlbigocmVzOiBSZXNwb25zZVJlc3VsdDxudWxsPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEgJiYgcmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sYXllckRlYy5pbmZvKCfnvJbovpHmiJDlip8nKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuZ2V0U3lzdGVtRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zeXN0ZW1JbmZvQ2FjaGVGYWN0b3J5LnNldFN5c3RlbUluZm8oc2VsZi5zeXN0ZW1EYXRhKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMuaW5mbygn57yW6L6R5aSx6LSlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcihcInN5c3RlbVByb3BlcnRpZXNDb250cm9sbGVyXCIsIFN5c3RlbVByb3BlcnRpZXNDb25maWdDb250cm9sbGVyKTsiXX0=
