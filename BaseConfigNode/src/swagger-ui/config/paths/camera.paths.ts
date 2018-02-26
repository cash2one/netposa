/**
 * Created by dell on 2017/5/9.
 */
const CameraPathsConfig = {
    "/camera/findListByPage": {
        get: {
            tags: ["Device"],
            summary: "根据区域树ID查找摄像机列表",
            description: "根据区域树ID查找摄像机列表",
            parameters: [{
                name: "areaId",
                in: 'query',
                description: "行政区域ID",
                required: true,
                type: "string"
            }, {
                name: "sortName",
                in: 'query',
                description: "排序的字段名称",
                required: false,
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
                    "description": "一个CameraList数组"
                },
                "default": {
                    "description": "Unexpected error"
                }
            }
        }
    },
    "/camera/findAllList": {
        get:{
            tags: ["Device"],
            summary: "查询所有的摄像机",
            description: "查询所有的摄像机",
            responses: {
                "200": {
                    "description": "一个CameraList数组"
                },
                "default": {
                    "description": "Unexpected error"
                }
            }
        }
    },
    "/camera/changeAreaId": {
        post: {
            tags: ['Device'],
            summary: "改变摄像机的所属行政区域",
            description: "改变摄像机的所属行政区域",
            parameters: [{
                in: "body",
                name: "body",
                description: "改变的对象",
                required: true,
                schema: {
                    type: "array",
                    items: {
                        "$ref": "#/definitions/CameraChangeAreaIdModel"
                    }
                }
            }],
            responses: {
                "200": {
                    "description": "boolean数组"
                },
                "default": {
                    "description": "Unexpected error"
                }
            }
        }
    }
};
export default CameraPathsConfig;