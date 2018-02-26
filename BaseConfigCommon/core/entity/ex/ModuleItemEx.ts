
import {ModuleItem} from "../../server/ModulItemModel";

export class ModuleItemEx extends ModuleItem{
    isOpenChild?:boolean;
    children:Array<ModuleItemEx>;
    OperateItemList:Array<ModuleItem>;
    operateItemList:Array<ModuleItem>;
    checkboxStatus?:number;
}