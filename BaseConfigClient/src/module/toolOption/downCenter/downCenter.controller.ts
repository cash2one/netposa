/**
 * Created by dell on 2017/6/29.
 */

import {app} from "../../common/app/main.app";

import {ResponseResult} from "../../../core/params/result/ResponseResult";
import PageParams from "../../common/directive/page/page-params";
import {TableParams} from "../../../core/params/table/TableParams";

class TableListParams extends TableParams  {
    constructor() {
        super();
        this.pageSize = new PageParams().pageSize;
        this.currentPage = new PageParams().currentPage;
    };
}

class CasCadeSearchParams {
    pageIndex: number;
    pageSize: number;
}

class DownCenterController {
    static $inject = ['$scope','$timeout'];

    tableListParams: TableListParams;
    pageParams: PageParams;
    changePage: Function;
    changePageSize:Function;

    tableNoData:boolean;

    constructor($scope: any,$timeout:any) {
        let vm = this;
        console.error("下载中心");

        vm.pageParams;
        vm.tableListParams = new TableListParams();
        // 分页控件
        vm.changePage = changePage;
        vm.changePageSize =changePageSize;

        // 向后台传的参数
        function _getCasCadeSearchParams(tableParams: TableListParams){
            if(!tableParams) return {} as CasCadeSearchParams;

            let result = new CasCadeSearchParams();
            result.pageIndex = tableParams.currentPage;
            result.pageSize = tableParams.pageSize;
            return result;
        }

        //获取数据
        function getTableList(){
            let pageParams = new PageParams();
            pageParams.pageSize = vm.tableListParams.pageSize;
            pageParams.currentPage = vm.tableListParams.currentPage;
            pageParams.totalCount = 10;

            vm.pageParams = pageParams;
        }

        $timeout(() =>{
            getTableList()
        });

        function changePage(num: number) {
            vm.tableListParams.currentPage = num;
            getTableList()
        }

        function changePageSize(num: number) {
            vm.tableListParams.currentPage = 1;
            vm.tableListParams.pageSize = num;
            getTableList()
        }

    }
}

app.controller('downCenterController', DownCenterController);
