/// <amd-dependency path="text!../common/alarmMsgTemplate/alarmMsg.html" name="alarmMsgHtml" />
/// <amd-dependency path="text!../common/alarmMsgTemplate/personAlarmPopup.html" name="personAlarmPopup" />
/// <amd-dependency path="text!../common/alarmMsgTemplate/carAlarmPopup.html" name="carAlarmPopup" />
/// <amd-dependency path="text!../common/alarmMsgTemplate/rfidAlarmPopup.html" name="rfidAlarmPopup" />


/// <amd-dependency path="text!../common/msgCenterPopup/msgCenter.popup.html" name="msgCenterPopupHtml" />
/// <amd-dependency path="text!../index/updatePwdModal/updatePwd.modal.html" name="updatePwdModalHtml"/>
/// <amd-dependency path="text!../compare/compare.html" name="compareHTML"/>




import {ObjectType} from "../../core/enum/ObjectType";

declare let updatePwdModalHtml: string;
declare let alarmMsgHtml: any, rfidAlarmPopup: any,carAlarmPopup:any,personAlarmPopup:any;
declare let msgCenterPopupHtml: any;

declare let define: any, angular: any, $: any, require: any;
import { BubbleCode } from "../common/enum/bubble.code";
import "../../style/style";
import { app } from '../common/app/main.app';
import routerService from "../common/router/router.service";
import "../common/translate/translate.main";
import 'angular';
import "../common/msgCenterPopup/msgCenter.popup.controller";
import "../common/alarmMsgTemplate/rfidAlarmPopup.controller";
import "../common/alarmMsgTemplate/carAlarmPopup.controller";
import "../common/alarmMsgTemplate/personAlarmPopup.controller";
import "../index/updatePwdModal/updatePwd.modal.controller";

import '../common/directive.util';
import '../common/interceptor.util';
import '../common/filter/app.filter';
import "./main.service";
import { IMainService } from "./main.service";
import "../common/factory/response.notify.factory";
// TODO 很多地方用了 JSON.**方法, 但是都没有引用json2,所以统一放在此处
import "json2";
import { IUserInfoCacheFactory } from "../common/factory/userinfo.cache.factory";
import "../common/factory/userinfo.cache.factory";

import "../common/factory/socket.factory";
import { ISocketFactory } from "../common/factory/socket.factory";
import { SocketResultTypeEnum } from "../../core/server/enum/SocketResultTypeEnum";
//存储报警处理弹出窗口的状态，关联socket推送
import "../common/alarmMsgTemplate/alarmDisposePopupCache.factory";
import { IAlarmPopupCache } from "../common/alarmMsgTemplate/alarmDisposePopupCache.factory";

import { IHandleStorage, MsgCenter } from "../common/factory/HandleStorage.factory"
import "../common/factory/HandleStorage.factory"
import { StorageKey } from "../../core/enum/StorageKeyEnum"

import {ITaskService} from "../common/services/task.service";
import  "../common/services/task.service";

import "ng-scrollBars";
import { ILayerDec } from "../common/factory/layerMsg.factory";
import "../common/factory/layerMsg.factory";
import { SystemConfig } from "../common/system-config";
import { IDynamicControlCacheFactory } from "../dynamicControl/dynamicControl.cache.factory";
import { LanguageEnum } from "../common/enum/LanguageEnum";
import { ModuleItemEx } from "../../core/entity/ex/ModuleItemEx";
import { IBackRouterConfig } from "../common/router/router";
import { LoginUserInfo } from "../../core/entity/ex/UserEx";
import { BackResponseBody, HttpResponseResult, ResponseResult } from "../../core/params/result/ResponseResult";
import PortraitTool from "../common/portrait-tool";
import { LoginParams } from "../login/login.service";

// import '../baseconfig/system-properties/system.properties.store'
// import { ISystemDataService} from '../baseconfig/system-properties/system.properties.store'

import "../common/factory/systemInfo.cache.factory";
import { ISystemInfoCacheProvider } from "../common/factory/systemInfo.cache.factory";
import '../compare/compare.controller';
import '../common/services/deviceSocket.service';
import { IdeviceSocket } from '../common/services/deviceSocket.service';
import SocketPushModel from "../../core/server/SocketPushModel";
import {CarMonitor, MacMonitor, TaskModel} from "../../core/server/TaskModel";


