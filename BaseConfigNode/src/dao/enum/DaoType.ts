/**
 * Created by dell on 2017/7/31.
 */
export class DaoType {
    static readonly AreaDao = "AreaDao";
    static readonly UnitDao = "UnitDao";

    static readonly VideoServerDao = "VideoServerDao";
    static readonly ProxyServerDao = 'ProxyServerDao';
    static readonly EngineServerDao = 'EngineServerDao';
    static readonly EngineNodeDao = 'EngineNodeDao';
    static readonly IvsServerDao = 'IvsServerDao';
    static readonly PersonDao = 'PersonDao';
    static readonly UserDao = 'UserDao';

    static readonly CameraDao = "CameraDao";
    static readonly SystemPointDao = "SystemPointDao";

    static readonly BusinessLibDao = "BusinessLibDao";

    static readonly RoleDao = "RoleDao";
    static readonly RoleModuleDao = "RoleModuleDao";
    static readonly ModuleDao = "ModuleDao";

    static readonly UserRoleDataDao = "UserRoleDataDao";

    static readonly UserRoleDao = "UserRoleDao";

    static readonly TimeTemplateDao = "TimeTemplateDao";

    static readonly LayerDao = "LayerDao";
    static readonly ParameterDao = "ParameterDao";

    static readonly EventRuleDao = "EventRuleDao";

    static readonly IvsTaskGroupDao = "IvsTaskGroupDao";

    static readonly ExceptionLogDao = "ExceptionLogDao";
    static readonly SystemLogDao = "SystemLogDao";
    static readonly ServerDao = "ServerDao";
    static readonly DeviceStateDao = "DeviceStateDao";
    static readonly ExportExcelDao="ExportExcelDao";

    //统计DAO
    static readonly StatsDao = "StatsDao";
    static readonly CacheDao = "CacheDao";
    //缓存数据获取DAO
    static readonly GlobalKeyDao = "GlobalKeyDao";
    static readonly CollectDao = "CollectDao";

    // 2017.11.26新加的
    static readonly AnalysisDao = "AnalysisDao";
    static readonly OperationsDao = "OperationsDao";
    static readonly ResourceSearchDao = "ResourceSearchDao";
    static readonly ResourceDao = "ResourceDao";
    static readonly TaskConfigDao = "TaskConfigDao";
    static readonly UserLocalDao = "UserLocalDao";

    static readonly DeviceRelationDao = "DeviceRelationDao";
    static readonly RfidDao = "RfidDao";
    static readonly LampDao = "LampDao";
    static readonly RmpGateDao = "RmpGateDao";
    static readonly IntelligentTaskInfoDao = "IntelligentTaskInfoDao";
    static readonly EventRuleActionDao = "EventRuleActionDao";
    static readonly IodDao = "IodDao";
    static readonly EventRuleTriggerDao = "EventRuleTriggerDao";
    static readonly MacTaskDao = "MacTaskDao";
    static readonly IvsTaskDao = "IvsTaskDao";
    static readonly ObjectRelationDao = "ObjectRelationDao";
    static readonly VehicleTaskGroupDao = "VehicleTaskGroupDao";

    // 其他与数据库没有表名关联的dao
    static readonly OtherDao = "OtherDao";
}