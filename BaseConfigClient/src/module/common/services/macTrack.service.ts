import {app} from "../app/main.app";
import 'angular';
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {IResponseNotifyFactory} from "../factory/response.notify.factory";

let Promise = require('es6-promise');
declare let angular: any, $: any, require: any;

export interface IMacTrackService {
    uploadImage: (params: FormData) => any;
    searchTrack: (params: any) => Promise<ResponseResult<any>>;
    searchFace:(params:any) =>Promise<ResponseResult<any>>;
    searchAlarm:(params:any) =>Promise<ResponseResult<any>>;
    searchAllInfo:(params:any) =>Promise<ResponseResult<any>>;
}

/** create by zxq
 *  任务管理 增删改查 请求
 * @time: 2017-06-14 11:24:01
 * @params:
 * @return:
 */
class macTrackService implements IMacTrackService {

    static $inject: Array<string> = ['$http', '$q', 'notifyFactory'];
    private notifyFunc: (res: ResponseResult<any>) => ResponseResult<any>;

    constructor(private $http: any, private $q: any, private notifyFactory: IResponseNotifyFactory) {
        this.notifyFunc = this.notifyFactory.msg({onlySuccess: true});
    }

    searchTrack(params: any): Promise<ResponseResult<any>> {
        return this.$http({
            method: "POST",
            url: "/db/maccarcrash/facetrack",
            data: params
        })
    }
    searchFace(params:any){
        return this.$http({
            method:'post',
            url:'/db/maccarcrash/searchface',
            data:params
        })
    }
    searchAlarm(params:any){
        return this.$http({
            method:'post',
            url:'/db/maccarcrash/personalarm',
            data:params
        })
    }
    searchAllInfo(params:any){
        return this.$http({
            method:'post',
            url:'/db/maccarcrash/accompanying',
            data:params
        })
    }
    uploadImage(params: FormData) {
        return new Promise((resolve: any, reject: any) => {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', '/db/upload/image', true);
            xhr.onreadystatechange = (ev) => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(JSON.parse(xhr.responseText) as ResponseResult<any>);
                    resolve(JSON.parse(xhr.responseText))
                }
            };
            xhr.onerror = (err: any) => {
                reject(err)
            };
            xhr.send(params)
        })
    }
}

app.service('macTrackService', macTrackService);