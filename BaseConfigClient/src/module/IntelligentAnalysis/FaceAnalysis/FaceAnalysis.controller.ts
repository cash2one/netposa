/// <amd-dependency path="text!../Analysis.facelib.popup.html" name="popupHtml" />
/// <amd-dependency path="text!../FaceAnalysisPopupDetail/faceanalysis.popup.detail.html" name="detailPopupHtml" />
/// <amd-dependency path="text!../loading/loading.html" name="loadingAnalysisHtml" />
/// <amd-dependency path="text!../../common/faceHandlePopup/selectFace.popup.html" name="selectFacePopupHtml" />
/// <amd-dependency path="text!../../common/faceHandlePopup/demarcate.popup.html" name="demarcatePopupHtml" />
import {app} from "../../common/app/main.app";
import 'css!../style/FaceAnalysis.css';
import 'css!../FaceAnalysisPopupDetail/faceanalysis.popup.detail.css';

// 服务
import "../../common/factory/socket.factory";
import {ISocketFactory} from "../../common/factory/socket.factory";
import "../../common/services/analysis.service";
import {IAnalysisService} from "../../common/services/analysis.service";
import "./Face.analysis.service";
import {IFaceAnalysisService, PageParams} from "./Face.analysis.service";
import "../../common/factory/layerMsg.factory";
import {ILayerDec} from "../../common/factory/layerMsg.factory";
import '../../common/factory/HandleStorage.factory';
import {IHandleStorage} from '../../common/factory/HandleStorage.factory';
import "../../common/services/uploadImage.service";
import {IUploadImageService} from "../../common/services/uploadImage.service";

// 弹框
import '../Analysis.facelib.popup'
import '../FaceAnalysisPopupDetail/faceanalysis.popup.detail.controller';

// 参数
import {NPGisMapMain} from '../../common/map/map.main';
import {SystemPoint} from "../../../core/entity/SystemPoint";
import {FaceAnalysisParams, PersonInfoModel, FaceAnalysisResult} from '../../../core/entity/FaceAnalysisEnum';
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {Enum, Age, getAgeList, getSexDataList, SexData} from '../AnalysisEnum';
import {SocketResultTypeEnum} from "../../../core/server/enum/SocketResultTypeEnum";
import {NationType} from "../../../core/server/enum/NationType";
import {PersonAlarmResult} from "../../../core/entity/PersonAlarmEnum";
import {AnalysisDataType, AnalysisStorageParams, AnalysisGoToType} from "../../../core/server/enum/AnalysisDataType";

declare let $: any, popupHtml: any, detailPopupHtml: any, loadingAnalysisHtml: any, selectFacePopupHtml: any,
    demarcatePopupHtml: any;

class FaceAnalysisController {
    $inject: Array<string> = ['$scope', '$timeout', 'layer', 'layerDec', 'analysisService', 'faceAnalysisService', 'socketFactory', 'handleStorage', 'uploadImageService', '$state'];
    map: NPGisMapMain;
    systemPointList: Array<SystemPoint>;
    FaceAnalysisParams: FaceAnalysisParams;
    width: number = 0;
    ResultActive: boolean = false;
    SexDateList: Array<Enum<number>> = getSexDataList();
    AgeDataList: Array<Enum<Age>> = getAgeList();
    SexDate: Enum<number> = SexData.all;
    nationList: Array<{ text: string, value: string, parentCode: string }> = NationType;
    libNameList: Array<{ ID: string, value: string }> = [];
    similarityMax: number = 100;
    similarityMin: number = 80;
    resultParams: PageParams = new PageParams(); // 人脸查询结果
    currentLayerIndex: number;
    libName: string = null;
    allResult: Array<PersonInfoModel>;

    selectFaceCtrl: string = "get-face-info-quick";
    selectFacelibCtrl: string = "close.facelib.popup";
    analysisGoTo = AnalysisGoToType;

