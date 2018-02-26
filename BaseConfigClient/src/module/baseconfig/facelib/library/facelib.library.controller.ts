/// <amd-dependency path="text!../../../common/faceLibUpdateModal/faceLibUpdateModal.html" name="htmlStr" />
import { app } from "../../../common/app/main.app";
import "angular";

import "../../../common/services/area.service";
import "../../../common/services/businessLib.service";
import "../../../common/services/businessLibPerson.service";
import "../../../common/faceLibUpdateModal/faceLibUpdateModal.factory";
import "../businessLibPerson.factory";
import "../../../common/factory/layerMsg.factory";
import '../../../common/filter/app.filter'
import "WdatePicker";

import { AreaEx } from "../../../../core/entity/ex/AreaEx";
import { IAreaService } from "../../../common/services/area.service";
import { BusinessLibListParams } from "../../../../core/params/BusinessLibParams";
import PageParams from "../../../common/directive/page/page-params";
import { IBusinessLibService } from "../../../common/services/businessLib.service";
import { BusinessLib } from "../../../../core/entity/BusinessLib";
import { ResponseResult } from "../../../../core/params/result/ResponseResult";
import { ICasCadeService, CasCadeSearchParams } from "../../../common/services/casecade.service";
import { BusinessLibEx } from "../../../../core/entity/ex/BusinessLibEx";
import { IBusinessLibPersonService } from "../../../common/services/businessLibPerson.service";
import {
    IFaceLibUpdateModalFactory,
    FaceUpdateParams
} from "../../../common/faceLibUpdateModal/faceLibUpdateModal.factory";
import PortraitTool from "../../../common/portrait-tool";
import { IBusinessLibPersonFactory } from "../businessLibPerson.factory";
import { ILayerDec } from "../../../common/factory/layerMsg.factory";
import { SystemConfig } from "../../../common/system-config";

declare let angular: any, htmlStr: any;

class FaceLibLibController {
    constLibItem: string;
    findListParams: BusinessLibListParams;

    pageParams: PageParams;

    //---table
    // table 列表数据

    tBodyList: Array<BusinessLibEx>;
    tableNoData: boolean;

    //多选相关
    selectedList: Array<BusinessLibEx>;

    tableCurrentCount: number;
    updateLayerIndex: number;

    //编辑窗口 广播、接收名称
    watchUpdateModalName: string = "watchUpdateModalName";

    //
    faceLibItemTemplUrl: string;
    static $inject = ['$scope', '$location', '$state', '$timeout', 'layer', 'layerDec', 'i18nFactory',
        'faceLibUpdateModalFactory',
        'areaService',
        'businessLibService',
        'casCadeService',
        'businessLibPersonService',
        'businessLibPersonFactory'];

    constructor(private $scope: any, private $location: any, private $state: any, private $timeout: any, private layer: any,
        private layerDec: ILayerDec,
        private i18nFactory: any,
        private faceLibUpdateModalFactory: IFaceLibUpdateModalFactory,
        private areaService: IAreaService,
        private businessLibService: IBusinessLibService,
        private casCadeService: ICasCadeService,
        private businessLibPersonService: IBusinessLibPersonService,
        private businessLibPersonFactory: IBusinessLibPersonFactory,
    ) {
        this.constLibItem = SystemConfig.CONST_LIB;
        this.faceLibItemTemplUrl = "../../module/baseconfig/facelib/library/facelib.lib-item-template.html?v=" + new Date().getTime();
        this.initParams();

        let self_this = this;
        if ($scope.areaTreeSelectedData) {
            self_this.findListParams.areaId = $scope.areaTreeSelectedData.ID;
            self_this.findListParams.currentPage = 1;
            self_this.getListByParams(self_this.findListParams);
        }

        $scope.$on("parentAreaSelectChange", function (even: any, data: AreaEx) {
            self_this.findListParams.areaId = data.ID;
            self_this.findListParams.currentPage = 1;
            self_this.getListByParams(self_this.findListParams);
        });
    }

