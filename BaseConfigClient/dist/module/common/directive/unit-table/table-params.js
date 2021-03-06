define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TableHeader = (function () {
        function TableHeader(field, title) {
            this.field = field || "";
            this.title = title || " ";
            this.isShow = true;
            this.isSort = false;
            this.isAsc = -1;
        }
        return TableHeader;
    }());
    exports.TableHeader = TableHeader;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS91bml0LXRhYmxlL3RhYmxlLXBhcmFtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFxQkE7UUFZSSxxQkFBWSxLQUFhLEVBQUMsS0FBYTtZQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLElBQUksR0FBRyxDQUFDO1lBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDcEIsQ0FBQztRQUVMLGtCQUFDO0lBQUQsQ0FwQkEsQUFvQkMsSUFBQTtJQXBCWSxrQ0FBVyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS91bml0LXRhYmxlL3RhYmxlLXBhcmFtcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiAgdGFibGUg5oyH5Luk55u45YWz55qEIOWPguaVsFxyXG4gKiBAdGltZTogMjAxNy0wNS0wNCAxMTo0NzoyNFxyXG4gKiBAcGFyYW1zOlxyXG4gKiBAcmV0dXJuOlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJVGFibGVIZWFkZXJ7XHJcbiAgICAvL+WvueW6lOWtl+auteWQjSDvvIjmjpLluo/lm57osIPlj4LmlbDvvIlcclxuICAgIGZpZWxkIDogc3RyaW5nO1xyXG4gICAgLy/ooajlpLTmmL7npLrlkI3np7BcclxuICAgIHRpdGxlOnN0cmluZztcclxuICAgIC8v5a+55bqU5YiX5piv5ZCm5pi+56S6XHJcbiAgICBpc1Nob3cgPzogYm9vbGVhbjtcclxuICAgIC8v5piv5ZCm5Y+v5o6S5bqPXHJcbiAgICBpc1NvcnQ/OiBib29sZWFuO1xyXG4gICAgLy8g5b2T5YmN5piv5ZCm5q2j5bqPIC0xIOihqCDkuI3lj4LkuI7mjpLluo9cclxuICAgIGlzQXNjPzpib29sZWFuIHwgbnVtYmVyO1xyXG5cclxuICAgIHRkQ3VzdG9tQ2xhc3M/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZUhlYWRlciBpbXBsZW1lbnRzIElUYWJsZUhlYWRlciB7XHJcbiAgICAvL+WvueW6lOWtl+auteWQjSDvvIjmjpLluo/lm57osIPlj4LmlbDvvIlcclxuICAgIGZpZWxkIDogc3RyaW5nO1xyXG4gICAgLy/ooajlpLTmmL7npLrlkI3np7BcclxuICAgIHRpdGxlOnN0cmluZztcclxuICAgIC8v5a+55bqU5YiX5piv5ZCm5pi+56S6XHJcbiAgICBpc1Nob3cgPzogYm9vbGVhbjtcclxuICAgIC8v5piv5ZCm5Y+v5o6S5bqPXHJcbiAgICBpc1NvcnQ/OiBib29sZWFuO1xyXG4gICAgLy8g5b2T5YmN5piv5ZCm5q2j5bqPIC0xIOihqCDkuI3lj4LkuI7mjpLluo9cclxuICAgIGlzQXNjPzpib29sZWFuIHwgbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGZpZWxkPzpzdHJpbmcsdGl0bGU/OnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5maWVsZCA9IGZpZWxkIHx8IFwiXCI7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlIHx8IFwiIFwiO1xyXG4gICAgICAgIHRoaXMuaXNTaG93ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzU29ydCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNBc2MgPSAtMTtcclxuICAgIH1cclxuXHJcbn0iXX0=
