define(["require", "exports", "../app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MapEventFactory = (function () {
        function MapEventFactory() {
        }
        MapEventFactory.prototype.instance = function () {
            var _self = this;
            return function ($rootScope, $compile) {
                _self.$scope = $rootScope;
                _self.$compile = $compile;
                return {
                    init: function (map) {
                        if (!_self.map) {
                            _self.map = map;
                        }
                    },
                    createPopup: function (point, scope, tpl) {
                        var size = _self.compileDomSize(tpl);
                        var winInfo = _self.map.createInfoWindow(point.lon, point.lat, {
                            iscommon: true,
                            offset: new NPMapLib.Geometry.Size(-1 * (size.width / 2), -1 * (size.height + 10))
                        });
                        var dom = $(tpl).get(0);
                        dom = _self.$compile(dom)(scope);
                        _self.map.openInfoWindow(winInfo, dom[0], {
                            close: function () {
                                scope.$destroy();
                                _self.map.closeInfoWindow(winInfo);
                            }
                        });
                        return winInfo;
                    },
                    destroy: function () {
                        _self.map = null;
                    }
                };
            };
        };
        MapEventFactory.prototype.compileDomSize = function (ele) {
            var domEle = $(ele);
            $('body').append(domEle);
            var size = {
                width: domEle.outerWidth(),
                height: domEle.outerHeight()
            };
            domEle.remove();
            return size;
        };
        return MapEventFactory;
    }());
    exports.MapEventFactory = MapEventFactory;
    main_app_1.app.factory('mapEventFactory', new MapEventFactory().instance());
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2ZhY3RvcnkvbWFwLmV2ZW50LmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBa0JBO1FBSUk7UUFBZ0IsQ0FBQztRQUNqQixrQ0FBUSxHQUFSO1lBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBdUIsQ0FBQztZQUNwQyxNQUFNLENBQUMsVUFBUyxVQUFlLEVBQUUsUUFBYTtnQkFDMUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7Z0JBQzFCLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dCQUMxQixNQUFNLENBQUM7b0JBQ0gsSUFBSSxZQUFDLEdBQWlCO3dCQUNsQixFQUFFLENBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDOzRCQUNYLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO3dCQUNwQixDQUFDO29CQUNMLENBQUM7b0JBQ0QsV0FBVyxZQUFDLEtBQThCLEVBQUUsS0FBVSxFQUFFLEdBQVE7d0JBQzVELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3JDLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxFQUFFOzRCQUMzRCxRQUFRLEVBQUUsSUFBSTs0QkFDZCxNQUFNLEVBQUUsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDO3lCQUNyRixDQUFDLENBQUM7d0JBQ0gsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDeEIsR0FBRyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ2pDLEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7NEJBQ3RDLEtBQUssRUFBRTtnQ0FDSCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7Z0NBQ2pCLEtBQUssQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUN2QyxDQUFDO3lCQUNKLENBQUMsQ0FBQzt3QkFDSCxNQUFNLENBQUMsT0FBTyxDQUFDO29CQUNuQixDQUFDO29CQUNELE9BQU87d0JBQ0gsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7b0JBQ3JCLENBQUM7aUJBRWdCLENBQUE7WUFDekIsQ0FBQyxDQUFBO1FBQ0wsQ0FBQztRQUVPLHdDQUFjLEdBQXRCLFVBQXVCLEdBQVE7WUFDM0IsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekIsSUFBSSxJQUFJLEdBQUc7Z0JBQ1AsS0FBSyxFQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUU7Z0JBQzFCLE1BQU0sRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFO2FBQy9CLENBQUE7WUFDRCxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0wsc0JBQUM7SUFBRCxDQWxEQSxBQWtEQyxJQUFBO0lBbERZLDBDQUFlO0lBbUQ1QixjQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLElBQUksZUFBZSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQSIsImZpbGUiOiJtb2R1bGUvY29tbW9uL2ZhY3RvcnkvbWFwLmV2ZW50LmZhY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgYXBwIH0gZnJvbSAnLi4vYXBwL21haW4uYXBwJztcclxuaW1wb3J0IHsgTlBHaXNNYXBNYWluIH0gZnJvbSAnLi4vbWFwL21hcC5tYWluJztcclxuaW1wb3J0IHsgU3lzdGVtUG9pbnQgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9TeXN0ZW1Qb2ludCc7XHJcblxyXG5kZWNsYXJlIGxldCAkOiBhbnk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElNYXBFdmVudEZhY3Rvcnkge1xyXG4gICAgaW5pdChtYXA6IE5QR2lzTWFwTWFpbik6IHZvaWQ7XHJcbiAgICBkZXN0cm95KCk6IHZvaWQ7XHJcbiAgICBjcmVhdGVQb3B1cChwb2ludDogTlBNYXBMaWIuR2VvbWV0cnkuUG9pbnQsIHNjb3BlOiBhbnksIHRwbDogYW55KTogc3RyaW5nO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIEBjb25zdHJ1Y3RvciBcclxuICogQHBhcmFtIG1hcDxOUEdpc01hcE1haW4+XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWFwRXZlbnRGYWN0b3J5IHtcclxuICAgIG1hcDogTlBHaXNNYXBNYWluO1xyXG4gICAgJHNjb3BlOiBhbnk7XHJcbiAgICAkY29tcGlsZTogYW55O1xyXG4gICAgY29uc3RydWN0b3IoKSB7IH1cclxuICAgIGluc3RhbmNlKCkge1xyXG4gICAgICAgIGxldCBfc2VsZiA9IHRoaXMgYXMgTWFwRXZlbnRGYWN0b3J5O1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbigkcm9vdFNjb3BlOiBhbnksICRjb21waWxlOiBhbnkpICB7XHJcbiAgICAgICAgICAgIF9zZWxmLiRzY29wZSA9ICRyb290U2NvcGU7XHJcbiAgICAgICAgICAgIF9zZWxmLiRjb21waWxlID0gJGNvbXBpbGU7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBpbml0KG1hcDogTlBHaXNNYXBNYWluKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIV9zZWxmLm1hcCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxmLm1hcCA9IG1hcDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlUG9wdXAocG9pbnQ6IE5QTWFwTGliLkdlb21ldHJ5LlBvaW50LCBzY29wZTogYW55LCB0cGw6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzaXplID0gX3NlbGYuY29tcGlsZURvbVNpemUodHBsKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd2luSW5mbyA9IF9zZWxmLm1hcC5jcmVhdGVJbmZvV2luZG93KHBvaW50LmxvbiwgcG9pbnQubGF0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzY29tbW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IG5ldyBOUE1hcExpYi5HZW9tZXRyeS5TaXplKC0xICogKHNpemUud2lkdGggLyAyKSwgLTEgKiAoc2l6ZS5oZWlnaHQgKyAxMCkpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRvbSA9ICQodHBsKS5nZXQoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9tID0gX3NlbGYuJGNvbXBpbGUoZG9tKShzY29wZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3NlbGYubWFwLm9wZW5JbmZvV2luZG93KHdpbkluZm8sIGRvbVswXSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxmLm1hcC5jbG9zZUluZm9XaW5kb3cod2luSW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luSW5mbztcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkZXN0cm95KCl7XHJcbiAgICAgICAgICAgICAgICAgICAgX3NlbGYubWFwID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gYXMgSU1hcEV2ZW50RmFjdG9yeVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbXBpbGVEb21TaXplKGVsZTogYW55KTogeyB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9IHtcclxuICAgICAgICBsZXQgZG9tRWxlID0gJChlbGUpO1xyXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoZG9tRWxlKTtcclxuICAgICAgICBsZXQgc2l6ZSA9IHtcclxuICAgICAgICAgICAgd2lkdGg6IGRvbUVsZS5vdXRlcldpZHRoKCksXHJcbiAgICAgICAgICAgIGhlaWdodDogZG9tRWxlLm91dGVySGVpZ2h0KClcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9tRWxlLnJlbW92ZSgpO1xyXG4gICAgICAgIHJldHVybiBzaXplO1xyXG4gICAgfVxyXG59XHJcbmFwcC5mYWN0b3J5KCdtYXBFdmVudEZhY3RvcnknLCBuZXcgTWFwRXZlbnRGYWN0b3J5KCkuaW5zdGFuY2UoKSkiXX0=
