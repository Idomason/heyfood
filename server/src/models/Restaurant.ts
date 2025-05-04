import sql from '../config/db';
import { Restaurant } from '../types';

// Helper to convert snake_case to camelCase
const toCamelCase = (obj: any): any => {
  return Object.keys(obj).reduce((acc, key) => {
    const camelKey = key.replace(/_([a-z])/g, (_, p1) => p1.toUpperCase());
    acc[camelKey] = obj[key];
    return acc;
  }, {} as any);
};

// Get total count of restaurants
export const getTotalRestaurants = async (): Promise<number> => {
  try {
    const result = await sql`SELECT COUNT(*) as count FROM restaurants`;
    return parseInt(result[0].count);
  } catch (error) {
    console.error('Error counting restaurants:', error);
    throw error;
  }
};

// Get total count of restaurants by tag
export const getTotalRestaurantsByTag = async (tagName: string): Promise<number> => {
  try {
    const result = await sql`
      SELECT COUNT(DISTINCT r.id) as count
      FROM restaurants r
      JOIN restaurant_tags rt ON r.id = rt.restaurant_id
      JOIN tags t ON rt.tag_id = t.id
      WHERE t.name = ${tagName}
    `;
    return parseInt(result[0].count);
  } catch (error) {
    console.error('Error counting restaurants by tag:', error);
    throw error;
  }
};

// Get total count of restaurants matching search term
export const getTotalSearchRestaurants = async (searchTerm: string): Promise<number> => {
  try {
    const result = await sql`
      SELECT COUNT(*) as count
      FROM restaurants
      WHERE name ILIKE ${'%' + searchTerm + '%'}
    `;
    return parseInt(result[0].count);
  } catch (error) {
    console.error('Error counting search results:', error);
    throw error;
  }
};

export const getRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const result = await sql`
      SELECT r.*, 
             ARRAY_AGG(t.name) AS tags
      FROM restaurants r
      LEFT JOIN restaurant_tags rt ON r.id = rt.restaurant_id
      LEFT JOIN tags t ON rt.tag_id = t.id
      GROUP BY r.id
    `;
    return result.map(toCamelCase);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};

export const getPaginatedRestaurants = async (page: number, limit: number): Promise<{ restaurants: Restaurant[], total: number }> => {
  try {
    const offset = (page - 1) * limit;
    
    const result = await sql`
      SELECT r.*, 
             ARRAY_AGG(t.name) AS tags
      FROM restaurants r
      LEFT JOIN restaurant_tags rt ON r.id = rt.restaurant_id
      LEFT JOIN tags t ON rt.tag_id = t.id
      GROUP BY r.id
      LIMIT ${limit} OFFSET ${offset}
    `;
    
    const total = await getTotalRestaurants();
    
    return {
      restaurants: result.map(toCamelCase),
      total
    };
  } catch (error) {
    console.error('Error fetching paginated restaurants:', error);
    throw error;
  }
};

export const getRestaurantsByTag = async (tagName: string): Promise<Restaurant[]> => {
  try {
    const result = await sql`
      SELECT r.*, 
             ARRAY_AGG(t.name) AS tags
      FROM restaurants r
      JOIN restaurant_tags rt ON r.id = rt.restaurant_id
      JOIN tags t ON rt.tag_id = t.id
      WHERE t.name = ${tagName}
      GROUP BY r.id
    `;
    return result.map(toCamelCase);
  } catch (error) {
    console.error('Error fetching restaurants by tag:', error);
    throw error;
  }
};

export const getPaginatedRestaurantsByTag = async (tagName: string, page: number, limit: number): Promise<{ restaurants: Restaurant[], total: number }> => {
  try {
    const offset = (page - 1) * limit;
    
    const result = await sql`
      SELECT r.*, 
             ARRAY_AGG(t2.name) AS tags
      FROM restaurants r
      JOIN restaurant_tags rt ON r.id = rt.restaurant_id
      JOIN tags t ON rt.tag_id = t.id
      LEFT JOIN restaurant_tags rt2 ON r.id = rt2.restaurant_id
      LEFT JOIN tags t2 ON rt2.tag_id = t2.id
      WHERE t.name = ${tagName}
      GROUP BY r.id
      LIMIT ${limit} OFFSET ${offset}
    `;
    
    const total = await getTotalRestaurantsByTag(tagName);
    
    return {
      restaurants: result.map(toCamelCase),
      total
    };
  } catch (error) {
    console.error('Error fetching paginated restaurants by tag:', error);
    throw error;
  }
};

