/**
 * Created by zyh on 2017/6/8.
 */

import {app} from "../../common/app/main.app";

import {enumData} from "../dynamicControlEnum";

//中间传值层
import "../dynamicControl.cache.factory";
import {IDynamicControlCacheFactory} from "../dynamicControl.cache.factory";

//OCX
import {
    IVideoOcxControlFunc, VideoOcxRealTimeOpt,
    VideoOcxRtspOpt, VideoOcxRtspMultipleOpt
} from "../../common/directive/ocx/video.ocx.directive";

import "angular";
//查询人脸库
import "../../common/services/businessLib.service";
import {IBusinessLibService} from "../../common/services/businessLib.service";

import {BusinessLibListParams} from "../../../core/params/BusinessLibParams";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {BusinessLibEx} from "../../../core/entity/ex/BusinessLibEx";

declare var angular : any;

class AlarmPopupController{

    //OCX
    videoOcx: IVideoOcxControlFunc;
    //OCX初始化
    initComplete : Function = (ocxControlFunc: IVideoOcxControlFunc) => {
        console.log("ocx初始化完成", ocxControlFunc);
        this.videoOcx = ocxControlFunc;

        //setTimeout(()=>{
            this.playRtsp();
        //},200);

    }

    //播放
    playRtsp : Function = () => {
        console.log('播放');
        if(this.videoOcx){
            let opts = new VideoOcxRtspOpt();
            opts.url = "rtsp://10.0.10.200:8557/H264";
            setTimeout(()=>{
                this.videoOcx.playRtsp(opts, 0);
            },20);
        }
    };

    //关闭所有
    stopAll : Function = ()=>{
        if(this.videoOcx){
            this.videoOcx.stopAll();
        }
    }


    //当前对比中的 库图像数据
    libCompareData : any;
    //切换下一个比对图像信息
    changToNext : Function;

    //弹窗接收数据
    popupWindowData : Object;
    currentSequence : any;
    popupAlarmPrev : Function;
    popupAlarmNext : Function;
    //报警数据
    alarmDataLength : any;

    //关闭弹窗
    closePopup : Function;

    //性别
    sexArrData : any[] = enumData.sexArrayData;

    //检索参数对象
    searchData : Object = {
        checkedLib : "",
        sex : "",
        range : "",
    };
    //检索事件
    searchClick : Function;
    sexCheckClick : Function;

    //click 检索更多
    searchMore : Function;
    searchMoreData :any;
    searchIsShow : Boolean = false;
    searchMoreCheck : Function;
    treeClick : Function;
    libsId : string;
    libsData : any;


    //查看大图
    showBiggerImg : Function;
    //查看轨迹
    showTracks : Function;

    //检索列表翻页按钮显隐控制
    flipPageBtnShow : Boolean = false;
    flipBtnShow : Function;
    flipBtnHide : Function;
    searchListData : Array<any>;
    //上下页
    flipPagePrev : Function;
    flipPageNext : Function;
    flipPageListLeft : any = 0;
    flipPageListWidth : any;
    flipNextIsShow : Boolean;//是否显示下一页按钮
    //选中控制
    clickCheck : Function;

    //有效 无效处理
    validDispose : Function;
    inValidDispose : Function;
    disposeMsg : any;

    //收藏
    addAttention : Function;
    //删除
    deleteThat : Function;

    /***************************************************************/
    static $inject = ['$scope', 'layer' ,'dynamicControlCacheFactory' ,'businessLibService'];

