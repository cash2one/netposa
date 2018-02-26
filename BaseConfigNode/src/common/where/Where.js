"use strict";
exports.__esModule = true;
var JoinType_1 = require("./JoinType");
var Where = (function () {
    function Where() {
        //匹配类型
        this.JType = JoinType_1["default"].And;
        //子查询条件
        this.Childs = new Array();
    }
    return Where;
}());
exports["default"] = Where;
