import {app} from "../../common/app/main.app";

declare let angular: any;

export class PageParams {
    totalCount: number = 1;
    pageSize: number = 5;
    currentPage: number = 1;
    pageCount: number = 1;
    data?: any;
    currentIndex: number;
}

export interface ICameraPagingService {
    setDataList: (data:any) => void
    getDataByPage: ( params: PageParams) => PageParams;
    delResultById: (id: string) => boolean;
    getAllData:() => Array<any>;
}

class CameraPagingService implements ICameraPagingService {
    private faceAccompDataList: any = {};

    getAllData(){
        return this.faceAccompDataList
    }

    setDataList(data:any) {
        if (Array.isArray(data)) {
            this.faceAccompDataList = angular.copy(data)
        }
    }

    getDataByPage(params: PageParams): PageParams {
        let pageParams = new PageParams();
        pageParams.pageSize = params.pageSize || 10;
        pageParams.currentPage = params.currentPage || 1;
        let faceAccompData = angular.copy(this.faceAccompDataList) as any;

        pageParams.totalCount = faceAccompData.length;
        if (pageParams.totalCount % pageParams.pageSize === 0) {
            pageParams.pageCount = Math.round(pageParams.totalCount / pageParams.pageSize);
        } else {
            pageParams.pageCount = Math.ceil(pageParams.totalCount / pageParams.pageSize);
        }
        if (pageParams.currentPage > pageParams.pageCount) {
            pageParams.currentPage = pageParams.pageCount;
        }
        if (pageParams.pageSize > pageParams.totalCount) {
            pageParams.pageSize = pageParams.totalCount
        }
        let start = (pageParams.currentPage - 1) * pageParams.pageSize;
        let end = pageParams.currentPage * pageParams.pageSize;

        let result = faceAccompData.slice(start, end);
        faceAccompData = angular.copy(result);
        pageParams.data = faceAccompData;
        return pageParams;
    }

    delResultById(id: string): boolean {
        let arr = [] as Array<any>;
        let list = this.faceAccompDataList;
        for (let i = 0; i < list.length; i++) {
            if (id === list[i].accessLog.CameraID) {
                arr = this.faceAccompDataList.splice(i, 1)
            }
        }
        return arr.length > 0
    }

}

app.service('cameraPagingService', CameraPagingService);
