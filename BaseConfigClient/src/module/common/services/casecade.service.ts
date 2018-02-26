import {app} from "../app/main.app";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {SearchCascadeModel} from "../../../core/server/SearchCascadeModel";
import { SearchType } from '../../../core/server/enum/SearchType';

declare var $:any;
/**
 * Created by dell on 2017/5/15.
 */

export interface ICasCadeService {
    findAreaList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>>;
    findRfidList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>>;
    findLampList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>>;
    findUnitList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>>;
    findCameraList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>>;
    findRmpGateList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>>;
    findWifiList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>>;
    findElectronicFenceList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>>;
    findUserList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>>;
    findBusinessLibList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>>;
    findVideoServerList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>>;
    findIvsServerList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>>;
    findIodServerList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>>;
    findAllAreaList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>>;
    findAllUnitList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>>;
    findAllCameraList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>>;
    findAllUserList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>>;
    findAllBusinessLibList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>>;
    findAllVideoServerList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>>;
    findAllIvsServerList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>>;
}

class CasCadeOrderType {
    static ASC = "ASC";
    static DESC = "DESC";
}

class CasCadeUrl {
    static FDS = "/fds/baseconfig/findCascadeList";
    static BCS = "/bcs/baseconfig/findCascadeList";
    static PDP = "/pdp/baseconfig/findCascadeList"; // new ;
    static DB = '/db/baseconfig/findCascadeList';
}

export class CasCadeSearchParams {
    areaId: string;
    name: string;
    orderField: string;
    isAsc: boolean;
    pageIndex: number;
    pageSize: number;
    code:string;
    type:string;
    /*人员列表查询用到*/
    roleId:string;
    unitId:string;
}

export class CasCadeService implements ICasCadeService {

    private notifyFunc: (res: ResponseResult<any>)=>ResponseResult<any>;

    findAllAreaList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>> {
        return this.findListByPage(CasCadeUrl.DB, searchParams, SearchType.Area.value);
    }

    findAllUnitList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>> {
        return this.findListByPage(CasCadeUrl.DB, searchParams, SearchType.Unit.value);
    }

    findAllCameraList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>> {
        return this.findListByPage(CasCadeUrl.DB, searchParams, SearchType.Camera.value);
    }

    findAllUserList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>> {
        return this.findListByPage(CasCadeUrl.DB, searchParams, SearchType.User.value);
    }

    findAllBusinessLibList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>> {
        return this.findListByPage(CasCadeUrl.DB, searchParams, SearchType.BusinessLib.value);
    }

    findAllVideoServerList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>> {
        return this.findListByPage(CasCadeUrl.DB, searchParams, SearchType.VideoServer.value);
    }

    findAllIvsServerList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>> {
        return this.findListByPage(CasCadeUrl.DB, searchParams, SearchType.IvsServer.value);
    }

    findAreaList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>> {
        return this.findListByPage(CasCadeUrl.DB, searchParams, SearchType.Area.value, true);
    }



    /**
     * copy area wait for edit
     * @param searchParams 
     */
    findRfidList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>> {
        return this.findListByPage(CasCadeUrl.DB, searchParams, SearchType.Area.value, true);
    }

    findUnitList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>> {
        return this.findListByPage(CasCadeUrl.DB, searchParams, SearchType.Unit.value, true);
    }

    findCameraList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>> {
        let serchType = SearchType.Camera.value;
        if(searchParams&&searchParams.type){
            serchType = searchParams.type;
        }
        return this.findListByPage(CasCadeUrl.DB, searchParams,serchType , true);
    }

    findRmpGateList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>> {
        return this.findListByPage(CasCadeUrl.DB, searchParams, SearchType.RmapGate.value, true);
    }

    findWifiList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>> {
        return this.findListByPage(CasCadeUrl.DB, searchParams, SearchType.Wifi.value, true);
    }

    findElectronicFenceList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>> {
        return this.findListByPage(CasCadeUrl.DB, searchParams, SearchType.ElectronicFence.value, true);
    }

    findUserList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>> {
        return this.findListByPage(CasCadeUrl.DB, searchParams, SearchType.User.value, true);
    }

    findBusinessLibList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>> {
        return this.findListByPage(CasCadeUrl.DB, searchParams, SearchType.BusinessLib.value, true);
    }

    findVideoServerList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>> {
        return this.findListByPage(CasCadeUrl.DB, searchParams, SearchType.VideoServer.value, true);
    }

    findIvsServerList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>> {
        return this.findListByPage(CasCadeUrl.DB, searchParams, SearchType.IvsServer.value, true);
    }
    findIodServerList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>> {
        return this.findListByPage(CasCadeUrl.DB, searchParams, SearchType.IodServer.value, true);
    }
    findLampList(searchParams: CasCadeSearchParams): Promise<ResponseResult<any>> {
        return this.findListByPage(CasCadeUrl.DB, searchParams, SearchType.LampServer.value, true);
    }
    // {value: 'ElectronicFence', text:'电子围栏'},
    private findListByPage(url: string, searchParams: CasCadeSearchParams, searchType: string, isPage?: boolean): Promise<ResponseResult<any>> {
        searchParams = searchParams || {} as CasCadeSearchParams;
        let model = {} as SearchCascadeModel;
        model.name = searchParams.name;
        model.code = searchParams.code;
        model.id = searchParams.areaId;

        model.isPage = !!isPage;
        if(model.isPage){
            model.pageIndex = searchParams.pageIndex || 1;
            model.pageSize = searchParams.pageSize || 10;
        }
        model.orderType = searchParams.isAsc ? CasCadeOrderType.ASC : CasCadeOrderType.DESC;
        model.orderField = searchParams.orderField;
        model.searchType = searchType;
   
        if(searchType === 'User'){
            model.areaIDName = 'PersonID';
            model.roleId = searchParams.roleId;
            model.unitId = searchParams.unitId;
        }
        if(searchParams.type){
            model.type = searchParams.type;
        }
        model.isPage = true;

        return this.$http({
            method: "POST",
            url: url,
            headers: {'Content-Type':'application/json;charset=UTF-8'},
            data: model
        });
    }

    static $inject: Array<string> = ['$http', 'notifyFactory'];

    // TODO 这里将notifyFactory放在这里调用, 省得每个业务方法都去执行, 如果这种方式不行再改
    constructor(private $http: any) {
    }

}

app.service("casCadeService", CasCadeService);