define(["require", "exports", "../../../../common/app/main.app", "../../../../../core/server/enum/CollectDataType", "../../../../common/services/resourceRetrieval.service"], function (require, exports, main_app_1, CollectDataType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PositionSearchPageController = (function () {
        function PositionSearchPageController($scope, $timeout, mylayer, resourceRetrievalService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.mylayer = mylayer;
            this.resourceRetrievalService = resourceRetrievalService;
        }
        PositionSearchPageController.prototype.positionPopup = function (item) {
        };
        PositionSearchPageController.prototype.clickCollect = function (item) {
            var self = this;
            if (!item.collectStatus) {
                var params = {
                    json: JSON.stringify(item),
                    objectID: item.id,
                    objectType: CollectDataType_1.CollectDataType.Position.value
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
        PositionSearchPageController.$inject = ['$scope', '$timeout', 'mylayer', 'resourceRetrievalService'];
        return PositionSearchPageController;
    }());
    main_app_1.app.controller('positionSearchPageController', PositionSearchPageController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL3F1aWNrU2VhcmNoL2RldmljZVBhZ2UvcG9zaXRpb25TZWFyY2hQYWdlLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBVUE7UUFHSSxzQ0FBb0IsTUFBVyxFQUNYLFFBQWEsRUFDYixPQUFZLEVBQ1osd0JBQW1EO1lBSG5ELFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCxhQUFRLEdBQVIsUUFBUSxDQUFLO1lBQ2IsWUFBTyxHQUFQLE9BQU8sQ0FBSztZQUNaLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMkI7UUFFdkUsQ0FBQztRQU1NLG9EQUFhLEdBQXBCLFVBQXFCLElBQWM7UUFFbkMsQ0FBQztRQU1NLG1EQUFZLEdBQW5CLFVBQW9CLElBQWM7WUFDOUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksTUFBTSxHQUFxQjtvQkFDM0IsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO29CQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUU7b0JBQ2pCLFVBQVUsRUFBRSxpQ0FBZSxDQUFDLFFBQVEsQ0FBQyxLQUFLO2lCQUM3QyxDQUFDO2dCQUNGLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO3FCQUMvQyxJQUFJLENBQUMsVUFBQyxHQUFRO29CQUNYLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBRVYsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQTtZQUNWLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLE1BQU0sR0FBd0I7b0JBQzlCLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRTtpQkFDZixDQUFDO2dCQUNGLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7cUJBQ2xELElBQUksQ0FBQyxVQUFDLEdBQVE7b0JBQ1gsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFFVixDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFBO1lBQ1YsQ0FBQztZQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzdDLENBQUM7UUEvQ00sb0NBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLDBCQUEwQixDQUFDLENBQUM7UUFnRG5GLG1DQUFDO0tBakRELEFBaURDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLDhCQUE4QixFQUFFLDRCQUE0QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL3Jlc291cmNlUmV0cmlldmFsL3NlYXJjaC9xdWlja1NlYXJjaC9kZXZpY2VQYWdlL3Bvc2l0aW9uU2VhcmNoUGFnZS5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthcHB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHAnO1xyXG5cclxuLy8g6auY57qn5qOA57Si5Y+C5pWwXHJcbmltcG9ydCB7cG9zaXRpb24sIENvbGxlY3RBZGRQYXJhbXMsIENvbGxlY3REZWxldGVQYXJhbXN9IGZyb20gJy4uLy4uLy4uL3Jlc291cmNlUmV0cmlldmFsRW51bSc7XHJcbmltcG9ydCB7Q29sbGVjdERhdGFUeXBlfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9Db2xsZWN0RGF0YVR5cGVcIjtcclxuXHJcbi8vIOacjeWKoVxyXG5pbXBvcnQgJy4uLy4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9yZXNvdXJjZVJldHJpZXZhbC5zZXJ2aWNlJztcclxuaW1wb3J0IHtJUmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi8uLi9jb21tb24vc2VydmljZXMvcmVzb3VyY2VSZXRyaWV2YWwuc2VydmljZSc7XHJcblxyXG5jbGFzcyBQb3NpdGlvblNlYXJjaFBhZ2VDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnJHRpbWVvdXQnLCAnbXlsYXllcicsICdyZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UnXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBteWxheWVyOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlc291cmNlUmV0cmlldmFsU2VydmljZTogSVJlc291cmNlUmV0cmlldmFsU2VydmljZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDmmL7npLror6bmg4XlvLnmoYZcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwb3NpdGlvblBvcHVwKGl0ZW06IHBvc2l0aW9uKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOaUtuiXj+S4juWPlua2iOaUtuiXj1xyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsaWNrQ29sbGVjdChpdGVtOiBwb3NpdGlvbikge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAoIWl0ZW0uY29sbGVjdFN0YXR1cykge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1zOiBDb2xsZWN0QWRkUGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAganNvbjogSlNPTi5zdHJpbmdpZnkoaXRlbSksXHJcbiAgICAgICAgICAgICAgICBvYmplY3RJRDogaXRlbS5pZCxcclxuICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IENvbGxlY3REYXRhVHlwZS5Qb3NpdGlvbi52YWx1ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5jb2xsZWN0QWRkSW5mbyhwYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtczogQ29sbGVjdERlbGV0ZVBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgIGlkczogaXRlbS5pZFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5jb2xsZWN0RGVsZXRlSW5mbyhwYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGl0ZW0uY29sbGVjdFN0YXR1cyA9ICFpdGVtLmNvbGxlY3RTdGF0dXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdwb3NpdGlvblNlYXJjaFBhZ2VDb250cm9sbGVyJywgUG9zaXRpb25TZWFyY2hQYWdlQ29udHJvbGxlcik7Il19
