/// <amd-dependency path="text!./tree.html" />
declare var $: any;
declare var require: any;
declare var angular: any;
import {app} from "../../app/main.app";
import 'jquery';
import 'ztreev3';
import 'ztreev3.exhide';
import {ITreeDirectiveService} from "./tree.directive.service";
import "./tree.directive.service";

let treeHtml = require('text!./tree.html');

interface UtilTreeScope {
    $on: Function;
    $apply: Function;
    treeId: string;
    treeDatas: Array<any>;
    isSimpleData: boolean;
    checkEnable: boolean;
    singleSelect: boolean;
    showIcon: boolean;
    showLine: boolean;
    defaultNoDataMsg: string;
    searchNoDataMsg: string;
    onClick: Function;
    beforeClick: Function;
    beforeCheck: Function;
    beforeMouseDown: Function;

    onDblClick: Function;
    onCheck: Function;
    onExpand: Function;
    onRightClick: Function;

    treeInitComplete: Function;
    isDefaultSelected: boolean;
    treeKeyName: string;
    treeIdKey: string;
    treePidKey: string;
    $eval: Function;
    $watch: Function;
    defaultSelectTreeId: string;
    text: string;

    addDiyDom:(data: { treeId: string, treeNode: any })=> void;

    // 点位相关
    showLocateStatus: boolean | string;
    showLocateAndAttentionBtn: boolean | string;


    // 树节点拖拽相关属性
    beforeDrop: (data: { treeId: string, treeNodes: Array<any>, targetNode: any, moveType: string, isCopy: boolean }) => boolean;
    onDrop: (data: { event: MouseEvent, treeId: string, treeNodes: Array<any>, targetNode: any, moveType: string, isCopy: boolean }) => any;
    beforeDrag: (data: { treeId: string, treeNodes: Array<any> }) => boolean;
    onDrag: (data: { event: Event, treeId: string, treeNodes: Array<any> }) => any;

    editEnable: boolean;
    showRemoveBtn: boolean;
    showRenameBtn: boolean;
    isCopy: boolean;
    isMove: boolean;
    isPrev: boolean;
    isPrevByFunc: (data: { treeId: string, treeNodes: Array<any>, targetNode: any }) => boolean;
    isNext: boolean;
    isNextByFunc: (data: { treeId: string, treeNodes: Array<any>, targetNode: any }) => boolean;
    isInner: boolean;
    isInnerByFunc: (data: { treeId: string, treeNodes: Array<any>, targetNode: any }) => boolean;

    // 自动展开(与展开此结点下的所有父节点 互斥)
    defaultExpandId: string;
    // 展开此结点下的所有父节点(与自动展开 互斥)
    defaultExpandLevel: number;

    diyDomFunc1: Function;
    diyDomFunc2: Function;
    diyDomFunc3: Function;
}

class UtilTreeDirective {
    static $inject: Array<string> = ["treeDirectiveService"];

    constructor() {
    }

    static instance() {
        return new UtilTreeDirective();
    }

    scope = {
        "treeId": '@',
        "treeDatas": '=',
        "isSimpleData": '@', //是否启用父子级 *嵌套* 显示
        "checkEnable": '@',
        "singleSelect": '@',
        "showIcon": '@',
        "showLine": '@',
        "defaultNoDataMsg": '@',
        "searchNoDataMsg": '@',
        "onClick": '&',
        "beforeClick": '&',
        "beforeCheck": '&',
        'beforeMouseDown': '&',
        "onDblClick": '&',
        "onCheck": '&',
        "onExpand": '&',
        'onRightClick': '&',
        "treeInitComplete": '&',
        "isDefaultSelected": '@',
        "treeKeyName": '@',
        "treeIdKey": '@',
        "treePidKey": '@',
        "showLocateStatus": '@',
        // 显示布点+关注按钮状态
        "showLocateAndAttentionBtn": '@',
        "defaultSelectTreeId": '=',
        // 树节点拖拽相关属性
        'beforeDrop': '&',
        'onDrop': '&',
        "beforeDrag": '&',
        "onDrag": '&',
        "editEnable": '@',
        "showRemoveBtn": '@',
        "showRenameBtn": '@',
        "isCopy": '@',
        "isMove": '@',
        "isPrev": '@',
        "isNext": '@',
        "isInner": '@',
        'isPrevByFunc': '&',
        'isNextByFunc': '&',
        'isInnerByFunc': '&',
        'defaultExpanderId': '@',
        'defaultExpanderLevel': '@',
        // 用于自定义属性的回调事件, 具体是哪个func调用根据具体业务写法来定
        // 如果3个func不够，根据业务再加
        'addDiyDom': '&',
        'diyDomFunc1': '&',
        'diyDomFunc2': '&',
        'diyDomFunc3': '&'
    };

