"use strict";
exports.__esModule = true;
var JoinType_1 = require("./JoinType");
var ChildWhere = (function () {
    function ChildWhere() {
        //匹配类型
        this.JType = JoinType_1["default"].And;
    }
    return ChildWhere;
}());
exports["default"] = ChildWhere;
