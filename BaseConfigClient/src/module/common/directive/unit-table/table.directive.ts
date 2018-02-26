
/// <amd-dependency path="text!./table.html" name="tableHtml" />
/// <amd-dependency path="text!./table-tr-td.html" name="tableTrTdHtml" />
/// <amd-dependency path="text!./table-tr-tdd.html" name="tableTrTddHtml" />

import {ITableHeader} from "./table-params";
declare const tableHtml: any;

declare const tableTrTdHtml: any;
declare const tableTrTddHtml: any;


declare const angular: any;

import {app} from '../../app/main.app';
import 'css!./table.css';
import 'angular';

class UtilTabledHeadDirective {
    static $inject: Array<string> = [];

    hasSerial:boolean;
    hasCheck:boolean;

    headDataList:Array<ITableHeader>;

    bodyTrList:Array<any>;
    initUnitTableTr:Function;

    init:Function;

    checkBoxAll:boolean;
    changeTdInTrShowStatus:Function;

    constructor() {
    }

    static instance() {
        return new UtilTabledHeadDirective();
    }

    restrict: string = 'E';
    replace: boolean = true;
    transclude: boolean = true;
    scope = {
        // 头部信息列表 :Array<ITableHeader>格式 必传
        tableHeaders:'=', // 表格数据
        //是否 显示 序号列
        tableHasSerial:'=',
        //是否 可做 打钩选择
        tableHasCheck:'=',
        /**
         *  点击排序回调 ex : table-sort-fun = " XXXFun(sortIndex,fieldName,sortStatus)"
         * @time: 2017-05-03 14:30:34
         * @params: sortIndex:number 排序列下标
         * @params: fieldName:string 排序列下标 对应排序属性名称 = field
         * @params: sortStatus:number 1 正序、0 倒序
         * @return:
         */
        tableSortFun: '&',// 点击sort ，table 数据改变
        /**
         *  点击checkbox 回调  ex ：table-after-check = " XXXFun(checkList,isCheckAll)"
         * @time: 2017-05-03 14:30:34
         * @params: checkList:Array<boolean> 列选择结果集合
         * @params: isCheckAll:boolean 是否全选标识返回
         * @return:
         */
        tableAfterCheck: '&',// 点击 选择 打钩后返回
    };

    controllerAs = 'tablectrl';
    template = tableHtml;

    controller = function ($scope:any) {
        let vm  =this;
        //vm.headDataList = headDataFormat($scope.tableHeaders);
        vm.init = function () {
            vm.checkBoxAll = false;
            if((typeof($scope.tableHasSerial)!="undefined"&&($scope.tableHasSerial==false))){
                vm.hasSerial = false;
            }else{
                vm.hasSerial = true;
            }
            vm.hasCheck = $scope.tableHasCheck || false;

            vm.bodyTrList = [];
            // 初始化使用回调的参数
            vm.changeCheckBoxCallBack();
        };
        /**
         * tr checkBox 状态改变 子回调触发父改变，父改变 子跟随父改变
         * @time: 2017-05-02 10:57:21
         * @params: index：子tr下标，-1表当前全选栏操作
         * @return:
         */
        vm.changeTrCheckBoxStatus = function (index:number) {

            if(index == -1){
                if(vm.bodyTrList && vm.bodyTrList.length>0){
                    vm.checkBoxAll = !vm.checkBoxAll;

                    let i:number,len:number,flag:boolean = vm.checkBoxAll;
                    for (i = 0, len = vm.bodyTrList.length; i < len; i++) {
                        vm.bodyTrList[i].trCheckBoxStatus = flag;
                    }
                }
            }else{
                vm.bodyTrList[index].trCheckBoxStatus = !vm.bodyTrList[index].trCheckBoxStatus;
                if(vm.checkBoxAll){
                    vm.checkBoxAll = false;
                }else{
                    let i:number,len:number,flag:boolean = true;

                    for (i = 0, len = vm.bodyTrList.length; i < len; i++) {
                        if(!vm.bodyTrList[i].trCheckBoxStatus){
                            flag = false;
                            i = len;
                        }
                    }
                    vm.checkBoxAll = flag;
                }
            }

            vm.changeCheckBoxCallBack();
            return;
        };
        //改变checkbox 回调
        vm.changeCheckBoxCallBack = function () {
            if(typeof $scope.tableAfterCheck === "function") {
                let i:number,len:number;
                let resultList:Array<boolean> =[];
                for (i = 0, len = vm.bodyTrList.length; i < len; i++) {
                    resultList.push(vm.bodyTrList[i].trCheckBoxStatus);
                }
                $scope.tableAfterCheck({checkList:resultList,isCheckAll:vm.checkBoxAll});
            }
        };

        vm.changeTdShowStatus = function (index:number,showStatus:boolean) {
            vm.headDataList[index].isShow  = !showStatus;
        };

        vm.changeTdInTrShowStatus = function (index:number,showStatus:boolean) {
            let i:number,len:number;
            for (i = 0, len = vm.bodyTrList.length; i < len; i++) {
                if(vm.bodyTrList[i].tdInTrList[index]){
                    vm.bodyTrList[i].tdInTrList[index].setTdInTrStatus(showStatus);
                }
            }

        };

        vm.initUnitTableTr = function(tableBodyTr:UtilTableTrDirective):number{
            let _index = vm.bodyTrList.length;
            let i:number,len:number;

            if(vm.headDataList && (vm.headDataList.length == tableBodyTr.tdInTrList.length)){
                for (i = 0, len = tableBodyTr.tdInTrList.length; i < len; i++) {
                    tableBodyTr.tdInTrList[i].setTdInTrStatus(vm.headDataList[i].isShow);
                }
            }
            vm.bodyTrList.push(tableBodyTr);
            return _index;
        };

        vm.initTrTd = function(tableBodyTr:UtilTableTrDirective):number{
            let _index = vm.bodyTrList.length;
            vm.bodyTrList.push(tableBodyTr);
            return _index;
        };

        // 单栏 排序
        vm.tableBySort = function (header_index:number) {

            if(vm.headDataList[header_index].isSort){
                let isAsc:boolean|number = -1;
                if(vm.headDataList[header_index].isAsc == true){
                    isAsc = false;
                }else{
                    isAsc = true;
                }

                let fieldName = vm.headDataList[header_index].field;

                $scope.tableSortFun({sortIndex:header_index,fieldName:fieldName,sortStatus:isAsc});

                vm.headDataList[header_index].isAsc = isAsc;

                angular.forEach(vm.headDataList, function(data:ITableHeader,index:number){
                    if(data.isSort && index != header_index){
                        vm.headDataList[index].isAsc = -1;
                    }
                })
            }
        };

        $scope.$watch('tableHasCheck', watchTableHasCheck, true);

        function watchTableHasCheck(newData:boolean,oldData:boolean){
            vm.hasCheck = newData;
        }
        // 暂只对 isShow 属性 改变应该起效
        $scope.$watch('tableHeaders', watchHeaderDatasParams, true);

        function watchHeaderDatasParams(newVal:Array<ITableHeader>, oldVal:Array<ITableHeader>) {
            if(newVal){
                let i:number,len:number;
                for (i = 0, len = oldVal.length; i < len; i++) {
                    if(oldVal[i]&&newVal[i]){
                        if(oldVal[i].isShow != newVal[i].isShow ){
                            vm.changeTdInTrShowStatus(i,newVal[i].isShow);
                            vm.headDataList[i] = newVal[i].isShow;
                        }
                    }
                }
                vm.headDataList = headDataFormat(newVal);
            }
        }

        function headDataFormat(dataList:Array<ITableHeader>):Array<ITableHeader>{

            let resultList = new Array<ITableHeader>();
            // 默认未指定 为 isShow = true isSort= false;
            angular.forEach(dataList, function(data:ITableHeader){
                let result = angular.copy(data);

                if(typeof result.isShow == 'undefined'){
                    result.isShow = true;
                }

                if(typeof data.isSort == 'undefined'){
                    result.isSort = false;
                }

                resultList.push(result);
            });
            return resultList;
        }
    };

