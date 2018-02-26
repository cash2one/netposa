/**
 * Created by key on 2017/7/20.
 */
import {loginApp} from "./login.app";
import 'angular';
import "es6-promise";
declare let require: any;
let Promise = require("es6-promise");
declare let angular: any;

export interface ILayerDec{
    successInfo:Function;
    failInfo:Function;
    warnInfo:Function;
    info:Function;
    /**
     * 不会关闭的信息弹出框
     * @param info
     * @param titleMsg
     * @param btnMsg
     * @return 当窗口关闭时, 进行的后续操作
     */
    notCloseInfo(info: string, titleMsg?: string, btnMsg?: string):Promise<any>;
}

class LayerDec implements ILayerDec {
    openedMsgLayer:number;
    static $inject:Array<string> = ['layer'];

    constructor(private layer: any) {}

    //成功
    successInfo(info:string){
        this.openMsg(info,{skin:'layer-msg-success'});
    }
    //失败
    failInfo(info:string){
        this.openMsg(info,{skin:'layer-msg-fail '});
    }
    //警告
    warnInfo(info:string){
        this.openMsg(info,{skin:'layer-msg-warn'});
    }
    //普通
    info(info:string){
        this.openMsg(info,{skin:'layer-msg-info'});
    }

    /**
     * 不会自动关闭的弹出框, 且不会因为其他弹出框弹出而消失
     */
    notCloseInfo(info: string, titleMsg?: string, btnMsg?: string):Promise<any>{
        let promise = new Promise((resolve: any, reject: any)=>{
            this.layer.open({
                type: 1,
                content: info,
                title: titleMsg || null,
                //让弹窗内容层级高于OCX插件视频
                hasIframe:true,
                shadeClose: false,
                closeBtn: 0,
                btn: btnMsg || null,
                yes: (index: number)=>{
                    this.layer.close(index);
                },
                end: ()=>{
                    resolve(null);
                }
            });
        });
        return promise;
    }

    private openMsg(msgStr:string,params:any){
        if(this.openedMsgLayer>0){
            this.closeOpened();
        }
        let promise = new Promise((resolve: any, reject: any)=>{
            this.layer.open({
                type: 1,
                skin:"layer-msg-common " + params.skin,
                time:params.time || 2000 ,
                content: msgStr,
                title: false,
                offset:params.offset || '120px' ,
                //让弹窗内容层级高于OCX插件视频
                hasIframe:true,
                shade:params.shade || 0,
                closeBtn: 0,
                resize:false,
                move:false,
                btn: null,
                success:(dom:any,index:number)=>{
                    this.updateMsgLayer(index);
                    resolve(null);
                }
            });
        });
        return promise;
    }

    updateMsgLayer = (index:number)=>{
        this.openedMsgLayer = index;
    };
    closeOpened = ()=>{
        this.layer.close(this.openedMsgLayer);
    }
}

loginApp.service('layerDec', LayerDec);