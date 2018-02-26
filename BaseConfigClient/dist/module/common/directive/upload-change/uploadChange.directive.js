define(["require", "exports", "../../app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UploadChangeDirective = (function () {
        function UploadChangeDirective() {
            this.scope = {
                ngUploadChange: "&"
            };
            this.link = function ($scope, $element, $attrs) {
                $element.on("change", function (event) {
                    $scope.ngUploadChange({ $event: event });
                    $element.val('');
                });
                $element.on("drop", function (event) {
                    console.log(event);
                });
                $scope.$on("$destroy", function () {
                    $element.off();
                });
            };
        }
        UploadChangeDirective.instance = function () {
            return new UploadChangeDirective();
        };
        return UploadChangeDirective;
    }());
    main_app_1.app.directive('ngUploadChange', UploadChangeDirective.instance);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS91cGxvYWQtY2hhbmdlL3VwbG9hZENoYW5nZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUE7UUFBQTtZQUtJLFVBQUssR0FBUTtnQkFDVCxjQUFjLEVBQUUsR0FBRzthQUN0QixDQUFDO1lBQ0YsU0FBSSxHQUFHLFVBQVUsTUFBVyxFQUFFLFFBQWEsRUFBRSxNQUFXO2dCQUVwRCxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLEtBQVU7b0JBQ3RDLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztvQkFDdkMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFFckIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxLQUFVO29CQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUN0QixDQUFDLENBQUMsQ0FBQztnQkFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtvQkFDbkIsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNuQixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQTtRQUNMLENBQUM7UUFyQlUsOEJBQVEsR0FBZjtZQUNJLE1BQU0sQ0FBQyxJQUFJLHFCQUFxQixFQUFFLENBQUE7UUFDdEMsQ0FBQztRQW1CTCw0QkFBQztJQUFELENBdEJBLEFBc0JDLElBQUE7SUFFRCxjQUFHLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFFLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vZGlyZWN0aXZlL3VwbG9hZC1jaGFuZ2UvdXBsb2FkQ2hhbmdlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vYXBwL21haW4uYXBwXCI7XHJcblxyXG5jbGFzcyBVcGxvYWRDaGFuZ2VEaXJlY3RpdmUge1xyXG4gICAgc3RhdGljIGluc3RhbmNlKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVXBsb2FkQ2hhbmdlRGlyZWN0aXZlKClcclxuICAgIH1cclxuXHJcbiAgICBzY29wZTogYW55ID0ge1xyXG4gICAgICAgIG5nVXBsb2FkQ2hhbmdlOiBcIiZcIlxyXG4gICAgfTtcclxuICAgIGxpbmsgPSBmdW5jdGlvbiAoJHNjb3BlOiBhbnksICRlbGVtZW50OiBhbnksICRhdHRyczogYW55KSB7XHJcblxyXG4gICAgICAgICRlbGVtZW50Lm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uIChldmVudDogYW55KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5uZ1VwbG9hZENoYW5nZSh7JGV2ZW50OiBldmVudH0pO1xyXG4gICAgICAgICAgICAkZWxlbWVudC52YWwoJycpO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICAkZWxlbWVudC5vbihcImRyb3BcIiwgZnVuY3Rpb24gKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXZlbnQpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJHNjb3BlLiRvbihcIiRkZXN0cm95XCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJGVsZW1lbnQub2ZmKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5kaXJlY3RpdmUoJ25nVXBsb2FkQ2hhbmdlJywgVXBsb2FkQ2hhbmdlRGlyZWN0aXZlLmluc3RhbmNlKTsiXX0=
