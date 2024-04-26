import express from 'express';
import Guestlist from '../models/Guestlist.js'

const guestlist = express.Router();

const sortByField = (array, field, order = 'asc') => {
    return array.sort((a, b) => {
      if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  };

guestlist.get('/guestlist', async (req, res) => {
  try {
    // Fetch all guestlist entries from the Guestlist table
    const guestlistEntries = await Guestlist.findAll();
    const sortedGuestlist = sortByField(guestlistEntries, 'guestValue', 'desc');
    res.status(200).json(sortedGuestlist);
  } catch (error) {
    console.error('Error fetching guestlist data:', error);
    res.status(500).json({ error: error.message });
  }
});

guestlist.post('/guestlist', async (req, res) => {
  try {
    const guestlistData = req.body.map((item, index) => ({ ...item, order: index }));

    // Map each item in guestlistData to a new entry in the database
    await Promise.all(guestlistData.map(async item => {
      // Check if the guest has a plus one
      if (item.plusOneSelected === 'true') {
        // Create separate entries for the guest and their plus one
        const plusOneData = {
          id: item.plusOneId, // Assuming plusOneId is already provided for plus one entries
          firstName: item.plusOneFirstName,
          lastName: item.plusOneLastName,
          selectedCategory: item.selectedCategory,
          brideGroomOrMutual: item.brideGroomOrMutual || 'Wedding Party +1',
          guestValue: item.plusOneValue
        };
        const guestData = {
          id: item.guestId, // Assuming guestId is already provided for guest entries
          firstName: item.firstName,
          lastName: item.lastName,
          selectedCategory: item.selectedCategory,
          brideGroomOrMutual: item.brideGroomOrMutual || 'Wedding Party',
          guestValue: item.guestValue || 5
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
          guestValue: item.guestValue || 5
        };

        // Insert the new entry into the database
        const guestEntry = await Guestlist.create(guestData);
        return guestEntry;
      }
    }));

    // Retrieve the newly created entries
    const sortedEntries = await Guestlist.findAll({
      order: [['id', 'ASC']]
    });

    res.status(201).json(sortedEntries);
  } catch (error) {
    console.error('Error creating guestlist entries:', error);
    res.status(500).json({ error: error.message });
  }
});

guestlist.put('/guestlist', async (req, res) => {
  try {
    const guestlistData = req.body.map((item, index) => ({ ...item, order: index }));

    // Array to hold updated entries
    const updatedEntries = [];

    // Loop through each item in guestlistData
    await Promise.all(guestlistData.map(async item => {
      // Find the existing entry in the database by its ID
      let existingEntry = await Guestlist.findByPk(item.id);

      if (existingEntry) {
        // Update the existing entry with the new data
        existingEntry.firstName = item.firstName;
        existingEntry.lastName = item.lastName;
        existingEntry.selectedCategory = item.selectedCategory;
        existingEntry.brideGroomOrMutual = item.brideGroomOrMutual;
        existingEntry.guestValue = item.guestValue;
        await existingEntry.save();
        updatedEntries.push(existingEntry);
      } else {
        // If the entry does not exist, create a new entry
        const newEntryData = {
          firstName: item.firstName,
          lastName: item.lastName,
          selectedCategory: item.selectedCategory,
          brideGroomOrMutual: item.brideGroomOrMutual,
          guestValue: item.guestValue
        };
        // Create new entry
        const newEntry = await Guestlist.create(newEntryData);
        updatedEntries.push(newEntry);
      }
    }));
    const sortedEntries = updatedEntries.sort((a, b) => a.order - b.order);


    res.status(200).json(sortedEntries);
  } catch (error) {
    console.error('Error updating guestlist entries:', error);
    res.status(500).json({ error: error.message });
  }
});

export default guestlist