import { TableMap } from "../model/Table-Map";
import { Camera } from "../core/entity/Camera";
import { BackResponseBody } from "../core/params/result/ResponseResult";
import * as log4js from "log4js";
import * as util from "util";
import {CameraEx} from "../core/entity/ex/CameraEx";
import {GetCameraIconByCameraType, TreeType} from "../core/enum/TreeType";
import {SearchType} from "../core/server/enum/SearchType";
import {SearchCascadeModel} from "../core/server/SearchCascadeModel";
import { DaoType } from '../dao/enum/DaoType';
import { BeanHelper } from '../common/help/BeanHelper';
import CameraDao from '../dao/CameraDao';
import AreaDao from '../dao/AreaDao';

export default class CameraExt {
    private static LOGGER = log4js.getLogger("CameraExtCache");

    static async getPosaDPJavaCache(keyword?:string){
        let param = {
            searchType: SearchType.Camera.value,
        } as SearchCascadeModel;

        // let res =  await PosaDPDao.findAreaResourceCascadeList(param) as BackResponseBody<Array<CameraEx>>;
        let res =  await BeanHelper.getDao<AreaDao>(DaoType.AreaDao).findAreaResourceCascadeList(param) as BackResponseBody<Array<CameraEx>>;
        let result = [] as Array<CameraEx>;
        if (Array.isArray(res.data)) {
            let r = res.data as Array<CameraEx>;
            let treeType = TreeType.camera.value, getIcon = GetCameraIconByCameraType;
            r.forEach((item:CameraEx)=>{
                item.treeType = treeType;
                item.iconSkin = getIcon(item.CameraType);
                item.ParentID = item.AreaID;
            });
            if (keyword) {
                r.forEach((item: CameraEx) => {
                    if (item.Name.indexOf(keyword) > -1) {
                        result.push(item)
                    }
                })
            }else{
                result = r;
            }
            res.data = result;
            CameraExt.LOGGER.info(util.format('从JAVA获取Camera缓存 共 %d 条',result.length));
        }
        return res;
    }

    static async getCameraForMap(): Promise<{ [key: string]: Camera }> {
        let res = await CameraExt.getPosaDPJavaCache();
        let result = {} as { [key: string]: Camera };
        if (Array.isArray(res.data)) {
            res.data.forEach((item: Camera) => {
                result[item.ID] = item;
            })
        }
        return result;
    }

}