import {app} from "../../common/app/main.app";
import 'css!./style/efResourceAlarmDetail.css';
import '../../common/factory/layerMsg.factory';
import { electronic } from '../../resourceRetrieval/resourceRetrievalEnum';
declare let $: any;

class EfResourceCollectDetailController {
    static $inject = ['$scope', '$timeout', 'mylayer','layerDec'];
    ShowAlarmStatus: boolean = false;
    startTime: string;
    endTime: string;
    renderData: any;
    actIndex: number;
    dataList:any;
    name:string;
    constructor(
        private $scope:any,
        private $timeout: Function,
        private mylayer:any,
        private layerDec:any
    ) {
        this.actIndex = this.$scope.activeIndex;
        this.dataList = this.$scope.dataList;
        this.renderData = this.dataList[this.actIndex];
        this.name=this.$scope.name;
    }


    public closePopup(){
        this.mylayer.close(this.$scope.index);
    }
    /**
     * @description 上一条，下一条
     * 
     */
    public propeUp() {
        if(this.actIndex==0){
            this.layerDec.warnInfo("已是第一条数据！");
            return 
        }
        this.actIndex--;
        this.renderData = this.dataList[this.actIndex];
    }

    public propeDown() {
        if (this.actIndex == this.dataList.length - 1) {
            this.layerDec.warnInfo('已是最后一条数据！');
            return
        }
        this.actIndex++;
        this.renderData = this.dataList[this.actIndex];

    }

    /**
     * @description 收藏与取消收藏
     * @param item
     */
    public clickCollect(item: electronic) {
        this.$scope.$emit("clickCollect", item,this.actIndex);
    }

    /**
     * @description 布控与取消布控
     * @param item
     */
    public clickSurveillance(item: electronic) {
        this.$scope.$emit("clickSurveillance", item,this.actIndex);
    }

    /**
     * @description 分析
     * @param item
     */
    public clickAnalysis(item: electronic) {
        this.$scope.$emit("clickAnalysis", item,this.actIndex);
    }
}

app.controller('efResourceCollectDetailController', EfResourceCollectDetailController);