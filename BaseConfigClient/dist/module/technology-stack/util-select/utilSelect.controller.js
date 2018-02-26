define(["require", "exports", "../../common/app/main.app", "../../common/services/connectTree.service"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SelectController = (function () {
        function SelectController($scope, connectTreeService) {
            this.$scope = $scope;
            var vm = this;
            vm.testData = [];
            var strArr = [
                {
                    city: "深圳",
                    Attribution: "广东",
                    level: "一线"
                },
                {
                    city: "桂林",
                    Attribution: "广西",
                    level: "三线"
                },
                {
                    city: "昆明",
                    Attribution: "云南",
                    level: "二线"
                },
            ];
            var n = Math.random() * 20 | 0 + 5;
            for (var i = 0; i < n; i++) {
                vm.testData.push(strArr[i % 3]);
            }
            console.log(vm.testData);
            vm.initVal = "深圳市";
            vm.testClick = function (data) {
                console.log('点击事件--选中值为 ：');
                console.log(data);
            };
            vm.listDiyIconFun = function (data) {
                console.log(data);
            };
            vm.camerasId = 'cameras';
            connectTreeService.findAreaCamera().then(function (data) {
                vm.camerasData = data;
                console.log(data);
            });
            vm.treeClick = function (event, treeId, treeNode) {
                console.log('摄像机---单击');
                console.log(treeNode.Name);
                vm.initVal = treeNode.Name;
            };
            vm.treeDblClick = function (event, treeId, treeNode) {
                console.log('摄像机---双击');
            };
            vm.diyLocation = function (treeId, treeNode) {
                console.log('摄像机---定位');
            };
            vm.diyAttention = function (treeId, treeNode) {
                console.log('摄像机---关注');
            };
            $scope.$on("$destroy", function () {
            });
        }
        SelectController.$inject = ["$scope", 'areaService'];
        return SelectController;
    }());
    exports.SelectController = SelectController;
    main_app_1.app.controller("technologyStackSelectController", SelectController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdGVjaG5vbG9neS1zdGFjay91dGlsLXNlbGVjdC91dGlsU2VsZWN0LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBVUE7UUFrQkksMEJBQW9CLE1BQVcsRUFBRyxrQkFBd0M7WUFBdEQsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUMzQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFDZCxFQUFFLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNqQixJQUFJLE1BQU0sR0FBRztnQkFDVDtvQkFDSSxJQUFJLEVBQUcsSUFBSTtvQkFDWCxXQUFXLEVBQUcsSUFBSTtvQkFDbEIsS0FBSyxFQUFHLElBQUk7aUJBQ2Y7Z0JBQ0Q7b0JBQ0ksSUFBSSxFQUFHLElBQUk7b0JBQ1gsV0FBVyxFQUFHLElBQUk7b0JBQ2xCLEtBQUssRUFBRyxJQUFJO2lCQUNmO2dCQUNEO29CQUNJLElBQUksRUFBRyxJQUFJO29CQUNYLFdBQVcsRUFBRyxJQUFJO29CQUNsQixLQUFLLEVBQUcsSUFBSTtpQkFDZjthQUNKLENBQUE7WUFDRCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsRUFBRSxHQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0IsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQztnQkFDdEIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2pDLENBQUM7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6QixFQUFFLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUduQixFQUFFLENBQUMsU0FBUyxHQUFHLFVBQUMsSUFBVTtnQkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixDQUFDLENBQUM7WUFHRixFQUFFLENBQUMsY0FBYyxHQUFHLFVBQUMsSUFBVTtnQkFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixDQUFDLENBQUM7WUFJRixFQUFFLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUN6QixrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUEwQjtnQkFDaEUsRUFBRSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7WUFHSCxFQUFFLENBQUMsU0FBUyxHQUFHLFVBQUMsS0FBUyxFQUFFLE1BQWEsRUFBRSxRQUFZO2dCQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0IsRUFBRSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQy9CLENBQUMsQ0FBQztZQUVGLEVBQUUsQ0FBQyxZQUFZLEdBQUcsVUFBQyxLQUFTLEVBQUUsTUFBVSxFQUFFLFFBQVk7Z0JBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFDO1lBRUYsRUFBRSxDQUFDLFdBQVcsR0FBRyxVQUFDLE1BQWEsRUFBRSxRQUFXO2dCQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQztZQUVGLEVBQUUsQ0FBQyxZQUFZLEdBQUcsVUFBQyxNQUFhLEVBQUUsUUFBVztnQkFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM1QixDQUFDLENBQUM7WUFFRixNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtZQUV2QixDQUFDLENBQUMsQ0FBQztRQUVQLENBQUM7UUF0Rk0sd0JBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztRQXlGL0MsdUJBQUM7S0ExRkQsQUEwRkMsSUFBQTtJQTFGWSw0Q0FBZ0I7SUE0RjdCLGNBQUcsQ0FBQyxVQUFVLENBQUMsaUNBQWlDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvdGVjaG5vbG9neS1zdGFjay91dGlsLXNlbGVjdC91dGlsU2VsZWN0LmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBkZWxsIG9uIDIwMTcvNy80LlxyXG4gKi9cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCB7SUNvbm5lY3RUcmVlU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9jb25uZWN0VHJlZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9jb25uZWN0VHJlZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7QXJlYUV4fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQXJlYUV4XCI7XHJcbmltcG9ydCB7Q2FtZXJhRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9DYW1lcmFFeFwiO1xyXG50eXBlIEFyZWFDYW1lcmFFeCA9IEFyZWFFeCAmIENhbWVyYUV4O1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlbGVjdENvbnRyb2xsZXJ7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFtcIiRzY29wZVwiICwnYXJlYVNlcnZpY2UnXTtcclxuXHJcbiAgICB0ZXN0RGF0YSA6IEFycmF5PGFueT47XHJcblxyXG4gICAgdGVzdENsaWNrIDogRnVuY3Rpb247IC8v54K55Ye75LqL5Lu2XHJcbiAgICBpbml0VmFsIDogc3RyaW5nO1xyXG5cclxuXHJcbiAgICAvL+ivt+axguaRhOWDj+acuuagkee7k+aehOaVsOaNrlxyXG4gICAgY2FtZXJhc0RhdGEgOiBhbnk7XHJcbiAgICBjYW1lcmFzSWQgOiBzdHJpbmc7XHJcbiAgICB0cmVlQ2xpY2sgOiBGdW5jdGlvbjtcclxuICAgIHRyZWVEYmxDbGljayA6IEZ1bmN0aW9uO1xyXG4gICAgZGl5TG9jYXRpb24gOiBGdW5jdGlvbjtcclxuICAgIGRpeUF0dGVudGlvbiA6IEZ1bmN0aW9uO1xyXG4gICAgbGlzdERpeUljb25GdW4gOiBGdW5jdGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55ICwgY29ubmVjdFRyZWVTZXJ2aWNlIDogSUNvbm5lY3RUcmVlU2VydmljZSl7XHJcbiAgICAgICAgbGV0IHZtID0gdGhpcztcclxuICAgICAgICB2bS50ZXN0RGF0YSA9IFtdO1xyXG4gICAgICAgIGxldCBzdHJBcnIgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNpdHkgOiBcIua3seWcs1wiLFxyXG4gICAgICAgICAgICAgICAgQXR0cmlidXRpb24gOiBcIuW5v+S4nFwiLFxyXG4gICAgICAgICAgICAgICAgbGV2ZWwgOiBcIuS4gOe6v1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNpdHkgOiBcIuahguael1wiLFxyXG4gICAgICAgICAgICAgICAgQXR0cmlidXRpb24gOiBcIuW5v+ilv1wiLFxyXG4gICAgICAgICAgICAgICAgbGV2ZWwgOiBcIuS4iee6v1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNpdHkgOiBcIuaYhuaYjlwiLFxyXG4gICAgICAgICAgICAgICAgQXR0cmlidXRpb24gOiBcIuS6keWNl1wiLFxyXG4gICAgICAgICAgICAgICAgbGV2ZWwgOiBcIuS6jOe6v1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXVxyXG4gICAgICAgIGxldCBuID0gTWF0aC5yYW5kb20oKSoyMHwwICsgNTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbjtpKyspe1xyXG4gICAgICAgICAgICB2bS50ZXN0RGF0YS5wdXNoKHN0ckFycltpJTNdKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyh2bS50ZXN0RGF0YSk7XHJcbiAgICAgICAgdm0uaW5pdFZhbCA9IFwi5rex5Zyz5biCXCI7XHJcblxyXG5cclxuICAgICAgICB2bS50ZXN0Q2xpY2sgPSAoZGF0YSA6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn54K55Ye75LqL5Lu2LS3pgInkuK3lgLzkuLog77yaJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8v5YiX6KGo5qih5byP6Ieq5a6a5LmJ5Zu+5qCH5Zue6LCDXHJcbiAgICAgICAgdm0ubGlzdERpeUljb25GdW4gPSAoZGF0YSA6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgLy/or7fmsYLmkYTlg4/mnLrmoJHnu5PmnoTmlbDmja5cclxuICAgICAgICB2bS5jYW1lcmFzSWQgPSAnY2FtZXJhcyc7XHJcbiAgICAgICAgY29ubmVjdFRyZWVTZXJ2aWNlLmZpbmRBcmVhQ2FtZXJhKCkudGhlbigoZGF0YSA6IEFycmF5PEFyZWFDYW1lcmFFeD4gKT0+e1xyXG4gICAgICAgICAgICB2bS5jYW1lcmFzRGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL3RyZWUgY2xpY2tcclxuICAgICAgICB2bS50cmVlQ2xpY2sgPSAoZXZlbnQ6YW55LCB0cmVlSWQ6c3RyaW5nLCB0cmVlTm9kZTphbnkpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+aRhOWDj+acui0tLeWNleWHuycpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0cmVlTm9kZS5OYW1lKTtcclxuICAgICAgICAgICAgdm0uaW5pdFZhbCA9IHRyZWVOb2RlLk5hbWU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL3RyZWUgRGJsQ2xpY2tcclxuICAgICAgICB2bS50cmVlRGJsQ2xpY2sgPSAoZXZlbnQ6YW55LCB0cmVlSWQ6YW55LCB0cmVlTm9kZTphbnkpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+aRhOWDj+acui0tLeWPjOWHuycpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy90cmVlIGRpeUxvY2F0aW9uXHJcbiAgICAgICAgdm0uZGl5TG9jYXRpb24gPSAodHJlZUlkOnN0cmluZywgdHJlZU5vZGU6e30pID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+aRhOWDj+acui0tLeWumuS9jScpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy90cmVlIGRpeUF0dGVudGlvblxyXG4gICAgICAgIHZtLmRpeUF0dGVudGlvbiA9ICh0cmVlSWQ6c3RyaW5nLCB0cmVlTm9kZTp7fSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5pGE5YOP5py6LS0t5YWz5rOoJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLiRvbihcIiRkZXN0cm95XCIsICgpPT57XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcihcInRlY2hub2xvZ3lTdGFja1NlbGVjdENvbnRyb2xsZXJcIiwgU2VsZWN0Q29udHJvbGxlcik7Il19
