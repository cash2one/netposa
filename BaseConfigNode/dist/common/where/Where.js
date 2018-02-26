"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JoinType_1 = require("./JoinType");
class Where {
    constructor() {
        this.JType = JoinType_1.default.And;
        this.Childs = new Array();
    }
}
exports.default = Where;
