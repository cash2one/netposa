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
    var FaceAnalysisService = (function () {
        function FaceAnalysisService() {
            this.faceAnalysisDataList = {};
        }
        FaceAnalysisService.prototype.setFaceAnalysisDataList = function (data) {
            if (data) {
                this.faceAnalysisDataList = angular.copy(data);
            }
        };
        FaceAnalysisService.prototype.getAllDataForLibName = function (libId) {
            var arr = [];
            var faceAnalysisData = angular.copy(this.faceAnalysisDataList);
            if (libId) {
                faceAnalysisData.Result.forEach(function (item) {
                    if (item.PersonInfo.LibId === libId) {
                        arr.push(item);
                    }
                });
            }
            else {
                arr = faceAnalysisData.Result;
            }
            return arr;
        };
        FaceAnalysisService.prototype.getFaceAnalysisDataByPage = function (params, libId) {
            var pageParams = new PageParams();
            pageParams.pageSize = params.pageSize || 10;
            pageParams.currentPage = params.currentPage || 1;
            var faceAnalysisData = angular.copy(this.faceAnalysisDataList);
            if (libId) {
                var arr_1 = [];
                faceAnalysisData.Result.forEach(function (item) {
                    if (item.LibId === libId) {
                        arr_1.push(item);
                    }
                });
                faceAnalysisData.Result = arr_1;
            }
            console.log(faceAnalysisData);
            pageParams.totalCount = faceAnalysisData.Result.length;
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
            var result = faceAnalysisData.Result.slice(start, end);
            faceAnalysisData.Result = angular.copy(result);
            pageParams.data = faceAnalysisData;
            pageParams.allResult = this.getAllDataForLibName(libId);
            return pageParams;
        };
        FaceAnalysisService.prototype.delFaceAnalysisResult = function (id) {
            return true;
        };
        return FaceAnalysisService;
    }());
    main_app_1.app.service('faceAnalysisService', FaceAnalysisService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9GYWNlQW5hbHlzaXMvRmFjZS5hbmFseXNpcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUtBO1FBQUE7WUFDSSxlQUFVLEdBQVcsQ0FBQyxDQUFDO1lBQ3ZCLGFBQVEsR0FBVyxDQUFDLENBQUM7WUFDckIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7WUFDeEIsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUkxQixDQUFDO1FBQUQsaUJBQUM7SUFBRCxDQVJBLEFBUUMsSUFBQTtJQVJZLGdDQUFVO0lBaUJ2QjtRQUFBO1lBQ1kseUJBQW9CLEdBQXVCLEVBQXdCLENBQUM7UUFnRWhGLENBQUM7UUE5REcscURBQXVCLEdBQXZCLFVBQXdCLElBQXdCO1lBQzVDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLG9CQUFvQixHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDbEQsQ0FBQztRQUNMLENBQUM7UUFFRCxrREFBb0IsR0FBcEIsVUFBcUIsS0FBYTtZQUM5QixJQUFJLEdBQUcsR0FBRyxFQUE0QixDQUFDO1lBQ3ZDLElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQXVCLENBQUM7WUFDckYsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQztnQkFDTixnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBb0I7b0JBQ2pELEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFBLENBQUM7d0JBQ2hDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7b0JBQ2xCLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1lBQUEsSUFBSSxDQUFBLENBQUM7Z0JB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O1FBRUwsMEJBQUM7SUFBRCxDQWpFQSxBQWlFQyxJQUFBO0lBRUQsY0FBRyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL0ZhY2VBbmFseXNpcy9GYWNlLmFuYWx5c2lzLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHtGYWNlQW5hbHlzaXNSZXN1bHQsUGVyc29uSW5mb01vZGVsfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9GYWNlQW5hbHlzaXNFbnVtJztcclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBQYWdlUGFyYW1zIHtcclxuICAgIHRvdGFsQ291bnQ6IG51bWJlciA9IDE7XHJcbiAgICBwYWdlU2l6ZTogbnVtYmVyID0gNTtcclxuICAgIGN1cnJlbnRQYWdlOiBudW1iZXIgPSAxO1xyXG4gICAgcGFnZUNvdW50OiBudW1iZXIgPSAxO1xyXG4gICAgZGF0YT86IEZhY2VBbmFseXNpc1Jlc3VsdDtcclxuICAgIGFsbFJlc3VsdDpBcnJheTxQZXJzb25JbmZvTW9kZWw+O1xyXG4gICAgY3VycmVudEluZGV4OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUZhY2VBbmFseXNpc1NlcnZpY2Uge1xyXG4gICAgc2V0RmFjZUFuYWx5c2lzRGF0YUxpc3Q6IChkYXRhOiBGYWNlQW5hbHlzaXNSZXN1bHQpID0+IHZvaWRcclxuICAgIGdldEZhY2VBbmFseXNpc0RhdGFCeVBhZ2U6IChwYXJhbXM6IFBhZ2VQYXJhbXMsbGliTmFtZT86c3RyaW5nKSA9PiBQYWdlUGFyYW1zO1xyXG4gICAgZGVsRmFjZUFuYWx5c2lzUmVzdWx0OiAoaWQ6IHN0cmluZykgPT4gYm9vbGVhbjtcclxuICAgIGdldEFsbERhdGFGb3JMaWJOYW1lOiAobGliTmFtZT86IHN0cmluZykgPT4gQXJyYXk8UGVyc29uSW5mb01vZGVsPjtcclxufVxyXG5cclxuY2xhc3MgRmFjZUFuYWx5c2lzU2VydmljZSBpbXBsZW1lbnRzIElGYWNlQW5hbHlzaXNTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgZmFjZUFuYWx5c2lzRGF0YUxpc3Q6IEZhY2VBbmFseXNpc1Jlc3VsdCA9IHt9IGFzIEZhY2VBbmFseXNpc1Jlc3VsdDtcclxuXHJcbiAgICBzZXRGYWNlQW5hbHlzaXNEYXRhTGlzdChkYXRhOiBGYWNlQW5hbHlzaXNSZXN1bHQpIHtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmZhY2VBbmFseXNpc0RhdGFMaXN0ID0gYW5ndWxhci5jb3B5KGRhdGEpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEFsbERhdGFGb3JMaWJOYW1lKGxpYklkPzpzdHJpbmcpOkFycmF5PFBlcnNvbkluZm9Nb2RlbD57XHJcbiAgICAgICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PFBlcnNvbkluZm9Nb2RlbD47XHJcbiAgICAgICAgbGV0IGZhY2VBbmFseXNpc0RhdGEgPSBhbmd1bGFyLmNvcHkodGhpcy5mYWNlQW5hbHlzaXNEYXRhTGlzdCkgYXMgRmFjZUFuYWx5c2lzUmVzdWx0O1xyXG4gICAgICAgIGlmKGxpYklkKXtcclxuICAgICAgICAgICAgZmFjZUFuYWx5c2lzRGF0YS5SZXN1bHQuZm9yRWFjaCgoaXRlbTpQZXJzb25JbmZvTW9kZWwpPT57XHJcbiAgICAgICAgICAgICAgICBpZihpdGVtLlBlcnNvbkluZm8uTGliSWQgPT09IGxpYklkKXtcclxuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChpdGVtKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgYXJyID0gZmFjZUFuYWx5c2lzRGF0YS5SZXN1bHRcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRGYWNlQW5hbHlzaXNEYXRhQnlQYWdlKHBhcmFtczogUGFnZVBhcmFtcyxsaWJJZD86c3RyaW5nKTogUGFnZVBhcmFtcyB7XHJcbiAgICAgICAgbGV0IHBhZ2VQYXJhbXMgPSBuZXcgUGFnZVBhcmFtcygpO1xyXG4gICAgICAgIHBhZ2VQYXJhbXMucGFnZVNpemUgPSBwYXJhbXMucGFnZVNpemUgfHwgMTA7XHJcbiAgICAgICAgcGFnZVBhcmFtcy5jdXJyZW50UGFnZSA9IHBhcmFtcy5jdXJyZW50UGFnZSB8fCAxO1xyXG4gICAgICAgIGxldCBmYWNlQW5hbHlzaXNEYXRhID0gYW5ndWxhci5jb3B5KHRoaXMuZmFjZUFuYWx5c2lzRGF0YUxpc3QpIGFzIEZhY2VBbmFseXNpc1Jlc3VsdDtcclxuICAgICAgICBpZihsaWJJZCl7XHJcbiAgICAgICAgICAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8UGVyc29uSW5mb01vZGVsPjtcclxuICAgICAgICAgICAgZmFjZUFuYWx5c2lzRGF0YS5SZXN1bHQuZm9yRWFjaCgoaXRlbTpQZXJzb25JbmZvTW9kZWwpPT57XHJcbiAgICAgICAgICAgICAgICBpZihpdGVtLkxpYklkID09PSBsaWJJZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goaXRlbSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGZhY2VBbmFseXNpc0RhdGEuUmVzdWx0ID0gYXJyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhmYWNlQW5hbHlzaXNEYXRhKTtcclxuICAgICAgICBwYWdlUGFyYW1zLnRvdGFsQ291bnQgPSBmYWNlQW5hbHlzaXNEYXRhLlJlc3VsdC5sZW5ndGg7XHJcbiAgICAgICAgaWYgKHBhZ2VQYXJhbXMudG90YWxDb3VudCAlIHBhZ2VQYXJhbXMucGFnZVNpemUgPT09IDApIHtcclxuICAgICAgICAgICAgcGFnZVBhcmFtcy5wYWdlQ291bnQgPSBNYXRoLnJvdW5kKHBhZ2VQYXJhbXMudG90YWxDb3VudCAvIHBhZ2VQYXJhbXMucGFnZVNpemUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBhZ2VQYXJhbXMucGFnZUNvdW50ID0gTWF0aC5jZWlsKHBhZ2VQYXJhbXMudG90YWxDb3VudCAvIHBhZ2VQYXJhbXMucGFnZVNpemUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFnZVBhcmFtcy5jdXJyZW50UGFnZSA+IHBhZ2VQYXJhbXMucGFnZUNvdW50KSB7XHJcbiAgICAgICAgICAgIHBhZ2VQYXJhbXMuY3VycmVudFBhZ2UgPSBwYWdlUGFyYW1zLnBhZ2VDb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhZ2VQYXJhbXMucGFnZVNpemUgPiBwYWdlUGFyYW1zLnRvdGFsQ291bnQpIHtcclxuICAgICAgICAgICAgcGFnZVBhcmFtcy5wYWdlU2l6ZSA9IHBhZ2VQYXJhbXMudG90YWxDb3VudFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc3RhcnQgPSAocGFnZVBhcmFtcy5jdXJyZW50UGFnZSAtIDEpICogcGFnZVBhcmFtcy5wYWdlU2l6ZTtcclxuICAgICAgICBsZXQgZW5kID0gcGFnZVBhcmFtcy5jdXJyZW50UGFnZSAqIHBhZ2VQYXJhbXMucGFnZVNpemU7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhY2VBbmFseXNpc0RhdGEuUmVzdWx0LnNsaWNlKHN0YXJ0LCBlbmQpO1xyXG5cclxuICAgICAgICBmYWNlQW5hbHlzaXNEYXRhLlJlc3VsdCA9IGFuZ3VsYXIuY29weShyZXN1bHQpO1xyXG4gICAgICAgIHBhZ2VQYXJhbXMuZGF0YSA9IGZhY2VBbmFseXNpc0RhdGE7XHJcbiAgICAgICAgcGFnZVBhcmFtcy5hbGxSZXN1bHQgPSB0aGlzLmdldEFsbERhdGFGb3JMaWJOYW1lKGxpYklkKTtcclxuICAgICAgICByZXR1cm4gcGFnZVBhcmFtcztcclxuICAgIH1cclxuXHJcbiAgICBkZWxGYWNlQW5hbHlzaXNSZXN1bHQoaWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5hcHAuc2VydmljZSgnZmFjZUFuYWx5c2lzU2VydmljZScsIEZhY2VBbmFseXNpc1NlcnZpY2UpOyJdfQ==
