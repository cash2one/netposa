/**
 * Created by dell on 2017/6/17.
 */

//设备统计
export interface DeviceResponse{
    //区域
    "GROUP_BY_AREA": Array<DeviceGroupByArea>;
    //库
    "GROUP_BY_TYPE":Array<DeviceGroupByType>;
}

//按区域
export interface DeviceGroupByArea{
    //区域名
    "areaName": string;
    //全部
    "totalCameraNum": number;
    //在线
    "onlineCameraNum": number;
    //区域code
    "areaCode":string;
}

//按类型
export interface DeviceGroupByType{
    //库名
    "captureType": string;
    //全部
    "totalCameraNum": number;
    //在线
    "onlineCameraNum": number;
    //报警数
    "alarmNum":number;
}

/*=================================*/

//任务统计
export interface TaskResponse{
    //区域
    "GROUP_BY_AREA": Array<TaskGroupByArea>;
    //库
    "GROUP_BY_BIZLIB":Array<TaskGroupByBizLib>;
    //按状态
    "GROUP_BY_STATUS":Array<TaskGroupBySratus>;
}

//按区域
export interface TaskGroupByArea{
    //区域名
    "areaName": string;
    //全部任务数
    "allTaskNum": number;
    //运行任务数
    "onlineTaskNum": number;
    //区域code
    "areaCode":string;
}

//按库
export interface TaskGroupByBizLib{
    //库名
    "bizLib": string;
    //全部任务数
    "allTaskNum": number;
    //运行任务数
    "onlineTaskNum": number;
}

//按状态
export interface TaskGroupBySratus{
    //全部
    "allTaskNum": number;
    //在线
    "onlineTaskNum": number;
    //审核中
    "verifingTaskNum": number;
    //已过期
    "overdueTaskNum": number;
}

/*=================================*/


//报警统计
export interface AlarmResponse{
    //按区域
    "GROUP_BY_AREA": Array<AlarmGroupByArea>;
    //按日期
    "GROUP_BY_DAY":Array<AlarmGroupByDay>;
    //按库
    "GROUP_BY_BIZLIB":Array<AlarmGroupByBizLib>;
    //按设备
    "GROUP_BY_CAMERA":Array<AlarmGroupByCamera>;
}

//按区域
export  interface AlarmGroupByArea{
    //区域名
    "areaName": string;
    //全部报警数
    "allAlarmNum": number;
    //有效报警数
    "validAlarmNum": number;
    //已过期
    "invalidAlarmNum": number;
    //未处理
    "undisposedAlarmNum": number;
    //区域code
    "areaCode":string;
}

//按日期
export interface AlarmGroupByDay{
    //日期名
    "strDate": string;
    //全部报警数
    "allAlarmNum": number;
    //有效报警数
    "validAlarmNum": number;
}

//按设备
export interface AlarmGroupByCamera{
    //设备名
    "cameraName": string;
    //全部报警数
    "allAlarmNum": number;
    //有效报警数
    "validAlarmNum": number;
}

//按库
export interface AlarmGroupByBizLib{
    //库名
    "bizLib": string;
    //全部报警数
    "allAlarmNum": number;
    //运行报警数
    "validAlarmNum": number;
}

/*=================================*/


//流量统计
export interface FlowResponse{
    //按区域
    "GROUP_BY_AREA": Array<FlowGroupByArea>;
    //按设备
    "GROUP_BY_CAMERA":Array<FlowGroupByCamera>;
    //按日期
    "GROUP_BY_ONEDAY":Array<FlowGroupByOneDay>;
}

//按区域
export interface FlowGroupByArea{
    //区域名
    "areaName": string;
    //流量数
    "flowNum": number;
    //区域code
    "areaCode":string;
}

//按设备
export interface FlowGroupByCamera{
    //设备名
    "cameraName": string;
    //流量数
    "flowNum": number;
}

//按24小时数据
export interface FlowGroupByOneDay{
    //小时名
    "strHour": string;
    //流量数
    "flowNum": number;
}

