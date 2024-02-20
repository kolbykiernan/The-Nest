const mongoose = require('mongoose')

const basicQuestionsSchema = new mongoose.Schema({
    weddingDate: {type: Date, required: true, default: Date.now},
    lastName: {type: String, required: true},
    origin: {type: String, required: true},
    maidOfHonor: {type: Boolean, required: true},
    plusOne: {type: Boolean, required: true},
})

module.exports = mongoose.model('BasicQuestions', basicQuestionsSchema)