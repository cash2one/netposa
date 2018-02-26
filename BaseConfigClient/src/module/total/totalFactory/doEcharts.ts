/**
 * Created by tj on 2017/6/6.
 */
import {app} from "../../common/app/main.app";
import {PieOpts, PileBarOpts, LineOpts, BarOpts, LineAreaOpts} from "./totalResponse"

import "echarts";
import 'angular';
declare let require: any;
declare let angular: any;
let echarts = require("echarts");


export interface IEchartService {

    //圆环图
    echartPieOption: Function;

    //柱形图
    echartBarOption: Function;

    //堆叠柱形图
    echartPileBarOption: Function;

    //折线图
    echartLineOption: Function;

    //折线面积图
    echartLineAreaOption: Function;

    //渲染echarts
    drawEchart: Function;

}

class EchartService implements IEchartService {

    static $inject: Array<string> = ['$http', '$q'];

    constructor(private $http: any, private $q: any) {
        this.$http = $http;
        this.$q = $q;
    }

    /*圆环图配置*/
    echartPieOption(opts: PieOpts) {
        // 返回指定图表的配置项和数据
        return {
            noDataLoadingOption: {
                text: '暂无数据',
                effect: 'bubble',
                effectOption: {
                    effect: {
                        n: 0
                    }
                }
            },
            tooltip: {
                show:false,
                trigger: 'item'
            },
            legend: {
                show: true,
                data: opts.xAxisData,
                top: 'middle',
                //图例宽高
                itemWidth: 8,
                itemHeight: 8,
                //图例间隔
                itemGap: 15,
                right: '10%',
                orient: 'vertical',
                align: 'left',
                tooltip: {
                    show: true
                },
                //图例选择的模式
                selectedMode: 'multiple'
            },
            series: [
                {
                    name: opts.seriesName,
                    type: 'pie',
                    startAngle: -90,
                    center:['30%','50%'],
                    radius: ['45%', '70%'],
                    avoidLabelOverlap: false,
                    clockwise: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            formatter: function (params: any) {
                                return params.name + '：' + params.percent + '%';
                            },
                            textStyle: {
                                fontSize: '12'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#fff',
                            borderWidth: 10,
                            borderStyle: 'solid'
                        },
                        emphasis: {}
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    //要展示的数据
                    data: opts.showData
                }
            ],
            color: ['#8c9eff', '#40c4ff', '#f7c204', '#ff6d00', '#9f6cf7', '#95d60b', '#06d0be'],
            textStyle: {
                fontSize: '12'
            }
        };
    }

