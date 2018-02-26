define(["require", "exports", "./login.app", "./login.service", "../common/system-config", "angular", "css!../../style/common/layer.css", "./login.service", "des3", "./layerMsg.factory"], function (require, exports, login_app_1, login_service_1, system_config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var des3 = require('des3');
    var LoginController = (function () {
        function LoginController($scope, $timeout, layerDec, loginService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.layerDec = layerDec;
            this.loginService = loginService;
            this.isLogining = false;
            this.USER_INFO_KEY = system_config_1.SystemConfig.USER_INFO_KEY;
            this.LOGIN_DATA_KEY = "login_data";
            this.ENCRYPT_KEY = "sensenets";
            this.isRemember = true;
            this.loginParams = new login_service_1.LoginParams();
            this.loginParams.username = "";
            this.loginParams.password = "";
            this.initLoginData();
            console.log(this.loginParams);
        }
        LoginController.prototype.initLoginData = function () {
            var data = this.getFromLocalStorage(this.LOGIN_DATA_KEY);
            if (data != null) {
                data.password = des3.decrypt(this.ENCRYPT_KEY, data.password);
            }
            if (data) {
                this.loginParams.username = data.username;
                this.loginParams.password = data.password;
            }
        };
        LoginController.prototype.login = function () {
            var _this = this;
            if (!this.loginParams.username) {
                this.layerDec.failInfo("请输入账号");
                return;
            }
            if (!this.loginParams.password) {
                this.layerDec.failInfo("请输入密码");
                return;
            }
            if (!this.isLogining) {
                this.isLogining = true;
                this.loginService.login(this.loginParams)
                    .then(this.loginSuccess.bind(this))
                    .catch(this.loginError.bind(this)).then(function () {
                    _this.isLogining = false;
                });
            }
        };
        LoginController.prototype.loginSuccess = function (datas) {
            if (this.isRemember) {
                this.saveLoginData(this.loginParams);
            }
            this.updateLoginInfo(datas);
            if (!this.isRemember) {
                this.removeLocalStorage(this.LOGIN_DATA_KEY);
            }
            window.location.href = "/html/";
        };
        LoginController.prototype.loginError = function (err) {
            console.error("登录出错", err.code, err.err);
        };
        LoginController.prototype.saveLoginData = function (params) {
            var datas = params;
            var _data = des3.encrypt(this.ENCRYPT_KEY, datas.password);
            datas.password = _data;
            this.saveToSessionStorage(this.LOGIN_DATA_KEY, datas);
        };
        LoginController.prototype.saveToLocalStorage = function (key, data) {
            try {
                localStorage.setItem(key, angular.toJson(data));
            }
            catch (e) {
                console.error(e);
            }
            console.log("写入saveToLocalStorage ");
        };
        LoginController.prototype.changeRemember = function () {
            this.isRemember = !this.isRemember;
        };
        LoginController.prototype.saveToSessionStorage = function (key, data) {
            sessionStorage.setItem(key, angular.toJson(data));
            console.log("写入saveToSessionStorage");
        };
        LoginController.prototype.getFromLocalStorage = function (key) {
            var result = null;
            try {
                result = angular.fromJson(localStorage.getItem(key));
            }
            catch (e) {
                result = null;
                console.error(e);
            }
            return result;
        };
        LoginController.prototype.removeLocalStorage = function (key) {
            localStorage.removeItem(key);
        };
        LoginController.prototype.removeSessionStorage = function (key) {
            sessionStorage.removeItem(key);
        };
        LoginController.prototype.updateLoginInfo = function (loginInfo) {
            try {
                localStorage.setItem(this.USER_INFO_KEY, angular.toJson(loginInfo));
            }
            catch (e) {
                console.error(e);
            }
        };
        ;
        LoginController.$inject = ['$scope', '$timeout', 'layerDec', 'loginService'];
        return LoginController;
    }());
    login_app_1.loginApp
        .controller('loginController', LoginController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbG9naW4vbG9naW4uY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFrQkEsSUFBSSxJQUFJLEdBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVCO1FBU0kseUJBQW9CLE1BQVUsRUFBUyxRQUFpQixFQUFTLFFBQWtCLEVBQVMsWUFBMEI7WUFBbEcsV0FBTSxHQUFOLE1BQU0sQ0FBSTtZQUFTLGFBQVEsR0FBUixRQUFRLENBQVM7WUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFVO1lBQVMsaUJBQVksR0FBWixZQUFZLENBQWM7WUFOdEgsZUFBVSxHQUFXLEtBQUssQ0FBQztZQUUzQixrQkFBYSxHQUFHLDRCQUFZLENBQUMsYUFBYSxDQUFDO1lBQzNDLG1CQUFjLEdBQUcsWUFBWSxDQUFDO1lBQzlCLGdCQUFXLEdBQUcsV0FBVyxDQUFDO1lBR3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSwyQkFBVyxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUdELHVDQUFhLEdBQWI7WUFDSSxJQUFJLElBQUksR0FBZSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3JFLEVBQUUsQ0FBQSxDQUFDLElBQUksSUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFDO2dCQUNYLElBQUksQ0FBQyxRQUFRLEdBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMs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LEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3hFLENBQUM7WUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDO2dCQUNQLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsQ0FBQztRQUNMLENBQUM7UUFBQSxDQUFDO1FBcElLLHVCQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLFVBQVUsRUFBQyxjQUFjLENBQUMsQ0FBQztRQXFJckUsc0JBQUM7S0F0SUQsQUFzSUMsSUFBQTtJQUNELG9CQUFRO1NBQ0gsVUFBVSxDQUFDLGlCQUFpQixFQUFFLGVBQWUsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9sb2dpbi9sb2dpbi5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOeZu+W9leaOp+WItlxyXG4gKiBAdGltZTogMjAxNy0wNS0xMCAxMDo1Mjo0NVxyXG4gKiBAcGFyYW1zOlxyXG4gKiBAcmV0dXJuOlxyXG4gKi9cclxuaW1wb3J0ICdhbmd1bGFyJztcclxuaW1wb3J0IFwiY3NzIS4uLy4uL3N0eWxlL2NvbW1vbi9sYXllci5jc3NcIlxyXG5pbXBvcnQgXCIuL2xvZ2luLnNlcnZpY2VcIlxyXG5pbXBvcnQge2xvZ2luQXBwfSBmcm9tIFwiLi9sb2dpbi5hcHBcIjtcclxuaW1wb3J0IHtJTG9naW5TZXJ2aWNlLCBMb2dpblBhcmFtc30gZnJvbSBcIi4vbG9naW4uc2VydmljZVwiO1xyXG5pbXBvcnQge1N5c3RlbUNvbmZpZ30gZnJvbSBcIi4uL2NvbW1vbi9zeXN0ZW0tY29uZmlnXCI7XHJcbmltcG9ydCAgXCJkZXMzXCI7XHJcbmltcG9ydCB7TG9naW5Vc2VySW5mb30gZnJvbSBcIi4uLy4uL2NvcmUvZW50aXR5L2V4L1VzZXJFeFwiO1xyXG5pbXBvcnQge0lMYXllckRlY30gZnJvbSBcIi4vbGF5ZXJNc2cuZmFjdG9yeVwiO1xyXG5pbXBvcnQgIFwiLi9sYXllck1zZy5mYWN0b3J5XCI7XHJcbmRlY2xhcmUgbGV0IHJlcXVpcmU6YW55O1xyXG5kZWNsYXJlIGxldCBhbmd1bGFyOmFueTtcclxubGV0IGRlczMgPSAgcmVxdWlyZSgnZGVzMycpO1xyXG5jbGFzcyBMb2dpbkNvbnRyb2xsZXJ7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJywnJHRpbWVvdXQnLCdsYXllckRlYycsJ2xvZ2luU2VydmljZSddO1xyXG4gICAgbG9naW5QYXJhbXM6TG9naW5QYXJhbXM7XHJcbiAgICBpc0xvZ2luaW5nOmJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGlzUmVtZW1iZXI6Ym9vbGVhbjtcclxuICAgIFVTRVJfSU5GT19LRVkgPSBTeXN0ZW1Db25maWcuVVNFUl9JTkZPX0tFWTtcclxuICAgIExPR0lOX0RBVEFfS0VZID0gXCJsb2dpbl9kYXRhXCI7XHJcbiAgICBFTkNSWVBUX0tFWSA9IFwic2Vuc2VuZXRzXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6YW55LHByaXZhdGUgJHRpbWVvdXQ6RnVuY3Rpb24scHJpdmF0ZSBsYXllckRlYzpJTGF5ZXJEZWMscHJpdmF0ZSBsb2dpblNlcnZpY2U6SUxvZ2luU2VydmljZSl7XHJcbiAgICAgICAgdGhpcy5pc1JlbWVtYmVyID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxvZ2luUGFyYW1zID0gbmV3IExvZ2luUGFyYW1zKCk7XHJcbiAgICAgICAgdGhpcy5sb2dpblBhcmFtcy51c2VybmFtZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5sb2dpblBhcmFtcy5wYXNzd29yZCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5pbml0TG9naW5EYXRhKCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubG9naW5QYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W5pys5Zyw5pWw5o2u6Kej5a+G5ZCO6L+U5ZueXHJcbiAgICBpbml0TG9naW5EYXRhKCl7XHJcbiAgICAgICAgbGV0IGRhdGE6TG9naW5QYXJhbXMgPSB0aGlzLmdldEZyb21Mb2NhbFN0b3JhZ2UodGhpcy5MT0dJTl9EQVRBX0tFWSk7XHJcbiAgICAgICAgaWYoZGF0YSE9bnVsbCl7XHJcbiAgICAgICAgICAgIGRhdGEucGFzc3dvcmQgPSAgZGVzMy5kZWNyeXB0KHRoaXMuRU5DUllQVF9LRVksZGF0YS5wYXNzd29yZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGRhdGEpe1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2luUGFyYW1zLnVzZXJuYW1lID0gZGF0YS51c2VybmFtZTtcclxuICAgICAgICAgICAgdGhpcy5sb2dpblBhcmFtcy5wYXNzd29yZCA9IGRhdGEucGFzc3dvcmQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxvZ2luKCl7XHJcbiAgICAgICAgaWYoIXRoaXMubG9naW5QYXJhbXMudXNlcm5hbWUpe1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyRGVjLmZhaWxJbmZvKFwi6K+36L6T5YWl6LSm5Y+3XCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF0aGlzLmxvZ2luUGFyYW1zLnBhc3N3b3JkKXtcclxuICAgICAgICAgICAgdGhpcy5sYXllckRlYy5mYWlsSW5mbyhcIuivt+i+k+WFpeWvhueggVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighdGhpcy5pc0xvZ2luaW5nKXtcclxuICAgICAgICAgICAgdGhpcy5pc0xvZ2luaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubG9naW5TZXJ2aWNlLmxvZ2luKHRoaXMubG9naW5QYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAudGhlbih0aGlzLmxvZ2luU3VjY2Vzcy5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKHRoaXMubG9naW5FcnJvci5iaW5kKHRoaXMpKS50aGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0xvZ2luaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnmbvlvZXor7fmsYLmiJDlip9cclxuICAgICAqIEBwYXJhbSBkYXRhc1xyXG4gICAgICovXHJcbiAgICBsb2dpblN1Y2Nlc3MoZGF0YXM6IExvZ2luVXNlckluZm8pe1xyXG4gICAgICAgIGlmKHRoaXMuaXNSZW1lbWJlcil7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZUxvZ2luRGF0YSh0aGlzLmxvZ2luUGFyYW1zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVMb2dpbkluZm8oZGF0YXMpO1xyXG4gICAgICAgIGlmKCF0aGlzLmlzUmVtZW1iZXIpe1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUxvY2FsU3RvcmFnZSh0aGlzLkxPR0lOX0RBVEFfS0VZKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9odG1sL1wiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiDnmbvlvZXor7fmsYLlpLHotKVcclxuICAgICAqIEBwYXJhbSBlcnJcclxuICAgICAqL1xyXG4gICAgbG9naW5FcnJvcihlcnI6IGFueSl7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIueZu+W9leWHuumUmVwiLCBlcnIuY29kZSwgZXJyLmVycik7XHJcbiAgICB9XHJcblxyXG4gICAgLy/kv53lrZjliY3liqDlr4ZcclxuICAgIHNhdmVMb2dpbkRhdGEocGFyYW1zOiBMb2dpblBhcmFtcyl7XHJcbiAgICAgICAgbGV0IGRhdGFzOkxvZ2luUGFyYW1zID0gcGFyYW1zO1xyXG5cclxuICAgICAgICBsZXQgX2RhdGE6c3RyaW5nID0gZGVzMy5lbmNyeXB0KHRoaXMuRU5DUllQVF9LRVksZGF0YXMucGFzc3dvcmQpO1xyXG5cclxuICAgICAgICBkYXRhcy5wYXNzd29yZCA9IF9kYXRhO1xyXG4gICAgICAgIHRoaXMuc2F2ZVRvU2Vzc2lvblN0b3JhZ2UodGhpcy5MT0dJTl9EQVRBX0tFWSwgZGF0YXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVUb0xvY2FsU3RvcmFnZShrZXk6c3RyaW5nLCBkYXRhOkxvZ2luUGFyYW1zKXtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgYW5ndWxhci50b0pzb24oZGF0YSkpO1xyXG4gICAgICAgIH1jYXRjaCAoZSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5YaZ5YWlc2F2ZVRvTG9jYWxTdG9yYWdlIFwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRvbeiwg+eUqCwg5pS55Y+Y6K6w5L2P5a+G56CB54q25oCBXHJcbiAgICAgKi9cclxuICAgIGNoYW5nZVJlbWVtYmVyKCl7XHJcbiAgICAgICAgdGhpcy5pc1JlbWVtYmVyID0gISB0aGlzLmlzUmVtZW1iZXI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHNhdmVUb1Nlc3Npb25TdG9yYWdlKGtleTpzdHJpbmcsZGF0YTphbnkpe1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oa2V5LGFuZ3VsYXIudG9Kc29uKGRhdGEpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuWGmeWFpXNhdmVUb1Nlc3Npb25TdG9yYWdlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEZyb21Mb2NhbFN0b3JhZ2Uoa2V5OnN0cmluZyl7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcblxyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgcmVzdWx0ID0gYW5ndWxhci5mcm9tSnNvbihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcclxuICAgICAgICB9Y2F0Y2ggKGUpe1xyXG4gICAgICAgICAgICByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVMb2NhbFN0b3JhZ2Uoa2V5OnN0cmluZyl7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgIH1cclxuICAgIHJlbW92ZVNlc3Npb25TdG9yYWdlKGtleTpzdHJpbmcpe1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVMb2dpbkluZm8obG9naW5JbmZvOiBMb2dpblVzZXJJbmZvKXtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuVVNFUl9JTkZPX0tFWSwgYW5ndWxhci50b0pzb24obG9naW5JbmZvKSk7XHJcbiAgICAgICAgfWNhdGNoIChlKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcbmxvZ2luQXBwXHJcbiAgICAuY29udHJvbGxlcignbG9naW5Db250cm9sbGVyJywgTG9naW5Db250cm9sbGVyKTsiXX0=
