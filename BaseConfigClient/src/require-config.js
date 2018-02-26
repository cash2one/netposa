/**
 * Created by dell on 2017/3/14.
 */
'use strict';
require.config({
    urlArgs: "v=" + (new Date()).getTime(),
    waitSeconds: 0,
    baseUrl: '/',
    paths: {
        'jquery': 'libs/jquery-core/jquery.min',
        'angular': 'libs/angular/angular',
        'angular.ui.router': 'libs/angular/angular-ui-router.min',
        'angular.lazyLoad': 'libs/angular/ocLazyLoad.min',
        'handlebars': 'libs/handlebars/handlebars',
        'common-m': 'module/common',
        'main.app': 'module/common/app/main.app',
        'jquery.md5': 'libs/md5/jquery.md5',
        'css': 'libs/require/css',
        'text': 'libs/require/text',
        'system.config': 'base/js/system.config',
        'angular-require': 'libs/angular/angular-require',
        'ztreev3': 'libs/zTree_v3/js/jquery.ztree.all-3.5.min',
        'ztreev3.exhide': 'libs/zTree_v3/js/jquery.ztree.exhide-3.5.min',
        'WdatePicker': 'libs/My97DatePicker/WdatePicker',
        'layerV3': 'libs/layer/layer',
        'laydate': 'libs/laydate/laydate',
        'ng-layer': 'libs/layer/ng-layer',
        'ng-mylayer': 'module/common/factory/mylayer.factory',
        'ng-table': 'libs/ng/table/ng-table',
        'json2': 'libs/json2/json2',
        'ui.bootstrap.0.12.0': 'libs/bootstrap-0.12.0/ui-bootstrap-tpls-0.12.0.min',
        "npgis": "libs/npgis/Init",
        "heatmap":"libs/npgis/extends/heatmap",
        "npgis2": "libs/npgis/Npgis2",
        'es6-promise': 'libs/es6_promise/es6-promise',
        "angular-translate": "libs/ng/translate/angular-translate",
        "angular-translate-loader": "libs/ng/translate/translate-loader/angular-translate-loader-static-files",
        "webUploader": "libs/webuploader-0.1.5/webuploader.nolog",
        "echarts":"libs/echarts3/echarts",
        "socket.io": "libs/socket/socket.io",
        "ua-parser-js": "libs/uaparser/ua-parser.min", // 浏览器版本检测插件, 由于此插件里配置原因, 名字只能写成ua-parser-js
        "jedate": "libs/jedate/jquery.jedate.min",
        "moment": "libs/moment/moment",
        "lodash":"libs/lodash/lodash",
        "underscore":"libs/lodash/underscore",
        'ng-scrollBars':'libs/ng-scrollbars/scrollbars',
        'mousewheel':'libs/ng-scrollbars/malihu-custom-scrollbar-plugin/jquery-mousewheel/jquery.mousewheel',
        'mCustomScrollbar':'libs/ng-scrollbars/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar',
        'ngDraggble':'libs/draggble/ngDraggble',
        'angular-base64':'libs/ng/angular-base64/angular-base64.min',
        'JsonExportExcel':'libs/JsonExportExcel/JsonExportExcel.min'
    },
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angular.ui.router': {
            deps: ['angular']
        },
        'angular.lazyLoad': {
            deps: ['angular']
        },
        'handlebars': {
            exports: 'Handlebars'
        },
        'jquery.md5': {
            deps: ['jquery']
        },
        'angular-require': {
            deps: ['angular']
        },
        'ztreev3': {
            deps: ['jquery', 'css!/libs/zTree_v3/css/zTreeStyle/zTreeStyle.css']
        },
        'ztreev3.exhide':{
            deps: ['ztreev3']
        },
        'WdatePicker': {
            deps: ['libs/My97DatePicker/lang/zh-cn','libs/My97DatePicker/lang/zh-tw','libs/My97DatePicker/lang/en', 'css!/libs/My97DatePicker/skin/WdatePicker.css']
        },
        'layerV3':{
            deps: ['jquery', 'css!libs/layer/theme/default/layer.css']
        },
        'ng-layer':{
            deps: ['angular','layerV3','laydate']
        },
        'ng-mylayer':{
            deps: ['angular','jquery']
        },
        'ng-table':{
            deps: ['jquery','angular', 'css!libs/ng/table/ng-table.css']
        },
        'json2':{
            exports: 'JSON'
        },
        "ui.bootstrap.0.12.0":{
            deps: ['angular']
        },
        "angular-translate":{
            deps: ['angular']
        },
        "angular-translate-loader":{
            deps: ['angular-translate']
        },
        "webUploader": {
            deps: ["css!libs/webuploader-0.1.5/webuploader.css"]
        },
        "npgis2":{
            deps: ['heatmap','npgis']
        },
        'laydate':{
            deps:['jquery','css!libs/laydate/theme/default/laydate.css'],
            exports:'laydate'
        },
        'ng-scrollBars':{
            deps:['css!libs/ng-scrollbars/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css',
                'angular',
                'jquery',
                'mousewheel',
                'mCustomScrollbar'
            ]
        },
        'ngDraggble': {
            deps: ['angular']
        },
        "angular-base64":{
            deps: ['angular']
        },
    }
});

require(['module/index/main']);