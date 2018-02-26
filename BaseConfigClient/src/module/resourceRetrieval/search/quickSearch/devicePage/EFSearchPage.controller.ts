/// <amd-dependency path="text!../../../../detailPopup/efPopup/efPopup.html" name="efPopupHtml" />
import {app} from '../../../../common/app/main.app';
// 高级检索参数
import {electronic, CollectAddParams, CollectDeleteParams} from '../../../resourceRetrievalEnum';
import {CollectDataType} from "../../../../../core/server/enum/CollectDataType";

// 服务
import '../../../../common/services/resourceRetrieval.service';
import {IResourceRetrievalService} from '../../../../common/services/resourceRetrieval.service';

declare let efPopupHtml: any, angular: any;

class EFSearchPageController {
    static $inject = ['$scope', '$timeout', 'layer', 'resourceRetrievalService','mylayer'];
    layerIndex: number;

    constructor(private $scope: any,
                private $timeout: any,
                private layer: any,
                private resourceRetrievalService: IResourceRetrievalService,
                private mylayer: any,
            ) {

    }

    /**
     * @description显示详情弹框
     * @param {number} rank
     * @param {Array<electronic>} allList
     */
    public detailPopup(rank: number, allList: Array<electronic>) {
        let self = this;
        let scope: { $destroy: Function, rank: number, allList: Array<electronic>, collectFunction: Function, analysisFunction: Function, surveillanceFunction: Function, closePopup: Function } = self.$scope.$new();
        scope.rank = rank;
        scope.allList = allList;
        scope.collectFunction = (item: electronic) => {
            self.clickCollect(item);
        };
        scope.analysisFunction = (item: electronic) => {
            self.clickAnalysis(item);
        };
        scope.surveillanceFunction = (item: electronic) => {
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
            area: ['575px', '220px'],
            content: efPopupHtml,
            scope: scope,
            end: function () {
                scope.$destroy();
            }
        });
    }

    /**
     *
     * @description 收藏与取消收藏
     * @param item
     */
    public clickCollect(item: electronic) {
        let self = this;
        if (!item.collectStatus) {
            let params: CollectAddParams = {
                json: angular.toJson(item),
                objectID: item.eFenceLog.ID,
                objectType: CollectDataType.EFENCE.value
            };
            self.resourceRetrievalService.collectAddInfo(params)
                .then((res: any) => {
                    if (res) {

                    }
                })
        } else {
            let params: CollectDeleteParams = {
                ids: item.eFenceLog.ID,
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
    public clickAnalysis(item: electronic) {
    }

    /**
     * @description 布控与取消布控
     * @param item
     */
    public clickSurveillance(item: electronic) {
        item.surveillanceStatus = !item.surveillanceStatus;
    }
}

app.controller('eFSearchPageController', EFSearchPageController);