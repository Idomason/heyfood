import { Request, Response } from 'express';
import * as RestaurantModel from '../models/Restaurant';
  
export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const { restaurants, total } = await RestaurantModel.getPaginatedRestaurants(page, limit);
    
    res.status(200).json({
      data: restaurants,
      pagination: {
        page,
        limit,
        total,
        hasMore: total > page * limit
      }
    });
  } catch (error) {
    console.error('Error in getAllRestaurants controller:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRestaurantsByTag = async (req: Request, res: Response) => {
  try {
    const { tag } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const { restaurants, total } = await RestaurantModel.getPaginatedRestaurantsByTag(tag, page, limit);
    
    res.status(200).json({
      data: restaurants,
      pagination: {
        page,
        limit,
        total,
        hasMore: total > page * limit
      }
    });
  } catch (error) {
    console.error('Error in getRestaurantsByTag controller:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const searchRestaurants = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const { restaurants, total } = await RestaurantModel.searchPaginatedRestaurants(query, page, limit);
    
    res.status(200).json({
      data: restaurants,
      pagination: {
        page,
        limit,
        total,
        hasMore: total > page * limit
      }
    });
  } catch (error) {
    console.error('Error in searchRestaurants controller:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const sortRestaurants = async (req: Request, res: Response) => {
  try {
    const { sortBy } = req.query;
    if (!sortBy || typeof sortBy !== 'string') {
      return res.status(400).json({ error: 'Sort parameter is required' });
    }
    
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const { restaurants, total } = await RestaurantModel.getSortedPaginatedRestaurants(sortBy, page, limit);
    
    res.status(200).json({
      data: restaurants,
      pagination: {
        page,
        limit,
        total,
        hasMore: total > page * limit
      }
    });
  } catch (error) {
    console.error('Error in sortRestaurants controller:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRestaurantsByFoodTag = async (req: Request, res: Response) => {
  try {
    const { foodTag } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const { restaurants, total } = await RestaurantModel.getRestaurantsByFoodTag(foodTag, page, limit);
    
    res.status(200).json({
      data: restaurants,
      pagination: {
        page,
        limit,
        total,
        hasMore: total > page * limit
      }
    });
  } catch (error) {
    console.error('Error in getRestaurantsByFoodTag controller:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 