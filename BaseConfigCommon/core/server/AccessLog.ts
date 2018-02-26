/**
 * 大数据引擎返回人像通行日志结果实体类.
 * create by zmp.
 * @time: 2017-09-05
 */

 export class AccessLog {

    ID: string;

    // 年龄
    Age: number;

    // 区域ID
    AreaID: string;

    // 魅力值
    Attractive: number;

    // 相机ID
    CameraID: string;

    // 眼镜：1:普通眼镜，0:太阳镜，-1:无
    Glass: number;

    // 种族
    Race: number;

    // 人脸相似度
    FaceConfidence: number;

    // 人脸特征
    FaceFeature: string;

    // 人脸路径
    FacePath: string;

    // 人脸在全景图中位置
    FaceRect: string;

    // 性别
    Gender: string;

    // 是否经过属性提取
    HasextractAttribute: boolean;

    // 是否经过特征提取
    HasextractFeature: boolean;

    // 是否具有特征信息
    HasfaceFeature: boolean;

    // 是否穿短裤0：否，1：是
    IsPants: number;

    // 是否穿短袖0：否，1：是
    IsSleeve: number;

    // 通行时间
    LogTime: Date;

    // 是否戴面具0：没戴，1：戴，-1:未知
    Mask: number;

    // 朝向,0：朝右，1：背面，2：朝左，3：正面

    Orientation: number;

    // 人体相似度
    PersonConfidence: number;

    // 人体特征
    PersonFeature: string;

    // 人体路径
    PersonPath: string;

    // 人体在全景图中位置
    PersonRect: string;

    // 保存时间
    SaveTime: Date;

    // 全景图的路径
    ScenePath: string;

    // 是否微笑，0：否，1：是，-1:未知
    Smile: number;

    SunGlasses: number;

    // 任务ID
    TaskID: string;

    // 是否有纹理0：无，1：有
    Texture: number;

    // 上衣颜色
    UpperColor: number;

    // 下衣颜色
    BottomColor: number;
 }