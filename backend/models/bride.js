const mongoose = require('mongoose')

const brideSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    brideGroom: {type: Boolean, required: true, default: 'Bride'},
})

module.exports = mongoose.model('Bride', brideSchema)