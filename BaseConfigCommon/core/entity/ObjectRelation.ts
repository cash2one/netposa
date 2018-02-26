/**
 * Created by dell on 2017/5/9.
 */
export class ObjectRelation {

    Description: string;
    // 对象id(当前指代任务ID)
    ObjectID: string;
    // 对象类型(对应ObjectType枚举)
    ObjectType: string;
    // 关联的关系对象ID(当前指代人脸库ID)
    RelatedObjectID: string;
    // 关联的关系对象类型(暂时业务没有使用到)
    RelatedObjectType: string;
    // 暂未使用(未知)
    Type: string;
    // 暂未使用
    UserID: string;
}