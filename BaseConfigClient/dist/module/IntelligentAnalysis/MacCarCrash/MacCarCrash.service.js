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
    var MacCarCrashService = (function () {
        function MacCarCrashService() {
            this.faceAccompDataList = {};
        }
        MacCarCrashService.prototype.getAllFaceTrackData = function () {
            return this.faceAccompDataList.result;
        };
        MacCarCrashService.prototype.setFaceAccompDataList = function (data) {
            if (Array.isArray(data.result)) {
                this.faceAccompDataList = angular.copy(data);
            }
        };
        MacCarCrashService.prototype.getFaceAccompDataByPage = function (params) {
            var pageParams = new PageParams();
            pageParams.pageSize = params.pageSize || 10;
            pageParams.currentPage = params.currentPage || 1;
            var faceAccompData = angular.copy(this.faceAccompDataList);
            console.log(faceAccompData);
            pageParams.totalCount = faceAccompData.result.length;
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
            var result = faceAccompData.result.slice(start, end);
            faceAccompData.result = angular.copy(result);
            pageParams.data = faceAccompData;
            return pageParams;
        };
        MacCarCrashService.prototype.delFaceAccompResult = function (id) {
            var arr = [];
            var list = this.faceAccompDataList.result;
            for (var i = 0; i < list.length; i++) {
                if (id === list[i].AccessLog.CameraID) {
                    arr = this.faceAccompDataList.result.splice(i, 1);
                }
            }
            return arr.length > 0;
        };
        return MacCarCrashService;
    }());
    main_app_1.app.service('macCarCrashService', MacCarCrashService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9NYWNDYXJDcmFzaC9NYWNDYXJDcmFzaC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUtBO1FBQUE7WUFDSSxlQUFVLEdBQVcsQ0FBQyxDQUFDO1lBQ3ZCLGFBQVEsR0FBVyxDQUFDLENBQUM7WUFDckIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7WUFDeEIsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUcxQixDQUFDO1FBQUQsaUJBQUM7SUFBRCxDQVBBLEFBT0MsSUFBQTtJQVBZLGdDQUFVO0lBZ0J2QjtRQUFBO1lBQ1ksdUJBQWtCLEdBQStCLEVBQWdDLENBQUM7UUErQzlGLENBQUM7UUE5Q0csZ0RBQW1CLEdBQW5CO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUE7UUFDekMsQ0FBQztRQUNELGtEQUFxQixHQUFyQixVQUFzQixJQUErQjtZQUNqRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2hELENBQUM7UUFDTCxDQUFDO1FBQ0Qsb0RBQXVCLEdBQXZCLFVBQXdCLE1BQWtCO1lBQ3RDLElBQUksVUFBVSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7WUFDbEMsVUFBVSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztZQUM1QyxVQUFVLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1lBQ2pELElBQUksY0FBYyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUErQixDQUFDO1lBQ3pGLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUE7WUFDM0IsVUFBVSxDQUFDLFVBQVUsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNyRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEQsVUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25GLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixVQUFVLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEYsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELFVBQVUsQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQztZQUNsRCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDOUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFBO1lBQy9DLENBQUM7WUFDRCxJQUFJLEtBQUssR0FBRyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUMvRCxJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDdkQsSUFBSSxNQUFNLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRXJELGNBQWMsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3QyxVQUFVLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQztZQUNqQyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3RCLENBQUM7UUFFRCxnREFBbUIsR0FBbkIsVUFBb0IsRUFBVTtZQUMxQixJQUFJLEdBQUcsR0FBRyxFQUFtQixDQUFDO1lBQzlCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7WUFDMUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ25DLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ3BDLEdBQUcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7Z0JBQ3JELENBQUM7WUFDTCxDQUFDO1lBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1FBQ3pCLENBQUM7UUFFTCx5QkFBQztJQUFELENBaERBLEFBZ0RDLElBQUE7SUFFRCxjQUFHLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLGtCQUFrQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL0ludGVsbGlnZW50QW5hbHlzaXMvTWFjQ2FyQ3Jhc2gvTWFjQ2FyQ3Jhc2guc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQge0FjY29tcGFueWluZ0FuYWx5c2lzUmVzdWx0LCBSZXN1bHR9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L0FjY29tcGFueWluZ0FuYWx5c2lzRW51bSdcclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBQYWdlUGFyYW1zIHtcclxuICAgIHRvdGFsQ291bnQ6IG51bWJlciA9IDE7XHJcbiAgICBwYWdlU2l6ZTogbnVtYmVyID0gNTtcclxuICAgIGN1cnJlbnRQYWdlOiBudW1iZXIgPSAxO1xyXG4gICAgcGFnZUNvdW50OiBudW1iZXIgPSAxO1xyXG4gICAgZGF0YT86IEFjY29tcGFueWluZ0FuYWx5c2lzUmVzdWx0O1xyXG4gICAgY3VycmVudEluZGV4OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1hY0NhckNyYXNoU2VydmljZSB7XHJcbiAgICBzZXRGYWNlQWNjb21wRGF0YUxpc3Q6IChkYXRhOkFjY29tcGFueWluZ0FuYWx5c2lzUmVzdWx0KSA9PiB2b2lkXHJcbiAgICBnZXRGYWNlQWNjb21wRGF0YUJ5UGFnZTogKCBwYXJhbXM6IFBhZ2VQYXJhbXMpID0+IFBhZ2VQYXJhbXM7XHJcbiAgICBkZWxGYWNlQWNjb21wUmVzdWx0OiAoaWQ6IHN0cmluZykgPT4gYm9vbGVhbjtcclxuICAgIGdldEFsbEZhY2VUcmFja0RhdGE6KCkgPT4gQXJyYXk8UmVzdWx0PjtcclxufVxyXG5cclxuY2xhc3MgTWFjQ2FyQ3Jhc2hTZXJ2aWNlIGltcGxlbWVudHMgSU1hY0NhckNyYXNoU2VydmljZSB7XHJcbiAgICBwcml2YXRlIGZhY2VBY2NvbXBEYXRhTGlzdDogQWNjb21wYW55aW5nQW5hbHlzaXNSZXN1bHQgPSB7fSBhcyBBY2NvbXBhbnlpbmdBbmFseXNpc1Jlc3VsdDtcclxuICAgIGdldEFsbEZhY2VUcmFja0RhdGEoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5mYWNlQWNjb21wRGF0YUxpc3QucmVzdWx0XHJcbiAgICB9XHJcbiAgICBzZXRGYWNlQWNjb21wRGF0YUxpc3QoZGF0YTpBY2NvbXBhbnlpbmdBbmFseXNpc1Jlc3VsdCkge1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEucmVzdWx0KSkge1xyXG4gICAgICAgICAgICB0aGlzLmZhY2VBY2NvbXBEYXRhTGlzdCA9IGFuZ3VsYXIuY29weShkYXRhKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldEZhY2VBY2NvbXBEYXRhQnlQYWdlKHBhcmFtczogUGFnZVBhcmFtcyk6IFBhZ2VQYXJhbXMge1xyXG4gICAgICAgIGxldCBwYWdlUGFyYW1zID0gbmV3IFBhZ2VQYXJhbXMoKTtcclxuICAgICAgICBwYWdlUGFyYW1zLnBhZ2VTaXplID0gcGFyYW1zLnBhZ2VTaXplIHx8IDEwO1xyXG4gICAgICAgIHBhZ2VQYXJhbXMuY3VycmVudFBhZ2UgPSBwYXJhbXMuY3VycmVudFBhZ2UgfHwgMTtcclxuICAgICAgICBsZXQgZmFjZUFjY29tcERhdGEgPSBhbmd1bGFyLmNvcHkodGhpcy5mYWNlQWNjb21wRGF0YUxpc3QpIGFzIEFjY29tcGFueWluZ0FuYWx5c2lzUmVzdWx0O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGZhY2VBY2NvbXBEYXRhKVxyXG4gICAgICAgIHBhZ2VQYXJhbXMudG90YWxDb3VudCA9IGZhY2VBY2NvbXBEYXRhLnJlc3VsdC5sZW5ndGg7XHJcbiAgICAgICAgaWYgKHBhZ2VQYXJhbXMudG90YWxDb3VudCAlIHBhZ2VQYXJhbXMucGFnZVNpemUgPT09IDApIHtcclxuICAgICAgICAgICAgcGFnZVBhcmFtcy5wYWdlQ291bnQgPSBNYXRoLnJvdW5kKHBhZ2VQYXJhbXMudG90YWxDb3VudCAvIHBhZ2VQYXJhbXMucGFnZVNpemUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBhZ2VQYXJhbXMucGFnZUNvdW50ID0gTWF0aC5jZWlsKHBhZ2VQYXJhbXMudG90YWxDb3VudCAvIHBhZ2VQYXJhbXMucGFnZVNpemUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFnZVBhcmFtcy5jdXJyZW50UGFnZSA+IHBhZ2VQYXJhbXMucGFnZUNvdW50KSB7XHJcbiAgICAgICAgICAgIHBhZ2VQYXJhbXMuY3VycmVudFBhZ2UgPSBwYWdlUGFyYW1zLnBhZ2VDb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhZ2VQYXJhbXMucGFnZVNpemUgPiBwYWdlUGFyYW1zLnRvdGFsQ291bnQpIHtcclxuICAgICAgICAgICAgcGFnZVBhcmFtcy5wYWdlU2l6ZSA9IHBhZ2VQYXJhbXMudG90YWxDb3VudFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc3RhcnQgPSAocGFnZVBhcmFtcy5jdXJyZW50UGFnZSAtIDEpICogcGFnZVBhcmFtcy5wYWdlU2l6ZTtcclxuICAgICAgICBsZXQgZW5kID0gcGFnZVBhcmFtcy5jdXJyZW50UGFnZSAqIHBhZ2VQYXJhbXMucGFnZVNpemU7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhY2VBY2NvbXBEYXRhLnJlc3VsdC5zbGljZShzdGFydCwgZW5kKTtcclxuXHJcbiAgICAgICAgZmFjZUFjY29tcERhdGEucmVzdWx0ID0gYW5ndWxhci5jb3B5KHJlc3VsdCk7XHJcbiAgICAgICAgcGFnZVBhcmFtcy5kYXRhID0gZmFjZUFjY29tcERhdGE7XHJcbiAgICAgICAgcmV0dXJuIHBhZ2VQYXJhbXM7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsRmFjZUFjY29tcFJlc3VsdChpZDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PFJlc3VsdD47XHJcbiAgICAgICAgbGV0IGxpc3QgPSB0aGlzLmZhY2VBY2NvbXBEYXRhTGlzdC5yZXN1bHQ7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpZCA9PT0gbGlzdFtpXS5BY2Nlc3NMb2cuQ2FtZXJhSUQpIHtcclxuICAgICAgICAgICAgICAgIGFyciA9IHRoaXMuZmFjZUFjY29tcERhdGFMaXN0LnJlc3VsdC5zcGxpY2UoaSwgMSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyLmxlbmd0aCA+IDBcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmFwcC5zZXJ2aWNlKCdtYWNDYXJDcmFzaFNlcnZpY2UnLCBNYWNDYXJDcmFzaFNlcnZpY2UpO1xyXG4iXX0=
