/// <amd-dependency path="text!./ivsServer.updateModal.html" name="ivsServerUpdateModalHtml" />
import "css!../css/baseconfig-serve.css";
import "css!../style/baseconfig-area.css";
import { UpdateModalParams } from "../../common/types/serverUpdateModal.params";
declare var require: any;
import PageParams from "../../common/directive/page/page-params";

import { app } from "../../common/app/main.app";
import 'angular';
import '../../common/services/ivsServer.service';
import '../../common/services/area.service';

import './ivsServer.updateModal.controller';
//import "../main/serverType.filter"

import { IAreaService } from "../../common/services/area.service";
import { ITableHeader } from "../../common/directive/unit-table/table-params";
import { IIvsServerService } from "../../common/services/ivsServer.service";
import { ITreeDataParams, TreeDataParams } from "../../common/directive/tree/tree-params";
import { IvsServer } from "../../../core/entity/IvsServer";
import { AreaEx } from "../../../core/entity/ex/AreaEx";
import { IvsServerListParams } from "../../../core/params/IvsServerParams";
import { TreeParams } from "../../../core/params/tree/TreeParams";
import { ResponseResult } from "../../../core/params/result/ResponseResult";
import { IvsServerEx } from "../../../core/entity/ex/IvsServerEx";
import { ICasCadeService, CasCadeSearchParams } from "../../common/services/casecade.service";
import { IvsServerType } from "../../../core/enum/IvsServerType";
import { ILayerDec } from './../../common/factory/layerMsg.factory';
import './../../common/factory/layerMsg.factory';
import { BackResponseBody } from './../../../core/params/result/ResponseResult';

declare var ivsServerUpdateModalHtml: any;
declare var angular: any;

class BaseConfigIvsServerController {
    tHeadList: Array<ITableHeader>;
    tBodyList: Array<IvsServer>;
    currentLayer?: number;

    //--------分页指令
    pageParams: PageParams;
    //---------
    // 选择行政区域树
    areaTreeDatas: ITreeDataParams<AreaEx>;
    areaTreeSearchInputStr: string = "";

    // 列表获取参数
    findListParams: IvsServerListParams;
    //多选相关
    selectedList: Array<boolean>;
    isSelectAll: boolean;
    // alter wyr: 用于判断当前界面上的列表是否被选中
    isSelectItems: boolean;
    ivsServerTypeObj: { [key: string]: string } = {} as { [key: string]: string };

    static $inject = ['$scope', '$filter', '$timeout', '$controller', 'ivsServerService', 'layer', 'areaService', 'casCadeService', 'i18nFactory', 'layerDec'];
    constructor(private $scope: any, private $filter: any, private $timeout: Function, private $controller: any,
        private ivsServerService: IIvsServerService, private layer: any,
        private areaService: IAreaService, private casCadeService: ICasCadeService, private i18nFactory: any, private layerDec: ILayerDec) {

        // 树列表数据
        //初始化 area 树数据
        this.areaTreeDatas = new TreeDataParams<AreaEx>();
        this.areaTreeDatas.treeId = 'areaTreeIvs';
        this.areaTreeDatas.isDefaultSelected = true;
        this.areaTreeDatas.onClick = treeSelectNode;
        this.areaTreeDatas.treeInitComplete = treeInitComplete;
        this.initListParams();
        // 节点选择
        function treeSelectNode(event: MouseEvent, treeId: string, treeNode: AreaEx) {

            if (treeNode.ID == self_this.findListParams.areaId) {
                if (self_this.tBodyList) {
                    return;
                }
            }
            //init req_params
            let req_params: IvsServerListParams = self_this.findListParams;
            req_params.areaId = treeNode.ID;
            req_params.currentPage = 1;
            self_this.getListByParams(req_params);
        }

        function treeInitComplete() {
        }
        this.getAreaTreeList();

        let self_this = this;

        this.$scope.$on('closeServerUpdateModel', function (even: any, data: { isCommit: boolean }) {
            self_this.closeLayer(self_this.getCurrentLayer());
            if (data.isCommit) {
                $timeout(() => {
                    self_this.getListByParams(self_this.findListParams);
                }, 1000);
            }
        });

        $scope.$on("$destroy", function () {
            if (self_this.layer) {
                self_this.layer.closeAll();
            }
        });
    };

