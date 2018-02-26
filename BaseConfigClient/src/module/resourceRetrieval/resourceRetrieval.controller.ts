import "css!./style/map.css"
import "css!./style/quickSearch.css"
import "css!./style/advancedSearch.css"

// 地图与搜索页
import "./resourceRetrievalMap/map.controller"
import "./search/search.controller"

// 弹框controller
import "../common/faceHandlePopup/selectFace.popup.controller";
import "../common/faceHandlePopup/demarcate.popup.controller";
import '../detailPopup/carPopup/carPopup.controller';
import '../detailPopup/carRecordPopup/carRecordPopup.controller';
import '../detailPopup/efPopup/efPopup.controller';
import '../detailPopup/fullScreenPopup/fullScreenPopup.controller';
import '../detailPopup/personPopup/personPopup.controller';
import '../detailPopup/wifiPopup/wifiPopup.controller';

import {app} from "../common/app/main.app";
import "jquery"
import * as _ from "lodash";

declare let angular: any,  $: any;

class resourceRetrievalController {
    static $inject = ["$scope", "$timeout", "$interval", "layer", "i18nFactory", "$q", "$window"];
    constructor(private $scope: any,
                private $timeout: Function,
                private $interval: any,
                private layer: any,
                private i18nFactory: any,
                private $q: any,
                private $window: any) {
    }
}

app.controller("resourceRetrievalController", resourceRetrievalController);