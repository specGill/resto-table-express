const TableReserv = require('../../models/table-reserv.model');

module.exports = function() {
    let operations = {
        GET,
        POST,
        PUT,
        DELETE
    }

    async function GET(req, res, next) {
        res.status(200).json(
            await TableReserv.find({})
        )
    }

    async function POST(req, res, next) {
        console.log(`About to create table reservation: ${JSON.stringify(req.body)}`);

        const tableNumber = req.body.tableNumber || 666;

        const newReserv = new TableReserv({
            tableNumber: tableNumber, 
            reservName: req.body.reservName, 
            occupants: req.body.occupants, 
            orders: req.body.orders});

        console.log("new document created");

        try {
            await newReserv.save();
        } catch(err) {
            res.status(400).send();
        }

        res.status(201).send();
    }

    async function PUT(req, res, next) {
        console.log(`About to update table: ${req.query.tableNumber}`);

        try {
            await TableReserv.findOneAndUpdate({ tableNumber: req.query.tableNumber });
        } catch (err) {
            res.status(400).send();
        }

        res.status(200).send();
    }

    async function DELETE(req, res, next) {
        console.log(`About to delete table reserve info of table number: ${req.query.tableNumber}`);

        try {
            await TableReserv.findOneAndRemove({ tableNumber: req.query.tableNumber });
        } catch (err) {
            res.status(400).send();
        }

        res.status(200).send();
    }

    GET.apiDoc = {
        summary: "Fetch table reservations.",
        operationId: "getTableReservs",
        responses: {
            200: {
                description: "list of table orders.",
                schema: {
                    type: "array",
                    items: {
                        $ref: "#/definitions/TableReserv"
                    }
                }
            }
        }
    };

    POST.apiDoc = {
        summary: "Create new table reservation.",
        operationId: "createTableReservs",
        consumes: ["application/json"],
        parameters: [
            {
                in: "body",
                name: "new table reservation",
                schema: {
                    $ref: "#/definitions/TableReserv"
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

    PUT.apiDoc = {
        summary: "Update table reservation",
        operationId: "updateTableReserv",
        parameters: [
            {
                in: "query",
                name: "tableNumber",
                required: true,
                type: "number"
            },
            {
                in: "body",
                name: "table reserv update",
                required: true,
                schema: {
                    $ref: "#/definitions/TableReserv"
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
    };

    DELETE.apiDoc = {
        summary: "Delete table reserve info.",
        operationId: "deleteTableReserv",
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
    
    return operations;
}