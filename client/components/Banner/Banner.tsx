'use client';

import { useRef } from 'react';
import { Box, Container, useTheme, IconButton } from '@mui/material';
import BannerImage from './BannerImage';
import { bannerImages } from '@/data/bannerImages';
import { useSlider } from '@/hooks/useSlider';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const Banner = () => {
  const theme = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { showLeftArrow, showRightArrow, scroll, handleScroll } = useSlider(scrollRef as React.RefObject<HTMLDivElement>);

  return (
    <Box className='font-sans' sx={{ backgroundColor: theme.palette.primary.contrastText, padding: 2, width: '100%', mt: .3, position: 'relative' }}>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        {showLeftArrow && (
          <IconButton onClick={() => scroll('left')} sx={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            bgcolor: 'rgba(255,255,255,0.7)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.7)' }
          }} disabled={!showLeftArrow}>
            <ChevronLeft />
          </IconButton>
        )}

        <Box
          ref={scrollRef}
          onScroll={handleScroll}
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            padding: '0 30px',
            position: 'relative',
            scrollSnapType: 'x mandatory',
            '& > *': {
              scrollSnapAlign: 'start'
            }
          }}>
          {bannerImages.map((image) => (
            <BannerImage key={image.id} imageUrl={image.imageUrl} />
          ))}
        </Box>
        {showRightArrow && (
          <IconButton onClick={() => scroll('right')} sx={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            bgcolor: 'rgba(255,255,255,0.7)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.7)' }
          }} disabled={!showRightArrow}>
            <ChevronRight />
          </IconButton>
        )}
      </Container>
    </Box>
  );
};

export default Banner; 