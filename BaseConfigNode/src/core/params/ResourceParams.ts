export default class ResourceParams {
    alarm: boolean;
    timeStamp: string;
    beginDate:string;
    endDate:string;
    resourceType?: string;
    functionType?:string;
    subFunctionType?:string;
    type?:string;
    topNum?:string;
    timeType:string;
    moduleNames?:string;
    areaIdArr?: Array<string>;
}
