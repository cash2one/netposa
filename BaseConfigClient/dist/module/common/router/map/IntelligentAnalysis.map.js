define(["require", "exports", "../enum/RouteKeyEnum", "../enum/RouteGroupEnum"], function (require, exports, RouteKeyEnum_1, RouteGroupEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IntelligentAnalysis = {
        key: RouteKeyEnum_1.RouteKeyEnum.IntelligentAnalysis,
        url: '/IntelligentAnalysis?type',
        moduleName: '智能分析',
        controllerName: 'IntelligentAnalysisController',
        controllerUrl: 'module/IntelligentAnalysis/main/main.controller',
        controllerAs: 'IntelligentAnalysisCtrl',
        templateUrl: '/module/IntelligentAnalysis/main/main.html'
    };
    var FaceTrack = {
        key: RouteKeyEnum_1.RouteKeyEnum.FaceTrack,
        url: '/FaceTrack',
        moduleName: '人脸轨迹',
        controllerName: 'FaceTrackController',
        controllerUrl: 'module/IntelligentAnalysis/FaceTrack/FaceTrack.controller',
        views: {
            'analysis': {
                templateUrl: '/module/IntelligentAnalysis/FaceTrack/FaceTrack.html',
                controllerName: 'FaceTrackController',
                controllerAs: 'FaceTrackCrtl'
            }
        },
        group: RouteGroupEnum_1.GroupEnum.IntelligentAnalysisGroup,
        parent: RouteKeyEnum_1.RouteKeyEnum.IntelligentAnalysis,
        icon: null
    };
    var FaceAnalysis = {
        key: RouteKeyEnum_1.RouteKeyEnum.FaceAnalysis,
        url: '/FaceAnalysis',
        moduleName: '人脸分析',
        controllerName: 'FaceAnalysisController',
        controllerUrl: 'module/IntelligentAnalysis/FaceAnalysis/FaceAnalysis.controller',
        views: {
            'analysis': {
                templateUrl: '/module/IntelligentAnalysis/FaceAnalysis/FaceAnalysis.html',
                controllerName: 'FaceAnalysisController',
                controllerAs: 'FaceAnalysisCtrl'
            }
        },
        group: RouteGroupEnum_1.GroupEnum.IntelligentAnalysisGroup,
        parent: RouteKeyEnum_1.RouteKeyEnum.IntelligentAnalysis,
        icon: null
    };
    var AccompanyingAnalysis = {
        key: RouteKeyEnum_1.RouteKeyEnum.AccompanyingAnalysis,
        url: '/AccompanyingAnalysis',
        moduleName: '伴随分析',
        controllerName: 'AccompanyingAnalysisController',
        controllerUrl: 'module/IntelligentAnalysis/AccompanyingAnalysis/AccompanyingAnalysis.controller',
        views: {
            'analysis': {
                templateUrl: '/module/IntelligentAnalysis/AccompanyingAnalysis/AccompanyingAnalysis.html',
                controllerName: 'AccompanyingAnalysisController',
                controllerAs: 'AccompanyingAnalysisCrtl'
            }
        },
        group: RouteGroupEnum_1.GroupEnum.IntelligentAnalysisGroup,
        parent: RouteKeyEnum_1.RouteKeyEnum.IntelligentAnalysis,
        icon: null
    };
    var AlarmAnalysis = {
        key: RouteKeyEnum_1.RouteKeyEnum.AlarmAnalysis,
        url: '/AlarmAnalysis',
        moduleName: '伴随分析',
        controllerName: 'PersonAlarmController',
        controllerUrl: 'module/IntelligentAnalysis/PersonAlarm/PersonAlarm.controller',
        views: {
            'analysis': {
                templateUrl: '/module/IntelligentAnalysis/PersonAlarm/PersonAlarm.html',
                controllerName: 'PersonAlarmController',
                controllerAs: 'PersonAlarmCtrl'
            }
        },
        group: RouteGroupEnum_1.GroupEnum.IntelligentAnalysisGroup,
        parent: RouteKeyEnum_1.RouteKeyEnum.IntelligentAnalysis,
        icon: null
    };
    var FrequencyAnalysis = {
        key: RouteKeyEnum_1.RouteKeyEnum.FrequencyAnalysis,
        url: '/FrequencyAnalysis',
        moduleName: '频次分析',
        controllerName: 'FrequencyAnalysisController',
        controllerUrl: 'module/IntelligentAnalysis/FrequencyAnalysis/FrequencyAnalysis.controller',
        views: {
            'analysis': {
                templateUrl: '/module/IntelligentAnalysis/FrequencyAnalysis/FrequencyAnalysis.html',
                controllerName: 'FrequencyAnalysisController',
                controllerAs: 'FrequencyAnalysisCtrl'
            }
        },
        group: RouteGroupEnum_1.GroupEnum.IntelligentAnalysisGroup,
        parent: RouteKeyEnum_1.RouteKeyEnum.IntelligentAnalysis,
        icon: null
    };
    var FrequencyAppear = {
        key: RouteKeyEnum_1.RouteKeyEnum.FrequencyAppear,
        url: '/FrequencyAppear',
        moduleName: '频次分析',
        controllerName: 'FrequencyAppearController',
        controllerUrl: 'module/IntelligentAnalysis/FrequencyAppear/FrequencyAppear.controller',
        views: {
            'analysis': {
                templateUrl: '/module/IntelligentAnalysis/FrequencyAppear/FrequencyAppear.html',
                controllerName: 'FrequencyAppearController',
                controllerAs: 'FrequencyAppearCtrl'
            }
        },
        group: RouteGroupEnum_1.GroupEnum.IntelligentAnalysisGroup,
        parent: RouteKeyEnum_1.RouteKeyEnum.IntelligentAnalysis,
        icon: null
    };
    var FaceCollisionAnalysis = {
        key: RouteKeyEnum_1.RouteKeyEnum.FaceCollisionAnalysis,
        url: '/FaceCollisionAnalysis',
        moduleName: '碰撞分析',
        controllerName: 'FaceCollisionAnalysisController',
        controllerUrl: 'module/IntelligentAnalysis/FaceCollisionAnalysis/FaceCollisionAnalysis.controller',
        views: {
            'analysis': {
                templateUrl: '/module/IntelligentAnalysis/FaceCollisionAnalysis/FaceCollisionAnalysis.html',
                controllerName: 'FaceCollisionAnalysisController',
                controllerAs: 'FaceCollisionAnalysisCtrl'
            }
        },
        group: RouteGroupEnum_1.GroupEnum.IntelligentAnalysisGroup,
        parent: RouteKeyEnum_1.RouteKeyEnum.IntelligentAnalysis,
        icon: null
    };
    var CarAnalysis = {
        key: RouteKeyEnum_1.RouteKeyEnum.CarAnalysis,
        url: '/CarAnalysis',
        moduleName: '套牌分析',
        controllerName: 'CarAnalysisController',
        controllerUrl: 'module/IntelligentAnalysis/CarAnalysis/CarAnalysis.controller',
        views: {
            'analysis': {
                templateUrl: '/module/IntelligentAnalysis/CarAnalysis/CarAnalysis.html',
                controllerName: 'CarAnalysisController',
                controllerAs: 'CarAnalysisCtrl'
            }
        },
        group: RouteGroupEnum_1.GroupEnum.IntelligentAnalysisGroup,
        parent: RouteKeyEnum_1.RouteKeyEnum.IntelligentAnalysis,
        icon: null
    };
    var MacCrash = {
        key: RouteKeyEnum_1.RouteKeyEnum.MacCrash,
        url: '/MacCrash',
        moduleName: 'Mac碰撞',
        controllerName: 'macCollisionAnalysisController',
        controllerUrl: 'module/IntelligentAnalysis/MacCollisionAnalysis/MacCollisionAnalysis.controller',
        views: {
            'analysis': {
                templateUrl: '/module/IntelligentAnalysis/MacCollisionAnalysis/MacCollisionAnalysis.html',
                controllerName: 'macCollisionAnalysisController',
                controllerAs: 'macCollisionCtrl'
            }
        },
        group: RouteGroupEnum_1.GroupEnum.IntelligentAnalysisGroup,
        parent: RouteKeyEnum_1.RouteKeyEnum.IntelligentAnalysis,
        icon: null
    };
    var FaceMacCrash = {
        key: RouteKeyEnum_1.RouteKeyEnum.FaceMacCrash,
        url: '/FaceMacCrash',
        moduleName: '人脸MAC碰撞',
        controllerName: 'FaceMacCrashCtrl',
        controllerUrl: 'module/IntelligentAnalysis/FaceMacCrash/FaceMacCrash.controller',
        views: {
            'analysis': {
                templateUrl: '/module/IntelligentAnalysis/FaceMacCrash/FaceMacCrash.html',
                controllerName: 'FaceMacCrashController',
                controllerAs: 'FaceMacCrashCtrl'
            }
        },
        group: RouteGroupEnum_1.GroupEnum.IntelligentAnalysisGroup,
        parent: RouteKeyEnum_1.RouteKeyEnum.IntelligentAnalysis,
        icon: null
    };
    var MacCarCrash = {
        key: RouteKeyEnum_1.RouteKeyEnum.MacCarCrash,
        url: '/MacCarCrash',
        moduleName: '车辆MAC碰撞',
        controllerName: 'MacCarCrashCtrl',
        controllerUrl: 'module/IntelligentAnalysis/MacCarCrash/MacCarCrash.controller',
        views: {
            'analysis': {
                templateUrl: '/module/IntelligentAnalysis/MacCarCrash/MacCarCrash.html',
                controllerName: 'MacCarCrashController',
                controllerAs: 'MacCarCrashCtrl'
            }
        },
        group: RouteGroupEnum_1.GroupEnum.IntelligentAnalysisGroup,
        parent: RouteKeyEnum_1.RouteKeyEnum.IntelligentAnalysis,
        icon: null
    };
    exports.IntelligentAnalysisMap = [
        IntelligentAnalysis, FaceTrack, FaceAnalysis, AccompanyingAnalysis, AlarmAnalysis, FrequencyAnalysis, FrequencyAppear, FaceCollisionAnalysis,
        CarAnalysis, MacCrash, FaceMacCrash, MacCarCrash,
    ];
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3JvdXRlci9tYXAvSW50ZWxsaWdlbnRBbmFseXNpcy5tYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBUUEsSUFBTSxtQkFBbUIsR0FBaUI7UUFDdEMsR0FBRyxFQUFFLDJCQUFZLENBQUMsbUJBQW1CO1FBQ3JDLEdBQUcsRUFBRSwyQkFBMkI7UUFDaEMsVUFBVSxFQUFFLE1BQU07UUFDbEIsY0FBYyxFQUFFLCtCQUErQjtRQUMvQyxhQUFhLEVBQUUsaURBQWlEO1FBQ2hFLFlBQVksRUFBRSx5QkFBeUI7UUFDdkMsV0FBVyxFQUFFLDRDQUE0QztLQUM1RCxDQUFDO0lBQ0YsSUFBTSxTQUFTLEdBQWlCO1FBQzVCLEdBQUcsRUFBRSwyQkFBWSxDQUFDLFNBQVM7UUFDM0IsR0FBRyxFQUFFLFlBQVk7UUFDakIsVUFBVSxFQUFFLE1BQU07UUFDbEIsY0FBYyxFQUFFLHFCQUFxQjtRQUNyQyxhQUFhLEVBQUUsMkRBQTJEO1FBQzFFLEtBQUssRUFBRTtZQUNILFVBQVUsRUFBRTtnQkFDUixXQUFXLEVBQUUsc0RBQXNEO2dCQUNuRSxjQUFjLEVBQUUscUJBQXFCO2dCQUNyQyxZQUFZLEVBQUUsZUFBZTthQUNoQztTQUNKO1FBQ0QsS0FBSyxFQUFFLDBCQUFTLENBQUMsd0JBQXdCO1FBQ3pDLE1BQU0sRUFBRSwyQkFBWSxDQUFDLG1CQUFtQjtRQUN4QyxJQUFJLEVBQUUsSUFBSTtLQUNiLENBQUM7SUFFRixJQUFNLFlBQVksR0FBaUI7UUFDL0IsR0FBRyxFQUFFLDJCQUFZLENBQUMsWUFBWTtRQUM5QixHQUFHLEVBQUUsZUFBZTtRQUNwQixVQUFVLEVBQUUsTUFBTTtRQUNsQixjQUFjLEVBQUUsd0JBQXdCO1FBQ3hDLGFBQWEsRUFBRSxpRUFBaUU7UUFDaEYsS0FBSyxFQUFFO1lBQ0gsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFBRSw0REFBNEQ7Z0JBQ3pFLGNBQWMsRUFBRSx3QkFBd0I7Z0JBQ3hDLFlBQVksRUFBRSxr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QixjQUFjLEVBQUUsa0JBQWtCO1FBQ2xDLGFBQWEsRUFBRSxpRUFBaUU7UUFDaEYsS0FBSyxFQUFFO1lBQ0gsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFBRSw0REFBNEQ7Z0JBQ3pFLGNBQWMsRUFBRSx3QkFBd0I7Z0JBQ3hDLFlBQVksRUFBRSxrQkFBa0I7YUFDbkM7U0FDSjtRQUNELEtBQUssRUFBRSwwQkFBUyxDQUFDLHdCQUF3QjtRQUN6QyxNQUFNLEVBQUUsMkJBQVksQ0FBQyxtQkFBbUI7UUFDeEMsSUFBSSxFQUFFLElBQUk7S0FDYixDQUFDO0lBNERGLElBQU0sV0FBVyxHQUFpQjtRQUM5QixHQUFHLEVBQUUsMkJBQVksQ0FBQyxXQUFXO1FBQzdCLEdBQUcsRUFBRSxjQUFjO1FBQ25CLFVBQVUsRUFBRSxTQUFTO1FBQ3JCLGNBQWMsRUFBRSxpQkFBaUI7UUFDakMsYUFBYSxFQUFFLCtEQUErRDtRQUM5RSxLQUFLLEVBQUU7WUFDSCxVQUFVLEVBQUU7Z0JBQ1IsV0FBVyxFQUFFLDBEQUEwRDtnQkFDdkUsY0FBYyxFQUFFLHVCQUF1QjtnQkFDdkMsWUFBWSxFQUFFLGlCQUFpQjthQUNsQztTQUNKO1FBQ0QsS0FBSyxFQUFFLDBCQUFTLENBQUMsd0JBQXdCO1FBQ3pDLE1BQU0sRUFBRSwyQkFBWSxDQUFDLG1CQUFtQjtRQUN4QyxJQUFJLEVBQUUsSUFBSTtLQUNiLENBQUM7SUFxQlcsUUFBQSxzQkFBc0IsR0FBRztRQUNsQyxtQkFBbUIsRUFBQyxTQUFTLEVBQUMsWUFBWSxFQUFDLG9CQUFvQixFQUFDLGFBQWEsRUFBQyxpQkFBaUIsRUFBQyxlQUFlLEVBQUUscUJBQXFCO1FBQ3RJLFdBQVcsRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLFdBQVc7S0FFeEIsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3JvdXRlci9tYXAvSW50ZWxsaWdlbnRBbmFseXNpcy5tYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBkZWxsIG9uIDIwMTcvNS8zMS5cclxuICovXHJcbmltcG9ydCB7SVJvdXRlckNvbmZpZ30gZnJvbSBcIi4uL3JvdXRlclwiO1xyXG5pbXBvcnQge1JvdXRlS2V5RW51bX0gZnJvbSBcIi4uL2VudW0vUm91dGVLZXlFbnVtXCI7XHJcbmltcG9ydCB7R3JvdXBFbnVtfSBmcm9tIFwiLi4vZW51bS9Sb3V0ZUdyb3VwRW51bVwiO1xyXG5cclxuXHJcbmNvbnN0IEludGVsbGlnZW50QW5hbHlzaXM6SVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLkludGVsbGlnZW50QW5hbHlzaXMsXHJcbiAgICB1cmw6ICcvSW50ZWxsaWdlbnRBbmFseXNpcz90eXBlJyxcclxuICAgIG1vZHVsZU5hbWU6ICfmmbrog73liIbmnpAnLFxyXG4gICAgY29udHJvbGxlck5hbWU6ICdJbnRlbGxpZ2VudEFuYWx5c2lzQ29udHJvbGxlcicsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL0ludGVsbGlnZW50QW5hbHlzaXMvbWFpbi9tYWluLmNvbnRyb2xsZXInLFxyXG4gICAgY29udHJvbGxlckFzOiAnSW50ZWxsaWdlbnRBbmFseXNpc0N0cmwnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL0ludGVsbGlnZW50QW5hbHlzaXMvbWFpbi9tYWluLmh0bWwnXHJcbn07XHJcbmNvbnN0IEZhY2VUcmFjazpJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uRmFjZVRyYWNrLFxyXG4gICAgdXJsOiAnL0ZhY2VUcmFjaycsXHJcbiAgICBtb2R1bGVOYW1lOiAn5Lq66IS46L2o6L+5JyxcclxuICAgIGNvbnRyb2xsZXJOYW1lOiAnRmFjZVRyYWNrQ29udHJvbGxlcicsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL0ludGVsbGlnZW50QW5hbHlzaXMvRmFjZVRyYWNrL0ZhY2VUcmFjay5jb250cm9sbGVyJyxcclxuICAgIHZpZXdzOiB7XHJcbiAgICAgICAgJ2FuYWx5c2lzJzoge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9GYWNlVHJhY2svRmFjZVRyYWNrLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ0ZhY2VUcmFja0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdGYWNlVHJhY2tDcnRsJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBncm91cDogR3JvdXBFbnVtLkludGVsbGlnZW50QW5hbHlzaXNHcm91cCxcclxuICAgIHBhcmVudDogUm91dGVLZXlFbnVtLkludGVsbGlnZW50QW5hbHlzaXMsXHJcbiAgICBpY29uOiBudWxsXHJcbn07XHJcblxyXG5jb25zdCBGYWNlQW5hbHlzaXM6SVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLkZhY2VBbmFseXNpcyxcclxuICAgIHVybDogJy9GYWNlQW5hbHlzaXMnLFxyXG4gICAgbW9kdWxlTmFtZTogJ+S6uuiEuOWIhuaekCcsXHJcbiAgICBjb250cm9sbGVyTmFtZTogJ0ZhY2VBbmFseXNpc0NvbnRyb2xsZXInLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL0ZhY2VBbmFseXNpcy9GYWNlQW5hbHlzaXMuY29udHJvbGxlcicsXHJcbiAgICB2aWV3czoge1xyXG4gICAgICAgICdhbmFseXNpcyc6IHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL0ludGVsbGlnZW50QW5hbHlzaXMvRmFjZUFuYWx5c2lzL0ZhY2VBbmFseXNpcy5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlck5hbWU6ICdGYWNlQW5hbHlzaXNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnRmFjZUFuYWx5c2lzQ3RybCdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ3JvdXA6IEdyb3VwRW51bS5JbnRlbGxpZ2VudEFuYWx5c2lzR3JvdXAsXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5JbnRlbGxpZ2VudEFuYWx5c2lzLFxyXG4gICAgaWNvbjogbnVsbFxyXG59O1xyXG5cclxuY29uc3QgQWNjb21wYW55aW5nQW5hbHlzaXM6SVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLkFjY29tcGFueWluZ0FuYWx5c2lzLFxyXG4gICAgdXJsOiAnL0FjY29tcGFueWluZ0FuYWx5c2lzJyxcclxuICAgIG1vZHVsZU5hbWU6ICfkvLTpmo/liIbmnpAnLFxyXG4gICAgY29udHJvbGxlck5hbWU6ICdBY2NvbXBhbnlpbmdBbmFseXNpc0NvbnRyb2xsZXInLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL0FjY29tcGFueWluZ0FuYWx5c2lzL0FjY29tcGFueWluZ0FuYWx5c2lzLmNvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICAnYW5hbHlzaXMnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL0FjY29tcGFueWluZ0FuYWx5c2lzL0FjY29tcGFueWluZ0FuYWx5c2lzLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ0FjY29tcGFueWluZ0FuYWx5c2lzQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ0FjY29tcGFueWluZ0FuYWx5c2lzQ3J0bCdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ3JvdXA6IEdyb3VwRW51bS5JbnRlbGxpZ2VudEFuYWx5c2lzR3JvdXAsXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5JbnRlbGxpZ2VudEFuYWx5c2lzLFxyXG4gICAgaWNvbjogbnVsbFxyXG59O1xyXG5cclxuY29uc3QgQWxhcm1BbmFseXNpczpJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uQWxhcm1BbmFseXNpcyxcclxuICAgIHVybDogJy9BbGFybUFuYWx5c2lzJyxcclxuICAgIG1vZHVsZU5hbWU6ICfkvLTpmo/liIbmnpAnLFxyXG4gICAgY29udHJvbGxlck5hbWU6ICdQZXJzb25BbGFybUNvbnRyb2xsZXInLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL1BlcnNvbkFsYXJtL1BlcnNvbkFsYXJtLmNvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICAnYW5hbHlzaXMnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL1BlcnNvbkFsYXJtL1BlcnNvbkFsYXJtLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ1BlcnNvbkFsYXJtQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ1BlcnNvbkFsYXJtQ3RybCdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ3JvdXA6IEdyb3VwRW51bS5JbnRlbGxpZ2VudEFuYWx5c2lzR3JvdXAsXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5JbnRlbGxpZ2VudEFuYWx5c2lzLFxyXG4gICAgaWNvbjogbnVsbFxyXG59O1xyXG5cclxuY29uc3QgRnJlcXVlbmN5QW5hbHlzaXM6SVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLkZyZXF1ZW5jeUFuYWx5c2lzLFxyXG4gICAgdXJsOiAnL0ZyZXF1ZW5jeUFuYWx5c2lzJyxcclxuICAgIG1vZHVsZU5hbWU6ICfpopHmrKHliIbmnpAnLFxyXG4gICAgY29udHJvbGxlck5hbWU6ICdGcmVxdWVuY3lBbmFseXNpc0NvbnRyb2xsZXInLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL0ZyZXF1ZW5jeUFuYWx5c2lzL0ZyZXF1ZW5jeUFuYWx5c2lzLmNvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICAnYW5hbHlzaXMnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL0ZyZXF1ZW5jeUFuYWx5c2lzL0ZyZXF1ZW5jeUFuYWx5c2lzLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ0ZyZXF1ZW5jeUFuYWx5c2lzQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ0ZyZXF1ZW5jeUFuYWx5c2lzQ3RybCdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ3JvdXA6IEdyb3VwRW51bS5JbnRlbGxpZ2VudEFuYWx5c2lzR3JvdXAsXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5JbnRlbGxpZ2VudEFuYWx5c2lzLFxyXG4gICAgaWNvbjogbnVsbFxyXG59O1xyXG5cclxuY29uc3QgRnJlcXVlbmN5QXBwZWFyOklSb3V0ZXJDb25maWcgPSB7XHJcbiAgICBrZXk6IFJvdXRlS2V5RW51bS5GcmVxdWVuY3lBcHBlYXIsXHJcbiAgICB1cmw6ICcvRnJlcXVlbmN5QXBwZWFyJyxcclxuICAgIG1vZHVsZU5hbWU6ICfpopHmrKHliIbmnpAnLFxyXG4gICAgY29udHJvbGxlck5hbWU6ICdGcmVxdWVuY3lBcHBlYXJDb250cm9sbGVyJyxcclxuICAgIGNvbnRyb2xsZXJVcmw6ICdtb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9GcmVxdWVuY3lBcHBlYXIvRnJlcXVlbmN5QXBwZWFyLmNvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICAnYW5hbHlzaXMnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL0ZyZXF1ZW5jeUFwcGVhci9GcmVxdWVuY3lBcHBlYXIuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAnRnJlcXVlbmN5QXBwZWFyQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ0ZyZXF1ZW5jeUFwcGVhckN0cmwnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdyb3VwOiBHcm91cEVudW0uSW50ZWxsaWdlbnRBbmFseXNpc0dyb3VwLFxyXG4gICAgcGFyZW50OiBSb3V0ZUtleUVudW0uSW50ZWxsaWdlbnRBbmFseXNpcyxcclxuICAgIGljb246IG51bGxcclxufTtcclxuXHJcbmNvbnN0IEZhY2VDb2xsaXNpb25BbmFseXNpczpJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uRmFjZUNvbGxpc2lvbkFuYWx5c2lzLFxyXG4gICAgdXJsOiAnL0ZhY2VDb2xsaXNpb25BbmFseXNpcycsXHJcbiAgICBtb2R1bGVOYW1lOiAn56Kw5pKe5YiG5p6QJyxcclxuICAgIGNvbnRyb2xsZXJOYW1lOiAnRmFjZUNvbGxpc2lvbkFuYWx5c2lzQ29udHJvbGxlcicsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL0ludGVsbGlnZW50QW5hbHlzaXMvRmFjZUNvbGxpc2lvbkFuYWx5c2lzL0ZhY2VDb2xsaXNpb25BbmFseXNpcy5jb250cm9sbGVyJyxcclxuICAgIHZpZXdzOiB7XHJcbiAgICAgICAgJ2FuYWx5c2lzJzoge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9GYWNlQ29sbGlzaW9uQW5hbHlzaXMvRmFjZUNvbGxpc2lvbkFuYWx5c2lzLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ0ZhY2VDb2xsaXNpb25BbmFseXNpc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdGYWNlQ29sbGlzaW9uQW5hbHlzaXNDdHJsJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBncm91cDogR3JvdXBFbnVtLkludGVsbGlnZW50QW5hbHlzaXNHcm91cCxcclxuICAgIHBhcmVudDogUm91dGVLZXlFbnVtLkludGVsbGlnZW50QW5hbHlzaXMsXHJcbiAgICBpY29uOiBudWxsXHJcbn07XHJcblxyXG5jb25zdCBDYXJBbmFseXNpczpJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uQ2FyQW5hbHlzaXMsXHJcbiAgICB1cmw6ICcvQ2FyQW5hbHlzaXMnLFxyXG4gICAgbW9kdWxlTmFtZTogJ+Wll+eJjOWIhuaekCcsXHJcbiAgICBjb250cm9sbGVyTmFtZTogJ0NhckFuYWx5c2lzQ29udHJvbGxlcicsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL0ludGVsbGlnZW50QW5hbHlzaXMvQ2FyQW5hbHlzaXMvQ2FyQW5hbHlzaXMuY29udHJvbGxlcicsXHJcbiAgICB2aWV3czoge1xyXG4gICAgICAgICdhbmFseXNpcyc6IHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL0ludGVsbGlnZW50QW5hbHlzaXMvQ2FyQW5hbHlzaXMvQ2FyQW5hbHlzaXMuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAnQ2FyQW5hbHlzaXNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnQ2FyQW5hbHlzaXNDdHJsJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBncm91cDogR3JvdXBFbnVtLkludGVsbGlnZW50QW5hbHlzaXNHcm91cCxcclxuICAgIHBhcmVudDogUm91dGVLZXlFbnVtLkludGVsbGlnZW50QW5hbHlzaXMsXHJcbiAgICBpY29uOiBudWxsXHJcbn07XHJcblxyXG4vLyBNYWPnorDmkp5cclxuY29uc3QgTWFjQ3Jhc2g6SVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLk1hY0NyYXNoLFxyXG4gICAgdXJsOiAnL01hY0NyYXNoJyxcclxuICAgIG1vZHVsZU5hbWU6ICdNYWPnorDmkp4nLFxyXG4gICAgY29udHJvbGxlck5hbWU6ICdtYWNDb2xsaXNpb25BbmFseXNpc0NvbnRyb2xsZXInLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL01hY0NvbGxpc2lvbkFuYWx5c2lzL01hY0NvbGxpc2lvbkFuYWx5c2lzLmNvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICAnYW5hbHlzaXMnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL01hY0NvbGxpc2lvbkFuYWx5c2lzL01hY0NvbGxpc2lvbkFuYWx5c2lzLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ21hY0NvbGxpc2lvbkFuYWx5c2lzQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ21hY0NvbGxpc2lvbkN0cmwnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdyb3VwOiBHcm91cEVudW0uSW50ZWxsaWdlbnRBbmFseXNpc0dyb3VwLFxyXG4gICAgcGFyZW50OiBSb3V0ZUtleUVudW0uSW50ZWxsaWdlbnRBbmFseXNpcyxcclxuICAgIGljb246IG51bGxcclxufTtcclxuXHJcbi8vIOS6uuiEuE1BQ+eisOaSnlxyXG5jb25zdCBGYWNlTWFjQ3Jhc2g6SVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLkZhY2VNYWNDcmFzaCxcclxuICAgIHVybDogJy9GYWNlTWFjQ3Jhc2gnLFxyXG4gICAgbW9kdWxlTmFtZTogJ+S6uuiEuE1BQ+eisOaSnicsXHJcbiAgICBjb250cm9sbGVyTmFtZTogJ0ZhY2VNYWNDcmFzaEN0cmwnLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL0ZhY2VNYWNDcmFzaC9GYWNlTWFjQ3Jhc2guY29udHJvbGxlcicsXHJcbiAgICB2aWV3czoge1xyXG4gICAgICAgICdhbmFseXNpcyc6IHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL0ludGVsbGlnZW50QW5hbHlzaXMvRmFjZU1hY0NyYXNoL0ZhY2VNYWNDcmFzaC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlck5hbWU6ICdGYWNlTWFjQ3Jhc2hDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnRmFjZU1hY0NyYXNoQ3RybCdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ3JvdXA6IEdyb3VwRW51bS5JbnRlbGxpZ2VudEFuYWx5c2lzR3JvdXAsXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5JbnRlbGxpZ2VudEFuYWx5c2lzLFxyXG4gICAgaWNvbjogbnVsbFxyXG59O1xyXG4vL1xyXG4vLyAvLyBNYWPovajov7lcclxuLy8gY29uc3QgTWFjVHJhY2s6SVJvdXRlckNvbmZpZyA9IHtcclxuLy8gICAgIGtleTogUm91dGVLZXlFbnVtLk1hY1RyYWNrLFxyXG4vLyAgICAgdXJsOiAnL01hY1RyYWNrJyxcclxuLy8gICAgIG1vZHVsZU5hbWU6ICdNYWPovajov7knLFxyXG4vLyAgICAgY29udHJvbGxlck5hbWU6ICdNYWNUcmFja0N0cmwnLFxyXG4vLyAgICAgY29udHJvbGxlclVybDogJ21vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL01hY1RyYWNrL01hY1RyYWNrLmNvbnRyb2xsZXInLFxyXG4vLyAgICAgdmlld3M6IHtcclxuLy8gICAgICAgICAnYW5hbHlzaXMnOiB7XHJcbi8vICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL01hY1RyYWNrL01hY1RyYWNrLmh0bWwnLFxyXG4vLyAgICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ01hY1RyYWNrQ29udHJvbGxlcicsXHJcbi8vICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ01hY1RyYWNrQ3RybCdcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9LFxyXG4vLyAgICAgZ3JvdXA6IEdyb3VwRW51bS5JbnRlbGxpZ2VudEFuYWx5c2lzR3JvdXAsXHJcbi8vICAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5JbnRlbGxpZ2VudEFuYWx5c2lzLFxyXG4vLyAgICAgaWNvbjogbnVsbFxyXG4vLyB9O1xyXG4vL1xyXG4vLyAvLyBNYWPkvLTpmo9cclxuLy8gY29uc3QgTWFjQWNjb21wYW55OklSb3V0ZXJDb25maWcgPSB7XHJcbi8vICAgICBrZXk6IFJvdXRlS2V5RW51bS5NYWNBY2NvbXBhbnksXHJcbi8vICAgICB1cmw6ICcvTWFjQWNjb21wYW55JyxcclxuLy8gICAgIG1vZHVsZU5hbWU6ICdNYWPkvLTpmo8nLFxyXG4vLyAgICAgY29udHJvbGxlck5hbWU6ICdNYWNBY2NvbXBhbnlDdHJsJyxcclxuLy8gICAgIGNvbnRyb2xsZXJVcmw6ICdtb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9NYWNBY2NvbXBhbnkvTWFjQWNjb21wYW55LmNvbnRyb2xsZXInLFxyXG4vLyAgICAgdmlld3M6IHtcclxuLy8gICAgICAgICAnYW5hbHlzaXMnOiB7XHJcbi8vICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL01hY0FjY29tcGFueS9NYWNBY2NvbXBhbnkuaHRtbCcsXHJcbi8vICAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAnTWFjQWNjb21wYW55Q29udHJvbGxlcicsXHJcbi8vICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ01hY0FjY29tcGFueUN0cmwnXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfSxcclxuLy8gICAgIGdyb3VwOiBHcm91cEVudW0uSW50ZWxsaWdlbnRBbmFseXNpc0dyb3VwLFxyXG4vLyAgICAgcGFyZW50OiBSb3V0ZUtleUVudW0uSW50ZWxsaWdlbnRBbmFseXNpcyxcclxuLy8gICAgIGljb246IG51bGxcclxuLy8gfTtcclxuLy9cclxuLy8gLy8gTWFj6aKR5qyhXHJcbi8vIGNvbnN0IE1hY0ZyZXF1ZW5jeTpJUm91dGVyQ29uZmlnID0ge1xyXG4vLyAgICAga2V5OiBSb3V0ZUtleUVudW0uTWFjRnJlcXVlbmN5LFxyXG4vLyAgICAgdXJsOiAnL01hY0ZyZXF1ZW5jeScsXHJcbi8vICAgICBtb2R1bGVOYW1lOiAnTUFD6aKR5qyhJyxcclxuLy8gICAgIGNvbnRyb2xsZXJOYW1lOiAnTWFjRnJlcXVlbmN5Q3RybCcsXHJcbi8vICAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL0ludGVsbGlnZW50QW5hbHlzaXMvTWFjRnJlcXVlbmN5L01hY0ZyZXF1ZW5jeS5jb250cm9sbGVyJyxcclxuLy8gICAgIHZpZXdzOiB7XHJcbi8vICAgICAgICAgJ2FuYWx5c2lzJzoge1xyXG4vLyAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9NYWNGcmVxdWVuY3kvTWFjRnJlcXVlbmN5Lmh0bWwnLFxyXG4vLyAgICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ01hY0ZyZXF1ZW5jeUNvbnRyb2xsZXInLFxyXG4vLyAgICAgICAgICAgICBjb250cm9sbGVyQXM6ICdNYWNGcmVxdWVuY3lDdHJsJ1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH0sXHJcbi8vICAgICBncm91cDogR3JvdXBFbnVtLkludGVsbGlnZW50QW5hbHlzaXNHcm91cCxcclxuLy8gICAgIHBhcmVudDogUm91dGVLZXlFbnVtLkludGVsbGlnZW50QW5hbHlzaXMsXHJcbi8vICAgICBpY29uOiBudWxsXHJcbi8vIH07XHJcblxyXG4vLyDovabovoZNQUPnorDmkp5cclxuY29uc3QgTWFjQ2FyQ3Jhc2g6SVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLk1hY0NhckNyYXNoLFxyXG4gICAgdXJsOiAnL01hY0NhckNyYXNoJyxcclxuICAgIG1vZHVsZU5hbWU6ICfovabovoZNQUPnorDmkp4nLFxyXG4gICAgY29udHJvbGxlck5hbWU6ICdNYWNDYXJDcmFzaEN0cmwnLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL01hY0NhckNyYXNoL01hY0NhckNyYXNoLmNvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICAnYW5hbHlzaXMnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL01hY0NhckNyYXNoL01hY0NhckNyYXNoLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ01hY0NhckNyYXNoQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ01hY0NhckNyYXNoQ3RybCdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ3JvdXA6IEdyb3VwRW51bS5JbnRlbGxpZ2VudEFuYWx5c2lzR3JvdXAsXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5JbnRlbGxpZ2VudEFuYWx5c2lzLFxyXG4gICAgaWNvbjogbnVsbFxyXG59O1xyXG4vL1xyXG4vLyAvLyBNQUPmiqXoraZcclxuLy8gY29uc3QgTWFjQWxhcm06SVJvdXRlckNvbmZpZyA9IHtcclxuLy8gICAgIGtleTogUm91dGVLZXlFbnVtLk1hY0FsYXJtLFxyXG4vLyAgICAgdXJsOiAnL01hY0FsYXJtJyxcclxuLy8gICAgIG1vZHVsZU5hbWU6ICdNYWPnorDmkp4nLFxyXG4vLyAgICAgY29udHJvbGxlck5hbWU6ICdNYWNBbGFybUN0cmwnLFxyXG4vLyAgICAgY29udHJvbGxlclVybDogJ21vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL01hY0FsYXJtL01hY0FsYXJtLmNvbnRyb2xsZXInLFxyXG4vLyAgICAgdmlld3M6IHtcclxuLy8gICAgICAgICAnYW5hbHlzaXMnOiB7XHJcbi8vICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL01hY0FsYXJtL01hY0FsYXJtLmh0bWwnLFxyXG4vLyAgICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ01hY0FsYXJtQ29udHJvbGxlcicsXHJcbi8vICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ01hY0FsYXJtQ3RybCdcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9LFxyXG4vLyAgICAgZ3JvdXA6IEdyb3VwRW51bS5JbnRlbGxpZ2VudEFuYWx5c2lzR3JvdXAsXHJcbi8vICAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5JbnRlbGxpZ2VudEFuYWx5c2lzLFxyXG4vLyAgICAgaWNvbjogbnVsbFxyXG4vLyB9O1xyXG5cclxuZXhwb3J0IGNvbnN0IEludGVsbGlnZW50QW5hbHlzaXNNYXAgPSBbXHJcbiAgICBJbnRlbGxpZ2VudEFuYWx5c2lzLEZhY2VUcmFjayxGYWNlQW5hbHlzaXMsQWNjb21wYW55aW5nQW5hbHlzaXMsQWxhcm1BbmFseXNpcyxGcmVxdWVuY3lBbmFseXNpcyxGcmVxdWVuY3lBcHBlYXIsIEZhY2VDb2xsaXNpb25BbmFseXNpcyxcclxuICAgIENhckFuYWx5c2lzLE1hY0NyYXNoLEZhY2VNYWNDcmFzaCxNYWNDYXJDcmFzaCxcclxuICAgIC8vIE1hY0FsYXJtLE1hY1RyYWNrLE1hY0FjY29tcGFueSxNYWNGcmVxdWVuY3lcclxuXSBhcyBBcnJheTxJUm91dGVyQ29uZmlnPjsiXX0=
