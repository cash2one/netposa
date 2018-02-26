define(["require", "exports", "../../../../common/app/main.app", "../../../../common/directive/page/page-params"], function (require, exports, main_app_1, page_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DeviceSearchPageController = (function () {
        function DeviceSearchPageController($scope, $timeout, layer) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.layer = layer;
            this.$inject = ['$scope', '$timeout', 'layer'];
            this.maxSacle = 100;
            this.selectTimeAcitve = 0;
            this.showMore = true;
            this.pageParams = new page_params_1.default();
            var self = this;
            this.initParams();
            $timeout(function () {
                var positionPageParams = new page_params_1.default();
                positionPageParams.pageSize = 10;
                positionPageParams.currentPage = 1;
                positionPageParams.totalCount = 34;
                positionPageParams.pageCount = 36;
                self.pageParams = positionPageParams;
            }, 1000);
        }
        DeviceSearchPageController.prototype.initParams = function () {
            var self = this;
            self.searchParams = {
                searchKeyWords: '',
                featureSimilarity: 50,
                carSimilarity: 50
            };
            self.crossTrainTimeList = [
                {
                    status: false,
                    name: '全部',
                    val: 0
                }, {
                    status: false,
                    name: '近一天',
                    val: 1
                }, {
                    status: false,
                    name: '近一周',
                    val: 2
                }, {
                    status: false,
                    name: '近一月',
                    val: 3
                }, {
                    status: false,
                    name: '自定义',
                    val: 4
                }
            ];
        };
        ;
        DeviceSearchPageController.prototype.selectTime = function (item) {
            var self = this;
            self.crossTrainTimeList.forEach(function (value, index, array) {
                if (value.val === item.val) {
                    value.status = true;
                    self.selectTimeAcitve = value.val;
                }
                else {
                    value.status = false;
                }
            });
        };
        ;
        DeviceSearchPageController.prototype.changePage = function (num) {
            this.pageParams.currentPage = num;
            return this.pageParams;
        };
        ;
        return DeviceSearchPageController;
    }());
    main_app_1.app.controller('DeviceSearchPageController', DeviceSearchPageController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL2FkdmFuY2VkU2VhcmNoL2FkdmFuY2VkUGFnZS9kZXZpY2VTZWFyY2hQYWdlLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBTUE7UUFXSSxvQ0FBb0IsTUFBVyxFQUNYLFFBQWEsRUFDYixLQUFVO1lBRlYsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYixVQUFLLEdBQUwsS0FBSyxDQUFLO1lBWjlCLFlBQU8sR0FBa0IsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRXpELGFBQVEsR0FBVyxHQUFHLENBQUM7WUFDdkIscUJBQWdCLEdBQVcsQ0FBQyxDQUFDO1lBQzdCLGFBQVEsR0FBWSxJQUFJLENBQUM7WUFFekIsZUFBVSxHQUFlLElBQUkscUJBQVUsRUFBRSxDQUFDO1lBT3RDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUVoQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFHbEIsUUFBUSxDQUFDO2dCQUNMLElBQUksa0JBQWtCLEdBQUcsSUFBSSxxQkFBVSxFQUFFLENBQUM7Z0JBQzFDLGtCQUFrQixDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7Z0JBQ2pDLGtCQUFrQixDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7Z0JBQ25DLGtCQUFrQixDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7Z0JBQ25DLGtCQUFrQixDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxVQUFVLEdBQUcsa0JBQWtCLENBQUM7WUFDekMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWIsQ0FBQztRQUtNLCtDQUFVLEdBQWpCO1lBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxZQUFZLEdBQUc7Z0JBQ2hCLGNBQWMsRUFBRSxFQUFFO2dCQUNsQixpQkFBaUIsRUFBRSxFQUFFO2dCQUNyQixhQUFhLEVBQUUsRUFBRTthQUNwQixDQUFDO1lBRUYsSUFBSSxDQUFDLGtCQUFrQixHQUFHO2dCQUN0QjtvQkFDSSxNQUFNLEVBQUUsS0FBSztvQkFDYixJQUFJLEVBQUUsSUFBSTtvQkFDVixHQUFHLEVBQUUsQ0FBQztpQkFDVCxFQUFFO29CQUNDLE1BQU0sRUFBRSxLQUFLO29CQUNiLElBQUksRUFBRSxLQUFLO29CQUNYLEdBQUcsRUFBRSxDQUFDO2lCQUNULEVBQUU7b0JBQ0MsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsR0FBRyxFQUFFLENBQUM7aUJBQ1QsRUFBRTtvQkFDQyxNQUFNLEVBQUUsS0FBSztvQkFDYixJQUFJLEVBQUUsS0FBSztvQkFDWCxHQUFHLEVBQUUsQ0FBQztpQkFDVCxFQUFFO29CQUNDLE1BQU0sRUFBRSxLQUFLO29CQUNiLElBQUksRUFBRSxLQUFLO29CQUNYLEdBQUcsRUFBRSxDQUFDO2lCQUNUO2FBQUMsQ0FBQztRQUNYLENBQUM7UUFBQSxDQUFDO1FBT0ssK0NBQVUsR0FBakIsVUFBa0IsSUFBb0I7WUFDbEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUs7Z0JBQ3pELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3pCLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUNwQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFDdEMsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDekIsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUFBLENBQUM7UUFRSywrQ0FBVSxHQUFqQixVQUFrQixHQUFXO1lBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztZQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQixDQUFDO1FBQUEsQ0FBQztRQUNOLGlDQUFDO0lBQUQsQ0E1RkEsQUE0RkMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsNEJBQTRCLEVBQUUsMEJBQTBCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL2FkdmFuY2VkU2VhcmNoL2FkdmFuY2VkUGFnZS9kZXZpY2VTZWFyY2hQYWdlLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcH0gZnJvbSAnLi4vLi4vLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcCc7XHJcbmltcG9ydCBQYWdlUGFyYW1zIGZyb20gJy4uLy4uLy4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvcGFnZS9wYWdlLXBhcmFtcyc7XHJcbmltcG9ydCB7Q2FyU2VhcmNoUGFyYW1zLCBtdWx0aXBsZUNob2ljZX0gZnJvbSAnLi4vYWRWYW5jZVNlYXJjaEVudW0nO1xyXG5cclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55O1xyXG5cclxuY2xhc3MgRGV2aWNlU2VhcmNoUGFnZUNvbnRyb2xsZXIge1xyXG4gICAgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnJHNjb3BlJywgJyR0aW1lb3V0JywgJ2xheWVyJ107XHJcblxyXG4gICAgbWF4U2FjbGU6IG51bWJlciA9IDEwMDsgLy8gIOebuOS8vOW6puacgOWkp+WAvFxyXG4gICAgc2VsZWN0VGltZUFjaXR2ZTogbnVtYmVyID0gMDsvL+aXtumXtOauteWPguaVsFxyXG4gICAgc2hvd01vcmU6IGJvb2xlYW4gPSB0cnVlOy8v5piv5ZCm5pi+56S65pu05aSaXHJcblxyXG4gICAgcGFnZVBhcmFtczogUGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKCk7XHJcbiAgICBzZWFyY2hQYXJhbXM6IENhclNlYXJjaFBhcmFtcztcclxuICAgIGNyb3NzVHJhaW5UaW1lTGlzdDogQXJyYXk8bXVsdGlwbGVDaG9pY2U+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyOiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdFBhcmFtcygpO1xyXG5cclxuICAgICAgICAvLyDlu7bml7blpITnkIZwYWdl5L+h5oGvXHJcbiAgICAgICAgJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcG9zaXRpb25QYWdlUGFyYW1zID0gbmV3IFBhZ2VQYXJhbXMoKTtcclxuICAgICAgICAgICAgcG9zaXRpb25QYWdlUGFyYW1zLnBhZ2VTaXplID0gMTA7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uUGFnZVBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uUGFnZVBhcmFtcy50b3RhbENvdW50ID0gMzQ7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uUGFnZVBhcmFtcy5wYWdlQ291bnQgPSAzNjtcclxuICAgICAgICAgICAgc2VsZi5wYWdlUGFyYW1zID0gcG9zaXRpb25QYWdlUGFyYW1zO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDliJ3lp4vljJblj4LmlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGluaXRQYXJhbXMoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zID0ge1xyXG4gICAgICAgICAgICBzZWFyY2hLZXlXb3JkczogJycsXHJcbiAgICAgICAgICAgIGZlYXR1cmVTaW1pbGFyaXR5OiA1MCxcclxuICAgICAgICAgICAgY2FyU2ltaWxhcml0eTogNTBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzZWxmLmNyb3NzVHJhaW5UaW1lTGlzdCA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICflhajpg6gnLFxyXG4gICAgICAgICAgICAgICAgdmFsOiAwXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAn6L+R5LiA5aSpJyxcclxuICAgICAgICAgICAgICAgIHZhbDogMVxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+i/keS4gOWRqCcsXHJcbiAgICAgICAgICAgICAgICB2YWw6IDJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfov5HkuIDmnIgnLFxyXG4gICAgICAgICAgICAgICAgdmFsOiAzXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAn6Ieq5a6a5LmJJyxcclxuICAgICAgICAgICAgICAgIHZhbDogNFxyXG4gICAgICAgICAgICB9XTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOmAieaLqeaXtumXtOautVxyXG4gICAgICogQHBhcmFtIHttdWx0aXBsZUNob2ljZX0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VsZWN0VGltZShpdGVtOiBtdWx0aXBsZUNob2ljZSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLmNyb3NzVHJhaW5UaW1lTGlzdC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS52YWwgPT09IGl0ZW0udmFsKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5zdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RUaW1lQWNpdHZlID0gdmFsdWUudmFsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuc3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOWIh+aNoumhteaVsFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bVxyXG4gICAgICogQHJldHVybnMge1BhZ2VQYXJhbXN9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGFuZ2VQYWdlKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlUGFyYW1zLmN1cnJlbnRQYWdlID0gbnVtO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2VQYXJhbXM7XHJcbiAgICB9O1xyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignRGV2aWNlU2VhcmNoUGFnZUNvbnRyb2xsZXInLCBEZXZpY2VTZWFyY2hQYWdlQ29udHJvbGxlcik7Il19