export const searchRestaurants = async (searchTerm: string): Promise<Restaurant[]> => {
  try {
    const result = await sql`
      SELECT r.*, 
             ARRAY_AGG(t.name) AS tags
      FROM restaurants r
      LEFT JOIN restaurant_tags rt ON r.id = rt.restaurant_id
      LEFT JOIN tags t ON rt.tag_id = t.id
      WHERE r.name ILIKE ${'%' + searchTerm + '%'}
      GROUP BY r.id
    `;
    return result.map(toCamelCase);
  } catch (error) {
    console.error('Error searching restaurants:', error);
    throw error;
  }
};

export const searchPaginatedRestaurants = async (searchTerm: string, page: number, limit: number): Promise<{ restaurants: Restaurant[], total: number }> => {
  try {
    const offset = (page - 1) * limit;
    
    const result = await sql`
      SELECT r.*, 
             ARRAY_AGG(t.name) AS tags
      FROM restaurants r
      LEFT JOIN restaurant_tags rt ON r.id = rt.restaurant_id
      LEFT JOIN tags t ON rt.tag_id = t.id
      WHERE r.name ILIKE ${'%' + searchTerm + '%'}
      GROUP BY r.id
      LIMIT ${limit} OFFSET ${offset}
    `;
    
    const total = await getTotalSearchRestaurants(searchTerm);
    
    return {
      restaurants: result.map(toCamelCase),
      total
    };
  } catch (error) {
    console.error('Error searching paginated restaurants:', error);
    throw error;
  }
};

export const sortRestaurants = async (sortBy: string): Promise<Restaurant[]> => {
  try {
    let query;
    
    switch(sortBy) {
      case 'rating':
        query = sql`
          SELECT r.*, 
                 ARRAY_AGG(t.name) AS tags
          FROM restaurants r
          LEFT JOIN restaurant_tags rt ON r.id = rt.restaurant_id
          LEFT JOIN tags t ON rt.tag_id = t.id
          GROUP BY r.id
          ORDER BY r.rating DESC
        `;
        break;
      case 'deliveryTime':
        query = sql`
          SELECT r.*, 
                 ARRAY_AGG(t.name) AS tags
          FROM restaurants r
          LEFT JOIN restaurant_tags rt ON r.id = rt.restaurant_id
          LEFT JOIN tags t ON rt.tag_id = t.id
          GROUP BY r.id
          ORDER BY r.delivery_time
        `;
        break;
      case 'deliveryFee':
        query = sql`
          SELECT r.*, 
                 ARRAY_AGG(t.name) AS tags
          FROM restaurants r
          LEFT JOIN restaurant_tags rt ON r.id = rt.restaurant_id
          LEFT JOIN tags t ON rt.tag_id = t.id
          GROUP BY r.id
          ORDER BY r.delivery_fee
        `;
        break;
      case 'minimumOrder':
        query = sql`
          SELECT r.*, 
                 ARRAY_AGG(t.name) AS tags
          FROM restaurants r
          LEFT JOIN restaurant_tags rt ON r.id = rt.restaurant_id
          LEFT JOIN tags t ON rt.tag_id = t.id
          GROUP BY r.id
          ORDER BY r.minimum_order
        `;
        break;
      default:
        query = sql`
          SELECT r.*, 
                 ARRAY_AGG(t.name) AS tags
          FROM restaurants r
          LEFT JOIN restaurant_tags rt ON r.id = rt.restaurant_id
          LEFT JOIN tags t ON rt.tag_id = t.id
          GROUP BY r.id
          ORDER BY r.id
        `;
    }
    
    const result = await query;
    return result.map(toCamelCase);
  } catch (error) {
    console.error('Error sorting restaurants:', error);
    throw error;
  }
};

