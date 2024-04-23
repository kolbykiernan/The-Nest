import express from 'express';
import Category from '../models/Category.js';
import WeddingData from '../models/WeddingData.js';
import Bridesmaids from '../models/bridesMaids.js';
import Groomsmen from '../models/groomsMen.js';
import EverybodyElse from '../models/EverybodyElse.js';
import Guestlist from '../models/Guestlist.js'

const apiRouter = express.Router();

apiRouter.post('/weddingdata', async (req, res) => {
try {
const { id, brideFirstName, brideLastName, brideSelection, groomFirstName, groomLastName, groomSelection } = req.body;

const weddingData = await WeddingData.create({ id, brideFirstName, brideLastName, brideSelection, groomFirstName, groomLastName, groomSelection });

res.status(201).json(weddingData);
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Internal server error' });
}
});


apiRouter.get('/weddingdata', async (req, res) => {
try {
const weddingData = await WeddingData.findAll();

res.status(200).json(weddingData);
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Internal server error' });
}
});


apiRouter.post('/categories', async (req, res) => {

console.log(req.body);
const { name } = req.body;
try {
  const newCategory = await Category.create({ name });
  res.status(201).json(newCategory);
} catch (error) {
  console.error('Error adding category:', error);
  res.status(500).json({ error: 'Internal server error' });
}
});


apiRouter.get('/categories', async (req, res) => {
try {
const categories = await Category.findAll();
res.json(categories);
} catch (error) {
console.error('Error fetching categories:', error);
res.status(500).json({ error: 'Internal server error' });
}
});


const sortByField = (array, field, order = 'asc') => {
  return array.sort((a, b) => {
    if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
    if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
    return 0;
  });
};



apiRouter.get('/bridesmaids', async (req, res) => {
try {
  const bridesmaids = await Bridesmaids.findAll();
  const sortedBridesmaids = sortByField(bridesmaids, 'id');
  res.json(sortedBridesmaids);
} catch (error) {
    console.error('Error fetching bridesmaids:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});

apiRouter.post('/bridesmaids', async (req, res) => {
const { firstName, lastName, selectedCategory, plusOneSelected, plusOneFirstName, plusOneLastName, isAlsoInWeddingParty, plusOneValue } = req.body;
try {
    await Bridesmaids.create({
        firstName,
        lastName,
        selectedCategory,
        plusOneSelected,
        plusOneFirstName,
        plusOneLastName,
        isAlsoInWeddingParty,
        plusOneValue
    });

    const sortedBridesmaids = await Bridesmaids.findAll({
      order: [['id', 'ASC']]
    });

    res.status(201).json(sortedBridesmaids);
} catch (error) {
    console.error('Error creating bridesmaid:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});

apiRouter.put('/bridesmaids/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, selectedCategory, plusOneSelected, plusOneFirstName, plusOneLastName, isAlsoInWeddingParty, plusOneValue } = req.body;

  try {
    // Check if the bridesmaid with the given ID exists
    const bridesmaid = await Bridesmaids.findByPk(id);
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

    const sortedBridesmaids = await Bridesmaids.findAll({
      order: [['id', 'ASC']]
    });

    res.json(sortedBridesmaids);
  } catch (error) {
    console.error('Error updating bridesmaid:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


apiRouter.get('/groomsmen', async (req, res) => {
try {
    const groomsmen = await Groomsmen.findAll();
    const sortedGroomsmen = sortByField(groomsmen, 'id');
    res.json(sortedGroomsmen);
} catch (error) {
    console.error('Error fetching groomsmen:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});


apiRouter.post('/groomsmen', async (req, res) => {
const { firstName, lastName, selectedCategory, plusOneSelected, plusOneFirstName, plusOneLastName, isAlsoInWeddingParty, plusOneValue } = req.body;
try {
    await Groomsmen.create({
        firstName,
        lastName,
        selectedCategory,
        plusOneSelected,
        plusOneFirstName,
        plusOneLastName,
        isAlsoInWeddingParty,
        plusOneValue
    });

    const sortedGroomsmen = await Groomsmen.findAll({
      order: [['id', 'ASC']]
    });

    res.status(201).json(sortedGroomsmen);
} catch (error) {
    console.error('Error creating groomsman:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});

apiRouter.put('/groomsmen/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, selectedCategory, plusOneSelected, plusOneFirstName, plusOneLastName, isAlsoInWeddingParty, plusOneValue } = req.body;

  try {
    // Check if the bridesmaid with the given ID exists
    const groomsman = await Groomsmen.findByPk(id);
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
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


apiRouter.get('/everybodyelse', async (req, res) => {
  
  try {

    const guests = await EverybodyElse.findAll();
    const sortedGuests = sortByField(guests, 'id');
    res.json(sortedGuests);
  } catch (error) {
    console.error('Error fetching guests:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

apiRouter.post('/everybodyelse', async (req, res) => {
  const { firstName, lastName, selectedCategory, brideGroomOrMutual, guestValue, plusOneSelected, plusOneFirstName, plusOneLastName, plusOneValue} = req.body;
  try {
      await EverybodyElse.create({
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
      const sortedGuests = await EverybodyElse.findAll({
        order: [['id', 'ASC']]
      });
  
      res.status(201).json(sortedGuests);
  } catch (error) {
      console.error('Error creating guest:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


apiRouter.put('/everybodyelse/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, selectedCategory, brideGroomOrMutual, guestValue, plusOneSelected, plusOneFirstName, plusOneLastName, plusOneValue } = req.body;
  
  try {
    // Check if the guest with the specified ID exists
    const existingGuest = await EverybodyElse.findByPk(id);
    
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
    const sortedGuests = await EverybodyElse.findAll({
      order: [['id', 'ASC']]
    });

    res.json(sortedGuests);
  } catch (error) {
    console.error('Error updating guest:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


apiRouter.get('/guestlist', async (req, res) => {
  try {
    // Fetch all guestlist entries from the Guestlist table
    const guestlistEntries = await Guestlist.findAll();
    const sortedGuestlist = sortByField(guestlistEntries, 'guestValue', 'desc');
    res.status(200).json(sortedGuestlist);
  } catch (error) {
    console.error('Error fetching guestlist data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

apiRouter.post('/guestlist', async (req, res) => {
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
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

apiRouter.put('/guestlist', async (req, res) => {
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
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




export default apiRouter;