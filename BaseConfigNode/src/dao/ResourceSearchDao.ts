import {_Dao, PostData} from './core/_Dao';
import {BDaoImpl} from './core/BDaoImpl';
import {DaoType} from './enum/DaoType';
import {TableMap} from '../model/Table-Map';
import {QuickSearchParams} from '../core/params/ResourceSearchParams';
import {extend} from '../utils/ExtendUtils';
import {DetectFaceParams} from "../core/params/SearchFaceParams";
import {BackResponseBody} from "../core/params/result/ResponseResult";

export default class ResourceSearchDao extends BDaoImpl {
    DaoName = DaoType.ResourceSearchDao;
    ModelName = TableMap.Other;

    constructor(){
        super()
    }
    // 关键字检索联想提示请求URL地址
    private static QUICK_SEARCH_TIPS_URL = "/search/quick/resourceSearchTips";

    // 快速检索URL请求地址
    private static QUICK_SEARCH_COMMON_URL = "/search/quick/common";

    // 人脸检测URL请求地址
    private static CHECK_FACE_URL = "/search/checkFaceForNode";

    // 车辆图片上传URL请求地址
    private static CHECK_CAR_URL = "/search/quick/uploadImgToPVDForNode";

    // 人像特征提取URL请求地址
    private static DETECT_FACE_URL = "/search/detectFace";

    // 人像检索URL请求地址
    private static SEARCH_FACE_URL = "/search/advance/searchaccesslog";

    // 车辆图片检索URL请求地址
    private static SEARCH_CAR_URL = "/search/quick/searchByRedisIdFromPVD";

    // 车辆高级检索
    private static SEARCH_ADVANCE_CAR_URL = "/vehicleCtrl/advance/searchByParams";

    // WIFI高级检索URL请求地址
    private static ADVANCE_SEARCH_WIFI_URL = "/search/advance/wifi";

    // 电子围栏高级检索URL请求地址
    private static ADVANCE_SEARCH_EFENCE_URL = "/search/advance/efence";

    /**
     * 检索关键字联想提示
     * @param keyWords
     * @param searchType
     */
    resourceSearchTips(keyWords: string, searchType?: string):Promise<BackResponseBody<Array<string>>> {
        return _Dao.excute(this.getUrl(ResourceSearchDao.QUICK_SEARCH_TIPS_URL, searchType), {'keyWords': keyWords});
    }

    /**
     * 从数据库中检索设备数据
     * @param quickSearchParams
     * @param searchType
     */
    quickSearchByKeyWords(quickSearchParams: QuickSearchParams, searchType?: string) {
        return _Dao.excute(this.getUrl(ResourceSearchDao.QUICK_SEARCH_COMMON_URL, searchType), quickSearchParams, true);
    }

    /**
     * 人脸检测
     * @param image
     * @param commandType
     * @param detectType
     * @param searchType
     * TODO 人脸检测比较特殊, 需要验证下正确性
     */
    checkFack(image: object, commandType: string, detectType: string, searchType?: string) {
        let postData = extend({}, image) as PostData;
        postData["commandType"] = commandType;
        postData["detectType"] = detectType;

        return _Dao.excute(this.getUrl(ResourceSearchDao.CHECK_FACE_URL, searchType), postData);
    }

    /**
     * 车辆图片
     * @param image
     * @param searchType
     */
    checkCar(image: object, searchType?: string) {
        return _Dao.excute(this.getUrl(ResourceSearchDao.CHECK_CAR_URL, searchType), image);
    }

    /**
     * 人脸特征提取.
     *
     * @param detectFaceModel
     * @param searchType
     */
    detectFace(detectFaceModel: DetectFaceParams, searchType?: string) {
        return _Dao.excute(this.getUrl(ResourceSearchDao.DETECT_FACE_URL, searchType), detectFaceModel, true);
    }

    /**
     *
     * @param searchFaceParams 人脸检索
     * @param searchType
     */
    searchFace(searchFaceParams: object, searchType?: string) {
        return _Dao.excute(this.getUrl(ResourceSearchDao.SEARCH_FACE_URL, searchType), searchFaceParams, true);
    }

    /**
     *
     * @param searchCarParams 车辆图片检索
     * @param searchType
     */
    searchCar(searchCarParams: object, searchType?: string) {
        return _Dao.excute(this.getUrl(ResourceSearchDao.SEARCH_CAR_URL, searchType), searchCarParams, true);
    }

    /**
     *
     * @param searchCarParams 车辆图片检索
     * @param searchType
     */
    advancedSearchCar(searchCarParams: object, searchType?: string) {
        return _Dao.excute(this.getUrl(ResourceSearchDao.SEARCH_ADVANCE_CAR_URL, searchType), searchCarParams, true);
    }

    /**
     * WiFi高级检索
     * @param searchWiFiParams
     * @param searchType
     */
    searchWiFiByParams(searchWiFiParams: any, searchType?: string) {
        return _Dao.excute(this.getUrl(ResourceSearchDao.ADVANCE_SEARCH_WIFI_URL, searchType), searchWiFiParams, true);
    }

    /**
     * 电子围栏高级检索
     * @param searchEFenceParams
     * @param searchType
     */
    searchEFenceByParams(searchEFenceParams: any, searchType?: string) {
        return _Dao.excute(this.getUrl(ResourceSearchDao.ADVANCE_SEARCH_EFENCE_URL, searchType), searchEFenceParams, true);
    }



}
