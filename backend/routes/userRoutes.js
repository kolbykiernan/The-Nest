// userRoutes.js

const express = require('express');
const router = express.Router();
const { getAllUsers, createUser } = require('../controllers/userrsController');
const { authenticateUser, checkAuthentication } = require('../controllers/authenticationController');
const { getAllBridesmaids, createBridesmaid } = require('../controllers/bridesmaidsControllers');
const { getAllCategories, createCategory } = require('../controllers/categoryController');
const { getAllGroomsmen, createGroomsman } = require('../controllers/groomsmanController');
const { getAllGuests, createGuest } = require('../controllers/guestController');
const { getAllGuestlists, createGuestlist, editGuestlist } = require('../controllers/guestListController');
const { getAllWeddingData, createWeddingData } = require('../controllers/weddingDataController');


// User routes
router.get('/users', getAllUsers);
router.post('/users', createUser);

router.post('/authentication', authenticateUser);
router.get('/authentication', checkAuthentication);

router.get('/bridesmaids', getAllBridesmaids);
router.post('/bridesmaids', createBridesmaid);

router.get('/category', getAllCategories);
router.post('/category', createCategory);

router.get('/groomsmen', getAllGroomsmen);
router.post('/groomsman', createGroomsman);

router.get('/guest', getAllGuests);
router.post('/guest', createGuest);

router.get('/guestlist', getAllGuestlists);
router.post('/guestlist', createGuestlist);
router.put('/guestlist', editGuestlist)

router.get('/weddingdata', getAllWeddingData);
router.post('/weddingdata', createWeddingData);

module.exports = router;
