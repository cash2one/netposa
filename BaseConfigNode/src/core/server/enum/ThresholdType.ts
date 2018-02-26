/** create by zxq
 * 报警类型
 * @time: 2017-06-19 20:29:44
 * @params:
 * @return:
 */

interface IThresholdType {
    /**
     * 未知
     */
    Unknow: {value:string, text:string};
    /**
     * 低阈值报警
     */
    Low: {value:string, text:string};
    /**
     * 高阈值报警
     */
    Hight: {value:string, text:string};
    /**
     * 只抓拍不报警
     */
    Capture: {value:string, text:string};
    /**
     * 车牌精确报警
     */
    CarOrMacAlerm: {value:string, text:string};

}

export const ThresholdType:{[key: string]: {value:string, text:string}}& IThresholdType = {
    /**
     * 未知
     */
    Unknow: {value:"Unknow", text:"未知"},
    /**
     * 低阈值报警
     */
    Low: {value:"Low", text:"低阈值报警"},
    /**
     * 高阈值报警
     */
    Hight: {value:"Hight", text:"高阈值报警"},
    /**
     * 只抓拍不报警
     */
    Capture: {value:"Capture", text:"只抓拍不报警"},
    /**
     * 车牌精确报警
     */
    CarOrMacAlerm: {value:"CarOrMacAlerm", text:"车牌和Mac地址报警"},

};

interface IRunPlanType {
    /**
     * 人像布控
     */
    peopleControl: {value:string, text:string};
    /**
     * 车辆布控
     */
    VehicleControl: {value:string, text:string};
    /**
     * MAC布控
     */
    MacControl: {value:string, text:string};
    /**
     * 人像结构化
     */
    peopleStructure: {value:string, text:string};
    /**
     * 车辆结构化
     */
    VehicleStructure: {value:string, text:string};

}

export const RunPlanType:{[key: string]: {value:string, text:string}}& IRunPlanType = {
    /**
     * 未知
     */
    peopleControl: {value:"peopleControl", text:"人像布控"},
    /**
     * 低阈值报警
     */
    VehicleControl: {value:"VehicleControl", text:"车辆布控"},
    /**
     * 高阈值报警
     */
    MacControl: {value:"MacControl", text:"MAC布控"},
    /**
     * 只抓拍不报警
     */
    peopleStructure: {value:"peopleStructure", text:"人像结构化"},
    /**
     * 车牌精确报警
     */
    VehicleStructure: {value:"VehicleStructure", text:"车辆结构化"},

};