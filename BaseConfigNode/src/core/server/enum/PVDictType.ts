//PVD字典类型枚举
export const PVDictType:{[key:string]:any} = {
	AlarmType: {
		value: "AlarmType",
		text: "报警类型"
	},
	PlateColor: {
		value: "PlateColor",
		text: "车牌颜色"
	},
	PeccancyType: {
		value: "PeccancyType",
		text: "违章类型"
	},
	VehicleType: {
		value: "VehicleType",
		text: "车辆类型"
	},
	VehicleSubBrand: {
		value: "VehicleSubBrand",
		text: "车辆子品牌"
	},
	AlarmStatus: {
		value: "AlarmStatus",
		text: "布控状态"
	},
	VehicleColor: {
		value: "VehicleColor",
		text: "车辆颜色"
	},
	VehicleNK: {
		value: "VehicleNK",
		text: "车辆年份"
	},
	AlarmLevel: {
		value: "AlarmLevel",
		text: "布控级别"
	},
	PlateType: {
		value: "PlateType",
		text: "车牌类型"
	},
	VehicleBelong: {
		value: "VehicleBelong",
		text: "车牌归属地"
	},
	ChannelDirection: {
		value: "ChannelDirection",
		text: "匝道方向"
	},
	VehicleBrand: {
		value: "VehicleBrand",
		text: "车辆品牌"
	},
	AlarmConfirmStatus: {
		value: "AlarmConfirmStatus",
		text: "布控处理状态"
	},
	MessageType: {
		value: "MessageType",
		text: "消息类型"
	}
};
let _PVDictType = (function(){
	let result:Array<{value: string, text: string}> = [] ;
	for(let k in PVDictType){
		result.push(PVDictType[k]);
	}
	return result;
})();

export const PVDictTypeArr = _PVDictType as Array<{value: string, text: string}>;