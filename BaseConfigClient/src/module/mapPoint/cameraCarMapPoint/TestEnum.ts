export class Capture {
    sex: number;//0 男 1女
    time: string;
    info: string;
    image: string;
    isCollection: number;//0 已收藏 1未收藏
    isMonitor: number;
}

export class Alarm {
    captrueImage: string;
    matchNum: string;
    alarmImage: string;
    cameraAddress: string;
    alarmTime: string;
    createUserName: string;
    libName: string;
    status: number;//0 有效 1无效
    isCollection: number;//0 已收藏 1未收藏
    sex: number;//0 男 1女
    cardNum: string;
    isHandle: number;//0已处理 1 未处理
    name: string;
}
let carArr = [
    '../../images/mock/point/4苏E 208QA.PNG',
    '../../images/mock/point/6苏G LJ981.PNG',
    '../../images/mock/point/8苏G 39999.PNG',
    '../../images/mock/point/11苏G 2A379.PNG',
    '../../images/mock/point/13苏G 6U532.PNG',
    '../../images/mock/point/14苏G LX907.PNG',
    '../../images/mock/point/28苏G EH213.PNG',
    '../../images/mock/point/24苏G NG082.PNG',
    '../../images/mock/point/18苏G LH073.PNG',
    '../../images/mock/point/20苏G DE633.PNG'
];
let adressArr = [
    '白色,小轿车',
    '黑色,小轿车',
    '白色,客车',
    '白色,suv',
    '白色,suv',
    '白色,客车',
    '蓝色,小轿车',
    '白色,客车',
    '黑色,小轿车',
    '白色,客车',
    '白色,小轿车',
    '白色,小轿车'
];
export class Car {
    imgPath: string;
    time: string;
    LicensePlate: string;
    address: string;
}

export function MockCarList(): Array<Car> {
    let arr = [] as Array<Car>;
    arr.push({
        LicensePlate: "苏G1C512",
        time: "2017-08-22 11:48:30",
        address: "邮科院湖心桥与南山路1号",
        imgPath: "../../images/mock/point/1苏G 1C512.PNG"
    } as Car)
    arr.push({
        LicensePlate: "苏GNB619",
        time: "2017-08-22 11:48:33",
        address: "邮科院湖心桥与南山路1号",
        imgPath: "../../images/mock/point/2苏G NB619.PNG"
    } as Car)
    arr.push({
        LicensePlate: "苏GJH006",
        time: "2017-08-22 11:48:36",
        address: "邮科院湖心桥与南山路1号",
        imgPath: "../../images/mock/point/3苏G JH006.PNG"
    } as Car)
    arr.push({
        LicensePlate: "苏E208QA",
        time: "2017-08-22 11:48:38",
        address: "邮科院湖心桥与南山路1号",
        imgPath: "../../images/mock/point/4苏E 208QA.PNG"
    } as Car)
    arr.push({
        LicensePlate: "苏G321A5",
        time: "2017-08-22 11:48:43",
        address: "邮科院湖心桥与南山路1号",
        imgPath: "../../images/mock/point/5苏G 321A5.PNG"
    } as Car)
    arr.push({
        LicensePlate: "苏GLJ981",
        time: "2017-08-22 11:48:45",
        address: "邮科院湖心桥与南山路1号",
        imgPath: "../../images/mock/point/6苏G LJ981.PNG"
    } as Car)
    arr.push({
        LicensePlate: "苏G23L161",
        time: "2017-08-22 11:48:50",
        address: "邮科院湖心桥与南山路1号",
        imgPath: "../../images/mock/point/7苏G 23L16.PNG"
    } as Car)
    arr.push({
        LicensePlate: "苏G39999",
        time: "2017-08-22 11:48:52",
        address: "邮科院湖心桥与南山路1号",
        imgPath: "../../images/mock/point/8苏G 39999.PNG"
    } as Car)
    arr.push({
        LicensePlate: "苏G836G6",
        time: "2017-08-22 11:48:59",
        address: "邮科院湖心桥与南山路1号",
        imgPath: "../../images/mock/point/9苏G 836G6.PNG"
    } as Car)
    arr.push({
        LicensePlate: "苏G1A167",
        time: "2017-08-22 11:49:01",
        address: "邮科院湖心桥与南山路1号",
        imgPath: "../../images/mock/point/10苏G 1A167.PNG"
    } as Car)

    return arr;
}

