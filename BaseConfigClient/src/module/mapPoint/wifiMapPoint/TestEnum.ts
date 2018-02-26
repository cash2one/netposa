export class Capture{
    sex:number;//0 男 1女
    time:string;
    info:string;
    image:string;
    isCollection:number;//0 已收藏 1未收藏
    isMonitor:number;
}
export class wifiInfo{
    macAddress:string;
    time:string;
    Address:string;
}
export class wifiAlarm{
    macAddress:string;
    time:string;
    devece:string;
    person:string;
    status:string;
}
export class Alarm{
    captrueImage:string;
    matchNum:string;
    alarmImage:string;
    cameraAddress:string;
    alarmTime:string;
    createUserName:string;
    libName:string;
    status:number;//0 有效 1无效
    isCollection:number;//0 已收藏 1未收藏
    sex:number;//0 男 1女
    cardNum:string;
    isHandle:number;//0已处理 1 未处理
    name:string;
}

export function MockCaptureList(num:number,imageUrl:string):Array<Capture>{
    let arr = [] as Array<Capture>;
    for (let i = 1; i<=num;i++){
        arr.push({
            sex:Math.round(Math.random()),
            time:'2017-03-02 12:30:48',
            info:'青年，黑色短发',
            isCollection:Math.round(Math.random()),
            image:imageUrl,
            isMonitor:Math.round(Math.random())
        } as Capture)
    }
    return arr
}

export function MockWifiList(num:number):Array<wifiInfo>{
    let arr = [] as Array<wifiInfo>;
    for (let i = 1; i<=num;i++){
        let info = {
            macAddress:'00-90-e0-45-84',
            time:'2017-03-02 12:30:48',
            Address:'武汉市洪山区保利国际中心'
        } as wifiInfo
        arr.push(info)
    }
    return arr
}

export function MockWifiAlarm(num:number):Array<wifiAlarm>{
    let arr = [] as Array<wifiAlarm>;
    for (let i = 1; i<=num;i++){
        let info = {
            macAddress:'00-E0-FI-09-88-25',
            time:'2017-08-22 11:48:30',
            devece:'邮科院户心桥与南望山1',
            person:'snface',
            status:'有效'
        } as wifiAlarm
        arr.push(info)
    }
    return arr
}

export function MockAlarmList(num:number,imageUrl:string):Array<Alarm>{
    let arr = [] as Array<Alarm>;
    for (let i = 1; i<=num;i++){
        let j = {
            captrueImage:imageUrl,
            matchNum:'99%',
            alarmImage:imageUrl,
            cameraAddress:'邮科院湖心桥与南山路1号',
            alarmTime:'2017-08-22 11:48:30',
            createUserName:'snface',
            libName:'在逃库',
            name:'Avril Lavigne',
            status:Math.round(Math.random()),
            isCollection:Math.round(Math.random()),
            sex:Math.round(Math.random()),
            cardNum:'420198125422044445',
            isHandle:Math.round(Math.random()),
        } as Alarm;
        arr.push(j)
    }
    return arr
}