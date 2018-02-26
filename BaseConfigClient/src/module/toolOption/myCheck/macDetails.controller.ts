import {CheckTaskModel, MyCheckDetailsParams} from "./details.controller";
import {app} from "../../common/app/main.app";
import {Enum} from "../../../core/enum/Enum";
import 'moment'

declare let moment: any;

export class macDetailsController {
    static $inject = ['$scope'];
    MyCheck: MyCheckDetailsParams;
    validTime: string;
    AuditStatusMap: { [key: string]: string };
    TaskTypeMap: { [key: string]: string };
    TaskStatusMap: { [key: string]: string };
    MyTaskModel: CheckTaskModel;

    constructor(private $scope: any) {
        this.AuditStatusMap = $scope.AuditStatusMap;
        this.TaskTypeMap = $scope.TaskTypeMap;
        this.TaskStatusMap = $scope.TaskStatusMap;
        this.MyCheck = this.$scope.MyCheck;
        this.MyTaskModel = $scope.MyTaskModel;
        this.validTime = moment(this.$scope.MyCheck.ValidTimeStart).format("YYYY-MM-DD") + "-" + moment(this.$scope.MyCheck.ValidTimeEnd).format("YYYY-MM-DD");
    }

    cancel(flag?: boolean) {
        this.$scope.$emit('details.closePopup', flag);
    }
}

app.controller('macDetailsController', macDetailsController);