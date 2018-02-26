import {app} from "../app/main.app";
import "socket.io";
import PortraitTool from "../portrait-tool";
import {IUserInfoCacheFactory} from "./userinfo.cache.factory";
import "./userinfo.cache.factory";
import SocketPushModel from "../../../core/server/SocketPushModel";
import {AlarmType, SocketResultTypeEnum} from "../../../core/server/enum/SocketResultTypeEnum";
import "config";
import Config from "../../../config";
import {IdeviceSocket} from '../services/deviceSocket.service';
import '../services/deviceSocket.service';
import {ObjectType} from "../../../core/enum/ObjectType";


declare var require: any;
declare var angular: any;
let io = require("socket.io");

/**
 * 在这里配置需要向后台额外订阅的数据类型
 * @type {{}}
 */
const NEED_BACK_SOCKET_TYPE = (function () {
    let result = {} as { [key: string]: boolean };
    result[SocketResultTypeEnum.SubcribeAccessLog] = true;
    result[SocketResultTypeEnum.SubscribeAlarmLog] = true;
    result[SocketResultTypeEnum.UserOnLine] = true;
    result[SocketResultTypeEnum.CameraOnLine] = true;
    result[SocketResultTypeEnum.ServerOnLine] = true;
    result[SocketResultTypeEnum.SearchFace] = true;
    return result;
})();

// https://socket.io/docs/client-api/
interface SocketConfig {
    reconnectionAttempts?: number; // 尝试重连的次数  number of reconnection attempts before giving up (Infinity)
    reconnection?: boolean; // whether to reconnect automatically (true)
    reconnectionDelay?: number; // how long to initially wait before attempting a new reconnection (1000). Affected by +/- randomizationFactor,
    reconnectionDelayMax?: number; // maximum amount of time to wait between reconnections (5000). Each attempt increases the reconnection delay by 2x along with a randomization as above
    randomizationFactor?: number; //  (0.5), 0 <= randomizationFactor <= 1
    timeout?: number; // connection timeout before a connect_error and connect_timeout events are emitted (20000)
    autoConnect?: boolean; // by setting this false, you have to call manager.open whenever you decide it's appropriate
}

export interface ISocketFactory {
    /**
     * 绑定事件
     * @param type 绑定的resultType类型
     * @param callback 触发的回调方法
     * @return 绑定的唯一id(用于解绑)
     */
    subscribe(type: string, callback: Function, objectId?: string, alarmType?: string): string; // 绑定事件
    unSubscribe(type: string, id?: string): void; // 解绑事件
    one(type: string, callback: Function): void; // 订阅一次性的事件, 当事件返回消息时, 自动解绑
    destroy(): void; // 销毁socket实例
}

/**
 * 每个注册的SocketSubModel对象
 * 继承于SocketPushModel
 */
class SocketSubModel extends SocketPushModel {
    id: string; // 每一个model的uuid
    type: string; // 接受的数据类型
    callback: Function; // 获得数据的回调函数
    isOne: boolean; // 是否是单次绑定就结束订阅的对象
    needExtraSub: boolean = false; // 是否需要额外向后台订阅一次

}

/**
 * 后台传来的数据类型
 */
interface DataModel {
    // 结果类型
    resultType: string;
    // 结果
    result: any;
}

type DataModelResult = any;

/**
 * websocket统一数据绑定工厂
 * 所有消息推送初始化都在此处完成
 * 所有功能模块都应该通过注册factory来监听websocket推送过来的消息
 * 订阅模式包含两种,
 * 1、一种是最基本的内部的订阅, 不向后台请求新的订阅(如果智能检索相关的功能, 还有全局的报警)
 * 2、另一种是需要向后台请求新的订阅(获取指定摄像机的报警信息,抓拍信息等)
 * 当websocket异常断线后, 需要重新订阅额外订阅请求的参数
 */
class SocketFactory implements ISocketFactory {

    private static URL = Config.SOCKET_URL;

    /**
     * 取消订阅
     * @param type
     * @param id
     */
    unSubscribe(type: string, id?: string): void {
        let arr = this.subModels[type];
        if (arr && arr.length > 0 && id != null) {
            // id不为空
            let i, len;
            for (i = 0, len = arr.length; i < len; i++) {
                if (arr[i].id === id) {
                    // 取消订阅
                    this._unSubscribe(arr[i]);
                    // 将订阅对象从缓存数组中移除
                    arr.splice(i, 1);
                    i--;
                    len--;
                    break;
                }
            }
            if (arr.length === 0) {
                // 当数组为空时 清空缓存对象
                this.subModels[type] = null;
            }
        } else if (arr && arr.length > 0) {
            // 清空当前type的所有
            let i, len;
            for (i = 0, len = arr.length; i < len; i++) {
                // 取消订阅
                this._unSubscribe(arr[i]);
                // 将订阅对象从缓存数组中移除
                arr.splice(i, 1);
                i--;
                len--;
            }
        }


        if (arr && arr.length === 0) {
            this.subModels[type] = null;
        }
    }

