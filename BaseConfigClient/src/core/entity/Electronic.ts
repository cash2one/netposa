import { RfidCollect } from "./RfidCollect";

export class Electronic extends RfidCollect {
    ID:string;
    Code: string;
    Name: string;
    Type: string;
    InternalID:string;
    WifiServerID: string;
    InternalObjectID: string;
    OrgUnitID: string;
    GateType: string;
    SceneAppType: string;
    AssetsState: string;
    LampID: string;
    AreaID: string;
    AreaNo: string;
    DeptNo: string;
    RoadNo: string;
    BuildLocation: string;
    ConnectProvince: string;
    RoadSectionsNoer: string;
    PgisRmpGateID: string;
    DeviceState: string;
    PYCode: string;
    Description: string;
    Ext:string;
    Lon:number;
    Lat:number;
    IpAddress:string;
    Port:string;
    LongitudeLatitude:string;
    PortNumber:number;
    JsonUserData:{[key:string]:any};
    DeviceReId:string;
    OrderNo:string;
    IodServerID:string;
}