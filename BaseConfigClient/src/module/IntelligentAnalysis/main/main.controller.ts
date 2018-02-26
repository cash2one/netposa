import {app} from "../../common/app/main.app";
import 'css!../style/IntelligentAnalysis.css'
// import 'css!../style/base.css'
// import 'css!../style/FaceTrack.css'

// 服务
import "../../common/factory/layerMsg.factory";
import {ILayerDec} from "../../common/factory/layerMsg.factory";
import "./analysisMmap.server";
import {IAnalysisMmapServer} from "./analysisMmap.server";
import '../../common/services/map.service';
import {IMapService} from '../../common/services/map.service';

// 参数
import {SystemPoint} from "../../../core/entity/SystemPoint";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import RouterService from "../../common/router/router.service";
import {MenuEmus, initCarMenu, initFaceMenu, initMacMenu, initMultiMenu} from './MenuEmus';

import './page.controller'
import "es6-promise";

declare let $: any, angular: any;

class IntelligentAnalysisController {
    static $inject = ['$scope','$stateParams', '$timeout', 'i18nFactory', 'mapService', '$q', '$state', '$sce', 'layerDec', 'analysisMmapServer'];
    mapId: string = "AnalysisMap";
    CurrentType: string = null;
    isShowMenuList: boolean = false;
    isShowItemPage: boolean = false;
    isShowCarIframe: boolean = false;
    iframeSrc: string;
    CarMenuList: Array<MenuEmus> = initCarMenu();
    FaceMenuList: Array<MenuEmus>;
    MacMenuList: Array<MenuEmus>;
    MultiMenuList: Array<MenuEmus>;
    MenuList: Array<MenuEmus>;

    constructor(private $scope: any,
                private $stateParams: any,
                private $timeout: Function,
                private i18nFactory: any,
                private mapService: IMapService,
                private $q: any,
                private $state: any,
                private $sce: any,
                private layerDec: ILayerDec,
                private analysisMmapServer: IAnalysisMmapServer) {
        this.initPageAuth();
        this.initModuleData();
        this.analysisMmapServer.initMap().then(() => {
            this.getSystemPoint().then((res: Array<SystemPoint>) => {
                this.analysisMmapServer.renderSystemPoint(this.resetSystemPoint(res), true);
            })

        });
        this.$scope.$on("$destroy", () => {
            this.analysisMmapServer.destory();
        });
        this.$scope.$on('showItemPage', (event: Event, flag: boolean) => {
            this.isShowItemPage = flag;
            this.isShowMenuList = !flag;
            if (!this.isShowItemPage) {
                this.$state.go('IntelligentAnalysis');
            }
        });
        // 判断默认展示模块
        let  AnalysisType = localStorage.getItem("AnalysisType");
        if(AnalysisType) {
            this.changePageType(AnalysisType);
            localStorage.removeItem("AnalysisType");
        }
    }
    private resetSystemPoint(arr: Array<SystemPoint>): Array<SystemPoint>{
        arr.forEach((item:SystemPoint,index:number)=>{
            if(item.IsRelate === 1){
                arr.splice(index,1)
            }
        });
        return arr;
    };

    private initPageAuth() {
        let faceList = [] as Array<MenuEmus>;
        let macList = [] as Array<MenuEmus>;
        let multiList = [] as Array<MenuEmus>;
        let moduleItems = RouterService.getInstance().getModuleItemsWithGroup('IntelligentAnalysis');
        let carItem = initCarMenu()/*车辆未启用路由控制*/, faceItems = initFaceMenu(), macItems = initMacMenu(),
            multiItems = initMultiMenu();
        for (let l = 0; l < moduleItems.length; l++) {
            let module = moduleItems[l];
            let s = false;
            for (let i = 0; i < faceItems.length; i++) {
                let item = faceItems[i] as MenuEmus;
                if (item.path === module.key) {
                    s = true;
                    faceList.push(item);
                    break;
                }
            }
            if (s) continue;
            for (let i = 0; i < macItems.length; i++) {
                let item = macItems[i] as MenuEmus;
                if (item.path === module.key) {
                    s = true;
                    macList.push(item);
                    break;
                }
            }
            if (s) continue;
            for (let i = 0; i < multiItems.length; i++) {
                let item = multiItems[i] as MenuEmus;
                if (item.path === module.key) {
                    //s = true;
                    multiList.push(item);
                    break;
                }
            }
        }
        this.FaceMenuList = faceList;
        this.MacMenuList = macList;
        this.MultiMenuList = multiList;
    }

