/**
 * Created by dell on 2017/7/14.
 */
import {app} from "../app/main.app";
import "css!./faceHandlePopup.css";
import {IToolOptionService} from "../services/toolOption.service"
import  "../../common/services/toolOption.service"

import {IComparisonFactory} from "./comparison.factory"
import "./comparison.factory"

import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {FaceComparison} from "./comparisonModel"

import {ILayerDec} from "../../common/factory/layerMsg.factory"
import "../../common/factory/layerMsg.factory"

declare let angular: any;

class SelectFaceParams {
    detectType: string;
    commandType: string;
    cutInfo: CutInfo;
    imagedata: string;
}

class CutInfo{
    bottom: number;
    left: number;
    top: number;
    right: number;
}

class SelectFacePopupController {
    static $inject = [
        '$scope',
        'layer',
        '$timeout',
        'toolOptionService',
        'comparisonFactory',
        'layerDec',
        'i18nFactory'
    ];

    //传入后台参数
    commandType:string;
    detectType:string;

    //广播到父controller事件名
    fromSelectFaceCtrl:string;
    //框选的人脸图片
    screenshotImgUrl:string;

    file:any;
    data:any;

    //选择人脸传参
    right: number;
    left: number;
    top: number;
    bottom: number;

    //选择人脸
    selectFaceFun:Function;

    constructor(
        $scope: any,
        layer:any,
        $timeout:any,
        toolOptionService:IToolOptionService,
        comparisonFactory:IComparisonFactory,
        layerDec:ILayerDec,
        i18nFactory:any
    ) {
        let vm = this;

        $scope.$on("$destroy", function () {
            console.error("销毁了弹出框");
        });

        vm.selectFaceFun = selectFaceFun;
        //接收父作用域参数
        vm.screenshotImgUrl = "data:image/jpeg;base64," + $scope.data.image;
        vm.file = $scope.file;
        vm.data = $scope.data;
        vm.fromSelectFaceCtrl = $scope.fromSelectFaceCtrl;
        vm.commandType = $scope.commandType;
        vm.detectType = $scope.detectType;

        /*========框出人脸========*/
        function frameFace(){
            let $ = angular.element;
            let $screenshotImg:any = $('.screenshot-img');
            //比例
            let scale:any = ($screenshotImg[0].clientWidth / vm.file._info.width).toFixed(4);
            vm.data.faceInfo.forEach(function (item:any,index:number) {
                $timeout(()=>{
                    let $selectFaceBox:any = $(".selectFace-box").eq(index);
                    $selectFaceBox.css({
                        "position": "absolute",
                        "border": "1px solid red",
                        "cursor":"pointer",
                        "top": item.rect.top * scale + "px",
                        "left": item.rect.left * scale + "px",
                        "width": (item.rect.right - item.rect.left) * scale + "px",
                        "height": (item.rect.bottom - item.rect.top) * scale + "px"
                    });
                    $selectFaceBox.hover(function () {
                        $selectFaceBox.css({
                            'background':"rgba(255,0,0,0.4)"
                        })
                    },function () {
                        $selectFaceBox.css({
                            'background':"rgba(255,0,0,0)"
                        })
                    });
                });
            });
        }

        frameFace();

        /*========人脸选择========*/
        function selectFaceFun(rect:CutInfo) {
            let result =  new SelectFaceParams();
            //传入后台参数 放大一倍
            let left = (3 * rect.left - rect.right) / 2 > 0 ? (3 * rect.left - rect.right) / 2 : 0;
            let top = (3 * rect.top - rect.bottom) / 2 > 0 ? (3 * rect.top - rect.bottom) / 2 : 0;
            let width = (rect.right - rect.left) * 2 < vm.file._info.height ? (rect.right - rect.left) * 2 : vm.file._info.height;
            let height = (rect.bottom - rect.top) *2 < vm.file._info.width ? (rect.bottom - rect.top) *2 : vm.file._info.width;

            result.detectType = vm.detectType;
            result.commandType = vm.commandType;
            result.imagedata = $scope.data.image;
            result.cutInfo = {
                right: width,
                bottom: height,
                left: left,
                top: top
            };
            // console.log('参数',result);
            // console.log('人脸选择开始');
            toolOptionService.faceDemarcateDataList(result).then(complete);
            function complete(rep: ResponseResult<FaceComparison>) {
                if(rep.code ===200){
                    // console.log('人脸选择返回结果', rep);
                    comparisonFactory.getResponse(rep);
                    //将得到比对的key图片url广播到父作用域
                    $scope.$emit(vm.fromSelectFaceCtrl, rep);
                }else{
                    layerDec.failInfo(i18nFactory('FDS_00_11_12'))
                }
                layer.close($scope.layerIndex);
            }
        }
    }
}

app.controller('selectFacePopupController', SelectFacePopupController);