import {app} from "../../common/app/main.app";
import {PersonInfoModel} from "../../../core/entity/FaceAnalysisEnum";
import {getNationTypeForMap} from "../../../core/server/enum/NationType";

declare let require:any;
class FaceanalysisPopupDetailController {
    static $inject = ['$scope', 'layer'];
    resultIndex: number;
    result: PersonInfoModel;
    allResult:Array<PersonInfoModel>;
    baseImage:string = null;
    nationMap:{[key:string]:{text: string, value: string, parentCode: string}} = getNationTypeForMap();
    constructor(private $scope: any, private layer: any) {
        this.result = $scope.result;
        this.resultIndex = $scope.index;
        this.allResult = $scope.allResult;
        this.baseImage = $scope.baseImage;
    }

    prevResult() {
        let index = this.resultIndex - 1;
        if (index < 0) {
            this.layer.msg('没有上一条了');
        }else{
            if(this.allResult[index]){
                this.result = this.allResult[index];
                this.resultIndex = index
            }else{
                this.layer.msg('没有数据');
            }
        }
    }
    nextResult() {
        let index = this.resultIndex + 1;
        if (index > this.allResult.length -1 ) {
            this.layer.msg('没有下一条了');
        }else{
            if(this.allResult[index]){
                this.result = this.allResult[index];
                this.resultIndex = index
            }else{
                this.layer.msg('没有数据');
            }
        }
    }
}

app.controller('FaceanalysisPopupDetailController', FaceanalysisPopupDetailController);