import {MaintainGroupEnum} from "../enum/RouteGroupEnum";
import {IRouterGroup} from "../router";

const StatisticalAnalysisGroup = {
    key: MaintainGroupEnum.StatisticsOverview,
    name: "FDS_02_02_10",
    isGroup: true
};

const EquipmentStatusGroup = {
    key: MaintainGroupEnum.EquipmentStatus,
    name: "FDS_02_02_16",
    isGroup: true
};


const UserStatusGroup = {
    key: MaintainGroupEnum.UserStatus,
    name: "FDS_02_02_17",
    isGroup: true
};

const LogManagementGroup = {
    key: MaintainGroupEnum.LogManagement,
    name: "FDS_02_02_18",
    isGroup: true
};

let MaintainGroup:Array<IRouterGroup> = [StatisticalAnalysisGroup,EquipmentStatusGroup,UserStatusGroup,LogManagementGroup];

export {MaintainGroup};