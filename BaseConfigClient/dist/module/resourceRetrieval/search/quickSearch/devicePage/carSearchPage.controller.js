define(["require", "exports", "text!../../../../detailPopup/carPopup/carPopup.html", "../../../../common/app/main.app", "../../../../../core/server/enum/CollectDataType", "../../../../../core/server/enum/AnalysisDataType", "../../../../common/services/resourceRetrieval.service"], function (require, exports, carPopupHtml, main_app_1, CollectDataType_1, AnalysisDataType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var carSearchPageController = (function () {
        function carSearchPageController($scope, $state, $timeout, resourceRetrievalService, layer, mylayer) {
            this.$scope = $scope;
            this.$state = $state;
            this.$timeout = $timeout;
            this.resourceRetrievalService = resourceRetrievalService;
            this.layer = layer;
            this.mylayer = mylayer;
            this.analysisGoTo = AnalysisDataType_1.AnalysisGoToType;
            var self = this;
            self.$scope.$on('$destroy', function () {
                self.layer.close();
            });
        }
        carSearchPageController.prototype.detailPopup = function (rank, allList) {
            var self = this;
            var scope = self.$scope.$new();
            scope.rank = rank;
            scope.allList = allList;
            scope.collectFunction = function (item) {
                self.clickCollect(item);
            };
            scope.analysisFunction = function (item) {
                self.clickAnalysis(item);
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
                area: ['670px', '420px'],
                content: carPopupHtml,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        };
        carSearchPageController.prototype.fullScreen = function (path) {
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
        carSearchPageController.prototype.clickCollect = function (item) {
            var self = this;
            if (!item.collectStatus) {
                var params = {
                    json: angular.toJson(item),
                    objectID: item.id,
                    objectType: CollectDataType_1.CollectDataType.Car.value
                };
                self.resourceRetrievalService.collectAddInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            else {
                var params = {
                    ids: item.id
                };
                self.resourceRetrievalService.collectDeleteInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            item.collectStatus = !item.collectStatus;
        };
        carSearchPageController.prototype.clickAnalysis = function (item) {
            localStorage.setItem("AnalysisType", "Car");
            window.open(this.analysisGoTo.More.data);
        };
        carSearchPageController.prototype.clickSurveillance = function (item) {
            item.surveillanceStatus = !item.surveillanceStatus;
        };
        carSearchPageController.$inject = ['$scope', '$state', '$timeout', 'resourceRetrievalService', 'layer', 'mylayer'];
        return carSearchPageController;
    }());
    main_app_1.app.controller('carSearchPageController', carSearchPageController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL3F1aWNrU2VhcmNoL2RldmljZVBhZ2UvY2FyU2VhcmNoUGFnZS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWFBO1FBTUksaUNBQW9CLE1BQVcsRUFDWCxNQUFXLEVBQ1gsUUFBYSxFQUNiLHdCQUFtRCxFQUNuRCxLQUFVLEVBQ1YsT0FBWTtZQUxaLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCxXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQ1gsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUNiLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMkI7WUFDbkQsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUNWLFlBQU8sR0FBUCxPQUFPLENBQUs7WUFQaEMsaUJBQVksR0FBRyxtQ0FBZ0IsQ0FBQztZQVM1QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7WUFFaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFO2dCQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQU9NLDZDQUFXLEdBQWxCLFVBQW1CLElBQVksRUFBRSxPQUFtQjtZQUNoRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEIsSUFBSSxLQUFLLEdBQTJLLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdk0sS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDbEIsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDeEIsS0FBSyxDQUFDLGVBQWUsR0FBRyxVQUFDLElBQVM7Z0JBQzlCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFDO1lBQ0YsS0FBSyxDQUFDLGdCQUFnQixHQUFHLFVBQUMsSUFBUztnQkFDL0IsSUFBSSxDQUFDLGFB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QUNmLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztxQkFDbEQsSUFBSSxDQUFDLFVBQUMsR0FBUTtvQkFDWCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUVWLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUE7WUFDVixDQUFDO1lBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDN0MsQ0FBQztRQU9NLCtDQUFhLEdBQXBCLFVBQXFCLElBQVM7WUFDMUIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBT00sbURBQWlCLEdBQXhCLFVBQXlCLElBQVM7WUFDOUIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQ3ZELENBQUM7UUFwSU0sK0JBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLDBCQUEwQixFQUFFLE9BQU8sRUFBQyxTQUFTLENBQUMsQ0FBQztRQXFJckcsOEJBQUM7S0F0SUQsQUFzSUMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMseUJBQXlCLEVBQUUsdUJBQXVCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL3F1aWNrU2VhcmNoL2RldmljZVBhZ2UvY2FyU2VhcmNoUGFnZS5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi8uLi8uLi8uLi9kZXRhaWxQb3B1cC9jYXJQb3B1cC9jYXJQb3B1cC5odG1sXCIgbmFtZT1cImNhclBvcHVwSHRtbFwiIC8+XHJcbmltcG9ydCB7YXBwfSBmcm9tICcuLi8uLi8uLi8uLi9jb21tb24vYXBwL21haW4uYXBwJztcclxuLy8g5Y+C5pWwXHJcbmltcG9ydCB7Y2FyfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29yZS9lbnVtL1F1ZXJ5UmVjb3JkXCI7XHJcbmltcG9ydCB7Q29sbGVjdEFkZFBhcmFtcywgQ29sbGVjdERlbGV0ZVBhcmFtc30gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvcmUvZW51bS9RdWVyeVBhcmFtc1wiO1xyXG4vLyDmnI3liqFcclxuaW1wb3J0ICcuLi8uLi8uLi8uLi9jb21tb24vc2VydmljZXMvcmVzb3VyY2VSZXRyaWV2YWwuc2VydmljZSc7XHJcbmltcG9ydCB7SVJlc291cmNlUmV0cmlldmFsU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Jlc291cmNlUmV0cmlldmFsLnNlcnZpY2UnO1xyXG5pbXBvcnQge0NvbGxlY3REYXRhVHlwZX0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vQ29sbGVjdERhdGFUeXBlXCI7XHJcbmltcG9ydCB7QW5hbHlzaXNHb1RvVHlwZX0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vQW5hbHlzaXNEYXRhVHlwZVwiO1xyXG5cclxuZGVjbGFyZSBsZXQgY2FyUG9wdXBIdG1sOiBhbnksIGFuZ3VsYXI6IGFueTtcclxuXHJcbmNsYXNzIGNhclNlYXJjaFBhZ2VDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnJHN0YXRlJywgJyR0aW1lb3V0JywgJ3Jlc291cmNlUmV0cmlldmFsU2VydmljZScsICdsYXllcicsJ215bGF5ZXInXTtcclxuXHJcbiAgICBsYXllckluZGV4OiBhbnk7XHJcbiAgICBhbmFseXNpc0dvVG8gPSBBbmFseXNpc0dvVG9UeXBlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICRzdGF0ZTogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZXNvdXJjZVJldHJpZXZhbFNlcnZpY2U6IElSZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIG15bGF5ZXI6IGFueSxcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIC8vIGNvbnRyb2xsZXIg6ZSA5q+B5riF6Zmk5by55qGGXHJcbiAgICAgICAgc2VsZi4kc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5sYXllci5jbG9zZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOaYvuekuuivpuaDheW8ueahhlxyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGRldGFpbFBvcHVwKHJhbms6IG51bWJlciwgYWxsTGlzdDogQXJyYXk8Y2FyPikge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgc2NvcGU6IHskZGVzdHJveTogRnVuY3Rpb24sIHJhbms6IG51bWJlciwgYWxsTGlzdDogQXJyYXk8Y2FyPiwgY29sbGVjdEZ1bmN0aW9uOiBGdW5jdGlvbiwgYW5hbHlzaXNGdW5jdGlvbjogRnVuY3Rpb24sIHN1cnZlaWxsYW5jZUZ1bmN0aW9uOiBGdW5jdGlvbiwgY2xvc2VQb3B1cDogRnVuY3Rpb24gIH0gPSBzZWxmLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUucmFuayA9IHJhbms7XHJcbiAgICAgICAgc2NvcGUuYWxsTGlzdCA9IGFsbExpc3Q7XHJcbiAgICAgICAgc2NvcGUuY29sbGVjdEZ1bmN0aW9uID0gKGl0ZW06IGNhcikgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmNsaWNrQ29sbGVjdChpdGVtKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNjb3BlLmFuYWx5c2lzRnVuY3Rpb24gPSAoaXRlbTogY2FyKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuY2xpY2tBbmFseXNpcyhpdGVtKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNjb3BlLnN1cnZlaWxsYW5jZUZ1bmN0aW9uID0gKGl0ZW06IGNhcikgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmNsaWNrU3VydmVpbGxhbmNlKGl0ZW0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2NvcGUuY2xvc2VQb3B1cCA9ICgpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5sYXllci5jbG9zZShzZWxmLmxheWVySW5kZXgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2VsZi5sYXllci5jbG9zZUFsbCgpO1xyXG4gICAgICAgIHNlbGYubXlsYXllci5jbG9zZShcIm1hcFBvdXBzQm94XCIpO1xyXG4gICAgICAgIHNlbGYubGF5ZXJJbmRleCA9IHNlbGYubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIHNraW46ICdkZXRhaWwtcG9wdXAtYm94JyxcclxuICAgICAgICAgICAgdGl0bGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhcmVhOiBbJzY3MHB4JywgJzQyMHB4J10sXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNhclBvcHVwSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmn6XnnIvlhajlm75cclxuICAgIHB1YmxpYyBmdWxsU2NyZWVuKHBhdGg6c3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IGxheWVyOiBhbnk7IGluZGV4OiBzdHJpbmcsIHBhdGg6IGFueSwgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUuaW5kZXggPSBcImZ1bGxTY3JlZW5Qb3B1cFwiO1xyXG4gICAgICAgIHNjb3BlLnBhdGggPSBwYXRoO1xyXG4gICAgICAgIGlmIChwYXRoKSB7XHJcbiAgICAgICAgICAgIGxldCBjb250ZW50SFRNTCA9IGA8aW1nIG5nLXNyYz0ke3BhdGh9IHN0eWxlPSd3aWR0aDo4MDBweDtoZWlnaHQ6NjMycHg7Jz5gO1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNsb3NlQnRuOiAwLFxyXG4gICAgICAgICAgICAgICAgc2tpbjogJ2xheXVpLWxheWVyLW5vYmcgbm8tc2Nyb2xsJyxcclxuICAgICAgICAgICAgICAgIHNoYWRlQ2xvc2U6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzaGFkZTogMC42LFxyXG4gICAgICAgICAgICAgICAgYXJlYTogWyc4MDBweCcsICc2MzJweCddLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogY29udGVudEhUTUwsXHJcbiAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLm1zZyhcIuWbvueJh+WcsOWdgOS4jeWtmOWcqFwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5pS26JeP5LiO5Y+W5raI5pS26JePXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xpY2tDb2xsZWN0KGl0ZW06IGNhcikge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAoIWl0ZW0uY29sbGVjdFN0YXR1cykge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1zOiBDb2xsZWN0QWRkUGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAganNvbjogYW5ndWxhci50b0pzb24oaXRlbSksXHJcbiAgICAgICAgICAgICAgICBvYmplY3RJRDogaXRlbS5pZCxcclxuICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IENvbGxlY3REYXRhVHlwZS5DYXIudmFsdWVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2VsZi5yZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UuY29sbGVjdEFkZEluZm8ocGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBwYXJhbXM6IENvbGxlY3REZWxldGVQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgICAgICBpZHM6IGl0ZW0uaWRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2VsZi5yZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UuY29sbGVjdERlbGV0ZUluZm8ocGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpdGVtLmNvbGxlY3RTdGF0dXMgPSAhaXRlbS5jb2xsZWN0U3RhdHVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBkZXNjcmlwdGlvbiDliIbmnpBcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGlja0FuYWx5c2lzKGl0ZW06IGNhcikge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiQW5hbHlzaXNUeXBlXCIsIFwiQ2FyXCIpO1xyXG4gICAgICAgIHdpbmRvdy5vcGVuKHRoaXMuYW5hbHlzaXNHb1RvLk1vcmUuZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOW4g+aOp+S4juWPlua2iOW4g+aOp1xyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsaWNrU3VydmVpbGxhbmNlKGl0ZW06IGNhcikge1xyXG4gICAgICAgIGl0ZW0uc3VydmVpbGxhbmNlU3RhdHVzID0gIWl0ZW0uc3VydmVpbGxhbmNlU3RhdHVzO1xyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignY2FyU2VhcmNoUGFnZUNvbnRyb2xsZXInLCBjYXJTZWFyY2hQYWdlQ29udHJvbGxlcik7Il19
