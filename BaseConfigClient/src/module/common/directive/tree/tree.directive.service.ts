import { app } from "../../app/main.app";
import { TreeType } from "../../../../core/enum/TreeType";

/**
 * Created by Blackfang on 2017/5/12.
 * 由于树控件交互较复杂，且需要有主动去触发树控件改变的一系列方法，故为了便于统一维护，将所有主动调用树节点的方法都放到这个service中进行
 */
declare let $: any;
declare let angular: any;

export interface ITreeDirectiveService {
    moveNode(treeId: string, treeNode: any, targetNode: any, moveType: string, isSilent?: boolean): void;

    moveNodes(treeId: string, treeNodes: Array<any>, targetNode: any, moveType: string, isSilent?: boolean): void;

    getNodeByParam(treeId: string, key: string, value: string, parentNode?: any): any;

    getCheckedNodes(treeId: string, flag: boolean): Array<any>;

    updateNodeChecked(treeId: string, nodeId: string, flag: boolean): boolean;

    checkAllNodes(treeId: string, flag: boolean): boolean;

    checkNodesByParamsList(treeId: string, ParamsList: Array<{ key: string, value: string | number, parentNode?: string }>, flag: boolean): boolean;

    // 根据idKeyAlias的属性名来选中或者反选匹配到idsList匹配到的树结点
    // 本来已经有checkNodesByParamsList 和 checkNodesBy方法, 但是这两个方法遍历树节点的次数实在太多了
    // 故在这里写个减少循环树节点的方法
    checkNodesByIds(treeId: string, idsList: Array<string>, idKeyAlias: string, flag: boolean): boolean;

    selectInvertNodes(treeId: string): void;

    // 获取选中的树节点
    getSelectedNodes(treeId: string): Array<any>;

    filterShowNodes(treeId: string, paramName: string, paramValue: string): boolean;

    filterShowNodesEx(treeId: string, paramName: string, paramValue: string): boolean;

    // 树控件定位标志用的diy样式,业务相关代码,地图配置界面用
    locateDiyDom(treeId: string, treeNode: any): void;

    // 主动改变树控件布点标志样式,业务相关代码,地图配置界面用
    changeTreeNodeLocateStatus(treeId: string, treeIdKey: string, treeNodeId: string, lon: number, lat: number): void;

    // 树控件定位按钮和关注按钮hover diy样式, 业务相关代码, 动态布控左侧界面用 creator: wyr
    locateAndAttentionDiyDom(treeId: string, treeNode: any, func1: Function, func2: Function): void;

    changeLocateAndAttentionDiyDom(treeId: string, treeNodeIdKey: string, treeNodeId: string, isAttention: boolean): void;

    // 根据同某一属性（keyName） 值为 keyValueList 集合 进行打钩
    checkNodesBy(treeId: string, keyName: string, keyValueList: Array<string>, flag: boolean): boolean;

    getNodesByParam(treeId: string, paramsList: Array<{ key: string, value: string | number, parentNode?: string }>): Array<any>;

    expandAll(treeID: string, flag: boolean): void;

    setChkDisabled(treeID: string, treeNodes: Array<any>, disabled: boolean, inheritParent?: boolean, inheritChildren?: boolean): void;

    updateNode(treeID: string, treeNode: any): void;

    updateNodes(treeID: string, treeNode: Array<any>): void;

    removeNodes(treeID: string, treeNodes: Array<any>, callBackFlag?: boolean): void

    addNodes(treeID: string, newNodes: Array<any>, parentNode?: any, isSlient?: boolean): void

    setChkDisabledAll(treeID: string, disabled: boolean): void;

    addDiyDomIsConfiStatus(treeID: string, treeNode: any, key?: string): void;
}

class TreeDirectiveService implements ITreeDirectiveService {
    getSelectedNodes(treeId: string): Array<any> {
        let ztreeObj = $.fn.zTree.getZTreeObj(treeId);
        if (!ztreeObj) return;

        return ztreeObj.getSelectedNodes();
    }

    moveNodes(treeId: string, treeNodes: Array<any>, targetNode: any, moveType: string, isSilent?: boolean): void {
        let ztreeObj = $.fn.zTree.getZTreeObj(treeId);
        if (!ztreeObj && treeNodes && treeNodes.length <= 0 && targetNode) return;

        let i, len;
        for (i = 0, len = treeNodes.length; i < len; i++) {
            ztreeObj.moveNode(targetNode, treeNodes[i], moveType, isSilent);
        }
    }

