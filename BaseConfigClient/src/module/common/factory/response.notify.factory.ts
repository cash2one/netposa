import {app} from "../app/main.app";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {ErrorCode} from "../error.code";
import {ILayerDec} from "./layerMsg.factory";
import "./layerMsg.factory";
import {BubbleCode} from "../enum/bubble.code";

namespace ResponseNotifyFactory {
    export interface msgOpts {
        onlyError?: boolean, // 是否只有code为错误编码的时候才显示提示信息 与onlyError互斥
        onlySuccess?: boolean, // 是否只提示code为200的编码 与onlySuccess互斥
        /**
         * 取错误码的key,默认为code, 但是当部分特殊情况时需要修改codeKey的值
         * 如responseError传来的时候, 就需要判断status的值
         */
        codeKey?: string
    }
}
export interface IResponseNotifyFactory {
    msg: (options?: ResponseNotifyFactory.msgOpts)=>(res: ResponseResult<any>)=>ResponseResult<any>;
    // message: (languageKey: string)=>void;
    test: ()=>Function;
}

class NotifyFactory implements IResponseNotifyFactory {
    static $inject: Array<string> = ["$injector", "$q", "i18nFactory", "$rootScope"];

    /**
     * 符合以下错误码的, 按照用户没有权限进行处理
     */
    userAuthErrorCodeMap: {[key:number]: boolean};

    constructor(private $injector: any, private $q: any, private i18nFactory: any, private $rootScope: any) {
        console.debug("rootscope",$rootScope);
        this.userAuthErrorCodeMap = {
            401: true,
            4009: true
        };
    }

    /**
     * 普通的弹出框信息
     * @param options: {onlyError: boolean}
     * @returns {(res:ResponseResult<any>)=>undefined}
     */
    msg(options?: ResponseNotifyFactory.msgOpts){
        let vm = this;
        return function (origin: ResponseResult<any>) {
            let res:{[key:string]:any} = (origin || {}) as (ResponseResult<any> & {[key:string]:any});
            let layerDec:ILayerDec = vm.$injector.get("layerDec"); // 由于httpInterceptor会有循环依赖, 所以在这里每次调用的时候获取layer
            let opts = options || ({} as ResponseNotifyFactory.msgOpts);
            let codeKey = opts.codeKey || "code";
            let code = res[codeKey];
            let onlyError = opts.onlyError;
            let onlySuccess = opts.onlySuccess;
            let message = ErrorCode[code] || ErrorCode["20001"];
            let isError = (code != 200);

            // 若用户权限过滤失败
            if(vm.filterUserAuthError(code, layerDec)) {
                console.error("HttpResponseResult Error: ", res);
                return origin;
            }

            if (onlyError && code == 200) {
                // 当操作成功且设置了只显示错误操作,不进行任何显示
            } else if(onlySuccess && code == 200){
                // 当设置了只提示成功消息时进入此判断
                layerDec.successInfo("<span ng-bind='\"200\"|translate'></span>");
            }else if(!onlySuccess){
                // 若设置了onlySuccess 则不进入此if判断
                if(isError){
                    layerDec.failInfo("<span><span ng-bind='\"500.1\"|translate'></span>:<span ng-bind='\"" + message + "\"|translate'></span></span>",message);
                }else{
                    layerDec.successInfo("<span ng-bind='\"200\"|translate'></span>");
                }
            }

            if(code != 200){
                console.error("HttpResponseResult Error: ", res);
            }
            // 继续把信息回传回去, 供其他promise使用
            return origin;
        }
    };

    /**
     * 匹配用户权限错误, 若匹配到了, 弹框后跳出登录界面
     * @param code
     * @return {boolean}
     */
    private filterUserAuthError(code: number, layerDec: ILayerDec){
        if(this.userAuthErrorCodeMap[code]){
            // 匹配到了
            layerDec.notCloseInfo("<div class='u-msg-notclose'>"+this.i18nFactory('FDS_00_02_02')+"</div>",
                this.i18nFactory('FDS_00_05_03'),
                this.i18nFactory('FDS_00_05_01')).then(()=>{
                // 返回登录界面
                window.location.href = "/";
            });
            // 发送全局请求, 关闭轮巡的check-login
            this.$rootScope.$broadcast(BubbleCode.LOGIN_OUT);
            return true;
        }else{
            return false;
        }
    }

    // 测试此factory中弹出框使用正确性
    test(): Function {
        return this.$q.when(null).then(()=> {
            return {code: -20002} as ResponseResult<any>;
        }).then(this.msg({onlyError: false})).then((res: any)=> {
            console.debug("弹出框后打开的东西", res);
        });
    };
}
app.service("notifyFactory", NotifyFactory);
