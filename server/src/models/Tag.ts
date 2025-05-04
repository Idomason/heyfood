import sql from '../config/db';
import { Tag } from '../types';
import { toCamelCase } from '../helper/convertToCamelCase';

export const getTags = async (): Promise<Tag[]> => {
  try {
    const result = await sql`
      SELECT t.id, t.name, COUNT(rt.restaurant_id) as count
      FROM tags t
      LEFT JOIN restaurant_tags rt ON t.id = rt.tag_id
      GROUP BY t.id, t.name
      ORDER BY count DESC
    `;
    return result.map(toCamelCase);
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
}; 