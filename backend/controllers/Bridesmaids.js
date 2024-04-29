import Bridesmaid from '../models/Bridesmaid.js';

const BridesmaidController = {
    // Create new bridesmaid
    createBridesmaid: async (req, res) => {
        try {
            const { firstName, lastName, selectedCategory, plusOneSelected, plusOneFirstName, plusOneLastName, isAlsoInWeddingParty, plusOneValue } = req.body;
            const bridesmaid = await Bridesmaid.create({ firstName, lastName, selectedCategory, plusOneSelected, plusOneFirstName, plusOneLastName, isAlsoInWeddingParty, plusOneValue });
            res.status(201).json(bridesmaid);
        } catch (error) {
            console.error('Error creating bridesmaid:', error);
            res.status(500).json({ error: error.message });
        }
    },

    // Get all bridesmaids
    getAllBridesmaids: async (req, res) => {
        try {
            const bridesmaids = await Bridesmaid.findAll();
            res.status(200).json(bridesmaids);
        } catch (error) {
            console.error('Error fetching all bridesmaids:', error);
            res.status(500).json({ error: error.message });
        }
    },

    // Edit bridesmaid
    editBridesmaid: async (req, res) => {
        const { id } = req.params;
        const { firstName, lastName, selectedCategory, plusOneSelected, plusOneFirstName, plusOneLastName, isAlsoInWeddingParty, plusOneValue } = req.body;

        try {
            // Check if the bridesmaid with the given ID exists
            const bridesmaid = await Bridesmaid.findByPk(id);
            if (!bridesmaid) {
                return res.status(404).json({ error: 'Bridesmaid not found' });
            }

            // Update the bridesmaid with the provided data
            bridesmaid.firstName = firstName;
            bridesmaid.lastName = lastName;
            bridesmaid.selectedCategory = selectedCategory;
            bridesmaid.plusOneSelected = plusOneSelected;
            bridesmaid.plusOneFirstName = plusOneFirstName;
            bridesmaid.plusOneLastName = plusOneLastName;
            bridesmaid.isAlsoInWeddingParty = isAlsoInWeddingParty;
            bridesmaid.plusOneValue = plusOneValue;

            // Save the updated bridesmaid data
            await bridesmaid.save();

            res.json(bridesmaid);
        } catch (error) {
            console.error('Error updating bridesmaid:', error);
            res.status(500).json({ error: error.message });
        }
    }
};

export default BridesmaidController;
