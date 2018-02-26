export class MacCollisionAnalysisParams{
    macImpactList:Array<MacImpact>;
    taskId:string;
    taskName:string;
}
export class MacImpact{
    areaNo:string;
    deviceType:DeviceType;
    startTime:string;
    endTime:string;
}
export class DeviceType{
    EFENCE:Array<string>;
    WIFI:Array<string>
}


export class MacCollisionAnalysisResult{
    PerceiveCollideEntities:Array<PerceiveCollideEntitiesResult>
    TaskId:string;
}

export class PerceiveCollideEntitiesResult{
    num:number;
    PerceiveCollideAccesses:Array<PerceiveCollideAccessesModel>;
    Type:string;
}

export class PerceiveCollideAccessesModel{
    AreaNo:string;
    WiFiLog?:WifiLogModel;
    EFenceLog?:EFenceLogModel;
}

export class WifiLogModel{
    Antenna:string;
    ApMac:string;
    ApSsid:string;
    AreaId:string;
    Brand:string;
    Channel:string;
    EncryptionType:string;
    Frequency:string;
    ID:string;
    IdentityContent:string;
    IdentityType:string;
    Mac:string;
    MacDeviceId:string;
    PointX:string;
    PointY:string;
    Rssi:string;
    Snr:string;
    Source:string;
    SsidList:string;
    TaskId:string;
    AcqTime:string;
}

export class EFenceLogModel{
    AreaId:string;
    ID:string;
    IMEI:string;
    IMSI:string;
    IMSI2:string;
    Jzbh:string;
    LAC:string;
    Mac:string;
    MobileDeviceId:string;
    Nrssi:string;
    SmsSendStatus:string;
    TMSI:string;
    TaskId:string;
    AcqTime:string;
}