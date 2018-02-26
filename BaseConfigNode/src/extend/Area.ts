import {Area} from '../core/entity/Area';
import {BackResponseBody} from "../core/params/result/ResponseResult";
import * as log4js from "log4js";
import * as util from "util";
import {TreeType, TreeIconSkin} from "../core/enum/TreeType";
import {AreaEx} from "../core/entity/ex/AreaEx";
import {SearchType} from "../core/server/enum/SearchType";
import {SearchCascadeModel} from "../core/server/SearchCascadeModel";
import {BeanHelper} from '../common/help/BeanHelper';
import {DaoType} from '../dao/enum/DaoType';
import AreaDao from '../dao/AreaDao';
import ErrorCode from "../common/res/ErrorCode";


export default class AreaExt {
    private static LOGGER = log4js.getLogger("AreaExt");

    /**
     * @title 获取JAVA中区域的缓存 配置中心可用。
     * @param {string} keyword
     * @returns {Promise<Array<AreaEx>>}
     * @update hjj
     * @time 2017-10-24 18:22:31
     */
    static async getPosaDPJavaCache(keyword?: string | null) {
        let param = {
            searchType: SearchType.Area.value,
        } as SearchCascadeModel;
        let res = await BeanHelper.getDao<AreaDao>(DaoType.AreaDao).findAreaResourceCascadeList(param) as BackResponseBody<Array<AreaEx>>;
        let result = [] as Array<AreaEx>;
        if (Array.isArray(res.data)) {
            let r = res.data as Array<AreaEx>;
            let iconSkin = TreeIconSkin.Area;
            let treeType = TreeType.area.value;
            r.forEach((item: AreaEx) => {
                item.treeType = treeType;
                item.iconSkin = iconSkin;
            });
            if (keyword) {
                r.forEach((item: AreaEx) => {
                    if (item.Name.indexOf(keyword) > -1 || item.Code.indexOf(keyword) > -1) {
                        result.push(item)
                    }
                });
            } else {
                result = r
            }
            res.data = result;
            AreaExt.LOGGER.info(util.format('从JAVA获取Area存 共 %d 条', result.length));

        }
        return res;
    }

    /**
     * @desc 获取当前的区域及子区域下的所有数据集合
     * @param {Array<any>} list
     * @param {string} AreaID
     * @return {Promise<any>}
     */
    static async getAnyListByAreaID(list: Array<any>, AreaID: string) {
        if (!Array.isArray(list)) {
            AreaExt.LOGGER.error(util.format('list type error %j', list));
            return Promise.reject(ErrorCode.ERROR_NO_PARAM)
        }
        let result = [] as Array<any>;
        let areaList:Array<AreaEx> = await AreaExt.findAreaForParentArea(AreaID);
        let areaIds:Array<string> = areaList.map((area: AreaEx) => area.ID);
        list.forEach((item: any) => {
            let index: number = areaIds.indexOf(item.AreaID);
            if (index !== -1) {
                if (typeof item.JsonUserData !== 'object') {
                    item.JsonUserData = {};
                }
                item.JsonUserData.Area = areaList[index];
                result.push(item)
            }
        });
        return result
    }


    /**
     * @desc 计算子区域下子区域的ID集合
     * @param {string} ID
     * @returns {Array<string>}
     * @create hjj
     * @time 2017-10-24 18:24:51
     */
    static async findAreaForParentAreaIDs(ID: string): Promise<Array<string>> {
        let allAreaList = await AreaExt.findAreaForParentArea(ID);
        return allAreaList.map((item:AreaEx)=>item.ID)
    }

    /**
     * @desc 计算子区域下子区域的Area集合
     * @param {string} ID
     * @returns {Array<string>}
     * @create hjj
     * @time 2017-10-24 18:24:51
     */
    static async findAreaForParentArea(ID: string): Promise<Array<AreaEx>> {
        let allAreaList = await AreaExt.getPosaDPJavaCache();
        return AreaExt.compileAreaLevel(allAreaList.data, ID, []);
    }

    /**
     * @title findAreaForParentArea的递归算法
     * @param {Array<Area>} arr
     * @param {string} id
     * @param {Array<string>} newArr
     * @returns {Array<string>}
     */
    private static compileAreaLevel(arr: Array<AreaEx>, id: string, newArr: Array<AreaEx>) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].ID === id) {
                newArr.push(arr[i])
            }
            if (arr[i].ParentID && arr[i].ParentID === id) {
                AreaExt.compileAreaLevel(arr, arr[i].ID, newArr)
            }
        }
        return newArr;
    }
}