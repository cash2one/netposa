// /**
//  * Created by dell on 2017/6/29.
//  */
// import {app} from "../app/main.app";
// import {ResponseResult} from "../../../core/params/result/ResponseResult";
// import {LocalSearchAlarmLogResult, PopupAlarmDispose} from "../../../core/server/SocketAlarmModel";
// import {PageResult} from "../../../core/params/result/ResponseResult";
// import {AlarmDispose, statsFlow} from "../../../core/params/DynamicAlarmDisposeParams";
// import {AlarmResponse, SearchResponse} from "../../total/totalFactory/TotalModel";
// import {Collect} from "../../../core/entity/Collect";
// import {BatchCollectParams} from "../../../core/params/CollectParams";
// import {CollectDataType} from "../../../core/server/enum/CollectDataType";
// import {ObjectType} from "../../../core/enum/ObjectType";
// import "../factory/userinfo.cache.factory";
// import {IUserInfoCacheFactory} from "../factory/userinfo.cache.factory";
//
// declare let angular:any;
// //对外提供接口
// export interface IdynamicService {
//     searchAlarmData : (nums : number) => Promise<ResponseResult<PageResult<LocalSearchAlarmLogResult>>>;
//     alarmDispose : (param : PopupAlarmDispose) => Promise<ResponseResult<any>>;
//     deleteAlarm : (params : AlarmDispose) => Promise<ResponseResult<any>>;
//
//     searchFlowStats : (params : Array<statsFlow>) => Promise<ResponseResult<SearchResponse>>;
//
//     alarmStats : (params : Array<statsFlow>) => Promise<ResponseResult<AlarmResponse>>;
//
//     collectAlarmLogData(alarmIds: Array<string>): Promise<Array<Collect>>;
//
//     unCollectAlarmLogData(alarmIds: Array<string>): Promise<ResponseResult<boolean>>;
// };
//
// //类
// class dynamicService implements IdynamicService{
//
//     static $inject = ["$http",'userInfoCacheFactory'];
//     constructor(private $http : any, private userInfoCacheFactory: IUserInfoCacheFactory){
//
//     }
//
//
//     //查询报警数据
//     searchAlarmData = (nums : number) => {
//         return this.$http({
//             method : "post",
//             params : {num : nums},
//             url : "/fds/deploy/alarmlog"
//         })
//     };
//
//     //报警处理
//     alarmDispose = (param : PopupAlarmDispose) => {
//         return this.$http({
//             method : "post",
//             data : param,
//             showLoad: true,
//             url : "/fds/deploy/updateAlarmStatus"
//         })
//     };
//
//     //删除报警信息
//     deleteAlarm = (params : AlarmDispose) => {
//         return this.$http({
//             method : "post",
//             params : params,
//             showLoad: true,
//             url : "/fds/deploy/deletelog"
//         })
//     }
//
//     //抓拍流量统计查询
//     searchFlowStats = (params : Array<statsFlow>) => {
//         return this.$http({
//             method : "post",
//             data : params,
//             url : "/fds/stats/flow"
//         })
//     };
//
//     //报警统计
//     alarmStats = (params : Array<statsFlow>) => {
//         return this.$http({
//             method : "post",
//             data : params,
//             url : "/fds/stats/alarm"
//         })
//     }
//
//     /**
//      * 收藏报警信息
//      * @param alarmIds
//      * @return {PromiseLike<Array<Collect>>|Thenable<Array<Collect>>|any|Promise<Array<Collect>>}
//      */
//     collectAlarmLogData(alarmIds: Array<string>): Promise<Array<Collect>>{
//         let params = {} as BatchCollectParams;
//         params.dataType = CollectDataType.Collection.value;
//         params.objectIds = alarmIds;
//         params.objectType = ObjectType.AlarmLog.value;
//         params.userId = this.userInfoCacheFactory.getCurrentUserId();
//         return this.$http({
//             method: "post",
//             url: "/db/collect/saveAttention",
//             showLoad: true,
//             data: params
//         }).then((res: ResponseResult<Array<Collect>>)=>{
//             // 由于业务需要, controller需要获得collectModel的所有属性, 故这里自己组装一次collectModel
//             if(res && res.data && res.data.length > 0){
//                 return res.data;
//             }else{
//                 return [] as Array<Collect>;
//             }
//         });
//     }
//
//     /**
//      * 取消收藏报警信息
//      * @param alarmIds
//      * @return {any}
//      */
//     unCollectAlarmLogData(alarmIds: Array<string>): Promise<ResponseResult<boolean>>{
//         let params = {} as BatchCollectParams;
//         params.dataType = CollectDataType.Collection.value;
//         params.objectIds = alarmIds;
//         params.objectType = ObjectType.AlarmLog.value;
//         params.userId = this.userInfoCacheFactory.getCurrentUserId();
//         return this.$http({
//             method: "post",
//             url: '/db/collect/removeAttention',
//             showLoad: true,
//             data: params
//         });
//     }
//
// }
//
//
// app.service('dynamicControlService', dynamicService);