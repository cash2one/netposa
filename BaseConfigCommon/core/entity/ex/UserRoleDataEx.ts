
import {UserRoleData} from "../UserRoleData";
export class UserRoleDataEx extends UserRoleData{
    operateList:Array<string>;
    ParentID:string;
    operateForFaceLib:Array<OperateForFaceLibEnum>
}

export class OperateForFaceLibEnum{
    text:string;
    value:string;
    IsEnabled:boolean;
    IsSlide?:boolean;
	SlideIndex?:number;
	ParentID:string;
    SlideList?:Array<OperateForFaceLibEnum>
}