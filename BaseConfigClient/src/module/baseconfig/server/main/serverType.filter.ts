/**
 * Created by dell on 2017/4/11.
 */

import {app} from "../../../common/app/main.app";
import {VideoServerType} from "../../../../core/enum/VideoServerType";
import {ProxyServerType} from "../../../../core/enum/ProxyServerType";
import {IvsServerType} from "../../../../core/enum/IvsServerType";

class ServerTypeFilter {
    static proxyServer = function () {
        return function (type: string) {
            let keys = Object.keys(ProxyServerType);
            let val = '未知类型';
            for (let i = 0; i < keys.length; i++) {
                if (ProxyServerType[keys[i]].value === type) {
                    val =  ProxyServerType[keys[i]].text;
                    break;
                }
            }
            return val;
        }
    };

    static videoServer = function () {
        return function (dataList?: Array<any>, paramsName?: string) {
            if (paramsName && paramsName) {
                for (let i in dataList) {
                    if (VideoServerType[dataList[i][paramsName]]) {
                        dataList[i][paramsName] = VideoServerType[dataList[i][paramsName]].text;
                    } else {
                        dataList[i][paramsName] = '未知类型';
                    }
                }
            }
            return dataList;
        }
    }
    static ivsServer = function () {
        return function (dataList?: Array<any>, paramsName?: string) {
            if (paramsName && paramsName) {
                for (let i in dataList) {
                    if (IvsServerType[dataList[i][paramsName]]) {
                        dataList[i][paramsName] = IvsServerType[dataList[i][paramsName]].text;
                    } else {
                        dataList[i][paramsName] = '未知类型';
                    }
                }
            }
            return dataList;
        }
    }


}

app.filter("proxyServerTypeFilter", ServerTypeFilter.proxyServer);
app.filter("videoServerTypeFilter", ServerTypeFilter.videoServer);
app.filter("ivsServerTypeFilter", ServerTypeFilter.ivsServer);
