/**
 * Created by dell on 2017/8/29.
 */

export function getNationTypeForMap():{[key:string]:{text: string, value: string, parentCode: string}}{
    let result = {} as {[key:string]:{text: string, value: string, parentCode: string}};
    NationType.forEach((item:{text: string, value: string, parentCode: string})=>{
        result[item.value] = item;
    });
    return result;
}
export const NationType:Array<{text: string, value: string, parentCode: string}> = [
    {text: "未知", value: "00", parentCode: "000001"},
    {text:"汉族",value:"1",parentCode:"000001"},
    {text:"土族",value:"30",parentCode:"000001"},
    {text:"蒙古族",value:"2",parentCode:"000001"},
    {text:"达斡尔族",value:"31",parentCode:"000001"},
    {text:"回族",value:"3",parentCode:"000001"},
    {text:"仫佬族",value:"32",parentCode:"000001"},
    {text:"藏族",value:"4",parentCode:"000001"},
    {text:"羌族",value:"33",parentCode:"000001"},
    {text:"维吾尔族",value:"5",parentCode:"000001"},
    {text:"布朗族",value:"34",parentCode:"000001"},
    {text:"苗族",value:"6",parentCode:"000001"},
    {text:"撒拉族",value:"35",parentCode:"000001"},
    {text:"彝族",value:"7",parentCode:"000001"},
    {text:"毛南族",value:"36",parentCode:"000001"},
    {text:"壮族",value:"8",parentCode:"000001"},
    {text:"仡佬族",value:"37",parentCode:"000001"},
    {text:"布依族",value:"9",parentCode:"000001"},
    {text:"锡伯族",value:"38",parentCode:"000001"},
    {text:"朝鲜族",value:"10",parentCode:"000001"},
    {text:"阿昌族",value:"39",parentCode:"000001"},
    {text:"满族",value:"11",parentCode:"000001"},
    {text:"普米族",value:"40",parentCode:"000001"},
    {text:"侗族",value:"12",parentCode:"000001"},
    {text:"塔吉克族",value:"41",parentCode:"000001"},
    {text:"瑶族",value:"13",parentCode:"000001"},
    {text:"怒族",value:"42",parentCode:"000001"},
    {text:"白族",value:"14",parentCode:"000001"},
    {text:"乌孜别克族",value:"43",parentCode:"000001"},
    {text:"土家族",value:"15",parentCode:"000001"},
    {text:"俄罗斯族",value:"44",parentCode:"000001"},
    {text:"哈尼族",value:"16",parentCode:"000001"},
    {text:"鄂温克族",value:"45",parentCode:"000001"},
    {text:"哈萨克族",value:"17",parentCode:"000001"},
    {text:"德昂族",value:"46",parentCode:"000001"},
    {text:"傣族",value:"18",parentCode:"000001"},
    {text:"保安族",value:"47",parentCode:"000001"},
    {text:"黎族",value:"19",parentCode:"000001"},
    {text:"裕固族",value:"48",parentCode:"000001"},
    {text:"傈僳族",value:"20",parentCode:"000001"},
    {text:"京族",value:"49",parentCode:"000001"},
    {text:"佤族",value:"21",parentCode:"000001"},
    {text:"塔塔尔族",value:"50",parentCode:"000001"},
    {text:"畲族",value:"22",parentCode:"000001"},
    {text:"独龙族",value:"51",parentCode:"000001"},
    {text:"高山族",value:"23",parentCode:"000001"},
    {text:"鄂伦春族",value:"52",parentCode:"000001"},
    {text:"拉祜族",value:"24",parentCode:"000001"},
    {text:"赫哲族",value:"53",parentCode:"000001"},
    {text:"水族",value:"25",parentCode:"000001"},
    {text:"门巴族",value:"54",parentCode:"000001"},
    {text:"东乡族",value:"26",parentCode:"000001"},
    {text:"珞巴族",value:"55",parentCode:"000001"},
    {text:"纳西族",value:"27",parentCode:"000001"},
    {text:"基诺族",value:"56",parentCode:"000001"},
    {text:"景颇族",value:"28",parentCode:"000001"},
    {text:"柯尔克孜族",value:"29",parentCode:"000001"}
];