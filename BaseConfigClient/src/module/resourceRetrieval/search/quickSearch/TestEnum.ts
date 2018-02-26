export class MockCar{
    LicensePlate:string;
    speek: string;
    time:string;
    address: string;
}

export class MockPerson{
    sex: string;
    time: string;
    address: string;
    imgPath: string;
}

export class MockWifi{
    mac: string;
    time: string;
    address: string;
}

export class MockEF extends MockWifi{
    IMSI: string;
    IMEI: string;
}

export class MockDevice{
    code: string;
    name: string;
    type: string;
    address: string;
    position: string;
}

export class MockPosition{
    name: string;
    address: string;
}

export function MockCarList(num:number):Array<MockCar>{
    let arr = [] as Array<MockCar>;
    for (let i = 1; i<=num;i++){
        arr.push({
            LicensePlate: "苏BEDV25",
            speek: "80 km/h",
            time: "2017-08-08 12:00:13",
            address: "滨海大道28米向西2车道",
            imgPath: "http://temp.im/64x64/ccc/fff"
        } as MockCar)
    }
    return arr
}

export function MockPersonList(num:number):Array<MockPerson>{
    let arr = [] as Array<MockPerson>;
    for (let i = 1; i<=num;i++){
        arr.push({
            sex:"女",
            time: "2017-08-08 12:00:13",
            address: "武昌区关山大道保利国际",
            featrues: "黑色长发, 粉色短袖",
            imgPath: "http://temp.im/64x64/ccc/fff"
        } as MockPerson)
    }
    return arr
}

export function MockWifiList(num:number):Array<MockWifi>{
    let arr = [] as Array<MockWifi>;
    for (let i = 1; i<=num;i++){
        arr.push({
            mac: "00-e0-fc-12-34-56",
            time: "2017-07-01 12:02:23",
            address: "中观十宇北大街肯德基2层"
        } as MockWifi)
    }
    return arr
}

export function MockEFList(num:number):Array<MockEF>{
    let arr = [] as Array<MockEF>;
    for (let i = 1; i<=num;i++){
        arr.push({
            mac: "00-e0-fc-12-34-56",
            time: "2017-07-01 12:02:23",
            address: "中观十宇北大街肯德基2层",
            IMSI: "453422132313213",
            IMEI: "453422132313213"
        } as MockEF)
    }
    return arr
}

export function MockDeviceList(num:number, type:string):Array<MockDevice>{
    let arr = [] as Array<MockDevice>;
    for (let i = 1; i<=num;i++){
        if(type=='camera'){
            arr.push({
                code: "12345678",
                name: "车辆摄像机"+i,
                type: "摄像机",
                address: "武昌区关山大道保利国际",
                position: "100.23134, 18.72879"
            } as MockDevice)
        }else if(type=='rmpgate'){
            arr.push({
                code: "12345678",
                name: "车辆摄像机"+i,
                type: "卡口",
                address: "武昌区关山大道保利国际",
                position: "100.23134, 18.72879"
            } as MockDevice)
        }else if(type=='wifi'){
            arr.push({
                code: "12345678",
                name: "车辆摄像机"+i,
                type: "wifi",
                address: "武昌区关山大道保利国际",
                position: "100.23134, 18.72879"
            } as MockDevice)
        }else if(type=='electronicfence'){
            arr.push({
                code: "12345678",
                name: "车辆摄像机"+i,
                type: "电围",
                address: "武昌区关山大道保利国际",
                position: "100.23134, 18.72879"
            } as MockDevice)
        }
    }
    return arr
}

export function MockPositionList(num:number):Array<MockPosition>{
    let arr = [] as Array<MockPosition>;
    for (let i = 1; i<=num;i++){
        arr.push({
            name: "保利国际中心",
            address: "关山大道与新竹路交叉口西北20米"
        } as MockPosition)
    }
    return arr
}
