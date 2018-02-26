"use strict";
exports.__esModule = true;
var log4js = require("log4js");
var util = require("util");
/**
 * Created by dell on 2017/7/31.
 */
var DaoContext = (function () {
    function DaoContext() {
        this.daos = {};
    }
    DaoContext.prototype.getDao = function (className) {
        if (this.daos[className]) {
            return this.daos[className];
        }
        else {
            DaoContext.LOGGER.error(util.format("DaoContext.getDao error %s is not exist", className));
            return null;
        }
    };
    ;
    DaoContext.prototype.saveDao = function (dao) {
        this.daos[dao.DaoName] = dao;
    };
    DaoContext.LOGGER = log4js.getLogger("DaoContext");
    return DaoContext;
}());
var BeanFactory = (function () {
    function BeanFactory() {
    }
    BeanFactory.instance = function () {
        if (this.context == null) {
            this.context = new DaoContext();
        }
        return this.context;
    };
    return BeanFactory;
}());
var BeanHelper = (function () {
    function BeanHelper() {
    }
    BeanHelper.getDao = function (className) {
        var context = BeanFactory.instance();
        return context.getDao(className);
    };
    BeanHelper.saveDao = function (dao) {
        BeanFactory.instance().saveDao(dao);
    };
    return BeanHelper;
}());
exports.BeanHelper = BeanHelper;
