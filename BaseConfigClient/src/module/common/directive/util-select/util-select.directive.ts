/**
 * Created by dell on 2017/7/4.
 */

/// <amd-dependency path="text!./util-select.html" name='utilSelectHtml' />


import {app} from '../../app/main.app';
import "css!./util-select.css";


declare let angular: any;
declare let utilSelectHtml: any;

class UtilSelectDirective {
    static $inject: Array<string> = [];

    constructor() {
    };

    static instance() {
        return new UtilSelectDirective();
    };

    restrict: string = 'AE';
    replace: Boolean = true;
    transclude: Boolean = true;
    scope = {
        selectData: "=",       //初始下拉数据 []
        selectRepeatByKey: "@",//循环输出值对应的key
        selectedVal: "=",      //初始选中的值
        selectClick: "&",      //点击事件  function(selected){}  必传同名参数：即 返回值为选中值
        selectListHeight: "@",  //下拉款最大高度限制 S  M  L  XL [200 ,300 ,400 ,500]
        selectIsTree: "@",           //是否是树形结构
        selectListDiyIcon: "@",      //列表模式自定义图标
        selectListIconFun: "&",      //列表自定义图标回调

    };
    controllerAs = 'utilselectDir';
    template = utilSelectHtml;


    optionListData: Array<any>;        //下拉列表数据
    repeatByKey: any;                  //循环输出值对应的key
    _initVal: any;                     //初始值
    selectListHeight: string;          //下拉列表最大高度
    optionListIsShow: Boolean = false; //下拉选项列表初始隐藏
    normalClick: Function;             //单击显示区域事件
    optionListClick: Function;         //选择事件
    selectedVal: any;                  //当前选中的值
    initHasSelectedVal: Boolean;       //初始是否有选中值
    mouseLeave: Function;              //鼠标离开范围自动隐藏
    isShowTree: Boolean;               //显示树形结构
    showDiyIcon: Boolean = false;      //显示自定义图标
    diyIconFun: Function;              //自定义图标回调
    emptyVal: string;
    controller = function ($scope: any, $element: any, $attrs: any) {
        this.emptyVal = $attrs.selectedEmptyVal;

        this._initVal = {
            S: "200px",
            M: "300px",
            L: "400px",
            XL: "500px",
            defaultVal: $scope.selectedVal, //默认值 请选择
            //defaultVal : "FDS_00_08_03", //默认值 请选择
        };
        //初始判断数据结构
        this.isShowTree = ($scope.selectIsTree === "true");
        //限制最大高度
        if (!!$scope.selectListHeight) {
            this.selectListHeight = !!this._initVal[$scope.selectListHeight] ? this._initVal[$scope.selectListHeight] : this._initVal["S"];
        } else {
            this.selectListHeight = this._initVal["S"];
        }
        this.initHasSelectedVal = !$scope.selectedVal;
        //初始选中的值

        //初始化判断参数类型
        if ($scope.selectData instanceof Array) {
            this.optionListData = $scope.selectData
        } else {
            console.error('selectData type error')
        }

        this.repeatByKey = null;
        (!!$scope.selectRepeatByKey) && (this.repeatByKey = $scope.selectRepeatByKey);

        //列表自定义图标显示
        ($scope.selectListDiyIcon === "true") && (this.showDiyIcon = true);
        // console.log('显示图标', this.showDiyIcon);
        //自定义图标回调
        this.diyIconFun = (e: any, data: any) => {
            e.stopPropagation();
            ($scope.selectListIconFun === "true") && ($scope.selectListIconFun({selected: data}));
        };

        //单击显示区域事件
        this.normalClick = () => {
            this.optionListIsShow = !this.optionListIsShow;
        };
        //鼠标离开有效区域
        this.mouseLeave = () => {
            this.optionListIsShow = false;
        };

        //单击选中事件
        this.optionListClick = (e: any, data: any) => {
            let returnVal;
            //单选直接关闭选项 树不关闭
            if (!this.isShowTree) {
                if (data === null) {
                    this.selectedVal = null;
                    returnVal = null;
                    // returnVal = angular.element('.u-util-select li.first').text();
                    this.initHasSelectedVal = true;
                } else {
                    this.selectedVal = data[this.repeatByKey];
                    returnVal = data;
                    this.initHasSelectedVal = false;
                }
                this.optionListIsShow = !this.optionListIsShow;
            }
            !!$scope.selectClick && $scope.selectClick({selected: returnVal})
        };
    };

    link = function (scope: any, element: any, attrs: any, controller: UtilSelectDirective) {

        scope.$watch('selectedVal', function (val: any) {
            !!scope.selectedVal ? controller.initHasSelectedVal = false : controller.initHasSelectedVal = true;
            // console.log(controller.initHasSelectedVal)

        });
        scope.$watch('selectData', function (val:any) {
            // console.log(scope.selectedVal);
            controller.selectedVal = scope.selectedVal;
            controller.optionListData = val;
        })
    };
}

app.directive('utilSelect', UtilSelectDirective.instance);