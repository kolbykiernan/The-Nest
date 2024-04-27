import express from 'express';
import WeddingData from '../models/WeddingData.js';

const weddingData = express.Router();


weddingData.post('/', async (req, res) => {

    try {
        const { id, brideFirstName, brideLastName, brideSelection, groomFirstName, groomLastName, groomSelection } = req.body;
        const weddingData = await WeddingData.create({ id, brideFirstName, brideLastName, brideSelection, groomFirstName, groomLastName, groomSelection });

        res.status(201).json(weddingData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


weddingData.get('/', async (req, res) => {
    
    try {
        const weddingData = await WeddingData.findAll();
        res.status(200).json(weddingData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


export default weddingData;