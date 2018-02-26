define(["require", "exports", "text!./util-select.html", "../../app/main.app", "css!./util-select.css"], function (require, exports, utilSelectHtml, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UtilSelectDirective = (function () {
        function UtilSelectDirective() {
            this.restrict = 'AE';
            this.replace = true;
            this.transclude = true;
            this.scope = {
                selectData: "=",
                selectRepeatByKey: "@",
                selectedVal: "=",
                selectClick: "&",
                selectListHeight: "@",
                selectIsTree: "@",
                selectListDiyIcon: "@",
                selectListIconFun: "&",
            };
            this.controllerAs = 'utilselectDir';
            this.template = utilSelectHtml;
            this.optionListIsShow = false;
            this.showDiyIcon = false;
            this.controller = function ($scope, $element, $attrs) {
                var _this = this;
                this.emptyVal = $attrs.selectedEmptyVal;
                this._initVal = {
                    S: "200px",
                    M: "300px",
                    L: "400px",
                    XL: "500px",
                    defaultVal: $scope.selectedVal,
                };
                this.isShowTree = ($scope.selectIsTree === "true");
                if (!!$scope.selectListHeight) {
                    this.selectListHeight = !!this._initVal[$scope.selectListHeight] ? this._initVal[$scope.selectListHeight] : this._initVal["S"];
                }
                else {
                    this.selectListHeight = this._initVal["S"];
                }
                this.initHasSelectedVal = !$scope.selectedVal;
                if ($scope.selectData instanceof Array) {
                    this.optionListData = $scope.selectData;
                }
                else {
                    console.error('selectData type error');
                }
                this.repeatByKey = null;
                (!!$scope.selectRepeatByKey) && (this.repeatByKey = $scope.selectRepeatByKey);
                ($scope.selectListDiyIcon === "true") && (this.showDiyIcon = true);
                this.diyIconFun = function (e, data) {
                    e.stopPropagation();
                    ($scope.selectListIconFun === "true") && ($scope.selectListIconFun({ selected: data }));
                };
                this.normalClick = function () {
                    _this.optionListIsShow = !_this.optionListIsShow;
                };
                this.mouseLeave = function () {
                    _this.optionListIsShow = false;
                };
                this.optionListClick = function (e, data) {
                    var returnVal;
                    if (!_this.isShowTree) {
                        if (data === null) {
                            _this.selectedVal = null;
                            returnVal = null;
                            _this.initHasSelectedVal = true;
                        }
                        else {
                            _this.selectedVal = data[_this.repeatByKey];
                            returnVal = data;
                            _this.initHasSelectedVal = false;
                        }
                        _this.optionListIsShow = !_this.optionListIsShow;
                    }
                    !!$scope.selectClick && $scope.selectClick({ selected: returnVal });
                };
            };
            this.link = function (scope, element, attrs, controller) {
                scope.$watch('selectedVal', function (val) {
                    !!scope.selectedVal ? controller.initHasSelectedVal = false : controller.initHasSelectedVal = true;
                });
                scope.$watch('selectData', function (val) {
                    controller.selectedVal = scope.selectedVal;
                    controller.optionListData = val;
                });
            };
        }
        ;
        UtilSelectDirective.instance = function () {
            return new UtilSelectDirective();
        };
        ;
        UtilSelectDirective.$inject = [];
        return UtilSelectDirective;
    }());
    main_app_1.app.directive('utilSelect', UtilSelectDirective.instance);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS91dGlsLXNlbGVjdC91dGlsLXNlbGVjdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBY0E7UUFHSTtZQU9BLGFBQVEsR0FBVyxJQUFJLENBQUM7WUFDeEIsWUFBTyxHQUFZLElBQUksQ0FBQztZQUN4QixlQUFVLEdBQVksSUFBSSxDQUFDO1lBQzNCLFVBQUssR0FBRztnQkFDSixVQUFVLEVBQUUsR0FBRztnQkFDZixpQkFBaUIsRUFBRSxHQUFHO2dCQUN0QixXQUFXLEVBQUUsR0FBRztnQkFDaEIsV0FBVyxFQUFFLEdBQUc7Z0JBQ2hCLGdCQUFnQixFQUFFLEdBQUc7Z0JBQ3JCLFlBQVksRUFBRSxHQUFHO2dCQUNqQixpQkFBaUIsRUFBRSxHQUFHO2dCQUN0QixpQkFBaUIsRUFBRSxHQUFHO2FBRXpCLENBQUM7WUFDRixpQkFBWSxHQUFHLGVBQWUsQ0FBQztZQUMvQixhQUFRLEdBQUcsY0FBYyxDQUFDO1lBTzFCLHFCQUFnQixHQUFZLEtBQUssQ0FBQztZQU9sQyxnQkFBVyxHQUFZLEtBQUssQ0FBQztZQUc3QixlQUFVLEdBQUcsVUFBVSxNQUFXLEVBQUUsUUFBYSxFQUFFLE1BQVc7Z0JBQWpELGlCQXFFWjtnQkFwRUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7Z0JBRXhDLElBQUksQ0FBQyxRQUFRLEdBQUc7b0JBQ1osQ0FBQyxFQUFFLE9BQU87b0JBQ1YsQ0FBQyxFQUFFLE9BQU87b0JBQ1YsQ0FBQyxFQUFFLE9BQU87b0JBQ1YsRUFBRSxFQUFFLE9BQU87b0JBQ1gsVUFBVSxFQUFFLE1BQU0sQ0FBQyxXQUFXO2lCQUVqQyxDQUFDO2dCQUVGLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxLQUFLLE1BQU0sQ0FBQyxDQUFDO2dCQUVuRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFnQixD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QUM7WUFDTixDQUFDLENBQUM7WUFFRixTQUFJLEdBQUcsVUFBVSxLQUFVLEVBQUUsT0FBWSxFQUFFLEtBQVUsRUFBRSxVQUErQjtnQkFFbEYsS0FBSyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsVUFBVSxHQUFRO29CQUMxQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztnQkFHdkcsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsVUFBVSxHQUFPO29CQUV4QyxVQUFVLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7b0JBQzNDLFVBQVUsQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDO2dCQUNwQyxDQUFDLENBQUMsQ0FBQTtZQUNOLENBQUMsQ0FBQztRQXpIRixDQUFDO1FBQUEsQ0FBQztRQUVLLDRCQUFRLEdBQWY7WUFDSSxNQUFNLENBQUMsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO1FBQ3JDLENBQUM7UUFBQSxDQUFDO1FBUEssMkJBQU8sR0FBa0IsRUFBRSxDQUFDO1FBNkh2QywwQkFBQztLQTlIRCxBQThIQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9kaXJlY3RpdmUvdXRpbC1zZWxlY3QvdXRpbC1zZWxlY3QuZGlyZWN0aXZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE3LzcvNC5cclxuICovXHJcblxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4vdXRpbC1zZWxlY3QuaHRtbFwiIG5hbWU9J3V0aWxTZWxlY3RIdG1sJyAvPlxyXG5cclxuXHJcbmltcG9ydCB7YXBwfSBmcm9tICcuLi8uLi9hcHAvbWFpbi5hcHAnO1xyXG5pbXBvcnQgXCJjc3MhLi91dGlsLXNlbGVjdC5jc3NcIjtcclxuXHJcblxyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcbmRlY2xhcmUgbGV0IHV0aWxTZWxlY3RIdG1sOiBhbnk7XHJcblxyXG5jbGFzcyBVdGlsU2VsZWN0RGlyZWN0aXZlIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0OiBBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBpbnN0YW5jZSgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFV0aWxTZWxlY3REaXJlY3RpdmUoKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVzdHJpY3Q6IHN0cmluZyA9ICdBRSc7XHJcbiAgICByZXBsYWNlOiBCb29sZWFuID0gdHJ1ZTtcclxuICAgIHRyYW5zY2x1ZGU6IEJvb2xlYW4gPSB0cnVlO1xyXG4gICAgc2NvcGUgPSB7XHJcbiAgICAgICAgc2VsZWN0RGF0YTogXCI9XCIsICAgICAgIC8v5Yid5aeL5LiL5ouJ5pWw5o2uIFtdXHJcbiAgICAgICAgc2VsZWN0UmVwZWF0QnlLZXk6IFwiQFwiLC8v5b6q546v6L6T5Ye65YC85a+55bqU55qEa2V5XHJcbiAgICAgICAgc2VsZWN0ZWRWYWw6IFwiPVwiLCAgICAgIC8v5Yid5aeL6YCJ5Lit55qE5YC8XHJcbiAgICAgICAgc2VsZWN0Q2xpY2s6IFwiJlwiLCAgICAgIC8v54K55Ye75LqL5Lu2ICBmdW5jdGlvbihzZWxlY3RlZCl7fSAg5b+F5Lyg5ZCM5ZCN5Y+C5pWw77ya5Y2zIOi/lOWbnuWAvOS4uumAieS4reWAvFxyXG4gICAgICAgIHNlbGVjdExpc3RIZWlnaHQ6IFwiQFwiLCAgLy/kuIvmi4nmrL7mnIDlpKfpq5jluqbpmZDliLYgUyAgTSAgTCAgWEwgWzIwMCAsMzAwICw0MDAgLDUwMF1cclxuICAgICAgICBzZWxlY3RJc1RyZWU6IFwiQFwiLCAgICAgICAgICAgLy/mmK/lkKbmmK/moJHlvaLnu5PmnoRcclxuICAgICAgICBzZWxlY3RMaXN0RGl5SWNvbjogXCJAXCIsICAgICAgLy/liJfooajmqKHlvI/oh6rlrprkuYnlm77moIdcclxuICAgICAgICBzZWxlY3RMaXN0SWNvbkZ1bjogXCImXCIsICAgICAgLy/liJfooajoh6rlrprkuYnlm77moIflm57osINcclxuXHJcbiAgICB9O1xyXG4gICAgY29udHJvbGxlckFzID0gJ3V0aWxzZWxlY3REaXInO1xyXG4gICAgdGVtcGxhdGUgPSB1dGlsU2VsZWN0SHRtbDtcclxuXHJcblxyXG4gICAgb3B0aW9uTGlzdERhdGE6IEFycmF5PGFueT47ICAgICAgICAvL+S4i+aLieWIl+ihqOaVsOaNrlxyXG4gICAgcmVwZWF0QnlLZXk6IGFueTsgICAgICAgICAgICAgICAgICAvL+W+queOr+i+k+WHuuWAvOWvueW6lOeahGtleVxyXG4gICAgX2luaXRWYWw6IGFueTsgICAgICAgICAgICAgICAgICAgICAvL+WIneWni+WAvFxyXG4gICAgc2VsZWN0TGlzdEhlaWdodDogc3RyaW5nOyAgICAgICAgICAvL+S4i+aLieWIl+ihqOacgOWkp+mrmOW6plxyXG4gICAgb3B0aW9uTGlzdElzU2hvdzogQm9vbGVhbiA9IGZhbHNlOyAvL+S4i+aLiemAiemhueWIl+ihqOWIneWni+makOiXj1xyXG4gICAgbm9ybWFsQ2xpY2s6IEZ1bmN0aW9uOyAgICAgICAgICAgICAvL+WNleWHu+aYvuekuuWMuuWfn+S6i+S7tlxyXG4gICAgb3B0aW9uTGlzdENsaWNrOiBGdW5jdGlvbjsgICAgICAgICAvL+mAieaLqeS6i+S7tlxyXG4gICAgc2VsZWN0ZWRWYWw6IGFueTsgICAgICAgICAgICAgICAgICAvL+W9k+WJjemAieS4reeahOWAvFxyXG4gICAgaW5pdEhhc1NlbGVjdGVkVmFsOiBCb29sZWFuOyAgICAgICAvL+WIneWni+aYr+WQpuaciemAieS4reWAvFxyXG4gICAgbW91c2VMZWF2ZTogRnVuY3Rpb247ICAgICAgICAgICAgICAvL+m8oOagh+emu+W8gOiMg+WbtOiHquWKqOmakOiXj1xyXG4gICAgaXNTaG93VHJlZTogQm9vbGVhbjsgICAgICAgICAgICAgICAvL+aYvuekuuagkeW9oue7k+aehFxyXG4gICAgc2hvd0RpeUljb246IEJvb2xlYW4gPSBmYWxzZTsgICAgICAvL+aYvuekuuiHquWumuS5ieWbvuagh1xyXG4gICAgZGl5SWNvbkZ1bjogRnVuY3Rpb247ICAgICAgICAgICAgICAvL+iHquWumuS5ieWbvuagh+Wbnuiwg1xyXG4gICAgZW1wdHlWYWw6IHN0cmluZztcclxuICAgIGNvbnRyb2xsZXIgPSBmdW5jdGlvbiAoJHNjb3BlOiBhbnksICRlbGVtZW50OiBhbnksICRhdHRyczogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbXB0eVZhbCA9ICRhdHRycy5zZWxlY3RlZEVtcHR5VmFsO1xyXG5cclxuICAgICAgICB0aGlzLl9pbml0VmFsID0ge1xyXG4gICAgICAgICAgICBTOiBcIjIwMHB4XCIsXHJcbiAgICAgICAgICAgIE06IFwiMzAwcHhcIixcclxuICAgICAgICAgICAgTDogXCI0MDBweFwiLFxyXG4gICAgICAgICAgICBYTDogXCI1MDBweFwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0VmFsOiAkc2NvcGUuc2VsZWN0ZWRWYWwsIC8v6buY6K6k5YC8IOivt+mAieaLqVxyXG4gICAgICAgICAgICAvL2RlZmF1bHRWYWwgOiBcIkZEU18wMF8wOF8wM1wiLCAvL+m7mOiupOWAvCDor7fpgInmi6lcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8v5Yid5aeL5Yik5pat5pWw5o2u57uT5p6EXHJcbiAgICAgICAgdGhpcy5pc1Nob3dUcmVlID0gKCRzY29wZS5zZWxlY3RJc1RyZWUgPT09IFwidHJ1ZVwiKTtcclxuICAgICAgICAvL+mZkOWItuacgOWkp+mrmOW6plxyXG4gICAgICAgIGlmICghISRzY29wZS5zZWxlY3RMaXN0SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TGlzdEhlaWdodCA9ICEhdGhpcy5faW5pdFZhbFskc2NvcGUuc2VsZWN0TGlzdEhlaWdodF0gPyB0aGlzLl9pbml0VmFsWyRzY29wZS5zZWxlY3RMaXN0SGVpZ2h0XSA6IHRoaXMuX2luaXRWYWxbXCJTXCJdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TGlzdEhlaWdodCA9IHRoaXMuX2luaXRWYWxbXCJTXCJdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluaXRIYXNTZWxlY3RlZFZhbCA9ICEkc2NvcGUuc2VsZWN0ZWRWYWw7XHJcbiAgICAgICAgLy/liJ3lp4vpgInkuK3nmoTlgLxcclxuXHJcbiAgICAgICAgLy/liJ3lp4vljJbliKTmlq3lj4LmlbDnsbvlnotcclxuICAgICAgICBpZiAoJHNjb3BlLnNlbGVjdERhdGEgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbkxpc3REYXRhID0gJHNjb3BlLnNlbGVjdERhdGFcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdzZWxlY3REYXRhIHR5cGUgZXJyb3InKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZXBlYXRCeUtleSA9IG51bGw7XHJcbiAgICAgICAgKCEhJHNjb3BlLnNlbGVjdFJlcGVhdEJ5S2V5KSAmJiAodGhpcy5yZXBlYXRCeUtleSA9ICRzY29wZS5zZWxlY3RSZXBlYXRCeUtleSk7XHJcblxyXG4gICAgICAgIC8v5YiX6KGo6Ieq5a6a5LmJ5Zu+5qCH5pi+56S6XHJcbiAgICAgICAgKCRzY29wZS5zZWxlY3RMaXN0RGl5SWNvbiA9PT0gXCJ0cnVlXCIpICYmICh0aGlzLnNob3dEaXlJY29uID0gdHJ1ZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ+aYvuekuuWbvuaghycsIHRoaXMuc2hvd0RpeUljb24pO1xyXG4gICAgICAgIC8v6Ieq5a6a5LmJ5Zu+5qCH5Zue6LCDXHJcbiAgICAgICAgdGhpcy5kaXlJY29uRnVuID0gKGU6IGFueSwgZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICgkc2NvcGUuc2VsZWN0TGlzdEljb25GdW4gPT09IFwidHJ1ZVwiKSAmJiAoJHNjb3BlLnNlbGVjdExpc3RJY29uRnVuKHtzZWxlY3RlZDogZGF0YX0pKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL+WNleWHu+aYvuekuuWMuuWfn+S6i+S7tlxyXG4gICAgICAgIHRoaXMubm9ybWFsQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uTGlzdElzU2hvdyA9ICF0aGlzLm9wdGlvbkxpc3RJc1Nob3c7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL+m8oOagh+emu+W8gOacieaViOWMuuWfn1xyXG4gICAgICAgIHRoaXMubW91c2VMZWF2ZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25MaXN0SXNTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/ljZXlh7vpgInkuK3kuovku7ZcclxuICAgICAgICB0aGlzLm9wdGlvbkxpc3RDbGljayA9IChlOiBhbnksIGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmV0dXJuVmFsO1xyXG4gICAgICAgICAgICAvL+WNlemAieebtOaOpeWFs+mXremAiemhuSDmoJHkuI3lhbPpl61cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzU2hvd1RyZWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFZhbCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZXR1cm5WYWwgPSBhbmd1bGFyLmVsZW1lbnQoJy51LXV0aWwtc2VsZWN0IGxpLmZpcnN0JykudGV4dCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdEhhc1NlbGVjdGVkVmFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFZhbCA9IGRhdGFbdGhpcy5yZXBlYXRCeUtleV07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRIYXNTZWxlY3RlZFZhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25MaXN0SXNTaG93ID0gIXRoaXMub3B0aW9uTGlzdElzU2hvdztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAhISRzY29wZS5zZWxlY3RDbGljayAmJiAkc2NvcGUuc2VsZWN0Q2xpY2soe3NlbGVjdGVkOiByZXR1cm5WYWx9KVxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIGxpbmsgPSBmdW5jdGlvbiAoc2NvcGU6IGFueSwgZWxlbWVudDogYW55LCBhdHRyczogYW55LCBjb250cm9sbGVyOiBVdGlsU2VsZWN0RGlyZWN0aXZlKSB7XHJcblxyXG4gICAgICAgIHNjb3BlLiR3YXRjaCgnc2VsZWN0ZWRWYWwnLCBmdW5jdGlvbiAodmFsOiBhbnkpIHtcclxuICAgICAgICAgICAgISFzY29wZS5zZWxlY3RlZFZhbCA/IGNvbnRyb2xsZXIuaW5pdEhhc1NlbGVjdGVkVmFsID0gZmFsc2UgOiBjb250cm9sbGVyLmluaXRIYXNTZWxlY3RlZFZhbCA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNvbnRyb2xsZXIuaW5pdEhhc1NlbGVjdGVkVmFsKVxyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICBzY29wZS4kd2F0Y2goJ3NlbGVjdERhdGEnLCBmdW5jdGlvbiAodmFsOmFueSkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzY29wZS5zZWxlY3RlZFZhbCk7XHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXIuc2VsZWN0ZWRWYWwgPSBzY29wZS5zZWxlY3RlZFZhbDtcclxuICAgICAgICAgICAgY29udHJvbGxlci5vcHRpb25MaXN0RGF0YSA9IHZhbDtcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxufVxyXG5cclxuYXBwLmRpcmVjdGl2ZSgndXRpbFNlbGVjdCcsIFV0aWxTZWxlY3REaXJlY3RpdmUuaW5zdGFuY2UpOyJdfQ==
