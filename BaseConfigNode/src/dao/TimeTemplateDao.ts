import {BDaoImpl} from "./core/BDaoImpl";
import {TableMap} from "../model/Table-Map";
import {DaoType} from "./enum/DaoType";
/**
 * Created by dell on 2017/7/29.
 */
export default class TimeTemplateDao extends BDaoImpl{
    DaoName = DaoType.TimeTemplateDao;
    ModelName = TableMap.TimeTemplate;

    constructor(){
        super();
    }
}