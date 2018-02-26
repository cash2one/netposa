"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = MapPaths;