export function MockCaptureList(num: number, imageUrl: string): Array<Capture> {
    let arr = [] as Array<Capture>;
    for (let i = 0; i < carArr.length; i++) {
        arr.push({
            sex: Math.round(Math.random()),
            time: '2017-03-02 12:30:48',
            info: adressArr[i],
            color: 'red',
            isCollection: Math.round(Math.random()),
            image: carArr[i],
            isMonitor: Math.round(Math.random())
        } as Capture)
    }
    return arr
}

let poiintarr = [
    {
        captrueImage: '../../images/mock/point/1苏G 1C512.PNG',
        matchNum: '苏G 1C512',
        cameraAddress: '关山大道保利国际中心',
        alarmTime: '2017-08-22 11:48:30',
        createUserName: '李洋',
        libName: '在逃库',
        name: 'Avril Lavigne',
        status: Math.round(Math.random()),
        isCollection: Math.round(Math.random()),
        sex: Math.round(Math.random()),
        cardNum: '420198125422044445',
        isHandle: Math.round(Math.random()),
    },
    {
        captrueImage: '../../images/mock/point/2苏G NB619.PNG',
        matchNum: '苏G NB619',
        cameraAddress: '关山大道保利国际中心',
        alarmTime: '2017-08-22 11:58:30',
        createUserName: '李洋',
        libName: '在逃库',
        name: 'Avril Lavigne',
        status: Math.round(Math.random()),
        isCollection: Math.round(Math.random()),
        sex: Math.round(Math.random()),
        cardNum: '420198125422044445',
        isHandle: Math.round(Math.random()),
    },
    {
        captrueImage: '../../images/mock/point/3苏G JH006.PNG',
        matchNum: '苏G JH006',
        cameraAddress: '关山大道保利国际中心',
        alarmTime: '2017-08-22 11:48:30',
        createUserName: '李洋',
        libName: '在逃库',
        name: 'Avril Lavigne',
        status: Math.round(Math.random()),
        isCollection: Math.round(Math.random()),
        sex: Math.round(Math.random()),
        cardNum: '420198125422044445',
        isHandle: Math.round(Math.random()),
    },
    {
        captrueImage: '../../images/mock/point/7苏G 23L16.PNG',
        matchNum: '苏G 23L16',
        cameraAddress: '关山大道保利国际中心',
        alarmTime: '2017-08-22 11:48:30',
        createUserName: '李洋',
        libName: '在逃库',
        name: 'Avril Lavigne',
        status: Math.round(Math.random()),
        isCollection: Math.round(Math.random()),
        sex: Math.round(Math.random()),
        cardNum: '420198125422044445',
        isHandle: Math.round(Math.random()),
    },
    {
        captrueImage: '../../images/mock/point/23苏D 096QN.PNG',
        matchNum: '苏D 096QN',
        cameraAddress: '关山大道保利国际中心',
        alarmTime: '2017-08-22 11:48:30',
        createUserName: '李洋',
        libName: '在逃库',
        name: 'Avril Lavigne',
        status: Math.round(Math.random()),
        isCollection: Math.round(Math.random()),
        sex: Math.round(Math.random()),
        cardNum: '420198125422044445',
        isHandle: Math.round(Math.random()),
    }
];



export function MockAlarmList(num:number,imageUrl:string):Array<Alarm>{
    let arr = poiintarr as Array<Alarm>;
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
};
    return arr
}

// 真实数据

