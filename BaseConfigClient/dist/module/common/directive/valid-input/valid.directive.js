define(["require", "exports", "../../app/main.app", "ng-layer"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ValidProvide = (function () {
        function ValidProvide() {
        }
        ValidProvide.linkFun = function (validType) {
            return function (scope, element, attrs, ctrl) {
                var directiveName = ValidProvide.getDirectiveName(validType);
                scope.$on('$destroy', function () {
                    layer.close(element.layerIndex);
                });
                function isChangSpan(isShow) {
                    var errStrName = (attrs[directiveName] || '此项') + '为必填';
                    var needAddErrorSpan = true;
                    if (isShow) {
                        element.layerIndex = layer.tips("<div class=\"error-msg\">" + errStrName + "</div>", element, {
                            tips: [1, 'white'],
                            time: 0,
                            tipsMore: true
                        });
                        element.addClass('errorColor');
                    }
                    else {
                        element.removeClass('errorColor');
                        layer.close(element.layerIndex);
                        needAddErrorSpan = false;
                    }
                    return needAddErrorSpan;
                }
                function validity(value) {
                    var validResult;
                    validResult = !!value;
                    if (validResult) {
                        ctrl.$setValidity(directiveName, true);
                        isChangSpan(false);
                    }
                    else {
                        ctrl.$setValidity(directiveName, false);
                    }
                    return value == 'undefined' ? '' : value;
                }
                element.bind('blur', function (e, e2) {
                    if (ctrl.$invalid) {
                        isChangSpan(true);
                    }
                });
                element.bind('focus', function (e, e2) {
                    if (ctrl.$invalid) {
                        isChangSpan(false);
                    }
                });
                ctrl.$formatters.push(validity);
                ctrl.$parsers.push(validity);
            };
        };
        ValidProvide.multiplelinkFun = function (validType) {
            return function (scope, element, attrs, ctrl) {
                var directiveName = ValidProvide.getDirectiveName(validType);
                scope.$on('$destroy', function () {
                    layer.close(element.layerIndex);
                });
                function isChangSpan(isShow) {
                    var errStrName = (attrs[directiveName]);
                    if (!errStrName || errStrName == "")
                        return false;
                    layer.closeAll('tips');
                    var needAddErrorSpan = true;
                    if (isShow) {
                        element.layerIndex = layer.tips("<div class=\"error-msg\">" + errStrName + "</div>", element, {
                            tips: [1, 'white'],
                            time: 0,
                            tipsMore: true
                        });
                        element.addClass('errorColor');
                    }
                    else {
                        element.removeClass('errorColor');
                        layer.close(element.layerIndex);
                        needAddErrorSpan = false;
                    }
                    return needAddErrorSpan;
                }
                function validity(value) {
                    var attrsResult, validResult = { status: true, msg: '', isShowTip: false }, i, len;
                    for (i = 0, len = ValidProvide.VALID_TYPE.length; i < len; i++) {
                        attrsResult = attrs[ValidProvide.VALID_TYPE[i].name];
                        if (typeof attrsResult == 'undefined') {
                        }
                        else {
                            validResult = ValidProvide.VALID_TYPE[i].isValid(value, attrsResult);
                            if (!validResult.status) {
                                i = len;
                            }
                        }
                    }
                    if (validResult.status) {
                        ctrl.$setValidity(directiveName, true);
                        isChangSpan(false);
                    }
                    else {
                        ctrl.$setValidity(directiveName, false);
                        attrs.$set(directiveName, validResult.msg);
                        if (validResult.isShowTip) {
                            isChangSpan(true);
                        }
                        else {
                            isChangSpan(false);
                        }
                    }
                    return value;
                }
                element.bind('blur', function (e, e2) {
                    if (ctrl.$invalid) {
                        isChangSpan(true);
                    }
                });
                ctrl.$formatters.push(validity);
                ctrl.$parsers.push(validity);
            };
        };
        ValidProvide.getDirectiveName = function (validType) {
            return ValidProvide.PREFIX_NAME + validType;
        };
        ValidProvide.PREFIX_NAME = 'valid';
        ValidProvide.VALID_TYPE = [
            {
                name: 'validMMax',
                provingText: function (maxL) {
                    return '输入长度不能超过' + maxL;
                },
                isValid: function (result, params) {
                    if (!result) {
                        return ValidProvide.validResult(true, '');
                    }
                    if (parseInt(params)) {
                        var maxL = parseInt(params);
                        if (maxL < 1) {
                            console.error("valid-m-max 传的是最大长度，大于 0");
                            return ValidProvide.validResult(true, '');
                        }
                        if (result.length > maxL) {
                            return ValidProvide.validResult(false, this.provingText(params), true);
                        }
                    }
                    else {
                        console.error("valid-m-max 传的是最大长度，必须为整数");
                        return ValidProvide.validResult(true, '');
                    }
                    return ValidProvide.validResult(true, '');
                }
            },
            {
                name: 'validMNonempty',
                provingText: function (str) {
                    return str ? str + '为必填项' : '此项为必填项';
                },
                isValid: function (result, params) {
                    if (result == null || result === "") {
                        return ValidProvide.validResult(false, this.provingText(params));
                    }
                    return ValidProvide.validResult(true, '');
                }
            },
            {
                name: 'validMPhone',
                provingText: function (str) {
                    return str || '请输入正确的手机号码';
                },
                isValid: function (result, params) {
                    if (!result) {
                        return ValidProvide.validResult(true, '');
                    }
                    var flag = /^1[34578]\d{9}$/.test(result);
                    if (flag) {
                        return ValidProvide.validResult(true, '');
                    }
                    else {
                        return ValidProvide.validResult(false, this.provingText(params));
                    }
                }
            },
            {
                name: 'validMEmail',
                provingText: function (str) {
                    return str || '请输入正确的邮箱地址';
                },
                isValid: function (result, params) {
                    if (!result) {
                        return ValidProvide.validResult(true, '');
                    }
                    var flag = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(result);
                    if (flag) {
                        return ValidProvide.validResult(true, '');
                    }
                    else {
                        return ValidProvide.validResult(false, this.provingText(params), false);
                    }
                }
            },
            {
                name: 'validMIp',
                provingText: function (str) {
                    return str || '请输入正确的Ip地址';
                },
                isValid: function (result, params) {
                    console.log("%c ==========暂无ip 格式 验证==============", "color:orange");
                    return ValidProvide.validResult(true, '');
                }
            },
            {
                name: 'validMCode',
                provingText: function (str) {
                    return str || '请输入正确的Ip地址';
                },
                isValid: function (result, params) {
                    console.log("%c ==========暂无Code 格式 验证==============", "color:orange");
                    return ValidProvide.validResult(true, '');
                }
            },
            {
                name: 'validMPort',
                provingText: function (str) {
                    return str || '请输入正确的端口';
                },
                isValid: function (result, params) {
                    console.log("%c ==========暂无Port 格式验证==============", "color:orange");
                    if (!result) {
                        return ValidProvide.validResult(true, '');
                    }
                    var flag;
                    console.log();
                    if (parseInt(result)) {
                        flag = result != '0';
                    }
                    else {
                        flag = false;
                    }
                    if (flag) {
                        return ValidProvide.validResult(true, '');
                    }
                    else {
                        return ValidProvide.validResult(false, this.provingText(params), false);
                    }
                }
            },
        ];
        ValidProvide.validResult = function (status, msg, isShowTip) {
            return {
                status: status,
                msg: msg || '',
                isShowTip: isShowTip || false
            };
        };
        return ValidProvide;
    }());
    var EmptyProvingDirective = (function () {
        function EmptyProvingDirective() {
            this.restrict = 'A';
            this.require = 'ngModel';
            this.link = ValidProvide.linkFun('Nonempty');
        }
        EmptyProvingDirective.instance = function () {
            return new EmptyProvingDirective();
        };
        EmptyProvingDirective.$inject = [];
        return EmptyProvingDirective;
    }());
    var PhoneProvingDirective = (function () {
        function PhoneProvingDirective() {
            this.restrict = 'EA';
            this.require = 'ngModel';
            this._link = function (scope, element, attrs, ctrl) {
                function isChangSpan(isShow, provingStr) {
                    var errStrName = (provingStr || '请输入正确的手机号码');
                    var needAddErrorSpan = true;
                    if (isShow) {
                        element.layerIndex = layer.tips("<div class=\"error-msg\">" + errStrName + "</div>", element, {
                            tips: [1, 'white'],
                            time: 0,
                            tipsMore: true
                        });
                        element.addClass('errorColor');
                    }
                    else {
                        element.removeClass('errorColor');
                        layer.close(element.layerIndex);
                        needAddErrorSpan = false;
                    }
                    return needAddErrorSpan;
                }
                function validity(value) {
                    var validResult;
                    if (value) {
                        if (value.length == 11) {
                            validResult = /^1[34578]\d{9}$/.test(value);
                        }
                    }
                    else {
                        validResult = (attrs.validPhone == -1);
                    }
                    if (validResult) {
                        ctrl.$setValidity('validPhone', true);
                        isChangSpan(false);
                    }
                    else {
                        ctrl.$setValidity('validPhone', false);
                    }
                    return value == 'undefined' ? '' : value;
                }
                ctrl.$formatters.push(validity);
                ctrl.$parsers.push(validity);
                element.bind('blur', function (e, e2) {
                    if (ctrl.$invalid) {
                        isChangSpan(true);
                    }
                });
                element.bind('focus', function (e, e2) {
                    if (ctrl.$invalid) {
                        isChangSpan(false);
                    }
                });
            };
        }
        Object.defineProperty(PhoneProvingDirective.prototype, "link", {
            get: function () {
                return this._link;
            },
            set: function (value) {
                this._link = value;
            },
            enumerable: true,
            configurable: true
        });
        PhoneProvingDirective.instance = function () {
            return new PhoneProvingDirective();
        };
        PhoneProvingDirective.$inject = [];
        return PhoneProvingDirective;
    }());
    var MultipleDirective = (function () {
        function MultipleDirective() {
            this.restrict = 'A';
            this.require = 'ngModel';
            this.link = ValidProvide.multiplelinkFun('Multiple');
        }
        MultipleDirective.instance = function () {
            return new MultipleDirective();
        };
        MultipleDirective.$inject = [];
        return MultipleDirective;
    }());
    main_app_1.app
        .directive(ValidProvide.getDirectiveName('Nonempty'), EmptyProvingDirective.instance)
        .directive('validMultiple', MultipleDirective.instance)
        .directive('validPhone', PhoneProvingDirective.instance);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS92YWxpZC1pbnB1dC92YWxpZC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBZUE7UUFrSkk7UUFFQSxDQUFDO1FBRU0sb0JBQU8sR0FBZCxVQUFlLFNBQWlCO1lBRTVCLE1BQU0sQ0FBQyxVQUFVLEtBQVUsRUFBRSxPQUFZLEVBQUUsS0FBVSxFQUFFLElBQVM7Z0JBQzVELElBQUksYUFBYSxHQUFHLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDN0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUM7b0JBQ2pCLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNwQyxDQUFDLENBQUMsQ0FBQztnQkFDSCxxQkFBcUIsTUFBZTtvQkFDaEMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO29CQUN4RCxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQztvQkFDNUIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDVCxPQUFPLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsOEJBQTBCLFVBQVUsV0FBUSxFQUFFLE9BQU8sRUFBRTs0QkFDbkYsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQzs0QkFDbEIsSUFBSSxFQUFFLENBQUM7NEJBQ1AsUUFBUSxFQUFFLElBQUk7eUJBQ2pCLENBQUMsQ0FBQzt3QkFDSCxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUNuQyxDQUFDO29CQUFBLElBQUksQ0FBQSxDQUFDO3dCQUNGLE9BQU8sQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQ2xDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxD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ZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBUmhELENBQUM7UUFFTSwwQkFBUSxHQUFmO1lBQ0ksTUFBTSxDQUFDLElBQUksaUJBQWlCLEVBQUUsQ0FBQztRQUNuQyxDQUFDO1FBUk0seUJBQU8sR0FBa0IsRUFBRSxDQUFDO1FBYXZDLHdCQUFDO0tBZEQsQUFjQyxJQUFBO0lBSUQsY0FBRztTQUNFLFNBQVMsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLEVBQUUscUJBQXFCLENBQUMsUUFBUSxDQUFDO1NBQ3BGLFNBQVMsQ0FBQyxlQUFlLEVBQUUsaUJBQWlCLENBQUMsUUFBUSxDQUFDO1NBQ3RELFNBQVMsQ0FBQyxZQUFZLEVBQUUscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBSTNEIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vZGlyZWN0aXZlL3ZhbGlkLWlucHV0L3ZhbGlkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDpqozor4HovpPlhaXmlbDmja7nibnlrprmlbDmja7nmoTpqozor4FcclxuICogQHRpbWU6IDIwMTctMDQtMjcgMTA6MTA6MTVcclxuICogQHBhcmFtczpcclxuICogQHJldHVybjpcclxuICovXHJcbmltcG9ydCB7YXBwfSBmcm9tICcuLi8uLi9hcHAvbWFpbi5hcHAnO1xyXG5pbXBvcnQgXCJuZy1sYXllclwiO1xyXG5kZWNsYXJlIGxldCBsYXllcjphbnk7XHJcbmludGVyZmFjZSBJVmFsaWRSZXN1bHQge1xyXG4gICAgc3RhdHVzOiBib29sZWFuLFxyXG4gICAgbXNnOiBzdHJpbmcsXHJcbiAgICBpc1Nob3dUaXA6IGJvb2xlYW5cclxufVxyXG5cclxuY2xhc3MgVmFsaWRQcm92aWRlIHtcclxuICAgIHZhbGlkVHlwZTogQXJyYXk8c3RyaW5nPjtcclxuICAgIHN0YXRpYyBQUkVGSVhfTkFNRTogc3RyaW5nID0gJ3ZhbGlkJztcclxuXHJcbiAgICBzdGF0aWMgVkFMSURfVFlQRTogQXJyYXk8eyBuYW1lOiBzdHJpbmcsIHByb3ZpbmdUZXh0OiBGdW5jdGlvbiwgaXNWYWxpZDogRnVuY3Rpb24gfT4gPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAndmFsaWRNTWF4JyxcclxuICAgICAgICAgICAgcHJvdmluZ1RleHQ6IGZ1bmN0aW9uIChtYXhMPzogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ+i+k+WFpemVv+W6puS4jeiDvei2hei/hycgKyBtYXhMO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpc1ZhbGlkOiBmdW5jdGlvbiAocmVzdWx0OiBzdHJpbmcsIHBhcmFtczogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBWYWxpZFByb3ZpZGUudmFsaWRSZXN1bHQodHJ1ZSwgJycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KHBhcmFtcykpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWF4TCA9IHBhcnNlSW50KHBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1heEwgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ2YWxpZC1tLW1heCDkvKDnmoTmmK/mnIDlpKfplb/luqbvvIzlpKfkuo4gMFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFZhbGlkUHJvdmlkZS52YWxpZFJlc3VsdCh0cnVlLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gbWF4TCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gVmFsaWRQcm92aWRlLnZhbGlkUmVzdWx0KGZhbHNlLCB0aGlzLnByb3ZpbmdUZXh0KHBhcmFtcyksIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInZhbGlkLW0tbWF4IOS8oOeahOaYr+acgOWkp+mVv+W6pu+8jOW/hemhu+S4uuaVtOaVsFwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVmFsaWRQcm92aWRlLnZhbGlkUmVzdWx0KHRydWUsICcnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBWYWxpZFByb3ZpZGUudmFsaWRSZXN1bHQodHJ1ZSwgJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICd2YWxpZE1Ob25lbXB0eScsXHJcbiAgICAgICAgICAgIHByb3ZpbmdUZXh0OiBmdW5jdGlvbiAoc3RyPzogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyID8gc3RyICsgJ+S4uuW/heWhq+mhuScgOiAn5q2k6aG55Li65b+F5aGr6aG5JztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaXNWYWxpZDogZnVuY3Rpb24gKHJlc3VsdDogc3RyaW5nLCBwYXJhbXM6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgLy8gYWx0ZXIgd3lyIDIwMTcuNi4yNyDkv67mlLnliKTmlq0sIOW9k+S4um51bGzmiJbogIU9PT1cIlwi5pe25omN5Yik5a6a5rKh5pyJ5aGr5YC8XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09IG51bGwgfHwgcmVzdWx0ID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFZhbGlkUHJvdmlkZS52YWxpZFJlc3VsdChmYWxzZSwgdGhpcy5wcm92aW5nVGV4dChwYXJhbXMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBWYWxpZFByb3ZpZGUudmFsaWRSZXN1bHQodHJ1ZSwgJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICd2YWxpZE1QaG9uZScsXHJcbiAgICAgICAgICAgIHByb3ZpbmdUZXh0OiBmdW5jdGlvbiAoc3RyPzogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyIHx8ICfor7fovpPlhaXmraPnoa7nmoTmiYvmnLrlj7fnoIEnO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpc1ZhbGlkOiBmdW5jdGlvbiAocmVzdWx0OiBzdHJpbmcsIHBhcmFtczogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBWYWxpZFByb3ZpZGUudmFsaWRSZXN1bHQodHJ1ZSwgJycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmbGFnOiBib29sZWFuID0gL14xWzM0NTc4XVxcZHs5fSQvLnRlc3QocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIGlmIChmbGFnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFZhbGlkUHJvdmlkZS52YWxpZFJlc3VsdCh0cnVlLCAnJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBWYWxpZFByb3ZpZGUudmFsaWRSZXN1bHQoZmFsc2UsIHRoaXMucHJvdmluZ1RleHQocGFyYW1zKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ3ZhbGlkTUVtYWlsJyxcclxuICAgICAgICAgICAgcHJvdmluZ1RleHQ6IGZ1bmN0aW9uIChzdHI/OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdHIgfHwgJ+ivt+i+k+WFpeato+ehrueahOmCrueuseWcsOWdgCc7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGlzVmFsaWQ6IGZ1bmN0aW9uIChyZXN1bHQ6IHN0cmluZywgcGFyYW1zOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFZhbGlkUHJvdmlkZS52YWxpZFJlc3VsdCh0cnVlLCAnJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgZmxhZzogYm9vbGVhbiA9IC9eW0EtWmEtejAtOVxcdTRlMDAtXFx1OWZhNV0rQFthLXpBLVowLTlfLV0rKFxcLlthLXpBLVowLTlfLV0rKSskLy50ZXN0KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBWYWxpZFByb3ZpZGUudmFsaWRSZXN1bHQodHJ1ZSwgJycpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVmFsaWRQcm92aWRlLnZhbGlkUmVzdWx0KGZhbHNlLCB0aGlzLnByb3ZpbmdUZXh0KHBhcmFtcyksIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAndmFsaWRNSXAnLFxyXG4gICAgICAgICAgICBwcm92aW5nVGV4dDogZnVuY3Rpb24gKHN0cj86IG51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0ciB8fCAn6K+36L6T5YWl5q2j56Gu55qESXDlnLDlnYAnO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpc1ZhbGlkOiBmdW5jdGlvbiAocmVzdWx0OiBzdHJpbmcsIHBhcmFtczogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPIOaaguaXoGlw5Zyw5Z2A6aqM6K+BXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVjID09PT09PT09PT3mmoLml6BpcCDmoLzlvI8g6aqM6K+BPT09PT09PT09PT09PT1cIiwgXCJjb2xvcjpvcmFuZ2VcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVmFsaWRQcm92aWRlLnZhbGlkUmVzdWx0KHRydWUsICcnKTtcclxuICAgICAgICAgICAgICAgIC8qIGlmKCFyZXN1bHQpe1xyXG4gICAgICAgICAgICAgICAgICAgICByZXR1cm4gVmFsaWRQcm92aWRlLnZhbGlkUmVzdWx0KHRydWUsJycpO1xyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICBsZXQgZmxhZzpib29sZWFuID0gL15bQS1aYS16MC05XFx1NGUwMC1cXHU5ZmE1XStAW2EtekEtWjAtOV8tXSsoXFwuW2EtekEtWjAtOV8tXSspKyQvLnRlc3QocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICBpZihmbGFnKXtcclxuICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFZhbGlkUHJvdmlkZS52YWxpZFJlc3VsdCh0cnVlLCcnKTtcclxuICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFZhbGlkUHJvdmlkZS52YWxpZFJlc3VsdChmYWxzZSx0aGlzLnByb3ZpbmdUZXh0KHBhcmFtcyksZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICd2YWxpZE1Db2RlJyxcclxuICAgICAgICAgICAgcHJvdmluZ1RleHQ6IGZ1bmN0aW9uIChzdHI/OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdHIgfHwgJ+ivt+i+k+WFpeato+ehrueahElw5Zyw5Z2AJztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaXNWYWxpZDogZnVuY3Rpb24gKHJlc3VsdDogc3RyaW5nLCBwYXJhbXM6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETyDmmoLml6BDb2Rl5Zyw5Z2A6aqM6K+BXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVjID09PT09PT09PT3mmoLml6BDb2RlIOagvOW8jyDpqozor4E9PT09PT09PT09PT09PVwiLCBcImNvbG9yOm9yYW5nZVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBWYWxpZFByb3ZpZGUudmFsaWRSZXN1bHQodHJ1ZSwgJycpO1xyXG4gICAgICAgICAgICAgICAgLyogaWYoIXJlc3VsdCl7XHJcbiAgICAgICAgICAgICAgICAgcmV0dXJuIFZhbGlkUHJvdmlkZS52YWxpZFJlc3VsdCh0cnVlLCcnKTtcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgbGV0IGZsYWc6Ym9vbGVhbiA9IC9eW0EtWmEtejAtOVxcdTRlMDAtXFx1OWZhNV0rQFthLXpBLVowLTlfLV0rKFxcLlthLXpBLVowLTlfLV0rKSskLy50ZXN0KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgaWYoZmxhZyl7XHJcbiAgICAgICAgICAgICAgICAgcmV0dXJuIFZhbGlkUHJvdmlkZS52YWxpZFJlc3VsdCh0cnVlLCcnKTtcclxuICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICByZXR1cm4gVmFsaWRQcm92aWRlLnZhbGlkUmVzdWx0KGZhbHNlLHRoaXMucHJvdmluZ1RleHQocGFyYW1zKSxmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ3ZhbGlkTVBvcnQnLFxyXG4gICAgICAgICAgICBwcm92aW5nVGV4dDogZnVuY3Rpb24gKHN0cj86IG51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0ciB8fCAn6K+36L6T5YWl5q2j56Gu55qE56uv5Y+jJztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaXNWYWxpZDogZnVuY3Rpb24gKHJlc3VsdDogc3RyaW5nLCBwYXJhbXM6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETyDmmoLml6BQb3J0IOmqjOivgVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIlYyA9PT09PT09PT095pqC5pegUG9ydCDmoLzlvI/pqozor4E9PT09PT09PT09PT09PVwiLCBcImNvbG9yOm9yYW5nZVwiKTtcclxuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFZhbGlkUHJvdmlkZS52YWxpZFJlc3VsdCh0cnVlLCAnJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgZmxhZzogYm9vbGVhbjtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQocmVzdWx0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZsYWcgPSByZXN1bHQgIT0gJzAnO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVmFsaWRQcm92aWRlLnZhbGlkUmVzdWx0KHRydWUsICcnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFZhbGlkUHJvdmlkZS52YWxpZFJlc3VsdChmYWxzZSwgdGhpcy5wcm92aW5nVGV4dChwYXJhbXMpLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGxpbmtGdW4odmFsaWRUeXBlOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzY29wZTogYW55LCBlbGVtZW50OiBhbnksIGF0dHJzOiBhbnksIGN0cmw6IGFueSkge1xyXG4gICAgICAgICAgICBsZXQgZGlyZWN0aXZlTmFtZSA9IFZhbGlkUHJvdmlkZS5nZXREaXJlY3RpdmVOYW1lKHZhbGlkVHlwZSk7XHJcbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCgpPT57XHJcbiAgICAgICAgICAgICAgICBsYXllci5jbG9zZShlbGVtZW50LmxheWVySW5kZXgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gaXNDaGFuZ1NwYW4oaXNTaG93OiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXJyU3RyTmFtZSA9IChhdHRyc1tkaXJlY3RpdmVOYW1lXSB8fCAn5q2k6aG5JykgKyAn5Li65b+F5aGrJztcclxuICAgICAgICAgICAgICAgIGxldCBuZWVkQWRkRXJyb3JTcGFuID0gdHJ1ZTsgLy8g5piv5ZCm5Yy56YWN5YiwZXJyc3BhbiB0cnVl5Li65rKh5pyJ5Yy56YWN5YiwLCBmYWxzZeS4uuWMuemFjeWIsFxyXG4gICAgICAgICAgICAgICAgaWYgKGlzU2hvdykgeyAvLyDoi6XpnIDopoHlop7liqDplJnor69zcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5sYXllckluZGV4ID0gbGF5ZXIudGlwcyhgPGRpdiBjbGFzcz1cImVycm9yLW1zZ1wiPiR7ZXJyU3RyTmFtZX08L2Rpdj5gLCBlbGVtZW50LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpcHM6IFsxLCAnd2hpdGUnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlwc01vcmU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdlcnJvckNvbG9yJyk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKCdlcnJvckNvbG9yJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xvc2UoZWxlbWVudC5sYXllckluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBuZWVkQWRkRXJyb3JTcGFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmVlZEFkZEVycm9yU3BhbjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gdmFsaWRpdHkodmFsdWU/OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbGlkUmVzdWx0OiBib29sZWFuO1xyXG4gICAgICAgICAgICAgICAgdmFsaWRSZXN1bHQgPSAhIXZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3RybC4kc2V0VmFsaWRpdHkoZGlyZWN0aXZlTmFtZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNDaGFuZ1NwYW4oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjdHJsLiRzZXRWYWxpZGl0eShkaXJlY3RpdmVOYW1lLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgPT0gJ3VuZGVmaW5lZCcgPyAnJyA6IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlbGVtZW50LmJpbmQoJ2JsdXInLCBmdW5jdGlvbiAoZTogYW55LCBlMjogYW55KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3RybC4kaW52YWxpZCkgeyAgLy/pnZ7ms5Ug5Yik5pat5pi+56S66Z2e5rOV57G75Z6LXHJcbiAgICAgICAgICAgICAgICAgICAgaXNDaGFuZ1NwYW4odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZWxlbWVudC5iaW5kKCdmb2N1cycsIGZ1bmN0aW9uIChlOiBhbnksIGUyOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjdHJsLiRpbnZhbGlkKSB7ICAvL+mdnuazlSDliKTmlq3mmL7npLrpnZ7ms5XnsbvlnotcclxuICAgICAgICAgICAgICAgICAgICBpc0NoYW5nU3BhbihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY3RybC4kZm9ybWF0dGVycy5wdXNoKHZhbGlkaXR5KTtcclxuICAgICAgICAgICAgY3RybC4kcGFyc2Vycy5wdXNoKHZhbGlkaXR5KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB2YWxpZFJlc3VsdCA9IGZ1bmN0aW9uIChzdGF0dXM6IGJvb2xlYW4sIG1zZz86IHN0cmluZywgaXNTaG93VGlwPzogYm9vbGVhbikge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHN0YXR1czogc3RhdHVzLFxyXG4gICAgICAgICAgICBtc2c6IG1zZyB8fCAnJyxcclxuICAgICAgICAgICAgaXNTaG93VGlwOiBpc1Nob3dUaXAgfHwgZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBtdWx0aXBsZWxpbmtGdW4odmFsaWRUeXBlOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNjb3BlOiBhbnksIGVsZW1lbnQ6IGFueSwgYXR0cnM6IGFueSwgY3RybDogYW55KSB7XHJcbiAgICAgICAgICAgIGxldCBkaXJlY3RpdmVOYW1lID0gVmFsaWRQcm92aWRlLmdldERpcmVjdGl2ZU5hbWUodmFsaWRUeXBlKTtcclxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsKCk9PntcclxuICAgICAgICAgICAgICAgIGxheWVyLmNsb3NlKGVsZW1lbnQubGF5ZXJJbmRleCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBpc0NoYW5nU3Bhbihpc1Nob3c6IGJvb2xlYW4pOiBib29sZWFuIHtcclxuICAgICAgICAgICAgICAgIGxldCBlcnJTdHJOYW1lID0gKGF0dHJzW2RpcmVjdGl2ZU5hbWVdKTtcclxuICAgICAgICAgICAgICAgIGlmKCFlcnJTdHJOYW1lfHxlcnJTdHJOYW1lPT1cIlwiKXJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGxheWVyLmNsb3NlQWxsKCd0aXBzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmVlZEFkZEVycm9yU3BhbiA9IHRydWU7IC8vIOaYr+WQpuWMuemFjeWIsGVycnNwYW4gdHJ1ZeS4uuayoeacieWMuemFjeWIsCwgZmFsc2XkuLrljLnphY3liLBcclxuICAgICAgICAgICAgICAgIGlmIChpc1Nob3cpIHsgLy8g6Iul6ZyA6KaB5aKe5Yqg6ZSZ6K+vc3BhblxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQubGF5ZXJJbmRleCA9IGxheWVyLnRpcHMoYDxkaXYgY2xhc3M9XCJlcnJvci1tc2dcIj4ke2VyclN0ck5hbWV9PC9kaXY+YCwgZWxlbWVudCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXBzOiBbMSwgJ3doaXRlJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpcHNNb3JlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnZXJyb3JDb2xvcicpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcygnZXJyb3JDb2xvcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyLmNsb3NlKGVsZW1lbnQubGF5ZXJJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVlZEFkZEVycm9yU3BhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5lZWRBZGRFcnJvclNwYW47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHZhbGlkaXR5KHZhbHVlPzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgICAgIGxldCBhdHRyc1Jlc3VsdDogYW55LFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkUmVzdWx0OiBJVmFsaWRSZXN1bHQgPSB7c3RhdHVzOiB0cnVlLCBtc2c6ICcnLCBpc1Nob3dUaXA6IGZhbHNlfSxcclxuICAgICAgICAgICAgICAgICAgICBpOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVuOiBudW1iZXI7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBWYWxpZFByb3ZpZGUuVkFMSURfVFlQRS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzUmVzdWx0ID0gYXR0cnNbVmFsaWRQcm92aWRlLlZBTElEX1RZUEVbaV0ubmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhdHRyc1Jlc3VsdCA9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkUmVzdWx0ID0gVmFsaWRQcm92aWRlLlZBTElEX1RZUEVbaV0uaXNWYWxpZCh2YWx1ZSwgYXR0cnNSZXN1bHQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2YWxpZFJlc3VsdC5zdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0g5omT5Y2w5L2/55SoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gbGVuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh2YWxpZFJlc3VsdC5zdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdHJsLiRzZXRWYWxpZGl0eShkaXJlY3RpdmVOYW1lLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpc0NoYW5nU3BhbihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGN0cmwuJHNldFZhbGlkaXR5KGRpcmVjdGl2ZU5hbWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBhdHRycy4kc2V0KGRpcmVjdGl2ZU5hbWUsIHZhbGlkUmVzdWx0Lm1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkUmVzdWx0LmlzU2hvd1RpcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0NoYW5nU3Bhbih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0NoYW5nU3BhbihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlbGVtZW50LmJpbmQoJ2JsdXInLCBmdW5jdGlvbiAoZTogYW55LCBlMjogYW55KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3RybC4kaW52YWxpZCkgeyAgLy/pnZ7ms5Ug5Yik5pat5pi+56S66Z2e5rOV57G75Z6LXHJcbiAgICAgICAgICAgICAgICAgICAgaXNDaGFuZ1NwYW4odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBlbGVtZW50LmJpbmQoJ2ZvY3VzJywgZnVuY3Rpb24gKGU6IGFueSwgZTI6IGFueSkge1xyXG4gICAgICAgICAgICAvLyAgICAgaWYgKGN0cmwuJGludmFsaWQpIHsgIC8v6Z2e5rOVIOWIpOaWreaYvuekuumdnuazleexu+Wei1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGlzQ2hhbmdTcGFuKGZhbHNlKTtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgICAgICBjdHJsLiRmb3JtYXR0ZXJzLnB1c2godmFsaWRpdHkpO1xyXG4gICAgICAgICAgICBjdHJsLiRwYXJzZXJzLnB1c2godmFsaWRpdHkpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHN0YXRpYyBnZXREaXJlY3RpdmVOYW1lKHZhbGlkVHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIFZhbGlkUHJvdmlkZS5QUkVGSVhfTkFNRSArIHZhbGlkVHlwZTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAdGltZTogMjAxNy0wNC0yNyAxNjoxNDozMlxyXG4gKiBAcGFyYW1zOiB2YWxpZC1ub25lbXB0eSDkvb/nlKjkuI3kvKDlgLzliJnkuLrpu5jorqTmj5DnpLror60gICB2YWxpZC1ub25lbXB0eSA9ICdYWFgnICDmmL7npLrkuLogIFhYWCDkuLrlv4XloatcclxuICogQHJldHVybjpcclxuICovXHJcbmNsYXNzIEVtcHR5UHJvdmluZ0RpcmVjdGl2ZSB7XHJcbiAgICBzdGF0aWMgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaW5zdGFuY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFbXB0eVByb3ZpbmdEaXJlY3RpdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXN0cmljdDogc3RyaW5nID0gJ0EnO1xyXG4gICAgcmVxdWlyZTogc3RyaW5nID0gJ25nTW9kZWwnO1xyXG4gICAgbGluayA9IFZhbGlkUHJvdmlkZS5saW5rRnVuKCdOb25lbXB0eScpO1xyXG59XHJcblxyXG4vKipcclxuICpcclxuICogQHRpbWU6IDIwMTctMDQtMjcgMTU6NDQ6MzFcclxuICogQHBhcmFtczogdmFsaWQtcGhvbmUgIOW9k+WAvOS4uiAtMSDnmoTml7blgJnkuLrpnZ7lv4XpobvloavlhpnpobkgIOS4jeWhq+m7mOiupCDlv4Xloasg5bm25pi+56S66buY6K6k5o+Q56S6ICDlhbbku5Yg6buY6K6k5b+F5aGr5ZCM5pe25L2c5Li65pi+56S65YaF5a65XHJcbiAqIEByZXR1cm46XHJcbiAqL1xyXG5jbGFzcyBQaG9uZVByb3ZpbmdEaXJlY3RpdmUge1xyXG4gICAgZ2V0IGxpbmsoKTogKHNjb3BlOiBhbnksIGVsZW1lbnQ6IGFueSwgYXR0cnM6IGFueSwgY3RybDogYW55KSA9PiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9saW5rO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBsaW5rKHZhbHVlOiAoc2NvcGU6IGFueSwgZWxlbWVudDogYW55LCBhdHRyczogYW55LCBjdHJsOiBhbnkpID0+IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2xpbmsgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpbnN0YW5jZSgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFBob25lUHJvdmluZ0RpcmVjdGl2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc3RyaWN0OiBzdHJpbmcgPSAnRUEnO1xyXG4gICAgcmVxdWlyZTogc3RyaW5nID0gJ25nTW9kZWwnO1xyXG4gICAgcHJpdmF0ZSBfbGluayA9IGZ1bmN0aW9uIChzY29wZTogYW55LCBlbGVtZW50OiBhbnksIGF0dHJzOiBhbnksIGN0cmw6IGFueSkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGlzQ2hhbmdTcGFuKGlzU2hvdzogYm9vbGVhbiwgcHJvdmluZ1N0cj86IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBsZXQgZXJyU3RyTmFtZSA9IChwcm92aW5nU3RyIHx8ICfor7fovpPlhaXmraPnoa7nmoTmiYvmnLrlj7fnoIEnKTtcclxuICAgICAgICAgICAgLy9lbGVtZW50LnBhcmVudCgpLmZpbmQoXCJzcGFuXCIpLnJlbW92ZSgpOy8v4oCTIOmZkOWumumAmui/h+agh+etvuWQjeensOafpeaJvlxyXG4gICAgICAgICAgICBsZXQgbmVlZEFkZEVycm9yU3BhbiA9IHRydWU7IC8vIOaYr+WQpuWMuemFjeWIsGVycnNwYW4gdHJ1ZeS4uuayoeacieWMuemFjeWIsCwgZmFsc2XkuLrljLnphY3liLBcclxuICAgICAgICAgICAgaWYgKGlzU2hvdykgeyAvLyDoi6XpnIDopoHlop7liqDplJnor69zcGFuXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmxheWVySW5kZXggPSBsYXllci50aXBzKGA8ZGl2IGNsYXNzPVwiZXJyb3ItbXNnXCI+JHtlcnJTdHJOYW1lfTwvZGl2PmAsIGVsZW1lbnQsIHtcclxuICAgICAgICAgICAgICAgICAgICB0aXBzOiBbMSwgJ3doaXRlJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZTogMCxcclxuICAgICAgICAgICAgICAgICAgICB0aXBzTW9yZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdlcnJvckNvbG9yJyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcygnZXJyb3JDb2xvcicpO1xyXG4gICAgICAgICAgICAgICAgbGF5ZXIuY2xvc2UoZWxlbWVudC5sYXllckluZGV4KTtcclxuICAgICAgICAgICAgICAgIG5lZWRBZGRFcnJvclNwYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbmVlZEFkZEVycm9yU3BhbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHZhbGlkaXR5KHZhbHVlPzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgbGV0IHZhbGlkUmVzdWx0OiBib29sZWFuO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT0gMTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZFJlc3VsdCA9IC9eMVszNDU3OF1cXGR7OX0kLy50ZXN0KHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhbGlkUmVzdWx0ID0gKGF0dHJzLnZhbGlkUGhvbmUgPT0gLTEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodmFsaWRSZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGN0cmwuJHNldFZhbGlkaXR5KCd2YWxpZFBob25lJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBpc0NoYW5nU3BhbihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAvL2F0dHJzLiRzZXQoJ3Rvb2x0aXAnLCcnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN0cmwuJHNldFZhbGlkaXR5KCd2YWxpZFBob25lJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgLy9pc0NoYW5nU3Bhbih0cnVlKTtcclxuICAgICAgICAgICAgICAgIC8vYXR0cnMuJHNldCgndG9vbHRpcCcsJ+mqjOivgeWHuumUmeivtOaYjicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PSAndW5kZWZpbmVkJyA/ICcnIDogdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjdHJsLiRmb3JtYXR0ZXJzLnB1c2godmFsaWRpdHkpO1xyXG4gICAgICAgIGN0cmwuJHBhcnNlcnMucHVzaCh2YWxpZGl0eSk7XHJcbiAgICAgICAgZWxlbWVudC5iaW5kKCdibHVyJywgZnVuY3Rpb24gKGU6IGFueSwgZTI6IGFueSkge1xyXG4gICAgICAgICAgICBpZiAoY3RybC4kaW52YWxpZCkgeyAgLy/pnZ7ms5Ug5Yik5pat5pi+56S66Z2e5rOV57G75Z6LXHJcbiAgICAgICAgICAgICAgICBpc0NoYW5nU3Bhbih0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGVsZW1lbnQuYmluZCgnZm9jdXMnLCBmdW5jdGlvbiAoZTogYW55LCBlMjogYW55KSB7XHJcbiAgICAgICAgICAgIGlmIChjdHJsLiRpbnZhbGlkKSB7ICAvL+mdnuazlSDliKTmlq3mmL7npLrpnZ7ms5XnsbvlnotcclxuICAgICAgICAgICAgICAgIGlzQ2hhbmdTcGFuKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTXVsdGlwbGVEaXJlY3RpdmUge1xyXG4gICAgc3RhdGljICRpbmplY3Q6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGluc3RhbmNlKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgTXVsdGlwbGVEaXJlY3RpdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXN0cmljdDogc3RyaW5nID0gJ0EnO1xyXG4gICAgcmVxdWlyZTogc3RyaW5nID0gJ25nTW9kZWwnO1xyXG4gICAgbGluayA9IFZhbGlkUHJvdmlkZS5tdWx0aXBsZWxpbmtGdW4oJ011bHRpcGxlJyk7XHJcbn1cclxuXHJcblxyXG5cclxuYXBwXHJcbiAgICAuZGlyZWN0aXZlKFZhbGlkUHJvdmlkZS5nZXREaXJlY3RpdmVOYW1lKCdOb25lbXB0eScpLCBFbXB0eVByb3ZpbmdEaXJlY3RpdmUuaW5zdGFuY2UpXHJcbiAgICAuZGlyZWN0aXZlKCd2YWxpZE11bHRpcGxlJywgTXVsdGlwbGVEaXJlY3RpdmUuaW5zdGFuY2UpXHJcbiAgICAuZGlyZWN0aXZlKCd2YWxpZFBob25lJywgUGhvbmVQcm92aW5nRGlyZWN0aXZlLmluc3RhbmNlKVxyXG5cclxuXHJcblxyXG47XHJcbi8vVE9ETyDooajljZXpqozor4Hor7TmmI4g77yaXHJcbi8vIDEuIOWcqOaVtOS4quihqOWNleWGheW1jOWllyA8Zm9ybSBuYW1lPVwi6KGo5Y2V5ZCNXCI+PC9mb3JtPlxyXG4vLyAyLiDmj5DkuqTmjInpkq4gPGJvdHRvbSAgbmctZGlzYWJsZWQ9XCLooajljZXlkI0uJGludmFsaWRcIj48L2JvdHRvbT4g5o6n5Yi25qOA5p+lIOihqOWNleWGhemcgOimgemqjOivgeW3sumAmui/hyAg5oyJ6ZKu5pyJ5pWIXHJcbi8vIDMuIOavj+S4qui+k+WFpeihjCDmoLzlvI8g5bWM5aWXICzovpPlhaXmoIfnrb4g54i257qn5YirIOS4uiBjbGFzcyBmb3JtIOS/neivgSDplJnor6/mj5DnpLrmraPnoa4g5o+S5YWl5pi+56S6XHJcbi8vICAgICAgPGRpdiBjbGFzcz1cImZvcm1cIj5cclxuLy8gICAgICAgICAgPHNwYW4gIGNsYXNzPVwidGl0bGVcIiBzdHlsZT1cInRleHQtaW5kZW50OiAxMHB4XCI+5o+P6L+wPC9zcGFuPlxyXG4vL1xyXG4vLyAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJ0ZXh0IHUtdGV4dGFyZWFcIiBuZy1tb2RlbD1cInZzdXBDdHJsLmN1cnJlbnRTZXJ2ZS5EZXNjcmlwdGlvblwiIHBsYWNlaG9sZGVyPVwi5o+P6L+wXCIgcm93cz1cIjNcIj48L3RleHRhcmVhPlxyXG4vL1xyXG4vLyAgICAgPC9kaXY+XHJcbiJdfQ==
