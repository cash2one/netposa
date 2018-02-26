"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnitSwaggerConfig = {
    "/unit/findUnitTreeList": {
        get: {
            tags: [
                "Unit"
            ],
            summary: "根据行政区域ID查找行政单位列表",
            description: "根据行政区域ID查找行政单位列表",
            parameters: [{
                    name: "areaId",
                    in: 'query',
                    description: "行政区域ID",
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
    "/unit/findListByParams": {
        get: {
            tags: [
                "Unit"
            ],
            summary: "查找所有行政区域列表树",
            description: "查找所有行政区域列表树 description",
            parameters: [{
                    name: "parentId",
                    in: 'query',
                    description: "行政区域父id",
                    required: true,
                    type: "string"
                }, {
                    name: "unitName",
                    in: 'query',
                    description: "行政单位名称",
                    required: false,
                    type: "string"
                }, {
                    name: "sortName",
                    in: 'query',
                    description: "排序的字段名称",
                    required: true,
                    type: "string"
                }, {
                    name: "isAsc",
                    in: 'query',
                    description: "正序/倒序",
                    required: true,
                    type: "boolean",
                    items: {
                        type: "string",
                        enum: [
                            "desc",
                            "asc"
                        ],
                        default: "desc"
                    }
                }, {
                    name: "currentPage",
                    in: 'query',
                    description: "当前页",
                    required: true,
                    type: "integer"
                }, {
                    name: "pageSize",
                    in: 'query',
                    description: "当前页显示条数",
                    required: true,
                    type: "integer"
                }],
            "responses": {
                "200": {
                    "description": "一个AreaList数组"
                },
                "default": {
                    "description": "Unexpected error"
                }
            }
        }
    },
    "/unit/add": {
        post: {
            tags: [
                "Unit"
            ],
            summary: "添加行政单位",
            description: "添加行政单位",
            parameters: [{
                    in: "body",
                    name: "body",
                    description: "行政单位model对象",
                    required: true,
                    schema: {
                        "$ref": "#/definitions/Unit"
                    }
                }],
            responses: {
                "200": {
                    "description": "行政单位ID"
                },
                "default": {
                    "description": "Unexpected error"
                }
            }
        }
    }
};
exports.default = UnitSwaggerConfig;
