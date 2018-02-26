define(["require", "exports", "text!../../../../detailPopup/efPopup/efPopup.html", "../../../../common/app/main.app", "../../../../../core/server/enum/CollectDataType", "../../../../common/services/resourceRetrieval.service"], function (require, exports, efPopupHtml, main_app_1, CollectDataType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EFSearchPageController = (function () {
        function EFSearchPageController($scope, $timeout, layer, resourceRetrievalService, mylayer) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.layer = layer;
            this.resourceRetrievalService = resourceRetrievalService;
            this.mylayer = mylayer;
        }
        EFSearchPageController.prototype.detailPopup = function (rank, allList) {
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
                area: ['575px', '220px'],
                content: efPopupHtml,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        };
        EFSearchPageController.prototype.clickCollect = function (item) {
            var self = this;
            if (!item.collectStatus) {
                var params = {
                    json: angular.toJson(item),
                    objectID: item.eFenceLog.ID,
                    objectType: CollectDataType_1.CollectDataType.EFENCE.value
                };
                self.resourceRetrievalService.collectAddInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            else {
                var params = {
                    ids: item.eFenceLog.ID,
                };
                self.resourceRetrievalService.collectDeleteInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            item.collectStatus = !item.collectStatus;
        };
        EFSearchPageController.prototype.clickAnalysis = function (item) {
        };
        EFSearchPageController.prototype.clickSurveillance = function (item) {
            item.surveillanceStatus = !item.surveillanceStatus;
        };
        EFSearchPageController.$inject = ['$scope', '$timeout', 'layer', 'resourceRetrievalService', 'mylayer'];
        return EFSearchPageController;
    }());
    main_app_1.app.controller('eFSearchPageController', EFSearchPageController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL3F1aWNrU2VhcmNoL2RldmljZVBhZ2UvRUZTZWFyY2hQYWdlLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBWUE7UUFJSSxnQ0FBb0IsTUFBVyxFQUNYLFFBQWEsRUFDYixLQUFVLEVBQ1Ysd0JBQW1ELEVBQ25ELE9BQVk7WUFKWixXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQ1gsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUNiLFVBQUssR0FBTCxLQUFLLENBQUs7WUFDViw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTJCO1lBQ25ELFlBQU8sR0FBUCxPQUFPLENBQUs7UUFHaEMsQ0FBQztRQU9NLDRDQUFXLEdBQWxCLFVBQW1CLElBQVksRUFBRSxPQUEwQjtZQUN2RCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEIsSUFBSSxLQUFLLEdBQWtMLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDOU0sS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDbEIsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDeEIsS0FBSyxDQUFDLGVBQWUsR0FBRyxVQUFDLElBQWdCO2dCQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQztZQUNGLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxVQUFDLElBQWdCO2dCQUN0QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLENBQUMsQ0FBQztZQUNGLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxVQUFDLElBQWdCO2dCQUMxQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDO1lBQ0YsS0FBSyxDQUFDLFVBQVUsR0FBRztnQkFDZixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdEMsQ0FBQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUM5QixJQUFJLEVBQUUsQ0FBQztnQkFDUCxJQUFJLEVBQUUsa0JBQWtCO2dCQUN4QixLQUFLLEVBQUUsS0FBSztnQkFDWixJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO2dCQUN4QixPQUFPLEVBQUUsV0FBVztnQkFDcEIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osR0FBRyxFQUFFO29CQUNELEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDckIsQ0FBQzthQUNKLENBQUMsQ0FBQztRQUNQLENBQUM7UUFPTSw2Q0FBWSxHQUFuQixVQUFvQixJQUFnQjtZQUNoQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxNQUFNLEdBQXFCO29CQUMzQixJQUFJLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQzFCLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQzNCLFVBQVUsRUFBRSxpQ0FBZSxDQUFDLE1BQU0sQ0FBQyxLQUFLO2lCQUMzQyxDQUFDO2dCQUNGLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO3FCQUMvQyxJQUFJLENBQUMsVUFBQyxHQUFRO29CQUNYLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBRVYsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQTtZQUNWLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLE1BQU0sR0FBd0I7b0JBQzlCLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7aUJBQ3pCLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztxQkFDbEQsSUFBSSxDQUFDLFVBQUMsR0FBUTtvQkFDWCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUVWLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUE7WUFDVixDQUFDO1lBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDN0MsQ0FBQztRQU9NLDhDQUFhLEdBQXBCLFVBQXFCLElBQWdCO1FBQ3JDLENBQUM7UUFNTSxrREFBaUIsR0FBeEIsVUFBeUIsSUFBZ0I7WUFDckMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQ3ZELENBQUM7UUFoR00sOEJBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLDBCQUEwQixFQUFDLFNBQVMsQ0FBQyxDQUFDO1FBaUczRiw2QkFBQztLQWxHRCxBQWtHQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9yZXNvdXJjZVJldHJpZXZhbC9zZWFyY2gvcXVpY2tTZWFyY2gvZGV2aWNlUGFnZS9FRlNlYXJjaFBhZ2UuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vLi4vLi4vLi4vZGV0YWlsUG9wdXAvZWZQb3B1cC9lZlBvcHVwLmh0bWxcIiBuYW1lPVwiZWZQb3B1cEh0bWxcIiAvPlxyXG5pbXBvcnQge2FwcH0gZnJvbSAnLi4vLi4vLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcCc7XHJcbi8vIOmrmOe6p+ajgOe0ouWPguaVsFxyXG5pbXBvcnQge2VsZWN0cm9uaWMsIENvbGxlY3RBZGRQYXJhbXMsIENvbGxlY3REZWxldGVQYXJhbXN9IGZyb20gJy4uLy4uLy4uL3Jlc291cmNlUmV0cmlldmFsRW51bSc7XHJcbmltcG9ydCB7Q29sbGVjdERhdGFUeXBlfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9Db2xsZWN0RGF0YVR5cGVcIjtcclxuXHJcbi8vIOacjeWKoVxyXG5pbXBvcnQgJy4uLy4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9yZXNvdXJjZVJldHJpZXZhbC5zZXJ2aWNlJztcclxuaW1wb3J0IHtJUmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi8uLi9jb21tb24vc2VydmljZXMvcmVzb3VyY2VSZXRyaWV2YWwuc2VydmljZSc7XHJcblxyXG5kZWNsYXJlIGxldCBlZlBvcHVwSHRtbDogYW55LCBhbmd1bGFyOiBhbnk7XHJcblxyXG5jbGFzcyBFRlNlYXJjaFBhZ2VDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnJHRpbWVvdXQnLCAnbGF5ZXInLCAncmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlJywnbXlsYXllciddO1xyXG4gICAgbGF5ZXJJbmRleDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlc291cmNlUmV0cmlldmFsU2VydmljZTogSVJlc291cmNlUmV0cmlldmFsU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbXlsYXllcjogYW55LFxyXG4gICAgICAgICAgICApIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb27mmL7npLror6bmg4XlvLnmoYZcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYW5rXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PGVsZWN0cm9uaWM+fSBhbGxMaXN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZXRhaWxQb3B1cChyYW5rOiBudW1iZXIsIGFsbExpc3Q6IEFycmF5PGVsZWN0cm9uaWM+KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBzY29wZTogeyAkZGVzdHJveTogRnVuY3Rpb24sIHJhbms6IG51bWJlciwgYWxsTGlzdDogQXJyYXk8ZWxlY3Ryb25pYz4sIGNvbGxlY3RGdW5jdGlvbjogRnVuY3Rpb24sIGFuYWx5c2lzRnVuY3Rpb246IEZ1bmN0aW9uLCBzdXJ2ZWlsbGFuY2VGdW5jdGlvbjogRnVuY3Rpb24sIGNsb3NlUG9wdXA6IEZ1bmN0aW9uIH0gPSBzZWxmLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUucmFuayA9IHJhbms7XHJcbiAgICAgICAgc2NvcGUuYWxsTGlzdCA9IGFsbExpc3Q7XHJcbiAgICAgICAgc2NvcGUuY29sbGVjdEZ1bmN0aW9uID0gKGl0ZW06IGVsZWN0cm9uaWMpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5jbGlja0NvbGxlY3QoaXRlbSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzY29wZS5hbmFseXNpc0Z1bmN0aW9uID0gKGl0ZW06IGVsZWN0cm9uaWMpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5jbGlja0FuYWx5c2lzKGl0ZW0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2NvcGUuc3VydmVpbGxhbmNlRnVuY3Rpb24gPSAoaXRlbTogZWxlY3Ryb25pYykgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmNsaWNrU3VydmVpbGxhbmNlKGl0ZW0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2NvcGUuY2xvc2VQb3B1cCA9ICgpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5sYXllci5jbG9zZShzZWxmLmxheWVySW5kZXgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2VsZi5sYXllci5jbG9zZUFsbCgpO1xyXG4gICAgICAgIHNlbGYubXlsYXllci5jbG9zZShcIm1hcFBvdXBzQm94XCIpO1xyXG4gICAgICAgIHNlbGYubGF5ZXJJbmRleCA9IHNlbGYubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIHNraW46ICdkZXRhaWwtcG9wdXAtYm94JyxcclxuICAgICAgICAgICAgdGl0bGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhcmVhOiBbJzU3NXB4JywgJzIyMHB4J10sXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGVmUG9wdXBIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBkZXNjcmlwdGlvbiDmlLbol4/kuI7lj5bmtojmlLbol49cclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGlja0NvbGxlY3QoaXRlbTogZWxlY3Ryb25pYykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAoIWl0ZW0uY29sbGVjdFN0YXR1cykge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1zOiBDb2xsZWN0QWRkUGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAganNvbjogYW5ndWxhci50b0pzb24oaXRlbSksXHJcbiAgICAgICAgICAgICAgICBvYmplY3RJRDogaXRlbS5lRmVuY2VMb2cuSUQsXHJcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBDb2xsZWN0RGF0YVR5cGUuRUZFTkNFLnZhbHVlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHNlbGYucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmNvbGxlY3RBZGRJbmZvKHBhcmFtcylcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1zOiBDb2xsZWN0RGVsZXRlUGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgaWRzOiBpdGVtLmVGZW5jZUxvZy5JRCxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2VsZi5yZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UuY29sbGVjdERlbGV0ZUluZm8ocGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpdGVtLmNvbGxlY3RTdGF0dXMgPSAhaXRlbS5jb2xsZWN0U3RhdHVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBkZXNjcmlwdGlvbiDliIbmnpBcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGlja0FuYWx5c2lzKGl0ZW06IGVsZWN0cm9uaWMpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDluIPmjqfkuI7lj5bmtojluIPmjqdcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGlja1N1cnZlaWxsYW5jZShpdGVtOiBlbGVjdHJvbmljKSB7XHJcbiAgICAgICAgaXRlbS5zdXJ2ZWlsbGFuY2VTdGF0dXMgPSAhaXRlbS5zdXJ2ZWlsbGFuY2VTdGF0dXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdlRlNlYXJjaFBhZ2VDb250cm9sbGVyJywgRUZTZWFyY2hQYWdlQ29udHJvbGxlcik7Il19
