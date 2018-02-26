define(["require", "exports", "text!./tplAlarmDetail.html", "../../common/app/main.app", "../../common/Pagination", "../../common/directive/page/page-params", "../../common/factory/attribute.factory", "css!./style/tplAlarmList.css", "./alarmDetail.controller", "../../common/services/analysis.service", "../../common/services/resourceRetrieval.service"], function (require, exports, alarmDetailHtml, main_app_1, Pagination_1, page_params_1, attribute_factory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AlarmListController = (function () {
        function AlarmListController($scope, $timeout, layer, analysisService, layerDec, resourceRetrievalService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.layer = layer;
            this.analysisService = analysisService;
            this.layerDec = layerDec;
            this.resourceRetrievalService = resourceRetrievalService;
            this.ShowAlarmStatus = false;
            this.resultParams = new Pagination_1.PageParamsAndResult();
            this.Pagination = new Pagination_1.Pagination();
            this.PersonAlarmParams = {};
            this.isSearchAlarmParams = true;
            this.alarmdataListTotal = 0;
            this.name = '';
            this.attributeFactory = new attribute_factory_1.AttributeFactory();
            this.name = this.$scope.name;
            var time = this.attributeFactory.getCrossTrainTime(1);
            this.startTime = time.startTime;
            this.endTime = time.endTime;
            this.PersonAlarmParams.startTime = this.startTime;
            this.PersonAlarmParams.endTime = this.endTime;
            this.PersonAlarmParams.arrCameraId = [this.$scope.ID];
            this.PersonAlarmParams.pageSize = 10;
            this.PersonAlarmParams.currentPage = 1;
            this.PersonAlarmParams.alarmType = 'WiFi';
            this.getServerAlarmMessage(this.PersonAlarmParams);
            var self = this;
            this.$scope.$on('clickCollect', function (a, item, index) {
                self.clickCollect(item);
            });
            this.$scope.$on('clickSurveillance', function (a, item, index) {
                self.clickSurveillance(item);
            });
            this.$scope.$on('clickAnalysis', function (a, item, index) {
                self.clickAnalysis(item);
            });
        }
        AlarmListController.prototype.changeTime = function () {
            var starttime = new Date(this.startTime.replace(/-/g, '.')).getTime(), endtime = new Date(this.endTime.replace(/-/g, '.')).getTime();
            if (starttime > endtime) {
                this.layerDec.warnInfo("开始时间不能大于结束时间！");
                return;
            }
            this.PersonAlarmParams.startTime = this.startTime;
            this.PersonAlarmParams.endTime = this.endTime;
            this.isSearchAlarmParams = true;
            this.getServerAlarmMessage(this.PersonAlarmParams);
        };
        AlarmListController.prototype.closePopup = function () {
        };
        AlarmListController.prototype.lookCollectDetail = function (actIndex) {
            var scope = this.$scope.$new();
            scope.activeIndex = actIndex;
            scope.dataList = this.MockWifiAlarmList;
            scope.name = this.name;
            scope.index = "alarmDetailHtml";
            if (this.index) {
                this.layer.close(this.index);
            }
            this.index = this.layer.open({
                content: alarmDetailHtml,
                type: 1,
                skin: 'no-scroll',
                title: ['Wi-Fi报警详情', 'font-weight: bold;background-color: #F6F8FB;color: #606060;height: 40px;'],
                area: ['500px', '260px'],
                shade: 0,
                offset: ['200px', '700px'],
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        };
        AlarmListController.prototype.initPagagion = function (type) {
            if (type == 1) {
                var pageParams = new page_params_1.default();
                pageParams.pageSize = 10;
                pageParams.currentPage = 1;
                pageParams.totalCount = this.alarmdataListTotal;
                this.resultParams = pageParams;
            }
        };
        AlarmListController.prototype.getServerAlarmMessage = function (searchParams) {
            var self = this;
            this.analysisService.searchPersonAlarm(this.PersonAlarmParams).then(function (res) {
                if (res.code === 200) {
                    self.alarmdataListTotal = res.data.TotalCount;
                    if (self.isSearchAlarmParams) {
                        self.initPagagion(2);
                    }
                    self.isSearchAlarmParams = false;
                    self.MockWifiAlarmList = res.data.Result;
                }
            });
        };
        AlarmListController.prototype.changePage = function (num) {
            this.resultParams.currentPage = num;
            this.PersonAlarmParams.currentPage = num;
            this.getServerAlarmMessage(this.PersonAlarmParams);
            return this.resultParams;
        };
        AlarmListController.prototype.clickCollect = function (item) {
            var self = this;
            if (!item.collectStatus) {
                var params = {
                    json: JSON.stringify(item),
                    objectID: item.wifiLog.ID,
                    objectType: "WiFi"
                };
                self.resourceRetrievalService.collectAddInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            else {
                var params = {
                    ids: item.wifiLog.ID
                };
                self.resourceRetrievalService.collectDeleteInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            item.collectStatus = !item.collectStatus;
        };
        AlarmListController.prototype.clickSurveillance = function (item) {
            item.surveillanceStatus = !item.surveillanceStatus;
        };
        AlarmListController.prototype.clickAnalysis = function (item) {
        };
        AlarmListController.$inject = ['$scope', '$timeout', 'layer', 'analysisService', 'layerDec', 'resourceRetrievalService'];
        return AlarmListController;
    }());
    main_app_1.app.controller('alarmListController', AlarmListController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFwUG9pbnQvd2lmaVJlc291cmNlUG9pbnQvYWxhcm1MaXN0LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBeUJBO1FBZUksNkJBQ1ksTUFBVSxFQUNWLFFBQWtCLEVBQ2xCLEtBQVMsRUFDVCxlQUFpQyxFQUNqQyxRQUFtQixFQUNuQix3QkFBbUQ7WUFMbkQsV0FBTSxHQUFOLE1BQU0sQ0FBSTtZQUNWLGFBQVEsR0FBUixRQUFRLENBQVU7WUFDbEIsVUFBSyxHQUFMLEtBQUssQ0FBSTtZQUNULG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtZQUNqQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1lBQ25CLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMkI7WUFuQi9ELG9CQUFlLEdBQVksS0FBSyxDQUFDO1lBSWpDLGlCQUFZLEdBQXdCLElBQUksZ0NBQW1CLEVBQUUsQ0FBQztZQUM5RCxlQUFVLEdBQWdCLElBQUksdUJBQVUsRUFBRSxDQUFDO1lBRTNDLHNCQUFpQixHQUFzQixFQUF1QixDQUFDO1lBQy9ELHdCQUFtQixHQUFXLElBQUksQ0FBQztZQUNuQyx1QkFBa0IsR0FBVSxDQUFDLENBQUM7WUFDOUIsU0FBSSxHQUFXLEVBQUUsQ0FBQztZQUVsQixxQkFBZ0IsR0FBcUIsSUFBSSxvQ0FBZ0IsRUFBRSxDQUFDO1lBU3hELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFFN0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFFNUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2xELElB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QztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksTUFBTSxHQUF3QjtvQkFDOUIsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtpQkFDdkIsQ0FBQztnQkFDRixJQUFJLENBQUMsd0JBQXdCLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDO3FCQUNsRCxJQUFJLENBQUMsVUFBQyxHQUFRO29CQUNYLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBRVYsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQTtZQUNWLENBQUM7WUFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM3QyxDQUFDO1FBTU0sK0NBQWlCLEdBQXhCLFVBQXlCLElBQVU7WUFDL0IsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQ3ZELENBQUM7UUFNTSwyQ0FBYSxHQUFwQixVQUFxQixJQUFVO1FBQy9CLENBQUM7UUF0TE0sMkJBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBQywwQkFBMEIsQ0FBQyxDQUFDO1FBdUwvRywwQkFBQztLQXhMRCxBQXdMQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9tYXBQb2ludC93aWZpUmVzb3VyY2VQb2ludC9hbGFybUxpc3QuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi90cGxBbGFybURldGFpbC5odG1sXCIgbmFtZT1cImFsYXJtRGV0YWlsSHRtbFwiIC8+XHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgJ2NzcyEuL3N0eWxlL3RwbEFsYXJtTGlzdC5jc3MnO1xyXG5pbXBvcnQgJy4vYWxhcm1EZXRhaWwuY29udHJvbGxlcic7XHJcbmltcG9ydCB7UGFnZVBhcmFtc0FuZFJlc3VsdCwgUGFnaW5hdGlvbiwgSVBhZ2luYXRpb259IGZyb20gJy4uLy4uL2NvbW1vbi9QYWdpbmF0aW9uJztcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FuYWx5c2lzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgSUFuYWx5c2lzU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvYW5hbHlzaXMuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBBbGFybVJlc3VsdEluZm8sIFBlcnNvbkFsYXJtUGFyYW1zLCBQZXJzb25BbGFybVJlc3VsdCB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9QZXJzb25BbGFybUVudW1cIjtcclxuLy8g5Y+C5pWwXHJcbmltcG9ydCBQYWdlUGFyYW1zIGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3BhZ2UvcGFnZS1wYXJhbXNcIjtcclxuLy8g5o+Q56S65qGGXHJcbmltcG9ydCB7IElMYXllckRlYyB9IGZyb20gXCIuLi8uLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcbi8vIHdpZmnljoblj7Lmo4DntKLmlbDmja5cclxuaW1wb3J0IHtcclxuICAgIHdpZmksXHJcbiAgICBDb2xsZWN0QWRkUGFyYW1zLFxyXG4gICAgQ29sbGVjdERlbGV0ZVBhcmFtc1xyXG59IGZyb20gJy4uLy4uL3Jlc291cmNlUmV0cmlldmFsL3Jlc291cmNlUmV0cmlldmFsRW51bSc7XHJcbi8vIOWFrOWFseaWueazlSDml7bpl7TmoLzlvI/ljJZcclxuaW1wb3J0IHsgQXR0cmlidXRlRmFjdG9yeSB9IGZyb20gXCIuLi8uLi9jb21tb24vZmFjdG9yeS9hdHRyaWJ1dGUuZmFjdG9yeVwiO1xyXG4vLyDor7fmsYLlnLDlnYBcclxuaW1wb3J0ICcuLi8uLi9jb21tb24vc2VydmljZXMvcmVzb3VyY2VSZXRyaWV2YWwuc2VydmljZSc7XHJcbmltcG9ydCB7IElSZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb21tb24vc2VydmljZXMvcmVzb3VyY2VSZXRyaWV2YWwuc2VydmljZSc7XHJcbmRlY2xhcmUgbGV0ICQ6IGFueSwgYWxhcm1EZXRhaWxIdG1sOmFueTtcclxuXHJcbmNsYXNzIEFsYXJtTGlzdENvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsICckdGltZW91dCcsICdsYXllcicsICdhbmFseXNpc1NlcnZpY2UnLCAnbGF5ZXJEZWMnLCdyZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UnXTtcclxuICAgIFNob3dBbGFybVN0YXR1czogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgc3RhcnRUaW1lOiBzdHJpbmc7XHJcbiAgICBlbmRUaW1lOiBzdHJpbmc7XHJcbiAgICBNb2NrV2lmaUFsYXJtTGlzdDphbnk7XHJcbiAgICByZXN1bHRQYXJhbXM6IFBhZ2VQYXJhbXNBbmRSZXN1bHQgPSBuZXcgUGFnZVBhcmFtc0FuZFJlc3VsdCgpO1xyXG4gICAgUGFnaW5hdGlvbjogSVBhZ2luYXRpb24gPSBuZXcgUGFnaW5hdGlvbigpO1xyXG4gICAgaW5kZXg6YW55O1xyXG4gICAgUGVyc29uQWxhcm1QYXJhbXM6IFBlcnNvbkFsYXJtUGFyYW1zID0ge30gYXMgUGVyc29uQWxhcm1QYXJhbXM7XHJcbiAgICBpc1NlYXJjaEFsYXJtUGFyYW1zOmJvb2xlYW4gPSB0cnVlO1xyXG4gICAgYWxhcm1kYXRhTGlzdFRvdGFsOm51bWJlciA9IDA7XHJcbiAgICBuYW1lOiBzdHJpbmcgPSAnJztcclxuICAgIC8vIOWFrOeUqOaWueazlVxyXG4gICAgYXR0cmlidXRlRmFjdG9yeTogQXR0cmlidXRlRmFjdG9yeSA9IG5ldyBBdHRyaWJ1dGVGYWN0b3J5KCk7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlICRzY29wZTphbnksXHJcbiAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogRnVuY3Rpb24sXHJcbiAgICAgICAgcHJpdmF0ZSBsYXllcjphbnksXHJcbiAgICAgICAgcHJpdmF0ZSBhbmFseXNpc1NlcnZpY2U6IElBbmFseXNpc1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBsYXllckRlYzogSUxheWVyRGVjLFxyXG4gICAgICAgIHByaXZhdGUgcmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlOiBJUmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLFxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy4kc2NvcGUubmFtZTtcclxuICAgICAgICAvL+iuvue9ruaXtumXtOaPkuS7tum7mOiupOaXtumXtCBcclxuICAgICAgICBsZXQgdGltZSA9IHRoaXMuYXR0cmlidXRlRmFjdG9yeS5nZXRDcm9zc1RyYWluVGltZSgxKTtcclxuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IHRpbWUuc3RhcnRUaW1lO1xyXG4gICAgICAgIHRoaXMuZW5kVGltZSA9IHRpbWUuZW5kVGltZTtcclxuICAgICAgICAvLyDmiqXorabor7fmsYLlj4LmlbBcclxuICAgICAgICB0aGlzLlBlcnNvbkFsYXJtUGFyYW1zLnN0YXJ0VGltZSA9IHRoaXMuc3RhcnRUaW1lO1xyXG4gICAgICAgIHRoaXMuUGVyc29uQWxhcm1QYXJhbXMuZW5kVGltZSA9IHRoaXMuZW5kVGltZTtcclxuICAgICAgICB0aGlzLlBlcnNvbkFsYXJtUGFyYW1zLmFyckNhbWVyYUlkID0gW3RoaXMuJHNjb3BlLklEXTtcclxuICAgICAgICAvLyB0aGlzLlBlcnNvbkFsYXJtUGFyYW1zLmFyckNhbWVyYUlkID0gWycwMDA3MTYwNTEyMTUxODI4ODM1NiddO1xyXG4gICAgICAgIHRoaXMuUGVyc29uQWxhcm1QYXJhbXMucGFnZVNpemUgPSAxMDtcclxuICAgICAgICB0aGlzLlBlcnNvbkFsYXJtUGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICB0aGlzLlBlcnNvbkFsYXJtUGFyYW1zLmFsYXJtVHlwZSA9ICdXaUZpJztcclxuICAgICAgICB0aGlzLmdldFNlcnZlckFsYXJtTWVzc2FnZSh0aGlzLlBlcnNvbkFsYXJtUGFyYW1zKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyDnm5HlkKzkuovku7ZcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJG9uKCdjbGlja0NvbGxlY3QnLCAoYTogYW55LCBpdGVtOiBhbnksIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5jbGlja0NvbGxlY3QoaXRlbSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLiRzY29wZS4kb24oJ2NsaWNrU3VydmVpbGxhbmNlJywgKGE6IGFueSwgaXRlbTogYW55LCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuY2xpY2tTdXJ2ZWlsbGFuY2UoaXRlbSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLiRzY29wZS4kb24oJ2NsaWNrQW5hbHlzaXMnLCAoYTogYW55LCBpdGVtOiBhbnksIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5jbGlja0FuYWx5c2lzKGl0ZW0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2hhbmdlVGltZSgpe1xyXG4gICAgICAgIC8vIOaXtumXtOajgOa1i1xyXG4gICAgICAgIGxldCBzdGFydHRpbWUgPSBuZXcgRGF0ZSh0aGlzLnN0YXJ0VGltZS5yZXBsYWNlKC8tL2csJy4nKSkuZ2V0VGltZSgpLFxyXG4gICAgICAgICAgICBlbmR0aW1lICAgPSBuZXcgRGF0ZSh0aGlzLmVuZFRpbWUucmVwbGFjZSgvLS9nLCcuJykpLmdldFRpbWUoKTtcclxuICAgICAgICAvLyDml7bpl7TovpPlhaXplJnor6/nu4jmraLmo4DntKJcclxuICAgICAgICBpZihzdGFydHRpbWUgPiBlbmR0aW1lKXtcclxuICAgICAgICAgICAgdGhpcy5sYXllckRlYy53YXJuSW5mbyhcIuW8gOWni+aXtumXtOS4jeiDveWkp+S6jue7k+adn+aXtumXtO+8gVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlBlcnNvbkFsYXJtUGFyYW1zLnN0YXJ0VGltZSA9IHRoaXMuc3RhcnRUaW1lO1xyXG4gICAgICAgIHRoaXMuUGVyc29uQWxhcm1QYXJhbXMuZW5kVGltZSA9IHRoaXMuZW5kVGltZTtcclxuICAgICAgICB0aGlzLmlzU2VhcmNoQWxhcm1QYXJhbXM9dHJ1ZTtcclxuICAgICAgICB0aGlzLmdldFNlcnZlckFsYXJtTWVzc2FnZSh0aGlzLlBlcnNvbkFsYXJtUGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2VQb3B1cCgpe1xyXG4gICAgICAgIC8vIHRoaXMubXlsYXllci5jbG9zZSh0aGlzLiRzY29wZS5pbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5pi+56S6d2lmaeivpuaDhVxyXG4gICAgcHVibGljIGxvb2tDb2xsZWN0RGV0YWlsKGFjdEluZGV4Om51bWJlcil7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IGxheWVyOiBhbnk7IGluZGV4OiBzdHJpbmcsICRkZXN0cm95OiBGdW5jdGlvbiwgYWN0aXZlSW5kZXg6IG51bWJlciwgZGF0YUxpc3Q6IEFycmF5PGFueT4sbmFtZTpzdHJpbmd9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIC8vIOW9k+WJjeeCueWHu+eahOe0ouW8lVxyXG4gICAgICAgIHNjb3BlLmFjdGl2ZUluZGV4ID0gYWN0SW5kZXg7XHJcbiAgICAgICAgc2NvcGUuZGF0YUxpc3QgPSB0aGlzLk1vY2tXaWZpQWxhcm1MaXN0O1xyXG4gICAgICAgIHNjb3BlLm5hbWUgID10aGlzLm5hbWU7XHJcblxyXG4gICAgICAgIHNjb3BlLmluZGV4ID0gXCJhbGFybURldGFpbEh0bWxcIjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZSh0aGlzLmluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGFsYXJtRGV0YWlsSHRtbCxcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgc2tpbjogJ25vLXNjcm9sbCcsXHJcbiAgICAgICAgICAgIHRpdGxlOiBbJ1dpLUZp5oql6K2m6K+m5oOFJywgJ2ZvbnQtd2VpZ2h0OiBib2xkO2JhY2tncm91bmQtY29sb3I6ICNGNkY4RkI7Y29sb3I6ICM2MDYwNjA7aGVpZ2h0OiA0MHB4OyddLFxyXG4gICAgICAgICAgICBhcmVhOiBbJzUwMHB4JywgJzI2MHB4J10sXHJcbiAgICAgICAgICAgIHNoYWRlOiAwLFxyXG4gICAgICAgICAgICBvZmZzZXQ6IFsnMjAwcHgnLCAnNzAwcHgnXSxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9u5Yid5aeL5YyW5YiG6aG15ZmoXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdHlwZSBcclxuICAgICAqIHR5cGUgPSAxO+aKk+aLjeiusOW9leWIhumhtVxyXG4gICAgICogdHlwZSA9IDI75oql6K2m6K6w5b2V5YiG6aG1XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdFBhZ2FnaW9uKHR5cGU6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0eXBlID09IDEpIHtcclxuICAgICAgICAgICAgbGV0IHBhZ2VQYXJhbXMgPSBuZXcgUGFnZVBhcmFtcygpO1xyXG4gICAgICAgICAgICBwYWdlUGFyYW1zLnBhZ2VTaXplID0gMTA7XHJcbiAgICAgICAgICAgIHBhZ2VQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgICAgICBwYWdlUGFyYW1zLnRvdGFsQ291bnQgPSB0aGlzLmFsYXJtZGF0YUxpc3RUb3RhbDtcclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMgPSBwYWdlUGFyYW1zO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbuivt+axgueUteWbtOWOhuWPsuaKpeitpuaVsOaNrlxyXG4gICAgICogQHBhcmFtIHtQZXJzb25BbGFybVBhcmFtc30gUGVyc29uQWxhcm1QYXJhbXMg6K+35rGC5Y+C5pWwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTZXJ2ZXJBbGFybU1lc3NhZ2Uoc2VhcmNoUGFyYW1zOiBQZXJzb25BbGFybVBhcmFtcykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLmFuYWx5c2lzU2VydmljZS5zZWFyY2hQZXJzb25BbGFybSh0aGlzLlBlcnNvbkFsYXJtUGFyYW1zKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hbGFybWRhdGFMaXN0VG90YWwgPSByZXMuZGF0YS5Ub3RhbENvdW50O1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuaXNTZWFyY2hBbGFybVBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaW5pdFBhZ2FnaW9uKDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VsZi5pc1NlYXJjaEFsYXJtUGFyYW1zID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzZWxmLk1vY2tXaWZpQWxhcm1MaXN0ID0gcmVzLmRhdGEuUmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoYW5nZVBhZ2UobnVtOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMuY3VycmVudFBhZ2UgPSBudW07XHJcbiAgICAgICAgdGhpcy5QZXJzb25BbGFybVBhcmFtcy5jdXJyZW50UGFnZSA9IG51bTtcclxuICAgICAgICB0aGlzLmdldFNlcnZlckFsYXJtTWVzc2FnZSh0aGlzLlBlcnNvbkFsYXJtUGFyYW1zKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHRQYXJhbXNcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5pS26JeP5LiO5Y+W5raI5pS26JePXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xpY2tDb2xsZWN0KGl0ZW06IHdpZmkpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFpdGVtLmNvbGxlY3RTdGF0dXMpIHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtczogQ29sbGVjdEFkZFBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgIGpzb246IEpTT04uc3RyaW5naWZ5KGl0ZW0pLFxyXG4gICAgICAgICAgICAgICAgb2JqZWN0SUQ6IGl0ZW0ud2lmaUxvZy5JRCxcclxuICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IFwiV2lGaVwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHNlbGYucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmNvbGxlY3RBZGRJbmZvKHBhcmFtcylcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1zOiBDb2xsZWN0RGVsZXRlUGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgaWRzOiBpdGVtLndpZmlMb2cuSURcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2VsZi5yZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UuY29sbGVjdERlbGV0ZUluZm8ocGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpdGVtLmNvbGxlY3RTdGF0dXMgPSAhaXRlbS5jb2xsZWN0U3RhdHVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOW4g+aOp+S4juWPlua2iOW4g+aOp1xyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsaWNrU3VydmVpbGxhbmNlKGl0ZW06IHdpZmkpIHtcclxuICAgICAgICBpdGVtLnN1cnZlaWxsYW5jZVN0YXR1cyA9ICFpdGVtLnN1cnZlaWxsYW5jZVN0YXR1cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDliIbmnpBcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGlja0FuYWx5c2lzKGl0ZW06IHdpZmkpIHtcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ2FsYXJtTGlzdENvbnRyb2xsZXInLCBBbGFybUxpc3RDb250cm9sbGVyKTsiXX0=
