define(["require", "exports", "../../common/app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PageParams = (function () {
        function PageParams() {
            this.totalCount = 1;
            this.pageSize = 5;
            this.currentPage = 1;
            this.pageCount = 1;
        }
        return PageParams;
    }());
    exports.PageParams = PageParams;
    var CameraPagingService = (function () {
        function CameraPagingService() {
            this.faceAccompDataList = {};
        }
        CameraPagingService.prototype.getAllData = function () {
            return this.faceAccompDataList;
        };
        CameraPagingService.prototype.setDataList = function (data) {
            if (Array.isArray(data)) {
                this.faceAccompDataList = angular.copy(data);
            }
        };
        CameraPagingService.prototype.getDataByPage = function (params) {
            var pageParams = new PageParams();
            pageParams.pageSize = params.pageSize || 10;
            pageParams.currentPage = params.currentPage || 1;
            var faceAccompData = angular.copy(this.faceAccompDataList);
            pageParams.totalCount = faceAccompData.length;
            if (pageParams.totalCount % pageParams.pageSize === 0) {
                pageParams.pageCount = Math.round(pageParams.totalCount / pageParams.pageSize);
            }
            else {
                pageParams.pageCount = Math.ceil(pageParams.totalCount / pageParams.pageSize);
            }
            if (pageParams.currentPage > pageParams.pageCount) {
                pageParams.currentPage = pageParams.pageCount;
            }
            if (pageParams.pageSize > pageParams.totalCount) {
                pageParams.pageSize = pageParams.totalCount;
            }
            var start = (pageParams.currentPage - 1) * pageParams.pageSize;
            var end = pageParams.currentPage * pageParams.pageSize;
            var result = faceAccompData.slice(start, end);
            faceAccompData = angular.copy(result);
            pageParams.data = faceAccompData;
            return pageParams;
        };
        CameraPagingService.prototype.delResultById = function (id) {
            var arr = [];
            var list = this.faceAccompDataList;
            for (var i = 0; i < list.length; i++) {
                if (id === list[i].accessLog.CameraID) {
                    arr = this.faceAccompDataList.splice(i, 1);
                }
            }
            return arr.length > 0;
        };
        return CameraPagingService;
    }());
    main_app_1.app.service('cameraPagingService', CameraPagingService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFwUG9pbnQvY2FtZXJhTWFwUG9pbnQvY2FtZXJhLnBhZ2luZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFJQTtRQUFBO1lBQ0ksZUFBVSxHQUFXLENBQUMsQ0FBQztZQUN2QixhQUFRLEdBQVcsQ0FBQyxDQUFDO1lBQ3JCLGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1lBQ3hCLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFHMUIsQ0FBQztRQUFELGlCQUFDO0lBQUQsQ0FQQSxBQU9DLElBQUE7SUFQWSxnQ0FBVTtJQWdCdkI7UUFBQTtZQUNZLHVCQUFrQixHQUFRLEVBQUUsQ0FBQztRQWtEekMsQ0FBQztRQWhERyx3Q0FBVSxHQUFWO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQTtRQUNsQyxDQUFDO1FBRUQseUNBQVcsR0FBWCxVQUFZLElBQVE7WUFDaEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2hELENBQUM7UUFDTCxDQUFDO1FBRUQsMkNBQWEsR0FBYixVQUFjLE1BQWtCO1lBQzVCLElBQUksVUFBVSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7WUFDbEMsVUFBVSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztZQUM1QyxVQUFVLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1lBQ2pELElBQUksY0FBYyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFRLENBQUM7WUFFbEUsVUFBVSxDQUFDLFVBQVUsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDO1lBQzlDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxVQUFVLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkYsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFVBQVUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDaEQsVUFBVSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDO1lBQ2xELENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUM5QyxVQUFVLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUE7WUFDL0MsQ0FBQztZQUNELElBQUksS0FBSyxHQUFHLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBQy9ELElBQUksR0FBRyxHQUFHLFVBQVUsQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUV2RCxJQUFJLE1BQU0sR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM5QyxjQUFjLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0QyxVQUFVLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQztZQUNqQyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3RCLENBQUM7UUFFRCwyQ0FBYSxHQUFiLFVBQWMsRUFBVTtZQUNwQixJQUFJLEdBQUcsR0FBRyxFQUFnQixDQUFDO1lBQzNCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztZQUNuQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDbkMsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDcEMsR0FBRyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO2dCQUM5QyxDQUFDO1lBQ0wsQ0FBQztZQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtRQUN6QixDQUFDO1FBRUwsMEJBQUM7SUFBRCxDQW5EQSxBQW1EQyxJQUFBO0lBRUQsY0FBRyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9tYXBQb2ludC9jYW1lcmFNYXBQb2ludC9jYW1lcmEucGFnaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcblxyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFnZVBhcmFtcyB7XHJcbiAgICB0b3RhbENvdW50OiBudW1iZXIgPSAxO1xyXG4gICAgcGFnZVNpemU6IG51bWJlciA9IDU7XHJcbiAgICBjdXJyZW50UGFnZTogbnVtYmVyID0gMTtcclxuICAgIHBhZ2VDb3VudDogbnVtYmVyID0gMTtcclxuICAgIGRhdGE/OiBhbnk7XHJcbiAgICBjdXJyZW50SW5kZXg6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ2FtZXJhUGFnaW5nU2VydmljZSB7XHJcbiAgICBzZXREYXRhTGlzdDogKGRhdGE6YW55KSA9PiB2b2lkXHJcbiAgICBnZXREYXRhQnlQYWdlOiAoIHBhcmFtczogUGFnZVBhcmFtcykgPT4gUGFnZVBhcmFtcztcclxuICAgIGRlbFJlc3VsdEJ5SWQ6IChpZDogc3RyaW5nKSA9PiBib29sZWFuO1xyXG4gICAgZ2V0QWxsRGF0YTooKSA9PiBBcnJheTxhbnk+O1xyXG59XHJcblxyXG5jbGFzcyBDYW1lcmFQYWdpbmdTZXJ2aWNlIGltcGxlbWVudHMgSUNhbWVyYVBhZ2luZ1NlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBmYWNlQWNjb21wRGF0YUxpc3Q6IGFueSA9IHt9O1xyXG5cclxuICAgIGdldEFsbERhdGEoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5mYWNlQWNjb21wRGF0YUxpc3RcclxuICAgIH1cclxuXHJcbiAgICBzZXREYXRhTGlzdChkYXRhOmFueSkge1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjZUFjY29tcERhdGFMaXN0ID0gYW5ndWxhci5jb3B5KGRhdGEpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldERhdGFCeVBhZ2UocGFyYW1zOiBQYWdlUGFyYW1zKTogUGFnZVBhcmFtcyB7XHJcbiAgICAgICAgbGV0IHBhZ2VQYXJhbXMgPSBuZXcgUGFnZVBhcmFtcygpO1xyXG4gICAgICAgIHBhZ2VQYXJhbXMucGFnZVNpemUgPSBwYXJhbXMucGFnZVNpemUgfHwgMTA7XHJcbiAgICAgICAgcGFnZVBhcmFtcy5jdXJyZW50UGFnZSA9IHBhcmFtcy5jdXJyZW50UGFnZSB8fCAxO1xyXG4gICAgICAgIGxldCBmYWNlQWNjb21wRGF0YSA9IGFuZ3VsYXIuY29weSh0aGlzLmZhY2VBY2NvbXBEYXRhTGlzdCkgYXMgYW55O1xyXG5cclxuICAgICAgICBwYWdlUGFyYW1zLnRvdGFsQ291bnQgPSBmYWNlQWNjb21wRGF0YS5sZW5ndGg7XHJcbiAgICAgICAgaWYgKHBhZ2VQYXJhbXMudG90YWxDb3VudCAlIHBhZ2VQYXJhbXMucGFnZVNpemUgPT09IDApIHtcclxuICAgICAgICAgICAgcGFnZVBhcmFtcy5wYWdlQ291bnQgPSBNYXRoLnJvdW5kKHBhZ2VQYXJhbXMudG90YWxDb3VudCAvIHBhZ2VQYXJhbXMucGFnZVNpemUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBhZ2VQYXJhbXMucGFnZUNvdW50ID0gTWF0aC5jZWlsKHBhZ2VQYXJhbXMudG90YWxDb3VudCAvIHBhZ2VQYXJhbXMucGFnZVNpemUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFnZVBhcmFtcy5jdXJyZW50UGFnZSA+IHBhZ2VQYXJhbXMucGFnZUNvdW50KSB7XHJcbiAgICAgICAgICAgIHBhZ2VQYXJhbXMuY3VycmVudFBhZ2UgPSBwYWdlUGFyYW1zLnBhZ2VDb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhZ2VQYXJhbXMucGFnZVNpemUgPiBwYWdlUGFyYW1zLnRvdGFsQ291bnQpIHtcclxuICAgICAgICAgICAgcGFnZVBhcmFtcy5wYWdlU2l6ZSA9IHBhZ2VQYXJhbXMudG90YWxDb3VudFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc3RhcnQgPSAocGFnZVBhcmFtcy5jdXJyZW50UGFnZSAtIDEpICogcGFnZVBhcmFtcy5wYWdlU2l6ZTtcclxuICAgICAgICBsZXQgZW5kID0gcGFnZVBhcmFtcy5jdXJyZW50UGFnZSAqIHBhZ2VQYXJhbXMucGFnZVNpemU7XHJcblxyXG4gICAgICAgIGxldCByZXN1bHQgPSBmYWNlQWNjb21wRGF0YS5zbGljZShzdGFydCwgZW5kKTtcclxuICAgICAgICBmYWNlQWNjb21wRGF0YSA9IGFuZ3VsYXIuY29weShyZXN1bHQpO1xyXG4gICAgICAgIHBhZ2VQYXJhbXMuZGF0YSA9IGZhY2VBY2NvbXBEYXRhO1xyXG4gICAgICAgIHJldHVybiBwYWdlUGFyYW1zO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbFJlc3VsdEJ5SWQoaWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxhbnk+O1xyXG4gICAgICAgIGxldCBsaXN0ID0gdGhpcy5mYWNlQWNjb21wRGF0YUxpc3Q7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpZCA9PT0gbGlzdFtpXS5hY2Nlc3NMb2cuQ2FtZXJhSUQpIHtcclxuICAgICAgICAgICAgICAgIGFyciA9IHRoaXMuZmFjZUFjY29tcERhdGFMaXN0LnNwbGljZShpLCAxKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnIubGVuZ3RoID4gMFxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuYXBwLnNlcnZpY2UoJ2NhbWVyYVBhZ2luZ1NlcnZpY2UnLCBDYW1lcmFQYWdpbmdTZXJ2aWNlKTtcclxuIl19
