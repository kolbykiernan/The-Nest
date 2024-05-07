const { Guest } = require('../models'); // Adjust the path as necessary to import your Guest model

const guestController = {
    // Get all guests
    getAllGuests: async (req, res) => {
        try {
            const guests = await Guest.findAll();
            res.status(200).json(guests);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Create a new guest
    createGuest: async (req, res) => {
        const { firstName, lastName, selectedCategory, brideGroomOrMutual, guestValue, plusOneSelected, plusOneFirstName, plusOneLastName, plusOneValue } = req.body;
        try {
            const newGuest = await Guest.create({
                firstName,
                lastName,
                selectedCategory,
                brideGroomOrMutual,
                guestValue,
                plusOneSelected,
                plusOneFirstName,
                plusOneLastName,
                plusOneValue
            });
            res.status(201).json(newGuest);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
};

module.exports = guestController;