    initParams() {
        this.pageParams = new PageParams();
        this.findListParams = new BusinessLibListParams();
        this.findListParams.startTime = null;
        this.findListParams.endTime = null;
        this.findListParams.keyword = null;
        this.findListParams.areaId = "";
        this.findListParams.currentPage = 1;
        this.findListParams.pageSize = this.pageParams.pageSize;
        this.findListParams.sortName = "ID";
        this.findListParams.isAsc = true;

        this.tBodyList = [];
        this.selectedList = [] as Array<BusinessLibEx>;
        this.tableCurrentCount = 0;
    }
    // 直接访问缓存 参数格式化
    _getCasCadeSearchParams(tableParams: BusinessLibListParams) {
        if (!tableParams) return {} as CasCadeSearchParams;

        let result = new CasCadeSearchParams();
        result.orderField = tableParams.sortName;
        result.areaId = tableParams.areaId;
        result.isAsc = tableParams.isAsc;
        result.name = tableParams.keyword;
        return result;
    }

    getListByParams(params: BusinessLibListParams) {
        let _params = this._getCasCadeSearchParams(params);
        this.casCadeService.findAllBusinessLibList(_params).then((resp: ResponseResult<Array<BusinessLibEx>>) => {
            if (resp && resp.code == 200 && resp.data && resp.data.length > 0) {
                this.setTableBody(resp.data);
                console.log("getListByParams");
                // console.log('=========================facelib.library.controller')
                // console.log(resp.data);
                this.getPersonCount(resp.data);
            } else {
                this.setTableBody([]);
            }
            this.findListParams = params;
        })
    }
    //列表追加打钩 控制参数
    setTableBody(dataList: Array<BusinessLibEx>) {
        dataList = this.filterByTimeRange(dataList);
        angular.forEach(dataList, (dataItem: BusinessLibEx) => {
            dataItem.isShowChild = false;
            dataItem.isCheckBox = false;
        });
        this.tBodyList = dataList;
        this.tableNoData = (this.tBodyList.length === 0);
        this.tBodyList = PortraitTool.convert2Ztree(dataList, "ID", "ParentID", "children");
        this.tableCurrentCount = this.getTableCount(this.tBodyList);
        this.selectedList = [] as Array<BusinessLibEx>;

    }

    // 获取人像库人员数目
    getPersonCount(libs: Array<BusinessLibEx>) {
        let ids = [] as Array<string>;
        angular.forEach(libs, (val: BusinessLibEx) => {
            ids.push(val.ID);
        });
        this.businessLibService.findPersonCount(ids).then((resp: ResponseResult<any>) => {
            if (resp.code === 200 && resp.data && resp.data.length > 0) {
                let dateMap: { [key: string]: any } = {};
                let respItem: any = null;
                for (let i = 0; i < resp.data.length; i++) {
                    respItem = resp.data[i];
                    if (respItem.LibID) {
                        if (dateMap[respItem.LibID]) {
                            // 多条同 libID 的库数量进行叠加 。
                            dateMap[respItem.LibID].TotalCount += respItem.TotalCount;
                        } else {
                            dateMap[respItem.LibID] = respItem;
                        }
                    }
                }
                for (let ii = 0; ii < libs.length; ii++) {
                    if (dateMap[libs[ii].ID] && dateMap[libs[ii].ID].TotalCount) {

                        libs[ii].PersonCount = dateMap[libs[ii].ID].TotalCount;

                    }
                }
            }
            this.setTableBody(libs);
        })
    };
    // 根据时间条件过滤
    filterByTimeRange(dataList: Array<BusinessLibEx>): Array<BusinessLibEx> {
        if (!!this.findListParams.startTime || !!this.findListParams.endTime) {
            if (!!this.findListParams.startTime && !!this.findListParams.endTime) {
                dataList = dataList.filter((val: BusinessLibEx) => {
                    return (val.CreateTime >= this.findListParams.startTime) && val.CreateTime <= this.findListParams.endTime;
                });
            } else if (!!this.findListParams.startTime) {
                dataList = dataList.filter((val: BusinessLibEx) => {
                    return (val.CreateTime >= this.findListParams.startTime);
                });
            } else if (!!this.findListParams.endTime) {
                dataList = dataList.filter((val: BusinessLibEx) => {
                    return val.CreateTime <= this.findListParams.endTime;
                });
            }
        }
        return dataList;
    };
    //搜索。。。
    searchLibListByParams(): void {
        if (this.findListParams.startTime && this.findListParams.endTime && this.findListParams.startTime >= this.findListParams.endTime) {
            this.layerDec.warnInfo(this.i18nFactory('DP_CONFIG_COMMON_85'));
            return;
        }
        this.getListByParams(this.findListParams);
    };
    tableSearchInputKeyUp(e: any) {
        if (e.keyCode === 13) {
            this.searchLibListByParams();
        }
    };
    //新增
    addByParentId(parentId: string) {
        if (!parentId) {
            parentId = this.findListParams.areaId;
        }
        this.openUpdateModel(false, null, parentId, "");
    }
    //修改
    updateFaceLib(data: BusinessLib, parentName: string) {
        var parentId = data.AreaID || data.ParentID;
        this.businessLibService.findById(data.ID).then((resp: ResponseResult<BusinessLibEx>) => {
            if (resp && resp.code == 200 && resp.data) {
                this.openUpdateModel(true, resp.data, parentId, parentName);
            }
        });
    }
    //打开 新增、修改窗口
    openUpdateModel(isUpdate: boolean, data: BusinessLibEx, parentId: string, parentName: string) {
        let scope: any = this.$scope.$new();
        let updateParams = new FaceUpdateParams();
        updateParams.isUpdate = isUpdate;

        updateParams.updateModalData = data;

        updateParams.parentID = parentId;

        updateParams.parentName = parentName;

        let titleStr = isUpdate ? this.i18nFactory('DP_CONFIG_FACELIB_37') : this.i18nFactory('DP_CONFIG_FACELIB_42');

        this.faceLibUpdateModalFactory.setUpdateParams(updateParams);
        // let htmlStr = this.faceLibUpdateModalFactory.getModalHtml();

        this.layer.open({
            type: 1,
            title: titleStr,
            content: htmlStr,
            scope: scope,
            area: ["450px", "auto"],
            skin: "overflow-visible",
            end: function () {
                scope.$destroy();
            }
        }).then((index: number) => {
            this.watchUpdateModalName = this.faceLibUpdateModalFactory.getModalClosedWatchName();
            this.openCloseLayerWatch();
            this.setUpdateLayerIndex(index);
        });
    };
    //记录当前编辑窗口下标
    setUpdateLayerIndex(index: number) {
        this.updateLayerIndex = index;
    }
    // 关闭当前打开的编辑窗口
    closeUpdateModel() {
        this.layer.close(this.updateLayerIndex);
    }
    // 添加 修改Model 关闭监听
    openCloseLayerWatch() {
        if (!this.updateLayerIndex) {
            let self_this = this;
            this.$scope.$on(this.watchUpdateModalName, (even: any, data: { isCommit: boolean, isAdd: boolean, modelData: BusinessLibEx }) => {
                if (data.isCommit) {
                    self_this.getListByParams(self_this.findListParams);
                    if (data.isAdd) {
                        self_this.afterAdd(data.modelData);
                    }
                }
                self_this.closeUpdateModel();
            });
        }
    }

