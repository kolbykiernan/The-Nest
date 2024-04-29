import Guest from '../models/Guest.js';

const GuestController = {
    // Create new guest
    createGuest: async (req, res) => {
        try {
            const { firstName, lastName, selectedCategory, brideGroomOrMutual, guestValue, plusOneSelected, plusOneFirstName, plusOneLastName, plusOneValue } = req.body;
            const guest = await Guest.create({ firstName, lastName, selectedCategory, brideGroomOrMutual, guestValue, plusOneSelected, plusOneFirstName, plusOneLastName, plusOneValue });
            res.status(201).json(guest);
        } catch (error) {
            console.error('Error creating guest:', error);
            res.status(500).json({ error: error.message });
        }
    },

    // Get all guests
    getAllGuests: async (req, res) => {
        try {
            const guests = await Guest.findAll();
            res.status(200).json(guests);
        } catch (error) {
            console.error('Error fetching all guests:', error);
            res.status(500).json({ error: error.message });
        }
    },

    // Edit guest
    editGuest: async (req, res) => {
        const { id } = req.params;
        const { firstName, lastName, selectedCategory, brideGroomOrMutual, guestValue, plusOneSelected, plusOneFirstName, plusOneLastName, plusOneValue } = req.body;

        try {
            // Check if the guest with the specified ID exists
            const existingGuest = await Guest.findByPk(id);
            if (!existingGuest) {
                return res.status(404).json({ error: 'Guest not found' });
            }

            // Update the guest with the provided data
            existingGuest.firstName = firstName;
            existingGuest.lastName = lastName;
            existingGuest.selectedCategory = selectedCategory;
            existingGuest.brideGroomOrMutual = brideGroomOrMutual;
            existingGuest.guestValue = guestValue;
            existingGuest.plusOneSelected = plusOneSelected;
            existingGuest.plusOneFirstName = plusOneFirstName;
            existingGuest.plusOneLastName = plusOneLastName;
            existingGuest.plusOneValue = plusOneValue;

            // Save the updated guest data
            await existingGuest.save();

            res.json(existingGuest);
        } catch (error) {
            console.error('Error updating guest:', error);
            res.status(500).json({ error: error.message });
        }
    }
};

export default GuestController;
