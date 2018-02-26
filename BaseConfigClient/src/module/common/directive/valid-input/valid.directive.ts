/**
 * 验证输入数据特定数据的验证
 * @time: 2017-04-27 10:10:15
 * @params:
 * @return:
 */
import {app} from '../../app/main.app';
import "ng-layer";
declare let layer:any;
interface IValidResult {
    status: boolean,
    msg: string,
    isShowTip: boolean
}

class ValidProvide {
    validType: Array<string>;
    static PREFIX_NAME: string = 'valid';

    static VALID_TYPE: Array<{ name: string, provingText: Function, isValid: Function }> = [
        {
            name: 'validMMax',
            provingText: function (maxL?: number) {
                return '输入长度不能超过' + maxL;
            },
            isValid: function (result: string, params: string) {
                if (!result) {
                    return ValidProvide.validResult(true, '');
                }
                if (parseInt(params)) {
                    let maxL = parseInt(params);
                    if (maxL < 1) {
                        console.error("valid-m-max 传的是最大长度，大于 0");
                        return ValidProvide.validResult(true, '');
                    }
                    if (result.length > maxL) {
                        return ValidProvide.validResult(false, this.provingText(params), true);
                    }
                } else {
                    console.error("valid-m-max 传的是最大长度，必须为整数");
                    return ValidProvide.validResult(true, '');
                }
                return ValidProvide.validResult(true, '');
            }
        },
        {
            name: 'validMNonempty',
            provingText: function (str?: string) {
                return str ? str + '为必填项' : '此项为必填项';
            },
            isValid: function (result: string, params: string) {
                // alter wyr 2017.6.27 修改判断, 当为null或者===""时才判定没有填值
                if (result == null || result === "") {
                    return ValidProvide.validResult(false, this.provingText(params));
                }
                return ValidProvide.validResult(true, '');
            }
        },
        {
            name: 'validMPhone',
            provingText: function (str?: number) {
                return str || '请输入正确的手机号码';
            },
            isValid: function (result: string, params: string) {
                if (!result) {
                    return ValidProvide.validResult(true, '');
                }

                let flag: boolean = /^1[34578]\d{9}$/.test(result);
                if (flag) {
                    return ValidProvide.validResult(true, '');
                } else {
                    return ValidProvide.validResult(false, this.provingText(params));
                }
            }
        },
        {
            name: 'validMPointLon',
            provingText: function (str?: number) {
                return str || '要求经度整数部分为0-180小数部分为0到6位！';
            },
            isValid: function (result: string, params: string) {
                if (!result) {
                    return ValidProvide.validResult(true, '');
                }

                let flag: boolean = /^(((\d|[1-9]\d|1[1-7]\d|0)\.\d{0,6}))$/.test(result);
                if (flag) {
                    return ValidProvide.validResult(true, '');
                } else {
                    return ValidProvide.validResult(false, this.provingText(params));
                }
            }
        },
        {
            name: 'validMPointLat',
            provingText: function (str?: number) {
                return str || '要求纬度整数部分为0-90小数部分为0到6位！';
            },
            isValid: function (result: string, params: string) {
                if (!result) {
                    return ValidProvide.validResult(true, '');
                }

                let flag: boolean = /^([0-8]?\d{1}\.\d{0,6})$/.test(result);
                if (flag) {
                    return ValidProvide.validResult(true, '');
                } else {
                    return ValidProvide.validResult(false, this.provingText(params));
                }
            }
        },
        {
            name: 'validMEmail',
            provingText: function (str?: number) {
                return str || '请输入正确的邮箱地址';
            },
            isValid: function (result: string, params: string) {
                if (!result) {
                    return ValidProvide.validResult(true, '');
                }
                let flag: boolean = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(result);
                if (flag) {
                    return ValidProvide.validResult(true, '');
                } else {
                    return ValidProvide.validResult(false, this.provingText(params), false);
                }
            }
        },
        {
            name: 'validMIp',
            provingText: function (str?: number) {
                return str || '请输入正确的Ip地址';
            },
            isValid: function (result: string, params: string) {
                // TODO 暂无ip地址验证
                console.log("%c ==========暂无ip 格式 验证==============", "color:orange");
                return ValidProvide.validResult(true, '');
                /* if(!result){
                     return ValidProvide.validResult(true,'');
                 }
                 let flag:boolean = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(result);
                 if(flag){
                     return ValidProvide.validResult(true,'');
                 }else{
                     return ValidProvide.validResult(false,this.provingText(params),false);
                 }*/
            }
        },
        {
            name: 'validMCode',
            provingText: function (str?: number) {
                return str || '请输入正确的Ip地址';
            },
            isValid: function (result: string, params: string) {
                // TODO 暂无Code地址验证
                console.log("%c ==========暂无Code 格式 验证==============", "color:orange");
                return ValidProvide.validResult(true, '');
                /* if(!result){
                 return ValidProvide.validResult(true,'');
                 }
                 let flag:boolean = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(result);
                 if(flag){
                 return ValidProvide.validResult(true,'');
                 }else{
                 return ValidProvide.validResult(false,this.provingText(params),false);
                 }*/
            }
        },
        {
            name: 'validMPort',
            provingText: function (str?: number) {
                return str || '请输入正确的端口';
            },
            isValid: function (result: string, params: string) {
                // TODO 暂无Port 验证
                console.log("%c ==========暂无Port 格式验证==============", "color:orange");
                if (!result) {
                    return ValidProvide.validResult(true, '');
                }
                let flag: boolean;
                console.log();
                if (parseInt(result)) {
                    flag = result != '0';
                } else {
                    flag = false;
                }

                if (flag) {
                    return ValidProvide.validResult(true, '');
                } else {
                    return ValidProvide.validResult(false, this.provingText(params), false);
                }
            }
        },
    ];

