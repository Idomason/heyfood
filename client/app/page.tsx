'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Header from '@/components/common/Header';
import Banner from '@/components/Banner/Banner';
import RestaurantList from '@/components/restaurants/RestaurantList';
import SubNav from '@/components/SubNav';
import Tags from '@/components/tags/Tags';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header/>
      <SubNav />
      <Tags />
      <Banner />
      <RestaurantList />
    </Box>
  );
}
