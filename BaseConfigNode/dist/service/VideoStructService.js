"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const TaskType_1 = require("../core/server/enum/TaskType");
const ResponseResult_1 = require("../core/params/result/ResponseResult");
const Where_1 = require("../common/Where");
const ErrorCode_1 = require("../common/res/ErrorCode");
const WhereLib_1 = require("../model/WhereLib");
const FildNameLib_1 = require("../model/FildNameLib");
const DaoType_1 = require("../dao/enum/DaoType");
const BeanHelper_1 = require("../common/help/BeanHelper");
const Area_1 = require("../extend/Area");
const log4js = require("log4js");
const util = require("util");
const AuthStatus_1 = require("../core/server/enum/AuthStatus");
const TaskConfigService_1 = require("./TaskConfigService");
class VideoStructService {
    FindFaceList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.areaId) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let res = yield Promise.all([VideoStructService.FaceList(params), VideoStructService.UserList()]);
            let faceArr = Array.isArray(res[0].data) ? res[0].data : [];
            let userArr = Array.isArray(res[1]) ? res[1] : [];
            faceArr.forEach((item) => {
                for (let i = 0; i < userArr.length; i++) {
                    if (item.CreateUserID === userArr[i].UserID) {
                        if (typeof item.JsonUserData !== 'object') {
                            item.JsonUserData = {};
                        }
                        item.AreaID = userArr[i].AreaID;
                        item.JsonUserData.Person = userArr[i];
                        break;
                    }
                }
            });
            res[0].data = (yield Area_1.default.getAnyListByAreaID(faceArr, params.areaId));
            return res[0];
        });
    }
    GetFaceDetail(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield Promise.all([
                VideoStructService.CameraParamForGroupID(ID),
                VideoStructService.FaceGroupCameraList(ID)
            ]);
            let FaceTask = res[0];
            FaceTask.CameraParams = res[1];
            let result = new ResponseResult_1.BackResponseBody();
            result.data = FaceTask;
            result.code = ErrorCode_1.default.OK;
            return result;
        });
    }
    static CameraParamForGroupID(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IvsTaskGroupDao).findByID(ID).then((res) => {
                return res.data;
            });
        });
    }
    static FaceGroupCameraList(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            let wheres = [];
            wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.IvsTaskGroupID, ID));
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IvsTaskDao).findListByWhere(wheres).then((res) => {
                let arr = [];
                if (Array.isArray(res.data)) {
                    arr = res.data;
                }
                return arr;
            });
        });
    }
    static PrviewWhere(userId) {
        let prviewWhere = new Where_1.default();
        let childs = [];
        childs.push(WhereLib_1.EqualChildWhere(FildNameLib_1.FildNameLib.CreateUserID, userId, true));
        childs.push(WhereLib_1.EqualChildWhere(FildNameLib_1.FildNameLib.AuditUser, userId, true));
        childs.push(WhereLib_1.LikeChildWhere(FildNameLib_1.FildNameLib.AuthUser, userId, true));
        childs.push(WhereLib_1.EqualChildWhere(FildNameLib_1.FildNameLib.AuthStatus, AuthStatus_1.AuthStatus.EveryBody.value, true));
        prviewWhere.Childs = childs;
        return prviewWhere;
    }
    static FaceList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let wheres = [];
            wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.TaskType, TaskType_1.TaskType.FaceStruct.value));
            wheres.push(TaskConfigService_1.TaskConfigService.PrviewWhere(params.userId));
            if (params.name) {
                wheres.push(WhereLib_1.EqualLikeWhere(FildNameLib_1.FildNameLib.Name, params.name));
            }
            if (params.listType) {
                wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.TaskType, params.listType));
            }
            if (params.runStatus) {
                wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.Status, params.runStatus));
            }
            if (params.startTime && params.endTime) {
                wheres.push(WhereLib_1.StartAndEndForTimeWhere(FildNameLib_1.FildNameLib.ValidTimeStart, params.startTime, FildNameLib_1.FildNameLib.ValidTimeEnd, params.endTime));
            }
            if (params.auditStatus) {
                wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.AuditStatus, params.auditStatus));
            }
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IvsTaskGroupDao).findListByWhere(wheres);
        });
    }
    static UserList() {
        return __awaiter(this, void 0, void 0, function* () {
            let userRes = yield Promise.all([
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserDao).findAll(),
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.PersonDao).findAll(),
            ]);
            let personList = [];
            try {
                let resUserList = userRes[0].data;
                let resPersonList = userRes[1].data;
                resUserList.forEach((user) => {
                    for (let i = 0; i < resPersonList.length; i++) {
                        let person = resPersonList[i];
                        if (user.PersonID === person.ID) {
                            person.UserID = user.ID;
                            personList.push(person);
                            resPersonList.splice(i, 1);
                        }
                    }
                });
            }
            catch (e) {
                VideoStructService.LOGGER.warn(util.format('获取User: %j 或 Person: %j 错误 ', userRes[0], userRes[1]));
            }
            return personList;
        });
    }
}
VideoStructService.LOGGER = log4js.getLogger("VideoStructService");
exports.VideoStructService = VideoStructService;