    //获取当前已被选中列表
    private getSelectedList(): Array<BusinessLibEx> {
        if (this.tBodyList && this.tBodyList.length > 0) {
            return this._getSelectedList(this.tBodyList);
        }

        return [] as Array<BusinessLibEx>;
    };
    // 递归树获取结果
    private _getSelectedList(srcList: Array<BusinessLibEx>): Array<BusinessLibEx> {
        let result = [] as Array<BusinessLibEx>;
        let tNode: BusinessLibEx,
            tIndex: number = 0,
            tLen = srcList.length;
        for (; tIndex < tLen; tIndex++) {
            tNode = srcList[tIndex];
            if (tNode.isCheckBox) {
                result.push(tNode);
            }
            if (tNode.children) {
                result = result.concat(this._getSelectedList(tNode.children));
            }
        }
        return result;
    }
    // 获取 树 数据总条数
    private getTableCount(srcList: Array<BusinessLibEx>): number {
        let _count: number = 0;
        if (!srcList || srcList.length == 0) {
            return 0;
        }
        _count = srcList.length;

        let tNode: BusinessLibEx,
            tIndex: number = 0,
            tLen = srcList.length;

        for (; tIndex < tLen; tIndex++) {
            tNode = srcList[tIndex];
            if (tNode.children && tNode.children.length > 0) {
                _count += this.getTableCount(tNode.children);
            }
        }
        return _count;
    }
    //改变子列表加载显示
    changeChildShow(bItem: BusinessLibEx) {
        bItem.isShowChild = !bItem.isShowChild;
    };
    //点击打钩
    clickCheckbox(bItem: BusinessLibEx): boolean {
        if (!this.tBodyList || this.tBodyList.length == 0) {
            return false;
        }
        if (bItem) {
            let flag = !bItem.isCheckBox;
            this.changeCheckboxStatus(this.tBodyList, flag, bItem.ID);
        } else {
            let flag = true;
            if (this.selectedList.length === this.tableCurrentCount) {
                flag = false;
            }
            this.changeCheckboxStatus(this.tBodyList, flag);
        }
        this.selectedList = this.getSelectedList();
        return true;
    };
    // 打钩改变，父关联子，子不关联父
    changeCheckboxStatus(srcList: Array<BusinessLibEx>, status: boolean, changeNodeId?: string): boolean {
        let tNode: BusinessLibEx,
            tIndex: number = 0,
            tLen = srcList.length;
        for (; tIndex < tLen; tIndex++) {
            tNode = srcList[tIndex];
            if (changeNodeId) {
                if (tNode.ID == changeNodeId) {
                    tNode.isCheckBox = status;
                    if (tNode.children && tNode.children.length > 0) {
                        this.changeCheckboxStatus(tNode.children, status);
                    }
                    return true;
                } else {
                    if (tNode.children) {
                        let flag = this.changeCheckboxStatus(tNode.children, status, changeNodeId);
                        if (flag) {
                            return true;
                        }
                    }
                }
            } else {
                tNode.isCheckBox = status;
                if (tNode.children && tNode.children.length > 0) {
                    this.changeCheckboxStatus(tNode.children, status);
                }
            }
        }
    };
    // 单栏选择排序
    sortByField(_index: number, field: string, sortStatus: boolean) {

        this.findListParams.isAsc = sortStatus;
        this.findListParams.sortName = field;

        this.getListByParams(this.findListParams);
    }
    //单删除
    deleteById(_index: BusinessLib) {
        let titleStr = this.i18nFactory("DP_CONFIG_COMMON_47");
        let contentStr = this.i18nFactory("DP_CONFIG_COMMON_43", { value: _index.Name });

        this.layer.confirm(contentStr, {
            icon: 0,
            title: titleStr,
            area: ["500px", "200px"],
        }, (index: number) => {
            this.layer.close(index);
            this.submitDeleteByIds([_index.ID]);
        })
    }
    //多个删除
    deleteByIds() {
        let selectedList = this.getSelectedList();
        if (!selectedList || selectedList.length == 0) {
            return;
        }

        let ids = [] as Array<string>;
        let hasConstLib: string;
        angular.forEach(selectedList, (val: BusinessLib) => {
            if (this.constLibItem === val.ID) {
                hasConstLib = val.Name;
            } else {
                ids.push(val.ID);
            }
        });
        if (hasConstLib) {
            this.layerDec.warnInfo(this.i18nFactory("DP_CONFIG_FACELIB_43", { value: hasConstLib }));
            if (ids.length === 0) {
                return;
            }
        }
        let titleStr = this.i18nFactory("DP_CONFIG_COMMON_47");
        let showText = this.i18nFactory("DP_CONFIG_FACELIB_44", { value: ids.length });
        this.layer.confirm(showText, {
            icon: 0,
            title: titleStr,
            area: ["500px", "200px"]
        }, (index: number) => {
            this.layer.close(index);
            this.submitDeleteByIds(ids);
        });
    }

