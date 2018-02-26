"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _Dao_1 = require("./core/_Dao");
const BDaoImpl_1 = require("./core/BDaoImpl");
const DaoType_1 = require("./enum/DaoType");
const Table_Map_1 = require("../model/Table-Map");
const ExtendUtils_1 = require("../utils/ExtendUtils");
class ResourceSearchDao extends BDaoImpl_1.BDaoImpl {
    constructor() {
        super();
        this.DaoName = DaoType_1.DaoType.ResourceSearchDao;
        this.ModelName = Table_Map_1.TableMap.Other;
    }
    resourceSearchTips(keyWords, searchType) {
        return _Dao_1._Dao.excute(this.getUrl(ResourceSearchDao.QUICK_SEARCH_TIPS_URL, searchType), { 'keyWords': keyWords });
    }
    quickSearchByKeyWords(quickSearchParams, searchType) {
        return _Dao_1._Dao.excute(this.getUrl(ResourceSearchDao.QUICK_SEARCH_COMMON_URL, searchType), quickSearchParams, true);
    }
    checkFack(image, commandType, detectType, searchType) {
        let postData = ExtendUtils_1.extend({}, image);
        postData["commandType"] = commandType;
        postData["detectType"] = detectType;
        return _Dao_1._Dao.excute(this.getUrl(ResourceSearchDao.CHECK_FACE_URL, searchType), postData);
    }
    checkCar(image, searchType) {
        return _Dao_1._Dao.excute(this.getUrl(ResourceSearchDao.CHECK_CAR_URL, searchType), image);
    }
    detectFace(detectFaceModel, searchType) {
        return _Dao_1._Dao.excute(this.getUrl(ResourceSearchDao.DETECT_FACE_URL, searchType), detectFaceModel, true);
    }
    searchFace(searchFaceParams, searchType) {
        return _Dao_1._Dao.excute(this.getUrl(ResourceSearchDao.SEARCH_FACE_URL, searchType), searchFaceParams, true);
    }
    searchCar(searchCarParams, searchType) {
        return _Dao_1._Dao.excute(this.getUrl(ResourceSearchDao.SEARCH_CAR_URL, searchType), searchCarParams, true);
    }
    advancedSearchCar(searchCarParams, searchType) {
        return _Dao_1._Dao.excute(this.getUrl(ResourceSearchDao.SEARCH_ADVANCE_CAR_URL, searchType), searchCarParams, true);
    }
    searchWiFiByParams(searchWiFiParams, searchType) {
        return _Dao_1._Dao.excute(this.getUrl(ResourceSearchDao.ADVANCE_SEARCH_WIFI_URL, searchType), searchWiFiParams, true);
    }
    searchEFenceByParams(searchEFenceParams, searchType) {
        return _Dao_1._Dao.excute(this.getUrl(ResourceSearchDao.ADVANCE_SEARCH_EFENCE_URL, searchType), searchEFenceParams, true);
    }
}
ResourceSearchDao.QUICK_SEARCH_TIPS_URL = "/search/quick/resourceSearchTips";
ResourceSearchDao.QUICK_SEARCH_COMMON_URL = "/search/quick/common";
ResourceSearchDao.CHECK_FACE_URL = "/search/checkFaceForNode";
ResourceSearchDao.CHECK_CAR_URL = "/search/quick/uploadImgToPVDForNode";
ResourceSearchDao.DETECT_FACE_URL = "/search/detectFace";
ResourceSearchDao.SEARCH_FACE_URL = "/search/advance/searchaccesslog";
ResourceSearchDao.SEARCH_CAR_URL = "/search/quick/searchByRedisIdFromPVD";
ResourceSearchDao.SEARCH_ADVANCE_CAR_URL = "/vehicleCtrl/advance/searchByParams";
ResourceSearchDao.ADVANCE_SEARCH_WIFI_URL = "/search/advance/wifi";
ResourceSearchDao.ADVANCE_SEARCH_EFENCE_URL = "/search/advance/efence";
exports.default = ResourceSearchDao;
