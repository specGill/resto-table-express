const apiDoc = {
    swagger: "2.0",
    basePath: "/",
    info: {
        title: "Resto Table APP API",
        version: "1.0.0"
    },
    definitions: {
        Table: {
            type: "object", 
            properties: {
                tableNumber: {
                    type: "number"
                },
                capacity: {
                    type: "number",
                    minimum: 2
                },
                isOccupied: {
                    type: "boolean",
                }
            },
            required: ["tableNumber", "capacity"]
        },
        TableReserv: {
            type: "object",
            properties: {
                tableNumber: {
                    type: "number"
                },
                reservName: {
                    type: "string"
                },
                occupants: {
                    type: "number",
                    minimum: 1
                },
                orders: {
                    type: "array",
                    items: {
                        $ref: "#/definitions/OrderItem"
                    }
                }
            },
            required: ["reservName", "occupants", "orders"]
        },
        OrderItem: {
            type: "object",
            properties: {
                itemName: {
                    type: "string"
                },
                quantity: {
                    type: "number",
                    minimum: 1
                }
            },
            required: ["itemName", "quantity"]
        }
    },
    paths: {}
};

module.exports = apiDoc;