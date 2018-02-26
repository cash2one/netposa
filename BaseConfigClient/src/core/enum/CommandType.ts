/**
 * Created by zyh on 2017/7/27.
 */

//命令类型
export const CommandType = {
    GetKfkConfigInfo : "GetKfkConfigInfo",          //获取kafka订阅信息
    GetPersonCityCode : "GetPersonCityCode",        //获取人员省市Code
    SearchFace : "SearchFace",                      //检索人脸
    SearchPerson : "SearchPerson",                  //检索人员
    SearchIDNumber : "SearchIDNumber",              //身份证检索
    SearchAccessLog : "SearchAccessLog",            //检索通行日志
    SearchAlarmLog : "SearchAlarmLog",              //检索报警日志
    SearchRetrievalLog : "SearchRetrievalLog",      //检索检索日志
    SubcribeAccessLog : "SubcribeAccessLog",        //订阅通行日志
    UnSubcribeAccessLog : "SnSubcribeAccessLog",    //取消订阅通行日志
    SubcribeAlarmLog : "SubcribeAlarmLog",          //订阅报警日志
    UnSubcribeAlarmLog : "UnSubcribeAlarmLog",      //取消订阅报警日志
    UpdateStructureTask : "UpdateStructureTask",    //更新结构化任务信息
    UpdateTimeTemplate : "UpdateTimeTemplate",      //更新时间模板
    UpdateSysPerson : "UpdateSysPerson",            //更新常库人员
    UpdateBizPerson : "UpdateBizPerson",            //更新业务人员
    DelBizPersonByLibId : "DelBizPersonByLibId",    //根据库id删除业务人员库
    VerifyFace : "VerifyFace",                      //人脸1:1
    FindLogById : "FindLogById",                    //根据id查询日志
    DeleteLogById : "FeleteLogById",                //根据id删除日志
    UpdateAlarmStatus : "UpdateAlarmStatus",        //修改报警状态
    FindPersonAssists : "FindPersonAssists",        //查询人员辅助信息 返回多个
    StatisticsLog : "StatisticsLog",                //统计日志
    StatisticsPerson : "StatisticsPerson",          //统计人员
    StatisticsAlarmStatus : "StatisticsAlarmStatus",//报警状态统计
    StatisticsEngineInfo : "StatisticsEngineInfo",  //统计引擎信息
    SearchAccompany : "SearchAccompany",            //人员伴随
    SearchMacCollision : "SearchMacCollision",      //mac碰撞
}

