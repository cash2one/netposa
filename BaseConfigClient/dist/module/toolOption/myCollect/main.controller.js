define(["require", "exports", "text!../../detailPopup/carPopup/carPopup.html", "text!../../detailPopup/personPopup/personPopup.html", "text!../../detailPopup/wifiPopup/wifiPopup.html", "text!../../detailPopup/efPopup/efPopup.html", "../../common/app/main.app", "../../../core/enum/ObjectType", "moment", "css!./style/collect.css", "../../common/services/collect.service", "./../myCollect/myCollect.cache.factory", "../../common/factory/layerMsg.factory", "../../common/services/resourceRetrieval.service", "../../detailPopup/carPopup/carPopup.controller", "../../detailPopup/personPopup/personPopup.controller", "../../detailPopup/wifiPopup/wifiPopup.controller", "../../detailPopup/efPopup/efPopup.controller"], function (require, exports, carPopup, personPopup, wifiPopup, efPopup, main_app_1, ObjectType_1, moment) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MyCollectEnum = [
        {
            index: 0,
            value: null,
            text: "全部"
        },
        {
            index: 1,
            value: 'Face',
            text: "人像"
        },
        {
            index: 2,
            value: 'Car',
            text: ObjectType_1.ObjectType.Vehicle.text
        },
        {
            index: 3,
            value: ObjectType_1.ObjectType.Wifi.value,
            text: ObjectType_1.ObjectType.Wifi.text
        },
        {
            index: 4,
            value: ObjectType_1.ObjectType.ElectronicFence.value,
            text: ObjectType_1.ObjectType.ElectronicFence.text
        }
    ];
    var MyCollectController = (function () {
        function MyCollectController($scope, collectService, $q, myCollectFactory, $timeout, layerDec, resourceRetrievalService, layer) {
            var _this = this;
            this.$scope = $scope;
            this.collectService = collectService;
            this.$q = $q;
            this.myCollectFactory = myCollectFactory;
            this.$timeout = $timeout;
            this.layerDec = layerDec;
            this.resourceRetrievalService = resourceRetrievalService;
            this.layer = layer;
            this.allCollectPage = '../module/toolOption/myCollect/myCollectPage/allCollectPage.html?v=' + new Date().getTime();
            this.ButtonList = MyCollectEnum;
            this.selectedIndex = MyCollectEnum[0].index;
            this.searchParams = {};
            this.searchParams.startTime = moment().subtract(7, 'day').format('YYYY-MM-DD') + ' 00:00:00';
            this.searchParams.endTime = moment().format('YYYY-MM-DD') + ' 23:59:59';
            this.getCollectList(true);
            this.$scope.$on("$destroy", function () {
                _this.myCollectFactory.clearDatas();
            });
        }
        MyCollectController.prototype.changeIndex = function (data) {
            if (data.index === this.selectedIndex) {
                return;
            }
            this.selectedIndex = data.index;
            this.searchByObjectType(data.value);
        };
        MyCollectController.prototype.showFacePopup = function (item) {
            var _this = this;
            var scope = this.$scope.$new();
            scope.rank = 0;
            scope.allList = [item];
            scope.showFooter = true;
            scope.closePopup = function () {
                _this.layer.close(_this.layerIndex);
            };
            this.layerIndex = this.layer.open({
                type: 1,
                skin: 'detail-popup-box',
                title: false,
                area: ['600px', '420px'],
                content: personPopup,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        };
        MyCollectController.prototype.showCarPopup = function (item) {
            var _this = this;
            var scope = this.$scope.$new();
            scope.rank = 0;
            scope.allList = [item];
            scope.showFooter = true;
            scope.closePopup = function () {
                _this.layer.close(_this.layerIndex);
            };
            this.layerIndex = this.layer.open({
                type: 1,
                skin: 'detail-popup-box',
                title: false,
                area: ['670px', '400px'],
                content: carPopup,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        };
        MyCollectController.prototype.showWifiPopup = function (item) {
            var _this = this;
            var scope = this.$scope.$new();
            scope.rank = 0;
            scope.allList = [item];
            scope.showFooter = true;
            scope.closePopup = function () {
                _this.layer.close(_this.layerIndex);
            };
            this.layerIndex = this.layer.open({
                type: 1,
                skin: 'detail-popup-box',
                title: false,
                area: ['575px', '200px'],
                content: wifiPopup,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        };
        MyCollectController.prototype.showEfencePopup = function (item) {
            var _this = this;
            var scope = this.$scope.$new();
            scope.rank = 0;
            scope.allList = [item];
            scope.showFooter = true;
            scope.closePopup = function () {
                _this.layer.close(_this.layerIndex);
            };
            this.layerIndex = this.layer.open({
                type: 1,
                skin: 'detail-popup-box',
                title: false,
                area: ['575px', '200px'],
                content: efPopup,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        };
        MyCollectController.prototype.searchByObjectType = function (objectType) {
            this.searchParams.objectType = objectType;
            this.searchParams.startTime = moment().subtract(7, 'day').format('YYYY-MM-DD') + ' 00:00:00';
            this.searchParams.endTime = moment().format('YYYY-MM-DD') + ' 23:59:59';
            this.getCollectList(true);
        };
        MyCollectController.prototype.search = function () {
            if (this.startTime && this.endTime) {
                this.searchParams.startTime = this.startTime + ' 00:00:00';
                this.searchParams.endTime = this.endTime + ' 23:59:59';
                this.getCollectList(true);
            }
            else {
                this.layerDec.warnInfo('请输入有效时间!');
            }
        };
        MyCollectController.prototype.getCollectList = function (isClear) {
            var _this = this;
            this.collectService.findListByPage(this.searchParams)
                .then(function (res) {
                if (res && res.data && res.code === 200) {
                    if (isClear) {
                        _this.myCollectFactory.clearDatas();
                    }
                    _this.myCollectFactory.cacheDatas(res.data || []);
                    var result_1 = _this.myCollectFactory.getDatas();
                    console.log("获取收藏信息===============", result_1);
                    _this.$timeout(function () {
                        _this.collectDatas = result_1;
                    });
                }
            });
        };
        MyCollectController.prototype.getMoreAlarm = function () {
            this.searchParams.endTime = moment(this.searchParams.startTime).subtract(1, 'day').format('YYYY-MM-DD') + ' 23:59:59';
            this.searchParams.startTime = moment(this.searchParams.startTime).subtract(8, 'day').format('YYYY-MM-DD') + ' 00:00:00';
            this.getCollectList();
        };
        MyCollectController.prototype.expanderMore = function (data) {
            data.isExpand = !data.isExpand;
        };
        MyCollectController.prototype.isEfenceType = function (val) {
            return ObjectType_1.ObjectType.ElectronicFence.value === val;
        };
        MyCollectController.prototype.isWifiType = function (val) {
            return ObjectType_1.ObjectType.Wifi.value === val;
        };
        MyCollectController.prototype.isVehicleType = function (val) {
            return val === 'Car';
        };
        MyCollectController.prototype.isFaceType = function (val) {
            return val === "Face";
        };
        MyCollectController.prototype.unAttention = function (model, cacheDatas) {
            var _this = this;
            console.debug("unAttention", model);
            var opts = {
                content: "确认要移除此条收藏吗?",
                title: "确认",
                btnStrList: ["确定", "取消"],
                okBtnFun: function (index) {
                    _this._unAttention(model, cacheDatas).then(function () {
                        _this.layer.close(index);
                    });
                }
            };
            this.layerDec.confirm(opts);
        };
        MyCollectController.prototype.getValueByTimeKey = function (timeKey, paramName) {
            var arr = timeKey.split("-");
            var result = "";
            switch (paramName) {
                case "yyyy":
                    result = arr[0];
                    break;
                case "MM":
                    result = arr[1];
                    break;
                case "dd":
                    result = arr[2];
                    break;
            }
            return result;
        };
        MyCollectController.prototype._unAttention = function (model, cacheDatas) {
            var _this = this;
            return this.resourceRetrievalService.collectDeleteInfo({ ids: [model.ID] }).then(function (data) {
                if (data) {
                    _this.myCollectFactory.removeData(model, cacheDatas);
                }
                console.debug("collectDeleteInfo", data);
                return null;
            });
        };
        MyCollectController.$inject = ['$scope', 'collectService', '$q', 'myCollectFactory', '$timeout', 'layerDec',
            'resourceRetrievalService', 'layer'];
        return MyCollectController;
    }());
    main_app_1.app
        .controller('MyCollectController', MyCollectController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdG9vbE9wdGlvbi9teUNvbGxlY3QvbWFpbi5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQW1DQSxJQUFNLGFBQWEsR0FBRztRQUNsQjtZQUNJLEtBQUssRUFBRSxDQUFDO1lBQ1IsS0FBSyxFQUFFLElBQUk7WUFDWCxJQUFJLEVBQUUsSUFBSTtTQUNiO1FBQ0Q7WUFDSSxLQUFLLEVBQUUsQ0FBQztZQUNSLEtBQUssRUFBRSxNQUFNO1lBQ2IsSUFBSSxFQUFFLElBQUk7U0FDYjtRQUNEO1lBQ0ksS0FBSyxFQUFFLENBQUM7WUFDUixLQUFLLEVBQUUsS0FBSztZQUNaLElBQUksRUFBRSx1QkFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJO1NBQ2hDO1FBQ0Q7WUFDSSxLQUFLLEVBQUUsQ0FBQztZQUNSLEtBQUssRUFBRSx1QkFBVSxDQUFDLElBQUksQ0FBQyxLQUFLO1lBQzVCLElBQUksRUFBRSx1QkFBVSxDQUFDLElBQUksQ0FBQyxJQUFJO1NBQzdCO1FBQ0Q7WUFDSSxLQUFLLEVBQUUsQ0FBQztZQUNSLEtBQUssRUFBRSx1QkFBVSxDQUFDLGVBQWUsQ0FBQyxLQUFLO1lBQ3ZDLElBQUksRUFBRSx1QkFBVSxDQUFDLGVBQWUsQ0FBQyxJQUFJO1NBQ3hDO0tBU0EsQ0FBQztJQUVOO1FBZUksNkJBQW9CLE1BQW9CLEVBQ3BCLGNBQStCLEVBQy9CLEVBQU8sRUFDUCxnQkFBa0MsRUFDbEMsUUFBYSxFQUNiLFFBQW1CLEVBQ25CLHdCQUFtRCxFQUNuRCxLQUFVO1lBUDlCLGlCQWlCQztZQWpCbUIsV0FBTSxHQUFOLE1BQU0sQ0FBYztZQUNwQixtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7WUFDL0IsT0FBRSxHQUFGLEVBQUUsQ0FBSztZQUNQLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7WUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUNiLGFBQVEsR0FBUixRQUFRLENBQVc7WUFDbkIsNkJBQXdCLEdBQXhCLHdCQUF3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OEI7WUFBckUsaUJBU0M7WUFSRyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGlCQUFpQixDQUFDLEVBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFhO2dCQUN6RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNQLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUN4RCxDQUFDO2dCQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFFUCxDQUFDO1FBcFBNLDJCQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxVQUFVO1lBQzFGLDBCQUEwQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBcVA3QywwQkFBQztLQXZQRCxBQXVQQyxJQUFBO0lBRUQsY0FBRztTQUNFLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS90b29sT3B0aW9uL215Q29sbGVjdC9tYWluLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uLy4uL2RldGFpbFBvcHVwL2NhclBvcHVwL2NhclBvcHVwLmh0bWxcIiBuYW1lPVwiY2FyUG9wdXBcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uLy4uL2RldGFpbFBvcHVwL3BlcnNvblBvcHVwL3BlcnNvblBvcHVwLmh0bWxcIiBuYW1lPVwicGVyc29uUG9wdXBcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uLy4uL2RldGFpbFBvcHVwL3dpZmlQb3B1cC93aWZpUG9wdXAuaHRtbFwiIG5hbWU9XCJ3aWZpUG9wdXBcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uLy4uL2RldGFpbFBvcHVwL2VmUG9wdXAvZWZQb3B1cC5odG1sXCIgbmFtZT1cImVmUG9wdXBcIiAvPlxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IFwiY3NzIS4vc3R5bGUvY29sbGVjdC5jc3NcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2NvbGxlY3Quc2VydmljZVwiO1xyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0LCBQYWdlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7RW51bX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW51bS9FbnVtXCI7XHJcbmltcG9ydCB7SUNvbGxlY3RTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2NvbGxlY3Quc2VydmljZVwiO1xyXG5pbXBvcnQge1NlYXJjaENvbGxlY3RQYXJhbXN9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9Db2xsZWN0UGFyYW1zXCI7XHJcbmltcG9ydCB7T2JqZWN0VHlwZX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW51bS9PYmplY3RUeXBlXCI7XHJcbmltcG9ydCB7TXlDb2xsZWN0RmFjdG9yeSwgTXlDb2xsZWN0Vmlld01vZGVsfSBmcm9tICcuL215Q29sbGVjdC5jYWNoZS5mYWN0b3J5JztcclxuaW1wb3J0ICcuLy4uL215Q29sbGVjdC9teUNvbGxlY3QuY2FjaGUuZmFjdG9yeSc7XHJcbmltcG9ydCB7Q29sbGVjdEV4fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQ29sbGVjdEV4XCI7XHJcblxyXG5pbXBvcnQge0FuZ3VsYXJTY29wZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBlcy9iYXNlQW5ndWxhclNjb3BlXCI7XHJcbmltcG9ydCB7SUxheWVyRGVjLCBMYXllckNvbmZpcm1QYXJhbXN9IGZyb20gXCIuLi8uLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L2xheWVyTXNnLmZhY3RvcnlcIjtcclxuaW1wb3J0IHtJUmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Jlc291cmNlUmV0cmlldmFsLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Jlc291cmNlUmV0cmlldmFsLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7U2VhcmNoQWxhcm1Mb2dSZXN1bHR9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2VydmVyL0FsYXJtTW9kdWxlJztcclxuXHJcblxyXG5pbXBvcnQgXCIuLi8uLi9kZXRhaWxQb3B1cC9jYXJQb3B1cC9jYXJQb3B1cC5jb250cm9sbGVyXCI7XHJcbmltcG9ydCBcIi4uLy4uL2RldGFpbFBvcHVwL3BlcnNvblBvcHVwL3BlcnNvblBvcHVwLmNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFwiLi4vLi4vZGV0YWlsUG9wdXAvd2lmaVBvcHVwL3dpZmlQb3B1cC5jb250cm9sbGVyXCI7XHJcbmltcG9ydCBcIi4uLy4uL2RldGFpbFBvcHVwL2VmUG9wdXAvZWZQb3B1cC5jb250cm9sbGVyXCI7XHJcblxyXG5cclxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5kZWNsYXJlIGxldCBjYXJQb3B1cDogc3RyaW5nLHBlcnNvblBvcHVwOmFueSx3aWZpUG9wdXAsYW55LGVmUG9wdXA6YW55LCByZXF1aXJlOiBhbnk7XHJcblxyXG5jb25zdCBNeUNvbGxlY3RFbnVtID0gW1xyXG4gICAge1xyXG4gICAgICAgIGluZGV4OiAwLFxyXG4gICAgICAgIHZhbHVlOiBudWxsLFxyXG4gICAgICAgIHRleHQ6IFwi5YWo6YOoXCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgaW5kZXg6IDEsXHJcbiAgICAgICAgdmFsdWU6ICdGYWNlJyxcclxuICAgICAgICB0ZXh0OiBcIuS6uuWDj1wiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGluZGV4OiAyLFxyXG4gICAgICAgIHZhbHVlOiAnQ2FyJyxcclxuICAgICAgICB0ZXh0OiBPYmplY3RUeXBlLlZlaGljbGUudGV4dFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBpbmRleDogMyxcclxuICAgICAgICB2YWx1ZTogT2JqZWN0VHlwZS5XaWZpLnZhbHVlLFxyXG4gICAgICAgIHRleHQ6IE9iamVjdFR5cGUuV2lmaS50ZXh0XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGluZGV4OiA0LFxyXG4gICAgICAgIHZhbHVlOiBPYmplY3RUeXBlLkVsZWN0cm9uaWNGZW5jZS52YWx1ZSxcclxuICAgICAgICB0ZXh0OiBPYmplY3RUeXBlLkVsZWN0cm9uaWNGZW5jZS50ZXh0XHJcbiAgICB9LyogLFxyXG57XHJcbiAgICBpbmRleDogNixcclxuICAgIHZhbHVlOiBPYmplY3RUeXBlLkVsZWN0cm9uaWNGZW5jZS52YWx1ZSxcclxuICAgIHRleHQ6IFwi6K6+5aSHXCJcclxufSxcclxue1xyXG4gICAgaW5kZXg6IDcsXHJcbiAgICB0ZXh0OiBcIuS9jee9rlwiXHJcbn0gKi9dO1xyXG5cclxuY2xhc3MgTXlDb2xsZWN0Q29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJywgJ2NvbGxlY3RTZXJ2aWNlJywgJyRxJywgJ215Q29sbGVjdEZhY3RvcnknLCAnJHRpbWVvdXQnLCAnbGF5ZXJEZWMnLFxyXG4gICAgICAgICdyZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UnLCAnbGF5ZXInXTtcclxuICAgIEJ1dHRvbkxpc3Q6IEFycmF5PEVudW0+O1xyXG4gICAgc2VsZWN0ZWRJbmRleDogbnVtYmVyO1xyXG4gICAgLy/nrZvpgInmnaHku7ZcclxuICAgIHNlYXJjaFBhcmFtczogU2VhcmNoQ29sbGVjdFBhcmFtcztcclxuICAgIHN0YXJ0VGltZTogc3RyaW5nO1xyXG4gICAgZW5kVGltZTogc3RyaW5nO1xyXG4gICAgY29sbGVjdERhdGFzOiBBcnJheTxNeUNvbGxlY3RWaWV3TW9kZWw+O1xyXG4gICAgbW9yZUJ0bjogYm9vbGVhbjtcclxuICAgIC8vIOaJgOacieaUtuiXj1xyXG4gICAgYWxsQ29sbGVjdFBhZ2U6IHN0cmluZyA9ICcuLi9tb2R1bGUvdG9vbE9wdGlvbi9teUNvbGxlY3QvbXlDb2xsZWN0UGFnZS9hbGxDb2xsZWN0UGFnZS5odG1sP3Y9JyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgbGF5ZXJJbmRleDpudW1iZXI7XHJcbiAgICAvL+aVsOaNrlxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IEFuZ3VsYXJTY29wZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgY29sbGVjdFNlcnZpY2U6IElDb2xsZWN0U2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHE6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbXlDb2xsZWN0RmFjdG9yeTogTXlDb2xsZWN0RmFjdG9yeSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXJEZWM6IElMYXllckRlYyxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlOiBJUmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsYXllcjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5CdXR0b25MaXN0ID0gTXlDb2xsZWN0RW51bTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBNeUNvbGxlY3RFbnVtWzBdLmluZGV4O1xyXG4gICAgICAgIHRoaXMuc2VhcmNoUGFyYW1zID0ge30gYXMgU2VhcmNoQ29sbGVjdFBhcmFtcztcclxuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcy5zdGFydFRpbWUgPSBtb21lbnQoKS5zdWJ0cmFjdCg3LCAnZGF5JykuZm9ybWF0KCdZWVlZLU1NLUREJykgKyAnIDAwOjAwOjAwJztcclxuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcy5lbmRUaW1lID0gbW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREJykgKyAnIDIzOjU5OjU5JztcclxuICAgICAgICB0aGlzLmdldENvbGxlY3RMaXN0KHRydWUpO1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbihcIiRkZXN0cm95XCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5teUNvbGxlY3RGYWN0b3J5LmNsZWFyRGF0YXMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VJbmRleChkYXRhOiB7IGluZGV4OiBudW1iZXIsIHZhbHVlOiBzdHJpbmcgfSkge1xyXG4gICAgICAgIGlmIChkYXRhLmluZGV4ID09PSB0aGlzLnNlbGVjdGVkSW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBkYXRhLmluZGV4O1xyXG4gICAgICAgIC8vIOafpeaJvumhtemdolxyXG4gICAgICAgIHRoaXMuc2VhcmNoQnlPYmplY3RUeXBlKGRhdGEudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzaG93RmFjZVBvcHVwKGl0ZW06IFNlYXJjaEFsYXJtTG9nUmVzdWx0KSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOntyYW5rOm51bWJlcixzaG93Rm9vdGVyOmJvb2xlYW4sYWxsTGlzdDpBcnJheTxhbnk+LGNsb3NlUG9wdXA6RnVuY3Rpb24sJGRlc3Ryb3k6RnVuY3Rpb259ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLnJhbmsgPSAwO1xyXG4gICAgICAgIHNjb3BlLmFsbExpc3QgPSBbaXRlbV07XHJcbiAgICAgICAgc2NvcGUuc2hvd0Zvb3RlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUuY2xvc2VQb3B1cCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZSh0aGlzLmxheWVySW5kZXgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5sYXllckluZGV4ID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgc2tpbjogJ2RldGFpbC1wb3B1cC1ib3gnLFxyXG4gICAgICAgICAgICB0aXRsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFyZWE6IFsnNjAwcHgnLCAnNDIwcHgnXSxcclxuICAgICAgICAgICAgY29udGVudDogcGVyc29uUG9wdXAsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG4gICAgc2hvd0NhclBvcHVwKGl0ZW06IFNlYXJjaEFsYXJtTG9nUmVzdWx0KSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOntyYW5rOm51bWJlcixzaG93Rm9vdGVyOmJvb2xlYW4sYWxsTGlzdDpBcnJheTxhbnk+LGNsb3NlUG9wdXA6RnVuY3Rpb24sJGRlc3Ryb3k6RnVuY3Rpb259ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLnJhbmsgPSAwO1xyXG4gICAgICAgIHNjb3BlLmFsbExpc3QgPSBbaXRlbV07XHJcbiAgICAgICAgc2NvcGUuc2hvd0Zvb3RlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUuY2xvc2VQb3B1cCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZSh0aGlzLmxheWVySW5kZXgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5sYXllckluZGV4ID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgc2tpbjogJ2RldGFpbC1wb3B1cC1ib3gnLFxyXG4gICAgICAgICAgICB0aXRsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFyZWE6IFsnNjcwcHgnLCAnNDAwcHgnXSxcclxuICAgICAgICAgICAgY29udGVudDogY2FyUG9wdXAsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzaG93V2lmaVBvcHVwKGl0ZW06IFNlYXJjaEFsYXJtTG9nUmVzdWx0KSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOntyYW5rOm51bWJlcixzaG93Rm9vdGVyOmJvb2xlYW4sYWxsTGlzdDpBcnJheTxhbnk+LGNsb3NlUG9wdXA6RnVuY3Rpb24sJGRlc3Ryb3k6RnVuY3Rpb259ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLnJhbmsgPSAwO1xyXG4gICAgICAgIHNjb3BlLmFsbExpc3QgPSBbaXRlbV07XHJcbiAgICAgICAgc2NvcGUuc2hvd0Zvb3RlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUuY2xvc2VQb3B1cCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZSh0aGlzLmxheWVySW5kZXgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5sYXllckluZGV4ID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgc2tpbjogJ2RldGFpbC1wb3B1cC1ib3gnLFxyXG4gICAgICAgICAgICB0aXRsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFyZWE6IFsnNTc1cHgnLCAnMjAwcHgnXSxcclxuICAgICAgICAgICAgY29udGVudDogd2lmaVBvcHVwLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2hvd0VmZW5jZVBvcHVwKGl0ZW06IFNlYXJjaEFsYXJtTG9nUmVzdWx0KSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOntyYW5rOm51bWJlcixzaG93Rm9vdGVyOmJvb2xlYW4sYWxsTGlzdDpBcnJheTxhbnk+LGNsb3NlUG9wdXA6RnVuY3Rpb24sJGRlc3Ryb3k6RnVuY3Rpb259ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLnJhbmsgPSAwO1xyXG4gICAgICAgIHNjb3BlLmFsbExpc3QgPSBbaXRlbV07XHJcbiAgICAgICAgc2NvcGUuc2hvd0Zvb3RlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUuY2xvc2VQb3B1cCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZSh0aGlzLmxheWVySW5kZXgpO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICB0aGlzLmxheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBza2luOiAnZGV0YWlsLXBvcHVwLWJveCcsXHJcbiAgICAgICAgICAgIHRpdGxlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXJlYTogWyc1NzVweCcsICcyMDBweCddLFxyXG4gICAgICAgICAgICBjb250ZW50OiBlZlBvcHVwLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VhcmNoQnlPYmplY3RUeXBlKG9iamVjdFR5cGU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoUGFyYW1zLm9iamVjdFR5cGUgPSBvYmplY3RUeXBlO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoUGFyYW1zLnN0YXJ0VGltZSA9IG1vbWVudCgpLnN1YnRyYWN0KDcsICdkYXknKS5mb3JtYXQoJ1lZWVktTU0tREQnKSArICcgMDA6MDA6MDAnO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoUGFyYW1zLmVuZFRpbWUgPSBtb21lbnQoKS5mb3JtYXQoJ1lZWVktTU0tREQnKSArICcgMjM6NTk6NTknO1xyXG4gICAgICAgIHRoaXMuZ2V0Q29sbGVjdExpc3QodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VhcmNoKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0VGltZSAmJiB0aGlzLmVuZFRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hQYXJhbXMuc3RhcnRUaW1lID0gdGhpcy5zdGFydFRpbWUgKyAnIDAwOjAwOjAwJztcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hQYXJhbXMuZW5kVGltZSA9IHRoaXMuZW5kVGltZSArICcgMjM6NTk6NTknO1xyXG4gICAgICAgICAgICB0aGlzLmdldENvbGxlY3RMaXN0KHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXJEZWMud2FybkluZm8oJ+ivt+i+k+WFpeacieaViOaXtumXtCEnKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRDb2xsZWN0TGlzdChpc0NsZWFyPzogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuY29sbGVjdFNlcnZpY2UuZmluZExpc3RCeVBhZ2UodGhpcy5zZWFyY2hQYXJhbXMpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXM6IFJlc3BvbnNlUmVzdWx0PEFycmF5PENvbGxlY3RFeD4+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5kYXRhICYmIHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNDbGVhcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm15Q29sbGVjdEZhY3RvcnkuY2xlYXJEYXRhcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm15Q29sbGVjdEZhY3RvcnkuY2FjaGVEYXRhcyhyZXMuZGF0YSB8fCAoW10gYXMgQXJyYXk8Q29sbGVjdEV4PikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLm15Q29sbGVjdEZhY3RvcnkuZ2V0RGF0YXMoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuiOt+WPluaUtuiXj+S/oeaBrz09PT09PT09PT09PT09PVwiLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbGxlY3REYXRhcyA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflvpfmm7TlpJrnmoTmlLbol4/mlbDmja5cclxuICAgICAqIOmAu+i+kTog5Zyo546w5pyJ55qE5YiG6aG15Z+656GA5LiKLCDlkJHlkI7liqDkuIDpobUsIOafpeivolxyXG4gICAgICovXHJcbiAgICBnZXRNb3JlQWxhcm0oKSB7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hQYXJhbXMuZW5kVGltZSA9IG1vbWVudCh0aGlzLnNlYXJjaFBhcmFtcy5zdGFydFRpbWUpLnN1YnRyYWN0KDEsICdkYXknKS5mb3JtYXQoJ1lZWVktTU0tREQnKSArICcgMjM6NTk6NTknO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoUGFyYW1zLnN0YXJ0VGltZSA9IG1vbWVudCh0aGlzLnNlYXJjaFBhcmFtcy5zdGFydFRpbWUpLnN1YnRyYWN0KDgsICdkYXknKS5mb3JtYXQoJ1lZWVktTU0tREQnKSArICcgMDA6MDA6MDAnO1xyXG5cclxuICAgICAgICB0aGlzLmdldENvbGxlY3RMaXN0KClcclxuICAgIH1cclxuXHJcbiAgICBleHBhbmRlck1vcmUoZGF0YTogTXlDb2xsZWN0Vmlld01vZGVsKSB7XHJcbiAgICAgICAgZGF0YS5pc0V4cGFuZCA9ICFkYXRhLmlzRXhwYW5kO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRWZlbmNlVHlwZSh2YWw6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBPYmplY3RUeXBlLkVsZWN0cm9uaWNGZW5jZS52YWx1ZSA9PT0gdmFsXHJcbiAgICB9XHJcblxyXG4gICAgaXNXaWZpVHlwZSh2YWw6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBPYmplY3RUeXBlLldpZmkudmFsdWUgPT09IHZhbFxyXG4gICAgfVxyXG5cclxuICAgIGlzVmVoaWNsZVR5cGUodmFsOiBzdHJpbmcpIHtcclxuICAgICAgICAvLyDovabniYzlrZfmrrXmoLzlvI/ov5jmsqHlrppcclxuICAgICAgICByZXR1cm4gdmFsID09PSAnQ2FyJztcclxuICAgIH1cclxuXHJcbiAgICBpc0ZhY2VUeXBlKHZhbDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbCA9PT0gXCJGYWNlXCJcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPlua2iOaUtuiXj1xyXG4gICAgICovXHJcbiAgICB1bkF0dGVudGlvbihtb2RlbDogQ29sbGVjdEV4LCBjYWNoZURhdGFzOiBNeUNvbGxlY3RWaWV3TW9kZWwpIHtcclxuICAgICAgICBjb25zb2xlLmRlYnVnKFwidW5BdHRlbnRpb25cIiwgbW9kZWwpO1xyXG4gICAgICAgIC8vIHRoaXMubXlDb2xsZWN0RmFjdG9yeS5yZW1vdmVEYXRhKG1vZGVsKTtcclxuICAgICAgICBsZXQgb3B0czogTGF5ZXJDb25maXJtUGFyYW1zID0ge1xyXG4gICAgICAgICAgICBjb250ZW50OiBcIuehruiupOimgeenu+mZpOatpOadoeaUtuiXj+WQlz9cIixcclxuICAgICAgICAgICAgdGl0bGU6IFwi56Gu6K6kXCIsXHJcbiAgICAgICAgICAgIGJ0blN0ckxpc3Q6IFtcIuehruWumlwiLCBcIuWPlua2iFwiXSxcclxuICAgICAgICAgICAgb2tCdG5GdW46IChpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91bkF0dGVudGlvbihtb2RlbCwgY2FjaGVEYXRhcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZShpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5sYXllckRlYy5jb25maXJtKG9wdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5oiq5Y+Wa2V5LCDnlKjkuo7nlYzpnaLlsZXnpLrml7bpl7RcclxuICAgICAqIEBwYXJhbSB0aW1lS2V5IOaXtumXtGtleVxyXG4gICAgICogQHBhcmFtIHBhcmFtTmFtZSDlj6/pgInpobkgeXl5eSBNTSBkZFxyXG4gICAgICovXHJcbiAgICBnZXRWYWx1ZUJ5VGltZUtleSh0aW1lS2V5OiBzdHJpbmcsIHBhcmFtTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGFyciA9IHRpbWVLZXkuc3BsaXQoXCItXCIpO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xyXG4gICAgICAgIHN3aXRjaCAocGFyYW1OYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ5eXl5XCI6XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBhcnJbMF07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIk1NXCI6XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBhcnJbMV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImRkXCI6XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBhcnJbMl07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF91bkF0dGVudGlvbihtb2RlbDogQ29sbGVjdEV4LCBjYWNoZURhdGFzOiBNeUNvbGxlY3RWaWV3TW9kZWwpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UuY29sbGVjdERlbGV0ZUluZm8oe2lkczogW21vZGVsLklEXX0pLnRoZW4oKGRhdGE6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubXlDb2xsZWN0RmFjdG9yeS5yZW1vdmVEYXRhKG1vZGVsLCBjYWNoZURhdGFzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmRlYnVnKFwiY29sbGVjdERlbGV0ZUluZm9cIiwgZGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmFwcFxyXG4gICAgLmNvbnRyb2xsZXIoJ015Q29sbGVjdENvbnRyb2xsZXInLCBNeUNvbGxlY3RDb250cm9sbGVyKTsiXX0=
