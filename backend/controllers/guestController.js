const sortByField = (array, field, order = 'asc') => {
    return array.sort((a, b) => {
      if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  };
  
  const { Guest } = require('../models'); // Adjust the path as necessary to import your Guest model
  
  const guestController = {
      // Get all guests
      getAllGuests: async (req, res) => {
          try {
              const guests = await Guest.findAll();
              const sortedGuests = sortByField(guests, 'id');
              res.status(200).json(sortedGuests);
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
  
              // Fetch the newly created guest and all guests in order
              const guests = await Guest.findAll();
              const sortedGuests = sortByField(guests, 'id');
  
              res.status(201).json(sortedGuests);
          } catch (error) {
              res.status(400).send(error.message);
          }
      }
  };
  
  module.exports = guestController;
  