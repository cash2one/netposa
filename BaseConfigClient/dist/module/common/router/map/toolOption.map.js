define(["require", "exports", "../enum/RouteKeyEnum"], function (require, exports, RouteKeyEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ToolOption = {
        key: RouteKeyEnum_1.RouteKeyEnum.ToolOption,
        url: '/toolOption',
        moduleName: '选项',
        controllerName: 'toolOptionController',
        controllerUrl: 'module/toolOption/main/main.controller',
        templateUrl: '/module/toolOption/main/main.html',
        controllerAs: 'toolOptionCtrl'
    };
    var MyCollect = {
        key: RouteKeyEnum_1.RouteKeyEnum.MyCollect,
        url: '/myCollect',
        moduleName: '我的收藏',
        controllerUrl: 'module/toolOption/myCollect/main.controller',
        views: {
            "toolOption": {
                controllerName: 'MyCollectController',
                controllerAs: 'myCollectCtrl',
                templateUrl: '/module/toolOption/myCollect/main.html'
            }
        },
        icon: 'suggestions',
        parent: RouteKeyEnum_1.RouteKeyEnum.ToolOption
    };
    var MyCheck = {
        key: RouteKeyEnum_1.RouteKeyEnum.MyCheck,
        url: '/myCheck',
        moduleName: '我的审核',
        controllerUrl: 'module/toolOption/myCheck/main.controller',
        views: {
            "toolOption": {
                controllerName: 'MyCheckController',
                controllerAs: 'myCheckCtrl',
                templateUrl: '/module/toolOption/myCheck/main.html'
            }
        },
        icon: 'suggestions',
        parent: RouteKeyEnum_1.RouteKeyEnum.ToolOption
    };
    var MyReport = {
        key: RouteKeyEnum_1.RouteKeyEnum.MyReport,
        url: '/myReport',
        moduleName: '我的报警',
        controllerUrl: 'module/toolOption/myReport/main.controller',
        views: {
            "toolOption": {
                controllerName: 'MyReportController',
                controllerAs: 'myReportCtrl',
                templateUrl: '/module/toolOption/myReport/main.html'
            }
        },
        icon: 'suggestions',
        parent: RouteKeyEnum_1.RouteKeyEnum.ToolOption
    };
    var Suggestions = {
        key: RouteKeyEnum_1.RouteKeyEnum.Suggestions,
        url: '/suggestions',
        moduleName: '意见反馈',
        controllerUrl: 'module/toolOption/suggestions/suggestions.controller',
        views: {
            "toolOption": {
                controllerName: 'suggestionsController',
                controllerAs: 'suggestionsCtrl',
                templateUrl: '/module/toolOption/suggestions/suggestions.html'
            }
        },
        icon: 'suggestions',
        parent: RouteKeyEnum_1.RouteKeyEnum.ToolOption
    };
    exports.ToolOptionMap = [
        ToolOption, MyCollect, MyCheck, MyReport, Suggestions
    ];
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3JvdXRlci9tYXAvdG9vbE9wdGlvbi5tYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBT0EsSUFBTSxVQUFVLEdBQWtCO1FBQzlCLEdBQUcsRUFBRSwyQkFBWSxDQUFDLFVBQVU7UUFDNUIsR0FBRyxFQUFFLGFBQWE7UUFDbEIsVUFBVSxFQUFFLElBQUk7UUFDaEIsY0FBYyxFQUFFLHNCQUFzQjtRQUN0QyxhQUFhLEVBQUUsd0NBQXdDO1FBQ3ZELFdBQVcsRUFBRSxtQ0FBbUM7UUFDaEQsWUFBWSxFQUFFLGdCQUFnQjtLQUNqQyxDQUFDO0lBbUJGLElBQU0sU0FBUyxHQUFrQjtRQUM3QixHQUFHLEVBQUUsMkJBQVksQ0FBQyxTQUFTO1FBQzNCLEdBQUcsRUFBRSxZQUFZO1FBQ2pCLFVBQVUsRUFBRSxNQUFNO1FBQ2xCLGFBQWEsRUFBRSw2Q0FBNkM7UUFDNUQsS0FBSyxFQUFFO1lBQ0gsWUFBWSxFQUFFO2dCQUNWLGNBQWMsRUFBRSxxQkFBcUI7Z0JBQ3JDLFlBQVksRUFBRSxlQUFlO2dCQUM3QixXQUFXLEVBQUUsd0NBQXdDO2FBQ3hEO1NBQ0o7UUFDRCxJQUFJLEVBQUUsYUFBYTtRQUNuQixNQUFNLEVBQUUsMkJBQVksQ0FBQyxVQUFVO0tBQ2xDLENBQUM7SUFFRixJQUFNLE9BQU8sR0FBa0I7UUFDM0IsR0FBRyxFQUFFLDJCQUFZLENBQUMsT0FBTztRQUN6QixHQUFHLEVBQUUsVUFBVTtRQUNmLFVBQVUsRUFBRSxNQUFNO1FBQ2xCLGFBQWEsRUFBRSwyQ0FBMkM7UUFDMUQsS0FBSyxFQUFFO1lBQ0gsWUFBWSxFQUFFO2dCQUNWLGNBQWMsRUFBRSxtQkFBbUI7Z0JBQ25DLFlBQVksRUFBRSxhQUFhO2dCQUMzQixXQUFXLEVBQUUsc0NBQXNDO2FBQ3REO1NBQ0o7UUFDRCxJQUFJLEVBQUUsYUFBYTtRQUNuQixNQUFNLEVBQUUsMkJBQVksQ0FBQyxVQUFVO0tBQ2xDLENBQUM7SUFFRixJQUFNLFFBQVEsR0FBa0I7UUFDNUIsR0FBRyxFQUFFLDJCQUFZLENBQUMsUUFBUTtRQUMxQixHQUFHLEVBQUUsV0FBVztRQUNoQixVQUFVLEVBQUUsTUFBTTtRQUNsQixhQUFhLEVBQUUsNENBQTRDO1FBQzNELEtBQUssRUFBRTtZQUNILFlBQVksRUFBRTtnQkFDVixjQUFjLEVBQUUsb0JBQW9CO2dCQUNwQyxZQUFZLEVBQUUsY0FBYztnQkFDNUIsV0FBVyxFQUFFLHVDQUF1QzthQUN2RDtTQUNKO1FBQ0QsSUFBSSxFQUFFLGFBQWE7UUFDbkIsTUFBTSxFQUFFLDJCQUFZLENBQUMsVUFBVTtLQUNsQyxDQUFDO0lBRUYsSUFBTSxXQUFXLEdBQWtCO1FBQy9CLEdBQUcsRUFBRSwyQkFBWSxDQUFDLFdBQVc7UUFDN0IsR0FBRyxFQUFFLGNBQWM7UUFDbkIsVUFBVSxFQUFFLE1BQU07UUFDbEIsYUFBYSxFQUFFLHNEQUFzRDtRQUNyRSxLQUFLLEVBQUU7WUFDSCxZQUFZLEVBQUU7Z0JBQ1YsY0FBYyxFQUFFLHVCQUF1QjtnQkFDdkMsWUFBWSxFQUFFLGlCQUFpQjtnQkFDL0IsV0FBVyxFQUFFLGlEQUFpRDthQUNqRTtTQUNKO1FBQ0QsSUFBSSxFQUFFLGFBQWE7UUFDbkIsTUFBTSxFQUFFLDJCQUFZLENBQUMsVUFBVTtLQUNsQyxDQUFDO0lBbUJXLFFBQUEsYUFBYSxHQUFHO1FBQ3pCLFVBQVUsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXO0tBQ2hDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9yb3V0ZXIvbWFwL3Rvb2xPcHRpb24ubWFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgdGogb24gMjAxNy83LzEuXHJcbiAqL1xyXG5pbXBvcnQge0lSb3V0ZXJDb25maWd9IGZyb20gXCIuLi9yb3V0ZXJcIjtcclxuaW1wb3J0IHtSb3V0ZUtleUVudW19IGZyb20gXCIuLi9lbnVtL1JvdXRlS2V5RW51bVwiO1xyXG5pbXBvcnQge0dyb3VwRW51bX0gZnJvbSBcIi4uL2VudW0vUm91dGVHcm91cEVudW1cIjtcclxuXHJcbmNvbnN0IFRvb2xPcHRpb246IElSb3V0ZXJDb25maWcgPSB7XHJcbiAgICBrZXk6IFJvdXRlS2V5RW51bS5Ub29sT3B0aW9uLFxyXG4gICAgdXJsOiAnL3Rvb2xPcHRpb24nLFxyXG4gICAgbW9kdWxlTmFtZTogJ+mAiemhuScsXHJcbiAgICBjb250cm9sbGVyTmFtZTogJ3Rvb2xPcHRpb25Db250cm9sbGVyJyxcclxuICAgIGNvbnRyb2xsZXJVcmw6ICdtb2R1bGUvdG9vbE9wdGlvbi9tYWluL21haW4uY29udHJvbGxlcicsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvdG9vbE9wdGlvbi9tYWluL21haW4uaHRtbCcsXHJcbiAgICBjb250cm9sbGVyQXM6ICd0b29sT3B0aW9uQ3RybCdcclxufTtcclxuXHJcbi8vIGNvbnN0IENvbXBhcmlzb246IElSb3V0ZXJDb25maWcgPSB7XHJcbi8vICAgICBrZXk6IFJvdXRlS2V5RW51bS5Db21wYXJpc29uLFxyXG4vLyAgICAgdXJsOiAnL2NvbXBhcmlzb24nLFxyXG4vLyAgICAgbW9kdWxlTmFtZTogJ+avlOWvuScsXHJcbi8vICAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL3Rvb2xPcHRpb24vY29tcGFyaXNvbi9jb21wYXJpc29uLmNvbnRyb2xsZXInLFxyXG4vLyAgICAgdmlld3M6IHtcclxuLy8gICAgICAgICBcInRvb2xPcHRpb25cIjoge1xyXG4vLyAgICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ2NvbXBhcmlzb25Db250cm9sbGVyJyxcclxuLy8gICAgICAgICAgICAgY29udHJvbGxlckFzOiAnY29tcGFyaXNvbkN0cmwnLFxyXG4vLyAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvdG9vbE9wdGlvbi9jb21wYXJpc29uL2NvbXBhcmlzb24uaHRtbCdcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9LFxyXG4vLyAgICAgaWNvbjogJ2NvbXBhcmlzb24nLFxyXG4vLyAgICAgcGFyZW50OiBSb3V0ZUtleUVudW0uVG9vbE9wdGlvblxyXG4vLyB9O1xyXG5cclxuXHJcbmNvbnN0IE15Q29sbGVjdDogSVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLk15Q29sbGVjdCxcclxuICAgIHVybDogJy9teUNvbGxlY3QnLFxyXG4gICAgbW9kdWxlTmFtZTogJ+aIkeeahOaUtuiXjycsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL3Rvb2xPcHRpb24vbXlDb2xsZWN0L21haW4uY29udHJvbGxlcicsXHJcbiAgICB2aWV3czoge1xyXG4gICAgICAgIFwidG9vbE9wdGlvblwiOiB7XHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAnTXlDb2xsZWN0Q29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ215Q29sbGVjdEN0cmwnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvdG9vbE9wdGlvbi9teUNvbGxlY3QvbWFpbi5odG1sJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBpY29uOiAnc3VnZ2VzdGlvbnMnLFxyXG4gICAgcGFyZW50OiBSb3V0ZUtleUVudW0uVG9vbE9wdGlvblxyXG59O1xyXG5cclxuY29uc3QgTXlDaGVjazogSVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLk15Q2hlY2ssXHJcbiAgICB1cmw6ICcvbXlDaGVjaycsXHJcbiAgICBtb2R1bGVOYW1lOiAn5oiR55qE5a6h5qC4JyxcclxuICAgIGNvbnRyb2xsZXJVcmw6ICdtb2R1bGUvdG9vbE9wdGlvbi9teUNoZWNrL21haW4uY29udHJvbGxlcicsXHJcbiAgICB2aWV3czoge1xyXG4gICAgICAgIFwidG9vbE9wdGlvblwiOiB7XHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAnTXlDaGVja0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdteUNoZWNrQ3RybCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS90b29sT3B0aW9uL215Q2hlY2svbWFpbi5odG1sJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBpY29uOiAnc3VnZ2VzdGlvbnMnLFxyXG4gICAgcGFyZW50OiBSb3V0ZUtleUVudW0uVG9vbE9wdGlvblxyXG59O1xyXG5cclxuY29uc3QgTXlSZXBvcnQ6IElSb3V0ZXJDb25maWcgPSB7XHJcbiAgICBrZXk6IFJvdXRlS2V5RW51bS5NeVJlcG9ydCxcclxuICAgIHVybDogJy9teVJlcG9ydCcsXHJcbiAgICBtb2R1bGVOYW1lOiAn5oiR55qE5oql6K2mJyxcclxuICAgIGNvbnRyb2xsZXJVcmw6ICdtb2R1bGUvdG9vbE9wdGlvbi9teVJlcG9ydC9tYWluLmNvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICBcInRvb2xPcHRpb25cIjoge1xyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ015UmVwb3J0Q29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ215UmVwb3J0Q3RybCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS90b29sT3B0aW9uL215UmVwb3J0L21haW4uaHRtbCdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaWNvbjogJ3N1Z2dlc3Rpb25zJyxcclxuICAgIHBhcmVudDogUm91dGVLZXlFbnVtLlRvb2xPcHRpb25cclxufTtcclxuXHJcbmNvbnN0IFN1Z2dlc3Rpb25zOiBJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uU3VnZ2VzdGlvbnMsXHJcbiAgICB1cmw6ICcvc3VnZ2VzdGlvbnMnLFxyXG4gICAgbW9kdWxlTmFtZTogJ+aEj+ingeWPjemmiCcsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL3Rvb2xPcHRpb24vc3VnZ2VzdGlvbnMvc3VnZ2VzdGlvbnMuY29udHJvbGxlcicsXHJcbiAgICB2aWV3czoge1xyXG4gICAgICAgIFwidG9vbE9wdGlvblwiOiB7XHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAnc3VnZ2VzdGlvbnNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnc3VnZ2VzdGlvbnNDdHJsJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL3Rvb2xPcHRpb24vc3VnZ2VzdGlvbnMvc3VnZ2VzdGlvbnMuaHRtbCdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaWNvbjogJ3N1Z2dlc3Rpb25zJyxcclxuICAgIHBhcmVudDogUm91dGVLZXlFbnVtLlRvb2xPcHRpb25cclxufTtcclxuXHJcbi8vIGNvbnN0IERvd25DZW50ZXI6IElSb3V0ZXJDb25maWcgPSB7XHJcbi8vICAgICBrZXk6IFJvdXRlS2V5RW51bS5Eb3duQ2VudGVyLFxyXG4vLyAgICAgdXJsOiAnL2Rvd25DZW50ZXInLFxyXG4vLyAgICAgbW9kdWxlTmFtZTogJ+S4i+i9veS4reW/gycsXHJcbi8vICAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL3Rvb2xPcHRpb24vZG93bkNlbnRlci9kb3duQ2VudGVyLmNvbnRyb2xsZXInLFxyXG4vLyAgICAgdmlld3M6IHtcclxuLy8gICAgICAgICBcInRvb2xPcHRpb25cIjoge1xyXG4vLyAgICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ2Rvd25DZW50ZXJDb250cm9sbGVyJyxcclxuLy8gICAgICAgICAgICAgY29udHJvbGxlckFzOiAnZG93bkNlbnRlckN0cmwnLFxyXG4vLyAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvdG9vbE9wdGlvbi9kb3duQ2VudGVyL2Rvd25DZW50ZXIuaHRtbCdcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9LFxyXG4vLyAgICAgaWNvbjogJ2Rvd25DZW50ZXInLFxyXG4vLyAgICAgcGFyZW50OiBSb3V0ZUtleUVudW0uVG9vbE9wdGlvblxyXG4vLyB9O1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBUb29sT3B0aW9uTWFwID0gW1xyXG4gICAgVG9vbE9wdGlvbiwgTXlDb2xsZWN0LCBNeUNoZWNrLCBNeVJlcG9ydCwgU3VnZ2VzdGlvbnNcclxuXSBhcyBBcnJheTxJUm91dGVyQ29uZmlnPjsiXX0=
