import {app} from '../../app/main.app';
class UtilImgCtrlSizeDirective {
    static $inject:any = [];
    constructor() {};

    static instance() {
        return new UtilImgCtrlSizeDirective();
    };
    restrict: string = 'A';
    scope = {

    };
    link = function (scope: any, element: any, attrs: any) {
        element.bind('load', function() {
            attrs.$set("style","");
            let p_w = element.parent().width();
            let p_h = element.parent().height();
            let w = element.width();
            let h = element.height();
            let p_c_w = p_w/w;
            let p_c_h = p_h/h;

            if(w > p_w && h > p_h){
                if( p_c_w > p_c_h){
                    element.css("height","100%");
                }else{
                    element.css({
                        "width":"100%",
                        "padding-top":(p_h - p_c_w *h)/2 + "px"
                    });
                }
            }else if(w > p_w){
                element.css({
                    "width":"100%",
                    "padding-top":(p_h - p_c_w *h)/2 + "px"
                });
            }else if(h > p_h){
                element.css("height","100%");
            }else{
                element.css({
                    "padding-top":(p_h-h)/2 + "px"
                })
            }
            element.parent().css({
                'text-align': 'center',
            });
        })
    };
}

class UtilImgCenterDirective {
    static $inject: any = [];

    constructor() {
    };

    static instance() {
        return new UtilImgCenterDirective();
    };

    restrict: string = 'A';
    link = function (scope: any, element: any, attrs: any) {
        element.css({"opacity":0});
        element.on('load', function () {
            attrs.$set("style", "");
            let position: string = element.parent().css('position');
            if (position === 'static') {
                element.parent().css('position', 'relative')
            }

            let p_w: number = element.parent().width(); // 容器宽度
            let p_h: number = element.parent().height(); // 容器高度
            let w: number = element[0].naturalWidth; // 图片实际宽度
            let h: number = element[0].naturalHeight; // 图片实际高度
            let p_c_w = p_w / w; // 容器与图片的宽比例
            let p_c_h = p_h / h;  // 容器与图片的高比例
            
            if (p_w < w && p_h < h) {
                // 容器宽度小于图片实际宽度 容器高度小于图片实际高度
                if (p_c_w > p_c_h) {
                    // 容器与图片的宽比例 大于 容器与图片的高比例
                    // 等比例缩放当然情况下 高是最后才进容器的
                    // 说明需要 高度固定, 宽度自适应
                    element.css({
                        "height": "100%",
                        'position': 'absolute',
                        'left': '50%',
                        'top': '0',
                        'marginLeft': -(w * p_c_h / 2) + 'px'
                    });

                } else {
                    element.css({

                        "width": "100%",
                        'position': 'absolute',
                        'left': '0',
                        'top': '50%',
                        'marginTop': -(h * p_c_w / 2) + 'px'
                    });
                }
            } else if (p_w < w && p_h > h) {
                element.css({
                    "width": "100%",
                    'position': 'absolute',
                    'top': '50%',
                    'left': '0',
                    'marginTop': -(h * p_c_w / 2) + 'px'
                });

            } else if (p_w > w && p_h < h) {
                element.css({
                    "height": "100%",
                    'position': 'absolute',
                    'left': '50%',
                    'top': '0',
                    'marginLeft': -(w * p_c_h / 2) + 'px'
                });
            } else {
                // 容器宽度大于图片实际宽度 容器高度大于图片实际高度
                if (p_c_w > p_c_h) {
                   // 容器与图片的宽比例 大于 容器与图片的高比例
                   // 说明在等比例缩放情况下，最先顶到容器的是高, 所以高固定, 宽度自适应
                   element.css({
                        "height": "100%",
                        'position': 'absolute',
                        'left': '50%',
                        'top': '0',
                        'marginLeft': -(w * p_c_h / 2) + 'px'
                    });
                }else{
                    element.css({
                        "width": "100%",
                        'position': 'absolute',
                        'top': '50%',
                        'left': '0',
                        'marginTop': -(h * p_c_w / 2) + 'px'
                    });
                }
            }
            element.parent().css('backgroundColor', 'rgba(0,0,0,0.8)')
        });
        scope.$on("$destroy", function () {
            element.off();
        });
    };
}

app.directive('utilImgCtrlSize' , UtilImgCtrlSizeDirective.instance);
app.directive('utilImgCenter' , UtilImgCenterDirective.instance);