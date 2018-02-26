define(["require", "exports", "text!../mainRight/alarmVideoPopup.html", "../../common/app/main.app", "../dynamicControlEnum", "angular", "../mainRight/alarmVideo.controller", "../../common/services/area.service", "../../common/services/dynamicControl.service", "../dynamicControl.cache.factory"], function (require, exports, alarmVideoHtml, main_app_1, dynamicControlEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MainLeftController = (function () {
        function MainLeftController($scope, $http, areaService, $timeout, dynamicControlCacheFactory, layer) {
            this.dynamicControlCacheFactory = dynamicControlCacheFactory;
            this.moduleState = 'resource';
            this.pickState = "area";
            this.resourcesType = dynamicControlEnum_1.enumData.resources;
            var vm = this;
            $http({
                method: "get",
                url: "/fds/videoTask/search"
            }).then(function (data) {
                console.log(data);
            });
            vm.camerasId = 'cameras';
            areaService.findAreaCameraTree().then(function (data) {
                vm.camerasData = data;
                console.log(data);
            });
            vm.tabsChange = function (state) {
                vm.moduleState = state;
            };
            vm.resourcesSearch = function () {
                console.log(vm.rSearchKey);
            };
            vm.pickWay = function (state) {
                vm.pickState = state;
            };
            vm.missionSerach = function () {
                console.log(vm.mSerachKey);
            };
            vm.treeClick = function (event, treeId, treeNode) {
                console.log('摄像机---单击');
                console.log(event);
                console.log(treeId);
                console.log(treeNode);
            };
            vm.treeDblClick = function (event, treeId, treeNode) {
                console.log('摄像机---双击');
                console.log(event);
                console.log(treeId);
                console.log(treeNode);
                var scope = $scope.$new();
                scope.data = treeNode;
                layer.open({
                    type: 1,
                    resize: false,
                    title: false,
                    closeBtn: false,
                    scope: scope,
                    content: alarmVideoHtml,
                    area: ['720px', '465px'],
                    success: function () {
                        angular.element('.layui-layer-content').css('overflow', "hidden");
                        console.log('打开成功');
                    },
                    end: function () {
                        scope.$destroy();
                    }
                });
            };
            vm.diyLocation = function (treeId, treeNode) {
                console.log('摄像机---定位');
                console.log(treeId);
                console.log(treeNode);
                console.log(treeNode);
                dynamicControlCacheFactory.getCameraLocate(treeNode);
            };
            vm.diyAttention = function (treeId, treeNode) {
                console.log('摄像机---关注');
                console.log(treeId);
                console.log(treeNode);
            };
        }
        ;
        MainLeftController.$inject = ['$scope', '$http', 'areaService', '$timeout', 'dynamicControlCacheFactory', 'layer'];
        return MainLeftController;
    }());
    main_app_1.app.controller("mainLeftController", MainLeftController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvZHluYW1pY0NvbnRyb2wvbWFpbkxlZnQvbWFpbkxlZnQuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFvQ0E7UUF3Q0ksNEJBQVksTUFBWSxFQUFHLEtBQVcsRUFBRSxXQUEwQixFQUFFLFFBQWMsRUFBVSwwQkFBc0QsRUFBRSxLQUFXO1lBQW5FLCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBNEI7WUFyQ2xKLGdCQUFXLEdBQVksVUFBVSxDQUFDO1lBS2xDLGNBQVMsR0FBWSxNQUFNLENBQUM7WUFJNUIsa0JBQWEsR0FBYSw2QkFBUSxDQUFDLFNBQVMsQ0FBQztZQTZCekMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBRWYsS0FBSyxDQUFDO2dCQUNELE1BQU0sRUFBRyxLQUFLO2dCQUNkLEdBQUcsRUFBRyx1QkFBdUI7YUFDaEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFTLElBQVE7Z0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUE7WUFLRixFQUFFLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUN6QixXQUFXLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUEwQjtnQkFDN0QsRUFBRSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7WUFJSCxFQUFFLENBQUMsVUFBVSxHQUFHLFVBQUMsS0FBYztnQkFDM0IsRUFBRSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFFM0IsQ0FBQyxDQUFDO1lBU0YsRUFBRSxDQUFDLGVBQWUsR0FBRztnQkFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDL0IsQ0FBQyxDQUFDO1lBSUYsRUFBRSxDQUFDLE9BQU8sR0FBRyxVQUFD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ZS9keW5hbWljQ29udHJvbC9tYWluTGVmdC9tYWluTGVmdC5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGNyZWF0ZWQgYnkgWnloIDIwMTcgMDYgMDMgIOWKqOaAgeW4g+aOpy3lt6bkvqfovrnmoI9cclxuICovXHJcblxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uL21haW5SaWdodC9hbGFybVZpZGVvUG9wdXAuaHRtbFwiIG5hbWU9XCJhbGFybVZpZGVvSHRtbFwiIC8+XHJcblxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IFwiYW5ndWxhclwiO1xyXG5cclxuLy/lvJXlhaXpooTlpITnkIbmqKHmnb9UU+aWh+S7tlxyXG5pbXBvcnQgXCIuLi9tYWluUmlnaHQvYWxhcm1WaWRlby5jb250cm9sbGVyXCI7XHJcblxyXG4vL+WMuuWfn+agkVxyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hcmVhLnNlcnZpY2UnO1xyXG5pbXBvcnQge0lBcmVhU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hcmVhLnNlcnZpY2VcIjtcclxuLy/mnprkuL5cclxuaW1wb3J0IHtlbnVtRGF0YX0gZnJvbSBcIi4uL2R5bmFtaWNDb250cm9sRW51bVwiO1xyXG5pbXBvcnQge0FyZWFFeH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0FyZWFFeFwiO1xyXG5pbXBvcnQge0NhbWVyYUV4fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQ2FtZXJhRXhcIjtcclxuXHJcbi8v5Lu75Yqh5o6l5Y+jXHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9keW5hbWljQ29udHJvbC5zZXJ2aWNlXCI7XHJcblxyXG4vL+S4remXtOS8oOWAvOacjeWKoVxyXG5pbXBvcnQgXCIuLi9keW5hbWljQ29udHJvbC5jYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7SUR5bmFtaWNDb250cm9sQ2FjaGVGYWN0b3J5fSBmcm9tIFwiLi4vZHluYW1pY0NvbnRyb2wuY2FjaGUuZmFjdG9yeVwiO1xyXG5cclxuXHJcbmRlY2xhcmUgIHZhciBhbmd1bGFyIDogYW55O1xyXG5kZWNsYXJlIGxldCBhbGFybVZpZGVvSHRtbCA6IGFueTtcclxuXHJcblxyXG4vLzLkuKrnsbvlnovlkIjmiJDkuIDkuKrmlrDnsbvlnotcclxudHlwZSBBcmVhQ2FtZXJhRXggPSBBcmVhRXggJiBDYW1lcmFFeDtcclxuXHJcblxyXG5jbGFzcyBNYWluTGVmdENvbnRyb2xsZXIge1xyXG5cclxuICAgIC8v5bem5L6n5qCPLemhtumDqHRhYuWIh+aNolxyXG4gICAgbW9kdWxlU3RhdGUgOiBzdHJpbmcgPSAncmVzb3VyY2UnO1xyXG4gICAgdGFic0NoYW5nZSA6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8v5Lu75Yqh54q25oCB5qCP562b6YCJ5p2h5Lu26YCJ5oupXHJcbiAgICBwaWNrV2F5IDogRnVuY3Rpb247XHJcbiAgICBwaWNrU3RhdGUgOiBzdHJpbmcgPSBcImFyZWFcIjtcclxuICAgIC8vbWlzc2lvbkRhdGEgOiBhbnk7XHJcblxyXG4gICAgLy/otYTmupDmqKHlnZcg6K2m5YqbLeaRhOWDj+aculxyXG4gICAgcmVzb3VyY2VzVHlwZSA6IE9iamVjdCAgPSBlbnVtRGF0YS5yZXNvdXJjZXM7XHJcbiAgICB0eXBlQ2hlY2tlZCA6IHN0cmluZztcclxuICAgIHJlc291cmNlc1R5cGVDbGljayA6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8v6K+35rGC5pGE5YOP5py65qCR57uT5p6E5pWw5o2uXHJcbiAgICBjYW1lcmFzRGF0YSA6IGFueTtcclxuICAgIGNhbWVyYXNJZCA6IHN0cmluZztcclxuXHJcblxyXG5cclxuICAgIC8v6LWE5rqQ5pCc57SiXHJcbiAgICByZXNvdXJjZXNTZWFyY2ggOiBGdW5jdGlvbjtcclxuICAgIHJTZWFyY2hLZXkgOiBzdHJpbmc7XHJcbiAgICAvL3RyZWUgY2xpY2tcclxuICAgIHRyZWVDbGljayA6IEZ1bmN0aW9uO1xyXG4gICAgLy90cmVlIGRibENsaWNrXHJcbiAgICB0cmVlRGJsQ2xpY2sgOiBGdW5jdGlvbjtcclxuICAgIC8vIHRyZWUgbG9jYXRpb25cclxuICAgIGRpeUxvY2F0aW9uIDogRnVuY3Rpb247XHJcbiAgICAvLyB0cmVlIGF0dGVudGlvblxyXG4gICAgZGl5QXR0ZW50aW9uIDogRnVuY3Rpb247XHJcblxyXG4gICAgLy/ku7vliqHmkJzntKJcclxuICAgIG1pc3Npb25TZXJhY2ggOiBGdW5jdGlvbjtcclxuICAgIG1TZXJhY2hLZXkgOiBzdHJpbmc7XHJcblxyXG4gICAgc3RhdGljICRpbmplY3QgOiBBcnJheTxzdHJpbmc+ID0gWyckc2NvcGUnICwnJGh0dHAnICwnYXJlYVNlcnZpY2UnICwnJHRpbWVvdXQnICwnZHluYW1pY0NvbnRyb2xDYWNoZUZhY3RvcnknICwnbGF5ZXInXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUgOiBhbnksICAkaHR0cCA6IGFueSwgYXJlYVNlcnZpY2UgOiBJQXJlYVNlcnZpY2UsICR0aW1lb3V0IDogYW55ICxwcml2YXRlIGR5bmFtaWNDb250cm9sQ2FjaGVGYWN0b3J5OklEeW5hbWljQ29udHJvbENhY2hlRmFjdG9yeSAsbGF5ZXIgOiBhbnkpIHtcclxuICAgICAgICBsZXQgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kIDogXCJnZXRcIixcclxuICAgICAgICAgICAgdXJsIDogXCIvZmRzL3ZpZGVvVGFzay9zZWFyY2hcIlxyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oZGF0YTphbnkpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgIC8vIGNvbnNvbGUubG9nKFwiNTU1NTU1NTU1NTU1NTU1NTU1NTVcIik7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhtaXNzaW9uRGF0YXMuZ2V0TWlzc2lvbigpKTtcclxuICAgICAgICAvL+ivt+axguaRhOWDj+acuuagkee7k+aehOaVsOaNrlxyXG4gICAgICAgIHZtLmNhbWVyYXNJZCA9ICdjYW1lcmFzJztcclxuICAgICAgICBhcmVhU2VydmljZS5maW5kQXJlYUNhbWVyYVRyZWUoKS50aGVuKChkYXRhIDogQXJyYXk8QXJlYUNhbWVyYUV4PiApPT57XHJcbiAgICAgICAgICAgIHZtLmNhbWVyYXNEYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAvL2NsaWNrIOW3puS+p+agjy3pobbpg6h0YWLliIfmjaJcclxuICAgICAgICB2bS50YWJzQ2hhbmdlID0gKHN0YXRlIDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIHZtLm1vZHVsZVN0YXRlID0gc3RhdGU7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8q5pqC5peg6K2m5YqbIC8vY2xpY2sg6LWE5rqQ5qih5Z2XIOitpuWKmy3mkYTlg4/mnLpcclxuICAgICAgICB2bS5yZXNvdXJjZXNUeXBlQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vdm0udHlwZUNoZWNrZWRcclxuICAgICAgICAgICAgY29uc29sZS5sb2codm0udHlwZUNoZWNrZWQpO1xyXG4gICAgICAgIH07Ki9cclxuXHJcbiAgICAgICAgLy/otYTmupDmqKHlnZct5pCc57SiXHJcbiAgICAgICAgdm0ucmVzb3VyY2VzU2VhcmNoID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh2bS5yU2VhcmNoS2V5KTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgLy/ku7vliqHnirbmgIHmoI/luIXpgInmnaHku7bpgInmi6lcclxuICAgICAgICB2bS5waWNrV2F5ID0gKHN0YXRlIDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIHZtLnBpY2tTdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8v5Lu75Yqh5qih5Z2XLeaQnOe0olxyXG4gICAgICAgIHZtLm1pc3Npb25TZXJhY2ggPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHZtLm1TZXJhY2hLZXkpO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy90cmVlIGNsaWNrXHJcbiAgICAgICAgdm0udHJlZUNsaWNrID0gKGV2ZW50OmFueSwgdHJlZUlkOnN0cmluZywgdHJlZU5vZGU6e30pID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+aRhOWDj+acui0tLeWNleWHuycpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRyZWVJZCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRyZWVOb2RlKTtcclxuICAgICAgICAgICAgLy9hbmd1bGFyLmVsZW1lbnQoJyMnK3RyZWVOb2RlLnRJZClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL3RyZWUgRGJsQ2xpY2tcclxuICAgICAgICB2bS50cmVlRGJsQ2xpY2sgPSAoZXZlbnQ6YW55LCB0cmVlSWQ6YW55LCB0cmVlTm9kZTphbnkpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+aRhOWDj+acui0tLeWPjOWHuycpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRyZWVJZCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRyZWVOb2RlKTtcclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgc2NvcGUgPSAkc2NvcGUuJG5ldygpO1xyXG4gICAgICAgICAgICBzY29wZS5kYXRhID0gdHJlZU5vZGU7XHJcbiAgICAgICAgICAgIGxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgdHlwZSA6IDEsXHJcbiAgICAgICAgICAgICAgICByZXNpemUgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHRpdGxlIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjbG9zZUJ0biA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2NvcGUgOiBzY29wZSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgOiBhbGFybVZpZGVvSHRtbCxcclxuICAgICAgICAgICAgICAgIGFyZWEgOiBbJzcyMHB4JywgJzQ2NXB4J10sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnLmxheXVpLWxheWVyLWNvbnRlbnQnKS5jc3MoJ292ZXJmbG93JyxcImhpZGRlblwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5omT5byA5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZW5kIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL3RyZWUgZGl5TG9jYXRpb25cclxuICAgICAgICB2bS5kaXlMb2NhdGlvbiA9ICh0cmVlSWQ6c3RyaW5nLCB0cmVlTm9kZTp7fSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5pGE5YOP5py6LS0t5a6a5L2NJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRyZWVJZCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRyZWVOb2RlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codHJlZU5vZGUpO1xyXG4gICAgICAgICAgICAvL+iwg+eUqGNlbnRlciDmjqfliLblmajlnLDlm77mlrnms5VcclxuICAgICAgICAgICAgZHluYW1pY0NvbnRyb2xDYWNoZUZhY3RvcnkuZ2V0Q2FtZXJhTG9jYXRlKHRyZWVOb2RlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL3RyZWUgZGl5QXR0ZW50aW9uXHJcbiAgICAgICAgdm0uZGl5QXR0ZW50aW9uID0gKHRyZWVJZDpzdHJpbmcsIHRyZWVOb2RlOnt9KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmkYTlg4/mnLotLS3lhbPms6gnKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codHJlZUlkKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codHJlZU5vZGUpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgfTtcclxuXHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKFwibWFpbkxlZnRDb250cm9sbGVyXCIsIE1haW5MZWZ0Q29udHJvbGxlcik7Il19
