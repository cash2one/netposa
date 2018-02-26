/**
 * Created by Liubo on 2017/9/22 0022.
 */
import {app} from "../../common/app/main.app";
import 'jquery'
declare let $: any;
import 'css!./style/callPoint.css';
class callPoliceController {
    static $inject = ['$scope', '$timeout', '$interval','mylayer'];
    canvas:any ;
    ctx:any ;
    percent:number = 90.0; // 最终百分比
    circleX:number; // 中心x坐标
    circleY:number; // 中心y坐标
    radius:number = 60; // 圆环半径
    lineWidth:number = 8; // 圆形线条的宽度
    fontSize:number = 30; // 字体大小
    process:any = this.percent;
    timer:any;
    layerId:string;
    leftImg:string = '../../../images/mock/alarm/alarm1.png';
    rightImg:string = '../../../images/mock/alarm/alarm2.png';
    constructor (private $scope:any, private $timeout: Function, private $interval: any,private mylayer :any) {
        this.layerId = $scope.ID;
        window.setTimeout(()=>{
            this.canvas = document.getElementById("canvas");
            this.ctx = this.canvas.getContext('2d');
            this.circleX = this.canvas.width / 2;
            this.circleY = this.canvas.height / 2;
            this.loading()
        });
    }
     circle(cx:number, cy:number, r:number, canvas: CanvasRenderingContext2D) {
        let ctx = canvas;
        ctx.beginPath();
        ctx.moveTo(cx + r, cy);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = '#383d45';
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();
    }
    exit(){
        this.mylayer.close(this.layerId);
    }
     sector(cx:number, cy:number, r:number, startAngle:number, endAngle:number) {
        let ctx:any = this.ctx;
        ctx.beginPath();
    //                ctx.moveTo(cx, cy + r); // 从圆形底部开始画
        ctx.lineWidth = this.lineWidth;
        // 渐变色 - 可自定义
        // let linGrad = ctx.createLinearGradient(
        //     this.circleX, a, this.circleX, this.circleY + this.radius + this.lineWidth
        // );
         let linGrad = ctx.createLinearGradient(
            70,40,70,100
         );
        linGrad.addColorStop(0.0, '#fcaa01');
        linGrad.addColorStop(1.0, '#1cbe6f');
        ctx.strokeStyle = linGrad;
        // 圆弧两端的样式
        ctx.lineCap = 'round';
         //圆弧
        ctx.arc(
            cx, cy, r,
            startAngle * (Math.PI / 180.0) + (Math.PI *1.5),
            endAngle * (Math.PI / 180.0) + (Math.PI * 1.5)
        );
        ctx.stroke();
    }
    loading () {
        let ctx:any = this.ctx;
        ctx.clearRect(0, 0, this.circleX * 2, this.circleY * 2);
        ctx.font = this.fontSize + 'px April';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#fff';
        ctx.fillText(parseFloat(this.process).toFixed(0) + '%', this.circleX, this.circleY);
        this.circle(this.circleX, this.circleY, this.radius,ctx);
        this.sector(this.circleX, this.circleY, this.radius, 0, this.process / 100 * 360);
    }
}

app.controller('callPoliceController',callPoliceController);