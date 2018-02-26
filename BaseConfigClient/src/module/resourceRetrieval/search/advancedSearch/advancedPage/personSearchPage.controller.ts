/// <amd-dependency path="text!../../../../detailPopup/personPopup/personPopup.html" name="personPopupHtml" />
/// <amd-dependency path="text!../../../../common/faceHandlePopup/selectFace.popup.html" name="selectFacePopupHtml" />
/// <amd-dependency path="text!../../../../common/faceHandlePopup/demarcate.popup.html" name="demarcatePopupHtml" />
/// <amd-dependency path="text!../../../../selectPopup/treeCamera/Tree.camera.popup.html" name="cameraTreePopupHtml" />
import {app} from "../../../../common/app/main.app";

// 弹框
import '../../../../selectPopup/treeCamera/Tree.camera.popup';

// 高级检索参数
import {
    FaceSearchParams,
    multipleChoice,
    SexList,
    CrossTrainTimeList,
    PatternList,
    EquipmentList,
    AgeList,
    ClothesList,
    HairList,
    ShoeList,
    GlassesList,
    MaskList,
    CapList
} from '../adVanceSearchEnum';
import {
    face,
    faceItem,
    initFaceResult,
    QueryItem,
    CollectAddParams,
    CollectDeleteParams
} from '../../../resourceRetrievalEnum';
import {AnalysisDataType, AnalysisStorageParams, AnalysisGoToType} from "../../../../../core/server/enum/AnalysisDataType";

// 服务
import '../../../../common/services/resourceRetrieval.service';
import {IResourceRetrievalService} from '../../../../common/services/resourceRetrieval.service';
import {ResponseResult} from "../../../../../core/params/result/ResponseResult";
import "../../../../common/factory/socket.factory";
import {ISocketFactory} from "../../../../common/factory/socket.factory";
import {SocketResultTypeEnum} from "../../../../../core/server/enum/SocketResultTypeEnum";
import "../../../../common/factory/deviceCache.factory";
import {IdeviceCaacheService} from "../../../../common/factory/deviceCache.factory";
import "../../../../common/factory/userinfo.cache.factory";
import {IUserInfoCacheFactory} from "../../../../common/factory/userinfo.cache.factory";
import {ILayerDec} from "../../../../common/factory/layerMsg.factory";
import "../../../../common/factory/layerMsg.factory";
import "../../../../common/factory/systemInfo.cache.factory";
import {ISystemInfoCacheProvider} from "../../../../common/factory/systemInfo.cache.factory";
import {SystemConfigParams} from "../../../../../core/entity/SystemConfigParams";
import '../../../../common/factory/HandleStorage.factory';
import {IHandleStorage} from '../../../../common/factory/HandleStorage.factory';
import "../../../../common/services/uploadImage.service";
import {IUploadImageService} from "../../../../common/services/uploadImage.service";
import '../../../../common/factory/CheckIntelligentAnalysis.factory';
import {ICheckIntelligentAnalysis} from '../../../../common/factory/CheckIntelligentAnalysis.factory';

// 公用方法
import {AttributeFactory} from "../../../../common/factory/attribute.factory";
import {ObjectType} from '../../../../../core/enum/ObjectType';
import {SystemPoint} from "../../../../../core/entity/SystemPoint";
import {CollectDataType} from "../../../../../core/server/enum/CollectDataType";
import {ResourceTypeEnum} from "../../../../../core/server/enum/ResourceType";
import * as _ from "lodash";

declare let $: any, personPopupHtml: any, angular: any, selectFacePopupHtml: any, demarcatePopupHtml: any, cameraTreePopupHtml: any;

