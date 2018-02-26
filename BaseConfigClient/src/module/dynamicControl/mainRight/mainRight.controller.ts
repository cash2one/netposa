/**
 * Created by dell on 2017/5/31.
 */

//预处理模板文件引入
/// <amd-dependency path="text!./mainRight.alarmPopup.html" name="alarmPopupHtml" />
//录像弹窗
/// <amd-dependency path="text!./alarmVideoPopup.html" name="alarmVideoHtml" />

/// <amd-dependency path="text!./alarmMsg.html" name="alarmMsgHtml" />


import {app} from "../../common/app/main.app";
//引入预处理模板TS文件
import "./alarmPopup.controller";
import "./alarmVideo.controller";

import "angular";
import "../dynamicControl.cache.factory";
import {IDynamicControlCacheFactory} from "../dynamicControl.cache.factory";

import "../../common/factory/socket.factory";
import {ISocketFactory} from "../../common/factory/socket.factory";
import {SocketResultTypeEnum} from "../../../core/server/enum/SocketResultTypeEnum";



declare let angular : any;
//获取模板文件
declare let alarmPopupHtml : any;
declare let alarmVideoHtml : any;
declare let alarmMsgHtml : any;

class MainRightController{

    //记录当前tabs状态
    moduleState : string = 'realAlarm';
    //模拟数据
    dataArr : Array<any>;
    //click tabs切换
    tabsChange : Function;
    //click 报警信息弹窗处理
    disposeAlarm : Function;
    //click 打开录像
    playVideo : Function;
    //click 查看大图
    showLargeImg : Function;

    //图像辅助功能按钮控制
    mouseoverImg : Function;
    mouseoutImg : Function;
    isShowImg : Boolean;
    //报警消息动画
    alarmMsgAnimate : Function;

    dataPush : Function;



    static $inject = ['$scope' ,'$timeout' ,'layer' ,'dynamicControlCacheFactory' ,'$compile' ,'socketFactory'];

