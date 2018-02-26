define(["require", "exports", "text!../../../../detailPopup/wifiPopup/wifiPopup.html", "../../../../common/app/main.app", "../../../../../core/server/enum/CollectDataType", "../../../../common/services/resourceRetrieval.service"], function (require, exports, wifiPopupHtml, main_app_1, CollectDataType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var wifiSearchPageController = (function () {
        function wifiSearchPageController($scope, $timeout, layer, resourceRetrievalService, mylayer) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.layer = layer;
            this.resourceRetrievalService = resourceRetrievalService;
            this.mylayer = mylayer;
        }
        wifiSearchPageController.prototype.detailPopup = function (rank, allList) {
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
                content: wifiPopupHtml,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        };
        wifiSearchPageController.prototype.clickCollect = function (item) {
            var self = this;
            if (!item.collectStatus) {
                var params = {
                    json: angular.toJson(item),
                    objectID: item.wifiLog.ID,
                    objectType: CollectDataType_1.CollectDataType.WiFi.value
                };
                self.resourceRetrievalService.collectAddInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            else {
                var params = {
                    ids: item.wifiLog.ID
                };
                self.resourceRetrievalService.collectDeleteInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            item.collectStatus = !item.collectStatus;
        };
        wifiSearchPageController.prototype.clickAnalysis = function (item) {
        };
        wifiSearchPageController.prototype.clickSurveillance = function (item) {
            item.surveillanceStatus = !item.surveillanceStatus;
        };
        wifiSearchPageController.$inject = ['$scope', '$timeout', 'layer', 'resourceRetrievalService', 'mylayer'];
        return wifiSearchPageController;
    }());
    main_app_1.app.controller('wifiSearchPageController', wifiSearchPageController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL3F1aWNrU2VhcmNoL2RldmljZVBhZ2Uvd2lmaVNlYXJjaFBhZ2UuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFhQTtRQUlJLGtDQUFvQixNQUFXLEVBQ1gsUUFBYSxFQUNiLEtBQVUsRUFDVix3QkFBbUQsRUFDbkQsT0FBWTtZQUpaLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCxhQUFRLEdBQVIsUUFBUSxDQUFLO1lBQ2IsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUNWLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMkI7WUFDbkQsWUFBTyxHQUFQLE9BQU8sQ0FBSztRQUdoQyxDQUFDO1FBT00sOENBQVcsR0FBbEIsVUFBbUIsSUFBWSxFQUFFLE9BQW9CO1lBQ2pELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoQixJQUFJLEtBQUssR0FBNEssSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN4TSxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNsQixLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUN4QixLQUFLLENBQUMsZUFBZSxHQUFHLFVBQUMsSUFBVTtnQkFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QixDQUFDLENBQUM7WUFDRixLQUFLLENBQUMsZ0JBQWdCLEdBQUcsVUFBQyxJQUFVO2dCQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLENBQUMsQ0FBQztZQUNGLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxVQUFDLElBQVU7Z0JBQ3BDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxDQUFDLENBQUM7WUFDRixLQUFLLENBQUMsVUFBVSxHQUFHO2dCQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN0QyxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQzlCLElBQUksRUFBRSxDQUFDO2dCQUNQLElBQUksRUFBRSxrQkFBa0I7Z0JBQ3hCLEtBQUssRUFBRSxLQUFLO2dCQUNaLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7Z0JBQ3hCLE9BQU8sRUFBRSxhQUFhO2dCQUN0QixLQUFLLEVBQUUsS0FBSztnQkFDWixHQUFHLEVBQUU7b0JBQ0QsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNyQixDQUFDO2FBQ0osQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQU9NLCtDQUFZLEdBQW5CLFVBQW9CLElBQVU7WUFDMUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksTUFBTSxHQUFxQjtvQkFDM0IsSUFBSSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUN6QixVQUFVLEVBQUUsaUNBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSztpQkFDekMsQ0FBQztnQkFDRixJQUFJLENBQUMsd0JBQXdCLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztxQkFDL0MsSUFBSSxDQUFDLFVBQUMsR0FBUTtvQkFDWCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUVWLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUE7WUFDVixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxNQUFNLEdBQXdCO29CQUM5QixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2lCQUN2QixDQUFDO2dCQUNGLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7cUJBQ2xELElBQUksQ0FBQyxVQUFDLEdBQVE7b0JBQ1gsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFFVixDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFBO1lBQ1YsQ0FBQztZQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzdDLENBQUM7UUFPTSxnREFBYSxHQUFwQixVQUFxQixJQUFVO1FBQy9CLENBQUM7UUFPTSxvREFBaUIsR0FBeEIsVUFBeUIsSUFBVTtZQUMvQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDdkQsQ0FBQztRQWpHTSxnQ0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUMsU0FBUyxDQUFDLENBQUM7UUFrRzNGLCtCQUFDO0tBbkdELEFBbUdDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLDBCQUEwQixFQUFFLHdCQUF3QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL3Jlc291cmNlUmV0cmlldmFsL3NlYXJjaC9xdWlja1NlYXJjaC9kZXZpY2VQYWdlL3dpZmlTZWFyY2hQYWdlLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uLy4uLy4uLy4uL2RldGFpbFBvcHVwL3dpZmlQb3B1cC93aWZpUG9wdXAuaHRtbFwiIG5hbWU9XCJ3aWZpUG9wdXBIdG1sXCIgLz5cclxuaW1wb3J0IHthcHB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHAnO1xyXG5cclxuLy8g6auY57qn5qOA57Si5Y+C5pWwXHJcbmltcG9ydCB7d2lmaSwgQ29sbGVjdEFkZFBhcmFtcywgQ29sbGVjdERlbGV0ZVBhcmFtc30gZnJvbSAnLi4vLi4vLi4vcmVzb3VyY2VSZXRyaWV2YWxFbnVtJztcclxuaW1wb3J0IHtDb2xsZWN0RGF0YVR5cGV9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL0NvbGxlY3REYXRhVHlwZVwiO1xyXG5cclxuLy8g5pyN5YqhXHJcbmltcG9ydCAnLi4vLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Jlc291cmNlUmV0cmlldmFsLnNlcnZpY2UnO1xyXG5pbXBvcnQge0lSZXNvdXJjZVJldHJpZXZhbFNlcnZpY2V9IGZyb20gJy4uLy4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9yZXNvdXJjZVJldHJpZXZhbC5zZXJ2aWNlJztcclxuXHJcbmRlY2xhcmUgbGV0IHdpZmlQb3B1cEh0bWw6IGFueSwgYW5ndWxhcjogYW55O1xyXG5cclxuY2xhc3Mgd2lmaVNlYXJjaFBhZ2VDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnJHRpbWVvdXQnLCAnbGF5ZXInLCAncmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlJywnbXlsYXllciddO1xyXG4gICAgbGF5ZXJJbmRleDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlc291cmNlUmV0cmlldmFsU2VydmljZTogSVJlc291cmNlUmV0cmlldmFsU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbXlsYXllcjogYW55LFxyXG4gICAgICAgICAgICApIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOaYvuekuuivpuaDheW8ueahhlxyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGRldGFpbFBvcHVwKHJhbms6IG51bWJlciwgYWxsTGlzdDogQXJyYXk8d2lmaT4pIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7ICRkZXN0cm95OiBGdW5jdGlvbiwgcmFuazogbnVtYmVyLCBhbGxMaXN0OiBBcnJheTx3aWZpPiwgY29sbGVjdEZ1bmN0aW9uOiBGdW5jdGlvbiwgYW5hbHlzaXNGdW5jdGlvbjogRnVuY3Rpb24sIHN1cnZlaWxsYW5jZUZ1bmN0aW9uOiBGdW5jdGlvbiwgY2xvc2VQb3B1cDogRnVuY3Rpb24gfSA9IHNlbGYuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS5yYW5rID0gcmFuaztcclxuICAgICAgICBzY29wZS5hbGxMaXN0ID0gYWxsTGlzdDtcclxuICAgICAgICBzY29wZS5jb2xsZWN0RnVuY3Rpb24gPSAoaXRlbTogd2lmaSkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmNsaWNrQ29sbGVjdChpdGVtKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNjb3BlLmFuYWx5c2lzRnVuY3Rpb24gPSAoaXRlbTogd2lmaSkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmNsaWNrQW5hbHlzaXMoaXRlbSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzY29wZS5zdXJ2ZWlsbGFuY2VGdW5jdGlvbiA9IChpdGVtOiB3aWZpKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuY2xpY2tTdXJ2ZWlsbGFuY2UoaXRlbSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzY29wZS5jbG9zZVBvcHVwID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmxheWVyLmNsb3NlKHNlbGYubGF5ZXJJbmRleCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZWxmLmxheWVyLmNsb3NlQWxsKCk7XHJcbiAgICAgICAgc2VsZi5teWxheWVyLmNsb3NlKFwibWFwUG91cHNCb3hcIik7XHJcbiAgICAgICAgc2VsZi5sYXllckluZGV4ID0gc2VsZi5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgc2tpbjogJ2RldGFpbC1wb3B1cC1ib3gnLFxyXG4gICAgICAgICAgICB0aXRsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFyZWE6IFsnNTc1cHgnLCAnMjIwcHgnXSxcclxuICAgICAgICAgICAgY29udGVudDogd2lmaVBvcHVwSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5pS26JeP5LiO5Y+W5raI5pS26JePXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xpY2tDb2xsZWN0KGl0ZW06IHdpZmkpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFpdGVtLmNvbGxlY3RTdGF0dXMpIHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtczogQ29sbGVjdEFkZFBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgIGpzb246IGFuZ3VsYXIudG9Kc29uKGl0ZW0pLFxyXG4gICAgICAgICAgICAgICAgb2JqZWN0SUQ6IGl0ZW0ud2lmaUxvZy5JRCxcclxuICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IENvbGxlY3REYXRhVHlwZS5XaUZpLnZhbHVlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHNlbGYucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmNvbGxlY3RBZGRJbmZvKHBhcmFtcylcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1zOiBDb2xsZWN0RGVsZXRlUGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgaWRzOiBpdGVtLndpZmlMb2cuSURcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2VsZi5yZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UuY29sbGVjdERlbGV0ZUluZm8ocGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpdGVtLmNvbGxlY3RTdGF0dXMgPSAhaXRlbS5jb2xsZWN0U3RhdHVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBkZXNjcmlwdGlvbiDliIbmnpBcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGlja0FuYWx5c2lzKGl0ZW06IHdpZmkpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5biD5o6n5LiO5Y+W5raI5biD5o6nXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xpY2tTdXJ2ZWlsbGFuY2UoaXRlbTogd2lmaSkge1xyXG4gICAgICAgIGl0ZW0uc3VydmVpbGxhbmNlU3RhdHVzID0gIWl0ZW0uc3VydmVpbGxhbmNlU3RhdHVzO1xyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignd2lmaVNlYXJjaFBhZ2VDb250cm9sbGVyJywgd2lmaVNlYXJjaFBhZ2VDb250cm9sbGVyKTsiXX0=
