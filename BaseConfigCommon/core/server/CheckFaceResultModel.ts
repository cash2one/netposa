import {DBMatchFacePoint} from "../params/SearchFaceParams";
/**
 * 人脸检测结果模型.
 * create by zmp.
 * @time: 2017-09-02
 */

 export class DBMatchFaceRect {

    left: number;

    top: number;

    right: number;

    bottom: number;

    confidence: number;
 }

 /**
  * 人脸位置信息
  */
 export class FacePostion {

    rect: DBMatchFaceRect;

    points: Array<DBMatchFacePoint>
 }

 /**
  * 人脸特征提取结果
  */
 export class DetectFaceResult {

    // taskId
    key: string;

    // 图片url地址
    imageurl: string;

    // 时间戳
    timeStamp: string;

    // 有效时长
    efficacyTime: string;
 }

 /**
  * 人脸检测结果(不成功后的结果)
  */
 export class CheckFaceResult extends DetectFaceResult {

    // 图片数据(base64编码后)
    image: string;

    // 人脸位置信息集合
    faceInfo: Array<FacePostion>
 }

