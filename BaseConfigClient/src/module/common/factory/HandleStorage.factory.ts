/**
 * Created by tj on 2017/8/2.
 */
import {app} from "../../common/app/main.app";

export class MsgCenter{
    taskMsgNum:number = 0;
    feedbackMsgNum:number = 0;
    msgTotalNum:number = 0;
}

export interface IHandleStorage {
    setSessionStorageData: Function;
    getSessionStorageData: Function;
    removeSessionStorageData: Function;

    setLocalStorageData:Function;
    getLocalStorageData:Function;
    removeLocalStorageData:Function;
}

class HandleStorage implements IHandleStorage {

    //存储到SessionStorage
    setSessionStorageData(key: string, data: any) {
        window.sessionStorage.setItem(key, JSON.stringify(data));
    }

    //存储到LocalStorage
    setLocalStorageData(key: string, data: any) {
        window.localStorage.setItem(key, JSON.stringify(data));
    }

    //获取SessionStorage
    getSessionStorageData(key: string) {
        let data = window.sessionStorage.getItem(key);
        if (data) {
            return JSON.parse(window.sessionStorage.getItem(key));
        } else {
            return null;
        }
    }

    //获取LocalStorage
    getLocalStorageData(key: string) {
        return JSON.parse(window.localStorage.getItem(key));
    }

    //删除SessionStorage
    removeSessionStorageData(key: string) {
        window.sessionStorage.removeItem(key);
    }

    //删除LocalStorage
    removeLocalStorageData(key: string) {
        window.localStorage.removeItem(key);
    }
}

app
    .service('handleStorage', HandleStorage);
