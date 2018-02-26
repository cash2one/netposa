define(["require", "exports", "../../common/app/main.app", "./causeSearch/causeSearch.controller", "./areaSearch/areaSearch.controller", "./trendSearch/trendSearch.controller"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TotalSearchController = (function () {
        function TotalSearchController($scope) {
            console.log("进入search界面");
            var vm = this;
            vm.causeSearchHtmlUrl = "/module/total/search/causeSearch/causeSearch.html?v=" + new Date().getTime();
            vm.areaSearchHtmlUrl = "/module/total/search/areaSearch/areaSearch.html?v=" + new Date().getTime();
            vm.trendSearchHtmlUrl = "/module/total/search/trendSearch/trendSearch.html?v=" + new Date().getTime();
        }
        TotalSearchController.$inject = ["$scope", "totalService", "echartService"];
        return TotalSearchController;
    }());
    main_app_1.app.controller('totalSearchController', TotalSearchController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdG90YWwvc2VhcmNoL3RvdGFsLnNlYXJjaC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVVBO1FBT0ksK0JBQVksTUFBVztZQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzFCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztZQUVkLEVBQUUsQ0FBQyxrQkFBa0IsR0FBRyxzREFBc0QsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3RHLEVBQUUsQ0FBQyxpQkFBaUIsR0FBRyxvREFBb0QsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ25HLEVBQUUsQ0FBQyxrQkFBa0IsR0FBRyxzREFBc0QsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFHLENBQUM7UUFiTSw2QkFBTyxHQUFHLENBQUMsUUFBUSxFQUFDLGNBQWMsRUFBQyxlQUFlLENBQUMsQ0FBQztRQWMvRCw0QkFBQztLQWZELEFBZUMsSUFBQTtJQUdELGNBQUcsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLEVBQUUscUJBQXFCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvdG90YWwvc2VhcmNoL3RvdGFsLnNlYXJjaC5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE3LzQvMjEuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcblxyXG5pbXBvcnQgXCIuL2NhdXNlU2VhcmNoL2NhdXNlU2VhcmNoLmNvbnRyb2xsZXJcIlxyXG5pbXBvcnQgXCIuL2FyZWFTZWFyY2gvYXJlYVNlYXJjaC5jb250cm9sbGVyXCJcclxuaW1wb3J0IFwiLi90cmVuZFNlYXJjaC90cmVuZFNlYXJjaC5jb250cm9sbGVyXCJcclxuXHJcbmNsYXNzIFRvdGFsU2VhcmNoQ29udHJvbGxlcntcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wiJHNjb3BlXCIsXCJ0b3RhbFNlcnZpY2VcIixcImVjaGFydFNlcnZpY2VcIl07XHJcblxyXG4gICAgY2F1c2VTZWFyY2hIdG1sVXJsOnN0cmluZztcclxuICAgIGFyZWFTZWFyY2hIdG1sVXJsOnN0cmluZztcclxuICAgIHRyZW5kU2VhcmNoSHRtbFVybDpzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlOiBhbnkpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6L+b5YWlc2VhcmNo55WM6Z2iXCIpO1xyXG4gICAgICAgIGxldCB2bSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZtLmNhdXNlU2VhcmNoSHRtbFVybCA9IFwiL21vZHVsZS90b3RhbC9zZWFyY2gvY2F1c2VTZWFyY2gvY2F1c2VTZWFyY2guaHRtbD92PVwiICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgdm0uYXJlYVNlYXJjaEh0bWxVcmwgPSBcIi9tb2R1bGUvdG90YWwvc2VhcmNoL2FyZWFTZWFyY2gvYXJlYVNlYXJjaC5odG1sP3Y9XCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICB2bS50cmVuZFNlYXJjaEh0bWxVcmwgPSBcIi9tb2R1bGUvdG90YWwvc2VhcmNoL3RyZW5kU2VhcmNoL3RyZW5kU2VhcmNoLmh0bWw/dj1cIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ3RvdGFsU2VhcmNoQ29udHJvbGxlcicsIFRvdGFsU2VhcmNoQ29udHJvbGxlcik7XHJcbiJdfQ==
