define(["require", "exports", "../../common/app/main.app", "../../../core/enum/LayerType", "../../../core/enum/ObjectType", "css!./style/index.css"], function (require, exports, main_app_1, LayerType_1, ObjectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LampPostPointController = (function () {
        function LampPostPointController($scope, $timeout, mylayer) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.mylayer = mylayer;
            this.position = this.$scope.position;
            this.deviceList = this.$scope.deviceList;
        }
        LampPostPointController.prototype.close = function () {
            this.mylayer.close(this.$scope.layerId);
        };
        LampPostPointController.prototype.selectChild = function (item) {
            var marker = this.$scope.marker;
            var info = item;
            switch (item.iconType) {
                case "carCamera":
                    item.LayerType = LayerType_1.LayerType.CarCamera.value, item.ObjectType = ObjectType_1.ObjectType.Camera.value;
                    break;
                case "car":
                    item.LayerType = LayerType_1.LayerType.CarCamera.value, item.ObjectType = ObjectType_1.ObjectType.Camera.value;
                    break;
                case "face":
                    item.LayerType = LayerType_1.LayerType.PortraitCamera.value, item.ObjectType = ObjectType_1.ObjectType.Camera.value;
                    break;
                case "faceCamera":
                    item.LayerType = LayerType_1.LayerType.FaceCamera.value, item.ObjectType = ObjectType_1.ObjectType.Camera.value;
                    break;
                case "camera":
                    item.LayerType = LayerType_1.LayerType.Camera.value, item.ObjectType = ObjectType_1.ObjectType.Camera.value;
                    break;
                case "hd":
                    item.LayerType = LayerType_1.LayerType.HighCamera.value, item.ObjectType = ObjectType_1.ObjectType.Camera.value;
                    break;
                case "wifi":
                    item.LayerType = LayerType_1.LayerType.WiFi.value, item.ObjectType = ObjectType_1.ObjectType.Wifi.value;
                    break;
                case "efence":
                    item.LayerType = LayerType_1.LayerType.ElectronicFence.value, item.ObjectType = ObjectType_1.ObjectType.ElectronicFence.value;
                    break;
            }
            item.ObjectID = item.ID;
            item.Lon = marker.location.lon;
            item.Lat = marker.location.lat;
            this.mylayer.close(this.$scope.layerId);
            this.$scope.childClick(item);
        };
        LampPostPointController.$inject = ['$scope', '$timeout', 'mylayer'];
        return LampPostPointController;
    }());
    main_app_1.app.controller('lampPostPointController', LampPostPointController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFwUG9pbnQvbGFtcFBvc3RQb2ludC9sYW1wUG9zdFBvaW50LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBT0E7UUFNSSxpQ0FBb0IsTUFBVyxFQUNYLFFBQWtCLEVBQ2xCLE9BQVk7WUFGWixXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQ1gsYUFBUSxHQUFSLFFBQVEsQ0FBVTtZQUNsQixZQUFPLEdBQVAsT0FBTyxDQUFLO1lBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDckMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUM3QyxDQUFDO1FBRUQsdUNBQUssR0FBTDtZQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUVELDZDQUFXLEdBQVgsVUFBWSxJQUFTO1lBRWpCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ2hDLElBQUksSUFBSSxHQUFRLElBQUksQ0FBQztZQUNyQixNQUFNLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsS0FBSyxXQUFXO29CQUFFLElBQUksQ0FBQyxTQUFTLEdBQUMscUJBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxVQUFVLEdBQUMsdUJBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO29CQUFDLEtBQUssQ0FBQztnQkFDMUcsS0FBSyxLQUFLO29CQUFFLElBQUksQ0FBQyxTQUFTLEdBQUMscUJBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxVQUFVLEdBQUMsdUJBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO29CQUFDLEtBQUssQ0FBQztnQkFDcEcsS0FBSyxNQUFNO29CQUFFLElBQUksQ0FBQyxTQUFTLEdBQUMscUJBQVMsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxVQUFVLEdBQUMsdUJBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO29CQUFDLEtBQUssQ0FBQztnQkFDMUcsS0FBSyxZQUFZO29CQUFFLElBQUksQ0FBQyxTQUFTLEdBQUMscUJBQVMsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxVQUFVLEdBQUMsdUJBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO29CQUFDLEtBQUssQ0FBQztnQkFDNUcsS0FBSyxRQUFRO29CQUFFLElBQUksQ0FBQyxTQUFTLEdBQUMscUJBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxVQUFVLEdBQUMsdUJBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO29CQUFDLEtBQUssQ0FBQztnQkFDcEcsS0FBSyxJQUFJO29CQUFFLElBQUksQ0FBQyxTQUFTLEdBQUMscUJBQVMsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxVQUFVLEdBQUMsdUJBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO29CQUFDLEtBQUssQ0FBQztnQkFDcEcsS0FBSyxNQUFNO29CQUFFLElBQUksQ0FBQyxTQUFTLEdBQUMscUJBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxVQUFVLEdBQUMsdUJBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUFDLEtBQUssQ0FBQztnQkFDOUYsS0FBSyxRQUFRO29CQUFFLElBQUksQ0FBQyxTQUFTLEdBQUMscUJBQVMsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxVQUFVLEdBQUMsdUJBQVUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO29CQUFDLEtBQUssQ0FBQztZQUMxSCxDQUFDO1lBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFuQ00sK0JBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFxQ3ZELDhCQUFDO0tBdENELEFBc0NDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLHlCQUF5QixFQUFFLHVCQUF1QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL21hcFBvaW50L2xhbXBQb3N0UG9pbnQvbGFtcFBvc3RQb2ludC5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnY3NzIS4vc3R5bGUvaW5kZXguY3NzJztcclxuaW1wb3J0IHtMYXllclR5cGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW51bS9MYXllclR5cGUnO1xyXG5pbXBvcnQge09iamVjdFR5cGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW51bS9PYmplY3RUeXBlJztcclxuXHJcbmRlY2xhcmUgbGV0ICQ6IGFueTtcclxuXHJcbmNsYXNzIExhbXBQb3N0UG9pbnRDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnJHRpbWVvdXQnLCAnbXlsYXllciddO1xyXG5cclxuICAgIGRldmljZUxpc3Q6IEFycmF5PGFueT47XHJcbiAgICBwb3NpdGlvbjogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBGdW5jdGlvbixcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbXlsYXllcjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMuJHNjb3BlLnBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMuZGV2aWNlTGlzdCA9IHRoaXMuJHNjb3BlLmRldmljZUxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5teWxheWVyLmNsb3NlKHRoaXMuJHNjb3BlLmxheWVySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdENoaWxkKGl0ZW06IGFueSkge1xyXG4gICAgICAgIC8vIOS8qumAoG1hcmtlclxyXG4gICAgICAgIGxldCBtYXJrZXIgPSB0aGlzLiRzY29wZS5tYXJrZXI7XHJcbiAgICAgICAgbGV0IGluZm86IGFueSA9IGl0ZW07XHJcbiAgICAgICAgc3dpdGNoKGl0ZW0uaWNvblR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImNhckNhbWVyYVwiOiBpdGVtLkxheWVyVHlwZT1MYXllclR5cGUuQ2FyQ2FtZXJhLnZhbHVlLGl0ZW0uT2JqZWN0VHlwZT1PYmplY3RUeXBlLkNhbWVyYS52YWx1ZTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjYXJcIjogaXRlbS5MYXllclR5cGU9TGF5ZXJUeXBlLkNhckNhbWVyYS52YWx1ZSxpdGVtLk9iamVjdFR5cGU9T2JqZWN0VHlwZS5DYW1lcmEudmFsdWU7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZmFjZVwiOiBpdGVtLkxheWVyVHlwZT1MYXllclR5cGUuUG9ydHJhaXRDYW1lcmEudmFsdWUsaXRlbS5PYmplY3RUeXBlPU9iamVjdFR5cGUuQ2FtZXJhLnZhbHVlOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImZhY2VDYW1lcmFcIjogaXRlbS5MYXllclR5cGU9TGF5ZXJUeXBlLkZhY2VDYW1lcmEudmFsdWUsaXRlbS5PYmplY3RUeXBlPU9iamVjdFR5cGUuQ2FtZXJhLnZhbHVlOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNhbWVyYVwiOiBpdGVtLkxheWVyVHlwZT1MYXllclR5cGUuQ2FtZXJhLnZhbHVlLGl0ZW0uT2JqZWN0VHlwZT1PYmplY3RUeXBlLkNhbWVyYS52YWx1ZTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJoZFwiOiBpdGVtLkxheWVyVHlwZT1MYXllclR5cGUuSGlnaENhbWVyYS52YWx1ZSxpdGVtLk9iamVjdFR5cGU9T2JqZWN0VHlwZS5DYW1lcmEudmFsdWU7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwid2lmaVwiOiBpdGVtLkxheWVyVHlwZT1MYXllclR5cGUuV2lGaS52YWx1ZSxpdGVtLk9iamVjdFR5cGU9T2JqZWN0VHlwZS5XaWZpLnZhbHVlOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImVmZW5jZVwiOiBpdGVtLkxheWVyVHlwZT1MYXllclR5cGUuRWxlY3Ryb25pY0ZlbmNlLnZhbHVlLGl0ZW0uT2JqZWN0VHlwZT1PYmplY3RUeXBlLkVsZWN0cm9uaWNGZW5jZS52YWx1ZTsgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGl0ZW0uT2JqZWN0SUQgPSBpdGVtLklEO1xyXG4gICAgICAgIGl0ZW0uTG9uID0gbWFya2VyLmxvY2F0aW9uLmxvbjtcclxuICAgICAgICBpdGVtLkxhdCA9IG1hcmtlci5sb2NhdGlvbi5sYXQ7XHJcbiAgICAgICAgdGhpcy5teWxheWVyLmNsb3NlKHRoaXMuJHNjb3BlLmxheWVySWQpO1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLmNoaWxkQ2xpY2soaXRlbSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignbGFtcFBvc3RQb2ludENvbnRyb2xsZXInLCBMYW1wUG9zdFBvaW50Q29udHJvbGxlcik7Il19
