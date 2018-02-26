/**
 * Created by key on 2017/7/4.
 */

export class RetrievalRecordModule{
    retrievalInfoLogList:Array<RetrievalInfoLog>;
    taskId:string;
    totalCount:number;
    retrievalLogList:Array<any>;
}

export class PersonInfo{
    Birth:string;
    CertifyingAuthority:string;
    CreateTime:string;
    FacePicPath:Array<string>;
    Gender:string;
    HomeAddress:string;
    ID:string;
    IDCardNumber:string;
    Name:string;
    Nation:string;
    UpdateTime:string;
}

export class RetrievalInfoLog{
    businessLib:BusinessLib;
    personInfo:PersonInfo;
    retrievalLogList:Array<RetrievalLogList>;
}

export class RetrievalLogList{
    RetrievalLog:Array<RetrievalLog>;
    RetrievalPersonName:string;
}

export class RetrievalLogCom{
    Address:string;
    AreaID:string;
    ID:string;
    ImageUrl:string;
    RetrievalNum:number;
    RetrievalPerson:string;
    RetrievalTime:string;
}

export class RetrievalLog extends RetrievalLogCom{
    CaseNumber:string;
    Latitude:string;
    Longitude:string;
    RequestFrom:string;
    RetrievalReason:string;
}

export class BusinessLib{
    AreaID:string;
    CreateTime:string;
    Creator:string;
    Ext:string;
    ID:string;
    JsonExtData:any;
    JsonUserData:any;
    Name:string;
    ParentID:string;
    PersonCount:number;
    StrJsonUserDataany:any;
}