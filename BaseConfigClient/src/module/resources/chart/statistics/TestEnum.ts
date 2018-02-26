export class MockTitle{
    carTitle:string;
    carImage: string;
    personTitle:string;
    personImage:string;
}

export function MockTitleList(num:number):Array<MockTitle>{
    let arr = [] as Array<MockTitle>;

    for (let i = 1; i<=num;i++){
        let random:number = Math.floor(Math.random()*2);
        let random1:number = Math.floor(Math.random()*6);
        let random2:number = Math.floor(Math.random()*6);
        let city:Array<string> = ['沪','湘','桂','京','鄂','黑','粤'];
        let z:any = ['A','B','C','D','E','F','G'][random1];

        arr.push({
            carTitle: `${city[random1]} ${z}${(random2+1)*100}${z}${random1} 银色`,
            carImage: "../../../../images/test/car ("+Math.floor(Math.random()*29)+").PNG",
            personTitle: random==0?"16-35岁 男 短发":"16-35岁 女 长发",
            personImage: random==0?"../../../../images/test/man ("+(Math.floor(Math.random()*43)+1)+").PNG":"../../../../images/test/woman ("+Math.floor(Math.random()*54)+").PNG"
        } as MockTitle)
    }
    return arr
}


export class MockStatisticsOverview{
    title: Array<string>;
    total: string;
    online: string;
    alarm: string;
    imagesPath:Array<string>;
}

export function MockStatisticsOverviewList(num:number):Array<MockStatisticsOverview>{
    let arr = [] as Array<MockStatisticsOverview>;
    for (let i = 1; i<=num;i++){
        arr.push({
            title: ['摄像机','Wi-Fi','电子围栏','卡口'],
            total: "160,130",
            online: "160,000",
            alarm: "1,200",
            imagesPath: ['../../../images/maintain/item-camera.png',
                '../../../images/maintain/Wi-Fi.png',
                '../../../images/maintain/electronicfence.png',
                '../../../images/maintain/rmpgate.png'
            ]
        } as MockStatisticsOverview)
    }
    return arr
}

export class MockAreaStatistic{
    area: Array<string>;
    areaTaskStatistics: Array<string>;
    areaDispatchedTaskStatistics: Array<string>;
    dispatchedAboutTaskStatistics: Array<string>;
    areaAlarm: Array<string>;
    areaAlarmTrend: Array<string>;
    deviceAlarmStatistic: Array<string>;
    dispatchedAboutAlarm: Array<string>;
    retrievalStatistics: Array<string>;
    carAnalysisStatistics: Array<string>;
    personAnalysisStatistics: Array<string>;
    macAnalysisStatistics: Array<string>;
}

export function MockAreaStatisticList(num:number):Array<MockAreaStatistic>{
    let arr = [] as Array<MockAreaStatistic>;
    for (let i = 1; i<=num;i++){
        arr.push({
            area: ['武昌区','江岸区','江汉区','硚口区','汉阳区','武昌区','青山区','洪山区','蔡甸区','江夏区','黄陂区','新洲区','东西湖区','汉南区'],
            //task
            areaTaskStatistics : ['人像结构化任务','车辆结构化任务'],
            areaDispatchedTaskStatistics : ['人像布控任务','车辆布控任务','MAC布控任务'],
            dispatchedAboutTaskStatistics : ['车辆黑名单','在逃库','涉毒库', '涉稳库', '沉迷游戏库', '杀人库', '抢劫库'],
            //alarm
            areaAlarm: ['人员报警','车辆报警', 'MAC报警'],
            areaAlarmTrend: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
            deviceAlarmStatistic: ['南山摄像机1', '保安摄像机1', '洪山区摄像机1', '洪山区卡口1','洪山区Wi-Fi-2', '洪山区电围3','洪山区摄像机3', '江夏区摄像机1','江夏区电围5', '江夏区Wi-Fi-K'],
            dispatchedAboutAlarm: ['车辆黑名单','在逃库','涉毒库','涉稳库','沉迷游戏库','杀人库','抢劫库','MAC黑名单','涉黑库','涉黄库'],
            retrievalStatistics: ['车辆','人像','Wi-Fi','电围','设备','位置'],
            carAnalysisStatistics:['行车轨迹','跟车分析','隐匿挖掘','碰撞分析','落脚点分析','套牌分析','频次分析','频繁过车','套牌分析','落脚点分析','套牌分析'],
            personAnalysisStatistics: ['人员轨迹','人脸分析','伴随分析','碰撞分析','频次分析','频繁分析','人脸碰撞','人员报警'],
            macAnalysisStatistics: ['MAC轨迹','人脸分析','伴随分析','碰撞分析','频次分析','频繁分析','人脸碰撞','人员报警']
        } as MockAreaStatistic)
    }
    return arr
}

/*
    x: 随机数的最大值
    y: 随机数组的长度
    z: 二维数组的长度
 */

