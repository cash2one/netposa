/// <amd-dependency path="text!../../common/faceHandlePopup/selectFace.popup.html" name="selectFacePopupHtml" />
/// <amd-dependency path="text!../../common/faceHandlePopup/demarcate.popup.html" name="demarcatePopupHtml" />
import {app} from "../../common/app/main.app";
import "css!../style/quickSearch.css";

//  快速检索与高级检索
import "./quickSearch/quickSearch.controller";
import "./advancedSearch/advancedSearch.controller";

// 服务
import "../../common/services/resourceRetrieval.service";
import {IResourceRetrievalService} from "../../common/services/resourceRetrieval.service";
import "../../common/factory/layerMsg.factory";
import {ILayerDec} from "../../common/factory/layerMsg.factory";
import "../../common/services/uploadImage.service";
import {IUploadImageService} from "../../common/services/uploadImage.service";

// 参数
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {SetQueryRecord, GetQueryRecord, ClearQueryRecord, QueryItem} from "../resourceRetrievalEnum";

declare let angular: any, $: any, selectFacePopupHtml: any, demarcatePopupHtml: any;

class QuickSearchController {
    static $inject = ["$scope", "$timeout", "resourceRetrievalService", "layer", "layerDec","$filter", "uploadImageService"];

    keyword: string = "";//监控搜索框
    queryHistoryLog: Array<QueryItem>; // 查询历史
    queryThinkLog: Array<QueryItem>; // 联想查询历史
    clearKeyword: boolean = true;
    delayExecute: boolean = true;//延时执行定时器

    //图片上传
    carImgList: Array<QueryItem> = [];
    faceImgList: Array<QueryItem> = [];

    //键盘下键选中历史
    keyDownSelect: number = 0;

    // 选中设备信息
    deviceArrId: Array<string> = [];

    // 查询模式
    searchPatternStatus: number = 0; // 查询模式 0:显示原始页面 1:显示快速检索 2:显示高级检索
    mapSelectStatus: boolean = true; // 地图框选状态 true:框选完成 false:框选中
    showStatus: boolean = false; // 下拉框显示状态
    queryStatus: boolean = false; // 查询状态

    constructor(private $scope: any,
                private $timeout: any,
                private resourceRetrievalService: IResourceRetrievalService,
                private layer: any,
                private layerDec: ILayerDec,
                private $filter:any,
                private uploadImageService: IUploadImageService) {
        let self = this;
        // 监听人脸选择事件
        self.$scope.$on("get-face-info-quick", function (event: any, data: any) {
            let item:any = {
                id: 0,
                value: data.data.imageurl,
                key: data.data.key,
                fetureTaskParam: {
                    arrFetureTaskId: data.data.imageurl,
                    imageUrl: data.data.key
                }
            };
            self.carImgList = [];
            self.faceImgList.push(item);
            self.faceImgList.forEach(function (value, index, array) {
                value.id = index;
            });
        });
        //二次检索
        self.$scope.$on('quickSearchAgain', function (event: any, data: any) {
            self.keyword = data.keyword;
            data.type = "quick";
            self.deviceArrId = data.deviceArrId;
            self.initBroadcast(data)
        });
        //接收子页面返回上一次查询参数
        self.$scope.$on('last-query', function (event: any, data: any) {
            if (data.keyWord !== "") { // 全文检索
                self.keyword = data.keyWord;
                self.carImgList = [];
                self.carImgList = [];
            } else if (data.taskId !== "") {
                self.faceImgList = [{
                    id: 0,
                    value: data.imagePath,
                    key: data.taskId
                }];

            }
        });
        // 监听广播事件--设备id
        self.$scope.$on("search-device-id", function (event: any, data: any, dataType: string) {
            if (dataType === "All") {
                self.deviceArrId = data;
            }
            self.mapSelectStatus = true;
        });
        // 监听广播事件--查询模式
        self.$scope.$on("search-pattern", function (event: any, type: string) {
            self.$timeout(() => {
                self.mapSelectStatus = false;
            });
        });
        // 监听广播事件--查询状态
        self.$scope.$on("search-request-loading", function (event: any, status: boolean) {
            self.$timeout(() => {
                self.queryStatus = status;
            });
        });
    }

    // 获取联想搜索数据
    private getAssociateTips(key: string) {
        let self = this;
        let queryThinkLog: Array<QueryItem> = [];

        self.resourceRetrievalService.associateSearchByKeyWords(key)
            .then((res: any) => {
                if ((res.code === 200) && (res.data.length > 0)) {
                    for (let i = 0; i < res.data.length && i < 10 - self.queryHistoryLog.length; i++) {
                        if (queryThinkLog.length <= 10) {
                            queryThinkLog.push({id: i, value: res.data[i].SearchKey});
                        } else {
                            break;
                        }
                    }
                    self.queryThinkLog = queryThinkLog;
                    self.showStatus = true;
                }
            })
    }

