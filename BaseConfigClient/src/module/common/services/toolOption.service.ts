/**
 * Created by tj on 2017/7/6.
 */
declare let require: any;
import {app} from "../app/main.app";
import {CheckFaceParams, DetectFaceParams, FaceverifyParams} from "../../../core/params/ToolOptionParams"
import 'angular';
declare let angular: any;

export interface IToolOptionService {
    findFaceDataList: Function;
    faceDemarcateDataList: Function;
    faceMatchDataList: Function;
    getOffLineDataList: Function;
    searchIdCardNumber: Function;
    removeOffLineList: Function;
}

class ToolOptionService implements IToolOptionService {

    static $inject: Array<string> = ['$http', '$q'];

    constructor(private $http: any, private $q: any) {
        this.$http = $http;
        this.$q = $q;
    }

    // 人脸检索
    findFaceDataList: Function = (_params: CheckFaceParams) => {
        return this.$http({
            method: 'post',
            params: _params,
            url: '/fds/search/checkFace'
        })
    };

    //人脸标定截取
    faceDemarcateDataList: Function = (_params: DetectFaceParams) => {
        return this.$http({
            method: 'post',
            data: _params,
            url: '/db/resourceSearch/detectFace'
        })
    };

    // 人脸比对
    faceMatchDataList: Function = (_params: FaceverifyParams) => {
        return this.$http({
            method: 'post',
            params: _params,
            url: '/fds/search/faceverify'
        })
    };

    //身份证号检索
    searchIdCardNumber: Function = (_params: { [ids: string]: number }) => {
        return this.$http({
            method: 'post',
            params: _params,
            url: '/fds/search/searchidnumber'
        })
    };

    //下载中心数据获取
    getOffLineDataList: Function = (_params: { [userID: string]: string }) => {
        return this.$http({
            method: 'post',
            params: _params,
            url: '/fds/baseconfig/findOffLineList'
        })
    };

    //下载中心下载记录删除
    removeOffLineList: Function = (_params: Array<string>) => {
        return this.$http({
            method: 'post',
            data: _params,
            url: '/fds/baseconfig/removeOffLineList'
        })
    }


}

app.service('toolOptionService', ToolOptionService);