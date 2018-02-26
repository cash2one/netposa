import {app} from "../../common/app/main.app";
import {SystemPoint} from "../../../core/entity/SystemPoint";

class MapPopupController {
    static $inject = ['$scope', '$timeout'];
    model: SystemPoint;
    ID: string;

    constructor(private $scope: any, private $timeout: any) {
        this.$timeout(() => {
            this.model = this.$scope.model;
            this.ID = this.$scope.ID;
        })
    }

    submit() {
        this.$scope.$emit('close.map.point.popup', this.model, this.ID, true)
    }

    cancel() {
        this.$scope.$emit('close.map.point.popup', this.model, this.ID, false)
    }
}

app.controller('mapPopupController', MapPopupController);