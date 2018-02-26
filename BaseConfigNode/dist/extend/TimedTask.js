"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resource_1 = require("./Resource");
const DataType_1 = require("../core/server/enum/DataType");
const Config_1 = require("../Config");
let cronJob = require("cron").CronJob;
const TIME_INTERVAL_NOW = Config_1.default.IS_DEV ? '0 0 */1 * * *' : '0 */1 * * * *';
const TIME_INTERVAL_HIS = '0 0 */23 * * *';
class TimedTask {
    static TaskNowResource(isStrat) {
        if (isStrat) {
            TimedTask.ResourceServerExt.requestAllResource(DataType_1.DateType.ALL);
            TimedTask.ResourceServerExt.requestFaceResource(DataType_1.DateType.ALL);
            TimedTask.ResourceServerExt.requestWifiResource(DataType_1.DateType.ALL);
            TimedTask.ResourceServerExt.requestEfenceResource(DataType_1.DateType.ALL);
            TimedTask.ResourceServerExt.requestCarResource(DataType_1.DateType.ALL);
        }
        new cronJob({
            cronTime: TIME_INTERVAL_NOW,
            onTick: () => {
                TimedTask.ResourceServerExt.requestAllResource(DataType_1.DateType.ALL);
                TimedTask.ResourceServerExt.requestFaceResource(DataType_1.DateType.ALL);
                TimedTask.ResourceServerExt.requestWifiResource(DataType_1.DateType.ALL);
                TimedTask.ResourceServerExt.requestEfenceResource(DataType_1.DateType.ALL);
                TimedTask.ResourceServerExt.requestCarResource(DataType_1.DateType.ALL);
            },
            start: true,
            timeZone: 'Asia/Shanghai'
        });
    }
    static TaskHistoryResource(isStrat) {
        if (isStrat) {
            TimedTask.ResourceServerExt.requestAllResource(DataType_1.DateType.Year);
            TimedTask.ResourceServerExt.requestAllResource(DataType_1.DateType.Month);
            TimedTask.ResourceServerExt.requestAllResource(DataType_1.DateType.Day);
            TimedTask.ResourceServerExt.requestAllResource(DataType_1.DateType.Week);
            TimedTask.ResourceServerExt.requestFaceResource(DataType_1.DateType.Year);
            TimedTask.ResourceServerExt.requestFaceResource(DataType_1.DateType.Month);
            TimedTask.ResourceServerExt.requestFaceResource(DataType_1.DateType.Day);
            TimedTask.ResourceServerExt.requestFaceResource(DataType_1.DateType.Week);
            TimedTask.ResourceServerExt.requestWifiResource(DataType_1.DateType.Year);
            TimedTask.ResourceServerExt.requestWifiResource(DataType_1.DateType.Month);
            TimedTask.ResourceServerExt.requestWifiResource(DataType_1.DateType.Day);
            TimedTask.ResourceServerExt.requestWifiResource(DataType_1.DateType.Week);
            TimedTask.ResourceServerExt.requestEfenceResource(DataType_1.DateType.Year);
            TimedTask.ResourceServerExt.requestEfenceResource(DataType_1.DateType.Month);
            TimedTask.ResourceServerExt.requestEfenceResource(DataType_1.DateType.Day);
            TimedTask.ResourceServerExt.requestEfenceResource(DataType_1.DateType.Week);
            TimedTask.ResourceServerExt.requestCarResource(DataType_1.DateType.Year);
            TimedTask.ResourceServerExt.requestCarResource(DataType_1.DateType.Month);
            TimedTask.ResourceServerExt.requestCarResource(DataType_1.DateType.Day);
            TimedTask.ResourceServerExt.requestCarResource(DataType_1.DateType.Week);
        }
        new cronJob({
            cronTime: TIME_INTERVAL_HIS,
            onTick: () => {
                TimedTask.ResourceServerExt.requestAllResource(DataType_1.DateType.Year);
                TimedTask.ResourceServerExt.requestAllResource(DataType_1.DateType.Month);
                TimedTask.ResourceServerExt.requestAllResource(DataType_1.DateType.Day);
                TimedTask.ResourceServerExt.requestAllResource(DataType_1.DateType.Week);
                TimedTask.ResourceServerExt.requestFaceResource(DataType_1.DateType.Year);
                TimedTask.ResourceServerExt.requestFaceResource(DataType_1.DateType.Month);
                TimedTask.ResourceServerExt.requestFaceResource(DataType_1.DateType.Day);
                TimedTask.ResourceServerExt.requestFaceResource(DataType_1.DateType.Week);
                TimedTask.ResourceServerExt.requestWifiResource(DataType_1.DateType.Year);
                TimedTask.ResourceServerExt.requestWifiResource(DataType_1.DateType.Month);
                TimedTask.ResourceServerExt.requestWifiResource(DataType_1.DateType.Day);
                TimedTask.ResourceServerExt.requestWifiResource(DataType_1.DateType.Week);
                TimedTask.ResourceServerExt.requestEfenceResource(DataType_1.DateType.Year);
                TimedTask.ResourceServerExt.requestEfenceResource(DataType_1.DateType.Month);
                TimedTask.ResourceServerExt.requestEfenceResource(DataType_1.DateType.Day);
                TimedTask.ResourceServerExt.requestEfenceResource(DataType_1.DateType.Week);
                TimedTask.ResourceServerExt.requestCarResource(DataType_1.DateType.Year);
                TimedTask.ResourceServerExt.requestCarResource(DataType_1.DateType.Month);
                TimedTask.ResourceServerExt.requestCarResource(DataType_1.DateType.Day);
                TimedTask.ResourceServerExt.requestCarResource(DataType_1.DateType.Week);
            },
            start: true,
            timeZone: 'Asia/Shanghai'
        });
    }
}
TimedTask.ResourceServerExt = new Resource_1.ResourceServerExt();
exports.TimedTask = TimedTask;
