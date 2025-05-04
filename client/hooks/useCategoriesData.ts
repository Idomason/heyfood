import { useState, useEffect } from 'react';
import restaurantApi, { RestaurantCategory } from '@/app/api/restaurantApi';

const FALLBACK_CATEGORIES: RestaurantCategory[] = [
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
  }
];

export const useCategoriesData = () => {
  const [categories, setCategories] = useState<RestaurantCategory[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await restaurantApi.getRestaurantCategories();
        setCategories(data);
        setError(null);
      } catch (err) {
        console.log('Error fetching categories, using fallback:', err);
        setCategories(FALLBACK_CATEGORIES);
        setError(err instanceof Error ? err : new Error('Failed to fetch categories'));
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  return { 
    categories, 
    isLoadingCategories, 
    error 
  };
}; 