/** create by zxq
 *
 * @time: 2017-06-08 17:31:49
 * @params:
 * @return:
 */
import {app} from "../../common/app/main.app";
import {SystemConfig} from "../system-config";
import {LoginUserInfo} from "../../../core/entity/ex/UserEx";
import {ModuleItem} from "../../../core/server/ModulItemModel";
import Role from "../../../core/entity/Role";
declare let angular:any;
// 由于用到了国际化, 所以需要在国际化配置初始化之后加载


export interface IUserInfoCacheFactory{
    /** create by zxq
     * 获取 用户登录后存本地的用户姓名
     * @time: 2017-06-08 17:46:48
     * @return: 当前用户保存
     */
    getCurrentRealName(): string;
    /**
     * 获取登录的用户名
     * creator: wyr
     * time: 2017.6.27
     */
    getCurrentUid():string;

    /**
     * 获得userKey字符串
     * creator: wyr
     * time: 2017.6.27
     */
    getCurrentUserKeyStr():string;
    /** create by zxq
     * 获取 用户登录后存本地的ID
     * @time: 2017-06-15 17:57:41
     */
    getCurrentUserId(): string;

    getCurrentUserKey(): {[key:string]:string};

    /**
     * 当前用户id键值对, http拦截器用
     */
    getCurrentUserIDMap(): {[key:string]:string};
    /** create by zxq
     *  判断当前用户是否有指定 的 功能权限
     * @time: 2017-06-15 17:57:41
     * @params: powerCode :string 功能模块权限 key
     * @return: boolean
     */
    hasFuncAuth(powerKey:string): boolean;

    /**
     * 获取用户 是否打开声音报警
     * @time: 2017-08-19 15:21:11
     * @params:
     * @return: boolean
     */
    getPlayMusicStatus(): boolean;
    /**
     *  修改用户 是否打开声音报警
     * @time: 2017-08-19 15:21:11
     * @params:
     * @return: boolean
     */
    setPlayMusicStatus(params:boolean): void;

    removeUserCache(): void;

    getRoleIds(): string;

    getUserModuleAuthList():Array<ModuleItem>
}

export class UserInfoCacheProvider{
    private USER_INFO_KEY = SystemConfig.USER_INFO_KEY;
    private AUTH_CACHE_KEY_NAME = "AuthCacheKey";
    private USER_ID_KEY = "UserIDKey";

    private Cache_User_Infos: LoginUserInfo = null;
    private Cache_User_FuncAuthMap: {[key:string]:ModuleItem} = {};

    private IS_OPEN_ALARM_MUSIC_KEY = "IS_OPEN_ALARM_MUSIC";
    private IS_OPEN_OPEN_ALARM_MUSIC_VALUE:boolean;

    private roleIds: string;

    constructor(){
        this.Cache_User_Infos = this.getUserLoginInfo();
        this.Cache_User_FuncAuthMap =  this.getUserFuncAuthMap();
        this.IS_OPEN_OPEN_ALARM_MUSIC_VALUE = this.getPlayMusicStatusFromLocal();
    }

