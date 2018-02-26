export function MockWifiList(num:number):Array<any>{
    let arr = [] as Array<any>;
    for (let i = 0; i<num;i++){
        arr.push({
                "AcqTime": "2017-11-09 14:58:38",
                "AreaId": "14dc16c0acd14a3b9f1b5044efe721c1",
                "Brand": "tplink",
                "ID": "00081701201510000001:00:5e:7f:ff:fa",
                "IdentityContent": "56",
                "IdentityType": "4",
                "Mac": "01:00:5e:7f:ff:fa",
                "MacDeviceId": "0efa2ebe08e0472481f752060f9e943b",
                "PointX": "11.222222",
                "PointY": "11.333333",
                "Rssi": "-96"
        } as any)
    }
    return arr
}

export function MockWifiAlarmList(num:number):Array<any>{
    let arr = [] as Array<any>;
    for (let i = 0; i<num;i++){
        arr.push({
                "AlarmLog": {
                    "AccessLogID": "000422212015100000F4-8E-38-AC-58-31",
                    "AlarmTime": i+"2017-11-09 15:23:44",
                    "AreaID": "14dc16c0acd14a3b9f1b5044efe721c1",
                    "ID": "000422212015100000F4-8E-38-AC-58-31",
                    "IsUpload": false,
                    "Level": 0,
                    "ObjectID": "",
                    "ObjectName": "",
                    "ObjectType": "WiFi",
                    "Similarty": 0,
                    "TaskId": "147064c2ac4c44298f7b29067313f2f5"
                },
                "AlarmNum": 0,
                "AreaName": "unkown",
                "Attention": false,
                "Collected": false,
                "ResponsePersonName": "unkown"
            
        } as any)
    }
    return arr
}