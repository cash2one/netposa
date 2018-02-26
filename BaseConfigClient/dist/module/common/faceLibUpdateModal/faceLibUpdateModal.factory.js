define(["require", "exports", "text!./faceLibUpdateModal.html", "../app/main.app", "css!./faceLibUpdateModal.css", "./faceLibUpdateModal.controller"], function (require, exports, faceLibUpdateModalHtml, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FaceUpdateParams = (function () {
        function FaceUpdateParams() {
        }
        return FaceUpdateParams;
    }());
    exports.FaceUpdateParams = FaceUpdateParams;
    var FaceLibUpdateModalFactory = (function () {
        function FaceLibUpdateModalFactory() {
            var _this = this;
            this.modalHtml = faceLibUpdateModalHtml;
            this.getModalClosedWatchName = function () {
                return _this.modalClosedWatchName;
            };
            this.setModalClosedWatchName = function (name) {
                _this.modalClosedWatchName = name;
            };
            this.getModalHtml = function () {
                return _this.modalHtml;
            };
            this.setUpdateParams = function (params) {
                _this.initUpdateDatas();
                if (params) {
                    (params.isUpdate) && (_this.isUpdate = params.isUpdate);
                    (!!params.modalClosedWatchName) && (_this.modalClosedWatchName = params.modalClosedWatchName);
                    (!!params.parentID) && (_this.parentID = params.parentID);
                    (!!params.parentName) && (_this.parentName = params.parentName);
                    (!!params.updateModalData) && (_this.updateModalData = params.updateModalData);
                }
            };
            this.initUpdateDatas();
        }
        ;
        FaceLibUpdateModalFactory.prototype.initUpdateDatas = function () {
            this.modalClosedWatchName = "$emit.FaceLibUpdateClose";
            this.isUpdate = false;
            this.updateModalData = null;
        };
        ;
        FaceLibUpdateModalFactory.prototype.getUpdateParams = function () {
            var params = new FaceUpdateParams();
            params.modalClosedWatchName = this.modalClosedWatchName;
            params.isUpdate = this.isUpdate;
            params.updateModalData = this.updateModalData;
            params.parentID = this.parentID;
            params.parentName = this.parentName;
            return params;
        };
        ;
        return FaceLibUpdateModalFactory;
    }());
    main_app_1.app.service('faceLibUpdateModalFactory', FaceLibUpdateModalFactory);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2ZhY2VMaWJVcGRhdGVNb2RhbC9mYWNlTGliVXBkYXRlTW9kYWwuZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFVQTtRQUFBO1FBTUEsQ0FBQztRQUFELHVCQUFDO0lBQUQsQ0FOQSxBQU1DLElBQUE7SUFOWSw0Q0FBZ0I7SUFxQjdCO1FBUUk7WUFBQSxpQkFFQztZQVRPLGNBQVMsR0FBVSxzQkFBc0IsQ0FBQztZQVVsRCw0QkFBdUIsR0FBRztnQkFDdEIsTUFBTSxDQUFDLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQztZQUNyQyxDQUFDLENBQUM7WUFDRiw0QkFBdUIsR0FBRyxVQUFDLElBQVk7Z0JBQ25DLEtBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7WUFDckMsQ0FBQyxDQUFDO1lBRUYsaUJBQVksR0FBRztnQkFDWCxNQUFNLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQztZQUMxQixDQUFDLENBQUM7WUFFRixvQkFBZSxHQUFHLFVBQUMsTUFBdUI7Z0JBQ3RDLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDdkIsRUFBRSxDQUFBLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztvQkFDUCxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBRyxDQUFDLEtBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUN0RCxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxvQkFBb0IsR0FBRyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQztvQkFDN0YsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3pELENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUMvRCxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDbEYsQ0FBQztZQUNMLENBQUMsQ0FBQztZQXRCRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQztRQUFBLENBQUM7UUF1QkYsbURBQWUsR0FBZjtZQUNJLElBQUksQ0FBQyxvQkFBb0IsR0FBRywwQkFBMEIsQ0FBQztZQUN2RCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNoQyxDQUFDO1FBQUEsQ0FBQztRQUVGLG1EQUFlLEdBQWY7WUFDSSxJQUFJLE1BQU0sR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7WUFDcEMsTUFBTSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztZQUN4RCxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDaEMsTUFBTSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQzlDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNoQyxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDcEMsTUFBTSxDQUFFLE1BQU0sQ0FBQztRQUNuQixDQUFDO1FBQUEsQ0FBQztRQUVOLGdDQUFDO0lBQUQsQ0FqREEsQUFpREMsSUFBQTtJQUNELGNBQUcsQ0FBQyxPQUFPLENBQUMsMkJBQTJCLEVBQUUseUJBQXlCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL2ZhY2VMaWJVcGRhdGVNb2RhbC9mYWNlTGliVXBkYXRlTW9kYWwuZmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4vZmFjZUxpYlVwZGF0ZU1vZGFsLmh0bWxcIiBuYW1lPVwiZmFjZUxpYlVwZGF0ZU1vZGFsSHRtbFwiIC8+XHJcbmltcG9ydCBcImNzcyEuL2ZhY2VMaWJVcGRhdGVNb2RhbC5jc3NcIjtcclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IFwiLi9mYWNlTGliVXBkYXRlTW9kYWwuY29udHJvbGxlclwiO1xyXG5cclxuaW1wb3J0IHtCdXNpbmVzc0xpYkV4fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQnVzaW5lc3NMaWJFeFwiO1xyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcbmRlY2xhcmUgY29uc3QgZmFjZUxpYlVwZGF0ZU1vZGFsSHRtbDpzdHJpbmc7XHJcblxyXG5leHBvcnQgY2xhc3MgRmFjZVVwZGF0ZVBhcmFtc3tcclxuICAgIGlzVXBkYXRlOmJvb2xlYW47XHJcbiAgICB1cGRhdGVNb2RhbERhdGE6QnVzaW5lc3NMaWJFeDtcclxuICAgIG1vZGFsQ2xvc2VkV2F0Y2hOYW1lOnN0cmluZztcclxuICAgIHBhcmVudElEOnN0cmluZztcclxuICAgIHBhcmVudE5hbWU6c3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElGYWNlTGliVXBkYXRlTW9kYWxGYWN0b3J5e1xyXG5cclxuICAgIGdldE1vZGFsQ2xvc2VkV2F0Y2hOYW1lOigpPT5zdHJpbmc7XHJcblxyXG4gICAgc2V0TW9kYWxDbG9zZWRXYXRjaE5hbWU6KG5hbWU6c3RyaW5nKT0+dm9pZDtcclxuXHJcbiAgICBnZXRNb2RhbEh0bWw6KCk9PnN0cmluZztcclxuXHJcbiAgICBzZXRVcGRhdGVQYXJhbXM6KHBhcmFtczpGYWNlVXBkYXRlUGFyYW1zKT0+dm9pZDtcclxuXHJcbiAgICBnZXRVcGRhdGVQYXJhbXM6KCk9PkZhY2VVcGRhdGVQYXJhbXM7XHJcbn1cclxuXHJcbmNsYXNzIEZhY2VMaWJVcGRhdGVNb2RhbEZhY3RvcnkgaW1wbGVtZW50cyBJRmFjZUxpYlVwZGF0ZU1vZGFsRmFjdG9yeXtcclxuICAgIHByaXZhdGUgbW9kYWxIdG1sOnN0cmluZyA9IGZhY2VMaWJVcGRhdGVNb2RhbEh0bWw7XHJcbiAgICBwcml2YXRlIG1vZGFsQ2xvc2VkV2F0Y2hOYW1lOnN0cmluZztcclxuICAgIHByaXZhdGUgaXNVcGRhdGU6Ym9vbGVhbjtcclxuICAgIHByaXZhdGUgdXBkYXRlTW9kYWxEYXRhOkJ1c2luZXNzTGliRXg7XHJcbiAgICBwcml2YXRlIHBhcmVudElEIDpzdHJpbmc7XHJcbiAgICBwcml2YXRlIHBhcmVudE5hbWUgOnN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuaW5pdFVwZGF0ZURhdGFzKCk7XHJcbiAgICB9O1xyXG4gICAgZ2V0TW9kYWxDbG9zZWRXYXRjaE5hbWUgPSAoKTpzdHJpbmcgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsQ2xvc2VkV2F0Y2hOYW1lO1xyXG4gICAgfTtcclxuICAgIHNldE1vZGFsQ2xvc2VkV2F0Y2hOYW1lID0gKG5hbWU6IHN0cmluZyk6dm9pZD0+e1xyXG4gICAgICAgIHRoaXMubW9kYWxDbG9zZWRXYXRjaE5hbWUgPSBuYW1lO1xyXG4gICAgfTtcclxuXHJcbiAgICBnZXRNb2RhbEh0bWwgPSAoKSA6IHN0cmluZz0+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsSHRtbDtcclxuICAgIH07XHJcblxyXG4gICAgc2V0VXBkYXRlUGFyYW1zID0gKHBhcmFtczpGYWNlVXBkYXRlUGFyYW1zKTogdm9pZCA9PntcclxuICAgICAgICB0aGlzLmluaXRVcGRhdGVEYXRhcygpO1xyXG4gICAgICAgIGlmKHBhcmFtcyl7XHJcbiAgICAgICAgICAgIChwYXJhbXMuaXNVcGRhdGUpICYmKHRoaXMuaXNVcGRhdGUgPSBwYXJhbXMuaXNVcGRhdGUpO1xyXG4gICAgICAgICAgICAoISFwYXJhbXMubW9kYWxDbG9zZWRXYXRjaE5hbWUpICYmICh0aGlzLm1vZGFsQ2xvc2VkV2F0Y2hOYW1lID0gcGFyYW1zLm1vZGFsQ2xvc2VkV2F0Y2hOYW1lKTtcclxuICAgICAgICAgICAgKCEhcGFyYW1zLnBhcmVudElEKSAmJiAodGhpcy5wYXJlbnRJRCA9IHBhcmFtcy5wYXJlbnRJRCk7XHJcbiAgICAgICAgICAgICghIXBhcmFtcy5wYXJlbnROYW1lKSAmJiAodGhpcy5wYXJlbnROYW1lID0gcGFyYW1zLnBhcmVudE5hbWUpO1xyXG4gICAgICAgICAgICAoISFwYXJhbXMudXBkYXRlTW9kYWxEYXRhKSAmJiAodGhpcy51cGRhdGVNb2RhbERhdGEgPSBwYXJhbXMudXBkYXRlTW9kYWxEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGluaXRVcGRhdGVEYXRhcygpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5tb2RhbENsb3NlZFdhdGNoTmFtZSA9IFwiJGVtaXQuRmFjZUxpYlVwZGF0ZUNsb3NlXCI7XHJcbiAgICAgICAgdGhpcy5pc1VwZGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTW9kYWxEYXRhID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgZ2V0VXBkYXRlUGFyYW1zKCk6RmFjZVVwZGF0ZVBhcmFtc3tcclxuICAgICAgICBsZXQgcGFyYW1zID0gbmV3IEZhY2VVcGRhdGVQYXJhbXMoKTtcclxuICAgICAgICBwYXJhbXMubW9kYWxDbG9zZWRXYXRjaE5hbWUgPSB0aGlzLm1vZGFsQ2xvc2VkV2F0Y2hOYW1lO1xyXG4gICAgICAgIHBhcmFtcy5pc1VwZGF0ZSA9IHRoaXMuaXNVcGRhdGU7XHJcbiAgICAgICAgcGFyYW1zLnVwZGF0ZU1vZGFsRGF0YSA9IHRoaXMudXBkYXRlTW9kYWxEYXRhO1xyXG4gICAgICAgIHBhcmFtcy5wYXJlbnRJRCA9IHRoaXMucGFyZW50SUQ7XHJcbiAgICAgICAgcGFyYW1zLnBhcmVudE5hbWUgPSB0aGlzLnBhcmVudE5hbWU7XHJcbiAgICAgICAgcmV0dXJuICBwYXJhbXM7XHJcbiAgICB9O1xyXG5cclxufVxyXG5hcHAuc2VydmljZSgnZmFjZUxpYlVwZGF0ZU1vZGFsRmFjdG9yeScsIEZhY2VMaWJVcGRhdGVNb2RhbEZhY3RvcnkpO1xyXG4iXX0=
