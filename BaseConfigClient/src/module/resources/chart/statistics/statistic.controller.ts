import { app } from "../../../common/app/main.app";
import { ResponseResult } from "../../../../core/params/result/ResponseResult";
import { SocketResultTypeEnum } from "../../../../core/server/enum/SocketResultTypeEnum";
import { ISocketFactory } from "../../../common/factory/socket.factory";
import { IdeviceSocket } from "../../../common/services/deviceSocket.service";
import { IResourceRetrievalService } from "../../../common/services/resourceRetrieval.service";
import { resourceService } from "../../../common/services/resource.service";
import { IEchartFactory } from "../echartFactory";
import "moment";

declare let $: any, moment: any;
export class socketParams {
    userID: string;
    objectID: Array<string>;
    isCancel: boolean;
    socketType: string;
    alarmType: string;
}

class statisticController {
    static $inject = ["$scope", "$timeout", "socketFactory", "deviceSocketServer", 'userInfoCacheFactory', 'resourceRetrievalService', 'resourceService', 'echartFactory'];
    CarAllData: Array<any> = [];
    PersonAllData: Array<any> = [];
    // FaceSocketID: number;
    // CarSocketID: number;

    constructor(private $scope: any,
        private $timeout: any,
        private socketFactory: ISocketFactory,
        private deviceSocketServer: IdeviceSocket,
        private userInfoCacheFactory: any,
        private resourceRetrievalService: IResourceRetrievalService,
        private resourceService: resourceService,
        private echartFactory: IEchartFactory
    ) {
        // 获取历史抓拍实时数据
        this.CarHistory();
        this.FaceHistory();
    }

    // 车辆抓拍历史数据获取
    CarHistory() {
        let that: statisticController = this;
        let param: any = {
            "startTime": moment().subtract().format("YYYY-MM-DD hh:mm:ss"),
            "endTime": moment().format("YYYY-MM-DD hh:mm:ss"),
            "arrObjectID": ["f470f3e385434f4da76b772978881702"],
            "currentPage": 1,
            "pageSize": 12
        };
        this.resourceRetrievalService.advancedSearchByCarEx(param).then((res: any) => {
            console.log("============抓拍车辆")
            console.log(res);
        })
    }

    // 人脸抓拍历史数据获取
    FaceHistory() {
        let that: statisticController = this;
        let param: any = {
            "startTime": moment().subtract(1, "month").format("YYYY-MM-DD hh:mm:ss"),
            "endTime": moment().format("YYYY-MM-DD hh:mm:ss"),
            "arrCameraId": ["787f7e815a224fe89e369240e54777ba"],
            "currentPage": 1,
            "pageSize": 12
        };
        that.resourceRetrievalService.advancedSearchByFace(param).then((res: any) => {
            if (res.data && res.data.Face.Result) {
                res.data.Face.Result.forEach((item: any) => {
                    if (that.PersonAllData.length <= 12) {
                        that.PersonAllData.push(item.AccessLog);
                    }
                })
            }
        })
    }

    //订阅全部车辆
    public SubscribeAllVehicleLog(staticID: string, taskAlarm: any, subName?: string) {
        let that: statisticController = this;

        that.deviceSocketServer.subscribeInfo(taskAlarm).then((res: ResponseResult<any>) => {
            if (res && res.message == subName) {
                res.data.forEach((item: any) => {
                    if (this.CarAllData.length <= 12) {
                        this.CarAllData.push(item.result);
                    }
                })
            }

            if (!taskAlarm.isCancel) {
                that.echartFactory.CarSocketID = that.socketFactory.subscribe(subName, (data: Array<any>) => {
                    data.forEach((result) => {
                        that.changeTheDom(staticID, result);
                    });
                });
            } else {
                that.echartFactory.CarSocketID = null;
            }
        })
    }

    //订阅全部人像
    public SubscribeAllFaceLog(staticID: string, taskAlarm: any, subName?: string) {
        let that: any = this;

        that.deviceSocketServer.subscribeInfo(taskAlarm).then((res: ResponseResult<any>) => {
            if (res && res.message == subName) {
                res.data.forEach((item: any) => {
                    if (this.PersonAllData.length <= 12) {
                        this.PersonAllData.push(item);
                    }
                })
            }

            if (!taskAlarm.isCancel) {
                that.echartFactory.FaceSocketID = that.socketFactory.subscribe(subName, (data: Array<any>) => {
                    data.forEach((result) => {
                        that.changeTheDom(staticID, result);
                    });
                });
            } else {
                that.echartFactory.FaceSocketID = null;
            }
        })
    }

