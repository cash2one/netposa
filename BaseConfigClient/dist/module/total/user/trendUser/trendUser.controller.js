define(["require", "exports", "../../../common/app/main.app", "../../../common/services/total.service", "../../totalFactory/doEcharts", "angular", "echarts"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var echarts = require("echarts");
    var SearchParams = (function () {
        function SearchParams() {
        }
        return SearchParams;
    }());
    var TrendUserController = (function () {
        function TrendUserController($scope, totalService, echartService) {
            var vm = this;
            vm.formatDataList = formatDataList;
            vm.changeTimeBtn = changeTimeBtn;
            vm.showCustomTime = showCustomTime;
            vm.areaCode = '';
            vm.duration = 'THIRY_DAYS';
            vm.startTime = '';
            vm.endTime = '';
            vm.isNoData = true;
            function _getSearchParams() {
                var result = new SearchParams();
                result.duration = vm.duration;
                result.startTime = vm.startTime;
                result.endTime = vm.endTime;
                result.groupType = "GROUP_BY_DAY";
                console.log('传参', result);
                return [result];
            }
            function getDataList() {
                totalService.getUserDataList(_getSearchParams()).then(complete);
                function complete(rep) {
                    console.log('区域用户请求成功', rep);
                    if (rep.code === 200 && rep.data) {
                        vm.isNoData = false;
                        formatDataList(rep.data);
                    }
                    else {
                        vm.isNoData = true;
                    }
                }
            }
            getDataList();
            function changeTimeBtn(duration) {
                vm.duration = duration;
                console.log('按钮', vm.duration);
                getDataList();
            }
            function showCustomTime() {
                console.log('自定义时间开始', vm.startTime);
                console.log('自定义时间结束', vm.endTime);
                vm.duration = "CUSTOMIZE";
                getDataList();
            }
            function formatDataList(originalData) {
                var userCount = [];
                var area = [];
                originalData.GROUP_BY_DAY.forEach(function (item, index) {
                    area.push(item.strDate);
                    userCount.push(item.allUserNum);
                });
                var formatData = {
                    color: ['#6ae4d9'],
                    xAxisData: area,
                    showData: userCount
                };
                echartService.drawEchart(echartService.echartLineAreaOption(formatData), 'user-3');
            }
        }
        TrendUserController.$inject = ["$scope", "totalService", "echartService"];
        return TrendUserController;
    }());
    main_app_1.app.controller('trendUserController', TrendUserController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdG90YWwvdXNlci90cmVuZFVzZXIvdHJlbmRVc2VyLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBbUJBLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUVqQztRQUFBO1FBS0EsQ0FBQztRQUFELG1CQUFDO0lBQUQsQ0FMQSxBQUtDLElBQUE7SUFFRDtRQTBCSSw2QkFBWSxNQUFXLEVBQUUsWUFBMEIsRUFBRSxhQUE0QjtZQUM3RSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFFZCxFQUFFLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztZQUNuQyxFQUFFLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztZQUNqQyxFQUFFLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztZQUduQyxFQUFFLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNqQixFQUFFLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQztZQUMzQixFQUFFLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUNsQixFQUFFLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNoQixFQUFFLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUduQjtnQkFDSSxJQUFJLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO2dCQUVoQyxNQUFNLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQzlCLE1BQU0sQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDaEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUM1QixNQUFNLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQztnQkFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3pCLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLENBQUM7WUFHRDtnQkFDSSxZQUFZLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2hFLGtCQUFrQixHQUFnQztvQkFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzVCLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDO3dCQUM3QixFQUFFLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQzt3QkFDcEIsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDN0IsQ0FBQztvQkFBQSxJQUFJLENBQUEsQ0FBQzt3QkFDRixFQUFFLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztvQkFDdkIsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztZQUVELFdBQVcsRUFBRSxDQUFDO1lBR2QsdUJBQXVCLFFBQWU7Z0JBQ2xDLEVBQUUsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dCQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzlCLFdBQVcsRUFBRSxDQUFDO1lBQ2xCLENBQUM7WUFHRDtnQkFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbEMsRUFBRSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7Z0JBQzFCLFdBQVcsRUFBRSxDQUFDO1lBQ2xCLENBQUM7WUFHRCx3QkFBd0IsWUFBeUI7Z0JBQzdDLElBQUksU0FBUyxHQUFjLEVBQUUsQ0FBQztnQkFDOUIsSUFBSSxJQUFJLEdBQWMsRUFBRSxDQUFDO2dCQUV6QixZQUFZLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQW1CLEVBQUUsS0FBWTtvQkFDekUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3hCLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNwQyxDQUFDLENBQUMsQ0FBQztnQkFFSCxJQUFJLFVBQVUsR0FBUztvQkFDbkIsS0FBSyxFQUFFLENBQUMsU0FBUyxDQUFDO29CQUVsQixTQUFTLEVBQUMsSUFBSTtvQkFFZCxRQUFRLEVBQUMsU0FBUztpQkFDckIsQ0FBQztnQkFDRixhQUFhLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsRUFBQyxRQUFRLENBQUMsQ0FBQztZQUN0RixDQUFDO1FBRUwsQ0FBQztRQXRHTSwyQkFBTyxHQUFHLENBQUMsUUFBUSxFQUFDLGNBQWMsRUFBQyxlQUFlLENBQUMsQ0FBQztRQXVHL0QsMEJBQUM7S0F4R0QsQUF3R0MsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMscUJBQXFCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvdG90YWwvdXNlci90cmVuZFVzZXIvdHJlbmRVc2VyLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSB0aiBvbiAyMDE3LzQvMjEuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcblxyXG5pbXBvcnQge0lUb3RhbFNlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvdG90YWwuc2VydmljZVwiXHJcbmltcG9ydCBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy90b3RhbC5zZXJ2aWNlXCJcclxuXHJcbmltcG9ydCB7SUVjaGFydFNlcnZpY2V9IGZyb20gXCIuLi8uLi90b3RhbEZhY3RvcnkvZG9FY2hhcnRzXCJcclxuaW1wb3J0IFwiLi4vLi4vdG90YWxGYWN0b3J5L2RvRWNoYXJ0c1wiXHJcblxyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCJcclxuaW1wb3J0IHtVc2VyUmVzcG9uc2UsVXNlckdyb3VwQnlEYXl9IGZyb20gXCIuLi8uLi90b3RhbEZhY3RvcnkvdG90YWxSZXNwb25zZVwiXHJcblxyXG5cclxuaW1wb3J0IFwiYW5ndWxhclwiO1xyXG5pbXBvcnQgXCJlY2hhcnRzXCI7XHJcbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTtcclxubGV0IGVjaGFydHMgPSByZXF1aXJlKFwiZWNoYXJ0c1wiKTtcclxuXHJcbmNsYXNzIFNlYXJjaFBhcmFtcyB7XHJcbiAgICBkdXJhdGlvbjogc3RyaW5nO1xyXG4gICAgc3RhcnRUaW1lOnN0cmluZztcclxuICAgIGVuZFRpbWU6c3RyaW5nO1xyXG4gICAgZ3JvdXBUeXBlOnN0cmluZztcclxufVxyXG5cclxuY2xhc3MgVHJlbmRVc2VyQ29udHJvbGxlcntcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wiJHNjb3BlXCIsXCJ0b3RhbFNlcnZpY2VcIixcImVjaGFydFNlcnZpY2VcIl07XHJcblxyXG4gICAgLy/moLzlvI/ljJbmlbDmja5cclxuICAgIGZvcm1hdERhdGFMaXN0OkZ1bmN0aW9uO1xyXG5cclxuICAgIC8v5YiH5o2i5LiN5ZCM5pe26Ze05oyJ6ZKuXHJcbiAgICBjaGFuZ2VUaW1lQnRuOkZ1bmN0aW9uO1xyXG5cclxuICAgIC8v5bGV56S66Ieq5a6a5LmJ5pe26Ze05q615pWw5o2uXHJcbiAgICBzaG93Q3VzdG9tVGltZTpGdW5jdGlvbjtcclxuXHJcbiAgICAvL+W8gOWni+aXtumXtFxyXG4gICAgc3RhcnRUaW1lOnN0cmluZztcclxuICAgIC8v57uT5p2f5pe26Ze0XHJcbiAgICBlbmRUaW1lOnN0cmluZztcclxuICAgIC8v5Yy65Z+f5ZCNXHJcbiAgICBhcmVhTmFtZTpzdHJpbmc7XHJcbiAgICAvL+WMuuWfn2NvZGVcclxuICAgIGFyZWFDb2RlOnN0cmluZztcclxuICAgIC8v5pe26Ze05q61XHJcbiAgICBkdXJhdGlvbjpzdHJpbmc7XHJcblxyXG4gICAgLy/ml6DmlbDmja7ml7blsZXnpLpcclxuICAgIGlzTm9EYXRhOmJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlOiBhbnksIHRvdGFsU2VydmljZTpJVG90YWxTZXJ2aWNlLCBlY2hhcnRTZXJ2aWNlOklFY2hhcnRTZXJ2aWNlKXtcclxuICAgICAgICBsZXQgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICB2bS5mb3JtYXREYXRhTGlzdCA9IGZvcm1hdERhdGFMaXN0O1xyXG4gICAgICAgIHZtLmNoYW5nZVRpbWVCdG4gPSBjaGFuZ2VUaW1lQnRuO1xyXG4gICAgICAgIHZtLnNob3dDdXN0b21UaW1lID0gc2hvd0N1c3RvbVRpbWU7XHJcblxyXG4gICAgICAgIC8v6buY6K6k5YC8XHJcbiAgICAgICAgdm0uYXJlYUNvZGUgPSAnJztcclxuICAgICAgICB2bS5kdXJhdGlvbiA9ICdUSElSWV9EQVlTJztcclxuICAgICAgICB2bS5zdGFydFRpbWUgPSAnJztcclxuICAgICAgICB2bS5lbmRUaW1lID0gJyc7XHJcbiAgICAgICAgdm0uaXNOb0RhdGEgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyDlkJHlkI7lj7DkvKDnmoTlj4LmlbBcclxuICAgICAgICBmdW5jdGlvbiBfZ2V0U2VhcmNoUGFyYW1zKCk6QXJyYXk8U2VhcmNoUGFyYW1zPntcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBTZWFyY2hQYXJhbXMoKTtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5kdXJhdGlvbiA9IHZtLmR1cmF0aW9uO1xyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnRUaW1lID0gdm0uc3RhcnRUaW1lO1xyXG4gICAgICAgICAgICByZXN1bHQuZW5kVGltZSA9IHZtLmVuZFRpbWU7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ncm91cFR5cGUgPSBcIkdST1VQX0JZX0RBWVwiO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Lyg5Y+CJyxyZXN1bHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gW3Jlc3VsdF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+iOt+WPluaVsOaNruWIl+ihqFxyXG4gICAgICAgIGZ1bmN0aW9uIGdldERhdGFMaXN0KCl7XHJcbiAgICAgICAgICAgIHRvdGFsU2VydmljZS5nZXRVc2VyRGF0YUxpc3QoX2dldFNlYXJjaFBhcmFtcygpKS50aGVuKGNvbXBsZXRlKTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVwOlJlc3BvbnNlUmVzdWx0PFVzZXJSZXNwb25zZT4pe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+WMuuWfn+eUqOaIt+ivt+axguaIkOWKnycscmVwKTtcclxuICAgICAgICAgICAgICAgIGlmKHJlcC5jb2RlID09PSAyMDAgJiYgcmVwLmRhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLmlzTm9EYXRhID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0RGF0YUxpc3QocmVwLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uaXNOb0RhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXREYXRhTGlzdCgpO1xyXG5cclxuICAgICAgICAvL+eCueWHu+S4jeWQjOaXtumXtOauteaMiemSrlxyXG4gICAgICAgIGZ1bmN0aW9uIGNoYW5nZVRpbWVCdG4oZHVyYXRpb246c3RyaW5nKXtcclxuICAgICAgICAgICAgdm0uZHVyYXRpb24gPSBkdXJhdGlvbjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+aMiemSricsdm0uZHVyYXRpb24pO1xyXG4gICAgICAgICAgICBnZXREYXRhTGlzdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/oh6rlrprkuYnml7bpl7RcclxuICAgICAgICBmdW5jdGlvbiBzaG93Q3VzdG9tVGltZSgpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6Ieq5a6a5LmJ5pe26Ze05byA5aeLJyx2bS5zdGFydFRpbWUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6Ieq5a6a5LmJ5pe26Ze057uT5p2fJyx2bS5lbmRUaW1lKTtcclxuICAgICAgICAgICAgdm0uZHVyYXRpb24gPSBcIkNVU1RPTUlaRVwiO1xyXG4gICAgICAgICAgICBnZXREYXRhTGlzdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/nlKjmiLflnKjnur/otovlir/lm77ooajphY3nva7muLLmn5NcclxuICAgICAgICBmdW5jdGlvbiBmb3JtYXREYXRhTGlzdChvcmlnaW5hbERhdGE6VXNlclJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGxldCB1c2VyQ291bnQ6QXJyYXk8YW55PiA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgYXJlYTpBcnJheTxhbnk+ID0gW107XHJcblxyXG4gICAgICAgICAgICBvcmlnaW5hbERhdGEuR1JPVVBfQllfREFZLmZvckVhY2goZnVuY3Rpb24gKGl0ZW06VXNlckdyb3VwQnlEYXksIGluZGV4Om51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgYXJlYS5wdXNoKGl0ZW0uc3RyRGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB1c2VyQ291bnQucHVzaChpdGVtLmFsbFVzZXJOdW0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBmb3JtYXREYXRhOm9iamVjdCA9e1xyXG4gICAgICAgICAgICAgICAgY29sb3I6IFsnIzZhZTRkOSddLFxyXG4gICAgICAgICAgICAgICAgLy946L205pWw5o2uXHJcbiAgICAgICAgICAgICAgICB4QXhpc0RhdGE6YXJlYSxcclxuICAgICAgICAgICAgICAgIC8v5pWw5o2uXHJcbiAgICAgICAgICAgICAgICBzaG93RGF0YTp1c2VyQ291bnRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZWNoYXJ0U2VydmljZS5kcmF3RWNoYXJ0KGVjaGFydFNlcnZpY2UuZWNoYXJ0TGluZUFyZWFPcHRpb24oZm9ybWF0RGF0YSksJ3VzZXItMycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCd0cmVuZFVzZXJDb250cm9sbGVyJywgVHJlbmRVc2VyQ29udHJvbGxlcik7Il19
