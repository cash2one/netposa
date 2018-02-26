define(["require", "exports", "text!./mainRight.alarmPopup.html", "text!./alarmVideoPopup.html", "text!./alarmMsg.html", "../../common/app/main.app", "../../../core/server/enum/SocketResultTypeEnum", "./alarmPopup.controller", "./alarmVideo.controller", "angular", "../dynamicControl.cache.factory", "../../common/factory/socket.factory"], function (require, exports, alarmPopupHtml, alarmVideoHtml, alarmMsgHtml, main_app_1, SocketResultTypeEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MainRightController = (function () {
        function MainRightController($scope, $timeout, layer, dynamicControlCacheFactory, $compile, socketFactory) {
            var _this = this;
            this.dynamicControlCacheFactory = dynamicControlCacheFactory;
            this.socketFactory = socketFactory;
            this.moduleState = 'realAlarm';
            var vm = this;
            (function () {
                vm.socketFactory.subscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.DeployControl, function (data) {
                    console.log("收到的动态布控推送为", data);
                });
            })();
            setTimeout(function () {
                vm.dataPush();
            }, 5000);
            $scope.$on("$destroy", function () {
                _this.socketFactory.unSubscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.DeployControl);
            });
            vm.dataPush = function () {
                var n = Math.random() * 3 ^ 0;
                var sequence = vm.dataArr.length;
                var scope = $scope.$new();
                scope.data = {
                    site: '深大出口1000--' + sequence,
                    time: "2017-06-01 12:12:52",
                    percent: (60 + sequence) % 101 + "%",
                    name: "测试",
                    sex: ['female', 'male'][1],
                    status: ["有效", "无效", "未处理"][n],
                    statusCode: ["vilid", "invilid", "untreated"][n],
                    subjection: "深圳在逃库",
                    details: "未知",
                    ID: "434343555566661545",
                    imgUrl: ['../../../images/textPic.jpg', '../../../images/textPic.jpg', '../../../images/textPic.jpg'][n],
                    animate: true,
                    sequence: sequence,
                };
                angular.element('.m-dynCtrl-wrapper>.new-msg').removeClass('new-msg');
                angular.element('.m-dynCtrl-wrapper>.m-alarm-list:first-child').before($compile(alarmMsgHtml)(scope)[0]);
                vm.dataArr.push(scope.data);
                dynamicControlCacheFactory.updateAlarmDatas(vm.dataArr);
                vm.alarmMsgAnimate();
            };
            vm.isShowImg = false;
            vm.dataArr = [];
            var nums = Math.random() * 10 | 0 + 1;
            for (var i = 0; i < nums; i++) {
                vm.dataArr.push({
                    site: '深大出口1000' + i,
                    time: "2017-06-01 12:12:52",
                    percent: 90 + i + "%",
                    name: "隔壁老王",
                    sex: ['female', 'male'][i % 2],
                    status: ["有效", "无效", "未处理"][i % 3],
                    statusCode: ["vilid", "invilid", "untreated"][i % 3],
                    subjection: "深圳在逃库",
                    details: "未知",
                    ID: "434343555566661545",
                    imgUrl: ['../../../images/textPic.jpg', '../../../images/textPic.jpg', '../../../images/textPic.jpg'][i % 3],
                    sequence: i,
                });
            }
            ;
            for (var i = 0; i < vm.dataArr.length; i++) {
                var scope = $scope.$new();
                scope.data = vm.dataArr[i];
                angular.element('.m-dynCtrl-wrapper').append($compile(alarmMsgHtml)(scope)[0]);
            }
            ;
            dynamicControlCacheFactory.updateAlarmDatas(vm.dataArr);
            vm.alarmMsgAnimate = function () {
                var newTag = angular.element('.m-dynCtrl-wrapper').find('.m-alarm-list:first-child');
                console.log('展开高度');
                $timeout(function () {
                    newTag.animate({ height: '150px' }, 200);
                    newTag.find('.new-txt').fadeIn(200);
                });
            };
            vm.tabsChange = function (state) {
                vm.moduleState = state;
            };
            vm.mouseoverImg = function (e) {
                angular.element(e.target).parents('.m-alarm-list').find('.play-control').show();
            };
            vm.mouseoutImg = function (e) {
                var elem = angular.element(e.target);
                if (elem.hasClass('m-alarm-list')) {
                    elem.find('.play-control').hide();
                }
                else {
                    elem.parents('.m-alarm-list').find('.play-control').hide();
                }
            };
            vm.disposeAlarm = function (data) {
                var scope = $scope.$new();
                scope.data = data;
                layer.open({
                    type: 1,
                    resize: false,
                    title: false,
                    scope: scope,
                    closeBtn: false,
                    content: alarmPopupHtml,
                    move: false,
                    area: ['950px', "auto"],
                    success: function (id) {
                        console.log(id);
                        angular.element('.layui-layer-content').height("auto").attr('position', 'relative');
                    },
                    end: function () {
                        scope.$destroy();
                    }
                });
            };
            vm.playVideo = function (e, data) {
                e.stopPropagation();
                console.log("open the video");
                var scope = $scope.$new();
                scope.data = data;
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
                    }
                });
            };
            vm.showLargeImg = function (e, imgUrl) {
                e.stopPropagation();
                console.log("show large img");
                layer.open({
                    type: 1,
                    resize: false,
                    title: "原图",
                    content: "<div  class='larger-pic' " +
                        "><img class='layer-larger-img' ng-src=" + imgUrl + "></div>",
                    area: ["50%", 'auto'],
                    success: function (target) {
                        target.find('.layui-layer-title').css({ position: 'relative' });
                        target.height(target.width() * 0.75);
                        target.find('.layui-layer-title').before("<iframe class='f-abs u-iframe-layer'></iframe>");
                        setTimeout(function () {
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
        }
        ;
        MainRightController.$inject = ['$scope', '$timeout', 'layer', 'dynamicControlCacheFactory', '$compile', 'socketFactory'];
        return MainRightController;
    }());
    main_app_1.app.controller("mainRightController", MainRightController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvZHluYW1pY0NvbnRyb2wvbWFpblJpZ2h0L21haW5SaWdodC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWlDQTtRQTRCSSw2QkFBWSxNQUFZLEVBQUUsUUFBYyxFQUFFLEtBQVcsRUFBUywwQkFBc0QsRUFBRSxRQUFjLEVBQVUsYUFBOEI7WUFBNUssaUJBK01DO1lBL002RCwrQkFBMEIsR0FBMUIsMEJBQTBCLENBQTRCO1lBQTBCLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtZQXpCNUssZ0JBQVcsR0FBWSxXQUFXLENBQUM7WUEwQi9CLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztZQUdkLENBQUM7Z0JBQ0csRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkNBQW9CLENBQUMsYUFBYSxFQUFFLFVBQUMsSUFBUztvQkFDckUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBR3BDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUVMLFVBQVUsQ0FBQztnQkFDUCxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEIsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFBO1lBR1AsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7Z0JBQ25CLEtBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLDJDQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3ZFLENBQUMsQ0FBQyxDQUFDO1lBR0gsRUFBRSxDQUFDLFFBQVEsR0FBRztnQkFFTixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7Z0JBRWpDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDMUIsS0FBSyxD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QUFFLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztRQWtOaEgsMEJBQUM7S0E1T0QsQUE0T0MsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMscUJBQXFCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvZHluYW1pY0NvbnRyb2wvbWFpblJpZ2h0L21haW5SaWdodC5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE3LzUvMzEuXHJcbiAqL1xyXG5cclxuLy/pooTlpITnkIbmqKHmnb/mlofku7blvJXlhaVcclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL21haW5SaWdodC5hbGFybVBvcHVwLmh0bWxcIiBuYW1lPVwiYWxhcm1Qb3B1cEh0bWxcIiAvPlxyXG4vL+W9leWDj+W8ueeql1xyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4vYWxhcm1WaWRlb1BvcHVwLmh0bWxcIiBuYW1lPVwiYWxhcm1WaWRlb0h0bWxcIiAvPlxyXG5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL2FsYXJtTXNnLmh0bWxcIiBuYW1lPVwiYWxhcm1Nc2dIdG1sXCIgLz5cclxuXHJcblxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuLy/lvJXlhaXpooTlpITnkIbmqKHmnb9UU+aWh+S7tlxyXG5pbXBvcnQgXCIuL2FsYXJtUG9wdXAuY29udHJvbGxlclwiO1xyXG5pbXBvcnQgXCIuL2FsYXJtVmlkZW8uY29udHJvbGxlclwiO1xyXG5cclxuaW1wb3J0IFwiYW5ndWxhclwiO1xyXG5pbXBvcnQgXCIuLi9keW5hbWljQ29udHJvbC5jYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7SUR5bmFtaWNDb250cm9sQ2FjaGVGYWN0b3J5fSBmcm9tIFwiLi4vZHluYW1pY0NvbnRyb2wuY2FjaGUuZmFjdG9yeVwiO1xyXG5cclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL2ZhY3Rvcnkvc29ja2V0LmZhY3RvcnlcIjtcclxuaW1wb3J0IHtJU29ja2V0RmFjdG9yeX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L3NvY2tldC5mYWN0b3J5XCI7XHJcbmltcG9ydCB7U29ja2V0UmVzdWx0VHlwZUVudW19IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL1NvY2tldFJlc3VsdFR5cGVFbnVtXCI7XHJcblxyXG5cclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXIgOiBhbnk7XHJcbi8v6I635Y+W5qih5p2/5paH5Lu2XHJcbmRlY2xhcmUgbGV0IGFsYXJtUG9wdXBIdG1sIDogYW55O1xyXG5kZWNsYXJlIGxldCBhbGFybVZpZGVvSHRtbCA6IGFueTtcclxuZGVjbGFyZSBsZXQgYWxhcm1Nc2dIdG1sIDogYW55O1xyXG5cclxuY2xhc3MgTWFpblJpZ2h0Q29udHJvbGxlcntcclxuXHJcbiAgICAvL+iusOW9leW9k+WJjXRhYnPnirbmgIFcclxuICAgIG1vZHVsZVN0YXRlIDogc3RyaW5nID0gJ3JlYWxBbGFybSc7XHJcbiAgICAvL+aooeaLn+aVsOaNrlxyXG4gICAgZGF0YUFyciA6IEFycmF5PGFueT47XHJcbiAgICAvL2NsaWNrIHRhYnPliIfmjaJcclxuICAgIHRhYnNDaGFuZ2UgOiBGdW5jdGlvbjtcclxuICAgIC8vY2xpY2sg5oql6K2m5L+h5oGv5by556qX5aSE55CGXHJcbiAgICBkaXNwb3NlQWxhcm0gOiBGdW5jdGlvbjtcclxuICAgIC8vY2xpY2sg5omT5byA5b2V5YOPXHJcbiAgICBwbGF5VmlkZW8gOiBGdW5jdGlvbjtcclxuICAgIC8vY2xpY2sg5p+l55yL5aSn5Zu+XHJcbiAgICBzaG93TGFyZ2VJbWcgOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvL+WbvuWDj+i+heWKqeWKn+iDveaMiemSruaOp+WItlxyXG4gICAgbW91c2VvdmVySW1nIDogRnVuY3Rpb247XHJcbiAgICBtb3VzZW91dEltZyA6IEZ1bmN0aW9uO1xyXG4gICAgaXNTaG93SW1nIDogQm9vbGVhbjtcclxuICAgIC8v5oql6K2m5raI5oGv5Yqo55S7XHJcbiAgICBhbGFybU1zZ0FuaW1hdGUgOiBGdW5jdGlvbjtcclxuXHJcbiAgICBkYXRhUHVzaCA6IEZ1bmN0aW9uO1xyXG5cclxuXHJcblxyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScgLCckdGltZW91dCcgLCdsYXllcicgLCdkeW5hbWljQ29udHJvbENhY2hlRmFjdG9yeScgLCckY29tcGlsZScgLCdzb2NrZXRGYWN0b3J5J107XHJcblxyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlIDogYW55LCAkdGltZW91dCA6IGFueSwgbGF5ZXIgOiBhbnkscHJpdmF0ZSBkeW5hbWljQ29udHJvbENhY2hlRmFjdG9yeTpJRHluYW1pY0NvbnRyb2xDYWNoZUZhY3RvcnksICRjb21waWxlIDogYW55ICxwcml2YXRlIHNvY2tldEZhY3RvcnkgOiBJU29ja2V0RmFjdG9yeSkge1xyXG4gICAgICAgIGxldCB2bSA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8v5o6l5pS2d2Vic29ja2V05raI5oGvXHJcbiAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgdm0uc29ja2V0RmFjdG9yeS5zdWJzY3JpYmUoU29ja2V0UmVzdWx0VHlwZUVudW0uRGVwbG95Q29udHJvbCwgKGRhdGE6IGFueSk9PntcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pS25Yiw55qE5Yqo5oCB5biD5o6n5o6o6YCB5Li6XCIsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgLy/osIPnlKjov73liqDmlbDmja5cclxuICAgICAgICAgICAgICAgIC8vdm0uZGF0YVB1c2goKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2bS5kYXRhUHVzaCgpO1xyXG4gICAgICAgIH0sNTAwMClcclxuXHJcbiAgICAgICAgLy/lj5bmtojmjqXmlLZ3ZWJzb2NrZXTmtojmga9cclxuICAgICAgICAkc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zb2NrZXRGYWN0b3J5LnVuU3Vic2NyaWJlKFNvY2tldFJlc3VsdFR5cGVFbnVtLkRlcGxveUNvbnRyb2wpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL+aooeaLn+aVsOaNrua1i+ivlVxyXG4gICAgICAgIHZtLmRhdGFQdXNoID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBuID0gTWF0aC5yYW5kb20oKSozXjA7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VxdWVuY2UgPSB2bS5kYXRhQXJyLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIC8v5Yib5bu65Y2V54us5L2c55So5Z+fXHJcbiAgICAgICAgICAgICAgICBsZXQgc2NvcGUgPSAkc2NvcGUuJG5ldygpO1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuZGF0YSA9e1xyXG4gICAgICAgICAgICAgICAgICAgIHNpdGUgOiAn5rex5aSn5Ye65Y+jMTAwMC0tJyArIHNlcXVlbmNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWUgOiBcIjIwMTctMDYtMDEgMTI6MTI6NTJcIixcclxuICAgICAgICAgICAgICAgICAgICBwZXJjZW50IDogKDYwKyBzZXF1ZW5jZSklMTAxICsgXCIlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA6IFwi5rWL6K+VXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V4IDogWydmZW1hbGUnLCdtYWxlJ11bMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzIDogW1wi5pyJ5pWIXCIgLFwi5peg5pWIXCIsIFwi5pyq5aSE55CGXCIvKiwgXCLlvoXlrppcIiovXVtuXSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXNDb2RlIDogW1widmlsaWRcIiAsXCJpbnZpbGlkXCIsIFwidW50cmVhdGVkXCIvKiwgXCJ1bmRldGVybWluZWRcIiovXVtuXSxcclxuICAgICAgICAgICAgICAgICAgICBzdWJqZWN0aW9uIDogXCLmt7HlnLPlnKjpgIPlupNcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWxzIDogXCLmnKrnn6VcIixcclxuICAgICAgICAgICAgICAgICAgICBJRCA6IFwiNDM0MzQzNTU1NTY2NjYxNTQ1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW1nVXJsIDogWycuLi8uLi8uLi9pbWFnZXMvdGV4dFBpYy5qcGcnLCcuLi8uLi8uLi9pbWFnZXMvdGV4dFBpYy5qcGcnLCcuLi8uLi8uLi9pbWFnZXMvdGV4dFBpYy5qcGcnXVtuXSxcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZSA6IHNlcXVlbmNlLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnLm0tZHluQ3RybC13cmFwcGVyPi5uZXctbXNnJykucmVtb3ZlQ2xhc3MoJ25ldy1tc2cnKTtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnLm0tZHluQ3RybC13cmFwcGVyPi5tLWFsYXJtLWxpc3Q6Zmlyc3QtY2hpbGQnKS5iZWZvcmUoJGNvbXBpbGUoYWxhcm1Nc2dIdG1sKShzY29wZSlbMF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHZtLmRhdGFBcnIucHVzaChzY29wZS5kYXRhKTtcclxuICAgICAgICAgICAgICAgIC8v5a2Y5YKo5oql6K2m5pWw5o2uXHJcbiAgICAgICAgICAgICAgICBkeW5hbWljQ29udHJvbENhY2hlRmFjdG9yeS51cGRhdGVBbGFybURhdGFzKHZtLmRhdGFBcnIpO1xyXG4gICAgICAgICAgICAgICAgLy/osIPnlKjov73liqDliqjnlLtcclxuICAgICAgICAgICAgICAgIHZtLmFsYXJtTXNnQW5pbWF0ZSgpO1xyXG4gICAgICAgICAgICAvL30pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gdm0uZGF0YVB1c2hcclxuXHJcbiAgICAgICAgdm0uaXNTaG93SW1nID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8v5qih5ouf5pWw5o2uXHJcbiAgICAgICAgdm0uZGF0YUFyciA9IFtdO1xyXG4gICAgICAgIGxldCBudW1zID0gTWF0aC5yYW5kb20oKSAqIDEwIHwgMCArIDE7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG51bXM7IGkrKyl7XHJcbiAgICAgICAgICAgIHZtLmRhdGFBcnIucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBzaXRlIDogJ+a3seWkp+WHuuWPozEwMDAnICsgaSxcclxuICAgICAgICAgICAgICAgIHRpbWUgOiBcIjIwMTctMDYtMDEgMTI6MTI6NTJcIixcclxuICAgICAgICAgICAgICAgIHBlcmNlbnQgOiA5MCArIGkgKyBcIiVcIixcclxuICAgICAgICAgICAgICAgIG5hbWUgOiBcIumalOWjgeiAgeeOi1wiLFxyXG4gICAgICAgICAgICAgICAgc2V4IDogWydmZW1hbGUnLCdtYWxlJ11baSUyXSxcclxuICAgICAgICAgICAgICAgIHN0YXR1cyA6IFtcIuacieaViFwiICxcIuaXoOaViFwiLCBcIuacquWkhOeQhlwiLyosIFwi5b6F5a6aXCIqL11baSUzXSxcclxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGUgOiBbXCJ2aWxpZFwiICxcImludmlsaWRcIiwgXCJ1bnRyZWF0ZWRcIi8qLCBcInVuZGV0ZXJtaW5lZFwiKi9dW2klM10sXHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0aW9uIDogXCLmt7HlnLPlnKjpgIPlupNcIixcclxuICAgICAgICAgICAgICAgIGRldGFpbHMgOiBcIuacquefpVwiLFxyXG4gICAgICAgICAgICAgICAgSUQgOiBcIjQzNDM0MzU1NTU2NjY2MTU0NVwiLFxyXG4gICAgICAgICAgICAgICAgaW1nVXJsIDogWycuLi8uLi8uLi9pbWFnZXMvdGV4dFBpYy5qcGcnLCcuLi8uLi8uLi9pbWFnZXMvdGV4dFBpYy5qcGcnLCcuLi8uLi8uLi9pbWFnZXMvdGV4dFBpYy5qcGcnXVtpJTNdLFxyXG4gICAgICAgICAgICAgICAgc2VxdWVuY2UgOiBpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL+WIneWni+WKoOi9veaVsOaNrlxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB2bS5kYXRhQXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgLy/liJvlu7rljZXni6zkvZznlKjln59cclxuICAgICAgICAgICAgbGV0IHNjb3BlID0gJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICAgICAgc2NvcGUuZGF0YSA9IHZtLmRhdGFBcnJbaV07XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJGNvbXBpbGUoYWxhcm1Nc2dIdG1sKShzY29wZSkpO1xyXG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJy5tLWR5bkN0cmwtd3JhcHBlcicpLmFwcGVuZCgkY29tcGlsZShhbGFybU1zZ0h0bWwpKHNjb3BlKVswXSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/lrZjlgqjmiqXorabmlbDmja5cclxuICAgICAgICBkeW5hbWljQ29udHJvbENhY2hlRmFjdG9yeS51cGRhdGVBbGFybURhdGFzKHZtLmRhdGFBcnIpO1xyXG5cclxuICAgICAgICAvL+aKpeitpuaOqOmAgeWKqOeUu1xyXG4gICAgICAgIHZtLmFsYXJtTXNnQW5pbWF0ZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgdmFyIG5ld1RhZyA9IGFuZ3VsYXIuZWxlbWVudCgnLm0tZHluQ3RybC13cmFwcGVyJykuZmluZCgnLm0tYWxhcm0tbGlzdDpmaXJzdC1jaGlsZCcpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5bGV5byA6auY5bqmJyk7XHJcblxyXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpey8v55WM6Z2i5riy5p+T55qEIG5nLWNsYXNzIOWKoOi9veW7tui/n1xyXG4gICAgICAgICAgICAgICAgbmV3VGFnLmFuaW1hdGUoe2hlaWdodCA6ICcxNTBweCd9LDIwMCk7XHJcbiAgICAgICAgICAgICAgICBuZXdUYWcuZmluZCgnLm5ldy10eHQnKS5mYWRlSW4oMjAwKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vY2xpY2sg5pS55Y+YIHRhYnMg54q25oCBXHJcbiAgICAgICAgdm0udGFic0NoYW5nZSA9IChzdGF0ZSA6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICB2bS5tb2R1bGVTdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vbW91c2VvdmVyIOWbvuWDj+i+heWKqeWKn+iDveaMiemSruaOp+WItlxyXG4gICAgICAgIHZtLm1vdXNlb3ZlckltZyA9IChlIDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLnRhcmdldCkucGFyZW50cygnLm0tYWxhcm0tbGlzdCcpLmZpbmQoJy5wbGF5LWNvbnRyb2wnKS5zaG93KCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9tb3VzZW91dCAg5Zu+5YOP6L6F5Yqp5Yqf6IO95oyJ6ZKu5o6n5Yi2XHJcbiAgICAgICAgdm0ubW91c2VvdXRJbWcgPSAoZSA6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgZWxlbSA9IGFuZ3VsYXIuZWxlbWVudChlLnRhcmdldCk7XHJcbiAgICAgICAgICAgICBpZihlbGVtLmhhc0NsYXNzKCdtLWFsYXJtLWxpc3QnKSl7XHJcbiAgICAgICAgICAgICAgICAgZWxlbS5maW5kKCcucGxheS1jb250cm9sJykuaGlkZSgpXHJcbiAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICBlbGVtLnBhcmVudHMoJy5tLWFsYXJtLWxpc3QnKS5maW5kKCcucGxheS1jb250cm9sJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vY2xpY2sg5by556qX5aSE55CG5oql6K2m5L+h5oGvXHJcbiAgICAgICAgdm0uZGlzcG9zZUFsYXJtID0gKGRhdGEgOiBPYmplY3QpID0+IHtcclxuICAgICAgICAgICAgLy/liJvlu7rlrZDkvZznlKjln59cclxuICAgICAgICAgICAgbGV0IHNjb3BlID0gJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICAgICAgLy/niLbmjqfliLblmajlkJHlrZDmjqfliLblmajkvKDpgJLlgLxcclxuICAgICAgICAgICAgc2NvcGUuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgIC8v5omT5byA5by556qXXHJcbiAgICAgICAgICAgIGxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgdHlwZSA6IDEsXHJcbiAgICAgICAgICAgICAgICByZXNpemUgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHRpdGxlIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzY29wZSA6IHNjb3BlLCAvL+eItuaOp+WItuWZqOWQkeWtkOaOp+WItuWZqOS8oOmAkuWAvFxyXG4gICAgICAgICAgICAgICAgY2xvc2VCdG4gOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgOiBhbGFybVBvcHVwSHRtbCxcclxuICAgICAgICAgICAgICAgIG1vdmUgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGFyZWEgOiBbJzk1MHB4JyAsXCJhdXRvXCJdLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzcyA6IGZ1bmN0aW9uKGlkIDogYW55KXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCcubGF5dWktbGF5ZXItY29udGVudCcpLmhlaWdodChcImF1dG9cIikuYXR0cigncG9zaXRpb24nLCdyZWxhdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVuZCA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTsgIC8v5YWz6Zet5by556qX6ZSA5q+B5L2c55So5Z+fXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9jbGljayDmiZPlvIDop4bpopFcclxuICAgICAgICB2bS5wbGF5VmlkZW8gPSAoZSA6IGFueSAsZGF0YSA6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9wZW4gdGhlIHZpZGVvXCIpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZHluYW1pY0NvbnRyb2xDYWNoZUZhY3RvcnkudXBkYXRlQnRuUGFyYW1zKGZhbHNlKTtcclxuICAgICAgICAgICAgbGV0IHNjb3BlID0gJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICAgICAgc2NvcGUuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgIC8v5omT5byA6KeG6aKRXHJcbiAgICAgICAgICAgIGxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgdHlwZSA6IDEsXHJcbiAgICAgICAgICAgICAgICByZXNpemUgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHRpdGxlIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjbG9zZUJ0biA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2NvcGUgOiBzY29wZSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgOiBhbGFybVZpZGVvSHRtbCxcclxuICAgICAgICAgICAgICAgIGFyZWEgOiBbJzcyMHB4JywgJzQ2NXB4J10sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnLmxheXVpLWxheWVyLWNvbnRlbnQnKS5jc3MoJ292ZXJmbG93JyxcImhpZGRlblwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5omT5byA5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZW5kIDogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vY2xpY2sg5p+l55yL5aSn5Zu+XHJcbiAgICAgICAgdm0uc2hvd0xhcmdlSW1nID0gKGUgOiBhbnkgLCBpbWdVcmwgOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzaG93IGxhcmdlIGltZ1wiKTtcclxuXHJcbiAgICAgICAgICAgIGxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgdHlwZSA6IDEsXHJcbiAgICAgICAgICAgICAgICByZXNpemUgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHRpdGxlIDogXCLljp/lm75cIixcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgOiBcIjxkaXYgIGNsYXNzPSdsYXJnZXItcGljJyBcIiArXHJcbiAgICAgICAgICAgICAgICBcIj48aW1nIGNsYXNzPSdsYXllci1sYXJnZXItaW1nJyBuZy1zcmM9XCIrIGltZ1VybCArXCI+PC9kaXY+XCIsXHJcbiAgICAgICAgICAgICAgICBhcmVhIDogW1wiNTAlXCIgLCdhdXRvJ10sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzIDogZnVuY3Rpb24odGFyZ2V0IDogYW55KXtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuZmluZCgnLmxheXVpLWxheWVyLXRpdGxlJykuY3NzKHtwb3NpdGlvbjoncmVsYXRpdmUnfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmhlaWdodCh0YXJnZXQud2lkdGgoKSAqIDAuNzUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6K6p5by556qX5YaF5a655bGC57qn6auY5LqOT0NY5o+S5Lu26KeG6aKRXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmZpbmQoJy5sYXl1aS1sYXllci10aXRsZScpLmJlZm9yZShcIjxpZnJhbWUgY2xhc3M9J2YtYWJzIHUtaWZyYW1lLWxheWVyJz48L2lmcmFtZT5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW1nT2JqID0gdGFyZ2V0LmZpbmQoJy5sYXllci1sYXJnZXItaW1nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3aWR0aCA9IGltZ09iai53aWR0aCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVpZ2h0ID0gaW1nT2JqLmhlaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih3aWR0aCA+PSBoZWlnaHQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nT2JqLndpZHRoKCcxMDAlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nT2JqLmhlaWdodCgnMTAwJScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0sNCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZW5kIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAvL3Njb3BlLiRkZXN0cm95KCk7ICAvL+WFs+mXreW8ueeql+mUgOavgeS9nOeUqOWfn1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgfTtcclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoXCJtYWluUmlnaHRDb250cm9sbGVyXCIsIE1haW5SaWdodENvbnRyb2xsZXIpO1xyXG4iXX0=
