// /**
//  * Created by dell on 2017/7/11.
//  */
//
// /// <amd-dependency path="text!./alarmPopup.html" name="alarmPopupHtml" />
// import "./alarmPopup.controller";
//
// declare let angular : any;
// declare let alarmPopupHtml : any;
//
// import {app} from "../../common/app/main.app";
// import {IAlarmPopupCache} from "./alarmDisposePopupCache.factory";
//
// class AlarmMsgController{
//     disposeAlarm : Function;
//     hasOpen : any;
//
//     static $inject = ['layer' ,'$scope' ,'alarmPopupCache'];
//
//
//     constructor (layer : any ,$scope : any ,private alarmPopupCache : IAlarmPopupCache){
//         let vm = this;
//         this.disposeAlarm = (data : any) => {
//             console.log(data);
//
//             let scope = $scope.$new();
//             scope.data = data;
//             scope.data.isPush = true;//是推送提示，用于隐藏上一个下一个按钮
//
//             //关闭上一个
//             ;(!!this.hasOpen)&&(layer.close(this.hasOpen));
//             //打开弹窗
//             this.hasOpen = layer.open({
//                 type : 1,
//                 resize : false,
//                 title : false,
//                 scope : scope, //父控制器向子控制器传递值
//                 closeBtn : false,
//                 content : alarmPopupHtml,
//                 hasIframe:true,
//                 move : false,
//                 area : ['950px' ,"auto"],
//                 success : function(target : any){
//                     //存储报警处理窗口状态
//                     vm.alarmPopupCache.setAlarmPopupState(true);
//
//                     angular.element('.layui-layer-content').height("auto").attr('position','relative');
//                 },
//                 end : function(){
//                     //存储报警处理窗口状态
//                     vm.alarmPopupCache.setAlarmPopupState(false);
//                     scope.$destroy();  //关闭弹窗销毁作用域
//                 }
//             })
//         };
//     }
// }
// app.controller('alarmMsgController' , AlarmMsgController);