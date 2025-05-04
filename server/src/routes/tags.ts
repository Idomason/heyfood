import express from 'express';
import * as tagController from '../controllers/tagController';

const router = express.Router();

// GET all tags
router.get('/', tagController.getAllTags);

export default router; 