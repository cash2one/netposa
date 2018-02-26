/**
 * Created by dell on 2017/5/13.
 */
export class ResourceRole{
    ID: string;
    RoleID: string;
    ObjectID: string;
    // 对应ObjectType枚举
    ObjectType: string;
    // 是否禁用(0/1)
    IsDisable: boolean;
}