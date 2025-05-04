import { RestaurantCategory } from '../types';

// Hardcoded predefined categories
const categories: RestaurantCategory[] = [
  {
    id: 'discounts',
    title: 'Discounts 4 U!',
    emoji: '😚',
    description: 'Massive discounts off your order!'
  },
  {
    id: 'popular',
    title: 'Place Order Now!', 
    emoji: '👇',
    description: 'Order now and get your food delivered in minutes!'
  },
  {
    id: 'recommended',
    title: 'Order Now!',
    emoji: '👇',
    description: 'Order now and get your food delivered to your door!'
  },
  {
    id: 'fastDelivery',
    title: 'Fast Delivery',
    emoji: '🚀',
    description: 'Get your food delivered quickly!'
  },
  {
    id: 'topRated',
    title: 'Top Rated',
    emoji: '⭐',
    description: 'Highest rated restaurants'
  },
  {
    id: 'chicken',
    title: 'Chicken Lovers',
    emoji: '🍗',
    description: 'Best chicken dishes',
    tagFilter: 'chicken'
  },
  {
    id: 'rice',
    title: 'Rice Dishes',
    emoji: '🍚',
    description: 'Delicious rice meals',
    tagFilter: 'rice'
  }
];

export const getCategories = async (): Promise<RestaurantCategory[]> => {
  // In a real app, this might fetch from database
  // For now we'll return hardcoded data
  return categories;
}; 