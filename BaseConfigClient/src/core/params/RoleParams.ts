import {TreeParams} from "./tree/TreeParams";
import Role from "../entity/Role";
import {UserRoleDataEx} from "../entity/ex/UserRoleDataEx";
/**server
 * Created by dell on 2017/5/13.
 */
export class RoleParams extends TreeParams{
}

export class RoleDetailResult{
    role: Role;
    funcModuleList?: Array<UserRoleDataEx>;
    cameraPowerList?:Array<UserRoleDataEx>;
    wifiPowerList?:Array<UserRoleDataEx>;
    efencePowerList?:Array<UserRoleDataEx>;
    rmpgatePowerList?:Array<UserRoleDataEx>;
    facelibPowerList?:Array<UserRoleDataEx>;
    roleDataList:Array<UserRoleDataEx>;
}