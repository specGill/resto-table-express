const mongoose = require('../services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const tablesSchema = new Schema({
    tableNumber: { type: Number, required: true, unique: true },
    capacity: { type: Number, minimum: 2, required: true},
    isOccupied: { type: Boolean, default: false }
});

const Tables = mongoose.model('Table', tablesSchema);

module.exports = Tables;