    //  输入框获取光标 显示搜索记录
    public showHistoryLog() {
        this.changeQuery(this.keyword);
    }

    // 输入框失去焦点
    public hideHistoryLog() {
        // this.showStatus = false;
        // this.queryHistoryLog = [];
        // this.queryThinkLog = [];
    }

    // 输入框内容变化显示联想记录与历史纪录
    public changeQuery(keyword: string) {
        let self = this;
        keyword = keyword.trim();
        // 获取搜索缓存
        let queryHistoryLog: Array<QueryItem> = GetQueryRecord();
        let historyLog: Array<QueryItem> = [];

        //  过滤搜索历史纪录
        for (let i = 0; i < queryHistoryLog.length; i++) {
            // 获取联想相关历史纪录
            if (keyword !== "") {
                if (historyLog.length < 3) {
                    if (queryHistoryLog[i].value.indexOf(keyword) > -1) {
                        historyLog.push(queryHistoryLog[i]);
                    }
                } else {
                    break;
                }
            } else {
                if (historyLog.length < 10) {
                    historyLog.push(queryHistoryLog[i]);
                } else {
                    break;
                }
            }
        }

        // 设置搜索历史纪录
        if (historyLog.length > 0) {
            self.queryHistoryLog = historyLog;
            self.showStatus = true;
        } else {
            self.queryHistoryLog = [];
        }

        // 获取联想信息
        if (keyword !== "") {
            if (self.delayExecute) {
                self.delayExecute = false;
                self.$timeout(() => {
                    self.delayExecute = true;
                    self.getAssociateTips(keyword);
                }, 1000);
            }
        } else {
            self.queryThinkLog = [];
        }
    }

    // 删除输入内容
    public clearKeywordText() {
        this.keyword = "";
        this.hiddenHistoryLog();
        this.queryThinkLog = [];
        this.queryHistoryLog = [];
        this.keyDownSelect = 0;
        this.faceImgList = [];
        this.carImgList = [];
    }

    /**
     * @description 选中历史搜索内容
     * @param {QueryItem} item
     */
    public changeKeyWord(item: QueryItem) {
        this.keyword = item.value;
        this.baseSearch();
        this.showStatus = false;

        this.keyDownSelect = 0;
        this.hiddenHistoryLog();
    }

    // 删除历史记录
    public clearHistoryLog() {
        let self = this;
        ClearQueryRecord();
        self.queryHistoryLog = [];
        self.hiddenHistoryLog();
        self.$timeout(() => {
            self.changeQuery(self.keyword);
        });
    }

    // 隐藏下拉框
    public hiddenHistoryLog() {
        this.showStatus = false;
    }

    // 回车搜索
    public keySearch() {
        let eve: any = window.event ? window.event : false;
        let logDom: any = $('.bdsug-overflow');
        let logNum: number = logDom.length;

        // 回车
        if (eve && eve.keyCode == 13) {
            this.baseSearch();
            this.showStatus = false;
            this.keyDownSelect = 0;
            // 键盘向下
        } else if (eve && eve.keyCode == 40) {
            logDom.removeClass('textSearched');
            $(logDom[this.keyDownSelect]).addClass('textSearched');
            this.keyDownSelect += 1;
            // 选择历史到最后一条继续按下键变为第一条
            if (this.keyDownSelect < 0 || this.keyDownSelect > logNum) {
                this.keyDownSelect = 0;
            }
            // 键盘向上
        } else if (eve && eve.keyCode == 38) {
            logDom.removeClass('textSearched');
            $(logDom[this.keyDownSelect - 2]).addClass('textSearched');
            this.keyDownSelect -= 1;
            // 选择历史到第一条继续按上键变为最后一条
            if (this.keyDownSelect > logNum || this.keyDownSelect <= 0) {
                this.keyDownSelect = logNum + 1;
            }
        }

        // 选中历史关键字变化
        let textSearched: any = $('.textSearched');
        if (textSearched.length) {
            this.keyword = textSearched.text().trim();
        }
    }

