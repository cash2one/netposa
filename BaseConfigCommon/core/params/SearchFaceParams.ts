/**
 * 特征提取参数对象.
 * create by zmp.
 * @time: 2017-09-01
 */
// 图片裁剪信息
export class CuteInfo {

    left: number;

    top: number;

    right: number;

    bottom: number;
}

// 人脸标定坐标信息
export class DBMatchFacePoint {

    x: number;

    y: number;
}

// 人脸标定对象
export class MarkInfo {
    // 眼睛
    lefteye: DBMatchFacePoint;

    righteye: DBMatchFacePoint;

    // 鼻子
    nose: DBMatchFacePoint;

    // 嘴唇
    mouthleft: DBMatchFacePoint;

    mouthright: DBMatchFacePoint;

    top: number;

    left: number;

    bottom: number;

    right: number;
}

// 人脸特征提取参数
export class DetectFaceParams {

    // 检索类型
    detectType: string;

    // 命令类型
    commandType: string;

    // 照片URL地址
    imageurl: string;

    // 照片BASE64编码字符串
    imagedata: string;

    // 照片裁剪信息
    cutInfo: CuteInfo;
    
    // 人脸标定信息
    markInfo: MarkInfo;
}