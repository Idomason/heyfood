import { useInfiniteQuery } from '@tanstack/react-query';
import restaurantApi, { Restaurant, PaginatedResponse } from '@/app/api/restaurantApi';

const RESTAURANTS_PER_PAGE = 12;

export function useFilteredRestaurants(
  foodTag: string | null,
  searchQuery: string = '',
  sortBy: string = 'rating'
) {
  return useInfiniteQuery<PaginatedResponse<Restaurant>>({
    queryKey: ['restaurants', foodTag, searchQuery, sortBy],
    queryFn: async ({ pageParam }) => {
      const page = pageParam as number;
      
      // Priority: search > tag filtering
      if (searchQuery) {
        return restaurantApi.searchRestaurants(searchQuery, page, RESTAURANTS_PER_PAGE);
      } else if (foodTag) {
        // Use the regular tag endpoint since we're now using real backend tags
        return restaurantApi.getRestaurantsByTag(foodTag, page, RESTAURANTS_PER_PAGE);
      } else {
        return restaurantApi.sortRestaurants(sortBy, page, RESTAURANTS_PER_PAGE);
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: PaginatedResponse<Restaurant>) => {
      if (!lastPage.pagination.hasMore) return undefined;
      return lastPage.pagination.page + 1;
    },
  });
} 