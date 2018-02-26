/**
 * 存储过程获取布控人信息用
 * 其他业务请勿使用
 * 对应存储过程PROC_GET_USERPERSONINFO_CREATETASK
 */
export class UserPersonInfo{
    ID: string; // userID
    PersonID: string;
    PersonName: string;
    AreaID: string;
    AreaCode: string;
    AreaName: string;
    PoliceID: string;
}