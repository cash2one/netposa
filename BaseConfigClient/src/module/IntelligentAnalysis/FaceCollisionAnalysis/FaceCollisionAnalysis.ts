export class FaceCollisionAnalysisParams{
    startTime: string;
    endTime: string;
    threshold: number;
    arrCameraId: Array<string> = [];
}

export class FaceCollisionOffLine{
    CompletePercent: string;
    CreateTime: string;
    CreateUser: string;
    EndTime: string;
    Ext: any;
    ID: string;
    JsonExtData: any;
    JsonUserData: any;
    Message: string;
    StartTime: string;
    StrJsonUserData: string;
    TaskId: string;
    TaskName: string;
    TaskStatus: string;
    TaskType: string;
}

export const FaceCollisionOffLineData = [
    {
        Name:'频次分析任务1',
        CreateTime:'2017-09-08 12:02:45',
        AccompNum:3,
        Status:'Run',
        threshold: 70,
        Path:'http://192.168.160.151:6551/DownLoadFile?filename=LOC:402201323/data_CAPTUREIMAGE/20170920/00/4a4edce405da17dad5a0f1186aa5c100_46'
    },
    {
        Name:'频次分析任务2',
        CreateTime:'2017-09-08 12:02:45',
        AccompNum:2,
        Status:'Over',
        threshold: 80,
        Path:'http://192.168.160.151:6551/DownLoadFile?filename=LOC:402201323/data_CAPTUREIMAGE/20170920/00/4a4edce405da17dad5a0f1186aa5c100_46'

    }
];


export class QueryAnalysisItem  {
    areaNo?: string;
    arrCameraId: Array<string>;
    endTime: string;
    startTime: string;
}

export class QueryAnalysisParams{
    impactArr: Array<QueryAnalysisItem>;
    taskName: string;
    threshold: number;
}