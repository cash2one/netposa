
// import {UserPersonInfo} from "../../../core/server/procedure/UserPersonInfo";.
import {app} from "../app/main.app";
import 'angular';
import {User} from "../../../core/entity/User";
import {ResponseResult, BackResponseBody} from "../../../core/params/result/ResponseResult";
import {IResponseNotifyFactory} from "../factory/response.notify.factory";
import "../factory/response.notify.factory";
import {ChannelInfo} from "../../../core/server/ChannelInfoModel";

export interface IChannelInfoService{
    //POST /soundlight/getchannel 获取声光报警通道
    getChannelList:()=>Promise<ResponseResult<Array<ChannelInfo>>>;
}

class  ChannelInfoService implements IChannelInfoService{
    static $inject:Array<string> = ['$http','notifyFactory'];
    private notifyFunc:(res: ResponseResult<any>)=>ResponseResult<any>;

    constructor(private $http: any, private notifyFactory: IResponseNotifyFactory) {
        this.$http = $http;
        this.notifyFunc = this.notifyFactory.msg({onlySuccess: true});
    }

    getChannelList = ()=> {
        return this.$http({
            method: 'post',
            url: '/pdp/soundlight/getchannel',
        })
    }
}

app
    .service('channelInfoService', ChannelInfoService);