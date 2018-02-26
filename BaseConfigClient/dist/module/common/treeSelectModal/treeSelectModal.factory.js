define(["require", "exports", "text!./treeSelectModal.html", "../app/main.app"], function (require, exports, treeSelectModalHtml, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TreeSelectModalFactory = (function () {
        function TreeSelectModalFactory() {
            var _this = this;
            this.modalClosedWatchName = "treeSelectModal.closed";
            this.modalHtml = treeSelectModalHtml;
            this.initDefault = function () {
                _this.treeBase = [];
                _this.treeSelectedIds = [];
                _this.modalClosedWatchName = "treeSelectModal.closed";
                _this.updateBaseTreeParams(null);
            };
            this.updateTreeBase = function () {
                var baseSrcs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    baseSrcs[_i] = arguments[_i];
                }
                _this.initDefault();
                if (baseSrcs && baseSrcs.length > 0) {
                    angular.forEach(baseSrcs, function (val) {
                        _this.treeBase = _this.treeBase.concat(val);
                    });
                }
                else {
                    return false;
                }
                return true;
            };
            this.getTreeBase = function () {
                return _this.treeBase.concat();
            };
            this.updateTreeSelectedIds = function (ids, idKeyName) {
                if (idKeyName) {
                    _this.treeKeyName = idKeyName;
                }
                if (ids && ids.length > 0) {
                    _this.treeSelectedIds = ids.concat();
                }
                else {
                    _this.treeSelectedIds = [];
                }
            };
            this.getTreeSelectedIds = function () {
                return _this.treeSelectedIds.concat();
            };
            this.updateSelectModalClosedWatchName = function (name) {
                if (name) {
                    _this.modalClosedWatchName = name;
                }
            };
            this.getSelectModalClosedWatchName = function () {
                return _this.modalClosedWatchName;
            };
            this.getModalHtmlTemplate = function () {
                return _this.modalHtml;
            };
            this.updateBaseTreeParams = function (checkType, idKey, parentIdKey) {
                _this.treeKeyName = !!idKey ? idKey : "ID";
                _this.treeCheckType = !!checkType ? checkType : null;
                _this.treeParentKeyName = !!parentIdKey ? parentIdKey : "treeParentId";
            };
            this.getTreeKeyName = function () {
                return _this.treeKeyName;
            };
            this.getTreeCheckType = function () {
                return _this.treeCheckType;
            };
            this.getTreeParentKeyName = function () {
                return _this.treeParentKeyName;
            };
            this.initDefault();
        }
        return TreeSelectModalFactory;
    }());
    main_app_1.app.service('treeSelectModalFactory', TreeSelectModalFactory);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3RyZWVTZWxlY3RNb2RhbC90cmVlU2VsZWN0TW9kYWwuZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFnRUE7UUFnQkk7WUFBQSxpQkFFQztZQWhCTyx5QkFBb0IsR0FBRyx3QkFBd0IsQ0FBQztZQU1oRCxjQUFTLEdBQUcsbUJBQW1CLENBQUM7WUFXaEMsZ0JBQVcsR0FBRztnQkFDbEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFnQixDQUFDO2dCQUNqQyxLQUFJLENBQUMsZUFBZSxHQUFHLEVBQW1CLENBQUM7Z0JBQzNDLEtBQUksQ0FBQyxvQkFBb0IsR0FBRyx3QkFBd0IsQ0FBQztnQkFDckQsS0FBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BDLENBQUMsQ0FBQztZQUVGLG1CQUFjLEdBQUc7Z0JBQUMsa0JBQXlCO3FCQUF6QixVQUF5QixFQUF6QixxQkFBeUIsRUFBekIsSUFBeUI7b0JBQXpCLDZCQUF5Qjs7Z0JBQ3ZDLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDbkIsRUFBRSxDQUFBLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztvQkFDOUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUMsVUFBQyxHQUFjO3dCQUNwQyxLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM5QyxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUFBLElBQUksQ0FBQSxDQUFDO29CQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ2pCLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNoQixDQUFDLENBQUM7WUFFRixnQkFBVyxHQUFHO2dCQUNWLE1BQU0sQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xDLENBQUMsQ0FBQztZQUVGLDBCQUFxQixHQUFHLFVBQUMsR0FBaUIsRUFBQyxTQUFpQjtnQkFDeEQsRUFBRSxDQUFBLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBQztvQkFDVixLQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztnQkFDakMsQ0FBQztnQkFDRCxFQUFFLENBQUEsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDO29CQUNwQixLQUFJLENBQUMsZUFBZSxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDeEMsQ0FBQztnQkFBQSxJQUFJLENBQUEsQ0FBQztvQkFDRixLQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztnQkFDOUIsQ0FBQztZQUNMLENBQUMsQ0FBQztZQUVGLHVCQUFrQixHQUFHO2dCQUNqQixNQUFNLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN6QyxDQUFDLENBQUM7WUFFRixxQ0FBZ0MsR0FBRyxVQUFDLElBQVc7Z0JBQzNDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7b0JBQ0wsS0FBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztnQkFDckMsQ0FBQztZQUNMLENBQUMsQ0FBQztZQUVGLGtDQUE2QixHQUFHO2dCQUM1QixNQUFNLENBQUMsS0FBSSxDQUFDLG9CQUFvQixDQUFDO1lBQ3JDLENBQUMsQ0FBQztZQUVGLHlCQUFvQixHQUFHO2dCQUNuQixNQUFNLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQztZQUMxQixDQUFDLENBQUM7WUFFRix5QkFBb0IsR0FBRyxVQUFDLFNBQWdCLEVBQUMsS0FBYSxFQUFDLFdBQW1CO2dCQUN0RSxLQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUEsQ0FBQyxDQUFBLEtBQUssQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDO2dCQUN0QyxLQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUEsQ0FBQyxDQUFBLFNBQVMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDO2dCQUNoRCxLQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFBLENBQUMsQ0FBQyxjQUFjLENBQUM7WUFDekUsQ0FBQyxDQUFDO1lBQ0YsbUJBQWMsR0FBRztnQkFDYixNQUFNLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQztZQUM1QixDQUFDLENBQUM7WUFFRixxQkFBZ0IsR0FBRztnQkFDZixNQUFNLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQztZQUM5QixDQUFDLENBQUM7WUFDRix5QkFBb0IsR0FBRztnQkFDbkIsTUFBTSxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNsQyxDQUFDLENBQUM7WUFwRUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7UUFzRUwsNkJBQUM7SUFBRCxDQXhGQSxBQXdGQyxJQUFBO0lBQ0QsY0FBRyxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vdHJlZVNlbGVjdE1vZGFsL3RyZWVTZWxlY3RNb2RhbC5mYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi90cmVlU2VsZWN0TW9kYWwuaHRtbFwiIG5hbWU9XCJ0cmVlU2VsZWN0TW9kYWxIdG1sXCIgLz5cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi9hcHAvbWFpbi5hcHBcIjtcclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuZGVjbGFyZSBjb25zdCB0cmVlU2VsZWN0TW9kYWxIdG1sOnN0cmluZztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVRyZWVTZWxlY3RNb2RhbEZhY3Rvcnl7XHJcbiAgICAvKiogY3JlYXRlIGJ5IHp4cVxyXG4gICAgICogIOabtOaWsCDmoJHliJfooagg77yI5b+F6aG76LCD55So77yJXHJcbiAgICAgKiBAdGltZTogMjAxNy0wNy0wNiAxNDo1NzozOFxyXG4gICAgICogQHBhcmFtczogYmFzZVNyY3MgKOWPr+S8oOWkmuS4quWFg+aVsOaNruaVsOe7hClcclxuICAgICAqIEByZXR1cm46XHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZVRyZWVCYXNlIDooLi4uYmFzZVNyY3M6IEFycmF5PGFueT5bXSk9PmJvb2xlYW47XHJcbiAgICAvKiogY3JlYXRlIGJ5IHp4cVxyXG4gICAgICogIOiOt+WPluW3suWtmCDmoJEg5YWD5pWw5o2uXHJcbiAgICAgKiBAdGltZTogMjAxNy0wNy0wNiAxNDo1NzozOFxyXG4gICAgICovXHJcbiAgICBnZXRUcmVlQmFzZTooKT0+QXJyYXk8YW55PjtcclxuICAgIC8qKiBjcmVhdGUgYnkgenhxXHJcbiAgICAgKiAg5pu05paw5L+d5a2YIOW3sumAiSDnvJPlrZjmlbDmja5cclxuICAgICAqIEB0aW1lOiAyMDE3LTA3LTA2IDE0OjU3OjM4XHJcbiAgICAgKiBAcGFyYW1zOiBpZHNcclxuICAgICAqL1xyXG4gICAgdXBkYXRlVHJlZVNlbGVjdGVkSWRzOihpZHM6QXJyYXk8c3RyaW5nPixpZEtleU5hbWU/OnN0cmluZyk9PnZvaWQ7XHJcbiAgICAvKiogY3JlYXRlIGJ5IHp4cVxyXG4gICAgICogIOiOt+WPlumAieaLqeaVsOaNruWIl+ihqGlkIOmbhuWQiFxyXG4gICAgICogQHRpbWU6IDIwMTctMDctMDYgMTQ6NTc6MzhcclxuICAgICAqIEBwYXJhbXM6IGlkc1xyXG4gICAgICovXHJcbiAgICBnZXRUcmVlU2VsZWN0ZWRJZHM6KCk9PkFycmF5PHN0cmluZz47XHJcbiAgICAvKiogY3JlYXRlIGJ5IHp4cVxyXG4gICAgICogIOabtOaUuem7mOiupCDnqpflj6Mg5YWz6Zet5Zue6LCD5ZCN56ewXHJcbiAgICAgKiBAdGltZTogMjAxNy0wNy0wNiAxNDo1NzozOFxyXG4gICAgICogQHBhcmFtczogbmFtZVxyXG4gICAgICovXHJcbiAgICB1cGRhdGVTZWxlY3RNb2RhbENsb3NlZFdhdGNoTmFtZToobmFtZTpzdHJpbmcpPT52b2lkO1xyXG4gICAgLyoqIGNyZWF0ZSBieSB6eHFcclxuICAgICAqICDojrflj5Yg56qX5Y+jIOWFs+mXreWbnuiwg+WQjeensFxyXG4gICAgICogQHRpbWU6IDIwMTctMDctMDYgMTQ6NTc6MzhcclxuICAgICAqIEBwYXJhbXM6XHJcbiAgICAgKiBAcmV0dXJuOiBuYW1lIDpzdHJpbmdcclxuICAgICAqL1xyXG4gICAgZ2V0U2VsZWN0TW9kYWxDbG9zZWRXYXRjaE5hbWU6KCk9PnN0cmluZztcclxuXHJcbiAgICBnZXRNb2RhbEh0bWxUZW1wbGF0ZSA6KCk9PiBzdHJpbmc7XHJcblxyXG4gICAgLyoqIGNyZWF0ZSBieSB6eHFcclxuICAgICAqICDliJ3lp4vljJYg5qCRIOWxnuaAp1xyXG4gICAgICogQHRpbWU6IDIwMTctMDctMDYgMTQ6NTc6MzhcclxuICAgICAqIEBwYXJhbXM6IGNoZWNrVHlwZSDpgInmi6nov5Tlm54g5Lul5Y+KIOWLvumAiSDmmL7npLog6IqC54K5IOagkeexu+Wei++8jOS4jeaMh+WumiDooagg5YWo6YOoXHJcbiAgICAgKiBAcGFyYW1zOiBpZEtleSBrZXkg5ZCN56ewIOm7mOiupCBcIklEXCJcclxuICAgICAqIEBwYXJhbXM6IHBhcmVudElkS2V5IGtleSDlkI3np7Ag6buY6K6kIFwidHJlZVBhcmVudElkXCJcclxuICAgICAqL1xyXG4gICAgdXBkYXRlQmFzZVRyZWVQYXJhbXM6KGNoZWNrVHlwZTpzdHJpbmcsaWRLZXk/OnN0cmluZyxwYXJlbnRJZEtleT86c3RyaW5nKT0+dm9pZDtcclxuXHJcbiAgICBnZXRUcmVlS2V5TmFtZTooKT0+IHN0cmluZztcclxuXHJcbiAgICBnZXRUcmVlQ2hlY2tUeXBlOigpPT4gc3RyaW5nO1xyXG5cclxuICAgIGdldFRyZWVQYXJlbnRLZXlOYW1lOigpPT4gc3RyaW5nO1xyXG59XHJcblxyXG5jbGFzcyBUcmVlU2VsZWN0TW9kYWxGYWN0b3J5IGltcGxlbWVudHMgSVRyZWVTZWxlY3RNb2RhbEZhY3Rvcnl7XHJcblxyXG4gICAgcHJpdmF0ZSBtb2RhbENsb3NlZFdhdGNoTmFtZSA9IFwidHJlZVNlbGVjdE1vZGFsLmNsb3NlZFwiO1xyXG5cclxuICAgIHByaXZhdGUgdHJlZUJhc2U6QXJyYXk8YW55PjtcclxuXHJcbiAgICBwcml2YXRlIHRyZWVTZWxlY3RlZElkczpBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgIHByaXZhdGUgbW9kYWxIdG1sID0gdHJlZVNlbGVjdE1vZGFsSHRtbDtcclxuXHJcbiAgICBwcml2YXRlIHRyZWVLZXlOYW1lOnN0cmluZztcclxuICAgIHByaXZhdGUgdHJlZVBhcmVudEtleU5hbWU6c3RyaW5nO1xyXG5cclxuICAgIHByaXZhdGUgdHJlZUNoZWNrVHlwZTpzdHJpbmc7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5pbml0RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpbml0RGVmYXVsdCA9ICgpPT57XHJcbiAgICAgICAgdGhpcy50cmVlQmFzZSA9IFtdIGFzIEFycmF5PGFueT47XHJcbiAgICAgICAgdGhpcy50cmVlU2VsZWN0ZWRJZHMgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIHRoaXMubW9kYWxDbG9zZWRXYXRjaE5hbWUgPSBcInRyZWVTZWxlY3RNb2RhbC5jbG9zZWRcIjtcclxuICAgICAgICB0aGlzLnVwZGF0ZUJhc2VUcmVlUGFyYW1zKG51bGwpO1xyXG4gICAgfTtcclxuXHJcbiAgICB1cGRhdGVUcmVlQmFzZSA9ICguLi5iYXNlU3JjczogQXJyYXk8YW55PltdKTpib29sZWFuPT57XHJcbiAgICAgICAgdGhpcy5pbml0RGVmYXVsdCgpO1xyXG4gICAgICAgIGlmKGJhc2VTcmNzICYmIGJhc2VTcmNzLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGJhc2VTcmNzLCh2YWw6QXJyYXk8YW55Pik9PntcclxuICAgICAgICAgICAgICAgIHRoaXMudHJlZUJhc2UgPSB0aGlzLnRyZWVCYXNlLmNvbmNhdCh2YWwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcblxyXG4gICAgZ2V0VHJlZUJhc2UgPSAoKTpBcnJheTxhbnk+PT57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZUJhc2UuY29uY2F0KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHVwZGF0ZVRyZWVTZWxlY3RlZElkcyA9IChpZHM6QXJyYXk8c3RyaW5nPixpZEtleU5hbWU/OnN0cmluZyk6dm9pZD0+e1xyXG4gICAgICAgIGlmKGlkS2V5TmFtZSl7XHJcbiAgICAgICAgICAgIHRoaXMudHJlZUtleU5hbWUgPSBpZEtleU5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlkcyAmJiBpZHMubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICB0aGlzLnRyZWVTZWxlY3RlZElkcyA9IGlkcy5jb25jYXQoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy50cmVlU2VsZWN0ZWRJZHMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGdldFRyZWVTZWxlY3RlZElkcyA9ICgpOkFycmF5PHN0cmluZz49PntcclxuICAgICAgICByZXR1cm4gdGhpcy50cmVlU2VsZWN0ZWRJZHMuY29uY2F0KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHVwZGF0ZVNlbGVjdE1vZGFsQ2xvc2VkV2F0Y2hOYW1lID0gKG5hbWU6c3RyaW5nKTp2b2lkID0+e1xyXG4gICAgICAgIGlmKG5hbWUpe1xyXG4gICAgICAgICAgICB0aGlzLm1vZGFsQ2xvc2VkV2F0Y2hOYW1lID0gbmFtZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGdldFNlbGVjdE1vZGFsQ2xvc2VkV2F0Y2hOYW1lID0gKCk6c3RyaW5nPT57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxDbG9zZWRXYXRjaE5hbWU7XHJcbiAgICB9O1xyXG5cclxuICAgIGdldE1vZGFsSHRtbFRlbXBsYXRlID0gKCk6c3RyaW5nPT57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxIdG1sO1xyXG4gICAgfTtcclxuXHJcbiAgICB1cGRhdGVCYXNlVHJlZVBhcmFtcyA9IChjaGVja1R5cGU6c3RyaW5nLGlkS2V5PzpzdHJpbmcscGFyZW50SWRLZXk/OnN0cmluZyk9PntcclxuICAgICAgICB0aGlzLnRyZWVLZXlOYW1lID0gISFpZEtleT9pZEtleTpcIklEXCI7XHJcbiAgICAgICAgdGhpcy50cmVlQ2hlY2tUeXBlID0gISFjaGVja1R5cGU/Y2hlY2tUeXBlOm51bGw7XHJcbiAgICAgICAgdGhpcy50cmVlUGFyZW50S2V5TmFtZSA9ICEhcGFyZW50SWRLZXkgPyBwYXJlbnRJZEtleTogXCJ0cmVlUGFyZW50SWRcIjtcclxuICAgIH07XHJcbiAgICBnZXRUcmVlS2V5TmFtZSA9ICgpOnN0cmluZz0+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyZWVLZXlOYW1lO1xyXG4gICAgfTtcclxuXHJcbiAgICBnZXRUcmVlQ2hlY2tUeXBlID0gKCk6c3RyaW5nPT57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZUNoZWNrVHlwZTtcclxuICAgIH07XHJcbiAgICBnZXRUcmVlUGFyZW50S2V5TmFtZSA9ICgpOnN0cmluZz0+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyZWVQYXJlbnRLZXlOYW1lO1xyXG4gICAgfTtcclxuXHJcblxyXG59XHJcbmFwcC5zZXJ2aWNlKCd0cmVlU2VsZWN0TW9kYWxGYWN0b3J5JywgVHJlZVNlbGVjdE1vZGFsRmFjdG9yeSk7XHJcbiJdfQ==
