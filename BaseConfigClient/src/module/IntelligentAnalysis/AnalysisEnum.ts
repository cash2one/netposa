
export class MarkersIcon {
    static NormalBlueIcon:string = '/images/map/normal-blue.png';
    static NormalGreenIcon:string = '/images/map/normal-green.png';
    static HoverRedIcon:string = '/images/map/hover-marker.png';
    static StartBlueIcon:string = '/images/map/start-blue.png';
    static StartGreenIcon:string = '/images/map/start-green.png';
    static EndIcon:string = '/images/map/end.png'
}

export class TrackConfig{
    static TrackSpeed:number = 10;
    static TrackWeight:number = 6;
    static PersonTrackBlueHandle:string = '/images/map/move1.png';
    static PersonTrackGreenHandle:string = '/images/map/move2.png';
    static LineColorForViolet:string = '#ccc5ff';
    static LineColorForBlue:string = '#a8ebff';
    static TrackColorBlue:string = '#00c0ff';
    static TrackColorViolet:string = '#7a4bff';
}

export class OverlayName{
    static MapForResultLayer:string = 'MapForResultLayer';
    static MapForResultGroup: string = 'MapForResultGroup';
    static MapForAccpGroup: string = 'MapForAccpGroup';
    static MapForTrackLineLayer:string = 'MapForTrackLineLayer';
    static MapForResultLineGroup:string = 'MapForResultLineGroup';
    static MapForAccpLineGroup:string = 'MapForAccpLineGroup';
}

let dt = new Date();
let y = (dt.getFullYear()).toString();
let m = (dt.getMonth() + 1).toString();
let d = (dt.getDate()).toString();
let hh = (dt.getHours()).toString();
let mm = (dt.getMinutes()).toString();
let ss = (dt.getSeconds()).toString();
parseInt(m) < 10 ? m = `0${m}` : m;
parseInt(d) < 10 ? d = `0${d}` : d;
parseInt(hh) < 10 ? hh = `0${hh}` : hh;
parseInt(mm) < 10 ? mm = `0${mm}` : mm;
parseInt(ss) < 10 ? ss = `0${ss}` : ss;
export interface TimeLength {
    startTime: string;
    endTime: string;
}

