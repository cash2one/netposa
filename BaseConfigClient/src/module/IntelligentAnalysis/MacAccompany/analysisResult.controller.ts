import {app} from "../../common/app/main.app";
import 'css!../style/MacAccompany.css';
import { NPGisMapMain } from '../../common/map/map.main';
import {SystemPoint} from "../../../core/entity/SystemPoint";
import {
    MacAccompanyParams,
    MacResult,
    MockMacResultData,
    FaceMacCrashParams,
    analysisResultParams,
    analysisResultList,
    getAnasisResult,
    getAnalysisList,
    sortType
} from './MacAccompanyEnum';
import {
    GetNDayTime,
    FastData,
    getFastDataList,
    Enum,
    TimeLength,
    getGlassesDataList,
    getMaskDataList,
    GlassesData,
    MaskData,
    getSexDataList,
    SexData, MockImageResultData, ImageResult, MackCrashList, Location, MockMackCrashList
} from '../AnalysisEnum';

import {} from '../FaceMacCrash/FaceMacCrashEnum';
declare let $:any;
class analysisController{
    $inject: Array<string> = ['$scope','$rootScope','$timeout'];
    map: NPGisMapMain;
    systemPointList: Array<SystemPoint>;
    MacAccompanyParams: MacAccompanyParams;

    FastDateList: Array<Enum<TimeLength>> = getFastDataList();
    FastDate: Array<Enum<TimeLength>> = [];
    ResultActive: boolean = false; // 搜索结果展示状态

    timeArea: Array<{value: number, text: string}>; // 时间段
    resultList: Array<MacResult> = MockMacResultData(5); // 查询到数据
    
    isShowCondition:boolean = true;
    initResult:boolean = true;
    isResult:boolean = true;
    isCondition:boolean = false;
    isShowDetail:boolean = false;
    showTrackdetail:boolean = false;
    analysisResult: Array<analysisResultParams> = getAnasisResult(5)
    analysisList:Array<analysisResultList> = getAnalysisList(5)
    width:number;
    analysisDetail:any;
    /**
     *
     * @description 注入依赖与入口
     * @param $scope
     * @param $timeout
     */
    constructor(private $scope:any,private $timeout:any){
        this.map = this.$scope.$parent.map;
        this.systemPointList = this.$scope.$parent.systemPoint;
        this.width = $(window).width() -60 as number;
        this.analysisDetail = document.getElementById("result-track-detail");
        this.$timeout(()=>{
            this.$scope.$emit('goCondition',true);
        });
        this.initParams();
    }

    /**
     * @description 返回上级
     */
    goBack() {
        this.$timeout(()=>{
            this.$scope.$emit('showItemPage',false);
        })
    }

    /**
     * @description 初始化查询表单参数数据
     */
    private initParams(){

        this.MacAccompanyParams = new MacAccompanyParams();
    }
    private switchCondition(){
        this.$timeout(()=>{
            this.$scope.$emit('goCondition',true);
        });

    }
    private switchResult(){
        this.isShowCondition = false;
        this.isCondition = false;
        this.isResult = true;
    }
    private showMissionDetail(missionStatus:number){
        console.log(missionStatus)
        if(missionStatus){
            this.initResult = false;
            this.isShowDetail = true;
        }
    }
    private ShowAlarmDetail(){
        this.isShowDetail = false;
        this.showTrackdetail = true;
        this.analysisDetail.style.width = this.width+'px'; 
    }
    private goResultRecords(){
        this.isShowDetail = true;
        this.showTrackdetail = false;
        this.analysisDetail.style.width = 0; 
    }
    private goResultAnalysis(){
        this.isShowDetail= false;
        this.initResult = true;
    }

    /**
     *
     * @description 改变查询时间
     * @param {string} time
     */
    changeTime(time:string){
        console.log(time);
    }
    /**
     * @description 查询
     */
    query(){
        this.ResultActive = true;
    }

    /**
     * @description 结果页返回查询页
     */
    resultBack(){
        this.ResultActive = false;
    }
    /**
     *
     * @description报警分析
     * @param {MacResult} item
     */
    analyzeClick(item: MacResult){
        console.log(item);

    }

    /**
     *
     * @description 报警收藏
     * @param {MacResult} item
     */
    collectClick(item: MacResult){
        console.log(item);
    }
}

app.controller('analysisController', analysisController);