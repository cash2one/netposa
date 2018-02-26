define(["require", "exports", "../app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FullScreenPopupController = (function () {
        function FullScreenPopupController($scope, $timeout) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            console.log($scope.imagePath);
            this.$timeout(function () {
                _this.imagePath = $scope.imagePath;
            });
        }
        FullScreenPopupController.$inject = ["$scope", "$timeout"];
        return FullScreenPopupController;
    }());
    main_app_1.app.controller("commonFullScreenPopup", FullScreenPopupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2Z1bGxJbWFnZVBvcHVwL2Z1bGxJbWFnZVBvcHVwLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBS0E7UUFLSSxtQ0FDWSxNQUFrQyxFQUNsQyxRQUFrQjtZQUY5QixpQkFTQztZQVJXLFdBQU0sR0FBTixNQUFNLENBQTRCO1lBQ2xDLGFBQVEsR0FBUixRQUFRLENBQVU7WUFFMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDVixLQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDdEMsQ0FBQyxDQUFDLENBQUM7UUFFUCxDQUFDO1FBYk0saUNBQU8sR0FBRyxDQUFDLFFBQVEsRUFBQyxVQUFVLENBQUMsQ0FBQztRQWMzQyxnQ0FBQztLQWZELEFBZUMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLEVBQUUseUJBQXlCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL2Z1bGxJbWFnZVBvcHVwL2Z1bGxJbWFnZVBvcHVwLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhcHAgfSBmcm9tIFwiLi4vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCB7IEFuZ3VsYXJTY29wZSB9IGZyb20gJy4uL3R5cGVzL2Jhc2VBbmd1bGFyU2NvcGUnO1xyXG5leHBvcnQgaW50ZXJmYWNlIENvbW1vbkZ1bGxJbWFnZVBvcHVwUGFyYW1zIGV4dGVuZHMgQW5ndWxhclNjb3Ble1xyXG4gICAgaW1hZ2VQYXRoOiBzdHJpbmc7XHJcbn1cclxuY2xhc3MgRnVsbFNjcmVlblBvcHVwQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFtcIiRzY29wZVwiLFwiJHRpbWVvdXRcIl07XHJcbiAgICAvLyDnlKjkuo7lsZXnpLrnmoR1cmzlm77niYdcclxuICAgIGltYWdlUGF0aDogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgJHNjb3BlOiBDb21tb25GdWxsSW1hZ2VQb3B1cFBhcmFtcyxcclxuICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBGdW5jdGlvblxyXG4gICAgKXtcclxuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuaW1hZ2VQYXRoKTtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VQYXRoID0gJHNjb3BlLmltYWdlUGF0aDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoXCJjb21tb25GdWxsU2NyZWVuUG9wdXBcIiwgRnVsbFNjcmVlblBvcHVwQ29udHJvbGxlcik7Il19
