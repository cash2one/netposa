
import { app } from "../common/app/main.app";
import "css!./technology-stack.css";
import { ILayerDec } from './../common/factory/layerMsg.factory';
import './../common/factory/layerMsg.factory';

declare let angular: any;
declare let jeDate: any;
class TechnologyStackController {
    static $inject = ['$scope', '$http', '$interval', 'layerDec', '$timeout'];
    switchTrue: boolean = true;
    switchFlase: boolean = false;
    cacheFunc: Function;
    constructor(private $scope: any, private $http: any, private $interval: any, private layerDec: ILayerDec, private $timeout: any) {

    }

    changeStatus(status: boolean) {
        this.$timeout(() => {
            if (status) {
                this.layerDec.successInfo('当前状态：Is Checked')
            } else {
                this.layerDec.failInfo('当前状态：Not Checked')
            }
        }, 1000)
    }
}

app.controller("technologyStackController", TechnologyStackController);