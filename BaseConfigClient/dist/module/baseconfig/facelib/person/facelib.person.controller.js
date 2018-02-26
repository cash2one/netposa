define(["require", "exports", "text!../../../common/faceLibPersonUpdateModal/faceLibPersonUpdate.modal.html", "../../../common/app/main.app", "../../../common/directive/page/page-params", "../../../../core/entity/BusinessLib", "../../../../core/params/BusinessLibParams", "../../../common/faceLibUpdateModal/faceLibUpdateModal.factory", "../../../common/system-config", "angular", "css!../../css/baseconfig-faceLib-person.css", "../../../common/services/businessLib.service", "../../../common/services/businessLibPerson.service", "../businessLibPerson.factory", "../../../common/faceLibPersonUpdateModal/faceLibPersonUpdate.modal.controller"], function (require, exports, faceLibPersonUpdateModalHtml, main_app_1, page_params_1, BusinessLib_1, BusinessLibParams_1, faceLibUpdateModal_factory_1, system_config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FaceLibPersonController = (function () {
        function FaceLibPersonController($scope, $stateParams, $state, i18nFactory, businessLibPersonFactory, faceLibUpdateModalFactory, layer, businessLibService, businessLibPersonService) {
            var _this = this;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.$state = $state;
            this.i18nFactory = i18nFactory;
            this.businessLibPersonFactory = businessLibPersonFactory;
            this.faceLibUpdateModalFactory = faceLibUpdateModalFactory;
            this.layer = layer;
            this.businessLibService = businessLibService;
            this.businessLibPersonService = businessLibPersonService;
            this.tableNoData = false;
            this.dataTotal = 0;
            this.isLoading = false;
            this.constLibItem = system_config_1.SystemConfig.CONST_LIB;
            if (this.businessLibPersonFactory.getCurrentFaceLib()) {
                this.initCurrentParams(this.businessLibPersonFactory.getCurrentFaceLib());
                this.getListByParams(this.findListParams);
            }
            if (this.businessLibPersonFactory.getIsOpenModal()) {
                this.openUpdatePersonModel(false);
            }
            this.watchUpdatePersonModalName = "fromUpdatePerson.closeLayer";
            this.$scope.$on(this.watchUpdatePersonModalName, function (even, data) {
                console.log(_this.watchUpdatePersonModalName + "广播接收", data);
                if (data.isCommit) {
                    window.setTimeout(function () {
                        _this.getListByParams(_this.findListParams);
                    }, 1000);
                }
                console.log(_this.layer);
                _this.layer.close(_this.updatePersonLayerIndex);
            });
            this.watchUpdateLibModalName = this.faceLibUpdateModalFactory.getModalClosedWatchName();
            this.$scope.$on(this.watchUpdateLibModalName, function (even, data) {
                console.log("watchUpdateLibModalName 广播接收", data);
                if (data.isCommit) {
                    _this.updateCurrentLib(data.modelData);
                }
                console.log(_this.layer);
                _this.layer.close(_this.updateLibLayerIndex);
                _this.updateLibLayerIndex = 0;
            });
            this.$scope.$on("fromUpdateFaceLibPersonModal.closed", function (even, data) {
                _this.layer.close(_this.addPersonImageIndex);
            });
            this.$scope.$on("$destroy", function () {
                _this.businessLibPersonFactory.clearFactoryCache();
            });
        }
        FaceLibPersonController.prototype.initCurrentParams = function (currentLib) {
            this.pageParams = new page_params_1.default;
            this.findListParams = new BusinessLibParams_1.BusinessLibPersonListParams();
            this.findListParams.currentPage = this.pageParams.currentPage;
            this.findListParams.pageSize = this.pageParams.pageSize;
            this.findListParams.arrLibId = [];
            this.findListParams.arrLibId[0] = currentLib.ID;
            this.currentLib = new BusinessLib_1.BusinessLib();
            this.currentLib = currentLib;
        };
        FaceLibPersonController.prototype.updateCurrentLib = function (currentLib) {
            this.currentLib = currentLib;
        };
        FaceLibPersonController.prototype.getListByParams = function (params) {
            var _this = this;
            this.businessLibPersonService.findListByParams(params).then(function (resp) {
                _this.findListParams = params;
                if (resp.code == 200 && resp.data) {
                    _this.setTableBody(resp.data.Result, resp.count);
                }
                else {
                    _this.setTableBody([], 0);
                }
            });
        };
        ;
        FaceLibPersonController.prototype.setTableBody = function (dataList, total) {
            var _this = this;
            this.dataTotal = total;
            if (dataList && dataList.length > 0) {
                this.tBodyList = dataList;
                this.tableNoData = false;
                var _pageParams = new page_params_1.default();
                _pageParams.currentPage = this.findListParams.currentPage;
                _pageParams.pageSize = this.findListParams.pageSize;
                _pageParams.setTotalCount(total);
                this.pageParams = _pageParams;
            }
            else {
                this.tBodyList = [];
                this.tableNoData = true;
            }
            this.selectedList = [];
            this.tBodyList.forEach(function () {
                _this.selectedList.push(false);
            });
            this.isSelectNone = true;
        };
        FaceLibPersonController.prototype.detailShow = function (data) {
            var _this = this;
            console.log(data);
            console.log(this.currentLib);
            var scope = this.$scope.$new();
            scope.updateModal = data;
            scope.isUpdate = true;
            scope.libId = this.currentLib.ID;
            this.addPersonImageIndex = this.layer.open({
                type: 1,
                content: faceLibPersonUpdateModalHtml,
                scope: scope,
                skin: "overflow-visible",
                title: this.i18nFactory('FDS_01_06_62'),
                area: ["auto", "auto"],
                end: function () {
                    scope.$destroy();
                },
                success: function (params1, index) {
                    _this.updatePersonLayerIndex = index;
                },
            });
        };
        FaceLibPersonController.prototype.deleteById = function (data) {
            var _this = this;
            var str = this.i18nFactory("FDS_00_04_02");
            this.layer.confirm(str, {
                icon: 0,
                title: this.i18nFactory("FDS_00_05_04"),
                area: ["500px", "200px"]
            }, function (index) {
                _this.layer.close(index);
                _this.submitDelete(data.ID);
            });
        };
        ;
        FaceLibPersonController.prototype.submitDelete = function (id) {
            var _this = this;
            console.log("当前选择ID " + id);
            this.businessLibPersonService.deleteById(id).then(function (resp) {
                if (resp.code == 200) {
                    _this.getListByParams(_this.findListParams);
                }
                _this.isLoading = false;
            });
        };
        FaceLibPersonController.prototype.deleteByIds = function () {
            var _this = this;
            var ids = [];
            angular.forEach(this.selectedList, function (val, index) {
                if (val && _this.tBodyList[index].ID) {
                    ids.push(_this.tBodyList[index].ID);
                }
            });
            console.log("当前选择ID " + ids);
            if (ids.length > 0) {
                var showText = this.i18nFactory("FDS_00_04_03", { value: ids.length });
                this.layer.confirm(showText, {
                    icon: 0,
                    title: this.i18nFactory("FDS_00_05_04"),
                    area: ["500px", "200px"]
                }, function (index) {
                    _this.layer.close(index);
                    _this.submitDeleteByIds(ids);
                });
            }
            else {
                console.log("未选择、。。。。。。。。。。。。");
            }
        };
        ;
        FaceLibPersonController.prototype.submitDeleteByIds = function (ids) {
            var _this = this;
            console.log("当前选择ID " + ids);
            this.businessLibPersonService.deleteByIds(ids).then(function (resp) {
                if (resp.code == 200) {
                    _this.getListByParams(_this.findListParams);
                }
                _this.isLoading = false;
            });
        };
        FaceLibPersonController.prototype.update = function (data) {
            this.openUpdatePersonModel(true, data);
        };
        FaceLibPersonController.prototype.openUpdatePersonModel = function (isUpdate, data) {
            var _this = this;
            var titleStr = isUpdate ? this.i18nFactory('FDS_01_06_62') : this.i18nFactory('FDS_01_06_61');
            var scope = this.$scope.$new();
            scope.emitName = this.watchUpdatePersonModalName;
            if (isUpdate) {
                scope.isUpdate = true;
                scope.updateModal = data;
            }
            else {
                scope.libId = this.currentLib.ID;
            }
            this.addPersonImageIndex = this.layer.open({
                type: 1,
                content: faceLibPersonUpdateModalHtml,
                scope: scope,
                skin: "overflow-visible",
                title: titleStr,
                area: ["auto", "auto"],
                end: function () {
                    scope.$destroy();
                },
                success: function (params1, index) {
                    _this.updatePersonLayerIndex = index;
                },
            });
        };
        ;
        FaceLibPersonController.prototype.updateFaceLib = function () {
            var _this = this;
            this.businessLibService.findById(this.currentLib.ID).then(function (resp) {
                if (resp && resp.code == 200) {
                    _this.openUpdateLibModel(resp.data);
                }
            });
        };
        FaceLibPersonController.prototype.imagePathFilter = function (facePicPath) {
            console.debug("imagePathFilter", facePicPath);
            var result = "";
            if (facePicPath && facePicPath.length > 0) {
                result = "/bimg_content/" + facePicPath[0];
            }
            return result;
        };
        FaceLibPersonController.prototype.openUpdateLibModel = function (updateData) {
            var _this = this;
            var scope = this.$scope.$new();
            var updateParams = new faceLibUpdateModal_factory_1.FaceUpdateParams();
            updateParams.isUpdate = true;
            updateParams.updateModalData = updateData;
            updateParams.parentID = updateData.ParentID;
            var titleStr = this.i18nFactory('FDS_01_06_20');
            this.faceLibUpdateModalFactory.setUpdateParams(updateParams);
            var htmlStr = this.faceLibUpdateModalFactory.getModalHtml();
            this.layer.open({
                type: 1,
                title: titleStr,
                content: htmlStr,
                skin: "overflow-visible",
                scope: scope,
                area: ["auto", "auto"],
                success: function (layero, index) {
                    _this.updateLibLayerIndex = index;
                },
                end: function () {
                    console.debug("编辑人脸库框体关闭!");
                    scope.$destroy();
                }
            });
        };
        ;
        FaceLibPersonController.prototype.goBackToFaceLibView = function () {
            this.$state.go("baseconfig.facelib.library", { reload: true });
        };
        ;
        FaceLibPersonController.prototype.changeSelected = function (_index) {
            this.selectedList[_index] = !this.selectedList[_index];
            for (var i = 0; i < this.selectedList.length; i++) {
                if (this.selectedList[i]) {
                    this.isSelectNone = false;
                    return;
                }
            }
            this.isSelectNone = true;
        };
        ;
        FaceLibPersonController.prototype.goPrevPage = function (num) {
            this.findListParams.currentPage = num;
            this.getListByParams(this.findListParams);
        };
        FaceLibPersonController.prototype.goNextPage = function (num) {
            this.findListParams.currentPage = num;
            this.getListByParams(this.findListParams);
        };
        FaceLibPersonController.prototype.goPage = function (num) {
            this.findListParams.currentPage = num;
            this.getListByParams(this.findListParams);
        };
        FaceLibPersonController.prototype.changePageSize = function (num) {
            this.findListParams.currentPage = 1;
            this.findListParams.pageSize = num;
            this.getListByParams(this.findListParams);
        };
        FaceLibPersonController.$inject = ['$scope', '$stateParams', "$state",
            'i18nFactory',
            'businessLibPersonFactory',
            'faceLibUpdateModalFactory',
            'layer',
            'businessLibService',
            'businessLibPersonService'];
        return FaceLibPersonController;
    }());
    main_app_1.app.controller("bcFaceLibPersonController", FaceLibPersonController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9mYWNlbGliL3BlcnNvbi9mYWNlbGliLnBlcnNvbi5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWdDQTtRQW1DSSxpQ0FBb0IsTUFBVyxFQUFVLFlBQXlCLEVBQVUsTUFBVyxFQUMzRSxXQUFnQixFQUNoQix3QkFBbUQsRUFDbkQseUJBQXFELEVBQ3JELEtBQVUsRUFDVixrQkFBdUMsRUFDdkMsd0JBQW1EO1lBTi9ELGlCQWtEQztZQWxEbUIsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFhO1lBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUMzRSxnQkFBVyxHQUFYLFdBQVcsQ0FBSztZQUNoQiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTJCO1lBQ25ELDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBNEI7WUFDckQsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUNWLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBcUI7WUFDdkMsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEyQjtZQXhCL0QsZ0JBQVcsR0FBWSxLQUFLLENBQUM7WUFNN0IsY0FBUyxHQUFXLENBQUMsQ0FBQztZQUN0QixjQUFTLEdBQVksS0FBSyxDQUFDO1lBbUJ2QixJQUFJLENBQUMsWUFBWSxHQUFHLDRCQUFZLENBQUMsU0FBUyxDQUFDO1lBRTNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDcEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7Z0JBQzFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzlDLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsY0FBYyxFQUFFLENBQUMs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QztZQUN0QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM5QyxDQUFDO1FBQ0Qsd0NBQU0sR0FBTixVQUFPLEdBQVc7WUFDZCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7WUFDdEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUNELGdEQUFjLEdBQWQsVUFBZSxHQUFXO1lBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7WUFDbkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQXZUTSwrQkFBTyxHQUFHLENBQUMsUUFBUSxFQUFFLGNBQWMsRUFBRSxRQUFRO1lBQ2hELGFBQWE7WUFDYiwwQkFBMEI7WUFDMUIsMkJBQTJCO1lBQzNCLE9BQU87WUFDUCxvQkFBb0I7WUFDcEIsMEJBQTBCLENBQUMsQ0FBQztRQWtUcEMsOEJBQUM7S0FwVkQsQUFvVkMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsMkJBQTJCLEVBQUUsdUJBQXVCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvYmFzZWNvbmZpZy9mYWNlbGliL3BlcnNvbi9mYWNlbGliLnBlcnNvbi5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi8uLi8uLi9jb21tb24vZmFjZUxpYlBlcnNvblVwZGF0ZU1vZGFsL2ZhY2VMaWJQZXJzb25VcGRhdGUubW9kYWwuaHRtbFwiIG5hbWU9XCJmYWNlTGliUGVyc29uVXBkYXRlTW9kYWxIdG1sXCIgLz5cclxuXHJcbmltcG9ydCB7IGFwcCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCBcImFuZ3VsYXJcIjtcclxuaW1wb3J0IFwiY3NzIS4uLy4uL2Nzcy9iYXNlY29uZmlnLWZhY2VMaWItcGVyc29uLmNzc1wiO1xyXG5cclxuaW1wb3J0IFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL2J1c2luZXNzTGliLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL2J1c2luZXNzTGliUGVyc29uLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQnVzaW5lc3NQZXJzb24sIElCdXNpbmVzc1BlcnNvbiB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudGl0eS9CdXNpbmVzc1BlcnNvblwiO1xyXG5pbXBvcnQgUGFnZVBhcmFtcyBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS9wYWdlL3BhZ2UtcGFyYW1zXCI7XHJcbmltcG9ydCB7IEJ1c2luZXNzTGliIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW50aXR5L0J1c2luZXNzTGliXCI7XHJcbmltcG9ydCB7IEJ1c2luZXNzTGliUGVyc29uTGlzdFBhcmFtcyB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3BhcmFtcy9CdXNpbmVzc0xpYlBhcmFtc1wiO1xyXG5cclxuaW1wb3J0IHsgSUJ1c2luZXNzTGliUGVyc29uU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvYnVzaW5lc3NMaWJQZXJzb24uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBSZXNwb25zZVJlc3VsdCwgUGFnZVJlc3VsdCB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHsgSUJ1c2luZXNzTGliU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvYnVzaW5lc3NMaWIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBCdXNpbmVzc0xpYkV4IH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0J1c2luZXNzTGliRXhcIjtcclxuaW1wb3J0IHtcclxuICAgIElGYWNlTGliVXBkYXRlTW9kYWxGYWN0b3J5LFxyXG4gICAgRmFjZVVwZGF0ZVBhcmFtc1xyXG59IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZmFjZUxpYlVwZGF0ZU1vZGFsL2ZhY2VMaWJVcGRhdGVNb2RhbC5mYWN0b3J5XCI7XHJcblxyXG5pbXBvcnQgXCIuLi9idXNpbmVzc0xpYlBlcnNvbi5mYWN0b3J5XCI7XHJcbmltcG9ydCB7IElCdXNpbmVzc0xpYlBlcnNvbkZhY3RvcnkgfSBmcm9tIFwiLi4vYnVzaW5lc3NMaWJQZXJzb24uZmFjdG9yeVwiO1xyXG5cclxuaW1wb3J0IFwiLi4vLi4vLi4vY29tbW9uL2ZhY2VMaWJQZXJzb25VcGRhdGVNb2RhbC9mYWNlTGliUGVyc29uVXBkYXRlLm1vZGFsLmNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHsgVXBkYXRlRmFjZUxpYlBlcnNvbk1vZGFsUGFyYW1zIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9mYWNlTGliUGVyc29uVXBkYXRlTW9kYWwvZmFjZUxpYlBlcnNvblVwZGF0ZS5tb2RhbC5jb250cm9sbGVyXCI7XHJcbmltcG9ydCB7IFN5c3RlbUNvbmZpZyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vc3lzdGVtLWNvbmZpZ1wiO1xyXG5cclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuZGVjbGFyZSBsZXQgZmFjZUxpYlBlcnNvblVwZGF0ZU1vZGFsSHRtbDogYW55O1xyXG5jbGFzcyBGYWNlTGliUGVyc29uQ29udHJvbGxlciB7XHJcbiAgICAvLyDkuI3lhYHorrjkv67mlLnlupNJRO+8m1xyXG4gICAgY29uc3RMaWJJdGVtOiBzdHJpbmc7XHJcbiAgICBmaW5kTGlzdFBhcmFtczogQnVzaW5lc3NMaWJQZXJzb25MaXN0UGFyYW1zO1xyXG5cclxuICAgIHBhZ2VQYXJhbXM6IFBhZ2VQYXJhbXM7XHJcbiAgICAvLyB0YWJsZSDliJfooajmlbDmja5cclxuICAgIC8vICAgdEhlYWRMaXN0OkFycmF5PElUYWJsZUhlYWRlcj47XHJcbiAgICB0Qm9keUxpc3Q6IEFycmF5PEJ1c2luZXNzUGVyc29uPjtcclxuICAgIC8v57yW6L6R56qX5Y+jIOW5v+aSreOAgeaOpeaUtuWQjeensFxyXG4gICAgd2F0Y2hVcGRhdGVQZXJzb25Nb2RhbE5hbWU6IHN0cmluZztcclxuICAgIHVwZGF0ZVBlcnNvbkxheWVySW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICB3YXRjaFVwZGF0ZUxpYk1vZGFsTmFtZTogc3RyaW5nO1xyXG4gICAgdXBkYXRlTGliTGF5ZXJJbmRleDogbnVtYmVyO1xyXG5cclxuICAgIGN1cnJlbnRMaWI6IEJ1c2luZXNzTGliO1xyXG4gICAgdGFibGVOb0RhdGE6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAvL+WkmumAieebuOWFs1xyXG4gICAgc2VsZWN0ZWRMaXN0OiBBcnJheTxib29sZWFuPjtcclxuICAgIGlzU2VsZWN0Tm9uZTogYm9vbGVhbjtcclxuXHJcbiAgICBkYXRhVG90YWw6IG51bWJlciA9IDA7XHJcbiAgICBpc0xvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBhZGRQZXJzb25JbWFnZUluZGV4OiBudW1iZXI7XHJcblxyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsICckc3RhdGVQYXJhbXMnLCBcIiRzdGF0ZVwiLFxyXG4gICAgICAgICdpMThuRmFjdG9yeScsXHJcbiAgICAgICAgJ2J1c2luZXNzTGliUGVyc29uRmFjdG9yeScsXHJcbiAgICAgICAgJ2ZhY2VMaWJVcGRhdGVNb2RhbEZhY3RvcnknLFxyXG4gICAgICAgICdsYXllcicsXHJcbiAgICAgICAgJ2J1c2luZXNzTGliU2VydmljZScsXHJcbiAgICAgICAgJ2J1c2luZXNzTGliUGVyc29uU2VydmljZSddO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSwgcHJpdmF0ZSAkc3RhdGVQYXJhbXM6IEJ1c2luZXNzTGliLCBwcml2YXRlICRzdGF0ZTogYW55LFxyXG4gICAgICAgIHByaXZhdGUgaTE4bkZhY3Rvcnk6IGFueSxcclxuICAgICAgICBwcml2YXRlIGJ1c2luZXNzTGliUGVyc29uRmFjdG9yeTogSUJ1c2luZXNzTGliUGVyc29uRmFjdG9yeSxcclxuICAgICAgICBwcml2YXRlIGZhY2VMaWJVcGRhdGVNb2RhbEZhY3Rvcnk6IElGYWNlTGliVXBkYXRlTW9kYWxGYWN0b3J5LFxyXG4gICAgICAgIHByaXZhdGUgbGF5ZXI6IGFueSxcclxuICAgICAgICBwcml2YXRlIGJ1c2luZXNzTGliU2VydmljZTogSUJ1c2luZXNzTGliU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGJ1c2luZXNzTGliUGVyc29uU2VydmljZTogSUJ1c2luZXNzTGliUGVyc29uU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5jb25zdExpYkl0ZW0gPSBTeXN0ZW1Db25maWcuQ09OU1RfTElCO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5idXNpbmVzc0xpYlBlcnNvbkZhY3RvcnkuZ2V0Q3VycmVudEZhY2VMaWIoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRDdXJyZW50UGFyYW1zKHRoaXMuYnVzaW5lc3NMaWJQZXJzb25GYWN0b3J5LmdldEN1cnJlbnRGYWNlTGliKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmdldExpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmJ1c2luZXNzTGliUGVyc29uRmFjdG9yeS5nZXRJc09wZW5Nb2RhbCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3BlblVwZGF0ZVBlcnNvbk1vZGVsKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy53YXRjaFVwZGF0ZVBlcnNvbk1vZGFsTmFtZSA9IFwiZnJvbVVwZGF0ZVBlcnNvbi5jbG9zZUxheWVyXCI7XHJcblxyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbih0aGlzLndhdGNoVXBkYXRlUGVyc29uTW9kYWxOYW1lLCAoZXZlbjogRXZlbnQsIGRhdGE6IHsgaXNDb21taXQ6IGJvb2xlYW4gfSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLndhdGNoVXBkYXRlUGVyc29uTW9kYWxOYW1lICsgXCLlub/mkq3mjqXmlLZcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmlzQ29tbWl0KSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubGF5ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKHRoaXMudXBkYXRlUGVyc29uTGF5ZXJJbmRleCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMud2F0Y2hVcGRhdGVMaWJNb2RhbE5hbWUgPSB0aGlzLmZhY2VMaWJVcGRhdGVNb2RhbEZhY3RvcnkuZ2V0TW9kYWxDbG9zZWRXYXRjaE5hbWUoKTtcclxuICAgICAgICB0aGlzLiRzY29wZS4kb24odGhpcy53YXRjaFVwZGF0ZUxpYk1vZGFsTmFtZSwgKGV2ZW46IEV2ZW50LCBkYXRhOiB7IGlzQ29tbWl0OiBib29sZWFuLCBpc0FkZDogYm9vbGVhbiwgbW9kZWxEYXRhOiBCdXNpbmVzc0xpYkV4IH0pID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3YXRjaFVwZGF0ZUxpYk1vZGFsTmFtZSDlub/mkq3mjqXmlLZcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmlzQ29tbWl0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUN1cnJlbnRMaWIoZGF0YS5tb2RlbERhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubGF5ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKHRoaXMudXBkYXRlTGliTGF5ZXJJbmRleCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUxpYkxheWVySW5kZXggPSAwO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLiRzY29wZS4kb24oXCJmcm9tVXBkYXRlRmFjZUxpYlBlcnNvbk1vZGFsLmNsb3NlZFwiLCAoZXZlbjogRXZlbnQsIGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKHRoaXMuYWRkUGVyc29uSW1hZ2VJbmRleClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmJ1c2luZXNzTGliUGVyc29uRmFjdG9yeS5jbGVhckZhY3RvcnlDYWNoZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpbml0Q3VycmVudFBhcmFtcyhjdXJyZW50TGliOiBCdXNpbmVzc0xpYikge1xyXG4gICAgICAgIHRoaXMucGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMgPSBuZXcgQnVzaW5lc3NMaWJQZXJzb25MaXN0UGFyYW1zKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSB0aGlzLnBhZ2VQYXJhbXMuY3VycmVudFBhZ2U7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5wYWdlU2l6ZSA9IHRoaXMucGFnZVBhcmFtcy5wYWdlU2l6ZTtcclxuXHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5hcnJMaWJJZCA9IFtdIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5hcnJMaWJJZFswXSA9IGN1cnJlbnRMaWIuSUQ7XHJcblxyXG4gICAgICAgIHRoaXMuY3VycmVudExpYiA9IG5ldyBCdXNpbmVzc0xpYigpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudExpYiA9IGN1cnJlbnRMaWI7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQ3VycmVudExpYihjdXJyZW50TGliOiBCdXNpbmVzc0xpYikge1xyXG4gICAgICAgIHRoaXMuY3VycmVudExpYiA9IGN1cnJlbnRMaWI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGlzdEJ5UGFyYW1zKHBhcmFtczogQnVzaW5lc3NMaWJQZXJzb25MaXN0UGFyYW1zKSB7XHJcbiAgICAgICAgdGhpcy5idXNpbmVzc0xpYlBlcnNvblNlcnZpY2UuZmluZExpc3RCeVBhcmFtcyhwYXJhbXMpLnRoZW4oKHJlc3A6IFJlc3BvbnNlUmVzdWx0PFBhZ2VSZXN1bHQ8SUJ1c2luZXNzUGVyc29uPj4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcyA9IHBhcmFtcztcclxuICAgICAgICAgICAgaWYgKHJlc3AuY29kZSA9PSAyMDAgJiYgcmVzcC5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRhYmxlQm9keShyZXNwLmRhdGEuUmVzdWx0LCByZXNwLmNvdW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VGFibGVCb2R5KFtdLCAwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuXHJcbiAgICBzZXRUYWJsZUJvZHkoZGF0YUxpc3Q6IEFycmF5PElCdXNpbmVzc1BlcnNvbj4sIHRvdGFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmRhdGFUb3RhbCA9IHRvdGFsO1xyXG4gICAgICAgIGlmIChkYXRhTGlzdCAmJiBkYXRhTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMudEJvZHlMaXN0ID0gZGF0YUxpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMudGFibGVOb0RhdGEgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBfcGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKCk7XHJcbiAgICAgICAgICAgIF9wYWdlUGFyYW1zLmN1cnJlbnRQYWdlID0gdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZTtcclxuICAgICAgICAgICAgX3BhZ2VQYXJhbXMucGFnZVNpemUgPSB0aGlzLmZpbmRMaXN0UGFyYW1zLnBhZ2VTaXplO1xyXG4gICAgICAgICAgICBfcGFnZVBhcmFtcy5zZXRUb3RhbENvdW50KHRvdGFsKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGFnZVBhcmFtcyA9IF9wYWdlUGFyYW1zO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudEJvZHlMaXN0ID0gW107XHJcbiAgICAgICAgICAgIHRoaXMudGFibGVOb0RhdGEgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNlbGVjdGVkTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMudEJvZHlMaXN0LmZvckVhY2goKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkTGlzdC5wdXNoKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmlzU2VsZWN0Tm9uZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZGV0YWlsU2hvdyhkYXRhOiBCdXNpbmVzc1BlcnNvbikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY3VycmVudExpYik7XHJcbiAgICAgICAgbGV0IHNjb3BlOiBVcGRhdGVGYWNlTGliUGVyc29uTW9kYWxQYXJhbXMgPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUudXBkYXRlTW9kYWwgPSBkYXRhO1xyXG4gICAgICAgIHNjb3BlLmlzVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICBzY29wZS5saWJJZCA9IHRoaXMuY3VycmVudExpYi5JRDtcclxuICAgICAgICAvLyBzY29wZS5pbWdJbmZvLmltYWdldXJsID0gZGF0YS5GYWNlUGljUGF0aFswXTtcclxuXHJcbiAgICAgICAgLy8g5omT5byA5by556qXXHJcbiAgICAgICAgdGhpcy5hZGRQZXJzb25JbWFnZUluZGV4ID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgY29udGVudDogZmFjZUxpYlBlcnNvblVwZGF0ZU1vZGFsSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICBza2luOiBcIm92ZXJmbG93LXZpc2libGVcIixcclxuICAgICAgICAgICAgdGl0bGU6IHRoaXMuaTE4bkZhY3RvcnkoJ0ZEU18wMV8wNl82MicpLFxyXG4gICAgICAgICAgICBhcmVhOiBbXCJhdXRvXCIsIFwiYXV0b1wiXSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiAocGFyYW1zMTogYW55LCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBlcnNvbkxheWVySW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVCeUlkKGRhdGE6IEJ1c2luZXNzUGVyc29uKSB7XHJcbiAgICAgICAgbGV0IHN0ciA9IHRoaXMuaTE4bkZhY3RvcnkoXCJGRFNfMDBfMDRfMDJcIik7XHJcbiAgICAgICAgdGhpcy5sYXllci5jb25maXJtKHN0ciwge1xyXG4gICAgICAgICAgICBpY29uOiAwLFxyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5pMThuRmFjdG9yeShcIkZEU18wMF8wNV8wNFwiKSxcclxuICAgICAgICAgICAgYXJlYTogW1wiNTAwcHhcIiwgXCIyMDBweFwiXVxyXG4gICAgICAgIH0sIChpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuY2xvc2UoaW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdWJtaXREZWxldGUoZGF0YS5JRCk7XHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcblxyXG4gICAgc3VibWl0RGVsZXRlKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuW9k+WJjemAieaLqUlEIFwiICsgaWQpO1xyXG4gICAgICAgIHRoaXMuYnVzaW5lc3NMaWJQZXJzb25TZXJ2aWNlLmRlbGV0ZUJ5SWQoaWQpLnRoZW4oKHJlc3A6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzcC5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBkZWxldGVCeUlkcygpIHtcclxuICAgICAgICBsZXQgaWRzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHRoaXMuc2VsZWN0ZWRMaXN0LCAodmFsOiBib29sZWFuLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2YWwgJiYgdGhpcy50Qm9keUxpc3RbaW5kZXhdLklEKSB7XHJcbiAgICAgICAgICAgICAgICBpZHMucHVzaCh0aGlzLnRCb2R5TGlzdFtpbmRleF0uSUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLlvZPliY3pgInmi6lJRCBcIiArIGlkcyk7XHJcbiAgICAgICAgaWYgKGlkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBzaG93VGV4dCA9IHRoaXMuaTE4bkZhY3RvcnkoXCJGRFNfMDBfMDRfMDNcIiwgeyB2YWx1ZTogaWRzLmxlbmd0aCB9KTtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5jb25maXJtKHNob3dUZXh0LCB7XHJcbiAgICAgICAgICAgICAgICBpY29uOiAwLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMuaTE4bkZhY3RvcnkoXCJGRFNfMDBfMDVfMDRcIiksXHJcbiAgICAgICAgICAgICAgICBhcmVhOiBbXCI1MDBweFwiLCBcIjIwMHB4XCJdXHJcbiAgICAgICAgICAgIH0sIChpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKGluZGV4KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3VibWl0RGVsZXRlQnlJZHMoaWRzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmnKrpgInmi6njgIHjgILjgILjgILjgILjgILjgILjgILjgILjgILjgILjgILjgIJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBzdWJtaXREZWxldGVCeUlkcyhpZHM6IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuW9k+WJjemAieaLqUlEIFwiICsgaWRzKTtcclxuICAgICAgICB0aGlzLmJ1c2luZXNzTGliUGVyc29uU2VydmljZS5kZWxldGVCeUlkcyhpZHMpLnRoZW4oKHJlc3A6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzcC5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkYXRhOiBCdXNpbmVzc1BlcnNvbikge1xyXG4gICAgICAgIHRoaXMub3BlblVwZGF0ZVBlcnNvbk1vZGVsKHRydWUsIGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW5VcGRhdGVQZXJzb25Nb2RlbChpc1VwZGF0ZTogYm9vbGVhbiwgZGF0YT86IEJ1c2luZXNzUGVyc29uKSB7XHJcbiAgICAgICAgbGV0IHRpdGxlU3RyID0gaXNVcGRhdGUgPyB0aGlzLmkxOG5GYWN0b3J5KCdGRFNfMDFfMDZfNjInKSA6IHRoaXMuaTE4bkZhY3RvcnkoJ0ZEU18wMV8wNl82MScpO1xyXG4gICAgICAgIGxldCBzY29wZTogVXBkYXRlRmFjZUxpYlBlcnNvbk1vZGFsUGFyYW1zID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLmVtaXROYW1lID0gdGhpcy53YXRjaFVwZGF0ZVBlcnNvbk1vZGFsTmFtZTtcclxuXHJcbiAgICAgICAgaWYgKGlzVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIHNjb3BlLmlzVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2NvcGUudXBkYXRlTW9kYWwgPSBkYXRhO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNjb3BlLmxpYklkID0gdGhpcy5jdXJyZW50TGliLklEO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g5omT5byA5by556qXXHJcbiAgICAgICAgdGhpcy5hZGRQZXJzb25JbWFnZUluZGV4ID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgY29udGVudDogZmFjZUxpYlBlcnNvblVwZGF0ZU1vZGFsSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICBza2luOiBcIm92ZXJmbG93LXZpc2libGVcIixcclxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlU3RyLFxyXG4gICAgICAgICAgICBhcmVhOiBbXCJhdXRvXCIsIFwiYXV0b1wiXSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiAocGFyYW1zMTogYW55LCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBlcnNvbkxheWVySW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdXBkYXRlRmFjZUxpYigpIHtcclxuICAgICAgICB0aGlzLmJ1c2luZXNzTGliU2VydmljZS5maW5kQnlJZCh0aGlzLmN1cnJlbnRMaWIuSUQpLnRoZW4oKHJlc3A6IFJlc3BvbnNlUmVzdWx0PEJ1c2luZXNzTGliRXg+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwICYmIHJlc3AuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3BlblVwZGF0ZUxpYk1vZGVsKHJlc3AuZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaW1hZ2VQYXRoRmlsdGVyKGZhY2VQaWNQYXRoOiBBcnJheTxzdHJpbmc+KSB7XHJcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcImltYWdlUGF0aEZpbHRlclwiLCBmYWNlUGljUGF0aCk7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XHJcbiAgICAgICAgaWYgKGZhY2VQaWNQYXRoICYmIGZhY2VQaWNQYXRoLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gXCIvYmltZ19jb250ZW50L1wiICsgZmFjZVBpY1BhdGhbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcblxyXG4gICAgfVxyXG4gICAgLy/miZPlvIDnvJbovpHlvZPliY3kurrohLjlupNcclxuICAgIG9wZW5VcGRhdGVMaWJNb2RlbCh1cGRhdGVEYXRhOiBCdXNpbmVzc0xpYkV4KSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiBhbnkgPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgbGV0IHVwZGF0ZVBhcmFtcyA9IG5ldyBGYWNlVXBkYXRlUGFyYW1zKCk7XHJcbiAgICAgICAgdXBkYXRlUGFyYW1zLmlzVXBkYXRlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdXBkYXRlUGFyYW1zLnVwZGF0ZU1vZGFsRGF0YSA9IHVwZGF0ZURhdGE7XHJcblxyXG4gICAgICAgIHVwZGF0ZVBhcmFtcy5wYXJlbnRJRCA9IHVwZGF0ZURhdGEuUGFyZW50SUQ7XHJcblxyXG4gICAgICAgIGxldCB0aXRsZVN0ciA9IHRoaXMuaTE4bkZhY3RvcnkoJ0ZEU18wMV8wNl8yMCcpO1xyXG5cclxuICAgICAgICB0aGlzLmZhY2VMaWJVcGRhdGVNb2RhbEZhY3Rvcnkuc2V0VXBkYXRlUGFyYW1zKHVwZGF0ZVBhcmFtcyk7XHJcbiAgICAgICAgbGV0IGh0bWxTdHIgPSB0aGlzLmZhY2VMaWJVcGRhdGVNb2RhbEZhY3RvcnkuZ2V0TW9kYWxIdG1sKCk7XHJcblxyXG4gICAgICAgIHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZVN0cixcclxuICAgICAgICAgICAgY29udGVudDogaHRtbFN0cixcclxuICAgICAgICAgICAgc2tpbjogXCJvdmVyZmxvdy12aXNpYmxlXCIsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgYXJlYTogW1wiYXV0b1wiLCBcImF1dG9cIl0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChsYXllcm86IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVMaWJMYXllckluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVuZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhcIue8lui+keS6uuiEuOW6k+ahhuS9k+WFs+mXrSFcIik7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgZ29CYWNrVG9GYWNlTGliVmlldygpIHtcclxuICAgICAgICB0aGlzLiRzdGF0ZS5nbyhcImJhc2Vjb25maWcuZmFjZWxpYi5saWJyYXJ5XCIsIHsgcmVsb2FkOiB0cnVlIH0pO1xyXG4gICAgfTtcclxuICAgIC8v5pS55Y+Y5aSN6YCJXHJcbiAgICBjaGFuZ2VTZWxlY3RlZChfaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0W19pbmRleF0gPSAhdGhpcy5zZWxlY3RlZExpc3RbX2luZGV4XTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2VsZWN0ZWRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkTGlzdFtpXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1NlbGVjdE5vbmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzU2VsZWN0Tm9uZSA9IHRydWU7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vYWJvdXQgcGFnZSBjbGlja1xyXG4gICAgZ29QcmV2UGFnZShudW06IG51bWJlcikge1xyXG5cclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gbnVtO1xyXG4gICAgICAgIHRoaXMuZ2V0TGlzdEJ5UGFyYW1zKHRoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgfVxyXG4gICAgZ29OZXh0UGFnZShudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSBudW07XHJcbiAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcyk7XHJcbiAgICB9XHJcbiAgICBnb1BhZ2UobnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gbnVtO1xyXG4gICAgICAgIHRoaXMuZ2V0TGlzdEJ5UGFyYW1zKHRoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgfVxyXG4gICAgY2hhbmdlUGFnZVNpemUobnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLnBhZ2VTaXplID0gbnVtO1xyXG4gICAgICAgIHRoaXMuZ2V0TGlzdEJ5UGFyYW1zKHRoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcihcImJjRmFjZUxpYlBlcnNvbkNvbnRyb2xsZXJcIiwgRmFjZUxpYlBlcnNvbkNvbnRyb2xsZXIpO1xyXG5cclxuIl19
