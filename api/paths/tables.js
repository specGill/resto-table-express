const Tables = require('../../models/tables.model');

module.exports = function () {
    let operations = {
        GET,
        POST,
        PUT,
        DELETE
    }

    async function GET(req, res, next) {
        res.status(200).json(
            await Tables.find({})
        )
    }

    async function POST(req, res, next) {
        console.log(`About to create table: ${JSON.stringify(req.body)}`);

        const newTable = new Tables(req.body);

        console.log("new Table document created");

        try {
            await newTable.save();
        } catch (err) {
            res.status(400).send();
        }

        res.status(201).send();
    }

    async function PUT(req, res, next) {
        console.log(`About to update table: ${req.query.tableNumber}`);

        try {
            await Tables.findOneAndUpdate({ tableNumber: req.query.tableNumber });
        } catch (err) {
            res.status(400).send();
        }

        res.status(200).send();
    }

    async function DELETE(req, res, next) {
        console.log(`About to delete table ${req.query.tableNumber}`);

        try {
            await Tables.findOneAndRemove({ tableNumber: req.query.tableNumber });
        } catch (err) {
            res.status(400).send();
        }

        res.status(200).send();
    }

    GET.apiDoc = {
        summary: "Fetch all tables.",
        operationId: "getTables",
        responses: {
            200: {
                description: "list of tables.",
                schema: {
                    type: "array",
                    items: {
                        $ref: "#/definitions/Table"
                    }
                }
            }
        }
    };

    POST.apiDoc = {
        summary: "Create new table.",
        operationId: "createTables",
        consumes: ["application/json"],
        parameters: [
            {
                in: "body",
                name: "new table",
                schema: {
                    $ref: "#/definitions/Table"
                }
            }
        ],
        responses: {
            201: {
                description: "Created"
            },
            400: {
                description: "Bad/malformed JSON request body"
            }
        }
    };

    DELETE.apiDoc = {
        summary: "Delete table.",
        operationId: "deleteTable",
        consumes: ["application/json"],
        parameters: [
            {
                in: "query",
                name: "tableNumber",
                required: true,
                type: "number",
            },
        ],
        responses: {
            200: {
                description: "Delete",
            },
            400: {
                description: "Bad Request"
            }
        },
    };

    PUT.apiDoc = {
        summary: "Update table",
        operationId: "updateTable",
        parameters: [
            {
                in: "query",
                name: "tableNumber",
                required: true,
                type: "number"
            },
            {
                in: "body",
                name: "table update",
                required: true,
                schema: {
                    $ref: "#/definitions/Table"
                }
            }
        ],
        responses: {
            200: {
                description: "Updated ok"
            },
            400: {
                description: "Bad Request"
            }
        }
    }

    return operations;
}
