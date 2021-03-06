define(["require", "exports", "angular"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function layerFactory($rootScope, $compile, $timeout, $q, $http) {
        var layer = window.layer;
        var _open = layer.open;
        var _close = layer.close;
        var _full = layer.full;
        var _tips = layer.tips;
        var _msg = layer.msg;
        layer.open = function (deliver) {
            var defer = $q.defer();
            if (deliver.contentUrl) {
                $http({
                    url: deliver.contentUrl,
                    cache: true
                }).then(function (rst) {
                    defer.resolve(deliver.data = rst.data);
                });
            }
            else {
                defer.resolve(null);
            }
            return defer.promise.then(function (content) {
                deliver.content = content || deliver.content || '';
                var oldOpen = _open(deliver);
                var $el = $('#layui-layer' + oldOpen);
                var $content = $el.find('.layui-layer-content');
                var injectScope = deliver.scope || $rootScope.$new();
                $content.replaceWith($compile($content[0].outerHTML)(injectScope));
                $timeout(function () {
                    $(window).resize();
                });
                return oldOpen;
            });
        };
        layer.close = function (index) {
            $q.when(index).then(function (index) {
                _close(index);
            });
        };
        layer.full = function (index) {
            $q.when(index).then(function (index) {
                _full(index);
            });
        };
        layer.msg = function (content, opts) {
            $q.when([content, opts]).then(function (arr) {
                var _content = arr[0];
                var _opts = arr[1];
                _msg(_content, _opts);
            });
        };
        return layer;
    }
    angular
        .module('ng-layer', [])
        .factory('layer', layerFactory);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2ZhY3RvcnkvbmdsYXllci5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBLHNCQUFzQixVQUFjLEVBQUUsUUFBWSxFQUFFLFFBQVksRUFBRSxFQUFNLEVBQUUsS0FBUztRQUMvRSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQUksS0FBSyxHQUFJLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDeEIsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUN6QixJQUFJLEtBQUssR0FBSSxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFFdkIsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUN0QixLQUFLLENBQUMsSUFBSSxHQUFHLFVBQVUsT0FBVztZQUM5QixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFdkIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLEtBQUssQ0FBQztvQkFDRixHQUFHLEVBQUksT0FBTyxDQUFDLFVBQVU7b0JBQ3pCLEtBQUssRUFBRSxJQUFJO2lCQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFPO29CQUNyQixLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQyxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLENBQUM7WUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxPQUFjO2dCQUM5QyxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztnQkFFbkQsSUFBSSxPQUFPLEdBQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLEdBQUcsR0FBVyxDQUFDLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLFFBQVEsR0FBTSxHQUFHLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBQ25ELElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNyRCxRQUFRLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFFbkUsUUFBUSxDQUFDO29CQUNMLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDdkIsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQztRQUNGLEtBQUssQ0FBQyxLQUFLLEdBQUcsVUFBVSxLQUFZO1lBQ2hDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBWTtnQkFDdEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDO1FBQ0YsS0FBSyxDQUFDLElBQUksR0FBRyxVQUFVLEtBQVk7WUFDL0IsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFZO2dCQUN0QyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUM7UUFDRixLQUFLLENBQUMsR0FBRyxHQUFHLFVBQVUsT0FBYyxFQUFFLElBQVE7WUFDMUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFTLEdBQWM7Z0JBQ2hELElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDO1FBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQTtJQUNoQixDQUFDO0lBRUQsT0FBTztTQUNGLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDO1NBQ3RCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9mYWN0b3J5L25nbGF5ZXIuZmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnYW5ndWxhcidcclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55LCAkOiBhbnksd2luZG93OmFueTtcclxuXHJcbmZ1bmN0aW9uIGxheWVyRmFjdG9yeSgkcm9vdFNjb3BlOmFueSwgJGNvbXBpbGU6YW55LCAkdGltZW91dDphbnksICRxOmFueSwgJGh0dHA6YW55KXtcclxuICAgIGxldCBsYXllciA9IHdpbmRvdy5sYXllcjtcclxuICAgICBsZXQgX29wZW4gID0gbGF5ZXIub3BlbjtcclxuICAgICBsZXQgX2Nsb3NlID0gbGF5ZXIuY2xvc2U7XHJcbiAgICAgbGV0IF9mdWxsICA9IGxheWVyLmZ1bGw7XHJcbiAgICAgbGV0IF90aXBzID0gbGF5ZXIudGlwcztcclxuICAgICAvLyBjcmVhdG9yOiB3eXIg5aKe5Yqg5a+5bXNn55qE5pSv5oyBXHJcbiAgICAgbGV0IF9tc2cgPSBsYXllci5tc2c7XHJcbiAgICBsYXllci5vcGVuID0gZnVuY3Rpb24gKGRlbGl2ZXI6YW55KSB7XHJcbiAgICAgICAgbGV0IGRlZmVyID0gJHEuZGVmZXIoKTtcclxuICAgICAgICAvLyDliKTmlq3lvILmraXovb3lhaVcclxuICAgICAgICBpZiAoZGVsaXZlci5jb250ZW50VXJsKSB7XHJcbiAgICAgICAgICAgICRodHRwKHtcclxuICAgICAgICAgICAgICAgIHVybCAgOiBkZWxpdmVyLmNvbnRlbnRVcmwsXHJcbiAgICAgICAgICAgICAgICBjYWNoZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyc3Q6YW55KSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKGRlbGl2ZXIuZGF0YSA9IHJzdC5kYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZGVmZXIucmVzb2x2ZShudWxsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKGNvbnRlbnQ6c3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGRlbGl2ZXIuY29udGVudCA9IGNvbnRlbnQgfHwgZGVsaXZlci5jb250ZW50IHx8ICcnO1xyXG5cclxuICAgICAgICAgICAgbGV0IG9sZE9wZW4gICAgID0gX29wZW4oZGVsaXZlcik7XHJcbiAgICAgICAgICAgIGxldCAkZWwgICAgICAgICA9ICQoJyNsYXl1aS1sYXllcicgKyBvbGRPcGVuKTtcclxuICAgICAgICAgICAgbGV0ICRjb250ZW50ICAgID0gJGVsLmZpbmQoJy5sYXl1aS1sYXllci1jb250ZW50Jyk7XHJcbiAgICAgICAgICAgIGxldCBpbmplY3RTY29wZSA9IGRlbGl2ZXIuc2NvcGUgfHwgJHJvb3RTY29wZS4kbmV3KCk7XHJcbiAgICAgICAgICAgICRjb250ZW50LnJlcGxhY2VXaXRoKCRjb21waWxlKCRjb250ZW50WzBdLm91dGVySFRNTCkoaW5qZWN0U2NvcGUpKTtcclxuXHJcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQod2luZG93KS5yZXNpemUoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gb2xkT3BlbjtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBsYXllci5jbG9zZSA9IGZ1bmN0aW9uIChpbmRleDpudW1iZXIpIHtcclxuICAgICAgICAkcS53aGVuKGluZGV4KS50aGVuKGZ1bmN0aW9uIChpbmRleDpudW1iZXIpIHtcclxuICAgICAgICAgICAgX2Nsb3NlKGluZGV4KTtcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuICAgIGxheWVyLmZ1bGwgPSBmdW5jdGlvbiAoaW5kZXg6bnVtYmVyKSB7XHJcbiAgICAgICAgJHEud2hlbihpbmRleCkudGhlbihmdW5jdGlvbiAoaW5kZXg6bnVtYmVyKSB7XHJcbiAgICAgICAgICAgIF9mdWxsKGluZGV4KTtcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuICAgIGxheWVyLm1zZyA9IGZ1bmN0aW9uIChjb250ZW50OnN0cmluZywgb3B0czphbnkpe1xyXG4gICAgICAgICRxLndoZW4oW2NvbnRlbnQsb3B0c10pLnRoZW4oZnVuY3Rpb24oYXJyOkFycmF5PGFueT4pe1xyXG4gICAgICAgICAgICBsZXQgX2NvbnRlbnQgPSBhcnJbMF07XHJcbiAgICAgICAgICAgIGxldCBfb3B0cyA9IGFyclsxXTtcclxuICAgICAgICAgICAgX21zZyhfY29udGVudCwgX29wdHMpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGxheWVyXHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ25nLWxheWVyJywgW10pXHJcbiAgICAuZmFjdG9yeSgnbGF5ZXInLCBsYXllckZhY3RvcnkpO1xyXG5cclxuIl19
