define(["require", "exports", "text!./fullImagePopup.html", "../app/main.app", "./fullImagePopup.controller"], function (require, exports, popupHtml, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CommonFullImagePopupFactory = (function () {
        function CommonFullImagePopupFactory(layer) {
            this.layer = layer;
        }
        CommonFullImagePopupFactory.prototype.showPopup = function (parentScope, imgUrl) {
            var scope = parentScope.$new();
            scope.imagePath = imgUrl;
            this.layer.open({
                type: 1,
                btn: null,
                title: null,
                content: popupHtml,
                scope: scope,
                area: ["800px", "600px"],
                end: function () {
                    scope.$destroy();
                    scope = null;
                }
            });
            parentScope = null;
        };
        CommonFullImagePopupFactory.$inject = ["layer"];
        return CommonFullImagePopupFactory;
    }());
    exports.CommonFullImagePopupFactory = CommonFullImagePopupFactory;
    main_app_1.app.service("commonFullImagePopup", CommonFullImagePopupFactory);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2Z1bGxJbWFnZVBvcHVwL2Z1bGxJbWFnZVBvcHVwLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBT0E7UUFFSSxxQ0FBb0IsS0FBVTtZQUFWLFVBQUssR0FBTCxLQUFLLENBQUs7UUFFOUIsQ0FBQztRQUVELCtDQUFTLEdBQVQsVUFBVSxXQUF5QixFQUFFLE1BQWM7WUFDL0MsSUFBSSxLQUFLLEdBQStCLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMzRCxLQUFLLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztZQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDWixJQUFJLEVBQUUsQ0FBQztnQkFDUCxHQUFHLEVBQUUsSUFBSTtnQkFDVCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxPQUFPLEVBQUUsU0FBUztnQkFDbEIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztnQkFDeEIsR0FBRyxFQUFFO29CQUNELEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDakIsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDakIsQ0FBQzthQUNKLENBQUMsQ0FBQztZQUNILFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDdkIsQ0FBQztRQXJCTSxtQ0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFzQi9CLGtDQUFDO0tBdkJELEFBdUJDLElBQUE7SUF2Qlksa0VBQTJCO0lBeUJ4QyxjQUFHLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLDJCQUEyQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9mdWxsSW1hZ2VQb3B1cC9mdWxsSW1hZ2VQb3B1cC5mYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL2Z1bGxJbWFnZVBvcHVwLmh0bWxcIiBuYW1lPVwicG9wdXBIdG1sXCIgLz5cclxuaW1wb3J0IFwiLi9mdWxsSW1hZ2VQb3B1cC5jb250cm9sbGVyXCI7XHJcbmltcG9ydCB7IGFwcCB9IGZyb20gJy4uL2FwcC9tYWluLmFwcCc7XHJcbmltcG9ydCB7IEFuZ3VsYXJTY29wZSB9IGZyb20gJy4uL3R5cGVzL2Jhc2VBbmd1bGFyU2NvcGUnO1xyXG5pbXBvcnQgeyBDb21tb25GdWxsSW1hZ2VQb3B1cFBhcmFtcyB9IGZyb20gJy4vZnVsbEltYWdlUG9wdXAuY29udHJvbGxlcic7XHJcbmRlY2xhcmUgbGV0IHBvcHVwSHRtbDpzdHJpbmc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tbW9uRnVsbEltYWdlUG9wdXBGYWN0b3J5e1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbXCJsYXllclwiXTtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbGF5ZXI6IGFueSl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNob3dQb3B1cChwYXJlbnRTY29wZTogQW5ndWxhclNjb3BlLCBpbWdVcmw6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IHNjb3BlOiBDb21tb25GdWxsSW1hZ2VQb3B1cFBhcmFtcyA9IHBhcmVudFNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS5pbWFnZVBhdGggPSBpbWdVcmw7XHJcbiAgICAgICAgdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgYnRuOiBudWxsLFxyXG4gICAgICAgICAgICB0aXRsZTogbnVsbCxcclxuICAgICAgICAgICAgY29udGVudDogcG9wdXBIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIGFyZWE6IFtcIjgwMHB4XCIsIFwiNjAwcHhcIl0sXHJcbiAgICAgICAgICAgIGVuZDogKCk9PntcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICBzY29wZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBwYXJlbnRTY29wZSA9IG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5zZXJ2aWNlKFwiY29tbW9uRnVsbEltYWdlUG9wdXBcIiwgQ29tbW9uRnVsbEltYWdlUG9wdXBGYWN0b3J5KTsiXX0=
