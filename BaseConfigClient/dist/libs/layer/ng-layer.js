(function () {
    angular
        .module('ng-layer', [])
        .factory('layer', layer);

    /**
     * ng-layer
     * @desc 扩展layer,让layer支持ng
     * @example
     * // 所有options均支持以下contentUrl & scope
     * layer.open({
     *      contentUrl: 'modules/home/index.html'
     *      scope: $scope // 如果使用的是 controller as 语法, 可以不传入这个参数
     * });
     *
     * @returns layer
     */
    function layer ($rootScope, $compile, $timeout, $q, $http) {
        var layer  = window.layer;
        var _open  = layer.open;
        var _close = layer.close;
        var _full  = layer.full;
        // creator: wyr 增加对msg的支持
        var _msg = layer.msg;

        // 装饰open
        layer.open = function (deliver) {
            var defer = $q.defer();
            // 默认 不允许拉伸
            if(deliver.resize !==true){
                deliver.resize =  false;
            }
            // 判断异步载入
            if (deliver.contentUrl) {
                $http({
                    url  : deliver.contentUrl,
                    cache: true
                }).then(function (rst) {
                    defer.resolve(deliver.data = rst.data);
                });
            } else {
                defer.resolve(null);
            }

            return defer.promise.then(function (content) {
                // 缓存end, 让每次end执行的时候移除dom, 释放资源
                deliver.content = content || deliver.content || '';
                // alter wyr 2017.12.8 将scope单独提到局部变量, 不让其作为参数传入到layer中, 以免引起问题
                var _scope = deliver.scope;
                deliver.scope = null;
                var oldOpen     = _open(deliver);
                var $el         = angular.element('#layui-layer' + oldOpen);
                var $content    = $el.find('.layui-layer-content');
                //让弹窗内容层级高于OCX插件视频
                if(deliver.hasIframe){
                    var iframsHtml = "<iframe class='f-abs u-iframe-layer'></iframe>";
                    if(deliver.shade === 0){
                        $content.before(iframsHtml);
                    }else{
                        $el.siblings('.layui-layer-shade').prepend(iframsHtml);
                    }
                }
                var injectScope = _scope || $rootScope.$new();
                // alter wyr 2017.12.8 修复因$compile出现的内存泄漏
                // 解决方式, 缓存$compile出来的元素domStr, 在injectScope被销毁的时候手动销毁domStr
                var _domStr = $compile($content[0].outerHTML)(injectScope);
                injectScope.$on("$destroy",function(){
                    _domStr.remove();
                    _domStr = null;
                    injectScope = null;
                });

                $content.replaceWith(_domStr);

                $timeout(function () {
                    $(window).resize();
                });

                $content = null;
                $el = null;
                _scope = null;

                return oldOpen;
            });
        };

        // 装饰close
        layer.close = function (index) {
            $q.when(index).then(function (index) {
                _close(index);
            })
        };

        // 装饰full
        layer.full = function (index) {
            $q.when(index).then(function (index) {
                _full(index);
            })
        };

        // 装饰msg
        // creator: wyr 增加对msg的支持
        layer.msg = function (content, opts){
            $q.when([content,opts]).then(function(arr){
                var _content = arr[0];
                var _opts = arr[1];
                _msg(_content, _opts);
            })
        }

        return layer;
    }
})();
