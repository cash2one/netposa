define(["require", "exports", "text!../../../../detailPopup/personPopup/personPopup.html", "../../../../common/app/main.app", "../../../../../core/server/enum/CollectDataType", "../../../../../core/server/enum/AnalysisDataType", "../../../../common/services/resourceRetrieval.service", "../../../../common/factory/HandleStorage.factory", "../../../../common/factory/CheckIntelligentAnalysis.factory"], function (require, exports, personPopupHtml, main_app_1, CollectDataType_1, AnalysisDataType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var personSearchPageController = (function () {
        function personSearchPageController($scope, $timeout, layer, resourceRetrievalService, $compile, mylayer, handleStorage, checkIntelligentAnalysis) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.layer = layer;
            this.resourceRetrievalService = resourceRetrievalService;
            this.$compile = $compile;
            this.mylayer = mylayer;
            this.handleStorage = handleStorage;
            this.checkIntelligentAnalysis = checkIntelligentAnalysis;
            this.map = null;
            this.analysisGoTo = AnalysisDataType_1.AnalysisGoToType;
            var self = this;
            self.$scope.$on('$destroy', function () {
                _this.layer.close();
            });
            self.checkFaceTrack = self.checkIntelligentAnalysis.checkFaceTrack();
            self.checkAccompanyingAnalysis = self.checkIntelligentAnalysis.checkAccompanyingAnalysis();
            self.checkFrequencyAnalysis = self.checkIntelligentAnalysis.checkFrequencyAnalysis();
            self.checkAnalysis = self.checkIntelligentAnalysis.checkAnalysis();
        }
        personSearchPageController.prototype.fullScreen = function (path) {
            console.log(123);
            var scope = this.$scope.$new();
            scope.index = "fullScreenPopup";
            scope.path = path;
            if (path) {
                var windowW = $(window).width() * 0.8;
                var windowH = $(window).height() * 0.8;
                var contentHTML = "<img ng-src=" + path + " style='width:" + windowW + "px;height:" + windowH + "px;'>";
                this.layer.open({
                    type: 1,
                    title: false,
                    closeBtn: 0,
                    skin: 'layui-layer-nobg no-scroll',
                    shadeClose: true,
                    shade: 0.6,
                    area: [windowW + 'px', windowH + 'px'],
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
        personSearchPageController.prototype.detailPopup = function (rank, allList) {
            var self = this;
            var scope = self.$scope.$new();
            scope.rank = rank;
            scope.allList = allList;
            scope.collectFunction = function (item) {
                self.clickCollect(item);
            };
            scope.analysisFunction = function (item, type) {
                self.clickAnalysis(item, type);
            };
            scope.surveillanceFunction = function (item) {
                self.clickSurveillance(item);
            };
            scope.closePopup = function () {
                self.layer.close(self.layerIndex);
            };
            self.layer.closeAll();
            self.mylayer.close("mapPoupsBox");
            self.layerIndex = self.layer.open({
                type: 1,
                skin: 'detail-popup-box',
                title: false,
                area: ['600px', '440px'],
                content: personPopupHtml,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        };
        personSearchPageController.prototype.createMapPopup = function (point, data, rank) {
            var _this = this;
            this.newMapWinPopul = this.map.createInfoWindow(114.2826138, 30.2684536, {
                iscommon: true,
                offset: new NPMapLib.Geometry.Size(-82, -248)
            });
            var scope = this.$scope.$new();
            scope.map = this.map;
            scope.windowPopul = this.newMapWinPopul;
            scope.index = "personPopupHtml";
            scope.rank = rank;
            scope.allList = data;
            scope.showTitle = true;
            var dom = $(personPopupHtml).get(0);
            dom = this.$compile(dom.outerHTML)(scope);
            this.$timeout(function () {
                _this.map.openInfoWindow(_this.newMapWinPopul, dom[0], {
                    close: function () {
                        scope.$destroy();
                        _this.map.closeInfoWindow(_this.newMapWinPopul);
                        _this.newMapWinPopul = null;
                    }
                });
            });
        };
        personSearchPageController.prototype.clickCollect = function (item) {
            var self = this;
            if (!item.collectStatus) {
                var params = {
                    json: angular.toJson(item),
                    objectID: item.AccessLog.ID,
                    objectType: CollectDataType_1.CollectDataType.Face.value
                };
                self.resourceRetrievalService.collectAddInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            else {
                var params = {
                    ids: item.AccessLog.ID
                };
                self.resourceRetrievalService.collectDeleteInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            item.collectStatus = !item.collectStatus;
        };
        personSearchPageController.prototype.clickAnalysis = function (item, type) {
            var storageParams = AnalysisDataType_1.AnalysisDataType.Face;
            storageParams.data = item;
            this.handleStorage.setSessionStorageData(storageParams.key, storageParams);
            localStorage.setItem("AnalysisType", "Face");
            if (type === AnalysisDataType_1.AnalysisGoToType.Track.key) {
                window.open(AnalysisDataType_1.AnalysisGoToType.Track.data);
            }
            else if (type === AnalysisDataType_1.AnalysisGoToType.Accompanying.key) {
                window.open(AnalysisDataType_1.AnalysisGoToType.Accompanying.data);
            }
            else if (type === AnalysisDataType_1.AnalysisGoToType.Frequency.key) {
                window.open(AnalysisDataType_1.AnalysisGoToType.Frequency.data);
            }
            else if (type === AnalysisDataType_1.AnalysisGoToType.More.key) {
                window.open(AnalysisDataType_1.AnalysisGoToType.More.data);
            }
        };
        personSearchPageController.prototype.clickSurveillance = function (item) {
            item.surveillanceStatus = !item.surveillanceStatus;
        };
        personSearchPageController.$inject = ["$scope", "$timeout", "layer", "resourceRetrievalService", "$compile", 'mylayer', 'handleStorage', 'checkIntelligentAnalysis'];
        return personSearchPageController;
    }());
    main_app_1.app.controller('personSearchPageController', personSearchPageController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL3F1aWNrU2VhcmNoL2RldmljZVBhZ2UvcGVyc29uU2VhcmNoUGFnZS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQW9CQTtRQVdJLG9DQUFvQixNQUFXLEVBQ1gsUUFBYSxFQUNiLEtBQVUsRUFDVix3QkFBbUQsRUFDbkQsUUFBYSxFQUNiLE9BQVksRUFDWixhQUE2QixFQUM3Qix3QkFBbUQ7WUFQdkUsaUJBcUJDO1lBckJtQixXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQ1gsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUNiLFVBQUssR0FBTCxLQUFLLENBQUs7WUFDViw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTJCO1lBQ25ELGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYixZQUFPLEdBQVAsT0FBTyxDQUFLO1lBQ1osa0JBQWEsR0FBYixhQUFhLENBQWdCO1lBQzdCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMkI7WUFoQnZFLFFBQUcsR0FBaUIsSUFBSSxDQUFDO1lBR3pCLGlCQUFZLEdBQUcsbUNBQWdCLENBQUM7WUFjNUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBS2hCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtnQkFDeEIsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3JFLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMseUJBQXlCLEVBQUUsQ0FBQztZQUMzRixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDckYsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkUsQ0FBQztRQUdNLCtDQUFVLEdBQWpCLFVBQWtCLElBQVk7WUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFJLEtBQUssR0FBaUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM3RixLQUFLLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDO1lBQ2hDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsSUFBSSxPQUFPLEdBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQztnQkFDM0MsSUFBSSxPQUFPLEdBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQztnQkFDNUMsSUFBSSxXQUFXLEdBQUcsaUJBQWUsSUFBSSxzQkFBaUIsT0FBTyxrQkFBYSxPQUFPLFVBQU8sQ0FBQztnQkFDekYsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQ1osSUFBSSxFQUFFLENBQUM7b0JBQ1AsS0FBSyxFQUFFLEtBQUs7b0JBQ1osUUFBUSxFQUFFLENBQUM7b0JBQ1gsSUFBSSxFQUFFLDRCQUE0QjtvQkFDbEMsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLEtBQUssRUFBRSxHQUFHO29CQUNWLElBQUksRUFBRSxDQUFDLE9BQU8sR0FBRyxJQUFJLEVBQUUsT0FBTyxHQUFHLElBQUksQ0FBQztvQkFDdEMsT0FBTyxFQUFFLFdBQVc7b0JBQ3BCLEtBQUssRUFBRSxLQUFLO29CQUNaLEdBQUcsRUFBRTt3QkFDRCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3JCLENBQUM7aUJBQ0osQ0FBQyxDQUFDO1lBQ1AsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQzdCLENBQUM7UUFDTCxDQUFDO1FBT00sZ0RBQVcsR0FBbEIsVUFBbUIsSUFBWSxFQUFFLE9BQW9CO1lBQ2pELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoQixJQUFJLEtBQUssR0FBNEssSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN4TSxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNsQixLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUN4QixLQUFLLENBQUMsZUFBZSxHQUFHLFVBQUMsSUFBVTtnQkFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QixDQUFDLENBQUM7WUFDRixLQUFLLENBQUMsZ0JBQWdCLEdBQUcsVUFBQyxJQUFVLEVBQUUsSUFBWTtnQkFDOUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbkMsQ0FBQyxDQUFDO1lBQ0YsS0FBSyxDQUFDLG9CQUFvQixHQUFHLFVBQUMsSUFBVTtnQkFDcEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQztZQUNGLEtBQUssQ0FBQyxVQUFVLEdBQUc7Z0JBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDOUIsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLGtCQUFrQjtnQkFDeEIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztnQkFDeEIsT0FBTyxFQUFFLGVBQWU7Z0JBQ3hCLEtBQUssRUFBRSxLQUFLO2dCQUNaLEdBQUcsRUFBRTtvQkFDRCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3JCLENBQUM7YUFDSixDQUFDLENBQUM7UUFDUCxDQUFDO1FBT0QsbURBQWMsR0FBZCxVQUFlLEtBQThCLEVBQUUsSUFBUyxFQUFFLElBQVk7WUFBdEUsaUJBd0JDO1lBdkJHLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFO2dCQUNyRSxRQUFRLEVBQUUsSUFBSTtnQkFDZCxNQUFNLEVBQUUsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQzthQUNoRCxDQUFDLENBQUM7WUFDSCxJQUFJLEtBQUssR0FBOEgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMxSixLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDckIsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQ3hDLEtBQUssQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUM7WUFDaEMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDbEIsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDckIsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdkIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDVixLQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDakQsS0FBSyxFQUFFO3dCQUNILEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDakIsS0FBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO3dCQUM5QyxLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztvQkFDL0IsQ0FBQztpQkFDSixDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFNTSxpREFBWSxHQUFuQixVQUFvQixJQUFVO1lBQzFCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLE1BQU0sR0FBcUI7b0JBQzNCLElBQUksRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDMUIsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDM0IsVUFBVSxFQUFFLGlDQUFlLENBQUMsSUFBSSxDQUFDLEtBQUs7aUJBQ3pDLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUM7cUJBQy9DLElBQUksQ0FBQyxVQUFDLEdBQVE7b0JBQ1gsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFFVixDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFBO1lBQ1YsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksTUFBTSxHQUF3QjtvQkFDOUIsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtpQkFDekIsQ0FBQztnQkFDRixJQUFJLENBQUMsd0JBQXdCLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDO3FCQUNsRCxJQUFJLENBQUMsVUFBQyxHQUFRO29CQUNYLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBRVYsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQTtZQUNWLENBQUM7WUFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM3QyxDQUFDO1FBTU0sa0RBQWEsR0FBcEIsVUFBcUIsSUFBVSxFQUFFLElBQVk7WUFDekMsSUFBSSxhQUFhLEdBQTBCLG1DQUFnQixDQUFDLElBQUksQ0FBQztZQUNqRSxhQUFhLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDM0UsWUFBWSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDN0MsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLG1DQUFnQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLG1DQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxtQ0FBZ0IsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDcEQsTUFBTSxDQUFDLElBQUksQ0FBQyxtQ0FBZ0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEQsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssbUNBQWdCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUMsbUNBQWdCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pELENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLG1DQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLG1DQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QyxDQUFDO1FBQ0wsQ0FBQztRQU1NLHNEQUFpQixHQUF4QixVQUF5QixJQUFVO1lBQy9CLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUN2RCxDQUFDO1FBNUxNLGtDQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO1FBNkxySixpQ0FBQztLQTlMRCxBQThMQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyw0QkFBNEIsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9yZXNvdXJjZVJldHJpZXZhbC9zZWFyY2gvcXVpY2tTZWFyY2gvZGV2aWNlUGFnZS9wZXJzb25TZWFyY2hQYWdlLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uLy4uLy4uLy4uL2RldGFpbFBvcHVwL3BlcnNvblBvcHVwL3BlcnNvblBvcHVwLmh0bWxcIiBuYW1lPVwicGVyc29uUG9wdXBIdG1sXCIgLz5cclxuaW1wb3J0IHthcHB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHAnO1xyXG5cclxuLy8g5pyN5YqhXHJcbmltcG9ydCAnLi4vLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Jlc291cmNlUmV0cmlldmFsLnNlcnZpY2UnO1xyXG5pbXBvcnQge0lSZXNvdXJjZVJldHJpZXZhbFNlcnZpY2V9IGZyb20gJy4uLy4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9yZXNvdXJjZVJldHJpZXZhbC5zZXJ2aWNlJztcclxuaW1wb3J0ICcuLi8uLi8uLi8uLi9jb21tb24vZmFjdG9yeS9IYW5kbGVTdG9yYWdlLmZhY3RvcnknO1xyXG5pbXBvcnQge0lIYW5kbGVTdG9yYWdlfSBmcm9tICcuLi8uLi8uLi8uLi9jb21tb24vZmFjdG9yeS9IYW5kbGVTdG9yYWdlLmZhY3RvcnknO1xyXG5pbXBvcnQgJy4uLy4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L0NoZWNrSW50ZWxsaWdlbnRBbmFseXNpcy5mYWN0b3J5JztcclxuaW1wb3J0IHtJQ2hlY2tJbnRlbGxpZ2VudEFuYWx5c2lzfSBmcm9tICcuLi8uLi8uLi8uLi9jb21tb24vZmFjdG9yeS9DaGVja0ludGVsbGlnZW50QW5hbHlzaXMuZmFjdG9yeSc7XHJcblxyXG4vLyDlj4LmlbBcclxuaW1wb3J0IHtmYWNlLCBDb2xsZWN0QWRkUGFyYW1zLCBDb2xsZWN0RGVsZXRlUGFyYW1zfSBmcm9tICcuLi8uLi8uLi9yZXNvdXJjZVJldHJpZXZhbEVudW0nO1xyXG5pbXBvcnQge05QR2lzTWFwTWFpbn0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbW1vbi9tYXAvbWFwLm1haW5cIjtcclxuaW1wb3J0IHtDb2xsZWN0RGF0YVR5cGV9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL0NvbGxlY3REYXRhVHlwZVwiO1xyXG5pbXBvcnQge0FuYWx5c2lzRGF0YVR5cGUsIEFuYWx5c2lzU3RvcmFnZVBhcmFtcywgQW5hbHlzaXNHb1RvVHlwZX0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vQW5hbHlzaXNEYXRhVHlwZVwiO1xyXG5cclxuXHJcbmRlY2xhcmUgbGV0IHBlcnNvblBvcHVwSHRtbDogYW55LCAkOiBhbnksIGFuZ3VsYXI6IGFueTtcclxuXHJcbmNsYXNzIHBlcnNvblNlYXJjaFBhZ2VDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wiJHNjb3BlXCIsIFwiJHRpbWVvdXRcIiwgXCJsYXllclwiLCBcInJlc291cmNlUmV0cmlldmFsU2VydmljZVwiLCBcIiRjb21waWxlXCIsICdteWxheWVyJywgJ2hhbmRsZVN0b3JhZ2UnLCAnY2hlY2tJbnRlbGxpZ2VudEFuYWx5c2lzJ107XHJcbiAgICBtYXA6IE5QR2lzTWFwTWFpbiA9IG51bGw7XHJcbiAgICBuZXdNYXBXaW5Qb3B1bDogc3RyaW5nO1xyXG4gICAgbGF5ZXJJbmRleDogbnVtYmVyO1xyXG4gICAgYW5hbHlzaXNHb1RvID0gQW5hbHlzaXNHb1RvVHlwZTtcclxuICAgIGNoZWNrRmFjZVRyYWNrOiBib29sZWFuO1xyXG4gICAgY2hlY2tBY2NvbXBhbnlpbmdBbmFseXNpczogYm9vbGVhbjtcclxuICAgIGNoZWNrRnJlcXVlbmN5QW5hbHlzaXM6IGJvb2xlYW47XHJcbiAgICBjaGVja0FuYWx5c2lzOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlc291cmNlUmV0cmlldmFsU2VydmljZTogSVJlc291cmNlUmV0cmlldmFsU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJGNvbXBpbGU6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbXlsYXllcjogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBoYW5kbGVTdG9yYWdlOiBJSGFuZGxlU3RvcmFnZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgY2hlY2tJbnRlbGxpZ2VudEFuYWx5c2lzOiBJQ2hlY2tJbnRlbGxpZ2VudEFuYWx5c2lzKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDplIDmr4HmuIXpmaTlvLnmoYZcclxuICAgICAgICAgKi9cclxuICAgICAgICBzZWxmLiRzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNlbGYuY2hlY2tGYWNlVHJhY2sgPSBzZWxmLmNoZWNrSW50ZWxsaWdlbnRBbmFseXNpcy5jaGVja0ZhY2VUcmFjaygpO1xyXG4gICAgICAgIHNlbGYuY2hlY2tBY2NvbXBhbnlpbmdBbmFseXNpcyA9IHNlbGYuY2hlY2tJbnRlbGxpZ2VudEFuYWx5c2lzLmNoZWNrQWNjb21wYW55aW5nQW5hbHlzaXMoKTtcclxuICAgICAgICBzZWxmLmNoZWNrRnJlcXVlbmN5QW5hbHlzaXMgPSBzZWxmLmNoZWNrSW50ZWxsaWdlbnRBbmFseXNpcy5jaGVja0ZyZXF1ZW5jeUFuYWx5c2lzKCk7XHJcbiAgICAgICAgc2VsZi5jaGVja0FuYWx5c2lzID0gc2VsZi5jaGVja0ludGVsbGlnZW50QW5hbHlzaXMuY2hlY2tBbmFseXNpcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOafpeeci+WFqOWbvlxyXG4gICAgcHVibGljIGZ1bGxTY3JlZW4ocGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coMTIzKTtcclxuICAgICAgICBsZXQgc2NvcGU6IHsgbGF5ZXI6IGFueTsgaW5kZXg6IHN0cmluZywgcGF0aDogYW55LCAkZGVzdHJveTogRnVuY3Rpb24gfSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS5pbmRleCA9IFwiZnVsbFNjcmVlblBvcHVwXCI7XHJcbiAgICAgICAgc2NvcGUucGF0aCA9IHBhdGg7XHJcbiAgICAgICAgaWYgKHBhdGgpIHtcclxuICAgICAgICAgICAgbGV0IHdpbmRvd1c6IGFueSA9ICQod2luZG93KS53aWR0aCgpICogMC44O1xyXG4gICAgICAgICAgICBsZXQgd2luZG93SDogYW55ID0gJCh3aW5kb3cpLmhlaWdodCgpICogMC44O1xyXG4gICAgICAgICAgICBsZXQgY29udGVudEhUTUwgPSBgPGltZyBuZy1zcmM9JHtwYXRofSBzdHlsZT0nd2lkdGg6JHt3aW5kb3dXfXB4O2hlaWdodDoke3dpbmRvd0h9cHg7Jz5gO1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNsb3NlQnRuOiAwLFxyXG4gICAgICAgICAgICAgICAgc2tpbjogJ2xheXVpLWxheWVyLW5vYmcgbm8tc2Nyb2xsJyxcclxuICAgICAgICAgICAgICAgIHNoYWRlQ2xvc2U6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzaGFkZTogMC42LFxyXG4gICAgICAgICAgICAgICAgYXJlYTogW3dpbmRvd1cgKyAncHgnLCB3aW5kb3dIICsgJ3B4J10sXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBjb250ZW50SFRNTCxcclxuICAgICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIubXNnKFwi5Zu+54mH5Zyw5Z2A5LiN5a2Y5ZyoXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9u5pi+56S66K+m5oOF5by55qGGXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFua1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxmYWNlPn0gbGlzdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGV0YWlsUG9wdXAocmFuazogbnVtYmVyLCBhbGxMaXN0OiBBcnJheTxmYWNlPikge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgc2NvcGU6IHsgJGRlc3Ryb3k6IEZ1bmN0aW9uLCByYW5rOiBudW1iZXIsIGFsbExpc3Q6IEFycmF5PGZhY2U+LCBjb2xsZWN0RnVuY3Rpb246IEZ1bmN0aW9uLCBhbmFseXNpc0Z1bmN0aW9uOiBGdW5jdGlvbiwgc3VydmVpbGxhbmNlRnVuY3Rpb246IEZ1bmN0aW9uLCBjbG9zZVBvcHVwOiBGdW5jdGlvbiB9ID0gc2VsZi4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLnJhbmsgPSByYW5rO1xyXG4gICAgICAgIHNjb3BlLmFsbExpc3QgPSBhbGxMaXN0O1xyXG4gICAgICAgIHNjb3BlLmNvbGxlY3RGdW5jdGlvbiA9IChpdGVtOiBmYWNlKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuY2xpY2tDb2xsZWN0KGl0ZW0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2NvcGUuYW5hbHlzaXNGdW5jdGlvbiA9IChpdGVtOiBmYWNlLCB0eXBlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5jbGlja0FuYWx5c2lzKGl0ZW0sIHR5cGUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2NvcGUuc3VydmVpbGxhbmNlRnVuY3Rpb24gPSAoaXRlbTogZmFjZSkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmNsaWNrU3VydmVpbGxhbmNlKGl0ZW0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2NvcGUuY2xvc2VQb3B1cCA9ICgpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5sYXllci5jbG9zZShzZWxmLmxheWVySW5kZXgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2VsZi5sYXllci5jbG9zZUFsbCgpO1xyXG4gICAgICAgIHNlbGYubXlsYXllci5jbG9zZShcIm1hcFBvdXBzQm94XCIpO1xyXG4gICAgICAgIHNlbGYubGF5ZXJJbmRleCA9IHNlbGYubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIHNraW46ICdkZXRhaWwtcG9wdXAtYm94JyxcclxuICAgICAgICAgICAgdGl0bGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhcmVhOiBbJzYwMHB4JywgJzQ0MHB4J10sXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IHBlcnNvblBvcHVwSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIm+W7uuWcsOWbvuW8ueahhlxyXG4gICAgICogQHBhcmFtIHtOUE1hcExpYi5HZW9tZXRyeS5Qb2ludH0gcG9pbnRcclxuICAgICAqIEBwYXJhbSB7UmVzdWx0fSBkYXRhXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZU1hcFBvcHVwKHBvaW50OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2ludCwgZGF0YTogYW55LCByYW5rOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm5ld01hcFdpblBvcHVsID0gdGhpcy5tYXAuY3JlYXRlSW5mb1dpbmRvdygxMTQuMjgyNjEzOCwgMzAuMjY4NDUzNiwge1xyXG4gICAgICAgICAgICBpc2NvbW1vbjogdHJ1ZSxcclxuICAgICAgICAgICAgb2Zmc2V0OiBuZXcgTlBNYXBMaWIuR2VvbWV0cnkuU2l6ZSgtODIsIC0yNDgpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IHdpbmRvd1BvcHVsOiBhbnksIG1hcDogYW55OyBpbmRleDogc3RyaW5nLCAkZGVzdHJveTogRnVuY3Rpb24sIHJhbms6IG51bWJlciwgc2hvd1RpdGxlOiBib29sZWFuLCBhbGxMaXN0OiBBcnJheTxmYWNlPiB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLm1hcCA9IHRoaXMubWFwO1xyXG4gICAgICAgIHNjb3BlLndpbmRvd1BvcHVsID0gdGhpcy5uZXdNYXBXaW5Qb3B1bDtcclxuICAgICAgICBzY29wZS5pbmRleCA9IFwicGVyc29uUG9wdXBIdG1sXCI7XHJcbiAgICAgICAgc2NvcGUucmFuayA9IHJhbms7XHJcbiAgICAgICAgc2NvcGUuYWxsTGlzdCA9IGRhdGE7XHJcbiAgICAgICAgc2NvcGUuc2hvd1RpdGxlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgZG9tID0gJChwZXJzb25Qb3B1cEh0bWwpLmdldCgwKTtcclxuICAgICAgICBkb20gPSB0aGlzLiRjb21waWxlKGRvbS5vdXRlckhUTUwpKHNjb3BlKTtcclxuXHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLm9wZW5JbmZvV2luZG93KHRoaXMubmV3TWFwV2luUG9wdWwsIGRvbVswXSwge1xyXG4gICAgICAgICAgICAgICAgY2xvc2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwLmNsb3NlSW5mb1dpbmRvdyh0aGlzLm5ld01hcFdpblBvcHVsKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5ld01hcFdpblBvcHVsID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDmlLbol4/kuI7lj5bmtojmlLbol49cclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGlja0NvbGxlY3QoaXRlbTogZmFjZSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAoIWl0ZW0uY29sbGVjdFN0YXR1cykge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1zOiBDb2xsZWN0QWRkUGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAganNvbjogYW5ndWxhci50b0pzb24oaXRlbSksXHJcbiAgICAgICAgICAgICAgICBvYmplY3RJRDogaXRlbS5BY2Nlc3NMb2cuSUQsXHJcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBDb2xsZWN0RGF0YVR5cGUuRmFjZS52YWx1ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5jb2xsZWN0QWRkSW5mbyhwYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtczogQ29sbGVjdERlbGV0ZVBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgIGlkczogaXRlbS5BY2Nlc3NMb2cuSURcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2VsZi5yZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UuY29sbGVjdERlbGV0ZUluZm8ocGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpdGVtLmNvbGxlY3RTdGF0dXMgPSAhaXRlbS5jb2xsZWN0U3RhdHVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOWIhuaekFxyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsaWNrQW5hbHlzaXMoaXRlbTogZmFjZSwgdHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHN0b3JhZ2VQYXJhbXM6IEFuYWx5c2lzU3RvcmFnZVBhcmFtcyA9IEFuYWx5c2lzRGF0YVR5cGUuRmFjZTtcclxuICAgICAgICBzdG9yYWdlUGFyYW1zLmRhdGEgPSBpdGVtO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlU3RvcmFnZS5zZXRTZXNzaW9uU3RvcmFnZURhdGEoc3RvcmFnZVBhcmFtcy5rZXksIHN0b3JhZ2VQYXJhbXMpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiQW5hbHlzaXNUeXBlXCIsIFwiRmFjZVwiKTtcclxuICAgICAgICBpZiAodHlwZSA9PT0gQW5hbHlzaXNHb1RvVHlwZS5UcmFjay5rZXkpIHtcclxuICAgICAgICAgICAgd2luZG93Lm9wZW4oQW5hbHlzaXNHb1RvVHlwZS5UcmFjay5kYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IEFuYWx5c2lzR29Ub1R5cGUuQWNjb21wYW55aW5nLmtleSkge1xyXG4gICAgICAgICAgICB3aW5kb3cub3BlbihBbmFseXNpc0dvVG9UeXBlLkFjY29tcGFueWluZy5kYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IEFuYWx5c2lzR29Ub1R5cGUuRnJlcXVlbmN5LmtleSkge1xyXG4gICAgICAgICAgICB3aW5kb3cub3BlbihBbmFseXNpc0dvVG9UeXBlLkZyZXF1ZW5jeS5kYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IEFuYWx5c2lzR29Ub1R5cGUuTW9yZS5rZXkpIHtcclxuICAgICAgICAgICAgd2luZG93Lm9wZW4oQW5hbHlzaXNHb1RvVHlwZS5Nb3JlLmRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDluIPmjqfkuI7lj5bmtojluIPmjqdcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGlja1N1cnZlaWxsYW5jZShpdGVtOiBmYWNlKSB7XHJcbiAgICAgICAgaXRlbS5zdXJ2ZWlsbGFuY2VTdGF0dXMgPSAhaXRlbS5zdXJ2ZWlsbGFuY2VTdGF0dXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdwZXJzb25TZWFyY2hQYWdlQ29udHJvbGxlcicsIHBlcnNvblNlYXJjaFBhZ2VDb250cm9sbGVyKTsiXX0=
