import ChildWhere from "./ChildWhere";
import JoinType from "./JoinType";

export default class Where {
    //匹配类型
    JType: string = JoinType.And;
    //子查询条件
    Childs: Array<ChildWhere> = new Array<ChildWhere>();
}