    constructor() {
    }

    /**
     * 在指定的树上移动结点
     * @param treeId
     * @param treeNode
     * @param targetNode
     * @param moveType
     * @param isSilent
     */
    moveNode(treeId: string, treeNode: any, targetNode: any, moveType: string, isSilent?: boolean): void {
        let ztreeObj = $.fn.zTree.getZTreeObj(treeId);
        if (!ztreeObj && treeNode && targetNode) return;

        ztreeObj.moveNode(targetNode, treeNode, moveType, isSilent);
    }

    /**
     * 根据属性查找节点信息
     * @param treeId
     * @param key
     * @param value
     * @param parentNode
     * @returns {any}
     */
    getNodeByParam(treeId: string, key: string, value: string, parentNode?: any) {
        let ztreeObj = $.fn.zTree.getZTreeObj(treeId);
        if (!ztreeObj) return null;

        return ztreeObj.getNodeByParam(key, value, parentNode);
    }


    /**
     * 根据树ID 获取 flag 状态的节点 列表
     * @param treeId
     * @param flag
     * @returns {any}
     */
    getCheckedNodes(treeId: string, flag: boolean): Array<any> {

        let ztreeObj = $.fn.zTree.getZTreeObj(treeId);
        let nodes: Array<any> = [];
        if (!ztreeObj) return nodes;
        nodes = ztreeObj.getCheckedNodes(flag);
        return nodes;
    }

    /**
     * 根据节点所在树 tId 改变当前 勾选状态
     * @param treeId
     * @param tId
     * @param flag
     * @returns {any}
     */
    updateNodeChecked(treeId: string, tId: string, flag: boolean): boolean {
        let ztreeObj = $.fn.zTree.getZTreeObj(treeId);
        if (!ztreeObj) {
            return false;
        }
        let node = ztreeObj.getNodeByTId(tId);
        if (node) {
            //执行此方法时不触发事件回调函数
            ztreeObj.checkNode(node, flag, true, false);
        } else {
            console.error("找不到树节点");
        }
        return true;
    }

    /**
     * 根据树ID 重置全部节点勾选状态为 flag
     * @param treeId
     * @param flag
     * @returns {any}
     */
    checkAllNodes(treeId: string, flag: boolean): boolean {
        let ztreeObj = $.fn.zTree.getZTreeObj(treeId);
        if (!ztreeObj) {
            return false
        }
        ztreeObj.checkAllNodes(flag);
        return true
    }

    /**
     * 根据树ID 反选全部节点勾选状态
     * @param treeId
     * @returns {any}
     */
    selectInvertNodes(treeId: string) {
        let ztreeObj = $.fn.zTree.getZTreeObj(treeId);
        let nodes = ztreeObj.getNodes();
        invertFun(nodes);

        function invertFun(nodes: any) {
            angular.forEach(nodes, (node: any) => {
                !!node.children && invertFun(node.children);
                node.checked = !node.checked;
                ztreeObj.updateNode(node)
            })
        }
    }

    /**
     * 根据节点 默认勾选 树节点
     * @param treeId
     * @param ParamsList : Array<{key:string, value:string, parentNode?:string}>
     * @param flag: boolean目的状态 默认 false;
     * @returns {any}
     */
    checkNodesByParamsList(treeId: string, ParamsList: Array<{ key: string, value: string | number, parentNode?: string }>, flag: boolean): boolean {
        let ztreeObj = $.fn.zTree.getZTreeObj(treeId);
        if (!ztreeObj) {
            return false;
        }
        let resultList = this.getNodesByParam(treeId, ParamsList);
        resultList.forEach((val: any) => {
            console.log();
            ztreeObj.checkNode(val, flag, true, false);
        });
        return true;
    }

