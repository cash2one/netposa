define(["require", "exports", "../../common/app/main.app", "../../../core/server/enum/NationType"], function (require, exports, main_app_1, NationType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FaceanalysisPopupDetailController = (function () {
        function FaceanalysisPopupDetailController($scope, layer) {
            this.$scope = $scope;
            this.layer = layer;
            this.baseImage = null;
            this.nationMap = NationType_1.getNationTypeForMap();
            this.result = $scope.result;
            this.resultIndex = $scope.index;
            this.allResult = $scope.allResult;
            this.baseImage = $scope.baseImage;
        }
        FaceanalysisPopupDetailController.prototype.prevResult = function () {
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
        FaceanalysisPopupDetailController.prototype.nextResult = function () {
            var index = this.resultIndex + 1;
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
        FaceanalysisPopupDetailController.$inject = ['$scope', 'layer'];
        return FaceanalysisPopupDetailController;
    }());
    main_app_1.app.controller('FaceanalysisPopupDetailController', FaceanalysisPopupDetailController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9GYWNlQW5hbHlzaXNQb3B1cERldGFpbC9mYWNlYW5hbHlzaXMucG9wdXAuZGV0YWlsLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBS0E7UUFPSSwyQ0FBb0IsTUFBVyxFQUFVLEtBQVU7WUFBL0IsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUFVLFVBQUssR0FBTCxLQUFLLENBQUs7WUFGbkQsY0FBUyxHQUFVLElBQUksQ0FBQztZQUN4QixjQUFTLEdBQW9FLGdDQUFtQixFQUFFLENBQUM7WUFFL0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3RDLENBQUM7UUFFRCxzREFBVSxHQUFWO1lBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDakMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0IsQ0FBQztZQUFBLElBQUksQ0FBQSxDQUFDO2dCQUNGLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQSxDQUFDO29CQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3BDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFBO2dCQUM1QixDQUFDO2dCQUFBLElBQUksQ0FBQSxDQUFDO29CQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMzQixDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7UUFDRCxzREFBVSxHQUFWO1lBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDakMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFFLENBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdCLENBQUM7WUFBQSxJQUFJLENBQUEsQ0FBQztnQkFDRixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUEsQ0FBQztvQkFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNwQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQTtnQkFDNUIsQ0FBQztnQkFBQSxJQUFJLENBQUEsQ0FBQztvQkFDRixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDM0IsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBdENNLHlDQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUF1Q3pDLHdDQUFDO0tBeENELEFBd0NDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLG1DQUFtQyxFQUFFLGlDQUFpQyxDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL0ludGVsbGlnZW50QW5hbHlzaXMvRmFjZUFuYWx5c2lzUG9wdXBEZXRhaWwvZmFjZWFuYWx5c2lzLnBvcHVwLmRldGFpbC5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCB7UGVyc29uSW5mb01vZGVsfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvRmFjZUFuYWx5c2lzRW51bVwiO1xyXG5pbXBvcnQge2dldE5hdGlvblR5cGVGb3JNYXB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL05hdGlvblR5cGVcIjtcclxuXHJcbmRlY2xhcmUgbGV0IHJlcXVpcmU6YW55O1xyXG5jbGFzcyBGYWNlYW5hbHlzaXNQb3B1cERldGFpbENvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsICdsYXllciddO1xyXG4gICAgcmVzdWx0SW5kZXg6IG51bWJlcjtcclxuICAgIHJlc3VsdDogUGVyc29uSW5mb01vZGVsO1xyXG4gICAgYWxsUmVzdWx0OkFycmF5PFBlcnNvbkluZm9Nb2RlbD47XHJcbiAgICBiYXNlSW1hZ2U6c3RyaW5nID0gbnVsbDtcclxuICAgIG5hdGlvbk1hcDp7W2tleTpzdHJpbmddOnt0ZXh0OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIHBhcmVudENvZGU6IHN0cmluZ319ID0gZ2V0TmF0aW9uVHlwZUZvck1hcCgpO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSwgcHJpdmF0ZSBsYXllcjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5yZXN1bHQgPSAkc2NvcGUucmVzdWx0O1xyXG4gICAgICAgIHRoaXMucmVzdWx0SW5kZXggPSAkc2NvcGUuaW5kZXg7XHJcbiAgICAgICAgdGhpcy5hbGxSZXN1bHQgPSAkc2NvcGUuYWxsUmVzdWx0O1xyXG4gICAgICAgIHRoaXMuYmFzZUltYWdlID0gJHNjb3BlLmJhc2VJbWFnZTtcclxuICAgIH1cclxuXHJcbiAgICBwcmV2UmVzdWx0KCkge1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMucmVzdWx0SW5kZXggLSAxO1xyXG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5tc2coJ+ayoeacieS4iuS4gOadoeS6hicpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLmFsbFJlc3VsdFtpbmRleF0pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgPSB0aGlzLmFsbFJlc3VsdFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdEluZGV4ID0gaW5kZXhcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyLm1zZygn5rKh5pyJ5pWw5o2uJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBuZXh0UmVzdWx0KCkge1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMucmVzdWx0SW5kZXggKyAxO1xyXG4gICAgICAgIGlmIChpbmRleCA+IHRoaXMuYWxsUmVzdWx0Lmxlbmd0aCAtMSApIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5tc2coJ+ayoeacieS4i+S4gOadoeS6hicpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLmFsbFJlc3VsdFtpbmRleF0pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgPSB0aGlzLmFsbFJlc3VsdFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdEluZGV4ID0gaW5kZXhcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyLm1zZygn5rKh5pyJ5pWw5o2uJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdGYWNlYW5hbHlzaXNQb3B1cERldGFpbENvbnRyb2xsZXInLCBGYWNlYW5hbHlzaXNQb3B1cERldGFpbENvbnRyb2xsZXIpOyJdfQ==
