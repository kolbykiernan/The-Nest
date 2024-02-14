import express from 'express';
import { createEngine } from 'express-react-views';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

const app = express()

app.set('view engine', 'js')
app.engine('js', createEngine());


import { router as questionnaireRouter } from './controllers/questionnaire'

app.use(cors())
app.use(express.json())
app.use('/questionnaire', questionnaireRouter)

app.get('/', (req, res) => {
    res.render('home')
})

app.get('*', (req, res) => {
    res.status(404).send('<h1>404 Page</h1>')
})

app.listen(process.env.PORT)

export default app;