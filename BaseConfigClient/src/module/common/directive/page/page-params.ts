/**
 * Created by dell on 2017/4/11.
 */
export default class PageParams {
    currentPage: number = 1; // 页码数
    pageSize: number = 10; // 单页显示的行数
    totalCount: number = 0; // 总数据条数(需要除以pageSize转换为页数)
    pageCount: number = 1; // 总页数
    constructor(currentPage?:number,pageSize?:number) {
        if(currentPage){
            this.currentPage = currentPage;
        }

        if(pageSize){
            this.pageSize = pageSize;
        }
    }

    setTotalCount(totalCount: number){
        if(!totalCount){
            this.totalCount = 0;
            this.pageCount = 1;
            this.currentPage = 1;
        }else{
            this.totalCount = totalCount;
            if(totalCount % this.pageSize == 0){
                this.pageCount = parseInt(this.totalCount / this.pageSize + "", 10)
            }else{
                this.pageCount = parseInt(this.totalCount / this.pageSize + "", 10) + 1;
            }
        }
    }

    setCurrentPage(currentPage: number){
        if(currentPage){
            this.currentPage = currentPage;
        }else{
            this.currentPage = 1;
        }
    }

    setPageSize(pageSize: number) {
        if (pageSize) {
            this.pageSize = pageSize;
        } else {
            this.pageSize = 10;
        }
    }
}