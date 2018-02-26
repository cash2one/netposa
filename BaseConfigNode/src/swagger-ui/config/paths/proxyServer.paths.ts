const ProxyServerSwaggerConfig = {
    "/ProxyServer/findListByParams": {
        get: {
            tags: [
                "ProxyServer"
            ],
            summary: "综合查询代理（接入）服务配置列表",
            description: "综合查询代理（接入）服务配置 description",
            // ProxyServerListParams
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
                   /* items: {
                        type: "string",
                        enum: [
                            "desc",
                            "asc"
                        ],
                        default: "desc"
                    }*/
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
                    "description": "一个ProxyServer数组"
                },
                "default": {
                    "description": "Unexpected error"
                }
            }
        }
    },
    /* "/area/add": {
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
     "/area/deleteById":{
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
     }*/
};
export default ProxyServerSwaggerConfig;