class PersonSearchPageController {
    static $inject = ["$scope", "$timeout", "layer", "resourceRetrievalService", "socketFactory", "deviceCacheServer", "userInfoCacheFactory", "layerDec", 'systemInfoCacheFactory',"$filter", "handleStorage", "$state", 'uploadImageService', 'checkIntelligentAnalysis'];
    minSacle: number = 1;
    maxSacle: number = 100; //  相似度最大值
    selectTimeAcitve: number = 3;//时间段参数
    showMore: boolean = false;//是否显示更多
    searchParams: FaceSearchParams;// 查询参数
    faceResult: faceItem = initFaceResult(0); // 查询结果
    socketData: any;
    faceImgList: Array<QueryItem> = [];//上传图片
    sexList: Array<multipleChoice>;// 性别
    crossTrainTimeList: Array<multipleChoice>;//  时间段
    patternList: Array<multipleChoice>;// 模式
    equipmentList: Array<multipleChoice>;// 携带物
    ageList: Array<multipleChoice>;// 年龄段
    clothesList: Array<multipleChoice>;// 衣帽特征
    hairList: Array<multipleChoice>;// 发型
    shoeList: Array<multipleChoice>;// 鞋子
    glassesList: Array<multipleChoice>;// 眼镜
    maskList: Array<multipleChoice>;// 口罩
    capList: Array<multipleChoice>;// 帽子
    // 公用方法
    attributeFactory: AttributeFactory = new AttributeFactory();
    // 设备选择弹框
    currentLayerIndex: number;
    // 设备信息
    cameraListInfo: any;
    fromSelectFaceCtrl:string = "get-face-info-advance";
    selectDeviceCb: string = "close.camera.popup";
    uploadIndex: number = 0;
    queryStatus: number = 1; // 查询状态  1: 初始状态 2：查询中  3：查询结束
    analysisGoTo = AnalysisGoToType;
    checkFaceTrack: boolean;
    checkAccompanyingAnalysis: boolean;
    checkFrequencyAnalysis: boolean;
    checkAnalysis: boolean;

    constructor(private $scope: any,
                private $timeout: any,
                private layer: any,
                private resourceRetrievalService: IResourceRetrievalService,
                private socketFactory: ISocketFactory,
                private deviceCacheServer: IdeviceCaacheService,
                private userInfoCacheFactory: IUserInfoCacheFactory,
                private layerDec: ILayerDec,
                private systemInfoCacheFactory: ISystemInfoCacheProvider,
                private $filter:any,
                private handleStorage: IHandleStorage,
                private $state: any,
                private uploadImageService: IUploadImageService,
                private checkIntelligentAnalysis: ICheckIntelligentAnalysis) {
        let self = this;

        self.initParams();
        // 监听广播事件--框选地图返回设备id
        self.$scope.$on("search-device-id", function (event: any, data: any, dataType: string) {
            if (dataType === ObjectType.Camera.value) {
                let arrCameraId: Array<string> = angular.copy(self.searchParams.arrCameraId);
                arrCameraId =  _.concat(data, arrCameraId);
                arrCameraId = _.uniq(arrCameraId);
                self.searchParams.arrCameraId = arrCameraId;
            }
        });

        // 监听设备选择树
        self.$scope.$on(self.selectDeviceCb, (event: any, cameraIds: Array<string>, status:boolean) => {
            if (status) {
                if (Array.isArray(cameraIds)) {
                    self.$timeout(() => {
                        self.searchParams.arrCameraId = cameraIds;
                    });
                }
            }
            self.layer.close(self.currentLayerIndex);
        });

        // 监听人脸选择事件
        self.$scope.$on(self.fromSelectFaceCtrl, function (event: any, data: any) {
            let item:any = {
                id: 0,
                value: data.data.imageurl,
                key: data.data.key,
                fetureTaskParam: {
                    arrFetureTaskId: data.data.imageurl,
                    imageUrl: data.data.key
                }
            };
            self.faceImgList[self.uploadIndex] = item;
        });

        // 监听广播事件--导航切换--重置数据
        self.$scope.$on("advancedSearch-change", function (event: any, data: any) {
            if ((data === "person") || (data === "all")) {
                self.initParams();
            }
        });

        // 解绑socket事件
        self.$scope.$on("$destroy", () => {
            self.layer.close(self.currentLayerIndex);
            self.cancelMonitorSocket();
        });

        self.checkFaceTrack = self.checkIntelligentAnalysis.checkFaceTrack();
        self.checkAccompanyingAnalysis = self.checkIntelligentAnalysis.checkAccompanyingAnalysis();
        self.checkFrequencyAnalysis = self.checkIntelligentAnalysis.checkFrequencyAnalysis();
        self.checkAnalysis = self.checkIntelligentAnalysis.checkAnalysis();
    }