    checkNodesByIds(treeId: string, idsList: Array<string>, idKeyAlias: string, flag: boolean): boolean {
        let ztreeObj = $.fn.zTree.getZTreeObj(treeId);
        if (!ztreeObj) {
            return false;
        }

        let nodes: Array<any> = ztreeObj.transformToArray(ztreeObj.getNodes());
        let idsMap = {} as { [key: string]: boolean };
        let i = 0, len = (idsList && idsList.length) || 0, temp: any;
        for (; i < len; i++) {
            idsMap[idsList[i]] = true;
        }
        let checkNodes = nodes.filter((val: any) => {
            return idsMap[val[idKeyAlias]];
        });

        for (i = 0, len = checkNodes.length; i < len; i++) {
            // this.updateNodeChecked(checkNodes[i][idKeyAlias]);
            temp = ztreeObj.getNodeByTId(checkNodes[i].tId);
            if (temp) {
                ztreeObj.checkNode(temp, flag, true, false);
            }
        }

        return true;
    }

    /**
     *  根据节点数据的属性搜索，获取条件完全匹配的节点数据 JSON 对象集合
     * @param treeId
     * @param paramsList {@key 需要精确匹配的属性名称,@value  需要精确匹配的属性值，可以是任何类型，只要保证与 key 指定的属性值保持一致即可,@parentNode 可以指定在某个父节点下的子节点中搜索 忽略此参数，表示在全部节点中搜索}
     * @returns Array(JSON) 如无结果，返回 [ ]
     */
    getNodesByParam(treeId: string, paramsList: Array<{ key: string, value: string | number, parentNode?: string }>): Array<any> {
        let ztreeObj = $.fn.zTree.getZTreeObj(treeId);
        let resultList = [] as Array<any>;
        if (!ztreeObj) {
            return resultList;
        }
        paramsList.forEach((val: { key: string, value: string | number, parentNode?: string }) => {
            val.parentNode = val.parentNode ? val.parentNode : null;
            resultList = resultList.concat(ztreeObj.getNodesByParam(val.key, val.value, val.parentNode));
        });
        return resultList;
    }

    /** create by zxq
     *  根据 属性key - value 过滤 显示 搜索结果 （同时显示结果的 父和子）
     * @time: 2017-06-10 17:52:54
     * @params: treeId 树ID
     * @params: paramName 搜索属性名称
     * @params: paramValue 搜索值
     * @return: 搜索结果
     */
    filterShowNodes(treeId: string, paramName: string, paramValue: string): boolean {
        let ztreeObj = $.fn.zTree.getZTreeObj(treeId);
        // 当paramValue为null时 getNodesByParamFuzzy会报错，故做过滤， 值为""的时候不会进入return false的判断
        if (!ztreeObj) {
            return false;
        }
        let nodeList = ztreeObj.getNodesByParamFuzzy(paramName, paramValue);
        console.log(nodeList);
        let nodes = ztreeObj.transformToArray(ztreeObj.getNodes());
        let concatParentMap = {} as { [key: string]: any };
        let concatParentList = nodeList;
        let showPList: Array<any>;
        for (let i = 0, len = nodeList.length; i < len; i++) {
            concatParentMap[nodeList[i].tId] = true;
        }
        for (let i = 0, len = nodeList.length; i < len; i++) {
            showPList = nodeList[i].getPath().filter((val: any) => {
                if (!concatParentMap[val.tId]) {
                    concatParentMap[val.tId] = true;
                    return true;
                }
                return false;
            });
            if (showPList && showPList.length > 0) {
                concatParentList = concatParentList.concat(showPList);
            }
        }
        let reHideNodes = nodes.filter((val: any) => {
            return !concatParentMap[val.tId]
        });
        ztreeObj.showNodes(concatParentList);
        ztreeObj.hideNodes(reHideNodes);
        ztreeObj.expandAll(true);
        return true
    }

    filterShowNodesEx(treeId: string, paramName: string, paramValue: string): boolean {
        return this.filterShowNodes(treeId, paramName, paramValue);
    }

    locateDiyDom(treeId: string, treeNode: any) {
        if (treeNode && treeNode.Lat && treeNode.Lon) {
            // 显示已布点标志
            let locateStr = "<span class='js-locate-diy-dom'>√</span>";
            let aObj = angular.element(document.getElementById(treeNode.tId + "_a"), "#" + treeNode.tId + "_a");
            // 若已存在布点标志则跳过
            if (aObj.children(".js-locate-diy-dom").size() <= 0) {
                aObj.append(locateStr);
            }
        } else if (treeNode) {
            // 移除布点标志
            let aObj = angular.element(document.getElementById(treeNode.tId + "_a"), "#" + treeNode.tId + "_a");
            if (aObj.children(".js-locate-diy-dom").size() >= 0) {
                aObj.children(".js-locate-diy-dom").remove();
            }
        }
    }

