define(["require", "exports", "../../../common/app/main.app", "../../../common/directive/tree/tree-params", "../../../common/services/total.service", "../../totalFactory/doEcharts", "../../../common/services/area.service", "echarts"], function (require, exports, main_app_1, tree_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var echarts = require("echarts");
    var SearchParams = (function () {
        function SearchParams() {
        }
        return SearchParams;
    }());
    var LibTaskController = (function () {
        function LibTaskController($scope, totalService, echartService, areaService, $timeout) {
            var vm = this;
            vm.formatDataList = formatDataList;
            vm.areaCode = '';
            vm.isNoData = true;
            function _getSearchParams() {
                var result = new SearchParams();
                result.areaCode = vm.areaCode;
                result.groupType = "GROUP_BY_BIZLIB";
                console.log('传参', result);
                return [result];
            }
            function getDataList() {
                totalService.getAlarmDataList(_getSearchParams()).then(complete);
                function complete(rep) {
                    console.log('库任务请求成功', rep);
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
            vm.areaTreeDataParams = new tree_params_1.TreeDataParams();
            vm.areaTreeDataParams.treeId = 'areaTreeLibTask';
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
                getDataList();
                $timeout(function () {
                    $scope.$apply();
                });
            }
            function formatDataList(originalData) {
                var xAxisData = [];
                var allNum = [];
                var onlineNum = [];
                originalData.GROUP_BY_BIZLIB.forEach(function (item, index) {
                    xAxisData.push(item.bizLib);
                    allNum.push(item.allTaskNum);
                    onlineNum.push(item.onlineTaskNum);
                });
                var formatData = {
                    seriesNameOne: '全部',
                    seriesNameTwo: '运行',
                    gridLeft: '5%',
                    gridRight: '5%',
                    xAxisName: '库',
                    yAxisName: '任务数',
                    colorTwo: ['#7cc3fb'],
                    colorOne: ['#269cf9'],
                    xAxisData: xAxisData,
                    allNum: allNum,
                    onlineNum: onlineNum
                };
                echartService.drawEchart(echartService.echartPileBarOption(formatData), 'task-2');
            }
        }
        LibTaskController.$inject = ["$scope", "totalService", "echartService", 'areaService', '$timeout'];
        return LibTaskController;
    }());
    main_app_1.app.controller('libTaskController', LibTaskController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdG90YWwvdGFzay9saWJUYXNrL2xpYlRhc2suY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFzQkEsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRWpDO1FBQUE7UUFHQSxDQUFDO1FBQUQsbUJBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUVEO1FBbUJJLDJCQUFZLE1BQVcsRUFBRSxZQUEwQixFQUFFLGFBQTRCLEVBQUMsV0FBd0IsRUFBRSxRQUFZO1lBQ3BILElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztZQUVkLEVBQUUsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1lBR25DLEVBQUUsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLEVBQUUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBR25CO2dCQUNJLElBQUksTUFBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7Z0JBRWhDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDOUIsTUFBTSxDQUFDLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQztnQkFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3pCLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLENBQUM7WUFHRDtnQkFDSSxZQUFZLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDakUsa0JBQWtCLEdBQWdDO29CQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDM0IsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7d0JBQzdCLEVBQUUsQ0FBQyxRQUFRLEdBQUcs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bGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHRqIG9uIDIwMTcvNC8yMS5cclxuICovXHJcblxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuXHJcbmltcG9ydCB7SVRvdGFsU2VydmljZX0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy90b3RhbC5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy90b3RhbC5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQge0lFY2hhcnRTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vdG90YWxGYWN0b3J5L2RvRWNoYXJ0c1wiXHJcbmltcG9ydCBcIi4uLy4uL3RvdGFsRmFjdG9yeS9kb0VjaGFydHNcIlxyXG5cclxuaW1wb3J0IHtSZXNwb25zZVJlc3VsdH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5pbXBvcnQge1Rhc2tHcm91cEJ5Qml6TGliLCBUYXNrUmVzcG9uc2V9IGZyb20gXCIuLi8uLi90b3RhbEZhY3RvcnkvdG90YWxSZXNwb25zZVwiXHJcblxyXG5pbXBvcnQge0lUcmVlRGF0YVBhcmFtcywgVHJlZURhdGFQYXJhbXN9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGlyZWN0aXZlL3RyZWUvdHJlZS1wYXJhbXNcIjtcclxuaW1wb3J0IHtBcmVhRXh9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudGl0eS9leC9BcmVhRXhcIjtcclxuaW1wb3J0IHtJQXJlYVNlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvYXJlYS5zZXJ2aWNlXCI7XHJcbmltcG9ydCAnLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FyZWEuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgXCJlY2hhcnRzXCI7XHJcbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTtcclxubGV0IGVjaGFydHMgPSByZXF1aXJlKFwiZWNoYXJ0c1wiKTtcclxuXHJcbmNsYXNzIFNlYXJjaFBhcmFtcyB7XHJcbiAgICBhcmVhQ29kZTogc3RyaW5nO1xyXG4gICAgZ3JvdXBUeXBlOnN0cmluZztcclxufVxyXG5cclxuY2xhc3MgTGliVGFza0NvbnRyb2xsZXJ7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFtcIiRzY29wZVwiLFwidG90YWxTZXJ2aWNlXCIsXCJlY2hhcnRTZXJ2aWNlXCIsJ2FyZWFTZXJ2aWNlJywnJHRpbWVvdXQnXTtcclxuXHJcbiAgICAvL+agvOW8j+WMluaVsOaNrlxyXG4gICAgZm9ybWF0RGF0YUxpc3Q6RnVuY3Rpb247XHJcblxyXG4gICAgLy/ljLrln5/moJFcclxuICAgIGFyZWFUcmVlRGF0YVBhcmFtczpJVHJlZURhdGFQYXJhbXM8QXJlYUV4PjtcclxuICAgIC8v5bGV56S65Yy65Z+f5qCRXHJcbiAgICBpc1Nob3dBcmVhVHJlZTpib29sZWFuO1xyXG5cclxuICAgIC8v5Yy65Z+f5ZCNXHJcbiAgICBhcmVhTmFtZTpzdHJpbmc7XHJcbiAgICAvL+WMuuWfn2NvZGVcclxuICAgIGFyZWFDb2RlOnN0cmluZztcclxuXHJcbiAgICAvL+aXoOaVsOaNruaXtuWxleekulxyXG4gICAgaXNOb0RhdGE6Ym9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGU6IGFueSwgdG90YWxTZXJ2aWNlOklUb3RhbFNlcnZpY2UsIGVjaGFydFNlcnZpY2U6SUVjaGFydFNlcnZpY2UsYXJlYVNlcnZpY2U6SUFyZWFTZXJ2aWNlLCAkdGltZW91dDphbnkpe1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZtLmZvcm1hdERhdGFMaXN0ID0gZm9ybWF0RGF0YUxpc3Q7XHJcblxyXG4gICAgICAgIC8v6buY6K6k5YC8XHJcbiAgICAgICAgdm0uYXJlYUNvZGUgPSAnJztcclxuICAgICAgICB2bS5pc05vRGF0YSA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIOWQkeWQjuWPsOS8oOeahOWPguaVsFxyXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRTZWFyY2hQYXJhbXMoKTpBcnJheTxTZWFyY2hQYXJhbXM+e1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IFNlYXJjaFBhcmFtcygpO1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0LmFyZWFDb2RlID0gdm0uYXJlYUNvZGU7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ncm91cFR5cGUgPSBcIkdST1VQX0JZX0JJWkxJQlwiO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Lyg5Y+CJyxyZXN1bHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gW3Jlc3VsdF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+iOt+WPluaVsOaNruWIl+ihqFxyXG4gICAgICAgIGZ1bmN0aW9uIGdldERhdGFMaXN0KCl7XHJcbiAgICAgICAgICAgIHRvdGFsU2VydmljZS5nZXRBbGFybURhdGFMaXN0KF9nZXRTZWFyY2hQYXJhbXMoKSkudGhlbihjb21wbGV0ZSk7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNvbXBsZXRlKHJlcDpSZXNwb25zZVJlc3VsdDxUYXNrUmVzcG9uc2U+KXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCflupPku7vliqHor7fmsYLmiJDlip8nLHJlcCk7XHJcbiAgICAgICAgICAgICAgICBpZihyZXAuY29kZSA9PT0gMjAwICYmIHJlcC5kYXRhKXtcclxuICAgICAgICAgICAgICAgICAgICB2bS5pc05vRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdERhdGFMaXN0KHJlcC5kYXRhKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLmlzTm9EYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0RGF0YUxpc3QoKTtcclxuXHJcbiAgICAgICAgLy8g5Yid5aeL5YyW5Yy65Z+f5qCRXHJcbiAgICAgICAgdm0uYXJlYVRyZWVEYXRhUGFyYW1zID0gbmV3IFRyZWVEYXRhUGFyYW1zPEFyZWFFeD4oKTtcclxuICAgICAgICB2bS5hcmVhVHJlZURhdGFQYXJhbXMudHJlZUlkID0gJ2FyZWFUcmVlTGliVGFzayc7XHJcbiAgICAgICAgdm0uYXJlYVRyZWVEYXRhUGFyYW1zLmlzRGVmYXVsdFNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB2bS5hcmVhVHJlZURhdGFQYXJhbXMub25DbGljayA9IHRyZWVTZWxlY3ROb2RlO1xyXG5cclxuICAgICAgICAvLyDojrflj5bljLrln5/moJHmlbDmja5cclxuICAgICAgICBmdW5jdGlvbiBnZXRUcmVlTGlzdCgpe1xyXG4gICAgICAgICAgICBhcmVhU2VydmljZS5maW5kTGlzdFRyZWUoKS50aGVuKGNvbXBsZXRlKTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVzdWx0OiBBcnJheTxBcmVhRXg+KSB7XHJcbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uYXJlYVRyZWVEYXRhUGFyYW1zLnRyZWVEYXRhcyA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRUcmVlTGlzdCgpO1xyXG5cclxuICAgICAgICAvLyDngrnlh7vlvZPliY3oioLngrnml7bojrflj5boioLngrnkv6Hmga9cclxuICAgICAgICBmdW5jdGlvbiB0cmVlU2VsZWN0Tm9kZShldmVudDogTW91c2VFdmVudCwgdHJlZUlkOiBzdHJpbmcsIHRyZWVOb2RlOiBhbnkpIHtcclxuICAgICAgICAgICAgLy/ljLrln59Db2RlXHJcbiAgICAgICAgICAgIHZtLmFyZWFDb2RlID0gdHJlZU5vZGUuQ29kZTtcclxuICAgICAgICAgICAgLy/ljLrln5/lkI1cclxuICAgICAgICAgICAgdm0uYXJlYU5hbWUgPSB0cmVlTm9kZS5OYW1lO1xyXG4gICAgICAgICAgICB2bS5pc1Nob3dBcmVhVHJlZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBnZXREYXRhTGlzdCgpO1xyXG4gICAgICAgICAgICAvL+S4uuS6huinpuWPkeiEj+ajgOafpSDmm7TmlrDop4blm75cclxuICAgICAgICAgICAgJHRpbWVvdXQoKCk9PiB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g5biD5o6n5bqT5Lu75Yqh5pWw5Zu+6KGo6YWN572u5riy5p+TXHJcbiAgICAgICAgZnVuY3Rpb24gZm9ybWF0RGF0YUxpc3Qob3JpZ2luYWxEYXRhOlRhc2tSZXNwb25zZSkge1xyXG4gICAgICAgICAgICBsZXQgeEF4aXNEYXRhOkFycmF5PGFueT4gPSBbXTtcclxuICAgICAgICAgICAgbGV0IGFsbE51bTpBcnJheTxhbnk+ID0gW107XHJcbiAgICAgICAgICAgIGxldCBvbmxpbmVOdW06QXJyYXk8YW55PiA9IFtdO1xyXG5cclxuICAgICAgICAgICAgb3JpZ2luYWxEYXRhLkdST1VQX0JZX0JJWkxJQi5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtOlRhc2tHcm91cEJ5Qml6TGliLCBpbmRleDpudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIHhBeGlzRGF0YS5wdXNoKGl0ZW0uYml6TGliKTtcclxuICAgICAgICAgICAgICAgIGFsbE51bS5wdXNoKGl0ZW0uYWxsVGFza051bSk7XHJcbiAgICAgICAgICAgICAgICBvbmxpbmVOdW0ucHVzaChpdGVtLm9ubGluZVRhc2tOdW0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBmb3JtYXREYXRhOm9iamVjdCA9e1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzTmFtZU9uZTon5YWo6YOoJyxcclxuICAgICAgICAgICAgICAgIHNlcmllc05hbWVUd286J+i/kOihjCcsXHJcbiAgICAgICAgICAgICAgICBncmlkTGVmdDogJzUlJyxcclxuICAgICAgICAgICAgICAgIGdyaWRSaWdodDogJzUlJyxcclxuICAgICAgICAgICAgICAgIHhBeGlzTmFtZTogJ+W6kycsXHJcbiAgICAgICAgICAgICAgICB5QXhpc05hbWU6ICfku7vliqHmlbAnLFxyXG4gICAgICAgICAgICAgICAgY29sb3JUd286IFsnIzdjYzNmYiddLFxyXG4gICAgICAgICAgICAgICAgY29sb3JPbmU6IFsgJyMyNjljZjknXSxcclxuICAgICAgICAgICAgICAgIC8veOi9tOaVsOaNrlxyXG4gICAgICAgICAgICAgICAgeEF4aXNEYXRhOnhBeGlzRGF0YSxcclxuICAgICAgICAgICAgICAgIC8v5YWo6YOo5pWw5o2uXHJcbiAgICAgICAgICAgICAgICBhbGxOdW06YWxsTnVtLFxyXG4gICAgICAgICAgICAgICAgLy/mnInmlYjmiJbov5DooYzmlbDmja5cclxuICAgICAgICAgICAgICAgIG9ubGluZU51bTpvbmxpbmVOdW1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZWNoYXJ0U2VydmljZS5kcmF3RWNoYXJ0KGVjaGFydFNlcnZpY2UuZWNoYXJ0UGlsZUJhck9wdGlvbihmb3JtYXREYXRhKSwndGFzay0yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignbGliVGFza0NvbnRyb2xsZXInLCBMaWJUYXNrQ29udHJvbGxlcik7Il19
