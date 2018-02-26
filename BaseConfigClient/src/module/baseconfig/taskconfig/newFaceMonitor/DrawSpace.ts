declare let $: any;
declare let angular: any;

class IDrawSpaceParent {
    width: number = null;
    height: number = null;
    nowEl: string = null;
    type: string = null;
}

class IDrawSpacePoint {
    x: number = null;
    y: number = null
}

class IDrawSpacePosition {
    width: number = null;
    height: number = null;
    top: number = null;
    left: number = null;
}

export class IDrawSpacePositionTop {
    max: IDrawSpacePosition = new IDrawSpacePosition();
    min: IDrawSpacePosition = new IDrawSpacePosition();
    area: IDrawSpacePosition = new IDrawSpacePosition();
}

export class IScale {
    XScale: number = 1;
    YScale: number = 1;
}

export class IOptions {
    parent: IDrawSpaceParent = new IDrawSpaceParent();
    startPoint: IDrawSpacePoint = new IDrawSpacePoint();
    endPoint: IDrawSpacePoint = new IDrawSpacePoint();
    position: IDrawSpacePositionTop = new IDrawSpacePositionTop();
    scale: IScale = new IScale();
}

export interface IDrawSpace {
    getPosition(): IDrawSpacePositionTop;

    getDefaultOptions(): IOptions

    resetPositionSize(): boolean;

    resetPositionArea(): boolean;

    isOpenAreaSetting(falag: boolean): boolean;

    setImage(path: string): boolean;

    isShowAreaSpace(flag: boolean): void;

    setScale(scale: IScale): void;

    destroyDraw(): void;
}

export class DrawSpace implements IDrawSpace {
    private options: IOptions;
    private defaultOptions: IOptions;

    constructor() {
        this.options = DrawSpace.initParams();
        this.defaultOptions = angular.copy(this.options);
        this.inintEvent();
    }

    destroyDraw() {
        let $parent = $('#draw-space');
    }

    getDefaultOptions(): IOptions {
        return angular.copy(this.defaultOptions);
    }

    setScale(scale: IScale): void {
        this.options.scale.XScale = scale.XScale;
        this.options.scale.YScale = scale.YScale;
        console.log(this.defaultOptions.position.area.width*scale.XScale);
        $('#draw-space').find('.space-text').text(`布控区域：${Math.round(this.defaultOptions.position.area.width * scale.XScale)}*${Math.round(this.defaultOptions.position.area.height * scale.YScale)}`);
    }

    setImage(path: string): boolean {
        if (path && path.indexOf('Error') === -1) {
            let $area = $('#draw-space');
            if ($area.find('img').length > 0) {
                $area.find('img').attr('src', path)
            } else {
                $area.append(`<img style="width: 100%;height:100%" src="${path}" style="position: absolute;left: 0;top: 0;"/>`);
            }
            return true
        }
        return false;
    }

    isShowAreaSpace(flag: boolean): void {
        if (flag) {
            $('#draw-space').show()
        } else {
            $('#draw-space').hide()
        }
    }

    resetPositionArea(): boolean {
        let $parent = $('#draw-space');
        let $area = $parent.find('.space-area');
        let $areaText = $parent.find('.space-text');
        $area.css({
            width: this.defaultOptions.position.area.width,
            height: this.defaultOptions.position.area.height,
            left: this.defaultOptions.position.area.left,
            top: this.defaultOptions.position.area.top,
        });
        $areaText.text(`布控区域：${Math.round(this.defaultOptions.position.area.width * this.options.scale.YScale)}*${Math.round(this.defaultOptions.position.area.height * this.options.scale.YScale)}`);
        return true;
    }

