define(["require", "exports", "../../../common/app/main.app", "../../../common/services/total.service", "../../totalFactory/doEcharts", "echarts"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var echarts = require("echarts");
    var SearchParams = (function () {
        function SearchParams() {
        }
        return SearchParams;
    }());
    var AreaFlowController = (function () {
        function AreaFlowController($scope, totalService, echartService, $timeout) {
            var vm = this;
            vm.formatDataList = formatDataList;
            vm.changeTimeBtn = changeTimeBtn;
            vm.showCustomTime = showCustomTime;
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
                totalService.getFlowDataList(_getSearchParams()).then(complete);
                function complete(rep) {
                    console.log('区域流量请求成功', rep);
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
                var userNum = [];
                originalData.GROUP_BY_AREA.forEach(function (item, index) {
                    xAxisData.push(item.areaName);
                    userNum.push(item.flowNum);
                });
                var formatData = {
                    seriesName: '流量数',
                    gridLeft: '5%',
                    gridRight: '5%',
                    xAxisName: '区域',
                    yAxisName: '流量数',
                    labelShow: true,
                    color: ['#269dfa', '#269dfa'],
                    xAxisData: xAxisData,
                    showData: userNum
                };
                echartService.drawEchart(echartService.echartBarOption(formatData), 'flow-1');
            }
            ;
        }
        AreaFlowController.$inject = ["$scope", "totalService", "echartService", '$timeout'];
        return AreaFlowController;
    }());
    main_app_1.app.controller('areaFlowController', AreaFlowController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdG90YWwvZmxvdy9hcmVhRmxvdy9hcmVhRmxvdy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWlCQSxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7SUFHakM7UUFBQTtRQUtBLENBQUM7UUFBRCxtQkFBQztJQUFELENBTEEsQUFLQyxJQUFBO0lBRUQ7UUEyQkksNEJBQVksTUFBVyxFQUFFLFlBQTJCLEVBQUUsYUFBNEIsRUFBQyxRQUFZO1lBQzNGLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztZQUVkLEVBQUUsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1lBQ25DLEVBQUUsQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1lBSS9CLEVBQUUsQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO1lBQzNCLEVBQUUsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLEVBQUUsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBSXZCO2dCQUNJLElBQUksTUFBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7Z0JBRWhDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDOUIsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNoQyxNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDO2dCQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBQyxNQUFNLENBQUMsQ0FBQztnQkFDekIsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEIsQ0FBQztZQUdEO2dCQUNJLFlBQVksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDaEUsa0JBQWtCLEdBQWdDO29CQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDNUIsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7d0JBQzdCLEVBQUUsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO3dCQUNwQixjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM3QixDQUFDO29CQUFBLElBQUksQ0FBQSxDQUFDO3dCQUNGLEVBQUUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUN2QixDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1lBRUQsV0FBVyxFQUFFLENBQUM7WUFHZCx1QkFBdUIsUUFBZTtnQkFDbEMsRUFBRSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7Z0JBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDOUIsV0FBVyxFQUFFLENBQUM7WUFDbEIsQ0FBQztZQUdEO2dCQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNsQyxFQUFFLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQztnQkFDMUIsV0FBVyxFQUFFLENBQUM7WUFDbEIsQ0FBQztZQUdELHdCQUF3QixZQUF5QjtnQkFDN0MsSUFBSSxTQUFTLEdBQWMsRUFBRSxDQUFDO2dCQUM5QixJQUFJLE9BQU8sR0FBYyxFQUFFLENBQUM7Z0JBRTVCLFlBQVksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBb0IsRUFBRSxLQUFZO29CQUMzRSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDOUIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQy9CLENBQUMsQ0FBQyxDQUFDO2dCQUVILElBQUksVUFBVSxHQUFTO29CQUNuQixVQUFVLEVBQUMsS0FBSztvQkFDaEIsUUFBUSxFQUFFLElBQUk7b0JBQ2QsU0FBUyxFQUFFLElBQUk7b0JBQ2YsU0FBUyxFQUFFLElBQUk7b0JBQ2YsU0FBUyxFQUFFLEtBQUs7b0JBQ2hCLFNBQVMsRUFBRSxJQUFJO29CQUNmLEtBQUssRUFBQyxDQUFDLFNBQVMsRUFBQyxTQUFTLENBQUM7b0JBRTNCLFNBQVMsRUFBQyxTQUFTO29CQUVuQixRQUFRLEVBQUMsT0FBTztpQkFDbkIsQ0FBQztnQkFFRixhQUFhLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLEVBQUMsUUFBUSxDQUFDLENBQUM7WUFDakYsQ0FBQztZQUFBLENBQUM7UUFFTixDQUFDO1FBL0dNLDBCQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsY0FBYyxFQUFDLGVBQWUsRUFBQyxVQUFVLENBQUMsQ0FBQztRQWdIM0UseUJBQUM7S0FqSEQsQUFpSEMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvdG90YWwvZmxvdy9hcmVhRmxvdy9hcmVhRmxvdy5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgdGogb24gMjAxNy80LzIxLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5cclxuaW1wb3J0IHtJVG90YWxTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL3RvdGFsLnNlcnZpY2VcIlxyXG5pbXBvcnQgXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvdG90YWwuc2VydmljZVwiXHJcblxyXG5pbXBvcnQge0lFY2hhcnRTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vdG90YWxGYWN0b3J5L2RvRWNoYXJ0c1wiXHJcbmltcG9ydCBcIi4uLy4uL3RvdGFsRmFjdG9yeS9kb0VjaGFydHNcIlxyXG5cclxuaW1wb3J0IHtSZXNwb25zZVJlc3VsdH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiXHJcbmltcG9ydCB7Rmxvd1Jlc3BvbnNlLEZsb3dHcm91cEJ5QXJlYX0gZnJvbSBcIi4uLy4uL3RvdGFsRmFjdG9yeS90b3RhbFJlc3BvbnNlXCJcclxuXHJcbmltcG9ydCBcImVjaGFydHNcIjtcclxuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55O1xyXG5sZXQgZWNoYXJ0cyA9IHJlcXVpcmUoXCJlY2hhcnRzXCIpO1xyXG5cclxuXHJcbmNsYXNzIFNlYXJjaFBhcmFtcyB7XHJcbiAgICBkdXJhdGlvbjogc3RyaW5nO1xyXG4gICAgc3RhcnRUaW1lOnN0cmluZztcclxuICAgIGVuZFRpbWU6c3RyaW5nO1xyXG4gICAgZ3JvdXBUeXBlOnN0cmluZztcclxufVxyXG5cclxuY2xhc3MgQXJlYUZsb3dDb250cm9sbGVye1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbXCIkc2NvcGVcIiwgXCJ0b3RhbFNlcnZpY2VcIixcImVjaGFydFNlcnZpY2VcIiwnJHRpbWVvdXQnXTtcclxuXHJcbiAgICAvL+agvOW8j+WMluaVsOaNrlxyXG4gICAgZm9ybWF0RGF0YUxpc3Q6RnVuY3Rpb247XHJcblxyXG4gICAgLy/liIfmjaLkuI3lkIzml7bpl7TmjInpkq5cclxuICAgIGNoYW5nZVRpbWVCdG46RnVuY3Rpb247XHJcblxyXG4gICAgLy/lsZXnpLroh6rlrprkuYnml7bpl7TmrrXmlbDmja5cclxuICAgIHNob3dDdXN0b21UaW1lOkZ1bmN0aW9uO1xyXG5cclxuXHJcbiAgICAvL+W8gOWni+aXtumXtFxyXG4gICAgc3RhcnRUaW1lOnN0cmluZztcclxuICAgIC8v57uT5p2f5pe26Ze0XHJcbiAgICBlbmRUaW1lOnN0cmluZztcclxuICAgIC8v5Yy65Z+f5ZCNXHJcbiAgICBhcmVhTmFtZTpzdHJpbmc7XHJcbiAgICAvL+WMuuWfn2NvZGVcclxuICAgIGFyZWFDb2RlOnN0cmluZztcclxuICAgIC8v5pe26Ze05q61XHJcbiAgICBkdXJhdGlvbjpzdHJpbmc7XHJcblxyXG4gICAgLy/ml6DmlbDmja7ml7blsZXnpLpcclxuICAgIGlzTm9EYXRhOmJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlOiBhbnksIHRvdGFsU2VydmljZTogSVRvdGFsU2VydmljZSwgZWNoYXJ0U2VydmljZTpJRWNoYXJ0U2VydmljZSwkdGltZW91dDphbnkpIHtcclxuICAgICAgICBsZXQgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICB2bS5mb3JtYXREYXRhTGlzdCA9IGZvcm1hdERhdGFMaXN0O1xyXG4gICAgICAgIHZtLmNoYW5nZVRpbWVCdG4gPSBjaGFuZ2VUaW1lQnRuO1xyXG4gICAgICAgIHZtLnNob3dDdXN0b21UaW1lID0gc2hvd0N1c3RvbVRpbWU7XHJcblxyXG5cclxuICAgICAgICAgICAgLy/pu5jorqTlgLxcclxuICAgICAgICAgICAgdm0uZHVyYXRpb24gPSAnVEhJUllfREFZUyc7XHJcbiAgICAgICAgICAgIHZtLnN0YXJ0VGltZSA9ICcnO1xyXG4gICAgICAgICAgICB2bS5lbmRUaW1lID0gJyc7XHJcbiAgICAgICAgICAgIHZtLmlzTm9EYXRhID0gdHJ1ZTtcclxuXHJcblxyXG4gICAgICAgIC8vIOWQkeWQjuWPsOS8oOeahOWPguaVsFxyXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRTZWFyY2hQYXJhbXMoKTpBcnJheTxTZWFyY2hQYXJhbXM+e1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IFNlYXJjaFBhcmFtcygpO1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0LmR1cmF0aW9uID0gdm0uZHVyYXRpb247XHJcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydFRpbWUgPSB2bS5zdGFydFRpbWU7XHJcbiAgICAgICAgICAgIHJlc3VsdC5lbmRUaW1lID0gdm0uZW5kVGltZTtcclxuICAgICAgICAgICAgcmVzdWx0Lmdyb3VwVHlwZSA9IFwiR1JPVVBfQllfQVJFQVwiO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Lyg5Y+CJyxyZXN1bHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gW3Jlc3VsdF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+iOt+WPluaVsOaNruWIl+ihqFxyXG4gICAgICAgIGZ1bmN0aW9uIGdldERhdGFMaXN0KCl7XHJcbiAgICAgICAgICAgIHRvdGFsU2VydmljZS5nZXRGbG93RGF0YUxpc3QoX2dldFNlYXJjaFBhcmFtcygpKS50aGVuKGNvbXBsZXRlKTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVwOlJlc3BvbnNlUmVzdWx0PEZsb3dSZXNwb25zZT4pe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+WMuuWfn+a1gemHj+ivt+axguaIkOWKnycscmVwKTtcclxuICAgICAgICAgICAgICAgIGlmKHJlcC5jb2RlID09PSAyMDAgJiYgcmVwLmRhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLmlzTm9EYXRhID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0RGF0YUxpc3QocmVwLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uaXNOb0RhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXREYXRhTGlzdCgpO1xyXG5cclxuICAgICAgICAvL+eCueWHu+S4jeWQjOaXtumXtOauteaMiemSrlxyXG4gICAgICAgIGZ1bmN0aW9uIGNoYW5nZVRpbWVCdG4oZHVyYXRpb246c3RyaW5nKXtcclxuICAgICAgICAgICAgdm0uZHVyYXRpb24gPSBkdXJhdGlvbjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+aMiemSricsdm0uZHVyYXRpb24pO1xyXG4gICAgICAgICAgICBnZXREYXRhTGlzdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/oh6rlrprkuYnml7bpl7RcclxuICAgICAgICBmdW5jdGlvbiBzaG93Q3VzdG9tVGltZSgpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6Ieq5a6a5LmJ5pe26Ze05byA5aeLJyx2bS5zdGFydFRpbWUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6Ieq5a6a5LmJ5pe26Ze057uT5p2fJyx2bS5lbmRUaW1lKTtcclxuICAgICAgICAgICAgdm0uZHVyYXRpb24gPSBcIkNVU1RPTUlaRVwiO1xyXG4gICAgICAgICAgICBnZXREYXRhTGlzdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/lkITljLrliIbluIPmtYHph4/mlbDlm77ooajmuLLmn5NcclxuICAgICAgICBmdW5jdGlvbiBmb3JtYXREYXRhTGlzdChvcmlnaW5hbERhdGE6Rmxvd1Jlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGxldCB4QXhpc0RhdGE6QXJyYXk8YW55PiA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgdXNlck51bTpBcnJheTxhbnk+ID0gW107XHJcblxyXG4gICAgICAgICAgICBvcmlnaW5hbERhdGEuR1JPVVBfQllfQVJFQS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtOkZsb3dHcm91cEJ5QXJlYSwgaW5kZXg6bnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICB4QXhpc0RhdGEucHVzaChpdGVtLmFyZWFOYW1lKTtcclxuICAgICAgICAgICAgICAgIHVzZXJOdW0ucHVzaChpdGVtLmZsb3dOdW0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBmb3JtYXREYXRhOm9iamVjdCA9e1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzTmFtZTon5rWB6YeP5pWwJyxcclxuICAgICAgICAgICAgICAgIGdyaWRMZWZ0OiAnNSUnLFxyXG4gICAgICAgICAgICAgICAgZ3JpZFJpZ2h0OiAnNSUnLFxyXG4gICAgICAgICAgICAgICAgeEF4aXNOYW1lOiAn5Yy65Z+fJyxcclxuICAgICAgICAgICAgICAgIHlBeGlzTmFtZTogJ+a1gemHj+aVsCcsXHJcbiAgICAgICAgICAgICAgICBsYWJlbFNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjpbJyMyNjlkZmEnLCcjMjY5ZGZhJ10sXHJcbiAgICAgICAgICAgICAgICAvL3jovbTmlbDmja5cclxuICAgICAgICAgICAgICAgIHhBeGlzRGF0YTp4QXhpc0RhdGEsXHJcbiAgICAgICAgICAgICAgICAvL+aVsOaNrlxyXG4gICAgICAgICAgICAgICAgc2hvd0RhdGE6dXNlck51bVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgZWNoYXJ0U2VydmljZS5kcmF3RWNoYXJ0KGVjaGFydFNlcnZpY2UuZWNoYXJ0QmFyT3B0aW9uKGZvcm1hdERhdGEpLCdmbG93LTEnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ2FyZWFGbG93Q29udHJvbGxlcicsIEFyZWFGbG93Q29udHJvbGxlcik7Il19
