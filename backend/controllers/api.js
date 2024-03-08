
import express from 'express';
const router = express.Router();
import Category from '../models/Category.js';

//gets you tp questionnaire//
router.get('/', (req, res) => {
  res.send('GET /questionnaire')
})

//submits answers to db
router.post('/', (req, res) => {
  res.send('Post /questionnaire')
})

  
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