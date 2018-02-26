define(["require", "exports", "text!../../common/faceHandlePopup/selectFace.popup.html", "text!../../common/faceHandlePopup/demarcate.popup.html", "../../common/app/main.app", "../resourceRetrievalEnum", "css!../style/quickSearch.css", "./quickSearch/quickSearch.controller", "./advancedSearch/advancedSearch.controller", "../../common/services/resourceRetrieval.service", "../../common/factory/layerMsg.factory", "../../common/services/uploadImage.service"], function (require, exports, selectFacePopupHtml, demarcatePopupHtml, main_app_1, resourceRetrievalEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var QuickSearchController = (function () {
        function QuickSearchController($scope, $timeout, resourceRetrievalService, layer, layerDec, $filter, uploadImageService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.resourceRetrievalService = resourceRetrievalService;
            this.layer = layer;
            this.layerDec = layerDec;
            this.$filter = $filter;
            this.uploadImageService = uploadImageService;
            this.keyword = "";
            this.clearKeyword = true;
            this.delayExecute = true;
            this.carImgList = [];
            this.faceImgList = [];
            this.keyDownSelect = 0;
            this.deviceArrId = [];
            this.searchPatternStatus = 0;
            this.mapSelectStatus = true;
            this.showStatus = false;
            this.queryStatus = false;
            var self = this;
            self.$scope.$on("get-face-info-quick", function (event, data) {
                var item = {
                    id: 0,
                    value: data.data.imageurl,
                    key: data.data.key,
                    fetureTaskParam: {
                        arrFetureTaskId: data.data.imageurl,
                        imageUrl: data.data.key
                    }
                };
                self.carImgList = [];
                self.faceImgList.push(item);
                self.faceImgList.forEach(function (value, index, array) {
                    value.id = index;
                });
            });
            self.$scope.$on('quickSearchAgain', function (event, data) {
                self.keyword = data.keyword;
                data.type = "quick";
                self.deviceArrId = data.deviceArrId;
                self.initBroadcast(data);
            });
            self.$scope.$on('last-query', function (event, data) {
                if (data.keyWord !== "") {
                    self.keyword = data.keyWord;
                    self.carImgList = [];
                    self.carImgList = [];
                }
                else if (data.taskId !== "") {
                    self.faceImgList = [{
                            id: 0,
                            value: data.imagePath,
                            key: data.taskId
                        }];
                }
            });
            self.$scope.$on("search-device-id", function (event, data, dataType) {
                if (dataType === "All") {
                    self.deviceArrId = data;
                }
                self.mapSelectStatus = true;
            });
            self.$scope.$on("search-pattern", function (event, type) {
                self.$timeout(function () {
                    self.mapSelectStatus = false;
                });
            });
            self.$scope.$on("search-request-loading", function (event, status) {
                self.$timeout(function () {
                    self.queryStatus = status;
                });
            });
        }
        QuickSearchController.prototype.getAssociateTips = function (key) {
            var self = this;
            var queryThinkLog = [];
            self.resourceRetrievalService.associateSearchByKeyWords(key)
                .then(function (res) {
                if ((res.code === 200) && (res.data.length > 0)) {
                    for (var i = 0; i < res.data.length && i < 10 - self.queryHistoryLog.length; i++) {
                        if (queryThinkLog.length <= 10) {
                            queryThinkLog.push({ id: i, value: res.data[i].SearchKey });
                        }
                        else {
                            break;
                        }
                    }
                    self.queryThinkLog = queryThinkLog;
                    self.showStatus = true;
                }
            });
        };
        QuickSearchController.prototype.showHistoryLog = function () {
            this.changeQuery(this.keyword);
        };
        QuickSearchController.prototype.hideHistoryLog = function () {
        };
        QuickSearchController.prototype.changeQuery = function (keyword) {
            var self = this;
            keyword = keyword.trim();
            var queryHistoryLog = resourceRetrievalEnum_1.GetQueryRecord();
            var historyLog = [];
            for (var i = 0; i < queryHistoryLog.length; i++) {
                if (keyword !== "") {
                    if (historyLog.length < 3) {
                        if (queryHistoryLog[i].value.indexOf(keyword) > -1) {
                            historyLog.push(queryHistoryLog[i]);
                        }
                    }
                    else {
                        break;
                    }
                }
                else {
                    if (historyLog.length < 10) {
                        historyLog.push(queryHistoryLog[i]);
                    }
                    else {
                        break;
                    }
                }
            }
            if (historyLog.length > 0) {
                self.queryHistoryLog = historyLog;
                self.showStatus = true;
            }
            else {
                self.queryHistoryLog = [];
            }
            if (keyword !== "") {
                if (self.delayExecute) {
                    self.delayExecute = false;
                    self.$timeout(function () {
                        self.delayExecute = true;
                        self.getAssociateTips(keyword);
                    }, 1000);
                }
            }
            else {
                self.queryThinkLog = [];
            }
        };
        QuickSearchController.prototype.clearKeywordText = function () {
            this.keyword = "";
            this.hiddenHistoryLog();
            this.queryThinkLog = [];
            this.queryHistoryLog = [];
            this.keyDownSelect = 0;
            this.faceImgList = [];
            this.carImgList = [];
        };
        QuickSearchController.prototype.changeKeyWord = function (item) {
            this.keyword = item.value;
            this.baseSearch();
            this.showStatus = false;
            this.keyDownSelect = 0;
            this.hiddenHistoryLog();
        };
        QuickSearchController.prototype.clearHistoryLog = function () {
            var self = this;
            resourceRetrievalEnum_1.ClearQueryRecord();
            self.queryHistoryLog = [];
            self.hiddenHistoryLog();
            self.$timeout(function () {
                self.changeQuery(self.keyword);
            });
        };
        QuickSearchController.prototype.hiddenHistoryLog = function () {
            this.showStatus = false;
        };
        QuickSearchController.prototype.keySearch = function () {
            var eve = window.event ? window.event : false;
            var logDom = $('.bdsug-overflow');
            var logNum = logDom.length;
            if (eve && eve.keyCode == 13) {
                this.baseSearch();
                this.showStatus = false;
                this.keyDownSelect = 0;
            }
            else if (eve && eve.keyCode == 40) {
                logDom.removeClass('textSearched');
                $(logDom[this.keyDownSelect]).addClass('textSearched');
                this.keyDownSelect += 1;
                if (this.keyDownSelect < 0 || this.keyDownSelect > logNum) {
                    this.keyDownSelect = 0;
                }
            }
            else if (eve && eve.keyCode == 38) {
                logDom.removeClass('textSearched');
                $(logDom[this.keyDownSelect - 2]).addClass('textSearched');
                this.keyDownSelect -= 1;
                if (this.keyDownSelect > logNum || this.keyDownSelect <= 0) {
                    this.keyDownSelect = logNum + 1;
                }
            }
            var textSearched = $('.textSearched');
            if (textSearched.length) {
                this.keyword = textSearched.text().trim();
            }
        };
        QuickSearchController.prototype.baseSearch = function () {
            var self = this;
            var keyword = self.keyword.trim();
            var data = {
                keyword: "",
                type: "quick",
                carInfo: {},
                faceInfo: {},
                deviceArrId: self.deviceArrId
            };
            if (self.carImgList.length) {
                data.carInfo = self.carImgList;
                data.type = "Car";
                self.initBroadcast(data);
            }
            else if (self.faceImgList.length) {
                data.type = "Face";
                data.faceInfo = self.faceImgList;
                self.initBroadcast(data);
            }
            else if (keyword && keyword !== "") {
                resourceRetrievalEnum_1.SetQueryRecord(self.keyword);
                self.hiddenHistoryLog();
                data.keyword = keyword;
                self.initBroadcast(data);
            }
            else {
                return self.layerDec.warnInfo('请输入检索内容');
            }
        };
        QuickSearchController.prototype.initBroadcast = function (data) {
            var self = this;
            self.searchPatternStatus = 1;
            self.queryStatus = true;
            self.$timeout(function () {
                self.$scope.$broadcast("verify-keyword", data);
                self.keyDownSelect = 0;
            });
        };
        QuickSearchController.prototype.CarImgUploading = function (event) {
            var self = this;
            self.keyword = "";
            self.faceImgList = [];
            self.showStatus = false;
            var from = new FormData();
            from.append('image', event.target.files[0]);
            this.uploadImageService.uploadImageForCar(from).then(function (res) {
                if ((res.code === 200) && (res.data && res.data.redisId)) {
                    var item_1 = {
                        id: 0,
                        value: res.data.imageUrl,
                        key: res.data.redisId,
                        fetureTaskParam: {
                            arrFetureTaskId: res.data.redisId,
                            imageUrl: res.data.imageUrl
                        }
                    };
                    self.$timeout(function () {
                        self.carImgList.push(item_1);
                        self.carImgList.forEach(function (value, index, array) {
                            value.id = index;
                        });
                    });
                }
                else {
                    self.layerDec.warnInfo('图片上传失败');
                }
            });
        };
        QuickSearchController.prototype.faceImgUploading = function (event) {
            var self = this;
            self.keyword = "";
            self.carImgList = [];
            self.showStatus = false;
            var from = new FormData();
            from.append('image', event.target.files[0]);
            var data = {
                storeType: "LOC",
                imageCategory: "CaptureImage",
                commandType: "SearchAccessLog",
                detectType: "Face"
            };
            this.uploadImageService.uploadImageForFace(from, data).then(function (res) {
                if ((res.code === 200) && (res.data && res.data.key)) {
                    var item_2 = {
                        id: 0,
                        value: res.data.imageurl,
                        key: res.data.key,
                        fetureTaskParam: {
                            arrFetureTaskId: res.data.key,
                            imageUrl: res.data.imageurl
                        }
                    };
                    self.$timeout(function () {
                        self.faceImgList.push(item_2);
                        self.faceImgList.forEach(function (value, index, array) {
                            value.id = index;
                        });
                    });
                }
                else if ((res.code === 200) && (res.data.faceInfo)) {
                    var image_1 = new Image();
                    image_1.src = 'data:image/jpeg;base64,' + res.data.image;
                    image_1.onload = function () {
                        var file = {
                            "_info": {
                                "width": image_1.width,
                                "height": image_1.height
                            }
                        };
                        self.multiUserSelect(res.data, file);
                    };
                }
                else if ((res.code === 200) && (res.data.image)) {
                    var image_2 = new Image();
                    image_2.src = 'data:image/jpeg;base64,' + res.data.image;
                    image_2.onload = function () {
                        var file = {
                            "_info": {
                                "width": image_2.width,
                                "height": image_2.height
                            }
                        };
                        self.faceDemarcate(res.data, file);
                    };
                }
                else {
                    self.layerDec.warnInfo('人脸识别失败');
                }
            });
        };
        QuickSearchController.prototype.carImgCancel = function (item) {
            var carImgList = [];
            this.carImgList.forEach(function (value, index, array) {
                if (item.id !== value.id) {
                    carImgList.push(value);
                }
            });
            this.carImgList = carImgList;
        };
        QuickSearchController.prototype.faceImgCancel = function (item) {
            var faceImgList = [];
            this.faceImgList.forEach(function (value, index, array) {
                if (item.id !== value.id) {
                    faceImgList.push(value);
                }
            });
            this.faceImgList = faceImgList;
        };
        QuickSearchController.prototype.multiUserSelect = function (faceInfo, file) {
            var self = this;
            var scope = self.$scope.$new();
            scope.index = null;
            scope.data = faceInfo;
            scope.file = file;
            scope.commandType = "SearchAccessLog";
            scope.detectType = "Face";
            scope.fromSelectFaceCtrl = "get-face-info-quick";
            scope.layerIndex = self.layer.open({
                type: 1,
                skin: 'no-scroll',
                title: ['人脸选择', 'font-weight: bold;background-color: #F6F8FB;color: #606060;height: 40px;'],
                area: ['400px', '310px'],
                content: selectFacePopupHtml,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        };
        QuickSearchController.prototype.faceDemarcate = function (faceInfo, file) {
            var self = this;
            var scope = self.$scope.$new();
            scope.index = null;
            scope.data = faceInfo;
            scope.file = file;
            scope.commandType = "SearchAccessLog";
            scope.detectType = "Face";
            scope.fromDemarcateFaceCtrl = "get-face-info-quick";
            scope.flag = false;
            scope.layerIndex = self.layer.open({
                type: 1,
                skin: 'no-scroll',
                title: ['人脸标注', 'font-weight: bold;background-color: #F6F8FB;color: #606060;height: 40px;'],
                area: ['650px', '555px'],
                content: demarcatePopupHtml,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        };
        QuickSearchController.prototype.onDropComplete = function (dragData, evt) {
            var self = this;
            self.keyword = "";
            var item = {
                id: 0,
                value: "",
                key: ""
            };
            if (dragData.AccessLog) {
                self.carImgList = [];
                item.featureSearchExt = {
                    accessLogId: dragData.AccessLog.ID,
                    featureType: "AccessFeature",
                    imgUrl: dragData.AccessLog.FacePath
                };
                item.value = dragData.AccessLog.FacePath;
                item.key = dragData.AccessLog.ID;
                if (self.faceImgList.length > 4) {
                    self.ExceedWarn();
                }
                else {
                    self.faceImgList.push(item);
                    self.faceImgList.forEach(function (value, index, array) {
                        value.id = index;
                    });
                }
            }
            else {
                self.faceImgList = [];
                item.featureSearchExt = {
                    accessLogId: dragData.id,
                    featureType: "AccessFeature",
                    imgUrl: dragData.panoramaImage
                };
                item.value = dragData.panoramaImage;
                item.key = dragData.id;
                if (self.carImgList.length > 4) {
                    self.ExceedWarn();
                }
                else {
                    self.carImgList.push(item);
                    self.carImgList.forEach(function (value, index, array) {
                        value.id = index;
                    });
                }
            }
        };
        QuickSearchController.prototype.ExceedWarn = function () {
            this.layerDec.info('最多支持上传5张图片');
        };
        QuickSearchController.prototype.goToAdvanced = function () {
            this.searchPatternStatus = 2;
            this.$scope.$emit('map-clear-draw', "");
        };
        QuickSearchController.$inject = ["$scope", "$timeout", "resourceRetrievalService", "layer", "layerDec", "$filter", "uploadImageService"];
        return QuickSearchController;
    }());
    main_app_1.app.controller("QuickSearchController", QuickSearchController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL3NlYXJjaC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQXVCQTtRQXlCSSwrQkFBb0IsTUFBVyxFQUNYLFFBQWEsRUFDYix3QkFBbUQsRUFDbkQsS0FBVSxFQUNWLFFBQW1CLEVBQ25CLE9BQVcsRUFDWCxrQkFBdUM7WUFOdkMsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTJCO1lBQ25ELFVBQUssR0FBTCxLQUFLLENBQUs7WUFDVixhQUFRLEdBQVIsUUFBUSxDQUFXO1lBQ25CLFlBQU8sR0FBUCxPQUFPLENBQUk7WUFDWCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXFCO1lBNUIzRCxZQUFPLEdBQVcsRUFBRSxDQUFDO1lBR3JCLGlCQUFZLEdBQVksSUFBSSxDQUFDO1lBQzdCLGlCQUFZLEdBQVksSUFBSSxDQUFDO1lBRzdCLGVBQVUsR0FBcUIsRUFBRSxDQUFDO1lBQ2xDLGdCQUFXLEdBQXFCLEVBQUUsQ0FBQztZQUduQyxrQkFBYSxHQUFXLENBQUMsQ0FBQztZQUcxQixnQkFBVyxHQUFrQixFQUFFLENBQUM7WUFHaEMsd0JBQW1CLEdBQVcsQ0FBQyxDQUFDO1lBQ2hDLG9CQUFlLEdBQVksSUFBSSxDQUFDO1lBQ2hDLGVBQVUsR0FBWSxLQUFLLENBQUM7WUFDNUIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7WUFTekIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBRWhCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLFVBQVUsS0FBVSxFQUFFLElBQVM7Z0JBQ2xFLElBQUksSUFBSSxHQUFPO29CQUNYLEVBQUUsRUFBRSxDQUFDO29CQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7b0JBQ3pCLEdBQUcsRUFBRSxJQUFJLENBQUMs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LENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBN2dCTSw2QkFBTyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSwwQkFBMEIsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFDLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBOGdCN0gsNEJBQUM7S0EvZ0JELEFBK2dCQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9yZXNvdXJjZVJldHJpZXZhbC9zZWFyY2gvc2VhcmNoLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uLy4uL2NvbW1vbi9mYWNlSGFuZGxlUG9wdXAvc2VsZWN0RmFjZS5wb3B1cC5odG1sXCIgbmFtZT1cInNlbGVjdEZhY2VQb3B1cEh0bWxcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uLy4uL2NvbW1vbi9mYWNlSGFuZGxlUG9wdXAvZGVtYXJjYXRlLnBvcHVwLmh0bWxcIiBuYW1lPVwiZGVtYXJjYXRlUG9wdXBIdG1sXCIgLz5cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCBcImNzcyEuLi9zdHlsZS9xdWlja1NlYXJjaC5jc3NcIjtcclxuXHJcbi8vICDlv6vpgJ/mo4DntKLkuI7pq5jnuqfmo4DntKJcclxuaW1wb3J0IFwiLi9xdWlja1NlYXJjaC9xdWlja1NlYXJjaC5jb250cm9sbGVyXCI7XHJcbmltcG9ydCBcIi4vYWR2YW5jZWRTZWFyY2gvYWR2YW5jZWRTZWFyY2guY29udHJvbGxlclwiO1xyXG5cclxuLy8g5pyN5YqhXHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9yZXNvdXJjZVJldHJpZXZhbC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SVJlc291cmNlUmV0cmlldmFsU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9yZXNvdXJjZVJldHJpZXZhbC5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L2xheWVyTXNnLmZhY3RvcnlcIjtcclxuaW1wb3J0IHtJTGF5ZXJEZWN9IGZyb20gXCIuLi8uLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy91cGxvYWRJbWFnZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SVVwbG9hZEltYWdlU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy91cGxvYWRJbWFnZS5zZXJ2aWNlXCI7XHJcblxyXG4vLyDlj4LmlbBcclxuaW1wb3J0IHtSZXNwb25zZVJlc3VsdH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5pbXBvcnQge1NldFF1ZXJ5UmVjb3JkLCBHZXRRdWVyeVJlY29yZCwgQ2xlYXJRdWVyeVJlY29yZCwgUXVlcnlJdGVtfSBmcm9tIFwiLi4vcmVzb3VyY2VSZXRyaWV2YWxFbnVtXCI7XHJcblxyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnksICQ6IGFueSwgc2VsZWN0RmFjZVBvcHVwSHRtbDogYW55LCBkZW1hcmNhdGVQb3B1cEh0bWw6IGFueTtcclxuXHJcbmNsYXNzIFF1aWNrU2VhcmNoQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFtcIiRzY29wZVwiLCBcIiR0aW1lb3V0XCIsIFwicmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlXCIsIFwibGF5ZXJcIiwgXCJsYXllckRlY1wiLFwiJGZpbHRlclwiLCBcInVwbG9hZEltYWdlU2VydmljZVwiXTtcclxuXHJcbiAgICBrZXl3b3JkOiBzdHJpbmcgPSBcIlwiOy8v55uR5o6n5pCc57Si5qGGXHJcbiAgICBxdWVyeUhpc3RvcnlMb2c6IEFycmF5PFF1ZXJ5SXRlbT47IC8vIOafpeivouWOhuWPslxyXG4gICAgcXVlcnlUaGlua0xvZzogQXJyYXk8UXVlcnlJdGVtPjsgLy8g6IGU5oOz5p+l6K+i5Y6G5Y+yXHJcbiAgICBjbGVhcktleXdvcmQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgZGVsYXlFeGVjdXRlOiBib29sZWFuID0gdHJ1ZTsvL+W7tuaXtuaJp+ihjOWumuaXtuWZqFxyXG5cclxuICAgIC8v5Zu+54mH5LiK5LygXHJcbiAgICBjYXJJbWdMaXN0OiBBcnJheTxRdWVyeUl0ZW0+ID0gW107XHJcbiAgICBmYWNlSW1nTGlzdDogQXJyYXk8UXVlcnlJdGVtPiA9IFtdO1xyXG5cclxuICAgIC8v6ZSu55uY5LiL6ZSu6YCJ5Lit5Y6G5Y+yXHJcbiAgICBrZXlEb3duU2VsZWN0OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8vIOmAieS4reiuvuWkh+S/oeaBr1xyXG4gICAgZGV2aWNlQXJySWQ6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHJcbiAgICAvLyDmn6Xor6LmqKHlvI9cclxuICAgIHNlYXJjaFBhdHRlcm5TdGF0dXM6IG51bWJlciA9IDA7IC8vIOafpeivouaooeW8jyAwOuaYvuekuuWOn+Wni+mhtemdoiAxOuaYvuekuuW/q+mAn+ajgOe0oiAyOuaYvuekuumrmOe6p+ajgOe0olxyXG4gICAgbWFwU2VsZWN0U3RhdHVzOiBib29sZWFuID0gdHJ1ZTsgLy8g5Zyw5Zu+5qGG6YCJ54q25oCBIHRydWU65qGG6YCJ5a6M5oiQIGZhbHNlOuahhumAieS4rVxyXG4gICAgc2hvd1N0YXR1czogYm9vbGVhbiA9IGZhbHNlOyAvLyDkuIvmi4nmoYbmmL7npLrnirbmgIFcclxuICAgIHF1ZXJ5U3RhdHVzOiBib29sZWFuID0gZmFsc2U7IC8vIOafpeivoueKtuaAgVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlc291cmNlUmV0cmlldmFsU2VydmljZTogSVJlc291cmNlUmV0cmlldmFsU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXI6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXJEZWM6IElMYXllckRlYyxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJGZpbHRlcjphbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHVwbG9hZEltYWdlU2VydmljZTogSVVwbG9hZEltYWdlU2VydmljZSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAvLyDnm5HlkKzkurrohLjpgInmi6nkuovku7ZcclxuICAgICAgICBzZWxmLiRzY29wZS4kb24oXCJnZXQtZmFjZS1pbmZvLXF1aWNrXCIsIGZ1bmN0aW9uIChldmVudDogYW55LCBkYXRhOiBhbnkpIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW06YW55ID0ge1xyXG4gICAgICAgICAgICAgICAgaWQ6IDAsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5kYXRhLmltYWdldXJsLFxyXG4gICAgICAgICAgICAgICAga2V5OiBkYXRhLmRhdGEua2V5LFxyXG4gICAgICAgICAgICAgICAgZmV0dXJlVGFza1BhcmFtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyRmV0dXJlVGFza0lkOiBkYXRhLmRhdGEuaW1hZ2V1cmwsXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VVcmw6IGRhdGEuZGF0YS5rZXlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2VsZi5jYXJJbWdMaXN0ID0gW107XHJcbiAgICAgICAgICAgIHNlbGYuZmFjZUltZ0xpc3QucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgc2VsZi5mYWNlSW1nTGlzdC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5pZCA9IGluZGV4O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL+S6jOasoeajgOe0olxyXG4gICAgICAgIHNlbGYuJHNjb3BlLiRvbigncXVpY2tTZWFyY2hBZ2FpbicsIGZ1bmN0aW9uIChldmVudDogYW55LCBkYXRhOiBhbnkpIHtcclxuICAgICAgICAgICAgc2VsZi5rZXl3b3JkID0gZGF0YS5rZXl3b3JkO1xyXG4gICAgICAgICAgICBkYXRhLnR5cGUgPSBcInF1aWNrXCI7XHJcbiAgICAgICAgICAgIHNlbGYuZGV2aWNlQXJySWQgPSBkYXRhLmRldmljZUFycklkO1xyXG4gICAgICAgICAgICBzZWxmLmluaXRCcm9hZGNhc3QoZGF0YSlcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL+aOpeaUtuWtkOmhtemdoui/lOWbnuS4iuS4gOasoeafpeivouWPguaVsFxyXG4gICAgICAgIHNlbGYuJHNjb3BlLiRvbignbGFzdC1xdWVyeScsIGZ1bmN0aW9uIChldmVudDogYW55LCBkYXRhOiBhbnkpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEua2V5V29yZCAhPT0gXCJcIikgeyAvLyDlhajmlofmo4DntKJcclxuICAgICAgICAgICAgICAgIHNlbGYua2V5d29yZCA9IGRhdGEua2V5V29yZDtcclxuICAgICAgICAgICAgICAgIHNlbGYuY2FySW1nTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jYXJJbWdMaXN0ID0gW107XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS50YXNrSWQgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuZmFjZUltZ0xpc3QgPSBbe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmltYWdlUGF0aCxcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IGRhdGEudGFza0lkXHJcbiAgICAgICAgICAgICAgICB9XTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyDnm5HlkKzlub/mkq3kuovku7YtLeiuvuWkh2lkXHJcbiAgICAgICAgc2VsZi4kc2NvcGUuJG9uKFwic2VhcmNoLWRldmljZS1pZFwiLCBmdW5jdGlvbiAoZXZlbnQ6IGFueSwgZGF0YTogYW55LCBkYXRhVHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhVHlwZSA9PT0gXCJBbGxcIikge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kZXZpY2VBcnJJZCA9IGRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5tYXBTZWxlY3RTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIOebkeWQrOW5v+aSreS6i+S7ti0t5p+l6K+i5qih5byPXHJcbiAgICAgICAgc2VsZi4kc2NvcGUuJG9uKFwic2VhcmNoLXBhdHRlcm5cIiwgZnVuY3Rpb24gKGV2ZW50OiBhbnksIHR5cGU6IHN0cmluZykge1xyXG4gICAgICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNlbGYubWFwU2VsZWN0U3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIOebkeWQrOW5v+aSreS6i+S7ti0t5p+l6K+i54q25oCBXHJcbiAgICAgICAgc2VsZi4kc2NvcGUuJG9uKFwic2VhcmNoLXJlcXVlc3QtbG9hZGluZ1wiLCBmdW5jdGlvbiAoZXZlbnQ6IGFueSwgc3RhdHVzOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5xdWVyeVN0YXR1cyA9IHN0YXR1cztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635Y+W6IGU5oOz5pCc57Si5pWw5o2uXHJcbiAgICBwcml2YXRlIGdldEFzc29jaWF0ZVRpcHMoa2V5OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHF1ZXJ5VGhpbmtMb2c6IEFycmF5PFF1ZXJ5SXRlbT4gPSBbXTtcclxuXHJcbiAgICAgICAgc2VsZi5yZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UuYXNzb2NpYXRlU2VhcmNoQnlLZXlXb3JkcyhrZXkpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKChyZXMuY29kZSA9PT0gMjAwKSAmJiAocmVzLmRhdGEubGVuZ3RoID4gMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlcy5kYXRhLmxlbmd0aCAmJiBpIDwgMTAgLSBzZWxmLnF1ZXJ5SGlzdG9yeUxvZy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVlcnlUaGlua0xvZy5sZW5ndGggPD0gMTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5VGhpbmtMb2cucHVzaCh7aWQ6IGksIHZhbHVlOiByZXMuZGF0YVtpXS5TZWFyY2hLZXl9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucXVlcnlUaGlua0xvZyA9IHF1ZXJ5VGhpbmtMb2c7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93U3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyAg6L6T5YWl5qGG6I635Y+W5YWJ5qCHIOaYvuekuuaQnOe0ouiusOW9lVxyXG4gICAgcHVibGljIHNob3dIaXN0b3J5TG9nKCkge1xyXG4gICAgICAgIHRoaXMuY2hhbmdlUXVlcnkodGhpcy5rZXl3b3JkKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDovpPlhaXmoYblpLHljrvnhKbngrlcclxuICAgIHB1YmxpYyBoaWRlSGlzdG9yeUxvZygpIHtcclxuICAgICAgICAvLyB0aGlzLnNob3dTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAvLyB0aGlzLnF1ZXJ5SGlzdG9yeUxvZyA9IFtdO1xyXG4gICAgICAgIC8vIHRoaXMucXVlcnlUaGlua0xvZyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOi+k+WFpeahhuWGheWuueWPmOWMluaYvuekuuiBlOaDs+iusOW9leS4juWOhuWPsue6quW9lVxyXG4gICAgcHVibGljIGNoYW5nZVF1ZXJ5KGtleXdvcmQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBrZXl3b3JkID0ga2V5d29yZC50cmltKCk7XHJcbiAgICAgICAgLy8g6I635Y+W5pCc57Si57yT5a2YXHJcbiAgICAgICAgbGV0IHF1ZXJ5SGlzdG9yeUxvZzogQXJyYXk8UXVlcnlJdGVtPiA9IEdldFF1ZXJ5UmVjb3JkKCk7XHJcbiAgICAgICAgbGV0IGhpc3RvcnlMb2c6IEFycmF5PFF1ZXJ5SXRlbT4gPSBbXTtcclxuXHJcbiAgICAgICAgLy8gIOi/h+a7pOaQnOe0ouWOhuWPsue6quW9lVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlcnlIaXN0b3J5TG9nLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIOiOt+WPluiBlOaDs+ebuOWFs+WOhuWPsue6quW9lVxyXG4gICAgICAgICAgICBpZiAoa2V5d29yZCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGhpc3RvcnlMb2cubGVuZ3RoIDwgMykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWVyeUhpc3RvcnlMb2dbaV0udmFsdWUuaW5kZXhPZihrZXl3b3JkKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpc3RvcnlMb2cucHVzaChxdWVyeUhpc3RvcnlMb2dbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGlzdG9yeUxvZy5sZW5ndGggPCAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhpc3RvcnlMb2cucHVzaChxdWVyeUhpc3RvcnlMb2dbaV0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g6K6+572u5pCc57Si5Y6G5Y+y57qq5b2VXHJcbiAgICAgICAgaWYgKGhpc3RvcnlMb2cubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBzZWxmLnF1ZXJ5SGlzdG9yeUxvZyA9IGhpc3RvcnlMb2c7XHJcbiAgICAgICAgICAgIHNlbGYuc2hvd1N0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi5xdWVyeUhpc3RvcnlMb2cgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOiOt+WPluiBlOaDs+S/oeaBr1xyXG4gICAgICAgIGlmIChrZXl3b3JkICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmRlbGF5RXhlY3V0ZSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kZWxheUV4ZWN1dGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGVsYXlFeGVjdXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmdldEFzc29jaWF0ZVRpcHMoa2V5d29yZCk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGYucXVlcnlUaGlua0xvZyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDliKDpmaTovpPlhaXlhoXlrrlcclxuICAgIHB1YmxpYyBjbGVhcktleXdvcmRUZXh0KCkge1xyXG4gICAgICAgIHRoaXMua2V5d29yZCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5oaWRkZW5IaXN0b3J5TG9nKCk7XHJcbiAgICAgICAgdGhpcy5xdWVyeVRoaW5rTG9nID0gW107XHJcbiAgICAgICAgdGhpcy5xdWVyeUhpc3RvcnlMb2cgPSBbXTtcclxuICAgICAgICB0aGlzLmtleURvd25TZWxlY3QgPSAwO1xyXG4gICAgICAgIHRoaXMuZmFjZUltZ0xpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLmNhckltZ0xpc3QgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDpgInkuK3ljoblj7LmkJzntKLlhoXlrrlcclxuICAgICAqIEBwYXJhbSB7UXVlcnlJdGVtfSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGFuZ2VLZXlXb3JkKGl0ZW06IFF1ZXJ5SXRlbSkge1xyXG4gICAgICAgIHRoaXMua2V5d29yZCA9IGl0ZW0udmFsdWU7XHJcbiAgICAgICAgdGhpcy5iYXNlU2VhcmNoKCk7XHJcbiAgICAgICAgdGhpcy5zaG93U3RhdHVzID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMua2V5RG93blNlbGVjdCA9IDA7XHJcbiAgICAgICAgdGhpcy5oaWRkZW5IaXN0b3J5TG9nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Yig6Zmk5Y6G5Y+y6K6w5b2VXHJcbiAgICBwdWJsaWMgY2xlYXJIaXN0b3J5TG9nKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBDbGVhclF1ZXJ5UmVjb3JkKCk7XHJcbiAgICAgICAgc2VsZi5xdWVyeUhpc3RvcnlMb2cgPSBbXTtcclxuICAgICAgICBzZWxmLmhpZGRlbkhpc3RvcnlMb2coKTtcclxuICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VRdWVyeShzZWxmLmtleXdvcmQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOmakOiXj+S4i+aLieahhlxyXG4gICAgcHVibGljIGhpZGRlbkhpc3RvcnlMb2coKSB7XHJcbiAgICAgICAgdGhpcy5zaG93U3RhdHVzID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Zue6L2m5pCc57SiXHJcbiAgICBwdWJsaWMga2V5U2VhcmNoKCkge1xyXG4gICAgICAgIGxldCBldmU6IGFueSA9IHdpbmRvdy5ldmVudCA/IHdpbmRvdy5ldmVudCA6IGZhbHNlO1xyXG4gICAgICAgIGxldCBsb2dEb206IGFueSA9ICQoJy5iZHN1Zy1vdmVyZmxvdycpO1xyXG4gICAgICAgIGxldCBsb2dOdW06IG51bWJlciA9IGxvZ0RvbS5sZW5ndGg7XHJcblxyXG4gICAgICAgIC8vIOWbnui9plxyXG4gICAgICAgIGlmIChldmUgJiYgZXZlLmtleUNvZGUgPT0gMTMpIHtcclxuICAgICAgICAgICAgdGhpcy5iYXNlU2VhcmNoKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1N0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmtleURvd25TZWxlY3QgPSAwO1xyXG4gICAgICAgICAgICAvLyDplK7nm5jlkJHkuItcclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZSAmJiBldmUua2V5Q29kZSA9PSA0MCkge1xyXG4gICAgICAgICAgICBsb2dEb20ucmVtb3ZlQ2xhc3MoJ3RleHRTZWFyY2hlZCcpO1xyXG4gICAgICAgICAgICAkKGxvZ0RvbVt0aGlzLmtleURvd25TZWxlY3RdKS5hZGRDbGFzcygndGV4dFNlYXJjaGVkJyk7XHJcbiAgICAgICAgICAgIHRoaXMua2V5RG93blNlbGVjdCArPSAxO1xyXG4gICAgICAgICAgICAvLyDpgInmi6nljoblj7LliLDmnIDlkI7kuIDmnaHnu6fnu63mjInkuIvplK7lj5jkuLrnrKzkuIDmnaFcclxuICAgICAgICAgICAgaWYgKHRoaXMua2V5RG93blNlbGVjdCA8IDAgfHwgdGhpcy5rZXlEb3duU2VsZWN0ID4gbG9nTnVtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtleURvd25TZWxlY3QgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOmUruebmOWQkeS4ilxyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlICYmIGV2ZS5rZXlDb2RlID09IDM4KSB7XHJcbiAgICAgICAgICAgIGxvZ0RvbS5yZW1vdmVDbGFzcygndGV4dFNlYXJjaGVkJyk7XHJcbiAgICAgICAgICAgICQobG9nRG9tW3RoaXMua2V5RG93blNlbGVjdCAtIDJdKS5hZGRDbGFzcygndGV4dFNlYXJjaGVkJyk7XHJcbiAgICAgICAgICAgIHRoaXMua2V5RG93blNlbGVjdCAtPSAxO1xyXG4gICAgICAgICAgICAvLyDpgInmi6nljoblj7LliLDnrKzkuIDmnaHnu6fnu63mjInkuIrplK7lj5jkuLrmnIDlkI7kuIDmnaFcclxuICAgICAgICAgICAgaWYgKHRoaXMua2V5RG93blNlbGVjdCA+IGxvZ051bSB8fCB0aGlzLmtleURvd25TZWxlY3QgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlEb3duU2VsZWN0ID0gbG9nTnVtICsgMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g6YCJ5Lit5Y6G5Y+y5YWz6ZSu5a2X5Y+Y5YyWXHJcbiAgICAgICAgbGV0IHRleHRTZWFyY2hlZDogYW55ID0gJCgnLnRleHRTZWFyY2hlZCcpO1xyXG4gICAgICAgIGlmICh0ZXh0U2VhcmNoZWQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMua2V5d29yZCA9IHRleHRTZWFyY2hlZC50ZXh0KCkudHJpbSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDmo4DntKJcclxuICAgIHB1YmxpYyBiYXNlU2VhcmNoKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQga2V5d29yZCA9IHNlbGYua2V5d29yZC50cmltKCk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgICAgIGtleXdvcmQ6IFwiXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwicXVpY2tcIixcclxuICAgICAgICAgICAgY2FySW5mbzoge30sXHJcbiAgICAgICAgICAgIGZhY2VJbmZvOiB7fSxcclxuICAgICAgICAgICAgZGV2aWNlQXJySWQ6IHNlbGYuZGV2aWNlQXJySWRcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIOWIpOaWreaYr+WQpuaYr+S7peWbvuajgOe0olxyXG4gICAgICAgIGlmIChzZWxmLmNhckltZ0xpc3QubGVuZ3RoKSB7Ly/ovabovoZcclxuICAgICAgICAgICAgZGF0YS5jYXJJbmZvID0gc2VsZi5jYXJJbWdMaXN0O1xyXG4gICAgICAgICAgICBkYXRhLnR5cGUgPSBcIkNhclwiO1xyXG4gICAgICAgICAgICBzZWxmLmluaXRCcm9hZGNhc3QoZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzZWxmLmZhY2VJbWdMaXN0Lmxlbmd0aCkgey8v5Lq65YOPXHJcbiAgICAgICAgICAgIGRhdGEudHlwZSA9IFwiRmFjZVwiO1xyXG4gICAgICAgICAgICBkYXRhLmZhY2VJbmZvID0gc2VsZi5mYWNlSW1nTGlzdDtcclxuICAgICAgICAgICAgc2VsZi5pbml0QnJvYWRjYXN0KGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoa2V5d29yZCAmJiBrZXl3b3JkICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIFNldFF1ZXJ5UmVjb3JkKHNlbGYua2V5d29yZCk7XHJcbiAgICAgICAgICAgIHNlbGYuaGlkZGVuSGlzdG9yeUxvZygpO1xyXG4gICAgICAgICAgICBkYXRhLmtleXdvcmQgPSBrZXl3b3JkO1xyXG4gICAgICAgICAgICBzZWxmLmluaXRCcm9hZGNhc3QoZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+ivt+i+k+WFpeajgOe0ouWGheWuuScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDlub/mkq3mn6Xor6Llj4LmlbBcclxuICAgIHB1YmxpYyBpbml0QnJvYWRjYXN0KGRhdGE6IGFueSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgLy8g5b+r6YCf5qOA57Si5qih5byPXHJcbiAgICAgICAgc2VsZi5zZWFyY2hQYXR0ZXJuU3RhdHVzID0gMTtcclxuICAgICAgICAvLyDov5vlhaXmn6Xor6LnirbmgIFcclxuICAgICAgICBzZWxmLnF1ZXJ5U3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGJyb2FkY2FzdChcInZlcmlmeS1rZXl3b3JkXCIsIGRhdGEpO1xyXG4gICAgICAgICAgICBzZWxmLmtleURvd25TZWxlY3QgPSAwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOi9pui+huWbvueJh+S4iuS8oFxyXG4gICAgcHVibGljIENhckltZ1VwbG9hZGluZyhldmVudDogYW55KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYua2V5d29yZCA9IFwiXCI7XHJcbiAgICAgICAgc2VsZi5mYWNlSW1nTGlzdCA9IFtdO1xyXG4gICAgICAgIHNlbGYuc2hvd1N0YXR1cyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgZnJvbSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIGZyb20uYXBwZW5kKCdpbWFnZScsIGV2ZW50LnRhcmdldC5maWxlc1swXSk7XHJcbiAgICAgICAgdGhpcy51cGxvYWRJbWFnZVNlcnZpY2UudXBsb2FkSW1hZ2VGb3JDYXIoZnJvbSkudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKChyZXMuY29kZSA9PT0gMjAwKSAmJiAocmVzLmRhdGEgJiYgcmVzLmRhdGEucmVkaXNJZCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtOmFueSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogMCxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzLmRhdGEuaW1hZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiByZXMuZGF0YS5yZWRpc0lkLFxyXG4gICAgICAgICAgICAgICAgICAgIGZldHVyZVRhc2tQYXJhbToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJGZXR1cmVUYXNrSWQ6IHJlcy5kYXRhLnJlZGlzSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlVXJsOiByZXMuZGF0YS5pbWFnZVVybFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhckltZ0xpc3QucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhckltZ0xpc3QuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGluZGV4LCBhcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5pZCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxheWVyRGVjLndhcm5JbmZvKCflm77niYfkuIrkvKDlpLHotKUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOS6uuiEuOWbvueJh+S4iuS8oFxyXG4gICAgcHVibGljIGZhY2VJbWdVcGxvYWRpbmcoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLmtleXdvcmQgPSBcIlwiO1xyXG4gICAgICAgIHNlbGYuY2FySW1nTGlzdCA9IFtdO1xyXG4gICAgICAgIHNlbGYuc2hvd1N0YXR1cyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgZnJvbSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIGZyb20uYXBwZW5kKCdpbWFnZScsIGV2ZW50LnRhcmdldC5maWxlc1swXSk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgICAgIHN0b3JlVHlwZTogXCJMT0NcIixcclxuICAgICAgICAgICAgaW1hZ2VDYXRlZ29yeTogXCJDYXB0dXJlSW1hZ2VcIixcclxuICAgICAgICAgICAgY29tbWFuZFR5cGU6IFwiU2VhcmNoQWNjZXNzTG9nXCIsXHJcbiAgICAgICAgICAgIGRldGVjdFR5cGU6IFwiRmFjZVwiXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnVwbG9hZEltYWdlU2VydmljZS51cGxvYWRJbWFnZUZvckZhY2UoZnJvbSwgZGF0YSkudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKChyZXMuY29kZSA9PT0gMjAwKSAmJiAocmVzLmRhdGEgJiYgcmVzLmRhdGEua2V5KSkgeyAvLyDkurrohLjor4bliKvmiJDlip9cclxuICAgICAgICAgICAgICAgIGxldCBpdGVtOmFueSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogMCxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzLmRhdGEuaW1hZ2V1cmwsXHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiByZXMuZGF0YS5rZXksXHJcbiAgICAgICAgICAgICAgICAgICAgZmV0dXJlVGFza1BhcmFtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyckZldHVyZVRhc2tJZDogcmVzLmRhdGEua2V5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZVVybDogcmVzLmRhdGEuaW1hZ2V1cmxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgc2VsZi4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5mYWNlSW1nTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmFjZUltZ0xpc3QuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGluZGV4LCBhcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5pZCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlcy5jb2RlID09PSAyMDApICYmIChyZXMuZGF0YS5mYWNlSW5mbykpIHsvLyDkurrohLjpgInmi6lcclxuICAgICAgICAgICAgICAgIGxldCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICAgICAgaW1hZ2Uuc3JjID0gJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJytyZXMuZGF0YS5pbWFnZTtcclxuICAgICAgICAgICAgICAgIGltYWdlLm9ubG9hZCA9ICgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiX2luZm9cIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBpbWFnZS53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IGltYWdlLmhlaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLm11bHRpVXNlclNlbGVjdChyZXMuZGF0YSwgZmlsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlcy5jb2RlID09PSAyMDApICYmIChyZXMuZGF0YS5pbWFnZSkpIHsgLy8g5Lq66IS46K+G5Yir5aSx6LSl5b6F5qCH5a6aXHJcbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgICAgIGltYWdlLnNyYyA9ICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcrcmVzLmRhdGEuaW1hZ2U7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5vbmxvYWQgPSAoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWxlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIl9pbmZvXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogaW1hZ2Uud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBpbWFnZS5oZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5mYWNlRGVtYXJjYXRlKHJlcy5kYXRhLCBmaWxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+S6uuiEuOivhuWIq+Wksei0pScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhckltZ0NhbmNlbChpdGVtOiBRdWVyeUl0ZW0pIHtcclxuICAgICAgICBsZXQgY2FySW1nTGlzdDogQXJyYXk8UXVlcnlJdGVtPiA9IFtdO1xyXG4gICAgICAgIHRoaXMuY2FySW1nTGlzdC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmlkICE9PSB2YWx1ZS5pZCkge1xyXG4gICAgICAgICAgICAgICAgY2FySW1nTGlzdC5wdXNoKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2FySW1nTGlzdCA9IGNhckltZ0xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZhY2VJbWdDYW5jZWwoaXRlbTogUXVlcnlJdGVtKSB7XHJcbiAgICAgICAgbGV0IGZhY2VJbWdMaXN0OiBBcnJheTxRdWVyeUl0ZW0+ID0gW107XHJcbiAgICAgICAgdGhpcy5mYWNlSW1nTGlzdC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmlkICE9PSB2YWx1ZS5pZCkge1xyXG4gICAgICAgICAgICAgICAgZmFjZUltZ0xpc3QucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmZhY2VJbWdMaXN0ID0gZmFjZUltZ0xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb27lpJrkurrohLjpgInmi6lcclxuICAgICAqIEBwYXJhbSBmYWNlSW5mb1xyXG4gICAgICogQHBhcmFtIGZpbGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIG11bHRpVXNlclNlbGVjdChmYWNlSW5mbzogYW55LCBmaWxlOiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IGxheWVyOiBhbnk7IGluZGV4OiBzdHJpbmcsICRkZXN0cm95OiBGdW5jdGlvbiwgZGF0YTogYW55LCBmaWxlOiBhbnksIGNvbW1hbmRUeXBlOiBzdHJpbmcsIGRldGVjdFR5cGU6IHN0cmluZywgbGF5ZXJJbmRleDogYW55LCBmcm9tU2VsZWN0RmFjZUN0cmw6IHN0cmluZyB9ID0gc2VsZi4kc2NvcGUuJG5ldygpO1xyXG5cclxuICAgICAgICBzY29wZS5pbmRleCA9IG51bGw7XHJcbiAgICAgICAgc2NvcGUuZGF0YSA9IGZhY2VJbmZvO1xyXG4gICAgICAgIHNjb3BlLmZpbGUgPSBmaWxlO1xyXG4gICAgICAgIHNjb3BlLmNvbW1hbmRUeXBlID0gXCJTZWFyY2hBY2Nlc3NMb2dcIjtcclxuICAgICAgICBzY29wZS5kZXRlY3RUeXBlID0gXCJGYWNlXCI7XHJcbiAgICAgICAgc2NvcGUuZnJvbVNlbGVjdEZhY2VDdHJsID0gXCJnZXQtZmFjZS1pbmZvLXF1aWNrXCI7XHJcblxyXG4gICAgICAgIHNjb3BlLmxheWVySW5kZXggPSBzZWxmLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBza2luOiAnbm8tc2Nyb2xsJyxcclxuICAgICAgICAgICAgdGl0bGU6IFsn5Lq66IS46YCJ5oupJywgJ2ZvbnQtd2VpZ2h0OiBib2xkO2JhY2tncm91bmQtY29sb3I6ICNGNkY4RkI7Y29sb3I6ICM2MDYwNjA7aGVpZ2h0OiA0MHB4OyddLFxyXG4gICAgICAgICAgICBhcmVhOiBbJzQwMHB4JywgJzMxMHB4J10sXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IHNlbGVjdEZhY2VQb3B1cEh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9u5Lq66IS45qCH5rOoXHJcbiAgICAgKiBAcGFyYW0gZmFjZUluZm9cclxuICAgICAqIEBwYXJhbSBmaWxlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmYWNlRGVtYXJjYXRlKGZhY2VJbmZvOiBhbnksIGZpbGU6IGFueSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgc2NvcGU6IHsgbGF5ZXI6IGFueTsgaW5kZXg6IHN0cmluZywgJGRlc3Ryb3k6IEZ1bmN0aW9uLCBkYXRhOiBhbnksIGZpbGU6IGFueSwgY29tbWFuZFR5cGU6IHN0cmluZywgZGV0ZWN0VHlwZTogc3RyaW5nLCBsYXllckluZGV4OiBhbnksIGZyb21EZW1hcmNhdGVGYWNlQ3RybDogc3RyaW5nLCBmbGFnOiBib29sZWFuIH0gPSBzZWxmLiRzY29wZS4kbmV3KCk7XHJcblxyXG4gICAgICAgIHNjb3BlLmluZGV4ID0gbnVsbDtcclxuICAgICAgICBzY29wZS5kYXRhID0gZmFjZUluZm87XHJcbiAgICAgICAgc2NvcGUuZmlsZSA9IGZpbGU7XHJcbiAgICAgICAgc2NvcGUuY29tbWFuZFR5cGUgPSBcIlNlYXJjaEFjY2Vzc0xvZ1wiO1xyXG4gICAgICAgIHNjb3BlLmRldGVjdFR5cGUgPSBcIkZhY2VcIjtcclxuICAgICAgICBzY29wZS5mcm9tRGVtYXJjYXRlRmFjZUN0cmwgPSBcImdldC1mYWNlLWluZm8tcXVpY2tcIjtcclxuICAgICAgICBzY29wZS5mbGFnID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHNjb3BlLmxheWVySW5kZXggPSBzZWxmLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBza2luOiAnbm8tc2Nyb2xsJyxcclxuICAgICAgICAgICAgdGl0bGU6IFsn5Lq66IS45qCH5rOoJywgJ2ZvbnQtd2VpZ2h0OiBib2xkO2JhY2tncm91bmQtY29sb3I6ICNGNkY4RkI7Y29sb3I6ICM2MDYwNjA7aGVpZ2h0OiA0MHB4OyddLFxyXG4gICAgICAgICAgICBhcmVhOiBbJzY1MHB4JywgJzU1NXB4J10sXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGRlbWFyY2F0ZVBvcHVwSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDlm77niYfmi5bmi73mn6Xor6JcclxuICAgIHB1YmxpYyBvbkRyb3BDb21wbGV0ZShkcmFnRGF0YTogYW55LCBldnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYua2V5d29yZCA9IFwiXCI7XHJcbiAgICAgICAgbGV0IGl0ZW06YW55ID0ge1xyXG4gICAgICAgICAgICBpZDogMCxcclxuICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgIGtleTogXCJcIlxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChkcmFnRGF0YS5BY2Nlc3NMb2cpIHtcclxuICAgICAgICAgICAgc2VsZi5jYXJJbWdMaXN0ID0gW107XHJcbiAgICAgICAgICAgIGl0ZW0uZmVhdHVyZVNlYXJjaEV4dCA9IHtcclxuICAgICAgICAgICAgICAgIGFjY2Vzc0xvZ0lkOiBkcmFnRGF0YS5BY2Nlc3NMb2cuSUQsXHJcbiAgICAgICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJBY2Nlc3NGZWF0dXJlXCIsXHJcbiAgICAgICAgICAgICAgICBpbWdVcmw6IGRyYWdEYXRhLkFjY2Vzc0xvZy5GYWNlUGF0aFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpdGVtLnZhbHVlID0gZHJhZ0RhdGEuQWNjZXNzTG9nLkZhY2VQYXRoO1xyXG4gICAgICAgICAgICBpdGVtLmtleSA9IGRyYWdEYXRhLkFjY2Vzc0xvZy5JRDtcclxuICAgICAgICAgICAgaWYgKHNlbGYuZmFjZUltZ0xpc3QubGVuZ3RoID4gNCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5FeGNlZWRXYXJuKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmZhY2VJbWdMaXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmZhY2VJbWdMaXN0LmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgYXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5pZCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZWxmLmZhY2VJbWdMaXN0ID0gW107XHJcbiAgICAgICAgICAgIGl0ZW0uZmVhdHVyZVNlYXJjaEV4dCA9IHtcclxuICAgICAgICAgICAgICAgIGFjY2Vzc0xvZ0lkOiBkcmFnRGF0YS5pZCxcclxuICAgICAgICAgICAgICAgIGZlYXR1cmVUeXBlOiBcIkFjY2Vzc0ZlYXR1cmVcIixcclxuICAgICAgICAgICAgICAgIGltZ1VybDogZHJhZ0RhdGEucGFub3JhbWFJbWFnZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpdGVtLnZhbHVlID0gZHJhZ0RhdGEucGFub3JhbWFJbWFnZTtcclxuICAgICAgICAgICAgaXRlbS5rZXkgPSBkcmFnRGF0YS5pZDtcclxuICAgICAgICAgICAgaWYgKHNlbGYuY2FySW1nTGlzdC5sZW5ndGggPiA0KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLkV4Y2VlZFdhcm4oKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuY2FySW1nTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jYXJJbWdMaXN0LmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgYXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5pZCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEV4Y2VlZFdhcm4oKSB7XHJcbiAgICAgICAgdGhpcy5sYXllckRlYy5pbmZvKCfmnIDlpJrmlK/mjIHkuIrkvKA15byg5Zu+54mHJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ29Ub0FkdmFuY2VkKCkge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoUGF0dGVyblN0YXR1cyA9IDI7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ21hcC1jbGVhci1kcmF3JywgXCJcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKFwiUXVpY2tTZWFyY2hDb250cm9sbGVyXCIsIFF1aWNrU2VhcmNoQ29udHJvbGxlcik7Il19
