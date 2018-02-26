/**
 * Created by dell on 2017/4/8.
 */
export const ErrorCode = {
    // 正常
    OK: 200,
    // 后台错误
    ERROR_BACK_ERROR: 500,
    // nodejs错误
    ERROR_NODE_ERROR: 20000.5,
    // 未知错误
    ERROR: -1,
    // 传入的参数不能为空
    ERROR_NO_PARAM: -2,
    // ----------------行政区域相关 -10000+ -------------------------
    ERROR_REPEAT_AREA: -20101, // 重复的行政区域
    // 行政区域父区域id为空
    ERROR_PARENT_AREA_ID_NULL: -20102,
    // 行政区域code唯一编码为空
    ERROR_AREA_CODE_NULL: -20103,
    // 行政区域id为空;
    ERROR_AREA_ID_NULL: -20104,
    // 行政区域不存在
    ERROR_NO_AREA: -20105,
    // 不能删除顶级行政区域
    ERROR_NOT_DELETE_ROOT_AREA: -20106,
    // 父级行政区域不存在
    ERROR_NO_PARENT_AREA: -20107,
    // 父行政区域不能为自身
    ERROR_PARENT_AREA_NOT_SELF: -20108,
    // 重复的灯杆编码
    ERROR_REPEAT_LAMP: -10009,
    // 行政单位相关 -20000+
    ERROR_UNIT_PARAM_NULL: -20001, // 行政单位保存时部分参数为空
    ERROR_UNIT_CODE_REPEAT: -20002,
    ERROR_NO_UNIT: -20003,
    //---------------用户管理相关 -30000+
    //用户不存在
    ERROR_PERSON_NULL:-30001,
    //登录账号重复
    ERROR_USER_UID_REPEAT:-30002,

    ERROR_USER_NULL:-30003,
    // 修改用户状态请求参数不存在
    ERROR_USER_CHANGE_STATUS_PARAMS_NULL: -30004,
    // 设备配置相关 -40000+
    // 没有匹配到摄像机
    ERROR_CAMERA_CHANGE_CAMERA_TYPE_NOT_CATCH_CAMERA: -40001,
    // 服务器管理相关 -50000+

    //------------------音频服务相关
    //  服务器配置未存在
    ERROR_VIDEO_NULL: -51001,
    // Code 为空
    ERROR_VIDEO_CODE_NULL: -51002,
    // Code 已存在
    ERROR_VIDEO_CODE_REPEAT: -51003,


    //------------------proxy服务配置相关
    //  未存在
    ERROR_PROXY_NULL: -52001,
    // Code 为空
    ERROR_PROXY_CODE_NULL: -52002,
    // Code 已存在
    ERROR_PROXY_CODE_REPEAT: -52003,
    //  ProxyServerType 类型未选择
    ERROR_PROXY_TYPE_NULL: -52004,

    //------------------engine服务配置相关
    //  未存在
    ERROR_ENGINE_NULL: -62001,
    // Code 为空
    ERROR_ENGINE_CODE_NULL: -62002,
    // Code 已存在
    ERROR_ENGINE_CODE_REPEAT: -62003,
    //  engineServerType 类型未选择
    ERROR_ENGINE_TYPE_NULL: -62004,

    //------------------Ivs服务配置相关
    //  未存在
    ERROR_IVS_NULL: -53001,
    // Code 为空
    ERROR_IVS_CODE_NULL: -53002,
    // Code 已存在
    ERROR_IVS_CODE_REPEAT: -53102,
    //  IVSServerType 类型未选择
    ERROR_IVS_TYPE_NULL: -53003,

    // 地图资源相关 -60000+

    ERROR_SYSTEM_POINT_POINT_NULL: -60001, // 地图点位坐标为空
    ERROR_SYSTEM_POINT_NULL: -60002, // 地图点位数据为空

    // 人像库相关 -70000+
    ERROR_BUSINESSLIB_NULL:-70001,//库数据为空
    // Name 为空
    ERROR_BUSINESSLIB_NAME_NULL: -70002,
    // Name 已存在
    ERROR_BUSINESSLIB_NAME_REPEAT: -70003,

    ERROR_BUSINESSLIB_AREAID_OR_PARENTID_NULL: -70004,

    // 角色相关 -80000+
    // 对应角色不存在
    ERROR_NO_ROLE: -80001,
    // 前端传来的角色参数不正确
    ERROR_SAVE_ROLE_NO_PARAMS: -80002,
    // 保存角色表失败
    ERROR_SAVE_ROLE: -80003,
    ERROR_REPEAT_ROLE_NAME:-80004,

    // 时间模板 / 运行计划 -90000+
    // 对应 时间模板不存在
    ERROR_NO_TIME_TEMPLATE: -90001,
    // 前端传来的保存参数不正确
    ERROR_SAVE_TIME_TEMPLATE_NO_PARAMS: -90002,
    // 保存失败
    ERROR_SAVE_TIME_TEMPLATE: -90003,

    ERROR_REPEAT_IOD: -100001, // 重复的IOD CODE
    ERROR_NOT_DELETE_IOD:-100003,//不能删除顶级IOD
    ERROR_NO_IOD:-100004, //IOD不存在


    // 参数不合法
    ERROR_INVALID_PARAMETER: -100005,   
    // 组任务不存在
    ERROR_NO_IVS_TASK_GROUP: -100006,  

     //------------------资源检索相关
    // 没有上传图片 
    ERROR_NO_Image_Upload: -100007,    
    // 存储类型为空  
    ERROR_NO_STORE_TYPE: -100008,        
    // 图片类别为空
    ERROR_NO_Image_Category: -100009,    
    // 检索类型为空
    ERROR_NO_RESOURCE_TYPE: -100010,   
    // 检索关键字为空 
    ERROR_NO_KEY_WORD: -100011,
    // 无命令类型
    ERROR_NO_COMMAND_TYPE: -100012,
    // 无提取类型
    ERROR_NO_DETECT_TYPE: -100013,
    // 无人像标定信息
    ERROR_NO_MARK_INFO: -100014, 
    // 引擎命令错误信息
    ERROR_WRONG_COMMAND: -100015, 
    // 请求pcc服务失败
    ERROR_REQUEST_PCC_FAIL: -100016,
    // 没有检测到人脸
    ERROR_NO_FACE: -100017,
    // 检测到多张人脸
    ERROR_MANY_FACE: -100018,
    // 上传照片至图片服务器失败
    ERROR_SAVE_PICTURE: -100019,
    // 截取图片失败
    ERROR_CUTE_PICTURE: -100020,
    // 时间类型为空
    ERROR_NO_DATE_TYPE: -100021,
    // taskID为空
    ERROR_NO_TASK_ID: -100022,
    // 是否第一次检索标识错误
    ERROR_WRONG_ISFIRSTSEARCH: -100023,

    //立杆重复
    ERROR_LAMP_REPEAT:-100024,
    //立杆不存在
    ERROR_NO_LAMP:-100025,

    //删除任务权限不足
    ERROR_TASK_DEL_NO_AUTH:-100026,
    // 已经关注
    ERROR_COLLECT_HAS_COLLECT: -100027
};
export default ErrorCode;