/**
 * Created by key on 2017/7/12.
 */
export class CheckFace{
    efficacyTime:number;
    imageurl:string;
    key:string;
    timeStamp:string;
    image:string;
    faceInfo:Array<FaceInfo>;
}

export class FaceInfo{
    points:Array<{
        x:number;
        y:number;
    }>;
    rect:{
        bottom:number;
        confidence:number;
        left:number;
        right:number;
        top:number;
    }
}