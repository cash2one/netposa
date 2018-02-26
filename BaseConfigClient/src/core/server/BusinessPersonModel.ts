import {IBusinessPerson, BusinessPerson} from "../entity/BusinessPerson";
import {IPersonAssist} from "./PersonAssistModel";
/**
 * 用户增/改Business_Person表的查询条件
 */
export class BusinessPersonEx implements IPersonAssist,IBusinessPerson{
    ID: string;
    IDCardNumber: string;
    Birth: string;
    HomeAddress: string;
    Name: string;
    Gender: string;
    Nation: string;
    CertifyingAuthority: string;
    BeginDate: string;
    EndDate: string;
    CreateTime: string;
    UpdateTime: string;
    LibId: string;
    FacePicPath: Array<string>;
    /**
     * 证件种类
     */
    CredentialsType: string;
    /**
     * 文化程度
     */
    Degree: string;
    /**
     * 出生地
     */
    HomePlace: string;
    /**
     * 籍贯
     */
    HouseHoldReg: string;
    /**
     * 身份职衔
     */
    Identity: string;
    /**
     * 是否具有特征
     */
    IsHasFeature: string;
    /**
     * 备注信息
     */
    Memo: string;
    /**
     * 服兵役情况
     */
    MilitarService: boolean;
    /**
     * 手机号码
     */
    Mobile: string;
    /**
     * 国籍
     */
    Nationality: string;
    /**
     * 曾用名
     */
    OldName: string;
    /**
     * 身高
     */
    Stature: number;

    /*TODO 编辑扩展字段*/
    /**
     * 操作类型 请看枚举 DataOperType
     */
    OperType: string;
    /**
     * 人脸图片特征提取任务id
     */
    AddPicTaskIds: Array<string>;
    /**
     * 删除的图片url
     */
    DeletePicPath: Array<string>;

    /*TODO 列表显示扩展字段*/
    /**
     *  人脸图片集合
     */
    AddFacePicPath: Array<string>;
}