    constructor($scope : any, $timeout : any, layer : any,private dynamicControlCacheFactory:IDynamicControlCacheFactory, $compile : any ,private socketFactory : ISocketFactory) {
        let vm = this;

        //接收websocket消息
        (() => {
            vm.socketFactory.subscribe(SocketResultTypeEnum.DeployControl, (data: any)=>{
                console.log("收到的动态布控推送为", data);
                //调用追加数据
                //vm.dataPush();
            });
        })();

        setTimeout(function(){
            vm.dataPush();
        },5000)

        //取消接收websocket消息
        $scope.$on("$destroy", ()=>{
            this.socketFactory.unSubscribe(SocketResultTypeEnum.DeployControl);
        });

        //模拟数据测试
        vm.dataPush = () => {
            //$timeout(() => {
                let n = Math.random()*3^0;
                let sequence = vm.dataArr.length;
                //创建单独作用域
                let scope = $scope.$new();
                scope.data ={
                    site : '深大出口1000--' + sequence,
                    time : "2017-06-01 12:12:52",
                    percent : (60+ sequence)%101 + "%",
                    name : "测试",
                    sex : ['female','male'][1],
                    status : ["有效" ,"无效", "未处理"/*, "待定"*/][n],
                    statusCode : ["vilid" ,"invilid", "untreated"/*, "undetermined"*/][n],
                    subjection : "深圳在逃库",
                    details : "未知",
                    ID : "434343555566661545",
                    imgUrl : ['../../../images/textPic.jpg','../../../images/textPic.jpg','../../../images/textPic.jpg'][n],
                    animate : true,
                    sequence : sequence,
                };
                angular.element('.m-dynCtrl-wrapper>.new-msg').removeClass('new-msg');
                angular.element('.m-dynCtrl-wrapper>.m-alarm-list:first-child').before($compile(alarmMsgHtml)(scope)[0]);

                vm.dataArr.push(scope.data);
                //存储报警数据
                dynamicControlCacheFactory.updateAlarmDatas(vm.dataArr);
                //调用追加动画
                vm.alarmMsgAnimate();
            //});
        };
        // vm.dataPush

        vm.isShowImg = false;

        //模拟数据
        vm.dataArr = [];
        let nums = Math.random() * 10 | 0 + 1;
        for(let i = 0; i < nums; i++){
            vm.dataArr.push({
                site : '深大出口1000' + i,
                time : "2017-06-01 12:12:52",
                percent : 90 + i + "%",
                name : "隔壁老王",
                sex : ['female','male'][i%2],
                status : ["有效" ,"无效", "未处理"/*, "待定"*/][i%3],
                statusCode : ["vilid" ,"invilid", "untreated"/*, "undetermined"*/][i%3],
                subjection : "深圳在逃库",
                details : "未知",
                ID : "434343555566661545",
                imgUrl : ['../../../images/textPic.jpg','../../../images/textPic.jpg','../../../images/textPic.jpg'][i%3],
                sequence : i,
            });
        };

        //初始加载数据
        for(let i = 0; i < vm.dataArr.length; i++){
            //创建单独作用域
            let scope = $scope.$new();
            scope.data = vm.dataArr[i];
            //console.log($compile(alarmMsgHtml)(scope));
            angular.element('.m-dynCtrl-wrapper').append($compile(alarmMsgHtml)(scope)[0]);
        };

        //存储报警数据
        dynamicControlCacheFactory.updateAlarmDatas(vm.dataArr);

        //报警推送动画
        vm.alarmMsgAnimate = () => {
            var newTag = angular.element('.m-dynCtrl-wrapper').find('.m-alarm-list:first-child');
            console.log('展开高度');

            $timeout(function(){//界面渲染的 ng-class 加载延迟
                newTag.animate({height : '150px'},200);
                newTag.find('.new-txt').fadeIn(200);
            });

        };

        //click 改变 tabs 状态
        vm.tabsChange = (state : string) => {
            vm.moduleState = state;
        };

        //mouseover 图像辅助功能按钮控制
        vm.mouseoverImg = (e : any) => {
            angular.element(e.target).parents('.m-alarm-list').find('.play-control').show();
        };

        //mouseout  图像辅助功能按钮控制
        vm.mouseoutImg = (e : any) => {
            var elem = angular.element(e.target);
             if(elem.hasClass('m-alarm-list')){
                 elem.find('.play-control').hide()
             }else{
                 elem.parents('.m-alarm-list').find('.play-control').hide();
             }
        };

        //click 弹窗处理报警信息
        vm.disposeAlarm = (data : Object) => {
            //创建子作用域
            let scope = $scope.$new();
            //父控制器向子控制器传递值
            scope.data = data;
            //打开弹窗
            layer.open({
                type : 1,
                resize : false,
                title : false,
                scope : scope, //父控制器向子控制器传递值
                closeBtn : false,
                content : alarmPopupHtml,
                move : false,
                area : ['950px' ,"auto"],
                success : function(id : any){
                    console.log(id);
                    angular.element('.layui-layer-content').height("auto").attr('position','relative');
                },
                end : function(){
                    scope.$destroy();  //关闭弹窗销毁作用域
                }
            })
        };

        //click 打开视频
        vm.playVideo = (e : any ,data : any) => {
            e.stopPropagation();
            console.log("open the video");
            //this.dynamicControlCacheFactory.updateBtnParams(false);
            let scope = $scope.$new();
            scope.data = data;
            //打开视频
            layer.open({
                type : 1,
                resize : false,
                title : false,
                closeBtn : false,
                scope : scope,
                content : alarmVideoHtml,
                area : ['720px', '465px'],
                success : function () {
                    angular.element('.layui-layer-content').css('overflow',"hidden");
                    console.log('打开成功');
                },
                end : function(){

                }
            });
        };

        //click 查看大图
        vm.showLargeImg = (e : any , imgUrl : string) => {
            e.stopPropagation();
            console.log("show large img");

            layer.open({
                type : 1,
                resize : false,
                title : "原图",
                content : "<div  class='larger-pic' " +
                "><img class='layer-larger-img' ng-src="+ imgUrl +"></div>",
                area : ["50%" ,'auto'],
                success : function(target : any){
                    target.find('.layui-layer-title').css({position:'relative'});
                    target.height(target.width() * 0.75);
                    //让弹窗内容层级高于OCX插件视频
                    target.find('.layui-layer-title').before("<iframe class='f-abs u-iframe-layer'></iframe>");
                    setTimeout(function(){
                        let imgObj = target.find('.layer-larger-img');
                        let width = imgObj.width();
                        let height = imgObj.height();
                        if(width >= height){
                            imgObj.width('100%');
                        }else{
                            imgObj.height('100%');
                        };
                    },4);
                },
                end : function(){
                    //scope.$destroy();  //关闭弹窗销毁作用域
                }
            })
        };

    };
}

app.controller("mainRightController", MainRightController);