    changeTreeNodeLocateStatus(treeId: string, treeNodeIdKey: string, treeNodeId: string, lon: number, lat: number): null {
        let ztreeObj = $.fn.zTree.getZTreeObj(treeId);
        if (ztreeObj == null) return;

        //let node = ztreeObj.getNodeByParam(treeIdKey || "id", treeNodeId);
        let node = ztreeObj.getNodeByParam(treeNodeIdKey, treeNodeId);
        if (node == null) return;

        node.Lon = lon;
        node.Lat = lat;

        ztreeObj.updateNode(node);
        // 由于updateNode不能主动触发 addDiyDom 故主动触发
        this.locateDiyDom(treeId, node);
    }

    /**
     * 树控件定位按钮和关注按钮hover diy样式, 业务相关代码, 动态布控左侧界面用 creator: wyr
     * @param treeId
     * @param treeNode
     */
    locateAndAttentionDiyDom(treeId: string, treeNode: any, func1: Function, func2: Function) {
        // 只有摄像机结点才显示
        if (treeNode && treeNode.treeType === TreeType.camera.value) {
            // TODO isAttention为定义的是否关注的标志, 正常使用时候将此参数改为真实后台传来的参数
            let isAttention = treeNode.isAttention;
            let locateBtnStr = "<span class='js-dynamic-diy-dom f-cfb'><i class='m-left5 i-ztree-locate js-locate'></i><i class='m-left5 i-ztree-attention " + (isAttention ? "z-select" : "") + " js-attention'></i></span>"
            let aObj = angular.element(document.getElementById(treeNode.tId + "_a"), "#" + treeNode.tId + "_a");
            if (aObj.children(".js-dynamic-diy-dom").size() <= 0) {
                aObj.append(locateBtnStr);
            }
            let locateBtn = aObj.find(".js-locate");
            // 对应diyDomFunc1
            locateBtn.off("click").on("click", { "treeId": treeId, "treeNode": treeNode }, func1);
            let attentionBtn = aObj.find(".js-attention");
            // 对应diyDomFunc2
            attentionBtn.off("click").on("click", { "treeId": treeId, "treeNode": treeNode }, func2);
        }
    }

    /**
     * 主动改变树结点样式和状态
     * @param treeId
     * @param treeNodeIdKey
     * @param treeNodeId
     * @param isAttention
     */
    changeLocateAndAttentionDiyDom(treeId: string, treeNodeIdKey: string, treeNodeId: string, isAttention: boolean) {
        let ztreeObj = $.fn.zTree.getZTreeObj(treeId);
        if (ztreeObj == null) return;

        //let node = ztreeObj.getNodeByParam(treeIdKey || "id", treeNodeId);
        let node = ztreeObj.getNodeByParam(treeNodeIdKey, treeNodeId);
        if (node == null) return;

        // 更新树结点数据
        // TODO isAttention为定义的是否关注的标志, 正常使用时候将此参数改为真实后台传来的参数
        node.isAttention = isAttention;
        ztreeObj.updateNode(node);

        // 由于updateNode不能主动修改dom, 所以在这里主动操作dom样式的修改
        let aObj = angular.element(document.getElementById(node.tId + "_a"), "#" + node.tId + "_a");
        let attentionBtn = aObj.find(".js-attention");
        isAttention ? attentionBtn.addClass("z-select") : attentionBtn.removeClass("z-select");
    }


    /** creator: zxq
     * 根据节点 默认勾选 树节点
     * @param treeId
     * @param keyName
     * @param keyValueList : Array<string>
     * @param flag: boolean目的状态 默认 false;
     * @returns {any}
     */
    checkNodesBy(treeId: string, keyName: string, keyValueList: Array<string>, flag: boolean): boolean {
        let ztreeObj = $.fn.zTree.getZTreeObj(treeId);
        if (!ztreeObj) {
            return false;
        }
        if (!keyName) {
            keyName = "ID";
        }

        if (keyValueList.length > 0) {
            let checkParamsList = [] as Array<{ key: string, value: string }>;
            angular.forEach(keyValueList, (val: string) => {
                checkParamsList.push({ key: keyName, value: val });
            });
            let resultList = this.getNodesByParam(treeId, checkParamsList);
            console.log("勾选目的节点：" + resultList.length);
            resultList.forEach((val: any) => {
                ztreeObj.checkNode(val, flag, true, false);
            });
        }
        return true
    }

