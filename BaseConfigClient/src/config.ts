/**
 * 在这里存放系统级别的配置参数
 * 因为为了便于修改后不需要重新编译, 故此文件是js文件
 * @type {{}}
 */
export default class Config {
    /**
     * java后台的socket地址
     */
    //192.168.10.160
    static readonly SOCKET_URL = "http://192.192.11.83:11006";
    // static readonly SOCKET_URL = "http://172.16.90.188:11006";
    // static readonly SOCKET_URL = "http://172.16.91.132:11006";
    /**
     * 全局超时时间 单位为毫秒
     * @type {string}
     */
    static readonly GLOBAL_TIME_OUT = 30 * 1000;

    /**
     * 外部图片视频资源路径
     * @type {string}
     */
    static readonly GLOBAL_FACE_PATH = "/bimg_upload/";
    static readonly GlOBAL_ICON_PATH = "http://172.16.91.151:6551";

    static readonly IS_DEV = false;
};
