'use client';

import React from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import RestaurantCard from './RestaurantCard';
import { Restaurant as RestaurantData, RestaurantCategory } from '@/app/api/restaurantApi';
import Restaurant from './Restaurant';
import { useCategoriesData } from '@/hooks/useCategoriesData';
import { groupRestaurantsByCategory } from '../../utils/restaurantUtils';

interface RestaurantGridProps {
  restaurants: RestaurantData[];
  isLoading: boolean;
  isFetchingMore?: boolean;
  lastItemRef?: (node: HTMLElement | null) => void;
}

// Loading skeleton component
const RestaurantSkeleton = () => (
  <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)' } }}>
    <Box sx={{ width: '100%' }}>
      <Skeleton variant="rectangular" height={140} sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }} />
      <Box sx={{ pt: 3, px: 2, pb: 2 }}>
        <Skeleton width="60%" height={30} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Skeleton width="40%" height={20} />
          <Skeleton width="30%" height={20} />
        </Box>
        <Box sx={{ display: 'flex', mt: 2, gap: 1 }}>
          <Skeleton width="25%" height={25} />
          <Skeleton width="25%" height={25} />
          <Skeleton width="25%" height={25} />
        </Box>
      </Box>
    </Box>
  </Box>
);

// Loading state component
const LoadingState = () => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
    {Array.from(new Array(6)).map((_, index) => (
      <RestaurantSkeleton key={index} />
    ))}
  </Box>
);

// Empty state component
const EmptyState = () => (
  <Box sx={{ py: 5, textAlign: 'center' }}>
    <Typography variant="h6" color="text.secondary">
      No restaurants found matching your criteria
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
      Try adjusting your search or filters
    </Typography>
  </Box>
);

// Restaurant category section component
const RestaurantCategorySection = ({ 
  category, 
  restaurants, 
  isLastCategory, 
  lastItemRef 
}: { 
  category: RestaurantCategory,
  restaurants: RestaurantData[],
  isLastCategory: boolean,
  lastItemRef?: (node: HTMLElement | null) => void
}) => (
  <Restaurant 
    key={category.id}
    title={category.title} 
    emoji={category.emoji} 
    description={category.description}
  >
    {restaurants.map((restaurant, restaurantIndex) => {
      // Check if this is the last item for infinite scroll
      const isLastItem = isLastCategory && restaurantIndex === restaurants.length - 1;
      
      return (
        <div 
          key={`${category.id}-${restaurant.id}-${restaurantIndex}`} 
          ref={isLastItem && lastItemRef ? lastItemRef : undefined}
        >
          <RestaurantCard restaurant={restaurant} />
        </div>
      );
    })}
  </Restaurant>
);

// Loading more indicator component
const LoadingMoreIndicator = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
    <Skeleton variant="rectangular" width={280} height={180} sx={{ borderRadius: 2 }} />
  </Box>
);

const RestaurantGrid = ({ 
  restaurants, 
  isLoading,
  isFetchingMore = false,
  lastItemRef
}: RestaurantGridProps) => {
  // Extract category fetching logic into a custom hook
  const { categories, isLoadingCategories } = useCategoriesData();
  
  // Check if we're still loading data
  if (isLoading || isLoadingCategories) {
    return <LoadingState />;
  }

  // Show empty state if no restaurants
  if (restaurants.length === 0) {
    return <EmptyState />;
  }

  // Get restaurants grouped by category using the utility function
  const restaurantsByCategory = groupRestaurantsByCategory(restaurants, categories);

  // Display restaurant grid
  return (
    <div className='flex flex-col gap-4 space-y-4'>
      {restaurantsByCategory.map((categoryData: {category: RestaurantCategory, restaurants: RestaurantData[]}, categoryIndex: number) => (
        <RestaurantCategorySection 
          key={categoryData.category.id}
          category={categoryData.category}
          restaurants={categoryData.restaurants}
          isLastCategory={categoryIndex === restaurantsByCategory.length - 1}
          lastItemRef={lastItemRef}
        />
      ))}
      
      {/* Loading indicator for fetching more */}
      {isFetchingMore && <LoadingMoreIndicator />}
    </div>
  );
};

export default React.memo(RestaurantGrid); 