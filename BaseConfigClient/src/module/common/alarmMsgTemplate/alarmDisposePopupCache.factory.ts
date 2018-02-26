
import {app} from "../app/main.app";


export interface IAlarmPopupCache{
    //存储当前是否打开报警处理窗口
    setAlarmPopupState : (state : Boolean) => void;
    //获取当前报警处理窗口的状态
    getAlarmPopupState : () => Boolean;
}

class AlarmPopupCache implements IAlarmPopupCache{

    //存储当前是否打开报警处理窗口
    private AlarmPopupState : Boolean = false;
    setAlarmPopupState = (state : Boolean) => {
        this.AlarmPopupState = state;
    };
    getAlarmPopupState = () => {
        return this.AlarmPopupState;
    };
    //*************


}
app.service('alarmPopupCache' , AlarmPopupCache)