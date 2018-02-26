export class RelationCol {
    static ID: string = 'ID';// varchar(32) NOT NULL COMMENT '主键id',
    static ObjectId: string = 'ObjectId';// varchar(32) DEFAULT NULL COMMENT '主设备（灯杆）id',
    static ObjectType: string = 'ObjectType'; //varchar(32) DEFAULT NULL COMMENT '主设备（灯杆、其他）类型',
    static RelatedObjectId: string = 'RelatedObjectId'; //varchar(32) DEFAULT NULL COMMENT '关联设备id',
    static RelatedObjectType: string = 'RelatedObjectType'; //varchar(32) DEFAULT NULL COMMENT '关联设备类型',
    static Type: string = 'Type'; //varchar(32) DEFAULT NULL COMMENT '类型',
    static UserId: string = 'UserId';// varchar(32) DEFAULT NULL COMMENT '用户id',
    static Description: string = 'Description';// varchar(4000) DEFAULT NULL COMMENT '描述',
    static Ext: string = 'Ext'; //varchar(4000) DEFAULT NULL COMMENT '扩展字段',
	static CameraType: string = 'CameraType'; //varchar(32) DEFAULT NULL COMMENT '相机类型',
}

export class Relation {
    ID: string ;// varchar(32) NOT NULL COMMENT '主键id',
    ObjectId: string ;// varchar(32) DEFAULT NULL COMMENT '主设备（灯杆）id',
    ObjectType: string; //varchar(32) DEFAULT NULL COMMENT '主设备（灯杆、其他）类型',
    RelatedObjectId: string ; //varchar(32) DEFAULT NULL COMMENT '关联设备id',
    RelatedObjectType: string ; //varchar(32) DEFAULT NULL COMMENT '关联设备类型',
    Type: string ; //varchar(32) DEFAULT NULL COMMENT '类型',
    UserId: string ;// varchar(32) DEFAULT NULL COMMENT '用户id',
    Description: string;// varchar(4000) DEFAULT NULL COMMENT '描述',
    Ext: string ; //varchar(4000) DEFAULT NULL COMMENT '扩展字段',
	CameraType: string ; //varchar(32) DEFAULT NULL COMMENT '相机类型',
}