
import 'jquery';
import 'angular';
import {ITimeDrawGrid, ITimeDrawShape, ITimeDraw} from "./ITimeDraw";
import {WeekItem, TimeItem, TimeTemplateEx, DateItem} from "../../../core/entity/ex/TimeTemplateEx";
import {ThresholdType} from "../../../core/server/enum/ThresholdType";
declare let $:any;
declare let angular:any;
/*TODO 结构不规范。。。*/
export class TimeDraw implements ITimeDraw{
    grid:ITimeDrawGrid;
    shape:ITimeDrawShape;
    timeTypeParamsList:{[key:string]:{styleBg:string,styleBorder:string,key:string}};
    activeTimeType:string;

    dataTimeAttrName:string = "data-time";
    dataTimeTypeAttrName:string = "data-timetype";
    constructor(){
        this.timeTypeParamsList = this.setTimeTypeParamsList();
        this.activeTimeType = "defaultType";
        let vmTimeDraw = this;
        vmTimeDraw.grid = {
            //动态编辑数据
            gridW: 630,//网格容器宽度
            gridLeft: 60,//网格容器左边距
            rectTop: 36,//条纹顶部空间距离
            line: 24,//小时区间数
            rect: 7,//初始显示时间条数
            lineOverflow: 20,//网线顶部溢出长度
            defineShow: 2,//允许显示的自定义时间条数
            //动态获取数据
            drawW: 0,//绘图区域总宽度
            lineW: 0,//竖向网线总宽
            lineH: 0,//竖向网线总高
            rectW: 0,//单个条纹宽
            rectH: 0,//单个条纹高
            init: function (currenRects?:number) {
                //计算条纹高度
                this.rectH = this.gridW / this.line + 5;
                //网格区域高度
                let gridHeight = !!currenRects ? currenRects : this.rect;
                $('#timeTable').css({
                    "height": this.rectH * gridHeight + this.rectTop
                });
                //允许显示一条自定义 其余隐藏
             /*   if (currenRects > 8) {
                    $('#timeTable').css({
                        "height": this.rectH * 8 + this.rectTop
                    }).addClass('overflow-y');
                }*/

                //绘图区域总宽度
                this.drawW = $('#timeTable').width();

                //网线宽 左边距
                $('#timeTable .time-bg-grid').css({
                    "width": this.gridW,
                    "marginLeft": this.gridLeft
                });
                //条纹容器顶边距
                $('.girds-rect').css({
                    "top": this.rectTop
                });
                //设置绘制图形的高度
                $('#timeTable ol li').css('height', this.rectH);
                $('#timeTable ol li span').css('height', this.rectH - 1);
                //初始化设置网格容器 宽 高 左边距
                $('.time-bg-grid').css({
                    "height": this.rectH * gridHeight + this.rectTop,//单个高度*总个数+顶部空间
                });
                //框选范围区域 宽
                $('#draw').css({
                    "width": this.drawW,//扩大框选区域
                    "top": this.rectTop,
                    "left": -this.gridLeft
                });
                //绘图范围区域
                $('.border-rect').css({
                    "top": 0, //
                    "bottom": 0,//
                    "width": this.gridW,//
                    "left": this.gridLeft
                });
                //星期显示位置 自身宽度
                $('#timeTable ul.week').css({
                    "top": this.rectTop,
                    "left": this.gridLeft - $('#timeTable ul.week').width() - 10,//右侧留10px间距
                    "lineHeight": this.rectH + "px"
                });
                //显示图形区域位置
                $('#drawShow').css({"left": this.gridLeft});
                //获取网格宽高
                this.lineW = this.gridW;
                this.lineH = $('.grids-line').height();
                //获取条纹宽高
                this.rectW = $('.grids-rect').width();
                //绘制竖向网线
                this.drawLine(this.line);
                //绘制横向条纹,有参数添加，无参数重置
                if (!!currenRects) {
                    this.drawRect(currenRects)
                } else {
                    this.drawRect(this.rect)
                }
                vmTimeDraw.shape.init();
            },
            //绘制竖向网线
            drawLine: function (total:number) {
                //计算竖向网线间隔
                let left = (this.lineW - 1) / this.line;
                for (let i = 0; i <= total; i++) {
                    //绘制竖线
                    $('.grids-line').append("<div style='left:" + left * i + "px'></div>");
                    //插入文本
                    $('.grids-line').append("<span>" + i + "</span>");
                    let span = $('.grids-line').find('span');
                    //文本宽度
                    let testW = $(span[span.length - 1]).width();
                    //计算文本位置
                    let testLeft = left * i - testW / 2;
                    //设置文本位置
                    span[span.length - 1].style.left = testLeft + "px";
                }
            },
            //绘制横向条纹
            drawRect: function (total:number) {
                //计算条纹高度
                for (let i = 0; i < total; i++) {
                    let bgcolor = (i % 2 === 0 ? "gray" : "");
                    $('.grids-rect').append("<div class='" + bgcolor + "' style='height:" + this.rectH + "px'></div>")
                }
            }
        };

        vmTimeDraw.shape = {
            gridW: 0,//网格容器的宽度
            liHeight: 0,//绘制图形容器li的高度
            MSDOWN: false, //鼠标按下 true
            drawX1: 0, // 起点
            drawY1: 0, // 起点
            drawX2: 0, //终点
            drawY2: 0, //终点
            OSX: 0,//偏移量X , 左 负 右 正
            OSY: 0, //偏移量Y , 左 负 右 正
            DRAWED: false,//有选区绘制完成才允许绘制时间段 阻止时间设置框内鼠标移动造成误绘图
            li_0: 0, //垂直方向起点 li n 向下取整 1 - 7
            li_n: 0, // 垂直方向结束点 li n 向上取整 1-7
            sp: 0,//当前行数 时间段 span 个数
            h1: 0,//当前小时 起点
            m1: 0,//当前分钟
            h2: 0,//当前小时 结束点
            m2: 0,//当前分钟
            timesStr: "",//存储未取舍过的时间数据，用于逆运算减少取舍误差
            selfTimes: 10,//允许添加自定义时间段  手动配置
            defineLineList: [] as Array<DateItem>,//记录已添加的自定义时间段
            isTargetMSDOWN: false,//判断是否是直接绘图区域的鼠标事件
            init: function () {

                let me = this;
                /************** 单点 多点 绘制层事件 ***************/
                /*timeTable.oncontextmenu = function () {
                 //绘图区域阻止鼠标右键菜单
                 return false;
                 };*/

                //鼠标按下获取起始点坐标
                angular.element("#drawArea").mousedown (function (e:any) {
                    console.log("drawArea鼠标按下获取起始点坐标");
                    //允许鼠标左键绘制
                    if (e.button == 0) {
                        //绘制过程 显示层置底，防止阻挡绘制事件
                        me.zIndex(96);
                        //鼠标按下
                        me.MSdown(e);
                        //取消激活项目
                        $('#drawShow>li>span.active').removeClass('active');
                    }
                });

                //鼠标弹起，结束绘制，获取结束点坐标
                $("#drawArea").on("mouseup",function (e:any) {
                    console.log("drawArea鼠标按下获取起始点坐标");
                    //绘制结束 显示层置顶，可进行显示层操作
                    if (e.button == 0) {
                        me.zIndex(99);
                        //鼠标弹起
                        me.MSup(e);
                        //绘制时间段
                        me.addRect();
                    }
                });

                $("#drawArea").mouseover (function () {
                    //获取网格容器宽度
                    this.gridW = $('.time-bg-grid').width();
                    //显示对应单点时间点
                    $('.time-dot').show();
                });

                $("#drawArea").mousemove (function (e:any) {
                    //鼠标移动，获取目标父级 鼠标偏移量
                    me.MSmove(e);
                    //获取绘图区域左边距  限制时间显示区间0-24
                    let X = e.offsetX < vmTimeDraw.grid.gridLeft ? 0 : e.offsetX > (this.gridW + vmTimeDraw.grid.gridLeft) ? this.gridW : (e.offsetX - vmTimeDraw.grid.gridLeft);
                    // 时间计算
                    let h:number|string = X / this.gridW * 24 ^ 0;
                    let m:number|string = X / this.gridW * 24 * 60 % 60 ^ 0;
                    (h < 10) && (h = "0" + h);
                    (m < 10) && (m = "0" + m);
                    //设置内容显示
                    $('.time-dot').html(h + "：" + m + "：00");
                    //设置内容显示位置,水平方向的位置 自身宽度76 边框1
                    // 限制左
                     let x = e.offsetX < vmTimeDraw.grid.gridLeft ? vmTimeDraw.grid.gridLeft - 15 : e.offsetX;
                    //限制左右
                  /* let x = e.offsetX < vmTimeDraw.grid.gridLeft ?
                        vmTimeDraw.grid.gridLeft - 15 :
                        (e.offsetX > (vmTimeDraw.grid.gridW + vmTimeDraw.grid.gridLeft - 76 - 15) ?
                            (vmTimeDraw.grid.gridW + vmTimeDraw.grid.gridLeft - 76 -15) : e.offsetX);*/
                    //垂直方向的位置  总高度 - 自身高度 22 - 偏移量
                    let currentRect = $('#timeTable .week').children().length;
                    let bottomSpace = currentRect * vmTimeDraw.grid.rectH - 22 - 10;

                    let y = e.offsetY > bottomSpace ? bottomSpace : e.offsetY;
                    //限制上下
                    // e.offsetY > bottomSpace ? bottomSpace : e.offsetY;
                    //超出左 隐藏
                    if(e.offsetX > (vmTimeDraw.grid.gridW + vmTimeDraw.grid.gridLeft)){
                        $('.time-dot').hide();
                    }else{
                        $('.time-dot').show();
                        $('.time-dot').css({
                            'left': x + 15,
                            "top": y + 10
                        });
                    }
                });

                $("#drawArea").mouseout (function (e:any) {
                    //鼠标离开目标区域，返回false
                    me.MSout(e);
                    //显示对应单点时间点
                    $('.time-dot').hide();
                });

                /*********************** 显示图层事件 ********************/
                //单点时间段 选择
                $("#drawShow").click(function (e:any) {
                    if (e.target.nodeName == "SPAN") {
                        if ($(e.target).hasClass('active')) {
                            $(e.target).removeClass('active').addClass('normal')
                        } else {
                            $(e.target).addClass('active').removeClass('normal').siblings('span').removeClass('active').addClass('normal');
                            $(e.target).parent('li').siblings('li').children('span').removeClass('active').addClass('normal');

                        }

                        //显示设置条
                        if ($(e.target).hasClass('active')) {

                            //减小取舍误差 ,不直接舍入
                            let left = parseFloat(e.target.style.left);
                            let right = left + parseFloat(e.target.style.width);

                            //console.log(left + "," + right)
                            //时间条设置工具栏 padding:5
                            let top = $(e.target).parent('li').index() * vmTimeDraw.grid.rectH - $('.time-range').height() - 10 - 5;

                            //显示设置文本显示区域的出现位置
                            $('.time-range').css({
                                "left": left + vmTimeDraw.grid.gridLeft + "px",
                                "top": top + "px"
                            });

                            //调用  时间换算
                            me.timeCount(left, right);
                            //设置时间 [0,1]  起点  结束点   0不修改  1修改
                            me.setTime(me.h1, me.m1, me.h2, me.m2, [1, 1]);
                            //显示时间
                            $('.time-range').show();
                        } else {
                            $('.time-range').hide();
                        }
                    }
                });
                //单点 时间段 span 显示对应参数设置
                $("#timeSet").click(function (e:any) {
                    /**
                     * 获取时间格式私有方法
                     * @param points    开始 0  结束 1
                     * @param times     h 0     分 1
                     * @param mothod    设置set   获取get
                     */
                    function _getTimeForm(points:number, times:number, mothod:any, val:any) {

                        if (mothod === "get") {//获取
                            return ($(e.target).parent('p').find('span').eq(points).find('input').eq(times).val() ^ 0);
                        } else {//设置
                            $(e.target).parent('p').find('span').eq(points).find('input').eq(times).val(val);
                        }
                    };
                    //获取当前输入框内时间段值 起点 H M  结束点 H M
                    let h_sta = _getTimeForm(0, 0, "get", null);
                    let m_sta = _getTimeForm(0, 1, "get", null);
                    let h_end = _getTimeForm(1, 0, "get", null);
                    let m_end = _getTimeForm(1, 1, "get", null);
                    console.info(h_sta,m_sta,h_end,m_end);
                    //开始时间大于结束时间，提示错误
                    if (h_sta > h_end || h_sta === h_end && m_sta > m_end) {
                        // $scope.timeMsg(3);
                        console.log("开始时间大于结束时间，提示错误");
                        return;
                    } else if (h_sta === h_end && m_end === m_sta) {
                        //相等提示错误
                        //  $scope.timeMsg(4);
                        console.log("相等提示错误");
                        return;
                    } else if (h_sta === (me.h1 ^ 0) && h_end === (me.h2 ^ 0) && m_sta === (me.m1 ^ 0) && m_end === (me.m2 ^ 0)) {
                        //未做修改不做操作
                        console.log("未做修改不做操作");
                        return;

                    } else if (h_sta > 24 || h_sta < 0 || h_end > 24 || h_end < 0 || m_sta < 0 || m_sta > 59 || m_end < 0 || m_end > 59) {
                        //超过范围  提示错误\
                        console.log("超过范围  提示错误");
                        // $scope.timeMsg(5);
                        return;
                    }

                    //调用时间逆运算 --时间转换图形
                    me.timeCountReverse(h_sta, m_sta, h_end, m_end);

                    //修改时间格式 为两位数
                    $('.time-range>span>input').each(function (i:any, d:string) {
                        if ($(d).val() < 10 && $(d).val().length < 2) {
                            $(d).val("0" + $(d).val())
                        }
                    });

                    //移动设置窗口
                    console.log($('#drawShow>li>span.active'))
                    let L = parseFloat($('#drawShow>li>span.active')[0].style.left) + vmTimeDraw.grid.gridLeft;
                    $(".time-range").css({'left': L});

                });

                //删除操作
                $("#timeDel").click(function () {
                    $(this).parents('#draw').find('ol>li>span.active').remove();
                    $(this).parents('p').hide();
                });

                //添加行
                $("#addTimes").click(function () {
                    //允许添加  this.selfTimes  条  可变参数
                    if ($('#drawShow>li').length !== (me.selfTimes + vmTimeDraw.grid.rect)) {
                        //添加自定义时段日期
                        let St = $('#StartTime').val(); //开始时间
                        let Et = $('#EndTime').val();//结束时间
                        //空
                        if (!St) {
                            console.log("空");
                            // $scope.timeMsg(-2);
                        } else {//不为空
                            //是否上限
                            if ($('#drawShow>li').length === (vmTimeDraw.shape.selfTimes + vmTimeDraw.grid.rect)) {
                                //超过上限
                                console.log("超过上限");
                                // $scope.timeMsg(2);
                            } else {
                                //开始大于结束
                                if (St > Et && !!Et) {
                                    console.log("开始大于结束");
                                    //  $scope.timeMsg(-1);
                                    return;
                                }
                                ;

                                //判断 newtime has?
                                for (let i = 0; i < me.defineLineList.length; i++) {
                                    //已添加的单日期时间
                                    if ((typeof me.defineLineList[i]) === "string") {
                                        if (St.indexOf(me.defineLineList[i]) !== -1 || Et.indexOf(me.defineLineList[i]) !== -1) {
                                            // $scope.timeMsg(1);
                                            console.log("已添加的单日期时间 存在");
                                            //存在
                                            return;
                                        }
                                    } else {
                                        //被包含\相等的情况
                                        let group = me.defineLineList[i].group.split(',');
                                        if (group[0] <= St && St <= group[1] || group[0] <= Et && Et <= group[1]) {
                                            //  $scope.timeMsg(1);
                                            console.log("被包含相等的情况");
                                            //存在
                                            return;
                                        }
                                    }
                                }
                                ;

                                //追加一条显示行 li
                                $('#drawShow').append(
                                    "<li value='" + $('#drawShow').find('li').length + "'></li>"
                                );
                                //增加一条
                                me.resetDraw(1);

                                //获取星期列表宽度
                                let liWidth = $('.week').width();
                                let liHeight = $('.week li').height();



                                //开始结束时间相同的情况只显示一个,只有开始时只显示一个
                                if (St === Et || St && !Et) {
                                    $('#timeTable .week').append(
                                        "<li class='position-r' style='width:"
                                        + liWidth + "px;height:"
                                        + liHeight + "px'><span>"
                                        + St
                                        + "</span><i style='right:"
                                        + (-vmTimeDraw.grid.gridW - 16 - 10 - 10) + "px;top:"
                                        + (vmTimeDraw.grid.rectH - 16) / 2 + "px' " +
                                        "class='position-a' title='" +
                                        "$rootATMS" + "'></i></li>"
                                        // $rootScope.lang.ATMS_00_01_10 + "'></i></li>"
                                    );

                                    //查找新添加的li绑定删除事件
                                    $('.week>li:last-child>i').on('click', me._defineDel);

                                    //存储已添加的时间段
                                    me.defineLineList.push(St);
                                } else {
                                    $('#timeTable .week').append(
                                        "<li class='position-r' style='width:" + liWidth + "px;height:" + liHeight + "px'>" +
                                        "<a style='top:" + liHeight / 3 + "px'>" + St + "</a>" +
                                        "<a style='top:" + liHeight / 4 * 3 + "px'>" + Et +
                                        "</a><i style='right:" +
                                        (-vmTimeDraw.grid.gridW - 16 - 10 - 10) +
                                        "px;top:" +
                                        (vmTimeDraw.grid.rectH - 16) / 2 +
                                        "px' class='position-a' title='" +
                                        "$rootATMS" + "'></i></li>"
                                        /*$rootScope.lang.ATMS_00_01_10 + "'></i></li>"*/
                                    );

                                    //查找新添加的li绑定删除事件
                                    $('.week>li:last-child>i').on('click', me._defineDel);

                                    //存储已添加的时间段
                                    me.defineLineList.push({'group': St + "," + Et});
                                }
                            }
                        }
                    }
                });
            },

            _customLineDel:function _customLineDel() {
                //移除对应一条图形区域
                let n = $(this).parents('li').index();
                $('#drawShow li').eq(n).remove();
                //移除日期
                $(this).parents('li').remove();
                //删除一条,重绘背景框
                this.resetDraw(0);
            },
            //重绘网格区域
            resetDraw:function(addOrReduce:number) {
                //获取当前时间条数
                let currentRect = $('#timeTable .week').children().length;
                //let currentRect = $('.grids-rect').children('div').length;

                console.log(currentRect);
                //增加背景图条纹行数 清除原来，重绘背景网格
                $('.grids-rect').html("");
                $('.grids-line').html("");
                //增加一条自定义，重绘
                vmTimeDraw.grid.init(currentRect + Number(addOrReduce));
            },
            //创建删除方法
            _defineDel:function _defineDel() {
                //移除对应一条图形区域
                let n = $(this).parents('li').index();
                $('#drawShow li').eq(n).remove();
                //移除日期
                $(this).parents('li').remove();
                //删除一条,重绘背景框
                this.resetDraw(0);
            },
            //设置时间
            setTime: function (h1:number, m1:number, h2:number, m2:number, arr:Array<boolean>) {
                //[1,1] 修改起点 终点
                //时间起点
                if (arr[0]) {
                    $('.time-range>span').eq(0).find('input').eq(0).val(h1);
                    $('.time-range>span').eq(0).find('input').eq(1).val(m1);
                }
                if (arr[1]) {
                    //时间结束点
                    $('.time-range>span').eq(1).find('input').eq(0).val(h2);
                    $('.time-range>span').eq(1).find('input').eq(1).val(m2);
                }
            },
            //计算时间
            timeCount: function (start:number, end:number):string{

                //图形转时间值
                this.h1 = (start / vmTimeDraw.grid.gridW * 24) ^ 0;
                this.m1 = (start / vmTimeDraw.grid.gridW * 24 * 60 % 60) ^ 0;
                this.h2 = (end / vmTimeDraw.grid.gridW * 24) ^ 0;
                this.m2 = (end / vmTimeDraw.grid.gridW * 24 * 60 % 60) ^ 0;

                //小于10 添加 " 0 "
                this.h1 = this.concatStr(this.h1);
                this.m1 = this.concatStr(this.m1);
                this.h2 = this.concatStr(this.h2);
                this.m2 = this.concatStr(this.m2);

                return (this.h1 + ":" + this.m1 + "-" + this.h2 + ":" + this.m2);
            },

            //小于10 添加 " 0 "
            concatStr: function (num:number):string {
                return (num < 10) ? ("0" + num) : ""+ num ;
            },
            //时间  逆运算 当前图形 变化参数
            timeCountReverse: function (h1:number, m1:number, h2:number, m2:number) {
                //减小时间转换误差   计算图形 每分钟对应的图形px
                let scale = vmTimeDraw.grid.gridW / (24 * 60);
                //以分 比例  计算图形

                let x1 = (h1 * 60 + m1) * scale - 0;
                let x2 = (h2 * 60 + m2) * scale - 0;

                //调用重复 交集 1px接合判断
                let li_n = $('#drawShow>li>span.active').parent('li').index();
                let target = $('#drawShow>li>span.active')[0];
                this.drawShapeInLine(x1, x2, li_n, "alter", target);

                //调用 - 修改图形
                //this.alterActive(x1, x2);
            },
            //修改激活目标图像
            alterActive: function (x1:number, x2:number) {
                let shapeType = vmTimeDraw.activeTimeType;
                let shapeBgColor = vmTimeDraw.getTimeShapeBg(shapeType);

                $("#drawShow>li>span.active").css({
                    "left": x1 + "px",
                    "width": x2 - x1 + "px",
                    "height": this.liHeight - 1 + "px",
                    "background-color":shapeBgColor
                }).attr(vmTimeDraw.dataTimeAttrName, this.timeCount(x1,x2))
                  .attr(vmTimeDraw.dataTimeTypeAttrName, vmTimeDraw.activeTimeType)
                ;
            },
            //鼠标按下确认
            MSdown: function (e:any) {
                this.MSDOWN = true;
                this.drawX1 = e.offsetX;
                this.drawY1 = e.offsetY;
            },
            //鼠标按下并移动绘制
            MSmove: function (e:any) {

                //鼠标按下    且  移动  触发
                if (this.MSDOWN) {
                    this.OSX = e.offsetX - this.drawX1;
                    this.OSY = e.offsetY - this.drawY1;
                    //绘制选框
                    this.drawarea();
                    $("#drawBox")[0].style.display = 'block';
                }
            },
            //鼠标弹起结束绘制
            MSup: function (e:any) {
                this.MSDOWN = false;
                this.drawX2 = e.offsetX;
                if (this.drawX1 > this.drawX2) { //X1为小的
                    this.drawX1 = [this.drawX2, [this.drawX2 = this.drawX1]][0];
                }
                this.drawY2 = e.offsetY;
                if (this.drawY1 > this.drawY2) {
                    this.drawY1 = [this.drawY2, [this.drawY2 = this.drawY1]][0];
                }
                //隐藏选框
                $("#drawBox")[0].style.display = 'none';
            },
            //鼠标离开有效停止绘制
            MSout: function (e:any) {
                this.drawX2 = e.offsetX;
                this.drawY2 = e.offsetY;

                //结束
                this.MSDOWN = false;
                //隐藏
                $("#drawBox")[0].style.display = 'none';
                //重置参数
                this.resetBox();
            },
            //调换绘制事件图层顺序
            zIndex: function (z:number) {
                // 初始  显示层drawShow 96  选框层drawBox = 97   绘制层drawArea = 98
                //显示层置底，绘制
                if (z == 96) {
                    $("#drawShow")[0].style.zIndex = 96
                } else if (z == 99) {
                    //显示层置顶，不能绘制，可操作已绘制的图形
                    $("#drawShow")[0].style.zIndex = 99
                }
            },
            //范围选框绘制  div 定位初始化 top : 0   left : 0
            drawarea: function () {
                if (this.OSX > 0) {
                    //大于0 向右绘制，增加宽度 ,固定起点
                    $("#drawBox")[0].style.left = this.drawX1 + "px";
                    $("#drawBox")[0].style.width = this.OSX + "px";
                } else {
                    //小于0向左绘制 ，减小 左边距   this.OSX 为负数
                    $("#drawBox")[0].style.left = this.drawX1 + this.OSX + "px";
                    $("#drawBox")[0].style.width = -this.OSX + "px";
                }
                ;

                if (this.OSY > 0) {
                    //大于0 向下绘制，增加高度
                    $("#drawBox")[0].style.top = this.drawY1 + "px";
                    $("#drawBox")[0].style.height = this.OSY + "px";
                } else {
                    //小于0向上绘制，减小顶边距  this.OSY 为负数
                    $("#drawBox")[0].style.top = this.drawY1 + this.OSY + "px";
                    $("#drawBox")[0].style.height = -this.OSY + "px";
                }
                //有选区绘制完成才允许绘制时间段 阻止时间设置框内鼠标移动造成误绘图
                this.DRAWED = true;
            },
            //重置范围选框属性
            resetBox: function () {
                $("#drawBox")[0].style.top = 0;
                $("#drawBox")[0].style.left = 0;
                $("#drawBox")[0].style.width = 0;
                $("#drawBox")[0].style.height = 0;
            },
            //在目标范围内的li内添加矩形span
            addRect: function () {
                if (this.DRAWED) {
                    //通过垂直方向鼠标偏移量计算被选中区域的 li 区间 1-n
                    this.li_0 = this.drawY1 / $('.week li').height() ^ 0;
                    this.li_n = this.drawY2 / $('.week li').height() ^ 0;
                    //调用 绘制时间段
                    this.drawTime(this.li_0, this.li_n);
                }
            },
            //绘制时间段
            drawTime: function (start:number, end:number) {
                if (start > end) {
                    start = [end, [end = start]][0] as number;//取小，交换
                }

                //转换为有效绘图区域的数据
                let x1 = this.drawX1;
                let x2 = this.drawX2;
                //绘图区域左边距
                let left = vmTimeDraw.grid.gridLeft;
                //绘图区域宽度
                let w = vmTimeDraw.grid.gridW;
                //限制有效绘图区域
                x1 = (x1 <= left ? 0 : x1 >= (w + left) ? w : x1 - left);
                x2 = (x2 <= left ? 0 : x2 >= (w + left) ? w : x2 - left);
                for (let sta = start; sta <= end; sta++) {
                    //查找当前li内已经存在的时间段 个数 span
                    this.sp = $('#drawShow li').eq(sta).find('span').length;
                    if (this.sp === 0) {
                        this.drawShape(x1, x2, sta);
                    } else {
                        //调用 单行绘制（存在多个） 重复判断 1px接合判断
                        this.drawShapeInLine(x1, x2, sta, "newShape", null);
                    }
                }
            },
            //绘制单个 span 图形
            drawShape: function (x1:number, x2:number, li_n:number,timeType?:string) {
                let shapeType = !!timeType? timeType:vmTimeDraw.activeTimeType;

                let shapeBgColor = vmTimeDraw.getTimeShapeBg(shapeType);
                //active 是否需要激活
                //获取当前li的高度
                this.liHeight = vmTimeDraw.grid.rectH;
                //插入图形
                let htmlSpanStr =
                    "<span style = 'left:"
                    + x1 + "px"
                    + ";background-color:" + shapeBgColor
                    + ";width:" + Math.abs(x2 - x1) + "px"
                    + ";height:" + (this.liHeight - 1) +"px" + "'"
                    + " class = 'normal'"
                    + " " +  vmTimeDraw.dataTimeAttrName + " = '" +this.timeCount(x1,x2) + "'"
                    + " " +  vmTimeDraw.dataTimeTypeAttrName + " = '"  + shapeType + "'"
                    + " ></span>";
                console.log(htmlSpanStr);
                $('#drawShow li').eq(li_n).append(htmlSpanStr);

                //调用删除width为0的span
                this.deleteWEmpty(li_n);
                //隐藏设置窗口
                $('.time-range').hide();

                //有选区绘制完成才允许绘制时间段 阻止时间设置框内鼠标移动造成误绘图
                this.DRAWED = false;
            },
            //删除 width 为 0的
            deleteWEmpty: function (li_n:number) {
                $('#drawShow li').eq(li_n).find('span').each(function (i:any, d:string) {
                    if (parseFloat($(d)[0].style.width) === 0) {
                        $(d).remove();
                    }
                })
            },

            /* 单行内绘制全部  包含、被包含、左交集、右交集
             * @param x1            起点坐标
             * @param x2            终点坐标
             * @param sta           目标操作行
             * @param action        执行动作  newShape 新绘制； alter修改
             * @param alterTarget   修改目标(jQ)
             */
            drawShapeInLine: function (x1:number, x2:number, sta:number, action:string, alterTarget:any) {
                //多个时间段 span，获取当前li下面的所有span
                let left:number = 0; // 存储当前span的left
                let right:number = 0;// left + width
                let newL = null, newR = null;//获取新变量 left 和 right
                //修改的时候不包含自身 span.active
                let span = !!alterTarget ?
                    $('#drawShow li').eq(sta).find("span.normal") :
                    $('#drawShow li').eq(sta).find("span");
                let newShapeItem:ShapeItem = {
                    startX:x1,
                    endX:x2,
                    type:vmTimeDraw.activeTimeType
                };
                if(span.length >0){
                    for (let i = 0; i < span.length; i++) {
                        let _newShapeItem = vmTimeDraw.getUpdateList(sta,span[i],newShapeItem.startX,newShapeItem.endX);
                         if (_newShapeItem === null) {

                         }else{
                             newShapeItem.startX = _newShapeItem.startX;
                             newShapeItem.endX = _newShapeItem.endX;
                             $(span[i]).remove();
                         }
                    }
                }else{
                    let _newShapeItem = vmTimeDraw.getUpdateList(sta,alterTarget,newShapeItem.startX,newShapeItem.endX);
                    if(_newShapeItem!==null){
                        newShapeItem.startX = _newShapeItem.startX;
                        newShapeItem.endX = _newShapeItem.endX;
                        if (action === "alter") {
                        //    !!alterTarget && $(alterTarget).remove();
                        }
                    }
                }

                if (action === "newShape") {
                    //绘制新图
                    this.drawShape(newShapeItem.startX, newShapeItem.endX, sta);
                } else {
                    //修改 已激活的目标
                    this.alterActive(newShapeItem.startX, newShapeItem.endX);
                }

                //是否进行绘制
             /*   let isDraw = false;
                for (let i = 0; i < span.length; i++) {
                    //获取当前span的属性值
                    left = parseFloat(span[i].style.left) ;
                    right = parseFloat(span[i].style.width) + left;
                    //新区被包含，不做操作,直接终止循环   修改区被包含，先删除,再终止循环
                    if (left <= x1 && x2 <= right) {
                        console.log("被包含");
                        if (action === "alter") {
                            !!alterTarget && alterTarget.remove();
                        }
                        ;
                        isDraw = false;
                        //终止操作
                        break;
                        //新区包含原有区
                    } else if (x1 <= left && x2 >= right) {
                        //需要绘制
                        isDraw = true;
                        //删除重复
                        $(span[i]).remove();
                        console.log("包含");
                        //右边交集,获取右边原有区域 right  1px接合情况(取整计算)
                    } else if (x1 < left && (x2 ^ 0 + 1)>= (left ^ 0) && x2 <= right) {

                        //需要绘制
                        isDraw = true;
                        //获取新值
                        newR = parseFloat(span[i].style.left) + parseFloat(span[i].style.width);
                        //删除重复
                        $(span[i]).remove();
                        console.log("右交集");
                        //左边交集，获取左边原有区域 left   1px接合情况(取整计算)
                    } else if (x1 >= left && ((x1 ^ 0) - 1)  <= (right ^ 0) && x2 > right) {

                        //需要绘制
                        isDraw = true;
                        //获取新值
                        newL = parseFloat(span[i].style.left);
                        //删除重复
                        $(span[i]).remove();
                        console.log("左交集");
                        //无交集，直接绘制
                    } else {
                        isDraw = true;
                        console.log("无交集");
                    }
                    ;
                }
                //需要绘图
                /!*todo 判断缺 优化使用*!/
                //if (isDraw) {
                    //为null 未发生改变
                    let X1 = newL === null ? x1 : newL;
                    let X2 = newR === null ? x2 : newR;

                    if (action === "newShape") {
                        //绘制新图
                        this.drawShape(X1, X2, sta);
                    } else {
                        //修改 已激活的目标
                        this.alterActive(X1, X2);
                    }
                //}*/
            },
            //清空所有时间图形
            clearShape: function () {
                $('#drawShow>li').children('span').remove();
            },
        };
    }

