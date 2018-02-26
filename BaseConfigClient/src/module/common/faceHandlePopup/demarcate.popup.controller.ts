/**
 * Created by tj on 2017/7/14.
 */
import {app} from "../app/main.app";
import "css!./faceHandlePopup.css";

import {IToolOptionService} from "../services/toolOption.service"
import  "../../common/services/toolOption.service"

import {IComparisonFactory} from "./comparison.factory"
import "./comparison.factory"

import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {FaceComparison} from "./comparisonModel"

import {DetectFaceParams, Point} from "../../../core/params/ToolOptionParams"

import {ILayerDec} from "../../common/factory/layerMsg.factory"
import "../../common/factory/layerMsg.factory"

declare let angular: any;

class DemarcatePopupController {
    static $inject = [
        '$scope',
        'layer',
        'toolOptionService',
        'comparisonFactory',
        'layerDec',
        'i18nFactory'
    ];

    //传入后台参数
    commandType: string;
    detectType: string;

    //广播到父controller事件名
    fromDemarcateFaceCtrl: string;
    //销毁弹框
    cancelDemarcate: Function;
    //要标定的图片
    demarcateImgUrl: string;
    //标定点位合集
    demarcatePoint: Array<Point>;
    //标定
    demarcateFace: Function;

    //标定完成获取 key
    getDemarcateKey: Function;
    //flag为true代表重新标定
    flag: boolean;

    file: any;
    //图片数据
    image: string;

    constructor($scope: any,
                layer: any,
                toolOptionService: IToolOptionService,
                comparisonFactory: IComparisonFactory,
                layerDec: ILayerDec,
                i18nFactory:any
    ) {

        let vm = this;
        let $ = angular.element;
        vm.cancelDemarcate = cancelDemarcate;
        vm.demarcateFace = demarcateFace;
        vm.demarcatePoint = [];
        vm.getDemarcateKey = getDemarcateKey;

        $scope.$on("$destroy", function () {
            console.error("销毁了弹出框");
        });

        //接收父作用域参数
        vm.flag = $scope.flag ? $scope.flag : false;
        vm.demarcateImgUrl = vm.flag ? $scope.imgUrl : "data:image/jpeg;base64," + $scope.data.image;
        vm.file = $scope.file;
        vm.image = $scope.data.image;
        vm.fromDemarcateFaceCtrl = $scope.fromDemarcateFaceCtrl;
        vm.commandType = $scope.commandType;
        vm.detectType = $scope.detectType;

        //关闭弹出框
        function cancelDemarcate() {
            layer.close($scope.layerIndex);
            $scope.$destroy();
        }

        //人脸标定 画点
        function demarcateFace($event: any, id: string) {
            //只能画五个点
            if (vm.demarcatePoint.length >= 5) {
                return;
            }
            //当前展示出的图片宽高
            let width:number = $event.target.offsetWidth;
            let height:number = $event.target.offsetHeight;
            //兼容火狐判断offsetX是否为undefined
            let offsetX:number =  $event.offsetX ? $event.offsetX : $event.originalEvent.layerX;
            let offsetY:number =  $event.offsetY ? $event.offsetY : $event.originalEvent.layerY - $event.target.offsetTop;

            let x: number = vm.file._info.width * offsetX / width;
            let y: number = vm.file._info.height * offsetY / height;

            let left:number = $event.offsetX ? offsetX - 10 : $event.originalEvent.layerX - 10;
            let top:number = $event.offsetY ? offsetY - 10 + $event.target.offsetTop : $event.originalEvent.layerY - 10;

            let $div = $(id);
            let $span = $("<span>");
            let $img = $("<img>");
            let $em = $("<em>");
            $em.html(vm.demarcatePoint.length + 1);
            $em.css({
                "position": "absolute",
                "top": "-14px",
                "left": 0,
                "color": "orange",
                "width": "100%",
                "textAlign": "center"
            });
            $img[0].src = "../../../images/common/dot.png";
            $span.css({
                "position": "absolute",
                'left':  left + "px",
                "lineHeight":0,
                "top":  top + "px"
            });

            $span.append($img);
            $span.append($em);
            $div.append($span);
            //人脸标定点位合集
            vm.demarcatePoint.push({x: x, y: y});
            console.log(vm.demarcatePoint);
        }

        //人脸框 九个参数
        function faceBox(demarcatePoint: Array<Point>, file: any) {
            if (demarcatePoint.length < 5) {
                layerDec.warnInfo(i18nFactory('FDS_00_11_11'));
                return {} as DetectFaceParams;
            }
            //两眼距离一半
            let eyeSpace: number = Math.abs(demarcatePoint[0].x - demarcatePoint[1].x) / 2;
            //判断最左，最右，最上，最下
            let leftSide: number = demarcatePoint[0].x < demarcatePoint[3].x ? demarcatePoint[0].x : demarcatePoint[3].x;
            let rightSide: number = demarcatePoint[1].x < demarcatePoint[4].x ? demarcatePoint[4].x : demarcatePoint[1].x;
            let topSide: number = demarcatePoint[0].y < demarcatePoint[1].y ? demarcatePoint[0].y : demarcatePoint[1].y;
            let botSide: number = demarcatePoint[3].y < demarcatePoint[4].y ? demarcatePoint[4].y : demarcatePoint[3].y;

            let result: DetectFaceParams = new DetectFaceParams();
            result.commandType = vm.commandType;
            result.detectType = vm.detectType;
            result.markInfo = {
                "lefteye": {
                    "x": demarcatePoint[0].x,
                    "y": demarcatePoint[0].y
                },
                "righteye": {
                    "x": demarcatePoint[1].x,
                    "y": demarcatePoint[1].y
                },
                "nose": {
                    "x": demarcatePoint[2].x,
                    "y": demarcatePoint[2].y
                },
                "mouthleft": {
                    "x": demarcatePoint[3].x,
                    "y": demarcatePoint[3].y
                },
                "mouthright": {
                    "x": demarcatePoint[4].x,
                    "y": demarcatePoint[4].y
                },
                "left": leftSide - eyeSpace > 0 ? leftSide - eyeSpace : 0,
                "right": rightSide + eyeSpace < file._info.width ? rightSide + eyeSpace : file._info.width,
                "top": topSide - eyeSpace > 0 ? topSide - eyeSpace : 0,
                "bottom": botSide + eyeSpace < file._info.height ? botSide + eyeSpace : file._info.height
            };

            if ($scope.flag) {
                result.imageurl = $scope.imgUrl;
            } else {
                result.imagedata = $scope.data.image;
            }
            // console.log('参数', result);
            return result;
        }

        //标定完成 获取key
        function getDemarcateKey() {
            //选够五个点才往下走
            if (vm.demarcatePoint.length < 5) {
                layerDec.warnInfo(i18nFactory('FDS_00_11_11'));
                return;
            }
            toolOptionService.faceDemarcateDataList(faceBox(vm.demarcatePoint, vm.file)).then(complete);
            function complete(rep: ResponseResult<FaceComparison>) {
                if (rep.code === 200) {
                    // console.log('标定结果key', rep);
                    comparisonFactory.getResponse(rep);
                    //将得到返回结果广播到父作用域
                    $scope.$emit(vm.fromDemarcateFaceCtrl, rep);
                } else {
                    layerDec.failInfo(i18nFactory('FDS_00_11_12'));
                }
                layer.close($scope.layerIndex)
            }
        }

    }
}

app.controller('demarcatePopupController', DemarcatePopupController);