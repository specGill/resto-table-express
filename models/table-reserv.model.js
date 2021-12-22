const mongoose = require('../services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const tableReservSchema = new Schema({
    tableNumber: { type: Number, required: true, unique: true },
    reservName: { type: String, required: true },
    occupants:{ type: Number, required: true, min: 1 },
    orders: [{ itemName: {type: String, required: true }, quantity: { type: Number, min: 1 , required: true } }],
    time: { type: Date, default: Date.now, required: true }
})

const TableReserv = mongoose.model('TableReserv', tableReservSchema);

module.exports = TableReserv;