
import express from 'express';
const router = express.Router();
import Category from '../models/Category.js';
import WeddingData from '../models/WeddingData.js';
import Bridesmaids from '../models/bridesMaids.js';
import Groomsmen from '../models/groomsMen.js';
import EverybodyElse from '../models/EverybodyElse.js';

router.post('/', async (req, res) => {
try {
const { id, date, venue, capacity, invites, attendance, cost, brideFirstName, brideLastName, brideSelection, groomFirstName, groomLastName, groomSelection } = req.body;

const weddingData = await WeddingData.create({ id, date, venue, capacity, invites, attendance, cost, brideFirstName, brideLastName, brideSelection, groomFirstName, groomLastName, groomSelection });

res.status(201).json(weddingData);
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Internal server error' });
}
});


router.get('/', async (req, res) => {
try {
const weddingData = await WeddingData.findAll();

res.status(200).json(weddingData);
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Internal server error' });
}
});

router.put('/', async (req, res) => {
  const weddingId = req.params.id;
  const {
    date,
    venue,
    capacity,
    invites,
    attendance,
    cost,
    brideFirstName,
    brideLastName,
    brideSelection,
    groomFirstName,
    groomLastName,
    groomSelection
  } = req.body;

  try {
    let weddingData = await WeddingData.findOne();

    if (!weddingData) {
      return res.status(404).json({ error: 'Wedding data not found' });
    }

    weddingData.date = date;
    weddingData.venue = venue;
    weddingData.capacity = capacity;
    weddingData.invites = invites;
    weddingData.attendance = attendance;
    weddingData.cost = cost;
    weddingData.brideFirstName = brideFirstName;
    weddingData.brideLastName = brideLastName;
    weddingData.brideSelection = brideSelection;
    weddingData.groomFirstName = groomFirstName;
    weddingData.groomLastName = groomLastName;
    weddingData.groomSelection = groomSelection;

    await weddingData.save();

    res.json(weddingData);
  } catch (error) {
    console.error('Error updating wedding data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.post('/categories', async (req, res) => {

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


router.get('/categories', async (req, res) => {
try {
const categories = await Category.findAll();
res.json(categories);
} catch (error) {
console.error('Error fetching categories:', error);
res.status(500).json({ error: 'Internal server error' });
}
});


router.get('/bridesmaids', async (req, res) => {
try {
    const bridesmaids = await Bridesmaids.findAll();
    res.json(bridesmaids);
} catch (error) {
    console.error('Error fetching bridesmaids:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});

router.post('/bridesmaids', async (req, res) => {
const { firstName, lastName, selectedCategory, plusOneSelectedBridesmaids, plusOneFirstName, plusOneLastName, isAlsoInWeddingParty, plusOneValueBridesmaids } = req.body;
try {
    const newBridesmaid = await Bridesmaids.create({
        firstName,
        lastName,
        selectedCategory,
        plusOneSelectedBridesmaids,
        plusOneFirstName,
        plusOneLastName,
        isAlsoInWeddingParty,
        plusOneValueBridesmaids
    });
    res.status(201).json(newBridesmaid);
} catch (error) {
    console.error('Error creating bridesmaid:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});

router.put('/bridesmaids/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, selectedCategory, plusOneSelectedBridesmaids, plusOneFirstName, plusOneLastName, isAlsoInWeddingParty, plusOneValueBridesmaids } = req.body;

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
    bridesmaid.plusOneSelectedBridesmaids = plusOneSelectedBridesmaids;
    bridesmaid.plusOneFirstName = plusOneFirstName;
    bridesmaid.plusOneLastName = plusOneLastName;
    bridesmaid.isAlsoInWeddingParty = isAlsoInWeddingParty;
    bridesmaid.plusOneValueBridesmaids = plusOneValueBridesmaids;

    // Save the updated bridesmaid data
    await bridesmaid.save();

    // Return the updated bridesmaid data
    res.json(bridesmaid);
  } catch (error) {
    console.error('Error updating bridesmaid:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/groomsmen', async (req, res) => {
try {
    const groomsmen = await Groomsmen.findAll();
    res.json(groomsmen);
} catch (error) {
    console.error('Error fetching groomsmen:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});


router.post('/groomsmen', async (req, res) => {
const { firstName, lastName, selectedCategory, plusOneSelectedGroomsmen, plusOneFirstName, plusOneLastName, isAlsoInWeddingParty, plusOneValueGroomsmen } = req.body;
try {
    const newGroomsman = await Groomsmen.create({
        firstName,
        lastName,
        selectedCategory,
        plusOneSelectedGroomsmen,
        plusOneFirstName,
        plusOneLastName,
        isAlsoInWeddingParty,
        plusOneValueGroomsmen
    });
    res.status(201).json(newGroomsman);
} catch (error) {
    console.error('Error creating groomsman:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});

router.put('/groomsmen/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, selectedCategory, plusOneSelectedGroomsmen, plusOneFirstName, plusOneLastName, isAlsoInWeddingParty, plusOneValueGroomsmen } = req.body;

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
    groomsman.plusOneSelectedGroomsmen = plusOneSelectedGroomsmen;
    groomsman.plusOneFirstName = plusOneFirstName;
    groomsman.plusOneLastName = plusOneLastName;
    groomsman.isAlsoInWeddingParty = isAlsoInWeddingParty;
    groomsman.plusOneValueGroomsmen = plusOneValueGroomsmen;

    // Save the updated groomsman data
    await groomsman.save();

    // Return the updated groomsman data
    res.json(groomsman);
  } catch (error) {
    console.error('Error updating groomsman:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/everybodyelse', async (req, res) => {
  try {
    const guests = await EverybodyElse.findAll();
    res.status(200).json(guests);
  } catch (error) {
    console.error('Error fetching guests:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/everybodyelse', async (req, res) => {
  const { firstName, lastName, selectedCategory, brideGroomOrMutual, guestValue, plusOneSelected, plusOneFirstName, plusOneLastName, plusOneValue, otherGuests, addOnFirstName, addOnLastName, addOnValue, moreGuests, howMany } = req.body;
  try {
      const newGuest = await EverybodyElse.create({
          firstName,
          lastName,
          selectedCategory,
          brideGroomOrMutual,
          guestValue,
          plusOneSelected,
          plusOneFirstName,
          plusOneLastName,
          plusOneValue,
          otherGuests,
          addOnFirstName,
          addOnLastName,
          addOnValue,
          moreGuests,
          howMany
      });
      res.status(201).json(newGuest);
  } catch (error) {
      console.error('Error creating guest:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.put('/everybodyelse/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, selectedCategory, brideGroomOrMutual, guestValue, plusOneSelected, plusOneFirstName, plusOneLastName, plusOneValue, otherGuests, addOnFirstName, addOnLastName, addOnValue, moreGuests, howMany } = req.body;
  
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
    existingGuest.otherGuests = otherGuests;
    existingGuest.addOnFirstName = addOnFirstName;
    existingGuest.addOnLastName = addOnLastName;
    existingGuest.addOnValue = addOnValue;
    existingGuest.moreGuests = moreGuests;
    existingGuest.howMany = howMany;
    
    // Save the updated data
    await existingGuest.save();

    // Respond with the updated guest data
    res.status(200).json(existingGuest);
  } catch (error) {
    console.error('Error updating guest:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;