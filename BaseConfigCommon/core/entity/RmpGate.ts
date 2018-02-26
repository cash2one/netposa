import {SystemPoint} from "./SystemPoint";
export class RmpGate extends SystemPoint{
    ID:string;
    Code: string;
    Name: string;
    RmpServerID: string;
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
    IodServerID:string;
}