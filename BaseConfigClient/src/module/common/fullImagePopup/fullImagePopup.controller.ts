import { app } from "../app/main.app";
import { AngularScope } from '../types/baseAngularScope';
export interface CommonFullImagePopupParams extends AngularScope{
    imagePath: string;
}
class FullScreenPopupController {
    static $inject = ["$scope","$timeout"];
    // 用于展示的url图片
    imagePath: string;

    constructor(
        private $scope: CommonFullImagePopupParams,
        private $timeout: Function
    ){
        console.log($scope.imagePath);
        this.$timeout(()=>{
            this.imagePath = $scope.imagePath;
        });
        
    }
}

app.controller("commonFullScreenPopup", FullScreenPopupController);