/**
 * 人脸库中人员model
 * 访问后台接口时 使用的是此对象的继承对象BusinessPersonModel
 */
export interface IBusinessPerson{
    // 主键
    ID: string;
    // 身份证号
    IDCardNumber: string;
    // 出生日期
    Birth: string;
    // 家庭地址
    HomeAddress: string;
    // 姓名
    Name: string;
    // 性别 参考com.sn.engine.general.enums.GenderType
    Gender: string;
    // 民族
    Nation: string;
    // 发证机关
    CertifyingAuthority: string;
    // 证件有效期起始日期
    BeginDate: string;
    // 证件有效期结束日期
    EndDate: string;
    // 入库时间
    CreateTime: string;
    // 修改时间
    UpdateTime: string;
    // 库id
    LibId: string;

    // 人脸图片集合 TODO （非数据库字段）
    FacePicPath: Array<string>;
}

export class BusinessPerson implements IBusinessPerson{
    // 主键
    ID: string;
    // 身份证号
    IDCardNumber: string;
    // 出生日期
    Birth: string;
    // 家庭地址
    HomeAddress: string;
    // 姓名
    Name: string;
    // 性别 参考com.sn.engine.general.enums.GenderType
    Gender: string;
    // 民族
    Nation: string;
    // 发证机关
    CertifyingAuthority: string;
    // 证件有效期起始日期
    BeginDate: string;
    // 证件有效期结束日期
    EndDate: string;
    // 入库时间
    CreateTime: string;
    // 修改时间
    UpdateTime: string;
    // 库id
    LibId: string;

    // 人脸图片集合 TODO （非数据库字段）
    FacePicPath: Array<string>;
}