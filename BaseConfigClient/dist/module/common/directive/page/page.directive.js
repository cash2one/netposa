define(["require", "exports", "text!./page.html", "../../app/main.app", "./page-params", "jquery"], function (require, exports, pageHtml, main_app_1, page_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UtilPagingDirective = (function () {
        function UtilPagingDirective() {
            this.restrict = 'E';
            this.replace = true;
            this.scope = {
                pageParams: '=',
                goNextPage: '&nextPage',
                goPrevPage: '&prevPage',
                goPage: '&goPage',
                changePageSize: '&pageSize',
                showType: '@',
                hideSize: '=',
                hideGopage: '='
            };
            this.template = pageHtml;
            this.controllerAs = "pageDirective";
            this.controller = function ($scope) {
                var vm = this;
                vm.isEnd = false;
                vm.showType = "normal";
                vm.jumpPrevPage = jumpPrevPage;
                vm.jumpNextPage = jumpNextPage;
                vm.jumpPage = jumpPage;
                vm.pages = [];
                vm.isFirstPage = true;
                vm.isLastPage = true;
                vm.jumpFirstPage = jumpFirstPage;
                vm.jumpLastPage = jumpLastPage;
                vm.selectPageSize = selectPageSize;
                vm.flag = false;
                vm.index = new page_params_1.default().pageSize;
                vm.pagingShow = pagingShow;
                vm.pageParams = new page_params_1.default();
                vm.init = init;
                $scope.$watch('pageParams', watchPageParams, true);
                function convertPageParams(origin) {
                    var pageSize = origin.pageSize;
                    var totalCount = origin.totalCount;
                    if (totalCount % pageSize == 0) {
                        origin.pageCount = parseInt(totalCount / pageSize + "", 10);
                    }
                    else {
                        origin.pageCount = parseInt(totalCount / pageSize + "", 10) + 1;
                    }
                    return origin;
                }
                function watchPageParams(newVal, oldVal) {
                    if (newVal === oldVal)
                        return;
                    vm.pageParams = convertPageParams(newVal);
                    vm.index = newVal.pageSize;
                    init();
                }
                function init() {
                    var params = vm.pageParams, showType = vm.showType;
                    if (showType === "normal") {
                        vm.pages = _getShowPagesInNormal(params.pageCount, params.currentPage);
                    }
                    else if (showType === "small") {
                        vm.pages = _getShowPagesInSmall(params.pageCount, params.currentPage);
                    }
                    else {
                        vm.pages = _getShowPagesInNormal(params.pageCount, params.currentPage);
                    }
                    vm.pageArr = [10, 20, 50];
                    if (params.currentPage <= 1) {
                        vm.isFirstPage = true;
                    }
                    else {
                        vm.isFirstPage = false;
                    }
                    if (params.pageCount <= params.currentPage) {
                        vm.isLastPage = true;
                    }
                    else {
                        vm.isLastPage = false;
                    }
                }
                function _getShowPagesInNormal(pageCount, currentPage) {
                    var i, len, pages = [];
                    if (pageCount < 5) {
                        for (i = 1, len = pageCount; i <= len; i++) {
                            pages.push(i);
                        }
                    }
                    else if (currentPage >= 3 && currentPage <= pageCount - 3) {
                        for (i = 1; i <= 5; i++) {
                            pages.push(currentPage - 3 + i);
                        }
                    }
                    else if (currentPage > pageCount - 3 && pageCount >= 5) {
                        for (i = 1; i <= 5; i++) {
                            pages.push(pageCount - 5 + i);
                        }
                    }
                    else {
                        for (i = 1; i <= 5; i++) {
                            pages.push(i);
                        }
                    }
                    var temp = [];
                    for (i = 0, len = pages.length; i < len; i++) {
                        temp.push({ value: pages[i] });
                    }
                    return temp;
                }
                function _getShowPagesInSmall(pageCount, currentPage) {
                    return [{ value: currentPage }];
                }
                function jumpPrevPage() {
                    if (vm.pageParams.currentPage <= 1)
                        return;
                    if (typeof $scope.goPrevPage === "function") {
                        $scope.goPrevPage({ 'num': vm.pageParams.currentPage - 1 });
                    }
                }
                function jumpNextPage() {
                    if (vm.pageParams.currentPage >= vm.pageParams.pageCount)
                        return;
                    if (typeof $scope.goNextPage === "function") {
                        $scope.goNextPage({ 'num': vm.pageParams.currentPage + 1 });
                    }
                }
                function jumpPage(num) {
                    if (!num) {
                        return;
                    }
                    if (num == vm.pageParams.currentPage) {
                        return;
                    }
                    if (num < 1 || num > vm.pageParams.pageCount)
                        return;
                    if (typeof $scope.goPage === "function") {
                        $scope.goPage({ 'num': num });
                    }
                }
                function jumpFirstPage() {
                    jumpPage(1);
                }
                function jumpLastPage() {
                    jumpPage(vm.pageParams.pageCount);
                }
                function selectPageSize(num) {
                    $scope.changePageSize({ 'num': num });
                    vm.index = num;
                }
                function pagingShow() {
                    vm.flag = true;
                }
                vm.pagingHide = function () {
                    vm.flag = false;
                };
            };
            this.link = function (scope, element, attrs, controller) {
                var vm = controller;
                vm.showType = attrs.showType || vm.showType;
                vm.init();
            };
        }
        UtilPagingDirective.instance = function () {
            return new UtilPagingDirective();
        };
        UtilPagingDirective.$inject = [];
        return UtilPagingDirective;
    }());
    main_app_1.app
        .directive('utilPaging', UtilPagingDirective.instance);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS9wYWdlL3BhZ2UuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWFBO1FBNEJJO1lBT0EsYUFBUSxHQUFXLEdBQUcsQ0FBQztZQUN2QixZQUFPLEdBQVksSUFBSSxDQUFDO1lBQ3hCLFVBQUssR0FBRztnQkFDSixVQUFVLEVBQUUsR0FBRztnQkFDZixVQUFVLEVBQUUsV0FBVztnQkFDdkIsVUFBVSxFQUFFLFdBQVc7Z0JBQ3ZCLE1BQU0sRUFBRSxTQUFTO2dCQUNqQixjQUFjLEVBQUMsV0FBVztnQkFFMUIsUUFBUSxFQUFFLEdBQUc7Z0JBQ2IsUUFBUSxFQUFDLEdBQUc7Z0JBQ1osVUFBVSxFQUFDLEdBQUc7YUFDakIsQ0FBQztZQUNGLGFBQVEsR0FBRyxRQUFRLENBQUM7WUFDcEIsaUJBQVksR0FBRyxlQUFlLENBQUM7WUFDL0IsZUFBVSxHQUFHLFVBQVUsTUFBVztnQkFDOUIsSUFBSSxFQUFFLEdBQUcsSUFBMkIsQ0FBQztnQkFDckMsRUFBRSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ2pCLEVBQUUsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dCQUV2QixFQUFFLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztnQkFDL0IsRUFBRSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7Z0JBQy9CLEVBQUUsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dCQUN2QixFQUFFLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDZCxFQUFFLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDdEIsRUFBRSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBRXJCLEVBQUUsQ0FBQyxhQUFhLEdBQUMsYUFBYSxDQUFDO2dCQUMvQixFQUFFLENBQUMsWUFBWSxHQUFDLFlBQVksQ0FBQztnQkFDN0IsRUFBRSxDQUFDLGNBQWMsR0FBQyxjQUFjLENBQUM7Z0JBQ2pDLEVBQUUsQ0FBQyxJ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QUUsQ0FBQyxVQUFVLEdBQUc7b0JBQ1osRUFBRSxDQUFDLElBQUksR0FBQyxLQUFLLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQTtZQUVMLENBQUMsQ0FBQztZQUNGLFNBQUksR0FBRyxVQUFVLEtBQVUsRUFBRSxPQUFZLEVBQUUsS0FBVSxFQUFFLFVBQStCO2dCQUNsRixJQUFJLEVBQUUsR0FBRyxVQUFVLENBQUM7Z0JBRXBCLEVBQUUsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUM1QyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZCxDQUFDLENBQUE7UUF4T0QsQ0FBQztRQUVNLDRCQUFRLEdBQWY7WUFDSSxNQUFNLENBQUMsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO1FBQ3JDLENBQUM7UUFoQ00sMkJBQU8sR0FBa0IsRUFBRSxDQUFDO1FBcVF2QywwQkFBQztLQXRRRCxBQXNRQyxJQUFBO0lBRUQsY0FBRztTQUNFLFNBQVMsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9kaXJlY3RpdmUvcGFnZS9wYWdlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGRlbGwgb24gMjAxNy8zLzI3LlxyXG4gKi9cclxuXHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi9wYWdlLmh0bWxcIiBuYW1lPSdwYWdlSHRtbCcgLz5cclxuXHJcbmltcG9ydCAnanF1ZXJ5JztcclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IFBhZ2VQYXJhbXMgZnJvbSBcIi4vcGFnZS1wYXJhbXNcIjtcclxuXHJcbmRlY2xhcmUgbGV0IHBhZ2VIdG1sOiBhbnk7XHJcbmRlY2xhcmUgbGV0ICQ6IGFueTtcclxuXHJcbmNsYXNzIFV0aWxQYWdpbmdEaXJlY3RpdmUge1xyXG4gICAgc3RhdGljICRpbmplY3Q6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHJcbiAgICBpc0VuZDogYm9vbGVhbjtcclxuICAgIGp1bXBQcmV2UGFnZTogRnVuY3Rpb247XHJcbiAgICBqdW1wTmV4dFBhZ2U6IEZ1bmN0aW9uO1xyXG4gICAganVtcFBhZ2U6IEZ1bmN0aW9uO1xyXG4gICAgcGFnZXM6IEFycmF5PHtcInZhbHVlXCI6bnVtYmVyfT47XHJcbiAgICBpc0ZpcnN0UGFnZTogYm9vbGVhbjtcclxuICAgIGlzTGFzdFBhZ2U6IGJvb2xlYW47XHJcbiAgICBzZWxlY3RQYWdlRnVuYzogRnVuY3Rpb247XHJcbiAgICBwYWdlUGFyYW1zOiBQYWdlUGFyYW1zO1xyXG4gICAgaW5pdDogRnVuY3Rpb247XHJcbiAgICBnb1ByZXZQYWdlOiBGdW5jdGlvbjtcclxuICAgIGdvTmV4dFBhZ2U6IEZ1bmN0aW9uO1xyXG4gICAgZ29QYWdlOiBGdW5jdGlvbjtcclxuXHJcbiAgICBqdW1wRmlyc3RQYWdlOkZ1bmN0aW9uO1xyXG4gICAganVtcExhc3RQYWdlOkZ1bmN0aW9uO1xyXG4gICAgc2VsZWN0UGFnZVNpemU6RnVuY3Rpb247XHJcbiAgICBwYWdlQXJyOkFycmF5PG51bWJlcj47XHJcbiAgICBpbmRleDpudW1iZXI7XHJcbiAgICBmbGFnOmJvb2xlYW47XHJcbiAgICBwYWdpbmdTaG93OkZ1bmN0aW9uO1xyXG4gICAgcGFnaW5nSGlkZTpGdW5jdGlvbjtcclxuICAgIGNoYW5nZVBhZ2VTaXplOkZ1bmN0aW9uO1xyXG4gICAgc2hvd1R5cGU6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaW5zdGFuY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBVdGlsUGFnaW5nRGlyZWN0aXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdHJpY3Q6IHN0cmluZyA9ICdFJztcclxuICAgIHJlcGxhY2U6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgc2NvcGUgPSB7XHJcbiAgICAgICAgcGFnZVBhcmFtczogJz0nLFxyXG4gICAgICAgIGdvTmV4dFBhZ2U6ICcmbmV4dFBhZ2UnLFxyXG4gICAgICAgIGdvUHJldlBhZ2U6ICcmcHJldlBhZ2UnLFxyXG4gICAgICAgIGdvUGFnZTogJyZnb1BhZ2UnLFxyXG4gICAgICAgIGNoYW5nZVBhZ2VTaXplOicmcGFnZVNpemUnLFxyXG4gICAgICAgIC8vIOmhteeggeexu+Wei3NtYWxsLG5vcm1hbFxyXG4gICAgICAgIHNob3dUeXBlOiAnQCcsXHJcbiAgICAgICAgaGlkZVNpemU6Jz0nLFxyXG4gICAgICAgIGhpZGVHb3BhZ2U6Jz0nXHJcbiAgICB9O1xyXG4gICAgdGVtcGxhdGUgPSBwYWdlSHRtbDtcclxuICAgIGNvbnRyb2xsZXJBcyA9IFwicGFnZURpcmVjdGl2ZVwiO1xyXG4gICAgY29udHJvbGxlciA9IGZ1bmN0aW9uICgkc2NvcGU6IGFueSkge1xyXG4gICAgICAgIGxldCB2bSA9IHRoaXMgYXMgVXRpbFBhZ2luZ0RpcmVjdGl2ZTtcclxuICAgICAgICB2bS5pc0VuZCA9IGZhbHNlO1xyXG4gICAgICAgIHZtLnNob3dUeXBlID0gXCJub3JtYWxcIjtcclxuXHJcbiAgICAgICAgdm0uanVtcFByZXZQYWdlID0ganVtcFByZXZQYWdlO1xyXG4gICAgICAgIHZtLmp1bXBOZXh0UGFnZSA9IGp1bXBOZXh0UGFnZTtcclxuICAgICAgICB2bS5qdW1wUGFnZSA9IGp1bXBQYWdlO1xyXG4gICAgICAgIHZtLnBhZ2VzID0gW107XHJcbiAgICAgICAgdm0uaXNGaXJzdFBhZ2UgPSB0cnVlO1xyXG4gICAgICAgIHZtLmlzTGFzdFBhZ2UgPSB0cnVlO1xyXG5cclxuICAgICAgICB2bS5qdW1wRmlyc3RQYWdlPWp1bXBGaXJzdFBhZ2U7XHJcbiAgICAgICAgdm0uanVtcExhc3RQYWdlPWp1bXBMYXN0UGFnZTtcclxuICAgICAgICB2bS5zZWxlY3RQYWdlU2l6ZT1zZWxlY3RQYWdlU2l6ZTtcclxuICAgICAgICB2bS5mbGFnPWZhbHNlO1xyXG4gICAgICAgIHZtLmluZGV4PW5ldyBQYWdlUGFyYW1zKCkucGFnZVNpemU7XHJcbiAgICAgICAgdm0ucGFnaW5nU2hvdz1wYWdpbmdTaG93O1xyXG5cclxuICAgICAgICB2bS5wYWdlUGFyYW1zID0gbmV3IFBhZ2VQYXJhbXMoKTtcclxuXHJcbiAgICAgICAgdm0uaW5pdCA9IGluaXQ7XHJcblxyXG4gICAgICAgICRzY29wZS4kd2F0Y2goJ3BhZ2VQYXJhbXMnLCB3YXRjaFBhZ2VQYXJhbXMsIHRydWUpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjb252ZXJ0UGFnZVBhcmFtcyhvcmlnaW46IFBhZ2VQYXJhbXMpe1xyXG4gICAgICAgICAgICBsZXQgcGFnZVNpemUgPSBvcmlnaW4ucGFnZVNpemU7XHJcbiAgICAgICAgICAgIGxldCB0b3RhbENvdW50ID0gb3JpZ2luLnRvdGFsQ291bnQ7XHJcblxyXG4gICAgICAgICAgICBpZih0b3RhbENvdW50ICUgcGFnZVNpemUgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW4ucGFnZUNvdW50ID0gcGFyc2VJbnQodG90YWxDb3VudCAvIHBhZ2VTaXplICsgXCJcIiwgMTApO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIG9yaWdpbi5wYWdlQ291bnQgPSBwYXJzZUludCh0b3RhbENvdW50IC8gcGFnZVNpemUgKyBcIlwiLCAxMCkgKyAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvcmlnaW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB3YXRjaFBhZ2VQYXJhbXMobmV3VmFsOlBhZ2VQYXJhbXMsIG9sZFZhbDpQYWdlUGFyYW1zKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWwgPT09IG9sZFZhbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB2bS5wYWdlUGFyYW1zID0gY29udmVydFBhZ2VQYXJhbXMobmV3VmFsKTtcclxuICAgICAgICAgICAgdm0uaW5kZXggPSBuZXdWYWwucGFnZVNpemU7XHJcbiAgICAgICAgICAgIGluaXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgIGxldCBwYXJhbXMgPSB2bS5wYWdlUGFyYW1zLCBzaG93VHlwZSA9IHZtLnNob3dUeXBlO1xyXG4gICAgICAgICAgICAvL+agueaNruS4jeWQjOeahHNob3dUeXBl5bGV56S65LiN5ZCM55qE5pa55byPIGNyZWF0b3I6IHd5ciB0aW1lOiAyMDE3LjYuMjBcclxuICAgICAgICAgICAgLy8g5pqC5pe25YiG5Lik56eN5qih5byPIHNtYWxs5qih5byP5ZKMIG5vcm1hbOaooeW8j1xyXG4gICAgICAgICAgICBpZihzaG93VHlwZSA9PT0gXCJub3JtYWxcIil7XHJcbiAgICAgICAgICAgICAgICB2bS5wYWdlcyA9IF9nZXRTaG93UGFnZXNJbk5vcm1hbChwYXJhbXMucGFnZUNvdW50LCBwYXJhbXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihzaG93VHlwZSA9PT0gXCJzbWFsbFwiKXtcclxuICAgICAgICAgICAgICAgIHZtLnBhZ2VzID0gX2dldFNob3dQYWdlc0luU21hbGwocGFyYW1zLnBhZ2VDb3VudCwgcGFyYW1zLmN1cnJlbnRQYWdlKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB2bS5wYWdlcyA9IF9nZXRTaG93UGFnZXNJbk5vcm1hbChwYXJhbXMucGFnZUNvdW50LCBwYXJhbXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5oqK5q+P6aG15Y+v5pi+56S65Liq5pWw5pS+5Yiw5LiA5Liq5pWw57uEXHJcbiAgICAgICAgICAgIHZtLnBhZ2VBcnIgPSBbMTAsMjAsNTBdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBhcmFtcy5jdXJyZW50UGFnZSA8PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB2bS5pc0ZpcnN0UGFnZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2bS5pc0ZpcnN0UGFnZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMucGFnZUNvdW50IDw9IHBhcmFtcy5jdXJyZW50UGFnZSkge1xyXG4gICAgICAgICAgICAgICAgdm0uaXNMYXN0UGFnZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2bS5pc0xhc3RQYWdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE8g5LiL6Z2i5Luj56CB5pqC5pe255WZ552ALOOAgOWBmuS8mOWMlueahOaXtuWAmemcgOimgeeUqOWIsFxyXG4gICAgICAgICAgICAvLyBpZiAocGFyYW1zLnBhZ2VDb3VudCA8IDUpIHtcclxuICAgICAgICAgICAgLy8gICAgIGZvciAoaSA9IDEsIGxlbiA9IHBhcmFtcy5wYWdlQ291bnQ7IGkgPD0gbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBwYWdlcy5wdXNoKGkpO1xyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyB9IGVsc2UgaWYgKHBhcmFtcy5jdXJyZW50UGFnZSA+PSAzICYmIHBhcmFtcy5jdXJyZW50UGFnZSA8PSBwYXJhbXMucGFnZUNvdW50IC0gMykge1xyXG4gICAgICAgICAgICAvLyAgICAgZm9yIChpID0gMTsgaSA8PSA1OyBpKyspIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBwYWdlcy5wdXNoKHBhcmFtcy5jdXJyZW50UGFnZSAtIDMgKyBpKTtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gfSBlbHNlIGlmIChwYXJhbXMuY3VycmVudFBhZ2UgPiBwYXJhbXMucGFnZUNvdW50IC0gMyAmJiBwYXJhbXMucGFnZUNvdW50ID49IDUpIHtcclxuICAgICAgICAgICAgLy8gICAgIGZvciAoaSA9IDE7IGkgPD0gNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcGFnZXMucHVzaChwYXJhbXMucGFnZUNvdW50IC0gNSArIGkpO1xyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICAgZm9yIChpID0gMTsgaSA8PSA1OyBpKyspIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBwYWdlcy5wdXNoKGkpO1xyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIGxldCB0ZW1wID0gW107XHJcbiAgICAgICAgICAgIC8vIGZvciAoaSA9IDAsIGxlbiA9IHBhZ2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vICAgICB0ZW1wLnB1c2goe3ZhbHVlOiBwYWdlc1tpXX0pO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIHZtLnBhZ2VzID0gdGVtcDtcclxuICAgICAgICAgICAgLy8gLy92bS5wYWdlUGFyYW1zLmN1cnJlbnRQYWdlID0gdm0ucGFnZVBhcmFtcy5jdXJyZW50UGFnZTtcclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgLy8gLy/miormr4/pobXlj6/mmL7npLrkuKrmlbDmlL7liLDkuIDkuKrmlbDnu4RcclxuICAgICAgICAgICAgLy8gdm0ucGFnZUFyciA9IFsyLDEwLDIwLDUwXTtcclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgLy8gaWYgKHBhcmFtcy5jdXJyZW50UGFnZSA8PSAxKSB7XHJcbiAgICAgICAgICAgIC8vICAgICB2bS5pc0ZpcnN0UGFnZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICB2bS5pc0ZpcnN0UGFnZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIGlmIChwYXJhbXMucGFnZUNvdW50IDw9IHZtLnBhZ2VQYXJhbXMuY3VycmVudFBhZ2UpIHtcclxuICAgICAgICAgICAgLy8gICAgIHZtLmlzTGFzdFBhZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICAgdm0uaXNMYXN0UGFnZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflvpfnlKjkuo7nlYzpnaLmmL7npLrnmoTpobXnoIHliJfooagsIG5vcm1hbOaooeW8j1xyXG4gICAgICAgICAqIEBwYXJhbSBwYXJhbXNcclxuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9XHJcbiAgICAgICAgICogQHByaXZhdGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBfZ2V0U2hvd1BhZ2VzSW5Ob3JtYWwocGFnZUNvdW50OiBudW1iZXIsIGN1cnJlbnRQYWdlOiBudW1iZXIpe1xyXG4gICAgICAgICAgICBsZXQgaSwgbGVuLCBwYWdlczpBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICAgICAgICAgIGlmIChwYWdlQ291bnQgPCA1KSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAxLCBsZW4gPSBwYWdlQ291bnQ7IGkgPD0gbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlcy5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRQYWdlID49IDMgJiYgY3VycmVudFBhZ2UgPD0gcGFnZUNvdW50IC0gMykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMTsgaSA8PSA1OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlcy5wdXNoKGN1cnJlbnRQYWdlIC0gMyArIGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRQYWdlID4gcGFnZUNvdW50IC0gMyAmJiBwYWdlQ291bnQgPj0gNSkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMTsgaSA8PSA1OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlcy5wdXNoKHBhZ2VDb3VudCAtIDUgKyBpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDE7IGkgPD0gNTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZXMucHVzaChpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgdGVtcCA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBwYWdlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGVtcC5wdXNoKHt2YWx1ZTogcGFnZXNbaV19KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGVtcDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiOt+W+l+eUqOS6jueVjOmdouaYvuekuueahOmhteeggeWIl+ihqCwgc21hbGznsbvlnotcclxuICAgICAgICAgKiBAcGFyYW0gcGFyYW1zXHJcbiAgICAgICAgICogQHJldHVybnMge3t2YWx1ZTogbnVtYmVyfVtdfVxyXG4gICAgICAgICAqIEBwcml2YXRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldFNob3dQYWdlc0luU21hbGwocGFnZUNvdW50OiBudW1iZXIsIGN1cnJlbnRQYWdlOiBudW1iZXIpe1xyXG4gICAgICAgICAgICByZXR1cm4gW3t2YWx1ZTogY3VycmVudFBhZ2V9XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGp1bXBQcmV2UGFnZSgpIHtcclxuICAgICAgICAgICAgaWYgKHZtLnBhZ2VQYXJhbXMuY3VycmVudFBhZ2UgPD0gMSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgaWYodHlwZW9mICRzY29wZS5nb1ByZXZQYWdlID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5nb1ByZXZQYWdlKHsnbnVtJzogdm0ucGFnZVBhcmFtcy5jdXJyZW50UGFnZSAtIDF9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24ganVtcE5leHRQYWdlKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHZtLnBhZ2VQYXJhbXMuY3VycmVudFBhZ2UgPj0gdm0ucGFnZVBhcmFtcy5wYWdlQ291bnQpIHJldHVybjtcclxuICAgICAgICAgICAgaWYodHlwZW9mICRzY29wZS5nb05leHRQYWdlID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5nb05leHRQYWdlKHsnbnVtJzogdm0ucGFnZVBhcmFtcy5jdXJyZW50UGFnZSArIDF9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24ganVtcFBhZ2UobnVtOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYoIW51bSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gaWYobnVtID09IHZtLnBhZ2VQYXJhbXMuY3VycmVudFBhZ2Upe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChudW0gPCAxIHx8IG51bSA+IHZtLnBhZ2VQYXJhbXMucGFnZUNvdW50KSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiAkc2NvcGUuZ29QYWdlID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5nb1BhZ2UoeydudW0nOiBudW19KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24ganVtcEZpcnN0UGFnZSgpe1xyXG4gICAgICAgICAgICBqdW1wUGFnZSgxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGp1bXBMYXN0UGFnZSgpe1xyXG4gICAgICAgICAgICBqdW1wUGFnZSh2bS5wYWdlUGFyYW1zLnBhZ2VDb3VudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+mAieaLqeavj+mhteaYvuekuuaVsOaNruadoeaVsFxyXG4gICAgICAgIGZ1bmN0aW9uIHNlbGVjdFBhZ2VTaXplKG51bTpudW1iZXIpe1xyXG4gICAgICAgICAgICAkc2NvcGUuY2hhbmdlUGFnZVNpemUoeydudW0nOiBudW19KTtcclxuICAgICAgICAgICAgdm0uaW5kZXggPSBudW07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+S4i+aLieahhuaYvuekulxyXG4gICAgICAgIGZ1bmN0aW9uIHBhZ2luZ1Nob3coKXtcclxuICAgICAgICAgICAgdm0uZmxhZz10cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/kuIvmi4nmoYbpmpDol49cclxuICAgICAgICB2bS5wYWdpbmdIaWRlID0gZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgIHZtLmZsYWc9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcbiAgICBsaW5rID0gZnVuY3Rpb24gKHNjb3BlOiBhbnksIGVsZW1lbnQ6IGFueSwgYXR0cnM6IGFueSwgY29udHJvbGxlcjogVXRpbFBhZ2luZ0RpcmVjdGl2ZSkge1xyXG4gICAgICAgIGxldCB2bSA9IGNvbnRyb2xsZXI7XHJcbiAgICAgICAgLy8g6K6+572uc2hvd1R5cGVcclxuICAgICAgICB2bS5zaG93VHlwZSA9IGF0dHJzLnNob3dUeXBlIHx8IHZtLnNob3dUeXBlO1xyXG4gICAgICAgIHZtLmluaXQoKTtcclxuICAgIH1cclxufVxyXG4vLyDliIbpobXmjqfku7ZkaXJlY3RpdmVcclxuYXBwXHJcbiAgICAuZGlyZWN0aXZlKCd1dGlsUGFnaW5nJywgVXRpbFBhZ2luZ0RpcmVjdGl2ZS5pbnN0YW5jZSk7XHJcbiJdfQ==
