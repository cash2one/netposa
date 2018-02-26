export class MacAccompanyingAnalysis{
    taskName: string;
    taskType: string;
    macAddress: string;
    startTime: string;
    endTime: string;
    arrCameraId: Array<string>;
    followNum: number;
    agofollowTime: number;
    afterfollowTime: number;
    type: string;
    value: string;
    taskId: string;
}

export class MacAccompanyParams {
    mac: string; // mac地址
    startTime: string; // 开始时间
    endTime: string; // 结束时间
    // timeId: number; // 选中时间段id
    threshold: number; // 伴随次数
    alongTimeBefore: number; // 伴随前时间
    alongTimeAfter: number; // 伴随前时间
}

export class MacResult {
    id: string;
    macAddr: string;
    time: string;
    address: string;
    collectStatus: boolean;
}

export function MockMacResultData(num: number):Array<MacResult> {
    let arr = [] as Array<MacResult>;
    for (let i = 1; i <= num; i++) {
        arr.push({id: 'mac-' + i, macAddr: '00-E0-FI-09-88-25', time: '2017-07-18 10:18:55', address: '武昌区关山大道保利国际',collectStatus: i%2==1});
    }
    return arr;
}


export class alarmDetailParam{
    macAddress:string;
    ip:string;
    collectTime:string;
    collectLocate:string
}
export function getAlarmList(num:number):Array<alarmDetailParam>{
 let arr = [] as Array<alarmDetailParam>;
 for(let i=0;i<num;i++){
    arr.push({
        macAddress:'123-345-12-'+ Math.round(Math.random()*50),
        ip:'00-'+Math.round(Math.random()*30),
        collectTime:'2017-09-'+Math.round(Math.random()*30),
        collectLocate:'关山大道太阳城'
    })
 }
 return arr
}

export class FaceMacCrashParams {
    imagePath: Array<string>;
    mac: string; // mac地址
    startTime: string; // 开始时间
    endTime: string; // 结束时间
    timeId: number; // 选中时间段id
    threshold: number; // 伴随次数
    alongTimeBefore: number; // 伴随前时间
    alongTimeAfter: number; // 伴随前时间
    similarity: number;
    sex: number;
    age: number;
    hair: number;
    shoe: number;
    glasses: number;
    mask: number;
    cap: number;
    goods: number;
    clothing: number;
}
export class analysisResultParams{
    missionName:string;
    createTime:string;
    missionStatus:number;//0运行中，1运行完成
}
//查看详情参数
export class analysisResultList{
    similiarity:number;
    url:string;
    time:string;
    location:string
}
export class sortType{
    key:string;
    text:string;
}
export class singleMacDetailParam{
    ip:string;
    macAddress:string;
    collectTime:string;
    collectLocate:string;
    ischeck:boolean;
}
export class macCrashRecordParam{
    macAddress:string;
    accompanyTime:number;
    fold:boolean;
    showDetail:Array<singleMacDetailParam>
}

export function getMacCrashData(mac:number,detail:number):Array<macCrashRecordParam>{
    let macArr = [] as Array<macCrashRecordParam>;
    let detailArr = [] as Array<singleMacDetailParam>;
    for(let j=0;j<detail;j++){
        detailArr.push({
            ischeck:false,
            ip:Math.round(Math.random()*100).toString(),
            macAddress:'127-234-' + Math.round(Math.random()*100),
            collectTime:'2017-09-'+ Math.round(Math.random()*30),
            collectLocate:'关山大道太阳城'
        })
    }
    for(let i=0;i<mac;i++){
        macArr.push({
            macAddress:'127-234-'+Math.round(Math.random()*100),
            fold:true,
            accompanyTime:Math.round(Math.random()*10),
            showDetail:detailArr
        })
    }
    return macArr
}
export function getAnasisResult(num:number):Array<analysisResultParams>{
    let arr = [] as Array<analysisResultParams>;
    for(let i=0;i<num;i++){
        arr.push({
            missionName:'人脸碰MAC任务'+Math.round(Math.random()*10),
            createTime:'2017-09-13',
            missionStatus:Math.round(Math.random())
        })
    }
    return arr;
}

export function getAnalysisList(num:number):Array<analysisResultList>{
    let arr = [] as Array<analysisResultList>;
    for(let i=0;i<num;i++){
        arr.push({
            similiarity:Math.round(Math.random()*100),
            url:'',
            time:'2017-09-13',
            location:'武汉市保利广场'
        })
    }
    return arr;
}

export class MacAccompOffLine {
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
