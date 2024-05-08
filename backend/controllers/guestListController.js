const sortByField = (array, field, order = 'asc') => {
    return array.sort((a, b) => {
      if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  };
  
  const { Guestlist } = require('../models'); // Adjust the path as necessary to import your Guestlist model
  
  const guestlistController = {
      // Get all entries in the guest list
      getAllGuestlists: async (req, res) => {
          try {
              const guestlists = await Guestlist.findAll();
              const sortedGuestlists = sortByField(guestlists, 'guestValue', 'desc');
              res.status(200).json(sortedGuestlists);
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
      },
  
      // Edit an entry in the guest list
      editGuestlist: async (req, res) => {
          try {
              const guestlistData = req.body.map((item, index) => ({ ...item, order: index }));
              const updatedEntries = [];
  
              await Promise.all(guestlistData.map(async item => {
                  let existingEntry = await Guestlist.findByPk(item.id);
  
                  if (existingEntry) {
                      existingEntry.firstName = item.firstName;
                      existingEntry.lastName = item.lastName;
                      existingEntry.selectedCategory = item.selectedCategory;
                      existingEntry.brideGroomOrMutual = item.brideGroomOrMutual;
                      existingEntry.guestValue = item.guestValue;
                      await existingEntry.save();
                      updatedEntries.push(existingEntry);
                  } else {
                      const newEntryData = {
                          firstName: item.firstName,
                          lastName: item.lastName,
                          selectedCategory: item.selectedCategory,
                          brideGroomOrMutual: item.brideGroomOrMutual,
                          guestValue: item.guestValue
                      };
                      const newEntry = await Guestlist.create(newEntryData);
                      updatedEntries.push(newEntry);
                  }
              }));
              const sortedEntries = updatedEntries.sort((a, b) => a.order - b.order);
              res.status(200).json(sortedEntries);
          } catch (error) {
              res.status(500).send(error.message);
          }
      }
  };
  
  module.exports = guestlistController;
  