    // 根据周 时间结果圈画数据
    drawByWeekItems(weekItems:Array<WeekItem>){
        let rectXs:Array<number>;
        let liIndex:number;
        angular.forEach(weekItems,(val:WeekItem)=>{
            liIndex = Number(val.DayOfWeek);
            console.log("=============" + liIndex);
            console.log(val.TimeItems.length);
            angular.forEach(val.TimeItems,(hVal:TimeItem,indexH:number)=>{
                console.log(hVal,"`1``````````````````" + indexH);
                rectXs = this.timeCountReverse(hVal.StarTime,hVal.EndTime);
                this.shape.drawShape(rectXs[0],rectXs[1],liIndex,hVal.ThresholdType);
                console.log("+++++++++++++++" + rectXs);
            //    this.shape.drawShape(10,25,liIndex);
            });
        });
    };
    // 根据自定义时间数组 画数据
    drawByDateItems = (dateItems:Array<DateItem>):void=>{
        let rectXs:Array<number>;
        let liIndex:number;
        let liBaseNum:number = 7;

        if(Array.isArray(dateItems) && dateItems.length>0){
            angular.forEach(dateItems,(dateVal:DateItem,index:number)=>{
                liIndex = liBaseNum +index;
                this.addGripLine(dateVal.StartDateOfItem,dateVal.EndDateOfItem,dateVal.DateName);

                angular.forEach(dateVal.TimeItems,(hVal:TimeItem,indexH:number)=>{
                    console.log(hVal,"`1``````````````````" + indexH);
                    rectXs = this.timeCountReverse(hVal.StarTime,hVal.EndTime);
                    this.shape.drawShape(rectXs[0],rectXs[1],liIndex,hVal.ThresholdType);
                    console.log("+++++++++++++++" + rectXs);
                });
            })
        }
    };

