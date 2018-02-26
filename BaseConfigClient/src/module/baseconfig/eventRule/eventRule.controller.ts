/// <amd-dependency path="text!./eventRule.popup.html" name="popupHtml" />
import "css!../style/policy-linkage.css";
import {app} from "../../common/app/main.app";
import "css!../../../module/common/directive/unit-table/table.css";
import './eventRule.popup.controller';
import '../../common/services/area.service';
import PageParams from "../../common/directive/page/page-params";
import {IAreaService} from "../../common/services/area.service";
import {ITableHeader} from "../../common/directive/unit-table/table-params";
import {TreeDataParams} from "../../common/directive/tree/tree-params";
import {Area} from "../../../core/entity/Area";
import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {BackResponseBody, PageResult,ResponseResult} from "../../../core/params/result/ResponseResult";
import {IEventRuleService} from '../../common/services/eventRule.service';
import '../../common/services/eventRule.service';
import {EventRuleEx} from "../../../core/entity/ex/EventRuleEx";
import "angular";
import {TreeParams} from "../../../core/params/tree/TreeParams";
import {EventRuleParams} from "../../../core/params/EventRuleParams";

declare var popupHtml: any, angular: any;


class EventRuleController {
    static $inject = ['$scope', '$timeout', '$state', 'areaService', 'layer', 'i18nFactory', 'eventRuleService'];
    areaTreeDataParams: TreeDataParams<AreaEx>;
    treeSearchInput: string;
    currentArea: Area;
    tableListParams: EventRuleParams = new EventRuleParams();
    pageParams: PageParams = new PageParams();
    currentLayerIndex: number;
    tHeadList: Array<ITableHeader>;
    tBodyList: Array<EventRuleEx> = [];
    //多选相关
    selectedList:Array<boolean>;
    isSelectAll:boolean;
    // alter wyr: 用于判断当前界面上的列表是否被选中
    isSelectItems: boolean;

    constructor(private $scope: any,
                private $timeout: any,
                private $state: any,
                private areaService: IAreaService,
                private layer: any,
                private i18nFactory: any,
                private eventRuleService: IEventRuleService,) {
        this.isSelectItems = false;
        this.initAreaTreeParams();
        this.$scope.$on('close.eventRule.popup', (event: any, isFresh: boolean) => {
            this.layer.close(this.currentLayerIndex);
            if (isFresh) {
                this.getTableList();
            }
        })
    }

    initAreaTreeParams() {
        this.areaTreeDataParams = new TreeDataParams<AreaEx>();
        this.areaTreeDataParams.treeId = 'areaTreeArea';
        this.areaTreeDataParams.isDefaultSelected = true;
        this.areaTreeDataParams.onClick = (event: MouseEvent, treeId: string, treeNode: Area) => {
            this.tableListParams.currentPage = 1;
            this.tableListParams.AreaID = treeNode.ID;
            this.currentArea = treeNode;
            this.getTableList();
        };
        this.initAreaTreeData();
        this.areaTreeDataParams.treeInitComplete = (treeId: string) => {
        };
        this.tHeadList = [
            {field: "Name", title: "名称"},
            {field: "CreateTime", title: "创建时间"},
            {field: "Description", title: "描述"},
            {field: "bottoms", title: "操作"}
        ];
    }
/**
     * 选择某一条数据
     * @time: 2017-04-21 19:43:07
     * @params:
     * @return:
     */
    afterChangeCheck(resultList:Array<boolean>,isCheckAll:boolean):void{
        this.setIsSelectItems(resultList);
        this.selectedList = resultList;
        this.isSelectAll = isCheckAll;
    };