    link = function (scope: any, element: any, attrs: any, controller: UtilTabledHeadDirective) {
        controller.init();
    };
}

class UtilTableTrDirective {
    static $inject: Array<string> = ['$compile'];

    $compile:any;

    constructor() {

    }

    static instance() {
        return new UtilTableTrDirective();
    }

    trInTableIndex:number;
    trCheckBoxStatus:boolean;


    tdInTrList:Array<UtilTableTrTdDirective>;

    initTdInTr:Function;

    init:Function;

    restrict: string = 'AE';
    replace: boolean = true;
    transclude: boolean = true;
    require: string = '?^utilTableHead';
    scope:boolean = true;
    controller = function ($scope: any, $element: any, $attrs: any,$compile: any) {
        $scope.$compile = $compile;
        let vm = this;

        $scope.tdInTrList = [];

        vm.initTdInTr = function (tdInTrData:UtilTableTrTdDirective) {
            tdInTrData.setTdInTrIndex = $scope.tdInTrList.length;
            $scope.tdInTrList.push(tdInTrData);
        };
    };

    controllerAs: 'tableTrCtrl';
    template: string ='<tr  class="" ng-transclude>';

    link = function (scope: any, $element: any, attrs: any, tableCtrl: any) {

        let vm =scope;
        //  决定是否显示 check box
        vm.init = function(){
            vm.trInTableIndex = tableCtrl.initUnitTableTr(vm);
            vm.trCheckBoxStatus = false;
            if(tableCtrl.hasSerial){
                let temStr = '';
                if(tableCtrl.hasCheck){
                    temStr = tableTrTdHtml;
                }else{
                    temStr = tableTrTddHtml;
                }

                let _element = vm.$compile(temStr)(vm);
                $element.prepend(_element);
            }
        };

        //改变选择 chackbox
        vm.changeCheckBoxStatus = function (index:number) {
            tableCtrl.changeTrCheckBoxStatus(index);
        };

        vm.init();

        scope.$on("$destroy", function(){
            //销毁 初始化一次 父
            if(vm.trInTableIndex == 0){

                tableCtrl.init();
            }
        });
    };
}

class UtilTableTrTdDirective {
    static $inject: Array<string> = [];

    constructor() {
    }

    static instance() {
        return new UtilTableTrTdDirective();
    }

    setTdInTrStatus:Function;

    setTdInTrIndex:Function;

    restrict: string = 'AE';
    replace: boolean = true;
    transclude: boolean = true;
    template: string = '<td ng-show="tdInTrStatus" ng-transclude></td>';
    require: string = '^?utilTableTr';
    scope :boolean = true;

    link = function (scope: any, element: any, attrs: any, trCtrl: any) {
        let vm = scope;
        vm.setTdInTrStatus = function (status:boolean) {
            vm.tdInTrStatus = status;
        };

        vm.setTdInTrIndex = function (index:number) {
            vm.tdInTrIndex = index;
        };

        trCtrl.initTdInTr(vm);
    }
}

app
    .directive('utilTableHead', UtilTabledHeadDirective.instance)
    .directive('utilTableTr', UtilTableTrDirective.instance)
    .directive('utilTableTrTd', UtilTableTrTdDirective.instance)
;