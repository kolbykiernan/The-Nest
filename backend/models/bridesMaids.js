const mongoose = require('mongoose')

const brideMaidsSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    origin: {type: String, required: true},
    maidOfHonor: {type: Boolean, required: true},
    plusOne: {type: Boolean, required: true},
})

module.exports = mongoose.model('Bridesmaids', brideMaidsSchema)