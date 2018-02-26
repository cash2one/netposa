import { Collect } from "../Collect";
import { SearchAlarmLogResult } from "../../server/AlarmModule";
/**
 * 增加一些业务展示的collect拓展参数
 */
export class CollectEx extends Collect{
    // 当前保存的是报警相关的数据, 若以后有其他数据 请使用 | 隔开并在后面写上其他类型
    JsonExtData: SearchAlarmLogResult;
}