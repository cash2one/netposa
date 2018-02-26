import {app} from "../../common/app/main.app";
import PortraitTool from '../../common/portrait-tool';
import {Collect} from "../../../core/entity/Collect";
import {CollectEx} from "../../../core/entity/ex/CollectEx";

/**
 * 用于界面展示用的MyReportViewModel
 */
export class MyCollectViewModel {
    // 当前记录的时间key
    timeKey: string;
    // 是否展开所有记录
    isExpand: boolean;
    collectResultArr: Array<CollectEx>;
}

export class MyCollectFactory {
    private timeSortArr = [] as Array<string>;
    private timeCollectResultMap = {} as { [key: string]: Array<CollectEx> }

    constructor() {
    }

    cacheDatas(datas: Array<CollectEx>) {
        this.cookDatas(datas);
    }

    getDatas(): Array<MyCollectViewModel> {
        let i = 0, len = this.timeSortArr.length, temp: string, result = [] as Array<MyCollectViewModel>;
        for (; i < len; i++) {
            temp = this.timeSortArr[i];
            result.push({
                timeKey: temp,
                isExpand: false,
                collectResultArr: this.timeCollectResultMap[temp]
            });
        }
        return result;
    }

    /**
     * 重新查询时, 需要把缓存给清理掉
     */
    clearDatas() {
        this.timeSortArr = [] as Array<string>;
        this.timeCollectResultMap = {} as { [key: string]: Array<CollectEx> };
    }

    /**
     * 移除单条数据
     * @param model 要移除的搜藏数据, 渲染界面用的数组
     */
    removeData(model: CollectEx, cacheDatas: MyCollectViewModel) {
        let key = this.getYearMonthDay(model.CollectTime);
        // 遍历数组, 找到对应的 删除掉
        let arr = this.timeCollectResultMap[key], i, len, temp: MyCollectViewModel, isDelete: boolean = false;
        if (arr && arr.length > 0) {
            for (i = 0, len = arr.length; i < len; i++) {
                if (arr[i].ID === model.ID) {
                    // 移除掉这条数据
                    isDelete = true;
                    arr.splice(i, 1);
                    i--;
                    len--;
                    break;
                }
            }
        }

    }

    private cookDatas(datas: Array<CollectEx>) {
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
        return date;
    }

    private _cacheData(data: CollectEx) {
        let key = this.getYearMonthDay(data.CollectTime);
        if (key == null) return;
        if (!this.timeCollectResultMap[key]) {
            this.timeCollectResultMap[key] = [];
            this.linkTimeSortAndTimeMap(key);
        }
        this.timeCollectResultMap[key].push(data);
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

app.service("myCollectFactory", MyCollectFactory);