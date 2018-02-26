define(["require", "exports", "text!./map-top-tool.html", "../../app/main.app", "css!./map-top-tool.css", "angular"], function (require, exports, mapTopTool, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mapTopToolDirective = (function () {
        function mapTopToolDirective() {
            this.restrict = 'E';
            this.scope = {
                fullScreenChange: "&",
                patternList: "&",
                patternMap: "&",
                layerCheck: "&",
                isMapOfPattern: "=",
                clearAllLayer: "&",
                isShowClearTool: "=",
            };
            this.template = mapTopTool;
            this.replace = true;
            this.transclude = true;
            this.controllerAs = 'mapTopToolDirective';
            this.controller = function ($scope) {
                var vm = this;
                vm.layerCheckData = {
                    camera: true,
                    police: false
                };
                if (!!$scope.isShowClearTool) {
                    vm.isShowClearTool = true;
                    vm.clearAllLayer = $scope.clearAllLayer;
                }
                else {
                    vm.isShowClearTool = false;
                }
                vm.layerListIsShow = false;
                vm.fullScreenState = 'FDS_04_03_03';
                vm.isFullScreen = false;
                vm.isMapOfPattern = !!$scope.isMapOfPattern ? $scope.isMapOfPattern : true;
                $scope.$watch('isMapOfPattern', function (newData, oldData) {
                    vm.isMapOfPattern = newData;
                }, true);
                vm.layerShow = function () {
                    vm.layerListIsShow = true;
                };
                vm.layerHide = function () {
                    vm.layerListIsShow = false;
                };
                vm.fullScreenChange = function () {
                    var currentState = "";
                    if (vm.isFullScreen) {
                        vm.fullScreenState = 'FDS_04_03_03';
                        vm.isFullScreen = false;
                        currentState = 'unfull';
                    }
                    else {
                        vm.isFullScreen = true;
                        currentState = 'full';
                        vm.fullScreenState = 'FDS_04_03_14';
                    }
                    screenControll(currentState);
                    $scope.fullScreenChange({ pattern: currentState });
                };
                function screenControll(state) {
                    if (state === "full") {
                        if (!!document.body.webkitRequestFullScreen) {
                            document.body.webkitRequestFullScreen();
                        }
                        else if (!!document.body.mozRequestFullScreen) {
                            document.body.mozRequestFullScreen();
                        }
                        ;
                        angular.element('div.g-head').hide();
                        angular.element('div.g-main').css('top', "0");
                    }
                    else {
                        if (!!document.webkitCancelFullScreen) {
                            document.webkitCancelFullScreen();
                        }
                        else if (!!document.mozCancelFullScreen) {
                            document.mozCancelFullScreen();
                        }
                        ;
                        angular.element('div.g-head').show();
                        angular.element('div.g-main').css('top', "48px");
                    }
                }
                ;
                vm.patternList = function () {
                    vm.isMapOfPattern = false;
                    !!$scope.patternList && $scope.patternList();
                };
                vm.patternMap = function () {
                    vm.isMapOfPattern = true;
                    !!$scope.patternMap && $scope.patternMap();
                };
                vm.layerCheck = function (type) {
                    if (type === "camera") {
                        vm.layerCheckData.camera = !vm.layerCheckData.camera;
                    }
                    else if (type === "police") {
                        vm.layerCheckData.police = !vm.layerCheckData.police;
                    }
                    ;
                    !!$scope.layerCheck && $scope.layerCheck({ checked: { type: type, check: vm.layerCheckData[type] } });
                };
                $scope.$on('$destory', function () {
                    console.log("销毁指令作用域");
                });
            };
            this.link = function (scope, element, attr, controller) {
            };
        }
        ;
        mapTopToolDirective.instance = function () {
            return new mapTopToolDirective();
        };
        mapTopToolDirective.$inject = ['$scope'];
        return mapTopToolDirective;
    }());
    main_app_1.app.directive('utilMapTopTool', mapTopToolDirective.instance);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS91dGlsLW1hcHRvcC10b29sL21hcC10b3AtdG9vbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBMkJBO1FBRUk7WUF1QkEsYUFBUSxHQUFZLEdBQUcsQ0FBQztZQUN4QixVQUFLLEdBQUc7Z0JBQ0osZ0JBQWdCLEVBQUcsR0FBRztnQkFDdEIsV0FBVyxFQUFHLEdBQUc7Z0JBQ2pCLFVBQVUsRUFBRyxHQUFHO2dCQUNoQixVQUFVLEVBQUcsR0FBRztnQkFDaEIsY0FBYyxFQUFFLEdBQUc7Z0JBQ25CLGFBQWEsRUFBRyxHQUFHO2dCQUNuQixlQUFlLEVBQUcsR0FBRzthQUN4QixDQUFDO1lBQ0YsYUFBUSxHQUFZLFVBQVUsQ0FBQztZQUMvQixZQUFPLEdBQWEsSUFBSSxDQUFDO1lBQ3pCLGVBQVUsR0FBYSxJQUFJLENBQUM7WUFDNUIsaUJBQVksR0FBRyxxQkFBcUIsQ0FBQztZQUVyQyxlQUFVLEdBQUcsVUFBUyxNQUFZO2dCQUMvQixJQUFJLEVBQUUsR0FBRyxJQUEyQixDQUFDO2dCQUdwQyxFQUFFLENBQUMsY0FBYyxHQUFHO29CQUNoQixNQUFNLEVBQUcsSUFBSTtvQkFDYixNQUFNLEVBQUcsS0FBSztpQkFDakIsQ0FBQztnQkFHRixFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFBLENBQUM7b0JBQ3pCLEVBQUUsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO29CQUMxQixFQUFFLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7Z0JBRTVDLENBQUM7Z0JBQUEsSUFBSSxDQUFBLENBQUM7b0JBQ0YsRUFBRSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7Z0JBRS9CLENBQUM7Z0JBR0QsRUFBRSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7Z0JBQzNCLEVBQUUsQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDO2dCQUNwQyxFQUFF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QUFDLENBQUM7WUFFRixTQUFJLEdBQUcsVUFBUyxLQUFXLEVBQUcsT0FBYSxFQUFFLElBQVUsRUFBRSxVQUFnQjtZQUt6RSxDQUFDLENBQUM7UUE1SmEsQ0FBQztRQUFBLENBQUM7UUE4SlYsNEJBQVEsR0FBZjtZQUNJLE1BQU0sQ0FBQyxJQUFJLG1CQUFtQixFQUFFLENBQUM7UUFDckMsQ0FBQztRQWpLTSwyQkFBTyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFtS2hDLDBCQUFDO0tBcEtELEFBb0tDLElBQUE7SUFFRCxjQUFHLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFFLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vZGlyZWN0aXZlL3V0aWwtbWFwdG9wLXRvb2wvbWFwLXRvcC10b29sLmRpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHp5aCBvbiAyMDE3LzYvMjEuXHJcbiAqL1xyXG5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL21hcC10b3AtdG9vbC5odG1sXCIgbmFtZT0nbWFwVG9wVG9vbCcgLz5cclxuXHJcbmltcG9ydCB7YXBwfSBmcm9tICcuLi8uLi9hcHAvbWFpbi5hcHAnO1xyXG5pbXBvcnQgJ2NzcyEuL21hcC10b3AtdG9vbC5jc3MnO1xyXG5cclxuaW1wb3J0ICdhbmd1bGFyJztcclxuXHJcblxyXG5kZWNsYXJlIGxldCBtYXBUb3BUb29sIDogYW55O1xyXG5kZWNsYXJlICBsZXQgYW5ndWxhciA6IGFueTtcclxuZGVjbGFyZSBsZXQgZG9jdW1lbnQgOiBhbnk7XHJcblxyXG4vKlxyXG4gICAgISEgei1pbmRleO+8miA5OTlcclxuICAgIOWbnuiwg+aWueazle+8jOimgeS9v+eUqOWbnuiwg+WPguaVsOaYr++8jOmhu+W4puWQjOWQjeWPguaVsFxyXG5cclxuIDx1dGlsLW1hcC10b3AtdG9vbFxyXG4gICAgZnVsbC1zY3JlZW4tY2hhbmdlPVwiIGZ1bmN0aW9uKHBhdHRlcm4pIFwiPiAgICAgICBAIHBhdHRlcm4gOiBhbnkgID0+ICBmdWxsICDlhajlsY8gICB1bmZ1bGwg6Z2e5YWo5bGPXHJcbiAgICBsYXllci1jbGljaz1cIiBmdW5jdGlvbihjaGVja2VkKSBcIiAgICAgICAgICAgICAgIEAgY2hlY2tlZCA6IFtdICAgPT5cclxuIDwvdXRpbC1tYXAtdG9wLXRvb2w+XHJcblxyXG4gKi9cclxuXHJcbmNsYXNzIG1hcFRvcFRvb2xEaXJlY3RpdmUge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZSddO1xyXG4gICAgY29uc3RydWN0b3IgKCl7fTtcclxuXHJcbiAgICBmdWxsU2NyZWVuU3RhdGUgOiBzdHJpbmc7ICAgLy/lhajlsY/nirbmgIFsYW5ndWFnZVxyXG4gICAgaXNNYXBPZlBhdHRlcm4gOiBCb29sZWFuOyAgIC8v5piv5Zyw5Zu+5qih5byPXHJcbiAgICBpc0Z1bGxTY3JlZW4gOiBCb29sZWFuOyAgICAgLy/mmK/lhajlsY/mqKHlvI9cclxuICAgIGZ1bGxTY3JlZW5DaGFuZ2UgOiBGdW5jdGlvbjsvL+WFqOWxj+aooeW8j+aMiemSrlxyXG4gICAgcGF0dGVybkxpc3QgOiBGdW5jdGlvbjsgICAgIC8v5YiX6KGo5qih5byPXHJcbiAgICBwYXR0ZXJuTWFwIDogRnVuY3Rpb247ICAgICAgLy/lnLDlm77mqKHlvI9cclxuXHJcbiAgICBsYXllckNoZWNrIDogRnVuY3Rpb247ICAgICAgLy/lm77lsYLpgInmi6lcclxuICAgIGxheWVyQ2hlY2tEYXRhIDoge1xyXG4gICAgICAgIGNhbWVyYSA6IGJvb2xlYW4sXHJcbiAgICAgICAgcG9saWNlIDogYm9vbGVhblxyXG4gICAgfSZ7W2tleTpzdHJpbmddOmJvb2xlYW59O1xyXG5cclxuICAgIGxheWVyTGlzdElzU2hvdyA6IEJvb2xlYW47ICAvL+aYvuekuuWbvuWxgumAieaLqeWIl+ihqFxyXG4gICAgbGF5ZXJTaG93IDogRnVuY3Rpb247ICAgICAgIC8v5pi+56S65Zu+5bGC5LiL5ouJ5YiX6KGoXHJcbiAgICBsYXllckhpZGUgOiBGdW5jdGlvbjsgICAgICAgLy/mmL7npLrlm77lsYLkuIvmi4nliJfooahcclxuXHJcbiAgICBpc1Nob3dDbGVhclRvb2wgOiBCb29sZWFuOyAvL+a4hemZpOaMiemSruaYr+WQpuaYvuekulxyXG4gICAgY2xlYXJBbGxMYXllciA6IEZ1bmN0aW9uOyAgICAgIC8v5riF6Zmk5Zu+5bGC5oyJ6ZKuXHJcblxyXG5cclxuICAgIHJlc3RyaWN0IDogc3RyaW5nID0gJ0UnO1xyXG4gICAgc2NvcGUgPSB7XHJcbiAgICAgICAgZnVsbFNjcmVlbkNoYW5nZSA6IFwiJlwiLCAgIC8v5YWo5bGP5qih5byP5Zue6LCDXHJcbiAgICAgICAgcGF0dGVybkxpc3QgOiBcIiZcIiwgICAgICAgIC8v5YiX6KGo5qih5byP5Zue6LCDXHJcbiAgICAgICAgcGF0dGVybk1hcCA6IFwiJlwiLCAgICAgICAgIC8v5Zyw5Zu+5qih5byP5Zue6LCDXHJcbiAgICAgICAgbGF5ZXJDaGVjayA6IFwiJlwiLCAgICAgICAgIC8v5Zu+5bGC6YCJ5oup5Zue6LCDXHJcbiAgICAgICAgaXNNYXBPZlBhdHRlcm4gOlwiPVwiLCAgICAgIC8v5a+55aSW5o+Q5L6b5pyN5Yqh5omA6ZyA55qE5Y+Y6YeP77yM55So5LqO5pS55Y+Y5oyH5Luk5YaF6YOo54q25oCBXHJcbiAgICAgICAgY2xlYXJBbGxMYXllciA6IFwiJlwiLCAgICAgIC8v5riF6Zmk5omA5pyJ5Zu+5bGCICAgIO+8iOWSjCBjbGVhckFsbExheWVyIOS4gOi1t+S9v+eUqO+8iVxyXG4gICAgICAgIGlzU2hvd0NsZWFyVG9vbCA6IFwiPVwiLCAgICAvL+aYr+WQpuaYvuekuua4hemZpOaMiemSriDvvIjlkowgY2xlYXJBbGxMYXllciDkuIDotbfkvb/nlKjvvIlcclxuICAgIH07XHJcbiAgICB0ZW1wbGF0ZSA6IHN0cmluZyA9IG1hcFRvcFRvb2w7XHJcbiAgICByZXBsYWNlIDogQm9vbGVhbiA9IHRydWU7XHJcbiAgICB0cmFuc2NsdWRlIDogQm9vbGVhbiA9IHRydWU7XHJcbiAgICBjb250cm9sbGVyQXMgPSAnbWFwVG9wVG9vbERpcmVjdGl2ZSc7XHJcblxyXG4gICAgY29udHJvbGxlciA9IGZ1bmN0aW9uKCRzY29wZSA6IGFueSl7XHJcbiAgICAgICBsZXQgdm0gPSB0aGlzIGFzIG1hcFRvcFRvb2xEaXJlY3RpdmU7XHJcblxyXG4gICAgICAgIC8v6buY6K6k6YCJ5Lit5pGE5YOP5py6XHJcbiAgICAgICAgdm0ubGF5ZXJDaGVja0RhdGEgPSB7XHJcbiAgICAgICAgICAgIGNhbWVyYSA6IHRydWUsXHJcbiAgICAgICAgICAgIHBvbGljZSA6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/liJ3lp4vphY3nva7mjInpkq7nu4RcclxuICAgICAgICBpZighISRzY29wZS5pc1Nob3dDbGVhclRvb2wpe1xyXG4gICAgICAgICAgICB2bS5pc1Nob3dDbGVhclRvb2wgPSB0cnVlO1xyXG4gICAgICAgICAgICB2bS5jbGVhckFsbExheWVyID0gJHNjb3BlLmNsZWFyQWxsTGF5ZXI7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ+WIneWni+WKoOi9vScpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB2bS5pc1Nob3dDbGVhclRvb2wgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygn5Yid5aeL6ZqQ6JePJyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdm0ubGF5ZXJMaXN0SXNTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgdm0uZnVsbFNjcmVlblN0YXRlID0gJ0ZEU18wNF8wM18wMyc7XHJcbiAgICAgICAgdm0uaXNGdWxsU2NyZWVuID0gZmFsc2U7XHJcbiAgICAgICAgdm0uaXNNYXBPZlBhdHRlcm4gPSAhISRzY29wZS5pc01hcE9mUGF0dGVybj8kc2NvcGUuaXNNYXBPZlBhdHRlcm46dHJ1ZTtcclxuXHJcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnaXNNYXBPZlBhdHRlcm4nLCBmdW5jdGlvbiAobmV3RGF0YTpib29sZWFuLG9sZERhdGE6Ym9vbGVhbil7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCIlYyA9PT09PT09PT09dGFibGVIYXNDaGVjayDmlLnlj5ggPT09PT09PT09PT09PT1cIixcImNvbG9yOmdyZWVuXCIpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwi5pawXCIgKyBuZXdEYXRhLFwi5penXCIgK29sZERhdGEpO1xyXG4gICAgICAgICAgICB2bS5pc01hcE9mUGF0dGVybiA9IG5ld0RhdGE7XHJcbiAgICAgICAgfSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIC8v5pi+56S65Zu+5bGC5oyJ6ZKu5LiL5ouJ5YiX6KGoXHJcbiAgICAgICAgdm0ubGF5ZXJTaG93ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB2bS5sYXllckxpc3RJc1Nob3cgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8v6ZqQ6JeP5Zu+5bGC5oyJ6ZKu5LiL5ouJ5YiX6KGoXHJcbiAgICAgICAgdm0ubGF5ZXJIaWRlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB2bS5sYXllckxpc3RJc1Nob3cgPSBmYWxzZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL+WFqOWxj+aOp+WItlxyXG4gICAgICAgIHZtLmZ1bGxTY3JlZW5DaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgbGV0IGN1cnJlbnRTdGF0ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgaWYodm0uaXNGdWxsU2NyZWVuKXtcclxuICAgICAgICAgICAgICAgdm0uZnVsbFNjcmVlblN0YXRlID0gJ0ZEU18wNF8wM18wMyc7XHJcbiAgICAgICAgICAgICAgIHZtLmlzRnVsbFNjcmVlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICBjdXJyZW50U3RhdGUgPSAndW5mdWxsJztcclxuICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgdm0uaXNGdWxsU2NyZWVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgY3VycmVudFN0YXRlID0gJ2Z1bGwnO1xyXG4gICAgICAgICAgICAgICB2bS5mdWxsU2NyZWVuU3RhdGUgPSAnRkRTXzA0XzAzXzE0JztcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5Zue6LCDXHJcbiAgICAgICAgICAgIHNjcmVlbkNvbnRyb2xsKGN1cnJlbnRTdGF0ZSk7XHJcbiAgICAgICAgICAgICRzY29wZS5mdWxsU2NyZWVuQ2hhbmdlKHtwYXR0ZXJuIDogY3VycmVudFN0YXRlfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/lhajlsY/mjqfliLYg5YW85a65d2Via2l0IFxcIOeBq+eLkFxyXG4gICAgICAgIGZ1bmN0aW9uIHNjcmVlbkNvbnRyb2xsKHN0YXRlIDogc3RyaW5nKXtcclxuICAgICAgICAgICAgaWYoc3RhdGUgPT09IFwiZnVsbFwiKXtcclxuICAgICAgICAgICAgICAgIGlmKCEhZG9jdW1lbnQuYm9keS53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbil7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbigpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoISFkb2N1bWVudC5ib2R5Lm1velJlcXVlc3RGdWxsU2NyZWVuKXtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5Lm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCdkaXYuZy1oZWFkJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCdkaXYuZy1tYWluJykuY3NzKCd0b3AnLFwiMFwiKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZighIWRvY3VtZW50LndlYmtpdENhbmNlbEZ1bGxTY3JlZW4pe1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LndlYmtpdENhbmNlbEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKCEhZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbil7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnZGl2LmctaGVhZCcpLnNob3coKTtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnZGl2LmctbWFpbicpLmNzcygndG9wJyxcIjQ4cHhcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8v5YiX6KGo5qih5byPXHJcbiAgICAgICB2bS5wYXR0ZXJuTGlzdCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdm0uaXNNYXBPZlBhdHRlcm4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8v5Zue6LCDXHJcbiAgICAgICAgICAgICEhJHNjb3BlLnBhdHRlcm5MaXN0ICYmICRzY29wZS5wYXR0ZXJuTGlzdCgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8v5Zyw5Zu+5qih5byPXHJcbiAgICAgICAgdm0ucGF0dGVybk1hcCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdm0uaXNNYXBPZlBhdHRlcm4gPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy/lm57osINcclxuICAgICAgICAgICAgISEkc2NvcGUucGF0dGVybk1hcCAmJiAkc2NvcGUucGF0dGVybk1hcCgpO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAvL+WbvuWxguaMiemSrlxyXG4gICAgICAgIHZtLmxheWVyQ2hlY2sgPSAodHlwZSA6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBpZih0eXBlID09PSBcImNhbWVyYVwiKXtcclxuICAgICAgICAgICAgICAgIHZtLmxheWVyQ2hlY2tEYXRhLmNhbWVyYSA9ICF2bS5sYXllckNoZWNrRGF0YS5jYW1lcmE7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHR5cGUgPT09IFwicG9saWNlXCIpe1xyXG4gICAgICAgICAgICAgICAgdm0ubGF5ZXJDaGVja0RhdGEucG9saWNlID0gIXZtLmxheWVyQ2hlY2tEYXRhLnBvbGljZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgLy/lm57osINcclxuICAgICAgICAgICAgISEkc2NvcGUubGF5ZXJDaGVjayAmJiAkc2NvcGUubGF5ZXJDaGVjayh7Y2hlY2tlZCA6IHt0eXBlIDogdHlwZSAsIGNoZWNrIDogdm0ubGF5ZXJDaGVja0RhdGFbdHlwZV0gfX0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS4kb24oJyRkZXN0b3J5JywgZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgY29uc29sZS5sb2coXCLplIDmr4HmjIfku6TkvZznlKjln59cIik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBsaW5rID0gZnVuY3Rpb24oc2NvcGUgOiBhbnkgLCBlbGVtZW50IDogYW55ICxhdHRyIDogYW55ICxjb250cm9sbGVyIDogYW55KXtcclxuICAgICAgIC8qIHNjb3BlLmZ1bGxTY3JlZW5DaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCflhajlsY8nKVxyXG4gICAgICAgIH0qL1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIGluc3RhbmNlKCl7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBtYXBUb3BUb29sRGlyZWN0aXZlKCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5hcHAuZGlyZWN0aXZlKCd1dGlsTWFwVG9wVG9vbCcsIG1hcFRvcFRvb2xEaXJlY3RpdmUuaW5zdGFuY2UpOyJdfQ==
