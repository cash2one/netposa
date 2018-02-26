/**
 * 人脸检测结果状态码.
 * create by zmp.
 * @time: 2017-09-02
 */

 export const CheckFaceResultCode = {

    // 参数为空(无人脸、命令类型、人脸提取类型)
    ParamNull: 4002,

    // 前端错误的命令
    WrongCommand: 4026,

    // 请求PCC失败
    RequestPcc: 4011,

    // 没有检测到人脸
    NoFace: 4022,

    // 检测到多张人脸
    ManyFace: 4023,

    // 保存照片失败
    SavePicTure: 4010,

    // 截取图片失败
    CutPicture: 4025
 }