    constructor() {

    }

    static linkFun(validType: string) {

        return function (scope: any, element: any, attrs: any, ctrl: any) {
            let directiveName = ValidProvide.getDirectiveName(validType);
            scope.$on('$destroy',()=>{
                layer.close(element.layerIndex);
            });
            function isChangSpan(isShow: boolean): boolean {
                let errStrName = (attrs[directiveName] || '此项') + '为必填';
                let needAddErrorSpan = true; // 是否匹配到errspan true为没有匹配到, false为匹配到
                if (isShow) { // 若需要增加错误span
                    element.layerIndex = layer.tips(`<div class="error-msg">${errStrName}</div>`, element, {
                        tips: [1, 'white'],
                        time: 0,
                        tipsMore: true
                    });
                    element.addClass('errorColor');
                }else{
                    element.removeClass('errorColor');
                    layer.close(element.layerIndex);
                    needAddErrorSpan = false;
                }
                return needAddErrorSpan;
            }

            function validity(value?: string): string {
                let validResult: boolean;
                validResult = !!value;
                if (validResult) {
                    ctrl.$setValidity(directiveName, true);
                    isChangSpan(false);
                } else {
                    ctrl.$setValidity(directiveName, false);
                }
                return value == 'undefined' ? '' : value;
            }

            element.bind('blur', function (e: any, e2: any) {
                if (ctrl.$invalid) {  //非法 判断显示非法类型
                    isChangSpan(true);
                }
            });

            element.bind('focus', function (e: any, e2: any) {
                if (ctrl.$invalid) {  //非法 判断显示非法类型
                    isChangSpan(false);
                }
            });

            ctrl.$formatters.push(validity);
            ctrl.$parsers.push(validity);
        };
    }

    static validResult = function (status: boolean, msg?: string, isShowTip?: boolean) {
        return {
            status: status,
            msg: msg || '',
            isShowTip: isShowTip || false
        }
    };

    static multiplelinkFun(validType: string) {
        return function (scope: any, element: any, attrs: any, ctrl: any) {
            let directiveName = ValidProvide.getDirectiveName(validType);
            scope.$on('$destroy',()=>{
                layer.close(element.layerIndex);
            });
            function isChangSpan(isShow: boolean): boolean {
                let errStrName = (attrs[directiveName]);
                if(!errStrName||errStrName=="")return false;
                layer.closeAll('tips');
                let needAddErrorSpan = true; // 是否匹配到errspan true为没有匹配到, false为匹配到
                if (isShow) { // 若需要增加错误span
                    element.layerIndex = layer.tips(`<div class="error-msg">${errStrName}</div>`, element, {
                        tips: [1, 'white'],
                        time: 0,
                        tipsMore: true
                    });
                    element.addClass('errorColor');
                }else{
                    element.removeClass('errorColor');
                    layer.close(element.layerIndex);
                    needAddErrorSpan = false;
                }
                return needAddErrorSpan;
            }

            function validity(value?: string): string {
                let attrsResult: any,
                    validResult: IValidResult = {status: true, msg: '', isShowTip: false},
                    i: number,
                    len: number;
                for (i = 0, len = ValidProvide.VALID_TYPE.length; i < len; i++) {
                    attrsResult = attrs[ValidProvide.VALID_TYPE[i].name];
                    if (typeof attrsResult == 'undefined') {
                    } else {
                        validResult = ValidProvide.VALID_TYPE[i].isValid(value, attrsResult);

                        if (!validResult.status) {
                            //----------- 打印使用
                            i = len;
                        }
                    }
                }

                if (validResult.status) {
                    ctrl.$setValidity(directiveName, true);
                    isChangSpan(false);
                } else {
                    ctrl.$setValidity(directiveName, false);
                    attrs.$set(directiveName, validResult.msg);
                    if (validResult.isShowTip) {
                        isChangSpan(true);
                    } else {
                        isChangSpan(false);
                    }
                }
                return value;
            }

            element.bind('blur', function (e: any, e2: any) {
                if (ctrl.$invalid) {  //非法 判断显示非法类型
                    isChangSpan(true);
                }
            });
            // element.bind('focus', function (e: any, e2: any) {
            //     if (ctrl.$invalid) {  //非法 判断显示非法类型
            //         isChangSpan(false);
            //     }
            // });

            ctrl.$formatters.push(validity);
            ctrl.$parsers.push(validity);
        };
    }