    // 监听socket
    public monitorSocket() {
        let self = this;
        self.socketFactory.subscribe(SocketResultTypeEnum.FaceSearch, (result: Array<any>) => {
            if (result[0].code === 200) {
                self.socketData = result[0].data.Face;
                self.$timeout(() => {
                    self.dealSocketData();
                });

            } else {
                self.$timeout(() => {
                    self.queryStatus = 3;
                });
            }
            self.cancelMonitorSocket();
        });
    }

    // 注销监听socket
    public cancelMonitorSocket() {
        let self = this;
        self.socketFactory.unSubscribe(SocketResultTypeEnum.FaceSearch);
    }

    // 初始化参数
    public initParams() {
        let self = this;
        // 初始化系统配置
        let systemData: SystemConfigParams = self.systemInfoCacheFactory.getSystemInfo();
        // 初始化图片上传列表
        self.faceImgList = [
            {
                id: 0,
                value: "",
                key: ""
            }, {
                id: 1,
                value: "",
                key: ""
            }, {
                id: 2,
                value: "",
                key: ""
            }, {
                id: 3,
                value: "",
                key: ""
            }, {
                id: 4,
                value: "",
                key: ""
            }
        ];
        // 设置筛选数据
        self.sexList = SexList();// 性别
        self.crossTrainTimeList = CrossTrainTimeList();//  时间段
        self.patternList = PatternList();// 模式
        self.equipmentList = EquipmentList();// 携带物
        self.ageList = AgeList();// 年龄段
        self.clothesList = ClothesList();// 衣帽特征
        self.hairList = HairList();// 发型
        self.shoeList = ShoeList();// 鞋子
        self.glassesList = GlassesList();// 眼镜
        self.maskList = MaskList();// 口罩
        self.capList = CapList();// 帽子
        self.selectTimeAcitve = 3;
        // 设置查询参数
        self.faceResult.pageParams.pageSize = 40;
        self.searchParams = {
            currentPage: 1,
            pageSize: 40,
            keyWord: "",
            userId: self.userInfoCacheFactory.getCurrentUserId(),
            orderBy: {
                isAsc: false
            },
            threshold: systemData.IdentityValue || 75,
            imagePath: "",
            arrCameraId: []
        };
        self.queryStatus = 1;

        // 设置默认查询时段
        let time = self.attributeFactory.getCrossTrainTime(self.selectTimeAcitve);
        self.searchParams.startTime = time.startTime;
        self.searchParams.endTime = time.endTime;

        // 销毁清除弹框
        self.$scope.$on('$destroy', () => {
            self.layer.close()
        })

        // 初始化获取设备信息
        self.cameraListInfo = self.deviceCacheServer.getAllCameraList();
    }

    // 设置socket请求参数
    public dealSocketData() {
        let self = this;
        let faceResultData: Array<face> = [];
        let min = self.faceResult.pageParams.pageSize * (self.faceResult.pageParams.currentPage - 1);
        let max = self.faceResult.pageParams.pageSize * self.faceResult.pageParams.currentPage;
        let deviceInfo: any;
        let newData:any = {
            Result: [],
            TotalCount: self.socketData.TotalCount,
            TaskId: self.socketData.TaskId
        };
        for (let i = min; i < max && i < self.socketData.TotalCount; i++) {
            newData.Result.push(self.socketData.Result[i]);
        }

        self.disposeCommonData(self.socketData, newData);
    }

