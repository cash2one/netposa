import {User} from "../User";

export class UserTreeEx extends User{
    // 树结点parentId, 和别的数据组装树型结构用(和Area组合使用到)
    treeParentId: string;
    treeID: string;
    // 树节点图标
    iconSkin: string;
    // 树结点类型
    treeType: string;
    ParentID:string;
    AreaID:string;
	Name:string;
}