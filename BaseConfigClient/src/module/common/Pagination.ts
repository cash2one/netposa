declare let angular: any;

export class PageParamsAndResult {
    totalCount: number = 1;
    pageSize: number = 10;
    currentPage: number = 1;
    pageCount: number = 1;
    data?: Array<any>;
    allData?: Array<any>;
}

export interface IPagination {
    getByPage(params: PageParamsAndResult): PageParamsAndResult;

    set(data: Array<any>): boolean

    get(): Array<any>

    delByPageId(pageId: string): boolean;

    updateByPageId(pageId: string, item: any): boolean;
}

export class Pagination implements IPagination {
    private data: Array<any> = [];
    private mapData: { [key: string]: any } = {};
    private result: PageParamsAndResult = new PageParamsAndResult();

    set(data: Array<any>): boolean {
        if (Array.isArray(data)) {
            data.forEach((item: any, index: number) => {
                item['pageId'] = `Pagination${index}`;
                this.mapData[`Pagination${index}`] = item;
            });
            this.data = data;
            return true
        } else {
            console.error('Pagination ===> params is not Array');
            return false
        }
    }

    get(): Array<any> {
        return angular.copy(this.data);
    }

    delByPageId(pageId: string): boolean {
        if (this.mapData[pageId]) {
            delete this.mapData[pageId];
            let tempRes = [] as  Array<any>;
            for (let k in this.mapData) {
                tempRes.push(this.mapData[k])
            }
            this.data = tempRes;
            return true;
        } else {
            console.error(`Pagination ===> pageId is not found`);
            return false;
        }
    }

    updateByPageId(pageId: string, item: any): boolean {
        if (this.mapData[pageId]) {
            this.mapData[pageId] = item;
            this.mapData[pageId].pageId = pageId;
            let tempRes = [] as  Array<any>;
            for (let k in this.mapData) {
                tempRes.push(this.mapData[k])
            }
            this.data = tempRes;
            return true;
        } else {
            console.error(`Pagination ===> pageId is not found`);
            return false;
        }
    }

    getByPage(params: PageParamsAndResult): PageParamsAndResult {
        this.result.pageSize = params.pageSize || 10;
        this.result.currentPage = params.currentPage || 1;
        let res = angular.copy(this.data) as Array<any>;
        this.result.totalCount = res.length;
        this.result.allData = res;
        if (this.result.totalCount % this.result.pageSize === 0) {
            this.result.pageCount = Math.round(this.result.totalCount / this.result.pageSize);
        } else {
            this.result.pageCount = Math.ceil(this.result.totalCount / this.result.pageSize);
        }
        if (this.result.currentPage > this.result.pageCount) {
            this.result.currentPage = this.result.pageCount;
        }
        // if (this.result.pageSize > this.result.totalCount) {
        //     this.result.pageSize = this.result.totalCount
        // }
        let start = (this.result.currentPage - 1) * this.result.pageSize;
        let end = this.result.currentPage * this.result.pageSize;
        this.result.data = res.slice(start, end);
        res = null;
        return angular.copy(this.result);
    }
}