    /*无datazoom的折线面积图配置*/
    echartLineOption(opts: LineOpts) {
        //图表的配置项
        return {
            tooltip: {
                trigger: 'axis',
                formatter: "{a} : {c}",
                axisPointer: {
                    type: 'line',
                    lineStyle:{
                        color:'#999'
                    }
                }
            },
            grid: {
                left: opts.gridLeft,
                right: opts.gridRight,
                bottom: '5%',
                containLabel: true
            },
            xAxis: {
                type: opts.xAxisType,
                splitLine: {
                    show: false
                },
                name: opts.xAxisName,
                nameLocation: 'end',
                axisLabel: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#999'
                    }
                },
                axisTick: {
                    show: false
                },
                nameTextStyle: {
                    color: '#666'
                },
                data: opts.xAxisData
            },
            yAxis: {
                type: 'value',
                name: opts.yAxisName,
                axisLine: {
                    lineStyle: {
                        color: '#999'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#f3f3f3'
                    }
                },
                axisTick: {
                    show: false
                },
            },
            series: [{
                name: '总流量',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                smooth: true,
                data: opts.showData,
                areaStyle: {
                    normal: {
                        color: '#e4f8ff'
                    }
                },
            }],
            color: opts.color,
            textStyle: {
                fontSize: 12,
                color: '#666'
            }
        };
    }

    /*堆叠柱形图配置*/
    echartPileBarOption(opts: PileBarOpts) {
        // 图表的配置项
        return {
            tooltip: {
                trigger: 'axis', //设置为item时 与position:'top' 弹出框显示在图形上面
                axisPointer: {
                    type: 'shadow',
                    shadowStyle:{
                        color:"transparent"
                    }
                }
            },
            /*legend: {
                show: true,
                data: [opts.seriesNameOne,opts.seriesNameTwo],
                //图例宽高
                itemWidth: 8,
                itemHeight: 8,
                //图例间隔
                itemGap: 15,
                top:0,
                right: '5%',
                orient: 'horizontal',
                align: 'left',
                tooltip: {
                    show: true
                },
                //图例选择的模式
                selectedMode: 'multiple'
            },*/
            grid: {
                left: opts.gridLeft,
                right: opts.gridRight,
                bottom: '5%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    name: opts.xAxisName,
                    nameLocation: 'end',
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#f3f3f3'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    nameTextStyle: {
                        color: '#666'
                    },
                    data: opts.xAxisData
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: opts.yAxisName,
                    show: true,
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#f3f3f3'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    nameTextStyle: {
                        color: '#666'
                    }
                }
            ],
            series: [
                {
                    name: opts.seriesNameOne,
                    type: 'bar',
                    barWidth: '25',
                    stack: '堆叠图',
                    itemStyle: {
                        normal: {
                            color: function (params: any) {
                                let colorList: Array<string> = [];
                                let i: number = 0;
                                let j: number = 0;
                                while (j < opts.xAxisData.length) {
                                    j++;
                                    colorList.push(opts.colorOne[i]);
                                    if (i > opts.colorOne.length - 2) {
                                        i = -1;
                                    }
                                    i++;
                                }
                                return colorList[params.dataIndex];
                            }
                        },
                        emphasis: {}
                    },
                    data: opts.allNum
                },
                {
                    name: opts.seriesNameTwo,
                    type: 'bar',
                    barWidth: '25',
                    stack: '堆叠图',
                    itemStyle: {
                        normal: {
                            color: function (params: any) {
                                let colorList: Array<string> = [];
                                let i: number = 0;
                                let j: number = 0;
                                while (j < opts.xAxisData.length) {
                                    j++;
                                    colorList.push(opts.colorTwo[i]);
                                    if (i > opts.colorTwo.length - 2) {
                                        i = -1;
                                    }
                                    i++;
                                }
                                return colorList[params.dataIndex];
                            }
                        },
                        emphasis: {}
                    },
                    data: opts.onlineNum
                }
            ],
            textStyle: {
                fontSize: 12,
                color: '#666'
            }
        }
    }

    /*柱形图配置*/
    echartBarOption(opts: BarOpts) {
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
                    shadowStyle:{
                        color:"transparent"
                    }
                }
            },
            grid: {
                left: opts.gridLeft,
                right: opts.gridRight,
                bottom: '5%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    name: opts.xAxisName,
                    nameLocation: 'end',
                    boundaryGap: ['5%', '5%'],
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#f3f3f3'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    nameTextStyle: {
                        color: '#666'
                    },
                    data: opts.xAxisData
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: opts.yAxisName,
                    show: true,
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#f3f3f3'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    nameTextStyle: {
                        color: '#666'
                    }
                }
            ],
            series: [
                {
                    name: opts.seriesName,
                    type: 'bar',
                    barWidth: 25,
                    itemStyle: {
                        //通常情况下：
                        normal: {
                            //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                            color: function (params: any) {
                                let colorList: Array<string> = [];
                                let i: number = 0;
                                let j: number = 0;
                                while (j < opts.xAxisData.length) {
                                    j++;
                                    colorList.push(opts.color[i]);
                                    if (i > opts.color.length - 2) {
                                        i = -1;
                                    }
                                    i++;
                                }
                                return colorList[params.dataIndex];
                            },
                            label: {
                                show: opts.labelShow,
                                position: 'top',
                                formatter: '{c}'
                            }
                        },
                        emphasis: {}
                    },
                    data: opts.showData
                }
            ],
            textStyle: {
                fontSize: 12,
                color: '#666'
            }
        };
    }

    /*折线面积图配置*/
    echartLineAreaOption(opts: LineAreaOpts) {
        return {
            tooltip: {
                trigger: 'axis',
                formatter: "{c}",
                axisPointer: {
                    type: 'line',
                    lineStyle:{
                        color:'#f3f3f3'
                    }
                }
            },
            dataZoom: [
                {
                    id: 'dataZoomX',
                    type: 'slider',
                    fillerColor: 'rgba(184,218,250,.4)',
                    xAxisIndex: [0],
                    filterMode: 'filter', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
                    start: 80,
                    end: 100
                }
            ],
            grid: {
                left: '5%',
                right: '5%',
                bottom: '12%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                splitLine: {
                    show: false
                },
                nameLocation: 'end',
                axisLine: {
                    lineStyle: {
                        color: '#999'
                    }
                },
                axisTick: {
                    show: false
                },
                nameTextStyle: {
                    color: '#666'
                },
                data: opts.xAxisData
            },
            yAxis: {
                type: 'value',
                show: false,
                axisLine: {
                    lineStyle: {
                        color: '#999'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#f3f3f3'
                    }
                },
                axisTick: {
                    show: false
                }
            },
            series: [{
                name: '全部',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                smooth: true,
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ],
                    itemStyle: {
                        normal: {
                            color: 'rgba(0,0,0,.2)',
                        },
                        emphasis: {}
                    },
                    label: {
                        normal: {
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        emphasis: {}
                    }
                },
                areaStyle: {
                    normal: {
                        color: '#e4f8ff'
                    }
                },
                data: opts.showData
            }],
            color: opts.color,
            textStyle: {
                fontSize: 12,
                color: '#666'
            }
        };
    }

    /*echart渲染*/
    drawEchart(option: object, elementId: string) {
        //创建一个实例
        let echart: any = echarts.init(document.getElementById(elementId));
        echart.setOption(option);

        // 使用刚指定的配置项和数据显示图表
        window.addEventListener('resize', function () {
            echart.resize();
        }, false);
    }
}

app
    .service('echartService', EchartService);