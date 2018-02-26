define(["require", "exports", "text!../Analysis.camera.popup.html", "../../common/app/main.app", "../FaceAnalysis/Face.analysis.service", "../AnalysisEnum", "./MacAlarmEnum", "css!../style/MacAlarm.css", "../../common/services/analysis.service", "../FaceAnalysis/Face.analysis.service", "./../main/analysisMmap.server"], function (require, exports, popupHtml, main_app_1, Face_analysis_service_1, AnalysisEnum_1, MacAlarmEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MacAlarmController = (function () {
        function MacAlarmController($scope, $timeout, faceAnalysisService, analysisService, layer, analysisMmapServer) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.faceAnalysisService = faceAnalysisService;
            this.analysisService = analysisService;
            this.layer = layer;
            this.analysisMmapServer = analysisMmapServer;
            this.$inject = ['$scope', '$rootScope', '$timeout', 'faceAnalysisService', 'analysisService', 'layer', 'analysisMmapServer'];
            this.FastDateList = AnalysisEnum_1.getFastDataList();
            this.FastDate = AnalysisEnum_1.FastData.today;
            this.macAlarmParams = new MacAlarmEnum_1.MacAlarmParams();
            this.isShowDetail = false;
            this.detailLayerWidth = AnalysisEnum_1.getWidowSize().width - 60 - 300;
            this.personAlarmResult = new Face_analysis_service_1.PageParams();
            this.initParams();
            this.$timeout(function () {
                _this.$scope.$emit('showItemPage', true);
            });
            this.$scope.$on('close.camera.popup', function (event, cameraIds) {
                if (Array.isArray(cameraIds)) {
                    _this.macAlarmParams.arrObjectId = cameraIds;
                }
                _this.layer.close(_this.currentLayerIndex);
            });
        }
        MacAlarmController.prototype.initParams = function () {
            this.macAlarmParams.arrObjectId = [];
            this.macAlarmParams.startTime = AnalysisEnum_1.FastData.today.value.startTime;
            this.macAlarmParams.endTime = AnalysisEnum_1.FastData.today.value.endTime;
        };
        MacAlarmController.prototype.setFastDate = function (item) {
            this.FastDate = item;
            this.macAlarmParams.startTime = item.value.startTime;
            this.macAlarmParams.endTime = item.value.endTime;
        };
        MacAlarmController.prototype.goBack = function () {
            var _this = this;
            this.$timeout(function () {
                _this.$scope.$emit('showItemPage', false);
            });
        };
        MacAlarmController.prototype.getCameraListForMap = function (points) {
            var _this = this;
            points.forEach(function (point) {
                var type = point.ObjectType.toLocaleLowerCase();
                if (type === 'wifi' || type === 'electronicfence') {
                    _this.macAlarmParams.arrObjectId.push(point.ObjectID);
                }
            });
            this.macAlarmParams.arrObjectId = AnalysisEnum_1.ArrayUnique(this.macAlarmParams.arrObjectId);
        };
        MacAlarmController.prototype.DrawRect = function () {
            var _this = this;
            this.ClearDraw();
            this.analysisMmapServer.drawRect(function (points) {
                _this.getCameraListForMap(points);
            });
        };
        MacAlarmController.prototype.DrawCircle = function () {
            var _this = this;
            this.ClearDraw();
            this.analysisMmapServer.drawCircle(function (points) {
                _this.getCameraListForMap(points);
            });
        };
        MacAlarmController.prototype.DrawPolygon = function () {
            var _this = this;
            this.ClearDraw();
            this.analysisMmapServer.drawPolygon(function (points) {
                _this.getCameraListForMap(points);
            });
        };
        MacAlarmController.prototype.ClearDraw = function () {
            this.analysisMmapServer.clearDraw();
        };
        MacAlarmController.prototype.getAllResult = function () {
            var _this = this;
            this.analysisService.macAlarm(this.macAlarmParams).then(function (res) {
                if (res.code === 200) {
                    _this.faceAnalysisService.setFaceAnalysisDataList(res.data);
                    _this.$timeout(function () {
                        _this.personAlarmResult.currentPage = 1;
                        _this.personAlarmResult.pageSize = 36;
                        _this.personAlarmResult = _this.faceAnalysisService.getFaceAnalysisDataByPage(_this.personAlarmResult);
                        _this.isShowDetail = true;
                    });
                }
            });
        };
        MacAlarmController.prototype.selectCamera = function () {
            var scope = this.$scope.$new();
            scope.selectCameraList = this.macAlarmParams.arrObjectId;
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: popupHtml,
                scope: scope,
                title: "摄像机选择",
                area: ["710px", "620px"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        MacAlarmController.prototype.closeResult = function () {
            this.isShowDetail = false;
        };
        MacAlarmController.prototype.changeResultPage = function (i) {
            var _this = this;
            this.personAlarmResult.currentPage = i;
            this.$timeout(function () {
                _this.personAlarmResult = _this.faceAnalysisService.getFaceAnalysisDataByPage(_this.personAlarmResult);
            });
        };
        return MacAlarmController;
    }());
    main_app_1.app.controller('MacAlarmController', MacAlarmController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9NYWNBbGFybS9NYWNBbGFybS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWtCQTtRQVVJLDRCQUFvQixNQUFXLEVBQ25CLFFBQWEsRUFDYixtQkFBeUMsRUFDekMsZUFBaUMsRUFDakMsS0FBVSxFQUNWLGtCQUF1QztZQUxuRCxpQkFtQkM7WUFuQm1CLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDbkIsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUNiLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBc0I7WUFDekMsb0JBQWUsR0FBZixlQUFlLENBQWtCO1lBQ2pDLFVBQUssR0FBTCxLQUFLLENBQUs7WUFDVix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXFCO1lBZG5ELFlBQU8sR0FBa0IsQ0FBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxxQkFBcUIsRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztZQUN2SSxpQkFBWSxHQUE0Qiw4QkFBZSxFQUFFLENBQUM7WUFDMUQsYUFBUSxHQUFxQix1QkFBUSxDQUFDLEtBQUssQ0FBQztZQUU1QyxtQkFBYyxHQUFtQixJQUFJLDZCQUFjLEVBQUUsQ0FBQztZQUN0RCxpQkFBWSxHQUFZLEtBQUssQ0FBQztZQUM5QixxQkFBZ0IsR0FBVywyQkFBWSxFQUFFLENBQUMsS0FBSyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7WUFDM0Qsc0JBQWlCLEdBQWUsSUFBSSxrQ0FBVSxFQUFFLENBQUM7WUFTN0MsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1lBRWpCLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ1YsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0JB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LE9BQU8sQ0FBQztnQkFDeEIsR0FBRyxFQUFFO29CQUNELEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDckIsQ0FBQzthQUNKLENBQUMsQ0FBQztRQUNQLENBQUM7UUFDRCx3Q0FBVyxHQUFYO1lBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDOUIsQ0FBQztRQUNELDZDQUFnQixHQUFoQixVQUFpQixDQUFTO1lBQTFCLGlCQUtDO1lBSkcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDVixLQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSSxDQUFDLG1CQUFtQixDQUFDLHlCQUF5QixDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3hHLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUVMLHlCQUFDO0lBQUQsQ0EvSEEsQUErSEMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9NYWNBbGFybS9NYWNBbGFybS5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi9BbmFseXNpcy5jYW1lcmEucG9wdXAuaHRtbFwiIG5hbWU9XCJwb3B1cEh0bWxcIiAvPlxyXG5cclxuaW1wb3J0IHsgYXBwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0ICdjc3MhLi4vc3R5bGUvTWFjQWxhcm0uY3NzJztcclxuaW1wb3J0IHsgTlBHaXNNYXBNYWluIH0gZnJvbSAnLi4vLi4vY29tbW9uL21hcC9tYXAubWFpbic7XHJcbmltcG9ydCB7IFN5c3RlbVBvaW50IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L1N5c3RlbVBvaW50XCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hbmFseXNpcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IElBbmFseXNpc1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FuYWx5c2lzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgSUZhY2VBbmFseXNpc1NlcnZpY2UsIFBhZ2VQYXJhbXMgfSBmcm9tIFwiLi4vRmFjZUFuYWx5c2lzL0ZhY2UuYW5hbHlzaXMuc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuLi9GYWNlQW5hbHlzaXMvRmFjZS5hbmFseXNpcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJlc3BvbnNlUmVzdWx0IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5pbXBvcnQgeyBQZXJzb25BbGFybVJlc3VsdCB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9QZXJzb25BbGFybUVudW1cIjtcclxuaW1wb3J0IHsgSUFuYWx5c2lzTW1hcFNlcnZlciB9IGZyb20gJy4vLi4vbWFpbi9hbmFseXNpc01tYXAuc2VydmVyJztcclxuaW1wb3J0ICcuLy4uL21haW4vYW5hbHlzaXNNbWFwLnNlcnZlcic7XHJcbmltcG9ydCB7IEZhc3REYXRhLCBnZXRGYXN0RGF0YUxpc3QsIEVudW0sIFRpbWVMZW5ndGgsIGdldFdpZG93U2l6ZSwgQXJyYXlVbmlxdWUgfSBmcm9tICcuLi9BbmFseXNpc0VudW0nO1xyXG5pbXBvcnQgeyBNYWNBbGFybVBhcmFtcyB9IGZyb20gXCIuL01hY0FsYXJtRW51bVwiO1xyXG5pbXBvcnQgeyBpbml0IH0gZnJvbSAnZ3VscC1zb3VyY2VtYXBzJztcclxuZGVjbGFyZSBsZXQgJDogYW55LCBwb3B1cEh0bWw6IGFueTtcclxuY2xhc3MgTWFjQWxhcm1Db250cm9sbGVyIHtcclxuICAgICRpbmplY3Q6IEFycmF5PHN0cmluZz4gPSBbJyRzY29wZScsICckcm9vdFNjb3BlJywgJyR0aW1lb3V0JywgJ2ZhY2VBbmFseXNpc1NlcnZpY2UnLCAnYW5hbHlzaXNTZXJ2aWNlJywgJ2xheWVyJywgJ2FuYWx5c2lzTW1hcFNlcnZlciddO1xyXG4gICAgRmFzdERhdGVMaXN0OiBBcnJheTxFbnVtPFRpbWVMZW5ndGg+PiA9IGdldEZhc3REYXRhTGlzdCgpO1xyXG4gICAgRmFzdERhdGU6IEVudW08VGltZUxlbmd0aD4gPSBGYXN0RGF0YS50b2RheTtcclxuICAgIHN5c3RlbVBvaW50TGlzdDogQXJyYXk8U3lzdGVtUG9pbnQ+O1xyXG4gICAgbWFjQWxhcm1QYXJhbXM6IE1hY0FsYXJtUGFyYW1zID0gbmV3IE1hY0FsYXJtUGFyYW1zKCk7XHJcbiAgICBpc1Nob3dEZXRhaWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGRldGFpbExheWVyV2lkdGg6IG51bWJlciA9IGdldFdpZG93U2l6ZSgpLndpZHRoIC0gNjAgLSAzMDA7XHJcbiAgICBwZXJzb25BbGFybVJlc3VsdDogUGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKCk7XHJcbiAgICBjdXJyZW50TGF5ZXJJbmRleDogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBmYWNlQW5hbHlzaXNTZXJ2aWNlOiBJRmFjZUFuYWx5c2lzU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGFuYWx5c2lzU2VydmljZTogSUFuYWx5c2lzU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGxheWVyOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBhbmFseXNpc01tYXBTZXJ2ZXI6IElBbmFseXNpc01tYXBTZXJ2ZXIpIHtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0UGFyYW1zKClcclxuXHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KCdzaG93SXRlbVBhZ2UnLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLiRzY29wZS4kb24oJ2Nsb3NlLmNhbWVyYS5wb3B1cCcsIChldmVudDogYW55LCBjYW1lcmFJZHM6IEFycmF5PHN0cmluZz4pID0+IHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2FtZXJhSWRzKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWNBbGFybVBhcmFtcy5hcnJPYmplY3RJZCA9IGNhbWVyYUlkcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKHRoaXMuY3VycmVudExheWVySW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuICAgIHByaXZhdGUgaW5pdFBhcmFtcygpe1xyXG4gICAgICAgIHRoaXMubWFjQWxhcm1QYXJhbXMuYXJyT2JqZWN0SWQgPSBbXTtcclxuICAgICAgICB0aGlzLm1hY0FsYXJtUGFyYW1zLnN0YXJ0VGltZSA9IEZhc3REYXRhLnRvZGF5LnZhbHVlLnN0YXJ0VGltZTtcclxuICAgICAgICB0aGlzLm1hY0FsYXJtUGFyYW1zLmVuZFRpbWUgPSBGYXN0RGF0YS50b2RheS52YWx1ZS5lbmRUaW1lO1xyXG4gICAgfVxyXG4gICAgc2V0RmFzdERhdGUoaXRlbTogRW51bTxUaW1lTGVuZ3RoPikge1xyXG4gICAgICAgIHRoaXMuRmFzdERhdGUgPSBpdGVtO1xyXG4gICAgICAgIHRoaXMubWFjQWxhcm1QYXJhbXMuc3RhcnRUaW1lID0gaXRlbS52YWx1ZS5zdGFydFRpbWU7XHJcbiAgICAgICAgdGhpcy5tYWNBbGFybVBhcmFtcy5lbmRUaW1lID0gaXRlbS52YWx1ZS5lbmRUaW1lO1xyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCgnc2hvd0l0ZW1QYWdlJywgZmFsc2UpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOWFrOWFseiOt+WPluaRhOWDj+acuklE5pa55rOV77yI5Zyw5Zu+5qGG6YCJ77yJXHJcbiAgICBnZXRDYW1lcmFMaXN0Rm9yTWFwKHBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+KSB7XHJcbiAgICAgICAgcG9pbnRzLmZvckVhY2goKHBvaW50OiBTeXN0ZW1Qb2ludCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdHlwZSA9IHBvaW50Lk9iamVjdFR5cGUudG9Mb2NhbGVMb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgaWYgKHR5cGU9PT0gJ3dpZmknIHx8IHR5cGUgPT09ICdlbGVjdHJvbmljZmVuY2UnICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWNBbGFybVBhcmFtcy5hcnJPYmplY3RJZC5wdXNoKHBvaW50Lk9iamVjdElEKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5tYWNBbGFybVBhcmFtcy5hcnJPYmplY3RJZCA9IEFycmF5VW5pcXVlKHRoaXMubWFjQWxhcm1QYXJhbXMuYXJyT2JqZWN0SWQpO1xyXG4gICAgICAgIC8vdGhpcy5zZWxlY3RDYW1lcmEoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8g55+p5b2i5qGG6YCJXHJcbiAgICBEcmF3UmVjdCgpIHtcclxuICAgICAgICB0aGlzLkNsZWFyRHJhdygpO1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmRyYXdSZWN0KChwb2ludHM6IEFycmF5PFN5c3RlbVBvaW50PikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdldENhbWVyYUxpc3RGb3JNYXAocG9pbnRzKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vVE9ETyDlnIblvaLmoYbpgIlcclxuICAgIERyYXdDaXJjbGUoKSB7XHJcbiAgICAgICAgdGhpcy5DbGVhckRyYXcoKTtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5kcmF3Q2lyY2xlKChwb2ludHM6IEFycmF5PFN5c3RlbVBvaW50PikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdldENhbWVyYUxpc3RGb3JNYXAocG9pbnRzKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOWkmui+ueW9ouahhumAiVxyXG4gICAgRHJhd1BvbHlnb24oKSB7XHJcbiAgICAgICAgdGhpcy5DbGVhckRyYXcoKTtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5kcmF3UG9seWdvbigocG9pbnRzOiBBcnJheTxTeXN0ZW1Qb2ludD4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nZXRDYW1lcmFMaXN0Rm9yTWFwKHBvaW50cylcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyDmuIXmpZrlnLDlm77lvLnmoYZcclxuICAgIENsZWFyRHJhdygpIHtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5jbGVhckRyYXcoKTtcclxuICAgIH1cclxuICAgIGdldEFsbFJlc3VsdCgpIHtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzU2VydmljZS5tYWNBbGFybSh0aGlzLm1hY0FsYXJtUGFyYW1zKS50aGVuKChyZXM6IFJlc3BvbnNlUmVzdWx0PGFueT4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmFjZUFuYWx5c2lzU2VydmljZS5zZXRGYWNlQW5hbHlzaXNEYXRhTGlzdChyZXMuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcnNvbkFsYXJtUmVzdWx0LmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcnNvbkFsYXJtUmVzdWx0LnBhZ2VTaXplID0gMzY7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXJzb25BbGFybVJlc3VsdCA9IHRoaXMuZmFjZUFuYWx5c2lzU2VydmljZS5nZXRGYWNlQW5hbHlzaXNEYXRhQnlQYWdlKHRoaXMucGVyc29uQWxhcm1SZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTaG93RGV0YWlsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG4gICAgc2VsZWN0Q2FtZXJhKCkge1xyXG4gICAgICAgIGxldCBzY29wZTogeyBzZWxlY3RDYW1lcmFMaXN0OiBBcnJheTxzdHJpbmc+LCAkZGVzdHJveTogRnVuY3Rpb24gfSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS5zZWxlY3RDYW1lcmFMaXN0ID0gdGhpcy5tYWNBbGFybVBhcmFtcy5hcnJPYmplY3RJZDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRMYXllckluZGV4ID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgY29udGVudDogcG9wdXBIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIHRpdGxlOiBcIuaRhOWDj+acuumAieaLqVwiLFxyXG4gICAgICAgICAgICBhcmVhOiBbXCI3MTBweFwiLCBcIjYyMHB4XCJdLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGNsb3NlUmVzdWx0KCkge1xyXG4gICAgICAgIHRoaXMuaXNTaG93RGV0YWlsID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjaGFuZ2VSZXN1bHRQYWdlKGk6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucGVyc29uQWxhcm1SZXN1bHQuY3VycmVudFBhZ2UgPSBpO1xyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBlcnNvbkFsYXJtUmVzdWx0ID0gdGhpcy5mYWNlQW5hbHlzaXNTZXJ2aWNlLmdldEZhY2VBbmFseXNpc0RhdGFCeVBhZ2UodGhpcy5wZXJzb25BbGFybVJlc3VsdCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdNYWNBbGFybUNvbnRyb2xsZXInLCBNYWNBbGFybUNvbnRyb2xsZXIpOyJdfQ==
