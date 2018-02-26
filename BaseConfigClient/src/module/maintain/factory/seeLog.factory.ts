/**
 * Created by tj on 2017/6/29.
 */
import {app} from "../../common/app/main.app";

export interface ISeeLogFactory{
    //获取
    getUserName:Function;
    //传递
    sendUserName:Function;
}

class SeeLogFactory implements ISeeLogFactory{

    userName:string;

    getUserName(data:string){
        this.userName = data;
    }

    sendUserName(){
        return this.userName;
    }
}

app
    .service('seeLogFactory', SeeLogFactory);
