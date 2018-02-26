define(["require", "exports", "../app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var searchChartParams = (function () {
        function searchChartParams() {
        }
        return searchChartParams;
    }());
    exports.searchChartParams = searchChartParams;
    var resourceService = (function () {
        function resourceService($http, notifyFactory) {
            this.$http = $http;
            this.notifyFunc = notifyFactory.msg({ onlySuccess: true });
        }
        resourceService.prototype.getChartData = function (params) {
            return this.$http({
                method: "POST",
                url: "/db/resource/getReourceData",
                data: params
            }).then(complete);
            function complete(res) {
                var datas;
                if (res && res.code === 200) {
                    datas = res.data;
                }
                return datas;
            }
        };
        resourceService.prototype.getResourceNumByTime = function (params) {
            return this.$http({
                method: "POST",
                url: "/db/resource/getresourceNumByType",
                data: { type: params }
            });
        };
        resourceService.prototype.getTotalMapResource = function () {
            function complete(res) {
                var datas;
                if (res && res.code === 200) {
                    datas = res.data;
                }
                return datas;
            }
            return this.$http({
                method: "POST",
                url: "/db/resource/getTotalDevice",
                data: { type: 1 }
            }).then(complete);
        };
        resourceService.prototype.getEchartConfig = function (configName) {
            return this.$http({
                method: "GET",
                url: "/mock/echart/" + configName + "?v=" + new Date().getTime(),
                cache: true
            }).then(complete);
            function complete(res) {
                return res.data;
            }
        };
        resourceService.prototype.getDeviceById = function (id, type) {
            return this.$http({
                method: "post",
                url: "/db/resource/getDeviceById",
                data: { id: id, type: type }
            }).then(complete);
            function complete(res) {
                return res.data;
            }
        };
        resourceService.prototype.beforeSocket = function (params) {
            return this.$http({
                method: "post",
                url: "/pdp/commonCtrl/log/subcribeFirst",
                data: params
            }).then(complete);
            function complete(res) {
                return res.data;
            }
        };
        resourceService.$inject = ['$http', 'notifyFactory'];
        return resourceService;
    }());
    exports.resourceService = resourceService;
    main_app_1.app
        .service('resourceService', resourceService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL3Jlc291cmNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBU0E7UUFBQTtRQU1BLENBQUM7UUFBRCx3QkFBQztJQUFELENBTkEsQUFNQyxJQUFBO0lBTlksOENBQWlCO0lBc0I5QjtRQXNGSSx5QkFBWSxLQUFVLEVBQUUsYUFBcUM7WUFDekQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQXJGRCxzQ0FBWSxHQUFaLFVBQWEsTUFBeUI7WUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsR0FBRyxFQUFFLDZCQUE2QjtnQkFDbEMsSUFBSSxFQUFFLE1BQU07YUFDZixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRWxCLGtCQUFrQixHQUF3QjtnQkFDdEMsSUFBSSxLQUFLLENBQUM7Z0JBQ1YsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDMUIsS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ3JCLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixDQUFDO1FBQ0wsQ0FBQztRQUVELDhDQUFvQixHQUFwQixVQUFxQixNQUFjO1lBRS9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEdBQUcsRUFBRSxtQ0FBbUM7Z0JBQ3hDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7YUFDekIsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUdELDZDQUFtQixHQUFuQjtZQUNJLGtCQUFrQixHQUF3QjtnQkFDdEMsSUFBSSxLQUFLLENBQUM7Z0JBQ1YsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDMUIsS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ3JCLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsR0FBRyxFQUFFLDZCQUE2QjtnQkFDbEMsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRTthQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RCLENBQUM7UUFHRCx5Q0FBZSxHQUFmLFVBQWdCLFVBQWtCO1lBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxLQUFLO2dCQUNiLEdBQUcsRUFBRSxlQUFlLEdBQUcsVUFBVSxHQUFHLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRTtnQkFDaEUsS0FBSyxFQUFFLElBQUk7YUFDZCxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRWxCLGtCQUFrQixHQUFRO2dCQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNwQixDQUFDO1FBQ0wsQ0FBQztRQUVELHVDQUFhLEdBQWIsVUFBYyxFQUFVLEVBQUUsSUFBWTtZQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxHQUFHLEVBQUUsNEJBQTRCO2dCQUNqQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7YUFDL0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVsQixrQkFBa0IsR0FBUTtnQkFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDcEIsQ0FBQztRQUNMLENBQUM7UUFFRCxzQ0FBWSxHQUFaLFVBQWEsTUFBVztZQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxHQUFHLEVBQUUsbUNBQW1DO2dCQUN4QyxJQUFJLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFbEIsa0JBQWtCLEdBQVE7Z0JBQ3RCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ3BCLENBQUM7UUFDTCxDQUFDO1FBRU0sdUJBQU8sR0FBa0IsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFPL0Qsc0JBQUM7S0ExRkQsQUEwRkMsSUFBQTtJQTFGWSwwQ0FBZTtJQTRGNUIsY0FBRztTQUNFLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxlQUFlLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3NlcnZpY2VzL3Jlc291cmNlLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBkZWxsIG9uIDIwMTcvMy8yOS5cclxuICovXHJcbmltcG9ydCB7IGFwcCB9IGZyb20gXCIuLi9hcHAvbWFpbi5hcHBcIjtcclxuXHJcbmltcG9ydCB7IFJlc3BvbnNlUmVzdWx0IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5cclxuaW1wb3J0IHsgSVJlc3BvbnNlTm90aWZ5RmFjdG9yeSB9IGZyb20gXCIuLi9mYWN0b3J5L3Jlc3BvbnNlLm5vdGlmeS5mYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgY2xhc3Mgc2VhcmNoQ2hhcnRQYXJhbXMge1xyXG4gICAgdGltZVN0YW1wOiBzdHJpbmc7XHJcbiAgICBhbGFybTogYm9vbGVhbjtcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIHN0YXJ0OiBzdHJpbmc7XHJcbiAgICBlbmQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUmVzb3VyY2VTZXJ2aWNlIHtcclxuICAgIGdldFJlc291cmNlTnVtQnlUaW1lKHBhcmFtczogU3RyaW5nKTogUHJvbWlzZTxhbnk+O1xyXG5cclxuICAgIGdldEVjaGFydENvbmZpZyhjb25maWdOYW1lOiBzdHJpbmcpOiBhbnk7XHJcblxyXG4gICAgZ2V0VG90YWxNYXBSZXNvdXJjZSgpOiBQcm9taXNlPGFueT5cclxuXHJcbiAgICBnZXRDaGFydERhdGEocGFyYW1zOiBzZWFyY2hDaGFydFBhcmFtcyk6IFByb21pc2U8YW55PlxyXG5cclxuICAgIGdldERldmljZUJ5SWQoaWQ6IHN0cmluZywgdHlwZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+XHJcblxyXG4gICAgYmVmb3JlU29ja2V0KHBhcmFtczogYW55KTogUHJvbWlzZTxhbnk+XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyByZXNvdXJjZVNlcnZpY2UgaW1wbGVtZW50cyBJUmVzb3VyY2VTZXJ2aWNlIHtcclxuXHJcbiAgICBwcml2YXRlICRodHRwOiBhbnk7XHJcblxyXG4gICAgZ2V0Q2hhcnREYXRhKHBhcmFtczogc2VhcmNoQ2hhcnRQYXJhbXMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvcmVzb3VyY2UvZ2V0UmVvdXJjZURhdGFcIixcclxuICAgICAgICAgICAgZGF0YTogcGFyYW1zXHJcbiAgICAgICAgfSkudGhlbihjb21wbGV0ZSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNvbXBsZXRlKHJlczogUmVzcG9uc2VSZXN1bHQ8YW55Pikge1xyXG4gICAgICAgICAgICBsZXQgZGF0YXM7XHJcbiAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YXMgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFJlc291cmNlTnVtQnlUaW1lKHBhcmFtczogU3RyaW5nKSB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9yZXNvdXJjZS9nZXRyZXNvdXJjZU51bUJ5VHlwZVwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7IHR5cGU6IHBhcmFtcyB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0VG90YWxNYXBSZXNvdXJjZSgpIHtcclxuICAgICAgICBmdW5jdGlvbiBjb21wbGV0ZShyZXM6IFJlc3BvbnNlUmVzdWx0PGFueT4pIHtcclxuICAgICAgICAgICAgbGV0IGRhdGFzO1xyXG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGRhdGFzID0gcmVzLmRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGFzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL3Jlc291cmNlL2dldFRvdGFsRGV2aWNlXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHsgdHlwZTogMSB9XHJcbiAgICAgICAgfSkudGhlbihjb21wbGV0ZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldEVjaGFydENvbmZpZyhjb25maWdOYW1lOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IFwiL21vY2svZWNoYXJ0L1wiICsgY29uZmlnTmFtZSArIFwiP3Y9XCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWVcclxuICAgICAgICB9KS50aGVuKGNvbXBsZXRlKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVzOiBhbnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5kYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXREZXZpY2VCeUlkKGlkOiBzdHJpbmcsIHR5cGU6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcInBvc3RcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9yZXNvdXJjZS9nZXREZXZpY2VCeUlkXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHsgaWQ6IGlkLCB0eXBlOiB0eXBlIH1cclxuICAgICAgICB9KS50aGVuKGNvbXBsZXRlKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVzOiBhbnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5kYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBiZWZvcmVTb2NrZXQocGFyYW1zOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJwb3N0XCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvcGRwL2NvbW1vbkN0cmwvbG9nL3N1YmNyaWJlRmlyc3RcIixcclxuICAgICAgICAgICAgZGF0YTogcGFyYW1zXHJcbiAgICAgICAgfSkudGhlbihjb21wbGV0ZSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNvbXBsZXRlKHJlczogYW55KSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuZGF0YTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljICRpbmplY3Q6IEFycmF5PHN0cmluZz4gPSBbJyRodHRwJywgJ25vdGlmeUZhY3RvcnknXTtcclxuICAgIHByaXZhdGUgbm90aWZ5RnVuYzogKHJlczogUmVzcG9uc2VSZXN1bHQ8YW55PikgPT4gUmVzcG9uc2VSZXN1bHQ8YW55PjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigkaHR0cDogYW55LCBub3RpZnlGYWN0b3J5OiBJUmVzcG9uc2VOb3RpZnlGYWN0b3J5KSB7XHJcbiAgICAgICAgdGhpcy4kaHR0cCA9ICRodHRwO1xyXG4gICAgICAgIHRoaXMubm90aWZ5RnVuYyA9IG5vdGlmeUZhY3RvcnkubXNnKHsgb25seVN1Y2Nlc3M6IHRydWUgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcFxyXG4gICAgLnNlcnZpY2UoJ3Jlc291cmNlU2VydmljZScsIHJlc291cmNlU2VydmljZSk7Il19
