import express from 'express';
import { createEngine } from 'express-react-views';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

import router from './controllers/api.js';

const app = express()

app.set('view engine', 'js')
app.engine('js', createEngine());




app.use(cors())
app.use(express.json())
app.use('/api', router)


app.get('*', (req, res) => {
    res.status(404).send('<h1>404 Page</h1>')
})

app.listen(process.env.PORT)

export default app;