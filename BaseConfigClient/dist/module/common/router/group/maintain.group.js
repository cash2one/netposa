define(["require", "exports", "../enum/RouteGroupEnum"], function (require, exports, RouteGroupEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StatisticalAnalysisGroup = {
        key: RouteGroupEnum_1.MaintainGroupEnum.StatisticsOverview,
        name: "FDS_02_02_10",
        isGroup: true
    };
    var EquipmentStatusGroup = {
        key: RouteGroupEnum_1.MaintainGroupEnum.EquipmentStatus,
        name: "FDS_02_02_16",
        isGroup: true
    };
    var UserStatusGroup = {
        key: RouteGroupEnum_1.MaintainGroupEnum.UserStatus,
        name: "FDS_02_02_17",
        isGroup: true
    };
    var LogManagementGroup = {
        key: RouteGroupEnum_1.MaintainGroupEnum.LogManagement,
        name: "FDS_02_02_18",
        isGroup: true
    };
    var MaintainGroup = [StatisticalAnalysisGroup, EquipmentStatusGroup, UserStatusGroup, LogManagementGroup];
    exports.MaintainGroup = MaintainGroup;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3JvdXRlci9ncm91cC9tYWludGFpbi5ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFHQSxJQUFNLHdCQUF3QixHQUFHO1FBQzdCLEdBQUcsRUFBRSxrQ0FBaUIsQ0FBQyxrQkFBa0I7UUFDekMsSUFBSSxFQUFFLGNBQWM7UUFDcEIsT0FBTyxFQUFFLElBQUk7S0FDaEIsQ0FBQztJQUVGLElBQU0sb0JBQW9CLEdBQUc7UUFDekIsR0FBRyxFQUFFLGtDQUFpQixDQUFDLGVBQWU7UUFDdEMsSUFBSSxFQUFFLGNBQWM7UUFDcEIsT0FBTyxFQUFFLElBQUk7S0FDaEIsQ0FBQztJQUdGLElBQU0sZUFBZSxHQUFHO1FBQ3BCLEdBQUcsRUFBRSxrQ0FBaUIsQ0FBQyxVQUFVO1FBQ2pDLElBQUksRUFBRSxjQUFjO1FBQ3BCLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUM7SUFFRixJQUFNLGtCQUFrQixHQUFHO1FBQ3ZCLEdBQUcsRUFBRSxrQ0FBaUIsQ0FBQyxhQUFhO1FBQ3BDLElBQUksRUFBRSxjQUFjO1FBQ3BCLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUM7SUFFRixJQUFJLGFBQWEsR0FBdUIsQ0FBQyx3QkFBd0IsRUFBQyxvQkFBb0IsRUFBQyxlQUFlLEVBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUVuSCxzQ0FBYSIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3JvdXRlci9ncm91cC9tYWludGFpbi5ncm91cC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TWFpbnRhaW5Hcm91cEVudW19IGZyb20gXCIuLi9lbnVtL1JvdXRlR3JvdXBFbnVtXCI7XHJcbmltcG9ydCB7SVJvdXRlckdyb3VwfSBmcm9tIFwiLi4vcm91dGVyXCI7XHJcblxyXG5jb25zdCBTdGF0aXN0aWNhbEFuYWx5c2lzR3JvdXAgPSB7XHJcbiAgICBrZXk6IE1haW50YWluR3JvdXBFbnVtLlN0YXRpc3RpY3NPdmVydmlldyxcclxuICAgIG5hbWU6IFwiRkRTXzAyXzAyXzEwXCIsXHJcbiAgICBpc0dyb3VwOiB0cnVlXHJcbn07XHJcblxyXG5jb25zdCBFcXVpcG1lbnRTdGF0dXNHcm91cCA9IHtcclxuICAgIGtleTogTWFpbnRhaW5Hcm91cEVudW0uRXF1aXBtZW50U3RhdHVzLFxyXG4gICAgbmFtZTogXCJGRFNfMDJfMDJfMTZcIixcclxuICAgIGlzR3JvdXA6IHRydWVcclxufTtcclxuXHJcblxyXG5jb25zdCBVc2VyU3RhdHVzR3JvdXAgPSB7XHJcbiAgICBrZXk6IE1haW50YWluR3JvdXBFbnVtLlVzZXJTdGF0dXMsXHJcbiAgICBuYW1lOiBcIkZEU18wMl8wMl8xN1wiLFxyXG4gICAgaXNHcm91cDogdHJ1ZVxyXG59O1xyXG5cclxuY29uc3QgTG9nTWFuYWdlbWVudEdyb3VwID0ge1xyXG4gICAga2V5OiBNYWludGFpbkdyb3VwRW51bS5Mb2dNYW5hZ2VtZW50LFxyXG4gICAgbmFtZTogXCJGRFNfMDJfMDJfMThcIixcclxuICAgIGlzR3JvdXA6IHRydWVcclxufTtcclxuXHJcbmxldCBNYWludGFpbkdyb3VwOkFycmF5PElSb3V0ZXJHcm91cD4gPSBbU3RhdGlzdGljYWxBbmFseXNpc0dyb3VwLEVxdWlwbWVudFN0YXR1c0dyb3VwLFVzZXJTdGF0dXNHcm91cCxMb2dNYW5hZ2VtZW50R3JvdXBdO1xyXG5cclxuZXhwb3J0IHtNYWludGFpbkdyb3VwfTsiXX0=
