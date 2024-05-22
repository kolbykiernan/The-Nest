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
            const guestlists = await Guestlist.findAll({ order: [['id', 'ASC']] });
            const sortedGuestlists = sortByField(guestlists, 'guestValue', 'desc');
            res.status(200).json(sortedGuestlists);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
  
      // Create a new entry in the guest list
      // Create a new entry in the guest list
    createGuestlist: async (req, res) => {
        try {
            const guestlistData = req.body.map((item, index) => ({ ...item, order: index }));

            // Map each item in guestlistData to a new entry in the database
            await Promise.all(guestlistData.map(async item => {
                // Check if the guest has a plus one
                if (item.plusOneSelected === 'true') {
                    // Create separate entries for the guest and their plus one
                    const plusOneData = {
                        firstName: item.plusOneFirstName,
                        lastName: item.plusOneLastName,
                        selectedCategory: item.selectedCategory,
                        brideGroomOrMutual: item.brideGroomOrMutual || 'Wedding Party +1',
                        guestValue: item.plusOneValue,
                        userId: item.userId
                    };
                    const guestData = {
                        firstName: item.firstName,
                        lastName: item.lastName,
                        selectedCategory: item.selectedCategory,
                        brideGroomOrMutual: item.brideGroomOrMutual || 'Wedding Party',
                        guestValue: item.guestValue || 5,
                        userId: item.userId
                    };

                    // Insert the new entries into the database
                    const plusOneEntry = await Guestlist.create(plusOneData);
                    const guestEntry = await Guestlist.create(guestData);

                    return [plusOneEntry, guestEntry];
                } else {
                    // Create an entry for the guest only
                    const guestData = {
                        id: item.guestId, // Assuming guestId is already provided for guest entries
                        firstName: item.firstName,
                        lastName: item.lastName,
                        selectedCategory: item.selectedCategory,
                        brideGroomOrMutual: item.brideGroomOrMutual || 'Wedding Party',
                        guestValue: item.guestValue || 5,
                        userId: item.userId
                    };

                    // Insert the new entry into the database
                    const guestEntry = await Guestlist.create(guestData);
                    return guestEntry;
                }
            }));

            // After creating all entries, fetch the newly created entries
            const sortedEntries = await Guestlist.findAll({
                order: [['id', 'ASC']]
            });
        
            res.status(201).json(sortedEntries);
            } catch (error) {
            console.error('Error creating guestlist entries:', error);
            res.status(500).json({ error: error.message });
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
                      existingEntry.userId = item.userId;
                      await existingEntry.save();
                      updatedEntries.push(existingEntry);
                  } else {
                      const newEntryData = {
                          firstName: item.firstName,
                          lastName: item.lastName,
                          selectedCategory: item.selectedCategory,
                          brideGroomOrMutual: item.brideGroomOrMutual,
                          guestValue: item.guestValue,
                          userId: item.userId
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
  