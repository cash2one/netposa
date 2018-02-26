define(["require", "exports", "../../common/app/main.app", "css!./track.popup.css"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TrackPopupController = (function () {
        function TrackPopupController($scope) {
            this.$scope = $scope;
            this.traceData = $scope.traceData;
            console.log($scope.traceData);
        }
        TrackPopupController.$inject = ['$scope'];
        return TrackPopupController;
    }());
    main_app_1.app.controller('TrackPopupController', TrackPopupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9UcmFja1BvcHVwL3RyYWNrLnBvcHVwLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBR0E7UUFHSSw4QkFBb0IsTUFBVTtZQUFWLFdBQU0sR0FBTixNQUFNLENBQUk7WUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ2pDLENBQUM7UUFMTSw0QkFBTyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFNaEMsMkJBQUM7S0FQRCxBQU9DLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLHNCQUFzQixFQUFDLG9CQUFvQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL0ludGVsbGlnZW50QW5hbHlzaXMvVHJhY2tQb3B1cC90cmFjay5wb3B1cC5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdjc3MhLi90cmFjay5wb3B1cC5jc3MnO1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHtSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9GYWNlVHJhY2tFbnVtXCI7XHJcbmNsYXNzIFRyYWNrUG9wdXBDb250cm9sbGVye1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZSddO1xyXG4gICAgdHJhY2VEYXRhOlJlc3VsdDtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOmFueSl7XHJcbiAgICAgICAgdGhpcy50cmFjZURhdGEgPSAkc2NvcGUudHJhY2VEYXRhO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS50cmFjZURhdGEpXHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdUcmFja1BvcHVwQ29udHJvbGxlcicsVHJhY2tQb3B1cENvbnRyb2xsZXIpOyJdfQ==
