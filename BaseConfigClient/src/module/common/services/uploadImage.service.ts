import {app} from "../app/main.app";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {IResponseNotifyFactory} from "../factory/response.notify.factory";

export interface IUploadImageService {
    uploadImageForFace(formData: FormData, params: any): Promise<any>;
    uploadImageForCar(formData: FormData): Promise<any>;
    uploadImageForId(ids:Array<string|number>):Promise<any>;
}

class UploadImageService implements IUploadImageService {

    static $inject: Array<string> = ['$http', 'notifyFactory'];

    private notifyFunc: (res: ResponseResult<any>) => ResponseResult<any>;

    constructor(private $http: any,
                private notifyFactory: IResponseNotifyFactory) {
        this.notifyFunc = this.notifyFactory.msg();
    }

    uploadImageForFace(formData: FormData, params?: any) {
        return this.$http({
            url: '/pdp/upload/faceImageForJava',
            method: 'POST',
            headers: {
                'Content-Type': undefined
            },
            params: params,
            transformRequest: function () {
                return formData;
            }
        }).then(this.notifyFunc)
    }

    uploadImageForCar(formData: FormData) {
        return this.$http({
            url: '/pdp/search/quick/uploadImgToPVD',
            method: 'POST',
            headers: {
                'Content-Type': undefined
            },
            transformRequest: function () {
                return formData;
            }
        }).then(this.notifyFunc)
    }

    uploadImageForId(ids:Array<string|number>) {
        return this.$http({
            url: '/pdp/search/searchidnumber',
            method: 'POST',
            params: {ids:ids}
        }).then(this.notifyFunc)
    }
}

app.service('uploadImageService', UploadImageService);