    // 查询数据
    public searchAdvancedSubmit() {
        let self = this;
        self.searchParams.currentPage = 1;
        self.searchParams.pageSize = self.faceResult.pageParams.pageSize;
        self.searchParams.isFirstSearch = true;
        self.searchParams.taskId = "";
        self.searchParams.imagePath = "";
        self.faceResult.pageParams.currentPage = 1;

        let featureSearchExt:Array<any> = [];
        let fetureTaskParam:Array<any> = [];
        _.forEach(self.faceImgList, function(value, key) {
            if (value.featureSearchExt){ // 拖拽
                self.searchParams.imagePath = "Face";
                featureSearchExt.push(value.featureSearchExt);
            }else if (value.fetureTaskParam) {
                self.searchParams.imagePath = "Face";
                fetureTaskParam.push(value.fetureTaskParam);
            }
        });
        // 图片二次筛选
        if (self.searchParams.imagePath === "Face") {
            if ((self.searchParams.featureSearchExt === featureSearchExt)&&(self.searchParams.fetureTaskParam === fetureTaskParam)) {
                self.searchParams.isFirstSearch = false;
                self.searchParams.taskId = self.faceResult.taskId
            } else {
                self.searchParams.featureSearchExt = featureSearchExt;
                self.searchParams.fetureTaskParam = fetureTaskParam;
            }
        }else {
            self.searchParams.featureSearchExt = featureSearchExt;
            self.searchParams.fetureTaskParam = fetureTaskParam;
        }
        let searchParams: FaceSearchParams = {} as FaceSearchParams;
        searchParams = angular.copy(self.searchParams);
        // 设置查询设备id
        if(self.searchParams.arrCameraId.length === 0) {
            let systemPointList: Array<SystemPoint> = self.$scope.$parent.$parent.$parent.$parent.$parent.systemPoint;
            let deviceIds:Array<string> = [];
            _(systemPointList).forEach(function(value) {
                if (ObjectType.Camera.value === value.ObjectType) {
                    deviceIds.push(value.ObjectID);
                }
            });
            searchParams.arrCameraId = deviceIds;
        }

        self.getServerMessage(searchParams);
    }

    /**
     * @description 切换页数
     * @param {number} num
     * @returns {PageParams}
     */
    public changePage(num: number) {
        let self = this;
        self.searchParams.currentPage = num;
        self.searchParams.taskId = self.faceResult.taskId;
        self.faceResult.pageParams.currentPage = num;

        // 非图片查询
        if (self.searchParams.imagePath === "") {
            self.getServerMessage(self.searchParams);
        } else {
            self.dealSocketData();
        }
        return self.faceResult.pageParams;
    };

    /**
     * @description获取数据
     * @param {FaceSearchParams} searchParams
     */
    private getServerMessage(searchParams: FaceSearchParams) {
        let self = this;

        // 判断是图片查询还是文字检索
        if (searchParams.imagePath === "Face") {
            searchParams.keyWord = "";
        } else if (searchParams.keyWord === "") {
            return self.layerDec.warnInfo('请输入关键词');
        }
        // 设置最新时间
        if (self.selectTimeAcitve !== 4) {
            let time = self.attributeFactory.getCrossTrainTime(self.selectTimeAcitve);
            searchParams.startTime = time.startTime;
            searchParams.endTime = time.endTime;
        }
        // 查询开始
        self.queryStatus = 2;
        self.cancelMonitorSocket();
        self.resourceRetrievalService.advancedSearchByFace(searchParams).then((res: any) => {
            self.searchParams.isFirstSearch = false;
            // 查询结束
            if (searchParams.imagePath !== "Face") {
                if ((res.code === 200) && (typeof res.data !== 'undefined') && (res.data.Face.TotalCount > 0)) {
                    self.disposeCommonData(self.faceResult, res.data.Face);
                } else {
                    self.faceResult.pageParams.totalCount = 0;
                    self.faceResult.pageParams.pageCount = 0;
                    self.faceResult.data = [];
                    self.faceResult.taskId = null;
                    self.queryStatus = 3;
                }
            } else {
                self.monitorSocket();
            }
        })
    }

