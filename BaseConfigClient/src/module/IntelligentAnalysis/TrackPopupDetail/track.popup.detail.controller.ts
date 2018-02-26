import 'css!./track.popup.detail.css';
import {app} from "../../common/app/main.app";
import {Result} from "../../../core/entity/FaceTrackEnum";
import {getAgeList, Age, Enum} from "../AnalysisEnum";
import {ILayerDec} from "../../common/factory/layerMsg.factory";
import "../../common/factory/layerMsg.factory";
import {IAnalysisService} from "../../common/services/analysis.service";
import "../../common/services/analysis.service";

declare let require:any;
class TrackPopupDetailController {
    static $inject = ['$scope', 'layerDec','analysisService'];
    resultIndex: number;
    result: Result;
    allResult:Array<Result>;
    ageData:Array<Enum<Age>> = getAgeList();
    groupAge:string;
    showRealyInfo:boolean;
    realyInfo:any;
    constructor(private $scope: any, private layerDec: ILayerDec,private analysisService:IAnalysisService) {
        this.result = $scope.result;
        this.resultIndex = $scope.index;
        this.allResult = $scope.allResult;
        this.groupAge = this.ageToGroupAge(this.result.AccessLog.Age);
        this.getRealyInfoForID(this.result.AccessLog.ID);
    }

    private getRealyInfoForID(id:string){
        this.analysisService.findRealyInfo([id]).then((res)=>{
            console.log(res)
        })
    }
    private ageToGroupAge(value:number){
        let result: string;
        for (let i = 0; i < this.ageData.length; i++) {
            let item: Enum<Age> = this.ageData[i];
            if (value >= item.value.minAge && value <= item.value.maxAge) {
                result = item.text;
                break;
            }
        }
        return result ? result : '未知';
    }
    prevResult() {
        let index = this.resultIndex - 1;
        if (index < 0) {
            this.layerDec.warnInfo('没有上一条了');
        }else{
            if(this.allResult[index]){
                this.result = this.allResult[index];
                this.resultIndex = index;
                this.groupAge = this.ageToGroupAge(this.result.AccessLog.Age);
            }else{
                this.layerDec.warnInfo('没有数据');
            }
        }
    }
    nextResult() {
        let index = this.resultIndex + 1;
        if (index > this.allResult.length -1 ) {
            this.layerDec.warnInfo('没有下一条了');
        }else{
            if(this.allResult[index]){
                this.result = this.allResult[index];
                this.resultIndex = index;
                this.groupAge = this.ageToGroupAge(this.result.AccessLog.Age);
            }else{
                this.layerDec.warnInfo('没有数据');
            }
        }
    }
}

app.controller('TrackPopupDetailController', TrackPopupDetailController);