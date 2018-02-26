define(["require", "exports", "./router.model", "./router.config", "./router.run", "./group/common.group"], function (require, exports, router_model_1, router_config_1, router_run_1, common_group_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RouterService = (function () {
        function RouterService() {
            this.getModuleItems = function (parentStateName) {
                var nodeArr = router_model_1.default.getInstance().getRouterConfig(), i, len, result = [];
                for (i = 0, len = nodeArr.length; i < len; i++) {
                    if (nodeArr[i] && nodeArr[i]['parent'] == parentStateName) {
                        result.push(nodeArr[i]);
                    }
                }
                return result;
            };
            this.getModuleItemsWithGroup = function (parentStateName) {
                var items = this.getModuleItems(parentStateName);
                var result = [];
                var temp = {};
                var tempArr = [];
                var other = [];
                for (var i = 0, len = items.length; i < len; i++) {
                    if (items[i].group && common_group_1.CommonGroup[items[i].group]) {
                        if (!temp[items[i].group]) {
                            temp[items[i].group] = [];
                            tempArr.push(items[i].group);
                        }
                        temp[items[i].group].push(items[i]);
                    }
                    else {
                        other.push(items[i]);
                    }
                }
                for (var i = 0, len = tempArr.length; i < len; i++) {
                    var config = common_group_1.CommonGroup[tempArr[i]];
                    config.children = [].concat(temp[tempArr[i]]);
                    result.push(config);
                }
                result = result.concat(other);
                return result;
            };
            this.init = function (backAuthorityList) {
                router_model_1.default.getInstance().init(backAuthorityList);
                router_config_1.default.getInstance().init(router_model_1.default.getInstance().getRouterConfig());
                router_run_1.default.getInstance().init(router_model_1.default.getInstance().getRouterConfig());
            };
        }
        RouterService.getInstance = function () {
            return this._instance = this._instance || new RouterService();
        };
        return RouterService;
    }());
    exports.default = RouterService;
    ;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3JvdXRlci9yb3V0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFVQTtRQUVJO1lBWUEsbUJBQWMsR0FBRyxVQUFVLGVBQXVCO2dCQUU5QyxJQUFJLE9BQU8sR0FBd0Isc0JBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLEVBQUUsRUFDcEUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDO2dCQUV4QixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDN0MsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDO3dCQUN4RCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1QixDQUFDO2dCQUNMLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNsQixDQUFDLENBQUM7WUFFRiw0QkFBdUIsR0FBRyxVQUFTLGVBQXVCO2dCQUN0RCxJQUFJLEtBQUssR0FBd0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDdEUsSUFBSSxNQUFNLEdBQWdDLEVBQUUsQ0FBQztnQkFDN0MsSUFBSSxJQUFJLEdBQXVDLEVBQUUsQ0FBQztnQkFDbEQsSUFBSSxPQUFPLEdBQWlCLEVBQUUsQ0FBQztnQkFDL0IsSUFBSSxLQUFLLEdBQXdCLEVBQUUsQ0FBQztnQkFHcEMsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUMsQ0FBQztvQkFFeEMsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSwwQkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQzlDLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBLENBQUM7NEJBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUMxQixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDakMsQ0FBQzt3QkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEMsQ0FBQztvQkFBQSxJQUFJLENBQUEsQ0FBQzt3QkFFRixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QixDQUFDO2dCQUNMLENBQUM7Z0JBQ0QsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLEdBQUcsR0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQztvQkFDdkMsSUFBSSxNQUFNLEdBQUcsMEJBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQTBCLENBQUM7b0JBQzlELE1BQU0sQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDeEIsQ0FBQztnQkFDRCxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFxQyxDQUFDLENBQUM7Z0JBQzlELE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFFbEIsQ0FBQyxDQUFDO1lBRUYsU0FBSSxHQUFHLFVBQVUsaUJBQTJDO2dCQUN4RCxzQkFBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUM1Qyx1QkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxzQkFBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7Z0JBQ2pFLG9CQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLHNCQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztZQUNsRSxDQUFDLENBQUM7UUE1RFksQ0FBQztRQUdELHlCQUFXLEdBQXpCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQ2xFLENBQUM7UUF5REwsb0JBQUM7SUFBRCxDQWhFQSxBQWdFQyxJQUFBOztJQUFBLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9yb3V0ZXIvcm91dGVyLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBkZWxsIG9uIDIwMTcvMy8yMy5cclxuICovXHJcbmltcG9ydCBNb2RlbCBmcm9tIFwiLi9yb3V0ZXIubW9kZWxcIjtcclxuaW1wb3J0IENvbmZpZyBmcm9tIFwiLi9yb3V0ZXIuY29uZmlnXCI7XHJcbmltcG9ydCBSdW4gZnJvbSBcIi4vcm91dGVyLnJ1blwiO1xyXG5pbXBvcnQge0lCYWNrUm91dGVyQ29uZmlnLCBJUm91dGVyQ29uZmlnLCBJUm91dGVyQ29uZmlnQW5kR3JvdXAsIElSb3V0ZXJHcm91cH0gZnJvbSBcIi4vcm91dGVyXCI7XHJcbmltcG9ydCB7Q29tbW9uR3JvdXB9IGZyb20gXCIuL2dyb3VwL2NvbW1vbi5ncm91cFwiO1xyXG5pbXBvcnQge01vZHVsZUl0ZW19IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9Nb2R1bEl0ZW1Nb2RlbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGVyU2VydmljZXtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe31cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogUm91dGVyU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IFJvdXRlclNlcnZpY2V7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlID0gdGhpcy5faW5zdGFuY2UgfHwgbmV3IFJvdXRlclNlcnZpY2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaooeWdl+mFjee9rlxyXG4gICAgICogQHBhcmFtIHBhcmVudFN0YXRlTmFtZVxyXG4gICAgICogQHJldHVybnMge0FycmF5fVxyXG4gICAgICovXHJcbiAgICBnZXRNb2R1bGVJdGVtcyA9IGZ1bmN0aW9uIChwYXJlbnRTdGF0ZU5hbWU6IHN0cmluZyl7XHJcbiAgICAgICAgLy8g6IulcGFyZW50U3RhdGVOYW1lLCDliJnooajnpLrlj5bmoLnot6/lvoTnmoTmlbDmja5cclxuICAgICAgICBsZXQgbm9kZUFycjpBcnJheTxJUm91dGVyQ29uZmlnPiA9IE1vZGVsLmdldEluc3RhbmNlKCkuZ2V0Um91dGVyQ29uZmlnKCksXHJcbiAgICAgICAgICAgIGksIGxlbiwgcmVzdWx0ID0gW107XHJcbiAgICAgICAgLy8g6YGN5Y6G5pWw5qCR57uT54K5LCDmib7liLBwYXJlbnTkuI5rZXnljLnphY3nmoTmlbDmja4sIOeEtuWQjuWIl+WHuui/lOWbnmNoaWxkcmVuXHJcbiAgICAgICAgZm9yIChpID0gMCwgbGVuID0gbm9kZUFyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobm9kZUFycltpXSAmJiBub2RlQXJyW2ldWydwYXJlbnQnXSA9PSBwYXJlbnRTdGF0ZU5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5vZGVBcnJbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIGdldE1vZHVsZUl0ZW1zV2l0aEdyb3VwID0gZnVuY3Rpb24ocGFyZW50U3RhdGVOYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBpdGVtczpBcnJheTxJUm91dGVyQ29uZmlnPiA9IHRoaXMuZ2V0TW9kdWxlSXRlbXMocGFyZW50U3RhdGVOYW1lKTtcclxuICAgICAgICBsZXQgcmVzdWx0OkFycmF5PElSb3V0ZXJDb25maWdBbmRHcm91cD4gPSBbXTtcclxuICAgICAgICBsZXQgdGVtcDp7W2tleTpzdHJpbmddOkFycmF5PElSb3V0ZXJDb25maWc+fSA9IHt9O1xyXG4gICAgICAgIGxldCB0ZW1wQXJyOkFycmF5PHN0cmluZz4gPSBbXTsgLy8g55So5LqO5oyH5a6aZ3JvdXDpobrluo9cclxuICAgICAgICBsZXQgb3RoZXI6QXJyYXk8SVJvdXRlckNvbmZpZz4gPSBbXTtcclxuICAgICAgICAvLyDlho3lsIbliIbnu4TmlbDmja7liqDlhaVcclxuICAgICAgICAvLyDmnIDlkI7nu4Too4XmiJDkuIDkuKrmoJHlvaIgW25hbWU6JycsY2hpbGRyZW46WydrZXknLGNvZGVdXVxyXG4gICAgICAgIGZvcihsZXQgaT0wLGxlbiA9IGl0ZW1zLmxlbmd0aDsgaTxsZW47IGkrKyl7XHJcbiAgICAgICAgICAgIC8vIOi3r+eUseWtmOWcqOe7hCwg6Ieq5a6a5LmJ57uE5YaF5pyJ6Lev55Sx5a2Y5Zyo55qE57uEXHJcbiAgICAgICAgICAgIGlmKGl0ZW1zW2ldLmdyb3VwICYmIENvbW1vbkdyb3VwW2l0ZW1zW2ldLmdyb3VwXSl7XHJcbiAgICAgICAgICAgICAgICBpZighdGVtcFtpdGVtc1tpXS5ncm91cF0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBbaXRlbXNbaV0uZ3JvdXBdID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcEFyci5wdXNoKGl0ZW1zW2ldLmdyb3VwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRlbXBbaXRlbXNbaV0uZ3JvdXBdLnB1c2goaXRlbXNbaV0pO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vIOWQpuWImeaYr+i+k+WFpeayoeacieWIhue7hOeahFxyXG4gICAgICAgICAgICAgICAgb3RoZXIucHVzaChpdGVtc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBpPTAsbGVuPXRlbXBBcnIubGVuZ3RoOyBpPGxlbjtpKyspe1xyXG4gICAgICAgICAgICBsZXQgY29uZmlnID0gQ29tbW9uR3JvdXBbdGVtcEFycltpXV0gYXMgSVJvdXRlckNvbmZpZ0FuZEdyb3VwO1xyXG4gICAgICAgICAgICBjb25maWcuY2hpbGRyZW4gPSBbXS5jb25jYXQodGVtcFt0ZW1wQXJyW2ldXSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5jb25jYXQob3RoZXIgYXMgQXJyYXk8SVJvdXRlckNvbmZpZ0FuZEdyb3VwPik7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGluaXQgPSBmdW5jdGlvbiAoYmFja0F1dGhvcml0eUxpc3Q6IEFycmF5PElCYWNrUm91dGVyQ29uZmlnPikge1xyXG4gICAgICAgIE1vZGVsLmdldEluc3RhbmNlKCkuaW5pdChiYWNrQXV0aG9yaXR5TGlzdCk7XHJcbiAgICAgICAgQ29uZmlnLmdldEluc3RhbmNlKCkuaW5pdChNb2RlbC5nZXRJbnN0YW5jZSgpLmdldFJvdXRlckNvbmZpZygpKTtcclxuICAgICAgICBSdW4uZ2V0SW5zdGFuY2UoKS5pbml0KE1vZGVsLmdldEluc3RhbmNlKCkuZ2V0Um91dGVyQ29uZmlnKCkpO1xyXG4gICAgfTtcclxuXHJcbn07Il19
