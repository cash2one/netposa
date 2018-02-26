import {app} from '../../../../common/app/main.app';

// 高级检索参数
import {position, CollectAddParams, CollectDeleteParams} from '../../../resourceRetrievalEnum';
import {CollectDataType} from "../../../../../core/server/enum/CollectDataType";

// 服务
import '../../../../common/services/resourceRetrieval.service';
import {IResourceRetrievalService} from '../../../../common/services/resourceRetrieval.service';

class PositionSearchPageController {
    static $inject = ['$scope', '$timeout', 'mylayer', 'resourceRetrievalService'];

    constructor(private $scope: any,
                private $timeout: any,
                private mylayer: any,
                private resourceRetrievalService: IResourceRetrievalService) {

    }

    /**
     * @description 显示详情弹框
     * @param item
     */
    public positionPopup(item: position) {

    }

    /**
     * @description 收藏与取消收藏
     * @param item
     */
    public clickCollect(item: position) {
        let self = this;
        if (!item.collectStatus) {
            let params: CollectAddParams = {
                json: JSON.stringify(item),
                objectID: item.id,
                objectType: CollectDataType.Position.value
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
}

app.controller('positionSearchPageController', PositionSearchPageController);