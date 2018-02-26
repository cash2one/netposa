/**
 * Created by dell on 2017/5/20.
 */
import "webUploader";
import "jquery"
declare var require: any;
declare var $: any;

let webUploader = require("webuploader");
const WebUploadEventName = {
    fileQueued: "fileQueued",
    filesQueued: "filesQueued",
    fileDequeued: "fileDequeued",
    startUpload: "startUpload",
    stopUpload: "stopUpload",
    uploadFinished: "uploadFinished",
    uploadStart: "uploadStart",
    uploadBeforeSend: "uploadBeforeSend",
    uploadAccept: "uploadAccept",
    uploadProgress: "uploadProgress",
    uploadError: 'uploadError',
    uploadSuccess: "uploadSuccess",
    uploadComplete: "uploadComplete",
    error: "error"
};

export interface IWebUpload{
    destroy():void;
    upload():void;
    option(optName: any, params? :any): any;
}

export interface IWebUploadOpts{
    initComplete: Function;
    uploadAcceptFilter: Function;
    uploadFinished: Function;
    uploadStart: Function;
    uploadSuccess: Function;
    fileDequeued: Function;
}

class WebUpload implements IWebUpload{

    option(optName: any, params? :any): any {
        if(params){
            this.uploader[optName] = params;
        }else{
            return this.uploader(optName);
        }
    }

    destroy(){
        this.uploader.destroy();
    }

    upload(){
        this.uploader.upload();
    }

    uploader: any;

    defaultOptions = {
        swf: "/libs/webuploader-0.1.5/Uploader.swf",
        // 默认上传图片服务器
        server: "/bimg/UpLoadFile",

        resize: false,
        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },
        formData: {
            dest: "LOC" // 上传图片服务器带的参数
        },
        sendAsBinary: true // 是否将图片按照body来发送
    };

    constructor(opt: any){
        opt = opt || {};
        let opts = $.extend(true, {}, this.defaultOptions, {
            formData: opt.formData,
            server: opt.server
        });
        this.uploader = webUploader.Base.create(opts);
        this.initEvent(opt);
    }

    private initEvent(opt: IWebUploadOpts){
        this.uploader.on(WebUploadEventName.filesQueued, ()=>{

        });
        this.uploader.on(WebUploadEventName.fileDequeued, (file: any)=>{
            if(typeof opt.fileDequeued === "function"){
                opt.fileDequeued(file.id);
            }
        });
        this.uploader.on(WebUploadEventName.uploadAccept, (object: any, ret: any)=>{
            if(typeof opt.uploadAcceptFilter === "function"){
                return opt.uploadAcceptFilter(ret);
            }
        });
        this.uploader.on(WebUploadEventName.uploadFinished, ()=>{
            if(typeof opt.uploadFinished === "function"){
                opt.uploadFinished();
            }
        });
        this.uploader.on(WebUploadEventName.uploadStart, ()=>{
            if(typeof opt.uploadStart === "function"){
               opt.uploadStart();
            }
        });
        this.uploader.on(WebUploadEventName.uploadSuccess, (file: any, response: Object)=>{
            if(typeof opt.uploadSuccess === "function"){
                opt.uploadSuccess(response);
            }
        });

    }
}

class WebUploadFactory{

    init(opt: any){
        return new WebUpload(opt);
    }
}