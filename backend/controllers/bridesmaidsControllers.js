const { Bridesmaid } = require('../models');

const bridesmaidsController = {
    // Get all bridesmaids
    getAllBridesmaids: async (req, res) => {
        try {
            const bridesmaids = await Bridesmaid.findAll();
            res.status(200).json(bridesmaids);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Create a new bridesmaid
    createBridesmaid: async (req, res) => {
        const { firstName, lastName, selectedCategory, plusOneSelected, plusOneFirstName, plusOneLastName, isAlsoInWeddingParty, plusOneValue } = req.body;
        try {
            const newBridesmaid = await Bridesmaid.create({
                firstName,
                lastName,
                selectedCategory,
                plusOneSelected,
                plusOneFirstName,
                plusOneLastName,
                isAlsoInWeddingParty,
                plusOneValue
            });
            res.status(201).json(newBridesmaid);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = bridesmaidsController;
