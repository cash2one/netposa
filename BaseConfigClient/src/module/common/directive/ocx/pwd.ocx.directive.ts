/**
 * Created by kevin on 2017/9/28 0028.
 */

import PortraitTool from "../../portrait-tool";
declare let angular: any;

export type LocalIP = {[key: string]:string};
export interface LocalMac{
    mac: string;
}

export interface IPwdOcx{
    getLocalIP():LocalIP;
    getLocalMac():LocalMac;
    checkOcx(): boolean;
    clear(): void;
    getOcxDownloadUrl(): string;
}

interface PwdOcxControl{
    GetLocalIP():LocalIP;
    GetLocalMac():LocalMac;
}

class PwdOcx implements IPwdOcx{

    private ocxId: string;
    private containerDom: Document;
    private ocx: PwdOcxControl;

    constructor(containerDom: Document){
        this.ocxId = PortraitTool.getUUID();
        this.containerDom = containerDom;
        this._init();
    }

    private _init(){
        let _ocx: any, _param: any;
        _ocx = angular.element("<object></object>");
        _ocx.attr("id", this.ocxId);
        // if (PortraitTool.getIEVer() > 0 && PortraitTool.getIEVer() <= 8) {
        //     _ocx.attr("classid", "CLSID:CEA4ADE1-AC94-4A75-AE30-85B99364FCD2");
        // } else {
        _ocx.html("<param name='onload' value='pluginLoaded'></param>");
        // }

        _ocx.attr("type", "application/x-snimg");
        _ocx.css("visibility", "collapse");
        // 不让此ocx元素占用位置
        _ocx.css("position", "absolute");
        _ocx.css("width", "1px");
        _ocx.css("height", "1px");

        angular.element(this.containerDom).append(_ocx);

        // 取得ocx的控件实例, 此实例用于其他方法调用ocx控件方法
        this.ocx = _ocx[0];
    }

    getOcxDownloadUrl(): string {
        return "/foplayer/SNImg_V1.0_Setup.exe";
    }

    clear(): void {
        // 移除控件
        angular.element(this.containerDom).empty().remove();
    }

    checkOcx(): boolean {
        let result = false;
        try{
            // 能执行成功不报错说明ocx控件安装成功, 否则就算没安装成功
            this.ocx.GetLocalIP();
            result = true;
        }catch(e){
            if(window.console){
                console.error("pwdocx.checkOcx error", e);
            }
        }
        return result;
    }

    getLocalIP(): LocalIP {
        let result:LocalIP;
        try{
            result = this.ocx.GetLocalIP();
        }catch(e){
            if(window.console){
                console.error("pwdocx.getLocalIP error: ", e);
            }
        }
        return result;
    }

    getLocalMac(): LocalMac {
        let result:LocalMac;
        try{
            result = this.ocx.GetLocalMac();
        }catch(e){
            if(window.console){
                console.error("pwdocx.getLocalMac error: ", e);
            }
        }
        return result;
    }
}

interface IPwdOcxFactory{
    getPwdOcx(containerDom: Document):IPwdOcx;
}

class PwdOcxFactory implements IPwdOcxFactory{
    constructor(){}

    getPwdOcx(containerDom: Document): IPwdOcx{
        return new PwdOcx(containerDom);
    }
}



export interface IPwdOcxControlFunc{
    getLocalIP(): LocalIP;
    getLocalMac(): LocalMac;
    checkOcx():boolean;
    getOcxDownloadUrl(): string;
}

class PwdOcxDirective{

    constructor(){}

    static instance = function(){
        return new PwdOcxDirective();
    };
    pwdOcx: IPwdOcx;
    ocxControlFunc: IPwdOcxControlFunc;
    init: (dom: Document)=>void;
    clear: ()=>void;
    getLocalIP: ()=>LocalIP;
    getLocalMac: ()=>LocalMac;
    checkOcx: ()=>boolean;
    getOcxDownloadUrl: ()=>string;

    restrict = "AE";
    scope = {
        initComplete: "&"
    };
    controller = function(pwdOcxFactory: IPwdOcxFactory){
        let vm = this as PwdOcxDirective;

        vm.init = function(dom: Document){
            vm.pwdOcx = pwdOcxFactory.getPwdOcx(dom);
        };

        vm.clear = function(){
            vm.pwdOcx.clear();
            vm.pwdOcx = null as any;
        };

        vm.getLocalIP = function(){
            return vm.pwdOcx.getLocalIP();
        };

        vm.getLocalMac = function(){
            return vm.pwdOcx.getLocalMac();
        };

        vm.checkOcx = function(){
            return vm.pwdOcx.checkOcx();
        }

        vm.getOcxDownloadUrl = function(){
            return vm.pwdOcx.getOcxDownloadUrl();
        }
    };

    link = function(scope: any, iElement: any, iAttrs: any, controller: PwdOcxDirective){
        let vm = controller;
        scope.$on("$destroy", ()=>{
            vm.ocxControlFunc = null as any;
            vm = null as any;
        });

        vm.init(iElement[0]);

        vm.ocxControlFunc = {
            getLocalIP: vm.getLocalIP,
            getLocalMac: vm.getLocalMac,
            checkOcx: vm.checkOcx,
            getOcxDownloadUrl: vm.getOcxDownloadUrl
        };

        scope.initComplete({ocxControlFunc: vm.ocxControlFunc});
    }
}

angular.module('pwd.ocx',['ng']);
angular.module("pwd.ocx").service("pwdOcxFactory", PwdOcxFactory);
angular.module("pwd.ocx").directive("pwdOcx", PwdOcxDirective.instance);