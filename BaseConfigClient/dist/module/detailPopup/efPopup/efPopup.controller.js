define(["require", "exports", "../../common/app/main.app", "../../../core/enum/QueryParams", "../../../core/server/enum/ResourceType", "../../../core/enum/ObjectType", "css!../style/wifiPopup.css"], function (require, exports, main_app_1, QueryParams_1, ResourceType_1, ObjectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var efPopupController = (function () {
        function efPopupController($scope, $timeout, layer) {
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
        efPopupController.prototype.initParams = function () {
            var self = this;
            self.ambitusInfo = QueryParams_1.AmbitusList();
        };
        efPopupController.prototype.initData = function (num) {
            this.accessRecords = this.accessRecordsList[num];
        };
        efPopupController.prototype.popupUp = function () {
            var self = this;
            this.initData(self.activeRank - 2);
            self.activeRank = self.activeRank - 1;
        };
        efPopupController.prototype.popupDown = function () {
            var self = this;
            this.initData(self.activeRank);
            self.activeRank = self.activeRank + 1;
        };
        efPopupController.prototype.closeLayer = function () {
            this.$scope.closePopup();
        };
        efPopupController.prototype.clickCollect = function () {
            this.$scope.collectFunction(this.accessRecords);
        };
        efPopupController.prototype.clickAnalysis = function () {
            this.$scope.analysisFunction(this.accessRecords);
        };
        efPopupController.prototype.clickSurveillance = function () {
            this.$scope.surveillanceFunction(this.accessRecords);
        };
        efPopupController.prototype.selectAmbitusInfo = function (item) {
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
        efPopupController.prototype.quickSearchAgain = function () {
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
        efPopupController.$inject = ["$scope", "$timeout", "layer"];
        return efPopupController;
    }());
    main_app_1.app.controller("efPopupController", efPopupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvZGV0YWlsUG9wdXAvZWZQb3B1cC9lZlBvcHVwLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBU0E7UUFlSSwyQkFBb0IsTUFBVyxFQUNYLFFBQWEsRUFDYixLQUFVO1lBRlYsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYixVQUFLLEdBQUwsS0FBSyxDQUFLO1lBZDlCLGlCQUFZLEdBQVksSUFBSSxDQUFDO1lBTzdCLHlCQUFvQixHQUFXLEVBQUUsQ0FBQztZQUNsQyxnQkFBVyxHQUFXLEtBQUssQ0FBQztZQUU1QixlQUFVLEdBQVksS0FBSyxDQUFDO1lBS3hCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoQixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDdkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUN4QyxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDO1lBQzdDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBRUQsc0NBQVUsR0FBVjtZQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLHlCQUFXLEVBQUUsQ0FBQztRQUNyQyxDQUFDO1FBR08sb0NBQVEsR0FBaEIsVUFBaUIsR0FBVztZQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyRCxDQUFDO1FBR00sbUNB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LENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0NBQ3hELFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUNyQyxDQUFDO3dCQUNMLENBQUM7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsTUFBTSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7b0JBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDN0IsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDN0IsQ0FBQztRQUNMLENBQUM7UUFuSU0seUJBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFvSXJELHdCQUFDO0tBcklELEFBcUlDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLGlCQUFpQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2RldGFpbFBvcHVwL2VmUG9wdXAvZWZQb3B1cC5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnY3NzIS4uL3N0eWxlL3dpZmlQb3B1cC5jc3MnO1xyXG5cclxuLy8g5Y+C5pWwXHJcbmltcG9ydCB7ZWxlY3Ryb25pYywgY2FyTGllbmNlfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnVtL1F1ZXJ5UmVjb3JkXCI7XHJcbmltcG9ydCB7bXVsdGlwbGVDaG9pY2UsIEFtYml0dXNMaXN0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnVtL1F1ZXJ5UGFyYW1zXCI7XHJcbmltcG9ydCB7UmVzb3VyY2VUeXBlRW51bX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vUmVzb3VyY2VUeXBlXCI7XHJcbmltcG9ydCB7T2JqZWN0VHlwZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnVtL09iamVjdFR5cGUnO1xyXG5cclxuY2xhc3MgZWZQb3B1cENvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbXCIkc2NvcGVcIiwgXCIkdGltZW91dFwiLCBcImxheWVyXCJdO1xyXG5cclxuICAgIHN3aXRjaEJ1dHRvbjogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgYWN0aXZlUmFuazogbnVtYmVyO1xyXG4gICAgdG90YWxSYW5rOiBudW1iZXI7XHJcbiAgICBhY2Nlc3NSZWNvcmRzOiBlbGVjdHJvbmljO1xyXG4gICAgYWNjZXNzUmVjb3Jkc0xpc3Q6IEFycmF5PGVsZWN0cm9uaWM+O1xyXG5cclxuICAgIHF1aWNrU2VhcmNoQWdhaW5UZXh0OiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgYW1iaXR1c1RleHQ6IHN0cmluZyA9IFwiQWxsXCI7XHJcbiAgICBhbWJpdHVzSW5mbzogQXJyYXk8bXVsdGlwbGVDaG9pY2U+O1xyXG4gICAgc2hvd0Zvb3RlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyOiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5hY3RpdmVSYW5rID0gJHNjb3BlLnJhbmsgKyAxO1xyXG4gICAgICAgIHNlbGYudG90YWxSYW5rID0gJHNjb3BlLmFsbExpc3QubGVuZ3RoO1xyXG4gICAgICAgIHNlbGYuYWNjZXNzUmVjb3JkcyA9ICRzY29wZS5hbGxMaXN0WyRzY29wZS5yYW5rXTtcclxuICAgICAgICBzZWxmLmFjY2Vzc1JlY29yZHNMaXN0ID0gJHNjb3BlLmFsbExpc3Q7XHJcbiAgICAgICAgc2VsZi5zaG93Rm9vdGVyID0gJHNjb3BlLnNob3dGb290ZXIgfHwgZmFsc2U7XHJcbiAgICAgICAgc2VsZi5pbml0UGFyYW1zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFBhcmFtcygpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5hbWJpdHVzSW5mbyA9IEFtYml0dXNMaXN0KCk7Ly8g5ZGo6L65XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Yid5aeL5YyW5p+l6K+i5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXREYXRhKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5hY2Nlc3NSZWNvcmRzID0gdGhpcy5hY2Nlc3NSZWNvcmRzTGlzdFtudW1dO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOS4iuS4gOadoeaVsOaNrlxyXG4gICAgcHVibGljIHBvcHVwVXAoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuaW5pdERhdGEoc2VsZi5hY3RpdmVSYW5rIC0gMik7XHJcbiAgICAgICAgc2VsZi5hY3RpdmVSYW5rID0gc2VsZi5hY3RpdmVSYW5rIC0gMTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5LiL5LiA5p2h5pWw5o2uXHJcbiAgICBwdWJsaWMgcG9wdXBEb3duKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLmluaXREYXRhKHNlbGYuYWN0aXZlUmFuayk7XHJcbiAgICAgICAgc2VsZi5hY3RpdmVSYW5rID0gc2VsZi5hY3RpdmVSYW5rICsgMTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDlhbPpl63lvLnmoYZcclxuICAgIHB1YmxpYyBjbG9zZUxheWVyKCkge1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLmNsb3NlUG9wdXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0NvbGxlY3QoKSB7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuY29sbGVjdEZ1bmN0aW9uKHRoaXMuYWNjZXNzUmVjb3Jkcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tBbmFseXNpcygpIHtcclxuICAgICAgICB0aGlzLiRzY29wZS5hbmFseXNpc0Z1bmN0aW9uKHRoaXMuYWNjZXNzUmVjb3Jkcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tTdXJ2ZWlsbGFuY2UoKSB7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuc3VydmVpbGxhbmNlRnVuY3Rpb24odGhpcy5hY2Nlc3NSZWNvcmRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDpgInmi6nlkajovrnmlbDmja5cclxuICAgICAqIEBwYXJhbSB7bXVsdGlwbGVDaG9pY2V9IGl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlbGVjdEFtYml0dXNJbmZvKGl0ZW06IG11bHRpcGxlQ2hvaWNlKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBzZWxmLmFtYml0dXNJbmZvLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgYXJyYXkpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlLmlkID09PSBpdGVtLmlkKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5zdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hbWJpdHVzVGV4dCA9IHZhbHVlLmtleTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlLnN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOS6jOasoeajgOe0olxyXG4gICAgcHVibGljIHF1aWNrU2VhcmNoQWdhaW4oKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBwYXJhbXM6IGFueSA9IHtcclxuICAgICAgICAgICAgXCJrZXl3b3JkXCI6IHNlbGYucXVpY2tTZWFyY2hBZ2FpblRleHQsXHJcbiAgICAgICAgICAgIFwib2JqZWN0VHlwZVwiOiBzZWxmLmFtYml0dXNUZXh0LFxyXG4gICAgICAgICAgICBcImRldmljZUFycklkXCI6IFtdXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgYXJyT2JqZWN0SUQ6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgICAgICBpZiAoc2VsZi5hY2Nlc3NSZWNvcmRzLmRldmljZUluZm8gJiYgc2VsZi5hY2Nlc3NSZWNvcmRzLmRldmljZUluZm8uSnNvblVzZXJEYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCBwb2ludCA9IHtcclxuICAgICAgICAgICAgICAgIGxhdDogc2VsZi5hY2Nlc3NSZWNvcmRzLmRldmljZUluZm8uSnNvblVzZXJEYXRhLlBvaW50LkxhdCxcclxuICAgICAgICAgICAgICAgIGxvbjogc2VsZi5hY2Nlc3NSZWNvcmRzLmRldmljZUluZm8uSnNvblVzZXJEYXRhLlBvaW50LkxvblxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kZW1pdCgnbWFwLXBlcmlwaGVyYWwtaW5mb3JtYXRpb24nLCBwb2ludCxmdW5jdGlvbihyZXM6YW55KSB7XHJcbiAgICAgICAgICAgICAgICByZXMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuYW1iaXR1c1RleHQgPT09IFwiQWxsXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyT2JqZWN0SUQucHVzaCh2YWx1ZS5PYmplY3RJRCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZi5hbWJpdHVzVGV4dCA9PT0gUmVzb3VyY2VUeXBlRW51bVsyXS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUuT2JqZWN0VHlwZSA9PT0gT2JqZWN0VHlwZS5WZWhpY2xlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJPYmplY3RJRC5wdXNoKHZhbHVlLk9iamVjdElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZi5hbWJpdHVzVGV4dCA9PT0gUmVzb3VyY2VUeXBlRW51bVsxXS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUuT2JqZWN0VHlwZSA9PT0gT2JqZWN0VHlwZS5DYW1lcmEudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyck9iamVjdElELnB1c2godmFsdWUuT2JqZWN0SUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxmLmFtYml0dXNUZXh0ID09PSBSZXNvdXJjZVR5cGVFbnVtWzVdLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5PYmplY3RUeXBlID09PSBPYmplY3RUeXBlLldpZmkudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyck9iamVjdElELnB1c2godmFsdWUuT2JqZWN0SUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxmLmFtYml0dXNUZXh0ID09PSBSZXNvdXJjZVR5cGVFbnVtWzddLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5PYmplY3RUeXBlID09PSBPYmplY3RUeXBlLkVsZWN0cm9uaWNGZW5jZS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyT2JqZWN0SUQucHVzaCh2YWx1ZS5PYmplY3RJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHBhcmFtcy5kZXZpY2VBcnJJZCA9IGFyck9iamVjdElEO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLVwiLHBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLiRzY29wZS4kZW1pdCgncXVpY2tTZWFyY2hBZ2FpbicsIHBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLiRzY29wZS5jbG9zZVBvcHVwKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRlbWl0KCdxdWlja1NlYXJjaEFnYWluJywgcGFyYW1zKTtcclxuICAgICAgICAgICAgc2VsZi4kc2NvcGUuY2xvc2VQb3B1cCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoXCJlZlBvcHVwQ29udHJvbGxlclwiLCBlZlBvcHVwQ29udHJvbGxlcik7Il19
