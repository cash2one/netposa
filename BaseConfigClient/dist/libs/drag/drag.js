$.fn.extend({
    //---元素拖动插件
    dragging: function(data, callback, mouseupCallBack) {
        var $this = $(this);
        var xPage;
        var yPage;
        var X; //
        var Y; //
        var xRand = 0; //
        var yRand = 0; //
        var father = $this.parent();
        var defaults = {
            move: 'both',
            randomPosition: true,
            hander: 1
        }
        var opt = $.extend({}, defaults, data);
        var movePosition = opt.move;
        var random = opt.randomPosition;

        var hander = opt.hander;

        if (hander == 1) {
            hander = $this;
        } else {
            hander = $this.find(opt.hander);
        }


        //---初始化
        father.css({ "position": "relative", "overflow": "hidden" });
        $this.css({ "position": "absolute" });
        hander.css({ "cursor": "move" });

        var faWidth = father.width();
        var faHeight = father.height();
        var thisWidth = $this.width() + parseInt($this.css('padding-left')) + parseInt($this.css('padding-right'));
        var thisHeight = $this.height() + parseInt($this.css('padding-top')) + parseInt($this.css('padding-bottom'));

        var mDown = false; //
        var positionX;
        var positionY;
        var moveX;
        var moveY;

        if (random) {
            $thisRandom();
        }

        function $thisRandom() { //随机函数
            $this.each(function(index) {
                var randY = parseInt(Math.random() * (faHeight - thisHeight)); ///
                var randX = parseInt(Math.random() * ($this.parent().width() - thisWidth)); ///
                if (movePosition.toLowerCase() == 'x') {
                    $(this).css({
                        left: randX
                    });
                } else if (movePosition.toLowerCase() == 'y') {
                    $(this).css({
                        top: randY
                    });
                } else if (movePosition.toLowerCase() == 'both') {
                    $(this).css({
                        top: randY,
                        left: randX
                    });
                }

            });
        }

        hander.mousedown(function(e) {
            father.children("a").css({ "zIndex": "10" });
            $this.css({ "zIndex": "11" });
            mDown = true;
            X = e.pageX;
            Y = e.pageY;
            positionX = $this.position().left;
            positionY = $this.position().top;
            return false;
        });

        $("#drop_start,#drop_end").mouseup(function(e) {
            mDown = false;
            mouseupCallBack.call($this);
        });

        $(document).mousemove(function(e) {
            xPage = e.pageX; //--
            moveX = positionX + xPage - X;

            yPage = e.pageY; //--
            moveY = positionY + yPage - Y;

            function thisXMove() { //x轴移动
                if (mDown == true) {
                    $this.css({ "left": moveX });
                } else {
                    return;
                }
                if (moveX < 0) {
                    $this.css({ "left": "0" });
                }
                if (moveX > ($this.parent().width() - thisWidth)) {
                    $this.css({ "left": $this.parent().width() - thisWidth });
                }
                callback.call($this);
                return moveX;
            }

            function thisYMove() { //y轴移动
                if (mDown == true) {
                    $this.css({ "top": moveY });
                } else {
                    return;
                }
                if (moveY < 0) {
                    $this.css({ "top": "0" });
                }
                if (moveY > (faHeight - thisHeight)) {
                    $this.css({ "top": faHeight - thisHeight });
                }
                return moveY;
            }

            function thisAllMove() { //全部移动
                if (mDown == true) {
                    $this.css({ "left": moveX, "top": moveY });
                } else {
                    return;
                }
                if (moveX < 0) {
                    $this.css({ "left": "0" });
                }
                if (moveX > ($this.parent().width() - thisWidth)) {
                    $this.css({ "left": $this.parent().width() - thisWidth });
                }

                if (moveY < 0) {
                    $this.css({ "top": "0" });
                }
                if (moveY > (faHeight - thisHeight)) {
                    $this.css({ "top": faHeight - thisHeight });
                }
            }
            if (movePosition.toLowerCase() == "x") {
                thisXMove();
            } else if (movePosition.toLowerCase() == "y") {
                thisYMove();
            } else if (movePosition.toLowerCase() == 'both') {
                thisAllMove();
            }
        });
    }
});


function fz(num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num
}
Date.prototype.Format = function(fmt) { //author: meizz 
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    // 给Date对象添加getYMD方法，获取字符串形式的年月日
Date.prototype.getYMD = function() {
        // 将结果放在数组中，使用数组的join方法返回连接起来的字符串，并给不足两位的天和月十位上补零
        return [this.getFullYear(), fz(this.getMonth() + 1), fz(this.getDate())].join("-");
    }
    // 给String对象添加getDate方法，使字符串形式的日期返回为Date型的日期
String.prototype.getDate = function() {
    var strArr = this.split('-');
    return new Date(strArr[0], strArr[1] - 1, strArr[2]);
}