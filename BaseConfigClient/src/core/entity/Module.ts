/**
 * Created by dell on 2017/5/13.
 */
/*TODO 功能权限model 已改变为 ModuleItem  确定没有用到删除相应 类型限制*/
export class Module{
    ID: string;
    // 模块编码
    Code: string;
    // 模块名称
    Name: string;
    // 模块加载地址
    Url: string;
    // 顺序号
    Seq: number;
    // 父模块id
    ParentID: string;
    // 模块图表url地址
    IconUrl: string;
    // 是否禁用(0/1)
    IsDisable: boolean;

}