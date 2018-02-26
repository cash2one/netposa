import {app} from "../../common/app/main.app";
import {FaceAnalysisResult,PersonInfoModel} from '../../../core/entity/FaceAnalysisEnum';

declare let angular: any;

export class PageParams {
    totalCount: number = 1;
    pageSize: number = 5;
    currentPage: number = 1;
    pageCount: number = 1;
    data?: FaceAnalysisResult;
    allResult:Array<PersonInfoModel>;
    currentIndex: number;
}

export interface IFaceAnalysisService {
    setFaceAnalysisDataList: (data: FaceAnalysisResult) => void
    getFaceAnalysisDataByPage: (params: PageParams,libName?:string) => PageParams;
    delFaceAnalysisResult: (id: string) => boolean;
    getAllDataForLibName: (libName?: string) => Array<PersonInfoModel>;
}

class FaceAnalysisService implements IFaceAnalysisService {
    private faceAnalysisDataList: FaceAnalysisResult = {} as FaceAnalysisResult;

    setFaceAnalysisDataList(data: FaceAnalysisResult) {
        if (data) {
            this.faceAnalysisDataList = angular.copy(data)
        }
    }

    getAllDataForLibName(libId?:string):Array<PersonInfoModel>{
        let arr = [] as Array<PersonInfoModel>;
        let faceAnalysisData = angular.copy(this.faceAnalysisDataList) as FaceAnalysisResult;
        if(libId){
            faceAnalysisData.Result.forEach((item:PersonInfoModel)=>{
                if(item.PersonInfo.LibId === libId){
                    arr.push(item)
                }
            });
        }else{
            arr = faceAnalysisData.Result
        }
        return arr;
    }

    getFaceAnalysisDataByPage(params: PageParams,libId?:string): PageParams {
        let pageParams = new PageParams();
        pageParams.pageSize = params.pageSize || 10;
        pageParams.currentPage = params.currentPage || 1;
        let faceAnalysisData = angular.copy(this.faceAnalysisDataList) as FaceAnalysisResult;
        if(libId){
             let arr = [] as Array<PersonInfoModel>;
            faceAnalysisData.Result.forEach((item:PersonInfoModel)=>{
                if(item.LibId === libId){
                    arr.push(item)
                }
            });
            faceAnalysisData.Result = arr;
        }
        console.log(faceAnalysisData);
        pageParams.totalCount = faceAnalysisData.Result.length;
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
        let result = faceAnalysisData.Result.slice(start, end);

        faceAnalysisData.Result = angular.copy(result);
        pageParams.data = faceAnalysisData;
        pageParams.allResult = this.getAllDataForLibName(libId);
        return pageParams;
    }

    delFaceAnalysisResult(id: string): boolean {
        return true
    }

}

app.service('faceAnalysisService', FaceAnalysisService);