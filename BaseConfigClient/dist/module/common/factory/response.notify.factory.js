define(["require", "exports", "../app/main.app", "../error.code", "../enum/bubble.code", "./layerMsg.factory"], function (require, exports, main_app_1, error_code_1, bubble_code_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NotifyFactory = (function () {
        function NotifyFactory($injector, $q, i18nFactory, $rootScope) {
            this.$injector = $injector;
            this.$q = $q;
            this.i18nFactory = i18nFactory;
            this.$rootScope = $rootScope;
            console.debug("rootscope", $rootScope);
            this.userAuthErrorCodeMap = {
                401: true,
                4009: true
            };
        }
        NotifyFactory.prototype.msg = function (options) {
            var vm = this;
            return function (origin) {
                var res = (origin || {});
                var layerDec = vm.$injector.get("layerDec");
                var opts = options || {};
                var codeKey = opts.codeKey || "code";
                var code = res[codeKey];
                var onlyError = opts.onlyError;
                var onlySuccess = opts.onlySuccess;
                var message = error_code_1.ErrorCode[code] || error_code_1.ErrorCode["20001"];
                var isError = (code != 200);
                if (vm.filterUserAuthError(code, layerDec)) {
                    console.error("HttpResponseResult Error: ", res);
                    return origin;
                }
                if (onlyError && code == 200) {
                }
                else if (onlySuccess && code == 200) {
                    layerDec.successInfo("<span ng-bind='\"200\"|translate'></span>");
                }
                else if (!onlySuccess) {
                    if (isError) {
                        layerDec.failInfo("<span><span ng-bind='\"500.1\"|translate'></span>:<span ng-bind='\"" + message + "\"|translate'></span></span>", message);
                    }
                    else {
                        layerDec.successInfo("<span ng-bind='\"200\"|translate'></span>");
                    }
                }
                if (code != 200) {
                    console.error("HttpResponseResult Error: ", res);
                }
                return origin;
            };
        };
        ;
        NotifyFactory.prototype.filterUserAuthError = function (code, layerDec) {
            if (this.userAuthErrorCodeMap[code]) {
                layerDec.notCloseInfo("<div class='u-msg-notclose'>" + this.i18nFactory('FDS_00_02_02') + "</div>", this.i18nFactory('FDS_00_05_03'), this.i18nFactory('FDS_00_05_01')).then(function () {
                    window.location.href = "/";
                });
                this.$rootScope.$broadcast(bubble_code_1.BubbleCode.LOGIN_OUT);
                return true;
            }
            else {
                return false;
            }
        };
        NotifyFactory.prototype.test = function () {
            return this.$q.when(null).then(function () {
                return { code: -20002 };
            }).then(this.msg({ onlyError: false })).then(function (res) {
                console.debug("弹出框后打开的东西", res);
            });
        };
        ;
        NotifyFactory.$inject = ["$injector", "$q", "i18nFactory", "$rootScope"];
        return NotifyFactory;
    }());
    main_app_1.app.service("notifyFactory", NotifyFactory);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2ZhY3RvcnkvcmVzcG9uc2Uubm90aWZ5LmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBd0JBO1FBUUksdUJBQW9CLFNBQWMsRUFBVSxFQUFPLEVBQVUsV0FBZ0IsRUFBVSxVQUFlO1lBQWxGLGNBQVMsR0FBVCxTQUFTLENBQUs7WUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFLO1lBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQUs7WUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFLO1lBQ2xHLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxvQkFBb0IsR0FBRztnQkFDeEIsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsSUFBSSxFQUFFLElBQUk7YUFDYixDQUFDO1FBQ04sQ0FBQztRQU9ELDJCQUFHLEdBQUgsVUFBSSxPQUF1QztZQUN2QyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFDZCxNQUFNLENBQUMsVUFBVSxNQUEyQjtnQkFDeEMsSUFBSSxHQUFHLEdBQXNCLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBK0MsQ0FBQztnQkFDMUYsSUFBSSxRQUFRLEdBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3RELElBQUksSUFBSSxHQUFHLE9BQU8sSUFBSyxFQUFvQyxDQUFDO2dCQUM1RCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQztnQkFDckMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN4QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUMvQixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUNuQyxJQUFJLE9BQU8sR0FBRyxzQkFBUyxDQUFDLElBQUksQ0FBQyxJQUFJLHNCQUFTLENBQUMsT0FBTyxD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QUFDLENBQUM7UUEyRnJGLG9CQUFDO0tBNUZELEFBNEZDLElBQUE7SUFDRCxjQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxhQUFhLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL2ZhY3RvcnkvcmVzcG9uc2Uubm90aWZ5LmZhY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcH0gZnJvbSBcIi4uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7RXJyb3JDb2RlfSBmcm9tIFwiLi4vZXJyb3IuY29kZVwiO1xyXG5pbXBvcnQge0lMYXllckRlY30gZnJvbSBcIi4vbGF5ZXJNc2cuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuL2xheWVyTXNnLmZhY3RvcnlcIjtcclxuaW1wb3J0IHtCdWJibGVDb2RlfSBmcm9tIFwiLi4vZW51bS9idWJibGUuY29kZVwiO1xyXG5cclxubmFtZXNwYWNlIFJlc3BvbnNlTm90aWZ5RmFjdG9yeSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIG1zZ09wdHMge1xyXG4gICAgICAgIG9ubHlFcnJvcj86IGJvb2xlYW4sIC8vIOaYr+WQpuWPquaciWNvZGXkuLrplJnor6/nvJbnoIHnmoTml7blgJnmiY3mmL7npLrmj5DnpLrkv6Hmga8g5LiOb25seUVycm9y5LqS5palXHJcbiAgICAgICAgb25seVN1Y2Nlc3M/OiBib29sZWFuLCAvLyDmmK/lkKblj6rmj5DnpLpjb2Rl5Li6MjAw55qE57yW56CBIOS4jm9ubHlTdWNjZXNz5LqS5palXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5Y+W6ZSZ6K+v56CB55qEa2V5LOm7mOiupOS4umNvZGUsIOS9huaYr+W9k+mDqOWIhueJueauiuaDheWGteaXtumcgOimgeS/ruaUuWNvZGVLZXnnmoTlgLxcclxuICAgICAgICAgKiDlpoJyZXNwb25zZUVycm9y5Lyg5p2l55qE5pe25YCZLCDlsLHpnIDopoHliKTmlq1zdGF0dXPnmoTlgLxcclxuICAgICAgICAgKi9cclxuICAgICAgICBjb2RlS2V5Pzogc3RyaW5nXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBJUmVzcG9uc2VOb3RpZnlGYWN0b3J5IHtcclxuICAgIG1zZzogKG9wdGlvbnM/OiBSZXNwb25zZU5vdGlmeUZhY3RvcnkubXNnT3B0cyk9PihyZXM6IFJlc3BvbnNlUmVzdWx0PGFueT4pPT5SZXNwb25zZVJlc3VsdDxhbnk+O1xyXG4gICAgLy8gbWVzc2FnZTogKGxhbmd1YWdlS2V5OiBzdHJpbmcpPT52b2lkO1xyXG4gICAgdGVzdDogKCk9PkZ1bmN0aW9uO1xyXG59XHJcblxyXG5jbGFzcyBOb3RpZnlGYWN0b3J5IGltcGxlbWVudHMgSVJlc3BvbnNlTm90aWZ5RmFjdG9yeSB7XHJcbiAgICBzdGF0aWMgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFtcIiRpbmplY3RvclwiLCBcIiRxXCIsIFwiaTE4bkZhY3RvcnlcIiwgXCIkcm9vdFNjb3BlXCJdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog56ym5ZCI5Lul5LiL6ZSZ6K+v56CB55qELCDmjInnhafnlKjmiLfmsqHmnInmnYPpmZDov5vooYzlpITnkIZcclxuICAgICAqL1xyXG4gICAgdXNlckF1dGhFcnJvckNvZGVNYXA6IHtba2V5Om51bWJlcl06IGJvb2xlYW59O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGluamVjdG9yOiBhbnksIHByaXZhdGUgJHE6IGFueSwgcHJpdmF0ZSBpMThuRmFjdG9yeTogYW55LCBwcml2YXRlICRyb290U2NvcGU6IGFueSkge1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJyb290c2NvcGVcIiwkcm9vdFNjb3BlKTtcclxuICAgICAgICB0aGlzLnVzZXJBdXRoRXJyb3JDb2RlTWFwID0ge1xyXG4gICAgICAgICAgICA0MDE6IHRydWUsXHJcbiAgICAgICAgICAgIDQwMDk6IHRydWVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pmu6YCa55qE5by55Ye65qGG5L+h5oGvXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uczoge29ubHlFcnJvcjogYm9vbGVhbn1cclxuICAgICAqIEByZXR1cm5zIHsocmVzOlJlc3BvbnNlUmVzdWx0PGFueT4pPT51bmRlZmluZWR9XHJcbiAgICAgKi9cclxuICAgIG1zZyhvcHRpb25zPzogUmVzcG9uc2VOb3RpZnlGYWN0b3J5Lm1zZ09wdHMpe1xyXG4gICAgICAgIGxldCB2bSA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvcmlnaW46IFJlc3BvbnNlUmVzdWx0PGFueT4pIHtcclxuICAgICAgICAgICAgbGV0IHJlczp7W2tleTpzdHJpbmddOmFueX0gPSAob3JpZ2luIHx8IHt9KSBhcyAoUmVzcG9uc2VSZXN1bHQ8YW55PiAmIHtba2V5OnN0cmluZ106YW55fSk7XHJcbiAgICAgICAgICAgIGxldCBsYXllckRlYzpJTGF5ZXJEZWMgPSB2bS4kaW5qZWN0b3IuZ2V0KFwibGF5ZXJEZWNcIik7IC8vIOeUseS6jmh0dHBJbnRlcmNlcHRvcuS8muacieW+queOr+S+nei1liwg5omA5Lul5Zyo6L+Z6YeM5q+P5qyh6LCD55So55qE5pe25YCZ6I635Y+WbGF5ZXJcclxuICAgICAgICAgICAgbGV0IG9wdHMgPSBvcHRpb25zIHx8ICh7fSBhcyBSZXNwb25zZU5vdGlmeUZhY3RvcnkubXNnT3B0cyk7XHJcbiAgICAgICAgICAgIGxldCBjb2RlS2V5ID0gb3B0cy5jb2RlS2V5IHx8IFwiY29kZVwiO1xyXG4gICAgICAgICAgICBsZXQgY29kZSA9IHJlc1tjb2RlS2V5XTtcclxuICAgICAgICAgICAgbGV0IG9ubHlFcnJvciA9IG9wdHMub25seUVycm9yO1xyXG4gICAgICAgICAgICBsZXQgb25seVN1Y2Nlc3MgPSBvcHRzLm9ubHlTdWNjZXNzO1xyXG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IEVycm9yQ29kZVtjb2RlXSB8fCBFcnJvckNvZGVbXCIyMDAwMVwiXTtcclxuICAgICAgICAgICAgbGV0IGlzRXJyb3IgPSAoY29kZSAhPSAyMDApO1xyXG5cclxuICAgICAgICAgICAgLy8g6Iul55So5oi35p2D6ZmQ6L+H5ruk5aSx6LSlXHJcbiAgICAgICAgICAgIGlmKHZtLmZpbHRlclVzZXJBdXRoRXJyb3IoY29kZSwgbGF5ZXJEZWMpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiSHR0cFJlc3BvbnNlUmVzdWx0IEVycm9yOiBcIiwgcmVzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcmlnaW47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChvbmx5RXJyb3IgJiYgY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIC8vIOW9k+aTjeS9nOaIkOWKn+S4lOiuvue9ruS6huWPquaYvuekuumUmeivr+aTjeS9nCzkuI3ov5vooYzku7vkvZXmmL7npLpcclxuICAgICAgICAgICAgfSBlbHNlIGlmKG9ubHlTdWNjZXNzICYmIGNvZGUgPT0gMjAwKXtcclxuICAgICAgICAgICAgICAgIC8vIOW9k+iuvue9ruS6huWPquaPkOekuuaIkOWKn+a2iOaBr+aXtui/m+WFpeatpOWIpOaWrVxyXG4gICAgICAgICAgICAgICAgbGF5ZXJEZWMuc3VjY2Vzc0luZm8oXCI8c3BhbiBuZy1iaW5kPSdcXFwiMjAwXFxcInx0cmFuc2xhdGUnPjwvc3Bhbj5cIik7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKCFvbmx5U3VjY2Vzcyl7XHJcbiAgICAgICAgICAgICAgICAvLyDoi6Xorr7nva7kuoZvbmx5U3VjY2VzcyDliJnkuI3ov5vlhaXmraRpZuWIpOaWrVxyXG4gICAgICAgICAgICAgICAgaWYoaXNFcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJEZWMuZmFpbEluZm8oXCI8c3Bhbj48c3BhbiBuZy1iaW5kPSdcXFwiNTAwLjFcXFwifHRyYW5zbGF0ZSc+PC9zcGFuPjo8c3BhbiBuZy1iaW5kPSdcXFwiXCIgKyBtZXNzYWdlICsgXCJcXFwifHRyYW5zbGF0ZSc+PC9zcGFuPjwvc3Bhbj5cIixtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyRGVjLnN1Y2Nlc3NJbmZvKFwiPHNwYW4gbmctYmluZD0nXFxcIjIwMFxcXCJ8dHJhbnNsYXRlJz48L3NwYW4+XCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihjb2RlICE9IDIwMCl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiSHR0cFJlc3BvbnNlUmVzdWx0IEVycm9yOiBcIiwgcmVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDnu6fnu63miorkv6Hmga/lm57kvKDlm57ljrssIOS+m+WFtuS7lnByb21pc2Xkvb/nlKhcclxuICAgICAgICAgICAgcmV0dXJuIG9yaWdpbjtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yy56YWN55So5oi35p2D6ZmQ6ZSZ6K+vLCDoi6XljLnphY3liLDkuoYsIOW8ueahhuWQjui3s+WHuueZu+W9leeVjOmdolxyXG4gICAgICogQHBhcmFtIGNvZGVcclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZmlsdGVyVXNlckF1dGhFcnJvcihjb2RlOiBudW1iZXIsIGxheWVyRGVjOiBJTGF5ZXJEZWMpe1xyXG4gICAgICAgIGlmKHRoaXMudXNlckF1dGhFcnJvckNvZGVNYXBbY29kZV0pe1xyXG4gICAgICAgICAgICAvLyDljLnphY3liLDkuoZcclxuICAgICAgICAgICAgbGF5ZXJEZWMubm90Q2xvc2VJbmZvKFwiPGRpdiBjbGFzcz0ndS1tc2ctbm90Y2xvc2UnPlwiK3RoaXMuaTE4bkZhY3RvcnkoJ0ZEU18wMF8wMl8wMicpK1wiPC9kaXY+XCIsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmkxOG5GYWN0b3J5KCdGRFNfMDBfMDVfMDMnKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuaTE4bkZhY3RvcnkoJ0ZEU18wMF8wNV8wMScpKS50aGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICAvLyDov5Tlm57nmbvlvZXnlYzpnaJcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvXCI7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyDlj5HpgIHlhajlsYDor7fmsYIsIOWFs+mXrei9ruW3oeeahGNoZWNrLWxvZ2luXHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYnJvYWRjYXN0KEJ1YmJsZUNvZGUuTE9HSU5fT1VUKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5rWL6K+V5q2kZmFjdG9yeeS4reW8ueWHuuahhuS9v+eUqOato+ehruaAp1xyXG4gICAgdGVzdCgpOiBGdW5jdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEud2hlbihudWxsKS50aGVuKCgpPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge2NvZGU6IC0yMDAwMn0gYXMgUmVzcG9uc2VSZXN1bHQ8YW55PjtcclxuICAgICAgICB9KS50aGVuKHRoaXMubXNnKHtvbmx5RXJyb3I6IGZhbHNlfSkpLnRoZW4oKHJlczogYW55KT0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhcIuW8ueWHuuahhuWQjuaJk+W8gOeahOS4nOilv1wiLCByZXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxufVxyXG5hcHAuc2VydmljZShcIm5vdGlmeUZhY3RvcnlcIiwgTm90aWZ5RmFjdG9yeSk7XHJcbiJdfQ==
