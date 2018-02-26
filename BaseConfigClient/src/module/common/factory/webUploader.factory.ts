/**
 * Created by key on 2017/6/24.
 */
import {app} from "../../common/app/main.app";
import "webUploader";

declare var require: any;
let webUploader = require("webUploader");

interface fileModule{
    ext:string;
    id:string;
    lastModifiedDate:string;
    loaded:number;
    name:string;
    size:number;
    source:{[key:string]:any}
    statusText:string;
    type:string;
    _compressed:boolean;
    _events:Array<{[key:string]:any}>
    _info:{[key:string]:any}
    _meta:any
}

export interface IWebUploaderFactory{
    initWebUploader:Function
}

class WebUploaderFactory implements IWebUploaderFactory{
    uploader:any;
    //初始化webUploader
    initWebUploader(seletor:string,uploadSuccess:Function,filesQueued:Function,uploadError:Function) {

        this.uploader = webUploader.Base.create({
            auto: true,
            swf: "/libs/webuploader-0.1.5/Uploader.swf",
            server: "/bimg_upload/UpLoadFile",
            resize: false,
            pick: seletor,
            // dnd:'.m-putPic-area',

            // 只允许选择图片文件。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            },
            formData: {
                dest: "LOC" // 上传图片服务器带的参数
            },
            sendAsBinary: true, // 是否将图片按照body来发送
            duplicate :true,
            disableGlobalDnd: true,
            //可上传的文件数量
            fileNumLimit: 2
        });

        this.uploader.on("filesQueued",(file:Array<fileModule>) => {
            console.log(file);
            this.uploader.makeThumb(file,(err:any,src:any) => {
                !!filesQueued && filesQueued(err,src);
            })
        });

        this.uploader.on('uploadError',(file:fileModule) => {
            console.log(file);
            !!uploadError && uploadError(file);
        });

        this.uploader.on('uploadSuccess',(file:fileModule,response:any) => {
            console.log(file);
            !!uploadSuccess && uploadSuccess(response);
        });

        return this.uploader;
    }
}

app.service('webUploaderFactory', WebUploaderFactory);
