define(["require", "exports", "../app/main.app", "css!./msgCenter.popup.css"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MsgCenterPopupController = (function () {
        function MsgCenterPopupController($scope, layer) {
            var vm = this;
            vm.fileName = $scope.fileName;
            vm.closePopup = closePopup;
            function closePopup() {
                layer.closeAll($scope.currentIndex);
            }
        }
        MsgCenterPopupController.$inject = ['$scope', 'layer'];
        return MsgCenterPopupController;
    }());
    main_app_1.app.controller('msgCenterPopupController', MsgCenterPopupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL21zZ0NlbnRlclBvcHVwL21zZ0NlbnRlci5wb3B1cC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU9BO1FBUUksa0NBQWEsTUFBWSxFQUFDLEtBQVc7WUFDakMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQ2QsRUFBRSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQzlCLEVBQUUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBRTNCO2dCQUNJLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3hDLENBQUM7UUFDTCxDQUFDO1FBZk0sZ0NBQU8sR0FBRyxDQUFDLFFBQVEsRUFBQyxPQUFPLENBQUUsQ0FBQztRQWdCekMsK0JBQUM7S0FqQkQsQUFpQkMsSUFBQTtJQUNELGNBQUcsQ0FBQyxVQUFVLENBQUMsMEJBQTBCLEVBQUcsd0JBQXdCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL21zZ0NlbnRlclBvcHVwL21zZ0NlbnRlci5wb3B1cC5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgdGogb24gMjAxNy83LzI1LlxyXG4gKi9cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi9hcHAvbWFpbi5hcHBcIjtcclxuZGVjbGFyZSBsZXQgYW5ndWxhciA6IGFueTtcclxuaW1wb3J0ICdjc3MhLi9tc2dDZW50ZXIucG9wdXAuY3NzJztcclxuXHJcbmNsYXNzIE1zZ0NlbnRlclBvcHVwQ29udHJvbGxlcntcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCdsYXllcicgXTtcclxuXHJcbiAgICAvL+aWh+S7tuWQjVxyXG4gICAgZmlsZU5hbWU6c3RyaW5nO1xyXG4gICAgLy/lhbPpl63lvLnnqpdcclxuICAgIGNsb3NlUG9wdXA6RnVuY3Rpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IgKCRzY29wZSA6IGFueSxsYXllciA6IGFueSl7XHJcbiAgICAgICAgbGV0IHZtID0gdGhpcztcclxuICAgICAgICB2bS5maWxlTmFtZSA9ICRzY29wZS5maWxlTmFtZTtcclxuICAgICAgICB2bS5jbG9zZVBvcHVwID0gY2xvc2VQb3B1cDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2xvc2VQb3B1cCgpe1xyXG4gICAgICAgICAgICBsYXllci5jbG9zZUFsbCgkc2NvcGUuY3VycmVudEluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuYXBwLmNvbnRyb2xsZXIoJ21zZ0NlbnRlclBvcHVwQ29udHJvbGxlcicgLCBNc2dDZW50ZXJQb3B1cENvbnRyb2xsZXIpOyJdfQ==