    //----------- 树列 操作函数
    // 数据获取
    getAreaTreeList(keyword?: string) {
        let params: TreeParams = this.areaTreeDatas.reqParams;
        params.keyword = keyword;
        this.areaService.findListTree(params).then((resp: Array<AreaEx>) => {
            if (resp) {
                this.areaTreeDatas.finishedNoData = false;
            } else {
                this.areaTreeDatas.finishedNoData = true;
            }
            this.$timeout(() => {
                this.setAreaTreeDatas(resp);
            });
        })
    };
    // 树搜索
    areaTreeSearchInputKeyUp(e: any) {
        if (e.keyCode === 13) {
            this.getAreaTreeList(this.areaTreeSearchInputStr);
        }
    };
    // 树搜索
    areaTreeSearchInput() {
        this.getAreaTreeList(this.areaTreeSearchInputStr);
    };
    // 树赋值
    setAreaTreeDatas(treeDatas: Array<AreaEx>) {
        this.areaTreeDatas.treeDatas = treeDatas;
    };
    //----------------
    // 初始化列表数据
    initListParams() {
        this.pageParams = new PageParams();
        this.findListParams = new IvsServerListParams();
        this.findListParams.areaId = '';
        this.findListParams.currentPage = this.pageParams.currentPage;
        this.findListParams.pageSize = this.pageParams.pageSize;
        this.tBodyList = [];
        this.tHeadList = [
            { field: "Name", title: "DP_CONFIG_COMMON_03" },
            { field: "IpAddress", title: "DP_CONFIG_PROXYSERVER_03" },
            { field: "Port", title: "DP_CONFIG_COMMON_11" },
            { field: "ServerType", title: "DP_CONFIG_PROXYSERVER_04" },
            { field: "Description", title: "DP_CONFIG_COMMON_34" },
            { field: "buttons", title: "DP_CONFIG_COMMON_15" }
        ];
        this.findListParams.sortName = 'ServerType';
        this.isSelectItems = false;

        // 初始化 类型选择
        for (let key in IvsServerType) {
            this.ivsServerTypeObj[IvsServerType[key].value] = IvsServerType[key].text;
        }
    };

    _getCasCadeSearchParams(tableParams: IvsServerListParams) {
        if (!tableParams) return {} as CasCadeSearchParams;

        let result = new CasCadeSearchParams();
        result.pageIndex = tableParams.currentPage;
        result.orderField = tableParams.sortName;
        result.pageSize = tableParams.pageSize;
        result.areaId = tableParams.areaId;
        result.isAsc = tableParams.isAsc;
        // result.name = tableParams.areaName;
        return result;
    };

    // 根据finListParams:IFindIvsServerListParams 获取列表
    getListByParams(params: IvsServerListParams) {

        this.casCadeService.findIvsServerList(this._getCasCadeSearchParams(params))
            .then((resp: ResponseResult<Array<IvsServer>>) => {
                if (resp.code == 200) {
                    let pageParams = new PageParams();
                    pageParams.setCurrentPage(params.currentPage);
                    pageParams.setPageSize(params.pageSize);
                    pageParams.setTotalCount(resp.count);
                    this.pageParams = pageParams;
                    this.findListParams = params;
                    this.setTBodyList(resp.data);
                }
            });
    }

    //单删除
    deleteById(_index: IvsServer) {

        this.layer.confirm(this.i18nFactory('DP_CONFIG_IVSSERVER_03'), {
            icon: 0,
            title: this.i18nFactory('DP_CONFIG_COMMON_42'),
            area: ["500px", "200px"]
        }, (index: number) => {
            this.layer.close(index);
            this.validDelete(_index.ID, index)
        })
    }

    validDelete(ids: Array<string>|string, layerNum: number) {
        let isSingle: boolean, aId: string,ids2:Array<string>;
        if (Array.isArray(ids)) {
            isSingle = false;
            ids2 = ids as Array<string>;
        } else {
            isSingle = true;
            aId = ids as string;
        }
        return this.ivsServerService.validDelete(isSingle ? [aId] : ids2).then((res: BackResponseBody<{ hasTaskRun: boolean }>) => {
            this.layer.close(layerNum);
            if (res.code === 200 && res.data) {
                if (res.data.hasTaskRun == true) {
                    this.layerDec.failInfo('不能删除有任务的服务器！')
                } else {
                    isSingle ? this.submitDelete(aId, layerNum) : this.submitDeleteByIds(ids2)
                }
            }
        })
    }
    submitDelete(id: string, layerNum: number) {
        this.ivsServerService.deleteById(id).then((resp: ResponseResult<any>) => {
            if (resp.code == 200) {
                this.getListByParams(this.findListParams);
                this.layer.close(layerNum);
            }
        });
    }
    /**
     * 选择某一条数据
     * @time: 2017-04-21 19:43:07
     * @params:
     * @return:
     */
    afterChangeCheck(resultList: Array<boolean>, isCheckAll: boolean): void {
        this.setIsSelectItems(resultList);
        this.selectedList = resultList;
        this.isSelectAll = isCheckAll;
    };

