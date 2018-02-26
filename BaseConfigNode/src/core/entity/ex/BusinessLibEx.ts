import {BusinessLib} from "../BusinessLib";
import {Area} from "../Area";
export class BusinessLibEx extends BusinessLib{

    AreaModel?: Area;
    // 树结点parentId, 和别的数据组装树型结构用(和Area组合使用到)
    treeParentId: string;
    treeID: string;
    // 树节点图标
    iconSkin: string;
    // 树结点类型
    treeType: string;
    JsonUserData?:{
        Area?: Area;
    };
    //父级信息，显示使用
    ParentModel:Area | BusinessLib;
    isShowChild ?: boolean;
    isCheckBox ?: boolean;
    children:Array<BusinessLibEx>;
}
