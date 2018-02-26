/** create by key
 * 人脸检索 人员检索model
 * @time: 2017-06-16 10:42:04
 */

export class SearchFaceResponseSimModel{
    Result:Array<SearchFaceImgSimilarModel>;
    TaskId:string;
    TotalCount:number;
}

export class SearchFaceResponseLibModel{
    message:string;
    status:string;
    OrderResult:Array<SearchFaceLib>;
    TaskId:string;
    TotalCount:number;
}

//按库排序model
export class SearchFaceLib{
    BusinessLib:BusinessLib;
    FaceList:Array<SearchFaceImgSimilarModel>;
    RecordCount:number;
}

//按相似度model
export class SearchFaceSimilarModel{
    LibName:string;
    PersonInfo:PersonInfo;
    FaceList?:Array<SearchFaceImgSimilarModel>;
}

export class SearchFaceImgSimilarModel extends SearchFaceSimilarModel{
    LibId:string;
    Score:number;
    PersonMemo:string;
}

export class PersonInfo{
    BeginDate:string;
    EndDate:string;
    CreateTime:string;
    FacePicPath:Array<string>;
    Gender:string;
    ID:string;
    IDCardNumber:string;
    LibId:string;
    Name:string;
    UpdateTime:string;
    Birth:string;
    HomeAddress:string;
    Nation:string;
    CertifyingAuthority:string;
}

//有图检索库model
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
    StrJsonUserData:any;
}