export const getSortedPaginatedRestaurants = async (sortBy: string, page: number, limit: number): Promise<{ restaurants: Restaurant[], total: number }> => {
  try {
    const offset = (page - 1) * limit;
    let query;
    
    switch(sortBy) {
      case 'rating':
        query = sql`
          SELECT r.*, 
                 ARRAY_AGG(t.name) AS tags
          FROM restaurants r
          LEFT JOIN restaurant_tags rt ON r.id = rt.restaurant_id
          LEFT JOIN tags t ON rt.tag_id = t.id
          GROUP BY r.id
          ORDER BY r.rating DESC
          LIMIT ${limit} OFFSET ${offset}
        `;
        break;
      case 'deliveryTime':
        query = sql`
          SELECT r.*, 
                 ARRAY_AGG(t.name) AS tags
          FROM restaurants r
          LEFT JOIN restaurant_tags rt ON r.id = rt.restaurant_id
          LEFT JOIN tags t ON rt.tag_id = t.id
          GROUP BY r.id
          ORDER BY r.delivery_time
          LIMIT ${limit} OFFSET ${offset}
        `;
        break;
      case 'deliveryFee':
        query = sql`
          SELECT r.*, 
                 ARRAY_AGG(t.name) AS tags
          FROM restaurants r
          LEFT JOIN restaurant_tags rt ON r.id = rt.restaurant_id
          LEFT JOIN tags t ON rt.tag_id = t.id
          GROUP BY r.id
          ORDER BY r.delivery_fee
          LIMIT ${limit} OFFSET ${offset}
        `;
        break;
      case 'minimumOrder':
        query = sql`
          SELECT r.*, 
                 ARRAY_AGG(t.name) AS tags
          FROM restaurants r
          LEFT JOIN restaurant_tags rt ON r.id = rt.restaurant_id
          LEFT JOIN tags t ON rt.tag_id = t.id
          GROUP BY r.id
          ORDER BY r.minimum_order
          LIMIT ${limit} OFFSET ${offset}
        `;
        break;
      default:
        query = sql`
          SELECT r.*, 
                 ARRAY_AGG(t.name) AS tags
          FROM restaurants r
          LEFT JOIN restaurant_tags rt ON r.id = rt.restaurant_id
          LEFT JOIN tags t ON rt.tag_id = t.id
          GROUP BY r.id
          ORDER BY r.id
          LIMIT ${limit} OFFSET ${offset}
        `;
    }
    
    const result = await query;
    const total = await getTotalRestaurants();
    
    return {
      restaurants: result.map(toCamelCase),
      total
    };
  } catch (error) {
    console.error('Error sorting paginated restaurants:', error);
    throw error;
  }
};

export const getRestaurantsByFoodTag = async (foodTag: string, page: number, limit: number): Promise<{ restaurants: Restaurant[], total: number }> => {
  try {
    const offset = (page - 1) * limit;
    
    // This query assumes restaurants have food tags stored in their tags array
    const result = await sql`
      SELECT r.*, 
             ARRAY_AGG(t2.name) AS tags
      FROM restaurants r
      JOIN restaurant_tags rt ON r.id = rt.restaurant_id
      JOIN tags t ON rt.tag_id = t.id
      LEFT JOIN restaurant_tags rt2 ON r.id = rt2.restaurant_id
      LEFT JOIN tags t2 ON rt2.tag_id = t2.id
      WHERE LOWER(t.name) = LOWER(${foodTag})
      GROUP BY r.id
      LIMIT ${limit} OFFSET ${offset}
    `;
    
    // Get total count of restaurants with this food tag
    const countResult = await sql`
      SELECT COUNT(DISTINCT r.id) as count
      FROM restaurants r
      JOIN restaurant_tags rt ON r.id = rt.restaurant_id
      JOIN tags t ON rt.tag_id = t.id
      WHERE LOWER(t.name) = LOWER(${foodTag})
    `;
    
    const total = parseInt(countResult[0].count);
    
    return {
      restaurants: result.map(toCamelCase),
      total
    };
  } catch (error) {
    console.error(`Error fetching restaurants with food tag ${foodTag}:`, error);
    throw error;
  }
}; 