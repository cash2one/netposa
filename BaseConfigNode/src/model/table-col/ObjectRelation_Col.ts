/**
 * Created by dell on 2017/5/9.
 */
export class ObjectRelationCol {

    static Description: string = 'Description';
    // 对象id(当前指代任务ID)
    static ObjectID: string = 'ObjectID';
    // 对象类型(对应ObjectType枚举)
    static ObjectType: string = 'ObjectType';
    // 关联的关系对象ID(当前指代人脸库ID)
    static RelatedObjectID: string = 'RelatedObjectID';
    // 关联的关系对象类型(暂时业务没有使用到)
    static RelatedObjectType: string ='RelatedObjectType';
    // 暂未使用(未知)
    static Type: string = 'Type';
    // 暂未使用
    static UserID: string = 'UserID';
}