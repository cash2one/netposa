define(["require", "exports", "../../common/app/main.app", "echarts", "angular"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var echarts = require("echarts");
    var EchartService = (function () {
        function EchartService($http, $q) {
            this.$http = $http;
            this.$q = $q;
            this.$http = $http;
            this.$q = $q;
        }
        EchartService.prototype.echartPieOption = function (opts) {
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
                    show: false,
                    trigger: 'item'
                },
                legend: {
                    show: true,
                    data: opts.xAxisData,
                    top: 'middle',
                    itemWidth: 8,
                    itemHeight: 8,
                    itemGap: 15,
                    right: '10%',
                    orient: 'vertical',
                    align: 'left',
                    tooltip: {
                        show: true
                    },
                    selectedMode: 'multiple'
                },
                series: [
                    {
                        name: opts.seriesName,
                        type: 'pie',
                        startAngle: -90,
                        center: ['30%', '50%'],
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
                                formatter: function (params) {
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
                        data: opts.showData
                    }
                ],
                color: ['#8c9eff', '#40c4ff', '#f7c204', '#ff6d00', '#9f6cf7', '#95d60b', '#06d0be'],
                textStyle: {
                    fontSize: '12'
                }
            };
        };
        EchartService.prototype.echartLineOption = function (opts) {
            return {
                tooltip: {
                    trigger: 'axis',
                    formatter: "{a} : {c}",
                    axisPointer: {
                        type: 'line',
                        lineStyle: {
                            color: '#999'
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
        };
        EchartService.prototype.echartPileBarOption = function (opts) {
            return {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle: {
                            color: "transparent"
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
                                color: function (params) {
                                    var colorList = [];
                                    var i = 0;
                                    var j = 0;
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
                                color: function (params) {
                                    var colorList = [];
                                    var i = 0;
                                    var j = 0;
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
            };
        };
        EchartService.prototype.echartBarOption = function (opts) {
            return {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle: {
                            color: "transparent"
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
                            normal: {
                                color: function (params) {
                                    var colorList = [];
                                    var i = 0;
                                    var j = 0;
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
        };
        EchartService.prototype.echartLineAreaOption = function (opts) {
            return {
                tooltip: {
                    trigger: 'axis',
                    formatter: "{c}",
                    axisPointer: {
                        type: 'line',
                        lineStyle: {
                            color: '#f3f3f3'
                        }
                    }
                },
                dataZoom: [
                    {
                        id: 'dataZoomX',
                        type: 'slider',
                        fillerColor: 'rgba(184,218,250,.4)',
                        xAxisIndex: [0],
                        filterMode: 'filter',
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
                                { type: 'max', name: '最大值' },
                                { type: 'min', name: '最小值' }
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
        };
        EchartService.prototype.drawEchart = function (option, elementId) {
            var echart = echarts.init(document.getElementById(elementId));
            echart.setOption(option);
            window.addEventListener('resize', function () {
                echart.resize();
            }, false);
        };
        EchartService.$inject = ['$http', '$q'];
        return EchartService;
    }());
    main_app_1.app
        .service('echartService', EchartService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdG90YWwvdG90YWxGYWN0b3J5L2RvRWNoYXJ0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFVQSxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7SUF5QmpDO1FBSUksdUJBQW9CLEtBQVUsRUFBVSxFQUFPO1lBQTNCLFVBQUssR0FBTCxLQUFLLENBQUs7WUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFLO1lBQzNDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLENBQUM7UUFHRCx1Q0FBZSxHQUFmLFVBQWdCLElBQWE7WUFFekIsTUFBTSxDQUFDO2dCQUNILG1CQUFtQixFQUFFO29CQUNqQixJQUFJLEVBQUUsTUFBTTtvQkFDWixNQUFNLEVBQUUsUUFBUTtvQkFDaEIsWUFBWSxFQUFFO3dCQUNWLE1BQU0sRUFBRTs0QkFDSixDQUFDLEVBQUUsQ0FBQzt5QkFDUDtxQkFDSjtpQkFDSjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsSUFBSSxFQUFDLEtBQUs7b0JBQ1YsT0FBTyxFQUFFLE1BQU07aUJBQ2xCO2dCQUNELE1BQU0sRUFBRTtvQkFDSixJQUFJLEVBQUUsSUFBSTtvQkFDVixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVM7b0JBQ3BCLEdBQUcsRUFBRSxRQUFRO29CQUViLFNBQVMsRUFBRSxDQUFDO29CQUNaLFVBQVUsRUFBRSxDQUFDO29CQUViLE9BQU8sRUFBRSxFQUFFO29CQUNYLEtBQUssRUFBRSxLQUFLO29CQUNaLE1BQU0sRUFBRSxVQUFVO29CQUNsQixLQUFLLEVBQUUsTUFBTTtvQkFDYixPQUFPLEVBQUU7d0JBQ0wsSUFBSSxFQUFFLElBQUk7cUJBQ2I7b0JBRUQsWUFBWSxFQUFFLFVBQVU7aUJBQzNCO2dCQUNELE1BQU0sRUFBRTtvQkFDSjt3QkFDSSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVU7d0JBQ3JCLElB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QUssRUFBRSxTQUFTOzZCQUNuQjt5QkFDSjt3QkFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVE7cUJBQ3RCLENBQUM7Z0JBQ0YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQixTQUFTLEVBQUU7b0JBQ1AsUUFBUSxFQUFFLEVBQUU7b0JBQ1osS0FBSyxFQUFFLE1BQU07aUJBQ2hCO2FBQ0osQ0FBQztRQUNOLENBQUM7UUFHRCxrQ0FBVSxHQUFWLFVBQVcsTUFBYyxFQUFFLFNBQWlCO1lBRXhDLElBQUksTUFBTSxHQUFRLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ25FLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7WUFHekIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRTtnQkFDOUIsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3BCLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNkLENBQUM7UUE1aEJNLHFCQUFPLEdBQWtCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBNmhCcEQsb0JBQUM7S0EvaEJELEFBK2hCQyxJQUFBO0lBRUQsY0FBRztTQUNFLE9BQU8sQ0FBQyxlQUFlLEVBQUUsYUFBYSxDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL3RvdGFsL3RvdGFsRmFjdG9yeS9kb0VjaGFydHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSB0aiBvbiAyMDE3LzYvNi5cclxuICovXHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQge1BpZU9wdHMsIFBpbGVCYXJPcHRzLCBMaW5lT3B0cywgQmFyT3B0cywgTGluZUFyZWFPcHRzfSBmcm9tIFwiLi90b3RhbFJlc3BvbnNlXCJcclxuXHJcbmltcG9ydCBcImVjaGFydHNcIjtcclxuaW1wb3J0ICdhbmd1bGFyJztcclxuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55O1xyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcbmxldCBlY2hhcnRzID0gcmVxdWlyZShcImVjaGFydHNcIik7XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRWNoYXJ0U2VydmljZSB7XHJcblxyXG4gICAgLy/lnIbnjq/lm75cclxuICAgIGVjaGFydFBpZU9wdGlvbjogRnVuY3Rpb247XHJcblxyXG4gICAgLy/mn7HlvaLlm75cclxuICAgIGVjaGFydEJhck9wdGlvbjogRnVuY3Rpb247XHJcblxyXG4gICAgLy/loIblj6Dmn7HlvaLlm75cclxuICAgIGVjaGFydFBpbGVCYXJPcHRpb246IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8v5oqY57q/5Zu+XHJcbiAgICBlY2hhcnRMaW5lT3B0aW9uOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvL+aKmOe6v+mdouenr+WbvlxyXG4gICAgZWNoYXJ0TGluZUFyZWFPcHRpb246IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8v5riy5p+TZWNoYXJ0c1xyXG4gICAgZHJhd0VjaGFydDogRnVuY3Rpb247XHJcblxyXG59XHJcblxyXG5jbGFzcyBFY2hhcnRTZXJ2aWNlIGltcGxlbWVudHMgSUVjaGFydFNlcnZpY2Uge1xyXG5cclxuICAgIHN0YXRpYyAkaW5qZWN0OiBBcnJheTxzdHJpbmc+ID0gWyckaHR0cCcsICckcSddO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IGFueSwgcHJpdmF0ZSAkcTogYW55KSB7XHJcbiAgICAgICAgdGhpcy4kaHR0cCA9ICRodHRwO1xyXG4gICAgICAgIHRoaXMuJHEgPSAkcTtcclxuICAgIH1cclxuXHJcbiAgICAvKuWchueOr+WbvumFjee9riovXHJcbiAgICBlY2hhcnRQaWVPcHRpb24ob3B0czogUGllT3B0cykge1xyXG4gICAgICAgIC8vIOi/lOWbnuaMh+WumuWbvuihqOeahOmFjee9rumhueWSjOaVsOaNrlxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5vRGF0YUxvYWRpbmdPcHRpb246IHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICfmmoLml6DmlbDmja4nLFxyXG4gICAgICAgICAgICAgICAgZWZmZWN0OiAnYnViYmxlJyxcclxuICAgICAgICAgICAgICAgIGVmZmVjdE9wdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGVmZmVjdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b29sdGlwOiB7XHJcbiAgICAgICAgICAgICAgICBzaG93OmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdHJpZ2dlcjogJ2l0ZW0nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxlZ2VuZDoge1xyXG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IG9wdHMueEF4aXNEYXRhLFxyXG4gICAgICAgICAgICAgICAgdG9wOiAnbWlkZGxlJyxcclxuICAgICAgICAgICAgICAgIC8v5Zu+5L6L5a696auYXHJcbiAgICAgICAgICAgICAgICBpdGVtV2lkdGg6IDgsXHJcbiAgICAgICAgICAgICAgICBpdGVtSGVpZ2h0OiA4LFxyXG4gICAgICAgICAgICAgICAgLy/lm77kvovpl7TpmpRcclxuICAgICAgICAgICAgICAgIGl0ZW1HYXA6IDE1LFxyXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICcxMCUnLFxyXG4gICAgICAgICAgICAgICAgb3JpZW50OiAndmVydGljYWwnLFxyXG4gICAgICAgICAgICAgICAgYWxpZ246ICdsZWZ0JyxcclxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IHtcclxuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy/lm77kvovpgInmi6nnmoTmqKHlvI9cclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkTW9kZTogJ211bHRpcGxlJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXJpZXM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBvcHRzLnNlcmllc05hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3BpZScsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRBbmdsZTogLTkwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbnRlcjpbJzMwJScsJzUwJSddLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGl1czogWyc0NSUnLCAnNzAlJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgYXZvaWRMYWJlbE92ZXJsYXA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsb2Nrd2lzZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9ybWFsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnY2VudGVyJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbXBoYXNpczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogZnVuY3Rpb24gKHBhcmFtczogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5uYW1lICsgJ++8micgKyBwYXJhbXMucGVyY2VudCArICclJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0U3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzEyJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtU3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9ybWFsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogJyNmZmYnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDEwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyU3R5bGU6ICdzb2xpZCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW1waGFzaXM6IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbExpbmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9ybWFsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93OiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvL+imgeWxleekuueahOaVsOaNrlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG9wdHMuc2hvd0RhdGFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgY29sb3I6IFsnIzhjOWVmZicsICcjNDBjNGZmJywgJyNmN2MyMDQnLCAnI2ZmNmQwMCcsICcjOWY2Y2Y3JywgJyM5NWQ2MGInLCAnIzA2ZDBiZSddLFxyXG4gICAgICAgICAgICB0ZXh0U3R5bGU6IHtcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTInXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8q5pegZGF0YXpvb23nmoTmipjnur/pnaLnp6/lm77phY3nva4qL1xyXG4gICAgZWNoYXJ0TGluZU9wdGlvbihvcHRzOiBMaW5lT3B0cykge1xyXG4gICAgICAgIC8v5Zu+6KGo55qE6YWN572u6aG5XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9vbHRpcDoge1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlcjogJ2F4aXMnLFxyXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBcInthfSA6IHtjfVwiLFxyXG4gICAgICAgICAgICAgICAgYXhpc1BvaW50ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXHJcbiAgICAgICAgICAgICAgICAgICAgbGluZVN0eWxlOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6JyM5OTknXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBncmlkOiB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBvcHRzLmdyaWRMZWZ0LFxyXG4gICAgICAgICAgICAgICAgcmlnaHQ6IG9wdHMuZ3JpZFJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnNSUnLFxyXG4gICAgICAgICAgICAgICAgY29udGFpbkxhYmVsOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHhBeGlzOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBvcHRzLnhBeGlzVHlwZSxcclxuICAgICAgICAgICAgICAgIHNwbGl0TGluZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbmFtZTogb3B0cy54QXhpc05hbWUsXHJcbiAgICAgICAgICAgICAgICBuYW1lTG9jYXRpb246ICdlbmQnLFxyXG4gICAgICAgICAgICAgICAgYXhpc0xhYmVsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBheGlzTGluZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVTdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyM5OTknXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGF4aXNUaWNrOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBuYW1lVGV4dFN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjNjY2J1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IG9wdHMueEF4aXNEYXRhXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHlBeGlzOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAndmFsdWUnLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogb3B0cy55QXhpc05hbWUsXHJcbiAgICAgICAgICAgICAgICBheGlzTGluZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVTdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyM5OTknXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNwbGl0TGluZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVTdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNmM2YzZjMnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGF4aXNUaWNrOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNlcmllczogW3tcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfmgLvmtYHph48nLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxyXG4gICAgICAgICAgICAgICAgc2hvd1N5bWJvbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBob3ZlckFuaW1hdGlvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzbW9vdGg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBvcHRzLnNob3dEYXRhLFxyXG4gICAgICAgICAgICAgICAgYXJlYVN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2U0ZjhmZidcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgY29sb3I6IG9wdHMuY29sb3IsXHJcbiAgICAgICAgICAgIHRleHRTdHlsZToge1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IDEyLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6ICcjNjY2J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKuWghuWPoOafseW9ouWbvumFjee9riovXHJcbiAgICBlY2hhcnRQaWxlQmFyT3B0aW9uKG9wdHM6IFBpbGVCYXJPcHRzKSB7XHJcbiAgICAgICAgLy8g5Zu+6KGo55qE6YWN572u6aG5XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9vbHRpcDoge1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlcjogJ2F4aXMnLCAvL+iuvue9ruS4uml0ZW3ml7Yg5LiOcG9zaXRpb246J3RvcCcg5by55Ye65qGG5pi+56S65Zyo5Zu+5b2i5LiK6Z2iXHJcbiAgICAgICAgICAgICAgICBheGlzUG9pbnRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzaGFkb3cnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNoYWRvd1N0eWxlOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6XCJ0cmFuc3BhcmVudFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKmxlZ2VuZDoge1xyXG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IFtvcHRzLnNlcmllc05hbWVPbmUsb3B0cy5zZXJpZXNOYW1lVHdvXSxcclxuICAgICAgICAgICAgICAgIC8v5Zu+5L6L5a696auYXHJcbiAgICAgICAgICAgICAgICBpdGVtV2lkdGg6IDgsXHJcbiAgICAgICAgICAgICAgICBpdGVtSGVpZ2h0OiA4LFxyXG4gICAgICAgICAgICAgICAgLy/lm77kvovpl7TpmpRcclxuICAgICAgICAgICAgICAgIGl0ZW1HYXA6IDE1LFxyXG4gICAgICAgICAgICAgICAgdG9wOjAsXHJcbiAgICAgICAgICAgICAgICByaWdodDogJzUlJyxcclxuICAgICAgICAgICAgICAgIG9yaWVudDogJ2hvcml6b250YWwnLFxyXG4gICAgICAgICAgICAgICAgYWxpZ246ICdsZWZ0JyxcclxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IHtcclxuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy/lm77kvovpgInmi6nnmoTmqKHlvI9cclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkTW9kZTogJ211bHRpcGxlJ1xyXG4gICAgICAgICAgICB9LCovXHJcbiAgICAgICAgICAgIGdyaWQ6IHtcclxuICAgICAgICAgICAgICAgIGxlZnQ6IG9wdHMuZ3JpZExlZnQsXHJcbiAgICAgICAgICAgICAgICByaWdodDogb3B0cy5ncmlkUmlnaHQsXHJcbiAgICAgICAgICAgICAgICBib3R0b206ICc1JScsXHJcbiAgICAgICAgICAgICAgICBjb250YWluTGFiZWw6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgeEF4aXM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnY2F0ZWdvcnknLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG9wdHMueEF4aXNOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWVMb2NhdGlvbjogJ2VuZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgYXhpc0xpbmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZVN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyM5OTknXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNwbGl0TGluZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lU3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2YzZjNmMydcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYXhpc1RpY2s6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWVUZXh0U3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjNjY2J1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogb3B0cy54QXhpc0RhdGFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgeUF4aXM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAndmFsdWUnLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG9wdHMueUF4aXNOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXhpc0xpbmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZVN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyM5OTknXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNwbGl0TGluZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lU3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2YzZjNmMydcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYXhpc1RpY2s6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWVUZXh0U3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjNjY2J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgc2VyaWVzOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogb3B0cy5zZXJpZXNOYW1lT25lLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdiYXInLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhcldpZHRoOiAnMjUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrOiAn5aCG5Y+g5Zu+JyxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtU3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9ybWFsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogZnVuY3Rpb24gKHBhcmFtczogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbG9yTGlzdDogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpOiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBqOiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChqIDwgb3B0cy54QXhpc0RhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGorKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JMaXN0LnB1c2gob3B0cy5jb2xvck9uZVtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID4gb3B0cy5jb2xvck9uZS5sZW5ndGggLSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29sb3JMaXN0W3BhcmFtcy5kYXRhSW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbXBoYXNpczoge31cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG9wdHMuYWxsTnVtXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG9wdHMuc2VyaWVzTmFtZVR3byxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYmFyJyxcclxuICAgICAgICAgICAgICAgICAgICBiYXJXaWR0aDogJzI1JyxcclxuICAgICAgICAgICAgICAgICAgICBzdGFjazogJ+WghuWPoOWbvicsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vcm1hbDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IGZ1bmN0aW9uIChwYXJhbXM6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb2xvckxpc3Q6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaTogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgajogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaiA8IG9wdHMueEF4aXNEYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yTGlzdC5wdXNoKG9wdHMuY29sb3JUd29baV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IG9wdHMuY29sb3JUd28ubGVuZ3RoIC0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbG9yTGlzdFtwYXJhbXMuZGF0YUluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW1waGFzaXM6IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBvcHRzLm9ubGluZU51bVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB0ZXh0U3R5bGU6IHtcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAxMixcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnIzY2NidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKuafseW9ouWbvumFjee9riovXHJcbiAgICBlY2hhcnRCYXJPcHRpb24ob3B0czogQmFyT3B0cykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvb2x0aXA6IHtcclxuICAgICAgICAgICAgICAgIHRyaWdnZXI6ICdheGlzJyxcclxuICAgICAgICAgICAgICAgIGF4aXNQb2ludGVyOiB7ICAgICAgICAgICAgLy8g5Z2Q5qCH6L205oyH56S65Zmo77yM5Z2Q5qCH6L206Kem5Y+R5pyJ5pWIXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3NoYWRvdycsICAgICAgICAvLyDpu5jorqTkuLrnm7Tnur/vvIzlj6/pgInkuLrvvJonbGluZScgfCAnc2hhZG93J1xyXG4gICAgICAgICAgICAgICAgICAgIHNoYWRvd1N0eWxlOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6XCJ0cmFuc3BhcmVudFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBncmlkOiB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBvcHRzLmdyaWRMZWZ0LFxyXG4gICAgICAgICAgICAgICAgcmlnaHQ6IG9wdHMuZ3JpZFJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnNSUnLFxyXG4gICAgICAgICAgICAgICAgY29udGFpbkxhYmVsOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHhBeGlzOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2NhdGVnb3J5JyxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBvcHRzLnhBeGlzTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lTG9jYXRpb246ICdlbmQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kYXJ5R2FwOiBbJzUlJywgJzUlJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgYXhpc0xpbmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZVN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyM5OTknXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNwbGl0TGluZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lU3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2YzZjNmMydcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYXhpc1RpY2s6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWVUZXh0U3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjNjY2J1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogb3B0cy54QXhpc0RhdGFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgeUF4aXM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAndmFsdWUnLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG9wdHMueUF4aXNOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXhpc0xpbmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZVN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyM5OTknXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNwbGl0TGluZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lU3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2YzZjNmMydcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYXhpc1RpY2s6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWVUZXh0U3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjNjY2J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgc2VyaWVzOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogb3B0cy5zZXJpZXNOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdiYXInLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhcldpZHRoOiAyNSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtU3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/pgJrluLjmg4XlhrXkuIvvvJpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9ybWFsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+avj+S4quafseWtkOeahOminOiJsuWNs+S4umNvbG9yTGlzdOaVsOe7hOmHjOeahOavj+S4gOmhue+8jOWmguaenOafseWtkOaVsOebruWkmuS6jmNvbG9yTGlzdOeahOmVv+W6pu+8jOWImeafseWtkOminOiJsuW+queOr+S9v+eUqOivpeaVsOe7hFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IGZ1bmN0aW9uIChwYXJhbXM6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb2xvckxpc3Q6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaTogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgajogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaiA8IG9wdHMueEF4aXNEYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yTGlzdC5wdXNoKG9wdHMuY29sb3JbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IG9wdHMuY29sb3IubGVuZ3RoIC0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbG9yTGlzdFtwYXJhbXMuZGF0YUluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IG9wdHMubGFiZWxTaG93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAndG9wJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6ICd7Y30nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtcGhhc2lzOiB7fVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogb3B0cy5zaG93RGF0YVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB0ZXh0U3R5bGU6IHtcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAxMixcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnIzY2NidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyrmipjnur/pnaLnp6/lm77phY3nva4qL1xyXG4gICAgZWNoYXJ0TGluZUFyZWFPcHRpb24ob3B0czogTGluZUFyZWFPcHRzKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9vbHRpcDoge1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlcjogJ2F4aXMnLFxyXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBcIntjfVwiLFxyXG4gICAgICAgICAgICAgICAgYXhpc1BvaW50ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXHJcbiAgICAgICAgICAgICAgICAgICAgbGluZVN0eWxlOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6JyNmM2YzZjMnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhWm9vbTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnZGF0YVpvb21YJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc2xpZGVyJyxcclxuICAgICAgICAgICAgICAgICAgICBmaWxsZXJDb2xvcjogJ3JnYmEoMTg0LDIxOCwyNTAsLjQpJyxcclxuICAgICAgICAgICAgICAgICAgICB4QXhpc0luZGV4OiBbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyTW9kZTogJ2ZpbHRlcicsIC8vIOiuvuWumuS4uiAnZmlsdGVyJyDku47ogIwgWCDnmoTnqpflj6Plj5jljJbkvJrlvbHlk40gWSDnmoTojIPlm7TjgIJcclxuICAgICAgICAgICAgICAgICAgICBzdGFydDogODAsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kOiAxMDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgZ3JpZDoge1xyXG4gICAgICAgICAgICAgICAgbGVmdDogJzUlJyxcclxuICAgICAgICAgICAgICAgIHJpZ2h0OiAnNSUnLFxyXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnMTIlJyxcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5MYWJlbDogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB4QXhpczoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2NhdGVnb3J5JyxcclxuICAgICAgICAgICAgICAgIHNwbGl0TGluZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbmFtZUxvY2F0aW9uOiAnZW5kJyxcclxuICAgICAgICAgICAgICAgIGF4aXNMaW5lOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZVN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzk5OSdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYXhpc1RpY2s6IHtcclxuICAgICAgICAgICAgICAgICAgICBzaG93OiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG5hbWVUZXh0U3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyM2NjYnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogb3B0cy54QXhpc0RhdGFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgeUF4aXM6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICd2YWx1ZScsXHJcbiAgICAgICAgICAgICAgICBzaG93OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGF4aXNMaW5lOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZVN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzk5OSdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3BsaXRMaW5lOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZVN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2YzZjNmMydcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYXhpc1RpY2s6IHtcclxuICAgICAgICAgICAgICAgICAgICBzaG93OiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXJpZXM6IFt7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAn5YWo6YOoJyxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdsaW5lJyxcclxuICAgICAgICAgICAgICAgIHNob3dTeW1ib2w6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaG92ZXJBbmltYXRpb246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc21vb3RoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbWFya1BvaW50OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dHlwZTogJ21heCcsIG5hbWU6ICfmnIDlpKflgLwnfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge3R5cGU6ICdtaW4nLCBuYW1lOiAn5pyA5bCP5YC8J31cclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1TdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub3JtYWw6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAncmdiYSgwLDAsMCwuMiknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbXBoYXNpczoge31cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vcm1hbDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dFN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjZmZmJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbXBoYXNpczoge31cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYXJlYVN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2U0ZjhmZidcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogb3B0cy5zaG93RGF0YVxyXG4gICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgY29sb3I6IG9wdHMuY29sb3IsXHJcbiAgICAgICAgICAgIHRleHRTdHlsZToge1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IDEyLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6ICcjNjY2J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKmVjaGFydOa4suafkyovXHJcbiAgICBkcmF3RWNoYXJ0KG9wdGlvbjogb2JqZWN0LCBlbGVtZW50SWQ6IHN0cmluZykge1xyXG4gICAgICAgIC8v5Yib5bu65LiA5Liq5a6e5L6LXHJcbiAgICAgICAgbGV0IGVjaGFydDogYW55ID0gZWNoYXJ0cy5pbml0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCkpO1xyXG4gICAgICAgIGVjaGFydC5zZXRPcHRpb24ob3B0aW9uKTtcclxuXHJcbiAgICAgICAgLy8g5L2/55So5Yia5oyH5a6a55qE6YWN572u6aG55ZKM5pWw5o2u5pi+56S65Zu+6KGoXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZWNoYXJ0LnJlc2l6ZSgpO1xyXG4gICAgICAgIH0sIGZhbHNlKTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwXHJcbiAgICAuc2VydmljZSgnZWNoYXJ0U2VydmljZScsIEVjaGFydFNlcnZpY2UpOyJdfQ==
