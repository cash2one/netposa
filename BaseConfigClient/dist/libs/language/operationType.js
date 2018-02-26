define(
    ({
        /******************* SourceType[日志来源] *******************/

        SourceType_System:{value:'SourceType_System', desc:'系统'},
        SourceType_GateModule:{value:'SourceType_GateModule', desc:'交通管理'},
        SourceType_ConfigureModule:{value:'SourceType_ConfigureModule', desc:'系统配置'},
        SourceType_FlatMapModule:{value:'SourceType_FlatMapModule', desc:'平面地图'},
        SourceType_AlarmCenterModule:{value:'SourceType_AlarmCenterModule', desc:'视频布防'},
        SourceType_VideoModule:{value:'SourceType_VideoModule', desc:'视频监控'},
        SourceType_GisModule:{value:'SourceType_GisModule', desc:'视频指挥'},
        SourceType_MaintenanceModule:{value:'SourceType_MaintenanceModule', desc:'运维管理'},
        SourceType_MessageCenter:{value:'SourceType_MessageCenter', desc:'消息中心'},
        SourceType_Unknown:{value:'SourceType_Unknown', desc:'未知'},


        /******************* ProcedureOperationType[流程操作类型] *******************/

        ProcedureOperationType_Report:{value:'ProcedureOperationType_Report', desc:'上报'},
        ProcedureOperationType_Reject:{value:'ProcedureOperationType_Reject', desc:'拒绝'},
        ProcedureOperationType_Auditing:{value:'ProcedureOperationType_Auditing', desc:'审核中'},
        ProcedureOperationType_Confirm:{value:'ProcedureOperationType_Confirm', desc:'审核通过'},
        ProcedureOperationType_Unknown:{value:'ProcedureOperationType_Unknown', desc:'未知'},

        /******************* VideoOperationType[视频操作类型] *******************/

        VideoOperationType_OpenRealTimeVideo:{value:'VideoOperationType_OpenRealTimeVideo', desc:'查看实时视频'},
        VideoOperationType_OpenRecVideo:{value:'VideoOperationType_OpenRecVideo', desc:'打开录像'},
        VideoOperationType_QueryTimeSegment:{value:'VideoOperationType_QueryTimeSegment', desc:'查询录像'},
        VideoOperationType_DownloadRecVideo:{value:'VideoOperationType_DownloadRecVideo', desc:'下载录像'},
        VideoOperationType_DeleteRecVideo:{value:'VideoOperationType_DeleteRecVideo', desc:'删除录像'},
        VideoOperationType_LockPtz:{value:'VideoOperationType_LockPtz', desc:'锁定云台'},
        VideoOperationType_UnLockPtz:{value:'VideoOperationType_UnLockPtz', desc:'解锁云台'},
        VideoOperationType_RobPtz:{value:'VideoOperationType_RobPtz', desc:'抢占云台'},
        VideoOperationType_PtzControl:{value:'VideoOperationType_PtzControl', desc:'云台控制'},
        VideoOperationType_VideoEnhence:{value:'VideoOperationType_VideoEnhence', desc:'视频调节'},
        VideoOperationType_SnapPicture:{value:'VideoOperationType_SnapPicture', desc:'视频抓图'},
        VideoOperationType_HandAlarm:{value:'VideoOperationType_HandAlarm', desc:'手动报警'},
        VideoOperationType_Open:{value:'VideoOperationType_Open', desc:'打开'},
        VideoOperationType_Close:{value:'VideoOperationType_Close', desc:'关闭'},
        VideoOperationType_SetPreset:{value:'VideoOperationType_SetPreset', desc:'设置预置位'},
        VideoOperationType_CallPreset:{value:'VideoOperationType_CallPreset', desc:'调用预置位'},
        VideoOperationType_SetKeepWatch:{value:'VideoOperationType_SetKeepWatch', desc:'设置守望位'},
        VideoOperationType_CancelKeepWatch:{value:'VideoOperationType_CancelKeepWatch', desc:'取消守望位'},
        VideoOperationType_Loop:{value:'VideoOperationType_Loop', desc:'轮巡'},
        VideoOperationType_SyncPlayBack:{value:'VideoOperationType_SyncPlayBack', desc:'同步回放'},
        VideoOperationType_ProtectRecord:{value:'VideoOperationType_ProtectRecord', desc:'录像保护锁定'},
        VideoOperationType_UnProtectRecord:{value:'VideoOperationType_UnProtectRecord', desc:'录像保护解锁'},
        VideoOperationType_Ptz3D:{value:'VideoOperationType_Ptz3D', desc:'3D控制'},
        VideoOperationType_PtzSpeedControl:{value:'VideoOperationType_PtzSpeedControl', desc:'云台控制速度调节'},
        VideoOperationType_CameraAttribute:{value:'VideoOperationType_CameraAttribute', desc:'摄像机属性'},
        VideoOperationType_Unknown:{value:'VideoOperationType_Unknown', desc:'未知'},



        /******************* CommonOperationType[公共操作类型] *******************/

        CommonOperationType_Add:{value:'CommonOperationType_Add', desc:'添加'},
        CommonOperationType_Delete:{value:'CommonOperationType_Delete', desc:'删除'},
        CommonOperationType_Update:{value:'CommonOperationType_Update', desc:'修改'},
        CommonOperationType_Query:{value:'CommonOperationType_Query', desc:'查询'},
        CommonOperationType_Open:{value:'CommonOperationType_Open', desc:'查看'},
        CommonOperationType_Preview:{value:'CommonOperationType_Preview', desc:'预览'},
        CommonOperationType_Count:{value:'CommonOperationType_Count', desc:'统计'},
        CommonOperationType_DealWith:{value:'CommonOperationType_DealWith', desc:'处理'},
        CommonOperationType_Set:{value:'CommonOperationType_Set', desc:'设置'},
        CommonOperationType_Import:{value:'CommonOperationType_Import', desc:'导入'},
        CommonOperationType_Export:{value:'CommonOperationType_Export', desc:'导出'},
        CommonOperationType_Start:{value:'CommonOperationType_Start', desc:'启动'},
        CommonOperationType_Stop:{value:'CommonOperationType_Stop', desc:'停止'},
        CommonOperationType_Pause:{value:'CommonOperationType_Pause', desc:'暂停'},
        CommonOperationType_Continue:{value:'CommonOperationType_Continue', desc:'继续'},
        CommonOperationType_Sync:{value:'CommonOperationType_Sync', desc:'同步'},
        CommonOperationType_Unknown:{value:'CommonOperationType_Unknown', desc:'未知'},

        /******************* FileOperationType[文件(档)操作类型] *******************/

        FileOperationType_Upload:{value:'FileOperationType_Upload', desc:'上传'},
        FileOperationType_Download:{value:'FileOperationType_Download', desc:'下载'},
        FileOperationType_Print:{value:'FileOperationType_Print', desc:'打印'},
        FileOperationType_Unknown:{value:'FileOperationType_Unknown', desc:'未知'},

        /******************* TaskOperationType[任务操作类型] *******************/

        TaskOperationType_Start:{value:'TaskOperationType_Start', desc:'启动'},
        TaskOperationType_Pause:{value:'TaskOperationType_Pause', desc:'暂停'},
        TaskOperationType_Continue:{value:'TaskOperationType_Continue', desc:'继续'},
        TaskOperationType_Stop:{value:'TaskOperationType_Stop', desc:'停止'},
        TaskOperationType_Unknown:{value:'TaskOperationType_Unknown', desc:'未知'},

        /******************* SystemOperationType[系统操作类型] *******************/

        SystemOperationType_UserLogin:{value:'SystemOperationType_UserLogin', desc:'用户登录'},
        SystemOperationType_UserLogout:{value:'SystemOperationType_UserLogout', desc:'用户注销'},
        SystemOperationType_CheckOnline:{value:'SystemOperationType_CheckOnline', desc:'在线检测'},
        SystemOperationType_SyncData:{value:'SystemOperationType_SyncData', desc:'数据同步'},
        SystemOperationType_SyncTime:{value:'SystemOperationType_SyncTime', desc:'时钟同步'},
        SystemOperationType_Unknown:{value:'SystemOperationType_Unknown', desc:'未知',},

    })
);
