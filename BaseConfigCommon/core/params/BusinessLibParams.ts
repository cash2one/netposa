import {TableParams} from "./table/TableParams";
import {AreaEx} from "../entity/ex/AreaEx";
import {BusinessLibEx} from "../entity/ex/BusinessLibEx";

export class BusinessLibListParams extends TableParams {
    areaId: string;
    keyword:string;
    startTime:string;
    endTime:string;
}

export class BusinessLibPersonListParams extends TableParams {
  /*  gender:string;
    idCardNumber:string;
    libId:string;
    maxAge:number;
    minAge:number;
    nation:string;*/
    arrGender: Array<string>;
    arrLibId: Array<string>;
    homeAddress:  string;
    idCardNumber:  string;
    maxAge: number;
    minAge: number;
    nation: string;
    personName: string;
}

export interface AreaAndBusinessListResult{
    areaExList:Array<AreaEx>;
    businessLibExList:Array<BusinessLibEx>;
}