    changePageType(type: string) {
        if (this.isShowItemPage) {
            this.$state.go('IntelligentAnalysis');
            this.isShowItemPage = false;
            this.CurrentType = type;
            this.isShowMenuList = true;
            if (this.CurrentType === 'Car') {
                this.MenuList = this.CarMenuList;
            } else if (this.CurrentType === 'Face') {
                this.MenuList = this.FaceMenuList
            } else if (this.CurrentType === 'Mac') {
                this.MenuList = this.MacMenuList
            } else if (this.CurrentType === 'Multi') {
                this.MenuList = this.MultiMenuList
            } else {
                return
            }
            return
        }


        if (this.CurrentType === type) {
            this.CurrentType = null;
            this.isShowMenuList = false;
        } else {
            this.CurrentType = type;
            this.isShowMenuList = true;
            if (this.CurrentType === 'Car') {
                this.MenuList = this.CarMenuList;
                this.isShowCarIframe = false;
                this.iframeSrc = null;
            } else if (this.CurrentType === 'Face') {
                this.MenuList = this.FaceMenuList
            } else if (this.CurrentType === 'Mac') {
                this.MenuList = this.MacMenuList
            } else if (this.CurrentType === 'Multi') {
                this.MenuList = this.MultiMenuList
            } else {
                return
            }
        }
    }

    goMenu(item: MenuEmus) {
        if (item.type === 'Car') {
            this.isShowCarIframe = true;
            this.isShowMenuList = false;
            this.CurrentType = null;
            this.iframeSrc = this.$sce.trustAsResourceUrl(item.path);
        } else {
            this.isShowCarIframe = false;
            this.iframeSrc = null;
            this.$state.go(item.path);
        }

    }

    private initModuleData() {
        this.MenuList = angular.copy(this.CarMenuList);
    }


    private getSystemPoint() {
        return this.mapService.getSystemPoints().then((res: ResponseResult<Array<SystemPoint>>) => {
            let arr = [] as Array<SystemPoint>;
            if (res.code === 200 && Array.isArray(res.data)) {
                res.data.forEach((item: SystemPoint) => {
                    if (item.LayerType && item.Lat && item.Lon) {
                        arr.push(item);
                    }
                });

                let a = [] as Array<SystemPoint>, b = [] as Array<SystemPoint>, c = [] as Array<SystemPoint>, d = [] as Array<SystemPoint>, e = [] as Array<SystemPoint>
                res.data.forEach((item: SystemPoint) => {
                    let type = item.LayerType.toLocaleLowerCase();
                    if (type.indexOf('camera') > -1) {
                        a.push(item)
                    }
                    if (type.indexOf('wifi') > -1) {
                        b.push(item)
                    }
                    if (type.indexOf('efence') > -1) {
                        c.push(item)
                    }
                    if (type.indexOf('rmpgate') > -1) {
                        d.push(item)
                    }
                    if (type.indexOf('lamppost') > -1) {
                        e.push(item)
                    }
                });
            } else {
                this.layerDec.warnInfo('未获取到点位信息')
            }
            this.$scope.systemPoint = arr;
            this.$scope.$broadcast('points.ready', this.$scope.systemPoint);
            return arr;
        })
    }

}

app.controller('IntelligentAnalysisController', IntelligentAnalysisController);