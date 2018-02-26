/**
 * 业务实体，用于和java服务交互用
 */
export class SearchCascadeModel{

    /**
     * id值
     */
    id: string;
    /**
     * 检索类型
     */
    searchType: string;
    /**
     * 排序方式（DESC,ASC）
     */
    orderType: string;
    /**
     * 排序字段
     */
    orderField: string;
    /**
     * 名称过滤
     */
    name: string;
    /**
     * 是否分页
     */
    isPage: boolean = false;
    /**
     * 当前页
     */
    pageIndex: number;
    /**
     * 总条数
     */
	 areaIDName:string;
    pageSize: number;

    // 编码

    code: string;

    type:string;
	    /*人员列表查询用到*/
    roleId:string;
    unitId:string;
}