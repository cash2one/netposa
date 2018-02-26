define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PageParams = (function () {
        function PageParams(currentPage, pageSize) {
            this.currentPage = 1;
            this.pageSize = 10;
            this.totalCount = 0;
            this.pageCount = 1;
            if (currentPage) {
                this.currentPage = currentPage;
            }
            if (pageSize) {
                this.pageSize = pageSize;
            }
        }
        PageParams.prototype.setTotalCount = function (totalCount) {
            if (!totalCount) {
                this.totalCount = 0;
                this.pageCount = 1;
                this.currentPage = 1;
            }
            else {
                this.totalCount = totalCount;
                if (totalCount % this.pageSize == 0) {
                    this.pageCount = parseInt(this.totalCount / this.pageSize + "", 10);
                }
                else {
                    this.pageCount = parseInt(this.totalCount / this.pageSize + "", 10) + 1;
                }
            }
        };
        PageParams.prototype.setCurrentPage = function (currentPage) {
            if (currentPage) {
                this.currentPage = currentPage;
            }
            else {
                this.currentPage = 1;
            }
        };
        PageParams.prototype.setPageSize = function (pageSize) {
            if (pageSize) {
                this.pageSize = pageSize;
            }
            else {
                this.pageSize = 10;
            }
        };
        return PageParams;
    }());
    exports.default = PageParams;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS9wYWdlL3BhZ2UtcGFyYW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBO1FBS0ksb0JBQVksV0FBbUIsRUFBQyxRQUFnQjtZQUpoRCxnQkFBVyxHQUFXLENBQUMsQ0FBQztZQUN4QixhQUFRLEdBQVcsRUFBRSxDQUFDO1lBQ3RCLGVBQVUsR0FBVyxDQUFDLENBQUM7WUFDdkIsY0FBUyxHQUFXLENBQUMsQ0FBQztZQUVsQixFQUFFLENBQUEsQ0FBQyxXQUFXLENBQUMsQ0FBQSxDQUFDO2dCQUNaLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQ25DLENBQUM7WUFFRCxFQUFFLENBQUEsQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFDO2dCQUNULElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQzdCLENBQUM7UUFDTCxDQUFDO1FBRUQsa0NBQWEsR0FBYixVQUFjLFVBQWtCO1lBQzVCLEVBQUUsQ0FBQSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUEsQ0FBQztnQkFDWixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLENBQUM7WUFBQSxJQUFJLENBQUEsQ0FBQztnQkFDRixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztnQkFDN0IsRUFBRSxDQUFBLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQztvQkFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtnQkFDdkUsQ0FBQztnQkFBQSxJQUFJLENBQUEsQ0FBQztvQkFDRixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUUsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBRUQsbUNBQWMsR0FBZCxVQUFlLFdBQW1CO1lBQzlCLEVBQUUsQ0FBQSxDQUFDLFdBQVcsQ0FBQyxDQUFBLENBQUM7Z0JBQ1osSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7WUFDbkMsQ0FBQztZQUFBLElBQUksQ0FBQSxDQUFDO2dCQUNGLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLENBQUM7UUFDTCxDQUFDO1FBRUQsZ0NBQVcsR0FBWCxVQUFZLFFBQWdCO1lBQ3hCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDN0IsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLENBQUM7UUFDTCxDQUFDO1FBQ0wsaUJBQUM7SUFBRCxDQTdDQSxBQTZDQyxJQUFBIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vZGlyZWN0aXZlL3BhZ2UvcGFnZS1wYXJhbXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBkZWxsIG9uIDIwMTcvNC8xMS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2VQYXJhbXMge1xyXG4gICAgY3VycmVudFBhZ2U6IG51bWJlciA9IDE7IC8vIOmhteeggeaVsFxyXG4gICAgcGFnZVNpemU6IG51bWJlciA9IDEwOyAvLyDljZXpobXmmL7npLrnmoTooYzmlbBcclxuICAgIHRvdGFsQ291bnQ6IG51bWJlciA9IDA7IC8vIOaAu+aVsOaNruadoeaVsCjpnIDopoHpmaTku6VwYWdlU2l6Zei9rOaNouS4uumhteaVsClcclxuICAgIHBhZ2VDb3VudDogbnVtYmVyID0gMTsgLy8g5oC76aG15pWwXHJcbiAgICBjb25zdHJ1Y3RvcihjdXJyZW50UGFnZT86bnVtYmVyLHBhZ2VTaXplPzpudW1iZXIpIHtcclxuICAgICAgICBpZihjdXJyZW50UGFnZSl7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBjdXJyZW50UGFnZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHBhZ2VTaXplKXtcclxuICAgICAgICAgICAgdGhpcy5wYWdlU2l6ZSA9IHBhZ2VTaXplO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRUb3RhbENvdW50KHRvdGFsQ291bnQ6IG51bWJlcil7XHJcbiAgICAgICAgaWYoIXRvdGFsQ291bnQpe1xyXG4gICAgICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VDb3VudCA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSB0b3RhbENvdW50O1xyXG4gICAgICAgICAgICBpZih0b3RhbENvdW50ICUgdGhpcy5wYWdlU2l6ZSA9PSAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZUNvdW50ID0gcGFyc2VJbnQodGhpcy50b3RhbENvdW50IC8gdGhpcy5wYWdlU2l6ZSArIFwiXCIsIDEwKVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZUNvdW50ID0gcGFyc2VJbnQodGhpcy50b3RhbENvdW50IC8gdGhpcy5wYWdlU2l6ZSArIFwiXCIsIDEwKSArIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q3VycmVudFBhZ2UoY3VycmVudFBhZ2U6IG51bWJlcil7XHJcbiAgICAgICAgaWYoY3VycmVudFBhZ2Upe1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gY3VycmVudFBhZ2U7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRQYWdlU2l6ZShwYWdlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHBhZ2VTaXplKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVNpemUgPSBwYWdlU2l6ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VTaXplID0gMTA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
