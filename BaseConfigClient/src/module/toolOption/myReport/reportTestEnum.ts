export class MockCar{
    LicensePlate:string;
    imgPath: string;
    name: string;
    time:string;
    address: string;
    isValid: string;
}

export class MockPerson{
    time: string;
    address: string;
    imgPath1: string;
    imgPath2: string;
    similarity: string;
    name: string;
    library: string;
    credential: number;
    isValid: string;
}
export class MockMac{
    mac: string;
    time: string;
    address: string;
    isValid: string;
}


export function MockCarList(num:number):Array<MockCar>{
    let arr = [] as Array<MockCar>;
    for (let i = 1; i<=num;i++){
        arr.push({
            LicensePlate: "苏BEDV25",
            time: "2017-08-08 12:00:13",
            address: "邮科院湖心桥与南望山路望山路1",
            imgPath: "http://temp.im/140x140/eee/fff",
            name: "admin",
            isValid: "无效"
        } as MockCar)
    }
    return arr
}

export function MockPersonList(num:number):Array<MockPerson>{
    let arr = [] as Array<MockPerson>;
    for (let i = 1; i<=num;i++){
        arr.push({
            time: "2017-08-08 12:00:13",
            address: "邮科院湖心桥与南望山路望山路1",
            imgPath1: "http://temp.im/140x140/eee/fff",
            imgPath2: "http://temp.im/140x140/eee/fff",
            similarity: "98%",
            name: "Avril Lavigne",
            library: "测试布控库",
            credential: 420198125422044445,
            isValid: "有效"
        } as MockPerson)
    }
    return arr
}

export function MockMacList(num:number):Array<MockMac>{
    let arr = [] as Array<MockMac>;
    for (let i = 1; i<=num;i++){
        arr.push({
            mac: "00-e0-fc-12-34-56",
            time: "2017-07-01 12:02:23",
            address: "武汉市洪山区关山大道新南路保利国际中心",
            isValid: "无效"
        } as MockMac)
    }
    return arr
}
