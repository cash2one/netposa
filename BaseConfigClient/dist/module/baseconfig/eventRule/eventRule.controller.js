define(["require", "exports", "text!./eventRule.popup.html", "../../common/app/main.app", "../../common/directive/page/page-params", "../../common/directive/tree/tree-params", "../../../core/params/EventRuleParams", "css!../style/policy-linkage.css", "css!../../../module/common/directive/unit-table/table.css", "./eventRule.popup.controller", "../../common/services/area.service", "../../common/services/eventRule.service", "angular"], function (require, exports, popupHtml, main_app_1, page_params_1, tree_params_1, EventRuleParams_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventRuleController = (function () {
        function EventRuleController($scope, $timeout, $state, areaService, layer, i18nFactory, eventRuleService) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$state = $state;
            this.areaService = areaService;
            this.layer = layer;
            this.i18nFactory = i18nFactory;
            this.eventRuleService = eventRuleService;
            this.tableListParams = new EventRuleParams_1.EventRuleParams();
            this.pageParams = new page_params_1.default();
            this.tBodyList = [];
            this.isSelectItems = false;
            this.initAreaTreeParams();
            this.$scope.$on('close.eventRule.popup', function (event, isFresh) {
                _this.layer.close(_this.currentLayerIndex);
                if (isFresh) {
                    _this.getTableList();
                }
            });
        }
        EventRuleController.prototype.initAreaTreeParams = function () {
            var _this = this;
            this.areaTreeDataParams = new tree_params_1.TreeDataParams();
            this.areaTreeDataParams.treeId = 'areaTreeArea';
            this.areaTreeDataParams.isDefaultSelected = true;
            this.areaTreeDataParams.onClick = function (event, treeId, treeNode) {
                _this.tableListParams.currentPage = 1;
                _this.tableListParams.AreaID = treeNode.ID;
                _this.currentArea = treeNode;
                _this.getTableList();
            };
            this.initAreaTreeData();
            this.areaTreeDataParams.treeInitComplete = function (treeId) {
            };
            this.tHeadList = [
                { field: "Name", title: "名称" },
                { field: "CreateTime", title: "创建时间" },
                { field: "Description", title: "描述" },
                { field: "bottoms", title: "操作" }
            ];
        };
        EventRuleController.prototype.afterChangeCheck = function (resultList, isCheckAll) {
            this.setIsSelectItems(resultList);
            this.selectedList = resultList;
            this.isSelectAll = isCheckAll;
        };
        ;
        EventRuleController.prototype.sortByField = function (_index, field, sortStatus) {
            this.tableListParams.isAsc = sortStatus;
            this.tableListParams.sortName = field;
            this.getTableList();
            this.tHeadList[_index].isAsc = sortStatus;
        };
        EventRuleController.prototype.setIsSelectItems = function (items) {
            var result = false;
            if (items && items.length > 0) {
                var i = void 0, len = void 0;
                for (i = 0, len = items.length; i < len; i++) {
                    if (items[i]) {
                        result = true;
                        break;
                    }
                }
            }
            if (this.isSelectItems !== result) {
                this.isSelectItems = result;
            }
        };
        EventRuleController.prototype.getTableList = function () {
            var _this = this;
            this.eventRuleService.findEventRuleListByPage(this.tableListParams).then(function (res) {
                if (res.code === 200) {
                    _this.tBodyList = res.data.Result;
                    _this.pageParams.currentPage = _this.tableListParams.currentPage;
                    _this.pageParams.pageSize = _this.tableListParams.pageSize ? _this.tableListParams.pageSize : 10;
                    _this.pageParams.totalCount = res.data.TotalCount;
                }
            });
        };
        EventRuleController.prototype.searchWithParams = function () {
            this.tableListParams.currentPage = 1;
            this.getTableList();
        };
        EventRuleController.prototype.initAreaTreeData = function () {
            var _this = this;
            this.areaService.findListTree({ keyword: this.treeSearchInput }).then(function (res) {
                _this.areaTreeDataParams.treeDatas = res;
            });
        };
        EventRuleController.prototype.editEventRule = function (item) {
            this.openEventRulePopup(false, item);
        };
        EventRuleController.prototype.openEventRulePopup = function (isAdd, item) {
            var scope = this.$scope.$new();
            scope.type = isAdd ? 'Add' : 'Update';
            scope.eventRule = item;
            scope.AreaID = this.currentArea.ID;
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: popupHtml,
                scope: scope,
                title: isAdd ? '新增联动策略' : '编辑联动策略',
                area: ["800px", "800px"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        EventRuleController.prototype.changePage = function (num) {
            this.tableListParams.currentPage = num;
            this.getTableList();
        };
        EventRuleController.prototype.changePageSize = function (num) {
            this.tableListParams.pageSize = num;
            this.tableListParams.currentPage = 1;
            this.getTableList();
        };
        EventRuleController.prototype.deleteEventRule = function (item) {
            var _this = this;
            this.layer.confirm("\u786E\u8BA4\u5220\u9664" + item.Name, {
                icon: 0
            }, function (index) {
                _this.layer.close(index);
                _this.eventRuleService.deleteEventRule(item.ID).then(function (res) {
                    if (res.code === 200 && res.data) {
                        console.log('删除成功', item);
                        _this.getTableList();
                    }
                });
            });
        };
        EventRuleController.prototype.deleteByIds = function () {
            var _this = this;
            debugger;
            var selectedDataList = this.getSelectedList();
            if (!selectedDataList || selectedDataList.length == 0) {
                return;
            }
            var ids = [];
            selectedDataList.forEach(function (server) {
                ids.push(server.ID);
            });
            var showText = '确定删除当前选中的 ' + ids.length + ' 条联动预案吗?';
            this.layer.confirm(showText, {
                icon: 0,
                title: this.i18nFactory('DP_CONFIG_COMMON_42'),
                area: ["500px", "200px"]
            }, function (index) {
                _this.layer.close(index);
                _this.submitDeleteByIds(ids);
            });
        };
        EventRuleController.prototype.submitDeleteByIds = function (ids) {
            var _this = this;
            this.eventRuleService.deleteByIds(ids).then(function (resp) {
                if (resp.code == 200) {
                    _this.pageParams.currentPage = 1;
                    _this.getTableList();
                }
                else {
                }
            });
        };
        ;
        EventRuleController.prototype.getSelectedList = function () {
            var _this = this;
            var selectedDataList = [];
            if (this.selectedList) {
                this.tBodyList.forEach(function (data, index) {
                    if (_this.selectedList[index]) {
                        selectedDataList.push(data);
                    }
                });
            }
            return selectedDataList;
        };
        ;
        EventRuleController.$inject = ['$scope', '$timeout', '$state', 'areaService', 'layer', 'i18nFactory', 'eventRuleService'];
        return EventRuleController;
    }());
    main_app_1.app.controller('baseConfigEventRuleController', EventRuleController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9ldmVudFJ1bGUvZXZlbnRSdWxlLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBdUJBO1FBZ0JJLDZCQUFvQixNQUFXLEVBQ1gsUUFBYSxFQUNiLE1BQVcsRUFDWCxXQUF5QixFQUN6QixLQUFVLEVBQ1YsV0FBZ0IsRUFDaEIsZ0JBQW1DO1lBTnZELGlCQWVDO1lBZm1CLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCxhQUFRLEdBQVIsUUFBUSxDQUFLO1lBQ2IsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGdCQUFXLEdBQVgsV0FBVyxDQUFjO1lBQ3pCLFVBQUssR0FBTCxLQUFLLENBQUs7WUFDVixnQkFBVyxHQUFYLFdBQVcsQ0FBSztZQUNoQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW1CO1lBakJ2RCxvQkFBZSxHQUFvQixJQUFJLGlDQUFlLEVBQUUsQ0FBQztZQUN6RCxlQUFVLEdBQWUsSUFBSSxxQkFBVSxFQUFFLENBQUM7WUFHMUMsY0FBUyxHQUF1QixFQUFFLENBQUM7WUFjL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDM0IsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsVUFBQyxLQUFVLEVBQUUsT0FBZ0I7Z0JBQ2xFLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUN6QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNWLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDeEIsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUVELGdEQUFrQixHQUFsQjtZQUFBLGlCQW1CQztZQWxCRyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSw0QkFBYyxFQUFVLENBQUM7WUFD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RUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFnTmpILDBCQUFDO0tBak5ELEFBaU5DLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLCtCQUErQixFQUFFLG1CQUFtQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2Jhc2Vjb25maWcvZXZlbnRSdWxlL2V2ZW50UnVsZS5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL2V2ZW50UnVsZS5wb3B1cC5odG1sXCIgbmFtZT1cInBvcHVwSHRtbFwiIC8+XHJcbmltcG9ydCBcImNzcyEuLi9zdHlsZS9wb2xpY3ktbGlua2FnZS5jc3NcIjtcclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCBcImNzcyEuLi8uLi8uLi9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS91bml0LXRhYmxlL3RhYmxlLmNzc1wiO1xyXG5pbXBvcnQgJy4vZXZlbnRSdWxlLnBvcHVwLmNvbnRyb2xsZXInO1xyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hcmVhLnNlcnZpY2UnO1xyXG5pbXBvcnQgUGFnZVBhcmFtcyBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS9wYWdlL3BhZ2UtcGFyYW1zXCI7XHJcbmltcG9ydCB7SUFyZWFTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FyZWEuc2VydmljZVwiO1xyXG5pbXBvcnQge0lUYWJsZUhlYWRlcn0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdW5pdC10YWJsZS90YWJsZS1wYXJhbXNcIjtcclxuaW1wb3J0IHtUcmVlRGF0YVBhcmFtc30gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLXBhcmFtc1wiO1xyXG5pbXBvcnQge0FyZWF9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9BcmVhXCI7XHJcbmltcG9ydCB7QXJlYUV4fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQXJlYUV4XCI7XHJcbmltcG9ydCB7QmFja1Jlc3BvbnNlQm9keSwgUGFnZVJlc3VsdCxSZXNwb25zZVJlc3VsdH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5pbXBvcnQge0lFdmVudFJ1bGVTZXJ2aWNlfSBmcm9tICcuLi8uLi9jb21tb24vc2VydmljZXMvZXZlbnRSdWxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9ldmVudFJ1bGUuc2VydmljZSc7XHJcbmltcG9ydCB7RXZlbnRSdWxlRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9FdmVudFJ1bGVFeFwiO1xyXG5pbXBvcnQgXCJhbmd1bGFyXCI7XHJcbmltcG9ydCB7VHJlZVBhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3RyZWUvVHJlZVBhcmFtc1wiO1xyXG5pbXBvcnQge0V2ZW50UnVsZVBhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL0V2ZW50UnVsZVBhcmFtc1wiO1xyXG5cclxuZGVjbGFyZSB2YXIgcG9wdXBIdG1sOiBhbnksIGFuZ3VsYXI6IGFueTtcclxuXHJcblxyXG5jbGFzcyBFdmVudFJ1bGVDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnJHRpbWVvdXQnLCAnJHN0YXRlJywgJ2FyZWFTZXJ2aWNlJywgJ2xheWVyJywgJ2kxOG5GYWN0b3J5JywgJ2V2ZW50UnVsZVNlcnZpY2UnXTtcclxuICAgIGFyZWFUcmVlRGF0YVBhcmFtczogVHJlZURhdGFQYXJhbXM8QXJlYUV4PjtcclxuICAgIHRyZWVTZWFyY2hJbnB1dDogc3RyaW5nO1xyXG4gICAgY3VycmVudEFyZWE6IEFyZWE7XHJcbiAgICB0YWJsZUxpc3RQYXJhbXM6IEV2ZW50UnVsZVBhcmFtcyA9IG5ldyBFdmVudFJ1bGVQYXJhbXMoKTtcclxuICAgIHBhZ2VQYXJhbXM6IFBhZ2VQYXJhbXMgPSBuZXcgUGFnZVBhcmFtcygpO1xyXG4gICAgY3VycmVudExheWVySW5kZXg6IG51bWJlcjtcclxuICAgIHRIZWFkTGlzdDogQXJyYXk8SVRhYmxlSGVhZGVyPjtcclxuICAgIHRCb2R5TGlzdDogQXJyYXk8RXZlbnRSdWxlRXg+ID0gW107XHJcbiAgICAvL+WkmumAieebuOWFs1xyXG4gICAgc2VsZWN0ZWRMaXN0OkFycmF5PGJvb2xlYW4+O1xyXG4gICAgaXNTZWxlY3RBbGw6Ym9vbGVhbjtcclxuICAgIC8vIGFsdGVyIHd5cjog55So5LqO5Yik5pat5b2T5YmN55WM6Z2i5LiK55qE5YiX6KGo5piv5ZCm6KKr6YCJ5LitXHJcbiAgICBpc1NlbGVjdEl0ZW1zOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICRzdGF0ZTogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhcmVhU2VydmljZTogSUFyZWFTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsYXllcjogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBpMThuRmFjdG9yeTogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBldmVudFJ1bGVTZXJ2aWNlOiBJRXZlbnRSdWxlU2VydmljZSwpIHtcclxuICAgICAgICB0aGlzLmlzU2VsZWN0SXRlbXMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmluaXRBcmVhVHJlZVBhcmFtcygpO1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbignY2xvc2UuZXZlbnRSdWxlLnBvcHVwJywgKGV2ZW50OiBhbnksIGlzRnJlc2g6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZSh0aGlzLmN1cnJlbnRMYXllckluZGV4KTtcclxuICAgICAgICAgICAgaWYgKGlzRnJlc2gpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGFibGVMaXN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGluaXRBcmVhVHJlZVBhcmFtcygpIHtcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YVBhcmFtcyA9IG5ldyBUcmVlRGF0YVBhcmFtczxBcmVhRXg+KCk7XHJcbiAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFQYXJhbXMudHJlZUlkID0gJ2FyZWFUcmVlQXJlYSc7XHJcbiAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFQYXJhbXMuaXNEZWZhdWx0U2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhUGFyYW1zLm9uQ2xpY2sgPSAoZXZlbnQ6IE1vdXNlRXZlbnQsIHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZTogQXJlYSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRhYmxlTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMudGFibGVMaXN0UGFyYW1zLkFyZWFJRCA9IHRyZWVOb2RlLklEO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRBcmVhID0gdHJlZU5vZGU7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0VGFibGVMaXN0KCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmluaXRBcmVhVHJlZURhdGEoKTtcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YVBhcmFtcy50cmVlSW5pdENvbXBsZXRlID0gKHRyZWVJZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnRIZWFkTGlzdCA9IFtcclxuICAgICAgICAgICAge2ZpZWxkOiBcIk5hbWVcIiwgdGl0bGU6IFwi5ZCN56ewXCJ9LFxyXG4gICAgICAgICAgICB7ZmllbGQ6IFwiQ3JlYXRlVGltZVwiLCB0aXRsZTogXCLliJvlu7rml7bpl7RcIn0sXHJcbiAgICAgICAgICAgIHtmaWVsZDogXCJEZXNjcmlwdGlvblwiLCB0aXRsZTogXCLmj4/ov7BcIn0sXHJcbiAgICAgICAgICAgIHtmaWVsZDogXCJib3R0b21zXCIsIHRpdGxlOiBcIuaTjeS9nFwifVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbi8qKlxyXG4gICAgICog6YCJ5oup5p+Q5LiA5p2h5pWw5o2uXHJcbiAgICAgKiBAdGltZTogMjAxNy0wNC0yMSAxOTo0MzowN1xyXG4gICAgICogQHBhcmFtczpcclxuICAgICAqIEByZXR1cm46XHJcbiAgICAgKi9cclxuICAgIGFmdGVyQ2hhbmdlQ2hlY2socmVzdWx0TGlzdDpBcnJheTxib29sZWFuPixpc0NoZWNrQWxsOmJvb2xlYW4pOnZvaWR7XHJcbiAgICAgICAgdGhpcy5zZXRJc1NlbGVjdEl0ZW1zKHJlc3VsdExpc3QpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0ID0gcmVzdWx0TGlzdDtcclxuICAgICAgICB0aGlzLmlzU2VsZWN0QWxsID0gaXNDaGVja0FsbDtcclxuICAgIH07XHJcblxyXG4gICAgc29ydEJ5RmllbGQoX2luZGV4Om51bWJlcixmaWVsZDpzdHJpbmcsc29ydFN0YXR1czpib29sZWFuKXtcclxuXHJcbiAgICAgICAgdGhpcy50YWJsZUxpc3RQYXJhbXMuaXNBc2MgPSBzb3J0U3RhdHVzO1xyXG4gICAgICAgIHRoaXMudGFibGVMaXN0UGFyYW1zLnNvcnROYW1lID0gZmllbGQ7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0VGFibGVMaXN0KCk7XHJcbiAgICAgICAgdGhpcy50SGVhZExpc3RbX2luZGV4XS5pc0FzYyA9IHNvcnRTdGF0dXM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0b3IgempoOiDliKTmlq3lkozorr7nva7lvZPliY3liJfooajmmK/lkKbmnInpgInkuK3nmoTlhYPntKBcclxuICAgICAqIEBwYXJhbSBpdGVtc1xyXG4gICAgICovXHJcbiAgICBzZXRJc1NlbGVjdEl0ZW1zKGl0ZW1zOiBBcnJheTxib29sZWFuPil7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgIGlmKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBsZXQgaSxsZW47XHJcbiAgICAgICAgICAgIGZvcihpPTAsbGVuPWl0ZW1zLmxlbmd0aDtpPGxlbjtpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoaXRlbXNbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5pc1NlbGVjdEl0ZW1zICE9PSByZXN1bHQpe1xyXG4gICAgICAgICAgICB0aGlzLmlzU2VsZWN0SXRlbXMgPSByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0VGFibGVMaXN0KCkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRSdWxlU2VydmljZS5maW5kRXZlbnRSdWxlTGlzdEJ5UGFnZSh0aGlzLnRhYmxlTGlzdFBhcmFtcykudGhlbigocmVzOiBCYWNrUmVzcG9uc2VCb2R5PFBhZ2VSZXN1bHQ8RXZlbnRSdWxlRXg+PikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50Qm9keUxpc3QgPSByZXMuZGF0YS5SZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2VQYXJhbXMuY3VycmVudFBhZ2UgPSB0aGlzLnRhYmxlTGlzdFBhcmFtcy5jdXJyZW50UGFnZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZVBhcmFtcy5wYWdlU2l6ZSA9IHRoaXMudGFibGVMaXN0UGFyYW1zLnBhZ2VTaXplID8gdGhpcy50YWJsZUxpc3RQYXJhbXMucGFnZVNpemUgOiAxMDtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZVBhcmFtcy50b3RhbENvdW50ID0gcmVzLmRhdGEuVG90YWxDb3VudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNlYXJjaFdpdGhQYXJhbXMoKSB7XHJcbiAgICAgICAgdGhpcy50YWJsZUxpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMuZ2V0VGFibGVMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEFyZWFUcmVlRGF0YSgpIHtcclxuICAgICAgICB0aGlzLmFyZWFTZXJ2aWNlLmZpbmRMaXN0VHJlZSh7a2V5d29yZDogdGhpcy50cmVlU2VhcmNoSW5wdXR9IGFzIFRyZWVQYXJhbXMpLnRoZW4oKHJlczogQXJyYXk8QXJlYUV4PikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YVBhcmFtcy50cmVlRGF0YXMgPSByZXM7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBlZGl0RXZlbnRSdWxlKGl0ZW06IEV2ZW50UnVsZUV4KSB7XHJcbiAgICAgICAgdGhpcy5vcGVuRXZlbnRSdWxlUG9wdXAoZmFsc2UsIGl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW5FdmVudFJ1bGVQb3B1cChpc0FkZDogYm9vbGVhbiwgaXRlbT86IEV2ZW50UnVsZUV4KSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IHR5cGU6IHN0cmluZywgQXJlYUlEOiBzdHJpbmcsIGV2ZW50UnVsZTogRXZlbnRSdWxlRXgsICRkZXN0cm95OiBGdW5jdGlvbiB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLnR5cGUgPSBpc0FkZCA/ICdBZGQnIDogJ1VwZGF0ZSc7XHJcbiAgICAgICAgc2NvcGUuZXZlbnRSdWxlID0gaXRlbTtcclxuICAgICAgICBzY29wZS5BcmVhSUQgPSB0aGlzLmN1cnJlbnRBcmVhLklEO1xyXG4gICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBjb250ZW50OiBwb3B1cEh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgdGl0bGU6IGlzQWRkID8gJ+aWsOWinuiBlOWKqOetlueVpScgOiAn57yW6L6R6IGU5Yqo562W55WlJyxcclxuICAgICAgICAgICAgYXJlYTogW1wiODAwcHhcIiwgXCI4MDBweFwiXSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VQYWdlKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy50YWJsZUxpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSBudW07XHJcbiAgICAgICAgdGhpcy5nZXRUYWJsZUxpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VQYWdlU2l6ZShudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMudGFibGVMaXN0UGFyYW1zLnBhZ2VTaXplID0gbnVtO1xyXG4gICAgICAgIHRoaXMudGFibGVMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICB0aGlzLmdldFRhYmxlTGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZUV2ZW50UnVsZShpdGVtOiBFdmVudFJ1bGVFeCkge1xyXG4gICAgICAgIHRoaXMubGF5ZXIuY29uZmlybShg56Gu6K6k5Yig6ZmkJHtpdGVtLk5hbWV9YCwge1xyXG4gICAgICAgICAgICBpY29uOiAwXHJcbiAgICAgICAgfSwgKGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZShpbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRSdWxlU2VydmljZS5kZWxldGVFdmVudFJ1bGUoaXRlbS5JRCkudGhlbigocmVzOiBCYWNrUmVzcG9uc2VCb2R5PGJvb2xlYW4+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCAmJiByZXMuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliKDpmaTmiJDlip8nLCBpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRhYmxlTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8v5aSa5Liq5Yig6Zmkbm9kZVxyXG4gICAgZGVsZXRlQnlJZHMoKXtcclxuICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICBsZXQgc2VsZWN0ZWREYXRhTGlzdDpBcnJheTxFdmVudFJ1bGVFeD4gPSB0aGlzLmdldFNlbGVjdGVkTGlzdCgpO1xyXG4gICAgICAgIGlmKCFzZWxlY3RlZERhdGFMaXN0IHx8IHNlbGVjdGVkRGF0YUxpc3QubGVuZ3RoID09MCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlkczpBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG4gICAgICAgIHNlbGVjdGVkRGF0YUxpc3QuZm9yRWFjaCgoc2VydmVyOkV2ZW50UnVsZUV4KT0+e1xyXG4gICAgICAgICAgICBpZHMucHVzaChzZXJ2ZXIuSUQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBzaG93VGV4dCA9ICfnoa7lrprliKDpmaTlvZPliY3pgInkuK3nmoQgJyArIGlkcy5sZW5ndGggKyAnIOadoeiBlOWKqOmihOahiOWQlz8nO1xyXG4gICAgICAgIHRoaXMubGF5ZXIuY29uZmlybShzaG93VGV4dCwge1xyXG4gICAgICAgICAgICBpY29uOiAwLFxyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5pMThuRmFjdG9yeSgnRFBfQ09ORklHX0NPTU1PTl80MicpLFxyXG4gICAgICAgICAgICBhcmVhOltcIjUwMHB4XCIsXCIyMDBweFwiXVxyXG4gICAgICAgIH0sKGluZGV4OiBudW1iZXIpPT57XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuY2xvc2UoaW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLnN1Ym1pdERlbGV0ZUJ5SWRzKGlkcyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN1Ym1pdERlbGV0ZUJ5SWRzKGlkczpBcnJheTxzdHJpbmc+KXtcclxuICAgICAgICB0aGlzLmV2ZW50UnVsZVNlcnZpY2UuZGVsZXRlQnlJZHMoaWRzKS50aGVuKChyZXNwOlJlc3BvbnNlUmVzdWx0PHN0cmluZz4pPT57XHJcbiAgICAgICAgICAgIGlmKHJlc3AuY29kZSA9PSAyMDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlUGFyYW1zLmN1cnJlbnRQYWdlID0xO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRUYWJsZUxpc3QoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8v6I635Y+W5b2T5YmN5bey6KKr6YCJ5Lit5YiX6KGoXHJcbiAgICBnZXRTZWxlY3RlZExpc3QoKTpBcnJheTxFdmVudFJ1bGVFeD57XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkRGF0YUxpc3Q6QXJyYXk8RXZlbnRSdWxlRXg+ID0gW107XHJcbiAgICAgICAgaWYodGhpcy5zZWxlY3RlZExpc3Qpe1xyXG4gICAgICAgICAgICB0aGlzLnRCb2R5TGlzdC5mb3JFYWNoKChkYXRhOkV2ZW50UnVsZUV4LGluZGV4Om51bWJlcik9PntcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2VsZWN0ZWRMaXN0W2luZGV4XSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWREYXRhTGlzdC5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkRGF0YUxpc3Q7XHJcbiAgICB9O1xyXG5cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ2Jhc2VDb25maWdFdmVudFJ1bGVDb250cm9sbGVyJywgRXZlbnRSdWxlQ29udHJvbGxlcik7XHJcblxyXG4iXX0=