    //确认多个删除
    submitDeleteByIds(ids: Array<string>) {
        this.businessLibService.deleteByIds(ids).then((resp: ResponseResult<string>) => {
            if (resp.code == 200) {
                this.$timeout(() => {
                    this.findListParams.currentPage = 1;
                    this.getListByParams(this.findListParams);
                }, 500);
            }
        });
    };

    //添加成功后
    afterAdd(modelData: BusinessLibEx) {
        let showStr = this.i18nFactory('DP_CONFIG_FACELIB_45', { value: modelData.Name });
        let titleStr = this.i18nFactory('DP_CONFIG_COMMON_47');
        this.layer.confirm(showStr, {
            icon: 0,
            title: titleStr,
            area: ["200px", "200px"]
        }, (index: number) => {
            this.layer.close(index);
            this.goToAddPerson(modelData, modelData.ParentModel.Name, true);
        })
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

    //前往库人员列表管理
    goToAddPerson(params: BusinessLibEx, parentName: string, isOpenModal: boolean) {
        params.ParentModel = {
            Name: parentName
        } as BusinessLib;

        console.log(isOpenModal);
        console.log(params);

        this.businessLibPersonFactory.updateIsOpenModal(isOpenModal);
        this.businessLibPersonFactory.setCurrentFaceLib(params);

        this.$state.go("baseconfig.facelib.person");
    }

}

app.controller('bcFaceLibLibController', FaceLibLibController);