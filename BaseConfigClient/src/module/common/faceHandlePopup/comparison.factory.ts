/**
 * Created by tj on 2017/6/29.
 */
import {app} from "../../common/app/main.app";

export interface IComparisonFactory{
    //获取
    getResponse:Function;
    //传递
    sendResponse:Function;
    //清空数据
    clearRsponse:Function;
}

class ComparisonFactory implements IComparisonFactory{

    response:string;

    getResponse(data:any){
        this.response = data;
    }

    sendResponse(){
        return this.response;
    }

    clearRsponse(){
        this.response = null;
    }

}

app
    .service('comparisonFactory', ComparisonFactory);
