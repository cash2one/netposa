export class AccompOffLine {
    imagePath: Array<string>;
    mac: string; // mac地址
    startTime: string; // 开始时间
    endTime: string; // 结束时间
    timeId: number; // 选中时间段id
    threshold: number; // 伴随次数
    alongTimeBefore: number; // 伴随前时间
    alongTimeAfter: number; // 伴随前时间
    similarity: number;
    sex: number;
    age: number;
    hair: number;
    shoe: number;
    glasses: number;
    mask: number;
    cap: number;
    goods: number;
    clothing: number;
}
export const FaceMacCrashOffLineData = [
    {
        Name:'人脸碰Mac任务1',
        CreateTime:'2017-09-08 12:02:45',
        Status:'Run',
        threshold: 70,
        AccompNum:3,
        Type:'FaceToMac',
    },
    {
        Name:'Mac碰人脸任务1',
        CreateTime:'2017-09-08 12:02:45',
        Status:'Over',
        threshold: 80,
        AccompNum:5,
        Type:'MacToFace',

    }
];