    //获取当前已被选中列表
    getSelectedList(): Array<IvsServer> {
        let selectedDataList: Array<IvsServer> = [];
        if (this.selectedList) {
            this.tBodyList.forEach((ivsServer: IvsServer, index: number) => {
                if (this.selectedList[index]) {
                    selectedDataList.push(ivsServer);
                }
            });
        }
        return selectedDataList;
    };

    //多个删除
    deleteByIds() {
        let selectedDataList: Array<IvsServer> = this.getSelectedList();
        if (!selectedDataList || selectedDataList.length == 0) {
            console.error("============", "当前未选择数据");
            return;
        }
        let ids: Array<string> = [];

        selectedDataList.forEach((server: IvsServer) => {
            ids.push(server.ID);
        });
        let showText = '确定删除当前选中的 ' + ids.length + ' 条视频结构化服务器配置吗?';
        this.layer.confirm(showText, {
            icon: 0,
            title: this.i18nFactory('DP_CONFIG_COMMON_42'),
            area: ["500px", "200px"]
        }, (index: number) => {
            this.validDelete(ids,index);
        });

    }

    submitDeleteByIds(ids: Array<string>) {
        this.ivsServerService.deleteByIds(ids).then((resp: ResponseResult<string>) => {
            if (resp.code == 200) {
                this.findListParams.currentPage = 1;
                this.getListByParams(this.findListParams);
            }
        });
    };


    addIvsServer() {
        let scope: any = this.$scope.$new();
        let updateModalParams: UpdateModalParams<IvsServer> = new UpdateModalParams<IvsServer>();
        updateModalParams.defaultDatas.areaId = this.findListParams.areaId;
        updateModalParams.isUpdate = false;
        scope.updateModalParams = updateModalParams;
        let titleStr = '新建服务器';
        this.layer.open({
            type: 1,
            title: titleStr,
            content: ivsServerUpdateModalHtml,
            scope: scope,
            area: ["500px"],
        }).then((index: number) => {
            this.setCurrentLayer(index);
        });
    }

    findById(id: string) {

        return this.ivsServerService.findById(id);
    }

    updateIvsServer(model?: IvsServer): void {
        console.log(model);
        this.findById(model.ID).then((resp: ResponseResult<IvsServerEx>) => {
            if (resp.code == 200) {
                this.openUpdate(true, resp.data);
            } else {

            }
        });

    };

    openUpdate(isUpdate: boolean, data?: IvsServerEx) {
        let scope: any = this.$scope.$new();

        let updateModalParams: UpdateModalParams<IvsServer> = new UpdateModalParams<IvsServer>();
        updateModalParams.defaultDatas.areaId = this.findListParams.areaId;
        updateModalParams.isUpdate = true;
        updateModalParams.updateModel = data;
        scope.updateModalParams = updateModalParams;
        let titleStr = isUpdate ? '编辑服务器' : '新建服务器';
        this.layer.open({
            type: 1,
            title: titleStr,
            content: ivsServerUpdateModalHtml,
            scope: scope,
            area: ["500px"],
            end: function () {
                scope.$destroy();
            }
        }).then((index: number) => {
            this.setCurrentLayer(index);
        });
    };

    closeLayer(index: number): any {
        return this.layer.close(index);
    }

    setCurrentLayer(index: number): void {
        this.currentLayer = index;
    }

    getCurrentLayer(): number {
        return this.currentLayer;
    }

    setTBodyList(result: Array<IvsServer>) {
        // this.tBodyList = this.$filter('ivsServerTypeFilter')(result,'ServerType');
        this.tBodyList = result;
    };

    // 单栏选择排序
    sortByField(_index: number, field: string, sortStatus: boolean) {

        this.findListParams.isAsc = sortStatus;
        this.findListParams.sortName = field;

        this.getListByParams(this.findListParams);
    }

    //about page click
    changePage(num: number) {
        this.findListParams.currentPage = num;
        this.getListByParams(this.findListParams);
    }
    changePageSize(num: number) {
        this.findListParams.currentPage = 1;
        this.findListParams.pageSize = num;
        this.getListByParams(this.findListParams);
    }

    /**
     * creator wyr: 判断和设置当前列表是否有选中的元素
     * @param items
     */
    setIsSelectItems(items: Array<boolean>) {
        let result = false;
        if (items && items.length > 0) {
            let i, len;
            for (i = 0, len = items.length; i < len; i++) {
                if (items[i]) {
                    result = true;
                    break;
                }
            }
        }
        if (this.isSelectItems !== result) {
            this.isSelectItems = result;
        }
    }
}
app
    .controller('baseConfigIvsServerController', BaseConfigIvsServerController);