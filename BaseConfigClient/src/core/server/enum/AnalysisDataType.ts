
/**
 * 分析用缓存数据
 */
export interface AnalysisStorageParams {
    key: string;
    name: string;
    data?: any;
}

/**
 * 分析用枚举
 */
export const AnalysisDataType = {
	Car: {
        key: "CarAnalysisStorage",
        name: "车辆"
    },
	Face: {
        key: "FaceAnalysisStorage",
        name: "人脸"
    },
	WiFi: {
        key: "WiFiAnalysisStorage",
        name: "WiFi"
    },
	Rfid: {
        key: "RfidAnalysisStorage",
        name: "Rfid"
    },
	EFENCE: {
        key: "EFENCEAnalysisStorage",
        name: "电围"
    },
    FaceLibrary: {
        key: "FaceLibraryStorage",
        name: "人像库"
    }
};

/**
 * 分析路径路由
 */
export const AnalysisGoToType = {
    Track: {
        key: "Track",
        name: "人脸轨迹",
        data: "/html/#/IntelligentAnalysis/FaceTrack"
    },
    Accompanying: {
        key: "Accompanying",
        name: "伴随分析",
        data: "/html/#/IntelligentAnalysis/AccompanyingAnalysis"
    },
    Frequency: {
        key: "Frequency",
        name: "频次分析",
        data: "/html/#/IntelligentAnalysis/FrequencyAnalysis"
    },
    More: {
        key: "More",
        name: "更多",
        data: "/html/#/IntelligentAnalysis"
    }
};