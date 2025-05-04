import { Restaurant, RestaurantCategory } from '@/app/api/restaurantApi';

interface CategoryData {
  category: RestaurantCategory;
  restaurants: Restaurant[];
}

/**
 * Filter restaurants by discount category
 */
const filterDiscountRestaurants = (restaurants: Restaurant[]): Restaurant[] => {
  return restaurants.filter(r => 
    r.deliveryFee.includes('%') || r.deliveryFee.includes('off')
  );
};

/**
 * Filter high rated restaurants
 */
const filterHighRatedRestaurants = (restaurants: Restaurant[]): Restaurant[] => {
  return restaurants.filter(r => r.rating >= 4.3);
};

/**
 * Filter restaurants with fast delivery
 */
const filterFastDeliveryRestaurants = (restaurants: Restaurant[]): Restaurant[] => {
  return restaurants.filter(r =>
    r.deliveryTime.includes('30') || r.deliveryTime.includes('25')
  );
};

/**
 * Filter restaurants by tag
 */
const filterRestaurantsByTag = (restaurants: Restaurant[], tagFilter?: string): Restaurant[] => {
  if (!tagFilter) return [...restaurants];
  
  return restaurants.filter(r => 
    Array.isArray(r.tags) && r.tags.some(tag => 
      tag && tag.toLowerCase() === tagFilter.toLowerCase()
    )
  );
};

/**
 * Group restaurants by their categories with appropriate filtering
 */
export const groupRestaurantsByCategory = (
  restaurants: Restaurant[], 
  categories: RestaurantCategory[]
): CategoryData[] => {
  const result = categories.map(category => {
    let filteredRestaurants: Restaurant[] = [];
    
    // Apply different filtering logic based on category id
    switch (category.id) {
      case 'discounts':
        filteredRestaurants = filterDiscountRestaurants(restaurants);
        break;
      case 'popular':
      case 'topRated':
        filteredRestaurants = filterHighRatedRestaurants(restaurants);
        break;
      case 'fastDelivery':
      case 'recommended':
        filteredRestaurants = filterFastDeliveryRestaurants(restaurants);
        break;
      default:
        // If category has a tagFilter, use it
        filteredRestaurants = filterRestaurantsByTag(restaurants, category.tagFilter);
    }
    
    return {
      category,
      restaurants: filteredRestaurants
    };
  });
  
  // Only return categories that have restaurants
  return result.filter(categoryData => categoryData.restaurants.length > 0);
}; 