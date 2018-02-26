define(["require", "exports", "text!./alarmDetailPopup.html", "../../common/app/main.app", "css!./alarmDetailPopup.css", "./alarmDetailPopup.controller"], function (require, exports, alarmDetailPopupHtml, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AlarmDetailPopupFactory = (function () {
        function AlarmDetailPopupFactory(layer) {
            var _this = this;
            this.layer = layer;
            this.closePopup = function (parmas) {
                if (_this.parentParams && _this.parentParams.beforeClose) {
                    console.log("未实现调用异步操作");
                    console.log("执行 beforeClose");
                    _this.parentParams.beforeClose(parmas);
                }
                _this.layer.close(_this.layerIndex);
                if (_this.parentParams && _this.parentParams.beforeClose) {
                    console.log("未实现调用异步操作");
                    console.log("执行 afterClose");
                    _this.parentParams.afterClose(parmas);
                }
                return true;
            };
        }
        AlarmDetailPopupFactory.prototype.showPopup = function (parentScope, popupDatas) {
            var _this = this;
            this.parentParams = parentScope;
            var scope = parentScope.$new();
            scope.popupDatas = popupDatas;
            scope.closePopup = this.closePopup;
            this.layer.open({
                type: 1,
                btn: null,
                title: "报警详情",
                content: alarmDetailPopupHtml,
                scope: scope,
                area: ["650px"],
                skin: "m-alarm-detail-visible",
                end: function () {
                    scope.$destroy();
                    scope = null;
                }
            }).then(function (index) {
                _this.layerIndex = index;
            });
            parentScope = null;
        };
        AlarmDetailPopupFactory.$inject = ['layer'];
        return AlarmDetailPopupFactory;
    }());
    main_app_1.app.service('alarmDetailPopupFactory', AlarmDetailPopupFactory);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2FsYXJtRGV0YWlQb3B1cC9hbGFybURldGFpbFBvcHVwLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBc0NBO1FBRUksaUNBQW9CLEtBQVM7WUFBN0IsaUJBQWlDO1lBQWIsVUFBSyxHQUFMLEtBQUssQ0FBSTtZQTJCN0IsZUFBVSxHQUFHLFVBQUMsTUFBVTtnQkFDcEIsRUFBRSxDQUFBLENBQUMsS0FBSSxDQUFDLFlBQVksSUFBSSxLQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFBLENBQUM7b0JBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDOUIsS0FBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzFDLENBQUM7Z0JBRUQsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUVsQyxFQUFFLENBQUEsQ0FBQyxLQUFJLENBQUMsWUFBWSxJQUFJLEtBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUEsQ0FBQztvQkFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFDN0IsS0FBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3pDLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNoQixDQUFDLENBQUM7UUExQzhCLENBQUM7UUFJakMsMkNBQVMsR0FBVCxVQUFVLFdBQXdDLEVBQUMsVUFBMEI7WUFBN0UsaUJBcUJDO1lBcEJHLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1lBQ2hDLElBQUksS0FBSyxHQUFnQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDNUQsS0FBSyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDOUIsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNaLElBQUksRUFBQyxDQUFDO2dCQUNOLEdBQUcsRUFBQyxJQUFJO2dCQUNSLEtBQUssRUFBQyxNQUFNO2dCQUNaLE9BQU8sRUFBQyxvQkFBb0I7Z0JBQzVCLEtBQUssRUFBQyxLQUFLO2dCQUNYLElBQUksRUFBQyxDQUFDLE9BQU8sQ0FBQztnQkFDZCxJQUFJLEVBQUUsd0JBQXdCO2dCQUM5QixHQUFHLEVBQUM7b0JBQ0EsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNqQixLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixDQUFDO2FBQ0osQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEtBQVk7Z0JBQ2pCLEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN2QixDQUFDO1FBMUJNLCtCQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQTZDL0IsOEJBQUM7S0E5Q0QsQUE4Q0MsSUFBQTtJQUVELGNBQUcsQ0FBQyxPQUFPLENBQUMseUJBQXlCLEVBQUUsdUJBQXVCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL2FsYXJtRGV0YWlQb3B1cC9hbGFybURldGFpbFBvcHVwLmZhY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4vYWxhcm1EZXRhaWxQb3B1cC5odG1sXCIgbmFtZT1cImFsYXJtRGV0YWlsUG9wdXBIdG1sXCIgLz5cclxuaW1wb3J0IFwiY3NzIS4vYWxhcm1EZXRhaWxQb3B1cC5jc3NcIjtcclxuaW1wb3J0IFwiLi9hbGFybURldGFpbFBvcHVwLmNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCB7VmVoaWNsZUFsYXJtTG9nfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2ZXIvQWxhcm1Nb2R1bGVcIjtcclxuZGVjbGFyZSBjb25zdCBhbGFybURldGFpbFBvcHVwSHRtbDpzdHJpbmc7XHJcbmV4cG9ydCBpbnRlcmZhY2UgQW5ndWxhclNjb3Ble1xyXG4gICAgJG9uOiBGdW5jdGlvbjtcclxuICAgICRzY29wZTogRnVuY3Rpb247XHJcbiAgICAkZGVzdHJveTogRnVuY3Rpb247XHJcbiAgICAkZW1pdDogRnVuY3Rpb247XHJcbiAgICAkbmV3OiBGdW5jdGlvbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb21tb25BbGFybURldGFpbFBvcHVwUGFyYW1zIGV4dGVuZHMgQW5ndWxhclNjb3Ble1xyXG4gICAgcG9wdXBEYXRhczpWZWhpY2xlQWxhcm1Mb2c7XHJcblxyXG4gICAgLyoqVE9ETyDmoLnmja7pnIDopoHov73liqBcclxuICAgICAqICDlhbPpl63mk43kvZxcclxuICAgICAqIEB0aW1lOiAyMDE3LTExLTMwIDE2OjM1OjEwXHJcbiAgICAgKi9cclxuICAgIGJlZm9yZUNsb3NlPzoocGFybWFzOmFueSk9PmJvb2xlYW47XHJcbiAgICAvKipcclxuICAgICAqICDlhbPpl63mk43kvZxcclxuICAgICAqIEB0aW1lOiAyMDE3LTExLTMwIDE2OjM1OjEwXHJcbiAgICAgKi9cclxuICAgIGFmdGVyQ2xvc2U/OihwYXJtYXM6YW55KT0+Ym9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqICDlhbPpl63mk43kvZxcclxuICAgICAqIEB0aW1lOiAyMDE3LTExLTMwIDE2OjM1OjEwXHJcbiAgICAgKi9cclxuICAgIGNsb3NlUG9wdXA/OihwYXJtYXM6YW55KT0+dm9pZDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIElBbGFybURldGFpbFBvcHVwRmFjdG9yeXtcclxuICAgIHNob3dQb3B1cChwYXJlbnRTY29wZTphbnkscG9wdXBEYXRhczpWZWhpY2xlQWxhcm1Mb2cpOnZvaWQ7XHJcbn1cclxuXHJcbmNsYXNzIEFsYXJtRGV0YWlsUG9wdXBGYWN0b3J5IGltcGxlbWVudHMgSUFsYXJtRGV0YWlsUG9wdXBGYWN0b3J5e1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJ2xheWVyJ107XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxheWVyOmFueSApe31cclxuICAgIGxheWVySW5kZXg6bnVtYmVyO1xyXG4gICAgcGFyZW50UGFyYW1zOkNvbW1vbkFsYXJtRGV0YWlsUG9wdXBQYXJhbXM7XHJcblxyXG4gICAgc2hvd1BvcHVwKHBhcmVudFNjb3BlOkNvbW1vbkFsYXJtRGV0YWlsUG9wdXBQYXJhbXMscG9wdXBEYXRhczpWZWhpY2xlQWxhcm1Mb2cpe1xyXG4gICAgICAgIHRoaXMucGFyZW50UGFyYW1zID0gcGFyZW50U2NvcGU7XHJcbiAgICAgICAgbGV0IHNjb3BlOkNvbW1vbkFsYXJtRGV0YWlsUG9wdXBQYXJhbXMgPSBwYXJlbnRTY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUucG9wdXBEYXRhcyA9IHBvcHVwRGF0YXM7XHJcbiAgICAgICAgc2NvcGUuY2xvc2VQb3B1cCA9IHRoaXMuY2xvc2VQb3B1cDtcclxuICAgICAgICB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOjEsXHJcbiAgICAgICAgICAgIGJ0bjpudWxsLFxyXG4gICAgICAgICAgICB0aXRsZTpcIuaKpeitpuivpuaDhVwiLFxyXG4gICAgICAgICAgICBjb250ZW50OmFsYXJtRGV0YWlsUG9wdXBIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTpzY29wZSxcclxuICAgICAgICAgICAgYXJlYTpbXCI2NTBweFwiXSxcclxuICAgICAgICAgICAgc2tpbjogXCJtLWFsYXJtLWRldGFpbC12aXNpYmxlXCIsXHJcbiAgICAgICAgICAgIGVuZDooKT0+e1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIHNjb3BlID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oKGluZGV4Om51bWJlcik9PntcclxuICAgICAgICAgICAgdGhpcy5sYXllckluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGFyZW50U2NvcGUgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlUG9wdXAgPSAocGFybWFzOmFueSk9PntcclxuICAgICAgICBpZih0aGlzLnBhcmVudFBhcmFtcyAmJiB0aGlzLnBhcmVudFBhcmFtcy5iZWZvcmVDbG9zZSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pyq5a6e546w6LCD55So5byC5q2l5pON5L2cXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaJp+ihjCBiZWZvcmVDbG9zZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRQYXJhbXMuYmVmb3JlQ2xvc2UocGFybWFzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyp0b2RvIOWFs+mXreWJjeaTjeS9nCovXHJcbiAgICAgICAgdGhpcy5sYXllci5jbG9zZSh0aGlzLmxheWVySW5kZXgpO1xyXG4gICAgICAgIC8qdG9kbyDlhbPpl63lkI7mk43kvZwqL1xyXG4gICAgICAgIGlmKHRoaXMucGFyZW50UGFyYW1zICYmIHRoaXMucGFyZW50UGFyYW1zLmJlZm9yZUNsb3NlKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmnKrlrp7njrDosIPnlKjlvILmraXmk43kvZxcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5omn6KGMIGFmdGVyQ2xvc2VcIik7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50UGFyYW1zLmFmdGVyQ2xvc2UocGFybWFzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9O1xyXG5cclxufVxyXG5cclxuYXBwLnNlcnZpY2UoJ2FsYXJtRGV0YWlsUG9wdXBGYWN0b3J5JywgQWxhcm1EZXRhaWxQb3B1cEZhY3RvcnkpO1xyXG4iXX0=
