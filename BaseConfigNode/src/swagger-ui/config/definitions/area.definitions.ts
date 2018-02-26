/**
 * Created by dell on 2017/5/8.
 */
const AreaDefinitions = {
    AreaSave: {
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
    },
    AreaUpdate: {
        type: "object",
        required: [
            "ID", "Code", "Name", "ParentArea"
        ],
        properties: {
            ID: {
                type: "string"
            },
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

export default AreaDefinitions;