/*=================================*/


//用户统计
export interface UserResponse{
    //按区域
    "GROUP_BY_AREA": Array<UserGroupByArea>;
    //按单位
    "GROUP_BY_UNIT": Array<UserGroupByUnit>;
    //按日期
    "GROUP_BY_DAY": Array<UserGroupByDay>;
}

//按区域
export interface UserGroupByArea{
    //区域名
    "areaName": string;
    //全部
    "allUserNum": number;
    //运行
    "onlineUserNum": number;
    //区域code
    "areaCode":string;
}

//按单位
export interface UserGroupByUnit{
    //设备名
    "unitName": string;
    //全部
    "allUserNum": number;
    //运行
    "onlineUserNum": number;
}

//按日期
export interface UserGroupByDay{
    //日期名
    "strDate": string;
    //用户数
    "allUserNum": number;
}

/*=================================*/


//检索统计
export interface SearchResponse{
    //按区域
    "GROUP_BY_AREA": Array<SearchGroupByArea>;
    //按事由
    "GROUP_BY_RETRIEVAL_REASON":Array<SearchGroupByRetrievalReason>;
    //按日期
    "GROUP_BY_DAY":Array<SearchGroupByDay>;
}

//按区域
export interface SearchGroupByArea{
    //区域名
    "areaName": string;
    //检索数
    "retrievalNum": number;
    //区域code
    "areaCode":string;
}

//按事由
export interface SearchGroupByRetrievalReason{
    //检索事由
    "retrievalReason": string;
    //检索数
    "retrievalNum": number;
}

//按日期
export interface SearchGroupByDay{
    //日期名
    "strDate": string;
    //检索数
    "retrievalNum": number;
}

/*=================================*/



//圆环图参数
export class PieOpts{
    //系列名
    seriesName:string;
    //x轴数据
    xAxisData:Array<string|number>;
    //数据
    showData:Array<{name:string;value:number}>;
}

//堆叠柱形图参数
export interface PileBarOpts{
    //系列1名称
    seriesNameOne:string;
    //系列2名称
    seriesNameTwo:string;
    //坐标系距左边距离可百分比或数字
    gridLeft: string|number;
    //坐标系距右边距离可百分比或数字
    gridRight: string|number;
    //x轴名称
    xAxisName: string;
    //y轴名称
    yAxisName: string;
    //堆叠柱图中系列1的颜色
    colorOne: Array<string>;
    //堆叠柱图中系列2的颜色
    colorTwo: Array<string>;
    //x轴数据
    xAxisData:Array<string|number>;
    //堆叠柱图中系列1数据
    allNum:Array<number|string>;
    //堆叠柱图中系列1数据
    onlineNum:Array<number|string>;
}

//折线图参数
export interface LineOpts{
    //坐标系距左边距离可百分比或数字
    gridLeft: string|number;
    //坐标系距右边距离可百分比或数字
    gridRight: string|number;
    //x轴名称
    xAxisName: string;
    //y轴名称
    yAxisName: string;
    //x轴的类型如数字轴、类目轴等
    xAxisType:string;
    //折线图线条颜色
    color:Array<string>;
    //x轴数据
    xAxisData:Array<string|number>;
    //数据
    showData:Array<string|number>;
}

//柱形图参数
export interface BarOpts{
    //系列名称
    seriesName:string;
    //坐标系距左边距离可百分比或数字
    gridLeft: string|number;
    //坐标系距右边距离可百分比或数字
    gridRight: string|number;
    //x轴名称
    xAxisName: string;
    //y轴名称
    yAxisName: string;
    //是否展示x轴的刻度数据
    labelShow: boolean;
    //柱子颜色
    color:Array<string>;
    //x轴数据
    xAxisData:Array<string|number>;
    //数据
    showData:Array<string|number>;
}

//折线面积图参数
export interface LineAreaOpts{
    //折线颜色
    color: Array<string>;
    //x轴数据
    xAxisData:Array<string|number>;
    //数据
    showData:Array<string|number>;
}
