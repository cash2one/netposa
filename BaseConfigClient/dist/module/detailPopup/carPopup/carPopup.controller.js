define(["require", "exports", "text!../carRecordPopup/carRecordPopup.html", "text!../../fullPlayPopup/fullPlayPopup.html", "../../common/app/main.app", "../../../core/enum/QueryParams", "../../../core/server/enum/ResourceType", "../../../core/enum/ObjectType", "css!../style/carPopup.css", "../../fullPlayPopup/fullPlayPopup.controller", "../../common/services/resourceRetrieval.service"], function (require, exports, carRecordPopupHtml, fullPlayPopupHtml, main_app_1, QueryParams_1, ResourceType_1, ObjectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CarPopupController = (function () {
        function CarPopupController($scope, $timeout, layer, resourceRetrievalService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.layer = layer;
            this.resourceRetrievalService = resourceRetrievalService;
            this.switchButton = true;
            this.quickSearchAgainText = "";
            this.ambitusText = "All";
            this.showFooter = false;
            var self = this;
            self.activeRank = $scope.rank + 1;
            self.totalRank = $scope.allList.length;
            self.accessRecordsList = $scope.allList;
            self.accessRecords = self.accessRecordsList[$scope.rank];
            self.showFooter = $scope.showFooter || false;
            self.initParams();
        }
        CarPopupController.prototype.initParams = function () {
            var self = this;
            self.ambitusInfo = QueryParams_1.AmbitusList();
        };
        CarPopupController.prototype.initData = function (num) {
            this.accessRecords = this.accessRecordsList[num];
        };
        CarPopupController.prototype.fullScreen = function (path) {
            var scope = this.$scope.$new();
            scope.index = "fullScreenPopup";
            scope.path = path;
            if (path) {
                var contentHTML = "<img ng-src=" + path + " style='width:800px;height:632px;'>";
                this.layer.open({
                    type: 1,
                    title: false,
                    closeBtn: 0,
                    skin: 'layui-layer-nobg no-scroll',
                    shadeClose: true,
                    shade: 0.6,
                    area: ['800px', '632px'],
                    content: contentHTML,
                    scope: scope,
                    end: function () {
                        scope.$destroy();
                    }
                });
            }
            else {
                this.layer.msg("图片地址不存在");
            }
        };
        CarPopupController.prototype.fullPlay = function (item) {
            var scope = this.$scope.$new();
            scope.index = "fullPlayPopup";
            if (this.$scope.cameraInfo) {
                scope.PointDeTail = this.$scope.cameraInfo;
            }
            this.layer.open({
                type: 1,
                skin: 'no-scroll',
                title: ['查看视频', 'font-weight: bold;background-color: #F6F8FB;color: #606060;height: 40px;'],
                area: ['680px', '433px'],
                content: fullPlayPopupHtml,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        };
        CarPopupController.prototype.lookRecordDetail = function () {
            var scope = this.$scope.$new();
            scope.index = "carRecordPopup";
            scope.carDetailArchives = this.carLience;
            this.layer.open({
                content: carRecordPopupHtml,
                ID: scope.index,
                scope: scope,
                AreaAndPosition: {
                    left: 700,
                    top: 200,
                    width: 560,
                    height: 410
                },
                end: function () {
                    scope.$destroy();
                }
            });
        };
        CarPopupController.prototype.popupUp = function () {
            var self = this;
            this.initData(self.activeRank - 2);
            self.activeRank = self.activeRank - 1;
        };
        CarPopupController.prototype.popupDown = function () {
            var self = this;
            this.initData(self.activeRank);
            self.activeRank = self.activeRank + 1;
        };
        CarPopupController.prototype.closeLayer = function () {
            this.$scope.closePopup();
        };
        CarPopupController.prototype.clickCollect = function () {
            this.$scope.collectFunction(this.accessRecords);
        };
        CarPopupController.prototype.clickAnalysis = function () {
            this.$scope.analysisFunction(this.accessRecords);
        };
        CarPopupController.prototype.clickSurveillance = function () {
            this.$scope.surveillanceFunction(this.accessRecords);
        };
        CarPopupController.prototype.selectAmbitusInfo = function (item) {
            var self = this;
            self.ambitusInfo.forEach(function (value, index, array) {
                if (value.id === item.id) {
                    value.status = true;
                    self.ambitusText = value.key;
                }
                else {
                    value.status = false;
                }
            });
        };
        ;
        CarPopupController.prototype.quickSearchAgain = function () {
            var self = this;
            var params = {
                "keyword": self.quickSearchAgainText,
                "objectType": self.ambitusText,
                "deviceArrId": []
            };
            var arrObjectID = [];
            if (self.accessRecords.deviceInfo && self.accessRecords.deviceInfo.JsonUserData) {
                var point = {
                    lat: self.accessRecords.deviceInfo.JsonUserData.Point.Lat,
                    lon: self.accessRecords.deviceInfo.JsonUserData.Point.Lon
                };
                self.$scope.$emit('map-peripheral-information', point, function (res) {
                    res.forEach(function (value, index) {
                        if (self.ambitusText === "All") {
                            arrObjectID.push(value.ObjectID);
                        }
                        else if (self.ambitusText === ResourceType_1.ResourceTypeEnum[2].value) {
                            if (value.ObjectType === ObjectType_1.ObjectType.Vehicle.value) {
                                arrObjectID.push(value.ObjectID);
                            }
                        }
                        else if (self.ambitusText === ResourceType_1.ResourceTypeEnum[1].value) {
                            if (value.ObjectType === ObjectType_1.ObjectType.Camera.value) {
                                arrObjectID.push(value.ObjectID);
                            }
                        }
                        else if (self.ambitusText === ResourceType_1.ResourceTypeEnum[5].value) {
                            if (value.ObjectType === ObjectType_1.ObjectType.Wifi.value) {
                                arrObjectID.push(value.ObjectID);
                            }
                        }
                        else if (self.ambitusText === ResourceType_1.ResourceTypeEnum[7].value) {
                            if (value.ObjectType === ObjectType_1.ObjectType.ElectronicFence.value) {
                                arrObjectID.push(value.ObjectID);
                            }
                        }
                    });
                    params.deviceArrId = arrObjectID;
                    console.log("--------", params);
                    self.$scope.$emit('quickSearchAgain', params);
                    self.$scope.closePopup();
                });
            }
            else {
                self.$scope.$emit('quickSearchAgain', params);
                self.$scope.closePopup();
            }
        };
        CarPopupController.$inject = ["$scope", "$timeout", "layer", "resourceRetrievalService"];
        return CarPopupController;
    }());
    main_app_1.app.controller("carPopupController", CarPopupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvZGV0YWlsUG9wdXAvY2FyUG9wdXAvY2FyUG9wdXAuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFvQkE7UUFnQkksNEJBQW9CLE1BQVcsRUFDWCxRQUFhLEVBQ2IsS0FBVSxFQUNWLHdCQUFtRDtZQUhuRCxXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQ1gsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUNiLFVBQUssR0FBTCxLQUFLLENBQUs7WUFDViw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTJCO1lBaEJ2RSxpQkFBWSxHQUFZLElBQUksQ0FBQztZQVE3Qix5QkFBb0IsR0FBVyxFQUFFLENBQUM7WUFDbEMsZ0JBQVcsR0FBVyxLQUFLLENBQUM7WUFFNUIsZUFBVSxHQUFXLEtBQUssQ0FBQztZQU12QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDO1lBQzdDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBRUQsdUNBQVUsR0FBVjtZQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLHlCQUFXLEVBQUUsQ0FBQztRQUNyQyxDQUFDO1FBR08scUNBQVEsR0FBaEIsVUFBaUIsR0FBVztZQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUks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LFFBQVEsQ0FBQyxDQUFDOzRCQUNyQyxDQUFDO3dCQUNMLENBQUM7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsTUFBTSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7b0JBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDN0IsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDN0IsQ0FBQztRQUNMLENBQUM7UUEzTU0sMEJBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLDBCQUEwQixDQUFDLENBQUM7UUE0TWpGLHlCQUFDO0tBN01ELEFBNk1DLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLG9CQUFvQixFQUFFLGtCQUFrQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2RldGFpbFBvcHVwL2NhclBvcHVwL2NhclBvcHVwLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uL2NhclJlY29yZFBvcHVwL2NhclJlY29yZFBvcHVwLmh0bWxcIiBuYW1lPVwiY2FyUmVjb3JkUG9wdXBIdG1sXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi8uLi9mdWxsUGxheVBvcHVwL2Z1bGxQbGF5UG9wdXAuaHRtbFwiIG5hbWU9XCJmdWxsUGxheVBvcHVwSHRtbFwiIC8+XHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgJ2NzcyEuLi9zdHlsZS9jYXJQb3B1cC5jc3MnO1xyXG5cclxuLy8g5by55qGGXHJcbmltcG9ydCAnLi4vLi4vZnVsbFBsYXlQb3B1cC9mdWxsUGxheVBvcHVwLmNvbnRyb2xsZXInO1xyXG5cclxuLy8g5pyN5YqhXHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Jlc291cmNlUmV0cmlldmFsLnNlcnZpY2UnO1xyXG5pbXBvcnQge0lSZXNvdXJjZVJldHJpZXZhbFNlcnZpY2V9IGZyb20gJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9yZXNvdXJjZVJldHJpZXZhbC5zZXJ2aWNlJztcclxuXHJcbi8vIOWPguaVsFxyXG5pbXBvcnQge2NhciwgY2FyTGllbmNlfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnVtL1F1ZXJ5UmVjb3JkXCI7XHJcbmltcG9ydCB7bXVsdGlwbGVDaG9pY2UsIEFtYml0dXNMaXN0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnVtL1F1ZXJ5UGFyYW1zXCI7XHJcbmltcG9ydCB7UmVzb3VyY2VUeXBlRW51bX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vUmVzb3VyY2VUeXBlXCI7XHJcbmltcG9ydCB7T2JqZWN0VHlwZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnVtL09iamVjdFR5cGUnO1xyXG5cclxuZGVjbGFyZSBsZXQgY2FyUmVjb3JkUG9wdXBIdG1sOiBhbnksIGZ1bGxQbGF5UG9wdXBIdG1sOiBhbnk7XHJcblxyXG5jbGFzcyBDYXJQb3B1cENvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbXCIkc2NvcGVcIiwgXCIkdGltZW91dFwiLCBcImxheWVyXCIsIFwicmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlXCJdO1xyXG5cclxuICAgIHN3aXRjaEJ1dHRvbjogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgYWN0aXZlUmFuazogbnVtYmVyO1xyXG4gICAgdG90YWxSYW5rOiBudW1iZXI7XHJcbiAgICBhY2Nlc3NSZWNvcmRzOiBjYXI7XHJcbiAgICBhY2Nlc3NSZWNvcmRzTGlzdDogQXJyYXk8Y2FyPjtcclxuXHJcbiAgICBjYXJMaWVuY2U6IGNhckxpZW5jZTtcclxuICAgIHF1aWNrU2VhcmNoQWdhaW5UZXh0OiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgYW1iaXR1c1RleHQ6IHN0cmluZyA9IFwiQWxsXCI7XHJcbiAgICBhbWJpdHVzSW5mbzogQXJyYXk8bXVsdGlwbGVDaG9pY2U+O1xyXG4gICAgc2hvd0Zvb3Rlcjpib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXI6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlOiBJUmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLmFjdGl2ZVJhbmsgPSAkc2NvcGUucmFuayArIDE7XHJcbiAgICAgICAgc2VsZi50b3RhbFJhbmsgPSAkc2NvcGUuYWxsTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgc2VsZi5hY2Nlc3NSZWNvcmRzTGlzdCA9ICRzY29wZS5hbGxMaXN0O1xyXG4gICAgICAgIHNlbGYuYWNjZXNzUmVjb3JkcyA9IHNlbGYuYWNjZXNzUmVjb3Jkc0xpc3RbJHNjb3BlLnJhbmtdO1xyXG4gICAgICAgIHNlbGYuc2hvd0Zvb3RlciA9ICRzY29wZS5zaG93Rm9vdGVyIHx8IGZhbHNlO1xyXG4gICAgICAgIHNlbGYuaW5pdFBhcmFtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRQYXJhbXMoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuYW1iaXR1c0luZm8gPSBBbWJpdHVzTGlzdCgpOy8vIOWRqOi+uVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOWIneWni+WMluafpeivouaVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0RGF0YShudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuYWNjZXNzUmVjb3JkcyA9IHRoaXMuYWNjZXNzUmVjb3Jkc0xpc3RbbnVtXTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmn6XnnIvlhajlm75cclxuICAgIHB1YmxpYyBmdWxsU2NyZWVuKHBhdGg6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBzY29wZTogeyBsYXllcjogYW55OyBpbmRleDogc3RyaW5nLCBwYXRoOiBhbnksICRkZXN0cm95OiBGdW5jdGlvbiB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLmluZGV4ID0gXCJmdWxsU2NyZWVuUG9wdXBcIjtcclxuICAgICAgICBzY29wZS5wYXRoID0gcGF0aDtcclxuXHJcbiAgICAgICAgaWYgKHBhdGgpIHtcclxuICAgICAgICAgICAgbGV0IGNvbnRlbnRIVE1MID0gYDxpbWcgbmctc3JjPSR7cGF0aH0gc3R5bGU9J3dpZHRoOjgwMHB4O2hlaWdodDo2MzJweDsnPmA7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNsb3NlQnRuOiAwLFxyXG4gICAgICAgICAgICAgICAgc2tpbjogJ2xheXVpLWxheWVyLW5vYmcgbm8tc2Nyb2xsJyxcclxuICAgICAgICAgICAgICAgIHNoYWRlQ2xvc2U6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzaGFkZTogMC42LFxyXG4gICAgICAgICAgICAgICAgYXJlYTogWyc4MDBweCcsICc2MzJweCddLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogY29udGVudEhUTUwsXHJcbiAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLm1zZyhcIuWbvueJh+WcsOWdgOS4jeWtmOWcqFwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDmn6XnnIvop4bpopFcclxuICAgIHB1YmxpYyBmdWxsUGxheShpdGVtOmFueSkge1xyXG4gICAgICAgIGxldCBzY29wZTogeyBsYXllcjogYW55OyBpbmRleDogc3RyaW5nLCAkZGVzdHJveTogRnVuY3Rpb24sIFBvaW50RGVUYWlsOmFueSB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLmluZGV4ID0gXCJmdWxsUGxheVBvcHVwXCI7XHJcbiAgICAgICAgaWYgKHRoaXMuJHNjb3BlLmNhbWVyYUluZm8pe1xyXG4gICAgICAgICAgICBzY29wZS5Qb2ludERlVGFpbCA9IHRoaXMuJHNjb3BlLmNhbWVyYUluZm87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIHNraW46ICduby1zY3JvbGwnLFxyXG4gICAgICAgICAgICB0aXRsZTogWyfmn6XnnIvop4bpopEnLCAnZm9udC13ZWlnaHQ6IGJvbGQ7YmFja2dyb3VuZC1jb2xvcjogI0Y2RjhGQjtjb2xvcjogIzYwNjA2MDtoZWlnaHQ6IDQwcHg7J10sXHJcbiAgICAgICAgICAgIGFyZWE6IFsnNjgwcHgnLCAnNDMzcHgnXSxcclxuICAgICAgICAgICAgY29udGVudDogZnVsbFBsYXlQb3B1cEh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5p+l55yL5a6M5pW05qGj5qGIXHJcbiAgICBwdWJsaWMgbG9va1JlY29yZERldGFpbCgpIHtcclxuICAgICAgICBsZXQgc2NvcGU6IHsgbGF5ZXI6IGFueTsgaW5kZXg6IHN0cmluZywgJGRlc3Ryb3k6IEZ1bmN0aW9uLCBjYXJEZXRhaWxBcmNoaXZlczogY2FyTGllbmNlIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUuaW5kZXggPSBcImNhclJlY29yZFBvcHVwXCI7XHJcbiAgICAgICAgc2NvcGUuY2FyRGV0YWlsQXJjaGl2ZXMgPSB0aGlzLmNhckxpZW5jZTtcclxuXHJcbiAgICAgICAgdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgY29udGVudDogY2FyUmVjb3JkUG9wdXBIdG1sLFxyXG4gICAgICAgICAgICBJRDogc2NvcGUuaW5kZXgsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgQXJlYUFuZFBvc2l0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0OiA3MDAsXHJcbiAgICAgICAgICAgICAgICB0b3A6IDIwMCxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA1NjAsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDQxMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDkuIrkuIDmnaHmlbDmja5cclxuICAgIHB1YmxpYyBwb3B1cFVwKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLmluaXREYXRhKHNlbGYuYWN0aXZlUmFuayAtIDIpO1xyXG4gICAgICAgIHNlbGYuYWN0aXZlUmFuayA9IHNlbGYuYWN0aXZlUmFuayAtIDE7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5LiL5LiA5p2h5pWw5o2uXHJcbiAgICBwdWJsaWMgcG9wdXBEb3duKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLmluaXREYXRhKHNlbGYuYWN0aXZlUmFuayk7XHJcbiAgICAgICAgc2VsZi5hY3RpdmVSYW5rID0gc2VsZi5hY3RpdmVSYW5rICsgMTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDlhbPpl63lvLnmoYZcclxuICAgIHB1YmxpYyBjbG9zZUxheWVyKCkge1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLmNsb3NlUG9wdXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0NvbGxlY3QoKSB7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuY29sbGVjdEZ1bmN0aW9uKHRoaXMuYWNjZXNzUmVjb3Jkcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tBbmFseXNpcygpIHtcclxuICAgICAgICB0aGlzLiRzY29wZS5hbmFseXNpc0Z1bmN0aW9uKHRoaXMuYWNjZXNzUmVjb3Jkcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tTdXJ2ZWlsbGFuY2UoKSB7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuc3VydmVpbGxhbmNlRnVuY3Rpb24odGhpcy5hY2Nlc3NSZWNvcmRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDpgInmi6nlkajovrnmlbDmja5cclxuICAgICAqIEBwYXJhbSB7UXVlcnlJdGVtfSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZWxlY3RBbWJpdHVzSW5mbyhpdGVtOiBtdWx0aXBsZUNob2ljZSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgc2VsZi5hbWJpdHVzSW5mby5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5pZCA9PT0gaXRlbS5pZCkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuc3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuYW1iaXR1c1RleHQgPSB2YWx1ZS5rZXk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5zdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyDkuozmrKHmo4DntKJcclxuICAgIHB1YmxpYyBxdWlja1NlYXJjaEFnYWluKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgcGFyYW1zOiBhbnkgPSB7XHJcbiAgICAgICAgICAgIFwia2V5d29yZFwiOiBzZWxmLnF1aWNrU2VhcmNoQWdhaW5UZXh0LFxyXG4gICAgICAgICAgICBcIm9iamVjdFR5cGVcIjogc2VsZi5hbWJpdHVzVGV4dCxcclxuICAgICAgICAgICAgXCJkZXZpY2VBcnJJZFwiOiBbXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGFyck9iamVjdElEOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICAgICAgaWYgKHNlbGYuYWNjZXNzUmVjb3Jkcy5kZXZpY2VJbmZvICYmIHNlbGYuYWNjZXNzUmVjb3Jkcy5kZXZpY2VJbmZvLkpzb25Vc2VyRGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgcG9pbnQgPSB7XHJcbiAgICAgICAgICAgICAgICBsYXQ6IHNlbGYuYWNjZXNzUmVjb3Jkcy5kZXZpY2VJbmZvLkpzb25Vc2VyRGF0YS5Qb2ludC5MYXQsXHJcbiAgICAgICAgICAgICAgICBsb246IHNlbGYuYWNjZXNzUmVjb3Jkcy5kZXZpY2VJbmZvLkpzb25Vc2VyRGF0YS5Qb2ludC5Mb25cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGVtaXQoJ21hcC1wZXJpcGhlcmFsLWluZm9ybWF0aW9uJywgcG9pbnQsZnVuY3Rpb24ocmVzOmFueSkge1xyXG4gICAgICAgICAgICAgICAgcmVzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmFtYml0dXNUZXh0ID09PSBcIkFsbFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyck9iamVjdElELnB1c2godmFsdWUuT2JqZWN0SUQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGYuYW1iaXR1c1RleHQgPT09IFJlc291cmNlVHlwZUVudW1bMl0udmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLk9iamVjdFR5cGUgPT09IE9iamVjdFR5cGUuVmVoaWNsZS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyT2JqZWN0SUQucHVzaCh2YWx1ZS5PYmplY3RJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGYuYW1iaXR1c1RleHQgPT09IFJlc291cmNlVHlwZUVudW1bMV0udmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLk9iamVjdFR5cGUgPT09IE9iamVjdFR5cGUuQ2FtZXJhLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJPYmplY3RJRC5wdXNoKHZhbHVlLk9iamVjdElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZi5hbWJpdHVzVGV4dCA9PT0gUmVzb3VyY2VUeXBlRW51bVs1XS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUuT2JqZWN0VHlwZSA9PT0gT2JqZWN0VHlwZS5XaWZpLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJPYmplY3RJRC5wdXNoKHZhbHVlLk9iamVjdElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZi5hbWJpdHVzVGV4dCA9PT0gUmVzb3VyY2VUeXBlRW51bVs3XS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUuT2JqZWN0VHlwZSA9PT0gT2JqZWN0VHlwZS5FbGVjdHJvbmljRmVuY2UudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyck9iamVjdElELnB1c2godmFsdWUuT2JqZWN0SUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMuZGV2aWNlQXJySWQgPSBhcnJPYmplY3RJRDtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS1cIixwYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGVtaXQoJ3F1aWNrU2VhcmNoQWdhaW4nLCBwYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuY2xvc2VQb3B1cCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kZW1pdCgncXVpY2tTZWFyY2hBZ2FpbicsIHBhcmFtcyk7XHJcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLmNsb3NlUG9wdXAoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKFwiY2FyUG9wdXBDb250cm9sbGVyXCIsIENhclBvcHVwQ29udHJvbGxlcik7Il19
