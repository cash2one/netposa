define(["require", "exports", "../../../common/app/main.app", "../../../common/directive/tree/tree-params", "../../../common/services/total.service", "../../totalFactory/doEcharts", "../../../common/services/area.service", "echarts"], function (require, exports, main_app_1, tree_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var echarts = require("echarts");
    var SearchParams = (function () {
        function SearchParams() {
        }
        return SearchParams;
    }());
    var DeviceFlowController = (function () {
        function DeviceFlowController($scope, totalService, echartService, areaService, $timeout) {
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
                result.areaCode = vm.areaCode;
                result.duration = vm.duration;
                result.startTime = vm.startTime;
                result.endTime = vm.endTime;
                result.groupType = "GROUP_BY_CAMERA";
                console.log('传参', result);
                return [result];
            }
            function getDataList() {
                totalService.getAlarmDataList(_getSearchParams()).then(complete);
                function complete(rep) {
                    console.log('设备抓拍人流量请求成功', rep);
                    if (rep.code === 200 && rep.data) {
                        vm.isNoData = false;
                        formatDataList(rep.data);
                    }
                    else {
                        vm.isNoData = true;
                    }
                }
            }
            vm.areaTreeDataParams = new tree_params_1.TreeDataParams();
            vm.areaTreeDataParams.treeId = 'areaTreeDeviceFlow';
            vm.areaTreeDataParams.isDefaultSelected = true;
            vm.areaTreeDataParams.onClick = treeSelectNode;
            function getTreeList() {
                areaService.findListTree().then(complete);
                function complete(result) {
                    $timeout(function () {
                        vm.areaTreeDataParams.treeDatas = result;
                    });
                }
            }
            getTreeList();
            function treeSelectNode(event, treeId, treeNode) {
                vm.areaCode = treeNode.Code;
                vm.areaName = treeNode.Name;
                vm.isShowAreaTree = false;
                vm.duration = 'THIRY_DAYS';
                getDataList();
                $timeout(function () {
                    $scope.$apply();
                });
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
                var userNum = [];
                originalData.GROUP_BY_CAMERA.forEach(function (item, index) {
                    xAxisData.push(item.cameraName);
                    userNum.push(item.flowNum);
                });
                var formatData = {
                    seriesName: '流量数',
                    gridLeft: '5%',
                    gridRight: '5%',
                    xAxisName: '设备名称',
                    yAxisName: '流量数',
                    labelShow: true,
                    color: ['#06d1bf', '#06d1bf'],
                    xAxisData: xAxisData,
                    showData: userNum
                };
                echartService.drawEchart(echartService.echartBarOption(formatData), 'flow-2');
            }
            ;
        }
        DeviceFlowController.$inject = ['$scope', 'totalService', 'echartService', 'areaService', '$timeout'];
        return DeviceFlowController;
    }());
    main_app_1.app.controller('deviceFlowController', DeviceFlowController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdG90YWwvZmxvdy9kZXZpY2VGbG93L2RldmljZUZsb3cuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFzQkEsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRWpDO1FBQUE7UUFNQSxDQUFDO1FBQUQsbUJBQUM7SUFBRCxDQU5BLEFBTUMsSUFBQTtJQUVEO1FBZ0NJLDhCQUFZLE1BQVcsRUFBRSxZQUEyQixFQUFFLGFBQTRCLEVBQUMsV0FBd0IsRUFBRSxRQUFZO1lBQ3JILElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztZQUVkLEVBQUUsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1lBQ25DLEVBQUUsQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1lBSW5DLEVBQUUsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLEVBQUUsQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO1lBQzNCLEVBQUUsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLEVBQUUsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBSW5CO2dCQUNJLElBQUksTUFBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7Z0JBRWhDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDOUIsTUFBTSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUM5QixNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ2hDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDNUIsTUFBTSxDQUFDLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQztnQkFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVB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QyxDQUFDO2dCQUVILElBQUksVUFBVSxHQUFTO29CQUNuQixVQUFVLEVBQUMsS0FBSztvQkFDaEIsUUFBUSxFQUFFLElBQUk7b0JBQ2QsU0FBUyxFQUFFLElBQUk7b0JBQ2YsU0FBUyxFQUFFLE1BQU07b0JBQ2pCLFNBQVMsRUFBRSxLQUFLO29CQUNoQixTQUFTLEVBQUUsSUFBSTtvQkFDZixLQUFLLEVBQUMsQ0FBQyxTQUFTLEVBQUMsU0FBUyxDQUFDO29CQUUzQixTQUFTLEVBQUMsU0FBUztvQkFFbkIsUUFBUSxFQUFDLE9BQU87aUJBQ25CLENBQUM7Z0JBQ0YsYUFBYSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxFQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pGLENBQUM7WUFBQSxDQUFDO1FBQ04sQ0FBQztRQW5KTSw0QkFBTyxHQUFHLENBQUMsUUFBUSxFQUFFLGNBQWMsRUFBQyxlQUFlLEVBQUMsYUFBYSxFQUFDLFVBQVUsQ0FBQyxDQUFDO1FBb0p6RiwyQkFBQztLQXJKRCxBQXFKQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS90b3RhbC9mbG93L2RldmljZUZsb3cvZGV2aWNlRmxvdy5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgdGogb24gMjAxNy80LzIxLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5cclxuaW1wb3J0IHtJVG90YWxTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL3RvdGFsLnNlcnZpY2VcIlxyXG5pbXBvcnQgXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvdG90YWwuc2VydmljZVwiXHJcblxyXG5pbXBvcnQge0lFY2hhcnRTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vdG90YWxGYWN0b3J5L2RvRWNoYXJ0c1wiXHJcbmltcG9ydCBcIi4uLy4uL3RvdGFsRmFjdG9yeS9kb0VjaGFydHNcIlxyXG5cclxuaW1wb3J0IHtSZXNwb25zZVJlc3VsdH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiXHJcbmltcG9ydCB7Rmxvd1Jlc3BvbnNlLEZsb3dHcm91cEJ5Q2FtZXJhfSBmcm9tIFwiLi4vLi4vdG90YWxGYWN0b3J5L3RvdGFsUmVzcG9uc2VcIlxyXG5cclxuaW1wb3J0IHtJVHJlZURhdGFQYXJhbXMsIFRyZWVEYXRhUGFyYW1zfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUtcGFyYW1zXCI7XHJcbmltcG9ydCB7QXJlYUV4fSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQXJlYUV4XCI7XHJcbmltcG9ydCB7SUFyZWFTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FyZWEuc2VydmljZVwiO1xyXG5pbXBvcnQgJy4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hcmVhLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IFwiZWNoYXJ0c1wiO1xyXG5kZWNsYXJlIGxldCByZXF1aXJlOiBhbnk7XHJcbmxldCBlY2hhcnRzID0gcmVxdWlyZShcImVjaGFydHNcIik7XHJcblxyXG5jbGFzcyBTZWFyY2hQYXJhbXMge1xyXG4gICAgYXJlYUNvZGU6c3RyaW5nO1xyXG4gICAgZHVyYXRpb246IHN0cmluZztcclxuICAgIHN0YXJ0VGltZTpzdHJpbmc7XHJcbiAgICBlbmRUaW1lOnN0cmluZztcclxuICAgIGdyb3VwVHlwZTpzdHJpbmc7XHJcbn1cclxuXHJcbmNsYXNzIERldmljZUZsb3dDb250cm9sbGVye1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsICd0b3RhbFNlcnZpY2UnLCdlY2hhcnRTZXJ2aWNlJywnYXJlYVNlcnZpY2UnLCckdGltZW91dCddO1xyXG5cclxuICAgIC8v5qC85byP5YyW5pWw5o2uXHJcbiAgICBmb3JtYXREYXRhTGlzdDpGdW5jdGlvbjtcclxuXHJcbiAgICAvL+WIh+aNouS4jeWQjOaXtumXtOaMiemSrlxyXG4gICAgY2hhbmdlVGltZUJ0bjpGdW5jdGlvbjtcclxuXHJcbiAgICAvL+WxleekuuiHquWumuS5ieaXtumXtOauteaVsOaNrlxyXG4gICAgc2hvd0N1c3RvbVRpbWU6RnVuY3Rpb247XHJcblxyXG4gICAgLy/ljLrln5/moJFcclxuICAgIGFyZWFUcmVlRGF0YVBhcmFtczpJVHJlZURhdGFQYXJhbXM8QXJlYUV4PjtcclxuICAgIC8v5bGV56S65Yy65Z+f5qCRXHJcbiAgICBpc1Nob3dBcmVhVHJlZTpib29sZWFuO1xyXG5cclxuICAgIC8v5byA5aeL5pe26Ze0XHJcbiAgICBzdGFydFRpbWU6c3RyaW5nO1xyXG4gICAgLy/nu5PmnZ/ml7bpl7RcclxuICAgIGVuZFRpbWU6c3RyaW5nO1xyXG4gICAgLy/ljLrln5/lkI1cclxuICAgIGFyZWFOYW1lOnN0cmluZztcclxuICAgIC8v5Yy65Z+fY29kZVxyXG4gICAgYXJlYUNvZGU6c3RyaW5nO1xyXG4gICAgLy/ml7bpl7TmrrVcclxuICAgIGR1cmF0aW9uOnN0cmluZztcclxuXHJcbiAgICAvL+aXoOaVsOaNruaXtuWxleekulxyXG4gICAgaXNOb0RhdGE6Ym9vbGVhbjtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlOiBhbnksIHRvdGFsU2VydmljZTogSVRvdGFsU2VydmljZSwgZWNoYXJ0U2VydmljZTpJRWNoYXJ0U2VydmljZSxhcmVhU2VydmljZTpJQXJlYVNlcnZpY2UsICR0aW1lb3V0OmFueSkge1xyXG4gICAgICAgIGxldCB2bSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZtLmZvcm1hdERhdGFMaXN0ID0gZm9ybWF0RGF0YUxpc3Q7XHJcbiAgICAgICAgdm0uY2hhbmdlVGltZUJ0biA9IGNoYW5nZVRpbWVCdG47XHJcbiAgICAgICAgdm0uc2hvd0N1c3RvbVRpbWUgPSBzaG93Q3VzdG9tVGltZTtcclxuXHJcblxyXG4gICAgICAgIC8v6buY6K6k5YC8XHJcbiAgICAgICAgdm0uYXJlYUNvZGUgPSAnJztcclxuICAgICAgICB2bS5kdXJhdGlvbiA9ICdUSElSWV9EQVlTJztcclxuICAgICAgICB2bS5zdGFydFRpbWUgPSAnJztcclxuICAgICAgICB2bS5lbmRUaW1lID0gJyc7XHJcbiAgICAgICAgdm0uaXNOb0RhdGEgPSB0cnVlO1xyXG5cclxuXHJcbiAgICAgICAgLy8g5ZCR5ZCO5Y+w5Lyg55qE5Y+C5pWwXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldFNlYXJjaFBhcmFtcygpOkFycmF5PFNlYXJjaFBhcmFtcz57XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBuZXcgU2VhcmNoUGFyYW1zKCk7XHJcblxyXG4gICAgICAgICAgICByZXN1bHQuYXJlYUNvZGUgPSB2bS5hcmVhQ29kZTtcclxuICAgICAgICAgICAgcmVzdWx0LmR1cmF0aW9uID0gdm0uZHVyYXRpb247XHJcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydFRpbWUgPSB2bS5zdGFydFRpbWU7XHJcbiAgICAgICAgICAgIHJlc3VsdC5lbmRUaW1lID0gdm0uZW5kVGltZTtcclxuICAgICAgICAgICAgcmVzdWx0Lmdyb3VwVHlwZSA9IFwiR1JPVVBfQllfQ0FNRVJBXCI7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfkvKDlj4InLHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJldHVybiBbcmVzdWx0XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v6I635Y+W5pWw5o2u5YiX6KGoXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RGF0YUxpc3QoKXtcclxuICAgICAgICAgICAgdG90YWxTZXJ2aWNlLmdldEFsYXJtRGF0YUxpc3QoX2dldFNlYXJjaFBhcmFtcygpKS50aGVuKGNvbXBsZXRlKTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVwOlJlc3BvbnNlUmVzdWx0PEZsb3dSZXNwb25zZT4pe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+iuvuWkh+aKk+aLjeS6uua1gemHj+ivt+axguaIkOWKnycscmVwKTtcclxuICAgICAgICAgICAgICAgIGlmKHJlcC5jb2RlID09PSAyMDAgJiYgcmVwLmRhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLmlzTm9EYXRhID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0RGF0YUxpc3QocmVwLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uaXNOb0RhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDliJ3lp4vljJbljLrln5/moJFcclxuICAgICAgICB2bS5hcmVhVHJlZURhdGFQYXJhbXMgPSBuZXcgVHJlZURhdGFQYXJhbXM8QXJlYUV4PigpO1xyXG4gICAgICAgIHZtLmFyZWFUcmVlRGF0YVBhcmFtcy50cmVlSWQgPSAnYXJlYVRyZWVEZXZpY2VGbG93JztcclxuICAgICAgICB2bS5hcmVhVHJlZURhdGFQYXJhbXMuaXNEZWZhdWx0U2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHZtLmFyZWFUcmVlRGF0YVBhcmFtcy5vbkNsaWNrID0gdHJlZVNlbGVjdE5vZGU7XHJcblxyXG4gICAgICAgIC8vIOiOt+WPluWMuuWfn+agkeaVsOaNrlxyXG4gICAgICAgIGZ1bmN0aW9uIGdldFRyZWVMaXN0KCl7XHJcbiAgICAgICAgICAgIGFyZWFTZXJ2aWNlLmZpbmRMaXN0VHJlZSgpLnRoZW4oY29tcGxldGUpO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBjb21wbGV0ZShyZXN1bHQ6IEFycmF5PEFyZWFFeD4pIHtcclxuICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2bS5hcmVhVHJlZURhdGFQYXJhbXMudHJlZURhdGFzID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFRyZWVMaXN0KCk7XHJcblxyXG4gICAgICAgIC8vIOeCueWHu+W9k+WJjeiKgueCueaXtuiOt+WPluiKgueCueS/oeaBr1xyXG4gICAgICAgIGZ1bmN0aW9uIHRyZWVTZWxlY3ROb2RlKGV2ZW50OiBNb3VzZUV2ZW50LCB0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGU6IGFueSkge1xyXG4gICAgICAgICAgICAvL+WMuuWfn0NvZGVcclxuICAgICAgICAgICAgdm0uYXJlYUNvZGUgPSB0cmVlTm9kZS5Db2RlO1xyXG4gICAgICAgICAgICAvL+WMuuWfn+WQjVxyXG4gICAgICAgICAgICB2bS5hcmVhTmFtZSA9IHRyZWVOb2RlLk5hbWU7XHJcbiAgICAgICAgICAgIHZtLmlzU2hvd0FyZWFUcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZtLmR1cmF0aW9uID0gJ1RISVJZX0RBWVMnO1xyXG4gICAgICAgICAgICBnZXREYXRhTGlzdCgpO1xyXG4gICAgICAgICAgICAvL+S4uuS6huinpuWPkeiEj+ajgOafpSDmm7TmlrDop4blm75cclxuICAgICAgICAgICAgJHRpbWVvdXQoKCk9PiB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/ngrnlh7vkuI3lkIzml7bpl7TmrrXmjInpkq5cclxuICAgICAgICBmdW5jdGlvbiBjaGFuZ2VUaW1lQnRuKGR1cmF0aW9uOnN0cmluZyl7XHJcbiAgICAgICAgICAgIHZtLmR1cmF0aW9uID0gZHVyYXRpb247XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmjInpkq4nLHZtLmR1cmF0aW9uKTtcclxuICAgICAgICAgICAgZ2V0RGF0YUxpc3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v6Ieq5a6a5LmJ5pe26Ze0XHJcbiAgICAgICAgZnVuY3Rpb24gc2hvd0N1c3RvbVRpbWUoKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+iHquWumuS5ieaXtumXtOW8gOWniycsdm0uc3RhcnRUaW1lKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+iHquWumuS5ieaXtumXtOe7k+adnycsdm0uZW5kVGltZSk7XHJcbiAgICAgICAgICAgIHZtLmR1cmF0aW9uID0gXCJDVVNUT01JWkVcIjtcclxuICAgICAgICAgICAgZ2V0RGF0YUxpc3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v6K6+5aSH5oqT5ouN5Lq65rWB6YeP5Zu+6KGo5riy5p+TXHJcbiAgICAgICAgZnVuY3Rpb24gZm9ybWF0RGF0YUxpc3Qob3JpZ2luYWxEYXRhOkZsb3dSZXNwb25zZSkge1xyXG4gICAgICAgICAgICBsZXQgeEF4aXNEYXRhOkFycmF5PGFueT4gPSBbXTtcclxuICAgICAgICAgICAgbGV0IHVzZXJOdW06QXJyYXk8YW55PiA9IFtdO1xyXG5cclxuICAgICAgICAgICAgb3JpZ2luYWxEYXRhLkdST1VQX0JZX0NBTUVSQS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtOkZsb3dHcm91cEJ5Q2FtZXJhLCBpbmRleDpudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIHhBeGlzRGF0YS5wdXNoKGl0ZW0uY2FtZXJhTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB1c2VyTnVtLnB1c2goaXRlbS5mbG93TnVtKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZm9ybWF0RGF0YTpvYmplY3QgPXtcclxuICAgICAgICAgICAgICAgIHNlcmllc05hbWU6J+a1gemHj+aVsCcsXHJcbiAgICAgICAgICAgICAgICBncmlkTGVmdDogJzUlJyxcclxuICAgICAgICAgICAgICAgIGdyaWRSaWdodDogJzUlJyxcclxuICAgICAgICAgICAgICAgIHhBeGlzTmFtZTogJ+iuvuWkh+WQjeensCcsXHJcbiAgICAgICAgICAgICAgICB5QXhpc05hbWU6ICfmtYHph4/mlbAnLFxyXG4gICAgICAgICAgICAgICAgbGFiZWxTaG93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6WycjMDZkMWJmJywnIzA2ZDFiZiddLFxyXG4gICAgICAgICAgICAgICAgLy946L205pWw5o2uXHJcbiAgICAgICAgICAgICAgICB4QXhpc0RhdGE6eEF4aXNEYXRhLFxyXG4gICAgICAgICAgICAgICAgLy/mlbDmja5cclxuICAgICAgICAgICAgICAgIHNob3dEYXRhOnVzZXJOdW1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZWNoYXJ0U2VydmljZS5kcmF3RWNoYXJ0KGVjaGFydFNlcnZpY2UuZWNoYXJ0QmFyT3B0aW9uKGZvcm1hdERhdGEpLCdmbG93LTInKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignZGV2aWNlRmxvd0NvbnRyb2xsZXInLCBEZXZpY2VGbG93Q29udHJvbGxlcik7Il19
