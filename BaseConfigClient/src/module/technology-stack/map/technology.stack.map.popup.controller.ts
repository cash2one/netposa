import {app} from "../../common/app/main.app";
class TechnologyStackMapPopupController{

    static $inject = ["$scope"];
    buttonName: string;
    winId:string;
    closeEventName:string;
    closePopup:Function;
    init:(winId:string, closeEventName:string)=>void;

    constructor($scope: any){

        let vm = this;
        vm.buttonName = "按钮名称";
        vm.closePopup = function(){
            $scope.$emit(vm.closeEventName, vm.winId);
        };
        vm.init = function(winId: string, closeEventName: string){
            vm.winId = winId;
            vm.closeEventName = closeEventName;
        }
    }
}

app.controller("technologyStackMapPopupController", TechnologyStackMapPopupController);