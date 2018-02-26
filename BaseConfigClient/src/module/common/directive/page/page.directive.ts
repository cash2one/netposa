/**
 * Created by dell on 2017/3/27.
 */

/// <amd-dependency path="text!./page.html" name='pageHtml' />

import 'jquery';
import {app} from "../../app/main.app";
import PageParams from "./page-params";

declare let pageHtml: any;
declare let $: any;

class UtilPagingDirective {
    static $inject: Array<string> = [];

    isEnd: boolean;
    jumpPrevPage: Function;
    jumpNextPage: Function;
    jumpPage: Function;
    pages: Array<{"value":number}>;
    isFirstPage: boolean;
    isLastPage: boolean;
    selectPageFunc: Function;
    pageParams: PageParams;
    init: Function;
    goPrevPage: Function;
    goNextPage: Function;
    goPage: Function;

    jumpFirstPage:Function;
    jumpLastPage:Function;
    selectPageSize:Function;
    pageArr:Array<number>;
    index:number;
    flag:boolean;
    pagingShow:Function;
    pagingHide:Function;
    changePageSize:Function;
    showType: string;

    constructor() {
    }

    static instance() {
        return new UtilPagingDirective();
    }

    restrict: string = 'E';
    replace: boolean = true;
    scope = {
        pageParams: '=',
        goNextPage: '&nextPage',
        goPrevPage: '&prevPage',
        goPage: '&goPage',
        changePageSize:'&pageSize',
        // 页码类型small,normal
        showType: '@',
        hideSize:'=',
        hideGopage:'='
    };
    template = pageHtml;
    controllerAs = "pageDirective";
    controller = function ($scope: any) {
        let vm = this as UtilPagingDirective;
        vm.isEnd = false;
        vm.showType = "normal";

        vm.jumpPrevPage = jumpPrevPage;
        vm.jumpNextPage = jumpNextPage;
        vm.jumpPage = jumpPage;
        vm.pages = [];
        vm.isFirstPage = true;
        vm.isLastPage = true;

        vm.jumpFirstPage=jumpFirstPage;
        vm.jumpLastPage=jumpLastPage;
        vm.selectPageSize=selectPageSize;
        vm.flag=false;
        vm.index=new PageParams().pageSize;
        vm.pagingShow=pagingShow;

        vm.pageParams = new PageParams();

        vm.init = init;

        $scope.$watch('pageParams', watchPageParams, true);

        function convertPageParams(origin: PageParams){
            let pageSize = origin.pageSize;
            let totalCount = origin.totalCount;

            if(totalCount % pageSize == 0){
                origin.pageCount = parseInt(totalCount / pageSize + "", 10);
            }else{
                origin.pageCount = parseInt(totalCount / pageSize + "", 10) + 1;
            }
            return origin;
        }

        function watchPageParams(newVal:PageParams, oldVal:PageParams) {
            if (newVal === oldVal) return;
            vm.pageParams = convertPageParams(newVal);
            vm.index = newVal.pageSize;
            init();
        }

        function init() {
            let params = vm.pageParams, showType = vm.showType;
            //根据不同的showType展示不同的方式 creator: wyr time: 2017.6.20
            // 暂时分两种模式 small模式和 normal模式
            if(showType === "normal"){
                vm.pages = _getShowPagesInNormal(params.pageCount, params.currentPage);
            }else if(showType === "small"){
                vm.pages = _getShowPagesInSmall(params.pageCount, params.currentPage);
            }else{
                vm.pages = _getShowPagesInNormal(params.pageCount, params.currentPage);
            }
            //把每页可显示个数放到一个数组
            vm.pageArr = [10,20,50];

            if (params.currentPage <= 1) {
                vm.isFirstPage = true;
            } else {
                vm.isFirstPage = false;
            }
            if (params.pageCount <= params.currentPage) {
                vm.isLastPage = true;
            } else {
                vm.isLastPage = false;
            }

            // TODO 下面代码暂时留着,　做优化的时候需要用到
            // if (params.pageCount < 5) {
            //     for (i = 1, len = params.pageCount; i <= len; i++) {
            //         pages.push(i);
            //     }
            // } else if (params.currentPage >= 3 && params.currentPage <= params.pageCount - 3) {
            //     for (i = 1; i <= 5; i++) {
            //         pages.push(params.currentPage - 3 + i);
            //     }
            // } else if (params.currentPage > params.pageCount - 3 && params.pageCount >= 5) {
            //     for (i = 1; i <= 5; i++) {
            //         pages.push(params.pageCount - 5 + i);
            //     }
            // } else {
            //     for (i = 1; i <= 5; i++) {
            //         pages.push(i);
            //     }
            // }
            // let temp = [];
            // for (i = 0, len = pages.length; i < len; i++) {
            //     temp.push({value: pages[i]});
            // }
            // vm.pages = temp;
            // //vm.pageParams.currentPage = vm.pageParams.currentPage;
            //
            //
            // //把每页可显示个数放到一个数组
            // vm.pageArr = [2,10,20,50];
            //
            //
            // if (params.currentPage <= 1) {
            //     vm.isFirstPage = true;
            // } else {
            //     vm.isFirstPage = false;
            // }
            // if (params.pageCount <= vm.pageParams.currentPage) {
            //     vm.isLastPage = true;
            // } else {
            //     vm.isLastPage = false;
            // }
        }

        /**
         * 获得用于界面显示的页码列表, normal模式
         * @param params
         * @returns {Array}
         * @private
         */
        function _getShowPagesInNormal(pageCount: number, currentPage: number){
            let i, len, pages:Array<number> = [];
            if (pageCount < 5) {
                for (i = 1, len = pageCount; i <= len; i++) {
                    pages.push(i);
                }
            } else if (currentPage >= 3 && currentPage <= pageCount - 3) {
                for (i = 1; i <= 5; i++) {
                    pages.push(currentPage - 3 + i);
                }
            } else if (currentPage > pageCount - 3 && pageCount >= 5) {
                for (i = 1; i <= 5; i++) {
                    pages.push(pageCount - 5 + i);
                }
            } else {
                for (i = 1; i <= 5; i++) {
                    pages.push(i);
                }
            }
            let temp = [];
            for (i = 0, len = pages.length; i < len; i++) {
                temp.push({value: pages[i]});
            }
            return temp;
        }

        /**
         * 获得用于界面显示的页码列表, small类型
         * @param params
         * @returns {{value: number}[]}
         * @private
         */
        function _getShowPagesInSmall(pageCount: number, currentPage: number){
            return [{value: currentPage}];
        }

        function jumpPrevPage() {
            if (vm.pageParams.currentPage <= 1) return;

            if(typeof $scope.goPrevPage === "function") {
                $scope.goPrevPage({'num': vm.pageParams.currentPage - 1});
            }
        }

        function jumpNextPage() {

            if (vm.pageParams.currentPage >= vm.pageParams.pageCount) return;
            if(typeof $scope.goNextPage === "function") {
                $scope.goNextPage({'num': vm.pageParams.currentPage + 1});
            }
        }

        function jumpPage(num: number) {
            if(!num){
                return;
            } if(num == vm.pageParams.currentPage){
                return;
            }
            if (num < 1 || num > vm.pageParams.pageCount) return;
            if(typeof $scope.goPage === "function") {
                $scope.goPage({'num': num});
            }
        }

        function jumpFirstPage(){
            jumpPage(1);
        }

        function jumpLastPage(){
            jumpPage(vm.pageParams.pageCount);
        }

        //选择每页显示数据条数
        function selectPageSize(num:number){
            $scope.changePageSize({'num': num});
            vm.index = num;
        }

        //下拉框显示
        function pagingShow(){
            vm.flag=true;
        }

        //下拉框隐藏
        vm.pagingHide = function (){
            vm.flag=false;
        }

    };
    link = function (scope: any, element: any, attrs: any, controller: UtilPagingDirective) {
        let vm = controller;
        // 设置showType
        vm.showType = attrs.showType || vm.showType;
        vm.init();
    }
}
// 分页控件directive
app
    .directive('utilPaging', UtilPagingDirective.instance);
