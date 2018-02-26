import {CheckTaskModel, MyCheckDetailsParams} from "./details.controller";
import {app} from "../../common/app/main.app";
import {Enum} from "../../../core/enum/Enum";
import 'moment'

declare let moment: any;

const CarForColor: Array<Enum> = [
    {value: '0', text: '白色'},
    {value: '1', text: '黄色'},
    {value: '2', text: '蓝色'},
    {value: '3', text: '黑色'},
    {value: '101', text: '绿色'},
    {value: '4', text: '其他'},
];


export class vehicleDetailsController {
    static $inject = ['$scope'];
    MyCheck: MyCheckDetailsParams;
    validTime: string;
    AuditStatusMap: { [key: string]: string };
    TaskTypeMap: { [key: string]: string };
    TaskStatusMap: { [key: string]: string };
    CarForColor: Array<Enum> = CarForColor;
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

app.controller('vehicleDetailsController', vehicleDetailsController);