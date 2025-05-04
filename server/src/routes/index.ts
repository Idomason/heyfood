import express from 'express';
import restaurantRoutes from './restaurants';
import tagRoutes from './tags';
import * as categoryController from '../controllers/categoryController';

const router = express.Router();

// Routes
router.use('/restaurants', restaurantRoutes);

// Tags routes
router.use('/tags', tagRoutes);

// Categories route
router.get('/categories', categoryController.getRestaurantCategories);

export default router; 