define(["require", "exports", "../../../common/app/main.app", "../../../common/services/total.service", "../../totalFactory/doEcharts", "echarts"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var echarts = require("echarts");
    var SearchParams = (function () {
        function SearchParams() {
        }
        return SearchParams;
    }());
    var AreaTaskController = (function () {
        function AreaTaskController($scope, totalService, echartService, $timeout) {
            var vm = this;
            vm.formatDataList = formatDataList;
            vm.changeTimeBtn = changeTimeBtn;
            vm.showCustomTime = showCustomTime;
            vm.alarmType = 'ALL';
            vm.duration = 'THIRY_DAYS';
            vm.startTime = '';
            vm.endTime = '';
            vm.isNoData = true;
            function _getSearchParams() {
                var result = new SearchParams();
                result.duration = vm.duration;
                result.startTime = vm.startTime;
                result.endTime = vm.endTime;
                result.groupType = "GROUP_BY_AREA";
                console.log('传参', result);
                return [result];
            }
            function getDataList() {
                totalService.getTaskDataList(_getSearchParams()).then(complete);
                function complete(rep) {
                    console.log('区域任务请求成功', rep);
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
                var xAxisData = [];
                var allNum = [];
                var onlineNum = [];
                originalData.GROUP_BY_AREA.forEach(function (item, index) {
                    xAxisData.push(item.areaName);
                    allNum.push(item.allTaskNum);
                    onlineNum.push(item.onlineTaskNum);
                });
                var formatData = {
                    seriesNameOne: '全部',
                    seriesNameTwo: '运行',
                    gridLeft: '5%',
                    gridRight: '5%',
                    xAxisName: '区域',
                    yAxisName: '任务数',
                    colorTwo: ['#bac5ff', '#8cdcff', '#fddc68', '#ffa765', '#c5a7fa', '#bfe66d', '#6ae4d9'],
                    colorOne: ['#8c9eff', '#40c4ff', '#f8c304', '#ff6d00', '#9f6cf7', '#95d60b', '#06cfbe'],
                    xAxisData: xAxisData,
                    allNum: allNum,
                    onlineNum: onlineNum
                };
                echartService.drawEchart(echartService.echartPileBarOption(formatData), 'task-1');
            }
        }
        AreaTaskController.$inject = ["$scope", "totalService", "echartService", '$timeout'];
        return AreaTaskController;
    }());
    main_app_1.app.controller('areaTaskController', AreaTaskController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdG90YWwvdGFzay9hcmVhVGFzay9hcmVhVGFzay5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWlCQSxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFakM7UUFBQTtRQUtBLENBQUM7UUFBRCxtQkFBQztJQUFELENBTEEsQUFLQyxJQUFBO0lBRUQ7UUE0QkksNEJBQVksTUFBVyxFQUFFLFlBQTBCLEVBQUUsYUFBNEIsRUFBQyxRQUFZO1lBQzFGLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztZQUVkLEVBQUUsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1lBRW5DLEVBQUUsQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1lBR25DLEVBQUUsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLEVBQUUsQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO1lBQzNCLEVBQUUsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLEVBQUUsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBR25CO2dCQUNJLElBQUksTUFBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7Z0JBRWhDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDOUIsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNoQyxNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDO2dCQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBQyxNQUFNLENBQUMsQ0FBQztnQkFDekIsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEIsQ0FB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OiJtb2R1bGUvdG90YWwvdGFzay9hcmVhVGFzay9hcmVhVGFzay5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgdGogb24gMjAxNy80LzIxLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5cclxuaW1wb3J0IHtJVG90YWxTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL3RvdGFsLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL3RvdGFsLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7SUVjaGFydFNlcnZpY2V9IGZyb20gXCIuLi8uLi90b3RhbEZhY3RvcnkvZG9FY2hhcnRzXCJcclxuaW1wb3J0IFwiLi4vLi4vdG90YWxGYWN0b3J5L2RvRWNoYXJ0c1wiXHJcblxyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7VGFza0dyb3VwQnlBcmVhLCBUYXNrUmVzcG9uc2V9IGZyb20gXCIuLi8uLi90b3RhbEZhY3RvcnkvdG90YWxSZXNwb25zZVwiXHJcblxyXG5pbXBvcnQgXCJlY2hhcnRzXCI7XHJcbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTtcclxubGV0IGVjaGFydHMgPSByZXF1aXJlKFwiZWNoYXJ0c1wiKTtcclxuXHJcbmNsYXNzIFNlYXJjaFBhcmFtcyB7XHJcbiAgICBkdXJhdGlvbjogc3RyaW5nO1xyXG4gICAgc3RhcnRUaW1lOnN0cmluZztcclxuICAgIGVuZFRpbWU6c3RyaW5nO1xyXG4gICAgZ3JvdXBUeXBlOnN0cmluZztcclxufVxyXG5cclxuY2xhc3MgQXJlYVRhc2tDb250cm9sbGVye1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbXCIkc2NvcGVcIixcInRvdGFsU2VydmljZVwiLFwiZWNoYXJ0U2VydmljZVwiLCckdGltZW91dCddO1xyXG5cclxuICAgIC8v5qC85byP5YyW5pWw5o2uXHJcbiAgICBmb3JtYXREYXRhTGlzdDpGdW5jdGlvbjtcclxuXHJcbiAgICAvL+WIh+aNouaKpeitpuexu+Wei+WxleekuuWvueW6lOaVsOaNrlxyXG4gICAgY2hhbmdlQWxhcm1UeXBlOkZ1bmN0aW9uO1xyXG5cclxuICAgIC8v5YiH5o2i5LiN5ZCM5pe26Ze05oyJ6ZKuXHJcbiAgICBjaGFuZ2VUaW1lQnRuOkZ1bmN0aW9uO1xyXG5cclxuICAgIC8v5bGV56S66Ieq5a6a5LmJ5pe26Ze05q615pWw5o2uXHJcbiAgICBzaG93Q3VzdG9tVGltZTpGdW5jdGlvbjtcclxuXHJcbiAgICAvL+W8gOWni+aXtumXtFxyXG4gICAgc3RhcnRUaW1lOnN0cmluZztcclxuICAgIC8v57uT5p2f5pe26Ze0XHJcbiAgICBlbmRUaW1lOnN0cmluZztcclxuICAgIC8v5oql6K2m57G75Z6LXHJcbiAgICBhbGFybVR5cGU6c3RyaW5nO1xyXG4gICAgLy/ml7bpl7TmrrVcclxuICAgIGR1cmF0aW9uOnN0cmluZztcclxuXHJcbiAgICAvL+aXoOaVsOaNruaXtuWxleekulxyXG4gICAgaXNOb0RhdGE6Ym9vbGVhbjtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlOiBhbnksIHRvdGFsU2VydmljZTpJVG90YWxTZXJ2aWNlLCBlY2hhcnRTZXJ2aWNlOklFY2hhcnRTZXJ2aWNlLCR0aW1lb3V0OmFueSl7XHJcbiAgICAgICAgbGV0IHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgdm0uZm9ybWF0RGF0YUxpc3QgPSBmb3JtYXREYXRhTGlzdDtcclxuXHJcbiAgICAgICAgdm0uY2hhbmdlVGltZUJ0biA9IGNoYW5nZVRpbWVCdG47XHJcbiAgICAgICAgdm0uc2hvd0N1c3RvbVRpbWUgPSBzaG93Q3VzdG9tVGltZTtcclxuXHJcbiAgICAgICAgLy/pu5jorqTlgLxcclxuICAgICAgICB2bS5hbGFybVR5cGUgPSAnQUxMJztcclxuICAgICAgICB2bS5kdXJhdGlvbiA9ICdUSElSWV9EQVlTJztcclxuICAgICAgICB2bS5zdGFydFRpbWUgPSAnJztcclxuICAgICAgICB2bS5lbmRUaW1lID0gJyc7XHJcbiAgICAgICAgdm0uaXNOb0RhdGEgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyDlkJHlkI7lj7DkvKDnmoTlj4LmlbBcclxuICAgICAgICBmdW5jdGlvbiBfZ2V0U2VhcmNoUGFyYW1zKCk6QXJyYXk8U2VhcmNoUGFyYW1zPntcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBTZWFyY2hQYXJhbXMoKTtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5kdXJhdGlvbiA9IHZtLmR1cmF0aW9uO1xyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnRUaW1lID0gdm0uc3RhcnRUaW1lO1xyXG4gICAgICAgICAgICByZXN1bHQuZW5kVGltZSA9IHZtLmVuZFRpbWU7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ncm91cFR5cGUgPSBcIkdST1VQX0JZX0FSRUFcIjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+S8oOWPgicscmVzdWx0KTtcclxuICAgICAgICAgICAgcmV0dXJuIFtyZXN1bHRdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/ojrflj5bmlbDmja7liJfooahcclxuICAgICAgICBmdW5jdGlvbiBnZXREYXRhTGlzdCgpe1xyXG4gICAgICAgICAgICB0b3RhbFNlcnZpY2UuZ2V0VGFza0RhdGFMaXN0KF9nZXRTZWFyY2hQYXJhbXMoKSkudGhlbihjb21wbGV0ZSk7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNvbXBsZXRlKHJlcDpSZXNwb25zZVJlc3VsdDxUYXNrUmVzcG9uc2U+KXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfljLrln5/ku7vliqHor7fmsYLmiJDlip8nLHJlcCk7XHJcbiAgICAgICAgICAgICAgICBpZihyZXAuY29kZSA9PT0gMjAwICYmIHJlcC5kYXRhKXtcclxuICAgICAgICAgICAgICAgICAgICB2bS5pc05vRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdERhdGFMaXN0KHJlcC5kYXRhKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLmlzTm9EYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0RGF0YUxpc3QoKTtcclxuXHJcbiAgICAgICAgLy/ngrnlh7vkuI3lkIzml7bpl7TmrrXmjInpkq5cclxuICAgICAgICBmdW5jdGlvbiBjaGFuZ2VUaW1lQnRuKGR1cmF0aW9uOnN0cmluZyl7XHJcbiAgICAgICAgICAgIHZtLmR1cmF0aW9uID0gZHVyYXRpb247XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmjInpkq4nLHZtLmR1cmF0aW9uKVxyXG4gICAgICAgICAgICBnZXREYXRhTGlzdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/oh6rlrprkuYnml7bpl7RcclxuICAgICAgICBmdW5jdGlvbiBzaG93Q3VzdG9tVGltZSgpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6Ieq5a6a5LmJ5pe26Ze05byA5aeLJyx2bS5zdGFydFRpbWUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6Ieq5a6a5LmJ5pe26Ze057uT5p2fJyx2bS5lbmRUaW1lKTtcclxuICAgICAgICAgICAgdm0uZHVyYXRpb24gPSBcIkNVU1RPTUlaRVwiO1xyXG4gICAgICAgICAgICBnZXREYXRhTGlzdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/ljLrln5/liIbluIPku7vliqHmlbDlm77ooajphY3nva7muLLmn5NcclxuICAgICAgICBmdW5jdGlvbiBmb3JtYXREYXRhTGlzdChvcmlnaW5hbERhdGE6VGFza1Jlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGxldCB4QXhpc0RhdGE6QXJyYXk8YW55PiA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgYWxsTnVtOkFycmF5PGFueT4gPSBbXTtcclxuICAgICAgICAgICAgbGV0IG9ubGluZU51bTpBcnJheTxhbnk+ID0gW107XHJcblxyXG4gICAgICAgICAgICBvcmlnaW5hbERhdGEuR1JPVVBfQllfQVJFQS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtOlRhc2tHcm91cEJ5QXJlYSwgaW5kZXg6bnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICB4QXhpc0RhdGEucHVzaChpdGVtLmFyZWFOYW1lKTtcclxuICAgICAgICAgICAgICAgIGFsbE51bS5wdXNoKGl0ZW0uYWxsVGFza051bSk7XHJcbiAgICAgICAgICAgICAgICBvbmxpbmVOdW0ucHVzaChpdGVtLm9ubGluZVRhc2tOdW0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBmb3JtYXREYXRhOm9iamVjdCA9e1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzTmFtZU9uZTon5YWo6YOoJyxcclxuICAgICAgICAgICAgICAgIHNlcmllc05hbWVUd286J+i/kOihjCcsXHJcbiAgICAgICAgICAgICAgICBncmlkTGVmdDogJzUlJyxcclxuICAgICAgICAgICAgICAgIGdyaWRSaWdodDogJzUlJyxcclxuICAgICAgICAgICAgICAgIHhBeGlzTmFtZTogJ+WMuuWfnycsXHJcbiAgICAgICAgICAgICAgICB5QXhpc05hbWU6ICfku7vliqHmlbAnLFxyXG4gICAgICAgICAgICAgICAgY29sb3JUd286IFsnI2JhYzVmZicsICcjOGNkY2ZmJywgJyNmZGRjNjgnLCAnI2ZmYTc2NScsICcjYzVhN2ZhJywgJyNiZmU2NmQnLCAnIzZhZTRkOSddLFxyXG4gICAgICAgICAgICAgICAgY29sb3JPbmU6IFsnIzhjOWVmZicsICcjNDBjNGZmJywgJyNmOGMzMDQnLCAnI2ZmNmQwMCcsICcjOWY2Y2Y3JywgJyM5NWQ2MGInLCAnIzA2Y2ZiZSddLFxyXG4gICAgICAgICAgICAgICAgLy946L205pWw5o2uXHJcbiAgICAgICAgICAgICAgICB4QXhpc0RhdGE6eEF4aXNEYXRhLFxyXG4gICAgICAgICAgICAgICAgLy/lhajpg6jmlbDmja5cclxuICAgICAgICAgICAgICAgIGFsbE51bTphbGxOdW0sXHJcbiAgICAgICAgICAgICAgICAvL+acieaViOaIlui/kOihjOaVsOaNrlxyXG4gICAgICAgICAgICAgICAgb25saW5lTnVtOm9ubGluZU51bVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBlY2hhcnRTZXJ2aWNlLmRyYXdFY2hhcnQoZWNoYXJ0U2VydmljZS5lY2hhcnRQaWxlQmFyT3B0aW9uKGZvcm1hdERhdGEpLCd0YXNrLTEnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignYXJlYVRhc2tDb250cm9sbGVyJywgQXJlYVRhc2tDb250cm9sbGVyKTsiXX0=
