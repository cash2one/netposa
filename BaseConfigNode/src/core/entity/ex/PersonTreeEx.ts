import {Person} from "../Person";
import {Area} from "../Area";
import {Unit} from "../Unit";
import {UserEx} from "./UserEx";
/** create by zxq
 *  扩展person 树节点所需属性
 * @time: 2017-06-13 14:38:06
 * @params:
 * @return:
 */
export class PersonTreeEx extends Person{
    // 树结点parentId, 和别的数据组装树型结构用(和Area组合使用到)
    treeParentId: string;
    treeID: string;
    // 树节点图标
    iconSkin: string;
    // 树结点类型
    treeType: string;
	ParentID:string;
}