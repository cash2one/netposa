import {app} from "../../common/app/main.app";
import 'css!./style/efResourceAlarmDetail.css';
import { electronic } from '../../resourceRetrieval/resourceRetrievalEnum';
declare let $: any;

class EfResourceAlarmDetailController {
    static $inject = ['$scope', '$timeout', 'mylayer','layerDec'];
    ShowAlarmStatus: boolean = false;
    startTime: string;
    endTime: string;

    actIndex: number;
    alarmdataList: any;
    renderData: any;
    name:string;
    constructor(
        private $scope:any,
        private $timeout: Function,
        private mylayer:any,
        private layerDec:any
    ) {
        this.actIndex = this.$scope.activeIndex;
        this.alarmdataList = this.$scope.alarmdataList;
        this.renderData = this.alarmdataList[this.actIndex];
        this.name=this.$scope.name;
    }

    public changeTime(){

    }

    public closePopup(){
        this.mylayer.close(this.$scope.index);
    }

    /**
     * @description 上一条，下一条
     * 
     */
    public propeUp() {
        if (this.actIndex == 0) {
            this.layerDec.warnInfo("已是第一条数据！");
            return
        }
        this.actIndex--;
        this.renderData = this.alarmdataList[this.actIndex];
    }

    public propeDown() {
        if (this.actIndex == this.alarmdataList.length - 1) {
            this.layerDec.warnInfo('已是最后一条数据！');
            return
        }
        this.actIndex++;
        this.renderData = this.alarmdataList[this.actIndex];
    }

    /**
     * @description 收藏与取消收藏
     * @param item
     */
    public clickCollect(item: electronic) {
        this.$scope.$emit("clickCollect", item, this.actIndex);
    }

    /**
     * @description 布控与取消布控
     * @param item
     */
    public clickSurveillance(item: electronic) {
        this.$scope.$emit("clickSurveillance", item, this.actIndex);
    }

    /**
     * @description 分析
     * @param item
     */
    public clickAnalysis(item: electronic) {
        this.$scope.$emit("clickAnalysis", item, this.actIndex);
    }
}

app.controller('efResourceAlarmDetailController', EfResourceAlarmDetailController);