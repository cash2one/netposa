import { IResourceServerExt, ResourceServerExt } from "./Resource";
import { DateType } from "../core/server/enum/DataType";
import Config from "../Config";

let cronJob = require("cron").CronJob;
const TIME_INTERVAL_NOW = Config.IS_DEV ? '0 0 */1 * * *' : '0 */1 * * * *';
const TIME_INTERVAL_HIS = '0 0 */23 * * *';

export class TimedTask {
    static ResourceServerExt: IResourceServerExt = new ResourceServerExt();

    static TaskNowResource(isStrat?: boolean) {
        if (isStrat) {
            TimedTask.ResourceServerExt.requestAllResource(DateType.ALL);
            TimedTask.ResourceServerExt.requestFaceResource(DateType.ALL);
            TimedTask.ResourceServerExt.requestWifiResource(DateType.ALL);
            TimedTask.ResourceServerExt.requestEfenceResource(DateType.ALL);
            TimedTask.ResourceServerExt.requestCarResource(DateType.ALL);
        }
        new cronJob({
            cronTime: TIME_INTERVAL_NOW,
            onTick: () => {
                TimedTask.ResourceServerExt.requestAllResource(DateType.ALL);
                TimedTask.ResourceServerExt.requestFaceResource(DateType.ALL);
                TimedTask.ResourceServerExt.requestWifiResource(DateType.ALL);
                TimedTask.ResourceServerExt.requestEfenceResource(DateType.ALL);
                TimedTask.ResourceServerExt.requestCarResource(DateType.ALL);
            },
            start: true,
            timeZone: 'Asia/Shanghai'
        })
    }

    static TaskHistoryResource(isStrat?: boolean) {
        if (isStrat) {
            TimedTask.ResourceServerExt.requestAllResource(DateType.Year);
            TimedTask.ResourceServerExt.requestAllResource(DateType.Month);
            TimedTask.ResourceServerExt.requestAllResource(DateType.Day);
            TimedTask.ResourceServerExt.requestAllResource(DateType.Week);


            TimedTask.ResourceServerExt.requestFaceResource(DateType.Year);
            TimedTask.ResourceServerExt.requestFaceResource(DateType.Month);
            TimedTask.ResourceServerExt.requestFaceResource(DateType.Day);
            TimedTask.ResourceServerExt.requestFaceResource(DateType.Week);


            TimedTask.ResourceServerExt.requestWifiResource(DateType.Year);
            TimedTask.ResourceServerExt.requestWifiResource(DateType.Month);
            TimedTask.ResourceServerExt.requestWifiResource(DateType.Day);
            TimedTask.ResourceServerExt.requestWifiResource(DateType.Week);


            TimedTask.ResourceServerExt.requestEfenceResource(DateType.Year);
            TimedTask.ResourceServerExt.requestEfenceResource(DateType.Month);
            TimedTask.ResourceServerExt.requestEfenceResource(DateType.Day);
            TimedTask.ResourceServerExt.requestEfenceResource(DateType.Week);

            TimedTask.ResourceServerExt.requestCarResource(DateType.Year);
            TimedTask.ResourceServerExt.requestCarResource(DateType.Month);
            TimedTask.ResourceServerExt.requestCarResource(DateType.Day);
            TimedTask.ResourceServerExt.requestCarResource(DateType.Week);
        }
        new cronJob({
            cronTime: TIME_INTERVAL_HIS,
            onTick: () => {
                TimedTask.ResourceServerExt.requestAllResource(DateType.Year);
                TimedTask.ResourceServerExt.requestAllResource(DateType.Month);
                TimedTask.ResourceServerExt.requestAllResource(DateType.Day);
                TimedTask.ResourceServerExt.requestAllResource(DateType.Week);


                TimedTask.ResourceServerExt.requestFaceResource(DateType.Year);
                TimedTask.ResourceServerExt.requestFaceResource(DateType.Month);
                TimedTask.ResourceServerExt.requestFaceResource(DateType.Day);
                TimedTask.ResourceServerExt.requestFaceResource(DateType.Week);


                TimedTask.ResourceServerExt.requestWifiResource(DateType.Year);
                TimedTask.ResourceServerExt.requestWifiResource(DateType.Month);
                TimedTask.ResourceServerExt.requestWifiResource(DateType.Day);
                TimedTask.ResourceServerExt.requestWifiResource(DateType.Week);


                TimedTask.ResourceServerExt.requestEfenceResource(DateType.Year);
                TimedTask.ResourceServerExt.requestEfenceResource(DateType.Month);
                TimedTask.ResourceServerExt.requestEfenceResource(DateType.Day);
                TimedTask.ResourceServerExt.requestEfenceResource(DateType.Week);

                TimedTask.ResourceServerExt.requestCarResource(DateType.Year);
                TimedTask.ResourceServerExt.requestCarResource(DateType.Month);
                TimedTask.ResourceServerExt.requestCarResource(DateType.Day);
                TimedTask.ResourceServerExt.requestCarResource(DateType.Week);
            },
            start: true,
            timeZone: 'Asia/Shanghai'
        })
    }


}