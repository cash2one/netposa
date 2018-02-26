/**
 * Created by dell on 2017/5/15.
 */
import * as log4js from "log4js";
import * as util from "util";
export default class PortraitNodeTool{
    private static LOGGER = log4js.getLogger("PortraitNodeTool");
    /*
     *将Date/String类型,解析为String类型.
     *传入String类型,则先解析为Date类型
     *不正确的Date,返回 ''
     *如果时间部分为0,则忽略,只返回日期部分.
     *日期格式对应字符如下(年-yyyy,月-MM,日-dd,时-hh,分-mm,秒-ss,毫秒-S 字符区分大小写)
     */
    static formatDate = function(v: Date & string & any, format?: string): string{
        if(!format){
            format = "yyyy-MM-dd hh:mm:ss";
        }
        if(typeof v == 'string') v = PortraitNodeTool.parseDate(v);
        if(!(v instanceof Date)){
            return '';
        }
        var o: any = {
            "M+" : v.getMonth()+1, //month
            "d+" : v.getDate(), //day
            "h+" : v.getHours(), //hour
            "m+" : v.getMinutes(), //minute
            "s+" : v.getSeconds(), //second
            "q+" : Math.floor((v.getMonth()+3)/3), //quarter
            "S" : v.getMilliseconds() //millisecond
        };

        if(/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (v.getFullYear()+"").substr(4 - RegExp.$1.length));
        }

        for(var k in o) {
            if(new RegExp("("+ k +")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
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
    static parseDate(str: any){
        if(typeof str == 'string'){
            var results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);
            if(results && results.length>3)
                return new Date(parseInt(results[1],10),parseInt(results[2],10) -1,parseInt(results[3],10));
            results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);
            if(results && results.length>6)
                return new Date(parseInt(results[1],10),parseInt(results[2],10) -1,parseInt(results[3],10),parseInt(results[4],10),parseInt(results[5],10),parseInt(results[6],10));
            results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,5}) *$/);
            if(results && results.length>7)
                return new Date(parseInt(results[1],10),parseInt(results[2],10) -1,parseInt(results[3],10),parseInt(results[4],10),parseInt(results[5],10),parseInt(results[6],10),parseInt(results[7],10));
        }
        return null;
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
    }

        /**
     * 判断字符串是否是空字符
     * @param str
     * @returns {boolean}
     */
    static isEmptyString(str?: string){
        // 判断null 和 undefined
        if(str == null){
            return true;
        }
        // 判断是否为字符串
        if(typeof str !== 'string'){
            return false;
        }
        // 判断是否为""
        if(str.trim() === ""){
            return true;
        }
        return false;
    }

        /**
     * 由于部分json转换向进行try,catch, 故在这里写个公共方法, 统一捕获异常
     * @param str
     */
    static parseJSONCatchError(str: string): any{
        let result;
        // 如果为null undefined ""等 解析肯定报错, 故都直接返回
        if(PortraitNodeTool.isEmptyString(str)) return result;
        try{
            result = JSON.parse(str);
        }catch(e){
            PortraitNodeTool.LOGGER.error(util.format("CommonUtil.ParseJsonCatchError error = %s %s", e && e.toString(), e && e.stack));
        }
        return result;
    }

}