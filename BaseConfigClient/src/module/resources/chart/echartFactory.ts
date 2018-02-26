/// <amd-dependency path="text!./enlarge.html" name="enlargeHtml" />

import './enlarge.controller';
import '../../common/services/resource.service';
import { app } from "../../common/app/main.app";
import { IResourceService, searchChartParams } from '../../common/services/resource.service';
import * as ChartOptions from "../../common/enum/EchartConfig";
import { DateType } from "../../../core/server/enum/DataType";
import * as echarts from "echarts";
import * as _ from "lodash";
import "moment";
import { ResourcePageType } from '../../../core/entity/Resource';

declare let $: any, moment: any, angular: any, enlargeHtml: any;

export class dataSelectResult {
    start: string;
    end: string;
    type: string;
    timeStamp: string;
}

export interface IEchartFactory {
    init: (config: ChartOptions.setEnlargeData) => void;
    initChart: (config: ChartOptions.setEnlargeData) => void;
    // changeTheUnit: (data: Array<any>) => Array<any>;
    getUnitNum: (data: Array<any>) => Array<any>;
    getInitRequire: (type: string) => any;
    currentDataType: string;
    currentDeviceType: string;
    sliceArray: (data: Array<any>) => Array<any>;
    FaceSocketID: string;
    CarSocketID: string;
    enlarge: ($scope: any, name: string, data: any) => void;
    clearEchartDom: (name: string) => void;
}

class EchartFactory implements IEchartFactory {
    static $inject = ['$timeout', 'layer', 'i18nFactory', '$q', 'resourceService'];

    charts: { [key: string]: any } = {};
    currentDataType: string = DateType.ALL;
    currentDeviceType: string = ResourcePageType.ALL.value;
    FaceSocketID: string;
    CarSocketID: string;
    currentLayerIndex: number;
    constructor(private $timeout: Function,
        private layer: any,
        private i18nFactory: any,
        private $q: any,
        private resourceService: IResourceService) {
    }

    // 请求JSON文件
    public init(config: any) {
        let dom: any = document.getElementById(config.name);
        let path: string = config.path;
        let ele = echarts.init(dom);
        ele.showLoading('default', {
            text: "图表数据正在努力加载..."
        });
        this.resourceService.getEchartConfig(path).then((data: any) => {
            ele.setOption(data);
        })
    }

    public clearEchartDom(name: string) {
        console.log(name)
        this.charts[name].clear();
    }

    // 通过typescript枚举形成配置文件
    public initChart(option: ChartOptions.setEnlargeData) {
        if (!!option && !!option.config && !_.isEmpty(echarts)) {
            let domString: string = `#${option.name} canvas`;
            let canvas: any = $(domString)[0];
            let dom: any = document.getElementById(option.name);
            if (this.charts[option.name] && canvas) {
                this.charts[option.name].clear();
                this.charts[option.name].setOption(option.config);
            } else if (dom) {
                this.charts[option.name] = echarts.init(dom);
                this.charts[option.name].setOption(option.config);
            }
        }
    }

    getInitRequire(type: string) {
        let getChartDataParams = {
            start: moment().subtract(1, 'year').format('YYYY-MM-DD 00:00:00'),
            end: moment().format('YYYY-MM-DD hh:mm:ss'),
            type: type,
            timeStamp: this.currentDataType
        } as searchChartParams;

        return this.resourceService.getChartData(getChartDataParams);
    }

    sliceArray(data: Array<any>) {
        let newArray: Array<any> = [];
        data.forEach((item: Array<number | string> | Array<Array<number | string>>, index: number) => {
            if (typeof (item) == "number" || typeof (item) == "string") {
                newArray = data.slice(-5)
            } else {
                newArray[index] = item.slice(-5)
            }
        });
        return newArray
    }
    //判断是否需要给图表添加单位
    // public changeTheUnit(data: Array<any>) {
    //     let hasUnit = this.ifNeedUnit(data);
    //     let result = [] as Array<any>;
    //     console.log(data)
    //     if (hasUnit) {
    //         return [hasUnit, data];
    //     } else {
    //         // 有单位
    //         let res = [hasUnit, this.getUnitNum(angular.copy(data))]
    //         console.log(res, "===================");
    //         return res
    //     }
    // }

    //递归判断数据为[num,num]或[[num,num],[num,num]]
    // private ifNeedUnit(data: Array<any>) {
    //     let hasUnit: boolean = false;
    //     data.forEach((everyData: any) => {
    //         if (typeof (everyData) == "number") {
    //             if (everyData / 10000 < 1 && everyData != 0) {
    //                 hasUnit = true;
    //             }
    //         } else if (typeof (everyData) == "object" && !hasUnit) {
    //             hasUnit = this.ifNeedUnit(everyData) ? this.ifNeedUnit(everyData) : false;
    //         }
    //     })
    //     return hasUnit
    // }

    //一维数组和二维数组计算单位值
    public getUnitNum(data: Array<any>) {
        for (let i: number = 0; i < data.length; i++) {
            let everyData = data[i] as any;
            switch (typeof (everyData)) {
                case "number": {
                    let result = [] as Array<number>;
                    result = data.map((item: number) => {
                        return Math.ceil(item / 10000)
                    });
                    return result;
                }
                case "object": {
                    let result = [] as Array<any>;
                    data.forEach((item: Array<number>, idx: number) => {
                        result[idx] = item.map((itm: number) => {
                            return Math.ceil(itm / 10000)
                        })
                    });
                    return result;
                }
            }
        }
    }

    // 使用缓存的配置文件实现放大效果
    public enlarge($scope: any, name: string, data: any) {
        let that = this as any;
        let scope: { enlarge: ChartOptions.setEnlargeData, $destroy: Function } = $scope.$new();
        let enlargeKey: ChartOptions.setEnlargeData = angular.copy(data);

        scope.enlarge = enlargeKey;

        if (enlargeKey) {
            let skin: string = 'enlargeEchart no-scroll';
            let area: Array<string> = ["1200px", "700px"];
            if (enlargeKey.name == "AllRankList") {
                area = ["751px", "511px"];
            }

            console.log(enlargeKey);

            this.currentLayerIndex = this.layer.open({
                type: 1,
                skin: skin,
                content: enlargeHtml,
                scope: scope,
                // title: this.i18nFactory(title),
                title: [enlargeKey.title, "background-color:#2D87F9;color:#fff"],
                area: area,
                end: function () {
                    scope.$destroy();
                }
            });
        } else {
            this.layer.msg("暂无数据")
        }
    }

}

app.service('echartFactory', EchartFactory);