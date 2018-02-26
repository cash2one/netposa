interface Enum{
	code : string,
	name : string
}
interface IOperSecondModule{
	ResourceRetrieval_FullSearch : Enum;
	ResourceRetrieval_AdvanceSearch : Enum;
	IntelligentAnalysis_Vehicle : Enum;
	IntelligentAnalysis_Face : Enum;
	IntelligentAnalysis_Mac :Enum;
	Maintain_StatisicOverview : Enum;
	Maintain_DeviceState : Enum;
	Maintain_UserState : Enum;
	Maintain_LogManager :Enum;
	BaseConfig_Base : Enum;
	BaseConfig_Server :Enum
	BaseConfig_Device : Enum
	BaseConfig_Resource :Enum
	BaseConfig_Business :Enum
	BaseConfig_Sys :Enum
    IntelligentAnalysis_More:Enum;
}
export const OperSecondModule:{[key:string]:Enum} & IOperSecondModule  = {
	ResourceRetrieval_FullSearch : {
		code : "ResourceRetrieval_FullSearch",
		name : "全文检索"
	},
	ResourceRetrieval_AdvanceSearch : {
		code : "ResourceRetrieval_AdvanceSearch",
		name : "高级检索"
	},
	IntelligentAnalysis_Vehicle : {
		code : "IntelligentAnalysis_Vehicle",
		name : "车辆分析"
	},
	IntelligentAnalysis_Face : {
		code : "IntelligentAnalysis_Face",
		name : "人像分析"
	},
	IntelligentAnalysis_Mac : {
		code : "IntelligentAnalysis_Mac",
		name : "MAC分析"
	},
    IntelligentAnalysis_More : {
        code : "IntelligentAnalysis_More",
        name : "多元碰撞"
    },
	Maintain_StatisicOverview : {
		code : "Maintain_StatisicOverview",
		name : "统计总览"
	},
	Maintain_DeviceState : {
		code : "Maintain_DeviceState",
		name : "设备状态"
	},
	Maintain_UserState : {
		code : "Maintain_UserState",
		name : "用户状态"
	},
	Maintain_LogManager : {
		code : "Maintain_LogManager",
		name : "日志管理"
	},
	BaseConfig_Base : {
		code : "BaseConfig_Base",
		name : "基础配置"
	},
	BaseConfig_Server : {
		code : "BaseConfig_Server",
		name : "服务配置"
	},
	BaseConfig_Device : {
		code : "BaseConfig_Device",
		name : "设备配置"
	},
	BaseConfig_Resource : {
		code : "BaseConfig_Resource",
		name : "数据资源"
	},
	BaseConfig_Business : {
		code : "BaseConfig_Business",
		name : "业务配置"
	},
	BaseConfig_Sys : {
		code : "BaseConfig_Sys",
		name : "系统配置"
	}
}