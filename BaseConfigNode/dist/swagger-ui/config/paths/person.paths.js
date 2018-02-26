"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PersonPathsConfig = {
    "/person/save": {
        post: {
            tags: [
                "Person"
            ],
            summary: "添加人员",
            description: "添加人员",
            parameters: [{
                    in: "body",
                    name: "body",
                    description: "人员model对象",
                    required: true,
                    schema: {
                        "$ref": "#/definitions/PersonSave"
                    }
                }],
            responses: {
                "200": {
                    "description": "PersonID"
                },
                "default": {
                    "description": "Unexpected error"
                }
            }
        }
    },
    "/person/update": {
        post: {
            tags: ["Person"],
            summary: "修改人员信息",
            description: "修改人员信息",
            parameters: [{
                    in: "body",
                    name: "body",
                    description: "人员对象",
                    required: true,
                    schema: {
                        "$ref": "#/definitions/PersonUpdate"
                    }
                }],
            responses: {
                "200": {
                    "description": "PersonID"
                },
                "default": {
                    "description": "Unexpected error"
                }
            }
        }
    },
    "/person/changeStatusByUserIds": {
        post: {
            tags: ["Person"],
            summary: "修改用户可用状态",
            description: "修改用户可用状态",
            parameters: [{
                    in: 'body',
                    name: 'body',
                    require: true,
                    schema: {
                        $ref: '#/definitions/PersonChangeStatusParams'
                    }
                }],
            responses: {
                "200": {
                    "description": "处理成功"
                },
                "default": {
                    "description": "Unexpected error"
                }
            }
        }
    }
};
exports.default = PersonPathsConfig;
