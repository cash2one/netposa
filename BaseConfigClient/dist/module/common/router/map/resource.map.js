define(["require", "exports", "../enum/RouteKeyEnum", "../enum/RouteGroupEnum"], function (require, exports, RouteKeyEnum_1, RouteGroupEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ResourceRoute = {
        key: RouteKeyEnum_1.RouteKeyEnum.Resource,
        url: '/resource',
        moduleName: 'DP_RESOURCE_01',
        controllerName: 'resourceController',
        controllerUrl: 'module/resources/resources.controller',
        controllerAs: 'resourceCtrl',
        templateUrl: '/module/resources/resources.html',
        redirectTo: RouteKeyEnum_1.RouteKeyEnum.ResourceAll
    };
    var ResourceRouteAll = {
        isLocal: true,
        key: RouteKeyEnum_1.RouteKeyEnum.ResourceAll,
        url: '/ALL',
        moduleName: 'DP_RESOURCE_ALL',
        controllerUrl: 'module/resources/chart/allResource.controller',
        views: {
            "resource": {
                controllerName: 'ResourceChartController',
                controllerAs: 'allResourceCtrl',
                templateUrl: '/module/resources/chart/allResource.html',
            }
        },
        group: RouteGroupEnum_1.GroupEnum.Resource,
        parent: RouteKeyEnum_1.RouteKeyEnum.Resource
    };
    var ResourceRouteCar = {
        isLocal: true,
        key: RouteKeyEnum_1.RouteKeyEnum.ResourceCar,
        url: '/Vehicle',
        moduleName: 'DP_RESOURCE_CAR',
        controllerUrl: 'module/resources/chart/carResource.controller',
        views: {
            "resource": {
                controllerName: 'carResourceController',
                controllerAs: 'carResourceCtrl',
                templateUrl: '/module/resources/chart/carResource.html',
            }
        },
        group: RouteGroupEnum_1.GroupEnum.Resource,
        parent: RouteKeyEnum_1.RouteKeyEnum.Resource
    };
    var ResourceRoutePerson = {
        isLocal: true,
        key: RouteKeyEnum_1.RouteKeyEnum.ResourcePerson,
        url: '/Face',
        moduleName: 'DP_RESOURCE_PERSON',
        controllerUrl: 'module/resources/chart/personResource.controller',
        views: {
            "resource": {
                controllerName: 'personResourceController',
                controllerAs: 'personResourceCtrl',
                templateUrl: '/module/resources/chart/personResource.html',
            }
        },
        group: RouteGroupEnum_1.GroupEnum.Resource,
        parent: RouteKeyEnum_1.RouteKeyEnum.Resource
    };
    var ResourceRouteWifi = {
        isLocal: true,
        key: RouteKeyEnum_1.RouteKeyEnum.ResourceWifi,
        url: '/WiFi',
        moduleName: 'DP_RESOURCE_WIFI',
        controllerUrl: 'module/resources/chart/wifiResource.controller',
        views: {
            "resource": {
                controllerName: 'wifiResourceController',
                controllerAs: 'wifiResourceCtrl',
                templateUrl: '/module/resources/chart/wifiResource.html',
            }
        },
        group: RouteGroupEnum_1.GroupEnum.Resource,
        parent: RouteKeyEnum_1.RouteKeyEnum.Resource
    };
    var ResourceRouteEle = {
        isLocal: true,
        key: RouteKeyEnum_1.RouteKeyEnum.ResourceEle,
        url: '/EFENCE',
        moduleName: 'DP_RESOURCE_ELE',
        controllerUrl: 'module/resources/chart/EFResource.controller',
        views: {
            "resource": {
                controllerName: 'EFResourceController',
                controllerAs: 'EFResourceCtrl',
                templateUrl: '/module/resources/chart/EFResource.html',
            }
        },
        group: RouteGroupEnum_1.GroupEnum.Resource,
        parent: RouteKeyEnum_1.RouteKeyEnum.Resource
    };
    exports.ResourceMap = [ResourceRoute, ResourceRouteAll, ResourceRouteCar, ResourceRoutePerson, ResourceRouteWifi, ResourceRouteEle];
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3JvdXRlci9tYXAvcmVzb3VyY2UubWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUlBLElBQU0sYUFBYSxHQUFrQjtRQUNqQyxHQUFHLEVBQUUsMkJBQVksQ0FBQyxRQUFRO1FBQzFCLEdBQUcsRUFBRSxXQUFXO1FBQ2hCLFVBQVUsRUFBRSxnQkFBZ0I7UUFDNUIsY0FBYyxFQUFFLG9CQUFvQjtRQUNwQyxhQUFhLEVBQUUsdUNBQXVDO1FBQ3RELFlBQVksRUFBRSxjQUFjO1FBQzVCLFdBQVcsRUFBRSxrQ0FBa0M7UUFDL0MsVUFBVSxFQUFFLDJCQUFZLENBQUMsV0FBVztLQUN2QyxDQUFDO0lBR0YsSUFBTSxnQkFBZ0IsR0FBa0I7UUFDcEMsT0FBTyxFQUFFLElBQUk7UUFDYixHQUFHLEVBQUUsMkJBQVksQ0FBQyxXQUFXO1FBQzdCLEdBQUcsRUFBRSxNQUFNO1FBQ1gsVUFBVSxFQUFFLGlCQUFpQjtRQUM3QixhQUFhLEVBQUUsK0NBQStDO1FBQzlELEtBQUssRUFBRTtZQUNILFVBQVUsRUFBRTtnQkFDUixjQUFjLEVBQUUseUJBQXlCO2dCQUN6QyxZQUFZLEVBQUUsaUJBQWlCO2dCQUMvQixXQUFXLEVBQUUsMENBQTBDO2FBQzFEO1NBQ0o7UUFDRCxLQUFLLEVBQUUsMEJBQVMsQ0FBQyxRQUFRO1FBQ3pCLE1BQU0sRUFBRSwyQkFBWSxDQUFDLFFBQVE7S0FDaEMsQ0FBQztJQUVGLElBQU0sZ0JBQWdCLEdBQWtCO1FBQ3BDLE9BQU8sRUFBRSxJQUFJO1FBQ2IsR0FBRyxFQUFFLDJCQUFZLENBQUMsV0FBVztRQUM3QixHQUFHLEVBQUUsVUFBVTtRQUNmLFVBQVUsRUFBRSxpQkFBaUI7UUFDN0IsYUFBYSxFQUFFLCtDQUErQztRQUM5RCxLQUFLLEVBQUU7WUFDSCxVQUFVLEVBQUU7Z0JBQ1IsY0FBYyxFQUFFLHVCQUF1QjtnQkFDdkMsWUFBWSxFQUFFLGlCQUFpQjtnQkFDL0IsV0FBVyxFQUFFLDBDQUEwQzthQUMxRDtTQUNKO1FBQ0QsS0FBSyxFQUFFLDBCQUFTLENBQUMsUUFBUTtRQUN6QixNQUFNLEVBQUUsMkJBQVksQ0FBQyxRQUFRO0tBQ2hDLENBQUM7SUFHRixJQUFNLG1CQUFtQixHQUFrQjtRQUN2QyxPQUFPLEVBQUUsSUFBSTtRQUNiLEdBQUcsRUFBRSwyQkFBWSxDQUFDLGNBQWM7UUFDaEMsR0FBRyxFQUFFLE9BQU87UUFDWixVQUFVLEVBQUUsb0JBQW9CO1FBQ2hDLGFBQWEsRUFBRSxrREFBa0Q7UUFDakUsS0FBSyxFQUFFO1lBQ0gsVUFBVSxFQUFFO2dCQUNSLGNBQWMsRUFBRSwwQkFBMEI7Z0JBQzFDLFlBQVksRUFBRSxvQkFBb0I7Z0JBQ2xDLFdBQVcsRUFBRSw2Q0FBNkM7YUFDN0Q7U0FDSjtRQUNELEtBQUssRUFBRSwwQkFBUyxDQUFDLFFBQVE7UUFDekIsTUFBTSxFQUFFLDJCQUFZLENBQUMsUUFBUTtLQUNoQyxDQUFDO0lBR0YsSUFBTSxpQkFBaUIsR0FBa0I7UUFDckMsT0FBTyxFQUFFLElBQUk7UUFDYixHQUFHLEVBQUUsMkJBQVksQ0FBQyxZQUFZO1FBQzlCLEdBQUcsRUFBRSxPQUFPO1FBQ1osVUFBVSxFQUFFLGtCQUFrQjtRQUM5QixhQUFhLEVBQUUsZ0RBQWdEO1FBQy9ELEtBQUssRUFBRTtZQUNILFVBQVUsRUFBRTtnQkFDUixjQUFjLEVBQUUsd0JBQXdCO2dCQUN4QyxZQUFZLEVBQUUsa0JBQWtCO2dCQUNoQyxXQUFXLEVBQUUsMkNBQTJDO2FBQzNEO1NBQ0o7UUFDRCxLQUFLLEVBQUUsMEJBQVMsQ0FBQyxRQUFRO1FBQ3pCLE1BQU0sRUFBRSwyQkFBWSxDQUFDLFFBQVE7S0FDaEMsQ0FBQztJQUdGLElBQU0sZ0JBQWdCLEdBQWtCO1FBQ3BDLE9BQU8sRUFBRSxJQUFJO1FBQ2IsR0FBRyxFQUFFLDJCQUFZLENBQUMsV0FBVztRQUM3QixHQUFHLEVBQUUsU0FBUztRQUNkLFVBQVUsRUFBRSxpQkFBaUI7UUFDN0IsYUFBYSxFQUFFLDhDQUE4QztRQUM3RCxLQUFLLEVBQUU7WUFDSCxVQUFVLEVBQUU7Z0JBQ1IsY0FBYyxFQUFFLHNCQUFzQjtnQkFDdEMsWUFBWSxFQUFFLGdCQUFnQjtnQkFDOUIsV0FBVyxFQUFFLHlDQUF5QzthQUN6RDtTQUNKO1FBQ0QsS0FBSyxFQUFFLDBCQUFTLENBQUMsUUFBUTtRQUN6QixNQUFNLEVBQUUsMkJBQVksQ0FBQyxRQUFRO0tBQ2hDLENBQUM7SUFHVyxRQUFBLFdBQVcsR0FBRyxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBeUIsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3JvdXRlci9tYXAvcmVzb3VyY2UubWFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVJvdXRlckNvbmZpZyB9IGZyb20gJy4uL3JvdXRlcic7XHJcbmltcG9ydCB7IFJvdXRlS2V5RW51bSB9IGZyb20gJy4uL2VudW0vUm91dGVLZXlFbnVtJztcclxuaW1wb3J0IHsgR3JvdXBFbnVtLCBNYWludGFpbkdyb3VwRW51bSB9IGZyb20gXCIuLi9lbnVtL1JvdXRlR3JvdXBFbnVtXCI7XHJcblxyXG5jb25zdCBSZXNvdXJjZVJvdXRlOiBJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uUmVzb3VyY2UsXHJcbiAgICB1cmw6ICcvcmVzb3VyY2UnLFxyXG4gICAgbW9kdWxlTmFtZTogJ0RQX1JFU09VUkNFXzAxJyxcclxuICAgIGNvbnRyb2xsZXJOYW1lOiAncmVzb3VyY2VDb250cm9sbGVyJyxcclxuICAgIGNvbnRyb2xsZXJVcmw6ICdtb2R1bGUvcmVzb3VyY2VzL3Jlc291cmNlcy5jb250cm9sbGVyJyxcclxuICAgIGNvbnRyb2xsZXJBczogJ3Jlc291cmNlQ3RybCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvcmVzb3VyY2VzL3Jlc291cmNlcy5odG1sJyxcclxuICAgIHJlZGlyZWN0VG86IFJvdXRlS2V5RW51bS5SZXNvdXJjZUFsbFxyXG59O1xyXG5cclxuLy8gYWxsXHJcbmNvbnN0IFJlc291cmNlUm91dGVBbGw6IElSb3V0ZXJDb25maWcgPSB7XHJcbiAgICBpc0xvY2FsOiB0cnVlLFxyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uUmVzb3VyY2VBbGwsXHJcbiAgICB1cmw6ICcvQUxMJyxcclxuICAgIG1vZHVsZU5hbWU6ICdEUF9SRVNPVVJDRV9BTEwnLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9yZXNvdXJjZXMvY2hhcnQvYWxsUmVzb3VyY2UuY29udHJvbGxlcicsXHJcbiAgICB2aWV3czoge1xyXG4gICAgICAgIFwicmVzb3VyY2VcIjoge1xyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ1Jlc291cmNlQ2hhcnRDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnYWxsUmVzb3VyY2VDdHJsJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL3Jlc291cmNlcy9jaGFydC9hbGxSZXNvdXJjZS5odG1sJyxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ3JvdXA6IEdyb3VwRW51bS5SZXNvdXJjZSxcclxuICAgIHBhcmVudDogUm91dGVLZXlFbnVtLlJlc291cmNlXHJcbn07XHJcbi8vIGNhclxyXG5jb25zdCBSZXNvdXJjZVJvdXRlQ2FyOiBJUm91dGVyQ29uZmlnID0ge1xyXG4gICAgaXNMb2NhbDogdHJ1ZSxcclxuICAgIGtleTogUm91dGVLZXlFbnVtLlJlc291cmNlQ2FyLFxyXG4gICAgdXJsOiAnL1ZlaGljbGUnLFxyXG4gICAgbW9kdWxlTmFtZTogJ0RQX1JFU09VUkNFX0NBUicsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL3Jlc291cmNlcy9jaGFydC9jYXJSZXNvdXJjZS5jb250cm9sbGVyJyxcclxuICAgIHZpZXdzOiB7XHJcbiAgICAgICAgXCJyZXNvdXJjZVwiOiB7XHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAnY2FyUmVzb3VyY2VDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnY2FyUmVzb3VyY2VDdHJsJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL3Jlc291cmNlcy9jaGFydC9jYXJSZXNvdXJjZS5odG1sJyxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ3JvdXA6IEdyb3VwRW51bS5SZXNvdXJjZSxcclxuICAgIHBhcmVudDogUm91dGVLZXlFbnVtLlJlc291cmNlXHJcbn07XHJcblxyXG4vLyBwZXJzb25cclxuY29uc3QgUmVzb3VyY2VSb3V0ZVBlcnNvbjogSVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGlzTG9jYWw6IHRydWUsXHJcbiAgICBrZXk6IFJvdXRlS2V5RW51bS5SZXNvdXJjZVBlcnNvbixcclxuICAgIHVybDogJy9GYWNlJyxcclxuICAgIG1vZHVsZU5hbWU6ICdEUF9SRVNPVVJDRV9QRVJTT04nLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9yZXNvdXJjZXMvY2hhcnQvcGVyc29uUmVzb3VyY2UuY29udHJvbGxlcicsXHJcbiAgICB2aWV3czoge1xyXG4gICAgICAgIFwicmVzb3VyY2VcIjoge1xyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ3BlcnNvblJlc291cmNlQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3BlcnNvblJlc291cmNlQ3RybCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS9yZXNvdXJjZXMvY2hhcnQvcGVyc29uUmVzb3VyY2UuaHRtbCcsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdyb3VwOiBHcm91cEVudW0uUmVzb3VyY2UsXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5SZXNvdXJjZVxyXG59O1xyXG5cclxuLy8gd2lmaVxyXG5jb25zdCBSZXNvdXJjZVJvdXRlV2lmaTogSVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGlzTG9jYWw6IHRydWUsXHJcbiAgICBrZXk6IFJvdXRlS2V5RW51bS5SZXNvdXJjZVdpZmksXHJcbiAgICB1cmw6ICcvV2lGaScsXHJcbiAgICBtb2R1bGVOYW1lOiAnRFBfUkVTT1VSQ0VfV0lGSScsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL3Jlc291cmNlcy9jaGFydC93aWZpUmVzb3VyY2UuY29udHJvbGxlcicsXHJcbiAgICB2aWV3czoge1xyXG4gICAgICAgIFwicmVzb3VyY2VcIjoge1xyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ3dpZmlSZXNvdXJjZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd3aWZpUmVzb3VyY2VDdHJsJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL3Jlc291cmNlcy9jaGFydC93aWZpUmVzb3VyY2UuaHRtbCcsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdyb3VwOiBHcm91cEVudW0uUmVzb3VyY2UsXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5SZXNvdXJjZVxyXG59O1xyXG5cclxuLy8gZWxlY3Ryb25pY0ZlbmNlXHJcbmNvbnN0IFJlc291cmNlUm91dGVFbGU6IElSb3V0ZXJDb25maWcgPSB7XHJcbiAgICBpc0xvY2FsOiB0cnVlLFxyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uUmVzb3VyY2VFbGUsXHJcbiAgICB1cmw6ICcvRUZFTkNFJyxcclxuICAgIG1vZHVsZU5hbWU6ICdEUF9SRVNPVVJDRV9FTEUnLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9yZXNvdXJjZXMvY2hhcnQvRUZSZXNvdXJjZS5jb250cm9sbGVyJyxcclxuICAgIHZpZXdzOiB7XHJcbiAgICAgICAgXCJyZXNvdXJjZVwiOiB7XHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAnRUZSZXNvdXJjZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdFRlJlc291cmNlQ3RybCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS9yZXNvdXJjZXMvY2hhcnQvRUZSZXNvdXJjZS5odG1sJyxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ3JvdXA6IEdyb3VwRW51bS5SZXNvdXJjZSxcclxuICAgIHBhcmVudDogUm91dGVLZXlFbnVtLlJlc291cmNlXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IFJlc291cmNlTWFwID0gW1Jlc291cmNlUm91dGUsIFJlc291cmNlUm91dGVBbGwsIFJlc291cmNlUm91dGVDYXIsIFJlc291cmNlUm91dGVQZXJzb24sIFJlc291cmNlUm91dGVXaWZpLCBSZXNvdXJjZVJvdXRlRWxlXSBhcyBBcnJheTxJUm91dGVyQ29uZmlnPjsiXX0=
