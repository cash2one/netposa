import {Camera} from "../Camera";
export class CameraEx extends Camera{
    // 树结点parentId, 和别的数据组装树型结构用(和Area组合使用到)
    treeParentId: string;
    treeID: string;
    treeType?: string;
    iconSkin?: string;
    ParentID: string;
    Lat: number;
    Lon: number;
    //所在树 tId
    tId?: string;
}