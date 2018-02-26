define(["require", "exports", "../../common/app/main.app", "../../../core/enum/EngineServerType", "../../../core/entity/ex/EngineServerEx", "angular", "../../common/services/engineServerServer.service"], function (require, exports, main_app_1, EngineServerType_1, EngineServerEx_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EngineServerUpdateServerController = (function () {
        function EngineServerUpdateServerController($scope, engineServerServer, $timeout) {
            this.$scope = $scope;
            this.engineServerServer = engineServerServer;
            this.$timeout = $timeout;
            this.isUpdate = false;
            this.engineServerTypeList = [];
            this.proxyServerTypeObj = {};
            this.progress = 10;
            var vm = this;
            for (var key in EngineServerType_1.EngineServerType) {
                this.engineServerTypeList.push(EngineServerType_1.EngineServerType[key]);
            }
            this.isUpdate = this.$scope.isUpdate;
            if (this.$scope.isUpdate) {
                this.currentServe = this.$scope.updateData;
            }
            else {
                this.currentServe = new EngineServerEx_1.EngineServerEx();
            }
            $scope.$on("$destroy", function () {
                console.log("销毁了弹出框");
            });
        }
        EngineServerUpdateServerController.prototype.commitSaveOrUpdate = function () {
            var _this = this;
            var checkStr = this.validateParams(this.currentServe);
            if (checkStr) {
                return;
            }
            else {
            }
            if (this.currentServe.ID) {
                this.engineServerServer.update(this.currentServe).then(function (resp) {
                    console.log(resp);
                    if (resp.code == 200) {
                        _this.closeUpdateModel(true);
                    }
                });
            }
            else {
                this.engineServerServer.save(this.currentServe).then(function (resp) {
                    if (resp.code == 200) {
                        _this.closeUpdateModel(true);
                    }
                });
            }
        };
        ;
        EngineServerUpdateServerController.prototype.closeUpdateModel = function (isCommit) {
            this.$scope.$emit('closeEngineServerUpdateModel', { isCommit: isCommit });
        };
        EngineServerUpdateServerController.prototype.changeTypeSelect = function () {
            var _this = this;
            angular.forEach(EngineServerType_1.EngineServerType, function (val) {
                if (val.value === _this.currentServe.EngineServerType) {
                    _this.currentServe.Port = val.index;
                }
            });
        };
        EngineServerUpdateServerController.prototype.validateParams = function (model) {
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
            return '';
        };
        EngineServerUpdateServerController.$inject = ['$scope', 'engineServerServer', '$timeout'];
        return EngineServerUpdateServerController;
    }());
    exports.EngineServerUpdateServerController = EngineServerUpdateServerController;
    main_app_1.app
        .controller('engineServerUpdateServerController', EngineServerUpdateServerController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9lbmdpbmVTZXJ2ZXIvZW5naW5lU2VydmVyLnVwZGF0ZVNlcnZlci5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVNBO1FBT0ksNENBQW9CLE1BQVUsRUFBUyxrQkFBc0IsRUFBUyxRQUFZO1lBQTlELFdBQU0sR0FBTixNQUFNLENBQUk7WUFBUyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQUk7WUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFJO1lBTGxGLGFBQVEsR0FBVyxLQUFLLENBQUM7WUFFekIseUJBQW9CLEdBQWdDLEVBQUUsQ0FBQztZQUN2RCx1QkFBa0IsR0FBeUIsRUFBRSxDQUFDO1lBQzlDLGFBQVEsR0FBVSxFQUFFLENBQUM7WUFFakIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBRWQsR0FBRyxDQUFBLENBQUMsSUFBSSxHQUFHLElBQUksbUNBQWdCLENBQUMsQ0FBQSxDQUFDO2dCQUM3QixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLG1DQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDMUQsQ0FBQztZQUdELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDckMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFDO2dCQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1lBQy9DLENBQUM7WUFBQSxJQUFJLENBQUEsQ0FBQztnQkFDRixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksK0JBQWMsRUFBRSxDQUFDO1lBQzdDLENBQUM7WUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFHRCwrREFBa0IsR0FBbEI7WUFBQSxpQkF5QkM7WUF2QkcsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdEQsRUFBRSxDQUFBLENBQUMsUUFBUSxDQUFDLENBQUEsQ0FBQztnQkFDVCxNQUFNLENBQUM7WUFDWCxDQUFDO1lBQUEsSUFBSSxDQUFBLENBQUM7WUFDTixDQUFDO1lBQ0QsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFDO2dCQUVyQixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFRO29CQUM1RCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUVsQixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFBLENBQUM7d0JBQ2pCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDaEMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7WUFBQSxJQUFJLENBQUEsQ0FBQztnQkFFRixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFRO29CQUUxRCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFBLENBQUM7d0JBQ2pCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDaEMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDO1FBQUEsQ0FBQztRQUVGLDZEQUFnQixHQUFoQixVQUFpQixRQUFnQjtZQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsRUFBQyxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDO1FBQzFFLENBQUM7UUFFRCw2REFBZ0IsR0FBaEI7WUFBQSxpQkFNQztZQUxHLE9BQU8sQ0FBQyxPQUFPLENBQUMsbUNBQWdCLEVBQUMsVUFBQyxHQUF5QjtnQkFDdkQsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxLQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUEsQ0FBQztvQkFDakQsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztnQkFDdkMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUlELDJEQUFjLEdBQWQsVUFBZSxLQUFvQjtZQUUvQixFQUFFLENBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDO2dCQUNaLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDbEIsQ0FBQztZQUNELEVBQUUsQ0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBLENBQUM7Z0JBQ2pCLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDdkIsQ0FBQztZQUNELEVBQUUsQ0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7Z0JBQ1osTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNsQixDQUFDO1lBQ0QsRUFBRSxDQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQztnQkFDWixNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ2xCLENBQUM7WUFDRCxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQWxGTSwwQ0FBTyxHQUFHLENBQUMsUUFBUSxFQUFDLG9CQUFvQixFQUFDLFVBQVUsQ0FBQyxDQUFDO1FBbUZoRSx5Q0FBQztLQXBGRCxBQW9GQyxJQUFBO0lBcEZZLGdGQUFrQztJQXFGL0MsY0FBRztTQUNFLFVBQVUsQ0FBQyxvQ0FBb0MsRUFBRSxrQ0FBa0MsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9iYXNlY29uZmlnL2VuZ2luZVNlcnZlci9lbmdpbmVTZXJ2ZXIudXBkYXRlU2VydmVyLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0ICdhbmd1bGFyJztcclxuaW1wb3J0ICcuLi8uLi9jb21tb24vc2VydmljZXMvZW5naW5lU2VydmVyU2VydmVyLnNlcnZpY2UnOy8vLi4vLi4vY29tbW9uL3NlcnZpY2VzL2VuZ2luZVNlcnZlci5zZXJ2aWNlXHJcbmltcG9ydCB7RW5naW5lU2VydmVyVHlwZX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW51bS9FbmdpbmVTZXJ2ZXJUeXBlXCI7XHJcbmltcG9ydCB7RW51bX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW51bS9FbnVtXCI7XHJcbmltcG9ydCB7RW5naW5lU2VydmVyRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9FbmdpbmVTZXJ2ZXJFeFwiO1xyXG5pbXBvcnQge0lFbmdpbmVTZXJ2ZXJUeXBlRW51bX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW51bS9FbmdpbmVTZXJ2ZXJUeXBlXCI7XHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBFbmdpbmVTZXJ2ZXJVcGRhdGVTZXJ2ZXJDb250cm9sbGVye1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsJ2VuZ2luZVNlcnZlclNlcnZlcicsJyR0aW1lb3V0J107XHJcbiAgICBpc1VwZGF0ZTpib29sZWFuID0gZmFsc2U7XHJcbiAgICBjdXJyZW50U2VydmU6RW5naW5lU2VydmVyRXg7XHJcbiAgICBlbmdpbmVTZXJ2ZXJUeXBlTGlzdDpBcnJheTxJRW5naW5lU2VydmVyVHlwZUVudW0+ID0gW107XHJcbiAgICBwcm94eVNlcnZlclR5cGVPYmo6e1trZXk6c3RyaW5nXTpzdHJpbmd9ID0ge307XHJcbiAgICBwcm9ncmVzczpudW1iZXIgPSAxMDtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOmFueSxwcml2YXRlIGVuZ2luZVNlcnZlclNlcnZlcjphbnkscHJpdmF0ZSAkdGltZW91dDphbnksKXtcclxuICAgICAgICBsZXQgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICBmb3IobGV0IGtleSBpbiBFbmdpbmVTZXJ2ZXJUeXBlKXtcclxuICAgICAgICAgICAgdGhpcy5lbmdpbmVTZXJ2ZXJUeXBlTGlzdC5wdXNoKEVuZ2luZVNlcnZlclR5cGVba2V5XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDliJ3lp4vljJYgY3RybCDkvKDov4fmnaXnmoTlj4LmlbBcclxuICAgICAgICB0aGlzLmlzVXBkYXRlID0gdGhpcy4kc2NvcGUuaXNVcGRhdGU7XHJcbiAgICAgICAgaWYodGhpcy4kc2NvcGUuaXNVcGRhdGUpe1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTZXJ2ZSA9IHRoaXMuJHNjb3BlLnVwZGF0ZURhdGE7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNlcnZlID0gbmV3IEVuZ2luZVNlcnZlckV4KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzY29wZS4kb24oXCIkZGVzdHJveVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIumUgOavgeS6huW8ueWHuuahhlwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY29tbWl0U2F2ZU9yVXBkYXRlKCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNoZWNrU3RyID0gdGhpcy52YWxpZGF0ZVBhcmFtcyh0aGlzLmN1cnJlbnRTZXJ2ZSk7XHJcbiAgICAgICAgaWYoY2hlY2tTdHIpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuY3VycmVudFNlcnZlLklEKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuZW5naW5lU2VydmVyU2VydmVyLnVwZGF0ZSh0aGlzLmN1cnJlbnRTZXJ2ZSkudGhlbigocmVzcDphbnkpPT57XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYocmVzcC5jb2RlID09IDIwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVVwZGF0ZU1vZGVsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuZW5naW5lU2VydmVyU2VydmVyLnNhdmUodGhpcy5jdXJyZW50U2VydmUpLnRoZW4oKHJlc3A6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihyZXNwLmNvZGUgPT0gMjAwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlVXBkYXRlTW9kZWwodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY2xvc2VVcGRhdGVNb2RlbChpc0NvbW1pdDpib29sZWFuKXtcclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCgnY2xvc2VFbmdpbmVTZXJ2ZXJVcGRhdGVNb2RlbCcse2lzQ29tbWl0OmlzQ29tbWl0fSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlVHlwZVNlbGVjdCgpe1xyXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChFbmdpbmVTZXJ2ZXJUeXBlLCh2YWw6SUVuZ2luZVNlcnZlclR5cGVFbnVtKT0+e1xyXG4gICAgICAgICAgICBpZih2YWwudmFsdWUgPT09IHRoaXMuY3VycmVudFNlcnZlLkVuZ2luZVNlcnZlclR5cGUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2VydmUuUG9ydCA9IHZhbC5pbmRleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+mqjOivgeWtl+autemZkOWItu+8jOi/lOWbnuaPkOekuuivrVxyXG4gICAgdmFsaWRhdGVQYXJhbXMobW9kZWw6RW5naW5lU2VydmVyRXgpOnN0cmluZ3tcclxuXHJcbiAgICAgICAgaWYoIW1vZGVsLkNvZGUpe1xyXG4gICAgICAgICAgICByZXR1cm4gJ0NvZGUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighbW9kZWwuSXBBZGRyZXNzKXtcclxuICAgICAgICAgICAgcmV0dXJuICdJcEFkZHJlc3MnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighbW9kZWwuTmFtZSl7XHJcbiAgICAgICAgICAgIHJldHVybiAnTmFtZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFtb2RlbC5Qb3J0KXtcclxuICAgICAgICAgICAgcmV0dXJuICdQb3J0JztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG59XHJcbmFwcFxyXG4gICAgLmNvbnRyb2xsZXIoJ2VuZ2luZVNlcnZlclVwZGF0ZVNlcnZlckNvbnRyb2xsZXInLCBFbmdpbmVTZXJ2ZXJVcGRhdGVTZXJ2ZXJDb250cm9sbGVyKTsiXX0=