    $get(){
        let vm = this;

        return {
            hasFuncAuth(powerKey:string):boolean{
                if (!powerKey) return false;
                if (vm.Cache_User_FuncAuthMap[powerKey]) return true;
                return false;
            },
            // 避免频繁访问 localStorage...
            getPlayMusicStatus():boolean{
                return vm.IS_OPEN_OPEN_ALARM_MUSIC_VALUE;
            },
            /**
             * 返回用户的姓名
             * @returns {null}
             */
                getCurrentRealName(){
                if(vm.Cache_User_Infos && vm.Cache_User_Infos.JsonUserData && vm.Cache_User_Infos.JsonUserData.Person){
                    return vm.Cache_User_Infos.JsonUserData.Person.Name;
                }else{
                    console.warn("UserName Is Null!");
                    return "";
                }
            },
            getCurrentUserId():string {
                if(vm.Cache_User_Infos){
                    return vm.Cache_User_Infos.ID;
                }else{
                    console.warn("UserID Is Null!");
                    return "";
                }
            },
            getCurrentUserIDMap(): {[key:string]: string}{
                let result = {} as {[key:string]: string};
                if(vm.Cache_User_Infos){
                    result[vm.USER_ID_KEY] = vm.Cache_User_Infos.ID;
                }
                return result;
            },
            getCurrentUserKeyStr(){
                if(vm.Cache_User_Infos && vm.Cache_User_Infos.JsonUserData){
                    return vm.Cache_User_Infos.JsonUserData.UserKey;
                }else{
                    return null;
                }
            },
            /**
             * 返回当前用户的权限key
             */
                getCurrentUserKey() {
                let result = {} as {[key:string]:string};
                if(vm.Cache_User_Infos && vm.Cache_User_Infos.JsonUserData){
                    result[vm.AUTH_CACHE_KEY_NAME] = vm.Cache_User_Infos.JsonUserData.UserKey;
                }
                return result;
            },
            setPlayMusicStatus(params:boolean){
                localStorage.setItem(vm.IS_OPEN_ALARM_MUSIC_KEY,angular.toJson(params));
                vm.IS_OPEN_OPEN_ALARM_MUSIC_VALUE = params;
            },
            getCurrentUid(): string {
                if(vm.Cache_User_Infos && vm.Cache_User_Infos.Uid){
                    return vm.Cache_User_Infos.Uid;
                }else{
                    console.warn("Username Is Null!");
                    return null;
                }
            },
            removeUserCache(): void{
                try{
                    localStorage.removeItem(vm.USER_INFO_KEY);
                }catch(e){
                    if(window.console){
                        console.error("userinfocachefactory.removeUserCache error: ", e);
                    }
                }
            },
            getRoleIds(): string{
                if(vm.roleIds == null){
                    vm.roleIds = vm.getRoleIds();
                }
                return vm.roleIds;
            },
            getUserModuleAuthList():Array<ModuleItem>{
                return vm.getUserModuleAuthList();
            }

        } as IUserInfoCacheFactory;
    }
    private getUserLoginInfo() {
        let result = null;
        try{
            result = angular.fromJson(localStorage.getItem(this.USER_INFO_KEY));
        }catch (e){
            result = null;
            console.error("userinfoCacheProvider.getUserLoginInfo", e);
        }
        return result;
    };

    /** create by zxq
     *  获取功能权限 映射
     * @time: 2017-06-15 19:39:31
     */
    private getUserFuncAuthMap = ():{[key:string]:ModuleItem}=>{
        let funcAuthMap = {} as {[key:string]:ModuleItem};
        let userInfo:LoginUserInfo = this.getUserLoginInfo();
        if(userInfo && userInfo.JsonUserData && userInfo.JsonUserData.ModuleItemList){
            let i=0,len= userInfo.JsonUserData.ModuleItemList.length;
            for(;i<len;i++){
                if(userInfo.JsonUserData.ModuleItemList[i]){
                    funcAuthMap[userInfo.JsonUserData.ModuleItemList[i].FullNameSpacePath] = userInfo.JsonUserData.ModuleItemList[i];
                }
                if(userInfo.JsonUserData.ModuleItemList[i].OperateItemList){
                    for (let k in userInfo.JsonUserData.ModuleItemList[i].OperateItemList){
                        funcAuthMap[userInfo.JsonUserData.ModuleItemList[i].OperateItemList[k].FullNameSpacePath] = userInfo.JsonUserData.ModuleItemList[i].OperateItemList[k];
                    }
                }
            }
        }
        return funcAuthMap;
    };

    public getUserModuleAuthList(): Array<ModuleItem>{
        let result = [] as Array<ModuleItem>;
        let userInfo: LoginUserInfo = this.getUserLoginInfo();
        if(userInfo && userInfo.JsonUserData && userInfo.JsonUserData.ModuleItemList){
            let moduleItems = userInfo.JsonUserData.ModuleItemList;
            let i=0,len=moduleItems.length;
            for(; i<len; i++){
                if(moduleItems[i]){
                    result.push(moduleItems[i]);
                }
            }
        }
        return result;
    };

    private getPlayMusicStatusFromLocal = ():boolean=>{
        let flag = true;
        try{
            flag = angular.fromJson(localStorage.getItem(this.IS_OPEN_ALARM_MUSIC_KEY));
        }catch (e){
            localStorage.setItem(this.IS_OPEN_ALARM_MUSIC_KEY,angular.toJson(true));
            flag = true;
        }
        return flag;
    };

    private getRoleIds(): string{
        let result;
        if(this.Cache_User_Infos && this.Cache_User_Infos.JsonUserData && this.Cache_User_Infos.JsonUserData.ListRole && this.Cache_User_Infos.JsonUserData.ListRole.length > 0){
            let arr = [] as Array<string>;
            angular.forEach(this.Cache_User_Infos.JsonUserData.ListRole, (model: Role)=>{
                arr.push(model.ID);
            });
            result = arr.join(",");
        }
        return result;
    }

}

/**
 * 这里取名叫userInfoCacheFactory是为了让业务代码改动最小，故保持原来的名字(原来为factory)
 * 之所以做成provider, 是因为app.config需要用到此代码中的函数
 */
app
    .provider('userInfoCacheFactory', UserInfoCacheProvider);

