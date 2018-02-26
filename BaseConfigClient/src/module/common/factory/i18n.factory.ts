import {app} from "../app/main.app";
/**
 * 简单对国际化进行了一次包装
 */
class I18nFactory{

    static $inject = ["$filter"];

    constructor($filter?: any){
        return $filter('translate')
    }
}
app.service('i18nFactory', I18nFactory);
