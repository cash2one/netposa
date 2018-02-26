define(["require", "exports", "../../../../common/app/main.app", "../../../../common/directive/page/page-params"], function (require, exports, main_app_1, page_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PositionSearchPageController = (function () {
        function PositionSearchPageController($scope, $timeout, layer) {
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
        PositionSearchPageController.prototype.initParams = function () {
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
        PositionSearchPageController.prototype.selectTime = function (item) {
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
        PositionSearchPageController.prototype.changePage = function (num) {
            this.pageParams.currentPage = num;
            return this.pageParams;
        };
        ;
        return PositionSearchPageController;
    }());
    main_app_1.app.controller('PositionSearchPageController', PositionSearchPageController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL2FkdmFuY2VkU2VhcmNoL2FkdmFuY2VkUGFnZS9wb3NpdGlvblNlYXJjaFBhZ2UuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFNQTtRQVdJLHNDQUFvQixNQUFXLEVBQ1gsUUFBYSxFQUNiLEtBQVU7WUFGVixXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQ1gsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUNiLFVBQUssR0FBTCxLQUFLLENBQUs7WUFaOUIsWUFBTyxHQUFrQixDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFekQsYUFBUSxHQUFXLEdBQUcsQ0FBQztZQUN2QixxQkFBZ0IsR0FBVyxDQUFDLENBQUM7WUFDN0IsYUFBUSxHQUFZLElBQUksQ0FBQztZQUV6QixlQUFVLEdBQWUsSUFBSSxxQkFBVSxFQUFFLENBQUM7WUFPdEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBRWhCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUdsQixRQUFRLENBQUM7Z0JBQ0wsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLHFCQUFVLEVBQUUsQ0FBQztnQkFDMUMsa0JBQWtCLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztnQkFDakMsa0JBQWtCLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFDbkMsa0JBQWtCLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztnQkFDbkMsa0JBQWtCLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxrQkFBa0IsQ0FBQztZQUN6QyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFYixDQUFDO1FBS00saURBQVUsR0FBakI7WUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEIsSUFBSSxDQUFDLFlBQVksR0FBRztnQkFDaEIsY0FBYyxFQUFFLEVBQUU7Z0JBQ2xCLGlCQUFpQixFQUFFLEVBQUU7Z0JBQ3JCLGFBQWEsRUFBRSxFQUFFO2FBQ3BCLENBQUM7WUFFRixJQUFJLENBQUMsa0JBQWtCLEdBQUc7Z0JBQ3RCO29CQUNJLE1BQU0sRUFBRSxLQUFLO29CQUNiLElBQUksRUFBRSxJQUFJO29CQUNWLEdBQUcsRUFBRSxDQUFDO2lCQUNULEVBQUU7b0JBQ0MsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsR0FBRyxFQUFFLENBQUM7aUJBQ1QsRUFBRTtvQkFDQyxNQUFNLEVBQUUsS0FBSztvQkFDYixJQUFJLEVBQUUsS0FBSztvQkFDWCxHQUFHLEVBQUUsQ0FBQztpQkFDVCxFQUFFO29CQUNDLE1BQU0sRUFBRSxLQUFLO29CQUNiLElBQUksRUFBRSxLQUFLO29CQUNYLEdBQUcsRUFBRSxDQUFDO2lCQUNULEVBQUU7b0JBQ0MsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsR0FBRyxFQUFFLENBQUM7aUJBQ1Q7YUFBQyxDQUFDO1FBQ1gsQ0FBQztRQUFBLENBQUM7UUFPSyxpREFBVSxHQUFqQixVQUFrQixJQUFvQjtZQUNsQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSztnQkFDekQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDekIsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUN0QyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQUEsQ0FBQztRQVFLLGlEQUFVLEdBQWpCLFVBQWtCLEdBQVc7WUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7UUFBQSxDQUFDO1FBQ04sbUNBQUM7SUFBRCxDQTVGQSxBQTRGQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9yZXNvdXJjZVJldHJpZXZhbC9zZWFyY2gvYWR2YW5jZWRTZWFyY2gvYWR2YW5jZWRQYWdlL3Bvc2l0aW9uU2VhcmNoUGFnZS5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthcHB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHAnO1xyXG5pbXBvcnQgUGFnZVBhcmFtcyBmcm9tICcuLi8uLi8uLi8uLi9jb21tb24vZGlyZWN0aXZlL3BhZ2UvcGFnZS1wYXJhbXMnO1xyXG5pbXBvcnQge0NhclNlYXJjaFBhcmFtcywgbXVsdGlwbGVDaG9pY2V9IGZyb20gJy4uL2FkVmFuY2VTZWFyY2hFbnVtJztcclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuXHJcbmNsYXNzIFBvc2l0aW9uU2VhcmNoUGFnZUNvbnRyb2xsZXIge1xyXG4gICAgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnJHNjb3BlJywgJyR0aW1lb3V0JywgJ2xheWVyJ107XHJcblxyXG4gICAgbWF4U2FjbGU6IG51bWJlciA9IDEwMDsgLy8gIOebuOS8vOW6puacgOWkp+WAvFxyXG4gICAgc2VsZWN0VGltZUFjaXR2ZTogbnVtYmVyID0gMDsvL+aXtumXtOauteWPguaVsFxyXG4gICAgc2hvd01vcmU6IGJvb2xlYW4gPSB0cnVlOy8v5piv5ZCm5pi+56S65pu05aSaXHJcblxyXG4gICAgcGFnZVBhcmFtczogUGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKCk7XHJcbiAgICBzZWFyY2hQYXJhbXM6IENhclNlYXJjaFBhcmFtcztcclxuICAgIGNyb3NzVHJhaW5UaW1lTGlzdDogQXJyYXk8bXVsdGlwbGVDaG9pY2U+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyOiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdFBhcmFtcygpO1xyXG5cclxuICAgICAgICAvLyDlu7bml7blpITnkIZwYWdl5L+h5oGvXHJcbiAgICAgICAgJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcG9zaXRpb25QYWdlUGFyYW1zID0gbmV3IFBhZ2VQYXJhbXMoKTtcclxuICAgICAgICAgICAgcG9zaXRpb25QYWdlUGFyYW1zLnBhZ2VTaXplID0gMTA7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uUGFnZVBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uUGFnZVBhcmFtcy50b3RhbENvdW50ID0gMzQ7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uUGFnZVBhcmFtcy5wYWdlQ291bnQgPSAzNjtcclxuICAgICAgICAgICAgc2VsZi5wYWdlUGFyYW1zID0gcG9zaXRpb25QYWdlUGFyYW1zO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDliJ3lp4vljJblj4LmlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGluaXRQYXJhbXMoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zID0ge1xyXG4gICAgICAgICAgICBzZWFyY2hLZXlXb3JkczogJycsXHJcbiAgICAgICAgICAgIGZlYXR1cmVTaW1pbGFyaXR5OiA1MCxcclxuICAgICAgICAgICAgY2FyU2ltaWxhcml0eTogNTBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzZWxmLmNyb3NzVHJhaW5UaW1lTGlzdCA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICflhajpg6gnLFxyXG4gICAgICAgICAgICAgICAgdmFsOiAwXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAn6L+R5LiA5aSpJyxcclxuICAgICAgICAgICAgICAgIHZhbDogMVxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+i/keS4gOWRqCcsXHJcbiAgICAgICAgICAgICAgICB2YWw6IDJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfov5HkuIDmnIgnLFxyXG4gICAgICAgICAgICAgICAgdmFsOiAzXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAn6Ieq5a6a5LmJJyxcclxuICAgICAgICAgICAgICAgIHZhbDogNFxyXG4gICAgICAgICAgICB9XTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOmAieaLqeaXtumXtOautVxyXG4gICAgICogQHBhcmFtIHttdWx0aXBsZUNob2ljZX0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VsZWN0VGltZShpdGVtOiBtdWx0aXBsZUNob2ljZSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLmNyb3NzVHJhaW5UaW1lTGlzdC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS52YWwgPT09IGl0ZW0udmFsKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5zdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RUaW1lQWNpdHZlID0gdmFsdWUudmFsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuc3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOWIh+aNoumhteaVsFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bVxyXG4gICAgICogQHJldHVybnMge1BhZ2VQYXJhbXN9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGFuZ2VQYWdlKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlUGFyYW1zLmN1cnJlbnRQYWdlID0gbnVtO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2VQYXJhbXM7XHJcbiAgICB9O1xyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignUG9zaXRpb25TZWFyY2hQYWdlQ29udHJvbGxlcicsIFBvc2l0aW9uU2VhcmNoUGFnZUNvbnRyb2xsZXIpOyJdfQ==