    resetPositionSize(): boolean {
        let $parent = $('#draw-space');
        let $childMax = $parent.find('.child-max');
        let $childMaxText = $parent.find('.max-text');
        let $childMin = $parent.find('.child-min');
        let $childMinText = $parent.find('.min-text');

        $childMax.css({
            width: this.defaultOptions.position.max.width,
            height: this.defaultOptions.position.max.height,
            left: this.defaultOptions.position.max.left,
            top: this.defaultOptions.position.max.top,
        });
        $childMin.css({
            width: this.defaultOptions.position.min.width,
            height: this.defaultOptions.position.min.height,
            left: this.defaultOptions.position.min.left,
            top: this.defaultOptions.position.min.top,
        });
        $childMaxText.text(`大：${this.defaultOptions.position.max.width}*${this.defaultOptions.position.max.width}`);
        $childMinText.text(`小：${this.defaultOptions.position.min.width}*${this.defaultOptions.position.min.width}`);
        return true
    }

    isOpenAreaSetting(flag: boolean): boolean {
        if (flag) {
            $('#draw-space').find('.circle-space').show();
        } else {
            $('#draw-space').find('.circle-space').hide();
        }
        return true
    }

    getPosition(): IDrawSpacePositionTop {
        return angular.copy(this.options.position);
    }

