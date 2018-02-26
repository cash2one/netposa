"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TaskConfigPathsConfig = {
    "/taskconfig/getTaskIdsByUserId": {
        post: {
            tags: [
                "TaskConfig"
            ],
            summary: "通过userId获取报警任务ids",
            description: "通过userId获取报警任务ids",
            parameters: [{
                    in: "query",
                    name: "userId",
                    description: "用户id",
                    required: true,
                    type: "string"
                }],
            responses: {
                "200": {
                    "description": "任务id"
                },
                "default": {
                    "description": "Unexpected error"
                }
            }
        }
    }
};
exports.default = TaskConfigPathsConfig;
