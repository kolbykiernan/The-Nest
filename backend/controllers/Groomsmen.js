import Groomsman from '../models/Groomsman.js';

const GroomsmanController = {
    // Create new groomsman
    createGroomsman: async (req, res) => {
        try {
            const { firstName, lastName, selectedCategory, plusOneSelected, plusOneFirstName, plusOneLastName, isAlsoInWeddingParty, plusOneValue } = req.body;
            const groomsman = await Groomsman.create({ firstName, lastName, selectedCategory, plusOneSelected, plusOneFirstName, plusOneLastName, isAlsoInWeddingParty, plusOneValue });
            res.status(201).json(groomsman);
        } catch (error) {
            console.error('Error creating groomsman:', error);
            res.status(500).json({ error: error.message });
        }
    },

    // Get all groomsmen
    getAllGroomsmen: async (req, res) => {
        try {
            const groomsmen = await Groomsman.findAll();
            res.status(200).json(groomsmen);
        } catch (error) {
            console.error('Error fetching all groomsmen:', error);
            res.status(500).json({ error: error.message });
        }
    },

    // Edit groomsman
    editGroomsman: async (req, res) => {
        const { id } = req.params;
        const { firstName, lastName, selectedCategory, plusOneSelected, plusOneFirstName, plusOneLastName, isAlsoInWeddingParty, plusOneValue } = req.body;

        try {
            // Check if the groomsman with the given ID exists
            const groomsman = await Groomsman.findByPk(id);
            if (!groomsman) {
                return res.status(404).json({ error: 'Groomsman not found' });
            }

            // Update the groomsman with the provided data
            groomsman.firstName = firstName;
            groomsman.lastName = lastName;
            groomsman.selectedCategory = selectedCategory;
            groomsman.plusOneSelected = plusOneSelected;
            groomsman.plusOneFirstName = plusOneFirstName;
            groomsman.plusOneLastName = plusOneLastName;
            groomsman.isAlsoInWeddingParty = isAlsoInWeddingParty;
            groomsman.plusOneValue = plusOneValue;

            // Save the updated groomsman data
            await groomsman.save();

            res.json(groomsman);
        } catch (error) {
            console.error('Error updating groomsman:', error);
            res.status(500).json({ error: error.message });
        }
    }
};

export default GroomsmanController;
