export class MarkersIcon {
    static NormalBlueIcon:string = '/images/map/normal-blue.png';
    static NormalGreenIcon:string = '/images/map/normal-green.png';
    static HoverRedIcon:string = '/images/map/hover-marker.png';
    static StartBlueIcon:string = '/images/map/start-blue.png';
    static StartGreenIcon:string = '/images/map/start-green.png';
    static EndIcon:string = '/images/map/end.png'
}

export class MacCarCrashParams {
    carId: string; // 车牌号码
    mac: string; // mac地址
    startTime: string; // 开始时间
    endTime: string; // 结束时间
    timeId: number; // 选中时间段id
    threshold: number; // 伴随次数
    alongTimeBefore: number; // 伴随前时间
    alongTimeAfter: number; // 伴随前时间
    plateNumberColor: number; // 车牌颜色
    carColor: number; // 车辆颜色
    carType: number; // 车辆类型
    vehicleBrand: number; // 车辆品牌
}

export interface carCrashListParam{
    carNO:string;
    carImg:string;
    carSpeed:number;
    time:string;
    location:string
}

export function getCarCrashList(num:number):Array<carCrashListParam>{
    let arr = [] as Array<carCrashListParam>;
    for(let i=0;i<num;i++){
        arr.push({
            carNO:'鄂A123'+ Math.round(Math.random()*10),
            carImg:'',
            carSpeed:Math.round(Math.random()*100),
            time:'2017-09-'+ Math.round(Math.random()*30),
            location:'关山大道太阳城'
        })
    }
    return arr;
}

export interface List {
    value: string;
    text: string;
}

export function carColorList():Array<List>{
    return [{value:'blue', text:'蓝色'},
        {value:'yellow', text:'黄色'},
        {value:'white', text:'白色'},
        {value:'black', text:'黑色'},
        {value:'green', text:'绿色'}];
}

export function carTypeList():Array<List>{
    return [
        {value:'MOTORCYCLE', text:'摩托车'},
        {value:'SMALL_CAR', text:'小型车(轿车)'},
        {value:'MEDIUM_CAR', text:'中型车(SUV、小客车)'},
        {value:'LARGE_CAR', text:'大型车(卡车、公交）'},
        {value:'NORMAL_CAR', text:'轿车'},
        {value:'MICRO_BUS', text:'面包车'},
        {value:'PASSENGER_CAR', text:'大客车'},
        {value:'FREIGHT_CAR', text:'大货车'},
        {value:'PICKUP_CAR', text:'皮卡'},
        {value:'SUV1_CAR', text:'商务车'},
        {value:'SUV2_CAR', text:'越野车'},
        {value:'MOTOR_TRICYCLE', text:'三轮摩托车'},
        {value:'LIGHT_BUS', text:'小型客车'},
        {value:'MEDIUM_BUS', text:'中型客车'},
        {value:'LARGE_BUS', text:'大型客车'},
        {value:'MICRO_TRUCK', text:'微型货车'},
        {value:'LIGHT_TRUCK', text:'小型货车'},
        {value:'MEDIUM_TRUCK', text:'中型货车'},
        {value:'VEHICLE_UNKNOWN', text:'未知车辆类型'}
    ]
}

export function carBrandList():Array<List>{
    return [
        {value:'00001', text:'丰田'},
        {value:'00002', text:'本田'},
        {value:'00003', text:'一汽'},
        {value:'00004', text:'大众'},
        {value:'00004', text:'福特'}
    ];
}

export function taskNameList():Array<List>{
    return [
        {value:'carMacCrash', text:'车辆碰Mac任务'},
        {value:'macCarCrash', text:'Mac碰车辆任务'}
    ];
}

export const FaceMacCrashOffLineData = [
    {
        Name:'车辆碰Mac任务1',
        CreateTime:'2017-09-08 12:02:45',
        Status:'Run',
        threshold: 70,
        AccompNum:3,
        Type:'CarToMac'
    },
    {
        Name:'Mac碰车辆任务1',
        CreateTime:'2017-09-08 12:02:45',
        Status:'Over',
        threshold: 80,
        AccompNum:5,
        Type:'MacToCar'
    }
];

export class OverlayName{
    static MapForResultLayer:string = 'MapForResultLayer';
    static MapForResultGroup: string = 'MapForResultGroup';
    static MapForAccpGroup: string = 'MapForAccpGroup';
    static MapForTrackLineLayer:string = 'MapForTrackLineLayer';
    static MapForResultLineGroup:string = 'MapForResultLineGroup';
    static MapForAccpLineGroup:string = 'MapForAccpLineGroup';
}

export class Size{
    width:number;
    height:number
}
declare let $:any;
export function getWidowSize():Size{
    let size =new Size();
    size.width = $(window).width();
    size.height = $(window).height();
    return size;
}