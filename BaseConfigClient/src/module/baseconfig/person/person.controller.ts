/**
 * Created by dell on 2017/3/23.
 */
/// <amd-dependency path="text!./person.updateModal.html" name="personUpdateModalHtml" />

import "css!../css/baseconfig-person.css";
import "css!../style/swith-toggle.css";
import "css!../style/baseconfig-area.css";
import {IAreaService} from "../../common/services/area.service";
import {Person} from "../../../core/entity/Person";
import {PersonEx, FindPersonModel} from "../../../core/entity/ex/PersonEx";
import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {ResponseResult, PageResult} from "../../../core/params/result/ResponseResult";
import {IPersonService} from "../../common/services/person.service";
import {IRoleService} from "../../common/services/role.service";

import {app} from "../../common/app/main.app";
import '../../common/services/area.service';
import "../../common/services/person.service";
import "../../common/services/unit.service";
import "../../common/services/role.service";
import 'angular';

import './person.updateModal.controller'
import PageParams from "../../common/directive/page/page-params";
import {ITableHeader} from "../../common/directive/unit-table/table-params";
import {ITreeDataParams, TreeDataParams} from "../../common/directive/tree/tree-params";
import {PersonListParams, PersonChangeStatusParams} from "../../../core/params/PersonParams";
import {TreeParams} from "../../../core/params/tree/TreeParams";
import {ICasCadeService, CasCadeSearchParams} from "../../common/services/casecade.service";
import Role from "../../../core/entity/Role";
import {GenderType} from "../../../core/server/enum/GenderType";
import {Unit} from "../../../core/entity/Unit";
import {IUnitService} from "../../common/services/unit.service";
import {UserEx} from "../../../core/entity/ex/UserEx";
import { IUserInfoCacheFactory } from "../../common/factory/userinfo.cache.factory";

declare var angular: any;
declare let personUpdateModalHtml: any;

class BaseConfigPersonController {
    static $inject = ['$scope', '$timeout', 'layer', 'areaService', 'personService', 'casCadeService', 'roleService', 'i18nFactory', 'unitService','userInfoCacheFactory'];

    pageParams: PageParams;  //------directive pages params
    //综合查询条件
    finListParams: PersonListParams;
    // 按钮查询条件 (名称，角色类型)
    searchParams: { name: string, unitId: string, roleId: string } = {name: null, unitId: null, roleId: null};
    //添加更新操作
    updateLayerIndex?: number = 0;

    // 选择行政区域树
    areaTreeDatas: ITreeDataParams<AreaEx>;
    currentArea: AreaEx;
    areaTreeSearchInputStr: string = "";
    // table 列表数据
    tHeadList: Array<ITableHeader>;
    tBodyList: Array<FindPersonModel>;

    tableNoData: boolean = false;

    // 是否全选标识
    isSelectAll: boolean = false;
    // 选择结果列表
    selectedList: Array<boolean>;
    //角色列表
    roleList: Array<Role>;
    finishedRoleList: boolean;
    // alter wyr: 用于判断当前界面上的列表是否被选中
    isSelectItems: boolean;
    genderTypeObj: { [key: string]: string };
    unitList: Array<Unit>;
    currentUid:string;

    constructor(private $scope: any, private $timeout: any, private layer: any, private areaService: IAreaService,
                private personService: IPersonService, private casCadeService: ICasCadeService,
                private roleService: IRoleService, private i18nFactory: any, private unitService: IUnitService,
                private userInfoCacheFactory: IUserInfoCacheFactory) {

        // dataLIst
        this.pageParams = new PageParams();
        this.finListParams = this.initFindPersonListParams();

        this.tBodyList = [];
        //-------------
        this.tHeadList = [
            {field: "Name", title: "DP_CONFIG_PERSON_10"},
            {field: "CallNo", title: "DP_CONFIG_PERSON_11"},
            {field: "EMail", title: "DP_CONFIG_PERSON_12"},
            {field: "Name", title: "DP_CONFIG_PERSON_13"},
            {field: "Port", title: "DP_CONFIG_PERSON_14"},
            {field: "Port", title: "DP_CONFIG_PERSON_15"},
            {field: "Description", title: "DP_CONFIG_PERSON_16"},
            {field: "", title: "DP_CONFIG_PERSON_17"},
        ];
        // 初始化界面中需要使用到的枚举
        this.initEnums();

        let vm_this = this;
        // 树列表数据
        //初始化 area 树数据
        this.areaTreeDatas = new TreeDataParams<AreaEx>();
        this.areaTreeDatas.treeId = 'areaPerson';
        this.areaTreeDatas.onClick = treeSelectNode;
        this.areaTreeDatas.treeInitComplete = treeInitComplete;

        // 节点选择
        function treeSelectNode(event: MouseEvent, treeId: string, treeNode: AreaEx) {

            if (treeNode.ID == vm_this.finListParams.areaID) {
                if (vm_this.tBodyList) {
                    return;
                }
            }
            vm_this.finListParams.areaID = treeNode.ID;
            vm_this.getListByParams(vm_this.finListParams);
            vm_this.getUniListByArea(treeNode.ID);
        }

        function treeInitComplete() {
        }

        this.getAreaTreeList();
        this.getRoleList();
    }

