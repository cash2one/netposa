"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RolePaths = {
    "/role/getAllConfig": {
        get: {
            tags: ["Role"],
            summary: "获取所有可配置的项",
            description: "获取所有可配置的项",
            responses: {
                "200": {
                    "description": "一个AreaList数组"
                },
                "default": {
                    "description": "Unexpected error"
                }
            }
        }
    },
    "/role/list": {
        get: {
            tags: ["Role"],
            summary: "获取权限列表",
            description: "获取权限列表",
            parameters: [{
                    name: "keyword",
                    in: "query",
                    description: "用户输入的过滤信息",
                    required: false,
                    type: "string"
                }],
            responses: {
                "200": {
                    "description": "一个AreaList数组"
                },
                "default": {
                    "description": "Unexpected error"
                }
            }
        }
    },
    "/role/detail": {
        get: {
            tags: ["Role"],
            summary: "获取权限详情",
            description: "获取权限详情",
            parameters: [{
                    name: "roleId",
                    in: "query",
                    description: "权限id",
                    required: true,
                    type: "string"
                }],
            responses: {
                "200": {
                    "description": "一个AreaList数组"
                },
                "default": {
                    "description": "Unexpected error"
                }
            }
        }
    },
    "/role/save": {
        post: {
            tags: ['Role'],
            summary: "保存权限",
            description: "保存权限",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "权限对象",
                    required: true,
                    schema: {
                        "$ref": "#/definitions/RoleDetailResult"
                    }
                }
            ],
            responses: {
                "200": {
                    "description": "true/false"
                },
                "default": {
                    "description": "Unexpected error"
                }
            }
        }
    },
    "/role/update": {
        post: {
            tags: ['Role'],
            summary: "修改权限",
            description: "修改权限",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "权限对象",
                    required: true,
                    schema: {
                        "$ref": "#/definitions/RoleDetailResult"
                    }
                }
            ],
            responses: {
                "200": {
                    "description": "true/false"
                },
                "default": {
                    "description": "Unexpected error"
                }
            }
        }
    },
    "/role/delete": {
        post: {
            tags: ['Role'],
            summary: "移除权限",
            description: "移除权限",
            parameters: [
                {
                    in: "formData",
                    name: "id",
                    required: true,
                    type: "string",
                    description: "移除权限对象"
                }
            ],
            responses: {
                "200": {
                    "description": "true/false"
                },
                "default": {
                    "description": "Unexpected error"
                }
            }
        }
    }
};
exports.default = RolePaths;
