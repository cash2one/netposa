define(["require", "exports", "../../common/app/main.app", "../AnalysisEnum", "css!./track.popup.detail.css", "../../common/factory/layerMsg.factory", "../../common/services/analysis.service"], function (require, exports, main_app_1, AnalysisEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TrackPopupDetailController = (function () {
        function TrackPopupDetailController($scope, layerDec, analysisService) {
            this.$scope = $scope;
            this.layerDec = layerDec;
            this.analysisService = analysisService;
            this.ageData = AnalysisEnum_1.getAgeList();
            this.result = $scope.result;
            this.resultIndex = $scope.index;
            this.allResult = $scope.allResult;
            this.groupAge = this.ageToGroupAge(this.result.AccessLog.Age);
            this.getRealyInfoForID(this.result.AccessLog.ID);
        }
        TrackPopupDetailController.prototype.getRealyInfoForID = function (id) {
            this.analysisService.findRealyInfo([id]).then(function (res) {
                console.log(res);
            });
        };
        TrackPopupDetailController.prototype.ageToGroupAge = function (value) {
            var result;
            for (var i = 0; i < this.ageData.length; i++) {
                var item = this.ageData[i];
                if (value >= item.value.minAge && value <= item.value.maxAge) {
                    result = item.text;
                    break;
                }
            }
            return result ? result : '未知';
        };
        TrackPopupDetailController.prototype.prevResult = function () {
            var index = this.resultIndex - 1;
            if (index < 0) {
                this.layerDec.warnInfo('没有上一条了');
            }
            else {
                if (this.allResult[index]) {
                    this.result = this.allResult[index];
                    this.resultIndex = index;
                    this.groupAge = this.ageToGroupAge(this.result.AccessLog.Age);
                }
                else {
                    this.layerDec.warnInfo('没有数据');
                }
            }
        };
        TrackPopupDetailController.prototype.nextResult = function () {
            var index = this.resultIndex + 1;
            if (index > this.allResult.length - 1) {
                this.layerDec.warnInfo('没有下一条了');
            }
            else {
                if (this.allResult[index]) {
                    this.result = this.allResult[index];
                    this.resultIndex = index;
                    this.groupAge = this.ageToGroupAge(this.result.AccessLog.Age);
                }
                else {
                    this.layerDec.warnInfo('没有数据');
                }
            }
        };
        TrackPopupDetailController.$inject = ['$scope', 'layerDec', 'analysisService'];
        return TrackPopupDetailController;
    }());
    main_app_1.app.controller('TrackPopupDetailController', TrackPopupDetailController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9UcmFja1BvcHVwRGV0YWlsL3RyYWNrLnBvcHVwLmRldGFpbC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVVBO1FBU0ksb0NBQW9CLE1BQVcsRUFBVSxRQUFtQixFQUFTLGVBQWdDO1lBQWpGLFdBQU0sR0FBTixNQUFNLENBQUs7WUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1lBQVMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1lBSnJHLFlBQU8sR0FBb0IseUJBQVUsRUFBRSxDQUFDO1lBS3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckQsQ0FBQztRQUVPLHNEQUFpQixHQUF6QixVQUEwQixFQUFTO1lBQy9CLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO2dCQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3BCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUNPLGtEQUFhLEdBQXJCLFVBQXNCLEtBQVk7WUFDOUIsSUFBSSxNQUFjLENBQUM7WUFDbkIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUMzQyxJQUFJLElBQUksR0FBYyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDM0QsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ25CLEtBQUssQ0FBQztnQkFDVixDQUFDO1lBQ0wsQ0FBQztZQUNELE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2xDLENBQUM7UUFDRCwrQ0FBVSxHQUFWO1lBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDakMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDckMsQ0FBQztZQUFBLElBQUksQ0FBQSxDQUFDO2dCQUNGLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQSxDQUFDO29CQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3BDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO29CQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xFLENBQUM7Z0JBQUEsSUFBSSxDQUFBLENBQUM7b0JBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ25DLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUNELCtDQUFVLEdBQVY7WUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztZQUNqQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUUsQ0FBRSxDQUFDLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDckMsQ0FBQztZQUFBLElBQUksQ0FBQSxDQUFDO2dCQUNGLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQSxDQUFDO29CQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3BDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO29CQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xFLENBQUM7Z0JBQUEsSUFBSSxDQUFBLENBQUM7b0JBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ25DLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQTNETSxrQ0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBNEQ5RCxpQ0FBQztLQTdERCxBQTZEQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyw0QkFBNEIsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL1RyYWNrUG9wdXBEZXRhaWwvdHJhY2sucG9wdXAuZGV0YWlsLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2NzcyEuL3RyYWNrLnBvcHVwLmRldGFpbC5jc3MnO1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHtSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9GYWNlVHJhY2tFbnVtXCI7XHJcbmltcG9ydCB7Z2V0QWdlTGlzdCwgQWdlLCBFbnVtfSBmcm9tIFwiLi4vQW5hbHlzaXNFbnVtXCI7XHJcbmltcG9ydCB7SUxheWVyRGVjfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZhY3RvcnkvbGF5ZXJNc2cuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcbmltcG9ydCB7SUFuYWx5c2lzU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hbmFseXNpcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hbmFseXNpcy5zZXJ2aWNlXCI7XHJcblxyXG5kZWNsYXJlIGxldCByZXF1aXJlOmFueTtcclxuY2xhc3MgVHJhY2tQb3B1cERldGFpbENvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsICdsYXllckRlYycsJ2FuYWx5c2lzU2VydmljZSddO1xyXG4gICAgcmVzdWx0SW5kZXg6IG51bWJlcjtcclxuICAgIHJlc3VsdDogUmVzdWx0O1xyXG4gICAgYWxsUmVzdWx0OkFycmF5PFJlc3VsdD47XHJcbiAgICBhZ2VEYXRhOkFycmF5PEVudW08QWdlPj4gPSBnZXRBZ2VMaXN0KCk7XHJcbiAgICBncm91cEFnZTpzdHJpbmc7XHJcbiAgICBzaG93UmVhbHlJbmZvOmJvb2xlYW47XHJcbiAgICByZWFseUluZm86YW55O1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSwgcHJpdmF0ZSBsYXllckRlYzogSUxheWVyRGVjLHByaXZhdGUgYW5hbHlzaXNTZXJ2aWNlOklBbmFseXNpc1NlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLnJlc3VsdCA9ICRzY29wZS5yZXN1bHQ7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRJbmRleCA9ICRzY29wZS5pbmRleDtcclxuICAgICAgICB0aGlzLmFsbFJlc3VsdCA9ICRzY29wZS5hbGxSZXN1bHQ7XHJcbiAgICAgICAgdGhpcy5ncm91cEFnZSA9IHRoaXMuYWdlVG9Hcm91cEFnZSh0aGlzLnJlc3VsdC5BY2Nlc3NMb2cuQWdlKTtcclxuICAgICAgICB0aGlzLmdldFJlYWx5SW5mb0ZvcklEKHRoaXMucmVzdWx0LkFjY2Vzc0xvZy5JRCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRSZWFseUluZm9Gb3JJRChpZDpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNTZXJ2aWNlLmZpbmRSZWFseUluZm8oW2lkXSkudGhlbigocmVzKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHByaXZhdGUgYWdlVG9Hcm91cEFnZSh2YWx1ZTpudW1iZXIpe1xyXG4gICAgICAgIGxldCByZXN1bHQ6IHN0cmluZztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWdlRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbTogRW51bTxBZ2U+ID0gdGhpcy5hZ2VEYXRhW2ldO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPj0gaXRlbS52YWx1ZS5taW5BZ2UgJiYgdmFsdWUgPD0gaXRlbS52YWx1ZS5tYXhBZ2UpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGl0ZW0udGV4dDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQgPyByZXN1bHQgOiAn5pyq55+lJztcclxuICAgIH1cclxuICAgIHByZXZSZXN1bHQoKSB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5yZXN1bHRJbmRleCAtIDE7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKCfmsqHmnInkuIrkuIDmnaHkuoYnKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5hbGxSZXN1bHRbaW5kZXhdKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ID0gdGhpcy5hbGxSZXN1bHRbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cEFnZSA9IHRoaXMuYWdlVG9Hcm91cEFnZSh0aGlzLnJlc3VsdC5BY2Nlc3NMb2cuQWdlKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKCfmsqHmnInmlbDmja4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG5leHRSZXN1bHQoKSB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5yZXN1bHRJbmRleCArIDE7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gdGhpcy5hbGxSZXN1bHQubGVuZ3RoIC0xICkge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKCfmsqHmnInkuIvkuIDmnaHkuoYnKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5hbGxSZXN1bHRbaW5kZXhdKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ID0gdGhpcy5hbGxSZXN1bHRbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cEFnZSA9IHRoaXMuYWdlVG9Hcm91cEFnZSh0aGlzLnJlc3VsdC5BY2Nlc3NMb2cuQWdlKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKCfmsqHmnInmlbDmja4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ1RyYWNrUG9wdXBEZXRhaWxDb250cm9sbGVyJywgVHJhY2tQb3B1cERldGFpbENvbnRyb2xsZXIpOyJdfQ==
