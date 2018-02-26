define(["require", "exports", "../../common/app/main.app", "angular"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BusinessLibPersonFactory = (function () {
        function BusinessLibPersonFactory() {
        }
        BusinessLibPersonFactory.prototype.clearFactoryCache = function () {
            this.currentFaceLib = null;
            this.isOpenModal = null;
        };
        ;
        BusinessLibPersonFactory.prototype.setCurrentFaceLib = function (currentFaceLib) {
            this.currentFaceLib = angular.copy(currentFaceLib);
        };
        ;
        BusinessLibPersonFactory.prototype.getCurrentFaceLib = function () {
            return this.currentFaceLib;
        };
        ;
        BusinessLibPersonFactory.prototype.updateIsOpenModal = function (isOpen) {
            this.isOpenModal = isOpen;
        };
        ;
        BusinessLibPersonFactory.prototype.getIsOpenModal = function () {
            return this.isOpenModal;
        };
        ;
        BusinessLibPersonFactory.$inject = [];
        return BusinessLibPersonFactory;
    }());
    main_app_1.app
        .service('businessLibPersonFactory', BusinessLibPersonFactory);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9mYWNlbGliL2J1c2luZXNzTGliUGVyc29uLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBbUJBO1FBTUk7UUFDQSxDQUFDO1FBRUQsb0RBQWlCLEdBQWpCO1lBQ0ksSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDNUIsQ0FBQztRQUFBLENBQUM7UUFFRixvREFBaUIsR0FBakIsVUFBbUIsY0FBNEI7WUFDM0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUFBQSxDQUFDO1FBRUYsb0RBQWlCLEdBQWpCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDL0IsQ0FBQztRQUFBLENBQUM7UUFFRixvREFBaUIsR0FBakIsVUFBa0IsTUFBYztZQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztRQUM5QixDQUFDO1FBQUEsQ0FBQztRQUVGLGlEQUFjLEdBQWQ7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDO1FBQUEsQ0FBQztRQTFCSyxnQ0FBTyxHQUFpQixFQUFFLENBQUM7UUEyQnRDLCtCQUFDO0tBN0JELEFBNkJDLElBQUE7SUFFRCxjQUFHO1NBQ0UsT0FBTyxDQUFDLDBCQUEwQixFQUFFLHdCQUF3QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2Jhc2Vjb25maWcvZmFjZWxpYi9idXNpbmVzc0xpYlBlcnNvbi5mYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcblxyXG5pbXBvcnQgJ2FuZ3VsYXInO1xyXG5pbXBvcnQge0J1c2luZXNzTGliRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9CdXNpbmVzc0xpYkV4XCI7XHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJ1c2luZXNzTGliUGVyc29uRmFjdG9yeSB7XHJcbiAgICBjbGVhckZhY3RvcnlDYWNoZTooKT0+dm9pZDtcclxuXHJcbiAgICBzZXRDdXJyZW50RmFjZUxpYjooY3VycmVudEZhY2VMaWI6QnVzaW5lc3NMaWJFeCk9PnZvaWQ7XHJcbiAgICBnZXRDdXJyZW50RmFjZUxpYjooKT0+QnVzaW5lc3NMaWJFeDtcclxuXHJcbiAgICB1cGRhdGVJc09wZW5Nb2RhbDooaXNPcGVuOmJvb2xlYW4pPT52b2lkO1xyXG4gICAgZ2V0SXNPcGVuTW9kYWw6KCk9PmJvb2xlYW47XHJcbn1cclxuLyoqIGNyZWF0ZSBieSB6eHFcclxuICogIOeUqOS6juWBmuS6uuWDj+W6kyDliY3lvoAg5Lq65ZGY5re75Yqg5Lit6Ze0IOWPmOmHj+e8k+WtmFxyXG4gKiBAdGltZTogMjAxNy0wNy0xNyAxNDo1MzoxOFxyXG4gKi9cclxuY2xhc3MgQnVzaW5lc3NMaWJQZXJzb25GYWN0b3J5IGltcGxlbWVudHMgSUJ1c2luZXNzTGliUGVyc29uRmFjdG9yeXtcclxuXHJcbiAgICBzdGF0aWMgJGluamVjdDpBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICAvKiDkurrohLjlupMg6aG16Z2iIOWJjeW+gCDkurrlkZjliJfooajnm7jlhbMg5Y+C5pWwKi9cclxuICAgIHByaXZhdGUgY3VycmVudEZhY2VMaWI6IEJ1c2luZXNzTGliRXg7XHJcbiAgICBwcml2YXRlIGlzT3Blbk1vZGFsOmJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhckZhY3RvcnlDYWNoZSgpe1xyXG4gICAgICAgIHRoaXMuY3VycmVudEZhY2VMaWIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaXNPcGVuTW9kYWwgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICBzZXRDdXJyZW50RmFjZUxpYiAoY3VycmVudEZhY2VMaWI6QnVzaW5lc3NMaWJFeCl7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50RmFjZUxpYiA9IGFuZ3VsYXIuY29weShjdXJyZW50RmFjZUxpYik7XHJcbiAgICB9O1xyXG5cclxuICAgIGdldEN1cnJlbnRGYWNlTGliICgpOkJ1c2luZXNzTGliRXh7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudEZhY2VMaWI7XHJcbiAgICB9O1xyXG5cclxuICAgIHVwZGF0ZUlzT3Blbk1vZGFsKGlzT3Blbjpib29sZWFuKTp2b2lke1xyXG4gICAgICAgIHRoaXMuaXNPcGVuTW9kYWwgPSBpc09wZW47XHJcbiAgICB9O1xyXG5cclxuICAgIGdldElzT3Blbk1vZGFsKCk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc09wZW5Nb2RhbDtcclxuICAgIH07XHJcbn1cclxuXHJcbmFwcFxyXG4gICAgLnNlcnZpY2UoJ2J1c2luZXNzTGliUGVyc29uRmFjdG9yeScsIEJ1c2luZXNzTGliUGVyc29uRmFjdG9yeSk7Il19
