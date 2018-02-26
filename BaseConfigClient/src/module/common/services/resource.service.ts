/**
 * Created by dell on 2017/3/29.
 */
import { app } from "../app/main.app";

import { ResponseResult } from "../../../core/params/result/ResponseResult";

import { IResponseNotifyFactory } from "../factory/response.notify.factory";

export class searchChartParams {
    timeStamp: string;
    alarm: boolean;
    type: string;
    start: string;
    end: string;
}

export interface IResourceService {
    getResourceNumByTime(params: String): Promise<any>;

    getEchartConfig(configName: string): any;

    getTotalMapResource(): Promise<any>

    getChartData(params: searchChartParams): Promise<any>

    getDeviceById(id: string, type: string): Promise<any>

    beforeSocket(params: any): Promise<any>
}

export class resourceService implements IResourceService {

    private $http: any;

    getChartData(params: searchChartParams) {
        return this.$http({
            method: "POST",
            url: "/db/resource/getReourceData",
            data: params
        }).then(complete);

        function complete(res: ResponseResult<any>) {
            let datas;
            if (res && res.code === 200) {
                datas = res.data;
            }
            return datas;
        }
    }

    getResourceNumByTime(params: String) {

        return this.$http({
            method: "POST",
            url: "/db/resource/getresourceNumByType",
            data: { type: params }
        })
    }


    getTotalMapResource() {
        function complete(res: ResponseResult<any>) {
            let datas;
            if (res && res.code === 200) {
                datas = res.data;
            }
            return datas;
        }

        return this.$http({
            method: "POST",
            url: "/db/resource/getTotalDevice",
            data: { type: 1 }
        }).then(complete);
    }


    getEchartConfig(configName: string): any {
        return this.$http({
            method: "GET",
            url: "/mock/echart/" + configName + "?v=" + new Date().getTime(),
            cache: true
        }).then(complete);

        function complete(res: any) {
            return res.data;
        }
    }

    getDeviceById(id: string, type: string) {
        return this.$http({
            method: "post",
            url: "/db/resource/getDeviceById",
            data: { id: id, type: type }
        }).then(complete);

        function complete(res: any) {
            return res.data;
        }
    }

    beforeSocket(params: any) {
        return this.$http({
            method: "post",
            url: "/pdp/commonCtrl/log/subcribeFirst",
            data: params
        }).then(complete);

        function complete(res: any) {
            return res.data;
        }
    }

    static $inject: Array<string> = ['$http', 'notifyFactory'];
    private notifyFunc: (res: ResponseResult<any>) => ResponseResult<any>;

    constructor($http: any, notifyFactory: IResponseNotifyFactory) {
        this.$http = $http;
        this.notifyFunc = notifyFactory.msg({ onlySuccess: true });
    }
}

app
    .service('resourceService', resourceService);