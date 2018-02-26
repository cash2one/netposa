import 'css!./style/cameraMapPoint.css'
import {app} from "../../common/app/main.app";
import {ICameraPagingService, PageParams} from "./camera.paging";
import "./camera.paging"

declare let $: any;

class cameraPointHistoryPolice {
  static  $inject = ['$scope','$timeout','cameraPagingService'];
  startTime:string;
  emdTime:string;
  MockAlarmList1: Array<any>;
  historyIsShowAlarm:boolean = false;
  resultParams: PageParams = new PageParams();

  SubcribeAlarmList: Array<any>;

  constructor (
      private $scope: any,
      private $timeout:any,
      private cameraPagingService:ICameraPagingService
  ) {
      console.log("报警拉======================")
      console.log(this.$scope.SubcribeAlarmList);
      // 存入缓存
      this.$timeout(() => {
          this.cameraPagingService.setDataList($scope.SubcribeAlarmList);
      }).then(() => {
          if(!!$scope.SubcribeAlarmList&&$scope.SubcribeAlarmList.length){
              this.resultParams.totalCount = $scope.SubcribeAlarmList.length;
              this.resultParams.currentPage = 1;
              this.resultParams.pageCount = 10;
              this.resultParams.pageSize = 10;

              this.resultParams = this.cameraPagingService.getDataByPage(this.resultParams);
              this.SubcribeAlarmList = this.resultParams.data
          }
      });
  }
}

app.controller('cameraPointHistoryPolice', cameraPointHistoryPolice);