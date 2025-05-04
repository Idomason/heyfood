'use client';

import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import restaurantApi from '@/app/api/restaurantApi';
import RestaurantGrid from './RestaurantGrid';
import SearchBar from './SearchBar';
import TagFilter from './TagFilter';
import SortSelector from './SortSelector';
import OpenRestaurantsInfo from '../layout/OpenRestaurantsInfo';
import { useFilteredRestaurants } from '@/hooks/useFilteredRestaurants';
import { useSearchParams } from 'next/navigation';


const RestaurantList = () => {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedFoodTag, setSelectedFoodTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('rating'); // Default sort by rating

  // Get food tag from URL if present
  useEffect(() => {
    const tagParam = searchParams.get('tag');
    if (tagParam) {
      setSelectedFoodTag(tagParam);
      // When a food tag is selected, we should clear the regular tag filter
      setSelectedTag(null);
    } else {
      setSelectedFoodTag(null);
    }
  }, [searchParams]);

  // Fetch all tags
  const { 
    data: tags = [], 
    isLoading: isLoadingTags 
  } = useQuery({
    queryKey: ['tags'], 
    queryFn: restaurantApi.getTags
  });

  // Fetch filtered restaurants with infinite scroll
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingRestaurants,
  } = useFilteredRestaurants(selectedFoodTag || selectedTag, searchQuery, sortBy);

  // Flatten the pages data
  const restaurants = useMemo(() => {
    return data?.pages.flatMap(page => page.data) || [];
  }, [data]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedTag(null); // Clear tag filter when searching
    setSelectedFoodTag(null); // Clear food tag filter when searching
  };

  // Handle tag selection
  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
    setSearchQuery(''); // Clear search when filtering by tag
    setSelectedFoodTag(null); // Clear food tag when using regular tag filter
  };

  // Handle sort change
  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  // Set up intersection observer for infinite scroll
  const observer = useRef<IntersectionObserver | null>(null);
  const lastRestaurantElementRef = useCallback((node: HTMLElement | null) => {
    if (isLoadingRestaurants || isFetchingNextPage) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    }, { rootMargin: '100px' });
    
    if (node) observer.current.observe(node);
  }, [isLoadingRestaurants, isFetchingNextPage, fetchNextPage, hasNextPage]);

  // Calculate total count from first page
  const totalCount = data?.pages[0]?.pagination.total || 0;

  return (
    <Container className='font-sans' maxWidth="lg" sx={{ mt: 4, mb: 6, height: 'calc(100vh - 160px)' }}>
      {/* Open Restaurants Info */}
      <OpenRestaurantsInfo />
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        gap: 3, 
        height: { xs: 'auto', md: '100%' }
      }}>
        {/* Left sidebar with filters */}
        <Box sx={{ 
          width: { xs: '100%', md: '25%' },
          height: { xs: 'auto', md: '100%' },
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Paper sx={{ 
            p: 2, 
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              flexGrow: 1, 
              overflow: 'auto',
              height: '100%'
            }}>
              <TagFilter 
                tags={tags} 
                selectedTag={selectedTag} 
                onTagSelect={handleTagSelect}
                isLoading={isLoadingTags}
              />
            </Box>
          </Paper>
        </Box>

        {/* Main content area */}
        <Box sx={{ 
          width: { xs: '100%', md: '75%' },
          height: { xs: 'auto', md: '100%' },
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(0, 0, 0, 0.2)',
          },
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(0, 0, 0, 0.1) transparent'
        }}>
          <Box>
            {/* Search and sort section */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
              alignItems: { xs: 'stretch', md: 'center' },
              mb: 2,
              position: { md: 'sticky' },
              top: 0,
              backgroundColor: 'background.paper',
              zIndex: 1,
              py: 1
            }}>
              <Box sx={{ flex: { md: 2 } }}>
                <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
              </Box>
              <Box sx={{ flex: { md: 1 } }}>
                <SortSelector selectedSort={sortBy} onSortChange={handleSortChange} />
              </Box>
            </Box>

            {/* Active filter indicator */}
            {selectedFoodTag && (
              <Typography variant="body2" color="primary" sx={{ mb: 1 }}>
                Filtering by: {selectedFoodTag}
              </Typography>
            )}

            {/* Results count */}
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              {!isLoadingRestaurants && 
                `${totalCount} ${totalCount === 1 ? 'Restaurant' : 'Restaurants'} available`
              }
            </Typography>

            {/* Restaurant grid with infinite scroll */}
            <RestaurantGrid 
              restaurants={restaurants} 
              isLoading={isLoadingRestaurants}
              isFetchingMore={isFetchingNextPage}
              lastItemRef={lastRestaurantElementRef}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default RestaurantList; 