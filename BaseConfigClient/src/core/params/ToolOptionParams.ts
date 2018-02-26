
export class ToolOptionParams {
    commandType:string;
    detectType:string;
}

//人脸检索
export class CheckFaceParams extends ToolOptionParams{
    //上传的图片数据
    image:string;
}

//特征提取
export class DetectFaceParams extends ToolOptionParams{
    //图片数据
    imagedata:string;
    //图片url
    imageurl:string;
    //标定的五官点位和截取人脸的位置
    markInfo:MarkInfo;
}

export class MarkInfo{
    left:number;
    right:number;
    top:number;
    bottom:number;
    lefteye:Point;
    righteye:Point;
    nose:Point;
    mouthleft:Point;
    mouthright:Point;
}

export class Point{
    x:number;
    y:number;
}

//人脸比对
export class FaceverifyParams{
    key0:string;
    key1:string;
}
