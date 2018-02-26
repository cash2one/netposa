define(["require", "exports", "../enum/RouteGroupEnum"], function (require, exports, RouteGroupEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseConfigGroup = {
        key: RouteGroupEnum_1.GroupEnum.BaseConfig,
        name: "DP_CONFIG_COMMON_71",
        isGroup: true
    };
    var ResourceGroup = {
        key: RouteGroupEnum_1.GroupEnum.Resource,
        name: "FDS_01_00_01",
        isGroup: true
    };
    var ResourceConfigGroup = {
        key: RouteGroupEnum_1.GroupEnum.ResourceConfig,
        name: "DP_CONFIG_COMMON_74",
        isGroup: true
    };
    var ResourceRetrievalConfigGroup = {
        key: RouteGroupEnum_1.GroupEnum.ResourceRetrievalConfig,
        name: "FDS_01_18",
        isGroup: true
    };
    var BusinessConfigGroup = {
        key: RouteGroupEnum_1.GroupEnum.BusinessConfig,
        name: "DP_CONFIG_COMMON_75",
        isGroup: true
    };
    var DeviceConfigGroup = {
        key: RouteGroupEnum_1.GroupEnum.DeviceConfig,
        name: "DP_CONFIG_COMMON_73",
        isGroup: true
    };
    var SystemConfigGroup = {
        key: RouteGroupEnum_1.GroupEnum.SystemConfig,
        name: "DP_CONFIG_COMMON_76",
        isGroup: true
    };
    var ServiceConfigGroup = {
        key: RouteGroupEnum_1.GroupEnum.ServiceConfig,
        name: "DP_CONFIG_COMMON_72",
        isGroup: true
    };
    var baseConfigGroup = [BaseConfigGroup, ResourceGroup, ResourceConfigGroup, ResourceRetrievalConfigGroup, BusinessConfigGroup, DeviceConfigGroup, SystemConfigGroup, ServiceConfigGroup];
    exports.baseConfigGroup = baseConfigGroup;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3JvdXRlci9ncm91cC9jb25maWcuZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBTUEsSUFBTSxlQUFlLEdBQUc7UUFDcEIsR0FBRyxFQUFFLDBCQUFTLENBQUMsVUFBVTtRQUN6QixJQUFJLEVBQUUscUJBQXFCO1FBQzNCLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUM7SUFFRixJQUFNLGFBQWEsR0FBRztRQUNsQixHQUFHLEVBQUUsMEJBQVMsQ0FBQyxRQUFRO1FBQ3ZCLElBQUksRUFBRSxjQUFjO1FBQ3BCLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUM7SUFHRixJQUFNLG1CQUFtQixHQUFHO1FBQ3hCLEdBQUcsRUFBRSwwQkFBUyxDQUFDLGNBQWM7UUFDN0IsSUFBSSxFQUFFLHFCQUFxQjtRQUMzQixPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDO0lBRUYsSUFBTSw0QkFBNEIsR0FBRztRQUNqQyxHQUFHLEVBQUUsMEJBQVMsQ0FBQyx1QkFBdUI7UUFDdEMsSUFBSSxFQUFFLFdBQVc7UUFDakIsT0FBTyxFQUFFLElBQUk7S0FDaEIsQ0FBQztJQUVGLElBQU0sbUJBQW1CLEdBQUc7UUFDeEIsR0FBRyxFQUFFLDBCQUFTLENBQUMsY0FBYztRQUM3QixJQUFJLEVBQUUscUJBQXFCO1FBQzNCLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUM7SUFFRixJQUFNLGlCQUFpQixHQUFHO1FBQ3RCLEdBQUcsRUFBRSwwQkFBUyxDQUFDLFlBQVk7UUFDM0IsSUFBSSxFQUFFLHFCQUFxQjtRQUMzQixPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDO0lBRUYsSUFBTSxpQkFBaUIsR0FBRztRQUN0QixHQUFHLEVBQUUsMEJBQVMsQ0FBQyxZQUFZO1FBQzNCLElBQUksRUFBRSxxQkFBcUI7UUFDM0IsT0FBTyxFQUFFLElBQUk7S0FDaEIsQ0FBQztJQUNGLElBQU0sa0JBQWtCLEdBQUc7UUFDdkIsR0FBRyxFQUFFLDBCQUFTLENBQUMsYUFBYTtRQUM1QixJQUFJLEVBQUUscUJBQXFCO1FBQzNCLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUM7SUFFRixJQUFNLGVBQWUsR0FBdUIsQ0FBQyxlQUFlLEVBQUMsYUFBYSxFQUFDLG1CQUFtQixFQUFDLDRCQUE0QixFQUFDLG1CQUFtQixFQUFDLGlCQUFpQixFQUFDLGlCQUFpQixFQUFDLGtCQUFrQixDQUFDLENBQUM7SUFFaE0sMENBQWUiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9yb3V0ZXIvZ3JvdXAvY29uZmlnLmdyb3VwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtHcm91cEVudW19IGZyb20gXCIuLi9lbnVtL1JvdXRlR3JvdXBFbnVtXCI7XHJcbmltcG9ydCB7SVJvdXRlckdyb3VwfSBmcm9tIFwiLi4vcm91dGVyXCI7XHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGRlbGwgb24gMjAxNy80LzE5LlxyXG4gKi9cclxuXHJcbmNvbnN0IEJhc2VDb25maWdHcm91cCA9IHtcclxuICAgIGtleTogR3JvdXBFbnVtLkJhc2VDb25maWcsXHJcbiAgICBuYW1lOiBcIkRQX0NPTkZJR19DT01NT05fNzFcIixcclxuICAgIGlzR3JvdXA6IHRydWVcclxufTtcclxuXHJcbmNvbnN0IFJlc291cmNlR3JvdXAgPSB7XHJcbiAgICBrZXk6IEdyb3VwRW51bS5SZXNvdXJjZSxcclxuICAgIG5hbWU6IFwiRkRTXzAxXzAwXzAxXCIsXHJcbiAgICBpc0dyb3VwOiB0cnVlXHJcbn07XHJcblxyXG5cclxuY29uc3QgUmVzb3VyY2VDb25maWdHcm91cCA9IHtcclxuICAgIGtleTogR3JvdXBFbnVtLlJlc291cmNlQ29uZmlnLFxyXG4gICAgbmFtZTogXCJEUF9DT05GSUdfQ09NTU9OXzc0XCIsXHJcbiAgICBpc0dyb3VwOiB0cnVlXHJcbn07XHJcblxyXG5jb25zdCBSZXNvdXJjZVJldHJpZXZhbENvbmZpZ0dyb3VwID0ge1xyXG4gICAga2V5OiBHcm91cEVudW0uUmVzb3VyY2VSZXRyaWV2YWxDb25maWcsXHJcbiAgICBuYW1lOiBcIkZEU18wMV8xOFwiLFxyXG4gICAgaXNHcm91cDogdHJ1ZVxyXG59O1xyXG5cclxuY29uc3QgQnVzaW5lc3NDb25maWdHcm91cCA9IHtcclxuICAgIGtleTogR3JvdXBFbnVtLkJ1c2luZXNzQ29uZmlnLFxyXG4gICAgbmFtZTogXCJEUF9DT05GSUdfQ09NTU9OXzc1XCIsXHJcbiAgICBpc0dyb3VwOiB0cnVlXHJcbn07XHJcblxyXG5jb25zdCBEZXZpY2VDb25maWdHcm91cCA9IHtcclxuICAgIGtleTogR3JvdXBFbnVtLkRldmljZUNvbmZpZyxcclxuICAgIG5hbWU6IFwiRFBfQ09ORklHX0NPTU1PTl83M1wiLFxyXG4gICAgaXNHcm91cDogdHJ1ZVxyXG59O1xyXG5cclxuY29uc3QgU3lzdGVtQ29uZmlnR3JvdXAgPSB7XHJcbiAgICBrZXk6IEdyb3VwRW51bS5TeXN0ZW1Db25maWcsXHJcbiAgICBuYW1lOiBcIkRQX0NPTkZJR19DT01NT05fNzZcIixcclxuICAgIGlzR3JvdXA6IHRydWVcclxufTtcclxuY29uc3QgU2VydmljZUNvbmZpZ0dyb3VwID0ge1xyXG4gICAga2V5OiBHcm91cEVudW0uU2VydmljZUNvbmZpZyxcclxuICAgIG5hbWU6IFwiRFBfQ09ORklHX0NPTU1PTl83MlwiLFxyXG4gICAgaXNHcm91cDogdHJ1ZVxyXG59O1xyXG5cclxuY29uc3QgYmFzZUNvbmZpZ0dyb3VwOkFycmF5PElSb3V0ZXJHcm91cD4gPSBbQmFzZUNvbmZpZ0dyb3VwLFJlc291cmNlR3JvdXAsUmVzb3VyY2VDb25maWdHcm91cCxSZXNvdXJjZVJldHJpZXZhbENvbmZpZ0dyb3VwLEJ1c2luZXNzQ29uZmlnR3JvdXAsRGV2aWNlQ29uZmlnR3JvdXAsU3lzdGVtQ29uZmlnR3JvdXAsU2VydmljZUNvbmZpZ0dyb3VwXTtcclxuXHJcbmV4cG9ydCB7YmFzZUNvbmZpZ0dyb3VwfTsiXX0=
