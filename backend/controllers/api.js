
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

// Retrieve all records
router.get('/', async (req, res) => {
  try {
    const weddingData = await WeddingData.findAll();

    res.status(200).json(weddingData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  
  // POST route to add a new category
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

  
  // GET route to fetch all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  // GET route to retrieve all bridesmaids
  router.get('/bridesmaids', async (req, res) => {
    try {
        const bridesmaids = await Bridesmaids.findAll();
        res.json(bridesmaids);
    } catch (error) {
        console.error('Error fetching bridesmaids:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // POST route to create a new bridesmaid
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

   // GET route to retrieve all groomsmen
   router.get('/groomsmen', async (req, res) => {
    try {
        const groomsmen = await Groomsmen.findAll();
        res.json(groomsmen);
    } catch (error) {
        console.error('Error fetching groomsmen:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // POST route to create a new groomsman
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

     // GET route to retrieve everyone else
     router.get('/everybodyelse', async (req, res) => {
      try {
          const everybodyElse = await EverybodyElse.findAll();
          res.json(everybodyElse);
      } catch (error) {
          console.error('Error fetching everybodyElse:', error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
    });
    
    // POST route to create a new guest
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

export default router;