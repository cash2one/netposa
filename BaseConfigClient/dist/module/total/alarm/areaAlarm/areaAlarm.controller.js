define(["require", "exports", "../../../common/app/main.app", "../../../common/services/total.service", "../../totalFactory/doEcharts", "angular", "echarts"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var echarts = require("echarts");
    var SearchParams = (function () {
        function SearchParams() {
        }
        return SearchParams;
    }());
    var AreaAlarmController = (function () {
        function AreaAlarmController($scope, totalService, echartService, $timeout) {
            var vm = this;
            vm.formatDataList = formatDataList;
            vm.changeAlarmType = changeAlarmType;
            vm.changeTimeBtn = changeTimeBtn;
            vm.showCustomTime = showCustomTime;
            vm.alarmType = 'ALL';
            vm.duration = 'THIRY_DAYS';
            vm.startTime = '';
            vm.endTime = '';
            vm.isNoData = true;
            function _getSearchParams() {
                var result = new SearchParams();
                result.alarmType = vm.alarmType;
                result.duration = vm.duration;
                result.startTime = vm.startTime;
                result.endTime = vm.endTime;
                result.groupType = "GROUP_BY_AREA";
                console.log('传参', result);
                return [result];
            }
            function getDataList() {
                totalService.getAlarmDataList(_getSearchParams()).then(complete);
                function complete(rep) {
                    console.log('区域报警请求成功', rep);
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
            function changeAlarmType(alarmType) {
                vm.duration = "ALL";
                vm.alarmType = alarmType;
                console.log('报警类型', vm.alarmType);
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
                var xAxisData = [];
                var allNum = [];
                var onlineNum = [];
                originalData.GROUP_BY_AREA.forEach(function (item) {
                    xAxisData.push(item.areaName);
                    allNum.push(item.allAlarmNum);
                    onlineNum.push(item.validAlarmNum);
                });
                var formatData = {
                    seriesNameOne: '全部',
                    seriesNameTwo: '有效',
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
                echartService.drawEchart(echartService.echartPileBarOption(formatData), 'alarm-1');
            }
        }
        AreaAlarmController.$inject = ['$scope', 'totalService', 'echartService', '$timeout'];
        return AreaAlarmController;
    }());
    main_app_1.app.controller('areaAlarmController', AreaAlarmController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdG90YWwvYWxhcm0vYXJlYUFsYXJtL2FyZWFBbGFybS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWtCQSxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFakM7UUFBQTtRQU1BLENBQUM7UUFBRCxtQkFBQztJQUFELENBTkEsQUFNQyxJQUFBO0lBRUQ7UUE0QkksNkJBQVksTUFBVyxFQUFFLFlBQTJCLEVBQUUsYUFBNEIsRUFBQyxRQUFZO1lBQzNGLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztZQUVkLEVBQUUsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1lBRW5DLEVBQUUsQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1lBQ3JDLEVBQUUsQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1lBR25DLEVBQUUsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLEVBQUUsQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO1lBQzNCLEVBQUUsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLEVBQUUsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBR25CO2dCQUNJLElBQUksTUFBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7Z0JBRWhDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDaEMsTUFBTSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUM5QixNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ2hDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDNUIsTUFBTSxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUM7Z0JBQ25DLE9BQU8s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dEIsQ0FBQztnQkFFRixhQUFhLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsRUFBQyxTQUFTLENBQUMsQ0FBQztZQUN0RixDQUFDO1FBRUwsQ0FBQztRQS9ITSwyQkFBTyxHQUFHLENBQUMsUUFBUSxFQUFDLGNBQWMsRUFBQyxlQUFlLEVBQUMsVUFBVSxDQUFDLENBQUM7UUFnSTFFLDBCQUFDO0tBaklELEFBaUlDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLHFCQUFxQixFQUFFLG1CQUFtQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL3RvdGFsL2FsYXJtL2FyZWFBbGFybS9hcmVhQWxhcm0uY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHRqIG9uIDIwMTcvNC8yMS5cclxuICovXHJcblxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuXHJcbmltcG9ydCB7SVRvdGFsU2VydmljZX0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy90b3RhbC5zZXJ2aWNlXCJcclxuaW1wb3J0IFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL3RvdGFsLnNlcnZpY2VcIlxyXG5cclxuaW1wb3J0IHtJRWNoYXJ0U2VydmljZX0gZnJvbSBcIi4uLy4uL3RvdGFsRmFjdG9yeS9kb0VjaGFydHNcIlxyXG5pbXBvcnQgXCIuLi8uLi90b3RhbEZhY3RvcnkvZG9FY2hhcnRzXCJcclxuaW1wb3J0IHtSZXNwb25zZVJlc3VsdH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5pbXBvcnQge0FsYXJtUmVzcG9uc2UsQWxhcm1Hcm91cEJ5QXJlYX0gZnJvbSBcIi4uLy4uL3RvdGFsRmFjdG9yeS90b3RhbFJlc3BvbnNlXCJcclxuXHJcblxyXG5pbXBvcnQgXCJhbmd1bGFyXCI7XHJcbmltcG9ydCBcImVjaGFydHNcIjtcclxuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55O1xyXG5sZXQgZWNoYXJ0cyA9IHJlcXVpcmUoXCJlY2hhcnRzXCIpO1xyXG5cclxuY2xhc3MgU2VhcmNoUGFyYW1zIHtcclxuICAgIGFsYXJtVHlwZTogc3RyaW5nO1xyXG4gICAgZHVyYXRpb246IHN0cmluZztcclxuICAgIHN0YXJ0VGltZTpzdHJpbmc7XHJcbiAgICBlbmRUaW1lOnN0cmluZztcclxuICAgIGdyb3VwVHlwZTpzdHJpbmc7XHJcbn1cclxuXHJcbmNsYXNzIEFyZWFBbGFybUNvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsJ3RvdGFsU2VydmljZScsJ2VjaGFydFNlcnZpY2UnLCckdGltZW91dCddO1xyXG5cclxuICAgIC8v5qC85byP5YyW5pWw5o2uXHJcbiAgICBmb3JtYXREYXRhTGlzdDpGdW5jdGlvbjtcclxuXHJcbiAgICAvL+WIh+aNouaKpeitpuexu+Wei+WxleekuuWvueW6lOaVsOaNrlxyXG4gICAgY2hhbmdlQWxhcm1UeXBlOkZ1bmN0aW9uO1xyXG5cclxuICAgIC8v5YiH5o2i5LiN5ZCM5pe26Ze05oyJ6ZKuXHJcbiAgICBjaGFuZ2VUaW1lQnRuOkZ1bmN0aW9uO1xyXG5cclxuICAgIC8v5bGV56S66Ieq5a6a5LmJ5pe26Ze05q615pWw5o2uXHJcbiAgICBzaG93Q3VzdG9tVGltZTpGdW5jdGlvbjtcclxuXHJcbiAgICAvL+W8gOWni+aXtumXtFxyXG4gICAgc3RhcnRUaW1lOnN0cmluZztcclxuICAgIC8v57uT5p2f5pe26Ze0XHJcbiAgICBlbmRUaW1lOnN0cmluZztcclxuICAgIC8v5oql6K2m57G75Z6LXHJcbiAgICBhbGFybVR5cGU6c3RyaW5nO1xyXG4gICAgLy/ml7bpl7TmrrVcclxuICAgIGR1cmF0aW9uOnN0cmluZztcclxuXHJcbiAgICAvL+aXoOaVsOaNruaXtuWxleekulxyXG4gICAgaXNOb0RhdGE6Ym9vbGVhbjtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlOiBhbnksIHRvdGFsU2VydmljZTogSVRvdGFsU2VydmljZSwgZWNoYXJ0U2VydmljZTpJRWNoYXJ0U2VydmljZSwkdGltZW91dDphbnkpIHtcclxuICAgICAgICBsZXQgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICB2bS5mb3JtYXREYXRhTGlzdCA9IGZvcm1hdERhdGFMaXN0O1xyXG5cclxuICAgICAgICB2bS5jaGFuZ2VBbGFybVR5cGUgPSBjaGFuZ2VBbGFybVR5cGU7XHJcbiAgICAgICAgdm0uY2hhbmdlVGltZUJ0biA9IGNoYW5nZVRpbWVCdG47XHJcbiAgICAgICAgdm0uc2hvd0N1c3RvbVRpbWUgPSBzaG93Q3VzdG9tVGltZTtcclxuXHJcbiAgICAgICAgLy/pu5jorqTlgLxcclxuICAgICAgICB2bS5hbGFybVR5cGUgPSAnQUxMJztcclxuICAgICAgICB2bS5kdXJhdGlvbiA9ICdUSElSWV9EQVlTJztcclxuICAgICAgICB2bS5zdGFydFRpbWUgPSAnJztcclxuICAgICAgICB2bS5lbmRUaW1lID0gJyc7XHJcbiAgICAgICAgdm0uaXNOb0RhdGEgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyDlkJHlkI7lj7DkvKDnmoTlj4LmlbBcclxuICAgICAgICBmdW5jdGlvbiBfZ2V0U2VhcmNoUGFyYW1zKCk6QXJyYXk8U2VhcmNoUGFyYW1zPntcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBTZWFyY2hQYXJhbXMoKTtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5hbGFybVR5cGUgPSB2bS5hbGFybVR5cGU7XHJcbiAgICAgICAgICAgIHJlc3VsdC5kdXJhdGlvbiA9IHZtLmR1cmF0aW9uO1xyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnRUaW1lID0gdm0uc3RhcnRUaW1lO1xyXG4gICAgICAgICAgICByZXN1bHQuZW5kVGltZSA9IHZtLmVuZFRpbWU7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ncm91cFR5cGUgPSBcIkdST1VQX0JZX0FSRUFcIjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+S8oOWPgicscmVzdWx0KTtcclxuICAgICAgICAgICAgcmV0dXJuIFtyZXN1bHRdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/ojrflj5bmlbDmja7liJfooahcclxuICAgICAgICBmdW5jdGlvbiBnZXREYXRhTGlzdCgpe1xyXG4gICAgICAgICAgICB0b3RhbFNlcnZpY2UuZ2V0QWxhcm1EYXRhTGlzdChfZ2V0U2VhcmNoUGFyYW1zKCkpLnRoZW4oY29tcGxldGUpO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBjb21wbGV0ZShyZXA6UmVzcG9uc2VSZXN1bHQ8QWxhcm1SZXNwb25zZT4pe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+WMuuWfn+aKpeitpuivt+axguaIkOWKnycscmVwKTtcclxuICAgICAgICAgICAgICAgIGlmKHJlcC5jb2RlID09PSAyMDAgJiYgcmVwLmRhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLmlzTm9EYXRhID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0RGF0YUxpc3QocmVwLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uaXNOb0RhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXREYXRhTGlzdCgpO1xyXG5cclxuICAgICAgICAvL+WIh+aNouaKpeitpuexu+Wei1xyXG4gICAgICAgIGZ1bmN0aW9uIGNoYW5nZUFsYXJtVHlwZShhbGFybVR5cGU6c3RyaW5nKXtcclxuICAgICAgICAgICAgdm0uZHVyYXRpb24gPSBcIkFMTFwiO1xyXG4gICAgICAgICAgICB2bS5hbGFybVR5cGUgPSBhbGFybVR5cGU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmiqXorabnsbvlnosnLHZtLmFsYXJtVHlwZSlcclxuICAgICAgICAgICAgZ2V0RGF0YUxpc3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v54K55Ye75LiN5ZCM5pe26Ze05q615oyJ6ZKuXHJcbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlVGltZUJ0bihkdXJhdGlvbjpzdHJpbmcpe1xyXG4gICAgICAgICAgICB2bS5kdXJhdGlvbiA9IGR1cmF0aW9uO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5oyJ6ZKuJyx2bS5kdXJhdGlvbilcclxuICAgICAgICAgICAgZ2V0RGF0YUxpc3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v6Ieq5a6a5LmJ5pe26Ze0XHJcbiAgICAgICAgZnVuY3Rpb24gc2hvd0N1c3RvbVRpbWUoKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+iHquWumuS5ieaXtumXtOW8gOWniycsdm0uc3RhcnRUaW1lKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6Ieq5a6a5LmJ5pe26Ze057uT5p2fJyx2bS5lbmRUaW1lKVxyXG4gICAgICAgICAgICB2bS5kdXJhdGlvbiA9IFwiQ1VTVE9NSVpFXCI7XHJcbiAgICAgICAgICAgIGdldERhdGFMaXN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WMuuWfn+aKpeitpuaVsOWbvuihqOa4suafk1xyXG4gICAgICAgIGZ1bmN0aW9uIGZvcm1hdERhdGFMaXN0KG9yaWdpbmFsRGF0YTpBbGFybVJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGxldCB4QXhpc0RhdGE6QXJyYXk8YW55PiA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgYWxsTnVtOkFycmF5PGFueT4gPSBbXTtcclxuICAgICAgICAgICAgbGV0IG9ubGluZU51bTpBcnJheTxhbnk+ID0gW107XHJcblxyXG4gICAgICAgICAgICBvcmlnaW5hbERhdGEuR1JPVVBfQllfQVJFQS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtOkFsYXJtR3JvdXBCeUFyZWEpIHtcclxuICAgICAgICAgICAgICAgIHhBeGlzRGF0YS5wdXNoKGl0ZW0uYXJlYU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgYWxsTnVtLnB1c2goaXRlbS5hbGxBbGFybU51bSk7XHJcbiAgICAgICAgICAgICAgICBvbmxpbmVOdW0ucHVzaChpdGVtLnZhbGlkQWxhcm1OdW0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBmb3JtYXREYXRhOm9iamVjdCA9e1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzTmFtZU9uZTon5YWo6YOoJyxcclxuICAgICAgICAgICAgICAgIHNlcmllc05hbWVUd286J+acieaViCcsXHJcbiAgICAgICAgICAgICAgICBncmlkTGVmdDogJzUlJyxcclxuICAgICAgICAgICAgICAgIGdyaWRSaWdodDogJzUlJyxcclxuICAgICAgICAgICAgICAgIHhBeGlzTmFtZTogJ+WMuuWfnycsXHJcbiAgICAgICAgICAgICAgICB5QXhpc05hbWU6ICfku7vliqHmlbAnLFxyXG4gICAgICAgICAgICAgICAgY29sb3JUd286IFsnI2JhYzVmZicsICcjOGNkY2ZmJywgJyNmZGRjNjgnLCAnI2ZmYTc2NScsICcjYzVhN2ZhJywgJyNiZmU2NmQnLCAnIzZhZTRkOSddLFxyXG4gICAgICAgICAgICAgICAgY29sb3JPbmU6IFsnIzhjOWVmZicsICcjNDBjNGZmJywgJyNmOGMzMDQnLCAnI2ZmNmQwMCcsICcjOWY2Y2Y3JywgJyM5NWQ2MGInLCAnIzA2Y2ZiZSddLFxyXG4gICAgICAgICAgICAgICAgLy946L205pWw5o2uXHJcbiAgICAgICAgICAgICAgICB4QXhpc0RhdGE6eEF4aXNEYXRhLFxyXG4gICAgICAgICAgICAgICAgLy/lhajpg6jmlbDmja5cclxuICAgICAgICAgICAgICAgIGFsbE51bTphbGxOdW0sXHJcbiAgICAgICAgICAgICAgICAvL+acieaViOaIlui/kOihjOaVsOaNrlxyXG4gICAgICAgICAgICAgICAgb25saW5lTnVtOm9ubGluZU51bVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgZWNoYXJ0U2VydmljZS5kcmF3RWNoYXJ0KGVjaGFydFNlcnZpY2UuZWNoYXJ0UGlsZUJhck9wdGlvbihmb3JtYXREYXRhKSwnYWxhcm0tMScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdhcmVhQWxhcm1Db250cm9sbGVyJywgQXJlYUFsYXJtQ29udHJvbGxlcik7Il19