    constructor($scope : any, layer : any ,dynamicControlCacheFactory : IDynamicControlCacheFactory ,businessLibService : IBusinessLibService){

        let vm = this;

        //OCX 销毁
        $scope.$on('$destory' ,() => {
            vm.videoOcx = null;
        });

        /*****  报警数据---弹出窗口  *****/
        vm.currentSequence = $scope.data.sequence;

        //遍历超找对应数据
        function _getNewData(curNum : any ,arr : any){
            for(let i = 0; i < arr.length; i++){
                if(arr[i].sequence === curNum){
                    return arr[i];
                }
            }
        };

        let  _newAlarmData = dynamicControlCacheFactory.getAlarmDatas();

        vm.popupWindowData = _getNewData(vm.currentSequence , _newAlarmData);

        vm.popupAlarmPrev = () => {
            //获取最新的报警数据组
            let dataArr = dynamicControlCacheFactory.getAlarmDatas();

            vm.currentSequence = vm.currentSequence-1 < 1 ? 0 : vm.currentSequence-1;
            console.log(vm.currentSequence);
            //上一个
            vm.popupWindowData = _getNewData(vm.currentSequence , dataArr);
        };

        vm.popupAlarmNext = () => {
            //获取最新的报警数据组
            let dataArr = dynamicControlCacheFactory.getAlarmDatas();

            vm.currentSequence = vm.currentSequence+1 < dataArr.length-1 ? vm.currentSequence+1 : dataArr.length-1;
            console.log(vm.currentSequence);
            //下一个
            vm.popupWindowData = _getNewData(vm.currentSequence , dataArr);

        }


        /*****  报警数据---弹出窗口  *****/


            //关闭弹窗
        vm.closePopup = () => {
            console.log('关闭弹窗');
            layer.closeAll();
        };

        //查看大图
        vm.showBiggerImg = (imgUrl : string) => {
            console.log('show bigger img');
            layer.open({
                type : 1,
                resize : false,
                title:"原图",
                content:"<div  class='larger-pic' " +
                "><img class='layer-larger-img' ng-src="+ imgUrl +"></div>",
                area:['540px' ,"420px"],
                success: function(target : any){
                    setTimeout(function(){
                        target.find('.layui-layer-title').css({position:'relative'});

                        //让弹窗内容层级高于OCX插件视频
                        target.find('.layui-layer-title').before("<iframe class='f-abs u-iframe-layer'></iframe>");

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

                }
            })
        };
        //查看轨迹
        vm.showTracks = () => {

            console.log('show tracks');
            //关闭layer
            layer.closeAll();
            //跳转-轨迹分析
            window.location.hash = '/intelligentretrieval/trailanalysis';
        };

        /*****  检索列表  *****/
        //检索列表点击选中
        vm.clickCheck = (data : any) => {
            console.log(data);
            //存在更多检索列表的时候 去除列表内的选中
            if(vm.searchIsShow){
                for(let i = 0; i < vm.searchMoreData.length;i++){
                    if(vm.searchMoreData[i].isChecked){
                        vm.searchMoreData[i].isChecked = false;
                    };
                };
            }
            //改变比对库内的选中
            for(let i = 0; i < vm.searchListData.length;i++){
                if(vm.searchListData[i].isChecked){
                    vm.searchListData[i].isChecked = false;
                };
            }
            data.isChecked = true;
            vm.libCompareData = data;
        }

        //上下页按钮显隐
        vm.flipBtnShow = () => {
            if(vm.searchListData.length>5){
                vm.flipPageBtnShow = true;
            };
            //显示右边下一页按钮
            if(vm.flipPageListWidth - Math.abs(vm.flipPageListLeft) > 600){
                vm.flipNextIsShow = true;
            }else{
                vm.flipNextIsShow = false;
            }
        };
        vm.flipBtnHide = () => {
            vm.flipPageBtnShow = false;
        };
        //上下页按钮功能
        vm.flipPagePrev = () => {
            let listTarget = angular.element('.flip-page-list');
            //获取当前左边距
            if(vm.flipPageListLeft < 0){
                vm.flipPageListLeft = vm.flipPageListLeft + 600;
                listTarget.animate({'marginLeft' : vm.flipPageListLeft},300)
            }
        };
        vm.flipPageNext = () => {
            if(vm.flipPageListWidth - Math.abs(vm.flipPageListLeft) > 600){
                vm.flipPageListLeft -= 600;
                angular.element('.flip-page-list').animate({'marginLeft' : vm.flipPageListLeft},300)
            }
        };


        //模拟数据
        vm.searchListData = (() => {
            let dataArr = [];
            let length = Math.random()*30^0+1;
            for(let i = 0; i < length; i++){
                let n = Math.random()*10^0+1;
                dataArr.push({
                    name : "测试" + n + n + n,
                    ID : "9876543219876543X"+n,
                    sex : ["male",'female'],
                    time : new Date().toLocaleDateString().replace(/[\u4e00-\u9fa5]/g,"-"),
                    percent : 60 + n*3 + "%",
                    details : "未知",
                    subjection : ["深圳在逃库","广州库","优衣库"][n%3],
                    imgUrl : ['../../../images/textPic.jpg','../../../images/textPic.jpg','../../../images/textPic.jpg'][n%3],
                    isChecked : false,
                })
            };
            dataArr[0].isChecked = true;
            return dataArr;
        })();
        setTimeout(function(){
            //动态设置图像库list的宽度
            vm.flipPageListWidth = vm.searchListData.length * 120 | 0;
            angular.element('.flip-page-list').width(vm.flipPageListWidth);
        });



        //初始时候 比对 (选中的库)图像数据
        vm.libCompareData = vm.searchListData[0];
        //切换下一个比对信息
        vm.changToNext = () => {
            for(let i = 0; i < vm.searchListData.length;i++){

                if(i !== (vm.searchListData.length-1) && vm.searchListData[i].isChecked ){
                    vm.searchListData[i].isChecked = false;
                    vm.searchListData[i+1].isChecked = true;
                    vm.libCompareData = vm.searchListData[i+1];

                    //计算当前激活项应在屏的位置,滑动到对应屏
                    vm.flipPageListLeft = -(Math.floor((i+1)/5)*600);
                    angular.element('.flip-page-list').animate({'marginLeft' : vm.flipPageListLeft},300)

                    break;
                }else if((i+1) === (vm.searchListData.length-1)){
                    //计算当前激活项应在屏的位置,滑动到对应屏
                    vm.flipPageListLeft = -(Math.floor((i+1)/5)*600);
                    angular.element('.flip-page-list').animate({'marginLeft' : vm.flipPageListLeft},300)
                };

            }
        };

        /*****  检索列表  *****/


        //vm.sexArrData = enumData.sexArrayData;

        //检索条件 ：性别
        vm.sexCheckClick = () => {
            console.log(vm.searchData);
        };

        //点击检索按钮
        vm.searchClick = () => {
            console.log(vm.searchData);
        };

        //click 检索更多
        vm.libsId = "popupLibs";
        vm.searchMore = () => {
            if(this.searchIsShow){
                this.searchIsShow = false;

            }else{
                console.log('展开');

                this.searchIsShow = true;
                //查库
                businessLibService.findHasSelfTree()
                    .then((resp : ResponseResult<Array<BusinessLibEx>> ) => {
                        console.log(resp);
                        vm.libsData = resp;
                    })
            };
        };

        //tree click
        vm.treeClick = (event:any, treeId:string, treeNode:any) => {
            console.log(treeNode);
        };
        //检索更多数据列表
        vm.searchMoreData = (() => {
            let dataArr = [];
            let length = Math.random()*30^0+1;
            for(let i = 0; i < length; i++){
                let n = Math.random()*10^0+1;
                dataArr.push({
                    name : "测试" + n + n + n,
                    ID : "9876543219876543X"+n,
                    sex : ["male",'female'],
                    time : new Date().toLocaleDateString().replace(/[\u4e00-\u9fa5]/g,"-"),
                    percent : 60 + n*3 + "%",
                    details : "未知",
                    subjection : ["深圳在逃库","广州库","优衣库"][n%3],
                    imgUrl : ['../../../images/large.jpg','../../../images/widther.jpg','../../../images/height.jpg'][n%3],
                    isChecked : false,
                })
            };
            return dataArr;
        })();
        //检索更多列表点击事件
        vm.searchMoreCheck = (data : any) => {
            //取消比对库列表的选中
            for(let i = 0; i < vm.searchListData.length;i++){
                if(vm.searchListData[i].isChecked){
                    vm.searchListData[i].isChecked = false;
                };
            };
            //改变检索更多列表的选中
            for(let i = 0; i < vm.searchMoreData.length;i++){
                if(vm.searchMoreData[i].isChecked){
                    vm.searchMoreData[i].isChecked = false;
                };
            };
            data.isChecked = true;
            vm.libCompareData = data;
        };



        //有效处理
        vm.validDispose = () => {
            console.log(vm.disposeMsg);
            console.log(vm.libCompareData);
            console.log(vm.popupWindowData);
        };
        //无效处理
        vm.inValidDispose = () => {
            console.log(vm.disposeMsg);
            console.log(vm.libCompareData);
            console.log(vm.popupWindowData);
        };

        //收藏
        vm.addAttention = (id : string) => {
            console.log('收藏ID：' + id);
        };
        //删除
        vm.deleteThat = (id : string) => {
            console.log('删除ID：' + id)
        }

    }
}

app.controller('alarmPopupController', AlarmPopupController);