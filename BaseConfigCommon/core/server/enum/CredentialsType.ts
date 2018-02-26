/** TODO 缺，后台未提供
 * 证件类型枚举
 * @time: 2017-06-05 11:53:17
 * @params:
 * @return:
 */


interface ICredentialsType{
    Unknow: {value:string, text:string};
    IdCard: {value:string, text:string};
}
export const CredentialsType: ICredentialsType = {

    Unknow: {value: "Unknow", text: "未知"},
    IdCard: {value: "IdCard", text: "身份证"},
};