export function MockNumber(x:number,y:number,z?:number){
    function Arr(x:number,y:number){
        let result : Array<number> = [];
        for(let i=0;i<y;i++){
            let MockNum:number = Math.round(Math.random()*x);
            result.push(MockNum)
        }
        return result
    }
    if(!z){
        return Arr(x,y)
    }else{
        let MockArr:Array<Array<number>> = [];
        for(let i=0;i<z;i++){
            MockArr.push(Arr(x,y));
        }
        return MockArr
    }
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

interface EnumEx {
    all: Enum<string>;
    oneDay: Enum<TimeLength>;
    // threeDay: Enum<TimeLength>;
    weekDay: Enum<TimeLength>;
    monthDay: Enum<TimeLength>;
    yearDay: Enum<TimeLength>;
    selectDay: Enum<string>;
}

export interface Enum <T>{
    key: string;
    value: T;
    text: string;
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

export const FastData: { [key: string]: Enum<TimeLength | string> } & EnumEx = {
    all: {key: 'all', value: 'all', text: '全部'},
    oneDay: {key: 'oneDay', value: GetNDayTime(-1), text: '近一天'},
    // threeDay: {key: 'threeDay', value: GetNDayTime(-3), text: '近三天'},
    weekDay: {key: 'weekDay', value: GetNDayTime(-7), text: '近一周'},
    monthDay: {key: 'monthDay', value: GetNDayTime(-30), text: '近一月'},
    yearDay: {key: 'yearDay', value: GetNDayTime(-365), text: '近一年'},
    selectDay: {key: 'selectDay', value: 'select', text: '自定义'}
};

export function getFastDataList(): Array<Enum<TimeLength | string>> {
    let arr = [] as Array<Enum<TimeLength | string>>;
    for (let k in FastData) {
        arr.push({key: FastData[k].key, value: FastData[k].value, text: FastData[k].text})
    }
    return arr
}

export const areaDropList = [
    {text: '武昌区', value: 'aaa', color: '#6c8ce4',selected:false},
    {text: '江岸区', value: 'bbb', color: '#7cccf2',selected:false},
    {text: '江汉区', value: 'ccc', color: '#dcbe99',selected:false},
    {text: '硚口区', value: 'ddd', color: '#F8F0E9',selected:false},
    {text: '汉阳区', value: 'eee', color: '#C9C9C9',selected:false},
    {text: '青山区', value: 'fff', color: '#6F6E6E',selected:false},
    {text: '洪山区', value: 'ggg', color: '#7CCCF2',selected:false},
    {text: '蔡甸区', value: 'hhh', color: '#53c68c',selected:false},
    {text: '江夏区', value: 'iii', color: '#9ad941',selected:false},
    {text: '黄陂区', value: 'jjj', color: '#fbd15a',selected:false},
    {text: '新洲区', value: 'kkk', color: '#9cdcee',selected:false},
    {text: '东西湖区', value: 'lll', color: '#e98371',selected:false}
];

export function RankKeyWords(num:number):Array<any>{
    let arr = [] as Array<any>;

    for (let i = 1; i<=num;i++){
        let random:number = Math.floor(Math.random()*2);
        let random1:number = Math.floor(Math.random()*6);
        let random2:number = Math.floor(Math.random()*6);
        let city:Array<string> = ['沪','湘','桂','京','鄂','黑','粤'];
        let z:any = ['A','B','C','D','E','F','G'][random1];

        arr.push({
            name: `${city[random1]} ${z}${(random2+1)*100}${z}${random1} 银色`,
            value: Math.floor(Math.random()*800)
        })
    }
    return arr.sort((a:any,b:any)=> {
        return b.value-a.value
    });
}



    // // mock函数
    // setLoopChart(staticID?: string, car?: boolean) {
    //     let that = this as any;
    //     let interval: number = 3000;
    //     window.setInterval(setLoopChartFun, interval);

    //     function setLoopChartFun() {

    //         let testInfo: any = that.MockOneTitle[Math.floor(Math.random() * 29)];
    //         let imageNode: string = "";
    //         let imageSrc: string = "";
    //         if (car) {
    //             imageSrc = testInfo.carImage
    //             imageNode = `<div style="display: none" class="m-new-border statistic-message">
    //                                <img src="${testInfo.carImage}" class="m-image-margin"/>
    //                                <span class="m-image-text">${testInfo.carTitle}</span></div>`;
    //         } else {
    //             imageSrc = testInfo.personImage
    //             imageNode = `<div style="display: none" class="m-new-border statistic-message">
    //                                <img src="${testInfo.personImage}" class="m-image-margin"/>
    //                                <span class="m-image-text">${testInfo.personTitle}</span></div>`;
    //         }

    //         // 去重
    //         let pageImageNode:any = $(staticID + ' .m-image-margin') || [];
    //         console.log(staticID + ' .m-image-margin')
    //         console.log(pageImageNode,"===============================================")

    //         if(pageImageNode.length){
    //             for(let i=0;i<pageImageNode.length;i++){
    //                 if(pageImageNode[i].src.indexOf(imageSrc)!=-1){
    //                     $(staticID + ' .m-loop-message').prepend(imageNode);
    //                     break;
    //                 }
    //             }
    //         }else{
    //             $(staticID + ' .m-loop-message').prepend(imageNode);
    //         }

    //         let statisticEleFirst = $(staticID + ' .statistic-message:eq(0)') as any;
    //         let statisticEle = $(staticID + ' .statistic-message:eq(-1)') as any;

    //         statisticEleFirst.slideDown(function () {
    //             statisticEle.remove();
    //         });
    //     }
    // }

            //mock
        // this.setLoopChart(this.staticID,!!Math.floor(Math.random()*2));


                // this.setLoopChart(this.staticID);