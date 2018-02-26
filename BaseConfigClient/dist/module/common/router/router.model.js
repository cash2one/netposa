define(["require", "exports", "./map/router.map", "jquery"], function (require, exports, router_map_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RouterModel = (function () {
        function RouterModel() {
            this.routerConfig = null;
            this.initRouterConfig = function (list) {
                if (!$.isArray(list)) {
                    console.error("_transform Error: 传入参数不是数组!");
                    return;
                }
                this.routerConfig = [];
                var author, i, len, mapResult = {};
                var originConfig = router_map_1.DefaultRouteConfig;
                for (i = 0, len = list.length; i < len; i++) {
                    author = list[i];
                    if (author && author.code) {
                        mapResult[author.code] = author;
                    }
                    else {
                        if (author) {
                            console.error(author.name + "模块没有访问权限!");
                        }
                        else {
                            console.error("未知模块没有访问权限!");
                        }
                    }
                }
                for (i = 0, len = originConfig.length; i < len; i++) {
                    if (mapResult[originConfig[i]['key']]) {
                        this.routerConfig.push(this.convert2RouterConfig(originConfig[i], mapResult[originConfig[i]['key']]));
                    }
                    else {
                        if (originConfig[i]['isLocal']) {
                            this.routerConfig.push(this.convert2RouterConfig(originConfig[i], originConfig[i].key));
                        }
                    }
                }
            };
            this.convert2RouterConfig = function (origin, news) {
                if (news) {
                    origin['moduleName'] = news['name'] || origin['moduleName'];
                }
                return origin;
            };
            this.getRouterConfig = function () {
                return angular.copy(this.routerConfig);
            };
            this.init = function (list) {
                this.initRouterConfig(list);
            };
        }
        RouterModel.getInstance = function () {
            return this._instance = this._instance || new RouterModel();
        };
        return RouterModel;
    }());
    exports.default = RouterModel;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3JvdXRlci9yb3V0ZXIubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBZUE7UUFFSTtZQVNRLGlCQUFZLEdBQXlCLElBQUksQ0FBQztZQUUxQyxxQkFBZ0IsR0FBRyxVQUFVLElBQThCO2dCQUMvRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNuQixPQUFPLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7b0JBQzdDLE1BQU0sQ0FBQztnQkFDWCxDQUFDO2dCQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBMEIsQ0FBQztnQkFFL0MsSUFBSSxNQUF5QixFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsU0FBUyxHQUFzQyxFQUFFLENBQXNDO2dCQUM5SCxJQUFJLFlBQVksR0FBeUIsK0JBQWtCLENBQUM7Z0JBQzVELEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUMxQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqQixFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ3hCLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDO29CQUVwQyxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLEVBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUM7NEJBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxDQUFDO3dCQUM3QyxDQUFDO3dCQUFBLElBQUksQ0FBQSxDQUFDOzRCQUNGLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7d0JBQ2pDLENBQUM7b0JBQ0wsQ0FBQztnQkFDTCxDQUFDO2dCQUVELEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUNsRCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUVwQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFHLENBQUM7b0JBQUEsSUFBSSxDQUFBLENBQUM7d0JBQ0YsRUFBRSxDQUFBLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUEsQ0FBQzs0QkFDM0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDNUYsQ0FBQztvQkFDTCxDQUFDO2dCQUVMLENBQUM7WUFDTCxDQUFDLENBQUM7WUFFTSx5QkFBb0IsR0FBRyxVQUFVLE1BQXlDLEVBQUUsSUFBdUI7Z0JBRXZHLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7b0JBQ0wsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2hFLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNsQixDQUFDLENBQUM7WUFFRixvQkFBZSxHQUFHO2dCQUVkLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzQyxDQUFDLENBQUM7WUFFRixTQUFJLEdBQUcsVUFBVSxJQUE2QjtnQkFDMUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLENBQUMsQ0FBQztRQTdERixDQUFDO1FBSWEsdUJBQVcsR0FBekI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7UUFDaEUsQ0FBQztRQTBETCxrQkFBQztJQUFELENBbkVBLEFBbUVDLElBQUEiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9yb3V0ZXIvcm91dGVyLm1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJUm91dGVyQ29uZmlnLCBJUm91dGVyQ29uZmlnVHJlZSwgSUJhY2tSb3V0ZXJDb25maWd9IGZyb20gXCIuL3JvdXRlclwiO1xyXG4vKipcclxuICogQ3JlYXRlZCBieSBkZWxsIG9uIDIwMTcvMy8yMy5cclxuICovXHJcbmRlY2xhcmUgbGV0ICQ6YW55O1xyXG5kZWNsYXJlIGxldCBhbmd1bGFyOmFueTtcclxuaW1wb3J0IHtEZWZhdWx0Um91dGVDb25maWd9IGZyb20gXCIuL21hcC9yb3V0ZXIubWFwXCI7XHJcbmltcG9ydCAnanF1ZXJ5JztcclxuaW1wb3J0IFBvcnRyYWl0VG9vbCBmcm9tIFwiLi4vcG9ydHJhaXQtdG9vbFwiO1xyXG5cclxuLy8g5a2Y5pS+5omA5pyJ5LiO6Lev55Sx55u45YWz55qE6YWN572u5L+h5oGvXHJcbi8vIOWIneWni+WMluWPquiwg+eUqOS4gOasoSwg5LiO5ZCO5Y+w5Lyg5p2l55qE5pWw5o2u6L+b6KGM6J6N5ZCIXHJcbi8vIOazqOaEj++8miByZWRpcmVjdFRv5bGe5oCn5Y+q5piv5pqC5pe255qELCDlrp7pmYXlgLzkvJrlnKjku6PnoIHpgLvovpHkuK3ov5vooYzliqjmgIHosIPmlbRcXFxyXG4vLyBwYXJlbnQo5om+54i26IqC54K5KS9pc1BhcmVudCjmmK/lkKbmmK/niLbnu5PngrkpL2luZGV4KOaOkuW6jykvbGV2ZWwo562J57qnKeWxnuaAp+aYr+eUqOS6juS4muWKoeS4iuiAjOiuvue9rueahFxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGVyTW9kZWwge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogUm91dGVyTW9kZWw7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBSb3V0ZXJNb2RlbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlID0gdGhpcy5faW5zdGFuY2UgfHwgbmV3IFJvdXRlck1vZGVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByb3V0ZXJDb25maWc6IEFycmF5PElSb3V0ZXJDb25maWc+ID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIGluaXRSb3V0ZXJDb25maWcgPSBmdW5jdGlvbiAobGlzdDogQXJyYXk8SUJhY2tSb3V0ZXJDb25maWc+KSB7XHJcbiAgICAgICAgaWYgKCEkLmlzQXJyYXkobGlzdCkpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIl90cmFuc2Zvcm0gRXJyb3I6IOS8oOWFpeWPguaVsOS4jeaYr+aVsOe7hCFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yb3V0ZXJDb25maWcgPSBbXSBhcyBBcnJheTxJUm91dGVyQ29uZmlnPjtcclxuXHJcbiAgICAgICAgbGV0IGF1dGhvcjogSUJhY2tSb3V0ZXJDb25maWcsIGksIGxlbiwgbWFwUmVzdWx0Ontba2V5OiBzdHJpbmddOiBJQmFja1JvdXRlckNvbmZpZ30gPSB7fS8qLCBhdXRob3JTdGF0ZU1hcCA9IHN0YXRlUm91dGVyTWFwKi87XHJcbiAgICAgICAgbGV0IG9yaWdpbkNvbmZpZzogQXJyYXk8SVJvdXRlckNvbmZpZz4gPSBEZWZhdWx0Um91dGVDb25maWc7XHJcbiAgICAgICAgZm9yIChpID0gMCwgbGVuID0gbGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBhdXRob3IgPSBsaXN0W2ldO1xyXG4gICAgICAgICAgICBpZiAoYXV0aG9yICYmIGF1dGhvci5jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBtYXBSZXN1bHRbYXV0aG9yLmNvZGVdID0gYXV0aG9yO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmKGF1dGhvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihhdXRob3IubmFtZSArIFwi5qih5Z2X5rKh5pyJ6K6/6Zeu5p2D6ZmQIVwiKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLmnKrnn6XmqKHlnZfmsqHmnInorr/pl67mnYPpmZAhXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWvuei3r+eUsei/m+ihjOWIneWni+WMllxyXG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IG9yaWdpbkNvbmZpZy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobWFwUmVzdWx0W29yaWdpbkNvbmZpZ1tpXVsna2V5J11dKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDlj6rkv53lrZjmnInorr/pl67mnYPpmZDnmoTmqKHlnZdcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyQ29uZmlnLnB1c2godGhpcy5jb252ZXJ0MlJvdXRlckNvbmZpZyhvcmlnaW5Db25maWdbaV0sIG1hcFJlc3VsdFtvcmlnaW5Db25maWdbaV1bJ2tleSddXSkpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKG9yaWdpbkNvbmZpZ1tpXVsnaXNMb2NhbCddKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckNvbmZpZy5wdXNoKHRoaXMuY29udmVydDJSb3V0ZXJDb25maWcob3JpZ2luQ29uZmlnW2ldLCBvcmlnaW5Db25maWdbaV0ua2V5KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGNvbnZlcnQyUm91dGVyQ29uZmlnID0gZnVuY3Rpb24gKG9yaWdpbjp7W2tleTpzdHJpbmddOmFueSAmIElSb3V0ZXJDb25maWd9LCBuZXdzOiBJQmFja1JvdXRlckNvbmZpZykge1xyXG4gICAgICAgIC8vIOWwhm5ld3PnmoTkuJzopb/ono3lkIjliLDlt6bovrlcclxuICAgICAgICBpZihuZXdzKXtcclxuICAgICAgICAgICAgb3JpZ2luWydtb2R1bGVOYW1lJ10gPSBuZXdzWyduYW1lJ10gfHwgb3JpZ2luWydtb2R1bGVOYW1lJ107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvcmlnaW47XHJcbiAgICB9O1xyXG5cclxuICAgIGdldFJvdXRlckNvbmZpZyA9IGZ1bmN0aW9uICgpe1xyXG4gICAgICAgIC8vIOeUseS6jumFjee9ruS8muiiq+W+iOWkmuaooeWdl+eUqOWIsO+8jOS4uuS6humYsuatouWboOW8leeUqOW8lei1t+eahOaVsOaNruiiq+S/ruaUue+8jOaVheavj+asoeWPluW+l+eahOaXtuWAmemDvei/m+ihjOa3seaLt+i0nVxyXG4gICAgICAgIHJldHVybiBhbmd1bGFyLmNvcHkodGhpcy5yb3V0ZXJDb25maWcpO1xyXG4gICAgfTtcclxuXHJcbiAgICBpbml0ID0gZnVuY3Rpb24gKGxpc3Q6QXJyYXk8SUJhY2tSb3V0ZXJDb25maWc+KSB7XHJcbiAgICAgICAgdGhpcy5pbml0Um91dGVyQ29uZmlnKGxpc3QpO1xyXG4gICAgfTtcclxuXHJcblxyXG59Il19
