"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PersonDefinitions = {
    UserEx: {
        type: "object",
        properties: {
            roleId: {
                type: "string"
            },
            ID: {
                type: "string"
            },
            StartTimeValid: {
                type: "string"
            },
            EndTimeValid: {
                type: "string"
            },
            IsDisable: {
                type: "boolean"
            },
            PersonID: {
                type: "string"
            },
            Pwd: {
                type: "string"
            },
            Uid: {
                type: "string"
            },
            UserLevel: {
                type: "string"
            },
            UserType: {
                type: "string"
            }
        }
    },
    PersonSave: {
        type: "object",
        required: [
            "model"
        ],
        properties: {
            ID: {
                type: "string"
            },
            Name: {
                type: "string"
            },
            AreaID: {
                type: "string"
            },
            UnitID: {
                type: "string"
            },
            MobTel: {
                type: "string",
                description: "手机号码"
            },
            TelePhone: {
                type: "string",
                description: "电话号码"
            },
            CardID: {
                type: "string",
                description: "身份证"
            },
            CallNo: {
                type: "string",
                description: "呼叫号码"
            },
            PoliceID: {
                type: "string",
                description: "警号"
            },
            PoliceType: {
                type: "string",
                description: "警种"
            },
            Position: {
                type: "string",
                description: "联系地址"
            },
            PhotoPath: {
                type: "string",
                description: "人员照片路径"
            },
            EMail: {
                type: "string",
                description: "电子邮件"
            },
            Description: {
                type: "string",
                description: "描述"
            },
            UserModel: {
                "$ref": "#/definitions/UserEx"
            }
        }
    },
    PersonUpdate: {
        type: "object",
        required: [
            "model"
        ],
        properties: {
            ID: {
                type: "string"
            },
            Name: {
                type: "string"
            },
            AreaID: {
                type: "string"
            },
            UnitID: {
                type: "string"
            },
            MobTel: {
                type: "string",
                description: "手机号码"
            },
            TelePhone: {
                type: "string",
                description: "电话号码"
            },
            CardID: {
                type: "string",
                description: "身份证"
            },
            CallNo: {
                type: "string",
                description: "呼叫号码"
            },
            PoliceID: {
                type: "string",
                description: "警号"
            },
            PoliceType: {
                type: "string",
                description: "警种"
            },
            Position: {
                type: "string",
                description: "联系地址"
            },
            PhotoPath: {
                type: "string",
                description: "人员照片路径"
            },
            EMail: {
                type: "string",
                description: "电子邮件"
            },
            Description: {
                type: "string",
                description: "描述"
            },
            UserModel: {
                "$ref": "#/definitions/UserEx"
            }
        }
    },
    PersonChangeStatusParams: {
        type: "object",
        required: [
            "model"
        ],
        properties: {
            userIds: {
                type: "string",
                description: "用户id, 多个用逗号隔开"
            },
            status: {
                type: "boolean",
                description: "用户状态标志, true 启用 false 禁用"
            }
        }
    }
};
exports.default = PersonDefinitions;
