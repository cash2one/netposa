export class FaceAnalysisParams {
    imagePath: string; // 上传图片识别人脸
    idCardNumber: string; // 身份信息
    arrLibId: Array<number>; // 选中人像库
    threshold: number; // 相似度
    arrGender: Array<number>; // 性别 0 全部 1 男  2 女
    nation: string; // 民族
    retrievalReason: number; // 检索事由
    maxAge:number;
    minAge:number;
    address:string;
}

//人脸检索单个对象
export class PersionFace{
    imgPath: string;
    name: string;
    libraryName: string;
    similarity: number;
}

export function MockPersionFaceList(num:number):Array<PersionFace>{
    let arr = [] as Array<PersionFace>;
    for(let i = 0;i < num; i++) {
        arr.push({
            imgPath: '/images/analysis/human-default.png',
            name: '谢春全' + i,
            libraryName: '谢春全库',
            similarity: Math.round(Math.random()*100)
        })
    }
    return arr
}