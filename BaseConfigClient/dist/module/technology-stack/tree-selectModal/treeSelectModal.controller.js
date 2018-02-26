define(["require", "exports", "../../common/app/main.app", "../../../core/enum/TreeType", "../../common/portrait-tool", "../../common/directive/tree/tree-params", "../../common/services/person.service", "../../common/treeSelectModal/treeSelectModal.factory", "../../common/treeSelectModal/treeSelectModal.controller", "../../common/services/businessLib.service"], function (require, exports, main_app_1, TreeType_1, portrait_tool_1, tree_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TreeSelectModalController = (function () {
        function TreeSelectModalController($scope, $q, $filter, layer, personService, treeSelectModalFactory, businessLibService) {
            var _this = this;
            this.$scope = $scope;
            this.$q = $q;
            this.$filter = $filter;
            this.layer = layer;
            this.personService = personService;
            this.treeSelectModalFactory = treeSelectModalFactory;
            this.businessLibService = businessLibService;
            this.getTreeSelectTreeBaseDatas = function () {
                var deferred = _this.$q.defer();
                if (_this.treeSelectModalFactory.getTreeBase().length > 0) {
                    deferred.resolve(true);
                }
                else {
                    _this.personService.findTreeWithArea().then(function (resp) {
                        if (resp && resp.code == 200) {
                            _this.treeSelectModalFactory.updateTreeBase(resp.data.areaExList, resp.data.personExList);
                            deferred.resolve(true);
                        }
                        else {
                            deferred.resolve(false);
                        }
                    });
                }
                return deferred.promise;
            };
        }
        TreeSelectModalController.prototype.openPersonSelectModel = function () {
            var _this = this;
            this.getTreeSelectTreeBaseDatas().then(function (resp) {
                if (resp) {
                    _this.treeSelectModalFactory.updateBaseTreeParams(TreeType_1.TreeType.person.value);
                    var scope_1 = _this.$scope.$new();
                    var titleStr = "选择树窗口";
                    _this.layer.open({
                        type: 1,
                        scrollbar: false,
                        title: [titleStr, 'text-align: left;'],
                        content: _this.treeSelectModalFactory.getModalHtmlTemplate(),
                        skin: 'update-person-layer',
                        scope: scope_1,
                        area: ["720px"],
                        end: function () {
                            scope_1.$destroy();
                        }
                    }).then(function (index) {
                        _this.openCloseLayerWatch();
                        _this.setTreeModalLayerIndex(index);
                    });
                }
            });
        };
        TreeSelectModalController.prototype.openCloseLayerWatch = function () {
            var _this = this;
            if (!this.treeModalLayerIndex) {
                this.$scope.$on(this.treeSelectModalFactory.getSelectModalClosedWatchName(), function (even, data) {
                    if (data.isCommit) {
                        console.log(" isCommit== true 窗口提交回调");
                    }
                    console.log(data);
                    _this.layer.close(_this.treeModalLayerIndex);
                });
            }
        };
        TreeSelectModalController.prototype.setTreeModalLayerIndex = function (index) {
            this.treeModalLayerIndex = index;
        };
        ;
        TreeSelectModalController.prototype.initPersonTreeParams = function () {
            this.baseTreeParams = new tree_params_1.TreeDataParams(true);
            this.baseTreeParams.treeId = "testTreeID";
            this.baseTreeParams.isShowIcon = true;
            this.baseTreeParams.isShowLine = false;
            this.baseTreeParams.checkEnable = true;
            this.baseTreeParams.isSingleSelect = false;
            this.baseTreeParams.isSimpleData = true;
            this.baseTreeParams.treeIdKey = "treeIdKey";
            this.baseTreeParams.treePidKey = "treeParentId";
            this.baseTreeParams.onCheck = function (event, treeId, treeNode) {
                console.log("获取打钩结果  需要过滤 掉虚拟节点 ");
                console.log();
            };
            this.baseTreeParams.treeInitComplete = function (treeId) {
            };
        };
        ;
        TreeSelectModalController.prototype.getBusinessLibLibHasSelf = function () {
            var _this = this;
            this.initPersonTreeParams();
            this.businessLibService.findHasSelfTree().then(function (resp) {
                if (resp && resp.code === 200) {
                    console.log("%c TODO ==========未过滤前,", "color:blue");
                    console.log(resp.data);
                    console.log("%c TODO ==========过滤掉 虚拟节点后数据,", "color:blue");
                    console.log(_this.$filter("dummyNodeFilter")(resp.data));
                    console.log("%c TODO ==========1.转树,", "color:blue");
                    console.log(portrait_tool_1.default.convert2Ztree(resp.data, "treeID", "treeParentId", "children"));
                    _this.baseTreeParams.treeDatas = resp.data;
                    debugger;
                }
                return true;
            });
        };
        TreeSelectModalController.$inject = ["$scope", "$q", "$filter",
            "layer",
            "personService",
            "treeSelectModalFactory",
            "businessLibService"
        ];
        return TreeSelectModalController;
    }());
    exports.TreeSelectModalController = TreeSelectModalController;
    main_app_1.app.controller("tsTreeSelectModalController", TreeSelectModalController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdGVjaG5vbG9neS1zdGFjay90cmVlLXNlbGVjdE1vZGFsL3RyZWVTZWxlY3RNb2RhbC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQXlCQTtRQVNJLG1DQUFvQixNQUFXLEVBQVMsRUFBTSxFQUFTLE9BQVcsRUFDOUMsS0FBUyxFQUNULGFBQTRCLEVBQzVCLHNCQUE4QyxFQUM5QyxrQkFBdUM7WUFKM0QsaUJBTUM7WUFObUIsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUFTLE9BQUUsR0FBRixFQUFFLENBQUk7WUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFJO1lBQzlDLFVBQUssR0FBTCxLQUFLLENBQUk7WUFDVCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtZQUM1QiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1lBQzlDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBcUI7WUFLM0QsK0JBQTBCLEdBQUc7Z0JBQ3pCLElBQUksUUFBUSxHQUFHLEtBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQy9CLEVBQUUsQ0FBQSxDQUFDLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztvQkFDbkQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0IsQ0FBQztnQkFBQSxJQUFJLENBQUEsQ0FBQztvQkFDRixLQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBNEM7d0JBQ3BGLEVBQUUsQ0FBQSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFBLENBQUM7NEJBQ3pCLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FB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QUMsWUFBWSxDQUFDLENBQUM7b0JBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ3pGLEtBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQzFDLFFBQVEsQ0FBQztnQkFDWixDQUFDO2dCQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBcElNLGlDQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLFNBQVM7WUFDckIsT0FBTztZQUNQLGVBQWU7WUFDZix3QkFBd0I7WUFDeEIsb0JBQW9CO1NBQ3ZDLENBQUM7UUFtSU4sZ0NBQUM7S0EzSUQsQUEySUMsSUFBQTtJQTNJWSw4REFBeUI7SUE2SXRDLGNBQUcsQ0FBQyxVQUFVLENBQUMsNkJBQTZCLEVBQUUseUJBQXlCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvdGVjaG5vbG9neS1zdGFjay90cmVlLXNlbGVjdE1vZGFsL3RyZWVTZWxlY3RNb2RhbC5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuXHJcblxyXG5pbXBvcnQge0lQZXJzb25TZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL3BlcnNvbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9wZXJzb24uc2VydmljZVwiO1xyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7QXJlYUFuZFBlcnNvbkxpc3RSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9QZXJzb25QYXJhbXNcIjtcclxuaW1wb3J0IHtUcmVlVHlwZX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW51bS9UcmVlVHlwZVwiO1xyXG5cclxuaW1wb3J0IHtJVHJlZVNlbGVjdE1vZGFsRmFjdG9yeX0gZnJvbSBcIi4uLy4uL2NvbW1vbi90cmVlU2VsZWN0TW9kYWwvdHJlZVNlbGVjdE1vZGFsLmZhY3RvcnlcIjtcclxuaW1wb3J0ICBcIi4uLy4uL2NvbW1vbi90cmVlU2VsZWN0TW9kYWwvdHJlZVNlbGVjdE1vZGFsLmZhY3RvcnlcIjtcclxuaW1wb3J0ICBcIi4uLy4uL2NvbW1vbi90cmVlU2VsZWN0TW9kYWwvdHJlZVNlbGVjdE1vZGFsLmNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHtUcmVlU2VsZWN0UmVzdWx0fSBmcm9tIFwiLi4vLi4vY29tbW9uL3RyZWVTZWxlY3RNb2RhbC90cmVlU2VsZWN0TW9kYWwuY29udHJvbGxlclwiO1xyXG5cclxuXHJcbmltcG9ydCB7QnVzaW5lc3NMaWJFeH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0J1c2luZXNzTGliRXhcIjtcclxuaW1wb3J0IFBvcnRyYWl0VG9vbCBmcm9tIFwiLi4vLi4vY29tbW9uL3BvcnRyYWl0LXRvb2xcIjtcclxuaW1wb3J0IHtUcmVlRGF0YVBhcmFtc30gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLXBhcmFtc1wiO1xyXG5cclxuXHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9idXNpbmVzc0xpYi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SUJ1c2luZXNzTGliU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9idXNpbmVzc0xpYi5zZXJ2aWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVHJlZVNlbGVjdE1vZGFsQ29udHJvbGxlcntcclxuICAgIHByaXZhdGUgdHJlZU1vZGFsTGF5ZXJJbmRleDpudW1iZXI7XHJcblxyXG4gICAgc3RhdGljICRpbmplY3QgPSBbXCIkc2NvcGVcIixcIiRxXCIsXCIkZmlsdGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGF5ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwZXJzb25TZXJ2aWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHJlZVNlbGVjdE1vZGFsRmFjdG9yeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJ1c2luZXNzTGliU2VydmljZVwiXHJcbiAgICBdO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSxwcml2YXRlICRxOmFueSxwcml2YXRlICRmaWx0ZXI6YW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsYXllcjphbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHBlcnNvblNlcnZpY2U6SVBlcnNvblNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHRyZWVTZWxlY3RNb2RhbEZhY3Rvcnk6SVRyZWVTZWxlY3RNb2RhbEZhY3RvcnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGJ1c2luZXNzTGliU2VydmljZTogSUJ1c2luZXNzTGliU2VydmljZVxyXG4gICAgKXtcclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflj5bmnYPpmZDpgInmi6nnqpflj6MgIOeUqOaItyDmoJHliJfooajmlbDmja5cclxuICAgIGdldFRyZWVTZWxlY3RUcmVlQmFzZURhdGFzID0gKCk6YW55ID0+e1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IHRoaXMuJHEuZGVmZXIoKTtcclxuICAgICAgICBpZih0aGlzLnRyZWVTZWxlY3RNb2RhbEZhY3RvcnkuZ2V0VHJlZUJhc2UoKS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMucGVyc29uU2VydmljZS5maW5kVHJlZVdpdGhBcmVhKCkudGhlbigocmVzcDpSZXNwb25zZVJlc3VsdDxBcmVhQW5kUGVyc29uTGlzdFJlc3VsdD4pPT57XHJcbiAgICAgICAgICAgICAgICBpZihyZXNwICYmIHJlc3AuY29kZSA9PSAyMDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZVNlbGVjdE1vZGFsRmFjdG9yeS51cGRhdGVUcmVlQmFzZShyZXNwLmRhdGEuYXJlYUV4TGlzdCxyZXNwLmRhdGEucGVyc29uRXhMaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgIH07XHJcbiAgICAvLyDmiZPlvIDnlKjmiLfpgInmi6nnqpflj6NcclxuICAgIG9wZW5QZXJzb25TZWxlY3RNb2RlbCgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5nZXRUcmVlU2VsZWN0VHJlZUJhc2VEYXRhcygpLnRoZW4oKHJlc3A6Ym9vbGVhbik9PntcclxuICAgICAgICAgICAgaWYocmVzcCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWVTZWxlY3RNb2RhbEZhY3RvcnkudXBkYXRlQmFzZVRyZWVQYXJhbXMoVHJlZVR5cGUucGVyc29uLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIC8vIOm7mOiupOmAieS4rUlEIOWIl+ihqFxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy50cmVlU2VsZWN0TW9kYWxGYWN0b3J5LnVwZGF0ZVRyZWVTZWxlY3RlZElkcyhbXSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NvcGU6YW55ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRpdGxlU3RyID0gXCLpgInmi6nmoJHnqpflj6NcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxiYXI6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6W3RpdGxlU3RyLCd0ZXh0LWFsaWduOiBsZWZ0OyddLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMudHJlZVNlbGVjdE1vZGFsRmFjdG9yeS5nZXRNb2RhbEh0bWxUZW1wbGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNraW46J3VwZGF0ZS1wZXJzb24tbGF5ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgICAgICAgICBhcmVhOltcIjcyMHB4XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS50aGVuKChpbmRleDpudW1iZXIpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuQ2xvc2VMYXllcldhdGNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUcmVlTW9kYWxMYXllckluZGV4KGluZGV4KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNyZWF0ZSBieSB6eHFcclxuICAgICAqIOaJk+W8gCBsYXllciDlhbPpl60g5Zue6LCD55uR5ZCsXHJcbiAgICAgKiBAdGltZTogMjAxNy0wNi0xMyAxNDoxNToyNVxyXG4gICAgICogQHBhcmFtczpcclxuICAgICAqIEByZXR1cm46IHZvaWRcclxuICAgICAqL1xyXG4gICAgb3BlbkNsb3NlTGF5ZXJXYXRjaCgpe1xyXG4gICAgICAgIGlmKCF0aGlzLnRyZWVNb2RhbExheWVySW5kZXgpe1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kb24odGhpcy50cmVlU2VsZWN0TW9kYWxGYWN0b3J5LmdldFNlbGVjdE1vZGFsQ2xvc2VkV2F0Y2hOYW1lKCksKGV2ZW46YW55LGRhdGE6VHJlZVNlbGVjdFJlc3VsdDxhbnk+KT0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEuaXNDb21taXQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIGlzQ29tbWl0PT0gdHJ1ZSDnqpflj6Pmj5DkuqTlm57osINcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5ZXIuY2xvc2UodGhpcy50cmVlTW9kYWxMYXllckluZGV4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiAg5qCH6K+G5b2T5YmNIOe8lui+kWxheWVyIG1vZGFsXHJcbiAgICAgKiBAdGltZTogMjAxNy0wNC0xOSAxNzowNjo0OFxyXG4gICAgICogQHBhcmFtczogaW5kZXgg5b2T5YmN5omT5byAIGxheWVyIOWbnuiwg+eahCBpbmRleFxyXG4gICAgICogQHJldHVybjpcclxuICAgICAqL1xyXG4gICAgc2V0VHJlZU1vZGFsTGF5ZXJJbmRleChpbmRleDpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMudHJlZU1vZGFsTGF5ZXJJbmRleCA9IGluZGV4O1xyXG4gICAgfTtcclxuXHJcbiAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT09PeS6uuiEuOW6kyDmoJEg5rWL6K+V55u45YWzKi9cclxuICAgIHB1YmxpYyBiYXNlVHJlZVBhcmFtczpUcmVlRGF0YVBhcmFtczxCdXNpbmVzc0xpYkV4PjtcclxuICAgIC8v5Yid5aeL5YyWIOaRhOWDj+acuiDmoJHnm7jlhbPlj4LmlbBcclxuICAgIHByaXZhdGUgaW5pdFBlcnNvblRyZWVQYXJhbXMoKXtcclxuICAgICAgICB0aGlzLmJhc2VUcmVlUGFyYW1zID0gbmV3IFRyZWVEYXRhUGFyYW1zPEJ1c2luZXNzTGliRXg+KHRydWUpO1xyXG4gICAgICAgIHRoaXMuYmFzZVRyZWVQYXJhbXMudHJlZUlkID0gXCJ0ZXN0VHJlZUlEXCI7XHJcblxyXG4gICAgICAgIHRoaXMuYmFzZVRyZWVQYXJhbXMuaXNTaG93SWNvbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5iYXNlVHJlZVBhcmFtcy5pc1Nob3dMaW5lID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuYmFzZVRyZWVQYXJhbXMuY2hlY2tFbmFibGUgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLmJhc2VUcmVlUGFyYW1zLmlzU2luZ2xlU2VsZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5iYXNlVHJlZVBhcmFtcy5pc1NpbXBsZURhdGEgPSB0cnVlO1xyXG4gICAgICAgIC8vIOazqOaEj1xyXG4gICAgICAgIHRoaXMuYmFzZVRyZWVQYXJhbXMudHJlZUlkS2V5ID0gXCJ0cmVlSWRLZXlcIjtcclxuICAgICAgICB0aGlzLmJhc2VUcmVlUGFyYW1zLnRyZWVQaWRLZXkgPSBcInRyZWVQYXJlbnRJZFwiO1xyXG5cclxuICAgICAgICB0aGlzLmJhc2VUcmVlUGFyYW1zLm9uQ2hlY2sgPSAoZXZlbnQ6IEV2ZW50LCB0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGU6IGFueSk6dm9pZD0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuiOt+WPluaJk+mSqee7k+aenCAg6ZyA6KaB6L+H5rukIOaOieiZmuaLn+iKgueCuSBcIik7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuYmFzZVRyZWVQYXJhbXMudHJlZUluaXRDb21wbGV0ZT0gKHRyZWVJZDpzdHJpbmcpOnZvaWQ9PntcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGdldEJ1c2luZXNzTGliTGliSGFzU2VsZigpe1xyXG4gICAgICAgIHRoaXMuaW5pdFBlcnNvblRyZWVQYXJhbXMoKTtcclxuICAgICAgICB0aGlzLmJ1c2luZXNzTGliU2VydmljZS5maW5kSGFzU2VsZlRyZWUoKS50aGVuKChyZXNwOlJlc3BvbnNlUmVzdWx0PEFycmF5PEJ1c2luZXNzTGliRXg+Pik9PntcclxuICAgICAgICAgICAgaWYocmVzcCAmJiByZXNwLmNvZGUgPT09MjAwKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJWMgVE9ETyA9PT09PT09PT095pyq6L+H5ruk5YmNLFwiLFwiY29sb3I6Ymx1ZVwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3AuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVjIFRPRE8gPT09PT09PT09Pei/h+a7pOaOiSDomZrmi5/oioLngrnlkI7mlbDmja4sXCIsXCJjb2xvcjpibHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuJGZpbHRlcihcImR1bW15Tm9kZUZpbHRlclwiKShyZXNwLmRhdGEpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLzEu6L2s5qCRXHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJWMgVE9ETyA9PT09PT09PT09MS7ovazmoJEsXCIsXCJjb2xvcjpibHVlXCIpO1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhQb3J0cmFpdFRvb2wuY29udmVydDJadHJlZShyZXNwLmRhdGEsIFwidHJlZUlEXCIsIFwidHJlZVBhcmVudElkXCIsIFwiY2hpbGRyZW5cIikpO1xyXG4gICAgICAgICAgICAgICB0aGlzLmJhc2VUcmVlUGFyYW1zLnRyZWVEYXRhcyA9IHJlc3AuZGF0YTtcclxuICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT3kurrohLjlupMg5qCRIOa1i+ivleebuOWFsyovXHJcblxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcihcInRzVHJlZVNlbGVjdE1vZGFsQ29udHJvbGxlclwiLCBUcmVlU2VsZWN0TW9kYWxDb250cm9sbGVyKTsiXX0=