    //时间  逆运算 当前图形 变化参数
    timeCountReverse = (startTime:string,endTime:string) :Array<number>=>{
        let h1 = parseInt(startTime.split(':')[0]);
        let m1 = parseInt(startTime.split(':')[1]);

        let h2 = parseInt(endTime.split(':')[0]);
        let m2 = parseInt(endTime.split(':')[1]);

        //减小时间转换误差   计算图形 每分钟对应的图形px
        let scale = this.grid.gridW / (24 * 60);
        //以分 比例  计算图形

        let x1 = (h1 * 60 + m1) * scale - 0;
        let x2 = (h2 * 60 + m2) * scale - 0;
        console.log(x1 + "=========" +　x2);
        return [x1,x2];
    }

    //初始化 timeTypeParamsList 赋值  暂固定 阈值对应
    setTimeTypeParamsList():{[key:string]:{styleBg:string,styleBorder:string,key:string}}{
        let _timeTypeParamsList = {} as {[key:string]:{styleBg:string,styleBorder:string,key:string}};
        let _timeTypeParamsItem: {styleBg:string,styleBorder:string,key:string};
        _timeTypeParamsItem = {
            styleBg:"#fb9d49",
            styleBorder:"1px solid #fb9d49",
            key:ThresholdType.Low.value
        };
        _timeTypeParamsList[ThresholdType.Low.value] = _timeTypeParamsItem;

        _timeTypeParamsItem = {
            styleBg:"#fb9d49",
            styleBorder:"1px solid red",
            key:ThresholdType.Low.value
        };
        _timeTypeParamsList[ThresholdType.Low.value] = _timeTypeParamsItem;

        _timeTypeParamsItem = {
            styleBg:"#4394ff",
            styleBorder:"1px solid red",
            key:ThresholdType.Hight.value
        };
        _timeTypeParamsList[ThresholdType.Hight.value] = _timeTypeParamsItem;

        _timeTypeParamsItem = {
            styleBg:"#2acc57",
            styleBorder:"1px solid red",
            key:ThresholdType.Capture.value
        };
        _timeTypeParamsList[ThresholdType.Capture.value] = _timeTypeParamsItem;

        _timeTypeParamsItem = {
            styleBg:"#BAE1FE",
            styleBorder:"1px solid red",
            key:"default"
        };
        _timeTypeParamsList["defaultType"] = _timeTypeParamsItem;
        return _timeTypeParamsList;
    }
    // 根据全选内容 块颜色
    getTimeShapeBg(shapeType:string){
       let colorStr = "#4394ff";
        if(!!shapeType && this.timeTypeParamsList[shapeType]){
            colorStr =  this.timeTypeParamsList[shapeType].styleBg;
        }
        console.log("%c ========改变将要绘制的颜色========","color:" + colorStr);
        return colorStr;
    }
    // 改变
    changeActiveType = (drawType:string):string=>{
        this.activeTimeType = drawType;
        return this.getTimeShapeBg(drawType);
    };

