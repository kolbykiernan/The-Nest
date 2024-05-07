const { Groomsman } = require('../models');

const groomsmanController = {
    // Get all groomsmen
    getAllGroomsmen: async (req, res) => {
        try {
            const groomsmen = await Groomsman.findAll();
            res.status(200).json(groomsmen);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Create a new groomsman
    createGroomsman: async (req, res) => {
        const { firstName, lastName, selectedCategory, plusOneSelected, plusOneFirstName, plusOneLastName, isAlsoInWeddingParty, plusOneValue } = req.body;
        try {
            const newGroomsman = await Groomsman.create({
                firstName,
                lastName,
                selectedCategory,
                plusOneSelected,
                plusOneFirstName,
                plusOneLastName,
                isAlsoInWeddingParty,
                plusOneValue
            });
            res.status(201).json(newGroomsman);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
};

module.exports = groomsmanController;
