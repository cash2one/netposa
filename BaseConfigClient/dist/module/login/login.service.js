define(["require", "exports", "../common/portrait-tool", "./login.app", "angular", "jquery.md5"], function (require, exports, portrait_tool_1, login_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LoginParams = (function () {
        function LoginParams() {
        }
        return LoginParams;
    }());
    exports.LoginParams = LoginParams;
    var LoginService = (function () {
        function LoginService($http, $q) {
            this.$http = $http;
            this.$q = $q;
        }
        LoginService.prototype.login = function (params) {
            var _this = this;
            var _params = new LoginParams();
            _params.password = portrait_tool_1.default.md5(params.password);
            _params.username = params.username;
            return this.$http({
                method: 'post',
                params: _params,
                url: '/pdp/user/auth',
            }).then(function (resp) {
                if (resp && resp.data) {
                    if (resp.data.code == 200) {
                        return resp.data.data;
                    }
                    else {
                        return _this.$q.reject({ code: resp.data.code, err: resp.data });
                    }
                }
                else {
                    return _this.$q.reject({ code: -1 });
                }
            });
        };
        LoginService.$inject = ['$http', '$q'];
        return LoginService;
    }());
    login_app_1.loginApp
        .service('loginService', LoginService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbG9naW4vbG9naW4uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFtQkE7UUFBQTtRQUdBLENBQUM7UUFBRCxrQkFBQztJQUFELENBSEEsQUFHQyxJQUFBO0lBSFksa0NBQVc7SUFJeEI7UUFLSSxzQkFBb0IsS0FBVSxFQUFVLEVBQU87WUFBM0IsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUFVLE9BQUUsR0FBRixFQUFFLENBQUs7UUFDL0MsQ0FBQztRQUVELDRCQUFLLEdBQUwsVUFBTSxNQUFrQjtZQUF4QixpQkFxQkM7WUFwQkcsSUFBSSxPQUFPLEdBQWUsSUFBSSxXQUFXLEVBQUUsQ0FBQztZQUU1QyxPQUFPLENBQUMsUUFBUSxHQUFHLHVCQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyRCxPQUFPLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFDLE1BQU07Z0JBQ2IsTUFBTSxFQUFFLE9BQU87Z0JBQ2YsR0FBRyxFQUFDLGdCQUFnQjthQUN2QixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBdUM7Z0JBRTVDLEVBQUUsQ0FBQSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQztvQkFDbEIsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLENBQUEsQ0FBQzt3QkFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUMxQixDQUFDO29CQUFBLElBQUksQ0FBQSxDQUFDO3dCQUNGLE1BQU0sQ0FBQyxLQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUM7b0JBQ2xFLENBQUM7Z0JBQ0wsQ0FBQztnQkFBQSxJQUFJLENBQUEsQ0FBQztvQkFDRixNQUFNLENBQUMsS0FBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBM0JNLG9CQUFPLEdBQWtCLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBNEJuRCxtQkFBQztLQTlCRCxBQThCQyxJQUFBO0lBRUQsb0JBQVE7U0FDSCxPQUFPLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9sb2dpbi9sb2dpbi5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqXHJcbiAqIEB0aW1lOiAyMDE3LTA1LTEwIDEwOjQyOjAwXHJcbiAqIEBwYXJhbXM6XHJcbiAqIEByZXR1cm46XHJcbiAqL1xyXG5pbXBvcnQgJ2FuZ3VsYXInO1xyXG5pbXBvcnQgXCJqcXVlcnkubWQ1XCI7XHJcbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTtcclxuaW1wb3J0IFBvcnRyYWl0VG9vbCBmcm9tIFwiLi4vY29tbW9uL3BvcnRyYWl0LXRvb2xcIjtcclxuaW1wb3J0IHtsb2dpbkFwcH0gZnJvbSBcIi4vbG9naW4uYXBwXCI7XHJcbmltcG9ydCB7SHR0cFJlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7TG9naW5Vc2VySW5mb30gZnJvbSBcIi4uLy4uL2NvcmUvZW50aXR5L2V4L1VzZXJFeFwiO1xyXG5kZWNsYXJlIHZhciBhbmd1bGFyOiBhbnk7XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTG9naW5TZXJ2aWNle1xyXG4gICAgbG9naW46KHBhcmFtczogTG9naW5QYXJhbXMpPT5Qcm9taXNlPExvZ2luVXNlckluZm8+O1xyXG59XHJcbmV4cG9ydCBjbGFzcyBMb2dpblBhcmFtc3tcclxuICAgIHVzZXJuYW1lOnN0cmluZztcclxuICAgIHBhc3N3b3JkOnN0cmluZztcclxufVxyXG5jbGFzcyBMb2dpblNlcnZpY2UgaW1wbGVtZW50cyBJTG9naW5TZXJ2aWNlIHtcclxuXHJcbiAgICBzdGF0aWMgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnJGh0dHAnLCckcSddO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBhbnksIHByaXZhdGUgJHE6IGFueSkge1xyXG4gICAgfVxyXG5cclxuICAgIGxvZ2luKHBhcmFtczpMb2dpblBhcmFtcyk6IFByb21pc2U8TG9naW5Vc2VySW5mbz4ge1xyXG4gICAgICAgIGxldCBfcGFyYW1zOkxvZ2luUGFyYW1zID0gbmV3IExvZ2luUGFyYW1zKCk7XHJcblxyXG4gICAgICAgIF9wYXJhbXMucGFzc3dvcmQgPSBQb3J0cmFpdFRvb2wubWQ1KHBhcmFtcy5wYXNzd29yZCk7XHJcbiAgICAgICAgX3BhcmFtcy51c2VybmFtZSA9IHBhcmFtcy51c2VybmFtZTtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXHJcbiAgICAgICAgICAgIHBhcmFtczogX3BhcmFtcyxcclxuICAgICAgICAgICAgdXJsOicvcGRwL3VzZXIvYXV0aCcsXHJcbiAgICAgICAgfSkudGhlbigocmVzcDogSHR0cFJlc3BvbnNlUmVzdWx0PExvZ2luVXNlckluZm8+KT0+IHtcclxuICAgICAgICAgICAgLy8g55Sx5LqO55m75b2V5rKh5pyJ5Yqg5oum5oiq5ZmoLCDmiYDku6XpnIDopoHkvb/nlKhyZXNwLmRhdGHmiY3og73mi7/liLDlkI7lj7Dov5Tlm57nmoTlrozmlbTmlbDmja5cclxuICAgICAgICAgICAgaWYocmVzcCAmJiByZXNwLmRhdGEpe1xyXG4gICAgICAgICAgICAgICAgaWYocmVzcC5kYXRhLmNvZGUgPT0gMjAwKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcC5kYXRhLmRhdGE7IC8vIOWPquaciei/meenjeaDheWGteaJjei/lOWbnuato+ehrueahOaVsOaNrlxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHEucmVqZWN0KHtjb2RlOiByZXNwLmRhdGEuY29kZSwgZXJyOiByZXNwLmRhdGF9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3Qoe2NvZGU6IC0xfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5sb2dpbkFwcFxyXG4gICAgLnNlcnZpY2UoJ2xvZ2luU2VydmljZScsIExvZ2luU2VydmljZSk7Il19
