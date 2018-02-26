define(["require", "exports", "text!../fullPlayPopup/fullPlayPopup.html", "../common/app/main.app", "../../core/enum/AlarmResponseState", "../fullPlayPopup/fullPlayPopup.controller", "css!./alarm.detail.css", "../common/factory/layerMsg.factory", "../common/services/camera.service"], function (require, exports, popupHtml, main_app_1, AlarmResponseState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AlarmDetailPoupController = (function () {
        function AlarmDetailPoupController($scope, layerDec, cameraService, layer) {
            this.$scope = $scope;
            this.layerDec = layerDec;
            this.cameraService = cameraService;
            this.layer = layer;
            this.libIndex = 0;
            this.resultPageIndex = 0;
            this.AlarmResponseState = AlarmResponseState_1.AlarmResponseState;
            this.alarmNowInfo = this.$scope.alarmData;
            this.resultPageCount = Math.ceil(this.alarmNowInfo.AlarmLogInfoArr.length / 4);
            console.log(this.alarmNowInfo);
        }
        AlarmDetailPoupController.prototype.resetAlarmResponseState = function () {
            this.alarmNowInfo.AlarmLogInfoArr.forEach(function (item) {
            });
        };
        AlarmDetailPoupController.prototype.fullPlay = function () {
            var _this = this;
            var cameraId = this.alarmNowInfo.AlarmLog.ObjectID;
            this.cameraService.findPlayerForID(cameraId).then(function (res) {
                var scope = _this.$scope.$new();
                scope.playerInfo = res.data;
                scope.alarmInfo = _this.alarmNowInfo;
                _this.currentLayerIndex = _this.layer.open({
                    type: 1,
                    content: popupHtml,
                    scope: scope,
                    title: "报警详情",
                    area: ["854px", "522px"],
                    end: function () {
                        scope.$destroy();
                    }
                });
            });
        };
        AlarmDetailPoupController.prototype.changeLibResult = function (i) {
            this.libIndex = i;
        };
        AlarmDetailPoupController.prototype.changeResultPage = function (type) {
            if (type === 'next') {
                if ((this.resultPageIndex + 1) < this.resultPageCount) {
                    this.resultPageIndex++;
                    console.log(this.resultPageIndex);
                }
            }
            if (type === 'prev') {
                if ((this.resultPageIndex - 1) > 1) {
                    this.resultPageIndex--;
                }
            }
        };
        AlarmDetailPoupController.$inject = ['$scope', 'layerDec', 'cameraService', 'layer'];
        return AlarmDetailPoupController;
    }());
    main_app_1.app.controller('alarmDetailPoupController', AlarmDetailPoupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvQWxhcm1JbmZvUG9wdXAvYWxhcm0uZGV0YWlsLnBvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBZ0JBO1FBU0ksbUNBQW9CLE1BQVcsRUFBVSxRQUFtQixFQUFVLGFBQTZCLEVBQVUsS0FBVTtZQUFuRyxXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztZQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtZQUFVLFVBQUssR0FBTCxLQUFLLENBQUs7WUFMdkgsYUFBUSxHQUFXLENBQUMsQ0FBQztZQUNyQixvQkFBZSxHQUFXLENBQUMsQ0FBQztZQUU1Qix1QkFBa0IsR0FBdUQsdUNBQWtCLENBQUM7WUFHeEYsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUMxQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQy9FLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFRCwyREFBdUIsR0FBdkI7WUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFrQjtZQUU3RCxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFFRCw0Q0FBUSxHQUFSO1lBQUEsaUJBdUJDO1lBdEJHLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztZQUluRCxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUEwQjtnQkFFckUsSUFBSSxLQUFLLEdBQXdFLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3BHLEtBQUssQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDNUIsS0FBSyxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDO2dCQUNwQyxLQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQ3JDLElBQUksRUFBRSxDQUFDO29CQUNQLE9BQU8sRUFBRSxTQUFTO29CQUNsQixLQUFLLEVBQUUsS0FBSztvQkFDWixLQUFLLEVBQUUsTUFBTTtvQkFDYixJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO29CQUN4QixHQUFHLEVBQUU7d0JBQ0QsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNyQixDQUFDO2lCQUNKLENBQUMsQ0FBQztZQUVYLENBQUMsQ0FBQyxDQUFBO1FBRU4sQ0FBQztRQUVELG1EQUFlLEdBQWYsVUFBZ0IsQ0FBUztZQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUN0QixDQUFDO1FBRUQsb0RBQWdCLEdBQWhCLFVBQWlCLElBQVk7WUFDekIsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztvQkFDcEQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO29CQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtnQkFDckMsQ0FBQztZQUNMLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDM0IsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBN0RNLGlDQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQStEdEUsZ0NBQUM7S0FoRUQsQUFnRUMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsMkJBQTJCLEVBQUUseUJBQXlCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvQWxhcm1JbmZvUG9wdXAvYWxhcm0uZGV0YWlsLnBvdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uL2Z1bGxQbGF5UG9wdXAvZnVsbFBsYXlQb3B1cC5odG1sXCIgbmFtZT1cInBvcHVwSHRtbFwiIC8+XHJcblxyXG5pbXBvcnQgXCIuLi9mdWxsUGxheVBvcHVwL2Z1bGxQbGF5UG9wdXAuY29udHJvbGxlclwiXHJcbmltcG9ydCAnY3NzIS4vYWxhcm0uZGV0YWlsLmNzcyc7XHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQge0FsYXJtUmVzdWx0SW5mbywgUGVyc29uQWxhcm1SZXN1bHR9IGZyb20gXCIuLi8uLi9jb3JlL2VudGl0eS9QZXJzb25BbGFybUVudW1cIjtcclxuaW1wb3J0IHtJTGF5ZXJEZWN9IGZyb20gXCIuLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uL2NvbW1vbi9mYWN0b3J5L2xheWVyTXNnLmZhY3RvcnlcIjtcclxuaW1wb3J0IHtBbGFybVJlc3BvbnNlU3RhdGV9IGZyb20gXCIuLi8uLi9jb3JlL2VudW0vQWxhcm1SZXNwb25zZVN0YXRlXCI7XHJcbmltcG9ydCB7QWxhcm1Mb2dJbmZvfSBmcm9tIFwiLi4vLi4vY29yZS9lbnRpdHkvQWxhcm1Mb2dcIjtcclxuaW1wb3J0IHtJQ2FtZXJhU2VydmljZX0gZnJvbSBcIi4uL2NvbW1vbi9zZXJ2aWNlcy9jYW1lcmEuc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuLi9jb21tb24vc2VydmljZXMvY2FtZXJhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtCYWNrUmVzcG9uc2VCb2R5fSBmcm9tIFwiLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcblxyXG5kZWNsYXJlIGxldCAkOiBhbnksIGFuZ3VsYXI6IGFueSwgcG9wdXBIdG1sOiBhbnk7XHJcblxyXG5jbGFzcyBBbGFybURldGFpbFBvdXBDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnbGF5ZXJEZWMnLCAnY2FtZXJhU2VydmljZScsICdsYXllciddO1xyXG4gICAgYWxhcm1Ob3dJbmZvOiBBbGFybVJlc3VsdEluZm87XHJcbiAgICBjdXJyZW50TGF5ZXJJbmRleDogbnVtYmVyO1xyXG4gICAgbGliSW5kZXg6IG51bWJlciA9IDA7XHJcbiAgICByZXN1bHRQYWdlSW5kZXg6IG51bWJlciA9IDA7XHJcbiAgICByZXN1bHRQYWdlQ291bnQ6IG51bWJlcjtcclxuICAgIEFsYXJtUmVzcG9uc2VTdGF0ZTogeyBba2V5OiBzdHJpbmddOiB7IHZhbHVlOiBzdHJpbmcsIHRleHQ6IHN0cmluZyB9IH0gPSBBbGFybVJlc3BvbnNlU3RhdGU7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSwgcHJpdmF0ZSBsYXllckRlYzogSUxheWVyRGVjLCBwcml2YXRlIGNhbWVyYVNlcnZpY2U6IElDYW1lcmFTZXJ2aWNlLCBwcml2YXRlIGxheWVyOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmFsYXJtTm93SW5mbyA9IHRoaXMuJHNjb3BlLmFsYXJtRGF0YTtcclxuICAgICAgICB0aGlzLnJlc3VsdFBhZ2VDb3VudCA9IE1hdGguY2VpbCh0aGlzLmFsYXJtTm93SW5mby5BbGFybUxvZ0luZm9BcnIubGVuZ3RoIC8gNCk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5hbGFybU5vd0luZm8pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0QWxhcm1SZXNwb25zZVN0YXRlKCkge1xyXG4gICAgICAgIHRoaXMuYWxhcm1Ob3dJbmZvLkFsYXJtTG9nSW5mb0Fyci5mb3JFYWNoKChpdGVtOiBBbGFybUxvZ0luZm8pID0+IHtcclxuICAgICAgICAgICAgLy9pZihpdGVtLlBlcnNvbkluZm8uKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZnVsbFBsYXkoKSB7XHJcbiAgICAgICAgbGV0IGNhbWVyYUlkID0gdGhpcy5hbGFybU5vd0luZm8uQWxhcm1Mb2cuT2JqZWN0SUQ7XHJcbiAgICAgICAgLy8gaWYgKCFjYW1lcmFJZCkge1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gdGhpcy5sYXllckRlYy5mYWlsSW5mbygn5pyq6I635Y+W5Yiw5pGE5YOP5py65L+h5oGv77yBJylcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5jYW1lcmFTZXJ2aWNlLmZpbmRQbGF5ZXJGb3JJRChjYW1lcmFJZCkudGhlbigocmVzOiBCYWNrUmVzcG9uc2VCb2R5PGFueT4pID0+IHtcclxuICAgICAgICAgICAgLy9pZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjb3BlOiB7IHBsYXllckluZm86IGFueSwgYWxhcm1JbmZvOiBBbGFybVJlc3VsdEluZm8sICRkZXN0cm95OiBGdW5jdGlvbiB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgICAgICAgICAgc2NvcGUucGxheWVySW5mbyA9IHJlcy5kYXRhO1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuYWxhcm1JbmZvID0gdGhpcy5hbGFybU5vd0luZm87XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRMYXllckluZGV4ID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHBvcHVwSHRtbCxcclxuICAgICAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi5oql6K2m6K+m5oOFXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYXJlYTogW1wiODU0cHhcIiwgXCI1MjJweFwiXSxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlTGliUmVzdWx0KGk6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubGliSW5kZXggPSBpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVJlc3VsdFBhZ2UodHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICduZXh0Jykge1xyXG4gICAgICAgICAgICBpZiAoKHRoaXMucmVzdWx0UGFnZUluZGV4ICsgMSkgPCB0aGlzLnJlc3VsdFBhZ2VDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRQYWdlSW5kZXgrKztcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVzdWx0UGFnZUluZGV4KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSAncHJldicpIHtcclxuICAgICAgICAgICAgaWYgKCh0aGlzLnJlc3VsdFBhZ2VJbmRleCAtIDEpID4gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRQYWdlSW5kZXgtLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdhbGFybURldGFpbFBvdXBDb250cm9sbGVyJywgQWxhcm1EZXRhaWxQb3VwQ29udHJvbGxlcik7Il19
