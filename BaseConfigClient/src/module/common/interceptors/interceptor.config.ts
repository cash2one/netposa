import {app} from '../app/main.app';
import './http.interceptor';
import 'angular';
declare let angular: any;

export default class InterceptorProvider{
    static $inject = ['$httpProvider'];

    constructor($httpProvider:any) {

        // TODO 以下代码用于修复ie浏览器ajax缓存问题
        //initialize get if not there
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }
        //disable IE ajax request caching
        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
        // extra
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

       $httpProvider.interceptors.push('httpInterceptor');
    }
}

app.config(InterceptorProvider);