    // 根据 当前 span old_x1 old_x2  new_x1 new_x2
    getUpdateList = (lineIndex:number,aliveTarget:any,newLeft:number,newRight:number)=>{

       // (newRight ^ 0 + 1) <= (aliveLeft ^ 0);
        let aliveType:string = $(aliveTarget).attr(this.dataTimeTypeAttrName);

        let aliveLeft:number = parseFloat(aliveTarget.style.left) ;
        let aliveRight:number = parseFloat(aliveTarget.style.width) + aliveLeft;

        let shapeItem:ShapeItem;
        shapeItem = new ShapeItem();
        shapeItem.startX = newLeft;
        shapeItem.endX = newRight;
        shapeItem.type = this.activeTimeType;
        //let shapeItemList = [] as Array<ShapeItem>;

        let isSameType:boolean = (aliveType === this.activeTimeType);

      //  shapeItemList.push(shapeItem);

        console.log("已存在：："  + aliveLeft + "===="+ aliveRight);
        console.log("已存在：："  + (aliveLeft ^ 0) + "===="+ (aliveRight ^ 0));
        console.log("新：："  + newLeft + "===="+ newRight);
        console.log("新：："  + (newLeft ^ 0 + 1) + "===="+ (newRight ^ 0 + 1));

        if (aliveLeft <= newLeft && newRight <= aliveRight) {
         //   $(aliveTarget).remove();
            console.log("被包含 已存在 包含 新 （aliveLeft <= (newLeft <<< newRight) <= aliveRight）");
            if(isSameType){
                return null;
              /*  shapeItem = new ShapeItem();
                shapeItem.startX = aliveLeft;
                shapeItem.endX = aliveRight;
                shapeItem.type = this.activeTimeType;*/
              //  shapeItem = null;
            }else{
                this.shape.drawShape(aliveLeft, newLeft,lineIndex, aliveType);
                this.shape.drawShape(newRight, aliveRight,lineIndex, aliveType);
            }
        }else if(newLeft <= aliveLeft && aliveRight<= newRight ){
          //  $(aliveTarget).remove();
            console.log("包含 新 包含 已存在  (newLeft <= aliveLeft <<< aliveRight <= newRight)");
            shapeItem = new ShapeItem();
            shapeItem.startX = newLeft;
            shapeItem.endX = newRight;
            shapeItem.type = this.activeTimeType;
        }else if(newLeft < aliveLeft && (newRight ^ 0 + 1)>= (aliveLeft ^ 0) && newRight <= aliveRight){
            console.log("右交集 newLeft < aliveLeft < newRight < aliveRight");
          //  $(aliveTarget).remove();
            if(isSameType){
                shapeItem = new ShapeItem();
                shapeItem.startX = newLeft;
                shapeItem.endX = aliveRight;
                shapeItem.type = this.activeTimeType;
            }else{
                //绘制新图
                this.shape.drawShape(newRight, aliveRight, lineIndex,aliveType);
            }

        }else if(newLeft >= aliveLeft && ((newLeft ^ 0) - 1)  <= (aliveRight ^ 0) && newRight > aliveRight){
            console.log("左交集 aliveLeft =< newLeft < aliveRight < newRight");
         //   $(aliveTarget).remove();
            if(isSameType){
                shapeItem = new ShapeItem();
                shapeItem.startX = aliveLeft;
                shapeItem.endX = newRight;
                shapeItem.type = this.activeTimeType;
            }else{
                //绘制新图
                this.shape.drawShape(aliveLeft, newLeft, lineIndex,aliveType);
            }
        }else{
            console.log("无交集交集 (aliveLeft << aliveRight) << (newLeft << newRight） || (newLeft << newRight）<< (aliveLeft << aliveRight) ");
            return null;
        }

        console.log("已存在：："  + aliveLeft + "===="+ aliveRight);
        console.log("已存在：："  + (aliveLeft ^ 0) + "===="+ (aliveRight ^ 0));
        console.log("新：："  + newLeft + "===="+ newRight);
        console.log("新：："  + (newLeft ^ 0 + 1) + "===="+ (newRight ^ 0 + 1));
        console.log(isSameType?"同颜色":"不同颜色");
        console.log(shapeItem);
        return shapeItem;
    };