    // 检索
    public baseSearch() {
        let self = this;
        let keyword = self.keyword.trim();
        let data = {
            keyword: "",
            type: "quick",
            carInfo: {},
            faceInfo: {},
            deviceArrId: self.deviceArrId
        };
        // 判断是否是以图检索
        if (self.carImgList.length) {//车辆
            data.carInfo = self.carImgList;
            data.type = "Car";
            self.initBroadcast(data);
        } else if (self.faceImgList.length) {//人像
            data.type = "Face";
            data.faceInfo = self.faceImgList;
            self.initBroadcast(data);
        } else if (keyword && keyword !== "") {
            SetQueryRecord(self.keyword);
            self.hiddenHistoryLog();
            data.keyword = keyword;
            self.initBroadcast(data);
        } else {
            return self.layerDec.warnInfo('请输入检索内容');
        }
    }

    // 广播查询参数
    public initBroadcast(data: any) {
        let self = this;

        // 快速检索模式
        self.searchPatternStatus = 1;
        // 进入查询状态
        self.queryStatus = true;
        self.$timeout(() => {
            self.$scope.$broadcast("verify-keyword", data);
            self.keyDownSelect = 0;
        });
    }

    // 车辆图片上传
    public CarImgUploading(event: any) {
        let self = this;
        self.keyword = "";
        self.faceImgList = [];
        self.showStatus = false;

        let from = new FormData();
        from.append('image', event.target.files[0]);
        this.uploadImageService.uploadImageForCar(from).then((res: any) => {
            if ((res.code === 200) && (res.data && res.data.redisId)) {
                let item:any = {
                    id: 0,
                    value: res.data.imageUrl,
                    key: res.data.redisId,
                    fetureTaskParam: {
                        arrFetureTaskId: res.data.redisId,
                        imageUrl: res.data.imageUrl
                    }
                };
                self.$timeout(() => {
                    self.carImgList.push(item);
                    self.carImgList.forEach(function (value, index, array) {
                        value.id = index;
                    });
                });
            } else {
                self.layerDec.warnInfo('图片上传失败');
            }
        });
    }

    // 人脸图片上传
    public faceImgUploading(event: any) {
        let self = this;
        self.keyword = "";
        self.carImgList = [];
        self.showStatus = false;

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
                let item:any = {
                    id: 0,
                    value: res.data.imageurl,
                    key: res.data.key,
                    fetureTaskParam: {
                        arrFetureTaskId: res.data.key,
                        imageUrl: res.data.imageurl
                    }
                };
                self.$timeout(() => {
                    self.faceImgList.push(item);
                    self.faceImgList.forEach(function (value, index, array) {
                        value.id = index;
                    });
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

    public carImgCancel(item: QueryItem) {
        let carImgList: Array<QueryItem> = [];
        this.carImgList.forEach(function (value, index, array) {
            if (item.id !== value.id) {
                carImgList.push(value);
            }
        });
        this.carImgList = carImgList;
    }

    public faceImgCancel(item: QueryItem) {
        let faceImgList: Array<QueryItem> = [];
        this.faceImgList.forEach(function (value, index, array) {
            if (item.id !== value.id) {
                faceImgList.push(value);
            }
        });
        this.faceImgList = faceImgList;
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
        scope.fromSelectFaceCtrl = "get-face-info-quick";

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
        scope.fromDemarcateFaceCtrl = "get-face-info-quick";
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

    // 图片拖拽查询
    public onDropComplete(dragData: any, evt: Event) {
        let self = this;
        self.keyword = "";
        let item:any = {
            id: 0,
            value: "",
            key: ""
        };

        if (dragData.AccessLog) {
            self.carImgList = [];
            item.featureSearchExt = {
                accessLogId: dragData.AccessLog.ID,
                featureType: "AccessFeature",
                imgUrl: dragData.AccessLog.FacePath
            };
            item.value = dragData.AccessLog.FacePath;
            item.key = dragData.AccessLog.ID;
            if (self.faceImgList.length > 4) {
                self.ExceedWarn();
            } else {
                self.faceImgList.push(item);
                self.faceImgList.forEach(function (value, index, array) {
                    value.id = index;
                });
            }
        } else {
            self.faceImgList = [];
            item.featureSearchExt = {
                accessLogId: dragData.id,
                featureType: "AccessFeature",
                imgUrl: dragData.panoramaImage
            };
            item.value = dragData.panoramaImage;
            item.key = dragData.id;
            if (self.carImgList.length > 4) {
                self.ExceedWarn();
            } else {
                self.carImgList.push(item);
                self.carImgList.forEach(function (value, index, array) {
                    value.id = index;
                });
            }
        }
    }

    public ExceedWarn() {
        this.layerDec.info('最多支持上传5张图片');
    }

    goToAdvanced() {
        this.searchPatternStatus = 2;
        this.$scope.$emit('map-clear-draw', "");
    }
}

app.controller("QuickSearchController", QuickSearchController);