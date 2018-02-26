define(["require", "exports", "../../common/app/main.app", "echarts"], function (require, exports, main_app_1, echarts) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EnlargeController = (function () {
        function EnlargeController($scope, $timeout, i18nFactory) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.i18nFactory = i18nFactory;
            this.rankClassName = ["i-rank-first", "i-rank-second", "i-rank-third"];
            this.isAllRankList = false;
            var enlargeKey = $scope.enlarge;
            if (enlargeKey && enlargeKey.name == "AllRankList") {
                this.isAllRankList = true;
                enlargeKey.config = angular.copy(enlargeKey.config).slice(0, 10);
                this.RankTable = enlargeKey;
            }
            else {
                this.init(enlargeKey);
            }
        }
        EnlargeController.prototype.init = function (setEnlargeData) {
            this.$timeout(function () {
                var dom = document.getElementById('enlargeEchart');
                var ele = echarts.init(dom);
                var series = setEnlargeData.config.series;
                var rotate = setEnlargeData.config.xAxis;
                if (rotate && rotate.axisLabel && rotate.axisLabel.interval) {
                    delete rotate.axisLabel.interval;
                    delete rotate.axisLabel.rotate;
                }
                if (series && series.length) {
                    var seriesData = [];
                    for (var i = 0; i < series.length; i++) {
                        try {
                            if (series[i] && series[i].type && series[i].type == "bar") {
                                series[i].barWidth = 30;
                            }
                            seriesData.push(series[i]);
                        }
                        catch (err) {
                            console.error(err);
                        }
                    }
                    setEnlargeData.config.series = seriesData;
                }
                var EChartOptionConfig = setEnlargeData.config;
                ele.setOption(EChartOptionConfig);
            });
        };
        EnlargeController.$inject = ['$scope', '$timeout', 'i18nFactory'];
        return EnlargeController;
    }());
    main_app_1.app.controller('EnlargeController', EnlargeController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VzL2NoYXJ0L2VubGFyZ2UuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFLQTtRQU9JLDJCQUNZLE1BQVcsRUFDWCxRQUFrQixFQUNsQixXQUFnQjtZQUZoQixXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQ1gsYUFBUSxHQUFSLFFBQVEsQ0FBVTtZQUNsQixnQkFBVyxHQUFYLFdBQVcsQ0FBSztZQU41QixrQkFBYSxHQUFrQixDQUFDLGNBQWMsRUFBRSxlQUFlLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDakYsa0JBQWEsR0FBWSxLQUFLLENBQUM7WUFRM0IsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUVoQyxFQUFFLENBQUMsQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLElBQUksSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDMUIsVUFBVSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRSxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQztZQUNoQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMxQixDQUFDO1FBRUwsQ0FBQztRQUVPLGdDQUFJLEdBQVosVUFBYSxjQUEyQztZQUNwRCxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNWLElBQUksR0FBRyxHQUFRLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ3hELElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLElBQUksTUFBTSxHQUFRLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUcvQyxJQUFJLE1BQU0sR0FBUSxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDOUMsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUMxRCxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO29CQUNqQyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO2dCQUNuQyxDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDMUIsSUFBSSxVQUFVLEdBQUcsRUFBZ0IsQ0FBQztvQkFDbEMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ3JDLElBQUksQ0FBQzs0QkFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0NBQ3pELE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDOzRCQUM1QixDQUFDOzRCQUNELFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQy9CLENBQUM7d0JBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDWCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO3dCQUN0QixDQUFDO29CQUVMLENBQUM7b0JBQ0QsY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO2dCQUM5QyxDQUFDO2dCQUVELElBQUksa0JBQWtCLEdBQVEsY0FBYyxDQUFDLE1BQU0sQ0FBQztnQkFDcEQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQXZETSx5QkFBTyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQTBEM0Qsd0JBQUM7S0EzREQsQUEyREMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvcmVzb3VyY2VzL2NoYXJ0L2VubGFyZ2UuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFwcCB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAqIGFzIGVjaGFydHMgZnJvbSBcImVjaGFydHNcIlxyXG5pbXBvcnQgKiBhcyBDaGFydE9wdGlvbnMgZnJvbSBcIi4uLy4uL2NvbW1vbi9lbnVtL0VjaGFydENvbmZpZ1wiO1xyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnksIGVubGFyZ2VIdG1sOiBhbnk7XHJcblxyXG5jbGFzcyBFbmxhcmdlQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJywgJyR0aW1lb3V0JywgJ2kxOG5GYWN0b3J5J107XHJcblxyXG4gICAgUmFua1RhYmxlOiBBcnJheTxhbnk+O1xyXG4gICAgcmFua0NsYXNzTmFtZTogQXJyYXk8c3RyaW5nPiA9IFtcImktcmFuay1maXJzdFwiLCBcImktcmFuay1zZWNvbmRcIiwgXCJpLXJhbmstdGhpcmRcIl07XHJcbiAgICBpc0FsbFJhbmtMaXN0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBGdW5jdGlvbixcclxuICAgICAgICBwcml2YXRlIGkxOG5GYWN0b3J5OiBhbnlcclxuICAgICkge1xyXG5cclxuICAgICAgICBsZXQgZW5sYXJnZUtleSA9ICRzY29wZS5lbmxhcmdlO1xyXG5cclxuICAgICAgICBpZiAoZW5sYXJnZUtleSAmJiBlbmxhcmdlS2V5Lm5hbWUgPT0gXCJBbGxSYW5rTGlzdFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNBbGxSYW5rTGlzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIGVubGFyZ2VLZXkuY29uZmlnID0gYW5ndWxhci5jb3B5KGVubGFyZ2VLZXkuY29uZmlnKS5zbGljZSgwLCAxMCk7XHJcbiAgICAgICAgICAgIHRoaXMuUmFua1RhYmxlID0gZW5sYXJnZUtleTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmluaXQoZW5sYXJnZUtleSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXQoc2V0RW5sYXJnZURhdGE6IENoYXJ0T3B0aW9ucy5zZXRFbmxhcmdlRGF0YSkge1xyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZG9tOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5sYXJnZUVjaGFydCcpO1xyXG4gICAgICAgICAgICBsZXQgZWxlID0gZWNoYXJ0cy5pbml0KGRvbSk7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZXM6IGFueSA9IHNldEVubGFyZ2VEYXRhLmNvbmZpZy5zZXJpZXM7XHJcblxyXG4gICAgICAgICAgICAvLyDliKDpmaTlrZfkvZPmlpznnYBcclxuICAgICAgICAgICAgbGV0IHJvdGF0ZTogYW55ID0gc2V0RW5sYXJnZURhdGEuY29uZmlnLnhBeGlzO1xyXG4gICAgICAgICAgICBpZiAocm90YXRlICYmIHJvdGF0ZS5heGlzTGFiZWwgJiYgcm90YXRlLmF4aXNMYWJlbC5pbnRlcnZhbCkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHJvdGF0ZS5heGlzTGFiZWwuaW50ZXJ2YWw7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgcm90YXRlLmF4aXNMYWJlbC5yb3RhdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNlcmllcyAmJiBzZXJpZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VyaWVzRGF0YSA9IFtdIGFzIEFycmF5PGFueT47XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlcmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXJpZXNbaV0gJiYgc2VyaWVzW2ldLnR5cGUgJiYgc2VyaWVzW2ldLnR5cGUgPT0gXCJiYXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWVzW2ldLmJhcldpZHRoID0gMzA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWVzRGF0YS5wdXNoKHNlcmllc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZXRFbmxhcmdlRGF0YS5jb25maWcuc2VyaWVzID0gc2VyaWVzRGF0YTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IEVDaGFydE9wdGlvbkNvbmZpZzogYW55ID0gc2V0RW5sYXJnZURhdGEuY29uZmlnO1xyXG4gICAgICAgICAgICBlbGUuc2V0T3B0aW9uKEVDaGFydE9wdGlvbkNvbmZpZyk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignRW5sYXJnZUNvbnRyb2xsZXInLCBFbmxhcmdlQ29udHJvbGxlcik7Il19
