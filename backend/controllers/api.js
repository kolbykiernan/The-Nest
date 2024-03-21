
import express from 'express';
const router = express.Router();
import Category from '../models/Category.js';
import WeddingData from '../models/WeddingData.js';

router.post('/', async (req, res) => {
  try {
    const { id, date, venue, capacity, invites, attendance, cost, brideFirstName, brideLastName, brideSelection, groomFirstName, groomLastName, groomSelection } = req.body;

    const weddingData = await WeddingData.create({ id, date, venue, capacity, invites, attendance, cost, brideFirstName, brideLastName, brideSelection: brideSelection, groomFirstName, groomLastName, groomSelection: groomSelection });

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

export default router;