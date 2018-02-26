/// <amd-dependency path="text!../../../../detailPopup/personPopup/personPopup.html" name="personPopupHtml" />
import {app} from '../../../../common/app/main.app';

// 服务
import '../../../../common/services/resourceRetrieval.service';
import {IResourceRetrievalService} from '../../../../common/services/resourceRetrieval.service';
import '../../../../common/factory/HandleStorage.factory';
import {IHandleStorage} from '../../../../common/factory/HandleStorage.factory';
import '../../../../common/factory/CheckIntelligentAnalysis.factory';
import {ICheckIntelligentAnalysis} from '../../../../common/factory/CheckIntelligentAnalysis.factory';

// 参数
import {face, CollectAddParams, CollectDeleteParams} from '../../../resourceRetrievalEnum';
import {NPGisMapMain} from "../../../../common/map/map.main";
import {CollectDataType} from "../../../../../core/server/enum/CollectDataType";
import {AnalysisDataType, AnalysisStorageParams, AnalysisGoToType} from "../../../../../core/server/enum/AnalysisDataType";


declare let personPopupHtml: any, $: any, angular: any;

class personSearchPageController {
    static $inject = ["$scope", "$timeout", "layer", "resourceRetrievalService", "$compile", 'mylayer', 'handleStorage', 'checkIntelligentAnalysis'];
    map: NPGisMapMain = null;
    newMapWinPopul: string;
    layerIndex: number;
    analysisGoTo = AnalysisGoToType;
    checkFaceTrack: boolean;
    checkAccompanyingAnalysis: boolean;
    checkFrequencyAnalysis: boolean;
    checkAnalysis: boolean;

    constructor(private $scope: any,
                private $timeout: any,
                private layer: any,
                private resourceRetrievalService: IResourceRetrievalService,
                private $compile: any,
                private mylayer: any,
                private handleStorage: IHandleStorage,
                private checkIntelligentAnalysis: ICheckIntelligentAnalysis) {
        let self = this;

        /**
         * 销毁清除弹框
         */
        self.$scope.$on('$destroy', () => {
            this.layer.close();
        });

        self.checkFaceTrack = self.checkIntelligentAnalysis.checkFaceTrack();
        self.checkAccompanyingAnalysis = self.checkIntelligentAnalysis.checkAccompanyingAnalysis();
        self.checkFrequencyAnalysis = self.checkIntelligentAnalysis.checkFrequencyAnalysis();
        self.checkAnalysis = self.checkIntelligentAnalysis.checkAnalysis();
    }

    // 查看全图
    public fullScreen(path: string) {
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
     * @description显示详情弹框
     * @param {number} rank
     * @param {Array<face>} list
     */
    public detailPopup(rank: number, allList: Array<face>) {
        let self = this;
        let scope: { $destroy: Function, rank: number, allList: Array<face>, collectFunction: Function, analysisFunction: Function, surveillanceFunction: Function, closePopup: Function } = self.$scope.$new();
        scope.rank = rank;
        scope.allList = allList;
        scope.collectFunction = (item: face) => {
            self.clickCollect(item);
        };
        scope.analysisFunction = (item: face, type: string) => {
            self.clickAnalysis(item, type);
        };
        scope.surveillanceFunction = (item: face) => {
            self.clickSurveillance(item);
        };
        scope.closePopup = () => {
            self.layer.close(self.layerIndex);
        };
        self.layer.closeAll();
        self.mylayer.close("mapPoupsBox");
        self.layerIndex = self.layer.open({
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
     * 创建地图弹框
     * @param {NPMapLib.Geometry.Point} point
     * @param {Result} data
     */
    createMapPopup(point: NPMapLib.Geometry.Point, data: any, rank: number) {
        this.newMapWinPopul = this.map.createInfoWindow(114.2826138, 30.2684536, {
            iscommon: true,
            offset: new NPMapLib.Geometry.Size(-82, -248)
        });
        let scope: { windowPopul: any, map: any; index: string, $destroy: Function, rank: number, showTitle: boolean, allList: Array<face> } = this.$scope.$new();
        scope.map = this.map;
        scope.windowPopul = this.newMapWinPopul;
        scope.index = "personPopupHtml";
        scope.rank = rank;
        scope.allList = data;
        scope.showTitle = true;
        let dom = $(personPopupHtml).get(0);
        dom = this.$compile(dom.outerHTML)(scope);

        this.$timeout(() => {
            this.map.openInfoWindow(this.newMapWinPopul, dom[0], {
                close: () => {
                    scope.$destroy();
                    this.map.closeInfoWindow(this.newMapWinPopul);
                    this.newMapWinPopul = null;
                }
            });
        })
    }

    /**
     * @description 收藏与取消收藏
     * @param item
     */
    public clickCollect(item: face) {
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
    public clickAnalysis(item: face, type: string) {
        let storageParams: AnalysisStorageParams = AnalysisDataType.Face;
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

    /**
     * @description 布控与取消布控
     * @param item
     */
    public clickSurveillance(item: face) {
        item.surveillanceStatus = !item.surveillanceStatus;
    }
}

app.controller('personSearchPageController', personSearchPageController);