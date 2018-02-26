define(["require", "exports", "text!../common/alarmMsgTemplate/alarmMsg.html", "text!../common/alarmMsgTemplate/personAlarmPopup.html", "text!../common/alarmMsgTemplate/carAlarmPopup.html", "text!../common/alarmMsgTemplate/rfidAlarmPopup.html", "text!../common/msgCenterPopup/msgCenter.popup.html", "text!../index/updatePwdModal/updatePwd.modal.html", "text!../compare/compare.html", "../../core/enum/ObjectType", "../common/enum/bubble.code", "../common/app/main.app", "../common/router/router.service", "../../core/server/enum/SocketResultTypeEnum", "../common/factory/HandleStorage.factory", "../../core/enum/StorageKeyEnum", "../common/system-config", "../common/enum/LanguageEnum", "../common/portrait-tool", "../login/login.service", "../../style/style", "../common/translate/translate.main", "angular", "../common/msgCenterPopup/msgCenter.popup.controller", "../common/alarmMsgTemplate/rfidAlarmPopup.controller", "../common/alarmMsgTemplate/carAlarmPopup.controller", "../common/alarmMsgTemplate/personAlarmPopup.controller", "../index/updatePwdModal/updatePwd.modal.controller", "../common/directive.util", "../common/interceptor.util", "../common/filter/app.filter", "./main.service", "../common/factory/response.notify.factory", "json2", "../common/factory/userinfo.cache.factory", "../common/factory/socket.factory", "../common/alarmMsgTemplate/alarmDisposePopupCache.factory", "../common/factory/HandleStorage.factory", "../common/services/task.service", "ng-scrollBars", "../common/factory/layerMsg.factory", "../common/factory/systemInfo.cache.factory", "../compare/compare.controller", "../common/services/deviceSocket.service"], function (require, exports, alarmMsgHtml, personAlarmPopup, carAlarmPopup, rfidAlarmPopup, msgCenterPopupHtml, updatePwdModalHtml, compareHTML, ObjectType_1, bubble_code_1, main_app_1, router_service_1, SocketResultTypeEnum_1, HandleStorage_factory_1, StorageKeyEnum_1, system_config_1, LanguageEnum_1, portrait_tool_1, login_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Promise = require("es6-promise");
    var MainMenuController = (function () {
        function MainMenuController($scope, $interval, $timeout, $state, layer, mainService, $translate, userInfoCacheFactory, socketFactory, i18nFactory, alarmPopupCache, mouleList, handleStorage, layerDec, $rootScope, dynamicControlCacheFactory, systemInfoCacheFactory, deviceSocketServer, $http, taskService) {
            var _this = this;
            this.$scope = $scope;
            this.$interval = $interval;
            this.$timeout = $timeout;
            this.$state = $state;
            this.layer = layer;
            this.mainService = mainService;
            this.$translate = $translate;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.socketFactory = socketFactory;
            this.i18nFactory = i18nFactory;
            this.alarmPopupCache = alarmPopupCache;
            this.mouleList = mouleList;
            this.handleStorage = handleStorage;
            this.layerDec = layerDec;
            this.$rootScope = $rootScope;
            this.dynamicControlCacheFactory = dynamicControlCacheFactory;
            this.systemInfoCacheFactory = systemInfoCacheFactory;
            this.deviceSocketServer = deviceSocketServer;
            this.$http = $http;
            this.taskService = taskService;
            this.isStopCheck = false;
            this.alarmRefreshTime = 3000;
            this.isRefreshAlarm = true;
            this.isShowMenu = false;
            this.userCenterRight = false;
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                if (fromState.name.indexOf('maintain') > -1) {
                    angular.forEach($http.pendingRequests, function (request) {
                        if (request.cancel) {
                            request.cancel.resolve();
                        }
                    });
                }
            });
            $rootScope.$on('closeAlarmPopup', function (event) {
                _this.layer.close(_this.theOpenedLayr);
                _this.alarmPopupCache.setAlarmPopupState(false);
            });
            $rootScope.$on('closeComparePopup', function (event) {
                _this.layer.close(_this.compareIndex);
            });
            this.isPlayAlarmMusic = this.userInfoCacheFactory.getPlayMusicStatus();
            this.moduleItems = router_service_1.default.getInstance().getModuleItems(null);
            this.checkLogin();
            this.getLang();
            this.loginUserName = this.userInfoCacheFactory.getCurrentRealName();
            try {
                this.isShowMenu = JSON.parse(sessionStorage.getItem(system_config_1.SystemConfig.IS_MENU));
                if (this.isShowMenu === true) {
                    $('#menu-group').show();
                }
                else {
                    $('#menu-group').hide();
                }
            }
            catch (e) {
                $('#menu-group').show();
            }
            var currentLang = this.handleStorage.getSessionStorageData(StorageKeyEnum_1.StorageKey.languageKey);
            if (currentLang === LanguageEnum_1.LanguageEnum.CN) {
                this.isLanguageCn = true;
            }
            else if (currentLang === LanguageEnum_1.LanguageEnum.EN) {
                this.isLanguageCn = false;
            }
            this.socketSubscribeId = this.socketFactory.subscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeAllAlarmData, function (data) {
                if (_this.alarmPopupCache.getAlarmPopupState()) {
                    return;
                }
                if (data) {
                    _this._globalPush(data[data.length - 1]);
                }
            });
            this.msgCenter = new HandleStorage_factory_1.MsgCenter();
            this.socketFactory.subscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.TaskVerify, function (result) {
                console.error('审核任务', result);
                _this.msgCenter.taskMsgNum = result.length;
                _this.msgCenter.feedbackMsgNum = 0;
                _this.msgCenter.msgTotalNum = result.length;
                _this.handleMsg(_this.msgCenter);
            });
            this.$scope.$on('msgCenterSend', function (event, data) {
                _this.msgCenter.taskMsgNum = data.taskMsgNum;
                _this.msgCenter.feedbackMsgNum = data.feedbackMsgNum;
                _this.msgCenter.msgTotalNum = data.msgTotalNum;
            });
            this.socketFactory.subscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.UserOffLine, function (result) {
                _this.layerDec.notCloseInfo("<div class='u-msg-notclose'>" + _this.i18nFactory('FDS_00_02_02') + "</div>", _this.i18nFactory('FDS_00_05_03'), _this.i18nFactory('FDS_00_05_01')).then(function () {
                    window.location.href = "/";
                });
                _this.$rootScope.$broadcast(bubble_code_1.BubbleCode.LOGIN_OUT);
            });
            this.$scope.$on('$destroy', function () {
                _this.socketFactory.unSubscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.TaskVerify);
                _this.socketFactory.unSubscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.Export);
            });
            this.saveSystemData();
            this.userCenterRight = this.userInfoCacheFactory.hasFuncAuth("toolOption");
        }
        MainMenuController.prototype.openComparePopup = function () {
            var scope = this.$scope.$new();
            this.compareIndex = this.layer.open({
                type: 1,
                content: compareHTML,
                scope: scope,
                title: false,
                closeBtn: 0,
                skin: "no-scroll",
                area: ["765px", "418px"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        MainMenuController.prototype.handleMsg = function (msgData) {
            var storageNum = this.handleStorage.getSessionStorageData(StorageKeyEnum_1.StorageKey.msgCenterKey);
            if (storageNum) {
                msgData.taskMsgNum += storageNum.taskMsgNum;
                msgData.feedbackMsgNum += storageNum.feedbackMsgNum;
                msgData.msgTotalNum += storageNum.msgTotalNum;
            }
            this.handleStorage.setSessionStorageData(StorageKeyEnum_1.StorageKey.msgCenterKey, msgData);
        };
        MainMenuController.prototype.refreshAlarm = function () {
            var _this = this;
            setTimeout(function () {
                _this.isRefreshAlarm = true;
            }, this.alarmRefreshTime);
        };
        MainMenuController.prototype._globalPush = function (data) {
            var _this = this;
            if (!this.isRefreshAlarm) {
                return;
            }
            else {
                this.isRefreshAlarm = false;
                this.refreshAlarm();
            }
            (!!this.theOpenedLayr) && (this.layer.close(this.theOpenedLayr));
            var scope = this.$scope.$new();
            var _Authority = {
                DynamicAlarmDispose: !!this.mouleList['RealDynamic.DisposeAlarm'],
                DynamicAlarmDelete: !!this.mouleList['RealDynamic.DeleteAlarmRecord'],
            };
            scope._Authority = _Authority;
            scope.data = data;
            if (data.oriId) {
                this.taskService.findCarById(data.oriId).then(function (res) {
                    scope.task = res.data;
                    _this.openAlarmPopup(scope, carAlarmPopup);
                });
                return;
            }
            if (data.AlarmLog && data.AlarmLog.ObjectType === ObjectType_1.ObjectType.Camera.value) {
                this.taskService.findFaceByTaskId(data.AlarmLog.TaskId).then(function (res) {
                    scope.task = res.data;
                    _this.openAlarmPopup(scope, personAlarmPopup);
                });
                return;
            }
            else {
                this.taskService.findRfidById(data.AlarmLog.TaskId).then(function (res) {
                    scope.task = res.data;
                    _this.openAlarmPopup(scope, rfidAlarmPopup);
                });
                return;
            }
        };
        MainMenuController.prototype.openAlarmPopup = function (scope, tpl) {
            this.layer.close(this.theOpenedLayr);
            this.theOpenedLayr = this.layer.open({
                type: 1,
                resize: false,
                title: false,
                scope: scope,
                closeBtn: false,
                move: false,
                content: tpl,
                offset: 'rb',
                anim: 2,
                shade: 0,
                area: ['auto', "auto"],
                success: function (dom) {
                    angular.element(dom).find('.layui-layer-content').css('overflow', "hidden");
                    dom.find('.layui-layer-title').before("<iframe class='f-abs u-iframe-layer'></iframe>");
                },
                end: function () {
                    scope.$destroy();
                }
            });
        };
        MainMenuController.prototype.getLang = function () {
            var language = this.handleStorage.getSessionStorageData(StorageKeyEnum_1.StorageKey.languageKey);
            if (!language) {
                language = LanguageEnum_1.LanguageEnum.CN;
            }
            this.$translate.use(language);
        };
        ;
        MainMenuController.prototype.changePlayAlarmMusicStatus = function () {
            this.isPlayAlarmMusic = !this.isPlayAlarmMusic;
            this.userInfoCacheFactory.setPlayMusicStatus(this.isPlayAlarmMusic);
        };
        ;
        MainMenuController.prototype.checkLogin = function () {
            var _this = this;
            this.checkLoginInterval = setInterval(function () {
                _this.mainService.checkLogin(_this.userInfoCacheFactory.getCurrentUid());
            }, 1000 * 60);
            this.$scope.$on(bubble_code_1.BubbleCode.LOGIN_OUT, function (event) {
                clearInterval(_this.checkLoginInterval);
            });
        };
        MainMenuController.prototype.loginOut = function () {
            var _this = this;
            this.mainService.loginOut(this.userInfoCacheFactory.getCurrentUserKeyStr()).then(function (resp) {
                _this.afterLoginOut();
            }).catch(function () {
                _this.afterLoginOut();
            });
        };
        MainMenuController.prototype.afterLoginOut = function () {
            this.isStopCheck = true;
            this.$timeout(function () {
                window.location.href = "/index.html";
            });
        };
        MainMenuController.prototype.showChildList = function (item, index) {
            if (item.hasChildRouteDownSelect) {
                this.moduleChildItems = router_service_1.default.getInstance().getModuleItems(item.key);
                this.moduleChildItems.length > 0 && (this.index = index);
            }
        };
        MainMenuController.prototype.openUpdatePwdModal = function () {
            var _this = this;
            var scope = this.$scope.$new();
            var titleStr = this.i18nFactory('FDS_00_12_29');
            scope.closeEmitName = this.updatePwdModalCloseEmitName;
            this.layer.open({
                type: 1,
                title: titleStr,
                content: updatePwdModalHtml,
                scope: scope,
                area: ["413px", "202px"],
                skin: "overflow-visible",
                end: function () {
                    scope.$destroy();
                }
            }).then(function (index) {
                _this.openCloseUpdatePwdLayerWatch();
                _this.updatePwdModalLayer = index;
            });
        };
        ;
        MainMenuController.prototype.openCloseUpdatePwdLayerWatch = function () {
            var _this = this;
            if (!this.updatePwdModalLayer) {
                this.$scope.$on(this.updatePwdModalCloseEmitName, function (even, data) {
                    if (data) {
                        _this.loginOut();
                    }
                    _this.layer.close(_this.updatePwdModalLayer);
                });
            }
        };
        MainMenuController.prototype.saveSystemData = function () {
            var self = this;
            this.mainService.updateSystemData().then(function (res) {
                if (res && res.code == 200 && res.data) {
                    try {
                        self.systemInfoCacheFactory.setSystemInfo(res.data);
                    }
                    catch (e) {
                        console.log(e, "Your browser doesn't support localStorage");
                    }
                }
            });
        };
        MainMenuController.$inject = [
            '$scope',
            '$interval',
            '$timeout',
            '$state',
            'layer',
            'mainService',
            "$translate",
            "userInfoCacheFactory",
            'socketFactory',
            'i18nFactory',
            'alarmPopupCache',
            'mouleList',
            'handleStorage',
            'layerDec',
            '$rootScope',
            'mouleList',
            'systemInfoCacheFactory',
            'deviceSocketServer',
            '$http',
            'taskService'
        ];
        return MainMenuController;
    }());
    var MainController = (function () {
        function MainController() {
            this._initController = function () {
                main_app_1.app.controller('mainMenuController', MainMenuController);
                main_app_1.app.value("mouleList", (function () {
                    var temp = angular.fromJson(localStorage.getItem(system_config_1.SystemConfig.USER_INFO_KEY));
                    var authorities = temp && temp.JsonUserData && temp.JsonUserData.ModuleItemList;
                    var _authorities = {};
                    if (authorities) {
                        var i = 0, len1 = authorities.length, j = void 0, len2 = void 0;
                        for (; i < len1; i++) {
                            _authorities[authorities[i].FullNameSpacePath] = true;
                            if (authorities[i].OperateItemList) {
                                var subModel = authorities[i].OperateItemList;
                                j = 0;
                                len2 = subModel.length;
                                for (; j < len2; j++) {
                                    _authorities[subModel[j].FullNameSpacePath] = true;
                                }
                            }
                        }
                    }
                    return _authorities;
                })());
            };
        }
        MainController.prototype.GetQueryJson = function () {
            var result = {};
            var r = window.location.search.substr(1);
            if (r) {
                var arr = r.split('&');
                arr.forEach(function (item) {
                    var arr2 = item.split('=');
                    result[arr2[0]] = arr2[1];
                });
            }
            else {
                result = null;
            }
            return result;
        };
        MainController.prototype.loginForQuery = function (user, pwd, isMenu) {
            var _params = new login_service_1.LoginParams();
            _params.password = portrait_tool_1.default.md5(pwd);
            _params.username = user;
            return $.ajax({
                type: 'post',
                data: _params,
                url: '/pdp/user/auth',
            }).done(function (resp) {
                if (resp && resp.data && resp.code === 200) {
                    try {
                        localStorage.setItem(system_config_1.SystemConfig.USER_INFO_KEY, angular.toJson(resp.data));
                        sessionStorage.setItem(system_config_1.SystemConfig.IS_MENU, isMenu);
                    }
                    catch (e) {
                        window.location.href = '/';
                        console.error(e);
                    }
                }
                else {
                    window.location.href = '/';
                }
            });
        };
        MainController.prototype.resolveQuery = function () {
            var queryJson = this.GetQueryJson();
            if (queryJson) {
                if (queryJson.user && queryJson.pwd) {
                    return this.loginForQuery(queryJson.user, queryJson.pwd, queryJson.ismenu ? queryJson.ismenu : 'true');
                }
                else {
                    sessionStorage.setItem(system_config_1.SystemConfig.IS_MENU, 'true');
                }
            }
            else {
                sessionStorage.setItem(system_config_1.SystemConfig.IS_MENU, 'true');
                return Promise.resolve(null);
            }
        };
        MainController.prototype._getModuleAuthorization = function () {
            var temp = angular.fromJson(localStorage.getItem(system_config_1.SystemConfig.USER_INFO_KEY));
            var authorities = temp.JsonUserData.ModuleItemList;
            var model = [];
            if (Array.isArray(authorities) && authorities.length > 0) {
                model = computedModel(authorities);
            }
            else {
                console.error('没有任何页面权限');
            }
            function computedModel(modelList, arr) {
                if (arr === void 0) { arr = []; }
                for (var i = 0; i < modelList.length; i++) {
                    var model_1 = modelList[i];
                    if (model_1.FullNameSpacePath) {
                        arr.push({ code: model_1.FullNameSpacePath });
                    }
                }
                return arr;
            }
            return model;
        };
        ;
        MainController.prototype.linkStart = function () {
            var _this = this;
            this.resolveQuery().then(function () {
                router_service_1.default.getInstance().init(_this._getModuleAuthorization());
                _this._initController();
                angular.bootstrap(document, ['portrait']);
            }).catch(function (e) {
                console.error(e);
            });
        };
        return MainController;
    }());
    new MainController().linkStart();
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvaW5kZXgvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFvRkEsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRXJDO1FBNERJLDRCQUNZLE1BQVcsRUFDWCxTQUFjLEVBQ2QsUUFBYSxFQUNiLE1BQVcsRUFDWCxLQUFVLEVBQ1YsV0FBeUIsRUFDekIsVUFBZSxFQUNmLG9CQUEyQyxFQUMzQyxhQUE2QixFQUM3QixXQUFnQixFQUNoQixlQUFpQyxFQUNqQyxTQUFxQyxFQUNyQyxhQUE2QixFQUM3QixRQUFtQixFQUNuQixVQUFlLEVBQ2YsMEJBQXVELEVBQ3ZELHNCQUFnRCxFQUNoRCxrQkFBaUMsRUFDakMsS0FBVSxFQUNWLFdBQXdCO1lBcEJwQyxpQkEwSEM7WUF6SFcsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGNBQVMsR0FBVCxTQUFTLENBQUs7WUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFLO1lBQ2IsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLFVBQUssR0FBTCxLQUFLLENBQUs7WUFDVixnQkFBVyxHQUFYLFdBQVcsQ0FBYztZQUN6QixlQUFVLEdBQVYsVUFBVSxDQUFLO1lBQ2YseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF1QjtZQUMzQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7WUFDN0IsZ0JBQVcsR0FBWCxXQUFXLENBQUs7WUFDaEIsb0JBQWUsR0FBZixlQUFlLENBQWtCO1lBQ2pDLGNBQVMsR0FBVCxTQUFTLENBQTRCO1lBQ3JDLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtZQUM3QixhQUFRLEdBQVIsUUFBUSxDQUFXO1lBQ25CLGVBQVUsR0FBVixVQUFVLENBQUs7WUFDZiwrQkFBMEIsR0FBMUIsMEJBQTBCLENBQTZCO1lBQ3ZELDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBMEI7WUFDaEQsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFlO1lBQ2pDLFVBQUssR0FBTCxLQUFLLENBQUs7WUFD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LElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFLLENBQUMsaUJBQWlCLEVBQXVCLENBQUMsQ0FBQTtvQkFDcEUsQ0FBQztnQkFJTCxDQUFDO2dCQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDZixDQUFDO1lBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQUEsQ0FBQztRQWdDRixrQ0FBUyxHQUFUO1lBQUEsaUJBU0M7WUFSRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDO2dCQUNyQix3QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRSxLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3ZCLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUM5QyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxDQUFRO2dCQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUE7UUFFTixDQUFDO1FBQ0wscUJBQUM7SUFBRCxDQWxJQSxBQWtJQyxJQUFBO0lBRUQsSUFBSSxjQUFjLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyIsImZpbGUiOiJtb2R1bGUvaW5kZXgvbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vY29tbW9uL2FsYXJtTXNnVGVtcGxhdGUvYWxhcm1Nc2cuaHRtbFwiIG5hbWU9XCJhbGFybU1zZ0h0bWxcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uL2NvbW1vbi9hbGFybU1zZ1RlbXBsYXRlL3BlcnNvbkFsYXJtUG9wdXAuaHRtbFwiIG5hbWU9XCJwZXJzb25BbGFybVBvcHVwXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi9jb21tb24vYWxhcm1Nc2dUZW1wbGF0ZS9jYXJBbGFybVBvcHVwLmh0bWxcIiBuYW1lPVwiY2FyQWxhcm1Qb3B1cFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vY29tbW9uL2FsYXJtTXNnVGVtcGxhdGUvcmZpZEFsYXJtUG9wdXAuaHRtbFwiIG5hbWU9XCJyZmlkQWxhcm1Qb3B1cFwiIC8+XHJcblxyXG5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi9jb21tb24vbXNnQ2VudGVyUG9wdXAvbXNnQ2VudGVyLnBvcHVwLmh0bWxcIiBuYW1lPVwibXNnQ2VudGVyUG9wdXBIdG1sXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi9pbmRleC91cGRhdGVQd2RNb2RhbC91cGRhdGVQd2QubW9kYWwuaHRtbFwiIG5hbWU9XCJ1cGRhdGVQd2RNb2RhbEh0bWxcIi8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vY29tcGFyZS9jb21wYXJlLmh0bWxcIiBuYW1lPVwiY29tcGFyZUhUTUxcIi8+XHJcblxyXG5cclxuXHJcblxyXG5pbXBvcnQge09iamVjdFR5cGV9IGZyb20gXCIuLi8uLi9jb3JlL2VudW0vT2JqZWN0VHlwZVwiO1xyXG5cclxuZGVjbGFyZSBsZXQgdXBkYXRlUHdkTW9kYWxIdG1sOiBzdHJpbmc7XHJcbmRlY2xhcmUgbGV0IGFsYXJtTXNnSHRtbDogYW55LCByZmlkQWxhcm1Qb3B1cDogYW55LGNhckFsYXJtUG9wdXA6YW55LHBlcnNvbkFsYXJtUG9wdXA6YW55O1xyXG5kZWNsYXJlIGxldCBtc2dDZW50ZXJQb3B1cEh0bWw6IGFueTtcclxuXHJcbmRlY2xhcmUgbGV0IGRlZmluZTogYW55LCBhbmd1bGFyOiBhbnksICQ6IGFueSwgcmVxdWlyZTogYW55O1xyXG5pbXBvcnQgeyBCdWJibGVDb2RlIH0gZnJvbSBcIi4uL2NvbW1vbi9lbnVtL2J1YmJsZS5jb2RlXCI7XHJcbmltcG9ydCBcIi4uLy4uL3N0eWxlL3N0eWxlXCI7XHJcbmltcG9ydCB7IGFwcCB9IGZyb20gJy4uL2NvbW1vbi9hcHAvbWFpbi5hcHAnO1xyXG5pbXBvcnQgcm91dGVyU2VydmljZSBmcm9tIFwiLi4vY29tbW9uL3JvdXRlci9yb3V0ZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuLi9jb21tb24vdHJhbnNsYXRlL3RyYW5zbGF0ZS5tYWluXCI7XHJcbmltcG9ydCAnYW5ndWxhcic7XHJcbmltcG9ydCBcIi4uL2NvbW1vbi9tc2dDZW50ZXJQb3B1cC9tc2dDZW50ZXIucG9wdXAuY29udHJvbGxlclwiO1xyXG5pbXBvcnQgXCIuLi9jb21tb24vYWxhcm1Nc2dUZW1wbGF0ZS9yZmlkQWxhcm1Qb3B1cC5jb250cm9sbGVyXCI7XHJcbmltcG9ydCBcIi4uL2NvbW1vbi9hbGFybU1zZ1RlbXBsYXRlL2NhckFsYXJtUG9wdXAuY29udHJvbGxlclwiO1xyXG5pbXBvcnQgXCIuLi9jb21tb24vYWxhcm1Nc2dUZW1wbGF0ZS9wZXJzb25BbGFybVBvcHVwLmNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFwiLi4vaW5kZXgvdXBkYXRlUHdkTW9kYWwvdXBkYXRlUHdkLm1vZGFsLmNvbnRyb2xsZXJcIjtcclxuXHJcbmltcG9ydCAnLi4vY29tbW9uL2RpcmVjdGl2ZS51dGlsJztcclxuaW1wb3J0ICcuLi9jb21tb24vaW50ZXJjZXB0b3IudXRpbCc7XHJcbmltcG9ydCAnLi4vY29tbW9uL2ZpbHRlci9hcHAuZmlsdGVyJztcclxuaW1wb3J0IFwiLi9tYWluLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgSU1haW5TZXJ2aWNlIH0gZnJvbSBcIi4vbWFpbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uL2NvbW1vbi9mYWN0b3J5L3Jlc3BvbnNlLm5vdGlmeS5mYWN0b3J5XCI7XHJcbi8vIFRPRE8g5b6I5aSa5Zyw5pa555So5LqGIEpTT04uKirmlrnms5UsIOS9huaYr+mDveayoeacieW8leeUqGpzb24yLOaJgOS7pee7n+S4gOaUvuWcqOatpOWkhFxyXG5pbXBvcnQgXCJqc29uMlwiO1xyXG5pbXBvcnQgeyBJVXNlckluZm9DYWNoZUZhY3RvcnkgfSBmcm9tIFwiLi4vY29tbW9uL2ZhY3RvcnkvdXNlcmluZm8uY2FjaGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi9jb21tb24vZmFjdG9yeS91c2VyaW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcblxyXG5pbXBvcnQgXCIuLi9jb21tb24vZmFjdG9yeS9zb2NrZXQuZmFjdG9yeVwiO1xyXG5pbXBvcnQgeyBJU29ja2V0RmFjdG9yeSB9IGZyb20gXCIuLi9jb21tb24vZmFjdG9yeS9zb2NrZXQuZmFjdG9yeVwiO1xyXG5pbXBvcnQgeyBTb2NrZXRSZXN1bHRUeXBlRW51bSB9IGZyb20gXCIuLi8uLi9jb3JlL3NlcnZlci9lbnVtL1NvY2tldFJlc3VsdFR5cGVFbnVtXCI7XHJcbi8v5a2Y5YKo5oql6K2m5aSE55CG5by55Ye656qX5Y+j55qE54q25oCB77yM5YWz6IGUc29ja2V05o6o6YCBXHJcbmltcG9ydCBcIi4uL2NvbW1vbi9hbGFybU1zZ1RlbXBsYXRlL2FsYXJtRGlzcG9zZVBvcHVwQ2FjaGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQgeyBJQWxhcm1Qb3B1cENhY2hlIH0gZnJvbSBcIi4uL2NvbW1vbi9hbGFybU1zZ1RlbXBsYXRlL2FsYXJtRGlzcG9zZVBvcHVwQ2FjaGUuZmFjdG9yeVwiO1xyXG5cclxuaW1wb3J0IHsgSUhhbmRsZVN0b3JhZ2UsIE1zZ0NlbnRlciB9IGZyb20gXCIuLi9jb21tb24vZmFjdG9yeS9IYW5kbGVTdG9yYWdlLmZhY3RvcnlcIlxyXG5pbXBvcnQgXCIuLi9jb21tb24vZmFjdG9yeS9IYW5kbGVTdG9yYWdlLmZhY3RvcnlcIlxyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4uLy4uL2NvcmUvZW51bS9TdG9yYWdlS2V5RW51bVwiXHJcblxyXG5pbXBvcnQge0lUYXNrU2VydmljZX0gZnJvbSBcIi4uL2NvbW1vbi9zZXJ2aWNlcy90YXNrLnNlcnZpY2VcIjtcclxuaW1wb3J0ICBcIi4uL2NvbW1vbi9zZXJ2aWNlcy90YXNrLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCBcIm5nLXNjcm9sbEJhcnNcIjtcclxuaW1wb3J0IHsgSUxheWVyRGVjIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWN0b3J5L2xheWVyTXNnLmZhY3RvcnlcIjtcclxuaW1wb3J0IFwiLi4vY29tbW9uL2ZhY3RvcnkvbGF5ZXJNc2cuZmFjdG9yeVwiO1xyXG5pbXBvcnQgeyBTeXN0ZW1Db25maWcgfSBmcm9tIFwiLi4vY29tbW9uL3N5c3RlbS1jb25maWdcIjtcclxuaW1wb3J0IHsgSUR5bmFtaWNDb250cm9sQ2FjaGVGYWN0b3J5IH0gZnJvbSBcIi4uL2R5bmFtaWNDb250cm9sL2R5bmFtaWNDb250cm9sLmNhY2hlLmZhY3RvcnlcIjtcclxuaW1wb3J0IHsgTGFuZ3VhZ2VFbnVtIH0gZnJvbSBcIi4uL2NvbW1vbi9lbnVtL0xhbmd1YWdlRW51bVwiO1xyXG5pbXBvcnQgeyBNb2R1bGVJdGVtRXggfSBmcm9tIFwiLi4vLi4vY29yZS9lbnRpdHkvZXgvTW9kdWxlSXRlbUV4XCI7XHJcbmltcG9ydCB7IElCYWNrUm91dGVyQ29uZmlnIH0gZnJvbSBcIi4uL2NvbW1vbi9yb3V0ZXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IExvZ2luVXNlckluZm8gfSBmcm9tIFwiLi4vLi4vY29yZS9lbnRpdHkvZXgvVXNlckV4XCI7XHJcbmltcG9ydCB7IEJhY2tSZXNwb25zZUJvZHksIEh0dHBSZXNwb25zZVJlc3VsdCwgUmVzcG9uc2VSZXN1bHQgfSBmcm9tIFwiLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCBQb3J0cmFpdFRvb2wgZnJvbSBcIi4uL2NvbW1vbi9wb3J0cmFpdC10b29sXCI7XHJcbmltcG9ydCB7IExvZ2luUGFyYW1zIH0gZnJvbSBcIi4uL2xvZ2luL2xvZ2luLnNlcnZpY2VcIjtcclxuXHJcbi8vIGltcG9ydCAnLi4vYmFzZWNvbmZpZy9zeXN0ZW0tcHJvcGVydGllcy9zeXN0ZW0ucHJvcGVydGllcy5zdG9yZSdcclxuLy8gaW1wb3J0IHsgSVN5c3RlbURhdGFTZXJ2aWNlfSBmcm9tICcuLi9iYXNlY29uZmlnL3N5c3RlbS1wcm9wZXJ0aWVzL3N5c3RlbS5wcm9wZXJ0aWVzLnN0b3JlJ1xyXG5cclxuaW1wb3J0IFwiLi4vY29tbW9uL2ZhY3Rvcnkvc3lzdGVtSW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7IElTeXN0ZW1JbmZvQ2FjaGVQcm92aWRlciB9IGZyb20gXCIuLi9jb21tb24vZmFjdG9yeS9zeXN0ZW1JbmZvLmNhY2hlLmZhY3RvcnlcIjtcclxuaW1wb3J0ICcuLi9jb21wYXJlL2NvbXBhcmUuY29udHJvbGxlcic7XHJcbmltcG9ydCAnLi4vY29tbW9uL3NlcnZpY2VzL2RldmljZVNvY2tldC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSWRldmljZVNvY2tldCB9IGZyb20gJy4uL2NvbW1vbi9zZXJ2aWNlcy9kZXZpY2VTb2NrZXQuc2VydmljZSc7XHJcbmltcG9ydCBTb2NrZXRQdXNoTW9kZWwgZnJvbSBcIi4uLy4uL2NvcmUvc2VydmVyL1NvY2tldFB1c2hNb2RlbFwiO1xyXG5pbXBvcnQge0Nhck1vbml0b3IsIE1hY01vbml0b3IsIFRhc2tNb2RlbH0gZnJvbSBcIi4uLy4uL2NvcmUvc2VydmVyL1Rhc2tNb2RlbFwiO1xyXG5cclxuXHJcbmRlY2xhcmUgbGV0IGNvbXBhcmVIVE1MOiBhbnk7XHJcblxyXG5sZXQgUHJvbWlzZSA9IHJlcXVpcmUoXCJlczYtcHJvbWlzZVwiKTtcclxuXHJcbmNsYXNzIE1haW5NZW51Q29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFtcclxuICAgICAgICAnJHNjb3BlJyxcclxuICAgICAgICAnJGludGVydmFsJyxcclxuICAgICAgICAnJHRpbWVvdXQnLFxyXG4gICAgICAgICckc3RhdGUnLFxyXG4gICAgICAgICdsYXllcicsXHJcbiAgICAgICAgJ21haW5TZXJ2aWNlJyxcclxuICAgICAgICBcIiR0cmFuc2xhdGVcIixcclxuICAgICAgICBcInVzZXJJbmZvQ2FjaGVGYWN0b3J5XCIsXHJcbiAgICAgICAgJ3NvY2tldEZhY3RvcnknLFxyXG4gICAgICAgICdpMThuRmFjdG9yeScsXHJcbiAgICAgICAgJ2FsYXJtUG9wdXBDYWNoZScsXHJcbiAgICAgICAgJ21vdWxlTGlzdCcsXHJcbiAgICAgICAgJ2hhbmRsZVN0b3JhZ2UnLFxyXG4gICAgICAgICdsYXllckRlYycsXHJcbiAgICAgICAgJyRyb290U2NvcGUnLFxyXG4gICAgICAgICdtb3VsZUxpc3QnLFxyXG4gICAgICAgICdzeXN0ZW1JbmZvQ2FjaGVGYWN0b3J5JyxcclxuICAgICAgICAnZGV2aWNlU29ja2V0U2VydmVyJyxcclxuICAgICAgICAnJGh0dHAnLFxyXG4gICAgICAgICd0YXNrU2VydmljZSdcclxuICAgIF07XHJcbiAgICBpc1N0b3BDaGVjazogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLy8g5rWL6K+V6YCA5Ye65L2/55SoIDEw5qyh5ZCO6YCA5Ye65o+Q56S6XHJcbiAgICBtb2R1bGVJdGVtczogQXJyYXk8YW55PjtcclxuICAgIG1vZHVsZUNoaWxkSXRlbXM6IEFycmF5PGFueT47XHJcbiAgICBpbmRleDogbnVtYmVyO1xyXG4gICAgY2hlY2tMb2dpbkludGVydmFsOiBhbnk7XHJcblxyXG4gICAgY3VycmVudEluZGV4OiBudW1iZXI7XHJcblxyXG4gICAgLy/nmbvlvZXkv6Hmga/mmL7npLpcclxuICAgIGxvZ2luVXNlck5hbWU6IHN0cmluZztcclxuICAgIGN1cnJlbnRUaW1lOiBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgIC8v5YWo5bGA5o6o6YCB5oql6K2m5L+h5oGvXHJcbiAgICBzb2NrZXRTdWJzY3JpYmVJZDogc3RyaW5nO1xyXG5cclxuICAgIHRoZU9wZW5lZExheXI6IHN0cmluZztcclxuICAgIGNvbXBhcmVJbmRleDogc3RyaW5nO1xyXG5cclxuICAgIC8v5YWo5bGA5o6o6YCB5oql6K2m5L+h5oGvXHJcbiAgICAvLyDlr4bnoIHkv67mlLlcclxuICAgIHVwZGF0ZVB3ZE1vZGFsTGF5ZXI6IG51bWJlcjtcclxuICAgIHVwZGF0ZVB3ZE1vZGFsQ2xvc2VFbWl0TmFtZTogc3RyaW5nO1xyXG4gICAgYWxhcm1SZWZyZXNoVGltZTogbnVtYmVyID0gMzAwMDtcclxuICAgIGlzUmVmcmVzaEFsYXJtOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICAvL+a2iOaBr+S4reW/gyDmlrDnmoTku7vliqHmlbDlkozlj43ppojmlbBcclxuICAgIG1zZ0NlbnRlcjogTXNnQ2VudGVyO1xyXG5cclxuICAgIC8vIOaKpeitpuWjsOmfs+aOp+WItlxyXG4gICAgaXNQbGF5QWxhcm1NdXNpYzogYm9vbGVhbjtcclxuICAgIC8v5LiN5ZCM6K+t6KiA5LiL5qC35byPXHJcbiAgICBpc0xhbmd1YWdlQ246IGJvb2xlYW47XHJcbiAgICBpc1Nob3dNZW51OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICB1c2VyQ2VudGVyUmlnaHQ6Ym9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLVxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICBwcml2YXRlICRpbnRlcnZhbDogYW55LFxyXG4gICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IGFueSxcclxuICAgICAgICBwcml2YXRlICRzdGF0ZTogYW55LFxyXG4gICAgICAgIHByaXZhdGUgbGF5ZXI6IGFueSxcclxuICAgICAgICBwcml2YXRlIG1haW5TZXJ2aWNlOiBJTWFpblNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSAkdHJhbnNsYXRlOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSB1c2VySW5mb0NhY2hlRmFjdG9yeTogSVVzZXJJbmZvQ2FjaGVGYWN0b3J5LFxyXG4gICAgICAgIHByaXZhdGUgc29ja2V0RmFjdG9yeTogSVNvY2tldEZhY3RvcnksXHJcbiAgICAgICAgcHJpdmF0ZSBpMThuRmFjdG9yeTogYW55LFxyXG4gICAgICAgIHByaXZhdGUgYWxhcm1Qb3B1cENhY2hlOiBJQWxhcm1Qb3B1cENhY2hlLFxyXG4gICAgICAgIHByaXZhdGUgbW91bGVMaXN0OiB7IFtrZXk6IHN0cmluZ106IEJvb2xlYW4gfSxcclxuICAgICAgICBwcml2YXRlIGhhbmRsZVN0b3JhZ2U6IElIYW5kbGVTdG9yYWdlLFxyXG4gICAgICAgIHByaXZhdGUgbGF5ZXJEZWM6IElMYXllckRlYyxcclxuICAgICAgICBwcml2YXRlICRyb290U2NvcGU6IGFueSxcclxuICAgICAgICBwcml2YXRlIGR5bmFtaWNDb250cm9sQ2FjaGVGYWN0b3J5OiBJRHluYW1pY0NvbnRyb2xDYWNoZUZhY3RvcnksXHJcbiAgICAgICAgcHJpdmF0ZSBzeXN0ZW1JbmZvQ2FjaGVGYWN0b3J5OiBJU3lzdGVtSW5mb0NhY2hlUHJvdmlkZXIsXHJcbiAgICAgICAgcHJpdmF0ZSBkZXZpY2VTb2NrZXRTZXJ2ZXI6IElkZXZpY2VTb2NrZXQsXHJcbiAgICAgICAgcHJpdmF0ZSAkaHR0cDogYW55LFxyXG4gICAgICAgIHByaXZhdGUgdGFza1NlcnZpY2U6SVRhc2tTZXJ2aWNlKSB7XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uIChldmVudDogYW55LCB0b1N0YXRlOiBhbnksIHRvUGFyYW1zOiBhbnksIGZyb21TdGF0ZTogYW55LCBmcm9tUGFyYW1zOiBhbnkpIHtcclxuICAgICAgICAgICAgaWYgKGZyb21TdGF0ZS5uYW1lLmluZGV4T2YoJ21haW50YWluJykgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRodHRwLnBlbmRpbmdSZXF1ZXN0cywgZnVuY3Rpb24gKHJlcXVlc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5jYW5jZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5jYW5jZWwucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdjbG9zZUFsYXJtUG9wdXAnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZSh0aGlzLnRoZU9wZW5lZExheXIpO1xyXG4gICAgICAgICAgICB0aGlzLmFsYXJtUG9wdXBDYWNoZS5zZXRBbGFybVBvcHVwU3RhdGUoZmFsc2UpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdjbG9zZUNvbXBhcmVQb3B1cCcsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKHRoaXMuY29tcGFyZUluZGV4KTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLmlzUGxheUFsYXJtTXVzaWMgPSB0aGlzLnVzZXJJbmZvQ2FjaGVGYWN0b3J5LmdldFBsYXlNdXNpY1N0YXR1cygpO1xyXG5cclxuICAgICAgICB0aGlzLm1vZHVsZUl0ZW1zID0gcm91dGVyU2VydmljZS5nZXRJbnN0YW5jZSgpLmdldE1vZHVsZUl0ZW1zKG51bGwpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tMb2dpbigpO1xyXG4gICAgICAgIHRoaXMuZ2V0TGFuZygpO1xyXG5cclxuICAgICAgICB0aGlzLmxvZ2luVXNlck5hbWUgPSB0aGlzLnVzZXJJbmZvQ2FjaGVGYWN0b3J5LmdldEN1cnJlbnRSZWFsTmFtZSgpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNTaG93TWVudSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTeXN0ZW1Db25maWcuSVNfTUVOVSkpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1Nob3dNZW51ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjbWVudS1ncm91cCcpLnNob3coKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCgnI21lbnUtZ3JvdXAnKS5oaWRlKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgJCgnI21lbnUtZ3JvdXAnKS5zaG93KClcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/kuI3lkIzor63oqIDkuItcclxuICAgICAgICBsZXQgY3VycmVudExhbmc6IHN0cmluZyA9IHRoaXMuaGFuZGxlU3RvcmFnZS5nZXRTZXNzaW9uU3RvcmFnZURhdGEoU3RvcmFnZUtleS5sYW5ndWFnZUtleSk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRMYW5nID09PSBMYW5ndWFnZUVudW0uQ04pIHtcclxuICAgICAgICAgICAgdGhpcy5pc0xhbmd1YWdlQ24gPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudExhbmcgPT09IExhbmd1YWdlRW51bS5FTikge1xyXG4gICAgICAgICAgICB0aGlzLmlzTGFuZ3VhZ2VDbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/mjqXmlLZ3ZWJzb2NrZXTmtojmga9cclxuICAgICAgICB0aGlzLnNvY2tldFN1YnNjcmliZUlkID0gdGhpcy5zb2NrZXRGYWN0b3J5LnN1YnNjcmliZShTb2NrZXRSZXN1bHRUeXBlRW51bS5TdWJzY3JpYmVBbGxBbGFybURhdGEsIChkYXRhOiBhbnkpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFsYXJtUG9wdXBDYWNoZS5nZXRBbGFybVBvcHVwU3RhdGUoKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/osIPnlKjov73liqDmlbDmja4gQXJyYXkg5bGV56S65pyA5paw5LiA5p2hXHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nbG9iYWxQdXNoKGRhdGFbZGF0YS5sZW5ndGggLSAxXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLyo9PT09PT09IOa2iOaBr+S4reW/gyA9PT09PT09PSovXHJcbiAgICAgICAgdGhpcy5tc2dDZW50ZXIgPSBuZXcgTXNnQ2VudGVyKCk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRGYWN0b3J5LnN1YnNjcmliZShTb2NrZXRSZXN1bHRUeXBlRW51bS5UYXNrVmVyaWZ5LCAocmVzdWx0OiBBcnJheTxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+WuoeaguOS7u+WKoScsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHRoaXMubXNnQ2VudGVyLnRhc2tNc2dOdW0gPSByZXN1bHQubGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLm1zZ0NlbnRlci5mZWVkYmFja01zZ051bSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubXNnQ2VudGVyLm1zZ1RvdGFsTnVtID0gcmVzdWx0Lmxlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVNc2codGhpcy5tc2dDZW50ZXIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL+S7u+WKoeWkhOeQhuWQjua2iOaBr+S4reW/g+S7u+WKoeaVsOe9ruS4ujBcclxuICAgICAgICB0aGlzLiRzY29wZS4kb24oJ21zZ0NlbnRlclNlbmQnLCAoZXZlbnQ6IGFueSwgZGF0YTogTXNnQ2VudGVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubXNnQ2VudGVyLnRhc2tNc2dOdW0gPSBkYXRhLnRhc2tNc2dOdW07XHJcbiAgICAgICAgICAgIHRoaXMubXNnQ2VudGVyLmZlZWRiYWNrTXNnTnVtID0gZGF0YS5mZWVkYmFja01zZ051bTtcclxuICAgICAgICAgICAgdGhpcy5tc2dDZW50ZXIubXNnVG90YWxOdW0gPSBkYXRhLm1zZ1RvdGFsTnVtO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog57uR5a6ac29ja2V05by65Yi25LiL57q/5LqL5Lu2XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zb2NrZXRGYWN0b3J5LnN1YnNjcmliZShTb2NrZXRSZXN1bHRUeXBlRW51bS5Vc2VyT2ZmTGluZSwgKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXJEZWMubm90Q2xvc2VJbmZvKFwiPGRpdiBjbGFzcz0ndS1tc2ctbm90Y2xvc2UnPlwiICsgdGhpcy5pMThuRmFjdG9yeSgnRkRTXzAwXzAyXzAyJykgKyBcIjwvZGl2PlwiLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5pMThuRmFjdG9yeSgnRkRTXzAwXzA1XzAzJyksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmkxOG5GYWN0b3J5KCdGRFNfMDBfMDVfMDEnKSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6L+U5Zue55m75b2V55WM6Z2iXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyDlj5HpgIHlhajlsYDor7fmsYIsIOWFs+mXrei9ruW3oeeahGNoZWNrLWxvZ2luXHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYnJvYWRjYXN0KEJ1YmJsZUNvZGUuTE9HSU5fT1VUKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvKj09PT09PT09PT09PSovXHJcblxyXG4gICAgICAgIC8v6aG16Z2i6ZSA5q+B5pe26Kej57uR6K6i6ZiFXHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zb2NrZXRGYWN0b3J5LnVuU3Vic2NyaWJlKFNvY2tldFJlc3VsdFR5cGVFbnVtLlRhc2tWZXJpZnkpO1xyXG4gICAgICAgICAgICB0aGlzLnNvY2tldEZhY3RvcnkudW5TdWJzY3JpYmUoU29ja2V0UmVzdWx0VHlwZUVudW0uRXhwb3J0KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g5pu05paw57O757uf6YWN572uXHJcbiAgICAgICAgdGhpcy5zYXZlU3lzdGVtRGF0YSgpO1xyXG5cclxuICAgICAgICAvL+eUqOaIt+S4reW/g+adg+mZkOmFjee9rlxyXG4gICAgICAgIHRoaXMudXNlckNlbnRlclJpZ2h0ID0gdGhpcy51c2VySW5mb0NhY2hlRmFjdG9yeS5oYXNGdW5jQXV0aChcInRvb2xPcHRpb25cIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9wZW5Db21wYXJlUG9wdXAoKSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7ICRkZXN0cm95OiBGdW5jdGlvbiB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbXBhcmVJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNvbXBhcmVIVE1MLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIHRpdGxlOiBmYWxzZSxcclxuICAgICAgICAgICAgY2xvc2VCdG46IDAsXHJcbiAgICAgICAgICAgIHNraW46IFwibm8tc2Nyb2xsXCIsXHJcbiAgICAgICAgICAgIGFyZWE6IFtcIjc2NXB4XCIsIFwiNDE4cHhcIl0sXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lyg5YWla2V5IOWSjCDopoHlrZjlhaXnmoTmlbDmja5cclxuICAgIHByaXZhdGUgaGFuZGxlTXNnKG1zZ0RhdGE6IE1zZ0NlbnRlcikge1xyXG4gICAgICAgIC8v6I635Y+W5a+56LGhXHJcbiAgICAgICAgbGV0IHN0b3JhZ2VOdW0gPSB0aGlzLmhhbmRsZVN0b3JhZ2UuZ2V0U2Vzc2lvblN0b3JhZ2VEYXRhKFN0b3JhZ2VLZXkubXNnQ2VudGVyS2V5KTtcclxuICAgICAgICBpZiAoc3RvcmFnZU51bSkge1xyXG4gICAgICAgICAgICBtc2dEYXRhLnRhc2tNc2dOdW0gKz0gc3RvcmFnZU51bS50YXNrTXNnTnVtO1xyXG4gICAgICAgICAgICBtc2dEYXRhLmZlZWRiYWNrTXNnTnVtICs9IHN0b3JhZ2VOdW0uZmVlZGJhY2tNc2dOdW07XHJcbiAgICAgICAgICAgIG1zZ0RhdGEubXNnVG90YWxOdW0gKz0gc3RvcmFnZU51bS5tc2dUb3RhbE51bTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lrZjlgqjlr7nosaFcclxuICAgICAgICB0aGlzLmhhbmRsZVN0b3JhZ2Uuc2V0U2Vzc2lvblN0b3JhZ2VEYXRhKFN0b3JhZ2VLZXkubXNnQ2VudGVyS2V5LCBtc2dEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaOp+WItuaKpeitpuW8ueahhumikeeOh1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2hBbGFybSgpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc1JlZnJlc2hBbGFybSA9IHRydWU7XHJcbiAgICAgICAgfSwgdGhpcy5hbGFybVJlZnJlc2hUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nbG9iYWxQdXNoKGRhdGE6IGFueSkge1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaXNSZWZyZXNoQWxhcm0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNSZWZyZXNoQWxhcm0gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoQWxhcm0oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKCEhdGhpcy50aGVPcGVuZWRMYXlyKSAmJiAodGhpcy5sYXllci5jbG9zZSh0aGlzLnRoZU9wZW5lZExheXIpKTtcclxuXHJcbiAgICAgICAgbGV0IHNjb3BlOmFueSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICAvL+azqOWFpeadg+mZkOWAvFxyXG4gICAgICAgIGxldCBfQXV0aG9yaXR5OiB7IFtrZXk6IHN0cmluZ106IEJvb2xlYW4gfSA9IHtcclxuICAgICAgICAgICAgRHluYW1pY0FsYXJtRGlzcG9zZTogISF0aGlzLm1vdWxlTGlzdFsnUmVhbER5bmFtaWMuRGlzcG9zZUFsYXJtJ10sXHJcbiAgICAgICAgICAgIER5bmFtaWNBbGFybURlbGV0ZTogISF0aGlzLm1vdWxlTGlzdFsnUmVhbER5bmFtaWMuRGVsZXRlQWxhcm1SZWNvcmQnXSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNjb3BlLl9BdXRob3JpdHkgPSBfQXV0aG9yaXR5O1xyXG4gICAgICAgIC8v5pWw5o2uXHJcbiAgICAgICAgc2NvcGUuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgaWYoZGF0YS5vcmlJZCl7XHJcbiAgICAgICAgICAgIHRoaXMudGFza1NlcnZpY2UuZmluZENhckJ5SWQoZGF0YS5vcmlJZCkudGhlbigocmVzOkJhY2tSZXNwb25zZUJvZHk8Q2FyTW9uaXRvcj4pPT57XHJcbiAgICAgICAgICAgICAgICBzY29wZS50YXNrID0gcmVzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5BbGFybVBvcHVwKHNjb3BlLGNhckFsYXJtUG9wdXApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkYXRhLkFsYXJtTG9nICYmIGRhdGEuQWxhcm1Mb2cuT2JqZWN0VHlwZSA9PT0gT2JqZWN0VHlwZS5DYW1lcmEudmFsdWUpe1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tTZXJ2aWNlLmZpbmRGYWNlQnlUYXNrSWQoZGF0YS5BbGFybUxvZy5UYXNrSWQpLnRoZW4oKHJlczogQmFja1Jlc3BvbnNlQm9keTxUYXNrTW9kZWw+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS50YXNrID0gcmVzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5BbGFybVBvcHVwKHNjb3BlLHBlcnNvbkFsYXJtUG9wdXApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMudGFza1NlcnZpY2UuZmluZFJmaWRCeUlkKGRhdGEuQWxhcm1Mb2cuVGFza0lkKS50aGVuKChyZXM6QmFja1Jlc3BvbnNlQm9keTxNYWNNb25pdG9yPik9PntcclxuICAgICAgICAgICAgICAgIHNjb3BlLnRhc2sgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3BlbkFsYXJtUG9wdXAoc2NvcGUscmZpZEFsYXJtUG9wdXApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9wZW5BbGFybVBvcHVwKHNjb3BlOmFueSx0cGw6c3RyaW5nKXtcclxuICAgICAgICB0aGlzLmxheWVyLmNsb3NlKHRoaXMudGhlT3BlbmVkTGF5cik7XHJcbiAgICAgICAgdGhpcy50aGVPcGVuZWRMYXlyID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgcmVzaXplOiBmYWxzZSxcclxuICAgICAgICAgICAgdGl0bGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIGNsb3NlQnRuOiBmYWxzZSxcclxuICAgICAgICAgICAgbW92ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRwbCxcclxuICAgICAgICAgICAgb2Zmc2V0OiAncmInLC8v5Y+z5LiLXHJcbiAgICAgICAgICAgIGFuaW06IDIsLy/liqjnlLsyIOeUseS4i+WQkeS4iuWIkuWHulxyXG4gICAgICAgICAgICBzaGFkZTogMCwvL+aXoOmBrue9qVxyXG4gICAgICAgICAgICBhcmVhOiBbJ2F1dG8nLCBcImF1dG9cIl0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkb206IGFueSkge1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGRvbSkuZmluZCgnLmxheXVpLWxheWVyLWNvbnRlbnQnKS5jc3MoJ292ZXJmbG93JywgXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICAgICAgICAvL+iuqeW8ueeql+WGheWuueWxgue6p+mrmOS6jk9DWOaPkuS7tuinhumikVxyXG4gICAgICAgICAgICAgICAgZG9tLmZpbmQoJy5sYXl1aS1sYXllci10aXRsZScpLmJlZm9yZShcIjxpZnJhbWUgY2xhc3M9J2YtYWJzIHUtaWZyYW1lLWxheWVyJz48L2lmcmFtZT5cIik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bor63oqIBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRMYW5nKCkge1xyXG4gICAgICAgIC8v6I635Y+Wc2Vzc2lvblN0b3JhZ2XkuK3kv53lrZjnmoTor63oqIDnirbmgIFcclxuICAgICAgICBsZXQgbGFuZ3VhZ2U6IHN0cmluZyA9IHRoaXMuaGFuZGxlU3RvcmFnZS5nZXRTZXNzaW9uU3RvcmFnZURhdGEoU3RvcmFnZUtleS5sYW5ndWFnZUtleSk7XHJcbiAgICAgICAgaWYgKCFsYW5ndWFnZSkge1xyXG4gICAgICAgICAgICBsYW5ndWFnZSA9IExhbmd1YWdlRW51bS5DTjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy4kdHJhbnNsYXRlLnVzZShsYW5ndWFnZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogIOaUueWPmCDmiqXorabmkq3mlL7lvIDlhbNcclxuICAgICAqIEB0aW1lOiAyMDE3LTA4LTE5IDE1OjQyOjEyXHJcbiAgICAgKi9cclxuICAgIGNoYW5nZVBsYXlBbGFybU11c2ljU3RhdHVzKCkge1xyXG4gICAgICAgIHRoaXMuaXNQbGF5QWxhcm1NdXNpYyA9ICF0aGlzLmlzUGxheUFsYXJtTXVzaWM7XHJcbiAgICAgICAgdGhpcy51c2VySW5mb0NhY2hlRmFjdG9yeS5zZXRQbGF5TXVzaWNTdGF0dXModGhpcy5pc1BsYXlBbGFybU11c2ljKTtcclxuICAgIH07XHJcblxyXG4gICAgY2hlY2tMb2dpbigpIHtcclxuICAgICAgICAvLyDmr48z5YiG6ZKf5ZCR5ZCO5Y+w5Y+R6YCB5LiA5qyh5b+D6LezXHJcbiAgICAgICAgdGhpcy5jaGVja0xvZ2luSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8qVE9ETyDmnKrmjIflrprov5Tlm57nsbvlnosqL1xyXG4gICAgICAgICAgICB0aGlzLm1haW5TZXJ2aWNlLmNoZWNrTG9naW4odGhpcy51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VWlkKCkpO1xyXG4gICAgICAgIH0sIDEwMDAgKiA2MCk7XHJcblxyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbihCdWJibGVDb2RlLkxPR0lOX09VVCwgKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuY2hlY2tMb2dpbkludGVydmFsKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsb2dpbk91dCgpIHtcclxuICAgICAgICB0aGlzLm1haW5TZXJ2aWNlLmxvZ2luT3V0KHRoaXMudXNlckluZm9DYWNoZUZhY3RvcnkuZ2V0Q3VycmVudFVzZXJLZXlTdHIoKSkudGhlbigocmVzcDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYWZ0ZXJMb2dpbk91dCgpO1xyXG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hZnRlckxvZ2luT3V0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnmbvlh7pcclxuICAgICAqL1xyXG4gICAgYWZ0ZXJMb2dpbk91dCgpIHtcclxuICAgICAgICB0aGlzLmlzU3RvcENoZWNrID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9pbmRleC5odG1sXCI7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9hbGVydCBieSBrZXkgb24gMjAxNy82LzNcclxuICAgIHNob3dDaGlsZExpc3QoaXRlbTogYW55LCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGl0ZW0uaGFzQ2hpbGRSb3V0ZURvd25TZWxlY3QpIHtcclxuICAgICAgICAgICAgdGhpcy5tb2R1bGVDaGlsZEl0ZW1zID0gcm91dGVyU2VydmljZS5nZXRJbnN0YW5jZSgpLmdldE1vZHVsZUl0ZW1zKGl0ZW0ua2V5KTsvL+iOt+WPluW9k+WJjeaooeWdl+eahOWtkOaooeWdl+aVsOaNrlxyXG4gICAgICAgICAgICB0aGlzLm1vZHVsZUNoaWxkSXRlbXMubGVuZ3RoID4gMCAmJiAodGhpcy5pbmRleCA9IGluZGV4KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOS/ruaUueWvhueggeeql+WPo1xyXG4gICAgb3BlblVwZGF0ZVB3ZE1vZGFsKCkge1xyXG4gICAgICAgIGxldCBzY29wZTogYW55ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIGxldCB0aXRsZVN0cjogc3RyaW5nID0gdGhpcy5pMThuRmFjdG9yeSgnRkRTXzAwXzEyXzI5Jyk7XHJcbiAgICAgICAgc2NvcGUuY2xvc2VFbWl0TmFtZSA9IHRoaXMudXBkYXRlUHdkTW9kYWxDbG9zZUVtaXROYW1lO1xyXG4gICAgICAgIHRoaXMubGF5ZXIub3BlbihcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZVN0cixcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHVwZGF0ZVB3ZE1vZGFsSHRtbCxcclxuICAgICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgICAgIGFyZWE6IFtcIjQxM3B4XCIsIFwiMjAycHhcIl0sXHJcbiAgICAgICAgICAgICAgICBza2luOiBcIm92ZXJmbG93LXZpc2libGVcIixcclxuICAgICAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKS50aGVuKChpbmRleDogbnVtYmVyKSA9PiB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9wZW5DbG9zZVVwZGF0ZVB3ZExheWVyV2F0Y2goKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUHdkTW9kYWxMYXllciA9IGluZGV4O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyDmt7vliqAg5L+u5pS5TW9kZWwg5YWz6Zet55uR5ZCsXHJcbiAgICBwcml2YXRlIG9wZW5DbG9zZVVwZGF0ZVB3ZExheWVyV2F0Y2goKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnVwZGF0ZVB3ZE1vZGFsTGF5ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJG9uKHRoaXMudXBkYXRlUHdkTW9kYWxDbG9zZUVtaXROYW1lLCAoZXZlbjogYW55LCBkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpbk91dCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZSh0aGlzLnVwZGF0ZVB3ZE1vZGFsTGF5ZXIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635Y+W57O757uf5Y+C5pWw5bm257yT5a2YXHJcbiAgICBwcml2YXRlIHNhdmVTeXN0ZW1EYXRhKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLm1haW5TZXJ2aWNlLnVwZGF0ZVN5c3RlbURhdGEoKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAvLyDmnKrojrflj5bliLDmlbDmja7vvIzkuI3ov5vooYznvJPlrZjmk43kvZzvvIFcclxuICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuY29kZSA9PSAyMDAgJiYgcmVzLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zeXN0ZW1JbmZvQ2FjaGVGYWN0b3J5LnNldFN5c3RlbUluZm8ocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUsIFwiWW91ciBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBsb2NhbFN0b3JhZ2VcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmNsYXNzIE1haW5Db250cm9sbGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIEdldFF1ZXJ5SnNvbigpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0ge30gYXMgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcclxuICAgICAgICBsZXQgciA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpO1xyXG4gICAgICAgIGlmIChyKSB7XHJcbiAgICAgICAgICAgIGxldCBhcnIgPSByLnNwbGl0KCcmJyk7XHJcbiAgICAgICAgICAgIGFyci5mb3JFYWNoKChpdGVtOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBhcnIyID0gaXRlbS5zcGxpdCgnPScpIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgICAgICAgICByZXN1bHRbYXJyMlswXV0gPSBhcnIyWzFdO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2dpbkZvclF1ZXJ5KHVzZXI6IHN0cmluZywgcHdkOiBzdHJpbmcsIGlzTWVudTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IF9wYXJhbXM6IExvZ2luUGFyYW1zID0gbmV3IExvZ2luUGFyYW1zKCk7XHJcbiAgICAgICAgX3BhcmFtcy5wYXNzd29yZCA9IFBvcnRyYWl0VG9vbC5tZDUocHdkKTtcclxuICAgICAgICBfcGFyYW1zLnVzZXJuYW1lID0gdXNlcjtcclxuICAgICAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBkYXRhOiBfcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6ICcvcGRwL3VzZXIvYXV0aCcsXHJcbiAgICAgICAgfSkuZG9uZSgocmVzcDogQmFja1Jlc3BvbnNlQm9keTxMb2dpblVzZXJJbmZvPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzcCAmJiByZXNwLmRhdGEgJiYgcmVzcC5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU3lzdGVtQ29uZmlnLlVTRVJfSU5GT19LRVksIGFuZ3VsYXIudG9Kc29uKHJlc3AuZGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oU3lzdGVtQ29uZmlnLklTX01FTlUsIGlzTWVudSlcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvJztcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnLyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVzb2x2ZVF1ZXJ5KCkge1xyXG4gICAgICAgIGxldCBxdWVyeUpzb24gPSB0aGlzLkdldFF1ZXJ5SnNvbigpO1xyXG4gICAgICAgIGlmIChxdWVyeUpzb24pIHtcclxuICAgICAgICAgICAgaWYgKHF1ZXJ5SnNvbi51c2VyICYmIHF1ZXJ5SnNvbi5wd2QpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvZ2luRm9yUXVlcnkocXVlcnlKc29uLnVzZXIsIHF1ZXJ5SnNvbi5wd2QsIHF1ZXJ5SnNvbi5pc21lbnUgPyBxdWVyeUpzb24uaXNtZW51IDogJ3RydWUnKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTeXN0ZW1Db25maWcuSVNfTUVOVSwgJ3RydWUnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTeXN0ZW1Db25maWcuSVNfTUVOVSwgJ3RydWUnKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEB0aXRsZSDmoLnmja7nmbvlvZXojrflj5blvZPliY3mnYPpmZDkuIvnmoTot6/nlLHphY3nva5cclxuICAgICAqIEByZXR1cm4ge0FycmF5PElCYWNrUm91dGVyQ29uZmlnPn1cclxuICAgICAqIEB1cGRhdGUgaGpqXHJcbiAgICAgKiBAdGltZSAyMDE35bm0MTHmnIg45pelIDE5OjA3OjI2XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9nZXRNb2R1bGVBdXRob3JpemF0aW9uKCkge1xyXG4gICAgICAgIGxldCB0ZW1wID0gYW5ndWxhci5mcm9tSnNvbihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTeXN0ZW1Db25maWcuVVNFUl9JTkZPX0tFWSkpO1xyXG4gICAgICAgIGxldCBhdXRob3JpdGllcyA9IHRlbXAuSnNvblVzZXJEYXRhLk1vZHVsZUl0ZW1MaXN0IGFzIEFycmF5PE1vZHVsZUl0ZW1FeD47XHJcbiAgICAgICAgbGV0IG1vZGVsID0gW10gYXMgQXJyYXk8SUJhY2tSb3V0ZXJDb25maWc+O1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGF1dGhvcml0aWVzKSAmJiBhdXRob3JpdGllcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIG1vZGVsID0gY29tcHV0ZWRNb2RlbChhdXRob3JpdGllcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcign5rKh5pyJ5Lu75L2V6aG16Z2i5p2D6ZmQJylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNvbXB1dGVkTW9kZWwobW9kZWxMaXN0OiBBcnJheTxNb2R1bGVJdGVtRXg+LCBhcnI6IEFycmF5PElCYWNrUm91dGVyQ29uZmlnPiA9IFtdKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9kZWxMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW9kZWwgPSBtb2RlbExpc3RbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAobW9kZWwuRnVsbE5hbWVTcGFjZVBhdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaCh7IGNvZGU6IG1vZGVsLkZ1bGxOYW1lU3BhY2VQYXRoIH0gYXMgSUJhY2tSb3V0ZXJDb25maWcpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoQXJyYXkuaXNBcnJheShtb2RlbC5vcGVyYXRlSXRlbUxpc3QpICYmIG1vZGVsLm9wZXJhdGVJdGVtTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgY29tcHV0ZWRNb2RlbChtb2RlbC5vcGVyYXRlSXRlbUxpc3QgYXMgQXJyYXk8TW9kdWxlSXRlbUV4PiwgYXJyKVxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhcnI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbW9kZWw7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgX2luaXRDb250cm9sbGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGFwcC5jb250cm9sbGVyKCdtYWluTWVudUNvbnRyb2xsZXInLCBNYWluTWVudUNvbnRyb2xsZXIpO1xyXG4gICAgICAgIC8vIEF1dGhvcml0eVxyXG4gICAgICAgIGFwcC52YWx1ZShcIm1vdWxlTGlzdFwiLCAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgdGVtcCA9IGFuZ3VsYXIuZnJvbUpzb24obG9jYWxTdG9yYWdlLmdldEl0ZW0oU3lzdGVtQ29uZmlnLlVTRVJfSU5GT19LRVkpKTtcclxuICAgICAgICAgICAgbGV0IGF1dGhvcml0aWVzID0gdGVtcCAmJiB0ZW1wLkpzb25Vc2VyRGF0YSAmJiB0ZW1wLkpzb25Vc2VyRGF0YS5Nb2R1bGVJdGVtTGlzdDtcclxuICAgICAgICAgICAgbGV0IF9hdXRob3JpdGllczogeyBba2V5OiBzdHJpbmddOiBCb29sZWFuIH0gPSB7fTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5kZWJ1ZyhcIkxvY2FsU3RvcmFnZS5VU0VSX0lORk9fS0VZXCIsIGF1dGhvcml0aWVzKTtcclxuICAgICAgICAgICAgLy8g5Yik5pat5p2D6ZmQ5pWw5o2u5piv5ZCm5a2Y5ZyoXHJcbiAgICAgICAgICAgIGlmIChhdXRob3JpdGllcykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlbjEgPSBhdXRob3JpdGllcy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgaiwgbGVuMjtcclxuICAgICAgICAgICAgICAgIGZvciAoOyBpIDwgbGVuMTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2F1dGhvcml0aWVzW2F1dGhvcml0aWVzW2ldLkZ1bGxOYW1lU3BhY2VQYXRoXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lrZDmqKHlnZflip/og73mk43kvZxcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXV0aG9yaXRpZXNbaV0uT3BlcmF0ZUl0ZW1MaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdWJNb2RlbDogQXJyYXk8YW55PiA9IGF1dGhvcml0aWVzW2ldLk9wZXJhdGVJdGVtTGlzdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbjIgPSBzdWJNb2RlbC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoOyBqIDwgbGVuMjsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYXV0aG9yaXRpZXNbc3ViTW9kZWxbal0uRnVsbE5hbWVTcGFjZVBhdGhdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gX2F1dGhvcml0aWVzO1xyXG4gICAgICAgIH0pKCkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsaW5rU3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5yZXNvbHZlUXVlcnkoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgcm91dGVyU2VydmljZS5nZXRJbnN0YW5jZSgpLmluaXQodGhpcy5fZ2V0TW9kdWxlQXV0aG9yaXphdGlvbigpKTtcclxuICAgICAgICAgICAgdGhpcy5faW5pdENvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgYW5ndWxhci5ib290c3RyYXAoZG9jdW1lbnQsIFsncG9ydHJhaXQnXSk7XHJcbiAgICAgICAgfSkuY2F0Y2goKGU6IEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbm5ldyBNYWluQ29udHJvbGxlcigpLmxpbmtTdGFydCgpOyJdfQ==
