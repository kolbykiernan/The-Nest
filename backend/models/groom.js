const mongoose = require('mongoose')

const groomSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    brideGroom: {type: Boolean, required: true, default: 'Groom'},
})

module.exports = mongoose.model('Groom', groomSchema)