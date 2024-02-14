const mongoose = require('mongoose')

const groomsMenSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    origin: {type: String, required: true},
    bestMan: {type: Boolean, required: true},
    plusOne: {type: Boolean, required: true},
})

module.exports = mongoose.model('Groomsmen', groomsMenSchema)