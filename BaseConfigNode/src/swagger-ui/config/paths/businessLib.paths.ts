/**
 *
 * @time: 2017-05-09 20:10:44
 * @params:
 * @return:
 */
const BusinessLibPathsConfig = {
    "/businessLib/save": {
        post: {
            tags: [
                "BusinessLib"
            ],
            summary: "添加人像库",
            description: "添加人像库",
            parameters: [{
                in: "body",
                name: "body",
                description: "人像库对象 参数",
                required: true,
                schema: {
                    "$ref": "#/definitions/BusinessLibSave"
                }
            }],
            responses: {
                "200": {
                    "description": "人像库ID"
                },
                "default": {
                    "description": "Unexpected error"
                }
            }
        }
    },

    "/businessLib/update": {
        post: {
            tags: [
                "BusinessLib"
            ],
            summary: "更新人像库",
            description: "更新人像库",
            parameters: [{
                in: "body",
                name: "body",
                description: "人像库对象 参数",
                required: true,
                schema: {
                    "$ref": "#/definitions/BusinessLibUpdate"
                }
            }],
            responses: {
                "200": {
                    "description": "更新结果  Data = true 成功修改"
                },
                "default": {
                    "description": "Unexpected error"
                }
            }
        }
    },

    "/businessLib/findById":{
        get: {
            tags: [
                "BusinessLib"
            ],
            summary: "查询单个数据供修改",
            description: "查询单个数据供修改",
            parameters: [{
                name: "id",
                in: 'query',
                description: "输入数据Id",
                required: true,
                type: "string"
            }],
            responses: {
                "200": {
                    "description": "businessLib 详情数据"
                },
                "default": {
                    "description": "Unexpected error"
                }
            }
        }
    },

    "/businessLib/findTreeWithArea":{
        get: {
            tags: ["BusinessLib"],
            summary: "查询人像库和区域综合树",
            description: "查询人像库和区域综合树",
            responses: {
                "200": {
                    "description": "businessLib 详情数据"
                },
                "default": {
                    "description": "Unexpected error"
                }
            }
        }
    },
    "/businessLib/findHasSelfTreeWithArea":{
        get: {
            tags: ["BusinessLib"],
            summary: "查询人像库和区域综合树（人像库有子库 时包含本身）",
            description: "查询人像库和区域综合树（人像库有子库 时包含本身）",
            parameters: [{
                name: "areaId",
                in: 'query',
                description: "输入区域id,不传 默认查全部",
                required: false,
                type: "string"
            }],
            responses: {
                "200": {
                    "description": "区域数组 和 人像库数组 {areaExList:Array<>,businessLib<>}"
                },
                "default": {
                    "description": "Unexpected error"
                }
            }
        }
    },
    "/businessLib/findTree": {
        get: {
            tags: ["BusinessLib"],
            summary: "查询人像库树",
            description: "查询人像库树",
            parameters: [{
                name: "areaId",
                in: "query",
                description: "区域id",
                required: true
            }],
            responses: {
                "200": {
                    "description": "businessLib 详情数据"
                },
                "default": {
                    "description": "Unexpected error"
                }
            }
        }
    }

};
export default BusinessLibPathsConfig;