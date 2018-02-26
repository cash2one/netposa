/**
 *  代理服务器类型
 * @time: 2017-05-04 15:34:17
 * @params:
 * @return:
 */
export interface IProxyServerTypeEnum {
    value:string,
    text:string,
    index:number
}
interface IProxyServerType{
    PCC:IProxyServerTypeEnum;
    SoundLightAlarm:IProxyServerTypeEnum;
    SMS:IProxyServerTypeEnum;
    MSG:IProxyServerTypeEnum;
    VideoServer:IProxyServerTypeEnum;
}
export const ProxyServerType:{[key: string]: IProxyServerTypeEnum} & IProxyServerType = {
    PCC:{
        value:"PCC",
        text:"PCC接入服务",
        index:20016
    },
    SoundLightAlarm:{
        value:"SoundLightAlarm",
        text:"声光报警接入服务",
        index:20026
    },
    SMS:{
        value:"SMS",
        text:"短信猫接入服务",
        index:20036
    },
    MSG:{
        value:"MSG",
        text:"消息接入服务",
        index:20046
    },
    VideoServer:{
        value:"VideoServer",
        text:"视频接入服务",
        index:20056
    },
    IOD:{
        value:"IOD",
        text:"数据服务器",
        index:20066
    }
};


