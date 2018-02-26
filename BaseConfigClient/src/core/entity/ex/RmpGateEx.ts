import {RmpGate} from "../RmpGate";
/**
 * Created by dell on 2017/4/17.
 */
export class RmpGateEx extends RmpGate{
    ParentArea: RmpGate;
    iconSkin: string;
    // 树节点类型
    treeType?: string;
    // 树结点parentId, 和别的数据组装树型结构用(暂时使用到的类型，人脸库)
    treeParentId?: string;
    treeID:string;
    ParentID:string;
    tId?:string;
}