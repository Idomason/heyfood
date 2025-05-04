'use client';

import { useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Button,
  useTheme
} from '@mui/material';

import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useSlider } from '@/hooks/useSlider';

const Restaurant = ({ children, title = '', emoji = '', description = '' }: { children: React.ReactNode, title: string, emoji: string, description: string }) => {
  const theme = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { showLeftArrow, showRightArrow, scroll, handleScroll } = useSlider(scrollRef as React.RefObject<HTMLDivElement>);

  // Check for overflow on mount and when children change
  useEffect(() => {
    // Check initial overflow status
    if (scrollRef.current) {
      handleScroll();
    }
    
    // Add resize event listener to check overflow on window resize
    const checkForOverflow = () => handleScroll();
    window.addEventListener('resize', checkForOverflow);
    
    return () => window.removeEventListener('resize', checkForOverflow);
  }, [children, handleScroll]);

  // Check if there's any overflow (either left or right)
  const hasOverflow = showLeftArrow || showRightArrow;

  return (
    <Box sx={{ width: '100%', mt: .3, position: 'relative' }} className='font-sans'>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2 
        }}>
          <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <Typography variant="h5" component="h2" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
            
            {title} {emoji && <Box component="span" sx={{ ml: 1, fontSize: '2rem' }}>{emoji}</Box>}
          </Typography>
          <Typography variant="body2" sx={{ display: { xs: 'block', sm: 'none', fontWeight: '500', color: theme.palette.grey[600] } }}>
           
            {description}
          </Typography>
          </Box>

          
        {/* Only show navigation buttons if content overflows */}
        {hasOverflow && (
          <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
          <Button 
            sx={{ 
              color: theme.palette.text.primary,
              fontWeight: 'medium',
              '&:hover': { backgroundColor: 'transparent' }
            }}
          >
            See all
          </Button>
          
         
            <div className='hidden sm:flex items-center space-x-2'>
              <button 
                className={`size-8 bg-gray-200 rounded-full h-8 w-8 cursor-pointer ${!showLeftArrow ? 'opacity-50' : ''}`} 
                onClick={() => scroll('left')}
                disabled={!showLeftArrow}
              >
                <ArrowBack className='size-4'/>
              </button>
              <button 
                className={`size-8 bg-gray-200 rounded-full h-8 w-8 cursor-pointer ${!showRightArrow ? 'opacity-50' : ''}`} 
                onClick={() => scroll('right')}
                disabled={!showRightArrow}
              >
                <ArrowForward className='size-4'/>
              </button>
            </div>
          </Box>
          )}
        </Box>

      

        {/* Restaurant Cards Slider */}
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
            scrollSnapType: 'x mandatory',
            '& > *': {
              scrollSnapAlign: 'start'
            },
            pb: 1 // Add padding to avoid cut-off shadows
          }}
        > 
            {children}
           </Box>
      </Container>
    </Box>
  );
};

export default Restaurant; 