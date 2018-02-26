define(["require", "exports", "../../../common/app/main.app", "../../../common/services/total.service", "../../totalFactory/doEcharts", "angular", "echarts"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var echarts = require("echarts");
    var SearchParams = (function () {
        function SearchParams() {
        }
        return SearchParams;
    }());
    var AreaSearchController = (function () {
        function AreaSearchController($scope, totalService, echartService, $timeout) {
            var vm = this;
            vm.formatDataList = formatDataList;
            vm.changeCauseBtn = changeCauseBtn;
            vm.changeTimeBtn = changeTimeBtn;
            vm.showCustomTime = showCustomTime;
            vm.retrievalType = '';
            vm.duration = 'THIRY_DAYS';
            vm.startTime = '';
            vm.endTime = '';
            vm.isNoData = false;
            function _getSearchParams() {
                var result = new SearchParams();
                result.retrievalType = vm.retrievalType;
                result.duration = vm.duration;
                result.startTime = vm.startTime;
                result.endTime = vm.endTime;
                result.groupType = "GROUP_BY_AREA";
                console.log('传参', result);
                return [result];
            }
            function getDataList() {
                totalService.getSearchDataList(_getSearchParams()).then(complete);
                function complete(rep) {
                    console.log('不同事由检索请求成功', rep);
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
            function changeCauseBtn(retrievalType) {
                console.log('事由', retrievalType);
                vm.retrievalType = retrievalType;
                getDataList();
            }
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
                var searchNum = [];
                var area = [];
                originalData.GROUP_BY_AREA.forEach(function (item, index) {
                    area.push(item.areaName);
                    searchNum.push(item.retrievalNum);
                });
                var formatData = {
                    seriesName: '检索数',
                    gridLeft: '25%',
                    gridRight: '25%',
                    xAxisName: '区域',
                    yAxisName: '检索数',
                    labelShow: false,
                    color: ['#8c9eff', '#40c4ff', '#f8c304', '#ff6d00', '#9f6cf7', '#95d60b', '#06cfbe'],
                    xAxisData: area,
                    showData: searchNum
                };
                echartService.drawEchart(echartService.echartBarOption(formatData), 'search-2');
            }
        }
        AreaSearchController.$inject = ['$scope', 'totalService', 'echartService', '$timeout'];
        return AreaSearchController;
    }());
    main_app_1.app.controller('areaSearchController', AreaSearchController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdG90YWwvc2VhcmNoL2FyZWFTZWFyY2gvYXJlYVNlYXJjaC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWtCQSxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFakM7UUFBQTtRQU1BLENBQUM7UUFBRCxtQkFBQztJQUFELENBTkEsQUFNQyxJQUFBO0lBR0Q7UUE0QkksOEJBQVksTUFBVyxFQUFFLFlBQTJCLEVBQUUsYUFBNEIsRUFBQyxRQUFZO1lBQzNGLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztZQUVkLEVBQUUsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1lBQ25DLEVBQUUsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1lBQ25DLEVBQUUsQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1lBR3BDLEVBQUUsQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLEVBQUUsQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO1lBQzNCLEVBQUUsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLEVBQUUsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBR25CO2dCQUNJLElBQUksTUFBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7Z0JBRWhDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDeEMsTUFBTSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUM5QixNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ2hDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDNUIsTUFBTSxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUM7Z0JBQ25DLE9B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c0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS90b3RhbC9zZWFyY2gvYXJlYVNlYXJjaC9hcmVhU2VhcmNoLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSB0aiBvbiAyMDE3LzQvMjEuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcblxyXG5pbXBvcnQge0lUb3RhbFNlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvdG90YWwuc2VydmljZVwiXHJcbmltcG9ydCBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy90b3RhbC5zZXJ2aWNlXCJcclxuXHJcbmltcG9ydCB7SUVjaGFydFNlcnZpY2V9IGZyb20gXCIuLi8uLi90b3RhbEZhY3RvcnkvZG9FY2hhcnRzXCJcclxuaW1wb3J0IFwiLi4vLi4vdG90YWxGYWN0b3J5L2RvRWNoYXJ0c1wiXHJcblxyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7U2VhcmNoUmVzcG9uc2UsU2VhcmNoR3JvdXBCeUFyZWF9IGZyb20gXCIuLi8uLi90b3RhbEZhY3RvcnkvdG90YWxSZXNwb25zZVwiXHJcblxyXG5pbXBvcnQgXCJhbmd1bGFyXCI7XHJcbmltcG9ydCBcImVjaGFydHNcIjtcclxuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55O1xyXG5sZXQgZWNoYXJ0cyA9IHJlcXVpcmUoXCJlY2hhcnRzXCIpO1xyXG5cclxuY2xhc3MgU2VhcmNoUGFyYW1zIHtcclxuICAgIHJldHJpZXZhbFR5cGU6c3RyaW5nO1xyXG4gICAgZHVyYXRpb246IHN0cmluZztcclxuICAgIHN0YXJ0VGltZTpzdHJpbmc7XHJcbiAgICBlbmRUaW1lOnN0cmluZztcclxuICAgIGdyb3VwVHlwZTpzdHJpbmc7XHJcbn1cclxuXHJcblxyXG5jbGFzcyBBcmVhU2VhcmNoQ29udHJvbGxlcntcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAndG90YWxTZXJ2aWNlJywnZWNoYXJ0U2VydmljZScsJyR0aW1lb3V0J107XHJcblxyXG4gICAgLy/moLzlvI/ljJbmlbDmja5cclxuICAgIGZvcm1hdERhdGFMaXN0OkZ1bmN0aW9uO1xyXG5cclxuICAgIC8v5YiH5o2i5LiN5ZCM5LqL55Sx5qOA57SiXHJcbiAgICBjaGFuZ2VDYXVzZUJ0bjpGdW5jdGlvbjtcclxuXHJcbiAgICAvL+WIh+aNouS4jeWQjOaXtumXtOaMiemSrlxyXG4gICAgY2hhbmdlVGltZUJ0bjpGdW5jdGlvbjtcclxuXHJcbiAgICAvL+WxleekuuiHquWumuS5ieaXtumXtOauteaVsOaNrlxyXG4gICAgc2hvd0N1c3RvbVRpbWU6RnVuY3Rpb247XHJcblxyXG4gICAgLy/kuovnlLFcclxuICAgIHJldHJpZXZhbFR5cGU6c3RyaW5nO1xyXG4gICAgLy/lvIDlp4vml7bpl7RcclxuICAgIHN0YXJ0VGltZTpzdHJpbmc7XHJcbiAgICAvL+e7k+adn+aXtumXtFxyXG4gICAgZW5kVGltZTpzdHJpbmc7XHJcbiAgICAvL+aXtumXtOautVxyXG4gICAgZHVyYXRpb246c3RyaW5nO1xyXG5cclxuICAgIC8v5peg5pWw5o2u5pe25bGV56S6XHJcbiAgICBpc05vRGF0YTpib29sZWFuO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGU6IGFueSwgdG90YWxTZXJ2aWNlOiBJVG90YWxTZXJ2aWNlLCBlY2hhcnRTZXJ2aWNlOklFY2hhcnRTZXJ2aWNlLCR0aW1lb3V0OmFueSkge1xyXG4gICAgICAgIGxldCB2bSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZtLmZvcm1hdERhdGFMaXN0ID0gZm9ybWF0RGF0YUxpc3Q7XHJcbiAgICAgICAgdm0uY2hhbmdlQ2F1c2VCdG4gPSBjaGFuZ2VDYXVzZUJ0bjtcclxuICAgICAgICB2bS5jaGFuZ2VUaW1lQnRuID0gY2hhbmdlVGltZUJ0bjtcclxuICAgICAgICB2bS5zaG93Q3VzdG9tVGltZSA9IHNob3dDdXN0b21UaW1lO1xyXG5cclxuICAgICAgIC8v6buY6K6k5YC8XHJcbiAgICAgICB2bS5yZXRyaWV2YWxUeXBlID0gJyc7XHJcbiAgICAgICB2bS5kdXJhdGlvbiA9ICdUSElSWV9EQVlTJztcclxuICAgICAgIHZtLnN0YXJ0VGltZSA9ICcnO1xyXG4gICAgICAgdm0uZW5kVGltZSA9ICcnO1xyXG4gICAgICAgdm0uaXNOb0RhdGEgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8g5ZCR5ZCO5Y+w5Lyg55qE5Y+C5pWwXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldFNlYXJjaFBhcmFtcygpOkFycmF5PFNlYXJjaFBhcmFtcz57XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBuZXcgU2VhcmNoUGFyYW1zKCk7XHJcblxyXG4gICAgICAgICAgICByZXN1bHQucmV0cmlldmFsVHlwZSA9IHZtLnJldHJpZXZhbFR5cGU7XHJcbiAgICAgICAgICAgIHJlc3VsdC5kdXJhdGlvbiA9IHZtLmR1cmF0aW9uO1xyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnRUaW1lID0gdm0uc3RhcnRUaW1lO1xyXG4gICAgICAgICAgICByZXN1bHQuZW5kVGltZSA9IHZtLmVuZFRpbWU7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ncm91cFR5cGUgPSBcIkdST1VQX0JZX0FSRUFcIjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+S8oOWPgicscmVzdWx0KTtcclxuICAgICAgICAgICAgcmV0dXJuIFtyZXN1bHRdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/ojrflj5bmlbDmja7liJfooahcclxuICAgICAgICBmdW5jdGlvbiBnZXREYXRhTGlzdCgpe1xyXG4gICAgICAgICAgICB0b3RhbFNlcnZpY2UuZ2V0U2VhcmNoRGF0YUxpc3QoX2dldFNlYXJjaFBhcmFtcygpKS50aGVuKGNvbXBsZXRlKTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVwOlJlc3BvbnNlUmVzdWx0PFNlYXJjaFJlc3BvbnNlPil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5LiN5ZCM5LqL55Sx5qOA57Si6K+35rGC5oiQ5YqfJyxyZXApO1xyXG4gICAgICAgICAgICAgICAgaWYocmVwLmNvZGUgPT09IDIwMCAmJiByZXAuZGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uaXNOb0RhdGEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXREYXRhTGlzdChyZXAuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB2bS5pc05vRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldERhdGFMaXN0KCk7XHJcblxyXG4gICAgICAgIC8v5YiH5o2i5LiN5ZCM5LqL55Sx5qOA57SiXHJcbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlQ2F1c2VCdG4ocmV0cmlldmFsVHlwZTpzdHJpbmcpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5LqL55SxJyxyZXRyaWV2YWxUeXBlKTtcclxuICAgICAgICAgICAgdm0ucmV0cmlldmFsVHlwZSA9IHJldHJpZXZhbFR5cGU7XHJcbiAgICAgICAgICAgIGdldERhdGFMaXN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+eCueWHu+S4jeWQjOaXtumXtOauteaMiemSrlxyXG4gICAgICAgIGZ1bmN0aW9uIGNoYW5nZVRpbWVCdG4oZHVyYXRpb246c3RyaW5nKXtcclxuICAgICAgICAgICAgdm0uZHVyYXRpb24gPSBkdXJhdGlvbjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+aMiemSricsdm0uZHVyYXRpb24pO1xyXG4gICAgICAgICAgICBnZXREYXRhTGlzdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/oh6rlrprkuYnml7bpl7RcclxuICAgICAgICBmdW5jdGlvbiBzaG93Q3VzdG9tVGltZSgpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6Ieq5a6a5LmJ5pe26Ze05byA5aeLJyx2bS5zdGFydFRpbWUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6Ieq5a6a5LmJ5pe26Ze057uT5p2fJyx2bS5lbmRUaW1lKTtcclxuICAgICAgICAgICAgdm0uZHVyYXRpb24gPSBcIkNVU1RPTUlaRVwiO1xyXG4gICAgICAgICAgICBnZXREYXRhTGlzdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/kuI3lkIzljLrln5/mo4DntKLmlbDlm77ooajphY3nva7muLLmn5NcclxuICAgICAgICBmdW5jdGlvbiBmb3JtYXREYXRhTGlzdChvcmlnaW5hbERhdGE6U2VhcmNoUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgbGV0IHNlYXJjaE51bTpBcnJheTxhbnk+ID0gW107XHJcbiAgICAgICAgICAgIGxldCBhcmVhOkFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIG9yaWdpbmFsRGF0YS5HUk9VUF9CWV9BUkVBLmZvckVhY2goZnVuY3Rpb24gKGl0ZW06U2VhcmNoR3JvdXBCeUFyZWEsIGluZGV4Om51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgYXJlYS5wdXNoKGl0ZW0uYXJlYU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoTnVtLnB1c2goaXRlbS5yZXRyaWV2YWxOdW0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBmb3JtYXREYXRhOm9iamVjdCA9e1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzTmFtZTon5qOA57Si5pWwJyxcclxuICAgICAgICAgICAgICAgIGdyaWRMZWZ0OiAnMjUlJyxcclxuICAgICAgICAgICAgICAgIGdyaWRSaWdodDogJzI1JScsXHJcbiAgICAgICAgICAgICAgICB4QXhpc05hbWU6ICfljLrln58nLFxyXG4gICAgICAgICAgICAgICAgeUF4aXNOYW1lOiAn5qOA57Si5pWwJyxcclxuICAgICAgICAgICAgICAgIGxhYmVsU2hvdzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogWycjOGM5ZWZmJywgJyM0MGM0ZmYnLCAnI2Y4YzMwNCcsICcjZmY2ZDAwJywgJyM5ZjZjZjcnLCAnIzk1ZDYwYicsICcjMDZjZmJlJ10sXHJcbiAgICAgICAgICAgICAgICAvL3jovbTmlbDmja5cclxuICAgICAgICAgICAgICAgIHhBeGlzRGF0YTphcmVhLFxyXG4gICAgICAgICAgICAgICAgLy/mlbDmja5cclxuICAgICAgICAgICAgICAgIHNob3dEYXRhOnNlYXJjaE51bVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBlY2hhcnRTZXJ2aWNlLmRyYXdFY2hhcnQoZWNoYXJ0U2VydmljZS5lY2hhcnRCYXJPcHRpb24oZm9ybWF0RGF0YSksJ3NlYXJjaC0yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ2FyZWFTZWFyY2hDb250cm9sbGVyJywgQXJlYVNlYXJjaENvbnRyb2xsZXIpO1xyXG4iXX0=
