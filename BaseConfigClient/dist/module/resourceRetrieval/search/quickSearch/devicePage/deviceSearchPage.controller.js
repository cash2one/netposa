define(["require", "exports", "../../../../common/app/main.app", "../../../../../core/enum/LayerType", "../../../../../core/enum/ObjectType", "../../../../common/services/resourceRetrieval.service"], function (require, exports, main_app_1, LayerType_1, ObjectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DeviceSearchPageController = (function () {
        function DeviceSearchPageController($scope, $timeout, mylayer, resourceRetrievalService) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.mylayer = mylayer;
            this.resourceRetrievalService = resourceRetrievalService;
            this.activeType = 'camera';
            this.deviceButton = [
                { title: "摄像机", name: "camera", active: true },
                { title: "卡口", name: "rmpgate", active: false },
                { title: "wifi", name: "wifi", active: false },
                { title: "电围", name: "electronicfence", active: false }
            ];
            this.$scope.$on('$destroy', function () {
                _this.mylayer.destroy();
            });
        }
        DeviceSearchPageController.prototype.deviceSwitch = function (name) {
            this.activeType = name;
            var switchDev = angular.copy(this.deviceButton);
            switchDev.forEach(function (Title) {
                if (Title.name === name) {
                    Title.active = true;
                }
                else {
                    Title.active = false;
                }
            });
            this.deviceButton = switchDev;
        };
        ;
        DeviceSearchPageController.prototype.devicePopup = function (item, type) {
            if (type === "Camera") {
                switch (item.DeviceType) {
                    case "NormalCamera":
                    case "HighCamera":
                        item.LayerType = LayerType_1.LayerType.HighCamera.value, item.ObjectType = ObjectType_1.ObjectType.Camera.value;
                        break;
                    case "PortraitCamera":
                        item.LayerType = LayerType_1.LayerType.PortraitCamera.value, item.ObjectType = ObjectType_1.ObjectType.Camera.value;
                        break;
                    case "FaceCamera":
                        item.LayerType = LayerType_1.LayerType.FaceCamera.value, item.ObjectType = ObjectType_1.ObjectType.Camera.value;
                        break;
                    default: break;
                }
            }
            if (type === "RmpGate") {
                item.LayerType = LayerType_1.LayerType.RmpGate.value;
                item.ObjectType = ObjectType_1.ObjectType.RmpGate.value;
            }
            if (type === "WiFi") {
                item.LayerType = LayerType_1.LayerType.WiFi.value;
                item.ObjectType = ObjectType_1.ObjectType.Wifi.value;
            }
            if (type === "EFENCE") {
                item.LayerType = LayerType_1.LayerType.ElectronicFence.value;
                item.ObjectType = ObjectType_1.ObjectType.ElectronicFence.value;
            }
            this.$scope.$emit('device_popup_layer', item, type);
        };
        DeviceSearchPageController.prototype.findSystemPointById = function (id) {
            this.resourceRetrievalService.findSystemPointById(id).then(function (res) {
                if (res.code == 200 && res.data) {
                }
            });
        };
        DeviceSearchPageController.$inject = ['$scope', '$timeout', 'mylayer', 'resourceRetrievalService'];
        return DeviceSearchPageController;
    }());
    main_app_1.app.controller('deviceSearchPageController', DeviceSearchPageController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL3F1aWNrU2VhcmNoL2RldmljZVBhZ2UvZGV2aWNlU2VhcmNoUGFnZS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQXNCQTtRQUtJLG9DQUNZLE1BQVUsRUFDVixRQUFZLEVBQ1osT0FBVyxFQUNYLHdCQUFtRDtZQUovRCxpQkFpQkM7WUFoQlcsV0FBTSxHQUFOLE1BQU0sQ0FBSTtZQUNWLGFBQVEsR0FBUixRQUFRLENBQUk7WUFDWixZQUFPLEdBQVAsT0FBTyxDQUFJO1lBQ1gsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEyQjtZQU4vRCxlQUFVLEdBQVUsUUFBUSxDQUFDO1lBU3pCLElBQUksQ0FBQyxZQUFZLEdBQUc7Z0JBQ2hCLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsUUFBUSxFQUFFLE1BQU0sRUFBQyxJQUFJLEVBQUM7Z0JBQ3pDLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBQyxLQUFLLEVBQUM7Z0JBQzFDLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBQyxLQUFLLEVBQUM7Z0JBQ3pDLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsaUJBQWlCLEVBQUUsTUFBTSxFQUFDLEtBQUssRUFBQzthQUNyRCxDQUFDO1lBRUYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFDO2dCQUN2QixLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQzFCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUdNLGlEQUFZLEdBQW5CLFVBQW9CLElBQVk7WUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFFdkIsSUFBSSxTQUFTLEdBQXdCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxD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QUcsQ0FBQyxRQUFRLEVBQUcsVUFBVSxFQUFHLFNBQVMsRUFBRywwQkFBMEIsQ0FBQyxDQUFDO1FBMkV0RixpQ0FBQztLQTVFRCxBQTRFQyxJQUFBO0lBQ0QsY0FBRyxDQUFDLFVBQVUsQ0FBQyw0QkFBNEIsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9yZXNvdXJjZVJldHJpZXZhbC9zZWFyY2gvcXVpY2tTZWFyY2gvZGV2aWNlUGFnZS9kZXZpY2VTZWFyY2hQYWdlLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcH0gZnJvbSAnLi4vLi4vLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcCc7XHJcblxyXG4vLyDpq5jnuqfmo4DntKLlj4LmlbBcclxuaW1wb3J0IHsgZGV2aWNlICwgQ29sbGVjdEFkZFBhcmFtcyAsIENvbGxlY3REZWxldGVQYXJhbXMgfSBmcm9tICcuLi8uLi8uLi9yZXNvdXJjZVJldHJpZXZhbEVudW0nO1xyXG5pbXBvcnQge0xheWVyVHlwZX0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vY29yZS9lbnVtL0xheWVyVHlwZSc7XHJcbmltcG9ydCB7T2JqZWN0VHlwZX0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vY29yZS9lbnVtL09iamVjdFR5cGUnO1xyXG5cclxuLy8g5pyN5YqhXHJcbmltcG9ydCAnLi4vLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Jlc291cmNlUmV0cmlldmFsLnNlcnZpY2UnO1xyXG5pbXBvcnQge0lSZXNvdXJjZVJldHJpZXZhbFNlcnZpY2V9IGZyb20gJy4uLy4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9yZXNvdXJjZVJldHJpZXZhbC5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7QmFja1Jlc3BvbnNlQm9keSwgUmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHtDb2xsZWN0RGF0YVR5cGV9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL0NvbGxlY3REYXRhVHlwZVwiO1xyXG5cclxuZGVjbGFyZSBsZXQgYW5ndWxhcjphbnk7XHJcblxyXG5pbnRlcmZhY2UgSURldmljZUJ1dHRvbiB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgYWN0aXZlOiBib29sZWFuO1xyXG59XHJcblxyXG5jbGFzcyBEZXZpY2VTZWFyY2hQYWdlQ29udHJvbGxlcntcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnICwgJyR0aW1lb3V0JyAsICdteWxheWVyJyAsICdyZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UnXTtcclxuICAgIGRldmljZUJ1dHRvbjpBcnJheTxJRGV2aWNlQnV0dG9uPjtcclxuICAgIGFjdGl2ZVR5cGU6c3RyaW5nID0gJ2NhbWVyYSc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSAkc2NvcGU6YW55LFxyXG4gICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6YW55LFxyXG4gICAgICAgIHByaXZhdGUgbXlsYXllcjphbnksXHJcbiAgICAgICAgcHJpdmF0ZSByZXNvdXJjZVJldHJpZXZhbFNlcnZpY2U6IElSZXNvdXJjZVJldHJpZXZhbFNlcnZpY2VcclxuICAgICl7XHJcblxyXG4gICAgICAgIHRoaXMuZGV2aWNlQnV0dG9uID0gW1xyXG4gICAgICAgICAgICB7dGl0bGU6XCLmkYTlg4/mnLpcIiwgbmFtZTpcImNhbWVyYVwiLCBhY3RpdmU6dHJ1ZX0sXHJcbiAgICAgICAgICAgIHt0aXRsZTpcIuWNoeWPo1wiLCBuYW1lOlwicm1wZ2F0ZVwiLCBhY3RpdmU6ZmFsc2V9LFxyXG4gICAgICAgICAgICB7dGl0bGU6XCJ3aWZpXCIsIG5hbWU6XCJ3aWZpXCIsIGFjdGl2ZTpmYWxzZX0sXHJcbiAgICAgICAgICAgIHt0aXRsZTpcIueUteWbtFwiLCBuYW1lOlwiZWxlY3Ryb25pY2ZlbmNlXCIsIGFjdGl2ZTpmYWxzZX1cclxuICAgICAgICBdO1xyXG4gICAgICAgIC8vIGNvbnRyb2xsZXIg6ZSA5q+B5riF6Zmk5by55qGGXHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJG9uKCckZGVzdHJveScsKCk9PntcclxuICAgICAgICAgICAgdGhpcy5teWxheWVyLmRlc3Ryb3koKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6K6+5aSH5oyJ6ZKu5YiH5o2iXHJcbiAgICBwdWJsaWMgZGV2aWNlU3dpdGNoKG5hbWU6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVUeXBlID0gbmFtZTtcclxuXHJcbiAgICAgICAgbGV0IHN3aXRjaERldjpBcnJheTxJRGV2aWNlQnV0dG9uPiA9IGFuZ3VsYXIuY29weSh0aGlzLmRldmljZUJ1dHRvbik7XHJcbiAgICAgICAgc3dpdGNoRGV2LmZvckVhY2goKFRpdGxlKT0+e1xyXG4gICAgICAgICAgICBpZihUaXRsZS5uYW1lID09PSBuYW1lKXtcclxuICAgICAgICAgICAgICAgIFRpdGxlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgVGl0bGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmRldmljZUJ1dHRvbiA9IHN3aXRjaERldjtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOaYvuekuuivpuaDheW8ueahhlxyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGRldmljZVBvcHVwKGl0ZW06ZGV2aWNlLCB0eXBlOiBzdHJpbmcpe1xyXG4gICAgICAgIGlmICh0eXBlID09PSBcIkNhbWVyYVwiKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaChpdGVtLkRldmljZVR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJOb3JtYWxDYW1lcmFcIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJIaWdoQ2FtZXJhXCI6IGl0ZW0uTGF5ZXJUeXBlPUxheWVyVHlwZS5IaWdoQ2FtZXJhLnZhbHVlLGl0ZW0uT2JqZWN0VHlwZT1PYmplY3RUeXBlLkNhbWVyYS52YWx1ZTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiUG9ydHJhaXRDYW1lcmFcIjogaXRlbS5MYXllclR5cGU9TGF5ZXJUeXBlLlBvcnRyYWl0Q2FtZXJhLnZhbHVlLGl0ZW0uT2JqZWN0VHlwZT1PYmplY3RUeXBlLkNhbWVyYS52YWx1ZTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiRmFjZUNhbWVyYVwiOiBpdGVtLkxheWVyVHlwZT1MYXllclR5cGUuRmFjZUNhbWVyYS52YWx1ZSxpdGVtLk9iamVjdFR5cGU9T2JqZWN0VHlwZS5DYW1lcmEudmFsdWU7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IFwiUm1wR2F0ZVwiKSB7XHJcbiAgICAgICAgICAgIGl0ZW0uTGF5ZXJUeXBlPUxheWVyVHlwZS5SbXBHYXRlLnZhbHVlO1xyXG4gICAgICAgICAgICBpdGVtLk9iamVjdFR5cGU9T2JqZWN0VHlwZS5SbXBHYXRlLnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gXCJXaUZpXCIpIHtcclxuICAgICAgICAgICAgaXRlbS5MYXllclR5cGU9TGF5ZXJUeXBlLldpRmkudmFsdWU7XHJcbiAgICAgICAgICAgIGl0ZW0uT2JqZWN0VHlwZT1PYmplY3RUeXBlLldpZmkudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBcIkVGRU5DRVwiKSB7XHJcbiAgICAgICAgICAgIGl0ZW0uTGF5ZXJUeXBlPUxheWVyVHlwZS5FbGVjdHJvbmljRmVuY2UudmFsdWU7XHJcbiAgICAgICAgICAgIGl0ZW0uT2JqZWN0VHlwZT1PYmplY3RUeXBlLkVsZWN0cm9uaWNGZW5jZS52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ2RldmljZV9wb3B1cF9sYXllcicsaXRlbSwgdHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5borr7lpIflnZDmoIdcclxuICAgIHB1YmxpYyBmaW5kU3lzdGVtUG9pbnRCeUlkKGlkOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmZpbmRTeXN0ZW1Qb2ludEJ5SWQoaWQpLnRoZW4oKHJlczpSZXNwb25zZVJlc3VsdDxhbnk+KT0+e1xyXG4gICAgICAgICAgICAgICAgaWYocmVzLmNvZGUgPT0gMjAwICYmIHJlcy5kYXRhKXtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbmFwcC5jb250cm9sbGVyKCdkZXZpY2VTZWFyY2hQYWdlQ29udHJvbGxlcicsIERldmljZVNlYXJjaFBhZ2VDb250cm9sbGVyKTsiXX0=
