const mongoose = require('mongoose')

const friendsSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    origin: {type: String, required: true},
    brideGroom: {type: Boolean, required: true},
    ageRange: {type: String, required: true},
    mustHave: {type: String, required: true, default: 'no'},
    plusOne: {type: Boolean, required: true},
    addOn: {type: String, required: true},
})

module.exports = mongoose.model('Friends', friendsSchema)