/**
 * Created by tj on 2017/6/28.
 */

//摄像机设备返回值
export class CameraResponse {
    //摄像类型
    cameraType: Array<CameraNum>;
    //总数
    total:number;
    //离线
    offTotal: number;
    //在线
    onlineTotal:number;
    //设备所在区域详情
    data:Array<CameraMsg>;
}

export class CameraNum {
    typeName:string;
    count:number;
}

export class CameraMsg {
    //区域id
    AreaID:string;
    //摄像类型
    CameraType:string;
    //设备名
    Name:string;
    //通道
    PlayName:string;
    JsonUserData:CameraJsonUserData;
}

class CameraJsonUserData{
    //区域名
    AreaName:string;
    //状态
    IsOnLine:string;
    //视频服务器ip
    VideoServerIp:string;
}

/*==============*/

//导出返回值
export class exportResponse{
    filePath:string;
}

/*==============*/

//服务器返回值
export class ServerResponse {
    //服务器名
    Name:string;
    //服务器类型
    ServerType:string;
    //服务器ip
    IpAddress:string;
    //区域名
    AreaName:string;
    //cpu
    Cpu:string;
    //内存
    Memory:string;
    //网络使用情况
    NetWorkSpeed:string;
    //状态
    IsOnLine:string;
}

/*==============*/

//用户返回值
export class UserResponse {
    //用户类型
    UserType: string;
    //最近登录时间
    LastLoginTime:string;
    //区域id
    ID:string;
    //用户详情
    JsonUserData:UserJsonUserData;
}


export class UserJsonUserData{
    //区域名
    AreaName:string;
    //用户名
    PersonName:string;
    //单位名
    UnitName:string;
    //登录IP
    LoginIp:string;
    //状态
    IsOnLine:string;
    //最近查看模块
    LookModule:string;
    //登录状态
    IsOnline:string;
}

/*==============*/

//操作日志返回值
export class ActionLogResponse {
    //记录时间
    OperatorTime: string;
    //IP地址
    OperatorIP:string;
    //操作模块
    OperatorModule:string;
    //操作详情
    Descrption:string;
    JsonUserData:ActionLogJsonUserData;
}


export class ActionLogJsonUserData{
    //操作人
    OperatorUserName:string;
    //单位名
    UnitName:string;
}
/*==============*/

//操作日志返回值
export class RunLogResponse {
    //记录时间
    ExceptionTime: string;
    //IP地址
    ExceptionServerIP:string;
    //异常模块
    ExceptionModule:string;
    //详情
    ExceptionMessage:string;
}