    static getDirectiveName(validType: string) {
        return ValidProvide.PREFIX_NAME + validType;
    }

}

/**
 *
 * @time: 2017-04-27 16:14:32
 * @params: valid-nonempty 使用不传值则为默认提示语   valid-nonempty = 'XXX'  显示为  XXX 为必填
 * @return:
 */
class EmptyProvingDirective {
    static $inject: Array<string> = [];

    constructor() {

    }

    static instance() {
        return new EmptyProvingDirective();
    }

    restrict: string = 'A';
    require: string = 'ngModel';
    link = ValidProvide.linkFun('Nonempty');
}

/**
 *
 * @time: 2017-04-27 15:44:31
 * @params: valid-phone  当值为 -1 的时候为非必须填写项  不填默认 必填 并显示默认提示  其他 默认必填同时作为显示内容
 * @return:
 */
class PhoneProvingDirective {
    get link(): (scope: any, element: any, attrs: any, ctrl: any) => any {
        return this._link;
    }

    set link(value: (scope: any, element: any, attrs: any, ctrl: any) => any) {
        this._link = value;
    }

    static $inject: Array<string> = [];

    constructor() {
    }

    static instance() {
        return new PhoneProvingDirective();
    }

    restrict: string = 'EA';
    require: string = 'ngModel';
    private _link = function (scope: any, element: any, attrs: any, ctrl: any) {
        function isChangSpan(isShow: boolean, provingStr?: string): boolean {
            let errStrName = (provingStr || '请输入正确的手机号码');
            //element.parent().find("span").remove();//– 限定通过标签名称查找
            let needAddErrorSpan = true; // 是否匹配到errspan true为没有匹配到, false为匹配到
            if (isShow) { // 若需要增加错误span
                element.layerIndex = layer.tips(`<div class="error-msg">${errStrName}</div>`, element, {
                    tips: [1, 'white'],
                    time: 0,
                    tipsMore: true
                });
                element.addClass('errorColor');
            }else{
                element.removeClass('errorColor');
                layer.close(element.layerIndex);
                needAddErrorSpan = false;
            }
            return needAddErrorSpan;
        }

        function validity(value?: string): string {
            let validResult: boolean;
            if (value) {
                if (value.length == 11) {
                    validResult = /^1[34578]\d{9}$/.test(value);
                }
            } else {
                validResult = (attrs.validPhone == -1);
            }

            if (validResult) {
                ctrl.$setValidity('validPhone', true);
                isChangSpan(false);
                //attrs.$set('tooltip','');
            } else {
                ctrl.$setValidity('validPhone', false);
                //isChangSpan(true);
                //attrs.$set('tooltip','验证出错说明');
            }
            return value == 'undefined' ? '' : value;
        }

        ctrl.$formatters.push(validity);
        ctrl.$parsers.push(validity);
        element.bind('blur', function (e: any, e2: any) {
            if (ctrl.$invalid) {  //非法 判断显示非法类型
                isChangSpan(true);
            }
        });
        element.bind('focus', function (e: any, e2: any) {
            if (ctrl.$invalid) {  //非法 判断显示非法类型
                isChangSpan(false);
            }
        });

    }
}

class MultipleDirective {
    static $inject: Array<string> = [];

    constructor() {

    }

    static instance() {
        return new MultipleDirective();
    }

    restrict: string = 'A';
    require: string = 'ngModel';
    link = ValidProvide.multiplelinkFun('Multiple');
}

app
    .directive(ValidProvide.getDirectiveName('Nonempty'), EmptyProvingDirective.instance)
    .directive('validMultiple', MultipleDirective.instance)
    .directive('validPhone', PhoneProvingDirective.instance)



;
//TODO 表单验证说明 ：
// 1. 在整个表单内嵌套 <form name="表单名"></form>
// 2. 提交按钮 <bottom  ng-disabled="表单名.$invalid"></bottom> 控制检查 表单内需要验证已通过  按钮有效
// 3. 每个输入行 格式 嵌套 ,输入标签 父级别 为 class form 保证 错误提示正确 插入显示
//      <div class="form">
//          <span  class="title" style="text-indent: 10px">描述</span>
//
//          <textarea class="text u-textarea" ng-model="vsupCtrl.currentServe.Description" placeholder="描述" rows="3"></textarea>
//
//     </div>
