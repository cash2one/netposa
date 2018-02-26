export class MockStatisticsOverview{
    title: Array<string>;
    total: string;
    online: string;
    alarm: string;
    imagesPath:Array<string>;
}
        // this.superData = {
        //     taskStatistics: {
        //         seriesData:this.MockNumber(800,5),
        //         legendData:['人像布控任务','车辆布控任务','MAC布控任务','人像结构化任务','车辆结构化任务']
        //     },
        //     alarmStatistics: {
        //         seriesData:this.MockNumber(3000,5,3),
        //         xData: ["武昌","洪山","汉口","青山","汉阳"],
        //         legendData:["车辆报警","人像报警","MAC报警"]
        //     },
        //     trafficStatistics: {
        //         seriesData: this.MockNumber(3000,24,4),
        //         xData:this.MockNumber(24,24),
        //         legendData:["人像", "车辆", "WIFI", "电子围栏"]
        //     },
        //     retrievalStatistics: {
        //         seriesData:this.MockNumber(3000,6),
        //         yData:['Wi-Fi','位置','电围','设备','车辆','人像']
        //     },
        //     analysissTatistics: {
        //         seriesData:[3489, 5890, 3000, 28290, 32000],
        //         legendData:['人员分析','车辆分析','MAC分析']
        //     }
        // };


// areaTaskStatistics: {
//     seriesData:this.MockNumber(800,14,3),
//     xData:this.mockAreaStatistic[0].area,
//     legendData:this.mockAreaStatistic[0].areaTaskStatistics
// },
// areaDispatchedTaskStatistics: {
//     seriesData:this.MockNumber(800,14,3),
//     xData:this.mockAreaStatistic[0].area,
//     legendData:this.mockAreaStatistic[0].areaDispatchedTaskStatistics
// },
// dispatchedAboutTaskStatistics: {
//     seriesData: this.MockNumber(3000,7),
//     yData:this.mockAreaStatistic[0].dispatchedAboutTaskStatistics
// }
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



// // 数据整合
// this.superData = {
//     IntelligentAnalysis_Vehicle: {
//         seriesData:this.MockNumber(800,11),
//         xData:this.mockAreaStatistic[0].IntelligentAnalysis_Vehicle,
//         legendData:this.mockAreaStatistic[0].areaAlarm
//     },
//     IntelligentAnalysis_Face: {
//         seriesData:this.MockNumber(800,8),
//         xData:this.mockAreaStatistic[0].IntelligentAnalysis_Face,
//         legendData:this.mockAreaStatistic[0].area
//     },
//     IntelligentAnalysis_Mac: {
//         seriesData: this.MockNumber(800,8),
//         xData:this.mockAreaStatistic[0].IntelligentAnalysis_Mac
//     }
// };

// 数据整合
// this.superData = {
//     retrievalStatistics: {
//         seriesData:this.MockNumber(800,6),
//         xData:this.mockAreaStatistic[0].retrievalStatistics,
//         legendData:["人像", "车辆", "WIFI", "电子围栏"]
//     },
//     retrievalTrafficTrend: {
//         seriesData:this.MockNumber(3000,6,4),
//         xData:this.mockAreaStatistic[0].retrievalStatistics,
//         legendData:["人像", "车辆", "WIFI", "电围"]
//     }
// };
// for(let i=0;i<arr.length;i++){
//     try{
//         this.maintainFactory.initChart(this.setData(arr[i],this.superData[arr[i]]))
//     }catch(err){
//         console.error(err)
//     }
// }

// export const FlowSuperData: any = {
//     dropListArea: [],
//     dropListType: [],
//     areaTrafficStatistics: {
//         seriesData: MockNumber(800, 14, 3),
//         xData: MockAreaStatisticList(1)[0].area,
//         legendData: MockAreaStatisticList(1)[0].areaAlarm
//     },
//     areaTrafficTrend: {
//         seriesData: MockNumber(3000, 24, 14),
//         xData: MockAreaStatisticList(1)[0].areaAlarmTrend,
//         legendData: MockAreaStatisticList(1)[0].area
//     },
//     deviceTrafficStatistics: {
//         seriesData: MockNumber(30000, 10),
//         yData: MockAreaStatisticList(1)[0].deviceAlarmStatistic
//     }
// };

// export const AlarmSuperData: any = {
//     dropListArea: [],
//     dropListType: [],
//     areaAlarm: {
//         seriesData: MockNumber(800, 14, 3),
//         xData: MockAreaStatisticList(1)[0].area,
//         legendData: MockAreaStatisticList(1)[0].areaAlarm
//     },
//     areaAlarmTrend: {
//         seriesData: MockNumber(3000, 24, 14),
//         xData: MockAreaStatisticList(1)[0].areaAlarmTrend,
//         legendData: MockAreaStatisticList(1)[0].area
//     },
//     deviceAlarmStatistics: {
//         seriesData: MockNumber(30000, 10),
//         yData: MockAreaStatisticList(1)[0].deviceAlarmStatistic
//     },
//     dispatchedAboutAlarm: {
//         seriesData: MockNumber(100, 10, 4),
//         yData: MockAreaStatisticList(1)[0].dispatchedAboutAlarm,
//         legendData: ['有效', '无效', '待定', '未处理']
//     }
// };