/**
 *  视频网关类型
 * @time: 2017-05-04 15:34:17
 * @params:
 * @return:
 */
export const VideoServerType:{[key: string]: {value:string, text:string, index:number}} = {
    Unknown:{
        value:"Unknown",
        text:"未知",
        index:null
    },
    PVG:{
        value:"PVG",
        text:"PVG",
        index:2100
    },
    PAU:{
        value:"PAU",
        text:"PAU",
        index:2101
    }
};