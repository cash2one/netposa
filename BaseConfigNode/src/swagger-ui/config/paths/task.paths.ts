/**
 *
 * @time: 2017-05-09 20:10:44
 * @params:
 * @return:
 */
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
export default TaskConfigPathsConfig;