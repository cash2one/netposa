define(["require", "exports", "../app/main.app", "jquery"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RouterConfigController = (function () {
        function RouterConfigController($stateProvider, $urlRouterProvider, $controllerProvider, $requireProvider) {
            var requireJS = $requireProvider.requireJS;
            var i, len, mapResult = {}, defaultUrl;
            for (i = 0, len = RouterConfigController.authorList.length; i < len; i++) {
                mapResult[RouterConfigController.authorList[i]['key']] = convertRouteConfig2StateConfig(RouterConfigController.authorList[i]);
                if (!defaultUrl) {
                    defaultUrl = RouterConfigController.authorList[i]['url'];
                }
            }
            function convertRouteConfig2StateConfig(routerConfig) {
                var result = {}, url, controllerName, controllerUrl, controllerAs, resolve, templateUrl, _abstract, views;
                url = routerConfig['url'];
                controllerName = routerConfig['controllerName'];
                controllerUrl = routerConfig['controllerUrl'];
                controllerAs = routerConfig['controllerAs'];
                views = routerConfig['views'];
                templateUrl = routerConfig['templateUrl'];
                _abstract = routerConfig['abstract'];
                result["url"] = url;
                if (controllerUrl) {
                    result['controller'] = controllerName;
                    if (controllerAs) {
                        result['controllerAs'] = controllerAs;
                    }
                    result['resolve'] = {};
                    result['resolve']['deps'] = requireJS([controllerUrl]);
                }
                if (views) {
                    result['views'] = convertViews(routerConfig['views']);
                }
                if (templateUrl) {
                    result['templateUrl'] = templateUrl + '?v=' + (new Date()).getTime();
                }
                if (_abstract) {
                    result['abstract'] = _abstract;
                }
                return result;
            }
            function convertViews(views) {
                var k, v, dateTime = (new Date()).getTime(), result = {};
                for (k in views) {
                    v = views[k];
                    result[k] = {
                        'templateUrl': v['templateUrl'] + '?v=' + dateTime,
                        'controller': v['controllerName']
                    };
                    if (v['controllerAs']) {
                        result[k]['controllerAs'] = v['controllerAs'];
                    }
                }
                return result;
            }
            var k;
            for (k in mapResult) {
                $stateProvider.state(k, mapResult[k]);
            }
            $urlRouterProvider.otherwise(defaultUrl || "/");
        }
        RouterConfigController.authorList = [];
        RouterConfigController.$inject = ['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$requireProvider'];
        return RouterConfigController;
    }());
    var RouterConfig = (function () {
        function RouterConfig() {
            this._$controllerProvider = null;
        }
        RouterConfig.getInstance = function () {
            return this._instance = this._instance || new RouterConfig();
        };
        RouterConfig.prototype._init = function (authorList) {
            if (!$.isArray(authorList)) {
                return;
            }
            RouterConfigController.authorList = authorList;
            main_app_1.app.config(RouterConfigController);
        };
        ;
        RouterConfig.prototype.init = function (authorList) {
            this._init(authorList);
        };
        ;
        return RouterConfig;
    }());
    exports.default = RouterConfig;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3JvdXRlci9yb3V0ZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWVBO1FBSUksZ0NBQVksY0FBbUIsRUFBRSxrQkFBdUIsRUFBRSxtQkFBd0IsRUFBRSxnQkFBcUI7WUFNckcsSUFBSSxTQUFTLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO1lBRTNDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxTQUFTLEdBQXVDLEVBQUUsRUFBRSxVQUFVLENBQUM7WUFDM0UsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsc0JBQXNCLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ3ZFLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyw4QkFBOEIsQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUgsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUNkLFVBQVUsR0FBRyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzdELENBQUM7WUFDTCxDQUFDO1lBRUQsd0NBQXdDLFlBQTJCO2dCQUMvRCxJQUNJLE1BQU0sR0FBRyxFQUF3QixFQUNqQyxHQUFHLEVBQ0gsY0FBYyxFQUNkLGFBQWEsRUFDYixZQUFZLEVBQ1osT0FBTyxFQUNQLFdBQVcsRUFDWCxTQUFTLEVBQ1QsS0FBSyxDQUFDO2dCQUVWLEdBQUcsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFCLGNBQWMsR0FBRyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDaEQsYUFBYSxHQUFHLFlBQVksQ0FBQyxlQUFlLENBQUMs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LDZCQUFDO0tBekZELEFBeUZDLElBQUE7SUFJRDtRQUNJO1lBU1EseUJBQW9CLEdBQVEsSUFBSSxDQUFDO1FBUnpDLENBQUM7UUFJYSx3QkFBVyxHQUF6QjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqRSxDQUFDO1FBSU8sNEJBQUssR0FBYixVQUFjLFVBQWdDO1lBRTFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE1BQU0sQ0FBQztZQUNYLENBQUM7WUFDRCxzQkFBc0IsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBRS9DLGNBQUcsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUV2QyxDQUFDO1FBQUEsQ0FBQztRQUVGLDJCQUFJLEdBQUosVUFBSyxVQUFnQztZQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFBQSxDQUFDO1FBQ04sbUJBQUM7SUFBRCxDQTFCQSxBQTBCQyxJQUFBIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vcm91dGVyL3JvdXRlci5jb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lSb3V0ZXJDb25maWdNb2RlbCwgSVJvdXRlckNvbmZpZywgSVJvdXRlckNvbmZpZ01vZGVsVmlld3MsIElSb3V0ZXJDb25maWdWaWV3c30gZnJvbSBcIi4vcm91dGVyXCI7XHJcbi8qKlxyXG4gKiDot6/nlLHphY3nva7mlofku7ZcclxuICogQGF1dGhvciBzaW1iYVxyXG4gKiBAZGF0ZSAgIDIwMTYtMTEtMjNcclxuICpcclxuICog5Li76KaB5piv6aG555uu55qE6Lev55Sx6YWN572u77yM5paH5Lu25L6d6LWWcmVxdWlyZeWSjGFuZ3VsYXItcm91dGVcclxuICog5Li75L2T5pyJIGJhc2VVcmwg5ZKMIFJvdXRlciDkuKTlnZdcclxuICogYmFzZVVybDog5Li76KaB5piv6YWN572u5ZCE5qih5Z2X55qE5Z+656GA6Lev5b6EXHJcbiAqIFJvdXRlcjog5bCx5piv6YWN572u5ZCE5Liq5qih5Z2X5LiL6K+m57uG5Yqf6IO96aG16Z2i55qE6Lev55SxXHJcbiAqL1xyXG5kZWNsYXJlIGxldCAkOiBhbnksYW5ndWxhcjphbnk7XHJcbmltcG9ydCB7YXBwfSBmcm9tICcuLi9hcHAvbWFpbi5hcHAnO1xyXG5pbXBvcnQgJ2pxdWVyeSc7XHJcblxyXG5jbGFzcyBSb3V0ZXJDb25maWdDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyBhdXRob3JMaXN0OiBBcnJheTxJUm91dGVyQ29uZmlnPiA9IFtdO1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzdGF0ZVByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlcicsICckY29udHJvbGxlclByb3ZpZGVyJywgJyRyZXF1aXJlUHJvdmlkZXInXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigkc3RhdGVQcm92aWRlcjogYW55LCAkdXJsUm91dGVyUHJvdmlkZXI6IGFueSwgJGNvbnRyb2xsZXJQcm92aWRlcjogYW55LCAkcmVxdWlyZVByb3ZpZGVyOiBhbnkpIHtcclxuXHJcbiAgICAgICBcclxuXHJcblxyXG5cclxuICAgICAgICBsZXQgcmVxdWlyZUpTID0gJHJlcXVpcmVQcm92aWRlci5yZXF1aXJlSlM7XHJcblxyXG4gICAgICAgIGxldCBpLCBsZW4sIG1hcFJlc3VsdDp7W2tleTogc3RyaW5nXTogSVJvdXRlckNvbmZpZ01vZGVsfSA9IHt9LCBkZWZhdWx0VXJsO1xyXG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IFJvdXRlckNvbmZpZ0NvbnRyb2xsZXIuYXV0aG9yTGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBtYXBSZXN1bHRbUm91dGVyQ29uZmlnQ29udHJvbGxlci5hdXRob3JMaXN0W2ldWydrZXknXV0gPSBjb252ZXJ0Um91dGVDb25maWcyU3RhdGVDb25maWcoUm91dGVyQ29uZmlnQ29udHJvbGxlci5hdXRob3JMaXN0W2ldKTtcclxuICAgICAgICAgICAgaWYgKCFkZWZhdWx0VXJsKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0VXJsID0gUm91dGVyQ29uZmlnQ29udHJvbGxlci5hdXRob3JMaXN0W2ldWyd1cmwnXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY29udmVydFJvdXRlQ29uZmlnMlN0YXRlQ29uZmlnKHJvdXRlckNvbmZpZzogSVJvdXRlckNvbmZpZyk6IElSb3V0ZXJDb25maWdNb2RlbCB7XHJcbiAgICAgICAgICAgIGxldFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0ge30gYXMgSVJvdXRlckNvbmZpZ01vZGVsLFxyXG4gICAgICAgICAgICAgICAgdXJsLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlck5hbWUsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyVXJsLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsLFxyXG4gICAgICAgICAgICAgICAgX2Fic3RyYWN0LFxyXG4gICAgICAgICAgICAgICAgdmlld3M7XHJcblxyXG4gICAgICAgICAgICB1cmwgPSByb3V0ZXJDb25maWdbJ3VybCddO1xyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZSA9IHJvdXRlckNvbmZpZ1snY29udHJvbGxlck5hbWUnXTtcclxuICAgICAgICAgICAgY29udHJvbGxlclVybCA9IHJvdXRlckNvbmZpZ1snY29udHJvbGxlclVybCddO1xyXG4gICAgICAgICAgICBjb250cm9sbGVyQXMgPSByb3V0ZXJDb25maWdbJ2NvbnRyb2xsZXJBcyddO1xyXG4gICAgICAgICAgICB2aWV3cyA9IHJvdXRlckNvbmZpZ1sndmlld3MnXTtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmwgPSByb3V0ZXJDb25maWdbJ3RlbXBsYXRlVXJsJ107XHJcbiAgICAgICAgICAgIF9hYnN0cmFjdCA9IHJvdXRlckNvbmZpZ1snYWJzdHJhY3QnXTtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdFtcInVybFwiXSA9IHVybDtcclxuICAgICAgICAgICAgaWYgKGNvbnRyb2xsZXJVcmwpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdFsnY29udHJvbGxlciddID0gY29udHJvbGxlck5hbWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udHJvbGxlckFzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Wydjb250cm9sbGVyQXMnXSA9IGNvbnRyb2xsZXJBcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc3VsdFsncmVzb2x2ZSddID0ge30gYXMge2RlcHM6IEZ1bmN0aW9ufTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdFsncmVzb2x2ZSddWydkZXBzJ10gPSByZXF1aXJlSlMoW2NvbnRyb2xsZXJVcmxdKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh2aWV3cykge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0Wyd2aWV3cyddID0gY29udmVydFZpZXdzKHJvdXRlckNvbmZpZ1sndmlld3MnXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRlbXBsYXRlVXJsKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRbJ3RlbXBsYXRlVXJsJ10gPSB0ZW1wbGF0ZVVybCArICc/dj0nICsgKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKF9hYnN0cmFjdCkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0WydhYnN0cmFjdCddID0gX2Fic3RyYWN0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY29udmVydFZpZXdzKHZpZXdzOiB7W2tleTogc3RyaW5nXTogSVJvdXRlckNvbmZpZ1ZpZXdzfSk6e1trZXk6IHN0cmluZ106IElSb3V0ZXJDb25maWdNb2RlbFZpZXdzfSAge1xyXG4gICAgICAgICAgICBsZXQgaywgdjpJUm91dGVyQ29uZmlnVmlld3MsIGRhdGVUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKSwgcmVzdWx0ID0ge30gYXMge1trZXk6IHN0cmluZ106IElSb3V0ZXJDb25maWdNb2RlbFZpZXdzfTtcclxuICAgICAgICAgICAgZm9yIChrIGluIHZpZXdzKSB7XHJcbiAgICAgICAgICAgICAgICB2ID0gdmlld3Nba107XHJcbiAgICAgICAgICAgICAgICByZXN1bHRba10gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3RlbXBsYXRlVXJsJzogdlsndGVtcGxhdGVVcmwnXSArICc/dj0nICsgZGF0ZVRpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NvbnRyb2xsZXInOiB2Wydjb250cm9sbGVyTmFtZSddXHJcbiAgICAgICAgICAgICAgICB9IGFzIElSb3V0ZXJDb25maWdNb2RlbFZpZXdzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZbJ2NvbnRyb2xsZXJBcyddKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tdWydjb250cm9sbGVyQXMnXSA9IHZbJ2NvbnRyb2xsZXJBcyddO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaztcclxuICAgICAgICAvLyDlsIblkI7lj7Dlj6/orr/pl67nmoTmqKHlnZfphY3nva7liLDot6/nlLHkuK1cclxuICAgICAgICBmb3IgKGsgaW4gbWFwUmVzdWx0KSB7XHJcbiAgICAgICAgICAgIC8vIOWcqOi/memHjOW+queOr+mFjee9rui3r+eUseiuv+mXrui3r+W+hFxyXG4gICAgICAgICAgICAkc3RhdGVQcm92aWRlci5zdGF0ZShrLCBtYXBSZXN1bHRba10pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDov5nph4zlupTor6Xpu5jorqTkuIDkuKpcclxuXHJcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShkZWZhdWx0VXJsIHx8IFwiL1wiKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8vIOi/memHjOWwhuWIneWni+WMlui3r+eUseWHveaVsOWwgeijheaIkOS4gOS4quaWueazlSxcclxuLy8g55uu55qE5piv5Li65LqG5b2T5ZCO5Y+w5omA5pyJ5Z+65pys5pWw5o2u6L+U5Zue5Lul5ZCO5YaN6L+b6KGM6Lev55Sx5Yid5aeL5YyW55qE6YWN572uXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlckNvbmZpZyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFJvdXRlckNvbmZpZztcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IFJvdXRlckNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlID0gdGhpcy5faW5zdGFuY2UgfHwgbmV3IFJvdXRlckNvbmZpZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgXyRjb250cm9sbGVyUHJvdmlkZXI6IGFueSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5pdChhdXRob3JMaXN0OiBBcnJheTxJUm91dGVyQ29uZmlnPikge1xyXG5cclxuICAgICAgICBpZiAoISQuaXNBcnJheShhdXRob3JMaXN0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFJvdXRlckNvbmZpZ0NvbnRyb2xsZXIuYXV0aG9yTGlzdCA9IGF1dGhvckxpc3Q7XHJcbiAgICAgICAgLy/kuLvlhoXlrrnot6/nlLHphY3nva5cclxuICAgICAgICBhcHAuY29uZmlnKFJvdXRlckNvbmZpZ0NvbnRyb2xsZXIpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgaW5pdChhdXRob3JMaXN0OiBBcnJheTxJUm91dGVyQ29uZmlnPikge1xyXG4gICAgICAgIHRoaXMuX2luaXQoYXV0aG9yTGlzdCk7XHJcbiAgICB9O1xyXG59Il19
