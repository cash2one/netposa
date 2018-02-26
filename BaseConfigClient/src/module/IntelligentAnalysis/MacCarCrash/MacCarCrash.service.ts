import {app} from "../../common/app/main.app";
import {AccompanyingAnalysisResult, Result} from '../../../core/entity/AccompanyingAnalysisEnum'

declare let angular: any;

export class PageParams {
    totalCount: number = 1;
    pageSize: number = 5;
    currentPage: number = 1;
    pageCount: number = 1;
    data?: AccompanyingAnalysisResult;
    currentIndex: number;
}

export interface IMacCarCrashService {
    setFaceAccompDataList: (data:AccompanyingAnalysisResult) => void
    getFaceAccompDataByPage: ( params: PageParams) => PageParams;
    delFaceAccompResult: (id: string) => boolean;
    getAllFaceTrackData:() => Array<Result>;
}

class MacCarCrashService implements IMacCarCrashService {
    private faceAccompDataList: AccompanyingAnalysisResult = {} as AccompanyingAnalysisResult;
    getAllFaceTrackData(){
        return this.faceAccompDataList.result
    }
    setFaceAccompDataList(data:AccompanyingAnalysisResult) {
        if (Array.isArray(data.result)) {
            this.faceAccompDataList = angular.copy(data)
        }
    }
    getFaceAccompDataByPage(params: PageParams): PageParams {
        let pageParams = new PageParams();
        pageParams.pageSize = params.pageSize || 10;
        pageParams.currentPage = params.currentPage || 1;
        let faceAccompData = angular.copy(this.faceAccompDataList) as AccompanyingAnalysisResult;
        console.log(faceAccompData)
        pageParams.totalCount = faceAccompData.result.length;
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
        let result = faceAccompData.result.slice(start, end);

        faceAccompData.result = angular.copy(result);
        pageParams.data = faceAccompData;
        return pageParams;
    }

    delFaceAccompResult(id: string): boolean {
        let arr = [] as Array<Result>;
        let list = this.faceAccompDataList.result;
        for (let i = 0; i < list.length; i++) {
            if (id === list[i].AccessLog.CameraID) {
                arr = this.faceAccompDataList.result.splice(i, 1)
            }
        }
        return arr.length > 0
    }

}

app.service('macCarCrashService', MacCarCrashService);