    // 根据 类型 圈 清除已存在 块
    clearShapeByType = (shapeType: string): void => {
        $('#drawShow>li>span').each((index: number, val: any)=> {
            if ($(val).attr(this.dataTimeTypeAttrName) === shapeType) {
                $(val).remove();
            }
        })
    };
    // 获取 已 圈画数据集合
    getDrawArea = (): TimeTemplateEx => {
        let timeTemplateEx = new TimeTemplateEx();

        timeTemplateEx.WeekItems = [] as  Array<WeekItem>;
        timeTemplateEx.DateItems = [] as  Array<DateItem>;

        let weekItem: WeekItem;

        let dateItem: DateItem;

        let timeItem: TimeItem;



        let divLiList = $('#drawShow>li');

        divLiList.each((liIndex: number, val: any)=> {

            if($(val).children().length > 0){
                if (liIndex < 7) {
                    weekItem = new WeekItem();
                    weekItem.DayOfWeek = $(val).attr("value");
                    weekItem.TimeItems = [] as Array<TimeItem>;
                    console.log(val);
                    $(val).children().each( (i: number, cval: any)=> {
                        console.log(cval);
                        console.log($(cval));
                        timeItem = new TimeItem();
                        timeItem.ThresholdType = $(cval).attr(this.dataTimeTypeAttrName);
                        timeItem.StarTime = $(cval).attr(this.dataTimeAttrName).split('-')[0] + ":00";
                        timeItem.EndTime = $(cval).attr(this.dataTimeAttrName).split('-')[1] + ":00";
                        weekItem.TimeItems.push(timeItem);
                    });
                    timeTemplateEx.WeekItems.push(weekItem);
                }else{
                    console.log(val);
                    dateItem = new DateItem();
                    dateItem.TimeItems = [] as Array<TimeItem>;
                    dateItem.StartDateOfItem = this.shape.defineLineList[liIndex-7].StartDateOfItem;
                    if(this.shape.defineLineList[liIndex-7].EndDateOfItem){
                        dateItem.EndDateOfItem = this.shape.defineLineList[liIndex-7].EndDateOfItem;
                    }
                    $(val).children().each( (i: number, cval: any)=> {
                        timeItem = new TimeItem();
                        timeItem.ThresholdType = $(cval).attr(this.dataTimeTypeAttrName);
                        timeItem.StarTime = $(cval).attr(this.dataTimeAttrName).split('-')[0] + ":00";
                        timeItem.EndTime = $(cval).attr(this.dataTimeAttrName).split('-')[1] + ":00";
                        dateItem.TimeItems.push(timeItem);
                    });
                    timeTemplateEx.DateItems.push(dateItem);
                }
            }

        });
        console.log("%c TODO ==========获取选择绘画结果。。。。", "color:blue");
        console.log(timeTemplateEx);
        return timeTemplateEx;
    }
    // 添加自定义行
    addGripLine = (lineStartDate:string,lineEndDate:string,lineInfo:string):string=>{
        //添加行
        let vmTimeDraw = this;
        //允许添加  this.selfTimes  条  可变参数
        if ($('#drawShow>li').length !== (vmTimeDraw.shape.selfTimes + vmTimeDraw.grid.rect)) {
            //添加自定义时段日期
            let St = lineStartDate; //开始时间
            let Et = lineEndDate;//结束时间
            // 时间有效验证
            let validateResult = this.validateCustomDate(St,Et);
            if(validateResult !==null){
                return validateResult;
            }
            //是否上限
            if ($('#drawShow>li').length === (vmTimeDraw.shape.selfTimes + vmTimeDraw.grid.rect)) {
                //超过上限
                console.log("超过上限");
                return "超过上限";
            }

            //追加一条显示行 li
            $('#drawShow').append(
                "<li value='" + $('#drawShow').find('li').length + "'></li>"
            );
            //增加一条圈选行
            vmTimeDraw.shape.resetDraw(1);
            let liHtmlStr = vmTimeDraw.getAddLineHtmlStr(St,Et);

            $('#timeTable .week').append(liHtmlStr);
            //查找新添加的li绑定删除事件
            $('.week>li:last-child>i').on('click', function(){
                let targetThis = this;
                vmTimeDraw.deleteDateItem(targetThis);
            });
            //存储已添加的时间段信息内容
            let dateItem = new DateItem();
            if(St){
                dateItem.StartDateOfItem = St;
            }
            if(Et){
                dateItem.EndDateOfItem = Et;
            }
            dateItem.DateName = lineInfo;
            vmTimeDraw.shape.defineLineList.push(dateItem);
            console.log(vmTimeDraw.shape.defineLineList);
            return "添加成功"
        }
    };

