import 'angular'
declare let angular: any, $: any;
export class IAreaAndPosition {
    left: number;
    top: number;
    width: number;
    height: number;
    zIndex:number;
}

export class layerOpenParams {
    content: string;
    scope?: any;
    AreaAndPosition?: IAreaAndPosition;
    end?: Function;
    ID:string;
}

function MylayerFactory($rootScope: any, $compile: any, $timeout: any, $q: any, $http: any) {
    let _this = this as any;
    _this.options = {} as layerOpenParams;
    _this.open = (options: layerOpenParams)=>{
        let ele = document.getElementById(`mylayer${options.ID}`);

        if(ele !== null){
            console.error(`LayerID:${options.ID}重复`);
            document.body.removeChild(ele);
            ele = null;
        }

        let left: number = options.AreaAndPosition.left || 0;
        let top = options.AreaAndPosition.top || 0;
        let width = options.AreaAndPosition.width || 100;
        let height = options.AreaAndPosition.height || 100;
        let zIndex = options.AreaAndPosition.zIndex || 999;
        let injectScope = options.scope || $rootScope.$new();
        let $body = $('body');
        $body.append(`
            <div id="mylayer${options.ID}" style="display:none;position: absolute;z-index:999">
                <!--<iframe class='f-abs u-iframe-layer' style="position: absolute; width: 100%; height: 100%; z-index:0;top: 0;left: 0;"></iframe>-->
                <div class="mylayer-content">${options.content}</div>
            </div>`);
        $body.find(`#mylayer${options.ID}`).css({
            left: left,
            top: top,
            width: width,
            height: height,
            opacity:1,
            zIndex: zIndex
        });
        let $content= $body.find(`#mylayer${options.ID}`);
        let _domStr  = $compile($content[0].outerHTML)(injectScope);
        $content.replaceWith(_domStr);
        injectScope.$on("$destroy",function(){
            _domStr.remove();
            _domStr = null;
            injectScope = null;
        });
        $(`#mylayer${options.ID}`).fadeIn(500).find('.mylayer-close').on('click',()=>{
            _this.close(options.ID)
        });
        _this.options = options;

        // window.setInterval(()=>{
        //     this.resize({
        //         left: Math.random() * 500,
        //         top: Math.random() * 500,
        //         width: Math.random() * 500,
        //         height: Math.random() * 500,
        //     },'populCamera')
        // },2000)
    };


    _this.close = (ID: string) => {
        if (_this.options.end) {
            _this.options.end();
        }
        // let $content = $(`#mylayer${ID}`);
        // let $win = $(window);
        // $content.animate({
        //     left: $win.width(),
        //     top: $win.height(),
        //     width: 0,
        //     height: 0,
        //     opacity:0
        // }, 'slow',function () {
        //     $(this).remove();
        // });
        $(`#mylayer${ID}`).fadeOut(200,function () {
            $(this).remove();
        })
    };

    _this.resize = (params: IAreaAndPosition,ID:string) => {
        let left = params.left || _this.options.left;
        let top = params.top || _this.options.top;
        let width = params.width || _this.options.width;
        let height = params.height || _this.options.height;
        let $content = $(`#mylayer${ID}`);

        $content.animate({
            left: left,
            top: top,
            width: width,
            height: height
        }, 500);
    };
    _this.destroy = () =>{
        let eles = $('body').find('.mylayer-content');
        eles.each(function(item:Element){
            $(this).parent().remove();
        })
    };
    return _this;
}

angular
    .module('ng-mylayer', [])
    .factory('mylayer', MylayerFactory);