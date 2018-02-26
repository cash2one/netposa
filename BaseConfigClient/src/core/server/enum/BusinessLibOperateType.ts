/** create by zxq
 * 人像库操作类型枚举
 * @time: 2017-06-05 19:23:05
 * @params:
 * @return:
 */
export const BusinessLibOperateType:{[key: string]: {value:string, text:string}}  = {

    Search: {value: "Search", text: "查看人员"},
    Update : {value: "Update", text: "人员操作"},
    Export: {value: "Export", text: "导出人员"},


    Name: {value: "Name", text: "姓名脱敏"},

    NamePart: {value: "Name.Part", text: "姓名脱敏:部分"},
    NameNone: {value: "Name.None", text: "姓名脱敏:全部"},

    IdCard: {value: "IdCard", text: "身份证脱敏"},

    IdCardPart: {value: "IdCard.Part", text: "身份证脱敏:部分"},
    IdCardNone: {value: "IdCard.None", text: "身份证脱敏:全部"}
};

