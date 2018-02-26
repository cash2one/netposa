/**
 * Created by dell on 2017/8/5.
 */
/**
 * controller和controller之间交互的一些类型
 * 这里存放全局范围中需要用到的广播字符串
 * 业务模块弹窗之间的广播字符串不放在此处
 * @type {{CHECK_LOGIN: string}}
 */
export const BubbleCode = {
    /**
     * 退出登录广播
     * 此code会将关联的interval事件等停止
     */
    LOGIN_OUT: "login_out"
}