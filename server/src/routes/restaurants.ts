import express, { RequestHandler } from 'express';
import * as restaurantController from '../controllers/restaurantController';

const router = express.Router();

// GET all restaurants
router.get('/', restaurantController.getAllRestaurants as RequestHandler);

// GET restaurants by tag
router.get('/tag/:tag', restaurantController.getRestaurantsByTag as RequestHandler);

// GET restaurants by food tag
router.get('/food-tag/:foodTag', restaurantController.getRestaurantsByFoodTag as RequestHandler);

// GET search restaurants
router.get('/search', restaurantController.searchRestaurants as RequestHandler);

// GET sort restaurants
router.get('/sort', restaurantController.sortRestaurants as RequestHandler);

export default router; 