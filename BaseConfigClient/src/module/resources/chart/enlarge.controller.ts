import { app } from "../../common/app/main.app";
import * as echarts from "echarts"
import * as ChartOptions from "../../common/enum/EchartConfig";
declare let angular: any, enlargeHtml: any;

class EnlargeController {
    static $inject = ['$scope', '$timeout', 'i18nFactory'];

    RankTable: Array<any>;
    rankClassName: Array<string> = ["i-rank-first", "i-rank-second", "i-rank-third"];
    isAllRankList: boolean = false;

    constructor(
        private $scope: any,
        private $timeout: Function,
        private i18nFactory: any
    ) {

        let enlargeKey = $scope.enlarge;

        if (enlargeKey && enlargeKey.name == "AllRankList") {
            this.isAllRankList = true;
            enlargeKey.config = angular.copy(enlargeKey.config).slice(0, 10);
            this.RankTable = enlargeKey;
        } else {
            this.init(enlargeKey);
        }

    }

    private init(setEnlargeData: ChartOptions.setEnlargeData) {
        this.$timeout(() => {
            let dom: any = document.getElementById('enlargeEchart');
            let ele = echarts.init(dom);
            let series: any = setEnlargeData.config.series;

            // 删除字体斜着
            let rotate: any = setEnlargeData.config.xAxis;
            if (rotate && rotate.axisLabel && rotate.axisLabel.interval) {
                delete rotate.axisLabel.interval;
                delete rotate.axisLabel.rotate;
            }
            if (series && series.length) {
                let seriesData = [] as Array<any>;
                for (let i = 0; i < series.length; i++) {
                    try {
                        if (series[i] && series[i].type && series[i].type == "bar") {
                            series[i].barWidth = 30;
                        }
                        seriesData.push(series[i]);
                    } catch (err) {
                        console.error(err)
                    }

                }
                setEnlargeData.config.series = seriesData;
            }

            let EChartOptionConfig: any = setEnlargeData.config;
            ele.setOption(EChartOptionConfig);
        })
    }


}

app.controller('EnlargeController', EnlargeController);