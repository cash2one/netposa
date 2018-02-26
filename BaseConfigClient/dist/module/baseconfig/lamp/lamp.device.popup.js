define(["require", "exports", "../../common/app/main.app", "../../../core/enum/LayerType", "../../../core/enum/ObjectType", "../../common/app/main.app", "../../common/factory/layerMsg.factory"], function (require, exports, main_app_1, LayerType_1, ObjectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DevicePopupController = (function () {
        function DevicePopupController($scope, $rootScope, lampService, layerDec) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.lampService = lampService;
            this.layerDec = layerDec;
            this.currentEx = {};
            $scope.$on("$destroy", function () {
                console.error("销毁了弹出框");
            });
            this.tHeadDevice = [
                { field: "DeviceName", title: "DP_CONFIG_COMMON_03" },
                { field: "DeviceType", title: "DP_CONFIG_COMMON_88" },
                { field: "DeviceArea", title: "DP_CONFIG_COMMON_09" },
                { field: "bottoms", title: "DP_CONFIG_COMMON_15" }
            ];
            this.currentLamp = $scope.currentLamp;
            this.tBodyDevice = $scope.currentLamp.JsonUserData.Divices;
            console.log(this.tBodyDevice);
            if ($scope.currentLamp.JsonUserData.Point) {
                try {
                    this.currentEx = JSON.parse($scope.currentLamp.JsonUserData.Point.Ext);
                }
                catch (e) {
                    console.log('Ext is not found');
                }
            }
        }
        DevicePopupController.prototype.lampPositon = function (data) {
            var _this = this;
            console.log(data);
            var that = this;
            that.lampService.findSystemPointById(data.ID).then(function (res) {
                if (res && res.data) {
                    var systemPoint = {};
                    systemPoint.ObjectID = _this.currentLamp.ID;
                    systemPoint.LayerType = LayerType_1.LayerType.LampPost.value;
                    systemPoint.ObjectType = ObjectType_1.ObjectType.LampPost.value;
                    systemPoint.Ext = JSON.stringify({ deviceName: data.Name, deviceID: data.ID });
                    systemPoint.Lat = res.data.Lat;
                    systemPoint.Lon = res.data.Lon;
                    that.lampService.updataLampSystemPoint(systemPoint).then(function (res) {
                        if (res && res.data) {
                            that.layerDec.successInfo("\u66F4\u65B0" + _this.currentLamp.Name + "\u5750\u6807\u6210\u529F");
                        }
                        else {
                            that.layerDec.failInfo("\u66F4\u65B0" + _this.currentLamp.Name + "\u5750\u6807\u5931\u8D25");
                        }
                    });
                }
                else {
                    that.layerDec.warnInfo("\u672A\u627E\u5230" + data.Name + "\u7684\u8BBE\u5907\u5750\u6807");
                }
            });
        };
        DevicePopupController.prototype.submit = function () {
            this.$rootScope.$broadcast('lampDevice.closePopup', true);
        };
        DevicePopupController.prototype.deleteLampAndDeviceRalation = function (data) {
            var _this = this;
            var that = this;
            var relation = {};
            relation.ObjectId = this.currentLamp.ID;
            relation.RelatedObjectId = data.ID;
            this.lampService.deleteLampAndDeviceRelation(relation).then(function (res) {
                if (res && res.data) {
                    console.log(_this.tBodyDevice);
                    console.log(data);
                    that.layerDec.successInfo("\u5220\u9664\u5173\u8054\u8BBE\u5907" + data.Name + "\u6210\u529F");
                }
                else {
                    that.layerDec.failInfo("\u5220\u9664\u5173\u8054\u8BBE\u5907" + data.Name + "\u5931\u8D25");
                }
            });
        };
        DevicePopupController.$inject = ['$scope',
            '$rootScope',
            'lampService',
            'layerDec'];
        return DevicePopupController;
    }());
    main_app_1.app.controller('DevicePopupController', DevicePopupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9sYW1wL2xhbXAuZGV2aWNlLnBvcHVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQXlCQTtRQVVJLCtCQUNZLE1BQVcsRUFDWCxVQUFlLEVBQ2YsV0FBd0IsRUFDeEIsUUFBbUI7WUFIbkIsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGVBQVUsR0FBVixVQUFVLENBQUs7WUFDZixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtZQUN4QixhQUFRLEdBQVIsUUFBUSxDQUFXO1lBTC9CLGNBQVMsR0FBTyxFQUFFLENBQUM7WUFPZixNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtnQkFDbkIsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1QixDQUFDLENBQUMsQ0FBQztZQUdILElBQUksQ0FBQyxXQUFXLEdBQUc7Z0JBQ2YsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxxQkFBcUIsRUFBQztnQkFDcEQsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxxQkFBcUIsRUFBQztnQkFDcEQsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxxQkFBcUIsRUFBQztnQkFDcEQsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxxQkFBcUIsRUFBQzthQUNwRCxDQUFDO1lBQ0YsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO1lBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzlCLEVBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFBLENBQUM7Z0JBQ3ZDLElBQUcsQ0FBQztvQkFDQSxJQUFJLENBQUMs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aEYsRUFBRSxDQUFBLENBQUMsR0FBRyxJQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDO29CQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyx5Q0FBUyxJQUFJLENBQUMsSUFBSSxpQkFBSSxDQUFDLENBQUM7Z0JBQ3RELENBQUM7Z0JBQUEsSUFBSSxDQUFBLENBQUM7b0JBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMseUNBQVMsSUFBSSxDQUFDLElBQUksaUJBQUksQ0FBQyxDQUFDO2dCQUNuRCxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBbkZNLDZCQUFPLEdBQUcsQ0FBQyxRQUFRO1lBQ1IsWUFBWTtZQUNaLGFBQWE7WUFDYixVQUFVLENBQUMsQ0FBQztRQWlGbEMsNEJBQUM7S0FyRkQsQUFxRkMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLEVBQUUscUJBQXFCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvYmFzZWNvbmZpZy9sYW1wL2xhbXAuZGV2aWNlLnBvcHVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE3LzMvMjkuXHJcbiAqL1xyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHAnXHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQge1JlbGF0aW9uQ29sLCBSZWxhdGlvbn0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L0RldmljZVJlbGF0aW9uXCI7XHJcbmltcG9ydCB7SVRhYmxlSGVhZGVyfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS91bml0LXRhYmxlL3RhYmxlLXBhcmFtc1wiO1xyXG5pbXBvcnQge0xhbXBFeH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0xhbXBFeFwiO1xyXG5pbXBvcnQge0lMYW1wU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9sYW1wLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtTeXN0ZW1Qb2ludH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L1N5c3RlbVBvaW50XCI7XHJcbmltcG9ydCB7QmFja1Jlc3BvbnNlQm9keSwgUmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHtJTGF5ZXJEZWN9IGZyb20gXCIuLi8uLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcbmltcG9ydCAgXCIuLi8uLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcbmltcG9ydCB7TGF5ZXJUeXBlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudW0vTGF5ZXJUeXBlJztcclxuaW1wb3J0IHtPYmplY3RUeXBlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudW0vT2JqZWN0VHlwZSc7XHJcblxyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcblxyXG5pbnRlcmZhY2UgTGFtcEV4dHtcclxuICAgIENhbWVyYTogQXJyYXk8c3RyaW5nPixcclxuICAgIFJtcEdhdGU6IEFycmF5PHN0cmluZz4sXHJcbiAgICBXSUZJOiBBcnJheTxzdHJpbmc+LFxyXG4gICAgRWxlY3Ryb25pY0ZlbmNlOiBBcnJheTxzdHJpbmc+XHJcbn1cclxuXHJcbmNsYXNzIERldmljZVBvcHVwQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICckcm9vdFNjb3BlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICdsYW1wU2VydmljZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAnbGF5ZXJEZWMnXTtcclxuICAgIHRIZWFkRGV2aWNlOkFycmF5PElUYWJsZUhlYWRlcj47XHJcbiAgICB0Qm9keURldmljZTpBcnJheTxhbnk+O1xyXG4gICAgY3VycmVudExhbXA6IExhbXBFeDtcclxuICAgIGxhbXBQb2ludDogc3RyaW5nO1xyXG4gICAgY3VycmVudEV4OmFueSA9IHt9O1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICBwcml2YXRlICRyb290U2NvcGU6IGFueSxcclxuICAgICAgICBwcml2YXRlIGxhbXBTZXJ2aWNlOklMYW1wU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGxheWVyRGVjOiBJTGF5ZXJEZWNcclxuICAgICkge1xyXG4gICAgICAgICRzY29wZS4kb24oXCIkZGVzdHJveVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLplIDmr4HkuoblvLnlh7rmoYZcIik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIOiuvuWkh+ihqOWktFxyXG4gICAgICAgIHRoaXMudEhlYWREZXZpY2UgPSBbXHJcbiAgICAgICAgICAgIHsgZmllbGQ6IFwiRGV2aWNlTmFtZVwiLCB0aXRsZTogXCJEUF9DT05GSUdfQ09NTU9OXzAzXCJ9LFxyXG4gICAgICAgICAgICB7IGZpZWxkOiBcIkRldmljZVR5cGVcIiwgdGl0bGU6IFwiRFBfQ09ORklHX0NPTU1PTl84OFwifSxcclxuICAgICAgICAgICAgeyBmaWVsZDogXCJEZXZpY2VBcmVhXCIsIHRpdGxlOiBcIkRQX0NPTkZJR19DT01NT05fMDlcIn0sXHJcbiAgICAgICAgICAgIHsgZmllbGQ6IFwiYm90dG9tc1wiLCB0aXRsZTogXCJEUF9DT05GSUdfQ09NTU9OXzE1XCJ9XHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRMYW1wID0gJHNjb3BlLmN1cnJlbnRMYW1wO1xyXG4gICAgICAgIHRoaXMudEJvZHlEZXZpY2UgPSAkc2NvcGUuY3VycmVudExhbXAuSnNvblVzZXJEYXRhLkRpdmljZXM7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy50Qm9keURldmljZSk7XHJcbiAgICAgICAgaWYoJHNjb3BlLmN1cnJlbnRMYW1wLkpzb25Vc2VyRGF0YS5Qb2ludCl7XHJcbiAgICAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRFeCA9IEpTT04ucGFyc2UoJHNjb3BlLmN1cnJlbnRMYW1wLkpzb25Vc2VyRGF0YS5Qb2ludC5FeHQpO1xyXG4gICAgICAgICAgIH1jYXRjaCAoZSl7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFeHQgaXMgbm90IGZvdW5kJylcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5Yy56YWN5Z2Q5qCH5ZKM6K6+5aSHXHJcbiAgICBwdWJsaWMgbGFtcFBvc2l0b24oZGF0YTphbnkpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAgICAgbGV0IHRoYXQ6YW55ID0gdGhpcztcclxuICAgICAgICB0aGF0LmxhbXBTZXJ2aWNlLmZpbmRTeXN0ZW1Qb2ludEJ5SWQoZGF0YS5JRCkudGhlbigocmVzOlJlc3BvbnNlUmVzdWx0PFN5c3RlbVBvaW50Pik9PntcclxuICAgICAgICAgICAgaWYocmVzJiZyZXMuZGF0YSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3lzdGVtUG9pbnQgPSB7fSBhcyBTeXN0ZW1Qb2ludDtcclxuICAgICAgICAgICAgICAgIHN5c3RlbVBvaW50Lk9iamVjdElEID0gdGhpcy5jdXJyZW50TGFtcC5JRDtcclxuICAgICAgICAgICAgICAgIHN5c3RlbVBvaW50LkxheWVyVHlwZSA9IExheWVyVHlwZS5MYW1wUG9zdC52YWx1ZTtcclxuICAgICAgICAgICAgICAgIHN5c3RlbVBvaW50Lk9iamVjdFR5cGUgPSBPYmplY3RUeXBlLkxhbXBQb3N0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgc3lzdGVtUG9pbnQuRXh0ID0gSlNPTi5zdHJpbmdpZnkoe2RldmljZU5hbWU6ZGF0YS5OYW1lLGRldmljZUlEOmRhdGEuSUR9KTtcclxuICAgICAgICAgICAgICAgIHN5c3RlbVBvaW50LkxhdCA9IHJlcy5kYXRhLkxhdDtcclxuICAgICAgICAgICAgICAgIHN5c3RlbVBvaW50LkxvbiA9IHJlcy5kYXRhLkxvbjtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmxhbXBTZXJ2aWNlLnVwZGF0YUxhbXBTeXN0ZW1Qb2ludChzeXN0ZW1Qb2ludCkudGhlbigocmVzOlJlc3BvbnNlUmVzdWx0PGFueT4pPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzJiZyZXMuZGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubGF5ZXJEZWMuc3VjY2Vzc0luZm8oYOabtOaWsCR7dGhpcy5jdXJyZW50TGFtcC5OYW1lfeWdkOagh+aIkOWKn2ApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxheWVyRGVjLmZhaWxJbmZvKGDmm7TmlrAke3RoaXMuY3VycmVudExhbXAuTmFtZX3lnZDmoIflpLHotKVgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoYXQubGF5ZXJEZWMud2FybkluZm8oYOacquaJvuWIsCR7ZGF0YS5OYW1lfeeahOiuvuWkh+WdkOagh2ApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3VibWl0KCl7XHJcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2xhbXBEZXZpY2UuY2xvc2VQb3B1cCcsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZWxldGVMYW1wQW5kRGV2aWNlUmFsYXRpb24oZGF0YTphbnkpe1xyXG4gICAgICAgIGxldCB0aGF0OmFueSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHJlbGF0aW9uID0ge30gYXMgUmVsYXRpb247XHJcbiAgICAgICAgcmVsYXRpb24uT2JqZWN0SWQgPSB0aGlzLmN1cnJlbnRMYW1wLklEO1xyXG4gICAgICAgIHJlbGF0aW9uLlJlbGF0ZWRPYmplY3RJZCA9IGRhdGEuSUQ7XHJcbiAgICAgICAgdGhpcy5sYW1wU2VydmljZS5kZWxldGVMYW1wQW5kRGV2aWNlUmVsYXRpb24ocmVsYXRpb24pLnRoZW4oKHJlczpSZXNwb25zZVJlc3VsdDxhbnk+KT0+e1xyXG4gICAgICAgICAgICBpZihyZXMmJnJlcy5kYXRhKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMudEJvZHlEZXZpY2UpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmxheWVyRGVjLnN1Y2Nlc3NJbmZvKGDliKDpmaTlhbPogZTorr7lpIcke2RhdGEuTmFtZX3miJDlip9gKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmxheWVyRGVjLmZhaWxJbmZvKGDliKDpmaTlhbPogZTorr7lpIcke2RhdGEuTmFtZX3lpLHotKVgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdEZXZpY2VQb3B1cENvbnRyb2xsZXInLCBEZXZpY2VQb3B1cENvbnRyb2xsZXIpOyJdfQ==