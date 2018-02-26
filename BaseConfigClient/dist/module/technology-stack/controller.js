define(["require", "exports", "../common/app/main.app", "css!./technology-stack.css", "./../common/factory/layerMsg.factory"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TechnologyStackController = (function () {
        function TechnologyStackController($scope, $http, $interval, layerDec, $timeout) {
            this.$scope = $scope;
            this.$http = $http;
            this.$interval = $interval;
            this.layerDec = layerDec;
            this.$timeout = $timeout;
            this.switchTrue = true;
            this.switchFlase = false;
        }
        TechnologyStackController.prototype.changeStatus = function (status) {
            var _this = this;
            this.$timeout(function () {
                if (status) {
                    _this.layerDec.successInfo('当前状态：Is Checked');
                }
                else {
                    _this.layerDec.failInfo('当前状态：Not Checked');
                }
            }, 1000);
        };
        TechnologyStackController.$inject = ['$scope', '$http', '$interval', 'layerDec', '$timeout'];
        return TechnologyStackController;
    }());
    main_app_1.app.controller("technologyStackController", TechnologyStackController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdGVjaG5vbG9neS1zdGFjay9jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVFBO1FBS0ksbUNBQW9CLE1BQVcsRUFBVSxLQUFVLEVBQVUsU0FBYyxFQUFVLFFBQW1CLEVBQVUsUUFBYTtZQUEzRyxXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQVUsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUFVLGNBQVMsR0FBVCxTQUFTLENBQUs7WUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1lBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUgvSCxlQUFVLEdBQVksSUFBSSxDQUFDO1lBQzNCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBSTdCLENBQUM7UUFFRCxnREFBWSxHQUFaLFVBQWEsTUFBZTtZQUE1QixpQkFRQztZQVBHLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ1YsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDVCxLQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO2dCQUNoRCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUE7Z0JBQzlDLENBQUM7WUFDTCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDWixDQUFDO1FBaEJNLGlDQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFpQjlFLGdDQUFDO0tBbEJELEFBa0JDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLDJCQUEyQixFQUFFLHlCQUF5QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL3RlY2hub2xvZ3ktc3RhY2svY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBhcHAgfSBmcm9tIFwiLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgXCJjc3MhLi90ZWNobm9sb2d5LXN0YWNrLmNzc1wiO1xyXG5pbXBvcnQgeyBJTGF5ZXJEZWMgfSBmcm9tICcuLy4uL2NvbW1vbi9mYWN0b3J5L2xheWVyTXNnLmZhY3RvcnknO1xyXG5pbXBvcnQgJy4vLi4vY29tbW9uL2ZhY3RvcnkvbGF5ZXJNc2cuZmFjdG9yeSc7XHJcblxyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcbmRlY2xhcmUgbGV0IGplRGF0ZTogYW55O1xyXG5jbGFzcyBUZWNobm9sb2d5U3RhY2tDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnJGh0dHAnLCAnJGludGVydmFsJywgJ2xheWVyRGVjJywgJyR0aW1lb3V0J107XHJcbiAgICBzd2l0Y2hUcnVlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHN3aXRjaEZsYXNlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBjYWNoZUZ1bmM6IEZ1bmN0aW9uO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSwgcHJpdmF0ZSAkaHR0cDogYW55LCBwcml2YXRlICRpbnRlcnZhbDogYW55LCBwcml2YXRlIGxheWVyRGVjOiBJTGF5ZXJEZWMsIHByaXZhdGUgJHRpbWVvdXQ6IGFueSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VTdGF0dXMoc3RhdHVzOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5ZXJEZWMuc3VjY2Vzc0luZm8oJ+W9k+WJjeeKtuaAge+8mklzIENoZWNrZWQnKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXllckRlYy5mYWlsSW5mbygn5b2T5YmN54q25oCB77yaTm90IENoZWNrZWQnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAwMClcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoXCJ0ZWNobm9sb2d5U3RhY2tDb250cm9sbGVyXCIsIFRlY2hub2xvZ3lTdGFja0NvbnRyb2xsZXIpOyJdfQ==
