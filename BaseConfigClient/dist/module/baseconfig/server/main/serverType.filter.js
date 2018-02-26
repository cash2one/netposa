define(["require", "exports", "../../../common/app/main.app", "../../../../core/enum/VideoServerType", "../../../../core/enum/ProxyServerType", "../../../../core/enum/IvsServerType"], function (require, exports, main_app_1, VideoServerType_1, ProxyServerType_1, IvsServerType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ServerTypeFilter = (function () {
        function ServerTypeFilter() {
        }
        ServerTypeFilter.proxyServer = function () {
            return function (type) {
                var keys = Object.keys(ProxyServerType_1.ProxyServerType);
                var val = '未知类型';
                for (var i = 0; i < keys.length; i++) {
                    if (ProxyServerType_1.ProxyServerType[keys[i]].value === type) {
                        val = ProxyServerType_1.ProxyServerType[keys[i]].text;
                        break;
                    }
                }
                return val;
            };
        };
        ServerTypeFilter.videoServer = function () {
            return function (dataList, paramsName) {
                if (paramsName && paramsName) {
                    for (var i in dataList) {
                        if (VideoServerType_1.VideoServerType[dataList[i][paramsName]]) {
                            dataList[i][paramsName] = VideoServerType_1.VideoServerType[dataList[i][paramsName]].text;
                        }
                        else {
                            dataList[i][paramsName] = '未知类型';
                        }
                    }
                }
                return dataList;
            };
        };
        ServerTypeFilter.ivsServer = function () {
            return function (dataList, paramsName) {
                if (paramsName && paramsName) {
                    for (var i in dataList) {
                        if (IvsServerType_1.IvsServerType[dataList[i][paramsName]]) {
                            dataList[i][paramsName] = IvsServerType_1.IvsServerType[dataList[i][paramsName]].text;
                        }
                        else {
                            dataList[i][paramsName] = '未知类型';
                        }
                    }
                }
                return dataList;
            };
        };
        return ServerTypeFilter;
    }());
    main_app_1.app.filter("proxyServerTypeFilter", ServerTypeFilter.proxyServer);
    main_app_1.app.filter("videoServerTypeFilter", ServerTypeFilter.videoServer);
    main_app_1.app.filter("ivsServerTypeFilter", ServerTypeFilter.ivsServer);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9zZXJ2ZXIvbWFpbi9zZXJ2ZXJUeXBlLmZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFTQTtRQUFBO1FBNkNBLENBQUM7UUE1Q1UsNEJBQVcsR0FBRztZQUNqQixNQUFNLENBQUMsVUFBVSxJQUFZO2dCQUN6QixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGlDQUFlLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDO2dCQUNqQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDbkMsRUFBRSxDQUFDLENBQUMsaUNBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDMUMsR0FBRyxHQUFJLGlDQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUNyQyxLQUFLLENBQUM7b0JBQ1YsQ0FBQztnQkFDTCxDQUFDO2dCQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDZixDQUFDLENBQUE7UUFDTCxDQUFDLENBQUM7UUFFSyw0QkFBVyxHQUFHO1lBQ2pCLE1BQU0sQ0FBQyxVQUFVLFFBQXFCLEVBQUUsVUFBbUI7Z0JBQ3ZELEVBQUUsQ0FBQyxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUMzQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO3dCQUNyQixFQUFFLENBQUMsQ0FBQyxpQ0FBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDM0MsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLGlDQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUM1RSxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNKLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxNQUFNLENBQUM7d0JBQ3JDLENBQUM7b0JBQ0wsQ0FBQztnQkFDTCxDQUFDO2dCQUNELE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDcEIsQ0FBQyxDQUFBO1FBQ0wsQ0FBQyxDQUFBO1FBQ00sMEJBQVMsR0FBRztZQUNmLE1BQU0sQ0FBQyxVQUFVLFFBQXFCLEVBQUUsVUFBbUI7Z0JBQ3ZELEVBQUUsQ0FBQyxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUMzQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO3dCQUNyQixFQUFFLENBQUMsQ0FBQyw2QkFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDekMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLDZCQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUMxRSxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNKLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxNQUFNLENBQUM7d0JBQ3JDLENBQUM7b0JBQ0wsQ0FBQztnQkFDTCxDQUFDO2dCQUNELE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDcEIsQ0FBQyxDQUFBO1FBQ0wsQ0FBQyxDQUFBO1FBR0wsdUJBQUM7S0E3Q0QsQUE2Q0MsSUFBQTtJQUVELGNBQUcsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEUsY0FBRyxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRSxjQUFHLENBQUMsTUFBTSxDQUFDLHFCQUFxQixFQUFFLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9iYXNlY29uZmlnL3NlcnZlci9tYWluL3NlcnZlclR5cGUuZmlsdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE3LzQvMTEuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCB7VmlkZW9TZXJ2ZXJUeXBlfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9lbnVtL1ZpZGVvU2VydmVyVHlwZVwiO1xyXG5pbXBvcnQge1Byb3h5U2VydmVyVHlwZX0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW51bS9Qcm94eVNlcnZlclR5cGVcIjtcclxuaW1wb3J0IHtJdnNTZXJ2ZXJUeXBlfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9lbnVtL0l2c1NlcnZlclR5cGVcIjtcclxuXHJcbmNsYXNzIFNlcnZlclR5cGVGaWx0ZXIge1xyXG4gICAgc3RhdGljIHByb3h5U2VydmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMoUHJveHlTZXJ2ZXJUeXBlKTtcclxuICAgICAgICAgICAgbGV0IHZhbCA9ICfmnKrnn6XnsbvlnosnO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChQcm94eVNlcnZlclR5cGVba2V5c1tpXV0udmFsdWUgPT09IHR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWwgPSAgUHJveHlTZXJ2ZXJUeXBlW2tleXNbaV1dLnRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyB2aWRlb1NlcnZlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGFMaXN0PzogQXJyYXk8YW55PiwgcGFyYW1zTmFtZT86IHN0cmluZykge1xyXG4gICAgICAgICAgICBpZiAocGFyYW1zTmFtZSAmJiBwYXJhbXNOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIGRhdGFMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFZpZGVvU2VydmVyVHlwZVtkYXRhTGlzdFtpXVtwYXJhbXNOYW1lXV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUxpc3RbaV1bcGFyYW1zTmFtZV0gPSBWaWRlb1NlcnZlclR5cGVbZGF0YUxpc3RbaV1bcGFyYW1zTmFtZV1dLnRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUxpc3RbaV1bcGFyYW1zTmFtZV0gPSAn5pyq55+l57G75Z6LJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGFMaXN0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YXRpYyBpdnNTZXJ2ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkYXRhTGlzdD86IEFycmF5PGFueT4sIHBhcmFtc05hbWU/OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHBhcmFtc05hbWUgJiYgcGFyYW1zTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBkYXRhTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChJdnNTZXJ2ZXJUeXBlW2RhdGFMaXN0W2ldW3BhcmFtc05hbWVdXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhTGlzdFtpXVtwYXJhbXNOYW1lXSA9IEl2c1NlcnZlclR5cGVbZGF0YUxpc3RbaV1bcGFyYW1zTmFtZV1dLnRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUxpc3RbaV1bcGFyYW1zTmFtZV0gPSAn5pyq55+l57G75Z6LJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGFMaXN0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5hcHAuZmlsdGVyKFwicHJveHlTZXJ2ZXJUeXBlRmlsdGVyXCIsIFNlcnZlclR5cGVGaWx0ZXIucHJveHlTZXJ2ZXIpO1xyXG5hcHAuZmlsdGVyKFwidmlkZW9TZXJ2ZXJUeXBlRmlsdGVyXCIsIFNlcnZlclR5cGVGaWx0ZXIudmlkZW9TZXJ2ZXIpO1xyXG5hcHAuZmlsdGVyKFwiaXZzU2VydmVyVHlwZUZpbHRlclwiLCBTZXJ2ZXJUeXBlRmlsdGVyLml2c1NlcnZlcik7XHJcbiJdfQ==
