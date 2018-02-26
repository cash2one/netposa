/**
 * Created by dell on 2017/5/15.
 */
export const RoleDefinitions = {
    RoleDetailResult: {
        type: "object",
        properties: {
            role: {   type: "object",
                required: [
                    "ID", "Name", "Description"
                ],
                properties: {
                    ID: {
                        type: "string"
                    },
                    Name: {
                        type: "string"
                    },
                    Disable: {
                        type: "boolean"
                    },
                    Description: {
                        type: "string"
                    }
                }},
            funcModuleList: {
                type: "array",
                items: {
                    type: "string"
                }
            }
        }
    },
    Role: {
        type: "object",
        required: [
            "ID", "Name", "Description"
        ],
        properties: {
            ID: {
                type: "string"
            },
            Name: {
                type: "string"
            },
            Disable: {
                type: "boolean"
            },
            Description: {
                type: "string"
            }
        }
    },
};

export default RoleDefinitions;