declare let compareHTML: any;

let Promise = require("es6-promise");

class MainMenuController {
    static $inject = [
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
    isStopCheck: boolean = false;
    // 测试退出使用 10次后退出提示
    moduleItems: Array<any>;
    moduleChildItems: Array<any>;
    index: number;
    checkLoginInterval: any;

    currentIndex: number;

    //登录信息显示
    loginUserName: string;
    currentTime: Array<string>;

    //全局推送报警信息
    socketSubscribeId: string;

    theOpenedLayr: string;
    compareIndex: string;

    //全局推送报警信息
    // 密码修改
    updatePwdModalLayer: number;
    updatePwdModalCloseEmitName: string;
    alarmRefreshTime: number = 3000;
    isRefreshAlarm: boolean = true;

    //消息中心 新的任务数和反馈数
    msgCenter: MsgCenter;

    // 报警声音控制
    isPlayAlarmMusic: boolean;
    //不同语言下样式
    isLanguageCn: boolean;
    isShowMenu: boolean = false;
    userCenterRight:boolean = false;

    //----------
    constructor(
        private $scope: any,
        private $interval: any,
        private $timeout: any,
        private $state: any,
        private layer: any,
        private mainService: IMainService,
        private $translate: any,
        private userInfoCacheFactory: IUserInfoCacheFactory,
        private socketFactory: ISocketFactory,
        private i18nFactory: any,
        private alarmPopupCache: IAlarmPopupCache,
        private mouleList: { [key: string]: Boolean },
        private handleStorage: IHandleStorage,
        private layerDec: ILayerDec,
        private $rootScope: any,
        private dynamicControlCacheFactory: IDynamicControlCacheFactory,
        private systemInfoCacheFactory: ISystemInfoCacheProvider,
        private deviceSocketServer: IdeviceSocket,
        private $http: any,
        private taskService:ITaskService) {

        $rootScope.$on('$stateChangeStart', function (event: any, toState: any, toParams: any, fromState: any, fromParams: any) {
            if (fromState.name.indexOf('maintain') > -1) {
                angular.forEach($http.pendingRequests, function (request) {
                    if (request.cancel) {
                        request.cancel.resolve();
                    }
                });
            }
        });

        $rootScope.$on('closeAlarmPopup', (event) => {
            this.layer.close(this.theOpenedLayr);
            this.alarmPopupCache.setAlarmPopupState(false);
        })

        $rootScope.$on('closeComparePopup', (event) => {
            this.layer.close(this.compareIndex);
        })

        this.isPlayAlarmMusic = this.userInfoCacheFactory.getPlayMusicStatus();

        this.moduleItems = routerService.getInstance().getModuleItems(null);
        this.checkLogin();
        this.getLang();

        this.loginUserName = this.userInfoCacheFactory.getCurrentRealName();
        try {
            this.isShowMenu = JSON.parse(sessionStorage.getItem(SystemConfig.IS_MENU));
            if (this.isShowMenu === true) {
                $('#menu-group').show()
            } else {
                $('#menu-group').hide()
            }
        } catch (e) {
            $('#menu-group').show()
        }
        //不同语言下
        let currentLang: string = this.handleStorage.getSessionStorageData(StorageKey.languageKey);
        if (currentLang === LanguageEnum.CN) {
            this.isLanguageCn = true;
        } else if (currentLang === LanguageEnum.EN) {
            this.isLanguageCn = false;
        }

        //接收websocket消息
        this.socketSubscribeId = this.socketFactory.subscribe(SocketResultTypeEnum.SubscribeAllAlarmData, (data: any) => {

            if (this.alarmPopupCache.getAlarmPopupState()) {
                return
            }
            //调用追加数据 Array 展示最新一条
            if (data) {
                this._globalPush(data[data.length - 1]);
            }
        });

        /*======= 消息中心 ========*/
        this.msgCenter = new MsgCenter();
        this.socketFactory.subscribe(SocketResultTypeEnum.TaskVerify, (result: Array<any>) => {
            console.error('审核任务', result);
            this.msgCenter.taskMsgNum = result.length;
            this.msgCenter.feedbackMsgNum = 0;
            this.msgCenter.msgTotalNum = result.length;
            this.handleMsg(this.msgCenter);
        });

        //任务处理后消息中心任务数置为0
        this.$scope.$on('msgCenterSend', (event: any, data: MsgCenter) => {
            this.msgCenter.taskMsgNum = data.taskMsgNum;
            this.msgCenter.feedbackMsgNum = data.feedbackMsgNum;
            this.msgCenter.msgTotalNum = data.msgTotalNum;
        });


        /**
         * 绑定socket强制下线事件
         */
        this.socketFactory.subscribe(SocketResultTypeEnum.UserOffLine, (result: any) => {
            this.layerDec.notCloseInfo("<div class='u-msg-notclose'>" + this.i18nFactory('FDS_00_02_02') + "</div>",
                this.i18nFactory('FDS_00_05_03'),
                this.i18nFactory('FDS_00_05_01')).then(() => {
                    // 返回登录界面
                    window.location.href = "/";
                });
            // 发送全局请求, 关闭轮巡的check-login
            this.$rootScope.$broadcast(BubbleCode.LOGIN_OUT);
        });
        /*============*/

        //页面销毁时解绑订阅
        this.$scope.$on('$destroy', () => {
            this.socketFactory.unSubscribe(SocketResultTypeEnum.TaskVerify);
            this.socketFactory.unSubscribe(SocketResultTypeEnum.Export);
        });

        // 更新系统配置
        this.saveSystemData();

        //用户中心权限配置
        this.userCenterRight = this.userInfoCacheFactory.hasFuncAuth("toolOption");
    }

    public openComparePopup() {
        let scope: { $destroy: Function } = this.$scope.$new();

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
    }

    //传入key 和 要存入的数据
    private handleMsg(msgData: MsgCenter) {
        //获取对象
        let storageNum = this.handleStorage.getSessionStorageData(StorageKey.msgCenterKey);
        if (storageNum) {
            msgData.taskMsgNum += storageNum.taskMsgNum;
            msgData.feedbackMsgNum += storageNum.feedbackMsgNum;
            msgData.msgTotalNum += storageNum.msgTotalNum;
        }
        //存储对象
        this.handleStorage.setSessionStorageData(StorageKey.msgCenterKey, msgData);
    }

    /**
     * 控制报警弹框频率
     */
    private refreshAlarm() {
        setTimeout(() => {
            this.isRefreshAlarm = true;
        }, this.alarmRefreshTime);
    }

    private _globalPush(data: any) {

        if (!this.isRefreshAlarm) {
            return;
        } else {
            this.isRefreshAlarm = false;
            this.refreshAlarm();
        }
        (!!this.theOpenedLayr) && (this.layer.close(this.theOpenedLayr));

        let scope:any = this.$scope.$new();
        //注入权限值
        let _Authority: { [key: string]: Boolean } = {
            DynamicAlarmDispose: !!this.mouleList['RealDynamic.DisposeAlarm'],
            DynamicAlarmDelete: !!this.mouleList['RealDynamic.DeleteAlarmRecord'],
        };
        scope._Authority = _Authority;
        //数据
        scope.data = data;
        if(data.oriId){
            this.taskService.findCarById(data.oriId).then((res:BackResponseBody<CarMonitor>)=>{
                scope.task = res.data;
                this.openAlarmPopup(scope,carAlarmPopup);
            });
            return;
        }
        if(data.AlarmLog && data.AlarmLog.ObjectType === ObjectType.Camera.value){
            this.taskService.findFaceByTaskId(data.AlarmLog.TaskId).then((res: BackResponseBody<TaskModel>) => {
                scope.task = res.data;
                this.openAlarmPopup(scope,personAlarmPopup);
            });
            return
        }else{
            this.taskService.findRfidById(data.AlarmLog.TaskId).then((res:BackResponseBody<MacMonitor>)=>{
                scope.task = res.data;
                this.openAlarmPopup(scope,rfidAlarmPopup);
            });
            return
        }

    }

    private openAlarmPopup(scope:any,tpl:string){
        this.layer.close(this.theOpenedLayr);
        this.theOpenedLayr = this.layer.open({
            type: 1,
            resize: false,
            title: false,
            scope: scope,
            closeBtn: false,
            move: false,
            content: tpl,
            offset: 'rb',//右下
            anim: 2,//动画2 由下向上划出
            shade: 0,//无遮罩
            area: ['auto', "auto"],
            success: function (dom: any) {
                angular.element(dom).find('.layui-layer-content').css('overflow', "hidden");
                //让弹窗内容层级高于OCX插件视频
                dom.find('.layui-layer-title').before("<iframe class='f-abs u-iframe-layer'></iframe>");
            },
            end: function () {
                scope.$destroy();
            }
        });
    }
    /**
     * 获取语言
     */
    private getLang() {
        //获取sessionStorage中保存的语言状态
        let language: string = this.handleStorage.getSessionStorageData(StorageKey.languageKey);
        if (!language) {
            language = LanguageEnum.CN;
        }
        this.$translate.use(language);
    };

    /**
     *  改变 报警播放开关
     * @time: 2017-08-19 15:42:12
     */
    changePlayAlarmMusicStatus() {
        this.isPlayAlarmMusic = !this.isPlayAlarmMusic;
        this.userInfoCacheFactory.setPlayMusicStatus(this.isPlayAlarmMusic);
    };

    checkLogin() {
        // 每3分钟向后台发送一次心跳
        this.checkLoginInterval = setInterval(() => {
            /*TODO 未指定返回类型*/
            this.mainService.checkLogin(this.userInfoCacheFactory.getCurrentUid());
        }, 1000 * 60);

        this.$scope.$on(BubbleCode.LOGIN_OUT, (event: Event) => {
            clearInterval(this.checkLoginInterval);
        });
    }

    loginOut() {
        this.mainService.loginOut(this.userInfoCacheFactory.getCurrentUserKeyStr()).then((resp: any) => {
            this.afterLoginOut();
        }).catch(() => {
            this.afterLoginOut();
        });
    }

    /**
     * 登出
     */
    afterLoginOut() {
        this.isStopCheck = true;
        this.$timeout(() => {
            window.location.href = "/index.html";
        });
    }

    //alert by key on 2017/6/3
    showChildList(item: any, index: number) {
        if (item.hasChildRouteDownSelect) {
            this.moduleChildItems = routerService.getInstance().getModuleItems(item.key);//获取当前模块的子模块数据
            this.moduleChildItems.length > 0 && (this.index = index);

        }
    }

    // 修改密码窗口
    openUpdatePwdModal() {
        let scope: any = this.$scope.$new();
        let titleStr: string = this.i18nFactory('FDS_00_12_29');
        scope.closeEmitName = this.updatePwdModalCloseEmitName;
        this.layer.open(
            {
                type: 1,
                title: titleStr,
                content: updatePwdModalHtml,
                scope: scope,
                area: ["413px", "202px"],
                skin: "overflow-visible",
                end: function () {

                    scope.$destroy();
                }
            }
        ).then((index: number) => {

            this.openCloseUpdatePwdLayerWatch();

            this.updatePwdModalLayer = index;
        });
    };

    // 添加 修改Model 关闭监听
    private openCloseUpdatePwdLayerWatch() {
        if (!this.updatePwdModalLayer) {
            this.$scope.$on(this.updatePwdModalCloseEmitName, (even: any, data: any) => {
                if (data) {
                    this.loginOut();
                }
                this.layer.close(this.updatePwdModalLayer);
            });
        }
    }

    // 获取系统参数并缓存
    private saveSystemData() {
        let self = this;
        this.mainService.updateSystemData().then((res: any) => {
            // 未获取到数据，不进行缓存操作！
            if (res && res.code == 200 && res.data) {
                try {
                    self.systemInfoCacheFactory.setSystemInfo(res.data);
                } catch (e) {
                    console.log(e, "Your browser doesn't support localStorage");
                }
            }
        })
    }

}


class MainController {
    constructor() {

    }

