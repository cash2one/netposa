/**
 *  table 指令相关的 参数
 * @time: 2017-05-04 11:47:24
 * @params:
 * @return:
 */
export interface ITableHeader{
    //对应字段名 （排序回调参数）
    field : string;
    //表头显示名称
    title:string;
    //对应列是否显示
    isShow ?: boolean;
    //是否可排序
    isSort?: boolean;
    // 当前是否正序 -1 表 不参与排序
    isAsc?:boolean | number;

    tdCustomClass?: string;
}

export class TableHeader implements ITableHeader {
    //对应字段名 （排序回调参数）
    field : string;
    //表头显示名称
    title:string;
    //对应列是否显示
    isShow ?: boolean;
    //是否可排序
    isSort?: boolean;
    // 当前是否正序 -1 表 不参与排序
    isAsc?:boolean | number;

    constructor(field?:string,title?:string){
        this.field = field || "";
        this.title = title || " ";
        this.isShow = true;
        this.isSort = false;
        this.isAsc = -1;
    }

}