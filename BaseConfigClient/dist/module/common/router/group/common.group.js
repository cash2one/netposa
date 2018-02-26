define(["require", "exports", "./config.group", "./maintain.group"], function (require, exports, config_group_1, maintain_group_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CommonGroupArr = [].concat(config_group_1.baseConfigGroup, maintain_group_1.MaintainGroup);
    var CommonGroup = {};
    exports.CommonGroup = CommonGroup;
    function CommonConcat(arr) {
        for (var i = 0; i < arr.length; i++) {
            CommonGroup[arr[i].key] = arr[i];
        }
    }
    CommonConcat(CommonGroupArr);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3JvdXRlci9ncm91cC9jb21tb24uZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBSUEsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyw4QkFBZSxFQUFFLDhCQUFhLENBQXdCLENBQUM7SUFDdEYsSUFBSSxXQUFXLEdBQUcsRUFBbUMsQ0FBQztJQVU5QyxrQ0FBVztJQVJuQixzQkFBc0IsR0FBTztRQUN6QixHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQztZQUMxQixXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNwQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3JvdXRlci9ncm91cC9jb21tb24uZ3JvdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2Jhc2VDb25maWdHcm91cH0gZnJvbSBcIi4vY29uZmlnLmdyb3VwXCI7XHJcbmltcG9ydCB7TWFpbnRhaW5Hcm91cH0gZnJvbSBcIi4vbWFpbnRhaW4uZ3JvdXBcIjtcclxuaW1wb3J0IHtJUm91dGVyR3JvdXB9IGZyb20gXCIuLi9yb3V0ZXJcIjtcclxuXHJcbmxldCBDb21tb25Hcm91cEFyciA9IFtdLmNvbmNhdChiYXNlQ29uZmlnR3JvdXAsIE1haW50YWluR3JvdXApIGFzIEFycmF5PElSb3V0ZXJHcm91cD47XHJcbmxldCBDb21tb25Hcm91cCA9IHt9IGFzIHtba2V5OiBzdHJpbmddOiBJUm91dGVyR3JvdXB9O1xyXG5cclxuZnVuY3Rpb24gQ29tbW9uQ29uY2F0KGFycjphbnkpe1xyXG4gICAgZm9yKGxldCBpPTA7aTxhcnIubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgQ29tbW9uR3JvdXBbYXJyW2ldLmtleV0gPSBhcnJbaV1cclxuICAgIH1cclxufVxyXG5cclxuQ29tbW9uQ29uY2F0KENvbW1vbkdyb3VwQXJyKTtcclxuXHJcbmV4cG9ydCB7Q29tbW9uR3JvdXB9OyJdfQ==
