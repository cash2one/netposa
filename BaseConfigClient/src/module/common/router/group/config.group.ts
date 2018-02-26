import {GroupEnum} from "../enum/RouteGroupEnum";
import {IRouterGroup} from "../router";
/**
 * Created by dell on 2017/4/19.
 */

const BaseConfigGroup = {
    key: GroupEnum.BaseConfig,
    name: "DP_CONFIG_COMMON_71",
    isGroup: true
};

const ResourceGroup = {
    key: GroupEnum.Resource,
    name: "FDS_01_00_01",
    isGroup: true
};


const ResourceConfigGroup = {
    key: GroupEnum.ResourceConfig,
    name: "DP_CONFIG_COMMON_74",
    isGroup: true
};

const ResourceRetrievalConfigGroup = {
    key: GroupEnum.ResourceRetrievalConfig,
    name: "FDS_01_18",
    isGroup: true
};

const BusinessConfigGroup = {
    key: GroupEnum.BusinessConfig,
    name: "DP_CONFIG_COMMON_75",
    isGroup: true
};

const DeviceConfigGroup = {
    key: GroupEnum.DeviceConfig,
    name: "DP_CONFIG_COMMON_73",
    isGroup: true
};

const SystemConfigGroup = {
    key: GroupEnum.SystemConfig,
    name: "DP_CONFIG_COMMON_76",
    isGroup: true
};
const ServiceConfigGroup = {
    key: GroupEnum.ServiceConfig,
    name: "DP_CONFIG_COMMON_72",
    isGroup: true
};

const baseConfigGroup:Array<IRouterGroup> = [BaseConfigGroup,ResourceGroup,ResourceConfigGroup,ResourceRetrievalConfigGroup,BusinessConfigGroup,DeviceConfigGroup,SystemConfigGroup,ServiceConfigGroup];

export {baseConfigGroup};