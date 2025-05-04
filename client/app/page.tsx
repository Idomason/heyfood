'use client';

import React, { Suspense } from 'react';
import Box from '@mui/material/Box';
import Header from '@/components/common/Header';
import Banner from '@/components/Banner/Banner';
import RestaurantList from '@/components/restaurants/RestaurantList';
import SubNav from '@/components/SubNav';
import Tags from '@/components/tags/Tags';

export default function Home() {
  return (
    <Box className='font-sans' sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header/>
      <SubNav />
      <Suspense>
        <Tags />
      </Suspense>
      <Banner />

      <Suspense>
        <RestaurantList />
      </Suspense>
    </Box>
  );
}
