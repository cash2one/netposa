import "jquery.md5";
import "angular";
import "ua-parser-js";

declare var $: any;
declare var angular: any;
declare var require: any;
let UAParser = require("ua-parser-js");
import {TreeType} from "../../core/enum/TreeType";
import {OperFitstModule} from "../../core/entity/OperFirstModule";
import {OperSecondModule} from "../../core/entity/OperSecondModule";
import {OperThirdModule} from "../../core/entity/OperThirdModule";

/**
 * 监控比对系统的工具类
 * 此工具类不包含任何业务逻辑判断
 */
export default class PortraitTool {

    /**
     * 初始化获得浏览器版本
     */
    private static browser: any = (() => {
        return new UAParser().getResult().browser;
    })();

    /**
     * 获取浏览器版本
     * @returns {any}
     */
    static getBrowser() {
        return PortraitTool.browser;
    }

    /**
     * 获取ie的版本
     * 若不是ie, 则返回0
     * @returns {number}
     */
    static getIEVer() {
        var result = 0;
        if (PortraitTool.browser.name.toUpperCase() == 'IE') {
            result = Number(PortraitTool.browser.major);
        }
        return result;
    };

    /**
     * 转换为ztree的树形结构(带children的结构)
     * @param nodes 传入的结构
     * @param idKey
     * @param parentKey
     * @param childKey
     */
    static convert2Ztree = function (sNodes: any, idKey: string, parentKey: string, childKey: string) {
        var i, l,
            key = idKey,
            parentKey = parentKey,
            childKey = childKey;
        var r = [];
        var tmpMap = [];
        for (i = 0, l = sNodes.length; i < l; i++) {
            tmpMap[sNodes[i][key]] = sNodes[i];
        }
        for (i = 0, l = sNodes.length; i < l; i++) {
            if (tmpMap[sNodes[i][parentKey]] && sNodes[i][key] != sNodes[i][parentKey]) {
                if (!tmpMap[sNodes[i][parentKey]][childKey])
                    tmpMap[sNodes[i][parentKey]][childKey] = [];
                tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i]);
            } else {
                r.push(sNodes[i]);
            }
        }
        return r;
    };

    /**
     * 深拷贝, 可以提取公共方法
     */
    static deepCopy = function (o: any) {
        if (o instanceof Array) {
            let n: any = [];
            for (let i = 0; i < o.length; ++i) {
                n[i] = this.deepCopy(o[i]);
            }
            return n;

        } else if (o instanceof Object) {
            let n: any = {};
            for (let i in o) {
                n[i] = this.deepCopy(o[i]);
            }
            return n;
        } else {
            return o;
        }
    };


    /**
     *
     * @time: 2017-07-27 15:00:13
     * @params:
     * @return:
     */
    static getLocalStorageData(key: string) {
        let result: any = null;
        try {
            result = angular.fromJson(localStorage.getItem(key));
        } catch (e) {
            result = null;
        }
        return result;
    }


    /**
     * md5加密
     * @param origin
     * @returns {string}
     */
    static md5 = function (origin: string): string {
        return $.md5(origin);
    };

    /*
     *将Date/String类型,解析为String类型.
     *传入String类型,则先解析为Date类型
     *不正确的Date,返回 ''
     *如果时间部分为0,则忽略,只返回日期部分.
     *日期格式对应字符如下(年-yyyy,月-MM,日-dd,时-hh,分-mm,秒-ss,毫秒-S 字符区分大小写)
     */
    static formatDate = function (v: Date & string & any, format?: string): string {
        if (!format) {
            format = "yyyy-MM-dd hh:mm:ss";
        }
        if (typeof v == 'string') v = this.parseDate(v);
        if (!(v instanceof Date)) {
            return '';
        }
        var o: any = {
            "M+": v.getMonth() + 1, //month
            "d+": v.getDate(), //day
            "h+": v.getHours(), //hour
            "m+": v.getMinutes(), //minute
            "s+": v.getSeconds(), //second
            "q+": Math.floor((v.getMonth() + 3) / 3), //quarter
            "S": v.getMilliseconds() //millisecond
        };

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (v.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    };

    /*
     将String类型解析为Date类型.
     parseDate('2006-1-1') return new Date(2006,0,1)
     parseDate(' 2006-1-1 ') return new Date(2006,0,1)
     parseDate('2006-1-1 15:14:16') return new Date(2006,0,1,15,14,16)
     parseDate(' 2006-1-1 15:14:16 ') return new Date(2006,0,1,15,14,16);
     parseDate('2006-1-1 15:14:16.254') return new Date(2006,0,1,15,14,16,254)
     parseDate(' 2006-1-1 15:14:16.254 ') return new Date(2006,0,1,15,14,16,254)
     parseDate('不正确的格式') retrun null
     */
    static parseDate = function (str: any) {
        if (typeof str == 'string') {
            var results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);
            if (results && results.length > 3)
                return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10));
            results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);
            if (results && results.length > 6)
                return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10), parseInt(results[6], 10));
            results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,5}) *$/);
            if (results && results.length > 7)
                return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10), parseInt(results[6], 10), parseInt(results[7], 10));
        }
        return null;
    };

    static addYears = function (date: Date, value: number) {
        date.setFullYear(date.getFullYear() + value);
        return date;
    };
    //增加天
    static addDays = function (date: Date, value: number) {
        date.setDate(date.getDate() + value);
        return date;
    };
    //增加小时
    static addHours = function (date: Date, value: number) {
        date.setHours(date.getHours() + value);
        return date;
    };
    static addSeconds = function (date: Date, value: number) {
        date.setSeconds(date.getSeconds() + value);
        return date;
    };
    static addMinutes = function(date: Date, value: number){
        date.setMinutes(date.getMinutes() + value);
        return date;
    }

    /**
     * 仿照jquery.extend方法
     * 使用方式  extend({}, {}); 深拷贝 extend(true, {}, {});
     * @returns {any|{}}
     */
    static extend(__params1?: any, __params2?: any, __params3?: any, __params4?: any): any {
        var options: any, name: any, src: any, copy: any, copyIsArray: any, clone: any,
            target: any = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false,
            toString = Object.prototype.toString,
            hasOwn = Object.prototype.hasOwnProperty,
            push = Array.prototype.push,
            slice = Array.prototype.slice,
            trim = String.prototype.trim,
            indexOf = Array.prototype.indexOf,
            class2type: any = {
                "[object Boolean]": "boolean",
                "[object Number]": "number",
                "[object String]": "string",
                "[object Function]": "function",
                "[object Array]": "array",
                "[object Date]": "date",
                "[object RegExp]": "regexp",
                "[object Object]": "object"
            },
            jQuery: any = {
                isFunction: function (obj: any) {
                    return jQuery.type(obj) === "function"
                },
                isArray: Array.isArray ||
                function (obj: any) {
                    return jQuery.type(obj) === "array"
                },
                isWindow: function (obj: any) {
                    return obj != null && obj == obj.window
                },
                isNumeric: function (obj: any) {
                    return !isNaN(parseFloat(obj)) && isFinite(obj)
                },
                type: function (obj: any) {
                    return obj == null ? String(obj) : class2type[toString.call(obj)] || "object"
                },
                isPlainObject: function (obj: any) {
                    if (!obj || jQuery.type(obj) !== "object" || obj.nodeType) {
                        return false
                    }
                    try {
                        if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                            return false
                        }
                    } catch (e) {
                        return false
                    }
                    var key;
                    for (key in obj) {
                    }
                    return key === undefined || hasOwn.call(obj, key)
                }
            };
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            i = 2;
        }
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {}
        }
        if (length === i) {
            target = this;
            --i;
        }
        for (i; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue
                    }
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : []
                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }
                        // WARNING: RECURSION
                        target[name] = PortraitTool.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    }

    public static getUUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     *  将列表中的 不同指定类型（currentType）的子节点归结到 虚拟新子节点中
     * @time: 2017-08-23 15:19:50
     * @params: currentType：string 指定类型
     * @params: multipleDataList：Array<Array<any> 数据源， 默认第一个数组含有currentType类型节点
     * @params: newChildName：string  新虚拟子节点名称 追加名称字符串
     * @params: nameKey：string  新虚拟子节点名称 属性名
     * @params: idKeyName：string   树标识 id 属性 名
     * @params: pidKeyName：string   树父级标识父id  属性 名
     * @params: treeTypeKey：string  树类型 属性 名
     * @return:
     */
    static classifyDiffChild(params: ClassifyDiffChildParams, multipleDataList: Array<Array<any>>): Array<any> {
        let idAddStr = "+";
        let selfName = "（" + (!!params.newChildName ? params.newChildName : "本区域") + "）";
        let defaultParams = {
            newChildNameStr: selfName,
            nameKeyStr: !!params.nameKey ? params.nameKey : "Name",
            treeIdKey: !!params.idKeyName ? params.idKeyName : "treeID",
            treePidKey: !!params.pidKeyName ? params.pidKeyName : "treeParentId",
            treeTypeKey: !!params.treeTypeKey ? params.treeTypeKey : "treeType",
            currentType: !!params.currentType ? params.currentType : TreeType.area.value
        };
        // console.log("%c classifyDiffChild 参数数据===========","color:green");
        // console.log(defaultParams);

        // 转新增节点
        let convertAddNode = (nodeData: any, newChildName: string, newChildKey: string) => {
            let nameKey: string = defaultParams.nameKeyStr;
            let newNode = angular.copy(nodeData);
            newNode[nameKey] = newChildName + newNode[nameKey];
            newNode[defaultParams.treePidKey] = nodeData[defaultParams.treeIdKey];
            newNode[defaultParams.treeIdKey] = idAddStr + nodeData[defaultParams.treeIdKey];
            return newNode;

        };

        let mainTypeNodes = [] as Array<any>,
            mainTypeNodesMap = {} as { [key: string]: any },
            addNodes = [] as Array<any>,
            diffNodes = [] as Array<any>;
        // 综合 列表分类
        angular.forEach(multipleDataList[0], (val: { [key: string]: string }) => {
            if (val[defaultParams.treeTypeKey] === defaultParams.currentType) {
                mainTypeNodesMap[val[defaultParams.treeIdKey]] = val;
                mainTypeNodes.push(val);
            } else {
                diffNodes.push(val);
            }
        });
        // console.log(mainTypeNodes);
        // console.log(diffNodes);
        // 非综合节点 数组连接
        angular.forEach(multipleDataList, (val: Array<any>, i: number) => {
            if (i > 0 && angular.isArray(val)) {
                diffNodes = diffNodes.concat(val);
            }
        });
        // console.log(mainTypeNodes);
        // console.log(diffNodes);
        let addNode: any = null;
        let addNodeMap = {} as { [key: string]: boolean };
        angular.forEach(diffNodes, (val: { [key: string]: string }) => {
            addNode = mainTypeNodesMap[val[defaultParams.treePidKey]];
            if (val[defaultParams.treePidKey] && addNode && (val[defaultParams.treeTypeKey] !== defaultParams.currentType)) {
                if (!addNodeMap[val[defaultParams.treePidKey]]) {
                    addNodeMap[val[defaultParams.treePidKey]] = true;
                    addNode = convertAddNode(addNode, defaultParams.newChildNameStr, defaultParams.nameKeyStr);
                    addNodes.push(addNode);
                } else {

                }
                val[defaultParams.treePidKey] = idAddStr + val[defaultParams.treePidKey];
            }
        });
        // console.log("%c classifyDiffChild 转换后数据，defaultParams，mainTypeNodes，diffNodes ，addNodes===========","color:green");
        // console.log(defaultParams);
        // console.log(mainTypeNodes);
        // console.log(diffNodes);
        // console.log(addNodes);
        // console.log("%c classifyDiffChild 转换后数据，defaultParams，mainTypeNodes，diffNodes ，addNodes===========","color:green");

        return addNodes.concat(mainTypeNodes, diffNodes);
    }

    /**\
     *  根据英文模块名拿到中文模块名
     */
    static getChineseModuleName(moduleName:string){
        let FitstModule:any = angular.copy(OperFitstModule);
        let SecondModule:any = angular.copy(OperSecondModule);
        let ThirdModule:any = angular.copy(OperThirdModule);
        if(FitstModule[moduleName]){
            return FitstModule[moduleName].name
        }else if(SecondModule[moduleName]){
            return SecondModule[moduleName].name
        }else if(ThirdModule[moduleName]){
            return ThirdModule[moduleName].name
        }else{
            return ""
        }
    }

};

export class ClassifyDiffChildParams {
    currentType: string;
    newChildName: string;
    nameKey: string;
    idKeyName: string;
    pidKeyName: string;
    treeTypeKey: string;

    constructor() {
        this.currentType = TreeType.area.value;
        this.newChildName = "（本部）";
        this.nameKey = "Name";
        this.idKeyName = "treeID";
        this.pidKeyName = "treeParentId";
        this.treeTypeKey = "treeType";
    }
}

