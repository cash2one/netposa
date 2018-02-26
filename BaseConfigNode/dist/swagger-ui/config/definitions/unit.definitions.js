"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnitDefinitions = {
    Unit: {
        type: "object",
        required: [
            "Code", "Name", "Description", "ParentArea"
        ],
        properties: {
            Code: {
                type: "string"
            },
            Name: {
                type: "string"
            },
            Description: {
                type: "string"
            },
            ParentArea: {
                type: "object",
                required: [
                    "ID"
                ],
                properties: {
                    ID: {
                        type: "string"
                    }
                }
            }
        }
    }
};
exports.default = UnitDefinitions;
