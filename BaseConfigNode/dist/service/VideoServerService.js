"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Where_1 = require("../common/Where");
const JoinType_1 = require("../common/JoinType");
const MatchingType_1 = require("../common/MatchingType");
const DataType_1 = require("../common/DataType");
const ChildWhere_1 = require("../common/ChildWhere");
const ErrorCode_1 = require("../common/res/ErrorCode");
const VideoServer_col_1 = require("../model/table-col/VideoServer_col");
const OrderBy_1 = require("../common/OrderBy");
const BeanHelper_1 = require("../common/help/BeanHelper");
const DaoType_1 = require("../dao/enum/DaoType");
const BDaoImpl_1 = require("../dao/core/BDaoImpl");
class VideoServerService {
    constructor() {
    }
    update(serverModel) {
        return Promise.resolve(null)
            .then(validateParams)
            .then(VideoServerService.validateModel(serverModel.Code, serverModel.ID))
            .then(findVideoById)
            .then(update);
        function validateParams() {
            return VideoServerService.validateParams(serverModel, true);
        }
        function findVideoById() {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.VideoServerDao).findByID(serverModel.ID, BDaoImpl_1.ServerType.BCS);
        }
        function update(resp) {
            let oldModel = resp.data;
            if (oldModel == null) {
                return Promise.reject(ErrorCode_1.default.ERROR_VIDEO_NULL);
            }
            oldModel.AreaID = serverModel.AreaID;
            oldModel.Code = serverModel.Code;
            oldModel.Description = serverModel.Description;
            oldModel.IpAddress = serverModel.IpAddress;
            oldModel.Port = serverModel.Port;
            oldModel.Name = serverModel.Name;
            oldModel.Pwd = serverModel.Pwd;
            oldModel.VideoServerType = serverModel.VideoServerType;
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.VideoServerDao).update(oldModel, BDaoImpl_1.ServerType.BCS);
        }
    }
    save(serverModel) {
        return Promise.resolve(null)
            .then(validateParams)
            .then(VideoServerService.validateModel(serverModel.Code, ""))
            .then(save);
        function validateParams() {
            return VideoServerService.validateParams(serverModel, false);
        }
        function save() {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.VideoServerDao).save(serverModel, BDaoImpl_1.ServerType.BCS);
        }
    }
    detail(id) {
        if (!id) {
            return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
        }
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.VideoServerDao).findByID(id, BDaoImpl_1.ServerType.BCS);
        function findAreaModel(resp) {
            return VideoServerService.findArea(resp).then(resolveResult);
            function resolveResult(data) {
                if (data) {
                    resp.data.AreaModel = data;
                }
                return Promise.resolve(resp);
            }
        }
    }
    findListByParams(reqParams) {
        if (!reqParams || !reqParams.currentPage || !reqParams.pageSize) {
            return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
        }
        let arrWhere = new Array();
        let where = new Where_1.default();
        let childWhere;
        if (reqParams.areaId) {
            childWhere = new ChildWhere_1.default();
            childWhere.FieldName = VideoServer_col_1.default.AreaID;
            childWhere.FieldType = DataType_1.default.Text;
            childWhere.FieldValue = reqParams.areaId;
            childWhere.MType = MatchingType_1.default.Equal;
            childWhere.JType = JoinType_1.default.And;
            where.Childs.push(childWhere);
        }
        where.JType = JoinType_1.default.And;
        arrWhere.push(where);
        let orderByList = new Array();
        let orderBy = new OrderBy_1.default();
        if (reqParams.sortName) {
            orderBy.FieldName = reqParams.sortName;
            orderBy.IsAsc = reqParams.isAsc;
        }
        else {
            orderBy.FieldName = VideoServer_col_1.default.ID;
            orderBy.IsAsc = true;
        }
        orderByList.push(orderBy);
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.VideoServerDao).findListByPageWithOrderBy(arrWhere, orderByList, reqParams.currentPage, reqParams.pageSize, BDaoImpl_1.ServerType.BCS);
    }
    deleteById(id) {
        if (!id) {
            return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
        }
        return Promise.resolve(null).then(deleteById);
        function deleteById() {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.VideoServerDao).delete([id], BDaoImpl_1.ServerType.BCS);
        }
    }
    deleteByIds(ids) {
        if (!ids) {
            return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
        }
        return Promise.resolve(null).then(deleteById);
        function deleteById() {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.VideoServerDao).delete(ids, BDaoImpl_1.ServerType.BCS);
        }
    }
    isHasTask(videoServerIDList) {
        if (!videoServerIDList) {
            return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
        }
        return Promise.resolve(null).then(hasTask);
        function hasTask() {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.VideoServerDao).isHasTask(videoServerIDList, BDaoImpl_1.ServerType.PDP);
        }
    }
    static validateParams(model, isUpdate) {
        if (!model) {
            return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
        }
        if (isUpdate && !model.ID) {
            return Promise.reject(ErrorCode_1.default.ERROR_VIDEO_NULL);
        }
        if (!model.Code) {
            return Promise.reject(ErrorCode_1.default.ERROR_VIDEO_CODE_NULL);
        }
        return null;
    }
    ;
    static validateModel(code, id) {
        return function () {
            return Promise.resolve(null)
                .then(() => {
                let wheres = new Array();
                let where = new Where_1.default();
                where.Childs = new Array();
                let childWhere = new ChildWhere_1.default();
                childWhere.FieldName = VideoServer_col_1.default.Code;
                childWhere.FieldType = DataType_1.default.Text;
                childWhere.FieldValue = code;
                childWhere.MType = MatchingType_1.default.Equal;
                where.Childs.push(childWhere);
                if (id) {
                    childWhere = new ChildWhere_1.default();
                    childWhere.FieldName = VideoServer_col_1.default.ID;
                    childWhere.FieldType = DataType_1.default.Text;
                    childWhere.FieldValue = id;
                    childWhere.MType = MatchingType_1.default.UnEqual;
                    childWhere.JType = JoinType_1.default.And;
                    where.Childs.push(childWhere);
                }
                where.JType = JoinType_1.default.And;
                wheres.push(where);
                return wheres;
            })
                .then((wheres) => {
                return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.VideoServerDao).findListByWhere(wheres, BDaoImpl_1.ServerType.BCS);
            })
                .then((resp) => {
                if (resp.data && resp.data.length > 0) {
                    return Promise.reject(ErrorCode_1.default.ERROR_VIDEO_CODE_REPEAT);
                }
                return null;
            });
        };
    }
    ;
    static findArea(resp) {
        let result = resp.data;
        if (result && result.AreaID) {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AreaDao).findByID(result.AreaID, BDaoImpl_1.ServerType.BCS)
                .then((resp) => {
                return Promise.resolve(resp.data);
            });
        }
        else {
            return Promise.resolve(false);
        }
    }
}
exports.VideoServerService = VideoServerService;
