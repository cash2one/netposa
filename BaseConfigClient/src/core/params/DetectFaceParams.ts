/**
 * Created by key on 2017/7/13.
 */
export class DetectFaceParams{
    commandType: string;
    cutInfo: {
        bottom: number;
        left: number;
        top: number;
        right: number;
    };
    detectType: string;
    imagedata: string;
    imageurl: string;
    markInfo:{
        lefteye: coordinate;
        righteye: coordinate;
        nose:  coordinate;
        mouthleft:  coordinate;
        mouthright: coordinate;
        left: number;
        top: number;
        right: number;
        bottom: number;
    }
}

export class coordinate{
    x: number;
    y:  number;
}