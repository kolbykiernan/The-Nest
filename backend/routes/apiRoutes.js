import express from 'express';
import UserController from '../controllers/users.js'
import WeddingDataController from '../controllers/WeddingData.js'
import BridesmaidController from '../controllers/Bridesmaids.js';
import GroomsmanController from '../controllers/Groomsmen.js';
import GuestController from '../controllers/Guest.js';
import AuthenticationController from '../controllers/authentication.js';
import CategoryController from '../controllers/Categories.js';
import GuestlistController from '../controllers/Guestlist.js';

const router = express.Router();

// Routes
router.post('/register', UserController.registerUser);
// router.post('/login', UserController.loginUser); 
// router.get('/getUser/:id', UserController.getUserById);

router.post('/createWeddingData', WeddingDataController.createWeddingData);
router.get('/getAllWeddingData', WeddingDataController.getAllWeddingData);

router.post('/createBridesmaid', BridesmaidController.createBridesmaid);
router.get('/getAllBridesmaids', BridesmaidController.getAllBridesmaids);
// router.put('/editBridesmaid/:id', BridesmaidController.editBridesmaid);

router.post('/createGroomsman', GroomsmanController.createGroomsman);
router.get('/getAllGroomsmen', GroomsmanController.getAllGroomsmen);
// router.put('/editGroomsman/:id', GroomsmanController.editGroomsman);

router.post('/createGuest', GuestController.createGuest);
router.get('/getAllGuests', GuestController.getAllGuests);
// router.put('/editGuest/:id', GuestController.editGuest);

router.post('/authenticate', AuthenticationController.authenticateUser);
router.get('/getUser/:id', UserController.getUserById);

router.post('/createCategory', CategoryController.createCategory);
router.get('/getAllCategories', CategoryController.getAllCategories);

router.post('/createGuestlist', GuestlistController.createGuestlist);
router.get('/getGuestlist', GuestlistController.getGuestlist);
router.put('/editGuestlist', GuestlistController.editGuestlist);


export default router