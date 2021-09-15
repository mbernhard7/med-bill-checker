const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const billSchema = new Schema({
    name: String,
    description: String,
    img:
        {
            data: Buffer,
            contentType: String
        }
}, {
    timestamps: true,
    collection: 'bills',
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;