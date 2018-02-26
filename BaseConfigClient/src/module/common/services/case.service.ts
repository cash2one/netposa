import { IResponseNotifyFactory } from "../factory/response.notify.factory";
import "../factory/response.notify.factory";
declare let require: any;
import { app } from "../app/main.app";
import 'angular';
import { CameraChangeAreaIDModel, CameraChangeCameraType } from "../../../core/params/CameraParams";
import { ResponseResult } from "../../../core/params/result/ResponseResult";
import './casecade.service';
import { CasCadeService } from './casecade.service';
import { Promise } from '../../../@types/es6-promise/index';
import { CaseTableParams } from '../../../core/params/CaseParams';
declare let angular: any;

export class CaseSearchParams {
    areaId: string;
    name: string;
    orderField: string;
    isAsc: boolean;
    currentPage: number;
    pageSize: number;
    taskMonitorType?: string;
    createTimeBegin?: string;
    createTimeEnd?: string;
    ruleName?: string;
    constructor(){
        this.currentPage = 1;
        this.pageSize = 10;
    }
}

export interface ICaseService {
    // TODO 没有使用到的接口
    findListByPage(params: CaseSearchParams): Promise<ResponseResult<any>>;
}

class CaseService implements ICaseService {


    static $inject: Array<string> = ['$http', 'notifyFactory'];
    private notifyFunc: (res: ResponseResult<any>) => ResponseResult<any>;

    constructor(private $http: Function, private notifyFactory: IResponseNotifyFactory) {
        this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
    }
    findListByPage(params: CaseSearchParams) {
        return this.$http({
            method: 'post',
            params: params,
            url: '/db/eventRule/findListByPage'
        })
    };

}

app
    .service('caseService', CaseService);