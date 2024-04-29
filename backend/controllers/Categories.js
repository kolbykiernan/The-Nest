import express from 'express';
import Category from '../models/Category.js';

const CategoryController = {
    // Function to create a new category
    createCategory: async (req, res) => {
        console.log(req.body);
        const { name } = req.body;
        try {
            const newCategory = await Category.create({ name });
            res.status(201).json(newCategory);
        } catch (error) {
            console.error('Error adding category:', error);
            res.status(500).json({ error: error.message });
        }
    },

    // Function to get all categories
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.findAll();
            res.json(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            res.status(500).json({ error: error.message });
        }
    }
};

export default CategoryController;
