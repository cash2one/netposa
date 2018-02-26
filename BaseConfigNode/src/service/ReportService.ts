
import {TableMap} from "../model/Table-Map";
import ErrorCode from "../common/res/ErrorCode";
import {Camera} from "../core/entity/Camera";
import {BackResponseBody} from "../core/params/result/ResponseResult";
import {CameraListParams, CameraChangeAreaIDModel, CameraChangeCameraType} from "../core/params/CameraParams";
import {SearchCascadeModel} from "../core/server/SearchCascadeModel";
import {CameraEx} from "../core/entity/ex/CameraEx";
import * as log4js from "log4js";
import * as util from "util";
import { DaoType } from '../dao/enum/DaoType';
import CameraDao from '../dao/CameraDao';
import { BeanHelper } from '../common/help/BeanHelper';
import { ServerType } from '../dao/core/BDaoImpl';
import AreaDao from '../dao/AreaDao';



export interface IReportService {
    findListByPage(reqParams: CameraListParams): Promise<BackResponseBody<Array<Camera>> | number>;
    delete(models:string): Promise<BackResponseBody<string>>;
}

export class ReportService implements IReportService {
    private static LOGGER = log4js.getLogger("ReportService");
    delete(id:string){
        return Promise.resolve(null)
        .then<number|null>(validateParams).then(deleteAreaById)

        function validateParams() {
            // 对Area进行一系列验证
            if (id == null) {
                return Promise.reject<number>(ErrorCode.ERROR_NO_AREA);
            }
            return null;
        }

        function deleteAreaById() {
            return BeanHelper.getDao<CameraDao>(DaoType.CameraDao).delete([id], ServerType.BCS);
        }
    }


    findListByPage(reqParams: CameraListParams): Promise<BackResponseBody<Array<Camera>> | number> {

        return Promise.resolve(null)
            .then<number | BackResponseBody<Array<Camera>>>(()=> {
                if (!reqParams || !reqParams.currentPage || !reqParams.pageSize || !reqParams.areaId) {
                    return Promise.reject(ErrorCode.ERROR_NO_PARAM);
                }


                let searchModel = new SearchCascadeModel();
                searchModel.id = reqParams.areaId;
                searchModel.isPage = true;
                searchModel.pageSize = reqParams.pageSize;
                searchModel.pageIndex = reqParams.currentPage;
                return BeanHelper.getDao<AreaDao>(DaoType.AreaDao).findAreaResourceCascadeList(searchModel, ServerType.BCS);
            });
    }


    constructor() {
    }

}