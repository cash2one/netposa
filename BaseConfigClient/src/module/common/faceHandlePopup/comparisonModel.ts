/**
 * Created by tj on 2017/7/21.
 */

//一人脸 多人脸选择人脸结果 无人脸标定后结果
export interface FaceComparison{
    //有效时间
    efficacyTime:string;
    //图片数据
    image?:string;
    //人脸信息
    faceInfo?:Array<FaceInfo>;
    //图片地址
    imageurl?:string;
    //比对key
    key?:string;
    //时间模板
    timeStamp?:string;
}

//比对结果
export interface ComparisonResult{
    //比分
    Score:number;
    //任务id
    TaskId:string;
}

export interface FaceInfo{
    points:Array<Ponint>;
    rect:Rect;
}

export interface Rect{
    //距离最上侧距离
    top:number;
    //距离最上侧距离
    bottom:number;
    //距离左侧距离
    left:number;
    //距离左侧距离
    right:number;
    confidence:number;
}

export interface Ponint{
    x:number;
    y:number;
}



