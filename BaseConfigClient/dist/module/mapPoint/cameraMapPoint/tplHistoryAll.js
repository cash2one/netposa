define(["require", "exports", "text!../../fullPlayPopup/fullPlayPopup.html", "../../common/app/main.app", "./camera.paging", "../../common/factory/attribute.factory", "../../../core/enum/ObjectType", "../../../core/server/enum/AnalysisDataType", "lodash", "css!./style/cameraMapPoint.css", "../../fullPlayPopup/fullPlayPopup.controller", "../../common/services/resourceRetrieval.service", "../../common/services/analysis.service", "../../common/factory/userinfo.cache.factory", "../../common/factory/CheckIntelligentAnalysis.factory", "../../common/factory/HandleStorage.factory", "./camera.paging", "../../../core/server/AlarmModule"], function (require, exports, fullPlayPopupHtml, main_app_1, camera_paging_1, attribute_factory_1, ObjectType_1, AnalysisDataType_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var cameraPointHistoryAll = (function () {
        function cameraPointHistoryAll($scope, $timeout, layerDec, layer, resourceRetrievalService, analysisService, userInfoCacheFactory, checkIntelligentAnalysis, handleStorage) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.layerDec = layerDec;
            this.layer = layer;
            this.resourceRetrievalService = resourceRetrievalService;
            this.analysisService = analysisService;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.checkIntelligentAnalysis = checkIntelligentAnalysis;
            this.handleStorage = handleStorage;
            this.historyIsShowAlarm = false;
            this.showStatus = true;
            this.resultParams = new camera_paging_1.PageParams();
            this.resultAlarmParams = new camera_paging_1.PageParams();
            this.searchParams = {};
            this.attributeFactory = new attribute_factory_1.AttributeFactory();
            this.SubcribeAccessListTotal = 0;
            this.SubcribeAlarmListTotal = 0;
            this.isSearchAlarmParams = true;
            this.PersonAlarmParams = {};
            this.analysisGoTo = AnalysisDataType_1.AnalysisGoToType;
            this.showStatus = $scope.showStatus;
            var time = this.attributeFactory.getCrossTrainTime(0);
            this.startTime = time.startTime;
            this.endTime = time.endTime;
            this.searchParams.startTime = this.startTime;
            this.searchParams.endTime = this.endTime;
            this.searchParams.arrCameraId = [this.$scope.ID];
            this.searchParams.currentPage = 1;
            this.searchParams.pageSize = 10;
            this.searchParams.orderBy = {
                isAsc: false,
            };
            this.searchParams.isFirstSearch = true;
            this.getServerMessage(this.searchParams);
            this.PersonAlarmParams.startTime = this.startTime;
            this.PersonAlarmParams.endTime = this.endTime;
            this.PersonAlarmParams.arrCameraId = [this.$scope.ID];
            this.PersonAlarmParams.pageSize = 6;
            this.PersonAlarmParams.currentPage = 1;
            this.PersonAlarmParams.alarmType = 'Camera';
            this.getServerAlarmMessage(this.PersonAlarmParams);
            this.$scope.$on('$destroy', function () {
                $scope.$emit('closeiframe');
            });
            this.checkFaceTrack = this.checkIntelligentAnalysis.checkFaceTrack();
            this.checkAccompanyingAnalysis = this.checkIntelligentAnalysis.checkAccompanyingAnalysis();
            this.checkFrequencyAnalysis = this.checkIntelligentAnalysis.checkFrequencyAnalysis();
            this.checkAnalysis = this.checkIntelligentAnalysis.checkAnalysis();
        }
        cameraPointHistoryAll.prototype.showCameraStatus = function (flag) {
            this.showStatus = flag;
        };
        cameraPointHistoryAll.prototype.changePage = function (num) {
            if (this.showStatus) {
                this.resultAlarmParams.currentPage = num;
                this.PersonAlarmParams.currentPage = num;
                this.getServerAlarmMessage(this.PersonAlarmParams);
                return this.resultAlarmParams;
            }
            if (!this.showStatus) {
                this.resultParams.currentPage = num;
                this.searchParams.currentPage = num;
                this.getServerMessage(this.searchParams);
                return this.resultParams;
            }
        };
        cameraPointHistoryAll.prototype.getServerMessage = function (searchParams) {
            var self = this;
            self.resourceRetrievalService.advancedSearchByFace(searchParams)
                .then(function (res) {
                if (res.code === 200) {
                    if ((typeof res.data !== 'undefined') && (res.data.Face.TotalCount > 0)) {
                        self.disposeCommonData(res.data.Face);
                    }
                    else {
                        self.layerDec.info("没有检索到数据");
                    }
                }
                else {
                    self.layerDec.warnInfo("查询结果失败");
                }
            });
        };
        cameraPointHistoryAll.prototype.disposeCommonData = function (data) {
            var self = this;
            var params = {
                deviceIds: [],
                deviceType: '',
                ids: [],
                userId: self.userInfoCacheFactory.getCurrentUserId()
            };
            params.deviceType = ObjectType_1.ObjectType.Camera.value;
            _.forEach(data.Result, function (value) {
                params.deviceIds.push(value.AccessLog.CameraID);
                params.ids.push(value.AccessLog.ID);
            });
            self.resourceRetrievalService.getDeviceInfoPromise(params).then(function (res) {
                _.forEach(data.Result, function (item, index) {
                    item.deviceInfo = res.data.deviceInfo[index];
                    item.collectStatus = res.data.collectStatus[index];
                });
                self.$timeout(function () {
                    self.SubcribeAccessListTotal = data.TotalCount;
                    self.SubcribeAccessList = data.Result;
                    if (self.searchParams.isFirstSearch) {
                        self.initPagagion(1);
                    }
                    self.searchParams.isFirstSearch = false;
                    self.searchParams.taskId = data.TaskId;
                });
            });
        };
        cameraPointHistoryAll.prototype.getServerAlarmMessage = function (searchParams) {
            var self = this;
            this.analysisService.searchPersonAlarm(this.PersonAlarmParams).then(function (res) {
                if (res.code === 200) {
                    self.SubcribeAlarmListTotal = res.data.TotalCount;
                    if (self.isSearchAlarmParams) {
                        self.initPagagion(2);
                    }
                    self.isSearchAlarmParams = false;
                    self.SubcribeAlarmList = res.data.Result;
                }
            });
        };
        cameraPointHistoryAll.prototype.initPagagion = function (type) {
            if (type == 1) {
                var pageParams = new camera_paging_1.PageParams();
                pageParams.pageSize = 10;
                pageParams.currentPage = 1;
                pageParams.totalCount = this.SubcribeAccessListTotal;
                this.resultParams = pageParams;
            }
            if (type == 2) {
                var pageParams = new camera_paging_1.PageParams();
                pageParams.pageSize = 10;
                pageParams.currentPage = 1;
                pageParams.totalCount = this.SubcribeAlarmListTotal;
                this.resultAlarmParams = pageParams;
            }
        };
        cameraPointHistoryAll.prototype.changeTime = function () {
            var starttime = new Date(this.startTime.replace(/-/g, '.')).getTime(), endtime = new Date(this.endTime.replace(/-/g, '.')).getTime();
            if (starttime > endtime) {
                this.layerDec.warnInfo("开始时间不能大于结束时间！");
                return;
            }
            this.searchParams.isFirstSearch = true;
            this.searchParams.currentPage = 1;
            this.searchParams.startTime = this.startTime;
            this.searchParams.endTime = this.endTime;
            this.getServerMessage(this.searchParams);
            this.PersonAlarmParams.startTime = this.startTime;
            this.PersonAlarmParams.endTime = this.endTime;
            this.PersonAlarmParams.currentPage = 1;
            this.isSearchAlarmParams = true;
            this.getServerAlarmMessage(this.PersonAlarmParams);
        };
        cameraPointHistoryAll.prototype.clickCollect = function (event, item) {
            if (event) {
                event.stopPropagation();
            }
            var self = this, data = item.AccessLog || item.AlarmLog;
            if (!item.collectStatus) {
                var params = {
                    json: JSON.stringify(data),
                    objectID: data.ID,
                    objectType: "Face"
                };
                self.resourceRetrievalService.collectAddInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            else {
                var params = {
                    ids: data.ID
                };
                self.resourceRetrievalService.collectDeleteInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            item.collectStatus = !item.collectStatus;
        };
        cameraPointHistoryAll.prototype.clickAnalysis = function (item, type) {
            var storageParams = AnalysisDataType_1.AnalysisDataType.Face;
            storageParams.data = item;
            this.handleStorage.setSessionStorageData(storageParams.key, storageParams);
            localStorage.setItem("AnalysisType", "Face");
            if (type === AnalysisDataType_1.AnalysisGoToType.Track.key) {
                window.open(AnalysisDataType_1.AnalysisGoToType.Track.data);
            }
            else if (type === AnalysisDataType_1.AnalysisGoToType.Accompanying.key) {
                window.open(AnalysisDataType_1.AnalysisGoToType.Accompanying.data);
            }
            else if (type === AnalysisDataType_1.AnalysisGoToType.Frequency.key) {
                window.open(AnalysisDataType_1.AnalysisGoToType.Frequency.data);
            }
            else if (type === AnalysisDataType_1.AnalysisGoToType.More.key) {
                window.open(AnalysisDataType_1.AnalysisGoToType.More.data);
            }
        };
        cameraPointHistoryAll.prototype.clickSurveillance = function (event, item) {
            if (event) {
                event.stopPropagation();
            }
            item.surveillanceStatus = !item.surveillanceStatus;
        };
        cameraPointHistoryAll.prototype.fullPlay = function (item) {
            var scope = this.$scope.$new();
            scope.index = "fullPlayPopup";
            scope.PointDeTail = this.$scope.cameraInfo;
            scope.PointDeTail.type = 2;
            scope.PointDeTail.time = item.AlarmLog.AlarmTime;
            this.layer.open({
                type: 1,
                skin: 'no-scroll',
                title: ['查看视频', 'font-weight: bold;background-color: #F6F8FB;color: #606060;height: 40px;'],
                area: ['680px', '433px'],
                content: fullPlayPopupHtml,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        };
        cameraPointHistoryAll.$inject = ['$scope', '$timeout', 'layerDec', 'layer', 'resourceRetrievalService', 'analysisService', 'userInfoCacheFactory', 'checkIntelligentAnalysis', 'handleStorage'];
        return cameraPointHistoryAll;
    }());
    main_app_1.app.controller('cameraPointHistoryAll', cameraPointHistoryAll);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFwUG9pbnQvY2FtZXJhTWFwUG9pbnQvdHBsSGlzdG9yeUFsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFzREE7UUErQkksK0JBQW9CLE1BQVcsRUFDWCxRQUFhLEVBQ2IsUUFBYSxFQUNiLEtBQVUsRUFDVix3QkFBbUQsRUFDbkQsZUFBaUMsRUFDakMsb0JBQTJDLEVBQzNDLHdCQUFtRCxFQUNuRCxhQUE2QjtZQVI3QixXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQ1gsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUNiLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYixVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQ1YsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEyQjtZQUNuRCxvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7WUFDakMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF1QjtZQUMzQyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTJCO1lBQ25ELGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtZQW5DakQsdUJBQWtCLEdBQVksS0FBSyxDQUFDO1lBQ3BDLGVBQVUsR0FBWSxJQUFJLENBQUM7WUFRM0IsaUJBQVksR0FBZSxJQUFJLDBCQUFVLEVBQUUsQ0FBQztZQUM1QyxzQkFBaUIsR0FBZSxJQUFJLDBCQUFVLEVBQUUsQ0FBQztZQUVqRCxpQkFBWSxHQUFxQixFQUFzQixDQUFDO1lBRXhELHFCQUFnQixHQUFxQixJQUFJLG9DQUFnQixFQUFFLENBQUM7WUFFNUQsNEJBQXVCLEdBQVcsQ0FBQyxDQUFDO1lBQ3BDLDJCQUFzQixHQUFXLENBQUMsQ0FBQztZQUNuQyx3QkFBbUIsR0FBWSxJQUFJLENBQUM7WUFDcEMsc0JBQWlCLEdBQXNCLEVBQXVCLENBQUM7WUFFL0QsaUJBQVksR0FBRyxtQ0FBZ0IsQ0FBQztZQWU1QixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7WUFJcEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFn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eEIsT0FBTyxFQUFFLGlCQUFpQjtnQkFDMUIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osR0FBRyxFQUFFO29CQUNELEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDckIsQ0FBQzthQUNKLENBQUMsQ0FBQztRQUNQLENBQUM7UUFsVE0sNkJBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxpQkFBaUIsRUFBRSxzQkFBc0IsRUFBRSwwQkFBMEIsRUFBRSxlQUFlLENBQUMsQ0FBQztRQW9UckwsNEJBQUM7S0FyVEQsQUFxVEMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLEVBQUUscUJBQXFCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvbWFwUG9pbnQvY2FtZXJhTWFwUG9pbnQvdHBsSGlzdG9yeUFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vLi4vZnVsbFBsYXlQb3B1cC9mdWxsUGxheVBvcHVwLmh0bWxcIiBuYW1lPVwiZnVsbFBsYXlQb3B1cEh0bWxcIiAvPlxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0ICdjc3MhLi9zdHlsZS9jYW1lcmFNYXBQb2ludC5jc3MnO1xyXG5cclxuLy8g5by55qGGXHJcbmltcG9ydCAnLi4vLi4vZnVsbFBsYXlQb3B1cC9mdWxsUGxheVBvcHVwLmNvbnRyb2xsZXInO1xyXG5cclxuIC8vIOacjeWKoVxyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9yZXNvdXJjZVJldHJpZXZhbC5zZXJ2aWNlJztcclxuaW1wb3J0IHtJUmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlfSBmcm9tICcuLi8uLi9jb21tb24vc2VydmljZXMvcmVzb3VyY2VSZXRyaWV2YWwuc2VydmljZSc7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FuYWx5c2lzLnNlcnZpY2UnO1xyXG5pbXBvcnQge0lBbmFseXNpc1NlcnZpY2V9IGZyb20gJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hbmFseXNpcy5zZXJ2aWNlJztcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL2ZhY3RvcnkvdXNlcmluZm8uY2FjaGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQge0lVc2VySW5mb0NhY2hlRmFjdG9yeX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L3VzZXJpbmZvLmNhY2hlLmZhY3RvcnlcIjtcclxuaW1wb3J0ICcuLi8uLi9jb21tb24vZmFjdG9yeS9DaGVja0ludGVsbGlnZW50QW5hbHlzaXMuZmFjdG9yeSc7XHJcbmltcG9ydCB7SUNoZWNrSW50ZWxsaWdlbnRBbmFseXNpc30gZnJvbSAnLi4vLi4vY29tbW9uL2ZhY3RvcnkvQ2hlY2tJbnRlbGxpZ2VudEFuYWx5c2lzLmZhY3RvcnknO1xyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9mYWN0b3J5L0hhbmRsZVN0b3JhZ2UuZmFjdG9yeSc7XHJcbmltcG9ydCB7SUhhbmRsZVN0b3JhZ2V9IGZyb20gJy4uLy4uL2NvbW1vbi9mYWN0b3J5L0hhbmRsZVN0b3JhZ2UuZmFjdG9yeSc7XHJcbi8vIOWPguaVsFxyXG5pbXBvcnQge0lDYW1lcmFQYWdpbmdTZXJ2aWNlLCBQYWdlUGFyYW1zfSBmcm9tIFwiLi9jYW1lcmEucGFnaW5nXCI7XHJcbmltcG9ydCBcIi4vY2FtZXJhLnBhZ2luZ1wiXHJcbmltcG9ydCB7QWNjZXNzTG9nfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2ZXIvQWNjZXNzTG9nXCI7XHJcbmltcG9ydCBcIi4uLy4uLy4uL2NvcmUvc2VydmVyL0FsYXJtTW9kdWxlXCJcclxuaW1wb3J0IHtcclxuICAgIEZhY2VTZWFyY2hQYXJhbXMsXHJcbiAgICBtdWx0aXBsZUNob2ljZSxcclxuICAgIFNleExpc3QsXHJcbiAgICBDcm9zc1RyYWluVGltZUxpc3QsXHJcbiAgICBQYXR0ZXJuTGlzdCxcclxuICAgIEVxdWlwbWVudExpc3QsXHJcbiAgICBBZ2VMaXN0LFxyXG4gICAgQ2xvdGhlc0xpc3QsXHJcbiAgICBIYWlyTGlzdCxcclxuICAgIFNob2VMaXN0LFxyXG4gICAgR2xhc3Nlc0xpc3QsXHJcbiAgICBNYXNrTGlzdCxcclxuICAgIENhcExpc3RcclxufSBmcm9tICcuLi8uLi9yZXNvdXJjZVJldHJpZXZhbC9zZWFyY2gvYWR2YW5jZWRTZWFyY2gvYWRWYW5jZVNlYXJjaEVudW0nO1xyXG5pbXBvcnQge0F0dHJpYnV0ZUZhY3Rvcnl9IGZyb20gXCIuLi8uLi9jb21tb24vZmFjdG9yeS9hdHRyaWJ1dGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQge1xyXG4gICAgZmFjZSxcclxuICAgIGZhY2VJdGVtLFxyXG4gICAgaW5pdEZhY2VSZXN1bHQsXHJcbiAgICBRdWVyeUl0ZW0sXHJcbiAgICBDb2xsZWN0QWRkUGFyYW1zLFxyXG4gICAgQ29sbGVjdERlbGV0ZVBhcmFtc1xyXG59IGZyb20gJy4uLy4uL3Jlc291cmNlUmV0cmlldmFsL3Jlc291cmNlUmV0cmlldmFsRW51bSc7XHJcbmltcG9ydCB7QWxhcm1SZXN1bHRJbmZvLCBQZXJzb25BbGFybVBhcmFtcywgUGVyc29uQWxhcm1SZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9QZXJzb25BbGFybUVudW1cIjtcclxuaW1wb3J0IHtPYmplY3RUeXBlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudW0vT2JqZWN0VHlwZSc7XHJcbmltcG9ydCB7QW5hbHlzaXNEYXRhVHlwZSwgQW5hbHlzaXNTdG9yYWdlUGFyYW1zLCBBbmFseXNpc0dvVG9UeXBlfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9BbmFseXNpc0RhdGFUeXBlXCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5cclxuZGVjbGFyZSBsZXQgJDogYW55LCBmdWxsUGxheVBvcHVwSHRtbDogYW55O1xyXG5cclxuY2xhc3MgY2FtZXJhUG9pbnRIaXN0b3J5QWxsIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnJHRpbWVvdXQnLCAnbGF5ZXJEZWMnLCAnbGF5ZXInLCAncmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlJywgJ2FuYWx5c2lzU2VydmljZScsICd1c2VySW5mb0NhY2hlRmFjdG9yeScsICdjaGVja0ludGVsbGlnZW50QW5hbHlzaXMnLCAnaGFuZGxlU3RvcmFnZSddO1xyXG5cclxuICAgIC8v5oql6K2m44CB5oqT5ouN5YiH5o2iXHJcbiAgICBoaXN0b3J5SXNTaG93QWxhcm06IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHNob3dTdGF0dXM6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgLy/mkYTlg4/lpLTmlbDmja5cclxuICAgIFN1YmNyaWJlQWNjZXNzTGlzdDogQXJyYXk8QWNjZXNzTG9nPjtcclxuICAgIFN1YmNyaWJlQWxhcm1MaXN0OiBBcnJheTxhbnk+O1xyXG4gICAgLy8g5pe26Ze0XHJcbiAgICBzdGFydFRpbWU6IHN0cmluZztcclxuICAgIGVuZFRpbWU6IHN0cmluZztcclxuICAgIC8v5YiG6aG15p2h5Lu2XHJcbiAgICByZXN1bHRQYXJhbXM6IFBhZ2VQYXJhbXMgPSBuZXcgUGFnZVBhcmFtcygpO1xyXG4gICAgcmVzdWx0QWxhcm1QYXJhbXM6IFBhZ2VQYXJhbXMgPSBuZXcgUGFnZVBhcmFtcygpO1xyXG4gICAgLy/mipPmi43lj4LmlbBcclxuICAgIHNlYXJjaFBhcmFtczogRmFjZVNlYXJjaFBhcmFtcyA9IHt9IGFzIEZhY2VTZWFyY2hQYXJhbXM7XHJcbiAgICAvLyDlhaznlKjmlrnms5VcclxuICAgIGF0dHJpYnV0ZUZhY3Rvcnk6IEF0dHJpYnV0ZUZhY3RvcnkgPSBuZXcgQXR0cmlidXRlRmFjdG9yeSgpO1xyXG4gICAgLy8g5qOA57Si5pWw5o2u5p2h5pWwXHJcbiAgICBTdWJjcmliZUFjY2Vzc0xpc3RUb3RhbDogbnVtYmVyID0gMDtcclxuICAgIFN1YmNyaWJlQWxhcm1MaXN0VG90YWw6IG51bWJlciA9IDA7XHJcbiAgICBpc1NlYXJjaEFsYXJtUGFyYW1zOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIFBlcnNvbkFsYXJtUGFyYW1zOiBQZXJzb25BbGFybVBhcmFtcyA9IHt9IGFzIFBlcnNvbkFsYXJtUGFyYW1zO1xyXG5cclxuICAgIGFuYWx5c2lzR29UbyA9IEFuYWx5c2lzR29Ub1R5cGU7XHJcbiAgICBjaGVja0ZhY2VUcmFjazogYm9vbGVhbjtcclxuICAgIGNoZWNrQWNjb21wYW55aW5nQW5hbHlzaXM6IGJvb2xlYW47XHJcbiAgICBjaGVja0ZyZXF1ZW5jeUFuYWx5c2lzOiBib29sZWFuO1xyXG4gICAgY2hlY2tBbmFseXNpczogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsYXllckRlYzogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsYXllcjogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZXNvdXJjZVJldHJpZXZhbFNlcnZpY2U6IElSZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFuYWx5c2lzU2VydmljZTogSUFuYWx5c2lzU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgdXNlckluZm9DYWNoZUZhY3Rvcnk6IElVc2VySW5mb0NhY2hlRmFjdG9yeSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgY2hlY2tJbnRlbGxpZ2VudEFuYWx5c2lzOiBJQ2hlY2tJbnRlbGxpZ2VudEFuYWx5c2lzLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBoYW5kbGVTdG9yYWdlOiBJSGFuZGxlU3RvcmFnZSl7XHJcbiAgICAgICAgdGhpcy5zaG93U3RhdHVzID0gJHNjb3BlLnNob3dTdGF0dXM7XHJcbiAgICAgICAgLy8gdGhpcy5zaG93Q2FtZXJhU3RhdHVzKHRoaXMuc2hvd1N0YXR1cyk7XHJcbiAgICAgICAgLy/liJ3lp4vljJbmipPmi40g5p+l6K+i5pWw5o2uXHJcbiAgICAgICAgLy/orr7nva7ml7bpl7Tmj5Lku7bpu5jorqTml7bpl7QgXHJcbiAgICAgICAgbGV0IHRpbWUgPSB0aGlzLmF0dHJpYnV0ZUZhY3RvcnkuZ2V0Q3Jvc3NUcmFpblRpbWUoMCk7XHJcbiAgICAgICAgdGhpcy5zdGFydFRpbWUgPSB0aW1lLnN0YXJ0VGltZTtcclxuICAgICAgICB0aGlzLmVuZFRpbWUgPSB0aW1lLmVuZFRpbWU7XHJcbiAgICAgICAgLy/liJ3lp4vljJbpu5jorqTor7fmsYLmlbDmja5cclxuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcy5zdGFydFRpbWUgPSB0aGlzLnN0YXJ0VGltZTtcclxuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcy5lbmRUaW1lID0gdGhpcy5lbmRUaW1lO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoUGFyYW1zLmFyckNhbWVyYUlkID0gW3RoaXMuJHNjb3BlLklEXTtcclxuICAgICAgICAvLyB0aGlzLnNlYXJjaFBhcmFtcy5hcnJDYW1lcmFJZCA9IFtcIjkzNTk2MTYwMTk0NDQ4MzE1MVwiXTtcclxuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hQYXJhbXMucGFnZVNpemUgPSAxMDtcclxuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcy5vcmRlckJ5ID0ge1xyXG4gICAgICAgICAgICBpc0FzYzogZmFsc2UsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcy5pc0ZpcnN0U2VhcmNoID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmdldFNlcnZlck1lc3NhZ2UodGhpcy5zZWFyY2hQYXJhbXMpO1xyXG5cclxuICAgICAgICAvLyDmiqXorabor7fmsYLlj4LmlbBcclxuICAgICAgICB0aGlzLlBlcnNvbkFsYXJtUGFyYW1zLnN0YXJ0VGltZSA9IHRoaXMuc3RhcnRUaW1lO1xyXG4gICAgICAgIHRoaXMuUGVyc29uQWxhcm1QYXJhbXMuZW5kVGltZSA9IHRoaXMuZW5kVGltZTtcclxuICAgICAgICB0aGlzLlBlcnNvbkFsYXJtUGFyYW1zLmFyckNhbWVyYUlkID0gW3RoaXMuJHNjb3BlLklEXTtcclxuICAgICAgICAvLyB0aGlzLnNlYXJjaFBhcmFtcy5hcnJDYW1lcmFJZCA9IFtcIjkzNTk2MTYwMTk0NDQ4MzE1MVwiXTtcclxuICAgICAgICB0aGlzLlBlcnNvbkFsYXJtUGFyYW1zLnBhZ2VTaXplID0gNjtcclxuICAgICAgICB0aGlzLlBlcnNvbkFsYXJtUGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICB0aGlzLlBlcnNvbkFsYXJtUGFyYW1zLmFsYXJtVHlwZSA9ICdDYW1lcmEnO1xyXG4gICAgICAgIHRoaXMuZ2V0U2VydmVyQWxhcm1NZXNzYWdlKHRoaXMuUGVyc29uQWxhcm1QYXJhbXMpO1xyXG5cclxuICAgICAgICB0aGlzLiRzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAkc2NvcGUuJGVtaXQoJ2Nsb3NlaWZyYW1lJylcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLmNoZWNrRmFjZVRyYWNrID0gdGhpcy5jaGVja0ludGVsbGlnZW50QW5hbHlzaXMuY2hlY2tGYWNlVHJhY2soKTtcclxuICAgICAgICB0aGlzLmNoZWNrQWNjb21wYW55aW5nQW5hbHlzaXMgPSB0aGlzLmNoZWNrSW50ZWxsaWdlbnRBbmFseXNpcy5jaGVja0FjY29tcGFueWluZ0FuYWx5c2lzKCk7XHJcbiAgICAgICAgdGhpcy5jaGVja0ZyZXF1ZW5jeUFuYWx5c2lzID0gdGhpcy5jaGVja0ludGVsbGlnZW50QW5hbHlzaXMuY2hlY2tGcmVxdWVuY3lBbmFseXNpcygpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tBbmFseXNpcyA9IHRoaXMuY2hlY2tJbnRlbGxpZ2VudEFuYWx5c2lzLmNoZWNrQW5hbHlzaXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93Q2FtZXJhU3RhdHVzKGZsYWc6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLnNob3dTdGF0dXMgPSBmbGFnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWIhumhteiOt+WPllxyXG4gICAgY2hhbmdlUGFnZShudW06IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLnNob3dTdGF0dXMpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRBbGFybVBhcmFtcy5jdXJyZW50UGFnZSA9IG51bTtcclxuICAgICAgICAgICAgdGhpcy5QZXJzb25BbGFybVBhcmFtcy5jdXJyZW50UGFnZSA9IG51bTtcclxuICAgICAgICAgICAgdGhpcy5nZXRTZXJ2ZXJBbGFybU1lc3NhZ2UodGhpcy5QZXJzb25BbGFybVBhcmFtcyk7XHJcbiAgICAgICAgICAgIC8vIOafpeivouWOhuWPslxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHRBbGFybVBhcmFtcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLnNob3dTdGF0dXMpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMuY3VycmVudFBhZ2UgPSBudW07XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoUGFyYW1zLmN1cnJlbnRQYWdlID0gbnVtO1xyXG4gICAgICAgICAgICB0aGlzLmdldFNlcnZlck1lc3NhZ2UodGhpcy5zZWFyY2hQYXJhbXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHRQYXJhbXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9u6I635Y+W5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0ge0ZhY2VTZWFyY2hQYXJhbXN9IHNlYXJjaFBhcmFtc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFNlcnZlck1lc3NhZ2Uoc2VhcmNoUGFyYW1zOiBGYWNlU2VhcmNoUGFyYW1zKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmFkdmFuY2VkU2VhcmNoQnlGYWNlKHNlYXJjaFBhcmFtcylcclxuICAgICAgICAgICAgLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihyZXMuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh0eXBlb2YgcmVzLmRhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAocmVzLmRhdGEuRmFjZS5Ub3RhbENvdW50ID4gMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNwb3NlQ29tbW9uRGF0YShyZXMuZGF0YS5GYWNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMuaW5mbyhcIuayoeacieajgOe0ouWIsOaVsOaNrlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXllckRlYy53YXJuSW5mbyhcIuafpeivoue7k+aenOWksei0pVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb27lpITnkIbmn6Xor6LmlbDmja5cclxuICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGlzcG9zZUNvbW1vbkRhdGEoZGF0YTogYW55KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBwYXJhbXM6YW55ID0ge1xyXG4gICAgICAgICAgICBkZXZpY2VJZHM6IFtdLFxyXG4gICAgICAgICAgICBkZXZpY2VUeXBlOiAnJyxcclxuICAgICAgICAgICAgaWRzOiBbXSxcclxuICAgICAgICAgICAgdXNlcklkOiBzZWxmLnVzZXJJbmZvQ2FjaGVGYWN0b3J5LmdldEN1cnJlbnRVc2VySWQoKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcGFyYW1zLmRldmljZVR5cGUgPSBPYmplY3RUeXBlLkNhbWVyYS52YWx1ZTtcclxuICAgICAgICBfLmZvckVhY2goZGF0YS5SZXN1bHQsZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5kZXZpY2VJZHMucHVzaCh2YWx1ZS5BY2Nlc3NMb2cuQ2FtZXJhSUQpO1xyXG4gICAgICAgICAgICBwYXJhbXMuaWRzLnB1c2godmFsdWUuQWNjZXNzTG9nLklEKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5nZXREZXZpY2VJbmZvUHJvbWlzZShwYXJhbXMpLnRoZW4oKHJlczphbnkpPT57XHJcbiAgICAgICAgICAgIF8uZm9yRWFjaChkYXRhLlJlc3VsdCxmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uZGV2aWNlSW5mbyA9IHJlcy5kYXRhLmRldmljZUluZm9baW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jb2xsZWN0U3RhdHVzID0gcmVzLmRhdGEuY29sbGVjdFN0YXR1c1tpbmRleF07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNlbGYuU3ViY3JpYmVBY2Nlc3NMaXN0VG90YWwgPSBkYXRhLlRvdGFsQ291bnQ7XHJcbiAgICAgICAgICAgICAgICBzZWxmLlN1YmNyaWJlQWNjZXNzTGlzdCA9IGRhdGEuUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuc2VhcmNoUGFyYW1zLmlzRmlyc3RTZWFyY2gpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmluaXRQYWdhZ2lvbigxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLmlzRmlyc3RTZWFyY2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLnRhc2tJZCA9IGRhdGEuVGFza0lkO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbuivt+axgueUteWbtOWOhuWPsuaKpeitpuaVsOaNrlxyXG4gICAgICogQHBhcmFtIHtQZXJzb25BbGFybVBhcmFtc30gUGVyc29uQWxhcm1QYXJhbXMg6K+35rGC5Y+C5pWwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTZXJ2ZXJBbGFybU1lc3NhZ2Uoc2VhcmNoUGFyYW1zOiBQZXJzb25BbGFybVBhcmFtcykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLmFuYWx5c2lzU2VydmljZS5zZWFyY2hQZXJzb25BbGFybSh0aGlzLlBlcnNvbkFsYXJtUGFyYW1zKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5TdWJjcmliZUFsYXJtTGlzdFRvdGFsID0gcmVzLmRhdGEuVG90YWxDb3VudDtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLmlzU2VhcmNoQWxhcm1QYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmluaXRQYWdhZ2lvbigyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlbGYuaXNTZWFyY2hBbGFybVBhcmFtcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5TdWJjcmliZUFsYXJtTGlzdCA9IHJlcy5kYXRhLlJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9u5Yid5aeL5YyW5YiG6aG15ZmoXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdHlwZVxyXG4gICAgICogdHlwZSA9IDE75oqT5ouN6K6w5b2V5YiG6aG1XHJcbiAgICAgKiB0eXBlID0gMjvmiqXoraborrDlvZXliIbpobVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0UGFnYWdpb24odHlwZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICBsZXQgcGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKCk7XHJcbiAgICAgICAgICAgIHBhZ2VQYXJhbXMucGFnZVNpemUgPSAxMDtcclxuICAgICAgICAgICAgcGFnZVBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgIHBhZ2VQYXJhbXMudG90YWxDb3VudCA9IHRoaXMuU3ViY3JpYmVBY2Nlc3NMaXN0VG90YWw7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0UGFyYW1zID0gcGFnZVBhcmFtcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICBsZXQgcGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKCk7XHJcbiAgICAgICAgICAgIHBhZ2VQYXJhbXMucGFnZVNpemUgPSAxMDtcclxuICAgICAgICAgICAgcGFnZVBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgIHBhZ2VQYXJhbXMudG90YWxDb3VudCA9IHRoaXMuU3ViY3JpYmVBbGFybUxpc3RUb3RhbDtcclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRBbGFybVBhcmFtcyA9IHBhZ2VQYXJhbXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOaUueWPmOaXtumXtFxyXG4gICAgICogQHBhcmFtIHtEYXRlfSB2YWx1ZSDlvZPliY3ngrnpgInmi6nnmoTml7bpl7RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjaGFuZ2VUaW1lKCkge1xyXG4gICAgICAgIC8vIOaXtumXtOajgOa1i1xyXG4gICAgICAgIGxldCBzdGFydHRpbWUgPSBuZXcgRGF0ZSh0aGlzLnN0YXJ0VGltZS5yZXBsYWNlKC8tL2csICcuJykpLmdldFRpbWUoKSxcclxuICAgICAgICAgICAgZW5kdGltZSA9IG5ldyBEYXRlKHRoaXMuZW5kVGltZS5yZXBsYWNlKC8tL2csICcuJykpLmdldFRpbWUoKTtcclxuICAgICAgICAvLyDml7bpl7TovpPlhaXplJnor6/nu4jmraLmo4DntKJcclxuICAgICAgICBpZiAoc3RhcnR0aW1lID4gZW5kdGltZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKFwi5byA5aeL5pe26Ze05LiN6IO95aSn5LqO57uT5p2f5pe26Ze077yBXCIpO1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5pe26Ze05pS55Y+Y77yM6YeN572u5pCc57Si5Y+C5pWwIGFuZCDmkJzntKLnirbmgIFcclxuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcy5pc0ZpcnN0U2VhcmNoID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hQYXJhbXMuc3RhcnRUaW1lID0gdGhpcy5zdGFydFRpbWU7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hQYXJhbXMuZW5kVGltZSA9IHRoaXMuZW5kVGltZTtcclxuICAgICAgICB0aGlzLmdldFNlcnZlck1lc3NhZ2UodGhpcy5zZWFyY2hQYXJhbXMpO1xyXG4gICAgICAgIHRoaXMuUGVyc29uQWxhcm1QYXJhbXMuc3RhcnRUaW1lID0gdGhpcy5zdGFydFRpbWU7XHJcbiAgICAgICAgdGhpcy5QZXJzb25BbGFybVBhcmFtcy5lbmRUaW1lID0gdGhpcy5lbmRUaW1lO1xyXG4gICAgICAgIHRoaXMuUGVyc29uQWxhcm1QYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMuaXNTZWFyY2hBbGFybVBhcmFtcyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5nZXRTZXJ2ZXJBbGFybU1lc3NhZ2UodGhpcy5QZXJzb25BbGFybVBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5pS26JeP5LiO5Y+W5raI5pS26JePXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xpY2tDb2xsZWN0KGV2ZW50OiBhbnksIGl0ZW06IGZhY2UpIHtcclxuICAgICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcywgZGF0YSA9IGl0ZW0uQWNjZXNzTG9nIHx8IGl0ZW0uQWxhcm1Mb2c7XHJcbiAgICAgICAgaWYgKCFpdGVtLmNvbGxlY3RTdGF0dXMpIHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtczogQ29sbGVjdEFkZFBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgIGpzb246IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgICAgICAgICAgICAgb2JqZWN0SUQ6IGRhdGEuSUQsXHJcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBcIkZhY2VcIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5jb2xsZWN0QWRkSW5mbyhwYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtczogQ29sbGVjdERlbGV0ZVBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgIGlkczogZGF0YS5JRFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5jb2xsZWN0RGVsZXRlSW5mbyhwYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGl0ZW0uY29sbGVjdFN0YXR1cyA9ICFpdGVtLmNvbGxlY3RTdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5YiG5p6QXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xpY2tBbmFseXNpcyhpdGVtOiBmYWNlLCB0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgc3RvcmFnZVBhcmFtczogQW5hbHlzaXNTdG9yYWdlUGFyYW1zID0gQW5hbHlzaXNEYXRhVHlwZS5GYWNlO1xyXG4gICAgICAgIHN0b3JhZ2VQYXJhbXMuZGF0YSA9IGl0ZW07XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTdG9yYWdlLnNldFNlc3Npb25TdG9yYWdlRGF0YShzdG9yYWdlUGFyYW1zLmtleSwgc3RvcmFnZVBhcmFtcyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJBbmFseXNpc1R5cGVcIiwgXCJGYWNlXCIpO1xyXG4gICAgICAgIGlmICh0eXBlID09PSBBbmFseXNpc0dvVG9UeXBlLlRyYWNrLmtleSkge1xyXG4gICAgICAgICAgICB3aW5kb3cub3BlbihBbmFseXNpc0dvVG9UeXBlLlRyYWNrLmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gQW5hbHlzaXNHb1RvVHlwZS5BY2NvbXBhbnlpbmcua2V5KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKEFuYWx5c2lzR29Ub1R5cGUuQWNjb21wYW55aW5nLmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gQW5hbHlzaXNHb1RvVHlwZS5GcmVxdWVuY3kua2V5KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKEFuYWx5c2lzR29Ub1R5cGUuRnJlcXVlbmN5LmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gQW5hbHlzaXNHb1RvVHlwZS5Nb3JlLmtleSkge1xyXG4gICAgICAgICAgICB3aW5kb3cub3BlbihBbmFseXNpc0dvVG9UeXBlLk1vcmUuZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOW4g+aOp+S4juWPlua2iOW4g+aOp1xyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsaWNrU3VydmVpbGxhbmNlKGV2ZW50OiBhbnksIGl0ZW06IGZhY2UpIHtcclxuICAgICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGl0ZW0uc3VydmVpbGxhbmNlU3RhdHVzID0gIWl0ZW0uc3VydmVpbGxhbmNlU3RhdHVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOafpeeci+inhumikVxyXG4gICAgcHVibGljIGZ1bGxQbGF5KGl0ZW06IGFueSkge1xyXG4gICAgICAgIGxldCBzY29wZTogeyBsYXllcjogYW55OyBpbmRleDogc3RyaW5nLCAkZGVzdHJveTogRnVuY3Rpb24sIFBvaW50RGVUYWlsOiBhbnkgfSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS5pbmRleCA9IFwiZnVsbFBsYXlQb3B1cFwiO1xyXG4gICAgICAgIHNjb3BlLlBvaW50RGVUYWlsID0gdGhpcy4kc2NvcGUuY2FtZXJhSW5mbztcclxuICAgICAgICBzY29wZS5Qb2ludERlVGFpbC50eXBlID0gMjtcclxuICAgICAgICBzY29wZS5Qb2ludERlVGFpbC50aW1lID0gaXRlbS5BbGFybUxvZy5BbGFybVRpbWU7XHJcbiAgICAgICAgdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgc2tpbjogJ25vLXNjcm9sbCcsXHJcbiAgICAgICAgICAgIHRpdGxlOiBbJ+afpeeci+inhumikScsICdmb250LXdlaWdodDogYm9sZDtiYWNrZ3JvdW5kLWNvbG9yOiAjRjZGOEZCO2NvbG9yOiAjNjA2MDYwO2hlaWdodDogNDBweDsnXSxcclxuICAgICAgICAgICAgYXJlYTogWyc2ODBweCcsICc0MzNweCddLFxyXG4gICAgICAgICAgICBjb250ZW50OiBmdWxsUGxheVBvcHVwSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdjYW1lcmFQb2ludEhpc3RvcnlBbGwnLCBjYW1lcmFQb2ludEhpc3RvcnlBbGwpOyJdfQ==
