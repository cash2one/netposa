/**
 * Created by dell on 2017/7/3.
 */
const CheckPaths = {
    "/check/findListByPage": {
        get: {
            tags: [
                "Check"
            ],
            summary: "获取审核列表",
            description: "获取审核列表",
            parameters: [{
                in: "query",
                name: "userId",
                type: "string",
                description: "当前用户id",
                required: true
            },
            {
                in: "query",
                name: "taskType",
                type: "string",
                description: "任务类型"
            },
            {
                in: "query",
                name: "auditStatus",
                type: "string",
                description: "审核状态"
            },
            {
                in: "query",
                name: "timeStart",
                type: "string",
                description: "开始时间"
            },
            {
                in: "query",
                name: "timeEnd",
                type: "string",
                description: "结束时间"
            },
            {
                in: "query",
                name: "currentPage",
                type: "integer",
                format: "int64",
                description: "当前页码",
                required: true
            },
            {
                in: "query",
                name: "pageSize",
                type: "string",
                description: "一页显示条数",
                required: true
            }],
            responses: {
                "200": {
                    "description": "MapBaseInfoModel"
                },
                "default": {
                    "description": "Unexpected error"
                }
            }
        }
    }
};

export default CheckPaths;