    expandAll(treeID: string, flag: Boolean) {
        let ztreeObj = $.fn.zTree.getZTreeObj(treeID);
        ztreeObj.expandAll(flag);
        return true;
    }

    setChkDisabled(treeID: string, treeNodes: Array<{ key: string, value: string }>, disabled: boolean, inheritParent?: boolean, inheritChildren?: boolean) {
        let ztreeObj = $.fn.zTree.getZTreeObj(treeID);
        treeNodes.forEach(item => {
            let node = ztreeObj.getNodeByParam(item.key, item.value);
            if (node) {
                ztreeObj.setChkDisabled(node, disabled, !inheritParent ? false : inheritParent, !inheritChildren ? false : inheritChildren);
            } else {
                console.error('无节点')
            }
        });

    }

    updateNode(treeID: string, node: any) {
        let ztreeObj = $.fn.zTree.getZTreeObj(treeID);
        ztreeObj.updateNode(node);
    }

    updateNodes(treeID: string, nodes: Array<any>) {
        nodes.forEach((item: any) => {
            this.updateNode(treeID, item);
        })
    }

    removeNodes(treeID: string, treeNodes: Array<any>, callbackFlag?: boolean) {
        let treeObj = $.fn.zTree.getZTreeObj(treeID);
        for (let i = 0, l = treeNodes.length; i < l; i++) {
            let node = treeObj.getNodeByParam('ID', treeNodes[i].ID);
            if (node) {
                treeObj.removeNode(node, callbackFlag ? callbackFlag : false);
            } else {
                console.log('需删除的节点不存在！')
            }
        }
    }

    addNodes(treeID: string, newNodes: Array<any>, parentNode?: any, isSlient?: boolean) {
        let ztreeObj = $.fn.zTree.getZTreeObj(treeID);
        let p: any;
        if (parentNode) p = ztreeObj.getNodeByParam('ID', parentNode.ID);
        newNodes.forEach((item: any) => {
            let n = ztreeObj.getNodeByParam('ID', item.ID);
            if (!p) p = ztreeObj.getNodeByParam('ID', item.ParentID);
            ztreeObj.removeNode(n, true);
            ztreeObj.addNodes(p, item, isSlient ? isSlient : false);
        })
    }

    setChkDisabledAll(treeID: string, disabled: boolean) {
        let ztreeObj = $.fn.zTree.getZTreeObj(treeID);
        let nodes = ztreeObj.getNodes();
        nodes.forEach((item: any) => {
            ztreeObj.setChkDisabled(item, disabled, true, true)
        })
    }
    addDiyDomIsConfiStatus(treeID: string, treeNode: { [key: string]: any } | any, markKey?: string) {
        let ztreeObj = $.fn.zTree.getZTreeObj(treeID);
        let node = ztreeObj.getNodeByParam('ID', treeNode.ID);
        let key = markKey || 'isConfigLamp';
        if (node) {
            if (treeNode[key]) {
                // 显示已布点标志
                let locateStr = "<span class='js-locate-diy-dom'></span>";
                let aObj = angular.element(document.getElementById(treeNode.tId + "_a"), "#" + treeNode.tId + "_a");
                // 若已存在布点标志则跳过
                if (aObj.parent().children(".js-locate-diy-dom").size() <= 0) {
                    aObj.parent().children().eq(0).after(locateStr);
                }
            } else {
                // 移除布点标志
                let aObj = angular.element(document.getElementById(treeNode.tId + "_a"), "#" + treeNode.tId + "_a");
                if (aObj.parent().children(".js-locate-diy-dom").size() >= 0) {
                    aObj.parent().children(".js-locate-diy-dom").remove();
                }
            }
        }
    }
}

app.service("treeDirectiveService", TreeDirectiveService);