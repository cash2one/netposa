/**
 * create by huangjingjing 2017-08-04
 */
import {BackResponseBody} from "../core/params/result/ResponseResult";
import {FaceTrackParams, Result, ResultTrack} from "../core/entity/FaceTrackEnum";
import {FaceAnalysisParams, FaceAnalysisResult, PersonInfoModel} from '../core/entity/FaceAnalysisEnum'
import {AccompanyingAnalysis} from '../core/entity/AccompanyingAnalysisEnum'
import {PersonAlarmParams, PersonAlarmResult} from '../core/entity/PersonAlarmEnum'
import AnalysisDao from '../dao/AnalysisDao';
import ErrorCode from "../common/res/ErrorCode";
import Where from "../common/Where";
import {EqualAndWhere, InAndWhere} from "../model/WhereLib";
import {FildNameLib} from "../model/FildNameLib";
import OrderBy from "../common/OrderBy";
import {SortAndOrderBy} from "../model/OrderByLib";
import {DaoType} from '../dao/enum/DaoType';
import {BeanHelper} from '../common/help/BeanHelper';
import IntelligentTaskInfoDao from '../dao/IntelligentTaskInfoDao';


export interface IAnalysisService {

    FaceTrack(params: FaceTrackParams): Promise<any>

    FaceAnalysis(params: FaceAnalysisParams): Promise<any>

    PersonAlarm(params: PersonAlarmParams): Promise<any>

    Accompanying(params: AccompanyingAnalysis): Promise<any>

    RealyInfo(params: any): Promise<any>;

    findListWithOffLineTask(params: any): Promise<any>

    faceFrequencyAnalysis(params: any): Promise<any>

    delOffLineTask(params: any): Promise<any>;

    faceFrequencyAppear(params: any): Promise<any>;
}

export class AnalysisService implements IAnalysisService {

    //TODO: 人脸轨迹
    /**
     * @param params
     * @returns Promise<ResultTrack>
     */
    async FaceTrack(params: FaceTrackParams): Promise<any> {
        if (!params.taskId) {
            return Promise.reject(ErrorCode.ERROR_INVALID_PARAMETER)
        }
        return await BeanHelper.getDao<AnalysisDao>(DaoType.AnalysisDao).faceTrack(params) as BackResponseBody<any>;

    }

    async RealyInfo(params: { ids: Array<string> }) {
        if (!Array.isArray(params.ids) || params.ids.length === 0) {
            return Promise.reject(ErrorCode.ERROR_INVALID_PARAMETER)
        }
        return await BeanHelper.getDao<AnalysisDao>(DaoType.AnalysisDao).realyInfo({ids: params.ids}) as BackResponseBody<any>;
    }

    //TODO: 人脸分析
    /**
     * @param params
     * @returns Promise<FaceAnalysisResult>
     */
    async FaceAnalysis(params: FaceAnalysisParams): Promise<FaceAnalysisResult> {
        if (!params.taskId && !params.idCardNumber) {
            return Promise.reject(ErrorCode.ERROR_INVALID_PARAMETER)
        }
        return await BeanHelper.getDao<AnalysisDao>(DaoType.AnalysisDao).faceAnalysis(params);
    }


    //TODO: （人员告警）
    /**
     * @param params
     * @returns Promise<PersonAlarmResult>
     */
    async PersonAlarm(params: PersonAlarmParams): Promise<any> {
        if (!params.endTime || !params.startTime || params.startTime > params.endTime) {
            return Promise.reject(ErrorCode.ERROR_INVALID_PARAMETER)
        }
        return await BeanHelper.getDao<AnalysisDao>(DaoType.AnalysisDao).personAlarm(params) as BackResponseBody<any>;
    }


    //TODO: （伴随分析）
    /**
     * @param params
     */
    async Accompanying(params: AccompanyingAnalysis) {

        return await BeanHelper.getDao<AnalysisDao>(DaoType.AnalysisDao).faceAccompany(params) as BackResponseBody<any>;
    }

    //TODO (离线任务列表)
    async findListWithOffLineTask(params: { id: string, taskType: string, taskTypeList: Array<string> }) {
        if (!params.id || (!params.taskType && !params.taskTypeList)) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM)
        }
        let wheres = [] as Array<Where>;
        wheres.push(EqualAndWhere(FildNameLib.CreateUser, params.id));
        if(params.taskType){
            wheres.push(EqualAndWhere(FildNameLib.TaskType, params.taskType));
        }
        if(params.taskTypeList){
            wheres.push(InAndWhere(FildNameLib.TaskType, params.taskTypeList));
        }
        let orderBys = [SortAndOrderBy(FildNameLib.CreateTime)] as Array<OrderBy>;
        return await BeanHelper.getDao<IntelligentTaskInfoDao>(DaoType.IntelligentTaskInfoDao).findListByWhereWithOrderBy(wheres, orderBys);
    }

    //TODO 删除离线任务，删除大数据成功后再删除PosaDP
    async delOffLineTask(params: any) {
        if (!params || !params.ids || !Array.isArray(params.ids) || params.ids.length === 0) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM)
        }
        return await BeanHelper.getDao<IntelligentTaskInfoDao>(DaoType.IntelligentTaskInfoDao).delete(params.ids)
    }

    async faceFrequencyAnalysis(params: any) {
        return await BeanHelper.getDao<AnalysisDao>(DaoType.AnalysisDao).faceFrequencyAnalysis(params) as BackResponseBody<any>;
    }

    async faceFrequencyAppear(params: any) {
        return await BeanHelper.getDao<AnalysisDao>(DaoType.AnalysisDao).faceFrequencyAppear(params) as BackResponseBody<any>;
    }
}

