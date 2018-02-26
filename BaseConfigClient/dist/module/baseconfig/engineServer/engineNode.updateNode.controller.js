define(["require", "exports", "../../common/app/main.app", "../../../core/entity/ex/EngineNodeEx", "angular", "../../common/services/engineNodeServer.service"], function (require, exports, main_app_1, EngineNodeEx_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EngineNodeUpdateNodeController = (function () {
        function EngineNodeUpdateNodeController($scope, engineNodeServer, $timeout) {
            this.$scope = $scope;
            this.engineNodeServer = engineNodeServer;
            this.$timeout = $timeout;
            this.isUpdate = false;
            this.proxyServerTypeObj = {};
            this.progress = 10;
            var vm = this;
            this.isUpdate = this.$scope.isUpdate;
            this.EngineServerID = this.$scope.engineServerID;
            if (this.$scope.isUpdate) {
                this.currentNode = this.$scope.updateData;
            }
            else {
                this.currentNode = new EngineNodeEx_1.EngineNodeEx();
            }
            $scope.$on("$destroy", function () {
                console.log("销毁了弹出框");
            });
        }
        EngineNodeUpdateNodeController.prototype.commitSaveOrUpdateNode = function (currentNode) {
            var _this = this;
            var checkStr = this.validateParams(currentNode);
            if (checkStr) {
                return;
            }
            if (currentNode.ID) {
                this.engineNodeServer.update(currentNode).then(function (resp) {
                    if (resp.code == 200) {
                        _this.closeUpdateModel(true);
                    }
                });
            }
            else {
                this.currentNode.EngineServerID = this.EngineServerID;
                this.engineNodeServer.save(this.currentNode).then(function (resp) {
                    if (resp.code == 200) {
                        _this.closeUpdateModel(true);
                    }
                });
            }
        };
        ;
        EngineNodeUpdateNodeController.prototype.closeUpdateModel = function (isCommit) {
            this.$scope.$emit('closeEngineNodeUpdateModel', { isCommit: isCommit });
        };
        EngineNodeUpdateNodeController.prototype.validateParams = function (model) {
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
        EngineNodeUpdateNodeController.$inject = ['$scope', 'engineNodeServer', '$timeout'];
        return EngineNodeUpdateNodeController;
    }());
    exports.EngineNodeUpdateNodeController = EngineNodeUpdateNodeController;
    main_app_1.app
        .controller('engineNodeUpdateNodeController', EngineNodeUpdateNodeController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9lbmdpbmVTZXJ2ZXIvZW5naW5lTm9kZS51cGRhdGVOb2RlLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBUUE7UUFPSSx3Q0FBb0IsTUFBVSxFQUFTLGdCQUFvQixFQUFTLFFBQVk7WUFBNUQsV0FBTSxHQUFOLE1BQU0sQ0FBSTtZQUFTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBSTtZQUFTLGFBQVEsR0FBUixRQUFRLENBQUk7WUFMaEYsYUFBUSxHQUFXLEtBQUssQ0FBQztZQUd6Qix1QkFBa0IsR0FBeUIsRUFBRSxDQUFDO1lBQzlDLGFBQVEsR0FBVSxFQUFFLENBQUM7WUFFakIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBR2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNyQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFBO1lBQ2hELEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUEsQ0FBQztnQkFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUM5QyxDQUFDO1lBQUEsSUFBSSxDQUFBLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDJCQUFZLEVBQUUsQ0FBQztZQUMxQyxDQUFDO1lBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7Z0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBR0QsK0RBQXNCLEdBQXRCLFVBQXVCLFdBQXNCO1lBQTdDLGlCQW1CQztZQWxCRyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2hELEVBQUUsQ0FBQSxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUM7Z0JBQ1QsTUFBTSxDQUFDO1lBQ1gsQ0FBQztZQUNELEVBQUUsQ0FBQSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFDO2dCQUNmLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBUTtvQkFDcEQsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQSxDQUFDO3dCQUNqQixLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2hDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1lBQUEsSUFBSSxDQUFBLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBUTtvQkFDdkQsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQSxDQUFDO3dCQUNqQixLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2hDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0wsQ0FBQztRQUFBLENBQUM7UUFFRix5REFBZ0IsR0FBaEIsVUFBaUIsUUFBZ0I7WUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEVBQUMsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztRQUN4RSxDQUFDO1FBSUQsdURBQWMsR0FBZCxVQUFlLEtBQWtCO1lBRTdCLEVBQUUsQ0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7Z0JBQ1osTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNsQixDQUFDO1lBQ0QsRUFBRSxDQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBQztnQkFDakIsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUN2QixDQUFDO1lBQ0QsRUFBRSxDQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQztnQkFDWixNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ2xCLENBQUM7WUFDRCxFQUFFLENBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDO2dCQUNaLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDbEIsQ0FBQztZQUNELE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBakVNLHNDQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUMsa0JBQWtCLEVBQUMsVUFBVSxDQUFDLENBQUM7UUFrRTlELHFDQUFDO0tBbkVELEFBbUVDLElBQUE7SUFuRVksd0VBQThCO0lBb0UzQyxjQUFHO1NBQ0UsVUFBVSxDQUFDLGdDQUFnQyxFQUFFLDhCQUE4QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2Jhc2Vjb25maWcvZW5naW5lU2VydmVyL2VuZ2luZU5vZGUudXBkYXRlTm9kZS5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnYW5ndWxhcic7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL2VuZ2luZU5vZGVTZXJ2ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7RW51bX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW51bS9FbnVtXCI7XHJcbmltcG9ydCB7RW5naW5lTm9kZUV4fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvRW5naW5lTm9kZUV4XCI7XHJcbmltcG9ydCB7IEVuZ2luZU5vZGUgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvRW5naW5lTm9kZVwiO1xyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcblxyXG5leHBvcnQgY2xhc3MgRW5naW5lTm9kZVVwZGF0ZU5vZGVDb250cm9sbGVye1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsJ2VuZ2luZU5vZGVTZXJ2ZXInLCckdGltZW91dCddO1xyXG4gICAgaXNVcGRhdGU6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgRW5naW5lU2VydmVySUQ6c3RyaW5nO1xyXG4gICAgY3VycmVudE5vZGU6RW5naW5lTm9kZUV4O1xyXG4gICAgcHJveHlTZXJ2ZXJUeXBlT2JqOntba2V5OnN0cmluZ106c3RyaW5nfSA9IHt9O1xyXG4gICAgcHJvZ3Jlc3M6bnVtYmVyID0gMTA7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTphbnkscHJpdmF0ZSBlbmdpbmVOb2RlU2VydmVyOmFueSxwcml2YXRlICR0aW1lb3V0OmFueSl7XHJcbiAgICAgICAgbGV0IHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgLy8g5Yid5aeL5YyWIGN0cmwg5Lyg6L+H5p2l55qE5Y+C5pWwXHJcbiAgICAgICAgdGhpcy5pc1VwZGF0ZSA9IHRoaXMuJHNjb3BlLmlzVXBkYXRlO1xyXG4gICAgICAgIHRoaXMuRW5naW5lU2VydmVySUQgPSB0aGlzLiRzY29wZS5lbmdpbmVTZXJ2ZXJJRFxyXG4gICAgICAgIGlmKHRoaXMuJHNjb3BlLmlzVXBkYXRlKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50Tm9kZSA9IHRoaXMuJHNjb3BlLnVwZGF0ZURhdGE7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE5vZGUgPSBuZXcgRW5naW5lTm9kZUV4KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzY29wZS4kb24oXCIkZGVzdHJveVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIumUgOavgeS6huW8ueWHuuahhlwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY29tbWl0U2F2ZU9yVXBkYXRlTm9kZShjdXJyZW50Tm9kZTpFbmdpbmVOb2RlKXtcclxuICAgICAgICBsZXQgY2hlY2tTdHIgPSB0aGlzLnZhbGlkYXRlUGFyYW1zKGN1cnJlbnROb2RlKTtcclxuICAgICAgICBpZihjaGVja1N0cil7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoY3VycmVudE5vZGUuSUQpe1xyXG4gICAgICAgICAgICB0aGlzLmVuZ2luZU5vZGVTZXJ2ZXIudXBkYXRlKGN1cnJlbnROb2RlKS50aGVuKChyZXNwOmFueSk9PntcclxuICAgICAgICAgICAgICAgIGlmKHJlc3AuY29kZSA9PSAyMDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VVcGRhdGVNb2RlbCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE5vZGUuRW5naW5lU2VydmVySUQgPSB0aGlzLkVuZ2luZVNlcnZlcklEO1xyXG4gICAgICAgICAgICB0aGlzLmVuZ2luZU5vZGVTZXJ2ZXIuc2F2ZSh0aGlzLmN1cnJlbnROb2RlKS50aGVuKChyZXNwOmFueSk9PntcclxuICAgICAgICAgICAgICAgIGlmKHJlc3AuY29kZSA9PSAyMDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VVcGRhdGVNb2RlbCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjbG9zZVVwZGF0ZU1vZGVsKGlzQ29tbWl0OmJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KCdjbG9zZUVuZ2luZU5vZGVVcGRhdGVNb2RlbCcse2lzQ29tbWl0OmlzQ29tbWl0fSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v6aqM6K+B5a2X5q616ZmQ5Yi277yM6L+U5Zue5o+Q56S66K+tXHJcbiAgICB2YWxpZGF0ZVBhcmFtcyhtb2RlbDpFbmdpbmVOb2RlRXgpOnN0cmluZ3tcclxuXHJcbiAgICAgICAgaWYoIW1vZGVsLkNvZGUpe1xyXG4gICAgICAgICAgICByZXR1cm4gJ0NvZGUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighbW9kZWwuSXBBZGRyZXNzKXtcclxuICAgICAgICAgICAgcmV0dXJuICdJcEFkZHJlc3MnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighbW9kZWwuTmFtZSl7XHJcbiAgICAgICAgICAgIHJldHVybiAnTmFtZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFtb2RlbC5Qb3J0KXtcclxuICAgICAgICAgICAgcmV0dXJuICdQb3J0JztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG59XHJcbmFwcFxyXG4gICAgLmNvbnRyb2xsZXIoJ2VuZ2luZU5vZGVVcGRhdGVOb2RlQ29udHJvbGxlcicsIEVuZ2luZU5vZGVVcGRhdGVOb2RlQ29udHJvbGxlcik7Il19