let personAlarm = {
    "result": {
        "AlarmLog": {
            "AccessLogID": "440039209787499051",
            "AlarmTime": "2017-11-06 13:59:04",
            "AreaID": "8d16d49414704e32ac5abdee3ad9e717",
            "CapFacePicUrl": "pLOC:402201323/data/20171106/21/66c5118c9a1611189e64f52e779eae53_4914",
            "EventType": "Hight",
            "ID": "8eff4d251b4640e391c411d0649eaebb",
            "IsUpload": false,
            "Level": 0,
            "ObjectID": "cb42aeaecbb647eca80f65f35b09dcb1",
            "ObjectName": "",
            "ObjectType": "Camera",
            "ReceiveSubAlarmDateTime": "2017-11-06 13:59:04",
            "ResponseState": "Undisposed",
            "ResponseTime": "2017-11-06 13:59:04",
            "Similarty": 0,
            "TaskId": "2b3a38d128b044779cd9dd0ffad9ea53"
        },
        "AlarmLogInfoArr": [
            {
                "AlarmLogInfo": {
                    "AlarmLogID": "8eff4d251b4640e391c411d0649eaebb",
                    "ID": "955256304497499051",
                    "LibID": "000008",
                    "PersonInfo": {
                        "Birth": "",
                        "CertifyingAuthority": "",
                        "FacePicPath": [
                            "pLOC:402201323/data_CAPTUREIMAGE/20171102/23/6e57f5566789c1d68289d03e9e93d3f1_1"
                        ],
                        "Gender": "0",
                        "HomeAddress": "",
                        "ID": "112774491489024000",
                        "IDCardNumber": "112774491489024000",
                        "LibId": "000008",
                        "Name": "周琦",
                        "Nation": "",
                        "userTag": "112774491489024000"
                    },
                    "Similarty": 45.16148658549079,
                    "SimilartyStatus": ""
                },
                "LibName": "zq",
                "Memo": ""
            }
        ],
        "AlarmNum": 1,
        "AreaName": "unkown",
        "Attention": false,
        "Collected": false,
        "ResponsePersonName": "unkown"
    },
    "resultType": "SubcribeAlarmLog"
}

let personList = {
    "Age": 60,
    "AreaID": "8d16d49414704e32ac5abdee3ad9e717",
    "Attractive": -1,
    "BottomColor": 0,
    "CameraID": "cb42aeaecbb647eca80f65f35b09dcb1",
    "FaceConfidence": 99.7300033569336,
    "FaceFeature": "",
    "FacePath": "pLOC:402201323/data/20171106/21/66c5118c9a1611189e64f52e779eae53_4914",
    "FaceRect": "[{\"x\":27,\"y\":27},{\"x\":81,\"y\":27},{\"x\":81,\"y\":81},{\"x\":27,\"y\":81}]",
    "Gender": "Men",
    "Glass": -1,
    "HasextractAttribute": true,
    "HasextractFeature": false,
    "HasfaceFeature": false,
    "ID": "440039209787499051",
    "IsPants": 0,
    "IsSleeve": 0,
    "LogTime": "2017-11-06 13:57:59",
    "Mask": 0,
    "Orientation": 0,
    "PersonConfidence": 0,
    "Race": -1,
    "SaveTime": "2017-11-06 13:59:01",
    "ScenePath": "",
    "Smile": -1,
    "TaskID": "2b3a38d128b044779cd9dd0ffad9ea53",
    "Texture": 0,
    "UpperColor": 0
};
let tnum = 0;
export function MockAlarmList4(num: number, page: number): any {
    let test = {
        TotalCount: num * 3,
        Result: [] as any
    }
    let arr = [];
    for (let i = 0; i < num; i++) {
        tnum++;
        let one = {
            id: '69105422973692510311721690209',
            orgId: '',
            monitorId: '71',
            channelId: '332',
            deviceId: '',
            originalVehicleInfo: '',
            speed: 30,
            direction: '',
            accessType: '',
            plateNumber: '苏DGC91'+tnum,
            plateType: '',
            plateColor: '2',
            vehicleType: 'H13',
            vehicleColor: 'A',
            vehicleBrand: '49',
            vehicleSubBrand: '490013',
            vehicleModelYear: '5242880',
            sunVisorNumber: '',
            napkinBox: '',
            pendantNum: '',
            checkMarkNum: '',
            safetyBeltNum: '',
            faceNumber: '',
            vehicleContour: '',
            panoramaImage: 'http://172.16.90.209:6551/DownLoadFile?filename=LOC:03/data/20171129/06/a8b548676374777de72effd508e4c78b_248148',
            featureImage: '',
            imageType: '',
            storageTime: '',
            xszt: '',
            yzsj: '',
            wzlx: '',
            sjcz: '0',
            hostCode: '',
            extNumber: '0',
            extDate: '',
            extString1: '',
            extString2: '',
            extString3: '',
            org: '',
            monitor: '',
            channel: '',
            x: '',
            y: '',
            monitorName: '',
            sjly: '',
            isCallPhone: '',
            qjtp2: '',
            qjtp3: '',
            qjtp4: '',
            tztp2: '',
            judgeDecision: '',
            judgeInfo: '',
            xxPlateId: '',
            score: '',
            passTimeStr: '',
            passTime: '2017-11-29 11:18:52',
        }
        test.Result.push(one);
    }
    return test
}