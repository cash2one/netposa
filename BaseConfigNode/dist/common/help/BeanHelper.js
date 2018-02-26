"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const util = require("util");
class DaoContext {
    constructor() {
        this.daos = {};
    }
    getDao(className) {
        if (this.daos[className]) {
            return this.daos[className];
        }
        else {
            DaoContext.LOGGER.error(util.format("DaoContext.getDao error %s is not exist", className));
            return null;
        }
    }
    ;
    saveDao(dao) {
        this.daos[dao.DaoName] = dao;
    }
}
DaoContext.LOGGER = log4js.getLogger("DaoContext");
class BeanFactory {
    static instance() {
        if (this.context == null) {
            this.context = new DaoContext();
        }
        return this.context;
    }
}
class BeanHelper {
    static getDao(className) {
        let context = BeanFactory.instance();
        return context.getDao(className);
    }
    static saveDao(dao) {
        BeanFactory.instance().saveDao(dao);
    }
}
exports.BeanHelper = BeanHelper;