    constructor(private $scope: any,
                private $timeout: any,
                private layer: any,
                private layerDec: ILayerDec,
                private analysisService: IAnalysisService,
                private faceAnalysisService: IFaceAnalysisService,
                private socketFactory: ISocketFactory,
                private handleStorage: IHandleStorage,
                private uploadImageService: IUploadImageService,
                private $state: any) {
        let self = this;

        self.initParams();

        self.$timeout(() => {
            self.$scope.$emit('showItemPage', true);
        });

        // 监听页面销毁事件
        self.$scope.$on('$destroy', () => {
            self.unbindSocket();
        });

        // 监听人脸选择事件
        self.$scope.$on(self.selectFaceCtrl, function (event: any, data: any) {
            self.$timeout(() => {
                self.FaceAnalysisParams.imagePath = data.data.imageurl;
                self.FaceAnalysisParams.taskId = data.data.key;
            })
        });

        // 监听人像库选择事件
        self.$scope.$on(self.selectFacelibCtrl, (event: any, libsIds: Array<string>, libsEnum: Array<{ ID: string, value: string }>) => {
            if (Array.isArray(libsIds)) {
                self.FaceAnalysisParams.arrLibId = libsIds;
                self.libNameList = libsEnum;
            }
            self.layer.close(self.currentLayerIndex);
        });
    }

    selectFaceLib() {
        let scope: { selectCameraList: Array<string>, $destroy: Function } = this.$scope.$new();
        scope.selectCameraList = this.FaceAnalysisParams.arrLibId;
        this.currentLayerIndex = this.layer.open({
            type: 1,
            content: popupHtml,
            scope: scope,
            title: "人像库选择",
            area: ["710px", "620px"],
            end: function () {
                scope.$destroy();
            }
        });
    }

    initLoadingPop() {
        let scope: { $destroy: Function } = this.$scope.$new();
        this.currentLayerIndex = this.layer.open({
            type: 1,
            content: loadingAnalysisHtml,
            scope: scope,
            title: false,
            area: ['500px', "280px"],
            end: () => {
                this.unbindSocket();
                scope.$destroy();
            }
        })
    }

