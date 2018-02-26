import {IAngularHttp} from "../interceptors/http";
import {CheckGetListParams} from "../../../core/params/CheckParams";
import * as _ from 'lodash';
import {ResponseResult, PageResult} from '../../../core/params/result/ResponseResult';
import {app} from "../app/main.app";
import {MyCheckModel} from "../../../core/server/MyCheckModel";

export class MyCheckService {

    static $inject = ["$http"];

    constructor(private $http: IAngularHttp) {

    }

    findListByPage(params: CheckGetListParams): Promise<PageResult<MyCheckModel>> {
        return this.$http({
            method: "get",
            params: params,
            url: "/db/check/findListByPage"
        }).then((res: any) => {
            console.debug("check/findListByPage", res);
            return (res && res.data) || {} as PageResult<MyCheckModel>
        });
    }
}

app.service("myCheckService", MyCheckService);