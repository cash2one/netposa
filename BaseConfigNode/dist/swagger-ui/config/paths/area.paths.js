"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AreaSwaggerConfig = {
    "/area/findAreaListTree": {
        get: {
            tags: [
                "Area"
            ],
            summary: "查找所有行政区域列表树",
            description: "查找所有行政区域列表树 description",
            parameters: [{
                    name: "keyword",
                    in: 'query',
                    description: "用户输入的行政区域编号或名字",
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
    "/area/add": {
        post: {
            tags: [
                "Area"
            ],
            summary: "添加行政区域",
            description: "添加行政区域",
            parameters: [{
                    in: "body",
                    name: "body",
                    description: "行政区域model对象",
                    required: true,
                    schema: {
                        "$ref": "#/definitions/AreaSave"
                    }
                }],
            responses: {
                "200": {
                    "description": "行政区域ID"
                },
                "default": {
                    "description": "Unexpected error"
                }
            }
        }
    },
    "/area/update": {
        post: {
            tags: [
                "Area"
            ],
            summary: "修改行政区域",
            description: "修改行政区域",
            parameters: [{
                    in: "body",
                    name: "body",
                    description: "行政区域model对象",
                    required: true,
                    schema: {
                        "$ref": "#/definitions/AreaUpdate"
                    }
                }],
            responses: {
                "200": {
                    "description": "行政区域ID"
                },
                "default": {
                    "description": "Unexpected error"
                }
            }
        }
    },
    "/area/deleteById": {
        post: {
            tags: ["Area"],
            summary: "通过区域ID删除行政区域",
            description: "通过区域ID删除行政区域",
            parameters: [{
                    in: "formData",
                    type: "string",
                    name: "id",
                    description: "行政区域ID",
                    required: true
                }],
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
exports.default = AreaSwaggerConfig;
