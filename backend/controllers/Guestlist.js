import express from 'express';
import Guestlist from '../models/Guestlist.js';

const GuestlistController = {
    // Function to create guestlist entries
    createGuestlist: async (req, res) => {
        try {
            const guestlistData = req.body.map((item, index) => ({ ...item, order: index }));
            const createdEntries = await Promise.all(guestlistData.map(async item => {
                if (item.plusOneSelected === 'true') {
                    const plusOneData = {
                        id: item.plusOneId,
                        firstName: item.plusOneFirstName,
                        lastName: item.plusOneLastName,
                        selectedCategory: item.selectedCategory,
                        brideGroomOrMutual: item.brideGroomOrMutual || 'Wedding Party +1',
                        guestValue: item.plusOneValue
                    };
                    const guestData = {
                        id: item.guestId,
                        firstName: item.firstName,
                        lastName: item.lastName,
                        selectedCategory: item.selectedCategory,
                        brideGroomOrMutual: item.brideGroomOrMutual || 'Wedding Party',
                        guestValue: item.guestValue || 5
                    };

                    const plusOneEntry = await Guestlist.create(plusOneData);
                    const guestEntry = await Guestlist.create(guestData);

                    return [plusOneEntry, guestEntry];
                } else {
                    const guestData = {
                        id: item.guestId,
                        firstName: item.firstName,
                        lastName: item.lastName,
                        selectedCategory: item.selectedCategory,
                        brideGroomOrMutual: item.brideGroomOrMutual || 'Wedding Party',
                        guestValue: item.guestValue || 5
                    };
                    const guestEntry = await Guestlist.create(guestData);
                    return guestEntry;
                }
            }));

            // Sort the created entries by order
            const sortedEntries = createdEntries.sort((a, b) => a.order - b.order);
            res.status(201).json(sortedEntries);
        } catch (error) {
            console.error('Error creating guestlist entries:', error);
            res.status(500).json({ error: error.message });
        }
    },

    // Function to get all guestlist entries
    getGuestlist: async (req, res) => {
        try {
            const guestlistEntries = await Guestlist.findAll();
            const sortedGuestlist = guestlistEntries.sort((a, b) => a.order - b.order);
            res.status(200).json(sortedGuestlist);
        } catch (error) {
            console.error('Error fetching guestlist data:', error);
            res.status(500).json({ error: error.message });
        }
    },

    // Function to edit guestlist entries
    editGuestlist: async (req, res) => {
        try {
            const guestlistData = req.body.map((item, index) => ({ ...item, order: index }));
            const updatedEntries = [];

            await Promise.all(guestlistData.map(async item => {
                let existingEntry = await Guestlist.findByPk(item.id);

                if (existingEntry) {
                    existingEntry.firstName = item.firstName;
                    existingEntry.lastName = item.lastName;
                    existingEntry.selectedCategory = item.selectedCategory;
                    existingEntry.brideGroomOrMutual = item.brideGroomOrMutual;
                    existingEntry.guestValue = item.guestValue;
                    await existingEntry.save();
                    updatedEntries.push(existingEntry);
                } else {
                    const newEntryData = {
                        firstName: item.firstName,
                        lastName: item.lastName,
                        selectedCategory: item.selectedCategory,
                        brideGroomOrMutual: item.brideGroomOrMutual,
                        guestValue: item.guestValue
                    };
                    const newEntry = await Guestlist.create(newEntryData);
                    updatedEntries.push(newEntry);
                }
            }));

            // Sort the updated entries by order
            const sortedEntries = updatedEntries.sort((a, b) => a.order - b.order);
            res.status(200).json(sortedEntries);
        } catch (error) {
            console.error('Error updating guestlist entries:', error);
            res.status(500).json({ error: error.message });
        }
    }
};

export default GuestlistController;
