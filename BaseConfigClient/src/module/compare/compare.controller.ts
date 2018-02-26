import 'css!./compare.css';
import {app} from "../common/app/main.app";

// 服务
import "../common/services/uploadImage.service";
import {IUploadImageService} from "../common/services/uploadImage.service";
import "../common/services/analysis.service";
import {IAnalysisService} from "../common/services/analysis.service";
import "../common/factory/layerMsg.factory";
import { ILayerDec } from "../common/factory/layerMsg.factory";
import "../common/factory/socket.factory";
import {ISocketFactory} from "../common/factory/socket.factory";

// 参数
import {SocketResultTypeEnum} from "../../core/server/enum/SocketResultTypeEnum";

declare let $:any;

class ImageObjEum {
   
    imageUrl: string;
    key: string;
    status: boolean;

}

class compareController{
    static $inject = ['$scope','$rootScope', 'uploadImageService','$timeout', 'layerDec', 'analysisService','socketFactory'];
    
    faceImgList:any;
    imgNum:number;
    imgPathLeft:string
    imgPathRight:string;
    imgMiddleOne:string;
    imgMiddleTwo:string;
    leftQueryList:Array<ImageObjEum> = [];
    rightQueryList:Array<ImageObjEum> = [];
    taskId:string = '';
    score:number;
    comparAnimate:boolean=false;

   

    constructor(
        private $scope:any,
        private $rootScope:any,
        private uploadImageService: IUploadImageService,
        private $timeout:any,
        private layerDec:ILayerDec,
        private analysisService:IAnalysisService,
        private socketFactory:ISocketFactory
    ){
    }

    public closePage(){
        this.$rootScope.$emit('closeComparePopup');
    }

    public inputContent(testFile:string){

       if(testFile=" "){
          console.log("jieshou")
       }
    }

    /**
     * @description搜索身份号
     * @param event
     * @param {ImageObjEum} item
     */
    public imgUploadById(IdValue:any,position:string){
        console.log(IdValue);
        console.log(position)
        let self:compareController=this;
        if (!IdValue){
            this.layerDec.warnInfo("请输入身份证号");
            return
        }

        this.uploadImageService.uploadImageForId([IdValue]).then((res: any) => {
            if(res.code===200){
                res.data.forEach((item:any) => {
                    if(item.FacePicPath){
                        item.FacePicPath.forEach( (imagePath:string) => {
                            let obj = {} as any;
                            obj.imageUrl = imagePath
                            obj.status = true;
                            if(position=="left"){
                                self.leftQueryList.push(obj);
                            }else{
                                self.rightQueryList.push(obj);
                            }
                        })
                    }
                });
                console.log(self.leftQueryList);
                console.log(self.rightQueryList);
                self.$timeout(() => {
                    if (position==='left') {
                        // self.leftQueryList = newImageList
                    }else if(position==='right'){
                        // self.rightQueryList = newImageList
                    }
                    self.faceCompare();
                },3000)
            }
        });
    }

    static ImageShowData(){
        let imageObj:any = {

        }
    }

    //控制图片翻页
    public fipePage(phrase:string){

        
        if(phrase==='previous'){
            let previous=true;
            
       
    
        }
        else if(phrase==='next'){
            let next=true;
           
        }
       
    }
    


    //上传图片
    public imgUploading(event:any, position:string) {
        let self = this;
        let from = new FormData();
        from.append('image', event.target.files[0]);
        let data = {
            storeType: "LOC",
            imageCategory: "CaptureImage",
            commandType: "VerifyFace",
            detectType: "Face"
        };
        this.uploadImageService.uploadImageForFace(from, data).then((res: any) => {
            
            if ((res.code === 200) && (res.data && res.data.key)) { // 人脸识别成功
                let obj:ImageObjEum = {
                    imageUrl: res.data.imageurl,
                    key: res.data.key,
                    status: true,
                   
                };
                self.$timeout(() => {
                    if (position==='left') {
                        this.leftQueryList=[];
                        this.leftQueryList.push(obj);
                    }else if(position==='right'){
                        this.rightQueryList=[];
                        this.rightQueryList.push(obj)
                    }
                    self.faceCompare();
                });
            } else {
                self.layerDec.warnInfo('人脸识别失败');
            }
        });
   }

    public faceCompare(){
        let params={key0:'',key1:''};
        for(let i = 0;i< this.leftQueryList.length;i++){
            if(this.leftQueryList[i].status){
                params.key0 = this.leftQueryList[i].key;
            }
        }
        for(let i = 0;i< this.rightQueryList.length;i++){
            if(this.rightQueryList[i].status){
                params.key1= this.rightQueryList[i].key;
            }
        }

        // 判断是否都赋值
        if(params.key0!==""&&params.key1!==""){
            this.faceCompareQuery(params);
        }
        
    }

    public faceCompareQuery(params:any) {
        let self = this;
        self.taskId = params.key0;
        self.$timeout(() => {
            self.comparAnimate=true;
        });
        self.analysisService.faceverify(params).then((res: any) => {
            if (res.code === 200) {
                self.monitorSocket();
            } else {
                self.layerDec.warnInfo('1:1查询失败');
                self.$timeout(() => {
                    self.comparAnimate=false;
                });
            }
        });
    }

    // 监听socket
    public monitorSocket() {
        let self = this;
        self.socketFactory.subscribe(SocketResultTypeEnum.VerifyFace, (result: Array<any>) => {
            for (let i = 0; i < result.length;i++) {
                if ((result[i].code === 200)&&(result[i].data.TaskId === self.taskId)) {
                    self.$timeout(() => {
                        self.score = parseInt( result[i].data.Score);
                        self.score=Math.round(self.score);
                        self.comparAnimate=false;
                        console.log(self.score);
                    });
                    self.cancelMonitorSocket();
                } 
            }
        });
    }

    // 注销监听socket
    public cancelMonitorSocket() {
        let self = this;
        self.socketFactory.unSubscribe(SocketResultTypeEnum.VerifyFace);
    }
}

app.controller("compareController", compareController);

