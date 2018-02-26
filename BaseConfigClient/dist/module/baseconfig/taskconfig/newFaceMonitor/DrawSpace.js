define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IDrawSpaceParent = (function () {
        function IDrawSpaceParent() {
            this.width = null;
            this.height = null;
            this.nowEl = null;
            this.type = null;
        }
        return IDrawSpaceParent;
    }());
    var IDrawSpacePoint = (function () {
        function IDrawSpacePoint() {
            this.x = null;
            this.y = null;
        }
        return IDrawSpacePoint;
    }());
    var IDrawSpacePosition = (function () {
        function IDrawSpacePosition() {
            this.width = null;
            this.height = null;
            this.top = null;
            this.left = null;
        }
        return IDrawSpacePosition;
    }());
    var IDrawSpacePositionTop = (function () {
        function IDrawSpacePositionTop() {
            this.max = new IDrawSpacePosition();
            this.min = new IDrawSpacePosition();
            this.area = new IDrawSpacePosition();
        }
        return IDrawSpacePositionTop;
    }());
    exports.IDrawSpacePositionTop = IDrawSpacePositionTop;
    var IScale = (function () {
        function IScale() {
            this.XScale = 1;
            this.YScale = 1;
        }
        return IScale;
    }());
    exports.IScale = IScale;
    var IOptions = (function () {
        function IOptions() {
            this.parent = new IDrawSpaceParent();
            this.startPoint = new IDrawSpacePoint();
            this.endPoint = new IDrawSpacePoint();
            this.position = new IDrawSpacePositionTop();
            this.scale = new IScale();
        }
        return IOptions;
    }());
    exports.IOptions = IOptions;
    var DrawSpace = (function () {
        function DrawSpace() {
            this.options = DrawSpace.initParams();
            this.defaultOptions = angular.copy(this.options);
            this.inintEvent();
        }
        DrawSpace.prototype.destroyDraw = function () {
            var $parent = $('#draw-space');
        };
        DrawSpace.prototype.getDefaultOptions = function () {
            return angular.copy(this.defaultOptions);
        };
        DrawSpace.prototype.setScale = function (scale) {
            this.options.scale.XScale = scale.XScale;
            this.options.scale.YScale = scale.YScale;
            console.log(this.defaultOptions.position.area.width * scale.XScale);
            $('#draw-space').find('.space-text').text("\u5E03\u63A7\u533A\u57DF\uFF1A" + Math.round(this.defaultOptions.position.area.width * scale.XScale) + "*" + Math.round(this.defaultOptions.position.area.height * scale.YScale));
        };
        DrawSpace.prototype.setImage = function (path) {
            if (path && path.indexOf('Error') === -1) {
                var $area = $('#draw-space');
                if ($area.find('img').length > 0) {
                    $area.find('img').attr('src', path);
                }
                else {
                    $area.append("<img style=\"width: 100%;height:100%\" src=\"" + path + "\" style=\"position: absolute;left: 0;top: 0;\"/>");
                }
                return true;
            }
            return false;
        };
        DrawSpace.prototype.isShowAreaSpace = function (flag) {
            if (flag) {
                $('#draw-space').show();
            }
            else {
                $('#draw-space').hide();
            }
        };
        DrawSpace.prototype.resetPositionArea = function () {
            var $parent = $('#draw-space');
            var $area = $parent.find('.space-area');
            var $areaText = $parent.find('.space-text');
            $area.css({
                width: this.defaultOptions.position.area.width,
                height: this.defaultOptions.position.area.height,
                left: this.defaultOptions.position.area.left,
                top: this.defaultOptions.position.area.top,
            });
            $areaText.text("\u5E03\u63A7\u533A\u57DF\uFF1A" + Math.round(this.defaultOptions.position.area.width * this.options.scale.YScale) + "*" + Math.round(this.defaultOptions.position.area.height * this.options.scale.YScale));
            return true;
        };
        DrawSpace.prototype.resetPositionSize = function () {
            var $parent = $('#draw-space');
            var $childMax = $parent.find('.child-max');
            var $childMaxText = $parent.find('.max-text');
            var $childMin = $parent.find('.child-min');
            var $childMinText = $parent.find('.min-text');
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
            $childMaxText.text("\u5927\uFF1A" + this.defaultOptions.position.max.width + "*" + this.defaultOptions.position.max.width);
            $childMinText.text("\u5C0F\uFF1A" + this.defaultOptions.position.min.width + "*" + this.defaultOptions.position.min.width);
            return true;
        };
        DrawSpace.prototype.isOpenAreaSetting = function (flag) {
            if (flag) {
                $('#draw-space').find('.circle-space').show();
            }
            else {
                $('#draw-space').find('.circle-space').hide();
            }
            return true;
        };
        DrawSpace.prototype.getPosition = function () {
            return angular.copy(this.options.position);
        };
        DrawSpace.prototype.inintEvent = function () {
            var _self = this;
            var $parent = $('#draw-space');
            var $childMax = $parent.find('.child-max');
            var $childMaxText = $parent.find('.max-text');
            var $childMin = $parent.find('.child-min');
            var $childMinText = $parent.find('.min-text');
            var $area = $parent.find('.space-area');
            var $areaText = $parent.find('.space-text');
            $parent.on('mouseup', function (event) {
                _self.options.endPoint.x = event.pageX;
                _self.options.endPoint.y = event.pageY;
                _self.options.parent.nowEl = null;
                _self.options.parent.type = null;
                var res = DrawSpace.initParams();
                _self.options.position = res.position;
            }.bind(this));
            $parent.on('mousedown', function (event) {
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
                    _self.options.parent.type = 'changeSize';
                }
                if ($(event.target).hasClass('circle-min')) {
                    _self.options.parent.nowEl = 'child-min';
                    _self.options.parent.type = 'changeSize';
                }
            }.bind(this));
            $parent.on('mousemove', function (event) {
                _self.options.endPoint.x = event.pageX;
                _self.options.endPoint.y = event.pageY;
                if (_self.options.parent.nowEl === 'child-max') {
                    if (_self.options.parent.type === 'changeSize') {
                        var size = _self.options.position.max.width + (_self.options.endPoint.x - _self.options.startPoint.x);
                        if (size >= 200) {
                            size = 200;
                        }
                        else if (size <= 60) {
                            size = 60;
                        }
                        $childMax.css({ 'width': size, 'height': size });
                        $childMaxText.text("\u5927\uFF1A" + size + "*" + size);
                    }
                    else {
                        var x = _self.options.endPoint.x - $parent.offset().left - Math.ceil($childMax.outerWidth() / 2);
                        var y = _self.options.endPoint.y - $parent.offset().top - Math.ceil($childMax.outerHeight() / 2);
                        var maxleft = $parent.outerWidth() - $childMax.outerWidth();
                        var maxTop = $parent.outerHeight() - $childMax.outerHeight();
                        if (x > 0 && y > 0 && x < maxleft && y < maxTop) {
                            $childMax.css({ left: x, top: y });
                        }
                        if (x <= 0) {
                            $childMax.css({ left: 1 });
                        }
                        if (x >= maxleft) {
                            $childMax.css({ left: maxleft - 1 });
                        }
                        if (y <= 0) {
                            $childMax.css({ top: 1 });
                        }
                        if (y >= maxTop) {
                            $childMax.css({ top: maxTop - 1 });
                        }
                    }
                }
                if (_self.options.parent.nowEl === 'child-min') {
                    if (_self.options.parent.type === 'changeSize') {
                        var size = _self.options.position.min.width + (_self.options.endPoint.x - _self.options.startPoint.x);
                        if (size >= 200) {
                            size = 200;
                        }
                        else if (size <= 60) {
                            size = 60;
                        }
                        $childMin.css({ 'width': size, 'height': size });
                        $childMinText.text("\u5C0F\uFF1A" + size + "*" + size);
                    }
                    else {
                        var x = _self.options.endPoint.x - $parent.offset().left - Math.ceil($childMin.outerWidth() / 2);
                        var y = _self.options.endPoint.y - $parent.offset().top - Math.ceil($childMin.outerHeight() / 2);
                        var maxleft = $parent.outerWidth() - $childMin.outerWidth();
                        var maxTop = $parent.outerHeight() - $childMin.outerHeight();
                        if (x > 0 && y > 0 && x < maxleft && y < maxTop) {
                            $childMin.css({ left: x, top: y });
                        }
                        if (x <= 0) {
                            $childMin.css({ left: 1 });
                        }
                        if (x >= maxleft) {
                            $childMin.css({ left: maxleft - 1 });
                        }
                        if (y <= 0) {
                            $childMin.css({ top: 1 });
                        }
                        if (y >= maxTop) {
                            $childMin.css({ top: maxTop - 1 });
                        }
                    }
                }
                if (_self.options.parent.nowEl === 'space-area') {
                    if (_self.options.parent.type === 'changeAreaLf') {
                        var l = void 0, t = void 0, nw = void 0, nh = void 0, width = void 0, height = void 0, left = void 0, top_1;
                        l = _self.options.endPoint.x - _self.options.startPoint.x;
                        t = _self.options.endPoint.y - _self.options.startPoint.y;
                        nw = _self.options.position.area.width;
                        nh = _self.options.position.area.height;
                        if (_self.options.endPoint.x > _self.options.startPoint.x && _self.options.endPoint.y > _self.options.startPoint.y) {
                            console.log('结束x大于开始x，结束y大于开始y');
                            width = nw - l;
                            height = nh - t;
                            left = _self.options.position.area.left + Math.abs(l);
                            top_1 = _self.options.position.area.top + Math.abs(t);
                        }
                        else if (_self.options.endPoint.x > _self.options.startPoint.x && _self.options.endPoint.y < _self.options.startPoint.y) {
                            console.log('结束x大于开始x，结束y小于开始y');
                            width = nw - l;
                            height = nh + t;
                            left = _self.options.position.area.left + Math.abs(l);
                            top_1 = _self.options.position.area.top - Math.abs(t);
                        }
                        else if (_self.options.endPoint.x < _self.options.startPoint.x && _self.options.endPoint.y < _self.options.startPoint.y) {
                            console.log('结束x小于开始x，结束y小于开始y');
                            width = nw + Math.abs(l);
                            height = nh + Math.abs(t);
                            left = _self.options.position.area.left - Math.abs(l);
                            top_1 = _self.options.position.area.top - Math.abs(t);
                        }
                        else if (_self.options.endPoint.x < _self.options.startPoint.x && _self.options.endPoint.y > _self.options.startPoint.y) {
                            console.log('结束x小于开始x，结束y大于开始y');
                            width = nw - l;
                            height = nh + t;
                            left = _self.options.position.area.left - Math.abs(l);
                            top_1 = _self.options.position.area.top + Math.abs(t);
                        }
                        else {
                            width = nw;
                            height = nh;
                            left = _self.options.position.area.left;
                            top_1 = _self.options.position.area.top;
                        }
                        if (width >= _self.options.parent.width) {
                            width = _self.options.parent.width;
                            left = 0;
                        }
                        if (height >= _self.options.parent.height) {
                            height = _self.options.parent.height;
                            top_1 = 0;
                        }
                        if (left <= 0) {
                            left = 0;
                        }
                        if (top_1 <= 0) {
                            top_1 = 0;
                        }
                        $area.css({ width: width, height: height, left: left, top: top_1 });
                        $areaText.text("\u5E03\u63A7\u533A\u57DF\uFF1A" + Math.round(width * _self.options.scale.XScale) + "*" + Math.round(height * _self.options.scale.YScale));
                    }
                    if (_self.options.parent.type === 'changeAreaRb') {
                        var l = void 0, t = void 0, nw = void 0, nh = void 0, width = void 0, height = void 0;
                        l = _self.options.startPoint.x - _self.options.endPoint.x;
                        t = _self.options.startPoint.y - _self.options.endPoint.y;
                        nw = _self.options.position.area.width;
                        nh = _self.options.position.area.height;
                        if (_self.options.startPoint.x > _self.options.endPoint.x && _self.options.startPoint.y > _self.options.endPoint.y) {
                            console.log('开始x大于结束x，开始y大于结束y');
                            width = nw - Math.abs(l);
                            height = nh - Math.abs(t);
                        }
                        else if (_self.options.startPoint.x > _self.options.endPoint.x && _self.options.startPoint.y < _self.options.endPoint.y) {
                            console.log('开始x大于结束x，开始y小于结束y');
                            width = nw - Math.abs(l);
                            height = nh + Math.abs(t);
                        }
                        else if (_self.options.startPoint.x < _self.options.endPoint.x && _self.options.startPoint.y < _self.options.endPoint.y) {
                            console.log('开始x小于结束x，开始y小于结束y');
                            width = nw + Math.abs(l);
                            height = nh + Math.abs(t);
                        }
                        else if (_self.options.startPoint.x < _self.options.endPoint.x && _self.options.startPoint.y > _self.options.endPoint.y) {
                            console.log('开始x小于结束x，开始y大于结束y');
                            width = nw - Math.abs(l);
                            height = nh + Math.abs(t);
                        }
                        else {
                            width = nw;
                            height = nh;
                        }
                        if ((width + _self.options.position.area.left) >= _self.options.parent.width) {
                            width = _self.options.parent.width - _self.options.position.area.left;
                        }
                        if ((height + _self.options.position.area.top) >= _self.options.parent.height) {
                            height = _self.options.parent.height - _self.options.position.area.top;
                        }
                        $area.css({ width: width, height: height });
                        $areaText.text("\u5E03\u63A7\u533A\u57DF\uFF1A" + Math.round(width * _self.options.scale.XScale) + "*" + Math.round(height * _self.options.scale.YScale));
                    }
                }
            }.bind(this));
        };
        DrawSpace.initParams = function () {
            var $parent = $('#draw-space');
            var $childMax = $parent.find('.child-max');
            var $childMin = $parent.find('.child-min');
            var $area = $parent.find('.space-area');
            var result = new IOptions();
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
        };
        return DrawSpace;
    }());
    exports.DrawSpace = DrawSpace;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy90YXNrY29uZmlnL25ld0ZhY2VNb25pdG9yL0RyYXdTcGFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFHQTtRQUFBO1lBQ0ksVUFBSyxHQUFXLElBQUksQ0FBQztZQUNyQixXQUFNLEdBQVcsSUFBSSxDQUFDO1lBQ3RCLFVBQUssR0FBVyxJQUFJLENBQUM7WUFDckIsU0FBSSxHQUFXLElBQUksQ0FBQztRQUN4QixDQUFDO1FBQUQsdUJBQUM7SUFBRCxDQUxBLEFBS0MsSUFBQTtJQUVEO1FBQUE7WUFDSSxNQUFDLEdBQVcsSUFBSSxDQUFDO1lBQ2pCLE1BQUMsR0FBVyxJQUFJLENBQUE7UUFDcEIsQ0FBQztRQUFELHNCQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFFRDtRQUFBO1lBQ0ksVUFBSyxHQUFXLElBQUksQ0FBQztZQUNyQixXQUFNLEdBQVcsSUFBSSxDQUFDO1lBQ3RCLFFBQUcsR0FBVyxJQUFJLENBQUM7WUFDbkIsU0FBSSxHQUFXLElBQUksQ0FBQztRQUN4QixDQUFDO1FBQUQseUJBQUM7SUFBRCxDQUxBLEFBS0MsSUFBQTtJQUVEO1FBQUE7WUFDSSxRQUFHLEdBQXVCLElBQUksa0JBQWtCLEVBQUUsQ0FBQztZQUNuRCxRQUFHLEdBQXVCLElBQUksa0JBQWtCLEVBQUUsQ0FBQztZQUNuRCxTQUFJLEdBQXVCLElBQUksa0JBQWtCLEVBQUUsQ0FBQztRQUN4RCxDQUFDO1FBQUQsNEJBQUM7SUFBRCxDQUpBLEFBSUMsSUFBQTtJQUpZLHNEQUFxQjtJQU1sQztRQUFBO1lBQ0ksV0FBTSxHQUFXLENBQUMsQ0FBQztZQUNuQixXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7UUFBRCxhQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFIWSx3QkFBTTtJQUtuQjtRQUFBO1lBQ0ksV0FBTSxHQUFxQixJQUFJLGdCQUFnQixFQUFFLENBQUM7WUFDbEQsZUFBVSxHQUFvQixJQUFJLGVBQWUsRUFB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QyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDVCxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUMsSUFBSSxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUE7d0JBQzVCLENBQUM7d0JBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7NEJBQ2YsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQTt3QkFDdEMsQ0FBQzt3QkFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDVCxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUMsR0FBRyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUE7d0JBQzNCLENBQUM7d0JBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7NEJBQ2QsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEdBQUcsRUFBRSxNQUFNLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQTt3QkFDcEMsQ0FBQztvQkFDTCxDQUFDO2dCQUVMLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQzdDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO3dCQUM3QyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN0RyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFD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QyxVQUFVLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDeEgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOzRCQUNqQyxLQUFLLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3pCLE1BQU0sR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFFOUIsQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDeEgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOzRCQUNqQyxLQUFLLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3pCLE1BQU0sR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFFOUIsQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxD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QUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUN4QixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDeEIsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBQ0wsZ0JBQUM7SUFBRCxDQTNWQSxBQTJWQyxJQUFBO0lBM1ZZLDhCQUFTIiwiZmlsZSI6Im1vZHVsZS9iYXNlY29uZmlnL3Rhc2tjb25maWcvbmV3RmFjZU1vbml0b3IvRHJhd1NwYWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZGVjbGFyZSBsZXQgJDogYW55O1xyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcblxyXG5jbGFzcyBJRHJhd1NwYWNlUGFyZW50IHtcclxuICAgIHdpZHRoOiBudW1iZXIgPSBudWxsO1xyXG4gICAgaGVpZ2h0OiBudW1iZXIgPSBudWxsO1xyXG4gICAgbm93RWw6IHN0cmluZyA9IG51bGw7XHJcbiAgICB0eXBlOiBzdHJpbmcgPSBudWxsO1xyXG59XHJcblxyXG5jbGFzcyBJRHJhd1NwYWNlUG9pbnQge1xyXG4gICAgeDogbnVtYmVyID0gbnVsbDtcclxuICAgIHk6IG51bWJlciA9IG51bGxcclxufVxyXG5cclxuY2xhc3MgSURyYXdTcGFjZVBvc2l0aW9uIHtcclxuICAgIHdpZHRoOiBudW1iZXIgPSBudWxsO1xyXG4gICAgaGVpZ2h0OiBudW1iZXIgPSBudWxsO1xyXG4gICAgdG9wOiBudW1iZXIgPSBudWxsO1xyXG4gICAgbGVmdDogbnVtYmVyID0gbnVsbDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIElEcmF3U3BhY2VQb3NpdGlvblRvcCB7XHJcbiAgICBtYXg6IElEcmF3U3BhY2VQb3NpdGlvbiA9IG5ldyBJRHJhd1NwYWNlUG9zaXRpb24oKTtcclxuICAgIG1pbjogSURyYXdTcGFjZVBvc2l0aW9uID0gbmV3IElEcmF3U3BhY2VQb3NpdGlvbigpO1xyXG4gICAgYXJlYTogSURyYXdTcGFjZVBvc2l0aW9uID0gbmV3IElEcmF3U3BhY2VQb3NpdGlvbigpO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSVNjYWxlIHtcclxuICAgIFhTY2FsZTogbnVtYmVyID0gMTtcclxuICAgIFlTY2FsZTogbnVtYmVyID0gMTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIElPcHRpb25zIHtcclxuICAgIHBhcmVudDogSURyYXdTcGFjZVBhcmVudCA9IG5ldyBJRHJhd1NwYWNlUGFyZW50KCk7XHJcbiAgICBzdGFydFBvaW50OiBJRHJhd1NwYWNlUG9pbnQgPSBuZXcgSURyYXdTcGFjZVBvaW50KCk7XHJcbiAgICBlbmRQb2ludDogSURyYXdTcGFjZVBvaW50ID0gbmV3IElEcmF3U3BhY2VQb2ludCgpO1xyXG4gICAgcG9zaXRpb246IElEcmF3U3BhY2VQb3NpdGlvblRvcCA9IG5ldyBJRHJhd1NwYWNlUG9zaXRpb25Ub3AoKTtcclxuICAgIHNjYWxlOiBJU2NhbGUgPSBuZXcgSVNjYWxlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURyYXdTcGFjZSB7XHJcbiAgICBnZXRQb3NpdGlvbigpOiBJRHJhd1NwYWNlUG9zaXRpb25Ub3A7XHJcblxyXG4gICAgZ2V0RGVmYXVsdE9wdGlvbnMoKTogSU9wdGlvbnNcclxuXHJcbiAgICByZXNldFBvc2l0aW9uU2l6ZSgpOiBib29sZWFuO1xyXG5cclxuICAgIHJlc2V0UG9zaXRpb25BcmVhKCk6IGJvb2xlYW47XHJcblxyXG4gICAgaXNPcGVuQXJlYVNldHRpbmcoZmFsYWc6IGJvb2xlYW4pOiBib29sZWFuO1xyXG5cclxuICAgIHNldEltYWdlKHBhdGg6IHN0cmluZyk6IGJvb2xlYW47XHJcblxyXG4gICAgaXNTaG93QXJlYVNwYWNlKGZsYWc6IGJvb2xlYW4pOiB2b2lkO1xyXG5cclxuICAgIHNldFNjYWxlKHNjYWxlOiBJU2NhbGUpOiB2b2lkO1xyXG5cclxuICAgIGRlc3Ryb3lEcmF3KCk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEcmF3U3BhY2UgaW1wbGVtZW50cyBJRHJhd1NwYWNlIHtcclxuICAgIHByaXZhdGUgb3B0aW9uczogSU9wdGlvbnM7XHJcbiAgICBwcml2YXRlIGRlZmF1bHRPcHRpb25zOiBJT3B0aW9ucztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBEcmF3U3BhY2UuaW5pdFBhcmFtcygpO1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdE9wdGlvbnMgPSBhbmd1bGFyLmNvcHkodGhpcy5vcHRpb25zKTtcclxuICAgICAgICB0aGlzLmluaW50RXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95RHJhdygpIHtcclxuICAgICAgICBsZXQgJHBhcmVudCA9ICQoJyNkcmF3LXNwYWNlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGVmYXVsdE9wdGlvbnMoKTogSU9wdGlvbnMge1xyXG4gICAgICAgIHJldHVybiBhbmd1bGFyLmNvcHkodGhpcy5kZWZhdWx0T3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2NhbGUoc2NhbGU6IElTY2FsZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5zY2FsZS5YU2NhbGUgPSBzY2FsZS5YU2NhbGU7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLnNjYWxlLllTY2FsZSA9IHNjYWxlLllTY2FsZTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRlZmF1bHRPcHRpb25zLnBvc2l0aW9uLmFyZWEud2lkdGgqc2NhbGUuWFNjYWxlKTtcclxuICAgICAgICAkKCcjZHJhdy1zcGFjZScpLmZpbmQoJy5zcGFjZS10ZXh0JykudGV4dChg5biD5o6n5Yy65Z+f77yaJHtNYXRoLnJvdW5kKHRoaXMuZGVmYXVsdE9wdGlvbnMucG9zaXRpb24uYXJlYS53aWR0aCAqIHNjYWxlLlhTY2FsZSl9KiR7TWF0aC5yb3VuZCh0aGlzLmRlZmF1bHRPcHRpb25zLnBvc2l0aW9uLmFyZWEuaGVpZ2h0ICogc2NhbGUuWVNjYWxlKX1gKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRJbWFnZShwYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAocGF0aCAmJiBwYXRoLmluZGV4T2YoJ0Vycm9yJykgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIGxldCAkYXJlYSA9ICQoJyNkcmF3LXNwYWNlJyk7XHJcbiAgICAgICAgICAgIGlmICgkYXJlYS5maW5kKCdpbWcnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAkYXJlYS5maW5kKCdpbWcnKS5hdHRyKCdzcmMnLCBwYXRoKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJGFyZWEuYXBwZW5kKGA8aW1nIHN0eWxlPVwid2lkdGg6IDEwMCU7aGVpZ2h0OjEwMCVcIiBzcmM9XCIke3BhdGh9XCIgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7bGVmdDogMDt0b3A6IDA7XCIvPmApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpc1Nob3dBcmVhU3BhY2UoZmxhZzogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGlmIChmbGFnKSB7XHJcbiAgICAgICAgICAgICQoJyNkcmF3LXNwYWNlJykuc2hvdygpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI2RyYXctc3BhY2UnKS5oaWRlKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRQb3NpdGlvbkFyZWEoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0ICRwYXJlbnQgPSAkKCcjZHJhdy1zcGFjZScpO1xyXG4gICAgICAgIGxldCAkYXJlYSA9ICRwYXJlbnQuZmluZCgnLnNwYWNlLWFyZWEnKTtcclxuICAgICAgICBsZXQgJGFyZWFUZXh0ID0gJHBhcmVudC5maW5kKCcuc3BhY2UtdGV4dCcpO1xyXG4gICAgICAgICRhcmVhLmNzcyh7XHJcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLmRlZmF1bHRPcHRpb25zLnBvc2l0aW9uLmFyZWEud2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5kZWZhdWx0T3B0aW9ucy5wb3NpdGlvbi5hcmVhLmhlaWdodCxcclxuICAgICAgICAgICAgbGVmdDogdGhpcy5kZWZhdWx0T3B0aW9ucy5wb3NpdGlvbi5hcmVhLmxlZnQsXHJcbiAgICAgICAgICAgIHRvcDogdGhpcy5kZWZhdWx0T3B0aW9ucy5wb3NpdGlvbi5hcmVhLnRvcCxcclxuICAgICAgICB9KTtcclxuICAgICAgICAkYXJlYVRleHQudGV4dChg5biD5o6n5Yy65Z+f77yaJHtNYXRoLnJvdW5kKHRoaXMuZGVmYXVsdE9wdGlvbnMucG9zaXRpb24uYXJlYS53aWR0aCAqIHRoaXMub3B0aW9ucy5zY2FsZS5ZU2NhbGUpfSoke01hdGgucm91bmQodGhpcy5kZWZhdWx0T3B0aW9ucy5wb3NpdGlvbi5hcmVhLmhlaWdodCAqIHRoaXMub3B0aW9ucy5zY2FsZS5ZU2NhbGUpfWApO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0UG9zaXRpb25TaXplKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCAkcGFyZW50ID0gJCgnI2RyYXctc3BhY2UnKTtcclxuICAgICAgICBsZXQgJGNoaWxkTWF4ID0gJHBhcmVudC5maW5kKCcuY2hpbGQtbWF4Jyk7XHJcbiAgICAgICAgbGV0ICRjaGlsZE1heFRleHQgPSAkcGFyZW50LmZpbmQoJy5tYXgtdGV4dCcpO1xyXG4gICAgICAgIGxldCAkY2hpbGRNaW4gPSAkcGFyZW50LmZpbmQoJy5jaGlsZC1taW4nKTtcclxuICAgICAgICBsZXQgJGNoaWxkTWluVGV4dCA9ICRwYXJlbnQuZmluZCgnLm1pbi10ZXh0Jyk7XHJcblxyXG4gICAgICAgICRjaGlsZE1heC5jc3Moe1xyXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5kZWZhdWx0T3B0aW9ucy5wb3NpdGlvbi5tYXgud2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5kZWZhdWx0T3B0aW9ucy5wb3NpdGlvbi5tYXguaGVpZ2h0LFxyXG4gICAgICAgICAgICBsZWZ0OiB0aGlzLmRlZmF1bHRPcHRpb25zLnBvc2l0aW9uLm1heC5sZWZ0LFxyXG4gICAgICAgICAgICB0b3A6IHRoaXMuZGVmYXVsdE9wdGlvbnMucG9zaXRpb24ubWF4LnRvcCxcclxuICAgICAgICB9KTtcclxuICAgICAgICAkY2hpbGRNaW4uY3NzKHtcclxuICAgICAgICAgICAgd2lkdGg6IHRoaXMuZGVmYXVsdE9wdGlvbnMucG9zaXRpb24ubWluLndpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuZGVmYXVsdE9wdGlvbnMucG9zaXRpb24ubWluLmhlaWdodCxcclxuICAgICAgICAgICAgbGVmdDogdGhpcy5kZWZhdWx0T3B0aW9ucy5wb3NpdGlvbi5taW4ubGVmdCxcclxuICAgICAgICAgICAgdG9wOiB0aGlzLmRlZmF1bHRPcHRpb25zLnBvc2l0aW9uLm1pbi50b3AsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJGNoaWxkTWF4VGV4dC50ZXh0KGDlpKfvvJoke3RoaXMuZGVmYXVsdE9wdGlvbnMucG9zaXRpb24ubWF4LndpZHRofSoke3RoaXMuZGVmYXVsdE9wdGlvbnMucG9zaXRpb24ubWF4LndpZHRofWApO1xyXG4gICAgICAgICRjaGlsZE1pblRleHQudGV4dChg5bCP77yaJHt0aGlzLmRlZmF1bHRPcHRpb25zLnBvc2l0aW9uLm1pbi53aWR0aH0qJHt0aGlzLmRlZmF1bHRPcHRpb25zLnBvc2l0aW9uLm1pbi53aWR0aH1gKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG5cclxuICAgIGlzT3BlbkFyZWFTZXR0aW5nKGZsYWc6IGJvb2xlYW4pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICAkKCcjZHJhdy1zcGFjZScpLmZpbmQoJy5jaXJjbGUtc3BhY2UnKS5zaG93KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI2RyYXctc3BhY2UnKS5maW5kKCcuY2lyY2xlLXNwYWNlJykuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG5cclxuICAgIGdldFBvc2l0aW9uKCk6IElEcmF3U3BhY2VQb3NpdGlvblRvcCB7XHJcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXIuY29weSh0aGlzLm9wdGlvbnMucG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pbnRFdmVudCgpIHtcclxuICAgICAgICBsZXQgX3NlbGY6IERyYXdTcGFjZSA9IHRoaXM7XHJcbiAgICAgICAgbGV0ICRwYXJlbnQgPSAkKCcjZHJhdy1zcGFjZScpO1xyXG4gICAgICAgIGxldCAkY2hpbGRNYXggPSAkcGFyZW50LmZpbmQoJy5jaGlsZC1tYXgnKTtcclxuICAgICAgICBsZXQgJGNoaWxkTWF4VGV4dCA9ICRwYXJlbnQuZmluZCgnLm1heC10ZXh0Jyk7XHJcbiAgICAgICAgbGV0ICRjaGlsZE1pbiA9ICRwYXJlbnQuZmluZCgnLmNoaWxkLW1pbicpO1xyXG4gICAgICAgIGxldCAkY2hpbGRNaW5UZXh0ID0gJHBhcmVudC5maW5kKCcubWluLXRleHQnKTtcclxuICAgICAgICBsZXQgJGFyZWEgPSAkcGFyZW50LmZpbmQoJy5zcGFjZS1hcmVhJyk7XHJcbiAgICAgICAgbGV0ICRhcmVhVGV4dCA9ICRwYXJlbnQuZmluZCgnLnNwYWNlLXRleHQnKTtcclxuICAgICAgICAkcGFyZW50Lm9uKCdtb3VzZXVwJywgZnVuY3Rpb24gKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgICAgIF9zZWxmLm9wdGlvbnMuZW5kUG9pbnQueCA9IGV2ZW50LnBhZ2VYO1xyXG4gICAgICAgICAgICBfc2VsZi5vcHRpb25zLmVuZFBvaW50LnkgPSBldmVudC5wYWdlWTtcclxuICAgICAgICAgICAgX3NlbGYub3B0aW9ucy5wYXJlbnQubm93RWwgPSBudWxsO1xyXG4gICAgICAgICAgICBfc2VsZi5vcHRpb25zLnBhcmVudC50eXBlID0gbnVsbDtcclxuICAgICAgICAgICAgbGV0IHJlcyA9IERyYXdTcGFjZS5pbml0UGFyYW1zKCk7XHJcbiAgICAgICAgICAgIF9zZWxmLm9wdGlvbnMucG9zaXRpb24gPSByZXMucG9zaXRpb247XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAkcGFyZW50Lm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIF9zZWxmLm9wdGlvbnMuc3RhcnRQb2ludC54ID0gZXZlbnQucGFnZVg7XHJcbiAgICAgICAgICAgIF9zZWxmLm9wdGlvbnMuc3RhcnRQb2ludC55ID0gZXZlbnQucGFnZVk7XHJcbiAgICAgICAgICAgIGlmICgkKGV2ZW50LnRhcmdldCkuaGFzQ2xhc3MoJ2NpcmNsZS1sdCcpKSB7XHJcbiAgICAgICAgICAgICAgICBfc2VsZi5vcHRpb25zLnBhcmVudC5ub3dFbCA9ICdzcGFjZS1hcmVhJztcclxuICAgICAgICAgICAgICAgIF9zZWxmLm9wdGlvbnMucGFyZW50LnR5cGUgPSAnY2hhbmdlQXJlYUxmJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmhhc0NsYXNzKCdjaXJjbGUtcmInKSkge1xyXG4gICAgICAgICAgICAgICAgX3NlbGYub3B0aW9ucy5wYXJlbnQubm93RWwgPSAnc3BhY2UtYXJlYSc7XHJcbiAgICAgICAgICAgICAgICBfc2VsZi5vcHRpb25zLnBhcmVudC50eXBlID0gJ2NoYW5nZUFyZWFSYic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQoZXZlbnQudGFyZ2V0KS5oYXNDbGFzcygnY2hpbGQtbWluJykpIHtcclxuICAgICAgICAgICAgICAgIF9zZWxmLm9wdGlvbnMucGFyZW50Lm5vd0VsID0gJ2NoaWxkLW1pbic7XHJcbiAgICAgICAgICAgICAgICBfc2VsZi5vcHRpb25zLnBhcmVudC50eXBlID0gJ2NoYW5nZVBvc2l0aW9uJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmhhc0NsYXNzKCdjaGlsZC1tYXgnKSkge1xyXG4gICAgICAgICAgICAgICAgX3NlbGYub3B0aW9ucy5wYXJlbnQubm93RWwgPSAnY2hpbGQtbWF4JztcclxuICAgICAgICAgICAgICAgIF9zZWxmLm9wdGlvbnMucGFyZW50LnR5cGUgPSAnY2hhbmdlUG9zaXRpb24nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgkKGV2ZW50LnRhcmdldCkuaGFzQ2xhc3MoJ2NpcmNsZS1tYXgnKSkge1xyXG4gICAgICAgICAgICAgICAgX3NlbGYub3B0aW9ucy5wYXJlbnQubm93RWwgPSAnY2hpbGQtbWF4JztcclxuICAgICAgICAgICAgICAgIF9zZWxmLm9wdGlvbnMucGFyZW50LnR5cGUgPSAnY2hhbmdlU2l6ZSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmhhc0NsYXNzKCdjaXJjbGUtbWluJykpIHtcclxuICAgICAgICAgICAgICAgIF9zZWxmLm9wdGlvbnMucGFyZW50Lm5vd0VsID0gJ2NoaWxkLW1pbic7XHJcbiAgICAgICAgICAgICAgICBfc2VsZi5vcHRpb25zLnBhcmVudC50eXBlID0gJ2NoYW5nZVNpemUnXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgJHBhcmVudC5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgICAgIF9zZWxmLm9wdGlvbnMuZW5kUG9pbnQueCA9IGV2ZW50LnBhZ2VYO1xyXG4gICAgICAgICAgICBfc2VsZi5vcHRpb25zLmVuZFBvaW50LnkgPSBldmVudC5wYWdlWTtcclxuICAgICAgICAgICAgaWYgKF9zZWxmLm9wdGlvbnMucGFyZW50Lm5vd0VsID09PSAnY2hpbGQtbWF4Jykge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9zZWxmLm9wdGlvbnMucGFyZW50LnR5cGUgPT09ICdjaGFuZ2VTaXplJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzaXplID0gX3NlbGYub3B0aW9ucy5wb3NpdGlvbi5tYXgud2lkdGggKyAoX3NlbGYub3B0aW9ucy5lbmRQb2ludC54IC0gX3NlbGYub3B0aW9ucy5zdGFydFBvaW50LngpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaXplID49IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplID0gMjAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2l6ZSA8PSA2MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplID0gNjA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICRjaGlsZE1heC5jc3Moeyd3aWR0aCc6IHNpemUsICdoZWlnaHQnOiBzaXplfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGNoaWxkTWF4VGV4dC50ZXh0KGDlpKfvvJoke3NpemV9KiR7c2l6ZX1gKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgeCA9IF9zZWxmLm9wdGlvbnMuZW5kUG9pbnQueCAtICRwYXJlbnQub2Zmc2V0KCkubGVmdCAtIE1hdGguY2VpbCgkY2hpbGRNYXgub3V0ZXJXaWR0aCgpIC8gMik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHkgPSBfc2VsZi5vcHRpb25zLmVuZFBvaW50LnkgLSAkcGFyZW50Lm9mZnNldCgpLnRvcCAtIE1hdGguY2VpbCgkY2hpbGRNYXgub3V0ZXJIZWlnaHQoKSAvIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtYXhsZWZ0ID0gJHBhcmVudC5vdXRlcldpZHRoKCkgLSAkY2hpbGRNYXgub3V0ZXJXaWR0aCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtYXhUb3AgPSAkcGFyZW50Lm91dGVySGVpZ2h0KCkgLSAkY2hpbGRNYXgub3V0ZXJIZWlnaHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeCA+IDAgJiYgeSA+IDAgJiYgeCA8IG1heGxlZnQgJiYgeSA8IG1heFRvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkY2hpbGRNYXguY3NzKHtsZWZ0OiB4LCB0b3A6IHl9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoeCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRjaGlsZE1heC5jc3Moe2xlZnQ6IDF9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoeCA+PSBtYXhsZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRjaGlsZE1heC5jc3Moe2xlZnQ6IG1heGxlZnQgLSAxfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHkgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkY2hpbGRNYXguY3NzKHt0b3A6IDF9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoeSA+PSBtYXhUb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGNoaWxkTWF4LmNzcyh7dG9wOiBtYXhUb3AgLSAxfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChfc2VsZi5vcHRpb25zLnBhcmVudC5ub3dFbCA9PT0gJ2NoaWxkLW1pbicpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfc2VsZi5vcHRpb25zLnBhcmVudC50eXBlID09PSAnY2hhbmdlU2l6ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZSA9IF9zZWxmLm9wdGlvbnMucG9zaXRpb24ubWluLndpZHRoICsgKF9zZWxmLm9wdGlvbnMuZW5kUG9pbnQueCAtIF9zZWxmLm9wdGlvbnMuc3RhcnRQb2ludC54KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2l6ZSA+PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IDIwMFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2l6ZSA8PSA2MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplID0gNjBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgJGNoaWxkTWluLmNzcyh7J3dpZHRoJzogc2l6ZSwgJ2hlaWdodCc6IHNpemV9KTtcclxuICAgICAgICAgICAgICAgICAgICAkY2hpbGRNaW5UZXh0LnRleHQoYOWwj++8miR7c2l6ZX0qJHtzaXplfWApXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB4ID0gX3NlbGYub3B0aW9ucy5lbmRQb2ludC54IC0gJHBhcmVudC5vZmZzZXQoKS5sZWZ0IC0gTWF0aC5jZWlsKCRjaGlsZE1pbi5vdXRlcldpZHRoKCkgLyAyKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgeSA9IF9zZWxmLm9wdGlvbnMuZW5kUG9pbnQueSAtICRwYXJlbnQub2Zmc2V0KCkudG9wIC0gTWF0aC5jZWlsKCRjaGlsZE1pbi5vdXRlckhlaWdodCgpIC8gMik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1heGxlZnQgPSAkcGFyZW50Lm91dGVyV2lkdGgoKSAtICRjaGlsZE1pbi5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1heFRvcCA9ICRwYXJlbnQub3V0ZXJIZWlnaHQoKSAtICRjaGlsZE1pbi5vdXRlckhlaWdodCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoeCA+IDAgJiYgeSA+IDAgJiYgeCA8IG1heGxlZnQgJiYgeSA8IG1heFRvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkY2hpbGRNaW4uY3NzKHtsZWZ0OiB4LCB0b3A6IHl9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoeCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRjaGlsZE1pbi5jc3Moe2xlZnQ6IDF9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoeCA+PSBtYXhsZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRjaGlsZE1pbi5jc3Moe2xlZnQ6IG1heGxlZnQgLSAxfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHkgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkY2hpbGRNaW4uY3NzKHt0b3A6IDF9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoeSA+PSBtYXhUb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGNoaWxkTWluLmNzcyh7dG9wOiBtYXhUb3AgLSAxfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKF9zZWxmLm9wdGlvbnMucGFyZW50Lm5vd0VsID09PSAnc3BhY2UtYXJlYScpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfc2VsZi5vcHRpb25zLnBhcmVudC50eXBlID09PSAnY2hhbmdlQXJlYUxmJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsLCB0LCBudywgbmgsIHdpZHRoLCBoZWlnaHQsIGxlZnQsIHRvcDtcclxuICAgICAgICAgICAgICAgICAgICBsID0gX3NlbGYub3B0aW9ucy5lbmRQb2ludC54IC0gX3NlbGYub3B0aW9ucy5zdGFydFBvaW50Lng7XHJcbiAgICAgICAgICAgICAgICAgICAgdCA9IF9zZWxmLm9wdGlvbnMuZW5kUG9pbnQueSAtIF9zZWxmLm9wdGlvbnMuc3RhcnRQb2ludC55O1xyXG4gICAgICAgICAgICAgICAgICAgIG53ID0gX3NlbGYub3B0aW9ucy5wb3NpdGlvbi5hcmVhLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIG5oID0gX3NlbGYub3B0aW9ucy5wb3NpdGlvbi5hcmVhLmhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3NlbGYub3B0aW9ucy5lbmRQb2ludC54ID4gX3NlbGYub3B0aW9ucy5zdGFydFBvaW50LnggJiYgX3NlbGYub3B0aW9ucy5lbmRQb2ludC55ID4gX3NlbGYub3B0aW9ucy5zdGFydFBvaW50LnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+e7k+adn3jlpKfkuo7lvIDlp4t477yM57uT5p2feeWkp+S6juW8gOWni3knKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGggPSBudyAtIGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IG5oIC0gdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA9IF9zZWxmLm9wdGlvbnMucG9zaXRpb24uYXJlYS5sZWZ0ICsgTWF0aC5hYnMobCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcCA9IF9zZWxmLm9wdGlvbnMucG9zaXRpb24uYXJlYS50b3AgKyBNYXRoLmFicyh0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfc2VsZi5vcHRpb25zLmVuZFBvaW50LnggPiBfc2VsZi5vcHRpb25zLnN0YXJ0UG9pbnQueCAmJiBfc2VsZi5vcHRpb25zLmVuZFBvaW50LnkgPCBfc2VsZi5vcHRpb25zLnN0YXJ0UG9pbnQueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn57uT5p2feOWkp+S6juW8gOWni3jvvIznu5PmnZ955bCP5LqO5byA5aeLeScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IG53IC0gbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0gbmggKyB0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gX3NlbGYub3B0aW9ucy5wb3NpdGlvbi5hcmVhLmxlZnQgKyBNYXRoLmFicyhsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wID0gX3NlbGYub3B0aW9ucy5wb3NpdGlvbi5hcmVhLnRvcCAtIE1hdGguYWJzKHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoX3NlbGYub3B0aW9ucy5lbmRQb2ludC54IDwgX3NlbGYub3B0aW9ucy5zdGFydFBvaW50LnggJiYgX3NlbGYub3B0aW9ucy5lbmRQb2ludC55IDwgX3NlbGYub3B0aW9ucy5zdGFydFBvaW50LnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+e7k+adn3jlsI/kuo7lvIDlp4t477yM57uT5p2feeWwj+S6juW8gOWni3knKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGggPSBudyArIE1hdGguYWJzKGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSBuaCArIE1hdGguYWJzKHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gX3NlbGYub3B0aW9ucy5wb3NpdGlvbi5hcmVhLmxlZnQgLSBNYXRoLmFicyhsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wID0gX3NlbGYub3B0aW9ucy5wb3NpdGlvbi5hcmVhLnRvcCAtIE1hdGguYWJzKHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoX3NlbGYub3B0aW9ucy5lbmRQb2ludC54IDwgX3NlbGYub3B0aW9ucy5zdGFydFBvaW50LnggJiYgX3NlbGYub3B0aW9ucy5lbmRQb2ludC55ID4gX3NlbGYub3B0aW9ucy5zdGFydFBvaW50LnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+e7k+adn3jlsI/kuo7lvIDlp4t477yM57uT5p2feeWkp+S6juW8gOWni3knKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGggPSBudyAtIGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IG5oICsgdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA9IF9zZWxmLm9wdGlvbnMucG9zaXRpb24uYXJlYS5sZWZ0IC0gTWF0aC5hYnMobCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcCA9IF9zZWxmLm9wdGlvbnMucG9zaXRpb24uYXJlYS50b3AgKyBNYXRoLmFicyh0KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IG53O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSBuaDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA9IF9zZWxmLm9wdGlvbnMucG9zaXRpb24uYXJlYS5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3AgPSBfc2VsZi5vcHRpb25zLnBvc2l0aW9uLmFyZWEudG9wO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAod2lkdGggPj0gX3NlbGYub3B0aW9ucy5wYXJlbnQud2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGggPSBfc2VsZi5vcHRpb25zLnBhcmVudC53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoZWlnaHQgPj0gX3NlbGYub3B0aW9ucy5wYXJlbnQuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IF9zZWxmLm9wdGlvbnMucGFyZW50LmhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnQgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodG9wIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgJGFyZWEuY3NzKHt3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0LCBsZWZ0OiBsZWZ0LCB0b3A6IHRvcH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICRhcmVhVGV4dC50ZXh0KGDluIPmjqfljLrln5/vvJoke01hdGgucm91bmQod2lkdGggKiBfc2VsZi5vcHRpb25zLnNjYWxlLlhTY2FsZSl9KiR7TWF0aC5yb3VuZChoZWlnaHQgKiBfc2VsZi5vcHRpb25zLnNjYWxlLllTY2FsZSl9YClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChfc2VsZi5vcHRpb25zLnBhcmVudC50eXBlID09PSAnY2hhbmdlQXJlYVJiJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsLCB0LCBudywgbmgsIHdpZHRoLCBoZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbCA9IF9zZWxmLm9wdGlvbnMuc3RhcnRQb2ludC54IC0gX3NlbGYub3B0aW9ucy5lbmRQb2ludC54O1xyXG4gICAgICAgICAgICAgICAgICAgIHQgPSBfc2VsZi5vcHRpb25zLnN0YXJ0UG9pbnQueSAtIF9zZWxmLm9wdGlvbnMuZW5kUG9pbnQueTtcclxuICAgICAgICAgICAgICAgICAgICBudyA9IF9zZWxmLm9wdGlvbnMucG9zaXRpb24uYXJlYS53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBuaCA9IF9zZWxmLm9wdGlvbnMucG9zaXRpb24uYXJlYS5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfc2VsZi5vcHRpb25zLnN0YXJ0UG9pbnQueCA+IF9zZWxmLm9wdGlvbnMuZW5kUG9pbnQueCAmJiBfc2VsZi5vcHRpb25zLnN0YXJ0UG9pbnQueSA+IF9zZWxmLm9wdGlvbnMuZW5kUG9pbnQueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5byA5aeLeOWkp+S6jue7k+adn3jvvIzlvIDlp4t55aSn5LqO57uT5p2feScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IG53IC0gTWF0aC5hYnMobCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IG5oIC0gTWF0aC5hYnModCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfc2VsZi5vcHRpb25zLnN0YXJ0UG9pbnQueCA+IF9zZWxmLm9wdGlvbnMuZW5kUG9pbnQueCAmJiBfc2VsZi5vcHRpb25zLnN0YXJ0UG9pbnQueSA8IF9zZWxmLm9wdGlvbnMuZW5kUG9pbnQueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5byA5aeLeOWkp+S6jue7k+adn3jvvIzlvIDlp4t55bCP5LqO57uT5p2feScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IG53IC0gTWF0aC5hYnMobCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IG5oICsgTWF0aC5hYnModCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoX3NlbGYub3B0aW9ucy5zdGFydFBvaW50LnggPCBfc2VsZi5vcHRpb25zLmVuZFBvaW50LnggJiYgX3NlbGYub3B0aW9ucy5zdGFydFBvaW50LnkgPCBfc2VsZi5vcHRpb25zLmVuZFBvaW50LnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+W8gOWni3jlsI/kuo7nu5PmnZ9477yM5byA5aeLeeWwj+S6jue7k+adn3knKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGggPSBudyArIE1hdGguYWJzKGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSBuaCArIE1hdGguYWJzKHQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF9zZWxmLm9wdGlvbnMuc3RhcnRQb2ludC54IDwgX3NlbGYub3B0aW9ucy5lbmRQb2ludC54ICYmIF9zZWxmLm9wdGlvbnMuc3RhcnRQb2ludC55ID4gX3NlbGYub3B0aW9ucy5lbmRQb2ludC55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCflvIDlp4t45bCP5LqO57uT5p2feO+8jOW8gOWni3nlpKfkuo7nu5PmnZ95Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoID0gbncgLSBNYXRoLmFicyhsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0gbmggKyBNYXRoLmFicyh0KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IG53O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSBuaDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh3aWR0aCArIF9zZWxmLm9wdGlvbnMucG9zaXRpb24uYXJlYS5sZWZ0KSA+PSBfc2VsZi5vcHRpb25zLnBhcmVudC53aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IF9zZWxmLm9wdGlvbnMucGFyZW50LndpZHRoIC0gX3NlbGYub3B0aW9ucy5wb3NpdGlvbi5hcmVhLmxlZnRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChoZWlnaHQgKyBfc2VsZi5vcHRpb25zLnBvc2l0aW9uLmFyZWEudG9wKSA+PSBfc2VsZi5vcHRpb25zLnBhcmVudC5oZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0gX3NlbGYub3B0aW9ucy5wYXJlbnQuaGVpZ2h0IC0gX3NlbGYub3B0aW9ucy5wb3NpdGlvbi5hcmVhLnRvcFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGFyZWEuY3NzKHt3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGFyZWFUZXh0LnRleHQoYOW4g+aOp+WMuuWfn++8miR7TWF0aC5yb3VuZCh3aWR0aCAqIF9zZWxmLm9wdGlvbnMuc2NhbGUuWFNjYWxlKX0qJHtNYXRoLnJvdW5kKGhlaWdodCAqIF9zZWxmLm9wdGlvbnMuc2NhbGUuWVNjYWxlKX1gKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpbml0UGFyYW1zKCk6IElPcHRpb25zIHtcclxuICAgICAgICBsZXQgJHBhcmVudCA9ICQoJyNkcmF3LXNwYWNlJyk7XHJcblxyXG4gICAgICAgIGxldCAkY2hpbGRNYXggPSAkcGFyZW50LmZpbmQoJy5jaGlsZC1tYXgnKTtcclxuICAgICAgICBsZXQgJGNoaWxkTWluID0gJHBhcmVudC5maW5kKCcuY2hpbGQtbWluJyk7XHJcbiAgICAgICAgbGV0ICRhcmVhID0gJHBhcmVudC5maW5kKCcuc3BhY2UtYXJlYScpO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgSU9wdGlvbnMoKTtcclxuICAgICAgICByZXN1bHQucGFyZW50LndpZHRoID0gJHBhcmVudC5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgcmVzdWx0LnBhcmVudC5oZWlnaHQgPSAkcGFyZW50Lm91dGVySGVpZ2h0KCk7XHJcbiAgICAgICAgcmVzdWx0LnBhcmVudC5ub3dFbCA9IG51bGw7XHJcbiAgICAgICAgcmVzdWx0LnBhcmVudC50eXBlID0gbnVsbDtcclxuICAgICAgICByZXN1bHQuc3RhcnRQb2ludC54ID0gbnVsbDtcclxuICAgICAgICByZXN1bHQuc3RhcnRQb2ludC55ID0gbnVsbDtcclxuICAgICAgICByZXN1bHQuZW5kUG9pbnQueCA9IG51bGw7XHJcbiAgICAgICAgcmVzdWx0LmVuZFBvaW50LnkgPSBudWxsO1xyXG4gICAgICAgIHJlc3VsdC5wb3NpdGlvbi5tYXgud2lkdGggPSAkY2hpbGRNYXgub3V0ZXJXaWR0aCgpO1xyXG4gICAgICAgIHJlc3VsdC5wb3NpdGlvbi5tYXguaGVpZ2h0ID0gJGNoaWxkTWF4Lm91dGVySGVpZ2h0KCk7XHJcbiAgICAgICAgcmVzdWx0LnBvc2l0aW9uLm1heC50b3AgPSAkY2hpbGRNYXgucG9zaXRpb24oKS50b3A7XHJcbiAgICAgICAgcmVzdWx0LnBvc2l0aW9uLm1heC5sZWZ0ID0gJGNoaWxkTWF4LnBvc2l0aW9uKCkubGVmdDtcclxuICAgICAgICByZXN1bHQucG9zaXRpb24ubWluLndpZHRoID0gJGNoaWxkTWluLm91dGVyV2lkdGgoKTtcclxuICAgICAgICByZXN1bHQucG9zaXRpb24ubWluLmhlaWdodCA9ICRjaGlsZE1pbi5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgIHJlc3VsdC5wb3NpdGlvbi5taW4udG9wID0gJGNoaWxkTWluLnBvc2l0aW9uKCkudG9wO1xyXG4gICAgICAgIHJlc3VsdC5wb3NpdGlvbi5taW4ubGVmdCA9ICRjaGlsZE1pbi5wb3NpdGlvbigpLmxlZnQ7XHJcbiAgICAgICAgcmVzdWx0LnBvc2l0aW9uLmFyZWEud2lkdGggPSAkYXJlYS5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgcmVzdWx0LnBvc2l0aW9uLmFyZWEuaGVpZ2h0ID0gJGFyZWEub3V0ZXJIZWlnaHQoKTtcclxuICAgICAgICByZXN1bHQucG9zaXRpb24uYXJlYS50b3AgPSAkYXJlYS5wb3NpdGlvbigpLnRvcDtcclxuICAgICAgICByZXN1bHQucG9zaXRpb24uYXJlYS5sZWZ0ID0gJGFyZWEucG9zaXRpb24oKS5sZWZ0O1xyXG4gICAgICAgIHJlc3VsdC5zY2FsZS5YU2NhbGUgPSAxO1xyXG4gICAgICAgIHJlc3VsdC5zY2FsZS5ZU2NhbGUgPSAxO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn0iXX0=