    /**
     * @description处理查询数据
     * @param resultData
     * @param data
     */
    private disposeCommonData(resultData: any, data: any) {
        let self = this;
        let params:any = {
            deviceIds: [],
            deviceType: '',
            ids: [],
            userId: self.userInfoCacheFactory.getCurrentUserId()
        };
        params.deviceType = ObjectType.Camera.value;
        _.forEach(data.Result,function (value) {
            params.deviceIds.push(value.AccessLog.CameraID);
            params.ids.push(value.AccessLog.ID);
        });
        self.resourceRetrievalService.getDeviceInfoPromise(params).then((res:any)=>{
            _.forEach(data.Result,function (item, index) {
                item.deviceInfo = res.data.deviceInfo[index];
                item.collectStatus = res.data.collectStatus[index];
            });
            self.$timeout(() => {
                self.faceResult.pageParams.totalCount = data.TotalCount;
                self.faceResult.pageParams.pageCount = Math.ceil(data.TotalCount / self.faceResult.pageParams.pageSize);
                self.faceResult.data = data.Result;
                self.faceResult.taskId = data.TaskId;
            }).then(() => {
                self.queryStatus = 3;
            });
        });
    }

    /**
     * @description 选择性别
     * @param {multipleChoice} item
     */
    public selectSex(item: multipleChoice) {
        let self = this;
        self.searchParams.arrGender = [];
        if (item.val !== "all") {
            self.searchParams.arrGender.push(item.val);
        }
        self.sexList.forEach(function (value, index, array) {
            if (value.val === item.val) {
                value.status = true;
            } else {
                value.status = false;
            }
        });
    };

    /**
     * @description 选择时间段
     * @param {multipleChoice} item
     */
    public selectTime(item: multipleChoice) {
        let self = this;
        let time: any;

        // 时段
        if (item.val === 1) {
            time = self.attributeFactory.getCrossTrainTime(1);
            self.searchParams.startTime = time.startTime;
            self.searchParams.endTime = time.endTime;
        } else if (item.val === 2) {
            time = self.attributeFactory.getCrossTrainTime(2);
            self.searchParams.startTime = time.startTime;
            self.searchParams.endTime = time.endTime;
        } else if ((item.val === 3) || (item.val === "all")) {
            time = self.attributeFactory.getCrossTrainTime(3);
            self.searchParams.startTime = time.startTime;
            self.searchParams.endTime = time.endTime;
        }

        self.selectTimeAcitve = item.val;
        self.crossTrainTimeList.forEach(function (value, index, array) {
            if (value.val === item.val) {
                value.status = true;
            } else {
                value.status = false;
            }
        });
    };

    /**
     * @description 选择模式
     * @param {multipleChoice} item
     */
    public selectPattern(item: multipleChoice) {
        let self = this;
        self.searchParams.arrType = [];
        if (item.val !== "all") {
            self.searchParams.arrType.push(item.val);
        }
        self.patternList.forEach(function (value, index, array) {
            if (value.val === item.val) {
                value.status = true;
            } else {
                value.status = false;
            }
        });
    };

    /**
     * @description 选择携带物
     * @param {multipleChoice} item
     */
    public selectEquipment(item: multipleChoice) {
        let self = this;
        self.searchParams.arrCarryThings = [];
        if (item.val !== "all") {
            self.searchParams.arrCarryThings.push(item.val);
        }
        self.equipmentList.forEach(function (value, index, array) {
            if (value.val === item.val) {
                value.status = true;
            } else {
                value.status = false;
            }
        });
    };

    /**
     * @description 选择年龄段
     * @param {multipleChoice} item
     */
    public selectAge(item: multipleChoice) {
        let self = this;
        if (item.val === 0) {
            self.searchParams.minAge = null;
            self.searchParams.maxAge = null;
        } else if (item.val === 1) {
            self.searchParams.minAge = 1;
            self.searchParams.maxAge = 20;
        } else if (item.val === 2) {
            self.searchParams.minAge = 21;
            self.searchParams.maxAge = 40;
        } else if (item.val === 3) {
            self.searchParams.minAge = 41;
            self.searchParams.maxAge = 60;
        } else if (item.val === 3) {
            self.searchParams.minAge = 60;
            self.searchParams.maxAge = null;
        }
        self.ageList.forEach(function (value, index, array) {
            if (value.val === item.val) {
                value.status = true;
            } else {
                value.status = false;
            }
        });
    };

