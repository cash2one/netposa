define(["require", "exports", "../../../common/app/main.app", "../../../../core/enum/ProxyServerType", "../../../../core/entity/ex/ProxyServerEx", "../../../common/services/proxyServer.service", "angular"], function (require, exports, main_app_1, ProxyServerType_1, ProxyServerEx_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProxyServerUpdateModalController = (function () {
        function ProxyServerUpdateModalController($scope, proxyServerService, $timeout) {
            this.$scope = $scope;
            this.proxyServerService = proxyServerService;
            this.$timeout = $timeout;
            this.isUpdate = false;
            this.proxyServerTypeList = [];
            this.progress = 10;
            var vm = this;
            for (var key in ProxyServerType_1.ProxyServerType) {
                this.proxyServerTypeList.push(ProxyServerType_1.ProxyServerType[key]);
            }
            this.isUpdate = this.$scope.isUpdate;
            if (this.$scope.isUpdate) {
                this.currentServe = this.$scope.updateData;
                console.log(this.currentServe);
            }
            else {
                this.currentServe = new ProxyServerEx_1.ProxyServerEx();
            }
            console.log("%c =====VideoServerUpdatePopupController $scope=====start==============", "color:blue");
            console.log("初始化 ctrl 传过来的参数");
            console.log(this.currentServe);
            console.log("%c =========end===============", "color:blue");
            $scope.$on("$destroy", function () {
                console.log("%c =====ProxyServerUpdateModalController $scope.$destroy=====start==============", "color:green");
                console.log("销毁了弹出框");
                console.log("%c =========end===============", "color:green");
            });
        }
        ProxyServerUpdateModalController.prototype.commitSaveOrUpdate = function () {
            var _this = this;
            console.log(this.currentServe);
            var checkStr = this.validateParams(this.currentServe);
            if (checkStr) {
                console.log("=======checkStr===result==============");
                console.log(checkStr + "未填写");
                console.log("=========end===============");
                return;
            }
            else {
                console.log("=======checkStr===result==============");
                console.log("参数全已经填写");
                console.log("=========end===============");
            }
            if (this.currentServe.ID) {
                console.log("=========更新===============");
                this.proxyServerService.update(this.currentServe).then(function (resp) {
                    if (resp.code == 200) {
                        _this.closeUpdateModel(true);
                    }
                });
            }
            else {
                console.log("===========新加=============");
                this.proxyServerService.save(this.currentServe).then(function (resp) {
                    if (resp.code == 200) {
                        _this.closeUpdateModel(true);
                    }
                });
            }
        };
        ;
        ProxyServerUpdateModalController.prototype.closeUpdateModel = function (isCommit) {
            this.$scope.$emit('closeProxyServerUpdateModel', { isCommit: isCommit });
        };
        ProxyServerUpdateModalController.prototype.changeTypeSelect = function (data) {
            console.log(this.currentServe);
            console.log(data);
        };
        ProxyServerUpdateModalController.prototype.validateParams = function (model) {
            if (!model.Code) {
                return 'Code';
            }
            if (!model.IpAddress) {
                return 'IpAddress';
            }
            if (!model.Name) {
                return 'Name';
            }
            if (!model.Port) {
                return 'Port';
            }
            if (!model.ProxyServerType) {
                return 'ProxyServerType';
            }
            return '';
        };
        ProxyServerUpdateModalController.$inject = ['$scope', 'proxyServerService', '$timeout'];
        return ProxyServerUpdateModalController;
    }());
    main_app_1.app
        .controller('proxyServerUpdateModalController', ProxyServerUpdateModalController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9zZXJ2ZXIvcHJveHlTZXJ2ZXIvcHJveHlTZXJ2ZXIudXBkYXRlTW9kYWwuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFTQTtRQU9JLDBDQUFvQixNQUFVLEVBQVMsa0JBQXNCLEVBQVMsUUFBWTtZQUE5RCxXQUFNLEdBQU4sTUFBTSxDQUFJO1lBQVMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFJO1lBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBSTtZQUxsRixhQUFRLEdBQVcsS0FBSyxDQUFDO1lBR3pCLHdCQUFtQixHQUFlLEVBQUUsQ0FBQztZQUNyQyxhQUFRLEdBQVUsRUFBRSxDQUFDO1lBRWpCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztZQUVkLEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLGlDQUFlLENBQUMsQ0FBQSxDQUFDO2dCQUM1QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGlDQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN4RCxDQUFDO1lBR0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNyQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7Z0JBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ25DLENBQUM7WUFBQSxJQUFJLENBQUEsQ0FBQztnQkFDRixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksNkJBQWEsRUFBRSxDQUFDO1lBQzVDLENBQUM7WUFHRCxPQUFPLENBQUMsR0FBRyxDQUFDLHlFQUF5RSxFQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3BHLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJB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LENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQztnQkFDWixNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ2xCLENBQUM7WUFJRCxFQUFFLENBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQSxDQUFDO2dCQUNqQixNQUFNLENBQUMsV0FBVyxDQUFDO1lBQ3ZCLENBQUM7WUFDRCxFQUFFLENBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDO2dCQUNaLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDbEIsQ0FBQztZQUNELEVBQUUsQ0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7Z0JBQ1osTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNsQixDQUFDO1lBQ0QsRUFBRSxDQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUEsQ0FBQztnQkFDdkIsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1lBQzdCLENBQUM7WUFDRCxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQXpHTSx3Q0FBTyxHQUFHLENBQUMsUUFBUSxFQUFDLG9CQUFvQixFQUFDLFVBQVUsQ0FBQyxDQUFDO1FBMEdoRSx1Q0FBQztLQTNHRCxBQTJHQyxJQUFBO0lBQ0QsY0FBRztTQUNFLFVBQVUsQ0FBQyxrQ0FBa0MsRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9iYXNlY29uZmlnL3NlcnZlci9wcm94eVNlcnZlci9wcm94eVNlcnZlci51cGRhdGVNb2RhbC5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Byb3h5U2VydmVyLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0ICdhbmd1bGFyJztcclxuaW1wb3J0IHtQcm94eVNlcnZlclR5cGV9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudW0vUHJveHlTZXJ2ZXJUeXBlXCI7XHJcbmltcG9ydCB7RW51bX0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW51bS9FbnVtXCI7XHJcbmltcG9ydCB7UHJveHlTZXJ2ZXJFeH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L1Byb3h5U2VydmVyRXhcIjtcclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55O1xyXG5cclxuY2xhc3MgUHJveHlTZXJ2ZXJVcGRhdGVNb2RhbENvbnRyb2xsZXJ7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJywncHJveHlTZXJ2ZXJTZXJ2aWNlJywnJHRpbWVvdXQnXTtcclxuICAgIGlzVXBkYXRlOmJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjdXJyZW50U2VydmU6UHJveHlTZXJ2ZXJFeDtcclxuICAgIHByb3h5U2VydmVyVHlwZUxpc3Q6QXJyYXk8RW51bT4gPSBbXTtcclxuICAgIHByb2dyZXNzOm51bWJlciA9IDEwO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6YW55LHByaXZhdGUgcHJveHlTZXJ2ZXJTZXJ2aWNlOmFueSxwcml2YXRlICR0aW1lb3V0OmFueSwpe1xyXG4gICAgICAgIGxldCB2bSA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZvcihsZXQga2V5IGluIFByb3h5U2VydmVyVHlwZSl7XHJcbiAgICAgICAgICAgIHRoaXMucHJveHlTZXJ2ZXJUeXBlTGlzdC5wdXNoKFByb3h5U2VydmVyVHlwZVtrZXldKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOWIneWni+WMliBjdHJsIOS8oOi/h+adpeeahOWPguaVsFxyXG4gICAgICAgIHRoaXMuaXNVcGRhdGUgPSB0aGlzLiRzY29wZS5pc1VwZGF0ZTtcclxuICAgICAgICBpZih0aGlzLiRzY29wZS5pc1VwZGF0ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNlcnZlID0gdGhpcy4kc2NvcGUudXBkYXRlRGF0YTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jdXJyZW50U2VydmUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTZXJ2ZSA9IG5ldyBQcm94eVNlcnZlckV4KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdGhpcy5jdXJyZW50U2VydmUgPSB0aGlzLmlzVXBkYXRlP2FuZ3VsYXIuY29weSh0aGlzLiRzY29wZS51cGRhdGVEYXRhKTogbmV3IFByb3h5U2VydmVyTW9kZWxFeEltcGwoKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCIlYyA9PT09PVZpZGVvU2VydmVyVXBkYXRlUG9wdXBDb250cm9sbGVyICRzY29wZT09PT09c3RhcnQ9PT09PT09PT09PT09PVwiLFwiY29sb3I6Ymx1ZVwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuWIneWni+WMliBjdHJsIOS8oOi/h+adpeeahOWPguaVsFwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnRTZXJ2ZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIlYyA9PT09PT09PT1lbmQ9PT09PT09PT09PT09PT1cIixcImNvbG9yOmJsdWVcIik7XHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tXHJcblxyXG5cclxuICAgICAgICAkc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCIlYyA9PT09PVByb3h5U2VydmVyVXBkYXRlTW9kYWxDb250cm9sbGVyICRzY29wZS4kZGVzdHJveT09PT09c3RhcnQ9PT09PT09PT09PT09PVwiLFwiY29sb3I6Z3JlZW5cIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6ZSA5q+B5LqG5by55Ye65qGGXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVjID09PT09PT09PWVuZD09PT09PT09PT09PT09PVwiLFwiY29sb3I6Z3JlZW5cIik7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBjb21taXRTYXZlT3JVcGRhdGUoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnRTZXJ2ZSk7XHJcbiAgICAgICAgbGV0IGNoZWNrU3RyID0gdGhpcy52YWxpZGF0ZVBhcmFtcyh0aGlzLmN1cnJlbnRTZXJ2ZSk7XHJcbiAgICAgICAgaWYoY2hlY2tTdHIpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIj09PT09PT1jaGVja1N0cj09PXJlc3VsdD09PT09PT09PT09PT09XCIsKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY2hlY2tTdHIgKyBcIuacquWhq+WGmVwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCI9PT09PT09PT1lbmQ9PT09PT09PT09PT09PT1cIiwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiPT09PT09PWNoZWNrU3RyPT09cmVzdWx0PT09PT09PT09PT09PT1cIiwpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWPguaVsOWFqOW3sue7j+Whq+WGmVwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCI9PT09PT09PT1lbmQ9PT09PT09PT09PT09PT1cIiwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmN1cnJlbnRTZXJ2ZS5JRCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT095pu05pawPT09PT09PT09PT09PT09XCIpO1xyXG4gICAgICAgICAgICB0aGlzLnByb3h5U2VydmVyU2VydmljZS51cGRhdGUodGhpcy5jdXJyZW50U2VydmUpLnRoZW4oKHJlc3A6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgaWYocmVzcC5jb2RlID09IDIwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVVwZGF0ZU1vZGVsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCI9PT09PT09PT09PeaWsOWKoD09PT09PT09PT09PT1cIik7XHJcbiAgICAgICAgICAgIHRoaXMucHJveHlTZXJ2ZXJTZXJ2aWNlLnNhdmUodGhpcy5jdXJyZW50U2VydmUpLnRoZW4oKHJlc3A6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgaWYocmVzcC5jb2RlID09IDIwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVVwZGF0ZU1vZGVsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNsb3NlVXBkYXRlTW9kZWwoaXNDb21taXQ6Ym9vbGVhbil7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ2Nsb3NlUHJveHlTZXJ2ZXJVcGRhdGVNb2RlbCcse2lzQ29tbWl0OmlzQ29tbWl0fSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlVHlwZVNlbGVjdChkYXRhIDogYW55KXtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnRTZXJ2ZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+mqjOivgeWtl+autemZkOWItu+8jOi/lOWbnuaPkOekuuivrVxyXG4gICAgdmFsaWRhdGVQYXJhbXMobW9kZWw6UHJveHlTZXJ2ZXJFeCk6c3RyaW5ne1xyXG5cclxuICAgICAgICBpZighbW9kZWwuQ29kZSl7XHJcbiAgICAgICAgICAgIHJldHVybiAnQ29kZSc7XHJcbiAgICAgICAgfVxyXG4gICAgIC8qICAgaWYoIW1vZGVsLkRlc2NyaXB0aW9uKXtcclxuICAgICAgICAgICAgcmV0dXJuICdEZXNjcmlwdGlvbic7XHJcbiAgICAgICAgfSovXHJcbiAgICAgICAgaWYoIW1vZGVsLklwQWRkcmVzcyl7XHJcbiAgICAgICAgICAgIHJldHVybiAnSXBBZGRyZXNzJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIW1vZGVsLk5hbWUpe1xyXG4gICAgICAgICAgICByZXR1cm4gJ05hbWUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighbW9kZWwuUG9ydCl7XHJcbiAgICAgICAgICAgIHJldHVybiAnUG9ydCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFtb2RlbC5Qcm94eVNlcnZlclR5cGUpe1xyXG4gICAgICAgICAgICByZXR1cm4gJ1Byb3h5U2VydmVyVHlwZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxufVxyXG5hcHBcclxuICAgIC5jb250cm9sbGVyKCdwcm94eVNlcnZlclVwZGF0ZU1vZGFsQ29udHJvbGxlcicsIFByb3h5U2VydmVyVXBkYXRlTW9kYWxDb250cm9sbGVyKTsiXX0=
