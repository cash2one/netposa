/**
 * Created by dell on 2017/7/3.
 */
const MapPaths = {
    "/systempoint/getBaseInfo": {
        get: {
            tags: [
                "Map"
            ],
            summary: "获取图层类型列表",
            description: "获取图层类型列表",
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

export default MapPaths;