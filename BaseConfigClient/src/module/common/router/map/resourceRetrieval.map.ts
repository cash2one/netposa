import { IRouterConfig } from '../router';
import { RouteKeyEnum } from '../enum/RouteKeyEnum';
import {GroupEnum} from "../enum/RouteGroupEnum";

const ResourceRetrieval: IRouterConfig = {
    key: RouteKeyEnum.resourceRetrieval,
    url:'/resourceRetrieval',
    moduleName: 'DP_RESOURCE_RETRIEVAL_01',
    controllerName:  'resourceRetrievalController',
    controllerUrl: 'module/resourceRetrieval/resourceRetrieval.controller',
    controllerAs: 'resourceRetrievalCtrl',
    templateUrl: '/module/resourceRetrieval/resourceRetrieval.html',
    redirectTo: RouteKeyEnum.resourceRetrieval
};

export const ResourceRetrievalMap = [
    ResourceRetrieval
] as Array<IRouterConfig>;