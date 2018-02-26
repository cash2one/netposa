import {app} from "../../app/main.app";

let laydate = require('laydate');
declare let angular: any, require: any;

/**
 * @type {{type: string}} 默认值：date
 * year    年选择器    只提供年列表选择
 * month    年月选择器    只提供年、月选择
 * date    日期选择器    可选择：年、月、日。type默认值，一般可不填
 * time    时间选择器    只提供时、分、秒选择
 * datetime    日期时间选择器    可选择：年、月、日、时、分、秒
 *
 * @range{{range: string | boolean}} 默认值：false
 * 如果设置 true，将默认采用 “ - ” 分割。 你也可以直接设置 分割字符。五种选择器类型均支持左右面板的范围选择。
 *
 * @format{{format: string}}默认值：yyyy-MM-dd
 * yyyy    年份，至少四位数。如果不足四位，则前面补零
 * y    年份，不限制位数，即不管年份多少位，前面均不补零
 * MM    月份，至少两位数。如果不足两位，则前面补零。
 * M    月份，允许一位数。
 * dd    日期，至少两位数。如果不足两位，则前面补零。
 * d    日期，允许一位数。
 * HH    小时，至少两位数。如果不足两位，则前面补零。
 * H    小时，允许一位数。
 * mm    分钟，至少两位数。如果不足两位，则前面补零。
 * m    分钟，允许一位数。
 * ss    秒数，至少两位数。如果不足两位，则前面补零。
 * s    秒数，允许一位数。
 *
 * @min
 * @max
 * 默认值：min: '1900-1-1'、max: '2099-12-31'
 *
 * @trigger
 * 类型：String，默认值：focus，如果绑定的元素非输入框，则默认事件为：click
 *
 * @show
 * 类型：Boolean，默认值：false
 * 如果设置: true，则控件默认显示在绑定元素的区域。通常用于外部事件调用控件，如：
 *
 * @position
 * 类型：String，默认值：absolute
 * abolute    绝对定位，始终吸附在绑定元素周围。默认值
 * fixed    固定定位，初始吸附在绑定元素周围，不随浏览器滚动条所左右。一般用于在固定定位的弹层中使用。
 * static    静态定位，控件将直接嵌套在指定容器中。
 * 注意：请勿与 show 参数的概念搞混淆。show为 true 时，控件仍然是采用绝对或固定定位。而这里是直接嵌套显示
 *
 * @zIndex
 * 类型：Number，默认值：66666666
 * 一般用于解决与其它元素的互相被遮掩的问题。如果 position 参数设为 static 时，该参数无效。
 *
 * @showBottom - 是否显示底部栏
 * 类型：Boolean，默认值：true
 * 如果设置 false，将不会显示控件的底部栏区域
 *
 * @btns - 工具按钮
 * 类型：Array，默认值：['clear', 'now', 'confirm']
 * 右下角显示的按钮，会按照数组顺序排列，内置可识别的值有：clear、now、confirm
 *
 * @lang - 语言
 * 类型：String，默认值：cn
 * cn（中文版）、en（国际版，即英文版）。这里并没有开放自定义文字，是为了避免繁琐的配置。
 *
 * @calendar
 * 类型：Boolean，默认值：false
 * 我们内置了一些我国通用的公历重要节日，通过设置 true 来开启。国际版不会显示。
 *
 * @mark - 标注重要日子
 * 类型：Object，默认值：无
 *
 * @ready function
 * 控件在打开时触发，回调返回一个参数：初始的日期时间对象
 *
 * @change function
 * 年月日时间被切换时都会触发。回调返回三个参数，分别代表：生成的值、日期时间对象、结束的日期时间对象
 *
 * @done function 控件选择完毕后的回调
 * 点击日期、清空、现在、确定均会触发。回调返回三个参数，分别代表：生成的值、日期时间对象、结束的日期时间对象
 *
 * //TODO 详细参考laydate
 */
class DatePickerDirective {

    static $inject = ["$timeout", "$interval"];

    constructor() {
    }

