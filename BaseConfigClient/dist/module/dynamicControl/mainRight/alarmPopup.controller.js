define(["require", "exports", "../../common/app/main.app", "../dynamicControlEnum", "../../common/directive/ocx/video.ocx.directive", "../dynamicControl.cache.factory", "angular", "../../common/services/businessLib.service"], function (require, exports, main_app_1, dynamicControlEnum_1, video_ocx_directive_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AlarmPopupController = (function () {
        function AlarmPopupController($scope, layer, dynamicControlCacheFactory, businessLibService) {
            var _this = this;
            this.initComplete = function (ocxControlFunc) {
                console.log("ocx初始化完成", ocxControlFunc);
                _this.videoOcx = ocxControlFunc;
                _this.playRtsp();
            };
            this.playRtsp = function () {
                console.log('播放');
                if (_this.videoOcx) {
                    var opts_1 = new video_ocx_directive_1.VideoOcxRtspOpt();
                    opts_1.url = "rtsp://10.0.10.200:8557/H264";
                    setTimeout(function () {
                        _this.videoOcx.playRtsp(opts_1, 0);
                    }, 20);
                }
            };
            this.stopAll = function () {
                if (_this.videoOcx) {
                    _this.videoOcx.stopAll();
                }
            };
            this.sexArrData = dynamicControlEnum_1.enumData.sexArrayData;
            this.searchData = {
                checkedLib: "",
                sex: "",
                range: "",
            };
            this.searchIsShow = false;
            this.flipPageBtnShow = false;
            this.flipPageListLeft = 0;
            var vm = this;
            $scope.$on('$destory', function () {
                vm.videoOcx = null;
            });
            vm.currentSequence = $scope.data.sequence;
            function _getNewData(curNum, arr) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].sequence === curNum) {
                        return arr[i];
                    }
                }
            }
            ;
            var _newAlarmData = dynamicControlCacheFactory.getAlarmDatas();
            vm.popupWindowData = _getNewData(vm.currentSequence, _newAlarmData);
            vm.popupAlarmPrev = function () {
                var dataArr = dynamicControlCacheFactory.getAlarmDatas();
                vm.currentSequence = vm.currentSequence - 1 < 1 ? 0 : vm.currentSequence - 1;
                console.log(vm.currentSequence);
                vm.popupWindowData = _getNewData(vm.currentSequence, dataArr);
            };
            vm.popupAlarmNext = function () {
                var dataArr = dynamicControlCacheFactory.getAlarmDatas();
                vm.currentSequence = vm.currentSequence + 1 < dataArr.length - 1 ? vm.currentSequence + 1 : dataArr.length - 1;
                console.log(vm.currentSequence);
                vm.popupWindowData = _getNewData(vm.currentSequence, dataArr);
            };
            vm.closePopup = function () {
                console.log('关闭弹窗');
                layer.closeAll();
            };
            vm.showBiggerImg = function (imgUrl) {
                console.log('show bigger img');
                layer.open({
                    type: 1,
                    resize: false,
                    title: "原图",
                    content: "<div  class='larger-pic' " +
                        "><img class='layer-larger-img' ng-src=" + imgUrl + "></div>",
                    area: ['540px', "420px"],
                    success: function (target) {
                        setTimeout(function () {
                            target.find('.layui-layer-title').css({ position: 'relative' });
                            target.find('.layui-layer-title').before("<iframe class='f-abs u-iframe-layer'></iframe>");
                            var imgObj = target.find('.layer-larger-img');
                            var width = imgObj.width();
                            var height = imgObj.height();
                            if (width >= height) {
                                imgObj.width('100%');
                            }
                            else {
                                imgObj.height('100%');
                            }
                            ;
                        }, 4);
                    },
                    end: function () {
                    }
                });
            };
            vm.showTracks = function () {
                console.log('show tracks');
                layer.closeAll();
                window.location.hash = '/intelligentretrieval/trailanalysis';
            };
            vm.clickCheck = function (data) {
                console.log(data);
                if (vm.searchIsShow) {
                    for (var i = 0; i < vm.searchMoreData.length; i++) {
                        if (vm.searchMoreData[i].isChecked) {
                            vm.searchMoreData[i].isChecked = false;
                        }
                        ;
                    }
                    ;
                }
                for (var i = 0; i < vm.searchListData.length; i++) {
                    if (vm.searchListData[i].isChecked) {
                        vm.searchListData[i].isChecked = false;
                    }
                    ;
                }
                data.isChecked = true;
                vm.libCompareData = data;
            };
            vm.flipBtnShow = function () {
                if (vm.searchListData.length > 5) {
                    vm.flipPageBtnShow = true;
                }
                ;
                if (vm.flipPageListWidth - Math.abs(vm.flipPageListLeft) > 600) {
                    vm.flipNextIsShow = true;
                }
                else {
                    vm.flipNextIsShow = false;
                }
            };
            vm.flipBtnHide = function () {
                vm.flipPageBtnShow = false;
            };
            vm.flipPagePrev = function () {
                var listTarget = angular.element('.flip-page-list');
                if (vm.flipPageListLeft < 0) {
                    vm.flipPageListLeft = vm.flipPageListLeft + 600;
                    listTarget.animate({ 'marginLeft': vm.flipPageListLeft }, 300);
                }
            };
            vm.flipPageNext = function () {
                if (vm.flipPageListWidth - Math.abs(vm.flipPageListLeft) > 600) {
                    vm.flipPageListLeft -= 600;
                    angular.element('.flip-page-list').animate({ 'marginLeft': vm.flipPageListLeft }, 300);
                }
            };
            vm.searchListData = (function () {
                var dataArr = [];
                var length = Math.random() * 30 ^ 0 + 1;
                for (var i = 0; i < length; i++) {
                    var n = Math.random() * 10 ^ 0 + 1;
                    dataArr.push({
                        name: "测试" + n + n + n,
                        ID: "9876543219876543X" + n,
                        sex: ["male", 'female'],
                        time: new Date().toLocaleDateString().replace(/[\u4e00-\u9fa5]/g, "-"),
                        percent: 60 + n * 3 + "%",
                        details: "未知",
                        subjection: ["深圳在逃库", "广州库", "优衣库"][n % 3],
                        imgUrl: ['../../../images/textPic.jpg', '../../../images/textPic.jpg', '../../../images/textPic.jpg'][n % 3],
                        isChecked: false,
                    });
                }
                ;
                dataArr[0].isChecked = true;
                return dataArr;
            })();
            setTimeout(function () {
                vm.flipPageListWidth = vm.searchListData.length * 120 | 0;
                angular.element('.flip-page-list').width(vm.flipPageListWidth);
            });
            vm.libCompareData = vm.searchListData[0];
            vm.changToNext = function () {
                for (var i = 0; i < vm.searchListData.length; i++) {
                    if (i !== (vm.searchListData.length - 1) && vm.searchListData[i].isChecked) {
                        vm.searchListData[i].isChecked = false;
                        vm.searchListData[i + 1].isChecked = true;
                        vm.libCompareData = vm.searchListData[i + 1];
                        vm.flipPageListLeft = -(Math.floor((i + 1) / 5) * 600);
                        angular.element('.flip-page-list').animate({ 'marginLeft': vm.flipPageListLeft }, 300);
                        break;
                    }
                    else if ((i + 1) === (vm.searchListData.length - 1)) {
                        vm.flipPageListLeft = -(Math.floor((i + 1) / 5) * 600);
                        angular.element('.flip-page-list').animate({ 'marginLeft': vm.flipPageListLeft }, 300);
                    }
                    ;
                }
            };
            vm.sexCheckClick = function () {
                console.log(vm.searchData);
            };
            vm.searchClick = function () {
                console.log(vm.searchData);
            };
            vm.libsId = "popupLibs";
            vm.searchMore = function () {
                if (_this.searchIsShow) {
                    _this.searchIsShow = false;
                }
                else {
                    console.log('展开');
                    _this.searchIsShow = true;
                    businessLibService.findHasSelfTree()
                        .then(function (resp) {
                        console.log(resp);
                        vm.libsData = resp;
                    });
                }
                ;
            };
            vm.treeClick = function (event, treeId, treeNode) {
                console.log(treeNode);
            };
            vm.searchMoreData = (function () {
                var dataArr = [];
                var length = Math.random() * 30 ^ 0 + 1;
                for (var i = 0; i < length; i++) {
                    var n = Math.random() * 10 ^ 0 + 1;
                    dataArr.push({
                        name: "测试" + n + n + n,
                        ID: "9876543219876543X" + n,
                        sex: ["male", 'female'],
                        time: new Date().toLocaleDateString().replace(/[\u4e00-\u9fa5]/g, "-"),
                        percent: 60 + n * 3 + "%",
                        details: "未知",
                        subjection: ["深圳在逃库", "广州库", "优衣库"][n % 3],
                        imgUrl: ['../../../images/large.jpg', '../../../images/widther.jpg', '../../../images/height.jpg'][n % 3],
                        isChecked: false,
                    });
                }
                ;
                return dataArr;
            })();
            vm.searchMoreCheck = function (data) {
                for (var i = 0; i < vm.searchListData.length; i++) {
                    if (vm.searchListData[i].isChecked) {
                        vm.searchListData[i].isChecked = false;
                    }
                    ;
                }
                ;
                for (var i = 0; i < vm.searchMoreData.length; i++) {
                    if (vm.searchMoreData[i].isChecked) {
                        vm.searchMoreData[i].isChecked = false;
                    }
                    ;
                }
                ;
                data.isChecked = true;
                vm.libCompareData = data;
            };
            vm.validDispose = function () {
                console.log(vm.disposeMsg);
                console.log(vm.libCompareData);
                console.log(vm.popupWindowData);
            };
            vm.inValidDispose = function () {
                console.log(vm.disposeMsg);
                console.log(vm.libCompareData);
                console.log(vm.popupWindowData);
            };
            vm.addAttention = function (id) {
                console.log('收藏ID：' + id);
            };
            vm.deleteThat = function (id) {
                console.log('删除ID：' + id);
            };
        }
        AlarmPopupController.$inject = ['$scope', 'layer', 'dynamicControlCacheFactory', 'businessLibService'];
        return AlarmPopupController;
    }());
    main_app_1.app.controller('alarmPopupController', AlarmPopupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvZHluYW1pY0NvbnRyb2wvbWFpblJpZ2h0L2FsYXJtUG9wdXAuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUE2QkE7UUEwR0ksOEJBQVksTUFBWSxFQUFFLEtBQVcsRUFBRSwwQkFBd0QsRUFBRSxrQkFBd0M7WUFBekksaUJBa1RDO1lBdlpELGlCQUFZLEdBQWMsVUFBQyxjQUFvQztnQkFDM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQ3hDLEtBQUksQ0FBQyxRQUFRLEdBQUcsY0FBYyxDQUFDO2dCQUczQixLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFHeEIsQ0FBQyxDQUFBO1lBR0QsYUFBUSxHQUFjO2dCQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixFQUFFLENBQUEsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUEsQ0FBQztvQkFDZCxJQUFJLE1BQUksR0FBRyxJQUFJLHFDQUFlLEVBQUUsQ0FBQztvQkFDakMsTUFBSSxDQUFDLEdBQUcsR0FBRyw4QkFBOEIsQ0FBQztvQkFDMUMsVUFBVSxDQUFDO3dCQUNQLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDcEMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNWLENBQUM7WUFDTCxDQUFDLENBQUM7WUFHRixZQUFPLEdBQWM7Z0JBQ2pCLEVBQUUsQ0FBQSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFDO29CQUNkLEtBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzVCLENBQUM7WUFDTCxDQUFDLENBQUE7WUFvQkQsZUFBVSxHQUFXLDZCQUFRLENBQUMsWUFBWSxDQUFDO1lBRzNDLGVBQVUsR0FBWTtnQkFDbEIsVUFBVSxFQUFHLEVBQUU7Z0JBQ2YsR0FBRyxFQUFH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NlpDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLHNCQUFzQixFQUFFLG9CQUFvQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2R5bmFtaWNDb250cm9sL21haW5SaWdodC9hbGFybVBvcHVwLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSB6eWggb24gMjAxNy82LzguXHJcbiAqL1xyXG5cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcblxyXG5pbXBvcnQge2VudW1EYXRhfSBmcm9tIFwiLi4vZHluYW1pY0NvbnRyb2xFbnVtXCI7XHJcblxyXG4vL+S4remXtOS8oOWAvOWxglxyXG5pbXBvcnQgXCIuLi9keW5hbWljQ29udHJvbC5jYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7SUR5bmFtaWNDb250cm9sQ2FjaGVGYWN0b3J5fSBmcm9tIFwiLi4vZHluYW1pY0NvbnRyb2wuY2FjaGUuZmFjdG9yeVwiO1xyXG5cclxuLy9PQ1hcclxuaW1wb3J0IHtcclxuICAgIElWaWRlb09jeENvbnRyb2xGdW5jLCBWaWRlb09jeFJlYWxUaW1lT3B0LFxyXG4gICAgVmlkZW9PY3hSdHNwT3B0LCBWaWRlb09jeFJ0c3BNdWx0aXBsZU9wdFxyXG59IGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL29jeC92aWRlby5vY3guZGlyZWN0aXZlXCI7XHJcblxyXG5pbXBvcnQgXCJhbmd1bGFyXCI7XHJcbi8v5p+l6K+i5Lq66IS45bqTXHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9idXNpbmVzc0xpYi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SUJ1c2luZXNzTGliU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9idXNpbmVzc0xpYi5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQge0J1c2luZXNzTGliTGlzdFBhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL0J1c2luZXNzTGliUGFyYW1zXCI7XHJcbmltcG9ydCB7UmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHtCdXNpbmVzc0xpYkV4fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQnVzaW5lc3NMaWJFeFwiO1xyXG5cclxuZGVjbGFyZSB2YXIgYW5ndWxhciA6IGFueTtcclxuXHJcbmNsYXNzIEFsYXJtUG9wdXBDb250cm9sbGVye1xyXG5cclxuICAgIC8vT0NYXHJcbiAgICB2aWRlb09jeDogSVZpZGVvT2N4Q29udHJvbEZ1bmM7XHJcbiAgICAvL09DWOWIneWni+WMllxyXG4gICAgaW5pdENvbXBsZXRlIDogRnVuY3Rpb24gPSAob2N4Q29udHJvbEZ1bmM6IElWaWRlb09jeENvbnRyb2xGdW5jKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJvY3jliJ3lp4vljJblrozmiJBcIiwgb2N4Q29udHJvbEZ1bmMpO1xyXG4gICAgICAgIHRoaXMudmlkZW9PY3ggPSBvY3hDb250cm9sRnVuYztcclxuXHJcbiAgICAgICAgLy9zZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMucGxheVJ0c3AoKTtcclxuICAgICAgICAvL30sMjAwKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/mkq3mlL5cclxuICAgIHBsYXlSdHNwIDogRnVuY3Rpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+aSreaUvicpO1xyXG4gICAgICAgIGlmKHRoaXMudmlkZW9PY3gpe1xyXG4gICAgICAgICAgICBsZXQgb3B0cyA9IG5ldyBWaWRlb09jeFJ0c3BPcHQoKTtcclxuICAgICAgICAgICAgb3B0cy51cmwgPSBcInJ0c3A6Ly8xMC4wLjEwLjIwMDo4NTU3L0gyNjRcIjtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb09jeC5wbGF5UnRzcChvcHRzLCAwKTtcclxuICAgICAgICAgICAgfSwyMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvL+WFs+mXreaJgOaciVxyXG4gICAgc3RvcEFsbCA6IEZ1bmN0aW9uID0gKCk9PntcclxuICAgICAgICBpZih0aGlzLnZpZGVvT2N4KXtcclxuICAgICAgICAgICAgdGhpcy52aWRlb09jeC5zdG9wQWxsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+W9k+WJjeWvueavlOS4reeahCDlupPlm77lg4/mlbDmja5cclxuICAgIGxpYkNvbXBhcmVEYXRhIDogYW55O1xyXG4gICAgLy/liIfmjaLkuIvkuIDkuKrmr5Tlr7nlm77lg4/kv6Hmga9cclxuICAgIGNoYW5nVG9OZXh0IDogRnVuY3Rpb247XHJcblxyXG4gICAgLy/lvLnnqpfmjqXmlLbmlbDmja5cclxuICAgIHBvcHVwV2luZG93RGF0YSA6IE9iamVjdDtcclxuICAgIGN1cnJlbnRTZXF1ZW5jZSA6IGFueTtcclxuICAgIHBvcHVwQWxhcm1QcmV2IDogRnVuY3Rpb247XHJcbiAgICBwb3B1cEFsYXJtTmV4dCA6IEZ1bmN0aW9uO1xyXG4gICAgLy/miqXorabmlbDmja5cclxuICAgIGFsYXJtRGF0YUxlbmd0aCA6IGFueTtcclxuXHJcbiAgICAvL+WFs+mXreW8ueeql1xyXG4gICAgY2xvc2VQb3B1cCA6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8v5oCn5YirXHJcbiAgICBzZXhBcnJEYXRhIDogYW55W10gPSBlbnVtRGF0YS5zZXhBcnJheURhdGE7XHJcblxyXG4gICAgLy/mo4DntKLlj4LmlbDlr7nosaFcclxuICAgIHNlYXJjaERhdGEgOiBPYmplY3QgPSB7XHJcbiAgICAgICAgY2hlY2tlZExpYiA6IFwiXCIsXHJcbiAgICAgICAgc2V4IDogXCJcIixcclxuICAgICAgICByYW5nZSA6IFwiXCIsXHJcbiAgICB9O1xyXG4gICAgLy/mo4DntKLkuovku7ZcclxuICAgIHNlYXJjaENsaWNrIDogRnVuY3Rpb247XHJcbiAgICBzZXhDaGVja0NsaWNrIDogRnVuY3Rpb247XHJcblxyXG4gICAgLy9jbGljayDmo4DntKLmm7TlpJpcclxuICAgIHNlYXJjaE1vcmUgOiBGdW5jdGlvbjtcclxuICAgIHNlYXJjaE1vcmVEYXRhIDphbnk7XHJcbiAgICBzZWFyY2hJc1Nob3cgOiBCb29sZWFuID0gZmFsc2U7XHJcbiAgICBzZWFyY2hNb3JlQ2hlY2sgOiBGdW5jdGlvbjtcclxuICAgIHRyZWVDbGljayA6IEZ1bmN0aW9uO1xyXG4gICAgbGlic0lkIDogc3RyaW5nO1xyXG4gICAgbGlic0RhdGEgOiBhbnk7XHJcblxyXG5cclxuICAgIC8v5p+l55yL5aSn5Zu+XHJcbiAgICBzaG93QmlnZ2VySW1nIDogRnVuY3Rpb247XHJcbiAgICAvL+afpeeci+i9qOi/uVxyXG4gICAgc2hvd1RyYWNrcyA6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8v5qOA57Si5YiX6KGo57+76aG15oyJ6ZKu5pi+6ZqQ5o6n5Yi2XHJcbiAgICBmbGlwUGFnZUJ0blNob3cgOiBCb29sZWFuID0gZmFsc2U7XHJcbiAgICBmbGlwQnRuU2hvdyA6IEZ1bmN0aW9uO1xyXG4gICAgZmxpcEJ0bkhpZGUgOiBGdW5jdGlvbjtcclxuICAgIHNlYXJjaExpc3REYXRhIDogQXJyYXk8YW55PjtcclxuICAgIC8v5LiK5LiL6aG1XHJcbiAgICBmbGlwUGFnZVByZXYgOiBGdW5jdGlvbjtcclxuICAgIGZsaXBQYWdlTmV4dCA6IEZ1bmN0aW9uO1xyXG4gICAgZmxpcFBhZ2VMaXN0TGVmdCA6IGFueSA9IDA7XHJcbiAgICBmbGlwUGFnZUxpc3RXaWR0aCA6IGFueTtcclxuICAgIGZsaXBOZXh0SXNTaG93IDogQm9vbGVhbjsvL+aYr+WQpuaYvuekuuS4i+S4gOmhteaMiemSrlxyXG4gICAgLy/pgInkuK3mjqfliLZcclxuICAgIGNsaWNrQ2hlY2sgOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvL+acieaViCDml6DmlYjlpITnkIZcclxuICAgIHZhbGlkRGlzcG9zZSA6IEZ1bmN0aW9uO1xyXG4gICAgaW5WYWxpZERpc3Bvc2UgOiBGdW5jdGlvbjtcclxuICAgIGRpc3Bvc2VNc2cgOiBhbnk7XHJcblxyXG4gICAgLy/mlLbol49cclxuICAgIGFkZEF0dGVudGlvbiA6IEZ1bmN0aW9uO1xyXG4gICAgLy/liKDpmaRcclxuICAgIGRlbGV0ZVRoYXQgOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsICdsYXllcicgLCdkeW5hbWljQ29udHJvbENhY2hlRmFjdG9yeScgLCdidXNpbmVzc0xpYlNlcnZpY2UnXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUgOiBhbnksIGxheWVyIDogYW55ICxkeW5hbWljQ29udHJvbENhY2hlRmFjdG9yeSA6IElEeW5hbWljQ29udHJvbENhY2hlRmFjdG9yeSAsYnVzaW5lc3NMaWJTZXJ2aWNlIDogSUJ1c2luZXNzTGliU2VydmljZSl7XHJcblxyXG4gICAgICAgIGxldCB2bSA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vT0NYIOmUgOavgVxyXG4gICAgICAgICRzY29wZS4kb24oJyRkZXN0b3J5JyAsKCkgPT4ge1xyXG4gICAgICAgICAgICB2bS52aWRlb09jeCA9IG51bGw7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8qKioqKiAg5oql6K2m5pWw5o2uLS0t5by55Ye656qX5Y+jICAqKioqKi9cclxuICAgICAgICB2bS5jdXJyZW50U2VxdWVuY2UgPSAkc2NvcGUuZGF0YS5zZXF1ZW5jZTtcclxuXHJcbiAgICAgICAgLy/pgY3ljobotoXmib7lr7nlupTmlbDmja5cclxuICAgICAgICBmdW5jdGlvbiBfZ2V0TmV3RGF0YShjdXJOdW0gOiBhbnkgLGFyciA6IGFueSl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoYXJyW2ldLnNlcXVlbmNlID09PSBjdXJOdW0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhcnJbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgIF9uZXdBbGFybURhdGEgPSBkeW5hbWljQ29udHJvbENhY2hlRmFjdG9yeS5nZXRBbGFybURhdGFzKCk7XHJcblxyXG4gICAgICAgIHZtLnBvcHVwV2luZG93RGF0YSA9IF9nZXROZXdEYXRhKHZtLmN1cnJlbnRTZXF1ZW5jZSAsIF9uZXdBbGFybURhdGEpO1xyXG5cclxuICAgICAgICB2bS5wb3B1cEFsYXJtUHJldiA9ICgpID0+IHtcclxuICAgICAgICAgICAgLy/ojrflj5bmnIDmlrDnmoTmiqXorabmlbDmja7nu4RcclxuICAgICAgICAgICAgbGV0IGRhdGFBcnIgPSBkeW5hbWljQ29udHJvbENhY2hlRmFjdG9yeS5nZXRBbGFybURhdGFzKCk7XHJcblxyXG4gICAgICAgICAgICB2bS5jdXJyZW50U2VxdWVuY2UgPSB2bS5jdXJyZW50U2VxdWVuY2UtMSA8IDEgPyAwIDogdm0uY3VycmVudFNlcXVlbmNlLTE7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHZtLmN1cnJlbnRTZXF1ZW5jZSk7XHJcbiAgICAgICAgICAgIC8v5LiK5LiA5LiqXHJcbiAgICAgICAgICAgIHZtLnBvcHVwV2luZG93RGF0YSA9IF9nZXROZXdEYXRhKHZtLmN1cnJlbnRTZXF1ZW5jZSAsIGRhdGFBcnIpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZtLnBvcHVwQWxhcm1OZXh0ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAvL+iOt+WPluacgOaWsOeahOaKpeitpuaVsOaNrue7hFxyXG4gICAgICAgICAgICBsZXQgZGF0YUFyciA9IGR5bmFtaWNDb250cm9sQ2FjaGVGYWN0b3J5LmdldEFsYXJtRGF0YXMoKTtcclxuXHJcbiAgICAgICAgICAgIHZtLmN1cnJlbnRTZXF1ZW5jZSA9IHZtLmN1cnJlbnRTZXF1ZW5jZSsxIDwgZGF0YUFyci5sZW5ndGgtMSA/IHZtLmN1cnJlbnRTZXF1ZW5jZSsxIDogZGF0YUFyci5sZW5ndGgtMTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codm0uY3VycmVudFNlcXVlbmNlKTtcclxuICAgICAgICAgICAgLy/kuIvkuIDkuKpcclxuICAgICAgICAgICAgdm0ucG9wdXBXaW5kb3dEYXRhID0gX2dldE5ld0RhdGEodm0uY3VycmVudFNlcXVlbmNlICwgZGF0YUFycik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKioqKiAg5oql6K2m5pWw5o2uLS0t5by55Ye656qX5Y+jICAqKioqKi9cclxuXHJcblxyXG4gICAgICAgICAgICAvL+WFs+mXreW8ueeql1xyXG4gICAgICAgIHZtLmNsb3NlUG9wdXAgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCflhbPpl63lvLnnqpcnKTtcclxuICAgICAgICAgICAgbGF5ZXIuY2xvc2VBbGwoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL+afpeeci+Wkp+WbvlxyXG4gICAgICAgIHZtLnNob3dCaWdnZXJJbWcgPSAoaW1nVXJsIDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaG93IGJpZ2dlciBpbWcnKTtcclxuICAgICAgICAgICAgbGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICB0eXBlIDogMSxcclxuICAgICAgICAgICAgICAgIHJlc2l6ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6XCLljp/lm75cIixcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6XCI8ZGl2ICBjbGFzcz0nbGFyZ2VyLXBpYycgXCIgK1xyXG4gICAgICAgICAgICAgICAgXCI+PGltZyBjbGFzcz0nbGF5ZXItbGFyZ2VyLWltZycgbmctc3JjPVwiKyBpbWdVcmwgK1wiPjwvZGl2PlwiLFxyXG4gICAgICAgICAgICAgICAgYXJlYTpbJzU0MHB4JyAsXCI0MjBweFwiXSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHRhcmdldCA6IGFueSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQuZmluZCgnLmxheXVpLWxheWVyLXRpdGxlJykuY3NzKHtwb3NpdGlvbjoncmVsYXRpdmUnfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+iuqeW8ueeql+WGheWuueWxgue6p+mrmOS6jk9DWOaPkuS7tuinhumikVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQuZmluZCgnLmxheXVpLWxheWVyLXRpdGxlJykuYmVmb3JlKFwiPGlmcmFtZSBjbGFzcz0nZi1hYnMgdS1pZnJhbWUtbGF5ZXInPjwvaWZyYW1lPlwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbWdPYmogPSB0YXJnZXQuZmluZCgnLmxheWVyLWxhcmdlci1pbWcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdpZHRoID0gaW1nT2JqLndpZHRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoZWlnaHQgPSBpbWdPYmouaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHdpZHRoID49IGhlaWdodCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdPYmoud2lkdGgoJzEwMCUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdPYmouaGVpZ2h0KCcxMDAlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSw0KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlbmQgOiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8v5p+l55yL6L2o6L+5XHJcbiAgICAgICAgdm0uc2hvd1RyYWNrcyA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaG93IHRyYWNrcycpO1xyXG4gICAgICAgICAgICAvL+WFs+mXrWxheWVyXHJcbiAgICAgICAgICAgIGxheWVyLmNsb3NlQWxsKCk7XHJcbiAgICAgICAgICAgIC8v6Lez6L2sLei9qOi/ueWIhuaekFxyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9ICcvaW50ZWxsaWdlbnRyZXRyaWV2YWwvdHJhaWxhbmFseXNpcyc7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqKioqICDmo4DntKLliJfooaggICoqKioqL1xyXG4gICAgICAgIC8v5qOA57Si5YiX6KGo54K55Ye76YCJ5LitXHJcbiAgICAgICAgdm0uY2xpY2tDaGVjayA9IChkYXRhIDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAvL+WtmOWcqOabtOWkmuajgOe0ouWIl+ihqOeahOaXtuWAmSDljrvpmaTliJfooajlhoXnmoTpgInkuK1cclxuICAgICAgICAgICAgaWYodm0uc2VhcmNoSXNTaG93KXtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB2bS5zZWFyY2hNb3JlRGF0YS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih2bS5zZWFyY2hNb3JlRGF0YVtpXS5pc0NoZWNrZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5zZWFyY2hNb3JlRGF0YVtpXS5pc0NoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+aUueWPmOavlOWvueW6k+WGheeahOmAieS4rVxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdm0uc2VhcmNoTGlzdERhdGEubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICBpZih2bS5zZWFyY2hMaXN0RGF0YVtpXS5pc0NoZWNrZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnNlYXJjaExpc3REYXRhW2ldLmlzQ2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYXRhLmlzQ2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHZtLmxpYkNvbXBhcmVEYXRhID0gZGF0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5LiK5LiL6aG15oyJ6ZKu5pi+6ZqQXHJcbiAgICAgICAgdm0uZmxpcEJ0blNob3cgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHZtLnNlYXJjaExpc3REYXRhLmxlbmd0aD41KXtcclxuICAgICAgICAgICAgICAgIHZtLmZsaXBQYWdlQnRuU2hvdyA9IHRydWU7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIC8v5pi+56S65Y+z6L655LiL5LiA6aG15oyJ6ZKuXHJcbiAgICAgICAgICAgIGlmKHZtLmZsaXBQYWdlTGlzdFdpZHRoIC0gTWF0aC5hYnModm0uZmxpcFBhZ2VMaXN0TGVmdCkgPiA2MDApe1xyXG4gICAgICAgICAgICAgICAgdm0uZmxpcE5leHRJc1Nob3cgPSB0cnVlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHZtLmZsaXBOZXh0SXNTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHZtLmZsaXBCdG5IaWRlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB2bS5mbGlwUGFnZUJ0blNob3cgPSBmYWxzZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8v5LiK5LiL6aG15oyJ6ZKu5Yqf6IO9XHJcbiAgICAgICAgdm0uZmxpcFBhZ2VQcmV2ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbGlzdFRhcmdldCA9IGFuZ3VsYXIuZWxlbWVudCgnLmZsaXAtcGFnZS1saXN0Jyk7XHJcbiAgICAgICAgICAgIC8v6I635Y+W5b2T5YmN5bem6L656LedXHJcbiAgICAgICAgICAgIGlmKHZtLmZsaXBQYWdlTGlzdExlZnQgPCAwKXtcclxuICAgICAgICAgICAgICAgIHZtLmZsaXBQYWdlTGlzdExlZnQgPSB2bS5mbGlwUGFnZUxpc3RMZWZ0ICsgNjAwO1xyXG4gICAgICAgICAgICAgICAgbGlzdFRhcmdldC5hbmltYXRlKHsnbWFyZ2luTGVmdCcgOiB2bS5mbGlwUGFnZUxpc3RMZWZ0fSwzMDApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHZtLmZsaXBQYWdlTmV4dCA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYodm0uZmxpcFBhZ2VMaXN0V2lkdGggLSBNYXRoLmFicyh2bS5mbGlwUGFnZUxpc3RMZWZ0KSA+IDYwMCl7XHJcbiAgICAgICAgICAgICAgICB2bS5mbGlwUGFnZUxpc3RMZWZ0IC09IDYwMDtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnLmZsaXAtcGFnZS1saXN0JykuYW5pbWF0ZSh7J21hcmdpbkxlZnQnIDogdm0uZmxpcFBhZ2VMaXN0TGVmdH0sMzAwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIC8v5qih5ouf5pWw5o2uXHJcbiAgICAgICAgdm0uc2VhcmNoTGlzdERhdGEgPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZGF0YUFyciA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgbGVuZ3RoID0gTWF0aC5yYW5kb20oKSozMF4wKzE7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbiA9IE1hdGgucmFuZG9tKCkqMTBeMCsxO1xyXG4gICAgICAgICAgICAgICAgZGF0YUFyci5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lIDogXCLmtYvor5VcIiArIG4gKyBuICsgbixcclxuICAgICAgICAgICAgICAgICAgICBJRCA6IFwiOTg3NjU0MzIxOTg3NjU0M1hcIituLFxyXG4gICAgICAgICAgICAgICAgICAgIHNleCA6IFtcIm1hbGVcIiwnZmVtYWxlJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZSA6IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCkucmVwbGFjZSgvW1xcdTRlMDAtXFx1OWZhNV0vZyxcIi1cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudCA6IDYwICsgbiozICsgXCIlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlscyA6IFwi5pyq55+lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3ViamVjdGlvbiA6IFtcIua3seWcs+WcqOmAg+W6k1wiLFwi5bm/5bee5bqTXCIsXCLkvJjooaPlupNcIl1bbiUzXSxcclxuICAgICAgICAgICAgICAgICAgICBpbWdVcmwgOiBbJy4uLy4uLy4uL2ltYWdlcy90ZXh0UGljLmpwZycsJy4uLy4uLy4uL2ltYWdlcy90ZXh0UGljLmpwZycsJy4uLy4uLy4uL2ltYWdlcy90ZXh0UGljLmpwZyddW24lM10sXHJcbiAgICAgICAgICAgICAgICAgICAgaXNDaGVja2VkIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBkYXRhQXJyWzBdLmlzQ2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhQXJyO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAvL+WKqOaAgeiuvue9ruWbvuWDj+W6k2xpc3TnmoTlrr3luqZcclxuICAgICAgICAgICAgdm0uZmxpcFBhZ2VMaXN0V2lkdGggPSB2bS5zZWFyY2hMaXN0RGF0YS5sZW5ndGggKiAxMjAgfCAwO1xyXG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJy5mbGlwLXBhZ2UtbGlzdCcpLndpZHRoKHZtLmZsaXBQYWdlTGlzdFdpZHRoKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAvL+WIneWni+aXtuWAmSDmr5Tlr7kgKOmAieS4reeahOW6kynlm77lg4/mlbDmja5cclxuICAgICAgICB2bS5saWJDb21wYXJlRGF0YSA9IHZtLnNlYXJjaExpc3REYXRhWzBdO1xyXG4gICAgICAgIC8v5YiH5o2i5LiL5LiA5Liq5q+U5a+55L+h5oGvXHJcbiAgICAgICAgdm0uY2hhbmdUb05leHQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB2bS5zZWFyY2hMaXN0RGF0YS5sZW5ndGg7aSsrKXtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihpICE9PSAodm0uc2VhcmNoTGlzdERhdGEubGVuZ3RoLTEpICYmIHZtLnNlYXJjaExpc3REYXRhW2ldLmlzQ2hlY2tlZCApe1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnNlYXJjaExpc3REYXRhW2ldLmlzQ2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnNlYXJjaExpc3REYXRhW2krMV0uaXNDaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB2bS5saWJDb21wYXJlRGF0YSA9IHZtLnNlYXJjaExpc3REYXRhW2krMV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8v6K6h566X5b2T5YmN5r+A5rS76aG55bqU5Zyo5bGP55qE5L2N572uLOa7keWKqOWIsOWvueW6lOWxj1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLmZsaXBQYWdlTGlzdExlZnQgPSAtKE1hdGguZmxvb3IoKGkrMSkvNSkqNjAwKTtcclxuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJy5mbGlwLXBhZ2UtbGlzdCcpLmFuaW1hdGUoeydtYXJnaW5MZWZ0JyA6IHZtLmZsaXBQYWdlTGlzdExlZnR9LDMwMClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZigoaSsxKSA9PT0gKHZtLnNlYXJjaExpc3REYXRhLmxlbmd0aC0xKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/orqHnrpflvZPliY3mv4DmtLvpobnlupTlnKjlsY/nmoTkvY3nva4s5ruR5Yqo5Yiw5a+55bqU5bGPXHJcbiAgICAgICAgICAgICAgICAgICAgdm0uZmxpcFBhZ2VMaXN0TGVmdCA9IC0oTWF0aC5mbG9vcigoaSsxKS81KSo2MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnLmZsaXAtcGFnZS1saXN0JykuYW5pbWF0ZSh7J21hcmdpbkxlZnQnIDogdm0uZmxpcFBhZ2VMaXN0TGVmdH0sMzAwKVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKioqKiogIOajgOe0ouWIl+ihqCAgKioqKiovXHJcblxyXG5cclxuICAgICAgICAvL3ZtLnNleEFyckRhdGEgPSBlbnVtRGF0YS5zZXhBcnJheURhdGE7XHJcblxyXG4gICAgICAgIC8v5qOA57Si5p2h5Lu2IO+8muaAp+WIq1xyXG4gICAgICAgIHZtLnNleENoZWNrQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHZtLnNlYXJjaERhdGEpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8v54K55Ye75qOA57Si5oyJ6ZKuXHJcbiAgICAgICAgdm0uc2VhcmNoQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHZtLnNlYXJjaERhdGEpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vY2xpY2sg5qOA57Si5pu05aSaXHJcbiAgICAgICAgdm0ubGlic0lkID0gXCJwb3B1cExpYnNcIjtcclxuICAgICAgICB2bS5zZWFyY2hNb3JlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZih0aGlzLnNlYXJjaElzU2hvdyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaElzU2hvdyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5bGV5byAJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hJc1Nob3cgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy/mn6XlupNcclxuICAgICAgICAgICAgICAgIGJ1c2luZXNzTGliU2VydmljZS5maW5kSGFzU2VsZlRyZWUoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXNwIDogUmVzcG9uc2VSZXN1bHQ8QXJyYXk8QnVzaW5lc3NMaWJFeD4+ICkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0ubGlic0RhdGEgPSByZXNwO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy90cmVlIGNsaWNrXHJcbiAgICAgICAgdm0udHJlZUNsaWNrID0gKGV2ZW50OmFueSwgdHJlZUlkOnN0cmluZywgdHJlZU5vZGU6YW55KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRyZWVOb2RlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8v5qOA57Si5pu05aSa5pWw5o2u5YiX6KGoXHJcbiAgICAgICAgdm0uc2VhcmNoTW9yZURhdGEgPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZGF0YUFyciA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgbGVuZ3RoID0gTWF0aC5yYW5kb20oKSozMF4wKzE7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbiA9IE1hdGgucmFuZG9tKCkqMTBeMCsxO1xyXG4gICAgICAgICAgICAgICAgZGF0YUFyci5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lIDogXCLmtYvor5VcIiArIG4gKyBuICsgbixcclxuICAgICAgICAgICAgICAgICAgICBJRCA6IFwiOTg3NjU0MzIxOTg3NjU0M1hcIituLFxyXG4gICAgICAgICAgICAgICAgICAgIHNleCA6IFtcIm1hbGVcIiwnZmVtYWxlJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZSA6IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCkucmVwbGFjZSgvW1xcdTRlMDAtXFx1OWZhNV0vZyxcIi1cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudCA6IDYwICsgbiozICsgXCIlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlscyA6IFwi5pyq55+lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3ViamVjdGlvbiA6IFtcIua3seWcs+WcqOmAg+W6k1wiLFwi5bm/5bee5bqTXCIsXCLkvJjooaPlupNcIl1bbiUzXSxcclxuICAgICAgICAgICAgICAgICAgICBpbWdVcmwgOiBbJy4uLy4uLy4uL2ltYWdlcy9sYXJnZS5qcGcnLCcuLi8uLi8uLi9pbWFnZXMvd2lkdGhlci5qcGcnLCcuLi8uLi8uLi9pbWFnZXMvaGVpZ2h0LmpwZyddW24lM10sXHJcbiAgICAgICAgICAgICAgICAgICAgaXNDaGVja2VkIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YUFycjtcclxuICAgICAgICB9KSgpO1xyXG4gICAgICAgIC8v5qOA57Si5pu05aSa5YiX6KGo54K55Ye75LqL5Lu2XHJcbiAgICAgICAgdm0uc2VhcmNoTW9yZUNoZWNrID0gKGRhdGEgOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgLy/lj5bmtojmr5Tlr7nlupPliJfooajnmoTpgInkuK1cclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHZtLnNlYXJjaExpc3REYXRhLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYodm0uc2VhcmNoTGlzdERhdGFbaV0uaXNDaGVja2VkKXtcclxuICAgICAgICAgICAgICAgICAgICB2bS5zZWFyY2hMaXN0RGF0YVtpXS5pc0NoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIC8v5pS55Y+Y5qOA57Si5pu05aSa5YiX6KGo55qE6YCJ5LitXHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB2bS5zZWFyY2hNb3JlRGF0YS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKHZtLnNlYXJjaE1vcmVEYXRhW2ldLmlzQ2hlY2tlZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uc2VhcmNoTW9yZURhdGFbaV0uaXNDaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBkYXRhLmlzQ2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHZtLmxpYkNvbXBhcmVEYXRhID0gZGF0YTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8v5pyJ5pWI5aSE55CGXHJcbiAgICAgICAgdm0udmFsaWREaXNwb3NlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh2bS5kaXNwb3NlTXNnKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codm0ubGliQ29tcGFyZURhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh2bS5wb3B1cFdpbmRvd0RhdGEpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy/ml6DmlYjlpITnkIZcclxuICAgICAgICB2bS5pblZhbGlkRGlzcG9zZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codm0uZGlzcG9zZU1zZyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHZtLmxpYkNvbXBhcmVEYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codm0ucG9wdXBXaW5kb3dEYXRhKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL+aUtuiXj1xyXG4gICAgICAgIHZtLmFkZEF0dGVudGlvbiA9IChpZCA6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5pS26JePSUTvvJonICsgaWQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy/liKDpmaRcclxuICAgICAgICB2bS5kZWxldGVUaGF0ID0gKGlkIDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliKDpmaRJRO+8micgKyBpZClcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignYWxhcm1Qb3B1cENvbnRyb2xsZXInLCBBbGFybVBvcHVwQ29udHJvbGxlcik7Il19
