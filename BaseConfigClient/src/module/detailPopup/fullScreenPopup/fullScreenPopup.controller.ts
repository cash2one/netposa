import {app} from "../../common/app/main.app";

class fullScreenPopupController {
    static $inject = ["$scope"];

    imagePath: string;
    imageStyle: string;

    constructor(private $scope: any,
                private $timeout: any,
                private mylayer: any) {
        this.imagePath = $scope.path;
    }
}

app.controller("fullScreenPopupController", fullScreenPopupController);