import 'css!./mac.popup.detail.css';
import {app} from "../../common/app/main.app";
import {Result} from "../../../core/entity/FaceTrackEnum";
let Promise = require('es6-promise');
declare let require:any;
class MacPopupDetailController {
    static $inject = ['$scope', 'layer'];
    resultIndex: number;
    result: Result;
    allResult:Array<Result>=[];
    constructor(private $scope: any, private layer: any) {
        this.result = $scope.result;
        this.resultIndex = $scope.index;
        this.allResult = $scope.allResult;
        console.log(this.allResult)
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
        if(!this.allResult){this.allResult=[]}
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

app.controller('MacPopupDetailController', MacPopupDetailController);