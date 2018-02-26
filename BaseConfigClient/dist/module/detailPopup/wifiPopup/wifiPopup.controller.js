define(["require", "exports", "../../common/app/main.app", "../../../core/enum/QueryParams", "../../../core/server/enum/ResourceType", "../../../core/enum/ObjectType", "css!../style/wifiPopup.css"], function (require, exports, main_app_1, QueryParams_1, ResourceType_1, ObjectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var wifiPopupController = (function () {
        function wifiPopupController($scope, $timeout, layer) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.layer = layer;
            this.switchButton = true;
            this.quickSearchAgainText = "";
            this.ambitusText = "All";
            this.showFooter = false;
            var self = this;
            self.activeRank = $scope.rank + 1;
            self.totalRank = $scope.allList.length;
            self.accessRecords = $scope.allList[$scope.rank];
            self.accessRecordsList = $scope.allList;
            self.showFooter = $scope.showFooter || false;
            self.initParams();
        }
        wifiPopupController.prototype.initParams = function () {
            var self = this;
            self.ambitusInfo = QueryParams_1.AmbitusList();
        };
        wifiPopupController.prototype.initData = function (num) {
            this.accessRecords = this.accessRecordsList[num];
        };
        wifiPopupController.prototype.popupUp = function () {
            var self = this;
            this.initData(self.activeRank - 2);
            self.activeRank = self.activeRank - 1;
        };
        wifiPopupController.prototype.popupDown = function () {
            var self = this;
            this.initData(self.activeRank);
            self.activeRank = self.activeRank + 1;
        };
        wifiPopupController.prototype.closeLayer = function () {
            this.$scope.closePopup();
        };
        wifiPopupController.prototype.clickCollect = function () {
            this.$scope.collectFunction(this.accessRecords);
        };
        wifiPopupController.prototype.clickAnalysis = function () {
            this.$scope.analysisFunction(this.accessRecords);
        };
        wifiPopupController.prototype.clickSurveillance = function () {
            this.$scope.surveillanceFunction(this.accessRecords);
        };
        wifiPopupController.prototype.selectAmbitusInfo = function (item) {
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
        wifiPopupController.prototype.quickSearchAgain = function () {
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
        wifiPopupController.$inject = ["$scope", "$timeout", "layer"];
        return wifiPopupController;
    }());
    main_app_1.app.controller("wifiPopupController", wifiPopupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvZGV0YWlsUG9wdXAvd2lmaVBvcHVwL3dpZmlQb3B1cC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVNBO1FBZUksNkJBQW9CLE1BQVcsRUFDWCxRQUFhLEVBQ2IsS0FBVTtZQUZWLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCxhQUFRLEdBQVIsUUFBUSxDQUFLO1lBQ2IsVUFBSyxHQUFMLEtBQUssQ0FBSztZQWQ5QixpQkFBWSxHQUFZLElBQUksQ0FBQztZQU83Qix5QkFBb0IsR0FBVyxFQUFFLENBQUM7WUFDbEMsZ0JBQVcsR0FBVyxLQUFLLENBQUM7WUFFNUIsZUFBVSxHQUFZLEtBQUssQ0FBQztZQUt4QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDeEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQztZQUU3QyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdEIsQ0FBQztRQUVELHdDQUFVLEdBQVY7WUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEIsSUFBSSxDQUFDLFdBQVcsR0FBRyx5QkFBVyxFQUFFLENBQUM7UUFDckMsQ0FBQztRQUdPLHNDQUFRLEdBQWhCLFVBQWlCLEdBQVc7WUFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckQsQ0FBQztRQUdN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QkFBVSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dDQUN4RCxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFDckMsQ0FBQzt3QkFDTCxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO29CQUNILE1BQU0sQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO29CQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBQyxNQUFNLENBQUMsQ0FBQztvQkFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQzlDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQzdCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQzdCLENBQUM7UUFDTCxDQUFDO1FBcElNLDJCQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBc0lyRCwwQkFBQztLQXZJRCxBQXVJQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9kZXRhaWxQb3B1cC93aWZpUG9wdXAvd2lmaVBvcHVwLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0ICdjc3MhLi4vc3R5bGUvd2lmaVBvcHVwLmNzcyc7XHJcblxyXG4vLyDlj4LmlbBcclxuaW1wb3J0IHt3aWZpLCBjYXJMaWVuY2V9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudW0vUXVlcnlSZWNvcmRcIjtcclxuaW1wb3J0IHttdWx0aXBsZUNob2ljZSwgQW1iaXR1c0xpc3R9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudW0vUXVlcnlQYXJhbXNcIjtcclxuaW1wb3J0IHtSZXNvdXJjZVR5cGVFbnVtfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9SZXNvdXJjZVR5cGVcIjtcclxuaW1wb3J0IHtPYmplY3RUeXBlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudW0vT2JqZWN0VHlwZSc7XHJcblxyXG5jbGFzcyB3aWZpUG9wdXBDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wiJHNjb3BlXCIsIFwiJHRpbWVvdXRcIiwgXCJsYXllclwiXTtcclxuXHJcbiAgICBzd2l0Y2hCdXR0b246IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIGFjdGl2ZVJhbms6IG51bWJlcjtcclxuICAgIHRvdGFsUmFuazogbnVtYmVyO1xyXG4gICAgYWNjZXNzUmVjb3Jkczogd2lmaTtcclxuICAgIGFjY2Vzc1JlY29yZHNMaXN0OiBBcnJheTx3aWZpPjtcclxuXHJcbiAgICBxdWlja1NlYXJjaEFnYWluVGV4dDogc3RyaW5nID0gXCJcIjtcclxuICAgIGFtYml0dXNUZXh0OiBzdHJpbmcgPSBcIkFsbFwiO1xyXG4gICAgYW1iaXR1c0luZm86IEFycmF5PG11bHRpcGxlQ2hvaWNlPjtcclxuICAgIHNob3dGb290ZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsYXllcjogYW55KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuYWN0aXZlUmFuayA9ICRzY29wZS5yYW5rICsgMTtcclxuICAgICAgICBzZWxmLnRvdGFsUmFuayA9ICRzY29wZS5hbGxMaXN0Lmxlbmd0aDtcclxuICAgICAgICBzZWxmLmFjY2Vzc1JlY29yZHMgPSAkc2NvcGUuYWxsTGlzdFskc2NvcGUucmFua107XHJcbiAgICAgICAgc2VsZi5hY2Nlc3NSZWNvcmRzTGlzdCA9ICRzY29wZS5hbGxMaXN0O1xyXG4gICAgICAgIHNlbGYuc2hvd0Zvb3RlciA9ICRzY29wZS5zaG93Rm9vdGVyIHx8IGZhbHNlO1xyXG5cclxuICAgICAgICBzZWxmLmluaXRQYXJhbXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0UGFyYW1zKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLmFtYml0dXNJbmZvID0gQW1iaXR1c0xpc3QoKTsvLyDlkajovrlcclxuICAgIH1cclxuXHJcbiAgICAvLyDliJ3lp4vljJbmn6Xor6LmlbDmja5cclxuICAgIHByaXZhdGUgaW5pdERhdGEobnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmFjY2Vzc1JlY29yZHMgPSB0aGlzLmFjY2Vzc1JlY29yZHNMaXN0W251bV07XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5LiK5LiA5p2h5pWw5o2uXHJcbiAgICBwdWJsaWMgcG9wdXBVcCgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5pbml0RGF0YShzZWxmLmFjdGl2ZVJhbmsgLSAyKTtcclxuICAgICAgICBzZWxmLmFjdGl2ZVJhbmsgPSBzZWxmLmFjdGl2ZVJhbmsgLSAxO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyDkuIvkuIDmnaHmlbDmja5cclxuICAgIHB1YmxpYyBwb3B1cERvd24oKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuaW5pdERhdGEoc2VsZi5hY3RpdmVSYW5rKTtcclxuICAgICAgICBzZWxmLmFjdGl2ZVJhbmsgPSBzZWxmLmFjdGl2ZVJhbmsgKyAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWFs+mXreW8ueahhlxyXG4gICAgcHVibGljIGNsb3NlTGF5ZXIoKSB7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuY2xvc2VQb3B1cCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQ29sbGVjdCgpIHtcclxuICAgICAgICB0aGlzLiRzY29wZS5jb2xsZWN0RnVuY3Rpb24odGhpcy5hY2Nlc3NSZWNvcmRzKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0FuYWx5c2lzKCkge1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLmFuYWx5c2lzRnVuY3Rpb24odGhpcy5hY2Nlc3NSZWNvcmRzKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja1N1cnZlaWxsYW5jZSgpIHtcclxuICAgICAgICB0aGlzLiRzY29wZS5zdXJ2ZWlsbGFuY2VGdW5jdGlvbih0aGlzLmFjY2Vzc1JlY29yZHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOmAieaLqeWRqOi+ueaVsOaNrlxyXG4gICAgICogQHBhcmFtIHttdWx0aXBsZUNob2ljZX0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VsZWN0QW1iaXR1c0luZm8oaXRlbTogbXVsdGlwbGVDaG9pY2UpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHNlbGYuYW1iaXR1c0luZm8uZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGluZGV4LCBhcnJheSkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUuaWQgPT09IGl0ZW0uaWQpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlLnN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmFtYml0dXNUZXh0ID0gdmFsdWUua2V5O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuc3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy8g5LqM5qyh5qOA57SiXHJcbiAgICBwdWJsaWMgcXVpY2tTZWFyY2hBZ2FpbigpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHBhcmFtczogYW55ID0ge1xyXG4gICAgICAgICAgICBcImtleXdvcmRcIjogc2VsZi5xdWlja1NlYXJjaEFnYWluVGV4dCxcclxuICAgICAgICAgICAgXCJvYmplY3RUeXBlXCI6IHNlbGYuYW1iaXR1c1RleHQsXHJcbiAgICAgICAgICAgIFwiZGV2aWNlQXJySWRcIjogW11cclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBhcnJPYmplY3RJRDogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgICAgIGlmIChzZWxmLmFjY2Vzc1JlY29yZHMuZGV2aWNlSW5mbyAmJiBzZWxmLmFjY2Vzc1JlY29yZHMuZGV2aWNlSW5mby5Kc29uVXNlckRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IHBvaW50ID0ge1xyXG4gICAgICAgICAgICAgICAgbGF0OiBzZWxmLmFjY2Vzc1JlY29yZHMuZGV2aWNlSW5mby5Kc29uVXNlckRhdGEuUG9pbnQuTGF0LFxyXG4gICAgICAgICAgICAgICAgbG9uOiBzZWxmLmFjY2Vzc1JlY29yZHMuZGV2aWNlSW5mby5Kc29uVXNlckRhdGEuUG9pbnQuTG9uXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRlbWl0KCdtYXAtcGVyaXBoZXJhbC1pbmZvcm1hdGlvbicsIHBvaW50LGZ1bmN0aW9uKHJlczphbnkpIHtcclxuICAgICAgICAgICAgICAgIHJlcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5hbWJpdHVzVGV4dCA9PT0gXCJBbGxcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJPYmplY3RJRC5wdXNoKHZhbHVlLk9iamVjdElEKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxmLmFtYml0dXNUZXh0ID09PSBSZXNvdXJjZVR5cGVFbnVtWzJdLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5PYmplY3RUeXBlID09PSBPYmplY3RUeXBlLlZlaGljbGUudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyck9iamVjdElELnB1c2godmFsdWUuT2JqZWN0SUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxmLmFtYml0dXNUZXh0ID09PSBSZXNvdXJjZVR5cGVFbnVtWzFdLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5PYmplY3RUeXBlID09PSBPYmplY3RUeXBlLkNhbWVyYS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyT2JqZWN0SUQucHVzaCh2YWx1ZS5PYmplY3RJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGYuYW1iaXR1c1RleHQgPT09IFJlc291cmNlVHlwZUVudW1bNV0udmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLk9iamVjdFR5cGUgPT09IE9iamVjdFR5cGUuV2lmaS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyT2JqZWN0SUQucHVzaCh2YWx1ZS5PYmplY3RJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGYuYW1iaXR1c1RleHQgPT09IFJlc291cmNlVHlwZUVudW1bN10udmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLk9iamVjdFR5cGUgPT09IE9iamVjdFR5cGUuRWxlY3Ryb25pY0ZlbmNlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJPYmplY3RJRC5wdXNoKHZhbHVlLk9iamVjdElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zLmRldmljZUFycklkID0gYXJyT2JqZWN0SUQ7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tXCIscGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRlbWl0KCdxdWlja1NlYXJjaEFnYWluJywgcGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuJHNjb3BlLmNsb3NlUG9wdXAoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGVtaXQoJ3F1aWNrU2VhcmNoQWdhaW4nLCBwYXJhbXMpO1xyXG4gICAgICAgICAgICBzZWxmLiRzY29wZS5jbG9zZVBvcHVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoXCJ3aWZpUG9wdXBDb250cm9sbGVyXCIsIHdpZmlQb3B1cENvbnRyb2xsZXIpOyJdfQ==
