/**
 * 项目初始化的引入的文件
 * @author wyr
 * @date   2016-11-23
 *
 * 主要是项目的一些模块依赖和页面初始化需要引入的那些js文件的配置
 */
'use strict';

(function (win) {
    //配置baseUrl
    var baseUrl = document.getElementById('loginMain').getAttribute('data-baseurl');

    /*
     * 文件依赖
     */
    var config = {
        baseUrl: baseUrl,           //依赖相对路径
        urlArgs: "v=" + (new Date()).getTime(),
        paths: {                    //如果某个前缀的依赖不是按照baseUrl拼接这么简单，就需要在这里指出
            'jquery': 'libs/jquery-core/jquery.min',
            'angular': 'libs/angular/angular',
            'md5': 'libs/md5/jquery.md5',
            'css': 'libs/require/css',
            'text': 'libs/require/text',
            'jquery.json': 'libs/json/jquery.json.min',
            'layer': 'libs/layer_v2.4/layer'
        },
        shim: {
            'angular': {
                exports: 'angular'
            },
            'jquery.json': {
                deps: ['jquery']
            },
            'md5': {
                deps: ['jquery'],
            },
            'layer':{
                deps: ['jquery', 'css!libs/layer_v2.4/skin/layer.css']
            }
        }
    };

    require.config(config);

    require(['angular', 'module/login/js/login.controller'], function(angular){
        angular.bootstrap(document, ['atmsLogin']);
    });

})(window);
