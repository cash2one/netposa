
import { app } from '../app/main.app';
import { NPGisMapMain } from '../map/map.main';
import { SystemPoint } from '../../../core/entity/SystemPoint';

declare let $: any;

export interface IMapEventFactory {
    init(map: NPGisMapMain): void;
    destroy(): void;
    createPopup(point: NPMapLib.Geometry.Point, scope: any, tpl: any): string;
}


/**
 * @constructor 
 * @param map<NPGisMapMain>
 */
export class MapEventFactory {
    map: NPGisMapMain;
    $scope: any;
    $compile: any;
    constructor() { }
    instance() {
        let _self = this as MapEventFactory;
        return function($rootScope: any, $compile: any)  {
            _self.$scope = $rootScope;
            _self.$compile = $compile;
            return {
                init(map: NPGisMapMain) {
                    if(!_self.map){
                        _self.map = map;
                    }
                },
                createPopup(point: NPMapLib.Geometry.Point, scope: any, tpl: any) {
                    let size = _self.compileDomSize(tpl);
                    let winInfo = _self.map.createInfoWindow(point.lon, point.lat, {
                        iscommon: true,
                        offset: new NPMapLib.Geometry.Size(-1 * (size.width / 2), -1 * (size.height + 10))
                    });
                    let dom = $(tpl).get(0);
                    dom = _self.$compile(dom)(scope);
                    _self.map.openInfoWindow(winInfo, dom[0], {
                        close: () => {
                            scope.$destroy();
                            _self.map.closeInfoWindow(winInfo);
                        }
                    });
                    return winInfo;
                },
                destroy(){
                    _self.map = null;
                }

            } as IMapEventFactory
        }
    }

    private compileDomSize(ele: any): { width: number, height: number } {
        let domEle = $(ele);
        $('body').append(domEle);
        let size = {
            width: domEle.outerWidth(),
            height: domEle.outerHeight()
        }
        domEle.remove();
        return size;
    }
}
app.factory('mapEventFactory', new MapEventFactory().instance())