    private GetQueryJson() {
        let result = {} as { [key: string]: string };
        let r = window.location.search.substr(1);
        if (r) {
            let arr = r.split('&');
            arr.forEach((item: string) => {
                let arr2 = item.split('=') as Array<string>;
                result[arr2[0]] = arr2[1];
            });
        } else {
            result = null;
        }
        return result
    }

    private loginForQuery(user: string, pwd: string, isMenu: string) {
        let _params: LoginParams = new LoginParams();
        _params.password = PortraitTool.md5(pwd);
        _params.username = user;
        return $.ajax({
            type: 'post',
            data: _params,
            url: '/pdp/user/auth',
        }).done((resp: BackResponseBody<LoginUserInfo>) => {
            if (resp && resp.data && resp.code === 200) {
                try {
                    localStorage.setItem(SystemConfig.USER_INFO_KEY, angular.toJson(resp.data));
                    sessionStorage.setItem(SystemConfig.IS_MENU, isMenu)
                } catch (e) {
                    window.location.href = '/';
                    console.error(e);
                }
            } else {
                window.location.href = '/';
            }
        })
    }

    private resolveQuery() {
        let queryJson = this.GetQueryJson();
        if (queryJson) {
            if (queryJson.user && queryJson.pwd) {
                return this.loginForQuery(queryJson.user, queryJson.pwd, queryJson.ismenu ? queryJson.ismenu : 'true')
            } else {
                sessionStorage.setItem(SystemConfig.IS_MENU, 'true')
            }
        } else {
            sessionStorage.setItem(SystemConfig.IS_MENU, 'true');
            return Promise.resolve(null)
        }
    }

