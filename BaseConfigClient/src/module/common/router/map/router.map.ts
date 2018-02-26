import {TotalMap} from "./total.map";
import {LogMap} from "./log.map";
import {BaseConfigMap} from "./baseconfig.map";
import {MainTainMap} from "./maintain.map";
import {TechnologyStackMap} from "./technology.stack.map";
import {ResourceMap} from './resource.map'
import {ResourceRetrievalMap} from './resourceRetrieval.map'
import {DynamicControlMap} from "./dynamicControl.map";
import {IntelligentRetrievalMap} from "./intelligentRetrieval.map";
import {ToolOptionMap} from "./toolOption.map";
import {IntelligentAnalysisMap} from "./IntelligentAnalysis.map";

let DefaultRouteConfig = [].concat(
    ResourceMap, ResourceRetrievalMap, IntelligentAnalysisMap, LogMap, TotalMap, DynamicControlMap, MainTainMap,
    IntelligentRetrievalMap, BaseConfigMap,ToolOptionMap,TechnologyStackMap);
export {DefaultRouteConfig};

// let DefaultRouteConfig = [].concat(
//     BaseConfigMap, ResourceMap, ResourceRetrievalMap, LogMap, TotalMap, MainTainMap,DynamicControlMap,
//     IntelligentRetrievalMap,IntelligentAnalysisMap,TechnologyStackMap,ToolOptionMap,MyCollectMap,MyCheckMap,MyReportMap);
// export {DefaultRouteConfig};