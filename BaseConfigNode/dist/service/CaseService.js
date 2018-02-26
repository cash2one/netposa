"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const BeanHelper_1 = require("../common/help/BeanHelper");
const DaoType_1 = require("../dao/enum/DaoType");
class CaseService {
    constructor() {
    }
    findCascadeList(params) {
        return Promise.resolve(null).then(() => {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AreaDao).findAreaResourceCascadeList(params);
        });
    }
}
CaseService.LOGGER = log4js.getLogger("CameraService");
exports.CaseService = CaseService;
