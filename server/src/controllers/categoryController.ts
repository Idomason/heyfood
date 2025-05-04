import { Request, Response } from 'express';
import * as CategoryModel from '../models/Category';

// Get restaurant categories
export const getRestaurantCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error in getRestaurantCategories controller:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Alias for backward compatibility
export const getCategories = getRestaurantCategories; 