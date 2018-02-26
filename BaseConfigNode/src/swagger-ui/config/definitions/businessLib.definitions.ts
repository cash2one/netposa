/**
 * Created by dell on 2017/5/8.
 */
const BusinessLibDefinitions = {
    BusinessLibSave: {
        type: "object",
        required: [
            "model"
        ],
        properties: {
            model:{
                type: "object",
                required: [
                   "Name","AreaID"
                ],
                properties:{
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
            model:{
                type: "object",
                required: [
                    "ID","Name","AreaID"
                ],
                properties:{
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
    /*AreaUpdate: {
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
    }*/
};

export default BusinessLibDefinitions;