import {app} from "../../common/app/main.app";
import {Result, ResultTrack} from '../../../core/entity/FaceTrackEnum';

declare let angular: any;

export class PageParams {
    totalCount: number = 1;
    pageSize: number = 5;
    currentPage: number = 1;
    pageCount: number = 1;
    data?: ResultTrack;
    currentIndex: number;
}

export interface IFaceFrequencyService {
    getAllFaceFrequencyData: ()=>  Array<Result>;
    setFaceFrequencyDataList: (data:ResultTrack) => void;
    getFaceFrequencyDataByPage: ( params: PageParams) => PageParams;
    delFaceFrequencyResult: (id: string) => boolean;
}

class FaceFrequencyService implements IFaceFrequencyService {
    private faceFrequencyDataList: ResultTrack = {} as ResultTrack;
    getAllFaceFrequencyData(){
        return this.faceFrequencyDataList.Result
    }
    setFaceFrequencyDataList(data:ResultTrack) {
        if (Array.isArray(data.Result)) {
            this.faceFrequencyDataList = angular.copy(data)
        }
    }
    getFaceFrequencyDataByPage(params: PageParams): PageParams {
        let pageParams = new PageParams();
        pageParams.pageSize = params.pageSize || 10;
        pageParams.currentPage = params.currentPage || 1;
        let faceFrequencyData = angular.copy(this.faceFrequencyDataList) as ResultTrack;
        pageParams.totalCount = faceFrequencyData.Result.length;
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
        let result = faceFrequencyData.Result.slice(start, end);

        faceFrequencyData.Result = angular.copy(result);
        pageParams.data = faceFrequencyData;
        return pageParams;
    }

    delFaceFrequencyResult(id: string): boolean {
        let arr = [] as Array<Result>;
        let list = this.faceFrequencyDataList.Result;
        for (let i = 0; i < list.length; i++) {
            if (id === list[i].AccessLog.CameraID) {
                arr = this.faceFrequencyDataList.Result.splice(i, 1)
            }
        }
        return arr.length > 0
    }

}

app.service('faceFrequencyService', FaceFrequencyService);