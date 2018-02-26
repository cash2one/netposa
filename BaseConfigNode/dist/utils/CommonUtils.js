"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const util = require("util");
class PortraitNodeTool {
    static parseDate(str) {
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
    }
    ;
    static isEmptyString(str) {
        if (str == null) {
            return true;
        }
        if (typeof str !== 'string') {
            return false;
        }
        if (str.trim() === "") {
            return true;
        }
        return false;
    }
    static parseJSONCatchError(str) {
        let result;
        if (PortraitNodeTool.isEmptyString(str))
            return result;
        try {
            result = JSON.parse(str);
        }
        catch (e) {
            PortraitNodeTool.LOGGER.error(util.format("CommonUtil.ParseJsonCatchError error = %s %s", e && e.toString(), e && e.stack));
        }
        return result;
    }
}
PortraitNodeTool.LOGGER = log4js.getLogger("PortraitNodeTool");
PortraitNodeTool.formatDate = function (v, format) {
    if (!format) {
        format = "yyyy-MM-dd hh:mm:ss";
    }
    if (typeof v == 'string')
        v = PortraitNodeTool.parseDate(v);
    if (!(v instanceof Date)) {
        return '';
    }
    var o = {
        "M+": v.getMonth() + 1,
        "d+": v.getDate(),
        "h+": v.getHours(),
        "m+": v.getMinutes(),
        "s+": v.getSeconds(),
        "q+": Math.floor((v.getMonth() + 3) / 3),
        "S": v.getMilliseconds()
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
PortraitNodeTool.convert2Ztree = function (sNodes, idKey, parentKey, childKey) {
    var i, l, key = idKey, parentKey = parentKey, childKey = childKey;
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
        }
        else {
            r.push(sNodes[i]);
        }
    }
    return r;
};
exports.default = PortraitNodeTool;
