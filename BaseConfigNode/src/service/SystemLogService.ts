/**
 * Created by lb on 2017/11/22 0022.
 */

import * as Promise from "promise";
import ErrorCode from "../common/res/ErrorCode";
import {BackResponseBody} from "../core/params/result/ResponseResult";
import {SystemLog} from "../core/entity/SystemLog";
import { DaoType } from '../dao/enum/DaoType';
import SystemLogDao from '../dao/SystemLogDao';
import { BeanHelper } from '../common/help/BeanHelper';


export interface ISystemLogService {
    save(params: SystemLog): Promise<BackResponseBody<string>>;
}

export class SystemLogService implements ISystemLogService {
    save(params: SystemLog | any) {
        return Promise.resolve(null)
            .then<null | number>(validateParams)
            .then(saveSystemLog);

        // 对SystemLog进行一系列验证
        function validateParams() {
            if (!params || params.OperatorUser == null || params.OperatorIP == null || params.OperFirstModule==null /*|| params.Descrption==null*/ || params.OperatorTime==null) {
                return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
            }
            return null;
        }

        function saveSystemLog() {
            return BeanHelper.getDao<SystemLogDao>(DaoType.SystemLogDao).save(params);
        }
    }
}