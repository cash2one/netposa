export class FrequencyAnalysisEnum{
    startTime: string;
    endTime: string;
    taskName: string;
    type: string = "MAC";
    value: string;
}

export const QueryPattern = [
    {name: "MAC", value: "MAC", key: 0},
    {name: "IMEI", value: "IMEI", key: 1},
    {name: "IMSI", value: "IMSI", key: 2}
];

export class PerceiveInfos {
    AcqTime: string;
    AreaId: string;
    ID: string;
    TaskId: string;
    Mac?: string;
    IMSI?: string;
    IMSI2?: string;
    IMEI?: string;
    MacDeviceId: string;
    MobileDeviceId?: string;
    [propName: string]: any;
}

export class Result {
    PerceiveInfos: Array<PerceiveInfos>;
    MacDeviceId: string;
}


export class ResultTrack {
    PerceiveFrequencyArr: Array<Result>;
    TaskId: string;
}
