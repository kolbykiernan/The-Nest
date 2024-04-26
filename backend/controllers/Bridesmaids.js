import express from 'express';
import Bridesmaid from '../models/Bridesmaid.js';

const bridesmaid = express.Router();


const sortByField = (array, field, order = 'asc') => {
    return array.sort((a, b) => {
      if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  };


bridesmaid.get('/bridesmaids', async (req, res) => {
  try {
    const bridesmaids = await Bridesmaid.findAll();
    const sortedBridesmaids = sortByField(bridesmaids, 'id');
    res.json(sortedBridesmaids);
  } catch (error) {
      console.error('Error fetching bridesmaids:', error);
      res.status(500).json({ error: error.message });
  }
  });

bridesmaid.post('/bridesmaids', async (req, res) => {
  const { firstName, lastName, selectedCategory, plusOneSelected, plusOneFirstName, plusOneLastName, isAlsoInWeddingParty, plusOneValue } = req.body;
  try {
      await Bridesmaid.create({
          firstName,
          lastName,
          selectedCategory,
          plusOneSelected,
          plusOneFirstName,
          plusOneLastName,
          isAlsoInWeddingParty,
          plusOneValue
      });
  
      const sortedBridesmaids = await Bridesmaid.findAll({
        order: [['id', 'ASC']]
      });
  
      res.status(201).json(sortedBridesmaids);
  } catch (error) {
      console.error('Error creating bridesmaid:', error);
      res.status(500).json({ error: error.message });
  }
  });
    
bridesmaid.put('/bridesmaids/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, selectedCategory, plusOneSelected, plusOneFirstName, plusOneLastName, isAlsoInWeddingParty, plusOneValue } = req.body;

  try {
    // Check if the bridesmaid with the given ID exists
    const bridesmaid = await Bridesmaid.findByPk(id);
    if (!bridesmaid) {
      return res.status(404).json({ error: 'Bridesmaid not found' });
    }

    // Update the bridesmaid with the provided data
    bridesmaid.firstName = firstName;
    bridesmaid.lastName = lastName;
    bridesmaid.selectedCategory = selectedCategory;
    bridesmaid.plusOneSelected = plusOneSelected;
    bridesmaid.plusOneFirstName = plusOneFirstName;
    bridesmaid.plusOneLastName = plusOneLastName;
    bridesmaid.isAlsoInWeddingParty = isAlsoInWeddingParty;
    bridesmaid.plusOneValue = plusOneValue;

    // Save the updated bridesmaid data
    await bridesmaid.save();

    const sortedBridesmaids = await Bridesmaid.findAll({
      order: [['id', 'ASC']]
    });

    res.json(sortedBridesmaids);
  } catch (error) {
    console.error('Error updating bridesmaid:', error);
    res.status(500).json({ error: error.message });
  }
});


export default bridesmaid;