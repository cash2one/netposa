define(["require", "exports", "../../common/app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fullScreenPopupController = (function () {
        function fullScreenPopupController($scope, $timeout, mylayer) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.mylayer = mylayer;
            this.imagePath = $scope.path;
        }
        fullScreenPopupController.$inject = ["$scope"];
        return fullScreenPopupController;
    }());
    main_app_1.app.controller("fullScreenPopupController", fullScreenPopupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvZGV0YWlsUG9wdXAvZnVsbFNjcmVlblBvcHVwL2Z1bGxTY3JlZW5Qb3B1cC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBO1FBTUksbUNBQW9CLE1BQVcsRUFDWCxRQUFhLEVBQ2IsT0FBWTtZQUZaLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCxhQUFRLEdBQVIsUUFBUSxDQUFLO1lBQ2IsWUFBTyxHQUFQLE9BQU8sQ0FBSztZQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDakMsQ0FBQztRQVRNLGlDQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQVVoQyxnQ0FBQztLQVhELEFBV0MsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsMkJBQTJCLEVBQUUseUJBQXlCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvZGV0YWlsUG9wdXAvZnVsbFNjcmVlblBvcHVwL2Z1bGxTY3JlZW5Qb3B1cC5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcblxyXG5jbGFzcyBmdWxsU2NyZWVuUG9wdXBDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wiJHNjb3BlXCJdO1xyXG5cclxuICAgIGltYWdlUGF0aDogc3RyaW5nO1xyXG4gICAgaW1hZ2VTdHlsZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIG15bGF5ZXI6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaW1hZ2VQYXRoID0gJHNjb3BlLnBhdGg7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKFwiZnVsbFNjcmVlblBvcHVwQ29udHJvbGxlclwiLCBmdWxsU2NyZWVuUG9wdXBDb250cm9sbGVyKTsiXX0=
