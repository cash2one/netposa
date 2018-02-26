import { app } from "../../common/app/main.app";
import { SearchAlarmLogResult } from '../../../core/server/AlarmModule';
import PortraitTool from '../../common/portrait-tool';
declare let angular: any;

/**
 * 用于界面展示用的MyReportViewModel
 */
export class MyReportViewModel {
    // 当前记录的时间key
    timeKey: string;
    // 是否展开所有记录
    isExpand: boolean;
    alarmLogResultCount: number;
    alarmLogResultArr: Array<SearchAlarmLogResult>;
}

export class MyReportFactory {
    private timeSortArr = [] as Array<string>;
    private timeAlarmLogResultMap = {} as { [key: string]: Array<SearchAlarmLogResult> }

    constructor() {
    }

    cacheDatas(datas: Array<SearchAlarmLogResult>) {
        this.cookDatas(datas);
    }

    getDatas(): Array<MyReportViewModel> {
        let i = 0, len = this.timeSortArr.length, temp: string, result = [] as Array<MyReportViewModel>;
        for (; i < len; i++) {
            temp = this.timeSortArr[i];
            result.push({
                timeKey: temp,
                isExpand: false,
                alarmLogResultCount: this.timeAlarmLogResultMap[temp].length,
                alarmLogResultArr: this.timeAlarmLogResultMap[temp]
            });
        }
        return result;
    }

    /**
     * 重新查询时, 需要把缓存给清理掉
     */
    clearDatas() {
        this.timeSortArr = [] as Array<string>;
        this.timeAlarmLogResultMap = {} as { [key: string]: Array<SearchAlarmLogResult> };
    }

    private cookDatas(datas: Array<SearchAlarmLogResult>) {
        // 对数据进行加工. 按照时间维度来组装数据
        let i = 0, len = datas.length, temp;
        for (; i < len; i++) {
            this._cacheData(datas[i]);
        }
    }

    /**
     * 获取报警的年月日
     */
    private getYearMonthDay(dateStr: string) {
        if (dateStr == null) return;
        let date = PortraitTool.formatDate(dateStr, "yyyy-MM-dd");
        console.debug("getYearMonthDay", date);
        return date;
    }

    private _cacheData(data: SearchAlarmLogResult) {
        if (data.AlarmLog.ObjectType == 'Car') {
            let newData: any = angular.copy(data);
            data.AlarmLog.AlarmTime = newData.AlarmLog.JsonUserData.detail.passTime;
        }
        let key = this.getYearMonthDay(data.AlarmLog && data.AlarmLog.AlarmTime);
        if (key == null) return;
        if (!this.timeAlarmLogResultMap[key]) {
            this.timeAlarmLogResultMap[key] = [];
            this.linkTimeSortAndTimeMap(key);
        }
        this.timeAlarmLogResultMap[key].push(data);
    }

    /**
     * 将时间排序数组和时间结果map想关联
     */
    private linkTimeSortAndTimeMap(key: string) {
        // 根据date来进行排序, 将对应的key按照date的排序加入到timeSortArr 保证timeSortArr里的key都是按照时间从前到后的数据存放
        let i = 0, len = this.timeSortArr.length, index = 0;
        for (; i < len; i++) {
            // 逻辑: 判断当前要插入的key和现有数组的值遍历, 若key比i对应的值大了, 则插入到i对应的值之前
            if (this.compareKey(key, this.timeSortArr[i])) {
                index = i;
                break;
            }
        }
        this.timeSortArr.splice(i, 0, key);
    }

    /**
     * 比较两个key
     * @return true 表示 key1比key2大, false key1 比 key2小
     */
    private compareKey(key1: string, key2: string) {
        // 主动塞上时间
        let date1 = PortraitTool.parseDate(key1 + " 00:00:00");
        let date2 = PortraitTool.parseDate(key2 + " 00:00:00");
        if (date1.getTime() > date2.getTime()) {
            return true;
        } else {
            return false;
        }
    }
}

app.service("myReportFactory", MyReportFactory);