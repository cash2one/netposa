"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BusinessLibDefinitions = {
    BusinessLibSave: {
        type: "object",
        required: [
            "model"
        ],
        properties: {
            model: {
                type: "object",
                required: [
                    "Name", "AreaID"
                ],
                properties: {
                    Name: {
                        type: "string",
                        description: "人像库名称",
                    },
                    AreaID: {
                        type: "string",
                        description: "所在区域",
                    },
                    Memo: {
                        type: "string",
                        description: "备注"
                    }
                }
            }
        }
    },
    BusinessLibUpdate: {
        type: "object",
        required: [
            "model"
        ],
        properties: {
            model: {
                type: "object",
                required: [
                    "ID", "Name", "AreaID"
                ],
                properties: {
                    "ID": {
                        type: "string",
                        description: "数据ID",
                    },
                    Name: {
                        type: "string",
                        description: "人像库名称",
                    },
                    AreaID: {
                        type: "string",
                        description: "所在区域",
                    },
                    Memo: {
                        type: "string",
                        description: "备注"
                    }
                }
            }
        }
    },
};
exports.default = BusinessLibDefinitions;
