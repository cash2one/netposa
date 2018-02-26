define(["require", "exports", "../../app/main.app", "text!./tree.html", "jquery", "ztreev3", "ztreev3.exhide", "./tree.directive.service"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var treeHtml = require('text!./tree.html');
    var UtilTreeDirective = (function () {
        function UtilTreeDirective() {
            this.scope = {
                "treeId": '@',
                "treeDatas": '=',
                "isSimpleData": '@',
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
                "showLocateAndAttentionBtn": '@',
                "defaultSelectTreeId": '=',
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
                'addDiyDom': '&',
                'diyDomFunc1': '&',
                'diyDomFunc2': '&',
                'diyDomFunc3': '&'
            };
            this.template = treeHtml;
            this.restrict = 'E';
            this.replace = true;
            this.controller = function (treeDirectiveService) {
                var vm = this;
                vm.treeService = treeDirectiveService;
            };
            this.link = function (scope, iElement, iAttrs, controller) {
                scope.$on("$destroy", function () {
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
                scope.$watch('treeDatas', function (newValue, oldValue, scope) {
                    if (scope.treeDatas) {
                        init();
                    }
                }, true);
                function init() {
                    $.fn.zTree.destroy(scope.treeId);
                    $.fn.zTree.init($("#" + scope.treeId), getDefaultSetting(), scope.treeDatas);
                    business();
                }
                function business() {
                    var node = null, nodes, ztreeObj = $.fn.zTree.getZTreeObj(scope.treeId);
                    if (ztreeObj == null)
                        return;
                    if (scope.defaultSelectTreeId) {
                        node = ztreeObj.getNodeByParam(scope.treeIdKey || "id", scope.defaultSelectTreeId);
                        if (node) {
                            ztreeObj.selectNode(node, true);
                            onClick(null, scope.treeId, node);
                        }
                        else {
                            var selectedNode = defaultSelectNode();
                            if (selectedNode != null) {
                                onClick(null, scope.treeId, selectedNode);
                            }
                        }
                    }
                    else if (scope.isDefaultSelected) {
                        var selectedNode = defaultSelectNode();
                        if (selectedNode != null) {
                            onClick(null, scope.treeId, selectedNode);
                        }
                    }
                    if (scope.defaultExpandId) {
                        node = ztreeObj.getNodeByParam(scope.treeIdKey || "id", scope.defaultExpandId);
                        if (node) {
                            ztreeObj.expandNode(node, true, false, false);
                        }
                    }
                    else if (scope.defaultExpandLevel != null) {
                        nodes = ztreeObj.getNodesByParam("level", scope.defaultExpandLevel, false);
                        if (nodes && nodes.length > 0) {
                            var i = void 0, len = void 0;
                            for (i = 0, len = nodes.length; i < len; i++) {
                                ztreeObj.expandNode(nodes[i], true, false, false);
                            }
                        }
                    }
                    if (typeof scope.treeInitComplete === "function") {
                        scope.treeInitComplete({ treeId: scope.treeId });
                    }
                }
                function defaultSelectNode() {
                    var ztreeObj = $.fn.zTree.getZTreeObj(scope.treeId);
                    if (ztreeObj == null)
                        return null;
                    var node = ztreeObj.getNodes()[0];
                    if (node) {
                        ztreeObj.selectNode(node, true);
                    }
                    return node;
                }
                function onClick(event, treeId, treeNode, clickFlag) {
                    scope.onClick({ "event": event, "treeId": treeId, "treeNode": treeNode });
                }
                function _isPrevByFunc(treeId, treeNodes, targetNode) {
                    return scope.isPrevByFunc({ 'treeId': treeId, 'treeNodes': treeNodes, 'targetNode': targetNode });
                }
                function _isNextByFunc(treeId, treeNodes, targetNode) {
                    return scope.isNextByFunc({ 'treeId': treeId, 'treeNodes': treeNodes, 'targetNode': targetNode });
                }
                function _isInnerByFunc(treeId, treeNodes, targetNode) {
                    return scope.isInnerByFunc({ 'treeId': treeId, 'treeNodes': treeNodes, 'targetNode': targetNode });
                }
                function addDiyDom(treeId, treeNode) {
                    return scope.addDiyDom({ 'treeId': treeId, 'treeNode': treeNode });
                }
                function getDefaultSetting() {
                    return {
                        check: {
                            enable: scope.checkEnable,
                            chkboxType: { "Y": "s", "N": "ps" },
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
                            addDiyDom: function (treeId, treeNode) {
                                if (scope.addDiyDom) {
                                    addDiyDom(treeId, treeNode);
                                }
                                else {
                                    return null;
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
                            beforeClick: function (treeId, treeNode) {
                                if (scope.beforeClick) {
                                    return scope.beforeClick({ 'treeId': treeId, 'treeNode': treeNode });
                                }
                            },
                            beforeMouseDown: function (treeId, treeNode) {
                                if (scope.beforeMouseDown) {
                                    scope.beforeMouseDown({ 'treeId': treeId, 'treeNode': treeNode });
                                }
                            },
                            beforeCheck: function (treeId, treeNode) {
                                if (scope.beforeCheck) {
                                    return scope.beforeCheck({ 'treeId': treeId, 'treeNode': treeNode });
                                }
                            },
                            beforeDrop: function (treeId, treeNodes, targetNode, moveType, isCopy) {
                                if (scope.beforeDrop) {
                                    return scope.beforeDrop({
                                        'treeId': treeId,
                                        'treeNodes': treeNodes,
                                        'targetNode': targetNode,
                                        'moveType': moveType,
                                        'isCopy': isCopy
                                    });
                                }
                                return false;
                            },
                            onClick: function (event, treeId, treeNode, clickFlag) {
                                onClick(event, treeId, treeNode, clickFlag);
                            },
                            onDblClick: function (event, treeId, treeNode) {
                                if (scope.onDblClick) {
                                    scope.onDblClick({ 'event': event, 'treeId': treeId, 'treeNode': treeNode });
                                }
                            },
                            onCheck: function (event, treeId, treeNode) {
                                if (scope.onCheck) {
                                    scope.onCheck({ 'event': event, 'treeId': treeId, 'treeNode': treeNode });
                                }
                            },
                            onExpand: function (event, treeId, treeNode) {
                                if (scope.onExpand) {
                                    scope.onExpand({ 'event': event, 'treeId': treeId, 'treeNode': treeNode });
                                }
                            },
                            onRightClick: function (event, treeId, treeNode) {
                                if (scope.onRightClick) {
                                    scope.onRightClick({ 'event': event, 'treeId': treeId, 'treeNode': treeNode });
                                }
                            },
                            onDrop: function (event, treeId, treeNodes, targetNode, moveType, isCopy) {
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
                            beforeDrag: function (treeId, treeNodes) {
                                if (scope.beforeDrag) {
                                    return scope.beforeDrag({ 'treeId': treeId, 'treeNodes': treeNodes });
                                }
                                return true;
                            },
                            onDrag: function (event, treeId, treeNodes) {
                                if (scope.onDrag) {
                                    scope.onDrag({ 'event': event, 'treeId': treeId, 'treeNodes': treeNodes });
                                }
                            }
                        }
                    };
                }
            };
        }
        UtilTreeDirective.instance = function () {
            return new UtilTreeDirective();
        };
        UtilTreeDirective.$inject = ["treeDirectiveService"];
        return UtilTreeDirective;
    }());
    main_app_1.app.directive('utilTree', UtilTreeDirective.instance);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVdBLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBcUUzQztRQUdJO1lBT0EsVUFBSyxHQUFHO2dCQUNKLFFBQVEsRUFBRSxHQUFHO2dCQUNiLFdBQVcsRUFBRSxHQUFHO2dCQUNoQixjQUFjLEVBQUUsR0FBRztnQkFDbkIsYUFBYSxFQUFFLEdBQUc7Z0JBQ2xCLGNBQWMsRUFBRSxHQUFHO2dCQUNuQixVQUFVLEVBQUUsR0FBRztnQkFDZixVQUFVLEVBQUUsR0FBRztnQkFDZixrQkFBa0IsRUFBRSxHQUFHO2dCQUN2QixpQkFBaUIsRUFBRSxHQUFHO2dCQUN0QixTQUFTLEVBQUUsR0FBRztnQkFDZCxhQUFhLEVBQUUsR0FBRztnQkFDbEIsYUFBYSxFQUFFLEdBQUc7Z0JBQ2xCLGlCQUFpQixFQUFFLEdBQUc7Z0JBQ3RCLFlBQVksRUFBRSxHQUFHO2dCQUNqQixTQUFTLEVBQUUsR0FBRztnQkFDZCxVQUFVLEVBQUUsR0FBRztnQkFDZixjQUFjLEVBQUUsR0FBRztnQkFDbkIsa0JBQWtCLEVBQUUsR0FBRztnQkFDdkIsbUJBQW1CLEVBQUUsR0FBRztnQkFDeEIsYUFBYSxFQUFFLEdBQUc7Z0JBQ2xCLFdBQVcsRUFBRSxHQUFHO2dCQUNoQixZQUFZLEVBQUUsR0FBRztnQkFDakIsa0JBQWtCLEVBQUUsR0FBRztnQkFFdkIsMkJBQTJCLEVBQUUsR0FBRztnQkFDaEMscUJBQXFCLEVBQUUsR0FBRztnQkFFMUIsWUFBWSxFQUFFLEdBQUc7Z0JBQ2pCLFFBQVEsRUFBRSxHQUFHO2dCQUNiLFlBQVksRUFBRSxHQUFHO2dCQUNqQixRQUFRLEVBQUUsR0FBRztnQkFDYixZQUFZLEVBQUUsR0FBRztnQkFDakIsZUFBZSxFQUFFLEdBQUc7Z0JBQ3BCLGVBQWUsRUFBRSxHQUFHO2dCQUNwQixRQUFR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eUJBQU8sR0FBa0IsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBMFg3RCx3QkFBQztLQTNYRCxBQTJYQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi90cmVlLmh0bWxcIiAvPlxyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcbmRlY2xhcmUgdmFyIHJlcXVpcmU6IGFueTtcclxuZGVjbGFyZSB2YXIgYW5ndWxhcjogYW55O1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgJ2pxdWVyeSc7XHJcbmltcG9ydCAnenRyZWV2Myc7XHJcbmltcG9ydCAnenRyZWV2My5leGhpZGUnO1xyXG5pbXBvcnQge0lUcmVlRGlyZWN0aXZlU2VydmljZX0gZnJvbSBcIi4vdHJlZS5kaXJlY3RpdmUuc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuL3RyZWUuZGlyZWN0aXZlLnNlcnZpY2VcIjtcclxuXHJcbmxldCB0cmVlSHRtbCA9IHJlcXVpcmUoJ3RleHQhLi90cmVlLmh0bWwnKTtcclxuXHJcbmludGVyZmFjZSBVdGlsVHJlZVNjb3BlIHtcclxuICAgICRvbjogRnVuY3Rpb247XHJcbiAgICAkYXBwbHk6IEZ1bmN0aW9uO1xyXG4gICAgdHJlZUlkOiBzdHJpbmc7XHJcbiAgICB0cmVlRGF0YXM6IEFycmF5PGFueT47XHJcbiAgICBpc1NpbXBsZURhdGE6IGJvb2xlYW47XHJcbiAgICBjaGVja0VuYWJsZTogYm9vbGVhbjtcclxuICAgIHNpbmdsZVNlbGVjdDogYm9vbGVhbjtcclxuICAgIHNob3dJY29uOiBib29sZWFuO1xyXG4gICAgc2hvd0xpbmU6IGJvb2xlYW47XHJcbiAgICBkZWZhdWx0Tm9EYXRhTXNnOiBzdHJpbmc7XHJcbiAgICBzZWFyY2hOb0RhdGFNc2c6IHN0cmluZztcclxuICAgIG9uQ2xpY2s6IEZ1bmN0aW9uO1xyXG4gICAgYmVmb3JlQ2xpY2s6IEZ1bmN0aW9uO1xyXG4gICAgYmVmb3JlQ2hlY2s6IEZ1bmN0aW9uO1xyXG4gICAgYmVmb3JlTW91c2VEb3duOiBGdW5jdGlvbjtcclxuXHJcbiAgICBvbkRibENsaWNrOiBGdW5jdGlvbjtcclxuICAgIG9uQ2hlY2s6IEZ1bmN0aW9uO1xyXG4gICAgb25FeHBhbmQ6IEZ1bmN0aW9uO1xyXG4gICAgb25SaWdodENsaWNrOiBGdW5jdGlvbjtcclxuXHJcbiAgICB0cmVlSW5pdENvbXBsZXRlOiBGdW5jdGlvbjtcclxuICAgIGlzRGVmYXVsdFNlbGVjdGVkOiBib29sZWFuO1xyXG4gICAgdHJlZUtleU5hbWU6IHN0cmluZztcclxuICAgIHRyZWVJZEtleTogc3RyaW5nO1xyXG4gICAgdHJlZVBpZEtleTogc3RyaW5nO1xyXG4gICAgJGV2YWw6IEZ1bmN0aW9uO1xyXG4gICAgJHdhdGNoOiBGdW5jdGlvbjtcclxuICAgIGRlZmF1bHRTZWxlY3RUcmVlSWQ6IHN0cmluZztcclxuICAgIHRleHQ6IHN0cmluZztcclxuXHJcbiAgICBhZGREaXlEb206KGRhdGE6IHsgdHJlZUlkOiBzdHJpbmcsIHRyZWVOb2RlOiBhbnkgfSk9PiB2b2lkO1xyXG5cclxuICAgIC8vIOeCueS9jeebuOWFs1xyXG4gICAgc2hvd0xvY2F0ZVN0YXR1czogYm9vbGVhbiB8IHN0cmluZztcclxuICAgIHNob3dMb2NhdGVBbmRBdHRlbnRpb25CdG46IGJvb2xlYW4gfCBzdHJpbmc7XHJcblxyXG5cclxuICAgIC8vIOagkeiKgueCueaLluaLveebuOWFs+WxnuaAp1xyXG4gICAgYmVmb3JlRHJvcDogKGRhdGE6IHsgdHJlZUlkOiBzdHJpbmcsIHRyZWVOb2RlczogQXJyYXk8YW55PiwgdGFyZ2V0Tm9kZTogYW55LCBtb3ZlVHlwZTogc3RyaW5nLCBpc0NvcHk6IGJvb2xlYW4gfSkgPT4gYm9vbGVhbjtcclxuICAgIG9uRHJvcDogKGRhdGE6IHsgZXZlbnQ6IE1vdXNlRXZlbnQsIHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZXM6IEFycmF5PGFueT4sIHRhcmdldE5vZGU6IGFueSwgbW92ZVR5cGU6IHN0cmluZywgaXNDb3B5OiBib29sZWFuIH0pID0+IGFueTtcclxuICAgIGJlZm9yZURyYWc6IChkYXRhOiB7IHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZXM6IEFycmF5PGFueT4gfSkgPT4gYm9vbGVhbjtcclxuICAgIG9uRHJhZzogKGRhdGE6IHsgZXZlbnQ6IEV2ZW50LCB0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGVzOiBBcnJheTxhbnk+IH0pID0+IGFueTtcclxuXHJcbiAgICBlZGl0RW5hYmxlOiBib29sZWFuO1xyXG4gICAgc2hvd1JlbW92ZUJ0bjogYm9vbGVhbjtcclxuICAgIHNob3dSZW5hbWVCdG46IGJvb2xlYW47XHJcbiAgICBpc0NvcHk6IGJvb2xlYW47XHJcbiAgICBpc01vdmU6IGJvb2xlYW47XHJcbiAgICBpc1ByZXY6IGJvb2xlYW47XHJcbiAgICBpc1ByZXZCeUZ1bmM6IChkYXRhOiB7IHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZXM6IEFycmF5PGFueT4sIHRhcmdldE5vZGU6IGFueSB9KSA9PiBib29sZWFuO1xyXG4gICAgaXNOZXh0OiBib29sZWFuO1xyXG4gICAgaXNOZXh0QnlGdW5jOiAoZGF0YTogeyB0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGVzOiBBcnJheTxhbnk+LCB0YXJnZXROb2RlOiBhbnkgfSkgPT4gYm9vbGVhbjtcclxuICAgIGlzSW5uZXI6IGJvb2xlYW47XHJcbiAgICBpc0lubmVyQnlGdW5jOiAoZGF0YTogeyB0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGVzOiBBcnJheTxhbnk+LCB0YXJnZXROb2RlOiBhbnkgfSkgPT4gYm9vbGVhbjtcclxuXHJcbiAgICAvLyDoh6rliqjlsZXlvIAo5LiO5bGV5byA5q2k57uT54K55LiL55qE5omA5pyJ54i26IqC54K5IOS6kuaWpSlcclxuICAgIGRlZmF1bHRFeHBhbmRJZDogc3RyaW5nO1xyXG4gICAgLy8g5bGV5byA5q2k57uT54K55LiL55qE5omA5pyJ54i26IqC54K5KOS4juiHquWKqOWxleW8gCDkupLmlqUpXHJcbiAgICBkZWZhdWx0RXhwYW5kTGV2ZWw6IG51bWJlcjtcclxuXHJcbiAgICBkaXlEb21GdW5jMTogRnVuY3Rpb247XHJcbiAgICBkaXlEb21GdW5jMjogRnVuY3Rpb247XHJcbiAgICBkaXlEb21GdW5jMzogRnVuY3Rpb247XHJcbn1cclxuXHJcbmNsYXNzIFV0aWxUcmVlRGlyZWN0aXZlIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0OiBBcnJheTxzdHJpbmc+ID0gW1widHJlZURpcmVjdGl2ZVNlcnZpY2VcIl07XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGluc3RhbmNlKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVXRpbFRyZWVEaXJlY3RpdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBzY29wZSA9IHtcclxuICAgICAgICBcInRyZWVJZFwiOiAnQCcsXHJcbiAgICAgICAgXCJ0cmVlRGF0YXNcIjogJz0nLFxyXG4gICAgICAgIFwiaXNTaW1wbGVEYXRhXCI6ICdAJywgLy/mmK/lkKblkK/nlKjniLblrZDnuqcgKuW1jOWllyog5pi+56S6XHJcbiAgICAgICAgXCJjaGVja0VuYWJsZVwiOiAnQCcsXHJcbiAgICAgICAgXCJzaW5nbGVTZWxlY3RcIjogJ0AnLFxyXG4gICAgICAgIFwic2hvd0ljb25cIjogJ0AnLFxyXG4gICAgICAgIFwic2hvd0xpbmVcIjogJ0AnLFxyXG4gICAgICAgIFwiZGVmYXVsdE5vRGF0YU1zZ1wiOiAnQCcsXHJcbiAgICAgICAgXCJzZWFyY2hOb0RhdGFNc2dcIjogJ0AnLFxyXG4gICAgICAgIFwib25DbGlja1wiOiAnJicsXHJcbiAgICAgICAgXCJiZWZvcmVDbGlja1wiOiAnJicsXHJcbiAgICAgICAgXCJiZWZvcmVDaGVja1wiOiAnJicsXHJcbiAgICAgICAgJ2JlZm9yZU1vdXNlRG93bic6ICcmJyxcclxuICAgICAgICBcIm9uRGJsQ2xpY2tcIjogJyYnLFxyXG4gICAgICAgIFwib25DaGVja1wiOiAnJicsXHJcbiAgICAgICAgXCJvbkV4cGFuZFwiOiAnJicsXHJcbiAgICAgICAgJ29uUmlnaHRDbGljayc6ICcmJyxcclxuICAgICAgICBcInRyZWVJbml0Q29tcGxldGVcIjogJyYnLFxyXG4gICAgICAgIFwiaXNEZWZhdWx0U2VsZWN0ZWRcIjogJ0AnLFxyXG4gICAgICAgIFwidHJlZUtleU5hbWVcIjogJ0AnLFxyXG4gICAgICAgIFwidHJlZUlkS2V5XCI6ICdAJyxcclxuICAgICAgICBcInRyZWVQaWRLZXlcIjogJ0AnLFxyXG4gICAgICAgIFwic2hvd0xvY2F0ZVN0YXR1c1wiOiAnQCcsXHJcbiAgICAgICAgLy8g5pi+56S65biD54K5K+WFs+azqOaMiemSrueKtuaAgVxyXG4gICAgICAgIFwic2hvd0xvY2F0ZUFuZEF0dGVudGlvbkJ0blwiOiAnQCcsXHJcbiAgICAgICAgXCJkZWZhdWx0U2VsZWN0VHJlZUlkXCI6ICc9JyxcclxuICAgICAgICAvLyDmoJHoioLngrnmi5bmi73nm7jlhbPlsZ7mgKdcclxuICAgICAgICAnYmVmb3JlRHJvcCc6ICcmJyxcclxuICAgICAgICAnb25Ecm9wJzogJyYnLFxyXG4gICAgICAgIFwiYmVmb3JlRHJhZ1wiOiAnJicsXHJcbiAgICAgICAgXCJvbkRyYWdcIjogJyYnLFxyXG4gICAgICAgIFwiZWRpdEVuYWJsZVwiOiAnQCcsXHJcbiAgICAgICAgXCJzaG93UmVtb3ZlQnRuXCI6ICdAJyxcclxuICAgICAgICBcInNob3dSZW5hbWVCdG5cIjogJ0AnLFxyXG4gICAgICAgIFwiaXNDb3B5XCI6ICdAJyxcclxuICAgICAgICBcImlzTW92ZVwiOiAnQCcsXHJcbiAgICAgICAgXCJpc1ByZXZcIjogJ0AnLFxyXG4gICAgICAgIFwiaXNOZXh0XCI6ICdAJyxcclxuICAgICAgICBcImlzSW5uZXJcIjogJ0AnLFxyXG4gICAgICAgICdpc1ByZXZCeUZ1bmMnOiAnJicsXHJcbiAgICAgICAgJ2lzTmV4dEJ5RnVuYyc6ICcmJyxcclxuICAgICAgICAnaXNJbm5lckJ5RnVuYyc6ICcmJyxcclxuICAgICAgICAnZGVmYXVsdEV4cGFuZGVySWQnOiAnQCcsXHJcbiAgICAgICAgJ2RlZmF1bHRFeHBhbmRlckxldmVsJzogJ0AnLFxyXG4gICAgICAgIC8vIOeUqOS6juiHquWumuS5ieWxnuaAp+eahOWbnuiwg+S6i+S7tiwg5YW35L2T5piv5ZOq5LiqZnVuY+iwg+eUqOagueaNruWFt+S9k+S4muWKoeWGmeazleadpeWumlxyXG4gICAgICAgIC8vIOWmguaenDPkuKpmdW5j5LiN5aSf77yM5qC55o2u5Lia5Yqh5YaN5YqgXHJcbiAgICAgICAgJ2FkZERpeURvbSc6ICcmJyxcclxuICAgICAgICAnZGl5RG9tRnVuYzEnOiAnJicsXHJcbiAgICAgICAgJ2RpeURvbUZ1bmMyJzogJyYnLFxyXG4gICAgICAgICdkaXlEb21GdW5jMyc6ICcmJ1xyXG4gICAgfTtcclxuXHJcbiAgICB0ZW1wbGF0ZTogc3RyaW5nID0gdHJlZUh0bWw7XHJcbiAgICByZXN0cmljdDogc3RyaW5nID0gJ0UnO1xyXG4gICAgcmVwbGFjZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBjb250cm9sbGVyID0gZnVuY3Rpb24gKHRyZWVEaXJlY3RpdmVTZXJ2aWNlOiBJVHJlZURpcmVjdGl2ZVNlcnZpY2UpIHtcclxuICAgICAgICBsZXQgdm0gPSB0aGlzO1xyXG4gICAgICAgIC8vIOWwhnNlcnZpY2Xono3lhaVjb250cm9sbGVy5LitXHJcbiAgICAgICAgdm0udHJlZVNlcnZpY2UgPSB0cmVlRGlyZWN0aXZlU2VydmljZTtcclxuICAgIH07XHJcbiAgICBsaW5rID0gZnVuY3Rpb24gKHNjb3BlOiBVdGlsVHJlZVNjb3BlICYgeyBba2V5OiBzdHJpbmddOiBGdW5jdGlvbiB9LCBpRWxlbWVudDogYW55LCBpQXR0cnM6IGFueSwgY29udHJvbGxlcjogeyB0cmVlU2VydmljZTogSVRyZWVEaXJlY3RpdmVTZXJ2aWNlIH0pIHtcclxuXHJcbiAgICAgICAgc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb250cm9sbGVyLnRyZWVTZXJ2aWNlID0gbnVsbDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaUF0dHJzLiRvYnNlcnZlKCdpc1NpbXBsZURhdGEnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNjb3BlLmlzU2ltcGxlRGF0YSA9IHNjb3BlLiRldmFsKGlBdHRycy5pc1NpbXBsZURhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlBdHRycy4kb2JzZXJ2ZSgnY2hlY2tFbmFibGUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNjb3BlLmNoZWNrRW5hYmxlID0gc2NvcGUuJGV2YWwoaUF0dHJzLmNoZWNrRW5hYmxlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpQXR0cnMuJG9ic2VydmUoJ3Nob3dJY29uJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzY29wZS5zaG93SWNvbiA9IHNjb3BlLiRldmFsKGlBdHRycy5zaG93SWNvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaUF0dHJzLiRvYnNlcnZlKCdzaG93TGluZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2NvcGUuc2hvd0xpbmUgPSBzY29wZS4kZXZhbChpQXR0cnMuc2hvd0xpbmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlBdHRycy4kb2JzZXJ2ZSgnZWRpdEVuYWJsZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2NvcGUuZWRpdEVuYWJsZSA9IHNjb3BlLiRldmFsKGlBdHRycy5lZGl0RW5hYmxlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpQXR0cnMuJG9ic2VydmUoJ3Nob3dSZW1vdmVCdG4nLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNjb3BlLnNob3dSZW1vdmVCdG4gPSBzY29wZS4kZXZhbChpQXR0cnMuc2hvd1JlbW92ZUJ0bik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaUF0dHJzLiRvYnNlcnZlKCdzaG93UmVuYW1lQnRuJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzY29wZS5zaG93UmVuYW1lQnRuID0gc2NvcGUuJGV2YWwoaUF0dHJzLnNob3dSZW5hbWVCdG4pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlBdHRycy4kb2JzZXJ2ZSgnc2luZ2xlU2VsZWN0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzY29wZS5zaW5nbGVTZWxlY3QgPSBzY29wZS4kZXZhbChpQXR0cnMuc2luZ2xlU2VsZWN0KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpQXR0cnMuJG9ic2VydmUoJ2lzRGVmYXVsdFNlbGVjdGVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzY29wZS5pc0RlZmF1bHRTZWxlY3RlZCA9IHNjb3BlLiRldmFsKGlBdHRycy5pc0RlZmF1bHRTZWxlY3RlZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaUF0dHJzLiRvYnNlcnZlKCd0cmVlS2V5TmFtZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2NvcGUudHJlZUtleU5hbWUgPSBpQXR0cnMudHJlZUtleU5hbWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaUF0dHJzLiRvYnNlcnZlKCd0cmVlSWRLZXknLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNjb3BlLnRyZWVJZEtleSA9IGlBdHRycy50cmVlSWRLZXk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaUF0dHJzLiRvYnNlcnZlKCd0cmVlUGlkS2V5JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzY29wZS50cmVlUGlkS2V5ID0gaUF0dHJzLnRyZWVQaWRLZXk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlBdHRycy4kb2JzZXJ2ZSgnZGVmYXVsdEV4cGFuZExldmVsJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzY29wZS5kZWZhdWx0RXhwYW5kTGV2ZWwgPSBwYXJzZUludChpQXR0cnMuZGVmYXVsdEV4cGFuZExldmVsLCAxMCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFRPRE8g6L+Y5pyJ6Zeu6aKYIOW+heS/ruaUuSByZXNvbHZlOiB3eXJcclxuICAgICAgICBpQXR0cnMuJG9ic2VydmUoXCJpc0NvcHlcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzY29wZS5pc0NvcHkgPSBzY29wZS4kZXZhbChpQXR0cnMuaXNDb3B5KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpQXR0cnMuJG9ic2VydmUoXCJpc01vdmVcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzY29wZS5pc01vdmUgPSBzY29wZS4kZXZhbChpQXR0cnMuaXNNb3ZlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpQXR0cnMuJG9ic2VydmUoXCJpc1ByZXZcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzY29wZS5pc1ByZXYgPSBzY29wZS4kZXZhbChpQXR0cnMuaXNQcmV2KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpQXR0cnMuJG9ic2VydmUoXCJpc05leHRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzY29wZS5pc05leHQgPSBzY29wZS4kZXZhbChpQXR0cnMuaXNOZXh0KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpQXR0cnMuJG9ic2VydmUoXCJpc0lubmVyXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2NvcGUuaXNJbm5lciA9IHNjb3BlLiRldmFsKGlBdHRycy5pc0lubmVyKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpQXR0cnMuJG9ic2VydmUoXCJzaG93TG9jYXRlU3RhdHVzXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2NvcGUuc2hvd0xvY2F0ZVN0YXR1cyA9IHNjb3BlLiRldmFsKGlBdHRycy5zaG93TG9jYXRlU3RhdHVzKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpQXR0cnMuJG9ic2VydmUoXCJzaG93TG9jYXRlQW5kQXR0ZW50aW9uQnRuXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2NvcGUuc2hvd0xvY2F0ZUFuZEF0dGVudGlvbkJ0biA9IHNjb3BlLiRldmFsKGlBdHRycy5zaG93TG9jYXRlQW5kQXR0ZW50aW9uQnRuKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9zY29wZS5hZGREaXlEb20gPSBhbmd1bGFyLm5vb3A7XHJcbiAgICAgICAgLy8gLy8g55Sx5LqOc2hvd0xvY2F0ZVN0YXR1c+atpOaXtuetieS6juWtl+espuS4suexu+Weiywg5omA5Lul5a+55LqOdHJ1ZSBvciBmYWxzZeeahOWIpOaWreacieaJgOS4jeWQjFxyXG4gICAgICAgIC8vIGlmIChzY29wZS5zaG93TG9jYXRlU3RhdHVzKSB7XHJcbiAgICAgICAgLy8gICAgIHNjb3BlLmFkZERpeURvbSA9IGNvbnRyb2xsZXIudHJlZVNlcnZpY2UubG9jYXRlRGl5RG9tO1xyXG4gICAgICAgIC8vIH0gZWxzZSBpZiAoc2NvcGUuc2hvd0xvY2F0ZUFuZEF0dGVudGlvbkJ0bikge1xyXG4gICAgICAgIC8vICAgICBsZXQgZnVuYzEgPSBmdW5jdGlvbiAoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IGRhdGEgPSBldmVudC5kYXRhIHx8IHt9O1xyXG4gICAgICAgIC8vICAgICAgICAgc2NvcGUuZGl5RG9tRnVuYzEoe1widHJlZUlkXCI6IGRhdGEudHJlZUlkLCBcInRyZWVOb2RlXCI6IGRhdGEudHJlZU5vZGV9KTtcclxuICAgICAgICAvLyAgICAgfTtcclxuICAgICAgICAvLyAgICAgbGV0IGZ1bmMyID0gZnVuY3Rpb24gKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBkYXRhID0gZXZlbnQuZGF0YSB8fCB7fTtcclxuICAgICAgICAvLyAgICAgICAgIHNjb3BlLmRpeURvbUZ1bmMyKHtcInRyZWVJZFwiOiBkYXRhLnRyZWVJZCwgXCJ0cmVlTm9kZVwiOiBkYXRhLnRyZWVOb2RlfSk7XHJcbiAgICAgICAgLy8gICAgIH07XHJcbiAgICAgICAgLy8gICAgIHNjb3BlLmFkZERpeURvbSA9ICh0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGU6IGFueSk9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICBjb250cm9sbGVyLnRyZWVTZXJ2aWNlLmxvY2F0ZUFuZEF0dGVudGlvbkRpeURvbSh0cmVlSWQsIHRyZWVOb2RlLCBmdW5jMSwgZnVuYzIpO1xyXG4gICAgICAgIC8vICAgICB9O1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgc2NvcGUuJHdhdGNoKCd0cmVlRGF0YXMnLCBmdW5jdGlvbiAobmV3VmFsdWU6IEFycmF5PGFueT4sIG9sZFZhbHVlOiBBcnJheTxhbnk+LCBzY29wZTogVXRpbFRyZWVTY29wZSkge1xyXG4gICAgICAgICAgICBpZiAoc2NvcGUudHJlZURhdGFzKSB7XHJcbiAgICAgICAgICAgICAgICBpbml0KCk7IC8vIOmHjeaWsOa4suafk+agkVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgICQuZm4uelRyZWUuZGVzdHJveShzY29wZS50cmVlSWQpO1xyXG4gICAgICAgICAgICAkLmZuLnpUcmVlLmluaXQoJChcIiNcIiArIHNjb3BlLnRyZWVJZCksIGdldERlZmF1bHRTZXR0aW5nKCksIHNjb3BlLnRyZWVEYXRhcyk7XHJcbiAgICAgICAgICAgIC8vIOi/m+ihjOS4gOezu+WIl+eahOS4muWKoeWkhOeQhlxyXG4gICAgICAgICAgICBidXNpbmVzcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYnVzaW5lc3MoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IG51bGwsXHJcbiAgICAgICAgICAgICAgICBub2RlczogQXJyYXk8YW55PixcclxuICAgICAgICAgICAgICAgIHp0cmVlT2JqID0gJC5mbi56VHJlZS5nZXRaVHJlZU9iaihzY29wZS50cmVlSWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHp0cmVlT2JqID09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGlmIChzY29wZS5kZWZhdWx0U2VsZWN0VHJlZUlkKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0genRyZWVPYmouZ2V0Tm9kZUJ5UGFyYW0oc2NvcGUudHJlZUlkS2V5IHx8IFwiaWRcIiwgc2NvcGUuZGVmYXVsdFNlbGVjdFRyZWVJZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHp0cmVlT2JqLnNlbGVjdE5vZGUobm9kZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6Kem5Y+R6YCJ5Lit5p+l6K+iXHJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljayhudWxsLCBzY29wZS50cmVlSWQsIG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWROb2RlID0gZGVmYXVsdFNlbGVjdE5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWROb2RlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljayhudWxsLCBzY29wZS50cmVlSWQsIHNlbGVjdGVkTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNjb3BlLmlzRGVmYXVsdFNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWROb2RlID0gZGVmYXVsdFNlbGVjdE5vZGUoKTtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZE5vZGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2sobnVsbCwgc2NvcGUudHJlZUlkLCBzZWxlY3RlZE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyDpu5jorqTlsZXlvIDnu5PngrlcclxuICAgICAgICAgICAgaWYgKHNjb3BlLmRlZmF1bHRFeHBhbmRJZCkge1xyXG4gICAgICAgICAgICAgICAgbm9kZSA9IHp0cmVlT2JqLmdldE5vZGVCeVBhcmFtKHNjb3BlLnRyZWVJZEtleSB8fCBcImlkXCIsIHNjb3BlLmRlZmF1bHRFeHBhbmRJZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWunumZheWPguaVsHRyZWVOb2RlLCBleHBhbmRGbGFnLCBzb25TaWduLCBmb2N1cywgY2FsbGJhY2tGbGFnLCDmmoLml6DpnIDmsYLkvb/nlKjliLBcclxuICAgICAgICAgICAgICAgICAgICB6dHJlZU9iai5leHBhbmROb2RlKG5vZGUsIHRydWUsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2NvcGUuZGVmYXVsdEV4cGFuZExldmVsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIG5vZGVzID0genRyZWVPYmouZ2V0Tm9kZXNCeVBhcmFtKFwibGV2ZWxcIiwgc2NvcGUuZGVmYXVsdEV4cGFuZExldmVsLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZXMgJiYgbm9kZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpLCBsZW47XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gbm9kZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgenRyZWVPYmouZXhwYW5kTm9kZShub2Rlc1tpXSwgdHJ1ZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIOinpuWPkeagkeaOp+S7tuWKoOi9veWujOaIkOaWueazlVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHNjb3BlLnRyZWVJbml0Q29tcGxldGUgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUudHJlZUluaXRDb21wbGV0ZSh7dHJlZUlkOiBzY29wZS50cmVlSWR9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZGVmYXVsdFNlbGVjdE5vZGUoKSB7XHJcbiAgICAgICAgICAgIGxldCB6dHJlZU9iaiA9ICQuZm4uelRyZWUuZ2V0WlRyZWVPYmooc2NvcGUudHJlZUlkKTtcclxuICAgICAgICAgICAgaWYgKHp0cmVlT2JqID09IG51bGwpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgbGV0IG5vZGUgPSB6dHJlZU9iai5nZXROb2RlcygpWzBdO1xyXG4gICAgICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgenRyZWVPYmouc2VsZWN0Tm9kZShub2RlLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZToge30sIGNsaWNrRmxhZz86IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgc2NvcGUub25DbGljayh7XCJldmVudFwiOiBldmVudCwgXCJ0cmVlSWRcIjogdHJlZUlkLCBcInRyZWVOb2RlXCI6IHRyZWVOb2RlfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfaXNQcmV2QnlGdW5jKHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZXM6IEFycmF5PGFueT4sIHRhcmdldE5vZGU6IGFueSkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2NvcGUuaXNQcmV2QnlGdW5jKHsndHJlZUlkJzogdHJlZUlkLCAndHJlZU5vZGVzJzogdHJlZU5vZGVzLCAndGFyZ2V0Tm9kZSc6IHRhcmdldE5vZGV9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9pc05leHRCeUZ1bmModHJlZUlkOiBzdHJpbmcsIHRyZWVOb2RlczogQXJyYXk8YW55PiwgdGFyZ2V0Tm9kZTogYW55KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzY29wZS5pc05leHRCeUZ1bmMoeyd0cmVlSWQnOiB0cmVlSWQsICd0cmVlTm9kZXMnOiB0cmVlTm9kZXMsICd0YXJnZXROb2RlJzogdGFyZ2V0Tm9kZX0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2lzSW5uZXJCeUZ1bmModHJlZUlkOiBzdHJpbmcsIHRyZWVOb2RlczogQXJyYXk8YW55PiwgdGFyZ2V0Tm9kZTogYW55KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzY29wZS5pc0lubmVyQnlGdW5jKHsndHJlZUlkJzogdHJlZUlkLCAndHJlZU5vZGVzJzogdHJlZU5vZGVzLCAndGFyZ2V0Tm9kZSc6IHRhcmdldE5vZGV9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZERpeURvbSh0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGU6IGFueSkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2NvcGUuYWRkRGl5RG9tKHsndHJlZUlkJzogdHJlZUlkLCAndHJlZU5vZGUnOiB0cmVlTm9kZX0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RGVmYXVsdFNldHRpbmcoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBjaGVjazoge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZTogc2NvcGUuY2hlY2tFbmFibGUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hrYm94VHlwZToge1wiWVwiOiBcInNcIiwgXCJOXCI6IFwicHNcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hrU3R5ZTogc2NvcGUuc2luZ2xlU2VsZWN0ID8gXCJyYWRpb1wiIDogXCJjaGVja2JveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvVHlwZTogJ2FsbCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlZGl0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlOiBzY29wZS5lZGl0RW5hYmxlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dSZW1vdmVCdG46IHNjb3BlLnNob3dSZW1vdmVCdG4sXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd1JlbmFtZUJ0bjogc2NvcGUuc2hvd1JlbmFtZUJ0bixcclxuICAgICAgICAgICAgICAgICAgICBkcmFnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29weTogc2NvcGUuaXNDb3B5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc01vdmU6IHNjb3BlLmlzTW92ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldjogKHNjb3BlLmlzUHJldiA/IHNjb3BlLmlzUHJldiA6IF9pc1ByZXZCeUZ1bmMpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiAoc2NvcGUuaXNOZXh0ID8gc2NvcGUuaXNOZXh0IDogX2lzTmV4dEJ5RnVuYyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyOiAoc2NvcGUuaXNJbm5lciA/IHNjb3BlLmlzSW5uZXIgOiBfaXNJbm5lckJ5RnVuYylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdmlldzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGRibENsaWNrRXhwYW5kOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93SWNvbjogc2NvcGUuc2hvd0ljb24sXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0xpbmU6IHNjb3BlLnNob3dMaW5lLFxyXG4gICAgICAgICAgICAgICAgICAgIGFkZERpeURvbTogZnVuY3Rpb24gKHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZTogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNjb3BlLmFkZERpeURvbSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGREaXlEb20odHJlZUlkLHRyZWVOb2RlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIHNpbXBsZURhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlOiBzY29wZS5pc1NpbXBsZURhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkS2V5OiBzY29wZS50cmVlSWRLZXkgfHwgXCJpZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwSWRLZXk6IHNjb3BlLnRyZWVQaWRLZXkgfHwgXCJwSWRcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHNjb3BlLnRyZWVLZXlOYW1lIHx8IFwibmFtZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmVmb3JlQ2xpY2s6IGZ1bmN0aW9uICh0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGU6IHt9KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY29wZS5iZWZvcmVDbGljaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjb3BlLmJlZm9yZUNsaWNrKHsndHJlZUlkJzogdHJlZUlkLCAndHJlZU5vZGUnOiB0cmVlTm9kZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBiZWZvcmVNb3VzZURvd246IGZ1bmN0aW9uICh0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGU6IHt9KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY29wZS5iZWZvcmVNb3VzZURvd24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLmJlZm9yZU1vdXNlRG93bih7J3RyZWVJZCc6IHRyZWVJZCwgJ3RyZWVOb2RlJzogdHJlZU5vZGV9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYmVmb3JlQ2hlY2s6IGZ1bmN0aW9uICh0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGU6IHt9KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOacgOWQjueahHJldHVybiB0cnVl6KGo56S65YWB6K646Kem5Y+Rb25DaGVja+S6i+S7tiByZXR1cm4gZmFsc2XooajnpLrkuI3op6blj5FvbkNoZWNr5LqL5Lu2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY29wZS5iZWZvcmVDaGVjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjb3BlLmJlZm9yZUNoZWNrKHsndHJlZUlkJzogdHJlZUlkLCAndHJlZU5vZGUnOiB0cmVlTm9kZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBiZWZvcmVEcm9wOiBmdW5jdGlvbiAodHJlZUlkOiBzdHJpbmcsIHRyZWVOb2RlczogQXJyYXk8YW55PiwgdGFyZ2V0Tm9kZTogYW55LCBtb3ZlVHlwZTogc3RyaW5nLCBpc0NvcHk6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjb3BlLmJlZm9yZURyb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzY29wZS5iZWZvcmVEcm9wKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndHJlZUlkJzogdHJlZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0cmVlTm9kZXMnOiB0cmVlTm9kZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RhcmdldE5vZGUnOiB0YXJnZXROb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtb3ZlVHlwZSc6IG1vdmVUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpc0NvcHknOiBpc0NvcHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOi/memHjOWGmeatu+S4uuS4jeiDveaLluWKqOaIkOWKn1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiAoZXZlbnQ6IE1vdXNlRXZlbnQsIHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZToge30sIGNsaWNrRmxhZzogYm9vbGVhbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrKGV2ZW50LCB0cmVlSWQsIHRyZWVOb2RlLCBjbGlja0ZsYWcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb25EYmxDbGljazogZnVuY3Rpb24gKGV2ZW50OiBhbnksIHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZToge30pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjb3BlLm9uRGJsQ2xpY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLm9uRGJsQ2xpY2soeydldmVudCc6IGV2ZW50LCAndHJlZUlkJzogdHJlZUlkLCAndHJlZU5vZGUnOiB0cmVlTm9kZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBvbkNoZWNrOiBmdW5jdGlvbiAoZXZlbnQ6IGFueSwgdHJlZUlkOiBzdHJpbmcsIHRyZWVOb2RlOiB7fSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2NvcGUub25DaGVjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUub25DaGVjayh7J2V2ZW50JzogZXZlbnQsICd0cmVlSWQnOiB0cmVlSWQsICd0cmVlTm9kZSc6IHRyZWVOb2RlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvbkV4cGFuZDogZnVuY3Rpb24gKGV2ZW50OiBhbnksIHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZToge30pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjb3BlLm9uRXhwYW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5vbkV4cGFuZCh7J2V2ZW50JzogZXZlbnQsICd0cmVlSWQnOiB0cmVlSWQsICd0cmVlTm9kZSc6IHRyZWVOb2RlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG9uUmlnaHRDbGljazogZnVuY3Rpb24gKGV2ZW50OiBhbnksIHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZToge30pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjb3BlLm9uUmlnaHRDbGljaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUub25SaWdodENsaWNrKHsnZXZlbnQnOiBldmVudCwgJ3RyZWVJZCc6IHRyZWVJZCwgJ3RyZWVOb2RlJzogdHJlZU5vZGV9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb25Ecm9wOiBmdW5jdGlvbiAoZXZlbnQ6IE1vdXNlRXZlbnQsIHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZXM6IEFycmF5PGFueT4sIHRhcmdldE5vZGU6IGFueSwgbW92ZVR5cGU6IHN0cmluZywgaXNDb3B5OiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY29wZS5vbkRyb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLm9uRHJvcCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2V2ZW50JzogZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RyZWVJZCc6IHRyZWVJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndHJlZU5vZGVzJzogdHJlZU5vZGVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0YXJnZXROb2RlJzogdGFyZ2V0Tm9kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbW92ZVR5cGUnOiBtb3ZlVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaXNDb3B5JzogaXNDb3B5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYmVmb3JlRHJhZzogZnVuY3Rpb24gKHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZXM6IEFycmF5PGFueT4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjb3BlLmJlZm9yZURyYWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzY29wZS5iZWZvcmVEcmFnKHsndHJlZUlkJzogdHJlZUlkLCAndHJlZU5vZGVzJzogdHJlZU5vZGVzfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBvbkRyYWc6IGZ1bmN0aW9uIChldmVudDogRXZlbnQsIHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZXM6IEFycmF5PGFueT4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjb3BlLm9uRHJhZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUub25EcmFnKHsnZXZlbnQnOiBldmVudCwgJ3RyZWVJZCc6IHRyZWVJZCwgJ3RyZWVOb2Rlcyc6IHRyZWVOb2Rlc30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5hcHAuZGlyZWN0aXZlKCd1dGlsVHJlZScsIFV0aWxUcmVlRGlyZWN0aXZlLmluc3RhbmNlKTsiXX0=
