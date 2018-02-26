define(["require", "exports", "../../common/app/main.app", "css!./mac.popup.detail.css"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Promise = require('es6-promise');
    var MacPopupDetailController = (function () {
        function MacPopupDetailController($scope, layer) {
            this.$scope = $scope;
            this.layer = layer;
            this.allResult = [];
            this.result = $scope.result;
            this.resultIndex = $scope.index;
            this.allResult = $scope.allResult;
            console.log(this.allResult);
        }
        MacPopupDetailController.prototype.prevResult = function () {
            var index = this.resultIndex - 1;
            if (index < 0) {
                this.layer.msg('没有上一条了');
            }
            else {
                if (this.allResult[index]) {
                    this.result = this.allResult[index];
                    this.resultIndex = index;
                }
                else {
                    this.layer.msg('没有数据');
                }
            }
        };
        MacPopupDetailController.prototype.nextResult = function () {
            var index = this.resultIndex + 1;
            if (!this.allResult) {
                this.allResult = [];
            }
            if (index > this.allResult.length - 1) {
                this.layer.msg('没有下一条了');
            }
            else {
                if (this.allResult[index]) {
                    this.result = this.allResult[index];
                    this.resultIndex = index;
                }
                else {
                    this.layer.msg('没有数据');
                }
            }
        };
        MacPopupDetailController.$inject = ['$scope', 'layer'];
        return MacPopupDetailController;
    }());
    main_app_1.app.controller('MacPopupDetailController', MacPopupDetailController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9NYWNUcmFja1BvcHVwRGV0YWlsL21hYy5wb3B1cC5kZXRhaWwuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFHQSxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFckM7UUFLSSxrQ0FBb0IsTUFBVyxFQUFVLEtBQVU7WUFBL0IsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUFVLFVBQUssR0FBTCxLQUFLLENBQUs7WUFEbkQsY0FBUyxHQUFlLEVBQUUsQ0FBQztZQUV2QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUMvQixDQUFDO1FBRUQsNkNBQVUsR0FBVjtZQUNJLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdCLENBQUM7WUFBQSxJQUFJLENBQUEsQ0FBQztnQkFDRixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUEsQ0FBQztvQkFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNwQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQTtnQkFDNUIsQ0FBQztnQkFBQSxJQUFJLENBQUEsQ0FBQztvQkFDRixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDM0IsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBQ0QsNkNBQVUsR0FBVjtZQUNJLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBLENBQUM7Z0JBQUEsSUFBSSxDQUFDLFNBQVMsR0FBQyxFQUFFLENBQUE7WUFBQSxDQUFDO1lBQ3RDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRSxDQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3QixDQUFDO1lBQUEsSUFBSSxDQUFBLENBQUM7Z0JBQ0YsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUE7Z0JBQzVCLENBQUM7Z0JBQUEsSUFBSSxDQUFBLENBQUM7b0JBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzNCLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQXJDTSxnQ0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBc0N6QywrQkFBQztLQXZDRCxBQXVDQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQywwQkFBMEIsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL01hY1RyYWNrUG9wdXBEZXRhaWwvbWFjLnBvcHVwLmRldGFpbC5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdjc3MhLi9tYWMucG9wdXAuZGV0YWlsLmNzcyc7XHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQge1Jlc3VsdH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L0ZhY2VUcmFja0VudW1cIjtcclxubGV0IFByb21pc2UgPSByZXF1aXJlKCdlczYtcHJvbWlzZScpO1xyXG5kZWNsYXJlIGxldCByZXF1aXJlOmFueTtcclxuY2xhc3MgTWFjUG9wdXBEZXRhaWxDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnbGF5ZXInXTtcclxuICAgIHJlc3VsdEluZGV4OiBudW1iZXI7XHJcbiAgICByZXN1bHQ6IFJlc3VsdDtcclxuICAgIGFsbFJlc3VsdDpBcnJheTxSZXN1bHQ+PVtdO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSwgcHJpdmF0ZSBsYXllcjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5yZXN1bHQgPSAkc2NvcGUucmVzdWx0O1xyXG4gICAgICAgIHRoaXMucmVzdWx0SW5kZXggPSAkc2NvcGUuaW5kZXg7XHJcbiAgICAgICAgdGhpcy5hbGxSZXN1bHQgPSAkc2NvcGUuYWxsUmVzdWx0O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYWxsUmVzdWx0KVxyXG4gICAgfVxyXG5cclxuICAgIHByZXZSZXN1bHQoKSB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5yZXN1bHRJbmRleCAtIDE7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLm1zZygn5rKh5pyJ5LiK5LiA5p2h5LqGJyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYWxsUmVzdWx0W2luZGV4XSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCA9IHRoaXMuYWxsUmVzdWx0W2luZGV4XTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0SW5kZXggPSBpbmRleFxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5ZXIubXNnKCfmsqHmnInmlbDmja4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG5leHRSZXN1bHQoKSB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5yZXN1bHRJbmRleCArIDE7XHJcbiAgICAgICAgaWYoIXRoaXMuYWxsUmVzdWx0KXt0aGlzLmFsbFJlc3VsdD1bXX1cclxuICAgICAgICBpZiAoaW5kZXggPiB0aGlzLmFsbFJlc3VsdC5sZW5ndGggLTEgKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIubXNnKCfmsqHmnInkuIvkuIDmnaHkuoYnKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5hbGxSZXN1bHRbaW5kZXhdKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ID0gdGhpcy5hbGxSZXN1bHRbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRJbmRleCA9IGluZGV4XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXllci5tc2coJ+ayoeacieaVsOaNricpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignTWFjUG9wdXBEZXRhaWxDb250cm9sbGVyJywgTWFjUG9wdXBEZXRhaWxDb250cm9sbGVyKTsiXX0=
