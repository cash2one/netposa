/**
 * 工具方法
 * @author simba
 * @date   2016-09-09
 *
 * 项目一些基础工具方法
 * 包括 JQ 的一些拓展工具方法 和 对象原型的拓展 还有全局委托的一些事件
 */
define(['jquery'], function ($) {

    $.extend($, {
        //设置cookie
        setCookie: function (name, value, time) {
            var cookie = name + "=" + encodeURIComponent(value);
            if (typeof time === "number") {
                cookie += "; max-age=" + time;
            }
            document.cookie = cookie;
        },
        //获取cookie
        getCookie: function (key) {
            var cookie = {};
            var all = document.cookie;
            if (all === "") {
                return null;
            }
            var list = all.split("; ");


            for (var i = 0; i < list.length; i++) {
                var singleCookie = list[i];
                var p = singleCookie.indexOf("=");
                var name = singleCookie.substring(0, p);
                var value = singleCookie.substring(p + 1);
                value = decodeURIComponent(value);
                if (key && key == name) {
                    return value;
                }
            }
            return null;
        },
        /*通过key/value值获取objec在数组中的索引*/
        getObjIndexByKey: function (arr, key, value) {
            for (var k in arr) {
                if (arr[k][key] == value) {
                    return k;
                }
            }
            return -1;
        },
        /**
         * 判断是否是IE  by cygnet 2016.11.08
         * @returns {boolean}
         */
        isIE: function () {
            return (!!window.ActiveXObject || "ActiveXObject" in window);
        },
        /**
         * 判断是否是Edge 浏览器 by cgynet 2016.11.14
         */
        isEdge: function () {
            var userAgent = navigator.userAgent.toLowerCase();
            return /edge/.test(userAgent);
        },
        /**
         * 判断当前浏览器是否chrome30及以下版本，如果是，则返回true by cygnet 2016.11.08
         * @returns {boolean}
         * @constructor
         */
        judgeChromeVersion: function () {
            var version = 0;
            var userAgent = navigator.userAgent.toLowerCase();
            userAgent.replace(/chrome\/(\d+)\.(.*?)/gi, function ($0, $1) {
                version = $1 - 0;
            });
            return (version <= 40);
        },
        //正则判断邮箱
        checkMail: function (mail) {
            var regstr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regstr.test(mail);
        },
        //正则判断电话
        checkTel: function (tel) {
            var regstr = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/i;
            //  /^(1[34578])[0-9]{8}$/i
            return regstr.test(tel);
        },
        //检测非法字符
        checkIllegalChar: function (str) {
            var reg = /[\?\~\!@#\$%\^&\*-\/\+\\\$\.\;\<\>\"\=\{\}\']/;
            if (reg.test(str)) {
                return false;
            }
            return true;
        },
        //将秒为单位的时间格式化为xx:xx:xx
        timeFormat: function (timestamp) {
            var timeStr = "";
            var hour, minute, second;
            hour = Math.floor(timestamp / (60 * 60));
            // hour = hour>9?hour:"0"+hour;
            minute = Math.floor(timestamp % (60 * 60) / 60);
            // minute = minute>9?minute:"0"+minute;
            second = Math.floor(timestamp % (60 * 60) % 60);
            // second = second>9?second:"0"+second;
            // return hour+":"+minute+":"+second;
            if (hour > 0) {
                //  timeStr += "<span>"+hour+"</span>"+"小时";
                timeStr += "<span class='timeColor_red'>" + hour + "</span>" + "小时" + "";
            }
            if (minute > 0) {
                timeStr += "<span class='timeColor_red'>" + minute + "</span>" + "分钟"
            }
            timeStr += "<span class='timeColor_red'>" + second + "</span>" + "秒";
            return timeStr;
        },
        //注册windows事件
        addEventListener: function (event, fun) {
            if (window.addEventListener) {
                window.addEventListener(event, fun);
            } else {
                //attachEvent兼容IE8以下
                window.attachEvent(event, fun);
            }
        },
        //返回IE版本，非IE返回999
        ieVersion: function () {
            var version = navigator.appVersion.split(";")[1].replace(/[ ]/g, "").split("MSIE")[1];
            if (version) {
                return version;
            } else {
                return 999;
            }
        },
        //IE8不支持array.indexOf
        indexOf: function (arr, value) {
            for (var key in arr) {
                if (arr[key] == value) {
                    return key;
                }
            }
            return -1;
        },
        //打开不会被拦截的新页面
        openUrl: function (url) {
            var f = document.createElement("form");
            f.setAttribute("action", url);
            f.setAttribute("method", 'post');
            f.setAttribute("target", '_blank');
            document.body.appendChild(f)
            f.submit();
        },
        //阻止冒泡事件
        cancelBubble: function (event) {
            event = event ? event : window.event;
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        },
        //go404页面
        go404: function () {
            require(["mall/js/controller/404Controller" + _min], function (_call) {
                _call && _call("pages/404.html", {});
            });
        },
        //动态更新title
        setTitle: function (title) {
            try {
                $("title").html(title);
            } catch (e) {
                return true;
            }
        },
        getBt: function (str) {
            var char = str.match(/[^\x00-\xff]/ig);
            return str.length + (char == null ? 0 : char.length);
        },
        //限定字符串长度
        cutString: function (content, size) {
            var str = "";
            if (content) {
                var len = content.gblen(), len_count = 0;
                for (var i = 0, n = content.length; i < n; i++) {
                    len_count = len_count + $.getBt(content[i]);
                    str = str + content[i];
                    if (len_count > size) {
                        str = str + "...";
                        break;
                    }
                }
            }
            return str;
        },
        //判断是否为pc端
        isPC: function () {
            var userAgentInfo = navigator.userAgent;
            var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        },
        //加载css文件
        asynCss: function (css_arr, callback) {
            var count = 0;
            if (!css_arr) {
                return;
            }
            if (css_arr.length == 0) {
                callback && callback();
            }
            for (var i = 0, n = css_arr.length; i < n; i++) {
                var link = document.createElement("link");
                link.type = "text/css";
                link.rel = "stylesheet";
                //link.href = css_arr[i] + "?v=" + (_version ? _version : $.getVersion());
                link.href = css_arr[i];

                var linkSize = $("#atmsHead").find("link[href='" + css_arr[i] + "']").size();
                console.log(linkSize);
                if (linkSize == 0) {
                    $("#atmsHead")[0].appendChild(link);
                }
                // document.getElementsByTagName("head")[0].appendChild( link );
                link.onload = function () {
                    ++count;
                    if (count == css_arr.length) {
                        callback && callback();
                    }
                };
            }
        },
        loadImgError: function (_me) {
            _me.src = $(_me).data("errorsrc");
        },
        //判断是否是IE9以下的浏览器
        ltIE9: function () {
            var browser = navigator.appName;
            var b_version = navigator.appVersion;
            var version = b_version.split(";");
            if (version.length > 1) {
                var trim_Version = parseInt(version[1].replace(/[ ]/g, "").replace(/MSIE/g, ""));
                if (trim_Version <= 9) {
                    return true;
                }
            }
            return false;
        },
        thumbImg: function (url, size) {
            var arr = url.split(".");
            var flag = "." + arr[arr.length - 1];
            var newArr = url.split(flag);
            return newArr[0] + "_" + size + flag + newArr[1];
        },
        //简单封装ajax
        _ajax: function (url, data, method, callback) {
            // if(data){  //统一传递参数格式
            //     data = "param=" + JSON.stringify(data);
            // }

            $.ajax({
                url: url,
                type: method,
                dataType: 'json',
                data: data,
                async: true,
                success: function (data) {
                    if (data.code == 511000) {
                        alert(data.message);
                        return;
                    }
                    //未登录或者登录已过期
                    if (data.code == 400002) {
                        $.setCookie("username", "");
                        location.reload();
                    }
                    callback && callback(data);
                },
                error: function (a, b, c) {
                    console.error(a.status + "--" + c);
                }
            });
        },
        //H5存储缓存 localStorage
        setCache: function (key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        //获取缓存
        getCache: function (key) {
            var newkey = localStorage.getItem(key) ? localStorage.getItem(key) : "null";
            return JSON.parse(newkey);
            //return JSON.parse(localStorage.getItem(key));
        },
        //删除缓存
        removeCache: function (key) {
            localStorage.removeItem(key);
        },
        //H5存储缓存 sessionStorage
        setSession: function (key, value) {
            sessionStorage.setItem(key, JSON.stringify(value));
        },
        //获取缓存
        getSession: function (key) {
            var newkey = !!sessionStorage.getItem(key) && sessionStorage.getItem(key) !== 'undefined' ? sessionStorage.getItem(key) : "null";
            return JSON.parse(newkey);
        },
        //删除缓存
        removeSession: function (key) {
            sessionStorage.removeItem(key);
        },
        //判断是否是空对象
        isEmptyObject: function (e) {
            var t;
            for (t in e)
                return !1;
            return !0
        }
    });


    /**********************************************
     * 原型拓展 2016.09.09
     * by simba
     *********************************************/

    /**
     * 计算字符串的字节长度
     * @return {[type]} [description]
     */
    String.prototype.gblen = function () {
        if (!this.charCodeAt) {
            return
        }
        ;

        var _len = 0;
        for (var i = 0; i < this.length; i++) {
            if (this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94) {
                _len += 2;
            } else {
                _len++;
            }
        }
        return _len;
    }

    /**
     * 数组去重  ps：包括对象数组去重
     * @author simba
     * @date   2016-12-27
     */
    Array.prototype.ToRepeat = function () {
        var _res = [];
        var _json = {};
        //判断是否是object对象（ps：仅仅只是简单的判断，混合型数组无法判断）
        if (typeof this[0] == 'object') {//是
            var _unique = {};
            this.forEach(function (gpa) {
                _unique[JSON.stringify(gpa)] = gpa;
            });
            _res = Object.keys(_unique).map(function (u) {
                return JSON.parse(u);
            });
        } else {//不是
            for (var i = 0; i < this.length; i++) {
                if (!_json[this[i]]) {
                    _res.push(this[i]);
                    _json[this[i]] = 1;
                }
            }
        }
        return _res;
    }

    /**
     * 数组去重合并
     * @param {[type]} arr1 [数组1]
     * @param {[type]} arr2 [数组2]
     */
    Array.prototype.ToRepeatMerge = function (arr1, arr2) {
        if (!(arr1 instanceof Array) || !(arr2 instanceof Array)) {
            console.error("数组合并需要两个数组参数哦！");
        }
        var _arr = [];
        _arr = arr1.concat(arr2);
        return _arr.ToRepeat();
    }

    /**
     * 判断数组是否含有空值
     */
    Array.prototype.HasNull = function () {
        if (!(this instanceof Array)) {
            console.error("需要数组对象！");
            return;
        }

        var len = this.length;
        var hasNull = true;
        for (var i = 0; i < len; i++) {
            if (!this[i]) {
                hasNull = false && hasNull;
            } else {
                hasNull = true && hasNull;
            }
        }
        return hasNull;
    }

    /**********************************************
     * 注册全局事件 2016.09.09
     * by simba
     *********************************************/

    /**
     * 侧边栏收起时 鼠标悬浮 提示文字
     * @param
     * @return
     */
    $('body').on('mouseenter', '.slider-list li', function () {
        var $this = $(this);
        var thisIndex = $this.parent().find('li').index($this);
        var $slider = $this.parents('.slider');
        var thisTxt = $this.find('.slider-txt').text();
        var $sliderPop = $slider.find('.slider-pop');

        var tmp = '<div class="slider-pop">' + thisTxt + '</div>';

        if (!$slider.hasClass('slider-min')) {
            return false;
        }

        if ($slider.find(".slider-pop").length == 0) {
            $slider.append(tmp);
            $slider.find('.slider-pop').css({'top': thisIndex * 40 + 30 + 'px'});
        } else {
            $sliderPop.text(thisTxt).fadeIn(200).css({'top': thisIndex * 40 + 30 + 'px'});
        }
    });

    /**
     * 鼠标离开侧边栏  提示文案消失
     * @param
     * @return
     */
    $('body').on('mouseleave', '.slider-list', function () {
        var $sliderPop = $(this).parents('.slider').find('.slider-pop');

        $sliderPop.fadeOut();
    });
});


