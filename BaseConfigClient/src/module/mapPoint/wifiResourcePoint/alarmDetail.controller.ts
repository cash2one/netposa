import {app} from "../../common/app/main.app";
import 'css!./style/tplAlarmDetail.css';
// wifi历史检索数据
import {
    wifi,
    CollectAddParams,
    CollectDeleteParams
} from '../../resourceRetrieval/resourceRetrievalEnum';
declare let $: any;

class AlarmDetailController {
    static $inject = ['$scope', '$timeout', 'mylayer','layerDec'];
    ShowAlarmStatus: boolean = false;
    startTime: string;
    endTime: string;
        renderData: any;
    actIndex: number;
    dataList: any;
    name :string=''

    constructor(
        private $scope:any,
        private $timeout: Function,
        private mylayer:any,
        private layerDec: any
    ) {
        this.actIndex = this.$scope.activeIndex;
        this.dataList = this.$scope.dataList;
        this.renderData = this.dataList[this.actIndex];
        this.name=this.$scope.name;

    }

    public lastClick(){
        if (this.actIndex == 0){
            this.layerDec.warnInfo("已是第一条数据！");
            return ;
        }
        this.actIndex--;
        this.renderData = this.dataList[this.actIndex];
    }


    public nextClick(){
        if (this.actIndex == this.dataList-1) {
            this.layerDec.warnInfo('已是最后一条数据！');
            return 
        }
        this.actIndex++;
        this.renderData = this.dataList[this.actIndex];
    }

    public changeTime(){

    }

    public closePopup(){
        this.mylayer.close(this.$scope.index);
    }
    /**
     * @description 收藏与取消收藏
     * @param item
     */
    public clickCollect(item: wifi) {
        this.$scope.$emit("clickCollect", item, this.actIndex);
    }

    /**
     * @description 布控与取消布控
     * @param item
     */
    public clickSurveillance(item: wifi) {
        this.$scope.$emit("clickSurveillance", item, this.actIndex);
    }

    /**
     * @description 分析
     * @param item
     */
    public clickAnalysis(item: wifi) {
        this.$scope.$emit("clickAnalysis", item, this.actIndex);
    }
}

app.controller('alarmDetailController', AlarmDetailController);