    restrict: string = 'A';
    require = "^ngModel";
    scope = {
        min: '@',
        max: '@',
        mark: '@',
        ready: '&',
        change: '&',
        done: '&'
    };

    static instance() {
        return new DatePickerDirective();
    }

    link = (scope: any, element: any, attrs: any, controller: any) => {
        scope.ngModelController = controller;
        scope.ngModelController.$parsers.push((viewValue: string) => {
            return viewValue;
        });
        scope.ngModelController.$formatters.push((modelValue: string) => {
            scope.ngModelValue = modelValue;
            return modelValue;
        });
        scope.dateOptions = {} as {[key:string]:any};

        init();


        function init() {
            scope.dateOptions.elem = element[0];
            if (attrs.dateType) {
                scope.dateOptions.type = attrs.dateType;
            } else {
                scope.dateOptions.type = 'datetime';
            }
            if (attrs.range) {
                scope.dateOptions.range = scope.$eval(attrs.range);
            }
            if (attrs.format) {
                scope.dateOptions.format = attrs.format;
            } else {
                scope.dateOptions.format = 'yyyy-MM-dd HH:mm:ss';
            }
            if (scope.min) {
                scope.dateOptions.min = scope.min;
            }
            if (scope.max) {
                scope.dateOptions.max = scope.max;
            }
            if (attrs.trigger) {
                scope.dateOptions.trigger = attrs.trigger;
            }
            if (attrs.show) {
                scope.dateOptions.show = scope.$eval(attrs.show);
            }
            if (attrs.position) {
                scope.dateOptions.position = scope.$eval(attrs.position);
            }
            if (attrs.zIndex) {
                scope.dateOptions.zIndex = scope.$eval(attrs.zIndex);
            }
            if (attrs.showBottom) {
                scope.dateOptions.showBottom = scope.$eval(attrs.showBottom);
            }
            if (attrs.btns) {
                scope.dateOptions.btns = scope.$eval(attrs.btns);
            }
            if (attrs.lang) {
                scope.dateOptions.lang = scope.$eval(attrs.lang);
            }
            if (attrs.calendar) {
                scope.dateOptions.calendar = scope.$eval(attrs.calendar);
            }
            if (scope.mark) {
                scope.dateOptions.mark = scope.mark;
            }
            scope.dateOptions.ready = (date: any) => {
                if (scope.ready) {
                    scope.ready({date: date})
                }
            };
            scope.dateOptions.change = (value: string, date: any, endDate: string) => {
                if (scope.change) {
                    scope.change({value: value, date: date, endDate: endDate})
                }
            };
            scope.dateOptions.done = (value: string, date: any, endDate: string) => {
                scope.ngModelValue = value;
                scope.ngModelController.$setViewValue(value);
                if (scope.done) {
                    scope.done({value: value, date: date, endDate: endDate})
                }
            };

            if (scope.ngModelValue) {
                this.dateOptions.value = scope.ngModelValue;
            }
            scope.layerindex = laydate.render(scope.dateOptions);
        }

        scope.$watch('min', (val: string) => {
            if (val) {
                if(scope.dateOptions){
                    scope.dateOptions.min = val;
                    let configMin = laydate.set(scope.dateOptions).render().config.min;
                    scope.layerindex.config.min = configMin;
                    configMin = null;
                }
            }
        });
        scope.$watch('max', (val: string) => {
            if (val) {
                if(scope.dateOptions){
                    scope.dateOptions.max = val;
                    let configMax = laydate.set(scope.dateOptions).render().config.max;
                    scope.layerindex.config.max = configMax;
                    configMax = null;
                }
            }
        });
        scope.$watch('mark', (val: any) => {
            if (val) {
                if(scope.dateOptions){
                    scope.dateOptions.mark = val;
                    let configMark = laydate.set(scope.dateOptions).render().config.mark;
                    scope.layerindex.config.max = configMark;
                    configMark = null;
                }
            }
        });
        scope.$on('$destory', () => {
            scope.ngModelController = null
        })
    }


}

app.directive("datePicker", DatePickerDirective.instance);