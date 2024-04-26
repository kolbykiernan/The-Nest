import express from 'express';
import weddingData from './WeddingData.js'
import bridesmaid from './Bridesmaids.js'
import category from './Categories.js'
import groomsman from './groomsMen.js'
import guest from './Guest.js'
import guestlist from './Guestlist.js'
import authentication from './Authentication.js'
import user from './Users.js'

const api = express.Router();

api.use('/weddingdata', weddingData)
api.use('/bridesmaids', bridesmaid)
api.use('/categories', category)
api.use('/groomsmen', groomsman)
api.use('/guests', guest)
api.use('/guestlist', guestlist)
api.use('/authentication', authentication)
api.use('/users', user)

export default api
