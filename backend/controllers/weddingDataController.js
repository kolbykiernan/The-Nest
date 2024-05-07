const { WeddingData } = require('../models'); // Adjust the path as necessary to import your WeddingData model

const weddingDataController = {
    // Get all wedding data entries
    getAllWeddingData: async (req, res) => {
        try {
            const weddingData = await WeddingData.findAll();
            res.status(200).json(weddingData);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Create a new wedding data entry
    createWeddingData: async (req, res) => {
        const { brideFirstName, brideLastName, brideSelection, groomFirstName, groomLastName, groomSelection } = req.body;
        try {
            const newWeddingData = await WeddingData.create({
                brideFirstName,
                brideLastName,
                brideSelection,
                groomFirstName,
                groomLastName,
                groomSelection
            });
            res.status(201).json(newWeddingData);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
};

module.exports = weddingDataController;
