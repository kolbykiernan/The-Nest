import express from 'express';
import Guest from '../models/Guest.js';

const guest = express.Router();

const sortByField = (array, field, order = 'asc') => {
    return array.sort((a, b) => {
      if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  };



guest.get('/', async (req, res) => {
  
    try {
  
      const guests = await Guest.findAll();
      const sortedGuests = sortByField(guests, 'id');
      res.json(sortedGuests);
    } catch (error) {
      console.error('Error fetching guests:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
guest.post('/', async (req, res) => {
  const { firstName, lastName, selectedCategory, brideGroomOrMutual, guestValue, plusOneSelected, plusOneFirstName, plusOneLastName, plusOneValue} = req.body;
  try {
      await Guest.create({
          firstName,
          lastName,
          selectedCategory,
          brideGroomOrMutual,
          guestValue,
          plusOneSelected,
          plusOneFirstName,
          plusOneLastName,
          plusOneValue,   
      });
      const sortedGuests = await Guest.findAll({
        order: [['id', 'ASC']]
      });
  
      res.status(201).json(sortedGuests);
  } catch (error) {
      console.error('Error creating guest:', error);
      res.status(500).json({ error: error.message });
  }
});

  
guest.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, selectedCategory, brideGroomOrMutual, guestValue, plusOneSelected, plusOneFirstName, plusOneLastName, plusOneValue } = req.body;
  
  try {
    // Check if the guest with the specified ID exists
    const existingGuest = await Guest.findByPk(id);
    
    if (!existingGuest) {
      return res.status(404).json({ error: 'Guest not found' });
    }

    // Update the guest's data
    existingGuest.firstName = firstName;
    existingGuest.lastName = lastName;
    existingGuest.selectedCategory = selectedCategory;
    existingGuest.brideGroomOrMutual = brideGroomOrMutual;
    existingGuest.guestValue = guestValue;
    existingGuest.plusOneSelected = plusOneSelected;
    existingGuest.plusOneFirstName = plusOneFirstName;
    existingGuest.plusOneLastName = plusOneLastName;
    existingGuest.plusOneValue = plusOneValue;
    
    // Save the updated data
    await existingGuest.save();

    // Respond with the updated guest data
    const sortedGuests = await Guest.findAll({
      order: [['id', 'ASC']]
    });

    res.json(sortedGuests);
  } catch (error) {
    console.error('Error updating guest:', error);
    res.status(500).json({ error: error.message });
  }
});

export default guest