import {app} from "../../common/app/main.app";
import "css!./socket.css";
import {ISocketFactory} from "../../common/factory/socket.factory";
import "../../common/factory/socket.factory";
import {SocketResultTypeEnum} from "../../../core/server/enum/SocketResultTypeEnum";

export class SocketController{
    static $inject = ["$scope","socketFactory"];


    constructor(private $scope: any, private socketFactory: ISocketFactory){
        let vm = this;

        $scope.$on("$destroy", ()=>{

        });

        // 引进ocx控件
    }

    subscribeDC(){
        this.socketFactory.subscribe(SocketResultTypeEnum.DeployControl, (data: any)=>{
            console.log("收到的动态布控推送为", data);
        });
    }

    unSubscribeDC(){
        this.socketFactory.unSubscribe(SocketResultTypeEnum.DeployControl);
    }

    subscribeRetrieval(){
        this.socketFactory.subscribe(SocketResultTypeEnum.Retrieval, (data: any)=>{
            console.log("收到的智能检索推送为", data);
        })
    }

    unSubscribeRetrieval(){
        this.socketFactory.unSubscribe(SocketResultTypeEnum.Retrieval);
    }

    subscribeTrack(){
        this.socketFactory.subscribe(SocketResultTypeEnum.Track, (data: any)=>{
            console.log("收到的轨迹分析推送为", data);
        })
    }

    unSubscribeTrack(){
        this.socketFactory.unSubscribe(SocketResultTypeEnum.Track);
    }
    subscribeFaceRetrieval(){
        this.socketFactory.subscribe(SocketResultTypeEnum.FaceRetrieval, (data: any)=>{
            console.log("收到的人脸检索消息分析推送为", data);
        })
    }

    unSubscribeFaceRetrieval(){
        this.socketFactory.unSubscribe(SocketResultTypeEnum.FaceRetrieval);
    }
}

app.controller("technologyStackSocketController", SocketController);