    // 删除自定数据行
    private deleteDateItem(target:any){
        console.log($(target).parents('li').index());
        //移除对应一条图形区域
        let n = $(target).parents('li').index();

        $('#drawShow li').eq(n).remove();
        //移除日期
        $(target).parents('li').remove();
        console.log($(target).parents('li'));

        console.log(this.shape.defineLineList);
        console.log(n-7);
        this.shape.defineLineList.splice(n-7,1);
        console.log(this.shape.defineLineList);
        //删除一条,重绘背景框
        this.shape.resetDraw(0);
    };

    // 判断 自定时间是否可用
    private validateCustomDate = (startDate:string,endDate:string):string =>{

        if(!startDate){
            return "开始时间不得为空";
        }
        //开始大于结束
        if (!!endDate && startDate > endDate) {
            console.log("开始大于结束");
            return "开始大于结束";
        }
        let oldStart:string;
        let oldEnd : string;
        //判断 newtime has?
        for (let i = 0; i < this.shape.defineLineList.length; i++) {
            //已添加的单日期时间
            oldStart = this.shape.defineLineList[i].StartDateOfItem;
            if (angular.isUndefined(this.shape.defineLineList[i].EndDateOfItem)) {
                if (startDate === oldStart) {
                    console.log("已添加的单日期时间 存在");
                    //存在
                    return "已添加的单日期时间 存在";
                }
            } else {
                oldEnd = this.shape.defineLineList[i].EndDateOfItem;
                //被包含\相等的情况
                if (oldStart <= startDate && startDate <= oldEnd || oldStart <= endDate && endDate <= oldEnd) {
                    console.log("被包含相等的情况");
                    //存在
                    return "被包含相等的情况";
                }
            }
        }
        return null;
    };
    // 添加行 html 拼接 li html
    private getAddLineHtmlStr = (startDate:string,endDate:string):string=>{
        //开始结束时间相同的情况只显示一个,只有开始时只显示一个
        //获取星期列表宽度
        let liWidth = $('.week').width();
        let liHeight = $('.week li').height();
        let vmTimeDraw = this;
        let htmlStr = "";

        let deleteBtnTitle = "删除";

        if (startDate === endDate || startDate && !endDate) {
            htmlStr =
                "<li class='position-r' style='width:"
                + liWidth + "px;height:"
                + liHeight + "px'><span>"
                + startDate
                + "</span><i style='right:"
                + (-vmTimeDraw.grid.gridW - 16 - 10 - 10) + "px;top:"
                + (vmTimeDraw.grid.rectH - 16) / 2 + "px' " +
                "class='position-a i-delete' title='" +
                deleteBtnTitle + "'></i></li>"
            ;
        } else {
            htmlStr =
                "<li class='position-r' style='width:" + liWidth + "px;height:" + liHeight + "px'>" +
                "<a style='top:" + liHeight / 3 + "px'>" + startDate + "</a>" +
                "<a style='top:" + liHeight / 4 * 3 + "px'>" + endDate +
                "</a><i style='right:" +
                (-vmTimeDraw.grid.gridW - 16 - 10 - 10) +
                "px;top:" +
                (vmTimeDraw.grid.rectH - 16) / 2 +
                "px' class='position-a i-delete' title='" +
                deleteBtnTitle + "'></i></li>"
            ;
        }
        return htmlStr;
    }
}

class ShapeItem{
    startX:number;
    endX:number;
    type:string;
}