    initEnums() {
        this.genderTypeObj = {} as { [key: string]: string };
        let item;
        for (let k in GenderType) {
            item = GenderType[k];
            this.genderTypeObj[item.value] = item.text;
        }
    }

    //角色列表操作
    getRoleList() {
        /*TODO 调用获取角色列表使用角色管理搜索同一接口*/
        let req_params = {
            keyword: ""
        };
        this.finishedRoleList = false;
        this.roleService.findListByParams(req_params).then((resp: ResponseResult<Array<Role>>) => {
            if (resp.code == 200) {
                this.roleList = resp.data;
                this.finishedRoleList = true;
            } else {
                this.finishedRoleList = false;
            }
        });
    };

// 单位列表
    getUniListByArea(areaId: string) {
        this.unitList = null;
        this.unitService.findUnitTreeList(areaId).then((datas: Array<Unit>) => {
            if (datas && datas.length > 0) {
                this.$timeout(() => {
                    this.unitList = datas;
                })
            }
        });
    }

    //点击角色列表未获取列表数据 重新获取
    clickRoleList() {
        if (!this.finishedRoleList && !this.roleList) {
            this.getRoleList();
        }
    }

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
    setAreaTreeDatas(treeDatas?: Array<AreaEx>) {
        this.areaTreeDatas.treeDatas = treeDatas;
    };

    getCasCadeSearchParams(tableParams: PersonListParams) {
        if (!tableParams) return {} as CasCadeSearchParams;

        let result = new CasCadeSearchParams();
        result.pageIndex = tableParams.currentPage;
        result.orderField = tableParams.sortName;
        result.pageSize = tableParams.pageSize;
        result.areaId = tableParams.areaID;
        result.isAsc = tableParams.isAsc;
        result.name = this.searchParams.name;
        result.roleId = this.searchParams.roleId;
        result.unitId = this.searchParams.unitId;
        return result;
    };

    /** TODO 未限制查询重复点击 行政区域条件*/
    /**
     *  根据条件查询
     * @time: 2017-04-20 20:42:41
     * @params: req_params 内除了做分页
     * @return:
     */
    getListByParams(req_params: PersonListParams) {
        let vm_this = this;
        let uid = this.userInfoCacheFactory.getCurrentUid();
        this.currentUid = uid;
        this.casCadeService.findUserList(this.getCasCadeSearchParams(req_params)).then(function (resp: ResponseResult<Array<FindPersonModel>>) {
            if (resp.code == 200) {
                vm_this.$timeout(() => {
                    if (resp.data && resp.data.length > 0) {
                        vm_this.tBodyList = resp.data;//vm_this.deleteAdmin(resp.data);
                        vm_this.tableNoData = false;
                    } else {
                        vm_this.tBodyList = [];
                        vm_this.tableNoData = true;
                    }
                    let pageParams = new PageParams();
                    pageParams.currentPage = req_params.currentPage;
                    pageParams.pageSize = req_params.pageSize;
                    pageParams.setTotalCount(resp.count);
                    vm_this.pageParams = pageParams;
                });
            }
        });
    }

    // deleteAdmin(oldData:Array<FindPersonModel>):Array<FindPersonModel>{
    //     angular.forEach(oldData, (val: FindPersonModel,index:number) => {
    //         debugger
    //         if(val.Uid = "admin"){
    //             oldData.slice(index,1);
    //         }
    //     });
    //     return oldData;
    // }

    initFindPersonListParams(): PersonListParams {
        let newParams = new PersonListParams();
        newParams.areaID = '';
        newParams.unitID = '';
        newParams.name = '';
        newParams.pageSize = this.pageParams.pageSize;
        newParams.currentPage = 1;
        return newParams;
    }

    initSearchParams() {
        //  this.searchParams.name = this.finListParams.name;
    }

    getListBySearch() {
        if (!this.areaTreeDatas.treeDatas) {
            /*TODO 行政区域数据为空未做重查处理*/
            return;
        }
        if (this.searchParams.name == this.finListParams.name) {
            //
        }
        this.finListParams.currentPage = 1;
        this.finListParams.name = this.searchParams.name;
        this.getListByParams(this.finListParams);
    }

    //-------------- 更新、添加新 user modao 操作
    /**
     * id 获取详情
     * @time: 2017-04-19 16:46:06
     * @params: id:string
     * @return:
     */
    findById(id: string) {
        return this.personService.findDetailById(id);
    }

    /**
     * 编辑操作
     * @time: 2017-04-19 17:04:34
     * @params:
     * @return:
     */
    update(model?: PersonEx) {
        this.findById(model.PersonID).then((resp: ResponseResult<PersonEx>) => {
            if (resp.code == 200) {
                this.openSaveOrUpdateModal(true, resp.data);
            }
        });

    };

