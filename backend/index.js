// Backend index.js

import express from 'express';
import path from 'path';
import { createEngine } from 'express-react-views';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
dotenv.config();

import router from './controllers/api.js';

const app = express();

app.set('view engine', 'js');
app.engine('js', createEngine());

app.use(cors());
app.use(express.json());
app.use('/api', router);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'build')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

export default app;