    template: string = treeHtml;
    restrict: string = 'E';
    replace: boolean = true;
    controller = function (treeDirectiveService: ITreeDirectiveService) {
        let vm = this;
        // 将service融入controller中
        vm.treeService = treeDirectiveService;
    };
    link = function (scope: UtilTreeScope & { [key: string]: Function }, iElement: any, iAttrs: any, controller: { treeService: ITreeDirectiveService }) {

        scope.$on("$destroy", () => {
            controller.treeService = null;
        });

        iAttrs.$observe('isSimpleData', function () {
            scope.isSimpleData = scope.$eval(iAttrs.isSimpleData);
        });
        iAttrs.$observe('checkEnable', function () {
            scope.checkEnable = scope.$eval(iAttrs.checkEnable);
        });
        iAttrs.$observe('showIcon', function () {
            scope.showIcon = scope.$eval(iAttrs.showIcon);
        });
        iAttrs.$observe('showLine', function () {
            scope.showLine = scope.$eval(iAttrs.showLine);
        });
        iAttrs.$observe('editEnable', function () {
            scope.editEnable = scope.$eval(iAttrs.editEnable);
        });
        iAttrs.$observe('showRemoveBtn', function () {
            scope.showRemoveBtn = scope.$eval(iAttrs.showRemoveBtn);
        });
        iAttrs.$observe('showRenameBtn', function () {
            scope.showRenameBtn = scope.$eval(iAttrs.showRenameBtn);
        });
        iAttrs.$observe('singleSelect', function () {
            scope.singleSelect = scope.$eval(iAttrs.singleSelect);
        });
        iAttrs.$observe('isDefaultSelected', function () {
            scope.isDefaultSelected = scope.$eval(iAttrs.isDefaultSelected);
        });
        iAttrs.$observe('treeKeyName', function () {
            scope.treeKeyName = iAttrs.treeKeyName;
        });
        iAttrs.$observe('treeIdKey', function () {
            scope.treeIdKey = iAttrs.treeIdKey;
        });
        iAttrs.$observe('treePidKey', function () {
            scope.treePidKey = iAttrs.treePidKey;
        });

        iAttrs.$observe('defaultExpandLevel', function () {
            scope.defaultExpandLevel = parseInt(iAttrs.defaultExpandLevel, 10);
        });

        // TODO 还有问题 待修改 resolve: wyr
        iAttrs.$observe("isCopy", function () {
            scope.isCopy = scope.$eval(iAttrs.isCopy);
        });
        iAttrs.$observe("isMove", function () {
            scope.isMove = scope.$eval(iAttrs.isMove);
        });
        iAttrs.$observe("isPrev", function () {
            scope.isPrev = scope.$eval(iAttrs.isPrev);
        });
        iAttrs.$observe("isNext", function () {
            scope.isNext = scope.$eval(iAttrs.isNext);
        });
        iAttrs.$observe("isInner", function () {
            scope.isInner = scope.$eval(iAttrs.isInner);
        });
        iAttrs.$observe("showLocateStatus", function () {
            scope.showLocateStatus = scope.$eval(iAttrs.showLocateStatus);
        });
        iAttrs.$observe("showLocateAndAttentionBtn", function () {
            scope.showLocateAndAttentionBtn = scope.$eval(iAttrs.showLocateAndAttentionBtn);
        });

        //scope.addDiyDom = angular.noop;
        // // 由于showLocateStatus此时等于字符串类型, 所以对于true or false的判断有所不同
        // if (scope.showLocateStatus) {
        //     scope.addDiyDom = controller.treeService.locateDiyDom;
        // } else if (scope.showLocateAndAttentionBtn) {
        //     let func1 = function (event: any) {
        //         let data = event.data || {};
        //         scope.diyDomFunc1({"treeId": data.treeId, "treeNode": data.treeNode});
        //     };
        //     let func2 = function (event: any) {
        //         let data = event.data || {};
        //         scope.diyDomFunc2({"treeId": data.treeId, "treeNode": data.treeNode});
        //     };
        //     scope.addDiyDom = (treeId: string, treeNode: any)=> {
        //         controller.treeService.locateAndAttentionDiyDom(treeId, treeNode, func1, func2);
        //     };
        // }

        scope.$watch('treeDatas', function (newValue: Array<any>, oldValue: Array<any>, scope: UtilTreeScope) {
            if (scope.treeDatas) {
                init(); // 重新渲染树
            }
        }, true);

        function init() {
            $.fn.zTree.destroy(scope.treeId);
            $.fn.zTree.init($("#" + scope.treeId), getDefaultSetting(), scope.treeDatas);
            // 进行一系列的业务处理
            business();
        }

        function business() {

            var node = null,
                nodes: Array<any>,
                ztreeObj = $.fn.zTree.getZTreeObj(scope.treeId);

            if (ztreeObj == null) return;

            if (scope.defaultSelectTreeId) {
                node = ztreeObj.getNodeByParam(scope.treeIdKey || "id", scope.defaultSelectTreeId);
                if (node) {
                    ztreeObj.selectNode(node, true);
                    // 触发选中查询
                    onClick(null, scope.treeId, node);
                } else {
                    let selectedNode = defaultSelectNode();
                    if (selectedNode != null) {
                        onClick(null, scope.treeId, selectedNode);
                    }
                }
            } else if (scope.isDefaultSelected) {
                let selectedNode = defaultSelectNode();
                if (selectedNode != null) {
                    onClick(null, scope.treeId, selectedNode);
                }
            }

            // 默认展开结点
            if (scope.defaultExpandId) {
                node = ztreeObj.getNodeByParam(scope.treeIdKey || "id", scope.defaultExpandId);
                if (node) {
                    // 实际参数treeNode, expandFlag, sonSign, focus, callbackFlag, 暂无需求使用到
                    ztreeObj.expandNode(node, true, false, false);
                }
            } else if (scope.defaultExpandLevel != null) {
                nodes = ztreeObj.getNodesByParam("level", scope.defaultExpandLevel, false);
                if (nodes && nodes.length > 0) {
                    let i, len;
                    for (i = 0, len = nodes.length; i < len; i++) {
                        ztreeObj.expandNode(nodes[i], true, false, false);
                    }
                }
            }

            // 触发树控件加载完成方法
            if (typeof scope.treeInitComplete === "function") {
                scope.treeInitComplete({treeId: scope.treeId});
            }
        }

        function defaultSelectNode() {
            let ztreeObj = $.fn.zTree.getZTreeObj(scope.treeId);
            if (ztreeObj == null) return null;

            let node = ztreeObj.getNodes()[0];
            if (node) {
                ztreeObj.selectNode(node, true);
            }
            return node;
        }

        function onClick(event: MouseEvent, treeId: string, treeNode: {}, clickFlag?: boolean) {
            scope.onClick({"event": event, "treeId": treeId, "treeNode": treeNode});
        }

        function _isPrevByFunc(treeId: string, treeNodes: Array<any>, targetNode: any) {
            return scope.isPrevByFunc({'treeId': treeId, 'treeNodes': treeNodes, 'targetNode': targetNode});
        }

        function _isNextByFunc(treeId: string, treeNodes: Array<any>, targetNode: any) {
            return scope.isNextByFunc({'treeId': treeId, 'treeNodes': treeNodes, 'targetNode': targetNode});
        }

        function _isInnerByFunc(treeId: string, treeNodes: Array<any>, targetNode: any) {
            return scope.isInnerByFunc({'treeId': treeId, 'treeNodes': treeNodes, 'targetNode': targetNode});
        }

        function addDiyDom(treeId: string, treeNode: any) {
            return scope.addDiyDom({'treeId': treeId, 'treeNode': treeNode});
        }

        function getDefaultSetting() {
            return {
                check: {
                    enable: scope.checkEnable,
                    chkboxType: {"Y": "s", "N": "ps"},
                    chkStye: scope.singleSelect ? "radio" : "checkbox",
                    radioType: 'all'
                },
                edit: {
                    enable: scope.editEnable,
                    showRemoveBtn: scope.showRemoveBtn,
                    showRenameBtn: scope.showRenameBtn,
                    drag: {
                        isCopy: scope.isCopy,
                        isMove: scope.isMove,
                        prev: (scope.isPrev ? scope.isPrev : _isPrevByFunc),
                        next: (scope.isNext ? scope.isNext : _isNextByFunc),
                        inner: (scope.isInner ? scope.isInner : _isInnerByFunc)
                    }
                },
                view: {
                    dblClickExpand: false,
                    showIcon: scope.showIcon,
                    showLine: scope.showLine,
                    addDiyDom: function (treeId: string, treeNode: any) {
                        if(scope.addDiyDom){
                            addDiyDom(treeId,treeNode)
                        }else{
                            return null
                        }
                    }
                },
                data: {
                    simpleData: {
                        enable: scope.isSimpleData,
                        idKey: scope.treeIdKey || "id",
                        pIdKey: scope.treePidKey || "pId"
                    },
                    key: {
                        name: scope.treeKeyName || "name"
                    }
                },
                callback: {
                    beforeClick: function (treeId: string, treeNode: {}) {
                        if (scope.beforeClick) {
                            return scope.beforeClick({'treeId': treeId, 'treeNode': treeNode});
                        }
                    },
                    beforeMouseDown: function (treeId: string, treeNode: {}) {
                        if (scope.beforeMouseDown) {
                            scope.beforeMouseDown({'treeId': treeId, 'treeNode': treeNode});
                        }
                    },
                    beforeCheck: function (treeId: string, treeNode: {}) {
                        // 最后的return true表示允许触发onCheck事件 return false表示不触发onCheck事件
                        if (scope.beforeCheck) {
                            return scope.beforeCheck({'treeId': treeId, 'treeNode': treeNode});
                        }
                    },
                    beforeDrop: function (treeId: string, treeNodes: Array<any>, targetNode: any, moveType: string, isCopy: boolean) {
                        if (scope.beforeDrop) {
                            return scope.beforeDrop({
                                'treeId': treeId,
                                'treeNodes': treeNodes,
                                'targetNode': targetNode,
                                'moveType': moveType,
                                'isCopy': isCopy
                            });
                        }
                        // 这里写死为不能拖动成功
                        return false;
                    },
                    onClick: function (event: MouseEvent, treeId: string, treeNode: {}, clickFlag: boolean) {
                        onClick(event, treeId, treeNode, clickFlag);
                    },
                    onDblClick: function (event: any, treeId: string, treeNode: {}) {
                        if (scope.onDblClick) {
                            scope.onDblClick({'event': event, 'treeId': treeId, 'treeNode': treeNode});
                        }
                    },
                    onCheck: function (event: any, treeId: string, treeNode: {}) {
                        if (scope.onCheck) {
                            scope.onCheck({'event': event, 'treeId': treeId, 'treeNode': treeNode});
                        }
                    },

                    onExpand: function (event: any, treeId: string, treeNode: {}) {
                        if (scope.onExpand) {
                            scope.onExpand({'event': event, 'treeId': treeId, 'treeNode': treeNode});
                        }
                    },
                    onRightClick: function (event: any, treeId: string, treeNode: {}) {
                        if (scope.onRightClick) {
                            scope.onRightClick({'event': event, 'treeId': treeId, 'treeNode': treeNode});
                        }
                    },
                    onDrop: function (event: MouseEvent, treeId: string, treeNodes: Array<any>, targetNode: any, moveType: string, isCopy: boolean) {
                        if (scope.onDrop) {
                            scope.onDrop({
                                'event': event,
                                'treeId': treeId,
                                'treeNodes': treeNodes,
                                'targetNode': targetNode,
                                'moveType': moveType,
                                'isCopy': isCopy
                            });
                        }
                    },
                    beforeDrag: function (treeId: string, treeNodes: Array<any>) {
                        if (scope.beforeDrag) {
                            return scope.beforeDrag({'treeId': treeId, 'treeNodes': treeNodes});
                        }
                        return true;
                    },
                    onDrag: function (event: Event, treeId: string, treeNodes: Array<any>) {
                        if (scope.onDrag) {
                            scope.onDrag({'event': event, 'treeId': treeId, 'treeNodes': treeNodes});
                        }
                    }
                }

            }
        }

    }

}

app.directive('utilTree', UtilTreeDirective.instance);