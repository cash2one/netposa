/**
 * 人像库
 * @time: 2017-05-09 17:57:50
 * @params:
 * @return:
 */
export default class BusinessLibCol{
    //	编号
    static ID = "ID";
    // 名称
    static Name = "Name";
    // 拼音码
    static PYCode = "PYCode";
    // 创建人
    static Creator = "Creator";
    // 所属区域
    static AreaID = "AreaID";

    static ParentID = "ParentID";
    // 人员数量
    static PersonCount = "PersonCount";
    // 创建时间
    static CreateTime = "CreateTime";
    // 备注
    static Memo = "Memo";
    // 扩展JSON数据
    static Ext = "Ext";

    // 业务增加的, 非数据库字段
    static TreeParentID = "treeParentId";
}