"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProxyServerSwaggerConfig = {
    "/ProxyServer/findListByParams": {
        get: {
            tags: [
                "ProxyServer"
            ],
            summary: "综合查询代理（接入）服务配置列表",
            description: "综合查询代理（接入）服务配置 description",
            parameters: [
                {
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
                }
            ],
            "responses": {
                "200": {
                    "description": "一个ProxyServer数组"
                },
                "default": {
                    "description": "Unexpected error"
                }
            }
        }
    },
};
exports.default = ProxyServerSwaggerConfig;