    /**
     * 打开添加、编辑用户资料窗口
     * @time: 2017-04-19 17:03:30
     * @params: isUpdate、data 不传则默认添加操作
     * @return:
     */
    openSaveOrUpdateModal = (isUpdate?: boolean, data?: PersonEx) => {

        let scope: any = this.$scope.$new();
        let titleStr = '';
        if (isUpdate) {
            scope.isUpdate = true;
            scope.updateData = data;
            titleStr = this.i18nFactory('DP_CONFIG_COMMON_38');
        } else {
            scope.isUpdate = false;
            scope.currentSelectAreaId = this.finListParams.areaID;
            scope.currentSelectUnitId = this.finListParams.unitID;
            titleStr = this.i18nFactory('DP_CONFIG_COMMON_40');
        }

        this.layer.open({
            type: 1,
            title: titleStr,
            content: personUpdateModalHtml,
            skin: 'no-scroll',
            scope: scope,
            area: ["auto","482px"],
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

    getUpdateLayerIndex() {
        return this.updateLayerIndex;
    };

    openCloseLayerWatch() {
        if (!this.updateLayerIndex) {
            let self_this = this;
            this.$scope.$on('closeUserUpdateModel', function (even: any, data: { isCommit: boolean }) {

                if (data.isCommit) {
                    self_this.finListParams.name = '';
                    self_this.initSearchParams();
                    self_this.$timeout(() => {
                        self_this.getListByParams(self_this.finListParams);
                    }, 1000)
                }
                self_this.closeLayer();
            });
        }
    }

    // 关闭当前编辑的modal
    closeLayer(): any {
        let index = this.getUpdateLayerIndex();
        return this.layer.close(index);
    }

    //单个删除
    delete(id: string) {
        // 弹出删除确认提示框
        this.layer.confirm(this.i18nFactory('DP_CONFIG_COMMON_43'),
            {
                icon: 0,
                title: this.i18nFactory('DP_CONFIG_COMMON_42'),
                area: ["500px", "200px"]
            }, (index: number) => {
                this.layer.close(index);
                this.personService.deleteById(id).then((resp: ResponseResult<string>) => {
                    if (resp.code === 200) {
                        this.finListParams.currentPage = 1;
                        this.getListByParams(this.finListParams);
                    }
                });
            });
    };

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
    getSelectedList(): Array<FindPersonModel> {
        let personList: Array<FindPersonModel> = [];
        if (this.selectedList) {
            this.tBodyList.forEach((person: FindPersonModel, index: number) => {
                if (this.selectedList[index]) {
                    personList.push(person);
                }
            });
        }
        return personList;
    };

    //多个删除
    deleteByIds() {
        let personList: Array<FindPersonModel> = this.getSelectedList();
        if (!personList || personList.length == 0) {
            this.layer.msg(this.i18nFactory('DP_CONFIG_COMMON_84'));
            return;
        }
        let ids: Array<string> = [];
        this.getSelectedList().forEach((persons: FindPersonModel) => {
            ids.push(persons.ID);
        });
        // 弹出删除确认提示框
        this.layer.confirm(this.i18nFactory('DP_CONFIG_IODSERVER_12', {value: ids.length}),
            {
                icon: 0,
                title: this.i18nFactory('DP_CONFIG_COMMON_42'),
                area: ["500px", "200px"]
            }, (index: number) => {
                this.layer.close(index);
                this.personService.deleteByIds(ids).then((resp: ResponseResult<string>) => {
                    if (resp.code == 200) {
                        this.finListParams.currentPage = 1;
                        this.getListByParams(this.finListParams);
                    }
                });
            });
    }

    //about page click
    changePage(num: number) {
        this.finListParams.currentPage = num;
        this.initSearchParams();
        this.getListByParams(this.finListParams);
    }

    changePageSize(num: number) {
        this.finListParams.pageSize = num;
        this.initSearchParams();
        this.getListByParams(this.finListParams);
    }

    exportTempalte() {
        this.layer.msg("导出模版功能未实现");
    }

    batchAdd() {
        this.layer.msg("批量导入用户功能未实现");
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

    // 在表格中直接点击转换用户的启用关闭状态
    changeUserStatusTd(checked: boolean, item: UserEx) {
        this.personService.changeUserStatus({
            "userIds": item.ID,
            "status": checked
        } as PersonChangeStatusParams).then((res: ResponseResult<boolean>) => {
            if (res.code !== 200) {
                item.IsDisable = false;
            }
        });
    }


    changeUserStatus(flag: boolean) {
        let personList: Array<FindPersonModel> = this.getSelectedList();
        console.error(personList);
        if (!personList || personList.length == 0) {
            this.layer.msg(this.i18nFactory('DP_CONFIG_COMMON_84'));
            return;
        }
        let ids: Array<string> = [];
        personList.forEach((person: FindPersonModel) => {
            ids.push(person.ID);
        });
        return this.personService.changeUserStatus({userIds: ids.join(","), status: flag} as PersonChangeStatusParams)
            .then((res: ResponseResult<any>) => {
                // 请求成功, 刷新列表
                if (res.code == 200) {
                    // 刷新列表
                    this.$timeout(() => {
                        this.getListByParams(this.finListParams);
                    }, 1000)
                }
            });
    }
}

app
    .controller('baseConfigPersonController', BaseConfigPersonController);
