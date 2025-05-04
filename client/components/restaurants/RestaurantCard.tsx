'use client';

import React from 'react';
import { 
  Box, 
  Card,
  CardContent, 
  Typography, 
  Rating,
} from '@mui/material';
import { Restaurant } from '@/app/api/restaurantApi';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  
  return (
    <Card className='font-sans' sx={{ 
      width: 280,
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      flexShrink: 0,
      position: 'relative',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
      },
    }}>
      {/* Restaurant Image */}
      <Box sx={{ position: 'relative', height: 110 }}>
        <Box
          component="img"
          src={restaurant.coverImage}
          alt={restaurant.name}
          sx={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover'
          }}
        />
        
        {/* Delivery Fee as Discount Badge */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            bgcolor: 'rgba(0, 0, 0, 0.85)',
            color: 'white',
            py: 0.8,
            px: 2,
            borderRadius: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2" fontWeight="semibold" className='flex items-center space-x-2'>
            <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='lucide lucide-tag-icon lucide-tag'><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>
            </span>
            <span className='text-white'>{restaurant.deliveryFee} delivery</span>
          </Typography>
        </Box>
        
        {/* Delivery Time as Closing Time */}
        <Box
          sx={{
            position: 'absolute',
            top: 65,
            left: 16,
            borderRadius: 1,
            px: 2,
            py: 0.5,
            bgcolor: '#00A300',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" fontWeight="medium">
            {restaurant.deliveryTime}
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ p: 2 }}>
        {/* Restaurant Name */}
        <Typography variant="h6" component="h3" fontWeight="bold" sx={{ mb: 0.5 }}>
          {restaurant.name}
        </Typography>
        
        {/* Tags as Categories */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {restaurant.tags.join(', ')}
        </Typography>
        
        {/* Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Rating 
            value={restaurant.rating} 
            precision={0.1} 
            readOnly 
            size="small"
            sx={{ color: '#00A300', mr: 1 }}
          />
          <Typography variant="body2" fontWeight="medium" sx={{ mr: 1 }}>
            {restaurant.rating}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: {restaurant.minimumOrder}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard; 