    sortByField(_index:number,field:string,sortStatus:boolean){

        this.tableListParams.isAsc = sortStatus;
        this.tableListParams.sortName = field;

        this.getTableList();
        this.tHeadList[_index].isAsc = sortStatus;
    }
    /**
     * creator zjh: 判断和设置当前列表是否有选中的元素
     * @param items
     */
    setIsSelectItems(items: Array<boolean>){
        let result = false;
        if(items && items.length > 0){
            let i,len;
            for(i=0,len=items.length;i<len;i++){
                if(items[i]){
                    result = true;
                    break;
                }
            }
        }
        if(this.isSelectItems !== result){
            this.isSelectItems = result;
        }
    }
    getTableList() {
        this.eventRuleService.findEventRuleListByPage(this.tableListParams).then((res: BackResponseBody<PageResult<EventRuleEx>>) => {
            if (res.code === 200) {
                this.tBodyList = res.data.Result;
                this.pageParams.currentPage = this.tableListParams.currentPage;
                this.pageParams.pageSize = this.tableListParams.pageSize ? this.tableListParams.pageSize : 10;
                this.pageParams.totalCount = res.data.TotalCount;
            }
        });
    }

    searchWithParams() {
        this.tableListParams.currentPage = 1;
        this.getTableList();
    }

    initAreaTreeData() {
        this.areaService.findListTree({keyword: this.treeSearchInput} as TreeParams).then((res: Array<AreaEx>) => {
            this.areaTreeDataParams.treeDatas = res;
        })
    }

    editEventRule(item: EventRuleEx) {
        this.openEventRulePopup(false, item);
    }

    openEventRulePopup(isAdd: boolean, item?: EventRuleEx) {
        let scope: { type: string, AreaID: string, eventRule: EventRuleEx, $destroy: Function } = this.$scope.$new();
        scope.type = isAdd ? 'Add' : 'Update';
        scope.eventRule = item;
        scope.AreaID = this.currentArea.ID;
        this.currentLayerIndex = this.layer.open({
            type: 1,
            content: popupHtml,
            scope: scope,
            title: isAdd ? '新增联动策略' : '编辑联动策略',
            area: ["800px", "800px"],
            end: function () {
                scope.$destroy();
            }
        })
    }

    changePage(num: number) {
        this.tableListParams.currentPage = num;
        this.getTableList();
    }

    changePageSize(num: number) {
        this.tableListParams.pageSize = num;
        this.tableListParams.currentPage = 1;
        this.getTableList();
    }

    deleteEventRule(item: EventRuleEx) {
        this.layer.confirm(`确认删除${item.Name}`, {
            icon: 0
        }, (index: number) => {
            this.layer.close(index);
            this.eventRuleService.deleteEventRule(item.ID).then((res: BackResponseBody<boolean>) => {
                if (res.code === 200 && res.data) {
                    console.log('删除成功', item);
                    this.getTableList();
                }
            })
        })

    }

    //多个删除node
    deleteByIds(){
        let selectedDataList:Array<EventRuleEx> = this.getSelectedList();
        if(!selectedDataList || selectedDataList.length ==0){
            return;
        }
        let ids:Array<string> = [];

        selectedDataList.forEach((server:EventRuleEx)=>{
            ids.push(server.ID);
        });
        let showText = '确定删除当前选中的 ' + ids.length + ' 条联动预案吗?';
        this.layer.confirm(showText, {
            icon: 0,
            title: this.i18nFactory('DP_CONFIG_COMMON_42'),
            area:["500px","200px"]
        },(index: number)=>{
            this.layer.close(index);
            this.submitDeleteByIds(ids);
        });

    }

    submitDeleteByIds(ids:Array<string>){
        this.eventRuleService.deleteByIds(ids).then((resp:ResponseResult<string>)=>{
            if(resp.code == 200){
                this.pageParams.currentPage =1;
                this.getTableList();
            }else{

            }
        });
    };

    //获取当前已被选中列表
    getSelectedList():Array<EventRuleEx>{
        let selectedDataList:Array<EventRuleEx> = [];
        if(this.selectedList){
            this.tBodyList.forEach((data:EventRuleEx,index:number)=>{
                if(this.selectedList[index]){
                    selectedDataList.push(data);
                }
            });
        }
        return selectedDataList;
    };

}

app.controller('baseConfigEventRuleController', EventRuleController);

