/**
 * 登录页面JS
 * by 2016-11-24
 */
define([
    'angular',
    'jquery',
    'layer',
    'module/login/js/login.app',
    'module/login/js/login.service',
    'module/login/js/login.factory',
    'module/login/js/login.directive',
    'module/login/js/login.test'
], function (angular, $, layer, app) {
    app.controller('login', login);

    login.$inject = ['$scope', '$http', '$location', 'loginService'];

    function login($scope, $http, $location, loginService) {
        //防止点击过快重复登录
        $scope.isPost = false;

        $scope.isFocus = true;

        // 语言包代码需要修改
        $scope.getLangData = function (url) {
            
            $.ajax({
                url: url,
                contentType: "json",
                type: "get",
                dataType: "json",
                success: function (data) {
                    data = JSON.stringify(data);
                    localStorage.setItem("lang", data);
                    //$.setSession('lang',data);
                },
                error: function (xhr, error, thrown) {
                    if (error.timeout == "timeout") {
                    } else {
                        console.error("其他错误信息");
                    }
                }
            })
        };
        // 代码需要修改
        $scope.loadDictionary = function (url) {
            $.ajax({
                url: url,
                contentType: "json",
                type: "get",
                dataType: "json",
                success: function (data) {
                    data = JSON.stringify(data);
                    localStorage.setItem("_dictionary", data);
                },
                error: function (xhr, error, thrown) {
                    if (error.timeout == "timeout") {
                    } else {
                        console.error("其他错误信息");
                    }
                }
            })
        };

        var changeLang = function (key) {
            if (key === 'zh_CN') {
                $.extend($scope.lang, getChineseLang());
            } else if (key === 'zh_TW') {
                $.extend($scope.lang, getTwLang());
            } else if (key == 'en_GB') {
                $.extend($scope.lang, getEnglishLang());
            }
        };

        var getChineseLang = function () {
            return {
                "ATMS_00_00_03": "登录账号",
                "ATMS_08_00_70": "用户名"
            };
        };

        var getTwLang = function () {
            return {
                "ATMS_00_00_03": "登錄帳號",
                "ATMS_08_00_70": "用戶名"
            }
        };

        var getEnglishLang = function () {
            return {
                "ATMS_00_00_03": "Login Account",
                "ATMS_08_00_70": "User Name"
            };
        };

        //登录页 多语言 在页面内初始化
        $scope.lang = {
            "ATMS_00_00_07": "简体",
            "ATMS_00_00_08": "繁體",
            "ATMS_00_00_09": "English",
            "ATMS_00_00_03": "登录账号",
            "ATMS_08_00_70": "用户名",
            "ATMS_00_00_04": "登录密码",
            "ATMS_08_00_73": "密码",
            "ATMS_00_00_01": "登录",
            "ATMS_00_00_05": "©2015-2017　东方网力股份有限公司",
            "ATMS_00_00_06": "公安交通集成指挥平台　v1.1",
            "ATMS_00_00_10": "请输入用户名！",
            "ATMS_00_00_11": "请输入密码！",
            "ATMS_00_00_12": "用户名格式不对,由字母、数字、下划线组成！",
            "ATMS_00_00_13": "用户账号已过期或已被禁用！",
            "ATMS_00_00_14": "用户名或密码错误！",
            "ATMS_00_00_15": "服务器繁忙，请稍后重试！"
        };

        //定义传递的对象
        $scope.loginParams = {};
        /**
         * [clearContext 清除上下文]
         * @return {[type]} [description]
         */
        $scope.clearContext = function () {
            //清除localStorage变量
            !!window.localStorage && window.localStorage.clear();

            // 清除sessionStorage变量
            !!window.sessionStorage && window.sessionStorage.clear();
        };

        //输入框获取焦点事件
        $(".field input").on({
            //触发焦点事件
            focus: function () {
                $(".field input").removeClass("active").parent().removeClass("current");
                $(this).addClass("active").parent().addClass("current");
            },

            //焦点移出事件
            blur: function () {
                $(this).removeClass("active");
            }
        });

        //用户名一键清除、密码框眼睛事件
        $(".field input").on({
            //输入内容时
            input: function () {
                if (!$(this).val() == '') {
                    $(this).next().show();
                } else {
                    $(this).next().hide();
                }
            },

            //焦点移出事件
            focus: function () {
                if (!$(this).val() == '') {
                    $(this).next().show();
                } else {
                    $('.pwd-field i.pwd-eye').hide();
                }
            }
        });

        //点击其他地方  隐藏眼睛
        $(document).bind('click', function (e) {
            var target = $(e.target);
            if (target.closest('.pwd-field').length == 0) {
                $('.pwd-field input').attr('type', 'password')
                $('.pwd-field i.pwd-eye').hide();
            }
        });

        //密码明文
        $scope.showText = function () {
            ($('.pwd-field input').attr('type') == 'password') ? ($('.pwd-field input').attr('type', 'text')) : ($('.pwd-field input').attr('type', 'password'))
        };

        //一键清空用户名
        $scope.clearText = function () {
            $('.username-field i.uname-clear').hide();
            $('.username-field input').val('');
            $('.J-username').focus();
        };

        // 登录错误弹框
        $scope.notifyWarn = function (val) {
            $(".notify").addClass("notify-warn");
            $(".notify span.notify-edit").html(val);
            setTimeout(function () {
                $(".notify").removeClass("notify-warn");
            }, 2000)
        };

        //登录前的表单验证
        $scope.validate = function (username, password) {
            if (username === "") {
                $scope.notifyWarn($scope.lang.ATMS_00_00_10);
                $('.J-username').focus();
                return false;
            }
            if (!(/^[a-zA-Z0-9_]{0,50}$/.test(username))) {
                $scope.notifyWarn($scope.lang.ATMS_00_00_12);
                $('.J-username').focus();
                return false;
            }
            if (password === "") {
                $scope.notifyWarn($scope.lang.ATMS_00_00_11);
                $('.J-password').focus();
                return false;
            }
            return true;
        };

        /**
         * 多语言选择(language)
         * 中文:zh_CN
         * 英文:en_GB
         * 台湾:zh_TW
         */
        $scope.chooLang = function (key) {
            $scope.loginParams.language = key;
            var url = '/libs/language/menu_zh.json',
                dicurl = '/libs/language/dictionary_zh.json';
            if (key === 'zh_CN') {
                url = '/libs/language/menu_zh.json';
                dicurl = '/libs/language/dictionary_zh.json';
            } else if (key === 'zh_TW') {

            } else if (key == 'en_GB') {
                url = '/libs/language/menu_en.json';
                dicurl = '/libs/language/dictionary_en.json';
            }
            changeLang(key);
            $scope.getLangData(url);
            $scope.loadDictionary(dicurl);
        };
        /**
         * 登录提交
         * @return $scope.loginParams 传递的字段
         * _method = 'post'
         */
        $scope.loginClick = function () {
            if (!!$scope.isPost) {
                return
            };
            // $scope.isPost = true;

            //表单验证
            if (!$scope.validate($scope.Jusername, $scope.Jpassword)) {
                // $scope.isPost = false;
                return;
            };


            loginService.login($scope.loginParams.username, $scope.loginParams.password).then(function(data){
                window.sessionStorage.setItem("loginToken", data);
                window.location.href = "/html/index.html";
            },function(res){
                layer.msg("用户名或密码错误, 请重新输入");
            },function(msg){
            });

            //提交
            //定义$http的基本参数
            /*var setting = {
                url: "/api/auth",
                method: 'POST',
                data: {
                    "username": $scope.loginParams.username,
                    "password": md5Service.md5($scope.loginParams.password)
                }
            };
            $http(setting).success(function (data) {
                console.log(data);
                $scope.isPost = false;
                if (data.code === 200) {
                    //是否登陆异常
                    if (typeof data.data === 'string') {
                        if (data.data === '700') {//用户名密码错误
                            $scope.notifyWarn($scope.lang.ATMS_00_00_14);
                        } else if (data.data === '600') {//登录用户时效过期
                            $scope.notifyWarn($scope.lang.ATMS_00_00_13);
                        }
                        return;
                    }
                    ;
                    $scope.isPost = false;
                    //正常登录，写入缓存变量
                    $.setSession('user-info', $.extend(data.data.person, data.data.user));
                    $.setSession('loginFlag', true);
                    $.setSession('pwd-login-info', $scope.loginParams.password);
                    $.setSession('user-login-info', $scope.loginParams.username);

                    //权限存储
                    $.setSession('authority', data.data.authority);

                    //缓存当前页面的地址
                    $.setSession('location', $location.protocol() + '://' + $location.host() + ':' + $location.port());

                    //跳转页面到首页
                    window.location.href = "/html/index.html";
                }
            }).error(function () {          // 服务器繁忙，请稍后重试！
                $scope.isPost = false;
                $scope.notifyWarn($scope.lang.ATMS_00_00_15);
            });*/
        };

        /**
         * 初始化加载
         */
        $scope.init = function () {
            //清除上下文
            $scope.clearContext();
            //初始化默认选择中文
            $scope.loginParams.language = 'zh_CN';
            //初始化用户名获得焦点
            //$('.J-username').focus();
        };
        $scope.init();

        $(function () {
            $scope.chooLang('zh_CN');
        });
    };

});
