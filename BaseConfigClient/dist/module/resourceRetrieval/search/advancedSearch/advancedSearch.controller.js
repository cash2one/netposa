define(["require", "exports", "../../../common/app/main.app", "./advancedParamsEnum", "./advancedTestEnum", "./adVanceSearchEnum", "./advancedPage/carSearchPage.controller", "./advancedPage/personSearchPage.controller", "./advancedPage/wifiSearchPage.controller", "./advancedPage/EFSearchPage.controller", "./advancedPage/deviceSearchPage.controller", "./advancedPage/positionSearchPage.controller"], function (require, exports, main_app_1, advancedParamsEnum_1, advancedTestEnum_1, adVanceSearchEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AdvancedSearchController = (function () {
        function AdvancedSearchController($scope, $timeout, layer) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.layer = layer;
            this.MockCar = advancedTestEnum_1.MockCarList(16);
            this.MockWifi = advancedTestEnum_1.MockWifiList(28);
            this.MockDevice = advancedTestEnum_1.MockDeviceList(4, "camera");
            this.MockPosition = advancedTestEnum_1.MockPositionList(9);
            this.AdvancedParams = new advancedParamsEnum_1.AdvancedParams();
            this.ModelDataList = adVanceSearchEnum_1.getModelDataList();
            this.FastDataList = adVanceSearchEnum_1.getFastDataList();
            this.SexDataList = adVanceSearchEnum_1.getSexDataList();
            this.GlassesDataList = adVanceSearchEnum_1.getGlassesDataList();
            this.ToteDataList = adVanceSearchEnum_1.getToteDataList();
            this.AgeDataList = adVanceSearchEnum_1.getAgeDataList();
            this.MaskDataList = adVanceSearchEnum_1.getMaskDataList();
            this.ClothesDataList = adVanceSearchEnum_1.getClothesDataList();
            this.HairDataList = adVanceSearchEnum_1.getHairDataList();
            this.CapDataList = adVanceSearchEnum_1.getCapDataList();
            this.ShoesDataList = adVanceSearchEnum_1.getShoesDataList();
            this.VehicleTypeDataList = adVanceSearchEnum_1.getVehicleTypeDataList();
            this.BrandDataList = adVanceSearchEnum_1.getBrandDataList();
            this.ColorDataList = adVanceSearchEnum_1.getColorDataList();
            this.ModelData = adVanceSearchEnum_1.ModelData.all;
            this.FastData = adVanceSearchEnum_1.FastData.selectDay;
            this.SexData = adVanceSearchEnum_1.SexData.all;
            this.GlassesData = adVanceSearchEnum_1.GlassesData.all;
            this.ToteData = adVanceSearchEnum_1.ToteData.all;
            this.AgeData = adVanceSearchEnum_1.AgeData.all;
            this.MaskData = adVanceSearchEnum_1.MaskData.all;
            this.ClothesData = adVanceSearchEnum_1.ClothesData.all;
            this.HairData = adVanceSearchEnum_1.HairData.all;
            this.CapData = adVanceSearchEnum_1.CapData.all;
            this.ShoesData = adVanceSearchEnum_1.ShoesData.all;
            this.VehicleTypeData = adVanceSearchEnum_1.VehicleTypeData.roadster;
            this.BrandData = adVanceSearchEnum_1.BrandData.C;
            this.ColorData = adVanceSearchEnum_1.ColorData.all;
            this.Sacle = 100;
            this.advancedSearchCarUrl = '../module/resourceRetrieval/search/advancedSearch/advancedPage/carSearchPage.html' + "?v=" + new Date().getTime();
            this.initParams();
        }
        AdvancedSearchController.prototype.initParams = function () {
            var self = this;
            self.switchButton = [
                { title: "车辆", iconPath: "../../../images/resourceRetrieval/switch-car.png", name: "car", visible: true },
                {
                    title: "人像",
                    iconPath: "../../../images/resourceRetrieval/switch-person.png",
                    name: "person",
                    visible: false
                },
                {
                    title: "Wi-Fi",
                    iconPath: "../../../images/resourceRetrieval/switch-wifi.png",
                    name: "wifi",
                    visible: false
                },
                {
                    title: "电围",
                    iconPath: "../../../images/resourceRetrieval/switch_electronicfence.png",
                    name: "electronicfence",
                    visible: false
                },
            ];
            self.switchPage = self.switchButton[0];
            var params = new advancedParamsEnum_1.AdvancedParams();
            params.arrCameraId = [];
            params.arrWifiId = [];
            params.arrElectronicFenceId = [];
            self.AdvancedParams = params;
        };
        AdvancedSearchController.prototype.navigationSwitch = function (name) {
            var self = this;
            var switchNav = angular.copy(self.switchButton);
            if (self.switchPage == null || self.switchPage.name !== name) {
                self.$scope.$broadcast("advancedSearch-change", name);
            }
            switchNav.forEach(function (Title) {
                if (Title.name === name) {
                    Title.visible = true;
                    self.switchPage = Title;
                }
                else {
                    Title.visible = false;
                }
            });
            self.switchButton = switchNav;
            self.$scope.$emit('map-clear-draw', "");
        };
        ;
        AdvancedSearchController.prototype.advancedClose = function () {
            this.navigationSwitch("car");
            this.$scope.$broadcast("advancedSearch-change", "all");
        };
        AdvancedSearchController.$inject = ["$scope", "$timeout", "layer"];
        return AdvancedSearchController;
    }());
    main_app_1.app.controller("AdvancedSearchController", AdvancedSearchController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL2FkdmFuY2VkU2VhcmNoL2FkdmFuY2VkU2VhcmNoLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBZ0VBO1FBZ0RJLGtDQUFvQixNQUFXLEVBQ1gsUUFBa0IsRUFDbEIsS0FBVTtZQUZWLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCxhQUFRLEdBQVIsUUFBUSxDQUFVO1lBQ2xCLFVBQUssR0FBTCxLQUFLLENBQUs7WUEzQzlCLFlBQU8sR0FBbUIsOEJBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxQyxhQUFRLEdBQW9CLCtCQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0MsZUFBVSxHQUFzQixpQ0FBYyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM1RCxpQkFBWSxHQUF3QixtQ0FBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV4RCxtQkFBYyxHQUFtQixJQUFJLG1DQUFjLEVBQUUsQ0FBQztZQUN0RCxrQkFBYSxHQUF3QixvQ0FBZ0IsRUFBRSxDQUFDO1lBQ3hELGlCQUFZLEdBQXFDLG1DQUFlLEVBQUUsQ0FBQztZQUNuRSxnQkFBVyxHQUF3QixrQ0FBYyxFQUFFLENBQUM7WUFDcEQsb0JBQWUsR0FBd0Isc0NBQWtCLEVBQUUsQ0FBQztZQUM1RCxpQkFBWSxHQUF3QixtQ0FBZSxFQUFFLENBQUM7WUFDdEQsZ0JBQVcsR0FBd0Isa0NBQWMsRUFBRSxDQUFDO1lBQ3BELGlCQUFZLEdBQXdCLG1DQUFlLEVBQUUsQ0FBQztZQUN0RCxvQkFBZSxHQUF3QixzQ0FBa0IsRUFBRSxDQUFDO1lBQzVELGlCQUFZLEdBQXdCLG1DQUFlLEVBQUUsQ0FBQztZQUN0RCxnQkFBVyxHQUF3QixrQ0FBYyxFQUFFLENBQUM7WUFDcEQsa0JBQWEsR0FBd0Isb0NBQWdCLEVBQUUsQ0FBQztZQUN4RCx3QkFBbUIsR0FBd0IsMENBQXNCLEVBQUUsQ0FBQztZQUNwRSxr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QUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSztnQkFDcEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUN0QixLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztvQkFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBQzVCLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQzFCLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO1lBRTlCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFBQSxDQUFDO1FBRUssZ0RBQWEsR0FBcEI7WUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsdUJBQXVCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0QsQ0FBQztRQXZITSxnQ0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQXdIckQsK0JBQUM7S0F6SEQsQUF5SEMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsMEJBQTBCLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL2FkdmFuY2VkU2VhcmNoL2FkdmFuY2VkU2VhcmNoLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuXHJcbi8vIOaooeWdl1xyXG5pbXBvcnQgXCIuL2FkdmFuY2VkUGFnZS9jYXJTZWFyY2hQYWdlLmNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFwiLi9hZHZhbmNlZFBhZ2UvcGVyc29uU2VhcmNoUGFnZS5jb250cm9sbGVyXCI7XHJcbmltcG9ydCBcIi4vYWR2YW5jZWRQYWdlL3dpZmlTZWFyY2hQYWdlLmNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFwiLi9hZHZhbmNlZFBhZ2UvRUZTZWFyY2hQYWdlLmNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFwiLi9hZHZhbmNlZFBhZ2UvZGV2aWNlU2VhcmNoUGFnZS5jb250cm9sbGVyXCI7XHJcbmltcG9ydCBcIi4vYWR2YW5jZWRQYWdlL3Bvc2l0aW9uU2VhcmNoUGFnZS5jb250cm9sbGVyXCI7XHJcblxyXG4vLyDlj4LmlbBcclxuaW1wb3J0IHtBZHZhbmNlZFBhcmFtc30gZnJvbSBcIi4vYWR2YW5jZWRQYXJhbXNFbnVtXCI7XHJcbmltcG9ydCB7XHJcbiAgICBNb2NrQ2FyLFxyXG4gICAgTW9ja0Nhckxpc3QsXHJcbiAgICBNb2NrV2lmaSxcclxuICAgIE1vY2tXaWZpTGlzdCxcclxuICAgIE1vY2tEZXZpY2UsXHJcbiAgICBNb2NrRGV2aWNlTGlzdCxcclxuICAgIE1vY2tQb3NpdGlvbixcclxuICAgIE1vY2tQb3NpdGlvbkxpc3RcclxufSBmcm9tIFwiLi9hZHZhbmNlZFRlc3RFbnVtXCI7XHJcbmltcG9ydCB7XHJcbiAgICBFbnVtLFxyXG4gICAgVGltZUxlbmd0aCxcclxuICAgIGdldE1vZGVsRGF0YUxpc3QsXHJcbiAgICBnZXRGYXN0RGF0YUxpc3QsXHJcbiAgICBnZXRTZXhEYXRhTGlzdCxcclxuICAgIGdldEdsYXNzZXNEYXRhTGlzdCxcclxuICAgIGdldFRvdGVEYXRhTGlzdCxcclxuICAgIGdldEFnZURhdGFMaXN0LFxyXG4gICAgZ2V0TWFza0RhdGFMaXN0LFxyXG4gICAgZ2V0Q2xvdGhlc0RhdGFMaXN0LFxyXG4gICAgZ2V0SGFpckRhdGFMaXN0LFxyXG4gICAgZ2V0Q2FwRGF0YUxpc3QsXHJcbiAgICBnZXRTaG9lc0RhdGFMaXN0LFxyXG4gICAgZ2V0VmVoaWNsZVR5cGVEYXRhTGlzdCxcclxuICAgIGdldEJyYW5kRGF0YUxpc3QsXHJcbiAgICBnZXRDb2xvckRhdGFMaXN0LFxyXG4gICAgTW9kZWxEYXRhLFxyXG4gICAgRmFzdERhdGEsXHJcbiAgICBTZXhEYXRhLFxyXG4gICAgR2xhc3Nlc0RhdGEsXHJcbiAgICBBZ2VEYXRhLFxyXG4gICAgTWFza0RhdGEsXHJcbiAgICBDbG90aGVzRGF0YSxcclxuICAgIEhhaXJEYXRhLFxyXG4gICAgQ2FwRGF0YSxcclxuICAgIFNob2VzRGF0YSxcclxuICAgIFRvdGVEYXRhLFxyXG4gICAgVmVoaWNsZVR5cGVEYXRhLFxyXG4gICAgQnJhbmREYXRhLFxyXG4gICAgQ29sb3JEYXRhXHJcbn0gZnJvbSBcIi4vYWRWYW5jZVNlYXJjaEVudW1cIjtcclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuXHJcbmludGVyZmFjZSBTd2ljaFRpdGxlIHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBpY29uUGF0aDogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgdmlzaWJsZTogYm9vbGVhbjtcclxufVxyXG5cclxuY2xhc3MgQWR2YW5jZWRTZWFyY2hDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wiJHNjb3BlXCIsIFwiJHRpbWVvdXRcIiwgXCJsYXllclwiXTtcclxuXHJcbiAgICBzd2l0Y2hCdXR0b246IEFycmF5PFN3aWNoVGl0bGU+O1xyXG4gICAgc3dpdGNoUGFnZTogU3dpY2hUaXRsZTtcclxuXHJcbiAgICAvL+aVsOaNrlxyXG4gICAgTW9ja0NhcjogQXJyYXk8TW9ja0Nhcj4gPSBNb2NrQ2FyTGlzdCgxNik7XHJcbiAgICBNb2NrV2lmaTogQXJyYXk8TW9ja1dpZmk+ID0gTW9ja1dpZmlMaXN0KDI4KTtcclxuICAgIE1vY2tEZXZpY2U6IEFycmF5PE1vY2tEZXZpY2U+ID0gTW9ja0RldmljZUxpc3QoNCwgXCJjYW1lcmFcIik7XHJcbiAgICBNb2NrUG9zaXRpb246IEFycmF5PE1vY2tQb3NpdGlvbj4gPSBNb2NrUG9zaXRpb25MaXN0KDkpO1xyXG5cclxuICAgIEFkdmFuY2VkUGFyYW1zOiBBZHZhbmNlZFBhcmFtcyA9IG5ldyBBZHZhbmNlZFBhcmFtcygpO1xyXG4gICAgTW9kZWxEYXRhTGlzdDogQXJyYXk8RW51bTxzdHJpbmc+PiA9IGdldE1vZGVsRGF0YUxpc3QoKTtcclxuICAgIEZhc3REYXRhTGlzdDogQXJyYXk8RW51bTxzdHJpbmcgfCBUaW1lTGVuZ3RoPj4gPSBnZXRGYXN0RGF0YUxpc3QoKTtcclxuICAgIFNleERhdGFMaXN0OiBBcnJheTxFbnVtPHN0cmluZz4+ID0gZ2V0U2V4RGF0YUxpc3QoKTtcclxuICAgIEdsYXNzZXNEYXRhTGlzdDogQXJyYXk8RW51bTxzdHJpbmc+PiA9IGdldEdsYXNzZXNEYXRhTGlzdCgpO1xyXG4gICAgVG90ZURhdGFMaXN0OiBBcnJheTxFbnVtPHN0cmluZz4+ID0gZ2V0VG90ZURhdGFMaXN0KCk7XHJcbiAgICBBZ2VEYXRhTGlzdDogQXJyYXk8RW51bTxzdHJpbmc+PiA9IGdldEFnZURhdGFMaXN0KCk7XHJcbiAgICBNYXNrRGF0YUxpc3Q6IEFycmF5PEVudW08c3RyaW5nPj4gPSBnZXRNYXNrRGF0YUxpc3QoKTtcclxuICAgIENsb3RoZXNEYXRhTGlzdDogQXJyYXk8RW51bTxzdHJpbmc+PiA9IGdldENsb3RoZXNEYXRhTGlzdCgpO1xyXG4gICAgSGFpckRhdGFMaXN0OiBBcnJheTxFbnVtPHN0cmluZz4+ID0gZ2V0SGFpckRhdGFMaXN0KCk7XHJcbiAgICBDYXBEYXRhTGlzdDogQXJyYXk8RW51bTxzdHJpbmc+PiA9IGdldENhcERhdGFMaXN0KCk7XHJcbiAgICBTaG9lc0RhdGFMaXN0OiBBcnJheTxFbnVtPHN0cmluZz4+ID0gZ2V0U2hvZXNEYXRhTGlzdCgpO1xyXG4gICAgVmVoaWNsZVR5cGVEYXRhTGlzdDogQXJyYXk8RW51bTxzdHJpbmc+PiA9IGdldFZlaGljbGVUeXBlRGF0YUxpc3QoKTtcclxuICAgIEJyYW5kRGF0YUxpc3Q6IEFycmF5PEVudW08c3RyaW5nPj4gPSBnZXRCcmFuZERhdGFMaXN0KCk7XHJcbiAgICBDb2xvckRhdGFMaXN0OiBBcnJheTxFbnVtPHN0cmluZz4+ID0gZ2V0Q29sb3JEYXRhTGlzdCgpO1xyXG4gICAgTW9kZWxEYXRhOiBFbnVtPHN0cmluZz4gPSBNb2RlbERhdGEuYWxsO1xyXG4gICAgRmFzdERhdGE6IEVudW08c3RyaW5nIHwgVGltZUxlbmd0aD4gPSBGYXN0RGF0YS5zZWxlY3REYXk7XHJcbiAgICBTZXhEYXRhOiBFbnVtPHN0cmluZz4gPSBTZXhEYXRhLmFsbDtcclxuICAgIEdsYXNzZXNEYXRhOiBFbnVtPHN0cmluZz4gPSBHbGFzc2VzRGF0YS5hbGw7XHJcbiAgICBUb3RlRGF0YTogRW51bTxzdHJpbmc+ID0gVG90ZURhdGEuYWxsO1xyXG4gICAgQWdlRGF0YTogRW51bTxzdHJpbmc+ID0gQWdlRGF0YS5hbGw7XHJcbiAgICBNYXNrRGF0YTogRW51bTxzdHJpbmc+ID0gTWFza0RhdGEuYWxsO1xyXG4gICAgQ2xvdGhlc0RhdGE6IEVudW08c3RyaW5nPiA9IENsb3RoZXNEYXRhLmFsbDtcclxuICAgIEhhaXJEYXRhOiBFbnVtPHN0cmluZz4gPSBIYWlyRGF0YS5hbGw7XHJcbiAgICBDYXBEYXRhOiBFbnVtPHN0cmluZz4gPSBDYXBEYXRhLmFsbDtcclxuICAgIFNob2VzRGF0YTogRW51bTxzdHJpbmc+ID0gU2hvZXNEYXRhLmFsbDtcclxuICAgIFZlaGljbGVUeXBlRGF0YTogRW51bTxzdHJpbmc+ID0gVmVoaWNsZVR5cGVEYXRhLnJvYWRzdGVyO1xyXG4gICAgQnJhbmREYXRhOiBFbnVtPHN0cmluZz4gPSBCcmFuZERhdGEuQztcclxuICAgIENvbG9yRGF0YTogRW51bTxzdHJpbmc+ID0gQ29sb3JEYXRhLmFsbDtcclxuICAgIFNhY2xlOiBudW1iZXIgPSAxMDA7XHJcbiAgICBjdXJyZW50TGF5ZXJJbmRleDE6IG51bWJlcjtcclxuICAgIGN1cnJlbnRMYXllckluZGV4MjogbnVtYmVyO1xyXG4gICAgY3VycmVudExheWVySW5kZXgzOiBudW1iZXI7XHJcblxyXG4gICAgYWR2YW5jZWRTZWFyY2hDYXJVcmw6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogRnVuY3Rpb24sXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyOiBhbnkpIHtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hZHZhbmNlZFNlYXJjaENhclVybCA9ICcuLi9tb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL2FkdmFuY2VkU2VhcmNoL2FkdmFuY2VkUGFnZS9jYXJTZWFyY2hQYWdlLmh0bWwnICsgXCI/dj1cIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIHRoaXMuaW5pdFBhcmFtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0UGFyYW1zKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgc2VsZi5zd2l0Y2hCdXR0b24gPSBbXHJcbiAgICAgICAgICAgIHt0aXRsZTogXCLovabovoZcIiwgaWNvblBhdGg6IFwiLi4vLi4vLi4vaW1hZ2VzL3Jlc291cmNlUmV0cmlldmFsL3N3aXRjaC1jYXIucG5nXCIsIG5hbWU6IFwiY2FyXCIsIHZpc2libGU6IHRydWV9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLkurrlg49cIixcclxuICAgICAgICAgICAgICAgIGljb25QYXRoOiBcIi4uLy4uLy4uL2ltYWdlcy9yZXNvdXJjZVJldHJpZXZhbC9zd2l0Y2gtcGVyc29uLnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJwZXJzb25cIixcclxuICAgICAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIldpLUZpXCIsXHJcbiAgICAgICAgICAgICAgICBpY29uUGF0aDogXCIuLi8uLi8uLi9pbWFnZXMvcmVzb3VyY2VSZXRyaWV2YWwvc3dpdGNoLXdpZmkucG5nXCIsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIndpZmlcIixcclxuICAgICAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIHt0aXRsZTpcIlJGSURcIixpY29uUGF0aDpcIi4uLy4uLy4uL2ltYWdlcy9yZXNvdXJjZVJldHJpZXZhbC9zd2l0Y2gtcmZpZC5wbmdcIixuYW1lOlwicmZpZFwiLHZpc2libGU6IGZhbHNlfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi55S15Zu0XCIsXHJcbiAgICAgICAgICAgICAgICBpY29uUGF0aDogXCIuLi8uLi8uLi9pbWFnZXMvcmVzb3VyY2VSZXRyaWV2YWwvc3dpdGNoX2VsZWN0cm9uaWNmZW5jZS5wbmdcIixcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZWxlY3Ryb25pY2ZlbmNlXCIsXHJcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyB7dGl0bGU6XCLorr7lpIdcIixpY29uUGF0aDpcIi4uLy4uLy4uL2ltYWdlcy9yZXNvdXJjZVJldHJpZXZhbC9zd2l0Y2gtZGV2aWNlLnBuZ1wiLG5hbWU6XCJkZXZpY2VcIix2aXNpYmxlOiBmYWxzZX0sXHJcbiAgICAgICAgICAgIC8vIHt0aXRsZTpcIuS9jee9rlwiLGljb25QYXRoOlwiLi4vLi4vLi4vaW1hZ2VzL3Jlc291cmNlUmV0cmlldmFsL3N3aXRjaC1wb3NpdGlvbi5wbmdcIixuYW1lOlwicG9zaXRpb25cIix2aXNpYmxlOiBmYWxzZX1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICAvLyDmlbDmja5cclxuICAgICAgICBzZWxmLnN3aXRjaFBhZ2UgPSBzZWxmLnN3aXRjaEJ1dHRvblswXTtcclxuXHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IG5ldyBBZHZhbmNlZFBhcmFtcygpO1xyXG4gICAgICAgIHBhcmFtcy5hcnJDYW1lcmFJZCA9IFtdO1xyXG4gICAgICAgIHBhcmFtcy5hcnJXaWZpSWQgPSBbXTtcclxuICAgICAgICBwYXJhbXMuYXJyRWxlY3Ryb25pY0ZlbmNlSWQgPSBbXTtcclxuICAgICAgICBzZWxmLkFkdmFuY2VkUGFyYW1zID0gcGFyYW1zO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWvvOiIquadoeaMiemSruWIh+aNolxyXG4gICAgcHVibGljIG5hdmlnYXRpb25Td2l0Y2gobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBzd2l0Y2hOYXY6IEFycmF5PFN3aWNoVGl0bGU+ID0gYW5ndWxhci5jb3B5KHNlbGYuc3dpdGNoQnV0dG9uKTtcclxuICAgICAgICAvLyDlr7zoiKrliIfmjaJcclxuICAgICAgICBpZihzZWxmLnN3aXRjaFBhZ2UgPT0gbnVsbCB8fCBzZWxmLnN3aXRjaFBhZ2UubmFtZSAhPT0gbmFtZSkge1xyXG4gICAgICAgICAgICAvLyDlub/mkq3lrZDpobXliIfmjaJcclxuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGJyb2FkY2FzdChcImFkdmFuY2VkU2VhcmNoLWNoYW5nZVwiLCBuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoTmF2LmZvckVhY2goKFRpdGxlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChUaXRsZS5uYW1lID09PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBUaXRsZS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuc3dpdGNoUGFnZSA9IFRpdGxlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgVGl0bGUudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2VsZi5zd2l0Y2hCdXR0b24gPSBzd2l0Y2hOYXY7XHJcblxyXG4gICAgICAgIHNlbGYuJHNjb3BlLiRlbWl0KCdtYXAtY2xlYXItZHJhdycsIFwiXCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgYWR2YW5jZWRDbG9zZSgpIHtcclxuICAgICAgICB0aGlzLm5hdmlnYXRpb25Td2l0Y2goXCJjYXJcIik7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGJyb2FkY2FzdChcImFkdmFuY2VkU2VhcmNoLWNoYW5nZVwiLCBcImFsbFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoXCJBZHZhbmNlZFNlYXJjaENvbnRyb2xsZXJcIiwgQWR2YW5jZWRTZWFyY2hDb250cm9sbGVyKTsiXX0=