    /**
     * @description 选择衣帽特征
     * @param {multipleChoice} item
     */
    public selectClothes(item: multipleChoice) {
        let self = this;
        self.clothesList.forEach(function (value, index, array) {
            if (value.val === item.val) {
                value.status = true;
            } else {
                value.status = false;
            }
        });
    };

    /**
     * @description 选择鞋子
     * @param {multipleChoice} item
     */
    public selectShoe(item: multipleChoice) {
        let self = this;
        self.searchParams.arrShoes = [];
        if (item.val !== "all") {
            self.searchParams.arrShoes.push(item.val);
        }
        self.shoeList.forEach(function (value, index, array) {
            if (value.val === item.val) {
                value.status = true;
            } else {
                value.status = false;
            }
        });
    };

    /**
     * @description 选择眼镜
     * @param {multipleChoice} item
     */
    public selectGlasses(item: multipleChoice) {
        let self = this;
        self.searchParams.arrEyeGlasses = [];
        if (item.val !== "all") {
            self.searchParams.arrEyeGlasses.push(item.val);
        }
        self.glassesList.forEach(function (value, index, array) {
            if (value.val === item.val) {
                value.status = true;
            } else {
                value.status = false;
            }
        });
    };

    /**
     * @description 选择口罩
     * @param {multipleChoice} item
     */
    public selectMask(item: multipleChoice) {
        let self = this;
        self.searchParams.arrMask = [];
        if (item.val !== "all") {
            self.searchParams.arrMask.push(item.val);
        }
        self.maskList.forEach(function (value, index, array) {
            if (value.val === item.val) {
                value.status = true;
            } else {
                value.status = false;
            }
        });
    };

    /**
     * @description 选择帽子
     * @param {multipleChoice} item
     */
    public selectCap(item: multipleChoice) {
        let self = this;
        self.searchParams.arrHat = [];
        if (item.val !== "all") {
            self.searchParams.arrHat.push(item.val);
        }
        self.capList.forEach(function (value, index, array) {
            if (value.val === item.val) {
                value.status = true;
            } else {
                value.status = false;
            }
        });
    };

    /**
     * @description 选择发型
     * @param {multipleChoice} item
     */
    public selectHair(item: multipleChoice) {
        let self = this;
        self.searchParams.arrHairType = [];
        if (item.val !== "all") {
            self.searchParams.arrHairType.push(item.val);
        }
        self.hairList.forEach(function (value, index, array) {
            if (value.val === item.val) {
                value.status = true;
            } else {
                value.status = false;
            }
        });
    };

    /**
     * @description 收藏与取消收藏
     * @param item
     */
    public clickCollect(event: any, item: face) {
        if (event) {
            event.stopPropagation();
        }
        let self = this;
        if (!item.collectStatus) {
            let params: CollectAddParams = {
                json: angular.toJson(item),
                objectID: item.AccessLog.ID,
                objectType: CollectDataType.Face.value
            };
            self.resourceRetrievalService.collectAddInfo(params)
                .then((res: any) => {
                    if (res) {

                    }
                })
        } else {
            let params: CollectDeleteParams = {
                ids: item.AccessLog.ID
            };
            self.resourceRetrievalService.collectDeleteInfo(params)
                .then((res: any) => {
                    if (res) {

                    }
                })
        }
        item.collectStatus = !item.collectStatus;
    }

