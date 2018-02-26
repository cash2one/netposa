
export class SystemConfigParams{
    //比中照片数
    AlarmPhotoNum: number;
    //上传照片数
    PhotoFind: number;

    Identity: number;
    IdentityValue: number;
    
    //存储周期
    StoreTime: string;

    //视频回放时长
    videoBeforeTime: number;
    videoAfterTime: number;
    
    //描述字段
    desc: string;
}



// 系统配置常量参数类别
export const SystemConfigParamConst = {
    FieldName: {value: "ParamClass"},
    FieldValue: {value: "SystemConfigParameter"}
};