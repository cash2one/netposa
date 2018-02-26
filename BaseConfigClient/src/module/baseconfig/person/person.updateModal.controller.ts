import {IPersonService} from "../../common/services/person.service";

import {app} from "../../common/app/main.app";

import '../../common/services/area.service';
import '../../common/services/unit.service';
import '../../common/services/role.service';

import 'angular';

import {PersonEx} from "../../../core/entity/ex/PersonEx";
import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {Unit} from "../../../core/entity/Unit";
import {IAreaService} from "../../common/services/area.service";
import {IUnitService} from "../../common/services/unit.service";
import {ITreeDataParams, TreeDataParams} from "../../common/directive/tree/tree-params";
import {TreeParams} from "../../../core/params/tree/TreeParams";
import {User} from "../../../core/entity/User";
import {UserEx} from "../../../core/entity/ex/UserEx";

import {IRoleService} from "../../common/services/role.service";

import PortraitTool from "../../common/portrait-tool";
import {Enum} from "../../../core/enum/Enum";
import {UserLevelEnum} from "../../../core/enum/UserLevelEnum";
import Role from "../../../core/entity/Role";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {GenderType} from "../../../core/server/enum/GenderType";
import {UserType} from "../../../core/server/enum/UserType";

declare let window: any;
declare let angular: any;

class PersonUpdateModalController {
    static $inject = ['$scope', '$timeout', 'personService', 'areaService', 'unitService', 'roleService','layer'];
    isUpdate: boolean = false;

    currentModel: PersonEx;

    areaTreeDatas: ITreeDataParams<AreaEx>;
    unitTreeDatas: ITreeDataParams<Unit>;
    // 展示的行政区域和实际保存的行政区域不同, 详情看doc
    areaViewModel: AreaEx;
    unitViewModel: Unit;

    viewPwd: string;
    userLevelList: Array<Enum> = [];
    genderTypeList: Array<{ value: string, text: string }> = [];
    userTypeList: Array<{ value: string, text: string }> = [];
    //角色列表
    roleList: Array<Role>;
    finishedRoleList: boolean;

