/** create by zxq
 *  人员辅助信息
 * @time: 2017-07-15 10:43:15
 * @params:
 * @return:
 */

export interface IPersonAssist {
    /*  ID: string;*/
    /* LibID: string;*/
    CredentialsType: string;
    Degree: string;
    HomePlace: string;
    HouseHoldReg: string;
    Identity: string;
    IsHasFeature: string;
    Memo: string;
    MilitarService: boolean;
    Mobile: string;
    Nationality: string;
    OldName: string;
    Stature: number;
}
export class PersonAssist implements IPersonAssist{
    ID: string;
    LibID: string;
    CredentialsType: string;
    Degree: string;
    HomePlace: string;
    HouseHoldReg: string;
    Identity: string;
    IsHasFeature: string;
    Memo: string;
    MilitarService: boolean;
    Mobile: string;
    Nationality: string;
    OldName: string;
    Stature: number;
}