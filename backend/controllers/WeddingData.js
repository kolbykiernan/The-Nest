import WeddingData from '../models/WeddingData.js';

const WeddingDataController = {
    // Create new wedding data
    createWeddingData: async (req, res) => {
        try {
            const { id, brideFirstName, brideLastName, brideSelection, groomFirstName, groomLastName, groomSelection } = req.body;
            const weddingData = await WeddingData.create({ id, brideFirstName, brideLastName, brideSelection, groomFirstName, groomLastName, groomSelection });
            res.status(201).json(weddingData);
        } catch (error) {
            console.error('Error creating wedding data:', error);
            res.status(500).json({ error: error.message });
        }
    },

    // Get all wedding data
    getAllWeddingData: async (req, res) => {
        try {
            const weddingData = await WeddingData.findAll();
            res.status(200).json(weddingData);
        } catch (error) {
            console.error('Error fetching all wedding data:', error);
            res.status(500).json({ error: error.message });
        }
    }
};

export default WeddingDataController;