    constructor(
        private $scope: any,
        private $timeout: any,
        private personService: IPersonService,
        private areaService: IAreaService,
        private unitService: IUnitService,
        private roleService: IRoleService,
        private layer:any
    ) {

        // 初始化 类型选择
        for (let key in UserLevelEnum) {
            this.userLevelList.push(UserLevelEnum[key]);
        }
        // 初始化 角色类型选择
        this.getRoleList();

        let vm = this;

        vm.currentModel = vm.$scope.updateData || {} as PersonEx;
        console.log('获取数据',vm.currentModel);
        vm.isUpdate = vm.$scope.isUpdate;
        let currentSelectAreaId = vm.$scope.currentSelectAreaId; // 传来的行政区域id
        let currentSelectUnitId = vm.$scope.currentSelectUnitId; // 传来的行政单位id

        //初始化 area 树数据
        vm.areaTreeDatas = new TreeDataParams<AreaEx>(true);
        vm.areaTreeDatas.treeId = 'modalArea';
        vm.areaTreeDatas.onClick = treeSelectNode;

        //初始化 unit 树数据
        vm.unitTreeDatas = new TreeDataParams<Unit>(true);
        vm.unitTreeDatas.treeId = 'modalUnit';
        vm.unitTreeDatas.onClick = treeSelectNode;

        vm.areaViewModel = {} as AreaEx;
        vm.unitViewModel = {} as Unit;
        if (!vm.currentModel.UserModel) {
            vm.currentModel.UserModel = {} as UserEx;
        }

        if (vm.isUpdate) { // 修改
            if (vm.currentModel) {
                vm.areaTreeDatas.isDefaultSelected = true;
                vm.areaTreeDatas.defaultSelectTreeId = vm.currentModel.AreaID;

                vm.unitTreeDatas.isDefaultSelected = true;
                vm.unitTreeDatas.defaultSelectTreeId = vm.currentModel.UnitID;
            } else {
                console.error("未获取到修改的人员信息参数");
            }
        } else { // 增加
            vm.currentModel = new PersonEx();
            vm.areaTreeDatas.isDefaultSelected = true;
            vm.areaTreeDatas.defaultSelectTreeId = currentSelectAreaId;

            vm.currentModel.UnitID = currentSelectUnitId;
            vm.unitTreeDatas.isDefaultSelected = true;
            vm.unitTreeDatas.defaultSelectTreeId = vm.currentModel.UnitID;

            vm.currentModel.UserModel = {} as UserEx;
            vm.currentModel.UserModel.IsDisable = true;
        }
        vm.genderTypeList = [];
        for (let k in GenderType) {
            vm.genderTypeList.push(GenderType[k]);
        }

        vm.userTypeList = [];
        for (let k in UserType) {
            vm.userTypeList.push(UserType[k]);
        }


        $scope.$on("$destroy", function () {
            console.log("销毁了弹出框");
        });


        // 正式开始执行代码
        vm.getAreaTreeList();

        function treeSelectNode(event: MouseEvent, treeId: string, treeNode: AreaEx & Unit) {
            if (treeId == 'modalArea') {
                vm.areaViewModel.Name = treeNode.Name;
                vm.unitViewModel.Name = null;
                vm.currentModel.AreaID = treeNode.ID;
                // 因为修改了行政区域, 所以需要将行政单位置空, 带行政单位树结点重新查询再赋值
                vm.currentModel.UnitID = null;

                // 根据id查询代码
                vm.$timeout(() => {
                    vm.areaTreeDatas.isShow = false;
                });

                vm.getUnitTreeList(treeNode.ID);
            } else if (treeId == 'modalUnit') {

                vm.$timeout(() => {
                    vm.unitViewModel.Name = treeNode.Name;
                    vm.currentModel.UnitID = treeNode.ID;
                    vm.currentModel.AreaID = treeNode.AreaID;

                    vm.unitTreeDatas.isShow = false;
                });
            }
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
            }
            this.finishedRoleList = true;
        });
    };

    //点击角色列表未获取列表数据 重新获取
    clickRoleList() {
        if (!this.roleList) {
            if (this.finishedRoleList) {
                this.getRoleList();
            }
        }
    }

    commitSaveOrUpdate() {
        //开始时间不填  默认为现在
        if(!this.currentModel.UserModel.StartTimeValid||this.currentModel.UserModel.StartTimeValid == ""){
            this.currentModel.UserModel.StartTimeValid = PortraitTool.formatDate(new Date(),"yyyy-MM-dd hh:mm:ss");
        }
        //如果时间不填  默认为永久有效
        if(!this.currentModel.UserModel.EndTimeValid||this.currentModel.UserModel.EndTimeValid == ""){
            this.currentModel.UserModel.EndTimeValid = "9999-12-31 00:00:00"
        }
        let checkStr = this.validateParams(this.currentModel);
        if (checkStr) {
            return;
        } else {
        }
        

        console.log('提交数据',this.currentModel);
        if (this.currentModel.ID) {
            if(this.viewPwd){
                this.currentModel.UserModel.Pwd = PortraitTool.md5(this.viewPwd);
            }
            this.personService.update(this.currentModel).then((resp: any) => {
                if (resp.code == 200) {
                    this.closeUpdateModel(true);
                }
            });
        } else {
            if(!this.viewPwd){
                return this.layer.msg('请输入密码！')
            }
            this.currentModel.UserModel.Pwd = PortraitTool.md5(this.viewPwd);
            this.personService.save(this.currentModel).then((resp: any) => {
                if (resp.code == 200) {
                    this.closeUpdateModel(true);
                }
            });
        }
    };

    closeUpdateModel(isCommit: boolean) {
        this.$scope.$emit('closeUserUpdateModel', {isCommit: isCommit});
    }

    changeTypeSelect() {
        console.log(this.currentModel);
    }

    //点击开关回调
    testChangeToggle(status: boolean) {
        this.currentModel.IsDisable = status
    }

    // 数据验证
    /*TODO 更新添加person 未做字段验证限制*/
    validateParams(model: PersonEx) {
        return '';
    }

    // areaTreeDatas数据获取
    getAreaTreeList(treeReqTree?: TreeParams) {
        this.areaService.findListTree(treeReqTree).then((resp: Array<AreaEx>) => {
            this.$timeout(() => {
                this.areaTreeDatas.treeDatas = resp;
            });
        })
    };

    // 改变显示 areaTree
    changeIsShowAreaTree() {
        this.unitTreeDatas.isShow = false;
        this.areaTreeDatas.isShow = !this.areaTreeDatas.isShow;
    };

    // unitTreeDatas数据获取
    getUnitTreeList(areaId: string) {
        this.unitService.findUnitTreeList(areaId).then((datas: Array<Unit>) => {
            this.$timeout(() => {
                this.unitTreeDatas.treeDatas = datas;
            });
        })
    };

    // 改变显示 unitTree
    changeIsShowUnitTree() {
        this.areaTreeDatas.isShow = false;
        this.unitTreeDatas.isShow = !this.unitTreeDatas.isShow;
    };


}

app
    .controller('personUpdateModalController', PersonUpdateModalController);
