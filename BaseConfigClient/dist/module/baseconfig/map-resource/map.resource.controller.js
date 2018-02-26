define(["require", "exports", "../../common/app/main.app", "../../../core/entity/MapConfigParameter", "../../common/portrait-tool", "css!../style/map-resource.css", "./maplayer.controller", "./mappoint.controller", "../../common/services/map.service"], function (require, exports, main_app_1, MapConfigParameter_1, portrait_tool_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MapResourceController = (function () {
        function MapResourceController($scope, mapService, $timeout) {
            this.$scope = $scope;
            this.mapService = mapService;
            this.$timeout = $timeout;
            this.selectIndex = 1;
            this.mapServerInfo = new MapConfigParameter_1.MapConfigParameterExt();
            this.getMapConfig();
        }
        MapResourceController.prototype.setSelectTab = function (index) {
            if (index !== this.selectIndex) {
                this.selectIndex = index;
            }
        };
        MapResourceController.prototype.getMapConfig = function () {
            var _this = this;
            this.mapService.getMapServerData().then(function (res) {
                if (res.code === 200 && res.data) {
                    _this.mapServerInfo = portrait_tool_1.default.extend({}, _this.mapServerInfo, res.data);
                }
                console.log(_this.mapServerInfo);
            });
        };
        MapResourceController.prototype.save = function () {
            this.mapService.editMapConfig(this.mapServerInfo).then(function (res) {
                if (res.code !== 200) {
                    console.error('保存失败，', res);
                }
            });
        };
        MapResourceController.$inject = ['$scope', 'mapService', '$timeout'];
        return MapResourceController;
    }());
    main_app_1.app.controller("baseConfigMapResourceController", MapResourceController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9tYXAtcmVzb3VyY2UvbWFwLnJlc291cmNlLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBWUE7UUFLSSwrQkFBb0IsTUFBVyxFQUFVLFVBQXVCLEVBQVUsUUFBYTtZQUFuRSxXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBYTtZQUFVLGFBQVEsR0FBUixRQUFRLENBQUs7WUFIdkYsZ0JBQVcsR0FBVyxDQUFDLENBQUM7WUFDeEIsa0JBQWEsR0FBMEIsSUFBSSwwQ0FBcUIsRUFBRSxDQUFDO1lBRy9ELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtRQUN2QixDQUFDO1FBRUQsNENBQVksR0FBWixVQUFhLEtBQWE7WUFDdEIsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUM3QixDQUFDO1FBRUwsQ0FBQztRQUVELDRDQUFZLEdBQVo7WUFBQSxpQkFPQztZQU5HLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUE0QztnQkFDakYsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQy9CLEtBQUksQ0FBQyxhQUFhLEdBQUcsdUJBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMvRSxDQUFDO2dCQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUVELG9DQUFJLEdBQUo7WUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBOEI7Z0JBQ2xGLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDbkIsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUE7Z0JBQy9CLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUE5Qk0sNkJBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7UUErQjFELDRCQUFDO0tBaENELEFBZ0NDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLGlDQUFpQyxFQUFFLHFCQUFxQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2Jhc2Vjb25maWcvbWFwLXJlc291cmNlL21hcC5yZXNvdXJjZS5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCBcImNzcyEuLi9zdHlsZS9tYXAtcmVzb3VyY2UuY3NzXCI7XHJcbmltcG9ydCBcIi4vbWFwbGF5ZXIuY29udHJvbGxlclwiXHJcbmltcG9ydCBcIi4vbWFwcG9pbnQuY29udHJvbGxlclwiO1xyXG5pbXBvcnQge0lNYXBTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL21hcC5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9tYXAuc2VydmljZVwiO1xyXG5pbXBvcnQge01hcENvbmZpZ1BhcmFtZXRlckV4dH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L01hcENvbmZpZ1BhcmFtZXRlclwiO1xyXG5pbXBvcnQge0JhY2tSZXNwb25zZUJvZHl9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IFBvcnRyYWl0VG9vbCBmcm9tIFwiLi4vLi4vY29tbW9uL3BvcnRyYWl0LXRvb2xcIjtcclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuXHJcbmNsYXNzIE1hcFJlc291cmNlQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJywgJ21hcFNlcnZpY2UnLCAnJHRpbWVvdXQnXTtcclxuICAgIHNlbGVjdEluZGV4OiBudW1iZXIgPSAxO1xyXG4gICAgbWFwU2VydmVySW5mbzogTWFwQ29uZmlnUGFyYW1ldGVyRXh0ID0gbmV3IE1hcENvbmZpZ1BhcmFtZXRlckV4dCgpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksIHByaXZhdGUgbWFwU2VydmljZTogSU1hcFNlcnZpY2UsIHByaXZhdGUgJHRpbWVvdXQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZ2V0TWFwQ29uZmlnKClcclxuICAgIH1cclxuXHJcbiAgICBzZXRTZWxlY3RUYWIoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChpbmRleCAhPT0gdGhpcy5zZWxlY3RJbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdEluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRNYXBDb25maWcoKSB7XHJcbiAgICAgICAgdGhpcy5tYXBTZXJ2aWNlLmdldE1hcFNlcnZlckRhdGEoKS50aGVuKChyZXM6IEJhY2tSZXNwb25zZUJvZHk8TWFwQ29uZmlnUGFyYW1ldGVyRXh0PikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCAmJiByZXMuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBTZXJ2ZXJJbmZvID0gUG9ydHJhaXRUb29sLmV4dGVuZCh7fSwgdGhpcy5tYXBTZXJ2ZXJJbmZvLCByZXMuZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5tYXBTZXJ2ZXJJbmZvKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHNhdmUoKSB7XHJcbiAgICAgICAgdGhpcy5tYXBTZXJ2aWNlLmVkaXRNYXBDb25maWcodGhpcy5tYXBTZXJ2ZXJJbmZvKS50aGVuKChyZXM6IEJhY2tSZXNwb25zZUJvZHk8Ym9vbGVhbj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb2RlICE9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+S/neWtmOWksei0pe+8jCcsIHJlcylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKFwiYmFzZUNvbmZpZ01hcFJlc291cmNlQ29udHJvbGxlclwiLCBNYXBSZXNvdXJjZUNvbnRyb2xsZXIpO1xyXG5cclxuXHJcbiJdfQ==
