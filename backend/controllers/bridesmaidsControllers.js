const sortByField = (array, field, order = 'asc') => {
    return array.sort((a, b) => {
      if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  };
  
  const { Bridesmaid } = require('../models');
  
  const bridesmaidsController = {
      // Get all bridesmaids
      getAllBridesmaids: async (req, res) => {
          try {
              const bridesmaids = await Bridesmaid.findAll();
              const sortedBridesmaids = sortByField(bridesmaids, 'id');
              res.status(200).json(sortedBridesmaids);
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
  
              // Fetch the newly created bridesmaid and all bridesmaids in order
              const bridesmaids = await Bridesmaid.findAll();
              const sortedBridesmaids = sortByField(bridesmaids, 'id');
  
              res.status(201).json(sortedBridesmaids);
          } catch (error) {
              res.status(400).json({ error: error.message });
          }
      }
  };
  
  module.exports = bridesmaidsController;
  