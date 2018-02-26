export class MockCarLience{
    carLicense: string;
    type: string;
    speed: string;
    time:string;
    direction:string;
    device: string;
    brand: string;
    sub: string;
    color: string;
    featrues: string;
    test: string;
}

export function MockCarLienceList(num:number):Array<MockCarLience>{
    let arr = [] as Array<MockCarLience>;
    for (let i = 1; i<=num;i++){
        arr.push({
            carLicense: "苏JFDQQ8",
            type: "轿车",
            speed: "30km/h",
            time: "2017-07-18 15:30:23",
            direction: "向北",
            device: "滨海大道28米向西2车道维和大道",
            brand: "别克",
            sub: "君越2010",
            color: "银色",
            featrues: "无",
            test: "无"
        } as MockCarLience)
    }
    return arr
}

export class MockCarArchives{
    code: string;
    type: string;
    license: string;
    color: string;
    engineNum:string;
    loginTime:string;
    violation: string;
    host: string;
    personID: string;
    phone: string;
    address: string;
}

export function MockCarArchivesList(num:number):Array<MockCarArchives>{
    let arr = [] as Array<MockCarArchives>;
    for (let i = 1; i<=num;i++){
        arr.push({
            carLicense: "苏JFDQQ8",
            type: "小型汽车牌照",
            code: "LS4BDB3DJDKDLDL",
            license: "别克-君越2017款",
            color: "银色",
            engineNum:"246747K",
            loginTime:"2016-7-27",
            violation: "3次违章",
            host: "张某",
            personID: "12345645612",
            phone: "150245578552",
            address: "武汉洪山区保利国际大厦保利时代3栋405"
        } as MockCarArchives)
    }
    return arr
}


export class MockpersonRecord{
    simDegree: string;
    ageTime: string;
    hair: string;
    glasses: string;
    passTime: string;
    getDevice: string;
    featrues:string;
    hat: string;
    mask: string;
    carry: string;
    sheet: string;
}

export function MockpersonRecordList(num:number):Array<MockpersonRecord>{
    let arr = [] as Array<MockpersonRecord>;
    for (let i = 1; i<=num;i++){
        arr.push({
            simDegree: "90%",
            ageTime: "青年",
            hair: "长发",
            glasses: "戴眼镜",
            passTime: "2017-07-18 10:18:55",
            getDevice: "摄像机1",
            featrues:"短袖,黑色",
            hat:"不戴帽子",
            mask: "不戴口罩",
            carry: "未知",
            sheet: "未知"
        } as MockpersonRecord)
    }
    return arr
}

export class MockpersonArchives{
    name: string;
    phone: string;
    simDegree: string;
    marriage: string;
    familyName: string;
    placeOfOrigin:string;
    birth: string;
    personID: string;
    address: string;
    serverCompany: string;
    escape: string;
}

export function MockpersonArchivesList(num:number):Array<MockpersonArchives>{
    let arr = [] as Array<MockpersonArchives>;
    for (let i = 1; i<=num;i++){
        arr.push({
            name: "杨大大",
            phone: "13986299109",
            simDegree: "90%",
            marriage: "已婚",
            familyName: "汉族",
            placeOfOrigin: "陕西西安",
            birth: "2017-07-18",
            personID: "123456544565444",
            address:"中国大陆",
            serverCompany:"东方王丽",
            escape: "否"
        } as MockpersonArchives)
    }
    return arr
}

export class MockWifiRecord{
    mac: string;
    time: string;
    address: string;
    device: string;
    ssid: string;
    hotMac:string;
    wifiStrong: string;
}

export function MockWifiRecordList(num:number):Array<MockWifiRecord>{
    let arr = [] as Array<MockWifiRecord>;
    for (let i = 1; i<=num;i++){
        arr.push({
            mac: "00-e0-fc-12-34-56",
            time: "2017.06.06 12:00:01",
            address: "海滨大道28米向西2车道",
            device: "Wi-Fi探针1",
            ssid: "热点名称",
            hotMac: "355065655122115112155",
            wifiStrong: "-63dB"
        } as MockWifiRecord)
    }
    return arr
}

// 车辆过车记录
export class CarLience{
    takePicture: string;// 车辆图片
    carLicense: string;// 车牌
    type: string;// 车辆类型
    speed: string;// 车速
    time:string;// 通行时间
    direction:string;// 行驶方向
    device: string;// 采集设备
    brand: string;// 品牌
    sub: string;// 子品牌
    color: string;// 车辆颜色
    featrues: string;// 特征
    test: string;// 违章记录
}

// 车辆档案
export class CarArchives{
    carLicense: string;// 车牌
    licenseType: string;// 车牌类型
    code: string;// 识别代码
    type: string;// 车型
    color: string;// 车身颜色
    engineNum:string;// 发动机号
    loginTime:string;// 初次登记
    violation: string;// 发违章情况
    owner: string;// 机动车主
    personID: string;// 身份证号
    phone: string;// 联系电话
    address: string;// 登记住址
}

// 车辆档案详情
export class CarDetailArchives{
    carLicense: string;// 车牌
    carPicture: string;// 车辆图片
    type: string;// 车辆类型
    brand: string;// 车辆品牌
    color: string;// 车身颜色
    useNature: string;// 使用性质
    engineNum:string;// 发动机号
    releaseDate:string;// 出厂日期
    licenseColor: string;// 车牌颜色
    licenseType: string;// 车牌类型
    code: string;// 识别代码
    owner: string;// 机动车主
    ownerPicture: string;// 车主图片
    sex: string;// 性别
    nationality: string;// 名族
    birthday: string;// 出生日期
    personID: string;// 身份证号
    phone: string;// 联系电话
    driverLicenseInfo: string;// 驾照信息
    violation: string;// 发违章情况
    loginTime:string;// 初次登记
    address: string;// 登记住址
}

// 人员通行记录
export class PersonLience{
    simDegree?: string;
    ageTime: string;
    hair: string;
    glasses: string;
    passTime: string;
    getDevice: string;
    featrues:string;
    hat: string;
    mask: string;
    carry: string;
    sheet: string;
    collectStatus: boolean;
    surveillanceStatus: boolean;
}

// 人员通行记录
export class PersonDetailArchives{
    name: string;
    phone: string;
    simDegree: string;
    marriage: string;
    familyName: string;
    placeOfOrigin:string;
    birth: string;
    personID: string;
    address: string;
    serverCompany: string;
    escape: string;
}



