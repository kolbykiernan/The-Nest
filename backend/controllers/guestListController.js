const { Guestlist } = require('../models'); // Adjust the path as necessary to import your Guestlist model

const guestlistController = {
    // Get all entries in the guest list
    getAllGuestlists: async (req, res) => {
        try {
            const guestlists = await Guestlist.findAll();
            res.status(200).json(guestlists);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Create a new entry in the guest list
    createGuestlist: async (req, res) => {
        const { firstName, lastName, selectedCategory, brideGroomOrMutual, guestValue } = req.body;
        try {
            const newGuestlist = await Guestlist.create({
                firstName,
                lastName,
                selectedCategory,
                brideGroomOrMutual,
                guestValue
            });
            res.status(201).json(newGuestlist);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
};

module.exports = guestlistController;
