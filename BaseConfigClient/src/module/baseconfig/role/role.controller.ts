/**
 * 角色管理
 * @time: 2017-05-13 13:47:01
 * @params:
 * @return:
 */
import {app} from "../../common/app/main.app";
import "css!../style/baseconfig.role.css"
import "../../common/services/role.service";
import {IRoleService} from "../../common/services/role.service";

import {RoleParams} from "../../../core/params/RoleParams";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import Role from "../../../core/entity/Role";
import {ModuleItemEx} from "../../../core/entity/ex/ModuleItemEx";


declare let angular:any;

class BaseConfigRoleController {
    roleList: Array<Role>;
    findRoleListParams: RoleParams;
    static $inject = ["$scope","$timeout","roleService", "layer",'i18nFactory','$state'];
    constructor(private $scope: any,private $timeout:any,
                private roleService: IRoleService,
                private layer: any,private i18nFactory:any,
                private $state:any) {
        this.getRoleList(this.findRoleListParams);
    }



    //====================角色列表操作相关  start
    //角色列表获取
    getRoleList(params: RoleParams) {
        this.roleService.findListByParams(params).then((resp: ResponseResult<Array<Role>>) => {
            if (resp && resp.code == 200) {
                this.roleList = resp.data;

            }
        });
    };


    addRole() {
        this.$state.go('baseconfig.role.newRole')
    };

    updateRole(roleId: string) {
        this.$state.go('baseconfig.role.newRole',{roleId:roleId})
    };

    deleteById(data: Role) {
        let tipStr: string =  this.i18nFactory('FDS_01_04_19',{value: data.Name});
        this.layer.confirm(tipStr, {
            icon: 0,
            title: this.i18nFactory("FDS_00_05_04"),
            area: ["500px", "200px"]
        }, (index: number) => {
            this.layer.close(index);
            this.submitDelete(data.ID);
        })
    };

    submitDelete(id: string) {
        this.roleService.deleteById(id).then((resp: ResponseResult<string>) => {
            if (resp.code == 200) {
                this.getRoleList(this.findRoleListParams);
            }
        });
    };
}
app.controller("baseConfigRoleController", BaseConfigRoleController);
