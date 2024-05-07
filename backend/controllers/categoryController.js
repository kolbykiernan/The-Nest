const { Category } = require('../models');

const categoryController = {
    // Get all categories
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.findAll();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Create a new category
    createCategory: async (req, res) => {
        const { name } = req.body;
        try {
            if (!name) {
                return res.status(400).json({ message: "Category name is required" });
            }
            const newCategory = await Category.create({
                name
            });
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};

module.exports = categoryController;