    one(type: string, callback: Function, objectId?: string): string {
        let model: SocketSubModel = new SocketSubModel();
        model.callback = callback;
        model.socketType = type;
        model.id = PortraitTool.getUUID();
        model.isOne = true;
        if (objectId) {
            model.objectID = objectId;
        }
        if (NEED_BACK_SOCKET_TYPE[model.socketType]) {
            model.needExtraSub = true;
        }
        return this._subscribe(model);
    }

    // TODO 销毁socket对象, 还未完成 resolve: wyr
    destroy(): void {
        this.subModels = null;
        this.socket.close();
        this.socket = null;
    }

    /**
     * 订阅对象
     * @param type
     * @param callback
     * @param objectId 可选, 后台需要接收的一些额外参数
     * @param alarmType
     * @returns {string}
     */
    subscribe(type: string, callback: Function, objectId?: string, alarmType?: string): string {

        let model: SocketSubModel = new SocketSubModel();
        model.callback = callback;
        model.socketType = type;
        model.id = PortraitTool.getUUID();
        if (objectId) {
            model.objectID = objectId;
        }
        if (alarmType) {
            model.alarmType = alarmType;
        }
        // 判断当前订阅类型是否需要向后台额外订阅
        if (NEED_BACK_SOCKET_TYPE[model.socketType]) {
            model.needExtraSub = true;
        }
        return this._subscribe(model);
    }

    /**
     * 只执行一次
     */
    private init() {
        this.socket = io(SocketFactory.URL, this.getSocketConfig());
        this.userId = this.userInfoCacheFactory.getCurrentUserId();
        if (this.userId == null) {
            console.error("socket init error: userId is null!");
        }
        this.bindEvent();
    }

    static $inject = ["userInfoCacheFactory", 'deviceSocketServer'];

    private socket: any;

    private subModels: { [key: string]: Array<SocketSubModel> };
    // 当前登录的用户id
    private userId: string;

    constructor(private userInfoCacheFactory: IUserInfoCacheFactory, private deviceSocketServer: IdeviceSocket) {
        this.subModels = {} as { [key: string]: Array<SocketSubModel> };
        this.init();
    }

    /**
     * 处理信息
     * @param dataStr
     */
    //Array<DataModel> & DataModel
    private handleMessage(dataStr: string) {
        let datas: Array<DataModel> & DataModel = JSON.parse(dataStr);//upDateBy key 后台现在统一传字符串过来
        // console.debug("从服务器返回来的消息");
        // edit 2017.8.10 由于Array<DataModel>可能有多条数据, 每条DataModel都会触发一次业务层的推送
        // 这会引起界面渲染频率过快的问题, 故这里先循环一遍数据, 再统一触发一次业务层推送
        let _map = {} as { [key: string]: Array<DataModelResult> };

        if (datas && angular.isArray(datas) && datas.length > 0) {
            let i, len, temp;
            for (i = 0, len = datas.length; i < len; i++) {
                temp = datas[i];
                if (!_map[temp.resultType]) {
                    _map[temp.resultType] = [] as Array<DataModelResult>;
                }
                _map[temp.resultType].push(temp.result as DataModelResult);
            }
        } else if (datas) {
            if (!_map[datas.resultType]) {
                _map[datas.resultType] = [] as Array<DataModelResult>;
            }
            _map[datas.resultType].push(datas.result as DataModelResult);
        }

        // 循环map, 根据类型推送信息
        let key;
        for (key in _map) {
            this.messageDistribution(key, _map[key]);
        }

        _map = null as any;

    }

    private handleMessageByAlarm(data: any) {
    }

    /**
     * 根据结果类型,选择要推送的对象,并推送
     * @param resultType 结果消息类型
     * @param datas 结果数组
     */
    private messageDistribution(resultType: string, datas: Array<DataModelResult>) {
        let i, len, arr = this.subModels[resultType], j = 0;
        if (arr && arr.length > 0) {
            for (i = 0, len = arr.length; i < len; i++, j++) {
                // 这里使用异步进行调用, 不阻塞其他界面
                // 用闭包, 防止变量变化
                (function (model: SocketSubModel, result: Array<DataModelResult>, index: number) {
                    setTimeout(function () {
                        // 推送给业务层的数据一定是数组格式
                        model.callback(result);
                    }, 10);
                })(arr[i], datas, j);

                if (arr[i].isOne) { // 如果是只绑定一次的, 则主动解绑
                    this._unSubscribe(arr[i]);
                    arr.splice(i, 1);
                    i--;
                    len--;
                }
            }
        } else {
            console.log(resultType, '推送数据没有模块使用!即将取消订阅');


        }
    }