    //TODO 上传图片
    uploadImage(event: any) {
        let self = this;
        let from = new FormData();
        from.append('image', event.target.files[0]);
        let data = {
            storeType: "LOC",
            imageCategory: "CaptureImage",
            commandType: "SearchFace",
            detectType: "Face"
        };
        this.uploadImageService.uploadImageForFace(from, data).then((res: ResponseResult<any>) => {
            if ((res.code === 200) && (res.data && res.data.key)) { // 人脸识别成功
                self.$timeout(() => {
                    self.FaceAnalysisParams.imagePath = res.data.imageurl;
                    self.FaceAnalysisParams.taskId = res.data.key
                })
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

    deleteImage() {
        this.FaceAnalysisParams.imagePath = "";
        if (this.FaceAnalysisParams.taskId) {
            this.FaceAnalysisParams.taskId = "";
        }
        if (this.FaceAnalysisParams.accessLogId) {
            this.FaceAnalysisParams.featureType = "";
            this.FaceAnalysisParams.accessLogId = "";

        }
        if (this.FaceAnalysisParams.PersonId) {
            this.FaceAnalysisParams.featureType = "";
            this.FaceAnalysisParams.ImgUrl = "";
            this.FaceAnalysisParams.LibId = "";
            this.FaceAnalysisParams.PersonId = "";
        }
    }

    /**
     * @description 返回上级
     */
    goBack() {
        this.$timeout(() => {
            this.$scope.$emit('showItemPage', false);
        })
    }

    openDetailPopup(item: any, index: number) {
        let scope: { result: PersonInfoModel, baseImage: string, allResult: Array<PersonInfoModel>, index: number, $destroy: Function } = this.$scope.$new();
        scope.allResult = this.allResult;
        scope.result = item;
        scope.index = index;
        if (this.FaceAnalysisParams.imagePath) {
            scope.baseImage = this.FaceAnalysisParams.imagePath
        }
        this.currentLayerIndex = this.layer.open({
            type: 1,
            content: detailPopupHtml,
            scope: scope,
            skin: "no-scroll",
            title: '人员详情',
            area: ["auto", "275px"],
            end: function () {
                scope.$destroy();
            }
        })
    }

    /**
     * @description 初始化查询表单参数数据
     */
    private initParams() {
        let self = this;
        let faceAnalysisParams = new FaceAnalysisParams();
        faceAnalysisParams.threshold = 90;
        faceAnalysisParams.imagePath = "";
        faceAnalysisParams.taskId = "";
        faceAnalysisParams.arrLibId = [];
        // 判断是否有通行记录快速检索
        let AnalysisData: AnalysisStorageParams = self.handleStorage.getSessionStorageData(AnalysisDataType.Face.key);
        if (AnalysisData) {
            faceAnalysisParams.featureType = "AccessFeature";
            faceAnalysisParams.imagePath = AnalysisData.data.AccessLog.FacePath;
            faceAnalysisParams.accessLogId = AnalysisData.data.AccessLog.ID;
            self.handleStorage.removeSessionStorageData(AnalysisDataType.Face.key);
        }
        // 判断是否有人脸分析快速检索
        AnalysisData = self.handleStorage.getSessionStorageData(AnalysisDataType.FaceLibrary.key);
        if (AnalysisData) {
            faceAnalysisParams.featureType = "FaceFeature";
            faceAnalysisParams.imagePath = AnalysisData.data.PersonInfo.FacePicPath[0];
            faceAnalysisParams.ImgUrl = AnalysisData.data.PersonInfo.FacePicPath[0];
            faceAnalysisParams.LibId = AnalysisData.data.LibId;
            faceAnalysisParams.PersonId = AnalysisData.data.PersonInfo.ID;
            self.handleStorage.removeSessionStorageData(AnalysisDataType.FaceLibrary.key);
        }
        self.$timeout(() => {
            self.FaceAnalysisParams = faceAnalysisParams;
        });
    }

    selectAge(age: Enum<Age>) {
        if (typeof age !== 'string') {
            this.FaceAnalysisParams.maxAge = age.value.maxAge;
            this.FaceAnalysisParams.minAge = age.value.minAge;
        } else {
            this.FaceAnalysisParams.maxAge = null;
            this.FaceAnalysisParams.minAge = null;
        }
    }

    /**
     *
     * @description 选中民族
     * @param selected //选中对象
     */
    nationClick(selected: any) {
        this.FaceAnalysisParams.nation = selected.value;
    }

    bindSocketToResult() {
        console.warn('socket callback is bind');
        this.socketFactory.subscribe(SocketResultTypeEnum.SearchFace, (res: Array<any>) => {
            console.info('sockit 回调已触发 结果是：', res);
            this.layer.close(this.currentLayerIndex);
            if (Array.isArray(res) && res[0].code === 200) {
                let result = res[0].data as FaceAnalysisResult;
                result.LibNameList = this.libNameList;
                if (((result.TaskId === this.FaceAnalysisParams.taskId)||(this.FaceAnalysisParams.featureType !== ''))&&(result.TotalCount > 0)) {
                    this.$timeout(() => {
                        this.faceAnalysisService.setFaceAnalysisDataList(result);
                        this.showResult();
                    })
                } else {
                    this.layerDec.info(' 没有查询到结果');
                }
            } else {
                this.layerDec.warnInfo('查询结果失败！');
            }
            this.unbindSocket();
        });
    }

    unbindSocket() {
        console.warn('socket callback is unbind');
        this.socketFactory.unSubscribe(SocketResultTypeEnum.SearchFace);
    }

    // 提交查询请求
    analysisQuery() {
        let self = this;
        if (!self.FaceAnalysisParams.taskId && !self.FaceAnalysisParams.accessLogId && !self.FaceAnalysisParams.PersonId) {
            return self.layerDec.warnInfo('请上传图片！');
        }
        if (!Array.isArray(self.FaceAnalysisParams.arrLibId) || self.FaceAnalysisParams.arrLibId.length === 0) {
            return self.layerDec.warnInfo('请选择人像库！');
        }

        let params = new FaceAnalysisParams();
        params.idCardNumber = self.FaceAnalysisParams.idCardNumber;
        params.name = self.FaceAnalysisParams.name;
        params.threshold = self.FaceAnalysisParams.threshold;
        params.minAge = self.FaceAnalysisParams.minAge;
        params.maxAge = self.FaceAnalysisParams.maxAge;
        params.nation = self.FaceAnalysisParams.nation;
        params.retrievalReason = self.FaceAnalysisParams.retrievalReason;
        params.arrLibId = self.FaceAnalysisParams.arrLibId;
        params.arrGender = [];
        // 设置性别
        if (self.SexDate.key !== "all") {
            params.arrGender.push(self.SexDate.key);
        }
        if (self.FaceAnalysisParams.taskId) {
            params.imagePath = self.FaceAnalysisParams.imagePath;
            params.taskId = self.FaceAnalysisParams.taskId;
        }
        if (self.FaceAnalysisParams.accessLogId) {
            params.featureType = self.FaceAnalysisParams.featureType;
            params.accessLogId = self.FaceAnalysisParams.accessLogId;

        }
        if (self.FaceAnalysisParams.PersonId) {
            params.featureType = self.FaceAnalysisParams.featureType;
            params.ImgUrl = self.FaceAnalysisParams.ImgUrl;
            params.LibId = self.FaceAnalysisParams.LibId;
            params.PersonId = self.FaceAnalysisParams.PersonId;
        }

        self.initLoadingPop();
        self.analysisService.faceAnalysis(params).then((res: ResponseResult<any>) => {
            if (res.code === 200) {
                self.bindSocketToResult();
            } else {
                self.layer.close(this.currentLayerIndex);
                self.layerDec.failInfo('查询失败！')
            }
        })

    }

    private showResult() {
        this.resultParams.currentPage = 1;
        this.resultParams.pageSize = 32;
        this.resultParams = this.faceAnalysisService.getFaceAnalysisDataByPage(this.resultParams);
        this.allResult = this.resultParams.allResult;
        this.ResultActive = true;
        this.width = $(window).width() - 360;
    }

    changeResultPage(i: number) {
        this.resultParams.currentPage = i;
        if (this.libName !== null) {
            this.$timeout(() => {
                this.resultParams = this.faceAnalysisService.getFaceAnalysisDataByPage(this.resultParams, this.libName);
            })
        } else {
            this.$timeout(() => {
                this.resultParams = this.faceAnalysisService.getFaceAnalysisDataByPage(this.resultParams);
            })
        }
    }

    closeResult() {
        this.ResultActive = false;
        this.width = 0;
    }

    libNameSelect(lib: { ID: string, value: string }) {
        if (lib !== null) {
            this.libName = lib.value;
            this.$timeout(() => {
                this.resultParams.currentPage = 1;
                this.resultParams = this.faceAnalysisService.getFaceAnalysisDataByPage(this.resultParams, lib.ID);
                this.allResult = this.resultParams.allResult
            })
        } else {
            this.resultParams = this.faceAnalysisService.getFaceAnalysisDataByPage(this.resultParams);
            this.allResult = this.resultParams.allResult
        }
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
        scope.fromSelectFaceCtrl = self.selectFaceCtrl;

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
        scope.fromDemarcateFaceCtrl = self.selectFaceCtrl;
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

    // 查看全图
    public fullScreen(event: any, path: string) {
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

    /**
     * @description 布控与取消布控
     * @param item
     */
    clickSurveillance(event: any, item: any) {
        if (event) {
            event.stopPropagation();
        }
        item.surveillanceStatus = !item.surveillanceStatus;
    }

    /**
     * @description 分析
     * @param item
     */
    clickAnalysis(event:any, item:any, type:string) {
        if (event) {
            event.stopPropagation();
        }
        let storageParams: AnalysisStorageParams = AnalysisDataType.FaceLibrary;
        storageParams.data = item;
        this.handleStorage.setSessionStorageData(storageParams.key, storageParams);
        localStorage.setItem("AnalysisType", "Face");
        if (type === AnalysisGoToType.Track.key) {
            window.open(AnalysisGoToType.Track.data);
        } else if (type === AnalysisGoToType.Accompanying.key) {
            window.open(AnalysisGoToType.Accompanying.data);
        } else if (type === AnalysisGoToType.Frequency.key) {
            window.open(AnalysisGoToType.Frequency.data);
        } else if (type === AnalysisGoToType.More.key) {
            window.open(AnalysisGoToType.More.data);
        }
        this.$timeout(() => {
            this.handleStorage.removeSessionStorageData(storageParams.key);
        }, 3000);
    }
}

app.controller('FaceAnalysisController', FaceAnalysisController);