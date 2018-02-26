import { app } from '../app/main.app';
import 'angular';
import "es6-promise";
import { IUserInfoCacheFactory } from "../factory/userinfo.cache.factory";
import "../factory/userinfo.cache.factory";
import { HttpResponseResult } from "../../../core/params/result/ResponseResult";
import "../factory/response.notify.factory";
import { IResponseNotifyFactory } from "../factory/response.notify.factory";
import Config from "../../../config";
import { IPortraitRequestConfig } from "./http";
declare let require: any;
declare let angular: any;
declare let layer: any;
let Promise = require("es6-promise");

class HttpInterceptor {
    static $inject = ['userInfoCacheFactory', 'notifyFactory', '$q'];
    request: Function;
    requestError: Function;
    response: Function;
    responseError: Function;
    private _LOADING_CACHE_MAP = {} as { [key: string]: number };

    constructor(private userInfoCacheFactory: IUserInfoCacheFactory, private notifyFactory: IResponseNotifyFactory, private $q: any) {
        let vm = this;
        this.request = _request;
        this.requestError = _requestError;
        this.response = _response;
        this.responseError = _responseError;

        function _request(config: any) {
            if (isIgnore(config)) return config;
            // alert wyr 2017.6.9 添加 token 参数

            let headerConfig = config.headers;
            let headers = userInfoCacheFactory.getCurrentUserKey();
            let header;
            for (header in headers) {
                headerConfig[header] = headers[header];
            }
            headers = userInfoCacheFactory.getCurrentUserIDMap();
            for (header in headers) {
                headerConfig[header] = headers[header];
            }


            // // 增加全局超时时间
            // if (!config.timeout) {
            //     config.timeout = Config.GLOBAL_TIME_OUT;
            // }

            // 配置手动cancel
            if (!config.cancel) {
                let cancel = $q.defer();
                config.cancel = cancel;
                config.timeout = cancel.promise;
            }

            // 增加全局遮罩
            if (config.showLoad) {
                toggleLayerLoad(getUrl(config));
                // 在这里清除掉showLoad配置, 不将此配置发送给后台
                delete config.showLoad;
            }

            return config;
        }

        function _requestError(err: any) {
            if (isIgnore(err.config) || isSaveLog(err.config)) return Promise.reject(err);
            console.debug("http.interceptor._requestError", err);
            toggleLayerLoad(getUrl(err.config), true);
        }

        function _response(res: HttpResponseResult<any>) {
            if (isIgnore(res.config) || isSaveLog(res.config)) return res;
            console.debug("http.interceptor._response", res);
            //TODO  发送请求后 异常退出 返回跳往登录 未做。。。。
            // if(res.data && res.data.Code!=200){
            //     layer.msg(`后台返回状态码。。。。</br> ${ res.data.Code } </br> 接口： ${res.config.url}</br>需要的时候添加相应逻辑。。。。`);
            // }
            toggleLayerLoad(getUrl(res.config), true);
            vm.notifyFactory.msg({ onlyError: true })(res.data);
            return res.data;
        }

        function _responseError(err: any) {
            if (isIgnore(err.config) || isSaveLog(err.config)) return Promise.reject(err);
            console.debug("Http.interceptor._responseError", err);
            // err.status
            // 0：客户端 设置超时 主动 断开请求链接、 没网
            // 504：服务器断开 无网络
            // if(-1 === err.status) {
            //     // 远程服务器无响应
            // } else if(500 === err.status) {
            //     // 处理各类自定义错误
            // } else if(501 === err.status) {
            //     // ...
            // } else if(0 === err.status) {
            //     console.log("%c =====请求超时 10s。。。。==============","color:orange");
            // }
            toggleLayerLoad(getUrl(err.config), true);
            // TODO 针对这种真实的http请求, 弹出的错误提示暂时还没定, 还需修改 resolve: wyr
            vm.notifyFactory.msg({ onlyError: true, codeKey: 'status' })(err);
            return Promise.reject(err);
        }

        // 忽略过滤的拦截
        function isIgnore(httpConfig: any): boolean {
            if (!httpConfig) {
                console.warn("interceptor.isIgnore httpConfig Error, httpConfig is null!");
            }
            let _url = getUrl(httpConfig);

            //过滤 所有 url 不是"/db" 开头的 请求
            let isStart_db = ("/db" == _url.slice(0, 3));
            let isStart_fds = ("/pdp" == _url.slice(0, 4));
            let isStart_bcs = ("/bcs" == _url.slice(0, 4));
            return !(isStart_db || isStart_fds || isStart_bcs);
        }

        /**
         * 由于增加了日志记录, 所以日志记录操作的成功或者失败都不会弹出提示信息, 输入静默请求和返回
         * @param httpConfig
         * @return {boolean}
         */
        function isSaveLog(httpConfig: IPortraitRequestConfig): boolean {
            if (!httpConfig) {
                console.warn("interceptor.isIgnore httpConfig Error, httpConfig is null!");
            }
            var _url = getUrl(httpConfig);

            // 记录日志的/db/systemlog也不被拦截器处理
            var isLogUrl = ('/db/systemlog' == _url.slice(0, 13));

            if (isLogUrl) {
                return true;
            } else {
                return false;
            }
        }


        function getUrl(httpConfig: any) {
            if (!httpConfig) {
                console.warn("interceptor.getUrl httpConfig Error, httpConfig is null!");
            }
            return httpConfig.url;
        }

        /**
         * 开启/关闭全局遮罩
         * @param isClose 是否是关闭操作
         */
        function toggleLayerLoad(url?: string, isClose?: boolean) {
            if (!url) {
                console.warn("interceptor.toggleLoading url Error, url is null!");
            }
            if (vm._LOADING_CACHE_MAP[url] && isClose) {
                // 关闭遮罩
                layer.close(vm._LOADING_CACHE_MAP[url]);
                delete vm._LOADING_CACHE_MAP[url];
            } else if (!isClose) {
                // 不是关闭, 则是开启遮罩
                vm._LOADING_CACHE_MAP[url] = layer.load(3);
            }

        }
    }
}

app.service('httpInterceptor', HttpInterceptor);
