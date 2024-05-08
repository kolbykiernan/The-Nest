const sortByField = (array, field, order = 'asc') => {
    return array.sort((a, b) => {
      if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  };
  
  const { Groomsman } = require('../models');
  
  const groomsmanController = {
      // Get all groomsmen
      getAllGroomsmen: async (req, res) => {
          try {
              const groomsmen = await Groomsman.findAll();
              const sortedGroomsmen = sortByField(groomsmen, 'id');
              res.status(200).json(sortedGroomsmen);
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
  
              // Fetch the newly created groomsman and all groomsmen in order
              const groomsmen = await Groomsman.findAll();
              const sortedGroomsmen = sortByField(groomsmen, 'id');
  
              res.status(201).json(sortedGroomsmen);
          } catch (error) {
              res.status(400).send(error.message);
          }
      }
  };
  
  module.exports = groomsmanController;
  