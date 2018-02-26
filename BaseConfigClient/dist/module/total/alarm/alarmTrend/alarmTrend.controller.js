define(["require", "exports", "../../../common/app/main.app", "../../../common/directive/tree/tree-params", "../../../common/services/total.service", "../../totalFactory/doEcharts", "../../../common/services/area.service", "angular", "echarts"], function (require, exports, main_app_1, tree_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var echarts = require("echarts");
    var SearchParams = (function () {
        function SearchParams() {
        }
        return SearchParams;
    }());
    var AlarmTrendController = (function () {
        function AlarmTrendController($scope, totalService, echartService, areaService, $timeout) {
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
                result.groupType = "GROUP_BY_DAY";
                console.log('传参', result);
                return [result];
            }
            function getDataList() {
                totalService.getAlarmDataList(_getSearchParams()).then(complete);
                function complete(rep) {
                    console.log('报警趋势请求成功', rep);
                    console.error(vm.duration);
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
            vm.areaTreeDataParams.treeId = 'areaTreeAlarmTrend';
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
                var allAlarmNum = [];
                var area = [];
                var validAlarmNum = [];
                originalData.GROUP_BY_DAY.forEach(function (item, index) {
                    area.push(item.strDate);
                    allAlarmNum.push(item.allAlarmNum);
                    validAlarmNum.push(item.validAlarmNum);
                });
                var formatData = {
                    color: ['#6ae4d9'],
                    xAxisData: area,
                    showData: allAlarmNum
                };
                echartService.drawEchart(echartService.echartLineAreaOption(formatData), 'alarm-2');
            }
        }
        AlarmTrendController.$inject = ['$scope', 'totalService', 'echartService', 'areaService', '$timeout'];
        return AlarmTrendController;
    }());
    main_app_1.app.controller('alarmTrendController', AlarmTrendController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdG90YWwvYWxhcm0vYWxhcm1UcmVuZC9hbGFybVRyZW5kLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBc0JBLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUVqQztRQUFBO1FBTUEsQ0FBQztRQUFELG1CQUFDO0lBQUQsQ0FOQSxBQU1DLElBQUE7SUFFRDtRQWdDSSw4QkFBWSxNQUFXLEVBQUUsWUFBMkIsRUFBRSxhQUE0QixFQUFDLFdBQXdCLEVBQUUsUUFBWTtZQUNySCxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFFZCxFQUFFLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztZQUNuQyxFQUFFLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztZQUNqQyxFQUFFLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztZQUduQyxFQUFFLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNqQixFQUFFLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQztZQUMzQixFQUFFLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUNsQixFQUFFLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNoQixFQUFFLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUduQjtnQkFDSSxJQUFJLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO2dCQUNoQyxNQUFNLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQzlCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDOUIsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNoQyxNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDO2dCQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFB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LE9BQU8sQ0FBQyxDQUFDO29CQUN4QixXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDbkMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzNDLENBQUMsQ0FBQyxDQUFDO2dCQUVILElBQUksVUFBVSxHQUFTO29CQUNuQixLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBRWxCLFNBQVMsRUFBQyxJQUFJO29CQUVkLFFBQVEsRUFBQyxXQUFXO2lCQUN2QixDQUFDO2dCQUNGLGFBQWEsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxFQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZGLENBQUM7UUFFTCxDQUFDO1FBOUlNLDRCQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsY0FBYyxFQUFDLGVBQWUsRUFBQyxhQUFhLEVBQUMsVUFBVSxDQUFDLENBQUM7UUErSXpGLDJCQUFDO0tBaEpELEFBZ0pDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLHNCQUFzQixFQUFFLG9CQUFvQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL3RvdGFsL2FsYXJtL2FsYXJtVHJlbmQvYWxhcm1UcmVuZC5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgdGogb24gMjAxNy80LzIxLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5cclxuaW1wb3J0IHtJVG90YWxTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL3RvdGFsLnNlcnZpY2VcIlxyXG5pbXBvcnQgXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvdG90YWwuc2VydmljZVwiXHJcblxyXG5pbXBvcnQge0lFY2hhcnRTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vdG90YWxGYWN0b3J5L2RvRWNoYXJ0c1wiXHJcbmltcG9ydCBcIi4uLy4uL3RvdGFsRmFjdG9yeS9kb0VjaGFydHNcIlxyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7QWxhcm1SZXNwb25zZSxBbGFybUdyb3VwQnlEYXl9IGZyb20gXCIuLi8uLi90b3RhbEZhY3RvcnkvdG90YWxSZXNwb25zZVwiXHJcblxyXG5pbXBvcnQge0lUcmVlRGF0YVBhcmFtcywgVHJlZURhdGFQYXJhbXN9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGlyZWN0aXZlL3RyZWUvdHJlZS1wYXJhbXNcIjtcclxuaW1wb3J0IHtBcmVhRXh9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudGl0eS9leC9BcmVhRXhcIjtcclxuaW1wb3J0IHtJQXJlYVNlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvYXJlYS5zZXJ2aWNlXCI7XHJcbmltcG9ydCAnLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FyZWEuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgXCJhbmd1bGFyXCI7XHJcbmltcG9ydCBcImVjaGFydHNcIjtcclxuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55O1xyXG5sZXQgZWNoYXJ0cyA9IHJlcXVpcmUoXCJlY2hhcnRzXCIpO1xyXG5cclxuY2xhc3MgU2VhcmNoUGFyYW1zIHtcclxuICAgIGFyZWFDb2RlOiBzdHJpbmc7XHJcbiAgICBkdXJhdGlvbjogc3RyaW5nO1xyXG4gICAgc3RhcnRUaW1lOnN0cmluZztcclxuICAgIGVuZFRpbWU6c3RyaW5nO1xyXG4gICAgZ3JvdXBUeXBlOnN0cmluZztcclxufVxyXG5cclxuY2xhc3MgQWxhcm1UcmVuZENvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsICd0b3RhbFNlcnZpY2UnLCdlY2hhcnRTZXJ2aWNlJywnYXJlYVNlcnZpY2UnLCckdGltZW91dCddO1xyXG5cclxuICAgIC8v5qC85byP5YyW5pWw5o2uXHJcbiAgICBmb3JtYXREYXRhTGlzdDpGdW5jdGlvbjtcclxuXHJcbiAgICAvL+WIh+aNouS4jeWQjOaXtumXtOaMiemSrlxyXG4gICAgY2hhbmdlVGltZUJ0bjpGdW5jdGlvbjtcclxuXHJcbiAgICAvL+WxleekuuiHquWumuS5ieaXtumXtOauteaVsOaNrlxyXG4gICAgc2hvd0N1c3RvbVRpbWU6RnVuY3Rpb247XHJcblxyXG4gICAgLy/ljLrln5/moJFcclxuICAgIGFyZWFUcmVlRGF0YVBhcmFtczpJVHJlZURhdGFQYXJhbXM8QXJlYUV4PjtcclxuICAgIC8v5bGV56S65Yy65Z+f5qCRXHJcbiAgICBpc1Nob3dBcmVhVHJlZTpib29sZWFuO1xyXG5cclxuICAgIC8v5byA5aeL5pe26Ze0XHJcbiAgICBzdGFydFRpbWU6c3RyaW5nO1xyXG4gICAgLy/nu5PmnZ/ml7bpl7RcclxuICAgIGVuZFRpbWU6c3RyaW5nO1xyXG4gICAgLy/ljLrln5/lkI1cclxuICAgIGFyZWFOYW1lOnN0cmluZztcclxuICAgIC8v5Yy65Z+fY29kZVxyXG4gICAgYXJlYUNvZGU6c3RyaW5nO1xyXG4gICAgLy/ml7bpl7TmrrVcclxuICAgIGR1cmF0aW9uOnN0cmluZztcclxuXHJcbiAgICAvL+aXoOaVsOaNruaXtuWxleekulxyXG4gICAgaXNOb0RhdGE6Ym9vbGVhbjtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlOiBhbnksIHRvdGFsU2VydmljZTogSVRvdGFsU2VydmljZSwgZWNoYXJ0U2VydmljZTpJRWNoYXJ0U2VydmljZSxhcmVhU2VydmljZTpJQXJlYVNlcnZpY2UsICR0aW1lb3V0OmFueSkge1xyXG4gICAgICAgIGxldCB2bSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZtLmZvcm1hdERhdGFMaXN0ID0gZm9ybWF0RGF0YUxpc3Q7XHJcbiAgICAgICAgdm0uY2hhbmdlVGltZUJ0biA9IGNoYW5nZVRpbWVCdG47XHJcbiAgICAgICAgdm0uc2hvd0N1c3RvbVRpbWUgPSBzaG93Q3VzdG9tVGltZTtcclxuXHJcbiAgICAgICAgLy/pu5jorqTlgLxcclxuICAgICAgICB2bS5hcmVhQ29kZSA9ICcnO1xyXG4gICAgICAgIHZtLmR1cmF0aW9uID0gJ1RISVJZX0RBWVMnO1xyXG4gICAgICAgIHZtLnN0YXJ0VGltZSA9ICcnO1xyXG4gICAgICAgIHZtLmVuZFRpbWUgPSAnJztcclxuICAgICAgICB2bS5pc05vRGF0YSA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIOWQkeWQjuWPsOS8oOeahOWPguaVsFxyXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRTZWFyY2hQYXJhbXMoKTpBcnJheTxTZWFyY2hQYXJhbXM+e1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IFNlYXJjaFBhcmFtcygpO1xyXG4gICAgICAgICAgICByZXN1bHQuYXJlYUNvZGUgPSB2bS5hcmVhQ29kZTtcclxuICAgICAgICAgICAgcmVzdWx0LmR1cmF0aW9uID0gdm0uZHVyYXRpb247XHJcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydFRpbWUgPSB2bS5zdGFydFRpbWU7XHJcbiAgICAgICAgICAgIHJlc3VsdC5lbmRUaW1lID0gdm0uZW5kVGltZTtcclxuICAgICAgICAgICAgcmVzdWx0Lmdyb3VwVHlwZSA9IFwiR1JPVVBfQllfREFZXCI7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfkvKDlj4InLHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJldHVybiBbcmVzdWx0XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v6I635Y+W5pWw5o2u5YiX6KGoXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RGF0YUxpc3QoKXtcclxuICAgICAgICAgICAgdG90YWxTZXJ2aWNlLmdldEFsYXJtRGF0YUxpc3QoX2dldFNlYXJjaFBhcmFtcygpKS50aGVuKGNvbXBsZXRlKTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVwOlJlc3BvbnNlUmVzdWx0PEFsYXJtUmVzcG9uc2U+KXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmiqXorabotovlir/or7fmsYLmiJDlip8nLHJlcCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHZtLmR1cmF0aW9uKTtcclxuICAgICAgICAgICAgICAgIGlmKHJlcC5jb2RlID09PSAyMDAgJiYgcmVwLmRhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLmlzTm9EYXRhID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0RGF0YUxpc3QocmVwLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uaXNOb0RhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDliJ3lp4vljJbljLrln5/moJFcclxuICAgICAgICB2bS5hcmVhVHJlZURhdGFQYXJhbXMgPSBuZXcgVHJlZURhdGFQYXJhbXM8QXJlYUV4PigpO1xyXG4gICAgICAgIHZtLmFyZWFUcmVlRGF0YVBhcmFtcy50cmVlSWQgPSAnYXJlYVRyZWVBbGFybVRyZW5kJztcclxuICAgICAgICB2bS5hcmVhVHJlZURhdGFQYXJhbXMuaXNEZWZhdWx0U2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHZtLmFyZWFUcmVlRGF0YVBhcmFtcy5vbkNsaWNrID0gdHJlZVNlbGVjdE5vZGU7XHJcblxyXG4gICAgICAgIC8vIOiOt+WPluWMuuWfn+agkeaVsOaNrlxyXG4gICAgICAgIGZ1bmN0aW9uIGdldFRyZWVMaXN0KCl7XHJcbiAgICAgICAgICAgIGFyZWFTZXJ2aWNlLmZpbmRMaXN0VHJlZSgpLnRoZW4oY29tcGxldGUpO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBjb21wbGV0ZShyZXN1bHQ6IEFycmF5PEFyZWFFeD4pIHtcclxuICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2bS5hcmVhVHJlZURhdGFQYXJhbXMudHJlZURhdGFzID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFRyZWVMaXN0KCk7XHJcblxyXG4gICAgICAgIC8vIOeCueWHu+W9k+WJjeiKgueCueaXtuiOt+WPluiKgueCueS/oeaBryAg5qCR5Lya5Yid5aeL5YyW5Lya6LCD55SodHJlZVNlbGVjdE5vZGXkuIDmrKFcclxuICAgICAgICBmdW5jdGlvbiB0cmVlU2VsZWN0Tm9kZShldmVudDogTW91c2VFdmVudCwgdHJlZUlkOiBzdHJpbmcsIHRyZWVOb2RlOiBhbnkpIHtcclxuICAgICAgICAgICAgLy/ljLrln59Db2RlXHJcbiAgICAgICAgICAgIHZtLmFyZWFDb2RlID0gdHJlZU5vZGUuQ29kZTtcclxuICAgICAgICAgICAgLy/ljLrln5/lkI1cclxuICAgICAgICAgICAgdm0uYXJlYU5hbWUgPSB0cmVlTm9kZS5OYW1lO1xyXG4gICAgICAgICAgICB2bS5pc1Nob3dBcmVhVHJlZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2bS5kdXJhdGlvbiA9ICdUSElSWV9EQVlTJztcclxuICAgICAgICAgICAgZ2V0RGF0YUxpc3QoKTtcclxuICAgICAgICAgICAgLy/kuLrkuobop6blj5HohI/mo4Dmn6Ug5pu05paw6KeG5Zu+XHJcbiAgICAgICAgICAgICR0aW1lb3V0KCgpPT4ge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v54K55Ye75LiN5ZCM5pe26Ze05q615oyJ6ZKuXHJcbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlVGltZUJ0bihkdXJhdGlvbjpzdHJpbmcpe1xyXG4gICAgICAgICAgICB2bS5kdXJhdGlvbiA9IGR1cmF0aW9uO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5oyJ6ZKuJyx2bS5kdXJhdGlvbik7XHJcbiAgICAgICAgICAgIGdldERhdGFMaXN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+iHquWumuS5ieaXtumXtFxyXG4gICAgICAgIGZ1bmN0aW9uIHNob3dDdXN0b21UaW1lKCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfoh6rlrprkuYnml7bpl7TlvIDlp4snLHZtLnN0YXJ0VGltZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfoh6rlrprkuYnml7bpl7Tnu5PmnZ8nLHZtLmVuZFRpbWUpO1xyXG4gICAgICAgICAgICB2bS5kdXJhdGlvbiA9IFwiQ1VTVE9NSVpFXCI7XHJcbiAgICAgICAgICAgIGdldERhdGFMaXN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+aKpeitpui2i+WKv+WbvuihqOa4suafk1xyXG4gICAgICAgIGZ1bmN0aW9uIGZvcm1hdERhdGFMaXN0KG9yaWdpbmFsRGF0YTpBbGFybVJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGxldCBhbGxBbGFybU51bTpBcnJheTxhbnk+ID0gW107XHJcbiAgICAgICAgICAgIGxldCBhcmVhOkFycmF5PGFueT4gPSBbXTtcclxuICAgICAgICAgICAgbGV0IHZhbGlkQWxhcm1OdW06QXJyYXk8YW55PiA9IFtdO1xyXG5cclxuICAgICAgICAgICAgb3JpZ2luYWxEYXRhLkdST1VQX0JZX0RBWS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtOkFsYXJtR3JvdXBCeURheSwgaW5kZXg6bnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICBhcmVhLnB1c2goaXRlbS5zdHJEYXRlKTtcclxuICAgICAgICAgICAgICAgIGFsbEFsYXJtTnVtLnB1c2goaXRlbS5hbGxBbGFybU51bSk7XHJcbiAgICAgICAgICAgICAgICB2YWxpZEFsYXJtTnVtLnB1c2goaXRlbS52YWxpZEFsYXJtTnVtKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZm9ybWF0RGF0YTpvYmplY3QgPXtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBbJyM2YWU0ZDknXSxcclxuICAgICAgICAgICAgICAgIC8veOi9tOaVsOaNrlxyXG4gICAgICAgICAgICAgICAgeEF4aXNEYXRhOmFyZWEsXHJcbiAgICAgICAgICAgICAgICAvL+aVsOaNrlxyXG4gICAgICAgICAgICAgICAgc2hvd0RhdGE6YWxsQWxhcm1OdW1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZWNoYXJ0U2VydmljZS5kcmF3RWNoYXJ0KGVjaGFydFNlcnZpY2UuZWNoYXJ0TGluZUFyZWFPcHRpb24oZm9ybWF0RGF0YSksJ2FsYXJtLTInKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignYWxhcm1UcmVuZENvbnRyb2xsZXInLCBBbGFybVRyZW5kQ29udHJvbGxlcik7Il19