    /**
     * @title 根据登录获取当前权限下的路由配置
     * @return {Array<IBackRouterConfig>}
     * @update hjj
     * @time 2017年11月8日 19:07:26
     * @private
     */
    private _getModuleAuthorization() {
        let temp = angular.fromJson(localStorage.getItem(SystemConfig.USER_INFO_KEY));
        let authorities = temp.JsonUserData.ModuleItemList as Array<ModuleItemEx>;
        let model = [] as Array<IBackRouterConfig>;
        if (Array.isArray(authorities) && authorities.length > 0) {
            model = computedModel(authorities);
        } else {
            console.error('没有任何页面权限')
        }

        function computedModel(modelList: Array<ModuleItemEx>, arr: Array<IBackRouterConfig> = []) {
            for (let i = 0; i < modelList.length; i++) {
                let model = modelList[i];
                if (model.FullNameSpacePath) {
                    arr.push({ code: model.FullNameSpacePath } as IBackRouterConfig)
                }
                // if (Array.isArray(model.operateItemList) && model.operateItemList.length > 0) {
                //     computedModel(model.operateItemList as Array<ModuleItemEx>, arr)
                // }
            }
            return arr;
        }

        return model;
    };

    private _initController = function () {
        app.controller('mainMenuController', MainMenuController);
        // Authority
        app.value("mouleList", (function () {
            let temp = angular.fromJson(localStorage.getItem(SystemConfig.USER_INFO_KEY));
            let authorities = temp && temp.JsonUserData && temp.JsonUserData.ModuleItemList;
            let _authorities: { [key: string]: Boolean } = {};
            // console.debug("LocalStorage.USER_INFO_KEY", authorities);
            // 判断权限数据是否存在
            if (authorities) {
                let i = 0,
                    len1 = authorities.length,
                    j, len2;
                for (; i < len1; i++) {
                    _authorities[authorities[i].FullNameSpacePath] = true;
                    //子模块功能操作
                    if (authorities[i].OperateItemList) {
                        let subModel: Array<any> = authorities[i].OperateItemList;
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

    linkStart() {
        this.resolveQuery().then(() => {
            routerService.getInstance().init(this._getModuleAuthorization());
            this._initController();
            angular.bootstrap(document, ['portrait']);
        }).catch((e: Error) => {
            console.error(e);
        })

    }
}

new MainController().linkStart();