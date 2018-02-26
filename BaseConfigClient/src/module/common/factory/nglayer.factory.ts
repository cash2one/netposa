import 'angular'
declare let angular: any, $: any,window:any;

function layerFactory($rootScope:any, $compile:any, $timeout:any, $q:any, $http:any){
    let layer = window.layer;
     let _open  = layer.open;
     let _close = layer.close;
     let _full  = layer.full;
     let _tips = layer.tips;
     // creator: wyr 增加对msg的支持
     let _msg = layer.msg;
    layer.open = function (deliver:any) {
        let defer = $q.defer();
        // 判断异步载入
        if (deliver.contentUrl) {
            $http({
                url  : deliver.contentUrl,
                cache: true
            }).then(function (rst:any) {
                defer.resolve(deliver.data = rst.data);
            });
        } else {
            defer.resolve(null);
        }

        return defer.promise.then(function (content:string) {
            deliver.content = content || deliver.content || '';

            let oldOpen     = _open(deliver);
            let $el         = $('#layui-layer' + oldOpen);
            let $content    = $el.find('.layui-layer-content');
            let injectScope = deliver.scope || $rootScope.$new();
            $content.replaceWith($compile($content[0].outerHTML)(injectScope));

            $timeout(function () {
                $(window).resize();
            });

            return oldOpen;
        });
    };
    layer.close = function (index:number) {
        $q.when(index).then(function (index:number) {
            _close(index);
        })
    };
    layer.full = function (index:number) {
        $q.when(index).then(function (index:number) {
            _full(index);
        })
    };
    layer.msg = function (content:string, opts:any){
        $q.when([content,opts]).then(function(arr:Array<any>){
            let _content = arr[0];
            let _opts = arr[1];
            _msg(_content, _opts);
        })
    };
    return layer
}

angular
    .module('ng-layer', [])
    .factory('layer', layerFactory);

