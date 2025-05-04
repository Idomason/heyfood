import express, { RequestHandler } from 'express';
import * as categoryController from '../controllers/categoryController';

const router = express.Router();

// GET all categories
router.get('/', categoryController.getCategories as RequestHandler);

export default router; 