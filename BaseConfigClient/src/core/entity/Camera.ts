// import { JsonUserData } from './ex/UserEx';
import {SystemPoint} from "./SystemPoint";
export class Camera extends SystemPoint{
    //编号
    ID: string;
    //行政区域编号
    AreaID: string;
    //相机类型
    CameraType: string;
    //编码
    Code: string;
    //描述
    Description: string;
    //扩展JSON数据
    Ext: string;
    //名称
    Name: string;
    //排序序号
    OrderNo: number;
    //视频播放名称
    PlayName: string;
    //拼音编码(头字母)
    PYCode: string;
    //视频网关编号
    VideoServer: string;
    IpAddress: string;
    LampID: string;
    LongitudeLatitude:string;
    PortNumber:number;
    JsonUserData:{[key:string]:any};
    DeviceReId:string;
    CaptureType:string;
}