    /**
     * @description 分析
     * @param item
     */
    public clickAnalysis(event: any, item: face, type: string) {
        if (event) {
            event.stopPropagation();
        }
        let storageParams: AnalysisStorageParams = AnalysisDataType.Face;
        storageParams.data = item;
        this.handleStorage.setSessionStorageData(storageParams.key, storageParams);
        localStorage.setItem("AnalysisType", "Face");
        if (type = AnalysisGoToType.Track.key) {
            window.open(AnalysisGoToType.Track.data);
        } else if (type = AnalysisGoToType.Accompanying.key) {
            window.open(AnalysisGoToType.Accompanying.data);
        } else if (type = AnalysisGoToType.Frequency.key) {
            window.open(AnalysisGoToType.Frequency.data);
        } else if (type = AnalysisGoToType.More.key) {
            window.open(AnalysisGoToType.More.data);
        }
        this.$timeout(() => {
            this.handleStorage.removeSessionStorageData(storageParams.key);
        }, 3000);
    }

    /**
     * @description 布控与取消布控
     * @param item
     */
    public clickSurveillance(event: any, item: face) {
        if (event) {
            event.stopPropagation();
        }
        item.surveillanceStatus = !item.surveillanceStatus;
    }

    /**
     * @description图片上传
     * @param event
     * @param {QueryItem} item
     */
    public imgUploading(event: any, item: QueryItem, index: number) {
        let self = this;
        self.searchParams.keyWord = "";
        self.uploadIndex = index;

        let from = new FormData();
        from.append('image', event.target.files[0]);
        let data = {
            storeType: "LOC",
            imageCategory: "CaptureImage",
            commandType: "SearchAccessLog",
            detectType: "Face"
        };
        this.uploadImageService.uploadImageForFace(from, data).then((res: any) => {
            if ((res.code === 200) && (res.data && res.data.key)) { // 人脸识别成功
                let obj:QueryItem = {
                    id: 0,
                    value: res.data.imageurl,
                    key: res.data.key,
                    fetureTaskParam: {
                        arrFetureTaskId: res.data.key,
                        imageUrl: res.data.imageurl
                    }
                };
                self.$timeout(() => {
                    self.faceImgList[index] = obj;
                });
            } else if ((res.code === 200) && (res.data.faceInfo)) {// 人脸选择
                let image = new Image();
                image.src = 'data:image/jpeg;base64,'+res.data.image;
                image.onload = ()=>{
                    let file = {
                        "_info": {
                            "width": image.width,
                            "height": image.height
                        }
                    };
                    self.multiUserSelect(res.data, file);
                }
            } else if ((res.code === 200) && (res.data.image)) { // 人脸识别失败待标定
                let image = new Image();
                image.src = 'data:image/jpeg;base64,'+res.data.image;
                image.onload = ()=>{
                    let file = {
                        "_info": {
                            "width": image.width,
                            "height": image.height
                        }
                    };
                    self.faceDemarcate(res.data, file);
                }
            } else {
                self.layerDec.warnInfo('人脸识别失败');
            }
        });
    }

    /**
     * 取消上传图片
     * @param {QueryItem} item
     */
    public imgCancel(index: number) {
        let self = this;
        let item:QueryItem = {
            id: 0,
            value: "",
            key: "",
            fetureTaskParam: null,
            featureSearchExt: null
        };
        self.faceImgList[index] = item;
    }

    /**
     * @description显示详情弹框
     * @param {number} rank
     * @param {Array<face>} list
     */
    public detailPopup(rank: number,allList:Array<face>) {
        let self = this;
        let scope: { $destroy: Function, rank: number, allList: Array<face>, collectFunction: Function, analysisFunction: Function, surveillanceFunction: Function, closePopup: Function } = self.$scope.$new();
        scope.rank = rank;
        scope.allList = allList;
        scope.collectFunction = (item: face) => {
            self.clickCollect(null, item);
        };
        scope.analysisFunction = (item: face, type: string) => {
            self.clickAnalysis(null, item, type);
        };
        scope.surveillanceFunction = (item: face) => {
            self.clickSurveillance(null, item);
        };
        scope.closePopup = () => {
            self.layer.close(self.currentLayerIndex);
        };
        self.currentLayerIndex = self.layer.open({
            type: 1,
            skin: 'detail-popup-box',
            title: false,
            area: ['600px', '440px'],
            content: personPopupHtml,
            scope: scope,
            end: function () {
                scope.$destroy();
            }
        });
    }