    private unSubInvalidBusiness(resultType: string, data: DataModelResult) {
        if (resultType !== SocketResultTypeEnum.SubscribeAllAlarmData) {
            let params = {
                userID: this.userInfoCacheFactory.getCurrentUserId(),
                isCancel: true,
                socketType: resultType,
            } as any;
            if (resultType === SocketResultTypeEnum.SubscribeAlarmLog) {
                if (data.oriId) {
                    params.alarmType = AlarmType.Vehicle
                }
                if (data.AlarmLog && data.AlarmLog.ObjectType === ObjectType.Camera.value) {
                    params.alarmType = AlarmType.Face
                } else if (data.AlarmLog && data.AlarmLog.ObjectType === ObjectType.ElectronicFence.value) {
                    params.alarmType = AlarmType.Efence
                } else if (data.AlarmLog && data.AlarmLog.ObjectType === ObjectType.Wifi.value) {
                    params.alarmType = AlarmType.Wifi
                }
            }

        }
    }

    private getSocketConfig(): SocketConfig {
        return {
            reconnectionAttempts: 20
        } as SocketConfig;
    }

    private bindEvent() {
        let userId = this.userId;
        // 订阅一个最初的model, 此model和其他model不同, 永远存在, 不清除

        this.socket.on('connect', (data: any) => {
            console.log("socket connect" + SocketFactory.URL + "-success!");
            // 初次订阅
            this._reSubscribe();
        });

        this.socket.on(userId, (data: any) => {
            // console.log("从服务器返回来的消息", data);
            // console.debug("socket get topic hello push from server", data);
            this.handleMessage(data);
        });
        this.socket.on('message', (data: any) => {
            console.log("从服务器返回来的消息 -- message");
            // console.log("socket get topic hello push from server", data);
            this.handleMessageByAlarm(data);
        });
        this.socket.on("reconnect_failed", () => {
            console.error("socket test reconnect many-times but all failed!");
        });

        this.socket.on('disconnect', () => {
            console.error("socket is disconnect with server!");
        });

        this.socket.on('reconnect', (attempt: number) => {
            console.debug("socket trigger reconnect", attempt);
            // 重新订阅
            this._reSubscribe();
        });

        this.socket.on('error', (error: any) => {
            console.error("socket trigger error!", error);
        });
    }

    private _subscribe(subModel: SocketSubModel): string {
        if (!this.subModels[subModel.socketType]) {
            this.subModels[subModel.socketType] = new Array<SocketSubModel>();
        }
        this.subModels[subModel.socketType].push(subModel);
        if (subModel.needExtraSub) {
            this._subscribe2Server(subModel);
        }
        return subModel.id;
    }

    /**
     * 后台服务发送订阅请求
     * 流程改动, 现在的订阅还通知后台
     * @private
     */
    private _subscribe2Server(model: SocketSubModel) {
        if (this.socket) {
            this.socket.emit("NettyCallBackListener", this.getPushModel(model, false));
        } else {
            console.error("subscribe2Server error: this.socket is null");
        }
    }

    private _unSubscribe(model: SocketSubModel) {
        if (model && model.needExtraSub) {
            // 如果是额外向后台订阅的, 需要主动向后台取消订阅
            this._unSubscribe2Server(model);
        }
    }

    private _unSubscribe2Server(model: SocketSubModel) {
        if (this.socket) {
            this.socket.emit("NettyCallBackListener", this.getPushModel(model, true));
        } else {
            console.error("subscribe2Server error: this.socket is null");
        }
    }

    /**
     * 初始化订阅或者断线后的重新订阅
     * @private
     */
    private _reSubscribe() {
        this._reSubscribeMain();
        this._reSubscribeExtra();
    }

    /**
     * 重新订阅主推送
     * @private
     */
    private _reSubscribeMain() {
        let pushModel = new SocketPushModel();
        pushModel.userID = this.userId;
        pushModel.socketType = SocketResultTypeEnum.SubcribeAccessLog;
        pushModel.alarmType = 'Face';
        this.socket.emit("NettyCallBackListener", pushModel);
    }

    /**
     * 重新订阅额外推送
     * @private
     */
    private _reSubscribeExtra() {
        // 遍历额外推送枚举
        // 再次订阅一次
        // 正常情况下, 初始化的订阅调用, 都为空, 则不会进行判断
        // 此方法主要是断线重连时调用.
        let needExtra = NEED_BACK_SOCKET_TYPE as { [key: string]: boolean };
        let subModels = this.subModels;
        let key, arr, i, len;

        for (key in needExtra) {
            arr = subModels[key];
            if (arr && arr.length > 0) {
                for (i = 0, len = arr.length; i < len; i++) {
                    // 重新订阅
                    this._subscribe2Server(arr[i]);
                }
            }
        }
    }

    /**
     * 获取发送给后台的订阅model
     * @param model
     * @param isCancel 是否是取消订阅操作
     * @returns {SocketPushModel}
     */
    private getPushModel(model: SocketSubModel, isCancel: boolean) {
        let pushModel = new SocketPushModel();
        pushModel.userID = this.userId;
        pushModel.socketType = model.socketType;
        if (isCancel) {
            pushModel.isCancel = true;
        }
        if (model.objectID) {
            pushModel.objectID = model.objectID;
        }
        if (model.alarmType) {
            pushModel.alarmType = model.alarmType;
        }
        return pushModel;
    }

}

app.service("socketFactory", SocketFactory);