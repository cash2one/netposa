define(["require", "exports", "../../common/app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SeeLogFactory = (function () {
        function SeeLogFactory() {
        }
        SeeLogFactory.prototype.getUserName = function (data) {
            this.userName = data;
        };
        SeeLogFactory.prototype.sendUserName = function () {
            return this.userName;
        };
        return SeeLogFactory;
    }());
    main_app_1.app
        .service('seeLogFactory', SeeLogFactory);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFpbnRhaW4vZmFjdG9yeS9zZWVMb2cuZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFZQTtRQUFBO1FBV0EsQ0FBQztRQVBHLG1DQUFXLEdBQVgsVUFBWSxJQUFXO1lBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLENBQUM7UUFFRCxvQ0FBWSxHQUFaO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQztRQUNMLG9CQUFDO0lBQUQsQ0FYQSxBQVdDLElBQUE7SUFFRCxjQUFHO1NBQ0UsT0FBTyxDQUFDLGVBQWUsRUFBRSxhQUFhLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvbWFpbnRhaW4vZmFjdG9yeS9zZWVMb2cuZmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHRqIG9uIDIwMTcvNi8yOS5cclxuICovXHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU2VlTG9nRmFjdG9yeXtcclxuICAgIC8v6I635Y+WXHJcbiAgICBnZXRVc2VyTmFtZTpGdW5jdGlvbjtcclxuICAgIC8v5Lyg6YCSXHJcbiAgICBzZW5kVXNlck5hbWU6RnVuY3Rpb247XHJcbn1cclxuXHJcbmNsYXNzIFNlZUxvZ0ZhY3RvcnkgaW1wbGVtZW50cyBJU2VlTG9nRmFjdG9yeXtcclxuXHJcbiAgICB1c2VyTmFtZTpzdHJpbmc7XHJcblxyXG4gICAgZ2V0VXNlck5hbWUoZGF0YTpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMudXNlck5hbWUgPSBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbmRVc2VyTmFtZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJOYW1lO1xyXG4gICAgfVxyXG59XHJcblxyXG5hcHBcclxuICAgIC5zZXJ2aWNlKCdzZWVMb2dGYWN0b3J5JywgU2VlTG9nRmFjdG9yeSk7XHJcbiJdfQ==
