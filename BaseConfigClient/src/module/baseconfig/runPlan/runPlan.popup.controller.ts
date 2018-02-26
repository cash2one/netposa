import {app} from "../../common/app/main.app";
import 'angular';

import PortraitTool from "../../common/portrait-tool";
import {Enum} from "../../../core/enum/Enum";

import "../../common/services/timeTemplate.service";
import {ITimeTemplateService} from "../../common/services/timeTemplate.service";

import {TimeTemplate} from "../../../core/entity/TimeTemplate";
import {
    TimeTemplateEx,
    TimeTemplateType,
    WeekItem,
    TimeItem,
    DateItem
} from "../../../core/entity/ex/TimeTemplateEx";
// import * as moment from 'moment';

import {TimeDraw} from "./TimeDraw";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {ThresholdType} from "../../../core/server/enum/ThresholdType";
import {ILayerDec} from "../../common/factory/layerMsg.factory";
import "../../common/factory/layerMsg.factory";

declare let angular: any;
declare let $: any;

class RunPlanPopupController {
    minDate: string = null;
    maxDate:string = null;
    customStartDate: string;
    customEndDate: string;
    customInfo: string;
    isUpdate: boolean;
    timeDrawModel: TimeDraw =  new TimeDraw();
    currentModelID: string = '';
    currentModel: TimeTemplateEx = new TimeTemplateEx();
    listTemplateModel:Array<TimeTemplateEx> = [];
    static $inject = ['$scope', '$timeout', 'layerDec', 'timeTemplateService'];

    constructor(private $scope: any,
                private $timeout: any,
                private layerDec: ILayerDec,
                private timeTemplateService: ITimeTemplateService,) {
        this.initTemplateList();
        this.isUpdate = this.$scope.isUpdate;
        this.initTimeTemplateLayer();

    }
    changeDate(isEnd:boolean){
        if(isEnd){
            this.$timeout(()=>{
                this.maxDate = this.customEndDate
            })
        }else{
            this.$timeout(()=>{
                this.minDate = this.customStartDate
            })

        }
    }
    initTemplateList(){
        this.timeTemplateService.findAll().then((res:ResponseResult<Array<TimeTemplateEx>>)=>{
            if(res.code === 200){
                this.listTemplateModel = res.data;
            }
        })
    }
    initTimeTemplateLayer() {
        this.$timeout(() => {
            this.timeDrawModel.grid.init();
            this.timeDrawModel.activeTimeType = ThresholdType.Hight.value;
            if (this.isUpdate) {
                this.currentModel = this.$scope.timeTplModel;
                this.timeDrawModel.drawByWeekItems(angular.fromJson(this.currentModel.WeekContent));
                this.timeDrawModel.drawByDateItems(angular.fromJson(this.currentModel.DayContent));
            }

        });
    }
    changeTempaltelayer(ID:string){
        this.timeDrawModel.clearShapeByType(ThresholdType.Hight.value);
        for(let i = 0;i<this.listTemplateModel.length;i++){
            if(this.listTemplateModel[i].ID === ID){
                try {
                    this.currentModel.WeekItems = JSON.parse(this.listTemplateModel[i].WeekContent);
                    this.currentModel.DateItems = JSON.parse(this.listTemplateModel[i].DayContent);
                    this.currentModel.WeekItems.forEach((item:WeekItem)=>{
                        item.TimeItems.forEach((item2:TimeItem)=>{
                            item2.ThresholdType = ThresholdType.Hight.value;
                        })
                    });
                    this.currentModel.DateItems.forEach((item:DateItem)=>{
                        item.TimeItems.forEach((item2:TimeItem)=>{
                            item2.ThresholdType = ThresholdType.Hight.value;
                        })
                    });
                    this.timeDrawModel.activeTimeType = ThresholdType.Hight.value;
                    this.timeDrawModel.drawByWeekItems(this.currentModel.WeekItems);
                    this.timeDrawModel.drawByDateItems(this.currentModel.DateItems);

                }catch (e){
                    console.error('Date Params is Error');
                    this.timeDrawModel.shape.clearShape();
                    this.timeDrawModel.drawByWeekItems([]);
                    this.timeDrawModel.drawByDateItems([]);
                }
                break;
            }
        }
    }

    //关闭窗口
    closeUpdateModel(isFresh?: boolean, itemNode?: TimeTemplateEx) {
        this.$scope.$emit('add.runplan.popup', isFresh, itemNode);
    }


    addCustomDayLine() {
        this.timeDrawModel.addGripLine(this.customStartDate, this.customEndDate, this.customInfo);
        //   this.timeDrawModel.shape.resetDraw(1);
    };

    commitSaveOrUpdate() {
        let drawResult = this.timeDrawModel.getDrawArea();
        this.currentModel.DateItems = drawResult.DateItems;
        this.currentModel.WeekItems = drawResult.WeekItems;


        if (!this.validate()) {
            return;
        }

        let templateModel = angular.copy(this.currentModel);
        templateModel.CreateTime = Date.now().toString();
        templateModel.DayContent = angular.toJson(this.currentModel.DateItems);
        templateModel.WeekContent = angular.toJson(this.currentModel.WeekItems);
        templateModel.WeekItems = null;
        templateModel.DateItems = null;
        templateModel.IsTemplate = !this.$scope.isTask;
        if (this.isUpdate) {
            this.timeTemplateService.update(templateModel).then((resp: ResponseResult<string>) => {
                if (resp.code === 200) {
                    this.closeUpdateModel(true, templateModel);
                }
            });
        } else {
            this.timeTemplateService.save(templateModel).then((resp: ResponseResult<string>) => {
                if (resp.code === 200) {
                    templateModel.ID = resp.data;
                    this.closeUpdateModel(true, templateModel);
                }
            });
        }
    };

    ///参数验证
    validate(): boolean {
        if (!this.currentModel.Name) {
            this.layerDec.warnInfo("未填写时间模板名称！");
            return false;
        }
        let hasTimeItem = false;
        angular.forEach(this.currentModel.WeekItems, (val: WeekItem) => {
            if (val.TimeItems && val.TimeItems.length > 0) {
                hasTimeItem = true;
            }
        });

        if (!hasTimeItem && this.currentModel.DateItems.length === 0) {
            this.layerDec.warnInfo("未做时间模板时间选择！");
            return false;
        }
        return true;
    };

}

app.controller('runPlanPopupController', RunPlanPopupController);
