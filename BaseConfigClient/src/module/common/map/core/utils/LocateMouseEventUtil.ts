/**
 * Created by dell on 2017/5/3.
 */
declare var angular: any;
/**
 * 拖拽鼠标移动事件模组(工具)
 * 由于同一时间肯定只有一个鼠标拖动事件, 故此class中的方法都是静态的
 */
declare let require: any;
import "es6-promise";
var Promise = require("es6-promise");
export class LocateMouseEventUtil {

    private isDrag = false;
    private resolve: any;
    private reject: any;
    private mapAdapter: IMapAdapter;
    private mapId: string;
    private mouseMoveDom: any;

    constructor(mapAdapter: IMapAdapter, mapId: string) {
        this.mapAdapter = mapAdapter;
        this.mapId = mapId; // 获取地图container时用
    }

    /**
     * 程序入口及出口
     * @param message
     */
    public startDrag(message: string) {
        // 先取消上一次
        if (this.isDrag) {
            console.log("上次拖拽还未取消,故先取消");
            this.endDrag();
        }
        return new Promise((resolve: any, reject: any)=> {
            this.isDrag = true;
            this.resolve = resolve;
            this.reject = reject;
            // 绑定鼠标
            var _body = angular.element("body");
            _body.on("mousemove.locate", this.onMouseMove);
            _body.on("mouseup.locate", this.onMouseUp);
            _body.css("cursor", "pointer");
            this.mapAdapter.setCursor("pointer");
            this.initMouseMoveDom(message);
        });
    }

    private endDrag(point?: NPMapLib.Geometry.Point) {
        this.mapAdapter.removeEventListener(NPMapLib.MAP_EVENT_MOUSE_MOVE);
        this.mapAdapter.setCursor("auto");
        console.log("成功解绑地图事件");
        // 绑定鼠标
        var _body = angular.element("body");
        // 解绑鼠标
        _body.off("mousemove.locate");
        _body.off("mouseup.locate");
        _body.css("cursor", "auto");
        this.removeMouseMovDom();
        this.isDrag = false;

        setTimeout(()=> {
            if (this.resolve) {
                this.resolve(point);
            }
            this.resolve = null;
            this.reject = null;
        });
    }

    private onMouseMove = (event: MouseEvent) => {
        // 获取相对浏览器窗口的位置
        let clientX = event.clientX;
        let clientY = event.clientY;
        let _body = angular.element("body");
        let scrollX = _body.scrollLeft();
        let scrollY = _body.scrollTop();
        this.setMouseMoveDomPosition(event.clientX + scrollX, event.clientY + scrollY);
    };

    private onMouseUp = (event: MouseEvent) => {
        console.log("鼠标抬起", event);
        var point = this.getCurrentMouseMapPoint(event.clientX, event.clientY);
        this.endDrag(point);
        // 取消冒泡
        return false;
    };


    private initMouseMoveDom(msg: string) {
        this.removeMouseMovDom();
        var dom = angular.element("<div style='position: absolute; height: 28px; line-height: 28px; background-color: #66ccff;color:#fff; z-index: 10000;padding:0 6px'>" + msg + "</div>");
        dom.css({"left": "-1000px", "top": "-1000px"});
        var _body = angular.element("body");
        _body.append(dom);
        this.mouseMoveDom = dom;
    }

    private setMouseMoveDomPosition(left: number, top: number) {
        if (this.mouseMoveDom) {
            this.mouseMoveDom.css({top: top + "px", left: left + "px"});
        }
    }

    private removeMouseMovDom() {
        if (this.mouseMoveDom) {
            this.mouseMoveDom.remove();
        }
    }

    private getCurrentMouseMapPoint(clientX: number, clientY: number): NPMapLib.Geometry.Point {
        console.log("当前鼠标的位置为", clientX, clientY);
        // 减去地图控件的相对位置 获得真实的鼠标方位
        let _container = angular.element("#" + this.mapId);
        let _offset = _container.offset();
        let _body = angular.element("body");
        let _scrollTop = _body.scrollTop();
        let _scrollLeft = _body.scrollLeft();
        let _targetClientX = _scrollLeft + clientX - _offset.left;
        let _targetClientY = _scrollTop + clientY - _offset.top;
        let result = null;
        let _pixel = null;
        console.log("获取到的地图控件内位置为", _targetClientX, _targetClientY);
        if (_targetClientX >= 0 && _targetClientY >= 0) {
            // 只有大于0才表示鼠标在地图控件内, 这里只判断了向左， 未判断向右
            let _pixel = new NPMapLib.Geometry.Pixel(_targetClientX, _targetClientY);
            result = this.mapAdapter.pixelToPoint(_pixel);
        }else{
            console.log("获取点位不在地图控件内");
        }
        console.log("最终转换为的point为", result);
        return result;
    }
}