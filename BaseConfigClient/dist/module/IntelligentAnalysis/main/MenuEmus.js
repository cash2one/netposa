define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MenuEmus = (function () {
        function MenuEmus() {
        }
        return MenuEmus;
    }());
    exports.MenuEmus = MenuEmus;
    var CarInterFace = (function () {
        function CarInterFace() {
        }
        return CarInterFace;
    }());
    exports.CarInterFace = CarInterFace;
    var FaceInterFace = (function () {
        function FaceInterFace() {
        }
        return FaceInterFace;
    }());
    exports.FaceInterFace = FaceInterFace;
    var MacInterFace = (function () {
        function MacInterFace() {
        }
        return MacInterFace;
    }());
    exports.MacInterFace = MacInterFace;
    var MultiInterFace = (function () {
        function MultiInterFace() {
        }
        return MultiInterFace;
    }());
    exports.MultiInterFace = MultiInterFace;
    exports.MacMenu = {
        MacCollision: {
            value: 'MacCollision',
            text: 'Mac碰撞',
            path: 'IntelligentAnalysis.MacCrash',
            icon: 'mac-crash'
        },
        MacTrack: {
            value: 'MacTrack',
            text: 'Mac轨迹',
            path: 'IntelligentAnalysis.MacTrack',
            icon: 'mac-track'
        },
        MacAccompany: {
            value: 'MacAccompany',
            text: 'MAC伴随',
            path: 'IntelligentAnalysis.MacAccompany',
            icon: 'mac-accompany'
        },
        MacFrequency: {
            value: 'MacFrequency',
            text: 'MAC频次',
            path: 'IntelligentAnalysis.MacFrequency',
            icon: 'mac-frequency'
        },
        MacAlarm: {
            value: 'MacAlarm',
            text: 'MAC报警',
            path: 'IntelligentAnalysis.MacAlarm',
            icon: 'mac-alarm'
        }
    };
    exports.FaceMenu = {
        FaceTrack: {
            value: 'FaceTrack',
            text: '人脸轨迹',
            path: 'IntelligentAnalysis.FaceTrack',
            icon: 'face-track'
        },
        FrequencyAnalysis: {
            value: 'FrequencyAnalysis',
            text: '频次分析',
            path: 'IntelligentAnalysis.FrequencyAnalysis',
            icon: 'frequency-analysis'
        },
        AccompanyingAnalysis: {
            value: 'AccompanyingAnalysis',
            text: '伴随分析',
            path: 'IntelligentAnalysis.AccompanyingAnalysis',
            icon: 'accompanying-analysis'
        },
        FaceAnalysis: {
            value: 'FaceAnalysis',
            text: '人脸分析',
            path: 'IntelligentAnalysis.FaceAnalysis',
            icon: 'face-analysis'
        },
        PersonAlarm: {
            value: 'PersonAlarm',
            text: '报警分析',
            path: 'IntelligentAnalysis.AlarmAnalysis',
            icon: 'alarm-analysis'
        }, FrequencyAppear: {
            value: 'FrequencyAppear',
            text: '频繁出没',
            path: 'IntelligentAnalysis.FrequencyAppear',
            icon: 'frequency-appear'
        }, FaceCollisionAnalysis: {
            value: 'FaceCollisionAnalysis',
            text: '碰撞分析',
            path: 'IntelligentAnalysis.FaceCollisionAnalysis',
            icon: 'face-collision-analysis'
        },
    };
    function setUrlForCar(modelName) {
        return "http://172.16.90.206:8886/html/?isPvp=1&nomenu=1&module=" + modelName + "&userName=admin&password=e59cf56e33f978124da804b7e12c0d53#c";
    }
    exports.CarMenu = {
        CarDriveTrack: {
            value: 'CarDriveTrack',
            type: 'Car',
            text: '行车轨迹',
            path: setUrlForCar('track'),
            icon: 'car-track'
        },
        TrackFindCar: {
            value: 'TrackFindCar',
            text: '轨迹查车',
            type: 'Car',
            path: setUrlForCar('checkCar'),
            icon: 'car-check-car'
        },
        HiddenDigging: {
            value: 'HiddenDigging',
            text: '隐匿挖掘',
            type: 'Car',
            path: setUrlForCar('hidden'),
            icon: 'car-hidden'
        },
        DayAndNightOut: {
            value: 'DayAndNightOut',
            text: '昼伏夜出',
            type: 'Car',
            path: setUrlForCar('nocturnal'),
            icon: 'car-nocturnal'
        },
        FollowCarAnalysis: {
            value: 'FollowCarAnalysis',
            text: '跟车分析',
            type: 'Car',
            path: setUrlForCar('carfollow'),
            icon: 'car-carfollow'
        },
        FirstIntoCity: {
            value: 'FirstIntoCity',
            text: '首次入城',
            type: 'Car',
            path: setUrlForCar('ftic'),
            icon: 'car-ftic'
        },
        CollisionAnalysis: {
            value: 'CollisionAnalysis',
            text: '碰撞分析',
            type: 'Car',
            path: setUrlForCar('collide'),
            icon: 'car-collide'
        },
        FrequencyAnalysis: {
            value: 'FrequencyAnalysis',
            text: '频次分析',
            type: 'Car',
            path: setUrlForCar('frequency'),
            icon: 'car-frequency'
        },
        SettledAnalysis: {
            value: 'SettledAnalysis',
            text: '落脚分析',
            type: 'Car',
            path: setUrlForCar('foothold'),
            icon: 'car-foothold'
        },
        FrequentCar: {
            value: 'FrequentCar',
            text: '频繁过车',
            type: 'Car',
            path: setUrlForCar('continual'),
            icon: 'car-continual'
        },
        FrequentViolation: {
            value: 'FrequentViolation',
            text: '频繁违章',
            type: 'Car',
            path: setUrlForCar('frequentviolations'),
            icon: 'car-frequentviolations'
        },
        DeckAnalysis: {
            value: 'DeckAnalysis',
            text: '套牌分析',
            type: 'Car',
            path: setUrlForCar('fakelicensed'),
            icon: 'car-fakelicensed'
        },
        SeatBeltAnalysis: {
            value: 'SeatBeltAnalysis',
            text: '安全带分析',
            type: 'Car',
            path: setUrlForCar('searchbynoseatbelt'),
            icon: 'car-searchbynoseatbelt'
        },
        DriveCall: {
            value: 'DriveCall',
            text: '开车打电话',
            type: 'Car',
            path: setUrlForCar('searchbyphoneondriving'),
            icon: 'car-searchbyphoneondriving'
        },
        SunVisorDetection: {
            value: 'SunVisorDetection',
            text: '遮阳板检测',
            type: 'Car',
            path: setUrlForCar('searchbynightvisor'),
            icon: 'car-searchbynightvisor'
        },
        UnlicensedAnalysis: {
            value: 'UnlicensedAnalysis',
            text: '无牌分析',
            type: 'Car',
            path: setUrlForCar('searchbynoplate'),
            icon: 'car-searchbynoplate'
        }
    };
    exports.MultiMenu = {
        FaceMacCrash: {
            value: 'FaceMacCrash',
            text: '人脸MAC碰撞',
            path: 'IntelligentAnalysis.FaceMacCrash',
            icon: 'face-mac-crash'
        },
        MacCarCrash: {
            value: 'MacCarCrash',
            text: '车辆MAC碰撞',
            path: 'IntelligentAnalysis.MacCarCrash',
            icon: 'mac-car-crash'
        }
    };
    function initCarMenu() {
        var arr = [];
        var Menus = exports.CarMenu;
        Object.keys(Menus).forEach(function (key) {
            arr.push({
                value: Menus[key].value,
                text: Menus[key].text,
                path: Menus[key].path,
                icon: Menus[key].icon,
                type: Menus[key].type
            });
        });
        return arr;
    }
    exports.initCarMenu = initCarMenu;
    function initFaceMenu() {
        var arr = [];
        var Menus = exports.FaceMenu;
        Object.keys(Menus).forEach(function (key) {
            arr.push({
                value: Menus[key].value,
                text: Menus[key].text,
                path: Menus[key].path,
                icon: Menus[key].icon
            });
        });
        return arr;
    }
    exports.initFaceMenu = initFaceMenu;
    function initMacMenu() {
        var arr = [];
        var Menus = exports.MacMenu;
        Object.keys(Menus).forEach(function (key) {
            arr.push({
                value: Menus[key].value,
                text: Menus[key].text,
                path: Menus[key].path,
                icon: Menus[key].icon
            });
        });
        return arr;
    }
    exports.initMacMenu = initMacMenu;
    function initMultiMenu() {
        var arr = [];
        var Menus = exports.MultiMenu;
        Object.keys(Menus).forEach(function (key) {
            arr.push({
                value: Menus[key].value,
                text: Menus[key].text,
                path: Menus[key].path,
                icon: Menus[key].icon
            });
        });
        return arr;
    }
    exports.initMultiMenu = initMultiMenu;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9tYWluL01lbnVFbXVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBO1FBQUE7UUFNQSxDQUFDO1FBQUQsZUFBQztJQUFELENBTkEsQUFNQyxJQUFBO0lBTlksNEJBQVE7SUFRckI7UUFBQTtRQWlCQSxDQUFDO1FBQUQsbUJBQUM7SUFBRCxDQWpCQSxBQWlCQyxJQUFBO0lBakJZLG9DQUFZO0lBbUJ6QjtRQUFBO1FBU0EsQ0FBQztRQUFELG9CQUFDO0lBQUQsQ0FUQSxBQVNDLElBQUE7SUFUWSxzQ0FBYTtJQVcxQjtRQUFBO1FBTUEsQ0FBQztRQUFELG1CQUFDO0lBQUQsQ0FOQSxBQU1DLElBQUE7SUFOWSxvQ0FBWTtJQU96QjtRQUFBO1FBR0EsQ0FBQztRQUFELHFCQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFIWSx3Q0FBYztJQUtkLFFBQUEsT0FBTyxHQUFnRTtRQUNoRixZQUFZLEVBQUU7WUFDVixLQUFLLEVBQUUsY0FBYztZQUNyQixJQUFJLEVBQUUsT0FBTztZQUNiLElBQUksRUFBRSw4QkFBOEI7WUFDcEMsSUFBSSxFQUFFLFdBQVc7U0FDcEI7UUFFRCxRQUFRLEVBQUU7WUFDTixLQUFLLEVBQUUsVUFBVTtZQUNqQixJQUFJLEVBQUUsT0FBTztZQUNiLElBQUksRUFBRSw4QkFBOEI7WUFDcEMsSUFBSSxFQUFFLFdBQVc7U0FDcEI7UUFDRCxZQUFZLEVBQUU7WUFDVixLQUFLLEVBQUUsY0FBYztZQUNyQixJQUFJLEVBQUUsT0FBTztZQUNiLElBQUksRUFBRSxrQ0FBa0M7WUFDeEMsSUFBSSxFQUFFLGVBQWU7U0FDeEI7UUFDRCxZQUFZLEVBQUU7WUFDVixLQUFLLEVBQUUsY0FBYztZQUNyQixJQUFJLEVBQUUsT0FBTztZQUNiLElBQUksRUFBRSxrQ0FBa0M7WUFDeEMsSUFBSSxFQUFFLGVBQWU7U0FDeEI7UUFDRCxRQUFRLEVBQUU7WUFDTixLQUFLLEVBQUUsVUFBVTtZQUNq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QVc7WUFDbkMsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDTCxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUs7Z0JBQ3ZCLElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSTtnQkFDckIsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJO2dCQUNyQixJQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUk7YUFDWixDQUFDLENBQUE7UUFDbEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQWJELGtDQWFDO0lBRUQ7UUFDSSxJQUFJLEdBQUcsR0FBRyxFQUFxQixDQUFDO1FBQ2hDLElBQUksS0FBSyxHQUFHLGlCQUE2RyxDQUFDO1FBQzFILE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBVztZQUNuQyxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNMLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSztnQkFDdkIsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJO2dCQUNyQixJQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUk7Z0JBQ3JCLElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSTthQUNaLENBQUMsQ0FBQTtRQUNsQixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDZixDQUFDO0lBWkQsc0NBWUMiLCJmaWxlIjoibW9kdWxlL0ludGVsbGlnZW50QW5hbHlzaXMvbWFpbi9NZW51RW11cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBNZW51RW11cyB7XHJcbiAgICB2YWx1ZTogc3RyaW5nO1xyXG4gICAgdGV4dDogc3RyaW5nO1xyXG4gICAgcGF0aDogc3RyaW5nO1xyXG4gICAgaWNvbjogc3RyaW5nO1xyXG4gICAgdHlwZT86c3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FySW50ZXJGYWNlIHtcclxuICAgIENhckRyaXZlVHJhY2s6IE1lbnVFbXVzO1xyXG4gICAgVHJhY2tGaW5kQ2FyOiBNZW51RW11cztcclxuICAgIEhpZGRlbkRpZ2dpbmc6IE1lbnVFbXVzO1xyXG4gICAgRGF5QW5kTmlnaHRPdXQ6IE1lbnVFbXVzO1xyXG4gICAgRm9sbG93Q2FyQW5hbHlzaXM6IE1lbnVFbXVzO1xyXG4gICAgRmlyc3RJbnRvQ2l0eTogTWVudUVtdXM7XHJcbiAgICBDb2xsaXNpb25BbmFseXNpczogTWVudUVtdXM7XHJcbiAgICBGcmVxdWVuY3lBbmFseXNpczogTWVudUVtdXM7XHJcbiAgICBTZXR0bGVkQW5hbHlzaXM6IE1lbnVFbXVzO1xyXG4gICAgRnJlcXVlbnRDYXI6IE1lbnVFbXVzO1xyXG4gICAgRnJlcXVlbnRWaW9sYXRpb246IE1lbnVFbXVzO1xyXG4gICAgRGVja0FuYWx5c2lzOiBNZW51RW11cztcclxuICAgIFNlYXRCZWx0QW5hbHlzaXM6IE1lbnVFbXVzO1xyXG4gICAgRHJpdmVDYWxsOiBNZW51RW11cztcclxuICAgIFN1blZpc29yRGV0ZWN0aW9uOiBNZW51RW11cztcclxuICAgIFVubGljZW5zZWRBbmFseXNpczogTWVudUVtdXNcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEZhY2VJbnRlckZhY2Uge1xyXG4gICAgRmFjZVRyYWNrOiBNZW51RW11cztcclxuICAgIEFjY29tcGFueWluZ0FuYWx5c2lzOiBNZW51RW11cztcclxuICAgIC8vU2ltaWxhcml0eUFuYWx5c2lzOiBNZW51RW11cztcclxuICAgIEZhY2VBbmFseXNpczogTWVudUVtdXM7XHJcbiAgICBQZXJzb25BbGFybTogTWVudUVtdXM7XHJcbiAgICBGcmVxdWVuY3lBbmFseXNpczogTWVudUVtdXM7XHJcbiAgICBGcmVxdWVuY3lBcHBlYXI6IE1lbnVFbXVzO1xyXG4gICAgRmFjZUNvbGxpc2lvbkFuYWx5c2lzOiBNZW51RW11cztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1hY0ludGVyRmFjZSB7XHJcbiAgICBNYWNDb2xsaXNpb246IE1lbnVFbXVzO1xyXG4gICAgTWFjVHJhY2s6IE1lbnVFbXVzO1xyXG4gICAgTWFjQWNjb21wYW55OiBNZW51RW11cztcclxuICAgIE1hY0ZyZXF1ZW5jeTogTWVudUVtdXM7XHJcbiAgICBNYWNBbGFybTogTWVudUVtdXM7XHJcbn1cclxuZXhwb3J0IGNsYXNzIE11bHRpSW50ZXJGYWNle1xyXG4gICAgRmFjZU1hY0NyYXNoOiBNZW51RW11cztcclxuICAgIE1hY0NhckNyYXNoOiBNZW51RW11cztcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IE1hY01lbnU6IHsgW2tleTogc3RyaW5nXTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSB9ICYgTWFjSW50ZXJGYWNlID0ge1xyXG4gICAgTWFjQ29sbGlzaW9uOiB7XHJcbiAgICAgICAgdmFsdWU6ICdNYWNDb2xsaXNpb24nLFxyXG4gICAgICAgIHRleHQ6ICdNYWPnorDmkp4nLFxyXG4gICAgICAgIHBhdGg6ICdJbnRlbGxpZ2VudEFuYWx5c2lzLk1hY0NyYXNoJyxcclxuICAgICAgICBpY29uOiAnbWFjLWNyYXNoJ1xyXG4gICAgfSxcclxuXHJcbiAgICBNYWNUcmFjazoge1xyXG4gICAgICAgIHZhbHVlOiAnTWFjVHJhY2snLFxyXG4gICAgICAgIHRleHQ6ICdNYWPovajov7knLFxyXG4gICAgICAgIHBhdGg6ICdJbnRlbGxpZ2VudEFuYWx5c2lzLk1hY1RyYWNrJyxcclxuICAgICAgICBpY29uOiAnbWFjLXRyYWNrJ1xyXG4gICAgfSxcclxuICAgIE1hY0FjY29tcGFueToge1xyXG4gICAgICAgIHZhbHVlOiAnTWFjQWNjb21wYW55JyxcclxuICAgICAgICB0ZXh0OiAnTUFD5Ly06ZqPJyxcclxuICAgICAgICBwYXRoOiAnSW50ZWxsaWdlbnRBbmFseXNpcy5NYWNBY2NvbXBhbnknLFxyXG4gICAgICAgIGljb246ICdtYWMtYWNjb21wYW55J1xyXG4gICAgfSxcclxuICAgIE1hY0ZyZXF1ZW5jeToge1xyXG4gICAgICAgIHZhbHVlOiAnTWFjRnJlcXVlbmN5JyxcclxuICAgICAgICB0ZXh0OiAnTUFD6aKR5qyhJyxcclxuICAgICAgICBwYXRoOiAnSW50ZWxsaWdlbnRBbmFseXNpcy5NYWNGcmVxdWVuY3knLFxyXG4gICAgICAgIGljb246ICdtYWMtZnJlcXVlbmN5J1xyXG4gICAgfSxcclxuICAgIE1hY0FsYXJtOiB7XHJcbiAgICAgICAgdmFsdWU6ICdNYWNBbGFybScsXHJcbiAgICAgICAgdGV4dDogJ01BQ+aKpeitpicsXHJcbiAgICAgICAgcGF0aDogJ0ludGVsbGlnZW50QW5hbHlzaXMuTWFjQWxhcm0nLFxyXG4gICAgICAgIGljb246ICdtYWMtYWxhcm0nXHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBGYWNlTWVudTogeyBba2V5OiBzdHJpbmddOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IH0gJiBGYWNlSW50ZXJGYWNlID0ge1xyXG4gICAgRmFjZVRyYWNrOiB7XHJcbiAgICAgICAgdmFsdWU6ICdGYWNlVHJhY2snLFxyXG4gICAgICAgIHRleHQ6ICfkurrohLjovajov7knLFxyXG4gICAgICAgIHBhdGg6ICdJbnRlbGxpZ2VudEFuYWx5c2lzLkZhY2VUcmFjaycsXHJcbiAgICAgICAgaWNvbjogJ2ZhY2UtdHJhY2snXHJcbiAgICB9LFxyXG4gICAgRnJlcXVlbmN5QW5hbHlzaXM6IHtcclxuICAgICAgICB2YWx1ZTogJ0ZyZXF1ZW5jeUFuYWx5c2lzJyxcclxuICAgICAgICB0ZXh0OiAn6aKR5qyh5YiG5p6QJyxcclxuICAgICAgICBwYXRoOiAnSW50ZWxsaWdlbnRBbmFseXNpcy5GcmVxdWVuY3lBbmFseXNpcycsXHJcbiAgICAgICAgaWNvbjogJ2ZyZXF1ZW5jeS1hbmFseXNpcydcclxuICAgIH0sXHJcbiAgICBBY2NvbXBhbnlpbmdBbmFseXNpczoge1xyXG4gICAgICAgIHZhbHVlOiAnQWNjb21wYW55aW5nQW5hbHlzaXMnLFxyXG4gICAgICAgIHRleHQ6ICfkvLTpmo/liIbmnpAnLFxyXG4gICAgICAgIHBhdGg6ICdJbnRlbGxpZ2VudEFuYWx5c2lzLkFjY29tcGFueWluZ0FuYWx5c2lzJyxcclxuICAgICAgICBpY29uOiAnYWNjb21wYW55aW5nLWFuYWx5c2lzJ1xyXG4gICAgfSxcclxuICAgIC8vIFNpbWlsYXJpdHlBbmFseXNpczoge1xyXG4gICAgLy8gICAgIHZhbHVlOiAnU2ltaWxhcml0eUFuYWx5c2lzJyxcclxuICAgIC8vICAgICB0ZXh0OiAn55u45Ly85bqm5YiG5p6QJyxcclxuICAgIC8vICAgICBwYXRoOiAnJyxcclxuICAgIC8vICAgICBpY29uOiAnc2ltaWxhcml0eS1hbmFseXNpcydcclxuICAgIC8vIH0sXHJcbiAgICBGYWNlQW5hbHlzaXM6IHtcclxuICAgICAgICB2YWx1ZTogJ0ZhY2VBbmFseXNpcycsXHJcbiAgICAgICAgdGV4dDogJ+S6uuiEuOWIhuaekCcsXHJcbiAgICAgICAgcGF0aDogJ0ludGVsbGlnZW50QW5hbHlzaXMuRmFjZUFuYWx5c2lzJyxcclxuICAgICAgICBpY29uOiAnZmFjZS1hbmFseXNpcydcclxuICAgIH0sXHJcbiAgICBQZXJzb25BbGFybToge1xyXG4gICAgICAgIHZhbHVlOiAnUGVyc29uQWxhcm0nLFxyXG4gICAgICAgIHRleHQ6ICfmiqXorabliIbmnpAnLFxyXG4gICAgICAgIHBhdGg6ICdJbnRlbGxpZ2VudEFuYWx5c2lzLkFsYXJtQW5hbHlzaXMnLFxyXG4gICAgICAgIGljb246ICdhbGFybS1hbmFseXNpcydcclxuICAgIH0sIEZyZXF1ZW5jeUFwcGVhcjoge1xyXG4gICAgICAgIHZhbHVlOiAnRnJlcXVlbmN5QXBwZWFyJyxcclxuICAgICAgICB0ZXh0OiAn6aKR57mB5Ye65rKhJyxcclxuICAgICAgICBwYXRoOiAnSW50ZWxsaWdlbnRBbmFseXNpcy5GcmVxdWVuY3lBcHBlYXInLFxyXG4gICAgICAgIGljb246ICdmcmVxdWVuY3ktYXBwZWFyJ1xyXG4gICAgfSwgRmFjZUNvbGxpc2lvbkFuYWx5c2lzOiB7XHJcbiAgICAgICAgdmFsdWU6ICdGYWNlQ29sbGlzaW9uQW5hbHlzaXMnLFxyXG4gICAgICAgIHRleHQ6ICfnorDmkp7liIbmnpAnLFxyXG4gICAgICAgIHBhdGg6ICdJbnRlbGxpZ2VudEFuYWx5c2lzLkZhY2VDb2xsaXNpb25BbmFseXNpcycsXHJcbiAgICAgICAgaWNvbjogJ2ZhY2UtY29sbGlzaW9uLWFuYWx5c2lzJ1xyXG4gICAgfSxcclxuXHJcblxyXG59O1xyXG5cclxuZnVuY3Rpb24gc2V0VXJsRm9yQ2FyKG1vZGVsTmFtZTpzdHJpbmcpe1xyXG4gICAgcmV0dXJuIGBodHRwOi8vMTcyLjE2LjkwLjIwNjo4ODg2L2h0bWwvP2lzUHZwPTEmbm9tZW51PTEmbW9kdWxlPSR7bW9kZWxOYW1lfSZ1c2VyTmFtZT1hZG1pbiZwYXNzd29yZD1lNTljZjU2ZTMzZjk3ODEyNGRhODA0YjdlMTJjMGQ1MyNjYFxyXG59XHJcbmV4cG9ydCBjb25zdCBDYXJNZW51OiB7IFtrZXk6IHN0cmluZ106IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gfSAmIENhckludGVyRmFjZSA9IHtcclxuICAgIENhckRyaXZlVHJhY2s6IHtcclxuICAgICAgICB2YWx1ZTogJ0NhckRyaXZlVHJhY2snLFxyXG4gICAgICAgIHR5cGU6J0NhcicsXHJcbiAgICAgICAgdGV4dDogJ+ihjOi9pui9qOi/uScsXHJcbiAgICAgICAgcGF0aDogc2V0VXJsRm9yQ2FyKCd0cmFjaycpLFxyXG4gICAgICAgIGljb246ICdjYXItdHJhY2snXHJcbiAgICB9LFxyXG4gICAgVHJhY2tGaW5kQ2FyOiB7XHJcbiAgICAgICAgdmFsdWU6ICdUcmFja0ZpbmRDYXInLFxyXG4gICAgICAgIHRleHQ6ICfovajov7nmn6XovaYnLFxyXG4gICAgICAgIHR5cGU6J0NhcicsXHJcbiAgICAgICAgcGF0aDogc2V0VXJsRm9yQ2FyKCdjaGVja0NhcicpLFxyXG4gICAgICAgIGljb246ICdjYXItY2hlY2stY2FyJ1xyXG4gICAgfSxcclxuICAgIEhpZGRlbkRpZ2dpbmc6IHtcclxuICAgICAgICB2YWx1ZTogJ0hpZGRlbkRpZ2dpbmcnLFxyXG4gICAgICAgIHRleHQ6ICfpmpDljL/mjJbmjpgnLFxyXG4gICAgICAgIHR5cGU6J0NhcicsXHJcbiAgICAgICAgcGF0aDogc2V0VXJsRm9yQ2FyKCdoaWRkZW4nKSxcclxuICAgICAgICBpY29uOiAnY2FyLWhpZGRlbidcclxuXHJcbiAgICB9LFxyXG4gICAgRGF5QW5kTmlnaHRPdXQ6IHtcclxuICAgICAgICB2YWx1ZTogJ0RheUFuZE5pZ2h0T3V0JyxcclxuICAgICAgICB0ZXh0OiAn5pi85LyP5aSc5Ye6JyxcclxuICAgICAgICB0eXBlOidDYXInLFxyXG4gICAgICAgIHBhdGg6IHNldFVybEZvckNhcignbm9jdHVybmFsJyksXHJcbiAgICAgICAgaWNvbjogJ2Nhci1ub2N0dXJuYWwnXHJcblxyXG4gICAgfSxcclxuICAgIEZvbGxvd0NhckFuYWx5c2lzOiB7XHJcbiAgICAgICAgdmFsdWU6ICdGb2xsb3dDYXJBbmFseXNpcycsXHJcbiAgICAgICAgdGV4dDogJ+i3n+i9puWIhuaekCcsXHJcbiAgICAgICAgdHlwZTonQ2FyJyxcclxuICAgICAgICBwYXRoOiBzZXRVcmxGb3JDYXIoJ2NhcmZvbGxvdycpLFxyXG4gICAgICAgIGljb246ICdjYXItY2FyZm9sbG93J1xyXG5cclxuICAgIH0sXHJcbiAgICBGaXJzdEludG9DaXR5OiB7XHJcbiAgICAgICAgdmFsdWU6ICdGaXJzdEludG9DaXR5JyxcclxuICAgICAgICB0ZXh0OiAn6aaW5qyh5YWl5Z+OJyxcclxuICAgICAgICB0eXBlOidDYXInLFxyXG4gICAgICAgIHBhdGg6IHNldFVybEZvckNhcignZnRpYycpLFxyXG4gICAgICAgIGljb246ICdjYXItZnRpYydcclxuXHJcbiAgICB9LFxyXG4gICAgQ29sbGlzaW9uQW5hbHlzaXM6IHtcclxuICAgICAgICB2YWx1ZTogJ0NvbGxpc2lvbkFuYWx5c2lzJyxcclxuICAgICAgICB0ZXh0OiAn56Kw5pKe5YiG5p6QJyxcclxuICAgICAgICB0eXBlOidDYXInLFxyXG4gICAgICAgIHBhdGg6IHNldFVybEZvckNhcignY29sbGlkZScpLFxyXG4gICAgICAgIGljb246ICdjYXItY29sbGlkZSdcclxuXHJcbiAgICB9LFxyXG4gICAgRnJlcXVlbmN5QW5hbHlzaXM6IHtcclxuICAgICAgICB2YWx1ZTogJ0ZyZXF1ZW5jeUFuYWx5c2lzJyxcclxuICAgICAgICB0ZXh0OiAn6aKR5qyh5YiG5p6QJyxcclxuICAgICAgICB0eXBlOidDYXInLFxyXG4gICAgICAgIHBhdGg6IHNldFVybEZvckNhcignZnJlcXVlbmN5JyksXHJcbiAgICAgICAgaWNvbjogJ2Nhci1mcmVxdWVuY3knXHJcbiAgICB9LFxyXG4gICAgU2V0dGxlZEFuYWx5c2lzOiB7XHJcbiAgICAgICAgdmFsdWU6ICdTZXR0bGVkQW5hbHlzaXMnLFxyXG4gICAgICAgIHRleHQ6ICfokL3ohJrliIbmnpAnLFxyXG4gICAgICAgIHR5cGU6J0NhcicsXHJcbiAgICAgICAgcGF0aDogc2V0VXJsRm9yQ2FyKCdmb290aG9sZCcpLFxyXG4gICAgICAgIGljb246ICdjYXItZm9vdGhvbGQnXHJcbiAgICB9LFxyXG4gICAgRnJlcXVlbnRDYXI6IHtcclxuICAgICAgICB2YWx1ZTogJ0ZyZXF1ZW50Q2FyJyxcclxuICAgICAgICB0ZXh0OiAn6aKR57mB6L+H6L2mJyxcclxuICAgICAgICB0eXBlOidDYXInLFxyXG4gICAgICAgIHBhdGg6IHNldFVybEZvckNhcignY29udGludWFsJyksXHJcbiAgICAgICAgaWNvbjogJ2Nhci1jb250aW51YWwnXHJcbiAgICB9LFxyXG4gICAgRnJlcXVlbnRWaW9sYXRpb246IHtcclxuICAgICAgICB2YWx1ZTogJ0ZyZXF1ZW50VmlvbGF0aW9uJyxcclxuICAgICAgICB0ZXh0OiAn6aKR57mB6L+d56ugJyxcclxuICAgICAgICB0eXBlOidDYXInLFxyXG4gICAgICAgIHBhdGg6IHNldFVybEZvckNhcignZnJlcXVlbnR2aW9sYXRpb25zJyksXHJcbiAgICAgICAgaWNvbjogJ2Nhci1mcmVxdWVudHZpb2xhdGlvbnMnXHJcbiAgICB9LFxyXG4gICAgRGVja0FuYWx5c2lzOiB7XHJcbiAgICAgICAgdmFsdWU6ICdEZWNrQW5hbHlzaXMnLFxyXG4gICAgICAgIHRleHQ6ICflpZfniYzliIbmnpAnLFxyXG4gICAgICAgIHR5cGU6J0NhcicsXHJcbiAgICAgICAgcGF0aDogc2V0VXJsRm9yQ2FyKCdmYWtlbGljZW5zZWQnKSxcclxuICAgICAgICBpY29uOiAnY2FyLWZha2VsaWNlbnNlZCdcclxuICAgIH0sXHJcbiAgICBTZWF0QmVsdEFuYWx5c2lzOiB7XHJcbiAgICAgICAgdmFsdWU6ICdTZWF0QmVsdEFuYWx5c2lzJyxcclxuICAgICAgICB0ZXh0OiAn5a6J5YWo5bim5YiG5p6QJyxcclxuICAgICAgICB0eXBlOidDYXInLFxyXG4gICAgICAgIHBhdGg6IHNldFVybEZvckNhcignc2VhcmNoYnlub3NlYXRiZWx0JyksXHJcbiAgICAgICAgaWNvbjogJ2Nhci1zZWFyY2hieW5vc2VhdGJlbHQnXHJcbiAgICB9LFxyXG4gICAgRHJpdmVDYWxsOiB7XHJcbiAgICAgICAgdmFsdWU6ICdEcml2ZUNhbGwnLFxyXG4gICAgICAgIHRleHQ6ICflvIDovabmiZPnlLXor50nLFxyXG4gICAgICAgIHR5cGU6J0NhcicsXHJcbiAgICAgICAgcGF0aDogc2V0VXJsRm9yQ2FyKCdzZWFyY2hieXBob25lb25kcml2aW5nJyksXHJcbiAgICAgICAgaWNvbjogJ2Nhci1zZWFyY2hieXBob25lb25kcml2aW5nJ1xyXG4gICAgfSxcclxuICAgIFN1blZpc29yRGV0ZWN0aW9uOiB7XHJcbiAgICAgICAgdmFsdWU6ICdTdW5WaXNvckRldGVjdGlvbicsXHJcbiAgICAgICAgdGV4dDogJ+mBrumYs+adv+ajgOa1iycsXHJcbiAgICAgICAgdHlwZTonQ2FyJyxcclxuICAgICAgICBwYXRoOiBzZXRVcmxGb3JDYXIoJ3NlYXJjaGJ5bmlnaHR2aXNvcicpLFxyXG4gICAgICAgIGljb246ICdjYXItc2VhcmNoYnluaWdodHZpc29yJ1xyXG4gICAgfSxcclxuICAgIFVubGljZW5zZWRBbmFseXNpczoge1xyXG4gICAgICAgIHZhbHVlOiAnVW5saWNlbnNlZEFuYWx5c2lzJyxcclxuICAgICAgICB0ZXh0OiAn5peg54mM5YiG5p6QJyxcclxuICAgICAgICB0eXBlOidDYXInLFxyXG4gICAgICAgIHBhdGg6IHNldFVybEZvckNhcignc2VhcmNoYnlub3BsYXRlJyksXHJcbiAgICAgICAgaWNvbjogJ2Nhci1zZWFyY2hieW5vcGxhdGUnXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgTXVsdGlNZW51OnsgW2tleTogc3RyaW5nXTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSB9ICYgTXVsdGlJbnRlckZhY2UgPSB7XHJcbiAgICBGYWNlTWFjQ3Jhc2g6IHtcclxuICAgICAgICB2YWx1ZTogJ0ZhY2VNYWNDcmFzaCcsXHJcbiAgICAgICAgdGV4dDogJ+S6uuiEuE1BQ+eisOaSnicsXHJcbiAgICAgICAgcGF0aDogJ0ludGVsbGlnZW50QW5hbHlzaXMuRmFjZU1hY0NyYXNoJyxcclxuICAgICAgICBpY29uOiAnZmFjZS1tYWMtY3Jhc2gnXHJcbiAgICB9LFxyXG4gICAgTWFjQ2FyQ3Jhc2g6IHtcclxuICAgICAgICB2YWx1ZTogJ01hY0NhckNyYXNoJyxcclxuICAgICAgICB0ZXh0OiAn6L2m6L6GTUFD56Kw5pKeJyxcclxuICAgICAgICBwYXRoOiAnSW50ZWxsaWdlbnRBbmFseXNpcy5NYWNDYXJDcmFzaCcsXHJcbiAgICAgICAgaWNvbjogJ21hYy1jYXItY3Jhc2gnXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdENhck1lbnUoKTogQXJyYXk8TWVudUVtdXM+IHtcclxuICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxNZW51RW11cz47XHJcbiAgICBsZXQgTWVudXMgPSBDYXJNZW51IGFzICB7IFtrZXk6IHN0cmluZ106IHsgdmFsdWU6IHN0cmluZywgdGV4dDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIGljb246IHN0cmluZyx0eXBlOnN0cmluZyB9IH0gJiBDYXJJbnRlckZhY2U7XHJcblxyXG4gICAgT2JqZWN0LmtleXMoTWVudXMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgYXJyLnB1c2goe1xyXG4gICAgICAgICAgICB2YWx1ZTogTWVudXNba2V5XS52YWx1ZSxcclxuICAgICAgICAgICAgdGV4dDogTWVudXNba2V5XS50ZXh0LFxyXG4gICAgICAgICAgICBwYXRoOiBNZW51c1trZXldLnBhdGgsXHJcbiAgICAgICAgICAgIGljb246IE1lbnVzW2tleV0uaWNvbixcclxuICAgICAgICAgICAgdHlwZTogTWVudXNba2V5XS50eXBlXHJcbiAgICAgICAgfSBhcyBNZW51RW11cylcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGFycjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRGYWNlTWVudSgpOiBBcnJheTxNZW51RW11cz4ge1xyXG4gICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PE1lbnVFbXVzPjtcclxuICAgIGxldCBNZW51cyA9IEZhY2VNZW51IGFzICB7IFtrZXk6IHN0cmluZ106IHsgdmFsdWU6IHN0cmluZywgdGV4dDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIGljb246IHN0cmluZyB9IH0gJiBGYWNlSW50ZXJGYWNlO1xyXG5cclxuICAgIE9iamVjdC5rZXlzKE1lbnVzKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIGFyci5wdXNoKHtcclxuICAgICAgICAgICAgdmFsdWU6IE1lbnVzW2tleV0udmFsdWUsXHJcbiAgICAgICAgICAgIHRleHQ6IE1lbnVzW2tleV0udGV4dCxcclxuICAgICAgICAgICAgcGF0aDogTWVudXNba2V5XS5wYXRoLFxyXG4gICAgICAgICAgICBpY29uOiBNZW51c1trZXldLmljb25cclxuICAgICAgICB9IGFzIE1lbnVFbXVzKVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYXJyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdE1hY01lbnUoKTogQXJyYXk8TWVudUVtdXM+IHtcclxuICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxNZW51RW11cz47XHJcbiAgICBsZXQgTWVudXMgPSBNYWNNZW51IGFzICB7IFtrZXk6IHN0cmluZ106IHsgdmFsdWU6IHN0cmluZywgdGV4dDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIGljb246IHN0cmluZyB9IH0gJiBNYWNJbnRlckZhY2U7XHJcblxyXG4gICAgT2JqZWN0LmtleXMoTWVudXMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgYXJyLnB1c2goe1xyXG4gICAgICAgICAgICB2YWx1ZTogTWVudXNba2V5XS52YWx1ZSxcclxuICAgICAgICAgICAgdGV4dDogTWVudXNba2V5XS50ZXh0LFxyXG4gICAgICAgICAgICBwYXRoOiBNZW51c1trZXldLnBhdGgsXHJcbiAgICAgICAgICAgIGljb246IE1lbnVzW2tleV0uaWNvblxyXG4gICAgICAgIH0gYXMgTWVudUVtdXMpXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBhcnI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0TXVsdGlNZW51KCk6IEFycmF5PE1lbnVFbXVzPiB7XHJcbiAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8TWVudUVtdXM+O1xyXG4gICAgbGV0IE1lbnVzID0gTXVsdGlNZW51IGFzICB7IFtrZXk6IHN0cmluZ106IHsgdmFsdWU6IHN0cmluZywgdGV4dDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIGljb246IHN0cmluZyB9IH0gJiBNdWx0aUludGVyRmFjZTtcclxuICAgIE9iamVjdC5rZXlzKE1lbnVzKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIGFyci5wdXNoKHtcclxuICAgICAgICAgICAgdmFsdWU6IE1lbnVzW2tleV0udmFsdWUsXHJcbiAgICAgICAgICAgIHRleHQ6IE1lbnVzW2tleV0udGV4dCxcclxuICAgICAgICAgICAgcGF0aDogTWVudXNba2V5XS5wYXRoLFxyXG4gICAgICAgICAgICBpY29uOiBNZW51c1trZXldLmljb25cclxuICAgICAgICB9IGFzIE1lbnVFbXVzKVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYXJyO1xyXG59Il19
