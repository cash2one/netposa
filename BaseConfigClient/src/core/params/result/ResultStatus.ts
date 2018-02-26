/**
 * Created by dell on 2017/5/12.
 */
export const ResultStatus = {
    /**
     * 成功
     */
    OK: 200,

    /**
     * 系统错误
     */
    ERROR: 500,

    /**
     * 请求被拒绝
     */
    HttpError: 4001,

    /**
     * 参数空
     */
    ParamNull: 4002,

    /**
     * 参数类型错误
     */
    TypeError: 4003,

    /**
     * 用户名或密码错误
     */
    UserOrPwd: 4004,

    /**
     * 账户禁用
     */
    Disable: 4005,

    /**
     * 账户过期
     */
    OutData: 4006,

    /**
     * 没到使用时间
     */
    NotUseTime: 4007,

    /**
     * 权限不足，未分配权限
     */
    UsePermissions: 4008,

    /**
     * 需要下线
     */
    NotOnLine: 4009,

    /**
     * 保存图片失败
     */
    SavePicTure: 4010,

    /**
     * 请求pcc失败
     */
    RequestPcc: 4011,

    /**
     * 格式错误
     */
    ErrorFormat: 4012,
    /**
     * 未找到
     */
    NotFound: 4013,
    /**
     * 已经存在
     */
    IsExisted: 4014
};