interface Enum {
	code: string,
	name: string
}
class IOperThirdModule {
	ResourceRetrieval_AdvanceSearch_Vehicle: Enum;
	ResourceRetrieval_AdvanceSearch_Face: Enum;
	ResourceRetrieval_AdvanceSearch_WiFi: Enum;
	ResourceRetrieval_AdvanceSearch_EFence: Enum;
	IntelligentAnalysis_Vehicle_Track: Enum;
	IntelligentAnalysis_Vehicle_FindByTrack: Enum;
	IntelligentAnalysis_Vehicle_HideDig: Enum;
	IntelligentAnalysis_Vehicle_AppearNightOnly: Enum;
	IntelligentAnalysis_Vehicle_FollowAnalysis: Enum;
	IntelligentAnalysis_Vehicle_FirstTimeIntoCity: Enum;
	IntelligentAnalysis_Vehicle_CrashAnalysis: Enum;
	IntelligentAnalysis_Vehicle_FrequencyAnalysis: Enum;
	IntelligentAnalysis_Vehicle_StayAnalysis: Enum;
	IntelligentAnalysis_Vehicle_FrequentCrose: Enum;
	IntelligentAnalysis_Vehicle_FrequentBreakRule: Enum;
	IntelligentAnalysis_Vehicle_FakePlate: Enum;
	IntelligentAnalysis_Vehicle_UnTieSafeBelt: Enum;
	IntelligentAnalysis_Vehicle_CallWhileDriving: Enum;
	IntelligentAnalysis_Vehicle_CheckSunShield: Enum;
	IntelligentAnalysis_Vehicle_NonNumAnalysis: Enum;
	IntelligentAnalysis_Face_Track: Enum;
	IntelligentAnalysis_Face_Analysis: Enum;
	IntelligentAnalysis_Face_AccompanyAnalysis: Enum;
	IntelligentAnalysis_Face_AlarmAnalysis: Enum;
	IntelligentAnalysis_Face_FrequencyAnalysis: Enum;
	IntelligentAnalysis_Face_FrequencyAppear: Enum;
	IntelligentAnalysis_Face_CrashAnalysis: Enum;
	IntelligentAnalysis_Mac_Crash: Enum;
    IntelligentAnalysis_More_FaceMacCrash: Enum;
	IntelligentAnalysis_Mac_Track: Enum;
	IntelligentAnalysis_Mac_Accompany: Enum;
	IntelligentAnalysis_Mac_Frequency: Enum;
	IntelligentAnalysis_More_VehicleMacCrash: Enum;
	IntelligentAnalysis_Mac_Alarm: Enum;
	Maintain_StatisOverview_General: Enum;
	Maintain_StatisOverview_Task: Enum;
	Maintain_StatisOverview_Alarm: Enum;
	Maintain_StatisOverview_Flow: Enum;
	Maintain_StatisOverview_Retrival: Enum;
	Maintain_StatisOverview_Analysis: Enum;
	BaseConfig_Base_Area: Enum;
	BaseConfig_Base_Unit: Enum;
	BaseConfig_Base_Person: Enum;
	BaseConfig_Base_Role: Enum;
	BaseConfig_Server_ProxyServer: Enum;
	BaseConfig_Server_VideoServer: Enum;
	BaseConfig_Server_IodServer: Enum;
	BaseConfig_Server_VideoStructServer: Enum;
	BaseConfig_Device_Camera: Enum;
	BaseConfig_Device_RmpGate: Enum;
	BaseConfig_Device_WiFi: Enum;
	BaseConfig_Device_EFence: Enum;
	BaseConfig_Device_Lamp: Enum;
	BaseConfig_Resource_FaceLib: Enum;
	BaseConfig_Resource_MapResource: Enum;
	BaseConfig_Business_TimeTemplate: Enum;
	BaseConfig_Business_EventCase: Enum;
	BaseConfig_Business_MonitorTask: Enum;
	BaseConfig_Business_VideoStructTask: Enum;
	BaseConfig_Sys_Param: Enum;
	BaseConfig_Server_EngineServer:Enum;
	BaseConfig_Server_EngineNode:Enum;
	BaseConfig_Server_EventRule:Enum;
}
export const OperThirdModule: { [key: string]: Enum } & IOperThirdModule = {
	ResourceRetrieval_AdvanceSearch_Vehicle: {
		code: "ResourceRetrieval_AdvanceSearch_Vehicle",
		name: "车辆"
	},
	ResourceRetrieval_AdvanceSearch_Face: {
		code: "ResourceRetrieval_AdvanceSearch_Face",
		name: "人像"
	},
	ResourceRetrieval_AdvanceSearch_WiFi: {
		code: "ResourceRetrieval_AdvanceSearch_WiFi",
		name: "WiFi"
	},
	ResourceRetrieval_AdvanceSearch_EFence: {
		code: "ResourceRetrieval_AdvanceSearch_EFence",
		name: "电子围栏"
	},
	IntelligentAnalysis_Vehicle_Track: {
		code: "IntelligentAnalysis_Vehicle_Track",
		name: "行车轨迹"
	},
	IntelligentAnalysis_Vehicle_FindByTrack: {
		code: "IntelligentAnalysis_Vehicle_FindByTrack",
		name: "轨迹查车"
	},
	BaseConfig_Server_EngineServer : {
        code : "BaseConfig_Server_EngineServer",
        name : "引擎服务"
    },
	BaseConfig_Server_EngineNode : {
        code : "BaseConfig_Server_EngineServer",
        name : "引擎节点"
    },
	BaseConfig_Server_EventRule : {
        code : "BaseConfig_Server_EventRule",
        name : "联动预案节点"
    },
	IntelligentAnalysis_Vehicle_HideDig: {
		code: "IntelligentAnalysis_Vehicle_HideDig",
		name: "隐匿挖掘"
	},
	IntelligentAnalysis_Vehicle_AppearNightOnly: {
		code: "IntelligentAnalysis_Vehicle_AppearNightOnly",
		name: "昼伏夜出"
	},
	IntelligentAnalysis_Vehicle_FollowAnalysis: {
		code: "IntelligentAnalysis_Vehicle_FollowAnalysis",
		name: "跟车分析"
	},
	IntelligentAnalysis_Vehicle_FirstTimeIntoCity: {
		code: "IntelligentAnalysis_Vehicle_FirstTimeIntoCity",
		name: "首次入城"
	},
	IntelligentAnalysis_Vehicle_CrashAnalysis: {
		code: "IntelligentAnalysis_Vehicle_CrashAnalysis",
		name: "碰撞分析"
	},
	IntelligentAnalysis_Vehicle_FrequencyAnalysis: {
		code: "IntelligentAnalysis_Vehicle_FrequencyAnalysis",
		name: "频次分析"
	},
	IntelligentAnalysis_Vehicle_StayAnalysis: {
		code: "IntelligentAnalysis_Vehicle_StayAnalysis",
		name: "落脚分析"
	},
	IntelligentAnalysis_Vehicle_FrequentCrose: {
		code: "IntelligentAnalysis_Vehicle_FrequentCrose",
		name: "频繁过车"
	},
	IntelligentAnalysis_Vehicle_FrequentBreakRule: {
		code: "IntelligentAnalysis_Vehicle_FrequentBreakRule",
		name: "频繁违章"
	},
	IntelligentAnalysis_Vehicle_FakePlate: {
		code: "IntelligentAnalysis_Vehicle_FakePlate",
		name: "套牌分析"
	},
	IntelligentAnalysis_Vehicle_UnTieSafeBelt: {
		code: "IntelligentAnalysis_Vehicle_UnTieSafeBelt",
		name: "未系安全带"
	},
	IntelligentAnalysis_Vehicle_CallWhileDriving: {
		code: "IntelligentAnalysis_Vehicle_CallWhileDriving",
		name: "开车打电话"
	},
	IntelligentAnalysis_Vehicle_CheckSunShield: {
		code: "IntelligentAnalysis_Vehicle_CheckSunShield",
		name: "遮阳板检测"
	},
	IntelligentAnalysis_Vehicle_NonNumAnalysis: {
		code: "IntelligentAnalysis_Vehicle_NonNumAnalysis",
		name: "无牌分析"
	},
	IntelligentAnalysis_Face_Track: {
		code: "IntelligentAnalysis_Face_Track",
		name: "人脸轨迹"
	},
	IntelligentAnalysis_Face_Analysis: {
		code: "IntelligentAnalysis_Face_Analysis",
		name: "人脸分析"
	},
	IntelligentAnalysis_Face_AccompanyAnalysis: {
		code: "IntelligentAnalysis_Face_AccompanyAnalysis",
		name: "伴随分析"
	},
	IntelligentAnalysis_Face_AlarmAnalysis: {
		code: "IntelligentAnalysis_Face_AlarmAnalysis",
		name: "报警分析"
	},
	IntelligentAnalysis_Face_FrequencyAnalysis: {
		code: "IntelligentAnalysis_Face_FrequencyAnalysis",
		name: "频次分析"
	},
	IntelligentAnalysis_Face_FrequencyAppear: {
		code: "IntelligentAnalysis_Face_FrequencyAppear",
		name: "频繁出没"
	},
	IntelligentAnalysis_Face_CrashAnalysis: {
		code: "IntelligentAnalysis_Face_CrashAnalysis",
		name: "碰撞分析"
	},
	IntelligentAnalysis_Mac_Crash: {
		code: "IntelligentAnalysis_Mac_Crash",
		name: "MAC碰撞"
	},
	IntelligentAnalysis_More_FaceMacCrash: {
		code: "IntelligentAnalysis_More_FaceMacCrash",
		name: "人脸MAC碰撞"
	},
	IntelligentAnalysis_Mac_Track: {
		code: "IntelligentAnalysis_Mac_Track",
		name: "Mac轨迹"
	},
	IntelligentAnalysis_Mac_Accompany: {
		code: "IntelligentAnalysis_Mac_Accompany",
		name: "Mac伴随"
	},
	IntelligentAnalysis_Mac_Frequency: {
		code: "IntelligentAnalysis_Mac_Frequency",
		name: "MAC频次"
	},
	IntelligentAnalysis_More_VehicleMacCrash: {
		code: "IntelligentAnalysis_More_VehicleMacCrash",
		name: "车辆MAC碰撞"
	},
	IntelligentAnalysis_Mac_Alarm: {
		code: "IntelligentAnalysis_Mac_Alarm",
		name: "MAC报警"
	},
	Maintain_StatisOverview_General: {
		code: "Maintain_StatisOverview_General",
		name: "统计分析"
	},
	Maintain_StatisOverview_Task: {
		code: "Maintain_StatisOverview_Task",
		name: "任务统计"
	},
	Maintain_StatisOverview_Alarm: {
		code: "Maintain_StatisOverview_Alarm",
		name: "报警统计"
	},
	Maintain_StatisOverview_Flow: {
		code: "Maintain_StatisOverview_Flow",
		name: "流量统计"
	},
	Maintain_StatisOverview_Retrival: {
		code: "Maintain_StatisOverview_Retrival",
		name: "检索统计"
	},
	Maintain_StatisOverview_Analysis: {
		code: "Maintain_StatisOverview_Analysis",
		name: "分析统计"
	},
	BaseConfig_Base_Area: {
		code: "BaseConfig_Base_Area",
		name: "行政区域"
	},
	BaseConfig_Base_Unit: {
		code: "BaseConfig_Base_Unit",
		name: "行政单位"
	},
	BaseConfig_Base_Person: {
		code: "BaseConfig_Base_Person",
		name: "用户管理"
	},
	BaseConfig_Base_Role: {
		code: "BaseConfig_Base_Role",
		name: "角色管理"
	},
	BaseConfig_Server_ProxyServer: {
		code: "BaseConfig_Server_ProxyServer",
		name: "代理服务器"
	},
	BaseConfig_Server_VideoServer: {
		code: "BaseConfig_Server_VideoServer",
		name: "视频服务器"
	},
	BaseConfig_Server_IodServer: {
		code: "BaseConfig_Server_IodServer",
		name: "数据服务器"
	},
	BaseConfig_Server_VideoStructServer: {
		code: "BaseConfig_Server_VideoStructServer",
		name: "视频结构化服务器"
	},
	BaseConfig_Device_Camera: {
		code: "BaseConfig_Device_Camera",
		name: "摄像机"
	},
	BaseConfig_Device_RmpGate: {
		code: "BaseConfig_Device_RmpGate",
		name: "卡口"
	},
	BaseConfig_Device_WiFi: {
		code: "BaseConfig_Device_WiFi",
		name: "wifi"
	},
	BaseConfig_Device_EFence: {
		code: "BaseConfig_Device_EFence",
		name: "电子围栏"
	},
	BaseConfig_Device_Lamp: {
		code: "BaseConfig_Device_Lamp",
		name: "立杆"
	},
	BaseConfig_Resource_FaceLib: {
		code: "BaseConfig_Resource_FaceLib",
		name: "人像库配置"
	},
	BaseConfig_Resource_MapResource: {
		code: "BaseConfig_Resource_MapResource",
		name: "地图资源"
	},
	BaseConfig_Business_TimeTemplate: {
		code: "BaseConfig_Business_TimeTemplate",
		name: "时间模板"
	},
	BaseConfig_Business_EventCase: {
		code: "BaseConfig_Business_EventCase",
		name: "联动策略"
	},
	BaseConfig_Business_MonitorTask: {
		code: "BaseConfig_Business_MonitorTask",
		name: "布控任务"
	},
	BaseConfig_Business_VideoStructTask: {
		code: "BaseConfig_Business_VideoStructTask",
		name: "业视频结构化任务"
	},
	BaseConfig_Sys_Param: {
		code: "BaseConfig_Sys_Param",
		name: "系统配置-系统参数"
	}
}