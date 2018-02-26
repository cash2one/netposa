
export class timeLength{
    startTime:string;
    endTime:string;
}

export function getHours(num:number):timeLength{
    let time = {} as timeLength;
    let dt = new Date();
    let y = (dt.getFullYear()).toString();
    let m = (dt.getMonth()+1).toString();
    let d = (dt.getDate()).toString();
    let hh = (dt.getHours()).toString();
    let mm = (dt.getMinutes()).toString();
    let ss = (dt.getSeconds()).toString();
    let tStart = `${y}-${m}-${d} 00:00:00`;
    m = parseInt(m)<10?`0${m}`:m;
    d = parseInt(d)<10?`0${d}`:d;
    hh = parseInt(hh)<10?`0${hh}`:hh;
    mm = parseInt(mm)<10?`0${mm}`:mm;
    ss = parseInt(ss)<10?`0${ss}`:ss;
    let startY:string,startM:string,startD:string,startH:string;
    let shh = dt.getHours()-num;
    if(shh>=0){
        startH = shh<10?`0${shh}`:shh.toString();
        startD = d;
        startM = m;
        startY = y
    }else{
        shh = Math.abs(shh);
        let ddd = Math.floor(num/24);
        ddd = ddd?ddd:ddd+1;
        startH = (24*ddd -shh).toString();
        startD = (parseInt(d)-ddd).toString();
        if(parseInt(d)<=ddd){
            startD = (parseInt(d)-ddd+30).toString();
            startM = (parseInt(m)-1).toString();
            startY = y
            if(parseInt(m)-1<=0){
                startM = (parseInt(m)-1+12).toString();
                startY = (parseInt(y)-1).toString()
            }
        }else{
            startM = m;
            startY = y
        }
    }
    startM = parseInt(startM)<10?`0${parseInt(startM)}`:startM;
    startD = parseInt(startD)<10?`0${parseInt(startD)}`:startD;
    startH = parseInt(startH)<10?`0${parseInt(startH)}`:startH;

    time.startTime = num ?`${startY}-${startM}-${startD} ${startH}:${mm}:${ss}`:tStart;
    time.endTime = `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    return time
}

export interface data<T>{
    key:string;
    value:T;
    text:string
}
 interface dataEx{
     lastHour:data<timeLength>;
     lastFourHour:data<timeLength>;
     today:data<timeLength>;
     lastThreeDay:data<timeLength>;
 }

export const dataLists: { [key:string] : data<timeLength>} & dataEx = {
    today:{key:'today',value:getHours(0),text:'今天'},
    lastHour:{key:'lasthour',value:getHours(1),text:'近1h'},
    lastFourHour:{key:'lastFourHour',value:getHours(6),text:'近6h'},
    lastThreeDay:{key:'lastThreeDay',value:getHours(12),text:'近12h'}
};

export function getdataList():Array<data<timeLength>>{
    let arr = [] as Array<data<timeLength>>;

    for(let k in dataLists){
        arr.push({key:dataLists[k].key,value:dataLists[k].value,text:dataLists[k].text})
    }
    return arr;
}
export function ArrayUnique(arr:Array<any>) {
    let result = [] as Array<any>, hash = {} as any;
    for (let i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}

export class MacTrackIndexParam{
    macAddress:string;
    name: string;
    startTime:string;
    endTime:string;
    arrdeviceId:Array<string> = [];
}

//单条Mac地址详情
export class singleMacDetailParam{
    ip:string;
    macAddress:string;
    collectTime:string;
    collectLocate:string;
    ischeck:boolean;
}
//查看详情记录
export class macCrashRecordParam{
    macAddress:string;
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
            showDetail:detailArr
        })
    }
    return macArr
}

export class OverlayName{
    static MapForResultLayer:string = 'MapForResultLayer';
    static MapForResultGroup: string = 'MapForResultGroup';
    static MapForAccpGroup: string = 'MapForAccpGroup';
    static MapForTrackLineLayer:string = 'MapForTrackLineLayer';
    static MapForResultLineGroup:string = 'MapForResultLineGroup';
    static MapForAccpLineGroup:string = 'MapForAccpLineGroup';
}

export class MarkersIcon {
    static NormalBlueIcon:string = '/images/map/normal-blue.png';
    static NormalGreenIcon:string = '/images/map/normal-green.png';
    static HoverRedIcon:string = '/images/map/hover-marker.png';
    static StartBlueIcon:string = '/images/map/start-blue.png';
    static StartGreenIcon:string = '/images/map/start-green.png';
    static EndIcon:string = '/images/map/end.png'
}
