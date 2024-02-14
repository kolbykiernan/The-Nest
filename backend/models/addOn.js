const mongoose = require('mongoose')

const addOnSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    memberOfWeddingParty: {type: Boolean, required: true},
    mustHave: {type: Boolean, required: true, default: 'no'},
    ageRange: {type: String, required: true},
})

module.exports = mongoose.model('AddOn', addOnSchema)