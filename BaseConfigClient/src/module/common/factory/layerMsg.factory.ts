/**
 * Created by key on 2017/7/20.
 */
import { app } from "../app/main.app";
import 'angular';
import "es6-promise";
declare let require: any;
let Promise = require("es6-promise");
declare let angular: any;

export class LayerConfirmParams {
    content: string;
    title?: string;
    btnStrList: Array<string>;
    okBtnFun: Function;
    cancelBtnFun?: Function;
    icon?: number;
};

export interface ILayerDec {
    successInfo: Function;
    failInfo: Function;
    warnInfo: Function;
    info: Function;
    /**
     * 不会关闭的信息弹出框
     * @param info
     * @param titleMsg
     * @param btnMsg
     * @return 当窗口关闭时, 进行的后续操作
     */
    notCloseInfo(info: string, titleMsg?: string, btnMsg?: string): Promise<any>;

    confirm(params: LayerConfirmParams): Promise<number>;
}

class LayerDec implements ILayerDec {
    openedMsgLayer: number;
    private errorMasLayer: { [key: string]: number } = {};
    static $inject: Array<string> = ['layer', 'i18nFactory'];

    constructor(private layer: any, private i18nFactory: any) { }

    //成功
    successInfo(info: string) {
        this.openMsg(info, { skin: 'layer-msg-success' });
    }
    //失败
    failInfo(info: string, code?: number) {
        if (code == 0) {
            return null
        } else {
            if (this.openedMsgLayer > 0) {
                this.closeOpened();
            }
            return this.openMsg(info, { skin: 'layer-msg-fail ' }).then(() => {
                this.errorMasLayer[info] = this.openedMsgLayer;
            });
        }
    }
    //警告
    warnInfo(info: string) {
        this.openMsg(info, { skin: 'layer-msg-warn' });
    }
    //普通
    info(info: string) {
        this.openMsg(info, { skin: 'layer-msg-info' });
    }

    /**
     * 不会自动关闭的弹出框, 且不会因为其他弹出框弹出而消失
     */
    notCloseInfo(info: string, titleMsg?: string, btnMsg?: string): Promise<any> {
        let promise = new Promise((resolve: any, reject: any) => {
            this.layer.open({
                type: 1,
                content: info,
                title: titleMsg || null,
                //让弹窗内容层级高于OCX插件视频
                hasIframe: true,
                shadeClose: false,
                closeBtn: 0,
                btn: btnMsg || null,
                yes: (index: number) => {
                    this.layer.close(index);
                },
                end: () => {
                    resolve(null);
                }
            });
        });
        return promise;
    }

    /**
         * 带有确认取消按钮确认框
         * @param str
         * @param title
         *
         */
    confirm(params: LayerConfirmParams) {
        let defaultParams = new LayerConfirmParams();
        defaultParams.btnStrList = [this.i18nFactory('FDS_00_07_01'), this.i18nFactory('FDS_00_07_02')];
        defaultParams.icon = 0;
        defaultParams.cancelBtnFun = (index: number) => {
            this.layer.close(index);

        };
        defaultParams.okBtnFun = (index: number) => {
            this.layer.close(index);

        };
        defaultParams.content = params.content;
        defaultParams.title = params.title ? params.title : this.i18nFactory("FDS_00_05_04");

        let promise = new Promise((resolve: any, reject: any) => {

            !!params.cancelBtnFun && (defaultParams.cancelBtnFun = params.cancelBtnFun);
            !!params.okBtnFun && (defaultParams.okBtnFun = params.okBtnFun);

            !!params.icon && (defaultParams.icon = params.icon);

            if (params.btnStrList && angular.isArray(params.btnStrList)) {
                if (params.btnStrList[0]) {
                    defaultParams.btnStrList[0] = params.btnStrList[0];
                }
                if (params.btnStrList[1]) {
                    defaultParams.btnStrList[1] = params.btnStrList[1];
                }
            }
            this.layer.confirm(defaultParams.content, {
                icon: defaultParams.icon,
                title: defaultParams.title,
                closeBtn: 0,
                btn: defaultParams.btnStrList,
                skin: 'overflow-visible',
                area: ["500px", "auto"],
                success: (dom: any, index: number) => {
                    // let iframsHtml = "<iframe class='f-abs u-iframe-layer'></iframe>";
                    // angular.element(dom).prev().prepend(iframsHtml);
                    // alter wyr 2017.9.12 confirm确认框没有必要缓存index, 也不会因为触发其他info warn等弹出信息而关闭
                    // this.updateOpenLayerIndex(index);
                    resolve(index);
                }
            }, defaultParams.okBtnFun, defaultParams.cancelBtnFun);
        });
        return promise;
    }

    private openMsg(msgStr: string, params: any) {
        if (this.openedMsgLayer > 0) {
            this.closeOpened();
        }
        let promise = new Promise((resolve: any, reject: any) => {
            this.layer.open({
                type: 1,
                skin: "layer-msg-common " + params.skin,
                time: params.time || 2000,
                content: msgStr,
                title: false,
                offset: params.offset || '120px',
                //让弹窗内容层级高于OCX插件视频
                hasIframe: true,
                shade: params.shade || 0,
                closeBtn: 0,
                resize: false,
                move: false,
                btn: null,
                success: (dom: any, index: number) => {
                    this.updateMsgLayer(index);
                    resolve(null);
                }
            });
        });
        return promise;
    }

    updateMsgLayer = (index: number) => {
        this.openedMsgLayer = index;
    };
    closeOpened = () => {
        this.layer.close(this.openedMsgLayer);
    }
}

app.service('layerDec', LayerDec);