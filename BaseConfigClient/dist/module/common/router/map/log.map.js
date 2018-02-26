define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Log = {
        key: 'log',
        url: '/log',
        moduleName: '日志查询',
        controllerName: 'logMainController',
        controllerUrl: 'module/log/main/main.controller',
        templateUrl: '/module/log/main/main.html',
        isParent: true,
        redirectTo: 'log.pass',
        level: 0
    };
    var PassLog = {
        key: 'log.pass',
        url: '/pass',
        moduleName: '比对日志',
        controllerName: 'logPassController',
        controllerUrl: 'module/log/pass/pass.controller',
        views: {
            'log': {
                templateUrl: '/module/log/pass/pass.html',
                controllerName: 'logPassController'
            }
        },
        parent: 'log',
        index: 0
    };
    var PassPerson = {
        key: 'log.person',
        url: '/person',
        moduleName: '人员日志',
        controllerName: 'logPersonController',
        controllerUrl: 'module/log/person/person.controller',
        views: {
            'log': {
                templateUrl: '/module/log/person/person.html',
                controllerName: 'logPersonController'
            }
        },
        parent: 'log',
        index: 1
    };
    var PassAlarm = {
        key: 'log.alarm',
        url: '/alarm',
        moduleName: '报警日志',
        controllerName: 'logAlarmController',
        controllerUrl: 'module/log/alarm/alarm.controller',
        views: {
            'log': {
                templateUrl: '/module/log/alarm/alarm.html',
                controllerName: 'logAlarmController'
            }
        },
        parent: 'log',
        index: 2
    };
    exports.LogMap = [];
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3JvdXRlci9tYXAvbG9nLm1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFJQSxJQUFNLEdBQUcsR0FBRztRQUNSLEdBQUcsRUFBRSxLQUFLO1FBQ1YsR0FBRyxFQUFFLE1BQU07UUFDWCxVQUFVLEVBQUUsTUFBTTtRQUNsQixjQUFjLEVBQUUsbUJBQW1CO1FBQ25DLGFBQWEsRUFBRSxpQ0FBaUM7UUFDaEQsV0FBVyxFQUFFLDRCQUE0QjtRQUN6QyxRQUFRLEVBQUUsSUFBSTtRQUNkLFVBQVUsRUFBRSxVQUFVO1FBQ3RCLEtBQUssRUFBRSxDQUFDO0tBQ1gsQ0FBQztJQUVGLElBQU0sT0FBTyxHQUFHO1FBQ1osR0FBRyxFQUFFLFVBQVU7UUFDZixHQUFHLEVBQUUsT0FBTztRQUNaLFVBQVUsRUFBRSxNQUFNO1FBQ2xCLGNBQWMsRUFBRSxtQkFBbUI7UUFDbkMsYUFBYSxFQUFFLGlDQUFpQztRQUNoRCxLQUFLLEVBQUU7WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUFFLDRCQUE0QjtnQkFDekMsY0FBYyxFQUFFLG1CQUFtQjthQUN0QztTQUNKO1FBQ0QsTUFBTSxFQUFFLEtBQUs7UUFDYixLQUFLLEVBQUUsQ0FBQztLQUNYLENBQUM7SUFFRixJQUFNLFVBQVUsR0FBRztRQUNmLEdBQUcsRUFBRSxZQUFZO1FBQ2pCLEdBQUcsRUFBRSxTQUFTO1FBQ2QsVUFBVSxFQUFFLE1BQU07UUFDbEIsY0FBYyxFQUFFLHFCQUFxQjtRQUNyQyxhQUFhLEVBQUUscUNBQXFDO1FBQ3BELEtBQUssRUFBRTtZQUNILEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQUUsZ0NBQWdDO2dCQUM3QyxjQUFjLEVBQUUscUJBQXFCO2FBQ3hDO1NBQ0o7UUFDRCxNQUFNLEVBQUUsS0FBSztRQUNiLEtBQUssRUFBRSxDQUFDO0tBQ1gsQ0FBQztJQUVGLElBQU0sU0FBUyxHQUFHO1FBQ2QsR0FBRyxFQUFFLFdBQVc7UUFDaEIsR0FBRyxFQUFFLFFBQVE7UUFDYixVQUFVLEVBQUUsTUFBTTtRQUNsQixjQUFjLEVBQUUsb0JBQW9CO1FBQ3BDLGFBQWEsRUFBRSxtQ0FBbUM7UUFDbEQsS0FBSyxFQUFFO1lBQ0gsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFBRSw4QkFBOEI7Z0JBQzNDLGNBQWMsRUFBRSxvQkFBb0I7YUFDdkM7U0FDSjtRQUNELE1BQU0sRUFBRSxLQUFLO1FBQ2IsS0FBSyxFQUFFLENBQUM7S0FDWCxDQUFDO0lBRVcsUUFBQSxNQUFNLEdBQUcsRUFFRyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vcm91dGVyL21hcC9sb2cubWFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJUm91dGVyQ29uZmlnfSBmcm9tIFwiLi4vcm91dGVyXCI7XHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGRlbGwgb24gMjAxNy80LzE5LlxyXG4gKi9cclxuY29uc3QgTG9nID0ge1xyXG4gICAga2V5OiAnbG9nJyxcclxuICAgIHVybDogJy9sb2cnLFxyXG4gICAgbW9kdWxlTmFtZTogJ+aXpeW/l+afpeivoicsXHJcbiAgICBjb250cm9sbGVyTmFtZTogJ2xvZ01haW5Db250cm9sbGVyJyxcclxuICAgIGNvbnRyb2xsZXJVcmw6ICdtb2R1bGUvbG9nL21haW4vbWFpbi5jb250cm9sbGVyJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS9sb2cvbWFpbi9tYWluLmh0bWwnLFxyXG4gICAgaXNQYXJlbnQ6IHRydWUsXHJcbiAgICByZWRpcmVjdFRvOiAnbG9nLnBhc3MnLCAgLy8g5bGe5oCn5Y+q5piv5pqC5pe255qELCDlrp7pmYXlgLzkvJrlnKjku6PnoIHpgLvovpHkuK3ov5vooYzliqjmgIHosIPmlbRcclxuICAgIGxldmVsOiAwXHJcbn07XHJcblxyXG5jb25zdCBQYXNzTG9nID0ge1xyXG4gICAga2V5OiAnbG9nLnBhc3MnLFxyXG4gICAgdXJsOiAnL3Bhc3MnLFxyXG4gICAgbW9kdWxlTmFtZTogJ+avlOWvueaXpeW/lycsXHJcbiAgICBjb250cm9sbGVyTmFtZTogJ2xvZ1Bhc3NDb250cm9sbGVyJyxcclxuICAgIGNvbnRyb2xsZXJVcmw6ICdtb2R1bGUvbG9nL3Bhc3MvcGFzcy5jb250cm9sbGVyJyxcclxuICAgIHZpZXdzOiB7XHJcbiAgICAgICAgJ2xvZyc6IHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL2xvZy9wYXNzL3Bhc3MuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAnbG9nUGFzc0NvbnRyb2xsZXInXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBhcmVudDogJ2xvZycsXHJcbiAgICBpbmRleDogMFxyXG59O1xyXG5cclxuY29uc3QgUGFzc1BlcnNvbiA9IHtcclxuICAgIGtleTogJ2xvZy5wZXJzb24nLFxyXG4gICAgdXJsOiAnL3BlcnNvbicsXHJcbiAgICBtb2R1bGVOYW1lOiAn5Lq65ZGY5pel5b+XJyxcclxuICAgIGNvbnRyb2xsZXJOYW1lOiAnbG9nUGVyc29uQ29udHJvbGxlcicsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL2xvZy9wZXJzb24vcGVyc29uLmNvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICAnbG9nJzoge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvbG9nL3BlcnNvbi9wZXJzb24uaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAnbG9nUGVyc29uQ29udHJvbGxlcidcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGFyZW50OiAnbG9nJyxcclxuICAgIGluZGV4OiAxXHJcbn07XHJcblxyXG5jb25zdCBQYXNzQWxhcm0gPSB7XHJcbiAgICBrZXk6ICdsb2cuYWxhcm0nLFxyXG4gICAgdXJsOiAnL2FsYXJtJyxcclxuICAgIG1vZHVsZU5hbWU6ICfmiqXorabml6Xlv5cnLFxyXG4gICAgY29udHJvbGxlck5hbWU6ICdsb2dBbGFybUNvbnRyb2xsZXInLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9sb2cvYWxhcm0vYWxhcm0uY29udHJvbGxlcicsXHJcbiAgICB2aWV3czoge1xyXG4gICAgICAgICdsb2cnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS9sb2cvYWxhcm0vYWxhcm0uaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAnbG9nQWxhcm1Db250cm9sbGVyJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwYXJlbnQ6ICdsb2cnLFxyXG4gICAgaW5kZXg6IDJcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBMb2dNYXAgPSBbXHJcbiAgICAvL0xvZywgUGFzc0xvZywgUGFzc1BlcnNvbiwgUGFzc0FsYXJtXHJcbl0gYXMgQXJyYXk8SVJvdXRlckNvbmZpZz47Il19
