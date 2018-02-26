/**
 * Created by dell on 2017/6/08. tj
 */
/// <amd-dependency path="text!./runPlan.popup.html" name="runPlanPopupHtml" />
import {app} from "../../common/app/main.app";
import {ITableHeader} from "../../common/directive/unit-table/table-params";
import './runPlan.popup.controller'
import {TimeTemplate} from "../../../core/entity/TimeTemplate";
import PageParams from "../../common/directive/page/page-params";

import {TimeTemplateListParams} from "../../../core/params/TimeTemplateParams";

import "../../common/services/timeTemplate.service";
import {ITimeTemplateService} from "../../common/services/timeTemplate.service";
import {ResponseResult, PageResult} from "../../../core/params/result/ResponseResult";
import {TimeTemplateEx} from "../../../core/entity/ex/TimeTemplateEx";
import {Enum} from "../../../core/enum/Enum";


declare let runPlanPopupHtml: any;
declare let angular: any;

class RunPlanController {

    tHeadList: Array<ITableHeader>;
    tBodyList: Array<TimeTemplate>;

    tableNoData: boolean = false;

    pageParams: PageParams = new PageParams();

    findListParams: TimeTemplateListParams;
    // 编辑layer 下标
    updateLayerIndex: number;

    selectedList: Array<boolean>;
    isSelectAll: boolean = false;
    // 模板类型
    ButtonList: Array<Enum>;

    static $inject = ['$scope', '$timeout',
        'layer',
        'i18nFactory',
        'timeTemplateService'];

    constructor(private $scope: any,
                private $timeout: any,
                private layer: any,
                private i18nFactory: any,
                private timeTemplateService: ITimeTemplateService) {
        this.initTableParams();
        this.getTableListByListParams(this.findListParams);
    };

    //------------- about table
    //搜索
    getListBySearch = () => {
        this.findListParams.currentPage = 1;
        this.getTableListByListParams(this.findListParams);
    };

    initTableParams() {
        this.findListParams = new TimeTemplateListParams();

        this.findListParams.currentPage = this.pageParams.currentPage;
        this.findListParams.pageSize = this.pageParams.pageSize;
        //  模板类型
        this.ButtonList = [
            {value: 'all', text: '全部'},
            {value: 'peopleControl', text: '人像布控'},
            {value: 'VehicleControl', text: '车辆布控'},
            {value: 'MacControl', text: 'MAC布控'},
            {value: 'peopleStructure', text: '人像结构化'},
            {value: 'VehicleStructure', text: '车辆结构化'},
        ]

        // 表
        this.tHeadList = [
            {field: "Name", title: "DP_CONFIG_COMMON_03"},
            {field: "Code", title: "DP_CONFIG_COMMON_45"},
            {field: "Description", title: "DP_CONFIG_COMMON_34"},
            {field: "bottoms", title: "DP_CONFIG_COMMON_35"}
        ];
        this.tBodyList = [];
    }

    //获取 table 列表数据
    getTableListByListParams(reqParams: TimeTemplateListParams) {

        this.timeTemplateService.findByListParams(reqParams).then((resp: any): void => {
            if (resp.code === 200) {
                let pageParams = new PageParams();
                pageParams.setCurrentPage(reqParams.currentPage);
                pageParams.setPageSize(reqParams.pageSize);
                pageParams.setTotalCount(resp.data.TotalCount);
                this.pageParams = pageParams;

                this.findListParams = reqParams;
                this.setTBodyList(resp.data.Result);
            }
        })
    };

    //单删除
    deleteById(_index: TimeTemplate) {
        let titleStr = this.i18nFactory("DP_CONFIG_RUNPLAN_07", {value: _index.Name});
        this.layer.confirm(titleStr, {
            icon: 0,
            title: this.i18nFactory('DP_CONFIG_COMMON_42'),
            area: ["500px", "200px"],
            btn: [this.i18nFactory('DP_CONFIG_COMMON_05'), this.i18nFactory('DP_CONFIG_COMMON_19')]
        }, (index: number) => {
            this.layer.close(index);
            this.submitDelete([_index.ID]);
        })
    }

