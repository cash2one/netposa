define(["require", "exports", "../../common/app/main.app", "../../common/system-config", "angular"], function (require, exports, main_app_1, system_config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MsgCenter = (function () {
        function MsgCenter() {
            this.taskMsgNum = 0;
            this.feedbackMsgNum = 0;
            this.msgTotalNum = 0;
        }
        return MsgCenter;
    }());
    exports.MsgCenter = MsgCenter;
    var CheckIntelligentAnalysis = (function () {
        function CheckIntelligentAnalysis() {
        }
        CheckIntelligentAnalysis.prototype.checkFaceTrack = function () {
            var temp = angular.fromJson(localStorage.getItem(system_config_1.SystemConfig.USER_INFO_KEY));
            var authorities = temp.JsonUserData.ModuleItemList;
            for (var i = 0; i < authorities.length; i++) {
                if (authorities[i].FullNameSpacePath === "IntelligentAnalysis.FaceTrack") {
                    return true;
                }
            }
            return false;
        };
        CheckIntelligentAnalysis.prototype.checkAccompanyingAnalysis = function () {
            var temp = angular.fromJson(localStorage.getItem(system_config_1.SystemConfig.USER_INFO_KEY));
            var authorities = temp.JsonUserData.ModuleItemList;
            for (var i = 0; i < authorities.length; i++) {
                if (authorities[i].FullNameSpacePath === "IntelligentAnalysis.AccompanyingAnalysis") {
                    return true;
                }
            }
            return false;
        };
        CheckIntelligentAnalysis.prototype.checkFrequencyAnalysis = function () {
            var temp = angular.fromJson(localStorage.getItem(system_config_1.SystemConfig.USER_INFO_KEY));
            var authorities = temp.JsonUserData.ModuleItemList;
            for (var i = 0; i < authorities.length; i++) {
                if (authorities[i].FullNameSpacePath === "IntelligentAnalysis.FrequencyAnalysis") {
                    return true;
                }
            }
            return false;
        };
        CheckIntelligentAnalysis.prototype.checkAnalysis = function () {
            var temp = angular.fromJson(localStorage.getItem(system_config_1.SystemConfig.USER_INFO_KEY));
            var authorities = temp.JsonUserData.ModuleItemList;
            for (var i = 0; i < authorities.length; i++) {
                if (authorities[i].FullNameSpacePath === "IntelligentAnalysis.FaceGroup") {
                    return true;
                }
            }
            return false;
        };
        return CheckIntelligentAnalysis;
    }());
    main_app_1.app
        .service('checkIntelligentAnalysis', CheckIntelligentAnalysis);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2ZhY3RvcnkvQ2hlY2tJbnRlbGxpZ2VudEFuYWx5c2lzLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBV0E7UUFBQTtZQUNJLGVBQVUsR0FBVSxDQUFDLENBQUM7WUFDdEIsbUJBQWMsR0FBVSxDQUFDLENBQUM7WUFDMUIsZ0JBQVcsR0FBVSxDQUFDLENBQUM7UUFDM0IsQ0FBQztRQUFELGdCQUFDO0lBQUQsQ0FKQSxBQUlDLElBQUE7SUFKWSw4QkFBUztJQWF0QjtRQUFBO1FBNkNBLENBQUM7UUEzQ0csaURBQWMsR0FBZDtZQUNJLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyw0QkFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDOUUsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFxQyxDQUFDO1lBQzFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUMxQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLEtBQUssK0JBQStCLENBQUMsQ0FBQyxDQUFDO29CQUN2RSxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDO1lBQ0wsQ0FBQztZQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVELDREQUF5QixHQUF6QjtZQUNJLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyw0QkFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDOUUsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFxQyxDQUFDO1lBQzFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUMxQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLEtBQUssMENBQTBDLENBQUMsQ0FBQyxDQUFDO29CQUNsRixNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDO1lBQ0wsQ0FBQztZQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVELHlEQUFzQixHQUF0QjtZQUNJLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyw0QkFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDOUUsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFxQyxDQUFDO1lBQzFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUMxQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLEtBQUssdUNBQXVDLENBQUMsQ0FBQyxDQUFDO29CQUMvRSxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDO1lBQ0wsQ0FBQztZQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVELGdEQUFhLEdBQWI7WUFDSSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsNEJBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQzlFLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBcUMsQ0FBQztZQUMxRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDMUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixLQUFLLCtCQUErQixDQUFDLENBQUMsQ0FBQztvQkFDdkUsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDaEIsQ0FBQztZQUNMLENBQUM7WUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFDTCwrQkFBQztJQUFELENBN0NBLEFBNkNDLElBQUE7SUFFRCxjQUFHO1NBQ0UsT0FBTyxDQUFDLDBCQUEwQixFQUFFLHdCQUF3QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9mYWN0b3J5L0NoZWNrSW50ZWxsaWdlbnRBbmFseXNpcy5mYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgdGogb24gMjAxNy84LzIuXHJcbiAqL1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHsgU3lzdGVtQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zeXN0ZW0tY29uZmlnXCI7XHJcbmltcG9ydCB7IE1vZHVsZUl0ZW1FeCB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9Nb2R1bGVJdGVtRXhcIjtcclxuaW1wb3J0IHsgSUJhY2tSb3V0ZXJDb25maWcgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3JvdXRlci9yb3V0ZXJcIjtcclxuaW1wb3J0ICdhbmd1bGFyJztcclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBNc2dDZW50ZXJ7XHJcbiAgICB0YXNrTXNnTnVtOm51bWJlciA9IDA7XHJcbiAgICBmZWVkYmFja01zZ051bTpudW1iZXIgPSAwO1xyXG4gICAgbXNnVG90YWxOdW06bnVtYmVyID0gMDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ2hlY2tJbnRlbGxpZ2VudEFuYWx5c2lzIHtcclxuICAgIGNoZWNrRmFjZVRyYWNrOiBGdW5jdGlvbjtcclxuICAgIGNoZWNrQWNjb21wYW55aW5nQW5hbHlzaXM6IEZ1bmN0aW9uO1xyXG4gICAgY2hlY2tGcmVxdWVuY3lBbmFseXNpczogRnVuY3Rpb247XHJcbiAgICBjaGVja0FuYWx5c2lzOiBGdW5jdGlvbjtcclxufVxyXG5cclxuY2xhc3MgQ2hlY2tJbnRlbGxpZ2VudEFuYWx5c2lzIGltcGxlbWVudHMgSUNoZWNrSW50ZWxsaWdlbnRBbmFseXNpcyB7XHJcblxyXG4gICAgY2hlY2tGYWNlVHJhY2soKSB7XHJcbiAgICAgICAgbGV0IHRlbXAgPSBhbmd1bGFyLmZyb21Kc29uKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFN5c3RlbUNvbmZpZy5VU0VSX0lORk9fS0VZKSk7XHJcbiAgICAgICAgbGV0IGF1dGhvcml0aWVzID0gdGVtcC5Kc29uVXNlckRhdGEuTW9kdWxlSXRlbUxpc3QgYXMgQXJyYXk8TW9kdWxlSXRlbUV4PjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGF1dGhvcml0aWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChhdXRob3JpdGllc1tpXS5GdWxsTmFtZVNwYWNlUGF0aCA9PT0gXCJJbnRlbGxpZ2VudEFuYWx5c2lzLkZhY2VUcmFja1wiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tBY2NvbXBhbnlpbmdBbmFseXNpcygpIHtcclxuICAgICAgICBsZXQgdGVtcCA9IGFuZ3VsYXIuZnJvbUpzb24obG9jYWxTdG9yYWdlLmdldEl0ZW0oU3lzdGVtQ29uZmlnLlVTRVJfSU5GT19LRVkpKTtcclxuICAgICAgICBsZXQgYXV0aG9yaXRpZXMgPSB0ZW1wLkpzb25Vc2VyRGF0YS5Nb2R1bGVJdGVtTGlzdCBhcyBBcnJheTxNb2R1bGVJdGVtRXg+O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXV0aG9yaXRpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGF1dGhvcml0aWVzW2ldLkZ1bGxOYW1lU3BhY2VQYXRoID09PSBcIkludGVsbGlnZW50QW5hbHlzaXMuQWNjb21wYW55aW5nQW5hbHlzaXNcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrRnJlcXVlbmN5QW5hbHlzaXMoKSB7XHJcbiAgICAgICAgbGV0IHRlbXAgPSBhbmd1bGFyLmZyb21Kc29uKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFN5c3RlbUNvbmZpZy5VU0VSX0lORk9fS0VZKSk7XHJcbiAgICAgICAgbGV0IGF1dGhvcml0aWVzID0gdGVtcC5Kc29uVXNlckRhdGEuTW9kdWxlSXRlbUxpc3QgYXMgQXJyYXk8TW9kdWxlSXRlbUV4PjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGF1dGhvcml0aWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChhdXRob3JpdGllc1tpXS5GdWxsTmFtZVNwYWNlUGF0aCA9PT0gXCJJbnRlbGxpZ2VudEFuYWx5c2lzLkZyZXF1ZW5jeUFuYWx5c2lzXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja0FuYWx5c2lzKCkge1xyXG4gICAgICAgIGxldCB0ZW1wID0gYW5ndWxhci5mcm9tSnNvbihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTeXN0ZW1Db25maWcuVVNFUl9JTkZPX0tFWSkpO1xyXG4gICAgICAgIGxldCBhdXRob3JpdGllcyA9IHRlbXAuSnNvblVzZXJEYXRhLk1vZHVsZUl0ZW1MaXN0IGFzIEFycmF5PE1vZHVsZUl0ZW1FeD47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdXRob3JpdGllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoYXV0aG9yaXRpZXNbaV0uRnVsbE5hbWVTcGFjZVBhdGggPT09IFwiSW50ZWxsaWdlbnRBbmFseXNpcy5GYWNlR3JvdXBcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5hcHBcclxuICAgIC5zZXJ2aWNlKCdjaGVja0ludGVsbGlnZW50QW5hbHlzaXMnLCBDaGVja0ludGVsbGlnZW50QW5hbHlzaXMpO1xyXG4iXX0=
