
'use strict';


require.config({
    urlArgs: "v=" + (new Date()).getTime(),
    waitSeconds: 0,
    baseUrl: '/',
    paths: {
        'jquery': 'libs/jquery-core/jquery.min',
        'angular': 'libs/angular/angular',
        'jquery.md5': 'libs/md5/jquery.md5',
        'css': 'libs/require/css',
        'text': 'libs/require/text',
        'jquery.json': 'libs/json/jquery.json.min',
        'layerV3': 'libs/layer/layer',
        'es6-promise': 'libs/es6_promise/es6-promise',
        'ng-layer': 'module/common/factory/nglayer.factory',
        'des3':'libs/des/des3',
        "ua-parser-js": "libs/uaparser/ua-parser.min" // 浏览器版本检测插件, 由于此插件里配置原因, 名字只能写成ua-parser-js
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        /*'des3': {
            exports: 'des3'
        },*/
        'jquery.md5': {
            deps: ['jquery']
        },
        'jquery.json': {
            deps: ['jquery']
        },
        'layerV3':{
            deps: ['jquery', 'css!libs/layer/theme/default/layer.css']
        },
        'ng-layer':{
            deps: ['angular','layerV3']
        }

    }
});

require(['module/login/login.main']);
