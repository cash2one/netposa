
import {TimeTemplateEx, WeekItem} from "../../../core/entity/ex/TimeTemplateEx";
export interface ITimeDrawGrid{
    //动态编辑数据
    gridW: number;//网格容器宽度
    gridLeft: number;//网格容器左边距
    rectTop: number;//条纹顶部空间距离
    line: number;//小时区间数
    rect: number;//初始显示时间条数
    lineOverflow: number;//网线顶部溢出长度
    defineShow: number;//允许显示的自定义时间条数
    //动态获取数据
    drawW: number;//绘图区域总宽度
    lineW: number;//竖向网线总宽
    lineH: number;//竖向网线总高
    rectW: number;//单个条纹宽
    rectH: number;//单个条纹高

    /** create by zxq
     *　初始化网格背景容器
     * @time: 2017-06-27 16:43:53
     * @params: currenRects 默认一周7天 ， 自定义数 + 7
     * @return:
     */
    init:(currenRects?:any)=>void;
    //绘制竖向网线
    drawLine: (total:number)=>void;
    //绘制横向条纹
    drawRect:(total:number)=>void;
}


export interface ITimeDrawShape{
    gridW: number;//网格容器的宽度
    liHeight: number;//绘制图形容器li的高度
    MSDOWN: boolean; //鼠标按下 true
    drawX1: number; // 起点
    drawY1: number; // 起点
    drawX2: number; //终点
    drawY2: number; //终点
    OSX: number;//偏移量X , 左 负 右 正
    OSY: number; //偏移量Y , 左 负 右 正
    DRAWED: boolean;//有选区绘制完成才允许绘制时间段 阻止时间设置框内鼠标移动造成误绘图
    li_0: number; //垂直方向起点 li n 向下取整 1 - 7
    li_n: number; // 垂直方向结束点 li n 向上取整 1-7
    sp: number;//当前行数 时间段 span 个数
    h1: number;//当前小时 起点
    m1: number;//当前分钟
    h2: number;//当前小时 结束点
    m2: number;//当前分钟
    timesStr: string;//存储未取舍过的时间数据，用于逆运算减少取舍误差
    selfTimes: number;//允许添加自定义时间段  手动配置
    defineLineList:Array<any>;//记录已添加的自定义时间段
    isTargetMSDOWN: boolean;//判断是否是直接绘图区域的鼠标事件

    //初始化绘制
    init:()=>void;
    //重绘网格区域
    resetDraw:(addOrReduce:number)=>void;

    _customLineDel:()=>void;
    //创建删除方法
    _defineDel:(addOrReduce:number)=>void;

    //设置时间
    setTime: (h1:number, m1:number, h2:number, m2:number, arr:Array<boolean>)=>void;
    //计算时间
    // return hh:mm-hh:mm
    timeCount:(start:number, end:number)=>string;
    // 时间补零显示 ，小于10 添加 " 0 "
    concatStr: (num:number)=>string;
    //时间  逆运算 当前图形 变化参数 同时重新绘制
    timeCountReverse:(h1:number, m1:number, h2:number, m2:number)=>void;

    //修改激活目标图像
    alterActive: (x1:number, x2:number)=>void;
    //鼠标按下确认
    MSdown: (e:any)=>void;
    //鼠标按下并移动绘制
    MSmove: (e:any)=>void;
    //鼠标弹起结束绘制
    MSup: (e:any)=>void;
    //鼠标离开有效停止绘制
    MSout: (e:any)=>void;
    //调换绘制事件图层顺序
    zIndex: (z:number)=>void;
    //范围选框绘制  div 定位初始化 top : 0   left : 0
    drawarea: ()=>void;
    //重置范围选框属性
    resetBox:()=>void;
    //在目标范围内的li内添加矩形span
    addRect:()=>void;
    //绘制时间段
    drawTime: (start:number, end:number)=>void;

    //绘制单个 span 图形
    drawShape: (x1:number, x2:number, li_n:number,timeType:string)=>void;
    deleteWEmpty: (li_n:number)=>void;
    /* 单行内绘制全部  包含、被包含、左交集、右交集
     * @param x1            起点坐标
     * @param x2            终点坐标
     * @param sta           目标操作行
     * @param action        执行动作  newShape 新绘制； alter修改
     * @param alterTarget   修改目标(jQ)
     */
    drawShapeInLine: (x1:number, x2:number, sta:any, action:string, alterTarget:any)=>void;
    //清空所有时间图形
    clearShape:()=>void;
}



export interface ITimeDraw{
    grid:ITimeDrawGrid;
    shape:ITimeDrawShape;

    drawByWeekItems:(weekItems:Array<WeekItem>)=>void;
}

