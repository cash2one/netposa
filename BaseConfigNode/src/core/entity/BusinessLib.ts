/**
 * 人像库
 * @time: 2017-05-09 17:57:50
 * @params:
 * @return:
 */
export class BusinessLib{
    //	编号
    ID: string;
    // 名称
    Name: string;
    // 拼音码
    PYCode: string;
    // 创建人
    Creator:string;
    // 所属区域
    AreaID:string;
    // 所属上级库
    ParentID:string;
    // 人员数量
    PersonCount:number;
    // 创建时间
    CreateTime:string;
    // 备注
    Memo:string;
    // 扩展JSON数据
    Ext: string;
}