    //多个删除
    deleteByIds() {
        let selectedDataList: Array<TimeTemplate> = this.getSelectedList();
        if (!selectedDataList || selectedDataList.length == 0) {
            console.error("============", "当前未选择数据");
            return;
        }
        let ids: Array<string> = [];

        selectedDataList.forEach((server: TimeTemplate) => {
            ids.push(server.ID);
        });

        let showText = this.i18nFactory("DP_CONFIG_RUNPLAN_08", {value: ids.length});
        this.layer.confirm(showText, {
            icon: 0,
            title: this.i18nFactory('DP_CONFIG_COMMON_42'),
            area: ["500px", "200px"],
            btn: [this.i18nFactory('DP_CONFIG_COMMON_05'), this.i18nFactory('DP_CONFIG_COMMON_19')]
        }, (index: number) => {
            this.layer.close(index);
            this.submitDelete(ids);
        });

    }

    submitDelete(ids: Array<string>) {
        this.timeTemplateService.deleteByIds(ids).then((resp: ResponseResult<any>) => {
            if (resp.code == 200) {
                this.findListParams.currentPage = 1;
                this.getTableListByListParams(this.findListParams);
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
        this.selectedList = resultList;
        this.isSelectAll = isCheckAll;
    };

    //获取当前已被选中列表
    getSelectedList(): Array<TimeTemplate> {
        let selectedDataList: Array<TimeTemplate> = [];
        if (this.selectedList) {
            this.tBodyList.forEach((val: TimeTemplate, index: number) => {
                if (this.selectedList[index]) {
                    selectedDataList.push(val);
                }
            });
        }
        return selectedDataList;
    };

    setTBodyList(dataList: Array<TimeTemplate>) {
        console.log(dataList)
        if (dataList && dataList.length > 0) {
            this.tBodyList = dataList;
            this.tableNoData = false;
        } else {
            this.tBodyList = [];
            this.tableNoData = true;
        }
    };

    //about page click
    changePage(num: number) {
        this.findListParams.currentPage = num;
        this.getTableListByListParams(this.findListParams);
    }

    changePageSize(num: number) {
        this.findListParams.currentPage = 1;
        this.findListParams.pageSize = num;
        this.getTableListByListParams(this.findListParams);
    }

    //---------------about update model
    /** create by zxq
     *  修改运行计划
     * @time: 2017-06-26 12:14:51
     * @params:
     * @return:
     */
    updateModel (model: TimeTemplateEx): void  {
        this.openSaveOrUpdateModal(true, model);
    };

    /** create by zxq
     *  添加运行计划
     * @time: 2017-06-26 12:14:51
     * @params:
     * @return:
     */
    addModel(): void {
        this.openSaveOrUpdateModal(false, null);
    };

    /**
     * 打开添加、编辑用户资料窗口
     * @time: 2017-04-19 17:03:30
     * @params: isUpdate、data 不传则默认添加操作
     * @return:
     */
    openSaveOrUpdateModal(isUpdate: boolean, modelData: TimeTemplateEx) {

        let scope: { isUpdate: boolean, timeTplModel: TimeTemplateEx, $destroy: Function } = this.$scope.$new();
        let titleStr = '';
        if (isUpdate) {
            scope.isUpdate = true;
            scope.timeTplModel = modelData;
            titleStr = this.i18nFactory('DP_CONFIG_COMMON_38');
        } else {
            scope.isUpdate = false;
            titleStr = this.i18nFactory('DP_CONFIG_COMMON_40');
        }
        this.layer.open({
            type: 1,
            //scrollbar:false,
            title: titleStr,
            content: runPlanPopupHtml,
            skin: 'update-runPlan-layer',
            scope: scope,
            area: ["auto", "auto"],
            success: function (id: any) {
                console.log(id);
            },
            end: function () {
                scope.$destroy();
            }
        }).then((index: number) => {
            this.openCloseLayerWatch();
            this.setUpdateLayerIndex(index);
        });
    };

    /**
     *  标识当前 编辑layer modal
     * @time: 2017-04-19 17:06:48
     * @params:
     * @return:
     */
    setUpdateLayerIndex(index: number) {
        this.updateLayerIndex = index;
    };

    closeUpdateLayer() {
        this.layer.close(this.updateLayerIndex);
    }

    getUpdateLayerIndex() {
        return this.updateLayerIndex;
    };

    openCloseLayerWatch() {
        if (!this.updateLayerIndex) {
            this.$scope.$on('add.runplan.popup', (even: any, isFresh?: boolean) => {
                if (isFresh) {
                    this.getTableListByListParams(this.findListParams);
                }
                this.closeUpdateLayer();
            });
        }
    }

}

app.controller('runPlanController', RunPlanController);