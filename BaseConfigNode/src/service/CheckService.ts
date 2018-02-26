import ErrorCode from "../common/res/ErrorCode";
import { BackResponseBody, PageResult } from '../core/params/result/ResponseResult';
import * as log4js from "log4js";
import * as util from "util";
import { CheckGetListParams } from '../core/params/CheckParams';
import { ProcedureParamStatement } from '../core/server/ProcedureParamStatement';
import { PROCEDURE_TYPE } from '../core/server/enum/ProcedureType';
import { MyCheckModel } from '../core/server/MyCheckModel';
import { DaoType } from '../dao/enum/DaoType';
import OtherDao from '../dao/OtherDao';
import { BeanHelper } from '../common/help/BeanHelper';


export interface ICheckService {
    findListByPage(reqParams: CheckGetListParams): Promise<BackResponseBody<PageResult<MyCheckModel>>>
}

export class CheckService implements ICheckService {
    private static LOGGER = log4js.getLogger("CheckService");

    async findListByPage(params: CheckGetListParams): Promise<BackResponseBody<PageResult<MyCheckModel>>> {
        if (!params.userId) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM)
        }
        let procParams = new ProcedureParamStatement();
        procParams.ProcName = PROCEDURE_TYPE.PROC_GET_AUDIT_TASK;
        procParams.JsonProcParams = [params.userId, params.taskType, params.auditStatus, params.timeStart, params.timeEnd];
        return await BeanHelper.getDao<OtherDao>(DaoType.OtherDao).callProcedureForObjectWithPage(procParams, Number(params.currentPage), Number(params.pageSize));
    }

    constructor() {
    }

}