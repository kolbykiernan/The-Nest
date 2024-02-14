const mongoose = require('mongoose')

const plusOneSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    memberOfWeddingParty: {type: Boolean, required: true},
    mustHave: {type: Boolean, required: true, default: 'no'},
    addOn: {type: Boolean, required: true},
})

module.exports = mongoose.model('PlusOne', plusOneSchema)