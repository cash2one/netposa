/**
 * 
 * @Description: 高级检索-车辆查询条件
 *
 */
export class SearchVehicleModel {
	/**
	 * 车牌号码
	 */
    plateNumber: string;
    /**
     * 车辆图片url
     */
    imagePath?: string;
    /**
     * redisId
     */
    redisId?: string;
	/**
	 * 开始时间
	 */
    startTime: string;
	/**
	 * 结束时间
	 */
    endTime: string;
	/**
	 * 车身阈值
	 */
    vehicleBodyThreshold?: number;
	/**
	 * 特征阈值
	 */
    characterThreshold?: number;
	/**
	 * 车辆类型
	 */
    vehicleTypesStr?: string;
	/**
	 * 车辆品牌
	 */
    vehicleBrand?: string;
	/**
	 * 车辆子品牌(可选择多个)
	 */
    vehicleSubBrand?: string;
	/**
	 * 车辆颜色
	 */
    vehicleColor?: string;
	/**
	 * 车牌颜色
	 */
    plateColor?: string;
	/**
	 * 卡口车道ID(可选择多个)
	 */
    channelIdsStr?: string;
	/**
	 * 当前页码
	 */
    currentPage: number;
	/**
	 * 每页显示个数
	 */
    pageSize: number;
	/**
	 * 区域ID
	 */
    areaId?: Array<string>;
	/**
	 * 设备ID
	 */
    arrObjectID?: Array<string>;
    /**
     * 拖拽搜索
     */
    featureSearchExt?: any;
    /**
     * 上传搜索
     */
    fetureTaskParam?: any;
}
