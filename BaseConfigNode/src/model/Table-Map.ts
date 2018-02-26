/**
 * Created by dell on 2017/4/8.
 */
export class TableMap{
    static Area = "Area";
    static Rfid = "RfidCollect";
    static Lamp = "LampPost";
    static Collect = "Collect";

    static Unit = "Unit";
    static Iod = "IodServer";
    static VideoServer = "VideoServer";
    static ProxyServer = 'ProxyServer';
    static EngineServer = "EngineServer";
    static EngineNode = "EngineNode";
    static IvsServer = 'IvsServer';
    static Person = 'Person';
    static User = 'User';

    static Camera = "Camera";
    static RmpGate = "RmpGate";
    static SystemPoint = "SystemPoint";
    static Wifi = "Wifi";

    static ElectronicFence = "ElectronicFence";

    static BusinessLib = "BusinessLib";

    static Role = "Role";
    static RoleModule = "RoleModule";
    static Module = "Module";

    static UserRoleData = "UserRoleData";

    static UserRole = "UserRole";

    static TimeTemplate = "TimeTemplate";

    static Layer = "Layer";
    static Parameter = "Parameter";
    static MacTask = "RfidTask";
    static IvsTaskGroup = "IvsTaskGroup";
    static IvsTask = "IvsTask";
    static DeviceRelation = "DeviceRelation";
    
    static ObjectRelation = "ObjectRelation";
    static VehicleTaskGroup = 'VehicleTaskGroup';
    static IntelligentTaskInfo = 'IntelligentTaskInfo';
    static EventRule = 'EventRule';
    static EventRuleAction = 'EventRuleAction';
    static EventRuleTrigger = 'EventRuleTrigger';

    // 没有实际对应数据库的table名
    static Analysis = "Analysis";
    static Operations = "Operations";
    static ResourceSearch = "ResourceSearch";
    static Resource = "Resource";
    static TaskConfig = "TaskConfig";
    static UserLocal = "UserLocal";
    static SystemLog = "SystemLog";
    static MapSearchDao = "MapSearchDao";
    // 与数据库表名没有直接关联的dao
    static Other = "Other";

    static ExceptionLog = 'ExceptionLog'
}