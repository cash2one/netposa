/**
 * Created by dell on 2017/9/2.
 * @desc 本系统angular中http请求的声明文件
 * @desc Object describing the request to be made and how it should be processed.
 * @desc see http://docs.angularjs.org/api/ng/service/$http#usage
 */
import {SystemLog, ISystemLog} from "../../../core/entity/SystemLog";
interface IRequestShortcutConfig {
    /**
     * {Object.<string|Object>}
     * Map of strings or objects which will be turned to ?key1=value1&key2=value2 after the url. If the value is not a string, it will be JSONified.
     */
    params?: any;

    /**
     * Map of strings or functions which return strings representing HTTP headers to send to the server. If the return value of a function is null, the header will not be sent.
     */
    headers?: any;

    /**
     * Name of HTTP header to populate with the XSRF token.
     */
    xsrfHeaderName?: string;

    /**
     * Name of cookie containing the XSRF token.
     */
    xsrfCookieName?: string;

    /**
     * {boolean|Cache}
     * If true, a default $http cache will be used to cache the GET request, otherwise if a cache instance built with $cacheFactory, this cache will be used for caching.
     */
    cache?: any;

    /**
     * whether to to set the withCredentials flag on the XHR object. See [requests with credentials]https://developer.mozilla.org/en/http_access_control#section_5 for more information.
     */
    withCredentials?: boolean;

    /**
     * {string|Object}
     * Data to be sent as the request message data.
     */
    data?: any;

    /**
     * {function(data, headersGetter)|Array.<function(data, headersGetter)>}
     * Transform function or an array of such functions. The transform function takes the http request body and headers and returns its transformed (typically serialized) version.
     */
    transformRequest?: any;

    /**
     * {function(data, headersGetter)|Array.<function(data, headersGetter)>}
     * Transform function or an array of such functions. The transform function takes the http response body and headers and returns its transformed (typically deserialized) version.
     */
    transformResponse?: any;

    /**
     * {number|Promise}
     * Timeout in milliseconds, or promise that should abort the request when resolved.
     */
    timeout?: any;

    /**
     * See requestType.
     */
    responseType?: string;
}

/**
 * Object describing the request to be made and how it should be processed.
 * see http://docs.angularjs.org/api/ng/service/$http#usage
 */
interface IRequestConfig extends IRequestShortcutConfig {
    /**
     * HTTP method (e.g. 'GET', 'POST', etc)
     */
    method: string;
    /**
     * Absolute or relative URL of the resource that is being requested.
     */
    url: string;
}

interface IPortraitRequestConfig extends IRequestConfig{
    showLoad?: boolean;
    // 当前请求的唯一编码
    uuid?: string;
}
interface IPortraitRequestConfig extends IRequestConfig{
    showLoad?: boolean;
    // 当前请求的唯一编码
    uuid?: string;
    // 系统日志
    systemLog?: any;
}
interface IHttpHeadersGetter {
    (): { [name: string]: string; };
    (headerName: string): string;
}

interface IHttpPromiseCallback<T> {
    (data: T, status: number, headers: IHttpHeadersGetter, config: IRequestConfig): void;
}
/**
 * 这里是预存的日志数据
 * 这里继承SystemLog的意义在于, 为了检错
 * 然后在这里标识出哪些参数能够用于在service中进行设置
 */
export class PreSystemLog implements ISystemLog{
    //编号
    ID?: string;
    //操作用户Id
    OperatorUser?:string;
    //操作Ip
    OperatorIP?:string;
    //操作模块
    OperFirstModule?:string;
    //二级操作模块
    OperSecondModule?:string;
    //三级功能
    OperThirdModule?:string;
    //操作时间
    OperatorTime?:string;
    //详情
    Descrption?:string;
    //动作类型 必填
    ActionType?:string;
    //对象类型 必填
    ObjectType?:string;
    //对象Id
    ObjectID?:string;
    //对象名称
    ObjectName?:string;
    //扩展字段
    Ext?:string;


    // 这里是前端业务自定义的拓展字段, 用于日志记录组装给后台数据用
    // 专门针对批量操作进行的字段存储 当批量操作进行时, 因为ObjectID 不能记录多个id, 所以将多个id放在此处存储
    // ObjectID和ObjectIDS互斥
    ObjectIDS?: string;
    ObjectNames?: string;
}
export type IAngularHttp = (res: IPortraitRequestConfig) => Promise<any>;