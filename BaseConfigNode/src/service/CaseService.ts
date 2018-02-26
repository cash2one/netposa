
import {BackResponseBody} from "../core/params/result/ResponseResult";

import {SearchCascadeModel} from "../core/server/SearchCascadeModel";
import * as log4js from "log4js";
import { BeanHelper } from '../common/help/BeanHelper';
import AreaDao from '../dao/AreaDao';
import { DaoType } from '../dao/enum/DaoType';

export interface ICaseService {
    findCascadeList(params: SearchCascadeModel):Promise<BackResponseBody<any>>;
}

export class CaseService implements ICaseService {
    private static LOGGER = log4js.getLogger("CameraService");

    constructor() {
    }

    findCascadeList(params: SearchCascadeModel) :Promise<BackResponseBody<any>>{
        return Promise.resolve(null).then(() => {
            // return PosaDPDao.findAreaResourceCascadeList(params)
            return BeanHelper.getDao<AreaDao>(DaoType.AreaDao).findAreaResourceCascadeList(params)
            // CaseService.LOGGER.warn(params)
        })
    }


}