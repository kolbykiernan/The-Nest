import express from 'express';
import Groomsman from '../models/Groomsman.js';

const groomsman = express.Router();

const sortByField = (array, field, order = 'asc') => {
    return array.sort((a, b) => {
      if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  };

groomsman.get('/groomsmen', async (req, res) => {
try {
    const groomsmen = await Groomsman.findAll();
    const sortedGroomsmen = sortByField(groomsmen, 'id');
    res.json(sortedGroomsmen);
} catch (error) {
    console.error('Error fetching groomsmen:', error);
    res.status(500).json({ error: error.message });
}
});


groomsman.post('/groomsmen', async (req, res) => {
const { firstName, lastName, selectedCategory, plusOneSelected, plusOneFirstName, plusOneLastName, isAlsoInWeddingParty, plusOneValue } = req.body;
try {
    await Groomsman.create({
        firstName,
        lastName,
        selectedCategory,
        plusOneSelected,
        plusOneFirstName,
        plusOneLastName,
        isAlsoInWeddingParty,
        plusOneValue
    });

    const sortedGroomsmen = await Groomsman.findAll({
      order: [['id', 'ASC']]
    });

    res.status(201).json(sortedGroomsmen);
} catch (error) {
    console.error('Error creating groomsman:', error);
    res.status(500).json({ error: error.message });
}
});

groomsman.put('/groomsmen/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, selectedCategory, plusOneSelected, plusOneFirstName, plusOneLastName, isAlsoInWeddingParty, plusOneValue } = req.body;

  try {
    // Check if the bridesmaid with the given ID exists
    const groomsman = await Groomsman.findByPk(id);
    if (!groomsman) {
      return res.status(404).json({ error: 'groomsman not found' });
    }

    // Update the groomsman with the provided data
    groomsman.firstName = firstName;
    groomsman.lastName = lastName;
    groomsman.selectedCategory = selectedCategory;
    groomsman.plusOneSelected = plusOneSelected;
    groomsman.plusOneFirstName = plusOneFirstName;
    groomsman.plusOneLastName = plusOneLastName;
    groomsman.isAlsoInWeddingParty = isAlsoInWeddingParty;
    groomsman.plusOneValue = plusOneValue;

    // Save the updated groomsman data
    await groomsman.save();

    // Return the updated groomsman data
    const sortedGroomsmen = await Groomsmen.findAll({
      order: [['id', 'ASC']]
    });

    res.json(sortedGroomsmen);

  } catch (error) {
    console.error('Error updating groomsman:', error);
    res.status(500).json({ error: error.message });
  }
});

export default groomsman;