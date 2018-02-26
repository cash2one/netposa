import {baseConfigGroup} from "./config.group";
import {MaintainGroup} from "./maintain.group";
import {IRouterGroup} from "../router";

let CommonGroupArr = [].concat(baseConfigGroup, MaintainGroup) as Array<IRouterGroup>;
let CommonGroup = {} as {[key: string]: IRouterGroup};

function CommonConcat(arr:any){
    for(let i=0;i<arr.length;i++){
        CommonGroup[arr[i].key] = arr[i]
    }
}

CommonConcat(CommonGroupArr);

export {CommonGroup};