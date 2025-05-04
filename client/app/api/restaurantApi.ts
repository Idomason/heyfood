import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Restaurant {
  id: number;
  name: string;
  logo: string;
  coverImage: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  minimumOrder: string;
  description?: string;
  location: string;
  tags: string[];
}

export interface Tag {
  id: number;
  name: string;
  count: number;
}

export interface RestaurantCategory {
  id: string;
  title: string;
  emoji: string;
  description: string;
  tagFilter?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

const restaurantApi = {
  // Get all restaurants with pagination
  getRestaurants: async (page = 1, limit = 10): Promise<PaginatedResponse<Restaurant>> => {
    const response = await apiClient.get('/restaurants', {
      params: { page, limit }
    });
    return response.data;
  },

  // Search restaurants by name with pagination
  searchRestaurants: async (query: string, page = 1, limit = 10): Promise<PaginatedResponse<Restaurant>> => {
    const response = await apiClient.get(`/restaurants/search`, {
      params: { query, page, limit }
    });
    return response.data;
  },

  // Get restaurants by tag with pagination
  getRestaurantsByTag: async (tag: string, page = 1, limit = 10): Promise<PaginatedResponse<Restaurant>> => {
    const response = await apiClient.get(`/restaurants/tag/${tag}`, {
      params: { page, limit }
    });
    return response.data;
  },
  
  // Get restaurants by food tag with pagination
  getRestaurantsByFoodTag: async (foodTag: string, page = 1, limit = 10): Promise<PaginatedResponse<Restaurant>> => {
    const response = await apiClient.get(`/restaurants/food-tag/${foodTag}`, {
      params: { page, limit }
    });
    return response.data;
  },

  // Sort restaurants with pagination
  sortRestaurants: async (sortBy: string, page = 1, limit = 10): Promise<PaginatedResponse<Restaurant>> => {
    const response = await apiClient.get(`/restaurants/sort`, {
      params: { sortBy, page, limit }
    });
    return response.data;
  },

  // Get all tags
  getTags: async (): Promise<Tag[]> => {
    const response = await apiClient.get('/tags');
    return response.data;
  },
  
  // Get restaurant categories
  getRestaurantCategories: async (): Promise<RestaurantCategory[]> => {
    const response = await apiClient.get('/categories');
    return response.data;
  },
};

export default restaurantApi; 