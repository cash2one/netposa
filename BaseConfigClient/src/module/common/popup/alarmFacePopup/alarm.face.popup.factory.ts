/// <amd-dependency path="text!./alarm.face.popup.html" name="alarmFacePopupHtml" />
import { AngularScope } from '../../types/baseAngularScope';
import { app } from '../../app/main.app';
import "./alarm.face.popup.controller";
import { SearchAlarmLogResult } from '../../../../core/server/AlarmModule';
import { AlarmFacePopupControllerParams } from './alarm.face.popup.controller';
declare let alarmFacePopupHtml: string;

export class CommonAlarmFacePopupFactory{
    static $inject = ["layer"];
    constructor(private layer: any){

    }

    showPopup(parentScope: AngularScope, item: SearchAlarmLogResult){
        let scope:AlarmFacePopupControllerParams = parentScope.$new();
        scope.faceAlarmData = item;

        this.layer.open({
            type: 1,
            content: alarmFacePopupHtml,
            area:["auto", "480px"],
            title: "人脸报警详情",
            scope: scope,
            end: ()=>{
                scope.$destroy();
                scope = null;
            }
        });
        parentScope = null;
    }
}
app.service("commonAlarmFacePopup", CommonAlarmFacePopupFactory);