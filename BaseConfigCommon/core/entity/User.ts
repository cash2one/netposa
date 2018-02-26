/**
 * Created by dell on 2017/4/17.
 */
export class User{
    //编号
    ID: string;
    //有效截止时间
    EndTimeValid: string;
    //扩展JSON数据
    Ext: string;
    //是否禁用
    IsDisable: boolean;
    //是否永久有效
    IsForeverValid: boolean;
    //用户类型
    PersonID: string;
    //密码
    Pwd: string;
    //有效开始时间
    StartTimeValid: string;
    //用户
    Uid: string;
    //用户级别
    UserLevel: number;
    //用户类型
    UserType: string;
    // 最后登录时间
    LastLoginTime: string;
	
	JsonUserData:any
}