define(["require", "exports", "../app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PageModel = (function () {
        function PageModel() {
        }
        PageModel.prototype.setData = function (datas) {
            this.datas = datas || [];
            this.totalCount = this.datas.length;
        };
        PageModel.prototype.getDataByPage = function (currentIndex, pageSize) {
            var arr = this.datas.slice((currentIndex - 1) * pageSize, currentIndex * pageSize);
            var result = {};
            result.Result = angular.copy(arr);
            result.TotalCount = this.totalCount;
            return result;
        };
        PageModel.prototype.delete = function () {
            this.datas = null;
        };
        return PageModel;
    }());
    exports.PageModel = PageModel;
    var DatasCachePageFactory = (function () {
        function DatasCachePageFactory() {
        }
        DatasCachePageFactory.prototype.getPageModel = function () {
            return new PageModel();
        };
        return DatasCachePageFactory;
    }());
    exports.DatasCachePageFactory = DatasCachePageFactory;
    main_app_1.app.service("datasCachePageFactory", DatasCachePageFactory);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2ZhY3RvcnkvZGF0YXMuY2FjaGUucGFnZS5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBO1FBQUE7UUFvQkEsQ0FBQztRQWhCRywyQkFBTyxHQUFQLFVBQVEsS0FBZTtZQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssSUFBSyxFQUFlLENBQUM7WUFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUN4QyxDQUFDO1FBRUQsaUNBQWEsR0FBYixVQUFjLFlBQW9CLEVBQUUsUUFBZ0I7WUFDaEQsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLEdBQUMsUUFBUSxFQUFFLFlBQVksR0FBRyxRQUFRLENBQUMsQ0FBQztZQUNqRixJQUFJLE1BQU0sR0FBRyxFQUFtQixDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBRUQsMEJBQU0sR0FBTjtZQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLENBQUM7UUFDTCxnQkFBQztJQUFELENBcEJBLEFBb0JDLElBQUE7SUFwQlksOEJBQVM7SUFzQnRCO1FBQUE7UUFJQSxDQUFDO1FBSEcsNENBQVksR0FBWjtZQUNJLE1BQU0sQ0FBQyxJQUFJLFNBQVMsRUFBSyxDQUFDO1FBQzlCLENBQUM7UUFDTCw0QkFBQztJQUFELENBSkEsQUFJQyxJQUFBO0lBSlksc0RBQXFCO0lBTWxDLGNBQUcsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLEVBQUUscUJBQXFCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL2ZhY3RvcnkvZGF0YXMuY2FjaGUucGFnZS5mYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXBwIH0gZnJvbSAnLi4vYXBwL21haW4uYXBwJztcclxuaW1wb3J0IHsgUGFnZVJlc3VsdCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdCc7XHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6YW55O1xyXG5leHBvcnQgY2xhc3MgUGFnZU1vZGVsPFQ+e1xyXG5cclxuICAgIGRhdGFzOiBBcnJheTxUPjtcclxuICAgIHRvdGFsQ291bnQ6IG51bWJlcjtcclxuICAgIHNldERhdGEoZGF0YXM6IEFycmF5PFQ+KTogdm9pZHtcclxuICAgICAgICB0aGlzLmRhdGFzID0gZGF0YXMgfHwgKFtdIGFzIEFycmF5PFQ+KTtcclxuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSB0aGlzLmRhdGFzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBnZXREYXRhQnlQYWdlKGN1cnJlbnRJbmRleDogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyKTogUGFnZVJlc3VsdDxUPntcclxuICAgICAgICBsZXQgYXJyID0gdGhpcy5kYXRhcy5zbGljZSgoY3VycmVudEluZGV4IC0gMSkqcGFnZVNpemUsIGN1cnJlbnRJbmRleCAqIHBhZ2VTaXplKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0ge30gYXMgUGFnZVJlc3VsdDxUPjtcclxuICAgICAgICByZXN1bHQuUmVzdWx0ID0gYW5ndWxhci5jb3B5KGFycik7XHJcbiAgICAgICAgcmVzdWx0LlRvdGFsQ291bnQgPSB0aGlzLnRvdGFsQ291bnQ7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGUoKTogdm9pZHtcclxuICAgICAgICB0aGlzLmRhdGFzID0gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERhdGFzQ2FjaGVQYWdlRmFjdG9yeXtcclxuICAgIGdldFBhZ2VNb2RlbDxUPigpOiBQYWdlTW9kZWw8VD57XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQYWdlTW9kZWw8VD4oKTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwLnNlcnZpY2UoXCJkYXRhc0NhY2hlUGFnZUZhY3RvcnlcIiwgRGF0YXNDYWNoZVBhZ2VGYWN0b3J5KTsiXX0=
