import * as log4js from "log4js";
import * as util from "util";
import {BDaoImpl} from "../../dao/core/BDaoImpl";
import {BDao} from "../../dao/core/BDao";
/**
 * Created by dell on 2017/7/31.
 */
class DaoContext{
    private static LOGGER = log4js.getLogger("DaoContext");
    private daos: {[key:string]:BDao} = {} as {[key:string]: BDao};
    constructor(){
    }

    getDao(className: string){
        if(this.daos[className]){
            return this.daos[className];
        }else{
            DaoContext.LOGGER.error(util.format("DaoContext.getDao error %s is not exist", className));
            return null;
        }
    };

    saveDao(dao: BDaoImpl){
        this.daos[dao.DaoName] = dao;
    }
}

class BeanFactory{
    static context:DaoContext;
    static instance(): DaoContext{
        if(this.context == null){
            this.context = new DaoContext();
        }
        return this.context;
    }
}

export class BeanHelper{

    public static getDao<T>(className: string){
        let context = BeanFactory.instance();
        return context.getDao(className) as T&BDao;
    }

    public static saveDao(dao: BDaoImpl){
        BeanFactory.instance().saveDao(dao);
    }

}