    // 实时显示socket返回的图片
    private changeTheDom(staticID: string, socketData: any) {
        let imageNode: string = "";
        let imageSrc: string = "";
        if (socketData && socketData.plateNumber) {
            imageSrc = socketData.panoramaImage;
            imageNode = `<div style="display: none" class="m-new-border statistic-message">
                                   <img src="${socketData.panoramaImage}" class="m-image-margin"/>
                                   <span class="m-image-text">${socketData.plateNumber}</span></div>`;
        } else {
            let link: string = `/bigdata/images/${socketData.FacePath}`;
            let Gender: string = socketData.Gender == "Men" ? "男" : "女";

            imageSrc = link;
            imageNode = `<div style="display: none" class="m-new-border statistic-message">
                                   <img src="${link}" class="m-image-margin"/>
                                   <span class="m-image-text">${Gender} ${socketData.Age}岁</span></div>`;
        }
        // 去重
        let pageImageNode: any = $(staticID + ' .m-image-margin') || [];

        if (pageImageNode && pageImageNode.length) {
            let ishas: boolean = false;
            for (let i = 0; i < pageImageNode.length; i++) {
                if (pageImageNode[i].src.indexOf(imageSrc) > -1) {
                    ishas = true;
                    break;
                }
            }
            if (!ishas) {
                $(staticID + ' .m-loop-message').prepend(imageNode);
            }

        } else {
            $(staticID + ' .m-loop-message').prepend(imageNode);
        }

        let statisticEleFirst = $(staticID + ' .statistic-message:eq(0)') as any;
        let statisticEle = $(staticID + ' .statistic-message:gt(12)') as any;
        let statisticNum = $(staticID + ' .statistic-message') as any;

        statisticEleFirst.slideDown(function () {
            if (statisticNum.length >= 13) {
                statisticEle.remove();
            }
        });
    }
}

// 订阅所有人像
function socketStatistics_Face($scope: any, userInfoCacheFactory: any, that: any) {
    $scope.$on(SocketResultTypeEnum.SubscribeAllFaceLog, (event: any, data: any) => {
        let staticID: string = '#personStatistic';
        let taskInfo = {
            userID: userInfoCacheFactory.getCurrentUserId(),
            isCancel: data.isCancel,
            socketType: SocketResultTypeEnum.SubscribeAllFaceLog
        } as socketParams;

        if (that.echartFactory.FaceSocketID && data.isCancel) {
            console.log("取消订阅所有人像");
            that.SubscribeAllFaceLog(staticID, taskInfo, SocketResultTypeEnum.SubscribeAllFaceLog);
        }

        if (!data.isCancel) {
            console.log("订阅所有人像信息");
            that.SubscribeAllFaceLog(staticID, taskInfo, SocketResultTypeEnum.SubscribeAllFaceLog);
        }

        console.log(that.echartFactory.FaceSocketID, data.isCancel);
    });
}

// 订阅所有车辆
function socketStatistics_Vehicle($scope: any, userInfoCacheFactory: any, that: any) {
    $scope.$on(SocketResultTypeEnum.SubscribeAllVehicleLog, (event: any, data: any) => {
        let staticID: string = '#carStatistic';
        let taskInfo = {
            userID: userInfoCacheFactory.getCurrentUserId(),
            isCancel: data.isCancel,
            socketType: SocketResultTypeEnum.SubscribeAllVehicleLog
        } as socketParams;

        // console.log(that.CarSocketID, data.isCancel);
        if (that.echartFactory.CarSocketID && data.isCancel) {
            console.log("取消订阅车辆实时报警");
            that.SubscribeAllVehicleLog(staticID, taskInfo, SocketResultTypeEnum.SubscribeAllVehicleLog);
        }
        if (!data.isCancel) {
            console.log("订阅车辆实时信息");
            that.SubscribeAllVehicleLog(staticID, taskInfo, SocketResultTypeEnum.SubscribeAllVehicleLog);
        }
    });
}

class allStatisticController extends statisticController {
    constructor($scope: any,
        $timeout: any,
        socketFactory: ISocketFactory,
        deviceSocketServer: IdeviceSocket,
        userInfoCacheFactory: any,
        resourceRetrievalService: IResourceRetrievalService,
        resourceService: resourceService,
        echartFactory: IEchartFactory
    ) {
        super($scope, $timeout, socketFactory, deviceSocketServer, userInfoCacheFactory, resourceRetrievalService, resourceService, echartFactory);

        socketStatistics_Face($scope, userInfoCacheFactory, this);
        socketStatistics_Vehicle($scope, userInfoCacheFactory, this);
    }
}


class personStatisticController extends statisticController {
    constructor($scope: any,
        $timeout: any,
        socketFactory: ISocketFactory,
        deviceSocketServer: IdeviceSocket,
        userInfoCacheFactory: any,
        resourceRetrievalService: IResourceRetrievalService,
        resourceService: resourceService,
        echartFactory: IEchartFactory
    ) {
        super($scope, $timeout, socketFactory, deviceSocketServer, userInfoCacheFactory, resourceRetrievalService, resourceService, echartFactory);

        socketStatistics_Face($scope, userInfoCacheFactory, this)
    }
}

class carStatisticController extends statisticController {
    constructor($scope: any,
        $timeout: any,
        socketFactory: ISocketFactory,
        deviceSocketServer: IdeviceSocket,
        userInfoCacheFactory: any,
        resourceRetrievalService: IResourceRetrievalService,
        resourceService: resourceService,
        echartFactory: IEchartFactory
    ) {
        super($scope, $timeout, socketFactory, deviceSocketServer, userInfoCacheFactory, resourceRetrievalService, resourceService, echartFactory);

        socketStatistics_Vehicle($scope, userInfoCacheFactory, this)
    }
}

app.controller("allStatisticController", allStatisticController);
app.controller("personStatisticController", personStatisticController);
app.controller("carStatisticController", carStatisticController);