    private inintEvent() {
        let _self: DrawSpace = this;
        let $parent = $('#draw-space');
        let $childMax = $parent.find('.child-max');
        let $childMaxText = $parent.find('.max-text');
        let $childMin = $parent.find('.child-min');
        let $childMinText = $parent.find('.min-text');
        let $area = $parent.find('.space-area');
        let $areaText = $parent.find('.space-text');
        $parent.on('mouseup', function (event: MouseEvent) {
            _self.options.endPoint.x = event.pageX;
            _self.options.endPoint.y = event.pageY;
            _self.options.parent.nowEl = null;
            _self.options.parent.type = null;
            let res = DrawSpace.initParams();
            _self.options.position = res.position;
        }.bind(this));
        $parent.on('mousedown', function (event: MouseEvent) {
            event.preventDefault();
            event.stopPropagation();
            _self.options.startPoint.x = event.pageX;
            _self.options.startPoint.y = event.pageY;
            if ($(event.target).hasClass('circle-lt')) {
                _self.options.parent.nowEl = 'space-area';
                _self.options.parent.type = 'changeAreaLf';
            }
            if ($(event.target).hasClass('circle-rb')) {
                _self.options.parent.nowEl = 'space-area';
                _self.options.parent.type = 'changeAreaRb';
            }
            if ($(event.target).hasClass('child-min')) {
                _self.options.parent.nowEl = 'child-min';
                _self.options.parent.type = 'changePosition';
            }
            if ($(event.target).hasClass('child-max')) {
                _self.options.parent.nowEl = 'child-max';
                _self.options.parent.type = 'changePosition';
            }
            if ($(event.target).hasClass('circle-max')) {
                _self.options.parent.nowEl = 'child-max';
                _self.options.parent.type = 'changeSize'
            }
            if ($(event.target).hasClass('circle-min')) {
                _self.options.parent.nowEl = 'child-min';
                _self.options.parent.type = 'changeSize'
            }

        }.bind(this));

        $parent.on('mousemove', function (event: MouseEvent) {
            _self.options.endPoint.x = event.pageX;
            _self.options.endPoint.y = event.pageY;
            if (_self.options.parent.nowEl === 'child-max') {
                if (_self.options.parent.type === 'changeSize') {
                    let size = _self.options.position.max.width + (_self.options.endPoint.x - _self.options.startPoint.x);
                    if (size >= 200) {
                        size = 200;
                    } else if (size <= 60) {
                        size = 60;
                    }
                    $childMax.css({'width': size, 'height': size});
                    $childMaxText.text(`大：${size}*${size}`)
                } else {
                    let x = _self.options.endPoint.x - $parent.offset().left - Math.ceil($childMax.outerWidth() / 2);
                    let y = _self.options.endPoint.y - $parent.offset().top - Math.ceil($childMax.outerHeight() / 2);
                    let maxleft = $parent.outerWidth() - $childMax.outerWidth();
                    let maxTop = $parent.outerHeight() - $childMax.outerHeight();
                    if (x > 0 && y > 0 && x < maxleft && y < maxTop) {
                        $childMax.css({left: x, top: y})
                    }
                    if (x <= 0) {
                        $childMax.css({left: 1})
                    }
                    if (x >= maxleft) {
                        $childMax.css({left: maxleft - 1})
                    }
                    if (y <= 0) {
                        $childMax.css({top: 1})
                    }
                    if (y >= maxTop) {
                        $childMax.css({top: maxTop - 1})
                    }
                }

            }
            if (_self.options.parent.nowEl === 'child-min') {
                if (_self.options.parent.type === 'changeSize') {
                    let size = _self.options.position.min.width + (_self.options.endPoint.x - _self.options.startPoint.x);
                    if (size >= 200) {
                        size = 200
                    } else if (size <= 60) {
                        size = 60
                    }
                    $childMin.css({'width': size, 'height': size});
                    $childMinText.text(`小：${size}*${size}`)
                } else {
                    let x = _self.options.endPoint.x - $parent.offset().left - Math.ceil($childMin.outerWidth() / 2);
                    let y = _self.options.endPoint.y - $parent.offset().top - Math.ceil($childMin.outerHeight() / 2);
                    let maxleft = $parent.outerWidth() - $childMin.outerWidth();
                    let maxTop = $parent.outerHeight() - $childMin.outerHeight();

                    if (x > 0 && y > 0 && x < maxleft && y < maxTop) {
                        $childMin.css({left: x, top: y})
                    }
                    if (x <= 0) {
                        $childMin.css({left: 1})
                    }
                    if (x >= maxleft) {
                        $childMin.css({left: maxleft - 1})
                    }
                    if (y <= 0) {
                        $childMin.css({top: 1})
                    }
                    if (y >= maxTop) {
                        $childMin.css({top: maxTop - 1})
                    }
                }


            }

            if (_self.options.parent.nowEl === 'space-area') {
                if (_self.options.parent.type === 'changeAreaLf') {
                    let l, t, nw, nh, width, height, left, top;
                    l = _self.options.endPoint.x - _self.options.startPoint.x;
                    t = _self.options.endPoint.y - _self.options.startPoint.y;
                    nw = _self.options.position.area.width;
                    nh = _self.options.position.area.height;
                    if (_self.options.endPoint.x > _self.options.startPoint.x && _self.options.endPoint.y > _self.options.startPoint.y) {
                        console.log('结束x大于开始x，结束y大于开始y');
                        width = nw - l;
                        height = nh - t;
                        left = _self.options.position.area.left + Math.abs(l);
                        top = _self.options.position.area.top + Math.abs(t);

                    } else if (_self.options.endPoint.x > _self.options.startPoint.x && _self.options.endPoint.y < _self.options.startPoint.y) {
                        console.log('结束x大于开始x，结束y小于开始y');
                        width = nw - l;
                        height = nh + t;
                        left = _self.options.position.area.left + Math.abs(l);
                        top = _self.options.position.area.top - Math.abs(t);
                    } else if (_self.options.endPoint.x < _self.options.startPoint.x && _self.options.endPoint.y < _self.options.startPoint.y) {
                        console.log('结束x小于开始x，结束y小于开始y');
                        width = nw + Math.abs(l);
                        height = nh + Math.abs(t);
                        left = _self.options.position.area.left - Math.abs(l);
                        top = _self.options.position.area.top - Math.abs(t);
                    } else if (_self.options.endPoint.x < _self.options.startPoint.x && _self.options.endPoint.y > _self.options.startPoint.y) {
                        console.log('结束x小于开始x，结束y大于开始y');
                        width = nw - l;
                        height = nh + t;
                        left = _self.options.position.area.left - Math.abs(l);
                        top = _self.options.position.area.top + Math.abs(t);
                    } else {
                        width = nw;
                        height = nh;
                        left = _self.options.position.area.left;
                        top = _self.options.position.area.top;
                    }
                    if (width >= _self.options.parent.width) {
                        width = _self.options.parent.width;
                        left = 0;
                    }
                    if (height >= _self.options.parent.height) {
                        height = _self.options.parent.height;
                        top = 0;
                    }
                    if (left <= 0) {
                        left = 0
                    }
                    if (top <= 0) {
                        top = 0;
                    }
                    $area.css({width: width, height: height, left: left, top: top});
                    $areaText.text(`布控区域：${Math.round(width * _self.options.scale.XScale)}*${Math.round(height * _self.options.scale.YScale)}`)
                }
                if (_self.options.parent.type === 'changeAreaRb') {
                    let l, t, nw, nh, width, height;
                    l = _self.options.startPoint.x - _self.options.endPoint.x;
                    t = _self.options.startPoint.y - _self.options.endPoint.y;
                    nw = _self.options.position.area.width;
                    nh = _self.options.position.area.height;

                    if (_self.options.startPoint.x > _self.options.endPoint.x && _self.options.startPoint.y > _self.options.endPoint.y) {
                        console.log('开始x大于结束x，开始y大于结束y');
                        width = nw - Math.abs(l);
                        height = nh - Math.abs(t);
                    } else if (_self.options.startPoint.x > _self.options.endPoint.x && _self.options.startPoint.y < _self.options.endPoint.y) {
                        console.log('开始x大于结束x，开始y小于结束y');
                        width = nw - Math.abs(l);
                        height = nh + Math.abs(t);

                    } else if (_self.options.startPoint.x < _self.options.endPoint.x && _self.options.startPoint.y < _self.options.endPoint.y) {
                        console.log('开始x小于结束x，开始y小于结束y');
                        width = nw + Math.abs(l);
                        height = nh + Math.abs(t);

                    } else if (_self.options.startPoint.x < _self.options.endPoint.x && _self.options.startPoint.y > _self.options.endPoint.y) {
                        console.log('开始x小于结束x，开始y大于结束y');
                        width = nw - Math.abs(l);
                        height = nh + Math.abs(t);
                    } else {
                        width = nw;
                        height = nh;
                    }
                    if ((width + _self.options.position.area.left) >= _self.options.parent.width) {
                        width = _self.options.parent.width - _self.options.position.area.left
                    }
                    if ((height + _self.options.position.area.top) >= _self.options.parent.height) {
                        height = _self.options.parent.height - _self.options.position.area.top
                    }

                    $area.css({width: width, height: height});
                    $areaText.text(`布控区域：${Math.round(width * _self.options.scale.XScale)}*${Math.round(height * _self.options.scale.YScale)}`)
                }
            }
        }.bind(this))
    }

    static initParams(): IOptions {
        let $parent = $('#draw-space');

        let $childMax = $parent.find('.child-max');
        let $childMin = $parent.find('.child-min');
        let $area = $parent.find('.space-area');
        let result = new IOptions();
        result.parent.width = $parent.outerWidth();
        result.parent.height = $parent.outerHeight();
        result.parent.nowEl = null;
        result.parent.type = null;
        result.startPoint.x = null;
        result.startPoint.y = null;
        result.endPoint.x = null;
        result.endPoint.y = null;
        result.position.max.width = $childMax.outerWidth();
        result.position.max.height = $childMax.outerHeight();
        result.position.max.top = $childMax.position().top;
        result.position.max.left = $childMax.position().left;
        result.position.min.width = $childMin.outerWidth();
        result.position.min.height = $childMin.outerHeight();
        result.position.min.top = $childMin.position().top;
        result.position.min.left = $childMin.position().left;
        result.position.area.width = $area.outerWidth();
        result.position.area.height = $area.outerHeight();
        result.position.area.top = $area.position().top;
        result.position.area.left = $area.position().left;
        result.scale.XScale = 1;
        result.scale.YScale = 1;
        return result;
    }
}