    /**
     * @description多人脸选择
     * @param faceInfo
     * @param file
     */
    public multiUserSelect(faceInfo: any, file: any) {
        let self = this;
        let scope: { layer: any; index: string, $destroy: Function, data: any, file: any, commandType: string, detectType: string, layerIndex: any, fromSelectFaceCtrl: string } = self.$scope.$new();

        scope.index = null;
        scope.data = faceInfo;
        scope.file = file;
        scope.commandType = "SearchAccessLog";
        scope.detectType = "Face";
        scope.fromSelectFaceCtrl = self.fromSelectFaceCtrl;

        scope.layerIndex = self.layer.open({
            type: 1,
            skin: 'no-scroll',
            title: ['人脸选择', 'font-weight: bold;background-color: #F6F8FB;color: #606060;height: 40px;'],
            area: ['400px', '310px'],
            content: selectFacePopupHtml,
            scope: scope,
            end: function () {
                scope.$destroy();
            }
        });

    }

    /**
     * @description人脸标注
     * @param faceInfo
     * @param file
     */
    public faceDemarcate(faceInfo: any, file: any) {
        let self = this;
        let scope: { layer: any; index: string, $destroy: Function, data: any, file: any, commandType: string, detectType: string, layerIndex: any, fromDemarcateFaceCtrl: string, flag: boolean } = self.$scope.$new();

        scope.index = null;
        scope.data = faceInfo;
        scope.file = file;
        scope.commandType = "SearchAccessLog";
        scope.detectType = "Face";
        scope.fromDemarcateFaceCtrl = self.fromSelectFaceCtrl;
        scope.flag = false;

        scope.layerIndex = self.layer.open({
            type: 1,
            skin: 'no-scroll',
            title: ['人脸标注', 'font-weight: bold;background-color: #F6F8FB;color: #606060;height: 40px;'],
            area: ['650px', '555px'],
            content: demarcatePopupHtml,
            scope: scope,
            end: function () {
                scope.$destroy();
            }
        });
    }

    // 选择设备
    public selectCamera() {
        let self = this;
        let scope: { selectCameraList: Array<string>, $destroy: Function, selectCtrlCb: string } = self.$scope.$new();
        scope.selectCameraList = self.searchParams.arrCameraId;
        scope.selectCtrlCb = self.selectDeviceCb;
        self.currentLayerIndex = self.layer.open({
            type: 1,
            content: cameraTreePopupHtml,
            scope: scope,
            title: "摄像机选择",
            area: ["710px", "620px"],
            end: function () {
                scope.$destroy();
            }
        });
    }

    public onDropComplete(dragData: any, evt: Event, index: number) {
        let self = this;
        let item:any = {
            id: 0,
            value: "",
            key: ""
        };
        item.featureSearchExt = {
            accessLogId: dragData.AccessLog.ID,
            featureType: "AccessFeature",
            imgUrl: dragData.AccessLog.FacePath
        };
        item.value = dragData.AccessLog.FacePath;
        item.key = dragData.AccessLog.ID;

        self.faceImgList[index] = item;
    }

    public selectDevice(type: string) {
        this.$scope.$emit("search-device-type", type);
        this.$scope.$emit("search-pattern", "advanced");
    }


    // 查看全图
    public fullScreen(event, path: string) {
        if (event) {
            event.stopPropagation();
        }
        let scope: { layer: any; index: string, path: any, $destroy: Function } = this.$scope.$new();
        scope.index = "fullScreenPopup";
        scope.path = path;
        if (path) {
            let windowW: any = $(window).width() * 0.8;
            let windowH: any = $(window).height() * 0.8;
            let contentHTML = `<img ng-src=${path} style='width:${windowW}px;height:${windowH}px;'>`;
            this.layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                skin: 'layui-layer-nobg no-scroll',
                shadeClose: true,
                shade: 0.6,
                area: [windowW + 'px', windowH + 'px'],
                content: contentHTML,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        } else {
            this.layer.msg("图片地址不存在")
        }
    }
}

app.controller('PersonSearchPageController', PersonSearchPageController);