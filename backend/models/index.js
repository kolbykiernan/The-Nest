const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})

module.exports.Bride = require('./bride')
module.exports.Groom = require('./groom')
module.exports.BridesMaid = require('./bridesMaids')
module.exports.GroomsMen = require('./groomsMen')
module.exports.Family = require('./family')
module.exports.Friends = require('./Friends')
module.exports.PlusOne = require('./plusOne')
module.exports.AddOn = require('./addOn')