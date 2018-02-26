//
// import {Camera} from "../entity/Camera";
// import {Points} from "../entity/ex/SystemPointEx";
// /** create by key
//  * 轨迹分析 检索model
//  * @time: 2017-06-16 10:42:04
//  */
//
// export class TrailAccssModel{
//     result:Array<TrailAccssLogModel>;
//     taskId:string;
//     totalCount:number;
//     cameraOrderList:Array<CameraOrder>;
// }
//
// export class TrailAccssLogModel{
//     AccessLog:AccessLog;
//     Camera:CameraInfo;
//     Score:number;
//     AccessLogList?:Array<AccessLog>;
//     Index:number;
// }
//
// export class CameraInfo extends Camera{
//     CaptureType:string;
//     JsonExtData:any;
//     JsonUserData:{
//         Point:Points;
//         [key:string]:any
//     };
//     StrJsonUserData:any;
//     lon:number;
//     lat:number;
// }
//
// export class AccessLog{
//     Age:number;
//     AreaID:string;
//     Attractive:number;
//     CameraID:string;
//     Eyeglasses:number;
//     FaceConfidence:number;
//     FaceFeature:string;
//     FacePath:string;
//     FaceRect:string;
//     Gender:string;
//     HasextractAttribute:boolean;
//     HasextractFeature:boolean;
//     HasfaceFeature:boolean;
//     ID:string;
//     IsPants:number;
//     IsSleeve:number;
//     LogTime:string;
//     Mask:number;
//     Orientation:number;
//     PersonConfidence:number;
//     PersonFeature:string;
//     PersonPath:string;
//     PersonRect:string;
//     SaveTime:string;
//     ScenePath:string;
//     Smile:number;
//     SunGlasses:number;
//     TaskID:string;
//     Texture:number;
// }
//
// export class CameraOrder{
//     AccessLogList:Array<Access>;
//     Camera:CameraInfo;
//     RecordCount:number
//     AccessLog?:AccessLog;
// }
//
// export class ImgLoadLimitMod{
//     imgTaskID:string;
//     limitTime:number;
// }
//
// export class Access{
//     AccessLog:AccessLog;
//     Score:number;
// }