import DataType from "./DataType";
import MatchingType from "./MatchingType";
import JoinType from "./JoinType";

export default class ChildWhere {
    //字段名
    FieldName: string;
    //数据类型
    FieldType: string;
    //匹配类型
    MType: string;
    //值
    FieldValue: any | null;
    //匹配类型
    JType: string = JoinType.And;
}