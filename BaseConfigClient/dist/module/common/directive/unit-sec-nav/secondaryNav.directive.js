define(["require", "exports", "text!./secondaryNav.html", "../../app/main.app", "css!./secondaryNav.css"], function (require, exports, secondaryNav, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UtilSecNavDirective = (function () {
        function UtilSecNavDirective() {
            this.restrict = 'E';
            this.replace = true;
            this.transclude = true;
            this.template = secondaryNav;
            this.scope = {
                current: '@',
            };
            this.controller = function ($scope, $element, $attrs, $compile) {
            };
            this.link = function ($scope, $element, attr, ngModelController) {
                $scope.items = [
                    { url: "intelligentretrieval.trailanalysis", className: 'nav-ico-trail', title: '轨迹分析' },
                    { url: "intelligentretrieval.faceretrieval", className: 'nav-ico-face', title: '人脸检索' },
                    { url: "intelligentretrieval.alarmretrieval", className: 'nav-ico-alarm', title: '报警检索' },
                    { url: "intelligentretrieval.retrievalrecord", className: 'nav-ico-record', title: '检索记录' }
                ];
            };
        }
        UtilSecNavDirective.instance = function () {
            return new UtilSecNavDirective();
        };
        return UtilSecNavDirective;
    }());
    main_app_1.app.directive('utilSecNav', UtilSecNavDirective.instance);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS91bml0LXNlYy1uYXYvc2Vjb25kYXJ5TmF2LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUF1QkE7UUFDSTtZQU9BLGFBQVEsR0FBVyxHQUFHLENBQUM7WUFDdkIsWUFBTyxHQUFZLElBQUksQ0FBQztZQUN4QixlQUFVLEdBQVksSUFBSSxDQUFDO1lBQzNCLGFBQVEsR0FBVSxZQUFZLENBQUM7WUFDL0IsVUFBSyxHQUFHO2dCQUNKLE9BQU8sRUFBQyxHQUFHO2FBQ2QsQ0FBQztZQUdGLGVBQVUsR0FBRyxVQUFVLE1BQVcsRUFBRSxRQUFhLEVBQUUsTUFBVyxFQUFDLFFBQWE7WUFFNUUsQ0FBQyxDQUFDO1lBQ0YsU0FBSSxHQUFHLFVBQVMsTUFBVyxFQUFDLFFBQWEsRUFBRSxJQUFTLEVBQUMsaUJBQXFCO2dCQUN0RSxNQUFNLENBQUMsS0FBSyxHQUFHO29CQUNYLEVBQUMsR0FBRyxFQUFDLG9DQUFvQyxFQUFDLFNBQVMsRUFBQyxlQUFlLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQztvQkFDakYsRUFBQyxHQUFHLEVBQUMsb0NBQW9DLEVBQUMsU0FBUyxFQUFDLGNBQWMsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDO29CQUNoRixFQUFDLEdBQUcsRUFBQyxxQ0FBcUMsRUFBQyxTQUFTLEVBQUMsZUFBZSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUM7b0JBQ2xGLEVBQUMsR0FBRyxFQUFDLHNDQUFzQyxFQUFDLFNBQVMsRUFBQyxnQkFBZ0IsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDO2lCQUt2RixDQUFBO1lBQ0wsQ0FBQyxDQUFBO1FBNUJELENBQUM7UUFDTSw0QkFBUSxHQUFmO1lBQ0ksTUFBTSxDQUFDLElBQUksbUJBQW1CLEVBQUUsQ0FBQztRQUNyQyxDQUFDO1FBMEJMLDBCQUFDO0lBQUQsQ0FoQ0EsQUFnQ0MsSUFBQTtJQUVELGNBQUcsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vZGlyZWN0aXZlL3VuaXQtc2VjLW5hdi9zZWNvbmRhcnlOYXYuZGlyZWN0aXZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi9zZWNvbmRhcnlOYXYuaHRtbFwiIG5hbWU9XCJzZWNvbmRhcnlOYXZcIiAvPlxyXG5kZWNsYXJlIGxldCBzZWNvbmRhcnlOYXY6IGFueTtcclxuXHJcbmRlY2xhcmUgY29uc3QgYW5ndWxhcjogYW55O1xyXG5cclxuaW1wb3J0IHthcHB9IGZyb20gJy4uLy4uL2FwcC9tYWluLmFwcCc7XHJcbmltcG9ydCAnY3NzIS4vc2Vjb25kYXJ5TmF2LmNzcyc7XHJcbi8qKlxyXG4gKiBAbmdkb2MgZGlyZWN0aXZlXHJcbiAqIEBuYW1lIHV0aWxUb2dnbGVcclxuICogQG1vZHVsZSBjb21tb25cclxuICogQHJlc3RyaWN0IEVcclxuICpcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqIOW8gOWFs+mAieaLqeWKqOS9nO+8jOi/lOWbnuaUueWPmCDlj4LmlbBib29sZWFuIOWAvFxyXG4gKiBAcGFyYW0gdG9nZ2xlLW9wZW4gIDogYm9vbGVhbiDorr7nva7pu5jorqTpgInmi6nvvIxib29sZWFu57G75Z6L77yM6Iul5LiN5Lyg6buY6K6kIGZhbHNlIOWFs+mXrVxyXG4gKiAgICAgICAgICB0b2dnbGUtZGlzYWJsZSA6Ym9vbGVhbiDorr7nva7mmK/lkKbmnInmlYgg5byA5YWz77yMYm9vbGVhbuexu+Wei++8jOiLpeS4jeS8oOm7mOiupCBmYWxzZSDmnInmlYhcclxuICogICAgICAgICAgdG9nZ2xlLWNoYW5nZSAgOmZ1bmN0aW9uIOeCueWHu+aUueWPmCDlvIDlhbPop6blj5Hlm57osIPlh73mlbDjgIIg6L+U5Zue5b2T5YmNIOeKtuaAgVxyXG4gKiBgYGBodG1sXHJcbiAqIDx1dGlsLXRvZ2dsZSB0b2dnbGUtb3Blbj1cImJvb2xlYW5QYXJhbVwiIHRvZ2dsZS1kaXNhYmxlPVwiYm9vbGVhblBhcmFtXCIgdG9nZ2xlLWNoYW5nZT1cImNhbGxCYWNrRnVuKGlzT3BlbilcIj48L3V0aWwtdG9nZ2xlPlxyXG4gKiBgYGBcclxuICovXHJcbmNsYXNzIFV0aWxTZWNOYXZEaXJlY3RpdmUge1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaW5zdGFuY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBVdGlsU2VjTmF2RGlyZWN0aXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdHJpY3Q6IHN0cmluZyA9ICdFJztcclxuICAgIHJlcGxhY2U6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgdHJhbnNjbHVkZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICB0ZW1wbGF0ZTpzdHJpbmcgPSBzZWNvbmRhcnlOYXY7XHJcbiAgICBzY29wZSA9IHtcclxuICAgICAgICBjdXJyZW50OidAJyxcclxuICAgIH07XHJcblxyXG4gICAgY29udHJvbGxlckFzOiAnc2VjTmF2Q3RybCc7XHJcbiAgICBjb250cm9sbGVyID0gZnVuY3Rpb24gKCRzY29wZTogYW55LCAkZWxlbWVudDogYW55LCAkYXR0cnM6IGFueSwkY29tcGlsZTogYW55KSB7XHJcblxyXG4gICAgfTtcclxuICAgIGxpbmsgPSBmdW5jdGlvbigkc2NvcGU6IGFueSwkZWxlbWVudDogYW55LCBhdHRyOiBhbnksbmdNb2RlbENvbnRyb2xsZXI6YW55KSB7XHJcbiAgICAgICAgJHNjb3BlLml0ZW1zID0gW1xyXG4gICAgICAgICAgICB7dXJsOlwiaW50ZWxsaWdlbnRyZXRyaWV2YWwudHJhaWxhbmFseXNpc1wiLGNsYXNzTmFtZTonbmF2LWljby10cmFpbCcsdGl0bGU6J+i9qOi/ueWIhuaekCd9LFxyXG4gICAgICAgICAgICB7dXJsOlwiaW50ZWxsaWdlbnRyZXRyaWV2YWwuZmFjZXJldHJpZXZhbFwiLGNsYXNzTmFtZTonbmF2LWljby1mYWNlJyx0aXRsZTon5Lq66IS45qOA57SiJ30sXHJcbiAgICAgICAgICAgIHt1cmw6XCJpbnRlbGxpZ2VudHJldHJpZXZhbC5hbGFybXJldHJpZXZhbFwiLGNsYXNzTmFtZTonbmF2LWljby1hbGFybScsdGl0bGU6J+aKpeitpuajgOe0oid9LFxyXG4gICAgICAgICAgICB7dXJsOlwiaW50ZWxsaWdlbnRyZXRyaWV2YWwucmV0cmlldmFscmVjb3JkXCIsY2xhc3NOYW1lOiduYXYtaWNvLXJlY29yZCcsdGl0bGU6J+ajgOe0ouiusOW9lSd9XHJcbiAgICAgICAgICAgIC8ve3VybDpcImludGVsbGlnZW50cmV0cmlldmFsLnRyYWlsYW5hbHlzaXNcIixjbGFzc05hbWU6J25hdi1pY28tdHJhaWwnfSxcclxuICAgICAgICAgICAgLy97dXJsOlwiaW50ZWxsaWdlbnRyZXRyaWV2YWwuZmFjZXJldHJpZXZhbFwiLGNsYXNzTmFtZTonbmF2LWljby1mYWNlJ30sXHJcbiAgICAgICAgICAgIC8ve3VybDpcImludGVsbGlnZW50cmV0cmlldmFsLmFsYXJtcmV0cmlldmFsXCIsY2xhc3NOYW1lOiduYXYtaWNvLWFsYXJtJ30sXHJcbiAgICAgICAgICAgIC8ve3VybDpcImludGVsbGlnZW50cmV0cmlldmFsLnJldHJpZXZhbHJlY29yZFwiLGNsYXNzTmFtZTonbmF2LWljby1yZWNvcmQnfVxyXG4gICAgICAgIF1cclxuICAgIH1cclxufVxyXG5cclxuYXBwLmRpcmVjdGl2ZSgndXRpbFNlY05hdicsIFV0aWxTZWNOYXZEaXJlY3RpdmUuaW5zdGFuY2UpOyJdfQ==
