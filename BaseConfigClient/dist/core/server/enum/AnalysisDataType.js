define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AnalysisDataType = {
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
    exports.AnalysisGoToType = {
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
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL3NlcnZlci9lbnVtL0FuYWx5c2lzRGF0YVR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBYWEsUUFBQSxnQkFBZ0IsR0FBRztRQUMvQixHQUFHLEVBQUU7WUFDRSxHQUFHLEVBQUUsb0JBQW9CO1lBQ3pCLElBQUksRUFBRSxJQUFJO1NBQ2I7UUFDSixJQUFJLEVBQUU7WUFDQyxHQUFHLEVBQUUscUJBQXFCO1lBQzFCLElBQUksRUFBRSxJQUFJO1NBQ2I7UUFDSixJQUFJLEVBQUU7WUFDQyxHQUFHLEVBQUUscUJBQXFCO1lBQzFCLElBQUksRUFBRSxNQUFNO1NBQ2Y7UUFDSixJQUFJLEVBQUU7WUFDQyxHQUFHLEVBQUUscUJBQXFCO1lBQzFCLElBQUksRUFBRSxNQUFNO1NBQ2Y7UUFDSixNQUFNLEVBQUU7WUFDRCxHQUFHLEVBQUUsdUJBQXVCO1lBQzVCLElBQUksRUFBRSxJQUFJO1NBQ2I7UUFDRCxXQUFXLEVBQUU7WUFDVCxHQUFHLEVBQUUsb0JBQW9CO1lBQ3pCLElBQUksRUFBRSxLQUFLO1NBQ2Q7S0FDSixDQUFDO0lBS1csUUFBQSxnQkFBZ0IsR0FBRztRQUM1QixLQUFLLEVBQUU7WUFDSCxHQUFHLEVBQUUsT0FBTztZQUNaLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLHVDQUF1QztTQUNoRDtRQUNELFlBQVksRUFBRTtZQUNWLEdBQUcsRUFBRSxjQUFjO1lBQ25CLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLGtEQUFrRDtTQUMzRDtRQUNELFNBQVMsRUFBRTtZQUNQLEdBQUcsRUFBRSxXQUFXO1lBQ2hCLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLCtDQUErQztTQUN4RDtRQUNELElBQUksRUFBRTtZQUNGLEdBQUcsRUFBRSxNQUFNO1lBQ1gsSUFBSSxFQUFFLElBQUk7WUFDVixJQUFJLEVBQUUsNkJBQTZCO1NBQ3RDO0tBQ0osQ0FBQyIsImZpbGUiOiJjb3JlL3NlcnZlci9lbnVtL0FuYWx5c2lzRGF0YVR5cGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLyoqXHJcbiAqIOWIhuaekOeUqOe8k+WtmOaVsOaNrlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBBbmFseXNpc1N0b3JhZ2VQYXJhbXMge1xyXG4gICAga2V5OiBzdHJpbmc7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBkYXRhPzogYW55O1xyXG59XHJcblxyXG4vKipcclxuICog5YiG5p6Q55So5p6a5Li+XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgQW5hbHlzaXNEYXRhVHlwZSA9IHtcclxuXHRDYXI6IHtcclxuICAgICAgICBrZXk6IFwiQ2FyQW5hbHlzaXNTdG9yYWdlXCIsXHJcbiAgICAgICAgbmFtZTogXCLovabovoZcIlxyXG4gICAgfSxcclxuXHRGYWNlOiB7XHJcbiAgICAgICAga2V5OiBcIkZhY2VBbmFseXNpc1N0b3JhZ2VcIixcclxuICAgICAgICBuYW1lOiBcIuS6uuiEuFwiXHJcbiAgICB9LFxyXG5cdFdpRmk6IHtcclxuICAgICAgICBrZXk6IFwiV2lGaUFuYWx5c2lzU3RvcmFnZVwiLFxyXG4gICAgICAgIG5hbWU6IFwiV2lGaVwiXHJcbiAgICB9LFxyXG5cdFJmaWQ6IHtcclxuICAgICAgICBrZXk6IFwiUmZpZEFuYWx5c2lzU3RvcmFnZVwiLFxyXG4gICAgICAgIG5hbWU6IFwiUmZpZFwiXHJcbiAgICB9LFxyXG5cdEVGRU5DRToge1xyXG4gICAgICAgIGtleTogXCJFRkVOQ0VBbmFseXNpc1N0b3JhZ2VcIixcclxuICAgICAgICBuYW1lOiBcIueUteWbtFwiXHJcbiAgICB9LFxyXG4gICAgRmFjZUxpYnJhcnk6IHtcclxuICAgICAgICBrZXk6IFwiRmFjZUxpYnJhcnlTdG9yYWdlXCIsXHJcbiAgICAgICAgbmFtZTogXCLkurrlg4/lupNcIlxyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIOWIhuaekOi3r+W+hOi3r+eUsVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IEFuYWx5c2lzR29Ub1R5cGUgPSB7XHJcbiAgICBUcmFjazoge1xyXG4gICAgICAgIGtleTogXCJUcmFja1wiLFxyXG4gICAgICAgIG5hbWU6IFwi5Lq66IS46L2o6L+5XCIsXHJcbiAgICAgICAgZGF0YTogXCIvaHRtbC8jL0ludGVsbGlnZW50QW5hbHlzaXMvRmFjZVRyYWNrXCJcclxuICAgIH0sXHJcbiAgICBBY2NvbXBhbnlpbmc6IHtcclxuICAgICAgICBrZXk6IFwiQWNjb21wYW55aW5nXCIsXHJcbiAgICAgICAgbmFtZTogXCLkvLTpmo/liIbmnpBcIixcclxuICAgICAgICBkYXRhOiBcIi9odG1sLyMvSW50ZWxsaWdlbnRBbmFseXNpcy9BY2NvbXBhbnlpbmdBbmFseXNpc1wiXHJcbiAgICB9LFxyXG4gICAgRnJlcXVlbmN5OiB7XHJcbiAgICAgICAga2V5OiBcIkZyZXF1ZW5jeVwiLFxyXG4gICAgICAgIG5hbWU6IFwi6aKR5qyh5YiG5p6QXCIsXHJcbiAgICAgICAgZGF0YTogXCIvaHRtbC8jL0ludGVsbGlnZW50QW5hbHlzaXMvRnJlcXVlbmN5QW5hbHlzaXNcIlxyXG4gICAgfSxcclxuICAgIE1vcmU6IHtcclxuICAgICAgICBrZXk6IFwiTW9yZVwiLFxyXG4gICAgICAgIG5hbWU6IFwi5pu05aSaXCIsXHJcbiAgICAgICAgZGF0YTogXCIvaHRtbC8jL0ludGVsbGlnZW50QW5hbHlzaXNcIlxyXG4gICAgfVxyXG59OyJdfQ==
