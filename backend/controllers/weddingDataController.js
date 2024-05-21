const { WeddingData } = require('../models'); // Adjust the path as necessary to import your WeddingData model

const weddingDataController = {
    // Get all wedding data entries
    getAllWeddingData: async (req, res) => {
        try {
            const weddingData = await WeddingData.findAll();
            res.status(200).json(weddingData);
        } catch (error) {
            console.error('Error fetching wedding data:', error);
            res.status(500).send({ error: 'Failed to fetch wedding data' });
        }
    },

    // Create a new wedding data entry
    createWeddingData: async (req, res) => {
        const { brideFirstName, brideLastName, brideSelection, groomFirstName, groomLastName, groomSelection, userId } = req.body;
        
        if (!userId) {
            return res.status(400).send({ error: 'userId is required' });
        }

        try {
            const newWeddingData = await WeddingData.create({
                brideFirstName,
                brideLastName,
                brideSelection,
                groomFirstName,
                groomLastName,
                groomSelection,
                userId
            });

            console.log('New WeddingData created:', newWeddingData);
            res.status(201).json(newWeddingData);
        } catch (error) {
            console.error('Error creating wedding data:', error);
            res.status(400).send({ error: 'Failed to create wedding data' });
        }
    }
};

module.exports = weddingDataController;
