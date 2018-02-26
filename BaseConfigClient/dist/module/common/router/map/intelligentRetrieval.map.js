define(["require", "exports", "../enum/RouteKeyEnum"], function (require, exports, RouteKeyEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IntelligentRetrieval = {
        key: RouteKeyEnum_1.RouteKeyEnum.IntelligentRetrieval,
        url: '/intelligentretrieval',
        moduleName: '智能检索',
        controllerName: 'intelligentRetrievalController',
        controllerUrl: 'module/intelligentRetrieval/main/main.controller',
        controllerAs: 'intelligentRetrievalCtrl',
        templateUrl: '/module/intelligentRetrieval/main/main.html',
        redirectTo: RouteKeyEnum_1.RouteKeyEnum.TrailAnalysis,
    };
    var TrailAnalysis = {
        key: RouteKeyEnum_1.RouteKeyEnum.TrailAnalysis,
        url: '/trailanalysis',
        moduleName: '轨迹分析',
        controllerName: 'trailAnalysisController',
        controllerUrl: 'module/intelligentRetrieval/trailAnalysis/trailAnalysis.controller',
        views: {
            'intelligentretrieval': {
                templateUrl: '/module/intelligentRetrieval/trailAnalysis/trailAnalysis.html',
                controllerName: 'trailAnalysisController',
                controllerAs: 'trailAnalysisCtrl'
            }
        },
        parent: RouteKeyEnum_1.RouteKeyEnum.IntelligentRetrieval,
        icon: 'trailAnalysis'
    };
    var FaceRetrieval = {
        key: RouteKeyEnum_1.RouteKeyEnum.FaceRetrieval,
        url: '/faceretrieval',
        moduleName: '人脸检索',
        controllerName: 'faceRetrievalController',
        controllerUrl: 'module/intelligentRetrieval/faceRetrieval/faceRetrieval.controller',
        views: {
            'intelligentretrieval': {
                templateUrl: '/module/intelligentRetrieval/faceRetrieval/faceRetrieval.html',
                controllerName: 'faceRetrievalController',
                controllerAs: 'faceRetrievalCtrl'
            }
        },
        parent: RouteKeyEnum_1.RouteKeyEnum.IntelligentRetrieval,
        icon: 'faceRetrieval'
    };
    var AlarmRetrieval = {
        key: RouteKeyEnum_1.RouteKeyEnum.AlarmRetrieval,
        url: '/alarmretrieval',
        moduleName: '报警检索',
        controllerName: 'alarmRetrievalController',
        controllerUrl: 'module/intelligentRetrieval/alarmRetrieval/alarmRetrieval.controller',
        views: {
            'intelligentretrieval': {
                templateUrl: '/module/intelligentRetrieval/alarmRetrieval/alarmRetrieval.html',
                controllerName: 'alarmRetrievalController',
                controllerAs: 'alarmRetrievalCtrl'
            }
        },
        parent: RouteKeyEnum_1.RouteKeyEnum.IntelligentRetrieval,
        icon: 'alarmRetrieval'
    };
    var RetrievalRecord = {
        key: RouteKeyEnum_1.RouteKeyEnum.RetrievalRecord,
        url: '/retrievalrecord',
        moduleName: '检索记录',
        controllerName: 'retrievalRecordController',
        controllerUrl: 'module/intelligentRetrieval/retrievalRecord/retrievalRecord.controller',
        views: {
            'intelligentretrieval': {
                templateUrl: '/module/intelligentRetrieval/retrievalRecord/retrievalRecord.html',
                controllerName: 'retrievalRecordController',
                controllerAs: 'retrievalRecordCtrl'
            }
        },
        parent: RouteKeyEnum_1.RouteKeyEnum.IntelligentRetrieval,
        icon: 'retrievalRecord'
    };
    exports.IntelligentRetrievalMap = [
        IntelligentRetrieval, TrailAnalysis, FaceRetrieval, AlarmRetrieval, RetrievalRecord
    ];
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3JvdXRlci9tYXAvaW50ZWxsaWdlbnRSZXRyaWV2YWwubWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU9BLElBQU0sb0JBQW9CLEdBQWlCO1FBQ3ZDLEdBQUcsRUFBRSwyQkFBWSxDQUFDLG9CQUFvQjtRQUN0QyxHQUFHLEVBQUUsdUJBQXVCO1FBQzVCLFVBQVUsRUFBRSxNQUFNO1FBQ2xCLGNBQWMsRUFBRSxnQ0FBZ0M7UUFDaEQsYUFBYSxFQUFFLGtEQUFrRDtRQUNqRSxZQUFZLEVBQUUsMEJBQTBCO1FBQ3hDLFdBQVcsRUFBRSw2Q0FBNkM7UUFDMUQsVUFBVSxFQUFFLDJCQUFZLENBQUMsYUFBYTtLQUV6QyxDQUFDO0lBRUYsSUFBTSxhQUFhLEdBQWlCO1FBQ2hDLEdBQUcsRUFBRSwyQkFBWSxDQUFDLGFBQWE7UUFDL0IsR0FBRyxFQUFFLGdCQUFnQjtRQUNyQixVQUFVLEVBQUUsTUFBTTtRQUNsQixjQUFjLEVBQUUseUJBQXlCO1FBQ3pDLGFBQWEsRUFBRSxvRUFBb0U7UUFDbkYsS0FBSyxFQUFFO1lBQ0gsc0JBQXNCLEVBQUU7Z0JBQ3BCLFdBQVcsRUFBRSwrREFBK0Q7Z0JBQzVFLGNBQWMsRUFBRSx5QkFBeUI7Z0JBQ3pDLFlBQVksRUFBRSxtQkFBbUI7YUFDcEM7U0FDSjtRQUNELE1BQU0sRUFBRSwyQkFBWSxDQUFDLG9CQUFvQjtRQUN6QyxJQUFJLEVBQUUsZUFBZTtLQUN4QixDQUFDO0lBRUYsSUFBTSxhQUFhLEdBQWlCO1FBQ2hDLEdBQUcsRUFBRSwyQkFBWSxDQUFDLGFBQWE7UUFDL0IsR0FBRyxFQUFFLGdCQUFnQjtRQUNyQixVQUFVLEVBQUUsTUFBTTtRQUNsQixjQUFjLEVBQUUseUJBQXlCO1FBQ3pDLGFBQWEsRUFBRSxvRUFBb0U7UUFDbkYsS0FBSyxFQUFFO1lBQ0gsc0JBQXNCLEVBQUU7Z0JBQ3BCLFdBQVcsRUFBRSwrREFBK0Q7Z0JBQzVFLGNBQWMsRUFBRSx5QkFBeUI7Z0JBQ3pDLFlBQVksRUFBRSxtQkFBbUI7YUFDcEM7U0FDSjtRQUNELE1BQU0sRUFBRSwyQkFBWSxDQUFDLG9CQUFvQjtRQUN6QyxJQUFJLEVBQUUsZUFBZTtLQUN4QixDQUFDO0lBRUYsSUFBTSxjQUFjLEdBQWlCO1FBQ2pDLEdBQUcsRUFBRSwyQkFBWSxDQUFDLGNBQWM7UUFDaEMsR0FBRyxFQUFFLGlCQUFpQjtRQUN0QixVQUFVLEVBQUUsTUFBTTtRQUNsQixjQUFjLEVBQUUsMEJBQTBCO1FBQzFDLGFBQWEsRUFBRSxzRUFBc0U7UUFDckYsS0FBSyxFQUFFO1lBQ0gsc0JBQXNCLEVBQUU7Z0JBQ3BCLFdBQVcsRUFBRSxpRUFBaUU7Z0JBQzlFLGNBQWMsRUFBRSwwQkFBMEI7Z0JBQzFDLFlBQVksRUFBRSxvQkFBb0I7YUFDckM7U0FDSjtRQUNELE1BQU0sRUFBRSwyQkFBWSxDQUFDLG9CQUFvQjtRQUN6QyxJQUFJLEVBQUUsZ0JBQWdCO0tBQ3pCLENBQUM7SUFFRixJQUFNLGVBQWUsR0FBaUI7UUFDbEMsR0FBRyxFQUFFLDJCQUFZLENBQUMsZUFBZTtRQUNqQyxHQUFHLEVBQUUsa0JBQWtCO1FBQ3ZCLFVBQVUsRUFBRSxNQUFNO1FBQ2xCLGNBQWMsRUFBRSwyQkFBMkI7UUFDM0MsYUFBYSxFQUFFLHdFQUF3RTtRQUN2RixLQUFLLEVBQUU7WUFDSCxzQkFBc0IsRUFBRTtnQkFDcEIsV0FBVyxFQUFFLG1FQUFtRTtnQkFDaEYsY0FBYyxFQUFFLDJCQUEyQjtnQkFDM0MsWUFBWSxFQUFFLHFCQUFxQjthQUN0QztTQUNKO1FBQ0QsTUFBTSxFQUFFLDJCQUFZLENBQUMsb0JBQW9CO1FBQ3pDLElBQUksRUFBRSxpQkFBaUI7S0FDMUIsQ0FBQztJQUVXLFFBQUEsdUJBQXVCLEdBQUc7UUFDbkMsb0JBQW9CLEVBQUMsYUFBYSxFQUFDLGFBQWEsRUFBQyxjQUFjLEVBQUMsZUFBZTtLQUMxRCxDQUFDIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vcm91dGVyL21hcC9pbnRlbGxpZ2VudFJldHJpZXZhbC5tYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBkZWxsIG9uIDIwMTcvNS8zMS5cclxuICovXHJcbmltcG9ydCB7SVJvdXRlckNvbmZpZ30gZnJvbSBcIi4uL3JvdXRlclwiO1xyXG5pbXBvcnQge1JvdXRlS2V5RW51bX0gZnJvbSBcIi4uL2VudW0vUm91dGVLZXlFbnVtXCI7XHJcbmltcG9ydCB7R3JvdXBFbnVtfSBmcm9tIFwiLi4vZW51bS9Sb3V0ZUdyb3VwRW51bVwiO1xyXG5cclxuY29uc3QgSW50ZWxsaWdlbnRSZXRyaWV2YWw6SVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLkludGVsbGlnZW50UmV0cmlldmFsLFxyXG4gICAgdXJsOiAnL2ludGVsbGlnZW50cmV0cmlldmFsJyxcclxuICAgIG1vZHVsZU5hbWU6ICfmmbrog73mo4DntKInLFxyXG4gICAgY29udHJvbGxlck5hbWU6ICdpbnRlbGxpZ2VudFJldHJpZXZhbENvbnRyb2xsZXInLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9pbnRlbGxpZ2VudFJldHJpZXZhbC9tYWluL21haW4uY29udHJvbGxlcicsXHJcbiAgICBjb250cm9sbGVyQXM6ICdpbnRlbGxpZ2VudFJldHJpZXZhbEN0cmwnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL2ludGVsbGlnZW50UmV0cmlldmFsL21haW4vbWFpbi5odG1sJyxcclxuICAgIHJlZGlyZWN0VG86IFJvdXRlS2V5RW51bS5UcmFpbEFuYWx5c2lzLFxyXG4gICAgLy9oYXNDaGlsZFJvdXRlRG93blNlbGVjdDogdHJ1ZVxyXG59O1xyXG5cclxuY29uc3QgVHJhaWxBbmFseXNpczpJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uVHJhaWxBbmFseXNpcyxcclxuICAgIHVybDogJy90cmFpbGFuYWx5c2lzJyxcclxuICAgIG1vZHVsZU5hbWU6ICfovajov7nliIbmnpAnLFxyXG4gICAgY29udHJvbGxlck5hbWU6ICd0cmFpbEFuYWx5c2lzQ29udHJvbGxlcicsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL2ludGVsbGlnZW50UmV0cmlldmFsL3RyYWlsQW5hbHlzaXMvdHJhaWxBbmFseXNpcy5jb250cm9sbGVyJyxcclxuICAgIHZpZXdzOiB7XHJcbiAgICAgICAgJ2ludGVsbGlnZW50cmV0cmlldmFsJzoge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvaW50ZWxsaWdlbnRSZXRyaWV2YWwvdHJhaWxBbmFseXNpcy90cmFpbEFuYWx5c2lzLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ3RyYWlsQW5hbHlzaXNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndHJhaWxBbmFseXNpc0N0cmwnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBhcmVudDogUm91dGVLZXlFbnVtLkludGVsbGlnZW50UmV0cmlldmFsLFxyXG4gICAgaWNvbjogJ3RyYWlsQW5hbHlzaXMnXHJcbn07XHJcblxyXG5jb25zdCBGYWNlUmV0cmlldmFsOklSb3V0ZXJDb25maWcgPSB7XHJcbiAgICBrZXk6IFJvdXRlS2V5RW51bS5GYWNlUmV0cmlldmFsLFxyXG4gICAgdXJsOiAnL2ZhY2VyZXRyaWV2YWwnLFxyXG4gICAgbW9kdWxlTmFtZTogJ+S6uuiEuOajgOe0oicsXHJcbiAgICBjb250cm9sbGVyTmFtZTogJ2ZhY2VSZXRyaWV2YWxDb250cm9sbGVyJyxcclxuICAgIGNvbnRyb2xsZXJVcmw6ICdtb2R1bGUvaW50ZWxsaWdlbnRSZXRyaWV2YWwvZmFjZVJldHJpZXZhbC9mYWNlUmV0cmlldmFsLmNvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICAnaW50ZWxsaWdlbnRyZXRyaWV2YWwnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS9pbnRlbGxpZ2VudFJldHJpZXZhbC9mYWNlUmV0cmlldmFsL2ZhY2VSZXRyaWV2YWwuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAnZmFjZVJldHJpZXZhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdmYWNlUmV0cmlldmFsQ3RybCdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGFyZW50OiBSb3V0ZUtleUVudW0uSW50ZWxsaWdlbnRSZXRyaWV2YWwsXHJcbiAgICBpY29uOiAnZmFjZVJldHJpZXZhbCdcclxufTtcclxuXHJcbmNvbnN0IEFsYXJtUmV0cmlldmFsOklSb3V0ZXJDb25maWcgPSB7XHJcbiAgICBrZXk6IFJvdXRlS2V5RW51bS5BbGFybVJldHJpZXZhbCxcclxuICAgIHVybDogJy9hbGFybXJldHJpZXZhbCcsXHJcbiAgICBtb2R1bGVOYW1lOiAn5oql6K2m5qOA57SiJyxcclxuICAgIGNvbnRyb2xsZXJOYW1lOiAnYWxhcm1SZXRyaWV2YWxDb250cm9sbGVyJyxcclxuICAgIGNvbnRyb2xsZXJVcmw6ICdtb2R1bGUvaW50ZWxsaWdlbnRSZXRyaWV2YWwvYWxhcm1SZXRyaWV2YWwvYWxhcm1SZXRyaWV2YWwuY29udHJvbGxlcicsXHJcbiAgICB2aWV3czoge1xyXG4gICAgICAgICdpbnRlbGxpZ2VudHJldHJpZXZhbCc6IHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL2ludGVsbGlnZW50UmV0cmlldmFsL2FsYXJtUmV0cmlldmFsL2FsYXJtUmV0cmlldmFsLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ2FsYXJtUmV0cmlldmFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2FsYXJtUmV0cmlldmFsQ3RybCdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGFyZW50OiBSb3V0ZUtleUVudW0uSW50ZWxsaWdlbnRSZXRyaWV2YWwsXHJcbiAgICBpY29uOiAnYWxhcm1SZXRyaWV2YWwnXHJcbn07XHJcblxyXG5jb25zdCBSZXRyaWV2YWxSZWNvcmQ6SVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLlJldHJpZXZhbFJlY29yZCxcclxuICAgIHVybDogJy9yZXRyaWV2YWxyZWNvcmQnLFxyXG4gICAgbW9kdWxlTmFtZTogJ+ajgOe0ouiusOW9lScsXHJcbiAgICBjb250cm9sbGVyTmFtZTogJ3JldHJpZXZhbFJlY29yZENvbnRyb2xsZXInLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9pbnRlbGxpZ2VudFJldHJpZXZhbC9yZXRyaWV2YWxSZWNvcmQvcmV0cmlldmFsUmVjb3JkLmNvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICAnaW50ZWxsaWdlbnRyZXRyaWV2YWwnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS9pbnRlbGxpZ2VudFJldHJpZXZhbC9yZXRyaWV2YWxSZWNvcmQvcmV0cmlldmFsUmVjb3JkLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ3JldHJpZXZhbFJlY29yZENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdyZXRyaWV2YWxSZWNvcmRDdHJsJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5JbnRlbGxpZ2VudFJldHJpZXZhbCxcclxuICAgIGljb246ICdyZXRyaWV2YWxSZWNvcmQnXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgSW50ZWxsaWdlbnRSZXRyaWV2YWxNYXAgPSBbXHJcbiAgICBJbnRlbGxpZ2VudFJldHJpZXZhbCxUcmFpbEFuYWx5c2lzLEZhY2VSZXRyaWV2YWwsQWxhcm1SZXRyaWV2YWwsUmV0cmlldmFsUmVjb3JkXHJcbl0gYXMgQXJyYXk8SVJvdXRlckNvbmZpZz47Il19
