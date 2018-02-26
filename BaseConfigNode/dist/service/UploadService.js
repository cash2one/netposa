"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCode_1 = require("../common/res/ErrorCode");
const util = require("util");
const Promise = require("promise");
const DaoType_1 = require("../dao/enum/DaoType");
const BeanHelper_1 = require("../common/help/BeanHelper");
class UploadService {
    imageUpload(image, fields) {
        return Promise.resolve(null)
            .then(validateParams)
            .then(() => {
            let storeType = {}, imageCategory = {}, commandType = {}, detectType = {};
            Object.keys(fields).forEach(function (key) {
                if (key == "storeType") {
                    storeType[key] = fields[key][0];
                }
                if (key == "imageCategory") {
                    storeType[key] = fields[key][0];
                }
                if (key == "commandType") {
                    commandType[key] = fields[key][0];
                }
                if (key == "detectType") {
                    detectType[key] = fields[key][0];
                }
            });
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.OtherDao).imageUpload(image, storeType, imageCategory, commandType, detectType);
        });
        function validateParams() {
            if (!image || UploadService.isEmptyObject(image)) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_Image_Upload);
            }
            if (fields && util.isArray(fields) && fields.length <= 0) {
                return Promise.reject(ErrorCode_1.default.ERROR_INVALID_PARAMETER);
            }
            let keys = Object.keys(fields).join(",");
            if (keys.indexOf("storeType") < 0) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_STORE_TYPE);
            }
            if (keys.indexOf("imageCategory") < 0) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_Image_Category);
            }
            ;
            return null;
        }
    }
    faceImageUpload(image, fields) {
        return Promise.resolve(null)
            .then(validateParams)
            .then(() => {
            let storeType = {}, imageCategory = {};
            Object.keys(fields).forEach(function (key) {
                let fieldparam = {};
                if (key == "storeType") {
                    storeType[key] = fields[key][0];
                }
                if (key == "imageCategory") {
                    imageCategory[key] = fields[key][0];
                }
            });
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.OtherDao).faceImageUpload(image, storeType, imageCategory);
        });
        function validateParams() {
            if (!image || UploadService.isEmptyObject(image)) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_Image_Upload);
            }
            return null;
        }
    }
    static isEmptyObject(jsonObj) {
        var t;
        for (t in jsonObj)
            return !1;
        return !0;
    }
}
exports.UploadService = UploadService;
