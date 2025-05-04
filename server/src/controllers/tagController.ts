import { Request, Response } from 'express';
import * as TagModel from '../models/Tag';

export const getAllTags = async (req: Request, res: Response) => {
  try {
    const tags = await TagModel.getTags();
    if (!tags) {
      return res.status(404).json({ error: 'No tags found' });
    }
    res.status(200).json(tags);
  } catch (error) {
    console.error('Error in getAllTags controller:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 