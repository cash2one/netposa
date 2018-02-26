define(["require", "exports", "../../common/app/main.app", "../../../core/enum/ProxyServerType", "../../../core/entity/ex/ProxyServerEx", "../../common/services/proxyServer.service", "angular"], function (require, exports, main_app_1, ProxyServerType_1, ProxyServerEx_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProxyServerUpdateModalController = (function () {
        function ProxyServerUpdateModalController($scope, proxyServerService, $timeout) {
            this.$scope = $scope;
            this.proxyServerService = proxyServerService;
            this.$timeout = $timeout;
            this.isUpdate = false;
            this.proxyServerTypeList = [];
            this.proxyServerTypeObj = {};
            this.progress = 10;
            var vm = this;
            for (var key in ProxyServerType_1.ProxyServerType) {
                this.proxyServerTypeList.push(ProxyServerType_1.ProxyServerType[key]);
            }
            this.isUpdate = this.$scope.isUpdate;
            if (this.$scope.isUpdate) {
                this.currentServe = this.$scope.updateData;
            }
            else {
                this.currentServe = new ProxyServerEx_1.ProxyServerEx();
            }
            $scope.$on("$destroy", function () {
                console.log("销毁了弹出框");
            });
        }
        ProxyServerUpdateModalController.prototype.commitSaveOrUpdate = function () {
            var _this = this;
            var checkStr = this.validateParams(this.currentServe);
            if (checkStr) {
                return;
            }
            else {
            }
            if (this.currentServe.ID) {
                this.proxyServerService.update(this.currentServe).then(function (resp) {
                    if (resp.code == 200) {
                        _this.closeUpdateModel(true);
                    }
                });
            }
            else {
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
        ProxyServerUpdateModalController.prototype.changeTypeSelect = function () {
            var _this = this;
            angular.forEach(ProxyServerType_1.ProxyServerType, function (val) {
                if (val.value === _this.currentServe.ProxyServerType) {
                    _this.currentServe.Port = val.index;
                }
            });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9wcm94eVNlcnZlci9wcm94eVNlcnZlci51cGRhdGVNb2RhbC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVVBO1FBT0ksMENBQW9CLE1BQVUsRUFBUyxrQkFBc0IsRUFBUyxRQUFZO1lBQTlELFdBQU0sR0FBTixNQUFNLENBQUk7WUFBUyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQUk7WUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFJO1lBTGxGLGFBQVEsR0FBVyxLQUFLLENBQUM7WUFFekIsd0JBQW1CLEdBQStCLEVBQUUsQ0FBQztZQUNyRCx1QkFBa0IsR0FBeUIsRUFBRSxDQUFDO1lBQzlDLGFBQVEsR0FBVSxFQUFFLENBQUM7WUFFakIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBRWQsR0FBRyxDQUFBLENBQUMsSUFBSSxHQUFHLElBQUksaUNBQWUsQ0FBQyxDQUFBLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsaUNBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3hELENBQUM7WUFHRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ3JDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUEsQ0FBQztnQkFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUMvQyxDQUFDO1lBQUEsSUFBSSxDQUFBLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLDZCQUFhLEVBQUUsQ0FBQztZQUM1QyxDQUFDO1lBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7Z0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FB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QyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9iYXNlY29uZmlnL3Byb3h5U2VydmVyL3Byb3h5U2VydmVyLnVwZGF0ZU1vZGFsLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0ICcuLi8uLi9jb21tb24vc2VydmljZXMvcHJveHlTZXJ2ZXIuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgJ2FuZ3VsYXInO1xyXG5pbXBvcnQge1Byb3h5U2VydmVyVHlwZX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW51bS9Qcm94eVNlcnZlclR5cGVcIjtcclxuaW1wb3J0IHtFbnVtfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnVtL0VudW1cIjtcclxuaW1wb3J0IHtQcm94eVNlcnZlckV4fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvUHJveHlTZXJ2ZXJFeFwiO1xyXG5pbXBvcnQge0lQcm94eVNlcnZlclR5cGVFbnVtfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnVtL1Byb3h5U2VydmVyVHlwZVwiO1xyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcblxyXG5jbGFzcyBQcm94eVNlcnZlclVwZGF0ZU1vZGFsQ29udHJvbGxlcntcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCdwcm94eVNlcnZlclNlcnZpY2UnLCckdGltZW91dCddO1xyXG4gICAgaXNVcGRhdGU6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgY3VycmVudFNlcnZlOlByb3h5U2VydmVyRXg7XHJcbiAgICBwcm94eVNlcnZlclR5cGVMaXN0OkFycmF5PElQcm94eVNlcnZlclR5cGVFbnVtPiA9IFtdO1xyXG4gICAgcHJveHlTZXJ2ZXJUeXBlT2JqOntba2V5OnN0cmluZ106c3RyaW5nfSA9IHt9O1xyXG4gICAgcHJvZ3Jlc3M6bnVtYmVyID0gMTA7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTphbnkscHJpdmF0ZSBwcm94eVNlcnZlclNlcnZpY2U6YW55LHByaXZhdGUgJHRpbWVvdXQ6YW55LCl7XHJcbiAgICAgICAgbGV0IHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gUHJveHlTZXJ2ZXJUeXBlKXtcclxuICAgICAgICAgICAgdGhpcy5wcm94eVNlcnZlclR5cGVMaXN0LnB1c2goUHJveHlTZXJ2ZXJUeXBlW2tleV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g5Yid5aeL5YyWIGN0cmwg5Lyg6L+H5p2l55qE5Y+C5pWwXHJcbiAgICAgICAgdGhpcy5pc1VwZGF0ZSA9IHRoaXMuJHNjb3BlLmlzVXBkYXRlO1xyXG4gICAgICAgIGlmKHRoaXMuJHNjb3BlLmlzVXBkYXRlKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2VydmUgPSB0aGlzLiRzY29wZS51cGRhdGVEYXRhO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTZXJ2ZSA9IG5ldyBQcm94eVNlcnZlckV4KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzY29wZS4kb24oXCIkZGVzdHJveVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIumUgOavgeS6huW8ueWHuuahhlwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY29tbWl0U2F2ZU9yVXBkYXRlKCl7XHJcbiAgICAgICAgbGV0IGNoZWNrU3RyID0gdGhpcy52YWxpZGF0ZVBhcmFtcyh0aGlzLmN1cnJlbnRTZXJ2ZSk7XHJcbiAgICAgICAgaWYoY2hlY2tTdHIpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuY3VycmVudFNlcnZlLklEKXtcclxuICAgICAgICAgICAgdGhpcy5wcm94eVNlcnZlclNlcnZpY2UudXBkYXRlKHRoaXMuY3VycmVudFNlcnZlKS50aGVuKChyZXNwOmFueSk9PntcclxuICAgICAgICAgICAgICAgIGlmKHJlc3AuY29kZSA9PSAyMDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VVcGRhdGVNb2RlbCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMucHJveHlTZXJ2ZXJTZXJ2aWNlLnNhdmUodGhpcy5jdXJyZW50U2VydmUpLnRoZW4oKHJlc3A6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgaWYocmVzcC5jb2RlID09IDIwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVVwZGF0ZU1vZGVsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNsb3NlVXBkYXRlTW9kZWwoaXNDb21taXQ6Ym9vbGVhbil7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ2Nsb3NlUHJveHlTZXJ2ZXJVcGRhdGVNb2RlbCcse2lzQ29tbWl0OmlzQ29tbWl0fSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlVHlwZVNlbGVjdCgpe1xyXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChQcm94eVNlcnZlclR5cGUsKHZhbDpJUHJveHlTZXJ2ZXJUeXBlRW51bSk9PntcclxuICAgICAgICAgICAgaWYodmFsLnZhbHVlID09PSB0aGlzLmN1cnJlbnRTZXJ2ZS5Qcm94eVNlcnZlclR5cGUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2VydmUuUG9ydCA9IHZhbC5pbmRleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+mqjOivgeWtl+autemZkOWItu+8jOi/lOWbnuaPkOekuuivrVxyXG4gICAgdmFsaWRhdGVQYXJhbXMobW9kZWw6UHJveHlTZXJ2ZXJFeCk6c3RyaW5ne1xyXG5cclxuICAgICAgICBpZighbW9kZWwuQ29kZSl7XHJcbiAgICAgICAgICAgIHJldHVybiAnQ29kZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFtb2RlbC5JcEFkZHJlc3Mpe1xyXG4gICAgICAgICAgICByZXR1cm4gJ0lwQWRkcmVzcyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFtb2RlbC5OYW1lKXtcclxuICAgICAgICAgICAgcmV0dXJuICdOYW1lJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIW1vZGVsLlBvcnQpe1xyXG4gICAgICAgICAgICByZXR1cm4gJ1BvcnQnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighbW9kZWwuUHJveHlTZXJ2ZXJUeXBlKXtcclxuICAgICAgICAgICAgcmV0dXJuICdQcm94eVNlcnZlclR5cGUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbn1cclxuYXBwXHJcbiAgICAuY29udHJvbGxlcigncHJveHlTZXJ2ZXJVcGRhdGVNb2RhbENvbnRyb2xsZXInLCBQcm94eVNlcnZlclVwZGF0ZU1vZGFsQ29udHJvbGxlcik7Il19
