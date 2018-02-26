define(["require", "exports", "../../common/app/main.app", "../../../core/server/enum/SocketResultTypeEnum", "css!./socket.css", "../../common/factory/socket.factory"], function (require, exports, main_app_1, SocketResultTypeEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SocketController = (function () {
        function SocketController($scope, socketFactory) {
            this.$scope = $scope;
            this.socketFactory = socketFactory;
            var vm = this;
            $scope.$on("$destroy", function () {
            });
        }
        SocketController.prototype.subscribeDC = function () {
            this.socketFactory.subscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.DeployControl, function (data) {
                console.log("收到的动态布控推送为", data);
            });
        };
        SocketController.prototype.unSubscribeDC = function () {
            this.socketFactory.unSubscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.DeployControl);
        };
        SocketController.prototype.subscribeRetrieval = function () {
            this.socketFactory.subscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.Retrieval, function (data) {
                console.log("收到的智能检索推送为", data);
            });
        };
        SocketController.prototype.unSubscribeRetrieval = function () {
            this.socketFactory.unSubscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.Retrieval);
        };
        SocketController.prototype.subscribeTrack = function () {
            this.socketFactory.subscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.Track, function (data) {
                console.log("收到的轨迹分析推送为", data);
            });
        };
        SocketController.prototype.unSubscribeTrack = function () {
            this.socketFactory.unSubscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.Track);
        };
        SocketController.prototype.subscribeFaceRetrieval = function () {
            this.socketFactory.subscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.FaceRetrieval, function (data) {
                console.log("收到的人脸检索消息分析推送为", data);
            });
        };
        SocketController.prototype.unSubscribeFaceRetrieval = function () {
            this.socketFactory.unSubscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.FaceRetrieval);
        };
        SocketController.$inject = ["$scope", "socketFactory"];
        return SocketController;
    }());
    exports.SocketController = SocketController;
    main_app_1.app.controller("technologyStackSocketController", SocketController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdGVjaG5vbG9neS1zdGFjay9zb2NrZXQvc29ja2V0LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBTUE7UUFJSSwwQkFBb0IsTUFBVyxFQUFVLGFBQTZCO1lBQWxELFdBQU0sR0FBTixNQUFNLENBQUs7WUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7WUFDbEUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBRWQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7WUFFdkIsQ0FBQyxDQUFDLENBQUM7UUFHUCxDQUFDO1FBRUQsc0NBQVcsR0FBWDtZQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJDQUFvQixDQUFDLGFBQWEsRUFBRSxVQUFDLElBQVM7Z0JBQ3ZFLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELHdDQUFhLEdBQWI7WUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQywyQ0FBb0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2RSxDQUFDO1FBRUQsNkNBQWtCLEdBQWxCO1lBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkNBQW9CLENBQUMsU0FBUyxFQUFFLFVBQUMsSUFBUztnQkFDbkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBRUQsK0NBQW9CLEdBQXBCO1lBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsMkNBQW9CLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkUsQ0FBQztRQUVELHlDQUFjLEdBQWQ7WUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQ0FBb0IsQ0FBQyxLQUFLLEVBQUUsVUFBQyxJQUFTO2dCQUMvRCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFFRCwyQ0FBZ0IsR0FBaEI7WUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQywyQ0FBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBQ0QsaURBQXNCLEdBQXRCO1lBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkNBQW9CLENBQUMsYUFBYSxFQUFFLFVBQUMsSUFBUztnQkFDdkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN4QyxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFFRCxtREFBd0IsR0FBeEI7WUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQywyQ0FBb0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2RSxDQUFDO1FBbERNLHdCQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUMsZUFBZSxDQUFDLENBQUM7UUFtRGhELHVCQUFDO0tBcERELEFBb0RDLElBQUE7SUFwRFksNENBQWdCO0lBc0Q3QixjQUFHLENBQUMsVUFBVSxDQUFDLGlDQUFpQyxFQUFFLGdCQUFnQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL3RlY2hub2xvZ3ktc3RhY2svc29ja2V0L3NvY2tldC5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCBcImNzcyEuL3NvY2tldC5jc3NcIjtcclxuaW1wb3J0IHtJU29ja2V0RmFjdG9yeX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L3NvY2tldC5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L3NvY2tldC5mYWN0b3J5XCI7XHJcbmltcG9ydCB7U29ja2V0UmVzdWx0VHlwZUVudW19IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL1NvY2tldFJlc3VsdFR5cGVFbnVtXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU29ja2V0Q29udHJvbGxlcntcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wiJHNjb3BlXCIsXCJzb2NrZXRGYWN0b3J5XCJdO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LCBwcml2YXRlIHNvY2tldEZhY3Rvcnk6IElTb2NrZXRGYWN0b3J5KXtcclxuICAgICAgICBsZXQgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICAkc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgKCk9PntcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIOW8lei/m29jeOaOp+S7tlxyXG4gICAgfVxyXG5cclxuICAgIHN1YnNjcmliZURDKCl7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRGYWN0b3J5LnN1YnNjcmliZShTb2NrZXRSZXN1bHRUeXBlRW51bS5EZXBsb3lDb250cm9sLCAoZGF0YTogYW55KT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaUtuWIsOeahOWKqOaAgeW4g+aOp+aOqOmAgeS4ulwiLCBkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB1blN1YnNjcmliZURDKCl7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRGYWN0b3J5LnVuU3Vic2NyaWJlKFNvY2tldFJlc3VsdFR5cGVFbnVtLkRlcGxveUNvbnRyb2wpO1xyXG4gICAgfVxyXG5cclxuICAgIHN1YnNjcmliZVJldHJpZXZhbCgpe1xyXG4gICAgICAgIHRoaXMuc29ja2V0RmFjdG9yeS5zdWJzY3JpYmUoU29ja2V0UmVzdWx0VHlwZUVudW0uUmV0cmlldmFsLCAoZGF0YTogYW55KT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaUtuWIsOeahOaZuuiDveajgOe0ouaOqOmAgeS4ulwiLCBkYXRhKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHVuU3Vic2NyaWJlUmV0cmlldmFsKCl7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRGYWN0b3J5LnVuU3Vic2NyaWJlKFNvY2tldFJlc3VsdFR5cGVFbnVtLlJldHJpZXZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3Vic2NyaWJlVHJhY2soKXtcclxuICAgICAgICB0aGlzLnNvY2tldEZhY3Rvcnkuc3Vic2NyaWJlKFNvY2tldFJlc3VsdFR5cGVFbnVtLlRyYWNrLCAoZGF0YTogYW55KT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaUtuWIsOeahOi9qOi/ueWIhuaekOaOqOmAgeS4ulwiLCBkYXRhKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHVuU3Vic2NyaWJlVHJhY2soKXtcclxuICAgICAgICB0aGlzLnNvY2tldEZhY3RvcnkudW5TdWJzY3JpYmUoU29ja2V0UmVzdWx0VHlwZUVudW0uVHJhY2spO1xyXG4gICAgfVxyXG4gICAgc3Vic2NyaWJlRmFjZVJldHJpZXZhbCgpe1xyXG4gICAgICAgIHRoaXMuc29ja2V0RmFjdG9yeS5zdWJzY3JpYmUoU29ja2V0UmVzdWx0VHlwZUVudW0uRmFjZVJldHJpZXZhbCwgKGRhdGE6IGFueSk9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmlLbliLDnmoTkurrohLjmo4DntKLmtojmga/liIbmnpDmjqjpgIHkuLpcIiwgZGF0YSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB1blN1YnNjcmliZUZhY2VSZXRyaWV2YWwoKXtcclxuICAgICAgICB0aGlzLnNvY2tldEZhY3RvcnkudW5TdWJzY3JpYmUoU29ja2V0UmVzdWx0VHlwZUVudW0uRmFjZVJldHJpZXZhbCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKFwidGVjaG5vbG9neVN0YWNrU29ja2V0Q29udHJvbGxlclwiLCBTb2NrZXRDb250cm9sbGVyKTsiXX0=
