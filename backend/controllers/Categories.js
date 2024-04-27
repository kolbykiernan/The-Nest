import express from 'express';
import Category from '../models/Category.js';

const category = express.Router();

category.post('/', async (req, res) => {

    console.log(req.body);
    const { name } = req.body;
    try {
      const newCategory = await Category.create({ name });
      res.status(201).json(newCategory);
    } catch (error) {
      console.error('Error adding category:', error);
      res.status(500).json({ error: error.message });
    }
    });
    
    
category.get('/', async (req, res) => {

    try {
      const categories = await Category.findAll();
      res.json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: error.message });
      }
    });

export default category;