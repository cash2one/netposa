import {app} from "../../common/app/main.app";

import 'angular';
import {BusinessLibEx} from "../../../core/entity/ex/BusinessLibEx";
declare let angular: any;

export interface IBusinessLibPersonFactory {
    clearFactoryCache:()=>void;

    setCurrentFaceLib:(currentFaceLib:BusinessLibEx)=>void;
    getCurrentFaceLib:()=>BusinessLibEx;

    updateIsOpenModal:(isOpen:boolean)=>void;
    getIsOpenModal:()=>boolean;
}
/** create by zxq
 *  用于做人像库 前往 人员添加中间 变量缓存
 * @time: 2017-07-17 14:53:18
 */
class BusinessLibPersonFactory implements IBusinessLibPersonFactory{

    static $inject:Array<string> = [];
    /* 人脸库 页面 前往 人员列表相关 参数*/
    private currentFaceLib: BusinessLibEx;
    private isOpenModal:boolean;
    constructor() {
    }

    clearFactoryCache(){
        this.currentFaceLib = null;
        this.isOpenModal = null;
    };

    setCurrentFaceLib (currentFaceLib:BusinessLibEx){
        this.currentFaceLib = angular.copy(currentFaceLib);
    };

    getCurrentFaceLib ():BusinessLibEx{
        return this.currentFaceLib;
    };

    updateIsOpenModal(isOpen:boolean):void{
        this.isOpenModal = isOpen;
    };

    getIsOpenModal():boolean{
        return this.isOpenModal;
    };
}

app
    .service('businessLibPersonFactory', BusinessLibPersonFactory);