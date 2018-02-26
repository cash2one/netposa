import {app} from "../app/main.app";
import {ResponseResult, PageResult} from "../../../core/params/result/ResponseResult";
import {IResponseNotifyFactory} from "../factory/response.notify.factory";
import {Collect} from '../../../core/entity/Collect'
import {SearchCollectParams} from "../../../core/params/CollectParams";
import {IUserInfoCacheFactory} from "../factory/userinfo.cache.factory";
import {CollectEx} from "../../../core/entity/ex/CollectEx";

declare let $: any, angular: any;

export interface ICollectService {
    findListByPage(params: SearchCollectParams): Promise<ResponseResult<Array<CollectEx>>>;
    delete(ids:Array<string>):Promise<ResponseResult<boolean>>
}

class CollectService implements ICollectService {
    static $inject: Array<string> = ['$http', 'notifyFactory', 'userInfoCacheFactory'];
    private notifyFunc: (res: ResponseResult<any>) => ResponseResult<any>;

    constructor(private $http: Function, private notifyFactory: IResponseNotifyFactory, private userInfoCacheFactory: IUserInfoCacheFactory) {
        this.notifyFunc = this.notifyFactory.msg({onlySuccess: true});
    }

    findListByPage(params: SearchCollectParams) {
        let _params = angular.copy(params);
        _params.userID = this.userInfoCacheFactory.getCurrentUserId();
        return this.$http({
            method: 'post',
            url: '/db/collect/findListByPage',
            data: _params
        });
    }
    delete(ids:Array<string>){
        return this.$http({
            method: 'post',
            url: '/db/collect/delete',
            data: {ids:ids}
        }).then(this.notifyFunc);
    }
}

app
    .service('collectService', CollectService);