export function GetNDayTime(n: number): TimeLength {
    let time = {} as TimeLength;
    let dd = new Date();
    dd.setDate(dd.getDate() + n);
    let year = dd.getFullYear();
    let month = (dd.getMonth() + 1).toString();
    let day = (dd.getDate()).toString();
    parseInt(month) < 10 ? month = `0${month}` : month;
    parseInt(day) < 10 ? day = `0${day}` : day;
    time.startTime = `${year}-${month}-${day} 00:00:00`;
    time.endTime = `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    return time
}

export interface Enum <T>{
    key: string;
    value: T;
    text: string;
}

interface EnumEx {
    today: Enum<TimeLength>;
    threeDay: Enum<TimeLength>;
    weekDay: Enum<TimeLength>;
    monthDay: Enum<TimeLength>
}

export const FastData: { [key: string]: Enum<TimeLength> } & EnumEx = {
    today: {key: 'today', value: GetNDayTime(0), text: '今天'},
    threeDay: {key: 'threeDay', value: GetNDayTime(-3), text: '近三天'},
    weekDay: {key: 'weekDay', value: GetNDayTime(-7), text: '近一周'},
    monthDay: {key: 'monthDay', value: GetNDayTime(-30), text: '近一月'},
};

export function getFastDataList(): Array<Enum<TimeLength>> {
    let arr = [] as Array<Enum<TimeLength>>;
    for (let k in FastData) {
        arr.push({key: FastData[k].key, value: FastData[k].value, text: FastData[k].text})
    }
    return arr
}

interface SexDataEnumEx{
    all:Enum<number>;
    man:Enum<number>;
    women:Enum<number>
    unknown:Enum<number>
}
export const SexData: { [key: string]: Enum<number> } & SexDataEnumEx= {
    all:{key:'all',value:null,text:'全部'},
    man:{key:'Men',value:0,text:'男'},
    women:{key:'Women',value:1,text:'女'},
    unknown:{key:'Unknow',value:-1,text:'未知'}
};

export function getSexDataList(): Array<Enum<number>> {
    let arr = [] as Array<Enum<number>>;
    for (let k in SexData) {
        arr.push({key: SexData[k].key, value: SexData[k].value, text: SexData[k].text})
    }
    return arr
}

interface GlassesDataEnumEx{
    all:Enum<number>;
    yes:Enum<number>;
    no:Enum<number>;
    unknown:Enum<number>;
}
export const GlassesData: { [key: string]: Enum<number> } & GlassesDataEnumEx= {
    all:{key:'all',value:null,text:'全部'},
    yes:{key:'yes',value:1,text:'普通眼镜'},
    no:{key:'no',value:0,text:'太阳眼镜'},
    unknown:{key:'unknown',value:-1,text:'未知'}
};

export function getGlassesDataList(): Array<Enum<number>> {
    let arr = [] as Array<Enum<number>>;
    for (let k in GlassesData) {
        arr.push({key: GlassesData[k].key, value: GlassesData[k].value, text: GlassesData[k].text})
    }
    return arr
}


interface MaskDataEnumEx{
    all:Enum<number>;
    yes:Enum<number>;
    no:Enum<number>;
    unknown:Enum<number>;
}
export const MaskData: { [key: string]: Enum<number> } & MaskDataEnumEx= {
    all:{key:'all',value:null,text:'全部'},
    yes:{key:'yes',value:1,text:'戴口罩'},
    no:{key:'no',value:0,text:'不戴口罩'},
    unknown:{key:'unknown',value:-1,text:'未知'}
};

export function getMaskDataList(): Array<Enum<number>> {
    let arr = [] as Array<Enum<number>>;
    for (let k in MaskData) {
        arr.push({key: MaskData[k].key, value: MaskData[k].value, text: MaskData[k].text})
    }
    return arr
}

export class ImageResult {
    image: string;
    ID: string;
}

export function MockImageResultData(num:number, path:string):Array<ImageResult> {
    let arr = [] as Array<ImageResult>;
    for (let i = 1; i <= num; i++) {
        arr.push({ID:new Date().getTime().toString(),image:path})
    }
    return arr;
}
export class Capture{
    sex:number;//0 男 1女
    time:string;
    info:string;
    image:string;
    isCollection:number;//0 已收藏 1未收藏
    isMonitor:number;
    scale:number;
}
export class Location{
    time:string;
    locate:string
}
//mac碰撞列表
export class MackCrashList{
    macAddress:string;
    showTime:number;
    location:any
}

export function MockCaptureList(num:number,imageUrl:string):Array<Capture>{
    let arr = [] as Array<Capture>;
    for (let i = 1; i<=num;i++){
        arr.push({
            sex:Math.round(Math.random()),
            time:'2017-03-02 12:30:48',
            info:'武汉洪山区关山大道保利国际中心',
            isCollection:Math.round(Math.random()),
            image:imageUrl,
            isMonitor:Math.round(Math.random()),
            scale:Math.round(90+Math.random()*10),
        } as Capture)
    }
    return arr
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
export interface Age{
    maxAge:number;
    minAge:number;
}
export class AgeEnum{
    Juvenile:Enum<Age>;
    Youth:Enum<Age>;
    MiddleAged:Enum<Age>;
    Elderly:Enum<Age>;
    Unknown:Enum<Age>;

}

export const AgeData:{ [key: string]: Enum<Age> } & AgeEnum = {
    Juvenile:{key:'Juvenile',value:{maxAge:20,minAge:0},text:'少年'},
    Youth:{key:'Youth',value:{maxAge:40,minAge:21},text:'青年'},
    MiddleAged:{key:'MiddleAged',value:{maxAge:60,minAge:41},text:'中年'},
    Elderly:{key:'Elderly',value:{maxAge:60,minAge:120},text:'老年'},
    Unknown:{key:'Unknown',value:{maxAge:0,minAge:0},text:'未知'}
};

export function getAgeList(): Array<Enum<Age>> {
    let arr = [] as Array<Enum<Age>>;
    for (let k in AgeData) {
        arr.push({key: AgeData[k].key, value: AgeData[k].value, text: AgeData[k].text})
    }
    return arr
}

export function MockMackCrashList(num:number,areaNum:number):Array<MackCrashList>{
    let arr = [] as Array<MackCrashList>;
    let location = [] as Array<Location>;
    for (let i=0;i<areaNum;i++){
        location.push({
            time:'2017-01-01',
            locate:'关山大道太阳城'
        })
    }
    for(let i=0;i<num;i++){
        arr.push({
            macAddress:'127.120.45'+(Math.floor(Math.random()*10)).toString(),
            showTime:Math.round(Math.random()*areaNum),
            location:location
        }) 
    }
    return arr
}
export function MockAlarmLIstanbul(num:number):Array<MackCrashList>{
    let arr = [] as Array<MackCrashList>;    
    for(let i=0;i<num;i++){
        arr.push({
            macAddress:'127.120.45.432',
            showTime:Math.round(Math.random()*100),
            location:'关山大道太阳城'
        }) 
    }
    return arr
}
export class Size{
    width:number;
    height:number
}
declare let $:any,window:any;
export function getWidowSize():Size{
    let size =new Size();
    size.width = $(window).width();
    size.height = $(window).height();
    return size;
}

export interface data<T>{
    key:string;
    value:T;
    text:string
}
export class timeLength{
    startTime:string;
    endTime:string;
}
interface dataEx{
    lastHour:data<timeLength>;
    lastFourHour:data<timeLength>;
    today:data<timeLength>;
    lastThreeDay:data<timeLength>;
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
    m = parseInt(m)<10?`0${m}`:m;
    d = parseInt(d)<10?`0${d}`:d;
    hh = parseInt(hh)<10?`0${hh}`:hh;
    mm = parseInt(mm)<10?`0${mm}`:mm;
    ss = parseInt(ss)<10?`0${ss}`:ss;
    let tStart = `${y}-${m}-${d} 00:00:00`;
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

export const QueryPattern = [
    {name: "MAC", value: "MAC", key: 0},
    {name: "IMEI", value: "IMEI", key: 1},
    {name: "IMSI", value: "IMSI", key: 2}
];