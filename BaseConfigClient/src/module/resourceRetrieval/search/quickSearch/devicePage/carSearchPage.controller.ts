/// <amd-dependency path="text!../../../../detailPopup/carPopup/carPopup.html" name="carPopupHtml" />
import {app} from '../../../../common/app/main.app';
// 参数
import {car} from "../../../../../core/enum/QueryRecord";
import {CollectAddParams, CollectDeleteParams} from "../../../../../core/enum/QueryParams";
// 服务
import '../../../../common/services/resourceRetrieval.service';
import {IResourceRetrievalService} from '../../../../common/services/resourceRetrieval.service';
import {CollectDataType} from "../../../../../core/server/enum/CollectDataType";
import {AnalysisGoToType} from "../../../../../core/server/enum/AnalysisDataType";

declare let carPopupHtml: any, angular: any;

class carSearchPageController {
    static $inject = ['$scope', '$state', '$timeout', 'resourceRetrievalService', 'layer','mylayer'];

    layerIndex: any;
    analysisGoTo = AnalysisGoToType;

    constructor(private $scope: any,
                private $state: any,
                private $timeout: any,
                private resourceRetrievalService: IResourceRetrievalService,
                private layer: any,
                private mylayer: any,
            ) {
        let self = this;
        // controller 销毁清除弹框
        self.$scope.$on('$destroy', () => {
            self.layer.close();
        })
    }

    /**
     *
     * @description 显示详情弹框
     * @param item
     */
    public detailPopup(rank: number, allList: Array<car>) {
        let self = this;
        let scope: {$destroy: Function, rank: number, allList: Array<car>, collectFunction: Function, analysisFunction: Function, surveillanceFunction: Function, closePopup: Function  } = self.$scope.$new();
        scope.rank = rank;
        scope.allList = allList;
        scope.collectFunction = (item: car) => {
            self.clickCollect(item);
        };
        scope.analysisFunction = (item: car) => {
            self.clickAnalysis(item);
        };
        scope.surveillanceFunction = (item: car) => {
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
            area: ['670px', '420px'],
            content: carPopupHtml,
            scope: scope,
            end: function () {
                scope.$destroy();
            }
        });
    }

    // 查看全图
    public fullScreen(path:string) {
        let scope: { layer: any; index: string, path: any, $destroy: Function } = this.$scope.$new();
        scope.index = "fullScreenPopup";
        scope.path = path;
        if (path) {
            let contentHTML = `<img ng-src=${path} style='width:800px;height:632px;'>`;
            this.layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                skin: 'layui-layer-nobg no-scroll',
                shadeClose: true,
                shade: 0.6,
                area: ['800px', '632px'],
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
     *
     * @description 收藏与取消收藏
     * @param item
     */
    public clickCollect(item: car) {
        let self = this;
        if (!item.collectStatus) {
            let params: CollectAddParams = {
                json: angular.toJson(item),
                objectID: item.id,
                objectType: CollectDataType.Car.value
            };
            self.resourceRetrievalService.collectAddInfo(params)
                .then((res: any) => {
                    if (res) {

                    }
                })
        } else {
            let params: CollectDeleteParams = {
                ids: item.id
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
     *
     * @description 分析
     * @param item
     */
    public clickAnalysis(item: car) {
        localStorage.setItem("AnalysisType", "Car");
        window.open(this.analysisGoTo.More.data);
    }

    /**
     *
     * @description 布控与取消布控
     * @param item
     */
    public clickSurveillance(item: car) {
        item.surveillanceStatus = !item.surveillanceStatus;
    }
}

app.controller('carSearchPageController', carSearchPageController);