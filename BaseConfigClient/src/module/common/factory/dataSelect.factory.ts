import { app } from "../app/main.app";
import 'moment'

declare let moment: any;

/**
 * 简单对国际化进行了一次包装
 */

export class dataSelectResult {
    startTime: string;
    endTime: string;
    module: string;
}

export const moduleString = {
    Day: "Day",
    Week: "Week",
    Month: "Month",
    Year: "Year",
    ALL: "ALL",
    Custom: "Custom"
};

export const DateSelectEnum = {
    ALL: {
        value: moduleString.ALL,
        text: "全部"
    },
    Day: {
        value: moduleString.Day,
        text: "近一天"
    },
    Week: {
        value: moduleString.Week,
        text: "近一周"
    },
    Month: {
        value: moduleString.Month,
        text: "近一月"
    },
    Year: {
        value: moduleString.Year,
        text: "近一年"
    },
    Custom: {
        value: moduleString.Custom,
        text: "自定义"
    }
}

export class dataSelectServer {

    // static $inject = [];

    constructor() {
    }

    getParamsTime(type: dataSelectResult): dataSelectResult {
        let endTime: string = moment().format();
        let startTime: string = moment().format();
        switch (type.module) {
            case moduleString.Day:
                startTime = moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00');
                endTime = moment().subtract(1, 'days').format('YYYY-MM-DD 23:59:59');
                break;
            case moduleString.Week:
                startTime = moment().subtract(8, 'days').format('YYYY-MM-DD 00:00:00');
                endTime = moment().subtract(1, 'days').format('YYYY-MM-DD 23:59:59');
                break;
            case moduleString.Month:
                startTime = moment().subtract(31, 'days').format('YYYY-MM-DD 00:00:00');
                endTime = moment().subtract(1, 'days').format('YYYY-MM-DD 23:59:59');
                break;
            case moduleString.Year:
                startTime = moment().subtract(12, 'months').format('YYYY-MM-DD 00:00:00');
                endTime = moment().subtract(1, 'days').format('YYYY-MM-DD 23:59:59');
                break;
            case moduleString.ALL:
                startTime = moment().subtract(12, 'months').format('YYYY-MM-DD 00:00:00');
                endTime = moment().subtract(1, 'days').format('YYYY-MM-DD 23:59:59');
                break;
            case moduleString.Custom:
                startTime = type.startTime;
                endTime = type.endTime;
            default:
                break;
        }
        return {
            module: type.module == moduleString.ALL ? moduleString.Day : type.module,
            startTime: startTime && startTime.replace('+08:00', '').replace('T', ' '),
            endTime: endTime && endTime.replace('+08:00', '').replace('T', ' ')
        }
    }

    createDayTimeLine(): Array<string> {
        let result = [] as Array<string>;
        for (let i = 1; i < 25; i++) {
            result.push(`${i}:00`)
        }
        return result;
    }

    createWeekTimeLine(): Array<string> {
        let result = [] as Array<string>;
        for (let i = 1; i < 8; i++) {
            let week = moment().subtract(i, 'days').format('DD');
            result.push(`${week}日`)
        }
        return result.reverse();
    }

    createMonthTimeLine(): Array<string> {
        let result = [] as Array<string>;
        for (let i = 1; i < 31; i++) {
            let month = moment().subtract(i, 'days').format('DD');
            result.push(`${month}日`)
        }
        return result.reverse();
    }

    createYearTimeLine(): Array<string> {
        let result = [] as Array<string>;
        for (let i = 1; i < 13; i++) {
            let month = moment().subtract(i, 'month').format('MM');
            result.push(`${month}月`)
        }
        return result.reverse();
    }
}

app.service('dataSelectServer', dataSelectServer);
